import type { Rider, Segment } from './route-simulation';

const TRAIL_COLOR = 'rgba(252, 76, 2, 0.3)';
const HEAD_CORE_COLOR = '#ffe4d6';
const HEAD_GLOW_COLOR = 'rgba(255, 122, 60, 0.9)';
const HEAD_GLOW_RADIUS = 7;

const getContext = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D context unavailable');
  return context;
};

export const createRenderer = (canvas: HTMLCanvasElement, fadeRate: number) => {
  const trails = document.createElement('canvas');
  const screen = getContext(canvas);
  const trailInk = getContext(trails);
  let width = 0;
  let height = 0;
  let scale = 1;

  const resize = (nextWidth: number, nextHeight: number, devicePixelRatio: number) => {
    width = nextWidth;
    height = nextHeight;
    scale = devicePixelRatio;
    for (const target of [canvas, trails]) {
      target.width = Math.floor(width * scale);
      target.height = Math.floor(height * scale);
    }
    trailInk.setTransform(scale, 0, 0, scale, 0, 0);
    trailInk.lineCap = 'round';
    trailInk.lineJoin = 'round';
    trailInk.lineWidth = 2;
    trailInk.strokeStyle = TRAIL_COLOR;
  };

  const fade = () => {
    trailInk.globalCompositeOperation = 'destination-out';
    trailInk.fillStyle = `rgba(0, 0, 0, ${fadeRate})`;
    trailInk.fillRect(0, 0, width, height);
  };

  const drawSegments = (segments: Segment[]) => {
    trailInk.globalCompositeOperation = 'source-over';
    trailInk.beginPath();
    for (const segment of segments) {
      trailInk.moveTo(segment.fromX, segment.fromY);
      trailInk.lineTo(segment.toX, segment.toY);
    }
    trailInk.stroke();
  };

  const drawHead = (rider: Rider) => {
    const glow = screen.createRadialGradient(rider.x, rider.y, 0, rider.x, rider.y, HEAD_GLOW_RADIUS);
    glow.addColorStop(0, HEAD_GLOW_COLOR);
    glow.addColorStop(1, 'rgba(255, 122, 60, 0)');
    screen.fillStyle = glow;
    screen.beginPath();
    screen.arc(rider.x, rider.y, HEAD_GLOW_RADIUS, 0, Math.PI * 2);
    screen.fill();

    screen.fillStyle = HEAD_CORE_COLOR;
    screen.beginPath();
    screen.arc(rider.x, rider.y, 1.6, 0, Math.PI * 2);
    screen.fill();
  };

  const compose = (riders: Rider[]) => {
    screen.setTransform(1, 0, 0, 1, 0, 0);
    screen.clearRect(0, 0, canvas.width, canvas.height);
    screen.drawImage(trails, 0, 0);
    screen.setTransform(scale, 0, 0, scale, 0, 0);
    for (const rider of riders) drawHead(rider);
  };

  return { resize, fade, drawSegments, compose };
};

export type Renderer = ReturnType<typeof createRenderer>;
