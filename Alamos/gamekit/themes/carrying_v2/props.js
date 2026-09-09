// props.js — the objects unique to this theme.
//
// Anything generic (chairs, counters, carts, bins, screens, shelving, plants)
// should come from engine/world/kit.js; this file is only for the ten or so
// things that make *this* place recognisable.
//
// Which hook runs depends on the world:
//   outdoor   decorate(scene, ctx)     after ground, buildings and furniture
//             ctx = { groundHeight, colliders, softColliders, interactables,
//                     blocked, sign, MATERIALS, lightPanels, areaScreens }
//   interior  fitOutRoom / fitOutSpine, with the builder context from
//             engine/world/interiorSite.js:
//             { scene, plan, geo, P, box, wall, materials, soft, hard,
//               addInteractable }
//
// The unused ones are ignored, so all three can be exported from here.

import * as THREE from 'three';
import {
  vehicle, VEHICLE_DRIVE, bicycleRack, BICYCLE_DRIVE, clearSpot, windTurbine,
  box, cyl, crateStack, MATERIALS,
} from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { driveable } from '../../engine/world/driving.js';
import { animate, spin, sway, bob } from '../../engine/world/animators.js';
import { storyOutdoors } from './story.js';

// ---------------------------------------------------------------- the island
//
// Numbers this file shares with site.js. Sampled from `groundHeight` rather than
// guessed: the plateau reads −0.2, the sea bed −9.0, and the sea itself sits at
// −6.2, so the water off the south shore is 2.8 m deep and the land ends at
// about z = 132 on the harbour bearings. Everything the quay, the slip and the
// two hulls are dimensioned from is one of those four numbers.
const SEA = -6.2;
const BED = -9.0;

/** The spawn, so nothing is built on it. Mirrors site.spawn. */
const SPAWN = { x: 0, z: 75, r: 13 };

/** The island road, as site.js declares it, plus the width the walls stand at. */
const ROAD = { half: 4, z0: 70, z1: -230 };
const WALL_X = 5.6;

// Deterministic jitter. `srand` in materials.js is a shared stream, so a change
// anywhere upstream would reshuffle every wall stone on this island; this one is
// ours and moves only when these numbers do.
function rng(seed){
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const between = (r, a, b) => a + r() * (b - a);

// Albedos are written darker than they look: under ACES with the sky IBL a mid
// grey renders near-white. House rule 6.
const STONE = () => mat('vellan.stone', () => new THREE.MeshStandardMaterial({
  color: 0x6a6458, roughness: 0.96, metalness: 0, envMapIntensity: 0.42 }));
// LIGHTER THAN HOUSE RULE 6 WANTS, and the still is why. At 0x46423a with the
// environment damped to 0.36 the walls rendered as solid BLACK slabs either side
// of a pale road — a kerb, or a crash barrier, not stone, and the jitter that
// makes them read as stacked stones was invisible inside the silhouette. Rule 6
// is about a mid albedo blowing out under a bright sky; it is not a licence to
// take a surface below the point where its own relief stops reading. Dry stone
// in maritime daylight is a mid grey with the shadowed courses picking it out.
const DRYSTONE = () => mat('vellan.drystone', () => new THREE.MeshStandardMaterial({
  color: 0x8d8779, roughness: 0.98, metalness: 0, envMapIntensity: 0.55 }));
const COPING = () => mat('vellan.coping', () => new THREE.MeshStandardMaterial({
  color: 0x7c7466, roughness: 0.9, metalness: 0, envMapIntensity: 0.42 }));
const TIMBER = () => mat('vellan.timber', () => new THREE.MeshStandardMaterial({
  color: 0x574a37, roughness: 0.95, metalness: 0, envMapIntensity: 0.4 }));
const WOOL = () => mat('vellan.wool', () => new THREE.MeshStandardMaterial({
  color: 0x9d9789, roughness: 0.95, metalness: 0, envMapIntensity: 0.38 }));
const FLEECE_FACE = () => mat('vellan.face', () => new THREE.MeshStandardMaterial({
  color: 0x2f2b26, roughness: 0.9, metalness: 0, envMapIntensity: 0.3 }));
const SPOIL = () => mat('vellan.spoil', () => new THREE.MeshStandardMaterial({
  color: 0x4d4639, roughness: 0.99, metalness: 0, envMapIntensity: 0.34 }));
const DARKGLASS = () => mat('vellan.lanternglass', () => new THREE.MeshStandardMaterial({
  color: 0x4e5a62, roughness: 0.14, metalness: 0.12, transparent: true, opacity: 0.5,
  envMapIntensity: 0.5 }));
const PAINT = (hex) => MATERIALS.paintedSteel(hex);

/** Anything deliberately standing in the water is not a placement mistake. */
function seaborne(obj){
  obj.traverse?.((o) => { o.userData.ignoreAudit = true; });
  if(!obj.traverse) obj.userData.ignoreAudit = true;
  return obj;
}

/** A rope or a stay: one thin cylinder between two points. */
function line(parent, a, b, r, material){
  const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
  const len = Math.hypot(dx, dy, dz) || 0.01;
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 6), material);
  m.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(dx, dy, dz).normalize());
  parent.add(m);
  return m;
}

