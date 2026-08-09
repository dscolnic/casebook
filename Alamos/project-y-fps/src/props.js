// props.js — the things that make a construction camp look lived in:
// the Tech Area wire, guard towers, the water tank, power lines, coal bins,
// laundry, duckboard walks, jeeps, bicycles, fire barrels.
// Everything here is decoration plus collision; no game state touches it.
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { srand, srandRange, terrainHeight } from './env.js';

// Shared materials — one instance each keeps the draw-call cost honest.
const M = {
  wood:      new THREE.MeshStandardMaterial({ color: 0x6b5844, roughness: 0.93 }),
  woodDark:  new THREE.MeshStandardMaterial({ color: 0x4a3a2a, roughness: 0.94 }),
  weathered: new THREE.MeshStandardMaterial({ color: 0x8b8375, roughness: 0.95 }),
  olive:     new THREE.MeshStandardMaterial({ color: 0x4a5136, roughness: 0.62, metalness: 0.28 }),
  oliveDark: new THREE.MeshStandardMaterial({ color: 0x353b26, roughness: 0.7, metalness: 0.2 }),
  rubber:    new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.9 }),
  steel:     new THREE.MeshStandardMaterial({ color: 0x6e6e6e, roughness: 0.42, metalness: 0.8 }),
  rust:      new THREE.MeshStandardMaterial({ color: 0x6a3a24, roughness: 0.95 }),
  coal:      new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.98 }),
  ash:       new THREE.MeshStandardMaterial({ color: 0x9a948a, roughness: 0.99 }),
  cloth:     new THREE.MeshStandardMaterial({ color: 0xe8e3d4, roughness: 0.94, side: THREE.DoubleSide }),
  glassDark: new THREE.MeshStandardMaterial({ color: 0x15191d, roughness: 0.08, metalness: 0.9, envMapIntensity: 1.4 }),
  windscreen: new THREE.MeshStandardMaterial({ color: 0xaebfc7, roughness: 0.06, metalness: 0.1,
    transparent: true, opacity: 0.12, side: THREE.DoubleSide, envMapIntensity: 0.9 }),
  concrete:  new THREE.MeshStandardMaterial({ color: 0x8a857c, roughness: 0.92 }),
};

const softColliders = [];   // {x,z,r} — cylinders, cheap distance test
const hardBoxes = [];       // THREE.Box3 pushed into world colliders
// Vehicles the player can take. These deliberately do *not* get a hardBox: the
// driving controller owns their collision box, because it has to move with them.
const driveables = [];

function soft(x, z, r){ softColliders.push({ x, z, r }); }
function hard(cx, cz, w, d, h = 2, cy = null){
  hardBoxes.push(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(cx, cy ?? h / 2, cz), new THREE.Vector3(w, h, d)
  ));
}
function box(scene, w, h, d, x, y, z, mat, ry = 0){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.castShadow = true; m.receiveShadow = true;
  scene.add(m);
  return m;
}
function cyl(scene, rt, rb, h, x, y, z, mat, seg = 8){
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = true; m.receiveShadow = true;
  scene.add(m);
  return m;
}

// ---------------------------------------------------------------- barbed wire
// Posts every 3 m, two rails, three strands above. Segments are given as
// axis-aligned runs with explicit gaps where roads and doors pass through.
function wireRun(scene, x0, z0, x1, z1, gaps = []){
  const len = Math.hypot(x1 - x0, z1 - z0);
  const ux = (x1 - x0) / len, uz = (z1 - z0) / len;
  const inGap = t => gaps.some(g => t > g[0] && t < g[1]);
  const H = 2.15;
  const postGeo = new THREE.CylinderGeometry(0.09, 0.11, H, 6);
  const posts = [];
  for(let t = 0; t <= len; t += 3){
    if(inGap(t)) continue;
    posts.push(t);
  }
  const inst = new THREE.InstancedMesh(postGeo, M.woodDark, posts.length);
  inst.castShadow = true;
  const m4 = new THREE.Matrix4();
  posts.forEach((t, i) => {
    const px = x0 + ux * t, pz = z0 + uz * t;
    m4.makeTranslation(px, terrainHeight(px, pz) + H / 2, pz);
    inst.setMatrixAt(i, m4);
  });
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);

  // Strands: five heights, broken into contiguous runs around the gaps.
  const heights = [0.55, 1.05, 1.5, 1.82, 2.08];
  const runs = [];
  let cur = [];
  for(let t = 0; t <= len; t += 1.5){
    if(inGap(t)){ if(cur.length > 1) runs.push(cur); cur = []; }
    else cur.push(t);
  }
  if(cur.length > 1) runs.push(cur);
  const verts = [];
  runs.forEach(r => {
    heights.forEach((h, hi) => {
      for(let i = 0; i < r.length - 1; i++){
        const ta = r[i], tb = r[i + 1];
        const ax = x0 + ux * ta, az = z0 + uz * ta;
        const bx = x0 + ux * tb, bz = z0 + uz * tb;
        // slight sag between posts
        const sag = hi > 1 ? Math.sin((ta % 3) / 3 * Math.PI) * 0.05 : 0;
        verts.push(ax, terrainHeight(ax, az) + h - sag, az,
                   bx, terrainHeight(bx, bz) + h - sag, bz);
      }
    });
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  const lines = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x4a4a44 }));
  scene.add(lines);

  // collision: one box per contiguous run
  runs.forEach(r => {
    const ta = r[0], tb = r[r.length - 1];
    const cx = x0 + ux * (ta + tb) / 2, cz = z0 + uz * (ta + tb) / 2;
    const spanX = Math.abs(ux) * (tb - ta) + 0.4;
    const spanZ = Math.abs(uz) * (tb - ta) + 0.4;
    hard(cx, cz, spanX, spanZ, H);
  });
}

