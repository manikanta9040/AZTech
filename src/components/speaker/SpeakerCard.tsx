import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, User } from 'lucide-react';
import type { Speaker } from '../../types/speaker';

interface SpeakerCardProps {
  speaker: Speaker;
  className?: string;
}

export function SpeakerCard({ speaker, className = '' }: SpeakerCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className={`az-card az-speaker-card ${className}`}>
      <div className="az-speaker-card__image-wrap">
        {speaker.image && !imageError ? (
          <img
            src={speaker.image}
            alt={speaker.name}
            className="az-speaker-card__image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="az-speaker-card__avatar-fallback" aria-hidden="true">
            <User size={40} />
          </div>
        )}
      </div>

      <div className="az-speaker-card__body">
        <h3 className="az-speaker-card__name">
          {speaker.name}
        </h3>

        <p className="az-speaker-card__designation az-body-sm">
          {speaker.designation}
        </p>

        <p className="az-speaker-card__org az-caption">
          {speaker.organization}
        </p>

        <div className="az-speaker-card__country">
          <Globe size={14} aria-hidden="true" style={{ color: 'var(--az-primary)' }} />
          <span>{speaker.country}</span>
        </div>
      </div>

      <div className="az-speaker-card__footer">
        <Link to="/speakers" className="az-button az-button--ghost az-button--full az-button--sm">
          View Profile
        </Link>
      </div>
    </article>
  );
}

export default SpeakerCard;
