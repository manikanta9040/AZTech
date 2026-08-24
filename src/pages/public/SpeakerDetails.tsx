import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronRight,
  Building,
  Globe,
  MapPin,
  Sparkles,
  Calendar,
  Send,
} from 'lucide-react';
import { mockSpeakers } from '../../data/speakers';
import {
  SpeakerHero,
  SpeakerBiography,
  SpeakerExpertise,
  SpeakerExperience,
  SpeakerConferences,
  SpeakerSessions,
  SpeakerTopics,
  SpeakerSocialLinks,
  RelatedSpeakers,
  SpeakerCTA,
  SpeakerNotFound,
} from '../../components/speaker/details';
import { Badge } from '../../components/common/Badge';

export function SpeakerDetails() {
  const { slug } = useParams<{ slug: string }>();

  // 1. Dynamic speaker resolution by slug or id
  const speaker = mockSpeakers.find(
    (s) =>
      s.slug.toLowerCase() === slug?.toLowerCase() ||
      s.id.toLowerCase() === slug?.toLowerCase()
  );

  // 2. Dynamic page title for SEO
  useEffect(() => {
    if (speaker) {
      document.title = `${speaker.name} | AZTech Speakers`;
    } else {
      document.title = 'Speaker Not Found | AZTech';
    }

    return () => {
      document.title = 'AZTech — Global Conference Management Platform';
    };
  }, [speaker]);

  // 3. Invalid speaker profile handling
  if (!speaker) {
    return <SpeakerNotFound slug={slug} />;
  }

  return (
    <div className="az-speaker-details-page">
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
                <Link to="/speakers" className="az-breadcrumb__link">
                  Speakers
                </Link>
              </li>
              <li className="az-breadcrumb__separator" aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="az-breadcrumb__item">
                <span className="az-breadcrumb__current" aria-current="page">
                  {speaker.name}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Hero Profile Header */}
      <SpeakerHero speaker={speaker} />

      {/* Main 2-Column Content Layout */}
      <section className="az-conf-details-content-section" style={{ paddingTop: 'var(--az-space-6)' }}>
        <div className="az-container">
          <div className="az-conf-details-layout">
            {/* Main Column */}
            <main className="az-conf-details-layout__main" id="speaker-content-main">
              <SpeakerBiography speaker={speaker} />
              <SpeakerExpertise speaker={speaker} />
              <SpeakerExperience speaker={speaker} />
              <SpeakerConferences speaker={speaker} />
              <SpeakerSessions speaker={speaker} />
              <SpeakerTopics speaker={speaker} />
            </main>

            {/* Sidebar Column */}
            <aside className="az-conf-details-layout__sidebar" aria-label="Speaker Quick Facts and Actions">
              <div className="az-card az-speaker-sidebar-card">
                <h3 className="az-speaker-sidebar-card__title">Speaker Overview</h3>

                <div className="az-speaker-sidebar-list">
                  <div className="az-speaker-sidebar-item">
                    <Building size={16} className="az-speaker-sidebar-icon" aria-hidden="true" />
                    <div>
                      <span className="az-speaker-sidebar-label">Affiliation</span>
                      <span className="az-speaker-sidebar-val">{speaker.organization}</span>
                    </div>
                  </div>

                  <div className="az-speaker-sidebar-item">
                    <Globe size={16} className="az-speaker-sidebar-icon" aria-hidden="true" />
                    <div>
                      <span className="az-speaker-sidebar-label">Country</span>
                      <span className="az-speaker-sidebar-val">{speaker.country}</span>
                    </div>
                  </div>

                  {speaker.city && (
                    <div className="az-speaker-sidebar-item">
                      <MapPin size={16} className="az-speaker-sidebar-icon" aria-hidden="true" />
                      <div>
                        <span className="az-speaker-sidebar-label">Location</span>
                        <span className="az-speaker-sidebar-val">{speaker.city}</span>
                      </div>
                    </div>
                  )}

                  <div className="az-speaker-sidebar-item">
                    <Sparkles size={16} className="az-speaker-sidebar-icon" aria-hidden="true" />
                    <div>
                      <span className="az-speaker-sidebar-label">Primary Field</span>
                      <span className="az-speaker-sidebar-val">{speaker.expertise[0]}</span>
                    </div>
                  </div>

                  {speaker.conferenceIds && (
                    <div className="az-speaker-sidebar-item">
                      <Calendar size={16} className="az-speaker-sidebar-icon" aria-hidden="true" />
                      <div>
                        <span className="az-speaker-sidebar-label">Conferences</span>
                        <span className="az-speaker-sidebar-val">
                          {speaker.conferenceIds.length} Scheduled Event{speaker.conferenceIds.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="az-speaker-sidebar-card__divider" />

                <div className="az-speaker-sidebar-tags">
                  <span className="az-caption" style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                    Specialization Tags:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {speaker.expertise.map((exp) => (
                      <Badge key={exp} variant="primary">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="az-speaker-sidebar-card__divider" />

                <div className="az-speaker-sidebar-card__actions">
                  <Link
                    to="/conferences"
                    className="az-button az-button--primary az-button--full"
                  >
                    <Calendar size={16} aria-hidden="true" />
                    <span>View Conference Schedule</span>
                  </Link>

                  <Link
                    to="/contact"
                    className="az-button az-button--outline az-button--full"
                  >
                    <Send size={16} aria-hidden="true" />
                    <span>Speaker Inquiry</span>
                  </Link>
                </div>

                {speaker.socialLinks && (
                  <div className="az-speaker-sidebar-card__social">
                    <span className="az-caption" style={{ fontWeight: 700, display: 'block', marginBottom: '8px', textAlign: 'center' }}>
                      Connect Online:
                    </span>
                    <SpeakerSocialLinks
                      socialLinks={speaker.socialLinks}
                      speakerName={speaker.name}
                    />
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Speakers */}
      <RelatedSpeakers currentSpeaker={speaker} />

      {/* Conversion Banner */}
      <SpeakerCTA />
    </div>
  );
}

export default SpeakerDetails;
