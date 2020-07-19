import React from 'react';
import { Link } from 'gatsby';
import { FaChartBar } from 'react-icons/fa';

const MenuNavigation = () => (
  <div className="menu__block">
    <Link className="custom-button menu__item" to="/stats/">
      <div className="label__header --no-margin">My Stats</div>
      <FaChartBar className="menu__status" />
    </Link>
  </div>
);

export default MenuNavigation;
