import { CheckCircle2, Target } from 'lucide-react';
import type { Conference } from '../../../types/conference';

interface ConferenceObjectivesProps {
  conference: Conference;
}

export function ConferenceObjectives({ conference }: ConferenceObjectivesProps) {
  const objectives = conference.objectives && conference.objectives.length > 0
    ? conference.objectives
    : [
        `Facilitate high-impact research dissemination in ${conference.category} and interdisciplinary breakthroughs.`,
        'Connect world-renowned scholars, research fellows, and industry executives worldwide.',
        'Provide peer-reviewed publication opportunities in indexed international proceedings.',
        'Foster collaborative industry-academia partnerships and global technology initiatives.',
        'Present emerging case studies, disruptive technologies, and ethical governance models.',
      ];

  return (
    <section className="az-conf-section" aria-labelledby="conf-objectives-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Target size={22} />
        </div>
        <h2 id="conf-objectives-heading" className="az-conf-section__title">
          Key Conference Objectives
        </h2>
      </div>

      <div className="az-conf-objectives-grid">
        {objectives.map((objective, idx) => (
          <div key={idx} className="az-conf-objective-card">
            <div className="az-conf-objective-card__icon" aria-hidden="true">
              <CheckCircle2 size={18} />
            </div>
            <p className="az-conf-objective-card__text">{objective}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ConferenceObjectives;