function guardTower(scene, x, z, facing){
  const y = terrainHeight(x, z);
  const H = 6.4;
  for(const [dx, dz] of [[-1.1, -1.1], [1.1, -1.1], [-1.1, 1.1], [1.1, 1.1]]){
    cyl(scene, 0.11, 0.14, H, x + dx, y + H / 2, z + dz, M.woodDark, 6);
  }
  box(scene, 3.0, 0.22, 3.0, x, y + H, z, M.wood);
  // railing
  for(const [dx, dz, w, d] of [[0, -1.45, 3.0, 0.12], [0, 1.45, 3.0, 0.12], [-1.45, 0, 0.12, 3.0], [1.45, 0, 0.12, 3.0]]){
    box(scene, w, 0.9, d, x + dx, y + H + 0.55, z + dz, M.woodDark);
  }
  // shed roof on four short posts
  for(const [dx, dz] of [[-1.3, -1.3], [1.3, -1.3], [-1.3, 1.3], [1.3, 1.3]]){
    cyl(scene, 0.07, 0.07, 2.0, x + dx, y + H + 1.1, z + dz, M.woodDark, 5);
  }
  const roof = box(scene, 3.6, 0.16, 3.6, x, y + H + 2.15, z, M.weathered);
  roof.rotation.x = 0.08;
  // searchlight
  const lampY = y + H + 1.0;
  cyl(scene, 0.3, 0.34, 0.5, x + Math.sin(facing) * 1.2, lampY, z + Math.cos(facing) * 1.2, M.steel, 10)
    .rotation.set(Math.PI / 2 - 0.25, facing, 0);
  hard(x, z, 3.2, 3.2, H);
  soft(x, z, 1.9);
}

