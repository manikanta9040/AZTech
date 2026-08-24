export interface Speaker {
  id: string;
  name: string;
  title?: string;
  designation: string;
  organization: string;
  country: string;
  image?: string;
  biography?: string;
  bio?: string;
  topic?: string;
  featured?: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
    github?: string;
  };
}
