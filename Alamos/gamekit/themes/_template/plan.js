// plan.js — the place, as data.
//
// A spine with rooms down both sides. This one topology covers an airport
// concourse, a lab corridor, a visitor centre and a hospital ward; change the
// numbers and the room list, not the builder.
//
// Units are metres. +z runs along the spine, +x is to the right of it.

export const plan = {
  // Metrics override engine/world/interiorSite.js DEFAULTS.
  metrics: {
    corridorHalfWidth: 1.8,   // a spine you can pass someone in
    roomDepth: 7.6,
    ceilingH: 3.0,
    tileH: 2.75,
    palette: {
      floorSpine: [212, 206, 194],
      floorRoom:  [206, 210, 206],
      wall:  '#e9e7df',
      base:  '#5d6169',
      rail:  '#8d9299',
      frame: '#b9bcc0',
      door:  '#a98b63',
      signBand: '#25506b',
    },
  },

  spine: { z0: -6, z1: 48 },

  /**
   * side  'w' | 'e'          which side of the spine
   * z0,z1                    extent along the spine
   * group                    set when this room is a mission destination
   * kind                     which fit-out the theme applies
   * door  'wide'             for rooms that take a trolley or a crowd
   * open  true               no spine wall: lobbies, counters, concourse bays
   */
  rooms: [
    { id: 'ARRIVE',  side: 'w', z0: -4, z1: 4,  name: 'Arrivals & Sign-in', kind: 'reception', open: true },
    { id: 'WAIT',    side: 'w', z0: 4,  z1: 14, name: 'Waiting Area',       kind: 'waiting',   open: true },
    { id: 'ONE',     side: 'w', z0: 14, z1: 23, name: 'Station One',        kind: 'workroom',  group: 'G1', door: 'wide' },
    { id: 'TWO',     side: 'w', z0: 23, z1: 32, name: 'Station Two',        kind: 'workroom',  group: 'G2' },
    { id: 'THREE',   side: 'w', z0: 32, z1: 41, name: 'Station Three',      kind: 'lab',       group: 'G3' },
    { id: 'QUIET',   side: 'w', z0: 41, z1: 47, name: 'Quiet Room',         kind: 'quiet' },

    { id: 'FOUR',    side: 'e', z0: -4, z1: 7,  name: 'Station Four',       kind: 'workroom',  group: 'G4', door: 'wide' },
    { id: 'STORE',   side: 'e', z0: 7,  z1: 13, name: 'Supplies',           kind: 'supply' },
    { id: 'LABX',    side: 'e', z0: 13, z1: 19, name: 'Analysis Bench',     kind: 'lab' },
    { id: 'FIVE',    side: 'e', z0: 19, z1: 28, name: 'Station Five',       kind: 'workroom',  group: 'G5', door: 'wide' },
    { id: 'SIX',     side: 'e', z0: 28, z1: 37, name: 'Station Six',        kind: 'workroom',  group: 'G6' },
    { id: 'DESK',    side: 'e', z0: 37, z1: 43, name: 'Team Desk',          kind: 'station',   open: true },
    { id: 'BACK',    side: 'e', z0: 43, z1: 47, name: 'Back of House',      kind: 'supply' },
  ],

  /** Overhead wayfinding, read from both directions. */
  bladeSigns: [
    { z: 11.5, west: 'Waiting',      east: 'Supplies' },
    { z: 26.5, west: 'Station Two',  east: 'Station Five' },
    { z: 38.5, west: 'Station Three', east: 'Team Desk' },
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
