// world.js — the Ellery Variety Theatre, wired to the engine's world contract.
//
// The engine ships two worlds: a town, and a floor with a corridor down the
// middle. Both are wrong for a theatre. A variety house is one enormous raked
// volume pointed at a hole in a wall, and putting the pit, the board and the
// house behind three doors off a corridor would have thrown that away and
// produced the hospital again — which is exactly what the first version of this
// theme did, as a backstage spine with rooms off it.
//
// So this is the fourth world in the repo, after `outdoorTown`, `interiorFloor`
// and Mission Control, and it satisfies the same contract:
// THEME_CONTRACT.md § "What the world module must provide".
//
// What makes it different to walk around in:
//   · four tiers of rake stepping down to the stage. `groundHeight` is a
//     staircase in z, and the treads at the centre of the stage front are the
//     one place in these games where the player walks *up* onto something;
//   · no door between the player and three of the six calls — the pit, the
//     production desk and the board are in sight of each other;
//   · the working building is a ring corridor round the scene-dock yard with
//     six offices off it, so a day walks somewhere;
//   · the light is stage light. Four real lights, and everything else that is
//     bright is emissive.
import * as THREE from 'three';
import { furnishArea, wordedSign, markWallMounted } from '../../engine/world/interiorKit.js';
import { buildDeliveryCase, deliveryHook } from '../../engine/world/deliveryCase.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { site, POSITIONS, OFFICES } from './site.js';
import { INTERIORS } from './interiors.js';
import { openCaseGroups } from '../../engine/core/app.js';
// The beacon's label billboards toward whoever is looking at it.
import { camera } from '../../engine/core/player.js';
import { instrumentScreen } from '../../engine/world/screens.js';
import { dampEnvironment, tuneRendererForDevice } from '../../engine/world/materials.js';
import { addCaseBeacon } from '../../engine/world/caseBeacon.js';

/** The campaign's delivery board, in the one office that keeps it. */
let deliveryCase = null;
/**
 * Tell the board what is in.
 *
 * Called on every world refresh: an office here is walked into rather than
 * entered through a door — `interiors` is empty and the stop is the desk — so
 * there is no arrival to hang it on, and the board has to be right the moment a
 * saved campaign loads.
 */
export function setDeliveryPieces(pieces){ deliveryCase?.setPieces(pieces); }

export let scene = null;
export let renderer = null;

export const colliders = [];        // Box3[]
export const softColliders = [];    // {x,z,r}[]
export const interactables = [];    // {mesh, type, id, prompt, info?}
/** groupId -> { id, name, pos, entry, desk } — one per call. */
export const stopMeshes = new Map();
/** groupId -> that area's own screen, so a call can change the place. */
export const areaScreens = new Map();

let theme = null;
let waypointMesh = null;
let peopleStations = [];
const R = site.house;
const ST = site.stage;
const B = site.building;
/** The floor level of the back of the stalls, the ring and the yard. */
const ENTRY_Y = (R.rowZ.length - 1) * R.rowStep;
/** How far up the rake the treads at the stage front run. */
const STEP_RUN = 1.6, STEP_HALF = 2.6;
const houseScreens = [];
const deskScreens = [];
/** groupId -> the beacon at that call, lit while it is open. */
const beacons = new Map();
let ghostLamp = null;

/**
 * The floor is a staircase, and this is the only description of it.
 *
 * Tier 0 is at the front, nearest the stage, and lowest. Each tier behind it is
 * `rowStep` higher. Anything that needs to know how high the floor is here —
 * the player, the crowd, a seat, a desk — asks this and nothing else.
 */
export function groundHeight(x, z){
  const { rowZ, rowStep, front, back, halfWidth } = R;
  // The stage, through the proscenium: a metre up, and the one surface in this
  // game the player climbs onto.
  if(z <= front) return ST.floor;
  // The treads at the centre of the stage front. Everywhere else along that line
  // is a hard edge with a collider on it, because a stage edge is a drop.
  if(z < front + STEP_RUN && Math.abs(x) <= STEP_HALF){
    const t = (z - front) / STEP_RUN;
    return ST.floor * (1 - Math.min(1, t));
  }
  // Outside the auditorium — the ring corridor, the offices and the yard — the
  // floor is flat and level with the back of the stalls, so the pass doors are
  // step-free. The staircase belongs to the house and only to the house.
  if(z > back || Math.abs(x) > halfWidth) return ENTRY_Y;
  // Behind the last tier, flat at the back of the stalls.
  if(z >= rowZ[rowZ.length - 1]) return (rowZ.length - 1) * rowStep;
  // In front of the first tier — the apron and the pit — flat at stalls level.
  if(z <= rowZ[0]) return 0;
  for(let i = 0; i < rowZ.length - 1; i++){
    if(z >= rowZ[i] && z < rowZ[i + 1]){
      // The step itself is a short ramp rather than a lip: a hard 0.6 m rise
      // stops the player dead.
      const t = (z - rowZ[i]) / (rowZ[i + 1] - rowZ[i]);
      const ramp = Math.min(1, Math.max(0, (t - 0.62) / 0.28));
      return (i + ramp) * rowStep;
    }
  }
  return 0;
}

const rowY = (row) => row * R.rowStep;

