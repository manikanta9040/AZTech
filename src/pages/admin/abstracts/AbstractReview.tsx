import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  UserPlus,
  XCircle,
  Tag,
  Building,
  User,
  MessageSquare,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminModal } from '../../../components/admin/AdminModal'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Badge } from '../../../components/common/Badge'
import { Button } from '../../../components/common/Button'
import { PageLoader } from '../../../components/common/Loader'
import { Select } from '../../../components/common/Select'
import { Textarea } from '../../../components/common/Textarea'
import { ROUTES } from '../../../constants/routes'
import { adminAbstractService } from '../../../services/adminAbstractService'
import type { AbstractStatus, AbstractSubmission } from '../../../types/abstract'

const REVIEWERS_LIST = [
  'Dr. Sarah Mitchell (Stanford University)',
  'Dr. Marcus Vance (MIT Consortia)',
  'Prof. Elena Rostova (AZTech Scientific Board)',
  'Dr. Aris Thorne (Stanford Robotics Lab)',
  'Aisha Al-Mansoor (Khalifa University)',
]

export default function AbstractReview() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showSuccess, showError } = useAdminToast()

  const [abstractData, setAbstractData] = useState<AbstractSubmission | null>(null)
  const [loading, setLoading] = useState(true)

  // Review Dialog State
  const [reviewAction, setReviewAction] = useState<AbstractStatus | null>(null)
  const [reviewerComment, setReviewerComment] = useState('')
  const [assignReviewerOpen, setAssignReviewerOpen] = useState(false)
  const [selectedReviewer, setSelectedReviewer] = useState(REVIEWERS_LIST[0])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      if (!id) return
      try {
        setLoading(true)
        const found = await adminAbstractService.getById(id)
        if (!found) {
          showError('Abstract submission not found.')
          navigate(ROUTES.adminAbstracts)
          return
        }
        setAbstractData(found)
        if (found.reviewerComments) {
          setReviewerComment(found.reviewerComments)
        }
      } catch {
        showError('Failed to load abstract.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, navigate, showError])

  const handleDecisionSubmit = async () => {
    if (!id || !reviewAction) return
    try {
      setSubmitting(true)
      const updated = await adminAbstractService.review(
        id,
        reviewAction,
        reviewerComment.trim() || undefined
      )
      setAbstractData(updated)
      showSuccess(`Abstract decision recorded as "${reviewAction}".`)
      setReviewAction(null)
    } catch {
      showError('Failed to update abstract decision.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleAssignReviewer = async () => {
    if (!id) return
    try {
      setSubmitting(true)
      const updated = await adminAbstractService.assignReviewer(id, selectedReviewer)
      setAbstractData(updated)
      showSuccess(`Assigned reviewer: ${selectedReviewer}.`)
      setAssignReviewerOpen(false)
    } catch {
      showError('Failed to assign reviewer.')
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusBadge = (status: AbstractStatus) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="success">Approved</Badge>
      case 'UNDER_REVIEW':
        return <Badge variant="primary">Under Review</Badge>
      case 'SUBMITTED':
        return <Badge variant="warning">Submitted</Badge>
      case 'REVISION_REQUIRED':
        return <Badge variant="info">Revision Required</Badge>
      case 'REJECTED':
        return <Badge variant="error">Rejected</Badge>
      default:
        return <Badge variant="neutral">{status}</Badge>
    }
  }

  if (loading) return <PageLoader />
  if (!abstractData) return null

  return (
    <div className="az-admin-page">
      <AdminBreadcrumbs
        items={[
          { label: 'Dashboard', to: ROUTES.adminDashboard },
          { label: 'Abstracts', to: ROUTES.adminAbstracts },
          { label: 'Review Abstract' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <div className="az-admin-page__tag-row">
            <span className="az-badge az-badge--neutral">ID: {abstractData.id}</span>
            {getStatusBadge(abstractData.status)}
          </div>
          <h1 className="az-admin-page__title" style={{ marginTop: '0.5rem' }}>
            {abstractData.title}
          </h1>
          <p className="az-admin-page__subtitle">
            Submitted to <strong>{abstractData.conferenceTitle || abstractData.conferenceId}</strong> on{' '}
            {abstractData.submittedAt}
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Link to={ROUTES.adminAbstracts}>
            <Button variant="ghost" size="sm">
              <ArrowLeft size={15} />
              Back to List
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Review Grid */}
      <div className="az-admin-review-grid">
        {/* Left Column: Abstract Body & Authors */}
        <div className="az-admin-review-content">
          {/* Abstract Body Card */}
          <section className="az-admin-card">
            <div className="az-admin-card__header">
              <h2 className="az-admin-card__title">Abstract Text</h2>
            </div>
            <div className="az-admin-card__content">
              <p className="az-abstract-body-text">{abstractData.abstract}</p>
            </div>
            <div className="az-admin-card__footer" style={{ flexDirection: 'column', gap: '0.5rem' }}>
              <strong className="az-detail-label">Keywords:</strong>
              <div className="az-tag-cloud">
                {abstractData.keywords.map((kw, idx) => (
                  <span key={idx} className="az-badge az-badge--neutral">
                    <Tag size={12} style={{ marginRight: '4px' }} />
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Authors Card */}
          <section className="az-admin-card" style={{ marginTop: '1.5rem' }}>
            <div className="az-admin-card__header">
              <h2 className="az-admin-card__title">Authors & Institutional Affiliations</h2>
            </div>
            <div className="az-admin-card__content">
              <div className="az-author-list">
                {abstractData.authors.map((author, idx) => (
                  <div key={idx} className="az-author-item">
                    <div className="az-author-item__avatar">
                      <User size={18} />
                    </div>
                    <div className="az-author-item__info">
                      <strong>{author.name}</strong>
                      <span>{author.email}</span>
                      <small className="az-muted">
                        <Building size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {author.organization} • <em>{author.role}</em>
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Existing Reviewer Comments if any */}
          {abstractData.reviewerComments && (
            <section className="az-admin-card" style={{ marginTop: '1.5rem' }}>
              <div className="az-admin-card__header">
                <h2 className="az-admin-card__title">Reviewer Feedback & Comments</h2>
              </div>
              <div className="az-admin-card__content">
                <div className="az-reviewer-quote">
                  <MessageSquare size={18} className="az-reviewer-quote__icon" />
                  <div>
                    <p>{abstractData.reviewerComments}</p>
                    <small className="az-muted">
                      Reviewed by <strong>{abstractData.reviewer || 'Peer Review Committee'}</strong>{' '}
                      {abstractData.reviewedAt && `• on ${abstractData.reviewedAt}`}
                    </small>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Review Decisions & Actions */}
        <div className="az-admin-review-sidebar">
          {/* Reviewer Assignment Card */}
          <section className="az-admin-card">
            <div className="az-admin-card__header">
              <h3 className="az-admin-card__title">Peer Reviewer</h3>
            </div>
            <div className="az-admin-card__content">
              <div className="az-reviewer-status">
                <span className="az-detail-label">Current Assigned Reviewer:</span>
                <strong>{abstractData.reviewer || 'Unassigned'}</strong>
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                style={{ marginTop: '1rem' }}
                onClick={() => setAssignReviewerOpen(true)}
              >
                <UserPlus size={15} />
                Assign / Change Reviewer
              </Button>
            </div>
          </section>

          {/* Action Decision Card */}
          <section className="az-admin-card" style={{ marginTop: '1.5rem' }}>
            <div className="az-admin-card__header">
              <h3 className="az-admin-card__title">Peer Review Decision</h3>
              <p className="az-admin-card__subtitle">Select review decision to open confirmation</p>
            </div>
            <div className="az-admin-card__content az-review-actions-stack">
              <Button
                variant="success"
                fullWidth
                onClick={() => setReviewAction('APPROVED')}
              >
                <CheckCircle2 size={16} />
                Approve Abstract
              </Button>

              <Button
                variant="outline"
                fullWidth
                onClick={() => setReviewAction('REVISION_REQUIRED')}
              >
                <RotateCcw size={16} />
                Request Revision
              </Button>

              <Button
                variant="danger"
                fullWidth
                onClick={() => setReviewAction('REJECTED')}
              >
                <XCircle size={16} />
                Reject Abstract
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Review Decision Confirmation Modal */}
      <AdminModal
        open={Boolean(reviewAction)}
        onClose={() => setReviewAction(null)}
        title={
          reviewAction === 'APPROVED'
            ? 'Approve Abstract Submission'
            : reviewAction === 'REJECTED'
            ? 'Reject Abstract Submission'
            : 'Request Abstract Revision'
        }
        description={
          reviewAction === 'APPROVED'
            ? 'Confirming approval will notify the primary author and schedule the paper for track presentation.'
            : reviewAction === 'REJECTED'
            ? 'Confirming rejection will notify the author with the review decision notes.'
            : 'Please specify the necessary revisions and edits required from the author before final approval.'
        }
        variant={
          reviewAction === 'APPROVED'
            ? 'success'
            : reviewAction === 'REJECTED'
            ? 'danger'
            : 'warning'
        }
        confirmLabel={
          reviewAction === 'APPROVED'
            ? 'Confirm Approval'
            : reviewAction === 'REJECTED'
            ? 'Confirm Rejection'
            : 'Send Revision Request'
        }
        onConfirm={handleDecisionSubmit}
        confirmLoading={submitting}
      >
        <div className="az-modal-form-body">
          <Textarea
            label="Reviewer Comments & Feedback (sent to author)"
            value={reviewerComment}
            onChange={(e) => setReviewerComment(e.target.value)}
            placeholder={
              reviewAction === 'REVISION_REQUIRED'
                ? 'Detail the requested additions, methodology clarifications, or citation updates...'
                : 'Add optional feedback remarks or track recommendation...'
            }
          />
        </div>
      </AdminModal>

      {/* Assign Reviewer Modal */}
      <AdminModal
        open={assignReviewerOpen}
        onClose={() => setAssignReviewerOpen(false)}
        title="Assign Peer Reviewer"
        description="Select a senior reviewer or scientific track chair."
        confirmLabel="Assign Reviewer"
        onConfirm={handleAssignReviewer}
        confirmLoading={submitting}
      >
        <div className="az-modal-form-body">
          <Select
            label="Select Reviewer from Scientific Committee"
            value={selectedReviewer}
            onChange={(e) => setSelectedReviewer(e.target.value)}
            options={REVIEWERS_LIST.map((r) => ({ label: r, value: r }))}
          />
        </div>
      </AdminModal>
    </div>
  )
}
