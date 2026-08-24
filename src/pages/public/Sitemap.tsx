import { Link } from 'react-router-dom';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent } from '../../components/common/Card';

const siteSections = [
  {
    title: 'Main Navigation',
    links: [
      { label: 'Home Page', href: '/' },
      { label: 'About AZTech', href: '/about' },
      { label: 'Conferences Directory', href: '/conferences' },
      { label: 'Keynote Speakers', href: '/speakers' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Resources & Community',
    links: [
      { label: 'Frequently Asked Questions (FAQ)', href: '/faq' },
      { label: 'Event Photo Gallery', href: '/gallery' },
      { label: 'Research Blogs & Articles', href: '/blogs' },
    ],
  },
  {
    title: 'Portals & Accounts',
    links: [
      { label: 'User Login', href: '/login' },
      { label: 'User Registration', href: '/register' },
      { label: 'Author Portal / Dashboard', href: '/portal' },
      { label: 'Admin Portal', href: '/admin' },
    ],
  },
  {
    title: 'Legal & Policies',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="az-section">
      <div className="az-container">
        <div style={{ maxWidth: '48rem', marginBottom: 'var(--az-space-8)' }}>
          <Badge variant="primary">Navigation Directory</Badge>
          <h1 style={{ marginTop: 'var(--az-space-3)' }}>AZTech Website Sitemap</h1>
          <p className="az-body-lg" style={{ color: 'var(--az-muted)' }}>
            Quick overview and links to all primary sections, resources, and administrative portals on AZTech.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--az-space-6)' }}>
          {siteSections.map((sec) => (
            <Card key={sec.title}>
              <CardContent>
                <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--az-space-3)' }}>{sec.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--az-space-2)' }}>
                  {sec.links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} style={{ color: 'var(--az-primary)', fontWeight: 500, fontSize: '0.875rem' }}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
