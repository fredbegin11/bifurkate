import React from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';

const MenuButton = ({ onClick, isOpen, disabled }) => (
  <button className="custom-button" onClick={onClick} disabled={disabled}>
    {isOpen ? <FaTimes className="custom-button__icon" /> : <FaBars className="custom-button__icon" />}
  </button>
);

export default MenuButton;
