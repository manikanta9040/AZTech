import {
  GraduationCap,
  Briefcase,
  Award,
  FlaskConical,
  Calendar,
} from 'lucide-react';
import type { Speaker } from '../../../types/speaker';

interface SpeakerExperienceProps {
  speaker: Speaker;
  className?: string;
}

export function SpeakerExperience({ speaker, className = '' }: SpeakerExperienceProps) {
  const exp = speaker.experience;

  if (!exp) {
    return null;
  }

  const hasEducation = exp.education && exp.education.length > 0;
  const hasWork = exp.work && exp.work.length > 0;
  const hasResearch = exp.research && exp.research.length > 0;
  const hasAwards = exp.awards && exp.awards.length > 0;

  if (!hasEducation && !hasWork && !hasResearch && !hasAwards) {
    return null;
  }

  return (
    <section className={`az-conf-section ${className}`} aria-labelledby="speaker-exp-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <GraduationCap size={22} />
        </div>
        <div>
          <h2 id="speaker-exp-heading" className="az-conf-section__title" style={{ margin: 0 }}>
            Academic & Professional Experience
          </h2>
          <p className="az-caption" style={{ margin: '4px 0 0' }}>
            Career history, formal education, active research themes, and honors.
          </p>
        </div>
      </div>

      <div className="az-speaker-exp-layout">
        {/* Education Timeline */}
        {hasEducation && (
          <div className="az-speaker-exp-block">
            <h3 className="az-speaker-exp-block__title">
              <GraduationCap size={18} aria-hidden="true" className="az-speaker-exp-block__icon" />
              <span>Education & Academic Credentials</span>
            </h3>
            <div className="az-speaker-timeline">
              {exp.education?.map((item, idx) => (
                <div key={idx} className="az-speaker-timeline-item">
                  <div className="az-speaker-timeline-marker" aria-hidden="true" />
                  <div className="az-speaker-timeline-content">
                    {item.year && (
                      <span className="az-speaker-timeline-date">
                        <Calendar size={12} aria-hidden="true" />
                        {item.year}
                      </span>
                    )}
                    <h4 className="az-speaker-timeline-role">{item.title}</h4>
                    <p className="az-speaker-timeline-org">{item.organization}</p>
                    {item.description && (
                      <p className="az-speaker-timeline-desc">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Work Experience */}
        {hasWork && (
          <div className="az-speaker-exp-block">
            <h3 className="az-speaker-exp-block__title">
              <Briefcase size={18} aria-hidden="true" className="az-speaker-exp-block__icon" />
              <span>Professional Appointments & Leadership</span>
            </h3>
            <div className="az-speaker-timeline">
              {exp.work?.map((item, idx) => (
                <div key={idx} className="az-speaker-timeline-item">
                  <div className="az-speaker-timeline-marker" aria-hidden="true" />
                  <div className="az-speaker-timeline-content">
                    {item.year && (
                      <span className="az-speaker-timeline-date">
                        <Calendar size={12} aria-hidden="true" />
                        {item.year}
                      </span>
                    )}
                    <h4 className="az-speaker-timeline-role">{item.title}</h4>
                    <p className="az-speaker-timeline-org">{item.organization}</p>
                    {item.description && (
                      <p className="az-speaker-timeline-desc">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Research Themes & Awards */}
        {(hasResearch || hasAwards) && (
          <div className="az-speaker-exp-two-col">
            {hasResearch && (
              <div className="az-speaker-exp-subcard">
                <h3 className="az-speaker-exp-subcard__title">
                  <FlaskConical size={18} aria-hidden="true" className="az-speaker-exp-block__icon" />
                  <span>Research Areas</span>
                </h3>
                <ul className="az-speaker-exp-list">
                  {exp.research?.map((res, idx) => (
                    <li key={idx} className="az-speaker-exp-list-item">
                      <span className="az-speaker-exp-bullet" aria-hidden="true" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasAwards && (
              <div className="az-speaker-exp-subcard">
                <h3 className="az-speaker-exp-subcard__title">
                  <Award size={18} aria-hidden="true" className="az-speaker-exp-block__icon" />
                  <span>Honors & Fellowships</span>
                </h3>
                <ul className="az-speaker-exp-list">
                  {exp.awards?.map((award, idx) => (
                    <li key={idx} className="az-speaker-exp-list-item">
                      <span className="az-speaker-exp-bullet az-speaker-exp-bullet--gold" aria-hidden="true" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default SpeakerExperience;
