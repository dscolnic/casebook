// props.js — the objects that make Wellmere a seed bank on a farm.
//
// Generic shells, benches, bins and signs come from engine/world/kit.js and are
// configured in site.js. What is here is the two things that carry the
// silhouette, and nothing else in the set has either:
//
//   · **the trial grid** — 240 plots on a numbered lattice running north to the
//     shelterbelt. A grid of staked plots stretching to a treeline is a shape no
//     town has, and half the campaign's calls happen looking at it.
//   · **the glasshouse range** — three glazed volumes in a row. site.js builds
//     the shells; what makes them read as glass is the roof and the glazing
//     bars, which are here.
//
// Two rules paid for elsewhere in this repo and obeyed here:
//
//   · Placement helpers take `(x, z, y)` — ground last.
//   · No real lights. This is a daytime site and the budget is the sun rig; the
//     one lit thing is an emissive panel.
//
// Everything repeated more than about forty times is an InstancedMesh with its
// bounding sphere computed by hand. An instanced mesh whose instances are all
// two hundred metres from its origin has a useless default bounding sphere and
// vanishes; `frustumCulled = false` fixes that by pushing it through the
// renderer from every camera angle, which is the expensive way to be correct.

import * as THREE from 'three';
import {
  MATERIALS, box, cyl, post, sign, crateStack, tank, fenceRun, vehicle,
} from '../../engine/world/kit.js';

// ---------------------------------------------------------------- the trial
//
// 20 plots across by 12 up: 240, which is the number on the season board and in
// four of the lessons. A plot is 5 m by 6 m with a metre of alley round it, so
// the grid is 120 m across and 84 m deep and the player walks the alleys.
const PLOT = { cols: 20, rows: 12, w: 5, d: 6, gap: 1.0 };
const GRID = {
  x0: -((PLOT.cols * (PLOT.w + PLOT.gap)) / 2) + (PLOT.w + PLOT.gap) / 2,
  z0: -142,          // the near edge, just past the field road
};
const plotX = (c) => GRID.x0 + c * (PLOT.w + PLOT.gap);
const plotZ = (r) => GRID.z0 - r * (PLOT.d + PLOT.gap);

/** Deterministic noise. Math.random would give a different field every load. */
const rnd = (i, salt = 0) => {
  const s = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/**
 * The trial ground: 240 crop blocks, 240 stakes, and one wet corner.
 *
 * The crop is one instanced box per plot rather than modelled ears. At the
 * distance a plot is read from — the alley, or the field laboratory window —
 * height and colour are the whole content, and both of them are the data: a
 * plot's height varies by line, and the north-east corner is greener because it
 * is the wet corner three lessons turn on.
 */
function trialGrid(scene, y){
  const N = PLOT.cols * PLOT.rows;
  // A plot's crop is 4.4 m of a 5 m plot, so the alley reads as an alley from
  // the end of the row rather than the grid closing up into one field.
  const crop = new THREE.InstancedMesh(
    new THREE.BoxGeometry(PLOT.w - 0.6, 1, PLOT.d - 0.6),
    new THREE.MeshStandardMaterial({ roughness: 0.97, metalness: 0, envMapIntensity: 0.35 }),
    N);
  crop.material.color.set(0xffffff);          // instance colours carry it
  const stake = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.05, 0.9, 0.05), MATERIALS.paintedSteel(0x6a6252), N);
  const tag = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.16, 0.11, 0.012), MATERIALS.panel(), N);

  const m = new THREE.Matrix4();
  const c = new THREE.Color();
  let i = 0;
  for(let r = 0; r < PLOT.rows; r++){
    for(let col = 0; col < PLOT.cols; col++, i++){
      const x = plotX(col), z = plotZ(r);
      const g = y(x, z);
      // Height is the line, plus the site. The campaign opens in the first week
      // of March with sowing three weeks off, so this is a winter crop in early
      // spring — green and about knee high — rather than the ripe wheat it was
      // first built as. Waist-high straw here made the grid read as a maze of
      // walls and put the season five months ahead of the story.
      const line = 0.30 + 0.22 * rnd(i, 1);
      // The wet corner: north-east, and it flatters whatever is in it. This is
      // the reason TRIAL/3 exists, and it should be visible from the alley.
      const wet = Math.max(0, (col - 12) / 7) * Math.max(0, (r - 7) / 4);
      const h = line + wet * 0.16;
      m.makeTranslation(x, g + h / 2, z);
      m.elements[5] = h;                       // scale y in place
      crop.setMatrixAt(i, m);
      // Spring green, varying by line, and the wet corner darker and thicker —
      // which is the whole of the evidence in three of the trial lessons and
      // has to be visible from the alley without anybody being told.
      //
      // The lightness looks far too dark written down and is correct on screen.
      // Under ACES with a bright sky IBL a mid albedo renders near-white, which
      // is how a wheat trial came out as a car park the first time.
      c.setHSL(0.235 + 0.020 * wet + 0.015 * rnd(i, 2),
               0.34 + 0.18 * wet,
               0.145 + 0.045 * rnd(i, 3) - 0.02 * wet);
      crop.setColorAt(i, c);
      // The stake stands in the alley at the plot's south-west corner, which is
      // where a plot number goes on a real trial and where the player reads it.
      const sx = x - PLOT.w / 2 - PLOT.gap / 2, sz = z + PLOT.d / 2 + PLOT.gap / 2;
      const sg = y(sx, sz);
      stake.setMatrixAt(i, m.makeTranslation(sx, sg + 0.45, sz));
      tag.setMatrixAt(i, m.makeTranslation(sx, sg + 0.86, sz + 0.02));
    }
  }
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
 * The shelterbelt at the top of the ground. Two staggered rows of conifer, dark
 * and close, because the point of one is that it is a wall — and because the
 * campaign's horizon is otherwise the same hills at every bearing.
 */
