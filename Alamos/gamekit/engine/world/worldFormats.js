// worldFormats.js — the world half of the formats that are graded against the
// place rather than against a board.
//
// TRIAL was the first of these and lives in `trial.js`. Five more arrived
// together — GREET, FOLLOW, HUNT, CANVASS and EVADE — and they share far more
// than they differ: every one of them teleports the player to the spawn, hangs
// something in the scene, runs a clock, watches a distance, and tears the whole
// lot down however it ends. Five copies of that lifecycle is house rule 1
// arriving in a new directory, so the lifecycle is `createRun` below and each
// format is a `build` and a `tick`.
//
// ## Why this file imports no engine/core
//
// Nothing under `engine/world` has ever imported from `engine/core`, and HUNT
// wants to draw its items on the map, which is `engine/core/map.js`. It gets a
// `pins` callback from the caller instead. The same argument as `ctx.world`
// itself: the dependency runs one way, and a harness supplies nothing.
//
// ## What is in here and what is deliberately not
//
// In here: where things are, how far away the player is, how long it took. Not
// in here: whether any of that is right. `trial.js` states the reason and it
// holds for all five — nothing in this file knows the answer, which is the
// cheapest way to be sure nothing in it can leak the answer. The formats in
// `instruments.js` grade what these runs report.
//
// ## The clock is game minutes, and that is not a metaphor
//
// The day runs at one game minute per real second (`day.js`). So a run authored
// as `minutes: 60` — an hour of the working day — is sixty real seconds, and the
// HUD shows the hour. A format that runs while the day's countdown is frozen
// (all of these declare `pausesClock`) must not also be charged for the time it
// takes, which is the same argument that stopped the clock behind every panel.

import * as THREE from 'three';
import { addCaseBeacon } from './caseBeacon.js';
import { addTourMarker } from './tourMarker.js';
import { gaitAdvance, stepGait, idleSway } from '../people/rig.js';

/** Ground rings are drawn at this opacity, flat, and never write depth. */
const RING_OPACITY = 0.45;

/** How close the player has to be to count as arrived, unless a format says. */
const DEFAULT_REACH = 3.2;

/**
 * A flat ring on the ground: the pass-through zone as a place rather than a
 * guess. Same rig TRIAL uses, extracted because four formats now want one.
 */
