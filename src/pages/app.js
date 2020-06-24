import React, { useContext, useEffect, useState } from 'react';
import polyline from '@mapbox/polyline';

import Layout from '../components/layout';
import SEO from '../components/seo';
import AthleteContext from '../contexts/AthleteContext';
import stravaAgents from '../agents/stravaAgents';
import { getAverage } from '../helpers/mathHelpers';
import Loader from '../components/Loader/Loader';

let Leaflet;

// Fix for Heroku build (Leaflet wants a window object...)
if (typeof window !== 'undefined') {
  Leaflet = require('react-leaflet');
}

const MapComponent = () => {
  const { storeHydrated: athleteStoreHydrated, athlete } = useContext(AthleteContext);
  const [isLoading, setIsLoading] = useState(true);
  const [polylines, setPolylines] = useState([]);
  const [center, setCenter] = useState([46.8139, -71.29]);

  useEffect(() => {
    if (athleteStoreHydrated && athlete.id) {
      stravaAgents.getAllActivities().then(activities => {
        const filteredActivities = activities.filter(x => x.type === 'Ride');

        const calculatedPolylines = filteredActivities.map(x => polyline.decode(x.map.summary_polyline));
        setPolylines(calculatedPolylines);

        if (calculatedPolylines.length > 0) {
          const centerLat = getAverage(calculatedPolylines.map(x => x[0][0]));
          const centerLong = getAverage(calculatedPolylines.map(x => x[0][1]));
          setCenter([centerLat, centerLong]);
        }

        setIsLoading(false);
      });
    }
  }, [athleteStoreHydrated]);

  return (
    <Layout>
      <SEO title="App" />
      {isLoading && (
        <>
          <div className="loader__center">
            <Loader />
          </div>
          <div className="loader__center">
            <span>Hang on, we're loading your map!</span>
          </div>
        </>
      )}
      {typeof window !== 'undefined' && !isLoading && (
        <Leaflet.Map center={center} zoom={12}>
          <Leaflet.TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          />
          {polylines.map((polyline, index) => (
            <Leaflet.Polyline key={index} positions={polyline} color={'red'} />
          ))}
        </Leaflet.Map>
      )}
    </Layout>
  );
};

export default MapComponent;
