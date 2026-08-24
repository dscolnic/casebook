// interiorKit.js — the furniture a room needs to read as a room.
//
// Measured, not guessed. `engine/dev/pieceDensity.mjs` counted what was in every
// room of every game: the engine's own case rooms held 9–15 pieces, and the one
// game that lays out its own rooms held three. A room with three things in it is a
// corridor with a door on it, whatever the palette does.
//
// So the fit-out lives here rather than in either builder, and both call it. What
// it places is deliberately generic — surfaces, storage, seating, wall furniture,
// clutter — because the things that make a place *itself* belong in that theme's
// own props.js. This is the layer underneath: the extinguisher, the bin, the coat
// hooks, the notice nobody has taken down. Rooms are unconvincing without them and
// no author ever wants to write them.
//
// HOW IT IS USED. The caller supplies a `box(w, h, d, x, y, z, material, rotY)`
// that attaches wherever that builder attaches, the materials it already made, and
// the room's inner bounds. Everything here works in the caller's own coordinate
// space, so `interiorBuilding` gets it in room-local space and `interiorSite` gets
// it in floor space without either of them converting anything.
//
// A room is seeded from its own id, so it is the same room every time it is built
// — a room that reshuffles its furniture between visits is a room the player stops
// trusting — and different from the room next door.
import * as THREE from 'three';
import { printedSheet } from './screens.js';

/**
 * Record that something hangs on a wall, and which way it faces.
 *
 * Four separate rounds of this were found by the player walking into the room and
 * saying so: boards floating in doorways, boards hung *inside* the wall, a mural
 * running on past the end of one. Every count and every audit passed each time,
 * because they asked whether a point had a wall behind it and a board is not a
 * point. `engine/dev/placement.mjs` fires rays through the whole face instead —
 * but only at things it knows are meant to be on a wall, which is what this says.
 *
 * `faceX` means the wall runs along z, so the face looks down ±x. `toward` is
 * which way, +1 or -1. Together they are the outward normal, and everything the
 * audit asks is asked along it.
 */
export function markWallMounted(objects, faceX, toward, label = ''){
  const n = faceX ? [toward, 0, 0] : [0, 0, toward];
  for(const o of objects){
    if(o) o.userData.mount = { kind: 'wall', n, label };
  }
}

/** Structure is what a room is made of; furnishing is what is in it. */
export function markStructure(objects, kind = 'wall'){
  for(const o of objects){
    if(o) o.userData.structure = kind;
  }
}


/**
 * A notice with words on it, on a wall.
 *
 * Shared by rooms and corridors because a blank rectangle raises a piece count and
 * says nothing: what tells the player where they are is the text on it — a cryogen
 * warning, a booking sheet, a permit-to-work board, an assembly point.
 *
 * `faceX` says the wall runs along z (so the sheet faces ±x). `toward` is the
 * direction the face should point, +1 or -1.
 */
/**
 * Paint a sign face.
 *
 * One layout for everything is what a building looks like when a print shop has
 * been at it: every board the same proportions, one sentence, and half the sheet
 * white. Real walls carry a rota grid, a photograph, a hand-drawn chart, a hazard
 * pictogram, a chalk tally and a sticky note, and none of them looks like the
 * others. So there are eight layouts here, chosen from the text itself, and all of
 * them fill the sheet to its edges.
 *
 * `text.style` picks one explicitly; otherwise it is hashed from the tag so a given
 * notice keeps the same look every time the room is built.
 */
const SIGN_STYLES = ['banner', 'warning', 'grid', 'chart', 'photo', 'list', 'tally', 'sticky'];

function paintSignFace(text = {}, px = 512, py = 340){
  const canvas = document.createElement('canvas');
  canvas.width = px; canvas.height = py;
  const g = canvas.getContext('2d');
  const accent = text.accent || '#3f6f8f';
  // A building's own paper. Ridgeway prints on white; a nineteen-seventies control
  // centre does not, and a bright white sheet in a dark room reads as a light box.
  const paper = text.paper || '#fbfaf6';
  const ink = text.ink || '#1b1e22';
  const soft = text.soft || '#4a5259';
  const seedNum = [...String(text.tag ?? '') + String(text.heading ?? '')]
    .reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 100000, 7);
  const style = text.style ?? SIGN_STYLES[seedNum % SIGN_STYLES.length];
  const rnd = (() => { let v = seedNum || 3; return () => (v = (v * 48271) % 2147483647) / 2147483647; })();

  const wrap = (s2, max, font) => {
    g.font = font;
    const out = [];
    let line = '';
    for(const word of String(s2 ?? '').split(/\s+/)){
      const t = line ? line + ' ' + word : word;
      if(g.measureText(t).width > max && line){ out.push(line); line = word; }
      else line = t;
    }
    if(line) out.push(line);
    return out;
  };
  const bodyBlock = (x, y, w, lines, size = 17, colour = soft) => {
    g.fillStyle = colour;
    g.font = `400 ${size}px Inter, Helvetica, Arial, sans-serif`;
    let yy = y;
    for(const l of wrap(text.body, w, g.font).slice(0, lines)){ g.fillText(l, x, yy); yy += size * 1.32; }
  };
  const header = (h = 54) => {
    g.fillStyle = accent; g.fillRect(0, 0, px, h);
    g.fillStyle = '#fff'; g.textBaseline = 'middle';
    g.font = `800 ${Math.round(h * 0.44)}px Inter, Helvetica, Arial, sans-serif`;
    g.fillText(String(text.tag ?? '').toUpperCase(), 14, h / 2);
  };

  g.textBaseline = 'top';
  g.fillStyle = paper; g.fillRect(0, 0, px, py);

  if(style === 'banner'){
    // Colour across the top half, the words large in it, the body filling under.
    g.fillStyle = accent; g.fillRect(0, 0, px, py * 0.46);
    g.fillStyle = '#fff';
    g.font = '800 26px Inter, Helvetica, Arial, sans-serif';
    let yy = 20;
    for(const l of wrap(text.heading, px - 32, g.font).slice(0, 3)){ g.fillText(l, 16, yy); yy += 32; }
    g.font = '800 13px Inter, Helvetica, Arial, sans-serif';
    g.fillText(String(text.tag ?? '').toUpperCase(), 16, py * 0.46 - 24);
    bodyBlock(16, py * 0.52, px - 32, 5, 18, ink);
  } else if(style === 'warning'){
    // A hazard triangle down the left, the words beside it, edge to edge.
    header(48);
    g.fillStyle = accent;
    g.beginPath();
    g.moveTo(74, 78); g.lineTo(132, 178); g.lineTo(16, 178); g.closePath(); g.fill();
    g.fillStyle = paper;
    g.font = '800 54px Inter, Helvetica, Arial, sans-serif';
    g.fillText('!', 62, 108);
    g.fillStyle = ink; g.font = '800 21px Inter, Helvetica, Arial, sans-serif';
    let yy = 74;
    for(const l of wrap(text.heading, px - 160, g.font).slice(0, 3)){ g.fillText(l, 148, yy); yy += 26; }
    bodyBlock(148, yy + 6, px - 164, 4, 16);
    bodyBlock(16, 196, px - 32, 3, 16);
  } else if(style === 'grid'){
    // A rota or booking sheet: a grid with most of it filled in, under a heading
    // that says what is being booked. The heading used to be dropped, which left a
    // grid of initials belonging to nothing.
    header(42);
    g.fillStyle = ink; g.font = '700 19px Inter, Helvetica, Arial, sans-serif';
    g.fillText(String(text.heading ?? '').slice(0, 44), 14, 50);
    const capLines = wrap(text.body, px - 28, '400 14px Inter, Helvetica, Arial, sans-serif').slice(0, 2);
    const capH = capLines.length * 18;
    const cols = 6, rows = 4, x0 = 14, y0 = 80,
      cw = (px - 28) / cols, ch = (py - y0 - capH - 18) / rows;
    g.strokeStyle = '#c9ccd2'; g.lineWidth = 1;
    for(let r = 0; r <= rows; r++){ g.beginPath(); g.moveTo(x0, y0 + r * ch); g.lineTo(px - 14, y0 + r * ch); g.stroke(); }
    for(let c = 0; c <= cols; c++){ g.beginPath(); g.moveTo(x0 + c * cw, y0); g.lineTo(x0 + c * cw, y0 + rows * ch); g.stroke(); }
    g.fillStyle = soft;
    for(let r = 0; r < rows; r++) for(let c = 0; c < cols; c++){
      if(rnd() < 0.62){
        g.font = '700 13px Inter, Helvetica, Arial, sans-serif';
        const marks = ['IO', 'KM', 'AH', 'RN', 'SL', 'PR', '✓', '—'];
        g.fillText(marks[Math.floor(rnd() * marks.length)], x0 + c * cw + cw * 0.28, y0 + r * ch + ch * 0.3);
      }
    }
    g.fillStyle = soft; g.font = '400 14px Inter, Helvetica, Arial, sans-serif';
    let cy = py - capH - 6;
    for(const l of capLines){ g.fillText(l, 14, cy); cy += 18; }
  } else if(style === 'chart'){
    // A hand-kept plot. Fills the sheet; the title is a strip, not a paragraph.
    header(44);
    const x0 = 30, y0 = 62, w = px - 48, h = py - 96;
    g.strokeStyle = '#c9ccd2'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0, y0 + h); g.lineTo(x0 + w, y0 + h); g.stroke();
    g.strokeStyle = accent; g.lineWidth = 3;
    g.beginPath();
    for(let i = 0; i <= 14; i++){
      const t = i / 14;
      const v = 0.25 + 0.55 * t + (rnd() - 0.5) * 0.16;
      const xx = x0 + t * w, yy = y0 + h - Math.min(1, Math.max(0, v)) * h;
      if(i === 0) g.moveTo(xx, yy); else g.lineTo(xx, yy);
    }
    g.stroke();
    g.fillStyle = soft; g.font = '600 14px Inter, Helvetica, Arial, sans-serif';
    g.fillText(String(text.heading ?? '').slice(0, 42), x0, y0 + h + 10);
  } else if(style === 'photo'){
    // A photograph, pinned. Blocks and silhouettes rather than a picture, which at
    // this size is what a photograph looks like anyway.
    g.fillStyle = '#59636b'; g.fillRect(0, 0, px, py - 58);
    g.fillStyle = '#77828a';
    for(let i = 0; i < 5; i++){
      const bw = 40 + rnd() * 90;
      g.fillRect(rnd() * (px - bw), (py - 58) * (0.25 + rnd() * 0.5), bw, 30 + rnd() * 60);
    }
    g.fillStyle = '#3d454b';
    for(let i = 0; i < 3; i++){
      const cx2 = 60 + rnd() * (px - 120);
      g.beginPath(); g.arc(cx2, py - 120, 16, 0, Math.PI * 2); g.fill();
      g.fillRect(cx2 - 15, py - 104, 30, 46);
    }
    g.fillStyle = paper; g.fillRect(0, py - 58, px, 58);
    g.fillStyle = ink; g.font = '700 17px Inter, Helvetica, Arial, sans-serif';
    g.fillText(String(text.heading ?? '').slice(0, 40), 14, py - 48);
    g.fillStyle = soft; g.font = '400 14px Inter, Helvetica, Arial, sans-serif';
    g.fillText(String(text.body ?? '').slice(0, 52), 14, py - 26);
  } else if(style === 'list'){
    // A list of somethings against a list of values, with leader dots. The caller
    // can supply the rows; otherwise it is the group, which is what most of these
    // boards are.
    header(42);
    g.fillStyle = ink; g.font = '700 18px Inter, Helvetica, Arial, sans-serif';
    g.fillText(String(text.heading ?? '').slice(0, 46), 16, 50);
    const rows2 = text.items ?? (() => {
      const names = ['Okafor', 'Mensah', 'Holm', 'Nakamura', 'Lindqvist', 'Raghavan', 'Petrova'];
      const vals = ['ext 2214', 'ext 2190', 'ext 2233', 'Tue', 'Thu', 'am', 'pm'];
      return names.map((n, i) => [n, vals[(seedNum + i) % vals.length]]);
    })();
    // Spread the rows over the sheet rather than stacking them at the top: four
    // items in a space built for seven left the bottom half blank, which is the
    // whole complaint about signs that look like nothing.
    const shown = rows2.slice(0, 7);
    const top = 78, bottom = py - (text.body ? 34 : 14);
    const step = Math.max(22, (bottom - top) / Math.max(1, shown.length));
    const fs = Math.max(15, Math.min(22, step * 0.62));
    let yy = top + step * 0.15;
    for(const [k, v] of shown){
      g.fillStyle = ink; g.font = `600 ${fs}px Inter, Helvetica, Arial, sans-serif`;
      g.fillText(String(k), 16, yy);
      const kw = g.measureText(String(k)).width;
      g.fillStyle = '#c9ccd2';
      for(let x = 26 + kw; x < px - 80; x += 8) g.fillRect(x, yy + fs * 0.55, 3, 2);
      g.fillStyle = soft; g.textAlign = 'right';
      g.fillText(String(v), px - 16, yy);
      g.textAlign = 'left';
      yy += step;
    }
    if(text.body){
      g.fillStyle = soft; g.font = '400 13px Inter, Helvetica, Arial, sans-serif';
      g.fillText(String(text.body).slice(0, 58), 16, py - 22);
    }
  } else if(style === 'tally'){
    // Chalk. Big marks, counted in fives, filling the sheet.
    g.fillStyle = '#2f3438'; g.fillRect(0, 0, px, py);
    g.fillStyle = '#e8e4d8'; g.font = '800 22px Inter, Helvetica, Arial, sans-serif';
    g.fillText(String(text.heading ?? '').slice(0, 34), 16, 16);
    g.strokeStyle = '#e8e4d8'; g.lineWidth = 4;
    let n = 17 + Math.floor(rnd() * 22);
    let x = 24, y = 78;
    while(n > 0){
      const grp = Math.min(5, n); n -= grp;
      for(let i = 0; i < Math.min(4, grp); i++){
        g.beginPath(); g.moveTo(x + i * 12, y); g.lineTo(x + i * 12, y + 46); g.stroke();
      }
      if(grp === 5){ g.beginPath(); g.moveTo(x - 6, y + 46); g.lineTo(x + 42, y); g.stroke(); }
      x += 70;
      if(x > px - 80){ x = 24; y += 74; }
      if(y > py - 40) break;
    }
  } else {
    // A sticky note: full bleed, handwritten, no margins to speak of.
    g.fillStyle = '#e8d98a'; g.fillRect(0, 0, px, py);
    g.fillStyle = '#d8c86f'; g.fillRect(0, py - 26, px, 26);
    g.fillStyle = '#3a3524';
    g.font = 'italic 700 30px Georgia, "Times New Roman", serif';
    let yy = 26;
    for(const l of wrap(text.heading, px - 36, g.font).slice(0, 3)){ g.fillText(l, 18, yy); yy += 36; }
    g.font = 'italic 400 20px Georgia, "Times New Roman", serif';
    for(const l of wrap(text.body, px - 36, g.font).slice(0, 4)){ g.fillText(l, 18, yy); yy += 26; }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/**
 * Paint a poster face.
 *
 * A poster was a coloured rectangle: 0.5 × 0.68 of flat paint, no image on it at
 * all. It counted as a piece, it hung correctly on the wall, and a wall carrying
 * three of them still read as a wall carrying nothing, because a blank orange
 * panel is not something anybody would put up.
 *
 * Not the same job as `paintSignFace`. A sign carries a sentence somebody needs to
 * read; a poster is what is on the wall of a room where this work is done, and it
 * is almost all picture. So these are drawn rather than typeset — a plot with its
 * error bars, an apparatus schematic, a lattice, a conference poster seen from
 * across the room, a periodic grid, a stack of traces — and the words on them are
 * the few a poster actually shows at two metres.
 *
 * Deliberately generic. A ward, a control centre and a submarine all put charts
 * and schematics on their walls, and what makes the room *itself* is the signage
 * next to these, which the theme writes.
 */
const POSTER_KINDS = ['plot', 'apparatus', 'lattice', 'conference', 'periodic', 'traces', 'photo'];

function paintPosterFace({ kind, seed = 1, paper = '#efeee9', ink = '#20262c',
  soft = '#68727c', accent = '#3f6f8f', px = 384, py = 512 } = {}){
  const canvas = document.createElement('canvas');
  canvas.width = px; canvas.height = py;
  const g = canvas.getContext('2d');
  let v = Math.abs(Math.round(seed)) || 3;
  const rnd = () => (v = (v * 48271) % 2147483647) / 2147483647;
  const k = kind ?? POSTER_KINDS[Math.floor(rnd() * POSTER_KINDS.length)];
  const font = (w, s) => `${w} ${Math.round(s)}px Inter, Helvetica, Arial, sans-serif`;

  g.fillStyle = paper; g.fillRect(0, 0, px, py);
  g.textBaseline = 'top';

  /** Ruled lines standing in for body text, which is all it is at this distance. */
  const ruled = (x, y, w, rows, lh = 9) => {
    g.fillStyle = soft; g.globalAlpha = 0.5;
    for(let i = 0; i < rows; i++){
      g.fillRect(x, y + i * lh, w * (0.72 + rnd() * 0.28), Math.max(1, lh * 0.34));
    }
    g.globalAlpha = 1;
  };
  /** A framed panel with a caption bar, which is what every figure on a poster is. */
  const panel = (x, y, w, h) => {
    g.fillStyle = '#fff'; g.fillRect(x, y, w, h);
    g.strokeStyle = soft; g.globalAlpha = 0.6; g.lineWidth = 1;
    g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    g.globalAlpha = 1;
  };

  if(k === 'plot'){
    const m = px * 0.13, w = px - m * 1.4, h = py * 0.52, y0 = py * 0.2;
    g.fillStyle = accent; g.fillRect(0, 0, px, py * 0.1);
    g.fillStyle = '#fff'; g.font = font(800, px * 0.055);
    g.fillText('MEASURED', px * 0.05, py * 0.028);
    panel(m, y0, w, h);
    // Gridlines, axes, then a falling curve with error bars on it, because a plot
    // on a wall in any of these buildings is somebody's result.
    g.strokeStyle = soft; g.globalAlpha = 0.22;
    for(let i = 1; i < 5; i++){
      g.beginPath(); g.moveTo(m, y0 + (h * i) / 5); g.lineTo(m + w, y0 + (h * i) / 5); g.stroke();
      g.beginPath(); g.moveTo(m + (w * i) / 5, y0); g.lineTo(m + (w * i) / 5, y0 + h); g.stroke();
    }
    g.globalAlpha = 1;
    g.strokeStyle = ink; g.lineWidth = 1.5;
    g.beginPath(); g.moveTo(m, y0); g.lineTo(m, y0 + h); g.lineTo(m + w, y0 + h); g.stroke();
    const decay = 0.4 + rnd() * 0.8;
    g.strokeStyle = accent; g.lineWidth = 2.4;
    g.beginPath();
    for(let i = 0; i <= 40; i++){
      const t = i / 40;
      const yy = y0 + h * (1 - Math.exp(-t * 3.2 * decay) * 0.92);
      i ? g.lineTo(m + w * t, yy) : g.moveTo(m + w * t, yy);
    }
    g.stroke();
    g.strokeStyle = ink; g.lineWidth = 1.2;
    for(let i = 0; i < 7; i++){
      const t = (i + 0.5) / 7;
      const yy = y0 + h * (1 - Math.exp(-t * 3.2 * decay) * 0.92) + (rnd() - 0.5) * 8;
      const e = 6 + rnd() * 10;
      g.beginPath(); g.moveTo(m + w * t, yy - e); g.lineTo(m + w * t, yy + e); g.stroke();
      g.fillStyle = ink; g.beginPath(); g.arc(m + w * t, yy, 2.6, 0, Math.PI * 2); g.fill();
    }
    ruled(m, y0 + h + py * 0.045, w, 6, py * 0.028);
  }else if(k === 'apparatus'){
    // Boxes joined by a line, with leaders off them: every schematic ever pinned up.
    g.fillStyle = ink; g.font = font(800, px * 0.06);
    g.fillText('SCHEMATIC', px * 0.07, py * 0.05);
    g.fillStyle = soft; g.fillRect(px * 0.07, py * 0.11, px * 0.4, 2);
    const n = 4, top = py * 0.2, bh = py * 0.115, gap = py * 0.055;
    for(let i = 0; i < n; i++){
      const yy = top + i * (bh + gap);
      const ww = px * (0.36 + rnd() * 0.24), xx = px * 0.12 + (i % 2) * px * 0.18;
      g.fillStyle = i % 2 ? accent : ink; g.globalAlpha = i % 2 ? 0.75 : 0.85;
      g.fillRect(xx, yy, ww, bh);
      g.globalAlpha = 1;
      // The line down the stack, and a leader out to a label.
      g.strokeStyle = ink; g.lineWidth = 1.6;
      if(i){ g.beginPath(); g.moveTo(px * 0.3, yy - gap); g.lineTo(px * 0.3, yy); g.stroke(); }
      g.globalAlpha = 0.55;
      g.beginPath(); g.moveTo(xx + ww, yy + bh / 2); g.lineTo(px * 0.9, yy + bh / 2); g.stroke();
      g.globalAlpha = 1;
      g.fillStyle = soft; g.fillRect(px * 0.9, yy + bh / 2 - 2, px * 0.06, 3);
    }
    ruled(px * 0.12, py * 0.86, px * 0.72, 4, py * 0.026);
  }else if(k === 'lattice'){
    g.fillStyle = ink; g.font = font(800, px * 0.058);
    g.fillText('STRUCTURE', px * 0.07, py * 0.05);
    const cols = 5, rows = 7, m = px * 0.12;
    const cw = (px - m * 2) / (cols - 1), ch = (py * 0.62) / (rows - 1);
    const y0 = py * 0.18;
    g.strokeStyle = soft; g.globalAlpha = 0.45; g.lineWidth = 1.2;
    for(let r = 0; r < rows; r++){
      for(let c = 0; c < cols; c++){
        const x = m + c * cw, y = y0 + r * ch;
        if(c < cols - 1){ g.beginPath(); g.moveTo(x, y); g.lineTo(x + cw, y); g.stroke(); }
        if(r < rows - 1){ g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + ch); g.stroke(); }
      }
    }
    g.globalAlpha = 1;
    for(let r = 0; r < rows; r++){
      for(let c = 0; c < cols; c++){
        const big = (r + c) % 2 === 0;
        g.fillStyle = big ? accent : ink;
        g.beginPath(); g.arc(m + c * cw, y0 + r * ch, big ? 7 : 4, 0, Math.PI * 2); g.fill();
      }
    }
    ruled(m, py * 0.86, px - m * 2, 3, py * 0.028);
  }else if(k === 'conference'){
    // What a poster looks like from across a room: a title, three columns, figures.
    g.fillStyle = accent; g.fillRect(0, 0, px, py * 0.13);
    g.fillStyle = '#fff';
    for(let i = 0; i < 2; i++) g.fillRect(px * 0.06, py * 0.035 + i * py * 0.04, px * (0.7 - i * 0.28), py * 0.022);
    const cw = px * 0.28, gapx = px * 0.04;
    for(let c = 0; c < 3; c++){
      const x = px * 0.04 + c * (cw + gapx);
      let y = py * 0.18;
      for(let blk = 0; blk < 3; blk++){
        if((c + blk) % 3 === 1){ panel(x, y, cw, py * 0.11); y += py * 0.135; }
        else { ruled(x, y, cw, 5, py * 0.022); y += py * 0.145; }
      }
    }
    g.fillStyle = soft; g.globalAlpha = 0.4;
    g.fillRect(px * 0.04, py * 0.93, px * 0.92, 2);
    g.globalAlpha = 1;
  }else if(k === 'periodic'){
    g.fillStyle = ink; g.font = font(800, px * 0.055);
    g.fillText('REFERENCE', px * 0.07, py * 0.05);
    const cols = 6, rows = 9, m = px * 0.08;
    const cw = (px - m * 2) / cols, ch = cw * 1.05, y0 = py * 0.16;
    const TINT = [accent, ink, soft, '#8a6a3f', '#5c7a5c'];
    for(let r = 0; r < rows; r++){
      for(let c = 0; c < cols; c++){
        // A real table is not a full rectangle, and the gaps are most of what makes
        // it read as one rather than as a chessboard.
        if(r < 2 && c > 0 && c < cols - 1) continue;
        const x = m + c * cw, y = y0 + r * ch;
        g.fillStyle = TINT[(r * 3 + c) % TINT.length];
        g.globalAlpha = 0.16 + ((r * 5 + c) % 4) * 0.09;
        g.fillRect(x + 1, y + 1, cw - 2, ch - 2);
        g.globalAlpha = 1;
        g.strokeStyle = soft; g.globalAlpha = 0.35; g.lineWidth = 1;
        g.strokeRect(x + 1.5, y + 1.5, cw - 3, ch - 3);
        g.globalAlpha = 1;
        g.fillStyle = ink; g.fillRect(x + 4, y + ch * 0.3, cw * 0.42, ch * 0.2);
      }
    }
  }else if(k === 'traces'){
    g.fillStyle = ink; g.font = font(800, px * 0.055);
    g.fillText('RECORD', px * 0.07, py * 0.05);
    const n = 6, m = px * 0.1, w = px - m * 2, top = py * 0.17, band = (py * 0.72) / n;
    for(let i = 0; i < n; i++){
      const mid = top + band * (i + 0.5);
      g.strokeStyle = soft; g.globalAlpha = 0.3; g.lineWidth = 1;
      g.beginPath(); g.moveTo(m, mid); g.lineTo(m + w, mid); g.stroke();
      g.globalAlpha = 1;
      g.strokeStyle = i % 3 === 0 ? accent : ink; g.lineWidth = 1.6;
      g.beginPath();
      const f = 3 + i * 2 + rnd() * 4, amp = band * (0.16 + rnd() * 0.2);
      for(let s = 0; s <= 120; s++){
        const t = s / 120;
        const yy = mid - Math.sin(t * f * Math.PI * 2) * amp * Math.exp(-t * (i * 0.3));
        s ? g.lineTo(m + w * t, yy) : g.moveTo(m + w * t, yy);
      }
      g.stroke();
      g.fillStyle = soft; g.fillRect(m - px * 0.055, mid - 2, px * 0.04, 3);
    }
  }else if(k === 'pinboard'){
    // Cork, and what is pinned to it. Asked for by name rather than drawn at
    // random: a pinboard is a piece of furniture, and the others are paper.
    g.fillStyle = '#b99a6b'; g.fillRect(0, 0, px, py);
    g.globalAlpha = 0.16;
    for(let i = 0; i < 900; i++){
      g.fillStyle = i % 2 ? '#8d6f45' : '#d8bd91';
      g.fillRect(rnd() * px, rnd() * py, 2 + rnd() * 3, 2 + rnd() * 3);
    }
    g.globalAlpha = 1;
    const sheets = 5;
    for(let i = 0; i < sheets; i++){
      const w = px * (0.24 + rnd() * 0.16), h = w * (0.9 + rnd() * 0.5);
      const x = px * 0.05 + rnd() * (px * 0.9 - w);
      const y = py * 0.05 + rnd() * (py * 0.9 - h);
      g.save();
      g.translate(x + w / 2, y + h / 2);
      g.rotate((rnd() - 0.5) * 0.14);
      g.globalAlpha = 0.22; g.fillStyle = '#000';
      g.fillRect(-w / 2 + 3, -h / 2 + 4, w, h);
      g.globalAlpha = 1;
      g.fillStyle = i % 4 === 0 ? '#f4e39a' : paper;
      g.fillRect(-w / 2, -h / 2, w, h);
      if(i % 3 === 1){
        g.fillStyle = accent; g.fillRect(-w / 2, -h / 2, w, h * 0.16);
      }
      g.fillStyle = soft; g.globalAlpha = 0.55;
      for(let r = 0; r < 5; r++){
        g.fillRect(-w / 2 + w * 0.1, -h / 2 + h * (0.3 + r * 0.13),
          w * 0.8 * (0.55 + rnd() * 0.45), Math.max(1, h * 0.035));
      }
      g.globalAlpha = 1;
      g.fillStyle = ['#c0392b', '#2c6ea8', '#3f7a4a'][i % 3];
      g.beginPath(); g.arc(0, -h / 2 + 7, 4.5, 0, Math.PI * 2); g.fill();
      g.restore();
    }
  }else{
    // A photograph. Not of anything nameable: a horizon, a structure against it,
    // and a caption bar — enough to read as a picture of the work from the door.
    const grad = g.createLinearGradient(0, 0, 0, py * 0.78);
    grad.addColorStop(0, accent); grad.addColorStop(1, paper);
    g.fillStyle = grad; g.fillRect(px * 0.05, py * 0.05, px * 0.9, py * 0.73);
    g.globalAlpha = 0.8;
    g.fillStyle = ink;
    const base = py * 0.66;
    g.fillRect(px * 0.05, base, px * 0.9, py * 0.12);
    for(let i = 0; i < 5; i++){
      const w2 = px * (0.06 + rnd() * 0.1), h2 = py * (0.06 + rnd() * 0.16);
      g.fillRect(px * (0.1 + i * 0.17), base - h2, w2, h2);
    }
    g.globalAlpha = 1;
    g.fillStyle = paper; g.fillRect(px * 0.05, py * 0.78, px * 0.9, py * 0.04);
    ruled(px * 0.07, py * 0.85, px * 0.7, 3, py * 0.03);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/**
 * A notice with words on it, on a wall.
 *
 * Shared by rooms and corridors because a blank rectangle raises a piece count and
 * says nothing: what tells the player where they are is the text on it — a cryogen
 * warning, a booking sheet, a permit-to-work board, an assembly point.
 *
 * `faceX` says the wall runs along z (so the sheet faces ±x). `toward` is the
 * direction the face should point, +1 or -1.
 */
export function wordedSign({ box, mats: M, x, z, y = 1.58, faceX, toward = -1, text = {}, wide = 0.66 }){
  // Proportions vary with the layout: a rota is landscape, a sticky note is square,
  // a photograph is a little wider than tall. Uniform sheets were half of why every
  // board looked like the same board.
  const seedNum = [...String(text.tag ?? '') + String(text.heading ?? '')]
    .reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 100000, 7);
  const style = text.style ?? SIGN_STYLES[seedNum % SIGN_STYLES.length];
  const SHAPE = { banner: 0.72, warning: 0.66, grid: 0.6, chart: 0.62,
    photo: 0.74, list: 0.78, tally: 0.6, sticky: 0.95 };
  const ratio = SHAPE[style] ?? 0.68;
  const w = style === 'sticky' ? wide * 0.55 : wide;
  const h = w * ratio;
  const tex = paintSignFace(text, 512, Math.round(512 * ratio));
  const backing = box(faceX ? 0.04 : w + 0.06, h + 0.06, faceX ? w + 0.06 : 0.04, x, y, z, M.dark);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }));
  const anchor = box(0.001, 0.001, 0.001, x, y, z, M.dark);
  anchor.add(face);
  markWallMounted([backing, anchor], faceX, toward, `sign ${text.tag ?? text.heading ?? ''}`.trim());
  face.position.set(faceX ? toward * 0.03 : 0, 0, faceX ? 0 : toward * 0.03);
  face.rotation.y = faceX ? toward * Math.PI / 2 : (toward > 0 ? 0 : Math.PI);
  return face;
}