function techAreaWire(scene){
  // Main Tech Area: the southern band holding CM, E and T.
  // Tight around CM, E and T only. A wider box would fence in the chapel and
  // the infirmary, which were town buildings and never inside the wire.
  const x0 = -42, x1 = 46, z0 = 32, z1 = 72;
  const gateA = (16 - 5.5) - x0;                           // gate road crossing, as distance along the north line
  wireRun(scene, x0, z0, x1, z0, [[gateA, gateA + 11]]);   // north line, badge gate
  wireRun(scene, x0, z1, x1, z1, []);                      // south line
  wireRun(scene, x0, z0, x0, z1, []);                      // west line
  wireRun(scene, x1, z0, x1, z1, []);                      // east line
  guardTower(scene, x0 + 2, z0 + 2, Math.PI * 0.75);
  guardTower(scene, x1 - 2, z1 - 2, -Math.PI * 0.25);
  badgeGate(scene, 16, z0, 0);

  // P and X sat in their own wired compounds, as several outlying sites did.
  // Drawn tight so the dorms and the theater stay outside them.
  compound(scene, -57, -19, -39, -1, 'east');
  compound(scene, 37, -19, 59, -1, 'west');
}
function compound(scene, x0, z0, x1, z1, gateSide){
  const midZ = (z0 + z1) / 2;
  const lenZ = z1 - z0;
  const gapT = [(midZ - 3 - z0), (midZ + 3 - z0)];
  wireRun(scene, x0, z0, x1, z0, []);
  wireRun(scene, x0, z1, x1, z1, []);
  wireRun(scene, x0, z0, x0, z1, gateSide === 'west' ? [gapT] : []);
  wireRun(scene, x1, z0, x1, z1, gateSide === 'east' ? [gapT] : []);
  badgeGate(scene, gateSide === 'east' ? x1 : x0, midZ, Math.PI / 2);
}
function badgeGate(scene, x, z, ry){
  const y = terrainHeight(x, z);
  // sentry box plus a lift arm — the pass check every worker did twice a day
  const bx = x + Math.cos(ry) * 3.4, bz = z - Math.sin(ry) * 3.4;
  box(scene, 1.6, 2.3, 1.5, bx, y + 1.15, bz, M.weathered, ry);
  box(scene, 1.9, 0.14, 1.8, bx, y + 2.38, bz, M.woodDark, ry);
  const win = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.9), M.glassDark);
  win.position.set(bx + Math.sin(ry + Math.PI / 2) * 0.78, y + 1.6, bz + Math.cos(ry + Math.PI / 2) * 0.78);
  win.rotation.y = ry + Math.PI / 2;
  scene.add(win);
  hard(bx, bz, 1.9, 1.9, 2.4);
  // barrier arm, raised
  const arm = box(scene, 5.4, 0.1, 0.1, x + Math.cos(ry) * 1.0, y + 1.55, z - Math.sin(ry) * 1.0, M.cloth, ry + Math.PI / 2);
  arm.rotation.z = 0.55;
  cyl(scene, 0.08, 0.1, 1.5, x + Math.cos(ry) * 1.0, y + 0.75, z - Math.sin(ry) * 1.0, M.woodDark, 6);
  soft(x + Math.cos(ry) * 1.0, z - Math.sin(ry) * 1.0, 0.35);
}

// ----------------------------------------------------------------- water tank
function waterTower(scene, x, z){
  const y = terrainHeight(x, z);
  const legH = 9.5;
  for(let i = 0; i < 4; i++){
    const a = i * Math.PI / 2 + Math.PI / 4;
    const dx = Math.cos(a) * 2.6, dz = Math.sin(a) * 2.6;
    const leg = cyl(scene, 0.14, 0.2, legH, x + dx * 0.75, y + legH / 2, z + dz * 0.75, M.woodDark, 6);
    leg.rotation.set(dz * 0.035, 0, -dx * 0.035);
    soft(x + dx * 0.75, z + dz * 0.75, 0.4);
  }
  // cross bracing
  for(let i = 0; i < 4; i++){
    const a = i * Math.PI / 2 + Math.PI / 4;
    const dx = Math.cos(a) * 2.0, dz = Math.sin(a) * 2.0;
    box(scene, 4.0, 0.12, 0.12, x + dx * 0, y + 3.4, z + dz, M.woodDark, a);
  }
  const tankH = 5.2;
  const tank = cyl(scene, 2.9, 2.9, tankH, x, y + legH + tankH / 2, z, M.wood, 18);
  tank.material = new THREE.MeshStandardMaterial({ color: 0x7a6349, roughness: 0.94 });
  // steel hoops
  for(let i = 0; i < 4; i++){
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(2.94, 0.07, 6, 22), M.steel);
    hoop.rotation.x = Math.PI / 2;
    hoop.position.set(x, y + legH + 0.7 + i * 1.35, z);
    scene.add(hoop);
  }
  const cone = new THREE.Mesh(new THREE.ConeGeometry(3.1, 1.3, 18), M.weathered);
  cone.position.set(x, y + legH + tankH + 0.65, z);
  cone.castShadow = true;
  scene.add(cone);
  // ladder
  for(let i = 0; i < 14; i++){
    box(scene, 0.7, 0.05, 0.05, x + 2.98, y + 1.2 + i * 0.9, z, M.steel);
  }
  hard(x, z, 5.6, 5.6, legH + tankH);
}

