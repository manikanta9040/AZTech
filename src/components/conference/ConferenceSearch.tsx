import { useId } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

interface ConferenceSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ConferenceSearch({
  value,
  onChange,
  placeholder = 'Search conferences, topics, locations...',
  className = '',
}: ConferenceSearchProps) {
  const inputId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={`az-conference-search ${className}`} role="search">
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <div className="az-conference-search__input-wrapper">
        <SearchIcon className="az-conference-search__icon" size={20} aria-hidden="true" />
        <input
          id={inputId}
          type="search"
          className="az-conference-search__input"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="az-conference-search__clear-btn"
            onClick={handleClear}
            aria-label="Clear search input"
            title="Clear search"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ConferenceSearch;
