// props.js — the objects and the wall text unique to the Structural Biology Unit.
//
// Anything generic (benches, chairs, racks, notice boards, shelving) comes from
// engine/world/interiorKit.js; this file is the ten or so things that make *this*
// building recognisable, plus every word painted or pinned on its walls.
//
// The building's argument is on its walls, deliberately. This is a campaign about
// evidence accumulating, and a corridor with nothing on it is a corridor where
// nothing has been found out yet — so the long wall carries the measurement chain
// from the sample to the structure, and each room carries the records the people
// in it actually keep.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * Nine parts earnest, one part joke per room. A building where every notice is a
 * safety instruction is a building nobody works in, and a building where every
 * notice is a gag is a set. None of this is on the syllabus and none of it is
 * checked; all of it has to land at 1.4 m/s.
 */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'VISITORS', heading: 'Sign the book', accent: '#3c4f3f',
      body: 'The book is the fire roll. Sign out as well as in. '
        + 'Nobody past the X-ray room without Franklin.' },
    { style: 'list', tag: 'EXTENSIONS', heading: 'Who is where', accent: '#5b6a72',
      items: [['Chemistry', '214'], ['X-ray', '217'], ['Model room', '221'],
        ['Evidence room', '203'], ['Porter', '200']],
      body: 'Ring before you walk down. The X-ray room door is light-tight for a reason.' },
    { style: 'warning', tag: 'X-RAYS', heading: 'Red lamp means the shutter is open', accent: '#b5502f',
      body: 'Do not open the camera room door while the lamp is on. '
        + 'If you are unsure whether it is on, it is on.' },
    { style: 'sticky', tag: 'LOST', heading: 'One brass base plate, adenine', accent: '#8a6a1e',
      body: 'Last seen Tuesday. Crick is not pleased. It is the wide one.' },
  ],
  CHEM: [
    { style: 'grid', tag: 'BASE ANALYSIS', heading: 'Every run, both columns', accent: '#3f7f6a',
      body: 'Two runs or it does not go on the wall. A single run agreeing with '
        + 'a theory is not evidence about the theory.' },
    { style: 'chart', tag: 'THE RATIOS', heading: 'Adenine against thymine, eleven samples',
      accent: '#3f7f6a',
      body: 'Different organisms, different compositions, the same two equalities every time. '
        + 'That is the finding, and it is not a structure.' },
    { style: 'list', tag: 'SOLUTIONS', heading: 'Made up this week', accent: '#5b6a72',
      items: [['0.02 M saline', 'Pinto, Mon'], ['0.15 M saline', 'Pinto, Mon'],
        ['1.0 M saline', 'Pinto, Tue'], ['Buffer, pH 7', 'Chargaff, Tue']],
      body: 'Label the flask or it goes down the sink. This has happened twice.' },
    { style: 'warning', tag: 'DO NOT DRY', heading: 'The mounted fibres', accent: '#b5502f',
      body: 'A dried fibre is a different structure. Keep the humidifier running '
        + 'and keep the door shut.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Someone said "so it must be a helix"',
      accent: '#8a6a1e', body: '' },
  ],
  XRAY: [
    { style: 'banner', tag: 'BEFORE THE EXPOSURE', heading: 'Humidity, mount, collimator, log',
      accent: '#7a4fa3',
      body: 'In that order, every time. Write the humidity in the log before you '
        + 'start and again when you finish.' },
    { style: 'grid', tag: 'CAMERA BOOKING', heading: 'Eleven-hour exposures', accent: '#7a4fa3',
      body: 'Initial the slot. An exposure started at four in the afternoon is somebody '
        + 'else\'s morning.' },
    { style: 'photo', tag: 'PLATE 51', heading: 'The X, and layer lines to the fourth order',
      accent: '#5b6a72',
      body: 'Franklin and Gosling, eleven hours, wet fibre at 92 per cent. '
        + 'This is a record of where the rays went.' },
    { style: 'list', tag: 'MEASURED OFF IT', heading: 'And by whom', accent: '#5b6a72',
      items: [['Axial repeat, 34 Å', 'Gosling'], ['Base stacking, 3.4 Å', 'Gosling'],
        ['Fibre diameter, 20 Å', 'Franklin'], ['Chain count', 'not on this plate']],
      body: 'Two people measure every spacing. The last line is not an oversight.' },
    { style: 'sticky', tag: 'NOTE', heading: 'It is not a photograph of a molecule',
      accent: '#b5502f',
      body: 'Franklin has asked for this to stay up until the paper is written.' },
  ],
  MODEL: [
    { style: 'banner', tag: 'THE RULE', heading: 'Every rung the same width', accent: '#c98a2b',
      body: 'A helix with one repeat has one diameter. If the rung does not close, '
        + 'the model is wrong and the brass is right.' },
    { style: 'grid', tag: 'BASE PLATES', heading: 'Two wide, two narrow', accent: '#c98a2b',
      body: 'Adenine and guanine are the wide ones. Do not file them down to fit.' },
    { style: 'chart', tag: 'RUNG WIDTHS', heading: 'What each combination comes to',
      accent: '#8a6a1e',
      body: 'Wide with wide, narrow with narrow, wide with narrow. One of the three '
        + 'gives the same number twice.' },
    { style: 'list', tag: 'IN THE VICE', heading: 'Currently', accent: '#5b6a72',
      items: [['Backbone A', 'wound'], ['Backbone B', 'wound'],
        ['Separation', '11.1 Å'], ['Rungs closed', 'none']],
      body: 'Leave it clamped. Crick will know.' },
    { style: 'sticky', tag: 'ON THE DOOR', heading: 'Please do not take the small pliers',
      accent: '#8a6a1e', body: 'There is one pair. There has only ever been one pair.' },
  ],
  BOARD: [
    { style: 'banner', tag: 'HOW A CANDIDATE COMES DOWN', heading: 'Name the clue it breaks',
      accent: '#8a5a2b',
      body: 'Not a vote, not a preference, not because somebody senior said so. '
        + 'A clue, on this wall, with the bench it came from written beside it.' },
    { style: 'grid', tag: 'CLUES', heading: 'In the order they arrived', accent: '#8a5a2b',
      body: 'Composition in matched pairs. Charges in the water. Helical. Ten to a turn. '
        + 'Two chains. Equal rungs. Strands opposed.' },
    { style: 'list', tag: 'STANDING', heading: 'This morning', accent: '#5b6a72',
      items: [['Two chains, backbones out', '—'], ['Three chains, phosphates in', '—'],
        ['Two chains, wrong pairs', '—'], ['One chain, unpaired', '—']],
      body: 'Nothing is crossed off until somebody says which clue.' },
    { style: 'chart', tag: 'MASS PER UNIT LENGTH', heading: 'One number, two unknowns',
      accent: '#8a5a2b',
      body: 'Every pair along this curve fits the weighing. Weighing again slides '
        + 'along it.' },
    { style: 'sticky', tag: 'PINNED OVER THE DOOR', heading: 'Elegance is not a clue',
      accent: '#b5502f', body: 'Randall. Undated. Nobody has taken it down.' },
  ],
  TEA: [
    { style: 'sticky', tag: 'THE URN', heading: 'Switch it off at the wall', accent: '#8a6a1e',
      body: 'Not at the switch on the urn. The switch on the urn does nothing.' },
    { style: 'list', tag: 'THE ROTA', heading: 'Milk', accent: '#5b6a72',
      items: [['Monday', 'Pinto'], ['Tuesday', 'Gosling'], ['Wednesday', 'Crick'],
        ['Thursday', 'Pinto again'], ['Friday', 'nobody, historically']],
      body: 'The rota is a description of the past, not a plan.' },
    { style: 'grid', tag: 'SEMINARS', heading: 'Thursday, four o\'clock', accent: '#3c4f3f',
      body: 'Bring your own chair. The chairs in here do not leave this room.' },
  ],
  DARK: [
    { style: 'warning', tag: 'DO NOT OPEN', heading: 'When the green lamp is lit', accent: '#b5502f',
      body: 'A plate takes eleven hours to expose and one second to ruin.' },
    { style: 'list', tag: 'DEVELOPING', heading: 'Times, at 20 °C', accent: '#5b6a72',
      items: [['Developer', '4 min'], ['Stop bath', '30 s'], ['Fixer', '8 min'],
        ['Wash', '20 min']],
      body: 'Write the plate number on the sleeve before you develop, not after.' },
  ],
  RACK: [
    { style: 'grid', tag: 'BRASS', heading: 'Rod, plate and wire', accent: '#5b6a72',
      body: 'Sign for anything over a foot. Return offcuts to the tray, not the bin.' },
    { style: 'sticky', tag: 'THE TRAY', heading: 'Is not a bin', accent: '#8a6a1e', body: '' },
  ],
  LIB: [
    { style: 'list', tag: 'ON LOAN', heading: 'And to whom', accent: '#5b6a72',
      items: [['Pauling, 1950', 'Crick'], ['Astbury, 1938', 'Franklin'],
        ['Chargaff, 1950', 'Chargaff'], ['Bragg, 1913', 'missing']],
      body: 'Sign the card. The card is inside the front cover.' },
    { style: 'sticky', tag: 'QUIET', heading: 'Genuinely', accent: '#3c4f3f',
      body: 'The model room is forty feet away and you can hear the pliers from here.' },
  ],
};