/** The declared paths, as rectangles, so nothing is placed on the tarmac. */
const PATH_RECTS = [
  { x0: -60, x1: 60, z0: 55, z1: 65 },        // the harbour apron
  { x0: -4, x1: 4, z0: -230, z1: 70 },        // the island road
  { x0: -98, x1: -2, z0: -209, z1: -203 },    // the tip spur
  { x0: 4, x1: 96, z0: -209, z1: -203 },      // the hill spur
];
function onPath(x, z, pad = 2){
  return PATH_RECTS.some(r =>
    x > r.x0 - pad && x < r.x1 + pad && z > r.z0 - pad && z < r.z1 + pad);
}

/**
 * Decorate an outdoor town. Everything generic — benches, bins, posts, signs,
 * fences, tanks, pipe runs, display boards, vehicles — is already in
 * engine/world/kit.js and is placed from site.js. This is for what makes *this*
 * place recognisable.
 *
 * Placement helpers take `(x, z, y)` — ground last. One call written `(x, y, z)`
 * put six display boards sixteen metres in the air.
 *
 * To make a parked vehicle driveable, see themes/contamcity/props.js `park()`.
 */
export function decorate(scene, ctx){
  transport(scene, ctx);
  turbines(scene, ctx);
  quay(scene, ctx);
  fishingBoat(scene, ctx);
  ferry(scene, ctx);
  roadWalls(scene, ctx);
  flock(scene, ctx);
  oldLight(scene, ctx);
  tipYard(scene, ctx);
  // The bible's changing world — aftermaths, the three landmark spaces, the
  // second ferry — and the alive layer. Last, so it can read what is here.
  storyOutdoors(scene, ctx);
}

// ------------------------------------------------------------------- the quay
//
// The harbour was an apron with a name. The land ends at about z = 132 and drops
// nine metres to a sea bed at −9.0, so anything that lets a boat come alongside
// has to be *built out over the water* — which is what a stone quay is, and why
// every island of this size has one.
//
// Deck at −1.6: 4.6 m above the water, which is the height a tidal harbour wall
// stands at and the reason there is a ladder down the seaward face. The player
// cannot walk on it — `groundHeight` is the world's one answer to floor height
// and a prop may not add a second — so the mass is a collider and the quay is
// read from the shore, looking down onto it.
const QUAY = { x: 18, w: 8, root: 128, hinge: 141, head: 182, deck: -1.6 };

function quay(scene, ctx){
  const { groundHeight, colliders } = ctx;
  const top = (z) => {
    if(z <= QUAY.root) return groundHeight(QUAY.x, QUAY.root);
    if(z >= QUAY.hinge) return QUAY.deck;
    const k = (z - QUAY.root) / (QUAY.hinge - QUAY.root);
    return groundHeight(QUAY.x, QUAY.root) + (QUAY.deck - groundHeight(QUAY.x, QUAY.root)) * k;
  };
  const stone = STONE(), coping = COPING();
  const step = 2.6;
  for(let z = QUAY.root; z < QUAY.head; z += step){
    const y = top(z + step / 2);
    const h = y - BED;
    seaborne(box(scene, QUAY.w, h, step + 0.05, QUAY.x, BED + h / 2, z + step / 2, stone));
  }
  // The coping: the dressed edge along both sides, and the head wall.
  for(const s of [-1, 1]){
    for(let z = QUAY.root + 2; z < QUAY.head; z += 4){
      const y = top(z);
      seaborne(box(scene, 0.7, 0.34, 4.0, QUAY.x + s * (QUAY.w / 2 - 0.35), y + 0.17, z, coping));
    }
  }
  seaborne(box(scene, QUAY.w + 0.2, 0.34, 0.7, QUAY.x, QUAY.deck + 0.17, QUAY.head - 0.35, coping));

  // Bollards down the working side, and a ladder over the east face where the
  // boat lies. Iron, not stone: the one place on the quay that is not masonry.
  for(const z of [150, 160, 170, 178]){
    for(const s of [-1, 1]){
      seaborne(cyl(scene, 0.26, 0.85, QUAY.x + s * (QUAY.w / 2 - 0.9), QUAY.deck + 0.42, z,
        PAINT(0x35322c), 0.32));
    }
  }
  const lx = QUAY.x + QUAY.w / 2 + 0.16;
  for(const s of [-1, 1]){
    seaborne(cyl(scene, 0.05, 5.4, lx, SEA - 0.6 + 2.7, 158 + s * 0.35, PAINT(0x4a4640)));
  }
  for(let i = 0; i < 8; i++){
    seaborne(box(scene, 0.1, 0.07, 0.9, lx, SEA - 0.4 + i * 0.62, 158, PAINT(0x4a4640)));
  }

  // The mass, so nobody walks into the pier from the shore. One box, because the
  // whole thing is one solid stone wall standing in the sea.
  //
  // The top is +2.5 rather than the deck's own −1.6, and that is not cosmetic:
  // `updatePlayer` builds its collision box at an ABSOLUTE y of 0 to eye height,
  // never relative to the ground it is standing on. A collider whose whole span
  // is below zero — which everything at this end of the island is — intersects
  // nothing, and the quay would have been a wall you walk straight through.
  colliders.push(new THREE.Box3(
    new THREE.Vector3(QUAY.x - QUAY.w / 2 - 0.4, BED, QUAY.root - 0.5),
    new THREE.Vector3(QUAY.x + QUAY.w / 2 + 0.4, 2.5, QUAY.head + 0.5)));
}

