// world.js — Mission Control, wired to the engine's world contract.
//
// The engine ships two worlds: a town, and a floor with a corridor down the
// middle. Both were wrong for this game. A control centre is one large room
// where the floor steps down toward a wall of displays and the teams sit in
// rows facing it — the geometry *is* the org chart, and putting these six teams
// behind six doors would have thrown that away and produced the hospital again.
//
// So this is the third world in the repo, after `outdoorTown` and
// `interiorFloor`, and it satisfies exactly the same contract:
// THEME_CONTRACT.md § "What the world module must provide".
//
// What makes it different to walk around in:
//   · four tiers, stepping down toward the boards. `groundHeight` is a
//     staircase in z, and it is the only vertical movement in these games;
//   · no corridor and no doors between the player and their work — every
//     console is in sight from the back of the room;
//   · the light comes from the displays. Three real lights total, and every
//     bright surface is emissive.
import * as THREE from 'three';
import { furnishArea, wordedSign, paintMural } from '../../engine/world/interiorKit.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { site, CONSOLES, BOARDS, WORKROOMS } from './site.js';
import { openCaseGroups } from '../../engine/core/app.js';
// The beacon's label billboards toward whoever is looking at it.
import { camera } from '../../engine/core/player.js';
import { instrumentScreen } from '../../engine/world/screens.js';
import { dampEnvironment } from '../../engine/world/materials.js';
// The same marker the other games put over an open case stand. Here it hangs
// over the console: with no doors and no rooms, an open call had nothing to
// announce it from across the floor except a ring on the carpet.
import { addCaseBeacon } from '../../engine/world/caseBeacon.js';

export let scene = null;
export let renderer = null;

export const colliders = [];        // Box3[]
export const softColliders = [];    // {x,z,r}[]
export const interactables = [];    // {mesh, type, id, prompt, info?}
/** groupId -> { id, name, pos, entry, desk } — one per console cluster. */
export const stopMeshes = new Map();
/** groupId -> the console's own screen, so a call can change the room. */
export const areaScreens = new Map();

let theme = null;
let waypointMesh = null;
let peopleStations = [];
const R = site.room;
const B = site.building;
/** The floor level of the back of the room, the ring and the courtyard. */
const ENTRY_Y = (R.rowZ.length - 1) * R.rowStep;
const boardScreens = [];
const consoleScreens = [];
/** groupId -> the beacon over that console, lit while its call is open. */
const beacons = new Map();

/**
 * The floor is a staircase, and this is the only description of it.
 *
 * Row 0 is at the front, nearest the boards, and lowest. Each row behind it is
 * `rowStep` higher. Anything that needs to know how high the floor is here —
 * the player, the crowd, a desk, a chair — asks this and nothing else.
 */
export function groundHeight(x, z){
  const { rowZ, rowStep } = R;
  // Outside the control room — the ring corridor and the courtyard — the floor is
  // flat, and level with the back of the room, so the doors are step-free. The
  // staircase belongs to the room and only to the room.
  if(z > R.back || Math.abs(x) > R.halfWidth) return ENTRY_Y;
  // Behind the last row, the floor is flat at the back of the room.
  if(z >= rowZ[rowZ.length - 1]) return (rowZ.length - 1) * rowStep;
  // In front of the first row, flat at the board wall.
  if(z <= rowZ[0]) return 0;
  for(let i = 0; i < rowZ.length - 1; i++){
    if(z >= rowZ[i] && z < rowZ[i + 1]){
      // The step itself is a short ramp rather than a lip, so walking up it
      // does not catch: a hard 0.55 m rise stops the player dead.
      const t = (z - rowZ[i]) / (rowZ[i + 1] - rowZ[i]);
      const ramp = Math.min(1, Math.max(0, (t - 0.62) / 0.28));
      return (i + ramp) * rowStep;
    }
  }
  return 0;
}

const rowY = (row) => row * R.rowStep;

// ------------------------------------------------------------------ materials
const M = {};
function buildMaterials(){
  M.wall = new THREE.MeshStandardMaterial({ color: 0x2b3038, roughness: 0.92, envMapIntensity: 0.35 });
  M.floor = new THREE.MeshStandardMaterial({ color: 0x23272d, roughness: 0.86, envMapIntensity: 0.3 });
  M.riser = new THREE.MeshStandardMaterial({ color: 0x171a1f, roughness: 0.9 });
  M.desk = new THREE.MeshStandardMaterial({ color: 0x3c4550, roughness: 0.62, metalness: 0.2, envMapIntensity: 0.5 });
  M.top = new THREE.MeshStandardMaterial({ color: 0x8f9aa2, roughness: 0.5, metalness: 0.25 });
  M.frame = new THREE.MeshStandardMaterial({ color: 0x596470, roughness: 0.45, metalness: 0.5 });
  M.glass = new THREE.MeshPhysicalMaterial({
    color: 0x9fb6c4, roughness: 0.08, metalness: 0, transmission: 0.82,
    transparent: true, opacity: 0.35, thickness: 0.04,
  });
  M.ceilingPanel = new THREE.MeshStandardMaterial({
    color: 0xdfe6ea, emissive: 0xcfe0e8, emissiveIntensity: 0.55, roughness: 0.7,
  });
  // ---- the building outside the room
  // The corridor is a public space rather than a darkened control room: paler
  // walls, a hard floor, and the courtyard visible through glass down one side.
  M.corridorWall = new THREE.MeshStandardMaterial({ color: 0x3c434c, roughness: 0.9, envMapIntensity: 0.4 });
  M.corridorFloor = new THREE.MeshStandardMaterial({ color: 0x2c3138, roughness: 0.78, envMapIntensity: 0.35 });
  M.paving = new THREE.MeshStandardMaterial({ color: 0x33383d, roughness: 0.95, envMapIntensity: 0.3 });
  M.planter = new THREE.MeshStandardMaterial({ color: 0x4a4b48, roughness: 0.95 });
  M.soil = new THREE.MeshStandardMaterial({ color: 0x2a241d, roughness: 1.0 });
  M.foliage = new THREE.MeshStandardMaterial({ color: 0x2f4230, roughness: 0.95 });
  M.trunk = new THREE.MeshStandardMaterial({ color: 0x3a2f26, roughness: 0.95 });
  M.grass = new THREE.MeshStandardMaterial({ color: 0x27331f, roughness: 1.0 });
  // Emissive, never a real light: the ceiling-fixture-per-lamp mistake is
  // recorded twice in this repo and it costs 100 fps.
  M.pathLamp = new THREE.MeshStandardMaterial({
    color: 0xf6e6c0, emissive: 0xffd79a, emissiveIntensity: 1.8, roughness: 0.5 });
  // The gallery's glass is milky on purpose — it is a viewing window into a lit
  // room. Courtyard glazing is the opposite: you are meant to see the night
  // through it, and at opacity 0.35 with transmission it read as a frosted wall
  // with a garden rumoured behind it.
  M.window = new THREE.MeshPhysicalMaterial({
    color: 0xcfe0ea, roughness: 0.03, metalness: 0, transmission: 0.95,
    transparent: true, opacity: 0.12, thickness: 0.02, envMapIntensity: 0.6,
  });
  // Brighter than the control room's, because a corridor is lit to be walked
  // down rather than to keep anybody's night vision.
  M.corridorPanel = new THREE.MeshStandardMaterial({
    color: 0xe8eef2, emissive: 0xdceaf2, emissiveIntensity: 0.95, roughness: 0.65 });
}

function box(w, h, d, x, y, z, mat, ry = 0){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.castShadow = true; m.receiveShadow = true;
  scene.add(m);
  return m;
}
function collide(cx, cz, w, d, y, h){
  colliders.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(cx, y + h / 2, cz), new THREE.Vector3(w, h, d)));
}

