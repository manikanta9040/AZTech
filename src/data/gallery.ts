export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'Conferences' | 'Speakers' | 'Networking' | 'Workshops' | 'Awards';
  alt: string;
  description?: string;
  conferenceName?: string;
  location?: string;
  year?: string;
}

export const GALLERY_CATEGORIES = [
  'All',
  'Conferences',
  'Speakers',
  'Networking',
  'Workshops',
  'Awards',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export const mockGalleryItems: GalleryItem[] = [
  // Conferences
  {
    id: 'gal-1',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    title: 'Global AI & Deep Learning Plenary Summit',
    category: 'Conferences',
    alt: 'Grand plenary hall with hundreds of delegates listening to a keynote presentation on AI',
    description: 'Over 1,200 delegates gathered for the opening plenary session at the Grand Convention Center.',
    conferenceName: 'International Conference on Artificial Intelligence & Deep Learning',
    location: 'San Francisco, USA',
    year: '2026',
  },
  {
    id: 'gal-2',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    title: 'Executive Scientific Panel Discussion',
    category: 'Conferences',
    alt: 'Expert panel on stage engaging in an academic panel discussion with microphones',
    description: 'Distinguished panellists exploring the future of autonomous systems and ethical algorithmic frameworks.',
    conferenceName: 'World Summit on Autonomous Robotics & Cyber-Physical Systems',
    location: 'Zurich, Switzerland',
    year: '2026',
  },
  {
    id: 'gal-3',
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    title: 'Interactive Research Poster Exhibition',
    category: 'Conferences',
    alt: 'Scholars and researchers presenting academic posters in an open exhibition hall',
    description: 'Postdoctoral scholars presenting groundbreaking biomedical discoveries to international peers.',
    conferenceName: 'Global Congress on Bioengineering & Translational Medicine',
    location: 'Boston, USA',
    year: '2025',
  },
  {
    id: 'gal-4',
    src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
    title: 'Quantum Computing Technical Track',
    category: 'Conferences',
    alt: 'Auditorium with technical slides showcasing quantum computing architectures',
    description: 'Deep-dive breakout session on quantum error mitigation and superconducting qubit scaling.',
    conferenceName: 'International Conference on Quantum Information & Computing',
    location: 'London, UK',
    year: '2026',
  },

  // Speakers
  {
    id: 'gal-5',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1200&q=80',
    title: 'Keynote Address on Sustainable Energy Systems',
    category: 'Speakers',
    alt: 'Keynote speaker delivering a speech on stage with presentation screen in background',
    description: 'Dr. Elena Rostova delivering her vision for next-generation zero-emission energy grids.',
    conferenceName: 'Global Summit on Clean Energy & Sustainable Grid Technologies',
    location: 'Stockholm, Sweden',
    year: '2026',
  },
  {
    id: 'gal-6',
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    title: 'Pioneering Biomedical Keynote',
    category: 'Speakers',
    alt: 'Distinguished female professor presenting clinical research data to an international audience',
    description: 'Dr. Aris Thorne discussing precision genomics and targeted CRISPR therapies.',
    conferenceName: 'International Summit on Precision Medicine & Molecular Therapeutics',
    location: 'Singapore',
    year: '2025',
  },
  {
    id: 'gal-7',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    title: 'Future of Cloud Infrastructure Keynote',
    category: 'Speakers',
    alt: 'Tech researcher addressing a packed audience about distributed cloud architectures',
    description: 'Insightful exploration of decentralized computing, edge caching, and quantum encryption.',
    conferenceName: 'World Cloud Architecture & Distributed Systems Summit',
    location: 'Tokyo, Japan',
    year: '2026',
  },
  {
    id: 'gal-8',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    title: 'Opening Remarks by Conference Chair',
    category: 'Speakers',
    alt: 'Conference chairperson welcoming delegates at the podium',
    description: 'Opening inaugural remarks celebrating the 10th anniversary edition of AZTech summits.',
    conferenceName: 'AZTech Global Leaders Forum',
    location: 'Dubai, UAE',
    year: '2026',
  },

  // Networking
  {
    id: 'gal-9',
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    title: 'International Gala & Welcome Reception',
    category: 'Networking',
    alt: 'Conference delegates mingling and networking around high tables during an evening reception',
    description: 'Delegates from 45 countries connecting over dinner at the welcome networking banquet.',
    conferenceName: 'International Summit on Renewable Materials & Nanotechnology',
    location: 'Sydney, Australia',
    year: '2026',
  },
  {
    id: 'gal-10',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    title: 'Women in Science & Engineering Luncheon',
    category: 'Networking',
    alt: 'Group of researchers collaborating and discussing papers over coffee and lunch',
    description: 'Dedicated mentorship luncheon connecting early-career scientists with senior fellows.',
    conferenceName: 'Global Congress on Bioengineering & Translational Medicine',
    location: 'Boston, USA',
    year: '2025',
  },
  {
    id: 'gal-11',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    title: 'Cross-Discipline Research Collaboration Circle',
    category: 'Networking',
    alt: 'Academics and engineers gathered around a table engaged in lively discussion',
    description: 'Roundtable session sparking collaborative multinational EU Horizon grant proposals.',
    conferenceName: 'International Conference on Smart Cities & IoT Infrastructure',
    location: 'Berlin, Germany',
    year: '2026',
  },
  {
    id: 'gal-12',
    src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    title: 'Academic & Industry Partnering Lounge',
    category: 'Networking',
    alt: 'Spacious networking lounge with delegates exchanging business cards and discussing research',
    description: 'Bridging institutional researchers with venture partners and corporate R&D heads.',
    conferenceName: 'AZTech Technology Commercialization Expo',
    location: 'Hyderabad, India',
    year: '2026',
  },

  // Workshops
  {
    id: 'gal-13',
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
    title: 'Hands-on Generative AI Modeling Workshop',
    category: 'Workshops',
    alt: 'Participants working on laptops in a structured computer laboratory workshop',
    description: 'Masterclass on fine-tuning open-source LLMs and building agentic reasoning architectures.',
    conferenceName: 'International Conference on Artificial Intelligence & Deep Learning',
    location: 'San Francisco, USA',
    year: '2026',
  },
  {
    id: 'gal-14',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    title: 'Advanced Robotics Simulation Lab',
    category: 'Workshops',
    alt: 'Engineers testing robotic hardware and reviewing code simulations on screens',
    description: 'Interactive session simulating robotic manipulation and spatial SLAM algorithms in ROS2.',
    conferenceName: 'World Summit on Autonomous Robotics & Cyber-Physical Systems',
    location: 'Zurich, Switzerland',
    year: '2026',
  },
  {
    id: 'gal-15',
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    title: 'Academic Publishing & Peer-Review Masterclass',
    category: 'Workshops',
    alt: 'Classroom setup with a presenter teaching best practices for academic paper publishing',
    description: 'Senior journal editors sharing tips for writing high-impact scholarly manuscripts.',
    conferenceName: 'AZTech Academic Author Development Summit',
    location: 'London, UK',
    year: '2025',
  },

  // Awards
  {
    id: 'gal-16',
    src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80',
    title: 'Best Research Paper & Innovation Awards',
    category: 'Awards',
    alt: 'Stage ceremony with award recipients holding certificates and trophies under stage lighting',
    description: 'Honoring outstanding contributions to computational neuroscience and computer vision.',
    conferenceName: 'International Conference on Artificial Intelligence & Deep Learning',
    location: 'San Francisco, USA',
    year: '2026',
  },
  {
    id: 'gal-17',
    src: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=1200&q=80',
    title: 'Young Scientist & Doctoral Fellowship Recognition',
    category: 'Awards',
    alt: 'Young scholar receiving a distinguished fellowship certificate on stage from the conference committee',
    description: 'Recognizing five exceptional early-career investigators with AZTech travel and research grants.',
    conferenceName: 'Global Congress on Bioengineering & Translational Medicine',
    location: 'Boston, USA',
    year: '2025',
  },
  {
    id: 'gal-18',
    src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    title: 'Distinguished Lifetime Achievement Award',
    category: 'Awards',
    alt: 'Standing ovation and trophy presentation to veteran emeritus professor',
    description: 'Celebrating 40 years of pioneering semiconductor physics and scholarly mentorship.',
    conferenceName: 'International Summit on Nano-Electronics & Materials Science',
    location: 'Tokyo, Japan',
    year: '2026',
  },
];
