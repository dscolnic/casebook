// props.js — the objects that make this mesa Los Alamos in 1943.
//
// The engine builds the ground, the roads, the pond, the nineteen buildings and
// the sky from site.js. What is here is everything that is *this place*: the Tech
// Area wire and its guard towers, the water tank, catenary power lines, coal
// bins, laundry lines, duckboard walks, jeeps, bicycles, the Ponderosa forest,
// and the road lighting.
//
// Most of it is not new code. `legacy/props.js` and `legacy/env.js` already built these
// well, and a migration that reinvented them would have thrown away the only part
// of the old world worth keeping. This file is the seam: it calls those, hands the
// engine their colliders, and adds the handful of things the town was missing.
//
// One deliberate change on the way across. The old road lighting was six
// `PointLight`s that switched on at dusk, which put the scene at eight real
// lights against a contract ceiling of six. The poles, shades and bulbs are
// unchanged; the bulbs are emissive and registered as light panels, which is how
// every other game on this engine lights a night scene.
import * as THREE from 'three';
import {
  MATERIALS, box, cyl, post, sign, fenceRun, crateStack,
  bicycleRack, BICYCLE_DRIVE, clearSpot,
} from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { sway, bob } from '../../engine/world/animators.js';
import { driveable } from '../../engine/world/driving.js';
import { buildProps } from './legacy/props.js';
import { plantTrees, srand, srandRange } from './legacy/env.js';

/** Where the road lamps stand. Unchanged from the hand-built world. */
const LAMPS = [[-24, 19.2], [4, 19.2], [26, 19.2], [17.6, 50], [17.6, 80], [-48, -20]];

