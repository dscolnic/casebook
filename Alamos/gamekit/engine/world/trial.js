// trial.js — the world half of the TRIAL format.
//
// TRIAL is the one format whose panel is not a panel. Every other entry in
// `INSTRUMENTS` renders a board, grades what the player did to it, and never
// touches the world; this one hands the player back to the place they are
// standing in, puts gates on it, and grades the order they take them in.
//
// It lives here rather than in `instruments.js` for a reason that is not
// aesthetic: `instruments.js` is imported by `engine/dev/instrumentGoals.mjs` in
// Node, where there is no DOM and no WebGL, and it is imported by
// `engine/dev/instruments.html`, which has no scene. A three.js import in that
// file would break both. So the format asks for a world through `ctx.world` and
// gets `null` in every harness, which is exactly what makes it inspectable
// alongside the other twenty.
//
// ## The run always starts at the spawn
//
// Not where the player happens to be standing. Two reasons, and the second is
// the load-bearing one:
//
//   · The stop is opened inside a building, and a theme's interiors are built
//     in a district four kilometres along +x. Suspending the panel there would
//     leave the player in a room with the gates over the horizon.
//   · The importer refuses a gate order that matches the nearest-neighbour route
//     **from the spawn** — that is what stops the fastest line being the correct
//     line by geometry. The check is only true of a run that begins there.
//
// ## Nothing on a gate says which one is next
//
// Instrument rule 1: nothing marks the answer. Every gate looks the same, they
// are all lit at once, and passing through one hides it. A player who wants to
// know the order has to know the science, which is the whole point — the clock
// is the pressure and the order is the grade.
//
// ## The clock runs down, not up
//
// It counted up for its whole life, which measures a lap and puts no pressure on
// it: a stopwatch with no number to beat is a readout, and the player reads it
// once and ignores it. The limit is the route the gates actually make — the
// nearest-neighbour walk from the spawn at walking pace, with half again on top —
// so a spread-out site gets more time and a tight one gets less, and nothing is
// authored. Same argument as `budgetForRoute`: move a building and the limit
// follows it. A caller may pass `limit` in seconds to override.

import * as THREE from 'three';
import { addCaseBeacon } from './caseBeacon.js';

/** How close counts as through the gate, in metres. */
const GATE_RADIUS = 7;
/**
 * Which floor a height is on, when the world has floors.
 *
 * Rounded rather than compared with a tolerance, because the two heights being
 * compared are not the same kind of thing: a gate sits on the slab and the
 * player's position is their eye, about 1.6 m above it. Rounding is exact as long
 * as the eye is less than half a floor up, which at any floor-to-floor a building
 * has it is; a tolerance has to be threaded between 1.6 and 2.8 and is one
 * changed constant away from being wrong.
 */
const floorOf = (y, rise) => (rise > 0 ? Math.round((+y || 0) / rise) : 0);
/** Walking pace, m/s. The same number `day.js` budgets a route at. */
const WALK = 1.35;
/** How much of the route's own walking time the run is given. */
const SLACK = 1.5;

/**
 * Seconds for a lap of these gates: the nearest-neighbour walk from the spawn,
 * at walking pace, plus half again for reading the ground and choosing an order.
 *
 * Nearest-neighbour rather than the shortest tour, because the player does not
 * know the order and walks something close to greedy. Never under 45 s, so a
 * two-gate site is not a sprint.
 */
