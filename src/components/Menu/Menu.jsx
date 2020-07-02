import React, { useContext } from 'react';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';
import { FaCheck, FaTimes, FaPowerOff, FaBeer, FaEnvelope } from 'react-icons/fa';
import MenuContext from '../../contexts/MenuContext';

const Menu = () => {
  const { isMenuOpen, setOption, options, setSeason } = useContext(MenuContext);

  const handleLogOffClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('expires_at');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
    }

    window.location.replace('/');
  };

  return (
    <SimpleBar forceVisible={true} autoHide={false} className={classNames('menu', isMenuOpen && '--open')}>
      <div className="menu__inner">
        <div>
          <div className="menu__block">
            <span className="label__header --small-margin">Map Settings</span>
            <button className="custom-button menu__item" onClick={() => setOption({ heatMapMode: !options.heatMapMode })}>
              Heatmap Mode {options.heatMapMode ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
            </button>
          </div>
          <div className="menu__block">
            <span className="label__header --small-margin">Activity Type</span>
            <button className="custom-button menu__item" onClick={() => setOption({ showRide: !options.showRide })}>
              Cycling Rides {options.showRide ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
            </button>
            <button className="custom-button menu__item" onClick={() => setOption({ showRun: !options.showRun })}>
              Runs {options.showRun ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
            </button>
            <button className="custom-button menu__item" onClick={() => setOption({ showWalk: !options.showWalk })}>
              Walks {options.showWalk ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
            </button>
            <button className="custom-button menu__item" onClick={() => setOption({ showHike: !options.showHike })}>
              Hikes {options.showHike ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
            </button>
          </div>
          <div className="menu__block">
            <span className="label__header --small-margin">Seasons</span>
            {Object.keys(options.seasons).map(key => (
              <button key={key} className="custom-button menu__item" onClick={() => setSeason({ [key]: !options.seasons[key] })}>
                {key} {options.seasons[key] ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
              </button>
            ))}
          </div>
        </div>
        <div className="menu__footer">
          <a href="mailto:frederic.begin.fb@gmail.com?subject=Bifurkate Feedback" target="_blank" rel="noopener noreferrer" className="custom-button menu__item">
            Feedback / Suggestion <FaEnvelope className="menu__status" />
          </a>
          <a href="https://www.paypal.me/fredbegin11" target="_blank" rel="noopener noreferrer" className="custom-button menu__item">
            Buy me a beer <FaBeer className="menu__status" />
          </a>
          <button className="custom-button menu__item" onClick={handleLogOffClick}>
            Log off <FaPowerOff className="menu__status" />
          </button>
        </div>
      </div>
    </SimpleBar>
  );
};

export default Menu;
