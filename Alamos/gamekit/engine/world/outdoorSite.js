// outdoorSite.js — builds an outdoor site from a terrain config, for any theme.
//
// Generalised out of the Los Alamos build. What it produces — a physical sky,
// a heightfield with graded building pads and feathered paths, ranks of hazed
// ridges on the horizon, and instanced vegetation — is a zoo path, a research
// campus or a field station as readily as a mesa townsite.
//
// The one rule this file exists to enforce: `groundHeight(x, z)` is the single
// source of truth for the surface. The visible mesh is built from it, and pads
// and paths are applied *inside* it, so nothing standing on the ground can ever
// disagree with the ground. Getting this wrong sank every person 0.36 m into
// the terrain in the first build.
import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { canvasTex, fbm, vnoise, srand, srandRange } from './materials.js';

export const TERRAIN_DEFAULTS = {
  size: 760,               // extent of the ground mesh
  segments: 300,
  playerLimit: 105,        // keep the player on ground the profile guarantees flat
  profile: 'mesa',         // 'mesa' | 'rolling' | 'flat' | 'range'
  // 'range' only: named summits, each a smooth radial rise out of a basin.
  // A campaign whose sites are kilometres apart needs real landform between
  // them, or the distance is just a long walk over nothing.
  summits: [],             // [{ x, z, r, height, sharp }]
  basin: -40,              // where the ground sits between the summits
  relief: 1.0,             // vertical scale of the surface undulation
  // 'mesa': a flat top with a hard rim. `rimRadius` may be a number or a
  // function of the bearing — see `rimRadius()` — and a shaped one is how a
  // headland is built. `farRise` beyond the map extent leaves the ground down
  // at the foot of the drop, which is what a sea needs under it.
  mesa: { rimRadius: 122, rimWobble: [6, 4, 2], dropDepth: 62, dropRun: 52, farRise: 230 },
  // 'gorge' only: a valley with a dam across it. Heights are metres above the
  // valley floor at the toe, which is where the powerhouse stands.
  gorge: {
    crestY: 96,            // the top of the wall, and the walk along it
    damHalfDepth: 7,       // half the crest's own width, upstream to downstream
    gorgeHalfWidth: 96,    // how far the notch runs before the rock climbs
    abutmentHeight: 132,   // how high the rock gets outside the notch
    abutmentRun: 150,      // and how far it takes to get there
    bedFoot: 34,           // reservoir bed at the foot of the upstream face
    bedFar: 8,             // and out in the middle of the pool
    bedRun: 300,
    toeY: 0,               // the valley floor below the dam
    faceRun: 120,          // how far the downstream face runs out to it
  },
  ground: {
    // Kept a stop darker and more saturated than it looks on the canvas: under
    // a strong sun with ACES tone mapping a pale albedo blows out to sand.
    base: [116, 96, 68], spread: [76, 66, 50], repeat: 12, normalRepeat: 150,
  },
};

// --------------------------------------------------------------- ground truth
let PADS = [];
let PATHS = [];
let BED = null;
let CFG = { ...TERRAIN_DEFAULTS };

/**
 * Register the graded benches under buildings *before* anything asks for a
 * height. Anything inside a pad reads as level, with a soft margin so the edge
 * is walkable rather than a step.
 */
export function setPads(boxes, margin = 4){
  PADS = boxes.map(b => ({ x0: b.min.x, x1: b.max.x, z0: b.min.z, z1: b.max.z, m: margin }));
}
/** Register path corridors, which are graded flat like a real roadbed. */
export function setPaths(paths){ PATHS = paths.slice(); }

/**
 * Register the river bed, so a water plane has somewhere to sit.
 *
 * `buildWater` drew its plane at `water.level` and nothing ever lowered the
 * ground under it, so on a 'flat' profile the terrain sat ~0.8 m *above* the
 * water and Riverton's river — the thing the site's own header calls the north
 * edge of the city — was buried and had never once been visible. The water was
 * even marked `ignoreAudit` for being below the floor, which is exactly the
 * symptom.
 *
 * The bed is cut to `level - depthBelow` inside the footprint and feathered back
 * up to the terrain over `shore` metres, so there is a bank rather than a step.
 * Registered before the first height query, like the pads, because the visible
 * mesh is built from this function and the two cannot be allowed to disagree.
 */
export function setWaterBed(bed){ BED = bed ? { ...bed } : null; }

