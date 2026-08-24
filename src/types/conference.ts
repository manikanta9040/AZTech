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

export interface RegistrationType {
  id: string;
  title: string;
  type: string;
  price: number;
  currency?: string;
  description?: string;
  features?: string[];
  isPopular?: boolean;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  organization: string;
  country: string;
  image?: string;
  category?: 'chair' | 'scientific' | 'organizing' | 'advisory';
}

export interface ScheduleSession {
  time: string;
  title: string;
  speaker?: string;
  speakerId?: string;
  location?: string;
  type?: 'keynote' | 'track' | 'workshop' | 'break' | 'panel' | 'poster';
  description?: string;
}

export interface ScheduleDay {
  dayNumber: number;
  title: string;
  date: string;
  sessions: ScheduleSession[];
}

export interface VenueDetails {
  name: string;
  address: string;
  city: string;
  country: string;
  postalCode?: string;
  description?: string;
  amenities?: string[];
  mapUrl?: string;
}

export interface AccommodationInfo {
  id: string;
  name: string;
  rating?: number;
  distance: string;
  pricePerNight: string;
  address: string;
  image?: string;
  websiteUrl?: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  tier: 'platinum' | 'gold' | 'silver';
  logo?: string;
  websiteUrl?: string;
}

export interface ConferenceSponsors {
  platinum?: SponsorItem[];
  gold?: SponsorItem[];
  silver?: SponsorItem[];
}

export interface ConferenceFAQItem {
  question: string;
  answer: string;
}

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
  // Detail page fields
  registrationDeadline?: string;
  abstractDeadline?: string;
  earlyRegistrationDeadline?: string;
  objectives?: string[];
  registrationTypes?: RegistrationType[];
  speakerIds?: string[];
  committee?: CommitteeMember[];
  schedule?: ScheduleDay[];
  venueDetails?: VenueDetails;
  accommodation?: AccommodationInfo[];
  sponsors?: ConferenceSponsors;
  gallery?: string[];
  faqs?: ConferenceFAQItem[];
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

