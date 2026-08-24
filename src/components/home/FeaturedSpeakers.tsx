import { Link } from 'react-router-dom';
import { ArrowRight, UserCheck } from 'lucide-react';
import { SpeakerCard } from '../speaker/SpeakerCard';
import { mockSpeakers } from '../../data/speakers';
import { Badge } from '../common/Badge';

export function FeaturedSpeakers() {
  const featuredSpeakers = mockSpeakers.slice(0, 6);

  return (
    <section className="az-section az-speakers-section" aria-labelledby="featured-speakers-heading">
      <div className="az-container">
        <div className="az-section-header">
          <div className="az-section-header__left">
            <Badge variant="primary">
              <UserCheck size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Distinguished Faculty
            </Badge>
            <h2 id="featured-speakers-heading" className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
              Keynote Speakers & Experts
            </h2>
            <p className="az-body" style={{ color: 'var(--az-muted)' }}>
              Hear from global pioneers, principal investigators, and industry innovators sharing state-of-the-art breakthroughs.
            </p>
          </div>
          <div className="az-section-header__right">
            <Link to="/speakers" className="az-button az-button--outline">
              <span>View All Speakers</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="az-speakers-grid">
          {featuredSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSpeakers;
