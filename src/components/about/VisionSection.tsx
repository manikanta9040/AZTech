import { Eye, Globe2, Rocket } from 'lucide-react';
import { Badge } from '../common/Badge';

export function VisionSection() {
  return (
    <section className="az-section az-vision-section" aria-labelledby="vision-heading">
      <div className="az-container">
        <div className="az-vision-card">
          <div className="az-vision-card__glow" aria-hidden="true" />
          <div className="az-vision-card__inner">
            <div className="az-vision-card__content">
              <Badge variant="primary">
                <Globe2 size={13} style={{ marginRight: '6px' }} aria-hidden="true" />
                Global Horizon
              </Badge>
              <h2 id="vision-heading" className="az-h2" style={{ marginTop: 'var(--az-space-3)', color: '#ffffff' }}>
                Our Vision
              </h2>
              <p className="az-display-statement" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.65rem)', fontWeight: 650, color: '#6bb9f0', lineHeight: 1.4, marginBlock: 'var(--az-space-4)' }}>
                &ldquo;To build a global community where ideas move freely, research creates impact and people collaborate to shape the future.&rdquo;
              </p>
              <div className="az-vision-highlights" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--az-space-4)', marginTop: 'var(--az-space-6)' }}>
                <div className="az-vision-item" style={{ display: 'flex', gap: 'var(--az-space-3)' }}>
                  <Globe2 size={20} style={{ color: 'var(--az-accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#ffffff', display: 'block', marginBottom: '2px' }}>Open Knowledge Flow</strong>
                    <span className="az-body-sm" style={{ color: '#a6b8ca' }}>Democratizing access to breakthrough findings across developed and emerging nations.</span>
                  </div>
                </div>
                <div className="az-vision-item" style={{ display: 'flex', gap: 'var(--az-space-3)' }}>
                  <Rocket size={20} style={{ color: 'var(--az-accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#ffffff', display: 'block', marginBottom: '2px' }}>Generational Impact</strong>
                    <span className="az-body-sm" style={{ color: '#a6b8ca' }}>Mentoring early researchers to lead the next century of scientific discovery.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="az-vision-card__icon-wrap">
              <Eye size={36} className="az-vision-card__icon" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionSection;