// ---------------------------------------------------------------- the shell
function buildRoom(){
  const { halfWidth: HW, front, back, ceiling, rowZ, rowStep } = R;

  // Floor, one slab per tier plus the flat aprons at either end.
  const tiers = [
    { z0: front, z1: rowZ[0], y: 0 },
    ...rowZ.slice(0, -1).map((z, i) => ({ z0: z, z1: rowZ[i + 1], y: rowY(i) })),
    { z0: rowZ[rowZ.length - 1], z1: back, y: rowY(rowZ.length - 1) },
  ];
  for(const t of tiers){
    const d = t.z1 - t.z0;
    const slab = box(HW * 2, 0.3, d, 0, t.y - 0.15, (t.z0 + t.z1) / 2, M.floor);
    slab.castShadow = false;
    // The riser: the vertical face of the step, darker than the tread.
    if(t.y > 0) box(HW * 2, rowStep, 0.12, 0, t.y - rowStep / 2, t.z0, M.riser);
  }

  // Walls.
  for(const s of [-1, 1]) box(0.3, ceiling, back - front, s * HW, ceiling / 2, (front + back) / 2, M.wall);
  box(HW * 2, ceiling, 0.3, 0, ceiling / 2, front, M.wall);              // board wall
  collide(-HW, (front + back) / 2, 0.6, back - front, 0, ceiling);
  collide(HW, (front + back) / 2, 0.6, back - front, 0, ceiling);
  collide(0, front, HW * 2, 0.6, 0, ceiling);

  // The back wall, in two halves with the doors between them. This used to be one
  // slab across the room; the corridor is on the other side of it now, and a
  // control room you cannot walk out of is the thing this building fixes.
  const dw = B.doorW / 2;
  const half = HW - dw;
  for(const s of [-1, 1]){
    box(half, ceiling, 0.3, s * (dw + half / 2), ceiling / 2, back, M.wall);
    collide(s * (dw + half / 2), back, half, 0.6, 0, ceiling);
  }
  // A header over the opening, so the doors read as doors rather than as a hole,
  // and the corridor light does not spill in over the boards. The opening starts
  // at the FLOOR of the back tier, not at zero: measured from zero it would have
  // been a 0.95 m gap in a wall, which is a cat flap.
  const lintel = ENTRY_Y + 2.2;
  box(B.doorW, ceiling - lintel, 0.3, 0, lintel + (ceiling - lintel) / 2, back, M.wall);
  collide(0, back, B.doorW, 0.6, lintel, ceiling - lintel);

  // Ceiling, with lit panels down the two aisles. Emissive only — a fixture
  // per panel is how a floor goes from 118 fps to 20.
  box(HW * 2, 0.2, back - front, 0, ceiling, (front + back) / 2, M.wall).castShadow = false;
  for(let i = 0; i < 7; i++){
    const z = front + 3 + i * ((back - front - 6) / 6);
    for(const s of [-1, 1]){
      const p = box(3.4, 0.08, 1.1, s * 8, ceiling - 0.14, z, M.ceilingPanel);
      p.castShadow = false;
    }
  }
}

// ---------------------------------------------------------------- the building
//
// The ring corridor and the courtyard. Everything here is at ENTRY_Y, so nothing
// in this section asks `groundHeight` — it is a flat floor by construction, and a
// second description of the height would be a second source of truth for it.

/**
 * A straight run of wall along x or z, with gaps left for openings and an
 * optional glazed band at eye height.
 *
 * Every wall in the ring is axis-aligned, so this is all the geometry needed —
 * and doing gaps here rather than by hand is what stops a doorway and its
 * collider drifting apart, which is how you get a door you can see through and
 * cannot walk through.
 *
 * @param gaps  [[from, to]] along the run's own axis
 */
function wallRun(a, b, { height, glaze = false, gaps = [], material = M.corridorWall } = {}){
  const alongX = a.z === b.z;
  const from = Math.min(alongX ? a.x : a.z, alongX ? b.x : b.z);
  const to = Math.max(alongX ? a.x : a.z, alongX ? b.x : b.z);
  const fixed = alongX ? a.z : a.x;
  const T = 0.3;                                  // wall thickness

  // The run minus the gaps, as a list of [from, to] segments.
  const cuts = gaps.slice().sort((p, q) => p[0] - q[0]);
  const segments = [];
  let at = from;
  for(const [g0, g1] of cuts){
    if(g0 > at) segments.push([at, Math.min(g0, to)]);
    at = Math.max(at, g1);
  }
  if(at < to) segments.push([at, to]);

  for(const [s0, s1] of segments){
    const len = s1 - s0;
    if(len <= 0.01) continue;
    const mid = (s0 + s1) / 2;
    const x = alongX ? mid : fixed;
    const z = alongX ? fixed : mid;
    const w = alongX ? len : T;
    const d = alongX ? T : len;
    if(glaze){
      // Sill, glass, head. The glass is a thin box rather than a plane so it has
      // a visible edge in the mullions and reads as glazing from both sides.
      box(w, 1.0, d, x, ENTRY_Y + 0.5, z, material);
      box(w, height - 2.8, d, x, ENTRY_Y + 2.8 + (height - 2.8) / 2, z, material);
      const glass = new THREE.Mesh(new THREE.BoxGeometry(alongX ? len : 0.06, 1.8, alongX ? 0.06 : len), M.window);
      glass.position.set(x, ENTRY_Y + 1.9, z);
      scene.add(glass);
      // Mullions every two and a half metres, or a nine-metre pane reads as a gap.
      //
      // A mullion is as THICK as the wall and as thin as a post: the two size
      // arguments are (wall thickness, post thickness) whichever way the wall
      // runs. Written as `d` on a run along z — where `d` is the run's whole
      // length — every mullion came out as a 28-metre slab straight across the
      // corridor, which is what "weird walls cutting through the hallway" was.
      const n = Math.max(1, Math.round(len / 2.5));
      for(let i = 1; i < n; i++){
        const u = s0 + (i / n) * len;
        box(alongX ? 0.1 : w, 1.8, alongX ? d : 0.1,
            alongX ? u : x, ENTRY_Y + 1.9, alongX ? z : u, M.frame).castShadow = false;
      }
    } else {
      box(w, height, d, x, ENTRY_Y + height / 2, z, material);
    }
    // Solid either way. Glass you can walk through is a bug report.
    collide(x, z, alongX ? len : 0.6, alongX ? 0.6 : len, ENTRY_Y, height);
  }
}

/** Floor and ceiling for one leg of the ring. */
function legSlab(x0, x1, z0, z1){
  const w = x1 - x0, d = z1 - z0;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  box(w, 0.3, d, cx, ENTRY_Y - 0.15, cz, M.corridorFloor).castShadow = false;
  box(w, 0.2, d, cx, ENTRY_Y + B.ceiling, cz, M.corridorWall).castShadow = false;
  // Lit panels down the middle of the leg, one every four metres. Emissive.
  const along = Math.max(w, d);
  const n = Math.max(1, Math.round(along / 4.5));
  for(let i = 0; i < n; i++){
    const t = (i + 0.5) / n;
    const px = w > d ? x0 + t * w : cx;
    const pz = w > d ? cz : z0 + t * d;
    box(w > d ? 2.6 : 1.0, 0.08, w > d ? 1.0 : 2.6, px, ENTRY_Y + B.ceiling - 0.14, pz, M.corridorPanel)
      .castShadow = false;
  }
}

/**
 * The ring: four legs of corridor round the courtyard, glazed on the inside.
 *
 * The room's own back wall is the south boundary, so this builds three outer
 * walls and four inner ones. The inner walls have the courtyard openings in them.
 */
