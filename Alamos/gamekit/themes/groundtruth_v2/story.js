// story.js — Station 12 changing as the fifteen days of the season do.
//
// The bible writes Ground Truth as a situation that changes fifteen times, each
// at a named fixture: a card clipped above the launch key, a sketch pinned under
// a field strip, a certificate stamped STEADY TEST ONLY, a tag tied round a
// common feed. Three walkable landmark spaces — the Storm Gallery, the Crew
// Shelter, the Season Wall — carry a Before and a Visible change. And §8.1 ends
// the season with one witnessed shot: a rocket up its wire, the channel to the
// mast tip, the fast recorders lighting, the report printing its signed last
// page. Every one of those was a sentence on a card. This file is where they
// become the world.
//
// Three halves. `storyOutdoors(scene, ctx)` runs from `decorate` and owns the
// season board, the three landmarks, the storm building over the flat, the
// mast-tip corona, the stage lamps and the final shot. `dressRoom(id, room,
// ctx)` runs when a room is first built and puts the bible's own states at the
// fixtures the stops are asked at. `storyExtras` is what lives on a salt flat
// in storm season and is in no ledger. All of it reads the campaign through
// `missionsAccepted`, so a prop keyed to mission n appears when mission n's
// decision is accepted and not before.
//
// Every word on a panel or slip is the bible's — an After action line, a caps
// label, a ledger state, a fixture caption, the mission header. Nothing here is
// composed. Geometry, placement and motion are ours.
import * as THREE from 'three';
import { box, cyl, MATERIALS, sign } from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { sway } from '../../engine/world/animators.js';
import { statusPanel, slip, fixturePlaces, missionsAccepted } from '../../engine/world/paper.js';
import { onLightning } from '../../engine/world/weather.js';
import { FIXTURES } from './fixtures.js';
import { SHOT_DAYS } from './props.js';

/** Where the mast and the rail stand — mirrors props.js. */
const MAST = { x: 0, z: -20, h: 60 };
const RAIL = { x: 0, z: -74 };
/**
 * Is a firing authorised on day `d`: the rail shots props.js fires, and the
 * witnessed final one (§8.1). Read lazily — props.js imports this file, so the
 * binding is live and must not be touched at module evaluation.
 */
const firingDay = (d) => SHOT_DAYS.includes(d) || d >= 15;

const STEEL = () => MATERIALS.paintedSteel(0x6d747c);
const GALV = () => MATERIALS.paintedSteel(0x6f767c);
const COPPER = () => MATERIALS.paintedSteel(0x8a5a34);
const RED = () => MATERIALS.paintedSteel(0xb8352a);
const YELLOW = () => MATERIALS.paintedSteel(0xc9a23f);
const DARK = () => MATERIALS.paintedSteel(0x2c3036);
const LAMP_OFF = 0x2a2f33;

/** The bible's mission header, verbatim: "MISSION 1 - 15 DAYS UNTIL THE LAST STORM WINDOW CLOSES." */
const HEADER = (d, won) => {
  const m = Math.min(15, Math.max(1, d));
  if(won) return 'MISSION 15 COMPLETE';
  const left = 16 - m;
  return `MISSION ${m} - ${left} ${left === 1 ? 'DAY' : 'DAYS'} UNTIL THE LAST STORM WINDOW CLOSES.`;
};

/** A `THREE.Box3` collider for something the player must not walk through. */
function solid(colliders, x, z, y, hw, h = 2.4, hd = hw){
  const b = new THREE.Box3(new THREE.Vector3(x - hw, y, z - hd), new THREE.Vector3(x + hw, y + h, z + hd));
  colliders?.push(b);
  return b;
}

/** An indicator lamp: a small sphere that can be lit. Returns the mesh; `.lit(k)` sets it. */
function lamp(parent, x, y, z, colour = 0x3fd15a, r = 0.06){
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6),
    new THREE.MeshStandardMaterial({ color: LAMP_OFF, emissive: colour, emissiveIntensity: 0, roughness: 0.4 }));
  m.position.set(x, y, z);
  m.userData.ignoreAudit = true;
  m.lit = (k) => { m.material.emissiveIntensity = k; m.material.color.setHex(k > 0.05 ? colour : LAMP_OFF); };
  parent.add(m);
  return m;
}

/**
 * A picture: a small canvas the painter draws on, on a plane. The bible hangs
 * sketches, photographs, drawings and traces beside its slips — "a cloud-layer
 * sketch", "a trailer damage photo", "the mast drawing", "a new sharp voltage
 * trace" — and none of them carries a word. `paint(g, W, H)` draws it;
 * `.repaint(fn)` swaps the painter.
 */
function picture(parent, { x, y, z, rotY = 0, w = 0.4, h = 0.3, visible = true, lit = false }, paint){
  const W = 256, H = Math.round(256 * (h / w));
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const run = (fn) => { fn(g, W, H); tex.needsUpdate = true; };
  run(paint);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({
    map: tex, roughness: 0.9, metalness: 0,
    emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: lit ? 0.35 : 0.05,
  }));
  m.position.set(x, y, z); m.rotation.y = rotY; m.visible = visible;
  m.userData.ignoreAudit = true;
  m.repaint = run;
  parent.add(m);
  return m;
}

