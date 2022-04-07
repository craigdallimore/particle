import { drawScene } from "./drawScene";
import { setDimensions, updateState } from "./state";

const canvas = document.body.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.translate(0.5, 0.5);
ctx.scale(devicePixelRatio, devicePixelRatio);

const rAF = window.requestAnimationFrame;

function onTick(ctx: CanvasRenderingContext2D, tick: number) {
  const state = updateState(tick);
  drawScene(ctx, state);
}

function main(ctx: CanvasRenderingContext2D) {
  function frame(prevtime: number) {
    return function nextFrame(time: number) {
      const tick = time - prevtime;
      onTick(ctx, tick);
      rAF(frame(time));
    };
  }

  rAF(frame(0));
}

const p = canvas.parentNode as HTMLElement;
const rect = p.getBoundingClientRect();
setDimensions(rect.width, rect.height);

main(ctx);
