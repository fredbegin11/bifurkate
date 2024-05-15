import React, { useContext, useState } from 'react';

import Layout from '../components/layout';
import MapLoader from '../components/Loader/Loader';
import SEO from '../components/seo';
import Menu from '../components/Menu/Menu';
import MenuContext from '../contexts/MenuContext';
import { filterActivitiesToDisplay } from '../helpers/activityHelpers';
import ActivityContext from '../contexts/ActivityContext';

import { useInitData } from '../helpers/hooks';
import Map from '../components/Map/Map';
import RouteContext from '../contexts/RouteContext';

const App = () => {
  const { activities } = useContext(ActivityContext);
  const { routes } = useContext(RouteContext);
  const { options } = useContext(MenuContext);
  const [isLoading, setIsLoading] = useState(false);

  useInitData({ setIsLoading });

  const activitiesToShow = filterActivitiesToDisplay(activities, options);

  return (
    <>
      {isLoading && <MapLoader />}
      <Menu activities={activities} shownActivities={activitiesToShow} />
      <Layout showMenu={!isLoading}>
        <SEO title="App" />
        <Map routes={routes} activities={activitiesToShow} isLoading={isLoading} />
      </Layout>
    </>
  );
};

export default App;
