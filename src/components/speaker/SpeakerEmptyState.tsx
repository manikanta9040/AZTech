import { UserX, RotateCcw } from 'lucide-react';

interface SpeakerEmptyStateProps {
  onClearFilters: () => void;
  className?: string;
}

export function SpeakerEmptyState({
  onClearFilters,
  className = '',
}: SpeakerEmptyStateProps) {
  return (
    <div
      className={`az-conference-empty-state ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="az-conference-empty-state__icon-wrap" aria-hidden="true">
        <UserX size={44} />
      </div>
      <h3 className="az-conference-empty-state__title">No speakers found</h3>
      <p className="az-conference-empty-state__desc">
        We couldn&apos;t find any speakers matching your current search or filter criteria. Try broadening your keywords or resetting filters.
      </p>
      <button
        type="button"
        className="az-button az-button--primary az-conference-empty-state__btn"
        onClick={onClearFilters}
        aria-label="Clear all applied filters and search keywords"
      >
        <RotateCcw size={15} aria-hidden="true" />
        <span>Clear Filters</span>
      </button>
    </div>
  );
}

export default SpeakerEmptyState;
