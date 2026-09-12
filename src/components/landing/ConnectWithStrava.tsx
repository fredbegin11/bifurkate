import { cn } from 'cn';
import connectWithStrava from '@/assets/strava-connect-button.png';
import { getAuthorizeUrl } from '@/lib/strava/auth';

type ConnectWithStravaProps = {
  className?: string;
};

const ConnectWithStrava = ({ className }: ConnectWithStravaProps) => (
  <a
    href={getAuthorizeUrl()}
    className={cn(
      'group relative inline-flex shrink-0 rounded-md outline-none transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-ring/60 motion-reduce:hover:translate-y-0',
      className,
    )}
  >
    <span
      aria-hidden="true"
      className="absolute -inset-1.5 rounded-lg bg-primary/40 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
    />
    <img src={connectWithStrava} alt="Connect with Strava" className="relative h-12 w-auto rounded-md shadow-lg" />
  </a>
);

export default ConnectWithStrava;