// ---------------------------------------------------------------- power lines
function utilityLine(scene, pts, height){
  const poleGeo = new THREE.CylinderGeometry(0.15, 0.22, height, 7);
  const inst = new THREE.InstancedMesh(poleGeo, M.woodDark, pts.length);
  inst.castShadow = true;
  const m4 = new THREE.Matrix4();
  pts.forEach((p, i) => {
    const y = terrainHeight(p[0], p[1]);
    m4.makeTranslation(p[0], y + height / 2, p[1]);
    inst.setMatrixAt(i, m4);
    // crossarm + insulators
    box(scene, 2.4, 0.14, 0.14, p[0], y + height - 0.8, p[1], M.woodDark);
    for(const dx of [-1.0, 0, 1.0]){
      cyl(scene, 0.07, 0.09, 0.22, p[0] + dx, y + height - 0.62, p[1], M.weathered, 6);
    }
    soft(p[0], p[1], 0.42);
  });
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);

  // Catenary wires: real sag is what makes power lines read as power lines.
  const verts = [];
  for(let i = 0; i < pts.length - 1; i++){
    const a = pts[i], b = pts[i + 1];
    const ya = terrainHeight(a[0], a[1]) + height - 0.62;
    const yb = terrainHeight(b[0], b[1]) + height - 0.62;
    const span = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const sag = Math.min(1.5, span * 0.045);
    for(const dx of [-1.0, 0, 1.0]){
      const STEPS = 9;
      for(let s = 0; s < STEPS; s++){
        const t0 = s / STEPS, t1 = (s + 1) / STEPS;
        const p0 = wirePoint(a, b, ya, yb, dx, t0, sag);
        const p1 = wirePoint(a, b, ya, yb, dx, t1, sag);
        verts.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  scene.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x33332e })));
}
function wirePoint(a, b, ya, yb, offset, t, sag){
  // offset is perpendicular to the run so the three wires stay parallel
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const len = Math.hypot(dx, dz) || 1;
  const px = -dz / len, pz = dx / len;
  return {
    x: a[0] + dx * t + px * offset,
    y: ya + (yb - ya) * t - Math.sin(t * Math.PI) * sag,
    z: a[1] + dz * t + pz * offset,
  };
}

