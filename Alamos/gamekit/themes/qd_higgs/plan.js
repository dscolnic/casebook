// plan.js — the collider analysis floor, as data.
//
// One corridor, four working rooms, and the shape of it is the analysis chain:
// theory at the near end, the event display beside it, the histograms further
// down, and the combination room at the far end where the two channels finally
// meet. Walking the corridor walks one collision from a wall chart to a sentence.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The event display room is deliberately deep and has no window on the plan: an
// event display is read in the dark, and a room with daylight in it is an office
// with a screen in it. The histogram room is the widest, because its long wall is
// the distribution.

export const plan = {
  metrics: {
    corridorHalfWidth: 1.9,
    roomDepth: 8.4,
    ceilingH: 3.2,
    tileH: 2.9,
    // A modern laboratory, and still not white: pale grey-blue walls over a dark
    // grey base, birch trim, dark rubber floor. Two stops darker than looks right
    // on the canvas, which is house rule 6 arriving indoors.
    palette: {
      floorSpine: [78, 82, 88],
      floorRoom:  [72, 78, 84],
      wall:  '#aeb6bd',
      base:  '#2b3138',
      rail:  '#6a737c',
      frame: '#8d8168',
      door:  '#4a5259',
      signBand: '#1f4a63',
    },
  },

  spine: { z0: -6, z1: 46 },

  rooms: [
    { id: 'PORCH', side: 'w', z0: -4, z1: 2,  name: 'Entrance Desk',     kind: 'reception', open: true },
    { id: 'CHART', side: 'w', z0: 4,  z1: 16, name: 'Theory Wall',       kind: 'station',  group: 'CHART', open: true },
    { id: 'TEA',   side: 'w', z0: 18, z1: 24, name: 'Coffee Area',       kind: 'waiting',  open: true },
    { id: 'STATS', side: 'w', z0: 26, z1: 38, name: 'Combination Room',  kind: 'workroom', group: 'STATS', door: 'wide' },
    { id: 'RACK',  side: 'w', z0: 38, z1: 45, name: 'Computing Store',   kind: 'supply' },

    { id: 'DARK',  side: 'e', z0: -4, z1: 4,  name: 'Calibration Bay',   kind: 'supply' },
    { id: 'EVENT', side: 'e', z0: 6,  z1: 19, name: 'Event Display',     kind: 'lab',      group: 'EVENT', door: 'wide' },
    { id: 'HIST',  side: 'e', z0: 21, z1: 34, name: 'Histogram Room',    kind: 'lab',      group: 'HIST',  door: 'wide' },
    { id: 'LIB',   side: 'e', z0: 36, z1: 45, name: 'Reading Room',      kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 3.0,  west: 'Theory',      east: 'Calibration' },
    { z: 20.0, west: 'Coffee',      east: 'Event Display' },
    { z: 35.0, west: 'Combination', east: 'Histograms' },
    { z: 41.0, west: 'Computing',   east: 'Reading Room' },
  ],

  seats: [
    [-4.8, 19.2, Math.PI / 2], [-4.8, 20.6, Math.PI / 2], [-4.8, 22.0, Math.PI / 2],
    [-8.2, 19.2, -Math.PI / 2], [-8.2, 20.6, -Math.PI / 2], [-8.2, 22.0, -Math.PI / 2],
    [-6.4, 23.2, 0], [-5.2, 23.2, 0],
  ],

  spots: {
    spine: [
      [-1.35, -3], [1.35, -1], [-1.35, 2], [1.35, 5], [-1.35, 8], [1.35, 11],
      [-1.35, 14], [1.35, 17], [-1.35, 20], [1.35, 23], [-1.35, 26], [1.35, 29],
      [-1.35, 32], [1.35, 35], [-1.35, 38], [1.35, 41],
    ],
    open: [[-5.0, 0], [-6.6, 1.4], [-4.8, 20], [-6.4, 22], [-5.4, 9], [-7.0, 12]],
  },

  anchors: {
    base:  [[-5.0, 0], [-4.8, 20], [-6.4, 22], [-1.35, 20]],
    work:  [[-5.4, 10], [1.35, 12], [1.35, 27], [-1.35, 31], [-1.35, 34]],
    front: [[-5.0, 0], [-6.6, 1.4], [1.35, -1], [-1.35, 2], [1.35, 2]],
  },
};

export default plan;
