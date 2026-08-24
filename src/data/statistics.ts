export interface StatisticItem {
  id: string;
  value: string;
  numericValue: number;
  label: string;
  description: string;
  iconName: 'Calendar' | 'Globe' | 'Users' | 'GraduationCap';
}

export const mockStatistics: StatisticItem[] = [
  {
    id: 'stat-conferences',
    value: '500+',
    numericValue: 500,
    label: 'Conferences Organized',
    description: 'High-impact international summits hosted across major scientific hubs.',
    iconName: 'Calendar',
  },
  {
    id: 'stat-countries',
    value: '50+',
    numericValue: 50,
    label: 'Countries Represented',
    description: 'Global reach uniting academic institutions and research consortia.',
    iconName: 'Globe',
  },
  {
    id: 'stat-participants',
    value: '10,000+',
    numericValue: 10000,
    label: 'Active Participants',
    description: 'Delegates, corporate leaders, and scholars advancing tech domains.',
    iconName: 'Users',
  },
  {
    id: 'stat-researchers',
    value: '5,000+',
    numericValue: 5000,
    label: 'Published Researchers',
    description: 'Peer-reviewed authors and distinguished keynote pioneers.',
    iconName: 'GraduationCap',
  },
];
