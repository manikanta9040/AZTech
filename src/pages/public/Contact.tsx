import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, HelpCircle, ArrowRight, MessageSquare, Building, MapPin } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent } from '../../components/common/Card';
import { ContactInfo } from '../../components/contact/ContactInfo';
import { ContactForm } from '../../components/contact/ContactForm';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us | AZTech — Global Conference Support';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Have a question, partnership opportunity or conference inquiry? Connect with the AZTech global conference organizing team.'
      );
    }
  }, []);

  return (
    <div className="az-contact-page">
      {/* 1. Page Header & Breadcrumbs */}
      <header className="az-page-header" aria-labelledby="contact-page-title">
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
                  Contact
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="az-contact-hero" aria-labelledby="contact-page-title">
        <div className="az-container">
          <div className="az-contact-hero__content">
            <div className="az-contact-hero__badge">
              <Badge variant="primary">
                <MessageSquare size={13} style={{ marginRight: '6px' }} aria-hidden="true" />
                Global Conference Secretariat
              </Badge>
            </div>

            <h1 id="contact-page-title" className="az-contact-hero__title">
              Let&apos;s <span className="az-gradient-text">Connect</span>
            </h1>

            <p className="az-contact-hero__description az-body-lg">
              Have a question, partnership opportunity or conference inquiry? Our team would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Main Contact Section: Form + Contact Info */}
      <section className="az-section az-contact-main-section">
        <div className="az-container">
          <div className="az-contact-layout-grid">
            {/* Left: Contact Form */}
            <div className="az-contact-form-column">
              <ContactForm />
            </div>

            {/* Right: Contact Info Cards */}
            <div className="az-contact-info-column">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Office Information & Regional Consortia */}
      <section className="az-section az-offices-section" style={{ background: 'var(--az-surface)', borderTop: '1px solid var(--az-border)', borderBottom: '1px solid var(--az-border)' }}>
        <div className="az-container">
          <div className="az-section-header az-section-header--center">
            <Badge variant="primary">Global Presence</Badge>
            <h2 className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
              AZTech International Locations
            </h2>
            <p className="az-body" style={{ color: 'var(--az-muted)', maxWidth: '40rem', marginInline: 'auto' }}>
              Coordinating international academic summits across key scientific hubs in the Americas, Europe, and Asia-Pacific.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--az-space-6)' }}>
            <Card>
              <CardContent>
                <div style={{ display: 'flex', gap: 'var(--az-space-3)', alignItems: 'center', marginBottom: 'var(--az-space-3)' }}>
                  <Building size={20} style={{ color: 'var(--az-primary)' }} />
                  <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Hyderabad Hub (HQ)</h3>
                </div>
                <p className="az-body-sm" style={{ color: 'var(--az-muted)' }}>
                  HITEC City Innovation Blvd, Madhapur<br />
                  Hyderabad, Telangana 500081, India
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'var(--az-space-3)', color: 'var(--az-primary)', fontSize: '0.8125rem', fontWeight: 600 }}>
                  <MapPin size={14} />
                  <span>Central Operations & Editorial</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div style={{ display: 'flex', gap: 'var(--az-space-3)', alignItems: 'center', marginBottom: 'var(--az-space-3)' }}>
                  <Building size={20} style={{ color: 'var(--az-primary)' }} />
                  <h3 style={{ margin: 0, fontSize: '1.125rem' }}>San Francisco Hub</h3>
                </div>
                <p className="az-body-sm" style={{ color: 'var(--az-muted)' }}>
                  Market Center Plaza, Suite 400<br />
                  San Francisco, CA 94105, USA
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'var(--az-space-3)', color: 'var(--az-primary)', fontSize: '0.8125rem', fontWeight: 600 }}>
                  <MapPin size={14} />
                  <span>Americas Summit Coordination</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div style={{ display: 'flex', gap: 'var(--az-space-3)', alignItems: 'center', marginBottom: 'var(--az-space-3)' }}>
                  <Building size={20} style={{ color: 'var(--az-primary)' }} />
                  <h3 style={{ margin: 0, fontSize: '1.125rem' }}>London Hub</h3>
                </div>
                <p className="az-body-sm" style={{ color: 'var(--az-muted)' }}>
                  Science Square, Holborn<br />
                  London WC1V 6JS, United Kingdom
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'var(--az-space-3)', color: 'var(--az-primary)', fontSize: '0.8125rem', fontWeight: 600 }}>
                  <MapPin size={14} />
                  <span>European Scientific Affairs</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. FAQ CTA */}
      <section className="az-cta-section" aria-labelledby="contact-faq-cta-heading">
        <div className="az-container">
          <div className="az-cta-banner">
            <div className="az-cta-banner__glow" aria-hidden="true" />
            <div className="az-cta-banner__content">
              <div className="az-cta-banner__badge">
                <HelpCircle size={14} aria-hidden="true" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 id="contact-faq-cta-heading" className="az-cta-banner__title">
                Have More Questions?
              </h2>
              <p className="az-cta-banner__desc az-body-lg">
                Find instant answers to common questions regarding registration, abstract formatting, peer review, and speaker accommodations.
              </p>
              <div className="az-cta-banner__actions">
                <Link to="/faq" className="az-button az-button--primary az-button--lg">
                  <span>Visit FAQ</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/conferences" className="az-button az-button--outline az-button--lg az-cta-banner__btn-alt">
                  <span>Explore Conferences</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
