import { ArrowUpDown } from 'lucide-react';
import type { SpeakerSortOption } from '../../types/speaker';
import { SPEAKER_SORT_OPTIONS } from '../../hooks/useSpeakerFilters';

interface SpeakerSortProps {
  value: SpeakerSortOption;
  onChange: (sort: SpeakerSortOption) => void;
  className?: string;
}

export function SpeakerSort({ value, onChange, className = '' }: SpeakerSortProps) {
  return (
    <div className={`az-conference-sort ${className}`}>
      <label htmlFor="speaker-sort-select" className="az-conference-sort__label">
        <ArrowUpDown size={15} aria-hidden="true" />
        <span>Sort by:</span>
      </label>
      <div className="az-conference-sort__select-wrap">
        <select
          id="speaker-sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as SpeakerSortOption)}
          className="az-conference-sort__select"
          aria-label="Sort speakers list"
        >
          {SPEAKER_SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SpeakerSort;
