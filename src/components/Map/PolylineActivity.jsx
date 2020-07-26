import React, { useContext } from 'react';
import moment from 'moment';
import MenuContext from '../../contexts/MenuContext';

const PolylineActivity = ({ activity, Leaflet, onClick }) => {
  const { options } = useContext(MenuContext);
  const { polylineColor, polylineWeight, heatMapMode } = options.mapConfig;

  return (
    <Leaflet.Polyline onClick={() => onClick(activity.id)} positions={activity.polyline} color={polylineColor} weight={polylineWeight} opacity={heatMapMode ? 0.3 : 1}>
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
  );
};

export default PolylineActivity;
