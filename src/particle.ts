import { Vector } from "@decoy9697/vector";

export class Particle {
  constructor() {
    this.position = [0, 0];
    this.velocity = [0, 0];
    this.lastPosition = [0, 0];
    this.energy = -1;
  }
  position: Vector;
  lastPosition: Vector;
  velocity: Vector;
  energy: number;
}