/**
 * The boat alongside. Rocks, because a moored hull is the cheapest evidence in
 * the game that the sea is a live thing and the catch on day 1 came off it.
 */
function fishingBoat(scene, ctx){
  const g = new THREE.Group();
  const hull = PAINT(0x1d3c4d), boot = PAINT(0x5c2a22), wheelhouse = PAINT(0x9c968a);
  // Local y = 0 is the waterline.
  box(g, 3.2, 1.4, 9.0, 0, -0.7, 0, boot);
  box(g, 3.5, 1.35, 9.4, 0, 0.68, 0, hull);
  box(g, 1.5, 1.35, 2.4, 0, 0.68, -5.4, hull);          // the stem, narrowed
  box(g, 3.7, 0.18, 9.6, 0, 1.42, 0, TIMBER());          // gunwale
  box(g, 3.2, 0.14, 6.0, 0, 1.36, 1.6, TIMBER());        // the working deck
  box(g, 2.1, 1.7, 2.5, 0, 2.3, 1.9, wheelhouse);
  box(g, 2.15, 0.62, 2.55, 0, 2.75, 1.9, MATERIALS.glass());
  box(g, 1.5, 0.22, 1.5, 0, 3.22, 1.9, PAINT(0x3a3630));
  cyl(g, 0.09, 4.6, 0, 3.6, -0.4, TIMBER());             // mast
  cyl(g, 0.07, 3.4, 0.0, 3.1, 0.9, TIMBER()).rotation.z = 0.9;  // the boom
  // Creels stacked aft, and two tyres over the side as fenders.
  for(let i = 0; i < 3; i++) box(g, 0.8, 0.5, 1.1, -0.9 + i * 0.9, 1.72, 3.6, PAINT(0x4d4433));
  for(const z of [-2.2, 1.2]){
    const t = cyl(g, 0.36, 0.22, -1.85, 0.75, z, MATERIALS.rubber());
    t.rotation.z = Math.PI / 2;
  }
  g.position.set(24.9, SEA, 158);
  g.rotation.y = 0.03;
  scene.add(g);
  seaborne(g);

  // Two mooring lines up to the quay's bollards. Drawn to the group, so they
  // roll with the hull — which is wrong by a few centimetres and right by eye.
  const rope = PAINT(0x6e6656);
  line(g, { x: -1.7, y: 1.4, z: -4.2 }, { x: -3.1, y: 4.9, z: -6.0 }, 0.05, rope);
  line(g, { x: -1.7, y: 1.4, z: 4.2 }, { x: -3.1, y: 4.9, z: 6.2 }, 0.05, rope);

  // Roll, pitch and lift, on three periods that never come back into phase.
  animate(sway(g, 'z', 0.048, 0.62));
  animate(sway(g, 'x', 0.020, 0.47, 1.1));
  animate(bob(g, 0.11, 0.55, 0.4));
  void ctx;
}

/**
 * The turbines the Turbine Yard is named after.
 *
 * The yard stood for the life of the game as a diesel house with nothing on the
 * hill behind it, in a campaign whose day-8 argument is what the island can make
 * for itself. Two machines on the rise east of the yard, turning — the one
 * moving thing visible from the harbour, which is what makes the island read as
 * a place with weather rather than a diorama.
 */
function turbines(scene, ctx){
  const { groundHeight, softColliders } = ctx;
  for(const [x, z, phase] of [[122, -228, 0], [136, -196, 1.9]]){
    const t = windTurbine(scene, x, z, groundHeight(x, z), { height: 24, blade: 11, facing: Math.PI * 0.72 });
    t.rotor.rotation.z = phase;
    softColliders?.push(t.soft);
    // A hair apart in speed, so the two never lock step.
    animate(spin(t.rotor, 'z', 0.85 + phase * 0.04));
  }
}

/**
 * The island's two vehicles.
 *
 * Day 4's card says "the truck is signed out for it. Drive the road once…", and
 * until now Vellan had nothing to drive. The tip is 206 m up the island road,
 * the turbine yard the same the other way and the reef station 318 m out — a
 * campaign about ninety-one people on a low island that was walked end to end.
 *
 * Two kinds, and on an island of ninety-one people that is not a stylistic
 * choice: there is one flatbed, shared, because the island has one — and there
 * are bicycles, because that is what everybody else uses and the road is flat.
 * A game whose subject is carrying capacity should not have a truck each.
 */
