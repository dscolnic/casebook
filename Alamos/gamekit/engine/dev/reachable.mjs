// reachable.mjs — can the player actually walk to every stop?
//
//   node engine/dev/reachable.mjs <theme>
//   node engine/dev/reachable.mjs --all
//
// The complaint this exists for: "for mounds of dirt, people can go through them
// rather than over them and it cuts out their bodies." The mounds had no
// collision at all, and the fix — giving every bank, dune and spoil heap a
// collider — introduced the opposite failure in the same afternoon: a berm
// shoulder standing across the graded track, a tank farm in the middle of the
// road, and a drill rig ringed by its own spoil heaps with no way in.
//
// None of that is visible to any other check here. `smokeCampaign` asks whether
// the engine can reach a stop in its *state machine*, which it can — the door
// opens whether or not anybody can walk to it. `placement` fires rays at wall
// fittings indoors. `worldParity` asks whether a group has a building at all.
// A door sealed behind two metres of dirt passes every one of them.
//
// So this asks the question directly, over the ground rather than along a line:
// flood-fill from the spawn across a half-metre grid, refusing any cell the
// player's own collision would refuse, and check that every stop entry is in the
// region that comes back. A straight-line test would be wrong — a berm is
// *supposed* to stand between the track and a door, and you walk round it to the
// cutting — which is exactly why this is a fill and not a ray.
//
// WHAT IT CANNOT SEE. Terrain: the fill is flat, so a place walled off by a
// slope rather than by a collider still reads as reachable. Interiors: the case
// rooms are built lazily in their own district and have no colliders until
// somebody walks in. And it says nothing about how *far* the walk is, which is
// the day budget's business.
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeDir, themeNames } from './registry.mjs';
import { installDom } from './headless.mjs';

const args = process.argv.slice(2);
const wanted = args.includes('--all') ? themeNames() : args.filter(a => !a.startsWith('--'));
if(!wanted.length){
  console.error('usage: node engine/dev/reachable.mjs <theme> | --all');
  process.exit(2);
}

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');
installDom();
const THREE = await import(pathToFileURL(resolve(gamekit, 'node_modules/three/build/three.module.js')).href);

/** The player's own width, from the theme, and the grid the fill runs on. */
const STEP = 0.5;

let failures = 0;

