// props.js — the objects and the wall text unique to the Genome Editing Institute.
//
// Anything generic (benches, chairs, racks, notice boards, shelving) comes from
// engine/world/interiorKit.js; this file is the handful of things that make *this*
// building recognisable, plus every word printed or pinned on its walls.
//
// The building's argument is on its walls, deliberately. This is a campaign about
// a defence system becoming a tool, so the long wall carries the chain from a
// pattern in a bacterial genome to a sequenced result, and each room carries the
// records the people in it actually keep.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * Nine parts earnest, one part joke per room. A building where every notice is a
 * safety instruction is a building nobody works in, and one where every notice is
 * a gag is a set. None of this is on the syllabus and none of it is checked; all
 * of it has to land at 1.4 m/s.
 */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'VISITORS', heading: 'Sign in and take a badge', accent: '#1f4f6b',
      body: 'No visitor past the cold room unaccompanied. '
        + 'Coats and bags on the rack, not on the bench.' },
    { style: 'list', tag: 'EXTENSIONS', heading: 'Who is where', accent: '#5b6a72',
      items: [['Genome room', '2114'], ['Design desk', '2131'], ['Editing bay', '2120'],
        ['Sequencing', '2126'], ['Front desk', '2100']],
      body: 'The sequencer runs unattended overnight. Do not open the door on a run.' },
    { style: 'warning', tag: 'SAMPLES', heading: 'Nothing leaves this floor in a hand',
      accent: '#b5502f',
      body: 'Tubes travel in a rack in a box. If you are unsure whether a tube is logged, it is not.' },
    { style: 'sticky', tag: 'LOST', heading: 'One P20 pipette, labelled TW', accent: '#8a6a1e',
      body: 'Last seen in the cold room on Tuesday. It has a chip out of the barrel.' },
  ],
  ARRAY: [
    { style: 'grid', tag: 'THE ARRAY', heading: 'Repeat, spacer, repeat, spacer', accent: '#2f7f8a',
      body: 'The repeats are the frame. The spacers are the information, and every '
        + 'one of them came from somewhere.' },
    { style: 'chart', tag: 'SPACER MATCHES', heading: 'Forty arrays against a phage library',
      accent: '#2f7f8a',
      body: 'Long exact matches, far more often than chance allows. That is the '
        + 'finding, and it is not yet a mechanism.' },
    { style: 'list', tag: 'BY CHANCE', heading: 'How long before a match means something', accent: '#5b6a72',
      items: [['8 bases', 'every 65 kb'], ['11 bases', 'about once a genome'],
        ['20 bases', 'never, by chance'], ['30 bases', 'never, twice over']],
      body: 'A match is only evidence once chance has been priced. Price it first.' },
    { style: 'warning', tag: 'ASSEMBLIES', heading: 'A repeat region is where an assembler lies',
      accent: '#b5502f',
      body: 'Short reads across a repeat array collapse it. Check the read depth '
        + 'before believing a spacer count.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Someone called this a bacterial immune system without saying which half',
      accent: '#8a6a1e', body: '' },
  ],
  DESIGN: [
    { style: 'banner', tag: 'BEFORE YOU ORDER', heading: 'Match, motif, position, off-targets',
      accent: '#1f4f6b',
      body: 'In that order, every time. A perfect match with no motif beside it '
        + 'is not a target.' },
    { style: 'grid', tag: 'TWO CONSTRAINTS', heading: 'Complementarity is not enough',
      accent: '#1f4f6b',
      body: 'The guide finds the site. The enzyme will only engage one that '
        + 'carries the short motif next door. Both, or nothing happens.' },
    { style: 'list', tag: 'THIS WEEK', heading: 'Guides ordered', accent: '#5b6a72',
      items: [['g-114', 'one mismatch site, flagged'], ['g-115', 'clean'],
        ['g-116', 'no motif — withdrawn'], ['g-117', 'clean']],
      body: 'Three of four is about the usual rate. The withdrawn one was caught here.' },
    { style: 'sticky', tag: 'REMINDER', heading: 'The cut is a fixed distance from the motif',
      accent: '#8a6a1e',
      body: 'Not anywhere in the matched stretch. That is what makes a planned '
        + 'change possible at all.' },
  ],
  EDIT: [
    { style: 'warning', tag: 'REPAIR IS NOT A SETTING', heading: 'You get a population, not an outcome',
      accent: '#b5502f',
      body: 'Which route a cell mends by is a probability. Plan for a mixture, '
        + 'because a mixture is what you will have.' },
    { style: 'grid', tag: 'TWO ROUTES', heading: 'Rejoin, or copy from a template', accent: '#5a7f3f',
      body: 'Rejoining usually adds or loses a few bases, which disables a gene. '
        + 'Copying installs a sequence you supplied. Different jobs.' },
    { style: 'list', tag: 'INCUBATOR', heading: 'Plates in', accent: '#5b6a72',
      items: [['Knockout, g-115', '48 h'], ['Template, g-115', '48 h'],
        ['No-guide control', '48 h'], ['No-enzyme control', '48 h']],
      body: 'Both controls or the plate does not go to sequencing. This is not negotiable.' },
    { style: 'sticky', tag: 'NOTE', heading: 'The bay hood alarm reads high', accent: '#8a6a1e',
      body: 'By eleven per cent, consistently. There is a corrected chart taped to '
        + 'the sash. There has been since March.' },
  ],
  SEQ: [
    { style: 'banner', tag: 'READ IT BACK', heading: 'Designed is not achieved', accent: '#1f4f6b',
      body: 'A design says what should happen. Sequencing says what did. '
        + 'They are different sentences.' },
    { style: 'chart', tag: 'READS AT THE TARGET', heading: 'What the population actually looks like',
      accent: '#1f4f6b',
      body: 'Not a yes or a no. A fraction, with a denominator beside it, and '
        + 'the same again at every site you were worried about.' },
    { style: 'list', tag: 'RUN QUEUE', heading: 'On the machine', accent: '#5b6a72',
      items: [['Target amplicon', '4,100 reads'], ['Off-target 1', '3,800 reads'],
        ['Off-target 2', '3,950 reads'], ['Controls', '3,600 reads']],
      body: 'A site with two hundred reads on it has not been checked. It has been glanced at.' },
    { style: 'warning', tag: 'TWO NUMBERS', heading: 'Efficiency and specificity', accent: '#b5502f',
      body: 'A good answer on one says nothing about the other. Report both or '
        + 'report neither.' },
  ],
  TEA: [
    { style: 'list', tag: 'ROTA', heading: 'Who descales the machine', accent: '#5b6a72',
      items: [['Mon', 'Weill'], ['Tue', 'Raman'], ['Wed', 'Mojica'],
        ['Thu', 'nobody'], ['Fri', 'nobody']],
      body: 'Thursday and Friday have been blank since the rota went up.' },
    { style: 'sticky', tag: 'JOURNAL CLUB', heading: 'Thursday, four o\'clock', accent: '#8a6a1e',
      body: 'Charpentier, on what a guide does and does not guarantee. Bring your own chair.' },
  ],
  COLD: [
    { style: 'warning', tag: 'FOUR DEGREES', heading: 'The door is not a shelf', accent: '#b5502f',
      body: 'Log what you take. An enzyme that has been out for an hour is an '
        + 'enzyme somebody else will blame the run on.' },
    { style: 'list', tag: 'BOXES', heading: 'On the shelf', accent: '#5b6a72',
      items: [['Enzyme aliquots', 'box 3'], ['Guides', 'box 7'],
        ['Templates', 'box 8'], ['Genomic DNA', 'box 11']],
      body: 'Box 11 is nearly full. Nobody has thrown anything away since 2009.' },
  ],
  RACK: [
    { style: 'grid', tag: 'CONSUMABLES', heading: 'Sign the card when you take the last one',
      accent: '#5b6a72', body: 'This has been a problem twice this month.' },
    { style: 'list', tag: 'STOCK', heading: 'On the shelf', accent: '#5b6a72',
      items: [['Tips, 20 µl', '18 racks'], ['Plates, 96', '40'],
        ['Tubes, 1.5 ml', 'ample'], ['Gloves, M', '2 boxes']],
      body: 'Two boxes of medium is four days. Order on Monday.' },
  ],
  LIB: [
    { style: 'banner', tag: 'READING ROOM', heading: 'Quiet, and the printer is not in here',
      accent: '#3e4a52', body: 'It is in the corridor. Deliberately.' },
  ],
};

