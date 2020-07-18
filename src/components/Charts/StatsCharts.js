import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { months } from '../../helpers/dateHelpers';

const StatsChart = ({ colors, data, unit, property }) => (
  <div style={{ marginBottom: 50, height: 400 }}>
    <ResponsiveBar
      animate={true}
      colors={colors || { scheme: 'red_grey' }}
      data={data}
      enableGridY={false}
      indexBy="season"
      keys={[property, ...months]}
      labelFormat={() => ''}
      labelTextColor="black"
      layout="horizontal"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      theme={{ textColor: 'white', fontSize: 16, tooltip: { container: { backgroundColor: 'rgba(0,0,0,0.8)' } } }}
      tooltipFormat={value => `${value} ${unit}`}
    />
  </div>
);

export default StatsChart;