function buildRing(){
  const HW = B.halfWidth;
  const C = B.courtyard;
  const [s0, s1] = B.southLeg;
  const [n0, n1] = B.northLeg;

  legSlab(-HW, HW, s0, s1);              // south leg, along the control room
  legSlab(-HW, C.x0, s1, n0);            // west leg
  legSlab(C.x1, HW, s1, n0);             // east leg
  legSlab(-HW, HW, n0, n1);              // north leg

  // The ring's own side walls, with a doorway for each room in the wings. One
  // description of each opening: the room builder does not cut its own door, so
  // the hole and the collider cannot end up in different places.
  const doorFor = (r) => {
    const c = (r.z0 + r.z1) / 2, h = B.roomDoorW / 2;
    return [c - h, c + h];
  };
  for(const side of ['w', 'e']){
    const x = side === 'w' ? -HW : HW;
    wallRun({ x, z: s0 }, { x, z: n1 },
      { height: B.ceiling, gaps: WORKROOMS.filter(r => r.side === side).map(doorFor) });
  }
  // The far end of the ring. Nothing beyond it.
  wallRun({ x: -HW, z: n1 }, { x: HW, z: n1 }, { height: B.ceiling });

  // Inner walls, glazed, with the ways out into the courtyard: two doors off the
  // south leg where the traffic from the control room is, and one at the far end.
  wallRun({ x: C.x0, z: C.z0 }, { x: C.x1, z: C.z0 },
    { height: B.ceiling, glaze: true, gaps: [[-9, -5], [5, 9]] });
  wallRun({ x: C.x0, z: C.z1 }, { x: C.x1, z: C.z1 },
    { height: B.ceiling, glaze: true, gaps: [[-2, 2]] });
  wallRun({ x: C.x0, z: C.z0 }, { x: C.x0, z: C.z1 }, { height: B.ceiling, glaze: true });
  wallRun({ x: C.x1, z: C.z0 }, { x: C.x1, z: C.z1 }, { height: B.ceiling, glaze: true });
}

/**
 * One room in a wing: four areas of study work in these rather than on the
 * console floor.
 *
 * The desk is against the outer wall facing the door, with the area's screens
 * above it — so the room reads from the doorway the way an interior does in the
 * other games, and the case is on the desk the same way it is on a console.
 */
function buildWorkroom(spec, def){
  const HW = B.halfWidth, WG = B.wing;
  const f = spec.side === 'w' ? -1 : 1;              // which way is "out"
  const xIn = f * HW, xOut = f * (HW + WG);          // corridor wall, outer wall
  const cx = (xIn + xOut) / 2, cz = (spec.z0 + spec.z1) / 2;
  const colour = def?.color ? new THREE.Color(def.color) : new THREE.Color(0x4d5a66);
  const y = ENTRY_Y;
  const H = B.ceiling;

  // Floor and ceiling.
  box(WG, 0.3, spec.z1 - spec.z0, cx, y - 0.15, cz, M.corridorFloor).castShadow = false;
  box(WG, 0.2, spec.z1 - spec.z0, cx, y + H, cz, M.corridorWall).castShadow = false;
  for(const t of [-1, 1]){
    box(WG - 1.6, 0.08, 1.1, cx, y + H - 0.14, cz + t * (spec.z1 - spec.z0) / 4, M.corridorPanel)
      .castShadow = false;
  }

  // The outer wall and the two end walls. The corridor wall is built by the ring,
  // which leaves this room's doorway in it — one description of that opening, so
  // the hole and the collider cannot drift apart.
  wallRun({ x: xOut, z: spec.z0 }, { x: xOut, z: spec.z1 }, { height: H });
  for(const z of [spec.z0, spec.z1]){
    wallRun({ x: xIn, z }, { x: xOut, z }, { height: H });
  }

  // The desk, against the outer wall, and its instrument panel above it.
  const deskZ = cz;
  const desk = box(1.5, 0.78, 5.2, xOut - f * 1.1, y + 0.39, deskZ, M.desk);
  box(1.62, 0.06, 5.3, xOut - f * 1.1, y + 0.8, deskZ, M.top).castShadow = false;
  collide(xOut - f * 1.1, deskZ, 1.7, 5.4, y, 0.85);

  const screen = instrumentScreen({
    kind: 'panel', title: spec.name,
    rows: [
      { label: 'CALL', value: 'OPEN', status: 'alarm' },
      { label: 'LAST', value: '—', status: 'normal' },
    ],
  }, { w: 384, h: 256 });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.72),
    new THREE.MeshStandardMaterial({
      map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
      emissiveIntensity: 0.7, roughness: 0.85,
    }));
  panel.position.set(xOut - f * 0.32, y + 1.75, deskZ);
  panel.rotation.y = -f * Math.PI / 2;
  scene.add(panel);
  areaScreens.set(spec.group, panel);
  consoleScreens.push({ panel, screen, group: spec.group, name: spec.name });

  // The area's colour on the desk front, and the nameplate by the door, which is
  // what tells the player they are in the right room before they read the screen.
  box(0.06, 0.09, 5.2, xOut - f * 1.86, y + 0.72, deskZ,
    new THREE.MeshStandardMaterial({ color: colour, emissive: colour, emissiveIntensity: 0.5, roughness: 0.6 }))
    .castShadow = false;
  const plate = instrumentScreen({ kind: 'panel', title: spec.name, rows: [] }, { w: 384, h: 96 });
  const plateMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.46),
    new THREE.MeshStandardMaterial({
      map: plate.texture, emissive: 0xffffff, emissiveMap: plate.texture,
      emissiveIntensity: 0.5, roughness: 0.9, side: THREE.FrontSide,
    }));
  plateMesh.position.set(xIn - f * 0.22, y + 2.2, cz + 2.6);
  plateMesh.rotation.y = f * Math.PI / 2;
  scene.add(plateMesh);

  // Something to sit on, and the room's own clutter so it is not a desk in a box.
  for(const t of [-1.5, 1.5]){
    box(0.62, 0.1, 0.6, xOut - f * 2.3, y + 0.46, deskZ + t, M.frame).castShadow = false;
    softColliders.push({ x: xOut - f * 2.3, z: deskZ + t, r: 0.42 });
  }
  for(const t of [-1, 1]){
    const rz = cz + t * ((spec.z1 - spec.z0) / 2 - 2.2);
    box(1.1, 1.9, 2.4, xIn - f * 0.9, y + 0.95, rz, M.desk);
    collide(xIn - f * 0.9, rz, 1.2, 2.5, y, 1.9);
  }

  const beacon = addCaseBeacon(scene, {
    x: xOut - f * 3.2, z: deskZ, y: y + 0.02,
    colour: def?.color ?? 0xf0b429,
    label: spec.name, height: 2.15,
  });
  beacon.setActive(false);
  beacons.set(spec.group, beacon);

  stopMeshes.set(spec.group, {
    id: spec.group, name: spec.name, desk,
    pos: new THREE.Vector3(xOut - f * 1.1, y, deskZ),
    // Where the player is put down: inside the room, clear of the desk.
    entry: new THREE.Vector3(xOut - f * 3.4, y, deskZ),
  });
  interactables.push({
    mesh: desk, type: 'case', id: spec.group,
    prompt: `E — Take the case in ${spec.name}`,
  });
  peopleStations.push({
    id: spec.group, x: xIn - f * 2.4, z: cz - 1.2,
    facing: f > 0 ? Math.PI / 2 : -Math.PI / 2,
  });
  // The rest of the room. A twenty-metre bay with a bench and a door in it is a
  // corridor: what makes it a working laboratory is the racks along the outer
  // wall, the trolleys, the boxes nobody has put away and the paper on every
  // surface. Measured before this, each of these four held six pieces.
  furnishWorkroom(spec, { xIn, xOut, y, cz });

}

/**
 * The courtyard: paving, a lawn, planted beds, benches, and the flagpole.
 *
 * It is open to the sky, and the sky is the only thing in this game that is not
 * indoors — which is the point of it. The control room has no windows and no
 * clock; standing in the courtyard is the one place the player can tell it is the
 * middle of the night.
 */
/**
 * Fit out one of the four wing rooms.
 *
 * These are the rooms behind mission control — the computer room, the power bay,
 * the life support lab, the structures test bay — and each is twenty metres long.
 * The vocabulary is the building's own: equipment racks, cable trays, test rigs,
 * parts bins, the trolley of documentation that follows every one of these rooms
 * around.
 */
