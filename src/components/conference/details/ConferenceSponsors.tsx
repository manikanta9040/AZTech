import { Trophy } from 'lucide-react';
import type { Conference, ConferenceSponsors as SponsorsType } from '../../../types/conference';

interface ConferenceSponsorsProps {
  conference: Conference;
}

export function ConferenceSponsors({ conference }: ConferenceSponsorsProps) {
  const defaultSponsors: SponsorsType = {
    platinum: [
      { id: 'sp-1', name: 'Google Cloud & DeepMind', tier: 'platinum' },
      { id: 'sp-2', name: 'Microsoft Azure AI', tier: 'platinum' },
    ],
    gold: [
      { id: 'sp-3', name: 'Intel Corporation', tier: 'gold' },
      { id: 'sp-4', name: 'NVIDIA AI Systems', tier: 'gold' },
      { id: 'sp-5', name: 'Amazon Web Services (AWS)', tier: 'gold' },
    ],
    silver: [
      { id: 'sp-6', name: 'Springer Nature Academic', tier: 'silver' },
      { id: 'sp-7', name: 'IEEE Computer Society', tier: 'silver' },
      { id: 'sp-8', name: 'Elsevier Publishing', tier: 'silver' },
    ],
  };

  const sponsors = conference.sponsors || defaultSponsors;

  return (
    <section className="az-conf-section" aria-labelledby="conf-sponsors-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Trophy size={22} />
        </div>
        <h2 id="conf-sponsors-heading" className="az-conf-section__title">
          Official Conference Sponsors & Partners
        </h2>
      </div>

      <p className="az-body-sm" style={{ color: 'var(--az-muted)', marginBottom: 'var(--az-space-6)' }}>
        We are grateful to our global technology, industrial, and publishing sponsors for supporting scientific excellence and academic research.
      </p>

      {/* Platinum Sponsors */}
      {sponsors.platinum && sponsors.platinum.length > 0 && (
        <div className="az-sponsors-tier">
          <div className="az-sponsors-tier__label az-sponsors-tier__label--platinum">
            <span>Platinum Sponsors</span>
          </div>
          <div className="az-sponsors-grid az-sponsors-grid--platinum">
            {sponsors.platinum.map((item) => (
              <div key={item.id} className="az-sponsor-card az-sponsor-card--platinum">
                <span className="az-sponsor-card__name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gold Sponsors */}
      {sponsors.gold && sponsors.gold.length > 0 && (
        <div className="az-sponsors-tier">
          <div className="az-sponsors-tier__label az-sponsors-tier__label--gold">
            <span>Gold Sponsors</span>
          </div>
          <div className="az-sponsors-grid az-sponsors-grid--gold">
            {sponsors.gold.map((item) => (
              <div key={item.id} className="az-sponsor-card az-sponsor-card--gold">
                <span className="az-sponsor-card__name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Silver Sponsors */}
      {sponsors.silver && sponsors.silver.length > 0 && (
        <div className="az-sponsors-tier">
          <div className="az-sponsors-tier__label az-sponsors-tier__label--silver">
            <span>Silver & Academic Partners</span>
          </div>
          <div className="az-sponsors-grid az-sponsors-grid--silver">
            {sponsors.silver.map((item) => (
              <div key={item.id} className="az-sponsor-card az-sponsor-card--silver">
                <span className="az-sponsor-card__name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ConferenceSponsors;
