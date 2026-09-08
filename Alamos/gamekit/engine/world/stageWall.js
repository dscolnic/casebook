// stageWall.js — the control wall, and the reason it exists.
//
// A beat script describes what the room *does* when the player walks in:
//
//   "The red METHANE SHORTFALL - 18.0% warning flashes across the control wall."
//   "The four sample labels separate into ATOM, MOLECULE, and ION columns."
//   "The scale reading, moles and molecule count connect with a continuous
//    illuminated unit path."
//
// Those are stage directions. The first version of the beat runner printed them
// as sentences on a card, which is a stage direction read aloud instead of
// performed — reported in exactly those words: "you aren't showing the world
// states, you are just saying them as text". A player told the wall is flashing
// red, in a room whose wall is not flashing red, has been handed a screenplay.
//
// So the room gets ONE board, wide and high on the back wall where it is legible
// from the threshold, and a beat writes rows onto it. Three row shapes, which is
// what the bible's own world lines need and no more:
//
//   { text, tone }        a reading. A lamp, a label, a value.
//   { columns: [..] }     a sort. Labels separating into named columns.
//   { path: [..] }        a chain. Boxes joined by lit connectors.
//
// PERSISTENT, because the bible calls the effect `persistent_world_change`. The
// rows stay after the beat ends and are restored when the player walks back in,
// so a room the player left with an amber warning on the wall still has it. The
// campaign state holds them; this module holds no memory of its own.
//
// NOTHING HERE IS A QUESTION. The board is not interactive and carries no
// beacon: the object that opens a call is `interiorFixtures.js`, and a second
// glowing thing on the wall is how a beacon stops meaning anything.
import * as THREE from 'three';

const TONES = {
  alarm: { lamp: '#e8493c', ink: '#ffd9d5', glow: 0xe8493c },
  warn:  { lamp: '#eaa72c', ink: '#ffeccb', glow: 0xeaa72c },
  ok:    { lamp: '#3fbf7f', ink: '#d8f6e7', glow: 0x3fbf7f },
  idle:  { lamp: '#5d6b76', ink: '#c3ccd4', glow: 0x2b333a },
};
const toneOf = (t) => TONES[t] ?? TONES.idle;

/**
 * Which way the room is, from a plane inset on one of its walls.
 *
 * A wall coordinate is positive on the far side and negative on the near one, so
 * the room is always back toward zero. Used to nudge the bezel behind the board
 * and the spill light in front of it without four sign cases.
 */
const inwardOf = (n) => (n > 0 ? -1 : 1);

const GROUND = '#171c21';
const RULE = '#2b333a';
const PX = 1024, PY = 352;

/**
 * Paint the rows. Everything is drawn in one canvas and used twice: as the
 * board's colour map and, thresholded to the lit parts only, as its emissive
 * map — so the lamps and the lit text glow and the dark ground does not. One
 * paint, not two, because a second drawing of the same rows is a second
 * description of them.
 */
function paint(canvas, { title = '', rows = [] }){
  const g = canvas.getContext('2d');
  g.fillStyle = GROUND; g.fillRect(0, 0, PX, PY);
  g.textBaseline = 'middle';

  const HEAD = title ? 56 : 12;
  if(title){
    g.fillStyle = '#0f1317'; g.fillRect(0, 0, PX, HEAD);
    g.fillStyle = '#7f8d99';
    g.font = '700 26px Inter, Helvetica, Arial, sans-serif';
    g.fillText(String(title).toUpperCase(), 26, HEAD / 2);
    g.fillStyle = RULE; g.fillRect(0, HEAD - 2, PX, 2);
  }

  const list = rows.slice(0, 4);
  if(!list.length){
    g.fillStyle = '#3b454d';
    g.font = '600 30px Inter, Helvetica, Arial, sans-serif';
    g.fillText('NOMINAL', 26, HEAD + (PY - HEAD) / 2);
    return;
  }
  const rh = (PY - HEAD) / list.length;
  list.forEach((row, i) => {
    const y = HEAD + rh * i, mid = y + rh / 2;
    if(i) { g.fillStyle = RULE; g.fillRect(26, y, PX - 52, 1); }
    const tone = toneOf(row.tone);
    if(Array.isArray(row.columns) && row.columns.length) return columnRow(g, row, mid, rh, tone);
    if(Array.isArray(row.path) && row.path.length) return pathRow(g, row, mid, rh, tone);
    // ------------------------------------------------- A READING: lamp, words
    const r = Math.min(13, rh * 0.16);
    g.fillStyle = tone.lamp;
    g.beginPath(); g.arc(46, mid, r, 0, Math.PI * 2); g.fill();
    g.fillStyle = tone.ink;
    const size = fit(g, String(row.text ?? ''), PX - 110, Math.min(46, rh * 0.52));
    g.font = `800 ${size}px Inter, Helvetica, Arial, sans-serif`;
    g.fillText(String(row.text ?? '').toUpperCase(), 46 + r + 20, mid);
  });
}