function furnishWorkroom(spec, { xIn, xOut, y, cz }){
  const f = spec.side === 'w' ? -1 : 1;
  const inX = xIn + f * 0.9, outX = xOut - f * 0.9;

  const makers = {
    rack: (x, z) => {
      box(0.7, 2.0, 0.62, x, y + 1.0, z, M.desk);
      for(let i = 0; i < 6; i++){
        box(0.74, 0.16, 0.06, x, y + 0.5 + i * 0.26, z + 0.3, i % 2 ? M.frame : M.top);
      }
      collide(x, z, 0.8, 0.7, y, 2.0);
    },
    bench: (x, z) => {
      box(0.8, 0.06, 2.2, x, y + 0.88, z, M.top);
      box(0.7, 0.8, 2.1, x, y + 0.44, z, M.desk);
      collide(x, z, 0.9, 2.3, y, 0.9);
    },
    partsBin: (x, z) => {
      for(let i = 0; i < 3; i++){
        box(0.5, 0.24, 0.36, x, y + 0.12 + i * 0.26, z, i === 1 ? M.frame : M.top);
      }
    },
    trolley: (x, z) => {
      box(0.5, 0.05, 0.75, x, y + 0.8, z, M.top);
      box(0.5, 0.05, 0.75, x, y + 0.4, z, M.top);
      for(const sx of [-1, 1]) for(const sz of [-1, 1]){
        box(0.04, 0.8, 0.04, x + sx * 0.22, y + 0.4, z + sz * 0.33, M.frame);
      }
      collide(x, z, 0.6, 0.85, y, 0.9);
    },
    cableTray: (x, z) => {
      box(0.3, 0.08, 3.0, x, y + 2.6, z, M.frame);
      for(const o of [-1.2, 1.2]) box(0.08, 0.3, 0.08, x, y + 2.78, z + o, M.frame);
    },
    stool: (x, z) => {
      box(0.36, 0.06, 0.36, x, y + 0.66, z, M.desk);
      for(const sx of [-1, 1]) for(const sz of [-1, 1]){
        box(0.035, 0.64, 0.035, x + sx * 0.13, y + 0.33, z + sz * 0.13, M.frame);
      }
    },
    crate: (x, z) => {
      const n = 1 + (Math.abs(Math.round(x + z)) % 3);
      for(let i = 0; i < n; i++) box(0.62, 0.36, 0.46, x, y + 0.18 + i * 0.37, z, M.desk);
      collide(x, z, 0.7, 0.55, y, 0.4 * n);
    },
    bin: (x, z) => {
      box(0.34, 0.5, 0.34, x, y + 0.25, z, M.frame);
    },
  };

  // ---- what is on these walls
  //
  // Printed matter, nineteen-seventies: aged paper, a typewriter's worth of words,
  // and nothing that could not have been run off on a duplicator the morning of the
  // shift. The room is dark, so the sheets are cream rather than white — a white
  // sheet in here reads as a light box.
  const PAPER = { paper: '#e6e0d2', ink: '#20242a', soft: '#4c525a' };
  const NOTICES = {
    NAV: [
      { style: 'warning', tag: 'CAUTION', heading: 'Do not remove computer power',
        accent: '#8a5a2b',
        body: 'A power-down loses the erasable store. Reloading from the ropes is '
          + 'forty minutes and cannot be done during a burn.' },
      { style: 'list', tag: 'PROGRAM', heading: 'Loaded, this mission phase',
        accent: '#3f6f8f',
        items: [['P00', 'idle'], ['P52', 'platform align'], ['P41', 'RCS burn'],
          ['P63', 'entry initialisation'], ['V37', 'change program']],
        body: 'Verify the program number aloud before you key it.' },
      { style: 'banner', tag: 'ALIGNMENT', heading: 'Two stars, every eight hours',
        accent: '#5b6a72',
        body: 'Drift is quoted per axis and goes on the log sheet, signed. '
          + 'An alignment nobody wrote down did not happen.' },
      { style: 'grid', tag: 'CORE ROPE', heading: 'Module store, bay by bay',
        accent: '#5b6a72', body: 'Signed out against the mission, returned the same shift.' },
      { style: 'sticky', tag: 'NOTE', heading: 'Restart is not a diagnosis',
        accent: '#8a5a2b',
        body: 'If it restarts twice, log the alarm codes before you touch anything else.' },
    ],
    ELEC: [
      { style: 'warning', tag: 'ISOLATE FIRST', heading: 'Before any probe goes in',
        accent: '#a33f2f',
        body: 'Main and standby buses are live at all times during a mission. '
          + 'Two people, one permit, and the breaker collared open.' },
      { style: 'list', tag: 'BUS', heading: 'Nominal, in volts', accent: '#3f6f8f',
        items: [['Main A', '28.9'], ['Main B', '28.7'], ['Battery relay', '29.1'],
          ['AC bus 1', '115 / 400 Hz'], ['AC bus 2', '115 / 400 Hz']],
        body: 'Anything under 26.5 is called immediately, not at the end of the round.' },
      { style: 'chart', tag: 'FUEL CELL', heading: 'Output, this mission to date',
        accent: '#5b6a72', body: 'Three cells. Reactant quantity is the limit, not the load.' },
      { style: 'banner', tag: 'A ZERO READING', heading: 'Is a reading', accent: '#8a5a2b',
        body: 'A bus that reads zero and a bus that is dead look identical from here. '
          + 'Confirm with a second measurement on a different sensor before you call it.' },
    ],
    THERM: [
      { style: 'list', tag: 'CABIN', heading: 'Limits, crew compartment', accent: '#3f6f8f',
        items: [['Pressure', '4.8–5.2 psi'], ['CO₂ partial', 'below 7.6 mmHg'],
          ['Temperature', '18–27 °C'], ['Humidity', '40–70 %']],
        body: 'Any excursion is called and logged with the time.' },
      { style: 'warning', tag: 'SCRUBBER', heading: 'Canister change is timed',
        accent: '#a33f2f',
        body: 'Log the change, not the intention to change it. The curve is only '
          + 'readable if the times are right.' },
      { style: 'chart', tag: 'CO₂', heading: 'Partial pressure, last 24 hours',
        accent: '#5b6a72', body: 'Plotted hourly by hand from the downlink.' },
      { style: 'photo', tag: 'THE MOCK-UP', heading: 'Cabin trainer, Building 9',
        accent: '#5b6a72', body: 'Same panel layout. Use it before you talk a crew through anything.' },
    ],
    STRUCT: [
      { style: 'list', tag: 'TORQUE', heading: 'Structural fasteners', accent: '#3f6f8f',
        items: [['3/8 in, steel', '38 N·m'], ['1/4 in, steel', '11 N·m'],
          ['Hatch dogs', 'sequence A–F'], ['Anything flight', 'witness required']],
        body: 'Torque wrench is calibrated quarterly. Certificate on the back of the door.' },
      { style: 'warning', tag: 'LOAD TEST', heading: 'Nobody in the bay while it runs',
        accent: '#a33f2f',
        body: 'Amber light means rigged. Red means loaded. The door interlock is not '
          + 'a substitute for looking.' },
      { style: 'chart', tag: 'TEST ARTICLE 4', heading: 'Strain against applied load',
        accent: '#5b6a72', body: 'Linear to 1.4 g. The knee is where the fitting yields.' },
      { style: 'banner', tag: 'A CHANNEL DROPPING', heading: 'Is a measurement of the wire',
        accent: '#8a5a2b',
        body: 'Until the same event shows on a sensor that shares no harness with it, '
          + 'you have a telemetry fault, not a structural one.' },
    ],
  };
  const sheets = NOTICES[spec.group] ?? [];
  // On the room side of both walls: the outer wall and the corridor wall, which is
  // 300 mm thick and built centred on its line.
  const T = 0.18;
  const doorHalf = (B.roomDoorW ?? 1.8) / 2;
  sheets.forEach((sheet, i) => {
    const sz = spec.z0 + 3 + i * ((spec.z1 - spec.z0 - 6) / Math.max(1, sheets.length - 1));
    // The corridor wall has this room's doorway in the middle of it, and a board is
    // a metre across — so anything that would overlap the opening goes on the outer
    // wall instead of hanging half over the way in.
    const clearsDoor = Math.abs(sz - cz) > doorHalf + 0.9;
    const onOuter = i % 2 === 0 || !clearsDoor;
    const sx = onOuter ? xOut - f * T : xIn + f * T;
    wordedSign({
      box: (w2, h2, d2, x2, y2, z2, mat2) => box(w2, h2, d2, x2, y2 + y, z2, mat2),
      mats: { dark: M.riser },
      x: sx, z: sz, faceX: true, toward: onOuter ? -f : f,
      text: { ...sheet, ...PAPER },
      wide: 0.95,
    });
  });

  furnishArea({
    makers,
    order: ['rack', 'bench', 'partsBin', 'trolley', 'stool', 'crate', 'cableTray', 'bin'],
    bounds: { x0: Math.min(inX, outX), x1: Math.max(inX, outX),
      z0: spec.z0 + 1.6, z1: spec.z1 - 1.6 },
    target: 18,
    seed: `bth-${spec.group}`,
    sep: 1.5,
    // The doorway in the corridor wall, and the middle of the room where the
    // stop's own bench and case already are.
    keepClear: [{ x: xIn + f * 1.2, z: cz, r: 2.4 }, { x: (xIn + xOut) / 2, z: cz, r: 2.6 }],
  });
}

