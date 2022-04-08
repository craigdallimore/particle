import { add, multiply, Vector } from "@decoy9697/vector";
import { Particle } from "./particle";

function isOutsideArea(point: Vector, area: Vector): boolean {
  return (
    point[0] < 0 || point[1] < 0 || point[0] > area[0] || point[1] > area[1]
  );
}

export default class Emitter {
  constructor() {
    this.position = [0, 0];
    this.initialForce = [0, 0];
    this.initialRange = [0, 0];
    this.initialEnergy = 0;
    this.initialEnergyRange = 0;
    this.maxParticles = 0;
    this.particles = [];
    this.steering = [0, 0];
  }

  // The force that is applied to the particles over time, such as gravity
  steering: Vector;
  // The initial force applied to the particals when they begin their motion
  initialForce: Vector;
  // The extent of randomness applied to the initial force
  initialRange: Vector;
  // Where the particles begin their motion
  position: Vector;
  // The lifetime of particles in seconds
  initialEnergy: number;
  // Random extra energy
  initialEnergyRange: number;
  // Holds the particles
  particles: Array<Particle>;
  // The total number of particles this emitter can hold
  maxParticles: number;

  getStrokeStyle(p: Particle): string {
    const energyPercent = p.energy / this.initialEnergy;

    const h = energyPercent * 43;
    const s = 100;
    const l = energyPercent * 100;
    const a = energyPercent;
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }

  addParticle() {
    const p = new Particle();
    this.resetParticle(p);
    this.particles.push(p);
  }

  resetParticle(p: Particle) {
    const x = this.initialForce[0] + Math.random() * this.initialRange[0];
    const y = this.initialForce[1] + Math.random() * this.initialRange[1];
    const energy =
      this.initialEnergyRange + Math.random() * this.initialEnergyRange;

    p.velocity = [x, y];
    p.position = [this.position[0], this.position[1]];
    p.lastPosition = [this.position[0], this.position[1]];
    p.energy = energy; // Lifetime of particle in seconds
  }

  updateParticle(p: Particle, time: number, dimensions: Vector) {
    if (p.energy <= 0 || isOutsideArea(p.position, dimensions)) {
      // Rather than destroying and allocating particles, when they run out of
      // energy we reset them to some new starting state.
      return this.resetParticle(p);
    }

    p.velocity = add(p.velocity, multiply(this.steering, time));
    p.lastPosition = [p.position[0], p.position[1]];
    p.position = add(p.position, multiply(p.velocity, time));
    p.energy = p.energy - time;
  }

  update(time: number, dimensions: Vector) {
    if (this.particles.length < this.maxParticles) {
      // Currently adding one particle per update
      // Potential improvements:
      // - add particles at a variable rate
      // - reset off-canvas particles instead of adding new ones
      this.addParticle();
    }

    this.particles.forEach((p) => this.updateParticle(p, time, dimensions));
  }
}
