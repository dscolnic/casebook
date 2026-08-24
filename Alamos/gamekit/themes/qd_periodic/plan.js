// plan.js — the Chemistry Institute, as data.
//
// One corridor, four working rooms off it, and the rooms nobody works in that
// make it a building rather than a diagram. The place has a shape the campaign
// uses: the specimens and the card desk are down one side, the analysis bench
// and the lecture hall down the other, so every card carried from the drawers to
// the desk crosses the corridor and every claim crosses it again to be defended.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The specimen store is the deepest room on the plan, because it is a wall of
// numbered drawers with room to open one and a bench to put it down on. A store
// of sixty-three elements in a room the size of an office is a cupboard, and
// this campaign begins with somebody pulling drawers out and laying cards on a
// table.
//
// `ceiling: false`, as in the pneumatic laboratory. A suspended tile grid over an
// 1869 institute is the loudest anachronism available and it is invisible in
// every check — geometry, collision and lighting are identical either way.

export const plan = {
  ceiling: false,

  metrics: {
    corridorHalfWidth: 1.9,
    roomDepth: 8.2,
    ceilingH: 4.1,
    tileH: 3.5,
    // A well-funded imperial institute: dark green distemper above a panelled
    // dado, parquet, mahogany, brass, and a plaster cornice that catches the
    // daylight. Every one of these is darker than it looks on a swatch, which is
    // house rule 6 indoors — the first cut of this corridor was mint green and
    // read as a school.
    palette: {
      // Parquet. Two stops below what a wood swatch looks like, because the floor
      // is the largest surface in a corridor frame and a mid value there renders
      // as pale sheet vinyl under ACES.
      floorSpine: [62, 46, 28],
      floorRoom:  [56, 44, 30],
      wall:  '#b9bda6',
      base:  '#2c3a30',
      rail:  '#6f5a3c',
      frame: '#7e6540',
      door:  '#43301d',
      signBand: '#5a3b2a',
    },
  },

  spine: { z0: -6, z1: 46 },

  rooms: [
    // West side: the drawers nearest the door because everything comes out of
    // them, and the card desk at the far end where the table is long enough.
    { id: 'PORCH', side: 'w', z0: -4, z1: 2,  name: "Porter's Room",  kind: 'reception', open: true },
    { id: 'SPEC',  side: 'w', z0: 4,  z1: 18, name: 'Specimen Store', kind: 'lab',      group: 'SPEC', door: 'wide' },
    { id: 'TEA',   side: 'w', z0: 20, z1: 26, name: 'Common Room',    kind: 'waiting',  open: true },
    { id: 'CARDS', side: 'w', z0: 28, z1: 40, name: 'Card Desk',      kind: 'station',  group: 'CARDS', door: 'wide' },
    { id: 'RACK',  side: 'w', z0: 40, z1: 46, name: 'Reagent Store',  kind: 'supply' },

    // East side: the balance room by the door, the bench in the middle, and the
    // lecture hall at the far end facing the card desk across the corridor.
    { id: 'WEIGH', side: 'e', z0: -4, z1: 4,  name: 'Weighing Room',  kind: 'supply' },
    { id: 'BENCH', side: 'e', z0: 6,  z1: 20, name: 'Analysis Bench', kind: 'lab',      group: 'BENCH', door: 'wide' },
    { id: 'HALL',  side: 'e', z0: 22, z1: 38, name: 'Lecture Hall',   kind: 'workroom', group: 'HALL',  door: 'wide' },
    { id: 'LIB',   side: 'e', z0: 40, z1: 46, name: 'Library',        kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 3.5,  west: 'Specimens', east: 'Weighing' },
    { z: 21.0, west: 'Common Room', east: 'Bench' },
    { z: 39.0, west: 'Card Desk', east: 'Lecture Hall' },
  ],

  // The common room. Seats are shared by the fit-out (which builds the chairs)
  // and the crowd (which sits people in them), so nobody hovers above a chair.
  seats: [
    [-4.8, 21.4, Math.PI / 2], [-4.8, 22.8, Math.PI / 2], [-4.8, 24.2, Math.PI / 2],
    [-8.0, 21.4, -Math.PI / 2], [-8.0, 22.8, -Math.PI / 2], [-8.0, 24.2, -Math.PI / 2],
    [-6.4, 25.4, 0], [-5.2, 25.4, 0],
  ],

  spots: {
    spine: [
      [-1.3, -3], [1.3, -1], [-1.3, 2], [1.3, 5], [-1.3, 8], [1.3, 11],
      [-1.3, 14], [1.3, 17], [-1.3, 20], [1.3, 23], [-1.3, 26], [1.3, 29],
      [-1.3, 32], [1.3, 35], [-1.3, 38], [1.3, 41], [-1.3, 44],
    ],
    open: [[-5.2, 0], [-6.8, 1.6], [-4.8, 23], [-6.4, 25], [1.3, 1]],
  },

  anchors: {
    // Where the day sends people. `base` is the porter's room and the common
    // room, `work` the corridor outside the four working rooms, `front` the way in.
    base:  [[-5.2, 0], [-4.8, 23], [-6.4, 25], [-1.3, 23]],
    work:  [[-1.3, 11], [1.3, 13], [-1.3, 34], [1.3, 30], [-1.3, 38]],
    front: [[-5.2, 0], [-6.8, 1.6], [1.3, -1], [-1.3, 2], [1.3, 2]],
  },
};

export default plan;
