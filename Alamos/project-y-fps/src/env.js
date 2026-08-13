// env.js — the Ponderosa forest, the noise helpers, and the ground function.
//
// This file used to build the whole environment — sky, lighting, mesa terrain,
// ridges, roads, stars — in 640 lines. `engine/world/outdoorTown.js` builds all of
// that from site.js now, and the four hundred lines that did it here are gone:
// `buildTerrain`, `buildRoads`, `setTerrainPads`, `buildRidges`, `initSky`,
// `updateSky`, `disposeEnv`, and the mesa heightfield itself. Nothing imported any
// of them after the flip. Deleted rather than left behind, because the mesa is one
// of the two places in this repo where a second answer to "where is the ground"
// has already shipped broken.
//
// What is left is what the town is still made of:
//
//   plantTrees          the Ponderosa forest, thinned in town, dense to the rim
//   srand / srandRange  the seeded random the whole place is laid out with
//   fbm                 value noise, for the bark and the foliage
//   terrainHeight       a door onto the engine's groundHeight
//
// `ROADS`, `onRoad`, `MESA_PLAYER_LIMIT`, `rimRadius` and `CANYON_DEPTH` look dead
// from outside and are not: `plantTrees` reads all five to decide where a tree may
// stand. The roads are declared twice on purpose — as `site.paths` for the engine
// to grade, and here as the rectangles the forest keeps out of.
//
// The mesa is a finger of the Pajarito Plateau at ~2200 m: flat top, hard canyon
// dropoffs, and a pine forest thinned by the Ranch School.
import * as THREE from 'three';
import { groundHeight as engineGroundHeight } from '../../gamekit/engine/world/outdoorSite.js';
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


/**
 * The ground, from the engine.
 *
 * This used to be the mesa's own heightfield, and it was the second source of
 * truth for the surface: the engine graded the visible terrain from
 * `outdoorSite.groundHeight` while `props.js` and `npcs.js` placed objects from
 * the version here, which agreed with it to about half a metre. House rule 4
 * exists because that disagreement has shipped broken twice, so there is one
 * function now and this is a door onto it.
 *
 * The heightfield it replaced is in the history, at the commit that flipped this
 * game onto the shared world layer. It was compared against the engine's 'mesa'
 * profile over 841 points before being retired: mean difference 0.06 m across the
 * town, and every worst case a building pad where the old surface noise dipped a
 * bench that is supposed to read level.
 */
export function terrainHeight(x, z){
  return engineGroundHeight(x, z);
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
