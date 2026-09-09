// props.js — the objects that make Kerrow No. 3 a mine hoist.
//
// Generic fittings come from engine/world/kit.js and are placed from site.js.
// What is here is the handful of things this place has and nowhere else does:
//
//   · **The headframe is the silhouette.** Thirty-two metres of lattice over the
//     shaft with two sheave wheels at the top of it, alone on a moor with
//     nothing else above nine metres. Every screenshot of this game has it in.
//   · **The rope run is walked under.** Two ropes leave the winder house at
//     head height, cross the yard and go up over the sheaves, which is the one
//     piece of geometry the player is inside rather than beside — and it is what
//     days three, nine and ten are all about.
//   · **The drum is visible through the winder house doors**, because eighteen
//     tonnes of steel that nobody counts is the joke of day eleven.
//   · **The conveyor leaves the map.** Ore goes up to a plant that is not here,
//     which is why the tip's question is about a stream rather than a load.
//
// Placement helpers take `(x, z, y)` — ground last.
import * as THREE from 'three';
import {
  MATERIALS, box, cyl, sign, post, bench, crateStack, fenceRun,
  vehicle, VEHICLE_DRIVE, quadBike, QUAD_DRIVE, clearSpot,
} from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { spin, sway, bob, wander, scrollUV } from '../../engine/world/animators.js';
import { driveable } from '../../engine/world/driving.js';

/** Where the shaft is, how tall the frame is, and where the drum sits. */
const SHAFT = { x: 0, z: -4, h: 32, w: 5.6 };
const DRUM = { x: -30, z: 6, r: 2.1, w: 4.4, y: 3.2 };

const STEEL = () => MATERIALS.paintedSteel(0x6a6f72);
const OXIDE = () => MATERIALS.paintedSteel(0x8a4a32);
const ROPE = () => MATERIALS.steel();

/**
 * One bay of the headframe: four legs with a frame at the top and a diagonal on
 * each face. Built as bays rather than as a tapering solid because a lattice at
 * this size reads as a texture of gaps, and a solid box reads as a chimney.
 */
function bay(parent, y0, y1, w0, w1, m){
  const h0 = w0 / 2, h1 = w1 / 2;
  for(const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]){
    const dx = sx * h1 - sx * h0, dz = sz * h1 - sz * h0;
    const len = Math.hypot(y1 - y0, dx, dz);
    const leg = box(parent, 0.13, len, 0.13,
      sx * (h0 + h1) / 2, (y0 + y1) / 2, sz * (h0 + h1) / 2, m);
    leg.rotation.z = -Math.atan2(dx, y1 - y0);
    leg.rotation.x = Math.atan2(dz, y1 - y0);
  }
  for(const sz of [-1, 1]){
    box(parent, w1, 0.09, 0.09, 0, y1, sz * h1, m);
    box(parent, 0.09, 0.09, w1, sz * h1, y1, 0, m);
  }
  const dy = y1 - y0, diag = Math.hypot(dy, w1);
  for(const [ax, az, rot] of [[0, -h1, 0], [0, h1, 0], [-h1, 0, Math.PI / 2], [h1, 0, Math.PI / 2]]){
    const d = box(parent, 0.07, diag, 0.07, ax, (y0 + y1) / 2, az, m);
    d.rotation.y = rot;
    d.rotation.z = Math.atan2(w1, dy) * (ax + az > 0 ? 1 : -1);
  }
}

/** The headframe: bays, two sheave wheels, the back legs, and the shaft collar. */
function headframe(scene, y0, ctx){
  const { colliders } = ctx;
  const g = new THREE.Group();
  const m = STEEL();
  // Six bays rather than eight: the lattice reads the same from the yard and it
  // is a quarter fewer meshes in the heaviest object on the site.
  const bays = 6;
  for(let i = 0; i < bays; i++){
    const yy0 = (SHAFT.h * i) / bays, y1 = (SHAFT.h * (i + 1)) / bays;
    const w0 = SHAFT.w - (SHAFT.w - 3.4) * (i / bays);
    const w1 = SHAFT.w - (SHAFT.w - 3.4) * ((i + 1) / bays);
    bay(g, yy0, y1, w0, w1, m);
  }
  // The two sheave wheels at the top, on one axle across the frame, drawn as
  // short cylinders lying on their sides.
  const sheaves = [];
  for(const sx of [-1.1, 1.1]){
    const wheel = cyl(g, 2.6, 0.34, sx, SHAFT.h + 1.4, 0, OXIDE());
    wheel.rotation.z = Math.PI / 2;
    cyl(g, 0.6, 0.4, sx, SHAFT.h + 1.4, 0, m).rotation.z = Math.PI / 2;
    // Handed back so the dressing can turn them with the cage — a headframe
    // whose wheels are still while a cage rises is a photograph of a mine.
    sheaves.push(wheel);
  }
  box(g, 3.4, 0.22, 0.22, 0, SHAFT.h + 1.4, 0, m);
  // The back legs, which take the pull of the rope towards the winder house.
  for(const sz of [-1, 1]){
    const len = Math.hypot(SHAFT.h, 16);
    const leg = box(g, 0.22, len, 0.22, -8, SHAFT.h / 2, sz * 1.7, m);
    leg.rotation.z = Math.atan2(16, SHAFT.h);
  }
  // The shaft collar: a low concrete kerb round the hole, and a hole that is
  // dark rather than a floor.
  for(const [dx, dz, w, d] of [[0, -3.2, 7.4, 0.7], [0, 3.2, 7.4, 0.7], [-3.35, 0, 0.7, 6.4], [3.35, 0, 0.7, 6.4]]){
    box(g, w, 0.9, d, dx, 0.45, dz, MATERIALS.concrete());
  }
  box(g, 6.0, 0.1, 5.6, 0, 0.08, 0, MATERIALS.paintedSteel(0x14161a));

  g.position.set(SHAFT.x, y0, SHAFT.z);
  // Deliberately NOT casting shadows from the lattice. There are about a hundred
  // members in it, each one a shadow caster is a draw call in the shadow pass,
  // and the shadow of a lattice at this scale is noise rather than a shape. The
  // first version of this cast from all of them and the game took long enough to
  // present its first frame that the screenshot harness gave up on it — which is
  // the same defect a player would meet as a black screen on a tablet.
  g.traverse(o => { if(o.isMesh){ o.castShadow = false; o.receiveShadow = true; } });
  scene.add(g);
  // The frame is walked round, not through.
  colliders.push(new THREE.Box3(
    new THREE.Vector3(SHAFT.x - 3.9, y0, SHAFT.z - 3.9),
    new THREE.Vector3(SHAFT.x + 3.9, y0 + 2.2, SHAFT.z + 3.9)));
  return sheaves;
}

