import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Compass,
  Home,
  Info,
  Calendar,
  Users,
  Mail,
  HelpCircle,
  Camera,
  BookOpen,
  Shield,
  Scale,
  LogIn,
  UserPlus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent } from '../../components/common/Card';

const siteMapGroups = [
  {
    title: 'Main Navigation',
    description: 'Core platform directory and flagship academic programs',
    icon: Compass,
    links: [
      { label: 'Home Page', path: '/', icon: Home, desc: 'Global conference management platform overview' },
      { label: 'About AZTech', path: '/about', icon: Info, desc: 'Mission, vision, core values, and global reach' },
      { label: 'Conferences Directory', path: '/conferences', icon: Calendar, desc: 'Explore 500+ multidisciplinary summits' },
      { label: 'Keynote Speakers', path: '/speakers', icon: Users, desc: 'Meet renowned faculty and industry leaders' },
      { label: 'Contact Us', path: '/contact', icon: Mail, desc: 'Get in touch with conference secretariats' },
    ],
  },
  {
    title: 'Resources & Media',
    description: 'Knowledge base, visual archives, and research publications',
    icon: BookOpen,
    links: [
      { label: 'Frequently Asked Questions', path: '/faq', icon: HelpCircle, desc: 'Answers on registration, abstracts, and passes' },
      { label: 'Conference Photo Gallery', path: '/gallery', icon: Camera, desc: 'Visual moments from global summits and galas' },
      { label: 'Research Blogs & Articles', path: '/blogs', icon: BookOpen, desc: 'Perspectives, peer-review insights, and news' },
    ],
  },
  {
    title: 'Legal & Policies',
    description: 'Compliance, privacy standards, and attendee terms',
    icon: Shield,
    links: [
      { label: 'Privacy Policy', path: '/privacy-policy', icon: Shield, desc: 'Data protection, GDPR rights, and cookie notice' },
      { label: 'Terms of Service', path: '/terms', icon: Scale, desc: 'Registration policies, refunds, and code of conduct' },
    ],
  },
  {
    title: 'Delegate Accounts',
    description: 'Author submission portals and attendee registration',
    icon: UserPlus,
    links: [
      { label: 'Delegate Login', path: '/login', icon: LogIn, desc: 'Access your author dashboard and pass tickets' },
      { label: 'Create Account', path: '/register', icon: UserPlus, desc: 'Register as a delegate, speaker, or scholar' },
    ],
  },
];

export default function Sitemap() {
  useEffect(() => {
    document.title = 'Website Sitemap | AZTech Navigation Directory';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore the complete categorized sitemap for the AZTech Global Conference Management Platform.'
      );
    }
  }, []);

  return (
    <div className="az-sitemap-page">
      {/* 1. Page Header & Breadcrumbs */}
      <header className="az-page-header" aria-labelledby="sitemap-heading">
        <div className="az-container">
          <nav aria-label="Breadcrumb" className="az-breadcrumb">
            <ol className="az-breadcrumb__list">
              <li className="az-breadcrumb__item">
                <Link to="/" className="az-breadcrumb__link">
                  Home
                </Link>
              </li>
              <li className="az-breadcrumb__separator" aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="az-breadcrumb__item">
                <span className="az-breadcrumb__current" aria-current="page">
                  Sitemap
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="az-sitemap-hero" aria-labelledby="sitemap-heading">
        <div className="az-container">
          <div className="az-sitemap-hero__content">
            <div className="az-sitemap-hero__badge">
              <Badge variant="primary">
                <Compass size={13} style={{ marginRight: '6px' }} aria-hidden="true" />
                Navigation Index
              </Badge>
            </div>

            <h1 id="sitemap-heading" className="az-sitemap-hero__title">
              AZTech <span className="az-gradient-text">Website Sitemap</span>
            </h1>

            <p className="az-sitemap-hero__description az-body-lg">
              Quick index and direct access to all public sections, conference directories, research articles, visual galleries, and legal policies.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Categorized Sitemap Cards */}
      <section className="az-section az-sitemap-main-section">
        <div className="az-container">
          <div className="az-sitemap-grid">
            {siteMapGroups.map((group) => {
              const GroupIcon = group.icon;
              return (
                <Card key={group.title} className="az-sitemap-card">
                  <CardContent>
                    <div className="az-sitemap-card__header">
                      <div className="az-sitemap-card__icon-wrap">
                        <GroupIcon size={22} aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="az-sitemap-card__title">{group.title}</h2>
                        <p className="az-sitemap-card__desc az-caption">{group.description}</p>
                      </div>
                    </div>

                    <ul className="az-sitemap-list" role="list">
                      {group.links.map((link) => {
                        const ItemIcon = link.icon;
                        return (
                          <li key={link.path} className="az-sitemap-item">
                            <Link to={link.path} className="az-sitemap-link">
                              <ItemIcon size={16} className="az-sitemap-link__icon" aria-hidden="true" />
                              <div className="az-sitemap-link__text">
                                <span className="az-sitemap-link__label">{link.label}</span>
                                <span className="az-sitemap-link__sub az-caption">{link.desc}</span>
                              </div>
                              <ArrowRight size={14} className="az-sitemap-link__arrow" aria-hidden="true" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="az-cta-section" aria-labelledby="sitemap-cta-heading">
        <div className="az-container">
          <div className="az-cta-banner">
            <div className="az-cta-banner__glow" aria-hidden="true" />
            <div className="az-cta-banner__content">
              <div className="az-cta-banner__badge">
                <Sparkles size={14} aria-hidden="true" />
                <span>Ready to Explore?</span>
              </div>
              <h2 id="sitemap-cta-heading" className="az-cta-banner__title">
                Find Your Next Academic Summit
              </h2>
              <p className="az-cta-banner__desc az-body-lg">
                Browse upcoming international conferences by topic, country, or presentation tier.
              </p>
              <div className="az-cta-banner__actions">
                <Link to="/conferences" className="az-button az-button--primary az-button--lg">
                  <span>Explore Conferences</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/speakers" className="az-button az-button--outline az-button--lg az-cta-banner__btn-alt">
                  <span>Meet Our Keynote Speakers</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
