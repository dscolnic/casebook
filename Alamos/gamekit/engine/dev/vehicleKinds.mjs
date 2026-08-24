// vehicleKinds.mjs — every outdoor site can be got about in two different ways.
//
//   node engine/dev/vehicleKinds.mjs <theme>
//   node engine/dev/vehicleKinds.mjs --all
//   node engine/dev/vehicleKinds.mjs --selftest
//
// WHY THIS EXISTS, and it is not "more vehicles would be nice".
//
// Eight sites in this repo have a far tier, which means `orientation.js` opens
// the far half on the unlock day and `src/main.js` signs the vehicles out on the
// same morning — and the campaign says so out loud, on a warm-up card the player
// reads before anything else that day:
//
//     "…they are far enough out that transport is signed out to reach them.
//      Drive the route once before somebody is waiting at the other end."
//
// Seven of those eight shipped with **no vehicle in the world at all**. The card
// promised a drive, the ground was 200–320 m out, and there was nothing to take.
// It is the same defect as the HUNT count that named eleven items on a six-area
// site: only a person walking out of the plan card and looking would ever see
// it, because every content gate reads the book and the book is correct.
//
// THE SECOND HALF is about the place rather than the promise. A site whose only
// transport is a truck asks nothing about how to get about: there is one answer
// and it is always the same answer. Two kinds make the route a decision, which
// is the same argument the countdown rests on — Slack Water's van has the
// barrage road and its quad has the mud; Corbin Park's flatbed carries and its
// cart fits down the midway; Red Sand's rover is a habitat that costs the power
// budget and its buggy is a frame you ride in the suit you are already in.
//
// WHAT IS MEASURED. The world is *built*, headless, and the vehicles counted off
// `ctx.interactables` — the same array `main.js` reads. Not a grep for
// `driveable(`: three trucks in three colours are three calls and one kind, and
// a source scan would report a site as varied because somebody parked more of
// the same thing. `kind` is a field on the call, defaulting to `'vehicle'`, and
// an unstated kind is deliberately one bucket rather than a guess off the label
// — two vehicles that decline to say what they are must not count as two kinds
// because they are spelled differently.
//
// WHAT IT CANNOT SEE. Whether either vehicle is any good to drive, whether it is
// parked somewhere sensible, or whether it looks like what it is called. Ice
// Core's three skidoos were `kit.scooter` — kick scooters, on a polar plateau,
// under a comment calling them skidoos — and no measurement here would have
// objected, because a scooter is a second kind. A screenshot found that.
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeNames, placeDir, editionBase } from './registry.mjs';
import { installDom } from './headless.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');

/** How many distinct kinds an outdoor site must offer. */
const MIN_KINDS = 2;

const args = process.argv.slice(2);
const wantAll = args.includes('--all');
const selftest = args.includes('--selftest');
const wanted = args.filter(a => !a.startsWith('--'));

installDom();
const THREE = await import(pathToFileURL(resolve(gamekit, 'node_modules/three/build/three.module.js')).href);

/**
 * Build a theme's outdoor props and report what can be driven.
 *
 * `decorate` is called with the same context shape `outdoorTown.js` passes it,
 * with a flat ground and nothing blocked — the vehicles land where the theme
 * asked, which is what is being asked about. A theme whose decorate cannot run
 * headless is reported as such rather than passed: this file's own house rule
 * is that a check which cannot make its measurement says so.
 */
async function drivablesOf(dir){
  const propsPath = resolve(dir, 'props.js');
  if(!existsSync(propsPath)) return { kind: 'no-props' };
  const props = await import(pathToFileURL(propsPath).href);
  if(typeof props.decorate !== 'function') return { kind: 'no-decorate' };

  const scene = new THREE.Scene();
  const interactables = [];
  const ctx = {
    groundHeight: () => 0,
    colliders: [], softColliders: [], interactables,
    blocked: () => false,
    sign: () => {}, MATERIALS: {}, lightPanels: [], areaScreens: new Map(),
    stateHooks: [], scene,
  };
  try{
    props.decorate(scene, ctx);
  }catch(err){
    return { kind: 'threw', message: String(err.message).slice(0, 140) };
  }
  const vehicles = interactables.filter(i => i.type === 'vehicle' || i.type === 'aircraft');
  return { kind: 'ok', vehicles };
}

/** One theme's row. `null` means the theme is not an outdoor site. */
async function measure(name){
  const dir = placeDir(name);
  // An interior game has no ground to cross: a submarine is one line of
  // compartments, Mission Control is one room, the Ellery is a theatre. Nothing
  // here applies to them, and the test is what the site says it is rather than
  // which file it is built from — five interiors bring their own world module,
  // and `world:` would exclude an outdoor theme that did the same.
  if(existsSync(resolve(dir, 'plan.js'))) return null;
  if(!existsSync(resolve(dir, 'site.js'))) return null;
  const { site } = await import(pathToFileURL(resolve(dir, 'site.js')).href);
  if(site?.kind === 'interior' || !site?.terrain) return null;
  // An *outdoor* theme with its own world module builds its place itself, so
  // `decorate` may not be where its vehicles are. There is no such theme today;
  // if one appears, finding nothing is a measurement that failed rather than a
  // site that passed, and it says so below.
  const ownWorld = typeof site?.world === 'string';

  const res = await drivablesOf(dir);
  const spawn = site?.spawn ?? site?.start ?? { x: 0, z: 0 };
  const rows = (res.vehicles ?? []).map(v => {
    const p = v.vehicle?.group?.position ?? v.aircraft?.group?.position ?? { x: 0, z: 0 };
    return {
      id: v.id, kind: v.kind ?? 'vehicle',
      x: p.x, z: p.z,
      fromSpawn: Math.hypot(p.x - (spawn.x ?? 0), p.z - (spawn.z ?? 0)),
    };
  });
  return { name, ownWorld, status: res.kind, message: res.message, rows,
    kinds: [...new Set(rows.map(r => r.kind))] };
}

