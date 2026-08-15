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
  const ink = '#1b1e22', soft = '#4a5259';
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
  g.fillStyle = '#fbfaf6'; g.fillRect(0, 0, px, py);

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
    g.fillStyle = '#fbfaf6';
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
    g.fillStyle = '#fbfaf6'; g.fillRect(0, py - 58, px, 58);
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
    let yy = 82;
    for(const [k, v] of rows2.slice(0, 6)){
      g.fillStyle = ink; g.font = '600 17px Inter, Helvetica, Arial, sans-serif';
      g.fillText(String(k), 16, yy);
      const kw = g.measureText(String(k)).width;
      g.fillStyle = '#c9ccd2';
      for(let x = 26 + kw; x < px - 70; x += 8) g.fillRect(x, yy + 9, 3, 2);
      g.fillStyle = soft; g.textAlign = 'right';
      g.fillText(String(v), px - 16, yy);
      g.textAlign = 'left';
      yy += 25;
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
 * A notice with words on it, on a wall.
 *
 * Shared by rooms and corridors because a blank rectangle raises a piece count and
 * says nothing: what tells the player where they are is the text on it — a cryogen
 * warning, a booking sheet, a permit-to-work board, an assembly point.
 *
 * `faceX` says the wall runs along z (so the sheet faces ±x). `toward` is the
 * direction the face should point, +1 or -1.
 */
export function wordedSign({ box, mats: M, x, z, faceX, toward = -1, text = {}, wide = 0.66 }){
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
  box(faceX ? 0.04 : w + 0.06, h + 0.06, faceX ? w + 0.06 : 0.04, x, 1.58, z, M.dark);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }));
  const anchor = box(0.001, 0.001, 0.001, x, 1.58, z, M.dark);
  anchor.add(face);
  face.position.set(faceX ? toward * 0.03 : 0, 0, faceX ? 0 : toward * 0.03);
  face.rotation.y = faceX ? toward * Math.PI / 2 : (toward > 0 ? 0 : Math.PI);
  return face;
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
  const { box, mats: M, bounds: B, kind = 'lab', seed = 'room',
    hard = () => {}, soft = () => {}, keepClear = [], target = 16 } = spec;
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
  const rand = rng(seed);
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const jit = (r) => (rand() - 0.5) * 2 * r;

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
  const blocked = (x, z, r = 0.5) => keepClear.some(k =>
    Math.hypot(k.x - x, k.z - z) < (k.r ?? 1) + r);
  const crowded = (list, x, z, sep) => list.some(t => Math.hypot(t.x - x, t.z - z) < sep);
  /** Place one piece, unless the spot is spoken for or too close to its own kind. */
  const put = (fn, x, z, lane = 'floor') => {
    const sep = lane === 'wall' ? WALL_SEP : FLOOR_SEP;
    if(blocked(x, z) || crowded(taken[lane], x, z, sep)) return false;
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
  const notice = (x, z, wallX) => {
    const t = 0.03;
    const ww = wallX ? t : 0.62, dd = wallX ? 0.62 : t;
    box(ww, 0.46, dd, x, 1.55, z, pick([M.pale, M.accent]));
    box(ww + 0.005, 0.5, dd + 0.005, x, 1.55, z, M.dark);
  };
  const poster = (x, z, wallX) => {
    const t = 0.02;
    box(wallX ? t : 0.5, 0.68, wallX ? 0.5 : t, x, 1.62, z, pick([M.pale, M.accent, M.surface]));
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
  const signPlate = (x, z, wallX, text) => wordedSign({
    box, mats: M, x, z, faceX: wallX,
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
  const wallSpots = [
    { make: (x, z) => signPlate(x, z, true, nextSign()), wall: 'xLo' },
    { make: (x, z) => signPlate(x, z, true, nextSign()), wall: 'xHi' },
    { make: (x, z) => signPlate(x, z, false, nextSign()), wall: 'zLo' },
    { make: (x, z) => signPlate(x, z, false, nextSign()), wall: 'zHi' },
    { make: (x, z) => signPlate(x, z, true, nextSign()), wall: 'xLo' },
    { make: (x, z) => poster(x, z, true), wall: 'xHi' },
    { make: (x, z) => poster(x, z, false), wall: 'zLo' },
    { make: (x, z) => notice(x, z, false), wall: 'zHi' },
    { make: (x, z) => clock(x, z, true), wall: 'xHi' },
    { make: (x, z) => hooks(x, z, true), wall: 'xLo' },
    { make: extinguisher, wall: 'xLo' },
    { make: bin, wall: 'zHi' },
    // The second rank. A 59 m² store runs out of floor before it runs out of
    // wall, and these are what got its three smallest rooms over the bar.
    { make: (x, z) => poster(x, z, false), wall: 'zHi' },
    { make: (x, z) => notice(x, z, false), wall: 'zLo' },
    { make: (x, z) => hooks(x, z, true), wall: 'xHi' },
    { make: extinguisher, wall: 'zLo' },
    { make: (x, z) => poster(x, z, true), wall: 'xLo' },
    { make: (x, z) => notice(x, z, true), wall: 'xHi' },
  ];
  // On the wall planes, not on the furniture rectangle.
  const wxLo = Math.min(W.x0, W.x1), wxHi = Math.max(W.x0, W.x1);
  const wzLo = Math.min(W.z0, W.z1), wzHi = Math.max(W.z0, W.z1);
  const wWide = wxHi - wxLo, wDeep = wzHi - wzLo;
  const along = { xLo: (t) => ({ x: wxLo + 0.07, z: wzLo + 0.8 + t * (wDeep - 1.6) }),
    xHi: (t) => ({ x: wxHi - 0.07, z: wzLo + 0.8 + t * (wDeep - 1.6) }),
    zLo: (t) => ({ x: wxLo + 0.8 + t * (wWide - 1.6), z: wzLo + 0.07 }),
    zHi: (t) => ({ x: wxLo + 0.8 + t * (wWide - 1.6), z: wzHi - 0.07 }) };
  let signsUp = 0;
  for(const spot of wallSpots){
    if(signsUp >= MIN_SIGNS && placed >= target) break;
    for(let k = 0; k < 8; k++){
      const p = along[spot.wall]((k + 0.5 + jit(0.2)) / 8);
      if(!wallOk(p.x, p.z, spot.wall)) continue;
      if(put(spot.make, p.x, p.z, 'wall')){ signsUp++; break; }
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
        if(!wallOk(p.x, p.z, wallName)) continue;
        if(put((px, pz) => make(px, pz, wallName.startsWith('x') ? 'z' : 'x'), p.x, p.z, 'wall')) break;
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
  for(let z = z0 + 3; z < z1 - 3; z += 8){
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
  const signEvery = spec.signEvery ?? 3.2;
  let sside = -1;
  for(let z = z0 + 3; z < z1 - 2; z += signEvery){
    if(!clear(z)){ sside *= -1; continue; }
    // If this side has no wall here, try the other one before giving up on the
    // position — a corridor with an open room down one side still has a wall
    // opposite it.
    if(!wallOk(sside * wallX, z)) sside *= -1;
    if(!wallOk(sside * wallX, z)) continue;
    wordedSign({ box, mats: M, x: sside * wallX, z, faceX: true, toward: -sside,
      text: CORRIDOR_SIGNS[ci++ % CORRIDOR_SIGNS.length],
      wide: ci % 3 === 0 ? 1.25 : 0.85 });
    placed++;
    sside *= -1;
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
  kind = 'wash', ink = '#5b6a72', paper = '#e8ecee', seed = 'mural',
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
  face.position.set(faceX ? toward * 0.04 : 0, 0, faceX ? 0 : toward * 0.04);
  face.rotation.y = faceX ? toward * Math.PI / 2 : (toward > 0 ? 0 : Math.PI);
  return face;
}
