import Emitter from "./emitter";
import { Particle } from "./particle";
import { State } from "./state";

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, e: Emitter) {
  ctx.save();

  ctx.strokeStyle = e.getStrokeStyle(p);

  ctx.beginPath();
  ctx.moveTo(p.lastPosition[0], p.lastPosition[1]);
  ctx.lineTo(p.position[0], p.position[1]);
  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}

export function drawScene(ctx: CanvasRenderingContext2D, state: State): void {
  ctx.clearRect(0, 0, state.ui.width, state.ui.height);

  state.emitters.forEach((e) => {
    e.particles.forEach((p) => drawParticle(ctx, p, e));
  });
}
