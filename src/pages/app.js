import React, { useContext, useEffect, useState } from 'react';
import polyline from '@mapbox/polyline';

import Layout from '../components/layout';
import MapLoader from '../components/Loader/Loader';
import SEO from '../components/seo';
import AthleteContext from '../contexts/AthleteContext';
import stravaAgents from '../agents/stravaAgents';
import { getMedian } from '../helpers/mathHelpers';

let Leaflet;

// Fix for Heroku build (Leaflet wants a window object...)
if (typeof window !== 'undefined') {
  Leaflet = require('react-leaflet');
}

const MapComponent = () => {
  const { storeHydrated: athleteStoreHydrated, athlete } = useContext(AthleteContext);
  const [isLoading, setIsLoading] = useState(true);
  const [polylines, setPolylines] = useState([]);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (athleteStoreHydrated && athlete.id) {
      stravaAgents.getAllActivities().then(activities => {
        const filteredActivities = activities.filter(x => x.type !== 'VirtualRide');

        if (filteredActivities.length > 0) {
          const firstPolylines = polyline.decode(filteredActivities[0].map.summary_polyline);
          setCenter([firstPolylines[0][0], firstPolylines[0][1]]);
        }

        const calculatedPolylines = filteredActivities.map(x => polyline.decode(x.map.summary_polyline));
        setPolylines(calculatedPolylines);

        if (calculatedPolylines.length > 0) {
          const centerLat = getMedian(calculatedPolylines.map(x => x[0][0]));
          const centerLong = getMedian(calculatedPolylines.map(x => x[0][1]));
          setCenter([centerLat, centerLong]);
        }

        setIsLoading(false);
      });
    }
  }, [athleteStoreHydrated]);

  return (
    <>
      {isLoading && <MapLoader />}

      <Layout>
        <SEO title="App" />

        {typeof window !== 'undefined' && (
          <Leaflet.Map center={isLoading ? [46.8139, -71.29] : center} zoom={isLoading ? 5 : 10} zoomControl={false}>
            <Leaflet.TileLayer
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
            />
            {polylines.map((polyline, index) => (
              // show heatmap = opacity={0.3}
              <Leaflet.Polyline key={index} positions={polyline} color={'red'} weight={2} opacity={1} />
            ))}
          </Leaflet.Map>
        )}
      </Layout>
    </>
  );
};

export default MapComponent;