function transport(scene, ctx){
  const { groundHeight, colliders, interactables, blocked } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const spawn = { x: 0, z: 75, r: 13 };

  const ts = clearSpot({ x: -18, z: 60 }, blocked, { pad: 3.4, avoid: [spawn] });
  const flat = vehicle(scene, ts.x, ts.z, y(ts.x, ts.z),
    { facing: 0, colour: 0x8a5f3a, box: false });
  driveable(scene, flat.group, {
    ...VEHICLE_DRIVE,
    id: 'island-flatbed', label: 'island flatbed', kind: 'pickup',
    seat: { x: 0.52, y: 2.18, z: flat.cabZ },
    wheels: flat.wheels,
    // An island road, not a highway. Slower than a town truck on purpose.
    topSpeed: 10,
    colliders, interactables,
  });

  const rs = clearSpot({ x: 15, z: 63 }, blocked,
    { pad: 2.2, avoid: [spawn, { x: ts.x, z: ts.z, r: 6 }] });
  const { rail, bicycles } = bicycleRack(scene, rs.x, rs.z, y(rs.x, rs.z), {
    facing: Math.PI,
    list: [
      { colour: 0x2c4a5c, basket: true },
      { colour: 0x7a3a2c, basket: false },
      { colour: 0x3c6a4a, basket: true },
    ],
  });
  if(rail.soft) ctx.softColliders?.push(rail.soft);
  bicycles.forEach((b, i) => {
    driveable(scene, b.group, {
      ...BICYCLE_DRIVE,
      id: `island-bicycle-${i + 1}`, label: 'island bicycle', kind: 'bicycle', verb: 'Ride',
      wheels: b.wheels, steer: b.steer, ignore: b.ignore,
      colliders, interactables,
    });
  });
}

// ------------------------------------------------------------------ the ferry
//
// WHICH DAYS. site.js already puts it on the berth's own sub-line — "Tuesdays
// and Fridays" — and the campaign's warm-ups name both: the mainland surveyor
// "came over on the Tuesday boat", and Rask "leaves on the Friday sailing".
// Day 1 is a Monday, so on fifteen consecutive days the boat is alongside on
// days 2, 5, 9 and 12. That is the whole point of an island: on eleven days in
// fifteen the berth is empty, and every budget in this course closes because
// nothing can leave.
const SAILING_DAYS = new Set([2, 5, 9, 12]);

// The slip runs down the shore at the berth's own x. The ramp is the reason a
// *vehicle* ferry can exist here at all: there is no dock, so the boat drives
// its bow onto a concrete beach.
const SLIP = { x: -30, z0: 126, z1: 148, w: 10 };

