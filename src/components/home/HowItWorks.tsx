import { Search, UserCheck, MessageSquare, Award } from 'lucide-react';
import { Badge } from '../common/Badge';

const steps = [
  {
    step: '01',
    title: 'Discover',
    tagline: 'Find the Right Conference',
    description: 'Explore upcoming multidisciplinary summits across 50+ global locations and select topics relevant to your research.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Register',
    tagline: 'Choose Your Participation',
    description: 'Select your pass type as an oral presenter, poster presenter, workshop delegate, or virtual attendee.',
    icon: UserCheck,
  },
  {
    step: '03',
    title: 'Participate',
    tagline: 'Share Knowledge & Network',
    description: 'Present your findings, engage in interactive Q&A sessions, and exchange groundbreaking insights with global leaders.',
    icon: MessageSquare,
  },
  {
    step: '04',
    title: 'Grow',
    tagline: 'Expand Opportunities',
    description: 'Publish in indexed proceedings, establish international research partnerships, and advance your professional standing.',
    icon: Award,
  },
];

export function HowItWorks() {
  return (
    <section className="az-section az-how-section" aria-labelledby="how-it-works-heading">
      <div className="az-container">
        <div className="az-section-header az-section-header--center">
          <Badge variant="primary">Process & Flow</Badge>
          <h2 id="how-it-works-heading" className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
            Your Journey With AZTech
          </h2>
          <p className="az-body" style={{ color: 'var(--az-muted)', maxWidth: '40rem', marginInline: 'auto' }}>
            A streamlined 4-step path from discovering events to presenting groundbreaking ideas and expanding your worldwide network.
          </p>
        </div>

        <div className="az-steps-grid">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="az-step-card">
                <div className="az-step-card__top">
                  <span className="az-step-card__number">{item.step}</span>
                  <div className="az-step-card__icon-wrap">
                    <Icon size={20} className="az-step-card__icon" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="az-step-card__title">{item.title}</h3>
                <h4 className="az-step-card__tagline">{item.tagline}</h4>
                <p className="az-step-card__desc az-body-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
