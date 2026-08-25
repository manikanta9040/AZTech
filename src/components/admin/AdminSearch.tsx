import { Search as SearchIcon, X } from 'lucide-react'

interface AdminSearchProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  ariaLabel?: string
  className?: string
}

export function AdminSearch({
  value,
  onChange,
  placeholder = 'Search records...',
  ariaLabel,
  className = '',
}: AdminSearchProps) {
  return (
    <div className={`az-admin-search ${className}`}>
      <SearchIcon size={16} className="az-admin-search__icon" aria-hidden="true" />
      <input
        type="search"
        className="az-admin-search__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel || placeholder}
      />
      {value && (
        <button
          type="button"
          className="az-admin-search__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
