import React from 'react';
import { FaSlidersH, FaTimes } from 'react-icons/fa';

const MenuButton = ({ onClick, isOpen, disabled }) => (
  <button className="custom-button" onClick={onClick} disabled={disabled}>
    {isOpen ? <FaTimes className="custom-button__icon" /> : <FaSlidersH className="custom-button__icon" />}
  </button>
);

export default MenuButton;
