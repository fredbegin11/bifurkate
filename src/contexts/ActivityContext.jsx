import React from 'react';

const defaultState = {
  activities: [],
};

const ActivityContext = React.createContext(defaultState);

class ActivityProvider extends React.Component {
  state = defaultState;

  setActivities = activities => this.setState({ activities });

  render() {
    const { children } = this.props;
    const { activities } = this.state;
    const { setActivities } = this;

    return <ActivityContext.Provider value={{ activities, setActivities }}>{children}</ActivityContext.Provider>;
  }
}

export default ActivityContext;

export { ActivityProvider };
