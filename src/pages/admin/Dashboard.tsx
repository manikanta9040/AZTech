import { useEffect, useState } from 'react'
import {
  Calendar,
  FileText,
  Mic,
  Plus,
  Ticket,
  Users,
  Eye,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../components/admin/AdminBreadcrumbs'
import { AdminModal } from '../../components/admin/AdminModal'
import { AdminStatCard } from '../../components/admin/AdminStatCard'
import {
  CategoryPieChart,
  RegistrationTrendChart,
  RevenueOverviewChart,
} from '../../components/admin/DashboardCharts'
import { Badge } from '../../components/common/Badge'
import { Button } from '../../components/common/Button'
import { ROUTES } from '../../constants/routes'
import { mockAdminStats, mockCategoryStats, mockRegistrationGrowth } from '../../data/adminStats'
import { adminAbstractService } from '../../services/adminAbstractService'
import { adminConferenceService } from '../../services/adminConferenceService'
import { adminRegistrationService } from '../../services/adminRegistrationService'
import type { AbstractSubmission } from '../../types/abstract'
import type { Conference } from '../../types/conference'
import type { Registration } from '../../types/registration'

export default function Dashboard() {
  const navigate = useNavigate()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [abstracts, setAbstracts] = useState<AbstractSubmission[]>([])
  const [conferences, setConferences] = useState<Conference[]>([])
  const [loading, setLoading] = useState(true)

  // Registration detail modal state
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null)

  useEffect(() => {
    let isMounted = true
    Promise.all([
      adminRegistrationService.getAll(),
      adminAbstractService.getAll(),
      adminConferenceService.getAll(),
    ])
      .then(([regData, absData, confData]) => {
        if (isMounted) {
          setRegistrations(regData.slice(0, 5))
          setAbstracts(absData.slice(0, 5))
          setConferences(confData.slice(0, 4))
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'APPROVED':
      case 'registration_open':
      case 'PAID':
        return <Badge variant="success">{status.replace('_', ' ')}</Badge>
      case 'PENDING':
      case 'UNDER_REVIEW':
      case 'closing_soon':
        return <Badge variant="warning">{status.replace('_', ' ')}</Badge>
      case 'CANCELLED':
      case 'REJECTED':
      case 'closed':
      case 'FAILED':
        return <Badge variant="error">{status.replace('_', ' ')}</Badge>
      case 'REVISION_REQUIRED':
        return <Badge variant="info">Revision Req.</Badge>
      default:
        return <Badge variant="neutral">{status.replace('_', ' ')}</Badge>
    }
  }

  return (
    <div className="az-admin-page">
      <AdminBreadcrumbs items={[{ label: 'Dashboard' }]} />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Welcome to AZTech Admin</h1>
          <p className="az-admin-page__subtitle">
            Manage conferences, users, registrations and content.
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

      {/* 1. Statistics Grid */}
      <section className="az-admin-stats-grid" aria-label="Key Performance Indicators">
        {mockAdminStats.map((stat) => (
          <AdminStatCard key={stat.id} stat={stat} />
        ))}
      </section>

      {/* 2. Quick Actions Bar */}
      <section className="az-admin-quick-bar" aria-label="Quick Actions">
        <h2 className="az-admin-section-title">Quick Actions</h2>
        <div className="az-admin-quick-grid">
          <button
            type="button"
            className="az-admin-quick-btn"
            onClick={() => navigate(ROUTES.adminConferenceNew)}
          >
            <Calendar size={18} />
            <span>Add Conference</span>
          </button>
          <button
            type="button"
            className="az-admin-quick-btn"
            onClick={() => navigate(ROUTES.adminSpeakerNew)}
          >
            <Mic size={18} />
            <span>Add Speaker</span>
          </button>
          <button
            type="button"
            className="az-admin-quick-btn"
            onClick={() => navigate(ROUTES.adminBlogNew)}
          >
            <BookOpen size={18} />
            <span>Create Blog</span>
          </button>
          <button
            type="button"
            className="az-admin-quick-btn"
            onClick={() => navigate(ROUTES.adminAbstracts)}
          >
            <FileText size={18} />
            <span>Review Abstracts</span>
          </button>
          <button
            type="button"
            className="az-admin-quick-btn"
            onClick={() => navigate(ROUTES.adminRegistrations)}
          >
            <Ticket size={18} />
            <span>View Registrations</span>
          </button>
          <button
            type="button"
            className="az-admin-quick-btn"
            onClick={() => navigate(ROUTES.adminUsers)}
          >
            <Users size={18} />
            <span>Manage Users</span>
          </button>
        </div>
      </section>

      {/* 3. Analytics Charts */}
      <section className="az-admin-charts-grid" aria-label="Platform Analytics Charts">
        <div className="az-admin-charts-grid__left">
          <RegistrationTrendChart data={mockRegistrationGrowth} />
        </div>
        <div className="az-admin-charts-grid__right">
          <CategoryPieChart data={mockCategoryStats} />
        </div>
      </section>

      <section className="az-admin-chart-full">
        <RevenueOverviewChart data={mockRegistrationGrowth} />
      </section>

      {/* 4. Two-Column Activity Overview: Registrations & Abstracts */}
      <div className="az-admin-two-col">
        {/* Recent Registrations */}
        <section className="az-admin-card" aria-label="Recent Registrations">
          <div className="az-admin-card__header">
            <div>
              <h2 className="az-admin-card__title">Recent Registrations</h2>
              <p className="az-admin-card__subtitle">Latest conference ticket purchases</p>
            </div>
            <Link to={ROUTES.adminRegistrations} className="az-admin-link-more">
              <span>View all</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="az-admin-table-wrap">
            <table className="az-admin-table">
              <thead>
                <tr>
                  <th scope="col">Participant</th>
                  <th scope="col">Conference</th>
                  <th scope="col">Type</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Status</th>
                  <th scope="col" style={{ textAlign: 'right' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                      Loading registrations...
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#61758a' }}>
                      No recent registrations.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id}>
                      <td>
                        <div className="az-cell-user">
                          <strong>{reg.participantName || 'Attendee'}</strong>
                          <small>{reg.participantEmail || reg.userId}</small>
                        </div>
                      </td>
                      <td>
                        <span className="az-truncate-text" title={reg.conferenceTitle || reg.conferenceId}>
                          {reg.conferenceTitle || reg.conferenceId}
                        </span>
                      </td>
                      <td>
                        <span className="az-badge az-badge--neutral">{reg.registrationType}</span>
                      </td>
                      <td>{getStatusBadge(reg.paymentStatus)}</td>
                      <td>{getStatusBadge(reg.status)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="az-action-btn"
                          title="View registration details"
                          onClick={() => setSelectedReg(reg)}
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Abstracts */}
        <section className="az-admin-card" aria-label="Recent Abstracts">
          <div className="az-admin-card__header">
            <div>
              <h2 className="az-admin-card__title">Recent Abstracts</h2>
              <p className="az-admin-card__subtitle">Submissions requiring peer review</p>
            </div>
            <Link to={ROUTES.adminAbstracts} className="az-admin-link-more">
              <span>View all</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="az-admin-table-wrap">
            <table className="az-admin-table">
              <thead>
                <tr>
                  <th scope="col">Title & Author</th>
                  <th scope="col">Conference</th>
                  <th scope="col">Submitted</th>
                  <th scope="col">Status</th>
                  <th scope="col" style={{ textAlign: 'right' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                      Loading abstracts...
                    </td>
                  </tr>
                ) : abstracts.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#61758a' }}>
                      No recent abstracts.
                    </td>
                  </tr>
                ) : (
                  abstracts.map((abs) => (
                    <tr key={abs.id}>
                      <td>
                        <div className="az-cell-user">
                          <strong className="az-truncate-text" title={abs.title}>
                            {abs.title}
                          </strong>
                          <small>{abs.authors[0]?.name || 'Author'}</small>
                        </div>
                      </td>
                      <td>
                        <span className="az-truncate-text">
                          {abs.conferenceTitle || abs.conferenceId}
                        </span>
                      </td>
                      <td>{abs.submittedAt}</td>
                      <td>{getStatusBadge(abs.status)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          to={`/admin/abstracts/${abs.id}`}
                          className="az-button az-button--outline az-button--sm"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* 5. Upcoming Conferences Overview */}
      <section className="az-admin-card az-admin-upcoming-section" aria-label="Upcoming Conferences">
        <div className="az-admin-card__header">
          <div>
            <h2 className="az-admin-card__title">Upcoming Conferences</h2>
            <p className="az-admin-card__subtitle">Scheduled global scientific events</p>
          </div>
          <Link to={ROUTES.adminConferences} className="az-admin-link-more">
            <span>Manage Conferences</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="az-admin-conf-list">
          {conferences.map((conf) => (
            <div key={conf.id} className="az-admin-conf-row">
              <div className="az-admin-conf-row__info">
                <div className="az-admin-conf-row__thumb">
                  {conf.image ? (
                    <img src={conf.image} alt={conf.title} />
                  ) : (
                    <div className="az-admin-conf-row__placeholder">
                      <Calendar size={18} />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="az-admin-conf-row__title">{conf.title}</h3>
                  <div className="az-admin-conf-row__meta">
                    <span>
                      {conf.startDate} - {conf.endDate}
                    </span>
                    <span>•</span>
                    <span>
                      {conf.city}, {conf.country}
                    </span>
                  </div>
                </div>
              </div>
              <div className="az-admin-conf-row__stats">
                <div>
                  <strong>{conf.attendeesCount || 0}</strong>
                  <small>Attendees</small>
                </div>
                <div>
                  <strong>{conf.speakersCount || 0}</strong>
                  <small>Speakers</small>
                </div>
                <div>{getStatusBadge(conf.status)}</div>
              </div>
              <div className="az-admin-conf-row__action">
                <Link
                  to={`/admin/conferences/${conf.id}/edit`}
                  className="az-button az-button--outline az-button--sm"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* View Registration Detail Modal */}
      <AdminModal
        open={Boolean(selectedReg)}
        onClose={() => setSelectedReg(null)}
        title="Registration Details"
        description={`Registration ID: ${selectedReg?.id}`}
        cancelLabel="Close"
      >
        {selectedReg && (
          <div className="az-details-grid">
            <div className="az-detail-item">
              <span className="az-detail-label">Participant Name</span>
              <strong className="az-detail-value">{selectedReg.participantName || 'N/A'}</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Email Address</span>
              <span className="az-detail-value">{selectedReg.participantEmail || 'N/A'}</span>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Organization</span>
              <span className="az-detail-value">{selectedReg.organization || 'Independent'}</span>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Conference</span>
              <strong className="az-detail-value">{selectedReg.conferenceTitle || selectedReg.conferenceId}</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Registration Type</span>
              <span className="az-detail-value">{selectedReg.registrationType}</span>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Ticket Code</span>
              <code className="az-detail-code">{selectedReg.ticketCode || 'TCK-GEN-991'}</code>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Amount Paid</span>
              <strong className="az-detail-value">${selectedReg.amount}.00</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Payment Status</span>
              <div>{getStatusBadge(selectedReg.paymentStatus)}</div>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Registration Status</span>
              <div>{getStatusBadge(selectedReg.status)}</div>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Date Registered</span>
              <span className="az-detail-value">{selectedReg.registeredAt}</span>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  )
}
