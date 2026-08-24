import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type {
  Conference,
  ConferenceFilterState,
  DateFilterOption,
  FilterOption,
  SortOption,
} from '../types/conference';

export const ITEMS_PER_PAGE = 9;

export const CATEGORIES_LIST = [
  'Technology',
  'Artificial Intelligence',
  'Healthcare',
  'Engineering',
  'Science',
  'Business',
  'Education',
  'Management',
];

export const COUNTRIES_LIST = [
  'India',
  'USA',
  'UK',
  'Germany',
  'Singapore',
  'UAE',
  'Australia',
];

export const CITIES_LIST = [
  'Hyderabad',
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Dubai',
  'Singapore',
  'London',
  'Boston',
  'Munich',
  'Sydney',
  'Melbourne',
  'San Francisco',
];

export const DATE_OPTIONS: { label: string; value: DateFilterOption }[] = [
  { label: 'All Dates', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Next Month', value: 'next_month' },
];

export const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: 'All Statuses', value: '' },
  { label: 'Open for Registration', value: 'registration_open' },
  { label: 'Registration Closing Soon', value: 'closing_soon' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Call for Papers', value: 'call_for_papers' },
];

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Date: Earliest', value: 'date_asc' },
  { label: 'Date: Latest', value: 'date_desc' },
  { label: 'Name: A-Z', value: 'name_asc' },
  { label: 'Name: Z-A', value: 'name_desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
];

// Helper to normalize country names
function normalizeCountry(country: string): string {
  const lower = country.toLowerCase().trim();
  if (lower === 'united states' || lower === 'usa' || lower === 'us') return 'usa';
  if (lower === 'united kingdom' || lower === 'uk' || lower === 'great britain') return 'uk';
  if (lower === 'united arab emirates' || lower === 'uae') return 'uae';
  return lower;
}

