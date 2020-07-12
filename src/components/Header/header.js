import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import HeaderMenu from './HeaderMenu';
import MenuButton from '../Menu/MenuButton';
import MenuContext from '../../contexts/MenuContext';
import logo from '../../images/branding/light/logo_transparent_background.png';
import { useIsMobile } from '../../helpers/hooks';

const Header = ({ showMenu, profile }) => {
  const { isMenuOpen, toggleMenuOpen } = useContext(MenuContext);

  const isMobile = useIsMobile();

  const handleMenuClick = () => toggleMenuOpen(!isMenuOpen);

  return (
    <header className={classNames('header', isMenuOpen && '--open')}>
      <div className={classNames('header__title-container', isMobile && '--full')}>
        <MenuButton isOpen={isMenuOpen} onClick={handleMenuClick} disabled={!showMenu} />
        <img src={logo} alt="main logo" className="header__logo" />
      </div>

      {profile && !isMobile && <HeaderMenu profile={profile} />}
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
