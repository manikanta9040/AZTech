import { Link } from 'react-router-dom';
import { ChevronRight, Globe } from 'lucide-react';
import { Badge } from '../common/Badge';

export function ConferencePageHeader() {
  return (
    <section className="az-conference-header" aria-labelledby="conference-heading">
      <div className="az-container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="az-breadcrumb">
          <ol className="az-breadcrumb__list">
            <li className="az-breadcrumb__item">
              <Link to="/" className="az-breadcrumb__link">
                Home
              </Link>
            </li>
            <li className="az-breadcrumb__separator" aria-hidden="true">
              <ChevronRight size={14} />
            </li>
            <li className="az-breadcrumb__item">
              <span className="az-breadcrumb__current" aria-current="page">
                Conferences
              </span>
            </li>
          </ol>
        </nav>

        {/* Title & Description */}
        <div className="az-conference-header__content">
          <div className="az-conference-header__badge-wrap">
            <Badge variant="primary">
              <Globe size={13} style={{ marginRight: '6px' }} aria-hidden="true" />
              Global Conference Directory
            </Badge>
          </div>
          <h1 id="conference-heading" className="az-conference-header__title">
            Explore AZTech Conferences
          </h1>
          <p className="az-conference-header__description az-body-lg">
            Discover conferences, connect with experts and explore opportunities to share knowledge
            with a global community.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ConferencePageHeader;