/** The corridor's own boards: wayfinding, and the argument in the building. */
const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'THE UNIT', heading: 'Structural Biology', accent: '#3c4f3f',
    body: 'Chemistry and the model room on your left. X-ray, dark room and the '
      + 'evidence room on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected where', accent: '#5b6a72',
    items: [['Mon', 'base analysis closed'], ['Tue', 'salt titration'],
      ['Wed', 'plate measured'], ['Thu', 'rungs and orientation'],
      ['Fri', 'one candidate defended']],
    body: 'Randall posts this on Sunday evening and does not revise it.' },
  { style: 'warning', tag: 'RED LAMP', heading: 'Means the X-ray shutter is open',
    accent: '#b5502f', body: 'Do not open that door.' },
  { style: 'grid', tag: 'FIRE', heading: 'Assembly on the lawn', accent: '#b5502f',
    body: 'Out of the porch, left, past the bicycles. Not through the model room.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The floor by the tea room is uneven',
    accent: '#8a6a1e', body: 'It has been reported. It has been reported since 1948.' },
  { style: 'list', tag: 'SEMINAR', heading: 'Thursday', accent: '#3c4f3f',
    items: [['Speaker', 'Franklin'], ['Title', 'What a fibre pattern does not say'],
      ['Time', '4 p.m.'], ['Room', 'the tea room']],
    body: 'Bring your own chair.' },
];

