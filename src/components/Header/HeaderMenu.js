import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import HeaderProfileButton from './HeaderProfileButton';
import MenuContext from '../../contexts/MenuContext';

const HeaderMenu = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMenuOpen } = useContext(MenuContext);

  const handleLogOffClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('expires_at');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
    }

    window.location.replace('/');
  };

  useEffect(() => {
    if (isMenuOpen) {
      setIsOpen(false);
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="header__menu" onClick={() => setIsOpen(!isMenuOpen && !isOpen)}>
        {profile ? <HeaderProfileButton profile={profile} /> : <div className="header__image" />}

        {isOpen && (
          <div className="header__menu-open">
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
