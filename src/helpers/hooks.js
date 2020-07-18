import { useRef, useEffect, useState, useContext } from 'react';
import _ from 'lodash';
import { isMobile } from 'react-device-detect';
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

  useEffect(() => {
    setShowMobile(isMobile);
  }, [isMobile]);

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
