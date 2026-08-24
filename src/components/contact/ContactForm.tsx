import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Card, CardContent } from '../common/Card';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name (minimum 2 characters)'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Please enter a subject (minimum 3 characters)'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

function generateReference(subject: string, email: string): string {
  let hash = 0;
  const str = subject + email;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `AZT-${Math.abs(hash % 900000 + 100000)}`;
}

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [referenceId, setReferenceId] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState('submitting');
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 800));
      const ref = generateReference(data.subject, data.email);
      setReferenceId(ref);
      setSubmissionState('success');
      reset();
    } catch {
      setSubmissionState('error');
    }
  };

  const handleReset = () => {
    setSubmissionState('idle');
    reset();
  };

  return (
    <Card className="az-contact-form-card">
      <CardContent>
        {submissionState === 'success' ? (
          <div className="az-contact-success" role="status" aria-live="polite">
            <div className="az-contact-success__icon-wrap">
              <CheckCircle2 size={48} className="az-contact-success__icon" aria-hidden="true" />
            </div>
            <h3 className="az-contact-success__title">Thank You! Message Received</h3>
            <p className="az-body">
              Your inquiry has been successfully routed to the AZTech Conference Secretariat.
            </p>
            <div className="az-contact-success__ref-box">
              <span className="az-caption">Inquiry Reference Number:</span>
              <strong>{referenceId}</strong>
            </div>
            <p className="az-body-sm" style={{ color: 'var(--az-muted)' }}>
              Our conference support coordinator typically responds within 1 to 2 business days.
            </p>
            <Button variant="outline" onClick={handleReset} style={{ marginTop: 'var(--az-space-4)' }}>
              <RefreshCw size={16} aria-hidden="true" />
              <span>Send Another Inquiry</span>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'grid', gap: 'var(--az-space-4)' }}>
            <div>
              <h3 style={{ margin: '0 0 var(--az-space-2)', fontSize: '1.25rem', fontWeight: 750 }}>
                Send Us a Message
              </h3>
              <p className="az-body-sm" style={{ color: 'var(--az-muted)', margin: 0 }}>
                Fill in the details below and our team will get back to you promptly.
              </p>
            </div>

            {submissionState === 'error' && (
              <div className="az-alert az-alert--error" role="alert" style={{ display: 'flex', gap: 'var(--az-space-3)', padding: 'var(--az-space-3) var(--az-space-4)', borderRadius: 'var(--az-radius-md)', background: '#fde5e7', border: '1px solid #f9bdc4', color: 'var(--az-danger)' }}>
                <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Submission Error:</strong> Unable to process message. Please try again.
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--az-space-4)' }}>
              <Input
                label="Full Name"
                placeholder="e.g. Dr. Jane Doe"
                required
                error={errors.fullName?.message}
                {...register('fullName')}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="e.g. jane.doe@university.edu"
                required
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--az-space-4)' }}>
              <Input
                label="Phone Number"
                type="tel"
                placeholder="e.g. +91 98765 43210 (Optional)"
                error={errors.phone?.message}
                {...register('phone')}
              />
              <Input
                label="Subject"
                placeholder="e.g. Inquiry regarding Registration Pass"
                required
                error={errors.subject?.message}
                {...register('subject')}
              />
            </div>

            <Textarea
              label="Message"
              placeholder="Please provide details about your inquiry, conference name, or partnership proposal..."
              required
              rows={5}
              error={errors.message?.message}
              helperText="Minimum 10 characters"
              {...register('message')}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--az-space-2)' }}>
              <Button
                type="submit"
                variant="primary"
                disabled={submissionState === 'submitting'}
                style={{ minWidth: '160px' }}
              >
                {submissionState === 'submitting' ? (
                  <>
                    <Loader2 size={18} className="az-spin-icon" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default ContactForm;
