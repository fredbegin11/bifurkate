import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { createRenderer } from '@/lib/landing/route-renderer';
import { createSimulation } from '@/lib/landing/route-simulation';

type RouteCanvasProps = {
  originX?: number;
  originY?: number;
  maxRiders?: number;
  spawnInterval?: number;
  forkChance?: number;
  fadeRate?: number;
  className?: string;
};

const FRAME_DURATION = 1000 / 60;
const MAX_STEPS_PER_FRAME = 4;
const WARMUP_STEPS = 420;
const STATIC_STEPS = 2400;

const RouteCanvas = ({
  originX = 0.5,
  originY = 0.5,
  maxRiders = 22,
  spawnInterval = 16,
  forkChance = 0.016,
  fadeRate = 0.003,
  className,
}: RouteCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createRenderer(canvas, fadeRate);
    let simulation = createSimulation({
      width: 0,
      height: 0,
      originX: 0,
      originY: 0,
      maxRiders,
      spawnInterval,
      forkChance,
    });
    let frameId = 0;
    let lastTime = 0;
    let isVisible = false;

    const runSteps = (count: number) => {
      for (let index = 0; index < count; index += 1) renderer.drawSegments(simulation.step());
    };

    const frame = (time: number) => {
      const elapsed = lastTime === 0 ? FRAME_DURATION : time - lastTime;
      lastTime = time;
      const steps = Math.min(MAX_STEPS_PER_FRAME, Math.max(1, Math.round(elapsed / FRAME_DURATION)));

      renderer.fade();
      runSteps(steps);
      renderer.compose(simulation.getRiders());
      frameId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (frameId || !isVisible || prefersReducedMotion) return;
      lastTime = 0;
      frameId = requestAnimationFrame(frame);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const reset = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.resize(width, height, Math.min(window.devicePixelRatio || 1, 2));
      simulation = createSimulation({
        width,
        height,
        originX: width * originX,
        originY: height * originY,
        maxRiders,
        spawnInterval,
        forkChance,
      });

      if (prefersReducedMotion) {
        runSteps(STATIC_STEPS);
        renderer.compose([]);
        return;
      }

      runSteps(WARMUP_STEPS);
      renderer.compose(simulation.getRiders());
    };

    const resizeObserver = new ResizeObserver(() => reset());
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = !!entry?.isIntersecting;
      if (isVisible) start();
      else stop();
    });

    reset();
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [originX, originY, maxRiders, spawnInterval, forkChance, fadeRate, prefersReducedMotion]);

  return <canvas ref={canvasRef} className={className} />;
};

export default RouteCanvas;