function ferry(scene, ctx){
  const { groundHeight, colliders, softColliders } = ctx;
  const yTop = groundHeight(SLIP.x, SLIP.z0), yToe = -7.2;
  const run = SLIP.z1 - SLIP.z0;
  const tilt = Math.atan2(yTop - yToe, run);

  // The slip itself: one smooth slab over a stepped mass, because the mass is
  // what hides the sea bed under it and the slab is what the eye reads.
  const slab = box(scene, SLIP.w, 0.5, Math.hypot(run, yTop - yToe) + 0.6,
    SLIP.x, (yTop + yToe) / 2, (SLIP.z0 + SLIP.z1) / 2, STONE());
  slab.rotation.x = tilt;
  seaborne(slab);
  for(let z = SLIP.z0; z < SLIP.z1; z += 2.2){
    const k = (z + 1.1 - SLIP.z0) / run;
    const y = yTop + (yToe - yTop) * k;
    seaborne(box(scene, SLIP.w - 0.4, y - BED, 2.25, SLIP.x, BED + (y - BED) / 2, z + 1.1, STONE()));
  }
  // Low walls either side, so the slip reads as a made thing and not a beach.
  for(const s of [-1, 1]){
    for(let z = SLIP.z0; z < SLIP.z1 - 2; z += 3.0){
      const k = (z + 1.5 - SLIP.z0) / run;
      const y = yTop + (yToe - yTop) * k;
      seaborne(box(scene, 0.6, 1.0, 3.05, SLIP.x + s * (SLIP.w / 2 + 0.3), y + 0.5, z + 1.5, COPING()));
    }
  }
  // Same absolute-y rule as the quay: the box has to reach above zero to block.
  colliders.push(new THREE.Box3(
    new THREE.Vector3(SLIP.x - SLIP.w / 2 - 0.9, BED, SLIP.z0 + 1.5),
    new THREE.Vector3(SLIP.x + SLIP.w / 2 + 0.9, 2.5, SLIP.z1 + 1.0)));

  // Four dolphins down the berth, which is what the boat warps against and what
  // says "a ship comes in here" on the eleven days she is somewhere else.
  for(const s of [-1, 1]) for(const dz of [157, 173]){
    const px = SLIP.x + s * 6.2;
    seaborne(cyl(scene, 0.42, 6.4, px, SEA - 2.8 + 3.2, dz, TIMBER()));
    softColliders?.push({ x: px, z: dz, r: 1.0 });
  }

  // ------------------------------------------------------------- the boat
  // A parent for the whole vessel, so one `visible` covers hull and ramp; the
  // ramp is a sibling of the hull rather than a child of it, because the end
  // resting on the slip should not rock with the deck.
  const boat = new THREE.Group();
  const hull = new THREE.Group();
  const HULL = PAINT(0x1b3b4a), BOOT = PAINT(0x5c2a22);
  const WHITE = PAINT(0x9e988c), DECK = PAINT(0x53504a), DARK = PAINT(0x33302b);

  // Local y = 0 is the waterline; −z is forward, toward the slip.
  box(hull, 8.4, 1.7, 23.0, 0, -0.85, 0, BOOT);
  box(hull, 8.8, 2.1, 24.0, 0, 1.05, 0, HULL);
  box(hull, 5.6, 2.1, 3.0, 0, 1.05, -13.5, HULL);            // the bow, narrowed
  box(hull, 8.3, 0.22, 22.4, 0, 2.16, 0.4, DECK);            // the car deck
  for(const s of [-1, 1]){
    box(hull, 0.34, 1.05, 22.4, s * 4.2, 2.6, 0.4, HULL);    // bulwarks
    box(hull, 0.16, 0.09, 22.0, s * 4.2, 3.66, 0.4, DARK);   // the rail above it
    for(let i = 0; i < 9; i++){
      box(hull, 0.12, 0.55, 0.12, s * 4.2, 3.4, -10.5 + i * 2.6, DARK);
    }
  }
  // Wheelhouse aft, over the crew space, with a funnel beside it.
  box(hull, 5.2, 2.7, 4.6, 0, 3.6, 8.6, WHITE);
  box(hull, 5.3, 0.95, 4.7, 0, 4.35, 8.6, MATERIALS.glass());
  box(hull, 5.6, 0.22, 5.0, 0, 5.05, 8.6, WHITE);
  for(const s of [-1, 1]) box(hull, 0.1, 0.75, 5.0, s * 2.7, 5.45, 8.6, DARK);
  cyl(hull, 0.8, 2.8, 1.9, 6.5, 11.4, PAINT(0x7d4a30));
  cyl(hull, 0.86, 0.5, 1.9, 7.85, 11.4, DARK);
  cyl(hull, 0.1, 3.4, 0, 6.8, 8.6, DARK);                    // mast
  for(const s of [-1, 1]) cyl(hull, 0.5, 1.9, s * 1.9, 6.0, 6.4, WHITE);   // liferafts
  // Two vehicles aboard, because it is a vehicle ferry and an empty deck says
  // nothing. A van and a car, both small: this is a nine-metre beam.
  box(hull, 2.0, 2.1, 5.0, -2.1, 3.3, -3.0, PAINT(0x3d5a48));
  box(hull, 1.9, 1.0, 4.2, 1.9, 2.8, 2.6, PAINT(0x6a3830));
  box(hull, 1.75, 0.65, 2.0, 1.9, 3.6, 3.1, PAINT(0x3f4a50));
  const HULL_Z = 165;
  hull.position.set(SLIP.x, SEA, HULL_Z);
  boat.add(hull);

  // The bow ramp, down on the slip. It lands at z = 144, which is where the
  // slip's surface is still a foot clear of the water — a linkspan that ends
  // under the sea is a linkspan nothing can drive off.
  const slipY = (z) => yTop + (yToe - yTop) * ((z - SLIP.z0) / run);
  const rampToe = 144.0, rampHeel = HULL_Z - 15.0;   // the stem, in world z
  const yToeTop = slipY(rampToe) + 0.3, yHeel = SEA + 2.16;
  const ramp = new THREE.Group();
  const rl = Math.hypot(rampHeel - rampToe, yHeel - yToeTop) + 0.4;
  const plate = box(ramp, 5.4, 0.22, rl, 0, 0, 0, DECK);
  plate.rotation.x = -Math.atan2(yHeel - yToeTop, rampHeel - rampToe);
  ramp.position.set(SLIP.x, (yHeel + yToeTop) / 2, (rampHeel + rampToe) / 2);
  for(const s of [-1, 1]){
    line(ramp, { x: s * 2.5, y: 0.2, z: -rl / 2 + 0.3 }, { x: s * 2.5, y: 1.5, z: rl / 2 - 0.3 },
      0.05, DARK);
  }
  boat.add(ramp);

  boat.name = 'vellan-ferry';
  scene.add(boat);
  seaborne(boat);

  // Alongside on four days in fifteen. No collider: the hull is out over the
  // water where the player cannot stand, and a collider left behind on the
  // eleven days she is at sea would be an invisible wall in the harbour.
  boat.visible = false;
  ctx.stateHooks.push((state) => {
    boat.visible = SAILING_DAYS.has(state?.week ?? 1);
  });

  // Made fast, so the rocking is a boat against a slip and not a boat adrift.
  animate(sway(hull, 'z', 0.012, 0.44));
  animate(bob(hull, 0.05, 0.40, 0.8));
}

// -------------------------------------------------------------- the road walls
//
// The island road ran three hundred metres through open ground with nothing to
// say where the grazing stopped. A dry-stone wall is what an island of ninety-one
// people builds instead of a fence, and it is also the day-9 stocking argument
// standing in the ground: the wall is the boundary the graziers are arguing over.
//
// Gaps at every approach. The road, both spurs and every door stay clear — a
// wall across a route is house rule 8 with a hundred stones in it.
const WALL_GAPS = [[4, 50], [-38, -22], [-214, -198]];

