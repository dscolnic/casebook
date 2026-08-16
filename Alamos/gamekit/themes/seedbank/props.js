// props.js — what makes Saltmere Point a breeding station laid out by distance.
//
// Generic shells, benches, bins and signs come from engine/world/kit.js and are
// configured in site.js. What is here is the layout *as an object*: the rings,
// the empty bands between them, the cliff that ends them and the one direction
// anything can arrive from.
//
// EVERYTHING IS POLAR. `site.js` exports `RINGS` and every radius below is read
// from it, because the boundary markers have to stand on the boundary the
// buildings were placed against. Two descriptions of one ring is how a sign
// saying ISOLATION 18 M ends up at 61 m, and nothing in `check` can see it.
//
// Rules paid for elsewhere in this repo and obeyed here:
//
//   · Placement helpers take `(x, z, y)` — ground last.
//   · No real lights. Daytime site; the budget is the sun rig.
//   · An InstancedMesh whose instances are all two hundred metres from its
//     origin has a useless default bounding sphere and vanishes, so every one
//     below computes its own rather than turning culling off.
//   · An albedo darker than looks right, because under ACES with a bright sky
//     IBL a mid one renders near-white.

import * as THREE from 'three';
import {
  MATERIALS, box, cyl, sign, crateStack, tank, fenceRun, vehicle,
} from '../../engine/world/kit.js';
import { RINGS, rimAt } from './site.js';

const TAU = Math.PI * 2;

/** Deterministic noise. Math.random would give a different station every load. */
const rnd = (i, salt = 0) => {
  const s = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/** Polar to world. Bearing in radians, 0 = north (−z), clockwise. */
const pol = (r, a) => ({ x: Math.sin(a) * r, z: -Math.cos(a) * r });

/** Compass bearing to the atan2(z, x) angle the terrain's rim is written in. */
const rimOnBearing = (a) => rimAt(Math.atan2(-Math.cos(a), Math.sin(a)));

/** How far the land reaches straight out along +z at this z. Half-width, metres. */
function landHalfWidth(z){
  let half = 0;
  for(let x = 0; x < 80; x += 0.5){
    if(Math.hypot(x, z) < rimAt(Math.atan2(z, x))) half = x;
  }
  return half;
}

// ---------------------------------------------------------------- the plots
//
// A plot on a ring is a wedge, not a rectangle: the same 5 m by 6 m at the
// radius it sits at, laid along the arc. That is the shape the layout gives for
// free, and no other game in the set has a curved field.
function ringPlots(scene, y, { r0, r1, plotD = 6, plotW = 5, gap = 1.2, skip = () => false, seed = 0 }){
  const rows = [];
  for(let r = r0 + plotD / 2; r + plotD / 2 <= r1; r += plotD + gap) rows.push(r);
  const cells = [];
  for(const r of rows){
    const step = (plotW + gap) / r;              // angular pitch at this radius
    const n = Math.max(4, Math.floor(TAU / step));
    for(let i = 0; i < n; i++){
      const a = i * (TAU / n);
      const p = pol(r, a);
      if(skip(p.x, p.z, r, a)) continue;
      cells.push({ ...p, r, a });
    }
  }
  if(!cells.length) return null;

  const crop = new THREE.InstancedMesh(
    new THREE.BoxGeometry(plotW - 0.5, 1, plotD - 0.5),
    new THREE.MeshStandardMaterial({ roughness: 0.97, metalness: 0, envMapIntensity: 0.35 }),
    cells.length);
  crop.material.color.set(0xffffff);
  const stake = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.05, 0.85, 0.05), MATERIALS.paintedSteel(0x6a6252), cells.length);
  const tag = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.15, 0.1, 0.012), MATERIALS.panel(), cells.length);

  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const scl = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const c = new THREE.Color();

  cells.forEach((cell, i) => {
    const j = i + seed * 977;
    const g = y(cell.x, cell.z);
    // A winter crop in early spring: green, knee high. Waist-high straw made the
    // first version of this field read as a maze of walls, and put the season
    // five months ahead of a campaign that opens in the first week of March.
    const line = 0.38 + 0.24 * rnd(j, 1);
    // The seaward side stands thinner: the wind is off the water on that bearing
    // and the soil over the cliff is shallowest. This is the ring's own site
    // effect, and it is what three of the trial lessons are arguing about.
    const exposure = Math.max(0, -Math.cos(cell.a - Math.PI * 0.15));
    const h = line * (1 - 0.30 * exposure);
    q.setFromAxisAngle(up, cell.a);
    scl.set(1, h, 1);
    pos.set(cell.x, g + h / 2, cell.z);
    crop.setMatrixAt(i, m.compose(pos, q, scl));
    // Saturated enough to separate from the turned earth it stands in. The
    // ground is the browner half of this pair and the crop is the greener; get
    // them within a stop of each other and the whole field reads as one surface.
    c.setHSL(0.245 - 0.025 * exposure + 0.015 * rnd(j, 2),
             0.55 - 0.14 * exposure,
             0.115 + 0.038 * rnd(j, 3));
    crop.setColorAt(i, c);
    // The stake goes on the inboard edge, in the alley, where a plot number is
    // read from — which on a ring means toward the centre.
    const sp = pol(cell.r - plotD / 2 - gap / 2, cell.a);
    const sg = y(sp.x, sp.z);
    scl.set(1, 1, 1);
    stake.setMatrixAt(i, m.compose(pos.set(sp.x, sg + 0.42, sp.z), q, scl));
    tag.setMatrixAt(i, m.compose(pos.set(sp.x, sg + 0.82, sp.z), q, scl));
  });

  for(const mesh of [crop, stake, tag]){
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    mesh.castShadow = false;
    scene.add(mesh);
  }
  if(crop.instanceColor) crop.instanceColor.needsUpdate = true;
  return crop;
}