export function trialLimit(gates, spawn = { x: 0, z: 0 }, { pace = WALK, cap = 900, rise = 0 } = {}){
  const left = gates.map(g => ({ x: +g.x, z: +g.z, y: +(g.y ?? 0) }));
  let at = { x: +(spawn?.x ?? 0), z: +(spawn?.z ?? 0), y: +(spawn?.y ?? 0) };
  let metres = 0;
  // A floor change is real distance and takes real time, and on a stacked plan it
  // is *most* of both: Changeover's six gates are inside a 26 m corridor repeated
  // on four floors, so the horizontal route is ninety metres and the honest lap is
  // three lift rides. Priced at the ride — `MINUTES_PER_FLOOR` in
  // engine/core/lift.js is a minute, and a minute of walking is eighty metres.
  // `rise` is 0 in every world with one floor, so this term vanishes there.
  const floorCost = (a, b) => (rise > 0 ? Math.abs(floorOf(a.y, rise) - floorOf(b.y, rise)) * 80 : 0);
  while(left.length){
    let best = 0, bestD = Infinity;
    for(let i = 0; i < left.length; i++){
      const d = Math.hypot(left[i].x - at.x, left[i].z - at.z) + floorCost(left[i], at);
      if(d < bestD){ bestD = d; best = i; }
    }
    metres += bestD;
    at = left.splice(best, 1)[0];
  }
  // Capped, because a limit longer than the working day is a stopwatch with a
  // number in front of it, and the point of the countdown is that it can run out.
  return Math.min(cap, Math.max(45, Math.round((metres / (pace > 0 ? pace : WALK)) * SLACK)));
}

/**
 * The controller. One per game, idle until `start`.
 *
 *   scene        the live scene, for the gate markers
 *   getPosition  the player's eye, as a Vector3
 *   groundHeight (x, z) -> y, so a gate sits on the ground rather than in it
 *   spawn        where every run starts, {x, z, yaw}
 *   player       { teleport }
 *   onLeaveRoom  optional: called before a run, to put the player outdoors
 *   rise         optional: floor-to-floor, where the world has floors stacked on
 *                one footprint. 0 everywhere else, and every term it enters
 *                vanishes at 0 — see `floorRise` in interiorTower.js.
 */
