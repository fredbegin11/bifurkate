import polyline from '@mapbox/polyline';
import type { StravaActivity, StravaRoute } from '@/lib/strava/types';

export type ProcessedActivity = StravaActivity & { polyline: [number, number][]; year: number };
export type ProcessedRoute = StravaRoute & { polyline: [number, number][] };

const getLocalYear = (isoDateLocal: string) => Number(isoDateLocal.slice(0, 4));

const decodePolyline = (encoded: string | null | undefined): [number, number][] | null => {
  if (!encoded) return null;

  try {
    return polyline.decode(encoded);
  } catch {
    return null;
  }
};

const isProcessed = <T extends { polyline: [number, number][] | null }>(
  item: T,
): item is T & { polyline: [number, number][] } => item.polyline !== null;

export const processActivities = (activities: StravaActivity[]): ProcessedActivity[] =>
  activities
    .filter((activity) => !activity.type.includes('Virtual'))
    .map((activity) => ({
      ...activity,
      polyline: decodePolyline(activity.map?.summary_polyline),
      year: getLocalYear(activity.start_date_local),
    }))
    .filter(isProcessed)
    .reverse();

export const processRoutes = (routes: StravaRoute[]): ProcessedRoute[] =>
  routes
    .map((route) => ({ ...route, polyline: decodePolyline(route.map?.summary_polyline) }))
    .filter(isProcessed)
    .reverse();
