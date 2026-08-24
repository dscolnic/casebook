// props.js — the objects and the wall text unique to the pneumatic laboratory.
//
// Anything generic (benches, chairs, racks, notice boards, shelving) comes from
// engine/world/interiorKit.js; this file is the handful of things that make *this*
// laboratory recognisable, plus every word painted or written up on its walls.
//
// The building's argument is on its walls, deliberately. This is a campaign about
// a ledger closing, so the long wall carries the chain from a weighed metal to a
// balanced equation, and each room carries the records the people in it keep.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * Nine parts earnest, one part joke per room. A laboratory where every notice is
 * a safety instruction is a laboratory nobody works in, and one where every
 * notice is a gag is a set. None of this is on the syllabus and none of it is checked;
 * all of it has to land at 1.4 m/s.
 */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'VISITORS', heading: 'Sign the book', accent: '#33402f',
      body: 'The book is the fire roll, and this building has a furnace in it. '
        + 'Sign out as well as in.' },
    { style: 'list', tag: 'ROOMS', heading: 'Who is where', accent: '#5b6a72',
      items: [['Balance', 'first left'], ['Trough', 'first right'],
        ['Furnace', 'far left'], ['Accounts', 'far right'], ['Library', 'far end']],
      body: 'Do not carry a lighted taper past the charcoal store.' },
    { style: 'warning', tag: 'THE BALANCE', heading: 'Nobody touches it but the maker',
      accent: '#b5502f',
      body: 'It reads to a hundredth of a grain and it is worth more than the room. '
        + 'If you have moved it, say so.' },
    { style: 'sticky', tag: 'LOST', heading: 'One case of brass weights, the small one',
      accent: '#8a6a1e',
      body: 'Last seen Tuesday by the trough. Rouvier is not pleased. The two-grain is gone from it.' },
  ],
  BAL: [
    { style: 'grid', tag: 'BEFORE AND AFTER', heading: 'Weigh the whole apparatus, not the sample',
      accent: '#7a5a2b',
      body: 'A vessel, its contents and its stopper are one system. Weigh the system '
        + 'or the number means nothing.' },
    { style: 'chart', tag: 'THREE METALS', heading: 'What each gained on heating',
      accent: '#7a5a2b',
      body: 'Every one of them heavier afterwards. Different amounts, same direction, '
        + 'and that is the thing any account has to explain.' },
    { style: 'list', tag: 'THIS WEEK', heading: 'Weighed and recorded', accent: '#5b6a72',
      items: [['Lead in the open', '+2.7 g'], ['Tin in the open', '+1.9 g'],
        ['Mercury sealed', 'total unchanged'], ['Charcoal in the open', 'lost weight']],
      body: 'The sealed row is the interesting one. Read it beside the first.' },
    { style: 'warning', tag: 'DRAUGHT', heading: 'Shut the door before you weigh',
      accent: '#b5502f',
      body: 'A door opened at the far end of the corridor moves the pan. This is '
        + 'not a joke and it has spoiled two afternoons.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Someone said the fire principle must simply have no weight',
      accent: '#8a6a1e', body: '' },
  ],
  FURN: [
    { style: 'banner', tag: 'BEFORE YOU LIGHT IT', heading: 'Weigh, seal, record, then heat',
      accent: '#b5502f',
      body: 'In that order, every time. A vessel heated before it is weighed is a '
        + 'vessel that has told you nothing.' },
    { style: 'grid', tag: 'THE BURNING GLASS', heading: 'Heat without adding fuel', accent: '#7a5a2b',
      body: 'A lens puts the sun into a sealed vessel with nothing else going in. '
        + 'That is the whole reason it is worth the trouble.' },
    { style: 'list', tag: 'AT THE FURNACE', heading: 'Standing orders', accent: '#5b6a72',
      items: [['Leather apron', 'always'], ['Sand bucket', 'by the door'],
        ['Hot glass', 'looks like cold glass'], ['Chimney damper', 'open first']],
      body: 'The third one is how everybody in here has been burnt at least once.' },
    { style: 'sticky', tag: 'NOTE', heading: 'The chimney draws badly in a south wind',
      accent: '#8a6a1e',
      body: 'It has been reported to the bursar. It has been reported since the spring.' },
  ],
  TROUGH: [
    { style: 'grid', tag: 'OVER WATER', heading: 'A gas is caught, then it is questioned',
      accent: '#3f6f8a',
      body: 'Fill the jar, invert it, lead the gas up into it. What the gas does '
        + 'comes after, and it is what names it.' },
    { style: 'chart', tag: 'THE SPLINT', heading: 'What a glowing splint does in each jar',
      accent: '#3f6f8a',
      body: 'Relights, burns as usual, goes out. Three answers from three jars and '
        + 'not a name among them yet.' },
    { style: 'list', tag: 'JARS ON THE SHELF', heading: 'Collected this week', accent: '#5b6a72',
      items: [['From red calx of mercury', 'jar B'], ['Common air', 'jar A'],
        ['From chalk and acid', 'jar C'], ['Residue after burning', 'jar D']],
      body: 'Label the jar at the trough. A jar labelled from memory is unlabelled.' },
    { style: 'warning', tag: 'THE ANIMAL', heading: 'Out of the chamber the moment it is distressed',
      accent: '#b5502f', body: 'The experiment is the meter reading, not the animal.' },
  ],
  LEDGER: [
    { style: 'banner', tag: 'THE LEDGER', heading: 'Both columns, or it is not a result',
      accent: '#33402f',
      body: 'Everything in on the left, everything out on the right, and the two '
        + 'totals set beside each other.' },
    { style: 'grid', tag: 'WHAT A MODEL OWES', heading: 'Explain the gain, not only the fire',
      accent: '#33402f',
      body: 'Any account of burning has to say where the extra matter came from. '
        + 'An account amended once per experiment forecasts nothing.' },
    { style: 'list', tag: 'OPEN QUESTIONS', heading: 'On the board', accent: '#5b6a72',
      items: [['Where the gain comes from', 'answered'], ['How much of air takes part', 'answered'],
        ['Why the residue will not burn', 'open'], ['Whether breathing is burning', 'careful']],
      body: 'The last one is the one everybody gets wrong in both directions.' },
    { style: 'sticky', tag: 'REMINDER', heading: 'A story that fits every outcome forecasts none',
      accent: '#8a6a1e', body: 'Written up here by Madame Lavoisier, and not taken down.' },
  ],
  TEA: [
    { style: 'list', tag: 'ROTA', heading: 'Who fetches the water', accent: '#5b6a72',
      items: [['Mon', 'Delaunay'], ['Tue', 'Rouvier'], ['Wed', 'Delaunay'],
        ['Thu', 'nobody'], ['Fri', 'nobody']],
      body: 'Thursday and Friday have been blank since the rota went up.' },
    { style: 'sticky', tag: 'DEMONSTRATION', heading: 'Thursday, four o\'clock', accent: '#8a6a1e',
      body: 'Priestley, on a jar in which a candle burns four times as long. Bring your own chair.' },
  ],
  COAL: [
    { style: 'warning', tag: 'NO NAKED FLAME', heading: 'Not even to see by', accent: '#b5502f',
      body: 'There is a lantern on a hook outside the door. Use that one.' },
    { style: 'list', tag: 'STOCK', heading: 'On the shelf', accent: '#5b6a72',
      items: [['Charcoal', 'four sacks'], ['Red calx of mercury', 'two jars'],
        ['Manganese', 'one jar'], ['Quicklime', 'ample']],
      body: 'The red calx is the whole of level two. Do not let it get damp.' },
  ],
  RACK: [
    { style: 'grid', tag: 'GLASS', heading: 'Carry a retort by the body, never the neck',
      accent: '#5b6a72', body: 'Three have gone that way this year. Two of them full.' },
    { style: 'list', tag: 'STOCK', heading: 'On the shelf', accent: '#5b6a72',
      items: [['Bell jars', '11'], ['Retorts', '6'], ['Receivers', '9'], ['Stopcocks', '3']],
      body: 'Three stopcocks between six retorts is why the sealed runs are queued.' },
  ],
  LIB: [
    { style: 'banner', tag: 'LIBRARY', heading: 'Quiet, and the ink stays on the desk',
      accent: '#33402f', body: 'Take the volume, leave the slip. This is not complicated.' },
  ],
};

