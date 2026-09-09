// story.js — Cerro Alto changing, mission by mission, as the bible writes it.
//
// PLANETARY.md writes fifteen `Physical aftermath` blocks (one per mission: a
// Home fixture, a Before, an exact After action, a trigger and the next visible
// problem), a §7.1 persistent world-state ledger, three landmark-only spaces
// (§3: ridge-terrace, night-kitchen, dome-catwalk) and a §8.1 final scene — the
// warning-network wall filling with acknowledgements, marked buses leaving the
// town below the ridge, the main-body stand-down kept green and the dish still
// tracking the fragment. Every one of those is a prop here, keyed to the mission
// that writes it through `missionsAccepted`.
//
// `storyOutdoors` runs from `decorate`; `dressRoom` runs when a room is built;
// `storyExtras` is the alive pass beyond the bible's list. Every word printed on
// a panel or a slip is the bible's own — a card name, a strip, a header line, a
// notice sentence. Geometry, placement and motion are ours.
//
// NIGHT. This campaign is played at 1 a.m. under a hidden sky dome, so nothing
// here is lit by a light: whatever must read is emissive, and anything in the
// sky is `MeshBasicMaterial` — a lit sphere up there renders black.
//
// HOME IDS. The bible's fixture ids all exist in fixtures.js, but under keys that
// are the bible's place names (COORDINA, SPECDOME) rather than this theme's room
// ids (OPS, CHAR), and fixtures.js's own OPS key holds the Survey Telescope's two
// objects. `HOME` below maps each room to the bible's list for it, so a slip is
// hung on the wall of the room the bible means. See the report in the commit.
import * as THREE from 'three';
import { box, cyl, MATERIALS, sign, bench } from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { animate as tick, sway, blink, flicker } from '../../engine/world/animators.js';
import { statusPanel, slip, fixturePlaces, missionsAccepted } from '../../engine/world/paper.js';
import { FIXTURES } from './fixtures.js';

// ------------------------------------------------------------------ copy
// The bible's mission header, verbatim, and the hours it counts down through.
const HOURS = [264, 252, 240, 216, 192, 168, 144, 120, 108, 96, 84, 72, 60, 36, 24];
const HEADER = (d) => {
  const m = Math.min(15, Math.max(1, d));
  return `MISSION ${m} - ${HOURS[m - 1]} HOURS TO THE PREDICTED ENCOUNTER.`;
};
const HEADER_DONE = 'MISSION 15 COMPLETE';
// Stop 9's sentence that "can appear unchanged in the official notice".
const NOTICE = 'The asteroid has an 8.0% model-based chance of impact under the current orbit distribution.';

// Which bible fixture list each of this theme's rooms carries.
const HOME = {
  OPS: FIXTURES.COORDINA,     // Coordination Office
  ORBIT: FIXTURES.ORBIT,      // Orbit Determination Center
  DISC: FIXTURES.OPS,         // Survey Telescope (fixtures.js keys it OPS)
  CHAR: FIXTURES.SPECDOME,    // Spectroscopy Dome
  RADAR: FIXTURES.RADAR,
  IMPACT: FIXTURES.IMPACT,
  TOWN: FIXTURES.TOWN,
};

// ------------------------------------------------------------- materials
const STEEL = () => MATERIALS.paintedSteel(0x4a4f55);
const DARK = () => MATERIALS.paintedSteel(0x2a2d31);
const RED = 0xd8321c;
const emit = (c, k = 1.6) => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: k, roughness: 0.5 });
const skyMat = (c, opacity = 1) => new THREE.MeshBasicMaterial({ color: c, transparent: opacity < 1, opacity, fog: false, depthWrite: false });

function solid(colliders, x, z, y, hx, h, hz = hx){
  const b = new THREE.Box3(new THREE.Vector3(x - hx, y, z - hz), new THREE.Vector3(x + hx, y + h, z + hz));
  colliders?.push(b);
  return b;
}

/** A small deterministic random, so a board paints the same cloud every time. */
function lcg(seed){
  let s = (seed >>> 0) || 1;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

// ------------------------------------------------------------- a board
// The bibles' plots are two-colour — a green primary track, a red fragment, an
// amber injected dot — and `screens.js`'s plot painter draws in one ink. So a
// painted board of our own: dark field, title strip, and a `draw(g, box, st)`
// callback that paints the state. Returns the mesh; `mesh.set(st)` repaints.
const INK = { bg: '#1b2026', bar: '#161d23', dim: '#8a949c', grid: '#2a323a', fg: '#e8ebe6',
  green: '#67e0a3', red: '#ff6b6b', amber: '#ffd166', blue: '#6fa8ff', grey: '#6a737b', white: '#f4f4f0' };

function board(parent, { x, y, z, rotY = 0, w = 1.3, h = 0.8, title = '', draw, state = {}, lit = true }){
  const W = 512, H = Math.round(512 * (h / w));
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  let st = state;
  const paint = () => {
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = INK.bg; g.fillRect(0, 0, W, H);
    g.fillStyle = INK.bar; g.fillRect(0, 0, W, 34);
    g.fillStyle = INK.dim; g.font = '700 15px Inter, Helvetica, Arial, sans-serif';
    g.textBaseline = 'middle'; g.textAlign = 'left';
    g.fillText(String(title).toUpperCase(), 14, 18);
    const bx = { x0: 28, y0: 52, x1: W - 20, y1: H - 26, W, H };
    bx.X = (u) => bx.x0 + (bx.x1 - bx.x0) * Math.max(0, Math.min(1, u));
    bx.Y = (v) => bx.y1 - (bx.y1 - bx.y0) * Math.max(0, Math.min(1, v));
    // A quiet grid, so a point can be read against something.
    g.strokeStyle = INK.grid; g.lineWidth = 1;
    for(let i = 1; i < 4; i++){
      g.beginPath(); g.moveTo(bx.x0, bx.Y(i / 4)); g.lineTo(bx.x1, bx.Y(i / 4)); g.stroke();
      g.beginPath(); g.moveTo(bx.X(i / 4), bx.y0); g.lineTo(bx.X(i / 4), bx.y1); g.stroke();
    }
    g.strokeStyle = INK.dim; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(bx.x0, bx.y0); g.lineTo(bx.x0, bx.y1); g.lineTo(bx.x1, bx.y1); g.stroke();
    try{ draw?.(g, bx, st); }catch(err){ console.warn('[story] board paint failed', title, err); }
    tex.needsUpdate = true;
  };
  paint();
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({
    map: tex, roughness: 0.5, metalness: 0.05,
    emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: lit ? 0.45 : 0.1,
  }));
  m.position.set(x, y, z); m.rotation.y = rotY;
  m.userData.ignoreAudit = true;
  m.set = (next) => { st = { ...st, ...next }; paint(); };
  m.state = () => st;
  parent.add(m);
  return m;
}

/** A word on a board, in a colour. Labels always carry text, never colour alone. */
function label(g, text, x, y, colour = INK.dim, size = 12, align = 'left'){
  g.fillStyle = colour; g.font = `700 ${size}px Inter, Helvetica, Arial, sans-serif`;
  g.textAlign = align; g.textBaseline = 'middle';
  g.fillText(text, x, y);
  g.textAlign = 'left';
}

function line(g, pts, colour, width = 2, dash = null){
  if(pts.length < 2) return;
  g.strokeStyle = colour; g.lineWidth = width;
  if(dash) g.setLineDash(dash);
  g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke();
  g.setLineDash([]);
}

function dot(g, x, y, r, colour){
  g.fillStyle = colour; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
}

/** Empty board: what it is waiting for, in the middle, in the bible's words. */
function waiting(g, bx, text){
  label(g, text, (bx.x0 + bx.x1) / 2, (bx.y0 + bx.y1) / 2, INK.dim, 16, 'center');
}

// ------------------------------------------------------------- painters
// Each takes (g, bx, st) where `st.k` is how many missions are accepted.

/** The fit-board: the orbit cloud, the Earth marker, and how the cloud tightens. */
function paintOrbitCloud(g, bx, st){
  const k = st.k ?? 0;
  if(k < 1){ waiting(g, bx, 'SIX POSITIONS · NO FIT YET'); return; }
  // Earth, a marker on the right of the plot. The paths run left to right.
  const ex = bx.X(0.72), ey = bx.Y(0.5);
  // The cloud: sixty sample paths, a spread that contracts on mission 7 (the
  // radar range) and again on 8 (the b-plane). Earth stays inside it.
  const spread = k >= 8 ? 0.10 : k >= 7 ? 0.16 : 0.42;
  const rnd = lcg(7);
  g.globalAlpha = 0.55;
  for(let i = 0; i < 60; i++){
    const off = (rnd() - 0.5) * 2 * spread, bend = (rnd() - 0.5) * 0.1;
    const pts = [];
    for(let s = 0; s <= 10; s++){
      const u = s / 10;
      pts.push([bx.X(u * 0.96 + 0.02), bx.Y(0.5 + off * u + bend * Math.sin(u * Math.PI))]);
    }
    const hits = Math.abs(off) < 0.045;
    line(g, pts, hits ? INK.red : INK.blue, 1);
  }
  g.globalAlpha = 1;
  dot(g, ex, ey, 7, INK.blue); g.strokeStyle = INK.white; g.lineWidth = 1.5; g.beginPath(); g.arc(ex, ey, 7, 0, Math.PI * 2); g.stroke();
  label(g, 'EARTH', ex + 12, ey, INK.white, 12);
  label(g, k >= 8 ? '63% IMPACT / 37% MISS' : k >= 7 ? 'RANGE ADDED · CLOUD CONTRACTS' : '3.2% IMPACT PATHS',
    bx.x0 + 6, bx.y0 + 10, k >= 8 ? INK.red : INK.amber, 12);
  label(g, 'six timed positions →', bx.x0 + 6, bx.y1 - 10, INK.dim, 11);
}

