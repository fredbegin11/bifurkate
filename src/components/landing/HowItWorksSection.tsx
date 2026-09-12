import { Compass, DownloadCloud, type LucideIcon, ShieldCheck, Unplug } from 'lucide-react';
import Reveal from './Reveal';

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    title: 'Connect with Strava',
    description: 'One click, read-only access. No account to create, no password to remember.',
    icon: Unplug,
  },
  {
    title: 'We fetch your activities',
    description:
      'Every ride, run, walk and hike streams straight from Strava into your browser. Nothing is stored on a server.',
    icon: DownloadCloud,
  },
  {
    title: 'Explore your map',
    description: 'Filter by activity type, season or date range, tweak the look, and spot the roads you never take.',
    icon: Compass,
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="relative overflow-hidden py-16">
    <div className="absolute inset-0 -z-10 grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

    <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
      <Reveal className="mb-14 max-w-2xl">
        <p className="mb-4 text-lg font-bold tracking-widest text-primary uppercase">How it works</p>
        <h2 className="text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
          From Strava to your map in three steps.
        </h2>
      </Reveal>

      <div className="relative grid gap-14 md:grid-cols-3 md:gap-10">
        <svg
          aria-hidden="true"
          className="absolute top-8 right-[16.6%] left-[16.6%] hidden h-1 w-[66.8%] overflow-visible md:block"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="2" x2="100%" y2="2" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="4" />
          <line
            x1="0"
            y1="2"
            x2="100%"
            y2="2"
            stroke="var(--color-primary)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="12 16"
            className="animate-route-dash"
          />
        </svg>

        {STEPS.map((step, index) => (
          <Reveal key={step.title} delay={index * 200} className="relative flex flex-col items-center text-center">
            <div className="relative mb-8 flex size-16 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-[0_0_30px_-4px_var(--color-primary)]">
              <step.icon className="size-7" />
              <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                {index + 1}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
            <p className="mt-3 max-w-sm text-lg leading-relaxed text-muted-foreground">{step.description}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={600} className="mt-14">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/60 p-6 text-center sm:flex-row sm:items-center sm:gap-6 sm:p-8 sm:text-left">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <ShieldCheck className="size-6" />
          </span>
          <p className="text-lg leading-relaxed text-foreground">
            <span className="font-bold">Your data stays yours.</span>{' '}
            <span className="text-muted-foreground">
              Bifurkate is a frontend-only app: activities are fetched from Strava and drawn directly in your browser.
              We never store, sell or even look at them.
            </span>
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default HowItWorksSection;