export function decorate(scene, ctx){
  const { groundHeight, colliders, softColliders, interactables, lightPanels } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const soft = (s) => { if(s) softColliders.push(s); };
  const glow = (m) => { if(m) lightPanels?.push(m); };

  // ------------------------------------------------------------ road lighting
  // Bare bulbs on wooden poles along the two main roads. Emissive, not real
  // lights: see the header.
  for(const [x, z] of LAMPS){
    const gy = y(x, z);
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.14, 4.6, 7),
      new THREE.MeshStandardMaterial({ color: 0x4a3a2a, roughness: 0.94 }));
    pole.position.set(x, gy + 2.3, z);
    pole.castShadow = true;
    scene.add(pole);
    const shade = new THREE.Mesh(
      new THREE.ConeGeometry(0.44, 0.3, 12, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x2e2e2c, side: THREE.DoubleSide,
        roughness: 0.6, metalness: 0.3 }));
    shade.position.set(x, gy + 4.62, z);
    scene.add(shade);
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 10, 8),
      new THREE.MeshStandardMaterial({ color: 0xffe0b0, emissive: 0xffc272,
        emissiveIntensity: 1.2, roughness: 0.5 }));
    bulb.position.set(x, gy + 4.4, z);
    scene.add(bulb);
    glow(bulb);
    soft({ x, z, r: 0.4 });
  }

  // ----------------------------------------- the town's own props, as they were
  // Wire, guard towers, water tank, power lines, coal bins, laundry, duckboards,
  // jeeps, bicycles, fire barrels. `buildProps` owns its own geometry and hands
  // back the collision it wants registered; the jeeps come back separately
  // because `driveable` owns theirs.
  const built = buildProps(scene);
  (built.hard ?? []).forEach(b => colliders.push(b));
  (built.soft ?? []).forEach(c => softColliders.push(c));
  for(const v of built.driveables ?? []){
    driveable(scene, v.group, { ...v, colliders, interactables, topSpeed: 13 });
  }

  // Is this spot inside something? Reads `colliders` at call time, so it is
  // declared once here and used by both the bicycle rack below and the forest
  // further down — the trees are planted last and see everything.
  const isBlocked = (x, z, pad = 2) => colliders.some(b =>
    x > b.min.x - pad && x < b.max.x + pad && z > b.min.z - pad && z < b.max.z + pad);

  // ------------------------------------------------------------ the bicycles
  //
  // The Hill's second vehicle, and by numbers its first. Motor transport on the
  // mesa was Army-issue and signed for; a bicycle was how a physicist got from
  // the Sundt apartments to T Building before eight, and `buildProps` already
  // draws eight of them leaning on walls. Those stay as they are — a leaning
  // bicycle is scenery and reads as one — and these are the rack outside Fuller
  // Lodge, upright, which anybody may take.
  //
  // The site is 170 m across and the jeeps are parked at the motor pool at the
  // north end, so on most mornings the bicycle is the faster of the two: it is
  // where you are, and the jeep is a walk away in the wrong direction.
  const spot = clearSpot({ x: -6, z: -22 }, isBlocked, {
    // The spawn is at (0, 14) and the road runs through it.
    pad: 2.4, avoid: [{ x: 0, z: 14, r: 12 }],
  });
  const { rail, bicycles } = bicycleRack(scene, spot.x, spot.z, y(spot.x, spot.z), {
    facing: 0,
    list: [
      { colour: 0x2c3a44, basket: true },
      { colour: 0x6b3a2c, basket: true },
      { colour: 0x3c4a34, basket: false },
      { colour: 0x44404a, basket: false },
    ],
  });
  if(rail.soft) softColliders.push(rail.soft);
  bicycles.forEach((b, i) => {
    driveable(scene, b.group, {
      ...BICYCLE_DRIVE,
      id: `BIKE_LODGE_${i + 1}`, label: 'bicycle', kind: 'bicycle', verb: 'Ride',
      wheels: b.wheels, steer: b.steer, ignore: b.ignore,
      colliders, interactables,
    });
  });

  // -------------------------------------------------------- the Ponderosa forest
  // Thinned in town, dense to the rim. It reads the colliders that already exist,
  // so it has to be planted after everything above.
  // ---- the dressing pass. Before the forest, because the trees read the
  // colliders that exist when they are planted and must not grow through a tent.
  // See gamekit/DRESSING_PASS.md; the numbers are its list.
  tentRow(scene, ctx);          // 1
  buildSite(scene, ctx);        // 2
  freightYard(scene, ctx);      // 3
  checkpoint(scene, ctx);       // 4
  market(scene, ctx);           // 6, and M8's permits
  queues(scene, ctx);           // 7
  hoardings(scene, ctx);        // 8
  pondLife(scene, ctx);         // 9
  lodgePorch(scene, ctx);       // 10
  windbreak(scene, ctx);        // 11
  approachDust(scene, ctx);     // 12
  campaignStreet(scene, ctx);   // 13–19

  plantTrees(scene, isBlocked).forEach(c => softColliders.push(c));

  // ============================================ what the town was still missing
  //
  // Five things, not the nine I first listed: duckboards, the Tech Area wire and
  // its gate, the motor pool, the power poles and the water tank were all already
  // here in src/props.js. Reading site.js alone made this town look emptier than
  // it is.

  // --------------------------------------------------------- the boiler house
  // Every building on the mesa was coal-heated and the coal bins were already
  // modelled, but nothing burned it. A boiler house with a stack gives the site
  // its one plume of smoke and its second tall object.
  {
    const bx = -60, bz = 52, bY = y(bx, bz);
    box(scene, 12, 4.4, 8, bx, bY + 2.2, bz, MATERIALS.concrete());
    box(scene, 12.6, 0.4, 8.6, bx, bY + 4.6, bz, MATERIALS.paintedSteel(0x4b453c));
    cyl(scene, 0.9, 16, bx + 4.2, bY + 8, bz - 2.6, MATERIALS.paintedSteel(0x3a3630));
    // Smoke, as three stacked translucent slabs leaning downwind. No particles.
    for(let i = 0; i < 3; i++){
      box(scene, 2.2 + i * 1.4, 1.6, 2.2 + i * 1.4,
        bx + 4.2 + i * 2.2, bY + 17 + i * 2.2, bz - 2.6 - i * 1.2, MATERIALS.glass());
    }
    // The coal pile it burns, and a scraped apron in front of the doors.
    soft(crateStack(scene, bx - 8, bz + 2, y(bx - 8, bz + 2), { rows: 2, colour: 0x2f2b28 }));
    box(scene, 9, 0.12, 6, bx, bY + 0.06, bz + 7.4, MATERIALS.concrete());
    sign(scene, 'BOILER HOUSE', { x: bx, z: bz - 4.2, y: bY + 3.2, w: 4.4, h: 1.1, facing: 0 });
    soft({ x: bx, z: bz, r: 7.4 });
  }

  // ---------------------------------------------------------- Morganville
  // Housing ran out and staff lived in trailers. The Sundt rows and the hutments
  // were already here; this is the overflow, west of the dorms, with the laundry
  // that goes with it.
  {
    for(let i = 0; i < 6; i++){
      const tx = -98 + (i % 3) * 8.5, tz = 8 + Math.floor(i / 3) * 7;
      const tY = y(tx, tz);
      box(scene, 6.0, 2.3, 2.5, tx, tY + 1.6, tz, MATERIALS.panel());
      box(scene, 6.2, 0.28, 2.7, tx, tY + 2.85, tz, MATERIALS.paintedSteel(0x9a9083));
      box(scene, 0.28, 0.85, 0.28, tx - 2.6, tY + 0.42, tz, MATERIALS.steel());
      // A stovepipe each, because these were heated the same way as everything else.
      cyl(scene, 0.1, 1.4, tx + 1.8, tY + 3.4, tz, MATERIALS.paintedSteel(0x3a3630));
      soft({ x: tx, z: tz, r: 3.4 });
    }
    // A shared standpipe: trailers had no plumbing.
    const sx = -90, sz = 18;
    cyl(scene, 0.09, 1.5, sx, y(sx, sz) + 0.75, sz, MATERIALS.steel());
    box(scene, 1.4, 0.14, 1.4, sx, y(sx, sz) + 0.07, sz, MATERIALS.concrete());
    soft({ x: sx, z: sz, r: 0.9 });
  }

  // ---------------------------------------------------------- the canyon edge
  // The mesa stops. site.js has said so since the flip — there is a rim radius
  // in the profile — and nothing marked it, so the Hill read as a field. A
  // guard rail of posts and cable along the drop, a warning board, and the
  // pines thinning to nothing beyond it.
  {
    const R = 96;
    for(let i = 0; i < 46; i++){
      const a = -0.9 + (i / 45) * 2.1;              // the east and south-east rim
      const x = Math.cos(a) * R, z = Math.sin(a) * R;
      const gy = y(x, z);
      post(scene, x, z, gy, 1.0, 0.07, 0x6b6153);
      if(i % 2 === 0){
        const a2 = -0.9 + ((i + 1) / 45) * 2.1;
        const x2 = Math.cos(a2) * R, z2 = Math.sin(a2) * R;
        const mx = (x + x2) / 2, mz = (z + z2) / 2;
        box(scene, Math.hypot(x2 - x, z2 - z), 0.06, 0.06, mx, y(mx, mz) + 0.85, mz,
          MATERIALS.paintedSteel(0x4f4740), Math.atan2(z2 - z, x2 - x));
      }
    }
    const sx = Math.cos(0.2) * (R - 5), sz = Math.sin(0.2) * (R - 5);
    sign(scene, 'CANYON EDGE', { x: sx, z: sz, y: y(sx, sz) + 2.2, facing: 0.2 + Math.PI,
      sub: 'No vehicles past the rail', accent: 0xb0762a });
  }

  // ------------------------------------------------- the East Gate road, leaving
  // The only way in or out, and the strongest continuation edge available: a road
  // that visibly drops off the mesa rather than stopping at the edge of the map.
  // Runs from the existing gate road north past the player's bound at 105.
  {
    const rail = MATERIALS.paintedSteel(0x8a8375);
    for(let i = 0; i < 16; i++){
      const rz = 96 + i * 11;
      const rx = 16 + Math.sin(i * 0.42) * 9;      // the switchback starting to bend
      const rY = y(rx, rz);
      // Guard posts down the outside of the bend, which is what reads at distance.
      cyl(scene, 0.08, 1.0, rx + 6.5, rY + 0.5, rz, rail);
      if(i % 2 === 0) box(scene, 13, 0.05, 8, rx, rY + 0.03, rz, MATERIALS.concrete());
    }
    sign(scene, 'EAST GATE', { x: 16, z: 100, y: y(16, 100) + 2.2, w: 4.6, h: 1.2,
      facing: 0, sub: 'Santa Fe 35 miles · badge required', accent: 0x8a2d22 });
  }

  // ------------------------------------------------- the icehouse by the pond
  // The Ranch School's stone icehouse, which is why the pond was dammed in the
  // first place — ice was cut from it. A pre-war object among wartime huts, and
  // the only stone building on the mesa.
  {
    const ix = -18, iz = -20, iY = y(ix, iz);
    box(scene, 6.5, 3.2, 5.0, ix, iY + 1.6, iz, MATERIALS.concrete());
    // A low stone-ish plinth and a shingled pitch, kept dark against the huts.
    box(scene, 7.1, 0.5, 5.6, ix, iY + 0.25, iz, MATERIALS.concrete());
    box(scene, 7.0, 0.3, 5.4, ix, iY + 3.3, iz, MATERIALS.paintedSteel(0x4a4038));
    box(scene, 1.1, 2.0, 0.14, ix, iY + 1.0, iz + 2.55, MATERIALS.paintedSteel(0x3b3229));
    soft({ x: ix, z: iz, r: 4.4 });
  }

  // ------------------------------------- the mail drop and the commissary queue
  // Mail was censored and goods were rationed: two facts of daily life on the
  // Hill that no object in the town said out loud. A locked drop box outside the
  // PX, and the rope-and-stanchion line that formed beside it.
  {
    const px = 58, pz = 24;                          // the Post Exchange
    const mx = px - 8, mz = pz - 6, mY = y(mx, mz);
    box(scene, 0.8, 1.2, 0.6, mx, mY + 0.6, mz, MATERIALS.paintedSteel(0x2f4a3a));
    box(scene, 0.9, 0.14, 0.7, mx, mY + 1.27, mz, MATERIALS.paintedSteel(0x24382c));
    sign(scene, 'MAIL — SUBJECT TO CENSORSHIP', {
      x: mx, z: mz - 0.4, y: mY + 1.9, w: 3.0, h: 0.8, facing: 0, accent: 0x8a2d22 });
    soft({ x: mx, z: mz, r: 0.8 });
    // The queue: eight stanchions with a rope between, doubling back once.
    const line = [];
    for(let i = 0; i < 8; i++) line.push([px - 5 + (i % 4) * 2.2, pz - 12 + Math.floor(i / 4) * 2.4]);
    line.forEach(([qx, qz], i) => {
      soft(post(scene, qx, qz, y(qx, qz), 1.0, 0.05, 0x8f8778));
      const nxt = line[i + 1];
      if(!nxt || Math.floor(i / 4) !== Math.floor((i + 1) / 4)) return;
      const mx2 = (qx + nxt[0]) / 2, mz2 = (qz + nxt[1]) / 2;
      box(scene, 0.04, 0.04, Math.hypot(nxt[0] - qx, nxt[1] - qz),
        mx2, y(mx2, mz2) + 0.92, mz2, MATERIALS.paintedSteel(0x6f665a),
        Math.atan2(nxt[0] - qx, nxt[1] - qz));
    });
  }

  // --------------------------------------------------------------- the scatter
  // Stones and cut stumps, which came across from the old world file: the Ranch
  // School and then the Army cleared this ground, and the stumps are the evidence.
  {
    const stoneGeo = new THREE.DodecahedronGeometry(0.4, 0);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xa39880, roughness: 0.94 });
    const stones = [];
    for(let i = 0; i < 90; i++){
      const a = srand() * Math.PI * 2, r = srandRange(24, 120);
      const sx2 = Math.cos(a) * r, sz2 = Math.sin(a) * r;
      if(Math.abs(sx2) > 100 || Math.abs(sz2) > 100) continue;
      stones.push({ x: sx2, z: sz2, s: srandRange(0.4, 1.5) });
    }
    const inst = new THREE.InstancedMesh(stoneGeo, stoneMat, stones.length);
    inst.castShadow = true; inst.receiveShadow = true;
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
    stones.forEach((p, i) => {
      e.set(srand() * 3, srand() * 3, srand() * 3); q.setFromEuler(e);
      m4.compose(new THREE.Vector3(p.x, y(p.x, p.z) + 0.12 * p.s, p.z), q,
        new THREE.Vector3(p.s, p.s * 0.7, p.s));
      inst.setMatrixAt(i, m4);
    });
    inst.instanceMatrix.needsUpdate = true;
    scene.add(inst);
  }

  void fenceRun;
}

