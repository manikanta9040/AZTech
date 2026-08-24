import { Award, Users, BookOpen, Globe2 } from 'lucide-react';
import type { Conference } from '../../../types/conference';

interface AboutConferenceProps {
  conference: Conference;
}

export function AboutConference({ conference }: AboutConferenceProps) {
  return (
    <section className="az-conf-section" aria-labelledby="about-conference-heading">
      <h2 id="about-conference-heading" className="az-conf-section__title">
        About the Conference
      </h2>

      <div className="az-conf-about">
        <p className="az-body-lg az-conf-about__lead">
          {conference.description}
        </p>

        <p className="az-body az-conf-about__paragraph">
          The <strong>{conference.title}</strong> serves as a premier international platform uniting researchers, leading scientists, distinguished faculty, and forward-thinking corporate executives. Attendees will explore state-of-the-art developments, deliberate on emerging technical methodologies, and establish long-lasting multilateral partnerships.
        </p>

        {/* Feature Highlights Grid */}
        <div className="az-conf-about__highlights">
          <div className="az-conf-highlight-card">
            <div className="az-conf-highlight-card__icon">
              <Globe2 size={22} aria-hidden="true" />
            </div>
            <div>
              <h4 className="az-conf-highlight-card__title">Global Community</h4>
              <p className="az-caption">
                Delegates and speakers representing over 35+ countries and leading universities.
              </p>
            </div>
          </div>

          <div className="az-conf-highlight-card">
            <div className="az-conf-highlight-card__icon">
              <Award size={22} aria-hidden="true" />
            </div>
            <div>
              <h4 className="az-conf-highlight-card__title">Peer-Reviewed Excellence</h4>
              <p className="az-caption">
                All submitted papers undergo double-blind review by our international Scientific Committee.
              </p>
            </div>
          </div>

          <div className="az-conf-highlight-card">
            <div className="az-conf-highlight-card__icon">
              <Users size={22} aria-hidden="true" />
            </div>
            <div>
              <h4 className="az-conf-highlight-card__title">Executive Networking</h4>
              <p className="az-caption">
                Dedicated B2B networking sessions, panel discussions, and collaborative dinners.
              </p>
            </div>
          </div>

          <div className="az-conf-highlight-card">
            <div className="az-conf-highlight-card__icon">
              <BookOpen size={22} aria-hidden="true" />
            </div>
            <div>
              <h4 className="az-conf-highlight-card__title">Indexed Publications</h4>
              <p className="az-caption">
                Accepted proceedings published with digital DOIs and indexed in leading scientific databases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutConference;
