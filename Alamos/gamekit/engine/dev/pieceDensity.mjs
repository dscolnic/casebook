// pieceDensity.mjs — how furnished is each room, corridor and building?
//
//   node engine/dev/pieceDensity.mjs <theme>
//   node engine/dev/pieceDensity.mjs --all
//   node engine/dev/pieceDensity.mjs <theme> --objects   # every object, not clusters
//
// "The rooms feel empty" is the kind of judgement a screenshot supports and
// nothing measures, so it gets argued about instead of fixed. This counts what is
// actually in each place and divides by its floor area, which turns the argument
// into a table.
//
// WHAT A PIECE IS. Not a mesh: a desk built from four boxes is one piece and four
// meshes, and counting meshes rewards whoever models a chair in the most parts.
// So the objects a builder placed are clustered by position — anything within
// `CLUSTER` metres horizontally is treated as one piece of furniture — and both
// numbers are reported. Structure is excluded: walls, floors, ceilings and the
// building shells themselves are not furnishing, and are recognised by being
// bigger than any piece of furniture (`STRUCTURE_M` across) or by being a floor or
// ceiling slab.
//
// WHAT IT CANNOT SEE. Whether the place *looks* furnished. Six pieces in a corner
// and six spread evenly measure the same and read completely differently, so this
// answers "how much is in here", never "is it any good".
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeDir, themeNames, placeDir } from './registry.mjs';
import { installDom, stubRenderer } from './headless.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');

/** Two objects closer than this, horizontally, are one piece of furniture. */
const CLUSTER = 1.0;
/** Anything wider than this in plan is structure, not furniture. */
const STRUCTURE_M = 6.0;
/** Below this, a room reads as unfurnished. Set from the shipped rooms, see below. */
const THIN = 1.2;      // pieces per 10 m²

const args = process.argv.slice(2);
const wantAll = args.includes('--all');
const showObjects = args.includes('--objects');
const wanted = wantAll ? themeNames() : args.filter(a => !a.startsWith('--'));
if(!wanted.length){
  console.error('usage: node engine/dev/pieceDensity.mjs <theme> | --all');
  process.exit(2);
}

installDom();
const THREE = await import(pathToFileURL(resolve(gamekit, 'node_modules/three/build/three.module.js')).href);

const num = (v, d = 1) => (Math.round(v * 10 ** d) / 10 ** d).toFixed(d);

/**
 * Every placed object in a scene, with its world footprint.
 *
 * Top level only. Both builders add each placement straight to the scene, so a
 * top-level child is one thing somebody put there; descending would count the
 * boxes a single desk is made of.
 */
function placements(scene){
  scene.updateMatrixWorld(true);
  const out = [];
  const bb = new THREE.Box3();
  for(const o of scene.children){
    if(o.isLight || o.isCamera) continue;
    bb.setFromObject(o);
    if(!Number.isFinite(bb.min.x) || bb.isEmpty()) continue;
    const w = bb.max.x - bb.min.x, d = bb.max.z - bb.min.z, h = bb.max.y - bb.min.y;
    out.push({
      x: (bb.min.x + bb.max.x) / 2, z: (bb.min.z + bb.max.z) / 2,
      y: (bb.min.y + bb.max.y) / 2, y0: bb.min.y, w, d, h,
      span: Math.max(w, d),
      // A floor or a ceiling: broad and flat. Named separately from `span`
      // because a 5 m bench and a 5 m floor slab are the same width.
      slab: Math.min(w, d) > 2.5 && h < 0.35,
    });
  }
  return out;
}

/** Structure is not furnishing. Everything else is a candidate piece. */
const isFurnishing = (p) => !p.slab && p.span <= STRUCTURE_M && p.h > 0.06;

/**
 * Single-link clustering: one cluster is one piece.
 *
 * In three dimensions, not two. Clustering on the floor plan alone merged a poster
 * into the bench underneath it — and a poster is a piece, which is the whole reason
 * a bare wall reads as a bare room. Height separates them; a shelf unit's four
 * shelves are 0.46 m apart and still merge into the one thing they are.
 */
