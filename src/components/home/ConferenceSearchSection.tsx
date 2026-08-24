import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Tag, Calendar, X } from 'lucide-react';
import { mockCategories } from '../../data/categories';
import { mockConferences } from '../../data/conferences';

// Extract unique countries from mock data
const availableCountries = Array.from(new Set(mockConferences.map((c) => c.country))).sort();

export function ConferenceSearchSection() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (category) params.set('category', category);
    if (country) params.set('country', country);
    if (dateFilter) params.set('date', dateFilter);

    navigate({
      pathname: '/conferences',
      search: params.toString() ? `?${params.toString()}` : '',
    });
  };

  const handleClear = () => {
    setKeyword('');
    setCategory('');
    setCountry('');
    setDateFilter('');
  };

  const hasFilters = keyword || category || country || dateFilter;

  return (
    <section className="az-search-section" aria-labelledby="search-section-heading">
      <div className="az-container">
        <div className="az-search-card">
          <div className="az-search-card__header">
            <h2 id="search-section-heading" className="az-h2" style={{ marginBottom: 'var(--az-space-2)' }}>
              Find Your Next Conference
            </h2>
            <p className="az-body" style={{ color: 'var(--az-muted)', margin: 0 }}>
              Explore upcoming conferences and discover opportunities to learn, connect and collaborate.
            </p>
          </div>

          <form onSubmit={handleSearch} className="az-search-card__form" role="search">
            <div className="az-search-grid">
              {/* Keyword Field */}
              <div className="az-field az-search-field">
                <label htmlFor="search-keyword" className="az-label">
                  Search Conference
                </label>
                <div className="az-input-with-icon">
                  <Search size={18} className="az-input-icon" aria-hidden="true" />
                  <input
                    id="search-keyword"
                    type="text"
                    className="az-input az-input--has-icon"
                    placeholder="e.g. AI, Healthcare, Quantum..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  {keyword && (
                    <button
                      type="button"
                      className="az-search-clear-btn"
                      onClick={() => setKeyword('')}
                      aria-label="Clear keyword"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Field */}
              <div className="az-field az-search-field">
                <label htmlFor="search-category" className="az-label">
                  Category
                </label>
                <div className="az-input-with-icon">
                  <Tag size={18} className="az-input-icon" aria-hidden="true" />
                  <select
                    id="search-category"
                    className="az-select az-input--has-icon"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {mockCategories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Country Field */}
              <div className="az-field az-search-field">
                <label htmlFor="search-country" className="az-label">
                  Country
                </label>
                <div className="az-input-with-icon">
                  <MapPin size={18} className="az-input-icon" aria-hidden="true" />
                  <select
                    id="search-country"
                    className="az-select az-input--has-icon"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">All Countries</option>
                    {availableCountries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Filter Field */}
              <div className="az-field az-search-field">
                <label htmlFor="search-date" className="az-label">
                  Date
                </label>
                <div className="az-input-with-icon">
                  <Calendar size={18} className="az-input-icon" aria-hidden="true" />
                  <select
                    id="search-date"
                    className="az-select az-input--has-icon"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="">Any Date</option>
                    <option value="2027-q1">Q1 2027 (Jan – Mar)</option>
                    <option value="2027-q2">Q2 2027 (Apr – Jun)</option>
                    <option value="2027-q3">Q3 2027 (Jul – Sep)</option>
                    <option value="2027-q4">Q4 2027 (Oct – Dec)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="az-search-actions">
              {hasFilters && (
                <button
                  type="button"
                  className="az-button az-button--ghost"
                  onClick={handleClear}
                >
                  Reset
                </button>
              )}
              <button
                type="submit"
                className="az-button az-button--primary az-button--lg az-search-submit-btn"
              >
                <Search size={18} aria-hidden="true" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ConferenceSearchSection;
