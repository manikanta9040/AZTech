import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import type { Conference, ConferenceFAQItem } from '../../../types/conference';

interface ConferenceFAQProps {
  conference: Conference;
}

export function ConferenceFAQ({ conference }: ConferenceFAQProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const defaultFaqs: ConferenceFAQItem[] = [
    {
      question: 'Who is eligible to attend this conference?',
      answer: `This conference welcomes international researchers, university professors, postgraduate and undergraduate students, R&D professionals, and industry executives interested in ${conference.category}. Both presenting and listening delegates are welcome.`,
    },
    {
      question: 'How do I submit an abstract or research paper?',
      answer: 'You can submit your abstract online via our Submit Abstract portal. Submissions undergo a rigorous double-blind peer-review process conducted by our international Scientific Committee.',
    },
    {
      question: 'What is included in my registration pass?',
      answer: 'Your pass includes full access to all keynote sessions, parallel technical tracks, hands-on workshops, daily networking coffee breaks and lunches, the official conference kit, digital proceedings publication, and a verifiable Certificate of Participation.',
    },
    {
      question: 'Is virtual / online participation supported?',
      answer: 'Yes! Virtual presentation and live streaming access are supported for international authors and delegates unable to travel in person. Virtual presenters receive identical publication indexing and digital certificates.',
    },
    {
      question: 'Will I receive an official Certificate of Participation / Presentation?',
      answer: 'Yes. All registered attendees, oral presenters, and session chairs receive an officially accredited, digitally verifiable certificate with a unique verification ID issued by AZTech.',
    },
    {
      question: 'What is the cancellation and refund policy?',
      answer: 'Full refunds are available up to 30 days prior to the conference start date (less a 10% administrative fee). Registrations can also be transferred to a colleague or deferred to a future AZTech conference at no additional charge.',
    },
  ];

  const faqs = conference.faqs && conference.faqs.length > 0
    ? conference.faqs
    : defaultFaqs;

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="az-conf-section" aria-labelledby="conf-faqs-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <HelpCircle size={22} />
        </div>
        <h2 id="conf-faqs-heading" className="az-conf-section__title">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="az-conf-accordion">
        {faqs.map((faq, idx) => {
          const isOpen = openIndexes.includes(idx);
          const headerId = `faq-header-${idx}`;
          const panelId = `faq-panel-${idx}`;

          return (
            <div
              key={idx}
              className={`az-accordion-item ${isOpen ? 'az-accordion-item--open' : ''}`}
            >
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="az-accordion-item__trigger"
                onClick={() => toggleIndex(idx)}
              >
                <span className="az-accordion-item__question">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`az-accordion-item__arrow ${isOpen ? 'az-accordion-item__arrow--rotated' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className="az-accordion-item__content"
                >
                  <p className="az-body-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ConferenceFAQ;
