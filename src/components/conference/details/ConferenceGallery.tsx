import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import type { Conference } from '../../../types/conference';

interface ConferenceGalleryProps {
  conference: Conference;
}

export function ConferenceGallery({ conference }: ConferenceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const defaultGallery = [
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
  ];

  const gallery = conference.gallery && conference.gallery.length > 0
    ? conference.gallery
    : defaultGallery;

  return (
    <section className="az-conf-section" aria-labelledby="conf-gallery-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <ImageIcon size={22} />
        </div>
        <h2 id="conf-gallery-heading" className="az-conf-section__title">
          Conference Photo Gallery
        </h2>
      </div>

      <p className="az-body-sm" style={{ color: 'var(--az-muted)', marginBottom: 'var(--az-space-6)' }}>
        Moments from past AZTech summit plenary sessions, interactive poster exhibitions, and delegate banquets.
      </p>

      <div className="az-conf-gallery-grid">
        {gallery.map((imgUrl, idx) => (
          <button
            key={idx}
            type="button"
            className="az-gallery-item"
            onClick={() => setSelectedImage(imgUrl)}
            aria-label={`View enlarged photo ${idx + 1} from ${conference.title}`}
          >
            <img
              src={imgUrl}
              alt={`${conference.title} session photo ${idx + 1}`}
              className="az-gallery-item__img"
              loading="lazy"
            />
            <div className="az-gallery-item__overlay">
              <span className="az-caption az-gallery-item__label">Click to enlarge</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div
          className="az-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo preview"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="az-gallery-lightbox__close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close photo preview"
          >
            <X size={24} />
          </button>
          <img
            src={selectedImage}
            alt="Enlarged conference session"
            className="az-gallery-lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default ConferenceGallery;
