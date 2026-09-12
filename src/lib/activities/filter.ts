import type { DateRange } from '@/stores/filter-store';
import type { ProcessedActivity } from './process';

type Filters = {
  activityTypes: Record<string, boolean>;
  seasons: Record<string, boolean>;
  dateRange: DateRange;
};

const localDateOf = (activity: ProcessedActivity) => activity.start_date_local.slice(0, 10);

export const filterActivities = (activities: ProcessedActivity[], filters: Filters): ProcessedActivity[] => {
  const selectedTypes = new Set(Object.keys(filters.activityTypes).filter((type) => filters.activityTypes[type]));
  const result = activities.filter((activity) => selectedTypes.has(activity.type));

  const { startDate, endDate } = filters.dateRange;

  if (startDate && endDate) {
    return result.filter((activity) => {
      const date = localDateOf(activity);
      return date >= startDate && date <= endDate;
    });
  }

  const selectedSeasons = new Set(Object.keys(filters.seasons).filter((season) => filters.seasons[season]));

  return result.filter((activity) => selectedSeasons.has(activity.year.toString()));
};
