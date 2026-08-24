import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search as SearchIcon, X, HelpCircle, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { FAQAccordion } from '../../components/faq/FAQAccordion';
import { mockFAQs, FAQ_CATEGORIES, type FAQCategory } from '../../data/faqs';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('All');

  useEffect(() => {
    document.title = 'Frequently Asked Questions | AZTech Support & Resources';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Find answers to common questions about AZTech conference registrations, abstract submissions, speaker proposals, payments, and certificates.'
      );
    }
  }, []);

  const filteredFAQs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return mockFAQs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        (faq.tags && faq.tags.some((tag) => tag.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="az-faq-page">
      {/* 1. Page Header & Breadcrumbs */}
      <header className="az-page-header" aria-labelledby="faq-page-title">
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
                  FAQ
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="az-faq-hero" aria-labelledby="faq-page-title">
        <div className="az-container">
          <div className="az-faq-hero__content">
            <div className="az-faq-hero__badge">
              <Badge variant="primary">
                <HelpCircle size={13} style={{ marginRight: '6px' }} aria-hidden="true" />
                Knowledge Base & Support
              </Badge>
            </div>

            <h1 id="faq-page-title" className="az-faq-hero__title">
              Frequently Asked <span className="az-gradient-text">Questions</span>
            </h1>

            <p className="az-faq-hero__description az-body-lg">
              Find answers to common questions about registration, abstract submission, keynote schedules, payments, and official certifications.
            </p>

            {/* 3. Search Bar */}
            <div className="az-faq-search-wrapper" style={{ maxWidth: '40rem', margin: 'var(--az-space-6) auto 0' }}>
              <div className="az-faq-search-input-box">
                <SearchIcon size={20} className="az-faq-search-icon" aria-hidden="true" />
                <input
                  type="search"
                  className="az-faq-search-input"
                  placeholder="Search questions, answers, or keywords (e.g., abstract, refund, certificate)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search frequently asked questions"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="az-faq-search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search input"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ Content Section */}
      <section className="az-section az-faq-content-section">
        <div className="az-container">
          {/* Category Tabs */}
          <div className="az-faq-categories-bar" role="tablist" aria-label="FAQ Categories">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`az-category-pill ${isActive ? 'az-category-pill--active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results Summary */}
          <div className="az-faq-results-summary" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--az-space-6)' }}>
            <span className="az-body-sm" style={{ color: 'var(--az-muted)' }}>
              Showing <strong>{filteredFAQs.length}</strong> {filteredFAQs.length === 1 ? 'question' : 'questions'}
              {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
              {searchQuery && <span> matching &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>}
            </span>

            {(searchQuery || selectedCategory !== 'All') && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="az-button az-button--ghost az-button--sm"
                style={{ color: 'var(--az-danger)' }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Accordion or Empty State */}
          {filteredFAQs.length > 0 ? (
            <div style={{ maxWidth: '56rem', marginInline: 'auto' }}>
              <FAQAccordion items={filteredFAQs} allowMultiple />
            </div>
          ) : (
            <div style={{ maxWidth: '36rem', marginInline: 'auto' }}>
              <EmptyState
                icon={HelpCircle}
                title="No Questions Found"
                description={`We couldn't find any FAQs matching your search criteria "${searchQuery}". Try a different keyword or browse all categories.`}
                action={
                  <Button variant="primary" onClick={handleClearFilters}>
                    View All Questions
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </section>

      {/* 5. Contact CTA */}
      <section className="az-cta-section" aria-labelledby="faq-contact-cta-heading">
        <div className="az-container">
          <div className="az-cta-banner">
            <div className="az-cta-banner__glow" aria-hidden="true" />
            <div className="az-cta-banner__content">
              <div className="az-cta-banner__badge">
                <Sparkles size={14} aria-hidden="true" />
                <span>Dedicated Support Secretariat</span>
              </div>
              <h2 id="faq-contact-cta-heading" className="az-cta-banner__title">
                Still Have Questions?
              </h2>
              <p className="az-cta-banner__desc az-body-lg">
                Our international conference coordinators and program chairs are standing by to assist with your inquiries.
              </p>
              <div className="az-cta-banner__actions">
                <Link to="/contact" className="az-button az-button--primary az-button--lg">
                  <MessageSquare size={18} aria-hidden="true" />
                  <span>Contact Our Team</span>
                </Link>
                <Link to="/conferences" className="az-button az-button--outline az-button--lg az-cta-banner__btn-alt">
                  <span>Explore Conferences</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
