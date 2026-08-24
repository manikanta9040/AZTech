import { Target, Compass, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export function MissionSection() {
  return (
    <section className="az-section az-mission-section" aria-labelledby="mission-heading">
      <div className="az-container">
        <div className="az-mission-card">
          <div className="az-mission-card__glow" aria-hidden="true" />
          <div className="az-mission-card__inner">
            <div className="az-mission-card__icon-wrap">
              <Target size={36} className="az-mission-card__icon" aria-hidden="true" />
            </div>
            <div className="az-mission-card__content">
              <Badge variant="primary">
                <Sparkles size={13} style={{ marginRight: '6px' }} aria-hidden="true" />
                Guiding Purpose
              </Badge>
              <h2 id="mission-heading" className="az-h2" style={{ marginTop: 'var(--az-space-3)', color: 'var(--az-navy)' }}>
                Our Mission
              </h2>
              <p className="az-display-statement" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.65rem)', fontWeight: 650, color: 'var(--az-primary)', lineHeight: 1.4, marginBlock: 'var(--az-space-4)' }}>
                &ldquo;To create meaningful platforms where knowledge, research and innovation connect people and inspire collaboration across borders.&rdquo;
              </p>
              <div className="az-mission-bullets" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--az-space-4)', marginTop: 'var(--az-space-6)' }}>
                <div className="az-mission-bullet-item" style={{ display: 'flex', gap: 'var(--az-space-3)' }}>
                  <Compass size={20} style={{ color: 'var(--az-accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--az-navy)', display: 'block', marginBottom: '2px' }}>Boundaryless Research</strong>
                    <span className="az-body-sm" style={{ color: 'var(--az-muted)' }}>Breaking academic silos to facilitate cross-domain discoveries.</span>
                  </div>
                </div>
                <div className="az-mission-bullet-item" style={{ display: 'flex', gap: 'var(--az-space-3)' }}>
                  <Sparkles size={20} style={{ color: 'var(--az-accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--az-navy)', display: 'block', marginBottom: '2px' }}>Impactful Exchange</strong>
                    <span className="az-body-sm" style={{ color: 'var(--az-muted)' }}>Empowering voices that pioneer transformative technological solutions.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
