import _ from 'lodash';
import moment from 'moment';
import polyline from '@mapbox/polyline';
import { getFormattedDate } from './dateHelpers';

export const filterActivitiesToDisplay = (activities, options) => {
  const { activityTypeConfig, seasonConfig } = options;
  const typeKeys = Object.keys(activityTypeConfig);
  const seasonKeys = Object.keys(seasonConfig);
  const { startDate, endDate } = options.datesConfig;

  let filteredActivities = activities.filter(x => !!x.polyline);

  const selectedTypes = typeKeys.filter(key => !!activityTypeConfig[key]);
  filteredActivities = filteredActivities.filter(x => selectedTypes.includes(x.type));

  if (startDate && endDate) {
    filteredActivities = filteredActivities.filter(x => {
      const activityDate = moment(x.start_date);
      return activityDate.isBefore(endDate) && activityDate.isAfter(startDate);
    });
  } else {
    const selectedSeasons = seasonKeys.filter(key => !!seasonConfig[key]);
    filteredActivities = filteredActivities.filter(x => selectedSeasons.includes(moment(x.start_date).format('YYYY')));
  }

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

export const getSeasonConfig = activities => {
  const seasonConfig = {};
  const allSeasons = activities.map(x => moment(x.start_date).format('YYYY'));
  const uniqueSeasons = _.uniq(allSeasons, true);
  uniqueSeasons.forEach(x => {
    seasonConfig[x] = true;
  });

  return seasonConfig;
};

export const getTotalDistance = activities => Math.round(activities.reduce((accumulator, activity) => accumulator + activity.distance, 0) / 1000);
export const getTotalTime = activities => getFormattedDate(activities.reduce((accumulator, activity) => accumulator + activity.moving_time, 0));
export const getTotalElevation = activities => Math.round(activities.reduce((accumulator, activity) => accumulator + activity.total_elevation_gain, 0));
