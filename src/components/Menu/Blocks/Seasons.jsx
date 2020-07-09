import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Collapsable from '../Collapsable';

const Seasons = ({ seasonConfig, toggleSeasonDisplay }) => (
  <Collapsable label="Seasons" isInitiallyOpen>
    {Object.keys(seasonConfig).map(key => (
      <button key={key} className="custom-button menu__item" onClick={() => toggleSeasonDisplay({ [key]: !seasonConfig[key] })}>
        {key} {seasonConfig[key] ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
      </button>
    ))}
  </Collapsable>
);

export default Seasons;