export default decorate;

// ============================================================ the dressing
//
// The bible forbids moving a building — "no new building or changed road is
// authorized by this bible" — so everything here is BETWEEN them. What was
// missing is the boom itself: a town six weeks into a mineral rush, with the
// same nineteen buildings and none of the pressure on them. See
// gamekit/DRESSING_PASS.md; the numbers below are its list.
//
// Placers take `(x, z, y)`, ground last. `colliders` outdoors is an array of
// `THREE.Box3` and `softColliders` is `{x, z, r}` — pushing the second into the
// first throws on the first ray `reachable.mjs` casts, several checks later.

/** Deterministic jitter of our own. */
function rngB(seed){
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
const betweenB = (r, a, b) => a + r() * (b - a);

/** A hard collider in the outdoor world's own shape. */
function solidAt(colliders, x, z, y, r, h = 2.4){
  const b = new THREE.Box3(new THREE.Vector3(x - r, y, z - r),
                           new THREE.Vector3(x + r, y + h, z + r));
  colliders?.push(b);
  return b;
}
const CANVAS = () => mat('boom.canvas', () => new THREE.MeshStandardMaterial({
  color: 0x8a8370, roughness: 0.95, metalness: 0, envMapIntensity: 0.4 }));
const LUMBER = () => mat('boom.lumber', () => new THREE.MeshStandardMaterial({
  color: 0xa8926a, roughness: 0.92, metalness: 0, envMapIntensity: 0.45 }));
const PLY = () => mat('boom.ply', () => new THREE.MeshStandardMaterial({
  color: 0x8d7550, roughness: 0.94, metalness: 0, envMapIntensity: 0.42 }));
const TARP = () => mat('boom.tarp', () => new THREE.MeshStandardMaterial({
  color: 0x2f5f6d, roughness: 0.7, metalness: 0.05, envMapIntensity: 0.6 }));
const PAPER = () => mat('boom.paper', () => new THREE.MeshStandardMaterial({
  color: 0xe4dccb, roughness: 0.95, metalness: 0 }));

/**
 * 1. The tent and trailer row — the housing shortage, which is the campaign's
 *    own argument and was nowhere on the ground.
 *
 * West of the existing six trailers, in two ragged lines with washing between
 * them. A boom town's first building material is canvas.
 */
function tentRow(scene, ctx){
  const { groundHeight, colliders, softColliders } = ctx;
  const r = rngB(0x7e21a1);
  for(let i = 0; i < 12; i++){
    const row = i % 2;
    // WEST OF THE BARRACKS, not through them. The first row ran x = -92/-83
    // and the barracks stand at (-76, 26) 16 x 9, so half the tents were inside
    // a building — which renders perfectly and is house rule 8.
    const x = -108 + row * 9 + betweenB(r, -1.2, 1.2);
    const z = 6 + Math.floor(i / 2) * 8 + betweenB(r, -1.4, 1.4);
    const y = groundHeight(x, z);
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.rotation.y = betweenB(r, -0.2, 0.2);
    // A RIDGE TENT, WITH THE SLOPE ACTUALLY SOLVED. The first cut put two
    // 2.9 m panels at ±0.95 and tilted them 0.62 rad, which is neither the
    // width nor the angle the ridge needs: the faces missed each other and the
    // row rendered as leaning slabs. A face runs from the eave (±w, 0) to the
    // ridge (0, h), so its length is hypot(w, h) and its tilt is atan2(w, h).
    const w = 1.05, h = 2.0;
    const slope = Math.hypot(w, h), tilt = Math.atan2(w, h);
    for(const sx of [-1, 1]){
      const face = box(g, 0.05, slope, 4.6, sx * w / 2, h / 2, 0, CANVAS());
      face.rotation.z = sx * tilt;
    }
    box(g, 0.12, 0.12, 4.7, 0, h, 0, LUMBER());
    // The ends, as two triangles' worth of panel each.
    for(const sz of [-1, 1]){
      for(const sx of [-1, 1]){
        const end = box(g, w, h * 0.9, 0.05, sx * w / 2.6, h * 0.45, sz * 2.3, CANVAS());
        end.rotation.z = sx * tilt * 0.5;
      }
    }
    // Guy lines to the ground, which is what makes it read as canvas.
    for(const sz of [-1, 1]){
      for(const sx of [-1, 1]){
        const guy = cyl(g, 0.02, 2.4, sx * 1.5, 0.9, sz * 2.6, MATERIALS.steel());
        guy.rotation.z = sx * 0.55;
        guy.rotation.x = -sz * 0.45;
      }
    }
    scene.add(g);
    solidAt(colliders, x, z, y, 1.6, 2.2);
    // A crate and a bucket outside each one, which is what makes it lived in.
    crateStack(scene, x + 1.9, z + 1.6, groundHeight(x + 1.9, z + 1.6), { count: 1 + (i % 2) });
    softColliders?.push({ x: x + 1.9, z: z + 1.6, r: 0.9 });
  }
  // Washing lines between the rows, with sheets on them.
  for(let k = 0; k < 4; k++){
    const z = 12 + k * 14;
    const y0 = groundHeight(-102, z);
    for(const x of [-108, -96]) cyl(scene, 0.07, 2.6, x, y0 + 1.3, z, LUMBER());
    const line = cyl(scene, 0.02, 12, -102, y0 + 2.5, z, MATERIALS.steel());
    line.rotation.z = Math.PI / 2;
    for(let i = 0; i < 5; i++){
      const sh = box(scene, 0.03, 1.0, 0.75, -107 + i * 2.4, y0 + 1.95, z, CANVAS());
      ctx.animate?.(sway(sh, 'x', 0.16, 0.6 + i * 0.1, i));
    }
  }
  // A standpipe with a queue's worth of buckets at it.
  const sx2 = -94, sz2 = 30, sy2 = groundHeight(sx2, sz2);
  cyl(scene, 0.09, 1.5, sx2, sy2 + 0.75, sz2, MATERIALS.steel());
  box(scene, 0.5, 0.12, 0.5, sx2, sy2 + 0.06, sz2, MATERIALS.concrete());
  for(let i = 0; i < 5; i++){
    cyl(scene, 0.16, 0.3, sx2 + 0.7 + i * 0.42, sy2 + 0.15, sz2 + (i % 2) * 0.4,
      MATERIALS.paintedSteel(0x8a8f92));
  }
}

/**
 * 2. The construction site at the P compound — a town that is building, in a
 *    campaign about who pays for it.
 */
function buildSite(scene, ctx){
  const { groundHeight, colliders, softColliders, animate } = ctx;
  const bx = -48, bz = 2, by = groundHeight(bx, bz);
  // The slab and the stud walls standing on it.
  const slab = box(scene, 14, 0.24, 10, bx, by + 0.12, bz, MATERIALS.concrete());
  slab.receiveShadow = true;
  for(let i = 0; i <= 12; i++){
    const x = bx - 6.5 + i * 1.08;
    box(scene, 0.12, 2.6, 0.12, x, by + 1.5, bz - 4.8, LUMBER());
    if(i < 7) box(scene, 0.12, 2.6, 0.12, bx - 6.5, by + 1.5, bz - 4.8 + i * 1.6, LUMBER());
  }
  box(scene, 14, 0.14, 0.14, bx, by + 2.8, bz - 4.8, LUMBER());
  box(scene, 0.14, 0.14, 9.6, bx - 6.5, by + 2.8, bz, LUMBER());
  solidAt(colliders, bx, bz, by, 5.2, 2.8);
  // The lumber stack, the mixer, the toilet, and a sheet that moves.
  for(let k = 0; k < 5; k++){
    for(let i = 0; i < 6; i++){
      box(scene, 4.2, 0.14, 0.2, bx + 9, by + 0.2 + k * 0.16, bz - 2 + i * 0.24, LUMBER());
    }
  }
  softColliders?.push({ x: bx + 9, z: bz - 1, r: 2.6 });
  const mx = bx + 8, mz = bz + 5;
  const my = groundHeight(mx, mz);
  cyl(scene, 0.7, 1.1, mx, my + 0.9, mz, MATERIALS.paintedSteel(0xc4a12e));
  for(const sx of [-0.5, 0.5]) box(scene, 0.1, 0.9, 0.1, mx + sx, my + 0.45, mz, MATERIALS.steel());
  const loo = box(scene, 1.1, 2.2, 1.1, bx - 9, groundHeight(bx - 9, bz + 4) + 1.1, bz + 4,
    MATERIALS.paintedSteel(0x3f7a52));
  softColliders?.push({ x: bx - 9, z: bz + 4, r: 0.9 });
  const sheet = box(scene, 0.04, 2.4, 3.2, bx + 6.6, by + 1.4, bz + 3, TARP());
  animate?.(sway(sheet, 'z', 0.09, 0.9));
  // A ladder up to the plate, because a frame with no way up reads as a model.
  const lad = new THREE.Group();
  lad.position.set(bx + 2, by, bz - 4.4);
  for(const sz of [-0.22, 0.22]) box(lad, 0.07, 3.4, 0.07, 0, 1.7, sz, LUMBER());
  for(let i = 0; i < 8; i++) box(lad, 0.06, 0.05, 0.5, 0, 0.4 + i * 0.4, 0, LUMBER());
  lad.rotation.x = 0.16;
  scene.add(lad);
}

/**
 * 3. The freight yard at E — the freight agreement is the campaign's spine and
 *    the compound was bare ground.
 */
function freightYard(scene, ctx){
  const { groundHeight, colliders, softColliders } = ctx;
  // CLEAR OF THE DOOR. The first cut put the bays across (32, 34), which is
  // where the Ordnance & Engineering door is, and walled the stop off — the
  // exact failure house rule 8 is about, found by `reachable.mjs` rather than
  // by looking. The yard sits east of the compound now and the approach from
  // the road is open.
  const ox = 48, oz = 36;
  const r = rngB(0x3ee101);
  // Painted bay numbers, and pallets stacked in them.
  for(let bay = 0; bay < 4; bay++){
    const x = ox - 9 + bay * 6, z = oz;
    const y = groundHeight(x, z);
    box(scene, 5.2, 0.04, 8, x, y + 0.03, z, MATERIALS.paintedSteel(0x6d685e));
    box(scene, 0.16, 0.05, 8, x - 2.7, y + 0.05, z, MATERIALS.paintedSteel(0xc9b23c));
    for(let k = 0; k < 2 + (bay % 3); k++){
      const px = x + betweenB(r, -1.2, 1.2), pz = z + betweenB(r, -2.6, 2.6);
      const py = groundHeight(px, pz);
      for(let s = 0; s < 3; s++){
        box(scene, 1.15, 0.14, 1.0, px, py + 0.1 + s * 0.44, pz, LUMBER());
        box(scene, 1.05, 0.3, 0.9, px, py + 0.31 + s * 0.44, pz, TARP());
      }
      softColliders?.push({ x: px, z: pz, r: 0.9 });
    }
  }
  // A container, which is the one silhouette a yard needs.
  const cx = ox + 10, cz = oz + 8, cy = groundHeight(cx, cz);
  box(scene, 6.1, 2.6, 2.5, cx, cy + 1.3, cz, MATERIALS.paintedSteel(0x2f6ea0));
  for(let i = 0; i < 14; i++){
    box(scene, 0.06, 2.4, 0.08, cx - 3 + i * 0.44, cy + 1.3, cz + 1.28,
      MATERIALS.paintedSteel(0x28618d));
  }
  solidAt(colliders, cx, cz, cy, 3.1, 2.6);
  // The forklift.
  const fx = ox - 2, fz = oz + 10, fy = groundHeight(fx, fz);
  const fk = new THREE.Group();
  fk.position.set(fx, fy, fz);
  box(fk, 1.9, 1.1, 1.3, 0, 0.75, 0, MATERIALS.paintedSteel(0xc9a12b));
  box(fk, 0.9, 1.0, 1.1, -0.3, 1.7, 0, MATERIALS.paintedSteel(0x3a3a38));
  for(const sz of [-0.5, 0.5]) box(fk, 0.1, 2.6, 0.1, 1.05, 1.3, sz, MATERIALS.steel());
  for(const sz of [-0.4, 0.4]) box(fk, 1.0, 0.07, 0.14, 1.5, 0.12, sz, MATERIALS.steel());
  for(const [dx, dz] of [[-0.7, -0.62], [-0.7, 0.62], [0.7, -0.62], [0.7, 0.62]]){
    cyl(fk, 0.3, 0.24, dx, 0.3, dz, MATERIALS.rubber?.() ?? MATERIALS.paintedSteel(0x24262a))
      .rotation.z = Math.PI / 2;
  }
  scene.add(fk);
  softColliders?.push({ x: fx, z: fz, r: 1.6 });
}

/** 4. The delivery checkpoint at the gatehouse: barrier, desk, three trucks. */
function checkpoint(scene, ctx){
  const { groundHeight, softColliders, animate } = ctx;
  const gx = 27, gz = 82, gy = groundHeight(gx, gz);
  cyl(scene, 0.12, 1.2, gx - 3, gy + 0.6, gz, MATERIALS.paintedSteel(0xd8d2c4));
  const arm = box(scene, 6.4, 0.16, 0.16, gx, gy + 1.15, gz, MATERIALS.paintedSteel(0xc4342a));
  arm.position.x = gx;
  for(let i = 0; i < 6; i++){
    box(scene, 0.5, 0.17, 0.17, gx - 2.8 + i * 1.1, gy + 1.15, gz,
      MATERIALS.paintedSteel(i % 2 ? 0xe8e4da : 0xc4342a));
  }
  animate?.(sway(arm, 'z', 0.03, 0.25));
  const dx = gx + 5, dz = gz + 2, dy = groundHeight(dx, dz);
  box(scene, 1.6, 0.1, 0.8, dx, dy + 0.9, dz, LUMBER());
  for(const sx of [-0.7, 0.7]) box(scene, 0.09, 0.9, 0.09, dx + sx, dy + 0.45, dz, LUMBER());
  box(scene, 0.34, 0.02, 0.26, dx, dy + 0.96, dz, PAPER());
  softColliders?.push({ x: dx, z: dz, r: 1.1 });
  sign(scene, 'DELIVERIES', { x: gx - 3, y: gy + 2.2, z: gz, w: 2.6, h: 0.6,
    facing: Math.PI, sub: 'REPORT HERE' });
}

/**
 * 6. Market stalls outside the store, with a chalk price board that the
 *    campaign rewrites. Two of the six are held back for mission 8's permits.
 */
function market(scene, ctx){
  const { groundHeight, softColliders, animate, stateHooks } = ctx;
  const ox = 52, oz = 20;
  const later = [];
  for(let i = 0; i < 6; i++){
    const x = ox + (i % 3) * 4.2, z = oz + Math.floor(i / 3) * 5.0;
    const y = groundHeight(x, z);
    const g = new THREE.Group();
    g.position.set(x, y, z);
    box(g, 2.4, 0.1, 1.1, 0, 0.92, 0, LUMBER());
    for(const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]){
      box(g, 0.08, 0.9, 0.08, sx * 1.1, 0.45, sz * 0.48, LUMBER());
      box(g, 0.07, 2.1, 0.07, sx * 1.15, 1.05, sz * 0.52, LUMBER());
    }
    const awn = box(g, 2.7, 0.05, 1.5, 0, 2.15, 0, i % 2 ? TARP() : CANVAS());
    awn.rotation.x = 0.1;
    for(let k = 0; k < 3; k++){
      box(g, 0.5, 0.28, 0.4, -0.7 + k * 0.7, 1.12, 0, LUMBER());
    }
    animate?.(sway(awn, 'z', 0.03, 0.7, i));
    scene.add(g);
    softColliders?.push({ x, z, r: 1.5 });
    if(i >= 4){ g.visible = false; later.push(g); }
  }
  // The price board: a canvas texture repainted per mission, the same mechanism
  // the delivery board already uses.
  const bx = ox - 3.6, bz = oz + 2, by = groundHeight(bx, bz);
  for(const sx of [-0.8, 0.8]) box(scene, 0.09, 2.0, 0.09, bx + sx, by + 1.0, bz, LUMBER());
  const face = box(scene, 1.9, 1.2, 0.06, bx, by + 1.6, bz, mat('boom.slate',
    () => new THREE.MeshStandardMaterial({ color: 0x2b3130, roughness: 0.95, metalness: 0 })));
  const chalk = [];
  for(let i = 0; i < 5; i++){
    chalk.push(box(scene, 1.4 - (i % 2) * 0.4, 0.07, 0.02, bx - 0.1, by + 2.05 - i * 0.22, bz + 0.04,
      mat('boom.chalk', () => new THREE.MeshStandardMaterial({
        color: 0xd8d4c4, roughness: 1, metalness: 0 }))));
  }
  stateHooks?.push((state) => {
    const day = Math.max(1, state?.week ?? 1);
    // M8: the new vendor permits, which the bible states as that day's own
    // visible event. Two more stalls, and a line more chalk on the board.
    for(const g of later) g.visible = day >= 8;
    chalk.forEach((c, i) => { c.visible = i < Math.min(5, 1 + Math.floor(day / 3)); });
  });
}

