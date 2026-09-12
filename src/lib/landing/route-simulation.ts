export type Rider = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  heading: number;
  turn: number;
  wobble: number;
  speed: number;
  age: number;
  outboundAge: number;
};

export type Segment = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

export type SimulationOptions = {
  width: number;
  height: number;
  originX: number;
  originY: number;
  maxRiders: number;
  spawnInterval: number;
  forkChance: number;
};

type Hub = { x: number; y: number };

const TWO_PI = Math.PI * 2;
const OUT_OF_BOUNDS_MARGIN = 40;
const SECONDARY_HUB_COUNT = 2;
const MAIN_HUB_SHARE = 0.75;
const HOME_RADIUS = 5;
const MAX_LOOP_OVERRUN = 2.2;
const MIN_FORK_AGE = 40;
const MAX_TURN = 0.02;
const TURN_DRIFT = 0.0015;
const CORNER_CHANCE = 0.02;

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

const randomSign = () => (Math.random() < 0.5 ? -1 : 1);

const normalizeAngle = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));

const createRider = (home: Hub, x: number, y: number, heading: number, age = 0): Rider => ({
  x,
  y,
  homeX: home.x,
  homeY: home.y,
  heading,
  turn: randomSign() * randomBetween(0.002, 0.012),
  wobble: randomBetween(0.02, 0.08),
  speed: randomBetween(1.1, 2.2),
  age,
  outboundAge: randomBetween(80, 560),
});

const createSecondaryHubs = (options: SimulationOptions): Hub[] =>
  Array.from({ length: SECONDARY_HUB_COUNT }, () => ({
    x: options.width * randomBetween(0.2, 0.8),
    y: options.height * randomBetween(0.2, 0.8),
  }));

export const createSimulation = (options: SimulationOptions) => {
  const mainHub: Hub = { x: options.originX, y: options.originY };
  const secondaryHubs = createSecondaryHubs(options);
  let riders: Rider[] = [];
  let ticksUntilSpawn = 0;

  const pickHub = () =>
    Math.random() < MAIN_HUB_SHARE
      ? mainHub
      : (secondaryHubs[Math.floor(Math.random() * secondaryHubs.length)] ?? mainHub);

  const spawn = () => {
    const hub = pickHub();
    riders.push(createRider(hub, hub.x, hub.y, Math.random() * TWO_PI));
  };

  const isOutOfBounds = (rider: Rider) =>
    rider.x < -OUT_OF_BOUNDS_MARGIN ||
    rider.y < -OUT_OF_BOUNDS_MARGIN ||
    rider.x > options.width + OUT_OF_BOUNDS_MARGIN ||
    rider.y > options.height + OUT_OF_BOUNDS_MARGIN;

  const distanceToHome = (rider: Rider) => Math.hypot(rider.homeX - rider.x, rider.homeY - rider.y);

  const isRideOver = (rider: Rider) => {
    const isHeadingHome = rider.age > rider.outboundAge;
    const hasClosedLoop = isHeadingHome && distanceToHome(rider) < HOME_RADIUS;
    const hasGivenUp = rider.age > rider.outboundAge * MAX_LOOP_OVERRUN;
    return hasClosedLoop || hasGivenUp || isOutOfBounds(rider);
  };

  const steer = (rider: Rider) => {
    rider.turn = Math.max(-MAX_TURN, Math.min(MAX_TURN, rider.turn + randomBetween(-TURN_DRIFT, TURN_DRIFT)));
    rider.heading += rider.turn + randomBetween(-rider.wobble, rider.wobble);
    if (Math.random() < CORNER_CHANCE) rider.heading += randomSign() * randomBetween(0.4, 1.2);

    if (rider.age <= rider.outboundAge) return;

    const homeward = Math.atan2(rider.homeY - rider.y, rider.homeX - rider.x);
    const homewardPull = Math.min(0.25, 0.03 + (rider.age - rider.outboundAge) / 1500);
    rider.heading += normalizeAngle(homeward - rider.heading) * homewardPull;
  };

  const step = (): Segment[] => {
    const segments: Segment[] = [];
    const forks: Rider[] = [];

    for (const rider of riders) {
      const fromX = rider.x;
      const fromY = rider.y;

      steer(rider);
      rider.x += Math.cos(rider.heading) * rider.speed;
      rider.y += Math.sin(rider.heading) * rider.speed;
      rider.age += 1;

      segments.push({ fromX, fromY, toX: rider.x, toY: rider.y });

      const canFork = riders.length + forks.length < options.maxRiders && rider.age > MIN_FORK_AGE;
      if (canFork && Math.random() < options.forkChance) {
        const home = { x: rider.homeX, y: rider.homeY };
        const heading = rider.heading + randomSign() * randomBetween(0.5, 1.3);
        forks.push(createRider(home, rider.x, rider.y, heading, rider.age));
      }
    }

    riders = riders.filter((rider) => !isRideOver(rider)).concat(forks);

    ticksUntilSpawn -= 1;
    if (ticksUntilSpawn <= 0 && riders.length < options.maxRiders) {
      spawn();
      ticksUntilSpawn = options.spawnInterval;
    }

    return segments;
  };

  const getRiders = () => riders;

  spawn();

  return { step, getRiders };
};

export type Simulation = ReturnType<typeof createSimulation>;
