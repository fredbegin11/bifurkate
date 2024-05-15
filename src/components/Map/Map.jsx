import React, { useEffect, useState, useRef, useContext } from 'react';
import _ from 'lodash';
import { getMedian } from '../../helpers/mathHelpers';
import Polyline from './Polyline';
import MenuContext from '../../contexts/MenuContext';

let Leaflet;
let PrintControl;
let PrintControlDefault;

// Fix for Heroku build (Leaflet wants a window object...)
if (typeof window !== 'undefined') {
  Leaflet = require('react-leaflet');
  PrintControlDefault = require('react-leaflet-easyprint');
  PrintControl = Leaflet.withLeaflet(PrintControlDefault);
}

const Map = ({ routes, activities, isLoading }) => {
  const { setPrintControlRef, options } = useContext(MenuContext);
  const printControlRef = useRef();
  const [selectedId, setSelectedId] = useState([]);
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

  const selected = activities.find(({ id }) => id === selectedId) || routes.find(({ id }) => id === selectedId);

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
          fadeAnimation={false}
          onClick={() => setSelectedId(null)}
        >
          <Leaflet.TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          />

          {options.mapConfig.showBikePaths && (
            <Leaflet.TileLayer className="custom-greyscale" url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm-lite/{z}/{x}/{y}.png" attribution="CyclOSM | OSM-FR" />
          )}

          <Leaflet.ScaleControl />
          {options.mapConfig.showRoutes && !isLoading && (
            <>
              {routes.map(route => (
                <Polyline key={route.id} item={route} Leaflet={Leaflet} isRoute onClick={setSelectedId} />
              ))}

              {activities.map(activity => (
                <Polyline key={activity.id} item={activity} Leaflet={Leaflet} onClick={setSelectedId} />
              ))}
            </>
          )}

          {!options.mapConfig.showRoutes && !isLoading && activities.map(activity => <Polyline key={activity.id} item={activity} Leaflet={Leaflet} onClick={setSelectedId} />)}

          {selected && <Leaflet.Polyline positions={selected.polyline} color="white" weight={2} opacity={1} />}
          <PrintControl ref={printControlRef} hidden position="topleft" sizeModes={['Current', 'A4Portrait', 'A4Landscape']} hideControlContainer={false} exportOnly />
        </Leaflet.Map>
      )}
    </>
  );
};

export default Map;
