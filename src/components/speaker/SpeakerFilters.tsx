import type { ReactNode } from 'react';
import {
  Globe,
  Building,
  Sparkles,
  Briefcase,
  RotateCcw,
} from 'lucide-react';
import type {
  SpeakerFilterState,
  SpeakerFilterOption,
} from '../../types/speaker';

interface SpeakerFiltersProps {
  filters: SpeakerFilterState;
  countryOptions: SpeakerFilterOption[];
  organizationOptions: SpeakerFilterOption[];
  expertiseOptions: SpeakerFilterOption[];
  designationOptions: SpeakerFilterOption[];
  onCountryChange: (country: string) => void;
  onOrganizationChange: (organization: string) => void;
  onExpertiseChange: (expertise: string) => void;
  onDesignationChange: (designation: string) => void;
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

export function SpeakerFilters({
  filters,
  countryOptions,
  organizationOptions,
  expertiseOptions,
  designationOptions,
  onCountryChange,
  onOrganizationChange,
  onExpertiseChange,
  onDesignationChange,
  onClearFilters,
  activeFiltersCount = 0,
  className = '',
}: SpeakerFiltersProps) {
  return (
    <aside className={`az-conference-filters ${className}`} aria-label="Speaker Filters">
      <div className="az-conference-filters__header">
        <div className="az-conference-filters__title-wrap">
          <h3 className="az-conference-filters__title">Filters</h3>
          {activeFiltersCount > 0 && (
            <span
              className="az-conference-filters__count-badge"
              aria-label={`${activeFiltersCount} filters applied`}
            >
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
        {/* 1. Expertise Filter */}
        <FilterSection title="Expertise" icon={<Sparkles size={16} />}>
          <div className="az-filter-list az-filter-list--scrollable" role="radiogroup" aria-label="Filter by expertise">
            <label className={`az-filter-item ${!filters.expertise ? 'az-filter-item--active' : ''}`}>
              <input
                type="radio"
                name="filter-expertise"
                value=""
                checked={!filters.expertise}
                onChange={() => onExpertiseChange('')}
                className="az-filter-item__radio"
              />
              <span className="az-filter-item__label">All Domains</span>
            </label>

            {expertiseOptions.map((opt) => (
              <label
                key={opt.value}
                className={`az-filter-item ${
                  filters.expertise.toLowerCase() === opt.value.toLowerCase() ? 'az-filter-item--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter-expertise"
                  value={opt.value}
                  checked={filters.expertise.toLowerCase() === opt.value.toLowerCase()}
                  onChange={() => onExpertiseChange(opt.value)}
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
          <div className="az-filter-list az-filter-list--scrollable" role="radiogroup" aria-label="Filter by country">
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

        {/* 3. Organization Filter */}
        <FilterSection title="Organization" icon={<Building size={16} />}>
          <div className="az-filter-list az-filter-list--scrollable" role="radiogroup" aria-label="Filter by organization">
            <label className={`az-filter-item ${!filters.organization ? 'az-filter-item--active' : ''}`}>
              <input
                type="radio"
                name="filter-organization"
                value=""
                checked={!filters.organization}
                onChange={() => onOrganizationChange('')}
                className="az-filter-item__radio"
              />
              <span className="az-filter-item__label">All Organizations</span>
            </label>

            {organizationOptions.map((opt) => (
              <label
                key={opt.value}
                className={`az-filter-item ${
                  filters.organization.toLowerCase() === opt.value.toLowerCase() ? 'az-filter-item--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter-organization"
                  value={opt.value}
                  checked={filters.organization.toLowerCase() === opt.value.toLowerCase()}
                  onChange={() => onOrganizationChange(opt.value)}
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

        {/* 4. Designation Filter */}
        <FilterSection title="Designation" icon={<Briefcase size={16} />}>
          <div className="az-filter-list az-filter-list--scrollable" role="radiogroup" aria-label="Filter by designation">
            <label className={`az-filter-item ${!filters.designation ? 'az-filter-item--active' : ''}`}>
              <input
                type="radio"
                name="filter-designation"
                value=""
                checked={!filters.designation}
                onChange={() => onDesignationChange('')}
                className="az-filter-item__radio"
              />
              <span className="az-filter-item__label">All Roles</span>
            </label>

            {designationOptions.map((opt) => (
              <label
                key={opt.value}
                className={`az-filter-item ${
                  filters.designation.toLowerCase() === opt.value.toLowerCase() ? 'az-filter-item--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter-designation"
                  value={opt.value}
                  checked={filters.designation.toLowerCase() === opt.value.toLowerCase()}
                  onChange={() => onDesignationChange(opt.value)}
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
      </div>
    </aside>
  );
}

export default SpeakerFilters;
