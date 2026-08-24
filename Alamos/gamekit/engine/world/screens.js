// screens.js — live faces for the machines in a room.
//
// A room full of instruments whose screens are flat emissive panels reads as a
// showroom: the props are right and nothing in them is *doing* anything. These
// painters put a real face on a machine — a trace that moves, numbers that sit
// against their normal range, a plate on a lightbox — so walking into a room
// tells you something before anyone says a word.
//
// Deliberately canvas rather than the SVG in engine/core/figures.js. Those
// figures are for the question panel, where they are read close up and have to
// carry a data table with them; these are read from two metres away through a
// texture, need to animate every frame, and must not allocate on the way. A
// screen here is one canvas, one CanvasTexture, and an update that repaints it.
//
// Usage:
//   const s = instrumentScreen({ kind:'vitals', ... });
//   material.map = s.texture;
//   // per frame:  s.update(delta)
//
// Every screen paints once at construction, so a screen that is never updated
// (a paused tab, a machine off the render path) still shows something real.
import * as THREE from 'three';

const INK = '#e8eef2', DIM = '#7f9aa8', PANEL = '#0f1418', LINE = '#243038';
export const SCREEN_STATUS = {
  alarm:  { colour: '#ff6b6b', word: 'ALARM' },
  high:   { colour: '#ffa657', word: 'HIGH' },
  low:    { colour: '#ffd166', word: 'LOW' },
  normal: { colour: '#67e0a3', word: 'OK' },
};

/**
 * One machine screen.
 *
 * `kind` picks the face: 'vitals' (scrolling trace plus numbers), 'panel'
 * (rows of label/value/status), 'film' (a plate on a lightbox), 'plot' (axes,
 * curves and the points they are judged against). Anything else
 * paints the idle screen rather than throwing, because a mistyped kind should
 * cost a dull screen and not the whole room.
 */
export function instrumentScreen(spec = {}, { w = 512, h = 320 } = {}){
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const paint = spec.kind === 'panel' ? paintPanel
    : spec.kind === 'film' ? paintFilm
    : spec.kind === 'vitals' ? paintVitals
    : spec.kind === 'plot' ? paintPlot
    : paintIdle;

  let t = 0;
  // A repaint costs a texture upload, so screens run at their own rate rather
  // than the frame rate. 12 fps is well above the point where a sweeping trace
  // reads as moving, and a third of the uploads of a 60 fps screen.
  const PERIOD = 1 / 12;
  let since = PERIOD;
  paint(ctx, spec, 0, w, h);

  return {
    canvas, texture,
    /** Advance and repaint if this screen animates. Cheap to call every frame. */
    update(delta){
      if(!spec.animated) return;
      t += delta;
      since += delta;
      if(since < PERIOD) return;
      since = 0;
      paint(ctx, spec, t, w, h);
      texture.needsUpdate = true;
    },
    /** Change what the screen says without rebuilding the texture. */
    set(next){
      Object.assign(spec, next);
      paint(ctx, spec, t, w, h);
      texture.needsUpdate = true;
    },
  };
}

function chrome(ctx, spec, w, h){
  ctx.fillStyle = PANEL;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#161d23';
  ctx.fillRect(0, 0, w, 34);
  ctx.fillStyle = DIM;
  ctx.font = '700 15px Inter, Helvetica, Arial, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText((spec.title || '').toUpperCase(), 14, 18);
  if(spec.patient){
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText(spec.patient, w - 14, 18);
    ctx.textAlign = 'left';
  }
}

/**
 * A plot, on a wall board: axes, whatever curves the room is arguing about, and
 * the points those curves are being judged against.
 *
 * The face a room full of *analysis* needs, and the one this file did not have.
 * `panel` prints numbers against their range, which is right for a machine
 * reporting its own state and wrong for a wall a team faces: a board reading
 * `LEVEL 1 / 3` is a progress bar, not a measurement. Three of those side by
 * side are the same progress bar three times.
 *
 * The spec:
 *   `curves`  [{ points: [[x, y], …], dashed, faint, label }]  in 0..1 of the box
 *   `points`  [[x, y], …]                                     likewise
 *   `shown`   how many of `points` to draw, so a board can fill as a campaign
 *             does. Absent means all of them.
 *   `axes`    { x, y } — what each axis is, in the fewest words that are true
 *   `note`    one line under the title, for what the plot currently says
 *
 * Everything is in 0..1 of the plotting box and y is up, because the caller is
 * describing a relationship and should not have to know the pixel height of a
 * board it never sees.
 */