const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'THE LABORATORY', heading: 'Pneumatic Chemistry', accent: '#33402f',
    body: 'Balance and furnace on your left. Charcoal, trough and the accounting '
      + 'desk on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected where', accent: '#5b6a72',
    items: [['Mon', 'the metals weighed'], ['Tue', 'a vessel sealed'],
      ['Wed', 'the jars questioned'], ['Thu', 'the residue measured'],
      ['Fri', 'the ledger closed']],
    body: 'Lavoisier posts this on Sunday evening and does not revise it.' },
  { style: 'warning', tag: 'FIRE', heading: 'Sand, not water, on burning oil',
    accent: '#b5502f', body: 'Buckets at both ends of the corridor and one at the furnace door.' },
  { style: 'grid', tag: 'THE BALANCE', heading: 'Shut the doors before anybody weighs',
    accent: '#b5502f',
    body: 'A draught down fifty metres of corridor moves the pan. Look before you open.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The flag by the common room is loose',
    accent: '#8a6a1e', body: 'It has been reported. It has been reported since the spring.' },
  { style: 'list', tag: 'ONE WEEK', heading: 'What the ledger holds', accent: '#7a5a2b',
    items: [['Metal in', '10.0 g'], ['Gained on heating', '2.7 g'],
      ['Air consumed', 'about a fifth'], ['Unexplained', 'nothing']],
    body: 'The last row is the whole claim, and it is the one that had to be earned.' },
];

