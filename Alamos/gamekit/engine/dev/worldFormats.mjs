// worldFormats.mjs — the selftest for the five formats graded against the place.
//
//   node engine/dev/worldFormats.mjs --selftest
//
// ## Why this file has to exist
//
// `npm run drive` plays every instrument panel in a real browser, and for these
// five it plays them through a **stub world** that hands back whatever result
// the play asked for. That exercises the suspend, the resume, the re-bind and
// the grading — everything a selector can break — and it cannot see the half
// that decides whether the format works: whether walking up to somebody counts
// as a greeting, whether a distance outside the band is measured as outside it,
// whether EVADE's clock actually stops while you are caught.
//
// That half is `engine/world/worldFormats.js`, it is plain arithmetic over
// positions, and it runs in node against a stub DOM. So it is measured here,
// against runs whose answer is known.
//
// The rule this repo keeps paying for applies to this file too: a check that
// asserts nothing about itself reports confident numbers that are partly an
// artifact of the check. Every case below is written so that putting the bug
// back fails that case and only that case — and two of them are there because
// the first version of this file passed while the format was wrong.

import * as THREE from 'three';
import { installDom } from './headless.mjs';

installDom();

// The HUD is a real element in the game and `installDom`'s createElement is not
// one. Enough of an element for `worldFormats.js` to write two lines into.
const nodes = [];
const makeCanvas = document.createElement;      // headless.mjs's, which paints
document.createElement = (t) => {
  // A beacon measures its own label, so a canvas has to be the stub that can.
  if(t === 'canvas') return makeCanvas('canvas');
  const el = { tag: t, style: {}, innerHTML: '', textContent: '',
    classList: { add(){}, remove(){}, contains: () => false },
    appendChild(){}, append(){}, remove(){},
    querySelector: () => ({ textContent: '' }) };
  nodes.push(el);
  return el;
};
document.body.append = () => {};
// Real enough to press a key against. GREET and CANVASS count on `KeyE` now,
// and a stub that swallowed the listener would let a broken key hook pass here
// while the format was unplayable in the game.
const keyHandlers = new Set();
globalThis.addEventListener = (type, fn) => { if(type === 'keydown') keyHandlers.add(fn); };
globalThis.removeEventListener = (type, fn) => { keyHandlers.delete(fn); };
const press = (code) => { for(const fn of [...keyHandlers]) fn({ code }); };

const { createWorldFormats } = await import('../world/worldFormats.js');

let failures = 0;
const ok = (cond, what) => {
  if(cond) console.log(`  ✓ ${what}`);
  else { failures++; console.log(`  ✗ ${what}`); }
};

/** A person the crowd would have built, with only what a run touches. */
function person(id, x, z){
  const body = new THREE.Group();
  body.userData.limbs = [];
  return { id, char: { id, name: id }, body,
    pos: new THREE.Vector3(x, 0, z), home: new THREE.Vector3(x, 0, z),
    target: new THREE.Vector3(x, 0, z), soft: { x, z, r: 0.4 },
    hit: new THREE.Object3D() };
}

/** A harness whose player can be put anywhere and whose frames are exact. */
function rig(people = [], blocked = null){
  const pos = new THREE.Vector3(0, 0, 0);
  const drawn = [];
  const w = createWorldFormats({
    scene: new THREE.Scene(),
    getPosition: () => pos,
    groundHeight: () => 0,
    spawn: { x: 0, z: 0 },
    player: { teleport(){} },
    people: () => people,
    pins: (list) => drawn.push(list),
    ...(blocked ? { blocked } : {}),
  });
  // Frames of a fixed length: a run measured in wall clock cannot be asserted
  // about, which is the trap `instrumentDrive` fell into with a frame budget.
  const step = (seconds, dt = 0.1) => {
    for(let t = 0; t < seconds - 1e-9; t += dt) w.update(dt);
  };
  const go = (x, z) => pos.set(x, 0, z);
  return { w, pos, go, step, drawn, people };
}