/**
 * The measurement chain painted along the corridor's east wall.
 *
 * Walking the corridor walks one sample from the flask to the structure. It is
 * here rather than in any one room because no room owns it: the whole point of
 * the campaign is that the argument crosses the corridor five times, and a
 * drawing of it on one bench wall would belong to that bench.
 */
const CHAIN_STATIONS = [
  { title: 'Sample', sub: 'calf thymus, wet', glyph: 'flask' },
  { title: 'Column', sub: 'four bases separated', glyph: 'column' },
  { title: 'Composition', sub: 'matched pairs', glyph: 'bars' },
  { title: 'Fibre', sub: 'drawn and held wet', glyph: 'fibre' },
  { title: 'Camera', sub: 'eleven hours', glyph: 'camera' },
  { title: 'Plate', sub: 'an X, layer lines', glyph: 'plate' },
  { title: 'Spacings', sub: '34 Å and 3.4 Å', glyph: 'ruler' },
  { title: 'Weighing', sub: 'mass per unit length', glyph: 'points' },
  { title: 'Structure', sub: 'two chains, opposed', glyph: 'spiral' },
];

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  // What each room of *this* building has in it. The names are interiorKit's
  // fitting makers; the choice per room is what makes a chemistry bench read
  // differently from a workshop.
  const FITTINGS = {
    PORCH: ['toolBoard'],
    CHEM:  ['sampleStore', 'gasCylinder', 'toolBoard', 'rack'],
    XRAY:  ['monitorBank', 'rack', 'pumpSet', 'toolBoard'],
    MODEL: ['whiteboard', 'toolBoard', 'rack', 'rack'],
    BOARD: ['whiteboard', 'monitorBank', 'whiteboard'],
    TEA:   ['whiteboard'],
    DARK:  ['sampleStore', 'barrel', 'rack'],
    RACK:  ['rack', 'rack', 'barrel', 'cableDrum'],
    LIB:   ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', CHEM: 'lab', XRAY: 'lab', MODEL: 'workroom',
    BOARD: 'station', TEA: 'waiting', DARK: 'supply', RACK: 'supply', LIB: 'quiet',
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

  // The model room's long bench down the outside wall, which is the one piece of
  // furniture in the building that had to be bigger than the kit makes: brass rod
  // comes in six-foot lengths and a workshop with a desk in it is an office.
  if(room.id === 'MODEL'){
    box(0.75, 0.92, 8.0, b.xOuter - f * 0.62, 0.46, b.cz, M.frame);
    hard(b.xOuter - f * 0.62, b.cz, 0.95, 8.2, 1.0);
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
    // A university building in 1952 prints on cream and types in black. A bright
    // sheet in a room lit like this reads as a light box.
    print: { paper: '#e8e3d4', ink: '#241f18', soft: '#6d6552', accent: '#3c4f3f' },
    seed: `qd_dna-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand, at the far end of every group room. Furniture standing
      // on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The model room's long bench.
      ...(room.id === 'MODEL' ? [{ x: b.xOuter - f * 0.62, z: b.cz, r: 1.4 }] : []),
    ],
    target: 16,
  });

  // Paint, where a room earns it. Low contrast and unframed: a mural is meant to
  // be seen and not read.
  const MURAL = {
    // Two strands winding, at the scale of the wall, on the wall where the brass
    // version of the same thing is in a vice underneath it.
    MODEL: { kind: 'spiral', w: 4.4, h: 2.5, ink: '#8a6a1e' },
    // The plate's own geometry, enormous and faint: rows of marks in an X.
    XRAY:  { kind: 'lattice', w: 5.0, h: 2.6, ink: '#7a4fa3' },
    // One field of colour and nothing to read. The only wall in the building
    // allowed to say nothing.
    LIB:   { kind: 'wash', w: 4.2, h: 2.3, paper: '#ddd8c8' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      paper: '#ddd6c4',
      ...MURAL,
    });
  }
}

/**
 * Fit out the corridor.
 *
 * Fifty metres of it, and it is the only route between the two halves of the
 * argument. What goes in it is what accumulates in a working building — the
 * notice boards, the fire points, a trolley somebody left — and nothing stands in
 * the middle, because the corridor is how the player gets everywhere.
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
    seed: 'qd_dna-spine',
    every: 5,
    signEvery: 3.2,
    signs: CORRIDOR_TEXT,
    // No `print:` here. `furnishRoom` reads one and `furnishCorridor` does not —
    // its signs go through `wordedSign` into `paintSignFace`, which owns its own
    // palette — so passing one would be a key silently dropped, which is how a
    // sentence nobody will ever read gets authored.
    hard,
    keepClear: [],
    wallOk: (x, z) => spineWallOk(plan, P, x, z),
  });

  const along = (side, opts) => paintAlongWall({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    plan, P, side, run: sp, paper: '#ddd6c4', ...opts,
  });

  // The chain, along the east wall.
  //
  // The band is at 2.20 with a 0.62 m height in every one of these buildings,
  // whatever the ceiling is, because what sets it is where the player's eye is
  // rather than where the slab is. Set against `tileH` instead it sits above the
  // top of a 66-degree frame at walking distance from the wall, and a corridor
  // drawing nobody can see while walking is a corridor drawing that is not there.
  // It overlaps the notice boards a little, which is what a painted band behind a
  // pinned-up sheet actually looks like.
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#2f4034', soft: '#6d6552',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing and
  // is the only thing in the corridor that does not.
  //
  // A `gradient` was tried here first and it is the engine's own gold-to-blue
  // ramp, which in a brown corridor reads as a strip light rather than as paint —
  // and its `paper` shows either side of the ramp, so a mural lighter than the wall
  // behind it becomes a white stripe. A wash in the building's own colour, one step
  // off the distemper, is what a painted band actually looks like.
  along('w', { y: 0.9, h: 0.44, kind: 'wash', paper: '#b3a789' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
