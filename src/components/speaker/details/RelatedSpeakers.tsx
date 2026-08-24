import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import type { Speaker } from '../../../types/speaker';
import { mockSpeakers } from '../../../data/speakers';
import { SpeakerCard } from '../SpeakerCard';

interface RelatedSpeakersProps {
  currentSpeaker: Speaker;
  className?: string;
}

export function RelatedSpeakers({ currentSpeaker, className = '' }: RelatedSpeakersProps) {
  // Find related speakers: shared expertise or shared conferences, excluding current
  const otherSpeakers = mockSpeakers.filter((s) => s.id !== currentSpeaker.id);

  // Score speakers by shared expertise and shared conference IDs
  const scoredSpeakers = otherSpeakers.map((spk) => {
    let score = 0;

    // Expertise overlap
    if (spk.expertise && currentSpeaker.expertise) {
      spk.expertise.forEach((exp) => {
        if (currentSpeaker.expertise.includes(exp)) {
          score += 3;
        }
      });
    }

    // Conference overlap
    if (spk.conferenceIds && currentSpeaker.conferenceIds) {
      spk.conferenceIds.forEach((cId) => {
        if (currentSpeaker.conferenceIds?.includes(cId)) {
          score += 4;
        }
      });
    }

    // Country match
    if (spk.country.toLowerCase() === currentSpeaker.country.toLowerCase()) {
      score += 1;
    }

    return { speaker: spk, score };
  });

  scoredSpeakers.sort((a, b) => b.score - a.score);

  const relatedSpeakers = scoredSpeakers.slice(0, 4).map((item) => item.speaker);

  if (relatedSpeakers.length === 0) {
    return null;
  }

  return (
    <section className={`az-section az-speaker-related-section ${className}`} aria-labelledby="related-speakers-heading">
      <div className="az-container">
        <div className="az-conf-section-header" style={{ marginBottom: 'var(--az-space-6)' }}>
          <div>
            <div className="az-conf-section__header-row" style={{ marginBottom: '4px' }}>
              <div className="az-conf-section__header-icon" aria-hidden="true">
                <Users size={20} />
              </div>
              <h2 id="related-speakers-heading" className="az-h2" style={{ margin: 0 }}>
                Related Faculty & Experts
              </h2>
            </div>
            <p className="az-body" style={{ color: 'var(--az-muted)', margin: 0 }}>
              Discover other international researchers working in complementary technical fields.
            </p>
          </div>

          <Link to="/speakers" className="az-button az-button--outline az-button--sm">
            <span>View All Speakers</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="az-speakers-grid">
          {relatedSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedSpeakers;
