import { X, RotateCcw } from 'lucide-react';
import type { ConferenceFilterState } from '../../types/conference';
import { DATE_OPTIONS, STATUS_OPTIONS } from '../../hooks/useConferenceFilters';

interface ActiveFiltersProps {
  filters: ConferenceFilterState;
  onRemoveFilter: (key: keyof ConferenceFilterState) => void;
  onClearAll: () => void;
  className?: string;
}

export function ActiveFilters({
  filters,
  onRemoveFilter,
  onClearAll,
  className = '',
}: ActiveFiltersProps) {
  // Collect active filters chips
  const activeChips: { key: keyof ConferenceFilterState; label: string; value: string }[] = [];

  if (filters.search.trim()) {
    activeChips.push({
      key: 'search',
      label: 'Search',
      value: `"${filters.search}"`,
    });
  }

  if (filters.category && filters.category !== 'all') {
    activeChips.push({
      key: 'category',
      label: 'Category',
      value: filters.category,
    });
  }

  if (filters.country && filters.country !== 'all') {
    activeChips.push({
      key: 'country',
      label: 'Country',
      value: filters.country,
    });
  }

  if (filters.city && filters.city !== 'all') {
    activeChips.push({
      key: 'city',
      label: 'City',
      value: filters.city,
    });
  }

  if (filters.date && filters.date !== 'all') {
    const dateLabel = DATE_OPTIONS.find((d) => d.value === filters.date)?.label || filters.date;
    activeChips.push({
      key: 'date',
      label: 'Date',
      value: dateLabel,
    });
  }

  if (filters.status && filters.status !== 'all') {
    const statusLabel = STATUS_OPTIONS.find((s) => s.value === filters.status)?.label || filters.status;
    activeChips.push({
      key: 'status',
      label: 'Status',
      value: statusLabel,
    });
  }

  if (activeChips.length === 0) {
    return null;
  }

  return (
    <div className={`az-active-filters ${className}`} aria-label="Active filters">
      <span className="az-active-filters__label">Active Filters:</span>
      <div className="az-active-filters__list">
        {activeChips.map((chip) => (
          <span key={chip.key} className="az-chip">
            <span className="az-chip__label">
              <span className="az-chip__prefix">{chip.label}:</span> {chip.value}
            </span>
            <button
              type="button"
              className="az-chip__remove"
              onClick={() => onRemoveFilter(chip.key)}
              aria-label={`Remove ${chip.label} filter: ${chip.value}`}
              title={`Remove ${chip.value}`}
            >
              <X size={13} aria-hidden="true" />
            </button>
          </span>
        ))}

        <button
          type="button"
          className="az-active-filters__clear-all-btn"
          onClick={onClearAll}
          aria-label="Clear all active filters"
        >
          <RotateCcw size={12} aria-hidden="true" />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
}

export default ActiveFilters;