function shelterbelt(scene, y, soft){
  const N = 96;
  const trunk = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.16, 0.24, 3, 5), MATERIALS.paintedSteel(0x4a3f33), N);
  const crown = new THREE.InstancedMesh(
    new THREE.ConeGeometry(2.1, 9, 7), new THREE.MeshStandardMaterial({
      color: 0x2f4030, roughness: 0.96, metalness: 0 }), N);
  const m = new THREE.Matrix4();
  for(let i = 0; i < N; i++){
    const row = i % 2;
    const x = -168 + (i / N) * 336 + rnd(i, 4) * 4;
    const z = -252 - row * 7 - rnd(i, 5) * 3;
    const g = y(x, z);
    const s = 0.82 + 0.36 * rnd(i, 6);
    trunk.setMatrixAt(i, m.makeTranslation(x, g + 1.5 * s, z).scale(new THREE.Vector3(s, s, s)));
    crown.setMatrixAt(i, m.makeTranslation(x, g + 6.4 * s, z).scale(new THREE.Vector3(s, s, s)));
    soft({ x, z, r: 1.7 * s });
  }
  for(const mesh of [trunk, crown]){
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    scene.add(mesh);
  }
}

/**
 * Glazing over one of the three bays: a shallow gable of glass with bars across
 * it, and vertical bars down the long walls. site.js builds the shell as an
 * ordinary building; this is what turns it into a glasshouse from a hundred
 * metres, which is the distance it is nearly always seen from.
 */
function glaze(scene, { x, z, w, d, h }, y, tint){
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
  scene.add(g);
  return g;
}

/**
 * The screenhouse: a mesh box on a frame, which is how an increase of one
 * accession stays that accession. Deliberately not glazed — the whole point of
 * it is that air goes through and pollen does not.
 */
function screenhouse(scene, x, z, y, w = 16, d = 11, h = 3.6){
  const g = new THREE.Group();
  const frame = MATERIALS.paintedSteel(0x9aa0a2);
  const mesh = new THREE.MeshStandardMaterial({
    color: 0xb9c2bb, roughness: 0.95, metalness: 0, transparent: true, opacity: 0.4,
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
    const endp = new THREE.Mesh(new THREE.PlaneGeometry(d, h), mesh);
    endp.rotation.y = Math.PI / 2;
    endp.position.set(s * w / 2, h / 2, 0);
    g.add(endp);
  }
  const top = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mesh);
  top.rotation.x = -Math.PI / 2;
  top.position.y = h;
  g.add(top);
  // Benched trays inside, so it is not an empty cage.
  for(let i = -2; i <= 2; i++){
    box(g, w - 2.4, 0.08, 0.9, 0, 0.78, i * 2.0, MATERIALS.panel());
    for(const s of [-1, 1]) box(g, 0.07, 0.78, 0.07, s * (w / 2 - 1.6), 0.39, i * 2.0, frame);
  }
  g.position.set(x, y(x, z), z);
  scene.add(g);
  return g;
}

/**
 * Decorate the station. `ctx` is the outdoor world's, after ground, buildings
 * and site furniture.
 */
