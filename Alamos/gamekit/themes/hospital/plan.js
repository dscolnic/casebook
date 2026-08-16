// plan.js — the ward floor, as data.
//
// A real children's hospital floor is a double-loaded corridor: one spine with
// rooms down both sides, glazing at each end, and a nurses' station where the
// staff can see the whole run. This is that plan, and it is the plan
// `engine/world/interiorSite.js` was generalised out of in the first place —
// which is why moving this game onto the shared world was a rename rather than
// a rebuild. It kept its own copy for a year, and with it its own 1,070-line
// world builder and every bug fixed twice.
//
// Units are metres. +z runs north up the corridor, +x is east.
export const plan = {
  metrics: {
    corridorHalfWidth: 1.8,
    roomDepth: 7.6,
    wall: 0.18,
    ceilingH: 3.0,
    tileH: 2.75,
    doorW: 1.25,
    doorWideW: 1.85,      // a gurney-width leaf on the clinical rooms
    doorH: 2.15,
    // Warm, and deliberately not clinical. This is a hospital written for
    // eight-year-olds: pale timber, soft green, and a blue that means find your
    // way rather than emergency.
    palette: {
      floorSpine: [226, 219, 205],
      floorRoom:  [220, 216, 208],
      wall:  '#f2efe6',
      base:  '#5f6b63',
      rail:  '#93a49a',
      frame: '#c3c8c2',
      door:  '#c08a52',
      signBand: '#2b6b7a',
    },
  },

  spine: { z0: -6, z1: 48 },

  rooms: [
    // ---- west side, south to north
    { id: 'RECEPTION', side: 'w', z0: -4, z1: 4, name: 'Reception & Registration', kind: 'reception', open: true },
    { id: 'WAITING', side: 'w', z0: 4, z1: 14, name: 'Family Waiting', kind: 'waiting', open: true },
    { id: 'RESP', side: 'w', z0: 14, z1: 23, name: 'Respiratory & Cardiology', kind: 'exam', group: 'RESP', door: 'wide' },
    { id: 'NUTR', side: 'w', z0: 23, z1: 32, name: 'Nutrition & Kidney Care', kind: 'exam', group: 'NUTR' },
    { id: 'DEF', side: 'w', z0: 32, z1: 41, name: 'Infection & Immunology', kind: 'lab', group: 'DEF' },
    { id: 'QUIET', side: 'w', z0: 41, z1: 47, name: 'Quiet Room', kind: 'quiet' },

    // ---- east side, south to north
    { id: 'TRI', side: 'e', z0: -4, z1: 7, name: 'Emergency & Triage', kind: 'ed', group: 'TRI', door: 'wide' },
    { id: 'PHARM', side: 'e', z0: 7, z1: 13, name: 'Pharmacy', kind: 'pharmacy' },
    { id: 'LAB', side: 'e', z0: 13, z1: 19, name: 'Clean Laboratory', kind: 'lab' },
    { id: 'MOVE', side: 'e', z0: 19, z1: 28, name: 'Imaging & Rehab', kind: 'imaging', group: 'MOVE', door: 'wide' },
    { id: 'BRAIN', side: 'e', z0: 28, z1: 37, name: 'Neurology & Senses', kind: 'senses', group: 'BRAIN' },
    { id: 'STATION', side: 'e', z0: 37, z1: 43, name: 'Nurses’ Station', kind: 'station', open: true },
    { id: 'SUPPLY', side: 'e', z0: 43, z1: 47, name: 'Clean Supply', kind: 'supply' },
  ],

  /** Overhead wayfinding, read from both directions. */
  bladeSigns: [
    { z: 12.5, west: 'Waiting', east: 'Pharmacy' },
    { z: 26.5, west: 'Nutrition & Kidney', east: 'Imaging & Rehab' },
    { z: 40.5, west: 'Quiet Room', east: 'Nurses’ Station' },
  ],

  /**
   * Waiting-room seating: [x, z, facing]. Shared by the fit-out, which builds
   * the chairs, and the crowd, which sits people in them — so a child waiting
   * to be seen is always actually on a chair rather than hovering over one.
   */
  seats: [
    [-4.2, 5.4, Math.PI / 2], [-4.2, 6.6, Math.PI / 2], [-4.2, 7.8, Math.PI / 2],
    [-7.4, 5.4, -Math.PI / 2], [-7.4, 6.6, -Math.PI / 2], [-7.4, 7.8, -Math.PI / 2],
    [-5.8, 10.6, 0], [-4.6, 10.6, 0],
  ],

  /** Where people stand, and where the shift sends them. */
  spots: {
    spine: [
      [-1.25, -3], [1.25, -1], [-1.25, 2], [1.25, 5], [-1.25, 8], [1.25, 11],
      [-1.25, 15], [1.25, 18], [-1.25, 21], [1.25, 24], [-1.25, 27], [1.25, 30],
      [-1.25, 33], [1.25, 36], [-1.25, 39], [1.25, 42], [-1.25, 45],
    ],
    open: [[-5.0, 0], [-6.6, 2.4], [-4.2, 8], [5.2, 39], [6.8, 41]],
  },
  anchors: {
    // The nurses' station, which is where the shift starts and ends.
    base: [[5.2, 39], [6.8, 41], [1.25, 39], [-1.25, 39]],
    work: [[-1.25, 18], [1.25, 23], [-1.25, 27], [1.25, 31], [-1.25, 35]],
    front: [[-5.0, 0], [-6.6, 2.4], [1.25, 2], [-1.25, 5], [-4.2, 8]],
  },
};

export default plan;