/** The two ropes: winder house to sheave, at head height across the yard. */
function ropeRun(scene, ctx){
  const { groundHeight } = ctx;
  const y0 = groundHeight(DRUM.x, DRUM.z) + DRUM.y + 1.4;
  const y1 = groundHeight(SHAFT.x, SHAFT.z) + SHAFT.h + 1.4;
  for(const sz of [-1.1, 1.1]){
    const x0 = DRUM.x + 6, z0 = DRUM.z + sz;
    const x1 = SHAFT.x - 1.1, z1 = SHAFT.z + sz;
    const len = Math.hypot(x1 - x0, y1 - y0, z1 - z0);
    const r = cyl(scene, 0.04, len, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2, ROPE());
    // Lie the cylinder along the run: pitch it in the vertical plane, then yaw.
    r.rotation.z = Math.atan2(x1 - x0, y1 - y0);
    r.rotation.y = Math.atan2(z1 - z0, x1 - x0);
    r.userData.ignoreAudit = true;      // deliberately in the air
  }
  // A gantry the ropes pass over, so the run reads as guarded rather than as a
  // line drawn through the yard.
  for(const x of [-18, -10]){
    const gy = groundHeight(x, DRUM.z);
    for(const sz of [-2.4, 2.4]) cyl(scene, 0.12, 6.2, x, gy + 3.1, DRUM.z + sz, STEEL());
    box(scene, 0.3, 0.3, 5.2, x, gy + 6.2, DRUM.z, STEEL());
  }
}

/** The drum, visible through the winder house doors, on its own bedplate. */
function drum(scene, ctx){
  const { groundHeight, colliders } = ctx;
  const y = groundHeight(DRUM.x, DRUM.z);
  const barrel = cyl(scene, DRUM.r, DRUM.w, DRUM.x, y + DRUM.y, DRUM.z, OXIDE());
  barrel.rotation.x = Math.PI / 2;
  // The two flanges the brake pads clamp, a little larger than the barrel.
  for(const sz of [-1, 1]){
    const f = cyl(scene, DRUM.r + 0.45, 0.18, DRUM.x, y + DRUM.y, DRUM.z + sz * (DRUM.w / 2), STEEL());
    f.rotation.x = Math.PI / 2;
  }
  // The brake: a weight box either side, and the linkage down to the pads.
  for(const sz of [-1, 1]){
    box(scene, 1.1, 1.4, 0.9, DRUM.x + 3.4, y + 0.7, DRUM.z + sz * 2.2, STEEL());
    box(scene, 3.0, 0.16, 0.16, DRUM.x + 1.9, y + DRUM.y - 1.2, DRUM.z + sz * 2.2, STEEL());
  }
  box(scene, 8.0, 0.5, 6.4, DRUM.x, y + 0.25, DRUM.z, MATERIALS.concrete());
  colliders.push(new THREE.Box3(
    new THREE.Vector3(DRUM.x - 4.2, y, DRUM.z - 3.4),
    new THREE.Vector3(DRUM.x + 4.2, y + DRUM.y + DRUM.r, DRUM.z + 3.4)));
}

/** The conveyor: a gallery leaving the tip and running off the map. */
function conveyor(scene, ctx){
  const { groundHeight } = ctx;
  for(let i = 0; i < 11; i++){
    const x = 40 + i * 7.5, z = -34 - i * 1.6;
    const y = groundHeight(x, z);
    const h = 4.2 + i * 0.55;
    for(const sx of [-1, 1]) cyl(scene, 0.11, h, x + sx * 1.3, y + h / 2, z, STEEL());
    box(scene, 3.4, 0.6, 2.0, x, y + h, z, MATERIALS.paintedSteel(0x7f7a6c));
  }
}

