import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Mail, UserCheck, FileText, Sparkles } from 'lucide-react';
import type { Conference } from '../../../types/conference';
import { formatDate } from '../../../utils/formatDate';

interface RegistrationCardProps {
  conference: Conference;
}

export function RegistrationCard({ conference }: RegistrationCardProps) {
  const minPrice = conference.registrationTypes && conference.registrationTypes.length > 0
    ? Math.min(...conference.registrationTypes.map((t) => t.price))
    : conference.price
    ? Math.round(conference.price * 0.45)
    : 199;

  const inclusions = [
    'Access to all Plenary & Keynote Sessions',
    'Entry to Parallel Technical Paper Tracks',
    'Official Conference Kit & Digital Proceedings',
    'Daily Networking Lunches & Coffee Breaks',
    'Verifiable Certificate of Attendance/Presentation',
  ];

  return (
    <aside className="az-conf-sidebar-card" aria-label="Conference Registration Summary">
      <div className="az-conf-reg-card">
        {/* Header Ribbon */}
        <div className="az-conf-reg-card__header">
          <div className="az-conf-reg-card__badge">
            <Sparkles size={13} aria-hidden="true" />
            <span>Passes Available</span>
          </div>
          <span className="az-caption az-conf-reg-card__tagline">Global Delegate Access</span>
        </div>

        {/* Pricing */}
        <div className="az-conf-reg-card__pricing">
          <span className="az-conf-reg-card__price-label">Starting from</span>
          <div className="az-conf-reg-card__price-wrap">
            <span className="az-conf-reg-card__price">${minPrice}</span>
            <span className="az-conf-reg-card__price-sub">/ delegate</span>
          </div>
          {conference.registrationDeadline && (
            <p className="az-caption az-conf-reg-card__deadline">
              Deadline: <strong>{formatDate(conference.registrationDeadline)}</strong>
            </p>
          )}
        </div>

        {/* Inclusions */}
        <div className="az-conf-reg-card__inclusions">
          <h4 className="az-conf-reg-card__inclusions-title">What's Included:</h4>
          <ul className="az-conf-reg-card__inclusions-list">
            {inclusions.map((item, idx) => (
              <li key={idx} className="az-conf-reg-card__inclusion-item">
                <Check size={16} className="az-conf-reg-card__check-icon" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="az-conf-reg-card__actions">
          <Link to="/register" className="az-button az-button--primary az-button--full az-button--lg">
            <UserCheck size={18} aria-hidden="true" />
            <span>Register Now</span>
          </Link>
          <Link to="/login" className="az-button az-button--outline az-button--full">
            <FileText size={16} aria-hidden="true" />
            <span>Submit Abstract</span>
          </Link>
        </div>

        {/* Guarantee & Support */}
        <div className="az-conf-reg-card__footer">
          <div className="az-conf-reg-card__guarantee">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>Secure Registration Guarantee</span>
          </div>
          <div className="az-conf-reg-card__contact">
            <Mail size={14} aria-hidden="true" />
            <Link to="/contact" className="az-conf-reg-card__contact-link">
              Need assistance? Contact support
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RegistrationCard;
