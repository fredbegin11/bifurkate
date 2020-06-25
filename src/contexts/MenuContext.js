import React from 'react';

const defaultState = {
  heatMapMode: false,
  setHeatMapMode: () => {},

  isMenuOpen: false,
  setIsMenuOpen: () => {},

  setShowRide: () => {},
  setShowRun: () => {},
  setShowWalk: () => {},
  setShowHike: () => {},
  showRide: true,
  showRun: true,
  showWalk: true,
  showHike: true,
};

const MenuContext = React.createContext(defaultState);

class MenuProvider extends React.Component {
  state = defaultState;

  setHeatMapMode = () => this.setState({ heatMapMode: !this.state.heatMapMode });
  setIsMenuOpen = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });
  setShowRide = () => this.setState({ showRide: !this.state.showRide });
  setShowRun = () => this.setState({ showRun: !this.state.showRun });
  setShowWalk = () => this.setState({ showWalk: !this.state.showWalk });
  setShowHike = () => this.setState({ showHike: !this.state.showHike });

  render() {
    const { children } = this.props;
    const { heatMapMode, isMenuOpen, showRide, showRun, showWalk, showHike } = this.state;
    const { setHeatMapMode, setIsMenuOpen, setShowRide, setShowRun, setShowWalk, setShowHike } = this;

    return (
      <MenuContext.Provider
        value={{ setShowRide, setShowRun, setShowWalk, setShowHike, isMenuOpen, setIsMenuOpen, heatMapMode, setHeatMapMode, showRide, showRun, showWalk, showHike }}
      >
        {children}
      </MenuContext.Provider>
    );
  }
}

export default MenuContext;

export { MenuProvider };
