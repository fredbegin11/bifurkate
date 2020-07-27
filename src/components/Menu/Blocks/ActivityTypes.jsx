import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { ActivityType } from '../../../helpers/activityHelpers';
import Collapsable from '../Collapsable';

const ActivityTypes = ({ userActivityTypes, activityTypeConfig, toggleActivityTypeDisplay }) => {
  const handleClick = type => {
    toggleActivityTypeDisplay(type);
    trackCustomEvent({ category: 'filter-activity-type', action: 'Click', label: 'Set Activity Type Filter' });
  };

  return (
    <Collapsable label="Activity Type" isInitiallyOpen>
      {userActivityTypes.map(type => (
        <button type="button" key={type} className="custom-button menu__item" onClick={() => handleClick(type)}>
          {ActivityType[type]} {activityTypeConfig[type] ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
        </button>
      ))}
    </Collapsable>
  );
};

export default ActivityTypes;