/** The observing schedule: time blocks, and the dawn line that cuts them. */
function paintSchedule(g, bx, st){
  const k = st.k ?? 0;
  const rows = ['OPTICAL', 'RADAR', 'THERMAL'];
  const blocks = [[0.05, 0.3], [0.36, 0.55], [0.6, 0.78], [0.82, 0.96]];
  rows.forEach((name, r) => {
    const y = bx.Y(0.82 - r * 0.3);
    label(g, name, bx.x0 + 6, y - 16, INK.dim, 11);
    blocks.forEach(([a, b], i) => {
      if((r + i) % 3 === 2) return;
      const x0 = bx.X(a), x1 = bx.X(b);
      const late = k >= 3 && a >= 0.6;
      g.fillStyle = late ? '#3a2a2a' : (k >= 4 ? '#24503a' : '#2a3a4a');
      g.fillRect(x0, y - 9, x1 - x0, 18);
      g.strokeStyle = late ? INK.red : (k >= 4 ? INK.green : INK.blue); g.lineWidth = 1.2; g.strokeRect(x0, y - 9, x1 - x0, 18);
    });
  });
  if(k >= 3){
    const dx = bx.X(0.6);
    line(g, [[dx, bx.y0], [dx, bx.y1]], INK.amber, 2, [8, 6]);
    label(g, 'DAWN', dx + 5, bx.y0 + 10, INK.amber, 12);
  }
  label(g, k >= 4 ? 'COMBINED OPTICAL, RADAR, AND THERMAL SCHEDULE' : 'REMAINING TELESCOPE BLOCKS', bx.x0 + 6, bx.y1 - 8, k >= 4 ? INK.green : INK.dim, 11);
}

/** The scopeboard's four star fields, one dot moving across them. */
function paintFourFields(g, bx, st){
  const k = st.k ?? 0;
  const rnd = lcg(31);
  const stars = Array.from({ length: 26 }, () => [rnd(), rnd()]);
  const w = (bx.x1 - bx.x0) / 4 - 6, h = (bx.y1 - bx.y0) - 36;
  for(let f = 0; f < 4; f++){
    const x0 = bx.x0 + f * (w + 8), y0 = bx.y0 + 4;
    g.fillStyle = '#0c1016'; g.fillRect(x0, y0, w, h);
    g.strokeStyle = INK.grid; g.strokeRect(x0, y0, w, h);
    for(const [u, v] of stars) dot(g, x0 + 4 + u * (w - 8), y0 + 4 + v * (h - 8), 1.3, '#cfd4d8');
    // The displaced dot: the same star field, one point that has moved.
    dot(g, x0 + w * (0.25 + f * 0.16), y0 + h * (0.62 - f * 0.07), 2.4, k >= 1 ? INK.green : INK.amber);
    label(g, `FRAME ${f + 1}`, x0 + 4, y0 + h + 10, INK.dim, 10);
  }
  if(k >= 1) label(g, 'REAL MOVING OBJECT', (bx.x0 + bx.x1) / 2, bx.y1 - 4, INK.green, 14, 'center');
  else label(g, 'ONE DISPLACED DOT', (bx.x0 + bx.x1) / 2, bx.y1 - 4, INK.amber, 12, 'center');
}

/** The corridor map: the old land band, and the corrected path over deep ocean. */
function paintCorridor(g, bx, st){
  const k = st.k ?? 0;
  if(k < 12){ waiting(g, bx, 'PLAN WHOLE BAND'); return; }
  // A coastline: land to the upper right, ocean lower left.
  g.fillStyle = '#20313f'; g.fillRect(bx.x0 + 1, bx.y0, bx.x1 - bx.x0 - 1, bx.y1 - bx.y0);
  g.fillStyle = '#3a3a34'; g.beginPath();
  g.moveTo(bx.X(0.35), bx.y0); g.lineTo(bx.x1, bx.y0); g.lineTo(bx.x1, bx.y1); g.lineTo(bx.X(0.7), bx.y1);
  g.quadraticCurveTo(bx.X(0.45), bx.Y(0.5), bx.X(0.35), bx.y0); g.fill();
  label(g, 'LAND', bx.X(0.85), bx.Y(0.5), INK.dim, 12, 'center');
  label(g, 'DEEP OCEAN', bx.X(0.2), bx.Y(0.3), INK.blue, 12, 'center');
  // The old land band, wide and grey.
  g.globalAlpha = 0.45;
  line(g, [[bx.X(0.05), bx.Y(0.95)], [bx.X(0.95), bx.Y(0.35)]], INK.grey, 26);
  g.globalAlpha = 1;
  label(g, 'OLD LAND BAND', bx.X(0.6), bx.Y(0.62), INK.grey, 11);
  // The corrected primary path, over the water.
  line(g, [[bx.X(0.05), bx.Y(0.7)], [bx.X(0.62), bx.Y(0.1)]], INK.green, 3);
  label(g, 'CORRECTED PRIMARY PATH', bx.X(0.08), bx.Y(0.78), INK.green, 11);
  if(k >= 13) label(g, 'PRIMARY BODY: LAND STAND-DOWN', (bx.x0 + bx.x1) / 2, bx.y1 - 8, INK.green, 12, 'center');
}

/** Two tracks: the green primary, and a red echo that separates from it. */
function paintTracks(g, bx, st, { corridor = false } = {}){
  const k = st.k ?? 0;
  const from = corridor ? 14 : 13;
  if(k < from){ waiting(g, bx, corridor ? 'PRIMARY TRACK' : 'PRESERVED SHOULDER'); return; }
  const prim = [];
  for(let s = 0; s <= 12; s++){ const u = s / 12; prim.push([bx.X(0.03 + u * 0.94), bx.Y(0.62 - u * 0.25)]); }
  if(corridor){
    g.globalAlpha = 0.35; line(g, prim, INK.green, 16); g.globalAlpha = 1;
  }
  line(g, prim, INK.green, 3);
  label(g, corridor ? 'GREEN PRIMARY TRACK' : 'PRIMARY TRACK', bx.X(0.05), bx.Y(0.72), INK.green, 12);
  const frag = [];
  for(let s = 0; s <= 12; s++){
    const u = s / 12;
    const sep = Math.max(0, u - 0.4) / 0.6;
    frag.push([bx.X(0.03 + u * 0.94), bx.Y(0.62 - u * 0.25 - sep * sep * 0.3)]);
  }
  if(corridor){ g.globalAlpha = 0.3; line(g, frag.slice(5), INK.red, 8); g.globalAlpha = 1; }
  line(g, frag, INK.red, corridor ? 2 : 3);
  dot(g, frag[12][0], frag[12][1], 4, INK.red);
  label(g, corridor ? 'NARROW RED FRAGMENT CORRIDOR' : (k >= 14 ? 'SEPARATE FRAGMENT: 32 M' : 'NEW RED ECHO'), bx.X(0.45), bx.Y(0.12), INK.red, 12);
  if(corridor) label(g, 'PRIMARY BODY: LAND STAND-DOWN', bx.x0 + 6, bx.y1 - 8, INK.green, 11);
}

/** The pipeline bench: injected dots, recovered points, one trailed image. */
function paintPipeline(g, bx, st){
  const k = st.k ?? 0;
  if(k < 4){ waiting(g, bx, 'SUMMIT PIPELINE'); return; }
  const rnd = lcg(11);
  for(let i = 0; i < 14; i++){
    const x = bx.X(0.06 + rnd() * 0.88), y = bx.Y(0.1 + rnd() * 0.78);
    g.strokeStyle = INK.amber; g.lineWidth = 1.5; g.strokeRect(x - 5, y - 5, 10, 10);
    // Recovered beside it, a hair off — the local error term.
    if(i !== 9) dot(g, x + 2 + (rnd() - 0.5) * 4, y - 1 + (rnd() - 0.5) * 4, 3, INK.green);
  }
  // One trailed image: a streak where a point should be.
  line(g, [[bx.X(0.62), bx.Y(0.3)], [bx.X(0.7), bx.Y(0.38)]], INK.white, 4);
  label(g, 'TRAILED', bx.X(0.71), bx.Y(0.3), INK.white, 11);
  label(g, '□ INJECTED', bx.x0 + 6, bx.y0 + 10, INK.amber, 11);
  label(g, '● RECOVERED', bx.x0 + 96, bx.y0 + 10, INK.green, 11);
  if(k >= 5) label(g, 'ACCEPT WITH LOCAL ERROR TERM', (bx.x0 + bx.x1) / 2, bx.y1 - 8, INK.green, 12, 'center');
}