function roadWalls(scene, ctx){
  const { groundHeight, softColliders, blocked } = ctx;
  const r = rng(0x5e11c0);
  const spaced = 1.5;
  const mats = [];
  const inGap = (z) => WALL_GAPS.some(([a, b]) => z >= a && z <= b);
  let sinceCollider = 99;

  for(const side of [-1, 1]){
    for(let z = ROAD.z0 - 20; z > ROAD.z1; z -= spaced){
      if(inGap(z)) continue;
      const dx = between(r, -0.35, 0.35);
      const x = side * WALL_X + dx;
      if(blocked?.(x, z, 1.2)) continue;
      const h = between(r, 0.95, 1.25);
      const len = between(r, 1.35, 1.8);
      const wide = between(r, 0.55, 0.8);
      const y = groundHeight(x, z) + h / 2 - 0.14;
      mats.push({ x, y, z, h, len, wide, rot: between(r, -0.2, 0.2) });
      // A capstone on roughly every third length, sitting proud.
      if(r() < 0.34){
        mats.push({ x, y: y + h / 2, z, h: 0.22, len: len * 0.8, wide: wide + 0.14,
          rot: between(r, -0.35, 0.35) });
      }
      sinceCollider += spaced;
      if(sinceCollider >= 3){
        softColliders?.push({ x: side * WALL_X, z, r: 1.5 });
        sinceCollider = 0;
      }
    }
    sinceCollider = 99;
  }

  // One instanced mesh for ~300 stones. Three hundred draw calls for a wall is
  // the kind of content cost this repo's frame budget notes are about.
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), DRYSTONE(), mats.length);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  mats.forEach((s, i) => {
    e.set(0, s.rot, 0);
    q.setFromEuler(e);
    m4.compose(new THREE.Vector3(s.x, s.y, s.z), q, new THREE.Vector3(s.wide, s.h, s.len));
    im.setMatrixAt(i, m4);
  });
  im.instanceMatrix.needsUpdate = true;
  im.castShadow = true;
  im.receiveShadow = true;
  scene.add(im);
}

// ----------------------------------------------------------------- the flock
//
// Forty sheep on a common whose whole argument is how many it can carry. The
// game asks the player to reason about a stocking rate on ground that, until
// now, had nothing standing on it.
function flock(scene, ctx){
  const { groundHeight, softColliders, blocked } = ctx;
  const r = rng(0x0f10cc);
  const placed = [];
  const free = (x, z) => {
    if(Math.hypot(x - SPAWN.x, z - SPAWN.z) < 26) return false;
    if(Math.abs(x) < 11) return false;                 // off the road and its walls
    if(onPath(x, z, 5)) return false;
    if(Math.hypot(x, z) > 155) return false;           // the grazed centre, not the gorse
    if(blocked?.(x, z, 4)) return false;
    return placed.every(p => Math.hypot(p.x - x, p.z - z) > 3.2);
  };
  let guard = 0;
  while(placed.length < 40 && guard++ < 6000){
    let x, z;
    if(placed.length % 5 < 3){                          // three in five on the common
      const a = r() * Math.PI * 2, rad = 12 + r() * 44;
      x = 56 + Math.cos(a) * rad; z = -30 + Math.sin(a) * rad;
    } else {                                            // the rest over the grazed centre
      x = between(r, -140, 140); z = between(r, -150, 36);
    }
    if(!free(x, z)) continue;
    placed.push({ x, z, yaw: r() * Math.PI * 2 });
  }

  // Six of them walk. The rest are instanced: two draw calls for the flock, plus
  // one for the legs, instead of two hundred.
  const walkers = placed.slice(0, 6);
  const standing = placed.slice(6);

  const bodyGeo = new THREE.SphereGeometry(0.5, 10, 8);
  const headGeo = new THREE.BoxGeometry(0.26, 0.28, 0.36);
  const legGeo = new THREE.CylinderGeometry(0.055, 0.045, 0.42, 5);
  const bodies = new THREE.InstancedMesh(bodyGeo, WOOL(), standing.length);
  const heads = new THREE.InstancedMesh(headGeo, FLEECE_FACE(), standing.length);
  const legs = new THREE.InstancedMesh(legGeo, FLEECE_FACE(), standing.length * 4);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  const put = (im, i, x, y, z, yaw, sx, sy, sz) => {
    e.set(0, yaw, 0); q.setFromEuler(e);
    m4.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(sx, sy, sz));
    im.setMatrixAt(i, m4);
  };
  standing.forEach((s, i) => {
    const g = groundHeight(s.x, s.z);
    const fx = Math.sin(s.yaw), fz = Math.cos(s.yaw);
    put(bodies, i, s.x, g + 0.62, s.z, s.yaw, 1.24, 1.02, 1.72);
    put(heads, i, s.x + fx * 0.78, g + 0.60, s.z + fz * 0.78, s.yaw, 1, 1, 1);
    for(let k = 0; k < 4; k++){
      const ax = (k < 2 ? 0.52 : -0.44), az = (k % 2 ? 0.22 : -0.22);
      put(legs, i * 4 + k, s.x + fx * ax - fz * az, g + 0.21, s.z + fz * ax + fx * az, s.yaw, 1, 1, 1);
    }
    softColliders?.push({ x: s.x, z: s.z, r: 0.8 });
  });
  for(const im of [bodies, heads, legs]){
    im.instanceMatrix.needsUpdate = true;
    im.castShadow = true;
    im.receiveShadow = true;
    scene.add(im);
  }

  walkers.forEach((s, i) => {
    const g = new THREE.Group();
    const y0 = groundHeight(s.x, s.z);
    const b = new THREE.Mesh(bodyGeo, WOOL());
    b.scale.set(1.24, 1.02, 1.72);
    b.position.y = 0.62;
    b.castShadow = true;
    g.add(b);
    const h = new THREE.Mesh(headGeo, FLEECE_FACE());
    h.position.set(0, 0.60, 0.78);
    g.add(h);
    for(let k = 0; k < 4; k++){
      const l = new THREE.Mesh(legGeo, FLEECE_FACE());
      l.position.set(k % 2 ? 0.22 : -0.22, 0.21, k < 2 ? 0.52 : -0.44);
      g.add(l);
    }
    g.position.set(s.x, y0, s.z);
    g.rotation.y = s.yaw;
    scene.add(g);
    // A slow graze loop, re-grounded every frame and facing the way it goes.
    // `wander` in animators.js does the drift but keeps y and the heading fixed,
    // which on a graded island puts a sheep through a rise.
    const home = { x: s.x, z: s.z }, rad = 4.5 + i * 0.8, rate = 0.05 + i * 0.006;
    let px = s.x, pz = s.z;
    animate((t) => {
      const a = t * rate + i * 1.7;
      const nx = home.x + Math.cos(a) * rad + Math.cos(a * 2.3) * rad * 0.3;
      const nz = home.z + Math.sin(a * 0.7) * rad;
      const dx = nx - px, dz = nz - pz;
      g.position.set(nx, groundHeight(nx, nz), nz);
      if(dx * dx + dz * dz > 1e-5) g.rotation.y = Math.atan2(dx, dz);
      px = nx; pz = nz;
    });
  });
}

