import _ from 'lodash';

export const filterActivitiesByType = (activities, options) => {
  const { showRide, showRun, showWalk, showHike } = options;

  const filteredActivities = [];

  if (showRide) {
    filteredActivities.push(...activities.filter(x => x.type === 'Ride'));
  }

  if (showRun) {
    filteredActivities.push(...activities.filter(x => x.type === 'Run'));
  }

  if (showWalk) {
    filteredActivities.push(...activities.filter(x => x.type === 'Walk'));
  }

  if (showHike) {
    filteredActivities.push(...activities.filter(x => x.type === 'Hike'));
  }

  return filteredActivities;
};
