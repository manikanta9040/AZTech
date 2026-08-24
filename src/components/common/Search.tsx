import { Search as SearchIcon, X } from 'lucide-react'
interface SearchProps { value: string; onChange: (value: string) => void; placeholder?: string; loading?: boolean; className?: string }
export function Search({ value, onChange, placeholder = 'Search', loading = false, className = '' }: SearchProps) { return <div className={`az-search ${className}`}><SearchIcon size={18} aria-hidden="true" /><input type="search" className="az-input" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label={placeholder} />{value && <button type="button" className="az-search__clear" onClick={() => onChange('')} aria-label="Clear search"><X size={16} /></button>}{loading && <span className="sr-only">Loading search results</span>}</div> }
export default Search
