import { Link } from 'react-router-dom';
import { Mic2, ArrowRight } from 'lucide-react';
import type { Conference } from '../../../types/conference';
import { mockSpeakers } from '../../../data/speakers';
import { SpeakerCard } from '../../speaker/SpeakerCard';

interface ConferenceSpeakersProps {
  conference: Conference;
}

export function ConferenceSpeakers({ conference }: ConferenceSpeakersProps) {
  // Find matching speakers by IDs or fallback to first 3-4 mock speakers
  const speakers = (conference.speakerIds && conference.speakerIds.length > 0)
    ? mockSpeakers.filter((spk) => conference.speakerIds?.includes(spk.id))
    : mockSpeakers.slice(0, 4);

  const displaySpeakers = speakers.length > 0 ? speakers : mockSpeakers.slice(0, 4);

  return (
    <section className="az-conf-section" aria-labelledby="conf-speakers-heading">
      <div className="az-conf-section__header-flex">
        <div className="az-conf-section__header-row">
          <div className="az-conf-section__header-icon" aria-hidden="true">
            <Mic2 size={22} />
          </div>
          <div>
            <h2 id="conf-speakers-heading" className="az-conf-section__title" style={{ margin: 0 }}>
              Distinguished Keynote Speakers
            </h2>
            <p className="az-caption" style={{ margin: '4px 0 0' }}>
              Hear from global pioneers, thought leaders, and eminent professors in {conference.category}.
            </p>
          </div>
        </div>

        <Link to="/speakers" className="az-button az-button--ghost az-button--sm">
          <span>All Speakers</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="az-conf-speakers-grid">
        {displaySpeakers.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>
    </section>
  );
}

export default ConferenceSpeakers;
