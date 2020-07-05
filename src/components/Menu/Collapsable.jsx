import React from 'react';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

const Collapsable = ({ label, isInitiallyOpen, children }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return (
    <div className="menu__block">
      <button className="custom-button menu__item" onClick={() => setIsOpen(!isOpen)}>
        <div className="label__header --no-margin">{label}</div>
        {isOpen ? <FaChevronUp className="menu__status" /> : <FaChevronDown className="menu__status" />}
      </button>
      <CSSTransition in={isOpen} timeout={200} classNames="collapsable" unmountOnExit mountOnEnter>
        <div className="collapsable">{children}</div>
      </CSSTransition>
    </div>
  );
};

export default Collapsable;
