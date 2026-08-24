import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="az-cta-section" aria-labelledby="cta-heading">
      <div className="az-container">
        <div className="az-cta-banner">
          <div className="az-cta-banner__glow" aria-hidden="true" />

          <div className="az-cta-banner__content">
            <div className="az-cta-banner__badge">
              <Sparkles size={14} aria-hidden="true" />
              <span>Join 10,000+ Global Innovators</span>
            </div>

            <h2 id="cta-heading" className="az-cta-banner__title">
              Be Part of the Next Big Conversation
            </h2>

            <p className="az-cta-banner__desc az-body-lg">
              Discover upcoming AZTech conferences and connect with experts, researchers and industry leaders shaping tomorrow's technology.
            </p>

            <div className="az-cta-banner__actions">
              <Link to="/conferences" className="az-button az-button--primary az-button--lg">
                <span>Explore Conferences</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/register" className="az-button az-button--outline az-button--lg az-cta-banner__btn-alt">
                <UserPlus size={18} aria-hidden="true" />
                <span>Join AZTech</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
