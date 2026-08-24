import { X, RotateCcw } from 'lucide-react';
import type { SpeakerFilterState } from '../../types/speaker';

interface ActiveFiltersProps {
  filters: SpeakerFilterState;
  onRemoveFilter: (key: keyof SpeakerFilterState) => void;
  onClearAll: () => void;
  className?: string;
}

export function ActiveFilters({
  filters,
  onRemoveFilter,
  onClearAll,
  className = '',
}: ActiveFiltersProps) {
  const chips: { key: keyof SpeakerFilterState; label: string; value: string }[] = [];

  if (filters.search.trim()) {
    chips.push({
      key: 'search',
      label: 'Search',
      value: `"${filters.search}"`,
    });
  }

  if (filters.country && filters.country !== 'all') {
    chips.push({
      key: 'country',
      label: 'Country',
      value: filters.country,
    });
  }

  if (filters.organization && filters.organization !== 'all') {
    chips.push({
      key: 'organization',
      label: 'Organization',
      value: filters.organization,
    });
  }

  if (filters.expertise && filters.expertise !== 'all') {
    chips.push({
      key: 'expertise',
      label: 'Expertise',
      value: filters.expertise,
    });
  }

  if (filters.designation && filters.designation !== 'all') {
    chips.push({
      key: 'designation',
      label: 'Designation',
      value: filters.designation,
    });
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <div
      className={`az-active-filters ${className}`}
      aria-label="Active speaker filters"
      role="region"
    >
      <div className="az-active-filters__list" role="list">
        {chips.map((chip) => (
          <div
            key={chip.key}
            className="az-active-filter-chip"
            role="listitem"
          >
            <span className="az-active-filter-chip__label">
              <strong>{chip.label}:</strong> {chip.value}
            </span>
            <button
              type="button"
              className="az-active-filter-chip__remove"
              onClick={() => onRemoveFilter(chip.key)}
              aria-label={`Remove ${chip.label} filter ${chip.value}`}
            >
              <X size={13} aria-hidden="true" />
            </button>
          </div>
        ))}

        <button
          type="button"
          className="az-button az-button--ghost az-button--sm az-active-filters__clear-btn"
          onClick={onClearAll}
          aria-label="Clear all active filters"
        >
          <RotateCcw size={13} aria-hidden="true" />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
}

export default ActiveFilters;