/** How much of this point is river bed: 1 inside, feathered to 0 up the bank. */
function bedWeight(x, z){
  if(!BED) return 0;
  const hx = BED.width / 2, hz = BED.depth / 2;
  const dx = Math.max(0, Math.abs(x - BED.cx) - hx);
  const dz = Math.max(0, Math.abs(z - BED.cz) - hz);
  const d = Math.max(dx, dz);
  if(d >= BED.shore) return 0;
  const t = 1 - d / BED.shore;
  return t * t * (3 - 2 * t);
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
/** The pad with the strongest claim on this point, and its centre. */
function nearestPad(x, z){
  let best = null, bestW = 0;
  for(const p of PADS){
    if(x < p.x0 - p.m || x > p.x1 + p.m || z < p.z0 - p.m || z > p.z1 + p.m) continue;
    const dx = Math.max(0, p.x0 - x, x - p.x1);
    const dz = Math.max(0, p.z0 - z, z - p.z1);
    const t = 1 - Math.min(1, Math.max(dx, dz) / p.m);
    const w = t * t * (3 - 2 * t);            // smooth, so the edge is walkable
    if(w > bestW){ bestW = w; best = p; }
  }
  if(!best) return null;
  return { w: bestW, cx: (best.x0 + best.x1) / 2, cz: (best.z0 + best.z1) / 2 };
}

export function onPath(x, z, pad = 1.5){
  for(const p of PATHS){
    if(Math.abs(x - p.cx) < p.w / 2 + pad && Math.abs(z - p.cz) < p.d / 2 + pad) return true;
  }
  return false;
}

/**
 * How much of a road is at this point, 0 outside and 1 in the middle of one,
 * with a soft edge. `onPath` answers yes or no, which is right for grading
 * surface noise and wrong for anything that has to taper.
 */
export function pathWeight(x, z, feather = 8){
  let best = 0;
  for(const p of PATHS){
    const dx = Math.abs(x - p.cx) - p.w / 2, dz = Math.abs(z - p.cz) - p.d / 2;
    const out = Math.max(dx, dz);
    const t = Math.max(0, Math.min(1, 1 - out / feather));
    best = Math.max(best, t * t * (3 - 2 * t));
  }
  return best;
}

/**
 * How far the flat top reaches on a given bearing.
 *
 * `mesa.rimRadius` may be a **function of the bearing** as well as a number, in
 * the same spirit as a horizon rank's `amp`: given the angle it returns the
 * radius. That is what turns a mesa into a headland — a plateau that reaches a
 * long way on one bearing and stops short everywhere else is a promontory with a
 * neck, and the neck is a causeway once there is water round it.
 *
 * The wobble is added either way, so a shaped rim still gets a coastline rather
 * than a drawn circle. A theme that wants a *hard* edge on some bearing sets
 * `rimWobble: [0, 0, 0]`.
 */
function rimRadius(ang){
  const m = CFG.mesa, [a, b, c] = m.rimWobble;
  const base = typeof m.rimRadius === 'function' ? m.rimRadius(ang) : m.rimRadius;
  return base + Math.sin(ang * 3.1) * a + Math.cos(ang * 5.7) * b + Math.sin(ang * 11.3) * c;
}

/**
 * The macro landform for 'range': a basin with summits rising out of it.
 *
 * Each summit is a smooth radial rise, so a helicopter crossing between two of
 * them flies over something rather than across a plain with buildings on it.
 * Kept separate from `groundHeight` because the pad blending below has to be
 * able to ask for the height at a pad's centre without recursing.
 */
function rangeHeight(x, z){
  let h = CFG.basin;
  for(const s of CFG.summits ?? []){
    const d = Math.hypot(x - s.x, z - s.z);
    if(d > s.r) continue;
    const t = 1 - d / s.r;                    // 1 at the peak, 0 at the foot
    const shaped = s.sharp ? Math.pow(t, 1.6) : t * t * (3 - 2 * t);
    h += s.height * shaped;
  }
  // Ridges and gullies between the summits, at a scale you notice from the air.
  return h + (fbm(x * 0.0022 + 61, z * 0.0022 + 23, 4) - 0.5) * 26 * CFG.relief;
}

/**
 * The macro landform for 'gorge': a valley with a dam wall across it.
 *
 * Written because a game about a reservoir whose reservoir you never see is the
 * wrong build, and because a dam wall made of props is a wall the player walks
 * through — the ground has exactly one source of truth here, so the dam has to
 * *be* terrain if the crest is to be walkable.
 *
 * The cross-section, going downstream (+z):
 *
 *   z < -damHalf     the reservoir bed, dropping away under the water
 *   |z| < damHalf    the wall: a flat crest at `crestY` across the gorge
 *   z > damHalf      the downstream face, then the valley floor at the toe
 *
 * and across the gorge (x), the ground climbs steeply into the abutments
 * outside `gorgeHalfWidth`, which is what stops the player walking round the
 * end of the dam and what makes the wall read as jammed into a notch in rock.
 */
function gorgeHeight(x, z){
  const g = CFG.gorge;
  const half = g.damHalfDepth;
  // The abutments: rock rising on both sides of the notch.
  const out = Math.max(0, Math.abs(x) - g.gorgeHalfWidth);
  const wall = out <= 0 ? 0
    : g.abutmentHeight * Math.min(1, Math.pow(out / g.abutmentRun, 0.85));

  let base;
  if(z <= -half){
    // Upstream: the bed falls away from the foot of the wall.
    const t = Math.min(1, (-z - half) / g.bedRun);
    base = g.bedFoot + (g.bedFar - g.bedFoot) * (t * t * (3 - 2 * t));
  } else if(z >= half){
    // Downstream: the face, then the valley floor at the toe.
    const t = Math.min(1, (z - half) / g.faceRun);
    const eased = 1 - Math.pow(1 - t, 2.2);
    base = g.crestY + (g.toeY - g.crestY) * eased;
  } else {
    base = g.crestY;
  }
  // Inside the notch the wall dominates; on the abutments the rock does.
  return Math.max(base, wall > 0 ? Math.min(wall, g.abutmentHeight) : base);
}

/**
 * A surface rupture: a straight line across the map with the ground on one side
 * standing higher than the other.
 *
 * It lives in the terrain rather than in a props file because the ground has
 * exactly one source of truth here — a scarp built as geometry would be a step
 * the player walks straight through, and a step in `groundHeight` with no
 * geometry is an invisible wall. Declared as
 * `terrain.scarp = { x0, z0, x1, z1, throw, width }`, where `throw` is the
 * vertical offset in metres and `width` is how far the ground takes to make it.
 *
 * Kestrel Bay is the reason it exists: an earthquake game whose fault does not
 * appear in the landscape is teaching about something the player cannot see.
 */
function scarpLift(x, z){
  const sc = CFG.scarp;
  if(!sc) return 0;
  const dx = (sc.x1 ?? 0) - (sc.x0 ?? 0), dz = (sc.z1 ?? 0) - (sc.z0 ?? 0);
  const len = Math.hypot(dx, dz) || 1;
  // Signed perpendicular distance from the trace: positive on the upthrown side.
  const side = ((x - (sc.x0 ?? 0)) * dz - (z - (sc.z0 ?? 0)) * dx) / len;
  const half = Math.max(0.5, (sc.width ?? 6) / 2);
  const t = Math.max(0, Math.min(1, side / half * 0.5 + 0.5));
  // Ramped through the roads. Two reasons, and they agree: a path is drawn as a
  // single flat plane at the height of its centre, so a step under one leaves
  // the decal standing a metre and a half proud of the ground — which is what
  // "a road structure that cuts people off at chest level" turned out to be.
  // And it is what actually happens within days of a rupture: crews push a ramp
  // over the scarp so vehicles can cross. Off the road it stands full height.
  const road = sc.rampRoads === false ? 0 : pathWeight(x, z);
  return (sc.throw ?? 1.8) * (t * t * (3 - 2 * t)) * (1 - road);
}

/** Surface detail, before any pad or path grading. */
function surfaceNoise(x, z){
  return ((fbm(x * 0.012 + 11, z * 0.012 + 7, 4) - 0.5) * 1.0
        + (fbm(x * 0.07 + 3, z * 0.07 + 5, 3) - 0.5) * 0.25) * CFG.relief;
}

/** THE height function. Everything — mesh, props, people — uses this. */
export function groundHeight(x, z){
  const h = surfaceHeight(x, z);
  // The river bed last, and on every profile: a channel is cut into whatever
  // landform the theme chose, and a pad or a path inside the footprint would
  // otherwise grade the bed back up to street level.
  if(!BED) return h;
  const w = bedWeight(x, z);
  return w <= 0 ? h : h + (BED.floor - h) * w;
}

function surfaceHeight(x, z){
  // 'range' folds the scarp into its own pad grading, so it must not be added
  // twice: a bench cut on the upthrown side has to level at the height it
  // actually stands at.
  return (CFG.profile === 'range' || CFG.profile === 'gorge')
    ? baseSurfaceHeight(x, z) : baseSurfaceHeight(x, z) + scarpLift(x, z);
}

function baseSurfaceHeight(x, z){
  // 'range' grades the *whole* height into a pad, not just the surface noise:
  // a bench cut into a mountainside has to be level, and damping the ripple on
  // a 1-in-3 slope leaves a building standing on a hill.
  if(CFG.profile === 'gorge'){
    // Same pad treatment as 'range': a bench cut into a steep place has to be
    // level, and damping only the ripple leaves a building standing on a slope.
    const raw = (px, pz) => gorgeHeight(px, pz)
      + surfaceNoise(px, pz) * (onPath(px, pz, 3) ? 0.05 : 0.35);
    const pad = nearestPad(x, z);
    const here = raw(x, z);
    if(!pad || pad.w <= 0) return here;
    const level = raw(pad.cx, pad.cz);
    return here + (level - here) * pad.w;
  }
  if(CFG.profile === 'range'){
    const raw = (px, pz) => rangeHeight(px, pz) + scarpLift(px, pz)
      + surfaceNoise(px, pz) * (onPath(px, pz, 3) ? 0.08 : 1);
    const pad = nearestPad(x, z);
    const here = raw(x, z);
    if(!pad || pad.w <= 0) return here;
    const level = raw(pad.cx, pad.cz);
    return here + (level - here) * pad.w;
  }
  let surf = surfaceNoise(x, z);
  if(onPath(x, z, 3)) surf *= 0.08;
  if(PADS.length) surf *= 1 - padWeight(x, z);
  if(CFG.profile === 'flat') return surf * 0.15;
  if(CFG.profile === 'rolling'){
    return surf + (fbm(x * 0.004 + 31, z * 0.004 + 17, 3) - 0.5) * 9 * CFG.relief;
  }
  // 'mesa': flat top, hard dropoff at the rim, the next landform rising beyond
  const m = CFG.mesa;
  const r = Math.hypot(x, z);
  const rim = rimRadius(Math.atan2(z, x));
  if(r < rim) return surf;
  const t = Math.min(1, (r - rim) / m.dropRun);
  const s = t * t * (3 - 2 * t);
  let far = 0;
  if(r > m.farRise){ const f = Math.min(1, (r - m.farRise) / 70); far = f * f * (3 - 2 * f); }
  const opposite = far * (m.dropDepth * 0.9 + (fbm(x * 0.006 + 3, z * 0.006 + 9, 3) - 0.5) * 26);
  return surf * (1 - s) - m.dropDepth * s + opposite;
}

// -------------------------------------------------------------------- surface
function groundColourTexture(){
  const { base, spread, repeat } = CFG.ground;
  return canvasTex(2048, (g, s) => {
    const img = g.createImageData(s, s), d = img.data;
    for(let y = 0; y < s; y++){
      for(let x = 0; x < s; x++){
        const u = x / s * 8, v = y / s * 8;
        const broad = fbm(u * 0.9, v * 0.9, 3);
        const mid = fbm(u * 5.5 + 40, v * 5.5 + 40, 4);
        const fine = vnoise(u * 46, v * 46);
        const n = broad * 0.5 + mid * 0.32 + fine * 0.18;
        let r = base[0] + n * spread[0], gg = base[1] + n * spread[1], b = base[2] + n * spread[2];
        if(mid > 0.66){ r -= 22; gg -= 20; b -= 14; }
        if(fine > 0.86){ r += 32; gg += 30; b += 26; }
        const i = (y * s + x) * 4;
        d[i] = r; d[i + 1] = gg; d[i + 2] = b; d[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    for(let i = 0; i < 5200; i++){
      g.fillStyle = srand() > 0.45 ? 'rgba(70,58,42,0.30)' : 'rgba(226,214,188,0.26)';
      g.beginPath(); g.arc(srand() * s, srand() * s, srand() * 2.6, 0, 6.3); g.fill();
    }
  }, repeat, repeat);
}
function groundNormalTexture(){
  const size = 512;
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d');
  const img = g.createImageData(size, size), d = img.data;
  const h = (x, y) => fbm(x / size * 24, y / size * 24, 4);
  for(let y = 0; y < size; y++){
    for(let x = 0; x < size; x++){
      const nx = (h((x - 1 + size) % size, y) - h((x + 1) % size, y)) * 2.2;
      const ny = (h(x, (y - 1 + size) % size) - h(x, (y + 1) % size)) * 2.2;
      const len = Math.hypot(nx, ny, 1);
      const i = (y * size + x) * 4;
      d[i] = ((nx / len) * 0.5 + 0.5) * 255;
      d[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      d[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      d[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(CFG.ground.normalRepeat, CFG.ground.normalRepeat);
  t.anisotropy = 4;
  return t;
}

export function buildTerrain(scene){
  const geo = new THREE.PlaneGeometry(CFG.size, CFG.size, CFG.segments, CFG.segments);
  const pos = geo.attributes.position;
  for(let i = 0; i < pos.count; i++){
    pos.setZ(i, groundHeight(pos.getX(i), -pos.getY(i)));
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  const ground = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    map: groundColourTexture(),
    normalMap: groundNormalTexture(),
    normalScale: new THREE.Vector2(0.65, 0.65),
    // Fully rough, and taking only a third of the sky IBL. At the default
    // envMapIntensity of 1 the ground picks up the whole bright dome on top of
    // the sun and blows out to near-white however dark its albedo is set — the
    // ground-colour comment above is only half the defence against that.
    roughness: 1.0, metalness: 0, envMapIntensity: 0.35,
  }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.name = 'terrain';
  // The ground *is* the floor, and the sky, stars and horizon ranks are meant to
  // sit far below it. Exempting them keeps engine/dev/audit.js's below-floor rule
  // pointed at the things that rule exists to catch — props and people.
  ground.userData.ignoreAudit = true;
  scene.add(ground);
  return ground;
}

// ----------------------------------------------------------------- pathways
/**
 * Path surface. The across-path edges fade out with a ragged noise mask, so a
 * track meets the ground the way a graded path does instead of looking like a
 * sheet laid on top of it.
 */
/**
 * The surface of a route.
 *
 * `tone` is the per-channel offset that makes it grit: red highest, blue
 * lowest, which is soil and gravel everywhere. A site whose ground is snow
 * needs the offsets the other way round, and a material tint cannot do it —
 * multiplying a warm texture by a cold colour scales the warmth, it does not
 * remove it. So the tone goes into the texture, and every existing site keeps
 * the default it was drawn with.
 */
function pathTexture(dark, acrossAxis, tone = [0, -6, -20], lift = 0){
  return canvasTex(1024, (g, s) => {
    const img = g.createImageData(s, s), d = img.data;
    for(let y = 0; y < s; y++){
      for(let x = 0; x < s; x++){
        const u = x / s * 6, v = y / s * 6;
        const n = fbm(u * 1.6, v * 1.6, 3) * 0.6 + vnoise(u * 30, v * 30) * 0.4;
        const base = (dark ? 84 : 112) + lift;
        const i = (y * s + x) * 4;
        d[i] = base + tone[0] + n * 44;
        d[i + 1] = base + tone[1] + n * 40;
        d[i + 2] = base + tone[2] + n * 32;
        const t = (acrossAxis === 'y' ? y : x) / s;
        const edge = Math.min(t, 1 - t) * 2;
        const ragged = 0.16 + vnoise(u * 9, v * 9) * 0.18;
        d[i + 3] = Math.round(255 * Math.min(1, Math.max(0, edge / ragged)));
      }
    }
    g.putImageData(img, 0, 0);
    for(let i = 0; i < 70; i++){
      const y = srand() * s;
      g.strokeStyle = srand() > 0.5 ? 'rgba(48,38,26,0.11)' : 'rgba(198,182,152,0.08)';
      g.lineWidth = 1 + srand() * 3;
      g.beginPath(); g.moveTo(0, y);
      g.bezierCurveTo(s * 0.3, y + (srand() - 0.5) * 30, s * 0.7, y + (srand() - 0.5) * 30, s, y);
      g.stroke();
    }
  });
}

export function buildPaths(scene, paths){
  const tex = {
    shoulderX: pathTexture(false, 'x'), shoulderY: pathTexture(false, 'y'),
    wornX: pathTexture(true, 'x'), wornY: pathTexture(true, 'y'),
  };
  // A path may bring its own surface. Built per path rather than once, because
  // only a site that asks pays for the extra canvases.
  const surfaceFor = (p, worn, long) => {
    if(!p.tone && !p.lift) return long
      ? (worn ? tex.wornX : tex.shoulderX)
      : (worn ? tex.wornY : tex.shoulderY);
    return pathTexture(worn, long ? 'x' : 'y', p.tone, p.lift ?? 0);
  };
  paths.forEach((p, idx) => {
    const long = p.d > p.w;
    // The decal is *draped* over the ground, not laid flat at the height of its
    // centre. It was one flat plane for seven games because their terrain sits
    // near y = 0 under a road; the first site with a road across a mountain
    // saddle drew a 190-metre slab that was buried at one end and hanging twenty
    // metres in the air at the other — "a walkway coming out of the hill from
    // both sides that floats and you cannot walk on". Grading the landform flat
    // under a path is the other fix and it is wrong here: it would cut a
    // twenty-metre trench through the saddle. So the mesh follows
    // `groundHeight`, which stays the one source of truth for where the ground
    // is, and a path may now run over any slope.
    const surface = (t, rough, lift, order) => {
      const W = long ? (t.worn ? p.worn : p.w) : p.w;
      const D = long ? p.d : (t.worn ? p.worn : p.d);
      const g = new THREE.PlaneGeometry(W, D,
        Math.max(1, Math.round(W / 4)), Math.max(1, Math.round(D / 4)));
      // Rotated -90° about X, a plane's local (x, y, z) lands at world
      // (cx + x, z, cz - y): the local *z* is the height to displace.
      const pos = g.attributes.position;
      for(let i = 0; i < pos.count; i++){
        const x = p.cx + pos.getX(i), z = p.cz - pos.getY(i);
        pos.setZ(i, groundHeight(x, z) + lift);
      }
      pos.needsUpdate = true;
      g.computeVertexNormals();
      const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
        map: t.map, roughness: rough, metalness: 0,
        // The path texture is grit: warm, and right for a road. A site whose
        // ground is not soil needs it tinted rather than replaced — a groomed
        // snow route drawn in the default colours is a brown road across an ice
        // sheet, which no check can see and every screenshot shows.
        color: p.colour ?? 0xffffff,
        transparent: true, depthWrite: false,
        polygonOffset: true, polygonOffsetFactor: -2,
      }));
      m.rotation.x = -Math.PI / 2;
      m.position.set(p.cx, 0, p.cz);
      m.renderOrder = order;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    };
    const st = surfaceFor(p, false, long).clone(); st.needsUpdate = true;
    st.repeat.set(long ? 1 : Math.max(2, p.w / 26), long ? Math.max(2, p.d / 26) : 1);
    surface({ map: st }, 0.97, 0.05 + idx * 0.004, 1 + idx * 2);
    if(p.worn){
      const wt = surfaceFor(p, true, long).clone(); wt.needsUpdate = true;
      wt.repeat.set(long ? 1 : Math.max(2, p.w / 22), long ? Math.max(2, p.d / 22) : 1);
      surface({ map: wt, worn: true }, 0.88, 0.075 + idx * 0.004, 2 + idx * 2);
    }
  });
}

// ---------------------------------------------------------------- vegetation
/**
 * Instanced planting. One species is a trunk profile plus stacked foliage
 * cones; two draw calls regardless of count. `band` restricts a species to a
 * radial range so a treeline can thin toward the middle of a site.
 */
export function plantVegetation(scene, species, isBlocked){
  const colliders = [];
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();

  for(const sp of species){
    const trunkGeo = new THREE.CylinderGeometry(sp.trunkTop ?? 0.26, sp.trunkBase ?? 0.46, 1, 7, 1, true);
    trunkGeo.translate(0, 0.5, 0);
    const layers = sp.foliage ?? [{ r: 2.5, h: 4.2, y: 0 }, { r: 2.0, h: 3.8, y: 2.6 }, { r: 1.35, h: 3.2, y: 5.0 }];
    const foliageGeo = BufferGeometryUtils.mergeGeometries(layers.map(l => {
      const c = new THREE.ConeGeometry(l.r, l.h, 8, 1, true);
      c.translate(0, l.y + l.h / 2, 0);
      return c;
    }));
    const trunkMat = new THREE.MeshStandardMaterial({ color: sp.bark ?? 0x7a5636, roughness: 0.92 });
    const leafMat = new THREE.MeshStandardMaterial({
      color: sp.leaf ?? 0x3f5638, roughness: 0.88, side: THREE.DoubleSide, flatShading: true,
    });

    const placements = [];
    const [r0, r1] = sp.band ?? [26, 286];
    let guard = 0;
    while(placements.length < sp.count && guard < sp.count * 40){
      guard++;
      const ang = srand() * Math.PI * 2;
      const r = r0 + Math.pow(srand(), 0.55) * (r1 - r0);
      const x = Math.cos(ang) * r, z = Math.sin(ang) * r;
      if(CFG.profile === 'mesa'){
        const rim = rimRadius(ang);
        if(r > rim + 6 && r < rim + 34) continue;      // nothing on the sheer drop
      }
      if(onPath(x, z, 3.2)) continue;
      if(isBlocked && isBlocked(x, z, 3.0)) continue;
      if(sp.thinInside && r < sp.thinInside){
        const keep = 0.10 + 0.55 * Math.min(1, Math.max(0, (r - r0) / (sp.thinInside - r0)));
        if(srand() > keep) continue;
      }
      placements.push({ x, y: groundHeight(x, z), z, scale: srandRange(sp.scale?.[0] ?? 0.62, sp.scale?.[1] ?? 1.5),
                        rot: srand() * Math.PI * 2, lean: srandRange(-0.05, 0.05) });
    }

    const n = placements.length;
    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, n);
    const crowns = new THREE.InstancedMesh(foliageGeo, leafMat, n);
    trunks.castShadow = crowns.castShadow = true;
    trunks.receiveShadow = crowns.receiveShadow = true;
    placements.forEach((p, i) => {
      const trunkH = (sp.height ?? 9) * p.scale + srandRange(0, 5) * p.scale;
      e.set(p.lean, p.rot, p.lean * 0.7); q.setFromEuler(e);
      m4.compose(new THREE.Vector3(p.x, p.y, p.z), q, new THREE.Vector3(p.scale, trunkH, p.scale));
      trunks.setMatrixAt(i, m4);
      m4.compose(new THREE.Vector3(p.x, p.y + trunkH * 0.55, p.z), q,
                 new THREE.Vector3(p.scale, p.scale * srandRange(0.9, 1.3), p.scale));
      crowns.setMatrixAt(i, m4);
      if(Math.hypot(p.x, p.z) < CFG.playerLimit + 6){
        colliders.push({ x: p.x, z: p.z, r: 0.55 * p.scale + 0.35 });
      }
    });
    trunks.instanceMatrix.needsUpdate = true;
    crowns.instanceMatrix.needsUpdate = true;
    scene.add(trunks, crowns);
  }
  return colliders;
}

/** Low scrub, as crossed tufts so they read from any angle. */
export function plantScrub(scene, count = 420, opts = {}){
  const blade = new THREE.PlaneGeometry(0.5, 0.42, 2, 1);
  blade.translate(0, 0.21, 0);
  const geo = BufferGeometryUtils.mergeGeometries([
    blade.clone(), blade.clone().rotateY(Math.PI / 3), blade.clone().rotateY(-Math.PI / 3),
  ]);
  const mat = new THREE.MeshStandardMaterial({
    color: opts.colour ?? 0x6a6a45, roughness: 0.96, side: THREE.DoubleSide, envMapIntensity: 0.4,
  });
  const picks = [];
  let guard = 0;
  const [r0, r1] = opts.band ?? [20, 270];
  while(picks.length < count && guard < count * 30){
    guard++;
    const ang = srand() * Math.PI * 2;
    const r = r0 + Math.pow(srand(), 0.7) * (r1 - r0);
    const x = Math.cos(ang) * r, z = Math.sin(ang) * r;
    if(onPath(x, z, 2.4)) continue;
    if(opts.isBlocked && opts.isBlocked(x, z, 2.0)) continue;
    picks.push({ x, z, s: srandRange(0.6, 1.25) });
  }
  const inst = new THREE.InstancedMesh(geo, mat, picks.length);
  inst.castShadow = true;
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  picks.forEach((p, i) => {
    e.set(srandRange(-0.12, 0.12), srand() * 6.28, srandRange(-0.12, 0.12));
    q.setFromEuler(e);
    m4.compose(new THREE.Vector3(p.x, groundHeight(p.x, p.z), p.z), q, new THREE.Vector3(p.s, p.s, p.s));
    inst.setMatrixAt(i, m4);
  });
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);
  return inst;
}

// -------------------------------------------------------------- horizon ranks
const ridges = [];
/**
 * Unlit arcs at several distances. Depth is sold by lerping each rank further
 * toward the horizon colour, and by ridged noise — a pure sum of sines gives
 * rolling hills where real ranges have peaks and notches. Vertex colours shade
 * the flanks darker than the crests so each rank has volume.
 */
export function buildHorizon(scene, ranks){
  ridges.length = 0;
  ranks.forEach((rk, i) => {
    const STEPS = 420;
    const verts = [], cols = [], idx = [];
    for(let s = 0; s <= STEPS; s++){
      const a = (s / STEPS) * Math.PI * 2;
      const amp = rk.amp ? rk.amp(a) : 1;
      const ridged = 1 - Math.abs(Math.sin(a * 9.1) * 0.55 + Math.sin(a * 23.3) * 0.3);
      const h = rk.height * amp
        + Math.sin(a * 7.3) * rk.height * 0.10
        + ridged * rk.height * 0.20
        + Math.sin(a * 31.7) * rk.height * 0.035
        + Math.sin(a * 53.1) * rk.height * 0.015;
      const x = Math.cos(a) * rk.radius, z = Math.sin(a) * rk.radius;
      verts.push(x, -40, z, x, h, z);
      cols.push(0.62, 0.62, 0.66, 1, 1, 1);
    }
    for(let s = 0; s < STEPS; s++){
      const a = s * 2, b = s * 2 + 1, c = s * 2 + 2, d = s * 2 + 3;
      idx.push(a, c, b, b, c, d);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color: rk.colour, vertexColors: true, side: THREE.DoubleSide, fog: false,
    }));
    mesh.frustumCulled = false;
    mesh.renderOrder = -10 + i;
    mesh.position.y = -6;
    mesh.userData.ignoreAudit = true;
    scene.add(mesh);
    ridges.push({ mesh, base: new THREE.Color(rk.colour), haze: rk.haze ?? 0.5 });
  });
  return ridges;
}

// ---------------------------------------------------------------- sky and sun
let sky, envSky, envScene, pmrem, envRT, starField, lastEnvKey = null;

export function buildSky(scene, renderer, atmosphere = {}){
  const A = {
    // Thin, dry, high air: low turbidity, high rayleigh. A low rayleigh washes
    // the whole dome out to near-white.
    turbidity: 1.8, rayleigh: 2.6, mie: 0.0026, mieG: 0.80,
    scale: 850, stars: 1600, ...atmosphere,
  };
  sky = new Sky();
  sky.scale.setScalar(A.scale);
  // The dome has to be inside the camera's far plane or it is simply not drawn,
  // and what shows instead is the page behind the canvas — a flat grey sky with
  // the horizon ranks still in front of it. No error, and it looks like a
  // lighting problem rather than a clipped object, so it is worth saying out
  // loud in dev.
  if(typeof console !== 'undefined' && scene.userData.cameraFar && scene.userData.cameraFar < A.scale){
    console.warn(`[outdoorSite] sky scale ${A.scale} is beyond the camera far plane `
      + `${scene.userData.cameraFar} — the dome will be clipped and the sky will render `
      + `as the page background. Raise look.far above ${A.scale}.`);
  }
  sky.material.fog = false;
  sky.userData.ignoreAudit = true;
  scene.add(sky);

  // A second dome in its own scene, purely to bake the IBL.
  envSky = new Sky();
  envSky.scale.setScalar(A.scale);
  envScene = new THREE.Scene();
  envScene.add(envSky);
  pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  for(const s of [sky, envSky]){
    const u = s.material.uniforms;
    u.turbidity.value = A.turbidity;
    u.rayleigh.value = A.rayleigh;
    u.mieCoefficient.value = A.mie;
    u.mieDirectionalG.value = A.mieG;
  }

  // A sky that is not Earth's. `atmosphere.tint` multiplies the dome's own
  // colour, and the same tint goes on the dome that bakes the IBL so the ground
  // and every surface under it are lit by the same sky the player sees.
  //
  // It exists because the physical sky model is Preetham's, which solves for
  // Rayleigh scattering off nitrogen and oxygen. No combination of its four
  // uniforms produces the butterscotch of a dusty carbon-dioxide atmosphere:
  // turbidity and mie make it hazier and paler, and rayleigh only ever moves it
  // between blue and white. Tinting the output is honest about what it is — the
  // scattering is still Earth's, and the colour is the theme's.
  if(A.tint !== undefined){
    const c = new THREE.Color(A.tint);
    for(const s of [sky, envSky]){
      s.material.uniforms.skyTint = { value: c };
      s.material.fragmentShader = 'uniform vec3 skyTint;\n' + s.material.fragmentShader
        .replace('gl_FragColor = vec4( retColor, 1.0 );',
                 'gl_FragColor = vec4( retColor * skyTint, 1.0 );');
      s.material.needsUpdate = true;
    }
  }

  const sp = [], sc = [];
  for(let i = 0; i < A.stars; i++){
    const u = srand() * Math.PI * 2, v = Math.acos(srand() * 0.98), R = A.scale * 0.92;
    sp.push(Math.sin(v) * Math.cos(u) * R, Math.cos(v) * R, Math.sin(v) * Math.sin(u) * R);
    const warm = srand();
    sc.push(0.75 + warm * 0.25, 0.78 + warm * 0.2, 0.9 + srand() * 0.1);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  starGeo.setAttribute('color', new THREE.Float32BufferAttribute(sc, 3));
  starField = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 2.2, sizeAttenuation: false, vertexColors: true,
    transparent: true, opacity: 0, depthWrite: false, fog: false,
  }));
  starField.frustumCulled = false;
  starField.renderOrder = -20;
  starField.userData.ignoreAudit = true;
  scene.add(starField);
  scene.userData.atmosphere = A;
  return sky;
}

