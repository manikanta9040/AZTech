import { useEffect, useMemo, useState } from 'react'
import {
  Calendar,
  Edit,
  Eye,
  Plus,
  Star,
  Trash2,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminFilters, type FilterConfig } from '../../../components/admin/AdminFilters'
import { AdminModal } from '../../../components/admin/AdminModal'
import { AdminPagination } from '../../../components/admin/AdminPagination'
import { AdminSearch } from '../../../components/admin/AdminSearch'
import { AdminTable, type AdminTableColumn } from '../../../components/admin/AdminTable'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Badge } from '../../../components/common/Badge'
import { Button } from '../../../components/common/Button'
import { ROUTES } from '../../../constants/routes'
import { adminConferenceService } from '../../../services/adminConferenceService'
import type { Conference } from '../../../types/conference'

const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: 'all' },
  { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Computer Science', value: 'Computer Science' },
  { label: 'Renewable Energy', value: 'Renewable Energy' },
  { label: 'Education', value: 'Education' },
]

const STATUS_FILTER_OPTIONS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Registration Open', value: 'registration_open' },
  { label: 'Closing Soon', value: 'closing_soon' },
  { label: 'Closed / Archived', value: 'closed' },
  { label: 'Featured Only', value: 'featured' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past / Completed', value: 'completed' },
]

