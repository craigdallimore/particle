import { add, multiply, Vector } from "@decoy9697/vector";
import { Particle } from "./particle";

export type State = {
  ui: {
    width: number;
    height: number;
  };
  particles: Array<Particle>;
};

function resetParticle(p: Particle): Particle {
  const x = 20 + Math.random() * 20;
  const y = -75 + Math.random() * 10;
  const energy = Math.random() * 3;

  p.velocity = [x, y];
  p.position = [10, 30];
  p.lastPosition = [10, 30];
  p.energy = energy; // Lifetime of particle in seconds
  return p;
}

function updateParticle(p: Particle, time: number, steering: Vector): Particle {
  if (p.energy <= 0) {
    // Rather than destroying and allocating particles, when they run out of
    // energy we reset them to some new starting state.
    return resetParticle(p);
  }

  p.velocity = add(p.velocity, multiply(steering, time));
  p.lastPosition = [p.position[0], p.position[1]];
  p.position = add(p.position, multiply(p.velocity, time));
  p.energy = p.energy - time;

  return p;
}

export function updateState(state: State) {
  // gravity
  const steering: Vector = [0, 160.5];

  return function onTick(tick: number) {
    state.particles = state.particles.map((p) =>
      updateParticle(p, tick / 1000, steering)
    );
    return state;
  };
}

export function initialiseState(width: number, height: number): State {
  const state: State = {
    ui: {
      width,
      height,
    },
    particles: Array.from({ length: 500 }).map(() => {
      const p = new Particle();
      return resetParticle(p);
    }),
  };
  return state;
}
