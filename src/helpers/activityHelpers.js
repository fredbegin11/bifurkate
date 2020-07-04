import _ from 'lodash';
import moment from 'moment';
import polyline from '@mapbox/polyline';

export const filterActivitiesToDisplay = (activities, options) => {
  const { activityTypeConfig, seasonConfig } = options;

  const typeKeys = Object.keys(activityTypeConfig);
  const seasonKeys = Object.keys(seasonConfig);

  const selectedTypes = typeKeys.filter(key => !!activityTypeConfig[key]);
  const selectedSeasons = seasonKeys.filter(key => !!seasonConfig[key]);

  let filteredActivities = activities.filter(x => !!x.polyline);
  filteredActivities = filteredActivities.filter(x => selectedTypes.includes(x.type));
  filteredActivities = filteredActivities.filter(x => selectedSeasons.includes(moment(x.start_date).format('YYYY')));

  return filteredActivities;
};

export const decodePolylines = activity => {
  let decodedPolyline = null;

  try {
    decodedPolyline = polyline.decode(activity.map.summary_polyline);
  } catch (err) {
    decodedPolyline = null;
  }

  return { ...activity, polyline: decodedPolyline };
};

export const processActivities = data => {
  const filteredActivities = data.filter(x => !x.type.includes('Virtual') && !!_.get(x, 'map.summary_polyline'));

  return filteredActivities.map(x => decodePolylines(x)).reverse();
};

export const ActivityType = {
  AlpineSki: 'Alpine Ski',
  BackcountrySki: 'Backcountry Ski',
  Canoeing: 'Canoeing',
  Crossfit: 'Crossfit',
  EBikeRide: 'EBike Ride',
  Elliptical: 'Elliptical',
  Golf: 'Golf',
  Handcycle: 'Handcycle',
  Hike: 'Hike',
  IceSkate: 'Ice Skate',
  InlineSkate: 'Inline Skate',
  Kayaking: 'Kayaking',
  Kitesurf: 'Kitesurf',
  NordicSki: 'Nordic Ski',
  Ride: 'Ride',
  RockClimbing: 'Rock Climbing',
  RollerSki: 'Roller Ski',
  Rowing: 'Rowing',
  Run: 'Run',
  Sail: 'Sail',
  Skateboard: 'Skateboard',
  Snowboard: 'Snowboard',
  Snowshoe: 'Snowshoe',
  Soccer: 'Soccer',
  StairStepper: 'Stair Stepper',
  StandUpPaddling: 'Stand Up Paddling',
  Surfing: 'Surfing',
  Swim: 'Swim',
  Velomobile: 'Velomobile',
  Walk: 'Walk',
  WeightTraining: 'Weight Training',
  Wheelchair: 'Wheelchair',
  Windsurf: 'Windsurf',
  Workout: 'Workout',
  Yoga: 'Yoga',
};

export const getAllActivityTypes = activities => _.uniq(activities.map(x => x.type)).sort();

export const getAllSeasons = activities => {
  const seasonConfig = activities.map(x => moment(x.start_date).format('YYYY'));
  return _.uniq(seasonConfig, true);
};
