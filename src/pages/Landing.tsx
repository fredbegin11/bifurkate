import ActivityMarquee from '@/components/landing/ActivityMarquee';
import CtaSection from '@/components/landing/CtaSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import LandingFooter from '@/components/landing/LandingFooter';

const Landing = () => (
  <main className="min-h-svh bg-background text-foreground">
    <title>Bifurkate — Visualize Your Strava Activities on a Map</title>

    <HeroSection />
    <ActivityMarquee />
    <FeaturesSection />
    <HowItWorksSection />
    <CtaSection />
    <LandingFooter />
  </main>
);

export default Landing;
