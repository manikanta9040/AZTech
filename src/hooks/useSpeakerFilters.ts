import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type {
  Speaker,
  SpeakerFilterState,
  SpeakerFilterOption,
  SpeakerSortOption,
} from '../types/speaker';

export const SPEAKERS_PER_PAGE = 12;

export const SPEAKER_SORT_OPTIONS: { label: string; value: SpeakerSortOption }[] = [
  { label: 'Name: A-Z', value: 'name_asc' },
  { label: 'Name: Z-A', value: 'name_desc' },
  { label: 'Organization: A-Z', value: 'org_asc' },
  { label: 'Organization: Z-A', value: 'org_desc' },
];

function normalizeCountry(country: string): string {
  const lower = country.toLowerCase().trim();
  if (lower === 'united states' || lower === 'usa' || lower === 'us') return 'usa';
  if (lower === 'united kingdom' || lower === 'uk' || lower === 'great britain') return 'uk';
  if (lower === 'united arab emirates' || lower === 'uae') return 'uae';
  return lower;
}

export function useSpeakerFilters(speakers: Speaker[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Read state from URL search params
  const filters: SpeakerFilterState = useMemo(() => {
    const search = searchParams.get('search') || '';
    const country = searchParams.get('country') || '';
    const organization = searchParams.get('organization') || '';
    const expertise = searchParams.get('expertise') || '';
    const designation = searchParams.get('designation') || '';
    const sortParam = (searchParams.get('sort') || 'name_asc') as SpeakerSortOption;
    const sort: SpeakerSortOption = [
      'name_asc',
      'name_desc',
      'org_asc',
      'org_desc',
    ].includes(sortParam)
      ? sortParam
      : 'name_asc';
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

    return {
      search,
      country,
      organization,
      expertise,
      designation,
      sort,
      page,
    };
  }, [searchParams]);

  // 2. Helper to sync with URL parameters
  const updateSearchParams = useCallback(
    (newParams: Partial<Record<keyof SpeakerFilterState, string | number | undefined>>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(newParams).forEach(([key, value]) => {
            if (
              value === undefined ||
              value === '' ||
              (key === 'page' && value === 1) ||
              (key === 'sort' && value === 'name_asc')
            ) {
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

  const setCountry = useCallback(
    (country: string) => {
      updateSearchParams({ country, page: 1 });
    },
    [updateSearchParams]
  );

  const setOrganization = useCallback(
    (organization: string) => {
      updateSearchParams({ organization, page: 1 });
    },
    [updateSearchParams]
  );

  const setExpertise = useCallback(
    (expertise: string) => {
      updateSearchParams({ expertise, page: 1 });
    },
    [updateSearchParams]
  );

  const setDesignation = useCallback(
    (designation: string) => {
      updateSearchParams({ designation, page: 1 });
    },
    [updateSearchParams]
  );

  const setSort = useCallback(
    (sort: SpeakerSortOption) => {
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
    (key: keyof SpeakerFilterState) => {
      updateSearchParams({ [key]: undefined, page: 1 });
    },
    [updateSearchParams]
  );

  // 3. Filtered speakers matching search and filters
  const filteredSpeakers = useMemo(() => {
    return speakers.filter((speaker) => {
      // Search matching across Name, Designation, Organization, Country, Expertise
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const searchCorpus = [
          speaker.name,
          speaker.designation,
          speaker.organization,
          speaker.country,
          speaker.city || '',
          speaker.shortBio || '',
          speaker.biography || '',
          ...(speaker.expertise || []),
          ...(speaker.topics || []),
        ]
          .join(' ')
          .toLowerCase();

        // Support search for "AI" or acronyms
        if (query === 'ai' || query === 'a.i.') {
          const isAI =
            speaker.expertise.some((e) => e.toLowerCase().includes('ai') || e.toLowerCase().includes('artificial intelligence')) ||
            speaker.designation.toLowerCase().includes('ai') ||
            speaker.designation.toLowerCase().includes('artificial intelligence') ||
            searchCorpus.includes('artificial intelligence') ||
            searchCorpus.includes(' ai ') ||
            searchCorpus.startsWith('ai ') ||
            searchCorpus.endsWith(' ai');
          if (!isAI) return false;
        } else if (!searchCorpus.includes(query)) {
          return false;
        }
      }

      // Country filter
      if (filters.country && filters.country !== 'all') {
        const speakerCountryNorm = normalizeCountry(speaker.country);
        const filterCountryNorm = normalizeCountry(filters.country);
        if (speakerCountryNorm !== filterCountryNorm) {
          return false;
        }
      }

      // Organization filter
      if (filters.organization && filters.organization !== 'all') {
        if (speaker.organization.toLowerCase() !== filters.organization.toLowerCase()) {
          return false;
        }
      }

      // Expertise filter
      if (filters.expertise && filters.expertise !== 'all') {
        const hasExpertise = speaker.expertise.some(
          (exp) => exp.toLowerCase() === filters.expertise.toLowerCase()
        );
        if (!hasExpertise) {
          return false;
        }
      }

      // Designation filter
      if (filters.designation && filters.designation !== 'all') {
        if (speaker.designation.toLowerCase() !== filters.designation.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [speakers, filters]);

  // 4. Sorted speakers (pure, non-mutating)
  const sortedSpeakers = useMemo(() => {
    const copy = [...filteredSpeakers];
    switch (filters.sort) {
      case 'name_asc':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return copy.sort((a, b) => b.name.localeCompare(a.name));
      case 'org_asc':
        return copy.sort((a, b) => a.organization.localeCompare(b.organization));
      case 'org_desc':
        return copy.sort((a, b) => b.organization.localeCompare(a.organization));
      default:
        return copy;
    }
  }, [filteredSpeakers, filters.sort]);

  // 5. Pagination
  const totalCount = sortedSpeakers.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / SPEAKERS_PER_PAGE));
  const currentPage = Math.min(filters.page, totalPages);

  const paginatedSpeakers = useMemo(() => {
    const startIndex = (currentPage - 1) * SPEAKERS_PER_PAGE;
    return sortedSpeakers.slice(startIndex, startIndex + SPEAKERS_PER_PAGE);
  }, [sortedSpeakers, currentPage]);

  // 6. Dynamic filter options computed from speaker data
  const countryOptions: SpeakerFilterOption[] = useMemo(() => {
    const countryMap = new Map<string, { label: string; count: number }>();
    speakers.forEach((s) => {
      const existing = countryMap.get(s.country);
      if (existing) {
        existing.count++;
      } else {
        countryMap.set(s.country, { label: s.country, count: 1 });
      }
    });

    return Array.from(countryMap.entries())
      .map(([value, { label, count }]) => ({ label, value, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [speakers]);

  const organizationOptions: SpeakerFilterOption[] = useMemo(() => {
    const orgMap = new Map<string, { label: string; count: number }>();
    speakers.forEach((s) => {
      const existing = orgMap.get(s.organization);
      if (existing) {
        existing.count++;
      } else {
        orgMap.set(s.organization, { label: s.organization, count: 1 });
      }
    });

    return Array.from(orgMap.entries())
      .map(([value, { label, count }]) => ({ label, value, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [speakers]);

  const expertiseOptions: SpeakerFilterOption[] = useMemo(() => {
    const expMap = new Map<string, number>();
    speakers.forEach((s) => {
      s.expertise.forEach((exp) => {
        expMap.set(exp, (expMap.get(exp) || 0) + 1);
      });
    });

    return Array.from(expMap.entries())
      .map(([value, count]) => ({ label: value, value, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [speakers]);

  const designationOptions: SpeakerFilterOption[] = useMemo(() => {
    const desMap = new Map<string, number>();
    speakers.forEach((s) => {
      desMap.set(s.designation, (desMap.get(s.designation) || 0) + 1);
    });

    return Array.from(desMap.entries())
      .map(([value, count]) => ({ label: value, value, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [speakers]);

  // 7. Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.country && filters.country !== 'all') count++;
    if (filters.organization && filters.organization !== 'all') count++;
    if (filters.expertise && filters.expertise !== 'all') count++;
    if (filters.designation && filters.designation !== 'all') count++;
    return count;
  }, [filters]);

  return {
    filters: { ...filters, page: currentPage },
    filteredSpeakers: sortedSpeakers,
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
  };
}

export default useSpeakerFilters;
