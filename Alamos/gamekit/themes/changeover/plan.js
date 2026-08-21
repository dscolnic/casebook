// plan.js — Halvern Central Station, as data.
//
// A COMMANDEERED RAILWAY STATION, WHICH IS WHY THE COURSE FITS. AP
// Macroeconomics is a set of measurements and a set of levers, and both are
// awkward to put in a building: a central bank is a corridor of offices. A
// terminus taken over for a currency changeover is not. The ticket hall is a
// bank counter with a queue in it, the parcels office is where the old notes are
// weighed and burnt, the telegraph room is where the trade and exchange-rate
// numbers arrive, and the board room upstairs is where the rate is set.
//
// Walking the concourse from the counter to the rate room walks the causal
// chain the course teaches: households, then prices, then banks, then policy.
//
// Units are metres. +z runs along the concourse, +x is to the right of it.

export const plan = {
  // Metrics override engine/world/interiorSite.js DEFAULTS.
  metrics: {
    // A terminus concourse: wide enough for a queue to double back in, and a
    // ceiling that says this was built for trains rather than for banking.
    corridorHalfWidth: 3.2,
    roomDepth: 9.0,
    ceilingH: 6.2,
    tileH: 3.4,
    // Soot-darkened stone, cream tile, and the municipal green of a building
    // that has been repainted by whoever was in charge that decade.
    palette: {
      floorSpine: [138, 132, 122],
      floorRoom:  [176, 170, 158],
      wall:  '#e0dccd',
      base:  '#33463b',
      rail:  '#7d7566',
      frame: '#8a8375',
      door:  '#4d4436',
      signBand: '#1f3d52',
    },
  },

  spine: { z0: -10, z1: 66 },

  /**
   * side  'w' | 'e'          which side of the spine
   * z0,z1                    extent along the spine
   * group                    set when this room is a mission destination
   * kind                     which fit-out the theme applies
   * door  'wide'             for rooms that take a trolley or a crowd
   * open  true               no spine wall: lobbies, counters, concourse bays
   */
  // One room per group in book.yml, plus the rooms that carry the place rather
  // than a lesson. A group with no room here is a call the player cannot reach:
  // `worldParity` fails on it, which is the only reason it is caught at all.
  rooms: [
    { id: 'DOORS',   side: 'w', z0: -8, z1: 2,  name: 'Station Doors',        kind: 'reception', open: true },
    { id: 'QUEUE',   side: 'w', z0: 2,  z1: 16, name: 'The Queue',           kind: 'waiting',   open: true },
    { id: 'COUNTER', side: 'w', z0: 16, z1: 28, name: 'Exchange Counter',    kind: 'station',   group: 'COUNTER', door: 'wide' },
    { id: 'PRICES',  side: 'w', z0: 28, z1: 40, name: 'Price Room',          kind: 'workroom',  group: 'PRICES', door: 'wide' },
    { id: 'TRADE',   side: 'w', z0: 44, z1: 58, name: 'Telegraph Room',      kind: 'lab',       group: 'TRADE', door: 'wide' },
    { id: 'CANTEEN', side: 'w', z0: 58, z1: 64, name: 'Staff Canteen',       kind: 'quiet' },

    { id: 'PARCELS', side: 'e', z0: -8, z1: 4,  name: 'Parcels Office',      kind: 'supply',    group: 'NOTES', door: 'wide' },
    { id: 'LEDGER',  side: 'e', z0: 4,  z1: 16, name: 'Ledger Hall',         kind: 'workroom',  group: 'BANKS', door: 'wide' },
    { id: 'RATE',    side: 'e', z0: 20, z1: 34, name: 'Rate Room',           kind: 'station',   group: 'RATE', door: 'wide' },
    { id: 'PRESS',   side: 'e', z0: 34, z1: 42, name: 'Press Room',          kind: 'quiet' },
    { id: 'VAULT',   side: 'e', z0: 46, z1: 56, name: 'Old Left Luggage',    kind: 'supply' },
    { id: 'PLAT',    side: 'e', z0: 56, z1: 64, name: 'Platform One',        kind: 'reception', open: true },
  ],

  /** Overhead wayfinding, read from both directions. */
  bladeSigns: [
    { z: 15.0, west: 'Queue',        east: 'Ledger Hall' },
    { z: 29.0, west: 'Counter',      east: 'Rate Room' },
    { z: 43.0, west: 'Price Room',   east: 'Press Room' },
    { z: 57.0, west: 'Telegraph',    east: 'Platform One' },
  ],

  /** Seating shared by the fit-out (which builds chairs) and the crowd
   *  (which sits people in them), so nobody ever hovers above a chair. */
  seats: [
    [-4.2, 5.4, Math.PI / 2], [-4.2, 6.6, Math.PI / 2], [-4.2, 7.8, Math.PI / 2],
    [-7.4, 5.4, -Math.PI / 2], [-7.4, 6.6, -Math.PI / 2], [-7.4, 7.8, -Math.PI / 2],
    [-5.8, 10.6, 0], [-4.6, 10.6, 0],
  ],

  /** Where people stand and where the shift sends them. */
  spots: {
    spine: [
      [-1.25, -3], [1.25, -1], [-1.25, 2], [1.25, 5], [-1.25, 8], [1.25, 11],
      [-1.25, 15], [1.25, 18], [-1.25, 21], [1.25, 24], [-1.25, 27], [1.25, 30],
      [-1.25, 33], [1.25, 36], [-1.25, 39], [1.25, 42], [-1.25, 45],
    ],
    open: [[-5.0, 0], [-6.6, 2.4], [-4.2, 8], [5.2, 39], [6.8, 41]],
  },
  anchors: {
    base:  [[5.2, 39], [6.8, 41], [1.25, 39], [-1.25, 39]],
    work:  [[-1.25, 18], [1.25, 23], [-1.25, 27], [1.25, 31], [-1.25, 35]],
    front: [[-5.0, 0], [-6.6, 2.4], [1.25, 2], [-1.25, 5], [-4.2, 8]],
  },
};

export default plan;
