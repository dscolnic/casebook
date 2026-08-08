// interiorEnv.js — surfaces and light for an interior.
//
// Outdoors the realism came from sun, sky and terrain. Indoors it comes from
// three things: a suspended ceiling that reads as a real grid, sheet vinyl with
// welded seams and a coved base, and fluorescent light that is even, slightly
// cool, and bright enough to wash out shadows without erasing them.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CORRIDOR, ENVELOPE, CEILING_H, TILE_H } from './plan.js';

// ---------------------------------------------------------- deterministic rng
let seed = 20260807;
export function srand(){
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
}
export function srandRange(a, b){ return a + srand() * (b - a); }
export function resetSeed(v = 20260807){ seed = v >>> 0; }

function canvasTex(size, draw, repeatX = 1, repeatY = 1){
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatX, repeatY);
  t.anisotropy = 8;
  return t;
}

// ------------------------------------------------------------------ materials
/** Sheet vinyl: fine chip speckle, faint directional buff marks, low sheen. */
export function vinylFloorTexture(base = [214, 209, 198], chip = 0.5){
  return canvasTex(1024, (g, s) => {
    const img = g.createImageData(s, s);
    const d = img.data;
    for(let i = 0; i < d.length; i += 4){
      const n = Math.random();
      const v = (n - 0.5) * 26 * chip;
      d[i] = base[0] + v; d[i + 1] = base[1] + v; d[i + 2] = base[2] + v; d[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    // colour chips suspended in the vinyl
    for(let i = 0; i < 5200; i++){
      const x = Math.random() * s, y = Math.random() * s;
      const pick = Math.random();
      g.fillStyle = pick > 0.72 ? 'rgba(120,128,132,0.5)'
                  : pick > 0.44 ? 'rgba(178,166,144,0.5)'
                  : 'rgba(240,238,232,0.55)';
      g.fillRect(x, y, 1 + Math.random() * 2.4, 1 + Math.random() * 2);
    }
    // buffed swirl marks — every hospital floor has them
    g.strokeStyle = 'rgba(255,255,255,0.05)';
    for(let i = 0; i < 120; i++){
      const x = Math.random() * s, y = Math.random() * s, r = 20 + Math.random() * 90;
      g.lineWidth = 1 + Math.random() * 2;
      g.beginPath();
      g.arc(x, y, r, Math.random() * 6, Math.random() * 6 + 1);
      g.stroke();
    }
  }, 6, 6);
}

/** Painted gypsum: roller stipple, a touch of unevenness, no visible pattern. */
export function paintTexture(hex){
  const c = new THREE.Color(hex);
  const r = Math.round(c.r * 255), g0 = Math.round(c.g * 255), b = Math.round(c.b * 255);
  return canvasTex(512, (g, s) => {
    g.fillStyle = `rgb(${r},${g0},${b})`;
    g.fillRect(0, 0, s, s);
    for(let i = 0; i < 26000; i++){
      const x = Math.random() * s, y = Math.random() * s;
      g.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.03)';
      g.fillRect(x, y, 1.6, 1.6);
    }
  }, 3, 2);
}

/** 600 mm mineral fibre tile with a fissured face, seen from below. */
export function ceilingTileTexture(){
  return canvasTex(1024, (g, s) => {
    g.fillStyle = '#efeee9'; g.fillRect(0, 0, s, s);
    const cell = s / 4;                       // four tiles per texture tile
    // fissured surface
    for(let i = 0; i < 9000; i++){
      const x = Math.random() * s, y = Math.random() * s;
      g.fillStyle = 'rgba(150,148,140,0.16)';
      g.beginPath();
      g.ellipse(x, y, 1 + Math.random() * 5, 0.8 + Math.random() * 1.6, Math.random() * 3, 0, 6.3);
      g.fill();
    }
    // pinholes
    for(let i = 0; i < 4200; i++){
      g.fillStyle = 'rgba(120,118,110,0.30)';
      g.fillRect(Math.random() * s, Math.random() * s, 1.4, 1.4);
    }
    // exposed T-bar grid: bright aluminium with a shadow line either side
    for(let i = 0; i <= 4; i++){
      const p = i * cell;
      g.fillStyle = 'rgba(80,80,78,0.35)'; g.fillRect(p - 4, 0, 8, s); g.fillRect(0, p - 4, s, 8);
      g.fillStyle = '#d8d8d4'; g.fillRect(p - 2.5, 0, 5, s); g.fillRect(0, p - 2.5, s, 5);
      g.fillStyle = 'rgba(255,255,255,0.6)'; g.fillRect(p - 0.8, 0, 1.6, s); g.fillRect(0, p - 0.8, s, 1.6);
    }
  }, 1, 1);
}

/** Prismatic diffuser over a troffer — the thing you actually see overhead. */
export function diffuserTexture(){
  return canvasTex(256, (g, s) => {
    g.fillStyle = '#fdfcf6'; g.fillRect(0, 0, s, s);
    g.strokeStyle = 'rgba(190,192,186,0.55)'; g.lineWidth = 1.5;
    for(let i = 0; i < s; i += 9){
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, s); g.stroke();
      g.beginPath(); g.moveTo(0, i); g.lineTo(s, i); g.stroke();
    }
    // faint lamp bars behind the diffuser
    g.fillStyle = 'rgba(255,255,255,0.5)';
    g.fillRect(0, s * 0.28, s, s * 0.08);
    g.fillRect(0, s * 0.64, s, s * 0.08);
  }, 1, 1);
}