/**
 * A blade sign: a plate hung under the ceiling across a corridor, with a
 * different word on each face.
 *
 * **`plan.bladeSigns` was authored by four themes and read by nobody.** Sightline,
 * Yellow Bay, Headwater and Changeover all write the block; `interiorLevels`,
 * `interiorTower`, `scenes.mjs` and `pieceDensity` all forward it; and no builder
 * had ever consumed it, so the one piece of overhead wayfinding in the engine
 * rendered nowhere. Found looking for the reason a sign hung over a lift lobby
 * was not there — which is the same class as the dead book keys in CLAUDE.md, one
 * layer down: what reaches the game is a valid shorter *building*.
 *
 * **Two single-sided faces, never one DoubleSide plate.** That is house rule 3:
 * text on a DoubleSide material renders mirrored from behind, and a sign whose
 * whole job is to say which way to walk is the worst possible place for it.
 *
 * It is `markStructure`, not `markWallMounted`: a blade sign hangs from the
 * ceiling and has nothing behind it, so tagging it as wall furniture would make
 * `placement.mjs` fire rays at it and correctly report a floating fitting.
 */
export function bladeSign({ box, mats: M, z, halfWidth, ceilingH, west = '', east = '' }){
  const made = [];
  const H = 0.34, DROP = 0.16;
  const y = (ceilingH ?? 3.0) - DROP - H / 2;
  const w = Math.min(halfWidth * 1.7, 2.6);

  // The plate, and a drop rod at each end so it hangs rather than floats.
  made.push(box(w, H, 0.05, 0, y, z, M.dark ?? M.metal));
  for(const s of [-1, 1]){
    made.push(box(0.035, DROP + H / 2, 0.035, s * (w / 2 - 0.1),
      y + H / 2 + DROP / 2, z, M.metal ?? M.dark));
  }

  /**
   * One face per direction, and **the labels swap sides between them.**
   *
   * `west` and `east` name what is on each *side of the corridor* — that is what
   * the four themes authoring this block mean by them, and it is why a single
   * face cannot serve both directions even before house rule 3: a reader walking
   * one way has the west rooms on their left, and walking the other way has them
   * on their right. A sign that puts them in a fixed order is wrong half the time
   * to everybody who reads it.
   */
  const paint = (leftLabel, rightLabel) => {
    const c = document.createElement('canvas');
    c.width = 640; c.height = Math.max(48, Math.round(640 * (H / w)));
    const g = c.getContext('2d');
    g.fillStyle = '#1d2b34'; g.fillRect(0, 0, c.width, c.height);
    const size = Math.round(c.height * 0.42);
    g.font = `600 ${size}px system-ui, sans-serif`;
    g.textBaseline = 'middle';
    const mid = c.height / 2;
    // A hairline between the two halves, so two place names do not read as one.
    g.fillStyle = 'rgba(238,242,240,.28)';
    g.fillRect(c.width / 2 - 1, c.height * 0.18, 2, c.height * 0.64);
    g.fillStyle = '#eef2f0';
    if(leftLabel){
      g.textAlign = 'left';
      g.fillText(`\u25c0 ${String(leftLabel).slice(0, 22)}`, 18, mid);
    }
    if(rightLabel){
      g.textAlign = 'right';
      g.fillText(`${String(rightLabel).slice(0, 22)} \u25b6`, c.width - 18, mid);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    // The same 8 every other sign texture in this file asks for. A blade sign is
    // read down the length of a corridor, which is the most glancing angle
    // anything in the building is seen at and the one place anisotropy shows.
    t.anisotropy = 8;
    return t;
  };
  // Which hand each side is on, and it is worth deriving rather than guessing —
  // the first version had it backwards and the sign pointed right at a lift that
  // was on the left. For a reader looking down −z: forward is (0, 0, −1), up is
  // (0, 1, 0), so right is forward × up = (+1, 0, 0) — east. Left is therefore
  // west. Looking down +z the cross product flips and right is west.
  for(const [toward, leftLabel, rightLabel] of [[1, west, east], [-1, east, west]]){
    if(!leftLabel && !rightLabel) continue;
    const face = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.04, H - 0.04),
      new THREE.MeshStandardMaterial({ map: paint(leftLabel, rightLabel), roughness: 0.85,
        emissive: 0x223038, emissiveIntensity: 0.25 }));
    // **Hung off an anchor the caller placed, not built loose.** `box()` is the
    // only thing here that puts anything in the scene; a `new THREE.Mesh` is
    // added to nothing, which is how the first version of this rendered two bare
    // plates with no words on them — geometry that exists, in no scene graph.
    // Same shape as `wordedSign`, for the same reason.
    const anchor = box(0.001, 0.001, 0.001, 0, y, z + toward * 0.032, M.dark ?? M.metal);
    anchor.add(face);
    // A PlaneGeometry faces +z. The face on the +z side of the plate is the one a
    // reader at greater z sees, so it stays as built; the other is turned round.
    face.rotation.y = toward > 0 ? 0 : Math.PI;
    made.push(anchor, face);
  }
  markStructure(made, 'sign');
  return made;
}

/** Deterministic per-room noise. Same id, same room, every session. */
function rng(seed){
  let s = 0;
  for(const c of String(seed)) s = (s * 31 + c.charCodeAt(0)) % 2147483647;
  s = s || 7;
  return () => { s = (s * 48271) % 2147483647; return s / 2147483647; };
}

