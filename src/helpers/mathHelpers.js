export const getMedian = values => {
  if (values.length === 0) return 0;

  values.sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};

export const convertMeters = (value, unit) => {
  if (unit === 'metric') {
    return `${value.toFixed(0)} m`;
  }

  return `${(value * 3.28084).toFixed(0)} ft`;
};

export const convertKm = (value, unit, decimal = 0) => {
  if (unit === 'metric') {
    return `${value.toFixed(decimal)} km`;
  }

  return `${(value * 0.621371).toFixed(decimal).toLocaleString('fr')} mi`;
};
