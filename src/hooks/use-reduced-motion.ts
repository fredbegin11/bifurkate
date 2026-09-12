import { useMediaQuery } from './use-media-query';

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
