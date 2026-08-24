import type { Conference } from '../../types/conference';
import { ConferenceCard } from './ConferenceCard';

interface ConferenceGridProps {
  conferences: Conference[];
  className?: string;
}

export function ConferenceGrid({ conferences, className = '' }: ConferenceGridProps) {
  return (
    <div
      className={`az-conference-grid ${className}`}
      role="list"
      aria-label="Conferences list"
    >
      {conferences.map((conf) => (
        <div key={conf.id} role="listitem">
          <ConferenceCard conference={conf} />
        </div>
      ))}
    </div>
  );
}

export default ConferenceGrid;
