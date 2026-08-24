import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Video } from 'lucide-react';
import type { Speaker } from '../../../types/speaker';
import { mockConferences } from '../../../data/conferences';
import { Badge } from '../../common/Badge';

interface SpeakerConferencesProps {
  speaker: Speaker;
  className?: string;
}

export function SpeakerConferences({ speaker, className = '' }: SpeakerConferencesProps) {
  // Find matching conferences from mockConferences
  const associatedConferences = (speaker.conferenceIds && speaker.conferenceIds.length > 0)
    ? mockConferences.filter((conf) => speaker.conferenceIds?.includes(conf.id))
    : mockConferences.slice(0, 2);

  if (associatedConferences.length === 0) {
    return null;
  }

  return (
    <section className={`az-conf-section ${className}`} aria-labelledby="speaker-confs-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Video size={22} />
        </div>
        <div>
          <h2 id="speaker-confs-heading" className="az-conf-section__title" style={{ margin: 0 }}>
            Participating Conferences
          </h2>
          <p className="az-caption" style={{ margin: '4px 0 0' }}>
            Events where {speaker.name} is slated to deliver keynotes, track sessions, or panels.
          </p>
        </div>
      </div>

      <div className="az-speaker-confs-grid">
        {associatedConferences.map((conf) => {
          const confUrl = `/conferences/${conf.slug || conf.id}`;
          return (
            <article key={conf.id} className="az-speaker-conf-card">
              <div className="az-speaker-conf-card__image-wrap">
                <img
                  src={conf.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'}
                  alt={conf.title}
                  className="az-speaker-conf-card__image"
                  loading="lazy"
                />
                <div className="az-speaker-conf-card__badge-bar">
                  <Badge variant="primary">{conf.category}</Badge>
                </div>
              </div>

              <div className="az-speaker-conf-card__body">
                <div className="az-speaker-conf-card__role">
                  <span className="az-speaker-conf-card__role-label">Speaker Role:</span>
                  <span className="az-speaker-conf-card__role-val">Keynote Speaker</span>
                </div>

                <h3 className="az-speaker-conf-card__title">
                  <Link to={confUrl} className="az-speaker-conf-card__title-link">
                    {conf.title}
                  </Link>
                </h3>

                <p className="az-caption az-speaker-conf-card__desc">
                  {conf.shortDescription || conf.description}
                </p>

                <div className="az-speaker-conf-card__meta">
                  <div className="az-speaker-conf-card__meta-item">
                    <Calendar size={14} className="az-speaker-conf-card__icon" aria-hidden="true" />
                    <span>
                      {new Date(conf.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="az-speaker-conf-card__meta-item">
                    <MapPin size={14} className="az-speaker-conf-card__icon" aria-hidden="true" />
                    <span>
                      {conf.city}, {conf.country}
                    </span>
                  </div>
                </div>
              </div>

              <div className="az-speaker-conf-card__footer">
                <Link
                  to={confUrl}
                  className="az-button az-button--ghost az-button--full az-button--sm"
                  aria-label={`View conference details for ${conf.title}`}
                >
                  <span>View Conference</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SpeakerConferences;
