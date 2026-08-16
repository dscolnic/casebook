// props.js — what makes this floor a children's hospital and not an office.
//
// Everything generic — worktops, chairs, trolleys, cabinets, shelving, notices —
// comes from engine/world/interiorKit.js through `furnishRoom`. This file is the
// handful of things that are *this* ward: the chairs in the waiting bay, the
// examination couches, the nurses' station counter, and the wall text, which is
// the only writing in the game aimed at somebody who is eight.
//
// The old build had 766 lines of its own fit-out and 236 more of its own
// interior lighting. Almost all of it is now the shared kit, which has had two
// years of fixes the fork never got.
import { furnishRoom, furnishCorridor, furnishingMaterials, markStructure }
  from '../../engine/world/interiorKit.js';

/**
 * What is on the walls.
 *
 * A children's ward writes for two readers at once: the child, who is anxious
 * and eight, and the staff, who need the fire plan. So the notices are short,
 * concrete and kind, and the ones that are for grown-ups say so by being dull.
 * `audience.grade` is 2 for this game and the wall text is held to it.
 */
const WALL_TEXT = {
  RECEPTION: [
    { style: 'banner', tag: 'HELLO', heading: 'Tell us your name', accent: '#2b6b7a',
      body: 'Then find a seat. We will come and get you. If you feel worse while you wait, '
        + 'tell somebody straight away — do not wait your turn.' },
    { style: 'list', tag: 'WHO IS WHO', heading: 'What the colours mean', accent: '#3f8f8a',
      items: [['Green top', 'nurse'], ['Blue top', 'doctor'],
        ['Orange top', 'play specialist'], ['Grey top', 'porter']],
      body: 'Any of them can help you. Ask.' },
  ],
  WAITING: [
    { style: 'banner', tag: 'WAITING', heading: 'It is not first come, first seen', accent: '#2b6b7a',
      body: 'The sickest child goes first, even if they came last. One day that will be you, '
        + 'and you will be glad it works that way.' },
    { style: 'sticky', tag: 'FOR GROWN-UPS', heading: 'Tea and water down the hall', accent: '#8a6a1e',
      body: 'Take your child with you if you go.' },
  ],
  TRI: [
    { style: 'warning', tag: 'EMERGENCY', heading: 'The sickest child first', accent: '#b5502f',
      body: 'Nurse Alex Lee looks at every child who comes in and decides who cannot wait. '
        + 'That is what triage is: sorting, not queueing.' },
    { style: 'list', tag: 'CHECK EVERY CHILD', heading: 'In this order', accent: '#2b6b7a',
      items: [['Breathing', 'first, always'], ['Bleeding', 'next'],
        ['Awake?', 'do they know you'], ['Everything else', 'after those three']],
      body: 'The order is the point. You cannot fix a leg on a child who is not breathing.' },
  ],
  RESP: [
    { style: 'banner', tag: 'BREATHING', heading: 'Count for a whole minute', accent: '#2b6b7a',
      body: 'Fifteen seconds and multiply by four is quicker and it is wrong more often, '
        + 'because a child who notices you counting breathes differently.' },
    { style: 'chart', tag: 'NORMAL', heading: 'Breaths a minute, by age', accent: '#3f8f8a',
      body: 'A baby breathes twice as fast as you do. That is not an emergency. It is a baby.' },
  ],
  NUTR: [
    { style: 'banner', tag: 'FOOD AND WATER', heading: 'Weigh, then work it out', accent: '#2b6b7a',
      body: 'Almost everything here depends on how much a child weighs, which is why the '
        + 'scales are the first thing in the room.' },
    { style: 'sticky', tag: 'NOTE', heading: 'The stickers are in the drawer', accent: '#8a6a1e',
      body: 'One per child. Yes, they count them.' },
  ],
  DEF: [
    { style: 'warning', tag: 'WASH YOUR HANDS', heading: 'Before and after. Every time.',
      accent: '#b5502f',
      body: 'It is the single most useful thing anybody in this building does, and it is the '
        + 'thing people forget when they are busy.' },
    { style: 'banner', tag: 'GERMS', heading: 'You cannot see them and they are there',
      accent: '#2b6b7a',
      body: 'That is the whole problem with them.' },
  ],
  MOVE: [
    { style: 'banner', tag: 'PICTURES OF INSIDE', heading: 'It does not hurt', accent: '#2b6b7a',
      body: 'The machine is loud and it does not touch you. Hold still and it is over in a minute.' },
    { style: 'warning', tag: 'STAFF', heading: 'Lead aprons on the hook', accent: '#b5502f',
      body: 'Nobody in the room without one. Check the door light before you open it.' },
  ],
  BRAIN: [
    { style: 'banner', tag: 'SENSES', heading: 'What you notice, and when', accent: '#2b6b7a',
      body: 'Seeing, hearing, feeling, balancing. All of it arrives in the same place and gets '
        + 'sorted out there.' },
    { style: 'sticky', tag: 'QUIET PLEASE', heading: 'Hearing tests until four', accent: '#8a6a1e',
      body: '' },
  ],
  STATION: [
    { style: 'grid', tag: 'THE SHIFT', heading: 'Who is where', accent: '#3f8f8a',
      body: 'Six children on the board. Names come off when they go home.' },
    { style: 'list', tag: 'IF YOU NEED HELP', heading: 'Ask, in this order', accent: '#2b6b7a',
      items: [['The nurse with you', 'always first'], ['Nurse Alex Lee', 'runs the shift'],
        ['The doctor on call', 'bleep 2214'], ['Everybody', 'the red button']],
      body: 'Nobody here minds being asked. They mind not being asked.' },
  ],
  PHARM: [
    { style: 'warning', tag: 'CHECK TWICE', heading: 'Name, weight, dose', accent: '#b5502f',
      body: 'Two people check every medicine for a child. Not because anybody is careless — '
        + 'because a child is small and the numbers are small.' },
  ],
  LAB: [
    { style: 'banner', tag: 'CLEAN LAB', heading: 'Labels on before you leave the room',
      accent: '#2b6b7a',
      body: 'A tube with no name on it is a test nobody can use, and a child who has to be '
        + 'pricked again.' },
  ],
  QUIET: [
    { style: 'banner', tag: 'QUIET ROOM', heading: 'You can stay as long as you like',
      accent: '#3f8f8a',
      body: 'There are tissues, there is tea, and nobody will ask you to move.' },
  ],
  SUPPLY: [
    { style: 'grid', tag: 'CLEAN SUPPLY', heading: 'Put it back where it lives', accent: '#5b6a72',
      body: 'The person looking for it next is looking for it in a hurry.' },
  ],
};