/**
 * 7. Queues, which are what a town short of everything looks like. Nine at the
 *    diner, four at the standpipe, six at the parcel counter. Standing people,
 *    not the walking crowd: a queue that wanders is not a queue.
 */
function queues(scene, ctx){
  const { groundHeight, softColliders, animate, stateHooks } = ctx;
  const SKIN = [0xc9a882, 0x8d6446, 0xe0bb96, 0x6f4a30, 0xd8ab84];
  const COAT = [0x3f5a72, 0x6b4a3a, 0x47603f, 0x7a4550, 0x2f4756, 0x8a7a4a];
  const r = rngB(0x9ee7e5);
  const person = (x, z, facing) => {
    const y = groundHeight(x, z);
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.rotation.y = facing + betweenB(r, -0.25, 0.25);
    const c = COAT[Math.floor(r() * COAT.length)];
    box(g, 0.42, 0.62, 0.24, 0, 1.05, 0, MATERIALS.paintedSteel(c));
    box(g, 0.34, 0.5, 0.2, 0, 0.5, 0, MATERIALS.paintedSteel(0x2e3238));
    const head = box(g, 0.22, 0.24, 0.2, 0, 1.48, 0,
      MATERIALS.paintedSteel(SKIN[Math.floor(r() * SKIN.length)]));
    scene.add(g);
    // A queue shifts its weight. Nothing walks: a queue that wanders is a crowd.
    animate?.(sway(g, 'x', 0.02, 0.4 + r() * 0.5, r() * 6));
    softColliders?.push({ x, z, r: 0.5 });
    return g;
  };
  const line = (x0, z0, dx, dz, n, facing) => {
    const out = [];
    for(let i = 0; i < n; i++) out.push(person(x0 + dx * i, z0 + dz * i, facing));
    return out;
  };
  // The diner is the community lodge; its queue is mission 1's own event.
  const diner = line(6, -22, 0.85, 0.35, 9, Math.PI);
  for(const g of diner) g.visible = false;
  line(-77, 31, 0.8, 0.5, 4, -Math.PI / 2);       // the standpipe
  line(56, 26, 0.75, 0.55, 6, 0);                  // the parcel counter
  stateHooks?.push((state) => {
    const day = Math.max(1, state?.week ?? 1);
    for(const g of diner) g.visible = day >= 1;
  });
}