for(const name of wanted){
  const dir = themeDir(name);
  const sitePath = resolve(dir, 'site.js');
  if(!existsSync(sitePath)){
    console.log(`\n· ${name}: interior or its own world — nothing to fill`);
    continue;
  }
  const { site } = await import(pathToFileURL(sitePath).href);
  if((site.kind ?? 'outdoor') !== 'outdoor' || !site.buildings?.length){
    console.log(`\n· ${name}: not an outdoor town`);
    continue;
  }
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const props = existsSync(resolve(dir, 'props.js'))
    ? await import(pathToFileURL(resolve(dir, 'props.js')).href) : {};

  // The colliders the *theme* places. The world's own building boxes are added
  // below from the site data, because building the real world needs a GPU and
  // the geometry is a straight function of `site.buildings` anyway.
  const colliders = [], softColliders = [];
  if(typeof props.decorate === 'function'){
    const scene = new THREE.Scene();
    try{
      props.decorate(scene, {
        groundHeight: () => 0, colliders, softColliders, interactables: [],
        blocked: () => false, sign: () => ({}), MATERIALS: {},
        lightPanels: [], areaScreens: new Map(), stateHooks: [],
      });
    }catch(err){
      console.log(`\n· ${name}: decorate() could not run headless — ${err.message}`);
      continue;
    }
  }
  // `kit.building` boxes its shell with a 0.6 m margin and rotates the extent
  // for a building that is turned; same arithmetic here.
  for(const b of site.buildings){
    const turned = (b.facing ?? 0) % Math.PI !== 0;
    const hx = (turned ? b.d : b.w) / 2 + 0.6, hz = (turned ? b.w : b.d) / 2 + 0.6;
    colliders.push(new THREE.Box3(
      new THREE.Vector3(b.x - hx, 0, b.z - hz), new THREE.Vector3(b.x + hx, 4, b.z + hz)));
  }

  const R = theme.look?.playerRadius ?? 0.45;
  const hit = (x, z) =>
    colliders.some(c => x > c.min.x - R && x < c.max.x + R && z > c.min.z - R && z < c.max.z + R)
    || softColliders.some(c => (x - c.x) ** 2 + (z - c.z) ** 2 < (c.r + R) ** 2);

  // The grid covers everything the player is allowed to reach.
  const limit = Math.min(site.terrain?.playerLimit ?? 105, 240);
  const N = Math.round((limit * 2) / STEP);
  const at = (i) => -limit + i * STEP;
  const open = new Uint8Array(N * N);
  for(let i = 0; i < N; i++){
    for(let j = 0; j < N; j++) open[j * N + i] = hit(at(i), at(j)) ? 0 : 1;
  }

  const spawn = site.spawn ?? { x: 0, z: 0 };
  const gi = Math.round((spawn.x + limit) / STEP), gj = Math.round((spawn.z + limit) / STEP);
  const seen = new Uint8Array(N * N);
  const problems = [];
  if(!open[gj * N + gi]){
    problems.push(`the spawn (${spawn.x}, ${spawn.z}) is inside something — the game renders and W does nothing`);
  } else {
    const stack = [gj * N + gi];
    seen[stack[0]] = 1;
    while(stack.length){
      const n = stack.pop(), i = n % N, j = (n - i) / N;
      for(const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){
        const a = i + di, b = j + dj;
        if(a < 0 || b < 0 || a >= N || b >= N) continue;
        const m = b * N + a;
        if(seen[m] || !open[m]) continue;
        seen[m] = 1;
        stack.push(m);
      }
    }
  }

  /** Reachable, allowing a metre of slack: an entry may sit against a wall. */
  const reachable = (x, z) => {
    for(let dx = -1; dx <= 1; dx++){
      for(let dz = -1; dz <= 1; dz++){
        const i = Math.round((x + dx + limit) / STEP), j = Math.round((z + dz + limit) / STEP);
        if(i < 0 || j < 0 || i >= N || j >= N) continue;
        if(seen[j * N + i]) return true;
      }
    }
    return false;
  };

  // A *stop* has to be reachable: a mission sends the player to it and a day
  // that cannot be finished is a broken game. A background building is a note —
  // three of the shipped games put housing behind the wire on purpose, and the
  // player is never asked to go in.
  const notes = [];
  let checked = 0;
  for(const b of site.buildings){
    if(Math.hypot(b.x, b.z) > limit) continue;          // outside the fence anyway
    const dx = Math.sin(b.facing ?? 0), dz = Math.cos(b.facing ?? 0);
    const ex = b.x + dx * (b.d / 2 + 3.2), ez = b.z + dz * (b.d / 2 + 3.2);
    checked++;
    if(!reachable(ex, ez)){
      const line = `"${b.name ?? b.id}": its door at (${ex.toFixed(0)}, ${ez.toFixed(0)})`
        + ' cannot be walked to from the spawn';
      if(b.group) problems.push('stop ' + line);
      else notes.push('place ' + line);
    }
  }

  if(problems.length){
    failures++;
    console.log(`\n✗ theme "${name}": ${problems.length} stop(s) walled off`);
    for(const p of problems) console.log('  ✗ ' + p);
    console.log('  A collider a prop placed, or a building whose door faces a bank.');
  } else {
    console.log(`\n✓ theme "${name}": every stop is reachable on foot from the spawn`
      + ` — ${checked} door(s), ${colliders.length} box + ${softColliders.length} cylinder colliders`);
  }
  for(const n of notes) console.log('  · ' + n);
}

process.exit(failures ? 1 : 0);
