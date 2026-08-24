// plan.js — the Economic Advisory Building, as data.
//
// One corridor, four working rooms off it, and the rooms nobody works in that
// make it a building rather than a diagram. The place has a shape the campaign
// uses: the flow room and the model room are down one side, the statistics room
// and the policy desk down the other, so a number crosses the corridor twice
// between being counted and being acted on.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The flow room is open to the corridor and it is the largest room on the plan,
// because what is in it is a wall-sized board of the whole economy with the
// arrows drawn on it, and the point of that board is that people stand round it
// arguing rather than sitting at it.
//
// `ceiling: false`. A 1933 government building has plaster and pendant fittings,
// and a suspended tile grid is the loudest anachronism available in a room like
// this.

export const plan = {
  ceiling: false,

  metrics: {
    corridorHalfWidth: 2.0,
    roomDepth: 8.6,
    ceilingH: 3.8,
    tileH: 3.3,
    // A government building of the period: dark green paint to shoulder height,
    // buff distemper above it, brown linoleum, oak doors, brass fittings and a
    // great deal of paper. Darker than any of it looks on a swatch, which is
    // house rule 6 indoors.
    palette: {
      floorSpine: [72, 62, 48],
      floorRoom:  [66, 60, 50],
      wall:  '#c2bda2',
      base:  '#33463c',
      rail:  '#74603f',
      frame: '#8a7550',
      door:  '#41301e',
      signBand: '#4a3a2c',
    },
  },

  spine: { z0: -6, z1: 46 },

  rooms: [
    // West side: the board everybody argues at, and the model room at the far end
    // where the arithmetic is actually done.
    { id: 'PORCH', side: 'w', z0: -4, z1: 2,  name: "Porter's Room",   kind: 'reception', open: true },
    { id: 'FLOW',  side: 'w', z0: 4,  z1: 20, name: 'Flow Room',       kind: 'station',  group: 'FLOW', open: true },
    { id: 'TEA',   side: 'w', z0: 22, z1: 28, name: 'Common Room',     kind: 'waiting',  open: true },
    { id: 'MODEL', side: 'w', z0: 30, z1: 41, name: 'Model Room',      kind: 'workroom', group: 'MODEL', door: 'wide' },
    { id: 'RACK',  side: 'w', z0: 41, z1: 47, name: 'Stationery Store', kind: 'supply' },

    // East side: where the numbers come from at the near end and where they are
    // spent at the far end, with the whole corridor in between.
    { id: 'DUP',  side: 'e', z0: -4, z1: 3,  name: 'Duplicating Room', kind: 'supply' },
    { id: 'STAT', side: 'e', z0: 5,  z1: 18, name: 'Statistics Room',  kind: 'lab',     group: 'STAT', door: 'wide' },
    { id: 'DESK', side: 'e', z0: 20, z1: 33, name: 'Policy Desk',      kind: 'station', group: 'DESK', door: 'wide' },
    { id: 'LIB',  side: 'e', z0: 35, z1: 47, name: 'Library',          kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 3.5,  west: 'Flow Room',   east: 'Duplicating' },
    { z: 19.0, west: 'Common Room', east: 'Statistics' },
    { z: 34.0, west: 'Model Room',  east: 'Library' },
  ],

  // The common room. Seats are shared by the fit-out (which builds the chairs)
  // and the crowd (which sits people in them), so nobody hovers above a chair.
  seats: [
    [-5.0, 23.4, Math.PI / 2], [-5.0, 24.8, Math.PI / 2], [-5.0, 26.2, Math.PI / 2],
    [-8.4, 23.4, -Math.PI / 2], [-8.4, 24.8, -Math.PI / 2], [-8.4, 26.2, -Math.PI / 2],
    [-6.6, 27.4, 0], [-5.4, 27.4, 0],
  ],

  spots: {
    spine: [
      [-1.35, -3], [1.35, -1], [-1.35, 2], [1.35, 5], [-1.35, 8], [1.35, 11],
      [-1.35, 14], [1.35, 17], [-1.35, 20], [1.35, 23], [-1.35, 26], [1.35, 29],
      [-1.35, 32], [1.35, 35], [-1.35, 38], [1.35, 41], [-1.35, 44],
    ],
    open: [[-5.4, 0], [-7.0, 1.6], [-5.0, 25], [-6.6, 27], [-5.6, 12]],
  },

  anchors: {
    // Where the day sends people. `base` is the porter's room and the common
    // room, `work` the corridor outside the four working rooms, `front` the way in.
    base:  [[-5.4, 0], [-5.0, 25], [-6.6, 27], [-1.35, 25]],
    work:  [[-1.35, 12], [1.35, 11], [-1.35, 35], [1.35, 26], [-1.35, 38]],
    front: [[-5.4, 0], [-7.0, 1.6], [1.35, -1], [-1.35, 2], [1.35, 2]],
  },
};

export default plan;
