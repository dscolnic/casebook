// plan.js — the Global Survey Section, as data.
//
// One corridor with the land evidence down one side and the sea evidence down the
// other, which is the campaign's own division: level one is everything collected
// on land, level two is ten years of ships, and level three is the room at the far
// end that has no data in it at all.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The map room is the widest room on the plan and it is `open`, so the corridor
// runs into it rather than past a door. That is the one thing that makes this
// building read differently from a laboratory: the first thing anybody walking in
// meets is thirty feet of continents on pins, with no wall in the way.

export const plan = {
  metrics: {
    corridorHalfWidth: 2.1,
    roomDepth: 9.0,
    ceilingH: 3.4,
    tileH: 3.0,
    // A postwar government survey building: grey-green lino, buff walls, oak
    // trim, and everything two stops darker than looks right on the canvas.
    palette: {
      floorSpine: [98, 100, 88],
      floorRoom:  [88, 94, 86],
      wall:  '#bdb9a4',
      base:  '#33403a',
      rail:  '#6f6a52',
      frame: '#7e7454',
      door:  '#4e3d26',
      signBand: '#2f4a55',
    },
  },

  spine: { z0: -6, z1: 48 },

  rooms: [
    // West: the land evidence, then the room where it is all put together.
    { id: 'PORCH', side: 'w', z0: -4, z1: 2,  name: 'Porter\'s Desk',   kind: 'reception', open: true },
    { id: 'MAP',   side: 'w', z0: 4,  z1: 20, name: 'Map Room',         kind: 'station',  group: 'MAP', open: true },
    { id: 'TEA',   side: 'w', z0: 22, z1: 28, name: 'Tea Room',         kind: 'waiting',  open: true },
    { id: 'MODEL', side: 'w', z0: 30, z1: 41, name: 'Kinematics Room',  kind: 'workroom', group: 'MODEL', door: 'wide' },
    { id: 'RACK',  side: 'w', z0: 41, z1: 47, name: 'Chart Store',      kind: 'supply' },

    // East: ten years of ships, and then the wall of earthquakes.
    { id: 'DARK',   side: 'e', z0: -4, z1: 3,  name: 'Photographic Room', kind: 'supply' },
    { id: 'MARINE', side: 'e', z0: 5,  z1: 18, name: 'Marine Survey',     kind: 'lab',     group: 'MARINE', door: 'wide' },
    { id: 'SEIS',   side: 'e', z0: 20, z1: 33, name: 'Seismology',        kind: 'lab',     group: 'SEIS',   door: 'wide' },
    { id: 'LIB',    side: 'e', z0: 35, z1: 47, name: 'Reading Room',      kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 3.0,  west: 'Map Room',    east: 'Photographic' },
    { z: 19.0, west: 'Tea Room',    east: 'Marine Survey' },
    { z: 34.0, west: 'Kinematics',  east: 'Seismology' },
    { z: 43.0, west: 'Chart Store', east: 'Reading Room' },
  ],

  seats: [
    [-5.2, 23.2, Math.PI / 2], [-5.2, 24.6, Math.PI / 2], [-5.2, 26.0, Math.PI / 2],
    [-8.8, 23.2, -Math.PI / 2], [-8.8, 24.6, -Math.PI / 2], [-8.8, 26.0, -Math.PI / 2],
    [-7.0, 27.2, 0], [-5.8, 27.2, 0],
  ],

  spots: {
    spine: [
      [-1.5, -3], [1.5, -1], [-1.5, 2], [1.5, 5], [-1.5, 8], [1.5, 11],
      [-1.5, 14], [1.5, 17], [-1.5, 20], [1.5, 23], [-1.5, 26], [1.5, 29],
      [-1.5, 32], [1.5, 35], [-1.5, 38], [1.5, 41], [-1.5, 44],
    ],
    open: [[-5.4, 0], [-7.0, 1.6], [-5.2, 24], [-7.0, 26], [-5.6, 10], [-7.2, 14]],
  },

  anchors: {
    base:  [[-5.4, 0], [-5.2, 24], [-7.0, 26], [-1.5, 24]],
    work:  [[-5.6, 12], [1.5, 11], [1.5, 26], [-1.5, 35], [-1.5, 38]],
    front: [[-5.4, 0], [-7.0, 1.6], [1.5, -1], [-1.5, 2], [1.5, 2]],
  },
};

export default plan;
