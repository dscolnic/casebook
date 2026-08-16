// placement.mjs — is everything actually attached to something?
//
//   node engine/dev/placement.mjs <theme>
//   node engine/dev/placement.mjs --all
//   node engine/dev/placement.mjs <theme> --verbose    every fitting, passing or not
//
// WHY THIS EXISTS. Four separate rounds of play-testing were spent on the same
// class of defect, each found by a person walking into a room and saying so:
// boards floating where a doorway is, boards hung *inside* the wall so only the
// dark edge shows, a mural carrying on past the end of the wall it was painted on.
// Every check passed every time. They passed because they asked whether a *point*
// had a wall behind it, and a notice board is not a point — it is a metre wide, and
// the middle of it can be on the wall while both ends are over a doorway.
//
// So this fires rays instead, through the whole face of every fitting, and asks
// three questions of each one:
//
//   FLOATING     is there wall behind all of it, within reach?
//   BURIED       is the space in front of it clear, or is the wall in front?
//   UNSUPPORTED  (loose furniture) is there anything underneath it?
//
// BURIED is the one no amount of care would have caught by eye in the source. The
// builders raise a wall *centred* on the line they are given, so a 0.18 m wall on
// x = 2.1 has the surface a player sees at 2.01. Hanging a sign at 2.06 puts it
// inside the plaster. It has a wall behind it — it passes every point test ever
// written — and it is invisible in the game.
//
// WHAT IT CANNOT SEE. Two things, and both matter. It only knows a fitting is
// meant to be on a wall because `markWallMounted` said so, so a theme that builds
// its own wall furniture without the kit is invisible here. And it only reaches
// worlds the generated builders make: a game that lays out its own place by hand
// is beyond it. Screenshots are what covers those — see `shots.mjs`.
import { themeDir, themeNames, placeDir } from './registry.mjs';
import { THREE, interiorScene, caseRoomScenes } from './scenes.mjs';

/** How far behind a fitting a wall may be and still be holding it up. */
const GAP = 0.40;
/** How much clear air a fitting needs in front of it to be visible at all. */
const CLEAR = 0.45;
/** Rays per axis across a face. 3 × 3 = the four corners, the edges and the middle. */
const SAMPLES = 3;
/** Don't sample the outermost sliver: a millimetre of overhang is not a defect. */
const INSET = 0.06;
/** How far a loose piece may sit above whatever holds it up. */
const DROP = 0.40;
/** A loose piece with a wall this close is wall furniture somebody didn't tag. */
const NEAR_WALL = 0.40;
/** Closer than this to another piece and it is part of it, not floating beside it. */
const TOUCH = 0.12;
/** Wider than this in plan and it is structure, not a piece of furniture. */
const STRUCTURE_M = 6.0;

const args = process.argv.slice(2);
const verbose = args.includes('--verbose');
const wanted = args.includes('--all') ? themeNames() : args.filter(a => !a.startsWith('--'));
if(!wanted.length){
  console.error('usage: node engine/dev/placement.mjs <theme> | --all [--verbose]');
  process.exit(2);
}

const num = (v, d = 2) => (Math.round(v * 10 ** d) / 10 ** d).toFixed(d);
const at = (v) => `(${num(v.x, 1)}, ${num(v.y, 1)}, ${num(v.z, 1)})`;

// ---------------------------------------------------------------- gathering
//
// One pass over the scene collects both halves of the question: what was hung on
// a wall, and what the walls are. `markWallMounted` and `markStructure` in
// interiorKit are the only sources of either, deliberately — inferring "that
// looks like a wall" from a mesh's proportions is how a checker starts lying.

/** Every mesh under `root` tagged as structure of one of the given kinds. */
function structureMeshes(root, kinds){
  const out = [];
  root.traverse(o => {
    const kind = o.userData?.structure;
    if(!kind || !kinds.includes(kind)) return;
    if(o.isMesh) out.push(o);
    else o.traverse(c => { if(c.isMesh) out.push(c); });
  });
  return out;
}

/**
 * Every wall fitting under `root`, one entry per thing hung — not per mesh.
 *
 * A sign is a backing board plus a printed face, placed as two objects at the same
 * point, and reporting one defect twice teaches whoever reads the report to skim.
 * So fittings within a few centimetres of each other, facing the same way, are the
 * one fitting they are.
 */
function fittings(root){
  const found = [];
  root.traverse(o => {
    const m = o.userData?.mount;
    if(m?.kind !== 'wall') return;
    const box = new THREE.Box3().setFromObject(o);
    if(box.isEmpty() || !Number.isFinite(box.min.x)) return;
    const n = new THREE.Vector3(...m.n).transformDirection(o.matrixWorld).normalize();
    found.push({ obj: o, label: m.label || 'fitting', box, n,
      centre: box.getCenter(new THREE.Vector3()) });
  });
  const kept = [];
  for(const f of found){
    const twin = kept.find(k => k.centre.distanceTo(f.centre) < 0.12 && k.n.dot(f.n) > 0.9);
    if(twin){
      // Keep the larger face: the printed sheet is what the player is looking at,
      // and the board behind it is a millimetre narrower.
      twin.box.union(f.box);
      twin.box.getCenter(twin.centre);
      if(!twin.label && f.label) twin.label = f.label;
    }else kept.push(f);
  }
  return kept;
}

