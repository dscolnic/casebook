// plan.js — the Hallam Exchange, as data.
//
// A 1960s telephone exchange with the switch floor taken out of it: one hall
// fifty-four metres long, rooms down both sides, and nothing in the middle. The
// Conviction Integrity Unit took it because the hall was the only room in the
// city long enough for what it does with it.
//
// **The hall is the sightline.** The reconstruction of the Ferrier Street corner
// stands across the south end — shopfront, doorway, kerb, lamp column — and the
// distance marks are let into the floor of the corridor running away from it, so
// walking north from the bay is walking away from the doorway at 1:1. The two
// numbers this case turns on are painted there: 22 m, which is what the case
// summary said for seven years, and 34 m, which is what the ground says. A
// player who has walked from one to the other has already met day nine.
//
// Which is why the geometry below is not free. `props.js` puts the facade at the
// end wall and measures every mark from it, so moving `spine.z0` moves the
// distances the game is about.
//
// Units are metres. +z runs north along the hall, +x is to the east of it.

export const plan = {
  metrics: {
    // A telephone exchange hall, not a corridor: wide enough that the far end
    // reads as a long way away, which is the whole point of the building.
    corridorHalfWidth: 2.6,
    roomDepth: 8.0,
    ceilingH: 3.4,
    tileH: 3.15,
    palette: {
      // Terrazzo, cream tile to shoulder height, and the dark green the
      // exchange was painted in and nobody has repainted.
      floorSpine: [198, 194, 184],
      floorRoom:  [190, 192, 190],
      wall:  '#e6e3d8',
      base:  '#3d4a44',
      rail:  '#8d9299',
      frame: '#b6b8b6',
      door:  '#7a6a52',
      signBand: '#2f5a4a',
    },
  },

  // The south end is the reconstruction; the north end is where the paper lives.
  spine: { z0: -10, z1: 44 },

  rooms: [
    // ---- west side
    { id: 'BAYW',   side: 'w', z0: -10, z1: 4,  name: 'Reconstruction Bay',    kind: 'bay',          group: 'PERCEPT', open: true },
    { id: 'INT1',   side: 'w', z0: 4,   z1: 12, name: 'Interview Suite A',     kind: 'interview',    group: 'MEMORY' },
    { id: 'INT2',   side: 'w', z0: 12,  z1: 19, name: 'Interview Suite B',     kind: 'interview' },
    { id: 'BOOTH',  side: 'w', z0: 19,  z1: 24, name: 'Dark Adaptation Booth', kind: 'booth' },
    { id: 'PHYS',   side: 'w', z0: 24,  z1: 33, name: 'Physiology Bay',        kind: 'lab',          group: 'BRAIN' },
    { id: 'QUIET',  side: 'w', z0: 33,  z1: 42, name: 'Quiet Room',            kind: 'quiet' },

    // ---- east side
    { id: 'BAYE',   side: 'e', z0: -10, z1: 4,  name: 'Survey & Equipment Store', kind: 'supply',    open: true },
    { id: 'LINEUP', side: 'e', z0: 4,   z1: 13, name: 'Identification Suite',  kind: 'lineup',       group: 'IDENT', door: 'wide' },
    { id: 'OBS',    side: 'e', z0: 13,  z1: 18, name: 'Observation Room',      kind: 'observation' },
    { id: 'DELIB',  side: 'e', z0: 18,  z1: 27, name: 'Deliberation Room',     kind: 'deliberation', group: 'SOCIAL', door: 'wide' },
    { id: 'DATA',   side: 'e', z0: 27,  z1: 35, name: 'Data Room',             kind: 'data',         group: 'MEASURE' },
    { id: 'RECS',   side: 'e', z0: 35,  z1: 44, name: 'Records Store',         kind: 'archive' },
  ],

  /** Overhead wayfinding, read from both directions. */
  bladeSigns: [
    { z: 3.6,  west: 'Reconstruction',  east: 'Identification' },
    { z: 18.4, west: 'Interview suites', east: 'Observation' },
    { z: 33.4, west: 'Quiet room',      east: 'Data & records' },
  ],

  /** Seating shared by the fit-out and the crowd, so nobody hovers over a chair. */
  seats: [
    [-6.2, -1.0, Math.PI / 2], [-6.2, 0.2, Math.PI / 2], [-6.2, 1.4, Math.PI / 2],
    [-8.4, -1.0, -Math.PI / 2], [-8.4, 0.2, -Math.PI / 2],
    [6.4, 21.0, Math.PI / 2], [6.4, 22.4, Math.PI / 2], [6.4, 23.8, Math.PI / 2],
    [8.6, 21.0, -Math.PI / 2], [8.6, 22.4, -Math.PI / 2], [8.6, 23.8, -Math.PI / 2],
  ],

  /** Where people stand, and where the day sends them. */
  spots: {
    spine: [
      [-1.8, -7], [1.8, -4], [-1.8, -1], [1.8, 2], [-1.8, 6], [1.8, 9],
      [-1.8, 13], [1.8, 16], [-1.8, 20], [1.8, 23], [-1.8, 26], [1.8, 29],
      [-1.8, 32], [1.8, 35], [-1.8, 38], [1.8, 41],
    ],
    open: [[-6.0, -6.0], [-7.6, -3.0], [-5.4, 2.0], [6.2, -6.0], [7.8, -2.0], [6.0, 2.0]],
  },
  anchors: {
    // Where the paper is, which is where most of the unit actually sits.
    base:  [[7.0, 31], [8.6, 33], [1.8, 35], [-1.8, 38], [7.2, 38]],
    // The working half: the bay, the suites and the rig.
    work:  [[-6.0, -2.0], [-5.6, 8], [6.4, 8], [-1.8, 16], [6.2, 22], [-5.8, 28]],
    // The south end, where anybody being shown the reconstruction ends up.
    front: [[-6.0, -6.0], [-7.6, -3.0], [1.8, -4], [-1.8, -1], [6.2, -6.0]],
  },
};

export default plan;
