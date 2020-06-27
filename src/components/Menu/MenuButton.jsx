import React from 'react';
import { FaSlidersH, FaArrowLeft } from 'react-icons/fa';

const MenuButton = ({ onClick, label, isOpen }) => (
  <button className="custom-button" onClick={onClick}>
    {isOpen ? <FaArrowLeft className="custom-button__icon" /> : <FaSlidersH className="custom-button__icon" />}
    <span className="header__title">{label}</span>
  </button>
);

export default MenuButton;
