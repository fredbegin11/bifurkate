import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

const MyResponsiveRadar = ({ data, keys }) => (
  <ResponsiveRadar
    theme={{ textColor: 'white', fontSize: 16, tooltip: { container: { backgroundColor: 'rgba(0,0,0,0.8)' } } }}
    data={data}
    keys={keys}
    indexBy="property"
    maxValue="auto"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    curve="linearClosed"
    borderWidth={2}
    borderColor={{ from: 'color' }}
    gridLevels={5}
    gridShape="circular"
    gridLabelOffset={36}
    enableDots={true}
    dotSize={10}
    dotColor={{ theme: 'background' }}
    dotBorderWidth={2}
    dotBorderColor={{ from: 'color' }}
    enableDotLabel={true}
    dotLabel="value"
    dotLabelYOffset={-12}
    colors={{ scheme: 'nivo' }}
    fillOpacity={0.25}
    blendMode="multiply"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    isInteractive={true}
    legends={[
      {
        anchor: 'top-left',
        direction: 'column',
        translateX: -50,
        translateY: -40,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: '#999',
        symbolSize: 12,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
);
export default MyResponsiveRadar;
