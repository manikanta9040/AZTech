export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  iconName: 'Cpu' | 'Bot' | 'HeartPulse' | 'Cog' | 'Atom' | 'Briefcase' | 'GraduationCap' | 'BarChart3';
  conferenceCount: number;
  description: string;
}

export const mockCategories: CategoryItem[] = [
  {
    id: 'cat-tech',
    name: 'Technology',
    slug: 'technology',
    iconName: 'Cpu',
    conferenceCount: 42,
    description: 'Emerging tech, distributed systems, cloud computing, cybersecurity & software architecture.',
  },
  {
    id: 'cat-ai',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    iconName: 'Bot',
    conferenceCount: 38,
    description: 'Machine learning, neural networks, computer vision, NLP & generative intelligent models.',
  },
  {
    id: 'cat-health',
    name: 'Healthcare',
    slug: 'healthcare',
    iconName: 'HeartPulse',
    conferenceCount: 29,
    description: 'Clinical discoveries, digital health, bio-engineering, immunology & medical therapeutics.',
  },
  {
    id: 'cat-eng',
    name: 'Engineering',
    slug: 'engineering',
    iconName: 'Cog',
    conferenceCount: 31,
    description: 'Robotics, civil infrastructure, green energy, materials science & aerospace engineering.',
  },
  {
    id: 'cat-sci',
    name: 'Science',
    slug: 'science',
    iconName: 'Atom',
    conferenceCount: 25,
    description: 'Physics, chemistry, astronomy, quantum research & foundational environmental science.',
  },
  {
    id: 'cat-biz',
    name: 'Business',
    slug: 'business',
    iconName: 'Briefcase',
    conferenceCount: 27,
    description: 'Global economics, venture capital, fintech, market disruption & digital strategy.',
  },
  {
    id: 'cat-edu',
    name: 'Education',
    slug: 'education',
    iconName: 'GraduationCap',
    conferenceCount: 19,
    description: 'EdTech platforms, instructional design, academic governance & global learning initiatives.',
  },
  {
    id: 'cat-mgmt',
    name: 'Management',
    slug: 'management',
    iconName: 'BarChart3',
    conferenceCount: 22,
    description: 'Agile leadership, corporate strategy, human capital innovation & operational excellence.',
  },
];
