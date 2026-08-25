import { useEffect, useMemo, useState } from 'react'
import { Eye, RefreshCw } from 'lucide-react'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminFilters, type FilterConfig } from '../../../components/admin/AdminFilters'
import { AdminModal } from '../../../components/admin/AdminModal'
import { AdminPagination } from '../../../components/admin/AdminPagination'
import { AdminSearch } from '../../../components/admin/AdminSearch'
import { AdminTable, type AdminTableColumn } from '../../../components/admin/AdminTable'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Badge } from '../../../components/common/Badge'
import { ROUTES } from '../../../constants/routes'
import { adminRegistrationService } from '../../../services/adminRegistrationService'
import type { PaymentStatus, Registration, RegistrationStatus } from '../../../types/registration'

const STATUS_FILTER_OPTIONS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Confirmed', value: 'CONFIRMED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Cancelled', value: 'CANCELLED' },
]

const PAYMENT_FILTER_OPTIONS = [
  { label: 'All Payments', value: 'all' },
  { label: 'Paid', value: 'PAID' },
  { label: 'Payment Pending', value: 'PENDING' },
  { label: 'Payment Failed', value: 'FAILED' },
]

export default function RegistrationList() {
  const { showSuccess, showError } = useAdminToast()

  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')

  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Detail Modal
  const [viewReg, setViewReg] = useState<Registration | null>(null)

  // Status Change Modal
  const [statusModalReg, setStatusModalReg] = useState<Registration | null>(null)
  const [targetStatus, setTargetStatus] = useState<RegistrationStatus>('CONFIRMED')
  const [targetPaymentStatus, setTargetPaymentStatus] = useState<PaymentStatus>('PAID')

  useEffect(() => {
    let isMounted = true
    adminRegistrationService
      .getAll()
      .then((data) => {
        if (isMounted) setRegistrations(data)
      })
      .catch(() => {
        if (isMounted) showError('Failed to load registrations.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [showError])

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      const matchSearch =
        !searchTerm ||
        reg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (reg.participantName && reg.participantName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (reg.participantEmail && reg.participantEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (reg.conferenceTitle && reg.conferenceTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
        reg.conferenceId.toLowerCase().includes(searchTerm.toLowerCase())

      const matchStatus = statusFilter === 'all' || reg.status === statusFilter
      const matchPayment = paymentFilter === 'all' || reg.paymentStatus === paymentFilter

      return matchSearch && matchStatus && matchPayment
    })
  }, [registrations, searchTerm, statusFilter, paymentFilter])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredRegistrations.slice(start, start + pageSize)
  }, [filteredRegistrations, page, pageSize])

  const totalPages = Math.ceil(filteredRegistrations.length / pageSize)

  const handleUpdateStatus = async () => {
    if (!statusModalReg) return
    try {
      const updated = await adminRegistrationService.updateStatus(
        statusModalReg.id,
        targetStatus,
        targetPaymentStatus
      )
      setRegistrations((prev) => prev.map((r) => (r.id === statusModalReg.id ? updated : r)))
      showSuccess(`Registration "${statusModalReg.id}" updated successfully.`)
      setStatusModalReg(null)
    } catch {
      showError('Failed to update registration status.')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'PAID':
        return <Badge variant="success">{status}</Badge>
      case 'PENDING':
        return <Badge variant="warning">{status}</Badge>
      case 'CANCELLED':
      case 'FAILED':
        return <Badge variant="error">{status}</Badge>
      default:
        return <Badge variant="neutral">{status}</Badge>
    }
  }

  const filterConfigs: FilterConfig[] = [
    {
      key: 'status',
      label: 'Registration Status',
      value: statusFilter,
      options: STATUS_FILTER_OPTIONS,
      onChange: (val) => {
        setStatusFilter(val)
        setPage(1)
      },
    },
    {
      key: 'payment',
      label: 'Payment Status',
      value: paymentFilter,
      options: PAYMENT_FILTER_OPTIONS,
      onChange: (val) => {
        setPaymentFilter(val)
        setPage(1)
      },
    },
  ]

  const isFiltered = searchTerm !== '' || statusFilter !== 'all' || paymentFilter !== 'all'

  const handleReset = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setPaymentFilter('all')
    setPage(1)
  }

  const columns: AdminTableColumn<Registration>[] = [
    {
      key: 'id',
      header: 'Reg ID & Date',
      render: (reg) => (
        <div className="az-cell-date">
          <strong>{reg.id}</strong>
          <small>{reg.registeredAt}</small>
        </div>
      ),
    },
    {
      key: 'participant',
      header: 'Participant',
      render: (reg) => (
        <div className="az-cell-user">
          <strong>{reg.participantName || 'Attendee'}</strong>
          <small>{reg.participantEmail || reg.userId}</small>
        </div>
      ),
    },
    {
      key: 'conference',
      header: 'Conference',
      render: (reg) => (
        <span className="az-truncate-text" title={reg.conferenceTitle || reg.conferenceId}>
          {reg.conferenceTitle || reg.conferenceId}
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (reg) => <span className="az-badge az-badge--neutral">{reg.registrationType}</span>,
    },
    {
      key: 'amount',
      header: 'Amount',
      align: 'right',
      render: (reg) => <strong>${reg.amount}.00</strong>,
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      align: 'center',
      render: (reg) => getStatusBadge(reg.paymentStatus),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (reg) => getStatusBadge(reg.status),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (reg) => (
        <div className="az-action-buttons">
          <button
            type="button"
            className="az-action-btn"
            title="View registration receipt"
            onClick={() => setViewReg(reg)}
          >
            <Eye size={15} />
          </button>
          <button
            type="button"
            className="az-action-btn"
            title="Update registration status"
            onClick={() => {
              setStatusModalReg(reg)
              setTargetStatus(reg.status)
              setTargetPaymentStatus(reg.paymentStatus)
            }}
          >
            <RefreshCw size={15} />
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
          { label: 'Registrations' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Registration Management</h1>
          <p className="az-admin-page__subtitle">
            Track delegate bookings, pass confirmations, payment receipts, and cancellations.
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
          placeholder="Search by participant, registration ID, conference..."
          ariaLabel="Search registrations"
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
        emptyMessage="No registrations found."
        emptyDescription="Try clearing filters or search terms."
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredRegistrations.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s)
          setPage(1)
        }}
      />

      {/* View Detail Modal */}
      <AdminModal
        open={Boolean(viewReg)}
        onClose={() => setViewReg(null)}
        title="Registration & Ticket Details"
        description={`Registration ID: ${viewReg?.id}`}
        cancelLabel="Close"
      >
        {viewReg && (
          <div className="az-details-grid">
            <div className="az-detail-item">
              <span className="az-detail-label">Participant Name</span>
              <strong className="az-detail-value">{viewReg.participantName || 'Attendee'}</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Email Address</span>
              <span className="az-detail-value">{viewReg.participantEmail || viewReg.userId}</span>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Organization</span>
              <span className="az-detail-value">{viewReg.organization || 'Independent'}</span>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Conference</span>
              <strong className="az-detail-value">{viewReg.conferenceTitle || viewReg.conferenceId}</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Registration Type</span>
              <span className="az-detail-value">{viewReg.registrationType}</span>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Ticket Pass Code</span>
              <code className="az-detail-code">{viewReg.ticketCode || 'TCK-PASS-991'}</code>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Registration Fee</span>
              <strong className="az-detail-value">${viewReg.amount}.00</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Payment Status</span>
              <div>{getStatusBadge(viewReg.paymentStatus)}</div>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Registration Status</span>
              <div>{getStatusBadge(viewReg.status)}</div>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Booking Timestamp</span>
              <span className="az-detail-value">{viewReg.registeredAt}</span>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Update Status Modal */}
      <AdminModal
        open={Boolean(statusModalReg)}
        onClose={() => setStatusModalReg(null)}
        title="Update Registration Status"
        description={`Update pass status and payment state for ${statusModalReg?.id}`}
        confirmLabel="Save Status"
        onConfirm={handleUpdateStatus}
      >
        {statusModalReg && (
          <div className="az-modal-form-body">
            <div className="az-field">
              <label className="az-label">Registration Pass Status</label>
              <select
                className="az-select"
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value as RegistrationStatus)}
              >
                <option value="CONFIRMED">CONFIRMED (Valid Ticket)</option>
                <option value="PENDING">PENDING (Awaiting Review/Payment)</option>
                <option value="CANCELLED">CANCELLED (Revoked Pass)</option>
              </select>
            </div>

            <div className="az-field" style={{ marginTop: '1rem' }}>
              <label className="az-label">Payment Status</label>
              <select
                className="az-select"
                value={targetPaymentStatus}
                onChange={(e) => setTargetPaymentStatus(e.target.value as PaymentStatus)}
              >
                <option value="PAID">PAID (Settled)</option>
                <option value="PENDING">PENDING (Awaiting Transfer)</option>
                <option value="FAILED">FAILED (Declined)</option>
              </select>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  )
}