/** Which shared recipe each room's furniture comes from. */
const KIND = {
  RECEPTION: 'reception', WAITING: 'waiting', RESP: 'lab', NUTR: 'lab', DEF: 'lab',
  QUIET: 'quiet', TRI: 'station', PHARM: 'supply', LAB: 'lab', MOVE: 'workroom',
  BRAIN: 'lab', STATION: 'station', SUPPLY: 'supply',
};

/** The narrative fittings each room gets before the generic furniture fills in. */
const FITTINGS = {
  RECEPTION: ['monitorBank'],
  RESP: ['stretcher', 'monitorBank', 'toolBoard'],
  NUTR: ['sampleStore', 'toolBoard'],
  DEF: ['sampleStore', 'toolBoard', 'monitorBank'],
  TRI: ['stretcher', 'monitorBank', 'toolBoard'],
  PHARM: ['sampleStore', 'shelfUnit'],
  LAB: ['sampleStore', 'toolBoard'],
  MOVE: ['stretcher', 'rack', 'monitorBank'],
  BRAIN: ['monitorBank', 'toolBoard'],
  STATION: ['monitorBank', 'monitorBank', 'whiteboard'],
  SUPPLY: ['shelfUnit', 'shelfUnit', 'crate'],
};

/** Nothing here: this theme has no outdoor world. */
export function decorate(scene, ctx){ void scene; void ctx; }

/**
 * The waiting-room chairs, from `plan.seats`.
 *
 * The crowd sits children at those coordinates whether or not anything is
 * there, and a child hovering forty centimetres above a floor is the first
 * thing anybody notices.
 */