console.log('worldFormats — the world half of GREET, FOLLOW, HUNT, CANVASS, EVADE\n');

/* ------------------------------------------------------------------- GREET */
{
  const people = [person('a', 10, 0), person('b', -10, 0), person('c', 0, 40)];
  const r = rig(people);
  let out = null;
  r.w.greet({ roster: [{ id: 'a' }, { id: 'b' }, { id: 'c' }], target: 2, minutes: 30,
    radius: 3 }, (res) => { out = res; });
  r.go(10, 0); r.step(0.3);
  ok(out === null && true, 'GREET: standing next to somebody does not greet them');
  press('KeyE');
  ok(out === null, 'GREET: one greeting is not two — the run is still going');
  r.go(-10, 0); r.step(0.3);
  press('KeyE');
  ok(out && out.met.length === 2 && out.met.includes('a') && out.met.includes('b'),
    'GREET: the key greets whoever you are standing next to, and only them');
  ok(out && !out.met.includes('c') && out.out === false,
    'GREET: the target ends the run and the third person is never reached');

  // Nobody counts twice. Walking back to somebody already greeted must not
  // advance the round — the importer refuses a duplicate on the list, and this
  // is the other half of the same rule.
  const r3 = rig([person('a', 10, 0), person('b', -10, 0), person('c', 0, 40)]);
  let out3 = null;
  r3.w.greet({ roster: [{ id: 'a' }, { id: 'b' }, { id: 'c' }], target: 3, minutes: 3,
    radius: 3 }, (res) => { out3 = res; });
  r3.go(10, 0); r3.step(0.3); press('KeyE');
  r3.go(0, 0); r3.step(0.3); press('KeyE');
  r3.go(10, 0); r3.step(0.3); press('KeyE');
  r3.step(3);
  ok(out3 && out3.met.length === 1 && out3.out === true,
    'GREET: going back to somebody you already greeted does not count again');

  // The clock. A round nobody completes ends on the hour with what they got, and
  // the count is not silently rounded up to the target.
  const r2 = rig([person('a', 10, 0), person('b', -10, 0), person('c', 0, 40)]);
  let out2 = null;
  r2.w.greet({ roster: [{ id: 'a' }, { id: 'b' }, { id: 'c' }], target: 3, minutes: 2,
    radius: 3 }, (res) => { out2 = res; });
  r2.go(10, 0); r2.step(0.3); press('KeyE'); r2.step(2.5);
  ok(out2 && out2.out === true && out2.met.length === 1,
    'GREET: the hour ends the round, with what was actually done in it');
}

/* ------------------------------------------------------------------ FOLLOW */
{
  // The guide walks 20 m at 2 m/s. A player standing on top of them is INSIDE
  // the band by distance and outside it by the near edge, which is the whole
  // content of the format and the case that fails if `near` is ever dropped.
  const guide = person('g', 0, 0);
  const r = rig([guide]);
  let out = null;
  r.w.follow({ guide: 'g', path: [{ x: 0, z: 20 }], speed: 2, band: { near: 3, far: 14 },
    seconds: 30 }, (res) => { out = res; });
  // Walking with them, at their shoulder. This is the case the near edge exists
  // for, and the one that passes if `near` is ever dropped from the band: the
  // distance is small, which reads as "close to the guide" and is exactly what
  // puts you in front of them the moment they stop.
  for(let i = 0; i < 200 && !out; i++){
    r.go(guide.pos.x, guide.pos.z);
    r.w.update(0.1);
  }
  ok(out && out.crowded === true && out.arrived === false,
    'FOLLOW: getting inside the near edge ends the walk there and then');
  ok(out && out.total < 2,
    'FOLLOW: it ends AT the breach rather than being scored down for it');

  const guide2 = person('g', 0, 0);
  const r2 = rig([guide2]);
  let out2 = null;
  r2.w.follow({ guide: 'g', path: [{ x: 0, z: 20 }], speed: 2, band: { near: 3, far: 14 },
    seconds: 30 }, (res) => { out2 = res; });
  // Six metres behind, held there by moving with them: inside the band all the
  // way. The player starts six metres BACK — starting on top of the guide is
  // now a breach, which is the case above.
  const at = { t: 0 };
  r2.go(0, -6);
  for(let i = 0; i < 100; i++){
    at.t += 0.1;
    r2.go(0, Math.min(20, 2 * at.t) - 6);
    r2.w.update(0.1);
    if(out2) break;
  }
  ok(out2 && out2.inside / out2.total > 0.85,
    'FOLLOW: six metres behind a guide walking away is inside the band');
  ok(guide2.scripted === false,
    'FOLLOW: the guide is handed back to the crowd when the run ends');
}

