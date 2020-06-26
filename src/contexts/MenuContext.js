import React from 'react';

const defaultState = {
  setHeatMapMode: () => {},

  isMenuOpen: false,
  setIsMenuOpen: () => {},
  setSeason: () => {},

  options: {
    heatMapMode: false,
    showRide: true,
    showRun: true,
    showWalk: true,
    showHike: true,
    seasons: {},
  },
};

const MenuContext = React.createContext(defaultState);

class MenuProvider extends React.Component {
  state = defaultState;

  setOption = options => this.setState({ options: { ...this.state.options, ...options } });

  setSeason = season => this.setState({ options: { ...this.state.options, seasons: { ...this.state.options.seasons, ...season } } });

  setIsMenuOpen = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });

  render() {
    const { children } = this.props;
    const { options, isMenuOpen } = this.state;
    const { setSeason, setIsMenuOpen, setOption } = this;

    return <MenuContext.Provider value={{ setSeason, setIsMenuOpen, setOption, options, isMenuOpen }}>{children}</MenuContext.Provider>;
  }
}

export default MenuContext;

export { MenuProvider };