/**
 * Furnish one room.
 *
 * `spec`:
 *   box       (w, h, d, x, y, z, material, rotY) => mesh   the caller's placer
 *   mats      { surface, metal, dark, pale, accent, glass } materials to use
 *   bounds    { x0, x1, z0, z1 }  the walkable inside, in the caller's space
 *   kind      what sort of room, if the caller knows: lab, workroom, station,
 *             supply, quiet, reception, waiting, office
 *   seed      anything stable — the room id
 *   hard      (cx, cz, w, d, h) => void   optional collider hook
 *   soft      (x, z, r) => void           optional crowd-avoidance hook
 *   keepClear [{ x, z, r }]  places nothing may go: the case stand, the door
 *   target    how many pieces to place (default 16)
 *
 * Returns the number of pieces placed.
 */
export function furnishRoom(spec){
  const { mats: M, bounds: B, kind = 'lab', seed = 'room',
    hard = () => {}, soft = () => {}, keepClear = [], target = 16 } = spec;
  // Everything placed on a wall goes through this, so it can be caught and tagged
  // as wall furniture without every maker having to say so. `engine/dev/
  // placement.mjs` fires rays at whatever is tagged; anything it cannot see, it
  // cannot check, and what it could not see was buried in the plaster for months.
  let capture = null;
  const box = (...a) => {
    const m = spec.box(...a);
    if(capture && m) capture.push(m);
    return m;
  };
  /** Tag whatever `make` places as hanging on `wallName`, facing into the room. */
  const onWall = (wallName, make) => (x, z) => {
    capture = [];
    try{ make(x, z); }finally{
      const faceX = wallName.startsWith('x');
      const toward = wallName === 'xLo' || wallName === 'zLo' ? 1 : -1;
      for(const o of capture){
        if(!o.userData.mount) markWallMounted([o], faceX, toward, `${wallName} fitting`);
      }
      capture = null;
    }
  };
  // Where the walls actually are, which is NOT where the furniture goes. The floor
  // bounds are inset a metre or two so nothing stands in the walking line; hanging
  // the signs off those put every board a metre or two out from the wall, floating
  // in the middle of the room. A caller that knows its wall planes passes them.
  const W = spec.walls ?? B;
  /**
   * Is there wall at this point?
   *
   * A room's wall planes are not solid all the way round: every room has a doorway
   * cut out of one of them, and a room open to a corridor has no wall on that side
   * at all beyond a nib at each end. Hanging a notice there puts it in mid-air in
   * the opening, which is exactly what it did along the whole spine. The caller
   * knows where its own holes are; this asks.
   */
  const wallOk = spec.wallOk ?? (() => true);
  /**
   * Is there wall behind the whole width of this thing?
   *
   * `wallOk` answers for a point. Everything hung on a wall has a width, and the
   * end of a board is as capable of hanging over a doorway as its middle is.
   */
  const spanOk = (x, z, wallName, halfWide) => {
    const alongZ = wallName === 'xLo' || wallName === 'xHi';
    for(const t of [-halfWide, 0, halfWide]){
      if(!wallOk(x + (alongZ ? 0 : t), z + (alongZ ? t : 0), wallName)) return false;
    }
    return true;
  };
  const rand = rng(seed);
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const jit = (r) => (rand() - 0.5) * 2 * r;
  // What this building prints on. A 1960s control centre does not print on white,
  // and a bright sheet in a dark room reads as a light box rather than as paper.
  const PRINT = { paper: '#efeee9', ink: '#20262c', soft: '#68727c', accent: '#3f6f8f',
    ...(spec.print ?? {}) };

  const w = Math.abs(B.x1 - B.x0), d = Math.abs(B.z1 - B.z0);
  const cx = (B.x0 + B.x1) / 2, cz = (B.z0 + B.z1) / 2;
  // Which wall is which, in the caller's own space.
  const xLo = Math.min(B.x0, B.x1), xHi = Math.max(B.x0, B.x1);
  const zLo = Math.min(B.z0, B.z1), zHi = Math.max(B.z0, B.z1);

  let placed = 0;
  // Where something already is. Two pieces closer than this are one piece as far
  // as `pieceDensity.mjs` is concerned — and, more to the point, as far as the eye
  // is concerned — so a room "furnished" with sixteen things in four heaps reads
  // as four things. Separation is the difference between a count and a room.
  // Scaled to the room. A 100 m² laboratory can hold its furniture a comfortable
  // 1.25 m apart and still take twenty pieces; a 59 m² store cannot, and the first
  // version left four of Quantum's smaller rooms short of the bar for no better
  // reason than a constant. The floor is just above the density check's own
  // clustering radius, so each piece still counts as one.
  // Floor furniture and wall furniture are kept apart from their own kind and not
  // from each other, because they are not at the same height: a notice above a
  // bench is two pieces and reads as two. 1.7 m between floor pieces is what it
  // takes for a bench and the shelving beside it to stay two objects rather than
  // one long heap — measured against the density check's own clustering radius,
  // which is why the number is not rounder.
  const FLOOR_SEP = 1.7, WALL_SEP = 1.1;
  const taken = { floor: [], wall: [] };
  const blocked = (x, z, r = 0.5, scale = 1) => keepClear.some(k =>
    Math.hypot(k.x - x, k.z - z) < (k.r ?? 1) * scale + r);
  const crowded = (list, x, z, sep) => list.some(t => Math.hypot(t.x - x, t.z - z) < sep);
  /** Place one piece, unless the spot is spoken for or too close to its own kind. */
  const put = (fn, x, z, lane = 'floor') => {
    const sep = lane === 'wall' ? WALL_SEP : FLOOR_SEP;
    // `keepClear` is about the floor: it keeps furniture out of the way in, and off
    // the spot where a case stand goes. Enforced at full radius on the wall as
    // well, it emptied five metres of the long wall in every group room — the
    // stand in the middle of the room was reserving the wall behind it, and a
    // poster on a wall has never been in anybody's way. The wall keeps a smaller
    // margin, enough that nothing is hung directly behind the thing you walk up to.
    if(blocked(x, z, lane === 'wall' ? 0.35 : 0.5, lane === 'wall' ? 0.4 : 1)
      || crowded(taken[lane], x, z, sep)) return false;
    fn(x, z);
    taken[lane].push({ x, z });
    placed++;
    return true;
  };

  // ---- the vocabulary. Each of these is one piece: a few boxes that read as one
  // object, which is exactly how the density check counts them.
  const worktop = (x, z, len, along = 'z') => {
    const h = 0.9;
    const ww = along === 'z' ? 0.66 : len, dd = along === 'z' ? len : 0.66;
    // The top sits ON the carcass. It used to float 0.17 m above it: the carcass
    // was 0.62 tall centred at 0.39, so its top was at 0.70 and the surface at
    // 0.87, and at eye level that gap is the whole illusion gone.
    const top = h - 0.03;                       // underside of the 60 mm surface
    box(ww, 0.06, dd, x, h, z, M.surface);
    box(ww - 0.1, top, dd - 0.1, x, top / 2, z, M.dark);
    hard(x, z, ww, dd, h);
  };
  const shelfUnit = (x, z, along = 'z') => {
    const ww = along === 'z' ? 0.42 : 1.9, dd = along === 'z' ? 1.9 : 0.42;
    for(let i = 0; i < 4; i++) box(ww, 0.035, dd, x, 0.42 + i * 0.46, z, M.metal);
    for(const sx of [-1, 1]) for(const sz of [-1, 1]){
      box(0.05, 1.85, 0.05, x + sx * (ww / 2 - 0.04), 0.92, z + sz * (dd / 2 - 0.04), M.metal);
    }
    // Something on the shelves, or it reads as a shop fitting.
    for(let i = 0; i < 3; i++){
      const sh = 0.42 + Math.floor(rand() * 4) * 0.46;
      box(0.2 + rand() * 0.12, 0.16, 0.24, x + jit(0.08), sh + 0.1, z + jit(dd / 3), pick([M.pale, M.accent, M.dark]));
    }
    hard(x, z, ww, dd, 1.9);
  };
  const stool = (x, z) => {
    box(0.34, 0.05, 0.34, x, 0.62, z, M.dark);
    for(const sx of [-1, 1]) for(const sz of [-1, 1]){
      box(0.035, 0.6, 0.035, x + sx * 0.12, 0.3, z + sz * 0.12, M.metal);
    }
    soft(x, z, 0.4);
  };
  const chair = (x, z, facing = 0) => {
    box(0.44, 0.05, 0.44, x, 0.45, z, M.pale, facing);
    box(0.44, 0.5, 0.06, x, 0.72, z - 0.19, M.pale, facing);
    for(const sx of [-1, 1]) for(const sz of [-1, 1]){
      box(0.04, 0.44, 0.04, x + sx * 0.17, 0.22, z + sz * 0.17, M.metal);
    }
    soft(x, z, 0.45);
  };
  const bin = (x, z) => {
    box(0.34, 0.62, 0.34, x, 0.31, z, pick([M.dark, M.metal]));
    box(0.37, 0.04, 0.37, x, 0.64, z, M.pale);
  };
  const trolley = (x, z) => {
    box(0.5, 0.04, 0.78, x, 0.82, z, M.metal);
    box(0.5, 0.04, 0.78, x, 0.42, z, M.metal);
    for(const sx of [-1, 1]) for(const sz of [-1, 1]){
      box(0.035, 0.8, 0.035, x + sx * 0.22, 0.4, z + sz * 0.35, M.metal);
    }
    box(0.3, 0.18, 0.4, x, 0.93, z, pick([M.pale, M.accent]));
    hard(x, z, 0.6, 0.9, 0.9);
  };
  const cabinet = (x, z, along = 'z') => {
    const ww = along === 'z' ? 0.5 : 1.1, dd = along === 'z' ? 1.1 : 0.5;
    box(ww, 1.35, dd, x, 0.675, z, M.metal);
    for(let i = 0; i < 3; i++){
      box(ww + 0.02, 0.02, dd * 0.8, x, 0.4 + i * 0.4, z, M.dark);
    }
    hard(x, z, ww, dd, 1.35);
  };
  const crate = (x, z) => {
    const n = 1 + Math.floor(rand() * 3);
    for(let i = 0; i < n; i++){
      box(0.6, 0.34, 0.44, x + jit(0.06), 0.17 + i * 0.35, z + jit(0.06), pick([M.pale, M.accent]));
    }
    hard(x, z, 0.7, 0.55, 0.35 * n);
  };
  // Wall furniture. Flat, cheap, and the difference between a wall and a room.
  //
  // A wall maker is given the name of the wall it is going on, not a boolean:
  // which way round the sheet lies and which way it faces are both derived from
  // it, and a printed face pointing into the wall is a blank rectangle from the
  // room. (It cannot be solved with a DoubleSide material — that renders the
  // print mirrored from behind. See the rules in CLAUDE.md.)
  const onX = (wall) => wall === 'xLo' || wall === 'xHi';
  const towardOf = (wall) => (wall === 'xLo' || wall === 'zLo' ? 1 : -1);
  /** A printed sheet hung flat on a wall, with a thin edge behind it. */
  const sheetOnWall = (x, y, z, wall, w, h, tex, edge) => {
    const faceX = onX(wall), toward = towardOf(wall);
    const t = 0.02;
    box(faceX ? t : w + 0.03, h + 0.03, faceX ? w + 0.03 : t, x, y, z, edge);
    const anchor = box(0.001, 0.001, 0.001, x, y, z, edge);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.94, metalness: 0 }));
    anchor.add(face);
    face.position.set(faceX ? toward * 0.022 : 0, 0, faceX ? 0 : toward * 0.022);
    face.rotation.y = faceX ? toward * Math.PI / 2 : (toward > 0 ? 0 : Math.PI);
    return face;
  };
  /** A pinboard: cork, and the paper somebody has pinned to it. */
  const notice = (x, z, wall) => {
    const k = 0.85 + rand() * 0.4;
    const w = 0.72 * k, h = 0.54 * k;
    sheetOnWall(x, 1.48 + rand() * 0.26, z, wall, w, h,
      paintPosterFace({ kind: 'pinboard', seed: Math.floor(rand() * 1e6), ...PRINT,
        px: 512, py: 384 }), M.dark);
  };
  /**
   * A poster.
   *
   * It used to be one flat-painted rectangle 0.5 × 0.68, which counted as a piece
   * and hung correctly and made no difference to the room at all: an orange panel
   * with nothing on it is not something anybody would put up. Now it carries a
   * plot, a schematic, a lattice, a conference poster, a reference grid, a stack
   * of traces or a photograph, and its shape follows what is on it.
   */
  const poster = (x, z, wall) => {
    const kind = POSTER_KINDS[Math.floor(rand() * POSTER_KINDS.length)];
    const wide = kind === 'traces' || kind === 'photo';
    const k = 0.82 + rand() * 0.5;
    const w = (wide ? 0.88 : 0.6) * k;
    const h = (wide ? 0.6 : 0.84) * k;
    sheetOnWall(x, 1.5 + rand() * 0.3, z, wall, w, h,
      paintPosterFace({ kind, seed: Math.floor(rand() * 1e6), ...PRINT,
        px: wide ? 512 : 384, py: wide ? 350 : 512 }), M.dark);
  };
  const extinguisher = (x, z) => {
    // On the floor. It was drawn at 0.72 with a half-height of 0.25, which put its
    // base half a metre up in the air with nothing under it.
    box(0.15, 0.06, 0.15, x, 0.03, z, M.dark);          // base
    box(0.13, 0.5, 0.13, x, 0.31, z, M.accent);         // body
    box(0.06, 0.12, 0.06, x, 0.62, z, M.dark);          // neck
    box(0.14, 0.04, 0.05, x + 0.04, 0.66, z, M.metal);  // handle
  };
  const clock = (x, z, wallX) => {
    box(wallX ? 0.03 : 0.3, 0.3, wallX ? 0.3 : 0.03, x, 2.15, z, M.pale);
  };
  const hooks = (x, z, wallX) => {
    box(wallX ? 0.04 : 0.7, 0.06, wallX ? 0.7 : 0.04, x, 1.72, z, M.metal);
    for(let i = -1; i <= 1; i++){
      const ox = wallX ? 0 : i * 0.22, oz = wallX ? i * 0.22 : 0;
      box(0.05, 0.1, 0.05, x + ox, 1.65, z + oz, M.metal);
    }
  };
  const cableTray = (x, z, along = 'z', len = 3) => {
    const ww = along === 'z' ? 0.28 : len, dd = along === 'z' ? len : 0.28;
    box(ww, 0.06, dd, x, 2.45, z, M.metal);
    const n = Math.max(2, Math.round(len / 1.5));
    for(let i = 0; i < n; i++){
      const t = -len / 2 + (i + 0.5) * (len / n);
      box(0.06, 0.3, 0.06, x + (along === 'z' ? 0 : t), 2.62, z + (along === 'z' ? t : 0), M.metal);
    }
  };

  // ---- things that belong to a particular kind of work
  //
  // Generic furniture makes a room look occupied; it does not make it look like a
  // cryogenics bay. These are the silhouettes that say what happens here, and they
  // are chosen from the room's own name, so Cryogenics gets dewars and gas
  // cylinders and the Reading Room does not.
  const dewar = (x, z) => {
    box(0.62, 1.15, 0.62, x, 0.58, z, M.metal);          // vessel
    box(0.7, 0.09, 0.7, x, 1.18, z, M.pale);             // lid
    box(0.09, 0.36, 0.09, x + 0.2, 1.36, z, M.metal);    // neck fitting
    box(0.66, 0.1, 0.66, x, 0.06, z, M.dark);            // castor base
    hard(x, z, 0.75, 0.75, 1.2);
  };
  const gasCylinder = (x, z) => {
    for(let i = 0; i < 2; i++){
      const ox = i * 0.34;
      box(0.28, 1.35, 0.28, x + ox, 0.68, z, pick([M.accent, M.metal, M.dark]));
      box(0.12, 0.16, 0.12, x + ox, 1.44, z, M.metal);
    }
    box(0.06, 0.06, 0.9, x + 0.17, 1.1, z, M.metal);     // the chain that holds them
    hard(x + 0.17, z, 0.8, 0.4, 1.5);
  };
  const pumpSet = (x, z) => {
    box(0.7, 0.5, 0.5, x, 0.25, z, M.dark);              // pump body, on the floor
    box(0.3, 0.3, 0.3, x + 0.2, 0.65, z, M.metal);       // motor, on the body
    // The hose leaves the motor rather than hanging in the air above it, which is
    // where it was: 0.25 m clear of the pump with nothing between them.
    box(0.1, 0.1, 0.7, x + 0.2, 0.62, z + 0.42, M.metal);
    hard(x, z, 0.8, 0.7, 0.8);
  };
  const rack = (x, z, along = 'z') => {
    const ww = along === 'z' ? 0.66 : 0.6, dd = along === 'z' ? 0.6 : 0.66;
    box(ww, 2.0, dd, x, 1.0, z, M.dark);
    // Front panels, which is what makes a rack read as a rack.
    for(let i = 0; i < 7; i++){
      box(ww + 0.02, 0.2, dd * 0.1, x, 0.35 + i * 0.24, z + (along === 'z' ? dd / 2 : 0),
        i % 3 === 0 ? M.accent : M.metal);
    }
    hard(x, z, ww, dd, 2.0);
  };
  const cableDrum = (x, z) => {
    box(0.9, 0.9, 0.24, x, 0.45, z, M.surface);
    box(0.9, 0.9, 0.24, x, 0.45, z + 0.5, M.surface);
    box(0.3, 0.3, 0.5, x, 0.45, z + 0.25, M.dark);
    hard(x, z + 0.25, 1.0, 0.8, 0.9);
  };
  const toolBoard = (x, z, wallX) => {
    const t = 0.04;
    box(wallX ? t : 1.5, 0.9, wallX ? 1.5 : t, x, 1.5, z, M.surface);
    for(let i = 0; i < 6; i++){
      const o = -0.6 + i * 0.24;
      box(wallX ? 0.06 : 0.07, 0.26 + rand() * 0.2, wallX ? 0.07 : 0.06,
        x + (wallX ? 0.05 : o), 1.42, z + (wallX ? o : 0.05), M.metal);
    }
  };
  const monitorBank = (x, z, along = 'z') => {
    const ww = along === 'z' ? 0.7 : 1.8, dd = along === 'z' ? 1.8 : 0.7;
    box(ww, 0.06, dd, x, 0.76, z, M.surface);            // desk
    box(ww - 0.1, 0.7, dd - 0.1, x, 0.38, z, M.dark);
    for(let i = 0; i < 3; i++){
      const o = -0.55 + i * 0.55;
      box(along === 'z' ? 0.05 : 0.5, 0.34, along === 'z' ? 0.5 : 0.05,
        x + (along === 'z' ? 0.1 : o), 1.05, z + (along === 'z' ? o : 0.1), M.dark);
    }
    hard(x, z, ww, dd, 1.2);
  };
  const whiteboard = (x, z, wallX) => {
    box(wallX ? 0.05 : 2.2, 1.15, wallX ? 2.2 : 0.05, x, 1.55, z, M.pale);
    box(wallX ? 0.07 : 2.3, 0.06, wallX ? 2.3 : 0.07, x, 0.94, z, M.metal);   // pen tray
  };
  const sampleStore = (x, z) => {
    box(0.75, 1.7, 0.7, x, 0.85, z, M.pale);
    box(0.78, 0.5, 0.06, x, 1.2, z + 0.36, M.glass);
    box(0.12, 0.06, 0.06, x + 0.3, 1.0, z + 0.38, M.metal);
    hard(x, z, 0.85, 0.8, 1.7);
  };
  const barrel = (x, z) => {
    box(0.62, 0.9, 0.62, x, 0.45, z, pick([M.accent, M.dark]));
    box(0.66, 0.06, 0.66, x, 0.9, z, M.metal);
    hard(x, z, 0.7, 0.7, 0.95);
  };
  const stretcher = (x, z, along = 'z') => {
    const ww = along === 'z' ? 0.7 : 2.0, dd = along === 'z' ? 2.0 : 0.7;
    box(ww, 0.08, dd, x, 0.75, z, M.pale);
    box(ww - 0.1, 0.5, dd - 0.1, x, 0.4, z, M.metal);
    hard(x, z, ww, dd, 0.85);
  };
  /**
   * A notice with words on it.
   *
   * A blank coloured rectangle raises the piece count and tells the player
   * nothing. What says where you are, and what is done here, is the text: a
   * cryogen warning, a booking sheet, a torque table, a shift rota. The sheet is
   * painted onto a canvas the same way the case plate and the wall screens are.
   */
  // Height and size vary per board. Hung at one height in one size, wall furniture
  // reads as a row of identical rectangles at picture-rail level — which is what a
  // wall of them looked like even once they were spread along it properly. Real
  // walls carry a big board at eye level and a small notice above it.
  const signPlate = (x, z, wallX, text) => wordedSign({
    box, mats: M, x, z,
    y: 1.5 + rand() * 0.34,
    wide: 0.58 + rand() * 0.42,
    faceX: wallX,
    toward: wallX ? (x < cx ? 1 : -1) : (z < cz ? 1 : -1),
    text,
  });

  /**
   * What the notices in this kind of room say.
   *
   * Written per domain because "a sense of place" is not a texture: it is the fact
   * that the cryogenics bay has an oxygen-deficiency warning on the wall and the
   * fabrication bay has a gowning order, and neither has the other's.
   */
  const NOTICES = {
    cryo: [
      { tag: 'WARNING', heading: 'Oxygen deficiency hazard', body: 'Helium and nitrogen displace air. Do not enter alone while transferring.', accent: '#b5502f', footer: 'Monitor must read above 19.5%' },
      { tag: 'FRIDGE TIME', heading: 'Cooldown booking', body: 'Warm-up and cooldown is four days. Book the whole slot or none of it.', accent: '#3f6f8f' },
      { tag: 'PROCEDURE', heading: 'Before opening the vacuum can', body: 'Vent to nitrogen, confirm still and mixing chamber above 4 K, log the pressure.', accent: '#5b6a72' },
    ],
    fab: [
      { tag: 'GOWNING', heading: 'Order of dress', body: 'Overshoes, hood, coverall, gloves. Nothing paper past this line.', accent: '#8a6a1e' },
      { tag: 'PROCESS', heading: 'Junction oxidation', body: 'Chamber pressure and dwell are logged per wafer. A run without a log is a run without a result.', accent: '#3f6f8f' },
      { tag: 'YIELD', heading: 'This month', body: 'Usable chips per run, posted Fridays. Query the number, not the person.', accent: '#5b6a72' },
    ],
    control: [
      { tag: 'ROTA', heading: 'Console cover', body: 'Two on shift while a circuit is running. Handover in writing.', accent: '#3f6f8f' },
      { tag: 'CALIBRATION', heading: 'Before a run', body: 'Frequency, pulse length, discriminator. In that order, every session.', accent: '#5b6a72' },
      { tag: 'DO NOT', heading: 'Re-fit on the same shots', body: 'A rule scored on the data that chose it flatters itself. Keep a held-out set.', accent: '#b5502f' },
    ],
    verify: [
      { tag: 'REPORTING', heading: 'Which number goes out', body: 'Method, sample size and uncertainty travel with every figure, or it does not leave the room.', accent: '#3f6f8f' },
      { tag: 'BENCHMARK', heading: 'Sequence lengths', body: 'Report the decay, not the single point. A fixed offset moves the curve, not its slope.', accent: '#5b6a72' },
    ],
    network: [
      { tag: 'SECURITY', heading: 'Key material', body: 'Nothing generated here leaves on removable media. Ask, and it will be refused in writing.', accent: '#b5502f' },
      { tag: 'FIBRE', heading: 'Loss budget', body: 'Per span, per connector, per splice. Posted so nobody has to guess.', accent: '#3f6f8f' },
    ],
    sensing: [
      { tag: 'CALIBRATION', heading: 'Against the reference', body: 'Every session, before anything anybody wants. The ratio goes in the log.', accent: '#3f6f8f' },
      { tag: 'FOR THE STUDY', heading: 'Numbers that leave the building', body: 'Signed, dated, and traceable to the reference source.', accent: '#5b6a72' },
    ],
    power: [
      { tag: 'DANGER', heading: 'Live equipment', body: 'Isolate, prove dead, earth. Permit on the panel before any cover comes off.', accent: '#b5502f' },
      { tag: 'RATING', heading: 'Continuous, not indefinite', body: 'A rating is a temperature expressed as a current. Above it, clearance goes first.', accent: '#3f6f8f' },
    ],
    lab: [
      { tag: 'SAFETY', heading: 'Before you start', body: 'Know what you are handling, where the wash is, and who else is in the room.', accent: '#b5502f' },
      { tag: 'SAMPLES', heading: 'Chain of custody', body: 'Labelled at collection, initialled at every handover. An unlabelled sample is not evidence.', accent: '#3f6f8f' },
    ],
    ward: [
      { tag: 'HYGIENE', heading: 'Hands', body: 'Before and after every contact. The dispenser by the door is checked daily.', accent: '#3f6f8f' },
      { tag: 'ESCALATION', heading: 'When to call', body: 'Observations outside range are called immediately, not at the end of the round.', accent: '#b5502f' },
    ],
    store: [
      { tag: 'STOCK', heading: 'First in, first out', body: 'Rotate. Anything past date goes to the return shelf, not back on this one.', accent: '#5b6a72' },
      { tag: 'LIFTING', heading: 'Above shoulder height', body: 'Use the step. Two people for anything over 20 kg.', accent: '#8a6a1e' },
    ],
    generic: [
      { tag: 'FIRE', heading: 'On hearing the alarm', body: 'Leave by the nearest exit. Assembly point is the yard gate. Do not use the lift.', accent: '#b5502f' },
      { tag: 'NOTICE', heading: 'Report it', body: 'Anything broken, missing or not where it should be. Nobody is blamed for a report.', accent: '#5b6a72' },
    ],
  };
  const NOTICE_BY_NAME = [
    [/cryo|refriger|vacuum|dilution|helium/i, 'cryo'],
    [/fabricat|material|wafer|clean ?room|junction/i, 'fab'],
    [/control|readout|operations|ops|console|dispatch|watch/i, 'control'],
    [/verif|benchmark|error|analysis|statist/i, 'verify'],
    [/network|security|fibre|fiber|comms|telemetry/i, 'network'],
    [/sens|magnet|metrolog|standards|calibrat/i, 'sensing'],
    [/power|generation|switch|transmiss|distribut|relay|substation/i, 'power'],
    [/ward|triage|clinic|patient|nurs|treatment/i, 'ward'],
    [/store|supply|spares|stock|depot|magazine/i, 'store'],
  ];

  // Two of these hang on a wall and want a flag rather than an axis, so they are
  // wrapped to the same (x, z, axis) shape as everything else.
  const NARRATIVE = { dewar, gasCylinder, pumpSet, rack, cableDrum,
    toolBoard: (x, z, axis) => toolBoard(x, z, axis === 'z'),
    monitorBank,
    whiteboard: (x, z, axis) => whiteboard(x, z, axis === 'z'),
    sampleStore, barrel, stretcher };

  /**
   * What belongs in a room called this.
   *
   * Keyed off the room's own name because every game already writes one, so a
   * theme gets its own objects without authoring anything. A theme that wants
   * something specific passes `fittings` and this is skipped.
   */
  const BY_NAME = [
    [/cryo|refriger|vacuum|dilution|helium/i, ['dewar', 'gasCylinder', 'pumpSet', 'toolBoard']],
    [/fabricat|material|wafer|clean ?room|junction/i, ['sampleStore', 'toolBoard', 'gasCylinder', 'rack']],
    [/control|readout|operations|ops|dispatch|watch|flight|console/i, ['monitorBank', 'rack', 'whiteboard', 'rack']],
    [/verif|benchmark|error|analysis|statist|comput/i, ['monitorBank', 'whiteboard', 'rack', 'toolBoard']],
    [/network|security|fibre|fiber|comms|telemetry|radio/i, ['rack', 'rack', 'cableDrum', 'monitorBank']],
    [/sens|magnet|instrument|metrolog|standards|calibrat/i, ['rack', 'monitorBank', 'dewar', 'toolBoard']],
    [/power|generation|switch|transmiss|distribut|substation|relay/i, ['rack', 'cableDrum', 'toolBoard', 'barrel']],
    [/chem|assay|lab|spectro|sample|photometry|water|soil/i, ['sampleStore', 'toolBoard', 'barrel', 'gasCylinder']],
    [/ward|triage|clinic|patient|nurs|hospital|treatment/i, ['stretcher', 'sampleStore', 'monitorBank', 'toolBoard']],
    [/store|supply|spares|stock|cargo|magazine|depot/i, ['barrel', 'cableDrum', 'gasCylinder', 'toolBoard']],
    [/engine|machine|workshop|maintenance|reactor|pump/i, ['pumpSet', 'toolBoard', 'cableDrum', 'barrel']],
    [/read|quiet|library|office|planning|brief|meeting/i, ['whiteboard', 'monitorBank', 'toolBoard']],
    [/survey|assess|structur|geolog|seismic|field/i, ['toolBoard', 'cableDrum', 'monitorBank', 'barrel']],
  ];
  const nameFor = String(spec.roomName ?? seed ?? '');
  const fittings = spec.fittings
    ?? (BY_NAME.find(([re]) => re.test(nameFor))?.[1] ?? ['rack', 'toolBoard', 'monitorBank']);

  // ---- what each kind of room is mostly made of. The first entries are the ones
  // that read as "this is a laboratory" or "this is a store"; the rest is the
  // clutter every room has.
  const RECIPES = {
    lab:       ['worktop', 'worktop', 'shelfUnit', 'stool', 'stool', 'cabinet', 'trolley'],
    workroom:  ['worktop', 'trolley', 'cabinet', 'crate', 'stool', 'shelfUnit'],
    station:   ['worktop', 'worktop', 'chair', 'chair', 'cabinet', 'shelfUnit'],
    supply:    ['shelfUnit', 'shelfUnit', 'crate', 'crate', 'cabinet', 'trolley'],
    quiet:     ['chair', 'chair', 'worktop', 'shelfUnit', 'bin'],
    reception: ['worktop', 'chair', 'chair', 'cabinet', 'bin', 'shelfUnit'],
    waiting:   ['chair', 'chair', 'chair', 'chair', 'bin', 'shelfUnit'],
    office:    ['worktop', 'chair', 'chair', 'cabinet', 'shelfUnit', 'bin'],
  };
  const MAKERS = { worktop: (x, z, a) => worktop(x, z, Math.min(3.2, d * 0.4), a),
    shelfUnit, stool, chair, bin, trolley, cabinet, crate };

  // Along the walls first — furniture belongs against something — then a little in
  // the middle, because a room whose centre is bare reads as a set.
  const inset = 0.75;
  const lanes = [
    { x: xLo + inset, along: 'z', wall: 'x' },
    { x: xHi - inset, along: 'z', wall: 'x' },
    { z: zLo + inset, along: 'x', wall: 'z' },
    { z: zHi - inset, along: 'x', wall: 'z' },
  ];
  // ---- signage first, and a minimum of it
  //
  // It used to go down after the furniture and stop at `target`, which meant a room
  // hit its piece count on benches and crates and ended up with one notice on four
  // walls. A room with nothing on its walls reads as sterile however much is on its
  // floor, so the wall pass runs first and has its own floor: `minSigns` boards go
  // up before anything stands on the ground.
  const MIN_SIGNS = spec.minSigns ?? 6;

  // The notices this room's work would actually have on its walls, then the
  // building-wide ones, then plain boards. Text first: a blank rectangle raises
  // the count and says nothing about where the player is standing.
  const domain = spec.notices
    ?? NOTICES[NOTICE_BY_NAME.find(([re]) => re.test(nameFor))?.[1] ?? 'generic'];
  const signs = [...domain, ...NOTICES.generic];
  let si = 0;
  const nextSign = () => signs[si++ % signs.length];
  // What goes on a wall, in the order a wall fills up: the things that say where
  // you are standing first, then the things that say what is done here, then the
  // fittings. Each takes the name of its wall, so it can work out which way round
  // to lie and which way to face.
  const WALL_VOCAB = [
    (x, z, wall) => signPlate(x, z, onX(wall), nextSign()),
    (x, z, wall) => poster(x, z, wall),
    (x, z, wall) => signPlate(x, z, onX(wall), nextSign()),
    (x, z, wall) => notice(x, z, wall),
    (x, z, wall) => poster(x, z, wall),
    (x, z, wall) => hooks(x, z, onX(wall)),
    (x, z, wall) => signPlate(x, z, onX(wall), nextSign()),
    (x, z, wall) => poster(x, z, wall),
    (x, z, wall) => clock(x, z, onX(wall)),
    (x, z) => extinguisher(x, z),
    (x, z, wall) => notice(x, z, wall),
    (x, z) => bin(x, z),
  ];
  // On the wall planes, not on the furniture rectangle.
  //
  // And *proud* of them. A caller passes the line its walls were built on, and a
  // wall is raised centred on that line — so a 0.18 m wall on x = 2.1 has the
  // surface a player sees at 2.01, and the 0.07 m standoff this used to hang
  // things at put every poster, notice and clock 20 mm inside the plaster. They
  // were in the room, they were counted, they had wall behind them, and nobody
  // could see any of them. Half the thickness, plus enough to stand off it.
  const wallT = spec.wallThickness ?? 0.18;
  const stand = wallT / 2 + 0.03;
  const wxLo = Math.min(W.x0, W.x1), wxHi = Math.max(W.x0, W.x1);
  const wzLo = Math.min(W.z0, W.z1), wzHi = Math.max(W.z0, W.z1);
  const wWide = wxHi - wxLo, wDeep = wzHi - wzLo;
  const along = { xLo: (t) => ({ x: wxLo + stand, z: wzLo + 0.8 + t * (wDeep - 1.6) }),
    xHi: (t) => ({ x: wxHi - stand, z: wzLo + 0.8 + t * (wDeep - 1.6) }),
    zLo: (t) => ({ x: wxLo + 0.8 + t * (wWide - 1.6), z: wzLo + stand }),
    zHi: (t) => ({ x: wxLo + 0.8 + t * (wWide - 1.6), z: wzHi - stand }) };
  /**
   * Fill each wall along its whole length.
   *
   * The old pass held a fixed list of eighteen spots, each pinned to a named wall,
   * and each took the first free position scanning from one end. Two things came
   * of that. A short wall and an eleven-metre wall were offered the same number of
   * things, so the long ones stayed bare; and because every item started its
   * search at the same end, they landed wherever the search happened to succeed
   * rather than spread out. Error & Verification had six metres of unbroken empty
   * wall down one side of it — which is what "the rooms look sterile" was, after
   * the fit-out had already put enough pieces in them.
   *
   * So each wall gets a quota from its own length, and the i-th item on it starts
   * at the i-th of that many even positions rather than at the end. It only
   * searches outward from there if the even position is refused — by a doorway, by
   * the case stand, or by something already hung.
   */
  const runOf = { xLo: wDeep, xHi: wDeep, zLo: wWide, zHi: wWide };
  const WALLS_ROUND = ['xLo', 'zHi', 'xHi', 'zLo'];
  const quotaOf = (wall) => Math.max(2, Math.min(8, Math.round((runOf[wall] - 1.4) / 1.7)));
  let signsUp = 0;
  let vi = 0;
  const maxQuota = Math.max(...WALLS_ROUND.map(quotaOf));
  // Round-robin the walls rather than finishing one before starting the next, so a
  // room that runs out of vocabulary has it spread over four walls, not two.
  for(let i = 0; i < maxQuota; i++){
    for(const wall of WALLS_ROUND){
      const quota = quotaOf(wall);
      if(i >= quota) continue;
      if(signsUp >= MIN_SIGNS && placed >= target) break;
      const make = WALL_VOCAB[vi % WALL_VOCAB.length];
      // The even position first, then either side of it, in steps small enough to
      // clear a doorway and large enough to be worth trying.
      const base = (i + 0.5) / quota;
      for(const d of [0, 0.06, -0.06, 0.13, -0.13, 0.22, -0.22, 0.32, -0.32]){
        const t = base + d + jit(0.015);
        if(t < 0.02 || t > 0.98) continue;
        const p = along[wall](t);
        // Both ends of the board, not just its middle. A sheet is up to 1.3 m
        // across, so a centre that clears a doorway by 200 mm still hangs half a
        // metre of board over the opening — which is what floated in every entrance.
        if(!spanOk(p.x, p.z, wall, 0.7)) continue;
        if(put(onWall(wall, (px, pz) => make(px, pz, wall)), p.x, p.z, 'wall')){
          signsUp++; vi++;
          break;
        }
      }
    }
  }

  // The things that say what happens here go down first and get the best wall
  // positions. Generic furniture fills in around them, never instead of them.
  // Two of these hang on a wall rather than standing on the floor, and they were
  // being placed from the furniture lanes like everything else — which put a
  // tool board and a whiteboard in the middle of the room, floating.
  const WALL_MOUNTED = new Set(['toolBoard', 'whiteboard']);
  let li = Math.floor(rand() * lanes.length);
  const WALLS_IN_ORDER = ['xLo', 'xHi', 'zLo', 'zHi'];
  let wi = Math.floor(rand() * 4);
  for(const name of fittings){
    const make = NARRATIVE[name];
    if(!make) continue;
    if(WALL_MOUNTED.has(name)){
      const wallName = WALLS_IN_ORDER[wi++ % 4];
      for(let k = 0; k < 8; k++){
        const p = along[wallName]((k + 0.5) / 8);
        if(!spanOk(p.x, p.z, wallName, 1.2)) continue;
        if(put(onWall(wallName, (px, pz) => make(px, pz, wallName.startsWith('x') ? 'z' : 'x')),
          p.x, p.z, 'wall')) break;
      }
      continue;
    }
    const lane = lanes[li++ % lanes.length];
    for(let attempt = 0; attempt < 5; attempt++){
      const x = lane.x !== undefined ? lane.x : cx + jit(w * 0.3);
      const z = lane.z !== undefined ? lane.z : cz + jit(d * 0.3);
      if(put((px, pz) => make(px, pz, lane.wall === 'x' ? 'z' : 'x'), x, z)) break;
    }
  }
  const recipe = RECIPES[kind] ?? RECIPES.lab;
  for(const name of recipe){
    const lane = lanes[li++ % lanes.length];
    const make = MAKERS[name];
    if(!make) continue;
    // Spread along the lane rather than stacking at its middle.
    for(let attempt = 0; attempt < 4; attempt++){
      const x = lane.x !== undefined ? lane.x : cx + jit(w * 0.32);
      const z = lane.z !== undefined ? lane.z : cz + jit(d * 0.32);
      if(put((px, pz) => make(px, pz, lane.along), x, z)) break;
    }
  }

  // Wall furniture, on whichever walls have room. These are what a bare room is
  // actually missing: the count says three pieces, the eye says nobody works here.
  // Wall furniture, which is what a bare room is actually missing: the count says
  // three pieces and the eye says nobody works here. Each is tried at several
  // positions along its wall rather than one, so a busy wall does not lose it.
  // Overhead, which nothing on the floor can collide with — placed last so it
  // never uses up a floor position.
  if(d > 4) { cableTray(cx, cz, 'z', Math.min(5, d * 0.6)); placed++; }

  // Still short: walk each wall at the separation distance and place along it,
  // rather than trying random spots and being refused. A random filler could not
  // reach the bar in the smaller rooms — four of Quantum's thirteen came up short
  // on geometry alone — and a systematic sweep does, because it tries every
  // position the room actually has rather than a dozen guesses.
  const fillers = [crate, bin, stool, trolley, cabinet, shelfUnit];
  let fi = 0;
  // Two rings: against the wall, then one piece-depth in, which is how a real
  // store room fills up.
  for(const ring of [inset, inset + 1.35]){
    if(placed >= target) break;
    for(const wallName of ['xLo', 'xHi', 'zLo', 'zHi']){
      if(placed >= target) break;
      const runLen = wallName.startsWith('x') ? d : w;
      const steps = Math.max(1, Math.floor((runLen - 1.4) / FLOOR_SEP));
      for(let k = 0; k <= steps; k++){
        if(placed >= target) break;
        // Floor furniture belongs on the floor rectangle, which is inset from the
        // walls on purpose — only the signage uses the wall planes.
        const t = steps ? k / steps : 0.5;
        const p = wallName === 'xLo' ? { x: xLo, z: zLo + 0.8 + t * (d - 1.6) }
          : wallName === 'xHi' ? { x: xHi, z: zLo + 0.8 + t * (d - 1.6) }
          : wallName === 'zLo' ? { x: xLo + 0.8 + t * (w - 1.6), z: zLo }
          : { x: xLo + 0.8 + t * (w - 1.6), z: zHi };
        const ox = wallName === 'xLo' ? ring : wallName === 'xHi' ? -ring : 0;
        const oz = wallName === 'zLo' ? ring : wallName === 'zHi' ? -ring : 0;
        put(fillers[fi++ % fillers.length], p.x + ox, p.z + oz);
      }
    }
  }
  return placed;
}

