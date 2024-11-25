import React from 'react';

const defaultState = {
  routes: [],
};

const RouteContext = React.createContext(defaultState);

class RouteProvider extends React.Component {
  state = defaultState;

  setRoutes = routes => this.setState({ routes });

  render() {
    const { children } = this.props;
    const { routes } = this.state;
    const { setRoutes } = this;

    return <RouteContext.Provider value={{ routes, setRoutes }}>{children}</RouteContext.Provider>;
  }
}

export default RouteContext;

export { RouteProvider };
