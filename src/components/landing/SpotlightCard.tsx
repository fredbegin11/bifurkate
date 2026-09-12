import { cn } from 'cn';
import type { PointerEvent, ReactNode } from 'react';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

const SpotlightCard = ({ children, className }: SpotlightCardProps) => {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border bg-card/60 transition-[border-color,translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_30px_60px_-30px_oklch(0.65_0.22_32/50%)] motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </div>
  );
};

export default SpotlightCard;
