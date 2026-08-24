import { Link } from 'react-router-dom';
import { Award, Globe, Users } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent } from '../../components/common/Card';

export default function About() {
  return (
    <div className="az-section">
      <div className="az-container">
        <div style={{ maxWidth: '48rem', marginBottom: 'var(--az-space-8)' }}>
          <Badge variant="primary">About AZTech</Badge>
          <h1 style={{ marginTop: 'var(--az-space-3)' }}>Empowering Global Innovation & Scientific Discovery</h1>
          <p className="az-body-lg" style={{ color: 'var(--az-muted)' }}>
            AZTech is a premier international conference organization dedicated to connecting researchers,
            scholars, innovators, and industry leaders through world-class academic summits.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--az-space-6)', marginBottom: 'var(--az-space-10)' }}>
          <Card>
            <CardContent>
              <Globe size={28} style={{ color: 'var(--az-primary)', marginBottom: 'var(--az-space-3)' }} />
              <h3>Global Footprint</h3>
              <p className="az-body-sm" style={{ color: 'var(--az-muted)' }}>
                Hosting multidisciplinary conferences across 50+ countries spanning North America, Europe, Asia, and the Middle East.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Award size={28} style={{ color: 'var(--az-primary)', marginBottom: 'var(--az-space-3)' }} />
              <h3>Peer-Reviewed Excellence</h3>
              <p className="az-body-sm" style={{ color: 'var(--az-muted)' }}>
                Strict editorial evaluation and peer review processes ensuring highest scholarly integrity and quality.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Users size={28} style={{ color: 'var(--az-primary)', marginBottom: 'var(--az-space-3)' }} />
              <h3>Interdisciplinary Dialogue</h3>
              <p className="az-body-sm" style={{ color: 'var(--az-muted)' }}>
                Bridging fundamental theoretical science and cutting-edge industrial commercial applications.
              </p>
            </CardContent>
          </Card>
        </div>

        <div style={{ display: 'flex', gap: 'var(--az-space-4)', flexWrap: 'wrap' }}>
          <Link to="/conferences" className="az-button az-button--primary">
            Explore Conferences
          </Link>
          <Link to="/contact" className="az-button az-button--outline">
            Contact Our Team
          </Link>
        </div>
      </div>
    </div>
  );
}
