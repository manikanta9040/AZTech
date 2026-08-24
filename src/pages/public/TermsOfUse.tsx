import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileCheck, Scale } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export default function TermsOfUse() {
  useEffect(() => {
    document.title = 'Terms & Conditions | AZTech Global Platform';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Read the AZTech Terms and Conditions covering conference registrations, abstract submissions, attendee codes of conduct, and intellectual property.'
      );
    }
  }, []);

  const sections = [
    { id: 'sec-1', title: '1. Introduction & Acceptance' },
    { id: 'sec-2', title: '2. User Accounts & Eligibility' },
    { id: 'sec-3', title: '3. Conference Registration & Passes' },
    { id: 'sec-4', title: '4. Abstract Submission & Scholarly Review' },
    { id: 'sec-5', title: '5. Payments, Pricing & Invoices' },
    { id: 'sec-6', title: '6. Cancellations, Transfers & Refunds' },
    { id: 'sec-7', title: '7. Intellectual Property & Copyright' },
    { id: 'sec-8', title: '8. User Conduct & Code of Ethics' },
    { id: 'sec-9', title: '9. Limitation of Liability & Disclaimers' },
    { id: 'sec-10', title: '10. Changes to Terms' },
    { id: 'sec-11', title: '11. Contact & Legal Inquiries' },
  ];

  return (
    <div className="az-legal-page">
      {/* 1. Page Header & Breadcrumbs */}
      <header className="az-page-header" aria-labelledby="terms-heading">
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
                  Terms & Conditions
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="az-legal-hero" aria-labelledby="terms-heading">
        <div className="az-container" style={{ maxWidth: '52rem' }}>
          <Badge variant="primary">
            <Scale size={13} style={{ marginRight: '5px' }} aria-hidden="true" />
            Terms of Service
          </Badge>

          <h1 id="terms-heading" className="az-legal-hero__title" style={{ marginTop: 'var(--az-space-3)' }}>
            AZTech Terms & Conditions
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
            <FileCheck size={22} style={{ color: 'var(--az-primary)', flexShrink: 0, marginTop: '2px' }} />
            <div className="az-body-sm">
              <strong>Development & Staging Notice:</strong> These Terms and Conditions govern participation in AZTech summits and portals. They represent development placeholders intended for statutory review and customization by institutional legal advisors prior to live commercial operations.
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
              <h2>1. Introduction & Acceptance</h2>
              <p>
                By accessing, browsing, registering for, or presenting at any AZTech international conference, virtual symposium, or digital portal, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services or attend our events.
              </p>
            </section>

            <section id="sec-2" className="az-legal-section">
              <h2>2. User Accounts & Eligibility</h2>
              <p>
                To submit abstracts or complete registrations, you may be required to create an AZTech Author/Delegate Account. You are responsible for safeguarding your login credentials and for all activities that occur under your authenticated profile. Information submitted must be accurate, current, and complete.
              </p>
            </section>

            <section id="sec-3" className="az-legal-section">
              <h2>3. Conference Registration & Passes</h2>
              <p>
                Admission to AZTech summits requires a verified registration pass (e.g., Academic, Student, Industry, or Virtual Delegate). Passes are valid solely for the named delegate and specified conference edition. AZTech reserves the right to deny admission in the event of fraudulent credentials or violation of the event Code of Conduct.
              </p>
            </section>

            <section id="sec-4" className="az-legal-section">
              <h2>4. Abstract Submission & Scholarly Review</h2>
              <p>
                All submitted abstracts, research papers, and technical manuscripts must represent original, unplagiarized scholarly work. By submitting, authors confirm they hold the legal rights to present the material and grant AZTech a non-exclusive license to publish accepted abstracts in official conference proceedings and indexed digital libraries.
              </p>
            </section>

            <section id="sec-5" className="az-legal-section">
              <h2>5. Payments, Pricing & Invoices</h2>
              <p>
                Registration fees must be remitted in full using accepted payment gateways (Credit Card, Wire Transfer, SEPA) prior to credential issuance. All stated fees exclude local VAT/GST unless explicitly indicated. Official tax invoices are generated automatically upon successful settlement.
              </p>
            </section>

            <section id="sec-6" className="az-legal-section">
              <h2>6. Cancellations, Transfers & Refunds</h2>
              <p>
                Written cancellation notices received 60+ days prior to the event commencement date are eligible for a 90% refund (less processing expenses). Notices received 30 to 59 days prior are eligible for a 50% refund or a 100% future conference voucher. No refunds are issued within 30 days of the summit; however, delegate pass substitutions are permitted without charge up to 14 days before the event.
              </p>
            </section>

            <section id="sec-7" className="az-legal-section">
              <h2>7. Intellectual Property & Copyright</h2>
              <p>
                Presenters retain full intellectual property ownership of their underlying research discoveries and slide materials. The AZTech brand name, summit logos, digital platform designs, and custom software interfaces remain the exclusive proprietary property of AZTech.
              </p>
            </section>

            <section id="sec-8" className="az-legal-section">
              <h2>8. User Conduct & Code of Ethics</h2>
              <p>
                AZTech fosters inclusive, collegial, and harassment-free environments. All attendees, presenters, and sponsors must conduct themselves with professional respect, academic integrity, and decorum. Discrimination, harassment, commercial solicitation during academic tracks, or deliberate disruption of presentations will result in immediate expulsion without refund.
              </p>
            </section>

            <section id="sec-9" className="az-legal-section">
              <h2>9. Limitation of Liability & Disclaimers</h2>
              <p>
                AZTech summits and platform materials are provided &ldquo;as is&rdquo; without warranties of any kind. While we make every effort to deliver world-class events, AZTech shall not be liable for incidental, indirect, or consequential damages resulting from travel disruptions, force majeure occurrences, or third-party venue scheduling changes.
              </p>
            </section>

            <section id="sec-10" className="az-legal-section">
              <h2>10. Changes to Terms</h2>
              <p>
                AZTech reserves the right to modify these Terms and Conditions at any time. Continued use of our portal or attendance at our conferences following published amendments constitutes binding acceptance of the revised terms.
              </p>
            </section>

            <section id="sec-11" className="az-legal-section">
              <h2>11. Contact & Legal Inquiries</h2>
              <p>
                For official legal inquiries, partnership contracts, or terms clarifications, please address our legal department:
              </p>
              <div className="az-legal-contact-box" style={{ padding: 'var(--az-space-4)', background: 'var(--az-surface)', borderRadius: 'var(--az-radius-md)', border: '1px solid var(--az-border)', marginTop: 'var(--az-space-3)' }}>
                <strong>AZTech Office of the General Counsel</strong><br />
                Email: <a href="mailto:legal@aztech.example" style={{ color: 'var(--az-primary)' }}>legal@aztech.example</a><br />
                Address: HITEC City Innovation Blvd, Madhapur, Hyderabad, Telangana 500081, India
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
