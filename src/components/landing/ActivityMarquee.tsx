import { ACTIVITY_TYPE_ICONS } from '@/components/sidebar/activity-type-icons';
import { ACTIVITY_TYPE_LABELS } from '@/lib/activities/activity-types';

const FEATURED_TYPES = [
  'Ride',
  'Run',
  'Hike',
  'Walk',
  'EBikeRide',
  'AlpineSki',
  'Swim',
  'Kayaking',
  'NordicSki',
  'Snowboard',
  'Rowing',
  'InlineSkate',
  'RockClimbing',
  'Surfing',
];

const ActivityMarquee = () => (
  <section aria-hidden="true" className="mask-fade-x overflow-hidden border-y border-border bg-card/40 py-6">
    <div className="flex w-max animate-marquee gap-12 pr-12 hover:[animation-play-state:paused]">
      {[0, 1].map((copy) =>
        FEATURED_TYPES.map((type) => {
          const Icon = ACTIVITY_TYPE_ICONS[type];
          return (
            <div
              key={`${copy}-${type}`}
              className="flex items-center gap-3 text-xl font-semibold text-muted-foreground"
            >
              {Icon && <Icon className="size-6 text-primary" />}
              {ACTIVITY_TYPE_LABELS[type]}
            </div>
          );
        }),
      )}
    </div>
  </section>
);

export default ActivityMarquee;