/** Laminate door leaf with a subtle vertical grain. */
export function doorTexture(hex = '#a98b63'){
  const c = new THREE.Color(hex);
  return canvasTex(512, (g, s) => {
    g.fillStyle = `rgb(${c.r * 255 | 0},${c.g * 255 | 0},${c.b * 255 | 0})`;
    g.fillRect(0, 0, s, s);
    g.strokeStyle = 'rgba(70,48,26,0.16)';
    for(let i = 0; i < 260; i++){
      const x = Math.random() * s;
      g.lineWidth = 0.6 + Math.random() * 1.8;
      g.beginPath(); g.moveTo(x, 0);
      g.bezierCurveTo(x + 5, s * 0.3, x - 5, s * 0.7, x, s);
      g.stroke();
    }
  }, 1, 1);
}

// Shared material cache so the whole floor is a handful of programs.
const cache = new Map();
export function mat(key, make){
  let m = cache.get(key);
  if(!m){ m = make(); cache.set(key, m); }
  return m;
}
export function clearMaterialCache(){ cache.clear(); }

export const PALETTE = {
  floorCorridor: [212, 206, 194],
  floorRoom:     [206, 210, 206],
  wall:          '#e9e7df',
  wallAccent:    '#cdd9d6',
  base:          '#5d6169',   // coved vinyl base
  rail:          '#8d9299',   // crash rail
  doorLeaf:      '#a98b63',
  frame:         '#b9bcc0',
  glass:         0x1b2126,
};

// --------------------------------------------------------------------- lights
/**
 * Fluorescent troffers plus daylight at the glazed ends.
 * One shadow-casting downlight does the contact shadows for the whole floor —
 * a shadow map per ceiling fixture would be unaffordable and would not look
 * any better under diffuse light.
 */
export function buildLighting(scene, renderer){
  // Soft interior IBL. RoomEnvironment is exactly the right tool here: it is a
  // box of emissive panels, which is what a lit interior actually is.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(renderer), 0.04);
  scene.environment = envRT.texture;
  scene.userData.envRT = envRT;
  pmrem.dispose();

  // Base fill, cool like fluorescent tubes. Carries most of the room light:
  // a real fixture per troffer meant ~28 point lights, which costs a fragment
  // pass each and dropped the floor to 20 fps for no visible gain under
  // lighting this diffuse.
  const ambient = new THREE.AmbientLight(0xdfe6ea, 0.95);
  scene.add(ambient);
  scene.userData.ambient = ambient;
  // A little vertical gradient so ceilings read brighter than floors.
  const hemi = new THREE.HemisphereLight(0xf2f6f7, 0x9aa0a4, 0.55);
  scene.add(hemi);
  scene.userData.hemi = hemi;

  // The single shadow caster, straight down the corridor.
  const key = new THREE.DirectionalLight(0xf4f6f2, 1.35);
  key.position.set(2.5, 24, 20);
  key.target.position.set(0, 0, 20);
  scene.add(key.target);
  key.castShadow = true;
  const res = renderer.capabilities.maxTextureSize >= 8192 ? 4096 : 2048;
  key.shadow.mapSize.set(res, res);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 46;
  key.shadow.camera.left = -12; key.shadow.camera.right = 12;
  key.shadow.camera.top = 32;   key.shadow.camera.bottom = -32;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  scene.userData.key = key;

  // A handful of pools down the corridor for a sense of pooling light. Four is
  // the whole budget — every extra point light is a per-fragment cost.
  scene.userData.fixtures = [];
  const span = CORRIDOR.z1 - CORRIDOR.z0;
  for(let i = 0; i < 4; i++){
    const z = CORRIDOR.z0 + span * (i + 0.5) / 4;
    const l = new THREE.PointLight(0xeaf2f4, 5.5, 17, 2);
    l.position.set(0, TILE_H - 0.15, z);
    scene.add(l);
    scene.userData.fixtures.push(l);
  }

  // Daylight through the end glazing, warmer and directional.
  const day = new THREE.DirectionalLight(0xfff0d8, 0.85);
  day.position.set(0, 6, ENVELOPE.z0 - 14);
  day.target.position.set(0, 1.4, ENVELOPE.z0 + 12);
  scene.add(day.target, day);
  scene.userData.day = day;

  return { ambient, key, day };
}

/**
 * Rooms are lit by ambient, the IBL and their own emissive troffers rather
 * than by a light object each — no-op kept so the world builder reads the
 * same as the outdoor version.
 */
export function addRoomLight(){ return null; }

export { CEILING_H, TILE_H };