/** The sizing board: two size curves that cross, and where they cross. */
function paintSizing(g, bx, st){
  const k = st.k ?? 0;
  if(k < 5){ waiting(g, bx, 'BRIGHTNESS · ALBEDO · THERMAL FLUX'); return; }
  // Reflected light: brightness fixed, so diameter falls as albedo rises.
  const refl = [], therm = [];
  for(let s = 0; s <= 20; s++){
    const u = s / 20;
    refl.push([bx.X(u), bx.Y(Math.min(0.95, 0.12 / Math.max(0.08, u) * 0.5))]);
    therm.push([bx.X(u), bx.Y(0.62 - u * 0.05)]);
  }
  line(g, refl, INK.amber, 2.5);
  line(g, therm, k >= 6 ? INK.red : INK.grey, 2.5, k >= 6 ? null : [8, 6]);
  label(g, 'REFLECTED LIGHT', bx.X(0.55), bx.Y(0.2), INK.amber, 11);
  label(g, 'THERMAL FLUX', bx.X(0.55), bx.Y(0.68), k >= 6 ? INK.red : INK.grey, 11);
  label(g, 'albedo →', bx.X(0.85), bx.y1 - 8, INK.dim, 11);
  label(g, 'diameter', bx.x0 + 4, bx.y0 + 8, INK.dim, 11);
  // Where the assumed bright albedo put it, and where the crossing puts it.
  dot(g, bx.X(0.5), bx.Y(0.12), 5, k >= 6 ? INK.grey : INK.amber);
  label(g, '106 M', bx.X(0.5) + 8, bx.Y(0.12), k >= 6 ? INK.grey : INK.amber, 12);
  if(k >= 6){
    dot(g, bx.X(0.1), bx.Y(0.6), 6, INK.red);
    label(g, '230–290 M', bx.X(0.1) + 10, bx.Y(0.6) - 12, INK.red, 13);
  }
}

/** Rotation photometry: two repeating peaks beside the old radar shoulder. */
function paintLightCurve(g, bx, st){
  const k = st.k ?? 0;
  if(k < 9){ waiting(g, bx, 'PHASED LIGHT CURVE'); return; }
  const pts = [];
  for(let s = 0; s <= 80; s++){
    const u = s / 80, ph = u * Math.PI * 4;
    const v = 0.5 + 0.18 * Math.sin(ph) + 0.1 * Math.sin(ph * 0.5 + 0.6);
    pts.push([bx.X(u * 0.68), bx.Y(v)]);
  }
  line(g, pts, INK.amber, 2.2);
  for(const u of [0.125, 0.625]) label(g, 'PEAK', bx.X(u * 0.68), bx.Y(0.86), INK.amber, 11, 'center');
  label(g, 'rotation phase →', bx.X(0.3), bx.y1 - 8, INK.dim, 11);
  // The old radar shoulder, kept in its own lane on the right.
  const sx = bx.X(0.74), sw = bx.X(0.98) - sx;
  g.fillStyle = '#12171d'; g.fillRect(sx, bx.y0, sw, bx.y1 - bx.y0);
  const echo = [];
  for(let s = 0; s <= 30; s++){
    const u = s / 30;
    const v = 0.1 + 0.7 * Math.exp(-Math.pow((u - 0.4) / 0.07, 2)) + 0.2 * Math.exp(-Math.pow((u - 0.66) / 0.08, 2));
    echo.push([sx + u * sw, bx.Y(v)]);
  }
  line(g, echo, INK.green, 2);
  label(g, 'OLD RADAR SHOULDER', sx + sw / 2, bx.y0 + 10, INK.dim, 10, 'center');
  if(k >= 10) label(g, 'TWO LOBES / NO DETACHED FRAGMENT YET', bx.x0 + 6, bx.y0 + 10, INK.red, 12);
}

/** The radar timing board: the untouched strip, main echo and faint shoulder. */
function paintEcho(g, bx, st){
  const k = st.k ?? 0;
  if(k < 6){ waiting(g, bx, 'TRANSMIT · RECEIVE · ARCHIVE'); return; }
  const echo = [];
  for(let s = 0; s <= 120; s++){
    const u = s / 120;
    const v = 0.08 + 0.78 * Math.exp(-Math.pow((u - 0.42) / 0.035, 2)) + 0.14 * Math.exp(-Math.pow((u - 0.6) / 0.05, 2)) + 0.02 * Math.sin(u * 90);
    echo.push([bx.X(u), bx.Y(v)]);
  }
  line(g, echo, INK.green, 2.2);
  label(g, 'MAIN ECHO', bx.X(0.42), bx.Y(0.92), INK.green, 12, 'center');
  label(g, 'FAINT SHOULDER', bx.X(0.62), bx.Y(0.32), INK.amber, 11);
  label(g, 'UNTOUCHED STRIP', bx.x0 + 6, bx.y0 + 10, INK.dim, 11);
  if(k >= 7){
    const cx = bx.X(0.42), c2 = bx.X(0.38);
    line(g, [[cx, bx.y0 + 20], [cx, bx.y1]], INK.grey, 1.2, [5, 5]);
    line(g, [[c2, bx.y0 + 20], [c2, bx.y1]], INK.white, 1.6);
    label(g, '−0.7 s', c2 - 6, bx.y0 + 28, INK.white, 11, 'right');
    label(g, 'CORRECTED MAIN-ECHO TIME', bx.x0 + 6, bx.y1 - 8, INK.white, 11);
  }
  label(g, 'delay →', bx.X(0.9), bx.y1 - 8, INK.dim, 11);
}

/** The corridor risk display: ocean, desert and coast under one path band. */
function paintRisk(g, bx, st){
  const k = st.k ?? 0;
  if(k < 8){ waiting(g, bx, 'CORRIDOR RISK'); return; }
  const strips = [['OCEAN', '#20313f', INK.blue], ['DESERT', '#3f3628', INK.amber], ['COAST', '#3a2a2a', INK.red]];
  strips.forEach(([name, fill, ink], i) => {
    const y0 = bx.Y(1 - i / 3), y1 = bx.Y(1 - (i + 1) / 3);
    g.fillStyle = fill; g.fillRect(bx.x0 + 1, y0, bx.x1 - bx.x0 - 1, y1 - y0);
    label(g, name, bx.x0 + 8, (y0 + y1) / 2, ink, 12);
  });
  g.globalAlpha = 0.5;
  line(g, [[bx.X(0.1), bx.y1], [bx.X(0.9), bx.y0]], INK.grey, 30);
  g.globalAlpha = 1;
  label(g, 'SAME PATH BAND', bx.X(0.5), bx.Y(0.5), INK.white, 12, 'center');
  if(k >= 9) label(g, 'PLAN WHOLE BAND / NO LOCAL ORDER YET', (bx.x0 + bx.x1) / 2, bx.y0 + 10, INK.amber, 12, 'center');
}

/** The intervention desk: the tiny available impulse against what is required. */
function paintImpulse(g, bx, st){
  const k = st.k ?? 0;
  if(k < 10){ waiting(g, bx, 'MISS DISTANCE · LEAD TIME · IMPULSE'); return; }
  const rows = [['REQUIRED', 0.92, INK.red], ['AVAILABLE IMPULSE', 0.07, INK.amber]];
  rows.forEach(([name, v, ink], i) => {
    const y = bx.Y(0.7 - i * 0.4);
    label(g, name, bx.x0 + 6, y - 20, ink, 11);
    g.fillStyle = ink; g.fillRect(bx.X(0.02), y - 10, (bx.x1 - bx.x0) * v * 0.96, 20);
  });
  if(k >= 11) label(g, 'INSUFFICIENT IMPULSE', (bx.x0 + bx.x1) / 2, bx.y1 - 8, INK.red, 14, 'center');
}

/** The public-action board: the probability strip and the posted warning line. */
function paintThreshold(g, bx, st){
  const k = st.k ?? 0;
  const vals = [[2, 3.2], [3, 8.0], [8, 63]];
  const shown = vals.filter(([m]) => k >= m);
  // Log-ish scale so 1% is a line and 63% is still on the board.
  const Y = (p) => bx.Y(Math.log10(Math.max(0.1, p) * 10) / 3);
  line(g, [[bx.x0, Y(1)], [bx.x1, Y(1)]], INK.amber, 2, [8, 6]);
  label(g, 'POSTED WARNING LINE · 1%', bx.x0 + 6, Y(1) - 10, INK.amber, 11);
  if(!shown.length){ label(g, 'NO PROBABILITY STRIP YET', (bx.x0 + bx.x1) / 2, bx.Y(0.25), INK.dim, 13, 'center'); return; }
  const pts = [[bx.X(0.05), Y(0.3)], ...shown.map(([, p], i) => [bx.X(0.25 + i * 0.3), Y(p)])];
  line(g, pts, INK.red, 3);
  shown.forEach(([, p], i) => { const x = bx.X(0.25 + i * 0.3); dot(g, x, Y(p), 4, INK.red); label(g, `${p}%`, x, Y(p) - 14, INK.white, 12, 'center'); });
  label(g, 'impact probability', bx.x0 + 6, bx.y1 - 8, INK.dim, 11);
}