export function decorate(scene, ctx){
  const { groundHeight } = ctx;
  const at = (x, z) => groundHeight(x, z);

  const sheaves = headframe(scene, at(SHAFT.x, SHAFT.z), ctx);
  drum(scene, ctx);
  ropeRun(scene, ctx);
  conveyor(scene, ctx);

  // ---- the dressing. See gamekit/DRESSING_PASS.md; the numbers are its list.
  spoilHeap(scene, ctx);        // 1
  tubRoad(scene, ctx);          // 2
  ropeYard(scene, ctx);         // 3
  timberStack(scene, ctx);      // 4
  weighbridge(scene, ctx);      // 5
  fanHouse(scene, ctx);         // 7
  settlingPonds(scene, ctx);    // 8
  benchWall(scene, ctx);        // 9
  sheep(scene, ctx);            // 10
  peatCuttings(scene, ctx);     // 11
  cairns(scene, ctx);           // 12
  telegraph(scene, ctx);        // 13
  wreckedDrum(scene, ctx);      // 14
  motion(scene, ctx, sheaves);  // 15–17
  campaignState(scene, ctx);    // 18–19

  // The bins under the tip, and the two sheared bolts' worth of steel frame.
  for(const [x, z] of [[30, -22], [38, -22]]){
    const y = at(x, z);
    box(scene, 4.4, 3.2, 4.4, x, y + 1.6, z, MATERIALS.paintedSteel(0x6f6a5c));
    box(scene, 5.0, 0.3, 5.0, x, y + 3.3, z, STEEL());
  }

  // --------------------------------------------------------------- transport
  // The gravity station is 290 m out along the bench, and the book says the
  // track "is peat for the last hundred". That sentence is the reason there are
  // two: the pit van goes as far as the hard standing and the quad does the
  // peat, which is a decision about the route rather than a faster way to walk.
  transport(scene, ctx, at);

  // The gravity station's pillar, which is the whole instrument as far as the
  // survey is concerned: concrete to bedrock, and a brass plate on top.
  const gx = -70, gz = -283, gy = at(gx, gz);
  cyl(scene, 0.45, 1.1, gx, gy + 0.55, gz, MATERIALS.concrete());
  cyl(scene, 0.16, 0.06, gx, gy + 1.13, gz, MATERIALS.paintedSteel(0xb08a3a));
}


// ------------------------------------------------------------------ transport
/** The spawn, so nothing is parked on top of it. Mirrors `site.start`. */
const SPAWN = { x: 0, z: 70 };
const VAN_AT = { x: 12, z: 56 }, VAN_FACING = Math.PI, VAN_COLOUR = 0x35502f;
const VAN_ID = 'pit-van', VAN_LABEL = 'pit van';
const QUAD_AT = { x: -14, z: 54 }, QUAD_FACING = Math.PI, QUAD_COLOUR = 0x8e2f22;
const QUAD_ID = 'bench-quad', QUAD_LABEL = 'bench quad';
/**
 * The two vehicles this site keeps, and the player can take either.
 *
 * `clearSpot` rather than a hand-checked coordinate: a vehicle parked inside a
 * collider is one you get into and cannot move (house rule 16 from the other
 * side), and the spawn is in the avoid list because a prop over the spawn welds
 * the player in place (house rule 8).
 */
function transport(scene, ctx, at){
  const { colliders, interactables, blocked } = ctx;
  const spawn = { x: SPAWN.x, z: SPAWN.z, r: 14 };

  const vs = clearSpot(VAN_AT, blocked, { pad: 3.4, avoid: [spawn] });
  const van = vehicle(scene, vs.x, vs.z, at(vs.x, vs.z), { facing: VAN_FACING, colour: VAN_COLOUR });
  driveable(scene, van.group, {
    ...VEHICLE_DRIVE,
    id: VAN_ID, label: VAN_LABEL, kind: 'van',
    seat: { x: 0.52, y: 2.18, z: van.cabZ },
    wheels: van.wheels,
    colliders, interactables,
  });

  const qs = clearSpot(QUAD_AT, blocked, { pad: 1.8, avoid: [spawn, { x: vs.x, z: vs.z, r: 5 }] });
  const q = quadBike(scene, qs.x, qs.z, at(qs.x, qs.z), { facing: QUAD_FACING, colour: QUAD_COLOUR });
  driveable(scene, q.group, {
    ...QUAD_DRIVE,
    id: QUAD_ID, label: QUAD_LABEL, kind: 'quad',
    wheels: q.wheels, steer: q.steer,
    colliders, interactables,
  });
}


// ============================================================ the dressing
//
// Everything below is the yard and the moor AROUND the four things above. The
// place was correct and empty: a headframe on a brown plane, a shift board, and
// a 290 m walk to the gravity station past one post. See gamekit/DRESSING_PASS.md.
//
// Three rules the whole of it obeys. Placers take `(x, z, y)` with ground last
// (house rule 7). Nothing goes over the spawn or across the yard's routes
// (house rule 8) — every scatter asks `blocked()` first. And the albedos are
// written darker than they look, except the stone, which is the one surface
// this repo has already taken too far: at 0x46 a dry-stone wall rendered as a
// crash barrier, so it sits at a mid grey where its own courses still read.

/**
 * A hard collider, in the shape the OUTDOOR world uses.
 *
 * `colliders` here is an array of `THREE.Box3`; `softColliders` is the
 * plain-number `{x, z, r}`. Pushing the second into the first does not fail
 * where it is written — it throws on the first ray `engine/dev/reachable.mjs`
 * fires, several checks later, which is the tripwire in `alamos-world` about
 * exactly these two shapes.
 */