// ------------------------------------------------------------------ materials
//
// A 1911 variety house: dark green dado, cream plaster, gilt on the plasterwork,
// mahogany rails, red plush seats. Everything backstage is scene-paint black and
// bare timber, because that half of the building was never meant to be looked at.
const M = {};
function buildMaterials(){
  M.plaster = new THREE.MeshStandardMaterial({ color: 0x9e947c, roughness: 0.94, envMapIntensity: 0.35 });
  M.dado = new THREE.MeshStandardMaterial({ color: 0x24382c, roughness: 0.85, envMapIntensity: 0.3 });
  M.gilt = new THREE.MeshStandardMaterial({ color: 0x8a6f3c, roughness: 0.42, metalness: 0.55, envMapIntensity: 0.7 });
  M.mahogany = new THREE.MeshStandardMaterial({ color: 0x4a2c1e, roughness: 0.6, envMapIntensity: 0.4 });
  M.carpet = new THREE.MeshStandardMaterial({ color: 0x3a1f22, roughness: 0.97, envMapIntensity: 0.25 });
  M.riser = new THREE.MeshStandardMaterial({ color: 0x241417, roughness: 0.95 });
  M.plush = new THREE.MeshStandardMaterial({ color: 0x6d1f24, roughness: 0.9, envMapIntensity: 0.3 });
  M.seatFrame = new THREE.MeshStandardMaterial({ color: 0x2b211c, roughness: 0.7, metalness: 0.2 });
  M.black = new THREE.MeshStandardMaterial({ color: 0x16171a, roughness: 0.96, envMapIntensity: 0.2 });
  M.deck = new THREE.MeshStandardMaterial({ color: 0x2a2622, roughness: 0.95, envMapIntensity: 0.2 });
  M.timber = new THREE.MeshStandardMaterial({ color: 0x6d5334, roughness: 0.88, envMapIntensity: 0.35 });
  M.steel = new THREE.MeshStandardMaterial({ color: 0x5a6068, roughness: 0.45, metalness: 0.55, envMapIntensity: 0.5 });
  M.desk = new THREE.MeshStandardMaterial({ color: 0x3b3a38, roughness: 0.66, metalness: 0.15, envMapIntensity: 0.45 });
  M.top = new THREE.MeshStandardMaterial({ color: 0x574f45, roughness: 0.62, metalness: 0.12 });
  M.canvas = new THREE.MeshStandardMaterial({ color: 0x7a6c52, roughness: 0.95 });
  M.curtain = new THREE.MeshStandardMaterial({ color: 0x5a161c, roughness: 0.98, envMapIntensity: 0.2 });
  // ---- the working building
  M.corridorWall = new THREE.MeshStandardMaterial({ color: 0x6f6a5c, roughness: 0.92, envMapIntensity: 0.4 });
  M.corridorFloor = new THREE.MeshStandardMaterial({ color: 0x3b3630, roughness: 0.8, envMapIntensity: 0.3 });
  M.paving = new THREE.MeshStandardMaterial({ color: 0x4a4640, roughness: 0.96, envMapIntensity: 0.3 });
  M.planter = new THREE.MeshStandardMaterial({ color: 0x54514a, roughness: 0.95 });
  M.soil = new THREE.MeshStandardMaterial({ color: 0x2b2419, roughness: 1.0 });
  M.foliage = new THREE.MeshStandardMaterial({ color: 0x33452e, roughness: 0.95 });
  M.trunk = new THREE.MeshStandardMaterial({ color: 0x3c3026, roughness: 0.95 });
  M.grass = new THREE.MeshStandardMaterial({ color: 0x2e3a24, roughness: 1.0 });
  // Emissive, never a real light: the fixture-per-lamp mistake is recorded twice
  // in this repo and it costs 100 fps.
  M.houseLamp = new THREE.MeshStandardMaterial({
    color: 0xf6dfae, emissive: 0xffc879, emissiveIntensity: 1.5, roughness: 0.5 });
  M.workLamp = new THREE.MeshStandardMaterial({
    color: 0xeef2f4, emissive: 0xd8e6ee, emissiveIntensity: 1.1, roughness: 0.6 });
  // The ghost light: one bare bulb, left burning on an empty stage. It is the
  // brightest thing in the building and the game is named after it.
  M.ghost = new THREE.MeshStandardMaterial({
    color: 0xfff2cf, emissive: 0xffdca0, emissiveIntensity: 3.0, roughness: 0.35 });
  M.glass = new THREE.MeshPhysicalMaterial({
    color: 0xcfe0ea, roughness: 0.04, metalness: 0, transmission: 0.95,
    transparent: true, opacity: 0.12, thickness: 0.02, envMapIntensity: 0.6,
  });
  M.corridorPanel = new THREE.MeshStandardMaterial({
    color: 0xeef1f2, emissive: 0xdde7ea, emissiveIntensity: 0.9, roughness: 0.68 });
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

// ------------------------------------------------------------------ the house
function buildHouse(){
  const { halfWidth: HW, front, back, ceiling, rowZ, rowStep } = R;

  // Floor: one slab per tier, plus the flat apron at the stage end and the flat
  // strip at the back where the pass doors are.
  const tiers = [
    { z0: front, z1: rowZ[0], y: 0 },
    ...rowZ.slice(0, -1).map((z, i) => ({ z0: z, z1: rowZ[i + 1], y: rowY(i) })),
    { z0: rowZ[rowZ.length - 1], z1: back, y: rowY(rowZ.length - 1) },
  ];
  for(const t of tiers){
    const d = t.z1 - t.z0;
    const slab = box(HW * 2, 0.3, d, 0, t.y - 0.15, (t.z0 + t.z1) / 2, M.carpet);
    slab.castShadow = false;
    if(t.y > 0) box(HW * 2, rowStep, 0.12, 0, t.y - rowStep / 2, t.z0, M.riser).castShadow = false;
  }

  // Side walls: dado to 1.1, plaster above, a gilt band at the join.
  for(const s of [-1, 1]){
    const cz = (front + back) / 2, len = back - front;
    box(0.3, 1.1, len, s * HW, 0.55, cz, M.dado);
    // Meeting the dado exactly. Started 0.1 m above it — which is invisible here,
    // because the gilt band below covers the joint — the same arithmetic on the
    // back wall left a slot the whole width of the house with the stalls showing
    // through it from the corridor. A gap a wall does not have is a window.
    box(0.3, ceiling - 1.1, len, s * HW, 1.1 + (ceiling - 1.1) / 2, cz, M.plaster);
    box(0.36, 0.1, len, s * HW, 1.15, cz, M.gilt).castShadow = false;
    collide(s * HW, cz, 0.6, len, 0, ceiling);
  }

  // The proscenium wall, with the 1958 opening in it. Two piers, a gilt arch
  // over them, and the working line the sightline argument is about.
  const ph = R.prosceniumHalf, pH = R.prosceniumH;
  const pier = HW - ph;
  for(const s of [-1, 1]){
    box(pier, ceiling, 0.5, s * (ph + pier / 2), ceiling / 2, front, M.plaster);
    collide(s * (ph + pier / 2), front, pier, 0.8, 0, ceiling);
    // The pier's own gilt panel, which is what makes it an arch rather than a hole
    // — and two more across the face of the pier, because the pier is 15.7 m wide
    // and photographed as a blank wall with a stage in the middle of it. The
    // proscenium was narrowed in 1958 and the piers are what it was narrowed with,
    // so they are the widest plain surfaces in the building.
    //
    // On the HOUSE side of the wall: `front` is the wall's centre line and the
    // wall is 0.5 m thick, so `front - 0.28` is behind it. Every ornament on this
    // wall was written that way and none of it had ever rendered — invisible in
    // exactly the way a mesh that exists, builds and throws nothing is.
    box(0.9, pH - 0.6, 0.16, s * (ph + 0.55), (pH - 0.6) / 2 + 0.3, front + 0.32, M.gilt)
      .castShadow = false;
    for(const px of [ph + 4.4, ph + 10.2]){
      box(0.7, pH - 1.6, 0.16, s * px, 1.1 + (pH - 1.6) / 2, front + 0.32, M.gilt)
        .castShadow = false;
      box(1.1, 0.3, 0.2, s * px, pH - 0.4, front + 0.34, M.gilt).castShadow = false;
    }
  }
  box(ph * 2, ceiling - pH, 0.5, 0, pH + (ceiling - pH) / 2, front, M.plaster);
  collide(0, front, ph * 2, 0.8, pH, ceiling - pH);
  box(ph * 2 + 1.6, 0.5, 0.2, 0, pH + 0.25, front + 0.34, M.gilt).castShadow = false;

  // The stage edge, either side of the treads: a 0.95 m drop, so it is solid.
  for(const s of [-1, 1]){
    const w = ph - STEP_HALF;
    box(w, ST.floor, 0.5, s * (STEP_HALF + w / 2), ST.floor / 2, front + 0.4, M.mahogany);
    collide(s * (STEP_HALF + w / 2), front + 0.4, w, 0.7, 0, ST.floor + 0.4);
  }
  // The treads themselves, at the centre. Three of them, drawn on the ramp
  // `groundHeight` already has: the geometry follows the floor rather than the
  // other way round, which is house rule 4 in a place with a step in it.
  for(let i = 0; i < 3; i++){
    const z = front + STEP_RUN * ((i + 0.5) / 3);
    box(STEP_HALF * 2, 0.1, STEP_RUN / 3, 0, ST.floor * (1 - (i + 0.5) / 3), z, M.mahogany)
      .castShadow = false;
  }

  // The back wall, in two halves with the pass doors between them.
  const dw = B.doorW / 2;
  const half = HW - dw;
  for(const s of [-1, 1]){
    box(half, 1.1, 0.3, s * (dw + half / 2), ENTRY_Y + 0.55, back, M.dado);
    box(half, ceiling - ENTRY_Y - 1.1, 0.3, s * (dw + half / 2),
      ENTRY_Y + 1.1 + (ceiling - ENTRY_Y - 1.1) / 2, back, M.plaster);
    collide(s * (dw + half / 2), back, half, 0.6, 0, ceiling);
  }
  // A header over the opening, measured from the FLOOR of the back tier: from
  // zero it would be a 0.95 m gap in a wall, which is a cat flap.
  const lintel = ENTRY_Y + 2.3;
  box(B.doorW, ceiling - lintel, 0.3, 0, lintel + (ceiling - lintel) / 2, back, M.plaster);
  collide(0, back, B.doorW, 0.6, lintel, ceiling - lintel);

  // Pilasters, a cornice and the two stage boxes.
  //
  // Everything above head height in a 1911 house is plasterwork, and without it
  // this room photographed as a conference hall with red seats in it: nine metres
  // of blank wall over the dado on both sides, because the only things on those
  // walls were the sconces at 3.4 m. None of it is walkable and none of it is a
  // collider — it is what the room is *for* the four days the player spends
  // arguing about what the front row can see.
  for(const s of [-1, 1]){
    for(let i = 0; i < 6; i++){
      const z = front + 4 + i * ((back - front - 8) / 5);
      box(0.22, ceiling - 2.6, 0.9, s * (HW - 0.16), 1.1 + (ceiling - 2.6) / 2, z, M.gilt)
        .castShadow = false;
    }
    box(0.5, 0.45, back - front, s * (HW - 0.1), ceiling - 0.9, (front + back) / 2, M.gilt)
      .castShadow = false;
  }
  box(HW * 2, 0.45, 0.5, 0, ceiling - 0.9, back - 0.1, M.gilt).castShadow = false;

  // The two stage boxes, one either side of the proscenium. Six seats each and
  // the worst sightlines in the building, which is the whole reason they are the
  // seats the licence argument keeps coming back to.
  for(const s of [-1, 1]){
    const bz0 = front + 2.2, bz1 = front + 7.4;
    const cz2 = (bz0 + bz1) / 2;
    box(3.2, 0.3, bz1 - bz0, s * (HW - 1.6), 4.6, cz2, M.plaster).castShadow = false;
    box(0.35, 1.0, bz1 - bz0, s * (HW - 3.05), 5.1, cz2, M.gilt).castShadow = false;
    // Both ends, and plaster from the parapet up to the canopy. With only the
    // downstage end closed the box photographed as two shelves cantilevered off
    // the wall — a parapet with nothing behind it is a shelf.
    for(const e of [bz0, bz1]){
      box(3.2, 1.0, 0.35, s * (HW - 1.6), 5.1, e, M.gilt).castShadow = false;
      box(3.2, 2.6, 0.3, s * (HW - 1.6), 6.9, e, M.plaster).castShadow = false;
    }
    // Its canopy, and the two brackets under it, so it is carried rather than
    // floating off the wall.
    box(3.6, 0.3, bz1 - bz0 + 0.6, s * (HW - 1.6), 8.2, cz2, M.plaster).castShadow = false;
    for(const t of [bz0 + 0.6, bz1 - 0.6]){
      box(2.6, 0.35, 0.35, s * (HW - 1.5), 4.3, t, M.gilt).castShadow = false;
    }
    for(let i = 0; i < 3; i++){
      const sx = s * (HW - 2.4 - i * 0.0);
      const sz = bz0 + 1.2 + i * 1.5;
      box(0.5, 0.09, 0.5, sx, 5.05, sz, M.plush).castShadow = false;
      box(0.5, 0.55, 0.1, sx + s * 0.28, 5.36, sz, M.plush).castShadow = false;
    }
  }

  // Ceiling, with a gilt centre rose and the house lamps round it. Emissive
  // only — a fixture per lamp is how a floor goes from 118 fps to 20.
  box(HW * 2, 0.2, back - front, 0, ceiling, (front + back) / 2, M.plaster).castShadow = false;
  const rose = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.8, 0.35, 20), M.gilt);
  rose.position.set(0, ceiling - 0.2, 0);
  scene.add(rose);
  for(let i = 0; i < 5; i++){
    const z = front + 6 + i * ((back - front - 10) / 4);
    for(const s of [-1, 1]){
      const sconce = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 10), M.houseLamp);
      // The floor is the only description of how high the floor is: house rule 4.
      sconce.position.set(s * (HW - 0.7), groundHeight(s * (HW - 0.7), z) + 3.4, z);
      scene.add(sconce);
      box(0.5, 0.16, 0.5, s * (HW - 0.42), sconce.position.y + 0.42, z, M.gilt).castShadow = false;
    }
  }
  for(let i = 0; i < 4; i++){
    const t = (i + 0.5) / 4;
    const p = box(6.0, 0.1, 1.2, 0, ceiling - 0.2, front + t * (back - front), M.workLamp);
    p.castShadow = false;
  }
}

