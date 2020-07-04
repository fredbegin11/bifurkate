import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const MapOptions = ({ heatMapMode, setOption }) => (
  <div className="menu__block">
    <span className="label__header --small-margin">Map Settings</span>
    <button className="custom-button menu__item" onClick={() => setOption({ heatMapMode: !heatMapMode })}>
      Heatmap Mode {heatMapMode ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
    </button>
  </div>
);

export default MapOptions;
