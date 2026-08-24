import { Star, Quote } from 'lucide-react';
import { mockTestimonials } from '../../data/testimonials';
import { Card, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';

export function Testimonials() {
  return (
    <section className="az-section az-testimonials-section" aria-labelledby="testimonials-heading">
      <div className="az-container">
        <div className="az-section-header az-section-header--center">
          <Badge variant="primary">Community Voices</Badge>
          <h2 id="testimonials-heading" className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
            What Our Participants Say
          </h2>
          <p className="az-body" style={{ color: 'var(--az-muted)', maxWidth: '38rem', marginInline: 'auto' }}>
            Hear from distinguished researchers, keynote speakers, and conference delegates across the globe.
          </p>
        </div>

        <div className="az-testimonials-grid">
          {mockTestimonials.map((t) => (
            <Card key={t.id} className="az-testimonial-card">
              <CardContent className="az-testimonial-card__content">
                <div className="az-testimonial-card__top">
                  <div className="az-testimonial-card__rating" aria-label={`Rating: ${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" aria-hidden="true" />
                    ))}
                  </div>
                  <Quote size={24} className="az-testimonial-card__quote-icon" aria-hidden="true" />
                </div>

                <p className="az-testimonial-card__text az-body-sm">
                  "{t.quote}"
                </p>

                {t.conferenceTitle && (
                  <div className="az-testimonial-card__conf az-caption">
                    Attended: <strong>{t.conferenceTitle}</strong>
                  </div>
                )}

                <div className="az-testimonial-card__author">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="az-testimonial-card__avatar"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="az-testimonial-card__name">{t.name}</h4>
                    <p className="az-testimonial-card__designation az-caption">{t.designation}</p>
                    <p className="az-testimonial-card__org az-caption">{t.organization}, {t.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
