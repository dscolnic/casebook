// plan.js — the Memory and Testimony Unit, as data.
//
// Twelve rooms rather than the nine the rest of this set uses, and that is the
// point of the place: a memory laboratory is small rooms, because most of what
// it studies is one person on their own with somebody asking them questions.
// Two interview suites with an observation room between them, a study room and
// an event bay open to the corridor at the near end, and a data room in the
// middle where the two halves are compared.
//
// Units are metres. +z runs along the corridor, +x is to the right of it.
//
// The shape the campaign uses: the study room and the interview suites are down
// one side, the event bay and the data room down the other, so what somebody saw
// and what somebody was later told are collected on opposite sides of a corridor
// and only meet in the data room.
//
// The two bays at the near end are `open: true` — no spine wall, so the corridor
// opens straight into them. A study room a participant is led into through a door
// is a room they can prepare for; the near end of this building is deliberately
// somewhere you are already standing before anything begins.

export const plan = {
  metrics: {
    corridorHalfWidth: 1.8,
    roomDepth: 7.0,
    ceilingH: 3.0,
    tileH: 2.7,
    // A university psychology unit fitted out in the nineties: pale grey-blue
    // walls, blue carpet tile, beech-faced doors, grey trunking at dado height.
    // Every one darker than it looks on a swatch — house rule 6 indoors — and
    // deliberately the blandest palette in this set, because the whole subject
    // is that nothing about the room should be memorable.
    palette: {
      floorSpine: [58, 66, 78],
      floorRoom:  [64, 70, 80],
      wall:  '#b6bcc2',
      base:  '#4a5258',
      rail:  '#7c848a',
      frame: '#9a8f78',
      door:  '#8a7a5c',
      signBand: '#3a5566',
    },
  },

  spine: { z0: -12, z1: 38 },

  rooms: [
    // West side: what somebody studied, and the rooms they are later asked in.
    { id: 'STUDY', side: 'w', z0: -10, z1: 2,  name: 'Study Room',        kind: 'bay',       group: 'STUDY', open: true },
    { id: 'INT1',  side: 'w', z0: 4,   z1: 12, name: 'Interview Suite A', kind: 'interview', group: 'INT' },
    { id: 'INT2',  side: 'w', z0: 12,  z1: 19, name: 'Interview Suite B', kind: 'interview' },
    { id: 'WAIT',  side: 'w', z0: 21,  z1: 28, name: 'Waiting Room',      kind: 'waiting',   open: true },
    { id: 'RECS',  side: 'w', z0: 28,  z1: 37, name: 'Transcript Store',  kind: 'supply' },

    // East side: what happened, who watched it, and where the two are compared.
    { id: 'EVENT', side: 'e', z0: -10, z1: 2,  name: 'Event Bay',        kind: 'bay',       group: 'EVENT', open: true },
    { id: 'OBS',   side: 'e', z0: 4,   z1: 11, name: 'Observation Room', kind: 'quiet' },
    { id: 'DATA',  side: 'e', z0: 13,  z1: 25, name: 'Data Room',        kind: 'station',   group: 'DATA', door: 'wide' },
    { id: 'BRIEF', side: 'e', z0: 27,  z1: 33, name: 'Briefing Room',    kind: 'workroom' },
    { id: 'STORE', side: 'e', z0: 33,  z1: 37, name: 'Equipment Store',  kind: 'supply' },
  ],

  bladeSigns: [
    { z: 3.0,  west: 'Interviews', east: 'Observation' },
    { z: 20.0, west: 'Waiting',    east: 'Data Room' },
    { z: 29.0, west: 'Transcripts', east: 'Briefing' },
  ],

  // The waiting room. Seats are shared by the fit-out (which builds the chairs)
  // and the crowd (which sits people in them), so nobody hovers above a chair.
  seats: [
    [-4.6, 22.4, Math.PI / 2], [-4.6, 23.8, Math.PI / 2], [-4.6, 25.2, Math.PI / 2],
    [-7.4, 22.4, -Math.PI / 2], [-7.4, 23.8, -Math.PI / 2], [-7.4, 25.2, -Math.PI / 2],
    [-6.0, 26.4, 0], [-4.9, 26.4, 0],
  ],

  spots: {
    spine: [
      [-1.2, -9], [1.2, -6], [-1.2, -3], [1.2, 0], [-1.2, 3], [1.2, 6],
      [-1.2, 9], [1.2, 12], [-1.2, 15], [1.2, 18], [-1.2, 21], [1.2, 24],
      [-1.2, 27], [1.2, 30], [-1.2, 33], [1.2, 36],
    ],
    open: [[-4.9, -4], [-6.4, -6], [4.6, -4], [-4.6, 24], [-6.0, 26]],
  },

  anchors: {
    // Where the day sends people. `base` is the waiting room and the near bays,
    // `work` the corridor outside the four working rooms, `front` the near end.
    base:  [[-4.6, 24], [-6.0, 26], [-1.2, 24], [1.2, 24]],
    work:  [[-1.2, 8], [1.2, 8], [-1.2, 16], [1.2, 19], [-1.2, 30]],
    front: [[-4.9, -4], [-6.4, -6], [4.6, -4], [-1.2, -3], [1.2, -6]],
  },
};

export default plan;