/**
 * The seats.
 *
 * Nine hundred of them, and every one is a draw call unless it is instanced —
 * so the whole house is three `InstancedMesh`es and nothing else. The blocks
 * are colliders and the aisles are not: the player walks the centre and the two
 * side aisles, the same three routes the seat numbering assumes.
 */
function buildSeats(){
  const { halfWidth: HW, rowZ, back } = R;
  const PITCH_X = 0.62, PITCH_Z = 1.45, ROWS_PER_TIER = 4;
  // Aisles, as half-open bands in |x|: the centre aisle and one either side.
  const inAisle = (ax) => ax < 2.2 || (ax > 12.0 && ax < 13.6) || ax > HW - 1.3;

  const keepClear = POSITIONS.map(p => ({
    x: p.x, z: p.z ?? rowZ[p.row], w: p.w / 2 + 1.4, d: 3.4,
  }));
  const clear = (x, z) => !keepClear.some(k =>
    Math.abs(x - k.x) < k.w && Math.abs(z - k.z) < k.d);

  const bands = [];                       // one per seat row: y, z, and the blocks
  for(let tier = 0; tier < rowZ.length; tier++){
    const z0 = rowZ[tier];
    const z1 = tier + 1 < rowZ.length ? rowZ[tier + 1] : back;
    const y = rowY(tier);
    for(let r = 0; r < ROWS_PER_TIER; r++){
      const z = z0 + 1.3 + r * PITCH_Z;
      if(z > z1 - 1.0) continue;
      bands.push({ y, z });
    }
  }
  // The balcony's own rows, over the back of the stalls. Scenery: there are no
  // stairs to it, which is what the back of a variety house looks like from the
  // stalls and is not somewhere anybody has to stand.
  const bal = R.balcony;
  for(let r = 0; r < 3; r++){
    bands.push({ y: ENTRY_Y + bal.rise, z: bal.z0 + 1.4 + r * 1.5, balcony: true });
  }

  const spots = [];
  for(const band of bands){
    const limit = band.balcony ? HW - 4.0 : HW - 1.3;
    let runFrom = null, runTo = null;
    const flush = () => {
      if(runFrom === null) return;
      const w = runTo - runFrom + PITCH_X;
      if(!band.balcony && w > 1.0){
        collide((runFrom + runTo) / 2, band.z, w, 0.95, band.y, 0.95);
      }
      runFrom = runTo = null;
    };
    for(let x = -limit; x <= limit; x += PITCH_X){
      const ax = Math.abs(x);
      if((!band.balcony && inAisle(ax)) || (band.balcony && ax < 1.6)){ flush(); continue; }
      if(!band.balcony && !clear(x, band.z)){ flush(); continue; }
      spots.push({ x, y: band.y, z: band.z });
      if(runFrom === null) runFrom = x;
      runTo = x;
    }
    flush();
  }

  // Three instanced meshes and no more, because nine hundred seats is nine
  // hundred draw calls otherwise.
  //
  // The widths matter and the first pair was wrong: a 0.54 m pan and back on a
  // 0.62 m pitch leaves 0.08 m of gap, and every row photographed as a single
  // upholstered bench — a chapel, not a variety house. At 0.44 the standards show
  // between the seats and the row reads as seats a person is sold one of, which is
  // what the whole seat-map argument in this campaign is about.
  const n = spots.length;
  const seat = new THREE.InstancedMesh(new THREE.BoxGeometry(0.44, 0.1, 0.48), M.plush, n);
  const backRest = new THREE.InstancedMesh(new THREE.BoxGeometry(0.44, 0.64, 0.1), M.plush, n);
  const standard = new THREE.InstancedMesh(new THREE.BoxGeometry(0.07, 0.62, 0.52), M.seatFrame, n);
  const m4 = new THREE.Matrix4();
  spots.forEach((s, i) => {
    seat.setMatrixAt(i, m4.makeTranslation(s.x, s.y + 0.45, s.z));
    backRest.setMatrixAt(i, m4.makeTranslation(s.x, s.y + 0.8, s.z + 0.23));
    standard.setMatrixAt(i, m4.makeTranslation(s.x - 0.31, s.y + 0.31, s.z));
  });
  for(const im of [seat, backRest, standard]){
    im.castShadow = false; im.receiveShadow = true;
    im.instanceMatrix.needsUpdate = true;
    scene.add(im);
  }
}

/** The balcony over the back of the stalls, and the plasterwork under it. */
function buildBalcony(){
  const { halfWidth: HW, back, ceiling } = R;
  const bal = R.balcony;
  const y = ENTRY_Y + bal.rise;
  const d = bal.z1 - bal.z0;
  box(HW * 2 - 1.2, 0.3, d, 0, y, (bal.z0 + bal.z1) / 2 - 0.2, M.plaster).castShadow = false;
  // The front of it, gilt, which is the one thing everybody in the stalls looks
  // up at. Solid to anybody underneath.
  box(HW * 2 - 1.2, 1.0, 0.35, 0, y + 0.5, bal.z0, M.gilt).castShadow = false;
  collide(0, (bal.z0 + bal.z1) / 2 - 0.2, HW * 2, d, y, 0.3);
  for(const s of [-1, 1]){
    box(0.5, bal.rise, 0.5, s * (HW - 1.2), ENTRY_Y + bal.rise / 2, bal.z0, M.gilt);
    collide(s * (HW - 1.2), bal.z0, 0.7, 0.7, ENTRY_Y, bal.rise);
  }
  void ceiling;
}

/**
 * The stage, and the tower over it.
 *
 * A dark box with one lamp in it. Everything the player is arguing about for a
 * fortnight — what the grid will carry, what the beams reach, what the front row
 * can see — happens in this volume, and the point of it being walkable is that
 * a load plot is easier to believe standing under the bar it describes.
 */
function buildStage(){
  const half = ST.half, z0 = ST.z0, z1 = ST.z1, y = ST.floor;

  // The deck.
  box(half * 2, 0.3, z1 - z0, 0, y - 0.15, (z0 + z1) / 2, M.deck).castShadow = false;
  // Under the front of it, so the deck is not a hovering slab where the
  // proscenium opening shows its underside.
  box(half * 2, y, 0.2, 0, y / 2, z1 - 0.1, M.black).castShadow = false;

  // The tower: three walls and no ceiling the player can see, up to the grid.
  for(const s of [-1, 1]){
    box(0.4, ST.tower, z1 - z0, s * half, ST.tower / 2, (z0 + z1) / 2, M.black);
    collide(s * half, (z0 + z1) / 2, 0.7, z1 - z0, 0, ST.tower);
  }
  box(half * 2, ST.tower, 0.4, 0, ST.tower / 2, z0, M.black);
  collide(0, z0, half * 2, 0.7, 0, ST.tower);
  box(half * 2, 0.3, z1 - z0, 0, ST.tower, (z0 + z1) / 2, M.black).castShadow = false;

  // The grid: channels across the tower, and the bars hanging under it.
  for(let i = 0; i < 9; i++){
    const gz = z0 + 1.2 + i * ((z1 - z0 - 2.4) / 8);
    box(half * 2 - 0.8, 0.22, 0.14, 0, ST.grid, gz, M.steel).castShadow = false;
  }
  // Six bars, at the heights a get-in leaves them: two flown out, four in.
  const BARS = [
    { z: z0 + 2.0, h: 12.6, lit: false },
    { z: z0 + 4.4, h: 6.2, lit: true },
    { z: z0 + 6.6, h: 12.2, lit: false },
    { z: z0 + 8.6, h: 4.8, lit: false },
    { z: z0 + 10.6, h: 6.6, lit: true },
    { z: z1 - 1.4, h: 7.4, lit: true },
  ];
  for(const bar of BARS){
    box(half * 2 - 2.2, 0.12, 0.12, 0, bar.h, bar.z, M.steel).castShadow = false;
    // Its two lines, up to the grid.
    for(const s of [-1, 1]){
      box(0.05, ST.grid - bar.h, 0.05, s * (half - 2.0), bar.h + (ST.grid - bar.h) / 2, bar.z, M.steel)
        .castShadow = false;
    }
    if(!bar.lit) continue;
    // Lanterns on it, emissive and cold — the rig is patched and not focused.
    for(let i = -4; i <= 4; i++){
      box(0.34, 0.44, 0.34, i * 2.6, bar.h - 0.34, bar.z, M.black).castShadow = false;
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.14, 12), M.workLamp);
      lens.position.set(i * 2.6, bar.h - 0.56, bar.z + 0.02);
      lens.rotation.x = -Math.PI / 2.2;
      scene.add(lens);
    }
  }

  // The counterweight wall, house left: the cradles and the locking rail the fly
  // floor works from. It is the picture the vector questions are about.
  for(let i = 0; i < 12; i++){
    const cz = z0 + 2.2 + i * ((z1 - z0 - 4.4) / 11);
    box(0.5, 2.4 + (i % 4) * 0.7, 0.34, -half + 0.9, 3.2, cz, M.steel).castShadow = false;
    box(0.06, ST.grid - 1.0, 0.06, -half + 0.9, ST.grid / 2, cz, M.steel).castShadow = false;
  }
  box(0.3, 1.05, z1 - z0 - 3.0, -half + 1.6, y + 0.52, (z0 + z1) / 2, M.steel);
  collide(-half + 1.6, (z0 + z1) / 2, 0.6, z1 - z0 - 3.0, y, 1.1);

  // Two flats and a rostrum: enough that the deck is a stage in the middle of a
  // fit-up rather than an empty floor.
  box(0.14, 5.4, 3.6, -6.4, y + 2.7, z0 + 5.0, M.canvas);
  collide(-6.4, z0 + 5.0, 0.5, 3.8, y, 5.4);
  box(3.2, 5.0, 0.14, 5.6, y + 2.5, z0 + 3.4, M.canvas);
  collide(5.6, z0 + 3.4, 3.4, 0.5, y, 5.0);
  box(2.4, 0.9, 1.8, 7.6, y + 0.45, z0 + 8.0, M.timber);
  collide(7.6, z0 + 8.0, 2.6, 2.0, y, 0.9);

  // The house tabs, drawn back to the piers.
  for(const s of [-1, 1]){
    box(2.6, 8.4, 0.5, s * (R.prosceniumHalf - 1.3), y + 4.2, z1 - 0.7, M.curtain).castShadow = false;
  }

  // The ghost light. One bulb on a stand, centre stage, left burning because
  // the building is never left completely dark — and the reason this game has
  // the name it has.
  const gx = 0, gz = (z0 + z1) / 2 + 1.2;
  box(0.44, 0.06, 0.44, gx, y + 0.03, gz, M.steel).castShadow = false;
  box(0.07, 1.5, 0.07, gx, y + 0.78, gz, M.steel).castShadow = false;
  const cage = new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 10), M.ghost);
  cage.position.set(gx, y + 1.62, gz);
  scene.add(cage);
  ghostLamp = cage;
  softColliders.push({ x: gx, z: gz, r: 0.6 });
}

