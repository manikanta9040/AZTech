import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Users, Sparkles, Globe } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { AboutOverview } from '../../components/about/AboutOverview';
import { MissionSection } from '../../components/about/MissionSection';
import { VisionSection } from '../../components/about/VisionSection';
import { ValuesSection } from '../../components/about/ValuesSection';
import { WhatWeDo } from '../../components/about/WhatWeDo';
import { WhyAzTech } from '../../components/home/WhyAzTech';
import { StatisticsSection } from '../../components/home/StatisticsSection';
import { HowItWorks } from '../../components/home/HowItWorks';

export default function About() {
  useEffect(() => {
    document.title = 'About Us | AZTech — Connecting Ideas & Inspiring Innovation';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'AZTech brings researchers, professionals, academics, industry leaders and innovators together through meaningful conferences and knowledge-sharing experiences.'
      );
    }
  }, []);

  return (
    <div className="az-about-page">
      {/* 1. Page Header & Breadcrumbs */}
      <header className="az-page-header" aria-labelledby="about-page-title">
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
                  About
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="az-about-hero" aria-labelledby="about-page-title">
        <div className="az-container">
          <div className="az-about-hero__content">
            <div className="az-about-hero__badge">
              <Badge variant="primary">
                <Globe size={13} style={{ marginRight: '6px' }} aria-hidden="true" />
                Global Conference Management Platform
              </Badge>
            </div>

            <h1 id="about-page-title" className="az-about-hero__title">
              Connecting Ideas. <span className="az-gradient-text">Inspiring Innovation.</span>
            </h1>

            <p className="az-about-hero__description az-body-lg">
              AZTech brings researchers, professionals, academics, industry leaders and innovators together through meaningful conferences and knowledge-sharing experiences.
            </p>

            <div className="az-about-hero__cta-group">
              <Link to="/conferences" className="az-button az-button--primary az-button--lg">
                <span>Explore Conferences</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/speakers" className="az-button az-button--outline az-button--lg">
                <Users size={18} aria-hidden="true" />
                <span>Meet Our Speakers</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About AZTech Overview */}
      <AboutOverview />

      {/* 4. Mission Section */}
      <MissionSection />

      {/* 5. Vision Section */}
      <VisionSection />

      {/* 6. Values Section */}
      <ValuesSection />

      {/* 7. What We Do */}
      <WhatWeDo />

      {/* 8. Why AZTech Advantage */}
      <WhyAzTech />

      {/* 9. Global Statistics */}
      <StatisticsSection />

      {/* 10. How AZTech Works */}
      <HowItWorks />

      {/* 11. CTA Banner */}
      <section className="az-cta-section" aria-labelledby="about-cta-heading">
        <div className="az-container">
          <div className="az-cta-banner">
            <div className="az-cta-banner__glow" aria-hidden="true" />
            <div className="az-cta-banner__content">
              <div className="az-cta-banner__badge">
                <Sparkles size={14} aria-hidden="true" />
                <span>Global Knowledge Network</span>
              </div>
              <h2 id="about-cta-heading" className="az-cta-banner__title">
                Be Part of a Global Knowledge Community
              </h2>
              <p className="az-cta-banner__desc az-body-lg">
                Join thousands of scholars, researchers, and innovative leaders presenting breakthroughs across worldwide AZTech summits.
              </p>
              <div className="az-cta-banner__actions">
                <Link to="/conferences" className="az-button az-button--primary az-button--lg">
                  <span>Explore Conferences</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/register" className="az-button az-button--outline az-button--lg az-cta-banner__btn-alt">
                  <span>Join AZTech</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
