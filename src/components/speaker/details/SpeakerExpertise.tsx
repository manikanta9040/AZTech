import { Sparkles, CheckCircle2 } from 'lucide-react';
import type { Speaker } from '../../../types/speaker';

interface SpeakerExpertiseProps {
  speaker: Speaker;
  className?: string;
}

export function SpeakerExpertise({ speaker, className = '' }: SpeakerExpertiseProps) {
  if (!speaker.expertise || speaker.expertise.length === 0) {
    return null;
  }

  return (
    <section className={`az-conf-section ${className}`} aria-labelledby="speaker-expertise-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Sparkles size={22} />
        </div>
        <div>
          <h2 id="speaker-expertise-heading" className="az-conf-section__title" style={{ margin: 0 }}>
            Areas of Expertise
          </h2>
          <p className="az-caption" style={{ margin: '4px 0 0' }}>
            Core research specializations and domain masteries.
          </p>
        </div>
      </div>

      <div className="az-speaker-expertise-grid">
        {speaker.expertise.map((item) => (
          <div key={item} className="az-speaker-expertise-card">
            <div className="az-speaker-expertise-card__icon" aria-hidden="true">
              <CheckCircle2 size={18} />
            </div>
            <div className="az-speaker-expertise-card__content">
              <h3 className="az-speaker-expertise-card__title">{item}</h3>
              <p className="az-caption az-speaker-expertise-card__desc">
                Primary field of technical investigation and conference focus.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SpeakerExpertise;
