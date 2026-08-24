import { Lightbulb, ShieldCheck, Users2, Award, HeartHandshake, GraduationCap, type LucideIcon } from 'lucide-react';
import { Badge } from '../common/Badge';

interface ValueItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const aztechValues: ValueItem[] = [
  {
    id: 'val-innovation',
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Continuously pushing boundaries, embracing unconventional hypotheses, and pioneering emerging technological horizons.',
  },
  {
    id: 'val-integrity',
    icon: ShieldCheck,
    title: 'Integrity',
    description: 'Upholding strict scientific ethics, double-blind peer review rigor, and complete transparency in scholarly publishing.',
  },
  {
    id: 'val-collaboration',
    icon: Users2,
    title: 'Collaboration',
    description: 'Believing that true breakthroughs emerge when multidisciplinary minds, universities, and industries unite globally.',
  },
  {
    id: 'val-excellence',
    icon: Award,
    title: 'Excellence',
    description: 'Striving for world-class standards in conference organization, keynote curation, delegate experience, and indexed proceedings.',
  },
  {
    id: 'val-inclusivity',
    icon: HeartHandshake,
    title: 'Inclusivity',
    description: 'Providing welcoming, equitable stages for researchers from all nations, backgrounds, and career stages.',
  },
  {
    id: 'val-knowledge',
    icon: GraduationCap,
    title: 'Knowledge',
    description: 'Promoting open academic dissemination, lifelong professional education, and the democratization of scientific insights.',
  },
];

export function ValuesSection() {
  return (
    <section className="az-section az-values-section" aria-labelledby="values-heading">
      <div className="az-container">
        <div className="az-section-header az-section-header--center">
          <Badge variant="primary">Core Principles</Badge>
          <h2 id="values-heading" className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
            The Values That Guide AZTech
          </h2>
          <p className="az-body" style={{ color: 'var(--az-muted)', maxWidth: '42rem', marginInline: 'auto' }}>
            Our values shape every summit we organize, every manuscript we review, and every international partnership we build.
          </p>
        </div>

        <div className="az-values-grid">
          {aztechValues.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.id} className="az-value-card">
                <div className="az-value-card__icon-wrap">
                  <Icon size={24} className="az-value-card__icon" aria-hidden="true" />
                </div>
                <h3 className="az-value-card__title">{val.title}</h3>
                <p className="az-value-card__desc az-body-sm">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ValuesSection;
