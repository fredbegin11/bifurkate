import React from 'react';
import { FaEnvelope, FaBeer, FaPowerOff, FaImage } from 'react-icons/fa';

const Footer = ({ onExportClick }) => {
  const handleLogOffClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('expires_at');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('athlete');
      localStorage.removeItem('mapConfig');
    }

    window.location.replace('/');
  };

  const handleExportClick = () => onExportClick();

  return (
    <div className="menu__footer">
      <button type="button" className="custom-button menu__item" onClick={handleExportClick}>
        Export Map as PNG <FaImage className="menu__status" />
      </button>
      <a href="mailto:frederic.begin.fb@gmail.com?subject=Bifurkate Feedback" target="_blank" rel="noopener noreferrer" className="custom-button menu__item">
        Feedback / Suggestion <FaEnvelope className="menu__status" />
      </a>
      <a href="https://www.paypal.me/fredbegin11" target="_blank" rel="noopener noreferrer" className="custom-button menu__item">
        Buy me a beer <FaBeer className="menu__status" />
      </a>
      <button type="button" className="custom-button menu__item" onClick={handleLogOffClick}>
        Log off <FaPowerOff className="menu__status" />
      </button>
    </div>
  );
};

export default Footer;
