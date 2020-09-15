import React from 'react';
import Collapsable from '../Collapsable';
import { getTotalTime, getTotalDistance, getTotalElevation } from '../../../helpers/activityHelpers';
import { convertKm, convertMeters } from '../../../helpers/mathHelpers';

const Stats = ({ activities, mapConfig }) => {
  const distance = getTotalDistance(activities);
  const elevation = getTotalElevation(activities);
  const time = getTotalTime(activities);

  return (
    <Collapsable label="Stats" isInitiallyOpen>
      <span className="custom-button menu__item">
        Distance <span className="menu__status">{convertKm(distance, mapConfig.unit)}</span>
      </span>
      <span className="custom-button menu__item">
        Elevation <span className="menu__status">{convertMeters(elevation, mapConfig.unit)}</span>
      </span>
      <span className="custom-button menu__item">
        Moving Time <span className="menu__status">{time} hours</span>
      </span>
      <br />
    </Collapsable>
  );
};

export default Stats;
