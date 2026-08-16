// props.js — the objects that make the Fenwick Coordinating Centre itself.
//
// Anything generic (worktops, chairs, cabinets, shelving, crates, notices) comes
// from engine/world/interiorKit.js through `furnishRoom`. This file is the ten
// or so things that are this building and nowhere else:
//
//   · the kit warehouse — aisles of numbered boxes, which is what allocation
//     concealment looks like when you can walk down it;
//   · the cold room door, with its logger chart;
//   · the infusion bay's chairs and drip stands, and the enrolment wall;
//   · the infusion bay's chairs and drip stands;
//   · the enrolment wall on the data floor, one card per site.
//
// Interior hooks get the builder context from engine/world/interiorSite.js:
//   { scene, plan, geo, P, box, wall, materials, soft, hard, addInteractable }

import { furnishRoom, furnishCorridor, furnishingMaterials, markWallMounted, markStructure }
  from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * A working building, so: the rota, the counts somebody actually keeps, the
 * notice that exists because of something that happened once. Nine parts earnest
 * and one part the joke a real office has, because reversing that ratio turns a
 * trials unit into a sitcom set. Everything here has to land at walking pace.
 */
const WALL_TEXT = {
  SCREEN: [
    { style: 'banner', tag: 'BEFORE ANYTHING', heading: 'Consent is a conversation', accent: '#1f4e6b',
      body: 'The form records it. It is not it. If they cannot say back what the trial is asking of '
        + 'them, they have not consented yet.' },
    { style: 'list', tag: 'ENTRY CRITERIA', heading: 'CLARION-3, protocol v6', accent: '#5b6a72',
      items: [['Age', '18 and over'], ['Diagnosis', 'confirmed, documented'],
        ['Prior treatment', 'at least one course'], ['Amended v4', 'two criteria widened']],
      body: 'Record everybody screened, including the ones you do not enter. Especially those.' },
    { style: 'sticky', tag: 'NOTE', heading: 'The pen on the string', accent: '#8a6a1e',
      body: 'Is the third one this year. It stays here.' },
  ],
  INFUSE: [
    { style: 'banner', tag: 'INFUSION BAY', heading: 'Four hours in the chair', accent: '#1f4e6b',
      body: 'Blankets in the cupboard, tea on the trolley, and somebody will tell you how long is '
        + 'left if you ask. The wifi password is on the window.' },
    { style: 'warning', tag: 'IF YOU FEEL WARM', heading: 'Say so at the time', accent: '#b5502f',
      body: 'Flushing in the first fortnight is common and settles. It is still recorded, every '
        + 'time, in the notes.' },
    { style: 'grid', tag: 'THIS WEEK', heading: 'Chairs 1–6, Monday to Friday', accent: '#5b6a72',
      body: 'Bring somebody if you like. Chair 4 is the one by the window and everybody wants it.' },
  ],
  MONITOR: [
    { style: 'banner', tag: 'MONITORING', heading: 'The notes are the source', accent: '#1f4e6b',
      body: 'The form is a copy of the notes. Where they disagree the notes win, and a query goes '
        + 'back the same day.' },
    { style: 'grid', tag: 'SITE VISITS', heading: 'This quarter: 22 of 31', accent: '#3f6f8f',
      body: 'Sites 12 and 19 twice. Red is overdue. Nobody is in trouble for a red square.' },
    { style: 'chart', tag: 'OPEN QUERIES', heading: 'Down from 340 in March', accent: '#8a6a1e',
      body: 'Forty-one left, and eleven of those are one site with a fax machine.' },
    { style: 'list', tag: 'ON THE ROAD', heading: 'Who is where this week', accent: '#5b6a72',
      items: [['Marchetti', 'sites 4 and 19'], ['Two monitors', 'the northern group'],
        ['Nobody', 'site 12 — booked for next week']],
      body: 'Mileage claims to Renner, not to me.' },
  ],
  LAB: [
    { style: 'warning', tag: 'MINUS EIGHTY', heading: 'The freezer alarms to three phones', accent: '#b5502f',
      body: 'If it sounds, do not open it. Call the number before you do anything else. '
        + 'Everything in there is somebody who came in once and cannot come again.' },
    { style: 'list', tag: 'CHAIN OF CUSTODY', heading: 'Every aliquot, every move', accent: '#5b6a72',
      items: [['Taken', 'site, date, time'], ['Received', 'here, signed'],
        ['Moved', 'rack and position'], ['Destroyed', 'date and by whom']],
      body: 'A sample with no history is a sample about nothing.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Somebody left the door ajar', accent: '#8a6a1e', body: '' },
  ],
  STATS: [
    { style: 'banner', tag: 'THE PLAN', heading: 'Written before the data', accent: '#1f4e6b',
      body: 'Analysis plan v4, in force since March. Every version kept, every date recorded. '
        + 'If it is not in here, we are not claiming it.' },
    { style: 'chart', tag: 'ACCRUAL', heading: '246 of 380 events', accent: '#3f6f8f',
      body: 'Information fraction 0.65. The calendar says three quarters. The calendar is not what '
        + 'the boundary is set from.' },
    { style: 'grid', tag: 'PRESPECIFIED SUBGROUPS', heading: 'Fourteen of them', accent: '#8a6a1e',
      body: 'Numbered, in the plan, since 2021. One of fourteen clearing the line is close to '
        + 'expected. Count before you argue.' },
    { style: 'sticky', tag: 'NOTE', heading: 'No, you cannot have a peek', accent: '#b5502f',
      body: 'Asked and answered. — M.F.' },
  ],
  REG: [
    { style: 'list', tag: 'REPORTING WINDOWS', heading: 'Clock starts when we know', accent: '#b5502f',
      items: [['Fatal or life-threatening', '7 days'], ['Other serious, unexpected, related', '15 days'],
        ['Annual safety report', 'due 30 June'], ['Registry update', 'before the change is used']],
      body: 'The window is set by what it is, not by what we think caused it.' },
    { style: 'grid', tag: 'PROTOCOL VERSIONS', heading: 'v1 to v6, and the dates', accent: '#5b6a72',
      body: 'Four amendments. Ask me which was in force on any day of the last four years — that is '
        + 'the whole job.' },
    { style: 'banner', tag: 'REGISTERED', heading: 'ISRCTN 44 802 173', accent: '#1f4e6b',
      body: 'Public entry updated eleven days ago. A trial nobody can find is a trial that can '
        + 'quietly stop existing.' },
  ],
  DATA: [
    { style: 'banner', tag: 'DATA MANAGEMENT', heading: 'Empty is not zero', accent: '#1f4e6b',
      body: 'A blank field means nobody wrote anything down. A zero means somebody looked and found '
        + 'none. Storing them the same way destroys one of them.' },
    { style: 'chart', tag: 'RECONCILIATION', heading: 'Balanced on the first run', accent: '#3f6f8f',
      body: 'First time in two years. Nobody is to touch anything.' },
    { style: 'grid', tag: 'ENROLMENT', heading: 'One card per site, 31 of them', accent: '#8a6a1e',
      body: 'Site 12 is the tall one. That is not straightforwardly good news.' },
    { style: 'sticky', tag: 'LOCK', heading: 'Thursday, 17:00', accent: '#b5502f',
      body: 'Queries that change an endpoint first. Spellings can wait until Friday.' },
  ],
  ADJUD: [
    { style: 'banner', tag: 'ADJUDICATION', heading: 'No arm, no site, no name', accent: '#1f4e6b',
      body: 'Three readers to a file. If you recognise a case, say so and hand it on.' },
    { style: 'list', tag: 'THE DEFINITION', heading: 'Agreed 2021, unchanged', accent: '#5b6a72',
      items: [['Admission', 'for the trial condition'], ['Duration', 'overnight or longer'],
        ['Evidence', 'contemporaneous notes'], ['Ambiguous', 'ruled by majority, recorded']],
      body: 'A file assembled after the fact is a file with an opinion in it already.' },
    { style: 'warning', tag: 'QUIET', heading: 'Reading in progress', accent: '#b5502f',
      body: 'Do not come in to ask how it is going. It is going.' },
  ],
  KIT: [
    { style: 'warning', tag: 'COLD CHAIN', heading: '2 to 8 degrees, no exceptions', accent: '#b5502f',
      body: 'Logger on the door, alarm to two phones. An acknowledged alarm is not a resolved alarm. '
        + 'Site 19 acknowledged twice and nobody went.' },
    { style: 'grid', tag: 'KIT NUMBERS', heading: '0001 to 4000, in order', accent: '#3f6f8f',
      body: 'Identical but for the number. That is not packaging — that is the trial.' },
    { style: 'list', tag: 'CODE BREAK', heading: 'Two in four years', accent: '#8a6a1e',
      items: [['Envelope', 'in the box, sealed'], ['Who may open', 'the treating doctor'],
        ['Permission needed', 'none'], ['Logged', 'always, within 24 hours']],
      body: 'If knowing changes what they do for that person tonight, open it.' },
    { style: 'tally', tag: 'QUARANTINE', heading: 'Boxes held, this year', accent: '#5b6a72', body: '' },
  ],
  UNBLIND: [
    { style: 'warning', tag: 'UNBLINDED AREA', heading: 'Do not read over a shoulder', accent: '#b5502f',
      body: 'Everything on this desk is by arm. If you are blinded and you are in here, look at the '
        + 'floor and say what you came to say.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Printouts face down', accent: '#8a6a1e',
      body: 'Yes, including that one.' },
  ],
  RANDOM: [
    { style: 'banner', tag: 'ALLOCATION', heading: 'The sequence, and nothing else', accent: '#1f4e6b',
      body: 'Generated before the trial opened, held here, released one participant at a time. '
        + 'Screens face the wall, and that is deliberate.' },
    { style: 'grid', tag: 'BLOCKS', heading: 'Length varies, and is not published', accent: '#5b6a72',
      body: 'Balance at every site, without the next one being guessable. Both halves matter.' },
  ],
  BOARD: [
    { style: 'banner', tag: 'CLOSED SESSION', heading: 'Independent monitoring board', accent: '#b5502f',
      body: 'Three meetings in the life of this trial. The only room in the building where the two '
        + 'arms appear on the same page.' },
    { style: 'list', tag: 'WHAT IT MAY RECOMMEND', heading: 'Three things, and only three', accent: '#1f4e6b',
      items: [['Continue', 'to the planned events'], ['Stop', 'for benefit'],
        ['Stop', 'for futility'], ['The sponsor', 'decides — the board advises']],
      body: 'Minutes are the argument. They outlast everybody in the room.' },
    { style: 'grid', tag: 'MEMBERSHIP', heading: 'Nobody with a stake', accent: '#5b6a72',
      body: 'No role in the trial, no shareholding, no paper riding on it. That is the qualification.' },
  ],
  ARCHIVE: [
    { style: 'banner', tag: 'TRIAL MASTER FILE', heading: 'Everything, with its date', accent: '#1f4e6b',
      body: 'Kept for twenty-five years after the last participant. Somebody who has never met any '
        + 'of us has to be able to reconstruct what we promised and when.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Nothing leaves this room', accent: '#8a6a1e',
      body: 'Sign the sheet, read it here, put it back where it was.' },
  ],
};