function cluster(items, radius = CLUSTER){
  const seen = new Array(items.length).fill(false);
  let n = 0;
  for(let i = 0; i < items.length; i++){
    if(seen[i]) continue;
    n++;
    const stack = [i];
    seen[i] = true;
    while(stack.length){
      const a = items[stack.pop()];
      for(let j = 0; j < items.length; j++){
        if(seen[j]) continue;
        const b = items[j];
        if(Math.hypot(a.x - b.x, (a.y ?? 0) - (b.y ?? 0), a.z - b.z) <= radius){ seen[j] = true; stack.push(j); }
      }
    }
  }
  return n;
}

/** One row of the report. */
function row(name, area, items){
  const pieces = cluster(items);
  return { name, area, objects: items.length, pieces,
    per10: area > 0 ? (pieces / area) * 10 : 0 };
}

// ---------------------------------------------------------------- interiors
async function measureInterior(name, dir){
  const planPath = resolve(dir, 'plan.js');
  const { plan } = await import(pathToFileURL(planPath).href);
  const props = existsSync(resolve(dir, 'props.js'))
    ? await import(pathToFileURL(resolve(dir, 'props.js')).href) : {};
  const { buildInterior } = await import(pathToFileURL(resolve(gamekit, 'engine/world/interiorSite.js')).href);
  const scene = new THREE.Scene();
  buildInterior(scene, stubRenderer(), plan, {
    fitOutRoom: props.fitOutRoom, fitOutSpine: props.fitOutSpine,
  });
  const all = placements(scene).filter(isFurnishing);

  const M = plan.metrics ?? {};
  const halfW = M.corridorHalfWidth ?? 2.0;
  const depth = M.roomDepth ?? 8;
  const rows = [];
  const claimed = new Set();
  for(const r of plan.rooms ?? []){
    const sign = r.side === 'e' ? 1 : -1;
    const xIn = sign * halfW, xOut = sign * (halfW + depth);
    const lo = Math.min(xIn, xOut), hi = Math.max(xIn, xOut);
    const mine = all.filter((p, i) => {
      if(claimed.has(i)) return false;
      const inside = p.x >= lo - 0.4 && p.x <= hi + 0.4 && p.z >= r.z0 - 0.4 && p.z <= r.z1 + 0.4;
      if(inside) claimed.add(i);
      return inside;
    });
    rows.push({ ...row(`floor room · ${r.name ?? r.id}`, Math.abs(depth * (r.z1 - r.z0)), mine),
      room: true, builder: 'floor' });
  }
  const spine = all.filter((p, i) => !claimed.has(i) && Math.abs(p.x) <= halfW + 0.4);
  const sp = plan.spine ?? { z0: 0, z1: 0 };
  rows.push(row('corridor', Math.abs((sp.z1 - sp.z0) * halfW * 2), spine));
  return { kind: 'interior', rows };
}

// ----------------------------------------------------------------- outdoors
//
// An outdoor town is not built without a WebGL renderer, and it does not need to
// be: every generic piece is a `furniture` entry in site.js and every theme-made
// one is placed by `decorate()`, which can be called with a counting stand-in for
// the context it expects. So the count is of what the theme placed, which is the
// authored quantity anyway.
async function measureOutdoor(name, dir){
  const { site } = await import(pathToFileURL(resolve(dir, 'site.js')).href);
  const props = existsSync(resolve(dir, 'props.js'))
    ? await import(pathToFileURL(resolve(dir, 'props.js')).href) : {};

  const placed = [];
  for(const f of site.furniture ?? []){
    // Every kit placer takes (x, z) or a run between two points.
    if(Number.isFinite(f.x) && Number.isFinite(f.z)) placed.push({ x: f.x, z: f.z, kind: f.kind ?? 'furniture' });
    else if(Number.isFinite(f.x0)) placed.push({ x: (f.x0 + f.x1) / 2, z: (f.z0 + f.z1) / 2, kind: f.kind ?? 'run' });
  }
  // What the theme's own decorate() puts down, counted by watching it place.
  let themeMade = 0;
  if(typeof props.decorate === 'function'){
    const scene = new THREE.Scene();
    const ctx = {
      groundHeight: () => 0, colliders: [], softColliders: [], interactables: [],
      blocked: () => false, sign: () => {}, MATERIALS: {}, lightPanels: [], areaScreens: new Map(),
      scene,
    };
    try{
      props.decorate(scene, ctx);
      scene.updateMatrixWorld(true);
      const own = placements(scene).filter(isFurnishing);
      themeMade = own.length;
      placed.push(...own.map(p => ({ x: p.x, z: p.z, kind: 'theme' })));
    }catch(err){
      themeMade = -1;      // reported, not swallowed
      console.log(`    (decorate() did not run headless: ${String(err.message).slice(0, 80)})`);
    }
  }

  const rows = [];
  const claimed = new Set();
  for(const b of site.buildings ?? []){
    const w = b.w ?? b.width ?? 8, d = b.d ?? b.depth ?? 8;
    // A building's own apron: pieces belonging to it are the ones near it.
    const pad = 3;
    const mine = placed.filter((p, i) => {
      if(claimed.has(i)) return false;
      const inside = Math.abs(p.x - b.x) <= w / 2 + pad && Math.abs(p.z - b.z) <= d / 2 + pad;
      if(inside) claimed.add(i);
      return inside;
    });
    rows.push(row(`outside · ${b.name ?? b.group ?? 'building'}`, (w + pad * 2) * (d + pad * 2), mine));
  }
  const loose = placed.filter((p, i) => !claimed.has(i));
  // The open ground is not a room and its "area" is the whole site, so density
  // there is not comparable — reported as a count only.
  rows.push({ name: 'open ground', area: 0, objects: loose.length,
    pieces: cluster(loose, 2.5), per10: 0 });
  return { kind: 'outdoor', rows, themeMade };
}

