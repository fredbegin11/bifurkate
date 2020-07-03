import _ from 'lodash';
import moment from 'moment';
import polyline from '@mapbox/polyline';

// TODO: Clean This Mess
export const filterActivities = (activities, options) => {
  const { activityTypeConfig } = options;

  const typesToShow = Object.keys(activityTypeConfig).filter(key => !!activityTypeConfig[key]);

  let filteredActivities = activities.filter(x => !!x.polyline);
  filteredActivities = filteredActivities.filter(x => typesToShow.includes(x.type));

  const seasons = Object.keys(options.seasons);
  seasons.forEach(season => {
    if (!options.seasons[season]) {
      filteredActivities = filteredActivities.filter(x => moment(x.start_date).format('YYYY') !== season);
    }
  });

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
  let seasonsObject = {};
  const filteredActivities = data.filter(x => !x.type.includes('Virtual') && !!_.get(x, 'map.summary_polyline'));

  const seasons = filteredActivities.map(x => moment(x.start_date).format('YYYY'));
  const uniqueSeasons = _.uniq(seasons, true);
  uniqueSeasons.forEach(x => (seasonsObject[x] = true));

  return { processedActivities: filteredActivities.map(x => decodePolylines(x)).reverse(), processedSeasons: seasonsObject };
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

export const getAllActivityTypes = activities => _.uniq(activities.map(x => x.type));
