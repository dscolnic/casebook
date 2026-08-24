// plan.js — the pneumatic laboratory, as data.
//
// One corridor, four working rooms off it, and the rooms nobody works in that
// make it a building rather than a diagram. The place has a shape the campaign
// uses: the balance and the furnace are down one side, the trough and the
// accounting desk down the other, so every weighing crosses the corridor before
// it becomes an argument.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The furnace room is the deepest room on the plan and the only one with a
// chimney. A burning-glass and a reverberatory furnace need standing room and
// somewhere for the heat to go, and a furnace in a room the size of an office
// reads as an office with a stove in it.
//
// `ceiling: false` here, which no other building in this set does. A suspended
// tile grid over a Georgian laboratory is the loudest anachronism available and
// it is invisible in every check — the geometry, the collision and the lighting
// are identical either way, and only a photograph from inside says which century
// the room is in. Without it the builder puts a soffit up at ceiling height plus
// three quarters of a metre and hangs the fittings from that, which is a beamed
// ceiling with lamps under it.

export const plan = {
  ceiling: false,

  metrics: {
    corridorHalfWidth: 2.0,
    roomDepth: 8.0,
    ceilingH: 3.9,
    tileH: 3.4,
    // Lime wash over a panelled dado, oak doors, stone flags and a good deal of
    // brass. Every one of these is darker than it looks on a swatch, which is
    // house rule 6 indoors: under ACES with the environment lifting everything,
    // limewash at its true value renders as printer paper and the room stops
    // having surfaces in it.
    palette: {
      // Stone flags and boards. At [104, 100, 92] this floor rendered as pale
      // grey sheet vinyl in every corridor shot — house rule 6 again, and the
      // floor is the largest surface in the frame so it is the one that decides
      // whether a room looks like 1775 or like a school.
      floorSpine: [58, 55, 48],
      floorRoom:  [64, 58, 46],
      wall:  '#cdc6b0',
      base:  '#33402f',
      rail:  '#7a6a4c',
      frame: '#8b7a55',
      door:  '#4a3822',
      signBand: '#3d3529',
    },
  },

  spine: { z0: -6, z1: 46 },

  rooms: [
    // West side: the balance nearest the door, because it is the room everything
    // comes back to, and the furnace at the far end with the chimney.
    { id: 'PORCH', side: 'w', z0: -4, z1: 2,  name: "Porter's Lodge", kind: 'reception', open: true },
    { id: 'BAL',   side: 'w', z0: 4,  z1: 14, name: 'Balance Room',   kind: 'lab',      group: 'BAL' },
    { id: 'TEA',   side: 'w', z0: 16, z1: 22, name: 'Common Room',    kind: 'waiting',  open: true },
    { id: 'FURN',  side: 'w', z0: 24, z1: 38, name: 'Furnace Room',   kind: 'workroom', group: 'FURN', door: 'wide' },
    { id: 'RACK',  side: 'w', z0: 38, z1: 45, name: 'Glass Store',    kind: 'supply' },

    // East side: the trough near the door because it needs water carrying to it,
    // and the accounting desk at the far end facing the furnace.
    { id: 'COAL',   side: 'e', z0: -4, z1: 3,  name: 'Charcoal Store',   kind: 'supply' },
    { id: 'TROUGH', side: 'e', z0: 5,  z1: 18, name: 'Pneumatic Trough', kind: 'lab',     group: 'TROUGH', door: 'wide' },
    { id: 'LEDGER', side: 'e', z0: 20, z1: 33, name: 'Accounting Desk',  kind: 'station', group: 'LEDGER', door: 'wide' },
    { id: 'LIB',    side: 'e', z0: 35, z1: 45, name: 'Library',          kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 3.5,  west: 'Balance',      east: 'Charcoal' },
    { z: 19.0, west: 'Common Room',  east: 'Trough' },
    { z: 34.0, west: 'Furnace',      east: 'Library' },
  ],

  // The common room. Seats are shared by the fit-out (which builds the chairs)
  // and the crowd (which sits people in them), so nobody hovers above a chair.
  seats: [
    [-5.0, 17.4, Math.PI / 2], [-5.0, 18.8, Math.PI / 2], [-5.0, 20.2, Math.PI / 2],
    [-8.2, 17.4, -Math.PI / 2], [-8.2, 18.8, -Math.PI / 2], [-8.2, 20.2, -Math.PI / 2],
    [-6.6, 21.4, 0], [-5.4, 21.4, 0],
  ],

  spots: {
    spine: [
      [-1.35, -3], [1.35, -1], [-1.35, 2], [1.35, 5], [-1.35, 8], [1.35, 11],
      [-1.35, 14], [1.35, 17], [-1.35, 20], [1.35, 23], [-1.35, 26], [1.35, 29],
      [-1.35, 32], [1.35, 35], [-1.35, 38], [1.35, 41], [-1.35, 44],
    ],
    open: [[-5.4, 0], [-7.0, 1.6], [-5.0, 19], [-6.6, 21], [1.35, 1]],
  },

  anchors: {
    // Where the day sends people. `base` is the lodge and the common room, `work`
    // the corridor outside the four working rooms, `front` the entrance.
    base:  [[-5.4, 0], [-5.0, 19], [-6.6, 21], [-1.35, 19]],
    work:  [[-1.35, 9], [1.35, 11], [-1.35, 31], [1.35, 26], [-1.35, 36]],
    front: [[-5.4, 0], [-7.0, 1.6], [1.35, -1], [-1.35, 2], [1.35, 2]],
  },
};

export default plan;
