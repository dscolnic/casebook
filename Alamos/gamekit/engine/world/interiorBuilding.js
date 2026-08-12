// interiorBuilding.js — one room you can walk into, built from data.
//
// The outdoor games answered their questions at the door: you walked up to a
// building, a panel opened, and the building itself was a box you never got
// inside. This builds the inside — a single working room per area, with the
// instrument that area is about, the case that is live on it, and a way back
// out — so "go there and answer" becomes a place rather than a menu.
//
// ## Where the rooms are
//
// Not inside the exterior shells. Those are solid boxes standing on graded
// terrain, and hollowing them out means fighting the ground height function,
// the colliders and the shadow budget for no gain the player can see. Instead
// each interior is built once, lazily, in an **interior district** far along +x
// from the town, and entering one teleports you there:
//
//   · the floor is flat at y = 0, so the player's collision box — which is
//     built at a fixed height above the origin — lines up with the walls;
//   · the town is thousands of metres away, past the camera's far plane, so
//     nothing of it is visible and nothing of it is drawn;
//   · outdoor colliders and soft colliders are separated in x rather than in
//     y, which matters because the soft-collider test only looks at x and z.
//
// The caller swaps the player's ground function and bounds on the way in and
// back on the way out. `enterTransform` and `exitTransform` hand back the two
// positions to teleport between.
//
// ## What a room contains
//
// Shell, ceiling with lit panels, one real light (see the light budget in
// CLAUDE.md), a bench, the area's instrument with a live screen from
// screens.js, a printed case plate, a case stand that starts the question, and
// a door back to the town. The theme supplies what the instrument reads; this
// file never names an area.
import * as THREE from 'three';
import {
  mat, paintTexture, sheetFloorTexture, ceilingTileTexture, diffuserTexture, grainTexture,
  boardTexture,
} from './materials.js';
import { instrumentScreen, printedSheet, chalkboard, typedSheet } from './screens.js';
import { addCaseBeacon } from './caseBeacon.js';

/** Far enough along +x that the town is past the camera's far plane. */
export const DISTRICT_X = 4000;
const GAP = 60;               // between neighbouring rooms in the district

/**
 * How a room is built, as opposed to what is in it.
 *
 * Every interior in every game was the same room: white paint, sheet vinyl, a
 * suspended tile ceiling with lit diffusers. That is right for a Riverton
 * laboratory and wrong for a wooden building on a mesa in 1943, and a player
 * who walks into Project Y and recognises the Contaminated City's floor is a
 * player who has been told the two places are the same place.
 *
 * A theme sets `interiorStyle` in its manifest; `createInteriors` passes it
 * through. Nothing here names a game.
 */
const STYLES = {
  lab: {
    wall: '#e7e4dc', wallKind: 'paint',
    floor: 'sheet', floorTint: [206, 202, 192],
    ceiling: 'tiles', ceilingLight: 0xffffff,
    skirt: 0x5d6169, bench: 0xdedbd2, worktop: '#9aa0a6',
    instrument: 'screen',
  },
  // Board walls, a plank floor, open rafters and a hanging bulb: a wartime
  // building put up in a hurry, which is what every one of these was.
  timber: {
    wall: '#c8b088', wallKind: 'board',
    floor: 'plank', floorTint: '#8d6f4a',
    ceiling: 'rafters', ceilingLight: 0xffd9a0,
    skirt: 0x6b5334, bench: 0xa98b63, worktop: '#7d6242',
    instrument: 'chalk',
  },
  // A control room that has to preserve night vision: dark surfaces, red
  // service lighting, and screens as the only bright thing in the room. An
  // observatory is lit this way for a reason — white light at the eyepiece
  // costs twenty minutes of dark adaptation — and it looks like nowhere else.
  observatory: {
    // Lifted off near-black: at #2c2a30 the far wall of a deep room read as a hole
    // in the world rather than a dark wall.
    wall: '#3c3944', wallKind: 'paint',
    floor: 'sheet', floorTint: [38, 36, 42],
    ceiling: 'tiles', ceilingLight: 0xff3b24,
    skirt: 0x1c1a20, bench: 0x35323a, worktop: '#43404a',
    instrument: 'screen',
    // Dark paint under the engine's standard room lighting renders as a black
    // hole rather than a dark wall — the ceiling diffusers are emissive and light
    // nothing. `lift` scales the room's own hemisphere and ambient so the
    // surfaces read as surfaces while the palette stays night-adapted.
    lift: 1.7,
  },
  // Painted steel, deck matting, a low deckhead with strip lighting.
  steel: {
    wall: '#8d9a94', wallKind: 'paint',
    floor: 'sheet', floorTint: [92, 104, 100],
    ceiling: 'tiles', ceilingLight: 0xdfe9ff,
    skirt: 0x3c4a46, bench: 0x7c8a86, worktop: '#6b7772',
    instrument: 'screen',
  },
};

const DEFAULTS = {
  w: 13,        // across, as you look in from the door
  d: 11,        // deep
  h: 3.4,
  wall: 0.2,
  doorW: 1.6,
  doorH: 2.3,
};

/**
 * What KIND of room this is, as opposed to what it is made of.
 *
 * `STYLES` above fixed the materials per game and left every room in every game
 * the same shape: 13 × 11, bench on the back wall, screen centred over it, case
 * table at (2.3, 0.4). Six areas of a campaign meant six identical rooms, and a
 * player who has walked into one has walked into all of them — the case table is
 * in the same corner of the same box whether they are in a radar control room or
 * a consequences lab.
 *
 * So a room now has a layout as well as a style: its own footprint, which wall
 * the instrument is on, what furniture is in it, and where the case is waiting.
 * Five archetypes, because five distinguishable rooms is worth more than fifteen
 * that need a second look.
 *
 * Two rules every entry has to keep:
 *
 *   · The case table must be IN FRAME from the doorway. The player arrives at
 *     z = -d/2 + 1.5 looking down +z through a 66° field, so a stand at depth
 *     `z` may be no further off the centre line than 0.6 × (z + d/2 - 1.5).
 *     Break this and the table exists and is never found — it has happened once
 *     already, at 2.6 m out in an 11 m room.
 *   · Nothing within a metre of the doorway. Same rule as the outdoor spawn: a
 *     prop over where the player lands renders perfectly and eats the W key.
 */
