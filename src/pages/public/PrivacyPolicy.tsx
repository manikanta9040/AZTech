import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, FileText } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | AZTech Global Platform';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Read the AZTech Privacy Policy detailing how we collect, handle, safeguard, and process personal and academic research information.'
      );
    }
  }, []);

  const sections = [
    { id: 'sec-1', title: '1. Introduction' },
    { id: 'sec-2', title: '2. Information We Collect' },
    { id: 'sec-3', title: '3. How We Use Information' },
    { id: 'sec-4', title: '4. Cookies & Tracking Technologies' },
    { id: 'sec-5', title: '5. Data Security Measures' },
    { id: 'sec-6', title: '6. Third-Party Services & Integrations' },
    { id: 'sec-7', title: '7. Data Retention & Archival' },
    { id: 'sec-8', title: '8. User Rights & Data Subject Access' },
    { id: 'sec-9', title: "9. Children's Privacy" },
    { id: 'sec-10', title: '10. Changes to this Privacy Policy' },
    { id: 'sec-11', title: '11. Contact & Data Protection Officer' },
  ];

  return (
    <div className="az-legal-page">
      {/* 1. Page Header & Breadcrumbs */}
      <header className="az-page-header" aria-labelledby="privacy-heading">
        <div className="az-container">
          <nav aria-label="Breadcrumb" className="az-breadcrumb">
            <ol className="az-breadcrumb__list">
              <li className="az-breadcrumb__item">
                <Link to="/" className="az-breadcrumb__link">
                  Home
                </Link>
              </li>
              <li className="az-breadcrumb__separator" aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="az-breadcrumb__item">
                <span className="az-breadcrumb__current" aria-current="page">
                  Privacy Policy
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="az-legal-hero" aria-labelledby="privacy-heading">
        <div className="az-container" style={{ maxWidth: '52rem' }}>
          <Badge variant="primary">
            <Shield size={13} style={{ marginRight: '5px' }} aria-hidden="true" />
            Compliance & Transparency
          </Badge>

          <h1 id="privacy-heading" className="az-legal-hero__title" style={{ marginTop: 'var(--az-space-3)' }}>
            AZTech Privacy Policy
          </h1>

          <div className="az-legal-meta" style={{ display: 'flex', gap: 'var(--az-space-4)', flexWrap: 'wrap', marginTop: 'var(--az-space-3)', color: 'var(--az-muted)', fontSize: '0.875rem' }}>
            <span><strong>Effective Date:</strong> January 1, 2027</span>
            <span>•</span>
            <span><strong>Version:</strong> 2.4 (Development Reference)</span>
          </div>
        </div>
      </section>

      {/* 3. Main Legal Content */}
      <section className="az-section az-legal-content-section">
        <div className="az-container" style={{ maxWidth: '52rem' }}>
          {/* Legal Notice Alert */}
          <div className="az-legal-alert" style={{ display: 'flex', gap: 'var(--az-space-3)', padding: 'var(--az-space-4)', borderRadius: 'var(--az-radius-lg)', background: '#e0effa', border: '1px solid rgb(23 105 170 / 25%)', color: 'var(--az-navy)', marginBottom: 'var(--az-space-8)' }}>
            <FileText size={22} style={{ color: 'var(--az-primary)', flexShrink: 0, marginTop: '2px' }} />
            <div className="az-body-sm">
              <strong>Development & Staging Notice:</strong> This privacy document is structured for the AZTech Global Conference Management Platform. Specific legal clauses and regional jurisdictional representations are subject to formal legal review by institutional counsel prior to commercial production deployment.
            </div>
          </div>

          {/* Quick Jump Index */}
          <nav aria-label="Table of Contents" className="az-legal-toc-card">
            <h3 style={{ fontSize: '1rem', margin: '0 0 var(--az-space-3)', color: 'var(--az-navy)' }}>
              Table of Contents
            </h3>
            <div className="az-legal-toc-grid">
              {sections.map((sec) => (
                <a key={sec.id} href={`#${sec.id}`} className="az-legal-toc-link">
                  {sec.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Legal Prose Body */}
          <div className="az-legal-prose">
            <section id="sec-1" className="az-legal-section">
              <h2>1. Introduction</h2>
              <p>
                AZTech (&ldquo;AZTech,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting the privacy, confidentiality, and data integrity of all registered delegates, authors, keynote speakers, session chairs, and website visitors. This Privacy Policy governs our data collection, processing, storage, and sharing practices across all AZTech conference management portals, abstract submission systems, and attendee engagement platforms.
              </p>
            </section>

            <section id="sec-2" className="az-legal-section">
              <h2>2. Information We Collect</h2>
              <p>
                We collect personal information directly when you register for an account, submit an academic abstract, purchase a conference pass, or communicate with our conference secretariats:
              </p>
              <ul>
                <li><strong>Identification Details:</strong> Full name, academic title (e.g., Prof., Dr.), gender, institutional affiliation, department, and country of residence.</li>
                <li><strong>Contact Credentials:</strong> Official email address, telephone numbers, institutional mailing address, and emergency contact details.</li>
                <li><strong>Scholarly & Presentation Data:</strong> Manuscript titles, abstract texts, co-author names, research keywords, presentation slide decks, and speaker biographies.</li>
                <li><strong>Financial & Transaction Records:</strong> Invoicing details, billing address, pass tiers, and payment transaction identifiers (credit card details are tokenized and processed via PCI-DSS compliant gateways).</li>
              </ul>
            </section>

            <section id="sec-3" className="az-legal-section">
              <h2>3. How We Use Information</h2>
              <p>
                AZTech processes your information solely for legitimate academic and event management purposes:
              </p>
              <ul>
                <li>Facilitating double-blind peer review and editorial evaluation of submitted abstracts and manuscripts.</li>
                <li>Generating conference badges, registration credentials, delegate kits, and verified presentation certificates.</li>
                <li>Publishing official conference program schedules and indexing accepted proceedings in scientific digital libraries.</li>
                <li>Communicating schedule modifications, visa assistance letters, and critical venue logistics.</li>
              </ul>
            </section>

            <section id="sec-4" className="az-legal-section">
              <h2>4. Cookies & Tracking Technologies</h2>
              <p>
                We utilize essential and performance cookies to maintain secure authenticated sessions, preserve language preferences, and analyze aggregate platform traffic. You can modify your browser cookie preferences at any time, though disabling essential cookies may impact certain portal functionalities.
              </p>
            </section>

            <section id="sec-5" className="az-legal-section">
              <h2>5. Data Security Measures</h2>
              <p>
                AZTech enforces robust technical, organizational, and physical safeguards. All data in transit is encrypted using TLS 1.3/256-bit SSL protocols, and stored data is encrypted at rest in high-security Tier-IV cloud datacenters with multi-factor administrative authentication and automated continuous vulnerability scanning.
              </p>
            </section>

            <section id="sec-6" className="az-legal-section">
              <h2>6. Third-Party Services & Integrations</h2>
              <p>
                We do not sell, rent, or trade your personal data. Limited data is securely shared only with vetted third-party service providers essential to event delivery:
              </p>
              <ul>
                <li><strong>Payment Processors:</strong> For secure transaction clearing and invoice generation.</li>
                <li><strong>Scientific Indexers & Publishers:</strong> For DOI assignment and digital proceedings indexing.</li>
                <li><strong>Venue & Hotel Partners:</strong> Only when delegates explicitly request official conference hotel booking coordination.</li>
              </ul>
            </section>

            <section id="sec-7" className="az-legal-section">
              <h2>7. Data Retention & Archival</h2>
              <p>
                Personal account information is retained as long as your profile remains active. Academic presentation records, published abstracts, and certificate verification hashes are preserved permanently in the AZTech scholarly archive to maintain scientific citation lineage and credential verification authenticity.
              </p>
            </section>

            <section id="sec-8" className="az-legal-section">
              <h2>8. User Rights & Data Subject Access</h2>
              <p>
                Depending on your geographical jurisdiction (e.g., GDPR in the EU, CCPA in California), you possess explicit rights regarding your personal data:
              </p>
              <ul>
                <li>The right to access, inspect, and request a machine-readable export of your personal data.</li>
                <li>The right to rectify inaccurate profile information or author metadata.</li>
                <li>The right to request data erasure or processing restrictions (subject to academic archival preservation requirements).</li>
              </ul>
            </section>

            <section id="sec-9" className="az-legal-section">
              <h2>9. Children&apos;s Privacy</h2>
              <p>
                AZTech conference portals and academic summits are designed for researchers, professionals, and adult university scholars. We do not knowingly collect personal information from individuals under the age of 16 without explicit parental or institutional guardian consent.
              </p>
            </section>

            <section id="sec-10" className="az-legal-section">
              <h2>10. Changes to this Privacy Policy</h2>
              <p>
                We may periodically update this policy to reflect statutory regulatory updates or platform feature enhancements. Material changes will be communicated via notification banners across our portal and by direct email notice to registered delegates.
              </p>
            </section>

            <section id="sec-11" className="az-legal-section">
              <h2>11. Contact & Data Protection Officer</h2>
              <p>
                For questions regarding this policy, data subject requests, or security concerns, please contact our Data Protection Officer:
              </p>
              <div className="az-legal-contact-box" style={{ padding: 'var(--az-space-4)', background: 'var(--az-surface)', borderRadius: 'var(--az-radius-md)', border: '1px solid var(--az-border)', marginTop: 'var(--az-space-3)' }}>
                <strong>AZTech Global Data Protection Secretariat</strong><br />
                Email: <a href="mailto:privacy@aztech.example" style={{ color: 'var(--az-primary)' }}>privacy@aztech.example</a><br />
                Address: HITEC City Innovation Blvd, Madhapur, Hyderabad, Telangana 500081, India
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
