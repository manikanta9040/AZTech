import { Mail, MapPin, Phone } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';

export default function Contact() {
  return (
    <div className="az-section">
      <div className="az-container">
        <div style={{ maxWidth: '48rem', marginBottom: 'var(--az-space-8)' }}>
          <Badge variant="primary">Get In Touch</Badge>
          <h1 style={{ marginTop: 'var(--az-space-3)' }}>Contact AZTech Global Team</h1>
          <p className="az-body-lg" style={{ color: 'var(--az-muted)' }}>
            Have questions about upcoming conferences, sponsorship opportunities, or abstract submissions? We are here to help.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--az-space-8)' }}>
          <Card>
            <CardContent>
              <h3 style={{ marginBottom: 'var(--az-space-4)' }}>Send Us a Message</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Message received. Our conference coordinator will get back to you shortly.'); }} style={{ display: 'grid', gap: 'var(--az-space-4)' }}>
                <Input label="Full Name" placeholder="Dr. John Doe" required />
                <Input label="Email Address" type="email" placeholder="john.doe@university.edu" required />
                <Input label="Subject" placeholder="Inquiry regarding Conference Registration" required />
                <Textarea label="Message" placeholder="Type your message or inquiry here..." required />
                <Button type="submit" variant="primary">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <div style={{ display: 'grid', gap: 'var(--az-space-6)', alignContent: 'start' }}>
            <Card>
              <CardContent style={{ display: 'flex', gap: 'var(--az-space-4)', alignItems: 'flex-start' }}>
                <Mail size={24} style={{ color: 'var(--az-primary)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: 0 }}>Email Inquiries</h4>
                  <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: '4px 0 0' }}>contact@aztechconferences.org</p>
                  <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: 0 }}>submissions@aztechconferences.org</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ display: 'flex', gap: 'var(--az-space-4)', alignItems: 'flex-start' }}>
                <Phone size={24} style={{ color: 'var(--az-primary)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: 0 }}>Phone Assistance</h4>
                  <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: '4px 0 0' }}>+1 (800) 555-AZTECH (Toll-free)</p>
                  <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: 0 }}>+91 40 4567 8900 (Asia-Pacific)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ display: 'flex', gap: 'var(--az-space-4)', alignItems: 'flex-start' }}>
                <MapPin size={24} style={{ color: 'var(--az-primary)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: 0 }}>Global Headquarters</h4>
                  <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: '4px 0 0' }}>
                    AZTech Global Operations<br />
                    100 Innovation Way, Suite 400<br />
                    San Francisco, CA 94105, USA
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