/**
 * The chain painted along the corridor's east wall.
 *
 * Walking the corridor walks one contaminated plate all the way to a counted
 * dose. It is here rather than in any one room because no room owns it: the
 * whole point of the campaign is that the argument crosses the corridor, and a
 * drawing of it on one bench wall would belong to that bench.
 */
const CHAIN_STATIONS = [
  { title: 'Metal', sub: 'weighed cold', glyph: 'bars' },
  { title: 'Furnace', sub: 'heated in air', glyph: 'flask' },
  { title: 'Calx', sub: 'heavier by 2.7 g', glyph: 'plate' },
  { title: 'Sealed', sub: 'total unchanged', glyph: 'column' },
  { title: 'Jar', sub: 'a splint relights', glyph: 'points' },
  { title: 'Volume', sub: 'a fifth gone', glyph: 'ruler' },
  { title: 'Breathing', sub: 'the same component', glyph: 'fibre' },
  { title: 'Ledger', sub: 'both columns', glyph: 'camera' },
  { title: 'Equation', sub: 'nothing unexplained', glyph: 'spiral' },
];

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  // What each room of *this* laboratory has in it. The names are interiorKit's
  // fitting makers; the choice per room is what makes a balance room read
  // differently from a furnace.
  const FITTINGS = {
    PORCH:  ['toolBoard'],
    BAL:    ['sampleStore', 'toolBoard', 'rack', 'rack'],
    FURN:   ['gasCylinder', 'barrel', 'toolBoard', 'rack'],
    TROUGH: ['pumpSet', 'barrel', 'rack', 'toolBoard'],
    LEDGER: ['whiteboard', 'whiteboard', 'rack'],
    TEA:    ['whiteboard'],
    COAL:   ['barrel', 'barrel', 'rack'],
    RACK:   ['rack', 'rack', 'sampleStore', 'cableDrum'],
    LIB:    ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', BAL: 'lab', FURN: 'workroom', TROUGH: 'lab',
    LEDGER: 'station', TEA: 'waiting', COAL: 'supply', RACK: 'supply', LIB: 'quiet',
  };

  // The one thing that is this room and nothing else, placed before the kit
  // fills in around it.
  switch(room.kind){
    case 'reception':
      box(1.0, 1.05, 3.6, inX + f * 1.9, 0.525, b.cz - 0.5, M.frame);
      hard(inX + f * 1.9, b.cz - 0.5, 1.2, 3.8, 1.1);
      break;
    case 'workroom':
    case 'lab':
    case 'station':
      // A working surface against the spine wall, which is where the room's own
      // instrument screen and case stand go.
      box(0.62, 0.9, 3.0, inX + f * 0.9, 0.45, b.cz, M.frame);
      hard(inX + f * 0.9, b.cz, 0.8, 3.2, 0.95);
      break;
    default:
      break;
  }

  // The furnace room's hearth and stack down the outside wall. A reverberatory
  // furnace needs standing room and somewhere for the heat to go, which is the
  // same argument the plan's room depth is making, and the stack is the only
  // thing in the building that reaches the ceiling.
  if(room.id === 'FURN'){
    box(1.60, 1.30, 3.20, b.xOuter - f * 1.0, 0.65, b.cz, M.base);
    box(1.10, 2.60, 1.10, b.xOuter - f * 0.9, 2.60, b.cz + 1.9, M.base);
    hard(b.xOuter - f * 1.0, b.cz, 1.9, 3.4, 1.4);
  }

  // The trough itself: a lead-lined tank with a shelf in it, down the outside
  // wall, which is what every jar in level two is filled over.
  if(room.id === 'TROUGH'){
    box(1.30, 0.85, 4.60, b.xOuter - f * 0.9, 0.43, b.cz, M.rail);
    hard(b.xOuter - f * 0.9, b.cz, 1.5, 4.8, 0.9);
  }

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    bounds: {
      x0: b.xInner + f * 2.0, x1: b.xOuter - f * 1.5,
      z0: room.z0 + 0.7, z1: room.z1 - 0.7,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: ctx.P.wall,
    // Where those planes are actually solid — the doorway in the spine face, an
    // open room's missing spine face, and either end of a room nothing adjoins.
    wallOk: roomWallOk(room, b, ctx.plan, ctx.P),
    kind: KIND[room.id] ?? room.kind ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    // Everything in this building is written by hand on laid paper in iron-gall
    // ink, which is brown-black rather than black and sits on a warmer sheet than
    // anything printed. A bright white notice here reads as a light box.
    print: { paper: '#e7dfc9', ink: '#2a2216', soft: '#6f6650', accent: '#33402f' },
    seed: `qd_oxygen-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand, at the far end of every group room. Furniture standing
      // on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The furnace hearth and the trough.
      ...(room.id === 'FURN' ? [{ x: b.xOuter - f * 1.0, z: b.cz, r: 2.4 }] : []),
      ...(room.id === 'TROUGH' ? [{ x: b.xOuter - f * 0.9, z: b.cz, r: 2.0 }] : []),
    ],
    target: 16,
  });

  // Paint, where a room earns it. Low contrast and unframed: a mural is meant to
  // be seen and not read.
  const MURAL = {
    // The balance itself at the scale of the wall: a beam, two pans and a pointer.
    BAL:    { kind: 'lattice', w: 4.4, h: 2.4, ink: '#7a5a2b' },
    // A ledger, enormous and faint, above the desk the argument is settled at.
    LEDGER: { kind: 'spiral', w: 4.8, h: 2.6, ink: '#33402f' },
    // One field of colour and nothing to read. The only wall in the building
    // allowed to say nothing.
    LIB:    { kind: 'wash', w: 4.2, h: 2.3, paper: '#dcd4bd' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      paper: '#dbd2b9',
      ...MURAL,
    });
  }
}

/**
 * Fit out the corridor.
 *
 * Fifty metres of it, and it is the only route between the two halves of the
 * argument. What goes in it is what accumulates in a working laboratory — notice
 * boards, fire buckets, a barrow somebody left — and nothing stands in the
 * middle, because the corridor is how the player gets everywhere.
 */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard } = ctx;
  const sp = plan.spine ?? { z0: -6, z1: 44 };

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: P.corridorHalfWidth,
    wallThickness: P.wall,
    z0: sp.z0, z1: sp.z1,
    seed: 'qd_oxygen-spine',
    every: 5,
    signEvery: 3.2,
    signs: CORRIDOR_TEXT,
    // No `print:` here. `furnishRoom` reads one and `furnishCorridor` does not —
    // its signs go through `wordedSign` into `paintSignFace`, which owns its own
    // palette — so passing one would be a key silently dropped.
    hard,
    keepClear: [],
    wallOk: (x, z) => spineWallOk(plan, P, x, z),
  });

  const along = (side, opts) => paintAlongWall({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    plan, P, side, run: sp, paper: '#dbd2b9', ...opts,
  });

  // The chain, along the east wall.
  //
  // The band is at 2.20 with a 0.62 m height in every one of these buildings,
  // whatever the ceiling is, because what sets it is where the player's eye is
  // rather than where the slab is. Set against `tileH` instead it sits above the
  // top of a 66-degree frame at walking distance from the wall, and a corridor
  // drawing nobody can see while walking is a corridor drawing that is not there.
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#33402f', soft: '#6f6650',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing
  // and is the only thing in the corridor that does not.
  along('w', { y: 0.9, h: 0.44, kind: 'wash', paper: '#ada386' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
