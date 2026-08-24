import { CalendarX2, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';

interface ConferenceEmptyStateProps {
  title?: string;
  description?: string;
  onClearFilters: () => void;
  className?: string;
}

export function ConferenceEmptyState({
  title = 'No conferences found',
  description = 'Try changing your search keywords or adjusting your filters to find upcoming events.',
  onClearFilters,
  className = '',
}: ConferenceEmptyStateProps) {
  return (
    <section className={`az-conference-empty-state ${className}`} role="status" aria-live="polite">
      <div className="az-conference-empty-state__icon-wrap" aria-hidden="true">
        <CalendarX2 size={40} className="az-conference-empty-state__icon" />
      </div>
      <h3 className="az-conference-empty-state__title">{title}</h3>
      <p className="az-conference-empty-state__desc az-body-sm">{description}</p>
      <div className="az-conference-empty-state__action">
        <Button variant="primary" onClick={onClearFilters}>
          <RotateCcw size={15} aria-hidden="true" />
          <span>Clear Filters</span>
        </Button>
      </div>
    </section>
  );
}

export default ConferenceEmptyState;
