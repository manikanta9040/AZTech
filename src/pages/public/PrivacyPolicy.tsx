import { Badge } from '../../components/common/Badge';

export default function PrivacyPolicy() {
  return (
    <div className="az-section">
      <div className="az-container" style={{ maxWidth: '48rem' }}>
        <Badge variant="primary">Legal</Badge>
        <h1 style={{ marginTop: 'var(--az-space-3)' }}>Privacy Policy</h1>
        <p className="az-caption" style={{ marginBottom: 'var(--az-space-6)' }}>Last updated: January 1, 2027</p>

        <div style={{ display: 'grid', gap: 'var(--az-space-6)', color: 'var(--az-text)' }}>
          <section>
            <h3>1. Information We Collect</h3>
            <p className="az-body">
              AZTech collects information you provide directly to us when you create an account, register for a conference, submit an academic abstract, or contact us. This includes your name, academic affiliation, email address, postal address, and presentation details.
            </p>
          </section>

          <section>
            <h3>2. How We Use Your Information</h3>
            <p className="az-body">
              We use the collected information to process registrations, coordinate peer-review workflows, publish conference proceedings, issue official certificates, and send critical event updates.
            </p>
          </section>

          <section>
            <h3>3. Data Protection & Security</h3>
            <p className="az-body">
              AZTech enforces rigorous technical and organizational measures to safeguard your personal information against unauthorized access, disclosure, alteration, or destruction.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
