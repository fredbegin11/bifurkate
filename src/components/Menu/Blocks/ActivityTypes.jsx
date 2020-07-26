import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { ActivityType } from '../../../helpers/activityHelpers';
import Collapsable from '../Collapsable';

const ActivityTypes = ({ userActivityTypes, activityTypeConfig, toggleActivityTypeDisplay }) => (
  <Collapsable label="Activity Type" isInitiallyOpen>
    {userActivityTypes.map(type => (
      <button type="button" key={type} className="custom-button menu__item" onClick={() => toggleActivityTypeDisplay(type)}>
        {ActivityType[type]} {activityTypeConfig[type] ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
      </button>
    ))}
  </Collapsable>
);

export default ActivityTypes;
