import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { mockConferences } from '../../data/conferences';
import { useConferenceFilters } from '../../hooks/useConferenceFilters';
import { ConferencePageHeader } from '../../components/conference/ConferencePageHeader';
import { ConferenceSearch } from '../../components/conference/ConferenceSearch';
import { ActiveFilters } from '../../components/conference/ActiveFilters';
import { ConferenceFilters } from '../../components/conference/ConferenceFilters';
import { ConferenceSort } from '../../components/conference/ConferenceSort';
import { ConferenceGrid } from '../../components/conference/ConferenceGrid';
import { ConferencePagination } from '../../components/conference/ConferencePagination';
import { ConferenceEmptyState } from '../../components/conference/ConferenceEmptyState';
import { Modal } from '../../components/common/Modal';

export function Conferences() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const {
    filters,
    paginatedConferences,
    totalCount,
    totalPages,
    currentPage,
    categoryOptions,
    countryOptions,
    cityOptions,
    activeFiltersCount,
    setSearch,
    setCategory,
    setCountry,
    setCity,
    setDate,
    setStatus,
    setSort,
    setPage,
    clearFilters,
    removeFilter,
  } = useConferenceFilters(mockConferences);

  return (
    <div className="az-conferences-page">
      {/* 1. Page Header with Breadcrumbs & Title */}
      <ConferencePageHeader />

      {/* 2. Search Bar & Active Filters Chips */}
      <section className="az-conference-search-section">
        <div className="az-container">
          <ConferenceSearch
            value={filters.search}
            onChange={setSearch}
            placeholder="Search conferences, topics, locations..."
          />
          <ActiveFilters
            filters={filters}
            onRemoveFilter={removeFilter}
            onClearAll={clearFilters}
          />
        </div>
      </section>

      {/* 3. Main Conference Directory Layout */}
      <section className="az-conference-listing-section">
        <div className="az-container">
          <div className="az-conference-layout">
            {/* Desktop Filter Sidebar */}
            <div className="az-conference-layout__sidebar">
              <ConferenceFilters
                filters={filters}
                categoryOptions={categoryOptions}
                countryOptions={countryOptions}
                cityOptions={cityOptions}
                onCategoryChange={setCategory}
                onCountryChange={setCountry}
                onCityChange={setCity}
                onDateChange={setDate}
                onStatusChange={setStatus}
                onClearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>

            {/* Conference Results Main Area */}
            <main className="az-conference-layout__main" id="conference-results-main">
              {/* Toolbar */}
              <div className="az-conference-toolbar">
                <div className="az-conference-toolbar__left">
                  <div
                    className="az-conference-results-count"
                    aria-live="polite"
                    role="status"
                  >
                    {totalCount === 0 ? (
                      <span className="az-conference-results-count__text">No conferences found</span>
                    ) : totalCount === 1 ? (
                      <span className="az-conference-results-count__text">
                        <strong>1</strong> conference found
                      </span>
                    ) : (
                      <span className="az-conference-results-count__text">
                        <strong>{totalCount}</strong> conferences found
                      </span>
                    )}
                  </div>
                </div>

                <div className="az-conference-toolbar__right">
                  {/* Mobile Filters Drawer Trigger */}
                  <button
                    type="button"
                    className="az-button az-button--outline az-button--sm az-mobile-filter-trigger"
                    onClick={() => setMobileFilterOpen(true)}
                    aria-label={`Open filters${activeFiltersCount > 0 ? `, ${activeFiltersCount} applied` : ''}`}
                    aria-expanded={mobileFilterOpen}
                  >
                    <SlidersHorizontal size={15} aria-hidden="true" />
                    <span>Filters</span>
                    {activeFiltersCount > 0 && (
                      <span className="az-mobile-filter-count-badge">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  {/* Sort Selector */}
                  <ConferenceSort value={filters.sort} onChange={setSort} />
                </div>
              </div>

              {/* Grid / Empty State */}
              {totalCount === 0 ? (
                <ConferenceEmptyState onClearFilters={clearFilters} />
              ) : (
                <>
                  <ConferenceGrid conferences={paginatedConferences} />
                  <ConferencePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* 4. Mobile Filters Modal / Drawer */}
      <Modal
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Conferences"
        description="Filter events by category, location, date, or registration status."
        size="md"
        confirmLabel="Apply Filters"
        onConfirm={() => setMobileFilterOpen(false)}
        cancelLabel="Close"
      >
        <ConferenceFilters
          filters={filters}
          categoryOptions={categoryOptions}
          countryOptions={countryOptions}
          cityOptions={cityOptions}
          onCategoryChange={setCategory}
          onCountryChange={setCountry}
          onCityChange={setCity}
          onDateChange={setDate}
          onStatusChange={setStatus}
          onClearFilters={clearFilters}
          activeFiltersCount={activeFiltersCount}
        />
      </Modal>
    </div>
  );
}

export default Conferences;
