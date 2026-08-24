import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { ConferenceCard } from '../conference/ConferenceCard';
import { mockConferences } from '../../data/conferences';
import { EmptyState } from '../common/EmptyState';
import { Badge } from '../common/Badge';

export function UpcomingConferences() {
  // Display up to 6 upcoming conferences
  const upcomingConferences = mockConferences.slice(0, 6);

  return (
    <section className="az-section az-upcoming-section" aria-labelledby="upcoming-conferences-heading">
      <div className="az-container">
        <div className="az-section-header">
          <div className="az-section-header__left">
            <Badge variant="primary">Calendar & Schedule</Badge>
            <h2 id="upcoming-conferences-heading" className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
              Upcoming Conferences
            </h2>
            <p className="az-body" style={{ color: 'var(--az-muted)' }}>
              Discover upcoming AZTech conferences and events.
            </p>
          </div>
          <div className="az-section-header__right">
            <Link to="/conferences" className="az-button az-button--ghost">
              <span>View All Conferences</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {upcomingConferences.length > 0 ? (
          <div className="az-conference-grid">
            {upcomingConferences.map((conf) => (
              <ConferenceCard key={conf.id} conference={conf} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No upcoming conferences found"
            description="Please check back later or explore other categories."
            icon={Calendar}
          />
        )}
      </div>
    </section>
  );
}

export default UpcomingConferences;