export function useConferenceFilters(conferences: Conference[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read filter state directly from searchParams
  const filters: ConferenceFilterState = useMemo(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const country = searchParams.get('country') || '';
    const city = searchParams.get('city') || '';
    const dateParam = (searchParams.get('date') || 'all') as DateFilterOption;
    const date: DateFilterOption = ['all', 'upcoming', 'this_month', 'next_month'].includes(dateParam)
      ? dateParam
      : 'all';
    const status = searchParams.get('status') || '';
    const sortParam = (searchParams.get('sort') || 'date_asc') as SortOption;
    const sort: SortOption = [
      'date_asc',
      'date_desc',
      'name_asc',
      'name_desc',
      'newest',
      'oldest',
    ].includes(sortParam)
      ? sortParam
      : 'date_asc';
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

    return {
      search,
      category,
      country,
      city,
      date,
      status,
      sort,
      page,
    };
  }, [searchParams]);

  // Update search params helper
  const updateSearchParams = useCallback(
    (newParams: Partial<Record<keyof ConferenceFilterState, string | number | undefined>>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(newParams).forEach(([key, value]) => {
            if (value === undefined || value === '' || (key === 'date' && value === 'all') || (key === 'page' && value === 1) || (key === 'sort' && value === 'date_asc')) {
              next.delete(key);
            } else {
              next.set(key, String(value));
            }
          });
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // Setters that reset page to 1
  const setSearch = useCallback(
    (search: string) => {
      updateSearchParams({ search, page: 1 });
    },
    [updateSearchParams]
  );

  const setCategory = useCallback(
    (category: string) => {
      updateSearchParams({ category, page: 1 });
    },
    [updateSearchParams]
  );

  const setCountry = useCallback(
    (country: string) => {
      updateSearchParams({ country, page: 1 });
    },
    [updateSearchParams]
  );

  const setCity = useCallback(
    (city: string) => {
      updateSearchParams({ city, page: 1 });
    },
    [updateSearchParams]
  );

  const setDate = useCallback(
    (date: DateFilterOption) => {
      updateSearchParams({ date, page: 1 });
    },
    [updateSearchParams]
  );

  const setStatus = useCallback(
    (status: string) => {
      updateSearchParams({ status, page: 1 });
    },
    [updateSearchParams]
  );

  const setSort = useCallback(
    (sort: SortOption) => {
      updateSearchParams({ sort });
    },
    [updateSearchParams]
  );

  const setPage = useCallback(
    (page: number) => {
      updateSearchParams({ page });
    },
    [updateSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  const removeFilter = useCallback(
    (key: keyof ConferenceFilterState) => {
      updateSearchParams({ [key]: undefined, page: 1 });
    },
    [updateSearchParams]
  );

  // Dynamic filter matching logic
  const filteredConferences = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const nextMonthIndex = (currentMonth + 1) % 12;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    return conferences.filter((conf) => {
      // 1. Search Query
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const searchTerms = [
          conf.title,
          conf.description,
          conf.shortDescription || '',
          conf.category,
          conf.city,
          conf.country,
          conf.location || '',
          conf.venue || '',
          ...(conf.topics || []),
        ]
          .join(' ')
          .toLowerCase();

        // Special handling for common abbreviations like "AI"
        if (query === 'ai' || query === 'a.i.') {
          const isAI =
            conf.category.toLowerCase().includes('artificial intelligence') ||
            conf.category.toLowerCase().includes('ai') ||
            conf.title.toLowerCase().includes('ai') ||
            searchTerms.includes('artificial intelligence') ||
            searchTerms.includes(' ai ') ||
            searchTerms.startsWith('ai ') ||
            searchTerms.endsWith(' ai');
          if (!isAI) return false;
        } else if (!searchTerms.includes(query)) {
          return false;
        }
      }

      // 2. Category Filter
      if (filters.category && filters.category !== 'all') {
        if (conf.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // 3. Country Filter
      if (filters.country && filters.country !== 'all') {
        const confCountryNorm = normalizeCountry(conf.country);
        const filterCountryNorm = normalizeCountry(filters.country);
        if (confCountryNorm !== filterCountryNorm) {
          return false;
        }
      }

      // 4. City Filter
      if (filters.city && filters.city !== 'all') {
        if (conf.city.toLowerCase() !== filters.city.toLowerCase()) {
          return false;
        }
      }

      // 5. Date Filter
      if (filters.date !== 'all') {
        const confStart = new Date(conf.startDate);
        const confEnd = new Date(conf.endDate);

        if (filters.date === 'upcoming') {
          // Future or ongoing
          if (confEnd < today && confStart < today) {
            return false;
          }
        } else if (filters.date === 'this_month') {
          const startsThisMonth =
            confStart.getFullYear() === currentYear && confStart.getMonth() === currentMonth;
          const endsThisMonth =
            confEnd.getFullYear() === currentYear && confEnd.getMonth() === currentMonth;
          if (!startsThisMonth && !endsThisMonth) {
            return false;
          }
        } else if (filters.date === 'next_month') {
          const startsNextMonth =
            confStart.getFullYear() === nextMonthYear && confStart.getMonth() === nextMonthIndex;
          const endsNextMonth =
            confEnd.getFullYear() === nextMonthYear && confEnd.getMonth() === nextMonthIndex;
          if (!startsNextMonth && !endsNextMonth) {
            return false;
          }
        }
      }

      // 6. Status Filter
      if (filters.status && filters.status !== 'all') {
        const statusNorm = filters.status.toLowerCase().replace('-', '_');
        const confStatusNorm = conf.status.toLowerCase().replace('-', '_');

        if (statusNorm === 'registration_open' || statusNorm === 'open') {
          if (confStatusNorm !== 'registration_open' && confStatusNorm !== 'open') {
            return false;
          }
        } else if (statusNorm === 'closing_soon') {
          if (confStatusNorm !== 'closing_soon') {
            return false;
          }
        } else if (confStatusNorm !== statusNorm) {
          return false;
        }
      }

      return true;
    });
  }, [conferences, filters]);

  // Sorted conferences (creates new array copy)
  const sortedConferences = useMemo(() => {
    const copy = [...filteredConferences];
    switch (filters.sort) {
      case 'date_asc':
        return copy.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      case 'date_desc':
        return copy.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      case 'name_asc':
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      case 'name_desc':
        return copy.sort((a, b) => b.title.localeCompare(a.title));
      case 'newest':
        return copy.sort((a, b) => b.id.localeCompare(a.id));
      case 'oldest':
        return copy.sort((a, b) => a.id.localeCompare(b.id));
      default:
        return copy;
    }
  }, [filteredConferences, filters.sort]);

  // Pagination calculation
  const totalCount = sortedConferences.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const currentPage = Math.min(filters.page, totalPages);

  const paginatedConferences = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedConferences.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedConferences, currentPage]);

  // Calculate dynamic counts for filter categories, countries, cities
  const categoryOptions: FilterOption[] = useMemo(() => {
    return CATEGORIES_LIST.map((cat) => ({
      label: cat,
      value: cat,
      count: conferences.filter((c) => c.category.toLowerCase() === cat.toLowerCase()).length,
    }));
  }, [conferences]);

  const countryOptions: FilterOption[] = useMemo(() => {
    return COUNTRIES_LIST.map((country) => ({
      label: country,
      value: country,
      count: conferences.filter(
        (c) => normalizeCountry(c.country) === normalizeCountry(country)
      ).length,
    }));
  }, [conferences]);

  const cityOptions: FilterOption[] = useMemo(() => {
    return CITIES_LIST.map((city) => ({
      label: city,
      value: city,
      count: conferences.filter((c) => c.city.toLowerCase() === city.toLowerCase()).length,
    }));
  }, [conferences]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.country && filters.country !== 'all') count++;
    if (filters.city && filters.city !== 'all') count++;
    if (filters.date && filters.date !== 'all') count++;
    if (filters.status && filters.status !== 'all') count++;
    return count;
  }, [filters]);

  return {
    filters: { ...filters, page: currentPage },
    filteredConferences: sortedConferences,
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
  };
}
