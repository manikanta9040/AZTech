import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { ConferenceCard } from '../conference/ConferenceCard';
import { mockConferences } from '../../data/conferences';
import { Badge } from '../common/Badge';

export function FeaturedConferences() {
  const featuredList = mockConferences.filter((c) => c.featured);

  return (
    <section className="az-section az-featured-section" aria-labelledby="featured-conferences-heading">
      <div className="az-container">
        <div className="az-section-header">
          <div className="az-section-header__left">
            <Badge variant="warning">
              <Star size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Flagship Summits
            </Badge>
            <h2 id="featured-conferences-heading" className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
              Featured Conferences
            </h2>
            <p className="az-body" style={{ color: 'var(--az-muted)' }}>
              Handpicked international gatherings shaping breakthrough technologies and global policies.
            </p>
          </div>
          <div className="az-section-header__right">
            <Link to="/conferences" className="az-button az-button--outline">
              <span>Browse All Events</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="az-conference-grid az-conference-grid--featured">
          {featuredList.map((conf) => (
            <ConferenceCard key={conf.id} conference={conf} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedConferences;