/** The biggest size at which the words still fit the width they are given. */
function fit(g, text, width, start){
  let size = start;
  for(; size > 13; size -= 1){
    g.font = `800 ${size}px Inter, Helvetica, Arial, sans-serif`;
    if(g.measureText(String(text).toUpperCase()).width <= width) break;
  }
  return size;
}

/** A SORT. Labels in separate lit columns, with the dividers between them. */
function columnRow(g, row, mid, rh, tone){
  const cols = row.columns.map(String);
  const x0 = 40, w = (PX - 80) / cols.length;
  const h = Math.min(rh * 0.62, 74);
  cols.forEach((label, i) => {
    const x = x0 + w * i;
    g.fillStyle = '#111519'; g.fillRect(x + 6, mid - h / 2, w - 12, h);
    g.fillStyle = tone.lamp; g.fillRect(x + 6, mid - h / 2, 6, h);
    g.fillStyle = tone.ink;
    const size = fit(g, label, w - 40, Math.min(34, h * 0.44));
    g.font = `800 ${size}px Inter, Helvetica, Arial, sans-serif`;
    const tw = g.measureText(label.toUpperCase()).width;
    g.fillText(label.toUpperCase(), x + 6 + (w - 12 - tw) / 2, mid);
  });
}

/** A CHAIN. Boxes joined by lit connectors — the continuous unit path. */
function pathRow(g, row, mid, rh, tone){
  const steps = row.path.map(String);
  const gap = 46;
  const x0 = 40, span = PX - 80;
  const w = (span - gap * (steps.length - 1)) / steps.length;
  const h = Math.min(rh * 0.58, 68);
  steps.forEach((label, i) => {
    const x = x0 + (w + gap) * i;
    g.fillStyle = '#111519'; g.fillRect(x, mid - h / 2, w, h);
    g.strokeStyle = tone.lamp; g.lineWidth = 3;
    g.strokeRect(x + 1.5, mid - h / 2 + 1.5, w - 3, h - 3);
    g.fillStyle = tone.ink;
    const size = fit(g, label, w - 24, Math.min(30, h * 0.42));
    g.font = `800 ${size}px Inter, Helvetica, Arial, sans-serif`;
    const tw = g.measureText(label.toUpperCase()).width;
    g.fillText(label.toUpperCase(), x + (w - tw) / 2, mid);
    if(i < steps.length - 1){
      // The connector, and an arrow head on it. "Continuous" is the word the
      // bible uses and it is the whole point of the row: three readings that
      // used to be three separate numbers are now one route.
      g.fillStyle = tone.lamp;
      g.fillRect(x + w, mid - 3, gap - 12, 6);
      g.beginPath();
      g.moveTo(x + w + gap - 12, mid - 10);
      g.lineTo(x + w + gap, mid);
      g.lineTo(x + w + gap - 12, mid + 10);
      g.closePath(); g.fill();
    }
  });
}

/**
 * Build the board. On the back wall, above whatever the fit-out put against it,
 * facing into the room.
 *
 * Coordinates come from `room.bounds`, never from the theme — the same rule
 * `interiorFixtures.js` states and for the same reason: a board sized from the
 * room it hangs in cannot be built inside the plaster, and `kit.js` placers take
 * ground last, which is how six display boards once ended up sixteen metres in
 * the air.
 */
