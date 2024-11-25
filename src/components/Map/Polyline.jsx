import React, { useContext } from 'react';
import moment from 'moment';
import MenuContext from '../../contexts/MenuContext';
import { convertKm, convertMeters } from '../../helpers/mathHelpers';

const Polyline = ({ item, Leaflet, onClick, isRoute }) => {
  const { options } = useContext(MenuContext);
  const { unit, polylineColor, polylineWeight, heatMapMode, routesLineColor, routesLineWeight } = options.mapConfig;

  return (
    <Leaflet.Polyline
      onClick={() => onClick(item.id)}
      positions={item.polyline}
      color={isRoute ? routesLineColor : polylineColor}
      weight={isRoute ? routesLineWeight : polylineWeight}
      opacity={heatMapMode ? 0.3 : 1}
    >
      <Leaflet.Popup>
        <a
          href={isRoute ? `https://www.strava.com/routes/${item.id_str}` : `https://www.strava.com/activities/${item.id}`}
          className="label__subheader --no-margin"
          target="_blank"
          rel="noopener noreferrer"
        >
          {isRoute ? 'Route - ' : ''}
          {item.name}
        </a>
        <br />
        {isRoute ? 'Creation Date' : 'Date'}: {moment(item.start_date).format('YYYY-MM-DD')}
        <br />
        Distance: {convertKm(item.distance / 1000, unit, 2)}
        <br />
        Elevation gain: {convertMeters(isRoute ? item.elevation_gain : item.total_elevation_gain, unit)}
      </Leaflet.Popup>
    </Leaflet.Polyline>
  );
};

export default Polyline;
