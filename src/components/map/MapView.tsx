import 'leaflet/dist/leaflet.css';
import { canvas } from 'leaflet';
import { Activity, ExternalLink, RouteIcon, TrendingUp, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import { ACTIVITY_TYPE_ICONS } from '@/components/sidebar/activity-type-icons';
import { Button } from '@/components/ui/button';
import { ACTIVITY_TYPE_LABELS } from '@/lib/activities/activity-types';
import { getAverageCenter } from '@/lib/activities/center';
import type { ProcessedActivity, ProcessedRoute } from '@/lib/activities/process';
import { type SelectedItem, selectedItemMapper } from '@/lib/activities/selected-item-mapper';
import { formatDistance, formatElevation } from '@/lib/format';
import { useMapConfigStore } from '@/stores/map-config-store';

const INITIAL_ZOOM = 10;

type MapViewProps = {
  activities: ProcessedActivity[];
  routes: ProcessedRoute[];
};

const getSelectedIcon = (item: SelectedItem) =>
  item.kind === 'route' ? RouteIcon : (ACTIVITY_TYPE_ICONS[item.type ?? ''] ?? Activity);

const RecenterMap = ({ center }: { center: [number, number] | null }) => {
  const map = useMap();
  const hasCenteredOnce = useRef(false);

  useEffect(() => {
    if (!center || hasCenteredOnce.current) return;

    hasCenteredOnce.current = true;
    map.setView(center, INITIAL_ZOOM);
  }, [center, map]);

  return null;
};

const MapView = ({ activities, routes }: MapViewProps) => {
  const config = useMapConfigStore((state) => state.config);
  const center = useMemo(() => getAverageCenter(activities), [activities]);
  const [selected, setSelected] = useState<SelectedItem | null>(null);

  useEffect(() => {
    if (!selected) return;

    const stillVisible =
      selected.kind === 'activity'
        ? activities.some((activity) => activity.id === selected.id)
        : routes.some((route) => route.id === selected.id);

    if (!stillVisible) setSelected(null);
  }, [selected, activities, routes]);

  const activityOpacity = config.heatMapMode ? 0.3 : 1;

  const SelectedIcon = selected && getSelectedIcon(selected);
  const selectedTypeLabel =
    selected?.kind === 'activity' ? (ACTIVITY_TYPE_LABELS[selected.type ?? ''] ?? selected.type) : null;

  return (
    <MapContainer
      preferCanvas
      renderer={canvas({ tolerance: 15 })}
      center={[46.81, -71.29]}
      zoom={8}
      zoomSnap={0.5}
      zoomControl={false}
      minZoom={3}
      fadeAnimation={false}
      className="relative z-10 h-full w-full bg-black"
    >
      <TileLayer
        url={`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png?key=${import.meta.env.VITE_CARTO_API_KEY}`}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {config.showBikePaths && (
        <TileLayer
          className="bike-paths-tiles"
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm-lite/{z}/{x}/{y}.png"
          attribution="CyclOSM | OSM-FR"
        />
      )}

      <RecenterMap center={center} />

      {config.showRoutes &&
        routes.map((route) => (
          <Polyline
            key={`route-${route.id}`}
            positions={route.polyline}
            pathOptions={{
              color: config.routesLineColor,
              weight: config.routesLineWeight,
            }}
            eventHandlers={{
              click: (event) => setSelected(selectedItemMapper.fromRoute(route, [event.latlng.lat, event.latlng.lng])),
            }}
          />
        ))}

      {activities.map((activity) => (
        <Polyline
          key={`activity-${activity.id}`}
          positions={activity.polyline}
          pathOptions={{
            color: config.polylineColor,
            weight: config.polylineWeight,
            opacity: activityOpacity,
          }}
          eventHandlers={{
            click: (event) =>
              setSelected(selectedItemMapper.fromActivity(activity, [event.latlng.lat, event.latlng.lng])),
          }}
        />
      ))}

      {selected && <Polyline positions={selected.polyline} pathOptions={{ color: '#ffffff', weight: 2 }} />}

      {selected && SelectedIcon && (
        <Popup
          position={selected.position}
          closeButton={false}
          closeOnClick={false}
          minWidth={260}
          maxWidth={320}
          className="bifurkate-popup"
          eventHandlers={{ remove: () => setSelected(null) }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <SelectedIcon className="size-5" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <span className="min-w-0 font-bold text-foreground text-lg leading-tight wrap-break-word">
                    {selected.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                    className="-mt-1 -mr-1 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <span className="text-base text-muted-foreground">
                  {selectedTypeLabel ? `${selectedTypeLabel} · ` : ''}
                  {new Date(selected.date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 rounded-xl bg-muted/50 p-3">
                <span className="flex items-center gap-1.5 text-base text-muted-foreground">
                  <RouteIcon className="size-4" />
                  Distance
                </span>
                <span className="font-semibold text-base text-foreground">
                  {formatDistance(selected.distance / 1000, config.unit, 2)}
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-muted/50 p-3">
                <span className="flex items-center gap-1.5 text-base text-muted-foreground">
                  <TrendingUp className="size-4" />
                  Elevation
                </span>
                <span className="font-semibold text-base text-foreground">
                  {formatElevation(selected.elevation, config.unit)}
                </span>
              </div>
            </div>

            <Button asChild className="w-full text-base">
              <a href={selected.url} target="_blank" rel="noreferrer">
                View on Strava
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </Popup>
      )}
    </MapContainer>
  );
};

export default MapView;