/**
 * WHERE ON THIS WALL IS ACTUALLY FREE.
 *
 * The board used to be planted at the centre of the back wall, and the room's
 * own instrument screen is planted at the centre of the back wall — see
 * `interiorBuilding.js`, whose `IU` is 0 for a back-wall instrument. So in every
 * room of every theme with a beat script, the two were coplanar and overlapping:
 * GIBBS had PLANT SUMMARY and the beat's sort fighting for the same 0.9 m of
 * height at the same depth. Reported as "you are putting the Plant Summary and
 * the four sample labels on same screen and its glitching — these need to be
 * separate things, only use screen for one thing."
 *
 * So the board asks the room what is already on the wall rather than assuming
 * the middle of it is free. Measured off the meshes themselves, not off a list
 * of what the fit-out is *expected* to hang: the fit-out is three builders deep
 * and a board placed from a list is a second description of where things are.
 *
 * Returns `{ x, w }` — where to centre the board and how wide it may be — or
 * null when the wall has nothing wide enough on it.
 */
/**
 * HOW MUCH OF THE BOARD WOULD BE HIDDEN, seen from the door.
 *
 * Clear wall is not a clear view. The first span this picked in GIBBS had
 * nothing hung on it and a case beacon and a console standing a metre and a
 * half out in front of it, so the board went up unobstructed and the middle of
 * it was behind a pillar of light.
 *
 * THREE RAYS WAS THE FIRST ATTEMPT AND IT WAS WORSE THAN NOTHING. Sampling the
 * face with three infinitely thin rays reported the beacon-blocked span 100%
 * visible: the rays threaded past a thin column and the test said what it was
 * asked, which was not what it was for. A board is an area and so is the thing
 * in front of it, so this projects each object's bounding box onto the board's
 * own plane along the eye and measures the overlap of two rectangles.
 *
 * Returns the fraction of the board covered by the WORST single occluder —
 * not a union. One object over a third of the board and three objects over the
 * same third rank the same, which is right: both are "a third of it is hidden",
 * and a union of projected boxes costs sorting and merging for a number only
 * ever used to compare candidates against each other.
 */
/**
 * EVERY OCCLUDER IN THE ROOM, MEASURED ONCE.
 *
 * `blockedFraction` used to walk the whole room for every candidate spot, and
 * the candidates are spans × four widths × up to seventeen positions × three
 * walls. Measured on first entry to Plant Control: 18 calls and **3,492 mesh
 * visits**, each doing a `Box3.setFromObject`, for one placement decision. The
 * geometry does not move between candidates, so it is collected once and the
 * candidates test rectangles against the list.
 *
 * Local coordinates, because every consumer works in the room's own frame.
 */
export function collectOccluders(room){
  const out = [];
  if(!room?.group) return out;
  const box = new THREE.Box3();
  const lo = new THREE.Vector3(), hi = new THREE.Vector3();
  room.group.traverse((o) => {
    if(!o.isMesh || !o.visible) return;
    if(o.userData?.structure) return;
    // SEE-THROUGH IS NOT IN THE WAY. The case beacon is a 2.5 m column at
    // `opacity: 0.055` with `depthWrite: false` — it tints what is behind it
    // and hides nothing.
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    if(mats.every(m => !m || m.depthWrite === false
                       || (m.transparent && (m.opacity ?? 1) < 0.85))) return;
    box.setFromObject(o);
    if(box.isEmpty()) return;
    room.group.worldToLocal(lo.copy(box.min));
    room.group.worldToLocal(hi.copy(box.max));
    out.push({
      x: [Math.min(lo.x, hi.x), Math.max(lo.x, hi.x)],
      y: [Math.min(lo.y, hi.y), Math.max(lo.y, hi.y)],
      z: [Math.min(lo.z, hi.z), Math.max(lo.z, hi.z)],
    });
  });
  return out;
}

