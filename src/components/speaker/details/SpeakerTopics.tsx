import { Link } from 'react-router-dom';
import { Tag, Compass } from 'lucide-react';
import type { Speaker } from '../../../types/speaker';

interface SpeakerTopicsProps {
  speaker: Speaker;
  className?: string;
}

export function SpeakerTopics({ speaker, className = '' }: SpeakerTopicsProps) {
  const topics = speaker.topics || speaker.expertise;

  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <section className={`az-conf-section ${className}`} aria-labelledby="speaker-topics-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Tag size={22} />
        </div>
        <div>
          <h2 id="speaker-topics-heading" className="az-conf-section__title" style={{ margin: 0 }}>
            Related Topics & Research Themes
          </h2>
          <p className="az-caption" style={{ margin: '4px 0 0' }}>
            Explore related conference tracks and thematic workshops connected to these subjects.
          </p>
        </div>
      </div>

      <div className="az-speaker-topics-cloud">
        {topics.map((topic) => (
          <Link
            key={topic}
            to={`/conferences?search=${encodeURIComponent(topic)}`}
            className="az-speaker-topic-pill"
            aria-label={`Explore conferences covering ${topic}`}
          >
            <Compass size={14} aria-hidden="true" />
            <span>{topic}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SpeakerTopics;
