import { Globe, Users, Mic2, BookOpenCheck, Briefcase, Sparkles, type LucideIcon } from 'lucide-react';
import { Badge } from '../common/Badge';

interface WhatWeDoItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const whatWeDoList: WhatWeDoItem[] = [
  {
    id: 'do-global-conf',
    icon: Globe,
    title: 'Global Conferences',
    description: 'Organizing international academic summits across 50+ key technological and scientific hubs worldwide with hybrid access.',
  },
  {
    id: 'do-research-net',
    icon: Users,
    title: 'Research Networking',
    description: 'Connecting principal investigators, doctoral candidates, and research consortia to spark collaborative international research grants.',
  },
  {
    id: 'do-expert-sess',
    icon: Mic2,
    title: 'Expert Sessions',
    description: 'Curating visionary plenary keynotes, technical tracks, and specialized panel debates led by globally renowned authorities.',
  },
  {
    id: 'do-knowledge-ex',
    icon: BookOpenCheck,
    title: 'Knowledge Exchange',
    description: 'Publishing peer-reviewed conference proceedings with unique DOI indexing and broad digital open-access dissemination.',
  },
  {
    id: 'do-industry-col',
    icon: Briefcase,
    title: 'Industry Collaboration',
    description: 'Bridging institutional academia with corporate enterprise R&D, venture investment funds, and commercial technology transfer.',
  },
  {
    id: 'do-prof-dev',
    icon: Sparkles,
    title: 'Professional Development',
    description: 'Providing CPD/CME accreditations, author masterclasses, interactive technical workshops, and prestigious research awards.',
  },
];

export function WhatWeDo() {
  return (
    <section className="az-section az-what-we-do" aria-labelledby="what-we-do-heading">
      <div className="az-container">
        <div className="az-section-header az-section-header--center">
          <Badge variant="primary">Platform Offerings</Badge>
          <h2 id="what-we-do-heading" className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
            What We Do at AZTech
          </h2>
          <p className="az-body" style={{ color: 'var(--az-muted)', maxWidth: '42rem', marginInline: 'auto' }}>
            Comprehensive conference services and academic programs designed to support researchers at every phase of the scholarly lifecycle.
          </p>
        </div>

        <div className="az-what-we-do__grid">
          {whatWeDoList.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="az-what-card">
                <div className="az-what-card__icon-wrap">
                  <Icon size={24} className="az-what-card__icon" aria-hidden="true" />
                </div>
                <div className="az-what-card__content">
                  <h3 className="az-what-card__title">{item.title}</h3>
                  <p className="az-what-card__desc az-body-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
