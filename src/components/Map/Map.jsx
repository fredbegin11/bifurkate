import React, { useEffect, useState, useRef, useContext } from 'react';
import { withLeaflet } from 'react-leaflet';
import PrintControlDefault from 'react-leaflet-easyprint';
import _ from 'lodash';
import { getMedian } from '../../helpers/mathHelpers';
import PolylineActivity from './PolylineActivity';

import MenuContext from '../../contexts/MenuContext';

let Leaflet;

// Fix for Heroku build (Leaflet wants a window object...)
if (typeof window !== 'undefined') {
  Leaflet = require('react-leaflet');
}

const PrintControl = withLeaflet(PrintControlDefault);

const Map = ({ activities, isLoading }) => {
  const { setPrintControlRef } = useContext(MenuContext);
  const printControlRef = useRef();
  const [selectedActivityId, setSelectedActivityId] = useState([]);
  const [center, setCenter] = useState([46.8139, -71.29]);

  useEffect(() => {
    if (!_.isEmpty(activities) && activities.length > 0) {
      const centerLat = getMedian(activities.map(x => _.get(x, 'polyline[0][0]')));
      const centerLong = getMedian(activities.map(x => _.get(x, 'polyline[0][1]')));

      if (centerLat && centerLong) {
        setCenter([centerLat, centerLong]);
      }

      setPrintControlRef(printControlRef);
    }
  }, [isLoading]);

  const selectedActivity = activities.find(x => x.id === selectedActivityId);

  return (
    <>
      {typeof window !== 'undefined' && (
        <Leaflet.Map
          preferCanvas
          center={center}
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
          {activities.map(activity => (
            <PolylineActivity key={activity.id} activity={activity} Leaflet={Leaflet} onClick={setSelectedActivityId} />
          ))}
          {selectedActivity && <Leaflet.Polyline positions={selectedActivity.polyline} color="white" weight={2} opacity={1} />}
          <PrintControl ref={printControlRef} hidden position="topleft" sizeModes={['Current', 'A4Portrait', 'A4Landscape']} hideControlContainer={false} exportOnly />
        </Leaflet.Map>
      )}
    </>
  );
};

export default Map;