/**
 * The boards in the ring corridor.
 *
 * This is the public part of the building — the corridor everybody walks between
 * the control room and the wings — so what is on its walls is the whole centre's
 * business rather than one room's: the flight rules, the shift roster, the recovery
 * force, the standing instruction about who may say anything to a journalist.
 *
 * Kept off the south leg's inner wall, which is the control room's back wall and
 * already carries the status board and the doors.
 */
function furnishRingSigns(){
  const HW = B.halfWidth;
  const [, s1] = B.southLeg;
  const [n0] = B.northLeg;
  const y = ENTRY_Y;
  const T = 0.18;
  const PAPER = { paper: '#e6e0d2', ink: '#20242a', soft: '#4c525a' };

  const SHEETS = [
    { style: 'banner', tag: 'FLIGHT RULE 4-11', heading: 'Disagreeing sensors',
      accent: '#a33f2f',
      body: 'Where two independent measurements disagree, the vehicle is assumed to be '
        + 'in the worse of the two states until a third, independent measurement says '
        + 'otherwise. Assume nothing from a single channel.' },
    { style: 'grid', tag: 'SHIFT', heading: 'Console roster, this week', accent: '#3f6f8f',
      body: 'Handover at the console, in writing, before the off-going controller leaves.' },
    { style: 'list', tag: 'RECOVERY', heading: 'Force on station', accent: '#5b6a72',
      items: [['Primary ship', 'mid-Pacific'], ['Secondary', 'Atlantic'],
        ['Air rescue', 'four aircraft'], ['On-station', 'H−6 hours']],
      body: 'Positions are confirmed each shift by the recovery officer.' },
    { style: 'warning', tag: 'THE LOOP', heading: 'One voice at a time',
      accent: '#a33f2f',
      body: 'Do not key over a call. If you did not hear it, ask for it again — '
        + 'do not assume it. Everything on the loop is recorded.' },
    { style: 'banner', tag: 'PUBLIC AFFAIRS', heading: 'Nothing leaves this building',
      accent: '#8a5a2b',
      body: 'No statement, no estimate and no opinion goes to a reporter except through '
        + 'the public affairs officer. This includes what you tell your family.' },
    { style: 'chart', tag: 'GROUND ELAPSED TIME', heading: 'Mission clock, this shift',
      accent: '#5b6a72', body: 'All times on every log are GET. Local time is not used.' },
    { style: 'list', tag: 'IF YOU ARE UNSURE', heading: 'Say so, in this order',
      accent: '#3f6f8f',
      items: [['Your own console', 'first'], ['Your back room', 'second'],
        ['Flight Director', 'always'], ['Anyone else', 'never']],
      body: 'A controller who says "I do not know" has done their job.' },
    { style: 'photo', tag: 'THE LAST CREW', heading: 'Recovery, eleven months ago',
      accent: '#5b6a72', body: 'Same room, same consoles, same three people on the loop.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Coffee urn is broken again',
      accent: '#8a5a2b', body: 'Machine on the north leg works. Take the long way round.' },
    { style: 'warning', tag: 'SIMULATION', heading: 'When the amber light is on',
      accent: '#8a5a2b',
      body: 'Everything you hear on the loop is a simulation, including the parts that '
        + 'sound like they are not. Say SIM before every call.' },
  ];

  // The same wall carries a doorway into each wing room, cut by `buildRing` from
  // `doorFor()`. A board hung across one of those hangs in the opening — which is
  // where FLIGHT RULE 4-11 ended up, in the doorway of the guidance computer room.
  // These are the same numbers the holes are cut with, so the two cannot drift.
  const doorways = (side) => WORKROOMS.filter(r => r.side === side).map(r => ({
    c: (r.z0 + r.z1) / 2, h: B.roomDoorW / 2,
  }));
  const clearOfDoors = (side, z, halfWide) => doorways(side)
    .every(d => Math.abs(z - d.c) > d.h + halfWide + 0.25);

  // Down both long legs of the ring, alternating sides, facing into the corridor.
  const z0 = s1 + 2, z1 = n0 - 2;
  let placedAt = z0;
  SHEETS.forEach((sheet, i) => {
    const f = i % 2 === 0 ? -1 : 1;                 // west leg, then east
    const side = f < 0 ? 'w' : 'e';
    const wide = i % 3 === 0 ? 1.3 : 0.95;
    const t = (Math.floor(i / 2) + 0.5) / Math.ceil(SHEETS.length / 2);
    let z = z0 + t * (z1 - z0);
    // Walk it clear of the nearest doorway rather than dropping the board.
    if(!clearOfDoors(side, z, wide / 2)){
      let moved = null;
      for(let step = 0.5; step < 8 && moved === null; step += 0.5){
        for(const dz of [step, -step]){
          const trial = z + dz;
          if(trial > z0 && trial < z1 && clearOfDoors(side, trial, wide / 2)){ moved = trial; break; }
        }
      }
      if(moved === null) return;
      z = moved;
    }
    placedAt = z;
    wordedSign({
      box: (w2, h2, d2, x2, y2, z2, mat2) => box(w2, h2, d2, x2, y2 + y, z2, mat2),
      mats: { dark: M.riser },
      // On the room side of the ring's outer wall, which is 300 mm and centred.
      x: f * (HW - T), z, faceX: true, toward: -f,
      text: { ...sheet, ...PAPER },
      wide,
    });
  });
  void placedAt;
}

/**
 * The vehicle, across the north leg.
 *
 * The far side of the courtyard is a forty-six metre corridor with nothing on it at
 * all — the longest blank wall in the building and the one people walk when there is
 * nothing to do but wait. It carries the stack, in elevation, at very nearly the
 * size of the thing itself.
 *
 * Painted in sections because a single canvas that long would be either enormous or
 * illegible; each panel draws its own slice of one virtual drawing, so the seams
 * fall between panel lines rather than through the middle of an engine bell.
 */
/**
 * The centre's seal, on the back wall of the control room.
 *
 * The back wall is the one every row faces away from and every visitor walks in
 * through, so it is where the building puts its own name. This is the centre's
 * mark rather than a real agency's: the mission, the crew, the recovery force and
 * the cast are all invented, and hanging a real insignia over them would put an
 * organisation that exists behind a flight that does not.
 */
