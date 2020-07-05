import React from 'react';
import _ from 'lodash';
import moment from 'moment';

const defaultState = {
  isMenuOpen: false,
  toggleMenuOpen: () => {},
  toggleActivityTypeDisplay: () => {},
  toggleSeasonDisplay: () => {},

  options: {
    mapConfig: {
      heatMapMode: false,
      polylineColor: 'red',
      polylineWeight: 2,
    },
    activityTypeConfig: {},
    seasonConfig: {},
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
    userActivityTypes.forEach(x => (activityTypeConfig[x] = true));

    let seasonConfig = {};
    const allSeasons = activities.map(x => moment(x.start_date).format('YYYY'));
    const uniqueSeasons = _.uniq(allSeasons, true);
    uniqueSeasons.forEach(x => (seasonConfig[x] = true));

    this.setOption({ activityTypeConfig, seasonConfig });
  };

  setOption = options => this.setState({ options: { ...this.state.options, ...options } });

  setMapOption = options => this.setState({ options: { ...this.state.options, mapConfig: { ...this.state.options.mapConfig, ...options } } });

  toggleSeasonDisplay = season => this.setState({ options: { ...this.state.options, seasonConfig: { ...this.state.options.seasonConfig, ...season } } });

  toggleMenuOpen = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });

  toggleActivityTypeDisplay = type => {
    const { options } = this.state;
    const { activityTypeConfig } = options;

    this.setState({ options: { ...options, activityTypeConfig: { ...activityTypeConfig, [type]: !activityTypeConfig[type] } } });
  };

  render() {
    const { children } = this.props;
    const { options, isMenuOpen } = this.state;
    const { initializeMenu, toggleSeasonDisplay, toggleMenuOpen, setOption, toggleActivityTypeDisplay, setMapOption } = this;

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
        }}
      >
        {children}
      </MenuContext.Provider>
    );
  }
}

export default MenuContext;

export { MenuProvider };
