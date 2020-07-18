import React, { useContext, useState } from 'react';
import _ from 'lodash';

import ActivityContext from '../contexts/ActivityContext';
import { useInitData } from '../helpers/hooks';
import Layout from '../components/layout';
import StatsCharts from '../components/Charts/StatsCharts';
import SEO from '../components/seo';
import { getAllActivitiesBySeasons } from '../helpers/activityHelpers';
import MapLoader from '../components/Loader/Loader';
import { getFormattedDate } from '../helpers/dateHelpers';
import PropertyTabs from '../components/Stats/PropertyTabs';

const getTotalDistance = activities => Math.round(activities.reduce((accumulator, activity) => accumulator + activity.distance, 0) / 1000);
const getTotalTime = activities => getFormattedDate(activities.reduce((accumulator, activity) => accumulator + activity.moving_time, 0));
const getTotalElevation = activities => Math.round(activities.reduce((accumulator, activity) => accumulator + activity.total_elevation_gain, 0));
const getTotalCalories = activities => Math.round(activities.reduce((accumulator, activity) => accumulator + (activity.kilojoules || 0), 0) / 4.184);

const propertyConfig = {
  'Distance (km)': getTotalDistance,
  'Time (hours)': getTotalTime,
  'Elevation (m)': getTotalElevation,
  'Calories Burned': getTotalCalories,
};

const units = { 'Distance (km)': 'km', 'Time (hours)': 'days', 'Elevation (m)': 'meters', 'Calories Burned': 'calories' };

const App = () => {
  const { activities } = useContext(ActivityContext);

  const activitiesBySeasons = getAllActivitiesBySeasons(activities);
  const seasons = Object.keys(activitiesBySeasons);
  const properties = Object.keys(propertyConfig);

  const [isLoading, setIsLoading] = useState(false);
  const [propertyToDisplay, setPropertyToDisplay] = useState(properties[0]);

  useInitData({ setIsLoading });

  const getChartData = property => {
    return seasons.map(season => {
      const processFunction = propertyConfig[property];
      const value = processFunction(activitiesBySeasons[season]);

      return { season, [property]: value };
    });
  };

  return (
    <>
      {isLoading && <MapLoader />}
      <Layout disableMenu={!isLoading} noMenu>
        <SEO title="Stats" />

        {!isLoading && (
          <div className="layout__content">
            <PropertyTabs activeProperty={propertyToDisplay} properties={properties} onClick={setPropertyToDisplay} />
            <StatsCharts property={propertyToDisplay} unit={units[propertyToDisplay]} data={getChartData(propertyToDisplay)} />
          </div>
        )}
      </Layout>
    </>
  );
};

export default App;