function paintPlot(ctx, spec, t, w, h){
  chrome(ctx, spec, w, h);
  const L = 44, R = 14, T = 46, B = 30;
  const bx = L, by = T, bw = w - L - R, bh = h - T - B;
  const X = (u) => bx + bw * Math.max(0, Math.min(1, u));
  const Y = (v) => by + bh * (1 - Math.max(0, Math.min(1, v)));

  // The box, and a grid quiet enough to read a point against.
  ctx.strokeStyle = LINE; ctx.lineWidth = 1;
  for(let i = 1; i < 4; i++){
    ctx.beginPath(); ctx.moveTo(bx, Y(i / 4)); ctx.lineTo(bx + bw, Y(i / 4)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(i / 4), by); ctx.lineTo(X(i / 4), by + bh); ctx.stroke();
  }
  ctx.strokeStyle = DIM; ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh);
  ctx.stroke();

  // An empty plot has to say why it is empty, in the middle of the space where
  // the data would be. Printed small in the corner it reads as a board that is
  // broken rather than as a board that is waiting.
  const empty = !(spec.curves || []).some(c => (c.points || []).length > 1)
    && !(spec.points || []).length;
  if(spec.note && empty){
    ctx.fillStyle = DIM;
    ctx.font = '700 17px Inter, Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(spec.note, bx + bw / 2, by + bh / 2);
    ctx.textAlign = 'left';
  } else if(spec.note){
    ctx.fillStyle = DIM;
    ctx.font = '400 12px Inter, Helvetica, Arial, sans-serif';
    ctx.fillText(spec.note, L, 40);
  }

  for(const c of spec.curves || []){
    const pts = c.points || [];
    if(pts.length < 2) continue;
    ctx.strokeStyle = c.faint ? LINE : DIM;
    ctx.lineWidth = c.faint ? 1.6 : 2.2;
    // A dash on a wall board has to be coarse or it reads as a thin solid line
    // from the far side of the room.
    if(c.dashed) ctx.setLineDash([10, 7]);
    ctx.beginPath();
    pts.forEach(([u, v], i) => (i ? ctx.lineTo(X(u), Y(v)) : ctx.moveTo(X(u), Y(v))));
    ctx.stroke();
    ctx.setLineDash([]);
    if(c.label){
      const [u, v] = pts[Math.floor(pts.length * 0.72)];
      ctx.fillStyle = c.faint ? LINE : DIM;
      ctx.font = '400 11px Inter, Helvetica, Arial, sans-serif';
      ctx.fillText(c.label, X(u) + 4, Y(v) - 7);
    }
  }

  const pts = spec.points || [];
  const shown = spec.shown === undefined ? pts.length : Math.max(0, Math.min(pts.length, spec.shown));
  const st = SCREEN_STATUS[spec.status] || SCREEN_STATUS.normal;
  ctx.fillStyle = st.colour;
  for(let i = 0; i < shown; i++){
    const [u, v] = pts[i];
    ctx.beginPath(); ctx.arc(X(u), Y(v), 2.6, 0, Math.PI * 2); ctx.fill();
  }
  // How much of the sample is up, said in words: a board filling as the campaign
  // does is only legible if the count is on it.
  if(spec.shown !== undefined && pts.length){
    ctx.fillStyle = DIM;
    ctx.font = '700 12px Inter, Helvetica, Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${shown} / ${pts.length}`, bx + bw - 4, by + 12);
    ctx.textAlign = 'left';
  }

  const ax = spec.axes || {};
  ctx.fillStyle = DIM;
  ctx.font = '400 11px Inter, Helvetica, Arial, sans-serif';
  if(ax.x){
    ctx.textAlign = 'center';
    ctx.fillText(ax.x, bx + bw / 2, h - 10);
    ctx.textAlign = 'left';
  }
  if(ax.y){
    // Rotated, because a vertical axis label written horizontally either runs
    // into the plot or takes a third of the board's width.
    ctx.save();
    ctx.translate(14, by + bh / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(ax.y, 0, 0);
    ctx.restore();
  }
}

