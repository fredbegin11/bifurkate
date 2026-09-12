import { useEffect, useRef, useState } from 'react';

export const useReveal = <T extends HTMLElement>(threshold = 0.2) => {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsRevealed(true);
        observer.disconnect();
      },
      { threshold },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isRevealed };
};