function buildSeats(room, ctx){
  const { bounds: b, box, materials: M, soft } = ctx;
  const seats = (ctx.plan?.seats ?? []).filter(([x, z]) =>
    z > room.z0 && z < room.z1 && (b.sign > 0 ? x > b.xInner : x < b.xInner));
  for(const [x, z, yaw = 0] of seats){
    box(0.5, 0.07, 0.5, x, 0.42, z, M.frame, yaw);
    box(0.5, 0.46, 0.07, x - Math.sin(yaw) * 0.22, 0.66, z - Math.cos(yaw) * 0.22, M.frame, yaw);
    for(const sx of [-0.2, 0.2]) box(0.05, 0.4, 0.05, x + sx, 0.2, z, M.rail);
    soft({ x, z, r: 0.38 });
  }
  return seats.length;
}

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;
  const inX = b.xInner + f * 0.5;
  const seated = buildSeats(room, ctx);

  switch(room.id){
    case 'RECEPTION':
      // A counter you queue at, with a low section a child can see over.
      box(1.0, 1.05, 4.2, b.xInner + f * 2.4, 0.525, b.cz - 0.6, M.frame);
      box(1.0, 0.72, 1.4, b.xInner + f * 2.4, 0.36, b.cz + 2.0, M.frame);
      hard(b.xInner + f * 2.4, b.cz, 1.2, 6.0, 1.1);
      break;
    case 'STATION':
      // The nurses' station: a curved run the staff can see the whole corridor
      // from, which is the only reason a ward is laid out this way.
      box(0.9, 1.1, 5.0, b.xInner + f * 1.6, 0.55, b.cz, M.frame);
      box(0.7, 0.06, 5.0, b.xInner + f * 2.2, 1.12, b.cz, M.rail);
      hard(b.xInner + f * 1.8, b.cz, 1.4, 5.2, 1.15);
      break;
    case 'RESP': case 'NUTR': case 'TRI': case 'MOVE': case 'BRAIN': {
      // An examination couch, with the paper roll at the head of it.
      const cx = b.cx + f * 0.6;
      box(0.72, 0.52, 1.9, cx, 0.26, b.cz, M.frame);
      box(0.76, 0.14, 1.94, cx, 0.59, b.cz, M.wall);
      box(0.5, 0.12, 0.5, cx, 0.72, b.cz - 0.82, M.wall);
      hard(cx, b.cz, 0.9, 2.1, 0.7);
      break;
    }
    default:
      if(room.group){
        box(0.6, 0.9, 2.6, inX + f * 0.9, 0.45, b.cz, M.frame);
        hard(inX + f * 0.9, b.cz, 0.8, 2.8, 0.95);
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
    seed: `hospital-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      ...(['RESP', 'NUTR', 'TRI', 'MOVE', 'BRAIN'].includes(room.id)
        ? [{ x: b.cx + f * 0.6, z: b.cz, r: 1.7 }] : []),
      ...((ctx.plan?.seats ?? []).filter(([x, z]) =>
        z > room.z0 && z < room.z1 && (f > 0 ? x > b.xInner : x < b.xInner))
        .map(([x, z]) => ({ x, z, r: 0.85 }))),
    ],
    target: seated ? 10 : 15,
  });
}

/** Fit out the corridor: what a working ward accumulates along its spine. */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard, soft } = ctx;
  const sp = plan.spine ?? { z0: -6, z1: 48 };
  const hw = plan.metrics?.corridorHalfWidth ?? 1.8;

  const solidAt = (side, z) => {
    const NIB = 0.9;
    for(const r of (plan.rooms ?? []).filter(x => x.side === side)){
      if(z < r.z0 || z > r.z1) continue;
      const cz = (r.z0 + r.z1) / 2;
      if(r.open) return z < r.z0 + NIB || z > r.z1 - NIB;
      const dw = r.door === 'wide' ? P.doorWideW : P.doorW;
      return Math.abs(z - cz) > dw / 2 + 0.2;
    }
    return false;
  };

  // A handrail down both sides, at a child's height as well as an adult's. It
  // is the one thing in the corridor that is here for the patients.
  for(const side of [-1, 1]){
    for(let z = sp.z0 + 1; z < sp.z1 - 1; z += 2.4){
      if(!solidAt(side < 0 ? 'w' : 'e', z)) continue;
      markStructure([box(0.06, 0.06, 2.2, side * (hw - P.wall / 2 - 0.05), 0.72, z + 1.1, M.rail)], 'rail');
    }
  }

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: hw,
    z0: sp.z0, z1: sp.z1,
    wallThickness: P.wall,
    seed: 'hospital-spine',
    every: 6,
    signEvery: 3.4,
    hard, soft,
    wallOk: (x, z) => solidAt(x < 0 ? 'w' : 'e', z),
    keepClear: [],
    signs: [
      { style: 'banner', tag: 'THE WARD', heading: 'Six children today', accent: '#2b6b7a',
        body: 'Every one of them is somebody’s. Say hello, say your name, and say what you '
          + 'are going to do before you do it.' },
      { style: 'warning', tag: 'IF THE ALARM SOUNDS', heading: 'Stay with your child',
        accent: '#b5502f',
        body: 'Do not use the lift. Staff will come to you — nobody is left behind, and that '
          + 'includes the children who cannot walk.' },
      { style: 'list', tag: 'FIND YOUR WAY', heading: 'This corridor, south to north',
        accent: '#3f8f8a',
        items: [['Reception', 'the way in'], ['Emergency', 'the sickest first'],
          ['Wards and labs', 'the middle'], ['Nurses’ station', 'the far end']],
        body: 'If you are lost, you are never more than one corridor from somebody who is not.' },
      { style: 'sticky', tag: 'PLEASE', heading: 'Wash your hands', accent: '#8a6a1e',
        body: 'Yes, again.' },
    ],
  });
}
