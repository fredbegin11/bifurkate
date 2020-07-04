import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { ActivityType } from '../../../helpers/activityHelpers';

const ActivityTypes = ({ userActivityTypes, activityTypeConfig, toggleActivityTypeDisplay }) => (
  <div className="menu__block">
    <span className="label__header --small-margin">Activity Type</span>

    {userActivityTypes.map(type => (
      <button key={type} className="custom-button menu__item" onClick={() => toggleActivityTypeDisplay(type)}>
        {ActivityType[type]} {activityTypeConfig[type] ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
      </button>
    ))}
  </div>
);

export default ActivityTypes;