// =============================================================== outdoors

export function storyOutdoors(scene, ctx){
  const { groundHeight, stateHooks, animate, theme, colliders, softColliders, lightPanels } = ctx;
  const run = animate ?? tick;
  const at = (x, z) => groundHeight(x, z);
  const n = (state) => missionsAccepted(state, theme);
  const day = (state) => Math.max(1, state?.week ?? 1);
  const won = (state) => state?.status === 'won' || n(state) >= 15;
  const glow = (m) => { if(m) lightPanels?.push(m); };

  // ------------------------------------------------- the header at the spawn
  // The bible's mission header, verbatim, on a board beside the road where the
  // player starts every phase: the hours to the predicted encounter, counting
  // down from 264. Off the road, off the delivery board, fifteen metres from the
  // spawn and clear of nothing anybody walks through.
  {
    const x = 12, z = 50, y = at(x, z);
    for(const dx of [-1.45, 1.45]) cyl(scene, 0.06, 3.0, x + dx, y + 1.5, z, STEEL());
    const header = statusPanel(scene, { x, y: y + 2.55, z: z + 0.05, rotY: 0, w: 3.0, h: 0.62,
      title: 'Planetary Defense', big: HEADER(1), tone: 'plain', lit: true });
    // A red hood lamp over it, the way everything on this ridge is lit.
    const hood = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), emit(RED, 1.5));
    hood.position.set(x, y + 3.05, z + 0.1); scene.add(hood); glow(hood);
    solid(colliders, x, z, y, 1.6, 3.1, 0.15);
    stateHooks?.push((state) => {
      const d = day(state);
      const done = state?.status === 'won';
      header.set({ big: done ? HEADER_DONE : HEADER(d), tone: done ? 'ok' : d >= 13 ? 'alert' : d >= 8 ? 'warn' : 'plain' });
    });
  }

  // ------------------------------------------------- the dish: parked or tracking
  // §3 dome-catwalk: "Radar tracking slews during the authorized M7 and M14
  // windows"; §8.1: "the dish keeps tracking the smaller fragment". So the
  // planetary radar is stowed at zenith on every other phase and comes down to
  // track — azimuth sweeping, elevation drifting — on the two echo nights and
  // once the campaign is won. props.js hands the mount over in `ctx.story`.
  {
    const radar = ctx.story?.radar;
    const azimuth = radar?.azimuth, rig = azimuth?.children?.[0];
    if(azimuth && rig){
      const restY = azimuth.rotation.y, trackX = rig.rotation.x, stowX = -Math.PI / 2;
      let tracking = false, blend = 0;
      run((t, dt) => {
        blend += ((tracking ? 1 : 0) - blend) * Math.min(1, dt * 0.35);
        rig.rotation.x = stowX + (trackX + Math.sin(t * 0.05) * 0.08 - stowX) * blend;
        azimuth.rotation.y = restY + Math.sin(t * (Math.PI * 2) / 130) * 0.34 * blend;
      });
      stateHooks?.push((state) => {
        const d = day(state);
        tracking = won(state) || d === 7 || d === 14;
      });
    }
  }

  // ------------------------------------------------- the dome catwalk
  // §3: "A slit of sky cuts across the closed telescope shutter … the last
  // optical shutter opens for the committed M15 observation." The walkable dome
  // is the old one on the saddle — the working domes are a kilometre off on
  // their summits — so the catwalk is here: a plinth under it (the drum stood
  // 3.2 m above the scree on nothing), a railed steel deck on its south side, a
  // sign, and two shutter leaves that stand closed to a slit until mission 15.
  {
    const old = ctx.story?.domes?.old;
    const ox = -118, oz = 34, oY = at(ox, oz), r = 5.4;
    cyl(scene, r + 0.05, 3.2, ox, oY + 1.6, oz, MATERIALS.concrete());
    box(scene, 1.0, 2.1, 0.12, ox, oY + 1.05, oz + r + 0.02, DARK());
    // The deck and its stair, on the +z side facing the slot.
    const dz = oz + 7.6, dY = at(ox, dz);
    box(scene, 5.2, 0.12, 2.6, ox, dY + 1.16, dz, MATERIALS.paintedSteel(0x50555a));
    for(const [lx, lz] of [[-2.4, -1.1], [2.4, -1.1], [-2.4, 1.1], [2.4, 1.1]]) cyl(scene, 0.06, 1.1, ox + lx, dY + 0.55, dz + lz, STEEL());
    for(const lx of [-2.5, -1.25, 0, 1.25, 2.5]) cyl(scene, 0.03, 1.0, ox + lx, dY + 1.7, dz + 1.25, STEEL());
    for(const lz of [-1.25, 0, 1.25]) for(const lx of [-2.5, 2.5]) cyl(scene, 0.03, 1.0, ox + lx, dY + 1.7, dz + lz, STEEL());
    box(scene, 5.1, 0.04, 0.04, ox, dY + 2.2, dz + 1.25, STEEL());
    for(const lx of [-2.5, 2.5]) box(scene, 0.04, 0.04, 2.5, ox + lx, dY + 2.2, dz, STEEL());
    for(let s = 0; s < 5; s++) box(scene, 1.2, 0.06, 0.3, ox + 3.4, dY + 0.22 + s * 0.23, dz + 1.0 - s * 0.3, MATERIALS.paintedSteel(0x50555a));
    solid(colliders, ox, dz, dY, 2.7, 2.3, 1.4);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), emit(RED, 1.5));
    lamp.position.set(ox - 2.5, dY + 2.3, dz + 1.25); scene.add(lamp); glow(lamp);
    sign(scene, 'Dome Catwalk', { x: ox + 3.4, y: dY + 2.4, z: dz + 2.2, w: 2.2, h: 0.5, facing: 0 });
    cyl(scene, 0.05, 2.2, ox + 3.4, dY + 1.1, dz + 2.2, STEEL());
    if(old?.shutter){
      const gap = r * 0.30;
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x777b80, roughness: 0.6, metalness: 0.3 });
      const leaves = [-1, 1].map(s => {
        const leaf = new THREE.Mesh(new THREE.BoxGeometry(gap, r * 1.5, 0.18), leafMat);
        leaf.position.set(s * (gap / 2 + 0.12), r * 0.42, r * 0.99 + 0.14);
        old.shutter.add(leaf);
        return { leaf, s };
      });
      // What is inside when it opens: the dome's own dim red working light.
      const inner = new THREE.Mesh(new THREE.PlaneGeometry(gap * 2, r * 1.5), new THREE.MeshBasicMaterial({ color: 0x3a1410, side: THREE.FrontSide }));
      inner.position.set(0, r * 0.42, r * 0.99 + 0.02); inner.visible = false; old.shutter.add(inner);
      const tube = old.shutter.children.find(c => c.geometry?.type === 'CylinderGeometry');
      let open = 0, want = 0;
      run((t, dt) => {
        open += (want - open) * Math.min(1, dt * 0.25);
        for(const { leaf, s } of leaves) leaf.position.x = s * (gap / 2 + 0.12 + open * (gap + 0.3));
        inner.visible = open > 0.05;
        if(tube) tube.rotation.x = -0.5 - open * 0.45;
      });
      stateHooks?.push((state) => { want = won(state) ? 1 : 0; });
    }
  }

  // ------------------------------------------------- the ridge terrace
  // §3: "The town lights lie far below the dark domes. After Stop 48, the town
  // tests its warning links; after Stop 60, a targeted transport convoy departs
  // while most town lights stay steady." The terrace stands at the boundary
  // where the valley opens, past the cattle guard: a paved apron, a rail along
  // the drop, two benches, a sign, a lamp — and the town 1.4 km below it.
  {
    const tx = 40, tz = 173, tY = at(tx, tz);
    box(scene, 9, 0.12, 4.4, tx, tY + 0.06, tz, MATERIALS.concrete());
    for(const lx of [-4.4, -2.2, 0, 2.2, 4.4]) cyl(scene, 0.04, 1.1, tx + lx, tY + 0.55, tz + 2.1, STEEL());
    box(scene, 8.9, 0.05, 0.05, tx, tY + 1.1, tz + 2.1, STEEL());
    box(scene, 8.9, 0.04, 0.04, tx, tY + 0.65, tz + 2.1, STEEL());
    solid(colliders, tx, tz + 2.1, tY, 4.5, 1.2, 0.12);
    bench(scene, tx - 2.4, tz - 0.4, tY + 0.12, Math.PI);
    bench(scene, tx + 2.4, tz - 0.4, tY + 0.12, Math.PI);
    softColliders?.push({ x: tx - 2.4, z: tz - 0.4, r: 1.0 }, { x: tx + 2.4, z: tz - 0.4, r: 1.0 });
    // Fixed binoculars on a post, aimed down the valley.
    cyl(scene, 0.06, 1.3, tx, tY + 0.65, tz + 1.4, STEEL());
    for(const dx of [-0.09, 0.09]){ const b = cyl(scene, 0.06, 0.4, tx + dx, tY + 1.4, tz + 1.4, DARK()); b.rotation.x = Math.PI / 2 - 0.25; }
    softColliders?.push({ x: tx, z: tz + 1.4, r: 0.4 });
    sign(scene, 'Ridge Terrace', { x: tx - 5.2, y: tY + 2.3, z: tz, w: 2.2, h: 0.5, facing: Math.PI / 2 });
    cyl(scene, 0.05, 2.1, tx - 5.2, tY + 1.05, tz, STEEL());
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), emit(RED, 1.5));
    lamp.position.set(tx - 5.2, tY + 2.7, tz); scene.add(lamp); glow(lamp);
    solid(colliders, tx - 5.2, tz, tY, 0.15, 2.8);

    // The town's warning-link test, from mission 12: amber beacons over Valle
    // Seco that light in a wave, one after the next, every few seconds.
    const townX = 150, townZ = 1560, townY = at(townX, townZ);
    const beacons = [];
    for(let i = 0; i < 7; i++){
      const b = new THREE.Mesh(new THREE.SphereGeometry(3.2, 8, 6), skyMat(0xffb347));
      b.position.set(townX - 130 + i * 43, townY + 9, townZ + 20 + (i % 3) * 55); b.visible = false;
      scene.add(b); beacons.push(b);
    }
    let links = false;
    run((t) => {
      const k = (t % 9) / 9;
      beacons.forEach((b, i) => { b.visible = links && Math.abs(k - (0.1 + i * 0.11)) < 0.045; });
    });

    // The convoy, once the campaign is won: marked buses leaving the town for
    // the narrow warning zone, east along the valley floor, one every twenty
    // seconds, while the rest of the town's lights stay as they were.
    const route = [[150, 1560], [330, 1548], [560, 1520], [800, 1490], [1000, 1470]];
    const segs = route.slice(1).map((p, i) => Math.hypot(p[0] - route[i][0], p[1] - route[i][1]));
    const total = segs.reduce((a, b) => a + b, 0);
    const buses = [];
    for(let i = 0; i < 4; i++){
      const bus = new THREE.Group();
      box(bus, 2.9, 3.0, 12, 0, 1.6, 0, MATERIALS.paintedSteel(0x2a3038));
      box(bus, 2.95, 0.9, 11, 0, 2.2, 0, emit(0xffe6b0, 1.4));
      box(bus, 2.2, 0.6, 1.6, 0, 3.4, 0, emit(0xffb347, 2.4));     // the roof marker
      for(const dx of [-1.0, 1.0]){
        const hl = new THREE.Mesh(new THREE.SphereGeometry(0.35, 6, 5), skyMat(0xfff4d8)); hl.position.set(dx, 1.1, 6.1); bus.add(hl);
        const tl = new THREE.Mesh(new THREE.SphereGeometry(0.3, 6, 5), skyMat(0xff3a24)); tl.position.set(dx, 1.2, -6.1); bus.add(tl);
      }
      bus.visible = false; scene.add(bus);
      buses.push({ g: bus, s: -i * 20 * 14 });        // a 20 s stagger at 14 m/s
    }
    let convoy = false;
    run((t, dt) => {
      if(!convoy){ buses.forEach(b => { b.g.visible = false; }); return; }
      for(const b of buses){
        b.s += dt * 14;
        if(b.s > total + 400) b.s = -60;                // and another leaves
        if(b.s < 0 || b.s > total){ b.g.visible = false; continue; }
        let d = b.s, i = 0;
        while(i < segs.length - 1 && d > segs[i]){ d -= segs[i]; i++; }
        const [ax, az] = route[i], [bx, bz] = route[i + 1], u = d / segs[i];
        const x = ax + (bx - ax) * u, z = az + (bz - az) * u;
        b.g.position.set(x, townY + 0.3, z);
        b.g.rotation.y = Math.atan2(bx - ax, bz - az);
        b.g.visible = true;
      }
    });
    stateHooks?.push((state) => {
      const k = n(state);
      links = k >= 12;
      const next = won(state);
      if(next && !convoy) buses.forEach((b, i) => { b.s = -i * 20 * 14; });
      convoy = next;
    });
  }

  // ------------------------------------------------- the night kitchen
  // §3: "Cold cups sit beside an untouched meal and a dawn clock. After Stop 44,
  // the closed Aegis binder rests by Arjun's cup; after Stop 52, one radio falls
  // quiet before the second echo arrives." Built as a lit porch on the west end
  // of the Night Crew Quarters rather than a room: a building opened with
  // `enter:` and no stop stays sealed all campaign (engine/core/access.js), and
  // a door reading "Sealed" is worse than no door.
  {
    const kx = -33.5, kz = 108, kY = at(kx, kz);
    // Canopy on four posts, a warm lamp under it — the one warm light on the ridge.
    for(const [px, pz] of [[-2.2, -1.8], [2.2, -1.8], [-2.2, 1.8], [2.2, 1.8]]) cyl(scene, 0.07, 2.7, kx + px, kY + 1.35, kz + pz, STEEL());
    box(scene, 5.2, 0.12, 4.4, kx, kY + 2.76, kz, MATERIALS.paintedSteel(0x3a3d41));
    const warm = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), emit(0xffd9a0, 1.8));
    warm.position.set(kx, kY + 2.55, kz); scene.add(warm); glow(warm);
    run(flicker(warm.material, 1.6, 0.05, 1.1));
    // The table, the untouched meal, the cold cups.
    box(scene, 2.2, 0.06, 0.9, kx, kY + 0.78, kz, MATERIALS.paintedSteel(0x6b5a3e));
    for(const [lx, lz] of [[-1.0, -0.4], [1.0, -0.4], [-1.0, 0.4], [1.0, 0.4]]) cyl(scene, 0.03, 0.76, kx + lx, kY + 0.38, kz + lz, STEEL());
    softColliders?.push({ x: kx, z: kz, r: 1.3 });
    cyl(scene, 0.13, 0.02, kx + 0.4, kY + 0.82, kz + 0.1, MATERIALS.paintedSteel(0xd8d3c4));      // the plate
    cyl(scene, 0.07, 0.04, kx + 0.4, kY + 0.85, kz + 0.1, MATERIALS.paintedSteel(0x8a6a3a));      // the meal, cold
    for(const [cx, cz] of [[-0.6, -0.25], [-0.3, 0.25], [0.85, -0.3]]) cyl(scene, 0.04, 0.09, kx + cx, kY + 0.855, kz + cz, MATERIALS.paintedSteel(0xe6e0d0));
    // The dawn clock: a face on the quarters' wall, hands turning toward dawn.
    const clock = board(scene, { x: kx + 4.3, y: kY + 1.9, z: kz - 0.9, rotY: -Math.PI / 2, w: 0.7, h: 0.7, title: 'Dawn', draw: (g, bx, st) => {
      const cx = (bx.x0 + bx.x1) / 2, cy = (bx.y0 + bx.y1) / 2, R = Math.min(bx.x1 - bx.x0, bx.y1 - bx.y0) * 0.42;
      g.fillStyle = INK.bg; g.fillRect(bx.x0 - 8, bx.y0 - 8, bx.x1 - bx.x0 + 16, bx.y1 - bx.y0 + 16);
      g.strokeStyle = INK.fg; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.stroke();
      for(let i = 0; i < 12; i++){ const a = i / 12 * Math.PI * 2; line(g, [[cx + Math.sin(a) * R * 0.86, cy - Math.cos(a) * R * 0.86], [cx + Math.sin(a) * R * 0.95, cy - Math.cos(a) * R * 0.95]], INK.fg, 2); }
      // Dawn is marked at six.
      const da = Math.PI; g.fillStyle = INK.amber; g.beginPath(); g.arc(cx + Math.sin(da) * R * 0.75, cy - Math.cos(da) * R * 0.75, 5, 0, Math.PI * 2); g.fill();
      const h = st.h ?? 1, m = st.m ?? 0;
      const ha = ((h % 12) + m / 60) / 12 * Math.PI * 2, ma = m / 60 * Math.PI * 2;
      line(g, [[cx, cy], [cx + Math.sin(ha) * R * 0.5, cy - Math.cos(ha) * R * 0.5]], INK.fg, 4);
      line(g, [[cx, cy], [cx + Math.sin(ma) * R * 0.75, cy - Math.cos(ma) * R * 0.75]], INK.fg, 2.5);
    }, state: { h: 1, m: 0 } });
    let since = 0;
    run((t, dt) => { since += dt; if(since > 2){ since = 0; const mins = (t * 2) % 720; clock.set({ h: 1 + Math.floor(mins / 60), m: Math.floor(mins % 60) }); } });
    // The radio: a box with an antenna and a green light that falls quiet.
    const radio = box(scene, 0.22, 0.12, 0.1, kx - 0.85, kY + 0.87, kz + 0.28, DARK());
    void radio;
    cyl(scene, 0.006, 0.3, kx - 0.92, kY + 1.06, kz + 0.25, STEEL());
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 5), emit(0x4dff88, 2.5));
    led.position.set(kx - 0.78, kY + 0.9, kz + 0.335); scene.add(led);
    let quiet = false;
    run((t) => { led.material.emissiveIntensity = quiet ? 0 : (Math.sin(t * 7) > 0.6 ? 3 : 1.4); });
    // The Aegis launch binder, closed, by Arjun's cup, from mission 11.
    const binder = box(scene, 0.32, 0.05, 0.26, kx + 0.55, kY + 0.835, kz - 0.28, MATERIALS.paintedSteel(0x1f3350));
    const binderTag = slip(scene, { x: kx + 0.55, y: kY + 0.87, z: kz - 0.15, rotY: 0, w: 0.26, h: 0.1, text: ['AEGIS LAUNCH BINDER'], pin: false, tone: 'card', visible: false });
    binderTag.rotation.x = -Math.PI / 2;
    binder.visible = false;
    sign(scene, 'Night Kitchen', { x: kx, y: kY + 3.2, z: kz + 2.25, w: 2.2, h: 0.5, facing: 0 });
    stateHooks?.push((state) => {
      const k = n(state);
      binder.visible = k >= 11; binderTag.set({ visible: k >= 11 });
      quiet = k >= 13;
    });
  }

  storyExtras(scene, ctx);
}