/**
 * A boundary marker on a ring: a short post, a rail either side of it, and a
 * plate saying what the distance is for.
 *
 * This is the one prop that makes the whole layout legible. An isolation buffer
 * is *nothing* — twenty-odd metres of mown grass — and nothing is invisible. The
 * marker turns an empty band into a stated rule, and it is why a player who asks
 * "why is there a gap here" gets an answer standing in front of them.
 */
function ringMarkers(scene, y, r, text, { count = 10, colour = 0xb8a24a, soft } = {}){
  const plate = MATERIALS.paintedSteel(colour);
  const steel = MATERIALS.paintedSteel(0x7d7a6e);
  for(let i = 0; i < count; i++){
    const a = (i / count) * TAU + 0.13;
    const p = pol(r, a);
    const g = y(p.x, p.z);
    const grp = new THREE.Group();
    box(grp, 0.09, 1.5, 0.09, 0, 0.75, 0, steel);
    box(grp, 0.62, 0.34, 0.05, 0, 1.32, 0.06, plate);
    // A rail either side, so the line reads as a line and not as scattered posts.
    for(const s of [-1, 1]) box(grp, 3.6, 0.07, 0.07, s * 2.1, 0.95, 0, steel);
    for(const s of [-1, 1]) box(grp, 0.07, 0.95, 0.07, s * 3.9, 0.48, 0, steel);
    grp.position.set(p.x, g, p.z);
    grp.rotation.y = a;
    scene.add(grp);
    if(soft) soft({ x: p.x, z: p.z, r: 0.6 });
  }
  // One legible sign per ring, beside the ring road the player walks in on.
  const p = pol(r, Math.PI);
  sign(scene, text, {
    x: p.x + 8, y: y(p.x + 8, p.z) + 2.4, z: p.z, w: 6.6, h: 1.4, facing: Math.PI,
    sub: 'Wellmere isolation standard',
  });
}

/** The cliff-edge fence. The sea is the boundary; this is what stops a fall. */
function cliffFence(scene, y, colliders){
  const N = 96;
  let run = null;
  for(let i = 0; i <= N; i++){
    const a = (i / N) * TAU;
    // Break the fence where the neck leaves the headland: that is the causeway,
    // and it has rails of its own.
    if(rimOnBearing(a) > RINGS.rim + 1){ run = null; continue; }
    const p = pol(RINGS.rim - 4, a);
    if(run){
      colliders.push(fenceRun(scene, {
        x0: run.x, z0: run.z, x1: p.x, z1: p.z,
        y: y((run.x + p.x) / 2, (run.z + p.z) / 2), height: 1.3,
      }));
    }
    run = p;
  }
}

/**
 * The causeway: a roadway with the sea both sides, and a rail on each.
 *
 * The rail is not decoration. The neck is eleven metres of land either side of
 * the road at its widest and four at the gate, so without one the walk out is a
 * walk on an unmarked ledge.
 */
