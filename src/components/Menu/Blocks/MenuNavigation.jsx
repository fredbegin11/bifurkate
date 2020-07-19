import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { FaChartBar, FaMapMarked } from 'react-icons/fa';
import Collapsable from '../Collapsable';
import MenuContext from '../../../contexts/MenuContext';

const MenuNavigation = () => {
  const { toggleMenuOpen } = useContext(MenuContext);

  return (
    <Collapsable label="Navigation" isInitiallyOpen>
      <Link className="custom-button menu__item" to="/app/" onClick={toggleMenuOpen}>
        Map <FaMapMarked className="menu__status" />
      </Link>
      <Link className="custom-button menu__item" to="/stats/" onClick={toggleMenuOpen}>
        Stats <FaChartBar className="menu__status" />
      </Link>
    </Collapsable>
  );
};

export default MenuNavigation;
