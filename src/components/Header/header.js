import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import HeaderMenu from './HeaderMenu';
import SettingsButton from '../Settings/SettingsButton';

const Header = ({ onMenuClick, profile }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header className="header">
      <div className="header__title-container">
        {!!onMenuClick ? (
          <SettingsButton label={data.site.siteMetadata.title} onClick={onMenuClick} />
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