export function blockedFraction(room, { x, w, y, h, z, axis = 'z', along = 'x' },
                                occluders = null) {
  const b = room.bounds;
  const eye = {
    x: (room.enterTransform?.x ?? 0) - (room.origin?.x ?? 0), y: 1.65,
    z: (room.enterTransform?.z ?? 0) - (room.origin?.z ?? 0),
  };
  // The board's rectangle, in the two axes of its own wall: `along` across it and
  // y up it. `axis` is the wall's normal, and `z` is where the plane sits on it.
  const bu0 = x - w / 2, bu1 = x + w / 2, by0 = y - h / 2, by1 = y + h / 2;
  const area = (bu1 - bu0) * (by1 - by0);
  if(!(area > 0)) return 0;
  // Which way the room is from the board, so "in front of it" has a sign. The
  // board is inset from its wall, so the room is whichever side the middle of
  // the room is on.
  const inward = z > 0 ? -1 : 1;
  const eyeN = axis === 'z' ? eye.z : eye.x;
  const eyeU = along === 'z' ? eye.z : eye.x;

  let worst = 0;
  for(const o of (occluders ?? collectOccluders(room))){
    // Along the wall's normal, and along the wall.
    const nLo = axis === 'z' ? o.z[0] : o.x[0];
    const nHi = axis === 'z' ? o.z[1] : o.x[1];
    const uLo = along === 'z' ? o.z[0] : o.x[0];
    const uHi = along === 'z' ? o.z[1] : o.x[1];
    // STRICTLY BETWEEN THE EYE AND THE PLANE. Something level with the plane is
    // on the wall beside the board rather than in front of it, and something
    // past the eye is behind the player. `inward` is what makes this work on a
    // side wall, where "in front" is a smaller x rather than a smaller z.
    const nearest = inward < 0 ? nHi : nLo;
    const farthest = inward < 0 ? nLo : nHi;
    if(inward < 0 ? (nearest >= z - 0.02 || farthest <= eyeN + 0.05)
                  : (nearest <= z + 0.02 || farthest >= eyeN - 0.05)) continue;
    const span = along === 'z' ? b.d : b.w;
    if(uHi - uLo > span * 0.6) continue;      // a run of the wall, not an object

    let su0 = Infinity, su1 = -Infinity, sy0 = Infinity, sy1 = -Infinity;
    for(const cu of [uLo, uHi]) for(const cy of [o.y[0], o.y[1]]) for(const cn of [nLo, nHi]){
      const t = (z - eyeN) / (cn - eyeN);
      if(!(t > 0)) continue;
      const pu = eyeU + t * (cu - eyeU);
      const py = eye.y + t * (cy - eye.y);
      if(pu < su0) su0 = pu; if(pu > su1) su1 = pu;
      if(py < sy0) sy0 = py; if(py > sy1) sy1 = py;
    }
    if(su0 > su1) continue;
    const ou = Math.min(bu1, su1) - Math.max(bu0, su0);
    const oy = Math.min(by1, sy1) - Math.max(by0, sy0);
    if(ou <= 0 || oy <= 0) continue;
    const frac = (ou * oy) / area;
    if(frac > worst) worst = frac;
  }
  return worst;
}

