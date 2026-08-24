// plan.js — the Inoculation Department, as data.
//
// One corridor, four working rooms off it, and the rooms nobody works in that
// make it a hospital department rather than a diagram. The place has a shape the
// campaign uses: the plates and the broth are down one side, the assay and the
// trial room down the other, so every result crosses the corridor at least once
// before anybody is allowed to believe it.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The assay room is the deepest room on the plan. A rack of dilutions read
// against one standard lawn needs bench run, and an assay squeezed into an
// office reads as an office with a rack in it.

export const plan = {
  metrics: {
    corridorHalfWidth: 1.75,
    roomDepth: 7.4,
    ceilingH: 3.3,
    tileH: 2.9,
    // An interwar hospital laboratory: brown linoleum, hospital green to the
    // dado, cream distemper above it, oak doors, white glazed tile in the wet
    // rooms — and every one of those darker than looks right on the canvas,
    // which is house rule 6 arriving indoors. Under ACES with the environment
    // lifting everything, a mid albedo renders near-white, and the first cut of
    // this building read as a modern clinic corridor with nothing of 1928 in it.
    palette: {
      floorSpine: [116, 96, 74],
      floorRoom:  [98, 100, 88],
      wall:  '#cfc7ad',
      base:  '#33443a',
      rail:  '#77694f',
      frame: '#8b7752',
      door:  '#4e3a24',
      signBand: '#5a2f2c',
    },
  },

  spine: { z0: -6, z1: 44 },

  rooms: [
    // West side: the plates at the near end, the broth room at the far end, so
    // the warm cupboard is as far from the front door as the building allows.
    { id: 'PORCH', side: 'w', z0: -4, z1: 3,  name: 'Porter\'s Desk', kind: 'reception', open: true },
    { id: 'CULT',  side: 'w', z0: 5,  z1: 15, name: 'Culture Room',   kind: 'lab',      group: 'CULT' },
    { id: 'TEA',   side: 'w', z0: 17, z1: 23, name: 'Tea Room',       kind: 'waiting',  open: true },
    { id: 'BROTH', side: 'w', z0: 25, z1: 37, name: 'Broth Room',     kind: 'workroom', group: 'BROTH', door: 'wide' },
    { id: 'RACK',  side: 'w', z0: 37, z1: 43, name: 'Media Store',    kind: 'supply' },

    // East side: the assay at the near end because everything comes to it, the
    // trial room at the far end facing the broth room door.
    { id: 'ASSAY', side: 'e', z0: -4, z1: 12, name: 'Assay Room',       kind: 'lab',     group: 'ASSAY', door: 'wide' },
    { id: 'STER',  side: 'e', z0: 12, z1: 18, name: 'Sterilising Room', kind: 'supply' },
    { id: 'TRIAL', side: 'e', z0: 20, z1: 32, name: 'Trial Room',       kind: 'station', group: 'TRIAL', door: 'wide' },
    { id: 'LIB',   side: 'e', z0: 34, z1: 43, name: 'Reading Room',     kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 4.0,  west: 'Cultures',   east: 'Assay' },
    { z: 19.0, west: 'Tea Room',   east: 'Sterilising' },
    { z: 33.0, west: 'Broth Room', east: 'Reading Room' },
  ],

  // The tea room. Seats are shared by the fit-out (which builds the chairs) and
  // the crowd (which sits people in them), so nobody hovers above a chair.
  seats: [
    [-4.5, 18.4, Math.PI / 2], [-4.5, 19.8, Math.PI / 2], [-4.5, 21.2, Math.PI / 2],
    [-7.7, 18.4, -Math.PI / 2], [-7.7, 19.8, -Math.PI / 2], [-7.7, 21.2, -Math.PI / 2],
    [-6.1, 22.4, 0], [-4.9, 22.4, 0],
  ],

  spots: {
    spine: [
      [-1.2, -3], [1.2, -1], [-1.2, 2], [1.2, 5], [-1.2, 8], [1.2, 11],
      [-1.2, 14], [1.2, 17], [-1.2, 20], [1.2, 23], [-1.2, 26], [1.2, 29],
      [-1.2, 32], [1.2, 35], [-1.2, 38], [1.2, 41],
    ],
    open: [[-4.9, 0], [-6.5, 1.8], [-4.5, 20], [-6.1, 22], [1.2, 1]],
  },

  anchors: {
    // Where the day sends people. `base` is the porter's desk and the tea room,
    // `work` the corridor outside the four working rooms, `front` the entrance.
    base:  [[-4.9, 0], [-4.5, 20], [-6.1, 22], [-1.2, 20]],
    work:  [[-1.2, 10], [1.2, 6], [-1.2, 30], [1.2, 26], [-1.2, 35]],
    front: [[-4.9, 0], [-6.5, 1.8], [1.2, -1], [-1.2, 2], [1.2, 2]],
  },
};

export default plan;