function paintControlRoomSeal(){
  const { halfWidth: HW, back } = R;
  const dw = B.doorW / 2;
  const half = HW - dw;

  // Where the back wall can actually be seen from.
  //
  // Raycast from four places in the room — front row, middle, back tier, off to one
  // side — and the wall is visible in a band from about 3.1 m to 4.0 m: above the
  // consoles on the back tier, below the gallery that overhangs this wall. Higher
  // than that is hidden by the gallery from almost everywhere, which is where the
  // first attempt put it, and lower is behind the consoles.
  //
  // So the seal is as big as that band allows and no bigger, and there is one on
  // each half of the wall rather than one enormous one nobody can see.
  // As big as the band takes. 1.2 m sat comfortably inside it and read as a badge
  // rather than as the building's mark; 1.9 m runs from just above the console tops
  // to just under the gallery, which is the whole of the wall anybody can see.
  const size = 1.9;
  const y = 3.45;
  for(const s2 of [-1, 1]){
    paintMural({
      box: (w2, h2, d2, x2, y2, z2, mat2) => box(w2, h2, d2, x2, y2, z2, mat2),
      x: s2 * (dw + half / 2), y, z: back - 0.18,
      faceX: false, toward: -1,
      w: size, h: size,
      kind: 'seal',
      text: { heading: 'MISSION CONTROL CENTER', body: 'FLIGHT OPERATIONS' },
      seed: `seal-${s2}`,
    });
  }
}

function paintVehicleWall(){
  const HW = B.halfWidth;
  const [, n1] = B.northLeg;
  const y = ENTRY_Y;
  const T = 0.18;
  const PANELS = 12;
  const span = HW * 2 - 1.2;
  const w = span / PANELS;
  for(let i = 0; i < PANELS; i++){
    const cx = -HW + 0.6 + (i + 0.5) * w;
    paintMural({
      box: (w2, h2, d2, x2, y2, z2, mat2) => box(w2, h2, d2, x2, y2 + y, z2, mat2),
      x: cx, y: 2.0, z: n1 - T, faceX: false, toward: -1,
      w: w - 0.02, h: 3.4,
      kind: 'rocket',
      ink: '#1d2228', paper: '#cfc8b6', soft: '#5a5f66',
      t0: i / PANELS, t1: (i + 1) / PANELS,
      seed: `vehicle-${i}`,
    });
  }
}

function buildCourtyard(){
  const C = B.courtyard;
  const cx = (C.x0 + C.x1) / 2, cz = (C.z0 + C.z1) / 2;
  const w = C.x1 - C.x0, d = C.z1 - C.z0;

  const paving = box(w, 0.3, d, cx, ENTRY_Y - 0.15, cz, M.paving);
  paving.castShadow = false;

  // A lawn in the middle, with paving round it and a cross path through it.
  const lawn = new THREE.Mesh(new THREE.PlaneGeometry(w - 9, d - 9), M.grass);
  lawn.rotation.x = -Math.PI / 2;
  lawn.position.set(cx, ENTRY_Y + 0.012, cz);
  lawn.receiveShadow = true;
  scene.add(lawn);
  for(const [pw, pd] of [[w - 9, 2.4], [2.4, d - 9]]){
    const path = new THREE.Mesh(new THREE.PlaneGeometry(pw, pd), M.paving);
    path.rotation.x = -Math.PI / 2;
    path.position.set(cx, ENTRY_Y + 0.02, cz);
    scene.add(path);
  }

  // Four planted beds, one to each corner of the lawn, with a tree in each.
  for(const sx of [-1, 1]){
    for(const sz of [-1, 1]){
      const px = cx + sx * (w / 2 - 5.6), pz = cz + sz * (d / 2 - 5.6);
      box(3.2, 0.5, 3.2, px, ENTRY_Y + 0.25, pz, M.planter);
      box(2.9, 0.06, 2.9, px, ENTRY_Y + 0.52, pz, M.soil).castShadow = false;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.19, 3.0, 8), M.trunk);
      trunk.position.set(px, ENTRY_Y + 2.0, pz);
      trunk.castShadow = true;
      scene.add(trunk);
      for(let i = 0; i < 3; i++){
        const crown = new THREE.Mesh(new THREE.SphereGeometry(1.5 - i * 0.28, 12, 8), M.foliage);
        crown.position.set(px, ENTRY_Y + 3.3 + i * 0.85, pz);
        crown.scale.y = 0.72;
        crown.castShadow = true;
        scene.add(crown);
      }
      // The bed is a soft collider, not a box: the player walks round it, and a
      // hard box on a 3 m planter catches a shoulder on the corner.
      softColliders.push({ x: px, z: pz, r: 2.2 });
    }
  }

  // Benches facing the lawn, and the lamps along the cross path. The lamps are
  // emissive spheres on posts — the light budget is three, and the key light is
  // pointed at the plot boards.
  // Four of them, flanking the cross path rather than sitting on it. On the centre
  // line — where they were first — a bench is a bollard in the middle of the one
  // route everybody walks, and the walk test found both of them.
  for(const sx of [-1, 1]){
    for(const sz of [-1, 1]){
      // 3.0 m off the centre line, not 5.5: at 5.5 they stood one and a half
      // metres from the straight line in from the south doors, which is inside a
      // bench's own radius plus a shoulder.
      const bx = cx + sx * 3.0, bz = cz + sz * 9.0;
      box(2.0, 0.1, 0.55, bx, ENTRY_Y + 0.44, bz, M.frame).castShadow = false;
      box(2.0, 0.55, 0.1, bx, ENTRY_Y + 0.72, bz + sz * 0.28, M.frame).castShadow = false;
      softColliders.push({ x: bx, z: bz, r: 1.2 });
    }
  }
  for(const sx of [-1, 1]){
    for(const sz of [-1, 1]){
      const lx = cx + sx * (w / 2 - 2.4), lz = cz + sz * (d / 2 - 2.4);
      box(0.16, 3.2, 0.16, lx, ENTRY_Y + 1.6, lz, M.frame).castShadow = false;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), M.pathLamp);
      head.position.set(lx, ENTRY_Y + 3.3, lz);
      scene.add(head);
      softColliders.push({ x: lx, z: lz, r: 0.5 });
    }
  }

  // The flagpole, at half-mast. Nobody says why in this game and nobody has to:
  // it is the fourth day of a mission that may not come back.
  //
  // Clear of everything anybody walks along. In the middle of the courtyard it
  // stood exactly where the two paths cross and split the view down the axis in
  // two; moved half way to the corner it stood in the doorway from the south leg.
  // On the lawn, east side, between the cross path and the north planter.
  const px = cx + 11.4, pz = cz + 4.5;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 11, 10), M.top);
  pole.position.set(px, ENTRY_Y + 5.5, pz);
  pole.castShadow = true;
  scene.add(pole);
  const flag = box(1.9, 1.1, 0.04, px + 0.98, ENTRY_Y + 6.4, pz,
    new THREE.MeshStandardMaterial({ color: 0x9aa4ae, roughness: 0.9 }));
  flag.castShadow = false;
  box(1.1, 0.24, 1.1, px, ENTRY_Y + 0.12, pz, M.planter).castShadow = false;   // its base
  softColliders.push({ x: px, z: pz, r: 0.8 });
}

/**
 * The night sky over the courtyard.
 *
 * A dome and a star field, both with `fog: false` — the room's fog closes at 88 m
 * and would otherwise paint the sky the colour of the far wall. No sun rig: there
 * is no daylight in this game, and `updateTimeOfDay` still returns null.
 */
function buildSky(){
  const geo = new THREE.SphereGeometry(150, 24, 16);
  const colours = [];
  const top = new THREE.Color(0x070c16), horizon = new THREE.Color(0x1d2836);
  const pos = geo.attributes.position;
  for(let i = 0; i < pos.count; i++){
    const t = Math.max(0, pos.getY(i) / 150);
    const c = horizon.clone().lerp(top, Math.pow(t, 0.65));
    colours.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colours, 3));
  const dome = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
  dome.position.y = ENTRY_Y;
  scene.add(dome);
  scene.background = null;               // the dome is the background now

  const stars = [];
  for(let i = 0; i < 700; i++){
    const u = Math.random(), v = Math.random() * 0.5;      // upper hemisphere only
    const theta = u * Math.PI * 2, phi = Math.acos(1 - 2 * v);
    stars.push(
      Math.sin(phi) * Math.cos(theta) * 140,
      Math.abs(Math.cos(phi)) * 140 + ENTRY_Y,
      Math.sin(phi) * Math.sin(theta) * 140);
  }
  const field = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(stars, 3)),
    new THREE.PointsMaterial({ color: 0xdce6f2, size: 0.9, sizeAttenuation: true, fog: false }));
  scene.add(field);
}