/** Which kit recipe each room draws its furniture from. */
const KIND = {
  SCREEN: 'reception', INFUSE: 'waiting', MONITOR: 'office', LAB: 'lab',
  STATS: 'station', REG: 'office', DATA: 'station', ADJUD: 'quiet',
  KIT: 'supply', UNBLIND: 'quiet', RANDOM: 'workroom', BOARD: 'station',
  ARCHIVE: 'supply',
};

/** The narrative fittings each room gets before the generic furniture fills in. */
const FITTINGS = {
  SCREEN: ['monitorBank', 'toolBoard'],
  INFUSE: ['monitorBank', 'trolley'],
  MONITOR: ['monitorBank', 'toolBoard', 'crate'],
  LAB: ['sampleStore', 'rack', 'toolBoard'],
  STATS: ['monitorBank', 'whiteboard', 'rack'],
  REG: ['rack', 'cabinet', 'monitorBank'],
  DATA: ['monitorBank', 'monitorBank', 'whiteboard'],
  ADJUD: ['monitorBank', 'whiteboard'],
  KIT: ['shelfUnit', 'crate', 'barrel', 'trolley'],
  UNBLIND: ['monitorBank', 'cabinet'],
  RANDOM: ['rack', 'rack', 'monitorBank'],
  BOARD: ['monitorBank', 'whiteboard'],
  ARCHIVE: ['shelfUnit', 'shelfUnit', 'crate'],
};