export function createTrial({ scene, camera = null, getPosition, groundHeight, spawn, player,
  onLeaveRoom, pins = null, rise = 0 }){
  let run = null;
  const RISE = +rise || 0;

  function buildGates(gates){
    const group = new THREE.Group();
    group.name = 'trialGates';
    const marks = gates.map((g) => {
      // The gate's own height where it has one. `groundHeight` answers for the
      // floor the player is standing on, so on a stacked plan every gate in the
      // building would be built on that floor — six rings on top of each other.
      const y = Number.isFinite(g.y) && RISE > 0 ? +g.y : (groundHeight?.(g.x, g.z) ?? 0);
      const holder = new THREE.Group();
      // The beacon is the crowd's own marker rig, in the trial's colour. Reusing
      // it means a gate reads as "something the game wants you at" in the same
      // visual language as an open call, which is what it is.
      // No name over the gate, on the beacon or anywhere else. The big tour sign
      // that used to stand here read as a hoarding planted on the roof of the
      // place it was naming — a panel four metres up with no post under it, which
      // floats from every angle but head-on — and putting the name on the beacon
      // instead only printed it a second time directly under the building's own
      // sign. The place already says what it is; the gate only has to say "here",
      // and the HUD and the map carry the names.
      const beacon = addCaseBeacon(holder, { x: g.x, z: g.z, y, colour: 0x35a0c8,
        label: null, height: 2.6 });
      // A ring on the ground the width of the gate, so the pass-through zone is
      // a place rather than a guess. Flat, unlit, and drawn under everything.
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(GATE_RADIUS - 0.5, GATE_RADIUS, 48),
        new THREE.MeshBasicMaterial({ color: 0x35a0c8, transparent: true, opacity: 0.45,
          side: THREE.DoubleSide, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(g.x, y + 0.05, g.z);
      holder.add(ring);
      group.add(holder);
      return { ...g, holder, beacon };
    });
    scene.add(group);
    return { group, marks };
  }

  function hud(){
    const el = document.createElement('div');
    el.id = 'trialHUD';
    el.innerHTML = '<div class="trialClock">0:00</div>'
      + '<div class="trialGates"></div>'
      + '<div class="trialNote">Esc — give the run up</div>';
    document.body.append(el);
    return el;
  }

  const api = {
    get active(){ return !!run; },

    /**
     * Start a run. `onDone({ order, seconds, abandoned })` fires exactly once.
     *
     * `order` is the gate ids in the order the player actually passed through
     * them. Grading is the format's job, not this file's — nothing here knows
     * what the right order is, which is the cheapest way to be sure nothing
     * here can leak it.
     */
    start({ gates, limit = 0 }, onDone){
      if(run) return false;
      onLeaveRoom?.();
      player?.teleport?.(spawn, spawn?.yaw ?? 0);
      const built = buildGates(gates);
      run = {
        ...built,
        taken: [],
        seconds: 0,
        limit: +limit > 0 ? +limit : trialLimit(gates, spawn),
        el: hud(),
        done: onDone,
        onKey: null,
      };
      run.onKey = (e) => { if(e.code === 'Escape') api.finish(true); };
      window.addEventListener('keydown', run.onKey);
      // The map belongs to the run while it lasts: the gates still to take, and
      // not the day's own open calls, which are the one thing the player must
      // not be reading while they are out here. Resolved at draw time because a
      // gate goes off the map the moment it is taken.
      pins?.(() => run ? run.marks.filter(m => m.holder.visible !== false)
        .map(m => ({ x: m.x, z: m.z, name: m.label, colour: '#35a0c8' })) : []);
      return true;
    },

    /** Per frame, in real seconds. Cheap and returns immediately when idle. */
    update(dt){
      if(!run) return;
      run.seconds += dt;
      const p = getPosition();
      for(const m of run.marks){
        if(m.holder.visible === false) continue;
        // Horizontal only: the player may be on a slope or in a vehicle whose
        // eye is two metres higher than the walk, and a gate is a place on the
        // ground rather than a hoop to fly through.
        const dx = p.x - m.x;
        const dz = p.z - m.z;
        if(dx * dx + dz * dz > GATE_RADIUS * GATE_RADIUS) continue;
        // Horizontal only was the whole test, and on a stacked plan that is a
        // test that passes for every gate in the building at once: Changeover's
        // six areas are six (x, z) inside one 26 m corridor, repeated on four
        // floors, so walking one floor's corridor took all six gates. The floor
        // has to match, and it is compared as a floor rather than as a height
        // because the player's position is their eye and a gate is on the slab.
        if(RISE > 0 && floorOf(p.y, RISE) !== floorOf(m.y, RISE)) continue;
        m.holder.visible = false;
        run.taken.push(m.id);
      }
      // Somebody has to turn a label to face the player, and for years nothing
      // did: an unturned label is a plane seen edge-on, which is invisible and
      // reads as a gate with no name on it. The beacon's own update does that,
      // and bobs the arrow with it.
      for(const m of run.marks){
        if(m.holder.visible !== false) m.beacon?.update?.(dt, camera);
      }
      const clock = run.el.querySelector('.trialClock');
      const left = Math.max(0, run.limit - run.seconds);
      if(clock){
        clock.textContent = `${Math.floor(left / 60)}:${String(Math.floor(left % 60)).padStart(2, '0')}`;
        // Under fifteen seconds it says so in the one way a glance can read.
        clock.classList.toggle('low', left <= 15);
      }
      if(left <= 0){ api.finish(false, true); return; }
      const list = run.el.querySelector('.trialGates');
      // What they have taken, in the order they took it. Not whether it was
      // right — that is the answer, and this is a HUD.
      if(list) list.textContent = `${run.taken.length} of ${run.marks.length}`;
      if(run.taken.length >= run.marks.length) api.finish(false);
    },

    /** End the run, either way it ends. Safe to call twice. */
    finish(abandoned, out = false){
      if(!run) return;
      const { group, el, done, taken, seconds, onKey, marks } = run;
      const marksLen = marks?.length ?? taken.length;
      run = null;                       // before the callback: it may start another
      window.removeEventListener('keydown', onKey);
      pins?.(null);
      scene.remove(group);
      group.traverse(o => {
        o.geometry?.dispose?.();
        if(Array.isArray(o.material)) o.material.forEach(m => m.dispose?.());
        else o.material?.dispose?.();
      });
      el.remove();
      done?.({ order: taken, seconds, abandoned: !!abandoned, out: !!out,
        gates: marksLen });
    },
  };
  return api;
}
