// props.js — the objects and the wall text unique to the Inoculation Department.
//
// Anything generic (benches, chairs, racks, notice boards, shelving) comes from
// engine/world/interiorKit.js; this file is the handful of things that make *this*
// department recognisable, plus every word painted or pinned on its walls.
//
// The building's argument is on its walls, deliberately. This is a campaign about
// evidence accumulating, so the long wall carries the chain from one contaminated
// plate to a counted dose, and each room carries the records the people in it
// actually keep.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * Nine parts earnest, one part joke per room. A department where every notice is
 * a safety instruction is a department nobody works in, and one where every notice
 * is a gag is a set. None of this is on the syllabus and none of it is checked;
 * all of it has to land at 1.4 m/s.
 */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'VISITORS', heading: 'Sign the book', accent: '#33443a',
      body: 'The book is the fire roll. Sign out as well as in. '
        + 'Nobody past the sterilising room in outdoor coats.' },
    { style: 'list', tag: 'EXTENSIONS', heading: 'Who is where', accent: '#5b6a72',
      items: [['Cultures', '112'], ['Broth room', '118'], ['Assay', '121'],
        ['Trial room', '104'], ['Porter', '100']],
      body: 'Ring before you walk down. The broth room door is kept shut for the warmth.' },
    { style: 'warning', tag: 'CULTURES', heading: 'Nothing leaves on a plate', accent: '#8a4a3f',
      body: 'Plates travel in the carrier and nowhere else. '
        + 'If you are unsure whether a plate is live, it is live.' },
    { style: 'sticky', tag: 'LOST', heading: 'One brass loop handle', accent: '#8a6a1e',
      body: 'Last seen Tuesday, by the incubator. Charteris is not pleased. It is the short one.' },
  ],
  CULT: [
    { style: 'grid', tag: 'THE STRAIN BOOK', heading: 'Every subculture, with its ward', accent: '#4d7a3f',
      body: 'A lawn is only a measuring surface if it is the same lawn every time. '
        + 'One strain, one age, one thickness.' },
    { style: 'chart', tag: 'THE PLATE', heading: 'Growth against distance from the colony',
      accent: '#4d7a3f',
      body: 'It fades over about a centimetre. That is the finding. A boundary '
        + 'would have meant something else entirely.' },
    { style: 'list', tag: 'INCUBATOR', heading: 'This week', accent: '#5b6a72',
      items: [['Plates seeded', '46'], ['Contaminated', '5'],
        ['With a ring', '1'], ['Explained', 'none']],
      body: 'Look at a plate before it goes on the wash trolley. This is why.' },
    { style: 'warning', tag: 'DO NOT DISCARD', heading: 'The plate on the near bench', accent: '#8a4a3f',
      body: 'It has been photographed twice and drawn once and it is still not '
        + 'finished with. Leave it where it is.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Someone said "so it must be a cure"',
      accent: '#8a6a1e', body: '' },
  ],
  BROTH: [
    { style: 'banner', tag: 'BEFORE YOU FILTER', heading: 'Age, temperature, candle, log',
      accent: '#8a6a1e',
      body: 'In that order, every time. Write the age of the broth in the log '
        + 'before you touch the candle.' },
    { style: 'list', tag: 'ONE CHANGE', heading: 'What a flask is for', accent: '#5b6a72',
      items: [['Flask 1', 'filtered again'], ['Flask 2', 'neutralised'],
        ['Flask 3', 'fed'], ['Flask 4', 'warmed']],
      body: 'One change to one flask. Two changes to one flask is a wasted flask.' },
    { style: 'warning', tag: 'KEEP IT COLD', heading: 'The material does not like warmth',
      accent: '#8a4a3f',
      body: 'Ten minutes at ninety degrees is the end of it. So, more slowly, is '
        + 'an afternoon on a sunny bench.' },
    { style: 'sticky', tag: 'NOTE', heading: 'The cupboard thermostat reads high', accent: '#8a6a1e',
      body: 'By four degrees, consistently. There is a corrected chart on the door. '
        + 'There has been since March.' },
  ],
  ASSAY: [
    { style: 'grid', tag: 'THE STANDARD LAWN', heading: 'One lawn or the numbers mean nothing',
      accent: '#3f6f8a',
      body: 'A strength is a comparison. Two batches read against two lawns have '
        + 'not been compared with each other.' },
    { style: 'chart', tag: 'DOSE AND GROWTH', heading: 'Four dilutions, read at eighteen hours',
      accent: '#3f6f8a',
      body: 'The top of the range stops everything and cannot separate two '
        + 'batches. The middle is where a difference shows.' },
    { style: 'list', tag: 'BATCHES', heading: 'Assayed this week', accent: '#5b6a72',
      items: [['B-41', '6 units/ml'], ['B-42', '11 units/ml'],
        ['B-43 crude', '4 units/ml'], ['B-43 extracted', '19 units/ml']],
      body: 'Nineteen against four is not nineteen over four of the activity. Read the yield column.' },
    { style: 'warning', tag: 'ASSAY EVERY STEP', heading: 'Purity is not recovery', accent: '#8a4a3f',
      body: 'A clear liquid in a quarter of the volume looks like progress and '
        + 'looks exactly the same when the activity has gone.' },
  ],
  TRIAL: [
    { style: 'banner', tag: 'THE WALL', heading: 'A claim comes off by being contradicted',
      accent: '#8a4a3f',
      body: 'Never by being unpopular, and never because the meeting is on '
        + 'Friday. Pin the measurement beside the claim.' },
    { style: 'grid', tag: 'MATCHED GROUPS', heading: 'One culture, one afternoon', accent: '#8a4a3f',
      body: 'Weight, age, infection and hour the same in both groups. The '
        + 'treatment is the only thing that differs, or it is not a comparison.' },
    { style: 'list', tag: 'PRODUCTION', heading: 'Last week', accent: '#5b6a72',
      items: [['Broth brewed', '500 l'], ['Units recovered', '4,800'],
        ['One adult dose', '200 units'], ['Patient-days', '3']],
      body: 'Three days for one adult. That is the whole operation for a week.' },
    { style: 'sticky', tag: 'REMINDER', heading: 'A signature is not a measurement',
      accent: '#8a6a1e',
      body: 'It records that somebody accepted a claim. Useful. Not the same thing.' },
  ],
  TEA: [
    { style: 'list', tag: 'ROTA', heading: 'Milk', accent: '#5b6a72',
      items: [['Mon', 'Charteris'], ['Tue', 'Adeyemi'], ['Wed', 'Heatley'],
        ['Thu', 'nobody'], ['Fri', 'nobody']],
      body: 'Thursday and Friday have been blank since the rota was put up.' },
    { style: 'sticky', tag: 'SEMINAR', heading: 'Thursday, four o\'clock', accent: '#8a6a1e',
      body: 'Chain, on what a filtrate does and does not establish. Bring your own chair.' },
  ],
  STER: [
    { style: 'warning', tag: 'AUTOCLAVE', heading: 'Do not sign the chart early', accent: '#8a4a3f',
      body: 'The cycle is finished when the chart says so and not when the noise stops.' },
    { style: 'list', tag: 'LOADS', heading: 'Today', accent: '#5b6a72',
      items: [['Plates', '08:10'], ['Flasks', '10:40'], ['Pipettes', '13:15'],
        ['Discard', '16:00']],
      body: 'Discard last, always, and never in the same load as clean glass.' },
  ],
  RACK: [
    { style: 'grid', tag: 'MEDIA', heading: 'Label the flask or it goes down the sink',
      accent: '#5b6a72', body: 'This has happened twice.' },
    { style: 'list', tag: 'STOCK', heading: 'On the shelf', accent: '#5b6a72',
      items: [['Agar', '4 kg'], ['Peptone', '2 kg'], ['Salts', 'ample'],
        ['Empty plates', '600']],
      body: 'Six hundred plates is nine days at the present rate. Order on Monday.' },
  ],
  LIB: [
    { style: 'banner', tag: 'READING ROOM', heading: 'Quiet, and the loan card stays in the cover',
      accent: '#33443a', body: 'Take the journal, leave the card. This is not complicated.' },
  ],
};

