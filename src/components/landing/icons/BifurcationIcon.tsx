const TRUNK = 'M8 40 C 28 40, 42 40, 56 40';
const UPPER_BRANCH = 'M56 40 C 72 40, 76 14, 112 12';
const LOWER_BRANCH = 'M56 40 C 72 40, 76 66, 112 68';

const BifurcationIcon = () => (
  <svg viewBox="0 0 120 80" fill="none" className="size-full" aria-hidden="true">
    {[TRUNK, UPPER_BRANCH, LOWER_BRANCH].map((path) => (
      <path
        key={path}
        d={path}
        stroke="var(--color-primary)"
        strokeOpacity="0.25"
        strokeWidth="6"
        strokeLinecap="round"
      />
    ))}
    {[TRUNK, UPPER_BRANCH, LOWER_BRANCH].map((path) => (
      <path
        key={path}
        d={path}
        stroke="var(--color-primary)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="14 14"
        className="animate-route-dash"
      />
    ))}
    <circle cx="56" cy="40" r="6" fill="#ffe4d6" className="drop-shadow-[0_0_8px_var(--color-primary)]" />
    <circle cx="112" cy="12" r="5" fill="var(--color-primary)" />
    <circle cx="112" cy="68" r="5" fill="var(--color-primary)" />
  </svg>
);

export default BifurcationIcon;
