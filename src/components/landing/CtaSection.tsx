import ConnectWithStrava from './ConnectWithStrava';
import Reveal from './Reveal';

const CtaSection = () => (
  <section id="cta" className="mx-auto w-full max-w-6xl px-6 pt-8 pb-20 sm:px-10">
    <Reveal>
      <div className="relative">
        <div className="glow-ring absolute -inset-1 rounded-[28px] opacity-60 blur-xl animate-glow-spin" />
        <div className="relative overflow-hidden rounded-3xl bg-border p-px">
          <div className="glow-ring absolute inset-0 animate-glow-spin" />
          <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[23px] bg-card px-8 py-12 sm:px-12 md:flex-row md:items-center">
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
                Still not convinced? Give it a try, it&apos;s free!
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                No account to create, nothing to install. Connect and start exploring in seconds.
              </p>
            </div>
            <ConnectWithStrava className="relative" />
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

export default CtaSection;
