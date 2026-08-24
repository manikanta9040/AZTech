import { useEffect } from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { ConferenceSearchSection } from '../../components/home/ConferenceSearchSection';
import { UpcomingConferences } from '../../components/home/UpcomingConferences';
import { FeaturedConferences } from '../../components/home/FeaturedConferences';
import { ConferenceCategories } from '../../components/home/ConferenceCategories';
import { WhyAzTech } from '../../components/home/WhyAzTech';
import { StatisticsSection } from '../../components/home/StatisticsSection';
import { FeaturedSpeakers } from '../../components/home/FeaturedSpeakers';
import { HowItWorks } from '../../components/home/HowItWorks';
import { Testimonials } from '../../components/home/Testimonials';
import { CTASection } from '../../components/home/CTASection';
import { NewsletterSection } from '../../components/home/NewsletterSection';

export default function Home() {
  useEffect(() => {
    document.title = 'AZTech | Global Conferences & Events';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'AZTech connects researchers, professionals, academics and industry leaders through global conferences and knowledge-sharing events.'
      );
    }
  }, []);

  return (
    <div className="az-home-page">
      <HeroSection />
      <ConferenceSearchSection />
      <UpcomingConferences />
      <FeaturedConferences />
      <ConferenceCategories />
      <WhyAzTech />
      <StatisticsSection />
      <FeaturedSpeakers />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <NewsletterSection />
    </div>
  );
}
