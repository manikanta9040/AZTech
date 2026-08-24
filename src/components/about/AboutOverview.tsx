import { Globe, BookOpen, Lightbulb, Users, Network, Building2 } from 'lucide-react';
import { Badge } from '../common/Badge';

const overviewPillars = [
  {
    icon: BookOpen,
    title: 'Knowledge Sharing',
    description: 'Providing open, rigorous scientific forums for disseminating cutting-edge findings and state-of-the-art developments across emerging disciplines.',
  },
  {
    icon: Lightbulb,
    title: 'Pioneering Research',
    description: 'Championing high-impact interdisciplinary academic discoveries with peer-reviewed proceedings indexed in prestigious international repositories.',
  },
  {
    icon: Globe,
    title: 'Global Innovation',
    description: 'Connecting top-tier research institutes, laboratories, and universities across 50+ countries to tackle worldwide grand challenges.',
  },
  {
    icon: Users,
    title: 'Inclusive Collaboration',
    description: 'Fostering cross-border partnerships that unite senior scholars, early-career researchers, and doctoral fellows in collaborative consortia.',
  },
  {
    icon: Network,
    title: 'Professional Networking',
    description: 'Curating dynamic roundtables, poster sessions, and executive panels that inspire lifelong professional relationships and mentorship.',
  },
  {
    icon: Building2,
    title: 'Industry Connections',
    description: 'Bridging fundamental scientific theory and corporate industrial applications through dedicated exhibition hubs and tech transfer forums.',
  },
];

export function AboutOverview() {
  return (
    <section className="az-section az-about-overview" aria-labelledby="about-overview-heading">
      <div className="az-container">
        <div className="az-about-overview__grid">
          <div className="az-about-overview__intro">
            <Badge variant="primary">Who We Are</Badge>
            <h2 id="about-overview-heading" className="az-h2" style={{ marginTop: 'var(--az-space-3)' }}>
              Empowering Global Scholars & Scientific Pioneers
            </h2>
            <p className="az-body-lg" style={{ color: 'var(--az-text)', marginTop: 'var(--az-space-4)' }}>
              AZTech is a premier international conference management platform engineered to connect the world’s leading thinkers, researchers, academics, innovators, and industry leaders.
            </p>
            <p className="az-body" style={{ color: 'var(--az-muted)', marginTop: 'var(--az-space-3)' }}>
              From biomedical engineering and artificial intelligence to sustainable urban infrastructure and quantum computing, AZTech curates high-impact international summits that accelerate knowledge transfer, establish cross-border research alliances, and translate breakthrough scientific ideas into tangible real-world solutions.
            </p>
            <div className="az-about-quote-box" style={{ marginTop: 'var(--az-space-6)' }}>
              <p className="az-body" style={{ fontStyle: 'italic', color: 'var(--az-navy)', margin: 0 }}>
                &ldquo;Our commitment is to ensure every breakthrough idea finds a global stage, every scholar finds collaborative partners, and every scientific conversation shapes the trajectory of tomorrow.&rdquo;
              </p>
            </div>
          </div>

          <div className="az-about-pillars-grid">
            {overviewPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="az-about-pillar-card">
                  <div className="az-about-pillar-card__icon-wrap">
                    <Icon size={22} className="az-about-pillar-card__icon" aria-hidden="true" />
                  </div>
                  <h3 className="az-about-pillar-card__title">{pillar.title}</h3>
                  <p className="az-about-pillar-card__desc az-body-sm">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutOverview;