// ------------------------------------------------------- domestic clutter
function coalBinAndAsh(scene, x, z, ry){
  const y = terrainHeight(x, z);
  box(scene, 1.5, 1.1, 1.0, x, y + 0.55, z, M.woodDark, ry);
  // lid ajar, coal heaped
  const lid = box(scene, 1.55, 0.08, 1.05, x, y + 1.16, z, M.wood, ry);
  lid.rotation.z = 0.16;
  const heap = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 0), M.coal);
  heap.position.set(x + Math.cos(ry) * 0.2, y + 1.05, z - Math.sin(ry) * 0.2);
  heap.scale.set(1.4, 0.5, 1.2);
  scene.add(heap);
  hard(x, z, 1.7, 1.2, 1.2);
  // ash pile — collected Monday and Wednesday
  const ax = x + Math.cos(ry + 1.2) * 2.1, az = z - Math.sin(ry + 1.2) * 2.1;
  const ash = new THREE.Mesh(new THREE.IcosahedronGeometry(0.75, 1), M.ash);
  ash.position.set(ax, y + 0.1, az);
  ash.scale.set(1.3, 0.28, 1.15);
  ash.receiveShadow = true;
  scene.add(ash);
}
function laundryLine(scene, x0, z0, x1, z1){
  const y = terrainHeight(x0, z0);
  const H = 2.5;
  [[x0, z0], [x1, z1]].forEach(([px, pz]) => {
    cyl(scene, 0.07, 0.09, H, px, terrainHeight(px, pz) + H / 2, pz, M.woodDark, 6);
    box(scene, 1.1, 0.08, 0.08, px, terrainHeight(px, pz) + H - 0.1, pz, M.woodDark,
        Math.atan2(z1 - z0, x1 - x0) + Math.PI / 2);
    soft(px, pz, 0.3);
  });
  const span = Math.hypot(x1 - x0, z1 - z0);
  const verts = [];
  for(const off of [-0.35, 0.35]){
    const STEPS = 10;
    for(let s = 0; s < STEPS; s++){
      const t0 = s / STEPS, t1 = (s + 1) / STEPS;
      const p0 = wirePoint([x0, z0], [x1, z1], y + H - 0.12, y + H - 0.12, off, t0, span * 0.05);
      const p1 = wirePoint([x0, z0], [x1, z1], y + H - 0.12, y + H - 0.12, off, t1, span * 0.05);
      verts.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  scene.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xbdb6a4 })));
  // hanging wash
  const shades = [0xf2eee2, 0xdfe4e8, 0xe7dcc6, 0xcdd3cb, 0xe9e2ea];
  for(let i = 0; i < 9; i++){
    const t = 0.08 + (i / 9) * 0.84;
    const off = i % 2 ? 0.35 : -0.35;
    const p = wirePoint([x0, z0], [x1, z1], y + H - 0.12, y + H - 0.12, off, t, span * 0.05);
    const w = srandRange(0.5, 0.95), h = srandRange(0.6, 1.15);
    const mat = new THREE.MeshStandardMaterial({
      color: shades[i % shades.length], roughness: 0.95, side: THREE.DoubleSide,
    });
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(w, h, 3, 3), mat);
    // a little billow so it is not a flat card
    const cp = cloth.geometry.attributes.position;
    for(let v = 0; v < cp.count; v++){
      cp.setZ(v, Math.sin(cp.getX(v) * 3 + i) * 0.06 + Math.sin(cp.getY(v) * 2) * 0.04);
    }
    cp.needsUpdate = true;
    cloth.geometry.computeVertexNormals();
    cloth.position.set(p.x, p.y - h / 2 - 0.05, p.z);
    cloth.rotation.y = Math.atan2(x1 - x0, z1 - z0);
    cloth.castShadow = true;
    scene.add(cloth);
  }
}
function duckboard(scene, x, z, len, ry){
  // plank walkway over the mud — laid everywhere by the winter of 1943
  const y = terrainHeight(x, z);
  const planks = Math.floor(len / 0.34);
  const geo = new THREE.BoxGeometry(1.3, 0.06, 0.26);
  const inst = new THREE.InstancedMesh(geo, M.wood, planks);
  inst.receiveShadow = true; inst.castShadow = true;
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0));
  for(let i = 0; i < planks; i++){
    const t = -len / 2 + i * 0.34;
    const px = x + Math.cos(ry) * t, pz = z - Math.sin(ry) * t;
    m4.compose(new THREE.Vector3(px, y + 0.09, pz), q, new THREE.Vector3(1, 1, 1));
    inst.setMatrixAt(i, m4);
  }
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);
  // stringers
  for(const off of [-0.55, 0.55]){
    box(scene, len, 0.1, 0.1,
        x + Math.sin(ry) * off, y + 0.03, z + Math.cos(ry) * off, M.woodDark, ry);
  }
}
function fireBarrel(scene, x, z){
  const y = terrainHeight(x, z);
  cyl(scene, 0.42, 0.4, 0.9, x, y + 0.45, z, M.rust, 12);
  for(let i = 0; i < 2; i++){
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.03, 5, 14), M.steel);
    hoop.rotation.x = Math.PI / 2;
    hoop.position.set(x, y + 0.25 + i * 0.42, z);
    scene.add(hoop);
  }
  const stencil = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.22),
    new THREE.MeshStandardMaterial({ color: 0xb8352c, roughness: 0.9 }));
  stencil.position.set(x, y + 0.6, z + 0.425);
  scene.add(stencil);
  soft(x, z, 0.55);
}
function bicycle(scene, x, z, ry){
  const y = terrainHeight(x, z);
  const g = new THREE.Group();
  const wheelGeo = new THREE.TorusGeometry(0.33, 0.035, 5, 16);
  [-0.5, 0.5].forEach(dx => {
    const w = new THREE.Mesh(wheelGeo, M.rubber);
    w.position.set(dx, 0.33, 0);
    g.add(w);
    // spokes as a thin disc
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.01, 12), M.steel);
    hub.rotation.x = Math.PI / 2;
    hub.position.set(dx, 0.33, 0);
    g.add(hub);
  });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x2c3a44, roughness: 0.5, metalness: 0.5 });
  const bar = (len, px, py, rz) => {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, len, 5), frameMat);
    b.position.set(px, py, 0); b.rotation.z = rz; g.add(b);
  };
  bar(0.95, 0, 0.62, Math.PI / 2);      // top tube
  bar(0.55, -0.28, 0.44, 0.5);          // down tube
  bar(0.5, 0.36, 0.5, -0.35);           // fork
  bar(0.45, -0.42, 0.42, 0.15);         // seat tube
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.1), M.woodDark);
  seat.position.set(-0.46, 0.68, 0); g.add(seat);
  const bars = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42, 5), frameMat);
  bars.rotation.x = Math.PI / 2; bars.position.set(0.46, 0.72, 0); g.add(bars);
  g.position.set(x, y, z);
  g.rotation.y = ry;
  g.rotation.z = -0.16;                 // leaning on the wall
  g.traverse(o => { if(o.isMesh) o.castShadow = true; });
  scene.add(g);
  soft(x, z, 0.45);
}