export default function ConferenceList() {
  const navigate = useNavigate()
  const { showSuccess, showError } = useAdminToast()

  const [conferences, setConferences] = useState<Conference[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Delete modal state
  const [deleteConf, setDeleteConf] = useState<Conference | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let isMounted = true
    adminConferenceService
      .getAll()
      .then((data) => {
        if (isMounted) setConferences(data)
      })
      .catch(() => {
        if (isMounted) showError('Failed to load conferences.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [showError])


  // Filtered & searched data
  const filteredConferences = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return conferences.filter((conf) => {
      const matchSearch =
        !searchTerm ||
        conf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conf.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conf.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conf.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchCategory =
        selectedCategory === 'all' || conf.category.toLowerCase() === selectedCategory.toLowerCase()

      let matchStatus = true
      if (selectedStatus === 'featured') {
        matchStatus = Boolean(conf.featured)
      } else if (selectedStatus === 'upcoming') {
        matchStatus = conf.startDate >= today
      } else if (selectedStatus === 'completed') {
        matchStatus = conf.endDate < today || conf.status === 'completed'
      } else if (selectedStatus !== 'all') {
        matchStatus = conf.status === selectedStatus
      }

      return matchSearch && matchCategory && matchStatus
    })
  }, [conferences, searchTerm, selectedCategory, selectedStatus])

  // Paginated items
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredConferences.slice(start, start + pageSize)
  }, [filteredConferences, page, pageSize])

  const totalPages = Math.ceil(filteredConferences.length / pageSize)

  const handleDelete = async () => {
    if (!deleteConf) return
    try {
      setDeleting(true)
      await adminConferenceService.delete(deleteConf.id)
      setConferences((prev) => prev.filter((c) => c.id !== deleteConf.id))
      showSuccess(`Conference "${deleteConf.title}" deleted successfully.`)
      setDeleteConf(null)
    } catch {
      showError('Failed to delete conference.')
    } finally {
      setDeleting(false)
    }
  }

  const handleTogglePublish = async (conf: Conference) => {
    try {
      const updated = await adminConferenceService.togglePublish(conf.id)
      setConferences((prev) => prev.map((c) => (c.id === conf.id ? updated : c)))
      showSuccess(`Conference status updated to ${updated.status}.`)
    } catch {
      showError('Failed to update publish status.')
    }
  }

  const handleToggleFeatured = async (conf: Conference) => {
    try {
      const updated = await adminConferenceService.toggleFeatured(conf.id)
      setConferences((prev) => prev.map((c) => (c.id === conf.id ? updated : c)))
      showSuccess(`Conference ${updated.featured ? 'marked as featured' : 'unfeatured'}.`)
    } catch {
      showError('Failed to toggle featured state.')
    }
  }

  const filterConfigs: FilterConfig[] = [
    {
      key: 'category',
      label: 'Category',
      value: selectedCategory,
      options: CATEGORY_OPTIONS,
      onChange: (val) => {
        setSelectedCategory(val)
        setPage(1)
      },
    },
    {
      key: 'status',
      label: 'Status',
      value: selectedStatus,
      options: STATUS_FILTER_OPTIONS,
      onChange: (val) => {
        setSelectedStatus(val)
        setPage(1)
      },
    },
  ]

  const columns: AdminTableColumn<Conference>[] = [
    {
      key: 'title',
      header: 'Conference',
      render: (conf) => (
        <div className="az-table-item-media">
          <div className="az-table-item-media__thumb">
            {conf.image ? (
              <img src={conf.image} alt={conf.title} />
            ) : (
              <Calendar size={18} />
            )}
          </div>
          <div className="az-table-item-media__details">
            <strong className="az-table-item-media__title" title={conf.title}>
              {conf.title}
            </strong>
            <span className="az-table-item-media__sub">{conf.category}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'dates',
      header: 'Dates',
      render: (conf) => (
        <div className="az-cell-date">
          <span>{conf.startDate}</span>
          <small>to {conf.endDate}</small>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (conf) => (
        <div className="az-cell-location">
          <span>{conf.city}, {conf.country}</span>
          {conf.venue && <small title={conf.venue}>{conf.venue}</small>}
        </div>
      ),
    },
    {
      key: 'registrations',
      header: 'Attendees',
      align: 'center',
      render: (conf) => (
        <span className="az-badge az-badge--neutral">
          {conf.attendeesCount || 0} registered
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (conf) => {
        const isOpen = conf.status === 'registration_open' || conf.status === 'open'
        return (
          <button
            type="button"
            className="az-status-toggle-btn"
            onClick={() => handleTogglePublish(conf)}
            title="Click to toggle publish status"
          >
            <Badge variant={isOpen ? 'success' : 'neutral'}>
              {isOpen ? 'Registration Open' : conf.status.replace('_', ' ')}
            </Badge>
          </button>
        )
      },
    },
    {
      key: 'featured',
      header: 'Featured',
      align: 'center',
      render: (conf) => (
        <button
          type="button"
          className={`az-feature-star ${conf.featured ? 'is-active' : ''}`}
          onClick={() => handleToggleFeatured(conf)}
          aria-label={conf.featured ? 'Unfeature conference' : 'Feature conference'}
          title={conf.featured ? 'Featured on home page' : 'Click to feature'}
        >
          <Star size={16} fill={conf.featured ? 'currentColor' : 'none'} />
        </button>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (conf) => (
        <div className="az-action-buttons">
          <a
            href={`/conferences/${conf.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="az-action-btn"
            title="View public page"
          >
            <Eye size={15} />
          </a>
          <button
            type="button"
            className="az-action-btn"
            onClick={() => navigate(`/admin/conferences/${conf.id}/edit`)}
            title="Edit conference"
          >
            <Edit size={15} />
          </button>
          <button
            type="button"
            className="az-action-btn az-action-btn--danger"
            onClick={() => setDeleteConf(conf)}
            title="Delete conference"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ]

  const isFiltered = searchTerm !== '' || selectedCategory !== 'all' || selectedStatus !== 'all'

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedStatus('all')
    setPage(1)
  }

  return (
    <div className="az-admin-page">
      <AdminBreadcrumbs
        items={[
          { label: 'Dashboard', to: ROUTES.adminDashboard },
          { label: 'Conferences' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Conference Management</h1>
          <p className="az-admin-page__subtitle">
            Create, schedule, edit and monitor international summit listings.
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Link to={ROUTES.adminConferenceNew}>
            <Button size="sm">
              <Plus size={15} />
              Add Conference
            </Button>
          </Link>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="az-admin-toolbar">
        <AdminSearch
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val)
            setPage(1)
          }}
          placeholder="Search by title, location, category..."
          ariaLabel="Search conferences"
          className="az-admin-toolbar__search"
        />
        <AdminFilters
          filters={filterConfigs}
          isFiltered={isFiltered}
          onReset={handleResetFilters}
          className="az-admin-toolbar__filters"
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={paginatedData}
        loading={loading}
        emptyMessage="No conferences found."
        emptyDescription="Try adjusting your search criteria or add a new conference."
        emptyAction={
          <Link to={ROUTES.adminConferenceNew}>
            <Button size="sm">
              <Plus size={14} />
              Add Conference
            </Button>
          </Link>
        }
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredConferences.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize)
          setPage(1)
        }}
      />

      {/* Delete Confirmation Modal */}
      <AdminModal
        open={Boolean(deleteConf)}
        onClose={() => setDeleteConf(null)}
        title="Delete Conference"
        description="Are you sure you want to delete this conference? This action cannot be undone and will remove all associated session tracks and mock registrations."
        variant="danger"
        confirmLabel="Delete Conference"
        onConfirm={handleDelete}
        confirmLoading={deleting}
      >
        {deleteConf && (
          <div className="az-confirm-box">
            <strong>{deleteConf.title}</strong>
            <p>
              {deleteConf.city}, {deleteConf.country} • {deleteConf.startDate}
            </p>
          </div>
        )}
      </AdminModal>
    </div>
  )
}