/** 8. Hoardings along Trinity Drive, with bills pasted on them. */
function hoardings(scene, ctx){
  const { groundHeight, colliders, stateHooks } = ctx;
  const boards = [];
  for(const [x, z, facing] of [[-14, 16, 0], [12, 16, 0], [-2, 46, Math.PI]]){
    const y = groundHeight(x, z);
    for(const sx of [-2.4, 2.4]) box(scene, 0.12, 2.4, 0.12, x + sx, y + 1.2, z, LUMBER());
    const face = box(scene, 5.2, 1.8, 0.09, x, y + 1.9, z, PLY());
    face.rotation.y = facing;
    solidAt(colliders, x, z, y, 2.5, 2.2);
    // The bills: a card per mission, appearing as the campaign posts them.
    const bills = [];
    for(let i = 0; i < 8; i++){
      const b = box(scene, 0.52, 0.66, 0.02, x - 2.1 + (i % 4) * 1.35,
        y + 2.2 - Math.floor(i / 4) * 0.78, z + 0.06, PAPER());
      b.rotation.z = ((i * 7) % 5 - 2) * 0.03;
      b.visible = false;
      bills.push(b);
    }
    boards.push(bills);
  }
  stateHooks?.push((state) => {
    const day = Math.max(1, state?.week ?? 1);
    boards.forEach((bills, k) => {
      bills.forEach((b, i) => { b.visible = i * 2 + k < day; });
    });
  });
}

