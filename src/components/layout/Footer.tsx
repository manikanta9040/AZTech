import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '../../constants/app';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About AZTech', href: '/about' },
  { label: 'Upcoming Conferences', href: '/conferences' },
  { label: 'Keynote Speakers', href: '/speakers' },
  { label: 'Contact Us', href: '/contact' },
];

const resourceLinks = [
  { label: 'Frequently Asked Questions', href: '/faq' },
  { label: 'Research Blogs & News', href: '/blogs' },
  { label: 'Conference Photo Gallery', href: '/gallery' },
  { label: 'Website Sitemap', href: '/sitemap' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
];

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Twitter / X', icon: XIcon, href: 'https://twitter.com' },
  { label: 'LinkedIn', icon: LinkedInIcon, href: 'https://linkedin.com' },
  { label: 'Facebook', icon: FacebookIcon, href: 'https://facebook.com' },
  { label: 'YouTube', icon: YouTubeIcon, href: 'https://youtube.com' },
  { label: 'GitHub', icon: GitHubIcon, href: 'https://github.com' },
];

export function Footer() {
  return (
    <footer className="az-footer" role="contentinfo">
      <div className="az-container az-footer__grid">
        {/* Brand & About Column */}
        <div className="az-footer__brand">
          <Link className="az-logo" to="/" aria-label="AZTech Home" style={{ color: '#ffffff' }}>
            AZ<span>Tech</span>
          </Link>
          <p className="az-footer__tagline">{APP_TAGLINE}</p>
          <p className="az-body-sm" style={{ color: '#9bb0c6', maxWidth: '22rem', marginTop: 'var(--az-space-3)' }}>
            AZTech is a premier international conference platform connecting researchers, academics, innovators, and industry leaders through global knowledge-sharing events.
          </p>
          <div className="az-footer__socials" style={{ display: 'flex', gap: 'var(--az-space-3)', marginTop: 'var(--az-space-4)' }}>
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="az-footer__social-link"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <section>
          <h3>Quick Links</h3>
          <div className="az-footer__links">
            {quickLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Resources Column */}
        <section>
          <h3>Resources</h3>
          <div className="az-footer__links">
            {resourceLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Contact Info Column */}
        <section>
          <h3>Global Contact</h3>
          <div className="az-footer__contact" style={{ display: 'grid', gap: 'var(--az-space-3)' }}>
            <div style={{ display: 'flex', gap: 'var(--az-space-2)', alignItems: 'flex-start' }}>
              <Mail size={16} style={{ color: 'var(--az-primary)', flexShrink: 0, marginTop: '3px' }} />
              <span className="az-body-sm">contact@aztechconferences.org</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--az-space-2)', alignItems: 'flex-start' }}>
              <Phone size={16} style={{ color: 'var(--az-primary)', flexShrink: 0, marginTop: '3px' }} />
              <span className="az-body-sm">+1 (800) 555-AZTECH</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--az-space-2)', alignItems: 'flex-start' }}>
              <MapPin size={16} style={{ color: 'var(--az-primary)', flexShrink: 0, marginTop: '3px' }} />
              <span className="az-body-sm">Tech Hub Plaza, San Francisco & Hyderabad</span>
            </div>
          </div>
        </section>
      </div>

      <div className="az-container az-footer__bottom">
        <span>© {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.</span>
        <div style={{ display: 'flex', gap: 'var(--az-space-4)' }}>
          {legalLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