function freeSpan(room, { z, yLo, yHi, want, min = 1.9, gap = 0.16, edge = 0.7,
                          axis = 'z', along = 'x', occluders = null }){
  const b = room.bounds;
  const box = new THREE.Box3();
  const lo = new THREE.Vector3(), hi = new THREE.Vector3();
  const taken = [];
  room.group.traverse((o) => {
    if(!o.isMesh || !o.visible) return;
    // Structure is the room, not a thing hung in it. Without this the back wall
    // itself is the widest occupant of the back wall.
    if(o.userData?.structure) return;
    box.setFromObject(o);
    if(box.isEmpty()) return;
    room.group.worldToLocal(lo.copy(box.min));
    room.group.worldToLocal(hi.copy(box.max));
    const nLo = axis === 'z' ? Math.min(lo.z, hi.z) : Math.min(lo.x, hi.x);
    const nHi = axis === 'z' ? Math.max(lo.z, hi.z) : Math.max(lo.x, hi.x);
    const oyLo = Math.min(lo.y, hi.y), oyHi = Math.max(lo.y, hi.y);
    const ouLo = along === 'z' ? Math.min(lo.z, hi.z) : Math.min(lo.x, hi.x);
    const ouHi = along === 'z' ? Math.max(lo.z, hi.z) : Math.max(lo.x, hi.x);
    // Anything spanning most of the wall is a run of the wall, a skirting or a
    // service tray, and treating it as an occupant leaves nowhere to hang.
    if(ouHi - ouLo > (along === 'z' ? b.d : b.w) * 0.6) return;
    if(nHi < z - 0.55 || nLo > z + 0.55) return;   // not against this wall
    if(oyHi < yLo || oyLo > yHi) return;           // not in the board's band
    taken.push([ouLo - gap, ouHi + gap]);
  });

  const runLen = along === 'z' ? b.d : b.w;
  const wallLo = -runLen / 2 + edge, wallHi = runLen / 2 - edge;
  taken.sort((p, q) => p[0] - q[0]);
  const merged = [];
  for(const t of taken){
    const last = merged[merged.length - 1];
    if(last && t[0] <= last[1]) last[1] = Math.max(last[1], t[1]);
    else merged.push([t[0], t[1]]);
  }
  const free = [];
  let cursor = wallLo;
  for(const [a, c] of merged){
    if(a > cursor) free.push([cursor, Math.min(a, wallHi)]);
    cursor = Math.max(cursor, c);
    if(cursor >= wallHi) break;
  }
  if(cursor < wallHi) free.push([cursor, wallHi]);

  const usable = free
    .map(([a, c]) => ({ a, c, span: c - a, mid: (a + c) / 2 }))
    .filter(f => f.span >= min);
  if(!usable.length) return null;
  // A span wide enough for the board at full size wins, and among those the one
  // nearest the middle of the wall — the board has to be legible from the
  // threshold, and the threshold looks down the centre line. Only if none fits
  // does the widest span win and the board come down to it.
  // EVERY span is scored, not just the ones wide enough for the board at full
  // size, and every span is scored at every position the board can take ALONG
  // it rather than only centred in it. Centred was leaving 15% of the board
  // behind a beacon in a span two metres wider than the board, which the board
  // only had to slide along to clear.
  const scored = [];
  // AND AT MORE THAN ONE WIDTH. The clear span in GIBBS is 3.6 m and the board
  // wants 3.4, so sliding it bought a tenth of a metre and the beacon's shadow
  // stayed on it whatever it did. A board that is narrower and wholly readable
  // beats a wide one with a pillar of light down the middle of it, so the
  // widths are candidates too — and `sort` puts width second, which is what
  // stops a needlessly small board winning on a wall that has room.
  const widths = [];
  for(const frac of [1, 0.8, 0.65, 0.5]){
    const bw = want * frac;
    if(bw >= min) widths.push(bw);
  }
  if(!widths.length) widths.push(min);
  for(const f of usable) for(const wantHere of widths){
    const bw = Math.min(wantHere, f.span);
    const slack = f.span - bw;
    // A step fine enough to slip past a beacon and coarse enough that a wide
    // wall is not hundreds of raycast-free rectangle tests.
    const steps = Math.max(1, Math.min(17, Math.round(slack / 0.2) + 1));
    for(let i = 0; i < steps; i++){
      const mid = f.a + bw / 2 + (steps === 1 ? slack / 2 : (slack * i) / (steps - 1));
      scored.push({ mid, w: bw, span: f.span,
        blocked: blockedFraction(room, { x: mid, w: bw, y: (yLo + yHi) / 2, h: yHi - yLo, z,
                                         axis, along }, occluders) });
    }
  }
  // HOW MUCH READABLE BOARD, not how little of it is covered.
  //
  // Ranking on `blocked` alone traded a third of the board's width for five
  // percent less clipping: a 3.4 m board 15% clipped became a 2.21 m board 10%
  // clipped, parked in the far corner of a 15.5 m wall, and from the door the
  // labels on it could not be read at all — "im not seeing the the four sample
  // sign". Width and clearance are the same currency and this is the exchange
  // rate: 3.4 × 0.85 = 2.89 m of readable board beats 2.21 × 0.90 = 1.99 m.
  for(const f of scored) f.readable = f.w * (1 - f.blocked);
  scored.sort((f, g) => (g.readable - f.readable)
                        || (Math.abs(f.mid) - Math.abs(g.mid)));
  const pick = scored[0];
  return { x: pick.mid, w: pick.w, blocked: pick.blocked, readable: pick.readable };
}

/**
 * THE BEST SPOT IN THE ROOM, not the best spot on the back wall.
 *
 * The back wall of a control room is where the fit-out puts everything: the
 * instrument screen dead centre, its flanking panels, the case plate under it,
 * and a console standing a metre and a half out in front. In GIBBS the widest
 * clear span left on it was at the far end, behind a cabinet, and the board
 * ended up 15% hidden and six metres off the centre line — "you still are
 * overlapping things".
 *
 * A room has three walls the player can read from the door, so all three are
 * measured and the most readable board wins. The side walls are the room's
 * DEPTH long, which in a 15.5 × 9.5 m hall is nine and a half metres of mostly
 * empty plaster.
 *
 * Returns the winning wall's descriptor along with the spot, because the caller
 * has to know which way to face the board.
 */