/** Nothing here: this theme has no outdoor world. */
export function decorate(scene, ctx){ void scene; void ctx; }

/**
 * Build the seats `plan.seats` declares, for the room they fall inside.
 *
 * The crowd sits people at those coordinates whether or not anything is there,
 * and the scaffold leaves the building of them to the theme — so an infusion bay
 * with five declared chairs rendered as five drip stands and a floor, with staff
 * sitting in mid-air beside them.
 */
function buildSeats(room, ctx){
  const { bounds: b, box, materials: M, soft } = ctx;
  const seats = (ctx.plan?.seats ?? []).filter(([x, z]) =>
    z > room.z0 && z < room.z1 && (b.sign > 0 ? x > b.xInner : x < b.xInner));
  for(const [x, z, yaw = 0] of seats){
    box(0.52, 0.08, 0.52, x, 0.44, z, M.frame, yaw);          // the seat
    box(0.52, 0.52, 0.08, x - Math.sin(yaw) * 0.24, 0.72, z - Math.cos(yaw) * 0.24, M.frame, yaw);
    box(0.1, 0.42, 0.1, x, 0.21, z, M.rail);                  // the pedestal
    box(0.44, 0.05, 0.44, x, 0.03, z, M.rail);                // and its foot
    soft({ x, z, r: 0.42 });
  }
  return seats.length;
}

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall
  const seated = buildSeats(room, ctx);

  // The one thing that is this room and nothing else, placed before the kit
  // fills in around it.
  switch(room.id){
    case 'KIT': {
      // Two aisles of racking down the long axis, and a cold-room box at the
      // north end with its own door. This is the room the game is named after
      // in every way that matters: identical boxes in numbered order.
      // Racking against both long walls, with the aisle down the middle on the
      // line of the door. Built across the middle instead — which is where it
      // was first — the room is a wall of boxes you cannot walk into, and the
      // doorway view is a close-up of a crate.
      const rackX = [b.xInner + f * 1.0, b.xOuter - f * 1.0];
      for(const ax of rackX){
        const nearSpine = Math.abs(ax - b.xInner) < 1.4;
        for(let z = room.z0 + 1.4; z < room.z1 - 5.2; z += 2.4){
          // Keep the way in clear: nothing on the spine side across the doorway.
          if(nearSpine && Math.abs(z + 1.0 - b.cz) < 2.4) continue;
          const upright = box(0.7, 2.3, 0.08, ax, 1.15, z, M.rail);
          markStructure([upright], 'rack');
          for(const shelfY of [0.4, 0.95, 1.5, 2.05]){
            box(0.7, 0.05, 2.0, ax, shelfY, z + 1.0, M.frame);
            // The boxes themselves: pale, identical, four to a shelf, and the
            // only thing telling them apart is a number.
            for(let i = 0; i < 4; i++){
              box(0.3, 0.22, 0.36, ax, shelfY + 0.14, z + 0.3 + i * 0.47, M.wall);
            }
          }
          hard(ax, z + 1.0, 0.8, 2.1, 2.3);
        }
      }
      // The cold room: a walk-in box against the far wall with a heavy door.
      const cz = room.z1 - 2.6;
      box(3.2, 2.6, 4.0, b.xOuter - f * 1.7, 1.3, cz, M.frame);
      box(0.12, 2.0, 1.0, b.xOuter - f * 3.3, 1.0, cz - 1.2, M.rail);
      hard(b.xOuter - f * 1.7, cz, 3.4, 4.2, 2.6);
      break;
    }
    case 'INFUSE': {
      // Drip stands beside the chairs plan.js already places, so nobody sits
      // in a bay with nothing in it.
      for(const [x, z] of [[-4.6, 4.6], [-4.6, 6.4], [-4.6, 8.2], [-4.6, 10.0], [-4.6, 11.8]]){
        box(0.05, 1.9, 0.05, x - 0.75, 0.95, z, M.rail);
        box(0.16, 0.3, 0.12, x - 0.75, 1.86, z, M.wall);
        soft({ x: x - 0.75, z, r: 0.3 });
      }
      break;
    }
    case 'BOARD':
      // One table, nine places. The room is the meeting.
      box(2.4, 0.08, 5.2, b.cx, 0.74, b.cz, M.frame);
      for(const s of [-1, 1]) box(0.12, 0.72, 0.12, b.cx + s * 1.0, 0.36, b.cz, M.rail);
      hard(b.cx, b.cz, 2.6, 5.4, 0.8);
      break;
    case 'DATA': {
      // The enrolment wall: one card per site, filling as the trial recruits.
      // On the room's own outer wall — the spine side of this room is open, and
      // a card hung on an opening is a card hanging in the corridor.
      const wallX = b.xOuter - f * (ctx.P.wall / 2 + 0.03);
      for(let i = 0; i < 31; i++){
        const col = i % 8, row = Math.floor(i / 8);
        const card = box(0.03, 0.16, 0.11, wallX, 2.05 - row * 0.24, b.cz - 1.3 + col * 0.34,
          i === 11 ? M.rail : M.frame);
        markWallMounted([card], true, -f, 'enrolment card');
      }
      break;
    }
    case 'ADJUD':
      // Two reading screens back to back, so neither reader sees the other's.
      for(const s of [-1, 1]){
        box(0.08, 0.9, 1.4, b.cx + s * 0.06, 1.25, b.cz, M.base);
        box(0.7, 0.74, 1.6, b.cx + s * 0.85, 0.37, b.cz, M.frame);
      }
      hard(b.cx, b.cz, 2.0, 1.8, 1.7);
      break;
    default:
      // A working surface against the spine wall, which is where the room's own
      // instrument screen and case stand go.
      if(room.group || KIND[room.id] === 'station' || KIND[room.id] === 'office'){
        box(0.62, 0.9, 3.0, inX + f * 0.9, 0.45, b.cz, M.frame);
        hard(inX + f * 0.9, b.cz, 0.8, 3.2, 0.95);
      }
      break;
  }

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    bounds: {
      x0: b.xInner + f * 2.0, x1: b.xOuter - f * 0.55,
      z0: room.z0 + 0.7, z1: room.z1 - 0.7,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: ctx.P.wall,
    // Where those planes are actually solid: a doorway in the middle of every
    // closed room's spine face, nothing but end nibs across an open one, and no
    // cross-wall where nothing adjoins.
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
    kind: KIND[room.id] ?? room.kind ?? 'office',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    seed: `the_trial-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The warehouse aisles and the cold room are built above; keep the kit
      // from putting a filing cabinet in the middle of one.
      ...(room.id === 'KIT' ? [{ x: b.cx, z: (room.z0 + room.z1) / 2, r: 6.0 }] : []),
      ...(room.id === 'INFUSE' ? [{ x: -5.2, z: 8.0, r: 4.4 }] : []),
      // Nothing on top of a chair somebody is going to be sitting in.
      ...((ctx.plan?.seats ?? []).filter(([x, z]) =>
        z > room.z0 && z < room.z1 && (f > 0 ? x > b.xInner : x < b.xInner))
        .map(([x, z]) => ({ x, z, r: 0.9 }))),
    ],
    // A room whose seats are its furniture needs fewer pieces around them.
    target: seated ? 11 : 16,
  });
}

/**
 * Fit out one level's corridor.
 *
 * The firewall itself is not here any more: it belongs at the head of the upper
 * stair, which is `world.js`'s territory, because the stair is the thing it
 * gates. What is here is what a working corridor accumulates, per floor.
 */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard, soft } = ctx;
  // One level's corridor, not the building's: `world.js` calls this once per
  // floor with that floor's own plan. Reading the whole building's spine here
  // built three copies of everything, stacked, at the same z.
  const sp = plan.spine ?? { z0: -8, z1: 22 };
  const hw = plan.metrics?.corridorHalfWidth ?? 2.0;

  // ---- what a long corridor accumulates: notices, fire points, a records
  // trolley. Nothing in the middle; the spine is how the player gets about.
  //
  // Where each side is actually solid. Not the whole corridor: an `open` room has
  // no spine wall but a nib at each end, every other room has a doorway cut out
  // of the middle of its wall, and between z = 43 and 47 there is no room at all
  // because that is a stair. A board hung at a fixed spacing lands in one of
  // those gaps about a third of the time — which is exactly what it did.
  const solidAt = (side, z) => {
    const NIB = 0.9;
    for(const r of (plan.rooms ?? []).filter(x => x.side === side)){
      if(z < r.z0 || z > r.z1) continue;
      const cz = (r.z0 + r.z1) / 2;
      if(r.open) return z < r.z0 + NIB || z > r.z1 - NIB;
      const dw = r.door === 'wide' ? P.doorWideW : P.doorW;
      return Math.abs(z - cz) > dw / 2 + 0.2;
    }
    return false;               // no room on this side here: no wall either
  };

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: hw,
    z0: sp.z0, z1: sp.z1,
    wallThickness: P.wall,
    seed: 'the_trial-spine',
    every: 5,
    signEvery: 3.2,
    hard, soft,
    wallOk: (x, z) => solidAt(x < 0 ? 'w' : 'e', z),
    // The heads and feet of the stairs stay clear: they are how the player gets
    // between the floors, and a notice board in one is a notice board in a doorway.
    keepClear: [{ x: 0, z: sp.z0 + 1.5, r: 2.2 }, { x: 0, z: sp.z1 - 1.5, r: 2.2 }],
    signs: [
      { style: 'banner', tag: 'FENWICK COORDINATING CENTRE', heading: 'CLARION-3', accent: '#1f4e6b',
        body: 'Phase III. 2,400 randomised, 31 sites. Second interim analysis this month.' },
      { style: 'warning', tag: 'BLINDED SIDE', heading: 'Everything south of the gates', accent: '#b5502f',
        body: 'Nobody here knows which arm anybody is on. If you find out, tell the trial '
          + 'statistician the same day. It is not a disciplinary matter and it is not optional.' },
      { style: 'list', tag: 'FIRE', heading: 'Wardens, and the assembly point', accent: '#b5502f',
        items: [['Renner', 'ext 2140'], ['Umeh', 'ext 2118'], ['Diouf', 'the warehouse'],
          ['Assembly', 'the car park, by the trees']],
        body: 'The sign-in sheet at Screening is the fire roll.' },
      { style: 'grid', tag: 'THIS WEEK', heading: 'Board pack, then the lock', accent: '#3f6f8f',
        body: 'Queries Tuesday. Adjudication tray cleared Wednesday. Lock Thursday 17:00. '
          + 'Board sits the following Tuesday.' },
    ],
  });
}