/** 9. Pond life: a jetty, two boats, reeds, and a heron that is not a statue. */
function pondLife(scene, ctx){
  const { groundHeight, softColliders, animate } = ctx;
  const px = 0, pz = -8;
  const y = groundHeight(px + 6, pz + 5);
  // The jetty out over the water.
  for(let i = 0; i < 6; i++){
    cyl(scene, 0.1, 1.4, px + 5.5, y - 0.2, pz - 2 + i * 1.1, LUMBER());
    box(scene, 1.6, 0.1, 1.1, px + 5.5, y + 0.42, pz - 2 + i * 1.1, LUMBER());
  }
  softColliders?.push({ x: px + 5.5, z: pz + 1, r: 1.4 });
  // Two boats, made fast, rocking.
  for(const [bx, bz, rot] of [[px + 3.4, pz + 1.2, 0.4], [px + 3.0, pz + 3.6, -0.3]]){
    const b = new THREE.Group();
    b.position.set(bx, y + 0.16, bz);
    b.rotation.y = rot;
    box(b, 1.0, 0.34, 3.0, 0, 0, 0, LUMBER());
    box(b, 0.8, 0.06, 0.5, 0, 0.18, 0.5, LUMBER());
    scene.add(b);
    animate?.(bob(b, 0.035, 0.6, bx));
    animate?.(sway(b, 'z', 0.03, 0.5, bz));
  }
  // Reeds along the north shore, and a heron standing in them.
  const rr = rngB(0x2eed11);
  for(let i = 0; i < 70; i++){
    const x = px - 7 + rr() * 14, z = pz - 7.4 + rr() * 1.6;
    const gy = groundHeight(x, z);
    const blade = cyl(scene, 0.02, 0.7 + rr() * 0.6, x, gy + 0.45, z,
      mat('boom.reed', () => new THREE.MeshStandardMaterial({
        color: 0x5e6b3a, roughness: 0.95, metalness: 0 })));
    blade.rotation.z = betweenB(rr, -0.18, 0.18);
    if(i % 6 === 0) animate?.(sway(blade, 'z', 0.08, 0.9, i));
  }
  const heron = new THREE.Group();
  heron.position.set(px - 4.4, y, pz - 6.2);
  cyl(heron, 0.04, 0.55, 0, 0.28, 0, MATERIALS.paintedSteel(0x8f8a7c));
  box(heron, 0.16, 0.3, 0.42, 0, 0.68, 0, MATERIALS.paintedSteel(0x9aa2a6));
  cyl(heron, 0.03, 0.3, 0, 0.95, -0.05, MATERIALS.paintedSteel(0x9aa2a6));
  box(heron, 0.07, 0.08, 0.2, 0, 1.12, -0.14, MATERIALS.paintedSteel(0xc9a63a));
  scene.add(heron);
  animate?.((t) => { heron.rotation.y = Math.sin(t * 0.13) * 0.9; });
}