function bestWall(room, { want, y, h }){
  const b = room.bounds;
  const inset = b.wall / 2 + 0.06;
  const walls = [
    // The wall the player faces walking in. First in the list and first on a
    // tie, because it is the one the doorway already points at.
    { id: 'back', axis: 'z', along: 'x', z: b.z1 - inset, rotY: Math.PI },
    { id: 'right', axis: 'x', along: 'z', z: b.x1 - inset, rotY: -Math.PI / 2 },
    { id: 'left', axis: 'x', along: 'z', z: b.x0 + inset, rotY: Math.PI / 2 },
  ];
  // ONCE FOR THE WHOLE DECISION. Three walls, dozens of candidate spots each,
  // and the room's geometry is the same for all of them.
  const occluders = collectOccluders(room);
  let best = null;
  for(const wall of walls){
    const span = freeSpan(room, {
      z: wall.z, want, axis: wall.axis, along: wall.along, occluders,
      yLo: y - h / 2, yHi: y + h / 2,
    });
    if(!span) continue;
    const cand = { ...wall, ...span };
    // Readable metres of board, the same currency `freeSpan` ranks spans in.
    if(!best || cand.readable > best.readable + 0.01) best = cand;
  }
  if(!best){
    console.warn('stageWall: no wall in this room has a clear span for the beat board.');
    return null;
  }
  if(best.blocked > 0.02){
    console.warn(`stageWall: the best wall in this room (${best.id}) still has`
      + ` ${Math.round(best.blocked * 100)}% of the board hidden from the door.`);
  }
  return best;
}

/**
 * @param opts.title  what is written over the door of this room
 * @param opts.spot   a `{x, w}` this room chose on an earlier visit, if any.
 *                    THE SPOT IS DECIDED ONCE PER ROOM AND THEN KEPT. What is
 *                    standing in the room changes between visits — the cast
 *                    comes indoors, the case beacon lights and goes out with the
 *                    day — so recomputing it every time a door opens moved the
 *                    board: measured at 10% hidden on the way in and 30% on the
 *                    way back, with a different span chosen. A board that is
 *                    somewhere else every time you walk in is not a board.
 */
