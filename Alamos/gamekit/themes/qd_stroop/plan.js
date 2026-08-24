// plan.js — the reaction-time laboratory, as data.
//
// One corridor, four working rooms off it, and the rooms nobody works in that
// make it a building rather than a diagram. The place has a shape the campaign
// uses: the booth and the tabulation room are down one side, the chronoscope
// bench and the distribution wall down the other, so a time measured in one room
// crosses the corridor twice before it becomes a difference anybody argues about.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The distribution wall is the deepest room on the plan. Eight hundred times
// plotted as a distribution needs wall, and a histogram in a room the size of an
// office is a graph rather than a wall of data — which is the difference the
// third level is about.
//
// `ceiling: false`. A 1935 university building has a plastered ceiling with
// pendant fittings under it and no tile grid, and the grid is the loudest
// anachronism available in a room like this.

export const plan = {
  ceiling: false,

  metrics: {
    corridorHalfWidth: 1.85,
    roomDepth: 8.0,
    ceilingH: 3.7,
    tileH: 3.2,
    // An interwar psychology department: buff distemper above a brown dado,
    // brown linoleum, dark oak doors, black bakelite instruments and green glass
    // shades. Darker than any of it looks on a swatch, which is house rule 6
    // indoors — the first cut of this corridor was cream and read as a modern
    // clinic with old furniture in it.
    palette: {
      floorSpine: [78, 62, 46],
      floorRoom:  [72, 60, 48],
      wall:  '#c4bb9e',
      base:  '#42342a',
      rail:  '#6f5b3e',
      frame: '#867049',
      door:  '#402d1c',
      signBand: '#2f3f4a',
    },
  },

  spine: { z0: -6, z1: 44 },

  rooms: [
    // West side: the booth near the door so a participant does not walk the
    // building, and the tabulation room at the far end where the noise is not.
    { id: 'PORCH', side: 'w', z0: -4, z1: 2,  name: 'Entrance Desk',    kind: 'reception', open: true },
    { id: 'BOOTH', side: 'w', z0: 4,  z1: 15, name: 'Testing Booth',    kind: 'lab',      group: 'BOOTH' },
    { id: 'TEA',   side: 'w', z0: 17, z1: 23, name: 'Common Room',      kind: 'waiting',  open: true },
    { id: 'TAB',   side: 'w', z0: 25, z1: 37, name: 'Tabulation Room',  kind: 'station',  group: 'TAB', door: 'wide' },
    { id: 'RACK',  side: 'w', z0: 37, z1: 43, name: 'Card Store',       kind: 'supply' },

    // East side: the instrument opposite the booth so the cable run is short,
    // and the wall at the far end where there is room to stand back from it.
    { id: 'DARK',  side: 'e', z0: -4, z1: 3,  name: 'Dark Adaptation Room', kind: 'quiet' },
    { id: 'CHRON', side: 'e', z0: 5,  z1: 17, name: 'Chronoscope Bench',    kind: 'lab',      group: 'CHRON', door: 'wide' },
    { id: 'WALL',  side: 'e', z0: 19, z1: 33, name: 'Distribution Wall',    kind: 'workroom', group: 'WALL',  door: 'wide' },
    { id: 'LIB',   side: 'e', z0: 35, z1: 43, name: 'Reading Room',         kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 3.5,  west: 'Booth',       east: 'Dark Room' },
    { z: 18.0, west: 'Common Room', east: 'Chronoscope' },
    { z: 34.0, west: 'Tabulation',  east: 'Reading Room' },
  ],

  // The common room. Seats are shared by the fit-out (which builds the chairs)
  // and the crowd (which sits people in them), so nobody hovers above a chair.
  seats: [
    [-4.7, 18.4, Math.PI / 2], [-4.7, 19.8, Math.PI / 2], [-4.7, 21.2, Math.PI / 2],
    [-7.9, 18.4, -Math.PI / 2], [-7.9, 19.8, -Math.PI / 2], [-7.9, 21.2, -Math.PI / 2],
    [-6.3, 22.4, 0], [-5.1, 22.4, 0],
  ],

  spots: {
    spine: [
      [-1.25, -3], [1.25, -1], [-1.25, 2], [1.25, 5], [-1.25, 8], [1.25, 11],
      [-1.25, 14], [1.25, 17], [-1.25, 20], [1.25, 23], [-1.25, 26], [1.25, 29],
      [-1.25, 32], [1.25, 35], [-1.25, 38], [1.25, 41],
    ],
    open: [[-5.1, 0], [-6.7, 1.6], [-4.7, 20], [-6.3, 22], [1.25, 1]],
  },

  anchors: {
    // Where the day sends people. `base` is the entrance desk and the common
    // room, `work` the corridor outside the four working rooms, `front` the way in.
    base:  [[-5.1, 0], [-4.7, 20], [-6.3, 22], [-1.25, 20]],
    work:  [[-1.25, 10], [1.25, 11], [-1.25, 31], [1.25, 26], [-1.25, 36]],
    front: [[-5.1, 0], [-6.7, 1.6], [1.25, -1], [-1.25, 2], [1.25, 2]],
  },
};

export default plan;