// ------------------------------------------------- the rooms you walk into
//
// Every outdoor game's doors open onto a room built by `interiorBuilding.js` from
// the theme's `interiors` block — and those rooms, not the open ground, are what
// compares with an interior game's rooms. Without them the outdoor games look
// unfurnished for the wrong reason: they were being measured on their car parks.
async function measureRooms(name, dir){
  const path = resolve(dir, 'interiors.js');
  if(!existsSync(path)) return null;
  const mod = await import(pathToFileURL(path).href);
  const spec = mod.INTERIORS ?? mod.interiors ?? mod.default;
  if(!spec || !Object.keys(spec).length) return null;
  const { buildInteriorBuilding } = await import(
    pathToFileURL(resolve(gamekit, 'engine/world/interiorBuilding.js')).href);
  const rows = [];
  let index = 0;
  for(const [id, s] of Object.entries(spec)){
    const scene = new THREE.Scene();
    let room;
    try{
      room = buildInteriorBuilding(scene, { id, index: index++, name: s.name ?? id, ...s });
    }catch(err){
      rows.push({ name: `room · ${id} (failed: ${String(err.message).slice(0, 40)})`, area: 0,
        objects: 0, pieces: 0, per10: 0 });
      continue;
    }
    // The room is a group, so its pieces are that group's children rather than the
    // scene's — one room per scene here, so both work, but this is the honest one.
    scene.updateMatrixWorld(true);
    const items = [];
    const bb = new THREE.Box3();
    for(const o of room.group.children){
      if(o.isLight || o.isCamera) continue;
      bb.setFromObject(o);
      if(bb.isEmpty() || !Number.isFinite(bb.min.x)) continue;
      const w = bb.max.x - bb.min.x, d = bb.max.z - bb.min.z, h = bb.max.y - bb.min.y;
      const p = { x: (bb.min.x + bb.max.x) / 2, z: (bb.min.z + bb.max.z) / 2,
        y: (bb.min.y + bb.max.y) / 2,
        w, d, h, span: Math.max(w, d), slab: Math.min(w, d) > 2.5 && h < 0.35 };
      if(isFurnishing(p)) items.push(p);
    }
    // The builder's own metrics are private; its default room is 11 × 9.
    rows.push({ ...row(`case room · ${s.name ?? id}`, 11 * 9, items), room: true, builder: 'case' });
  }
  return rows;
}