// -------------------------------------------------------------- the building
//
// The ring corridor and the yard. Everything here is at ENTRY_Y, so nothing in
// this section asks `groundHeight` — it is a flat floor by construction, and a
// second description of the height would be a second source of truth for it.

/**
 * A straight run of wall along x or z, with gaps left for openings and an
 * optional glazed band at eye height.
 *
 * Doing the gaps here rather than by hand is what stops a doorway and its
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
  const T = 0.3;

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
      const glass = new THREE.Mesh(
        new THREE.BoxGeometry(alongX ? len : 0.06, 1.8, alongX ? 0.06 : len), M.glass);
      glass.position.set(x, ENTRY_Y + 1.9, z);
      scene.add(glass);
      // Mullions every two and a half metres, or a nine-metre pane reads as a
      // gap. A mullion is as THICK as the wall and as thin as a post: the two
      // size arguments are (wall thickness, post thickness) whichever way the
      // wall runs, and writing the run's own length there puts a slab across the
      // corridor.
      const n = Math.max(1, Math.round(len / 2.5));
      for(let i = 1; i < n; i++){
        const u = s0 + (i / n) * len;
        box(alongX ? 0.1 : w, 1.8, alongX ? d : 0.1,
          alongX ? u : x, ENTRY_Y + 1.9, alongX ? z : u, M.steel).castShadow = false;
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
  const along = Math.max(w, d);
  const n = Math.max(1, Math.round(along / 4.5));
  for(let i = 0; i < n; i++){
    const t = (i + 0.5) / n;
    const px = w > d ? x0 + t * w : cx;
    const pz = w > d ? cz : z0 + t * d;
    box(w > d ? 2.6 : 1.0, 0.08, w > d ? 1.0 : 2.6, px, ENTRY_Y + B.ceiling - 0.14, pz,
      M.corridorPanel).castShadow = false;
  }
}

/**
 * The ring: four legs of corridor round the yard, glazed on the inside.
 *
 * The auditorium's own back wall is the south boundary, so this builds three
 * outer walls and four inner ones. The inner walls have the yard openings in them.
 */
function buildRing(){
  const HW = B.halfWidth;
  const C = B.courtyard;
  const [s0, s1] = B.southLeg;
  const [n0, n1] = B.northLeg;

  legSlab(-HW, HW, s0, s1);              // south leg, along the back of the stalls
  legSlab(-HW, C.x0, s1, n0);            // west leg
  legSlab(C.x1, HW, s1, n0);             // east leg
  legSlab(-HW, HW, n0, n1);              // north leg

  // The ring's own side walls, with a doorway for each office. One description
  // of each opening: the office builder does not cut its own door, so the hole
  // and the collider cannot end up in different places.
  const doorFor = (r) => {
    const c = (r.z0 + r.z1) / 2, h = B.roomDoorW / 2;
    return [c - h, c + h];
  };
  for(const side of ['w', 'e']){
    const x = side === 'w' ? -HW : HW;
    wallRun({ x, z: s0 }, { x, z: n1 },
      { height: B.ceiling, gaps: OFFICES.filter(r => r.side === side).map(doorFor) });
  }
  // The far end of the ring: the stage door, and it is shut.
  //
  // An opening here would be the way out to the street — and there is no street.
  // `BOUNDS` in player.js is 105 m, so a hole in this wall is forty-five metres
  // of flat nothing at corridor height that the player can walk into and see the
  // building from behind. So the run is solid and the door is a leaf in it, with
  // the keeper's hatch beside it.
  wallRun({ x: -HW, z: n1 }, { x: HW, z: n1 }, { height: B.ceiling });
  box(1.7, 2.3, 0.12, 0, ENTRY_Y + 1.15, n1 - 0.22, M.mahogany).castShadow = false;
  box(2.3, 0.3, 0.4, 0, ENTRY_Y + 2.6, n1 - 0.3, M.timber).castShadow = false;
  box(1.3, 1.0, 0.14, -2.6, ENTRY_Y + 1.5, n1 - 0.22, M.timber).castShadow = false;

  // Inner walls, glazed, with the ways out into the yard: two off the south leg
  // where the traffic from the house is, and one at the far end by the dock doors.
  wallRun({ x: C.x0, z: C.z0 }, { x: C.x1, z: C.z0 },
    { height: B.ceiling, glaze: true, gaps: [[-9, -5], [5, 9]] });
  wallRun({ x: C.x0, z: C.z1 }, { x: C.x1, z: C.z1 },
    { height: B.ceiling, glaze: true, gaps: [[-2, 2]] });
  wallRun({ x: C.x0, z: C.z0 }, { x: C.x0, z: C.z1 }, { height: B.ceiling, glaze: true });
  wallRun({ x: C.x1, z: C.z0 }, { x: C.x1, z: C.z1 }, { height: B.ceiling, glaze: true });
}

/**
 * One office off the ring.
 *
 * Three of the six areas of study work in these rather than in the house, and
 * three more rooms carry the building rather than a lesson — the dock, the green
 * room, the wardrobe. The desk is against the outer wall facing the door with
 * the area's board over it, so the room reads from the doorway the way an
 * interior does in the other games.
 */
