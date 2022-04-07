export type State = {
  ui: {
    width: number;
    height: number;
  };
};

const state: State = {
  ui: {
    width: 0,
    height: 0,
  },
};

export function updateState(tick: number): State {
  return state;
}

export function setDimensions(width: number, height: number): void {
  state.ui.width = width;
  state.ui.height = height;
}
