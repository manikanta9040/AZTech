import { useEffect, useMemo, useState } from 'react'
import { Edit, Eye, Plus, Star, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminModal } from '../../../components/admin/AdminModal'
import { AdminPagination } from '../../../components/admin/AdminPagination'
import { AdminSearch } from '../../../components/admin/AdminSearch'
import { AdminTable, type AdminTableColumn } from '../../../components/admin/AdminTable'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Button } from '../../../components/common/Button'
import { ROUTES } from '../../../constants/routes'
import { adminSpeakerService } from '../../../services/adminSpeakerService'
import type { Speaker } from '../../../types/speaker'

export default function SpeakerList() {
  const navigate = useNavigate()
  const { showSuccess, showError } = useAdminToast()

  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFeatured, setFilterFeatured] = useState('all')

  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Delete modal
  const [deleteSpeaker, setDeleteSpeaker] = useState<Speaker | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let isMounted = true
    adminSpeakerService
      .getAll()
      .then((data) => {
        if (isMounted) setSpeakers(data)
      })
      .catch(() => {
        if (isMounted) showError('Failed to load speakers.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [showError])

  const filteredSpeakers = useMemo(() => {
    return speakers.filter((spk) => {
      const matchSearch =
        !searchTerm ||
        spk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        spk.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        spk.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        spk.country.toLowerCase().includes(searchTerm.toLowerCase())

      const matchFeatured =
        filterFeatured === 'all'
          ? true
          : filterFeatured === 'featured'
          ? Boolean(spk.featured)
          : !spk.featured

      return matchSearch && matchFeatured
    })
  }, [speakers, searchTerm, filterFeatured])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredSpeakers.slice(start, start + pageSize)
  }, [filteredSpeakers, page, pageSize])

  const totalPages = Math.ceil(filteredSpeakers.length / pageSize)

  const handleDelete = async () => {
    if (!deleteSpeaker) return
    try {
      setDeleting(true)
      await adminSpeakerService.delete(deleteSpeaker.id)
      setSpeakers((prev) => prev.filter((s) => s.id !== deleteSpeaker.id))
      showSuccess(`Speaker "${deleteSpeaker.name}" deleted successfully.`)
      setDeleteSpeaker(null)
    } catch {
      showError('Failed to delete speaker.')
    } finally {
      setDeleting(false)
    }
  }

  const handleToggleFeatured = async (spk: Speaker) => {
    try {
      const updated = await adminSpeakerService.toggleFeatured(spk.id)
      setSpeakers((prev) => prev.map((s) => (s.id === spk.id ? updated : s)))
      showSuccess(`Speaker ${updated.featured ? 'marked as featured' : 'unfeatured'}.`)
    } catch {
      showError('Failed to update speaker featured state.')
    }
  }

  const columns: AdminTableColumn<Speaker>[] = [
    {
      key: 'name',
      header: 'Speaker',
      render: (spk) => (
        <div className="az-table-item-media">
          <div className="az-table-item-media__avatar">
            {spk.image ? (
              <img src={spk.image} alt={spk.name} />
            ) : (
              <div className="az-avatar-fallback">{spk.name.charAt(0)}</div>
            )}
          </div>
          <div className="az-table-item-media__details">
            <strong className="az-table-item-media__title">{spk.name}</strong>
            <span className="az-table-item-media__sub">{spk.designation}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'organization',
      header: 'Organization & Country',
      render: (spk) => (
        <div className="az-cell-location">
          <strong>{spk.organization}</strong>
          <small>{spk.country}</small>
        </div>
      ),
    },
    {
      key: 'expertise',
      header: 'Primary Expertise',
      render: (spk) => (
        <div className="az-tag-cloud">
          {(spk.expertise || []).slice(0, 2).map((exp, idx) => (
            <span key={idx} className="az-badge az-badge--neutral">
              {exp}
            </span>
          ))}
          {(spk.expertise || []).length > 2 && (
            <small className="az-muted">+{spk.expertise.length - 2} more</small>
          )}
        </div>
      ),
    },
    {
      key: 'featured',
      header: 'Featured',
      align: 'center',
      render: (spk) => (
        <button
          type="button"
          className={`az-feature-star ${spk.featured ? 'is-active' : ''}`}
          onClick={() => handleToggleFeatured(spk)}
          aria-label={spk.featured ? 'Unfeature speaker' : 'Feature speaker'}
          title={spk.featured ? 'Keynote featured' : 'Click to feature'}
        >
          <Star size={16} fill={spk.featured ? 'currentColor' : 'none'} />
        </button>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (spk) => (
        <div className="az-action-buttons">
          <a
            href={`/speakers/${spk.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="az-action-btn"
            title="View public profile"
          >
            <Eye size={15} />
          </a>
          <button
            type="button"
            className="az-action-btn"
            onClick={() => navigate(`/admin/speakers/${spk.id}/edit`)}
            title="Edit speaker"
          >
            <Edit size={15} />
          </button>
          <button
            type="button"
            className="az-action-btn az-action-btn--danger"
            onClick={() => setDeleteSpeaker(spk)}
            title="Delete speaker"
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
          { label: 'Speakers' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Speaker Management</h1>
          <p className="az-admin-page__subtitle">
            Manage keynote pioneers, academic luminaries, and industry researchers.
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Link to={ROUTES.adminSpeakerNew}>
            <Button size="sm">
              <Plus size={15} />
              Add Speaker
            </Button>
          </Link>
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
          placeholder="Search by name, organization, designation..."
          ariaLabel="Search speakers"
          className="az-admin-toolbar__search"
        />

        <div className="az-admin-filter-item">
          <select
            className="az-admin-filter-select"
            value={filterFeatured}
            onChange={(e) => {
              setFilterFeatured(e.target.value)
              setPage(1)
            }}
            aria-label="Filter featured speakers"
          >
            <option value="all">All Speakers</option>
            <option value="featured">Featured Keynotes Only</option>
            <option value="regular">Standard Speakers</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={paginatedData}
        loading={loading}
        emptyMessage="No speakers found."
        emptyDescription="Try adjusting your search criteria or add a new speaker."
        emptyAction={
          <Link to={ROUTES.adminSpeakerNew}>
            <Button size="sm">
              <Plus size={14} />
              Add Speaker
            </Button>
          </Link>
        }
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredSpeakers.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s)
          setPage(1)
        }}
      />

      {/* Delete Confirmation Modal */}
      <AdminModal
        open={Boolean(deleteSpeaker)}
        onClose={() => setDeleteSpeaker(null)}
        title="Delete Speaker"
        description="Are you sure you want to remove this speaker from the platform directory?"
        variant="danger"
        confirmLabel="Delete Speaker"
        onConfirm={handleDelete}
        confirmLoading={deleting}
      >
        {deleteSpeaker && (
          <div className="az-confirm-box">
            <strong>{deleteSpeaker.name}</strong>
            <p>
              {deleteSpeaker.designation} • {deleteSpeaker.organization}
            </p>
          </div>
        )}
      </AdminModal>
    </div>
  )
}
