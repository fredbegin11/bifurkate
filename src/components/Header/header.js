import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import HeaderMenu from './HeaderMenu';
import MenuButton from '../Menu/MenuButton';
import MenuContext from '../../contexts/MenuContext';
import logo from '../../images/logo-line-light.png';

const Header = ({ showMenu, profile }) => {
  const { isMenuOpen, toggleMenuOpen } = useContext(MenuContext);

  const handleMenuClick = () => toggleMenuOpen(!isMenuOpen);

  return (
    <header className={classNames('header', isMenuOpen && '--open')}>
      <div className="header__title-container">
        <MenuButton isOpen={isMenuOpen} onClick={handleMenuClick} disabled={!showMenu} />

        <img src={logo} alt="main logo" className="header__logo" />
      </div>
      {profile && <HeaderMenu profile={profile} />}
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  profile: PropTypes.object,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
