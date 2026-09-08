// missionClock.js — the per-mission stopwatch, and everything that stops it.
//
// A metrics campaign scores the clock: at or under the mission's target is worth
// a Recovery Point, past 125% of it costs two. So this has to be right, and the
// thing that makes it hard is not the counting — it is that the clock must stop
// for the game's own interruptions and must NOT stop for the player's.
//
//   RUNS      questions, panels, walking, driving, travel between locations.
//             Reading the panel is part of the shift; pausing there would make
//             thinking free.
//   PAUSED    required dialogue bubbles, loading, the tab going to the
//             background, the accessibility menu, system interruptions.
//
// PAUSE REASONS STACK, AND THAT IS THE WHOLE DESIGN. Two things overlap all the
// time — a beat plays while the tab loses focus — and a boolean `paused` flag
// means whichever ends first restarts the clock underneath the other. Every
// pause is named, `resume` takes the same name back, and the clock runs again
// only when nothing is holding it.
//
// Injectable `now` so the selftest is arithmetic rather than a wait.

export const PAUSE = {
  /** A beat's dialogue bubble is on screen and local interaction is held. */
  BEAT: 'beat',
  /** The tab is in the background, so there are no frames and no game either. */
  HIDDEN: 'hidden',
  /** A room is being built, a theme is loading. */
  LOADING: 'loading',
  /** The map, the settings sheet, the accessibility menu. */
  MENU: 'menu',
  /** The mission's own plan card, before the shift has been accepted. */
  PLAN: 'plan',
};

/**
 * @param opts.now  () => milliseconds. Defaults to `Date.now`.
 */
export function createMissionClock({ now = () => Date.now() } = {}){
  /** Milliseconds banked from previous running stretches. */
  let banked = 0;
  /** When the current running stretch began, or null when not running. */
  let since = null;
  /** Every reason currently holding the clock. */
  const holds = new Set();
  let stopped = false;
  let started = false;

  const live = () => started && !stopped && holds.size === 0;

  /** Bank whatever the current stretch is worth and close it. */
  function settle(){
    if(since !== null){ banked += now() - since; since = null; }
  }
  /** Open a stretch if one should be open and is not. */
  function open(){
    if(live() && since === null) since = now();
  }

  return {
    /**
     * Start the mission's clock. The bible has this happen when the arrival
     * beat closes and the first stop becomes active — not when the room loads,
     * and not when the plan card goes up.
     *
     * Starting twice is a no-op rather than a reset: the arrival beat can fire
     * from two paths (the door, or a person stop closing) and neither of them
     * should be able to give the player their time back.
     */
    start(){
      if(started) return false;
      started = true;
      open();
      return true;
    },
    /** Hold the clock for a named reason. Holding twice is one hold. */
    pause(reason){
      if(!reason) return false;
      const had = holds.has(reason);
      holds.add(reason);
      if(!had) settle();
      return !had;
    },
    /**
     * Release one named hold. Releasing a hold nobody took is a no-op, which is
     * deliberate: a menu closing twice may not start a clock a beat is holding.
     */
    resume(reason){
      if(!holds.delete(reason)) return false;
      open();
      return true;
    },
    /** Stop for good — the final graded stop is done. */
    stop(){
      if(stopped) return false;
      settle();
      stopped = true;
      return true;
    },
    /** A fresh mission. Everything, including the holds. */
    reset(){
      banked = 0; since = null; stopped = false; started = false; holds.clear();
    },
    /** Seconds on the clock, whether it is running or not. */
    elapsed(){
      const open_ = since === null ? 0 : now() - since;
      return (banked + open_) / 1000;
    },
    running(){ return live(); },
    /** Has it been started at all? The HUD shows nothing before that. */
    active(){ return started && !stopped; },
    stopped(){ return stopped; },
    /** What is holding it, for the HUD and for anybody debugging a stuck clock. */
    holding(){ return [...holds]; },
  };
}

