import { Badge } from '../../components/common/Badge';

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80', title: 'Plenary Keynote Session' },
  { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80', title: 'Executive Panel Discussion' },
  { url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80', title: 'Research Poster Exhibition' },
  { url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80', title: 'Global Networking Reception' },
  { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80', title: 'Interactive Technical Workshop' },
  { url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=600&q=80', title: 'Best Paper Award Ceremony' },
];

export default function Gallery() {
  return (
    <div className="az-section">
      <div className="az-container">
        <div style={{ maxWidth: '48rem', marginBottom: 'var(--az-space-8)' }}>
          <Badge variant="primary">Event Highlights</Badge>
          <h1 style={{ marginTop: 'var(--az-space-3)' }}>AZTech Event Moments & Gallery</h1>
          <p className="az-body-lg" style={{ color: 'var(--az-muted)' }}>
            Glimpses into memorable keynotes, vibrant research discussions, and international networking moments.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--az-space-6)' }}>
          {galleryImages.map((img, i) => (
            <div key={i} style={{ overflow: 'hidden', borderRadius: 'var(--az-radius-lg)', background: 'var(--az-surface)', border: '1px solid var(--az-border)' }}>
              <img src={img.url} alt={img.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: 'var(--az-space-3) var(--az-space-4)', fontWeight: 600, fontSize: '0.875rem' }}>
                {img.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