/** 10. The lodge porch: benches, an urn, a dog, and people sitting. */
function lodgePorch(scene, ctx){
  const { groundHeight, softColliders, animate } = ctx;
  const x = 0, z = -22.5, y = groundHeight(x, z);
  for(const dx of [-4.5, -1.5, 1.5, 4.5]){
    box(scene, 1.9, 0.12, 0.5, x + dx, y + 0.45, z, LUMBER());
    for(const sx of [-0.7, 0.7]) box(scene, 0.12, 0.45, 0.4, x + dx + sx, y + 0.22, z, LUMBER());
    softColliders?.push({ x: x + dx, z, r: 1.0 });
  }
  const tx = x + 7;
  box(scene, 1.4, 0.1, 0.7, tx, y + 0.9, z, LUMBER());
  for(const sx of [-0.6, 0.6]) box(scene, 0.09, 0.9, 0.09, tx + sx, y + 0.45, z, LUMBER());
  cyl(scene, 0.24, 0.5, tx, y + 1.2, z, MATERIALS.paintedSteel(0x9aa0a4));
  // The dog, asleep, breathing.
  const dog = new THREE.Group();
  dog.position.set(x - 7, y, z + 1.2);
  box(dog, 0.9, 0.34, 0.42, 0, 0.2, 0, MATERIALS.paintedSteel(0x6b5844));
  box(dog, 0.3, 0.28, 0.3, 0.5, 0.3, 0, MATERIALS.paintedSteel(0x6b5844));
  scene.add(dog);
  animate?.(bob(dog, 0.015, 0.9));
}