function causeway(scene, y, colliders){
  for(const s of [-1, 1]){
    let prev = null;
    for(let z = 176; z <= 340; z += 8){
      // Follow the land, not a straight line: the neck tapers, so a straight
      // rail runs into the sea at one end and stands in the field at the other.
      const p = { x: s * Math.max(3.8, landHalfWidth(z) - 2.0), z };
      if(prev){
        colliders.push(fenceRun(scene, {
          x0: prev.x, z0: prev.z, x1: p.x, z1: p.z,
          y: y((prev.x + p.x) / 2, (prev.z + p.z) / 2), height: 1.15,
        }));
      }
      prev = p;
    }
  }
}

/**
 * Idris Fenn's farm, on the mainland, and the sea between.
 *
 * Looked at, argued about, never walked to. It is upwind — the prevailing wind
 * is south-west, over the causeway — which is the whole reason the crossing
 * block is a hundred and fifty metres the other way, and the reason days twelve
 * and thirteen are about somebody else's field.
 *
 * Given no collider at all, because nothing here is reachable: the gate is the
 * end of the walk.
 */
function mainland(scene){
  const g = new THREE.Group();
  const land = new THREE.Mesh(
    new THREE.PlaneGeometry(1600, 460),
    new THREE.MeshStandardMaterial({ color: 0x59654a, roughness: 0.98, metalness: 0,
      envMapIntensity: 0.3 }));
  land.rotation.x = -Math.PI / 2;
  land.position.set(0, -17.2, 760);
  land.userData.ignoreAudit = true;
  g.add(land);
  // A low shore, so the far side of the water is a coast rather than a cut edge.
  const shore = box(g, 1600, 3.4, 28, 0, -18.3, 545, MATERIALS.paintedSteel(0x6c6a58));
  if(shore) shore.userData.ignoreAudit = true;

  // Fenn's ground: field blocks in the middle distance, on the bearing the wind
  // comes from. Bigger and squarer than anything on the Point, because a farm is
  // not laid out by isolation distance — which is the comparison being drawn.
  const fields = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ roughness: 0.97, metalness: 0, envMapIntensity: 0.3 }),
    26);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const c = new THREE.Color();
  for(let i = 0; i < 26; i++){
    const w = 60 + 90 * rnd(i, 7), d = 50 + 80 * rnd(i, 8);
    const x = -540 + 1080 * rnd(i, 9);
    const z = 590 + 300 * rnd(i, 10);
    q.setFromAxisAngle(up, (rnd(i, 11) - 0.5) * 0.5);
    fields.setMatrixAt(i, m.compose(
      new THREE.Vector3(x, -16.8, z), q, new THREE.Vector3(w, 0.9, d)));
    c.setHSL(0.16 + 0.09 * rnd(i, 12), 0.30, 0.17 + 0.05 * rnd(i, 13));
    fields.setColorAt(i, c);
  }
  fields.instanceMatrix.needsUpdate = true;
  if(fields.instanceColor) fields.instanceColor.needsUpdate = true;
  fields.computeBoundingSphere();
  fields.userData.ignoreAudit = true;
  g.add(fields);

  // The farmstead itself, south-west, so the windsock and the argument point at
  // the same thing.
  const farm = new THREE.Group();
  box(farm, 22, 9, 13, 0, 4.5, 0, MATERIALS.paintedSteel(0x8a8271));
  box(farm, 34, 7, 15, 30, 3.5, 14, MATERIALS.paintedSteel(0x6f7466));
  box(farm, 9, 12, 9, -22, 6, 6, MATERIALS.paintedSteel(0x94897a));
  farm.position.set(-300, -16.4, 610);
  farm.rotation.y = 0.4;
  farm.userData.ignoreAudit = true;
  g.add(farm);

  scene.add(g);
  return g;
}

/**
 * Glazing over one of the three bays: a shallow gable of glass with bars across
 * it, and vertical bars down the long walls. site.js builds the shell as an
 * ordinary building; this is what turns it into a glasshouse from a hundred
 * metres, which is the distance it is nearly always seen from.
 */