/**
 * Furnish a corridor.
 *
 * A corridor is not a room and gets a different vocabulary: nothing may block the
 * middle, everything is against a wall or overhead, and the pieces are the ones
 * that accumulate in a working building — trolleys parked where they should not
 * be, a notice board, a fire point, cable tray overhead, the recycling nobody has
 * moved.
 */
export function furnishCorridor(spec){
  const { box, mats: M, halfWidth, z0, z1, seed = 'spine', hard = () => {},
    every = 6, keepClear = [] } = spec;
  /**
   * Is there wall on this side at this point?
   *
   * A corridor is not two continuous walls. Every room off it has a doorway, and a
   * room open to the corridor has no wall at all across its whole length — so a
   * board hung at a fixed spacing, alternating sides, ends up in mid-air wherever
   * the alternation lands on an opening. The caller knows its own plan; this asks.
   */
  const wallOk = spec.wallOk ?? (() => true);
  const rand = rng(seed);
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const clear = (z) => !keepClear.some(k => Math.abs(k.z - z) < (k.r ?? 1.2));
  let placed = 0;
  let ci = 0;
  // The wall's own visible face.
  //
  // `interiorSite` builds a wall *centred* on the line it is given, so the surface
  // the player sees is half its thickness inside that. Hanging boards 40 mm in from
  // the centre line put every one of them inside an 180 mm wall: they were in the
  // scene, correctly positioned, facing the right way, and completely invisible.
  const wallT = spec.wallThickness ?? 0.18;
  const wallX = halfWidth - wallT / 2 - 0.03;
  // Fittings still stand off the wall; only the boards sit on it.
  const fitX = halfWidth - 0.35;
  // What a working building has in its corridor. Generic on purpose: a theme that
  // wants its own passes `signs`.
  const CORRIDOR_SIGNS = spec.signs ?? [
    { tag: 'FIRE', heading: 'On hearing the alarm', accent: '#b5502f',
      body: 'Nearest exit, assembly point at the gate. Do not stop to collect anything.' },
    { tag: 'THIS WEEK', heading: 'Who is on shift', accent: '#3f6f8f',
      body: 'Posted Monday. Swaps go through the group lead, in writing, before the day starts.' },
    { tag: 'PERMIT', heading: 'Work on live equipment', accent: '#8a6a1e',
      body: 'No cover comes off without a permit on the board and a second person present.' },
    { tag: 'REMINDER', heading: 'Log it as you go', accent: '#5b6a72',
      body: 'A measurement nobody wrote down is a measurement nobody can use on Friday.' },
    { tag: 'FIRST AID', heading: 'Trained staff', accent: '#1f8a4c',
      body: 'Names and extensions on the board. The kit is by the sign-in desk.' },
  ];

  // Overhead: tray runs the length of it, in sections so it reads as installed.
  // `tray: false` for a corridor with nothing over it — a tray hung from a
  // ceiling that is not there reads as a beam, which is the thing the open
  // soffit was removed to get rid of.
  for(let z = (spec.tray === false ? z1 : z0 + 3); z < z1 - 3; z += 8){
    box(0.3, 0.07, 7.4, wallX - 0.15, 2.55, z + 3.7, M.metal);
    box(0.07, 0.34, 0.07, wallX - 0.15, 2.72, z + 0.4, M.metal);
    placed += 1;
  }
  // ---- boards first, at a fixed spacing
  //
  // The fittings loop below picks one of six things at random, so a corridor got a
  // board roughly every thirty metres and read as a hospital that had just opened.
  // Signage is its own pass now: a board every `signEvery` metres, alternating
  // sides, skipping the doorways.
  // Each side walked separately, rather than one walk alternating between them.
  // Alternating meant a board every 6.4 m per side instead of every 3.2, and any
  // position refused for a doorway flipped the side as well as losing the board —
  // so a ten-metre solid run opposite a row of doors could come out completely
  // bare, which is what the north end of the spine looked like. The two sides are
  // offset by half a spacing so the boards do not stand in facing pairs.
  const signEvery = spec.signEvery ?? 3.2;
  for(const sside of [-1, 1]){
    for(let z = z0 + 3 + (sside > 0 ? signEvery / 2 : 0); z < z1 - 2; z += signEvery){
      if(!clear(z)) continue;
      // Pick the width first, then check the wall is solid across the whole of it.
      const wide = ci % 3 === 0 ? 1.25 : 0.85;
      if(![-wide / 2 - 0.1, 0, wide / 2 + 0.1].every(t => wallOk(sside * wallX, z + t))) continue;
      wordedSign({ box, mats: M, x: sside * wallX, z,
        y: 1.5 + rand() * 0.3, faceX: true, toward: -sside,
        text: CORRIDOR_SIGNS[ci++ % CORRIDOR_SIGNS.length], wide });
      placed++;
    }
  }

  // Along the walls, alternating sides, skipping doorways.
  let side = 1;
  for(let z = z0 + 4; z < z1 - 2; z += every){
    if(!clear(z)){ side *= -1; continue; }
    if(!wallOk(side * wallX, z)) side *= -1;
    if(!wallOk(side * wallX, z)) continue;
    const x = side * fitX;
    switch(pick(['notice', 'fire', 'bench', 'trolley', 'recycling', 'hydrant'])){
      case 'notice':
        // A pinboard with nothing pinned to it yet — the boards themselves are
        // placed by the pass above.
        box(0.04, 0.85, 1.2, x, 1.5, z, M.pale);
        box(0.05, 0.91, 1.26, x, 1.5, z, M.dark);
        break;
      case 'fire':
        // Standing on the floor with a sign above it, rather than hovering at
        // waist height with nothing underneath.
        box(0.16, 0.06, 0.16, x - side * 0.12, 0.03, z, M.dark);
        box(0.14, 0.52, 0.14, x - side * 0.12, 0.32, z, M.accent);
        box(0.06, 0.12, 0.06, x - side * 0.12, 0.64, z, M.dark);
        box(0.03, 0.24, 0.18, x, 1.9, z, M.accent);
        break;
      case 'bench':
        box(0.42, 0.06, 1.6, x - side * 0.12, 0.45, z, M.surface);
        for(const sz of [-1, 1]) box(0.05, 0.43, 0.05, x - side * 0.12, 0.22, z + sz * 0.65, M.metal);
        hard(x, z, 0.5, 1.7, 0.5);
        break;
      case 'trolley':
        // With uprights. Two shelves and a box on top, and nothing holding any of
        // it off the ground, was three things hanging in the air.
        box(0.46, 0.04, 0.72, x - side * 0.3, 0.8, z, M.metal);
        box(0.46, 0.04, 0.72, x - side * 0.3, 0.4, z, M.metal);
        for(const sx of [-1, 1]) for(const sz of [-1, 1]){
          box(0.04, 0.82, 0.04, x - side * 0.3 + sx * 0.2, 0.41, z + sz * 0.32, M.metal);
        }
        box(0.3, 0.2, 0.4, x - side * 0.3, 0.92, z, pick([M.pale, M.accent]));
        hard(x - side * 0.3, z, 0.55, 0.85, 0.9);
        break;
      case 'recycling':
        for(let i = 0; i < 2; i++){
          box(0.4, 0.7, 0.4, x - side * 0.28, 0.35, z + i * 0.5 - 0.25, pick([M.dark, M.accent]));
        }
        hard(x - side * 0.28, z, 0.5, 1.2, 0.7);
        break;
      default:
        box(0.16, 0.7, 0.16, x - side * 0.08, 0.35, z, M.accent);
        break;
    }
    placed++;
    side *= -1;
  }
  return placed;
}

