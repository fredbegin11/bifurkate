import { useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import type { ProcessedActivity } from '@/lib/activities/process';
import { useFilterStore } from '@/stores/filter-store';
import { useUiStore } from '@/stores/ui-store';
import FiltersSection from './FiltersSection';
import MapOptionsSection from './MapOptionsSection';
import SidebarFooter from './SidebarFooter';
import StatsSection from './StatsSection';

type SidebarProps = {
  shownActivities: ProcessedActivity[];
  activityCount: number;
  routeCount: number;
};

type OpenSection = 'stats' | 'mapOptions' | 'filters' | null;

const Sidebar = ({ shownActivities, activityCount, routeCount }: SidebarProps) => {
  const isMenuOpen = useUiStore((state) => state.isMenuOpen);
  const closeMenu = useUiStore((state) => state.closeMenu);
  const hasActivityTypes = useFilterStore((state) => Object.keys(state.activityTypes).length > 0);
  const [openSection, setOpenSection] = useState<OpenSection>('stats');

  return (
    <Sheet open={isMenuOpen} onOpenChange={(open) => !open && closeMenu()} modal={false}>
      <SheetContent
        side="left"
        showOverlay={false}
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
        className="top-(--navbar-height) h-[calc(100%-var(--navbar-height))] w-full gap-0 sm:max-w-md"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>

        <div className="flex flex-1 flex-col overflow-y-auto">
          {hasActivityTypes ? (
            <>
              <StatsSection
                activities={shownActivities}
                activityCount={activityCount}
                routeCount={routeCount}
                isOpen={openSection === 'stats'}
                onOpenChange={(open) => setOpenSection(open ? 'stats' : null)}
              />
              <MapOptionsSection
                isOpen={openSection === 'mapOptions'}
                onOpenChange={(open) => setOpenSection(open ? 'mapOptions' : null)}
              />
              <FiltersSection
                isOpen={openSection === 'filters'}
                onOpenChange={(open) => setOpenSection(open ? 'filters' : null)}
              />
            </>
          ) : (
            <p className="px-5 text-base text-muted-foreground">No activities to display&hellip;</p>
          )}
        </div>

        <SidebarFooter />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
