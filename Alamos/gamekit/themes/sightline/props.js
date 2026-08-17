// props.js — the objects unique to the Hallam Exchange.
//
// Anything generic (benches, notices, shelving, screens, trolleys) comes from
// engine/world/interiorKit.js; what is here is the handful of things that make
// this building the one this game happens in.
//
// The one that matters is the **sightline**. `fitOutSpine` builds the Ferrier
// Street corner across the south end of the hall — shopfront, doorway, kerb,
// lamp column — and lets the distance marks into the corridor floor, measured
// from the facade rather than from the origin. Two of them are the case: the
// 22 m the summary asserted for seven years, and the 34 m the ground gives. The
// hall is long enough to hold both, which is why the unit is in this building.
//
// Placement helpers take (w, h, d, x, y, z, material) — y is the centre height,
// and `hard(cx, cz, w, d, h)` is the collider that goes with it.
import * as THREE from 'three';
import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural }
  from '../../engine/world/interiorKit.js';

/** Where the shopfront stands, relative to the south end of the hall. */
const FACADE_INSET = 0.5;

/**
 * The distance marks let into the corridor floor, in metres from the facade.
 *
 * `case: true` is one of the two numbers this review is about, and those are the
 * only ones that get a plate as well as a strip. Everything else is a ruler.
 */
const MARKS = [
  { d: 5 }, { d: 10 }, { d: 15 }, { d: 20 },
  { d: 22, case: true, tint: 0xb3462f },
  { d: 25 }, { d: 30 },
  { d: 34.2, case: true, tint: 0x2f6f9f },
  { d: 40 },
];

