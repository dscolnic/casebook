import { bottomDepth } from '../../simulation/NavigationSystem.js';

/**
 * Command Episode 1 — Silent Passage (end of Unit I).
 *
 * Everything the unit has taught, at once, with the boat moving the whole time.
 * The task is to cross a constricted stretch of the bank without losing contact
 * awareness and without making unnecessary noise. There is no puzzle to solve.
 * There is a set of couplings that pull against each other, and the player has to
 * hold all of them at once:
 *
 *   speed   — gets you through the constriction sooner, and the position ring
 *             grows the whole time you are in it; but rpm is the biggest single
 *             contributor to the noise floor.
 *   pumps   — comfort and readiness, 3 dB each, and 3 dB is the difference
 *             between holding the merchant and losing it.
 *   depth   — deeper is quieter and safer from the surface, and the pinnacle on
 *             the eastern shoulder does not care what you would prefer.
 *   fixes   — the fathometer is free and independent; the inertial displays feel
 *             like a fix and are not.
 *   EMCON   — transmitting is an exposure of a different kind, and nothing here
 *             requires it.
 *
 * Scored continuously: acoustic exposure is integrated over the whole passage,
 * time without the merchant held is integrated, and the position ring and the
 * water under the keel are checked at the exit. Nothing is pass/fail except
 * putting the boat on the bottom.
 *
 * Source games: Sonar Spy, Dead Reckoning, Casebook and Strait Support
 * (`nc_strait_1` — keeping a set of dependencies satisfied at once).
 */

const QUIET_FLOOR = 47;      // dB — above this the merchant starts to fade
const EXIT_Y = 3.55;         // northing that clears the constriction
const SAFE_CLEARANCE = 15;   // metres under the keel

