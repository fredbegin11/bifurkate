import React from 'react';

const defaultState = {
  setHeatMapMode: () => {},

  isMenuOpen: false,
  setIsMenuOpen: () => {},
  toggleType: () => {},
  setSeason: () => {},

  options: {
    heatMapMode: false,
    activityTypeConfig: {},
    seasons: {},
  },
};

const MenuContext = React.createContext(defaultState);

// TODO: Clean This Mess
class MenuProvider extends React.Component {
  state = defaultState;

  setOption = options => this.setState({ options: { ...this.state.options, ...options } });

  setSeason = season => this.setState({ options: { ...this.state.options, seasons: { ...this.state.options.seasons, ...season } } });

  setIsMenuOpen = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });

  toggleType = type => {
    const { activityTypeConfig } = this.state.options;
    this.setState({ options: { ...this.state.options, activityTypeConfig: { ...activityTypeConfig, [type]: !activityTypeConfig[type] } } });
  };

  render() {
    const { children } = this.props;
    const { options, isMenuOpen } = this.state;
    const { setSeason, setIsMenuOpen, setOption, toggleType } = this;

    return <MenuContext.Provider value={{ toggleType, setSeason, setIsMenuOpen, setOption, options, isMenuOpen }}>{children}</MenuContext.Provider>;
  }
}

export default MenuContext;

export { MenuProvider };
