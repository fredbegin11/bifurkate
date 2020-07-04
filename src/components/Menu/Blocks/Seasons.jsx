import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Seasons = ({ seasonConfig, toggleSeasonDisplay }) => (
  <div className="menu__block">
    <span className="label__header --small-margin">Seasons</span>
    {Object.keys(seasonConfig).map(key => (
      <button key={key} className="custom-button menu__item" onClick={() => toggleSeasonDisplay({ [key]: !seasonConfig[key] })}>
        {key} {seasonConfig[key] ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
      </button>
    ))}
  </div>
);

export default Seasons;
