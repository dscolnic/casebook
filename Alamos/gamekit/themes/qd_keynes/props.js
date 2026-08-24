// props.js — the objects and the wall text unique to the Economic Advisory Building.
//
// Anything generic (benches, chairs, racks, notice boards, shelving) comes from
// engine/world/interiorKit.js; this file is the handful of things that make *this*
// building recognisable, plus every word painted or pinned on its walls.
//
// The building's argument is on its walls, deliberately. This is a campaign about
// a fall propagating, so the long wall carries the chain from one firm's cancelled
// order to a recommendation with conditions on it, and each room carries the
// records the people in it keep.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * Nine parts earnest, one part joke per room. A place where every notice is a
 * safety instruction is a place nobody works in, and one where every notice is a
 * gag is a set. None of this is on the syllabus and none of it is checked;
 * all of it has to land at 1.4 m/s.
 */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'VISITORS', heading: 'Sign the book', accent: '#33463c',
      body: 'The book is the fire roll. Nothing said in the policy desk leaves this building '
        + 'in a pocket.' },
    { style: 'list', tag: 'EXTENSIONS', heading: 'Who is where', accent: '#5b6a72',
      items: [['Flow room', '312'], ['Statistics', '318'], ['Model room', '324'],
        ['Policy desk', '301'], ['Porter', '300']],
      body: 'The policy desk does not take calls between eleven and one.' },
    { style: 'warning', tag: 'FIGURES', heading: 'Nothing goes out that is not dated',
      accent: '#b5502f',
      body: 'An undated figure will be quoted for three years. This has happened.' },
    { style: 'sticky', tag: 'LOST', heading: 'One slide rule, ten inch', accent: '#8a6a1e',
      body: 'Last seen Tuesday in the model room. Kahn is not pleased. The cursor is cracked.' },
  ],
  FLOW: [
    { style: 'banner', tag: 'THE BOARD', heading: 'Every arrow is somebody\'s income',
      accent: '#2f6f5a',
      body: 'Households, firms, banks and government, and not one arrow that '
        + 'leaves a box without arriving in another.' },
    { style: 'grid', tag: 'WHAT A FALL DOES', heading: 'It does not stop where it started',
      accent: '#2f6f5a',
      body: 'A pound not spent is a pound not received. The people who did not '
        + 'receive it then do not spend it either.' },
    { style: 'list', tag: 'THIS QUARTER', heading: 'What has actually happened', accent: '#5b6a72',
      items: [['Investment', 'down a fifth'], ['Orders', 'down'],
        ['Employment', 'down'], ['Prices', 'barely moved']],
      body: 'The last row is the one the older account cannot manage.' },
    { style: 'warning', tag: 'DO NOT DRAW A NEW ARROW', heading: 'Not without saying where it comes from',
      accent: '#b5502f',
      body: 'Every pound on this board arrives from somewhere. An arrow with no '
        + 'source is a hole in the argument.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Someone said the economy is like a household budget',
      accent: '#8a6a1e', body: '' },
  ],
  STAT: [
    { style: 'grid', tag: 'THE RETURNS', heading: 'Counted, not estimated from the mood',
      accent: '#3f6f8a',
      body: 'Output, employment, orders and capacity in use, by industry, every '
        + 'month, from returns somebody actually filled in.' },
    { style: 'chart', tag: 'CAPACITY IN USE', heading: 'Sixty-one per cent, and falling',
      accent: '#3f6f8a',
      body: 'That number decides whether extra demand comes out as more goods or '
        + 'as higher prices, and it is measurable.' },
    { style: 'list', tag: 'LEAKAGES', heading: 'Where a pound goes instead', accent: '#5b6a72',
      items: [['Saved', 'some'], ['Taxed', 'some'], ['Spent abroad', 'some'],
        ['Left in the round', 'the rest']],
      body: 'Only the last row comes back as somebody else\'s income here.' },
    { style: 'warning', tag: 'NO SEASONAL GUESSES', heading: 'Adjust it or say you have not',
      accent: '#b5502f',
      body: 'A December figure compared with a June one has a Christmas in it.' },
  ],
  MODEL: [
    { style: 'banner', tag: 'THE ROUNDS', heading: 'Each one is the last times what people spend',
      accent: '#8a6a1e',
      body: 'They shrink by the same fraction every time, so they add to a finite '
        + 'total, and the total can be worked out rather than argued about.' },
    { style: 'grid', tag: 'WHAT THE MULTIPLIER IS NOT', heading: 'Not a promise and not a constant',
      accent: '#8a6a1e',
      body: 'It is one over the share that leaves the round. Change the share and '
        + 'it changes, which is why the simple figure is always too big.' },
    { style: 'list', tag: 'WORKED THIS WEEK', heading: 'On the board', accent: '#5b6a72',
      items: [['Closed model', '4.0'], ['With tax', '2.9'],
        ['With imports too', '2.2'], ['Published', 'the last one']],
      body: 'Publishing the first one is how a department loses an argument in public.' },
    { style: 'sticky', tag: 'REMINDER', heading: 'Show the arithmetic on the sheet', accent: '#8a6a1e',
      body: 'A number nobody can check is a number nobody has to believe.' },
  ],
  DESK: [
    { style: 'banner', tag: 'THE DESK', heading: 'Say what has to be true for this to work',
      accent: '#4a3a2c',
      body: 'A recommendation with no conditions on it is a slogan, and a slogan '
        + 'is wrong about half the time it is used.' },
    { style: 'grid', tag: 'THE SAME MEASURE', heading: 'Different sign in a different state',
      accent: '#4a3a2c',
      body: 'Demand support with resources idle raises output. The same measure '
        + 'at full stretch raises prices and takes resources from somewhere else.' },
    { style: 'list', tag: 'ON THE FILE', heading: 'Claims and what backs them', accent: '#5b6a72',
      items: [['Output gap', 'measured'], ['Multiplier', 'estimated'],
        ['Timing', 'guessed'], ['Certainty', 'none of it']],
      body: 'The third row is the one that gets left out of the summary.' },
    { style: 'warning', tag: 'LAGS', heading: 'A measure that arrives late arrives into a different economy',
      accent: '#b5502f',
      body: 'Decide, legislate, spend, and the money lands eighteen months on. Nothing shortens that much.' },
  ],
  TEA: [
    { style: 'list', tag: 'ROTA', heading: 'Who makes the tea', accent: '#5b6a72',
      items: [['Mon', 'Marchant'], ['Tue', 'Beddowes'], ['Wed', 'Marchant'],
        ['Thu', 'nobody'], ['Fri', 'nobody']],
      body: 'Thursday and Friday have been blank since the rota went up.' },
    { style: 'sticky', tag: 'SEMINAR', heading: 'Thursday, four o\'clock', accent: '#8a6a1e',
      body: 'Robinson, on why a measure can be right in March and wrong in November. Bring your own chair.' },
  ],
  DUP: [
    { style: 'warning', tag: 'DUPLICATING', heading: 'Number every copy', accent: '#b5502f',
      body: 'An unnumbered copy of a draft is a draft that gets quoted as final.' },
    { style: 'list', tag: 'RUNS TODAY', heading: 'In order', accent: '#5b6a72',
      items: [['Capacity returns', '40'], ['Round table', '12'],
        ['Multiplier note', '12'], ['Policy summary', 'not yet']],
      body: 'The last one waits until the conditions are written into it.' },
  ],
  RACK: [
    { style: 'grid', tag: 'STATIONERY', heading: 'Sign the card when you take the last one',
      accent: '#5b6a72', body: 'This has been a problem twice this month.' },
    { style: 'list', tag: 'STOCK', heading: 'On the shelf', accent: '#5b6a72',
      items: [['Foolscap', 'ample'], ['Carbons', 'two boxes'],
        ['Graph paper', 'one quire'], ['Ink', 'blue only']],
      body: 'One quire of graph paper is a fortnight in the model room.' },
  ],
  LIB: [
    { style: 'banner', tag: 'LIBRARY', heading: 'Quiet, and the returns stay in the room',
      accent: '#33463c', body: 'The trade figures do not leave. Everybody asks.' },
  ],
};