/** The axis a normal points down, and the two it spans. */
function axes(n){
  const a = Math.abs(n.x) >= Math.abs(n.z) ? 'x' : 'z';
  return { normal: a, across: a === 'x' ? 'z' : 'x' };
}

/**
 * Points spread over the face of a fitting.
 *
 * Across its width and up its height, because both directions have been the one
 * that hung over a doorway. A fitting narrower than the inset is sampled down its
 * middle rather than skipped — a small sign in a doorway is still in the doorway.
 */
function facePoints(f){
  const { normal, across } = axes(f.n);
  const sign = f.n[normal] > 0 ? 1 : -1;
  const face = sign > 0 ? f.box.max[normal] : f.box.min[normal];
  const spread = (lo, hi) => {
    if(hi - lo <= INSET * 2) return [(lo + hi) / 2];
    const a = lo + INSET, b = hi - INSET;
    return Array.from({ length: SAMPLES }, (_, i) => a + ((b - a) * i) / (SAMPLES - 1));
  };
  const out = [];
  for(const u of spread(f.box.min[across], f.box.max[across])){
    for(const y of spread(f.box.min.y, f.box.max.y)){
      const p = new THREE.Vector3();
      p[normal] = face; p[across] = u; p.y = y;
      out.push(p);
    }
  }
  return out;
}

// ------------------------------------------------------------------- checks

function checkFittings(root, place, problems){
  const walls = structureMeshes(root, ['wall']);
  const solid = structureMeshes(root, ['wall', 'floor']);
  if(!walls.length) return 0;
  const ray = new THREE.Raycaster();
  ray.far = Math.max(GAP, CLEAR) + 0.05;
  let checked = 0;

  for(const f of fittings(root)){
    checked++;
    const points = facePoints(f);
    const back = new THREE.Vector3().copy(f.n).negate();
    let missing = 0;
    let blocked = 0;

    for(const p of points){
      // Behind: start just off the face and go into the wall.
      ray.set(new THREE.Vector3().copy(p).addScaledVector(f.n, 0.01), back);
      ray.far = GAP;
      if(!ray.intersectObjects(walls, false).length) missing++;

      // In front: start just off the face and go out into the room. Anything
      // solid out there means the fitting is inside the wall, not on it.
      ray.set(new THREE.Vector3().copy(p).addScaledVector(f.n, 0.005), f.n);
      ray.far = CLEAR;
      if(ray.intersectObjects(solid, false).length) blocked++;
    }

    if(blocked > points.length / 2){
      problems.push({ kind: 'BURIED', place, label: f.label, where: f.centre,
        detail: 'wall in front of its face — hung inside the wall, not on it' });
    }else if(missing){
      problems.push({ kind: 'FLOATING', place, label: f.label, where: f.centre,
        detail: `${missing}/${points.length} of its face has no wall behind it` });
    }else if(verbose){
      problems.push({ kind: 'ok', place, label: f.label, where: f.centre, detail: 'on the wall' });
    }
  }
  return checked;
}

/**
 * Loose furniture, and whether anything holds it up.
 *
 * Only the things that could plausibly be standing on something: a fitting high on
 * a wall, a ceiling diffuser and a floor slab all fail a "what is underneath you"
 * test for reasons that are not defects. Anything with a wall within arm's reach
 * is let alone too, because that is wall furniture a theme built without the kit —
 * a false accusation here costs more than the miss, since a checker that cries
 * wolf gets switched off.
 */
/** A copy of `b`, grown by `m` in every direction. */
function grown(b, m){
  return new THREE.Box3(
    new THREE.Vector3(b.min.x - m, b.min.y - m, b.min.z - m),
    new THREE.Vector3(b.max.x + m, b.max.y + m, b.max.z + m));
}