// ------------------------------------------------------------------- vehicles
function jeep(scene, x, z, ry, { drive = false, label = 'jeep', id = null } = {}){
  const y = terrainHeight(x, z);
  const g = new THREE.Group();
  // body tub
  const tub = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.72, 1.62), M.olive);
  tub.position.y = 0.72; g.add(tub);
  // hood and grille
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.46, 1.5), M.olive);
  hood.position.set(1.35, 1.02, 0); g.add(hood);
  const grille = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.55, 1.4), M.oliveDark);
  grille.position.set(1.92, 0.82, 0); g.add(grille);
  for(let i = 0; i < 7; i++){
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.05), M.rubber);
    slat.position.set(1.97, 0.82, -0.6 + i * 0.2); g.add(slat);
  }
  // headlamps
  [-0.45, 0.45].forEach(dz => {
    const l = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.1, 10), M.glassDark);
    l.rotation.z = Math.PI / 2;
    l.position.set(1.95, 1.16, dz); g.add(l);
  });
  // Windshield, folded up. Glass rather than the dark panel the rest of the
  // Hill's windows use: from the driver's seat that panel is forty centimetres
  // from your face and fills most of the screen, which is what "I get in and
  // cannot see anything" looks like.
  const ws = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 0.62), M.windscreen);
  ws.position.set(0.72, 1.42, 0);
  ws.rotation.set(0, Math.PI / 2, -0.22); g.add(ws);
  // A frame, not a slab. This was one solid 0.7 x 1.5 m box: from the seat it
  // is seventy centimetres from your eyes and blacks out most of the screen,
  // which is only visible once somebody sits in the thing.
  const wsFrame = new THREE.Group();
  const railGeo = new THREE.BoxGeometry(0.06, 0.07, 1.5);
  const postGeo = new THREE.BoxGeometry(0.06, 0.7, 0.07);
  for(const dy of [0.315, -0.315]){
    const rail = new THREE.Mesh(railGeo, M.oliveDark);
    rail.position.y = dy; wsFrame.add(rail);
  }
  for(const dz of [0.715, -0.715]){
    const post = new THREE.Mesh(postGeo, M.oliveDark);
    post.position.z = dz; wsFrame.add(post);
  }
  wsFrame.position.set(0.72, 1.42, 0); wsFrame.rotation.z = -0.22; g.add(wsFrame);
  // seats
  [-0.45, 0.45].forEach(dz => {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.5), M.oliveDark);
    s.position.set(0.05, 1.14, dz); g.add(s);
    const bk = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.5), M.oliveDark);
    bk.position.set(-0.22, 1.36, dz); g.add(bk);
  });
  // wheels
  const wheelGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.26, 12);
  const wheels = [];
  [[1.15, 0.86], [1.15, -0.86], [-1.15, 0.86], [-1.15, -0.86]].forEach(([dx, dz]) => {
    const w = new THREE.Mesh(wheelGeo, M.rubber);
    w.rotation.x = Math.PI / 2;
    // Stood upright by an x-rotation, so its own roll axis is y.
    w.userData.spinAxis = 'y';
    wheels.push(w);
    w.position.set(dx, 0.44, dz); g.add(w);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.28, 8), M.oliveDark);
    hub.rotation.x = Math.PI / 2;
    hub.position.set(dx, 0.44, dz); g.add(hub);
  });
  // spare on the tail
  const spare = new THREE.Mesh(wheelGeo, M.rubber);
  spare.rotation.z = Math.PI / 2;
  spare.position.set(-1.78, 1.0, 0); g.add(spare);
  // white star on the hood
  const star = new THREE.Mesh(new THREE.CircleGeometry(0.3, 5), M.cloth);
  star.rotation.x = -Math.PI / 2;
  star.position.set(1.35, 1.26, 0); g.add(star);

  g.position.set(x, y, z);
  g.rotation.y = ry;
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; o.receiveShadow = true; } });
  scene.add(g);
  if(drive){
    // The jeep's body is built along +x, so its long axis is x and the driver
    // sits on the left of the tub, facing the way the body points.
    driveables.push({
      group: g, wheels, label, id,
      halfWidth: 0.95, halfLength: 1.95, height: 1.9,
      // Seat given in the driving wrapper's frame (see driving.js): the jeep's
      // own +x becomes -z there, so its left-hand seat lands on +x.
      seat: { x: 0.45, y: 1.62, z: -0.05 }, bodyYaw: Math.PI / 2,
      // Behind the windscreen, not out on the bonnet: the jeep is short, and the
      // default arm's-length offset puts the wheel past the glass.
      wheelAt: { x: 0.45, y: 1.24, z: -0.5 },
    });
    return g;
  }
  hard(x, z, Math.abs(Math.cos(ry)) * 4.0 + Math.abs(Math.sin(ry)) * 2.0,
       Math.abs(Math.sin(ry)) * 4.0 + Math.abs(Math.cos(ry)) * 2.0, 1.7);
  return g;
}
function stakeTruck(scene, x, z, ry){
  const y = terrainHeight(x, z);
  const g = new THREE.Group();
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.3, 2.1), M.oliveDark);
  chassis.position.y = 0.82; g.add(chassis);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.5, 2.0), M.olive);
  cab.position.set(1.9, 1.72, 0); g.add(cab);
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 1.85), M.olive);
  hood.position.set(3.45, 1.45, 0); g.add(hood);
  const cabWin = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 0.75), M.glassDark);
  cabWin.position.set(1.0, 2.05, 0); cabWin.rotation.y = -Math.PI / 2; g.add(cabWin);
  // stake bed
  const bedFloor = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.14, 2.1), M.wood);
  bedFloor.position.set(-1.2, 1.04, 0); g.add(bedFloor);
  for(let i = 0; i < 7; i++){
    [-1.02, 1.02].forEach(dz => {
      const st = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.1, 0.1), M.wood);
      st.position.set(-3.1 + i * 0.65, 1.6, dz); g.add(st);
    });
  }
  [-1.02, 1.02].forEach(dz => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.1, 0.1), M.wood);
    rail.position.set(-1.2, 2.1, dz); g.add(rail);
  });
  const wheelGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.34, 12);
  [[2.6, 1.0], [2.6, -1.0], [-1.4, 1.05], [-1.4, -1.05], [-2.3, 1.05], [-2.3, -1.05]].forEach(([dx, dz]) => {
    const w = new THREE.Mesh(wheelGeo, M.rubber);
    w.rotation.x = Math.PI / 2;
    w.position.set(dx, 0.62, dz); g.add(w);
  });
  g.position.set(x, y, z);
  g.rotation.y = ry;
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; o.receiveShadow = true; } });
  scene.add(g);
  hard(x, z, Math.abs(Math.cos(ry)) * 7.0 + Math.abs(Math.sin(ry)) * 2.6,
       Math.abs(Math.sin(ry)) * 7.0 + Math.abs(Math.cos(ry)) * 2.6, 2.4);
}

