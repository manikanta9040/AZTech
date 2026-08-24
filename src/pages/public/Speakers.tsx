import { Badge } from '../../components/common/Badge';
import { SpeakerCard } from '../../components/speaker/SpeakerCard';
import { mockSpeakers } from '../../data/speakers';

export default function Speakers() {
  return (
    <div className="az-section">
      <div className="az-container">
        <div style={{ maxWidth: '48rem', marginBottom: 'var(--az-space-8)' }}>
          <Badge variant="primary">Distinguished Faculty</Badge>
          <h1 style={{ marginTop: 'var(--az-space-3)' }}>Keynote Speakers & Experts</h1>
          <p className="az-body-lg" style={{ color: 'var(--az-muted)' }}>
            Learn from global research icons, visionary scientists, and industry innovators sharing state-of-the-art developments across technology domains.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--az-space-6)' }}>
          {mockSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </div>
  );
}
