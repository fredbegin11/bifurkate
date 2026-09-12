const TRACKS = [
  { d: 'M10 62 C 30 50, 40 20, 60 30 S 95 55, 112 18', delay: 0 },
  { d: 'M10 44 C 25 60, 45 64, 60 30 S 90 10, 112 40', delay: 600 },
  { d: 'M14 18 C 30 30, 50 20, 60 30 S 80 70, 108 66', delay: 1200 },
  { d: 'M6 30 C 30 36, 45 42, 60 30 S 100 30, 114 56', delay: 1800 },
];

const HeatmapIcon = () => (
  <svg viewBox="0 0 120 80" fill="none" className="size-full" aria-hidden="true">
    <rect x="2" y="2" width="116" height="76" rx="10" stroke="var(--color-border)" strokeWidth="2" />
    {TRACKS.map((track) => (
      <path
        key={track.d}
        d={track.d}
        stroke="var(--color-primary)"
        strokeWidth="5"
        strokeLinecap="round"
        style={{ animationDelay: `${track.delay}ms` }}
        className="animate-heat-pulse"
      />
    ))}
    <circle cx="60" cy="30" r="7" fill="var(--color-primary)" fillOpacity="0.5" />
    <circle cx="60" cy="30" r="3.5" fill="#ffe4d6" />
  </svg>
);

export default HeatmapIcon;
