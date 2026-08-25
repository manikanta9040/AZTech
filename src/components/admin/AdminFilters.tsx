import { Filter, RotateCcw } from 'lucide-react'
import { Button } from '../common/Button'

export interface FilterSelectOption {
  label: string
  value: string
}

export interface FilterConfig {
  key: string
  label: string
  value: string
  options: FilterSelectOption[]
  onChange: (val: string) => void
}

interface AdminFiltersProps {
  filters: FilterConfig[]
  onReset?: () => void
  isFiltered?: boolean
  className?: string
}

export function AdminFilters({ filters, onReset, isFiltered, className = '' }: AdminFiltersProps) {
  return (
    <div className={`az-admin-filters ${className}`}>
      <div className="az-admin-filters__group">
        <div className="az-admin-filters__icon-label">
          <Filter size={15} aria-hidden="true" />
          <span className="sr-only">Filter by:</span>
        </div>
        {filters.map((f) => (
          <div key={f.key} className="az-admin-filter-item">
            <label htmlFor={`filter-${f.key}`} className="sr-only">
              {f.label}
            </label>
            <select
              id={`filter-${f.key}`}
              className="az-admin-filter-select"
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              aria-label={f.label}
            >
              {f.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {isFiltered && onReset && (
        <Button
          variant="ghost"
          size="sm"
          className="az-admin-filter-reset"
          onClick={onReset}
          aria-label="Reset all filters"
        >
          <RotateCcw size={13} />
          Reset
        </Button>
      )}
    </div>
  )
}
