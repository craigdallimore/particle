import { Particle } from "./particle";
import { State } from "./state";

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();

  const l = 20 + p.energy * 20;

  ctx.strokeStyle = `hsla(270, 50%, ${l}%, ${p.energy * 0.5})`;

  ctx.beginPath();
  ctx.moveTo(p.lastPosition[0], p.lastPosition[1]);
  ctx.lineTo(p.position[0], p.position[1]);
  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}

export function drawScene(ctx: CanvasRenderingContext2D, state: State): void {
  ctx.clearRect(0, 0, state.ui.width, state.ui.height);

  state.particles.forEach((p) => drawParticle(ctx, p));
}
