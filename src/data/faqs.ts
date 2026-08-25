export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Registration' | 'Abstract Submission' | 'Speakers' | 'Payments' | 'Certificates' | 'Conferences';
  tags?: string[];
  order?: number;
  status?: 'PUBLISHED' | 'DRAFT';
}

export const FAQ_CATEGORIES = [
  'All',
  'General',
  'Registration',
  'Abstract Submission',
  'Speakers',
  'Payments',
  'Certificates',
  'Conferences',
] as const;

export type FAQCategory = (typeof FAQ_CATEGORIES)[number];

export const mockFAQs: FAQItem[] = [
  // 1. General
  {
    id: 'faq-gen-1',
    question: 'What is AZTech and what is its mission?',
    answer: 'AZTech is a premier global conference management platform connecting researchers, academics, scholars, industry leaders, and innovators worldwide. Our mission is to create meaningful multidisciplinary platforms where cutting-edge knowledge, scientific discovery, and impactful innovation inspire international collaboration across borders.',
    category: 'General',
    tags: ['about', 'mission', 'platform'],
  },
  {
    id: 'faq-gen-2',
    question: 'Who can attend AZTech international conferences?',
    answer: 'AZTech conferences welcome academic professors, research scholars, PhD candidates, postgraduates, corporate R&D professionals, engineers, policy makers, and students interested in technological advancement and cross-domain scientific research.',
    category: 'General',
    tags: ['audience', 'eligibility', 'attendees'],
  },
  {
    id: 'faq-gen-3',
    question: 'Are AZTech conferences hosted in-person or virtually?',
    answer: 'Most AZTech conferences offer hybrid participation formats, enabling delegates to present and attend either on-site in prestigious international host cities or virtually via high-definition interactive streaming portals with real-time Q&A.',
    category: 'General',
    tags: ['hybrid', 'virtual', 'format'],
  },
  {
    id: 'faq-gen-4',
    question: 'How do I contact the organizing committee for a specific conference?',
    answer: 'Each conference details page includes direct email and phone contact links for the designated conference secretariat and program chairs. You can also reach out via our central Contact page at hello@aztech.example.',
    category: 'General',
    tags: ['contact', 'secretariat', 'support'],
  },

  // 2. Registration
  {
    id: 'faq-reg-1',
    question: 'How can I register for an AZTech conference?',
    answer: 'Open the conference details page of your chosen event, review the available registration tiers (Academic, Student, Industry, or Virtual), click "Register Now", fill in attendee details, and complete your secure simulated pass confirmation.',
    category: 'Registration',
    tags: ['register', 'tickets', 'process'],
  },
  {
    id: 'faq-reg-2',
    question: 'What benefits are included with the full conference registration pass?',
    answer: 'A standard full conference pass includes entry to all plenary keynotes and parallel technical sessions, digital access to published conference proceedings with DOI citations, official delegate kits, daily networking coffee breaks, lunch banquets, and a verified Certificate of Attendance or Presentation.',
    category: 'Registration',
    tags: ['inclusions', 'pass benefits', 'materials'],
  },
  {
    id: 'faq-reg-3',
    question: 'Is there a discount available for students and group delegations?',
    answer: 'Yes, AZTech provides discounted registration tiers for bona fide undergraduate and postgraduate students upon verification of institutional IDs. Groups of 5 or more delegates from the same university or organization qualify for group discounts.',
    category: 'Registration',
    tags: ['student discount', 'group rate', 'pricing'],
  },
  {
    id: 'faq-reg-4',
    question: 'Can I transfer my registration pass to a co-author or colleague?',
    answer: 'Yes, registration transfers are permitted up to 14 business days prior to the conference start date. Simply email your conference coordinator with the transfer request and new delegate credentials.',
    category: 'Registration',
    tags: ['transfer', 'delegate swap', 'policy'],
  },

  // 3. Abstract Submission
  {
    id: 'faq-abs-1',
    question: 'What is the procedure for submitting an academic abstract?',
    answer: 'Navigate to the respective conference page and click "Submit Abstract". You will be directed to our structured submission portal where you can enter the title, author affiliations, abstract summary (250–350 words), keywords, and select your preferred presentation format (Oral, Poster, or Virtual).',
    category: 'Abstract Submission',
    tags: ['abstract', 'submission', 'portal'],
  },
  {
    id: 'faq-abs-2',
    question: 'What are the formatting guidelines for abstracts and full papers?',
    answer: 'Abstracts should follow standard scientific formatting with background, methodology, results, and conclusions clearly stated. Full papers must adhere to IEEE/ACM style templates available for download in our author resource guidelines.',
    category: 'Abstract Submission',
    tags: ['formatting', 'guidelines', 'template'],
  },
  {
    id: 'faq-abs-3',
    question: 'How long does the peer-review process take after submission?',
    answer: 'Initial abstract evaluations are conducted by our Scientific Review Committee within 7 to 10 working days. Full paper peer-review typically concludes within 3 to 4 weeks with comprehensive reviewer feedback.',
    category: 'Abstract Submission',
    tags: ['peer review', 'timeline', 'decision'],
  },
  {
    id: 'faq-abs-4',
    question: 'Will accepted papers be published in indexed scientific proceedings?',
    answer: 'Yes, all peer-reviewed and accepted full papers presented at AZTech conferences are published in indexed conference proceedings volumes with distinct DOI assignments and submitted to leading scholarly indexers.',
    category: 'Abstract Submission',
    tags: ['publishing', 'proceedings', 'indexing', 'DOI'],
  },

  // 4. Speakers
  {
    id: 'faq-spk-1',
    question: 'How are keynote and invited speakers selected for AZTech conferences?',
    answer: 'Keynote speakers are nominated and invited by the International Advisory Board based on proven research impact, notable publications, industrial leadership, and pioneering contributions to their scientific fields.',
    category: 'Speakers',
    tags: ['selection', 'keynotes', 'nomination'],
  },
  {
    id: 'faq-spk-2',
    question: 'Can I apply to become a keynote speaker or workshop session lead?',
    answer: 'Distinguished faculty, principal investigators, and recognized industry leaders can submit a Speaker Proposal via our Speakers directory page or by contacting speaker-relations@aztech.example with a CV and proposed keynote abstract.',
    category: 'Speakers',
    tags: ['apply', 'speaker proposal', 'workshop lead'],
  },
  {
    id: 'faq-spk-3',
    question: 'What audiovisual equipment and stage facilities are provided to speakers?',
    answer: 'Standard presentation venues feature 4K projection screens, wireless lavalier/handheld microphones, confidence monitors, laser presentation pointers, and dedicated technical audio-visual support staff.',
    category: 'Speakers',
    tags: ['AV equipment', 'stage', 'technical support'],
  },
  {
    id: 'faq-spk-4',
    question: 'Are keynote sessions recorded and made available for on-demand viewing?',
    answer: 'Yes, with speaker consent, all keynote plenary sessions and featured panels are recorded in high-definition and uploaded to the AZTech Delegate Video Portal for on-demand access by registered attendees.',
    category: 'Speakers',
    tags: ['recordings', 'on-demand', 'video'],
  },

  // 5. Payments
  {
    id: 'faq-pay-1',
    question: 'What payment methods are supported on the AZTech platform?',
    answer: 'AZTech supports all major international credit and debit cards (Visa, MasterCard, American Express), bank wire transfers, SEPA direct transfers, and institutional purchase orders upon request.',
    category: 'Payments',
    tags: ['payment methods', 'credit card', 'wire transfer'],
  },
  {
    id: 'faq-pay-2',
    question: 'Will I receive an official tax invoice and payment receipt?',
    answer: 'Immediately upon completing your payment, an automated official PDF tax invoice bearing your university/corporate details, GST/VAT identifier, and transaction breakdown will be generated and emailed to your registered address.',
    category: 'Payments',
    tags: ['invoice', 'tax receipt', 'reimbursement'],
  },
  {
    id: 'faq-pay-3',
    question: 'What is the AZTech conference cancellation and refund policy?',
    answer: 'Cancellations requested 60+ days before the conference receive a 90% refund (less processing fees). Cancellations between 30 and 59 days receive a 50% refund or a 100% credit toward any future AZTech conference. Within 30 days, fees are non-refundable, but pass transfers are welcomed.',
    category: 'Payments',
    tags: ['refund policy', 'cancellation', 'credit'],
  },
  {
    id: 'faq-pay-4',
    question: 'Is online payment secure on the AZTech platform?',
    answer: 'All transactions are encrypted with 256-bit SSL protocols and processed through PCI-DSS Level 1 compliant financial payment gateways. AZTech never stores raw card or banking credentials on its servers.',
    category: 'Payments',
    tags: ['security', 'SSL', 'encryption'],
  },

  // 6. Certificates
  {
    id: 'faq-cert-1',
    question: 'When and how will I receive my conference participation certificate?',
    answer: 'On-site attendees receive printed and embossed certificates during the closing ceremony. Digital verifications with unique cryptographic serial codes are also delivered via the attendee portal within 48 hours following the event.',
    category: 'Certificates',
    tags: ['certificate', 'delivery', 'digital badge'],
  },
  {
    id: 'faq-cert-2',
    question: 'Can co-authors receive separate presentation certificates?',
    answer: 'Yes, registered co-authors who attend and co-present are eligible for individual presentation certificates specifying their co-authorship and paper contribution.',
    category: 'Certificates',
    tags: ['co-authors', 'presentation certificate'],
  },
  {
    id: 'faq-cert-3',
    question: 'How can universities and employers verify the authenticity of an AZTech certificate?',
    answer: 'Each certificate includes an official QR code and alphanumeric verification token that can be verified instantly at any time via the AZTech Global Credential Verification Portal.',
    category: 'Certificates',
    tags: ['verification', 'authenticity', 'credential'],
  },

  // 7. Conferences
  {
    id: 'faq-cnf-1',
    question: 'In which cities and countries does AZTech host conferences?',
    answer: 'AZTech organizes summits across 50+ global innovation hubs, including San Francisco, Boston, London, Zurich, Singapore, Tokyo, Dubai, Hyderabad, Sydney, and Vancouver.',
    category: 'Conferences',
    tags: ['destinations', 'global venues', 'cities'],
  },
  {
    id: 'faq-cnf-2',
    question: 'Can AZTech provide official visa assistance invitation letters for international delegates?',
    answer: 'Yes, registered and paid international delegates can request an official, signed Visa Support Letter through their conference secretariat to present during consular visa interviews.',
    category: 'Conferences',
    tags: ['visa', 'invitation letter', 'travel'],
  },
  {
    id: 'faq-cnf-3',
    question: 'Are CPD / CME continuing professional education credits awarded for attending?',
    answer: 'Selected engineering, medical, and scientific conferences offer accredited CPD / CME credit hours. Details regarding eligible credit units are listed under the Program & Accreditation section of each event.',
    category: 'Conferences',
    tags: ['CPD', 'CME', 'credits', 'accreditation'],
  },
  {
    id: 'faq-cnf-4',
    question: 'How can an organization sponsor or exhibit at an AZTech conference?',
    answer: 'We offer tailored Platinum, Gold, Silver, and Booth exhibition packages for technology enterprises, publishers, and scientific instrumentation vendors. Inquiries can be submitted via the conference sponsorship liaison.',
    category: 'Conferences',
    tags: ['sponsorship', 'exhibition', 'partnership'],
  },
];