/**
 * Materials good enough to furnish with, from whatever the caller already has.
 *
 * Both builders make their own palette and neither makes all six of these, so
 * this fills the gaps rather than making a room's furniture the one thing in it
 * that does not match.
 */
/**
 * Where the spine wall on one side of a corridor is actually solid.
 *
 * A corridor is not two continuous walls. Every closed room has a doorway cut out
 * of the middle of its spine face, and a room marked `open` has no spine face at
 * all beyond a nib at each end — so anything hung at a fixed spacing, or painted
 * as one long panel per side, lands in mid-air wherever it meets an opening.
 * These are the same numbers `interiorSite.partition()` cuts the walls with, read
 * back off the plan.
 *
 * **Why this is here rather than in a theme.** It was written once for Quantum,
 * and every interior theme after it needs the identical forty lines: the spans,
 * the per-room `wallOk`, and the mural slicing that goes with them. Nine copies of
 * that is house rule 1 in a new directory, and the copies would drift the first
 * time either half was corrected — which is exactly what happened to the sliced
 * mural's mirror, wrong on the one wall nobody had put a legible drawing on.
 */
export function spineSolidSpans(plan, P, side){
  const out = [];
  const NIB = 0.9;
  for(const r of (plan?.rooms ?? []).filter(x => x.side === side)){
    const cz = (r.z0 + r.z1) / 2;
    if(r.open){
      out.push({ z0: r.z0, z1: r.z0 + NIB });
      out.push({ z0: r.z1 - NIB, z1: r.z1 });
    } else {
      const dw = r.door === 'wide' ? P.doorWideW : P.doorW;
      out.push({ z0: r.z0, z1: cz - dw / 2 - 0.06 });
      out.push({ z0: cz + dw / 2 + 0.06, z1: r.z1 });
    }
  }
  // Anything under a metre is a stub of wall, not somewhere to hang or paint.
  return out.filter(sp => sp.z1 - sp.z0 > 1.0);
}

/** Is the corridor's spine wall solid on this side, at this z? */
export function spineWallOk(plan, P, x, z){
  return spineSolidSpans(plan, P, x < 0 ? 'w' : 'e')
    .some(sp => z > sp.z0 + 0.35 && z < sp.z1 - 0.35);
}

/**
 * Is there wall behind this point, inside one room?
 *
 * Three holes, all of which a notice has hung in: the spine face's doorway (or an
 * open room's whole spine face), and either end of a room that nothing adjoins —
 * a gap between two rooms on the same side has no cross-wall, and boards hung on
 * it stood in the gap.
 */
export function roomWallOk(room, bounds, plan, P){
  const mine = (plan?.rooms ?? []).filter(r2 => r2.side === room.side);
  const last = mine[mine.length - 1];
  const crossAt = (zz) => mine.some(r2 => Math.abs(r2.z0 - zz) < 0.06)
    || (last && Math.abs(last.z1 - zz) < 0.06);
  return (x, z) => {
    if(Math.abs(z - room.z0) < 0.4 && !crossAt(room.z0)) return false;
    if(Math.abs(z - room.z1) < 0.4 && !crossAt(room.z1)) return false;
    const onSpine = Math.abs(x - bounds.xInner) < 0.4;
    if(!onSpine) return true;
    const NIB = 0.9;
    if(room.open) return z < room.z0 + NIB || z > room.z1 - NIB;
    const dw = room.door === 'wide' ? P.doorWideW : P.doorW;
    return Math.abs(z - bounds.cz) > dw / 2 + 0.2;
  };
}

/**
 * Paint one drawing along whichever parts of one side of a corridor are wall.
 *
 * Two things here are load-bearing and both are invisible when wrong.
 *
 * **Proud of the face, not of the line.** `interiorSite` raises a wall *centred*
 * on the corridor half-width, so with 0.18 m of plaster the surface the player
 * sees is 0.09 m inside that line. Painting 0.06 in from the line put the panel a
 * centimetre off the plaster: it rendered, it faced the right way, and it could
 * not be seen from the corridor.
 *
 * **The slices are numbered against the mirror.** `paintMural`'s `t0`/`t1` carve
 * one drawing across a run of panels. A face on a wall whose normal points −x is
 * rotated a half turn, so its texture's u axis runs *against* +z — which means one
 * of a corridor's two sides has to be handed its slices reversed. Every panel is
 * correct on its own either way and the run jumps two slices at every joint, so
 * nothing catches it until the drawing has a legible order: a run of colour looks
 * fine backwards, a chain of numbered stations does not.
 */
export function paintAlongWall({ box, plan, P, side, run, ...opts }){
  const sign = side === 'w' ? -1 : 1;
  const sp = run ?? plan.spine ?? { z0: 0, z1: 1 };
  const wallX = P.corridorHalfWidth - P.wall / 2 - 0.04;
  const t = (z) => (z - sp.z0) / ((sp.z1 - sp.z0) || 1);
  const made = [];
  for(const span of spineSolidSpans(plan, P, side)){
    const len = span.z1 - span.z0 - 0.5;
    const parts = Math.max(1, Math.round(len / 7));
    for(let i = 0; i < parts; i++){
      const w = len / parts;
      const cz = span.z0 + 0.25 + (i + 0.5) * w;
      const a = t(cz - w / 2), b = t(cz + w / 2);
      // Looking across the corridor at the east wall the viewer's right hand is
      // +z; at the west wall it is −z. One of the two runs is therefore reversed.
      const [t0, t1] = side === 'e' ? [a, b] : [1 - b, 1 - a];
      made.push(paintMural({
        box, x: sign * wallX, z: cz, faceX: true, toward: -sign,
        w: w - 0.12, t0, t1, seed: `${side}-${Math.round(cz)}`, ...opts,
      }));
    }
  }
  return made;
}

export function furnishingMaterials(existing = {}){
  const std = (colour, roughness = 0.8, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color: colour, roughness, metalness });
  return {
    surface: existing.surface ?? std(0xb9ad96, 0.75),
    metal:   existing.metal   ?? std(0x9aa3ab, 0.45, 0.35),
    dark:    existing.dark    ?? std(0x4c545c, 0.7),
    pale:    existing.pale    ?? std(0xd8dbdd, 0.85),
    accent:  existing.accent  ?? std(0xb5502f, 0.7),
    glass:   existing.glass   ?? new THREE.MeshStandardMaterial({
      color: 0xa8c4cc, roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.5 }),
  };
}

