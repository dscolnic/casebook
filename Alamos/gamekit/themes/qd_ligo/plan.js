// plan.js — the interferometer corner station, as data.
//
// One corridor, four rooms, and the layout is the argument: the instrument is on
// one side, everything that is not the instrument is on the other, and the room
// that interprets a signal is at the far end with no instrument in it at all.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The isolation bay is the deepest room on the plan, because a suspension stack
// is four storeys of nothing on top of each other and a room the size of an
// office reads as an office with a spring in it. The optics lab has its two
// windows on the outer wall at right angles to each other, which is where the
// arms leave the building.

export const plan = {
  metrics: {
    corridorHalfWidth: 2.0,
    roomDepth: 9.0,
    ceilingH: 4.2,
    tileH: 3.8,
    // A working technical building: sealed epoxy floor, pale grey walls, dark
    // grey base, steel trim. Two stops darker than looks right on the canvas.
    palette: {
      floorSpine: [70, 74, 78],
      floorRoom:  [64, 68, 72],
      wall:  '#a8aeb2',
      base:  '#262b30',
      rail:  '#697076',
      frame: '#7c848a',
      door:  '#3f464c',
      signBand: '#1c3f52',
    },
  },

  spine: { z0: -6, z1: 48 },

  rooms: [
    { id: 'PORCH', side: 'w', z0: -4, z1: 2,  name: 'Entrance Desk',    kind: 'reception', open: true },
    { id: 'OPTICS', side: 'w', z0: 4,  z1: 18, name: 'Optics Lab',      kind: 'lab',      group: 'OPTICS', door: 'wide' },
    { id: 'TEA',    side: 'w', z0: 20, z1: 26, name: 'Coffee Area',     kind: 'waiting',  open: true },
    { id: 'PARAM',  side: 'w', z0: 28, z1: 40, name: 'Parameter Room',  kind: 'station',  group: 'PARAM', door: 'wide' },
    { id: 'RACK',   side: 'w', z0: 40, z1: 47, name: 'Store',           kind: 'supply' },

    { id: 'DARK', side: 'e', z0: -4, z1: 4,  name: 'Calibration Bay',   kind: 'supply' },
    { id: 'ISOL', side: 'e', z0: 6,  z1: 22, name: 'Isolation Bay',     kind: 'workroom', group: 'ISOL', door: 'wide' },
    { id: 'CTRL', side: 'e', z0: 24, z1: 36, name: 'Control Room',      kind: 'lab',      group: 'CTRL', door: 'wide' },
    { id: 'LIB',  side: 'e', z0: 38, z1: 47, name: 'Reading Room',      kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 3.0,  west: 'Optics',        east: 'Calibration' },
    { z: 23.0, west: 'Coffee',        east: 'Isolation' },
    { z: 37.0, west: 'Parameters',    east: 'Control' },
    { z: 43.0, west: 'Store',         east: 'Reading Room' },
  ],

  seats: [
    [-5.0, 21.2, Math.PI / 2], [-5.0, 22.6, Math.PI / 2], [-5.0, 24.0, Math.PI / 2],
    [-8.6, 21.2, -Math.PI / 2], [-8.6, 22.6, -Math.PI / 2], [-8.6, 24.0, -Math.PI / 2],
    [-6.8, 25.2, 0], [-5.6, 25.2, 0],
  ],

  spots: {
    spine: [
      [-1.45, -3], [1.45, -1], [-1.45, 2], [1.45, 5], [-1.45, 8], [1.45, 11],
      [-1.45, 14], [1.45, 17], [-1.45, 20], [1.45, 23], [-1.45, 26], [1.45, 29],
      [-1.45, 32], [1.45, 35], [-1.45, 38], [1.45, 41], [-1.45, 44],
    ],
    open: [[-5.2, 0], [-6.8, 1.4], [-5.0, 22], [-6.8, 24], [1.45, 1]],
  },

  anchors: {
    base:  [[-5.2, 0], [-5.0, 22], [-6.8, 24], [-1.45, 22]],
    work:  [[-1.45, 11], [1.45, 14], [1.45, 30], [-1.45, 34], [-1.45, 38]],
    front: [[-5.2, 0], [-6.8, 1.4], [1.45, -1], [-1.45, 2], [1.45, 2]],
  },
};

export default plan;
