import { ResponsiveCalendarCanvas } from '@nivo/calendar';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { useIsMobile } from '../../helpers/hooks';

const CalendarChart = ({ activities, nbOfSeasons }) => {
  const isMobile = useIsMobile();

  const sortedActivities = _.orderBy(activities, activity => moment(activity.start_date).format('YYYY-MM-DD'));
  const firstActivity = _.first(sortedActivities) || {};
  const minDate = moment(firstActivity.start_date).format('YYYY-MM-DD');
  const maxDate = moment().format('YYYY-MM-DD');

  const data = sortedActivities.map(activity => ({
    day: moment(activity.start_date).format('YYYY-MM-DD'),
    value: Math.round(activity.distance / 100) / 10,
  }));

  return (
    <div className="chart" style={{ height: nbOfSeasons * 150 }}>
      <ResponsiveCalendarCanvas
        theme={{ textColor: 'white', fontSize: 16, tooltip: { container: { backgroundColor: 'rgba(0,0,0,0.8)' } } }}
        data={data}
        align="left"
        from={minDate}
        to={maxDate}
        emptyColor="transparent"
        colors={[
          'rgba(255, 75, 0, 0.3)',
          'rgba(255, 75, 0, 0.4)',
          'rgba(255, 75, 0, 0.5)',
          'rgba(255, 75, 0, 0.6)',
          'rgba(255, 75, 0, 0.7)',
          'rgba(255, 75, 0, 0.8)',
          'rgba(255, 75, 0, 0.9)',
          'rgba(255, 75, 0, 1)',
        ]}
        margin={{ top: 100, right: 20, bottom: 0, left: 20 }}
        yearSpacing={45}
        monthBorderColor="#000"
        dayBorderWidth={2}
        dayBorderColor="#000"
        tooltipFormat={value => `${value} km`}
        isInteractive={!isMobile}
      />
    </div>
  );
};
export default CalendarChart;
