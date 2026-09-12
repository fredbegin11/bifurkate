import { useQuery } from '@tanstack/react-query';
import { processActivities, processRoutes } from '@/lib/activities/process';
import { getAllActivities, getAllRoutes, getProfile } from '@/lib/strava/api';

export const useAthlete = (enabled: boolean) =>
  useQuery({
    queryKey: ['athlete'],
    queryFn: getProfile,
    enabled,
    staleTime: Number.POSITIVE_INFINITY,
  });

export const useActivities = (enabled: boolean) =>
  useQuery({
    queryKey: ['activities'],
    queryFn: getAllActivities,
    select: processActivities,
    enabled,
    staleTime: Number.POSITIVE_INFINITY,
  });

export const useRoutes = (athleteId: number | undefined, enabled: boolean) =>
  useQuery({
    queryKey: ['routes', athleteId],
    queryFn: () => getAllRoutes(athleteId as number),
    select: processRoutes,
    enabled: enabled && athleteId !== undefined,
    staleTime: Number.POSITIVE_INFINITY,
  });
