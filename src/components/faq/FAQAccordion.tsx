import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Tag } from 'lucide-react';
import type { FAQItem } from '../../data/faqs';

interface FAQAccordionProps {
  items: FAQItem[];
  allowMultiple?: boolean;
}

export function FAQAccordion({ items, allowMultiple = true }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(() => (items.length > 0 ? [items[0].id] : []));

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(id);
    }
  };

  return (
    <div className="az-faq-accordion" role="region" aria-label="Frequently Asked Questions List">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `faq-trigger-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`az-faq-item ${isOpen ? 'az-faq-item--open' : ''}`}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                className="az-faq-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
              >
                <span className="az-faq-trigger__question">{item.question}</span>
                <span className="az-faq-trigger__meta">
                  <span className="az-faq-category-badge">
                    <Tag size={12} style={{ marginRight: '4px' }} aria-hidden="true" />
                    {item.category}
                  </span>
                  <motion.span
                    className="az-faq-chevron-wrap"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={18} aria-hidden="true" />
                  </motion.span>
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="az-faq-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="az-faq-panel__content">
                    <p className="az-body">{item.answer}</p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="az-faq-tags">
                        {item.tags.map((tag) => (
                          <span key={tag} className="az-faq-tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default FAQAccordion;