function buildOffice(spec, def){
  const HW = B.halfWidth, WG = B.wing;
  const f = spec.side === 'w' ? -1 : 1;              // which way is "out"
  const xIn = f * HW, xOut = f * (HW + WG);          // corridor wall, outer wall
  const cx = (xIn + xOut) / 2, cz = (spec.z0 + spec.z1) / 2;
  const len = spec.z1 - spec.z0;
  const colour = def?.color ? new THREE.Color(def.color) : new THREE.Color(0x6a5b44);
  const y = ENTRY_Y;
  const H = B.ceiling;

  box(WG, 0.3, len, cx, y - 0.15, cz, M.corridorFloor).castShadow = false;
  box(WG, 0.2, len, cx, y + H, cz, M.corridorWall).castShadow = false;
  for(const t of [-1, 1]){
    box(WG - 1.6, 0.08, 1.1, cx, y + H - 0.14, cz + t * len / 4, M.corridorPanel)
      .castShadow = false;
  }

  // The outer wall and the two end walls. The corridor wall is built by the ring,
  // which leaves this room's doorway in it.
  wallRun({ x: xOut, z: spec.z0 }, { x: xOut, z: spec.z1 }, { height: H });
  for(const z of [spec.z0, spec.z1]) wallRun({ x: xIn, z }, { x: xOut, z }, { height: H });

  // The desk, against the outer wall.
  const desk = box(1.5, 0.78, 3.6, xOut - f * 1.1, y + 0.39, cz, M.desk);
  box(1.62, 0.06, 3.7, xOut - f * 1.1, y + 0.8, cz, M.top).castShadow = false;
  collide(xOut - f * 1.1, cz, 1.7, 3.8, y, 0.85);
  for(const t of [-1.1, 1.1]){
    box(0.62, 0.1, 0.6, xOut - f * 2.3, y + 0.46, cz + t, M.seatFrame).castShadow = false;
    softColliders.push({ x: xOut - f * 2.3, z: cz + t, r: 0.42 });
  }

  // The nameplate by the door, which is what tells the player they are in the
  // right office before they read anything else.
  const plate = instrumentScreen({ kind: 'panel', title: spec.name, rows: [] }, { w: 384, h: 96 });
  const plateMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.42),
    new THREE.MeshStandardMaterial({
      map: plate.texture, emissive: 0xffffff, emissiveMap: plate.texture,
      emissiveIntensity: 0.5, roughness: 0.9, side: THREE.FrontSide,
    }));
  plateMesh.position.set(xIn - f * 0.22, y + 2.2, cz + 2.0);
  plateMesh.rotation.y = f * Math.PI / 2;
  scene.add(plateMesh);

  if(spec.group){
    // The area's own board, over the desk, and the rows the book authored for it.
    const rows = INTERIORS?.[spec.group]?.station?.rows ?? [];
    const screen = instrumentScreen({
      kind: 'panel', title: spec.name,
      rows: rows.length ? rows.slice(0, 3) : [{ label: 'CALL', value: 'OPEN', status: 'alarm' }],
    }, { w: 384, h: 256 });
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.68),
      new THREE.MeshStandardMaterial({
        map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
        emissiveIntensity: 0.7, roughness: 0.85,
      }));
    panel.position.set(xOut - f * 0.32, y + 1.75, cz);
    panel.rotation.y = -f * Math.PI / 2;
    scene.add(panel);
    areaScreens.set(spec.group, panel);
    deskScreens.push({ panel, screen, group: spec.group, name: spec.name });

    box(0.06, 0.09, 3.6, xOut - f * 1.86, y + 0.72, cz, new THREE.MeshStandardMaterial({
      color: colour, emissive: colour, emissiveIntensity: 0.5, roughness: 0.6,
    })).castShadow = false;

    const beacon = addCaseBeacon(scene, {
      x: xOut - f * 3.2, z: cz, y: y + 0.02,
      colour: def?.color ?? 0xf0b429,
      label: spec.name, height: 2.15,
    });
    beacon.setActive(false);
    beacons.set(spec.group, beacon);

    stopMeshes.set(spec.group, {
      id: spec.group, name: spec.name, desk,
      pos: new THREE.Vector3(xOut - f * 1.1, y, cz),
      entry: new THREE.Vector3(xOut - f * 3.4, y, cz),
    });
    // `case`, not `door`: a door hands off to the interior manager, which builds
    // a room four kilometres away and teleports the player into it. The office IS
    // the workplace and the player is standing in it.
    interactables.push({
      mesh: desk, type: 'case', id: spec.group,
      prompt: `E — Take the case in ${spec.name}`,
    });
    peopleStations.push({
      id: spec.group, x: xIn - f * 2.4, z: cz - 1.2,
      facing: f > 0 ? Math.PI / 2 : -Math.PI / 2,
    });
  }

  // ---- the delivery board, in the one office that keeps it
  //
  // The house has no door-rooms: `interiors` carries the desks' panel data and
  // nothing else, and this world module builds its own offices rather than going
  // through `interiorSite`. So the board goes up here, on the far end wall of the
  // office, which is the wall somebody coming through the door is looking at.
  let clear = null;
  const hook = deliveryHook(theme);
  if(hook && hook.where === spec.group){
    deliveryCase = buildDeliveryCase(scene, {
      id: spec.group,
      at: { x: cx, y: y + 1.9, z: spec.z1 - 0.22, rotY: Math.PI },
      name: hook.name, total: hook.total, colour: hook.colour,
      // These rooms sit on a raised tier, so the case has to be told where the
      // floor is; left at zero it stands under it.
      floorY: y,
      hard: (bx, bz, bw, bd, bh) => collide(bx, bz, bw, bd, y, bh),
    });
    interactables.push(...deliveryCase.interactables);
    // A board is not a point. Say which way its face looks, so an audit — and the
    // screenshot harness that finds it by this tag — can see it has width.
    markWallMounted(deliveryCase.wallObjects, false, -1, 'delivery board');
    clear = { x: cx, z: spec.z1 - 1.0, r: 2.4 };
  }

  furnishOffice(spec, { xIn, xOut, y, cz, clear });
}

/**
 * Fit out one office.
 *
 * The vocabulary is the building's own: racks of gel, flight cases, a bench with
 * a vice on it, timber stacked on end, the rail of costumes on castors that
 * follows every wardrobe in the world around. Measured before this, a room with
 * a desk and a door in it holds six pieces and reads as a corridor.
 */
function furnishOffice(spec, { xIn, xOut, y, cz, clear = null }){
  const f = spec.side === 'w' ? -1 : 1;
  const inX = xIn + f * 0.9, outX = xOut - f * 0.9;
  const id = spec.group ?? spec.id;

  const makers = {
    rack: (x, z) => {
      box(0.7, 2.0, 0.62, x, y + 1.0, z, M.steel);
      for(let i = 0; i < 6; i++){
        box(0.74, 0.16, 0.06, x, y + 0.5 + i * 0.26, z + 0.3, i % 2 ? M.timber : M.top);
      }
      collide(x, z, 0.8, 0.7, y, 2.0);
    },
    bench: (x, z) => {
      box(0.8, 0.06, 2.0, x, y + 0.88, z, M.timber);
      box(0.7, 0.8, 1.9, x, y + 0.44, z, M.desk);
      collide(x, z, 0.9, 2.1, y, 0.9);
    },
    flightCase: (x, z) => {
      const n = 1 + (Math.abs(Math.round(x * 3 + z)) % 3);
      for(let i = 0; i < n; i++) box(0.78, 0.4, 0.56, x, y + 0.2 + i * 0.41, z, M.black);
      collide(x, z, 0.86, 0.64, y, 0.42 * n);
    },
    timberStack: (x, z) => {
      for(let i = 0; i < 5; i++){
        box(0.16, 2.3, 0.16, x + (i - 2) * 0.2, y + 1.15, z, M.timber);
      }
      collide(x, z, 1.1, 0.4, y, 2.3);
    },
    gelFrames: (x, z) => {
      for(let i = 0; i < 4; i++){
        box(0.5, 0.5, 0.03, x, y + 1.1 + i * 0.02, z + i * 0.14,
          i % 2 ? M.plush : M.canvas).castShadow = false;
      }
      box(0.6, 1.0, 0.6, x, y + 0.5, z, M.desk);
      collide(x, z, 0.7, 0.7, y, 1.0);
    },
    rail: (x, z) => {
      box(0.06, 0.06, 2.2, x, y + 1.7, z, M.steel).castShadow = false;
      for(const s of [-1, 1]) box(0.05, 1.7, 0.05, x, y + 0.85, z + s * 1.0, M.steel);
      for(let i = 0; i < 9; i++){
        box(0.34, 1.0, 0.1, x, y + 1.1, z - 1.0 + i * 0.24,
          i % 3 ? M.canvas : M.plush).castShadow = false;
      }
      collide(x, z, 0.6, 2.3, y, 1.8);
    },
    stool: (x, z) => {
      box(0.36, 0.06, 0.36, x, y + 0.66, z, M.timber);
      for(const sx of [-1, 1]) for(const sz of [-1, 1]){
        box(0.035, 0.64, 0.035, x + sx * 0.13, y + 0.33, z + sz * 0.13, M.steel);
      }
    },
    ladder: (x, z) => {
      for(const s of [-1, 1]) box(0.07, 2.6, 0.07, x + s * 0.24, y + 1.3, z, M.timber);
      for(let i = 0; i < 7; i++) box(0.55, 0.05, 0.05, x, y + 0.3 + i * 0.36, z, M.timber);
      collide(x, z, 0.7, 0.3, y, 2.6);
    },
    bin: (x, z) => { box(0.34, 0.5, 0.34, x, y + 0.25, z, M.steel); },
  };

  // ---- what is on these walls
  //
  // 1911 building, 1958 equipment, a licence that expires on opening night.
  // Everything here could have been typed on the office machine that morning.
  const PAPER = { paper: '#e8e1cd', ink: '#221f1a', soft: '#544d42' };
  const NOTICES = {
    FRONT: [
      { style: 'grid', tag: 'ADVANCE', heading: 'Sold, by performance', accent: '#8a5a2b',
        body: 'Ruled by hand each morning. The book is the record; the wall is a copy.' },
      { style: 'list', tag: 'PRICES', heading: 'By part of the house', accent: '#3f6f8f',
        items: [['Stalls, rows A–F', '4/6'], ['Stalls, rear', '3/-'],
          ['Balcony, front', '2/6'], ['Balcony, rear', '1/6']],
        body: 'No seat is sold without a number, and no number twice.' },
      { style: 'warning', tag: 'RESTRICTED VIEW', heading: 'Say so at the window',
        accent: '#a33f2f',
        body: 'A seat sold as full view that is not is a refund and a letter. If the '
          + 'seat map is being redrawn, sell from the new one or do not sell it.' },
    ],
    SHOP: [
      { style: 'warning', tag: 'BAND SAW', heading: 'Guard down, or it does not run',
        accent: '#a33f2f',
        body: 'Nobody cuts alone after six. The blade is older than the counterweights '
          + 'and it wanders on a tight radius.' },
      { style: 'list', tag: 'SET OUT', heading: 'Curves, on the bench', accent: '#3f6f8f',
        items: [['Radius', 'from the centre line'], ['Arc', 'in radians, never degrees'],
          ['Template', 'cut once, marked'], ['Offcut', 'kept until the fit is checked']],
        body: 'A template is an arc. Write the radius on it before it leaves the bench.' },
      { style: 'sticky', tag: 'NOTE', heading: 'Two centre lines in play',
        accent: '#8a5a2b',
        body: 'The 1911 centre and the 1958 centre are 0.5 m apart. Say which one you '
          + 'measured from, on the drawing, every time.' },
    ],
    FLY: [
      { style: 'warning', tag: 'LOADING', heading: 'Nobody on the deck while a cradle is loaded',
        accent: '#a33f2f',
        body: 'Weight goes on from the loading gallery and comes off the same way. A bar '
          + 'flown out with an unloaded cradle is a runaway.' },
      { style: 'list', tag: 'GRID', heading: 'What the 1958 work will carry', accent: '#3f6f8f',
        items: [['Any one bar', '450 kg'], ['Adjacent pair', '700 kg'],
          ['Whole grid', '3,500 kg'], ['Untested since', '1958']],
        body: 'The plot on the wall is the file. A number said in a corridor is not.' },
      { style: 'banner', tag: 'A LINE AT AN ANGLE', heading: 'Is two loads, not one',
        accent: '#8a5a2b',
        body: 'Resolve every bridle before it goes up. The vertical is what the grid '
          + 'carries; the horizontal is what pulls the head block sideways.' },
    ],
    DOCK: [
      { style: 'list', tag: 'GET-IN', heading: 'Order of the dock doors', accent: '#3f6f8f',
        items: [['Rostra and trucks', 'first'], ['Flown pieces', 'second'],
          ['Cloths, rolled', 'third'], ['Anything hired', 'last, and listed']],
        body: 'Nothing goes through the doors that is not on the list.' },
      { style: 'sticky', tag: 'NOTE', heading: 'Yard is not storage',
        accent: '#8a5a2b',
        body: 'The rain on the ninth came through the roof and off the yard wall. '
          + 'Canvas covered, or inside.' },
    ],
    GREEN: [
      { style: 'grid', tag: 'CALLS', heading: 'This week, by company', accent: '#3f6f8f',
        body: 'Beginners is thirty-five minutes after the half. Read the board, not the rumour.' },
      { style: 'sticky', tag: 'NOTE', heading: 'One kettle, forty-one people',
        accent: '#8a5a2b', body: 'Rinse it. The steamer in wardrobe is not a kettle.' },
    ],
    WARDROBE: [
      { style: 'list', tag: 'STORE', heading: 'Back from store, in crates', accent: '#3f6f8f',
        items: [['Crates', 'eleven'], ['Costumes', 'about two hundred'],
          ['Missing', 'four, listed'], ['Steamer', 'works, when asked nicely']],
        body: 'Nothing is altered until it has been fitted on the person who wears it.' },
      { style: 'warning', tag: 'IRONS', heading: 'Off at the wall, every night',
        accent: '#a33f2f', body: 'This is a 1911 building on cable replaced twice by hand.' },
    ],
  };
  const sheets = NOTICES[id] ?? [];
  const T = 0.18;
  const doorHalf = (B.roomDoorW ?? 1.8) / 2;
  const span = Math.max(1, (spec.z1 - spec.z0) - 4);
  sheets.forEach((sheet, i) => {
    let sz = spec.z0 + 2 + (sheets.length === 1 ? span / 2 : i * (span / (sheets.length - 1)));
    // The corridor wall carries this room's doorway, and a board is a metre
    // across — so anything that would overlap the opening goes on the outer wall
    // instead of hanging half over the way in.
    const clearsDoor = Math.abs(sz - cz) > doorHalf + 0.9;
    const onOuter = i % 2 === 0 || !clearsDoor;
    const sx = onOuter ? xOut - f * T : xIn + f * T;
    // The outer wall carries the desk's own board over the middle of it, so a
    // sheet sent there because the doorway was in the way ends up *behind* the
    // board — which is how a notice gets written, imported, hung and read by
    // nobody. Walk it to whichever end of the room has the room for it.
    if(onOuter && Math.abs(sz - cz) < 2.2){
      const room0 = (cz - 2.4) - (spec.z0 + 1.0);
      const room1 = (spec.z1 - 1.0) - (cz + 2.4);
      sz = room1 >= room0 ? cz + 2.6 : cz - 2.6;
    }
    wordedSign({
      box: (w2, h2, d2, x2, y2, z2, mat2) => box(w2, h2, d2, x2, y2 + y, z2, mat2),
      mats: { dark: M.mahogany },
      x: sx, z: sz, faceX: true, toward: onOuter ? -f : f,
      text: { ...sheet, ...PAPER },
      wide: 0.95,
    });
  });

  const ORDERS = {
    FRONT: ['rack', 'bench', 'stool', 'flightCase', 'bin'],
    SHOP: ['bench', 'timberStack', 'ladder', 'stool', 'bin', 'flightCase'],
    FLY: ['rack', 'flightCase', 'gelFrames', 'ladder', 'bin', 'stool'],
    DOCK: ['flightCase', 'timberStack', 'ladder', 'rack', 'bin'],
    GREEN: ['bench', 'stool', 'rail', 'bin', 'flightCase'],
    WARDROBE: ['rail', 'bench', 'stool', 'flightCase', 'bin'],
    BOARD: ['gelFrames', 'rack', 'flightCase', 'stool', 'bin'],
  };
  furnishArea({
    makers,
    order: ORDERS[id] ?? ['rack', 'bench', 'flightCase', 'stool', 'bin'],
    bounds: {
      x0: Math.min(inX, outX), x1: Math.max(inX, outX),
      z0: spec.z0 + 1.4, z1: spec.z1 - 1.4,
    },
    // An 8.5 m office with a 2.2 m and a 2.4 m circle taken out of the middle of
    // it has about twelve square metres left, and at sep 1.4 the placer was
    // filling four of them: the room photographed as a desk, a ladder and a
    // doorway, which is `pieceDensity`'s complaint in a new building.
    target: 14,
    seed: `ellery-${id}`,
    sep: 1.05,
    // The doorway in the corridor wall, and the desk with the beacon in front of
    // it. The second circle used to sit at the middle of the room, which is where
    // Mission Control's twenty-metre bays keep their bench — here the desk is
    // against the OUTER wall, so the circle protected empty floor and the placer
    // stood a stack of timber across the board the stop is answered from.
    keepClear: [{ x: xIn + f * 1.2, z: cz, r: 1.9 }, { x: xOut - f * 1.9, z: cz, r: 2.9 },
      // And the delivery case, in the one office that has one.
      ...(clear ? [clear] : [])],
  });
}

