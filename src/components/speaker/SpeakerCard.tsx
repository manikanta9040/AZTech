import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, User, ArrowRight } from 'lucide-react';
import type { Speaker } from '../../types/speaker';

interface SpeakerCardProps {
  speaker: Speaker;
  className?: string;
}

export function SpeakerCard({ speaker, className = '' }: SpeakerCardProps) {
  const [imageError, setImageError] = useState(false);
  const speakerPath = `/speakers/${speaker.slug || speaker.id}`;

  return (
    <article className={`az-card az-speaker-card ${className}`}>
      <div className="az-speaker-card__image-wrap">
        <Link to={speakerPath} aria-label={`View profile for ${speaker.name}`}>
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
              <User size={48} />
            </div>
          )}
        </Link>
      </div>

      <div className="az-speaker-card__body">
        <h3 className="az-speaker-card__name">
          <Link to={speakerPath} className="az-speaker-card__name-link">
            {speaker.name}
          </Link>
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

        {speaker.expertise && speaker.expertise.length > 0 && (
          <div className="az-speaker-card__expertise" aria-label="Speaker expertise">
            {speaker.expertise.slice(0, 3).map((item) => (
              <span key={item} className="az-speaker-tag">
                {item}
              </span>
            ))}
            {speaker.expertise.length > 3 && (
              <span className="az-speaker-tag az-speaker-tag--more">
                +{speaker.expertise.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="az-speaker-card__footer">
        <Link
          to={speakerPath}
          className="az-button az-button--ghost az-button--full az-button--sm"
          aria-label={`View full profile of ${speaker.name}`}
        >
          <span>View Profile</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default SpeakerCard;

