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

const getTotalDistance = activities => activities.reduce((accumulator, activity) => accumulator + activity.distance, 0) / 1000;
const getTotalTime = activities => getFormattedDate(activities.reduce((accumulator, activity) => accumulator + activity.moving_time, 0));
const getTotalElevation = activities => activities.reduce((accumulator, activity) => accumulator + activity.total_elevation_gain, 0);
const getTotalCalories = activities => activities.reduce((accumulator, activity) => accumulator + (activity.kilojoules || 0), 0) / 4.184;

const propertyConfig = {
  'Distance (km)': getTotalDistance,
  'Time (hours)': getTotalTime,
  'Elevation (m)': getTotalElevation,
  'Calories Burned': getTotalCalories,
};

const App = () => {
  const { activities } = useContext(ActivityContext);
  const [isLoading, setIsLoading] = useState(false);

  useInitData({ setIsLoading });

  const activitiesBySeasons = getAllActivitiesBySeasons(activities);
  const seasons = Object.keys(activitiesBySeasons);
  const properties = Object.keys(propertyConfig);

  const getChartData = property => {
    return seasons.map(season => {
      const processFunction = propertyConfig[property];
      const allValues = seasons.map(x => processFunction(activitiesBySeasons[x]));
      const maxValue = _.max(allValues);

      const fraction = maxValue / 5;
      const ranges = [0, fraction * 6];
      const seasonValue = processFunction(activitiesBySeasons[season]);

      return {
        id: season,
        ranges,
        measures: [seasonValue],
        markers: [],
      };
    });
  };

  return (
    <>
      {isLoading && <MapLoader />}
      <Layout disableMenu={!isLoading} noMenu>
        <SEO title="Stats" />

        {!isLoading && (
          <div className="layout__content">
            {properties.map(property => {
              console.log('getChartData(property): ', getChartData(property));
              return (
                <>
                  <span className="label__header">{property}</span>
                  <div style={{ marginBottom: 50, height: 500 }}>
                    <StatsCharts data={getChartData(property)} />
                  </div>
                </>
              );
            })}
          </div>
        )}
      </Layout>
    </>
  );
};

export default App;