function checkStanding(root, place, problems){
  const wallBoxes = structureMeshes(root, ['wall'])
    .map(m => new THREE.Box3().setFromObject(m));
  const everything = [];
  root.traverse(o => { if(o.isMesh) everything.push(o); });
  const ray = new THREE.Raycaster();
  const box = new THREE.Box3();
  let checked = 0;

  // What every placed thing occupies, so a piece can be asked what it touches as
  // well as what is under it. A spout on the side of a cryostat has nothing below
  // it and is not floating; a crate in mid-air touches nothing at all.
  const occupied = [];
  for(const o of root.children){
    if(o.isLight || o.isCamera) continue;
    const b = new THREE.Box3().setFromObject(o);
    if(!b.isEmpty() && Number.isFinite(b.min.x)) occupied.push({ obj: o, box: b });
  }

  for(const o of root.children){
    if(o.isLight || o.isCamera) continue;
    if(o.userData?.structure || o.userData?.mount) continue;
    box.setFromObject(o);
    if(box.isEmpty() || !Number.isFinite(box.min.x)) continue;
    const size = box.getSize(new THREE.Vector3());
    if(Math.max(size.x, size.z) > STRUCTURE_M || size.y <= 0.06) continue;
    if(box.min.y <= 0.10 || box.min.y >= 1.30) continue;      // on the floor, or up high
    const c = box.getCenter(new THREE.Vector3());

    // Wall furniture somebody didn't tag: leave it alone. Measured as a box
    // overlap rather than a ray, because a piece hung 20 mm inside the plaster has
    // its centre *within* the wall, and a ray fired from inside a solid leaves
    // through the back face and reports open air.
    if(wallBoxes.some(w => w.intersectsBox(grown(box, NEAR_WALL)))) continue;
    // Bolted to the piece next to it: a handle, a spout, a bracket, a shelf.
    const near = grown(box, TOUCH);
    if(occupied.some(t => t.obj !== o && t.box.intersectsBox(near))) continue;

    checked++;
    const mine = new Set();
    o.traverse(c2 => mine.add(c2));
    ray.set(new THREE.Vector3(c.x, box.min.y + 0.02, c.z), new THREE.Vector3(0, -1, 0));
    ray.far = DROP;
    const under = ray.intersectObjects(everything, false).filter(h => !mine.has(h.object));
    if(!under.length){
      problems.push({ kind: 'UNSUPPORTED', place, label: o.name || 'loose piece', where: c,
        detail: `nothing within ${num(DROP, 2)} m below it` });
    }
  }
  return checked;
}

// ------------------------------------------------------ naming the place
//
// "A sign is floating" is not actionable; "a sign is floating in Error &
// Verification" is. The plan already knows which room a point is in.
function roomNamer(plan){
  const M = plan.metrics ?? {};
  const halfW = M.corridorHalfWidth ?? 2.0;
  const depth = M.roomDepth ?? 8;
  return (p) => {
    if(Math.abs(p.x) <= halfW + 0.2) return 'corridor';
    const side = p.x > 0 ? 'e' : 'w';
    for(const r of plan.rooms ?? []){
      if(r.side !== side) continue;
      if(p.z >= r.z0 - 0.3 && p.z <= r.z1 + 0.3 && Math.abs(p.x) <= halfW + depth + 0.4){
        return r.name ?? r.id;
      }
    }
    return `${side === 'e' ? 'east' : 'west'} side`;
  };
}

// --------------------------------------------------------------------- run
let failed = 0;
for(const name of wanted){
  // Everything this fires a ray at is the place, and an edition's place is the
  // base theme's.
  const dir = placeDir(name);
  const problems = [];
  let fittingCount = 0, standingCount = 0, places = 0;

  const interior = await interiorScene(dir).catch(err => {
    problems.push({ kind: 'BUILD', place: name, label: 'plan.js',
      where: new THREE.Vector3(), detail: err.message });
    return null;
  });
  if(interior){
    places++;
    const named = roomNamer(interior.plan);
    const before = problems.length;
    fittingCount += checkFittings(interior.scene, 'floor', problems);
    standingCount += checkStanding(interior.scene, 'floor', problems);
    for(let i = before; i < problems.length; i++) problems[i].place = named(problems[i].where);
  }

  for(const room of await caseRoomScenes(dir)){
    if(room.error){
      problems.push({ kind: 'BUILD', place: room.name, label: 'interiors.js',
        where: new THREE.Vector3(), detail: room.error.message });
      continue;
    }
    places++;
    fittingCount += checkFittings(room.group, room.name, problems);
    standingCount += checkStanding(room.group, room.name, problems);
  }

  const bad = problems.filter(p => p.kind !== 'ok');
  if(bad.length){
    console.log(`✗ theme "${name}": ${bad.length} thing(s) not attached to anything`);
  }else if(places === 0){
    console.log(`✓ theme "${name}": world is hand-built — nothing here a ray can reach`);
  }else{
    console.log(`✓ theme "${name}": ${fittingCount} wall fitting(s) on walls, `
      + `${standingCount} loose piece(s) on something, across ${places} place(s)`);
  }
  for(const p of problems){
    const tag = p.kind === 'ok' ? '      ok' : `  ${p.kind.padEnd(6)}`;
    console.log(`${tag}  ${p.place} · ${p.label} ${at(p.where)}  ${p.detail}`);
  }
  if(bad.length) failed += bad.length;
}

if(failed){
  console.log(`\n${failed} placement problem(s). A fitting that is not on a wall is not in the game.`);
  process.exit(1);
}
process.exit(0);