export const episode01SilentPassage = {
  id: 'episode_01_silent_passage',
  title: 'Command Episode 1 — Silent Passage',
  unit: 1,
  startLocation: 'control_room',
  sourceGames: ['Sonar Spy', 'Dead Reckoning', 'Casebook', 'Strait Support'],
  sourceIds: ['nc_sonar_spy_1', 'nc_dr_1', 'nc_greywake_case', 'nc_strait_1'],
  learningObjectives: [
    'Hold several competing constraints at once instead of optimising one.',
    'Treat acoustic exposure as something you spend, not something that happens to you.',
    'Keep a contact held while doing everything else.',
    'Keep the position ring small enough that the water under the keel is knowable.',
    'Recognise that the cheapest fix is often the independent one.',
  ],

  onStart(rt) {
    const { state, sonar, nav } = rt;
    state.depth = 40;
    state.orderedDepth = 40;
    state.speed = 6;
    state.heading = 15;
    state.orderedHeading = 15;
    state.propulsionState.shaftRpm = 72;
    state.pumpStates.seawaterPump.on = true;
    state.pumpStates.trimPump.on = true;
    state.communicationState.emconState = 'A';
    state.settleNoise();

    nav.seed({
      truePosition: { x: 0.15, y: 2.85 },
      estimatedPosition: { x: 0, y: 2.85 },
      current: { set: 96, drift: 1.1 },     // sets you east, toward the pinnacle
      uncertainty: 0.7,
      fixAgeMin: 48,
    });

    // One merchant to hold all the way through, plus whatever the boat is making.
    sonar.seed([{
      id: 'M11', truth: 'Merchant', bearing: 285, bearingRate: -0.5, range_nm: 5.4,
      sourceLevel: 148, tonalStrength: 1.0,
      note: 'Crossing left to right, opening slowly.', bladeRate: 'steady blade line and harmonics',
    }]);

    // Continuous scoring. This is the episode: the numbers accumulate while the
    // player is busy with something else.
    rt.flags.exposure = 0;
    rt.flags.blindTime = 0;
    rt.flags.minClearance = 999;
    rt.flags.groundingRisk = 0;
    rt.flags.transmitted = 0;
    rt.subscribe('radio:transmitted', () => { rt.flags.transmitted += 1; });

    const tick = 0.5;
    rt._episodeTimer = setInterval(() => {
      const s = rt.state;
      // Acoustic exposure: everything above the quiet floor, integrated.
      rt.flags.exposure += Math.max(0, s.sonarNoiseFloor - QUIET_FLOOR) * tick;
      // Contact awareness: is the merchant still above the floor?
      const held = rt.sonar.audible().some((c) => c.id === 'M11');
      if (!held) rt.flags.blindTime += tick;
      // Water under the keel, where the boat really is.
      const clearance = bottomDepth(s.truePosition.x, s.truePosition.y) - s.depth;
      rt.flags.minClearance = Math.min(rt.flags.minClearance, clearance);
      if (clearance < SAFE_CLEARANCE) {
        rt.flags.groundingRisk += tick;
        if (!rt.flags.warnedShoal) {
          rt.flags.warnedShoal = true;
          rt.bus.emit('hud:toast', {
            concept: 'Shoal water',
            text: 'The fathometer is showing far less water than the plot expects. Something is under you that should not be — come up, come left, and get an independent fix.',
          });
        }
      }
      rt.bus.emit('episode:tick', {
        exposure: rt.flags.exposure, blindTime: rt.flags.blindTime,
        clearance, held, progress: (s.truePosition.y - 2.85) / (EXIT_Y - 2.85),
      });
    }, tick * 1000);
    rt.subscribe('mission:complete', () => clearInterval(rt._episodeTimer));

    rt.toast('Silent Passage',
      'Cross the constriction. Hold the merchant, keep the boat quiet, and know where you are well enough to know what is under you. Nothing here is a puzzle — it is all four at once.');
  },

  stages: [
    {
      id: 'brief',
      target: { interactable: 'navigation', compartment: 'control_room' },
      label: 'Look at the Ground',
      objective: 'At the navigation table, look at the chart and take stock of the passage ahead.',
      hints: ['The bank shoals to the north-east and there is a pinnacle on its eastern shoulder. The current is setting you toward it.'],
      arm: (rt) => rt.onEvent('station:opened',
        'The bank is ahead and the set is on your beam, pushing you toward the shallow shoulder of it.',
        (p) => p.stationId === 'navigation')(rt),
    },
    {
      id: 'rig_quiet',
      target: { interactable: 'engineering', compartment: 'machinery_control' },
      label: 'Rig for Quiet',
      objective: `Rig the boat for a quiet passage: get the self-noise floor to ${QUIET_FLOOR} dB or below before you enter the constriction.`,
      hints: [
        'Two pumps are running that this passage does not need. Each is about 3 dB.',
        'Shaft rpm is the biggest single term. Slowing down is the cheapest quiet you can buy — but it keeps you in the constriction longer, and the ring grows the whole time.',
        'Machinery Control is aft of berthing.',
      ],
      arm: (rt) => {
        const check = () => {
          const f = rt.state.sonarNoiseFloor;
          rt.bus.emit('mission:progress', {
            have: f <= QUIET_FLOOR ? 1 : 0, need: 1,
            detail: `Self-noise ${Math.round(f)} dB — needs ${QUIET_FLOOR} dB or below`,
          });
          if (f <= QUIET_FLOOR) rt.complete('Rigged for quiet. The merchant came up clearer the moment the pumps stopped — that is what the noise was costing you.');
        };
        const id = setInterval(check, 700);
        return () => clearInterval(id);
      },
    },
    {
      id: 'hold_contact',
      target: { interactable: 'sonar', compartment: 'sonar_room' },
      label: 'Hold the Merchant',
      objective: 'Go forward to sonar and designate the merchant as a track. You are to hold it all the way through.',
      hints: ['Select M11 in the auto-detect list and press Designate.'],
      arm: (rt) => rt.onEvent('sonar:trackDesignated', 'M11 held. Every second it is off the display from here counts against you.',
        (p) => p.id === 'M11')(rt),
    },
    {
      id: 'know_where',
      target: { interactable: 'navigation', compartment: 'control_room' },
      label: 'Know Where You Are',
      objective: 'Before you commit to the passage, get the position ring under 0.5 nm with a fix that is worth something.',
      hints: [
        'The inertial displays will shrink the ring without moving the plot. That is not what you need here.',
        'The bottom-contour fix is independent, silent, and free.',
      ],
      arm: (rt) => {
        const check = () => {
          const u = rt.state.navigationUncertainty;
          rt.bus.emit('mission:progress', {
            have: u < 0.5 ? 1 : 0, need: 1,
            detail: `Position ring ${u.toFixed(2)} nm — needs to be under 0.50 nm`,
          });
          if (u < 0.5) rt.complete('Ring inside half a mile. Now the depth under the plot means something.');
        };
        const id = setInterval(check, 700);
        return () => clearInterval(id);
      },
    },
    {
      id: 'transit',
      target: { interactable: 'control', compartment: 'control_room' },
      label: 'The Passage',
      objective: 'Make the passage. Steer through the constriction and clear it to the north, keeping the boat quiet and the merchant held.',
      hints: [
        'Ship Control has helm, depth and speed. The exit is to the north.',
        'The set is pushing you east onto the shoulder of the bank. Steer to allow for it, or fix and correct as you go.',
        'If the water under you starts disappearing, come shallower — the pinnacle is only dangerous at depth.',
      ],
      arm: (rt) => {
        const check = () => {
          const y = rt.state.truePosition.y;
          const pct = Math.max(0, Math.min(1, (y - 2.85) / (EXIT_Y - 2.85)));
          rt.bus.emit('mission:progress', {
            have: Math.round(pct * 100), need: 100,
            detail: `Exposure ${Math.round(rt.flags.exposure)} dB·s · ${
              rt.flags.blindTime > 0 ? `${rt.flags.blindTime.toFixed(0)} s without the merchant` : 'contact held'}`,
          });
          if (y >= EXIT_Y) {
            rt.complete('Through. What that cost you is in the numbers — noise you did not need to make, and time you could not see.');
          }
        };
        const id = setInterval(check, 900);
        return () => clearInterval(id);
      },
    },
    {
      id: 'account',
      label: 'Account for It',
      objective: 'Open the notebook (N) and file the passage report.',
      hints: ['Press N, then the Mission report tab.'],
      arm: (rt) => rt.onEvent('notebook:reportSubmitted', 'Passage report filed.')(rt),
    },
  ],

  scoring: (rt) => {
    const f = rt.flags;
    const parts = [];
    let score = 0;
    const add = (label, got, max, why) => { score += got; parts.push({ label, got: Math.round(got), max, why }); };

    // Acoustic discretion: exposure is dB-seconds above the quiet floor.
    const exp = f.exposure || 0;
    add('Acoustic discretion', Math.max(0, 30 - exp / 12), 30,
      exp < 60 ? `Almost nothing radiated that did not have to be — ${Math.round(exp)} dB·s above the quiet floor.`
               : `${Math.round(exp)} dB·s of avoidable noise over the passage.`);

    // Contact awareness.
    const blind = f.blindTime || 0;
    add('Contact awareness', Math.max(0, 25 - blind * 1.5), 25,
      blind < 1 ? 'Merchant held for the whole passage.' : `${blind.toFixed(0)} s without the merchant on the display.`);

    // Navigation.
    const finalU = rt.state.navigationUncertainty;
    const err = rt.nav.trueError;
    add('Navigation', Math.max(0, 20 - finalU * 10 - err * 8), 20,
      `Exited with a ${finalU.toFixed(2)} nm ring and a true error of ${err.toFixed(2)} nm.`);

    // Ship safety.
    const minC = f.minClearance === 999 ? 99 : f.minClearance;
    add('Ship safety', minC > SAFE_CLEARANCE ? 15 : Math.max(0, 15 - (SAFE_CLEARANCE - minC)), 15,
      minC > SAFE_CLEARANCE ? `Never less than ${minC.toFixed(0)} m under the keel.`
                            : `Closed to ${minC.toFixed(0)} m under the keel — inside the margin.`);

    const tx = f.transmitted || 0;
    const hints = rt.hintsUsed || 0, skipped = rt.skipped || 0;
    add('Restraint', Math.max(0, 10 - tx * 5 - hints * 2 - skipped * 4), 10,
      [tx ? `${tx} transmission${tx > 1 ? 's' : ''} nothing required` : null,
       hints ? `${hints} hint${hints > 1 ? 's' : ''}` : null,
       skipped ? `${skipped} skipped` : null].filter(Boolean).join('; ') || 'Silent, unaided, nothing skipped.');

    rt.scoreParts = parts;
    return Math.max(0, Math.min(100, Math.round(score)));
  },
};
