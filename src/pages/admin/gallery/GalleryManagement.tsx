import { useEffect, useMemo, useState } from 'react'
import { Edit, Image, Plus, Star, Trash2 } from 'lucide-react'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminFilters, type FilterConfig } from '../../../components/admin/AdminFilters'
import { AdminModal } from '../../../components/admin/AdminModal'
import { AdminPagination } from '../../../components/admin/AdminPagination'
import { AdminSearch } from '../../../components/admin/AdminSearch'
import { AdminTable, type AdminTableColumn } from '../../../components/admin/AdminTable'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Badge } from '../../../components/common/Badge'
import { Button } from '../../../components/common/Button'
import { Checkbox } from '../../../components/common/FormControls'
import { Input } from '../../../components/common/Input'
import { Select } from '../../../components/common/Select'
import { Textarea } from '../../../components/common/Textarea'
import { ROUTES } from '../../../constants/routes'
import { GALLERY_CATEGORIES, type GalleryCategory, type GalleryItem } from '../../../data/gallery'
import { adminGalleryService } from '../../../services/adminGalleryService'

type GalleryCategoryOption = Exclude<GalleryCategory, 'All'>
const categories = GALLERY_CATEGORIES.filter((c): c is GalleryCategoryOption => c !== 'All')

export default function GalleryManagement() {
  const { showSuccess, showError } = useAdminToast()

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Add / Edit Modal
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [modalTitle, setModalTitle] = useState('')
  const [modalSrc, setModalSrc] = useState('')
  const [modalCategory, setModalCategory] = useState<GalleryCategoryOption>('Conferences')
  const [modalDescription, setModalDescription] = useState('')
  const [modalDate, setModalDate] = useState('')
  const [modalFeatured, setModalFeatured] = useState(false)
  const [modalStatus, setModalStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  // Delete modal
  const [deleteItem, setDeleteItem] = useState<GalleryItem | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let isMounted = true
    adminGalleryService
      .getAll()
      .then((data) => {
        if (isMounted) setGalleryItems(data)
      })
      .catch(() => {
        if (isMounted) showError('Failed to load gallery assets.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [showError])

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchCategory =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase()

      return matchSearch && matchCategory
    })
  }, [galleryItems, searchTerm, selectedCategory])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredItems.slice(start, start + pageSize)
  }, [filteredItems, page, pageSize])

  const totalPages = Math.ceil(filteredItems.length / pageSize)

  const openAddModal = () => {
    setEditingItem(null)
    setModalTitle('')
    setModalSrc('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80')
    setModalCategory('Conferences')
    setModalDescription('')
    setModalDate(new Date().toISOString().split('T')[0])
    setModalFeatured(false)
    setModalStatus('PUBLISHED')
    setFormErrors({})
    setFormModalOpen(true)
  }

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item)
    setModalTitle(item.title)
    setModalSrc(item.src)
    setModalCategory(item.category)
    setModalDescription(item.description || '')
    setModalDate(item.date || '2026-06-15')
    setModalFeatured(Boolean(item.featured))
    setModalStatus(item.status || 'PUBLISHED')
    setFormErrors({})
    setFormModalOpen(true)
  }

  const handleFormSubmit = async () => {
    const errs: Record<string, string> = {}
    if (!modalTitle.trim()) errs.title = 'Title is required.'
    if (!modalSrc.trim()) errs.src = 'Image URL is required.'
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs)
      return
    }

    try {
      setSubmitting(true)
      if (editingItem) {
        const updated = await adminGalleryService.update(editingItem.id, {
          title: modalTitle.trim(),
          src: modalSrc.trim(),
          category: modalCategory,
          description: modalDescription.trim(),
          date: modalDate,
          featured: modalFeatured,
          status: modalStatus,
          alt: modalTitle.trim(),
        })
        setGalleryItems((prev) => prev.map((i) => (i.id === editingItem.id ? updated : i)))
        showSuccess('Gallery item updated successfully.')
      } else {
        const created = await adminGalleryService.create({
          title: modalTitle.trim(),
          src: modalSrc.trim(),
          category: modalCategory,
          description: modalDescription.trim(),
          date: modalDate,
          featured: modalFeatured,
          status: modalStatus,
          alt: modalTitle.trim(),
        })
        setGalleryItems((prev) => [created, ...prev])
        showSuccess('Gallery photo added successfully.')
      }
      setFormModalOpen(false)
    } catch {
      showError('Failed to save gallery item.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteItem) return
    try {
      setDeleting(true)
      await adminGalleryService.delete(deleteItem.id)
      setGalleryItems((prev) => prev.filter((i) => i.id !== deleteItem.id))
      showSuccess('Photo removed from gallery.')
      setDeleteItem(null)
    } catch {
      showError('Failed to delete gallery item.')
    } finally {
      setDeleting(false)
    }
  }

  const handleToggleFeatured = async (item: GalleryItem) => {
    try {
      const updated = await adminGalleryService.toggleFeatured(item.id)
      setGalleryItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)))
      showSuccess(`Photo ${updated.featured ? 'highlighted on public gallery' : 'unfeatured'}.`)
    } catch {
      showError('Failed to toggle featured state.')
    }
  }

  const filterConfigs: FilterConfig[] = [
    {
      key: 'category',
      label: 'Category',
      value: selectedCategory,
      options: GALLERY_CATEGORIES.map((c) => ({ label: c, value: c })),
      onChange: (val) => {
        setSelectedCategory(val)
        setPage(1)
      },
    },
  ]

  const isFiltered = searchTerm !== '' || selectedCategory !== 'All'

  const columns: AdminTableColumn<GalleryItem>[] = [
    {
      key: 'image',
      header: 'Photo & Title',
      render: (item) => (
        <div className="az-table-item-media">
          <div className="az-table-item-media__thumb">
            {item.src ? (
              <img src={item.src} alt={item.alt || item.title} />
            ) : (
              <Image size={18} />
            )}
          </div>
          <div className="az-table-item-media__details">
            <strong className="az-table-item-media__title" title={item.title}>
              {item.title}
            </strong>
            <span className="az-table-item-media__sub">{item.location || item.conferenceName || item.category}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (item) => <Badge variant="neutral">{item.category}</Badge>,
    },
    {
      key: 'date',
      header: 'Date Captured',
      render: (item) => <span className="az-muted">{item.date || item.year || '2026'}</span>,
    },
    {
      key: 'featured',
      header: 'Featured',
      align: 'center',
      render: (item) => (
        <button
          type="button"
          className={`az-feature-star ${item.featured ? 'is-active' : ''}`}
          onClick={() => handleToggleFeatured(item)}
          aria-label={item.featured ? 'Unfeature photo' : 'Feature photo'}
          title={item.featured ? 'Featured on hero highlight' : 'Click to feature'}
        >
          <Star size={16} fill={item.featured ? 'currentColor' : 'none'} />
        </button>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (item) => (
        <div className="az-action-buttons">
          <button
            type="button"
            className="az-action-btn"
            onClick={() => openEditModal(item)}
            title="Edit photo metadata"
          >
            <Edit size={15} />
          </button>
          <button
            type="button"
            className="az-action-btn az-action-btn--danger"
            onClick={() => setDeleteItem(item)}
            title="Delete photo"
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
          { label: 'Gallery' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Media & Gallery Management</h1>
          <p className="az-admin-page__subtitle">
            Upload and organize summit photography, plenary recordings, and award ceremonies.
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Button size="sm" onClick={openAddModal}>
            <Plus size={15} />
            Add Photo
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
          placeholder="Search by photo title or description..."
          ariaLabel="Search gallery"
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
        emptyMessage="No media items found."
        emptyDescription="Try clearing filters or add a new photo."
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredItems.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s)
          setPage(1)
        }}
      />

      {/* Add / Edit Modal */}
      <AdminModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        title={editingItem ? 'Edit Gallery Photo' : 'Add Photo to Gallery'}
        description="Specify image URL, caption, event category, and feature state."
        confirmLabel={editingItem ? 'Save Changes' : 'Add Photo'}
        onConfirm={handleFormSubmit}
        confirmLoading={submitting}
      >
        <div className="az-modal-form-body">
          <Input
            label="Image Title / Caption"
            required
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
            placeholder="e.g. Plenary Keynote Hall - AI Summit"
            error={formErrors.title}
          />
          <Input
            label="Image Asset URL"
            required
            value={modalSrc}
            onChange={(e) => setModalSrc(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            error={formErrors.src}
          />
          <div className="az-form-grid-2">
            <Select
              label="Gallery Category"
              value={modalCategory}
              onChange={(e) => setModalCategory(e.target.value as GalleryCategoryOption)}
              options={categories.map((c) => ({ label: c, value: c }))}
            />
            <Input
              label="Event Date"
              type="date"
              value={modalDate}
              onChange={(e) => setModalDate(e.target.value)}
            />
          </div>
          <Textarea
            label="Description / Context"
            value={modalDescription}
            onChange={(e) => setModalDescription(e.target.value)}
            placeholder="Optional context about the summit moment..."
          />
          <div className="az-form-checkbox-wrap">
            <Checkbox
              label="Feature in Highlights Spotlight"
              checked={modalFeatured}
              onChange={(e) => setModalFeatured(e.target.checked)}
            />
          </div>
        </div>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        open={Boolean(deleteItem)}
        onClose={() => setDeleteItem(null)}
        title="Delete Photo"
        description="Are you sure you want to remove this photo from the platform gallery?"
        variant="danger"
        confirmLabel="Delete Photo"
        onConfirm={handleDelete}
        confirmLoading={deleting}
      >
        {deleteItem && (
          <div className="az-confirm-box">
            <strong>{deleteItem.title}</strong>
            <p>{deleteItem.category}</p>
          </div>
        )}
      </AdminModal>
    </div>
  )
}
