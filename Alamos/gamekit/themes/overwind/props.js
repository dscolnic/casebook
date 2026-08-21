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
import { MATERIALS, box, cyl } from '../../engine/world/kit.js';

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
  for(const sx of [-1.1, 1.1]){
    const wheel = cyl(g, 2.6, 0.34, sx, SHAFT.h + 1.4, 0, OXIDE());
    wheel.rotation.z = Math.PI / 2;
    cyl(g, 0.6, 0.4, sx, SHAFT.h + 1.4, 0, m).rotation.z = Math.PI / 2;
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

  headframe(scene, at(SHAFT.x, SHAFT.z), ctx);
  drum(scene, ctx);
  ropeRun(scene, ctx);
  conveyor(scene, ctx);

  // The bins under the tip, and the two sheared bolts' worth of steel frame.
  for(const [x, z] of [[30, -22], [38, -22]]){
    const y = at(x, z);
    box(scene, 4.4, 3.2, 4.4, x, y + 1.6, z, MATERIALS.paintedSteel(0x6f6a5c));
    box(scene, 5.0, 0.3, 5.0, x, y + 3.3, z, STEEL());
  }

  // The gravity station's pillar, which is the whole instrument as far as the
  // survey is concerned: concrete to bedrock, and a brass plate on top.
  const gx = -70, gz = -283, gy = at(gx, gz);
  cyl(scene, 0.45, 1.1, gx, gy + 0.55, gz, MATERIALS.concrete());
  cyl(scene, 0.16, 0.06, gx, gy + 1.13, gz, MATERIALS.paintedSteel(0xb08a3a));
}

export function fitOutRoom(){}
export function fitOutSpine(){}
