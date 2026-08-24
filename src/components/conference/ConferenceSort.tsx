import { useId } from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { SortOption } from '../../types/conference';
import { SORT_OPTIONS } from '../../hooks/useConferenceFilters';

interface ConferenceSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

export function ConferenceSort({ value, onChange, className = '' }: ConferenceSortProps) {
  const selectId = useId();

  return (
    <div className={`az-conference-sort ${className}`}>
      <label htmlFor={selectId} className="az-conference-sort__label">
        <ArrowUpDown size={15} aria-hidden="true" className="az-conference-sort__icon" />
        <span>Sort by:</span>
      </label>
      <div className="az-conference-sort__select-wrap">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="az-select az-conference-sort__select"
          aria-label="Sort conferences"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ConferenceSort;