const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'THE BUILDING', heading: 'Economic Advisory', accent: '#33463c',
    body: 'Flow room and the model room on your left. Duplicating, statistics '
      + 'and the policy desk on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected where', accent: '#5b6a72',
    items: [['Mon', 'the rounds worked'], ['Tue', 'capacity measured'],
      ['Wed', 'the multiplier'], ['Thu', 'leakages'],
      ['Fri', 'the recommendation']],
    body: 'Keynes posts this on Sunday evening and does not revise it.' },
  { style: 'warning', tag: 'FIGURES', heading: 'Nothing leaves undated',
    accent: '#b5502f', body: 'An undated figure will be quoted for three years.' },
  { style: 'grid', tag: 'ONE RULE', heading: 'Every recommendation names its conditions',
    accent: '#33463c',
    body: 'When this holds, do that. Remove the conditions and it is a slogan.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The radiator by the common room knocks',
    accent: '#8a6a1e', body: 'It has been reported. It has been reported since 1929.' },
  { style: 'list', tag: 'THE QUARTER', heading: 'What the returns say', accent: '#3f6f8a',
    items: [['Capacity in use', '61 %'], ['Output gap', '160 units'],
      ['Multiplier, with leakages', '2.2'], ['Injection needed', '73 units']],
    body: 'Four numbers, three of them measured and one of them a guess about timing.' },
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
  { title: 'The shock', sub: 'investment falls', glyph: 'plate' },
  { title: 'Orders', sub: 'firms receive fewer', glyph: 'bars' },
  { title: 'Employment', sub: 'quantity moves first', glyph: 'column' },
  { title: 'Round two', sub: 'the last times the share spent', glyph: 'points' },
  { title: 'The sum', sub: 'a finite total', glyph: 'ruler' },
  { title: 'Leakage', sub: 'tax, saving, imports', glyph: 'fibre' },
  { title: 'The gap', sub: 'measured, not felt', glyph: 'camera' },
  { title: 'Capacity', sub: 'which way the demand comes out', glyph: 'flask' },
  { title: 'Conditions', sub: 'when this holds, do that', glyph: 'spiral' },
];

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  // What each room of *this* building has in it. The names are interiorKit's
  // fitting makers; the choice per room is what makes a flow room read
  // differently from a statistics room.
  const FITTINGS = {
    PORCH: ['toolBoard'],
    FLOW:  ['whiteboard', 'whiteboard', 'toolBoard'],
    STAT:  ['rack', 'rack', 'toolBoard', 'sampleStore'],
    MODEL: ['whiteboard', 'rack', 'toolBoard', 'rack'],
    DESK:  ['whiteboard', 'monitorBank', 'rack'],
    TEA:   ['whiteboard'],
    DUP:   ['pumpSet', 'rack', 'barrel'],
    RACK:  ['rack', 'rack', 'sampleStore', 'cableDrum'],
    LIB:   ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', FLOW: 'station', STAT: 'lab', MODEL: 'workroom',
    DESK: 'station', TEA: 'waiting', DUP: 'supply', RACK: 'supply', LIB: 'quiet',
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

  // The flow room's board: a wall-sized panel with the whole economy on it, and
  // no seats in front of it. People stand at this thing and argue, which is the
  // only reason the room is the size it is.
  if(room.id === 'FLOW'){
    box(0.22, 2.40, 10.0, b.xOuter - f * 0.30, 1.60, b.cz, M.base);
    hard(b.xOuter - f * 0.30, b.cz, 0.6, 10.2, 2.4);
  }

  // The model room's long working table, down the middle rather than against a
  // wall, because two people work a set of rounds from opposite sides of it.
  if(room.id === 'MODEL'){
    box(1.50, 0.90, 6.00, b.cx, 0.45, b.cz, M.frame);
    hard(b.cx, b.cz, 1.7, 6.2, 0.95);
  }

  // The statistics room's run of filing, which is where every number in this
  // building actually comes from.
  if(room.id === 'STAT'){
    box(0.62, 2.00, 8.0, b.xOuter - f * 0.52, 1.00, b.cz, M.rail);
    for(let i = 0; i < 6; i++){
      const cz = b.cz - 3.2 + i * 1.28;
      box(0.04, 1.8, 0.06, b.xOuter - f * 0.20, 1.00, cz, M.frame);
    }
    hard(b.xOuter - f * 0.52, b.cz, 0.8, 8.2, 2.0);
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
    // A government department types on foolscap in a ribbon that is never quite
    // black, and duplicates in violet. A bright white sheet in a room lit like
    // this reads as a light box.
    print: { paper: '#e6dfc7', ink: '#2a2418', soft: '#6e6753', accent: '#33463c' },
    seed: `qd_keynes-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand, at the far end of every group room. Furniture standing
      // on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The board, the working table and the filing run.
      ...(room.id === 'FLOW' ? [{ x: b.xOuter - f * 0.30, z: b.cz, r: 1.6 }] : []),
      ...(room.id === 'MODEL' ? [{ x: b.cx, z: b.cz, r: 2.6 }] : []),
      ...(room.id === 'STAT' ? [{ x: b.xOuter - f * 0.52, z: b.cz, r: 1.4 }] : []),
    ],
    target: 16,
  });

  // Paint, where a room earns it. Low contrast and unframed: a mural is meant to
  // be seen and not read.
  const MURAL = {
    // The circular flow itself, at the scale of the wall, in the room it is
    // argued at.
    FLOW:  { kind: 'lattice', w: 5.2, h: 2.6, ink: '#2f6f5a' },
    // Rounds shrinking away to a finite total, enormous and faint, over the
    // table where they are actually added up.
    MODEL: { kind: 'spiral', w: 4.6, h: 2.5, ink: '#8a6a1e' },
    // One field of colour and nothing to read. The only wall in the building
    // allowed to say nothing.
    LIB:   { kind: 'wash', w: 4.2, h: 2.3, paper: '#dad2ba' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      paper: '#d9d1b8',
      ...MURAL,
    });
  }
}

/**
 * Fit out the corridor.
 *
 * Fifty metres of it, and it is the only route between the two halves of the
 * argument. What goes in it is what accumulates in a working department — notice
 * boards, fire points, a trolley of files somebody left — and nothing stands in the
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
    seed: 'qd_keynes-spine',
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
    plan, P, side, run: sp, paper: '#d9d1b8', ...opts,
  });

  // The chain, along the east wall.
  //
  // The band is at 2.20 with a 0.62 m height in every one of these buildings,
  // whatever the ceiling is, because what sets it is where the player's eye is
  // rather than where the slab is. Set against `tileH` instead it sits above the
  // top of a 66-degree frame at walking distance from the wall, and a corridor
  // drawing nobody can see while walking is a corridor drawing that is not there.
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#33463c', soft: '#6e6753',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing
  // and is the only thing in the corridor that does not.
  along('w', { y: 0.9, h: 0.44, kind: 'wash', paper: '#aaa085' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