// --------------------------------------------------------------- selftest
//
//   node engine/core/missionClock.js --selftest
//
// The overlapping-holds case is the reason this file exists. A boolean `paused`
// would pass every other case here and fail that one, and the symptom — a clock
// that runs during a dialogue bubble now and then — is invisible until an RP
// award is wrong for a reason nobody can reproduce.
if(typeof process !== 'undefined' && process.argv?.includes('--selftest')){
  const fails = [];
  let ran = 0;
  const check = (what, ok, extra = '') => {
    ran++;
    if(!ok) fails.push(`${what}${extra ? ` — ${extra}` : ''}`);
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
  };

  let t = 0;
  const clock = () => createMissionClock({ now: () => t });

  // 1 — nothing runs before the mission starts
  t = 0;
  let c = clock();
  t = 5000;
  check('the clock does not run before it is started', c.elapsed() === 0,
        'the plan card and the arrival beat are not the player’s time');
  check('…and reports itself inactive', c.active() === false);

  // 2 — it counts once started
  c.start();
  t = 8000;
  check('it counts from the start', c.elapsed() === 3);
  check('starting again does not reset it', c.start() === false && c.elapsed() === 3,
        'the arrival beat can fire from two paths and neither may refund the shift');

  // 3 — a hold freezes it, and time passing while held is not counted
  c.pause(PAUSE.BEAT);
  t = 20000;
  check('a hold freezes the clock', c.elapsed() === 3);
  check('…and it says what is holding it', c.holding().join() === PAUSE.BEAT);
  c.resume(PAUSE.BEAT);
  t = 21000;
  check('releasing the hold starts it again', c.elapsed() === 4);

  // 4 — OVERLAPPING HOLDS. The case a boolean gets wrong.
  c.pause(PAUSE.BEAT);
  t = 25000;
  c.pause(PAUSE.HIDDEN);
  t = 30000;
  c.resume(PAUSE.BEAT);          // the bubble closed; the tab is still hidden
  t = 40000;
  check('a second hold keeps the clock stopped after the first is released',
        c.elapsed() === 4,
        'a boolean paused flag restarts the clock under the hold still on it');
  c.resume(PAUSE.HIDDEN);
  t = 41000;
  check('…and only the last release restarts it', c.elapsed() === 5);

  // 5 — the no-ops
  check('holding twice for one reason is one hold', c.pause(PAUSE.MENU) === true
        && c.pause(PAUSE.MENU) === false);
  t = 50000;
  c.resume(PAUSE.MENU);
  t = 51000;
  check('…and one release is enough', c.elapsed() === 6);
  check('releasing a hold nobody took does nothing', c.resume('never-held') === false);
  c.pause(PAUSE.BEAT);
  c.resume('never-held');
  t = 60000;
  check('…and cannot start a clock another hold is on', c.elapsed() === 6,
        'a menu closing twice may not overrule the bubble still up');
  c.resume(PAUSE.BEAT);

  // 6 — stopping is final
  t = 61000;
  c.stop();
  t = 99000;
  check('stopping freezes it for good', c.elapsed() === 7);
  check('stopping twice is one stop', c.stop() === false);
  check('a hold after the stop does not change the reading', (c.pause(PAUSE.BEAT), c.elapsed() === 7));
  check('and it reports itself stopped', c.stopped() === true && c.active() === false);

  // 7 — reset is a fresh mission, holds included
  c.reset();
  t = 100000;
  check('reset clears the clock', c.elapsed() === 0 && c.active() === false);
  check('…and the holds with it', c.holding().length === 0,
        'a mission that starts already held by last mission’s bubble never runs');
  c.start();
  t = 103000;
  check('…and it runs again from zero', c.elapsed() === 3);

  // 8 — two identical runs read identically. The equal-inputs case.
  const runOne = (() => { t = 0; const k = clock(); k.start(); t = 4000;
    k.pause(PAUSE.BEAT); t = 9000; k.resume(PAUSE.BEAT); t = 12000; return k.elapsed(); })();
  const runTwo = (() => { t = 0; const k = clock(); k.start(); t = 4000;
    k.pause(PAUSE.BEAT); t = 9000; k.resume(PAUSE.BEAT); t = 12000; return k.elapsed(); })();
  check('two identical runs read identically', runOne === runTwo && runOne === 7);

  if(fails.length){
    console.log(`\nmissionClock --selftest: ${fails.length} case(s) failed.`);
    for(const f of fails) console.log(`  - ${f}`);
    process.exitCode = 1;
  } else {
    console.log(`\nmissionClock --selftest: ${ran} cases, and holds that overlap without leaking.`);
  }
}
