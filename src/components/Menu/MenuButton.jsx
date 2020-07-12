import React from 'react';
import { FaSlidersH, FaArrowLeft } from 'react-icons/fa';

const MenuButton = ({ onClick, isOpen, disabled }) => (
  <button className="custom-button" onClick={onClick} disabled={disabled}>
    {isOpen ? <FaArrowLeft className="custom-button__icon" /> : <FaSlidersH className="custom-button__icon" />}
  </button>
);

export default MenuButton;
