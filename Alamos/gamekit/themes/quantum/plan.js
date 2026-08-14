// plan.js — the Ridgeway Quantum Laboratory, as data.
//
// A spine with rooms down both sides, which the engine builds. What makes this
// place itself is what the spine *is*: a temperature gradient, walked.
//
// The lab is laid out the way the physics forces it. Everything warm is at the
// south end — deliveries, offices, people, coffee — and the closer you walk to
// the north end the colder, quieter and more shielded it gets, until the last
// door is a magnetically shielded room you have to close behind you. Nobody
// designed it as a metaphor; it is simply the only way to build one, because
// every metre of cable between a room-temperature amplifier and a 10 mK chip is
// heat you have to take back out again.
//
// +z runs north along the spine, away from the doors. Reading up the corridor:
//
//   z = -6   ARRIVE   sign-in, and the list of what may not be brought in
//   z =  4   OFFICE   where the argument about publishing happens
//   z = 14   FAB      wafers, junctions, a yellow-lit bay
//   z = 23   CRYO     the fridge, open for service, stages exposed
//   z = 32   CTRL     the microwave rack wall and the control desks
//   z = 41   VER      benchmarking, and the wall of results nobody trusts yet
//   z = 48   SENSE / NET / SHIELD  magnetometry, the fibre bay, the shielded room
//
// Load-bearing rather than decorative:
//
//   · Every `group` below is a group id in content/groups.js. A group with no
//     room is a call the player cannot reach and only `worldParity` notices.
//   · The rooms with no group carry the place: the sign-in desk that lists what
//     may not come in, the store, the quiet room, the cable run.
//   · `open: true` means no spine wall. Used for the parts of a lab that really
//     are open to the corridor, and nowhere else — a shielded room with no wall
//     would be a joke.

export const plan = {
  metrics: {
    // Wider than the scaffold's: this corridor has a cable tray down one side
    // and people push crates of helium along it.
    corridorHalfWidth: 2.1,
    roomDepth: 8.4,
    ceilingH: 3.2,
    tileH: 2.9,
    // Cold light on pale grey. A physics lab is not a hospital and it is not a
    // machine shop: it is vinyl, cable tray and instrument light, and the only
    // warm colour in the building is the yellow of the fabrication bay.
    palette: {
      floorSpine: [188, 192, 198],
      floorRoom:  [176, 182, 190],
      wall:  '#dfe3e6',
      base:  '#464e57',
      rail:  '#7f8a94',
      frame: '#aab3bb',
      door:  '#6f7d88',
      signBand: '#1d3f57',
    },
  },

  spine: { z0: -8, z1: 58 },

  rooms: [
    // ---- warm end
    { id: 'ARRIVE', side: 'w', z0: -6, z1: 2, name: 'Sign-in & Interlocks',
      kind: 'reception', open: true },
    { id: 'OFFICE', side: 'w', z0: 2, z1: 12, name: 'Group Office',
      kind: 'waiting', open: true },
    { id: 'FAB', side: 'w', z0: 12, z1: 22, name: 'Fabrication & Materials',
      kind: 'lab', group: 'FAB', door: 'wide' },
    { id: 'CRYO', side: 'w', z0: 22, z1: 33, name: 'Cryogenics & Vacuum',
      kind: 'workroom', group: 'CRYO', door: 'wide' },
    { id: 'QUIET', side: 'w', z0: 40, z1: 47, name: 'Reading Room',
      kind: 'quiet' },
    { id: 'SENSE', side: 'w', z0: 47, z1: 57, name: 'Quantum Sensing',
      kind: 'lab', group: 'SENSE' },

    // ---- cold end
    { id: 'STORE', side: 'e', z0: -6, z1: 1, name: 'Gas & Cryogen Store',
      kind: 'supply' },
    { id: 'CTRL', side: 'e', z0: 1, z1: 13, name: 'Control & Readout',
      kind: 'station', group: 'CTRL', door: 'wide' },
    { id: 'RACKS', side: 'e', z0: 13, z1: 20, name: 'Microwave Racks',
      kind: 'supply' },
    { id: 'VER', side: 'e', z0: 20, z1: 31, name: 'Error & Verification',
      kind: 'lab', group: 'VER', door: 'wide' },
    { id: 'DESK', side: 'e', z0: 31, z1: 39, name: 'Analysis Desks',
      kind: 'station', open: true },
    { id: 'NET', side: 'e', z0: 39, z1: 49, name: 'Networks & Security',
      kind: 'workroom', group: 'NET' },
    { id: 'SHIELD', side: 'e', z0: 49, z1: 57, name: 'Shielded Room',
      kind: 'quiet' },
  ],
};

export default plan;