/**
 * Fit out an area from an explicit vocabulary.
 *
 * `furnishRoom` knows about rooms in buildings — walls, a doorway, notice boards.
 * A submarine compartment and a mission-control tier are neither, and forcing them
 * through it would put a whiteboard and a coat rail in a pressure hull. This is the
 * same placement discipline — keep pieces apart, respect what is already there,
 * count what went down — with the caller supplying what the pieces are.
 *
 *   makers   { name: (x, z, axis) => void }  the caller's own shapes
 *   order    [name, …]                        which to place, cycled until full
 *   bounds   { x0, x1, z0, z1 }
 *   target   how many pieces
 *
 * Returns how many it managed, which is usually the target and is less when the
 * area genuinely has no room for more.
 */
export function furnishArea({ makers, order, bounds: B, target = 15, seed = 'area',
  keepClear = [], sep = 1.4 }){
  const rand = rng(seed);
  const xLo = Math.min(B.x0, B.x1), xHi = Math.max(B.x0, B.x1);
  const zLo = Math.min(B.z0, B.z1), zHi = Math.max(B.z0, B.z1);
  const taken = [];
  let placed = 0;
  const put = (fn, x, z, axis) => {
    if(keepClear.some(k => Math.hypot(k.x - x, k.z - z) < (k.r ?? 1))) return false;
    if(taken.some(t => Math.hypot(t.x - x, t.z - z) < sep)) return false;
    fn(x, z, axis);
    taken.push({ x, z });
    placed++;
    return true;
  };
  // Down both sides first, which is where fittings live in any working space,
  // then whatever is left over in the middle.
  const lanes = [
    { x: xLo, axis: 'z' }, { x: xHi, axis: 'z' },
    { x: (xLo + xHi) / 2, axis: 'z' },
  ];
  const run = zHi - zLo;
  const steps = Math.max(1, Math.floor(run / sep));
  let oi = 0;
  for(const lane of lanes){
    for(let k = 0; k <= steps && placed < target; k++){
      const z = zLo + (k + 0.5) * (run / (steps + 1));
      const name = order[oi++ % order.length];
      const make = makers[name];
      if(make) put(make, lane.x, z, lane.axis);
    }
    if(placed >= target) break;
  }
  // Still short: jitter into the gaps rather than giving up on the count.
  let guard = 0;
  while(placed < target && guard++ < 200){
    const name = order[oi++ % order.length];
    const make = makers[name];
    if(!make) continue;
    put(make, xLo + rand() * (xHi - xLo), zLo + rand() * run, 'z');
  }
  return placed;
}

/**
 * A mural: paint on a wall, not a notice on a wall.
 *
 * The difference is not size, it is contrast and framing. A notice is high
 * contrast, framed, and asks to be read; a mural is low contrast, unframed, and is
 * meant to be seen and not read — background that happens to be correct. The
 * Reading Room gets one that says nothing at all, which is the point of it.
 *
 * `kind` is what is painted:
 *   gradient  a band of colour, warm to cold, along a corridor
 *   bloch     a Bloch sphere, correct up close, decoration at a distance
 *   spectrum  a response curve as a long thin line, its peak where it falls
 *   lattice   a chip layout at enormous scale, faint enough to be a texture
 *   wash      nothing. One quiet field of colour.
 */
