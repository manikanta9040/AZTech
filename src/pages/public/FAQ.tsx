import { Badge } from '../../components/common/Badge';
import { Card, CardContent } from '../../components/common/Card';

const faqs = [
  {
    q: 'How do I submit an abstract for an AZTech conference?',
    a: 'You can submit your abstract online by navigating to the target conference page and clicking "Submit Abstract". You will be guided through our structured author submission portal.',
  },
  {
    q: 'What is included in the conference registration fee?',
    a: 'Registration includes admission to all keynote sessions, specialized track presentations, digital conference proceedings, networking coffee breaks, lunch, and official certificate of presentation/attendance.',
  },
  {
    q: 'Are AZTech conference proceedings indexed and published?',
    a: 'Yes, accepted peer-reviewed papers are published in indexed conference proceedings with DOI assignments and submitted to major scientific indexing repositories.',
  },
  {
    q: 'Can I participate virtually if I cannot travel?',
    a: 'Most AZTech summits support hybrid participation modes including live virtual streaming, interactive Q&A sessions, and digital presentation galleries.',
  },
];

export default function FAQ() {
  return (
    <div className="az-section">
      <div className="az-container">
        <div style={{ maxWidth: '48rem', marginBottom: 'var(--az-space-8)' }}>
          <Badge variant="primary">Help & Resources</Badge>
          <h1 style={{ marginTop: 'var(--az-space-3)' }}>Frequently Asked Questions</h1>
          <p className="az-body-lg" style={{ color: 'var(--az-muted)' }}>
            Find answers to common questions about abstract submissions, registration, venues, and conference proceedings.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 'var(--az-space-4)', maxWidth: '52rem' }}>
          {faqs.map((faq, i) => (
            <Card key={i}>
              <CardContent>
                <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--az-space-2)' }}>{faq.q}</h3>
                <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: 0 }}>{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
