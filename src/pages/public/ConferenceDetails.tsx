import { Link, useParams } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent } from '../../components/common/Card';
import { mockConferences } from '../../data/conferences';
import { formatDate } from '../../utils/formatDate';

export default function ConferenceDetails() {
  const { slug } = useParams<{ slug: string }>();
  const conference = mockConferences.find((c) => c.slug === slug || c.id === slug) || mockConferences[0];

  return (
    <div className="az-section">
      <div className="az-container">
        <Link to="/conferences" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--az-space-6)', color: 'var(--az-primary)', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Conferences
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 'var(--az-space-8)' }}>
          <div>
            <div style={{ display: 'flex', gap: 'var(--az-space-2)', marginBottom: 'var(--az-space-3)' }}>
              <Badge variant="primary">{conference.category}</Badge>
              <Badge variant="success">Registration Open</Badge>
            </div>
            <h1>{conference.title}</h1>
            <p className="az-body-lg" style={{ color: 'var(--az-muted)', marginBottom: 'var(--az-space-6)' }}>
              {conference.description}
            </p>

            <div style={{ display: 'flex', gap: 'var(--az-space-6)', flexWrap: 'wrap', padding: 'var(--az-space-4)', background: 'var(--az-surface)', borderRadius: 'var(--az-radius-lg)', border: '1px solid var(--az-border)', marginBottom: 'var(--az-space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--az-space-2)' }}>
                <Calendar size={20} style={{ color: 'var(--az-primary)' }} />
                <div>
                  <div className="az-caption">Dates</div>
                  <strong>{formatDate(conference.startDate)} – {formatDate(conference.endDate)}</strong>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--az-space-2)' }}>
                <MapPin size={20} style={{ color: 'var(--az-primary)' }} />
                <div>
                  <div className="az-caption">Location</div>
                  <strong>{conference.city}, {conference.country}</strong>
                </div>
              </div>
            </div>

            <h3>Key Conference Tracks & Topics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--az-space-3)', marginBlock: 'var(--az-space-4) var(--az-space-8)' }}>
              {conference.topics?.map((topic) => (
                <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: 'var(--az-space-2)', padding: 'var(--az-space-3)', background: 'var(--az-surface)', borderRadius: 'var(--az-radius-md)', border: '1px solid var(--az-border)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--az-success)' }} />
                  <span className="az-body-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardContent>
                <h3 style={{ marginBottom: 'var(--az-space-3)' }}>Registration</h3>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--az-navy)', marginBottom: 'var(--az-space-2)' }}>
                  ${conference.price || 499} <span className="az-body-sm" style={{ fontWeight: 400, color: 'var(--az-muted)' }}>/ Standard Pass</span>
                </div>
                <p className="az-body-sm" style={{ color: 'var(--az-muted)', marginBottom: 'var(--az-space-6)' }}>
                  Includes access to plenary sessions, workshop tracks, proceedings publication, and networking banquets.
                </p>
                <div style={{ display: 'grid', gap: 'var(--az-space-3)' }}>
                  <Link to="/register" className="az-button az-button--primary az-button--full">
                    Register for Conference
                  </Link>
                  <Link to="/login" className="az-button az-button--outline az-button--full">
                    Submit Abstract
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
