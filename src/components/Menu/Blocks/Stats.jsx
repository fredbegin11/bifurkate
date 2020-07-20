import React from 'react';
import Collapsable from '../Collapsable';
import { getTotalTime, getTotalDistance, getTotalElevation } from '../../../helpers/activityHelpers';

const Stats = ({ activities }) => {
  const distance = getTotalDistance(activities);
  const elevation = getTotalElevation(activities);
  const time = getTotalTime(activities);

  return (
    <Collapsable label="Stats" isInitiallyOpen>
      <span className="custom-button menu__item">
        Distance <span className="menu__status">{distance} km</span>
      </span>
      <span className="custom-button menu__item">
        Elevation <span className="menu__status">{elevation.toLocaleString('fr')} m</span>
      </span>
      <span className="custom-button menu__item">
        Moving Time <span className="menu__status">{time} hours</span>
      </span>
    </Collapsable>
  );
};

export default Stats;
