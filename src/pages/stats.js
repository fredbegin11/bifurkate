import React, { useContext, useState } from 'react';

import ActivityContext from '../contexts/ActivityContext';
import { useInitData } from '../helpers/hooks';
import Layout from '../components/layout';
import StatsCharts from '../components/Charts/StatsCharts';
import StatsRadarChart from '../components/Charts/StatsRadarChart';
import SEO from '../components/seo';
import { getAllActivitiesBySeasons } from '../helpers/activityHelpers';
import MapLoader from '../components/Loader/Loader';

const getFormattedDate = totalSeconds => {
  const hours = Math.floor(totalSeconds / 3600);

  return `${hours} hours`;
};

const App = () => {
  const { activities } = useContext(ActivityContext);
  const [isLoading, setIsLoading] = useState(false);

  useInitData({ setIsLoading });

  const activitiesBySeasons = getAllActivitiesBySeasons(activities);

  const properties = ['Distance (km)', 'Time (hours)', 'Elevation (m)', 'Calories Burned'];

  const getValues = activities => ({
    'Distance (km)': (activities.reduce((accumulator, activity) => accumulator + activity.distance, 0) / 1000).toFixed(0),
    'Time (hours)': getFormattedDate(activities.reduce((accumulator, activity) => accumulator + activity.moving_time, 0)),
    // 'Time (hours)': activities.reduce((accumulator, activity) => accumulator + activity.moving_time, 0),
    'Elevation (m)': activities.reduce((accumulator, activity) => accumulator + activity.total_elevation_gain, 0).toFixed(0),
    'Calories Burned': (activities.reduce((accumulator, activity) => accumulator + (activity.kilojoules || 0), 0) / 4.184).toFixed(0),
  });

  const seasons = Object.keys(activitiesBySeasons);

  const getChartData = season => {
    const values = getValues(activitiesBySeasons[season]);

    return Object.keys(values).map(key => {
      const value = values[key];
      const fraction = value / 5;
      const ranges = [0, 1, 2, 3, fraction, fraction * 2, fraction * 3, fraction * 4, value];

      return {
        id: key,
        ranges,
        measures: [value],
        markers: [],
      };
    });
  };

  const getRadarData = () =>
    properties.map(property => {
      return {
        property,
        ...getValues(activitiesBySeasons[season]),
      };
    });

  return (
    <>
      {isLoading && <MapLoader />}
      <Layout disableMenu={!isLoading} noMenu>
        <SEO title="Stats" />

        <div className="layout__content">
          {!isLoading &&
            seasons.map(season => (
              <>
                <span className="label__header">{season}</span>
                <div style={{ marginBottom: 50, height: 500 }}>
                  <StatsCharts data={getChartData(season)} />
                </div>
              </>
            ))}
        </div>

        {!isLoading && (
          <div style={{ marginBottom: 50, height: 500 }}>
            <StatsRadarChart keys={seasons} data={getRadarData()} />
          </div>
        )}
      </Layout>
    </>
  );
};

export default App;