// The painters. Paper is dark enough for house rule 6; ink is darker.
const PAPER = '#d6d0c0', INK = '#2a2c30', FAINT = 'rgba(42,44,48,0.35)';
const P = {
  /** Two charged layers in a cloud, one over the other, a ground line below. */
  cloudSketch: (g, W, H) => {
    g.fillStyle = PAPER; g.fillRect(0, 0, W, H);
    g.strokeStyle = INK; g.lineWidth = 3;
    for(const [cy, rx] of [[H * 0.3, W * 0.36], [H * 0.55, W * 0.3]]){
      g.beginPath(); g.ellipse(W / 2, cy, rx, H * 0.1, 0, 0, Math.PI * 2); g.stroke();
    }
    g.setLineDash([6, 6]); g.beginPath(); g.moveTo(W * 0.1, H * 0.42); g.lineTo(W * 0.9, H * 0.42); g.stroke(); g.setLineDash([]);
    g.lineWidth = 4; g.beginPath(); g.moveTo(0, H * 0.9); g.lineTo(W, H * 0.9); g.stroke();
    for(let i = 0; i < 5; i++){ g.beginPath(); g.moveTo(W * (0.2 + i * 0.15), H * 0.68); g.lineTo(W * (0.2 + i * 0.15), H * 0.86); g.stroke(); }
  },
  /** A trailer, and a burn on it. */
  trailerPhoto: (g, W, H) => {
    g.fillStyle = '#6f7377'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#9a9ea2'; g.fillRect(0, H * 0.62, W, H * 0.38);
    g.fillStyle = '#c3c1b8'; g.fillRect(W * 0.18, H * 0.3, W * 0.64, H * 0.36);
    g.fillStyle = '#3a3d40'; g.fillRect(W * 0.18, H * 0.66, W * 0.64, H * 0.05);
    g.beginPath(); g.arc(W * 0.3, H * 0.72, H * 0.06, 0, Math.PI * 2); g.arc(W * 0.7, H * 0.72, H * 0.06, 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(20,16,12,0.85)'; g.beginPath(); g.ellipse(W * 0.6, H * 0.46, W * 0.09, H * 0.1, 0.4, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#e8e6df'; g.lineWidth = 6; g.strokeRect(3, 3, W - 6, H - 6);
  },
  /** A card in a clear bag: the card, its tracks, and the bag's fold over it. */
  baggedCard: (g, W, H) => {
    g.fillStyle = '#6f7377'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#2f5a3a'; g.fillRect(W * 0.22, H * 0.2, W * 0.56, H * 0.6);
    g.strokeStyle = '#b89a4a'; g.lineWidth = 2;
    for(let i = 0; i < 6; i++){ g.beginPath(); g.moveTo(W * 0.26, H * (0.28 + i * 0.09)); g.lineTo(W * 0.74, H * (0.28 + i * 0.09)); g.stroke(); }
    g.fillStyle = 'rgba(20,16,12,0.8)'; g.beginPath(); g.ellipse(W * 0.6, H * 0.5, W * 0.06, H * 0.08, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(220,228,236,0.28)'; g.fillRect(W * 0.14, H * 0.1, W * 0.72, H * 0.8);
    g.strokeStyle = 'rgba(240,244,248,0.7)'; g.lineWidth = 3; g.strokeRect(W * 0.14, H * 0.1, W * 0.72, H * 0.8);
    g.beginPath(); g.moveTo(W * 0.14, H * 0.22); g.lineTo(W * 0.86, H * 0.22); g.stroke();
    g.strokeStyle = '#e8e6df'; g.lineWidth = 6; g.strokeRect(3, 3, W - 6, H - 6);
  },
  /** A tapering lattice, guyed. */
  mastDrawing: (g, W, H) => {
    g.fillStyle = PAPER; g.fillRect(0, 0, W, H);
    g.strokeStyle = INK; g.lineWidth = 2;
    const bx0 = W * 0.36, bx1 = W * 0.64, tx0 = W * 0.46, tx1 = W * 0.54;
    g.beginPath(); g.moveTo(bx0, H * 0.92); g.lineTo(tx0, H * 0.08); g.moveTo(bx1, H * 0.92); g.lineTo(tx1, H * 0.08); g.stroke();
    for(let i = 0; i <= 10; i++){
      const k = i / 10, y = H * (0.92 - 0.84 * k), l = bx0 + (tx0 - bx0) * k, r = bx1 + (tx1 - bx1) * k;
      g.beginPath(); g.moveTo(l, y); g.lineTo(r, y); g.stroke();
      if(i < 10){ const y2 = H * (0.92 - 0.84 * (k + 0.1)); g.beginPath(); g.moveTo(i % 2 ? l : r, y); g.lineTo(i % 2 ? r : l, y2); g.stroke(); }
    }
    g.strokeStyle = FAINT; g.beginPath(); g.moveTo(W / 2, H * 0.4); g.lineTo(W * 0.08, H * 0.92); g.moveTo(W / 2, H * 0.4); g.lineTo(W * 0.92, H * 0.92); g.stroke();
    g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.moveTo(W / 2, H * 0.08); g.lineTo(W / 2, H * 0.02); g.stroke();
  },
  /** The trench plan: a straight run and the hidden turn in it. */
  trenchPlan: (g, W, H) => {
    g.fillStyle = PAPER; g.fillRect(0, 0, W, H);
    g.strokeStyle = FAINT; g.lineWidth = 1;
    for(let i = 1; i < 8; i++){ g.beginPath(); g.moveTo(W * i / 8, 0); g.lineTo(W * i / 8, H); g.stroke(); }
    g.strokeStyle = INK; g.lineWidth = 3;
    g.beginPath(); g.moveTo(W * 0.08, H * 0.3); g.lineTo(W * 0.62, H * 0.3); g.lineTo(W * 0.62, H * 0.7); g.lineTo(W * 0.92, H * 0.7); g.stroke();
    g.setLineDash([5, 5]); g.beginPath(); g.moveTo(W * 0.08, H * 0.42); g.lineTo(W * 0.5, H * 0.42); g.lineTo(W * 0.5, H * 0.58); g.lineTo(W * 0.92, H * 0.58); g.stroke(); g.setLineDash([]);
    g.fillStyle = INK; g.fillRect(W * 0.04, H * 0.24, W * 0.04, H * 0.12); g.fillRect(W * 0.92, H * 0.64, W * 0.04, H * 0.12);
  },
  /** A scale: a ruled strip with ticks. */
  scale: (g, W, H) => {
    g.fillStyle = '#c9c3b4'; g.fillRect(0, 0, W, H);
    g.strokeStyle = INK; g.lineWidth = 2;
    for(let i = 0; i <= 20; i++){ const x = W * (0.04 + 0.92 * i / 20); g.beginPath(); g.moveTo(x, H * 0.55); g.lineTo(x, H * (i % 5 ? 0.8 : 0.95)); g.stroke(); }
    g.beginPath(); g.moveTo(W * 0.04, H * 0.55); g.lineTo(W * 0.96, H * 0.55); g.stroke();
  },
  /** A dial face: an arc of graduations. The needle is a mesh over it. */
  dial: (g, W, H) => {
    g.fillStyle = '#d8d3c6'; g.beginPath(); g.arc(W / 2, H / 2, W * 0.48, 0, Math.PI * 2); g.fill();
    g.strokeStyle = INK; g.lineWidth = 3;
    for(let i = 0; i <= 12; i++){
      const a = Math.PI * (1.15 - 1.3 * i / 12);
      const r0 = W * (i % 3 ? 0.4 : 0.36), r1 = W * 0.45;
      g.beginPath(); g.moveTo(W / 2 + Math.cos(a) * r0, H / 2 - Math.sin(a) * r0); g.lineTo(W / 2 + Math.cos(a) * r1, H / 2 - Math.sin(a) * r1); g.stroke();
    }
    g.strokeStyle = '#8a2e26'; g.lineWidth = 6;
    g.beginPath(); g.arc(W / 2, H / 2, W * 0.43, -Math.PI * 0.15, Math.PI * 0.12); g.stroke();
  },
  /** A clock face. */
  clock: (g, W, H) => {
    g.fillStyle = '#e2ddd0'; g.beginPath(); g.arc(W / 2, H / 2, W * 0.48, 0, Math.PI * 2); g.fill();
    g.strokeStyle = INK; g.lineWidth = 3;
    for(let i = 0; i < 12; i++){ const a = Math.PI * 2 * i / 12; g.beginPath(); g.moveTo(W / 2 + Math.cos(a) * W * 0.4, H / 2 + Math.sin(a) * W * 0.4); g.lineTo(W / 2 + Math.cos(a) * W * 0.46, H / 2 + Math.sin(a) * W * 0.46); g.stroke(); }
  },
};

/**
 * A recorder trace: a dark screen with a slow line across it, and optionally a
 * narrow fast peak standing above it. `kind` is 'flat' | 'slow' | 'peak' |
 * 'final' | 'sharp'. Returns the picture; `.show(kind)` repaints.
 */
function tracePlane(parent, opts){
  const painter = (kind) => (g, W, H) => {
    g.fillStyle = '#141a1e'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(120,160,150,0.25)'; g.lineWidth = 1;
    for(let i = 1; i < 8; i++){ g.beginPath(); g.moveTo(W * i / 8, 0); g.lineTo(W * i / 8, H); g.stroke(); }
    for(let i = 1; i < 4; i++){ g.beginPath(); g.moveTo(0, H * i / 4); g.lineTo(W, H * i / 4); g.stroke(); }
    if(kind === 'off') return;
    // The slow trace: a broad hump, or a flat line.
    g.strokeStyle = '#7fd9a8'; g.lineWidth = 3; g.beginPath();
    for(let x = 0; x <= W; x += 2){
      const u = x / W;
      const slow = kind === 'flat' ? 0 : Math.exp(-((u - 0.45) ** 2) / 0.06) * (kind === 'sharp' ? 0.08 : 0.28);
      g.lineTo(x, H * (0.78 - slow));
    }
    g.stroke();
    if(kind === 'peak' || kind === 'final' || kind === 'sharp'){
      // The fast channel: a narrow spike that the slow recorder barely moves for.
      g.strokeStyle = kind === 'final' ? '#f2e6a0' : '#e0a060'; g.lineWidth = 2; g.beginPath();
      for(let x = 0; x <= W; x += 1){
        const u = x / W;
        const d = (u - 0.42) / (kind === 'sharp' ? 0.012 : 0.02);
        const e = (u - 0.5) / 0.06;
        const fast = Math.exp(-d * d) * (kind === 'final' ? 0.5 : 0.62) + Math.exp(-(e * e)) * 0.08 * Math.sign(0.5 - u);
        g.lineTo(x, H * (0.78 - fast));
      }
      g.stroke();
    }
    if(kind === 'final'){
      // The posted limits: two dashed lines the trace stays inside.
      g.strokeStyle = 'rgba(240,120,110,0.8)'; g.setLineDash([6, 5]); g.lineWidth = 2;
      g.beginPath(); g.moveTo(0, H * 0.18); g.lineTo(W, H * 0.18); g.moveTo(0, H * 0.92); g.lineTo(W, H * 0.92); g.stroke(); g.setLineDash([]);
    }
  };
  const m = picture(parent, { lit: true, ...opts }, painter(opts.kind ?? 'flat'));
  m.show = (kind) => m.repaint(painter(kind));
  return m;
}

// ---------------------------------------------------------------- lightning
const UNIT_CYL = new THREE.CylinderGeometry(1, 1, 1, 6, 1);
const UP = new THREE.Vector3(0, 1, 0);

/**
 * A rig of `segs` unlit additive cylinders that can be laid along any jagged
 * polyline: the far bolts on the horizon and the final channel are both this.
 * `set(points)` lays it, `show(opacity)` fades it, 0 hides it.
 */
function boltRig(parent, segs, radius, colour, opacity = 1){
  const material = new THREE.MeshBasicMaterial({
    color: colour, transparent: true, opacity: 0, depthWrite: false,
    blending: THREE.AdditiveBlending, fog: false,
  });
  const group = new THREE.Group();
  const meshes = [];
  for(let i = 0; i < segs; i++){
    const m = new THREE.Mesh(UNIT_CYL, material);
    m.userData.ignoreAudit = true; m.userData.structure = 'sky';
    m.frustumCulled = false;
    group.add(m); meshes.push(m);
  }
  group.visible = false;
  parent.add(group);
  const dir = new THREE.Vector3(), q = new THREE.Quaternion();
  return {
    group,
    set(points){
      for(let i = 0; i < meshes.length; i++){
        const a = points[Math.min(i, points.length - 2)], b = points[Math.min(i + 1, points.length - 1)];
        const m = meshes[i];
        if(i >= points.length - 1){ m.visible = false; continue; }
        m.visible = true;
        dir.set(b.x - a.x, b.y - a.y, b.z - a.z);
        const len = dir.length() || 0.001;
        m.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
        m.scale.set(radius, len, radius);
        m.quaternion.copy(q.setFromUnitVectors(UP, dir.normalize()));
      }
    },
    show(k){ material.opacity = Math.max(0, Math.min(1, k)) * opacity; group.visible = k > 0.002; },
  };
}

/** A jagged path from `a` to `b` in `n` steps, with lateral wander scaled to the run. */
function jag(a, b, n, wander = 0.08, rnd = Math.random){
  const pts = [a];
  const L = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
  for(let i = 1; i < n; i++){
    const k = i / n, s = Math.sin(k * Math.PI);
    pts.push({
      x: a.x + (b.x - a.x) * k + (rnd() - 0.5) * L * wander * s,
      y: a.y + (b.y - a.y) * k + (rnd() - 0.5) * L * wander * 0.4 * s,
      z: a.z + (b.z - a.z) * k + (rnd() - 0.5) * L * wander * s,
    });
  }
  pts.push(b);
  return pts;
}

/** A radial glow texture for sprites: the corona, the exhaust, the tip flash. */
function glowTexture(){
  return mat('gt.glowtex', () => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)'); grad.addColorStop(0.35, 'rgba(255,255,255,0.5)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
}

function glow(parent, x, y, z, colour, size){
  const s = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(), color: colour, transparent: true, opacity: 0,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
  }));
  s.position.set(x, y, z); s.scale.set(size, size, 1);
  s.userData.ignoreAudit = true; s.userData.structure = 'sky';
  parent.add(s);
  return s;
}

