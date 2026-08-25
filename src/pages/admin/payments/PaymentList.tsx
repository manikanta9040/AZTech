import { useEffect, useMemo, useState } from 'react'
import {
  CreditCard,
  Eye,
  RefreshCw,
} from 'lucide-react'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminFilters, type FilterConfig } from '../../../components/admin/AdminFilters'
import { AdminModal } from '../../../components/admin/AdminModal'
import { AdminPagination } from '../../../components/admin/AdminPagination'
import { AdminSearch } from '../../../components/admin/AdminSearch'
import { AdminTable, type AdminTableColumn } from '../../../components/admin/AdminTable'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Badge } from '../../../components/common/Badge'
import { ROUTES } from '../../../constants/routes'
import { adminPaymentService } from '../../../services/adminPaymentService'
import type { AdminPaymentStatus, Payment } from '../../../types/payment'

const STATUS_FILTER_OPTIONS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Paid (Settled)', value: 'PAID' },
  { label: 'Pending Transfer', value: 'PENDING' },
  { label: 'Failed / Declined', value: 'FAILED' },
  { label: 'Refunded', value: 'REFUNDED' },
]

export default function PaymentList() {
  const { showSuccess, showError } = useAdminToast()

  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Modals
  const [viewPayment, setViewPayment] = useState<Payment | null>(null)
  const [statusModalPayment, setStatusModalPayment] = useState<Payment | null>(null)
  const [targetStatus, setTargetStatus] = useState<AdminPaymentStatus>('PAID')

  useEffect(() => {
    let isMounted = true
    adminPaymentService
      .getAll()
      .then((data) => {
        if (isMounted) setPayments(data)
      })
      .catch(() => {
        if (isMounted) showError('Failed to load transaction ledger.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [showError])

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        !searchTerm ||
        p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.participantEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.conferenceTitle.toLowerCase().includes(searchTerm.toLowerCase())

      const matchStatus = statusFilter === 'all' || p.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [payments, searchTerm, statusFilter])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredPayments.slice(start, start + pageSize)
  }, [filteredPayments, page, pageSize])

  const totalPages = Math.ceil(filteredPayments.length / pageSize)

  const handleUpdateStatus = async () => {
    if (!statusModalPayment) return
    try {
      const updated = await adminPaymentService.updateStatus(statusModalPayment.id, targetStatus)
      setPayments((prev) => prev.map((p) => (p.id === statusModalPayment.id ? updated : p)))
      showSuccess(`Payment transaction status updated to ${targetStatus}.`)
      setStatusModalPayment(null)
    } catch {
      showError('Failed to update payment status.')
    }
  }

  const getStatusBadge = (status: AdminPaymentStatus) => {
    switch (status) {
      case 'PAID':
        return <Badge variant="success">Paid</Badge>
      case 'PENDING':
        return <Badge variant="warning">Pending</Badge>
      case 'FAILED':
        return <Badge variant="error">Failed</Badge>
      case 'REFUNDED':
        return <Badge variant="info">Refunded</Badge>
      default:
        return <Badge variant="neutral">{status}</Badge>
    }
  }

  const filterConfigs: FilterConfig[] = [
    {
      key: 'status',
      label: 'Payment Status',
      value: statusFilter,
      options: STATUS_FILTER_OPTIONS,
      onChange: (val) => {
        setStatusFilter(val)
        setPage(1)
      },
    },
  ]

  const isFiltered = searchTerm !== '' || statusFilter !== 'all'

  const columns: AdminTableColumn<Payment>[] = [
    {
      key: 'transactionId',
      header: 'Transaction ID & Invoice',
      render: (pay) => (
        <div className="az-cell-date">
          <strong style={{ fontFamily: 'monospace' }}>{pay.transactionId}</strong>
          <small>{pay.invoiceNumber || 'INV-GEN'}</small>
        </div>
      ),
    },
    {
      key: 'participant',
      header: 'Participant',
      render: (pay) => (
        <div className="az-cell-user">
          <strong>{pay.participantName}</strong>
          <small>{pay.participantEmail}</small>
        </div>
      ),
    },
    {
      key: 'conference',
      header: 'Conference',
      render: (pay) => (
        <span className="az-truncate-text" title={pay.conferenceTitle}>
          {pay.conferenceTitle}
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      align: 'right',
      render: (pay) => (
        <strong style={{ fontSize: '0.95rem' }}>
          ${pay.amount}.00 <small className="az-muted">{pay.currency}</small>
        </strong>
      ),
    },
    {
      key: 'method',
      header: 'Method',
      render: (pay) => (
        <div className="az-cell-method">
          <CreditCard size={14} className="az-muted" />
          <span>{pay.paymentMethod}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (pay) => getStatusBadge(pay.status),
    },
    {
      key: 'date',
      header: 'Date',
      render: (pay) => <span className="az-muted">{pay.date}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (pay) => (
        <div className="az-action-buttons">
          <button
            type="button"
            className="az-action-btn"
            title="View transaction receipt"
            onClick={() => setViewPayment(pay)}
          >
            <Eye size={15} />
          </button>
          <button
            type="button"
            className="az-action-btn"
            title="Update payment status"
            onClick={() => {
              setStatusModalPayment(pay)
              setTargetStatus(pay.status)
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
          { label: 'Payments' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Payment Transactions</h1>
          <p className="az-admin-page__subtitle">
            Reconcile delegate fee payments, gateways, settlements, and refunds.
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
          placeholder="Search by transaction ID, participant, or conference..."
          ariaLabel="Search payments"
          className="az-admin-toolbar__search"
        />
        <AdminFilters
          filters={filterConfigs}
          isFiltered={isFiltered}
          onReset={() => {
            setSearchTerm('')
            setStatusFilter('all')
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
        emptyMessage="No payment transactions found."
        emptyDescription="Try adjusting search or status filters."
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredPayments.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s)
          setPage(1)
        }}
      />

      {/* View Payment Modal */}
      <AdminModal
        open={Boolean(viewPayment)}
        onClose={() => setViewPayment(null)}
        title="Transaction & Receipt Details"
        description={`Transaction Reference: ${viewPayment?.transactionId}`}
        cancelLabel="Close"
      >
        {viewPayment && (
          <div className="az-details-grid">
            <div className="az-detail-item">
              <span className="az-detail-label">Transaction ID</span>
              <code className="az-detail-code">{viewPayment.transactionId}</code>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Invoice Number</span>
              <strong className="az-detail-value">{viewPayment.invoiceNumber || 'INV-2026-0041'}</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Payer Name</span>
              <strong className="az-detail-value">{viewPayment.participantName}</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Payer Email</span>
              <span className="az-detail-value">{viewPayment.participantEmail}</span>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Conference</span>
              <strong className="az-detail-value">{viewPayment.conferenceTitle}</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Payment Method</span>
              <span className="az-detail-value">{viewPayment.paymentMethod}</span>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Gross Amount</span>
              <strong className="az-detail-value" style={{ fontSize: '1.2rem', color: '#102a43' }}>
                ${viewPayment.amount}.00 {viewPayment.currency}
              </strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Settlement Status</span>
              <div>{getStatusBadge(viewPayment.status)}</div>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Payment Date</span>
              <span className="az-detail-value">{viewPayment.date}</span>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Update Payment Status Modal */}
      <AdminModal
        open={Boolean(statusModalPayment)}
        onClose={() => setStatusModalPayment(null)}
        title="Update Transaction Status"
        description={`Update settlement status for transaction ${statusModalPayment?.transactionId}`}
        confirmLabel="Save Payment Status"
        onConfirm={handleUpdateStatus}
      >
        {statusModalPayment && (
          <div className="az-modal-form-body">
            <div className="az-field">
              <label className="az-label">Select Payment Status</label>
              <select
                className="az-select"
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value as AdminPaymentStatus)}
              >
                <option value="PAID">PAID (Successfully Settled)</option>
                <option value="PENDING">PENDING (Processing / Wire Pending)</option>
                <option value="FAILED">FAILED (Declined)</option>
                <option value="REFUNDED">REFUNDED (Reversed to Payer)</option>
              </select>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  )
}
