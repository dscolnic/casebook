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
export function wordedSign({ box, mats: M, x, z, faceX, toward = -1, text = {}, wide = 0.66 }){
  const sheet = printedSheet({
    tag: text.tag ?? 'NOTICE', title: '', heading: text.heading ?? '',
    body: text.body ?? '', accent: text.accent ?? '#3f6f8f', footer: text.footer ?? '',
  }, { w: 512, h: 340 });
  const h = wide * 0.66;
  // The board, which is a box so the caller's own placer can attach it, and the
  // printed face just in front of it.
  box(faceX ? 0.04 : wide + 0.06, h + 0.06, faceX ? wide + 0.06 : 0.04,
    x, 1.58, z, M.dark);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(wide, h),
    new THREE.MeshStandardMaterial({ map: sheet.texture, roughness: 0.9 }));
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
    box(ww, 0.06, dd, x, h, z, M.surface);
    box(ww - 0.1, 0.62, dd - 0.1, x, h / 2 - 0.06, z, M.dark);
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
    box(0.13, 0.5, 0.13, x, 0.72, z, M.accent);
    box(0.09, 0.06, 0.09, x, 1.0, z, M.dark);
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
    box(0.7, 0.5, 0.5, x, 0.25, z, M.dark);              // pump body
    box(0.3, 0.3, 0.3, x + 0.2, 0.65, z, M.metal);       // motor
    box(0.1, 0.1, 0.8, x, 0.8, z + 0.2, M.metal);        // hose run
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
  // The things that say what happens here go down first and get the best wall
  // positions. Generic furniture fills in around them, never instead of them.
  let li = Math.floor(rand() * lanes.length);
  for(const name of fittings){
    const make = NARRATIVE[name];
    if(!make) continue;
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
  const along = { xLo: (t) => ({ x: xLo + 0.09, z: zLo + 0.8 + t * (d - 1.6) }),
    xHi: (t) => ({ x: xHi - 0.09, z: zLo + 0.8 + t * (d - 1.6) }),
    zLo: (t) => ({ x: xLo + 0.8 + t * (w - 1.6), z: zLo + 0.08 }),
    zHi: (t) => ({ x: xLo + 0.8 + t * (w - 1.6), z: zHi - 0.08 }) };
  for(const spot of wallSpots){
    if(placed >= target) break;
    for(let k = 0; k < 6; k++){
      const p = along[spot.wall]((k + 0.5 + jit(0.2)) / 6);
      if(put(spot.make, p.x, p.z, 'wall')) break;
    }
  }
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
        const p = along[wallName](steps ? k / steps : 0.5);
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
  const rand = rng(seed);
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const clear = (z) => !keepClear.some(k => Math.abs(k.z - z) < (k.r ?? 1.2));
  let placed = 0;
  let ci = 0;
  const wallX = halfWidth - 0.35;
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
  // Along the walls, alternating sides, skipping doorways.
  let side = 1;
  for(let z = z0 + 4; z < z1 - 2; z += every){
    if(!clear(z)){ side *= -1; continue; }
    const x = side * wallX;
    switch(pick(['notice', 'fire', 'bench', 'trolley', 'recycling', 'hydrant'])){
      case 'notice':
        // Worded, like the ones in the rooms. A corridor's boards are what say
        // which building this is before the player has entered anything.
        wordedSign({ box, mats: M, x, z, faceX: true, toward: -side,
          text: CORRIDOR_SIGNS[ci++ % CORRIDOR_SIGNS.length], wide: 1.0 });
        break;
      case 'fire':
        box(0.14, 0.52, 0.14, x - side * 0.1, 0.75, z, M.accent);
        box(0.03, 0.24, 0.18, x, 1.9, z, M.accent);
        break;
      case 'bench':
        box(0.42, 0.06, 1.6, x - side * 0.12, 0.45, z, M.surface);
        for(const sz of [-1, 1]) box(0.05, 0.43, 0.05, x - side * 0.12, 0.22, z + sz * 0.65, M.metal);
        hard(x, z, 0.5, 1.7, 0.5);
        break;
      case 'trolley':
        box(0.46, 0.04, 0.72, x - side * 0.3, 0.8, z, M.metal);
        box(0.46, 0.04, 0.72, x - side * 0.3, 0.4, z, M.metal);
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
