import type { ReactNode } from 'react';
import {
  Tag,
  Globe,
  MapPin,
  Calendar,
  Clock,
  RotateCcw,
} from 'lucide-react';
import type {
  ConferenceFilterState,
  DateFilterOption,
  FilterOption,
} from '../../types/conference';
import { DATE_OPTIONS, STATUS_OPTIONS } from '../../hooks/useConferenceFilters';

interface ConferenceFiltersProps {
  filters: ConferenceFilterState;
  categoryOptions: FilterOption[];
  countryOptions: FilterOption[];
  cityOptions: FilterOption[];
  onCategoryChange: (category: string) => void;
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
  onDateChange: (date: DateFilterOption) => void;
  onStatusChange: (status: string) => void;
  onClearFilters: () => void;
  activeFiltersCount?: number;
  className?: string;
}

interface FilterSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

function FilterSection({ title, icon, children }: FilterSectionProps) {
  return (
    <div className="az-filter-section">
      <div className="az-filter-section__header">
        <span className="az-filter-section__icon" aria-hidden="true">
          {icon}
        </span>
        <h4 className="az-filter-section__title">{title}</h4>
      </div>
      <div className="az-filter-section__content">{children}</div>
    </div>
  );
}

export function ConferenceFilters({
  filters,
  categoryOptions,
  countryOptions,
  cityOptions,
  onCategoryChange,
  onCountryChange,
  onCityChange,
  onDateChange,
  onStatusChange,
  onClearFilters,
  activeFiltersCount = 0,
  className = '',
}: ConferenceFiltersProps) {
  return (
    <aside className={`az-conference-filters ${className}`} aria-label="Conference Filters">
      <div className="az-conference-filters__header">
        <div className="az-conference-filters__title-wrap">
          <h3 className="az-conference-filters__title">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="az-conference-filters__count-badge" aria-label={`${activeFiltersCount} filters applied`}>
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            className="az-conference-filters__reset-btn"
            onClick={onClearFilters}
            aria-label="Reset all filters"
          >
            <RotateCcw size={13} aria-hidden="true" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="az-conference-filters__body">
        {/* 1. Category Filter */}
        <FilterSection title="Category" icon={<Tag size={16} />}>
          <div className="az-filter-list" role="radiogroup" aria-label="Filter by category">
            <label className={`az-filter-item ${!filters.category ? 'az-filter-item--active' : ''}`}>
              <input
                type="radio"
                name="filter-category"
                value=""
                checked={!filters.category}
                onChange={() => onCategoryChange('')}
                className="az-filter-item__radio"
              />
              <span className="az-filter-item__label">All Categories</span>
            </label>

            {categoryOptions.map((opt) => (
              <label
                key={opt.value}
                className={`az-filter-item ${
                  filters.category.toLowerCase() === opt.value.toLowerCase() ? 'az-filter-item--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter-category"
                  value={opt.value}
                  checked={filters.category.toLowerCase() === opt.value.toLowerCase()}
                  onChange={() => onCategoryChange(opt.value)}
                  className="az-filter-item__radio"
                />
                <span className="az-filter-item__label">{opt.label}</span>
                {typeof opt.count === 'number' && (
                  <span className="az-filter-item__count">({opt.count})</span>
                )}
              </label>
            ))}
          </div>
        </FilterSection>

        {/* 2. Country Filter */}
        <FilterSection title="Country" icon={<Globe size={16} />}>
          <div className="az-filter-list" role="radiogroup" aria-label="Filter by country">
            <label className={`az-filter-item ${!filters.country ? 'az-filter-item--active' : ''}`}>
              <input
                type="radio"
                name="filter-country"
                value=""
                checked={!filters.country}
                onChange={() => onCountryChange('')}
                className="az-filter-item__radio"
              />
              <span className="az-filter-item__label">All Countries</span>
            </label>

            {countryOptions.map((opt) => (
              <label
                key={opt.value}
                className={`az-filter-item ${
                  filters.country.toLowerCase() === opt.value.toLowerCase() ? 'az-filter-item--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter-country"
                  value={opt.value}
                  checked={filters.country.toLowerCase() === opt.value.toLowerCase()}
                  onChange={() => onCountryChange(opt.value)}
                  className="az-filter-item__radio"
                />
                <span className="az-filter-item__label">{opt.label}</span>
                {typeof opt.count === 'number' && (
                  <span className="az-filter-item__count">({opt.count})</span>
                )}
              </label>
            ))}
          </div>
        </FilterSection>

        {/* 3. City Filter */}
        <FilterSection title="City" icon={<MapPin size={16} />}>
          <div className="az-filter-list az-filter-list--scrollable" role="radiogroup" aria-label="Filter by city">
            <label className={`az-filter-item ${!filters.city ? 'az-filter-item--active' : ''}`}>
              <input
                type="radio"
                name="filter-city"
                value=""
                checked={!filters.city}
                onChange={() => onCityChange('')}
                className="az-filter-item__radio"
              />
              <span className="az-filter-item__label">All Cities</span>
            </label>

            {cityOptions.map((opt) => (
              <label
                key={opt.value}
                className={`az-filter-item ${
                  filters.city.toLowerCase() === opt.value.toLowerCase() ? 'az-filter-item--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter-city"
                  value={opt.value}
                  checked={filters.city.toLowerCase() === opt.value.toLowerCase()}
                  onChange={() => onCityChange(opt.value)}
                  className="az-filter-item__radio"
                />
                <span className="az-filter-item__label">{opt.label}</span>
                {typeof opt.count === 'number' && (
                  <span className="az-filter-item__count">({opt.count})</span>
                )}
              </label>
            ))}
          </div>
        </FilterSection>

        {/* 4. Date Filter */}
        <FilterSection title="Date Range" icon={<Calendar size={16} />}>
          <div className="az-filter-list" role="radiogroup" aria-label="Filter by date range">
            {DATE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`az-filter-item ${
                  filters.date === opt.value ? 'az-filter-item--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter-date"
                  value={opt.value}
                  checked={filters.date === opt.value}
                  onChange={() => onDateChange(opt.value)}
                  className="az-filter-item__radio"
                />
                <span className="az-filter-item__label">{opt.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* 5. Status Filter */}
        <FilterSection title="Registration Status" icon={<Clock size={16} />}>
          <div className="az-filter-list" role="radiogroup" aria-label="Filter by registration status">
            {STATUS_OPTIONS.map((opt) => (
              <label
                key={opt.value || 'all-status'}
                className={`az-filter-item ${
                  filters.status === opt.value ? 'az-filter-item--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter-status"
                  value={opt.value}
                  checked={filters.status === opt.value}
                  onChange={() => onStatusChange(opt.value)}
                  className="az-filter-item__radio"
                />
                <span className="az-filter-item__label">{opt.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}

export default ConferenceFilters;