/** A scrolling trace with the numbers that go with it. */
function paintVitals(ctx, spec, t, w, h){
  chrome(ctx, spec, w, h);
  const rows = spec.rows || [];
  const traceW = w - 150, traceH = h - 60;
  const midY = 34 + traceH / 2;
  const st = SCREEN_STATUS[spec.status] || SCREEN_STATUS.normal;

  ctx.strokeStyle = LINE;
  ctx.lineWidth = 1;
  for(let i = 1; i < 4; i++){
    const y = 34 + (i / 4) * traceH;
    ctx.beginPath(); ctx.moveTo(10, y); ctx.lineTo(traceW, y); ctx.stroke();
  }

  const rate = spec.rate || 6;
  const shape = spec.wave || 'ecg';
  ctx.strokeStyle = st.colour;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  const N = 260;
  for(let i = 0; i <= N; i++){
    const x = 10 + (i / N) * (traceW - 20);
    // The phase offset is what makes it sweep; everything else is static.
    const p = ((i / N) * rate + t * 0.55) % 1;
    let y = 0;
    if(shape === 'ecg'){
      y = 0.12 * bump(p, 0.16, 0.045) - 0.22 * bump(p, 0.30, 0.014)
        + 1.00 * bump(p, 0.34, 0.012) - 0.30 * bump(p, 0.38, 0.018)
        + 0.26 * bump(p, 0.58, 0.05);
    } else if(shape === 'resp'){
      y = Math.sin(p * Math.PI * 2) * 0.8;
    } else if(shape === 'eeg'){
      y = 0.5 * Math.sin(p * Math.PI * 2) + 0.28 * Math.sin(p * Math.PI * 9.3)
        + 0.16 * Math.sin(p * Math.PI * 21.7);
    } else {
      y = Math.sin(p * Math.PI * 2);
    }
    const py = midY - y * (traceH / 2 - 12);
    if(i) ctx.lineTo(x, py); else ctx.moveTo(x, py);
  }
  ctx.stroke();

  rows.slice(0, 3).forEach((r, i) => {
    const y = 56 + i * ((h - 70) / 3);
    const rs = SCREEN_STATUS[r.status] || SCREEN_STATUS.normal;
    ctx.fillStyle = DIM;
    ctx.font = '700 13px Inter, Helvetica, Arial, sans-serif';
    ctx.fillText(String(r.label || '').toUpperCase(), traceW + 14, y);
    ctx.fillStyle = rs.colour;
    ctx.font = '800 34px ui-monospace, Menlo, monospace';
    ctx.fillText(String(r.value), traceW + 14, y + 30);
    if(r.unit){
      ctx.fillStyle = DIM;
      ctx.font = '600 12px Inter, Helvetica, Arial, sans-serif';
      ctx.fillText(r.unit, traceW + 14, y + 52);
    }
  });
}

/** Rows of label, value and status. No trace — the numbers are the subject. */
function paintPanel(ctx, spec, t, w, h){
  chrome(ctx, spec, w, h);
  const rows = (spec.rows || []).slice(0, 5);
  const top = 48, rowH = Math.min(48, (h - top - 14) / Math.max(1, rows.length));
  rows.forEach((r, i) => {
    const y = top + i * rowH;
    const rs = SCREEN_STATUS[r.status] || SCREEN_STATUS.normal;
    ctx.fillStyle = i % 2 ? '#131a20' : '#111820';
    ctx.fillRect(8, y - 2, w - 16, rowH - 6);
    ctx.fillStyle = DIM;
    ctx.font = '700 14px Inter, Helvetica, Arial, sans-serif';
    ctx.fillText(String(r.label || ''), 18, y + rowH / 2 - 4);
    ctx.fillStyle = rs.colour;
    ctx.font = '800 22px ui-monospace, Menlo, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(String(r.value ?? ''), w - 96, y + rowH / 2 - 4);
    // The status word as well as the colour: a screen read at two metres in a
    // room lit for a hospital is exactly where hue alone fails.
    ctx.font = '800 12px Inter, Helvetica, Arial, sans-serif';
    ctx.fillText(rs.word, w - 18, y + rowH / 2 - 4);
    ctx.textAlign = 'left';
  });
}