const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'THE DEPARTMENT', heading: 'Inoculation', accent: '#33443a',
    body: 'Cultures and the broth room on your left. Assay, sterilising and the '
      + 'trial room on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected where', accent: '#5b6a72',
    items: [['Mon', 'the plate described'], ['Tue', 'the filtrate test'],
      ['Wed', 'one change at a time'], ['Thu', 'the rack read'],
      ['Fri', 'the wall gone through']],
    body: 'Florey posts this on Sunday evening and does not revise it.' },
  { style: 'warning', tag: 'CARRIERS', heading: 'Plates travel in the carrier',
    accent: '#8a4a3f', body: 'Not on a tray, not in a hand, not down this corridor.' },
  { style: 'grid', tag: 'FIRE', heading: 'Assembly in the yard', accent: '#8a4a3f',
    body: 'Out of the porch, left, past the bicycles. Not through the broth room.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The floor by the tea room is uneven',
    accent: '#8a6a1e', body: 'It has been reported. It has been reported since 1925.' },
  { style: 'list', tag: 'SUPPLY', heading: 'A week of everything', accent: '#3f6f8a',
    items: [['Broth', '500 litres'], ['Units recovered', '4,800'],
      ['Doses', '24'], ['Patients', 'one, for three days']],
    body: 'That is the number this department is actually about.' },
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
  { title: 'Plate', sub: 'a ring, not an edge', glyph: 'plate' },
  { title: 'Broth', sub: 'mould grown alone', glyph: 'flask' },
  { title: 'Filter', sub: 'the organism held back', glyph: 'column' },
  { title: 'Control', sub: 'one change, put back', glyph: 'bars' },
  { title: 'Species', sub: 'stopped, slowed, untouched', glyph: 'points' },
  { title: 'Rack', sub: 'growth against strength', glyph: 'ruler' },
  { title: 'Extract', sub: 'purer, and less of it', glyph: 'fibre' },
  { title: 'Groups', sub: 'eight treated, eight not', glyph: 'camera' },
  { title: 'Doses', sub: 'a week is twenty-four', glyph: 'spiral' },
];

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  // What each room of *this* department has in it. The names are interiorKit's
  // fitting makers; the choice per room is what makes a culture room read
  // differently from a store.
  const FITTINGS = {
    PORCH: ['toolBoard'],
    CULT:  ['sampleStore', 'rack', 'toolBoard', 'rack'],
    BROTH: ['gasCylinder', 'sampleStore', 'toolBoard', 'rack'],
    ASSAY: ['monitorBank', 'rack', 'sampleStore', 'toolBoard'],
    TRIAL: ['whiteboard', 'monitorBank', 'whiteboard'],
    TEA:   ['whiteboard'],
    STER:  ['pumpSet', 'barrel', 'rack'],
    RACK:  ['rack', 'rack', 'barrel', 'cableDrum'],
    LIB:   ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', CULT: 'lab', BROTH: 'workroom', ASSAY: 'lab',
    TRIAL: 'station', TEA: 'waiting', STER: 'supply', RACK: 'supply', LIB: 'quiet',
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

  // The assay room's long bench down the outside wall. A rack of dilutions read
  // against one lawn needs run, and an assay on a desk is a desk with a rack on
  // it — which is the same argument the plan's room depth is making.
  if(room.id === 'ASSAY'){
    box(0.75, 0.92, 8.4, b.xOuter - f * 0.62, 0.46, b.cz, M.frame);
    hard(b.xOuter - f * 0.62, b.cz, 0.95, 8.6, 1.0);
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
    // A hospital department in 1928 prints on cream and types in black. A bright
    // sheet in a room lit like this reads as a light box.
    print: { paper: '#e8e3d4', ink: '#241f18', soft: '#6d6552', accent: '#33443a' },
    seed: `qd_penicillin-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand, at the far end of every group room. Furniture standing
      // on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The assay room's long bench.
      ...(room.id === 'ASSAY' ? [{ x: b.xOuter - f * 0.62, z: b.cz, r: 1.4 }] : []),
    ],
    target: 16,
  });

  // Paint, where a room earns it. Low contrast and unframed: a mural is meant to
  // be seen and not read.
  const MURAL = {
    // The plate itself, at the scale of the wall: a colony and a ring that fades
    // rather than stops. On the wall the actual plate is sitting under.
    CULT:  { kind: 'lattice', w: 4.6, h: 2.5, ink: '#4d7a3f' },
    // Growth against strength, enormous and faint, above the rack that produced it.
    ASSAY: { kind: 'spiral', w: 4.8, h: 2.6, ink: '#3f6f8a' },
    // One field of colour and nothing to read. The only wall in the department
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
 * argument. What goes in it is what accumulates in a working department — notice
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
    seed: 'qd_penicillin-spine',
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
    plan, P, side, run: sp, paper: '#ddd6c4', ...opts,
  });

  // The chain, along the east wall.
  //
  // The band is at 2.20 with a 0.62 m height in every one of these buildings,
  // whatever the ceiling is, because what sets it is where the player's eye is
  // rather than where the slab is. Set against `tileH` instead it sits above the
  // top of a 66-degree frame at walking distance from the wall, and a corridor
  // drawing nobody can see while walking is a corridor drawing that is not there.
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#2f4034', soft: '#6d6552',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing
  // and is the only thing in the corridor that does not.
  along('w', { y: 0.9, h: 0.44, kind: 'wash', paper: '#b3a789' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