/** What is on the walls, room by room. Nine parts earnest, one part not. */
const WALL_TEXT = {
  BAYW: [
    { style: 'banner', tag: 'BAY RULES', heading: 'Nothing here is a photograph', accent: '#2f6f9f',
      body: 'The corner is built to the survey. If you move a fitting, log it on the sheet by the '
        + 'door and tell Bekele before anybody stands on the mark.' },
    { style: 'list', tag: 'LAMP CHANNELS', heading: 'Set from the meter, not by eye', accent: '#8a6a1e',
      items: [['Channel 1', 'column 4471'], ['Channel 2', 'shop window'],
        ['Channel 3', 'first floor flat'], ['Meter', 'on the hook, please']],
      body: 'Readings are taken at the doorway, at 1.6 m, facing north.' },
    { style: 'warning', tag: 'DARK WORKING', heading: 'Green light only past the kerb', accent: '#b5502f',
      body: 'A white torch costs the whole room twenty minutes of adaptation. There are four '
        + 'green ones in the rack and there were six.' },
  ],
  INT1: [
    { style: 'list', tag: 'BEFORE YOU START', heading: 'The order, every time', accent: '#7a4fa3',
      items: [['1', 'say that I do not know is an answer'], ['2', 'free account, no questions'],
        ['3', 'open questions on what they raised'], ['4', 'closed questions last'],
        ['5', 'record confidence before anything is shown']],
      body: 'If you have shown them anything, write down what and when.' },
    { style: 'banner', tag: 'WHO IS IN THE ROOM', heading: 'The witness and the interviewer', accent: '#3f6f8f',
      body: 'Anybody else is in the record: name, relationship, and every time they speak.' },
  ],
  INT2: [
    { style: 'sticky', tag: 'NOTE', heading: 'The recorder clock is four minutes fast', accent: '#8a6a1e',
      body: 'It has been four minutes fast since March. Estates have the ticket. Write the real '
        + 'time on the sheet.' },
    { style: 'grid', tag: 'TAPE STORE', heading: 'Suite B recordings 2019–', accent: '#5b6a72',
      body: 'Nothing leaves this room without a signature. Nothing is copied at all.' },
  ],
  BOOTH: [
    { style: 'warning', tag: 'TWENTY MINUTES', heading: 'Adaptation is not instant', accent: '#b5502f',
      body: 'Most of it comes in the first ten minutes and it is not finished for half an hour. '
        + 'Sit down, wait, and do not check your phone.' },
  ],
  PHYS: [
    { style: 'list', tag: 'CUSTODY RECORDS', heading: 'What we read off a log', accent: '#1f7a6b',
      items: [['Hours awake', 'from arrest, not from interview'], ['Representation', 'offered, declined, revisited'],
        ['Breaks', 'length and where'], ['Meals', 'time and whether taken']],
      body: 'A state is reconstructed from times. Nobody here assesses a person from a transcript.' },
    { style: 'banner', tag: 'AROUSAL', heading: 'Narrows, not prints', accent: '#1f7a6b',
      body: 'The centre of an event gets more; the edges were never taken in. Both halves go in '
        + 'the report or neither does.' },
  ],
  QUIET: [
    { style: 'sticky', tag: 'THE RULE', heading: 'No case talk in here', accent: '#5b6a72',
      body: 'It is the only room in the building where nobody is being reviewed.' },
  ],
  LINEUP: [
    { style: 'list', tag: 'ARRAY STANDARD', heading: 'Every procedure, every time', accent: '#b3462f',
      items: [['Blind', 'the administrator does not know'], ['Sequential', 'one at a time, decide each'],
        ['Caution', 'the person may not be here'], ['Confidence', 'in their words, at the time']],
      body: 'If any of the four is missing, the run is a training run and is marked as one.' },
    { style: 'grid', tag: 'RIG BOOKINGS', heading: 'Volunteer blocks this fortnight', accent: '#5b6a72',
      body: 'Twenty administrations to a block. Do not run two conditions in one block.' },
  ],
  OBS: [
    { style: 'warning', tag: 'GLASS', heading: 'They can hear you', accent: '#b5502f',
      body: 'The glass is one way and the wall is not. Talk in the corridor.' },
  ],
  DELIB: [
    { style: 'banner', tag: 'PANEL SESSIONS', heading: 'Nobody in this room decides anything', accent: '#b0762a',
      body: 'Volunteers are told so before every session, and told again at the end. The camera '
        + 'is on when the light is on.' },
    { style: 'grid', tag: 'PANELS', heading: 'Sessions 1–14', accent: '#5b6a72',
      body: 'Transcripts in the data room. Recordings never leave the building.' },
  ],
  DATA: [
    { style: 'list', tag: 'BEFORE A NUMBER GOES IN A REPORT', heading: 'Four questions', accent: '#5b6a72',
      items: [['What is it', 'a measurement or a description'], ['Against what', 'norms, and whose'],
        ['Twice', 'would it come out the same'], ['So what', 'which sentence changes']],
      body: 'A number that fails the fourth one does not go in.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Somebody called a proportion a probability', accent: '#8a6a1e',
      body: '' },
  ],
  RECS: [
    { style: 'warning', tag: 'DO NOT TIDY', heading: 'Files stay in the order they arrived', accent: '#b5502f',
      body: 'Not reordered, not corrected, not stapled. If it is wrong it stays wrong and you '
        + 'write a note. Ask Achterberg before you touch a box.' },
    { style: 'grid', tag: 'HOLDINGS', heading: 'Boxes 1–318', accent: '#5b6a72',
      body: 'Four destruction requests refused, 2021–2024. The refusals are in box 12.' },
  ],
};

/** Notices along the hall itself. */
const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'THE HALL', heading: 'Marks are metres from the shopfront', accent: '#2f6f9f',
    body: 'The two coloured plates are the case: what the summary said, and what the ground says.' },
  { style: 'list', tag: 'UNIT', heading: 'Conviction Integrity Unit', accent: '#2f5a4a',
    items: [['Bay and survey', 'south end'], ['Interview suites', 'west'],
      ['Identification rig', 'east'], ['Data and records', 'north end']],
    body: 'Visitors are escorted past the kerb line.' },
  { style: 'warning', tag: 'CASES UNDER REVIEW', heading: 'Nothing said in this building is a finding', accent: '#b5502f',
    body: 'Until it is written down, dated and supported, it is a conversation.' },
  { style: 'sticky', tag: 'NOTE', heading: 'The hall is not a corridor', accent: '#8a6a1e',
    body: 'Please do not park trolleys on the marks. Somebody is always measuring.' },
];

/** Not used: this theme has no outdoor world. */
export function decorate(){}