/** A gull: a body, a head, two wings that beat. */
function bird(parent, colour = 0x4a4f56){
  const g = new THREE.Group();
  const m = mat(`gt.bird.${colour}`, () => new THREE.MeshStandardMaterial({ color: colour, roughness: 0.9 }));
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), m); body.scale.set(1.6, 0.9, 1); g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), m); head.position.set(0.24, 0.08, 0); g.add(head);
  const wings = [];
  for(const s of [-1, 1]){
    const w = box(g, 0.32, 0.02, 0.5, 0, 0.06, s * 0.28, m);
    w.geometry = w.geometry.clone().translate(0, 0, s * 0.2);
    wings.push(w);
  }
  parent.add(g);
  return { g, wings };
}

// =============================================================== outdoors

export function storyOutdoors(scene, ctx){
  const { groundHeight, stateHooks, animate, weather, theme, colliders, softColliders } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const won = (state) => state?.status === 'won';

  // ------------------------------------------------ the season board
  // The mission header, verbatim, on a board just off the spawn where the first
  // frame of every day has it: "MISSION 1 - 15 DAYS UNTIL THE LAST STORM WINDOW
  // CLOSES." One fewer each day; "MISSION 15 COMPLETE" when the season is.
  {
    const x = 8, z = 44, y = at(x, z);
    for(const dx of [-1.5, 1.5]) cyl(scene, 0.06, 2.9, x + dx, y + 1.45, z - 0.1, STEEL());
    box(scene, 3.3, 0.7, 0.06, x, y + 2.45, z - 0.1, DARK());
    const header = statusPanel(scene, { x, y: y + 2.45, z: z - 0.06, rotY: 0, w: 3.1, h: 0.56, title: 'Station 12', big: HEADER(1), tone: 'warn', lit: true });
    solid(colliders, x, z - 0.1, y, 1.7, 3.0, 0.2);
    stateHooks?.push((state) => {
      const d = day(state), w = won(state);
      header.set({ big: HEADER(d, w), tone: w ? 'ok' : d >= 13 ? 'alert' : 'warn' });
    });
  }

  // ------------------------------------------------ the storm, by day
  // Storm season builds. Rain thickens and the flashes come closer together as
  // the fifteen days go, and the last storm is overhead for the shot. Only
  // re-set when the day changes: `set` rebuilds the particle cloud.
  {
    let lastKey = null;
    stateHooks?.push((state) => {
      const d = day(state), w = won(state);
      const key = `${d}:${w}`;
      if(key === lastKey) return;
      lastKey = key;
      const k = w ? 1 : (d - 1) / 14;
      weather?.set?.({
        kind: 'rain', density: Math.min(1, 0.35 + 0.6 * k),
        wind: { x: 2.6 + 1.8 * k, z: 1.4 + 1.2 * k },
        lightning: { every: [Math.round(36 - 26 * k), Math.round(90 - 66 * k)] },
      });
    });
  }

  // ------------------------------------------------ the mast tip
  // "Why the mast starts hissing" is day four. The corona on the air terminal
  // grows through the season: a faint violet glow that flickers, brighter and
  // wider as the field under the storm climbs.
  const corona = glow(scene, MAST.x, at(MAST.x, MAST.z) + MAST.h + 2.3, MAST.z, 0x9fb0ff, 1.5);
  let coronaLevel = 0.1;
  stateHooks?.push((state) => { coronaLevel = won(state) ? 1 : 0.08 + 0.065 * day(state); });
  animate?.((t) => {
    const f = 0.55 + 0.45 * Math.sin(t * 23) * Math.sin(t * 7.3);
    corona.material.opacity = 0.12 + 0.5 * coronaLevel * f;
    const s = 1.2 + 2.2 * coronaLevel; corona.scale.set(s, s * 1.3, 1);
  });

  // ------------------------------------------------ the stage lamps
  // The Impulse Hall carries its twelve stage lamps on the outside too, over the
  // door: dark until the 1.50 KJ TEST RECORD (mission 6), then charging in a
  // slow sweep, and all lit and steady for the witnessed shot.
  const stageLamps = [];
  {
    const hx = 34, hz = 12 + 6.5 + 0.14, hy = at(34, 18.5) + 6.3;
    box(scene, 16.4, 0.3, 0.08, hx, hy, hz - 0.04, DARK());
    for(let i = 0; i < 12; i++) stageLamps.push(lamp(scene, hx - 7.7 + i * 1.4, hy, hz, 0xffb347, 0.11));
  }
  let bankMode = 'dark';
  stateHooks?.push((state) => { bankMode = won(state) || n(state) >= 15 ? 'steady' : n(state) >= 6 ? 'charging' : 'dark'; });
  animate?.((t) => {
    stageLamps.forEach((l, i) => {
      if(bankMode === 'dark') l.lit(0);
      else if(bankMode === 'steady') l.lit(2.2);
      else l.lit(((t * 2 + i * 0.5) % 7) < 3.5 + i * 0.25 ? 1.6 : 0.05);
    });
  });

  // ------------------------------------------------ the Storm Gallery
  // §3: "A thick window looks across the salt flat to the mast." A roofed room
  // east of the crew shelter, open on the path side, its whole north face a
  // thick pane looking down the flat at the mast — the sheltered view the final
  // shot is witnessed from. The glass-side display carries the shot trace from
  // Stop 55 (mission 14) and the final trace after that.
  const galleryDisplay = { panel: null, trace: null };
  {
    const cx = 32, cz = 46, y = at(cx, cz);
    const W = 6, D = 4, H = 3.1;
    // A slab, the two solid walls (south, east), the roof.
    box(scene, W + 0.6, 0.2, D + 0.6, cx, y + 0.1, cz, MATERIALS.concrete());
    box(scene, W, H, 0.22, cx, y + H / 2, cz + D / 2, MATERIALS.paintedSteel(0x8f959a));
    box(scene, 0.22, H, D, cx + W / 2, y + H / 2, cz, MATERIALS.paintedSteel(0x8f959a));
    box(scene, W + 0.8, 0.18, D + 0.8, cx, y + H + 0.09, cz, DARK());
    // The thick window: a glass pane across the north face, sill to roof, in a frame.
    box(scene, W, 0.9, 0.22, cx, y + 0.45, cz - D / 2, MATERIALS.paintedSteel(0x8f959a));
    box(scene, W, H - 0.9, 0.14, cx, y + 0.9 + (H - 0.9) / 2, cz - D / 2, MATERIALS.glass());
    for(const dx of [-W / 2, 0, W / 2]) box(scene, 0.12, H, 0.3, cx + dx, y + H / 2, cz - D / 2, DARK());
    box(scene, W, 0.12, 0.3, cx, y + 0.95, cz - D / 2, DARK());
    // A post on the open west side, and a bench to sit and watch from.
    box(scene, 0.16, H, 0.16, cx - W / 2, y + H / 2, cz + D / 2 - 0.1, DARK());
    box(scene, 0.16, H, 0.16, cx - W / 2, y + H / 2, cz - D / 2 + 0.1, DARK());
    box(scene, 3.2, 0.08, 0.45, cx + 0.6, y + 0.65, cz + 0.9, MATERIALS.paintedSteel(0x8a7a5a));
    for(const dx of [-1.4, 1.4]) box(scene, 0.1, 0.6, 0.4, cx + 0.6 + dx, y + 0.3, cz + 0.9, DARK());
    sign(scene, 'STORM GALLERY', { x: cx, y: y + H + 0.6, z: cz - D / 2 - 0.1, w: 3.0, h: 0.55, facing: 0 });
    // Colliders: the three closed faces and the bench.
    solid(colliders, cx, cz + D / 2, y, W / 2, H, 0.15);
    solid(colliders, cx + W / 2, cz, y, 0.15, H, D / 2);
    solid(colliders, cx, cz - D / 2, y, W / 2, H, 0.12);
    softColliders?.push({ x: cx + 0.6, z: cz + 0.9, r: 1.0 });
    // The glass-side display, on the east wall, facing into the gallery.
    const ex = cx + W / 2 - 0.13;
    galleryDisplay.panel = statusPanel(scene, { x: ex, y: y + 2.0, z: cz - 0.6, rotY: -Math.PI / 2, w: 1.5, h: 0.8,
      title: 'Storm Gallery', big: '—', small: 'Clouds approach through the season', tone: 'plain', lit: true });
    galleryDisplay.trace = tracePlane(scene, { x: ex, y: y + 2.0, z: cz + 1.0, rotY: -Math.PI / 2, w: 1.2, h: 0.7, kind: 'off' });
    stateHooks?.push((state) => {
      const k = n(state), w = won(state);
      if(w || k >= 15){
        galleryDisplay.panel.set({ big: '74 V', small: 'The final shot trace stays inside the posted limits.', tone: 'ok' });
        galleryDisplay.trace.show('final');
      } else if(k >= 14){
        galleryDisplay.panel.set({ big: '188 V', small: 'a fresh strike trace ends at 188 V beside a second strip marked 310 V', tone: 'warn' });
        galleryDisplay.trace.show('peak');
      } else {
        galleryDisplay.panel.set({ big: '—', small: 'Clouds approach through the season', tone: 'plain' });
        galleryDisplay.trace.show('off');
      }
    });
  }

  // ------------------------------------------------ the Season Wall
  // §3: "An empty frame waits beside the damaged outstation photo. After Stop
  // 32, the bagged-card photo joins it; after Stop 60, the signed last report
  // page fills the frame." A free-standing wall west of the spawn, facing it.
  {
    const x = -30, z = 42, y = at(x, z);
    box(scene, 4.6, 0.25, 0.8, x, y + 0.12, z, MATERIALS.concrete());
    box(scene, 4.4, 2.6, 0.24, x, y + 1.55, z, MATERIALS.paintedSteel(0x9aa3a8));
    box(scene, 4.6, 0.12, 0.34, x, y + 2.9, z, DARK());
    sign(scene, 'SEASON WALL', { x, y: y + 3.3, z: z + 0.02, w: 2.6, h: 0.5, facing: 0 });
    solid(colliders, x, z, y, 2.3, 3.0, 0.45);
    const zf = z + 0.13;
    const frame = (fx, fy, w, h) => {
      box(scene, w + 0.1, 0.05, 0.04, fx, fy + h / 2 + 0.025, zf, DARK());
      box(scene, w + 0.1, 0.05, 0.04, fx, fy - h / 2 - 0.025, zf, DARK());
      box(scene, 0.05, h + 0.1, 0.04, fx - w / 2 - 0.025, fy, zf, DARK());
      box(scene, 0.05, h + 0.1, 0.04, fx + w / 2 + 0.025, fy, zf, DARK());
    };
    // The damaged outstation photo, framed, and its caption.
    frame(x - 1.2, y + 1.8, 0.8, 0.6);
    picture(scene, { x: x - 1.2, y: y + 1.8, z: zf + 0.01, w: 0.8, h: 0.6 }, P.trailerPhoto);
    slip(scene, { x: x - 1.2, y: y + 1.3, z: zf + 0.01, rotY: 0, w: 0.5, h: 0.14, text: ['THE DAMAGED OUTSTATION PHOTO'], pin: false, tone: 'card' });
    // The empty frame beside it, which the signed last page fills after Stop 60.
    frame(x + 0.2, y + 1.8, 0.8, 0.6);
    const page = slip(scene, { x: x + 0.2, y: y + 1.8, z: zf + 0.01, rotY: 0, w: 0.7, h: 0.5,
      text: ['SIGNED LAST REPORT PAGE'], sub: 'The final shot trace stays inside the posted limits.', pin: false, visible: false });
    // The bagged-card photo joins after Stop 32 (mission 8), pinned beside the frame.
    const bagged = picture(scene, { x: x + 1.4, y: y + 1.8, z: zf + 0.01, w: 0.6, h: 0.6, visible: false }, P.baggedCard);
    const baggedLabel = slip(scene, { x: x + 1.4, y: y + 1.3, z: zf + 0.01, rotY: 0, w: 0.5, h: 0.14, text: ['NO CONTACT REQUIRED'], pin: true, visible: false });
    stateHooks?.push((state) => {
      const k = n(state), w = won(state);
      bagged.visible = k >= 8; baggedLabel.set({ visible: k >= 8 });
      page.set({ visible: w || k >= 15 });
    });
  }

  // ------------------------------------------------ §8.1 the final shot
  // One shot, once, on the last accepted decision: a rocket rises along its wire
  // from the rail, the channel joins the mast tip from the cloud, the whole flat
  // flashes, and every recorder lamp on the site lights. No second launch is
  // made for spectacle — the rig plays once and stays finished.
  {
    const ry = at(RAIL.x, RAIL.z);
    const my = at(MAST.x, MAST.z);
    const tip = { x: MAST.x, y: my + MAST.h + 2.25, z: MAST.z };
    const APEX = 110;
    // The rocket: a metre of tube, a nose and three fins, and its exhaust.
    const rocket = new THREE.Group();
    cyl(rocket, 0.05, 0.95, 0, 0, 0, MATERIALS.paintedSteel(0xe4e2dc));
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.22, 12), MATERIALS.paintedSteel(0xb4451f));
    nose.position.y = 0.585; rocket.add(nose);
    for(let i = 0; i < 3; i++){
      const a = (i / 3) * Math.PI * 2;
      const fin = box(rocket, 0.012, 0.16, 0.13, Math.sin(a) * 0.1, -0.4, Math.cos(a) * 0.1, MATERIALS.paintedSteel(0xb4451f));
      fin.rotation.y = a;
    }
    const exhaust = glow(rocket, 0, -0.75, 0, 0xffc070, 1.6);
    rocket.visible = false;
    rocket.position.set(RAIL.x, ry + 1.55, RAIL.z - 0.12);
    scene.add(rocket);
    // The wire it trails: one thin cylinder scaled from the rail to the rocket.
    const wire = new THREE.Mesh(UNIT_CYL, mat('gt.wire', () => new THREE.MeshBasicMaterial({ color: 0x3a3a38, fog: true })));
    wire.visible = false; wire.userData.ignoreAudit = true; scene.add(wire);
    // The channel: cloud to wire top, wire top to the mast tip — a bright core
    // and a wide dim halo, both additive and unlit.
    const core = boltRig(scene, 22, 0.55, 0xeaf2ff, 1.0);
    const halo = boltRig(scene, 22, 2.6, 0x9fb0ff, 0.28);
    const tipFlash = glow(scene, tip.x, tip.y, tip.z, 0xffffff, 12);
    // The recorder lamps outdoors: on the instrument cabinet by the mast and on
    // the three shunt boxes on the down-conductor.
    const outLamps = [];
    for(const [x, y, z] of [[MAST.x + 2.0, my + 1.75, MAST.z + 0.9 + 0.32], [MAST.x + 2.15, my + 1.75, MAST.z + 0.9 + 0.32]]){
      outLamps.push(lamp(scene, x, y, z, 0x3fd15a, 0.035));
    }
    for(const h of [45, 30, 15]) outLamps.push(lamp(scene, MAST.x + 0.55, my + h + 0.1, MAST.z + 1.27, 0x3fd15a, 0.05));

    let progress = -1, struck = false;
    const seed = 41;
    let s = seed; const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
    const layChannel = () => {
      const top = { x: RAIL.x, y: ry + APEX, z: RAIL.z };
      const cloud = { x: RAIL.x + 6, y: 150, z: RAIL.z - 12 };
      const pts = [...jag(cloud, top, 8, 0.1, rnd), ...jag(top, tip, 14, 0.07, rnd).slice(1)];
      core.set(pts); halo.set(pts);
    };
    animate?.((t, dt) => {
      if(progress < 0) return;
      progress += dt;
      const u = progress;
      if(u < 5.0){
        // The ascent: the rocket climbs the wire's own line, exhaust under it.
        const k = u / 5.0, h = 1.55 + (APEX - 1.55) * (k * k * 0.4 + k * 0.6);
        rocket.visible = true; wire.visible = true;
        rocket.position.set(RAIL.x, ry + h, RAIL.z - 0.12);
        exhaust.material.opacity = 0.7 + 0.3 * Math.sin(t * 40);
        wire.position.set(RAIL.x, ry + (h + 1.2) / 2, RAIL.z - 0.12);
        wire.scale.set(0.03, Math.max(0.1, h - 1.2), 0.03);
      } else if(u < 6.2){
        // The channel: two pulses, the leader and the return, and the flat lit by them.
        if(!struck){ struck = true; layChannel(); weather?.strike?.(); exhaust.material.opacity = 0; }
        const v = u - 5.0;
        const pulse = v < 0.5 ? 1 - v / 0.5 : v < 0.65 ? 0 : 1 - (v - 0.65) / 0.55;
        const k = Math.max(0, pulse) * (0.75 + 0.25 * Math.sin(t * 90));
        core.show(k); halo.show(k);
        tipFlash.material.opacity = k * 0.9;
        outLamps.forEach(l => l.lit(k > 0.3 ? 3.0 : 2.0));
      } else {
        // Afterwards: the wire is gone, the rocket with it, the lamps stay lit.
        core.show(0); halo.show(0); tipFlash.material.opacity = 0;
        rocket.visible = false; wire.visible = false;
        outLamps.forEach(l => l.lit(2.0 + 0.3 * Math.sin(t * 3)));
      }
    });
    stateHooks?.push((state) => {
      const open = won(state) || n(state) >= 15;
      if(open && progress < 0){ progress = 0; struck = false; }
      if(!open && progress >= 0){
        progress = -1; struck = false;
        rocket.visible = false; wire.visible = false; core.show(0); halo.show(0); tipFlash.material.opacity = 0;
        outLamps.forEach(l => l.lit(0));
      }
    });
  }

  storyExtras(scene, ctx);
}

