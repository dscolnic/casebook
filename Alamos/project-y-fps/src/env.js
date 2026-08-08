// env.js — sky, environment lighting, mesa terrain, ridges, ponderosa forest, stars.
// The mesa is a finger of the Pajarito Plateau at ~2200 m: flat top, hard canyon
// dropoffs, pine forest thinned by the Ranch School, and three ranks of hazed
// ridges (Jemez close and tall to the west, Sangre de Cristo faint to the east).
import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

// ---------------------------------------------------------------- value noise
function hash2(x, y){
  let h = (x * 374761393 + y * 668265263) | 0;
  h = ((h ^ (h >> 13)) * 1274126177) | 0;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}
function vnoise(x, y){
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
export function fbm(x, y, oct = 4){
  let s = 0, amp = 0.5, f = 1;
  for(let i = 0; i < oct; i++){ s += amp * vnoise(x * f, y * f); f *= 2; amp *= 0.5; }
  return s;
}
// Deterministic per-index random so the town looks the same every reload.
let seedCounter = 1;
export function srand(){
  seedCounter = (seedCounter * 1664525 + 1013904223) >>> 0;
  return seedCounter / 4294967296;
}
export function srandRange(a, b){ return a + srand() * (b - a); }
export function resetSeed(v = 1){ seedCounter = v; }

// ------------------------------------------------------------------ road plan
// Trinity Drive runs east-west along the south shore of Ashley Pond; the gate
// road climbs north to the canyon bridge; one residential spur serves the
// Sundt duplexes.
export const ROADS = [
  { kind: 'main', cx: 0,  cz: 10, w: 240, d: 16,  rut: 10 },  // Trinity Drive
  { kind: 'gate', cx: 16, cz: 54, w: 11,  d: 104, rut: 6.5 }, // north to the canyon bridge
  { kind: 'spur', cx: -8, cz: 19, w: 11,  d: 22,  rut: 6 },   // lab access spur
];
export function onRoad(x, z, pad = 1.5){
  for(const r of ROADS){
    if(Math.abs(x - r.cx) < r.w / 2 + pad && Math.abs(z - r.cz) < r.d / 2 + pad) return true;
  }
  return false;
}

// --------------------------------------------------------------- mesa terrain
export const MESA_PLAYER_LIMIT = 105;   // player bound — always on flat ground
const CANYON_DEPTH = 62;

function rimRadius(ang){
  return 122 + Math.sin(ang * 3.1) * 6 + Math.cos(ang * 5.7) * 4 + Math.sin(ang * 11.3) * 2;
}

// Building pads. The Sundt crews graded a flat bench under every structure, so
// the ground under and just around a building is level. This has to live in the
// height *function*, not just the mesh — otherwise people and props stand on a
// terrain that no longer exists and sink through the visible ground.
let PADS = [];
export function setTerrainPads(boxes, margin = 4){
  PADS = boxes.map(b => ({ x0: b.min.x, x1: b.max.x, z0: b.min.z, z1: b.max.z, m: margin }));
}
function padWeight(x, z){
  let best = 0;
  for(let i = 0; i < PADS.length; i++){
    const p = PADS[i];
    if(x < p.x0 - p.m || x > p.x1 + p.m || z < p.z0 - p.m || z > p.z1 + p.m) continue;
    const dx = Math.max(0, p.x0 - x, x - p.x1);
    const dz = Math.max(0, p.z0 - z, z - p.z1);
    const w = 1 - Math.min(1, Math.max(dx, dz) / p.m);
    if(w >= 1) return 1;
    if(w > best) best = w;
  }
  return best;
}

export function terrainHeight(x, z){
  const r = Math.hypot(x, z);
  const ang = Math.atan2(z, x);
  const rim = rimRadius(ang);
  // gentle mesa-top undulation, killed on the graded roadbeds and building pads
  let surf = (fbm(x * 0.012 + 11, z * 0.012 + 7, 4) - 0.5) * 1.0
           + (fbm(x * 0.07 + 3, z * 0.07 + 5, 3) - 0.5) * 0.25;
  if(onRoad(x, z, 3)) surf *= 0.08;
  if(PADS.length) surf *= 1 - padWeight(x, z);
  if(r < rim) return surf;
  const t = Math.min(1, (r - rim) / 52);
  const s = t * t * (3 - 2 * t);
  // the far wall of the canyon rises to the next mesa finger
  let far = 0;
  if(r > 230){ const f = Math.min(1, (r - 230) / 70); far = f * f * (3 - 2 * f); }
  const opposite = far * (56 + (fbm(x * 0.006 + 3, z * 0.006 + 9, 3) - 0.5) * 26);
  return surf * (1 - s) - CANYON_DEPTH * s + opposite;
}

// ------------------------------------------------------------------- textures
function canvasTex(size, draw, repeat = 1){
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 8;
  return t;
}
// Multi-octave dirt so the eye cannot find the tile seam.
function groundColorTexture(){
  return canvasTex(2048, (g, s) => {
    const img = g.createImageData(s, s);
    const d = img.data;
    for(let y = 0; y < s; y++){
      for(let x = 0; x < s; x++){
        const u = x / s * 8, v = y / s * 8;
        const broad = fbm(u * 0.9, v * 0.9, 3);        // large tonal patches
        const mid   = fbm(u * 5.5 + 40, v * 5.5 + 40, 4);
        const fine  = vnoise(u * 46, v * 46);
        const n = broad * 0.5 + mid * 0.32 + fine * 0.18;
        // Dry pumice-and-clay: warm tan through gray-brown. Kept a stop darker
        // and more saturated than it looks on the canvas — under a 4.4-intensity
        // sun and ACES, a pale albedo blows out to featureless sand.
        let r = 116 + n * 76, gg = 96 + n * 66, b = 68 + n * 50;
        if(mid > 0.66){ r -= 22; gg -= 20; b -= 14; }   // damp patches
        if(fine > 0.86){ r += 32; gg += 30; b += 26; }   // pumice grit
        const i = (y * s + x) * 4;
        d[i] = r; d[i + 1] = gg; d[i + 2] = b; d[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    // scattered pebbles and pine litter
    for(let i = 0; i < 5200; i++){
      const x = Math.random() * s, y = Math.random() * s;
      g.fillStyle = Math.random() > 0.45 ? 'rgba(70,58,42,0.30)' : 'rgba(226,214,188,0.26)';
      g.beginPath(); g.arc(x, y, Math.random() * 2.6, 0, Math.PI * 2); g.fill();
    }
    for(let i = 0; i < 900; i++){
      const x = Math.random() * s, y = Math.random() * s, a = Math.random() * Math.PI;
      g.strokeStyle = 'rgba(84,64,40,0.22)'; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * 9, y + Math.sin(a) * 9); g.stroke();
    }
  }, 12);
}
// Fine-grain normal map at a much tighter repeat, so close ground has relief.
function groundNormalTexture(){
  const size = 512;
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d');
  const img = g.createImageData(size, size);
  const d = img.data;
  const h = (x, y) => fbm(x / size * 24, y / size * 24, 4);
  for(let y = 0; y < size; y++){
    for(let x = 0; x < size; x++){
      const hl = h((x - 1 + size) % size, y), hr = h((x + 1) % size, y);
      const hd = h(x, (y - 1 + size) % size), hu = h(x, (y + 1) % size);
      const nx = (hl - hr) * 2.2, ny = (hd - hu) * 2.2, nz = 1;
      const len = Math.hypot(nx, ny, nz);
      const i = (y * size + x) * 4;
      d[i]     = ((nx / len) * 0.5 + 0.5) * 255;
      d[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      d[i + 2] = ((nz / len) * 0.5 + 0.5) * 255;
      d[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(150, 150);
  t.anisotropy = 4;
  return t;
}

export function buildTerrain(scene){
  const SIZE = 760, SEG = 300;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
  const pos = geo.attributes.position;
  // terrainHeight already grades the pads and roadbeds, so the mesh and the
  // function that everything else stands on can never disagree.
  for(let i = 0; i < pos.count; i++){
    const x = pos.getX(i), y = pos.getY(i);   // plane is XY before rotation; y maps to -z
    pos.setZ(i, terrainHeight(x, -y));
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    map: groundColorTexture(),
    normalMap: groundNormalTexture(),
    normalScale: new THREE.Vector2(0.65, 0.65),
    roughness: 0.95,
    metalness: 0.0,
  });
  const ground = new THREE.Mesh(geo, mat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.name = 'terrain';
  scene.add(ground);
  return ground;
}

// -------------------------------------------------------------------- roadbed
/**
 * Roadbed texture. The across-road edges fade to transparent with a ragged
 * noise mask, so a road meets the dirt the way a graded track does instead of
 * looking like a gray sheet dropped on the ground.
 * @param acrossAxis 'y' when the road runs along the texture's x, else 'x'
 */
function roadTexture(dark, acrossAxis){
  return canvasTex(1024, (g, s) => {
    const img = g.createImageData(s, s);
    const d = img.data;
    for(let y = 0; y < s; y++){
      for(let x = 0; x < s; x++){
        const u = x / s * 6, v = y / s * 6;
        const n = fbm(u * 1.6, v * 1.6, 3) * 0.6 + vnoise(u * 30, v * 30) * 0.4;
        const base = dark ? 84 : 112;
        const i = (y * s + x) * 4;
        d[i] = base + n * 44; d[i + 1] = base - 6 + n * 40; d[i + 2] = base - 20 + n * 32;
        // ragged, feathered shoulder
        const t = (acrossAxis === 'y' ? y : x) / s;
        const edge = Math.min(t, 1 - t) * 2;               // 0 at the edges, 1 mid-road
        const ragged = 0.16 + vnoise(u * 9, v * 9) * 0.18; // noisy fade width
        d[i + 3] = Math.round(255 * Math.min(1, Math.max(0, edge / ragged)));
      }
    }
    g.putImageData(img, 0, 0);
    // wheel ruts and dried mud ridges run along the road length — kept faint,
    // since at this tile size a strong line reads as corduroy from a distance
    for(let i = 0; i < 70; i++){
      const y = Math.random() * s;
      g.strokeStyle = Math.random() > 0.5 ? 'rgba(48,38,26,0.11)' : 'rgba(198,182,152,0.08)';
      g.lineWidth = 1 + Math.random() * 3;
      g.beginPath(); g.moveTo(0, y);
      g.bezierCurveTo(s * 0.3, y + (Math.random() - 0.5) * 30, s * 0.7, y + (Math.random() - 0.5) * 30, s, y);
      g.stroke();
    }
  }, 1);
}

export function buildRoads(scene){
  // Two variants so the fade always runs across the road, not along it.
  const tex = {
    shoulderX: roadTexture(false, 'x'), shoulderY: roadTexture(false, 'y'),
    rutX: roadTexture(true, 'x'), rutY: roadTexture(true, 'y'),
  };
  const out = [];
  ROADS.forEach((r, idx) => {
    const long = r.d > r.w;                 // true when the road runs along +z
    const roadMat = (t, rough) => new THREE.MeshStandardMaterial({
      map: t, roughness: rough, metalness: 0,
      transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2,
    });
    // Shoulder: full corridor, dusty and pale. Tiles only along the road so the
    // across-road alpha fade stays at the actual edges.
    const st = (long ? tex.shoulderX : tex.shoulderY).clone();
    st.needsUpdate = true;
    st.repeat.set(long ? 1 : Math.max(2, r.w / 26), long ? Math.max(2, r.d / 26) : 1);
    const shoulder = new THREE.Mesh(new THREE.PlaneGeometry(r.w, r.d, 1, 1), roadMat(st, 0.97));
    shoulder.rotation.x = -Math.PI / 2;
    shoulder.position.set(r.cx, 0.05 + idx * 0.004, r.cz);
    shoulder.renderOrder = 1 + idx * 2;
    shoulder.receiveShadow = true;
    scene.add(shoulder);
    // Rut strip: darker, damper, narrower — the part vehicles actually use.
    const rt = (long ? tex.rutX : tex.rutY).clone();
    rt.needsUpdate = true;
    rt.repeat.set(long ? 1 : Math.max(2, r.w / 22), long ? Math.max(2, r.d / 22) : 1);
    const rut = new THREE.Mesh(
      new THREE.PlaneGeometry(long ? r.rut : r.w, long ? r.d : r.rut, 1, 1),
      roadMat(rt, 0.88)
    );
    rut.rotation.x = -Math.PI / 2;
    rut.position.set(r.cx, 0.075 + idx * 0.004, r.cz);
    rut.renderOrder = 2 + idx * 2;
    rut.receiveShadow = true;
    scene.add(rut);
    out.push(shoulder, rut);
  });

  // Puddles — Los Alamos mud was the site's most-complained-about feature.
  // Muddy water: a touch of gloss, not a mirror. Full metalness reflected the
  // whole sky and read as sheet ice.
  const puddleMat = new THREE.MeshStandardMaterial({
    color: 0x322e26, roughness: 0.16, metalness: 0.05, envMapIntensity: 0.7,
  });
  for(let i = 0; i < 26; i++){
    const r = ROADS[Math.floor(srand() * ROADS.length)];
    const px = r.cx + srandRange(-1, 1) * (r.w / 2 - 1.5);
    const pz = r.cz + srandRange(-1, 1) * (r.d / 2 - 1.5);
    const p = new THREE.Mesh(new THREE.CircleGeometry(srandRange(0.6, 2.2), 12), puddleMat);
    p.rotation.x = -Math.PI / 2;
    p.rotation.z = srand() * Math.PI;
    p.scale.set(1, srandRange(0.45, 1), 1);
    p.position.set(px, 0.093, pz);
    scene.add(p);
  }
  return out;
}

// -------------------------------------------------------------- pine forest
function pineFoliageGeometry(){
  const parts = [];
  const layers = [
    { r: 2.5, h: 4.2, y: 0.0 },
    { r: 2.0, h: 3.8, y: 2.6 },
    { r: 1.35, h: 3.2, y: 5.0 },
  ];
  layers.forEach(l => {
    const c = new THREE.ConeGeometry(l.r, l.h, 8, 1, true);
    c.translate(0, l.y + l.h / 2, 0);
    parts.push(c);
  });
  return BufferGeometryUtils.mergeGeometries(parts);
}
function barkTexture(){
  return canvasTex(256, (g, s) => {
    g.fillStyle = '#7a5636'; g.fillRect(0, 0, s, s);
    // ponderosa plates: jigsaw-puzzle bark, orange-brown
    for(let i = 0; i < 240; i++){
      const x = Math.random() * s, y = Math.random() * s;
      g.fillStyle = Math.random() > 0.5 ? 'rgba(146,92,48,0.55)' : 'rgba(64,42,26,0.45)';
      g.beginPath();
      g.ellipse(x, y, 6 + Math.random() * 12, 4 + Math.random() * 9, Math.random(), 0, Math.PI * 2);
      g.fill();
    }
    g.strokeStyle = 'rgba(38,26,16,0.5)'; g.lineWidth = 2;
    for(let x = 0; x < s; x += 14){
      g.beginPath(); g.moveTo(x, 0);
      g.bezierCurveTo(x + 6, s * 0.3, x - 6, s * 0.7, x, s);
      g.stroke();
    }
  }, 1);
}

/**
 * Plants the ponderosa forest. Thin inside town (the Ranch School cleared it),
 * dense toward the rim and down the canyon slopes.
 * Returns soft colliders {x,z,r} for trunks the player can actually reach.
 */
export function plantTrees(scene, isBlocked){
  const trunkGeo = new THREE.CylinderGeometry(0.26, 0.46, 1, 7, 1, true);
  trunkGeo.translate(0, 0.5, 0);
  const foliageGeo = pineFoliageGeometry();
  const bark = barkTexture();
  bark.repeat.set(2, 6);
  const trunkMat = new THREE.MeshStandardMaterial({ map: bark, roughness: 0.92, metalness: 0 });
  const needleMat = new THREE.MeshStandardMaterial({
    color: 0x3f5638, roughness: 0.88, metalness: 0, side: THREE.DoubleSide, flatShading: true,
  });

  const placements = [];
  const MAX = 620;
  let guard = 0;
  while(placements.length < MAX && guard < 26000){
    guard++;
    const ang = srand() * Math.PI * 2;
    // radial density: sparse in town, heavy from the rim outward
    const u = srand();
    const r = 26 + Math.pow(u, 0.55) * 260;
    const x = Math.cos(ang) * r, z = Math.sin(ang) * r;
    const rim = rimRadius(ang);
    // nothing grows on the sheer part of the dropoff
    if(r > rim + 6 && r < rim + 34) continue;
    if(r < 118){
      if(onRoad(x, z, 3.2)) continue;
      if(isBlocked && isBlocked(x, z, 3.0)) continue;
      // thinned townsite: keep only a scattering
      const keep = 0.10 + 0.55 * Math.min(1, Math.max(0, (r - 30) / 88));
      if(srand() > keep) continue;
    }
    const y = terrainHeight(x, z);
    if(y < -CANYON_DEPTH + 4 && srand() > 0.35) continue;   // canyon floor is sparser
    const scale = srandRange(0.62, 1.5) * (r < 110 ? 1.08 : 1.0);
    placements.push({ x, y, z, scale, rot: srand() * Math.PI * 2, lean: srandRange(-0.05, 0.05) });
  }

  const n = placements.length;
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, n);
  const crowns = new THREE.InstancedMesh(foliageGeo, needleMat, n);
  trunks.castShadow = true; crowns.castShadow = true;
  trunks.receiveShadow = true; crowns.receiveShadow = true;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const colliders = [];
  placements.forEach((p, i) => {
    const trunkH = 9 * p.scale + srandRange(0, 5) * p.scale;
    e.set(p.lean, p.rot, p.lean * 0.7);
    q.setFromEuler(e);
    m.compose(new THREE.Vector3(p.x, p.y, p.z), q, new THREE.Vector3(p.scale, trunkH, p.scale));
    trunks.setMatrixAt(i, m);
    // crown sits on the upper 45% of the trunk
    m.compose(
      new THREE.Vector3(p.x, p.y + trunkH * 0.55, p.z), q,
      new THREE.Vector3(p.scale, p.scale * srandRange(0.9, 1.3), p.scale)
    );
    crowns.setMatrixAt(i, m);
    const rr = Math.hypot(p.x, p.z);
    if(rr < MESA_PLAYER_LIMIT + 6) colliders.push({ x: p.x, z: p.z, r: 0.55 * p.scale + 0.35 });
  });
  trunks.instanceMatrix.needsUpdate = true;
  crowns.instanceMatrix.needsUpdate = true;
  scene.add(trunks, crowns);

  // Low scrub — oak brush and chamisa — at the same instanced cost.
  const scrubGeo = BufferGeometryUtils.mergeGeometries([
    new THREE.IcosahedronGeometry(0.8, 0),
    new THREE.IcosahedronGeometry(0.55, 0).translate(0.7, -0.1, 0.3),
    new THREE.IcosahedronGeometry(0.5, 0).translate(-0.6, -0.15, -0.4),
  ]);
  const scrubMat = new THREE.MeshStandardMaterial({ color: 0x6a6a45, roughness: 0.95, flatShading: true });
  const scrubs = [];
  guard = 0;
  while(scrubs.length < 420 && guard < 12000){
    guard++;
    const ang = srand() * Math.PI * 2;
    const r = 20 + Math.pow(srand(), 0.7) * 250;
    const x = Math.cos(ang) * r, z = Math.sin(ang) * r;
    if(onRoad(x, z, 2.4)) continue;
    if(r < 110 && isBlocked && isBlocked(x, z, 2.0)) continue;
    if(r < 96 && srand() > 0.3) continue;
    scrubs.push({ x, y: terrainHeight(x, z), z, s: srandRange(0.5, 1.5) });
  }
  const scrubMesh = new THREE.InstancedMesh(scrubGeo, scrubMat, scrubs.length);
  scrubMesh.castShadow = true;
  scrubs.forEach((p, i) => {
    e.set(srandRange(-0.2, 0.2), srand() * 6.28, srandRange(-0.2, 0.2));
    q.setFromEuler(e);
    m.compose(new THREE.Vector3(p.x, p.y + 0.25 * p.s, p.z), q, new THREE.Vector3(p.s, p.s * 0.7, p.s));
    scrubMesh.setMatrixAt(i, m);
  });
  scrubMesh.instanceMatrix.needsUpdate = true;
  scene.add(scrubMesh);

  return colliders;
}

// ------------------------------------------------------------- ridge backdrop
// Unlit arcs at three distances. Aerial perspective is faked by lerping each
// rank further toward the horizon colour, which is what actually sells depth.
const ridges = [];
function ridgeMesh(radius, baseH, ampFn, tint){
  const STEPS = 420;
  const verts = [], cols = [], idx = [];
  for(let i = 0; i <= STEPS; i++){
    const a = (i / STEPS) * Math.PI * 2;
    const amp = ampFn(a);
    // Ridged noise on top of the smooth profile: a pure sum of sines gives
    // rolling hills, and the Jemez read as peaks and notches.
    const ridged = 1 - Math.abs(Math.sin(a * 9.1) * 0.55 + Math.sin(a * 23.3) * 0.3);
    const h = baseH * amp
      + Math.sin(a * 7.3) * baseH * 0.10
      + ridged * baseH * 0.20
      + Math.sin(a * 31.7) * baseH * 0.035
      + Math.sin(a * 53.1) * baseH * 0.015;
    const x = Math.cos(a) * radius, z = Math.sin(a) * radius;
    verts.push(x, -40, z, x, h, z);
    // Shade the flanks darker than the crests so each rank has volume rather
    // than reading as a flat paper cut-out.
    cols.push(0.62, 0.62, 0.66, 1, 1, 1);
  }
  for(let i = 0; i < STEPS; i++){
    const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
    idx.push(a, c, b, b, c, d);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mat = new THREE.MeshBasicMaterial({
    color: tint, vertexColors: true, side: THREE.DoubleSide, fog: false, depthWrite: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  return mesh;
}
export function buildRidges(scene){
  // west = Jemez (tall, close); east = Sangre de Cristo (low, far).
  const west = a => 0.55 + 0.62 * Math.max(0, Math.cos(a - Math.PI));      // peaks toward -x
  const east = a => 0.45 + 0.40 * Math.max(0, Math.cos(a));
  const ranks = [
    { r: 300, h: 96,  amp: a => 0.5 + west(a) * 0.9 + east(a) * 0.25, base: 0x46543f, haze: 0.24 },
    { r: 480, h: 132, amp: a => 0.45 + west(a) * 1.0 + east(a) * 0.35, base: 0x53687a, haze: 0.52 },
    { r: 660, h: 108, amp: a => 0.5 + west(a) * 0.5 + east(a) * 0.75, base: 0x7e93a8, haze: 0.76 },
  ];
  ranks.forEach((rk, i) => {
    const mesh = ridgeMesh(rk.r, rk.h, rk.amp, rk.base);
    mesh.renderOrder = -10 + i;
    mesh.position.y = -6;
    scene.add(mesh);
    ridges.push({ mesh, base: new THREE.Color(rk.base), haze: rk.haze });
  });
  return ridges;
}

// ------------------------------------------------------------------ sky + env
let sky, envSky, envScene, pmrem, envRT, starField;
let lastEnvKey = null;

export function initSky(scene, renderer){
  sky = new Sky();
  sky.scale.setScalar(850);
  sky.material.fog = false;
  scene.add(sky);

  // A second identical dome lives in its own scene purely to bake the IBL.
  envSky = new Sky();
  envSky.scale.setScalar(850);
  envScene = new THREE.Scene();
  envScene.add(envSky);
  pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  applySkyUniforms(sky);
  applySkyUniforms(envSky);

  // Night sky. At 2200 m with a blacked-out town, the Milky Way was the view
  // scientists most often wrote home about.
  const starGeo = new THREE.BufferGeometry();
  const sp = [], sc = [];
  for(let i = 0; i < 1600; i++){
    const u = srand() * Math.PI * 2;
    const v = Math.acos(srand() * 0.98);        // upper hemisphere only
    const R = 780;
    sp.push(Math.sin(v) * Math.cos(u) * R, Math.cos(v) * R, Math.sin(v) * Math.sin(u) * R);
    const warm = srand();
    sc.push(0.75 + warm * 0.25, 0.78 + warm * 0.2, 0.9 + srand() * 0.1);
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  starGeo.setAttribute('color', new THREE.Float32BufferAttribute(sc, 3));
  starField = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 2.2, sizeAttenuation: false, vertexColors: true,
    transparent: true, opacity: 0, depthWrite: false, fog: false,
  }));
  starField.frustumCulled = false;
  starField.renderOrder = -20;
  scene.add(starField);
  return sky;
}
function applySkyUniforms(s){
  const u = s.material.uniforms;
  // Thin, dry, high-altitude air: low turbidity, high rayleigh. At 2200 m the
  // zenith is genuinely deep blue and the horizon band is narrow — a low
  // rayleigh here washed the whole dome out to near-white.
  u.turbidity.value = 1.8;
  u.rayleigh.value = 2.6;
  u.mieCoefficient.value = 0.0026;
  u.mieDirectionalG.value = 0.80;
}

const sunVec = new THREE.Vector3();
/**
 * Drives sky, IBL, stars and ridge haze from the sun direction.
 * The PMREM bake is throttled: it only reruns when the sun has actually moved.
 */
export function updateSky(scene, sunPosition, dayBlend){
  if(!sky) return null;
  sunVec.copy(sunPosition).normalize();
  sky.material.uniforms.sunPosition.value.copy(sunVec);
  // Scattering falls off with the sun: leaving daytime rayleigh on after dark
  // left a lit teal dome overhead instead of a night sky.
  const turb = 0.35 + 1.45 * dayBlend;
  const rayl = 0.30 + 2.30 * dayBlend;
  sky.material.uniforms.turbidity.value = turb;
  sky.material.uniforms.rayleigh.value = rayl;

  const elevation = Math.asin(THREE.MathUtils.clamp(sunVec.y, -1, 1));
  const key = `${Math.round(elevation * 24)}_${Math.round(dayBlend * 12)}`;
  if(key !== lastEnvKey){
    lastEnvKey = key;
    envSky.material.uniforms.sunPosition.value.copy(sunVec);
    envSky.material.uniforms.turbidity.value = turb;
    envSky.material.uniforms.rayleigh.value = rayl;
    const old = envRT;
    envRT = pmrem.fromScene(envScene, 0, 1, 900);
    scene.environment = envRT.texture;
    if(old) old.dispose();
  }

  if(starField) starField.material.opacity = Math.max(0, 1 - dayBlend * 1.6) * 0.95;

  // Horizon colour drives fog and ridge haze so everything agrees.
  const horizon = new THREE.Color().setHSL(
    0.58 - 0.05 * dayBlend,
    0.10 + 0.22 * dayBlend,
    0.035 + 0.72 * dayBlend
  );
  ridges.forEach(r => {
    r.mesh.material.color.copy(r.base).lerp(horizon, r.haze * (0.55 + 0.45 * dayBlend));
    if(dayBlend < 0.35){
      r.mesh.material.color.multiplyScalar(0.18 + 0.82 * (dayBlend / 0.35));
    }
  });
  return horizon;
}
export function disposeEnv(){
  if(envRT) envRT.dispose();
  if(pmrem) pmrem.dispose();
}
