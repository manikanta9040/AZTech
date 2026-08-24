export type ConferenceStatus = 'upcoming' | 'ongoing' | 'completed' | 'registration_open' | 'call_for_papers';

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
  status: ConferenceStatus | string;
  attendeesCount?: number;
  speakersCount?: number;
  topics?: string[];
  price?: number;
}
