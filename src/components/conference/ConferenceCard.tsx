import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import type { Conference } from '../../types/conference';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/formatDate';

import { ConferenceStatusBadge } from './ConferenceStatusBadge';

interface ConferenceCardProps {
  conference: Conference;
  className?: string;
}

export function ConferenceCard({ conference, className = '' }: ConferenceCardProps) {
  const [imageError, setImageError] = useState(false);


  const detailsUrl = `/conferences/${conference.slug || conference.id}`;

  return (
    <article className={`az-card az-conference-card ${className}`}>
      {/* Thumbnail Container */}
      <div className="az-conference-card__image-wrap">
        {conference.image && !imageError ? (
          <img
            src={conference.image}
            alt={conference.title}
            className="az-conference-card__image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="az-conference-card__fallback-img" aria-hidden="true">
            <span>{conference.category}</span>
          </div>
        )}
        <div className="az-conference-card__badge-bar">
          <Badge variant="primary">{conference.category}</Badge>
          <ConferenceStatusBadge status={conference.status} />
        </div>
      </div>

      {/* Content */}
      <div className="az-conference-card__body">
        <h3 className="az-conference-card__title">
          <Link to={detailsUrl} title={conference.title}>
            {conference.title}
          </Link>
        </h3>

        <p className="az-conference-card__desc az-body-sm">
          {conference.shortDescription || conference.description}
        </p>

        <div className="az-conference-card__meta">
          <div className="az-conference-card__meta-item">
            <Calendar size={15} aria-hidden="true" className="az-conference-card__icon" />
            <span>{formatDate(conference.startDate)} – {formatDate(conference.endDate)}</span>
          </div>
          <div className="az-conference-card__meta-item">
            <MapPin size={15} aria-hidden="true" className="az-conference-card__icon" />
            <span>{conference.city}, {conference.country}</span>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="az-conference-card__footer">
        <Link to={detailsUrl} className="az-button az-button--outline az-button--full">
          <span>View Conference</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default ConferenceCard;
