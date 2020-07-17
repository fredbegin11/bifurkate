import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { getMedian } from '../helpers/mathHelpers';
import MenuContext from '../contexts/MenuContext';

let Leaflet;

// Fix for Heroku build (Leaflet wants a window object...)
if (typeof window !== 'undefined') {
  Leaflet = require('react-leaflet');
}

const Map = ({ activities, isLoading }) => {
  const { options } = useContext(MenuContext);
  const { polylineColor, polylineWeight, heatMapMode } = options.mapConfig;
  const [selectedActivityId, setSelectedActivityId] = useState([]);
  const [center, setCenter] = useState(null);

  const selectedActivity = activities.find(x => x.id === selectedActivityId);

  useEffect(() => {
    if (!_.isEmpty(activities) && activities.length > 0) {
      const centerLat = getMedian(activities.map(x => _.get(x, 'polyline[0][0]')));
      const centerLong = getMedian(activities.map(x => _.get(x, 'polyline[0][1]')));

      if (centerLat && centerLong) {
        setCenter([centerLat, centerLong]);
      }
    }
  }, [isLoading]);

  return (
    <>
      {typeof window !== 'undefined' && (
        <Leaflet.Map
          preferCanvas={true}
          center={isLoading ? [46.8139, -71.29] : center}
          zoom={isLoading ? 5 : 10}
          zoomControl={false}
          zoomSnap={0.5}
          zoomDelta={0.5}
          minZoom={3}
          onClick={() => setSelectedActivityId(null)}
        >
          <Leaflet.TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          />
          <Leaflet.ScaleControl />
          {activities.map((activity, index) => (
            <Leaflet.Polyline
              onClick={() => setSelectedActivityId(activity.id)}
              key={index}
              positions={activity.polyline}
              color={polylineColor}
              weight={polylineWeight}
              opacity={heatMapMode ? 0.3 : 1}
            >
              <Leaflet.Popup>
                <a href={`https://www.strava.com/activities/${activity.id}`} className="label__subheader --no-margin" target="_blank" rel="noopener noreferrer">
                  {activity.name}
                </a>
                <br />
                Date: {moment(activity.start_date).format('YYYY-MM-DD')}
                <br />
                Distance: {(activity.distance / 1000).toFixed(2)} km
              </Leaflet.Popup>
            </Leaflet.Polyline>
          ))}

          {selectedActivity && <Leaflet.Polyline positions={selectedActivity.polyline} color={'white'} weight={2} opacity={1} />}
        </Leaflet.Map>
      )}
    </>
  );
};

export default Map;
