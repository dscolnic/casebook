// fixtures.js — the objects the questions are about, standing in the rooms.
//
// A fixture is a thing in a room that a question is asked AT. It is declared by
// name and wall and never by coordinate: `engine/world/interiorFixtures.js`
// computes the position from `room.bounds`, which is the only thing that knows
// where this room's walls actually are. See gamekit/PLACEMENT_PASS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'    (mirrored with the room, like the fit-out)
//   along:  -1 … 1, where along that wall. 0 is the middle.
//
// A lesson points at one with `at: <id>` in books/headwater.yml. A lesson that
// points at nothing is answered at the case stand, exactly as before, and the
// stand stays in every room either way.
//
// ## Ashfell has ONE tier of ground, and that is not an oversight
//
// `engine/core/orientation.js` gives every interior campaign a single tier —
// "the submarine, Mission Control, the coordinating-centre corridor, the dam"
// is its own list, and the dam is this one. There is no far ring to unlock and
// no vehicle to sign out, and `engine/core/access.js`'s sealed doors are built
// on `site.buildings`, which a five-floor tower does not have. So the half of
// the placement pass that opens a far place cannot be run here.
//
// What CAN be run, and is, is step 6 of the same pass — the strongest reading of
// "the world grew" per unit of work, because it lands on ground the player
// crosses every single day. The tower opens with five unfinished things and
// finishes six over the fortnight:
//
//   day  what changes, in a room the player is already in
//   ---  ------------------------------------------------
//    6   the high-ground gauge comes out of its crate and onto telemetry —
//        Ekundayo's stated blind spot, closed on the morning the campaign asks
//        whether the inflow has peaked
//    7   the bulkhead job clears the gate house floor, so the spare gate is back
//        in service before the second week
//    9   the two silent piezometers come off the bench re-cabled — the HUNT run
//        on day 8 is what finds them, and this is what it bought
//   11   sheet 3, surveyed 2003, comes down off the wall and the resurveyed
//        curve goes up in its place, the day after the resurvey lands
//   12   the spare runner is out of its crate and in the machine
//   14   the siren repeater panel is wired, which is what the day-13 CANVASS run
//        along the downstream settlements was for
export const FIXTURES = {
  INFLOW: [
    { id: 'gauge-wall', name: 'The catchment gauge wall', build: 'board', wall: 'back', along: 0.35,
      caption: 'Eleven rain gauges and four river gauges, every fifteen minutes.' },
    { id: 'trace-bench', name: 'The hydrograph bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Where a column of readings gets drawn as a curve.' },
    // Ekundayo's own limit: the rain falls on the high ground and everything he
    // owns measures it badly up there. The gauge is in the building from day one
    // and in the catchment from day 6.
    { id: 'inflow-crate', name: 'The high-ground gauge, still crated', build: 'bench', wall: 'right', along: -0.7,
      until: 6, caption: 'Strapped since March. Nobody has had a dry day to walk it up.' },
    { id: 'inflow-highgauge', name: 'The high-ground gauge, telemetered', build: 'vessel', wall: 'right', along: 0.6,
      from: 6, caption: 'Reporting on the hour from the ground the radar cannot see.' },
  ],
  STORE: [
    { id: 'storage-board', name: 'The stage–storage board', build: 'board', wall: 'back', along: 0.3,
      caption: 'Level in, volume out. Every total in the building comes through it.' },
    { id: 'level-desk', name: 'The level desk', build: 'bench', wall: 'left', along: -0.4,
      caption: 'The float gauge, the strip chart, and the pencil corrections on it.' },
    // The 2003 sheet is the campaign's own twist, standing on the wall from the
    // first morning. It comes down the day after the resurvey lands.
    { id: 'store-oldsheet', name: 'Sheet 3, surveyed 2003', build: 'bench', wall: 'right', along: -0.7,
      until: 11, caption: 'Measured once, by somebody, in a particular year.' },
    { id: 'store-resurvey', name: 'The resurveyed curve, pinned up', build: 'board', wall: 'right', along: 0.6,
      from: 11, caption: 'Eleven transects and twenty years of silt, drawn to scale.' },
  ],
  GATES: [
    { id: 'hoist-stand', name: 'The Gate 2 hoist stand', build: 'vessel', wall: 'left', along: -0.45,
      caption: 'Wound by hand at the top of its travel, and Wilkes can hear a bad bearing in it.' },
    { id: 'discharge-board', name: 'The spillway discharge board', build: 'board', wall: 'back', along: 0.35,
      caption: 'Head over the sill, gate opening, and what is actually going past.' },
    { id: 'gates-bulkhead', name: 'The bulkhead job, staged on the floor', build: 'rack', wall: 'right', along: -0.6,
      until: 7, caption: 'Plates, seals and a spare gate out of service until it clears.' },
  ],
  STRUCT: [
    { id: 'weir-bench', name: 'The seepage weir bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Nine weirs, read by hand, and the level they have to be read beside.' },
    { id: 'uplift-wall', name: 'The uplift plot wall', build: 'board', wall: 'back', along: 0.35,
      caption: 'Every gauge in the foundation gallery, plotted against head.' },
    // Two of the six went quiet after the last flood. The HUNT run on day 8 is
    // what finds them; this is the pair of fixtures that says so.
    { id: 'struct-piezo-crate', name: 'Two piezometer heads, off the wall', build: 'bench', wall: 'right', along: -0.7,
      until: 9, caption: 'Silent since the last flood. A cable and a change in the ground look the same from here.' },
    { id: 'struct-piezo-live', name: 'The re-cabled piezometer head', build: 'vessel', wall: 'right', along: 0.55,
      from: 9, caption: 'Back on the plot, and the silence turned out to be a cable.' },
  ],
  POWER: [
    { id: 'machine-board', name: 'The machine board', build: 'board', wall: 'back', along: 0.3,
      caption: 'What each unit is passing, to the cubic metre.' },
    { id: 'penstock-gauge', name: 'The penstock head gauge', build: 'vessel', wall: 'left', along: -0.45,
      caption: 'What the pipe loses the harder the machines are driven.' },
    { id: 'power-runner-crate', name: 'The spare runner, crated', build: 'bench', wall: 'right', along: -0.65,
      until: 12, caption: 'One machine short of the pair while it sits there.' },
  ],
  SAFE: [
    { id: 'warning-list', name: 'The warning list', build: 'board', wall: 'back', along: 0.3,
      caption: 'Eleven villages, two caravan sites, a school and a road that goes first.' },
    { id: 'arrival-map', name: 'The arrival-time map', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Four hours to the first village and eleven to the last, walked by Baptiste herself.' },
    // What the CANVASS run on day 13 was for: the settlements that did not hear
    // the Sunday siren test get a repeater before the handover.
    { id: 'safe-siren-panel', name: 'The siren repeater panel, wired', build: 'board', wall: 'right', along: 0.6,
      from: 14, caption: 'The four settlements that did not hear Sunday\'s test, on the circuit.' },
  ],
};
