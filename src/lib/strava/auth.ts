import type { StravaSession } from '@/stores/auth-store';

const AUTHORIZE_URL = 'https://www.strava.com/oauth/authorize';
const SCOPE = 'read,activity:read_all';

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
};

export const getAuthorizeUrl = () => {
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_STRAVA_REDIRECT_URI,
    response_type: 'code',
    approval_prompt: 'auto',
    scope: SCOPE,
  });

  return `${AUTHORIZE_URL}?${params.toString()}`;
};

const toSession = (data: TokenResponse): StravaSession => ({
  accessToken: data.access_token,
  refreshToken: data.refresh_token,
  expiresAt: data.expires_at,
});

export const exchangeCodeForToken = async (code: string): Promise<StravaSession> => {
  const response = await fetch('/.netlify/functions/authenticate', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });

  if (!response.ok) throw new Error('Failed to authenticate with Strava');

  return toSession(await response.json());
};

export const refreshAccessToken = async (refreshToken: string): Promise<StravaSession> => {
  const response = await fetch('/.netlify/functions/refreshToken', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) throw new Error('Failed to refresh Strava token');

  return toSession(await response.json());
};
