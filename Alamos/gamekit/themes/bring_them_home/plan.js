// plan.js — Mission Control, as data.
//
// One floor, one corridor, rooms down both sides. That is the real shape of a
// control centre: the main operations room in the middle of it and the back
// rooms — guidance, electrical, thermal, comms, structures — feeding it from
// either side. The player walks the corridor between them all shift.
//
// `engine/world/interiorFloor.js` builds everything below. Units are metres,
// +z runs along the corridor, +x is to the right of it.
//
//   west side                    east side
//   ---------------------------------------------------
//   Sign-in                      Guidance Room (NAV)
//   Viewing Gallery              Electrical Systems (ELEC)
//   Mission Operations (INTEG)   Thermal & Life Support (THERM)
//   Communications (COMMS)       Structures & Dynamics (STRUCT)
//   Quiet Room                   Trajectory Library
//
// Every room with a `group` is a call the player can be sent to. A group with
// no room here is unreachable and only `worldParity` notices.

export const plan = {
  metrics: {
    corridorHalfWidth: 2.1,     // wide enough to pass someone carrying a plot
    roomDepth: 8.2,
    ceilingH: 3.0,
    tileH: 2.75,
    palette: {
      // Mission control in the era this is set: pale green consoles, grey
      // vinyl, cream walls under fluorescent light.
      floorSpine: [188, 190, 182],
      floorRoom:  [176, 184, 176],
      wall:  '#e4e2d6',
      base:  '#4d5450',
      rail:  '#8a8f8a',
      frame: '#b0b4b2',
      door:  '#7c8a86',
      signBand: '#1f3b4d',
    },
  },

  spine: { z0: -6, z1: 50 },

  rooms: [
    { id: 'SIGNIN', side: 'w', z0: -4, z1: 4,  name: 'Badge and Sign-in',    kind: 'reception', open: true },
    { id: 'GALLERY',side: 'w', z0: 4,  z1: 14, name: 'Viewing Gallery',      kind: 'waiting',   open: true },
    { id: 'INTEG',  side: 'w', z0: 14, z1: 26, name: 'Mission Operations',   kind: 'station',   group: 'INTEG', door: 'wide' },
    { id: 'COMMS',  side: 'w', z0: 26, z1: 36, name: 'Communications Room',  kind: 'lab',       group: 'COMMS' },
    { id: 'QUIET',  side: 'w', z0: 36, z1: 44, name: 'Crew Family Room',     kind: 'quiet' },

    { id: 'NAV',    side: 'e', z0: -4, z1: 8,  name: 'Guidance Room',        kind: 'workroom',  group: 'NAV', door: 'wide' },
    { id: 'ELEC',   side: 'e', z0: 8,  z1: 18, name: 'Electrical Systems',   kind: 'workroom',  group: 'ELEC' },
    { id: 'THERM',  side: 'e', z0: 18, z1: 28, name: 'Thermal & Life Support', kind: 'lab',     group: 'THERM' },
    { id: 'STRUCT', side: 'e', z0: 28, z1: 38, name: 'Structures & Dynamics', kind: 'workroom', group: 'STRUCT' },
    { id: 'LIBRARY',side: 'e', z0: 38, z1: 46, name: 'Trajectory Library',   kind: 'supply' },
  ],

  bladeSigns: [
    { z: 11.5, west: 'Gallery',        east: 'Electrical' },
    { z: 26.5, west: 'Communications', east: 'Thermal' },
    { z: 38.5, west: 'Family Room',    east: 'Library' },
  ],

  // Built by the fit-out and sat in by the crowd, so nobody ever hovers above
  // a chair. The gallery is where the off-shift controllers wait out a burn.
  seats: [
    [-4.6, 5.6, Math.PI / 2], [-4.6, 7.0, Math.PI / 2], [-4.6, 8.4, Math.PI / 2],
    [-7.8, 5.6, -Math.PI / 2], [-7.8, 7.0, -Math.PI / 2], [-7.8, 8.4, -Math.PI / 2],
    [-6.2, 11.4, 0], [-5.0, 11.4, 0],
  ],

  spots: {
    spine: [
      [-1.5, -3], [1.5, -1], [-1.5, 3], [1.5, 6], [-1.5, 10], [1.5, 13],
      [-1.5, 17], [1.5, 20], [-1.5, 24], [1.5, 27], [-1.5, 31], [1.5, 34],
      [-1.5, 38], [1.5, 41], [-1.5, 45], [1.5, 48],
    ],
    open: [[-5.4, 0], [-6.8, 2.6], [-4.6, 9.5], [5.6, 41], [7.0, 43]],
  },
  anchors: {
    base:  [[5.6, 41], [7.0, 43], [1.5, 41], [-1.5, 41]],
    work:  [[-1.5, 20], [1.5, 24], [-1.5, 28], [1.5, 32], [-1.5, 36]],
    front: [[-5.4, 0], [-6.8, 2.6], [1.5, 2], [-1.5, 6], [-4.6, 9.5]],
  },

  // The status board on the corridor wall, outside Mission Operations.
  board: { x: 1.6, z: 20, facing: -Math.PI / 2, title: 'Flight Status' },
};

export default plan;