/* -------------------------------------------------------------------- HUNT */
{
  const r = rig();
  let out = null;
  r.w.hunt({ item: { name: 'logger' }, at: [{ x: 5, z: 0 }, { x: -5, z: 0 }, { x: 0, z: 50 }],
    target: 2, minutes: 30, radius: 3 }, (res) => { out = res; });
  // A search is NOT drawn on the map — that was the first version and it made a
  // delivery round out of it. Nothing may reach the map from a hunt at all.
  ok(r.drawn.length === 0, 'HUNT: nothing about the search is put on the map');
  r.go(5, 0); r.step(0.3);
  r.go(5, 0); r.step(0.5);
  r.go(-5, 0); r.step(0.3);
  ok(out && out.got === 2 && out.out === false,
    'HUNT: the target ends the search, and walking over one twice counted it once');
}

/* ----------------------------------------------------------------- CANVASS */
{
  const people = [person('a', 5, 0), person('b', -5, 0), person('c', 0, 60)];
  const r = rig(people);
  let out = null;
  r.w.canvass({ population: [{ id: 'a', says: true }, { id: 'b', says: false },
    { id: 'c', says: true }], minutes: 2, radius: 3 }, (res) => { out = res; });
  r.go(5, 0); r.step(0.3);
  ok(out === null, 'CANVASS: walking past somebody does not sample them');
  press('KeyE');
  r.go(-5, 0); r.step(0.3); press('KeyE');
  r.step(2.5);
  ok(out && out.asked.length === 2, 'CANVASS: only the people you actually asked are in the sample');
  // Not "each person reports their lean" any more: a lean is how they answer
  // MOST of the time. What has to be true is that the sample varies and that it
  // leans the right way — the first version had every answer fixed, so two
  // people in one area always said the same thing and asking the second was
  // visibly pointless.
  {
    const many = [];
    for(let seed = 1; seed <= 40; seed++){
      const p2 = [person('a', 2, 0)];
      const r2 = rig(p2);
      let o = null;
      r2.w.canvass({ population: [{ id: 'a', says: true }], minutes: 2, radius: 3,
        skew: 0.75, seed }, (res) => { o = res; });
      r2.go(2, 0); r2.step(0.3); press('KeyE');
      many.push(o?.asked?.[0]?.said);
    }
    const yes = many.filter(Boolean).length;
    ok(yes > 0 && yes < 40, 'CANVASS: the same person does not give the same answer every run');
    ok(yes >= 22, 'CANVASS: the answers lean the way the person leans');
  }
  // The thing this format must not do. Whether the sample agrees with the
  // population is the question being asked, so the run may not know it.
  ok(out && !('truth' in out) && !('answer' in out) && !('enough' in out),
    'CANVASS: the run reports the sample and never what the sample is worth');
}