/** 11. A thicker pine windbreak on the two exposed sides. */
function windbreak(scene, ctx){
  const { groundHeight, softColliders } = ctx;
  const r = rngB(0x71ee55);
  const spots = [];
  for(let i = 0; i < 34; i++){
    const side = i % 2;
    const x = side ? betweenB(r, -100, -70) : betweenB(r, 70, 100);
    const z = betweenB(r, -60, 90);
    spots.push([x, z]);
  }
  for(const [x, z] of spots){
    const y = groundHeight(x, z);
    const h = betweenB(r, 6, 11);
    cyl(scene, 0.22, h * 0.35, x, y + h * 0.17, z, mat('boom.trunk',
      () => new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.95, metalness: 0 })));
    for(let k = 0; k < 3; k++){
      cyl(scene, 2.2 - k * 0.55, h * 0.3, x, y + h * (0.34 + k * 0.22), z,
        mat('boom.needle', () => new THREE.MeshStandardMaterial({
          color: 0x2f4a2c, roughness: 0.94, metalness: 0, envMapIntensity: 0.4 })), 0.1);
    }
    softColliders?.push({ x, z, r: 1.2 });
  }
}

/** 12. A dust plume on the approach road, so the town looks arrived at. */
function approachDust(scene, ctx){
  const { groundHeight, animate } = ctx;
  for(let i = 0; i < 5; i++){
    const z = 96 + i * 9;
    const p = box(scene, 5 + i * 1.6, 2.2 + i * 0.5, 5 + i * 1.6, 17.6, groundHeight(17.6, z) + 1.4, z,
      mat(`boom.dust${i}`, () => new THREE.MeshBasicMaterial({
        color: 0xcfc3a8, transparent: true, opacity: 0.13 - i * 0.02 })));
    animate?.(sway(p, 'z', 0.05, 0.2 + i * 0.04, i));
    animate?.(bob(p, 0.3, 0.15 + i * 0.03, i * 1.7));
  }
}

/**
 * 13–19. The campaign in the street.
 *
 * The bible's §2.1 writes one visible event per mission, which is a dressing
 * schedule. The ribbon is the one worth knowing: it stands from mission 10 and
 * comes down on mission 14, which is this campaign's reversal happening outside
 * rather than on a card.
 */
function campaignStreet(scene, ctx){
  const { groundHeight, stateHooks, softColliders } = ctx;
  // The ribbon over the proposed new line.
  const rx = 34, rz = 54, ry = groundHeight(rx, rz);
  const ribbon = new THREE.Group();
  ribbon.position.set(rx, ry, rz);
  for(const sx of [-3, 3]) cyl(ribbon, 0.09, 1.3, sx, 0.65, 0, MATERIALS.paintedSteel(0xc9c2b0));
  const tape = box(ribbon, 6, 0.14, 0.03, 0, 1.25, 0, MATERIALS.paintedSteel(0xc4342a));
  scene.add(ribbon);
  ribbon.visible = false;
  softColliders?.push({ x: rx, z: rz, r: 3.2 });

  // The vacant rooms: shutters that come off two windows on mission 3.
  const shutters = [];
  for(const [x, z] of [[-48, -20], [44, -20]]){
    const y = groundHeight(x, z);
    for(const dx of [-2.2, 2.2]){
      shutters.push(box(scene, 1.5, 1.1, 0.08, x + dx, y + 2.4, z - 4.6, PLY()));
    }
  }
  // The hearing board outside the advice office, which gains a signed sheet.
  const hx = 0, hz = 52, hy = groundHeight(hx, hz);
  for(const sx of [-1.6, 1.6]) box(scene, 0.1, 2.2, 0.1, hx + sx, hy + 1.1, hz, LUMBER());
  box(scene, 3.4, 1.5, 0.08, hx, hy + 1.7, hz, PLY());
  const signed = box(scene, 0.8, 1.0, 0.02, hx, hy + 1.7, hz + 0.06, PAPER());
  signed.visible = false;
  sign(scene, 'PUBLIC HEARING', { x: hx, y: hy + 2.75, z: hz, w: 2.8, h: 0.5, facing: 0 });

  stateHooks?.push((state) => {
    const day = Math.max(1, state?.week ?? 1);
    ribbon.visible = day >= 10 && day < 14;   // struck on 14, which is the reversal
    for(const s of shutters) s.visible = day < 3;
    signed.visible = day >= 15;
  });
}