function snowFence(scene, x0, z0, x1, z1){
  // slat snow fence along the exposed north rim
  const len = Math.hypot(x1 - x0, z1 - z0);
  const ux = (x1 - x0) / len, uz = (z1 - z0) / len;
  const ry = Math.atan2(ux, uz);
  const slats = Math.floor(len / 0.22);
  const geo = new THREE.BoxGeometry(0.05, 1.15, 0.16);
  const inst = new THREE.InstancedMesh(geo, M.rust, slats);
  inst.castShadow = true;
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0));
  for(let i = 0; i < slats; i++){
    const t = i * 0.22;
    const px = x0 + ux * t, pz = z0 + uz * t;
    m4.compose(new THREE.Vector3(px, terrainHeight(px, pz) + 0.62, pz), q,
               new THREE.Vector3(1, 1 + Math.sin(i * 0.7) * 0.06, 1));
    inst.setMatrixAt(i, m4);
  }
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);
  for(let t = 0; t <= len; t += 2.6){
    const px = x0 + ux * t, pz = z0 + uz * t;
    cyl(scene, 0.06, 0.07, 1.5, px, terrainHeight(px, pz) + 0.75, pz, M.woodDark, 5);
  }
}
function sled(scene, x, z, ry){
  const y = terrainHeight(x, z);
  const g = new THREE.Group();
  [-0.22, 0.22].forEach(dz => {
    const runner = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.05, 0.05), M.steel);
    runner.position.set(0, 0.07, dz); g.add(runner);
  });
  for(let i = 0; i < 5; i++){
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.52), M.wood);
    slat.position.set(-0.4 + i * 0.2, 0.13, 0); g.add(slat);
  }
  g.position.set(x, y, z);
  g.rotation.set(0, ry, -0.5);          // propped against the pond rim
  g.traverse(o => { if(o.isMesh) o.castShadow = true; });
  scene.add(g);
}
function pondReeds(scene, cx, cz, radius){
  // Short bank grass, not head-high cattails. Crossed quads rather than single
  // planes, so a tuft still reads as a tuft when you walk past it edge-on.
  const blade = new THREE.PlaneGeometry(0.5, 0.42, 2, 1);
  blade.translate(0, 0.21, 0);
  const geo = BufferGeometryUtils.mergeGeometries([
    blade.clone(),
    blade.clone().rotateY(Math.PI / 3),
    blade.clone().rotateY(-Math.PI / 3),
  ]);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x55592f, roughness: 0.97, side: THREE.DoubleSide, envMapIntensity: 0.4,
  });
  const N = 320;
  const inst = new THREE.InstancedMesh(geo, mat, N);
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  for(let i = 0; i < N; i++){
    const a = srand() * Math.PI * 2;
    const r = radius + srandRange(-0.3, 2.2);
    const px = cx + Math.cos(a) * r, pz = cz + Math.sin(a) * r;
    e.set(srandRange(-0.12, 0.12), srand() * 6.28, srandRange(-0.12, 0.12));
    q.setFromEuler(e);
    const s = srandRange(0.6, 1.25);
    m4.compose(new THREE.Vector3(px, terrainHeight(px, pz), pz), q, new THREE.Vector3(s, s, s));
    inst.setMatrixAt(i, m4);
  }
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);
}

