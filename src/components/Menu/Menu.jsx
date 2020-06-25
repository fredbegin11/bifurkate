import React, { useContext } from 'react';
import classNames from 'classNames';
import { FaCheck, FaTimes } from 'react-icons/fa';
import MenuContext from '../../contexts/MenuContext';

const Menu = () => {
  const { isMenuOpen, heatMapMode, setHeatMapMode, setShowRide, setShowRun, setShowWalk, setShowHike, showRide, showRun, showWalk, showHike } = useContext(MenuContext);

  return (
    <div className={classNames('menu', isMenuOpen && '--open')}>
      <div className="menu__block">
        <span className="label__header --small-margin">Filters</span>
        <button className="button menu__item" onClick={setHeatMapMode}>
          Heatmap Mode {heatMapMode ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status" />}
        </button>
      </div>
      <div className="menu__block">
        <span className="label__header --small-margin">Activity Type</span>
        <button className="button menu__item" onClick={setShowRide}>
          Cycling Rides {showRide ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status" />}
        </button>
        <button className="button menu__item" onClick={setShowRun}>
          Runs {showRun ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status" />}
        </button>
        <button className="button menu__item" onClick={setShowWalk}>
          Walks {showWalk ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status" />}
        </button>
        <button className="button menu__item" onClick={setShowHike}>
          Hikes {showHike ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status" />}
        </button>
      </div>
    </div>
  );
};

export default Menu;