/**
 * The boards in the ring corridor.
 *
 * This is the part of the building everybody walks — between the house, the
 * offices and the yard — so what is on its walls is the whole theatre's business
 * rather than one room's: the licence, the fire notice, the call board, the
 * standing instruction about who may say a number out loud.
 */
function furnishRingSigns(){
  const HW = B.halfWidth;
  const [, s1] = B.southLeg;
  const [n0] = B.northLeg;
  const y = ENTRY_Y;
  const T = 0.18;
  const PAPER = { paper: '#e8e1cd', ink: '#221f1a', soft: '#544d42' };

  const SHEETS = [
    { style: 'banner', tag: 'LICENCE', heading: 'Expires on the fourteenth', accent: '#a33f2f',
      body: 'No performance is given in this building until the clearance walk, the seat '
        + 'map and the load plot are signed and in the file. The licence and the opening '
        + 'are the same night, which is nobody’s accident but ours.' },
    { style: 'warning', tag: 'FIRE', heading: 'The iron comes in every performance',
      accent: '#a33f2f',
      body: 'Once, in view of the audience, by the deputy stage manager. A safety curtain '
        + 'that has not been moved today has not been tested today.' },
    { style: 'list', tag: 'CLEARANCE', heading: 'What the walk measures', accent: '#3f6f8f',
      items: [['Rear stalls to street', 'walked'], ['Balcony to street', 'walked'],
        ['Limit', '150 s'], ['Last walk', '161 s']],
      body: 'Walked at the pace of the slowest person in the house, not yours.' },
    { style: 'grid', tag: 'CALL BOARD', heading: 'This fortnight, by department', accent: '#3f6f8f',
      body: 'Changes go up here before they are said anywhere. If it is not on the board, '
        + 'it has not been decided.' },
    { style: 'banner', tag: 'A NUMBER IN A CORRIDOR', heading: 'Is not a number in the file',
      accent: '#8a5a2b',
      body: 'Bar heights, dimmer numbers, seat counts, decibels: written down, with what '
        + 'measured them and when, or it did not happen.' },
    { style: 'photo', tag: 'ELEVEN YEARS AGO', heading: 'The last house, closing night',
      accent: '#5b6a72', body: 'Same seats, same proscenium, four hundred fewer of them sold.' },
    { style: 'list', tag: 'IF YOU ARE UNSURE', heading: 'Ask in this order', accent: '#3f6f8f',
      items: [['Your own department', 'first'], ['Production manager', 'second'],
        ['Producer', 'when it costs money'], ['The company', 'never mid-note']],
      body: 'Somebody who says "I have not measured that yet" has done their job.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Roof, above the dock',
      accent: '#8a5a2b', body: 'Still coming through. Scaffold priced for March.' },
  ];

  const doorways = (side) => OFFICES.filter(r => r.side === side).map(r => ({
    c: (r.z0 + r.z1) / 2, h: B.roomDoorW / 2,
  }));
  const clearOfDoors = (side, z, halfWide) => doorways(side)
    .every(d => Math.abs(z - d.c) > d.h + halfWide + 0.25);

  const z0 = s1 + 2, z1 = n0 - 2;
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
    wordedSign({
      box: (w2, h2, d2, x2, y2, z2, mat2) => box(w2, h2, d2, x2, y2 + y, z2, mat2),
      mats: { dark: M.mahogany },
      // On the room side of the ring's outer wall, which is 300 mm and centred.
      x: f * (HW - T), z, faceX: true, toward: -f,
      text: { ...sheet, ...PAPER },
      wide,
    });
  });
}

/**
 * The scene-dock yard.
 *
 * Open to the sky, and the sky is the only thing in this game that is not
 * indoors — which is the point of it. The house has no windows and no clock; the
 * yard is the one place the player can tell what time it is, and the one place
 * a piece of scenery is bigger than the room it is in.
 */