export function buildSunRig(scene, renderer, opts = {}){
  // High-desert sun is hard and contrasty: a strong directional with very
  // little fill, not a flat ambient wash.
  const ambient = new THREE.AmbientLight(0xffffff, opts.ambient ?? 0.05);
  const sun = new THREE.DirectionalLight(0xfff2d8, opts.sun ?? 4.4);
  const hemi = new THREE.HemisphereLight(0xbcd4ea, 0xa08a68, opts.hemi ?? 0.12);
  sun.castShadow = true;
  const res = renderer.capabilities.maxTextureSize >= 8192 ? 4096 : 2048;
  sun.shadow.mapSize.set(res, res);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 340;
  const ext = opts.shadowExtent ?? 96;
  sun.shadow.camera.left = -ext; sun.shadow.camera.right = ext;
  sun.shadow.camera.top = ext; sun.shadow.camera.bottom = -ext;
  sun.shadow.bias = -0.00022;
  sun.shadow.normalBias = 0.022;
  scene.add(ambient, sun, hemi);
  scene.userData.ambient = ambient;
  scene.userData.sun = sun;
  scene.userData.hemi = hemi;
  ambient.userData.base = ambient.intensity;
  sun.userData.base = sun.intensity;
  hemi.userData.base = hemi.intensity;
  return { ambient, sun, hemi };
}

