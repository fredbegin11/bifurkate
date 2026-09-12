import { cn } from 'cn';
import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/use-reveal';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const { ref, isRevealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-[opacity,translate,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        isRevealed
          ? 'translate-y-0 opacity-100 blur-0'
          : 'translate-y-10 opacity-0 blur-sm motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Reveal;
