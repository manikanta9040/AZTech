import { useEffect, useMemo, useState } from 'react'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminFilters, type FilterConfig } from '../../../components/admin/AdminFilters'
import { AdminModal } from '../../../components/admin/AdminModal'
import { AdminPagination } from '../../../components/admin/AdminPagination'
import { AdminSearch } from '../../../components/admin/AdminSearch'
import { AdminTable, type AdminTableColumn } from '../../../components/admin/AdminTable'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Badge } from '../../../components/common/Badge'
import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { Select } from '../../../components/common/Select'
import { Textarea } from '../../../components/common/Textarea'
import { ROUTES } from '../../../constants/routes'
import { FAQ_CATEGORIES, type FAQCategory, type FAQItem } from '../../../data/faqs'
import { adminFaqService } from '../../../services/adminFaqService'

type FAQCategoryOption = Exclude<FAQCategory, 'All'>
const categories = FAQ_CATEGORIES.filter((c): c is FAQCategoryOption => c !== 'All')

export default function FaqManagement() {
  const { showSuccess, showError } = useAdminToast()

  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Add / Edit Modal State
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null)
  const [modalQuestion, setModalQuestion] = useState('')
  const [modalAnswer, setModalAnswer] = useState('')
  const [modalCategory, setModalCategory] = useState<FAQCategoryOption>('General')
  const [modalOrder, setModalOrder] = useState('1')
  const [modalStatus, setModalStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  // Delete modal
  const [deleteFaq, setDeleteFaq] = useState<FAQItem | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let isMounted = true
    adminFaqService
      .getAll()
      .then((data) => {
        if (isMounted) setFaqs(data)
      })
      .catch(() => {
        if (isMounted) showError('Failed to load FAQs.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [showError])

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchSearch =
        !searchTerm ||
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())

      const matchCategory =
        selectedCategory === 'All' || faq.category.toLowerCase() === selectedCategory.toLowerCase()

      return matchSearch && matchCategory
    })
  }, [faqs, searchTerm, selectedCategory])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredFaqs.slice(start, start + pageSize)
  }, [filteredFaqs, page, pageSize])

  const totalPages = Math.ceil(filteredFaqs.length / pageSize)

  const openAddModal = () => {
    setEditingFaq(null)
    setModalQuestion('')
    setModalAnswer('')
    setModalCategory('General')
    setModalOrder(String(faqs.length + 1))
    setModalStatus('PUBLISHED')
    setFormErrors({})
    setFormModalOpen(true)
  }

  const openEditModal = (faq: FAQItem) => {
    setEditingFaq(faq)
    setModalQuestion(faq.question)
    setModalAnswer(faq.answer)
    setModalCategory(faq.category)
    setModalOrder(String(faq.order || 1))
    setModalStatus(faq.status || 'PUBLISHED')
    setFormErrors({})
    setFormModalOpen(true)
  }

  const handleFormSubmit = async () => {
    const errs: Record<string, string> = {}
    if (!modalQuestion.trim()) errs.question = 'Question is required.'
    if (!modalAnswer.trim()) errs.answer = 'Answer is required.'
    if (isNaN(Number(modalOrder))) errs.order = 'Display order must be a valid number.'
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs)
      return
    }

    try {
      setSubmitting(true)
      if (editingFaq) {
        const updated = await adminFaqService.update(editingFaq.id, {
          question: modalQuestion.trim(),
          answer: modalAnswer.trim(),
          category: modalCategory,
          order: Number(modalOrder),
          status: modalStatus,
        })
        setFaqs((prev) => prev.map((f) => (f.id === editingFaq.id ? updated : f)))
        showSuccess('FAQ updated successfully.')
      } else {
        const created = await adminFaqService.create({
          question: modalQuestion.trim(),
          answer: modalAnswer.trim(),
          category: modalCategory,
          order: Number(modalOrder),
          status: modalStatus,
        })
        setFaqs((prev) => [...prev, created])
        showSuccess('FAQ created successfully.')
      }
      setFormModalOpen(false)
    } catch {
      showError('Failed to save FAQ item.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteFaq) return
    try {
      setDeleting(true)
      await adminFaqService.delete(deleteFaq.id)
      setFaqs((prev) => prev.filter((f) => f.id !== deleteFaq.id))
      showSuccess('FAQ item deleted.')
      setDeleteFaq(null)
    } catch {
      showError('Failed to delete FAQ.')
    } finally {
      setDeleting(false)
    }
  }

  const handleTogglePublish = async (faq: FAQItem) => {
    try {
      const updated = await adminFaqService.togglePublish(faq.id)
      setFaqs((prev) => prev.map((f) => (f.id === faq.id ? updated : f)))
      showSuccess(`FAQ status updated to ${updated.status}.`)
    } catch {
      showError('Failed to update FAQ status.')
    }
  }

  const filterConfigs: FilterConfig[] = [
    {
      key: 'category',
      label: 'Category',
      value: selectedCategory,
      options: FAQ_CATEGORIES.map((c) => ({ label: c, value: c })),
      onChange: (val) => {
        setSelectedCategory(val)
        setPage(1)
      },
    },
  ]

  const isFiltered = searchTerm !== '' || selectedCategory !== 'All'

  const columns: AdminTableColumn<FAQItem>[] = [
    {
      key: 'order',
      header: '#',
      width: '4rem',
      align: 'center',
      render: (faq) => <strong className="az-muted">{faq.order || 1}</strong>,
    },
    {
      key: 'question',
      header: 'Question & Answer',
      render: (faq) => (
        <div className="az-cell-faq">
          <strong className="az-cell-faq__q">{faq.question}</strong>
          <p className="az-cell-faq__a">{faq.answer}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (faq) => <Badge variant="neutral">{faq.category}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (faq) => (
        <button
          type="button"
          className="az-status-toggle-btn"
          onClick={() => handleTogglePublish(faq)}
          title="Click to toggle publish status"
        >
          <Badge variant={faq.status === 'PUBLISHED' ? 'success' : 'neutral'}>
            {faq.status || 'PUBLISHED'}
          </Badge>
        </button>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (faq) => (
        <div className="az-action-buttons">
          <button
            type="button"
            className="az-action-btn"
            onClick={() => openEditModal(faq)}
            title="Edit FAQ"
          >
            <Edit size={15} />
          </button>
          <button
            type="button"
            className="az-action-btn az-action-btn--danger"
            onClick={() => setDeleteFaq(faq)}
            title="Delete FAQ"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="az-admin-page">
      <AdminBreadcrumbs
        items={[
          { label: 'Dashboard', to: ROUTES.adminDashboard },
          { label: 'FAQs' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Frequently Asked Questions (FAQ)</h1>
          <p className="az-admin-page__subtitle">
            Curate delegate inquiries regarding registrations, abstracts, certificates, and venues.
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Button size="sm" onClick={openAddModal}>
            <Plus size={15} />
            Add FAQ
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="az-admin-toolbar">
        <AdminSearch
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val)
            setPage(1)
          }}
          placeholder="Search question or answer text..."
          ariaLabel="Search FAQs"
          className="az-admin-toolbar__search"
        />
        <AdminFilters
          filters={filterConfigs}
          isFiltered={isFiltered}
          onReset={() => {
            setSearchTerm('')
            setSelectedCategory('All')
            setPage(1)
          }}
          className="az-admin-toolbar__filters"
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={paginatedData}
        loading={loading}
        emptyMessage="No FAQs found."
        emptyDescription="Try clearing filters or add a new FAQ."
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredFaqs.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s)
          setPage(1)
        }}
      />

      {/* Add/Edit Modal */}
      <AdminModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        title={editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
        description="Provide a clear question and informative answer."
        confirmLabel={editingFaq ? 'Save Changes' : 'Create FAQ'}
        onConfirm={handleFormSubmit}
        confirmLoading={submitting}
      >
        <div className="az-modal-form-body">
          <Input
            label="Question"
            required
            value={modalQuestion}
            onChange={(e) => setModalQuestion(e.target.value)}
            placeholder="e.g. What is the deadline for abstract submissions?"
            error={formErrors.question}
          />
          <Textarea
            label="Answer"
            required
            value={modalAnswer}
            onChange={(e) => setModalAnswer(e.target.value)}
            placeholder="Detailed explanation..."
            error={formErrors.answer}
          />
          <div className="az-form-grid-2">
            <Select
              label="Category"
              value={modalCategory}
              onChange={(e) => setModalCategory(e.target.value as FAQCategoryOption)}
              options={categories.map((c) => ({ label: c, value: c }))}
            />
            <Input
              label="Display Order #"
              type="number"
              value={modalOrder}
              onChange={(e) => setModalOrder(e.target.value)}
              error={formErrors.order}
            />
          </div>
          <Select
            label="Status"
            value={modalStatus}
            onChange={(e) => setModalStatus(e.target.value as 'PUBLISHED' | 'DRAFT')}
            options={[
              { label: 'Published (Live on website FAQ)', value: 'PUBLISHED' },
              { label: 'Draft (Hidden)', value: 'DRAFT' },
            ]}
          />
        </div>
      </AdminModal>

      {/* Delete Modal */}
      <AdminModal
        open={Boolean(deleteFaq)}
        onClose={() => setDeleteFaq(null)}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ item from the website knowledge base?"
        variant="danger"
        confirmLabel="Delete FAQ"
        onConfirm={handleDelete}
        confirmLoading={deleting}
      >
        {deleteFaq && (
          <div className="az-confirm-box">
            <strong>{deleteFaq.question}</strong>
            <p>{deleteFaq.category}</p>
          </div>
        )}
      </AdminModal>
    </div>
  )
}
