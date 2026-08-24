export type ConferenceStatus =
  | 'registration_open'
  | 'open'
  | 'closing_soon'
  | 'closing-soon'
  | 'upcoming'
  | 'ongoing'
  | 'completed'
  | 'call_for_papers'
  | 'closed';

export interface Conference {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  shortDescription?: string;
  startDate: string;
  endDate: string;
  city: string;
  country: string;
  location?: string;
  venue?: string;
  image?: string;
  featured?: boolean;
  status: ConferenceStatus;
  attendeesCount?: number;
  speakersCount?: number;
  topics?: string[];
  price?: number;
}

export type SortOption =
  | 'date_asc'
  | 'date_desc'
  | 'name_asc'
  | 'name_desc'
  | 'newest'
  | 'oldest';

export type DateFilterOption =
  | 'all'
  | 'upcoming'
  | 'this_month'
  | 'next_month';

export interface ConferenceFilterState {
  search: string;
  category: string;
  country: string;
  city: string;
  date: DateFilterOption;
  status: string;
  sort: SortOption;
  page: number;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

