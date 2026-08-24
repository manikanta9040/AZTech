import { Badge } from '../../components/common/Badge';
import { ConferenceCard } from '../../components/conference/ConferenceCard';
import { mockConferences } from '../../data/conferences';

export default function Conferences() {
  return (
    <div className="az-section">
      <div className="az-container">
        <div style={{ maxWidth: '48rem', marginBottom: 'var(--az-space-8)' }}>
          <Badge variant="primary">Conference Directory</Badge>
          <h1 style={{ marginTop: 'var(--az-space-3)' }}>Explore Upcoming Conferences</h1>
          <p className="az-body-lg" style={{ color: 'var(--az-muted)' }}>
            Join premier academic and technology gatherings worldwide. Discover breakthrough sessions, submit abstracts, and connect with global leaders.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--az-space-6)' }}>
          {mockConferences.map((conf) => (
            <ConferenceCard key={conf.id} conference={conf} />
          ))}
        </div>
      </div>
    </div>
  );
}
