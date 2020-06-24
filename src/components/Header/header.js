import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import React from 'react';
import stravaLogo from '../../images/strava-logo.png';
import HeaderMenu from './HeaderMenu';

const Header = ({ siteTitle, profile }) => {
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
      <Link to="/app" className="header__title">
        <img alt="" className="header__logo" src={stravaLogo} />
        {data.site.siteMetadata.title}
      </Link>
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
