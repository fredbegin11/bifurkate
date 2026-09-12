import type { ProcessedActivity, ProcessedRoute } from './process';

export type SelectedItem = {
  id: number;
  kind: 'activity' | 'route';
  type: string | null;
  name: string;
  date: string;
  distance: number;
  elevation: number;
  url: string;
  polyline: [number, number][];
  position: [number, number];
};

export const selectedItemMapper = {
  fromActivity: (activity: ProcessedActivity, position: [number, number]): SelectedItem => ({
    id: activity.id,
    kind: 'activity',
    type: activity.type,
    name: activity.name,
    date: activity.start_date,
    distance: activity.distance,
    elevation: activity.total_elevation_gain,
    url: `https://www.strava.com/activities/${activity.id}`,
    polyline: activity.polyline,
    position,
  }),

  fromRoute: (route: ProcessedRoute, position: [number, number]): SelectedItem => ({
    id: route.id,
    kind: 'route',
    type: null,
    name: route.name,
    date: route.created_at,
    distance: route.distance,
    elevation: route.elevation_gain,
    url: `https://www.strava.com/routes/${route.id_str}`,
    polyline: route.polyline,
    position,
  }),
};
