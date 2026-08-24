// plan.js — the mountain observatory's working floor, as data.
//
// One corridor, four rooms, and the layout is the argument: the two axes of the
// plot are measured on opposite sides of it, by different people, on different
// nights, and the room where they finally meet is at the far end.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The plate vault is the deepest room on the plan because years of glass in
// numbered drawers is what it holds, and the diagram room is the widest because
// its long wall is one plot.

export const plan = {
  metrics: {
    corridorHalfWidth: 1.8,
    roomDepth: 8.0,
    ceilingH: 3.4,
    tileH: 3.1,
    // A 1920s mountain observatory: dark stained boarding, cream distemper above
    // a dado, oak doors, cork floor. Two stops darker than looks right on the
    // canvas, which is house rule 6 arriving indoors.
    palette: {
      floorSpine: [88, 74, 58],
      floorRoom:  [80, 72, 60],
      wall:  '#c0b49b',
      base:  '#38302a',
      rail:  '#75654c',
      frame: '#846f4c',
      door:  '#4c3822',
      signBand: '#2e3d48',
    },
  },

  spine: { z0: -6, z1: 44 },

  rooms: [
    { id: 'PORCH',   side: 'w', z0: -4, z1: 2,  name: 'Entrance Desk',        kind: 'reception', open: true },
    { id: 'PLATES',  side: 'w', z0: 4,  z1: 18, name: 'Plate Vault',          kind: 'lab',      group: 'PLATES', door: 'wide' },
    { id: 'TEA',     side: 'w', z0: 20, z1: 26, name: 'Common Room',          kind: 'waiting',  open: true },
    { id: 'DIAGRAM', side: 'w', z0: 28, z1: 39, name: 'Diagram Room',         kind: 'station',  group: 'DIAGRAM', door: 'wide' },
    { id: 'RACK',    side: 'w', z0: 39, z1: 43, name: 'Plate Store',          kind: 'supply' },

    { id: 'DARK',   side: 'e', z0: -4, z1: 3,  name: 'Darkroom',              kind: 'supply' },
    { id: 'SPEC',   side: 'e', z0: 5,  z1: 18, name: 'Spectrograph Room',     kind: 'lab',      group: 'SPEC', door: 'wide' },
    { id: 'LADDER', side: 'e', z0: 20, z1: 31, name: 'Ladder Desk',           kind: 'workroom', group: 'LADDER' },
    { id: 'LIB',    side: 'e', z0: 33, z1: 43, name: 'Library',               kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 3.0,  west: 'Plate Vault',  east: 'Darkroom' },
    { z: 19.0, west: 'Common Room',  east: 'Spectrograph' },
    { z: 32.0, west: 'Diagram Room', east: 'Ladder Desk' },
    { z: 40.0, west: 'Plate Store',  east: 'Library' },
  ],

  seats: [
    [-4.7, 21.2, Math.PI / 2], [-4.7, 22.6, Math.PI / 2], [-4.7, 24.0, Math.PI / 2],
    [-7.9, 21.2, -Math.PI / 2], [-7.9, 22.6, -Math.PI / 2], [-7.9, 24.0, -Math.PI / 2],
    [-6.2, 25.2, 0], [-5.0, 25.2, 0],
  ],

  spots: {
    spine: [
      [-1.25, -3], [1.25, -1], [-1.25, 2], [1.25, 5], [-1.25, 8], [1.25, 11],
      [-1.25, 14], [1.25, 17], [-1.25, 20], [1.25, 23], [-1.25, 26], [1.25, 29],
      [-1.25, 32], [1.25, 35], [-1.25, 38], [1.25, 41],
    ],
    open: [[-4.9, 0], [-6.5, 1.4], [-4.7, 22], [-6.2, 24], [1.25, 1]],
  },

  anchors: {
    base:  [[-4.9, 0], [-4.7, 22], [-6.2, 24], [-1.25, 22]],
    work:  [[-1.25, 11], [1.25, 11], [1.25, 25], [-1.25, 33], [-1.25, 36]],
    front: [[-4.9, 0], [-6.5, 1.4], [1.25, -1], [-1.25, 2], [1.25, 2]],
  },
};

export default plan;
