import { Layers } from 'lucide-react';
import type { Conference } from '../../../types/conference';

interface ConferenceTopicsProps {
  conference: Conference;
}

export function ConferenceTopics({ conference }: ConferenceTopicsProps) {
  const topics = conference.topics && conference.topics.length > 0
    ? conference.topics
    : [
        'Artificial Intelligence & Deep Learning',
        'Next-Gen Architectures',
        'Computational Intelligence',
        'Scalable Systems & Infrastructure',
        'Data Governance & Ethics',
        'Emerging Paradigms',
      ];

  return (
    <section className="az-conf-section" aria-labelledby="conf-topics-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Layers size={22} />
        </div>
        <h2 id="conf-topics-heading" className="az-conf-section__title">
          Conference Tracks & Topics
        </h2>
      </div>

      <p className="az-body-sm" style={{ color: 'var(--az-muted)', marginBottom: 'var(--az-space-4)' }}>
        Authors and practitioners are invited to submit original, unpublished research across the following conference domains:
      </p>

      <div className="az-conf-topics-wrap">
        {topics.map((topic, idx) => (
          <span key={idx} className="az-topic-badge">
            {topic}
          </span>
        ))}
      </div>
    </section>
  );
}

export default ConferenceTopics;
