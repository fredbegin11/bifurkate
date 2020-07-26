import { useRef, useEffect, useState, useLayoutEffect, useContext } from 'react';
import AthleteContext from '../contexts/AthleteContext';
import ActivityContext from '../contexts/ActivityContext';
import stravaAgents from '../agents/stravaAgents';
import { processActivities } from './activityHelpers';

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
  const { storeHydrated, athlete } = useContext(AthleteContext);
  const { activities, setActivities } = useContext(ActivityContext);

  useEffect(() => {
    if (storeHydrated && athlete.id && _.isEmpty(activities)) {
      setIsLoading(true);

      stravaAgents
        .getAllActivities()
        .then(data => {
          const processedActivities = processActivities(data);
          setActivities(processedActivities);
          setIsLoading(false);
        })
        .catch(_err => {
          setIsLoading(false);
        });
    }
  }, [storeHydrated, athlete.id, activities]);
};
