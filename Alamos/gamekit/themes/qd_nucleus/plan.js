// plan.js — the scattering laboratory, as data.
//
// One corridor and four working rooms, and the shape of the building is the
// experiment's own division of labour: the apparatus is down one side, the
// counting and the argument down the other, and nobody carries a number across
// without walking. That separation is the campaign's subject, so it is geometry
// rather than fiction — the professor's room cannot see the screen and the
// counting room cannot hear the professor.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// Two rooms are deliberately the wrong size for an office. The scattering chamber
// is fourteen metres deep because a beam line is a straight run and a room as
// shallow as a study reads as a study with a machine in it; the counting room is
// small, square and reached through a dark-adaptation room, because that is what
// counting faint flashes actually requires.

export const plan = {
  metrics: {
    // Wider than the structural biology unit's, because this corridor has
    // apparatus parked along it and two people carrying a chamber lid.
    corridorHalfWidth: 2.0,
    roomDepth: 8.0,
    ceilingH: 3.6,
    tileH: 3.2,
    // Manchester, 1910: dark green dado to shoulder height, buff distemper
    // above it, varnished timber doors, brass. Every one of these two stops
    // darker than looks right on the canvas — house rule 6 applies indoors, and
    // the first cut of the neighbouring building rendered as a modern hospital.
    palette: {
      floorSpine: [96, 84, 66],
      floorRoom:  [84, 80, 68],
      wall:  '#b8ae92',
      base:  '#2c3a30',
      rail:  '#6b5f46',
      frame: '#7d6844',
      door:  '#4a3520',
      signBand: '#3a2f22',
    },
  },

  spine: { z0: -6, z1: 46 },

  rooms: [
    // West side: the apparatus. Source at the near end, chamber next to it, and
    // the beam line runs across rather than along, which is why the chamber is
    // the deepest room on the plan.
    { id: 'PORCH',   side: 'w', z0: -4, z1: 2,  name: 'Porter\'s Desk',        kind: 'reception', open: true },
    { id: 'BENCH',   side: 'w', z0: 4,  z1: 13, name: 'Instrument Bench',      kind: 'lab',      group: 'BENCH' },
    { id: 'CHAMBER', side: 'w', z0: 15, z1: 29, name: 'Scattering Chamber',    kind: 'workroom', group: 'CHAMBER', door: 'wide' },
    { id: 'TEA',     side: 'w', z0: 31, z1: 37, name: 'Tea Room',              kind: 'waiting',  open: true },
    { id: 'RACK',    side: 'w', z0: 37, z1: 45, name: 'Store',                 kind: 'supply' },

    // East side: the numbers and the argument. The dark-adaptation room is
    // between the corridor and the counting room on purpose — twenty minutes of
    // nothing is part of the apparatus.
    { id: 'DARK',    side: 'e', z0: -4, z1: 3,  name: 'Dark-Adaptation Room',  kind: 'quiet' },
    { id: 'COUNT',   side: 'e', z0: 5,  z1: 14, name: 'Counting Room',         kind: 'lab',      group: 'COUNT' },
    { id: 'STUDY',   side: 'e', z0: 18, z1: 29, name: 'Interpretation Room',   kind: 'station',  group: 'STUDY',  door: 'wide' },
    { id: 'LIB',     side: 'e', z0: 33, z1: 45, name: 'Reading Room',          kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 3.0,  west: 'Instruments',  east: 'Dark room' },
    { z: 14.5, west: 'Chamber',      east: 'Counting' },
    { z: 30.0, west: 'Tea Room',     east: 'Interpretation' },
    { z: 40.0, west: 'Store',        east: 'Reading Room' },
  ],

  seats: [
    [-5.0, 32.2, Math.PI / 2], [-5.0, 33.6, Math.PI / 2], [-5.0, 35.0, Math.PI / 2],
    [-8.4, 32.2, -Math.PI / 2], [-8.4, 33.6, -Math.PI / 2], [-8.4, 35.0, -Math.PI / 2],
    [-6.6, 36.2, 0], [-5.4, 36.2, 0],
  ],

  spots: {
    spine: [
      [-1.4, -3], [1.4, -1], [-1.4, 2], [1.4, 5], [-1.4, 8], [1.4, 11],
      [-1.4, 14], [1.4, 17], [-1.4, 20], [1.4, 23], [-1.4, 26], [1.4, 29],
      [-1.4, 32], [1.4, 35], [-1.4, 38], [1.4, 41], [-1.4, 44],
    ],
    open: [[-5.2, -1], [-6.8, 0.6], [-5.0, 33], [-6.6, 35], [1.4, 0]],
  },

  anchors: {
    base:  [[-5.2, -1], [-5.0, 33], [-6.6, 35], [-1.4, 33]],
    work:  [[-1.4, 9], [1.4, 9], [-1.4, 22], [1.4, 23], [-1.4, 26]],
    front: [[-5.2, -1], [-6.8, 0.6], [1.4, -1], [-1.4, 2], [1.4, 2]],
  },
};

export default plan;
