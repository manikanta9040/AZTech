import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Badge } from '../common/Badge';

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterSection() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulate async submission locally
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubscribedEmail(data.email);
    setIsSubscribed(true);
    reset();
  };

  const handleReset = () => {
    setIsSubscribed(false);
    setSubscribedEmail('');
  };

  return (
    <section className="az-section az-newsletter-section" aria-labelledby="newsletter-heading">
      <div className="az-container">
        <div className="az-newsletter-card">
          <div className="az-newsletter-card__content">
            <Badge variant="primary">Newsletter</Badge>
            <h2 id="newsletter-heading" className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
              Stay Updated With AZTech
            </h2>
            <p className="az-body" style={{ color: 'var(--az-muted)', maxWidth: '36rem' }}>
              Receive updates about upcoming conferences, registration deadlines, early bird discounts, and important scientific announcements.
            </p>

            {isSubscribed ? (
              <div className="az-newsletter-success" role="status" aria-live="polite">
                <CheckCircle2 size={24} className="az-newsletter-success__icon" aria-hidden="true" />
                <div>
                  <h4 style={{ margin: 0 }}>Thank you for subscribing!</h4>
                  <p className="az-body-sm" style={{ margin: '4px 0 0', color: 'var(--az-muted)' }}>
                    A confirmation has been recorded for <strong>{subscribedEmail}</strong>. You will receive our monthly conference digests.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="az-button az-button--ghost az-button--sm"
                  style={{ marginLeft: 'auto' }}
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="az-newsletter-form"
                noValidate
              >
                <div className="az-newsletter-field">
                  <div className="az-input-with-icon">
                    <Mail size={18} className="az-input-icon" aria-hidden="true" />
                    <input
                      type="email"
                      className={`az-input az-input--has-icon ${errors.email ? 'az-input--error' : ''}`}
                      placeholder="Enter your academic or corporate email..."
                      aria-label="Email address for conference newsletter"
                      disabled={isSubmitting}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <span className="az-error" role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="az-button az-button--primary az-newsletter-submit-btn"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="az-spin-icon" aria-hidden="true" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="az-caption" style={{ color: 'var(--az-muted)', marginTop: 'var(--az-space-3)' }}>
              We respect your privacy. Unsubscribe at any time with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
