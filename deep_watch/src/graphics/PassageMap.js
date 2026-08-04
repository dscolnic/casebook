import { PASSAGE_LEGS, TOTAL_NM } from '../simulation/VoyageSystem.js';

/**
 * drawPassageMap — the ocean crossing, drawn the same way on the control-room
 * wall panel and on the plotting board, so there is one implementation of what
 * the passage looks like.
 *
 * It is a schematic, not a chart: two coastlines, the planned track between
 * them, the waypoints that divide it into legs, and the boat's own progress
 * bead. What matters is the scale of the thing — you are a bead a fifth of the
 * way along a line that takes four months.
 */

/** Waypoints in normalised map space (0–1 across, 0–1 down). */
const NODES = [
  { x: 0.07, y: 0.72 },
  { x: 0.22, y: 0.63 },
  { x: 0.44, y: 0.44 },
  { x: 0.66, y: 0.36 },
  { x: 0.84, y: 0.27 },
  { x: 0.94, y: 0.20 },
];

export function drawPassageMap(ctx, w, h, { voyage, state, title = 'Passage — Ocean Crossing' }) {
  const C = {
    sea: '#08202e', seaDeep: '#061826', land: '#2c3a2b', coast: '#4e6349',
    ink: '#d7e2ea', dim: '#8ea0ad', accent: '#3fb6c2', warm: '#d8a24a', ok: '#6bbf73',
  };

  // Sea.
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, C.seaDeep);
  grad.addColorStop(1, C.sea);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Latitude/longitude graticule.
  ctx.strokeStyle = 'rgba(142,160,173,0.10)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 10; i++) {
    ctx.beginPath(); ctx.moveTo((w / 10) * i, 0); ctx.lineTo((w / 10) * i, h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, (h / 6) * i); ctx.lineTo(w, (h / 6) * i); ctx.stroke();
  }

  // Departure and arrival landmasses.
  const land = (pts) => {
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x * w, y * h) : ctx.moveTo(x * w, y * h)));
    ctx.closePath();
    ctx.fillStyle = C.land; ctx.fill();
    ctx.strokeStyle = C.coast; ctx.lineWidth = 1.5; ctx.stroke();
  };
  land([[-0.02, 0.40], [0.10, 0.52], [0.06, 0.68], [0.13, 0.84], [0.04, 1.04], [-0.02, 1.04]]);
  land([[1.02, 0.02], [0.90, 0.10], [0.96, 0.24], [0.88, 0.36], [1.02, 0.48]]);

  const px = (n) => [NODES[n].x * w, NODES[n].y * h];

  // Planned track.
  ctx.strokeStyle = 'rgba(63,182,194,0.45)';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 5]);
  ctx.beginPath();
  NODES.forEach((n, i) => (i ? ctx.lineTo(n.x * w, n.y * h) : ctx.moveTo(n.x * w, n.y * h)));
  ctx.stroke();
  ctx.setLineDash([]);

  // Track already made good, drawn solid over the top.
  const made = voyage.nmMadeGood;
  let run = 0;
  ctx.strokeStyle = C.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(...px(0));
  let beadX = NODES[0].x * w, beadY = NODES[0].y * h;
  for (let i = 0; i < PASSAGE_LEGS.length; i++) {
    const leg = PASSAGE_LEGS[i];
    const [x0, y0] = px(i), [x1, y1] = px(i + 1);
    if (made >= run + leg.nm) {
      ctx.lineTo(x1, y1);
      beadX = x1; beadY = y1;
    } else if (made > run) {
      const f = (made - run) / leg.nm;
      beadX = x0 + (x1 - x0) * f;
      beadY = y0 + (y1 - y0) * f;
      ctx.lineTo(beadX, beadY);
      break;
    } else break;
    run += leg.nm;
  }
  ctx.stroke();

  // Waypoints.
  ctx.font = '10px "Courier New", monospace';
  NODES.forEach((n, i) => {
    const x = n.x * w, y = n.y * h;
    const passed = made >= NODES.slice(0, i).reduce((s, _, k) => s + (PASSAGE_LEGS[k]?.nm ?? 0), 0);
    ctx.fillStyle = passed ? C.accent : 'rgba(142,160,173,0.6)';
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    const name = i === 0 ? PASSAGE_LEGS[0].name
      : i < PASSAGE_LEGS.length ? PASSAGE_LEGS[i].name
      : PASSAGE_LEGS[PASSAGE_LEGS.length - 1].to;
    ctx.fillStyle = passed ? '#bcd6da' : C.dim;
    ctx.fillText(name, Math.min(w - 82, x + 7), y - 7);
  });

  // The boat.
  ctx.fillStyle = C.warm;
  ctx.beginPath(); ctx.arc(beadX, beadY, 6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(216,162,74,0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(beadX, beadY, 11, 0, Math.PI * 2); ctx.stroke();

  // Header and the numbers that make the scale of it land.
  ctx.fillStyle = 'rgba(4,12,18,0.82)';
  ctx.fillRect(0, 0, w, 30);
  ctx.fillStyle = C.accent;
  ctx.font = 'bold 13px "Courier New", monospace';
  ctx.fillText(title.toUpperCase(), 12, 20);
  ctx.fillStyle = C.dim;
  ctx.font = '11px "Courier New", monospace';
  const pct = (voyage.progress01 * 100).toFixed(1);
  ctx.textAlign = 'right';
  ctx.fillText(`${Math.round(made).toLocaleString()} of ${TOTAL_NM.toLocaleString()} nm · ${pct}%`, w - 12, 20);
  ctx.textAlign = 'left';

  // Progress bar and estimate along the bottom.
  const barY = h - 34;
  ctx.fillStyle = 'rgba(4,12,18,0.82)';
  ctx.fillRect(0, barY - 8, w, 42);
  ctx.fillStyle = '#12222c';
  ctx.fillRect(12, barY, w - 24, 10);
  ctx.fillStyle = C.accent;
  ctx.fillRect(12, barY, (w - 24) * voyage.progress01, 10);
  ctx.strokeStyle = 'rgba(142,160,173,0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(12.5, barY + 0.5, w - 25, 9);

  const days = voyage.daysRemaining(state.speed);
  ctx.fillStyle = C.ink;
  ctx.font = '11px "Courier New", monospace';
  ctx.fillText(`making ${state.speed.toFixed(1)} kn`, 12, barY + 26);
  ctx.textAlign = 'center';
  ctx.fillStyle = days > 150 ? '#d1594e' : days > 60 ? C.warm : C.ok;
  ctx.fillText(`${days.toFixed(0)} days to landfall at this speed`, w / 2, barY + 26);
  ctx.textAlign = 'right';
  ctx.fillStyle = C.dim;
  ctx.fillText(`patrol day ${Math.floor(state.dayClock.hours / 24) + 1}`, w - 12, barY + 26);
  ctx.textAlign = 'left';
}