/* ------------------------------------------------------------------- EVADE */
{
  // The property the format is entirely about: the count runs while clear and
  // stops while caught. Ten seconds at arm's length must bank nothing.
  const chaser = person('p', 0, 0);
  const r = rig([chaser]);
  let out = null;
  r.w.evade({ pursuer: 'p', distance: 9, seconds: 5, speed: 3.4, limit: 30 },
    (res) => { out = res; });
  r.go(0, 0);
  r.step(10);
  ok(out === null || out.held < 1,
    'EVADE: standing next to the pursuer banks no clear time');
  if(!out){
    // Now get clear and hold it. The pursuer closes at 3.4 m/s, so staying clear
    // means moving; a player who stops is caught inside two seconds.
    let t = 0;
    for(let i = 0; i < 2000 && !out; i++){
      t += 0.05;
      r.go(0, 30 + t * 4.2);            // walking away at the player's own pace
      r.w.update(0.05);
    }
  }
  ok(out && out.held >= 5, 'EVADE: clear ground banks the seconds, and the drill ends at the count');
  ok(chaser.scripted === false, 'EVADE: the pursuer goes back to the crowd afterwards');

  // A leg standing where nothing can stand. `main.js` aimed FOLLOW's legs at each
  // area's `pos` — the middle of the building — so the guide fanned left and right
  // along the wall, moved every single frame, never came within the 0.3 m that
  // finishes a leg, and the whole run sat there. `moved <= 0` cannot see that: a
  // walker sliding along a wall is moving. The stall guard is what ends the leg.
  {
    const guide = person('g', 0, 0);
    // A solid disc around the first leg, so it can be approached and never reached.
    const wall = (x, z) => Math.hypot(x - 0, z - 20) < 4;
    const r4 = rig([guide], wall);
    let out4 = null;
    r4.w.follow({ guide: 'g', path: [{ x: 0, z: 20 }, { x: 0, z: 40 }],
      band: { near: 3, far: 14 }, speed: 2, seconds: 60 }, (res) => { out4 = res; });
    r4.go(0, -6);
    r4.step(45);
    ok(out4 && out4.arrived === true,
      'FOLLOW: a leg standing inside a building does not freeze the walk',
      out4 ? JSON.stringify({ arrived: out4.arrived, summary: out4.summary }) : 'never finished');
    ok(guide.pos.z > 30,
      'FOLLOW: and the guide gets past it to the leg beyond', `guide z=${guide.pos.z.toFixed(1)}`);
  }

  // The case that would otherwise invert silently. `main.js` passed EVADE a
  // `quarry` where the format reads `pursuer`, so `npcById` found nobody, the
  // run began and ended on its first frame, and the lap was marked done with no
  // HUD ever drawn — which from the plan card is indistinguishable from a
  // format that does not exist. A run with nobody in it must refuse to start,
  // and then `main.js`'s own `if(!started) onDone()` says so.
  {
    const r2 = rig([person('q', 0, 0)]);
    let fired = false;
    const startedEvade = r2.w.evade({ pursuer: 'nobody', seconds: 5 }, () => { fired = true; });
    ok(startedEvade === false && !fired,
      'EVADE: a pursuer the crowd has never heard of does not start a run');
    // A fresh rig, because `begin` also refuses while a run is already going —
    // and with the guard removed the EVADE above is still running, so this case
    // would pass for that reason instead of the one it is written for.
    const r3 = rig([person('q', 0, 0)]);
    // And the gap the run is about is set up rather than inherited. A quarry
    // standing two metres away when the run begins is a run already won — which is
    // what Blackout's day 15 was, because the crowd had wandered them next to the
    // spawn. Nothing is moved when the gap is already fair; the case below is the
    // unfair one.
    {
      const near = person('n', 0, 1.5);
      const r5 = rig([near]);
      let out5 = null;
      r5.w.tag({ quarry: 'n', reach: 2.5, speed: 2.8, seconds: 10 }, (res) => { out5 = res; });
      r5.step(0.1);
      ok(out5 === null && Math.hypot(near.pos.x, near.pos.z) >= 12,
        'TAG: a quarry standing on top of the player is stood back before the run starts',
        `gap=${Math.hypot(near.pos.x, near.pos.z).toFixed(1)} m, out=${JSON.stringify(out5)}`);
    }
    {
      const far = person('f', 0, 40);
      const r6 = rig([far]);
      let out6 = null;
      r6.w.evade({ pursuer: 'f', distance: 9, seconds: 5, limit: 30 }, (res) => { out6 = res; });
      r6.step(0.1);
      ok(out6 === null && Math.hypot(far.pos.x, far.pos.z) <= 9,
        'EVADE: a pursuer who starts clear is brought inside the ring, or the drill is free',
        `gap=${Math.hypot(far.pos.x, far.pos.z).toFixed(1)} m`);
    }
    let fired3 = false;
    const startedTag = r3.w.tag({ quarry: 'nobody', seconds: 5 }, () => { fired3 = true; });
    ok(startedTag === false && !fired3,
      'TAG: and neither does a quarry who is not there');
  }
}