function groundRing(colour, radius){
  const mesh = new THREE.Mesh(
    new THREE.RingGeometry(Math.max(0.2, radius - 0.5), radius, 48),
    new THREE.MeshBasicMaterial({ color: colour, transparent: true, opacity: RING_OPACITY,
      side: THREE.DoubleSide, depthWrite: false }));
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

function disposeGroup(scene, group){
  scene.remove(group);
  group.traverse(o => {
    o.geometry?.dispose?.();
    if(Array.isArray(o.material)) o.material.forEach(m => m.dispose?.());
    else o.material?.dispose?.();
  });
}

/** mm:ss, because a bare count of seconds does not read as an hour of a day. */
function clockText(left){
  const s = Math.max(0, Math.ceil(left));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/**
 * Floor-to-floor, where the world stacks floors on one footprint. 0 everywhere
 * else, which turns the whole vertical term below off.
 */
let FLOOR_RISE = 0;
/** Which floor a height is on. See the same helper in trial.js for why it rounds. */
const floorOf = (y) => (FLOOR_RISE > 0 ? Math.round((+y || 0) / FLOOR_RISE) : 0);

/**
 * How far apart two things are, for every one of the seven runs.
 *
 * Named `flat` because it was (x, z) and ignored height, which is right for a
 * slope, a vehicle and a stair — the cases it was written for. It is wrong for a
 * building whose floors are stacked on one footprint: every room in Changeover is
 * within seven metres of every other in (x, z), so GREET counted people three
 * floors down as greeted, HUNT's six items were all inside one corridor, and
 * EVADE could not be lost.
 *
 * So a floor apart is a distance, and a large one — eighty metres, the walk a
 * lift ride is worth (`MINUTES_PER_FLOOR` in engine/core/lift.js). Large enough
 * that no run's reach can span it, and finite so the runs that *steer* by this
 * number rather than threshold it still behave.
 */
const flat = (a, b) => {
  const d = Math.hypot(a.x - b.x, (a.z ?? 0) - (b.z ?? 0));
  if(FLOOR_RISE <= 0) return d;
  const floors = Math.abs(floorOf(a.y) - floorOf(b.y));
  return floors ? d + floors * 80 : d;
};

/**
 * A small seeded generator, for the one format that needs to roll dice.
 *
 * Seeded rather than bare `Math.random` for two reasons: a selftest cannot
 * assert anything about a distribution it cannot reproduce, and a run that is
 * re-taken after a wrong call should be a fresh sample rather than the same
 * fourteen answers again — so the seed changes per run and is fixable from the
 * outside.
 */
function rng(seed){
  let a = (seed >>> 0) || 1;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The controller. One per game, idle until a format starts a run.
 *
 *   scene, getPosition, groundHeight, spawn, player, onLeaveRoom
 *                as `createTrial` — see trial.js for why the run starts at the
 *                spawn rather than where the player is standing.
 *   people()     the live crowd, or [] — GREET, CANVASS, FOLLOW and EVADE are
 *                all about somebody, and the crowd is where somebody lives.
 *   pins(list)   optional: hand the map a list of {x, z, label} to draw, or null
 *                to clear it. HUNT is the only caller.
 *   bounds       how far from the origin the player may walk, for EVADE's trap
 *                on being cornered. Advisory here; the importer enforces it.
 */
/** The margin a walker keeps off a collider, the crowd's own. */
const WALK_PAD = 0.55;

export function createWorldFormats({ scene, getPosition, groundHeight, spawn, player,
  onLeaveRoom, people = () => [], pins = null, bounds = Infinity, blocked = null,
  camera = null, floorRise = 0, panelOpen = null }){
  let run = null;
  FLOOR_RISE = +floorRise || 0;

  const npcById = (id) => people().find(n => String(n.char?.id ?? n.id) === String(id)) ?? null;

  /**
   * Drive somebody the crowd owns.
   *
   * The guide in a FOLLOW and the pursuer in an EVADE are people who are already
   * standing in the world with a body, a nameplate, a collider and a walk. Adding
   * a second figure would mean a second look drawn from the world's own seeded
   * generator, which moves every later draw — the trap `room.js` already
   * documents. So the run takes the person over: `scripted` is a flag
   * `crowd.js` honours by leaving them alone, and this moves everything that
   * travels with them.
   */
  function takeOver(npc){
    if(!npc) return null;
    npc.scripted = true;
    npc.gaitPhase = npc.gaitPhase ?? 0;
    return npc;
  }
  /**
   * Stand somebody a chosen distance from a point, on ground they can be on.
   *
   * TAG and EVADE are both about a gap, and neither of them set one up: the
   * scripted person began wherever the crowd had wandered to. On Blackout's day 15
   * the quarry happened to be standing two metres from the spawn, so the run was
   * won on its first frame — a HUD that never appeared and a lap marked done,
   * which is the same failure as passing the wrong spec key, arriving through the
   * geometry instead of the wiring. A run whose result is decided before the
   * player moves is not a run.
   *
   * Bearings are tried in turn rather than at random, so a run reproduces.
   */
  function stand(npc, from, metres, exact = 0){
    if(!npc) return null;
    // Only when the gap is unfair. Somebody already standing a good way off is
    // left where they are — teleporting a person the player can see is worse than
    // the problem, and a run that starts by moving the world reads as a glitch.
    const now = Math.hypot(npc.pos.x - from.x, npc.pos.z - from.z);
    if(metres > 0 && now >= metres) return npc;
    const want = exact > 0 ? exact : metres;
    for(let i = 0; i < 24; i++){
      const a = (i / 24) * Math.PI * 2;
      const x = from.x + Math.sin(a) * want;
      const z = from.z + Math.cos(a) * want;
      if(blocked && blocked(x, z, WALK_PAD)) continue;
      const y = groundHeight(x, z);
      npc.pos.set(x, y, z);
      npc.body.position.set(x, y, z);
      if(npc.hit) npc.hit.position.set(x, y + 0.95, z);
      if(npc.soft){ npc.soft.x = x; npc.soft.z = z; }
      return npc;
    }
    return npc;                      // boxed in everywhere: leave them be
  }
  function release(npc){
    if(!npc) return;
    npc.scripted = false;
    // Where they now stand is where they now live. Leaving `home` at the far end
    // of a follow route sends them walking back across the site all game.
    npc.home?.set?.(npc.pos.x, npc.pos.y, npc.pos.z);
    npc.target?.copy?.(npc.pos);
  }
  /** One scripted step, with the gait driven by the distance actually covered. */
  function driveTo(npc, x, z, speed, dt){
    const dx = x - npc.pos.x, dz = z - npc.pos.z;
    const d = Math.hypot(dx, dz);
    if(d < 1e-4){
      idleSway(npc.body, 0);
      return 0;
    }
    const travel = Math.min(d, speed * dt);
    let ux = dx / d, uz = dz / d;
    // Walk round what is in the way rather than through it. The crowd's own
    // walk refuses a blocked step and gives up for a second, which is right for
    // somebody wandering and wrong for somebody a run is driving: a guide who
    // stops at the first parked car never finishes the route. So the straight
    // line is tried first and then a fan either side of it, which is enough to
    // round a building corner and cannot walk into one.
    if(blocked){
      const clear = (a) => !blocked(npc.pos.x + Math.sin(a) * (travel + WALK_PAD),
        npc.pos.z + Math.cos(a) * (travel + WALK_PAD), WALK_PAD);
      const head = Math.atan2(ux, uz);
      let found = clear(head) ? head : null;
      for(let step = 1; found === null && step <= 6; step++){
        const off = step * Math.PI / 8;
        if(clear(head + off)) found = head + off;
        else if(clear(head - off)) found = head - off;
      }
      // Boxed in on every bearing: stand still rather than walk into the wall.
      if(found === null){ idleSway(npc.body, 0); return 0; }
      ux = Math.sin(found); uz = Math.cos(found);
    }
    const nx = npc.pos.x + ux * travel;
    const nz = npc.pos.z + uz * travel;
    const y = groundHeight(nx, nz);
    npc.pos.set(nx, y, nz);
    npc.body.position.set(nx, y, nz);
    // The rig faces +Z at yaw zero — `FACE` in rig.js puts the eyes and the nose
    // at positive z — so the yaw that faces a direction is atan2(dx, dz) and
    // nothing else. The `+ PI` this used to carry was copied from the crowd's
    // *placement* convention, where a person is turned to face back toward the
    // station they belong to, and it made every guide, pursuer and quarry walk
    // the whole run backwards.
    npc.body.rotation.y = Math.atan2(ux, uz);
    if(npc.hit) npc.hit.position.set(nx, y + 0.95, nz);
    if(npc.soft){ npc.soft.x = nx; npc.soft.z = nz; }
    npc.gaitPhase = gaitAdvance(speed, dt) + (npc.gaitPhase ?? 0);
    stepGait(npc.body, npc.gaitPhase, speed);
    return travel;
  }

  function hudEl(){
    const el = document.createElement('div');
    el.id = 'worldHUD';
    el.innerHTML = '<div class="worldClock"></div><div class="worldTally"></div>'
      + '<div class="worldNote">Esc — give the run up</div>';
    document.body.append(el);
    return el;
  }

  /**
   * Start a run. `cfg` is the whole of what a format has to say:
   *
   *   limit     seconds of wall clock; the run ends when it expires
   *   build(g)  hang whatever the format needs on the group `g`; return state
   *   tick(s,c) one frame. Return a result object to end the run, or nothing.
   *   hud(s,c)  two strings: the clock line and the tally line
   *   timeout(s) the result when the clock runs out
   *
   * `c` is `{ dt, pos, seconds, left }`. Nothing in a cfg is allowed to know
   * whether what the player did was right.
   */
  function begin(cfg, onDone){
    if(run) return false;
    onLeaveRoom?.();
    player?.teleport?.(spawn, spawn?.yaw ?? 0);
    const group = new THREE.Group();
    group.name = 'worldFormat';
    scene.add(group);
    run = { cfg, group, seconds: 0, el: hudEl(), done: onDone, onKey: null, state: null };
    run.state = cfg.build(group) ?? {};
    run.onKey = (e) => {
      // Escape gives the run up, unless a panel is open over it — the lift, in a
      // stacked building. See the same guard in trial.js.
      if(e.code === 'Escape'){
        if(!panelOpen?.()) api.finish(true);
        return;
      }
      // The format's own key, if it wants one. The world's `activate` is off for
      // the duration of a run (`runActive()` in main.js), so `KeyE` is free here
      // — and the touch layer fires the same synthetic KeyE, so a thumb works
      // without any of this knowing that touch exists.
      const r = cfg.key?.(run.state, e.code, getPosition());
      if(r) api.finish(false, r);
    };
    window.addEventListener('keydown', run.onKey);
    return true;
  }

  const api = {
    get active(){ return !!run; },

    /** Per frame, in real seconds. Returns immediately when idle. */
    update(dt){
      if(!run) return;
      const { cfg, state } = run;
      run.seconds += dt;
      const left = cfg.limit - run.seconds;
      const pos = getPosition();
      const ctx = { dt, pos, seconds: run.seconds, left };
      const result = cfg.tick(state, ctx);
      const [clock, tally] = cfg.hud(state, ctx);
      const c = run.el.querySelector('.worldClock');
      const t = run.el.querySelector('.worldTally');
      if(c) c.textContent = clock;
      if(t) t.textContent = tally;
      if(result) api.finish(false, result);
      else if(left <= 0) api.finish(false, cfg.timeout(state, ctx));
    },

    /** End the run, either way it ends. Safe to call twice. */
    finish(abandoned, result = null){
      if(!run) return;
      const { cfg, group, el, done, state, seconds, onKey } = run;
      run = null;                          // before the callback: it may start another
      window.removeEventListener('keydown', onKey);
      cfg.teardown?.(state);
      pins?.(null);
      disposeGroup(scene, group);
      el.remove();
      done?.({ ...(result ?? cfg.abandon?.(state) ?? {}), seconds, abandoned: !!abandoned });
    },

    /* ------------------------------------------------------------- GREET */
    /**
     * Say hello to `target` of the people on the list before the hour is out.
     *
     * A greeting is proximity, not a key press. The panel is suspended during a
     * run, so `E` is still the world's own activate — walking up to somebody and
     * pressing it would open their passage, which is a different feature with a
     * dollar attached. Getting within arm's length of somebody and being counted
     * as having said hello is also simply what the format is.
     */
    greet(spec, done){
      const want = new Map((spec.roster ?? []).map(p => [String(p.id), p]));
      const reach = +spec.radius || DEFAULT_REACH;
      return begin({
        // One game minute is one real second, so an hour of the working day is
        // sixty seconds of run. See the header.
        limit: +spec.minutes || 60,
        build(group){
          const rings = new Map();
          const marks = new Map();
          for(const [id, p] of want){
            const r = groundRing(0x63c68a, reach);
            group.add(r);
            rings.set(id, r);
            // A round is a tour of who works here, so the marker names them from
            // across the site rather than waiting for the nameplate to fade in
            // at nine metres.
            marks.set(id, addTourMarker(group, { text: p.name ?? String(id),
              sub: p.where ?? '', colour: 0x63c68a }));
          }
          // The map shows exactly who is left, where they are standing now.
          pins?.(() => [...want.values()]
            .filter(p => !state.met.includes(String(p.id)))
            .map(p => npcById(p.id))
            .filter(Boolean)
            .map(n => ({ x: n.pos.x, z: n.pos.z, name: n.char?.name ?? '', colour: '#63c68a' })));
          const state = { rings, marks, met: [], reach };
          return state;
        },
        tick(s, { dt, pos }){
          // Proximity OFFERS; the key is what counts. Saying hello is a thing you
          // do, not a thing that happens because you walked past — and a round
          // that ticks people off as you cross the yard is one you win by
          // accident.
          s.near = null;
          let best = Infinity;
          for(const [id, r] of s.rings){
            const npc = npcById(id);
            const mark = s.marks.get(id);
            if(!npc){ r.visible = false; if(mark) mark.visible = false; continue; }
            const y = groundHeight(npc.pos.x, npc.pos.z);
            r.position.set(npc.pos.x, y + 0.05, npc.pos.z);
            const done = s.met.includes(id);
            if(mark){
              mark.visible = !done;
              mark.at(npc.pos.x, y, npc.pos.z);
              mark.update(dt, camera);
            }
            if(done){ r.visible = false; continue; }
            const d = flat(pos, npc.pos);
            if(d <= s.reach && d < best){ best = d; s.near = { id, npc }; }
          }
          return null;
        },
        key(s, code, pos){
          if(code !== 'KeyE' || !s.near) return null;
          const { id, npc } = s.near;
          if(s.met.includes(id) || flat(pos, npc.pos) > s.reach) return null;
          s.met.push(id);
          s.rings.get(id).visible = false;
          const mark = s.marks.get(id);
          if(mark) mark.visible = false;
          s.near = null;
          return s.met.length >= (+spec.target || want.size)
            ? { met: s.met.slice(), out: false, ok: true,
              summary: `${s.met.length} of ${+spec.target || want.size} said hello to` } : null;
        },
        hud(s, { left }){
          return [clockText(left),
            s.near ? `E — say hello to ${s.near.npc.char?.name ?? 'them'}`
              : `${s.met.length} of ${+spec.target || want.size} said hello to`];
        },
        timeout: (s) => ({ met: s.met.slice(), out: true, ok: false,
          summary: `${s.met.length} of ${+spec.target || want.size} said hello to before the hour went` }),
        abandon: (s) => ({ met: s.met.slice(), out: false, ok: false,
          summary: `you broke off after ${s.met.length}` }),
      }, done);
    },

    /* ------------------------------------------------------------ FOLLOW */
    /**
     * Stay inside a band behind somebody who is walking a route.
     *
     * The band is the goal and is printed. What is not printed is the fraction
     * of the run that has to be inside it, which is grading slack on a value the
     * player is producing — instrument rule 2, the same line HOLD draws.
     *
     * Too close is a failure as well as too far, and that is the whole content:
     * the guide stops, and a player who is treating this as a footrace walks
     * past them.
     */
    follow(spec, done){
      const near = +spec.band?.near || 3;
      const far = +spec.band?.far || 14;
      const speed = +spec.speed || 1.5;
      const path = spec.path ?? [];
      return begin({
        limit: +spec.seconds || 60,
        build(group){
          const guide = takeOver(npcById(spec.guide));
          const ring = groundRing(0xe0a33c, near);
          group.add(ring);
          pins?.(() => guide ? [{ x: guide.pos.x, z: guide.pos.z,
            name: guide.char?.name ?? '', colour: '#e0a33c' }] : []);
          return { guide, ring, leg: 0, wait: 0, inside: 0, total: 0, arrived: false,
            best: Infinity, stall: 0 };
        },
        tick(s, { dt, pos }){
          if(!s.guide) return { inside: 0, total: 1, arrived: false };
          const leg = path[s.leg];
          if(leg){
            if(s.wait > 0) s.wait -= dt;
            else{
              const moved = driveTo(s.guide, +leg.x, +leg.z, speed, dt);
              const gap = flat(s.guide.pos, { x: +leg.x, z: +leg.z });
              // A guide who is moving and getting no closer is stuck, and the
              // old test could not see it: `moved <= 0` only catches somebody
              // boxed in on every bearing, while a walker fanning left and right
              // along a wall moves every frame and never arrives. That is what a
              // leg aimed at the middle of a building looks like from here, and
              // it froze the whole run rather than one leg of it. Three seconds
              // with no closest approach beaten takes the leg as walked.
              if(gap < s.best - 0.05){ s.best = gap; s.stall = 0; }
              else s.stall += dt;
              if(moved <= 0 || gap < 0.3 || s.stall > 3){
                s.wait = +leg.pause || 0;
                s.leg++;
                s.best = Infinity;
                s.stall = 0;
              }
            }
          } else s.arrived = true;
          const y = groundHeight(s.guide.pos.x, s.guide.pos.z);
          s.ring.position.set(s.guide.pos.x, y + 0.05, s.guide.pos.z);
          const d = flat(pos, s.guide.pos);
          s.total += dt;
          if(d >= near && d <= far) s.inside += dt;
          s.gap = d;
          // Too close ENDS it. Being in front of somebody the moment they stop
          // is not a worse follow, it is a failed one — they cannot show you
          // what they walked out here to show you. Dropping behind is graded on
          // the fraction, because the far edge is recoverable and this is not.
          if(d < near) return { inside: s.inside, total: s.total, arrived: false, crowded: true,
            ok: false, summary: 'you walked into the back of them' };
          return s.arrived ? { inside: s.inside, total: s.total, arrived: true, ok: true,
            summary: 'you stayed with them to the end of the walk' } : null;
        },
        hud(s, { left }){
          const d = s.gap ?? 0;
          const where = d < near ? 'TOO CLOSE' : d > far ? 'dropping back' : 'with them';
          return [clockText(left), `${d.toFixed(0)} m — ${where}`];
        },
        timeout: (s) => ({ inside: s.inside, total: s.total, arrived: false, ok: false,
          summary: 'the walk ran out of time' }),
        abandon: (s) => ({ inside: s.inside, total: s.total || 1, arrived: false, ok: false,
          summary: 'you gave the walk up' }),
        teardown: (s) => release(s.guide),
      }, done);
    },

    /* -------------------------------------------------------------- HUNT */
    /**
     * Find `target` of a thing that is actually lying about the site.
     *
     * **Not on the map, and not marked.** The first version put every item on the
     * map behind a beacon, on the argument that the decision worth having is
     * which of the ones you can see is worth the walk. Played, that is a delivery
     * round rather than a search: you read the map, you walk the route, and you
     * never once look at the place. So the items are real objects on the ground
     * now — a crate you have to be near to see, in the lee of a building or off
     * the edge of a path — there are more of them than anybody has to find, and
     * the map says nothing at all.
     *
     * What that makes the format about is sweeping ground in some order and
     * knowing when to stop, which is the honest version of the same lesson.
     *
     * They exist only while the run does. Nothing is added to the world's
     * colliders, deliberately: an object you can walk into is an object that can
     * wedge somebody against a wall, and this one is picked up by walking over
     * it anyway.
     */
    hunt(spec, done){
      const reach = +spec.radius || DEFAULT_REACH;
      const at = spec.at ?? [];
      const label = spec.item?.name ?? 'item';
      return begin({
        limit: (+spec.minutes || 45),
        build(group){
          const colour = Number.isFinite(+spec.item?.colour) ? +spec.item.colour : 0xd8b23c;
          const mat = new THREE.MeshStandardMaterial({ color: colour, roughness: 0.62,
            metalness: 0.08, emissive: new THREE.Color(colour).multiplyScalar(0.16) });
          const marks = at.map((p, i) => {
            const holder = new THREE.Group();
            // The point's own height where the world has floors, and the ground
            // otherwise. `groundHeight` answers for the floor the player is
            // standing on, so on a stacked plan every crate in the building would
            // be built on that floor — and the mark carried no height at all, so
            // all six read as being on whichever floor you were on.
            const y = (FLOOR_RISE > 0 && Number.isFinite(+p.y))
              ? +p.y : groundHeight(+p.x, +p.z);
            // A crate, and a lid a shade proud of it. Small — 40 cm — because
            // something you can see across a yard is not hidden, and lit a
            // little by its own emissive so it is not a black shape in shade.
            const box = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.32), mat);
            box.position.set(+p.x, y + 0.15, +p.z);
            box.rotation.y = (i * 1.7) % Math.PI;      // not a row of identical crates
            box.castShadow = true;
            box.userData.ignoreAudit = true;
            const lid = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, 0.36), mat);
            lid.position.set(+p.x, y + 0.32, +p.z);
            lid.rotation.y = box.rotation.y;
            lid.userData.ignoreAudit = true;
            holder.add(box, lid);
            group.add(holder);
            return { i, x: +p.x, z: +p.z, y, holder, taken: false };
          });
          // No pins. The map is for the day's own calls, and a search that is
          // drawn on it is not a search.
          return { marks, got: 0 };
        },
        tick(s, { pos }){
          for(const m of s.marks){
            if(m.taken) continue;
            if(flat(pos, m) <= reach){
              // Once each. The crate goes and the mark stays taken, so walking
              // back over the same spot cannot count a second time.
              m.taken = true;
              m.holder.visible = false;
              s.got++;
            }
          }
          return s.got >= (+spec.target || at.length)
            ? { got: s.got, out: false, ok: true,
              summary: `${s.got} of ${+spec.target || at.length} found` } : null;
        },
        hud(s, { left }){
          // "0 of 6 marker" reads as a broken template rather than as a count,
          // and a book may author the plural where English will not guess it.
          const n = +spec.target || at.length;
          const many = spec.item?.plural ?? (/s$/.test(label) ? label : `${label}s`);
          return [clockText(left), `${s.got} of ${n} ${n === 1 ? label : many}`];
        },
        timeout: (s) => ({ got: s.got, out: true, ok: false,
          summary: `${s.got} of ${+spec.target || at.length} before the time went` }),
        abandon: (s) => ({ got: s.got, out: false, ok: false,
          summary: `you came back with ${s.got}` }),
      }, done);
    },

    /* ----------------------------------------------------------- CANVASS */
    /**
     * Ask people a yes-or-no question and find out what the site thinks.
     *
     * Every person carries an authored answer, and the population's majority is
     * the truth. What this file reports is who was asked and what each of them
     * said — never the tally against the truth, and never whether the sample is
     * big enough, because "how many is enough" is the question the format is
     * asking.
     */
    canvass(spec, done){
      const reach = +spec.radius || DEFAULT_REACH;
      const pop = spec.population ?? [];
      const leans = new Map(pop.map(p => [String(p.id), !!p.says]));
      // Nobody's answer is a fact about them; it is what they happen to say when
      // you ask. `skew` is how strongly somebody answers along their own lean —
      // 0.75 means three times in four — so two people in the same area can
      // disagree, one run's sample is not the next one's, and a small sample can
      // be wrong in a way that no amount of care by the player prevents. That is
      // the whole subject of the format, and the first version had none of it:
      // every person was a fixed yes or no, so the answers within an area were
      // identical and asking a second one there was visibly pointless.
      const skew = Number.isFinite(+spec.skew) ? +spec.skew : 0.75;
      const roll = rng(+spec.seed || ((Date.now() ^ (pop.length * 2654435761)) >>> 0));
      return begin({
        limit: (+spec.minutes || 60),
        build(group){
          const rings = new Map();
          for(const p of pop){
            const r = groundRing(0x7aa7d8, reach);
            group.add(r);
            rings.set(String(p.id), r);
          }
          const state = { rings, asked: [], yes: 0 };
          pins?.(() => pop
            .filter(p => !state.asked.some(a => a.id === String(p.id)))
            .map(p => npcById(p.id))
            .filter(Boolean)
            .map(n => ({ x: n.pos.x, z: n.pos.z, name: n.char?.name ?? '', colour: '#7aa7d8' })));
          return state;
        },
        tick(s, { pos }){
          // Same rule as GREET: you ask somebody, they do not answer a question
          // you never put to them. Walking past a pocket must not sample it.
          s.near = null;
          let best = Infinity;
          for(const [id, r] of s.rings){
            const npc = npcById(id);
            if(!npc){ r.visible = false; continue; }
            const y = groundHeight(npc.pos.x, npc.pos.z);
            r.position.set(npc.pos.x, y + 0.05, npc.pos.z);
            if(s.asked.some(a => a.id === id)){ r.visible = false; continue; }
            const d = flat(pos, npc.pos);
            if(d <= reach && d < best){ best = d; s.near = { id, npc }; }
          }
          return null;
        },
        key(s, code, pos){
          if(code !== 'KeyE' || !s.near) return null;
          const { id, npc } = s.near;
          if(s.asked.some(a => a.id === id) || flat(pos, npc.pos) > reach) return null;
          // The draw: along their lean with probability `skew`, against it
          // otherwise.
          const lean = !!leans.get(id);
          const said = roll() < skew ? lean : !lean;
          s.asked.push({ id, said, name: npc.char?.name ?? id });
          if(said) s.yes++;
          s.rings.get(id).visible = false;
          s.near = null;
          return s.asked.length >= pop.length
            ? { asked: s.asked.slice(), out: false, ok: true,
              summary: `you asked all ${pop.length} of them` } : null;
        },
        hud(s, { left }){
          // The split so far, which is what they are collecting. Not the
          // population's, and no verdict on whether it is enough.
          return [clockText(left),
            s.near ? `E — ask ${s.near.npc.char?.name ?? 'them'}`
              : `${s.asked.length} asked — ${s.yes} yes, ${s.asked.length - s.yes} no`];
        },
        timeout: (s) => ({ asked: s.asked.slice(), out: true, ok: false,
          summary: `you asked ${s.asked.length} of ${pop.length}` }),
        abandon: (s) => ({ asked: s.asked.slice(), out: false, ok: false,
          summary: `you asked ${s.asked.length} of ${pop.length}` }),
      }, done);
    },

    /* --------------------------------------------------------------- TAG */
    /**
     * Catch somebody who is walking away from you.
     *
     * EVADE with the distance test the other way round, and the same argument
     * keeps it behind instrument rule 3: the quarry is slower than the player,
     * so a chase is never lost on reflexes. What it is lost on is the line —
     * walking straight at somebody who is walking straight away closes the gap
     * at the difference of two paces, and the importer refuses a run long enough
     * for that to work. What catches them is the fence, or a building, or the
     * corner they have to turn.
     *
     * They flee from the player and nothing else. A quarry who dodged would be
     * a quarry whose behaviour the player has to read at speed, which is the
     * line these formats do not cross.
     */
    tag(spec, done){
      if(!npcById(spec.quarry)) return false;
      const reach = +spec.reach || 2.5;
      const start = +spec.start || Math.max(12, reach * 5);
      const speed = +spec.speed || 2.8;
      const bound = Math.max(20, (+spec.bounds || bounds) - 2);
      return begin({
        limit: +spec.seconds || 30,
        build(group){
          const quarry = stand(takeOver(npcById(spec.quarry)), getPosition(), start);
          const r = groundRing(0xe0a33c, reach);
          group.add(r);
          pins?.(() => quarry ? [{ x: quarry.pos.x, z: quarry.pos.z,
            name: quarry.char?.name ?? '', colour: '#e0a33c' }] : []);
          return { quarry, ring: r, closest: Infinity };
        },
        tick(s, { dt, pos }){
          if(!s.quarry) return { caught: false, closest: 0 };
          // Straight away from the player — and along the fence rather than into
          // it, because a quarry that pins itself in the first three seconds is
          // a format with nothing in it. This is what makes the boundary the
          // thing that catches them rather than the thing that ends the run.
          let dx = s.quarry.pos.x - pos.x, dz = s.quarry.pos.z - pos.z;
          const d = Math.hypot(dx, dz) || 1;
          dx /= d; dz /= d;
          const ahead = { x: s.quarry.pos.x + dx * speed * dt, z: s.quarry.pos.z + dz * speed * dt };
          if(Math.hypot(ahead.x, ahead.z) > bound){
            // Two tangents; take the one that keeps them further from the player.
            const a = { x: -dz, z: dx }, b = { x: dz, z: -dx };
            const score = (t) => Math.hypot(s.quarry.pos.x + t.x * speed * dt - pos.x,
              s.quarry.pos.z + t.z * speed * dt - pos.z);
            const t = score(a) > score(b) ? a : b;
            dx = t.x; dz = t.z;
          }
          driveTo(s.quarry, s.quarry.pos.x + dx * speed, s.quarry.pos.z + dz * speed, speed, dt);
          const y = groundHeight(s.quarry.pos.x, s.quarry.pos.z);
          s.ring.position.set(s.quarry.pos.x, y + 0.05, s.quarry.pos.z);
          const gap = flat(pos, s.quarry.pos);
          s.gap = gap;
          if(gap < s.closest) s.closest = gap;
          return gap <= reach ? { caught: true, closest: s.closest, ok: true,
            summary: 'you caught them' } : null;
        },
        hud(s, { left }){
          return [clockText(left), `${(s.gap ?? 0).toFixed(0)} m away`
            + (Number.isFinite(s.closest) ? ` — closest ${s.closest.toFixed(0)} m` : '')];
        },
        timeout: (s) => ({ caught: false, closest: Number.isFinite(s.closest) ? s.closest : 0,
          ok: false, summary: `closest you came was ${(s.closest ?? 0).toFixed(0)} m` }),
        abandon: (s) => ({ caught: false, closest: Number.isFinite(s.closest) ? s.closest : 0,
          ok: false, summary: 'you called it off' }),
        teardown: (s) => release(s.quarry),
      }, done);
    },

    /* ------------------------------------------------------------- EVADE */
    /**
     * Keep a clear distance for a stated stretch of time.
     *
     * The clock only runs while you are clear, so being caught costs the seconds
     * it takes to get away again rather than ending the run. That is the
     * difference between a format about using the ground and a format about
     * reaction time, which is instrument rule 3 and the line these are not
     * allowed to cross. The pursuer walks at an authored speed the importer
     * refuses to let exceed the player's own, so nobody is ever outrun — what
     * catches a player is being cornered, and the answer is the buildings.
     */
    evade(spec, done){
      // Nobody to run from is not a run. It used to start anyway and finish on
      // the first frame with `held: 0`, which is indistinguishable from a format
      // that never mounted — and that is exactly how the wrong spec key in
      // main.js survived every selftest in this file.
      if(!npcById(spec.pursuer)) return false;
      const clear = +spec.distance || 9;
      const need = +spec.seconds || 30;
      const speed = +spec.speed || 3.4;
      return begin({
        limit: +spec.limit || Math.max(need * 2, need + 30),
        build(group){
          // Inside the ring on purpose. A pursuer who starts beyond the clear
          // radius banks the whole drill while the player stands still, which is
          // the same "already finished" bug as TAG's from the other end.
          const chaser = (() => {
            const c = takeOver(npcById(spec.pursuer));
            if(!c) return null;
            const gap = flat(getPosition(), c.pos);
            // Pull them in only if the drill would already be won standing still.
            return gap > clear * 0.8 ? stand(c, getPosition(), 0, Math.max(2, clear * 0.35)) : c;
          })();
          const r = groundRing(0xc0392b, clear);
          group.add(r);
          pins?.(() => chaser ? [{ x: chaser.pos.x, z: chaser.pos.z,
            name: chaser.char?.name ?? '', colour: '#c0392b' }] : []);
          return { chaser, ring: r, held: 0, caught: 0 };
        },
        tick(s, { dt, pos }){
          if(!s.chaser) return { held: 0, need, caught: 0 };
          driveTo(s.chaser, pos.x, pos.z, speed, dt);
          const y = groundHeight(s.chaser.pos.x, s.chaser.pos.z);
          s.ring.position.set(s.chaser.pos.x, y + 0.05, s.chaser.pos.z);
          const d = flat(pos, s.chaser.pos);
          s.gap = d;
          if(d >= clear) s.held += dt;
          else s.caught += dt;
          return s.held >= need ? { held: s.held, need, caught: s.caught, ok: true,
            summary: `${need} seconds of clear ground` } : null;
        },
        hud(s, { left }){
          const d = s.gap ?? 0;
          return [clockText(left),
            `${Math.floor(s.held)} of ${need} s clear — ${d.toFixed(0)} m away`];
        },
        timeout: (s) => ({ held: s.held, need, caught: s.caught, ok: false,
          summary: `${Math.floor(s.held)} of ${need} seconds clear` }),
        abandon: (s) => ({ held: s.held, need, caught: s.caught, ok: false,
          summary: `${Math.floor(s.held)} of ${need} seconds clear` }),
        teardown: (s) => release(s.chaser),
      }, done);
    },
  };
  return api;
}
