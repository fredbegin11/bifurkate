import React, { useState } from 'react';
import classNames from 'classnames';
import { FaChevronUp } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import { useIsMobile } from '../../helpers/hooks';

const Collapsable = ({ label, isInitiallyOpen, children }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className="menu__block">
        <button type="button" className="custom-button menu__item" onClick={() => setIsOpen(!isOpen)}>
          <div className="label__header --no-margin">{label}</div>
          <FaChevronUp className={classNames('menu__status', !isOpen && '--down')} />
        </button>
        <CSSTransition in={isOpen} timeout={200} classNames="collapsable" unmountOnExit mountOnEnter>
          <div className="collapsable">{children}</div>
        </CSSTransition>
      </div>
    );
  }

  return (
    <div className="menu__block">
      <div className="label__header --small-margin">{label}</div>

      <div className="collapsable">{children}</div>
    </div>
  );
};

export default Collapsable;
