import { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { mockSpeakers } from '../../data/speakers';
import { useSpeakerFilters } from '../../hooks/useSpeakerFilters';
import { SpeakerPageHeader } from '../../components/speaker/SpeakerPageHeader';
import { SpeakerSearch } from '../../components/speaker/SpeakerSearch';
import { ActiveFilters } from '../../components/speaker/ActiveFilters';
import { SpeakerFilters } from '../../components/speaker/SpeakerFilters';
import { SpeakerSort } from '../../components/speaker/SpeakerSort';
import { SpeakerGrid } from '../../components/speaker/SpeakerGrid';
import { SpeakerPagination } from '../../components/speaker/SpeakerPagination';
import { SpeakerEmptyState } from '../../components/speaker/SpeakerEmptyState';
import { Modal } from '../../components/common/Modal';

export function Speakers() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    document.title = 'Meet Our Speakers | AZTech';
    return () => {
      document.title = 'AZTech — Global Conference Management Platform';
    };
  }, []);

  const {
    filters,
    paginatedSpeakers,
    totalCount,
    totalPages,
    currentPage,
    countryOptions,
    organizationOptions,
    expertiseOptions,
    designationOptions,
    activeFiltersCount,
    setSearch,
    setCountry,
    setOrganization,
    setExpertise,
    setDesignation,
    setSort,
    setPage,
    clearFilters,
    removeFilter,
  } = useSpeakerFilters(mockSpeakers);

  return (
    <div className="az-conferences-page az-speakers-page">
      {/* 1. Page Header with Breadcrumbs, Title & Description */}
      <SpeakerPageHeader />

      {/* 2. Search Bar & Active Filter Chips */}
      <section className="az-conference-search-section">
        <div className="az-container">
          <SpeakerSearch
            value={filters.search}
            onChange={setSearch}
            placeholder="Search speakers, organizations, expertise, country..."
          />
          <ActiveFilters
            filters={filters}
            onRemoveFilter={removeFilter}
            onClearAll={clearFilters}
          />
        </div>
      </section>

      {/* 3. Main Directory Layout */}
      <section className="az-conference-listing-section">
        <div className="az-container">
          <div className="az-conference-layout">
            {/* Desktop Filter Sidebar */}
            <div className="az-conference-layout__sidebar">
              <SpeakerFilters
                filters={filters}
                countryOptions={countryOptions}
                organizationOptions={organizationOptions}
                expertiseOptions={expertiseOptions}
                designationOptions={designationOptions}
                onCountryChange={setCountry}
                onOrganizationChange={setOrganization}
                onExpertiseChange={setExpertise}
                onDesignationChange={setDesignation}
                onClearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>

            {/* Results Main Area */}
            <main className="az-conference-layout__main" id="speaker-results-main">
              {/* Toolbar */}
              <div className="az-conference-toolbar">
                <div className="az-conference-toolbar__left">
                  <div
                    className="az-conference-results-count"
                    aria-live="polite"
                    role="status"
                  >
                    {totalCount === 0 ? (
                      <span className="az-conference-results-count__text">No speakers found</span>
                    ) : totalCount === 1 ? (
                      <span className="az-conference-results-count__text">
                        <strong>1</strong> speaker found
                      </span>
                    ) : (
                      <span className="az-conference-results-count__text">
                        <strong>{totalCount}</strong> speakers found
                      </span>
                    )}
                  </div>
                </div>

                <div className="az-conference-toolbar__right">
                  {/* Mobile Filters Trigger */}
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
                  <SpeakerSort value={filters.sort} onChange={setSort} />
                </div>
              </div>

              {/* Grid / Empty State */}
              {totalCount === 0 ? (
                <SpeakerEmptyState onClearFilters={clearFilters} />
              ) : (
                <>
                  <SpeakerGrid speakers={paginatedSpeakers} />
                  <SpeakerPagination
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

      {/* 4. Mobile Filters Modal Drawer */}
      <Modal
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Speakers"
        description="Filter speakers by domain expertise, country, organization, or role."
        size="md"
        confirmLabel="Apply Filters"
        onConfirm={() => setMobileFilterOpen(false)}
        cancelLabel="Close"
      >
        <SpeakerFilters
          filters={filters}
          countryOptions={countryOptions}
          organizationOptions={organizationOptions}
          expertiseOptions={expertiseOptions}
          designationOptions={designationOptions}
          onCountryChange={setCountry}
          onOrganizationChange={setOrganization}
          onExpertiseChange={setExpertise}
          onDesignationChange={setDesignation}
          onClearFilters={clearFilters}
          activeFiltersCount={activeFiltersCount}
        />
      </Modal>
    </div>
  );
}

export default Speakers;
