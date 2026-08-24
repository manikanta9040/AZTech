import { Badge } from '../../components/common/Badge';
import { Card, CardContent } from '../../components/common/Card';

const mockBlogs = [
  {
    title: 'The Evolution of Generative AI in Academic Peer Reviews',
    date: 'February 18, 2027',
    category: 'Artificial Intelligence',
    excerpt: 'Examining how modern language models are transforming editorial workflows and assisting reviewers.',
  },
  {
    title: 'Navigating Sustainable Infrastructure in Smart Megacities',
    date: 'February 10, 2027',
    category: 'Engineering',
    excerpt: 'Key takeaways from international summits on resilient civil grid designs and zero-carbon building frameworks.',
  },
  {
    title: 'Emerging Breakthroughs in Quantum Error Correction',
    date: 'January 28, 2027',
    category: 'Science',
    excerpt: 'How recent developments in fault-tolerant qubits bring scalable quantum computing closer to reality.',
  },
];

export default function Blogs() {
  return (
    <div className="az-section">
      <div className="az-container">
        <div style={{ maxWidth: '48rem', marginBottom: 'var(--az-space-8)' }}>
          <Badge variant="primary">Insights & News</Badge>
          <h1 style={{ marginTop: 'var(--az-space-3)' }}>AZTech Research Blogs & Articles</h1>
          <p className="az-body-lg" style={{ color: 'var(--az-muted)' }}>
            Read perspectives, post-conference summaries, and thought leadership articles from our scientific committee.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--az-space-6)' }}>
          {mockBlogs.map((blog, i) => (
            <Card key={i}>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--az-space-3)' }}>
                  <Badge variant="primary">{blog.category}</Badge>
                  <span className="az-caption">{blog.date}</span>
                </div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--az-space-2)' }}>{blog.title}</h3>
                <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: 0 }}>{blog.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