// =============================================================== the rooms
//
// Each fixture the bible changes gets its state on the wall behind it. `n` is
// how many missions' decisions are accepted; the bible's own lines are keyed to
// the mission that writes them. Nothing hangs on a fixture itself — a fixture is
// built only on the day a call is asked at it (see `fixturePlaces.face`).

const byId = (roomId) => Object.fromEntries((FIXTURES[roomId] ?? []).map(f => [f.id, f]));

export function dressRoom(id, room, ctx){
  const { group, stateHooks, theme, animate } = ctx;
  const F = byId(id);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const won = (state) => state?.status === 'won';
  const at = (fid) => (F[fid] ? fixturePlaces(room, F[fid]) : null);
  /** Something off the wall behind a fixture: `face(dx, y)` pushed out by `off`. */
  const off = (a, dx, y, out = 0.03) => {
    const p = a.face(dx, y);
    return { x: p.x + Math.sin(a.yaw) * out, y: p.y, z: p.z + Math.cos(a.yaw) * out, rotY: a.yaw };
  };
  // `dx` and `y` in a spec place the thing on the wall (through `face`, which
  // remaps y into the band above a fixture's top); they are stripped before the
  // rest of the spec is handed on, or a raw y would override the placement.
  const placed = (a, spec) => { const { dx, y, ...rest } = spec; return { ...off(a, dx ?? 0, y ?? 1.5, 0.02), ...rest }; };
  const onFace = (fid, spec) => { const a = at(fid); return a ? slip(group, placed(a, spec)) : null; };
  const panel = (fid, side, spec) => { const a = at(fid); const { y, ...rest } = spec; return a ? statusPanel(group, { ...a.wallPanel(side, y ?? 1.95), w: 1.4, h: 0.8, lit: true, ...rest }) : null; };
  const pic = (fid, spec, painter) => { const a = at(fid); return a ? picture(group, placed(a, spec), painter) : null; };
  const trace = (fid, spec) => { const a = at(fid); return a ? tracePlane(group, placed(a, spec)) : null; };
  const hooks = [];
  /** The bible's aftermaths: a clipped card with its caps label and the After action under it, shown from mission `k`. */
  const cards = [];
  const card = (fid, k, label, action, spec = {}) => {
    const c = onFace(fid, {
      w: label ? 0.5 : 0.6, h: label ? 0.26 : 0.4,
      text: label ? [label] : action, sub: label ? action : '',
      pin: 'clip', visible: false, ...spec,
    });
    if(c){ c.userData.fromMission = k; cards.push(c); }
    return c;
  };

  switch(id){
    case 'SHOT': {
      // M1 at launch-board: "Dr. Lena Ortiz clips the FIELD AND CHANNEL-SPREAD
      // LIMITS card above the launch key." Before: "One crew-clear lamp disagrees
      // with the others beneath the red hold bar."
      const lb = at('launch-board');
      const clear = [];
      let holdBar = null, key = null;
      if(lb){
        const p = lb.wallAbove(2.6);
        holdBar = box(group, 1.4, 0.09, 0.05, p.x, p.y - 0.28, p.z, RED(), p.rotY);
        for(let i = 0; i < 6; i++){
          const q = off(lb, -0.55 + i * 0.22, 2.55, 0.04);
          clear.push(lamp(group, q.x, p.y, q.z, i === 3 ? 0xf0b429 : 0x3fd15a, 0.05));
        }
        const kp = off(lb, 0.55, 1.35, 0.03);
        key = cyl(group, 0.05, 0.06, kp.x, kp.y, kp.z, MATERIALS.steel());
        key.rotation.x = Math.PI / 2;
      }
      void holdBar; void key;
      const limits = card('launch-board', 1, 'FIELD AND CHANNEL-SPREAD LIMITS', 'Dr. Lena Ortiz clips the FIELD AND CHANNEL-SPREAD LIMITS card above the launch key.', { dx: 0.55, y: 1.75 });
      const shot = panel('launch-board', -1, { title: 'The shot sequence', big: 'One crew-clear lamp disagrees with the others beneath the red hold bar.', tone: 'alert' });
      // M7 at reference-panel: "Noor Haddad ties a SHARED REFERENCE tag around the
      // common feed." Before: four matching screen traces meet at one exposed
      // reference wire.
      const rp = at('reference-panel');
      const refTraces = [0, 1, 2, 3].map(i => trace('reference-panel', { dx: -0.45 + i * 0.3, y: 1.95, w: 0.26, h: 0.18, kind: 'slow' }));
      if(rp){
        for(let i = 0; i < 4; i++){ const q = off(rp, -0.45 + i * 0.3, 1.6, 0.03); cyl(group, 0.006, 0.34, q.x, q.y + 0.05, q.z, COPPER()); }
        const j = off(rp, 0, 1.36, 0.03);
        box(group, 0.95, 0.012, 0.012, j.x, j.y, j.z, COPPER(), rp.yaw);
        cyl(group, 0.012, 0.5, j.x, j.y - 0.25, j.z, COPPER());
      }
      const shared = card('reference-panel', 7, 'SHARED REFERENCE', 'Noor Haddad ties a SHARED REFERENCE tag around the common feed.', { dx: 0.18, y: 1.25, w: 0.36, h: 0.2 });
      // M12 and M15 at record-desk, and the printer that feeds the signed last page.
      const rd = at('record-desk');
      const report = panel('record-desk', -1, { title: 'The bound report', big: 'every signature still missing from the final page', tone: 'plain' });
      const liveTrace = trace('record-desk', { dx: 0.75, y: 1.95, w: 0.6, h: 0.36, kind: 'off' });
      const predicted = card('record-desk', 12, '90 V PREDICTED / 92 V MEASURED', 'Dr. Lena Ortiz clips the 90 V PREDICTED / 92 V MEASURED strip into the report.', { dx: -0.6, y: 1.7 });
      const witnessed = card('record-desk', 15, null, 'Dr. Lena Ortiz clips the witnessed final-shot record into the season report.', { dx: 0.0, y: 1.7 });
      let page = null, pageY0 = 0, printing = -1;
      if(rd){
        const p = off(rd, 0.75, 1.42, 0.16);
        box(group, 0.52, 0.22, 0.3, p.x, p.y, p.z, MATERIALS.paintedSteel(0xa8adb0), rd.yaw);
        const slot = off(rd, 0.75, 1.42, 0.31);
        box(group, 0.4, 0.02, 0.03, slot.x, slot.y - 0.08, slot.z, DARK(), rd.yaw);
        const q = off(rd, 0.75, 1.3, 0.3);
        pageY0 = q.y;
        page = slip(group, { x: q.x, y: q.y, z: q.z, rotY: rd.yaw, w: 0.34, h: 0.44, text: ['SIGNED LAST PAGE'],
          sub: 'The final shot trace stays inside the posted limits.', pin: false, visible: false });
      }
      animate?.((t, dt) => {
        if(!page || printing < 0) return;
        printing = Math.min(15, printing + dt);
        page.position.y = pageY0 + 0.22 - 0.44 * (printing / 15);
      });
      // radar-desk: "three clocks that have never quite agreed".
      const ra = at('radar-desk');
      const hands = [];
      if(ra){
        for(let i = 0; i < 3; i++){
          const q = off(ra, -0.4 + i * 0.4, 2.0, 0.02);
          picture(group, { x: q.x, y: q.y, z: q.z, rotY: ra.yaw, w: 0.3, h: 0.3 }, P.clock);
          const hub = new THREE.Group(); hub.position.set(q.x + Math.sin(ra.yaw) * 0.01, q.y, q.z + Math.cos(ra.yaw) * 0.01); hub.rotation.y = ra.yaw; group.add(hub);
          const mh = box(hub, 0.012, 0.11, 0.006, 0, 0, 0, DARK()); mh.geometry = mh.geometry.clone().translate(0, 0.055, 0);
          const hh = box(hub, 0.016, 0.07, 0.006, 0, 0, 0.004, DARK()); hh.geometry = hh.geometry.clone().translate(0, 0.035, 0);
          hands.push({ mh, hh, lag: (i - 1) * 0.35 });
        }
      }
      // A minute hand a turn an hour, an hour hand a turn in twelve; each clock a
      // little off the others, which is the whole caption.
      animate?.((t) => { hands.forEach(({ mh, hh, lag }) => { mh.rotation.z = -(t / 3600) * Math.PI * 2 - lag; hh.rotation.z = -(t / 43200) * Math.PI * 2 - lag * 0.5; }); });
      void refTraces; void limits; void shared; void predicted; void witnessed;
      hooks.push((state) => {
        const k = n(state), w = won(state), d = day(state);
        const firing = firingDay(d) || w;
        clear.forEach((l, i) => l.lit(k >= 1 || i !== 3 ? (firing ? 2.4 : 1.2) : 1.6));
        if(k >= 1 && clear[3]) clear[3].material.emissive.setHex(0x3fd15a);
        shot?.set(w || k >= 15 ? { big: 'The final shot trace stays inside the posted limits.', tone: 'ok', small: '' }
          : k >= 1 ? { big: 'FIELD AND CHANNEL-SPREAD LIMITS', tone: 'ok', small: 'Dr. Lena Ortiz clips the FIELD AND CHANNEL-SPREAD LIMITS card above the launch key.' }
          : { big: 'One crew-clear lamp disagrees with the others beneath the red hold bar.', tone: 'alert', small: '' });
        report?.set(w || k >= 15 ? { big: '74 V', small: 'The final shot trace stays inside the posted limits.', tone: 'ok' }
          : k >= 14 ? { big: 'the repaired card rack waits beside the blank last report page', tone: 'warn', small: '' }
          : k >= 12 ? { big: '90 V PREDICTED / 92 V MEASURED', tone: 'ok', small: '' }
          : k >= 11 ? { big: 'A sealed prediction sits beside the reduced-test recorder.', tone: 'plain', small: '' }
          : { big: 'every signature still missing from the final page', tone: 'plain', small: '' });
        liveTrace?.show(w || k >= 15 ? 'final' : k >= 12 ? 'peak' : 'off');
        if(page){
          const open = w || k >= 15;
          if(open && printing < 0){ printing = 0; page.set({ visible: true }); }
          if(!open && printing >= 0){ printing = -1; page.set({ visible: false }); page.position.y = pageY0; }
        }
      });
      break;
    }
    case 'FIELD': {
      // M2 at storm-profile-board: "Ravi Sen pins the bounded charge-layer sketch
      // beneath the measured field strip." Before: rain beads on a cloud-layer
      // sketch beside the mill readings.
      const sk = pic('storm-profile-board', { dx: -0.5, y: 1.75, w: 0.44, h: 0.34, visible: false }, P.cloudSketch);
      const beads = [];
      const sp = at('storm-profile-board');
      if(sp){
        for(let i = 0; i < 9; i++){
          const q = off(sp, -0.5 + (i % 3 - 1) * 0.12 + (i * 0.037 % 0.05), 1.75 + (Math.floor(i / 3) - 1) * 0.1, 0.035);
          const b = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 5), MATERIALS.glass()); b.position.set(q.x, q.y, q.z); b.visible = false; b.userData.ignoreAudit = true; group.add(b); beads.push(b);
        }
      }
      const strip = panel('storm-profile-board', 1, { title: 'The cloud base', big: 'every altitude estimate the present storm will permit', tone: 'plain', w: 1.5, h: 0.7 });
      const bounded = card('storm-profile-board', 2, null, 'Ravi Sen pins the bounded charge-layer sketch beneath the measured field strip.', { dx: 0.5, y: 1.65 });
      // mill-array: four dials on the wall, needles climbing with the season, the
      // reference set apart by a strip of yellow paint.
      const ma = at('mill-array');
      const needles = [];
      if(ma){
        for(let i = 0; i < 4; i++){
          const q = off(ma, -0.6 + i * 0.4, 1.95, 0.02);
          picture(group, { x: q.x, y: q.y, z: q.z, rotY: ma.yaw, w: 0.3, h: 0.3 }, P.dial);
          const hub = new THREE.Group(); hub.position.set(q.x + Math.sin(ma.yaw) * 0.012, q.y, q.z + Math.cos(ma.yaw) * 0.012); hub.rotation.y = ma.yaw; group.add(hub);
          const nd = box(hub, 0.008, 0.12, 0.004, 0, 0, 0, RED()); nd.geometry = nd.geometry.clone().translate(0, 0.06, 0);
          needles.push({ nd, i });
          if(i === 3){ const yq = off(ma, 0.6, 1.72, 0.02); box(group, 0.3, 0.04, 0.01, yq.x, yq.y, yq.z, YELLOW(), ma.yaw); }
        }
      }
      let field = 0.2;
      animate?.((t) => { needles.forEach(({ nd, i }) => { nd.rotation.z = 0.9 - 1.6 * Math.min(1, field + 0.03 * Math.sin(t * (1.1 + i * 0.3) + i)) ; }); });
      void bounded;
      hooks.push((state) => {
        const k = n(state), w = won(state);
        field = w ? 0.95 : 0.15 + 0.05 * day(state);
        if(sk) sk.visible = k >= 1;
        beads.forEach(b => { b.visible = k >= 1; });
        strip?.set(k >= 2 ? { big: 'Ravi Sen pins the bounded charge-layer sketch beneath the measured field strip.', tone: 'ok' }
          : k >= 1 ? { big: 'rain beads on a cloud-layer sketch beside the mill readings', tone: 'warn' }
          : { big: 'every altitude estimate the present storm will permit', tone: 'plain' });
      });
      break;
    }
    case 'MAST': {
      // M3 at shunt-rack: three shunt leads and an empty fourth hook, a voltage
      // sketch beside them (from mission 2), then the 250 TO 378 MV model card.
      const sr = at('shunt-rack');
      if(sr){
        for(let i = 0; i < 4; i++){
          const q = off(sr, -0.45 + i * 0.3, 1.95, 0.04);
          cyl(group, 0.012, 0.06, q.x, q.y, q.z, MATERIALS.steel());
          if(i < 3) cyl(group, 0.014, 0.5, q.x, q.y - 0.28, q.z, COPPER());
        }
      }
      const vsk = pic('shunt-rack', { dx: -0.9, y: 1.7, w: 0.3, h: 0.24, visible: false }, P.cloudSketch);
      const model = card('shunt-rack', 3, '250 TO 378 MV', 'Marcus Tate clips the 250 TO 378 MV model card to the shunt rack.', { dx: 0.5, y: 1.4 });
      // M4 at mast-desk: the mast drawing, the copper tip model catching light
      // beside a trailer damage photo (from mission 3), then TIP EFFECT INCOMPLETE.
      pic('mast-desk', { dx: -0.6, y: 1.9, w: 0.34, h: 0.5 }, P.mastDrawing);
      const photo = pic('mast-desk', { dx: 0.55, y: 1.85, w: 0.4, h: 0.3, visible: false }, P.trailerPhoto);
      const md = at('mast-desk');
      let tipModel = null;
      if(md){
        const q = off(md, 0.1, 1.3, 0.08);
        box(group, 0.16, 0.02, 0.14, q.x, q.y - 0.06, q.z, DARK(), md.yaw);
        tipModel = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.22, 12), new THREE.MeshStandardMaterial({ color: 0x8a5a34, roughness: 0.25, metalness: 0.85, emissive: 0x3a2410, emissiveIntensity: 0.4 }));
        tipModel.position.set(q.x, q.y + 0.06, q.z); tipModel.visible = false; group.add(tipModel);
      }
      const tipCard = card('mast-desk', 4, 'TIP EFFECT INCOMPLETE', 'Marcus Tate pins the TIP EFFECT INCOMPLETE finding beside the mast drawing.', { dx: -0.1, y: 1.85 });
      // M11 at strike-ledger: two current totals leave a red gap; then CONDUIT:
      // ABOUT ONE THIRD pinned into the missing branch.
      const ledger = panel('strike-ledger', -1, { title: 'Every measured branch of the last strike', big: 'one unexplained current left in red', tone: 'alert' });
      const conduit = card('strike-ledger', 11, 'CONDUIT: ABOUT ONE THIRD', 'Marcus Tate pins the CONDUIT: ABOUT ONE THIRD record into the missing branch.', { dx: 0.3, y: 1.75 });
      void model; void tipCard; void conduit;
      hooks.push((state) => {
        const k = n(state);
        if(vsk) vsk.visible = k >= 2;
        if(photo) photo.visible = k >= 3;
        if(tipModel) tipModel.visible = k >= 3;
        ledger?.set(k >= 11 ? { big: 'CONDUIT: ABOUT ONE THIRD', tone: 'ok', small: 'Marcus Tate pins the CONDUIT: ABOUT ONE THIRD record into the missing branch.' }
          : k >= 10 ? { big: 'two current totals leave a red gap on the strike ledger', tone: 'alert', small: '' }
          : { big: 'one unexplained current left in red', tone: 'alert', small: '' });
      });
      break;
    }
    case 'BANK': {
      // M5 at hall-board: twelve numbered stages behind the rail below a cloud
      // sketch; then ELECTRICAL MODEL ONLY clipped to the bank diagram.
      pic('hall-board', { dx: 0.6, y: 1.95, w: 0.4, h: 0.3 }, P.cloudSketch);
      const hall = panel('hall-board', -1, { title: 'The Marx topology', big: 'where the energy can go', tone: 'plain' });
      const electrical = card('hall-board', 5, 'ELECTRICAL MODEL ONLY', 'Elise Strand clips the ELECTRICAL MODEL ONLY card to the bank diagram.', { dx: -0.55, y: 1.75 });
      // bank-stages: twelve numbered stage lamps on the wall above, dark until the
      // 1.50 KJ test, then charging; steady for the final shot.
      const bs = at('bank-stages');
      const stage = [];
      if(bs){
        const p = bs.wallAbove(2.5);
        box(group, 1.9, 0.16, 0.04, p.x, p.y, p.z, DARK(), p.rotY);
        for(let i = 0; i < 12; i++){ const q = off(bs, -0.825 + i * 0.15, 2.5, 0.04); stage.push(lamp(group, q.x, p.y, q.z, 0xffb347, 0.04)); }
      }
      // M6 at gap-row: the first-gap scale, the earthing stick resting on the bank
      // while the lamps stay dark, then the 1.50 KJ TEST RECORD beside the scale.
      pic('gap-row', { dx: 0, y: 1.42, w: 0.9, h: 0.1 }, P.scale);
      const record = card('gap-row', 6, '1.50 KJ TEST RECORD', 'Elise Strand pins the 1.50 KJ TEST RECORD beside the first-gap scale.', { dx: 0.55, y: 1.75 });
      const stickMat = YELLOW();
      let onBank = null, onHook = null;
      if(bs){
        // Leaning on the wall by the stages: foot out on the floor, top on the wall.
        const q = off(bs, 0.7, 1.3, 0.28);
        onBank = cyl(group, 0.02, 1.7, q.x, 0.84, q.z, stickMat);
        onBank.rotation.x = -Math.cos(bs.yaw) * 0.3; onBank.rotation.z = Math.sin(bs.yaw) * 0.3;
      }
      const er = at('earthing-stick-rack');
      if(er){
        for(let i = 0; i < 3; i++){
          const q = off(er, -0.3 + i * 0.3, 2.05, 0.05);
          cyl(group, 0.012, 0.08, q.x, q.y, q.z, MATERIALS.steel());
          if(i < 2) cyl(group, 0.02, 1.7, q.x, q.y - 0.9, q.z, stickMat);
          else { onHook = cyl(group, 0.02, 1.7, q.x, q.y - 0.9, q.z, stickMat); onHook.visible = false; }
        }
      }
      let mode = 'dark';
      animate?.((t) => {
        stage.forEach((l, i) => {
          if(mode === 'dark') l.lit(0);
          else if(mode === 'steady') l.lit(2.0);
          else l.lit(((t * 2 + i * 0.5) % 7) < 3.5 + i * 0.25 ? 1.5 : 0.05);
        });
      });
      void electrical; void record;
      hooks.push((state) => {
        const k = n(state), w = won(state);
        mode = w || k >= 15 ? 'steady' : k >= 6 ? 'charging' : 'dark';
        if(onBank) onBank.visible = k < 6;
        if(onHook) onHook.visible = k >= 6;
        hall?.set(k >= 6 ? { big: '1.50 KJ TEST RECORD', tone: 'ok', small: 'Elise Strand pins the 1.50 KJ TEST RECORD beside the first-gap scale.' }
          : k >= 5 ? { big: 'ELECTRICAL MODEL ONLY', tone: 'warn', small: 'Elise Strand clips the ELECTRICAL MODEL ONLY card to the bank diagram.' }
          : k >= 4 ? { big: 'twelve numbered stages stand behind the rail below a cloud sketch', tone: 'plain', small: '' }
          : { big: 'where the energy can go', tone: 'plain', small: '' });
      });
      break;
    }
    case 'EARTH': {
      // M9 at loop-bench: the trench plan under a ruler laid along the hidden
      // cable turn (from mission 8), the archived storm trace clipped beside it,
      // then the -1.10 KV PREDICTED / -1.06 KV ARCHIVED strip.
      const plan = pic('loop-bench', { dx: -0.5, y: 1.85, w: 0.5, h: 0.36, visible: false }, P.trenchPlan);
      const lb = at('loop-bench');
      let ruler = null;
      if(lb){ const q = off(lb, -0.5, 1.83, 0.035); ruler = box(group, 0.42, 0.03, 0.006, q.x, q.y, q.z, MATERIALS.paintedSteel(0xd8d3c4), lb.yaw); ruler.rotation.z = -0.35; ruler.visible = false; }
      trace('loop-bench', { dx: 0.5, y: 1.85, w: 0.4, h: 0.26, kind: 'slow' });
      const strip = card('loop-bench', 9, '-1.10 KV PREDICTED / -1.06 KV ARCHIVED', 'Saira Malik pins the -1.10 KV PREDICTED / -1.06 KV ARCHIVED strip to the loop plan.', { dx: 0.0, y: 1.5 });
      // M10 at earth-cert: the April certificate, a new sharp voltage trace beside
      // it (from mission 9), and the STEADY TEST ONLY stamp.
      const cert = onFace('earth-cert', { dx: -0.3, y: 1.8, w: 0.5, h: 0.42, text: ['April resistance certificate'], sub: 'its test current, and the dry-weather conditions in small print', pin: true });
      const sharp = trace('earth-cert', { dx: 0.4, y: 1.8, w: 0.44, h: 0.3, kind: 'off' });
      void strip;
      hooks.push((state) => {
        const k = n(state);
        if(plan) plan.visible = k >= 8;
        if(ruler) ruler.visible = k >= 8;
        cert?.set({ stamp: k >= 10 ? 'STEADY TEST ONLY' : '' });
        sharp?.show(k >= 9 ? 'sharp' : 'off');
      });
      break;
    }
    case 'SCREEN': {
      // M13 at recorder-rack: a narrow peak above a slow trace that barely moves
      // (from mission 12), then FINAL SHOT: FAST INDEPENDENT CHANNELS tied to the
      // rack; the fast recorders light for the final shot.
      const screen = trace('recorder-rack', { dx: -0.5, y: 1.9, w: 0.6, h: 0.4, kind: 'slow' });
      const rack = panel('recorder-rack', 1, { title: 'Recorder rack', big: 'each with its last calibration seal', tone: 'plain' });
      const tag = card('recorder-rack', 13, 'FINAL SHOT: FAST INDEPENDENT CHANNELS', 'Noor Haddad ties a FINAL SHOT: FAST INDEPENDENT CHANNELS tag to the recorder rack.', { dx: 0.5, y: 1.5, w: 0.56 });
      const rr = at('recorder-rack');
      const recLamps = [];
      if(rr){ for(let i = 0; i < 6; i++){ const q = off(rr, -0.5 + i * 0.1, 1.55, 0.03); recLamps.push(lamp(group, q.x, q.y, q.z, 0x3fd15a, 0.025)); } }
      const budget = panel('record-budget', 1, { title: 'Channel bandwidths', big: 'the recorder budget Noor refuses to round away', tone: 'plain' });
      void tag; void budget;
      hooks.push((state) => {
        const k = n(state), w = won(state);
        screen?.show(w || k >= 15 ? 'final' : k >= 12 ? 'peak' : 'slow');
        recLamps.forEach(l => l.lit(w || k >= 15 ? 2.2 : k >= 13 ? 0.8 : 0));
        rack?.set(w || k >= 15 ? { big: 'The final shot trace stays inside the posted limits.', tone: 'ok', small: '' }
          : k >= 13 ? { big: 'FINAL SHOT: FAST INDEPENDENT CHANNELS', tone: 'ok', small: 'Noor Haddad ties a FINAL SHOT: FAST INDEPENDENT CHANNELS tag to the recorder rack.' }
          : k >= 12 ? { big: 'a narrow peak stands above a slow trace that barely moves', tone: 'warn', small: '' }
          : { big: 'each with its last calibration seal', tone: 'plain', small: '' });
      });
      break;
    }
    case 'COUPLE': {
      // M8 and M14 at trailer-cards: a burned card under glass beside an unmarked
      // cable jacket (from mission 7); the failed card bagged NO CONTACT REQUIRED;
      // a fresh strike trace at 188 V beside a strip marked 310 V (from mission
      // 13); card E bagged beneath RACK LOOP: REPAIR REQUIRED.
      const tc = at('trailer-cards');
      const burned = pic('trailer-cards', { dx: -0.7, y: 1.85, w: 0.3, h: 0.3, visible: false }, P.baggedCard);
      let glass = null, jacket = null;
      if(tc){
        const q = off(tc, -0.7, 1.85, 0.05);
        glass = box(group, 0.34, 0.34, 0.01, q.x, q.y, q.z, MATERIALS.glass(), tc.yaw); glass.visible = false;
        const j = off(tc, -0.35, 1.85, 0.04);
        jacket = cyl(group, 0.02, 0.3, j.x, j.y, j.z, DARK()); jacket.visible = false;
      }
      const bagged = pic('trailer-cards', { dx: 0.0, y: 1.9, w: 0.3, h: 0.3, visible: false }, P.baggedCard);
      const noContact = card('trailer-cards', 8, 'NO CONTACT REQUIRED', 'Owen Park bags the failed card with a NO CONTACT REQUIRED evidence label.', { dx: 0.0, y: 1.42, w: 0.42, h: 0.2 });
      const fresh = trace('trailer-cards', { dx: 0.65, y: 1.95, w: 0.44, h: 0.28, kind: 'off' });
      const v188 = onFace('trailer-cards', { dx: 0.5, y: 1.55, w: 0.2, h: 0.12, text: ['188 V'], pin: 'clip', visible: false });
      const v310 = onFace('trailer-cards', { dx: 0.8, y: 1.55, w: 0.2, h: 0.12, text: ['310 V'], pin: 'clip', visible: false });
      const cardE = pic('trailer-cards', { dx: -1.05, y: 1.9, w: 0.26, h: 0.26, visible: false }, P.baggedCard);
      const rackLoop = card('trailer-cards', 14, 'RACK LOOP: REPAIR REQUIRED', 'Owen Park bags card E beneath a RACK LOOP: REPAIR REQUIRED label.', { dx: -1.05, y: 1.45, w: 0.42, h: 0.2 });
      const cardsPanel = panel('trailer-cards', 1, { title: 'Cards A through F', big: 'Card E still tagged for a second look', tone: 'plain' });
      const repair = panel('repair-board', -1, { title: 'The final repair scope', big: 'the blank certification box for Station 12', tone: 'plain' });
      void noContact; void rackLoop;
      hooks.push((state) => {
        const k = n(state), w = won(state);
        if(burned) burned.visible = k >= 7; if(glass) glass.visible = k >= 7; if(jacket) jacket.visible = k >= 7;
        if(bagged) bagged.visible = k >= 8;
        fresh?.show(k >= 13 ? 'peak' : 'off'); v188?.set({ visible: k >= 13 }); v310?.set({ visible: k >= 13 });
        if(cardE) cardE.visible = k >= 14;
        cardsPanel?.set(w || k >= 15 ? { big: 'The repaired card measures 74 V on the final shot.', tone: 'ok', small: '' }
          : k >= 14 ? { big: 'RACK LOOP: REPAIR REQUIRED', tone: 'alert', small: 'Owen Park bags card E beneath a RACK LOOP: REPAIR REQUIRED label.' }
          : k >= 13 ? { big: 'a fresh strike trace ends at 188 V beside a second strip marked 310 V', tone: 'warn', small: '' }
          : k >= 8 ? { big: 'NO CONTACT REQUIRED', tone: 'ok', small: 'Owen Park bags the failed card with a NO CONTACT REQUIRED evidence label.' }
          : k >= 7 ? { big: 'a burned card lies under glass beside an unmarked cable jacket', tone: 'plain', small: '' }
          : { big: 'Card E still tagged for a second look', tone: 'plain', small: '' });
        repair?.set(w || k >= 15 ? { big: 'All six critical signed records pass, so certify Station 12', tone: 'ok' }
          : k >= 14 ? { big: 'RACK LOOP: REPAIR REQUIRED', tone: 'alert' }
          : { big: 'the blank certification box for Station 12', tone: 'plain' });
      });
      break;
    }
    case 'SHELTER': {
      // §3 crew-shelter: "Named helmets hang beside the crew-clear board. For each
      // authorized firing, the helmets are stored inside and the crew-clear lamps
      // must pass before the shot." Seven hooks on the back wall, a helmet on each
      // with its name under it; a locker beside them the helmets go into on a
      // firing day; the crew-clear board over the lot.
      const b = room.bounds;
      const zw = b.z1 - (b.wall ?? 0.2) / 2 - 0.06;
      const names = ['ORTIZ', 'SEN', 'TATE', 'STRAND', 'HADDAD', 'PARK', 'MALIK'];
      const shell = mat('gt.helmet', () => new THREE.MeshStandardMaterial({ color: 0xc9a23f, roughness: 0.5 }));
      const hung = [], stored = [];
      box(group, 3.4, 0.08, 0.08, -0.6, 1.95, zw, DARK());
      names.forEach((nm, i) => {
        const x = -2.1 + i * 0.5;
        cyl(group, 0.012, 0.08, x, 1.9, zw + 0.03, MATERIALS.steel());
        const h = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), shell);
        h.position.set(x, 1.7, zw + 0.16); group.add(h); hung.push(h);
        slip(group, { x, y: 1.42, z: zw + 0.01, rotY: Math.PI, w: 0.22, h: 0.1, text: [nm], pin: false, tone: 'card' });
      });
      // The locker: a steel cabinet on the right, its door open, a shelf inside.
      const lx = b.x1 - 0.9;
      box(group, 1.1, 2.0, 0.5, lx, 1.0, zw - 0.25, MATERIALS.paintedSteel(0x7f858a));
      box(group, 1.0, 0.04, 0.44, lx, 1.35, zw - 0.25, DARK());
      box(group, 1.0, 0.04, 0.44, lx, 0.75, zw - 0.25, DARK());
      const door = box(group, 0.02, 1.9, 0.5, lx - 0.55, 1.0, zw - 0.25, MATERIALS.paintedSteel(0x7f858a));
      door.geometry = door.geometry.clone().translate(0, 0, 0.25);
      door.position.z = zw - 0.5; door.rotation.y = -1.2;
      names.forEach((_, i) => {
        const h = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), shell);
        h.position.set(lx - 0.36 + (i % 4) * 0.24, i < 4 ? 1.37 : 0.77, zw - 0.25); h.visible = false; group.add(h); stored.push(h);
      });
      ctx.solid?.(lx, zw - 0.25, 1.1, 2.0, 0.5);
      // The crew-clear board: six lamps over a panel.
      const board = statusPanel(group, { x: -0.6, y: 2.55, z: zw, rotY: Math.PI, w: 2.0, h: 0.6, title: 'crew-clear board', big: 'Named helmets hang beside the crew-clear board.', tone: 'plain', lit: true });
      const lamps = [0, 1, 2, 3, 4, 5].map(i => lamp(group, -1.6 + i * 0.4, 2.95, zw + 0.03, 0x3fd15a, 0.05));
      hooks.push((state) => {
        const d = day(state), w = won(state);
        const firing = firingDay(d) || w;
        hung.forEach(h => { h.visible = !firing; });
        stored.forEach(h => { h.visible = firing; });
        lamps.forEach((l, i) => l.lit(firing ? 2.4 : (i === 3 && n(state) < 1 ? 0 : 0.6)));
        board.set(firing ? { big: 'GO', tone: 'ok', small: 'For each authorized firing, the helmets are stored inside and the crew-clear lamps must pass before the shot.' }
          : { big: 'Named helmets hang beside the crew-clear board.', tone: 'plain', small: '' });
      });
      break;
    }
    default: break;
  }
  // Every aftermath card appears when its mission's decision is accepted, and
  // stays: "retain the changed prop at its home for later inspection".
  hooks.push((state) => { const k = n(state); for(const c of cards) c.set({ visible: k >= c.userData.fromMission }); });
  for(const h of hooks) stateHooks.push(h);
}

