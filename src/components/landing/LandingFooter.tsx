import { Beer, Github, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import poweredByStrava from '@/assets/powered-by-strava.png';

const GITHUB_URL = 'https://github.com/fredbegin11/bifurkate';

const LINK_CLASS =
  'inline-flex items-center gap-2.5 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground';

const LandingFooter = () => (
  <footer className="border-t border-border bg-card/40">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-16 pb-10 sm:px-10">
      <div className="flex flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex max-w-sm flex-col gap-5">
          <img src={logo} alt="Bifurkate" className="h-9 self-start" />
          <p className="text-lg leading-relaxed text-muted-foreground">
            Every ride, run, walk and hike you ever recorded, on one map. Open source, free, and nothing ever leaves
            your browser.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:gap-x-24">
          <div className="flex flex-col gap-4">
            <p className="text-base font-bold tracking-widest text-foreground uppercase">Project</p>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              <Github className="size-5" />
              GitHub
            </a>
            <Link to="/privacy" className={LINK_CLASS}>
              <ShieldCheck className="size-5" />
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-base font-bold tracking-widest text-foreground uppercase">Say hi</p>
            <a href="mailto:frederic.begin.fb@gmail.com?subject=Bifurkate Feedback" className={LINK_CLASS}>
              <Mail className="size-5" />
              Feedback
            </a>
            <a
              href="https://www.paypal.me/fredbegin11"
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              <Beer className="size-5" />
              Buy me a beer
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-border pt-6 sm:pt-8">
        <p className="text-base text-muted-foreground">&copy; {new Date().getFullYear()} Bifurkate</p>
        <img src={poweredByStrava} alt="Powered by Strava" className="h-7 w-auto sm:h-8" />
      </div>
    </div>
  </footer>
);

export default LandingFooter;
