const BARS = [
  { x: 12, height: 26, opacity: 0.45 },
  { x: 40, height: 54, opacity: 0.7 },
  { x: 68, height: 68, opacity: 1 },
  { x: 96, height: 40, opacity: 0.6 },
];

type SeasonsIconProps = {
  isActive: boolean;
};

const SeasonsIcon = ({ isActive }: SeasonsIconProps) => (
  <svg viewBox="0 0 120 80" fill="none" className="size-full" aria-hidden="true">
    <line x1="4" y1="76" x2="116" y2="76" stroke="var(--color-border)" strokeWidth="2" />
    {BARS.map((bar, index) => (
      <rect
        key={bar.x}
        x={bar.x}
        y={76 - bar.height}
        width="16"
        height={bar.height}
        rx="4"
        fill="var(--color-primary)"
        fillOpacity={bar.opacity}
        style={{ transformOrigin: '50% 76px', animationDelay: `${index * 140}ms` }}
        className={isActive ? 'animate-grow-up' : 'scale-y-0'}
      />
    ))}
  </svg>
);

export default SeasonsIcon;