function glaze(scene, { x, z, w, d, h }, y, tint, facing = 0){
  const g = new THREE.Group();
  const glass = new THREE.MeshStandardMaterial({
    color: 0xc2d6d0, roughness: 0.18, metalness: 0, transparent: true, opacity: 0.52,
    side: THREE.DoubleSide, envMapIntensity: 0.35,
  });
  const bar = MATERIALS.paintedSteel(0xd6d9d2);
  // `kit.building` stands its walls on a 0.35 m slab and caps them with a 0.5 m
  // parapet, so the top of the shell is not `h` — it is 0.35 + h + 0.5. Putting
  // the roof at `h` hung it inside the parapet with a hand's width of glass
  // showing above it, which from the road read as a fan of loose slats.
  const SLAB = 0.35, PARAPET = 0.5;
  const wallTop = SLAB + h;                     // where the glazing bars stop
  const roofY = wallTop + PARAPET;              // the eaves line
  const rise = 1.7, half = w / 2;
  const slope = Math.atan2(rise, half);
  const face = Math.hypot(rise, half);
  for(const s of [-1, 1]){
    // A thin box rather than a plane: a plane needs an Euler order argued about
    // and a box's slope can be read off the one rotation it has.
    const pane = new THREE.Mesh(new THREE.BoxGeometry(face, 0.05, d), glass);
    pane.rotation.z = -s * slope;
    pane.position.set(s * half / 2, roofY + rise / 2, 0);
    g.add(pane);
    // Purlins, so the roof is not one unbroken sheet of nothing.
    for(let i = 1; i <= 3; i++){
      const t = i / 4;                                // 0 at the ridge, 1 at the eaves
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, d), bar);
      p.position.set(s * half * t, roofY + rise * (1 - t) + 0.08, 0);
      g.add(p);
    }
  }
  box(g, 0.16, 0.16, d, 0, roofY + rise, 0, bar);                     // the ridge
  for(const s of [-1, 1]) box(g, 0.14, 0.14, d + 0.4, s * half, roofY, 0, bar);   // eaves
  // Glazing bars down the long walls, every 1.6 m. This is most of the read.
  const bays = Math.max(2, Math.round(d / 1.6));
  const barH = wallTop - 0.9;
  for(let i = 0; i <= bays; i++){
    const zz = -d / 2 + (d / bays) * i;
    for(const s of [-1, 1]) box(g, 0.1, barH, 0.1, s * (half + 0.05), barH / 2 + 0.9, zz, bar);
  }
  // The gable ends, filled in.
  for(const s of [-1, 1]){
    const tri = new THREE.Shape();
    tri.moveTo(-half, 0); tri.lineTo(half, 0); tri.lineTo(0, rise); tri.closePath();
    const end = new THREE.Mesh(new THREE.ShapeGeometry(tri), glass);
    end.position.set(0, roofY, s * d / 2);
    g.add(end);
  }
  // The screening bay is kept apart and painted so: a red band at the eaves.
  if(tint) for(const s of [-1, 1]) box(g, 0.2, 0.34, d + 0.4, s * half, roofY - 0.3, 0, MATERIALS.paintedSteel(tint));
  g.position.set(x, y(x, z), z);
  g.rotation.y = facing;
  scene.add(g);
  return g;
}

/**
 * A screenhouse: mesh on a frame, benched trays inside. Deliberately not glazed
 * — the whole point is that air goes through it and pollen does not.
 */
function screenhouse(scene, x, z, y, facing = 0, w = 13, d = 9, h = 3.4){
  const g = new THREE.Group();
  const frame = MATERIALS.paintedSteel(0x9aa0a2);
  const mesh = new THREE.MeshStandardMaterial({
    color: 0xb0b9b2, roughness: 0.95, metalness: 0, transparent: true, opacity: 0.42,
    side: THREE.DoubleSide,
  });
  for(const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]){
    box(g, 0.12, h, 0.12, sx * w / 2, h / 2, sz * d / 2, frame);
  }
  for(const s of [-1, 1]){
    box(g, w, 0.1, 0.1, 0, h, s * d / 2, frame);
    box(g, 0.1, 0.1, d, s * w / 2, h, 0, frame);
    const side = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mesh);
    side.position.set(0, h / 2, s * d / 2);
    g.add(side);
    const end = new THREE.Mesh(new THREE.PlaneGeometry(d, h), mesh);
    end.rotation.y = Math.PI / 2;
    end.position.set(s * w / 2, h / 2, 0);
    g.add(end);
  }
  const top = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mesh);
  top.rotation.x = -Math.PI / 2;
  top.position.y = h;
  g.add(top);
  for(let i = -1; i <= 1; i++){
    box(g, w - 2.2, 0.08, 0.85, 0, 0.76, i * 2.4, MATERIALS.panel());
    for(const s of [-1, 1]) box(g, 0.07, 0.76, 0.07, s * (w / 2 - 1.5), 0.38, i * 2.4, frame);
  }
  g.position.set(x, y(x, z), z);
  g.rotation.y = facing;
  scene.add(g);
  return g;
}

