import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderProfileButton from './HeaderProfileButton';
import { Link } from 'gatsby';

const HeaderMenu = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOffClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('expires_at');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
    }

    window.location.replace('/');
  };

  return (
    <>
      <div className="header__menu" onClick={() => setIsOpen(!isOpen)}>
        {profile ? <HeaderProfileButton profile={profile} /> : <div className="header__image" />}

        {isOpen && (
          <div className="header__menu-open">
            <Link className="header__menu-button --mobile" to="/app">
              App
            </Link>
            <button className="header__menu-button" onClick={handleLogOffClick}>
              Log off
            </button>
          </div>
        )}
      </div>
    </>
  );
};

HeaderMenu.propTypes = {
  profile: PropTypes.object,
};

export default HeaderMenu;
