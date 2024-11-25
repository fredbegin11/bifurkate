import { useRef, useEffect, useState, useLayoutEffect, useContext } from 'react';
import _ from 'lodash';
import AthleteContext from '../contexts/AthleteContext';
import ActivityContext from '../contexts/ActivityContext';
import RouteContext from '../contexts/RouteContext';
import stravaAgents from '../agents/stravaAgents';
import { processActivities, processRoutes } from './activityHelpers';
import MenuContext from '../contexts/MenuContext';

export const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export const useIsMobile = () => {
  const [showMobile, setShowMobile] = useState(false);

  useLayoutEffect(() => {
    function updateIsMobile() {
      setShowMobile(typeof window !== 'undefined' && screen.width < 768);
    }

    window.addEventListener('resize', updateIsMobile);
    updateIsMobile();

    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowMobile(screen.width < 768);
    }
  }, [typeof window !== 'undefined' && screen.width]);

  return showMobile;
};

export const useInitData = ({ setIsLoading }) => {
  const [areRoutesLoading, setAreRoutesLoading] = useState(true);
  const [areActivitiesLoading, setAreActivitiesLoading] = useState(true);

  const { options } = useContext(MenuContext);
  const { storeHydrated, athlete } = useContext(AthleteContext);
  const { activities, setActivities } = useContext(ActivityContext);
  const { routes, setRoutes } = useContext(RouteContext);

  useEffect(() => {
    if (storeHydrated && athlete.id && _.isEmpty(activities)) {
      setIsLoading(true);

      stravaAgents
        .getAllRoutes(athlete.id)
        .then(data => setRoutes(processRoutes(data)))
        .finally(() => setAreRoutesLoading(false));

      stravaAgents
        .getAllActivities()
        .then(data => setActivities(processActivities(data)))
        .finally(() => setAreActivitiesLoading(false));
    }
  }, [storeHydrated, athlete.id, activities, routes]);

  useEffect(() => {
    if (options.mapConfig.showRoutes && !areRoutesLoading && !areActivitiesLoading) {
      setIsLoading(false);
    }

    if (!options.mapConfig.showRoutes && !areActivitiesLoading) {
      setIsLoading(false);
    }
  }, [areRoutesLoading, areActivitiesLoading]);
};
