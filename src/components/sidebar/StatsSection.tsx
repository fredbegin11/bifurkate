import { Button } from '@/components/ui/button';
import type { ProcessedActivity } from '@/lib/activities/process';
import { getTotalDistanceKm, getTotalElevationM, getTotalMovingHours } from '@/lib/activities/stats';
import { formatDistance, formatElevation } from '@/lib/format';
import { useMapConfigStore } from '@/stores/map-config-store';
import CollapsibleSection from './CollapsibleSection';
import SubSection from './SubSection';

type StatsSectionProps = {
  activities: ProcessedActivity[];
  activityCount: number;
  routeCount: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const StatsSection = ({ activities, activityCount, routeCount, isOpen, onOpenChange }: StatsSectionProps) => {
  const unit = useMapConfigStore((state) => state.config.unit);
  const setConfig = useMapConfigStore((state) => state.setConfig);

  return (
    <CollapsibleSection label="Stats" isOpen={isOpen} onOpenChange={onOpenChange}>
      <SubSection label="Units">
        <div className="grid grid-cols-2 gap-2 p-2">
          <Button
            variant={unit === 'metric' ? 'default' : 'outline'}
            className="text-base"
            onClick={() => setConfig({ unit: 'metric' })}
          >
            Metric
          </Button>
          <Button
            variant={unit === 'imperial' ? 'default' : 'outline'}
            className="text-base"
            onClick={() => setConfig({ unit: 'imperial' })}
          >
            Imperial
          </Button>
        </div>
      </SubSection>

      <SubSection label="Totals">
        <div className="flex flex-col gap-2 px-3 py-2.5 text-base">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Activities</span>
            <span className="font-bold">
              {activities.length === activityCount ? activityCount : `${activities.length} / ${activityCount}`}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Routes</span>
            <span className="font-bold">{routeCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Distance</span>
            <span className="font-bold">{formatDistance(getTotalDistanceKm(activities), unit)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Elevation</span>
            <span className="font-bold">{formatElevation(getTotalElevationM(activities), unit)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Moving Time</span>
            <span className="font-bold">{getTotalMovingHours(activities)} h</span>
          </div>
        </div>
      </SubSection>
    </CollapsibleSection>
  );
};

export default StatsSection;