const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'THE INSTITUTE', heading: 'Genome Editing', accent: '#1f4f6b',
    body: 'Genomes and the design desk on your left. Cold room, editing bay and '
      + 'sequencing on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected where', accent: '#5b6a72',
    items: [['Mon', 'the arrays read'], ['Tue', 'chance priced'],
      ['Wed', 'guides designed'], ['Thu', 'plates in'],
      ['Fri', 'the run read back']],
    body: 'Doudna posts this on Sunday evening and does not revise it.' },
  { style: 'warning', tag: 'SAMPLES', heading: 'Racks travel in a box',
    accent: '#b5502f', body: 'Not on a tray, not in a hand, not down this corridor.' },
  { style: 'grid', tag: 'FIRE', heading: 'Assembly on the north lawn', accent: '#b5502f',
    body: 'Out of the front doors, left, past the bike racks. Not through the editing bay.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The corridor printer is out of toner',
    accent: '#8a6a1e', body: 'It has been reported. It has been reported since February.' },
  { style: 'list', tag: 'ONE RUN', heading: 'What a sequencing run costs', accent: '#2f7f8a',
    items: [['Machine time', '26 hours'], ['Reagents', 'one kit'],
      ['Sites you can check', '4'], ['Sites you would like to', '19']],
    body: 'Which four is the decision this floor actually makes.' },
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
  { title: 'Array', sub: 'repeats and spacers', glyph: 'bars' },
  { title: 'Match', sub: 'a spacer against a phage', glyph: 'ruler' },
  { title: 'Chance', sub: 'priced before believed', glyph: 'points' },
  { title: 'Guide', sub: 'the memory made portable', glyph: 'fibre' },
  { title: 'Motif', sub: 'the second constraint', glyph: 'column' },
  { title: 'Cut', sub: 'a fixed distance along', glyph: 'plate' },
  { title: 'Repair', sub: 'rejoin, or copy', glyph: 'flask' },
  { title: 'Reads', sub: 'what actually happened', glyph: 'camera' },
  { title: 'Report', sub: 'both numbers', glyph: 'spiral' },
];

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  // What each room of *this* building has in it. The names are interiorKit's
  // fitting makers; the choice per room is what makes a genome room read
  // differently from a sequencing floor.
  const FITTINGS = {
    PORCH:  ['toolBoard'],
    ARRAY:  ['monitorBank', 'rack', 'toolBoard', 'rack'],
    DESIGN: ['monitorBank', 'whiteboard', 'toolBoard', 'rack'],
    EDIT:   ['sampleStore', 'gasCylinder', 'toolBoard', 'rack'],
    SEQ:    ['monitorBank', 'pumpSet', 'rack', 'sampleStore'],
    TEA:    ['whiteboard'],
    COLD:   ['sampleStore', 'rack', 'barrel'],
    RACK:   ['rack', 'rack', 'barrel', 'cableDrum'],
    LIB:    ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', ARRAY: 'lab', DESIGN: 'station', EDIT: 'workroom',
    SEQ: 'lab', TEA: 'waiting', COLD: 'supply', RACK: 'supply', LIB: 'quiet',
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

  // The sequencing room's instrument run down the outside wall. A bank of
  // machines that runs unattended for two days needs floor and a way round the
  // back of every one of them, which is the same argument the plan's room depth
  // is making.
  if(room.id === 'SEQ'){
    box(0.85, 1.05, 9.0, b.xOuter - f * 0.68, 0.525, b.cz, M.frame);
    hard(b.xOuter - f * 0.68, b.cz, 1.05, 9.2, 1.1);
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
    // A modern institute prints on white and sets in near-black. Pure white is
    // still wrong in a room lit like this — it reads as a light box — so the
    // paper is a half-step down.
    print: { paper: '#eef0f1', ink: '#1c2226', soft: '#6d757a', accent: '#1f4f6b' },
    seed: `qd_crispr-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand, at the far end of every group room. Furniture standing
      // on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The sequencing room's instrument run.
      ...(room.id === 'SEQ' ? [{ x: b.xOuter - f * 0.68, z: b.cz, r: 1.5 }] : []),
    ],
    target: 16,
  });

  // Paint, where a room earns it. Low contrast and unframed: a mural is meant to
  // be seen and not read.
  const MURAL = {
    // The array itself at the scale of the wall: a rail of identical blocks with
    // different things between them.
    ARRAY: { kind: 'lattice', w: 5.0, h: 2.5, ink: '#2f7f8a' },
    // A helix, enormous and faint, over the bench where guides are designed.
    DESIGN: { kind: 'spiral', w: 4.6, h: 2.6, ink: '#1f4f6b' },
    // One field of colour and nothing to read. The only wall in the building
    // allowed to say nothing.
    LIB:   { kind: 'wash', w: 4.2, h: 2.3, paper: '#dfe2e3' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      paper: '#e0e3e4',
      ...MURAL,
    });
  }
}

/**
 * Fit out the corridor.
 *
 * Fifty metres of it, and it is the only route between the two halves of the
 * argument. What goes in it is what accumulates in a working building — notice
 * boards, fire points, a trolley somebody left — and nothing stands in the
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
    seed: 'qd_crispr-spine',
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
    plan, P, side, run: sp, paper: '#e0e3e4', ...opts,
  });

  // The chain, along the east wall.
  //
  // The band is at 2.20 with a 0.62 m height in every one of these buildings,
  // whatever the ceiling is, because what sets it is where the player's eye is
  // rather than where the slab is. Set against `tileH` instead it sits above the
  // top of a 66-degree frame at walking distance from the wall, and a corridor
  // drawing nobody can see while walking is a corridor drawing that is not there.
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#1f4f6b', soft: '#6d757a',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing
  // and is the only thing in the corridor that does not.
  along('w', { y: 0.9, h: 0.44, kind: 'wash', paper: '#aeb5b8' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
