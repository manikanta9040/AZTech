import { Users, Globe } from 'lucide-react';
import type { CommitteeMember, Conference } from '../../../types/conference';

interface ConferenceCommitteeProps {
  conference: Conference;
}

export function ConferenceCommittee({ conference }: ConferenceCommitteeProps) {
  const defaultCommittee: CommitteeMember[] = [
    {
      id: 'com-1',
      name: 'Prof. David Alexander',
      role: 'General Conference Chair',
      designation: 'Dean of Research & Innovation',
      organization: 'International Technology University',
      country: conference.country,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      category: 'chair',
    },
    {
      id: 'com-2',
      name: 'Dr. Priya Sharma',
      role: 'Scientific Committee Co-Chair',
      designation: 'Head of Advanced Systems',
      organization: 'Institute of Advanced Science',
      country: 'India',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      category: 'scientific',
    },
    {
      id: 'com-3',
      name: 'Dr. Michael Chen',
      role: 'Program Chair',
      designation: 'Principal Scientist',
      organization: 'Global Research Labs',
      country: 'Singapore',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      category: 'scientific',
    },
    {
      id: 'com-4',
      name: 'Elena Weber',
      role: 'Organizing Secretary',
      designation: 'Director of Conferences',
      organization: 'AZTech International Federation',
      country: 'Germany',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      category: 'organizing',
    },
  ];

  const committee = conference.committee && conference.committee.length > 0
    ? conference.committee
    : defaultCommittee;

  return (
    <section className="az-conf-section" aria-labelledby="conf-committee-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Users size={22} />
        </div>
        <h2 id="conf-committee-heading" className="az-conf-section__title">
          Advisory & Organizing Committee
        </h2>
      </div>

      <p className="az-body-sm" style={{ color: 'var(--az-muted)', marginBottom: 'var(--az-space-6)' }}>
        Our international committee members steer the academic rigorousness, scientific peer-review, and operational success of the conference.
      </p>

      <div className="az-committee-grid">
        {committee.map((member) => (
          <div key={member.id} className="az-committee-card">
            <div className="az-committee-card__avatar-wrap">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="az-committee-card__avatar"
                  loading="lazy"
                />
              ) : (
                <div className="az-committee-card__avatar-fallback" aria-hidden="true">
                  <span>{member.name.charAt(0)}</span>
                </div>
              )}
            </div>

            <div className="az-committee-card__content">
              <span className="az-committee-card__role-tag">{member.role}</span>
              <h3 className="az-committee-card__name">{member.name}</h3>
              <p className="az-committee-card__designation">{member.designation}</p>
              <p className="az-caption az-committee-card__org">{member.organization}</p>
              <div className="az-committee-card__country">
                <Globe size={13} aria-hidden="true" style={{ color: 'var(--az-primary)' }} />
                <span>{member.country}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ConferenceCommittee;