// --------------------------------------------------------------------- report
const num = (v) => (Math.round(v * 10) / 10).toFixed(1);

async function run(names){
  let failures = 0;
  let measured = 0;
  for(const name of names){
    let r;
    try{ r = await measure(name); }
    catch(err){
      console.log(`${name}: could not be measured — ${String(err.message).slice(0, 120)}`);
      failures++;
      continue;
    }
    if(!r) continue;                                  // interior, not our question

    // An edition shares its base theme's place, so its vehicles are the base's
    // and failing both would report one gap twice.
    if(editionBase(name)) continue;

    if(r.status === 'threw'){
      console.log(`${name}: decorate() did not run headless — ${r.message}`);
      failures++;
      continue;
    }
    const short = r.kinds.length < MIN_KINDS;
    const head = `${name.padEnd(20)} ${String(r.rows.length).padStart(2)} vehicle(s) · `
      + `${r.kinds.length} kind(s) · ${r.kinds.join(', ') || '—'}`;
    if(short && r.ownWorld){
      // An outdoor place built outside decorate(). Failed rather than skipped:
      // "this checker cannot see your motor pool" and "you have no motor pool"
      // are the same output here, and passing on the ambiguity is how a gate
      // reports all-clear on the one theme it cannot read.
      console.log(`${head}   FAIL: outdoor, own world module — this cannot see its vehicles`);
      failures++;
      continue;
    }
    measured++;
    console.log(short ? `${head}   FAIL: wants ${MIN_KINDS}` : head);
    if(short) failures++;

    // A vehicle on the spawn welds the player in place — house rule 8, and the
    // symptom is that the world renders perfectly and W does nothing. Reported
    // for every theme, not only the failing ones.
    for(const v of r.rows){
      if(v.fromSpawn < 10){
        console.log(`    ${v.id} is ${num(v.fromSpawn)} m from the spawn — a prop that close welds the player in place`);
        failures++;
      }
    }
  }
  return { failures, measured };
}

// ------------------------------------------------------------------ selftest
//
// Three cases, and the first two are the ones that would invert silently.
async function runSelftest(){
  const cases = [];
  const kindsOf = (list) => [...new Set(list.map(v => v.kind ?? 'vehicle'))];

  // 1. Three of the same thing, differently named, is one kind. This is the
  //    case a grep for `driveable(` gets wrong, and it is not hypothetical:
  //    Red Sand parks three rovers labelled "pressurised rover", "plant rover"
  //    and "excavation rover", and Ice Core three tractors under three names.
  cases.push(['three of one thing under three names is one kind',
    kindsOf([{ kind: 'rover' }, { kind: 'rover' }, { kind: 'rover' }]).length === 1]);

  // 2. Two vehicles that state no kind are one kind, not two. Falling back to
  //    the label would make "line truck" and "spare truck" two kinds and pass a
  //    site with one sort of transport on it.
  cases.push(['two vehicles with no kind stated are one kind',
    kindsOf([{ label: 'line truck' }, { label: 'spare truck' }]).length === 1]);

  // 3. And the rule actually separates. Without this the first two pass by the
  //    counter being broken in the safe direction.
  cases.push(['a van and a quad are two kinds',
    kindsOf([{ kind: 'van' }, { kind: 'quad' }]).length === MIN_KINDS]);

  // 4. The measurement reads the *built world*, not the source. A theme whose
  //    decorate() throws must be a failure, never a silent pass — a check that
  //    cannot make its measurement and says nothing reports all-clear on every
  //    theme it cannot build.
  const broke = await drivablesOf(resolve(gamekit, 'engine/dev'));   // no props.js there
  cases.push(['a directory with no props.js is not reported as passing',
    broke.kind === 'no-props']);

  let bad = 0;
  for(const [what, ok] of cases){
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
    if(!ok) bad++;
  }
  console.log(bad ? `\nvehicleKinds selftest: ${bad} case(s) failed.` : '\nvehicleKinds selftest: all cases pass.');
  return bad;
}

let failed = 0;
if(selftest){
  failed = await runSelftest();
} else {
  const names = wantAll || !wanted.length ? themeNames() : wanted;
  const { failures, measured } = await run(names);
  failed = failures;
  // Silent when there was nothing to measure. Most themes are interiors or
  // editions of another theme's place, and a per-theme run inside `npm run
  // check` that announces a clean sweep of nothing is fifty lines of noise.
  if(measured){
    console.log(failed
      ? `\n${failed} vehicle problem(s).`
      : `\n${measured} outdoor site(s), each one gettable about two ways.`);
  }
}
process.exit(failed ? 1 : 0);
