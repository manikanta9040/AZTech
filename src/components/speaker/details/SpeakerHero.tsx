import { useState } from 'react';
import { Globe, MapPin, Building, Sparkles, UserCheck } from 'lucide-react';
import type { Speaker } from '../../../types/speaker';
import { Badge } from '../../common/Badge';
import { SpeakerSocialLinks } from './SpeakerSocialLinks';

interface SpeakerHeroProps {
  speaker: Speaker;
  className?: string;
}

export function SpeakerHero({ speaker, className = '' }: SpeakerHeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className={`az-speaker-hero-section ${className}`} aria-labelledby="speaker-profile-name">
      <div className="az-container">
        <div className="az-speaker-hero-card">
          <div className="az-speaker-hero-grid">
            {/* Left: Avatar Image */}
            <div className="az-speaker-hero__visual">
              <div className="az-speaker-hero__image-wrap">
                {speaker.image && !imageError ? (
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="az-speaker-hero__image"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="az-speaker-hero__fallback-img" aria-hidden="true">
                    <span>{speaker.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Profile Info */}
            <div className="az-speaker-hero__content">
              <div className="az-speaker-hero__badge-row">
                <Badge variant="primary">
                  <UserCheck size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Keynote Speaker & Faculty
                </Badge>
                {speaker.featured && (
                  <Badge variant="success">
                    <Sparkles size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    Featured Pioneer
                  </Badge>
                )}
              </div>

              <h1 id="speaker-profile-name" className="az-speaker-hero__name">
                {speaker.name}
              </h1>

              <p className="az-speaker-hero__designation">
                {speaker.designation}
              </p>

              <div className="az-speaker-hero__meta-strip">
                <div className="az-speaker-hero__meta-item">
                  <Building size={16} className="az-speaker-hero__meta-icon" aria-hidden="true" />
                  <span>{speaker.organization}</span>
                </div>

                <div className="az-speaker-hero__meta-item">
                  <Globe size={16} className="az-speaker-hero__meta-icon" aria-hidden="true" />
                  <span>{speaker.country}</span>
                </div>

                {speaker.city && (
                  <div className="az-speaker-hero__meta-item">
                    <MapPin size={16} className="az-speaker-hero__meta-icon" aria-hidden="true" />
                    <span>{speaker.city}</span>
                  </div>
                )}
              </div>

              {/* Short Bio */}
              {speaker.shortBio && (
                <p className="az-speaker-hero__shortbio">
                  {speaker.shortBio}
                </p>
              )}

              {/* Expertise Tags */}
              {speaker.expertise && speaker.expertise.length > 0 && (
                <div className="az-speaker-hero__expertise" aria-label="Core expertise domains">
                  {speaker.expertise.map((item) => (
                    <span key={item} className="az-speaker-tag az-speaker-tag--hero">
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {/* Social Links */}
              <div className="az-speaker-hero__social-wrap">
                <SpeakerSocialLinks
                  socialLinks={speaker.socialLinks}
                  speakerName={speaker.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpeakerHero;