function solid(colliders, x, z, y, r, h = 2.4){
  const b = new THREE.Box3(new THREE.Vector3(x - r, y, z - r),
                           new THREE.Vector3(x + r, y + h, z + r));
  colliders?.push(b);
  return b;
}

/** Deterministic jitter of our own, so an upstream change cannot reshuffle it. */
function rng(seed){
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
const between = (r, a, b) => a + r() * (b - a);

const SPOIL = () => mat('kerrow.spoil', () => new THREE.MeshStandardMaterial({
  color: 0x3f3a33, roughness: 0.99, metalness: 0, envMapIntensity: 0.35 }));
// TWO STOPS DARKER THAN IT LOOKS. At 0x8a857a with the environment at 0.5 this
// wall rendered as a row of white concrete blocks beside the track — the
// blow-out house rule 6 is about, on a moor with a brighter sky than the island
// the lighter value was tuned on. Dark enough that the courses read, light
// enough that it is not the crash barrier the same rule caused once already.
const DRYSTONE = () => mat('kerrow.drystone', () => new THREE.MeshStandardMaterial({
  color: 0x6b6558, roughness: 0.98, metalness: 0, envMapIntensity: 0.4 }));
const TIMBER = () => mat('kerrow.timber', () => new THREE.MeshStandardMaterial({
  color: 0x4e4335, roughness: 0.95, metalness: 0, envMapIntensity: 0.4 }));
const PEAT = () => mat('kerrow.peat', () => new THREE.MeshStandardMaterial({
  color: 0x342c22, roughness: 1, metalness: 0, envMapIntensity: 0.3 }));
const FLEECE = () => mat('kerrow.fleece', () => new THREE.MeshStandardMaterial({
  color: 0xa9a294, roughness: 0.95, metalness: 0, envMapIntensity: 0.55 }));
const WATER = () => mat('kerrow.water', () => new THREE.MeshStandardMaterial({
  color: 0x2c3a3c, roughness: 0.28, metalness: 0.1, envMapIntensity: 0.9 }));

/**
 * 1. The spoil heap — 40 m of it behind the tip.
 *
 * Three overlapping cones rather than one, because a single cone is a hat. It
 * is the second silhouette on the site and the reason the tip and the conveyor
 * are here at all.
 */
function spoilHeap(scene, ctx){
  const { groundHeight, colliders } = ctx;
  const heaps = [[54, -46, 17, 7.5], [70, -52, 13, 5.4], [42, -58, 11, 4.6]];
  for(const [x, z, r, h] of heaps){
    const y = groundHeight(x, z);
    const c = cyl(scene, r, h, x, y + h / 2, z, SPOIL(), 0.6);
    c.receiveShadow = true;
    solid(colliders, x, z, y, r * 0.72, h);
  }
  // The working face: a pale scar of fresh material down the near side.
  const y = groundHeight(56, -36);
  const face = box(scene, 9, 0.3, 13, 56, y + 1.9, -36, SPOIL());
  face.rotation.x = -0.42;
}

/**
 * 2. The tub road: rails from the shaft collar out to the tip, with the tubs
 *    that run on them. Two of the six are tipped on their sides, which is what
 *    a yard actually looks like.
 */
function tubRoad(scene, ctx){
  const { groundHeight, softColliders } = ctx;
  const RAIL = () => MATERIALS.paintedSteel(0x55504a);
  const x0 = 6, x1 = 30, z0 = -12, z1 = -26;
  const n = 26;
  for(let i = 0; i < n; i++){
    const t = i / (n - 1);
    const x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t;
    const y = groundHeight(x, z);
    // Sleepers across, rails along: two thin boxes per step reads as track.
    const sl = box(scene, 1.9, 0.1, 0.34, x, y + 0.05, z, TIMBER());
    sl.rotation.y = Math.atan2(x1 - x0, z1 - z0);
  }
  for(const off of [-0.62, 0.62]){
    const mx = (x0 + x1) / 2 + off * 0.7, mz = (z0 + z1) / 2 - off * 0.7;
    const len = Math.hypot(x1 - x0, z1 - z0);
    const r = box(scene, 0.09, 0.1, len, mx, groundHeight(mx, mz) + 0.14, mz, RAIL());
    r.rotation.y = Math.atan2(x1 - x0, z1 - z0);
  }
  const tubs = [[10, -14, 0], [14, -17, 0], [18, -19, 0], [23, -22, 0], [26, -20, 1], [12, -22, 1]];
  for(const [x, z, over] of tubs){
    const y = groundHeight(x, z);
    const g = new THREE.Group();
    g.position.set(x, y, z);
    box(g, 1.5, 1.0, 1.1, 0, 0.62, 0, MATERIALS.paintedSteel(0x6b5a48));
    box(g, 1.6, 0.12, 1.2, 0, 1.14, 0, MATERIALS.paintedSteel(0x7a6a58));
    for(const sx of [-1, 1]){
      cyl(g, 0.22, 0.1, sx * 0.55, 0.2, 0.42, MATERIALS.steel()).rotation.z = Math.PI / 2;
    }
    if(over){ g.rotation.z = 1.35; g.position.y += 0.5; }
    scene.add(g);
    softColliders?.push({ x, z, r: 1.2 });
  }
}

/**
 * 3. The rope shop's yard: four coils of used winding rope, one part-unwound,
 *    and a rack of test offcuts. Day 3 is about rope as a load; this is that
 *    argument standing outside the shed it is argued in.
 */
function ropeYard(scene, ctx){
  const { groundHeight, softColliders } = ctx;
  const coils = [[-46, 30, 1.7], [-46, 25, 1.5], [-41, 22, 1.9], [-50, 34, 1.3]];
  for(const [x, z, r] of coils){
    const y = groundHeight(x, z);
    for(let i = 0; i < 4; i++){
      const t = new THREE.Mesh(new THREE.TorusGeometry(r - i * 0.16, 0.075, 6, 22),
        MATERIALS.steel());
      t.position.set(x, y + 0.12 + i * 0.15, z);
      t.rotation.x = Math.PI / 2;
      t.castShadow = true;
      scene.add(t);
    }
    softColliders?.push({ x, z, r: r + 0.4 });
  }
  // One of them run out across the ground, which is how a rope is inspected.
  const y = groundHeight(-38, 26);
  const tail = cyl(scene, 0.075, 11, -38, y + 0.09, 26, MATERIALS.steel());
  tail.rotation.x = Math.PI / 2;
  tail.rotation.z = 0.5;
  // The offcut rack: six short lengths standing in a timber frame.
  const rx = -52, rz = 40, ry = groundHeight(rx, rz);
  for(const sx of [-1, 1]) box(scene, 0.12, 1.7, 0.12, rx + sx * 1.4, ry + 0.85, rz, TIMBER());
  box(scene, 3.1, 0.12, 0.3, rx, ry + 1.7, rz, TIMBER());
  for(let i = 0; i < 6; i++){
    cyl(scene, 0.06, 1.5, rx - 1.2 + i * 0.48, ry + 0.75, rz, MATERIALS.steel());
  }
}

/** 4. Timber stack: sawn pit props under a lean-to, banded in threes. */
function timberStack(scene, ctx){
  const { groundHeight, colliders } = ctx;
  const x = -44, z = 48, y = groundHeight(x, z);
  for(let row = 0; row < 4; row++){
    for(let i = 0; i < 7; i++){
      const p = cyl(scene, 0.11, 2.6, x - 1.6 + i * 0.26, y + 0.14 + row * 0.24, z + (row % 2) * 0.06,
        TIMBER(), { axis: 'z' });
      p.rotation.x = Math.PI / 2;
    }
  }
  // The lean-to over it: four legs and a single slope.
  for(const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]){
    box(scene, 0.14, 2.6, 0.14, x + sx * 2.4, y + 1.3, z + sz * 1.8, TIMBER());
  }
  const roof = box(scene, 5.4, 0.12, 4.2, x, y + 2.7, z, MATERIALS.paintedSteel(0x6d6559));
  roof.rotation.x = 0.14;
  solid(colliders, x, z, y, 2.8);
}

