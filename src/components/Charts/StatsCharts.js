import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { months } from '../../helpers/dateHelpers';
import { useIsMobile } from '../../helpers/hooks';

const StatsChart = ({ colors, data, unit, property }) => {
  const isMobile = useIsMobile();

  return (
    <div className="chart">
      <span className="label__header">{property}</span>
      <ResponsiveBar
        animate={true}
        colors={colors || { scheme: 'red_grey' }}
        data={data}
        enableGridY={false}
        indexBy="season"
        keys={[property, ...months]}
        labelFormat={() => ''}
        labelTextColor="black"
        layout={!isMobile ? 'horizontal' : 'vertical'}
        margin={{ top: 0, right: 70, bottom: 50, left: 70 }}
        padding={0.3}
        theme={{ textColor: 'white', fontSize: 16, tooltip: { container: { backgroundColor: 'rgba(0,0,0,0.8)' } } }}
        tooltipFormat={value => `${value} ${unit}`}
        direction={isMobile ? 'vertical' : 'horizontal'}
        isInteractive={!isMobile}
      />
    </div>
  );
};

export default StatsChart;
