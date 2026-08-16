// materials.js — texture generators and a material cache, shared by every theme.
//
// All of these draw to a canvas at build time rather than loading image files,
// so a theme ships no assets and a new surface is a few lines of 2D drawing.
import * as THREE from 'three';
import { wantsTouch } from '../device.js';

// ---------------------------------------------------------- deterministic rng
// Themes must look identical on every reload, so nothing visual may use
// Math.random() during construction.
let seed = 1;
export function resetSeed(v = 1){ seed = v >>> 0 || 1; }
export function srand(){
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
}
export function srandRange(a, b){ return a + srand() * (b - a); }
export function srandPick(arr){ return arr[Math.floor(srand() * arr.length)]; }

// ------------------------------------------------------------- value noise
function hash2(x, y){
  let h = (x * 374761393 + y * 668265263) | 0;
  h = ((h ^ (h >> 13)) * 1274126177) | 0;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}
export function vnoise(x, y){
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

// ------------------------------------------------------------------ textures
export function canvasTex(size, draw, repeatX = 1, repeatY = 1){
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

/** Sheet vinyl / resin floor: chip speckle, buff swirls, low sheen. */
export function sheetFloorTexture(base = [214, 209, 198], chip = 0.5){
  return canvasTex(1024, (g, s) => {
    const img = g.createImageData(s, s), d = img.data;
    for(let i = 0; i < d.length; i += 4){
      const v = (srand() - 0.5) * 26 * chip;
      d[i] = base[0] + v; d[i + 1] = base[1] + v; d[i + 2] = base[2] + v; d[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    for(let i = 0; i < 5200; i++){
      const pick = srand();
      g.fillStyle = pick > 0.72 ? 'rgba(120,128,132,0.5)'
                  : pick > 0.44 ? 'rgba(178,166,144,0.5)' : 'rgba(240,238,232,0.55)';
      g.fillRect(srand() * s, srand() * s, 1 + srand() * 2.4, 1 + srand() * 2);
    }
    g.strokeStyle = 'rgba(255,255,255,0.05)';
    for(let i = 0; i < 120; i++){
      g.lineWidth = 1 + srand() * 2;
      g.beginPath();
      g.arc(srand() * s, srand() * s, 20 + srand() * 90, srand() * 6, srand() * 6 + 1);
      g.stroke();
    }
  }, 6, 6);
}

/** Painted plasterboard: roller stipple, no readable pattern. */
export function paintTexture(hex){
  const c = new THREE.Color(hex);
  const r = c.r * 255 | 0, g0 = c.g * 255 | 0, b = c.b * 255 | 0;
  return canvasTex(512, (g, s) => {
    g.fillStyle = `rgb(${r},${g0},${b})`;
    g.fillRect(0, 0, s, s);
    for(let i = 0; i < 26000; i++){
      g.fillStyle = srand() > 0.5 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.03)';
      g.fillRect(srand() * s, srand() * s, 1.6, 1.6);
    }
  }, 3, 2);
}

/** Mineral-fibre ceiling tile on an exposed T-bar grid, seen from below. */
export function ceilingTileTexture(tilesPerTexture = 4){
  return canvasTex(1024, (g, s) => {
    g.fillStyle = '#efeee9'; g.fillRect(0, 0, s, s);
    const cell = s / tilesPerTexture;
    for(let i = 0; i < 9000; i++){
      g.fillStyle = 'rgba(150,148,140,0.16)';
      g.beginPath();
      g.ellipse(srand() * s, srand() * s, 1 + srand() * 5, 0.8 + srand() * 1.6, srand() * 3, 0, 6.3);
      g.fill();
    }
    for(let i = 0; i < 4200; i++){
      g.fillStyle = 'rgba(120,118,110,0.30)';
      g.fillRect(srand() * s, srand() * s, 1.4, 1.4);
    }
    for(let i = 0; i <= tilesPerTexture; i++){
      const p = i * cell;
      g.fillStyle = 'rgba(80,80,78,0.35)'; g.fillRect(p - 4, 0, 8, s); g.fillRect(0, p - 4, s, 8);
      g.fillStyle = '#d8d8d4'; g.fillRect(p - 2.5, 0, 5, s); g.fillRect(0, p - 2.5, s, 5);
      g.fillStyle = 'rgba(255,255,255,0.6)'; g.fillRect(p - 0.8, 0, 1.6, s); g.fillRect(0, p - 0.8, s, 1.6);
    }
  });
}

/** Prismatic diffuser over a recessed fixture. */
export function diffuserTexture(){
  return canvasTex(256, (g, s) => {
    g.fillStyle = '#fdfcf6'; g.fillRect(0, 0, s, s);
    g.strokeStyle = 'rgba(190,192,186,0.55)'; g.lineWidth = 1.5;
    for(let i = 0; i < s; i += 9){
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, s); g.stroke();
      g.beginPath(); g.moveTo(0, i); g.lineTo(s, i); g.stroke();
    }
    g.fillStyle = 'rgba(255,255,255,0.5)';
    g.fillRect(0, s * 0.28, s, s * 0.08);
    g.fillRect(0, s * 0.64, s, s * 0.08);
  });
}

/** Laminate or timber leaf with a vertical grain. */
export function grainTexture(hex = '#a98b63'){
  const c = new THREE.Color(hex);
  return canvasTex(512, (g, s) => {
    g.fillStyle = `rgb(${c.r * 255 | 0},${c.g * 255 | 0},${c.b * 255 | 0})`;
    g.fillRect(0, 0, s, s);
    g.strokeStyle = 'rgba(70,48,26,0.16)';
    for(let i = 0; i < 260; i++){
      const x = srand() * s;
      g.lineWidth = 0.6 + srand() * 1.8;
      g.beginPath(); g.moveTo(x, 0);
      g.bezierCurveTo(x + 5, s * 0.3, x - 5, s * 0.7, x, s);
      g.stroke();
    }
  });
}

/** Vertical board-and-batten siding, for outdoor themes. */
export function boardTexture(base){
  return canvasTex(512, (g, s) => {
    g.fillStyle = base; g.fillRect(0, 0, s, s);
    for(let i = 0; i < 2600; i++){
      g.fillStyle = srand() > 0.5 ? 'rgba(0,0,0,0.055)' : 'rgba(255,255,255,0.05)';
      g.fillRect(srand() * s, srand() * s, 2, 1);
    }
    for(let x = 0; x < s; x += 32){
      g.fillStyle = 'rgba(0,0,0,0.20)'; g.fillRect(x, 0, 2, s);
      g.fillStyle = 'rgba(0,0,0,0.10)'; g.fillRect(x + 3, 0, 5, s);
      g.fillStyle = 'rgba(255,255,255,0.045)'; g.fillRect(x + 8, 0, 3, s);
    }
  });
}

// --------------------------------------------------------------------- cache
const cache = new Map();
/** Shared material by key, so a whole level is a handful of shader programs. */
export function mat(key, make){
  let m = cache.get(key);
  if(!m){ m = make(); cache.set(key, m); }
  return m;
}
export function clearMaterialCache(){ cache.clear(); }

/**
 * Glass that reads as glass: dark and reflective, not pale blue. A light blue
 * translucent plane reads as painted-on in every build we have tried.
 */
export function glassMaterial(opts = {}){
  return new THREE.MeshStandardMaterial({
    color: opts.color ?? 0x14181c,
    roughness: opts.roughness ?? 0.06,
    metalness: opts.metalness ?? 0.88,
    envMapIntensity: opts.envMapIntensity ?? 1.4,
    emissive: opts.emissive ?? 0xffb460,
    emissiveIntensity: 0,
  });
}

/**
 * Damp the environment map on matte surfaces. three r160 has no
 * scene.environmentIntensity, and a full-strength IBL on every diffuse surface
 * flattens the shadows to nothing.
 */
export function dampEnvironment(scene, level = 0.4, roughnessAbove = 0.55){
  const seen = new Set();
  scene.traverse(o => {
    const mats = Array.isArray(o.material) ? o.material : (o.material ? [o.material] : []);
    for(const m of mats){
      if(!m.isMeshStandardMaterial || seen.has(m)) continue;
      seen.add(m);
      if(m.roughness > roughnessAbove) m.envMapIntensity = level;
    }
  });
}

/**
 * Set up a renderer for the machine it is actually running on.
 *
 * Five modules create a renderer — three engine worlds and the two themes that
 * bring their own — and every one of them wrote the same four lines. They are
 * here instead, because the numbers are a device decision rather than a world
 * decision and a tablet budget applied in three places out of five is worse
 * than none.
 *
 * What a phone or tablet gets, and why:
 *
 * - **Pixel ratio 1.5 rather than 2.** A tablet reports 2, which on a 1180-wide
 *   iPad is a 2360 px buffer — the same fragment count as a 4K monitor, for a
 *   GPU with a fraction of the power. 1.5 is 44% fewer fragments and, at that
 *   density, not a difference you can see. This is the one lever that costs
 *   nothing visually.
 * - **PCF rather than PCFSoft shadows.** Fewer taps per shadow lookup. The
 *   edges harden slightly; the alternative is a slideshow.
 *
 * What it deliberately does not change is the draw call count, which is the
 * real cost — Red Sand issues about 1,500 a frame from 1,973 meshes, 1,601 of
 * them shadow casters. That is a content problem (instancing, and not every
 * bolt needing to cast), not something a renderer flag can fix.
 */
export function tuneRendererForDevice(renderer){
  const mobile = wantsTouch();
  const dpr = typeof devicePixelRatio === 'number' ? devicePixelRatio : 1;
  renderer.setPixelRatio(Math.min(dpr, mobile ? 1.5 : 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = mobile ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
  return renderer;
}
