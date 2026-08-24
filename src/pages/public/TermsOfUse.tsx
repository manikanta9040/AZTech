import { Badge } from '../../components/common/Badge';

export default function TermsOfUse() {
  return (
    <div className="az-section">
      <div className="az-container" style={{ maxWidth: '48rem' }}>
        <Badge variant="primary">Legal</Badge>
        <h1 style={{ marginTop: 'var(--az-space-3)' }}>Terms of Service</h1>
        <p className="az-caption" style={{ marginBottom: 'var(--az-space-6)' }}>Last updated: January 1, 2027</p>

        <div style={{ display: 'grid', gap: 'var(--az-space-6)', color: 'var(--az-text)' }}>
          <section>
            <h3>1. Acceptance of Terms</h3>
            <p className="az-body">
              By accessing and using the AZTech platform and conference portals, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h3>2. Academic Integrity & Submissions</h3>
            <p className="az-body">
              All submitted abstracts, presentations, and papers must represent original scholarly work. Plagiarism, unethical data fabrication, or dual submission without authorization will result in immediate disqualification.
            </p>
          </section>

          <section>
            <h3>3. Registration & Cancellations</h3>
            <p className="az-body">
              Conference registration is subject to venue capacity and payment terms. Cancellation requests received within designated policy windows are eligible for credit transfers or refunds according to specific event guidelines.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
