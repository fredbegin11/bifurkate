export const getAverageCenter = (items: { polyline: [number, number][] }[]): [number, number] | null => {
  const points = items.map((item) => item.polyline[0]).filter((point): point is [number, number] => !!point);

  if (points.length === 0) return null;

  const [latSum, lngSum] = points.reduce(([latAcc, lngAcc], [lat, lng]) => [latAcc + lat, lngAcc + lng], [0, 0]);

  return [latSum / points.length, lngSum / points.length];
};
