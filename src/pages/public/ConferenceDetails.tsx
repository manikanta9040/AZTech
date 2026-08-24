import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { mockConferences } from '../../data/conferences';
import {
  ConferenceHero,
  ConferenceInfo,
  AboutConference,
  ConferenceObjectives,
  ConferenceTopics,
  ImportantDates,
  RegistrationCard,
  RegistrationTypes,
  ConferenceSpeakers,
  ConferenceCommittee,
  ConferenceProgram,
  ConferenceVenue,
  AccommodationSection,
  ConferenceSponsors,
  ConferenceGallery,
  ConferenceFAQ,
  ConferenceCTA,
  RelatedConferences,
  ConferenceNotFound,
} from '../../components/conference/details';

export function ConferenceDetails() {
  const { slug } = useParams<{ slug: string }>();

  // 1. Dynamic slug resolution (matching slug or id)
  const conference = mockConferences.find(
    (c) => c.slug.toLowerCase() === slug?.toLowerCase() || c.id.toLowerCase() === slug?.toLowerCase()
  );

  // 2. Dynamic page title for SEO
  useEffect(() => {
    if (conference) {
      document.title = `${conference.title} | AZTech`;
    } else {
      document.title = 'Conference Not Found | AZTech';
    }

    return () => {
      document.title = 'AZTech — Global Conference Management Platform';
    };
  }, [conference]);

  // 3. Invalid conference handling
  if (!conference) {
    return <ConferenceNotFound slug={slug} />;
  }

  return (
    <div className="az-conf-details-page">
      {/* Breadcrumb Navigation */}
      <section className="az-conf-details-breadcrumb-section">
        <div className="az-container">
          <nav aria-label="Breadcrumb" className="az-breadcrumb" style={{ margin: 0 }}>
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
                <Link to="/conferences" className="az-breadcrumb__link">
                  Conferences
                </Link>
              </li>
              <li className="az-breadcrumb__separator" aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="az-breadcrumb__item">
                <span className="az-breadcrumb__current" aria-current="page">
                  {conference.title}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Hero Banner */}
      <ConferenceHero conference={conference} />

      {/* Quick Info Grid */}
      <ConferenceInfo conference={conference} />

      {/* Main 2-Column Layout */}
      <section className="az-conf-details-content-section">
        <div className="az-container">
          <div className="az-conf-details-layout">
            {/* Main Content Area */}
            <main className="az-conf-details-layout__main" id="conference-content-main">
              <AboutConference conference={conference} />
              <ConferenceObjectives conference={conference} />
              <ConferenceTopics conference={conference} />
              <ImportantDates conference={conference} />
              <RegistrationTypes conference={conference} />
              <ConferenceSpeakers conference={conference} />
              <ConferenceProgram conference={conference} />
              <ConferenceCommittee conference={conference} />
              <ConferenceVenue conference={conference} />
              <AccommodationSection conference={conference} />
              <ConferenceSponsors conference={conference} />
              <ConferenceGallery conference={conference} />
              <ConferenceFAQ conference={conference} />
            </main>

            {/* Sticky Sidebar */}
            <aside className="az-conf-details-layout__sidebar" aria-label="Conference Sidebar">
              <RegistrationCard conference={conference} />
            </aside>
          </div>
        </div>
      </section>

      {/* Related Conferences */}
      <RelatedConferences currentConference={conference} />

      {/* Conversion Banner */}
      <ConferenceCTA conference={conference} />
    </div>
  );
}

export default ConferenceDetails;