// =============================================================== the extra pass
//
// Beyond the ledger. A salt flat in storm season has a storm on its horizon
// that gets closer, dust off the crust in the wind, a sock hard over, birds
// riding the front, and lightning far off that you see before you hear it.
export function storyExtras(scene, ctx){
  const { groundHeight, animate, stateHooks, softColliders } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const won = (state) => state?.status === 'won';

  // The storm cell on the horizon: an unlit mass of dark lumps upwind, far off
  // on day one and closing over the site as the season goes. Overhead for the
  // shot. Unlit, like everything else in this sky.
  {
    const cell = new THREE.Group();
    const cm = new THREE.MeshBasicMaterial({ color: 0x3c424b, transparent: true, opacity: 0.9, depthWrite: false, fog: false });
    let s = 9001; const r = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
    for(let i = 0; i < 11; i++){
      const m = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), cm);
      const rx = 30 + r() * 45;
      m.position.set((r() - 0.5) * 180, (r() - 0.5) * 30 - (i > 7 ? 30 : 0), (r() - 0.5) * 120);
      m.scale.set(rx, 10 + r() * 14, rx * (0.6 + r() * 0.5));
      m.userData.ignoreAudit = true; m.userData.structure = 'sky';
      cell.add(m);
    }
    const far = new THREE.Vector3(-380, 128, -470), near = new THREE.Vector3(-30, 138, -150), over = new THREE.Vector3(0, 146, -60);
    cell.position.copy(far);
    scene.add(cell);
    let target = far.clone();
    stateHooks?.push((state) => { target = won(state) ? over.clone() : far.clone().lerp(near, (day(state) - 1) / 14); });
    animate?.((t, dt) => { cell.position.lerp(target, Math.min(1, dt * 0.05)); cell.position.x += Math.sin(t * 0.05) * 0.02; });
  }

  // Far lightning: every flash the weather layer fires puts a bolt on the horizon
  // at a random bearing, for a third of a second, and the thunder comes later.
  {
    const bolt = boltRig(scene, 9, 1.4, 0xeaf2ff, 0.9);
    let life = 0;
    onLightning(({ distance }) => {
      const d = Math.min(640, Math.max(220, distance ?? 500));
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * d, z = -60 + Math.sin(a) * d;
      bolt.set(jag({ x: x + 10, y: 150, z }, { x, y: at(x, z), z }, 9, 0.12));
      life = 0.36;
    });
    animate?.((t, dt) => {
      if(life <= 0){ bolt.show(0); return; }
      life -= dt;
      bolt.show((life / 0.36) * (0.6 + 0.4 * Math.sin(t * 80)));
    });
  }

  // A wind sock by the spawn, hard over on the wind.
  {
    const x = -9, z = 62, y = at(x, z);
    cyl(scene, 0.06, 4.0, x, y + 2.0, z, STEEL());
    const sock = new THREE.Mesh(new THREE.ConeGeometry(0.26, 2.0, 8, 1, true),
      mat('gt.sock', () => new THREE.MeshStandardMaterial({ color: 0xc9702a, roughness: 0.9, side: THREE.DoubleSide })));
    sock.geometry.translate(0, -1.0, 0);
    sock.position.set(x, y + 3.9, z);
    sock.rotation.z = Math.PI / 2 - 0.35; sock.rotation.y = -Math.atan2(1.4, 2.6);
    scene.add(sock);
    animate?.(sway(sock, 'x', 0.16, 2.2));
    softColliders?.push({ x, z, r: 0.4 });
  }

  // Salt-crust dust: low pale streamers scrolling along the wind, far from the
  // spawn, unlit and half-transparent.
  {
    const c = document.createElement('canvas'); c.width = 256; c.height = 64;
    const g = c.getContext('2d');
    for(let i = 0; i < 50; i++){
      const x = Math.random() * 256, y = Math.random() * 64, len = 30 + Math.random() * 70;
      const grad = g.createLinearGradient(x, y, x + len, y);
      grad.addColorStop(0, 'rgba(216,212,200,0)'); grad.addColorStop(0.5, 'rgba(216,212,200,0.5)'); grad.addColorStop(1, 'rgba(216,212,200,0)');
      g.fillStyle = grad; g.fillRect(x, y, len, 1.5);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    for(const [x, z, w, d] of [[-60, -30, 50, 14], [60, -44, 60, 16], [-44, 92, 50, 14]]){
      const t = tex.clone(); t.needsUpdate = true; t.repeat.set(w / 14, d / 14);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d),
        new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.22, depthWrite: false }));
      m.rotation.x = -Math.PI / 2; m.rotation.z = -Math.atan2(1.4, 2.6);
      m.position.set(x, at(x, z) + 0.16, z);
      m.userData.ignoreAudit = true;
      scene.add(m);
      animate?.((tt) => { t.offset.x = -(tt * 0.9) % 1; });
    }
  }

  // Two jackrabbits on the flat: a few hops and a stop.
  {
    const fur = mat('gt.rabbit', () => new THREE.MeshStandardMaterial({ color: 0x8a7a62, roughness: 0.95 }));
    for(const [i, [hx, hz]] of [[-62, 44], [58, -66]].entries()){
      const g = new THREE.Group();
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), fur); b.scale.set(1.3, 0.9, 1); b.position.y = 0.17; g.add(b);
      const h = new THREE.Mesh(new THREE.SphereGeometry(0.09, 7, 5), fur); h.position.set(0.2, 0.32, 0); g.add(h);
      for(const s of [-1, 1]) box(g, 0.04, 0.2, 0.03, 0.22, 0.5, s * 0.04, fur);
      scene.add(g);
      let ax = hx, az = hz, tx = hx, tz = hz, wait = i * 1.3;
      animate?.((t, dt) => {
        if(wait > 0){ wait -= dt; return; }
        const d = Math.hypot(tx - ax, tz - az);
        if(d < 0.05){ tx = hx + (Math.random() - 0.5) * 10; tz = hz + (Math.random() - 0.5) * 10; wait = 1.5 + Math.random() * 4; return; }
        const step = Math.min(d, dt * 2.6);
        ax += (tx - ax) / d * step; az += (tz - az) / d * step;
        g.position.set(ax, at(ax, az) + Math.abs(Math.sin(t * 9)) * 0.2, az);
        g.rotation.y = Math.atan2(tx - ax, tz - az) - Math.PI / 2;
      });
      g.position.set(hx, at(hx, hz), hz);
    }
  }

  // A kettle of gulls riding the front: seven, circling high over the walk
  // north, wings beating slowly, the circle drifting on the wind.
  {
    const cx = -40, cz = 90, y0 = 26;
    const flock = [];
    for(let i = 0; i < 7; i++){
      const b = bird(scene, i % 3 ? 0x4a4f56 : 0x8a8e94);
      flock.push({ ...b, phase: i * 0.9, r: 14 + (i % 3) * 4, h: (i % 4) * 2.2 });
    }
    animate?.((t) => {
      const dx = Math.sin(t * 0.07) * 12, dz = Math.cos(t * 0.05) * 9;
      flock.forEach((b) => {
        const a = t * 0.28 + b.phase;
        b.g.position.set(cx + dx + Math.cos(a) * b.r, y0 + b.h + Math.sin(t * 0.6 + b.phase) * 1.2, cz + dz + Math.sin(a) * b.r);
        b.g.rotation.y = -a; b.g.rotation.z = 0.22;
        b.wings.forEach((w, k) => { w.rotation.x = (k ? -1 : 1) * Math.sin(t * 4 + b.phase) * 0.45; });
      });
    });
  }

  // The met mast's anemometer, turning faster as the season's wind does.
  {
    const mx = -52, mz = 6, my = at(mx, mz);
    cyl(scene, 0.03, 0.5, mx, my + 10.25, mz, GALV());
    const cups = new THREE.Group(); cups.position.set(mx, my + 10.5, mz); scene.add(cups);
    for(let i = 0; i < 3; i++){
      const a = (i / 3) * Math.PI * 2;
      box(cups, 0.02, 0.02, 0.3, Math.sin(a) * 0.15, 0, Math.cos(a) * 0.15, GALV(), a);
      const cup = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6, 0, Math.PI), MATERIALS.paintedSteel(0x22262a));
      cup.position.set(Math.sin(a) * 0.3, 0, Math.cos(a) * 0.3); cup.rotation.y = a + Math.PI / 2; cups.add(cup);
    }
    let rate = 3;
    stateHooks?.push((state) => { rate = won(state) ? 11 : 2.5 + 0.5 * day(state); });
    animate?.((t, dt) => { cups.rotation.y += rate * dt; });
  }
}
