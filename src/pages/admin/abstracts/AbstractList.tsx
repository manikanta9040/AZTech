import { useEffect, useMemo, useState } from 'react'
import { Eye, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminFilters, type FilterConfig } from '../../../components/admin/AdminFilters'
import { AdminPagination } from '../../../components/admin/AdminPagination'
import { AdminSearch } from '../../../components/admin/AdminSearch'
import { AdminTable, type AdminTableColumn } from '../../../components/admin/AdminTable'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Badge } from '../../../components/common/Badge'
import { ROUTES } from '../../../constants/routes'
import { adminAbstractService } from '../../../services/adminAbstractService'
import type { AbstractStatus, AbstractSubmission } from '../../../types/abstract'

const STATUS_FILTER_OPTIONS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Submitted (New)', value: 'SUBMITTED' },
  { label: 'Under Review', value: 'UNDER_REVIEW' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Revision Required', value: 'REVISION_REQUIRED' },
  { label: 'Rejected', value: 'REJECTED' },
]

export default function AbstractList() {
  const navigate = useNavigate()
  const { showError } = useAdminToast()

  const [abstracts, setAbstracts] = useState<AbstractSubmission[]>([])
  const [loading, setLoading] = useState(true)

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    let isMounted = true
    adminAbstractService
      .getAll()
      .then((data) => {
        if (isMounted) setAbstracts(data)
      })
      .catch(() => {
        if (isMounted) showError('Failed to load abstract submissions.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [showError])

  const filteredAbstracts = useMemo(() => {
    return abstracts.filter((abs) => {
      const matchSearch =
        !searchTerm ||
        abs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (abs.conferenceTitle && abs.conferenceTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
        abs.authors.some(
          (a) =>
            a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.organization.toLowerCase().includes(searchTerm.toLowerCase())
        )

      const matchStatus = statusFilter === 'all' || abs.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [abstracts, searchTerm, statusFilter])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredAbstracts.slice(start, start + pageSize)
  }, [filteredAbstracts, page, pageSize])

  const totalPages = Math.ceil(filteredAbstracts.length / pageSize)

  const getStatusBadge = (status: AbstractStatus) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="success">Approved</Badge>
      case 'UNDER_REVIEW':
        return <Badge variant="primary">Under Review</Badge>
      case 'SUBMITTED':
        return <Badge variant="warning">Submitted</Badge>
      case 'REVISION_REQUIRED':
        return <Badge variant="info">Revision Req.</Badge>
      case 'REJECTED':
        return <Badge variant="error">Rejected</Badge>
      default:
        return <Badge variant="neutral">{status}</Badge>
    }
  }

  const filterConfigs: FilterConfig[] = [
    {
      key: 'status',
      label: 'Review Status',
      value: statusFilter,
      options: STATUS_FILTER_OPTIONS,
      onChange: (val) => {
        setStatusFilter(val)
        setPage(1)
      },
    },
  ]

  const isFiltered = searchTerm !== '' || statusFilter !== 'all'

  const handleReset = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setPage(1)
  }

  const columns: AdminTableColumn<AbstractSubmission>[] = [
    {
      key: 'title',
      header: 'Abstract Title',
      render: (abs) => (
        <div className="az-table-item-media">
          <div className="az-table-item-media__avatar az-table-item-media__avatar--icon">
            <FileText size={18} />
          </div>
          <div className="az-table-item-media__details">
            <strong className="az-table-item-media__title" title={abs.title}>
              {abs.title}
            </strong>
            <span className="az-table-item-media__sub">
              {abs.authors[0]?.name || 'Unknown Author'} ({abs.authors[0]?.organization || 'Affiliation'})
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'conference',
      header: 'Target Conference',
      render: (abs) => (
        <span className="az-truncate-text" title={abs.conferenceTitle || abs.conferenceId}>
          {abs.conferenceTitle || abs.conferenceId}
        </span>
      ),
    },
    {
      key: 'submittedAt',
      header: 'Submission Date',
      render: (abs) => <span className="az-muted">{abs.submittedAt}</span>,
    },
    {
      key: 'reviewer',
      header: 'Reviewer',
      render: (abs) => (
        <span className="az-cell-reviewer">
          {abs.reviewer && abs.reviewer !== 'Unassigned' ? (
            <span>{abs.reviewer}</span>
          ) : (
            <span className="az-muted" style={{ fontStyle: 'italic' }}>
              Unassigned
            </span>
          )}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (abs) => getStatusBadge(abs.status),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (abs) => (
        <div className="az-action-buttons">
          <button
            type="button"
            className="az-button az-button--outline az-button--sm"
            onClick={() => navigate(`/admin/abstracts/${abs.id}`)}
          >
            <Eye size={14} />
            Review
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
          { label: 'Abstracts' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Abstract Management & Peer Review</h1>
          <p className="az-admin-page__subtitle">
            Evaluate scientific submissions, assign reviewers, request revisions, and issue decisions.
          </p>
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
          placeholder="Search by abstract title, author, conference..."
          ariaLabel="Search abstracts"
          className="az-admin-toolbar__search"
        />
        <AdminFilters
          filters={filterConfigs}
          isFiltered={isFiltered}
          onReset={handleReset}
          className="az-admin-toolbar__filters"
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={paginatedData}
        loading={loading}
        emptyMessage="No abstract submissions found."
        emptyDescription="Try clearing filters or search terms."
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredAbstracts.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s)
          setPage(1)
        }}
      />
    </div>
  )
}
