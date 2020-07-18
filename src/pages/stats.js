import React, { useContext, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classNames';

import ActivityContext from '../contexts/ActivityContext';
import { useInitData } from '../helpers/hooks';
import Layout from '../components/layout';
import StatsCharts from '../components/Charts/StatsCharts';
import SEO from '../components/seo';
import { getAllActivitiesBySeasons } from '../helpers/activityHelpers';
import MapLoader from '../components/Loader/Loader';
import { getFormattedDate, months } from '../helpers/dateHelpers';
import PropertyTabs from '../components/Stats/PropertyTabs';
import CalendarChart from '../components/Charts/CalendarChart';

const getTotalDistance = activities => Math.round(activities.reduce((accumulator, activity) => accumulator + activity.distance, 0) / 1000);
const getTotalTime = activities => getFormattedDate(activities.reduce((accumulator, activity) => accumulator + activity.moving_time, 0));
const getTotalElevation = activities => Math.round(activities.reduce((accumulator, activity) => accumulator + activity.total_elevation_gain, 0));

const propertyConfig = {
  'Distance (km)': getTotalDistance,
  'Time (hours)': getTotalTime,
  'Elevation (m)': getTotalElevation,
};

const units = { 'Distance (km)': 'km', 'Time (hours)': 'hours', 'Elevation (m)': 'meters' };

const App = () => {
  const { activities } = useContext(ActivityContext);

  const activitiesBySeasons = getAllActivitiesBySeasons(activities);
  const seasons = Object.keys(activitiesBySeasons);
  const properties = Object.keys(propertyConfig);

  const [isLoading, setIsLoading] = useState(false);
  const [propertyToDisplay, setPropertyToDisplay] = useState(properties[0]);
  const [showMonthly, setShowMonthly] = useState(false);

  useInitData({ setIsLoading });

  const getChartData = property => {
    if (!showMonthly) {
      return seasons.map(season => {
        const processFunction = propertyConfig[property];
        const value = processFunction(activitiesBySeasons[season]);

        return { season, [property]: value };
      });
    }

    return seasons.map(season => {
      const monthsConfig = months.map((month, index) => ({
        label: month,
        range: [moment(`${season}-${_.padStart(index + 1, 2, '0')}-01`), moment(`${season}-${_.padStart(index + 2, 2, '0')}-01`)],
      }));

      const processFunction = propertyConfig[property];
      monthsConfig.forEach((month, index) => {
        const monthlyValue = processFunction(
          activitiesBySeasons[season].filter(x => {
            const activityDate = moment(x.start_date);
            return activityDate.isBefore(month.range[1]) && activityDate.isSameOrAfter(month.range[0]);
          }),
        );

        monthsConfig[index].activities = monthlyValue;
      });

      const result = { season };
      let i;
      for (i = 0; i < monthsConfig.length; i++) {
        const month = monthsConfig[i];
        result[month.label] = month.activities;
      }

      return result;
    });
  };

  return (
    <>
      {isLoading && <MapLoader />}
      <Layout disableMenu={!isLoading} noMenu>
        <SEO title="Stats" />

        {!isLoading && (
          <div className="layout__content">
            <div style={{ paddingBottom: 20 }}>
              <button className={classNames('button', !showMonthly && '--active')} onClick={() => setShowMonthly(false)}>
                Yearly
              </button>
              <button className={classNames('button', showMonthly && '--active')} onClick={() => setShowMonthly(true)}>
                Monthly
              </button>
            </div>
            <PropertyTabs activeProperty={propertyToDisplay} properties={properties} onClick={setPropertyToDisplay} />
            <StatsCharts colors={!showMonthly && 'white'} property={propertyToDisplay} unit={units[propertyToDisplay]} data={getChartData(propertyToDisplay)} />
            <CalendarChart activities={activities} nbOfSeasons={seasons.length} />
          </div>
        )}
      </Layout>
    </>
  );
};

export default App;
