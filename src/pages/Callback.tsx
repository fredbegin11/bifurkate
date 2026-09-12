import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { exchangeCodeForToken } from '@/lib/strava/auth';
import { useAuthStore } from '@/stores/auth-store';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error || !code) {
      navigate('/?error=auth', { replace: true });
      return;
    }

    exchangeCodeForToken(code)
      .then((session) => {
        setSession(session);
        navigate('/app', { replace: true });
      })
      .catch(() => navigate('/?error=auth', { replace: true }));
  }, [searchParams, navigate, setSession]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background text-foreground">
      <title>Connecting&hellip; | Bifurkate</title>
      <p className="text-muted-foreground">Hang on, we&apos;re redirecting you&hellip;</p>
    </main>
  );
};

export default Callback;
