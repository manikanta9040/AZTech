import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Sparkles, UserCheck, FileText } from 'lucide-react';
import type { Conference } from '../../../types/conference';
import { Badge } from '../../common/Badge';
import { ConferenceStatusBadge } from '../ConferenceStatusBadge';
import { formatDateRange } from '../../../utils/formatDate';

interface ConferenceHeroProps {
  conference: Conference;
}

export function ConferenceHero({ conference }: ConferenceHeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="az-conf-hero" aria-labelledby="conf-hero-title">
      <div className="az-container az-conf-hero__container">
        <div className="az-conf-hero__grid">
          {/* Left Column: Text & Meta & CTAs */}
          <div className="az-conf-hero__info">
            <div className="az-conf-hero__badge-row">
              <Badge variant="primary">{conference.category}</Badge>
              <ConferenceStatusBadge status={conference.status} />
              {conference.featured && (
                <Badge variant="warning">
                  <Sparkles size={12} style={{ marginRight: '4px' }} aria-hidden="true" />
                  Featured Event
                </Badge>
              )}
            </div>

            <h1 id="conf-hero-title" className="az-conf-hero__title">
              {conference.title}
            </h1>

            <p className="az-conf-hero__desc az-body-lg">
              {conference.shortDescription || conference.description}
            </p>

            <div className="az-conf-hero__meta-strip">
              <div className="az-conf-hero__meta-item">
                <div className="az-conf-hero__meta-icon-wrap" aria-hidden="true">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="az-caption">Event Dates</span>
                  <strong>{formatDateRange(conference.startDate, conference.endDate)}</strong>
                </div>
              </div>

              <div className="az-conf-hero__meta-item">
                <div className="az-conf-hero__meta-icon-wrap" aria-hidden="true">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="az-caption">Location</span>
                  <strong>
                    {conference.city}, {conference.country}
                  </strong>
                </div>
              </div>
            </div>

            <div className="az-conf-hero__actions">
              <Link to="/register" className="az-button az-button--primary az-button--lg">
                <UserCheck size={18} aria-hidden="true" />
                <span>Register Now</span>
              </Link>
              <Link to="/login" className="az-button az-button--outline az-button--lg">
                <FileText size={18} aria-hidden="true" />
                <span>Submit Abstract</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Banner Image */}
          <div className="az-conf-hero__visual">
            <div className="az-conf-hero__image-wrapper">
              {conference.image && !imageError ? (
                <img
                  src={conference.image}
                  alt={conference.title}
                  className="az-conf-hero__image"
                  loading="eager"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="az-conf-hero__fallback-image" aria-hidden="true">
                  <span className="az-conf-hero__fallback-category">{conference.category}</span>
                  <span className="az-conf-hero__fallback-title">{conference.title}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConferenceHero;