/**
 * The shelterbelt on the windward quarter: two staggered rows of salt-burned
 * conifer, leaning inland. Nothing on a coast grows straight.
 *
 * All the way round it would be scenery. On one bearing it is a statement about
 * where the weather — and everything else — arrives from.
 */
function shelterbelt(scene, y, soft){
  const N = 64;
  const trunk = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.15, 0.22, 3, 5), MATERIALS.paintedSteel(0x4a3f33), N);
  const crown = new THREE.InstancedMesh(
    new THREE.ConeGeometry(1.9, 7.5, 7), new THREE.MeshStandardMaterial({
      color: 0x33422f, roughness: 0.96, metalness: 0 }), N);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const lean = new THREE.Vector3(0, 0, 1);
  const scl = new THREE.Vector3();
  const pos = new THREE.Vector3();
  for(let i = 0; i < N; i++){
    const row = i % 2;
    // The south-west quarter only, which is where the weather and the
    // neighbour's pollen come from.
    const a = 3.45 + (i / N) * 1.75 + rnd(i, 4) * 0.02;
    const r = RINGS.rim - 12 - row * 7 - rnd(i, 5) * 3;
    const p = pol(r, a);
    const g = y(p.x, p.z);
    const s = 0.72 + 0.3 * rnd(i, 6);
    // Leaning inland. 0.14 rad is enough to read and not enough to look broken.
    q.setFromAxisAngle(lean, 0.14 * Math.sin(a));
    scl.set(s, s, s);
    trunk.setMatrixAt(i, m.compose(pos.set(p.x, g + 1.4 * s, p.z), q, scl));
    crown.setMatrixAt(i, m.compose(pos.set(p.x, g + 5.4 * s, p.z), q, scl));
    soft({ x: p.x, z: p.z, r: 1.5 * s });
  }
  for(const mesh of [trunk, crown]){
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    scene.add(mesh);
  }
}

/**
 * Decorate the Point. `ctx` is the outdoor world's, after ground, buildings and
 * site furniture.
 */
