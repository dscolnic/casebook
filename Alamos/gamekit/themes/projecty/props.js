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
