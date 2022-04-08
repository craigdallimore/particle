import Emitter from "./emitter";

export type State = {
  ui: {
    width: number;
    height: number;
  };
  emitters: Array<Emitter>;
};

export function updateState(state: State) {
  return function onTick(tick: number) {
    state.emitters.forEach((e) => e.update(tick / 1000));
    return state;
  };
}

export function initialiseState(width: number, height: number): State {
  const emitter = new Emitter();
  emitter.position = [100, 20];
  emitter.steering = [0, 0];
  emitter.maxParticles = 300;
  emitter.initialForce = [-100, -100];
  emitter.initialRange = [200, 200];
  emitter.initialEnergy = 15;
  emitter.initialEnergyRange = 5;

  const state: State = {
    ui: {
      width,
      height,
    },
    emitters: [emitter],
  };
  return state;
}
