import { lazy, Suspense, useEffect, useMemo, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import RouteLoader from '@/components/RouteLoader';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/use-logout';
import { useActivities, useAthlete, useRoutes } from '@/hooks/use-strava-data';
import { useStravaSession } from '@/hooks/use-strava-session';
import { getAllActivityTypes, getAllSeasons } from '@/lib/activities/activity-types';
import { filterActivities } from '@/lib/activities/filter';
import { useFilterStore } from '@/stores/filter-store';
import { useUiStore } from '@/stores/ui-store';

const MapView = lazy(() => import('@/components/map/MapView'));
const Sidebar = lazy(() => import('@/components/sidebar/Sidebar'));

const LARGE_SCREEN_QUERY = '(min-width: 1024px)';

const AppPage = () => {
  const { isReady } = useStravaSession();
  const handleLogout = useLogout();
  const {
    data: athlete,
    isLoading: athleteLoading,
    isLoadingError: athleteError,
    refetch: refetchAthlete,
  } = useAthlete(isReady);
  const {
    data: activitiesData,
    isLoading: activitiesLoading,
    isLoadingError: activitiesError,
    refetch: refetchActivities,
  } = useActivities(isReady);
  const {
    data: routesData,
    isLoading: routesLoading,
    isLoadingError: routesError,
    refetch: refetchRoutes,
  } = useRoutes(athlete?.id, isReady);

  const activities = activitiesData ?? [];
  const routes = routesData ?? [];
  const isLoadingData = athleteLoading || activitiesLoading || routesLoading;
  const hasError = athleteError || activitiesError || routesError;

  const activityTypes = useFilterStore((state) => state.activityTypes);
  const seasons = useFilterStore((state) => state.seasons);
  const dateRange = useFilterStore((state) => state.dateRange);
  const initialize = useFilterStore((state) => state.initialize);
  const openMenu = useUiStore((state) => state.openMenu);
  const closeMenu = useUiStore((state) => state.closeMenu);
  const hasAutoOpenedMenu = useRef(false);

  useEffect(() => {
    if (activities.length > 0) {
      initialize(getAllActivityTypes(activities), getAllSeasons(activities));
    }
  }, [activities, initialize]);

  useEffect(() => {
    if (!isReady || isLoadingData) {
      closeMenu();
      return;
    }

    if (hasAutoOpenedMenu.current) return;
    hasAutoOpenedMenu.current = true;

    if (window.matchMedia(LARGE_SCREEN_QUERY).matches) openMenu();
  }, [isReady, isLoadingData, openMenu, closeMenu]);

  const shownActivities = useMemo(
    () => filterActivities(activities, { activityTypes, seasons, dateRange }),
    [activities, activityTypes, seasons, dateRange],
  );

  if (!isReady) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background text-foreground">
        <title>App | Bifurkate</title>
        <RouteLoader label="Hang on, we're signing you in" />
      </main>
    );
  }

  const handleRetry = () => {
    refetchAthlete();
    refetchActivities();
    if (athlete) refetchRoutes();
  };

  return (
    <div className="relative h-svh w-full">
      <title>App | Bifurkate</title>
      <Suspense fallback={null}>
        <MapView activities={shownActivities} routes={routes} />
      </Suspense>
      <Navbar athlete={athlete} menuDisabled={isLoadingData} />
      <Suspense fallback={null}>
        <Sidebar shownActivities={shownActivities} activityCount={activities.length} routeCount={routes.length} />
      </Suspense>

      {hasError ? (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-background/90 px-6 text-center">
          <p className="text-lg font-semibold text-foreground">Something went wrong fetching your Strava data.</p>
          <div className="flex gap-3">
            <Button onClick={handleRetry}>Try again</Button>
            <Button variant="outline" onClick={handleLogout}>
              Log in again
            </Button>
          </div>
        </div>
      ) : (
        isLoadingData && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm">
            <RouteLoader label="Hang on, we're fetching your activities" />
          </div>
        )
      )}
    </div>
  );
};

export default AppPage;
