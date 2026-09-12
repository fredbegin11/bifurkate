export const ACTIVITY_TYPE_LABELS: Record<string, string> = {
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

export const getAllActivityTypes = (activities: { type: string }[]) =>
  [...new Set(activities.map((activity) => activity.type))].sort();

export const getAllSeasons = (activities: { year: number }[]) =>
  [...new Set(activities.map((activity) => activity.year.toString()))].sort();
