import type { ProcessedActivity } from './process';

export const getTotalDistanceKm = (activities: ProcessedActivity[]) =>
  Math.round(activities.reduce((sum, a) => sum + a.distance, 0) / 1000);

export const getTotalElevationM = (activities: ProcessedActivity[]) =>
  Math.round(activities.reduce((sum, a) => sum + a.total_elevation_gain, 0));

export const getTotalMovingHours = (activities: ProcessedActivity[]) =>
  Math.floor(activities.reduce((sum, a) => sum + a.moving_time, 0) / 3600);
