import { State } from "./state";

export function drawScene(ctx: CanvasRenderingContext2D, state: State): void {
  ctx.clearRect(0, 0, state.ui.width, state.ui.height);
}