const sunVec = new THREE.Vector3();
/** Drives sky, IBL, stars and horizon haze. The PMREM bake is throttled. */
export function updateSky(scene, direction, dayBlend){
  if(!sky) return null;
  sunVec.copy(direction).normalize();
  sky.material.uniforms.sunPosition.value.copy(sunVec);
  // Scattering falls off with the sun; daytime rayleigh after dark leaves a lit
  // teal dome overhead instead of a night sky.
  const A = scene.userData.atmosphere;
  // The night floor. 0.35/0.30 keeps a daytime game's sky from going flat black
  // at 3 a.m., which is right when night is a passing state — and wrong when the
  // whole campaign is played under it: at those values the dome renders grey and
  // the stars sit on a pale field. A high, dry site sets its own.
  const nt = A.nightTurbidity ?? 0.35;
  const nr = A.nightRayleigh ?? 0.30;
  const turb = nt + (A.turbidity - nt) * dayBlend;
  const rayl = nr + (A.rayleigh - nr) * dayBlend;
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

  // Deep night: put the dome away and paint the sky instead.
  //
  // The physical sky has a radiance floor. With the sun well below the horizon
  // and both scattering terms at zero it still renders around 0.03 linear,
  // which ACES at exposure 1.0 lifts to a flat grey — no uniform reaches it
  // (turbidity, rayleigh and mieCoefficient were each taken to zero and the
  // pixel did not move). For a game that is *played* after dark that grey is
  // the whole sky, so below a threshold the dome is simply hidden and the
  // scene background carries it, with the star field in front. A daytime game
  // never reaches this: its shift ends at 19:00, well above the threshold.
  const night = scene.userData.atmosphere?.nightSky;
  if(night !== undefined){
    const deep = dayBlend < 0.06;
    sky.visible = !deep;
    scene.background = deep ? (scene.userData.nightColour ??= new THREE.Color(night)) : null;
  }

  // The colour the far ridges are hazed toward, and the colour the fog takes.
  // The default is a blue-grey daylight sky. `atmosphere.haze` overrides it with
  // a night and a day colour of the theme's own, for the same reason `tint`
  // exists: on a dusty planet a blue horizon behind a butterscotch sky puts a
  // seam along the skyline that no amount of fog tuning removes.
  const hz = A.haze;
  const horizon = hz
    ? new THREE.Color(hz.night ?? 0x120b08).lerp(new THREE.Color(hz.day ?? 0xd8a172), Math.pow(dayBlend, 0.8))
    : new THREE.Color().setHSL(
      0.58 - 0.05 * dayBlend, 0.10 + 0.22 * dayBlend, 0.035 + 0.72 * dayBlend);
  ridges.forEach(r => {
    r.mesh.material.color.copy(r.base).lerp(horizon, r.haze * (0.55 + 0.45 * dayBlend));
    if(dayBlend < 0.35) r.mesh.material.color.multiplyScalar(0.18 + 0.82 * (dayBlend / 0.35));
  });
  return horizon;
}