/** 5. The weighbridge at the yard entrance: a plate, a kiosk, a stop line. */
function weighbridge(scene, ctx){
  const { groundHeight, colliders } = ctx;
  const x = 4, z = 46, y = groundHeight(x, z);
  const plate = box(scene, 8, 0.12, 3.4, x, y + 0.07, z, MATERIALS.paintedSteel(0x615c55));
  plate.receiveShadow = true;
  box(scene, 0.3, 0.06, 3.4, x - 4.1, y + 0.1, z, MATERIALS.paintedSteel(0xb8a63a));
  box(scene, 0.3, 0.06, 3.4, x + 4.1, y + 0.1, z, MATERIALS.paintedSteel(0xb8a63a));
  const kx = x + 6.4;
  box(scene, 2.2, 2.6, 2.2, kx, y + 1.3, z, MATERIALS.paintedSteel(0x8f8b80));
  box(scene, 1.5, 0.9, 0.08, kx, y + 1.8, z - 1.12, MATERIALS.glass());
  box(scene, 2.6, 0.14, 2.6, kx, y + 2.68, z, MATERIALS.paintedSteel(0x5f5a52));
  solid(colliders, kx, z, y, 1.6, 2.8);
  sign(scene, 'WEIGHBRIDGE', { x: kx, y: y + 3.1, z, w: 2.6, h: 0.6, facing: Math.PI,
    sub: 'ALL LOADS' });
}

/**
 * 7. The fan house and its duct — the loudest thing on a real pit, and the one
 *    piece of plant a shaft cannot work without.
 */
function fanHouse(scene, ctx){
  const { groundHeight, colliders, animate } = ctx;
  const x = -14, z = -22, y = groundHeight(x, z);
  box(scene, 6.4, 3.6, 5.2, x, y + 1.8, z, MATERIALS.brick?.() ?? MATERIALS.paintedSteel(0x7a5a4a));
  box(scene, 6.9, 0.2, 5.7, x, y + 3.7, z, MATERIALS.paintedSteel(0x5f5a52));
  solid(colliders, x, z, y, 3.2, 3.8);
  // The duct to the collar: a big pipe on trestles, which is the giveaway.
  const dz = [z + 3.0, -6.5];
  const len = Math.abs(dz[1] - dz[0]);
  const duct = cyl(scene, 0.78, len, x + 1.2, y + 2.1, (dz[0] + dz[1]) / 2,
    MATERIALS.paintedSteel(0x6f7a72));
  duct.rotation.x = Math.PI / 2;
  for(let i = 0; i <= 4; i++){
    const tz = dz[0] + (dz[1] - dz[0]) * (i / 4);
    for(const sx of [-0.7, 0.7]){
      box(scene, 0.12, 1.5, 0.12, x + 1.2 + sx, groundHeight(x + 1.2, tz) + 0.75, tz, MATERIALS.steel());
    }
  }
  // The fan itself, seen through the gable louvre, turning.
  const hub = new THREE.Group();
  hub.position.set(x, y + 2.2, z - 2.65);
  for(let i = 0; i < 6; i++){
    const b = box(hub, 0.16, 1.5, 0.06, 0, 0, 0, MATERIALS.paintedSteel(0x8a8f92));
    b.rotation.z = (i / 6) * Math.PI * 2;
    b.position.set(Math.sin(i / 6 * Math.PI * 2) * 0.75, Math.cos(i / 6 * Math.PI * 2) * 0.75, 0);
  }
  scene.add(hub);
  animate?.(spin(hub, 'z', 2.4));
}

