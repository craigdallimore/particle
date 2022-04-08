import { Vector } from "@decoy9697/vector";
import Emitter from "./emitter";

export type State = {
  ui: {
    dimensions: Vector;
  };
  emitters: Array<Emitter>;
};

export function updateState(state: State) {
  return function onTick(tick: number) {
    state.emitters.forEach((e) => e.update(tick / 1000, state.ui.dimensions));
    return state;
  };
}

export function initialiseState(width: number, height: number): State {
  const e1 = new Emitter();
  e1.position = [100, 100];
  e1.steering = [0, 60];
  e1.maxParticles = 240;
  e1.initialForce = [-30, -30];
  e1.initialRange = [50, 10];
  e1.initialEnergy = 10;
  e1.initialEnergyRange = 3;

  const e2 = new Emitter();
  e2.position = [100, 100];
  e2.steering = [0, 30];
  e2.maxParticles = 240;
  e2.initialForce = [30, -30];
  e2.initialRange = [-50, 10];
  e2.initialEnergy = 10;
  e2.initialEnergyRange = 3;

  const e3 = new Emitter();
  e3.position = [100, 100];
  e3.steering = [0, 60];
  e3.maxParticles = 210;
  e3.initialForce = [130, -120];
  e3.initialRange = [56, 2];
  e3.initialEnergy = 20;
  e3.initialEnergyRange = 10;
  const state: State = {
    ui: { dimensions: [width, height] },
    emitters: [e1, e2, e3],
  };
  return state;
}
