import { Link } from 'react-router-dom';
import { Calendar, Users, Sparkles } from 'lucide-react';

interface SpeakerCTAProps {
  className?: string;
}

export function SpeakerCTA({ className = '' }: SpeakerCTAProps) {
  return (
    <section className={`az-section az-speaker-cta-section ${className}`} aria-labelledby="speaker-cta-title">
      <div className="az-container">
        <div className="az-conf-cta-card">
          <div className="az-conf-cta-card__badge-row">
            <span className="az-badge az-badge--warning">
              <Sparkles size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Global Research Community
            </span>
          </div>

          <h2 id="speaker-cta-title" className="az-conf-cta-card__title">
            Meet Experts. Share Ideas. Build Connections.
          </h2>

          <p className="az-body-lg az-conf-cta-card__desc">
            Engage with world-renowned keynote speakers, submit your latest research findings, and network with leading academicians and industry visionaries.
          </p>

          <div className="az-conf-cta-card__actions">
            <Link to="/conferences" className="az-button az-button--primary az-button--lg">
              <Calendar size={18} aria-hidden="true" />
              <span>Explore Conferences</span>
            </Link>

            <Link to="/speakers" className="az-button az-button--outline az-button--lg az-conf-cta-card__btn-alt">
              <Users size={18} aria-hidden="true" />
              <span>View All Speakers</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpeakerCTA;
