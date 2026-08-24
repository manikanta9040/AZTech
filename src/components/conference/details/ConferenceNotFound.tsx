import { Link } from 'react-router-dom';
import { CalendarX, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../../common/Button';

interface ConferenceNotFoundProps {
  slug?: string;
}

export function ConferenceNotFound({ slug }: ConferenceNotFoundProps) {
  return (
    <div className="az-section az-conference-not-found" role="alert">
      <div className="az-container">
        <div className="az-conference-not-found__card">
          <div className="az-conference-not-found__icon-wrap" aria-hidden="true">
            <CalendarX size={48} className="az-conference-not-found__icon" />
          </div>
          <h1 className="az-conference-not-found__title">Conference Not Found</h1>
          <p className="az-conference-not-found__desc az-body-lg">
            {slug ? (
              <>
                We couldn't find a conference matching <code className="az-inline-code">"{slug}"</code>. It may have been renamed, moved, or removed.
              </>
            ) : (
              'The conference you are looking for does not exist or may have been removed.'
            )}
          </p>
          <div className="az-conference-not-found__actions">
            <Link to="/conferences">
              <Button variant="primary">
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to Conferences</span>
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                <Home size={16} aria-hidden="true" />
                <span>Go Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConferenceNotFound;
