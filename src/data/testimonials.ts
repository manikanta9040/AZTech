export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  designation: string;
  organization: string;
  country: string;
  image: string;
  rating: number;
  conferenceTitle?: string;
}

export const mockTestimonials: TestimonialItem[] = [
  {
    id: 'test-001',
    quote: 'AZTech conferences provide an unmatched standard of scholarly rigor and visionary industry dialogues. The networking sessions in Hyderabad directly facilitated our multi-institution AI collaborative grant.',
    name: 'Dr. Kimberly Vance',
    designation: 'Associate Professor of Computer Science',
    organization: 'ETH Zürich',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    conferenceTitle: 'AI & Future Technology Summit',
  },
  {
    id: 'test-002',
    quote: 'The level of academic curation and logistical excellence at AZTech events is extraordinary. From abstract peer review to keynote sessions, it sets the global benchmark for professional academic summits.',
    name: 'Prof. David Chen',
    designation: 'Chair of Biomedical Engineering',
    organization: 'National University of Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    conferenceTitle: 'Global Healthcare & Biotechnology Conference',
  },
  {
    id: 'test-003',
    quote: 'Presenting our clean energy research at AZTech opened international partnerships that transformed our pilot laboratory project into a funded multi-nation green tech initiative.',
    name: 'Eng. Fatimah Al-Mansoor',
    designation: 'Lead Power Systems Researcher',
    organization: 'King Abdullah University of Science and Technology (KAUST)',
    country: 'Saudi Arabia',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    conferenceTitle: 'Sustainable Engineering & Green Tech Forum',
  },
  {
    id: 'test-004',
    quote: 'AZTech creates an inspiring cross-disciplinary ecosystem where academic researchers and industry executives truly speak the same forward-thinking language. Highly recommended for any serious researcher.',
    name: 'Dr. Arthur Pendelton',
    designation: 'Director of Strategic Innovation',
    organization: 'Cambridge Quantum Computing Consortium',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    conferenceTitle: 'International Quantum Computing Colloquium',
  },
];
