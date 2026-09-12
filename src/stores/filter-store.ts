import { create } from 'zustand';

export type DateRange = { startDate: string | null; endDate: string | null };

const emptyDateRange: DateRange = { startDate: null, endDate: null };

const withKeys = (current: Record<string, boolean>, keys: string[]) =>
  Object.fromEntries(keys.map((key) => [key, current[key] ?? true]));

const allTrue = (current: Record<string, boolean>) => withKeys({}, Object.keys(current));

type FilterState = {
  activityTypes: Record<string, boolean>;
  seasons: Record<string, boolean>;
  dateRange: DateRange;
  initialize: (activityTypes: string[], seasons: string[]) => void;
  toggleActivityType: (type: string) => void;
  toggleSeason: (season: string) => void;
  activateOnlySeason: (season: string) => void;
  setAllSeasons: (value: boolean) => void;
  setDateRange: (range: DateRange) => void;
  clearDateRange: () => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterState>()((set) => ({
  activityTypes: {},
  seasons: {},
  dateRange: emptyDateRange,

  initialize: (activityTypes, seasons) =>
    set((state) => ({
      activityTypes: withKeys(state.activityTypes, activityTypes),
      seasons: withKeys(state.seasons, seasons),
    })),

  toggleActivityType: (type) =>
    set((state) => ({ activityTypes: { ...state.activityTypes, [type]: !state.activityTypes[type] } })),

  toggleSeason: (season) =>
    set((state) => ({
      seasons: { ...state.seasons, [season]: !state.seasons[season] },
      dateRange: emptyDateRange,
    })),

  activateOnlySeason: (season) =>
    set((state) => ({
      seasons: Object.fromEntries(Object.keys(state.seasons).map((key) => [key, key === season])),
      dateRange: emptyDateRange,
    })),

  setAllSeasons: (value) =>
    set((state) => ({
      seasons: Object.fromEntries(Object.keys(state.seasons).map((season) => [season, value])),
      dateRange: emptyDateRange,
    })),

  setDateRange: (dateRange) => set({ dateRange }),

  clearDateRange: () => set({ dateRange: emptyDateRange }),

  clearFilters: () =>
    set((state) => ({
      activityTypes: allTrue(state.activityTypes),
      seasons: allTrue(state.seasons),
      dateRange: emptyDateRange,
    })),
}));