/** 8. Two settling ponds downhill of the tip, with a dark rim. */
function settlingPonds(scene, ctx){
  const { groundHeight, softColliders } = ctx;
  for(const [x, z, w, d] of [[62, -14, 16, 11], [62, -1, 13, 9]]){
    const y = groundHeight(x, z);
    box(scene, w + 1.6, 0.5, d + 1.6, x, y - 0.1, z, PEAT());
    const water = box(scene, w, 0.06, d, x, y + 0.12, z, WATER());
    water.receiveShadow = false;
    softColliders?.push({ x, z, r: Math.max(w, d) / 2 });
  }
}

/**
 * 9. The dry-stone wall along the bench track — the highest-value item in the
 *    dressing pass. The moor's middle distance had no line in it at all, and a
 *    wall turns 290 m of brown plane into a walk with an edge.
 *
 * Gaps where the track crosses, and a stile at the first of them. Instanced:
 * three hundred draw calls for a wall is what the frame budget notes are about.
 */
// ONE GAP, WHERE THE ROUTE ACTUALLY CROSSES. The wall runs parallel to the
// bench track six metres off it, so it blocks nothing until the last leg turns
// west to the hut at z ≈ -288. The first cut also opened a gap at the stile,
// which is backwards: a stile is how you cross a wall that has no gap in it,
// and it left a set of steps standing alone on the moor.
const WALL_GAPS = [[-292, -276]];
function benchWall(scene, ctx){
  const { groundHeight, softColliders, blocked } = ctx;
  const r = rng(0x0efb17);
  const WALL_X = -30;
  const mats = [];
  const inGap = (z) => WALL_GAPS.some(([a, b]) => z >= a && z <= b);
  let since = 99;
  for(let z = -24; z > -296; z -= 0.78){
    if(inGap(z)) continue;
    const x = WALL_X + between(r, -0.3, 0.3);
    if(blocked?.(x, z, 1.1)) continue;
    const h = between(r, 0.42, 0.66), len = between(r, 0.7, 1.15), wide = between(r, 0.44, 0.62);
    const y = groundHeight(x, z) + h / 2 - 0.12;
    mats.push({ x, y, z, h, len, wide, rot: between(r, -0.18, 0.18) });
    if(r() < 0.32){
      mats.push({ x, y: y + h / 2, z, h: 0.16, len: len * 0.85, wide: wide + 0.08,
        rot: between(r, -0.3, 0.3) });
    }
    since += 0.78;
    if(since >= 3){ softColliders?.push({ x: WALL_X, z, r: 1.4 }); since = 0; }
  }
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), DRYSTONE(), mats.length);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  mats.forEach((st, i) => {
    e.set(0, st.rot, 0); q.setFromEuler(e);
    m4.compose(new THREE.Vector3(st.x, st.y, st.z), q, new THREE.Vector3(st.wide, st.h, st.len));
    im.setMatrixAt(i, m4);
  });
  im.instanceMatrix.needsUpdate = true;
  im.castShadow = true; im.receiveShadow = true;
  scene.add(im);
  // The stile: three steps up and over the wall where the track comes closest,
  // straddling the line rather than standing beside a hole in it.
  const sy = groundHeight(WALL_X, -60);
  for(const [dx, h] of [[-1.15, 0.4], [0, 0.86], [1.15, 0.4]]){
    box(scene, 1.4, 0.14, 0.46, WALL_X + dx, sy + h, -60, TIMBER());
    for(const sz of [-0.16, 0.16]){
      box(scene, 0.1, h, 0.1, WALL_X + dx, sy + h / 2, -60 + sz, TIMBER());
    }
  }
}

/** 10. Sheep on the moor — the only moving thing between here and the hut. */
function sheep(scene, ctx){
  const { groundHeight, animate, blocked } = ctx;
  const r = rng(0x5eeb01);
  const spots = [[-52, -70], [-58, -96], [-44, -130], [-64, -152], [-48, -184],
                 [-70, -206], [-40, -232], [-60, -258]];
  for(const [bx, bz] of spots){
    const x = bx + between(r, -6, 6), z = bz + between(r, -8, 8);
    if(blocked?.(x, z, 1.4)) continue;
    const y = groundHeight(x, z);
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.rotation.y = between(r, 0, Math.PI * 2);
    box(g, 0.55, 0.52, 1.0, 0, 0.62, 0, FLEECE());
    box(g, 0.3, 0.3, 0.34, 0, 0.72, -0.6, MATERIALS.paintedSteel(0x35302a));
    for(const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]){
      box(g, 0.08, 0.4, 0.08, sx * 0.2, 0.2, sz * 0.34, MATERIALS.paintedSteel(0x35302a));
    }
    scene.add(g);
    animate?.(wander(g, 7, 0.012, between(r, 0, 6)));
  }
}