/** A plate on a lightbox: bright ground, a dark field, and the annotations. */
function paintFilm(ctx, spec, t, w, h){
  ctx.fillStyle = '#05080a';
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w * 0.62);
  g.addColorStop(0, '#c9d3d8');
  g.addColorStop(0.55, '#6d7b83');
  g.addColorStop(1, '#10161a');
  ctx.fillStyle = g;
  ctx.fillRect(24, 18, w - 48, h - 36);
  // Two long dense shapes and a joint: enough to read as a limb film without
  // pretending to be a real radiograph of a real person.
  ctx.strokeStyle = 'rgba(245,250,252,0.86)';
  ctx.lineWidth = 26;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(w * 0.34, h * 0.16); ctx.lineTo(w * 0.44, h * 0.52);
  ctx.moveTo(w * 0.58, h * 0.20); ctx.lineTo(w * 0.50, h * 0.52);
  ctx.stroke();
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(w * 0.47, h * 0.56); ctx.lineTo(w * 0.47, h * 0.84);
  ctx.stroke();
  if(spec.finding){
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(w * 0.47, h * 0.55, 34, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = '#dfe8ec';
  ctx.font = '700 14px Inter, Helvetica, Arial, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText((spec.title || 'FILM').toUpperCase(), 32, 34);
  if(spec.patient){
    ctx.textAlign = 'right';
    ctx.fillText(spec.patient, w - 32, 34);
    ctx.textAlign = 'left';
  }
  if(spec.note){
    ctx.font = '600 13px Inter, Helvetica, Arial, sans-serif';
    ctx.fillText(spec.note, 32, h - 32);
  }
}

/** Powered, nothing loaded. Still a machine rather than a blank rectangle. */
function paintIdle(ctx, spec, t, w, h){
  chrome(ctx, spec, w, h);
  ctx.fillStyle = DIM;
  ctx.font = '600 16px Inter, Helvetica, Arial, sans-serif';
  ctx.fillText(spec.note || 'standby — no case loaded', 16, h / 2);
}

function bump(p, at, width){
  const d = p - at;
  return Math.exp(-(d * d) / (2 * width * width));
}

/**
 * A printed sheet: dark text on paper, for charts, care boards and the plate
 * beside a machine. Returns the same handle as a screen so callers do not have
 * to care which kind of surface they are hanging.
 */
export function printedSheet(spec = {}, { w = 512, h = 320 } = {}){
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const paint = () => {
    ctx.fillStyle = '#fbfaf6'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = spec.accent || '#47606f';
    ctx.fillRect(0, 0, w, 54);
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.font = '800 24px Inter, Helvetica, Arial, sans-serif';
    ctx.fillText(String(spec.tag || '').toUpperCase(), 16, 28);
    if(spec.title){
      ctx.textAlign = 'right';
      ctx.font = '700 18px Inter, Helvetica, Arial, sans-serif';
      ctx.fillText(spec.title, w - 16, 28);
      ctx.textAlign = 'left';
    }
    ctx.fillStyle = '#1b1e22';
    ctx.font = '700 21px Inter, Helvetica, Arial, sans-serif';
    let y = 88;
    for(const line of wrap(ctx, spec.heading || '', w - 32)){ ctx.fillText(line, 16, y); y += 27; }
    ctx.fillStyle = '#4a5259';
    ctx.font = '400 17px Inter, Helvetica, Arial, sans-serif';
    y += 6;
    for(const line of wrap(ctx, spec.body || '', w - 32)){ ctx.fillText(line, 16, y); y += 23; }
    if(spec.footer){
      ctx.fillStyle = spec.accent || '#47606f';
      ctx.font = '700 16px Inter, Helvetica, Arial, sans-serif';
      ctx.fillText(spec.footer, 16, h - 24);
    }
    texture.needsUpdate = true;
  };
  paint();
  return { canvas, texture, update(){}, set(next){ Object.assign(spec, next); paint(); } };
}

/**
 * A typed sheet: carbon paper out of a Royal, on a clipboard on the Hill.
 *
 * `printedSheet` is a modern form — a coloured header bar, a sans-serif face,
 * white paper. On a mesa in 1943 the same information is a typewritten page
 * with a rubber stamp on it, and the printed one is as much of an anachronism
 * as a glowing screen.
 *
 * Same handle as `printedSheet`, so a caller swaps one for the other.
 */
export function typedSheet(spec = {}, { w = 512, h = 320 } = {}){
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const TYPE = '17px "Courier New", Courier, monospace';
  const paint = () => {
    // Cheap wartime paper: warm, uneven, and a little foxed at the edges.
    ctx.fillStyle = '#efe7d2'; ctx.fillRect(0, 0, w, h);
    for(let i = 0; i < 220; i++){
      ctx.globalAlpha = 0.03 + Math.random() * 0.05;
      ctx.fillStyle = Math.random() > 0.5 ? '#c9b38a' : '#fffaf0';
      ctx.fillRect(Math.random() * w, Math.random() * h, 2 + Math.random() * 26, 2);
    }
    ctx.globalAlpha = 1;

    // The header a typist would have typed, not a printed band.
    ctx.fillStyle = '#2a2418';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${TYPE}`;
    const tag = String(spec.tag || '').toUpperCase();
    if(tag) ctx.fillText(tag + (spec.title ? '  \u2014  ' + String(spec.title).toUpperCase() : ''), 22, 34);
    ctx.strokeStyle = 'rgba(42,36,24,0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(20, 50); ctx.lineTo(w - 20, 52); ctx.stroke();

    ctx.font = `bold 19px "Courier New", Courier, monospace`;
    let y = 84;
    for(const line of wrap(ctx, String(spec.heading || '').toUpperCase(), w - 44)){
      ctx.fillText(line, 22, y); y += 26;
    }
    ctx.fillStyle = '#3a3226';
    ctx.font = TYPE;
    y += 8;
    for(const line of wrap(ctx, spec.body || '', w - 44)){ ctx.fillText(line, 22, y); y += 23; }

    // A rubber stamp, off square, because nobody ever put one on straight.
    if(spec.footer){
      ctx.save();
      ctx.translate(w - 150, h - 54);
      ctx.rotate(-0.09);
      ctx.strokeStyle = 'rgba(120,44,38,0.72)';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(-8, -22, 150, 40);
      ctx.fillStyle = 'rgba(120,44,38,0.82)';
      ctx.font = 'bold 15px "Courier New", Courier, monospace';
      ctx.fillText(clipTo(ctx, String(spec.footer).toUpperCase(), 15, 138), 2, 0);
      ctx.restore();
    }
    texture.needsUpdate = true;
  };
  paint();
  return { canvas, texture, update(){}, set(next){ Object.assign(spec, next); paint(); } };
}

function wrap(ctx, text, maxW){
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for(const word of words){
    const next = line ? line + ' ' + word : word;
    if(ctx.measureText(next).width > maxW && line){ lines.push(line); line = word; }
    else line = next;
  }
  if(line) lines.push(line);
  return lines;
}

/**
 * A blackboard, in chalk.
 *
 * Project Y is 1943. There is no CRT on that mesa, no seven-segment display and
 * nothing back-lit: the computing group is women with Marchant calculators, and
 * a result is a number somebody wrote on a board in chalk and somebody else
 * checked. Hanging a glowing instrument panel in a wartime building is the same
 * mistake as putting a laboratory floor in it.
 *
 * Returns the same handle as `instrumentScreen`, so the room builder hangs it
 * the same way. It does not animate — chalk does not — and `update` is a no-op
 * kept for that reason.
 */
/** Trim a chalk string to the width it has, with the ellipsis a person leaves. */
function clipTo(ctx, text, size, maxW){
  ctx.save();
  ctx.font = `${size}px "Bradley Hand", "Segoe Print", "Comic Sans MS", cursive`;
  let out = String(text);
  if(ctx.measureText(out).width > maxW){
    while(out.length > 3 && ctx.measureText(out + '…').width > maxW) out = out.slice(0, -1);
    out += '…';
  }
  ctx.restore();
  return out;
}

export function chalkboard(spec = {}, { w = 512, h = 320 } = {}){
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  // Slate, with the ghost of everything wiped off it this week.
  ctx.fillStyle = '#26302b';
  ctx.fillRect(0, 0, w, h);
  for(let i = 0; i < 90; i++){
    ctx.globalAlpha = 0.03 + Math.random() * 0.05;
    ctx.fillStyle = '#dfe6df';
    const bw = 40 + Math.random() * 220, bh = 6 + Math.random() * 26;
    ctx.fillRect(Math.random() * w, Math.random() * h, bw, bh);
  }
  ctx.globalAlpha = 1;

  const chalk = '#eef3ea';
  const faint = 'rgba(238,243,234,0.62)';
  /** Chalk is not a printer: every stroke sits a little off the line. */
  const jitter = () => (Math.random() - 0.5) * 1.6;
  const write = (text, x, y, size, colour = chalk, weight = 400) => {
    ctx.save();
    ctx.font = `${weight} ${size}px "Bradley Hand", "Segoe Print", "Comic Sans MS", cursive`;
    ctx.fillStyle = colour;
    ctx.translate(x + jitter(), y + jitter());
    ctx.rotate((Math.random() - 0.5) * 0.012);
    ctx.fillText(text, 0, 0);
    ctx.restore();
  };

  // Chalk on a board of this size fits about twenty capitals across; anything
  // longer is shrunk rather than run off the edge, and the name underneath it
  // rather than into it.
  const title = spec.title ?? spec.name ?? '';
  const titleSize = title.length > 22 ? 22 : title.length > 16 ? 26 : 30;
  write(title.toUpperCase(), 26, 46, titleSize, chalk, 700);
  // The underline a person draws under a heading, twice, not quite level.
  ctx.strokeStyle = faint;
  ctx.lineWidth = 2;
  const rule = Math.min(w - 52, title.length * titleSize * 0.58);
  for(const dy of [0, 3]){
    ctx.beginPath();
    ctx.moveTo(24 + jitter(), 56 + dy + jitter());
    ctx.lineTo(24 + rule + jitter(), 58 + dy + jitter());
    ctx.stroke();
  }
  // Whoever the board belongs to, written under the rule — it used to be set
  // from the right edge and ran straight through the heading.
  if(spec.patient) write(String(spec.patient), 28, 80, 18, faint);

  const rows = (spec.rows ?? []).slice(0, 5);
  const valueX = Math.round(w * 0.56);
  let y = spec.patient ? 122 : 104;
  for(const r of rows){
    write(clipTo(ctx, String(r.label ?? ''), 22, valueX - 44), 30, y, 22, faint);
    const value = `${r.value ?? ''}${r.unit ? ' ' + r.unit : ''}`;
    write(clipTo(ctx, value, 24, w - valueX - 26), valueX, y, 24, chalk, 700);
    // Anything the watch flagged gets ringed, the way a person rings it.
    if(r.status === 'alarm' || r.status === 'high'){
      ctx.save();
      ctx.strokeStyle = faint;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(Math.round(w * 0.56) + value.length * 6, y - 8,
                  value.length * 8 + 14, 20, (Math.random() - 0.5) * 0.06, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    y += 44;
  }
  if(spec.footer) write(clipTo(ctx, String(spec.footer), 19, w - 56), 30, h - 26, 19, faint);

  texture.needsUpdate = true;
  return {
    canvas, texture,
    update(){ /* chalk does not animate */ },
    repaint(){ texture.needsUpdate = true; },
  };
}
