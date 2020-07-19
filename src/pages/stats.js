import React, { useContext, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';

import ActivityContext from '../contexts/ActivityContext';
import Layout from '../components/layout';
import MapLoader from '../components/Loader/Loader';
import Menu from '../components/Menu/Menu';
import PropertyTabs from '../components/Stats/PropertyTabs';
import SEO from '../components/seo';
import StatsCharts from '../components/Charts/StatsCharts';
import CalendarChart from '../components/Charts/CalendarChart';
import { getAllActivitiesBySeasons } from '../helpers/activityHelpers';
import { getFormattedDate, months } from '../helpers/dateHelpers';
import { useInitData } from '../helpers/hooks';

const getTotalDistance = activities => Math.round(activities.reduce((accumulator, activity) => accumulator + activity.distance, 0) / 1000);
const getTotalTime = activities => getFormattedDate(activities.reduce((accumulator, activity) => accumulator + activity.moving_time, 0));
const getTotalElevation = activities => Math.round(activities.reduce((accumulator, activity) => accumulator + activity.total_elevation_gain, 0));

const propertyConfig = {
  'Distance (km)': getTotalDistance,
  'Time (hours)': getTotalTime,
  'Elevation (m)': getTotalElevation,
  Assiduity: null,
};

const units = { 'Distance (km)': 'km', 'Time (hours)': 'hours', 'Elevation (m)': 'meters' };

const App = () => {
  const { activities } = useContext(ActivityContext);

  const activitiesBySeasons = getAllActivitiesBySeasons(activities);
  const seasons = Object.keys(activitiesBySeasons);
  const properties = Object.keys(propertyConfig);

  const [isLoading, setIsLoading] = useState(false);
  const [propertyToDisplay, setPropertyToDisplay] = useState(properties[0]);

  useInitData({ setIsLoading });

  const getChartData = property =>
    seasons.map(season => {
      const processFunction = propertyConfig[property];
      const value = processFunction(activitiesBySeasons[season]);

      return { season, [property]: value };
    });

  return (
    <>
      {isLoading && <MapLoader />}
      <Menu activities={[]} navigationOnly />
      <Layout disableMenu={!isLoading}>
        <SEO title="Stats" />

        {!isLoading && (
          <div className="layout__content">
            <PropertyTabs activeProperty={propertyToDisplay} properties={properties} onClick={setPropertyToDisplay} />
            {propertyToDisplay !== 'Assiduity' && (
              <StatsCharts colors="white" property={propertyToDisplay} unit={units[propertyToDisplay]} data={getChartData(propertyToDisplay)} />
            )}
            {propertyToDisplay === 'Assiduity' && <CalendarChart activities={activities} nbOfSeasons={seasons.length} />}
          </div>
        )}
      </Layout>
    </>
  );
};

export default App;
