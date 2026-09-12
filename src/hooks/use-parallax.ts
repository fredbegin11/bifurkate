import { type RefObject, useEffect, useRef } from 'react';
import { useReducedMotion } from './use-reduced-motion';

export const useParallax = <T extends HTMLElement>(area: RefObject<HTMLElement | null>, strength = 24) => {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const surface = area.current;
    const target = ref.current;
    if (!surface || !target || prefersReducedMotion) return;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = surface.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
      target.style.transform = `translate3d(${-offsetX * strength}px, ${-offsetY * strength}px, 0) scale(1.08)`;
    };

    const handleLeave = () => {
      target.style.transform = 'translate3d(0, 0, 0) scale(1.08)';
    };

    surface.addEventListener('pointermove', handleMove);
    surface.addEventListener('pointerleave', handleLeave);

    return () => {
      surface.removeEventListener('pointermove', handleMove);
      surface.removeEventListener('pointerleave', handleLeave);
    };
  }, [area, strength, prefersReducedMotion]);

  return ref;
};
