// plan.js — the Structural Biology Unit, as data.
//
// One corridor, four working rooms off it, and the two rooms nobody works in
// that make it a building rather than a diagram. The place has a shape the
// campaign uses: the chemistry bench and the model room are down one side, the
// X-ray room and the evidence room down the other, and the walk between them is
// what a clue crossing the corridor costs. Every level of the campaign sends the
// player across it at least once.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The X-ray room is deliberately the deepest room on the plan: a fibre camera
// needs a long run at a small target, and a room that is as shallow as an office
// reads as an office with a machine in it.

export const plan = {
  metrics: {
    corridorHalfWidth: 1.7,
    roomDepth: 7.2,
    ceilingH: 3.15,
    tileH: 2.8,
    // A 1950s university building: cream distemper above a dark dado, oak doors,
    // brass fittings, brown linoleum — and every one of those darker than looks
    // right on the canvas, which is house rule 6 arriving
    // indoors: under ACES with the environment lifting everything, a mid albedo
    // renders near-white and the first version of this building read as a
    // hospital corridor — white vinyl, pale walls, and nothing of 1952 in it.
    // Brown linoleum, distemper over a dark dado, oak doors, brass.
    palette: {
      floorSpine: [124, 108, 84],
      floorRoom:  [94, 92, 78],
      wall:  '#c6bca2',
      base:  '#3a3127',
      rail:  '#7a6b52',
      frame: '#8a7550',
      door:  '#573e26',
      signBand: '#33463a',
    },
  },

  spine: { z0: -6, z1: 44 },

  rooms: [
    // West side: the wet chemistry at the near end, the workshop at the far end.
    { id: 'PORCH', side: 'w', z0: -4, z1: 3,  name: 'Porter\'s Desk',      kind: 'reception', open: true },
    { id: 'CHEM',  side: 'w', z0: 5,  z1: 15, name: 'Chemistry Bench',     kind: 'lab',      group: 'CHEM' },
    { id: 'TEA',   side: 'w', z0: 17, z1: 23, name: 'Tea Room',            kind: 'waiting',  open: true },
    { id: 'MODEL', side: 'w', z0: 25, z1: 37, name: 'Model Room',          kind: 'workroom', group: 'MODEL', door: 'wide' },
    { id: 'RACK',  side: 'w', z0: 37, z1: 43, name: 'Brass Store',         kind: 'supply' },

    // East side: the camera at the near end so the beam run is off the entrance,
    // the wall the whole unit argues at the far end facing the workshop door.
    { id: 'XRAY',  side: 'e', z0: -4, z1: 12, name: 'X-ray Room',          kind: 'lab',      group: 'XRAY',  door: 'wide' },
    { id: 'DARK',  side: 'e', z0: 12, z1: 18, name: 'Dark Room',           kind: 'supply' },
    { id: 'BOARD', side: 'e', z0: 20, z1: 32, name: 'Evidence Room',       kind: 'station',  group: 'BOARD', door: 'wide' },
    { id: 'LIB',   side: 'e', z0: 34, z1: 43, name: 'Reading Room',        kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 4.0,  west: 'Chemistry',   east: 'X-ray' },
    { z: 19.0, west: 'Tea Room',    east: 'Dark Room' },
    { z: 33.0, west: 'Model Room',  east: 'Reading Room' },
  ],

  // The tea room. Seats are shared by the fit-out (which builds the chairs) and
  // the crowd (which sits people in them), so nobody hovers above a chair.
  seats: [
    [-4.4, 18.4, Math.PI / 2], [-4.4, 19.8, Math.PI / 2], [-4.4, 21.2, Math.PI / 2],
    [-7.6, 18.4, -Math.PI / 2], [-7.6, 19.8, -Math.PI / 2], [-7.6, 21.2, -Math.PI / 2],
    [-6.0, 22.4, 0], [-4.8, 22.4, 0],
  ],

  spots: {
    spine: [
      [-1.15, -3], [1.15, -1], [-1.15, 2], [1.15, 5], [-1.15, 8], [1.15, 11],
      [-1.15, 14], [1.15, 17], [-1.15, 20], [1.15, 23], [-1.15, 26], [1.15, 29],
      [-1.15, 32], [1.15, 35], [-1.15, 38], [1.15, 41],
    ],
    open: [[-4.8, 0], [-6.4, 1.8], [-4.4, 20], [-6.0, 22], [1.15, 1]],
  },

  anchors: {
    // Where the day sends people. `base` is the porter's desk and the tea room,
    // `work` the corridor outside the four working rooms, `front` the entrance.
    base:  [[-4.8, 0], [-4.4, 20], [-6.0, 22], [-1.15, 20]],
    work:  [[-1.15, 10], [1.15, 6], [-1.15, 30], [1.15, 26], [-1.15, 35]],
    front: [[-4.8, 0], [-6.4, 1.8], [1.15, -1], [-1.15, 2], [1.15, 2]],
  },
};

export default plan;
