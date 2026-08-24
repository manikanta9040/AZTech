import { Link } from 'react-router-dom';
import { UserX, ArrowLeft, Calendar } from 'lucide-react';

interface SpeakerNotFoundProps {
  slug?: string;
  className?: string;
}

export function SpeakerNotFound({ slug, className = '' }: SpeakerNotFoundProps) {
  return (
    <div className={`az-conference-not-found ${className}`} role="alert">
      <div className="az-conference-not-found__card">
        <div className="az-conference-not-found__icon-wrap" aria-hidden="true">
          <UserX size={40} />
        </div>

        <h1 className="az-conference-not-found__title">Speaker Not Found</h1>

        <p className="az-conference-not-found__desc">
          {slug ? (
            <>
              We couldn&apos;t locate a speaker profile matching{' '}
              <code className="az-inline-code">{slug}</code>. The profile may have been removed, renamed, or is temporarily unavailable.
            </>
          ) : (
            'The speaker profile you are looking for does not exist.'
          )}
        </p>

        <div className="az-conference-not-found__actions">
          <Link to="/speakers" className="az-button az-button--primary">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to Speakers</span>
          </Link>

          <Link to="/conferences" className="az-button az-button--outline">
            <Calendar size={16} aria-hidden="true" />
            <span>Explore Conferences</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SpeakerNotFound;