export function decorate(scene, ctx){
  const { groundHeight, colliders, softColliders } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const soft = (s) => { if(s) softColliders.push(s); };

  // ================================================================ the rings
  // The trial ring, minus the wedges the two field buildings stand in.
  ringPlots(scene, y, {
    r0: RINGS.trial.r0, r1: RINGS.trial.r1, seed: 1,
    skip: (x, z) => Math.hypot(x - 82, z + 82) < 22 || Math.hypot(x - 128, z - 13) < 24,
  });
  // The increase ring: smaller plots and more of them, because an increase is
  // one accession at a time.
  ringPlots(scene, y, {
    r0: RINGS.increase.r0, r1: RINGS.increase.r1, plotW: 3.4, plotD: 4, gap: 1.6, seed: 2,
    skip: (x, z) => Math.hypot(x + 41.7, z + 41.7) < 20,
  });
  // The crossing block's own ground: a handful of bagged rows at the centre.
  ringPlots(scene, y, { r0: 9, r1: 17, plotW: 2.6, plotD: 3, gap: 1.4, seed: 3 });

  // The boundaries, which are what make the empty bands mean anything.
  ringMarkers(scene, y, RINGS.buffer1.r0, 'ISOLATION 18 M — nothing in flower beyond this line',
    { count: 8, colour: 0xb8a24a, soft });
  ringMarkers(scene, y, RINGS.increase.r0, 'INCREASE RING — one accession to a plot',
    { count: 12, colour: 0x6f9487, soft });
  ringMarkers(scene, y, RINGS.trial.r0, 'TRIAL RING — commercial scale, nothing crossed here',
    { count: 16, colour: 0x8a7b57, soft });

  // ================================================================ the edges
  cliffFence(scene, y, colliders);
  causeway(scene, y, colliders);
  mainland(scene);
  shelterbelt(scene, y, soft);

  // ========================================================= the glasshouses
  // In the inner buffer, because a sealed house is its own isolation — see the
  // note on LANDMARKS in site.js. The order round the arc is the order the
  // campaign uses them: warm, cool, screening.
  glaze(scene, { x: -20.1, z: -22.3, w: 12, d: 20, h: 5.2 }, y, null, Math.PI * 1.77);
  glaze(scene, { x: 0, z: -31.0, w: 12, d: 20, h: 5.2 }, y, null, Math.PI);
  glaze(scene, { x: 20.1, z: -22.3, w: 12, d: 20, h: 5.2 }, y, 0xb5502f, Math.PI * 0.23);

  // ============================================================ the increase
  // Screenhouses: mesh cages where an accession is grown out with nothing flying
  // in. They are the physical form of the day 9 lesson, standing in the ring
  // whose radius is the reason they work.
  for(let i = 0; i < 3; i++){
    const a = Math.PI * (1.12 + i * 0.17);
    const p = pol(RINGS.increase.r0 + 15, a);
    colliders.push(new THREE.Box3().setFromObject(screenhouse(scene, p.x, p.z, y, a)));
  }
  {
    const p = pol(RINGS.increase.r0 + 15, Math.PI * 1.12);
    sign(scene, 'Screenhouses', {
      x: p.x, y: y(p.x, p.z + 10) + 3.0, z: p.z + 10, w: 4.8, h: 1.4, facing: Math.PI,
      sub: 'Insect-proof mesh · regeneration',
    });
  }

  // ================================================================= the gate
  // Built here rather than in site.js: a landmark 326 m down the causeway drags
  // the minimap's bounds out with it, and the map is how a person stop is found.
  {
    const z = 326, g = y(0, z);
    const kiosk = new THREE.Group();
    box(kiosk, 3.4, 3.0, 3.0, 0, 1.5, 0, MATERIALS.paintedSteel(0x8f9186));
    box(kiosk, 4.2, 0.3, 3.8, 0, 3.1, 0, MATERIALS.paintedSteel(0x6f7466));
    box(kiosk, 1.6, 1.1, 0.1, 0, 1.9, 1.55, MATERIALS.glass());
    kiosk.position.set(-5.2, g, z);
    scene.add(kiosk);
    colliders.push(new THREE.Box3().setFromObject(kiosk));
    // The barrier itself, across the road, in the raised position.
    const arm = new THREE.Group();
    box(arm, 0.16, 1.1, 0.16, 0, 0.55, 0, MATERIALS.paintedSteel(0x9aa0a2));
    box(arm, 0.14, 7.0, 0.14, 0, 4.4, 0, MATERIALS.paintedSteel(0xc4552f));
    arm.position.set(-2.8, g, z);
    scene.add(arm);
    sign(scene, 'Point Gate', {
      x: 3.6, y: g + 2.9, z, w: 5.0, h: 1.4, facing: Math.PI,
      sub: 'The only way on or off the Point',
    });
    soft({ x: -2.8, z, r: 0.6 });
  }

  // ============================================================= the compound
  // `vehicle` returns a Box3, not a soft circle: these go in the hard list.
  colliders.push(vehicle(scene, -14, 160, y(-14, 160), { facing: 0.3, colour: 0x2f6a3f, box: false }));
  colliders.push(vehicle(scene, 18, 163, y(18, 163), { facing: -0.5, colour: 0xa8481f, box: true }));

  soft(crateStack(scene, 24, 182, y(24, 182), { rows: 3, colour: 0x9a8b6a }));
  soft(crateStack(scene, 28, 184, y(28, 184), { rows: 2, colour: 0x8d7f61 }));
  soft(tank(scene, -50, 152, y(-50, 152), { r: 3.0, h: 7.5, colour: 0xb6bcb2 }));

  // The windsock, on the bearing everything else on this site is about.
  {
    const p = { x: 48, z: 152 };
    const g = y(p.x, p.z);
    cyl(scene, 0.12, 8, p.x, g + 4, p.z, MATERIALS.paintedSteel(0x8d949a));
    const sock = new THREE.Mesh(
      new THREE.ConeGeometry(0.62, 2.6, 10, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xc4552f, roughness: 0.9, metalness: 0,
        side: THREE.DoubleSide }));
    sock.rotation.z = -Math.PI / 2;
    sock.rotation.y = Math.PI * 0.25;          // streaming away from the south-west
    sock.position.set(p.x + 1.1, g + 7.4, p.z);
    scene.add(sock);
    soft({ x: p.x, z: p.z, r: 0.8 });
  }
}

/** Unused: this is an outdoor theme and its rooms come from interiors.js. */
export function fitOutRoom(){}
export function fitOutSpine(){}
