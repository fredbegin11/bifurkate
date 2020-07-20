import React, { useContext, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import MapLoader from '../components/Loader/Loader';
import SEO from '../components/seo';
import Menu from '../components/Menu/Menu';
import MenuContext from '../contexts/MenuContext';
import { filterActivitiesToDisplay } from '../helpers/activityHelpers';
import ActivityContext from '../contexts/ActivityContext';
import Map from '../components/Map';
import { useInitData } from '../helpers/hooks';

const App = () => {
  const { activities } = useContext(ActivityContext);
  const { options } = useContext(MenuContext);
  const [isLoading, setIsLoading] = useState(false);

  useInitData({ setIsLoading });

  console.log('activities: ', activities);

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
