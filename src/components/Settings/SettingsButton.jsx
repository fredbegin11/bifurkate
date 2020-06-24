import React from 'react';
import { FaSlidersH } from 'react-icons/fa';

const SettingsButton = ({ onClick, label }) => (
  <button className="button" onClick={onClick}>
    <FaSlidersH className="button__icon" />
    <span className="header__title">{label}</span>
  </button>
);

export default SettingsButton;