export function addStageWall(room, { title = '', spot: given = null } = {}){
  const b = room?.bounds;
  if(!b || !room.group) return null;

  const canvas = document.createElement('canvas');
  canvas.width = PX; canvas.height = PY;
  let rows = [];
  paint(canvas, { title, rows });
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  // The band the board wants, before it knows how wide it can be. `y` is fixed:
  // the fit-out owns the metre and a half nearest the floor, and the ceiling
  // owns everything above about 2.8, so there is no vertical room to move into
  // — which is why a clash here is solved along the wall and not up it.
  const y = 2.16;
  const want = Math.min(3.4, Math.max(b.w, b.d) - 1.6);
  // ANY OF THE THREE WALLS THE DOOR CAN SEE. A remembered spot carries the wall
  // it was on, so the board comes back where it was rather than being reasoned
  // about again — see the note on `spot` above.
  const spot = (given && Number.isFinite(given.x) && given.w > 0 && given.axis)
    ? { ...given }
    : bestWall(room, { want, y, h: want * (PY / PX) });
  // NOTHING FREE ANYWHERE. Better no board than a board over the room's own
  // instrument, and `bestWall` has already said so on the console.
  if(!spot) return null;
  const w = spot.w, h = w * (PY / PX);
  const mat = new THREE.MeshStandardMaterial({
    map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.55,
    roughness: 0.42, metalness: 0.05,
  });
  const face = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  // ON WHICHEVER WALL WON, at head height and a little above, in the clear span
  // found there — never assumed to be the middle of the back wall.
  //
  // `along` is the axis the board runs across and `axis` the wall's own normal,
  // so one `set` covers all three walls. Getting these two the wrong way round
  // builds the board inside the plaster at right angles to its wall, which
  // renders without complaint.
  const at = (u, n, out = 0) => (spot.along === 'x'
    ? [u, y, n + out * inwardOf(n)]
    : [n + out * inwardOf(n), y, u]);
  face.position.set(...at(spot.x, spot.z));
  face.rotation.y = spot.rotY;
  room.group.add(face);

  // A bezel behind it, so the board reads as mounted rather than painted on.
  //
  // BEHIND IS +z HERE, NOT -z. The face is rotated PI to look into the room, so
  // the player stands on the board's -z side and `z - 0.05` is five centimetres
  // *towards them* — a solid slate box 3.54 m wide parked in front of a 3.4 m
  // board, which is what it was. Everything upstream of this line worked: the
  // beat fired, the canvas painted its columns, `needsUpdate` went up, and the
  // wall the player was looking at was blank, because the bezel was the thing
  // they were looking at. A screenshot found it; nothing else could have.
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(w + 0.14, h + 0.14, 0.07),
    new THREE.MeshStandardMaterial({ color: 0x2c3339, roughness: 0.6, metalness: 0.2 }));
  bezel.position.set(...at(spot.x, spot.z, -0.05));
  bezel.rotation.y = spot.rotY;
  room.group.add(bezel);

  // The board's own light, so a red wall makes the room red. Weak and short
  // range: this is a spill, not a lamp, and the room's own lighting is already
  // balanced.
  // Also -z: the room is on the side the board faces, and `z + 0.7` put the
  // lamp seventy centimetres inside the plaster, where a red wall lit nothing.
  const spill = new THREE.PointLight(0x8899a4, 0.0, 6.5);
  spill.position.set(...at(spot.x, spot.z, 0.7));
  room.group.add(spill);

  let flashUntil = 0, clock = 0;

  function repaint(){
    paint(canvas, { title, rows });
    tex.needsUpdate = true;
    const hottest = rows.find(r => r.tone === 'alarm') ? 'alarm'
      : rows.find(r => r.tone === 'warn') ? 'warn'
      : rows.find(r => r.tone === 'ok') ? 'ok' : 'idle';
    spill.color.setHex(toneOf(hottest).glow);
    spill.intensity = hottest === 'idle' ? 0.0 : 0.5;
  }

  return {
    face, bezel,
    /**
     * Where this room put its board, for the caller to keep — the wall as well
     * as the position, or it comes back on the back wall next time.
     */
    spot: { x: spot.x, w: spot.w, z: spot.z, axis: spot.axis,
            along: spot.along, rotY: spot.rotY, id: spot.id,
            // How good the spot actually is, carried so `npm run signs` can
            // report it per room without re-deriving the placement. A campaign
            // spread over seventeen rooms degrades one room at a time, and a
            // console warning during play is not a signal anybody acts on.
            blocked: spot.blocked ?? 0, readable: spot.readable ?? spot.w },
    /** Replace what the wall says. `flash` pulses it for a few seconds. */
    set(next = [], { flash = false } = {}){
      rows = Array.isArray(next) ? next.slice(0, 4) : [];
      repaint();
      // SIX SECONDS, not forever. A wall that never stops flashing is a wall
      // the player stops seeing, and the state it is announcing is the thing
      // that has to stay legible after the announcement.
      if(flash) flashUntil = clock + 6;
    },
    rows: () => rows.slice(),
    update(dt){
      clock += dt;
      const flashing = clock < flashUntil;
      const pulse = flashing ? 0.5 + 0.5 * Math.sin(clock * Math.PI * 2.6) : 1;
      mat.emissiveIntensity = 0.34 + 0.42 * pulse;
      if(spill.intensity > 0 || flashing){
        const base = rows.length ? 0.5 : 0;
        spill.intensity = base * (0.55 + 0.65 * pulse);
      }
    },
    dispose(){
      room.group.remove(face, bezel, spill);
      face.geometry.dispose(); bezel.geometry.dispose();
      mat.dispose(); bezel.material.dispose(); tex.dispose();
    },
  };
}

export { TONES };