// =============================================================== the rooms

const byId = (roomId) => Object.fromEntries((HOME[roomId] ?? []).map(f => [f.id, f]));

export function dressRoom(id, room, ctx){
  const { group, stateHooks, theme } = ctx;
  const F = byId(id);
  const n = (state) => missionsAccepted(state, theme);
  const won = (state) => state?.status === 'won' || n(state) >= 15;
  const at = (fid) => (F[fid] ? fixturePlaces(room, F[fid]) : null);
  const onFace = (fid, spec) => { const a = at(fid); return a ? slip(group, { ...a.face(spec.dx ?? 0, spec.y ?? 1.5), ...spec }) : null; };
  const onWall = (fid, side, spec) => { const a = at(fid); return a ? slip(group, { ...a.wallPanel(side, spec.y ?? 1.75, spec.gap ?? 1.1), ...spec }) : null; };
  // Boards stand 1.5 m along the wall from the fixture's centre so the slips
  // pinned on the wall behind the fixture (face(), ±0.8 m) clear them; a fixture
  // on the back wall has its boards lifted to 2.85 by `wallPanel` itself.
  const panel = (fid, side, spec) => { const a = at(fid); return a ? statusPanel(group, { ...a.wallPanel(side, spec.y ?? 1.95, spec.gap ?? 1.5), w: 1.4, h: 0.8, lit: true, ...spec }) : null; };
  const plot = (fid, side, spec) => { const a = at(fid); return a ? board(group, { ...a.wallPanel(side, spec.y ?? 1.95, spec.gap ?? 1.5), w: 1.4, h: 0.85, ...spec }) : null; };
  const hooks = [];

  switch(id){
    case 'OPS': {
      // M1: four star fields, one displaced dot; Lena pins REAL MOVING OBJECT
      // beneath them. M12/13: the corrected primary path over deep ocean beside
      // the old land band; Mira pins PRIMARY BODY: LAND STAND-DOWN to the plot.
      // Both fixtures are on the back wall (scopeboard at its middle, the
      // delivery desk 2.2 m to its left), so their boards go to the RIGHT of the
      // scopeboard (side -1 is +x on that wall) and the LEFT of the desk, and
      // everything else hangs in the face() band at ~2.1 m between them.
      const fields = plot('scopeboard', -1, { title: 'Scopeboard · images', draw: paintFourFields, w: 1.3 });
      const corridor = plot('scopeboard', -1, { gap: 2.9, title: 'Scopeboard · orbit corridor', draw: paintCorridor, w: 1.3 });
      const strip = onFace('scopeboard', { dx: -0.45, y: 1.35, w: 0.7, h: 0.16, text: ['REAL MOVING OBJECT'], pin: 'clip', visible: false });
      const standDown = onFace('scopeboard', { dx: 0.45, y: 1.4, w: 0.7, h: 0.24, text: ['PRIMARY BODY:', 'LAND STAND-DOWN'], pin: true, tone: 'card', visible: false });
      // M14/15 at delivery-desk: the green primary track beside a narrow red
      // fragment corridor; the warning-network wall display; the release key;
      // the signed operating conditions beside the final status.
      const tracks = plot('delivery-desk', 1, { title: 'Delivery desk · tracks', draw: (g, bx, st) => paintTracks(g, bx, st, { corridor: true }), w: 1.3 });
      const network = (() => { const a = at('delivery-desk'); return a ? statusPanel(group, { ...a.wallAbove(2.9), w: 1.3, h: 0.7, lit: true, title: 'Warning network', big: '—', small: HEADER(1), tone: 'plain' }) : null; })();
      const desks = ['TRANSPORT DESK', 'SHELTER DESK', 'LOCAL RADIO'];
      const acks = desks.map((d, i) => onFace('delivery-desk', { dx: -0.75 + i * 0.5, y: 1.3, w: 0.42, h: 0.2, text: [d], sub: 'verified delivery acknowledgement', pin: 'clip', visible: false }));
      const lamps = desks.map((d, i) => {
        const a = at('delivery-desk'); if(!a) return null;
        const p = a.face(-0.75 + i * 0.5, 1.72);
        const l = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), new THREE.MeshStandardMaterial({ color: 0x2a2f33, emissive: 0x67e0a3, emissiveIntensity: 0 }));
        l.position.set(p.x, p.y, p.z); group.add(l); return l;
      });
      const key = (() => {
        const a = at('delivery-desk'); if(!a) return null;
        const p = a.face(0.85, 1.68);
        const k = new THREE.Group(); k.position.set(p.x, p.y, p.z); k.rotation.y = p.rotY;
        box(k, 0.22, 0.22, 0.05, 0, 0, 0.02, DARK());
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 12), new THREE.MeshStandardMaterial({ color: 0x8a2a20, emissive: 0xc9342a, emissiveIntensity: 0.6 }));
        cap.rotation.x = Math.PI / 2; cap.position.z = 0.06; k.add(cap);
        group.add(k); return cap;
      })();
      const keyTag = onFace('delivery-desk', { dx: 0.85, y: 1.2, w: 0.42, h: 0.12, text: ['VERIFIED-WARNING RELEASE KEY'], pin: false, tone: 'card' });
      const conditions = onFace('delivery-desk', { dx: -0.8, y: 2.0, w: 0.5, h: 0.2, text: ['SIGNED OPERATING CONDITIONS'], pin: true, visible: false });
      void keyTag;
      // The wall fills over fifteen seconds once the release key is pressed —
      // §8.1's "0–15 seconds". A clock started the first time the hook sees it.
      let filling = null;
      tick((t, dt) => {
        if(filling == null) return;
        filling += dt;
        const shown = Math.min(3, Math.floor(filling / 5) + (filling > 0.5 ? 1 : 0));
        acks.forEach((a, i) => a?.set({ visible: i < shown }));
        lamps.forEach((l, i) => { if(l) l.material.emissiveIntensity = i < shown ? 2.2 : 0; });
        network?.set({ big: shown ? 'ACKNOWLEDGEMENTS' : '—', small: `${shown} / 3`, tone: shown >= 3 ? 'ok' : 'warn' });
      });
      hooks.push((state) => {
        const k = n(state), d = Math.max(1, state?.week ?? 1);
        fields?.set({ k }); strip?.set({ visible: k >= 1 });
        corridor?.set({ k }); standDown?.set({ visible: k >= 13 });
        tracks?.set({ k });
        if(won(state)){
          if(filling == null) filling = 0;
          if(key){ key.material.color.setHex(0x2f8a4c); key.material.emissive.setHex(0x67e0a3); key.material.emissiveIntensity = 1.4; }
          conditions?.set({ visible: true });
        } else {
          filling = null;
          acks.forEach(a => a?.set({ visible: false })); lamps.forEach(l => { if(l) l.material.emissiveIntensity = 0; });
          network?.set({ big: '—', small: HEADER(d), tone: k >= 13 ? 'ok' : 'plain' });
          if(key){ key.material.color.setHex(0x8a2a20); key.material.emissive.setHex(0xc9342a); key.material.emissiveIntensity = 0.6; }
          conditions?.set({ visible: false });
        }
      });
      break;
    }
    case 'ORBIT': {
      // M1→2: a long cloud of possible paths brushes the Earth marker; Malik
      // pins 3.2% IMPACT PATHS beside the full cloud. M7→8: the cloud contracts
      // with Earth inside it; 63% IMPACT / 37% MISS beside the narrowed cloud.
      // M3→4: a dawn line cuts the remaining telescope blocks; Mira pins the
      // combined optical, radar and thermal schedule.
      const cloud = plot('fit-board', -1, { title: 'Orbit-fit board', draw: paintOrbitCloud });
      const s32 = onFace('fit-board', { dx: -0.55, y: 1.5, w: 0.5, h: 0.16, text: ['3.2% IMPACT PATHS'], pin: true, visible: false });
      const s63 = onFace('fit-board', { dx: 0.55, y: 1.5, w: 0.5, h: 0.16, text: ['63% IMPACT / 37% MISS'], pin: true, visible: false });
      const sched = plot('scope-schedule', 1, { title: 'Observing schedule', draw: paintSchedule });
      const combined = onFace('scope-schedule', { dx: 0, y: 1.5, w: 0.6, h: 0.22, text: ['COMBINED SCHEDULE'], sub: 'optical, radar, and thermal', pin: true, visible: false });
      hooks.push((state) => {
        const k = n(state);
        cloud?.set({ k }); s32?.set({ visible: k >= 2 }); s63?.set({ visible: k >= 8 });
        sched?.set({ k }); combined?.set({ visible: k >= 4 });
      });
      break;
    }
    case 'DISC': {
      // M4→5: injected test dots beside recovered points and one trailed image;
      // Lena stamps the new packet ACCEPT WITH LOCAL ERROR TERM.
      const pipe = plot('pipeline-bench', -1, { title: 'Summit pipeline', draw: paintPipeline });
      const packet = onFace('pipeline-bench', { dx: 0, y: 1.5, w: 0.5, h: 0.26, text: ['ACCEPT WITH', 'LOCAL ERROR TERM'], sub: 'the new packet', pin: 'clip', visible: false });
      hooks.push((state) => { const k = n(state); pipe?.set({ k }); packet?.set({ visible: k >= 5 }); });
      break;
    }
    case 'CHAR': {
      // M5→6: a small bright-body card under two crossing size curves; Sanaa
      // moves the 106 M card into the ASSUMPTIONS sleeve. M9→10: two repeating
      // peaks beside the old radar shoulder; TWO LOBES / NO DETACHED FRAGMENT YET.
      const sizing = plot('sizing-board', -1, { title: 'Physical-sizing board', draw: paintSizing });
      const a = at('sizing-board');
      const under = a ? a.face(-0.55, 1.15) : null, sleeveAt = a ? a.face(0.7, 1.55) : null;
      const sleeve = onFace('sizing-board', { dx: 0.7, y: 1.55, w: 0.5, h: 0.3, text: ['ASSUMPTIONS'], pin: true, tone: 'card', visible: false });
      const card = under ? slip(group, { ...under, w: 0.3, h: 0.14, text: ['106 M'], sub: 'bright body', pin: false, visible: false }) : null;
      const curve = plot('photometry-bench', 1, { title: 'Rotation photometry', draw: paintLightCurve });
      const lobes = onFace('photometry-bench', { dx: 0, y: 1.5, w: 0.6, h: 0.22, text: ['TWO LOBES /', 'NO DETACHED FRAGMENT YET'], pin: 'clip', visible: false });
      hooks.push((state) => {
        const k = n(state);
        sizing?.set({ k }); card?.set({ visible: k >= 5 }); sleeve?.set({ visible: k >= 6 });
        if(card && under && sleeveAt){
          // Into the sleeve: the same card, a centimetre proud of the sleeve's face.
          const p = k >= 6 ? sleeveAt : under;
          card.position.set(p.x, k >= 6 ? p.y - 0.05 : p.y, p.z);
          if(k >= 6) card.position.add(new THREE.Vector3(Math.sin(p.rotY), 0, Math.cos(p.rotY)).multiplyScalar(0.01));
        }
        curve?.set({ k }); lobes?.set({ visible: k >= 10 });
      });
      break;
    }
    case 'RADAR': {
      // M6→7: the main echo beside a faint shoulder in the untouched strip;
      // Tomás clips the corrected main-echo time beside the preserved raw
      // packet. M13→14: a new red echo separates from the green primary track;
      // SEPARATE FRAGMENT: 32 M beside the preserved shoulder.
      const timing = plot('tracking-clock', -1, { title: 'Radar timing board', draw: paintEcho });
      const raw = onFace('tracking-clock', { dx: -0.4, y: 1.5, w: 0.5, h: 0.22, text: ['PRESERVED RAW PACKET'], pin: 'clip', tone: 'card', visible: false });
      const corrected = onFace('tracking-clock', { dx: 0.4, y: 1.5, w: 0.5, h: 0.22, text: ['CORRECTED MAIN-ECHO TIME'], sub: 'subtract 0.7 s from archived receipt times', pin: 'clip', visible: false });
      const archive = plot('echo-archive', 1, { title: 'Preserved echo archive', draw: (g, bx, st) => paintTracks(g, bx, st) });
      const fragment = onFace('echo-archive', { dx: 0, y: 1.5, w: 0.6, h: 0.22, text: ['SEPARATE FRAGMENT: 32 M'], sub: 'beside the preserved shoulder', pin: 'clip', visible: false });
      hooks.push((state) => {
        const k = n(state);
        timing?.set({ k }); raw?.set({ visible: k >= 6 }); corrected?.set({ visible: k >= 7 });
        archive?.set({ k }); fragment?.set({ visible: k >= 14 });
      });
      break;
    }
    case 'IMPACT': {
      // M8→9: ocean, desert and coast strips under one path band; Jordan pins
      // PLAN WHOLE BAND / NO LOCAL ORDER YET. M10→11: a launch binder open beside
      // a tiny available-impulse bar; Arjun closes it beneath INSUFFICIENT IMPULSE.
      const risk = plot('risk-display', -1, { title: 'Corridor risk display', draw: paintRisk });
      const band = onFace('risk-display', { dx: 0, y: 1.5, w: 0.6, h: 0.22, text: ['PLAN WHOLE BAND /', 'NO LOCAL ORDER YET'], pin: true, tone: 'card', visible: false });
      const impulse = plot('deflection-desk', 1, { title: 'Intervention desk', draw: paintImpulse });
      const insufficient = onFace('deflection-desk', { dx: 0, y: 2.0, w: 0.5, h: 0.16, text: ['INSUFFICIENT IMPULSE'], pin: true, visible: false });
      // The binder, on the wall rail: two covers that hang open, then shut.
      const d = at('deflection-desk');
      let coverL = null, coverR = null, binderTag = null;
      if(d){
        const p = d.face(0, 1.45);
        const g2 = new THREE.Group(); g2.position.set(p.x, p.y, p.z); g2.rotation.y = p.rotY; group.add(g2);
        const blue = MATERIALS.paintedSteel(0x1f3350);
        box(g2, 0.05, 0.28, 0.04, 0, 0, 0.02, blue);
        coverL = box(g2, 0.22, 0.28, 0.02, -0.11, 0, 0.03, blue);
        coverR = box(g2, 0.22, 0.28, 0.02, 0.11, 0, 0.03, blue);
        coverL.geometry = coverL.geometry.clone().translate(0.5, 0, 0); coverL.position.x = -0.03;
        coverR.geometry = coverR.geometry.clone().translate(-0.5, 0, 0); coverR.position.x = 0.03;
        g2.visible = false;
        binderTag = g2;
      }
      const binderLabel = onFace('deflection-desk', { dx: 0, y: 1.0, w: 0.36, h: 0.1, text: ['AEGIS LAUNCH BINDER'], pin: false, tone: 'card', visible: false });
      hooks.push((state) => {
        const k = n(state);
        risk?.set({ k }); band?.set({ visible: k >= 9 });
        impulse?.set({ k }); insufficient?.set({ visible: k >= 11 });
        if(binderTag){ binderTag.visible = k >= 10; const open = k >= 10 && k < 11; coverL.rotation.y = open ? -1.1 : 0; coverR.rotation.y = open ? 1.1 : 0; }
        binderLabel?.set({ visible: k >= 10 });
      });
      break;
    }
    case 'TOWN': {
      // M2→3: the probability strip crosses the posted warning line; Mira clips
      // the 8.0% / LIMITS INCLUDED notice into the dispatch sleeve. M11→12: a
      // news alert outside drops the qualifying sentence from the notice —
      // ASTEROID WARNING ISSUED beside the full qualified official notice; Jordan
      // pins the signed staged-response rules above the incoming-news strip.
      const strip = plot('threshold-board', -1, { title: 'Public-action board', draw: paintThreshold });
      const notice = panel('threshold-board', 1, { gap: 1.7, title: 'Official notice', big: '8.0% / LIMITS INCLUDED', small: NOTICE, tone: 'warn', w: 1.5, h: 0.8 });
      if(notice) notice.visible = false;
      const sleeve = onFace('threshold-board', { dx: -0.5, y: 1.5, w: 0.5, h: 0.24, text: ['8.0% / LIMITS INCLUDED'], sub: 'dispatch sleeve', pin: 'clip', tone: 'card', visible: false });
      const news = onFace('threshold-board', { dx: 0.5, y: 1.4, w: 0.6, h: 0.22, text: ['ASTEROID WARNING ISSUED'], sub: 'incoming news', pin: true, tone: 'card', visible: false });
      const rules = onFace('threshold-board', { dx: 0.5, y: 1.95, w: 0.6, h: 0.22, text: ['STAGED-RESPONSE RULES'], sub: 'signed', pin: true, visible: false });
      hooks.push((state) => {
        const k = n(state);
        strip?.set({ k });
        if(notice) notice.visible = k >= 3;
        sleeve?.set({ visible: k >= 3 }); news?.set({ visible: k >= 11 }); rules?.set({ visible: k >= 12 });
      });
      break;
    }
    default: break;
  }
  for(const h of hooks) stateHooks.push(h);
}