// -------------------------------------------------------------- the Old Light
//
// site.js builds the tower and stops at the parapet, which left the island's one
// landmark a plain rendered box. A lighthouse is its lantern: a glass ring, a
// gallery you can walk round outside it, and a cap.
//
// UNLIT SINCE 1974, and that is content rather than decoration — no emissive
// material anywhere in here, and nothing registered in `lightPanels`. The glass
// is dark, and on a nocturnal pass it stays dark.
function oldLight(scene, ctx){
  const { groundHeight } = ctx;
  const x = -8, z = -338;
  const g = groundHeight(x, z);
  const wallTop = g + 0.35 + 15.5;        // kit.building: floorY 0.35 + h
  const galleryY = wallTop + 0.55;        // clear of the 0.5 m parapet

  const iron = PAINT(0x3a3833), cap = PAINT(0x24262a);
  // The gallery: a deck wider than the tower, on corbels, with a rail round it.
  box(scene, 8.6, 0.34, 8.6, x, galleryY, z, COPING());
  for(const sx of [-1, 1]) for(const sz of [-1, 1]){
    box(scene, 0.5, 0.7, 0.5, x + sx * 3.2, galleryY - 0.5, z + sz * 3.2, COPING());
  }
  for(const s of [-1, 1]){
    box(scene, 8.6, 0.1, 0.1, x, galleryY + 1.02, z + s * 4.2, iron);
    box(scene, 0.1, 0.1, 8.6, x + s * 4.2, galleryY + 1.02, z, iron);
    box(scene, 8.6, 0.07, 0.07, x, galleryY + 0.58, z + s * 4.2, iron);
    box(scene, 0.07, 0.07, 8.6, x + s * 4.2, galleryY + 0.58, z, iron);
  }
  for(let i = 0; i < 5; i++){
    const o = -4.2 + i * 2.1;
    for(const s of [-1, 1]){
      box(scene, 0.09, 1.0, 0.09, x + o, galleryY + 0.6, z + s * 4.2, iron);
      box(scene, 0.09, 1.0, 0.09, x + s * 4.2, galleryY + 0.6, z + o, iron);
    }
  }

  // The lantern room: a plinth, the glazing, the astragals that hold it, and a
  // dark cap over the top with the vent ball on it.
  cyl(scene, 2.3, 0.5, x, galleryY + 0.4, z, COPING());
  cyl(scene, 2.15, 2.7, x, galleryY + 2.0, z, DARKGLASS());
  for(let i = 0; i < 8; i++){
    const a = (i / 8) * Math.PI * 2;
    box(scene, 0.14, 2.7, 0.14, x + Math.cos(a) * 2.16, galleryY + 2.0, z + Math.sin(a) * 2.16, iron);
  }
  cyl(scene, 2.5, 0.22, x, galleryY + 3.45, z, cap);
  cyl(scene, 2.45, 1.7, x, galleryY + 4.4, z, cap, 0.35);
  cyl(scene, 0.36, 0.5, x, galleryY + 5.45, z, cap);
  cyl(scene, 0.06, 1.1, x, galleryY + 6.2, z, iron);
}

