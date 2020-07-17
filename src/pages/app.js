import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import MapLoader from '../components/Loader/Loader';
import SEO from '../components/seo';
import AthleteContext from '../contexts/AthleteContext';
import stravaAgents from '../agents/stravaAgents';
import Menu from '../components/Menu/Menu';
import MenuContext from '../contexts/MenuContext';
import { filterActivitiesToDisplay, processActivities } from '../helpers/activityHelpers';
import ActivityContext from '../contexts/ActivityContext';
import Map from '../components/Map';

let Leaflet;

// Fix for Heroku build (Leaflet wants a window object...)
if (typeof window !== 'undefined') {
  Leaflet = require('react-leaflet');
}

const App = () => {
  const { storeHydrated: athleteStoreHydrated, athlete } = useContext(AthleteContext);
  const { activities, setActivities } = useContext(ActivityContext);
  const { options } = useContext(MenuContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (athleteStoreHydrated && athlete.id) {
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
  }, [athleteStoreHydrated, athlete.id]);

  const activitiesToShow = filterActivitiesToDisplay(activities, options);

  return (
    <>
      {isLoading && <MapLoader />}
      <Menu activities={activities} />
      <Layout showMenu={!isLoading}>
        <SEO title="App" />
        <Map activities={activitiesToShow} isLoading={isLoading} />
      </Layout>
    </>
  );
};

export default App;