/** 11. Peat cuttings beside the track: a cut face, stacked turves, a barrow run. */
function peatCuttings(scene, ctx){
  const { groundHeight, softColliders } = ctx;
  const x = -18, z = -120, y = groundHeight(x, z);
  box(scene, 10, 0.9, 22, x, y - 0.35, z, PEAT());
  for(let s = 0; s < 5; s++){
    for(let i = 0; i < 8; i++){
      for(let k = 0; k < 3; k++){
        box(scene, 0.34, 0.16, 0.5,
          x + 6 + s * 1.1, y + 0.1 + k * 0.17, z - 8 + i * 1.2 + (k % 2) * 0.1, PEAT());
      }
    }
  }
  for(let i = 0; i < 14; i++){
    box(scene, 1.1, 0.06, 0.3, x + 3, groundHeight(x + 3, z - 9 + i * 1.4) + 0.05, z - 9 + i * 1.4, TIMBER());
  }
  softColliders?.push({ x: x + 6.5, z, r: 4 });
}

/** 12. Five numbered cairns on the gravity line, at 60 m spacing. */
function cairns(scene, ctx){
  const { groundHeight } = ctx;
  const r = rng(0xca1104);
  for(let i = 0; i < 5; i++){
    const x = -34 - i * 8, z = -50 - i * 58;
    const y = groundHeight(x, z);
    for(let k = 0; k < 9; k++){
      const t = k / 9;
      box(scene, 0.7 - t * 0.5, 0.22, 0.62 - t * 0.42,
        x + between(r, -0.1, 0.1), y + 0.12 + k * 0.2, z + between(r, -0.1, 0.1), DRYSTONE());
    }
    sign(scene, `G${i + 1}`, { x, y: y + 2.3, z, w: 0.7, h: 0.5, facing: 0 });
  }
}

/** 13. Telegraph poles with a real sag, following the track to the hut. */
function telegraph(scene, ctx){
  const { groundHeight } = ctx;
  const pts = [];
  for(let i = 0; i <= 6; i++){
    const x = -26 - i * 5, z = -30 - i * 44;
    pts.push({ x, z, y: groundHeight(x, z) });
  }
  for(const p of pts){
    cyl(scene, 0.14, 7.2, p.x, p.y + 3.6, p.z, TIMBER());
    box(scene, 1.5, 0.1, 0.1, p.x, p.y + 6.9, p.z, TIMBER());
    for(const sx of [-0.6, 0.6]) cyl(scene, 0.05, 0.16, p.x + sx, p.y + 7.05, p.z, MATERIALS.glass());
  }
  // The wire, as segments with a sag, aligned by quaternion.
  //
  // ROTATING A CYLINDER BY EULER ANGLES DOES NOT ALIGN IT. The first cut set
  // `rotation.z` and `rotation.x` from two atan2s, which composes in the wrong
  // order and drew four wires straight across the sky at a steep angle —
  // visible from the whole moor, and nothing like a telegraph line. A unit
  // cylinder points along +Y; the honest way to lay it along an arbitrary
  // vector is to rotate +Y onto it.
  const UP = new THREE.Vector3(0, 1, 0);
  const lay = (p0, p1, m) => {
    const dir = new THREE.Vector3(p1.x - p0.x, p1.y - p0.y, p1.z - p0.z);
    const len = dir.length();
    if(!(len > 0.01)) return;
    const w = cyl(scene, 0.025, len, (p0.x + p1.x) / 2, (p0.y + p1.y) / 2, (p0.z + p1.z) / 2, m);
    w.quaternion.setFromUnitVectors(UP, dir.normalize());
    w.castShadow = false;
  };
  for(let i = 0; i < pts.length - 1; i++){
    const a = pts[i], b = pts[i + 1];
    for(const sx of [-0.6, 0.6]){
      const steps = 4;
      const at = (t) => ({
        x: a.x + (b.x - a.x) * t + sx,
        z: a.z + (b.z - a.z) * t,
        y: a.y + (b.y - a.y) * t + 6.9 - 1.1 * Math.sin(t * Math.PI),
      });
      for(let k = 0; k < steps; k++) lay(at(k / steps), at((k + 1) / steps), MATERIALS.steel());
    }
  }
}

/** 14. The previous winding drum, half-buried off the track. */
function wreckedDrum(scene, ctx){
  const { groundHeight, softColliders } = ctx;
  const x = -8, z = -168, y = groundHeight(x, z);
  const d = cyl(scene, 1.6, 3.2, x, y + 0.5, z, OXIDE());
  d.rotation.z = Math.PI / 2;
  d.rotation.x = 0.22;
  for(const sx of [-1.7, 1.7]){
    cyl(scene, 1.95, 0.16, x + sx, y + 0.5, z, OXIDE()).rotation.z = Math.PI / 2;
  }
  box(scene, 4.4, 0.3, 1.2, x, y + 0.05, z + 2.2, OXIDE());
  softColliders?.push({ x, z, r: 2.4 });
}

