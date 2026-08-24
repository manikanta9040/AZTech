import { Globe, Users, BookOpen, Lightbulb, Building2, TrendingUp } from 'lucide-react';
import { Badge } from '../common/Badge';

const features = [
  {
    icon: Globe,
    title: 'Global Networking',
    description: 'Connect with international researchers, institutional delegates, and industry pioneers from 50+ nations.',
  },
  {
    icon: Users,
    title: 'Expert Speakers',
    description: 'Gain perspectives from world-class keynote authorities, university chairs, and visionary founders.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Sharing',
    description: 'Participate in peer-reviewed oral tracks, poster presentations, and interactive workshop masterclasses.',
  },
  {
    icon: Lightbulb,
    title: 'Research Opportunities',
    description: 'Publish accepted papers in indexed proceedings with official DOI assignments and broad digital citations.',
  },
  {
    icon: Building2,
    title: 'Industry Connections',
    description: 'Bridge the gap between academia and corporate enterprise through dedicated sponsor & exhibition hubs.',
  },
  {
    icon: TrendingUp,
    title: 'Professional Growth',
    description: 'Elevate your scientific credentials, acquire continuing education recognitions, and expand career horizons.',
  },
];

export function WhyAzTech() {
  return (
    <section className="az-section az-why-section" aria-labelledby="why-aztech-heading">
      <div className="az-container">
        <div className="az-section-header az-section-header--center">
          <Badge variant="primary">The AZTech Advantage</Badge>
          <h2 id="why-aztech-heading" className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
            Why Choose AZTech?
          </h2>
          <p className="az-body" style={{ color: 'var(--az-muted)', maxWidth: '40rem', marginInline: 'auto' }}>
            We provide an international stage designed for rigorous academic exchange, high-value networking, and collaborative scientific breakthroughs.
          </p>
        </div>

        <div className="az-why-grid">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="az-why-card">
                <div className="az-why-card__icon-wrap">
                  <Icon size={24} className="az-why-card__icon" aria-hidden="true" />
                </div>
                <h3 className="az-why-card__title">{item.title}</h3>
                <p className="az-why-card__desc az-body-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyAzTech;