export function decorate(scene, ctx){
  const { groundHeight, colliders, softColliders } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const soft = (s) => { if(s) softColliders.push(s); };

  // ============================================================== the ground
  trialGrid(scene, y);
  shelterbelt(scene, y, soft);

  // A stock fence round the trial, with the gate left where the field road
  // meets it. A trial ground is fenced because a trial eaten by deer is not a
  // trial, and it is the line that says where the experiment starts.
  {
    const x0 = plotX(0) - PLOT.w / 2 - 3, x1 = plotX(PLOT.cols - 1) + PLOT.w / 2 + 3;
    const z0 = GRID.z0 + PLOT.d / 2 + 3, z1 = plotZ(PLOT.rows - 1) - PLOT.d / 2 - 3;
    const runs = [
      [x0, z0, -6, z0], [6, z0, x1, z0],       // the near side, with the gateway
      [x0, z1, x1, z1],
      [x0, z0, x0, z1], [x1, z0, x1, z1],
    ];
    for(const [ax, az, bx, bz] of runs){
      colliders.push(fenceRun(scene, {
        x0: ax, z0: az, x1: bx, z1: bz, y: y((ax + bx) / 2, (az + bz) / 2), height: 1.5,
      }));
    }
    // Gateposts, either side of the gap the field road runs through.
    for(const s of [-1, 1]) soft(post(scene, s * 6, z0, y(s * 6, z0), 1.9, 0.12, 0x6a6252));
  }

  // ========================================================= the glasshouses
  // The three bays, in the order the campaign uses them: warm, cool, screening.
  glaze(scene, { x: -26, z: -40, w: 14, d: 26, h: 5.4 }, y, null);
  glaze(scene, { x: 0, z: -40, w: 14, d: 26, h: 5.4 }, y, null);
  glaze(scene, { x: 26, z: -40, w: 14, d: 26, h: 5.4 }, y, 0xb5502f);

  // The screenhouse, on the field road west of the Genetic Resources office.
  // Its nameplate is a plain sign rather than a site landmark: a landmark is a
  // building, and a 0.1 m building still gets a 2.6 m door.
  colliders.push(new THREE.Box3().setFromObject(screenhouse(scene, 12, -108, y)));
  sign(scene, 'Screenhouse', {
    x: 12, y: y(12, -102) + 3.0, z: -102.2, w: 4.6, h: 1.5, facing: Math.PI,
    sub: 'Insect-proof mesh · seed increase',
  });

  // ================================================================ the yard
  // A drill and a tractor, parked where they were left. The drill is the thing
  // the whole first week is counted towards.
  // `vehicle` returns a Box3, not a soft circle: these go in the hard list.
  colliders.push(vehicle(scene, -16, 26, y(-16, 26), { facing: 0.3, colour: 0x2f6a3f, box: false }));
  colliders.push(vehicle(scene, 20, 22, y(20, 22), { facing: -0.5, colour: 0xa8481f, box: true }));

  // Grain, going out and coming back. Sacks by the threshing floor, seed crates
  // by the drying hall door.
  soft(crateStack(scene, 22, 68, y(22, 68), { rows: 3, colour: 0x9a8b6a }));
  soft(crateStack(scene, 26, 70, y(26, 70), { rows: 2, colour: 0x8d7f61 }));
  soft(crateStack(scene, 46, 40, y(46, 40), { rows: 2, colour: 0x7f8a7c }));

  // Irrigation, because the wet corner and the dry season are half the argument.
  soft(tank(scene, 62, -70, y(62, -70), { r: 3.2, h: 8, colour: 0xb6bcb2 }));
  soft(tank(scene, 70, -70, y(70, -70), { r: 3.2, h: 8, colour: 0xaeb4ab }));

  // Rows of pots outside the crossing hall: a nursery bench, and the only thing
  // on the station that looks like it is being worked on today.
  {
    const pots = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.14, 0.11, 0.24, 8), MATERIALS.paintedSteel(0x8a5a44), 120);
    const m = new THREE.Matrix4();
    for(let i = 0; i < 120; i++){
      const row = Math.floor(i / 30);
      const x = -56 + (i % 30) * 0.42, z = 4 + row * 0.5;
      pots.setMatrixAt(i, m.makeTranslation(x, y(x, z) + 0.72, z));
    }
    pots.instanceMatrix.needsUpdate = true;
    pots.computeBoundingSphere();
    scene.add(pots);
    for(let row = 0; row < 4; row++){
      box(scene, 13, 0.07, 0.62, -49.7, y(-49.7, 4 + row * 0.5) + 0.6, 4 + row * 0.5, MATERIALS.panel());
    }
    soft({ x: -49.7, z: 4.8, r: 7 });
  }
}

/** Unused: this is an outdoor theme and its rooms come from interiors.js. */
export function fitOutRoom(){}
export function fitOutSpine(){}