/** The wall of plot boards: the only bright thing in the room. */
function buildBoards(){
  const y = 2.4;
  for(const b of BOARDS){
    const screen = instrumentScreen({
      kind: 'panel', title: b.label,
      rows: [
        { label: 'STATUS', value: 'HOLD', status: 'normal' },
        { label: 'GET', value: '000:00', status: 'normal' },
      ],
    }, { w: 512, h: 256 });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(b.w, b.h), new THREE.MeshStandardMaterial({
      map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
      emissiveIntensity: 0.85, roughness: 0.9,
    }));
    mesh.position.set(b.x, y + b.h / 2, R.front + 0.2);
    scene.add(mesh);
    // A bezel, so the boards read as hardware rather than as paint.
    box(b.w + 0.4, b.h + 0.4, 0.16, b.x, y + b.h / 2, R.front + 0.1, M.frame).castShadow = false;
    boardScreens.push({ mesh, screen });
  }
}

/**
 * One console cluster: a desk on its tier, three screens, a nameplate, and the
 * chairs. The desk is the mission stop — walking to it and pressing E is what
 * a door is in the other games.
 */
function buildConsole(spec, def){
  const y = rowY(spec.row);
  const z = R.rowZ[spec.row];
  const colour = def?.color ? new THREE.Color(def.color) : new THREE.Color(0x4d5a66);

  // Desk
  const desk = box(spec.w, 0.78, 1.5, spec.x, y + 0.39, z, M.desk);
  box(spec.w + 0.12, 0.06, 1.62, spec.x, y + 0.8, z, M.top).castShadow = false;
  collide(spec.x, z, spec.w + 0.2, 1.7, y, 0.85);

  // Screens along the back of the desk, tilted up at the player.
  const screen = instrumentScreen({
    kind: 'panel', title: spec.name,
    rows: [
      { label: 'CALL', value: 'OPEN', status: 'alarm' },
      { label: 'LAST', value: '—', status: 'normal' },
    ],
  }, { w: 384, h: 256 });
  // Kept small. At 0.42 of the desk width the INTEG screen was 4.6 m across and
  // read as a wall panel floating in the middle of the room rather than as
  // something sitting on a desk.
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.52),
    new THREE.MeshStandardMaterial({
      map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
      emissiveIntensity: 0.7, roughness: 0.85,
    }));
  panel.position.set(spec.x, y + 1.12, z - 0.45);
  panel.rotation.x = -0.18;
  scene.add(panel);
  areaScreens.set(spec.group, panel);
  // Two blank repeaters either side, angled in. A single screen on an eight
  // metre desk reads as a desk with a television on it.
  for(const sx of [-1, 1]){
    const rep = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.44),
      new THREE.MeshStandardMaterial({
        map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
        emissiveIntensity: 0.4, roughness: 0.9,
      }));
    rep.position.set(spec.x + sx * (spec.w * 0.3), y + 1.06, z - 0.42);
    rep.rotation.set(-0.16, -sx * 0.28, 0);
    scene.add(rep);
  }
  consoleScreens.push({ panel, screen, group: spec.group, name: spec.name });

  // A coloured strip along the desk front, in the area's own colour: the one
  // place colour identifies a team, and it is never the only channel — the
  // nameplate says it too.
  const strip = box(spec.w, 0.09, 0.06, spec.x, y + 0.72, z + 0.78,
    new THREE.MeshStandardMaterial({ color: colour, emissive: colour, emissiveIntensity: 0.5, roughness: 0.6 }));
  strip.castShadow = false;

  // Nameplate on a small stand, readable from the aisle. Single-sided: text on
  // a DoubleSide material renders mirrored from behind.
  const plate = instrumentScreen({ kind: 'panel', title: spec.name, rows: [] }, { w: 384, h: 96 });
  const plateMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.36),
    new THREE.MeshStandardMaterial({
      map: plate.texture, emissive: 0xffffff, emissiveMap: plate.texture,
      emissiveIntensity: 0.5, roughness: 0.9, side: THREE.FrontSide,
    }));
  plateMesh.position.set(spec.x, y + 1.06, z + 0.79);
  plateMesh.rotation.y = Math.PI;
  scene.add(plateMesh);

  // Chairs, so the console is somewhere people sit rather than a plinth.
  for(let i = 0; i < Math.max(2, Math.round(spec.w / 3.4)); i++){
    const cx = spec.x - spec.w / 2 + 1.6 + i * 3.0;
    box(0.62, 0.1, 0.6, cx, y + 0.46, z + 1.2, M.frame).castShadow = false;
    box(0.62, 0.7, 0.1, cx, y + 0.8, z + 1.48, M.frame).castShadow = false;
    softColliders.push({ x: cx, z: z + 1.25, r: 0.42 });
  }

  // A console with no `group` is one of the room's other positions — Retrofire,
  // Booster, Procedures, Public Affairs. It is furniture and crew: no beacon, no
  // stop, nothing to press E on. Four of the six areas of study work in the wings
  // now, and their desks are not in here pretending to be empty.
  if(!spec.group) return;

  const beacon = addCaseBeacon(scene, {
    x: spec.x, z: z + 1.9, y: y + 0.02,
    colour: def?.color ?? 0xf0b429,
    label: spec.name, height: 2.15,
  });
  beacon.setActive(false);
  beacons.set(spec.group, beacon);

  // The stop. `entry` is where the player ends up standing: in the aisle behind
  // the desk, facing the boards.
  stopMeshes.set(spec.group, {
    id: spec.group, name: spec.name, desk,
    pos: new THREE.Vector3(spec.x, y, z),
    entry: new THREE.Vector3(spec.x, y, z + 2.6),
  });

  // `case`, not `door`. A door hands off to the interior manager, which builds
  // the team's room out in the district four kilometres away and teleports the
  // player into it — right in the other games, where a door is the way into a
  // place you are not yet standing in, and wrong here: the console IS the
  // workplace, and the player is already in the room.
  interactables.push({
    mesh: desk, type: 'case', id: spec.group,
    prompt: `E — Take the ${spec.name} console`,
  });

  peopleStations.push({
    id: spec.group, x: spec.x - spec.w / 2 - 1.4, z: z + 1.1,
    facing: Math.PI,                      // facing the boards, like everyone else
  });
}

/** The glass gallery across the back wall, above the last row. */
function buildGallery(){
  const { halfWidth: HW, back, ceiling } = R;
  const y = rowY(R.rowZ.length - 1) + 2.6;
  box(HW * 2 - 1, 0.25, 4.4, 0, y, back - 2.4, M.frame).castShadow = false;
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(HW * 2 - 2, 1.5), M.glass);
  glass.position.set(0, y + 0.85, back - 4.6);
  scene.add(glass);
  for(let i = -4; i <= 4; i++){
    box(0.14, ceiling - y - 0.2, 0.14, i * 5, y + (ceiling - y) / 2, back - 4.6, M.frame).castShadow = false;
  }
  // The gallery floor is solid to anyone underneath it.
  collide(0, back - 2.4, HW * 2, 4.4, y, 0.3);
}

// ------------------------------------------------------------------ waypoint
function makeWaypoint(){
  const g = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.045, 8, 24),
    new THREE.MeshStandardMaterial({ color: 0xf2c14e, emissive: 0xf2c14e, emissiveIntensity: 1.0, roughness: 0.5 }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.05;
  g.add(ring);
  g.userData.ring = ring;
  scene.add(g);
  return g;
}
export function getWaypointMesh(){ return waypointMesh ?? (waypointMesh = makeWaypoint()); }
export function setWaypointPosition(x, z){
  const w = getWaypointMesh();
  w.position.set(x, groundHeight(x, z) + 0.02, z);
  w.visible = true;
}
export function getStopPosition(id){
  return stopMeshes.get(id)?.pos ?? new THREE.Vector3();
}
export function getStopEntry(id){
  return stopMeshes.get(id)?.entry ?? new THREE.Vector3();
}

