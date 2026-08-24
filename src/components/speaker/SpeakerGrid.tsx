import type { Speaker } from '../../types/speaker';
import { SpeakerCard } from './SpeakerCard';

interface SpeakerGridProps {
  speakers: Speaker[];
  className?: string;
}

export function SpeakerGrid({ speakers, className = '' }: SpeakerGridProps) {
  return (
    <div
      className={`az-speakers-listing-grid ${className}`}
      role="region"
      aria-label="Speaker results directory"
    >
      {speakers.map((speaker) => (
        <SpeakerCard key={speaker.id} speaker={speaker} />
      ))}
    </div>
  );
}

export default SpeakerGrid;
