import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';
import { Card, CardContent } from '../common/Card';

export function ContactInfo() {
  return (
    <div className="az-contact-info-list" style={{ display: 'grid', gap: 'var(--az-space-4)' }}>
      <Card>
        <CardContent style={{ display: 'flex', gap: 'var(--az-space-4)', alignItems: 'flex-start' }}>
          <div className="az-contact-icon-wrap" style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--az-radius-md)', background: '#e0effa', color: 'var(--az-primary)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Mail size={22} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Email Us Directly</h3>
            <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: '4px 0 2px' }}>
              General & Conference Inquiries:
            </p>
            <a href="mailto:hello@aztech.example" style={{ color: 'var(--az-primary)', fontWeight: 600, fontSize: '0.9375rem' }}>
              hello@aztech.example
            </a>
            <p className="az-caption" style={{ margin: '4px 0 0', color: 'var(--az-muted)' }}>
              Abstract Submissions: submissions@aztech.example
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent style={{ display: 'flex', gap: 'var(--az-space-4)', alignItems: 'flex-start' }}>
          <div className="az-contact-icon-wrap" style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--az-radius-md)', background: '#e0effa', color: 'var(--az-primary)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Phone size={22} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Phone Assistance</h3>
            <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: '4px 0 2px' }}>
              Conference Secretariat Helpline:
            </p>
            <a href="tel:+910000000000" style={{ color: 'var(--az-primary)', fontWeight: 600, fontSize: '0.9375rem' }}>
              +91 00000 00000
            </a>
            <p className="az-caption" style={{ margin: '4px 0 0', color: 'var(--az-muted)' }}>
              Toll-Free (US/CA): +1 (800) 555-AZTECH
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent style={{ display: 'flex', gap: 'var(--az-space-4)', alignItems: 'flex-start' }}>
          <div className="az-contact-icon-wrap" style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--az-radius-md)', background: '#e0effa', color: 'var(--az-primary)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <MapPin size={22} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Global Headquarters</h3>
            <p className="az-body-sm" style={{ color: 'var(--az-text)', margin: '4px 0 0', fontWeight: 550 }}>
              AZTech International Centre
            </p>
            <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: '2px 0 0' }}>
              HITEC City Innovation Boulevard, Madhapur<br />
              Hyderabad, Telangana 500081, India
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent style={{ display: 'flex', gap: 'var(--az-space-4)', alignItems: 'flex-start' }}>
          <div className="az-contact-icon-wrap" style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--az-radius-md)', background: '#e0effa', color: 'var(--az-primary)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Clock size={22} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Working Hours</h3>
            <p className="az-body-sm" style={{ color: 'var(--az-text)', margin: '4px 0 2px', fontWeight: 600 }}>
              Monday – Friday: 9:00 AM – 6:00 PM IST
            </p>
            <p className="az-caption" style={{ margin: 0, color: 'var(--az-muted)' }}>
              Saturday – Sunday: Closed (Delegate emergency portal open 24/7 during active conference dates)
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="az-contact-info-footer" style={{ padding: 'var(--az-space-4)', background: '#e0effa', borderRadius: 'var(--az-radius-md)', border: '1px solid rgb(23 105 170 / 20%)', display: 'flex', gap: 'var(--az-space-3)', alignItems: 'center' }}>
        <Globe size={20} style={{ color: 'var(--az-primary)', flexShrink: 0 }} />
        <span className="az-body-sm" style={{ color: 'var(--az-navy)', fontWeight: 500 }}>
          Regional liaison offices in San Francisco, London, Zurich, and Singapore.
        </span>
      </div>
    </div>
  );
}

export default ContactInfo;
