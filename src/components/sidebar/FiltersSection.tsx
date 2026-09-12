import { X } from 'lucide-react';
import { useState } from 'react';
import type { DateRange as DayPickerRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ACTIVITY_TYPE_LABELS } from '@/lib/activities/activity-types';
import { toIsoDateString, toLocalDate } from '@/lib/date';
import { useFilterStore } from '@/stores/filter-store';
import { ACTIVITY_TYPE_ICONS } from './activity-type-icons';
import CollapsibleSection from './CollapsibleSection';
import SubSection from './SubSection';
import ToggleRow from './ToggleRow';

const formatDate = (value: string) =>
  toLocalDate(value)?.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) ?? value;

const formatRangeLabel = (startDate: string | null, endDate: string | null) =>
  startDate && endDate ? `${formatDate(startDate)} – ${formatDate(endDate)}` : 'Select dates';

type FiltersSectionProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const FiltersSection = ({ isOpen, onOpenChange }: FiltersSectionProps) => {
  const seasons = useFilterStore((state) => state.seasons);
  const toggleSeason = useFilterStore((state) => state.toggleSeason);
  const activateOnlySeason = useFilterStore((state) => state.activateOnlySeason);
  const setAllSeasons = useFilterStore((state) => state.setAllSeasons);
  const dateRange = useFilterStore((state) => state.dateRange);
  const setDateRange = useFilterStore((state) => state.setDateRange);
  const clearDateRange = useFilterStore((state) => state.clearDateRange);
  const activityTypes = useFilterStore((state) => state.activityTypes);
  const toggleActivityType = useFilterStore((state) => state.toggleActivityType);
  const clearFilters = useFilterStore((state) => state.clearFilters);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const hasRange = !!(dateRange.startDate && dateRange.endDate);

  const selected: DayPickerRange = {
    from: toLocalDate(dateRange.startDate),
    to: toLocalDate(dateRange.endDate),
  };

  const handleSelect = (range: DayPickerRange | undefined) => {
    setDateRange({ startDate: toIsoDateString(range?.from), endDate: toIsoDateString(range?.to) });
  };

  const hasActiveFilter =
    hasRange ||
    Object.values(seasons).some((active) => !active) ||
    Object.values(activityTypes).some((active) => !active);

  return (
    <CollapsibleSection label="Filters" hasActiveFilter={hasActiveFilter} isOpen={isOpen} onOpenChange={onOpenChange}>
      <SubSection label="Activity Type">
        {Object.keys(activityTypes).map((type) => (
          <ToggleRow
            key={type}
            label={ACTIVITY_TYPE_LABELS[type] ?? type}
            icon={ACTIVITY_TYPE_ICONS[type]}
            active={activityTypes[type]}
            onClick={() => toggleActivityType(type)}
          />
        ))}
      </SubSection>

      <SubSection label="Time Range">
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="flex items-center gap-2 text-base font-medium">
            Seasons
            {hasRange && <span className="text-base font-normal text-muted-foreground">(overridden by dates)</span>}
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAllSeasons(true)}
              className="cursor-pointer text-base font-medium text-primary hover:underline"
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setAllSeasons(false)}
              className="cursor-pointer text-base font-medium text-primary hover:underline"
            >
              None
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-3 py-2.5">
          {Object.keys(seasons)
            .sort()
            .reverse()
            .map((season) => (
              <Button
                key={season}
                type="button"
                variant={!hasRange && seasons[season] ? 'default' : 'outline'}
                className="text-base"
                onClick={() => (hasRange ? activateOnlySeason(season) : toggleSeason(season))}
              >
                {season}
              </Button>
            ))}
        </div>

        <div className="relative px-3 py-2.5">
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={
                  hasRange
                    ? 'w-full justify-start pr-9 text-base font-normal'
                    : 'w-full justify-start text-base font-normal'
                }
              >
                {formatRangeLabel(dateRange.startDate, dateRange.endDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="range" selected={selected} onSelect={handleSelect} defaultMonth={selected.from} />
            </PopoverContent>
          </Popover>

          {hasRange && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                clearDateRange();
              }}
              aria-label="Clear dates"
              className="absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          )}
        </div>
      </SubSection>

      <div className="px-3">
        <Button variant="secondary" className="w-full text-base" onClick={clearFilters}>
          Clear filters
        </Button>
      </div>
    </CollapsibleSection>
  );
};

export default FiltersSection;