// ---------------------------------------------------------------- initWorld
export function initWorld(canvas, activeTheme){
  theme = activeTheme;
  const look = theme.look ?? {};

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = look.exposure ?? 1.0;

  scene = new THREE.Scene();
  const fog = look.fog ?? { colour: 0x0d1116, near: 24, far: 78 };
  scene.fog = new THREE.Fog(fog.colour, fog.near, fog.far);
  scene.background = new THREE.Color(fog.colour);

  buildMaterials();

  // Environment, damped. `scene.environmentIntensity` does not exist before
  // three r163 and setting it is silent — a submarine once rendered with every
  // bulkhead lifted to pale sage that way.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromScene(new RoomEnvironment(renderer), 0.06);
  scene.environment = rt.texture;
  pmrem.dispose();

  // Three real lights, which is the whole budget spent: a soft ambient, a
  // hemisphere, and one key from above the boards so the desks cast shadows
  // back up the room.
  const L = look.lighting ?? {};
  scene.add(new THREE.AmbientLight(0xa8bcd0, L.ambient ?? 0.42));
  scene.add(new THREE.HemisphereLight(0xc6d8e6, 0x1b2026, L.hemi ?? 0.5));
  const key = new THREE.DirectionalLight(0xdce8f2, L.key ?? 0.85);
  key.position.set(0, 14, R.front + 4);
  key.target.position.set(0, 0, R.back - 8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 70;
  key.shadow.camera.left = -26; key.shadow.camera.right = 26;
  key.shadow.camera.top = 26; key.shadow.camera.bottom = -26;
  key.shadow.bias = -0.0005;
  scene.add(key, key.target);

  // One more real light than the room had: a moon over the courtyard, so the
  // paving, the lawn and the trees read as lit from somewhere rather than as flat
  // colour. Four of the six-light budget, and it casts no shadows — the key light
  // over the boards is the only shadow map in this game.
  const moon = new THREE.DirectionalLight(0xbcd0e8, L.moon ?? 0.5);
  moon.position.set(-30, 40, 70);
  moon.target.position.set(0, ENTRY_Y, 40);
  scene.add(moon, moon.target);

  buildRoom();
  buildBoards();
  buildGallery();
  buildSky();
  buildRing();
  buildCourtyard();

  // `groups` first: `const` is not hoisted, and reading it above this line throws
  // "Cannot access 'groups' before initialization" — the same trap the entry
  // points hit with `day` and `driving`.
  const groups = theme.content?.GROUPS ?? [];
  for(const c of CONSOLES) buildConsole(c, groups.find(g => g.id === c.group));
  for(const r of WORKROOMS) buildWorkroom(r, groups.find(g => g.id === r.group));
  furnishRingSigns();
  paintVehicleWall();
  paintControlRoomSeal();
  // No scatter on the tiers. Chairs, bins and boxes strewn between the consoles
  // raised the piece count and made the room look like a jumble sale: this floor
  // is a stepped auditorium facing a wall of boards, and the emptiness of the
  // treads is what lets every row see over the row in front. The count is not
  // worth the room. The wing rooms behind it are a different matter — those are
  // working laboratories and are furnished in `buildWorkroom`.

  // The status board, on the back wall by the doors.
  const statusScreen = instrumentScreen({ kind: 'panel', title: 'FLIGHT STATUS', rows: [] }, { w: 512, h: 256 });
  const status = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.6),
    new THREE.MeshStandardMaterial({
      map: statusScreen.texture, emissive: 0xffffff, emissiveMap: statusScreen.texture,
      emissiveIntensity: 0.6, roughness: 0.9, side: THREE.FrontSide,
    }));
  const backY = rowY(R.rowZ.length - 1);
  status.position.set(-14, backY + 2.0, R.back - 0.2);
  status.rotation.y = Math.PI;
  scene.add(status);
  interactables.push({ mesh: status, type: 'board', id: 'BOARD', prompt: 'E — Open the flight status board' });
  boardScreens.push({ mesh: status, screen: statusScreen });

  dampEnvironment(scene, 0.45);

  getWaypointMesh().visible = false;
  return { scene, renderer };
}

// ------------------------------------------------------------- state -> world
export function updateWorldFromState(state, nextStopId = null, pct = () => 0){
  if(!state) return;
  const groups = theme?.content?.GROUPS ?? [];
  for(const c of consoleScreens){
    const g = groups.find(x => x.id === c.group);
    const done = Math.round(pct(c.group) ?? 0);
    const verdict = state.areaVerdict?.[c.group];
    c.screen.set({
      title: c.name,
      status: verdict === 'unresolved' ? 'alarm' : 'normal',
      rows: [
        { label: 'CALL', value: verdict === 'unresolved' ? 'OPEN' : 'CLEAR',
          status: verdict === 'unresolved' ? 'alarm' : 'normal' },
        { label: 'READY', value: `${done} %`, status: done > 60 ? 'high' : 'normal' },
      ],
    });
    void g;
  }
  const m = state.week ?? 1;
  for(const b of boardScreens){
    b.screen.set({
      rows: [
        { label: 'SHIFT', value: `${m} / 15`, status: 'normal' },
        { label: 'CALLS OPEN', value: String(state.groups?.filter(x => state.areaVerdict?.[x.id] === 'unresolved').length ?? 0),
          status: 'normal' },
      ],
    });
  }

  // Every console with a call still open is lit, not just the next one: the day
  // is taken in any order.
  const open = openCaseGroups();
  for(const [id, b] of beacons) b.setActive(open.has(id));

  const target = nextStopId ? stopMeshes.get(nextStopId) : null;
  if(target) setWaypointPosition(target.entry.x, target.entry.z);
  else if(waypointMesh) waypointMesh.visible = false;
}

/**
 * There is no time of day in a windowless room, and that is the point: the
 * only clock in Mission Control is the mission clock. Kept because the contract
 * requires it.
 */
export function updateTimeOfDay(){ return null; }

export function getPeopleStations(){ return peopleStations; }
export function getExtraSpots(){
  // The aisles: down each side and along the back, where controllers actually
  // stand when they are not at a console.
  const out = [];
  for(const row of R.rowZ){
    out.push({ x: -19, z: row + 1.5 }, { x: 19, z: row + 1.5 });
  }
  for(let i = -2; i <= 2; i++) out.push({ x: i * 6, z: R.back - 3 });
  // And the building outside it. A ring corridor with nobody in it reads as a
  // service passage rather than as the place the shift walks through, so a few of
  // the extras stand out here: along the glazing, and out in the courtyard.
  const C = B.courtyard;
  const mid = (x0, x1) => (x0 + x1) / 2;
  for(let i = -2; i <= 2; i++) out.push({ x: i * 7, z: mid(...B.southLeg) });
  out.push({ x: mid(-B.halfWidth, C.x0), z: 34 }, { x: mid(-B.halfWidth, C.x0), z: 46 });
  out.push({ x: mid(C.x1, B.halfWidth), z: 34 }, { x: mid(C.x1, B.halfWidth), z: 46 });
  out.push({ x: -6, z: mid(...B.northLeg) }, { x: 6, z: mid(...B.northLeg) });
  out.push({ x: C.x0 + 4, z: C.z0 + 4 }, { x: C.x1 - 4, z: C.z1 - 4 });
  return out;
}

let lastAnim = 0;
export function updateWorldAnimation(t){
  const delta = lastAnim ? Math.min(0.1, t - lastAnim) : 0.016;
  lastAnim = t;
  for(const b of beacons.values()) b.update(delta, camera);
  if(waypointMesh?.visible){
    waypointMesh.userData.ring.rotation.z = t * 0.9;
    waypointMesh.position.y = groundHeight(waypointMesh.position.x, waypointMesh.position.z)
      + 0.02 + Math.sin(t * 2) * 0.04;
  }
  for(const b of boardScreens){
    if(b.mesh.material) b.mesh.material.emissiveIntensity = 0.8 + Math.sin(t * 1.3) * 0.05;
  }
}