function buildYard(){
  const C = B.courtyard;
  const cx = (C.x0 + C.x1) / 2, cz = (C.z0 + C.z1) / 2;
  const w = C.x1 - C.x0, d = C.z1 - C.z0;

  box(w, 0.3, d, cx, ENTRY_Y - 0.15, cz, M.paving).castShadow = false;

  // A strip of grass nobody has cut in eleven years, and the paved run the dock
  // doors work over. The run is where the scenery goes, so it is kept clear.
  const lawn = new THREE.Mesh(new THREE.PlaneGeometry(w - 11, 7.0), M.grass);
  lawn.rotation.x = -Math.PI / 2;
  lawn.position.set(cx, ENTRY_Y + 0.012, cz + d / 2 - 6.0);
  lawn.receiveShadow = true;
  scene.add(lawn);

  // Scenery waiting in the yard: three flats on edge, a rolled cloth, two
  // rostra and the truck of hired weights.
  const stack = (x, z, n, ry) => {
    for(let i = 0; i < n; i++){
      box(0.1, 4.2, 3.0, x + i * 0.16, ENTRY_Y + 2.1, z, i % 2 ? M.canvas : M.timber, ry);
    }
    collide(x + (n - 1) * 0.08, z, 0.9, 3.2, ENTRY_Y, 4.2);
  };
  stack(C.x0 + 2.6, cz - 6.0, 4, 0);
  stack(C.x1 - 3.2, cz + 2.0, 3, 0);
  const cloth = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 8.4, 12), M.canvas);
  cloth.rotation.z = Math.PI / 2;
  cloth.position.set(cx - 3.0, ENTRY_Y + 0.55, C.z0 + 3.2);
  cloth.castShadow = true;
  scene.add(cloth);
  collide(cx - 3.0, C.z0 + 3.2, 8.6, 1.2, ENTRY_Y, 1.1);
  for(const [rx, rz] of [[cx + 5.0, C.z0 + 3.6], [cx + 7.4, C.z0 + 5.4]]){
    box(2.4, 0.9, 1.8, rx, ENTRY_Y + 0.45, rz, M.timber);
    collide(rx, rz, 2.6, 2.0, ENTRY_Y, 0.9);
  }
  for(let i = 0; i < 5; i++){
    box(0.8, 0.12, 0.5, cx - 8.0, ENTRY_Y + 0.06 + i * 0.13, cz + 7.0, M.steel).castShadow = false;
  }
  softColliders.push({ x: cx - 8.0, z: cz + 7.0, r: 0.8 });

  // Two trees along the back of the yard, a bench under them, and the lamps on
  // the wall. Emissive heads: the light budget is four and all four are spent.
  for(const sx of [-1, 1]){
    const px = cx + sx * (w / 2 - 4.4), pz = cz + d / 2 - 4.2;
    box(2.6, 0.5, 2.6, px, ENTRY_Y + 0.25, pz, M.planter);
    box(2.3, 0.06, 2.3, px, ENTRY_Y + 0.52, pz, M.soil).castShadow = false;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 3.2, 8), M.trunk);
    trunk.position.set(px, ENTRY_Y + 2.1, pz);
    trunk.castShadow = true;
    scene.add(trunk);
    for(let i = 0; i < 3; i++){
      const crown = new THREE.Mesh(new THREE.SphereGeometry(1.5 - i * 0.28, 12, 8), M.foliage);
      crown.position.set(px, ENTRY_Y + 3.5 + i * 0.85, pz);
      crown.scale.y = 0.72;
      crown.castShadow = true;
      scene.add(crown);
    }
    // A soft collider, not a box: a hard box on a 2.6 m planter catches a shoulder.
    softColliders.push({ x: px, z: pz, r: 1.9 });
  }
  for(const sx of [-1, 1]){
    const bx = cx + sx * 3.2, bz = cz + d / 2 - 3.0;
    box(2.0, 0.1, 0.55, bx, ENTRY_Y + 0.44, bz, M.timber).castShadow = false;
    box(2.0, 0.55, 0.1, bx, ENTRY_Y + 0.72, bz + 0.28, M.timber).castShadow = false;
    softColliders.push({ x: bx, z: bz, r: 1.2 });
  }
  for(const sx of [-1, 1]){
    for(const sz of [-1, 1]){
      const lx = cx + sx * (w / 2 - 0.9), lz = cz + sz * (d / 2 - 4.0);
      box(0.5, 0.16, 0.5, lx, ENTRY_Y + 3.3, lz, M.steel).castShadow = false;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), M.workLamp);
      head.position.set(lx - sx * 0.34, ENTRY_Y + 3.1, lz);
      scene.add(head);
    }
  }
}

/**
 * The sky over the yard.
 *
 * Late evening in the fortnight before an opening, because that is when this
 * building is worked. A dome and a few stars, both with `fog: false` — the
 * house's fog closes at 120 m and would otherwise paint the sky the colour of
 * the back wall. No sun rig, and `updateTimeOfDay` still returns null.
 */
function buildSky(){
  const geo = new THREE.SphereGeometry(160, 24, 16);
  const colours = [];
  const top = new THREE.Color(0x141a2c), horizon = new THREE.Color(0x5a4436);
  const pos = geo.attributes.position;
  for(let i = 0; i < pos.count; i++){
    const t = Math.max(0, pos.getY(i) / 160);
    const c = horizon.clone().lerp(top, Math.pow(t, 0.55));
    colours.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colours, 3));
  const dome = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
  dome.position.y = ENTRY_Y;
  scene.add(dome);
  scene.background = null;               // the dome is the background now

  const stars = [];
  for(let i = 0; i < 420; i++){
    const u = Math.random(), v = Math.random() * 0.42;      // upper hemisphere only
    const theta = u * Math.PI * 2, phi = Math.acos(1 - 2 * v);
    stars.push(
      Math.sin(phi) * Math.cos(theta) * 150,
      Math.abs(Math.cos(phi)) * 150 + ENTRY_Y,
      Math.sin(phi) * Math.sin(theta) * 150);
  }
  const field = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(stars, 3)),
    new THREE.PointsMaterial({ color: 0xdce6f2, size: 0.8, sizeAttenuation: true, fog: false }));
  scene.add(field);
}

/**
 * One position in the house: a desk on its tier, a board over it, a nameplate
 * and the chairs. The desk is the mission stop — walking to it and pressing E is
 * what a door is in the other games.
 */
function buildPosition(spec, def){
  const y = rowY(spec.row);
  const z = spec.z ?? R.rowZ[spec.row];
  const colour = def?.color ? new THREE.Color(def.color) : new THREE.Color(0x6a5b44);

  const desk = box(spec.w, 0.78, 1.5, spec.x, y + 0.39, z, M.desk);
  box(spec.w + 0.12, 0.06, 1.62, spec.x, y + 0.8, z, M.top).castShadow = false;
  collide(spec.x, z, spec.w + 0.2, 1.7, y, 0.85);
  // A working lamp on it, which is what a production desk looks like from the
  // back of a dark house.
  box(0.24, 0.04, 0.18, spec.x + spec.w / 2 - 0.8, y + 1.16, z - 0.1, M.houseLamp)
    .castShadow = false;
  box(0.05, 0.34, 0.05, spec.x + spec.w / 2 - 0.8, y + 0.98, z - 0.1, M.steel).castShadow = false;

  for(let i = 0; i < Math.max(2, Math.round(spec.w / 3.2)); i++){
    const cx = spec.x - spec.w / 2 + 1.4 + i * 2.8;
    box(0.62, 0.1, 0.6, cx, y + 0.46, z + 1.2, M.seatFrame).castShadow = false;
    box(0.62, 0.7, 0.1, cx, y + 0.8, z + 1.48, M.seatFrame).castShadow = false;
    softColliders.push({ x: cx, z: z + 1.25, r: 0.42 });
  }

  if(!spec.group){
    // A position with no group is furniture and crew: no board, no beacon,
    // nothing to press E on. Three of the six areas of study work in the offices
    // now, and their desks are not in here pretending to be empty.
    return;
  }

  const rows = INTERIORS?.[spec.group]?.station?.rows ?? [];
  const screen = instrumentScreen({
    kind: 'panel', title: spec.name,
    rows: rows.length ? rows.slice(0, 3) : [{ label: 'CALL', value: 'OPEN', status: 'alarm' }],
  }, { w: 384, h: 256 });
  // Kept small. A screen scaled off the desk width read as a wall panel floating
  // in the middle of the stalls rather than as something sitting on a desk.
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.52),
    new THREE.MeshStandardMaterial({
      map: screen.texture, emissive: 0xffffff, emissiveMap: screen.texture,
      emissiveIntensity: 0.7, roughness: 0.85,
    }));
  panel.position.set(spec.x, y + 1.12, z - 0.45);
  panel.rotation.x = -0.18;
  scene.add(panel);
  areaScreens.set(spec.group, panel);
  deskScreens.push({ panel, screen, group: spec.group, name: spec.name });

  // A coloured strip along the desk front, in the area's own colour: never the
  // only channel — the nameplate says it too.
  box(spec.w, 0.09, 0.06, spec.x, y + 0.72, z + 0.78, new THREE.MeshStandardMaterial({
    color: colour, emissive: colour, emissiveIntensity: 0.5, roughness: 0.6,
  })).castShadow = false;

  // Nameplate, readable from the aisle. Single-sided: text on a DoubleSide
  // material renders mirrored from behind.
  const plate = instrumentScreen({ kind: 'panel', title: spec.name, rows: [] }, { w: 384, h: 96 });
  const plateMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.36),
    new THREE.MeshStandardMaterial({
      map: plate.texture, emissive: 0xffffff, emissiveMap: plate.texture,
      emissiveIntensity: 0.5, roughness: 0.9, side: THREE.FrontSide,
    }));
  plateMesh.position.set(spec.x, y + 1.06, z + 0.79);
  plateMesh.rotation.y = Math.PI;
  scene.add(plateMesh);

  const beacon = addCaseBeacon(scene, {
    x: spec.x, z: z + 1.9, y: y + 0.02,
    colour: def?.color ?? 0xf0b429,
    label: spec.name, height: 2.15,
  });
  beacon.setActive(false);
  beacons.set(spec.group, beacon);

  stopMeshes.set(spec.group, {
    id: spec.group, name: spec.name, desk,
    pos: new THREE.Vector3(spec.x, y, z),
    entry: new THREE.Vector3(spec.x, y, z + 2.6),
  });
  interactables.push({
    mesh: desk, type: 'case', id: spec.group,
    prompt: `E — Take the case at ${spec.name}`,
  });
  peopleStations.push({
    id: spec.group, x: spec.x - spec.w / 2 - 1.3, z: z + 1.1,
    facing: Math.PI,                      // facing the stage, like everybody else
  });
}

