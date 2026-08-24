import { BookOpen } from 'lucide-react';
import type { Speaker } from '../../../types/speaker';

interface SpeakerBiographyProps {
  speaker: Speaker;
  className?: string;
}

export function SpeakerBiography({ speaker, className = '' }: SpeakerBiographyProps) {
  const bioContent = speaker.biography || speaker.bio || speaker.shortBio;

  if (!bioContent) {
    return null;
  }

  // Split multi-paragraph text
  const paragraphs = bioContent.split('\n\n').filter((p) => p.trim().length > 0);

  return (
    <section className={`az-conf-section ${className}`} aria-labelledby="speaker-bio-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <BookOpen size={22} />
        </div>
        <div>
          <h2 id="speaker-bio-heading" className="az-conf-section__title" style={{ margin: 0 }}>
            Biography
          </h2>
          <p className="az-caption" style={{ margin: '4px 0 0' }}>
            Academic background, scholarly contributions, and professional profile.
          </p>
        </div>
      </div>

      <div className="az-speaker-bio-content">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="az-body az-speaker-bio-para">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

export default SpeakerBiography;
