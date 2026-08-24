import { Link } from 'react-router-dom';
import { Check, CreditCard, Sparkles } from 'lucide-react';
import type { Conference, RegistrationType } from '../../../types/conference';
import { Badge } from '../../common/Badge';

interface RegistrationTypesProps {
  conference: Conference;
}

export function RegistrationTypes({ conference }: RegistrationTypesProps) {
  const basePrice = conference.price || 499;

  const defaultTypes: RegistrationType[] = [
    {
      id: 'reg-student',
      title: 'Student Pass',
      type: 'student',
      price: Math.round(basePrice * 0.45),
      description: 'For undergraduate and postgraduate students with valid institutional student ID.',
      features: [
        'Access to all technical sessions',
        'Digital conference proceedings',
        'Lunch & refreshment breaks',
        'Certificate of Participation',
      ],
    },
    {
      id: 'reg-academic',
      title: 'Academic / Faculty',
      type: 'academic',
      price: Math.round(basePrice * 0.75),
      description: 'For university faculty, professors, and non-profit educational researchers.',
      features: [
        'Access to all technical tracks',
        'Conference kit & proceedings',
        'Networking banquet & lunches',
        'Certificate of Presentation',
      ],
      isPopular: true,
    },
    {
      id: 'reg-researcher',
      title: 'Researcher / Author',
      type: 'researcher',
      price: basePrice,
      description: 'For primary paper authors presenting accepted research abstracts.',
      features: [
        'Author paper presentation slot',
        'Indexed proceedings publication',
        'Full access pass (all days)',
        'Networking reception access',
      ],
    },
    {
      id: 'reg-professional',
      title: 'Industry Professional',
      type: 'professional',
      price: Math.round(basePrice * 1.35),
      description: 'For corporate leaders, R&D engineers, tech consultants, and executives.',
      features: [
        'Full VIP session access',
        'B2B matchmaking & dinners',
        'Workshop & masterclass entry',
        'Complete session recordings',
      ],
    },
    {
      id: 'reg-speaker',
      title: 'Invited Speaker',
      type: 'speaker',
      price: Math.round(basePrice * 0.35),
      description: 'For registered panel speakers, keynote presenters, and track moderators.',
      features: [
        'Speaker lounge access',
        'Priority stage equipment',
        'VIP speaker reception',
        'Honorary award plaque',
      ],
    },
  ];

  const types = conference.registrationTypes && conference.registrationTypes.length > 0
    ? conference.registrationTypes
    : defaultTypes;

  return (
    <section className="az-conf-section" aria-labelledby="registration-types-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <CreditCard size={22} />
        </div>
        <h2 id="registration-types-heading" className="az-conf-section__title">
          Registration Passes & Tiers
        </h2>
      </div>

      <p className="az-body-sm" style={{ color: 'var(--az-muted)', marginBottom: 'var(--az-space-6)' }}>
        Select the registration tier that matches your academic or professional affiliation. All passes include conference accreditation and digital proceedings.
      </p>

      <div className="az-reg-tiers-grid">
        {types.map((tier) => (
          <div
            key={tier.id}
            className={`az-reg-tier-card ${tier.isPopular ? 'az-reg-tier-card--popular' : ''}`}
          >
            {tier.isPopular && (
              <div className="az-reg-tier-card__popular-badge">
                <Badge variant="warning">
                  <Sparkles size={11} style={{ marginRight: '4px' }} aria-hidden="true" />
                  Most Popular
                </Badge>
              </div>
            )}

            <div className="az-reg-tier-card__header">
              <h3 className="az-reg-tier-card__title">{tier.title}</h3>
              <p className="az-caption az-reg-tier-card__desc">{tier.description}</p>
            </div>

            <div className="az-reg-tier-card__price-box">
              <span className="az-reg-tier-card__price">${tier.price}</span>
              <span className="az-reg-tier-card__currency">USD</span>
            </div>

            {tier.features && tier.features.length > 0 && (
              <ul className="az-reg-tier-card__features">
                {tier.features.map((feat, idx) => (
                  <li key={idx} className="az-reg-tier-card__feature-item">
                    <Check size={15} className="az-reg-tier-card__feature-icon" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="az-reg-tier-card__footer">
              <Link
                to="/register"
                className={`az-button az-button--full ${
                  tier.isPopular ? 'az-button--primary' : 'az-button--outline'
                }`}
              >
                Select {tier.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RegistrationTypes;
