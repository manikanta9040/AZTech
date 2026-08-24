import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { Conference } from '../../../types/conference';
import { mockConferences } from '../../../data/conferences';
import { ConferenceCard } from '../ConferenceCard';

interface RelatedConferencesProps {
  currentConference: Conference;
}

export function RelatedConferences({ currentConference }: RelatedConferencesProps) {
  // 1. Same category first, excluding current
  const sameCategory = mockConferences.filter(
    (c) => c.id !== currentConference.id && c.category === currentConference.category
  );

  // 2. If fewer than 3, fill with other conferences
  const otherCategory = mockConferences.filter(
    (c) => c.id !== currentConference.id && c.category !== currentConference.category
  );

  const related = [...sameCategory, ...otherCategory].slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="az-section az-conf-related-section" aria-labelledby="related-conferences-heading">
      <div className="az-container">
        <div className="az-conf-section-header">
          <div>
            <div className="az-badge az-badge--primary" style={{ marginBottom: '8px' }}>
              <Sparkles size={12} style={{ marginRight: '4px' }} aria-hidden="true" />
              Similar Events
            </div>
            <h2 id="related-conferences-heading" className="az-h2" style={{ margin: 0 }}>
              Related Conferences in {currentConference.category}
            </h2>
          </div>

          <Link to={`/conferences?category=${encodeURIComponent(currentConference.category)}`} className="az-button az-button--outline az-button--sm">
            <span>View All {currentConference.category}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="az-conference-grid" style={{ marginTop: 'var(--az-space-6)' }}>
          {related.map((conf) => (
            <ConferenceCard key={conf.id} conference={conf} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedConferences;
