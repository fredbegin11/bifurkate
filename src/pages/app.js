import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import polyline from '@mapbox/polyline';

import Layout from '../components/layout';
import MapLoader from '../components/Loader/Loader';
import SEO from '../components/seo';
import AthleteContext from '../contexts/AthleteContext';
import stravaAgents from '../agents/stravaAgents';
import { getMedian } from '../helpers/mathHelpers';
import Menu from '../components/Menu/Menu';
import MenuContext from '../contexts/MenuContext';
import { filterActivities } from '../helpers/activityHelpers';

let Leaflet;

// Fix for Heroku build (Leaflet wants a window object...)
if (typeof window !== 'undefined') {
  Leaflet = require('react-leaflet');
}

const MapComponent = () => {
  const { storeHydrated: athleteStoreHydrated, athlete } = useContext(AthleteContext);
  const { options, setSeason } = useContext(MenuContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState([]);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (athleteStoreHydrated && athlete.id) {
      stravaAgents.getAllActivities().then(data => {
        const filteredActivities = data.filter(x => (x.type === 'Ride' || x.type === 'Run' || x.type === 'Walk' || x.type === 'Hike') && !!_.get(x, 'map.summary_polyline'));

        if (filteredActivities.length > 0 && !!_.get(filteredActivities[0], 'map.summary_polyline')) {
          const firstPolylines = polyline.decode(filteredActivities[0].map.summary_polyline);
          setCenter([firstPolylines[0][0], firstPolylines[0][1]]);
        }

        const seasons = filteredActivities.map(x => moment(x.start_date).format('YYYY'));
        const uniqueSeasons = _.uniq(seasons, true);
        uniqueSeasons.forEach(x => setSeason({ [x]: true }));

        setActivities(filteredActivities.map(x => ({ ...x, polyline: polyline.decode(x.map.summary_polyline) })).reverse());

        setIsLoading(false);
      });
    }
  }, [athleteStoreHydrated, athlete.id]);

  useEffect(() => {
    if (!_.isEmpty(activities) && activities.length > 0) {
      const centerLat = getMedian(activities.map(x => x.polyline[0][0]));
      const centerLong = getMedian(activities.map(x => x.polyline[0][1]));

      setCenter([centerLat, centerLong]);
    }
  }, [activities]);

  const activitiesToShow = filterActivities(activities, options);
  const selectedActivity = activitiesToShow.find(x => x.id === selectedActivityId);

  return (
    <>
      {isLoading && <MapLoader />}

      <Menu />

      <Layout showMenu={!isLoading}>
        <SEO title="App" />

        {typeof window !== 'undefined' && (
          <Leaflet.Map center={isLoading ? [46.8139, -71.29] : center} zoom={isLoading ? 5 : 10} zoomControl={false} onClick={() => setSelectedActivityId(null)}>
            <Leaflet.TileLayer
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
            />
            {activitiesToShow.map((activity, index) => (
              <Leaflet.Polyline
                onClick={() => setSelectedActivityId(activity.id)}
                key={index}
                positions={activity.polyline}
                color="red"
                weight={2}
                opacity={options.heatMapMode ? 0.3 : 1}
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
      </Layout>
    </>
  );
};

export default MapComponent;
