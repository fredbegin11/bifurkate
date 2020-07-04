import React, { useContext } from 'react';
import classNames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import HeaderMenu from './HeaderMenu';
import MenuButton from '../Menu/MenuButton';
import MenuContext from '../../contexts/MenuContext';

const Header = ({ showMenu, profile }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { isMenuOpen, toggleMenuOpen } = useContext(MenuContext);

  const handleMenuClick = () => toggleMenuOpen(!isMenuOpen);

  return (
    <header className={classNames('header', isMenuOpen && '--open')}>
      <div className="header__title-container">
        {showMenu ? (
          <MenuButton isOpen={isMenuOpen} label={data.site.siteMetadata.title} onClick={handleMenuClick} />
        ) : (
          <span className="header__title --no-settings">{data.site.siteMetadata.title}</span>
        )}
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
