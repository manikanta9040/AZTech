import { Calendar, FileCheck, Award, Zap } from 'lucide-react';
import type { Conference } from '../../../types/conference';
import { formatDate, formatDateRange } from '../../../utils/formatDate';

interface ImportantDatesProps {
  conference: Conference;
}

export function ImportantDates({ conference }: ImportantDatesProps) {
  const dates = [
    {
      title: 'Abstract Submission Deadline',
      date: conference.abstractDeadline
        ? formatDate(conference.abstractDeadline)
        : 'Open Now',
      description: 'Deadline for initial abstract submission and paper review.',
      icon: <FileCheck size={18} />,
      status: 'Open',
    },
    {
      title: 'Early Bird Registration Deadline',
      date: conference.earlyRegistrationDeadline
        ? formatDate(conference.earlyRegistrationDeadline)
        : 'Available',
      description: 'Discounted registration rates for early authors and delegates.',
      icon: <Zap size={18} />,
      status: 'Active',
    },
    {
      title: 'Final Registration Deadline',
      date: conference.registrationDeadline
        ? formatDate(conference.registrationDeadline)
        : 'Rolling',
      description: 'Final date to confirm in-person attendance and proceedings inclusion.',
      icon: <Award size={18} />,
      status: 'Upcoming',
    },
    {
      title: 'Conference Sessions',
      date: formatDateRange(conference.startDate, conference.endDate),
      description: 'Keynotes, technical tracks, workshops, and awards ceremony.',
      icon: <Calendar size={18} />,
      status: 'Main Event',
    },
  ];

  return (
    <section className="az-conf-section" aria-labelledby="conf-dates-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Calendar size={22} />
        </div>
        <h2 id="conf-dates-heading" className="az-conf-section__title">
          Important Deadlines & Dates
        </h2>
      </div>

      <div className="az-conf-dates-timeline">
        {dates.map((item, idx) => (
          <div key={idx} className="az-conf-date-item">
            <div className="az-conf-date-item__dot-col" aria-hidden="true">
              <div className="az-conf-date-item__icon-bubble">
                {item.icon}
              </div>
              {idx < dates.length - 1 && <div className="az-conf-date-item__line" />}
            </div>

            <div className="az-conf-date-item__content">
              <div className="az-conf-date-item__header">
                <h4 className="az-conf-date-item__title">{item.title}</h4>
                <span className="az-badge az-badge--info az-conf-date-item__badge">
                  {item.status}
                </span>
              </div>
              <strong className="az-conf-date-item__date">{item.date}</strong>
              <p className="az-caption az-conf-date-item__desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImportantDates;
