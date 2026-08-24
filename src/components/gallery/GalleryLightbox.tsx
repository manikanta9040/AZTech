import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Tag } from 'lucide-react';
import type { GalleryItem } from '../../data/gallery';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}

export function GalleryLightbox({
  item,
  isOpen,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}: GalleryLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="az-lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div
            className="az-lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with counter & close button */}
            <div className="az-lightbox-top-bar">
              <div className="az-lightbox-counter">
                <span>{currentIndex + 1}</span> / <span>{totalCount}</span>
              </div>
              <button
                type="button"
                className="az-lightbox-close-btn"
                onClick={onClose}
                aria-label="Close photo preview"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            {/* Main Stage with Navigation */}
            <div className="az-lightbox-stage">
              <button
                type="button"
                className="az-lightbox-nav-btn az-lightbox-nav-btn--prev"
                onClick={onPrev}
                aria-label="Previous photo"
              >
                <ChevronLeft size={28} aria-hidden="true" />
              </button>

              <div className="az-lightbox-image-wrap">
                <motion.img
                  key={item.id}
                  src={item.src}
                  alt={item.alt}
                  className="az-lightbox-img"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                />
              </div>

              <button
                type="button"
                className="az-lightbox-nav-btn az-lightbox-nav-btn--next"
                onClick={onNext}
                aria-label="Next photo"
              >
                <ChevronRight size={28} aria-hidden="true" />
              </button>
            </div>

            {/* Bottom Caption & Details */}
            <div className="az-lightbox-caption-bar">
              <div className="az-lightbox-caption-left">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="az-lightbox-badge">
                    <Tag size={12} style={{ marginRight: '4px' }} />
                    {item.category}
                  </span>
                  {item.year && (
                    <span className="az-caption" style={{ color: '#a6b8ca', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} />
                      {item.year}
                    </span>
                  )}
                </div>
                <h3 className="az-lightbox-title">{item.title}</h3>
                {item.description && (
                  <p className="az-lightbox-desc">{item.description}</p>
                )}
              </div>

              {item.location && (
                <div className="az-lightbox-meta-item">
                  <MapPin size={14} style={{ color: 'var(--az-accent)' }} />
                  <span>{item.location}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GalleryLightbox;
