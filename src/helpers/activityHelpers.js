import moment from 'moment';

export const filterActivities = (activities, options) => {
  const { showRide, showRun, showWalk, showHike } = options;

  let filteredActivities = activities;

  if (!showRide) filteredActivities = filteredActivities.filter(x => x.type !== 'Ride');
  if (!showRun) filteredActivities = filteredActivities.filter(x => x.type !== 'Run');
  if (!showWalk) filteredActivities = filteredActivities.filter(x => x.type !== 'Walk');
  if (!showHike) filteredActivities = filteredActivities.filter(x => x.type !== 'Hike');

  const seasons = Object.keys(options.seasons);
  seasons.forEach(season => {
    if (!options.seasons[season]) filteredActivities = filteredActivities.filter(x => moment(x.start_date).format('YYYY') !== season);
  });

  return filteredActivities;
};