// ------------------------------------------------------------------ entry point
/**
 * Populates the mesa with everything that is not a building.
 * @returns {{soft: Array, hard: Array}} collision data for player.js / world.js
 */
export function buildProps(scene){
  softColliders.length = 0;
  hardBoxes.length = 0;
  driveables.length = 0;

  techAreaWire(scene);
  waterTower(scene, -78, -46);

  // Power lines: one run along Trinity Drive, one up the gate road.
  const trinityPoles = [];
  for(let x = -104; x <= 104; x += 26) trinityPoles.push([x, 19.5]);
  utilityLine(scene, trinityPoles, 7.6);
  const gatePoles = [];
  for(let z = 24; z <= 100; z += 24) gatePoles.push([25.5, z]);
  utilityLine(scene, gatePoles, 7.0);

  // Coal bins and ash piles behind every housing block, clear of the roads.
  const housing = [
    [-48, -32, 0], [44, -32, 0],               // Sundt 4-plex rows
    [-28, 29.5, Math.PI], [30, 20, Math.PI],   // duplexes, hutments
    [-66, -13, 0], [-80, -13, 0],              // women's and men's dorms
    [-76, 32, Math.PI],                        // WAC barracks
  ];
  housing.forEach(([x, z, ry]) => coalBinAndAsh(scene, x, z, ry));

  laundryLine(scene, -70, -14, -62, -14);
  laundryLine(scene, 30, 20, 38, 20);
  laundryLine(scene, -38, -22, -38, -14);

  // Duckboard walks in front of the busy frontages, stopping clear of the
  // gate road so a walkway never runs across a roadbed.
  duckboard(scene, -6, 21.2, 26, 0);
  duckboard(scene, 52, 24, 12, Math.PI / 2);
  duckboard(scene, -22, 8.5, 14, 0);
  duckboard(scene, 61, -6, 12, Math.PI / 2);

  // Motor pool and parked vehicles. Four of the five are driveable — the Hill
  // is six hundred metres end to end and everybody who worked there complained
  // about the walking. The fifth stays parked so the motor pool still reads as
  // a motor pool rather than an empty lot.
  jeep(scene, -12, 17.4, 0.12, { drive: true, id: 'JEEP_POOL_A', label: 'jeep' });
  jeep(scene, 26, 17.2, -0.08, { drive: true, id: 'JEEP_POOL_B', label: 'jeep' });
  jeep(scene, 6, 3.4, Math.PI + 0.1, { drive: true, id: 'JEEP_TECH', label: 'jeep' });
  jeep(scene, -37, 6, Math.PI / 2, { drive: true, id: 'JEEP_WEST', label: 'jeep' });
  jeep(scene, 17, 44, 0.02);
  stakeTruck(scene, -30, 16.5, 0.05);
  stakeTruck(scene, 42, 33, Math.PI / 2 + 0.1);

  // Bicycles leaning where people actually left them.
  bicycle(scene, 52.4, 22, Math.PI / 2);
  bicycle(scene, 53.1, 23.4, Math.PI / 2);
  bicycle(scene, 61, -4, Math.PI / 2);
  bicycle(scene, -58.5, -9, -Math.PI / 2);
  bicycle(scene, -72.5, -4, -Math.PI / 2);
  bicycle(scene, -21.5, 18, 0);
  bicycle(scene, 9, 51, Math.PI);
  bicycle(scene, -39.5, 38, Math.PI);

  [[-9, 20.8], [30, 20.5], [25, 34], [-25, 20]].forEach(([x, z]) => fireBarrel(scene, x, z));

  snowFence(scene, -46, 88, 6, 92);
  snowFence(scene, 30, 90, 74, 84);
  sled(scene, 5.5, -15.4, 0.7);
  pondReeds(scene, 0, -8, 7.2);

  return { soft: softColliders.slice(), hard: hardBoxes.slice(), driveables: driveables.slice() };
}
