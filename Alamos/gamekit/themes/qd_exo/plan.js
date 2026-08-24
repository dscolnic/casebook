// plan.js — the planet search programme's floor, as data.
//
// One corridor, four rooms, and the layout is the argument: the two instruments
// that detect the planet are on opposite sides of it and share nothing, which is
// the whole reason their agreeing on one period counts for anything. The room
// that combines them is at the far end and has no instrument in it at all.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The photometry room is the widest room on the plan because its long wall is a
// month of light curve at one metre a night, and the tape room is beside it
// rather than across the corridor because raw frames are carried by hand.

export const plan = {
  metrics: {
    corridorHalfWidth: 1.85,
    roomDepth: 8.2,
    ceilingH: 3.1,
    tileH: 2.85,
    // A mountain-station office block: warm grey walls, dark cork floor, ash
    // trim. Two stops darker than looks right on the canvas — house rule 6
    // applies indoors as well.
    palette: {
      floorSpine: [86, 78, 70],
      floorRoom:  [78, 74, 68],
      wall:  '#b6ada2',
      base:  '#332e2a',
      rail:  '#6f665c',
      frame: '#8b7c60',
      door:  '#4d4038',
      signBand: '#274a4f',
    },
  },

  spine: { z0: -6, z1: 44 },

  rooms: [
    { id: 'PORCH', side: 'w', z0: -4, z1: 2,  name: 'Entrance Desk',           kind: 'reception', open: true },
    { id: 'SPEC',  side: 'w', z0: 4,  z1: 16, name: 'Spectrograph Room',       kind: 'lab',      group: 'SPEC', door: 'wide' },
    { id: 'TEA',   side: 'w', z0: 18, z1: 24, name: 'Coffee Area',             kind: 'waiting',  open: true },
    { id: 'CLASS', side: 'w', z0: 26, z1: 37, name: 'Characterisation Desk',   kind: 'station',  group: 'CLASS', door: 'wide' },
    { id: 'RACK',  side: 'w', z0: 37, z1: 43, name: 'Store',                   kind: 'supply' },

    { id: 'DARK',   side: 'e', z0: -4, z1: 3,  name: 'Tape Room',              kind: 'supply' },
    { id: 'PHOT',   side: 'e', z0: 5,  z1: 19, name: 'Survey Photometry',      kind: 'lab',      group: 'PHOT', door: 'wide' },
    { id: 'FOLLOW', side: 'e', z0: 21, z1: 32, name: 'Validation Room',        kind: 'workroom', group: 'FOLLOW' },
    { id: 'LIB',    side: 'e', z0: 34, z1: 43, name: 'Reading Room',           kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 3.0,  west: 'Spectrograph', east: 'Tape Room' },
    { z: 20.0, west: 'Coffee',       east: 'Photometry' },
    { z: 33.0, west: 'Characterise', east: 'Validation' },
    { z: 40.0, west: 'Store',        east: 'Reading Room' },
  ],

  seats: [
    [-4.7, 19.2, Math.PI / 2], [-4.7, 20.6, Math.PI / 2], [-4.7, 22.0, Math.PI / 2],
    [-8.0, 19.2, -Math.PI / 2], [-8.0, 20.6, -Math.PI / 2], [-8.0, 22.0, -Math.PI / 2],
    [-6.3, 23.2, 0], [-5.1, 23.2, 0],
  ],

  spots: {
    spine: [
      [-1.3, -3], [1.3, -1], [-1.3, 2], [1.3, 5], [-1.3, 8], [1.3, 11],
      [-1.3, 14], [1.3, 17], [-1.3, 20], [1.3, 23], [-1.3, 26], [1.3, 29],
      [-1.3, 32], [1.3, 35], [-1.3, 38], [1.3, 41],
    ],
    open: [[-4.9, 0], [-6.5, 1.4], [-4.7, 20], [-6.3, 22], [1.3, 1]],
  },

  anchors: {
    base:  [[-4.9, 0], [-4.7, 20], [-6.3, 22], [-1.3, 20]],
    work:  [[-1.3, 10], [1.3, 12], [1.3, 26], [-1.3, 31], [-1.3, 34]],
    front: [[-4.9, 0], [-6.5, 1.4], [1.3, -1], [-1.3, 2], [1.3, 2]],
  },
};

export default plan;