/** The pit rail, and the stands inside it. */
function buildPit(){
  const p = R.pit;
  const cz = (p.z0 + p.z1) / 2;
  // The rail: three sides, open to the stage, so the pit reads as a pit rather
  // than as a desk standing on the apron.
  box(p.half * 2, 1.0, 0.16, 0, 0.5, p.z1, M.mahogany);
  collide(0, p.z1, p.half * 2, 0.4, 0, 1.0);
  for(const s of [-1, 1]){
    box(0.16, 1.0, p.z1 - p.z0, s * p.half, 0.5, cz, M.mahogany);
    collide(s * p.half, cz, 0.4, p.z1 - p.z0, 0, 1.0);
  }
  // Nine stands for twenty-two players, which is the state of the band.
  for(let i = 0; i < 9; i++){
    const sx = -4.6 + (i % 5) * 2.3, sz = p.z0 + 0.9 + Math.floor(i / 5) * 1.6;
    box(0.5, 0.03, 0.36, sx, 1.05, sz, M.black).castShadow = false;
    box(0.04, 1.02, 0.04, sx, 0.51, sz, M.steel).castShadow = false;
    box(0.4, 0.06, 0.3, sx, 0.03, sz, M.seatFrame).castShadow = false;
    softColliders.push({ x: sx, z: sz, r: 0.4 });
  }
}

// ------------------------------------------------------------------ waypoint
function makeWaypoint(){
  const g = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.045, 8, 24),
    new THREE.MeshStandardMaterial({
      color: 0xf2c14e, emissive: 0xf2c14e, emissiveIntensity: 1.0, roughness: 0.5 }));
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
  tuneRendererForDevice(renderer);
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = look.exposure ?? 1.0;

  scene = new THREE.Scene();
  const fog = look.fog ?? { colour: 0x1a1418, near: 30, far: 120 };
  scene.fog = new THREE.Fog(fog.colour, fog.near, fog.far);
  scene.background = new THREE.Color(fog.colour);

  buildMaterials();

  // Environment, damped. `scene.environmentIntensity` does not exist before
  // three r163 and setting it is silent.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromScene(new RoomEnvironment(renderer), 0.06);
  scene.environment = rt.texture;
  pmrem.dispose();

  // Four real lights, which is the whole budget spent: ambient, hemisphere, one
  // key from the grid pointed up the rake so the seats cast shadows back, and a
  // soft one over the yard so the paving is lit from somewhere.
  const L = look.lighting ?? {};
  scene.add(new THREE.AmbientLight(0xc0b39a, L.ambient ?? 0.4));
  scene.add(new THREE.HemisphereLight(0xd8cbb2, 0x1b1a18, L.hemi ?? 0.45));
  const key = new THREE.DirectionalLight(0xffe3b8, L.key ?? 0.95);
  key.position.set(0, 16, R.front - 2);
  key.target.position.set(0, 0, R.back - 8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 80;
  key.shadow.camera.left = -26; key.shadow.camera.right = 26;
  key.shadow.camera.top = 30; key.shadow.camera.bottom = -30;
  key.shadow.bias = -0.0005;
  scene.add(key, key.target);
  const yard = new THREE.DirectionalLight(0xb9c6dc, L.yard ?? 0.45);
  yard.position.set(-30, 40, 70);
  yard.target.position.set(0, ENTRY_Y, 40);
  scene.add(yard, yard.target);

  buildHouse();
  buildStage();
  buildPit();
  buildBalcony();
  buildSeats();
  buildSky();
  buildRing();
  buildYard();

  // `groups` first: `const` is not hoisted, and reading it above this line throws
  // "Cannot access 'groups' before initialization" — the same trap the entry
  // points hit with `day` and `driving`.
  const groups = theme.content?.GROUPS ?? [];
  for(const p of POSITIONS) buildPosition(p, groups.find(g => g.id === p.group));
  for(const o of OFFICES) buildOffice(o, groups.find(g => g.id === o.group));
  furnishRingSigns();

  // The call board, on the back wall by the pass doors: the one thing in the
  // house that is about the fortnight rather than about the show.
  const callScreen = instrumentScreen({ kind: 'panel', title: 'CALL BOARD', rows: [] }, { w: 512, h: 256 });
  const call = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.6),
    new THREE.MeshStandardMaterial({
      map: callScreen.texture, emissive: 0xffffff, emissiveMap: callScreen.texture,
      emissiveIntensity: 0.6, roughness: 0.9, side: THREE.FrontSide,
    }));
  call.position.set(-13, ENTRY_Y + 2.0, R.back - 0.2);
  call.rotation.y = Math.PI;
  scene.add(call);
  interactables.push({ mesh: call, type: 'board', id: 'BOARD', prompt: 'E — Read the call board' });
  houseScreens.push({ mesh: call, screen: callScreen });

  dampEnvironment(scene, 0.45);

  getWaypointMesh().visible = false;
  return { scene, renderer };
}

// ------------------------------------------------------------- state -> world
export function updateWorldFromState(state, nextStopId = null, pct = () => 0){
  if(!state) return;
  for(const d of deskScreens){
    const done = Math.round(pct(d.group) ?? 0);
    const verdict = state.areaVerdict?.[d.group];
    d.screen.set({
      title: d.name,
      status: verdict === 'unresolved' ? 'alarm' : 'normal',
      rows: [
        { label: 'CALL', value: verdict === 'unresolved' ? 'OPEN' : 'CLEAR',
          status: verdict === 'unresolved' ? 'alarm' : 'normal' },
        { label: 'READY', value: `${done} %`, status: done > 60 ? 'high' : 'normal' },
      ],
    });
  }
  const day = state.week ?? 1;
  for(const b of houseScreens){
    b.screen.set({
      rows: [
        { label: 'DAY', value: `${day} / 15`, status: 'normal' },
        { label: 'TO OPENING', value: `${Math.max(0, 15 - day)} d`, status: day > 11 ? 'alarm' : 'normal' },
        { label: 'CALLS OPEN',
          value: String(state.groups?.filter(x => state.areaVerdict?.[x.id] === 'unresolved').length ?? 0),
          status: 'normal' },
      ],
    });
  }

  // Every call still open is lit, not just the next one: the day is taken in any
  // order.
  const open = openCaseGroups();
  for(const [id, b] of beacons) b.setActive(open.has(id));

  const target = nextStopId ? stopMeshes.get(nextStopId) : null;
  if(target) setWaypointPosition(target.entry.x, target.entry.z);
  else if(waypointMesh) waypointMesh.visible = false;
}

/**
 * There is no daylight in a house with no windows, and that is the point: the
 * only clock in this building is the one counting down to the fourteenth. Kept
 * because the contract requires it.
 */
export function updateTimeOfDay(){ return null; }

export function getPeopleStations(){ return peopleStations; }
export function getExtraSpots(){
  // The aisles, the pit rail and the back of the stalls — where people in a
  // theatre stand when they are not sitting down.
  const out = [];
  for(const row of R.rowZ){
    out.push({ x: -12.8, z: row + 1.6 }, { x: 12.8, z: row + 1.6 });
  }
  for(let i = -2; i <= 2; i++) out.push({ x: i * 5, z: R.back - 3 });
  out.push({ x: -9, z: R.front + 3 }, { x: 9, z: R.front + 3 });
  // The stage, which is where a fit-up actually happens.
  out.push({ x: -3.4, z: ST.z1 - 3.0 }, { x: 3.4, z: ST.z1 - 4.5 }, { x: 8.0, z: ST.z0 + 6.0 });
  // And the working building. A ring corridor with nobody in it reads as a
  // service passage rather than as the way the company walks to work.
  const C = B.courtyard;
  const mid = (x0, x1) => (x0 + x1) / 2;
  for(let i = -2; i <= 2; i++) out.push({ x: i * 7, z: mid(...B.southLeg) });
  out.push({ x: mid(-B.halfWidth, C.x0), z: 32 }, { x: mid(-B.halfWidth, C.x0), z: 46 });
  out.push({ x: mid(C.x1, B.halfWidth), z: 32 }, { x: mid(C.x1, B.halfWidth), z: 46 });
  out.push({ x: -6, z: mid(...B.northLeg) }, { x: 6, z: mid(...B.northLeg) });
  out.push({ x: C.x0 + 5, z: C.z0 + 8 }, { x: C.x1 - 5, z: C.z1 - 9 });
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
  // The ghost light is a filament on a 1911 supply, so it is never quite steady.
  if(ghostLamp?.material){
    ghostLamp.material.emissiveIntensity = 2.8 + Math.sin(t * 1.7) * 0.18 + Math.sin(t * 6.3) * 0.06;
  }
  for(const b of houseScreens){
    if(b.mesh.material) b.mesh.material.emissiveIntensity = 0.6 + Math.sin(t * 1.3) * 0.05;
  }
}
