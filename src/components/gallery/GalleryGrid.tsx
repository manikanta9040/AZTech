import { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, Tag, MapPin } from 'lucide-react';
import type { GalleryItem } from '../../data/gallery';

interface GalleryGridProps {
  items: GalleryItem[];
  onSelectImage: (index: number) => void;
}

export function GalleryGrid({ items, onSelectImage }: GalleryGridProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="az-gallery-grid" role="region" aria-label="Conference Photo Gallery Grid">
      {items.map((item, index) => {
        const hasError = imageErrors[item.id];
        return (
          <motion.div
            key={item.id}
            className="az-gallery-card"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: (index % 8) * 0.05 }}
            tabIndex={0}
            role="button"
            aria-label={`View photo: ${item.title}`}
            onClick={() => onSelectImage(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectImage(index);
              }
            }}
          >
            <div className="az-gallery-card__image-wrap">
              {!hasError ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="az-gallery-card__img"
                  onError={() => handleImageError(item.id)}
                />
              ) : (
                <div className="az-gallery-card__fallback">
                  <span className="az-gallery-card__fallback-text">{item.title}</span>
                </div>
              )}

              <div className="az-gallery-card__overlay">
                <div className="az-gallery-card__zoom-badge">
                  <ZoomIn size={18} aria-hidden="true" />
                </div>
                <div className="az-gallery-card__info">
                  <span className="az-gallery-card__category">
                    <Tag size={11} style={{ marginRight: '3px' }} />
                    {item.category}
                  </span>
                  <h3 className="az-gallery-card__title">{item.title}</h3>
                  {item.location && (
                    <span className="az-gallery-card__loc">
                      <MapPin size={11} style={{ marginRight: '3px' }} />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default GalleryGrid;
