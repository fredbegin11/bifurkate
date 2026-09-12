import { useAuthStore } from '@/stores/auth-store';
import { refreshAccessToken } from './auth';

const EXPIRY_MARGIN_SECONDS = 60;

let inflightRefresh: Promise<string> | null = null;

export const isSessionExpired = (expiresAt: number) => Date.now() / 1000 >= expiresAt - EXPIRY_MARGIN_SECONDS;

const refreshSession = (refreshToken: string) => {
  if (!inflightRefresh) {
    inflightRefresh = refreshAccessToken(refreshToken)
      .then((session) => {
        useAuthStore.getState().setSession(session);
        return session.accessToken;
      })
      .finally(() => {
        inflightRefresh = null;
      });
  }

  return inflightRefresh;
};

export const getAccessToken = async (rejectedToken?: string): Promise<string> => {
  const session = useAuthStore.getState().session;
  if (!session) throw new Error('No Strava session');

  const needsRefresh = isSessionExpired(session.expiresAt) || session.accessToken === rejectedToken;

  return needsRefresh ? refreshSession(session.refreshToken) : session.accessToken;
};
