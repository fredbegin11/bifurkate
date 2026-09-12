import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Unit = 'metric' | 'imperial';

export type MapConfig = {
  unit: Unit;
  heatMapMode: boolean;
  polylineColor: string;
  polylineWeight: number;
  showBikePaths: boolean;
  showRoutes: boolean;
  routesLineColor: string;
  routesLineWeight: number;
};

const defaultActivityStyle: Pick<MapConfig, 'heatMapMode' | 'polylineColor' | 'polylineWeight' | 'showBikePaths'> = {
  heatMapMode: false,
  polylineColor: '#ff0000',
  polylineWeight: 2,
  showBikePaths: false,
};

const defaultRouteStyle: Pick<MapConfig, 'showRoutes' | 'routesLineColor' | 'routesLineWeight'> = {
  showRoutes: false,
  routesLineColor: '#9999a1',
  routesLineWeight: 2,
};

const defaultConfig: MapConfig = {
  unit: 'metric',
  ...defaultActivityStyle,
  ...defaultRouteStyle,
};

type MapConfigState = {
  config: MapConfig;
  setConfig: (patch: Partial<MapConfig>) => void;
  resetActivityStyle: () => void;
  resetRouteStyle: () => void;
};

export const useMapConfigStore = create<MapConfigState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      setConfig: (patch) => set((state) => ({ config: { ...state.config, ...patch } })),
      resetActivityStyle: () => set((state) => ({ config: { ...state.config, ...defaultActivityStyle } })),
      resetRouteStyle: () => set((state) => ({ config: { ...state.config, ...defaultRouteStyle } })),
    }),
    {
      name: 'bifurkate-map-config',
      merge: (persisted, current) => ({
        ...current,
        config: { ...current.config, ...(persisted as Partial<MapConfigState>)?.config },
      }),
    },
  ),
);
