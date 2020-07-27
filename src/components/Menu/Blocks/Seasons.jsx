import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import Collapsable from '../Collapsable';

const Seasons = ({ seasonConfig, toggleSeasonDisplay }) => {
  const handleClick = key => {
    toggleSeasonDisplay({ [key]: !seasonConfig[key] });
    trackCustomEvent({ category: 'filter-season', action: 'Click', label: 'Set Season Filter', number: key });
  };

  return (
    <Collapsable label="Seasons" isInitiallyOpen>
      {Object.keys(seasonConfig).map(key => (
        <button type="button" key={key} className="custom-button menu__item" onClick={() => handleClick(key)}>
          {key} {seasonConfig[key] ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
        </button>
      ))}
    </Collapsable>
  );
};

export default Seasons;
