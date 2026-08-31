// fixtures.js — the objects the questions are about, one per area's worth of work.
//
// A fixture is a thing standing in a room that a question is asked AT. It is
// declared by name and wall and never by coordinate: `interiorFixtures.js`
// computes the position from `room.bounds`, which is the only thing that knows
// where this room's walls actually are. See gamekit/PLACEMENT_PASS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'    (mirrored with the room, like the fit-out)
//   along:  -1 … 1, where along that wall. 0 is the middle.
//
// A lesson points at one with `at: <id>` in books/slackwater.yml. A lesson that
// points at nothing is answered at the case stand, exactly as before.
export const FIXTURES = {
  PRED: [
    { id: 'board', name: 'The constituent board', build: 'board', wall: 'back', along: -0.4,
      caption: 'Eight terms, added in every morning; the two biggest chalked in first.' },
    { id: 'tailwall', name: 'The dropped-tail wall', build: 'rack', wall: 'left', along: 0.5,
      caption: 'Twenty-nine amplitudes, pinned up in descending order, that never reach the board.' },
    { id: 'fitdesk', name: 'The fitting desk', build: 'bench', wall: 'right', along: -0.2,
      caption: 'Nine years of this station\'s own record, worked into speeds and phases.' },
    // THE WORLD GROWS ON GROUND THE PLAYER ALREADY WALKS. Nothing points at
    // either of these: they are `until:`/`from:` fixtures, built or removed by
    // the day rather than called by a question, and PLACEMENT_PASS.md step 6 is
    // explicit that this is the strongest reading of "the world grew" per unit
    // of work. The pair is one beat told twice, and it is the campaign's own
    // reversal: the office's residual column stands taped off from day 1 —
    // `until:` renders it with the hazard band, which is what unfinished has to
    // look like — and on day 9 it comes down and the ninth term goes up on the
    // board beside the eight. The ending has claimed for the life of this game
    // that the shallow-water term was found in those residuals; the room shows
    // it now. Kept clear of the three called fixtures' walls above.
    { id: 'noisecolumn', name: 'The residual column', build: 'rack', wall: 'right', along: 0.7,
      until: 9,
      caption: 'Nine years of leftovers, filed under noise, taped off and never worked.' },
    { id: 'ninthterm', name: 'The ninth term', build: 'board', wall: 'left', along: -0.6,
      from: 9,
      caption: 'The shallow-water term, chalked in beside the eight on the day the residuals gave it up.' },
  ],
  TRACK: [
    { id: 'screen', name: 'Float 7\'s telemetry screen', build: 'board', wall: 'back', along: -0.3,
      caption: 'A fix every ten minutes, since it went out on the ebb.' },
    { id: 'plottable', name: 'The plotting table', build: 'bench', wall: 'left', along: 0.2,
      caption: 'Two columns of fixes, fitted into a smooth track.' },
    // The launch log used to be here and its question moved to the shed that
    // issued the floats — a rack of nine and one empty cradle is the object the
    // question is actually about. See the BOAT key below.
  ],
  ROSE: [
    { id: 'roseplot', name: 'The rose plotter', build: 'bench', wall: 'left', along: -0.2,
      caption: 'Speed against bearing, redrawn as a curve with no axes.' },
    { id: 'meterbank', name: 'Meter three', build: 'rack', wall: 'right', along: 0.3,
      caption: 'One of four current meters on the barrage face, ten minutes between readings.' },
    { id: 'residualboard', name: 'The residual board', build: 'board', wall: 'back', along: 0,
      caption: 'Predicted high water minus what each gauge actually read, station by station.' },
  ],
  SLUICE: [
    { id: 'gatedesk', name: 'The gate desk', build: 'board', wall: 'back', along: -0.3,
      caption: 'The head across the gates, read off both faces at once.' },
    { id: 'impoundmentmodel', name: 'The impoundment model', build: 'bench', wall: 'left', along: 0.3,
      caption: 'The filling equation, solved for what six gates are doing right now.' },
    { id: 'gatetable', name: 'The gate table', build: 'rack', wall: 'right', along: -0.2,
      caption: 'What each gate does, written at the top of every half hour.' },
  ],
  FLATS: [
    { id: 'corebench', name: 'The core bench', build: 'bench', wall: 'left', along: -0.2,
      caption: 'Fourteen stations\' worth of mud, split, dried and weighed.' },
    { id: 'exchangeledger', name: 'The exchange ledger', build: 'board', wall: 'back', along: 0.3,
      caption: 'What a tide takes out of the flats, and what the next one gives back.' },
  ],
  WALL: [
    { id: 'wallgauge', name: 'The wall-head gauge', build: 'board', wall: 'back', along: 0,
      caption: 'The first arrival, and the reading that keeps climbing after it.' },
    { id: 'armourcount', name: 'The armour count', build: 'rack', wall: 'left', along: -0.2,
      caption: 'Two hundred and forty units, sized once, never resurveyed.' },
  ],

  // ---------------------------------------------------------------- SITED
  //
  // Three keys that are not areas. A lesson whose `at:` names one of these is
  // ASKED THERE rather than in its own office — `interiorFixtures.sitedAt`
  // resolves it, `access.js` opens the building on the day it is first asked,
  // and `placement.mjs` counts it as sited rather than as a stop in the wrong
  // room. Each of the four exists because the question is genuinely about the
  // object: the eleven floats belong to the shed that issued them, the mean of
  // the release to the sets that took it, and what the gate closes on to the
  // board ninety holdings read it off. The gauge tower has no key here because
  // its one question is a person stop — see site.js.
  BOAT: [
    { id: 'launchrack', name: 'The float rack', build: 'rack', wall: 'left', along: 0.1,
      caption: 'Nine recovered floats, spare drogues, and one cradle empty since float 7 went out.' },
  ],
  TURBINE: [
    { id: 'generationlog', name: 'The generation log', build: 'bench', wall: 'right', along: -0.1,
      caption: 'Every release, its volume and its window — and never the time inside it.' },
  ],
  MARSH: [
    { id: 'warningboard', name: 'The warning board', build: 'board', wall: 'back', along: 0.2,
      caption: 'One shutter, two states, and ninety holdings that act on whichever is showing.' },
  ],
};
