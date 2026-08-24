import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Camera, Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { GalleryGrid } from '../../components/gallery/GalleryGrid';
import { GalleryLightbox } from '../../components/gallery/GalleryLightbox';
import { mockGalleryItems, GALLERY_CATEGORIES, type GalleryCategory } from '../../data/gallery';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Conference Photo Gallery | AZTech Event Moments';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore photo highlights and moments from AZTech international academic conferences, keynote sessions, interactive workshops, and gala dinners.'
      );
    }
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return mockGalleryItems;
    return mockGalleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const activeItem = activeImageIndex !== null ? filteredItems[activeImageIndex] : null;

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredItems.length - 1
    );
  };

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev! < filteredItems.length - 1 ? prev! + 1 : 0
    );
  };

  return (
    <div className="az-gallery-page">
      {/* 1. Page Header & Breadcrumbs */}
      <header className="az-page-header" aria-labelledby="gallery-page-title">
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
                  Gallery
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="az-gallery-hero" aria-labelledby="gallery-page-title">
        <div className="az-container">
          <div className="az-gallery-hero__content">
            <div className="az-gallery-hero__badge">
              <Badge variant="primary">
                <Camera size={13} style={{ marginRight: '6px' }} aria-hidden="true" />
                Event Moments & Visual Archive
              </Badge>
            </div>

            <h1 id="gallery-page-title" className="az-gallery-hero__title">
              AZTech <span className="az-gradient-text">Conference Gallery</span>
            </h1>

            <p className="az-gallery-hero__description az-body-lg">
              Glimpses into memorable keynotes, vibrant research discussions, technical workshop sessions, and international networking moments worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Filter Categories & Grid Section */}
      <section className="az-section az-gallery-main-section">
        <div className="az-container">
          {/* Category Filter Pills */}
          <div className="az-gallery-categories-bar" role="tablist" aria-label="Gallery Categories">
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`az-category-pill ${isActive ? 'az-category-pill--active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveImageIndex(null);
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div style={{ marginBottom: 'var(--az-space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="az-body-sm" style={{ color: 'var(--az-muted)' }}>
              Showing <strong>{filteredItems.length}</strong> photographs
              {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
            </span>
          </div>

          {/* Gallery Grid */}
          <GalleryGrid
            items={filteredItems}
            onSelectImage={(index) => setActiveImageIndex(index)}
          />

          {/* Lightbox Modal */}
          <GalleryLightbox
            item={activeItem}
            isOpen={activeImageIndex !== null}
            onClose={() => setActiveImageIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
            currentIndex={activeImageIndex ?? 0}
            totalCount={filteredItems.length}
          />
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="az-cta-section" aria-labelledby="gallery-cta-heading">
        <div className="az-container">
          <div className="az-cta-banner">
            <div className="az-cta-banner__glow" aria-hidden="true" />
            <div className="az-cta-banner__content">
              <div className="az-cta-banner__badge">
                <Sparkles size={14} aria-hidden="true" />
                <span>Experience It Live</span>
              </div>
              <h2 id="gallery-cta-heading" className="az-cta-banner__title">
                Be at the Next AZTech Global Summit
              </h2>
              <p className="az-cta-banner__desc az-body-lg">
                Join international researchers, keynote authorities, and academic peers in historic convention destinations.
              </p>
              <div className="az-cta-banner__actions">
                <Link to="/conferences" className="az-button az-button--primary az-button--lg">
                  <span>Explore Upcoming Conferences</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/speakers" className="az-button az-button--outline az-button--lg az-cta-banner__btn-alt">
                  <span>Meet Our Speakers</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