/** Fit out one room. `bounds` gives the room's inner and outer faces. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall
  const outX = b.xOuter - f * 0.55;    // against the exterior wall

  /** A chair. Four of these read as a room somebody works in. */
  const chair = (x, z, facing = 0) => {
    box(0.46, 0.06, 0.46, x, 0.44, z, M.frame, facing);
    box(0.44, 0.5, 0.07, x, 0.7, z - 0.2 * Math.cos(facing), M.base, facing);
    for(const [dx, dz] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]){
      box(0.04, 0.42, 0.04, x + dx, 0.21, z + dz, M.rail);
    }
    soft(x, z, 0.4);
  };

  switch(room.kind){
    case 'bay': {
      // The survey bench: meters, a tripod case, and the levelling staff that
      // gets carried out to Ferrier Street and back.
      box(0.7, 0.9, 3.6, outX, 0.45, b.cz + 2.2, M.frame);
      hard(outX, b.cz + 2.2, 0.8, 3.7, 0.95);
      // A tripod, legs splayed, standing where it is left rather than stowed.
      for(let i = 0; i < 3; i++){
        const a = (i / 3) * Math.PI * 2;
        box(0.05, 1.5, 0.05, b.cx + Math.cos(a) * 0.28, 0.75, b.cz - 3.2 + Math.sin(a) * 0.28,
          M.rail, a);
      }
      box(0.26, 0.16, 0.26, b.cx, 1.56, b.cz - 3.2, M.base);
      soft(b.cx, b.cz - 3.2, 0.6);
      break;
    }
    case 'interview': {
      // A table across the room, two chairs, and the recorder between them.
      box(1.5, 0.05, 0.9, b.cx, 0.74, b.cz, M.frame);
      for(const [dx, dz] of [[-0.65, -0.35], [0.65, -0.35], [-0.65, 0.35], [0.65, 0.35]]){
        box(0.06, 0.72, 0.06, b.cx + dx, 0.36, b.cz + dz, M.rail);
      }
      hard(b.cx, b.cz, 1.6, 1.0, 0.78);
      chair(b.cx, b.cz - 1.05, 0);
      chair(b.cx, b.cz + 1.05, Math.PI);
      box(0.3, 0.09, 0.18, b.cx, 0.81, b.cz, M.base);
      break;
    }
    case 'lineup': {
      // The rig: a lit backdrop with six standing positions, and a bench facing
      // it at the distance the procedure is run from.
      const backZ = room.z0 + 1.4;
      box(0.12, 2.6, 6.4, b.cx + f * 2.6, 1.3, backZ + 2.2, M.wall, Math.PI / 2);
      for(let i = 0; i < 6; i++){
        const z = backZ + 0.6 + i * 0.92;
        box(0.1, 2.0, 0.1, b.cx + f * 2.6 - f * 0.1, 1.0, z, M.rail);
        box(0.24, 0.3, 0.02, b.cx + f * 2.35, 2.25, z, M.frame);
      }
      hard(b.cx + f * 2.6, backZ + 2.2, 0.4, 6.5, 2.6);
      // The bench the witness sits on, and the height scale beside the door.
      box(1.9, 0.07, 0.42, b.cx - f * 1.6, 0.46, b.cz + 1.4, M.frame, Math.PI / 2);
      hard(b.cx - f * 1.6, b.cz + 1.4, 0.5, 2.0, 0.5);
      box(0.06, 2.1, 0.3, b.xOuter - f * 0.2, 1.05, room.z1 - 1.2, M.base);
      break;
    }
    case 'observation': {
      // One-way glass into the identification suite, and a bench behind it in
      // the dark. The wall it is set into is the one shared with the rig.
      box(0.05, 1.1, 3.2, b.cx, 1.55, room.z0 + 0.12, M.glass, Math.PI / 2);
      box(0.14, 0.16, 3.4, b.cx, 2.16, room.z0 + 0.12, M.frame, Math.PI / 2);
      box(0.14, 0.16, 3.4, b.cx, 0.96, room.z0 + 0.12, M.frame, Math.PI / 2);
      box(2.4, 0.07, 0.4, b.cx, 0.46, room.z0 + 1.3, M.base, Math.PI / 2);
      hard(b.cx, room.z0 + 1.3, 0.5, 2.5, 0.5);
      break;
    }
    case 'deliberation': {
      // Twelve chairs and a table, and a camera on a pole that is on when the
      // light beside it is.
      box(2.0, 0.06, 4.4, b.cx, 0.74, b.cz, M.frame);
      for(const [dx, dz] of [[-0.85, -1.9], [0.85, -1.9], [-0.85, 1.9], [0.85, 1.9]]){
        box(0.08, 0.72, 0.08, b.cx + dx, 0.36, b.cz + dz, M.rail);
      }
      hard(b.cx, b.cz, 2.1, 4.5, 0.78);
      for(let i = 0; i < 3; i++){
        chair(b.cx - 1.5, b.cz - 1.4 + i * 1.4, Math.PI / 2);
        chair(b.cx + 1.5, b.cz - 1.4 + i * 1.4, -Math.PI / 2);
      }
      box(0.09, 2.3, 0.09, b.xOuter - f * 0.9, 1.15, b.cz - 3.0, M.rail);
      box(0.2, 0.14, 0.28, b.xOuter - f * 0.9, 2.3, b.cz - 3.0, M.base);
      soft(b.xOuter - f * 0.9, b.cz - 3.0, 0.4);
      break;
    }
    case 'data': {
      // Desks along the outer wall, which is where the norms and the transcripts
      // are read.
      box(0.72, 0.74, 4.6, outX, 0.37, b.cz, M.frame);
      hard(outX, b.cz, 0.8, 4.7, 0.78);
      chair(outX - f * 0.9, b.cz - 1.2, f > 0 ? -Math.PI / 2 : Math.PI / 2);
      chair(outX - f * 0.9, b.cz + 1.2, f > 0 ? -Math.PI / 2 : Math.PI / 2);
      break;
    }
    case 'archive': {
      // Rolling shelving, in the order the boxes arrived.
      for(let i = 0; i < 4; i++){
        const z = room.z0 + 1.6 + i * 1.9;
        box(1.9, 2.2, 0.5, b.cx + f * 0.4, 1.1, z, M.base, Math.PI / 2);
        hard(b.cx + f * 0.4, z, 2.0, 0.6, 2.2);
      }
      break;
    }
    case 'booth': {
      // A light trap: an inner box you walk round rather than into, so no white
      // light reaches the far end of it.
      box(0.1, 2.5, 3.0, b.cx + f * 0.2, 1.25, b.cz - 0.6, M.base, Math.PI / 2);
      hard(b.cx + f * 0.2, b.cz - 0.6, 0.2, 3.0, 2.5);
      box(1.6, 0.07, 0.42, b.xOuter - f * 0.9, 0.46, b.cz + 1.4, M.frame, Math.PI / 2);
      hard(b.xOuter - f * 0.9, b.cz + 1.4, 0.5, 1.7, 0.5);
      break;
    }
    case 'lab':
    case 'quiet':
    case 'supply':
    default: {
      if(room.kind === 'lab'){
        box(0.66, 0.9, 3.2, inX + f * 0.9, 0.45, b.cz, M.frame);
        hard(inX + f * 0.9, b.cz, 0.8, 3.3, 0.95);
      }
      break;
    }
  }

  // What the shared kit puts in on top of the room's own thing.
  const KIND = {
    BAYW: 'lab', INT1: 'office', INT2: 'office', BOOTH: 'quiet', PHYS: 'lab',
    QUIET: 'quiet', BAYE: 'supply', LINEUP: 'station', OBS: 'quiet',
    DELIB: 'office', DATA: 'station', RECS: 'supply',
  };
  const FITTINGS = {
    BAYW: ['toolBoard', 'cableDrum', 'monitorBank'],
    INT1: ['whiteboard', 'monitorBank'],
    INT2: ['whiteboard', 'toolBoard'],
    BOOTH: ['toolBoard'],
    PHYS: ['monitorBank', 'rack', 'toolBoard'],
    QUIET: ['whiteboard'],
    BAYE: ['barrel', 'cableDrum', 'toolBoard', 'rack'],
    LINEUP: ['monitorBank', 'rack', 'toolBoard'],
    OBS: ['monitorBank'],
    DELIB: ['whiteboard', 'monitorBank'],
    DATA: ['monitorBank', 'monitorBank', 'whiteboard', 'rack'],
    RECS: ['barrel', 'cableDrum', 'rack', 'toolBoard'],
  };

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    bounds: {
      x0: b.xInner + f * 2.1, x1: b.xOuter - f * 0.55,
      z0: room.z0 + 0.8, z1: room.z1 - 0.8,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: ctx.P.wall,
    // Where those planes are actually solid: every closed room has a doorway in
    // the middle of its spine face, an open one has nothing but a nib at each
    // end, and a cross-wall exists only where a room actually adjoins another.
    wallOk: (x, z) => {
      const mine = (ctx.plan?.rooms ?? []).filter(r2 => r2.side === room.side);
      const last = mine[mine.length - 1];
      const crossAt = (zz) => mine.some(r2 => Math.abs(r2.z0 - zz) < 0.06)
        || (last && Math.abs(last.z1 - zz) < 0.06);
      if(Math.abs(z - room.z0) < 0.4 && !crossAt(room.z0)) return false;
      if(Math.abs(z - room.z1) < 0.4 && !crossAt(room.z1)) return false;
      const onSpine = Math.abs(x - b.xInner) < 0.4;
      if(!onSpine) return true;
      const NIB = 0.9;
      if(room.open) return z < room.z0 + NIB || z > room.z1 - NIB;
      const dw = room.door === 'wide' ? ctx.P.doorWideW : ctx.P.doorW;
      return Math.abs(z - b.cz) > dw / 2 + 0.2;
    },
    kind: KIND[room.id] ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    seed: `sightline-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The rig's backdrop and the panel table are the room, and the kit filling
      // in around them must not stand on either.
      ...(room.kind === 'lineup' ? [{ x: b.cx + f * 2.0, z: room.z0 + 3.6, r: 3.2 }] : []),
      ...(room.kind === 'deliberation' ? [{ x: b.cx, z: b.cz, r: 3.0 }] : []),
      ...(room.kind === 'interview' ? [{ x: b.cx, z: b.cz, r: 2.0 }] : []),
    ],
    target: 16,
  });
}

/** The hall: the reconstruction at one end, and the marks running away from it. */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard, soft } = ctx;
  const sp = plan.spine ?? { z0: -10, z1: 44 };
  const HW = P.corridorHalfWidth;
  const facadeZ = sp.z0 + FACADE_INSET;

  // ------------------------------------------------------------ the corner
  //
  // Ferrier Street at 1:1, across the end of the hall. It is a facade and a kerb
  // and a lamp, and it is the only thing in the building that is a copy of
  // somewhere else.

  // The facade is built toward the hall — +z is the street side. Every detail of
  // it sits proud of the brick, because the first version put the doorway and
  // the window a fifth of a metre *behind* the wall and the whole corner
  // rendered as one flat slab.
  const shopMat = new THREE.MeshStandardMaterial({ color: 0x4a4a41, roughness: 0.8 });
  const brickMat = new THREE.MeshStandardMaterial({ color: 0x6d5546, roughness: 0.95 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 1.0 });
  box(HW * 2, 3.2, 0.25, 0, 1.6, facadeZ, brickMat);
  // Fascia across the top, proud of the brick, with a lighter name plate on it.
  box(HW * 2, 0.62, 0.34, 0, 2.92, facadeZ + 0.16, shopMat);
  box(2.4, 0.3, 0.05, 0.4, 2.9, facadeZ + 0.35,
    new THREE.MeshStandardMaterial({ color: 0xb9b2a0, roughness: 0.7 }));

  // The doorway: a dark recess with a pilaster each side, offset from the middle
  // of the frontage exactly as the survey has it. The offset is what puts the
  // witness off the axis.
  const doorX = -0.9;
  box(1.15, 2.3, 0.06, doorX, 1.15, facadeZ + 0.14, darkMat);
  box(0.2, 2.5, 0.3, doorX - 0.68, 1.25, facadeZ + 0.2, shopMat);
  box(0.2, 2.5, 0.3, doorX + 0.68, 1.25, facadeZ + 0.2, shopMat);
  box(1.6, 0.16, 0.34, doorX, 2.44, facadeZ + 0.2, shopMat);

  // The window, lit from inside. With the column out, this is most of the light
  // the corner had — about two lux at the doorway on Bekele's meter.
  const glow = new THREE.MeshStandardMaterial({
    color: 0xd8c79a, emissive: 0xd8b878, emissiveIntensity: 0.85, roughness: 0.35 });
  box(2.7, 1.55, 0.06, 1.6, 1.72, facadeZ + 0.14, glow);
  box(2.9, 0.16, 0.3, 1.6, 0.9, facadeZ + 0.2, shopMat);      // stall riser head
  box(2.9, 0.16, 0.3, 1.6, 2.54, facadeZ + 0.2, shopMat);     // window head
  box(0.1, 1.55, 0.28, 1.6, 1.72, facadeZ + 0.2, shopMat);    // mullion
  box(2.9, 0.9, 0.28, 1.6, 0.45, facadeZ + 0.18, brickMat);   // stall riser
  hard(0, facadeZ, HW * 2, 0.8, 3.2);

  // The kerb, and the road camber the survey recorded. Low enough to step over
  // and high enough to see, which is what a kerb is.
  const kerbMat = new THREE.MeshStandardMaterial({ color: 0x8a8a80, roughness: 0.95 });
  box(HW * 2, 0.14, 0.3, 0, 0.07, facadeZ + 2.4, kerbMat);
  soft(0, facadeZ + 2.4, 0.3);

  // Column 4471, standing where the survey puts it and dark, because the
  // utility ticket says it was out from 2 to 21 November.
  const colX = -HW + 0.7, colZ = facadeZ + 3.6;
  box(0.18, 5.0, 0.18, colX, 2.5, colZ, M.base);
  box(0.55, 0.2, 0.9, colX + 0.26, 4.95, colZ, M.base);
  box(0.36, 0.12, 0.52, colX + 0.46, 4.82, colZ,
    new THREE.MeshStandardMaterial({ color: 0x2a2c29, roughness: 0.6 }));
  hard(colX, colZ, 0.4, 0.4, 5.0);

  // ------------------------------------------------------------ the marks
  //
  // Metres from the facade, let into the floor. The two case marks get a plate
  // as well as a strip, and they are the only coloured things on this floor.
  const stripMat = new THREE.MeshStandardMaterial({ color: 0x4f5350, roughness: 0.8 });
  for(const m of MARKS){
    const z = facadeZ + m.d;
    if(z > sp.z1 - 1) continue;
    const mat = m.case
      ? new THREE.MeshStandardMaterial({ color: m.tint, roughness: 0.6,
        emissive: m.tint, emissiveIntensity: 0.18 })
      : stripMat;
    box(HW * 2 - 0.4, 0.014, m.case ? 0.24 : 0.09, 0, 0.008, z, mat);
    if(m.case){
      // A plate on each side of the hall, so the mark is legible whichever
      // pavement the player is walking on.
      for(const s of [-1, 1]){
        box(0.62, 0.018, 0.46, s * (HW - 0.8), 0.01, z, mat);
      }
    }
  }

  // The hall's own furniture and notices.
  const solidSpans = (side) => {
    const out = [];
    const NIB = 0.9;
    for(const r of (plan.rooms ?? []).filter(x => x.side === side)){
      const cz = (r.z0 + r.z1) / 2;
      if(r.open){
        out.push({ z0: r.z0, z1: r.z0 + NIB });
        out.push({ z0: r.z1 - NIB, z1: r.z1 });
      } else {
        const dw = r.door === 'wide' ? P.doorWideW : P.doorW;
        out.push({ z0: r.z0, z1: cz - dw / 2 - 0.06 });
        out.push({ z0: cz + dw / 2 + 0.06, z1: r.z1 });
      }
    }
    return out.filter(s => s.z1 - s.z0 > 1.0);
  };
  const solidAt = (side, z) => solidSpans(side).some(s => z > s.z0 + 0.35 && z < s.z1 - 0.35);

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: HW,
    wallThickness: P.wall,
    // Nothing in the first six metres: that is the reconstruction, and a bench
    // parked on the kerb line is a bench standing in Ferrier Street.
    z0: sp.z0 + 7, z1: sp.z1,
    seed: 'sightline-hall',
    every: 5.5,
    signEvery: 3.4,
    signs: CORRIDOR_TEXT,
    hard,
    keepClear: MARKS.filter(m => m.case).map(m => ({ x: 0, z: facadeZ + m.d, r: 2.0 })),
    wallOk: (x, z) => solidAt(x < 0 ? 'w' : 'e', z),
  });

  // A light gradient painted along the west wall: two lux at the corner, working
  // light at the far end. It is the building explaining itself to nobody.
  const wallX = HW - 0.06;
  for(const span of solidSpans('w')){
    const len = span.z1 - span.z0 - 0.5;
    if(len < 1.5) continue;
    const parts = Math.max(1, Math.round(len / 7));
    for(let i = 0; i < parts; i++){
      const w = len / parts;
      const cz = span.z0 + 0.25 + (i + 0.5) * w;
      paintMural({
        box: (bw, bh, bd, x, y, z, material, ry = 0) => box(bw, bh, bd, x, y, z, material, ry),
        x: -wallX, z: cz, faceX: true, toward: 1,
        w: w - 0.12, h: 0.44, y: 0.98, kind: 'gradient', paper: '#dcdcd2',
        t0: (cz - w / 2 - sp.z0) / (sp.z1 - sp.z0),
        t1: (cz + w / 2 - sp.z0) / (sp.z1 - sp.z0),
        seed: `w-${Math.round(cz)}`,
      });
    }
  }
}
