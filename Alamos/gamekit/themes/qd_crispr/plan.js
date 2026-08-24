// plan.js — the Genome Editing Institute, as data.
//
// One corridor, four working rooms off it, and the rooms nobody works in that
// make it a building rather than a diagram. The place has a shape the campaign
// uses: the genome room and the design desk are down one side, the editing bay
// and the sequencing room down the other, and every design crosses the corridor
// before anybody finds out whether it did what it was supposed to.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The sequencing room is the deepest room on the plan. A bank of instruments
// that runs unattended for two days needs floor, air and a way round the back of
// every machine, and a sequencer squeezed into an office reads as an office with
// a photocopier in it.

export const plan = {
  metrics: {
    corridorHalfWidth: 1.9,
    roomDepth: 8.4,
    ceilingH: 3.6,
    tileH: 3.1,
    // A modern molecular biology building: poured epoxy floors, white walls with
    // a grey rail, birch-faced doors and stainless everywhere. The temptation is
    // to make it white and it must not be — under ACES with the environment
    // lifting everything, a pale albedo renders near-white and the first cut of
    // this corridor had no surfaces in it at all, just a bright fog with doors.
    // Everything here is a half-step down from where it reads on a swatch.
    palette: {
      // Halved from the first cut. A mid grey is exactly the value that renders
      // as white under ACES, and the floor is the largest surface in a corridor
      // frame — so a modern laboratory read as a bright fog with doors in it.
      floorSpine: [64, 70, 76],
      floorRoom:  [58, 64, 70],
      wall:  '#c8ccce',
      base:  '#3e4a52',
      rail:  '#7d868c',
      frame: '#9aa1a5',
      door:  '#8d7f68',
      signBand: '#1f4f6b',
    },
  },

  spine: { z0: -6, z1: 46 },

  rooms: [
    // West side: the genomes at the near end, the design desk at the far end, so
    // the walk from a sequence to a plan is the length of the building.
    { id: 'PORCH',  side: 'w', z0: -4, z1: 3,  name: 'Entrance Desk',      kind: 'reception', open: true },
    { id: 'ARRAY',  side: 'w', z0: 5,  z1: 18, name: 'Genome Room',        kind: 'lab',      group: 'ARRAY', door: 'wide' },
    { id: 'TEA',    side: 'w', z0: 20, z1: 26, name: 'Coffee Area',        kind: 'waiting',  open: true },
    { id: 'DESIGN', side: 'w', z0: 28, z1: 40, name: 'Design Desk',        kind: 'station',  group: 'DESIGN', door: 'wide' },
    { id: 'RACK',   side: 'w', z0: 40, z1: 46, name: 'Consumables Store',  kind: 'supply' },

    // East side: the bench work near the door and the instruments at the far end,
    // where the noise and the heat are somebody else's problem.
    { id: 'COLD',   side: 'e', z0: -4, z1: 4,  name: 'Cold Room',          kind: 'supply' },
    { id: 'EDIT',   side: 'e', z0: 6,  z1: 20, name: 'Editing Bay',        kind: 'workroom', group: 'EDIT', door: 'wide' },
    { id: 'SEQ',    side: 'e', z0: 22, z1: 38, name: 'Sequencing Room',    kind: 'lab',      group: 'SEQ',  door: 'wide' },
    { id: 'LIB',    side: 'e', z0: 40, z1: 46, name: 'Reading Room',       kind: 'quiet' },
  ],

  bladeSigns: [
    { z: 4.5,  west: 'Genomes',     east: 'Cold Room' },
    { z: 21.0, west: 'Coffee',      east: 'Editing' },
    { z: 39.0, west: 'Design Desk', east: 'Sequencing' },
  ],

  // The coffee area. Seats are shared by the fit-out (which builds the chairs)
  // and the crowd (which sits people in them), so nobody hovers above a chair.
  seats: [
    [-4.8, 21.4, Math.PI / 2], [-4.8, 22.8, Math.PI / 2], [-4.8, 24.2, Math.PI / 2],
    [-8.2, 21.4, -Math.PI / 2], [-8.2, 22.8, -Math.PI / 2], [-8.2, 24.2, -Math.PI / 2],
    [-6.5, 25.4, 0], [-5.2, 25.4, 0],
  ],

  spots: {
    spine: [
      [-1.3, -3], [1.3, -1], [-1.3, 2], [1.3, 5], [-1.3, 8], [1.3, 11],
      [-1.3, 14], [1.3, 17], [-1.3, 20], [1.3, 23], [-1.3, 26], [1.3, 29],
      [-1.3, 32], [1.3, 35], [-1.3, 38], [1.3, 41], [-1.3, 44],
    ],
    open: [[-5.2, 0], [-6.8, 1.8], [-4.8, 23], [-6.5, 25], [1.3, 1]],
  },

  anchors: {
    // Where the day sends people. `base` is the entrance desk and the coffee
    // area, `work` the corridor outside the four working rooms, `front` the way in.
    base:  [[-5.2, 0], [-4.8, 23], [-6.5, 25], [-1.3, 23]],
    work:  [[-1.3, 11], [1.3, 12], [-1.3, 33], [1.3, 29], [-1.3, 38]],
    front: [[-5.2, 0], [-6.8, 1.8], [1.3, -1], [-1.3, 2], [1.3, 2]],
  },
};

export default plan;
