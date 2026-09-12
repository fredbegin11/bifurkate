import { getAccessToken } from './session';
import type { StravaActivity, StravaAthlete, StravaRoute } from './types';

const BASE_URL = 'https://www.strava.com/api/v3';
const PAGE_SIZE = 200;
const PARALLEL_PAGES = 4;

const fetchWithToken = (path: string, accessToken: string) =>
  fetch(`${BASE_URL}${path}`, { headers: { Authorization: `Bearer ${accessToken}` } });

const authedFetch = async <T>(path: string): Promise<T> => {
  const accessToken = await getAccessToken();
  let response = await fetchWithToken(path, accessToken);

  if (response.status === 401) {
    response = await fetchWithToken(path, await getAccessToken(accessToken));
  }

  if (!response.ok) throw new Error(`Strava API error: ${response.status}`);

  return response.json();
};

const fetchAllPages = async <T>(path: string): Promise<T[]> => {
  const separator = path.includes('?') ? '&' : '?';
  const results: T[] = [];
  let page = 1;

  while (true) {
    const batches = await Promise.all(
      Array.from({ length: PARALLEL_PAGES }, (_, i) =>
        authedFetch<T[]>(`${path}${separator}per_page=${PAGE_SIZE}&page=${page + i}`),
      ),
    );
    const batch = batches.flat();
    results.push(...batch);
    page += PARALLEL_PAGES;

    if (batch.length < PAGE_SIZE * PARALLEL_PAGES) break;
  }

  return results;
};

export const getProfile = () => authedFetch<StravaAthlete>('/athlete');
export const getAllActivities = () => fetchAllPages<StravaActivity>('/athlete/activities');
export const getAllRoutes = (athleteId: number) => fetchAllPages<StravaRoute>(`/athletes/${athleteId}/routes`);