// ------------------------------------------------------------------- the Tip
//
// "Everything that stays" is the area's own sub-line, and it was a shed on empty
// turf. The waste has to be *visible*: heaps that are the landfill cells, skips
// that are the sorted streams, and crates that are the freight the island cannot
// send back. Day 6 asks what should leave the island, standing here.
function tipYard(scene, ctx){
  const { groundHeight, softColliders, blocked } = ctx;
  const busy = (x, z, pad) => (blocked?.(x, z, pad) ?? false) || onPath(x, z, 4);
  const at = (x, z) => clearSpot({ x, z }, busy, { pad: 4, step: 2.5, rings: 5 });
  const r = rng(0x71bee7);

  // The cells: spoil heaps, capped and uncapped, in the ground east and south of
  // the yard. Tapered cylinders, which is what a tipped heap is.
  for(const [hx, hz, rad, hh] of [
    [-96, -230, 6.5, 3.8], [-82, -234, 5.0, 2.9], [-68, -226, 4.2, 2.3],
    [-98, -184, 5.4, 3.1], [-72, -190, 3.8, 2.0],
  ]){
    const p = at(hx, hz);
    if(p.moved < 0) continue;
    const y = groundHeight(p.x, p.z);
    cyl(scene, rad, hh, p.x, y + hh / 2, p.z, SPOIL(), rad * 0.24);
    softColliders?.push({ x: p.x, z: p.z, r: rad * 0.8 });
  }

  // The skips: open-top containers, painted for the streams the fixtures name.
  for(const [sx, sz, colour, facing] of [
    [-82, -218, 0x5c4326, 0], [-75, -218, 0x2f4a3a, 0], [-68, -218, 0x5c3428, 0],
    [-82, -192, 0x3c4a5a, 0], [-75, -192, 0x5c4326, 0.35],
  ]){
    const p = at(sx, sz);
    if(p.moved < 0) continue;
    skip(scene, p.x, p.z, groundHeight(p.x, p.z), { facing, colour });
    softColliders?.push({ x: p.x, z: p.z, r: 3.0 });
  }

  // Freight that came over and never went back: pallets and crates, stacked.
  for(const [cx, cz, rows] of [[-64, -212, 2], [-61, -197, 3], [-88, -228, 2]]){
    const p = at(cx, cz);
    if(p.moved < 0) continue;
    const soft = crateStack(scene, p.x, p.z, groundHeight(p.x, p.z),
      { rows, colour: r() < 0.5 ? 0x6b5735 : 0x4f4a3c, facing: between(r, -0.4, 0.4) });
    softColliders?.push(soft);
  }

  // Tyres, because they are the one waste stream an island cannot burn, bury or
  // ship at a price anyone will pay.
  const tyres = at(-66, -224);
  if(tyres.moved >= 0){
    const ty = groundHeight(tyres.x, tyres.z);
    for(let i = 0; i < 7; i++){
      const tx = tyres.x + between(r, -0.25, 0.25), tz = tyres.z + between(r, -0.25, 0.25);
      cyl(scene, 0.55, 0.24, tx, ty + 0.12 + i * 0.22, tz, MATERIALS.rubber(), 0.55);
    }
    softColliders?.push({ x: tyres.x, z: tyres.z, r: 1.2 });
  }
}

/** An open-top skip: floor, two long sides, two ends, and a lifting lug apiece. */
function skip(scene, x, z, y = 0, { facing = 0, colour = 0x5c4326 } = {}){
  const g = new THREE.Group();
  const m = PAINT(colour), edge = PAINT(0x2f2c28);
  box(g, 2.5, 0.16, 5.6, 0, 0.5, 0, m);
  for(const s of [-1, 1]) box(g, 0.12, 1.4, 5.6, s * 1.25, 1.2, 0, m);
  for(const s of [-1, 1]) box(g, 2.5, 1.4, 0.12, 0, 1.2, s * 2.8, m);
  for(const s of [-1, 1]) box(g, 0.2, 0.12, 5.7, s * 1.25, 1.92, 0, edge);
  for(const s of [-1, 1]) box(g, 0.16, 0.7, 0.16, s * 1.35, 1.0, 1.9, edge);
  box(g, 2.3, 0.5, 0.3, 0, 0.25, 0, edge);
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  return g;
}

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, scene } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX  = b.xInner + f * 0.5;     // just inside the spine wall
  const outX = b.xOuter - f * 0.5;     // against the exterior wall

  switch(room.kind){
    case 'reception':
      // A counter you queue at, with a low accessible section.
      box(1.0, 1.05, 4.2, b.xInner + f * 2.4, 0.525, b.cz - 0.6, M.frame);
      hard(b.xInner + f * 2.4, b.cz, 1.2, 6.0, 1.1);
      break;

    case 'waiting':
      // Seats come from plan.seats so people and chairs cannot drift apart.
      // (Build them with kit.chair once engine/world/kit.js is wired in.)
      break;

    case 'workroom':
      // The mission destination. A working surface and somewhere to sit.
      box(0.62, 0.72, 1.75, b.cx + f * 0.6, 0.36, b.cz, M.frame);
      hard(b.cx + f * 0.6, b.cz, 0.8, 1.9, 0.8);
      break;

    case 'lab':
      box(0.58, 0.86, 3.4, outX, 0.43, b.cz - 1.0, M.frame);
      hard(outX, b.cz - 1.0, 0.7, 3.4, 0.95);
      break;

    case 'station':
      box(0.7, 1.15, 5.0, b.xInner + f * 1.1, 0.575, b.cz, M.frame);
      hard(b.xInner + f * 1.1, b.cz, 0.9, 5.1, 1.2);
      break;

    case 'supply':
    case 'quiet':
    default:
      break;
  }
}

/** Fit out the spine: parked equipment, wall furniture, floor wayfinding. */
export function fitOutSpine(ctx){
  const { plan, P, soft } = ctx;
  // Coloured routes let into the floor are the cheapest wayfinding there is.
  // Replace the colours and destinations for this theme.
  void plan; void P; void soft;
}