const LAYOUTS = {
  // A watch floor: wide, shallow, low, and read from a row of panels. You stand
  // at the back of it and everything is in front of you at once.
  control: {
    metrics: { w: 15.5, d: 9.5, h: 3.1 },
    instrument: { wall: 'back', width: 2.0, count: 3, y: 1.85 },
    stand: { x: -2.2, z: 1.2, yaw: 0.42, kind: 'console' },
    fittings: ['benchBack', 'rack', 'cabinets', 'stools', 'clock', 'pinboard'],
  },
  // A long bay off a corridor: narrow, deep, worked down one side. The
  // instrument is on the side wall, so the room reads as a corridor of work
  // rather than a stage with a screen at the end of it.
  bay: {
    metrics: { w: 10, d: 15, h: 3.7 },
    instrument: { wall: 'left', width: 2.4, count: 1, y: 1.9 },
    stand: { x: 2.0, z: 0.8, yaw: -0.3, kind: 'table' },
    // The bench is on the instrument's own wall, under it — that is what a bay is,
    // one side worked along. Shelving faces it. `pinboardBack` because the far wall
    // of a 15 m room is what the player looks straight at on the way in, and in a
    // bay the instrument is not on it.
    fittings: ['benchLeft', 'shelves', 'sink', 'crates', 'stools', 'cart', 'pinboardBack'],
  },
  // Somebody's office. Small, a desk you sit at rather than a bench you stand
  // at, and paper in cabinets instead of samples in crates.
  office: {
    metrics: { w: 9.5, d: 8.5, h: 2.9 },
    instrument: { wall: 'back', width: 1.5, count: 1, y: 1.8 },
    stand: { x: -1.6, z: 0.9, yaw: 0.18, kind: 'desk' },
    fittings: ['cabinets', 'planChest', 'pinboard', 'clock', 'stools'],
  },
  // A high bay with the roll-up door: pallets on the floor, a tool board, and
  // the instrument turned to the wall you work along.
  workshop: {
    metrics: { w: 14, d: 12, h: 4.2 },
    instrument: { wall: 'right', width: 2.2, count: 1, y: 1.95 },
    stand: { x: -2.6, z: 0.6, yaw: 0.85, kind: 'trestle' },
    fittings: ['benchBack', 'toolboard', 'pallets', 'crates', 'cart', 'sink'],
  },
  // Stacks. Two runs of shelving down the room, which is the only layout here
  // where the walls are not the point.
  archive: {
    metrics: { w: 11.5, d: 12.5, h: 3.3 },
    instrument: { wall: 'back', width: 1.6, count: 1, y: 1.85 },
    stand: { x: 2.4, z: -0.4, yaw: -0.55, kind: 'table' },
    fittings: ['stacks', 'lockers', 'planChest', 'crates'],
  },
};

