import { Link } from 'react-router-dom';
import { Mic, Calendar, Clock, MapPin } from 'lucide-react';
import type { Speaker } from '../../../types/speaker';
import { Badge } from '../../common/Badge';

interface SpeakerSessionsProps {
  speaker: Speaker;
  className?: string;
}

export function SpeakerSessions({ speaker, className = '' }: SpeakerSessionsProps) {
  const sessions = speaker.sessions;

  if (!sessions || sessions.length === 0) {
    return null;
  }

  const getSessionTypeVariant = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'keynote':
        return 'primary';
      case 'panel':
        return 'warning';
      case 'workshop':
        return 'info';
      case 'track':
      default:
        return 'neutral';
    }
  };

  return (
    <section className={`az-conf-section ${className}`} aria-labelledby="speaker-sessions-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Mic size={22} />
        </div>
        <div>
          <h2 id="speaker-sessions-heading" className="az-conf-section__title" style={{ margin: 0 }}>
            Scheduled Sessions & Talks
          </h2>
          <p className="az-caption" style={{ margin: '4px 0 0' }}>
            Interactive keynotes, technical tracks, and expert panels presented by {speaker.name}.
          </p>
        </div>
      </div>

      <div className="az-speaker-sessions-list">
        {sessions.map((sess, idx) => (
          <div key={sess.id || idx} className="az-speaker-session-item">
            <div className="az-speaker-session-item__header">
              <Badge variant={getSessionTypeVariant(sess.type)}>
                {sess.type ? sess.type.toUpperCase() : 'SESSION'}
              </Badge>
              {sess.conferenceTitle && (
                <span className="az-speaker-session-item__conf-name">
                  {sess.conferenceSlug ? (
                    <Link
                      to={`/conferences/${sess.conferenceSlug}`}
                      className="az-speaker-session-item__conf-link"
                    >
                      {sess.conferenceTitle}
                    </Link>
                  ) : (
                    sess.conferenceTitle
                  )}
                </span>
              )}
            </div>

            <h3 className="az-speaker-session-item__title">{sess.title}</h3>

            {sess.description && (
              <p className="az-body-sm az-speaker-session-item__desc">
                {sess.description}
              </p>
            )}

            <div className="az-speaker-session-item__meta">
              {sess.date && (
                <div className="az-speaker-session-item__meta-entry">
                  <Calendar size={14} className="az-speaker-session-item__icon" aria-hidden="true" />
                  <span>{sess.date}</span>
                </div>
              )}
              {sess.time && (
                <div className="az-speaker-session-item__meta-entry">
                  <Clock size={14} className="az-speaker-session-item__icon" aria-hidden="true" />
                  <span>{sess.time}</span>
                </div>
              )}
              {sess.location && (
                <div className="az-speaker-session-item__meta-entry">
                  <MapPin size={14} className="az-speaker-session-item__icon" aria-hidden="true" />
                  <span>{sess.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SpeakerSessions;
