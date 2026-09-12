import type { Unit } from '@/stores/map-config-store';

export const formatDistance = (km: number, unit: Unit, decimals = 0) =>
  unit === 'metric' ? `${km.toFixed(decimals)} km` : `${(km * 0.621371).toFixed(decimals)} mi`;

export const formatElevation = (meters: number, unit: Unit) =>
  unit === 'metric' ? `${meters.toFixed(0)} m` : `${(meters * 3.28084).toFixed(0)} ft`;
