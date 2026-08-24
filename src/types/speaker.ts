export interface SpeakerExperienceItem {
  year?: string;
  title: string;
  organization: string;
  description?: string;
}

export interface SpeakerSessionItem {
  id?: string;
  title: string;
  conferenceTitle?: string;
  conferenceSlug?: string;
  conferenceId?: string;
  date?: string;
  time?: string;
  type?: 'keynote' | 'track' | 'workshop' | 'panel' | 'poster' | string;
  location?: string;
  description?: string;
}

export interface SpeakerExperience {
  education?: SpeakerExperienceItem[];
  work?: SpeakerExperienceItem[];
  research?: string[];
  awards?: string[];
}

export interface Speaker {
  id: string;
  slug: string;
  name: string;
  title?: string;
  designation: string;
  organization: string;
  country: string;
  city?: string;
  image: string;
  shortBio: string;
  biography: string;
  bio?: string;
  topic?: string;
  expertise: string[];
  conferenceIds?: string[];
  sessionIds?: string[];
  sessions?: SpeakerSessionItem[];
  experience?: SpeakerExperience;
  topics?: string[];
  featured?: boolean;
  socialLinks?: {
    linkedin?: string;
    website?: string;
    twitter?: string;
    github?: string;
  };
}

export type SpeakerSortOption =
  | 'name_asc'
  | 'name_desc'
  | 'org_asc'
  | 'org_desc';

export interface SpeakerFilterState {
  search: string;
  country: string;
  organization: string;
  expertise: string;
  designation: string;
  sort: SpeakerSortOption;
  page: number;
}

export interface SpeakerFilterOption {
  label: string;
  value: string;
  count?: number;
}

