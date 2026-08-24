import { useState } from 'react';
import { CalendarDays, Clock, MapPin, Mic, Coffee, Award, Sparkles } from 'lucide-react';
import type { Conference, ScheduleSession } from '../../../types/conference';
import { formatDate } from '../../../utils/formatDate';

interface ConferenceProgramProps {
  conference: Conference;
}

export function ConferenceProgram({ conference }: ConferenceProgramProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const schedule = conference.schedule || [];

  if (schedule.length === 0) {
    return null;
  }

  const currentDay = schedule[activeDayIndex] || schedule[0];

  const getSessionIcon = (type?: string) => {
    switch (type) {
      case 'keynote':
        return <Sparkles size={16} style={{ color: 'var(--az-primary)' }} />;
      case 'track':
        return <Mic size={16} style={{ color: 'var(--az-navy)' }} />;
      case 'break':
        return <Coffee size={16} style={{ color: 'var(--az-warning)' }} />;
      case 'poster':
      case 'panel':
        return <Award size={16} style={{ color: 'var(--az-success)' }} />;
      default:
        return <Clock size={16} style={{ color: 'var(--az-primary)' }} />;
    }
  };

  return (
    <section className="az-conf-section" aria-labelledby="conf-program-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <CalendarDays size={22} />
        </div>
        <h2 id="conf-program-heading" className="az-conf-section__title">
          Conference Program & Schedule
        </h2>
      </div>

      <p className="az-body-sm" style={{ color: 'var(--az-muted)', marginBottom: 'var(--az-space-6)' }}>
        Explore the multi-day agenda featuring international keynote addresses, parallel presentation tracks, hands-on workshops, and networking receptions.
      </p>

      {/* Day Selector Tabs */}
      <div className="az-schedule-tabs" role="tablist" aria-label="Conference Days">
        {schedule.map((day, index) => {
          const isActive = index === activeDayIndex;
          return (
            <button
              key={day.dayNumber}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`schedule-panel-day-${day.dayNumber}`}
              id={`schedule-tab-day-${day.dayNumber}`}
              className={`az-schedule-tab ${isActive ? 'az-schedule-tab--active' : ''}`}
              onClick={() => setActiveDayIndex(index)}
            >
              <span className="az-schedule-tab__day">Day {day.dayNumber}</span>
              <span className="az-schedule-tab__date">{formatDate(day.date)}</span>
            </button>
          );
        })}
      </div>

      {/* Current Day Schedule Sessions */}
      <div
        id={`schedule-panel-day-${currentDay.dayNumber}`}
        role="tabpanel"
        aria-labelledby={`schedule-tab-day-${currentDay.dayNumber}`}
        className="az-schedule-panel"
      >
        <div className="az-schedule-panel__header">
          <h3 className="az-schedule-panel__title">{currentDay.title}</h3>
          <span className="az-schedule-panel__date">{formatDate(currentDay.date)}</span>
        </div>

        <div className="az-schedule-sessions-list">
          {currentDay.sessions.map((session: ScheduleSession, sIdx: number) => (
            <div
              key={sIdx}
              className={`az-session-card ${
                session.type === 'keynote'
                  ? 'az-session-card--keynote'
                  : session.type === 'break'
                  ? 'az-session-card--break'
                  : ''
              }`}
            >
              <div className="az-session-card__time-col">
                <Clock size={14} className="az-session-card__time-icon" aria-hidden="true" />
                <span className="az-session-card__time">{session.time}</span>
              </div>

              <div className="az-session-card__main">
                <div className="az-session-card__top">
                  <div className="az-session-card__icon-wrap" aria-hidden="true">
                    {getSessionIcon(session.type)}
                  </div>
                  <h4 className="az-session-card__title">{session.title}</h4>
                </div>

                {session.description && (
                  <p className="az-caption az-session-card__desc">{session.description}</p>
                )}

                <div className="az-session-card__meta">
                  {session.speaker && (
                    <div className="az-session-card__meta-item">
                      <Mic size={13} aria-hidden="true" style={{ color: 'var(--az-primary)' }} />
                      <span>{session.speaker}</span>
                    </div>
                  )}
                  {session.location && (
                    <div className="az-session-card__meta-item">
                      <MapPin size={13} aria-hidden="true" style={{ color: 'var(--az-muted)' }} />
                      <span>{session.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ConferenceProgram;