/**
 * 15–17. The things that move.
 *
 * The campaign is ABOUT cage motion and nothing on screen moved. The cage runs
 * bank to shaft and back, the sheaves turn while it does, the rope creeps, and
 * the fan house smokes.
 */
function motion(scene, ctx, sheaves){
  const { groundHeight, animate } = ctx;
  const y = groundHeight(SHAFT.x, SHAFT.z);
  const cage = new THREE.Group();
  cage.position.set(SHAFT.x, y + 1.2, SHAFT.z);
  box(cage, 1.5, 2.4, 1.5, 0, 1.2, 0, MATERIALS.paintedSteel(0x7c6a52));
  for(const sy of [0.15, 1.2, 2.25]) box(cage, 1.62, 0.08, 1.62, 0, sy, 0, MATERIALS.steel());
  cyl(cage, 0.05, 2.4, 0, 3.6, 0, MATERIALS.steel());
  scene.add(cage);
  // Up and down the frame, slowly, and it stops at the top for a moment because
  // a cage that never rests reads as a lift in a shopping centre.
  const rest = cage.position.y;
  animate?.((t) => {
    const p = (Math.sin(t * 0.22) + 1) / 2;
    const eased = p < 0.12 ? 0 : (p > 0.88 ? 1 : (p - 0.12) / 0.76);
    cage.position.y = rest + eased * 22;
  });
  if(sheaves) for(const w of sheaves) animate?.((t, dt) => { w.rotation.x += dt * 0.9; });

  // The plume off the fan house, four slow boxes climbing and fading.
  for(let i = 0; i < 4; i++){
    const s = box(scene, 1.2 + i * 0.5, 1.0 + i * 0.4, 1.2 + i * 0.5,
      -14, groundHeight(-14, -22) + 4.2 + i * 1.6, -22 - i * 0.6,
      mat(`kerrow.steam${i}`, () => new THREE.MeshBasicMaterial({
        color: 0xd8dcda, transparent: true, opacity: 0.16 - i * 0.03 })));
    animate?.(sway(s, 'z', 0.06, 0.3 + i * 0.05, i));
    animate?.(bob(s, 0.25, 0.2 + i * 0.04, i * 1.3));
  }
}

/**
 * 18–19. The two things the campaign changes.
 *
 * The shift board gains a slip per mission — the bible's own "every completed
 * stop slip stays in the log" — and on the last day the passenger gate opens,
 * which is the campaign's whole point arriving in the world.
 */
function campaignState(scene, ctx){
  const { groundHeight, stateHooks, colliders } = ctx;
  // The board outside the Bank. Twelve slips, hidden until their day.
  const bx = -9, bz = 6, by = groundHeight(bx, bz);
  for(const sx of [-1.4, 1.4]) box(scene, 0.1, 2.2, 0.1, bx + sx, by + 1.1, bz, TIMBER());
  const face = box(scene, 3.2, 1.5, 0.08, bx, by + 1.7, bz, TIMBER());
  face.receiveShadow = true;
  const slips = [];
  for(let i = 0; i < 12; i++){
    const s = box(scene, 0.42, 0.3, 0.02, bx - 1.25 + (i % 6) * 0.5, by + 2.1 - Math.floor(i / 6) * 0.42,
      bz + 0.06, mat('kerrow.slip', () => new THREE.MeshStandardMaterial({
        color: 0xe8e2d2, roughness: 0.95, metalness: 0 })));
    s.rotation.z = (i % 3 - 1) * 0.05;
    s.visible = false;
    slips.push(s);
  }
  sign(scene, 'SHIFT BOARD', { x: bx, y: by + 2.75, z: bz, w: 2.4, h: 0.5, facing: 0 });

  // The passenger gate: shut and chained for eleven days.
  const gx = 0, gz = 16, gy = groundHeight(gx, gz);
  fenceRun(scene, { x0: -7, z0: 16, x1: -2.2, z1: 16, y: gy, height: 2.2 });
  fenceRun(scene, { x0: 2.2, z0: 16, x1: 7, z1: 16, y: gy, height: 2.2 });
  const leaf = new THREE.Group();
  leaf.position.set(-2.2, gy, gz);
  for(let i = 0; i < 5; i++) box(leaf, 0.06, 2.0, 0.06, i * 1.05, 1.0, 0, MATERIALS.steel());
  box(leaf, 4.4, 0.07, 0.07, 2.2, 1.9, 0, MATERIALS.steel());
  box(leaf, 4.4, 0.07, 0.07, 2.2, 0.5, 0, MATERIALS.steel());
  scene.add(leaf);
  const gateCollider = solid(colliders, gx, gz, gy, 2.4, 2.2);
  const shut = gateCollider.clone();

  stateHooks?.push((state) => {
    const day = Math.max(1, state?.week ?? 1);
    slips.forEach((s, i) => { s.visible = i < day - 1; });
    // Open on the last day, and the collider goes with it: a gate that swings
    // and still blocks is the door defect this repo has already paid for.
    const open = day >= 12;
    leaf.rotation.y = open ? -1.25 : 0;
    // A gate that swings and still blocks is the door defect this repo has
    // already paid for once. The box is emptied rather than moved.
    if(open) gateCollider.makeEmpty();
    else gateCollider.copy(shut);
  });
}

export function fitOutRoom(){}
export function fitOutSpine(){}
