// plan.js — the Ellery Variety Theatre, as data.
//
// A BACKSTAGE SPINE, WHICH IS WHY THE COURSE FITS. AP Precalculus is four
// families of function and a theatre is a building where each one is a piece of
// equipment: the board is polar and matrix work, the pit is sinusoids and
// logarithms, the box office is a rational function with an asymptote in it, and
// the fly floor is vectors. Walking the corridor from the stage door to the
// house is walking from what is measured to what is sold.
//
// Units are metres. +z runs along the spine, +x is to the right of it.

export const plan = {
  // Metrics override engine/world/interiorSite.js DEFAULTS.
  metrics: {
    // A 1911 backstage corridor: narrower than a modern building, and a ceiling
    // low enough that the flying gear above it is a fact rather than a rumour.
    corridorHalfWidth: 1.6,
    roomDepth: 8.4,
    ceilingH: 3.4,
    tileH: 2.9,
    // Dark green dado, cream above, brass and mahogany: a variety house that has
    // been shut for eleven years and dusted for three weeks.
    palette: {
      floorSpine: [96, 84, 72],
      floorRoom:  [122, 112, 98],
      wall:  '#e3dcc6',
      base:  '#294436',
      rail:  '#8a6f3c',
      frame: '#6c5334',
      door:  '#5c4326',
      signBand: '#5c1f26',
    },
  },

  spine: { z0: -8, z1: 62 },

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
    { id: 'STAGEDOOR', side: 'w', z0: -6, z1: 2,  name: 'Stage Door',          kind: 'reception', open: true },
    { id: 'GREEN',   side: 'w', z0: 2,  z1: 13, name: 'Green Room',            kind: 'waiting',   open: true },
    { id: 'PIT',     side: 'w', z0: 13, z1: 24, name: 'Orchestra Pit & Sound', kind: 'workroom',  group: 'PIT', door: 'wide' },
    { id: 'SHOP',    side: 'w', z0: 24, z1: 36, name: 'Scene Shop',            kind: 'workroom',  group: 'SHOP', door: 'wide' },
    { id: 'HOUSE',   side: 'w', z0: 40, z1: 54, name: 'The House',             kind: 'workroom',  group: 'HOUSE', door: 'wide' },
    { id: 'WARDROBE', side: 'w', z0: 54, z1: 60, name: 'Wardrobe',             kind: 'quiet' },

    { id: 'FRONT',   side: 'e', z0: -6, z1: 6,  name: 'Box Office',            kind: 'station',   group: 'FRONT', door: 'wide' },
    { id: 'DIMMER',  side: 'e', z0: 6,  z1: 13, name: 'Dimmer Room',           kind: 'supply' },
    { id: 'BOARD',   side: 'e', z0: 13, z1: 25, name: 'Lighting Board',        kind: 'lab',       group: 'BOARD', door: 'wide' },
    { id: 'FLY',     side: 'e', z0: 25, z1: 38, name: 'Fly Floor',             kind: 'workroom',  group: 'FLY', door: 'wide' },
    { id: 'PROMPT',  side: 'e', z0: 44, z1: 52, name: 'Prompt Corner',         kind: 'station',   open: true },
    { id: 'DOCK',    side: 'e', z0: 52, z1: 60, name: 'Scene Dock',            kind: 'supply' },
  ],

  /** Overhead wayfinding, read from both directions. */
  bladeSigns: [
    { z: 12.0, west: 'Green Room',  east: 'Dimmers' },
    { z: 24.5, west: 'Pit',         east: 'Board' },
    { z: 39.0, west: 'Scene Shop',  east: 'Fly Floor' },
    { z: 53.0, west: 'The House',   east: 'Prompt Corner' },
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