// =============================================================== the extra pass
//
// Beyond the bible's list: what a mountain-top observatory is like at one in the
// morning. A satellite crossing the sky, a meteor now and then, red service
// lamps that blink, a fox with eyes that catch the light, steam off a roof vent,
// and a generator running with its inspection lamp on.
export function storyExtras(scene, ctx){
  const { groundHeight, animate, softColliders } = ctx;
  const run = animate ?? tick;
  const at = (x, z) => groundHeight(x, z);
  const wind = ctx.theme?.site?.weather?.wind ?? { x: 1.1, z: 0.6 };

  // A satellite pass: a point that tumbles — it flashes — crossing the north sky
  // in four minutes, at 800 m so it sits inside the dome when the dome is drawn.
  {
    const R = 800;
    const sat = new THREE.Mesh(new THREE.SphereGeometry(2.0, 8, 6), skyMat(0xffffff));
    sat.userData.ignoreAudit = true; scene.add(sat);
    run((t) => {
      const u = (t % 240) / 240, a = 0.08 + u * (Math.PI - 0.16);
      sat.position.set(Math.cos(a) * R, Math.sin(a) * R * 0.75 + 30, -Math.sin(a) * R * 0.4 - 120);
      sat.visible = (t % 1.6) < 0.35 && u > 0.02 && u < 0.98;
    });
  }

  // Meteors: a short additive streak, high, somewhere, every ten to twenty seconds.
  {
    const streaks = [];
    for(let i = 0; i < 3; i++){
      const m = new THREE.Mesh(new THREE.PlaneGeometry(70, 1.4), new THREE.MeshBasicMaterial({
        color: 0xdfe8ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
      m.userData.ignoreAudit = true; m.visible = false; scene.add(m);
      streaks.push({ m, life: -1, next: 6 + i * 7 });
    }
    const rnd = lcg(97);
    run((t, dt) => {
      for(const s of streaks){
        if(s.life < 0){
          s.next -= dt;
          if(s.next <= 0){
            const a = rnd() * Math.PI * 2, el = 0.45 + rnd() * 0.4, R = 780;
            s.m.position.set(Math.cos(a) * Math.cos(el) * R, Math.sin(el) * R, Math.sin(a) * Math.cos(el) * R);
            s.m.lookAt(0, 0, 0); s.m.rotateZ(rnd() * Math.PI);
            s.life = 0; s.m.visible = true; s.next = 10 + rnd() * 12;
          }
          continue;
        }
        s.life += dt;
        const k = s.life / 0.7;
        if(k >= 1){ s.life = -1; s.m.visible = false; continue; }
        s.m.material.opacity = 0.9 * Math.sin(k * Math.PI);
        s.m.scale.x = 0.4 + k * 0.8;
      }
    });
  }

  // Red service lamps that blink — obstruction lights on the tall things: the
  // weather mast, the fuel bund, the terrace post and the catwalk rail.
  {
    const bl = new THREE.MeshStandardMaterial({ color: 0xff3a24, emissive: 0xff3a24, emissiveIntensity: 0.2, roughness: 0.4 });
    run(blink(bl, 2.6, 0.07, { on: 3.2, off: 0.15 }));
    for(const [x, z, h] of [[-44, -8, 10.4], [-92.8, 69, 1.4], [46, 175, 1.5], [-120, 42, 2.6]]){
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), bl);
      s.position.set(x, at(x, z) + h, z); scene.add(s);
    }
  }

  // A fox on the scree between the archive and the quarters: trots a few metres,
  // stops, looks. What you see of a fox at night is its eyes, so they shine.
  {
    const fur = mat('alto.fox', () => new THREE.MeshStandardMaterial({ color: 0x5a3a26, roughness: 0.95 }));
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), fur); body.scale.set(2.1, 0.9, 1); body.position.y = 0.3; g.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 7, 5), fur); head.position.set(0.42, 0.4, 0); g.add(head);
    const tail = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 5), fur); tail.scale.set(3.2, 1, 1); tail.position.set(-0.5, 0.36, 0); g.add(tail);
    for(const s of [-1, 1]){ const ear = box(g, 0.05, 0.1, 0.03, 0.44, 0.52, s * 0.06, fur); void ear; }
    for(const s of [-1, 1]){ const eye = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 5), emit(0xb8ffcf, 2.2)); eye.position.set(0.52, 0.42, s * 0.045); g.add(eye); }
    for(const [lx, lz] of [[0.25, -0.08], [0.25, 0.08], [-0.25, -0.08], [-0.25, 0.08]]) cyl(g, 0.02, 0.3, lx, 0.15, lz, fur);
    scene.add(g);
    const hx = -58, hz = 92;
    let ax = hx, az = hz, txx = hx, tzz = hz, wait = 3;
    g.position.set(hx, at(hx, hz), hz);
    run((t, dt) => {
      if(wait > 0){ wait -= dt; g.position.y = at(ax, az); return; }
      const d = Math.hypot(txx - ax, tzz - az);
      if(d < 0.1){ txx = hx + (Math.random() - 0.5) * 36; tzz = hz + (Math.random() - 0.5) * 30; wait = 2 + Math.random() * 6; return; }
      const step = Math.min(d, dt * 2.6);
      ax += (txx - ax) / d * step; az += (tzz - az) / d * step;
      g.position.set(ax, at(ax, az) + Math.abs(Math.sin(t * 11)) * 0.05, az);
      g.rotation.y = Math.atan2(txx - ax, tzz - az) - Math.PI / 2;
    });
  }

  // Steam off a roof vent on the Coordination Office: twenty-eight people are
  // inside and it is below freezing out here.
  {
    const x = -37, z = 36, y = at(-30, 40) + 5.6;
    cyl(scene, 0.16, 1.0, x, y + 0.5, z, STEEL());
    cyl(scene, 0.3, 0.12, x, y + 1.02, z, STEEL());
    const puffs = [];
    for(let i = 0; i < 3; i++){
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), new THREE.MeshBasicMaterial({ color: 0xb8c0c8, transparent: true, opacity: 0.16, depthWrite: false, fog: false }));
      p.userData.ignoreAudit = true; scene.add(p); puffs.push(p);
    }
    run((t) => {
      puffs.forEach((p, i) => {
        const k = ((t + i * 0.7) % 2.1) / 2.1;
        p.position.set(x + wind.x * k * 1.6, y + 1.1 + k * 1.8, z + wind.z * k * 1.6);
        p.scale.setScalar(0.5 + k * 2.2); p.material.opacity = 0.18 * (1 - k);
      });
    });
  }

  // The generator, outside the fuel bund, running: an amber inspection lamp that
  // shimmers at the set's own frequency, and its exhaust.
  {
    const x = -80, z = 82, y = at(x, z);
    box(scene, 3.0, 1.6, 1.5, x, y + 0.8, z, MATERIALS.paintedSteel(0x3f5a3a));
    box(scene, 3.1, 0.1, 1.6, x, y + 1.62, z, DARK());
    cyl(scene, 0.09, 1.2, x + 1.2, y + 2.2, z - 0.4, STEEL());
    const grille = box(scene, 0.05, 1.0, 1.0, x + 1.53, y + 0.8, z, DARK()); void grille;
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), emit(0xffb347, 1.4));
    lamp.position.set(x - 1.2, y + 1.75, z + 0.6); scene.add(lamp);
    run(flicker(lamp.material, 1.4, 0.18, 9.0));
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), new THREE.MeshBasicMaterial({ color: 0x9aa0a6, transparent: true, opacity: 0.14, depthWrite: false, fog: false }));
    puff.userData.ignoreAudit = true; scene.add(puff);
    run((t) => { const k = (t % 1.1) / 1.1; puff.position.set(x + 1.2 + wind.x * k * 0.8, y + 2.85 + k * 1.2, z - 0.4 + wind.z * k * 0.8); puff.scale.setScalar(0.5 + k * 1.6); puff.material.opacity = 0.16 * (1 - k); });
    softColliders?.push({ x, z, r: 2.0 });
  }
  void sway;
}
