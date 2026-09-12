import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMapConfigStore } from '@/stores/map-config-store';
import CollapsibleSection from './CollapsibleSection';
import ColorSwatches from './ColorSwatches';
import SubSection from './SubSection';
import ToggleRow from './ToggleRow';

const ACTIVITY_COLORS = ['#ff0000', '#2196f3', '#ffeb3b'];
const ROUTE_COLORS = ['#e6e6e9', '#9999a1', '#66666e'];

type MapOptionsSectionProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const MapOptionsSection = ({ isOpen, onOpenChange }: MapOptionsSectionProps) => {
  const config = useMapConfigStore((state) => state.config);
  const setConfig = useMapConfigStore((state) => state.setConfig);
  const resetActivityStyle = useMapConfigStore((state) => state.resetActivityStyle);
  const resetRouteStyle = useMapConfigStore((state) => state.resetRouteStyle);

  const [polylineWeight, setPolylineWeight] = useState(config.polylineWeight);
  const [routesLineWeight, setRoutesLineWeight] = useState(config.routesLineWeight);

  useEffect(() => setPolylineWeight(config.polylineWeight), [config.polylineWeight]);
  useEffect(() => setRoutesLineWeight(config.routesLineWeight), [config.routesLineWeight]);

  return (
    <CollapsibleSection label="Map Options" isOpen={isOpen} onOpenChange={onOpenChange}>
      <SubSection label="Activities">
        <ToggleRow
          label="Heatmap"
          active={config.heatMapMode}
          onClick={() => setConfig({ heatMapMode: !config.heatMapMode })}
        />

        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-base font-medium">Line Color</span>
          <ColorSwatches
            colors={ACTIVITY_COLORS}
            value={config.polylineColor}
            onChange={(polylineColor) => setConfig({ polylineColor })}
          />
        </div>

        <div className="flex items-center justify-between gap-4 px-3 py-2.5">
          <span className="text-base font-medium">Line Weight</span>
          <Slider
            min={1}
            max={5}
            step={1}
            value={[polylineWeight]}
            onValueChange={([value]) => setPolylineWeight(value)}
            onValueCommit={([value]) => setConfig({ polylineWeight: value })}
            className="w-32"
          />
        </div>

        <ToggleRow
          label="Show Bike Paths"
          active={config.showBikePaths}
          onClick={() => setConfig({ showBikePaths: !config.showBikePaths })}
        />
      </SubSection>

      <SubSection label="Routes">
        <ToggleRow
          label="Show Athlete Routes"
          active={config.showRoutes}
          onClick={() => setConfig({ showRoutes: !config.showRoutes })}
        />

        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-base font-medium">Line Color</span>
          <ColorSwatches
            colors={ROUTE_COLORS}
            value={config.routesLineColor}
            onChange={(routesLineColor) => setConfig({ routesLineColor })}
          />
        </div>

        <div className="flex items-center justify-between gap-4 px-3 py-2.5">
          <span className="text-base font-medium">Line Weight</span>
          <Slider
            min={1}
            max={5}
            step={1}
            value={[routesLineWeight]}
            onValueChange={([value]) => setRoutesLineWeight(value)}
            onValueCommit={([value]) => setConfig({ routesLineWeight: value })}
            className="w-32"
          />
        </div>
      </SubSection>

      <div className="px-3">
        <Button
          variant="secondary"
          className="w-full text-base"
          onClick={() => {
            resetActivityStyle();
            resetRouteStyle();
          }}
        >
          Reset to defaults
        </Button>
      </div>
    </CollapsibleSection>
  );
};

export default MapOptionsSection;
