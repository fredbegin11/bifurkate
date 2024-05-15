import React from 'react';
import _ from 'lodash';
import { getSeasonConfig } from '../helpers/activityHelpers';

const defaultState = {
  isMenuOpen: false,
  printControlRef: null,
  toggleMenuOpen: () => {},
  toggleActivityTypeDisplay: () => {},
  toggleSeasonDisplay: () => {},

  options: {
    mapConfig: {
      heatMapMode: false,
      polylineColor: '#FF0000',
      polylineWeight: 2,
      showBikePaths: false,
      unit: 'metric',
      showRoutes: false,
      routesLineColor: '#9999A1',
      routesLineWeight: 2,
    },
    activityTypeConfig: {},
    seasonConfig: {},
    datesConfig: {},
  },
};

const MenuContext = React.createContext(defaultState);

class MenuProvider extends React.Component {
  state = defaultState;

  componentDidMount() {
    if (typeof window !== 'undefined') {
      try {
        const localMapConfig = JSON.parse(localStorage.getItem('mapConfig'));
        this.setMapOption(localMapConfig);
      } catch (err) {}
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (typeof window !== 'undefined' && !_.isEqual(prevState.options.mapConfig, this.state.options.mapConfig)) {
      localStorage.setItem('mapConfig', JSON.stringify(this.state.options.mapConfig));
    }
  }

  initializeMenu = (activities, userActivityTypes) => {
    const activityTypeConfig = {};
    userActivityTypes.forEach(x => {
      activityTypeConfig[x] = true;
    });

    const seasonConfig = getSeasonConfig(activities);
    this.setOption({ activityTypeConfig, seasonConfig });
  };

  setOption = options => this.setState({ options: { ...this.state.options, ...options } });

  setMapOption = options => this.setState({ options: { ...this.state.options, mapConfig: { ...this.state.options.mapConfig, ...options } } });

  setPrintControlRef = printControlRef => this.setState({ printControlRef });

  toggleSeasonDisplay = season => {
    this.setOption({ datesConfig: {}, seasonConfig: { ...this.state.options.seasonConfig, ...season } });
  };

  setDateConfig = (datesConfig, seasonValue = false) => {
    const seasonConfig = {};
    const seasons = Object.keys(this.state.options.seasonConfig);
    seasons.forEach(x => {
      seasonConfig[x] = seasonValue;
    });

    this.setOption({ datesConfig, seasonConfig });
  };

  toggleMenuOpen = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });

  toggleActivityTypeDisplay = type => {
    const { options } = this.state;
    const { activityTypeConfig } = options;

    this.setState({ options: { ...options, activityTypeConfig: { ...activityTypeConfig, [type]: !activityTypeConfig[type] } } });
  };

  render() {
    const { children } = this.props;
    const { options, isMenuOpen, printControlRef } = this.state;
    const { setPrintControlRef, initializeMenu, toggleSeasonDisplay, toggleMenuOpen, setOption, toggleActivityTypeDisplay, setMapOption, setDateConfig } = this;

    return (
      <MenuContext.Provider
        value={{
          initializeMenu,
          isMenuOpen,
          options,
          setOption,
          toggleActivityTypeDisplay,
          toggleMenuOpen,
          toggleSeasonDisplay,
          setMapOption,
          setDateConfig,
          setPrintControlRef,
          printControlRef,
        }}
      >
        {children}
      </MenuContext.Provider>
    );
  }
}

export default MenuContext;

export { MenuProvider };