/* --------------------------------------------------------------------- TAG */
{
  // The one property the format is entirely about, and the one the arithmetic
  // of the importer's trap rests on: somebody walking straight away is closed on
  // at the DIFFERENCE of two paces. A player chasing from directly behind at
  // 4.2 against a quarry at 2.8 gains 1.4 m/s and no more — so 20 m of head
  // start survives ten seconds of perfect pursuit.
  const quarry = person('q', 0, 20);
  const r = rig([quarry]);
  let out = null;
  r.w.tag({ quarry: 'q', reach: 2.5, speed: 2.8, seconds: 10 }, (res) => { out = res; });
  let py = 0;
  for(let i = 0; i < 200 && !out; i++){
    py += 4.2 * 0.05;                      // straight up the middle, full walking pace
    r.go(0, py);
    r.w.update(0.05);
  }
  ok(out && out.caught === false, 'TAG: a straight chase does not catch a quarry two thirds your speed');
  ok(out && out.closest > 2.5 && out.closest < 20,
    'TAG: the gap closes at the difference of the two paces, and the closest approach records it');

  // And the other half: cornered against the boundary, the same quarry is caught.
  const q2 = person('q', 0, 24);
  const r2 = rig([q2]);
  let out2 = null;
  r2.w.tag({ quarry: 'q', reach: 2.5, speed: 2.8, seconds: 60, bounds: 26 },
    (res) => { out2 = res; });
  let y2 = 0;
  for(let i = 0; i < 4000 && !out2; i++){
    y2 = Math.min(y2 + 4.2 * 0.05, 60);
    r2.go(0, y2);
    r2.w.update(0.05);
  }
  ok(out2 && out2.caught === true, 'TAG: with the fence behind them the same quarry is caught');
  ok(q2.scripted === false, 'TAG: the quarry goes back to the crowd afterwards');
}

/* ------------------------------------------------- the goal flag the lap reads */
{
  // The orientation lap has no panel behind it, so `ok` is the only thing that
  // can tell "they did it" from "they pressed Escape" — and app.js re-offers the
  // card on a false. A run that reported ok on an abandoned lap would be the
  // skip button coming back through the side door.
  const r = rig([person('a', 10, 0)]);
  let out = null;
  r.w.greet({ roster: [{ id: 'a' }, { id: 'b' }], target: 2, minutes: 5, radius: 3 },
    (res) => { out = res; });
  r.step(0.2);
  r.w.finish(true);
  ok(out && out.ok === false && out.abandoned === true,
    'a run given up reports ok:false, so the lap is not marked done');

  const r2 = rig([person('a', 2, 0)]);
  let out2 = null;
  r2.w.hunt({ item: { name: 'x' }, at: [{ x: 0, z: 0 }], target: 1, minutes: 5, radius: 3 },
    (res) => { out2 = res; });
  r2.go(0, 0); r2.step(0.3);
  ok(out2 && out2.ok === true, 'a run that reached its goal reports ok:true');
}

console.log(`\n${failures ? '✗' : '✓'} worldFormats: ${failures} failing case(s).`);
process.exit(failures ? 1 : 0);
