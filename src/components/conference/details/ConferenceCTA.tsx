import { Link } from 'react-router-dom';
import { UserCheck, FileText, Sparkles } from 'lucide-react';
import type { Conference } from '../../../types/conference';

interface ConferenceCTAProps {
  conference: Conference;
}

export function ConferenceCTA({ conference }: ConferenceCTAProps) {
  return (
    <section className="az-section az-conf-cta-section" aria-label="Conference Call to Action">
      <div className="az-container">
        <div className="az-conf-cta-card">
          <div className="az-conf-cta-card__glow" aria-hidden="true" />
          <div className="az-conf-cta-card__content">
            <div className="az-conf-cta-card__badge">
              <Sparkles size={14} aria-hidden="true" />
              <span>Join the Global Gathering</span>
            </div>

            <h2 className="az-conf-cta-card__title">
              Ready to Be Part of the Conversation?
            </h2>

            <p className="az-conf-cta-card__desc az-body-lg">
              Secure your delegate pass for <strong>{conference.title}</strong> today, or submit your abstract to present your breakthrough research on an international stage.
            </p>

            <div className="az-conf-cta-card__actions">
              <Link to="/register" className="az-button az-button--primary az-button--lg">
                <UserCheck size={18} aria-hidden="true" />
                <span>Register Now</span>
              </Link>
              <Link to="/login" className="az-button az-button--outline az-button--lg az-conf-cta-card__btn-alt">
                <FileText size={18} aria-hidden="true" />
                <span>Submit Abstract</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConferenceCTA;
