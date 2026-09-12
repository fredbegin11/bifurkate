import { ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { useAuthStore } from '@/stores/auth-store';

const GITHUB_URL = 'https://github.com/fredbegin11/bifurkate';

const LandingNav = () => {
  const hasSession = useAuthStore((state) => !!state.session);

  return (
    <nav className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10">
      <img src={logo} alt="Bifurkate" className="h-9 animate-rise" />

      <div className="flex items-center gap-3 animate-rise [animation-delay:150ms]">
        {hasSession && (
          <Link
            to="/app"
            className="hidden items-center gap-2 rounded-full border border-border bg-background/60 px-5 py-2.5 text-base font-semibold text-foreground backdrop-blur transition-colors hover:border-primary/60 hover:bg-primary/10 sm:inline-flex"
          >
            Open the app
            <ArrowRight className="size-5" />
          </Link>
        )}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bifurkate on GitHub"
          className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-foreground"
        >
          <Github className="size-6" />
        </a>
      </div>
    </nav>
  );
};

export default LandingNav;
