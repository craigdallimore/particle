import { drawScene } from "./drawScene";
import { initialiseState, State, updateState } from "./state";

const canvas = document.body.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.translate(0.5, 0.5);
ctx.scale(devicePixelRatio, devicePixelRatio);

const rAF = window.requestAnimationFrame;

function main(ctx: CanvasRenderingContext2D, state: State) {
  const onTick = updateState(state);

  function frame(prevtime: number) {
    return function nextFrame(time: number) {
      const tick = time - prevtime;
      const state = onTick(tick);
      drawScene(ctx, state);
      rAF(frame(time));
    };
  }

  rAF(frame(0));
}

const p = canvas.parentNode as HTMLElement;
const rect = p.getBoundingClientRect();
const state = initialiseState(rect.width, rect.height);

main(ctx, state);
