const ROUTE_PATH = 'M4 70 C 30 20, 55 100, 82 55 S 130 5, 158 60 S 205 15, 232 58 S 270 30, 296 55';

type RouteLoaderProps = {
  label: string;
};

const RouteLoader = ({ label }: RouteLoaderProps) => (
  <div className="flex flex-col items-center gap-6">
    <div className="relative h-24 w-72 max-w-full">
      <svg viewBox="0 0 300 100" className="h-full w-full" fill="none" aria-hidden="true">
        <path d={ROUTE_PATH} stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="5" strokeLinecap="round" />
        <path
          d={ROUTE_PATH}
          stroke="var(--color-primary)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="16 12"
          className="route-loader-dashes"
        />
      </svg>
      <div
        className="route-loader-dot absolute top-1 left-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_3px_var(--color-primary)]"
        style={{ offsetPath: `path('${ROUTE_PATH}')` }}
      />
    </div>

    <p className="text-lg font-semibold text-foreground">{label}&hellip;</p>
  </div>
);

export default RouteLoader;