/**
 * Sun over 24 hours. The *true* direction goes to the sky; the shadow-casting
 * light is clamped just above the horizon so shadows never flip at dusk.
 * Clamping before handing it to the sky is what kept the night sky pale blue.
 */
export function updateOutdoorTimeOfDay(scene, renderer, hours, extras = {}){
  const u = scene.userData;
  if(!u.sun) return null;
  const h = (((hours ?? 8) % 24) + 24) % 24;
  const solar = (h - 6) / 12 * Math.PI;
  const dir = new THREE.Vector3(Math.cos(solar), Math.sin(solar), extras.tilt ?? -0.30).normalize();
  const isNight = h < 6 || h >= 18;

  let dayBlend = 0;
  if(h >= 5.2 && h < 7.2) dayBlend = (h - 5.2) / 2;
  else if(h >= 7.2 && h < 16.8) dayBlend = 1;
  else if(h >= 16.8 && h < 19.0) dayBlend = (19.0 - h) / 2.2;
  dayBlend = Math.max(0, Math.min(1, dayBlend));

  u.sun.position.set(dir.x * 160, Math.max(6, dir.y * 160), dir.z * 160);
  u.sun.intensity = u.sun.userData.base * (0.02 + 0.98 * Math.pow(dayBlend, 0.75));
  u.sun.visible = dayBlend > 0.005;
  const warmth = 1 - Math.min(1, dayBlend * 1.6);
  u.sun.color.setRGB(1, 0.95 - warmth * 0.20, 0.85 - warmth * 0.36);
  u.ambient.intensity = u.ambient.userData.base * (0.55 + 0.45 * dayBlend);
  u.hemi.intensity = u.hemi.userData.base * (0.10 + 0.90 * dayBlend);

  const horizon = updateSky(scene, dir, dayBlend);
  if(horizon && scene.fog){
    // The colour is the sky's — fog that does not match the horizon it fades
    // into puts a visible seam along the skyline.
    scene.fog.color.copy(horizon);
    // The distances are the THEME's, and used to be these two constants: a site
    // built to be read across five kilometres had everything past 660 m in flat
    // haze, whatever `look.fog` said. The multipliers are what those constants
    // were as a fraction of the old daylight pair (210 / 660), so a theme that
    // sets no fog gets exactly the old behaviour and one that does gets closed-in
    // night air and its own daylight range.
    const base = extras.fog ?? { near: 210, far: 660 };
    scene.fog.near = base.near * (0.71 + 0.29 * dayBlend);
    scene.fog.far = base.far * (0.64 + 0.36 * dayBlend);
  }
  // Night lifts the exposure so a daytime game's dusk stays readable. A game
  // that is *played* at night wants the opposite — at 1.5 the residual sky
  // luminance comes up grey and the stars sit on a pale field — so the base and
  // the lift are the theme's to set.
  const baseExp = extras.exposure ?? 0.95;
  const lift = extras.nightLift ?? 0.55;
  renderer.toneMappingExposure = baseExp + (1 - dayBlend) * lift;
  return { isNight, dayBlend, direction: dir, horizon };
}

/** Configure the terrain before building anything. */
export function configureTerrain(cfg = {}){
  CFG = {
    ...TERRAIN_DEFAULTS, ...cfg,
    mesa: { ...TERRAIN_DEFAULTS.mesa, ...(cfg.mesa || {}) },
    scarp: cfg.scarp ?? null,
    ground: { ...TERRAIN_DEFAULTS.ground, ...(cfg.ground || {}) },
  };
  return CFG;
}
export function terrainConfig(){ return CFG; }
export function disposeSky(){ envRT?.dispose(); pmrem?.dispose(); }