export function paintMural({ box, x, y = 1.9, z, faceX, toward = -1, w = 3, h = 2,
  kind = 'wash', ink = '#5b6a72', paper = '#e8ecee', soft = '#6b747c', seed = 'mural',
  // Wording, for the kinds that carry any.
  text = {},
  // Which slice of a longer run this panel is, 0 to 1. A mural painted in
  // sections along a corridor has to carry its part of the whole: without this
  // every section ran the full gradient and the wall read as five paintings.
  t0 = 0, t1 = 1 }){
  const px = 1024, py = Math.max(128, Math.round((px * h) / w));
  const canvas = document.createElement('canvas');
  canvas.width = px; canvas.height = py;
  const g = canvas.getContext('2d');
  const rand = rng(seed);

  g.fillStyle = paper; g.fillRect(0, 0, px, py);
  if(kind === 'gradient'){
    // The whole run's colours, sampled across this panel's own slice of it.
    const STOPS = [[0, [200, 162, 74]], [0.5, [127, 150, 166]], [1, [93, 127, 154]]];
    const at = (t) => {
      let a = STOPS[0], b = STOPS[STOPS.length - 1];
      for(let i = 0; i < STOPS.length - 1; i++){
        if(t >= STOPS[i][0] && t <= STOPS[i + 1][0]){ a = STOPS[i]; b = STOPS[i + 1]; break; }
      }
      const u = (t - a[0]) / ((b[0] - a[0]) || 1);
      return a[1].map((c, i) => Math.round(c + (b[1][i] - c) * u));
    };
    const grad = g.createLinearGradient(0, 0, px, 0);
    for(let i = 0; i <= 8; i++){
      const [r0, g0, b0] = at(t0 + (t1 - t0) * (i / 8));
      grad.addColorStop(i / 8, `rgb(${r0},${g0},${b0})`);
    }
    g.fillStyle = grad;
    g.fillRect(0, py * 0.28, px, py * 0.44);
  } else if(kind === 'bloch'){
    const cx = px / 2, cy = py / 2, r = Math.min(px, py) * 0.38;
    g.strokeStyle = ink; g.lineWidth = Math.max(2, r * 0.012);
    g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
    // The equator, seen edge-on from slightly above.
    g.beginPath(); g.ellipse(cx, cy, r, r * 0.28, 0, 0, Math.PI * 2); g.stroke();
    // Axes, and one state vector, because a Bloch sphere without one is a ball.
    g.beginPath();
    g.moveTo(cx, cy - r * 1.1); g.lineTo(cx, cy + r * 1.1);
    g.moveTo(cx - r * 1.1, cy); g.lineTo(cx + r * 1.1, cy);
    g.stroke();
    g.strokeStyle = '#b5502f'; g.lineWidth = Math.max(3, r * 0.02);
    g.beginPath(); g.moveTo(cx, cy);
    g.lineTo(cx + r * 0.62, cy - r * 0.56); g.stroke();
  } else if(kind === 'spectrum'){
    // A long thin trace with one strong peak and one weak feature, which is the
    // shape of this building's own first measurement.
    g.strokeStyle = ink; g.lineWidth = Math.max(2, py * 0.035);
    g.beginPath();
    for(let i = 0; i <= px; i++){
      const t = i / px;
      const peak = Math.exp(-((t - 0.42) ** 2) / 0.00022);
      const weak = 0.17 * Math.exp(-((t - 0.36) ** 2) / 0.00012);
      const v = 0.06 + peak + weak;
      const yy = py * (0.86 - Math.min(1, v) * 0.72);
      if(i === 0) g.moveTo(i, yy); else g.lineTo(i, yy);
    }
    g.stroke();
  } else if(kind === 'lattice'){
    g.strokeStyle = ink; g.globalAlpha = 0.34; g.lineWidth = 2;
    const cell = px / 26;
    for(let i = 0; i <= 26; i++){
      g.beginPath(); g.moveTo(i * cell, 0); g.lineTo(i * cell, py); g.stroke();
      g.beginPath(); g.moveTo(0, i * cell); g.lineTo(px, i * cell); g.stroke();
    }
    // A dozen pads, where a chip has them.
    g.globalAlpha = 0.5; g.fillStyle = ink;
    for(let i = 0; i < 12; i++){
      g.fillRect(cell * (2 + Math.floor(rand() * 22)), cell * (1 + Math.floor(rand() * 8)),
        cell * 1.6, cell * 1.6);
    }
    g.globalAlpha = 1;
  } else if(kind === 'seal'){
    // An institutional seal: a disc, an orbit, a chevron and a ring of stars, with
    // the room's own name curved around it. Deliberately this building's mark and
    // not a real agency's — the mission, the cast and the centre are invented, and
    // borrowing a real insignia would put a real organisation behind a made-up
    // flight.
    const cx2 = px / 2, cy2 = py / 2, r = Math.min(px, py) * 0.46;
    g.fillStyle = '#12325e';
    g.beginPath(); g.arc(cx2, cy2, r, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#dfe4ea'; g.lineWidth = r * 0.035;
    g.beginPath(); g.arc(cx2, cy2, r * 0.93, 0, Math.PI * 2); g.stroke();

    // Stars scattered across the field, thicker toward the bottom.
    g.fillStyle = '#ffffff';
    for(let i = 0; i < 60; i++){
      const a = rand() * Math.PI * 2, rr = Math.sqrt(rand()) * r * 0.85;
      const sxx = cx2 + Math.cos(a) * rr, syy = cy2 + Math.sin(a) * rr;
      const sr = r * (0.006 + rand() * 0.012);
      g.beginPath(); g.arc(sxx, syy, sr, 0, Math.PI * 2); g.fill();
    }

    // The orbit: an ellipse across the disc, and a spacecraft on it.
    g.strokeStyle = '#ffffff'; g.lineWidth = r * 0.045;
    g.save();
    g.translate(cx2, cy2); g.rotate(-0.42);
    g.beginPath(); g.ellipse(0, 0, r * 0.78, r * 0.3, 0, 0, Math.PI * 2); g.stroke();
    g.fillStyle = '#dfe4ea';
    g.beginPath(); g.arc(r * 0.78, 0, r * 0.055, 0, Math.PI * 2); g.fill();
    g.restore();

    // The chevron, sweeping up to the right.
    g.fillStyle = '#c3452f';
    g.save();
    g.translate(cx2, cy2);
    g.beginPath();
    g.moveTo(-r * 0.72, r * 0.18);
    g.lineTo(r * 0.30, -r * 0.46);
    g.lineTo(r * 0.62, -r * 0.30);
    g.lineTo(-r * 0.60, r * 0.40);
    g.closePath(); g.fill();
    g.restore();

    // The name, curved around the top; the division, straight across the bottom.
    const arcText = (str, radius, y0deg, size) => {
      g.save();
      g.translate(cx2, cy2);
      g.fillStyle = '#ffffff';
      g.font = `800 ${Math.round(size)}px Inter, Helvetica, Arial, sans-serif`;
      g.textAlign = 'center'; g.textBaseline = 'middle';
      const chars = [...str];
      const per = (size * 0.62) / radius;              // radians per character
      let a = y0deg - (per * (chars.length - 1)) / 2;
      for(const ch of chars){
        g.save();
        g.translate(Math.cos(a) * radius, Math.sin(a) * radius);
        g.rotate(a + Math.PI / 2);
        g.fillText(ch, 0, 0);
        g.restore();
        a += per;
      }
      g.restore();
      g.textAlign = 'left'; g.textBaseline = 'top';
    };
    arcText(String(text.heading ?? 'MISSION CONTROL CENTER'), r * 0.80, -Math.PI / 2, r * 0.115);
    g.fillStyle = '#ffffff';
    g.font = `700 ${Math.round(r * 0.095)}px Inter, Helvetica, Arial, sans-serif`;
    g.textAlign = 'center';
    g.fillText(String(text.body ?? 'FLIGHT OPERATIONS'), cx2, cy2 + r * 0.70);
    g.textAlign = 'left';
  } else if(kind === 'rocket'){
    // A launch vehicle in elevation, drawn as the engineering wall graphic a place
    // like this would actually have: stages, engines, callouts with leader lines, a
    // station scale along the bottom and a person at the foot of it for scale.
    //
    // The whole vehicle is laid out in one virtual canvas `FULL` wide and each panel
    // draws its own slice of it, so a mural split across twelve boards is one
    // continuous drawing rather than twelve small ones.
    const FULL = px / Math.max(0.0001, (t1 - t0));
    g.save();
    g.translate(-t0 * FULL, 0);
    const L = FULL * 0.94, X0 = FULL * 0.03;       // the vehicle, nose to the right
    const axis = py * 0.44;
    // Not to scale — a 110 m vehicle across 46 m of wall would be four metres in
    // diameter and would not fit the corridor. This is a schematic elevation, drawn
    // as large as the wall allows so it reads from the far end of the leg.
    const R = py * 0.23;                            // body radius
    const line = Math.max(1.5, py * 0.006);
    g.lineWidth = line;
    g.strokeStyle = ink;
    const band = (x, w2, fill) => { g.fillStyle = fill; g.fillRect(x, axis - R, w2, R * 2); };

    // ---- stages, aft to nose
    const stages = [
      { n: 'FIRST STAGE', f: 0.00, t: 0.40, r: 1.00 },
      { n: 'INTERSTAGE', f: 0.40, t: 0.44, r: 0.94 },
      { n: 'SECOND STAGE', f: 0.44, t: 0.70, r: 1.00 },
      { n: 'THIRD STAGE', f: 0.70, t: 0.84, r: 0.86 },
      { n: 'INSTRUMENT UNIT', f: 0.84, t: 0.865, r: 0.86 },
      { n: 'ADAPTER', f: 0.865, t: 0.915, r: 0.72 },
      { n: 'SERVICE MODULE', f: 0.915, t: 0.955, r: 0.60 },
      { n: 'COMMAND MODULE', f: 0.955, t: 0.978, r: 0.52 },
    ];
    for(const st of stages){
      const x = X0 + L * st.f, w2 = L * (st.t - st.f), r = R * st.r;
      g.fillStyle = paper === '#fbfaf6' ? '#e9ecee' : '#d9d3c4';
      g.fillRect(x, axis - r, w2, r * 2);
      g.strokeRect(x, axis - r, w2, r * 2);
      // Panel seams down the length of every stage.
      g.globalAlpha = 0.35;
      for(let sx = x + w2 * 0.12; sx < x + w2 - 2; sx += Math.max(18, w2 * 0.09)){
        g.beginPath(); g.moveTo(sx, axis - r); g.lineTo(sx, axis + r); g.stroke();
      }
      g.globalAlpha = 1;
    }
    // Roll pattern on the first stage: the alternating quarters everybody knows.
    //
    // Sized off the body, not off the stage. Drawn from the stage *length* it
    // scaled with the whole forty-six metres of wall: each block came out 277 px
    // wide with a 739 px gap on a 1024 px panel, so every panel showed one
    // isolated black slab floating on a pale body and the wall read as having
    // holes punched in it. A roll pattern is paint, and paint meets the edges it
    // is painted up to.
    {
      const runX0 = X0 + L * 0.015, runX1 = X0 + L * 0.385;
      // Blocks about as wide as the body is deep, and edge to edge: the alternation
      // is the whole of what makes it read as roll rather than as rectangles.
      const blocks = Math.max(5, Math.round((runX1 - runX0) / (R * 2.1)));
      const bw = (runX1 - runX0) / blocks;
      g.fillStyle = ink;
      g.globalAlpha = 0.82;
      for(let i = 0; i < blocks; i++){
        // Stopping just short of the body edge leaves the outline reading as the
        // side of a vehicle rather than as the border of a black rectangle.
        g.fillRect(runX0 + i * bw, i % 2 ? axis : axis - R * 0.93, bw, R * 0.93);
      }
      g.globalAlpha = 1;
      // The body outline back over the top, so the paint sits inside the vehicle
      // instead of cutting its edge.
      g.strokeStyle = ink;
      g.strokeRect(X0, axis - R, L * 0.40, R * 2);
    }
    // ---- engines: five bells at the aft, one on the centreline
    for(const off of [-0.62, -0.31, 0, 0.31, 0.62]){
      const ey = axis + R * off, er = R * 0.26;
      g.fillStyle = paper === '#fbfaf6' ? '#c9ccd2' : '#b9b1a0';
      g.beginPath();
      g.moveTo(X0, ey - er * 0.55);
      g.lineTo(X0 - L * 0.035, ey - er);
      g.lineTo(X0 - L * 0.035, ey + er);
      g.lineTo(X0, ey + er * 0.55);
      g.closePath(); g.fill(); g.stroke();
    }
    // ---- fins at the base
    for(const sgn of [-1, 1]){
      g.fillStyle = ink; g.globalAlpha = 0.75;
      g.beginPath();
      g.moveTo(X0 + L * 0.02, axis + sgn * R);
      g.lineTo(X0 + L * 0.02, axis + sgn * R * 1.5);
      g.lineTo(X0 + L * 0.10, axis + sgn * R);
      g.closePath(); g.fill();
      g.globalAlpha = 1;
    }
    // ---- escape tower on the nose
    {
      const nx = X0 + L * 0.978, r = R * 0.52;
      g.fillStyle = paper === '#fbfaf6' ? '#e9ecee' : '#d9d3c4';
      g.beginPath();
      g.moveTo(nx, axis - r); g.lineTo(nx + L * 0.012, axis - r * 0.35);
      g.lineTo(nx + L * 0.012, axis + r * 0.35); g.lineTo(nx, axis + r);
      g.closePath(); g.fill(); g.stroke();
      g.beginPath();
      g.moveTo(nx + L * 0.012, axis - r * 0.12); g.lineTo(nx + L * 0.048, axis - r * 0.12);
      g.lineTo(nx + L * 0.048, axis + r * 0.12); g.lineTo(nx + L * 0.012, axis + r * 0.12);
      g.closePath(); g.fill(); g.stroke();
      for(const sgn of [-1, 1]){
        g.beginPath();
        g.moveTo(nx + L * 0.03, axis + sgn * r * 0.12);
        g.lineTo(nx + L * 0.022, axis + sgn * r * 0.5);
        g.stroke();
      }
    }
    // ---- conduit tunnel, the length of the stack
    g.globalAlpha = 0.5;
    g.beginPath();
    g.moveTo(X0 + L * 0.02, axis - R * 0.82); g.lineTo(X0 + L * 0.84, axis - R * 0.7);
    g.stroke();
    g.globalAlpha = 1;

    // ---- callouts, with leader lines
    g.font = `700 ${Math.round(py * 0.045)}px Inter, Helvetica, Arial, sans-serif`;
    g.fillStyle = ink;
    stages.forEach((st, i) => {
      const cx2 = X0 + L * (st.f + st.t) / 2;
      const up = i % 2 === 0;
      const ly = up ? axis - R * 1.25 : axis + R * 1.25;
      const ty = up ? ly - py * 0.03 : ly + py * 0.055;
      g.globalAlpha = 0.6;
      g.beginPath(); g.moveTo(cx2, axis + (up ? -R : R)); g.lineTo(cx2, ly); g.stroke();
      g.globalAlpha = 1;
      g.textAlign = 'center';
      g.fillText(st.n, cx2, ty);
    });
    g.textAlign = 'left';
    // A couple of engineering notes, because a wall graphic in this building would
    // carry numbers rather than just names.
    g.font = `400 ${Math.round(py * 0.038)}px Inter, Helvetica, Arial, sans-serif`;
    g.fillStyle = soft;
    g.fillText('FIVE ENGINES · GIMBALLED · CENTRE ENGINE FIXED', X0 + L * 0.04, axis + R * 1.75);
    g.fillText('SEPARATION PLANES MARKED ▲', X0 + L * 0.46, axis + R * 1.75);

    // ---- station scale along the bottom, and a person for scale
    const sy = py * 0.9;
    g.strokeStyle = soft; g.globalAlpha = 0.8;
    g.beginPath(); g.moveTo(X0, sy); g.lineTo(X0 + L, sy); g.stroke();
    for(let i = 0; i <= 20; i++){
      const sx = X0 + (L * i) / 20;
      g.beginPath(); g.moveTo(sx, sy); g.lineTo(sx, sy - py * (i % 5 === 0 ? 0.035 : 0.018)); g.stroke();
      if(i % 5 === 0){
        g.fillStyle = soft;
        g.font = `400 ${Math.round(py * 0.032)}px Inter, Helvetica, Arial, sans-serif`;
        g.fillText(`${i * 5} m`, sx + 4, sy - py * 0.045);
      }
    }
    g.globalAlpha = 1;
    // No figure for scale. It was drawn at the foot of the station rule and read as
    // a person standing in the drawing rather than as a scale mark — the numbers do
    // that job and do not need help.
    g.restore();
  } else if(kind === 'lightpath'){
    // The measurement chain, star to diagram, along the whole length of a corridor:
    // walking the leg walks one photon from a supernova to a point on the
    // distance-redshift plot. Same move as the launch vehicle in `rocket` — the
    // machine the building is about, drawn at the length of the hallway, sliced so
    // twelve boards are one drawing — and the reason it is a chain rather than an
    // instrument is the aspect. A leg of corridor is about thirteen times as long
    // as it is high, and a four-metre telescope in elevation is a squat object with
    // forty metres of blank wall beside it.
    //
    // Left to right: the event, the sky, the telescope, the instruments, the
    // frames, the light curve, the standardisation, the diagram. The optical half
    // is drawn as a section and the data half as panels on the same spine, which is
    // what a signal-flow wall in a working building looks like.
    const FULL = px / Math.max(0.0001, (t1 - t0));
    g.save();
    g.translate(-t0 * FULL, 0);
    const line = Math.max(1.5, py * 0.005);
    g.lineWidth = line;
    g.strokeStyle = ink;
    const at = (t) => FULL * t;            // a fraction of the whole run, in px
    const beam = py * 0.40;                // the optical axis, and then the spine
    const rail = py * 0.90;                // the numbered rail along the bottom
    // One generator for the whole run rather than the panel's own, so the twelve
    // boards draw the same scatter: every panel paints the entire drawing and
    // shows only its own slice, and a per-board seed would put a different set of
    // points in each window of one plot.
    const rnd = rng('lightpath');
    const H1 = `700 ${Math.round(py * 0.044)}px Inter, Helvetica, Arial, sans-serif`;
    const H2 = `400 ${Math.round(py * 0.034)}px Inter, Helvetica, Arial, sans-serif`;
    const path = (pts, close = false) => {
      g.beginPath();
      pts.forEach(([X, Y], i) => (i ? g.lineTo(X, Y) : g.moveTo(X, Y)));
      if(close) g.closePath();
    };
    const dot = (X, Y, r) => { g.beginPath(); g.arc(X, Y, r, 0, Math.PI * 2); g.fill(); };
    // A label with a leader line back to the thing it names. Above or below, so two
    // callouts on the same station do not sit on each other.
    const callout = (X, Y, up, text, sub) => {
      const ly = up ? Y - py * 0.16 : Y + py * 0.16;
      g.globalAlpha = 0.55; g.strokeStyle = soft;
      path([[X, Y], [X, ly]]); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;
      g.textAlign = 'center'; g.fillStyle = ink; g.font = H1;
      g.fillText(text, X, up ? ly - py * 0.02 : ly + py * 0.045);
      if(sub){
        g.fillStyle = soft; g.font = H2;
        g.fillText(sub, X, up ? ly + py * 0.025 : ly + py * 0.085);
      }
      g.textAlign = 'left';
    };

    // ---- 1. the event: a host galaxy, and one point in the outskirts of it
    {
      const cx2 = at(0.038), cy2 = beam, a = FULL * 0.026, b = py * 0.20;
      g.globalAlpha = 0.30; g.fillStyle = soft;
      for(let i = 0; i < 220; i++){
        // Two draws off the same generator per point, so the cloud is elliptical
        // rather than round and denser toward the middle.
        const u = rnd() * Math.PI * 2, v = rnd() ** 1.7;
        dot(cx2 + Math.cos(u) * a * v, cy2 + Math.sin(u) * b * v, py * 0.006);
      }
      g.globalAlpha = 0.5; g.strokeStyle = soft;
      const ring = [];
      for(let i = 0; i <= 48; i++){
        const th = (i / 48) * Math.PI * 2;
        ring.push([cx2 + Math.cos(th) * a * 1.05, cy2 + Math.sin(th) * b * 1.05]);
      }
      path(ring, true); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;
      // The supernova itself: off the nucleus, which is where they are found.
      const sx = cx2 + a * 0.62, sy = cy2 - b * 0.48;
      g.fillStyle = ink; dot(sx, sy, py * 0.017);
      for(const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){
        path([[sx + dx * py * 0.028, sy + dy * py * 0.028],
          [sx + dx * py * 0.055, sy + dy * py * 0.055]]);
        g.stroke();
      }
      callout(sx, sy, true, 'THE EVENT', 'type Ia · z = 0.55');
    }

    // ---- 3. the telescope, in section, under a dome with the shutter open
    //
    // Built before the sky is drawn, because where the beam arrives is a property
    // of where the aperture is: the first version ran the beam in at its own
    // height, the tube's top corners were fifty pixels below it, and the two rays
    // crossed outside the building.
    // Every number here is set against the dome, and the one that has to be
    // checked rather than eyeballed is that the tube stays inside the shell: the
    // first version put the top of the truss above the crown, so a four-metre
    // telescope was drawn sticking out through the roof of its own building.
    //   dome crown   drum − rD          = floor − 0.10·py − 0.30·py = floor − 0.40·py
    //   tube crown   axisY − cos·0.62·len ≈ floor − 0.19·py − 0.144·py
    // which clears the shell by about a twentieth of the height of the wall, with
    // the tilted corners spread a fifth of that either side.
    const dCx = at(0.276), rD = py * 0.30;
    const floor = rail - py * 0.05;
    const drum = floor - py * 0.10;
    const dCy = drum;                         // the dome springs off the drum
    const azY = floor - py * 0.014;
    const pierTop = azY - py * 0.075;
    const axisY = floor - py * 0.19;
    const lean = -0.30;                       // radians from vertical, toward the source
    const halfT = py * 0.065, len = py * 0.26;
    const ux = Math.sin(lean), uy = -Math.cos(lean);      // up the tube
    const nx = Math.cos(lean), ny = Math.sin(lean);       // across it
    const P = (alongT, across) => [dCx + ux * alongT + nx * across,
      axisY + uy * alongT + ny * across];
    const m1 = P(-len * 0.38, 0), m2 = P(len * 0.62, 0);
    // The two corners of the aperture, which is what the sky has to arrive at.
    const apA = P(len * 0.62, -halfT), apB = P(len * 0.62, halfT);
    {
      // The drum, then the dome shell over it with a slit left open toward the
      // source. Two arcs with a gap between them is the shutter, and the gap is on
      // the side the light comes from — the only orientation that is not a lie.
      g.globalAlpha = 0.9; g.fillStyle = paper === '#fbfaf6' ? '#e9ecee' : '#d9d3c4';
      g.fillRect(dCx - rD, drum, rD * 2, floor - drum);
      g.strokeRect(dCx - rD, drum, rD * 2, floor - drum);
      g.globalAlpha = 1;
      const slitA = Math.PI * 1.13, slitB = Math.PI * 1.37;
      g.beginPath(); g.arc(dCx, dCy, rD, Math.PI, slitA); g.stroke();
      g.beginPath(); g.arc(dCx, dCy, rD, slitB, Math.PI * 2); g.stroke();
      // The slit is drawn as the two edges of the opening rather than as leaves
      // stood off the shell: an arc floating outside the dome reads as two ticks
      // in mid-air, and the gap is what says the shutter is open.
      g.globalAlpha = 0.7; g.strokeStyle = soft;
      for(const a2 of [slitA, slitB]){
        path([[dCx + Math.cos(a2) * rD * 0.86, dCy + Math.sin(a2) * rD * 0.86],
          [dCx + Math.cos(a2) * rD, dCy + Math.sin(a2) * rD]]);
        g.stroke();
      }
      // The springing line, so the shell reads as sitting on the drum.
      path([[dCx - rD, drum], [dCx + rD, drum]]); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;

      // The mount: an azimuth track on the floor, a pier, and a fork carrying the
      // altitude axis the tube turns on.
      g.globalAlpha = 0.8; g.strokeStyle = soft;
      path([[dCx - rD * 0.66, azY], [dCx + rD * 0.66, azY]]); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;
      g.fillStyle = paper === '#fbfaf6' ? '#dfe3e6' : '#cdc6b6';
      g.fillRect(dCx - rD * 0.30, pierTop, rD * 0.60, azY - pierTop);
      g.strokeRect(dCx - rD * 0.30, pierTop, rD * 0.60, azY - pierTop);
      for(const s of [-1, 1]){
        path([[dCx + s * rD * 0.26, pierTop], [dCx + s * rD * 0.26, axisY]]);
        g.stroke();
        g.fillStyle = ink; dot(dCx + s * rD * 0.26, axisY, py * 0.010);
      }
      // The tube: a truss box on the altitude axis, leaning toward the slit.
      path([P(-len * 0.38, -halfT), P(len * 0.62, -halfT),
        P(len * 0.62, halfT), P(-len * 0.38, halfT)], true);
      g.fillStyle = paper === '#fbfaf6' ? '#f2f4f5' : '#e2dccd';
      g.fill(); g.stroke();
      g.globalAlpha = 0.35;
      for(let i = 1; i < 6; i++){
        const f = -0.38 + i * 0.1667;
        path([P(len * f, -halfT), P(len * (f + 0.1667), halfT)]); g.stroke();
      }
      g.globalAlpha = 1;
      // The primary as a concave line and the secondary as a small convex one.
      g.lineWidth = line * 2.4;
      const arcAt = (c, r, sweep) => {
        const pts = [];
        for(let i = 0; i <= 12; i++){
          const t2 = -sweep / 2 + (sweep * i) / 12;
          pts.push([c[0] + nx * r * Math.sin(t2) + ux * r * (1 - Math.cos(t2)),
            c[1] + ny * r * Math.sin(t2) + uy * r * (1 - Math.cos(t2))]);
        }
        return pts;
      };
      path(arcAt(m1, halfT * 1.9, 1.05)); g.stroke();
      path(arcAt(m2, -halfT * 0.85, 0.9)); g.stroke();
      g.lineWidth = line;
      // The light inside: down the tube at full aperture, up to the secondary, and
      // back through the hole in the primary to a focus under the mount. The two
      // rays cross at the secondary, which is what a converging beam does.
      const focus = P(-len * 0.74, 0);
      g.globalAlpha = 0.75; g.strokeStyle = soft;
      for(const s of [-1, 1]){
        path([P(len * 0.62, s * halfT * 0.86), P(-len * 0.36, s * halfT * 0.86), m2, focus]);
        g.stroke();
      }
      g.globalAlpha = 1; g.strokeStyle = ink;
      g.fillStyle = ink; dot(focus[0], focus[1], py * 0.011);
      // Out of the building at the height it left the focus, then up onto the spine
      // the data half of the drawing hangs on. Run straight from the focus to the
      // spine it cut diagonally across the shell and through the mirror's own
      // label.
      const outY = floor + py * 0.008;
      g.globalAlpha = 0.6; g.strokeStyle = soft;
      path([[focus[0], focus[1]], [focus[0], outY], [dCx + rD * 1.5, outY],
        [at(0.322), beam]]);
      g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;

      callout(dCx, dCy - rD, true, 'THE TELESCOPE', 'four metres · alt-azimuth');
      // Not a callout: a leader dropped to the rail would land on the station
      // names, and one raised would land on the dome. It goes out to the right of
      // the shell instead, where there is nothing.
      g.globalAlpha = 0.55; g.strokeStyle = soft;
      path([[m1[0], m1[1]], [dCx + rD * 1.06, drum - py * 0.05]]); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;
      g.font = H2; g.fillStyle = soft; g.textAlign = 'left';
      g.fillText('PRIMARY · THE COLLECTING AREA', dCx + rD * 1.10, drum - py * 0.04);
    }

    // ---- 2. the sky: the light arrives collimated, and the air is what blurs it
    {
      const x0 = at(0.052);
      g.globalAlpha = 0.7; g.strokeStyle = soft;
      for(const [X, Y] of [apA, apB]){ path([[x0, Y], [X, Y]]); g.stroke(); }
      g.globalAlpha = 1; g.strokeStyle = ink;
      // Bands of atmosphere across the beam, spread over the run rather than
      // bunched: what the air does to this measurement is the seeing, and it is the
      // only thing happening along five metres of wall.
      const top = Math.min(apA[1], apB[1]), bot = Math.max(apA[1], apB[1]);
      for(let i = 0; i < 4; i++){
        const bx = at(0.078 + i * 0.030);
        g.globalAlpha = 0.35; g.strokeStyle = soft;
        const wave = [];
        for(let k = 0; k <= 24; k++){
          const t2 = k / 24;
          wave.push([bx + Math.sin(t2 * 7 + i) * FULL * 0.0016,
            top - py * 0.11 + t2 * (bot - top + py * 0.22)]);
        }
        path(wave); g.stroke();
        g.globalAlpha = 1; g.strokeStyle = ink;
      }
      callout(at(0.123), bot, false, 'THE SKY', 'seeing 0.9″ · one clear night');
    }

    // ---- 4. the instruments, hung off the focus
    {
      const bx = at(0.372);
      const boxes = [
        { t: 0.352, w: 0.030, h: 0.17, n: 'IMAGER', s: 'two bands, every night' },
        { t: 0.398, w: 0.030, h: 0.17, n: 'SPECTROGRAPH', s: 'the redshift, once' },
      ];
      // The spine the data half of the drawing hangs on, from the focus rightward.
      g.globalAlpha = 0.6; g.strokeStyle = soft;
      path([[at(0.318), beam], [at(0.995), beam]]); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;
      boxes.forEach((b, i) => {
        const X = at(b.t), w2 = FULL * b.w, h2 = py * b.h;
        const Y = beam + (i ? py * 0.06 : -py * 0.06 - h2);
        g.fillStyle = paper === '#fbfaf6' ? '#eef1f2' : '#ded8c9';
        g.fillRect(X, Y, w2, h2); g.strokeRect(X, Y, w2, h2);
        g.globalAlpha = 0.6; g.strokeStyle = soft;
        path([[X + w2 / 2, beam], [X + w2 / 2, i ? Y : Y + h2]]); g.stroke();
        g.globalAlpha = 1; g.strokeStyle = ink;
        callout(X + w2 / 2, i ? Y + h2 : Y, !i, b.n, b.s);
      });
      void bx;
    }

    // ---- 5. the frames: two nights and the difference between them
    {
      const gx = at(0.482), cw = FULL * 0.017, gap = FULL * 0.004;
      const rowY2 = [beam - py * 0.13, beam + py * 0.02];
      for(let r = 0; r < 2; r++){
        for(let c = 0; c < 3; c++){
          const X = gx + c * (cw + gap), Y = rowY2[r], h2 = py * 0.11;
          g.fillStyle = paper === '#fbfaf6' ? '#20242a' : '#2a2620';
          g.fillRect(X, Y, cw, h2);
          g.globalAlpha = 0.5; g.strokeStyle = soft; g.strokeRect(X, Y, cw, h2);
          g.globalAlpha = 1; g.strokeStyle = ink;
          g.fillStyle = paper;
          // The same field twice; the bottom-right frame is the subtraction and is
          // the only one with a source left in it.
          const stars = r === 1 && c === 2 ? 1 : 5;
          for(let k = 0; k < stars; k++){
            dot(X + cw * (0.2 + rnd() * 0.6), Y + h2 * (0.2 + rnd() * 0.6),
              py * (r === 1 && c === 2 ? 0.011 : 0.006));
          }
        }
      }
      callout(gx + (cw * 3 + gap * 2) / 2, rowY2[1] + py * 0.11, false,
        'SUBTRACTION', 'what was not there last month');
    }

    // ---- 6. the light curve, and the fifteen days that standardise it
    {
      const X0 = at(0.590), W = FULL * 0.075, Y0 = beam + py * 0.20, H = py * 0.30;
      g.globalAlpha = 0.7; g.strokeStyle = soft;
      path([[X0, Y0 - H], [X0, Y0], [X0 + W, Y0]]); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;
      const curve = (X, wid, hgt, broad) => {
        const pts = [];
        for(let i = 0; i <= 40; i++){
          const t2 = i / 40;
          // A fast rise and a slow decline, with `broad` stretching the decline.
          const v = t2 < 0.22 ? (t2 / 0.22) ** 2
            : Math.exp(-(((t2 - 0.22) / (0.30 * broad)) ** 1.1));
          pts.push([X + wid * t2, Y0 - hgt * v]);
        }
        return pts;
      };
      g.lineWidth = line * 1.8;
      path(curve(X0, W, H * 0.92, 1)); g.stroke();
      g.lineWidth = line;
      g.fillStyle = ink;
      for(const t2 of [0.10, 0.20, 0.26, 0.34, 0.46, 0.60, 0.78, 0.92]){
        const p = curve(X0, W, H * 0.92, 1)[Math.round(t2 * 40)];
        dot(p[0], p[1], py * 0.010);
      }
      // The bracket: peak, then fifteen days later, and the drop between them is
      // the one number the whole standardisation turns on.
      const pk = curve(X0, W, H * 0.92, 1)[9], fif = curve(X0, W, H * 0.92, 1)[22];
      g.globalAlpha = 0.6; g.strokeStyle = soft;
      path([[pk[0], pk[1]], [pk[0], pk[1] - py * 0.05]]); g.stroke();
      path([[fif[0], fif[1]], [fif[0], pk[1] - py * 0.05]]); g.stroke();
      path([[pk[0], pk[1] - py * 0.05], [fif[0], pk[1] - py * 0.05]]); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;
      callout((pk[0] + fif[0]) / 2, pk[1] - py * 0.05, true,
        'THE LIGHT CURVE', 'fifteen days after peak');
    }

    // ---- 7. the standardisation: broader is brighter, and the scatter closes
    {
      const X0 = at(0.700), W = FULL * 0.060, Y0 = beam + py * 0.20, H = py * 0.28;
      g.globalAlpha = 0.7; g.strokeStyle = soft;
      path([[X0, Y0 - H], [X0, Y0], [X0 + W, Y0]]); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;
      // Three declines, and the same three brought together — the correction is
      // the point, so both states are on the wall.
      for(const [broad, hgt, alpha] of [[1.35, 1.00, 0.85], [1.0, 0.86, 0.5], [0.72, 0.72, 0.5]]){
        const pts = [];
        for(let i = 0; i <= 32; i++){
          const t2 = i / 32;
          const v = t2 < 0.22 ? (t2 / 0.22) ** 2
            : Math.exp(-(((t2 - 0.22) / (0.30 * broad)) ** 1.1));
          pts.push([X0 + W * t2, Y0 - H * hgt * v]);
        }
        g.globalAlpha = alpha; path(pts); g.stroke(); g.globalAlpha = 1;
      }
      g.fillStyle = soft; g.font = H2;
      g.fillText('BROADER IS BRIGHTER', X0 + W * 0.06, Y0 - H - py * 0.03);
      callout(X0 + W * 0.5, Y0, false, 'STANDARDISED', 'one population, one ruler');
    }

    // ---- 8. the diagram: the points, and the two histories laid over them
    {
      const X0 = at(0.800), W = FULL * 0.170, Y0 = beam + py * 0.24, H = py * 0.34;
      g.globalAlpha = 0.7; g.strokeStyle = soft;
      path([[X0, Y0 - H], [X0, Y0], [X0 + W, Y0]]); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;
      const mag = (t2, lift) => Y0 - H * (0.12 + 0.74 * Math.sqrt(t2) + lift);
      // Matter only, dashed-looking because it is the prediction rather than the
      // fit; then the flat model with a repulsive term, which runs through the
      // points; then the points, sitting above the first by about a quarter of the
      // height of the box — which is the quarter magnitude the campaign found.
      for(const [lift, alpha] of [[0, 0.45], [0.12, 0.9]]){
        const pts = [];
        for(let i = 0; i <= 40; i++) pts.push([X0 + (W * i) / 40, mag(i / 40, lift)]);
        g.globalAlpha = alpha; path(pts); g.stroke(); g.globalAlpha = 1;
      }
      g.fillStyle = ink;
      for(let i = 0; i < 34; i++){
        const t2 = 0.03 + rnd() * 0.95;
        dot(X0 + W * t2, mag(t2, 0.12) + (rnd() - 0.5) * py * 0.035, py * 0.009);
      }
      g.fillStyle = soft; g.font = H2;
      g.fillText('MATTER ONLY', X0 + W * 0.70, mag(0.82, 0) + py * 0.05);
      g.fillText('FLAT, WITH A REPULSIVE TERM', X0 + W * 0.42, mag(0.60, 0.12) - py * 0.03);
      callout(X0 + W * 0.24, mag(0.24, 0.12), true,
        'THE DIAGRAM', 'about a quarter of a magnitude faint');
      g.fillStyle = soft; g.font = H2;
      g.textAlign = 'right';
      g.fillText('redshift →', X0 + W, Y0 + py * 0.055);
      g.textAlign = 'left';
    }

    // ---- the rail: what each station of the wall is, in the order you walk it
    {
      const STATIONS = [['1', 'THE EVENT', 0.038], ['2', 'THE SKY', 0.123],
        ['3', 'THE TELESCOPE', 0.268], ['4', 'THE INSTRUMENTS', 0.385],
        ['5', 'THE FRAMES', 0.503], ['6', 'THE LIGHT CURVE', 0.628],
        ['7', 'STANDARDISED', 0.730], ['8', 'THE DIAGRAM', 0.884]];
      g.globalAlpha = 0.8; g.strokeStyle = soft;
      path([[at(0.02), rail], [at(0.98), rail]]); g.stroke();
      g.font = H2; g.textAlign = 'center';
      for(const [n, name, t2] of STATIONS){
        const X = at(t2);
        path([[X, rail], [X, rail - py * 0.028]]); g.stroke();
        g.globalAlpha = 1; g.fillStyle = soft;
        g.fillText(`${n} · ${name}`, X, rail + py * 0.055);
        g.globalAlpha = 0.8;
      }
      g.globalAlpha = 1; g.textAlign = 'left'; g.strokeStyle = ink;
    }
    g.restore();
  } else if(kind === 'chain'){
    // A measurement chain along the length of a corridor, authored rather than
    // drawn: the caller names the stations and this draws the rail, the numbers,
    // the labels and one schematic glyph per station.
    //
    // WHY THIS EXISTS BESIDE `lightpath`. That one is a supernova survey's own
    // signal flow, drawn by hand — a dome in section, a spectrograph, a light
    // curve — and it is forty metres of one specific argument. Every discovery
    // game has a chain like it and none of them has the same chain, so the choice
    // was nine hand-drawn walls or one that takes its stations as data. The glyphs
    // are deliberately schematic: a corridor drawing is read at 1.4 m/s and a
    // recognisable silhouette carries further than a correct one.
    //
    // `text.stations` is [{ title, sub, glyph }]. Numbering is the index, because a
    // chain whose stations are numbered by hand goes wrong the first time one is
    // inserted. Slicing works exactly as it does for `lightpath`: every panel
    // paints the whole run and shows its own window of it, so a run of boards
    // reads as one drawing.
    const FULL = px / Math.max(0.0001, (t1 - t0));
    g.save();
    g.translate(-t0 * FULL, 0);
    const at = (t) => FULL * t;
    const line = Math.max(1.5, py * 0.006);
    const spine = py * 0.44;
    const rail = py * 0.88;
    const H1 = `700 ${Math.round(py * 0.05)}px Inter, Helvetica, Arial, sans-serif`;
    const H2 = `400 ${Math.round(py * 0.038)}px Inter, Helvetica, Arial, sans-serif`;
    const H3 = `400 ${Math.round(py * 0.034)}px Inter, Helvetica, Arial, sans-serif`;
    const path = (pts, close = false) => {
      g.beginPath();
      pts.forEach(([X, Y], i) => (i ? g.lineTo(X, Y) : g.moveTo(X, Y)));
      if(close) g.closePath();
    };
    const dot = (X, Y, r) => { g.beginPath(); g.arc(X, Y, r, 0, Math.PI * 2); g.fill(); };
    const rnd = rng('chain');

    const stations = (text.stations ?? []).filter(st => st && st.title);
    const n = stations.length;
    if(n){
      // Stations sit inset from both ends, so the first and last glyph are not
      // cut in half by the end of the wall.
      const t = (i) => 0.055 + (0.89 * (n === 1 ? 0.5 : i / (n - 1)));

      // The spine the whole chain hangs off, drawn first and under everything.
      g.globalAlpha = 0.5; g.strokeStyle = soft; g.lineWidth = line;
      path([[at(t(0)), spine], [at(t(n - 1)), spine]]); g.stroke();
      g.globalAlpha = 1;

      /** One schematic glyph, centred on (X, spine), about `r` across. */
      const glyph = (name, X, r) => {
        g.strokeStyle = ink; g.fillStyle = ink; g.lineWidth = line;
        switch(name){
          case 'flask': {
            path([[X - r * 0.22, spine - r], [X - r * 0.22, spine - r * 0.2],
              [X - r * 0.62, spine + r * 0.85], [X + r * 0.62, spine + r * 0.85],
              [X + r * 0.22, spine - r * 0.2], [X + r * 0.22, spine - r]], true);
            g.stroke();
            g.globalAlpha = 0.3;
            path([[X - r * 0.44, spine + r * 0.3], [X - r * 0.62, spine + r * 0.85],
              [X + r * 0.62, spine + r * 0.85], [X + r * 0.44, spine + r * 0.3]], true);
            g.fill(); g.globalAlpha = 1;
            break;
          }
          case 'column': {
            // A separation column: a tall tube with a band part way down it.
            path([[X - r * 0.3, spine - r], [X - r * 0.3, spine + r],
              [X + r * 0.3, spine + r], [X + r * 0.3, spine - r]], true);
            g.stroke();
            g.globalAlpha = 0.35;
            g.fillRect(X - r * 0.3, spine - r * 0.15, r * 0.6, r * 0.3);
            g.globalAlpha = 1;
            break;
          }
          case 'bars': {
            const bs = [0.95, 0.62, 0.95, 0.62];
            bs.forEach((v, i) => {
              const bw = (r * 1.5) / bs.length;
              const bx = X - r * 0.75 + i * bw;
              g.globalAlpha = 0.35;
              g.fillRect(bx + bw * 0.14, spine + r - r * 2 * v, bw * 0.72, r * 2 * v);
              g.globalAlpha = 1;
              g.strokeRect(bx + bw * 0.14, spine + r - r * 2 * v, bw * 0.72, r * 2 * v);
            });
            break;
          }
          case 'fibre': {
            // A drawn strand held between two clamps.
            for(const s of [-1, 1]) g.strokeRect(X - r * 0.85, spine + s * r * 0.7 - r * 0.1,
              r * 1.7, r * 0.2);
            g.beginPath();
            for(let i = 0; i <= 40; i++){
              const u = i / 40;
              const Y = spine - r * 0.62 + r * 1.24 * u;
              const dx = Math.sin(u * Math.PI * 3) * r * 0.14;
              i ? g.lineTo(X + dx, Y) : g.moveTo(X + dx, Y);
            }
            g.stroke();
            break;
          }
          case 'camera': {
            // A source, a collimator and a plate: the beam line, side on.
            g.beginPath(); g.arc(X - r * 0.85, spine, r * 0.22, 0, Math.PI * 2); g.stroke();
            path([[X - r * 0.6, spine], [X + r * 0.55, spine]]); g.stroke();
            g.strokeRect(X - r * 0.2, spine - r * 0.3, r * 0.12, r * 0.6);
            g.globalAlpha = 0.35;
            g.fillRect(X + r * 0.55, spine - r * 0.8, r * 0.28, r * 1.6);
            g.globalAlpha = 1;
            g.strokeRect(X + r * 0.55, spine - r * 0.8, r * 0.28, r * 1.6);
            break;
          }
          case 'plate': {
            // An exposed plate: a dark rectangle with an X of marks on it.
            g.globalAlpha = 0.5; g.fillStyle = ink;
            g.fillRect(X - r * 0.9, spine - r * 0.9, r * 1.8, r * 1.8);
            g.globalAlpha = 1; g.fillStyle = paper;
            for(const sx of [-1, 1]) for(let i = 1; i <= 4; i++){
              const u = i / 4.4;
              dot(X + sx * r * 0.78 * u, spine - r * 0.72 * u, py * 0.009);
              dot(X + sx * r * 0.78 * u, spine + r * 0.72 * u, py * 0.009);
            }
            g.fillStyle = ink;
            g.strokeRect(X - r * 0.9, spine - r * 0.9, r * 1.8, r * 1.8);
            break;
          }
          case 'ruler': {
            g.strokeRect(X - r * 0.95, spine - r * 0.28, r * 1.9, r * 0.56);
            for(let i = 1; i < 8; i++){
              const X2 = X - r * 0.95 + (r * 1.9 * i) / 8;
              path([[X2, spine + r * 0.28], [X2, spine + r * 0.28 - r * (i % 2 ? 0.2 : 0.36)]]);
              g.stroke();
            }
            break;
          }
          case 'spiral': {
            // Two strands winding, drawn as opposed sine curves with rungs.
            for(const s of [1, -1]){
              g.beginPath();
              for(let i = 0; i <= 48; i++){
                const u = i / 48;
                const Y = spine - r + r * 2 * u;
                const X2 = X + Math.sin(u * Math.PI * 2.4) * r * 0.5 * s;
                i ? g.lineTo(X2, Y) : g.moveTo(X2, Y);
              }
              g.stroke();
            }
            g.globalAlpha = 0.45;
            for(let i = 1; i < 10; i++){
              const u = i / 10;
              const Y = spine - r + r * 2 * u;
              const d = Math.sin(u * Math.PI * 2.4) * r * 0.5;
              path([[X - d, Y], [X + d, Y]]); g.stroke();
            }
            g.globalAlpha = 1;
            break;
          }
          case 'grid': {
            for(let i = 0; i <= 3; i++){
              path([[X - r * 0.9, spine - r * 0.9 + (r * 1.8 * i) / 3],
                [X + r * 0.9, spine - r * 0.9 + (r * 1.8 * i) / 3]]); g.stroke();
              path([[X - r * 0.9 + (r * 1.8 * i) / 3, spine - r * 0.9],
                [X - r * 0.9 + (r * 1.8 * i) / 3, spine + r * 0.9]]); g.stroke();
            }
            break;
          }
          case 'wave': {
            g.beginPath();
            for(let i = 0; i <= 64; i++){
              const u = i / 64;
              const env = Math.min(1, u * 2.4);
              const X2 = X - r + r * 2 * u;
              const Y = spine - Math.sin(u * Math.PI * 7) * r * 0.78 * env;
              i ? g.lineTo(X2, Y) : g.moveTo(X2, Y);
            }
            g.stroke();
            break;
          }
          case 'curve': {
            path([[X - r, spine + r * 0.85], [X - r, spine - r * 0.9]]); g.stroke();
            path([[X - r, spine + r * 0.85], [X + r, spine + r * 0.85]]); g.stroke();
            g.beginPath();
            for(let i = 0; i <= 40; i++){
              const u = i / 40;
              const X2 = X - r + r * 2 * u;
              const Y = spine + r * 0.85 - r * 1.6 * Math.exp(-((u - 0.28) ** 2) / 0.05);
              i ? g.lineTo(X2, Y) : g.moveTo(X2, Y);
            }
            g.stroke();
            break;
          }
          case 'points': {
            path([[X - r, spine + r * 0.85], [X - r, spine - r * 0.9]]); g.stroke();
            path([[X - r, spine + r * 0.85], [X + r, spine + r * 0.85]]); g.stroke();
            for(let i = 0; i < 11; i++){
              const u = (i + 0.5) / 11;
              const Y = spine + r * 0.7 - r * 1.35 * u + (rnd() - 0.5) * r * 0.3;
              dot(X - r + r * 2 * u, Y, py * 0.011);
            }
            break;
          }
          case 'dish': {
            g.beginPath();
            g.arc(X, spine + r * 0.5, r * 0.95, Math.PI * 1.15, Math.PI * 1.85);
            g.stroke();
            path([[X, spine - r * 0.42], [X, spine + r * 0.85]]); g.stroke();
            dot(X, spine - r * 0.42, py * 0.013);
            break;
          }
          case 'beam': {
            for(const s of [-1, 1]){
              path([[X + s * r * 0.95, spine - r * 0.55], [X + s * r * 0.2, spine],
                [X + s * r * 0.95, spine + r * 0.55]]);
              g.stroke();
            }
            dot(X, spine, py * 0.016);
            break;
          }
          case 'globe': {
            g.beginPath(); g.arc(X, spine, r * 0.88, 0, Math.PI * 2); g.stroke();
            g.beginPath(); g.ellipse(X, spine, r * 0.88, r * 0.3, 0, 0, Math.PI * 2); g.stroke();
            g.beginPath(); g.ellipse(X, spine, r * 0.34, r * 0.88, 0, 0, Math.PI * 2); g.stroke();
            break;
          }
          case 'box':
          default:
            g.strokeRect(X - r * 0.85, spine - r * 0.7, r * 1.7, r * 1.4);
            break;
        }
      };

      stations.forEach((st, i) => {
        const X = at(t(i));
        glyph(st.glyph ?? 'box', X, py * 0.20);

        // The label, alternating above and below, with a leader back to the spine
        // so a run of eight does not become one line of text.
        const up = i % 2 === 0;
        const ly = up ? spine - py * 0.30 : spine + py * 0.30;
        g.globalAlpha = 0.5; g.strokeStyle = soft; g.lineWidth = line;
        path([[X, spine + (up ? -py * 0.22 : py * 0.22)], [X, ly]]); g.stroke();
        g.globalAlpha = 1;
        g.textAlign = 'center';
        g.fillStyle = ink; g.font = H1;
        g.fillText(String(st.title).toUpperCase(), X, up ? ly - py * 0.015 : ly + py * 0.055);
        if(st.sub){
          g.fillStyle = soft; g.font = H2;
          g.fillText(String(st.sub), X, up ? ly + py * 0.035 : ly + py * 0.105);
        }
        g.textAlign = 'left';

        // The numbered rail along the bottom. The number is the index, so
        // inserting a station renumbers the rest for free.
        g.globalAlpha = 0.55; g.strokeStyle = soft;
        path([[X, rail], [X, rail - py * 0.03]]); g.stroke();
        g.fillStyle = soft; g.font = H3; g.textAlign = 'center';
        g.fillText(`${i + 1} · ${String(st.title).toUpperCase()}`, X, rail + py * 0.06);
        g.textAlign = 'left'; g.globalAlpha = 1;
      });

      // The rail itself, under the numbers.
      g.globalAlpha = 0.35; g.strokeStyle = soft; g.lineWidth = line;
      path([[at(t(0)), rail], [at(t(n - 1)), rail]]); g.stroke();
      g.globalAlpha = 1; g.strokeStyle = ink;
    }
    g.restore();
  }

  // A wash paints nothing further: the field of colour is the whole of it.

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const face = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95, metalness: 0 }));
  // Attached through the caller's own placer, like everything else here.
  const anchor = box(0.001, 0.001, 0.001, x, y, z, new THREE.MeshBasicMaterial({ visible: false }));
  anchor.add(face);
  markWallMounted([anchor], faceX, toward, `mural ${kind}`);
  face.position.set(faceX ? toward * 0.04 : 0, 0, faceX ? 0 : toward * 0.04);
  face.rotation.y = faceX ? toward * Math.PI / 2 : (toward > 0 ? 0 : Math.PI);
  return face;
}
