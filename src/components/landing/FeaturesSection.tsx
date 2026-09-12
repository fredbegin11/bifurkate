import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/use-reveal';
import BifurcationIcon from './icons/BifurcationIcon';
import HeatmapIcon from './icons/HeatmapIcon';
import SeasonsIcon from './icons/SeasonsIcon';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';

type Feature = {
  title: string;
  description: string;
  icon: (isActive: boolean) => ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: 'Find some inspiration',
    description:
      'Tired of riding in the same three old routes? Check your ride history and let it inspire you to try new ones!',
    icon: () => <BifurcationIcon />,
  },
  {
    title: 'Visualize your activities',
    description:
      'A powerful visualization tool to analyze your past rides, runs, walks and hikes. Why? Because everyone loves data!',
    icon: () => <HeatmapIcon />,
  },
  {
    title: 'Compare your seasons',
    description: 'Want to see if your riding habit has changed between years? You can filter your rides by seasons!',
    icon: (isActive) => <SeasonsIcon isActive={isActive} />,
  },
];

const FeaturesSection = () => {
  const { ref, isRevealed } = useReveal<HTMLDivElement>(0.15);

  return (
    <section id="features" className="relative mx-auto w-full max-w-6xl scroll-mt-10 px-6 pt-24 pb-16 sm:px-10">
      <Reveal className="mb-12 max-w-2xl">
        <p className="mb-4 text-lg font-bold tracking-widest text-primary uppercase">Why Bifurkate</p>
        <h2 className="text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
          Everything your Strava history has been hiding.
        </h2>
      </Reveal>

      <div ref={ref} className="grid gap-6 md:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 140}>
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col items-center gap-6 p-8 text-center md:items-start md:text-left">
                <div className="h-32 w-full max-w-52 transition-transform duration-500 group-hover:scale-105">
                  {feature.icon(isRevealed)}
                </div>
                <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