// -------------------------------------------------------------------- report
const summary = [];
for(const name of wanted){
  let dir;
  try{ dir = placeDir(name); }catch{ console.log(`\n=== ${name}: not a registered theme`); continue; }
  const hasPlan = existsSync(resolve(dir, 'plan.js'));
  const hasSite = existsSync(resolve(dir, 'site.js'));
  let res = null;
  try{
    if(hasPlan) res = await measureInterior(name, dir);
    else if(hasSite) res = await measureOutdoor(name, dir);
  }catch(err){
    console.log(`\n=== ${name}: could not be measured — ${String(err.message).slice(0, 120)}`);
    continue;
  }
  // Whatever kind of place the theme brings, its walk-in rooms are measured the
  // same way, so one number compares across all ten games.
  let roomRows = null;
  try{ roomRows = await measureRooms(name, dir); }
  catch(err){ console.log(`    (rooms not measured: ${String(err.message).slice(0, 70)})`); }
  if(!res && !roomRows){
    console.log(`\n=== ${name}: brings its own world and no interiors block — not measured`);
    continue;
  }
  if(!res) res = { kind: 'own world', rows: [] };
  if(roomRows) res.rows = [...res.rows, ...roomRows];

  const real = res.rows.filter(r => r.area > 0);
  const totalPieces = res.rows.reduce((n, r) => n + r.pieces, 0);
  const totalArea = real.reduce((n, r) => n + r.area, 0);
  const mean = totalArea > 0 ? (real.reduce((n, r) => n + r.pieces, 0) / totalArea) * 10 : 0;
  // The rooms the player stands in are the comparable quantity across all ten
  // games: an outdoor game's car park and an interior game's corridor are not.
  const roomsOnly = res.rows.filter(r => r.room && r.area > 0);
  const med = (xs) => {
    if(!xs.length) return 0;
    const v = [...xs].sort((a, b) => a - b);
    return v.length % 2 ? v[(v.length - 1) / 2] : (v[v.length / 2 - 1] + v[v.length / 2]) / 2;
  };
  const byBuilder = (b) => roomsOnly.filter(r => r.builder === b);
  const stat = (rs) => ({ n: rs.length, pieces: med(rs.map(r => r.pieces)), per10: med(rs.map(r => r.per10)) });
  // Split by builder. Quantum has both kinds and they are five times apart, so one
  // median across them would hide exactly the thing worth seeing: the rooms a theme
  // laid out itself against the rooms `interiorBuilding.js` fits out for everybody.
  const floors = stat(byBuilder('floor')), cases = stat(byBuilder('case'));
  summary.push({ name, kind: res.kind, rooms: real.length, totalPieces, mean, floors, cases });

  console.log(`\n=== ${name} (${res.kind}) — ${totalPieces} pieces across ${real.length} places`);
  if(floors.n) console.log(`    the theme's own rooms: median ${floors.pieces} pieces, ${num(floors.per10, 2)} per 10 m² (${floors.n})`);
  if(cases.n) console.log(`    engine-built case rooms: median ${cases.pieces} pieces, ${num(cases.per10, 2)} per 10 m² (${cases.n})`);
  const pad = Math.max(...res.rows.map(r => r.name.length));
  for(const r of [...res.rows].sort((a, b) => a.per10 - b.per10)){
    const flag = r.area > 0 && r.per10 < THIN ? '  ← thin' : '';
    const dens = r.area > 0 ? `${num(r.per10, 2).padStart(5)} per 10 m²` : '     (open ground)';
    console.log(`  ${r.name.padEnd(pad)}  ${String(r.pieces).padStart(3)} pieces`
      + (showObjects ? ` (${String(r.objects).padStart(3)} objects)` : '')
      + `  ${String(num(r.area, 0)).padStart(4)} m²  ${dens}${flag}`);
  }
}

if(summary.length > 1){
  console.log('\n=== rooms the player stands in, thinnest first');
  console.log('    (a car park and a corridor are not rooms, so neither is counted here)');
  const line = (s, st, what) => `  ${s.name.padEnd(20)} ${what.padEnd(11)} median `
    + `${String(st.pieces).padStart(3)} pieces  ${num(st.per10, 2).padStart(5)} per 10 m²  (${st.n} rooms)`;
  const all = [];
  for(const s of summary){
    if(s.floors.n) all.push({ sort: s.floors.per10, text: line(s, s.floors, 'own rooms') });
    if(s.cases.n) all.push({ sort: s.cases.per10, text: line(s, s.cases, 'case rooms') });
  }
  for(const r of all.sort((a, b) => a.sort - b.sort)) console.log(r.text);
  console.log('\n=== everything each game places, for scale');
  for(const s of [...summary].sort((a, b) => a.totalPieces - b.totalPieces)){
    console.log(`  ${s.name.padEnd(20)} ${String(s.totalPieces).padStart(4)} pieces  (${s.rooms} measured places, ${s.kind})`);
  }
}
