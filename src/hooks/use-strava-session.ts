import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, isSessionExpired } from '@/lib/strava/session';
import { useAuthStore } from '@/stores/auth-store';

export const useStravaSession = () => {
  const session = useAuthStore((state) => state.session);
  const clearSession = useAuthStore((state) => state.clearSession);
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const hadSession = useRef(!!session);

  useEffect(() => {
    if (!session) {
      if (hadSession.current) return;
      navigate('/', { replace: true });
      return;
    }
    hadSession.current = true;

    if (!isSessionExpired(session.expiresAt)) {
      setIsReady(true);
      return;
    }

    getAccessToken()
      .then(() => setIsReady(true))
      .catch(() => {
        clearSession();
        navigate('/', { replace: true });
      });
  }, [session, clearSession, navigate]);

  return { isReady };
};
