import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Users, Globe, ArrowRight, FileText, Sparkles } from 'lucide-react';
import { APP_TAGLINE } from '../../constants/app';
import { Badge } from '../common/Badge';

export function HeroSection() {
  return (
    <section className="az-hero-section" aria-labelledby="hero-heading">
      <div className="az-container az-hero-section__inner">
        {/* Left Column: Hero Content */}
        <motion.div
          className="az-hero-section__content"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="az-hero-section__badge-wrap">
            <span className="az-hero-tagline-badge">
              <Sparkles size={14} className="az-hero-tagline-icon" aria-hidden="true" />
              <span>{APP_TAGLINE}</span>
            </span>
          </div>

          <h1 id="hero-heading" className="az-hero-section__title">
            Where Ideas Meet the <span className="az-gradient-text">Future</span>
          </h1>

          <p className="az-hero-section__description az-body-lg">
            Connect with researchers, professionals, academics, innovators and industry leaders through world-class conferences and knowledge-sharing events.
          </p>

          <div className="az-hero-section__cta-group">
            <Link to="/conferences" className="az-button az-button--primary az-button--lg">
              <span>Explore Conferences</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link to="/login" className="az-button az-button--outline az-button--lg">
              <FileText size={18} aria-hidden="true" />
              <span>Submit Abstract</span>
            </Link>
          </div>

          <div className="az-hero-section__trust-bar">
            <div className="az-hero-trust-item">
              <strong>50+</strong>
              <span>Countries</span>
            </div>
            <div className="az-hero-trust-divider" />
            <div className="az-hero-trust-item">
              <strong>500+</strong>
              <span>Conferences</span>
            </div>
            <div className="az-hero-trust-divider" />
            <div className="az-hero-trust-item">
              <strong>10k+</strong>
              <span>Researchers</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual Brand Card / Highlights */}
        <motion.div
          className="az-hero-section__visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="az-hero-visual-card">
            <div className="az-hero-visual-card__header">
              <div className="az-hero-visual-card__header-dots">
                <span className="az-dot az-dot--red" />
                <span className="az-dot az-dot--yellow" />
                <span className="az-dot az-dot--green" />
              </div>
              <Badge variant="primary">AZTech Flagship Summit</Badge>
            </div>

            <div className="az-hero-visual-card__body">
              <div className="az-hero-visual-event">
                <span className="az-hero-visual-event__tag">AI & Machine Learning 2027</span>
                <h4>International Summit on Neural Systems & Generative Intelligence</h4>
                <div className="az-hero-visual-event__meta">
                  <span className="az-hero-meta-badge">
                    <Calendar size={14} /> Mar 15–17, 2027
                  </span>
                  <span className="az-hero-meta-badge">
                    <Globe size={14} /> Hyderabad & Hybrid
                  </span>
                </div>
              </div>

              <div className="az-hero-visual-stats">
                <div className="az-hero-stat-pill">
                  <Users size={16} className="az-hero-stat-icon" />
                  <div>
                    <div className="az-hero-stat-val">1,200+</div>
                    <div className="az-hero-stat-lbl">Delegates</div>
                  </div>
                </div>
                <div className="az-hero-stat-pill">
                  <Globe size={16} className="az-hero-stat-icon" />
                  <div>
                    <div className="az-hero-stat-val">45+</div>
                    <div className="az-hero-stat-lbl">Speakers</div>
                  </div>
                </div>
              </div>

              <div className="az-hero-visual-footer">
                <div className="az-hero-avatars">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Speaker" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Speaker" />
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" alt="Speaker" />
                  <span className="az-hero-avatar-more">+40</span>
                </div>
                <span className="az-hero-live-pill">
                  <span className="az-live-dot" /> Registration Live
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
