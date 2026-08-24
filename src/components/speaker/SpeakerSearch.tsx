import { Search as SearchIcon, X } from 'lucide-react';

interface SpeakerSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SpeakerSearch({
  value,
  onChange,
  placeholder = 'Search speakers, organizations, expertise, country...',
  className = '',
}: SpeakerSearchProps) {
  return (
    <div className={`az-speaker-search-wrapper ${className}`}>
      <label htmlFor="speaker-search-input" className="sr-only">
        Search speakers by name, organization, expertise, or country
      </label>
      <div className="az-speaker-search">
        <SearchIcon
          className="az-speaker-search__icon"
          size={20}
          aria-hidden="true"
        />
        <input
          id="speaker-search-input"
          type="search"
          className="az-speaker-search__input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search speakers directory"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="az-speaker-search__clear"
            onClick={() => onChange('')}
            aria-label="Clear search input"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SpeakerSearch;
