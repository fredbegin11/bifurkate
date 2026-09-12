import { ArrowDown, ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useParallax } from '@/hooks/use-parallax';
import ConnectWithStrava from './ConnectWithStrava';
import LandingNav from './LandingNav';
import RouteCanvas from './RouteCanvas';

const HEADLINE_WORDS = ['Find', 'some', 'inspiration!'];

const HeroSection = () => {
  const [searchParams] = useSearchParams();
  const hasAuthError = searchParams.get('error') === 'auth';
  const sectionRef = useRef<HTMLElement>(null);
  const backdropRef = useParallax<HTMLDivElement>(sectionRef);
  const isWide = useMediaQuery('(min-width: 1024px)');

  return (
    <section ref={sectionRef} className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background">
      <div
        ref={backdropRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 scale-[1.08] transition-transform duration-700 ease-out"
      >
        <div className="absolute inset-0 grid-pattern" />
        <RouteCanvas originX={isWide ? 0.68 : 0.5} originY={isWide ? 0.5 : 0.32} className="size-full" />
      </div>

      <div className="absolute inset-0 z-[1] bg-background/75 lg:bg-linear-to-r lg:from-background lg:via-background/75 lg:to-transparent lg:bg-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-48 bg-linear-to-b from-transparent to-background" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-background)_100%)] opacity-70" />

      <LandingNav />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-32 pb-24 sm:px-10">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-base font-semibold text-foreground animate-rise [animation-delay:100ms]">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            Powered by Strava
            <span aria-hidden="true" className="h-4 w-px bg-primary/50" />
            Free forever
          </p>

          <h1 className="text-5xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {HEADLINE_WORDS.map((word, index) => (
              <span
                key={word}
                style={{ animationDelay: `${250 + index * 120}ms` }}
                className={
                  index === HEADLINE_WORDS.length - 1
                    ? 'inline-block bg-linear-to-r from-primary via-orange-400 to-amber-300 bg-clip-text text-transparent animate-rise'
                    : 'mr-[0.28em] inline-block animate-rise'
                }
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground animate-rise [animation-delay:650ms] sm:text-xl">
            Like the saying goes, you need to know where you&apos;ve been to know where you&apos;re going. If you find
            yourself tired of riding the same old routes or running the same old path, don&apos;t worry, you&apos;re not
            alone.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground animate-rise [animation-delay:780ms] sm:text-xl">
            Log in with the button right below to visualize where you tend to go and let it inspire you to go somewhere
            new!
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 animate-rise [animation-delay:920ms]">
            <ConnectWithStrava />
            <a
              href="#features"
              className="group inline-flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-primary"
            >
              See how it works
              <ChevronDown className="size-5 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>

          {hasAuthError && (
            <p
              role="alert"
              className="mt-6 inline-block rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-base font-semibold text-destructive animate-in fade-in slide-in-from-bottom-2"
            >
              We couldn&apos;t connect to Strava. Please try again.
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-rise [animation-delay:1400ms] sm:block">
        <a
          href="#features"
          aria-label="Scroll down"
          className="block text-muted-foreground animate-scroll-cue hover:text-foreground"
        >
          <ArrowDown className="size-8" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