// --------------------------------------------------------------- selftest
//
//   node engine/world/stageWall.js --selftest
//
// `blockedFraction` is the only number in this file that decides anything, and
// the version before it — three rays through the face — reported a span 100%
// visible with a 2.5 m beacon standing in front of it. A metric that produces a
// plausible answer is not thereby a working metric, so the cases below include
// the two the repo insists on: two inputs that should score the same actually
// do, and an occluder moved out of the way scores strictly better.
//
// three.js runs in node for anything that is not a draw call, so this builds
// real meshes and real bounding boxes rather than a model of them. Nothing here
// touches `addStageWall`, which needs a canvas.
if(typeof process !== 'undefined' && process.argv?.includes('--selftest')){
  const fails = [];
  let ran = 0;
  const check = (what, ok, extra = '') => {
    ran++;
    if(!ok) fails.push(`${what}${extra ? ` — ${extra}` : ''}`);
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
  };

  const BOARD = { x: 0, w: 3, y: 2.16, h: 1, z: 4.5 };
  const makeRoom = () => {
    const group = new THREE.Group();
    return {
      group,
      bounds: { w: 12, d: 10, x0: -6, x1: 6, z0: -5, z1: 5, wall: 0.2 },
      enterTransform: { x: 0, y: 0, z: -3.5 },
      origin: { x: 0, z: 0 },
    };
  };
  /** An opaque slab, positioned in room-local coordinates. */
  const slab = (x, y, z, w = 1, h = 1, d = 0.2, mat = null) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d),
      mat ?? new THREE.MeshStandardMaterial({ color: 0x888888 }));
    m.position.set(x, y, z);
    return m;
  };

  const empty = makeRoom();
  check('an empty room hides nothing', blockedFraction(empty, BOARD) === 0);

  // 1 — something on the eye line, between the player and the wall
  const one = makeRoom();
  one.group.add(slab(0, 2.0, 1.0));
  const withOne = blockedFraction(one, BOARD);
  check('a slab on the eye line hides some of the board', withOne > 0,
        'this is the case three rays reported clear');
  check('…and not all of it', withOne < 1);

  // 2 — THE EQUAL-INPUTS CASE. A second identical slab in the same place is the
  // same obstruction; the number may not drift because the scene got busier.
  const two = makeRoom();
  two.group.add(slab(0, 2.0, 1.0));
  two.group.add(slab(0, 2.0, 1.0));
  check('two slabs in one place score the same as one',
        blockedFraction(two, BOARD) === withOne,
        'the worst single occluder is the measure, so a duplicate changes nothing');

  // 3 — MOVED OUT OF THE WAY, and the number has to fall
  const aside = makeRoom();
  aside.group.add(slab(9, 2.0, 1.0));
  check('the same slab off to one side hides nothing',
        blockedFraction(aside, BOARD) === 0);
  const nearer = makeRoom();
  nearer.group.add(slab(0, 2.0, 3.6));       // closer to the wall, smaller shadow
  check('…and closer to the wall it hides less than out in the room',
        blockedFraction(nearer, BOARD) < withOne,
        'a shadow cast from nearer the plane is a smaller shadow');

  // 4 — the two places nothing can be in the way from
  const behind = makeRoom();
  behind.group.add(slab(0, 2.0, 4.9));
  check('a slab behind the board’s plane is beside it, not in front',
        blockedFraction(behind, BOARD) === 0);
  const backOfHead = makeRoom();
  backOfHead.group.add(slab(0, 2.0, -4.5));
  check('a slab behind the player hides nothing',
        blockedFraction(backOfHead, BOARD) === 0);

  // 5 — see-through and depth-writeless things are not obstructions
  const glass = makeRoom();
  glass.group.add(slab(0, 2.0, 1.0, 1, 1, 0.2,
    new THREE.MeshBasicMaterial({ color: 0xf0b429, transparent: true, opacity: 0.055 })));
  check('a beacon you can see through hides nothing',
        blockedFraction(glass, BOARD) === 0,
        'counting it cost the board a metre of width to dodge a shadow that is not there');

  // 6 — the room itself is not an occupant of the room
  const wall = makeRoom();
  const w = slab(0, 1.55, 1.0, 15.5, 3.1, 0.2);
  w.userData.structure = 'wall';
  wall.group.add(w);
  check('structure is the room, not a thing standing in it',
        blockedFraction(wall, BOARD) === 0,
        'without this the widest occupant of every wall is the wall');

  if(fails.length){
    console.log(`\nstageWall --selftest: ${fails.length} case(s) failed.`);
    for(const f of fails) console.log(`  - ${f}`);
    process.exitCode = 1;
  } else {
    console.log(`\nstageWall --selftest: ${ran} cases, an area is measured as an area.`);
  }
}
