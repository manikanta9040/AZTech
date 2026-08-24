import { Calendar, MapPin, Tag, Globe, Clock, AlertCircle } from 'lucide-react';
import type { Conference } from '../../../types/conference';
import { formatDate, formatDateRange } from '../../../utils/formatDate';

interface ConferenceInfoProps {
  conference: Conference;
}

export function ConferenceInfo({ conference }: ConferenceInfoProps) {
  const infoItems = [
    {
      label: 'Dates',
      value: formatDateRange(conference.startDate, conference.endDate),
      icon: <Calendar size={20} />,
    },
    {
      label: 'Location',
      value: `${conference.city}, ${conference.country}`,
      icon: <MapPin size={20} />,
    },
    {
      label: 'Category',
      value: conference.category,
      icon: <Tag size={20} />,
    },
    {
      label: 'Country',
      value: conference.country,
      icon: <Globe size={20} />,
    },
    {
      label: 'Status',
      value:
        conference.status === 'registration_open' || conference.status === 'open'
          ? 'Open for Registration'
          : conference.status === 'closing_soon'
          ? 'Registration Closing Soon'
          : conference.status === 'call_for_papers'
          ? 'Call for Papers Open'
          : conference.status === 'upcoming'
          ? 'Upcoming'
          : 'Concluded',
      icon: <Clock size={20} />,
    },
    {
      label: 'Registration Deadline',
      value: conference.registrationDeadline
        ? formatDate(conference.registrationDeadline)
        : 'Rolling Registration',
      icon: <AlertCircle size={20} />,
    },
  ];

  return (
    <section className="az-conf-info-section" aria-label="Conference Quick Information">
      <div className="az-container">
        <div className="az-conf-info-grid">
          {infoItems.map((item, idx) => (
            <div key={idx} className="az-conf-info-card">
              <div className="az-conf-info-card__icon" aria-hidden="true">
                {item.icon}
              </div>
              <div className="az-conf-info-card__content">
                <span className="az-conf-info-card__label">{item.label}</span>
                <strong className="az-conf-info-card__value">{item.value}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ConferenceInfo;