/** Deterministic hash of a room id — same room, same layout, every session. */
function seedOf(id){
  let h = 2166136261;
  for(const ch of String(id ?? '')){ h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/** A seeded generator, so a room's variation is stable but not shared. */
function rngOf(seed){
  let s = (seed || 1) >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Which layout this room gets.
 *
 * The theme may say (`layout:` on the interiors entry). Failing that it is read
 * off what the room is ABOUT — a coordination desk is a watch floor, a
 * photometry bench is a bay, a plate archive is stacks — because the room should
 * match its subject and no book has to learn a new field for that to happen.
 * Failing even that, the id decides, which at least makes six areas six rooms.
 */
function pickLayout(spec, rand){
  if(spec.layout && LAYOUTS[spec.layout]) return spec.layout;
  // The room's NAME and the instrument's, and nothing else. The caption was in
  // here for one revision and it is a sentence of prose: "collapse an orbit that a
  // month of imaging cannot" made the radar control room a laboratory bay.
  // `placeName` is the building the player walks into — "Planetary Radar Control"
  // — which is the most specific thing anybody has written down about this room.
  const text = [spec.placeName, spec.name, spec.station?.title]
    .filter(Boolean).join(' ').toLowerCase();
  if(/control|coordination|watch|ops|operations|command|dispatch/.test(text)) return 'control';
  if(/archive|record|plate|library|store|stock|supply/.test(text)) return 'archive';
  if(/shop|machine|fabricat|maintenance|engineer|hangar|garage|assembly/.test(text)) return 'workshop';
  // A laboratory is a bay or a high-bay workshop depending on the room. Split by
  // seed: a campaign whose six areas are all "lab" would otherwise be six of the
  // same room again, which is the whole thing this is here to stop.
  if(/bench|lab|assay|sample|photometry|spectro|chemistry|analysis|imaging|scope|dome/.test(text)){
    return rand() < 0.5 ? 'bay' : 'workshop';
  }
  if(/office|planning|policy|brief|liaison|budget|desk/.test(text)) return 'office';
  const keys = Object.keys(LAYOUTS);
  return keys[Math.floor(rand() * keys.length)];
}

/**
 * Build one interior. Returns everything the caller needs to enter it, collide
 * with it and take it down again — it registers nothing globally, because a
 * module that pushes into someone else's arrays is a module you cannot test.
 */
export function buildInteriorBuilding(scene, spec){
  // Per-room variation, from the room's own id: the layout, and which way round
  // it is built. Seeded rather than random because a room that reshuffles itself
  // between visits is a room the player stops trusting — and because the
  // interior district's rooms are built lazily, on first entry, in no fixed
  // order, so Math.random() would give a different game every session.
  const rand = rngOf(seedOf(spec.id ?? spec.name));
  const L = LAYOUTS[pickLayout(spec, rand)] ?? LAYOUTS.control;
  // Mirrored in x for half of them. Cheapest diversity there is: the same
  // layout with the bench and the case table on the other hand does not read as
  // the same room from the doorway.
  const flip = rand() < 0.5 ? -1 : 1;
  const P = { ...DEFAULTS, ...L.metrics, ...spec.metrics };
  const S = { ...STYLES.lab, ...(STYLES[spec.style] ?? {}), ...(spec.styleOverrides ?? {}) };
  // Declared here because the fit-out is built before the instrument is, and
  // every fitting in the room asks the same question: chalk, or a screen?
  const isChalk = S.instrument === 'chalk';
  const index = spec.index ?? 0;
  const ox = DISTRICT_X + index * GAP;      // room origin, x
  const oz = 0;
  const accent = new THREE.Color(spec.colour ?? 0x5b6068);

  const group = new THREE.Group();
  group.position.set(ox, 0, oz);
  scene.add(group);
  const colliders = [];
  const interactables = [];
  const add = (m) => { group.add(m); return m; };

  const x0 = -P.w / 2, x1 = P.w / 2, z0 = -P.d / 2, z1 = P.d / 2;

  /** Mirror: `flip` is -1 for the half of the rooms built the other way round. */
  const mx = (x) => x * flip;
  /** A wall name after mirroring — left and right swap, back stays back. */
  const side = (wall) => (flip > 0 ? wall : wall === 'left' ? 'right' : wall === 'right' ? 'left' : wall);
  /** A collision box for something standing on the floor, in world space. */
  const solid = (cx, cz, sw, sh, sd) => colliders.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(ox + cx, sh / 2, oz + cz), new THREE.Vector3(sw, sh, sd)));
  /**
   * A point on a wall: `u` along it, `y` up it. `rotY` is what turns a plane to
   * face into the room — the same plane on a side wall faces the wrong way
   * without it, and a dark instrument face seen from behind is a black hole in
   * the wall (see the DoubleSide rule in CLAUDE.md).
   */
  const onWall = (wall, u, y, off = 0.06) => {
    const inset = P.wall / 2 + off;
    if(wall === 'left')  return { x: x0 + inset, y, z: u, rotY: Math.PI / 2 };
    if(wall === 'right') return { x: x1 - inset, y, z: u, rotY: -Math.PI / 2 };
    return { x: u, y, z: z1 - inset, rotY: Math.PI };
  };
  /** How far along a wall it runs, so a fitting can size itself to the room. */
  const wallSpan = (wall) => (wall === 'back' ? P.w : P.d);

  // ---------------------------------------------------------------- shell
  const floorTex = S.floor === 'plank'
    ? grainTexture(S.floorTint)
    : sheetFloorTexture(S.floorTint, 0.55);
  floorTex.repeat.set(P.w / 2.4, P.d / 2.4);
  const floor = add(new THREE.Mesh(
    new THREE.PlaneGeometry(P.w, P.d),
    new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.82, metalness: 0.0, envMapIntensity: 0.35 })
  ));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  const wallMat = () => mat(`int-wall-${S.wallKind}-${S.wall}`, () => new THREE.MeshStandardMaterial({
    map: S.wallKind === 'board' ? boardTexture(S.wall) : paintTexture(S.wall),
    roughness: 0.92, metalness: 0.0, envMapIntensity: 0.3,
  }));
  const baseMat = () => mat(`int-base-${S.skirt}`, () => new THREE.MeshStandardMaterial({
    color: S.skirt, roughness: 0.7, metalness: 0.05, envMapIntensity: 0.3,
  }));

  /** A wall panel with its collider. `skip` leaves a doorway hole. */
  const wallRun = (ax, az, bx, bz) => {
    const len = Math.hypot(bx - ax, bz - az);
    const cx = (ax + bx) / 2, cz = (az + bz) / 2;
    const along = Math.abs(bx - ax) > Math.abs(bz - az);
    const m = add(new THREE.Mesh(
      new THREE.BoxGeometry(along ? len : P.wall, P.h, along ? P.wall : len), wallMat()));
    m.position.set(cx, P.h / 2, cz);
    m.receiveShadow = true;
    const bw = along ? len : P.wall, bd = along ? P.wall : len;
    colliders.push(new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(ox + cx, P.h / 2, oz + cz), new THREE.Vector3(bw, P.h, bd)));
    // Skirting, so the wall meets the floor in a line rather than a seam.
    const sk = add(new THREE.Mesh(
      new THREE.BoxGeometry(along ? len : P.wall + 0.02, 0.14, along ? P.wall + 0.02 : len), baseMat()));
    sk.position.set(cx, 0.07, cz);
    return m;
  };

  // Three solid walls and a front wall split around the doorway. The door is
  // on -z, which is where the player arrives facing +z, into the room.
  wallRun(x0, z1, x1, z1);
  wallRun(x0, z0, x0, z1);
  wallRun(x1, z0, x1, z1);
  const half = (P.w - P.doorW) / 2;
  wallRun(x0, z0, x0 + half, z0);
  wallRun(x1 - half, z0, x1, z0);
  // Header over the doorway, so the opening reads as a door and not a gap.
  const header = add(new THREE.Mesh(
    new THREE.BoxGeometry(P.doorW, P.h - P.doorH, P.wall), wallMat()));
  header.position.set(0, P.doorH + (P.h - P.doorH) / 2, z0);

  // Ceiling. A suspended tile grid with lit diffusers for a laboratory or a
  // boat; open rafters and a hanging bulb for a building that was put up in a
  // fortnight in 1943. Both are emissive rather than lit — see the light budget
  // in CLAUDE.md — so neither costs a real light.
  if(S.ceiling === 'rafters'){
    const boardTex = grainTexture(typeof S.floorTint === 'string' ? S.floorTint : '#7a6244');
    boardTex.repeat.set(P.w / 2.4, P.d / 2.4);
    const deck = add(new THREE.Mesh(
      new THREE.PlaneGeometry(P.w, P.d),
      new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.96, envMapIntensity: 0.16 })));
    deck.rotation.x = Math.PI / 2;
    deck.position.y = P.h - 0.06;
    const beamMat = mat(`int-beam-${S.skirt}`, () => new THREE.MeshStandardMaterial({
      color: S.skirt, roughness: 0.85, envMapIntensity: 0.2 }));
    const beams = Math.max(4, Math.round(P.d / 2.4));
    for(let i = 0; i <= beams; i++){
      const beam = add(new THREE.Mesh(new THREE.BoxGeometry(P.w - 0.1, 0.16, 0.12), beamMat));
      beam.position.set(0, P.h - 0.16, -P.d / 2 + (i / beams) * P.d);
    }
    // Bulbs on flexes — one every four metres of room. A single bulb was fine in
    // an 11 m room and leaves a 15 m one with a black wall at the far end.
    const bulbs = Math.max(1, Math.round(P.d / 4.5));
    for(let i = 0; i < bulbs; i++){
      const bz = bulbs === 1 ? 0 : -P.d / 2 + (i + 1) * (P.d / (bulbs + 1));
      const flex = add(new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 6),
        new THREE.MeshStandardMaterial({ color: 0x2b2620, roughness: 0.9 })));
      flex.position.set(0, P.h - 0.45, bz);
      const bulb = add(new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10),
        new THREE.MeshStandardMaterial({ color: 0xfff0d0, emissive: S.ceilingLight,
          emissiveIntensity: 2.2, roughness: 0.4 })));
      bulb.position.set(0, P.h - 0.72, bz);
      const shade = add(new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.18, 16, 1, true),
        new THREE.MeshStandardMaterial({ color: 0x3a3229, roughness: 0.8, side: THREE.DoubleSide })));
      shade.position.set(0, P.h - 0.6, bz);
    }
  } else {
    const ceilTex = ceilingTileTexture(4);
    ceilTex.repeat.set(P.w / 2.4, P.d / 2.4);
    const ceiling = add(new THREE.Mesh(
      new THREE.PlaneGeometry(P.w, P.d),
      new THREE.MeshStandardMaterial({ map: ceilTex, roughness: 0.95, envMapIntensity: 0.2 })
    ));
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = P.h - 0.35;
    const panelMat = new THREE.MeshStandardMaterial({
      map: diffuserTexture(), emissive: S.ceilingLight, emissiveIntensity: 1.15,
      color: 0xffffff, roughness: 0.6,
    });
    // A grid of diffusers sized to the room, not the two panels every room used
    // to get: two of them in a 15 m bay left the far third of it unlit, and in a
    // dark-surfaced control room that reads as a black void rather than a wall.
    const rows = Math.max(2, Math.round(P.d / 3.6));
    const cols = Math.max(1, Math.round(P.w / 5.5));
    for(let r = 0; r < rows; r++){
      for(let c = 0; c < cols; c++){
        const p = add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.7), panelMat));
        p.rotation.x = Math.PI / 2;
        p.position.set(
          cols === 1 ? 0 : -P.w / 2 + (c + 1) * (P.w / (cols + 1)),
          P.h - 0.352,
          -P.d / 2 + (r + 1) * (P.d / (rows + 1)));
      }
    }
  }
  // No point light at all: a hemisphere, a little ambient and whatever the
  // ceiling is emitting. One real light hung in a room this small burns a
  // bright pool into the surface directly above it.
  const lift = S.lift ?? 1;
  const light = new THREE.HemisphereLight(
    S.ceiling === 'rafters' ? 0xf3e3c6 : 0xf6f8fa, 0x8f8d86,
    (S.ceiling === 'rafters' ? 0.95 : 1.15) * lift);
  add(light);
  const fill = new THREE.AmbientLight(0xfff3e2, (S.ceiling === 'rafters' ? 0.42 : 0.35) * lift);
  add(fill);

  // ------------------------------------------------------------- fit-out
  //
  // The layout says WHICH fittings; each fitting knows how to build itself. That
  // split is the point of this section: a new kind of room is a list of names in
  // LAYOUTS, not another hundred lines of furniture.
  //
  // Fittings that stand against a wall are built through `against()`, in a local
  // frame where +x runs along the wall and +z points into the room, so not one of
  // them has to know which wall it ended up on or which way the room is mirrored.
  const bandColour = isChalk
    ? accent.clone().lerp(new THREE.Color(0x6b4f30), 0.5)
    : accent;
  /** Painted metal in a modern room, planed timber in a 1943 one. */
  const caseMat = (hex, colour) => isChalk
    ? new THREE.MeshStandardMaterial({ map: grainTexture(hex), roughness: 0.9 })
    : new THREE.MeshStandardMaterial({ color: colour, roughness: 0.6, metalness: 0.12 });

  function against(wall, u = 0){
    const w = side(wall);
    const g = new THREE.Group();
    const inset = P.wall / 2;
    if(w === 'back'){ g.position.set(mx(u), 0, z1 - inset); g.rotation.y = Math.PI; }
    else if(w === 'left'){ g.position.set(x0 + inset, 0, u); g.rotation.y = Math.PI / 2; }
    else { g.position.set(x1 - inset, 0, u); g.rotation.y = -Math.PI / 2; }
    add(g);
    const cos = Math.cos(g.rotation.y), sin = Math.sin(g.rotation.y);
    const turned = Math.abs(sin) > 0.5;
    return {
      wall: w,
      span: wallSpan(w),
      /** A mesh in the wall's own frame. */
      mesh(geo, material, lx, ly, lz){
        const m = new THREE.Mesh(geo, material);
        m.position.set(lx, ly, lz);
        m.castShadow = true;
        g.add(m);
        return m;
      },
      /** A collider for a local box. The room's boxes are axis-aligned in world
       *  space, so a fitting on a side wall has its width and depth swapped. */
      block(lx, lz, lw, lh, ld){
        const x = g.position.x + lx * cos + lz * sin;
        const z = g.position.z - lx * sin + lz * cos;
        solid(x, z, turned ? ld : lw, lh, turned ? lw : ld);
      },
    };
  }

  /** Counter along a wall: carcass, worktop, and the area's colour on the front. */
  function benchAlong(wall){
    const f = against(wall);
    const span = Math.min(f.span - 2.6, 9.6);
    const D = 0.78;
    f.mesh(new THREE.BoxGeometry(span, 0.86, D),
      new THREE.MeshStandardMaterial({ color: S.bench, roughness: 0.7, envMapIntensity: 0.3 }),
      0, 0.43, D / 2 + 0.02);
    f.mesh(new THREE.BoxGeometry(span + 0.1, 0.06, D + 0.08),
      new THREE.MeshStandardMaterial({ map: grainTexture(S.worktop), roughness: 0.45, envMapIntensity: 0.4 }),
      0, 0.89, D / 2 + 0.02);
    // The area's colour as a painted band, so the room is placeable at a glance.
    // Knocked back toward the timber in a 1943 room: a saturated stripe there
    // reads as modern colour-coding.
    f.mesh(new THREE.BoxGeometry(span, 0.07, 0.02),
      new THREE.MeshStandardMaterial({ color: bandColour, roughness: isChalk ? 0.85 : 0.6 }),
      0, 0.80, D + 0.04);
    for(let i = 0; i < 6; i++){
      f.mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.13, 8),
        new THREE.MeshStandardMaterial({
          color: isChalk ? (i % 3 ? 0xd8cfae : 0xbfae86) : (i % 3 ? 0xc2434b : 0xd8c94a),
          roughness: isChalk ? 0.6 : 0.4 }),
        -1.4 + i * 0.17, 0.985, D / 2);
    }
    f.block(0, D / 2 + 0.02, span, 0.9, D + 0.1);
  }

  /** Open shelving with boxes on it. */
  function shelfRun(wall, u, bays = 3){
    const f = against(wall, u);
    const W = bays * 1.05, H = 2.05, D = 0.46;
    const frame = caseMat('#7a5c3c', 0x9aa1a8);
    for(const sx of [-W / 2, W / 2]) f.mesh(new THREE.BoxGeometry(0.06, H, D), frame, sx, H / 2, D / 2 + 0.04);
    for(let i = 0; i < 5; i++){
      f.mesh(new THREE.BoxGeometry(W, 0.04, D), frame, 0, 0.28 + i * 0.44, D / 2 + 0.04);
      for(let b = 0; b < bays; b++){
        if((i + b) % 3 === 0) continue;                     // gaps, or it reads as a wall
        f.mesh(new THREE.BoxGeometry(0.62, 0.28, 0.34),
          caseMat('#8a6a44', (i + b) % 2 ? 0xb9bdc2 : 0xa7adb3),
          -W / 2 + 0.53 + b * 1.05, 0.46 + i * 0.44, D / 2 + 0.04);
      }
    }
    f.block(0, D / 2 + 0.04, W, H, D + 0.08);
  }

  /** Two runs of shelving down the middle of the room — the archive layout. */
  function stacks(){
    const H = 2.15, D = 0.5, len = P.d - 4.6;
    const frame = caseMat('#7a5c3c', 0x9aa1a8);
    for(const sx of [mx(-2.4), mx(2.4)]){
      for(const sz of [-len / 2, len / 2]){
        const post = add(new THREE.Mesh(new THREE.BoxGeometry(D, H, 0.06), frame));
        post.position.set(sx, H / 2, sz + 0.6);
      }
      for(let i = 0; i < 5; i++){
        const shelf = add(new THREE.Mesh(new THREE.BoxGeometry(D, 0.04, len), frame));
        shelf.position.set(sx, 0.3 + i * 0.45, 0.6);
        for(let b = 0; b < 6; b++){
          if((i + b) % 4 === 0) continue;
          const boxm = add(new THREE.Mesh(new THREE.BoxGeometry(D - 0.1, 0.3, 0.5),
            caseMat('#8a6a44', (i + b) % 2 ? 0xb9bdc2 : 0x9fa5ab)));
          boxm.position.set(sx, 0.48 + i * 0.45, -len / 2 + 0.6 + b * (len / 6) + 0.4);
        }
      }
      solid(sx, 0.6, D + 0.06, H, len + 0.1);
    }
  }

  /** Tall lockers or a cupboard run. */
  function lockers(wall, u){
    const f = against(wall, u);
    const W = 1.9, H = 1.95, D = 0.42;
    f.mesh(new THREE.BoxGeometry(W, H, D), caseMat('#6b5334', 0x8d979e), 0, H / 2, D / 2 + 0.03);
    for(const sx of [-W / 4, W / 4]){
      f.mesh(new THREE.BoxGeometry(0.03, H - 0.16, 0.02), caseMat('#5a4529', 0x6f797f), sx, H / 2, D + 0.04);
      f.mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8), caseMat('#4a3a22', 0x5c6469), sx + 0.28, 1.05, D + 0.05);
    }
    f.block(0, D / 2 + 0.03, W, H, D + 0.06);
  }

  /** Filing cabinets, drawer fronts and all. */
  function cabinets(wall, u){
    const f = against(wall, u);
    for(const sx of [-0.36, 0.36]){
      f.mesh(new THREE.BoxGeometry(0.62, 1.32, 0.6), caseMat('#6b5334', 0x7f888f), sx, 0.66, 0.36);
      for(let i = 0; i < 4; i++){
        f.mesh(new THREE.BoxGeometry(0.5, 0.02, 0.02), caseMat('#4a3a22', 0x5c6469), sx, 0.24 + i * 0.32, 0.67);
      }
    }
    f.block(0, 0.36, 1.4, 1.34, 0.66);
  }

  /** A plan chest: wide, low, and the flattest surface in the room. */
  function planChest(wall, u){
    const f = against(wall, u);
    const W = 1.7, H = 0.82, D = 1.05;
    f.mesh(new THREE.BoxGeometry(W, H, D), caseMat('#8a6a44', 0x8b949b), 0, H / 2, D / 2 + 0.04);
    for(let i = 0; i < 5; i++){
      f.mesh(new THREE.BoxGeometry(W - 0.1, 0.02, 0.02), caseMat('#4a3a22', 0x5c6469), 0, 0.14 + i * 0.15, D + 0.05);
    }
    // Rolled sheets on top, because a plan chest with nothing on it is a box.
    for(let i = 0; i < 3; i++){
      const roll = f.mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.9, 10),
        new THREE.MeshStandardMaterial({ color: isChalk ? 0xe6dcc0 : 0xf1efe8, roughness: 0.9 }),
        -0.3 + i * 0.22, H + 0.05, D / 2 + 0.04);
      roll.rotation.z = Math.PI / 2;
      roll.rotation.y = 0.06 * i;
    }
    f.block(0, D / 2 + 0.04, W, H, D + 0.08);
  }

  /** An equipment rack. Emissive indicator strip only — never a real light. */
  function rack(wall, u){
    const f = against(wall, u);
    const W = 0.78, H = 1.95, D = 0.7;
    f.mesh(new THREE.BoxGeometry(W, H, D),
      new THREE.MeshStandardMaterial({ color: isChalk ? 0x4a3a22 : 0x2b3138, roughness: 0.6, metalness: 0.25 }),
      0, H / 2, D / 2 + 0.03);
    for(let i = 0; i < 7; i++){
      f.mesh(new THREE.BoxGeometry(W - 0.1, 0.18, 0.02),
        new THREE.MeshStandardMaterial({ color: isChalk ? 0x6b5334 : 0x3c444c, roughness: 0.55, metalness: 0.2 }),
        0, 0.3 + i * 0.23, D + 0.04);
      if(i % 2) f.mesh(new THREE.BoxGeometry(0.1, 0.03, 0.01),
        new THREE.MeshStandardMaterial({ color: 0x8fe8a0, emissive: 0x38c060, emissiveIntensity: 1.4 }),
        W / 2 - 0.14, 0.3 + i * 0.23, D + 0.05);
    }
    f.block(0, D / 2 + 0.03, W, H, D + 0.06);
  }

  /** A tool board: pegboard and the outlines of what hangs on it. */
  function toolboard(wall, u){
    const f = against(wall, u);
    f.mesh(new THREE.BoxGeometry(2.2, 1.2, 0.05),
      new THREE.MeshStandardMaterial({ map: grainTexture(isChalk ? '#8a6a44' : '#6d5a44'), roughness: 0.9 }),
      0, 1.55, 0.04);
    for(let i = 0; i < 7; i++){
      const l = 0.2 + (i % 3) * 0.12;
      f.mesh(new THREE.BoxGeometry(0.045, l, 0.03),
        new THREE.MeshStandardMaterial({ color: i % 2 ? 0x8d9299 : 0x3f4b55, roughness: 0.5, metalness: 0.3 }),
        -0.9 + i * 0.3, 1.75 - l / 2, 0.08);
    }
  }

  /** A sink and a tap, which is what makes a bench a working bench. */
  function sink(wall, u){
    const f = against(wall, u);
    f.mesh(new THREE.BoxGeometry(0.66, 0.86, 0.62), caseMat('#8a6a44', 0xb7bdc2), 0, 0.43, 0.34);
    f.mesh(new THREE.BoxGeometry(0.56, 0.06, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x9aa2a8, roughness: 0.35, metalness: 0.5 }), 0, 0.87, 0.34);
    const spout = f.mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.34, 8),
      new THREE.MeshStandardMaterial({ color: 0xb9c0c6, roughness: 0.3, metalness: 0.6 }), 0, 1.07, 0.56);
    spout.rotation.x = 0.5;
    f.block(0, 0.34, 0.7, 0.9, 0.66);
  }

  /** A cork board with paper pinned to it — the wall of a room people work in. */
  function pinboard(wall, u){
    const f = against(wall, u);
    f.mesh(new THREE.BoxGeometry(1.7, 1.1, 0.04),
      new THREE.MeshStandardMaterial({ color: isChalk ? 0x9a7f52 : 0xb08a5a, roughness: 0.95 }), 0, 1.6, 0.03);
    for(let i = 0; i < 6; i++){
      const pw = 0.2 + (i % 3) * 0.06, ph = 0.26 + (i % 2) * 0.05;
      const p = f.mesh(new THREE.PlaneGeometry(pw, ph),
        new THREE.MeshStandardMaterial({ color: isChalk ? 0xece2c8 : 0xf6f4ee, roughness: 0.94 }),
        -0.62 + (i % 3) * 0.6, 1.82 - Math.floor(i / 3) * 0.42, 0.06);
      p.rotation.z = ((i * 37) % 11 - 5) * 0.012;
    }
  }

  /** A wall clock. One object, and the room is somewhere people keep time. */
  function clock(wall, u){
    const f = against(wall, u);
    f.mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.05, 20),
      caseMat('#4a3a22', 0x2f353b), 0, 2.35, 0.05).rotation.x = Math.PI / 2;
    const faceM = f.mesh(new THREE.CircleGeometry(0.16, 20),
      new THREE.MeshStandardMaterial({ color: 0xf4f2ea, roughness: 0.7 }), 0, 2.35, 0.08);
    faceM.rotation.y = 0;
    for(const [len, ang] of [[0.12, 1.1], [0.08, -0.6]]){
      const hand = f.mesh(new THREE.BoxGeometry(0.012, len, 0.008),
        new THREE.MeshStandardMaterial({ color: 0x22262a, roughness: 0.6 }),
        Math.sin(ang) * len / 2, 2.35 + Math.cos(ang) * len / 2, 0.09);
      hand.rotation.z = -ang;
    }
  }

  /** Stools, at whatever the room's working surface is. */
  function stools(atX, atZ){
    for(const [i, dx] of [-0.55, 0.62].entries()){
      const sx = mx(atX + dx), sz = atZ + (i ? 0.12 : -0.08);
      const seat = add(new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.15, 0.06, 12),
        new THREE.MeshStandardMaterial({ color: isChalk ? 0x8a6a44 : 0x3f4b55, roughness: isChalk ? 0.88 : 0.6 })));
      seat.position.set(sx, 0.62, sz);
      // A wooden stool has legs, not a chromed column.
      if(isChalk){
        for(const [lx, lz] of [[-0.12, -0.12], [0.12, -0.12], [-0.12, 0.12], [0.12, 0.12]]){
          const leg = add(new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.6, 6),
            new THREE.MeshStandardMaterial({ color: 0x6b4f30, roughness: 0.88 })));
          leg.position.set(sx + lx, 0.31, sz + lz);
        }
      } else {
        const stem = add(new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 0.6, 8),
          new THREE.MeshStandardMaterial({ color: 0x8d9299, roughness: 0.5, metalness: 0.3 })));
        stem.position.set(sx, 0.31, sz);
      }
    }
  }

  /** Crates on the floor, stacked the way crates are. */
  function crates(atX, atZ){
    for(let i = 0; i < 3; i++){
      const c = add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.42),
        new THREE.MeshStandardMaterial({
          color: isChalk ? (i % 2 ? 0x8a6a44 : 0x74563a) : (i % 2 ? 0xb4b8bd : 0xa4aab0),
          map: isChalk ? grainTexture('#8a6a44') : null,
          roughness: isChalk ? 0.9 : 0.8 })));
      c.position.set(mx(atX), 0.18 + (i % 2) * 0.37, atZ - i * 0.55);
      c.castShadow = true;
    }
    solid(mx(atX), atZ - 0.55, 0.55, 0.75, 1.7);
  }

  /** Pallets with sacks on them: the floor of a high bay. */
  function pallets(atX, atZ){
    for(let i = 0; i < 2; i++){
      const px = mx(atX), pz = atZ - i * 1.5;
      const deck = add(new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.14, 1.0),
        new THREE.MeshStandardMaterial({ map: grainTexture('#8a6a44'), roughness: 0.95 })));
      deck.position.set(px, 0.07, pz);
      for(let s = 0; s < 3; s++){
        const sack = add(new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.26, 0.8),
          new THREE.MeshStandardMaterial({ color: s % 2 ? 0xbfb49a : 0xa89d84, roughness: 0.95 })));
        sack.position.set(px, 0.27 + s * 0.26, pz);
        sack.rotation.y = 0.05 * (s - 1);
      }
      solid(px, pz, 1.3, 1.1, 1.1);
    }
  }

  /** A trolley, parked. */
  function cart(atX, atZ){
    const c = add(new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.9, 0.46),
      isChalk
        ? new THREE.MeshStandardMaterial({ map: grainTexture('#7a5c3c'), roughness: 0.9 })
        : new THREE.MeshStandardMaterial({ color: 0xcfd3d6, roughness: 0.55, metalness: 0.15 })));
    c.position.set(mx(atX), 0.45, atZ);
    c.castShadow = true;
    solid(mx(atX), atZ, 0.7, 0.9, 0.54);
  }

  // Where each named fitting goes. Positions are in the room's own frame and are
  // mirrored with it; the wall names are too, so 'left' means "the side the
  // instrument is not on" for half the rooms and the room still makes sense.
  const FITTINGS = {
    benchBack:  () => benchAlong('back'),
    benchLeft:  () => benchAlong('left'),
    benchRight: () => benchAlong('right'),
    // Facing the bay's bench, not sharing its wall with the instrument.
    shelves:    () => shelfRun('right', P.d / 2 - 3.0),
    stacks,
    lockers:    () => lockers('right', -P.d / 2 + 2.6),
    cabinets:   () => cabinets('left', -P.d / 2 + 2.2),
    planChest:  () => planChest('right', P.d / 2 - 2.4),
    rack:       () => rack('right', P.d / 2 - 1.6),
    toolboard:  () => toolboard('left', 0.6),
    sink:       () => sink('back', -P.w / 2 + 1.4),
    pinboard:   () => pinboard('left', -P.d / 2 + 3.4),
    pinboardBack: () => pinboard('back', 0),
    clock:      () => clock('back', P.w / 2 - 1.2),
    stools:     () => stools(L.stand.x, L.stand.z - 1.0),
    crates:     () => crates(-P.w / 2 + 0.9, P.d / 2 - 1.9),
    pallets:    () => pallets(-P.w / 2 + 1.4, P.d / 2 - 2.2),
    cart:       () => cart(-P.w / 2 + 1.5, -1.4),
  };
  for(const name of L.fittings ?? []) FITTINGS[name]?.();

  // ------------------------------------------------------- the instrument
  //
  // WHICH WALL is the layout's. A watch floor reads a row of panels on the wall
  // you face walking in; a bay reads one screen on the wall it is worked along,
  // which is what stops every room in the game being a stage with a screen at the
  // back of it.
  //
  // WHAT IT IS is still the theme's: a lit panel, or a blackboard in a building
  // put up in a fortnight in 1943, where a glowing display would be the loudest
  // anachronism in the game.
  const screen = isChalk
    ? chalkboard({ ...(spec.station ?? {}), patient: spec.caseName }, { w: 512, h: 320 })
    : instrumentScreen({ ...(spec.station ?? {}), patient: spec.caseName }, { w: 512, h: 320 });
  const IW = side(L.instrument?.wall ?? 'back');
  const SW = (L.instrument?.width ?? 1.9) * (isChalk ? 1.3 : 1), SH = SW * (320 / 512);
  const SY = L.instrument?.y ?? 1.95;
  // A screen flat on a SIDE wall is edge-on from the doorway — invisible on
  // arrival, which is the one thing the instrument may not be. Two things fix
  // that: it goes at the FAR end of that wall, where the view cone from the door
  // is wide enough to contain it, and it is turned a quarter toward the door on a
  // bracket standing off the wall. Near the door instead — which was the first
  // attempt — it sits beside the player's shoulder and is no more visible than
  // flat on the wall was.
  const sideMounted = IW !== 'back';
  const IU = sideMounted ? P.d / 2 - 3.6 : 0;
  const ITILT = sideMounted ? (IW === 'left' ? 0.46 : -0.46) : 0;
  /** Put something flat on the instrument's wall: `u` along it, `y` up it. */
  const put = (mesh, u, y, off = 0.06) => {
    const at = onWall(IW, IU + u, y, off + (sideMounted ? 0.16 : 0));
    mesh.position.set(at.x, at.y, at.z);
    mesh.rotation.y = at.rotY + ITILT;
    return mesh;
  };
  const face = put(add(new THREE.Mesh(
    new THREE.PlaneGeometry(SW, SH),
    isChalk
      ? new THREE.MeshStandardMaterial({ map: screen.texture, roughness: 0.96, metalness: 0.0,
                                         envMapIntensity: 0.18 })
      : new THREE.MeshStandardMaterial({
          map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
          emissiveIntensity: 0.6, roughness: 0.28, envMapIntensity: 0.25,
        }))), 0, SY);
  put(add(new THREE.Mesh(
    new THREE.BoxGeometry(SW + (isChalk ? 0.16 : 0.09), SH + (isChalk ? 0.16 : 0.09), 0.06),
    new THREE.MeshStandardMaterial({
      color: isChalk ? 0x6b4f30 : 0x20262b,
      roughness: isChalk ? 0.85 : 0.5, metalness: isChalk ? 0.0 : 0.3 }))), 0, SY, 0.02);
  // Neighbouring positions on a multi-panel wall are DARK, not copies of the live
  // one: three canvases of the same readout is a video wall, and repainting them
  // costs three times as much for a picture the player has already read.
  for(let i = 1; i < (L.instrument?.count ?? 1); i++){
    const u = (i % 2 ? 1 : -1) * Math.ceil(i / 2) * (SW + 0.26);
    put(add(new THREE.Mesh(
      new THREE.PlaneGeometry(SW, SH),
      new THREE.MeshStandardMaterial({
        color: isChalk ? 0x2f2a22 : 0x11161c, roughness: isChalk ? 0.95 : 0.4,
        emissive: isChalk ? 0x000000 : accent.clone().multiplyScalar(0.12),
        emissiveIntensity: isChalk ? 0 : 0.5 }))), u, SY);
    put(add(new THREE.Mesh(
      new THREE.BoxGeometry(SW + 0.09, SH + 0.09, 0.06),
      new THREE.MeshStandardMaterial({ color: isChalk ? 0x6b4f30 : 0x20262b, roughness: 0.6 }))),
      u, SY, 0.02);
  }
  if(isChalk){
    // A chalk rail, with chalk on it. Nothing else says blackboard so quickly.
    put(add(new THREE.Mesh(new THREE.BoxGeometry(SW + 0.16, 0.05, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x6b4f30, roughness: 0.85 }))), 0, SY - SH / 2 - 0.07, 0.08);
    for(let i = 0; i < 3; i++){
      const stick = put(add(new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.08, 6),
        new THREE.MeshStandardMaterial({ color: 0xf2f0e6, roughness: 0.95 }))),
        -0.35 + i * 0.28, SY - SH / 2 - 0.03, 0.1);
      stick.rotation.z = Math.PI / 2;
    }
    put(add(new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.07),
      new THREE.MeshStandardMaterial({ color: 0x4a4038, roughness: 0.95 }))),
      SW / 2 - 0.24, SY - SH / 2 - 0.02, 0.1);
  }

  // The case plate, under the screen. Paper, because it is the one thing in
  // the room about a situation rather than a measurement.
  const sheet_ = isChalk ? typedSheet : printedSheet;
  const plate = sheet_({
    accent: '#' + accent.getHexString(), tag: spec.code ?? '', title: 'Case',
    heading: spec.caseName ?? spec.name ?? '', body: spec.caseLine ?? '',
    footer: spec.caption ?? '',
  }, { w: 512, h: 320 });
  const PW = 0.9, PH = PW * (320 / 512);
  put(add(new THREE.Mesh(
    new THREE.PlaneGeometry(PW, PH),
    new THREE.MeshStandardMaterial({ map: plate.texture, roughness: 0.6, envMapIntensity: 0.35 }))),
    0, SY - SH / 2 - PH / 2 - 0.09);

  // ---------------------------------------------------------- the case table
  // This used to be a podium: a chromed post with a clipboard tilted on top of
  // it, which is a lectern, and nobody in a laboratory or a wartime office ever
  // read a case off a lectern. It is a work table now, with the papers left on
  // it the way papers are left — the case sheet square-ish in the middle, the
  // rest fanned around it at whatever angle they landed.
  //
  // WHERE it stands is the layout's, mirrored with the room, and every layout
  // keeps the same rule: off the centre line so it is not between the player and
  // the instrument, and inside the 66° field from the doorway so it is in frame on
  // arrival. At 2.6 m off centre in an 11 m room it was outside that field and
  // nobody ever saw it.
  const standX = mx(L.stand?.x ?? 2.3), standZ = L.stand?.z ?? 0.4;
  const standYaw = (L.stand?.yaw ?? 0) * flip;
  const kind = L.stand?.kind ?? 'table';
  // Sizes per kind: a watch-floor console is wider than an office desk, and a
  // trestle in a high bay is a plank on two frames.
  const TABLE_H = kind === 'console' ? 0.78 : 0.76;
  const TABLE_W = kind === 'desk' ? 1.5 : kind === 'console' ? 1.7 : kind === 'trestle' ? 1.9 : 1.15;
  const TABLE_D = kind === 'desk' ? 0.85 : kind === 'console' ? 0.9 : kind === 'trestle' ? 0.7 : 0.78;
  const timberTable = isChalk;
  const legMat = () => timberTable
    ? new THREE.MeshStandardMaterial({ color: 0x6b4f30, roughness: 0.88 })
    : new THREE.MeshStandardMaterial({ color: 0x8d9299, roughness: 0.5, metalness: 0.3 });
  const topMat = timberTable
    ? new THREE.MeshStandardMaterial({ map: grainTexture('#8a6a44'), roughness: 0.86 })
    : new THREE.MeshStandardMaterial({ color: 0xcfd3d6, roughness: 0.5, metalness: 0.1 });

  // Everything on and under the table lives in one group, so the whole thing can
  // be turned to face however the layout wants it — a desk square to the door
  // reads as furniture nobody uses.
  const stand = new THREE.Group();
  stand.position.set(standX, 0, standZ);
  stand.rotation.y = standYaw;
  add(stand);
  const onStand = (m) => { stand.add(m); return m; };

  const tableTop = onStand(new THREE.Mesh(new THREE.BoxGeometry(TABLE_W, 0.05, TABLE_D), topMat));
  tableTop.position.set(0, TABLE_H, 0);
  tableTop.castShadow = true;
  tableTop.receiveShadow = true;
  if(kind === 'trestle'){
    // Two A-frames and a plank across them.
    for(const sx of [-1, 1]){
      for(const lz of [-1, 1]){
        const leg = onStand(new THREE.Mesh(new THREE.BoxGeometry(0.06, TABLE_H, 0.06), legMat()));
        leg.position.set(sx * (TABLE_W / 2 - 0.28), (TABLE_H - 0.05) / 2, lz * (TABLE_D / 2 - 0.08));
        leg.rotation.z = -sx * 0.12;
      }
      const brace = onStand(new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, TABLE_D - 0.1), legMat()));
      brace.position.set(sx * (TABLE_W / 2 - 0.28), 0.34, 0);
    }
  } else {
    const apron = onStand(new THREE.Mesh(
      new THREE.BoxGeometry(TABLE_W - 0.12, 0.07, TABLE_D - 0.12), legMat()));
    apron.position.set(0, TABLE_H - 0.07, 0);
    for(const [lx, lz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]){
      const leg = onStand(new THREE.Mesh(new THREE.BoxGeometry(0.055, TABLE_H - 0.05, 0.055), legMat()));
      leg.position.set(lx * (TABLE_W / 2 - 0.07), (TABLE_H - 0.05) / 2, lz * (TABLE_D / 2 - 0.07));
      leg.castShadow = true;
    }
  }
  if(kind === 'desk'){
    // A drawer stack under one end, and a chair pushed in at it.
    const stack = onStand(new THREE.Mesh(new THREE.BoxGeometry(0.44, TABLE_H - 0.1, TABLE_D - 0.14),
      caseMat('#7a5c3c', 0xb2b8bd)));
    stack.position.set(-TABLE_W / 2 + 0.3, (TABLE_H - 0.1) / 2, 0);
    for(let i = 0; i < 3; i++){
      const pull = onStand(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.02, 0.02),
        caseMat('#4a3a22', 0x6f797f)));
      pull.position.set(-TABLE_W / 2 + 0.3, 0.2 + i * 0.2, TABLE_D / 2 - 0.06);
    }
    const seat = onStand(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.06, 0.42),
      caseMat('#8a6a44', 0x3f4b55)));
    seat.position.set(0.2, 0.46, -TABLE_D / 2 - 0.34);
    const back = onStand(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.44, 0.05),
      caseMat('#8a6a44', 0x3f4b55)));
    back.position.set(0.2, 0.7, -TABLE_D / 2 - 0.54);
  }
  if(kind === 'console'){
    // A raked panel standing off the back edge, which is what makes a desk a
    // console. Dark and matte: nothing here is allowed to be a real light.
    const panel = onStand(new THREE.Mesh(new THREE.BoxGeometry(TABLE_W - 0.2, 0.42, 0.05),
      new THREE.MeshStandardMaterial({ color: isChalk ? 0x4a3a22 : 0x1b2127,
        roughness: 0.5, metalness: 0.2 })));
    panel.position.set(0, TABLE_H + 0.24, TABLE_D / 2 - 0.12);
    panel.rotation.x = 0.28;
    for(let i = 0; i < 4; i++){
      const key = onStand(new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.02, 0.05),
        new THREE.MeshStandardMaterial({ color: i % 2 ? 0xc9ced3 : 0x9aa2a8, roughness: 0.6 })));
      key.position.set(-0.5 + i * 0.32, TABLE_H + 0.03, -TABLE_D / 2 + 0.2);
    }
  }

  // The case itself: one sheet, face up, a little askew.
  const chart = sheet_({
    accent: '#' + accent.getHexString(), tag: spec.code ?? '', title: 'Notes',
    heading: spec.name ?? '', body: spec.standLine ?? 'Waiting for a call on this one.',
    footer: 'Press E to take the case',
  }, { w: 384, h: 512 });
  const caseSheet = onStand(new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.4),
    new THREE.MeshStandardMaterial({ map: chart.texture, roughness: 0.82, envMapIntensity: 0.3 })));
  caseSheet.rotation.set(-Math.PI / 2, 0, 0.12);
  caseSheet.position.set(-0.05, TABLE_H + 0.028, 0.02);

  // The rest of the desk: loose paper, a folder, a pencil. Deterministic, so a
  // room looks the same every time it is entered — a table that reshuffles
  // itself is a table the player notices for the wrong reason.
  const paperMat = mat(`int-paper-${timberTable}`, () => new THREE.MeshStandardMaterial({
    color: timberTable ? 0xece2c8 : 0xf6f4ee, roughness: 0.94, envMapIntensity: 0.25 }));
  const LOOSE = [
    [-0.34, -0.14, 0.55, 0.20, 0.26],
    [ 0.30, -0.18, -0.42, 0.19, 0.25],
    [ 0.36,  0.16, 0.22, 0.21, 0.27],
    [-0.28,  0.20, -0.85, 0.18, 0.24],
    [ 0.02, -0.26, 1.25, 0.20, 0.26],
  ];
  // Spread across whatever surface this kind of stand has, rather than the 1.15 m
  // table every layout used to get: on a 1.9 m trestle the same five sheets sat in
  // a tidy pile in the middle of an empty plank.
  const spread = TABLE_W / 1.15;
  LOOSE.forEach(([dx, dz, rot, pw, ph], i) => {
    const sheet = onStand(new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), paperMat));
    sheet.rotation.set(-Math.PI / 2, 0, rot);
    sheet.position.set(dx * spread, TABLE_H + 0.026 + i * 0.0015, dz);
  });
  const folder = onStand(new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.012, 0.34),
    new THREE.MeshStandardMaterial({ color: timberTable ? 0xa8763f : 0x9aa3ad, roughness: 0.9 })));
  folder.rotation.y = -0.34;
  folder.position.set(0.36 * spread, TABLE_H + 0.031, -0.02);
  const pencil = onStand(new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.17, 6),
    new THREE.MeshStandardMaterial({ color: 0xd8b13a, roughness: 0.7 })));
  pencil.rotation.set(Math.PI / 2, 0, 0.5);
  pencil.position.set(-0.18 * spread, TABLE_H + 0.034, -0.26);

  const standHit = add(new THREE.Mesh(
    new THREE.BoxGeometry(TABLE_W + 0.3, 1.5, TABLE_D + 0.3), new THREE.MeshBasicMaterial({ visible: false })));
  standHit.position.set(standX, 0.85, standZ);
  interactables.push({
    mesh: standHit, type: 'case', id: spec.id,
    prompt: `E — Take the case in ${spec.name}`,
  });
  // The table is the only thing in the room that starts a question, and from
  // the doorway it is a table with paper on it. Mark it.
  const beacon = addCaseBeacon(group, {
    x: standX, z: standZ, colour: accent.getHex(),
    label: 'Take the case · E', height: 2.25,
  });

  // ------------------------------------------------------------ the door
  const doorHit = add(new THREE.Mesh(
    new THREE.PlaneGeometry(P.doorW, P.doorH),
    new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })));
  doorHit.position.set(0, P.doorH / 2, z0 + 0.42);
  interactables.push({
    mesh: doorHit, type: 'roomexit', id: spec.id,
    prompt: 'E — Step back outside',
  });
  // A lit exit sign, because a windowless room with one way out needs one.
  const exitSign = add(new THREE.Mesh(
    new THREE.PlaneGeometry(0.46, 0.16),
    new THREE.MeshStandardMaterial({ color: 0x1d7a4a, emissive: 0x1d7a4a, emissiveIntensity: 0.8 })));
  exitSign.position.set(0, P.doorH + 0.22, z0 + 0.12);

  return {
    id: spec.id,
    group, colliders, interactables, light, screen, plate, chart, beacon,
    /** Light the marker only while there is actually a case waiting here. */
    setCaseOpen(on){ beacon.setActive(on); },
    /** Where the player stands on entering: just inside, facing the room. */
    enterTransform: { x: ox, y: 0, z: oz + z0 + 1.5, yaw: Math.PI },
    origin: { x: ox, z: oz },
    /** Flat floor. The caller hands this to the player while inside. */
    groundHeight: () => 0,
    setVisible(on){
      group.visible = on;
      light.visible = on;
      fill.visible = on;
    },
    update(delta, camera){ screen.update(delta); beacon.update(delta, camera); },
  };
}
