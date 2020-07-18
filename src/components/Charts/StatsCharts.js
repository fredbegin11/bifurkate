import React from 'react';
import { ResponsiveBullet } from '@nivo/bullet';

const StatsChart = ({ data }) => (
  <ResponsiveBullet
    theme={{ textColor: 'white', fontSize: 16, tooltip: { container: { backgroundColor: 'rgba(0,0,0,0.8)' } } }}
    data={data}
    margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
    spacing={46}
    titleAlign="start"
    titleOffsetX={-70}
    measureSize={0.2}
    animate={true}
    motionStiffness={90}
    motionDamping={12}
    rangeColors="oranges"
  />
);

export default StatsChart;
