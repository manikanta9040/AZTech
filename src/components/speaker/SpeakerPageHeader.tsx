import { Link } from 'react-router-dom';
import { ChevronRight, Users, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export function SpeakerPageHeader() {
  return (
    <header className="az-speaker-header-section" aria-labelledby="speaker-page-title">
      <div className="az-container">
        {/* Breadcrumbs */}
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
                Speakers
              </span>
            </li>
          </ol>
        </nav>

        {/* Header Hero Content */}
        <div className="az-speaker-header-content">
          <Badge variant="primary">
            <Sparkles size={13} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            Distinguished Faculty & Keynote Leaders
          </Badge>

          <h1 id="speaker-page-title" className="az-speaker-header__title">
            Meet Our Speakers
          </h1>

          <p className="az-speaker-header__desc">
            Connect with researchers, academics, professionals and industry leaders sharing knowledge at AZTech conferences worldwide.
          </p>

          <div className="az-speaker-header__stats">
            <div className="az-speaker-header__stat-item">
              <Users size={16} className="az-speaker-header__stat-icon" aria-hidden="true" />
              <span>20+ Global Pioneers & Keynote Authorities</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SpeakerPageHeader;
