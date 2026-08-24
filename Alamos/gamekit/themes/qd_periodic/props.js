// props.js — the objects and the wall text unique to the Chemistry Institute.
//
// Anything generic (benches, chairs, racks, notice boards, shelving) comes from
// engine/world/interiorKit.js; this file is the handful of things that make *this*
// institute recognisable, plus every word painted or written up on its walls.
//
// The building's argument is on its walls, deliberately. This is a campaign about
// an arrangement being tested, so the long wall carries the chain from a cupboard
// of drawers to an ordering nobody could have weighed, and each room carries the
// records the people in it keep.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * Nine parts earnest, one part joke per room. An institute where every notice is
 * a safety instruction is an institute nobody works in, and one where every
 * notice is a gag is a set. None of this is on the syllabus and none of it is checked;
 * all of it has to land at 1.4 m/s.
 */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'VISITORS', heading: 'Sign the book', accent: '#2c3a30',
      body: 'The book is the fire roll. Sign out as well as in. '
        + 'Nothing leaves the specimen store without a docket.' },
    { style: 'list', tag: 'ROOMS', heading: 'Who is where', accent: '#5b6a72',
      items: [['Specimens', 'first left'], ['Weighing', 'first right'],
        ['Bench', 'right, middle'], ['Card desk', 'far left'], ['Lecture hall', 'far right']],
      body: 'The lecture hall is locked outside term unless the porter has been told.' },
    { style: 'warning', tag: 'SPECIMENS', heading: 'Several of these are not safe in air',
      accent: '#b5502f',
      body: 'The alkali metals live under oil and stay there. If a drawer is warm, do not open it.' },
    { style: 'sticky', tag: 'LOST', heading: 'One card, thallium', accent: '#8a6a1e',
      body: 'Last seen Tuesday on the long table. It has a corner torn off. Do not write a new one.' },
  ],
  SPEC: [
    { style: 'grid', tag: 'THE DRAWERS', heading: 'Sixty-three, numbered by nothing in particular',
      accent: '#3f7f6a',
      body: 'The order they are stored in is the order they were acquired in. '
        + 'That is a fact about this cupboard and not about chemistry.' },
    { style: 'chart', tag: 'THREE THAT BEHAVE ALIKE', heading: 'Lithium, sodium, potassium',
      accent: '#3f7f6a',
      body: 'Same kind of compounds in the same proportions, and all three violent '
        + 'with water. Their masses are nothing like each other.' },
    { style: 'list', tag: 'DRAWER RULES', heading: 'Standing orders', accent: '#5b6a72',
      items: [['Under oil', 'Li, Na, K'], ['Sealed', 'P, and the halogens'],
        ['Open', 'most of the metals'], ['Docket', 'everything, always']],
      body: 'The docket is how a card gets back to the drawer it came from.' },
    { style: 'warning', tag: 'DO NOT REORDER', heading: 'The drawers stay as they are',
      accent: '#b5502f',
      body: 'The rearranging happens on the long table with cards. A cupboard '
        + 'rearranged is a week nobody can retrace.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Someone said the order of the elements is obviously by weight',
      accent: '#8a6a1e', body: '' },
  ],
  CARDS: [
    { style: 'banner', tag: 'THE LONG TABLE', heading: 'One card an element, and nothing pinned down',
      accent: '#5a3b2a',
      body: 'Mass, the compounds it makes, how it behaves. Move them until '
        + 'something recurs, and leave a hole where nothing fits.' },
    { style: 'grid', tag: 'THE RULE ABOUT HOLES', heading: 'An empty cell is a prediction',
      accent: '#5a3b2a',
      body: 'Forcing the nearest card into a gap hides the pattern. Leaving it '
        + 'empty and saying what would go there is a thing that can be tested.' },
    { style: 'list', tag: 'ON THE TABLE', heading: 'Gaps as of this morning', accent: '#5b6a72',
      items: [['Below aluminium', 'mass near 70'], ['Below silicon', 'mass near 72'],
        ['Below boron', 'mass near 44'], ['Between Te and I', 'not a gap — an anomaly']],
      body: 'The last row is a different kind of problem and is filed separately.' },
    { style: 'sticky', tag: 'REMINDER', heading: 'Published beats postdicted', accent: '#8a6a1e',
      body: 'A figure printed before anybody looks is a test. A figure adjusted afterwards is a story.' },
  ],
  BENCH: [
    { style: 'grid', tag: 'THE BENCH', heading: 'Three properties, three methods, three chances to be wrong',
      accent: '#3f6f8a',
      body: 'Mass by combustion and weighing, density by displacement, formula '
        + 'by analysis. None of them settles another.' },
    { style: 'chart', tag: 'PREDICTED AGAINST MEASURED', heading: 'The new metal from France',
      accent: '#3f6f8a',
      body: 'Three sealed predictions and three measurements. Small residuals '
        + 'in all three, and none of them exactly nothing.' },
    { style: 'list', tag: 'ON THE BENCH', heading: 'This week', accent: '#5b6a72',
      items: [['Sample received', '3.1 g'], ['Mass measured', '69.7'],
        ['Density measured', '5.9'], ['Oxide analysed', 'two to three']],
      body: 'Three grams is the entire world supply and it arrived by post.' },
    { style: 'warning', tag: 'DISPLACEMENT', heading: 'A bubble on the sample is a wrong density',
      accent: '#b5502f',
      body: 'Wet it, tap it, and look. This has cost two afternoons and one printed figure.' },
  ],
  HALL: [
    { style: 'banner', tag: 'THE HALL', heading: 'A claim is defended here or it is not made',
      accent: '#2c3a30',
      body: 'Bring the sealed prediction and the measurement, in that order, and '
        + 'read them out in that order.' },
    { style: 'grid', tag: 'THE NEW INSTRUMENT', heading: 'Brought in decades after the table was drawn',
      accent: '#7a4fa3',
      body: 'It reads a number off each element that has nothing to do with '
        + 'weighing, and it goes up by one all the way along.' },
    { style: 'list', tag: 'TE AND I', heading: 'The anomaly, both ways', accent: '#5b6a72',
      items: [['By mass', '127.6 then 126.9'], ['By chemistry', 'Te then I'],
        ['By the new number', '52 then 53'], ['Conflict', 'gone']],
      body: 'One column disagrees with the other two, and it is not the chemistry.' },
    { style: 'sticky', tag: 'NOTICE', heading: 'The projector lamp is failing again', accent: '#8a6a1e',
      body: 'Sit near the front. It has been like this for two terms.' },
  ],
  TEA: [
    { style: 'list', tag: 'ROTA', heading: 'Who makes the tea', accent: '#5b6a72',
      items: [['Mon', 'Popova'], ['Tue', 'Sokolova'], ['Wed', 'Popova'],
        ['Thu', 'nobody'], ['Fri', 'nobody']],
      body: 'Thursday and Friday have been blank since the rota went up.' },
    { style: 'sticky', tag: 'SEMINAR', heading: 'Thursday, four o\'clock', accent: '#8a6a1e',
      body: 'Meyer, on arranging the elements by volume rather than by mass. Bring your own chair.' },
  ],
  WEIGH: [
    { style: 'warning', tag: 'THE BALANCE', heading: 'Shut the door before you weigh', accent: '#b5502f',
      body: 'A draught down the corridor moves the pan. Everybody has done this once.' },
    { style: 'list', tag: 'STANDARDS', heading: 'In the case', accent: '#5b6a72',
      items: [['Brass, large', 'checked in June'], ['Brass, small', 'checked in June'],
        ['Platinum', 'not checked'], ['Spare pan', 'bent']],
      body: 'The platinum set is the one everybody assumes is fine. Nobody has checked it.' },
  ],
  RACK: [
    { style: 'grid', tag: 'REAGENTS', heading: 'Label the bottle or it goes down the sink',
      accent: '#5b6a72', body: 'This has happened twice.' },
    { style: 'list', tag: 'STOCK', heading: 'On the shelf', accent: '#5b6a72',
      items: [['Acids', 'ample'], ['Alkalis', 'ample'], ['Oil for the drawers', 'one tin'],
        ['Filter paper', 'two quires']],
      body: 'One tin of oil is a term at the current rate. Order in October.' },
  ],
  LIB: [
    { style: 'banner', tag: 'LIBRARY', heading: 'Quiet, and the offprints stay in the case',
      accent: '#2c3a30', body: 'The German journals are on the left. Nobody has read the back three years.' },
  ],
};

const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'THE INSTITUTE', heading: 'Chemistry', accent: '#2c3a30',
    body: 'Specimens and the card desk on your left. Weighing, the bench and the '
      + 'lecture hall on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected where', accent: '#5b6a72',
    items: [['Mon', 'the families sorted'], ['Tue', 'the run ordered'],
      ['Wed', 'the gaps left empty'], ['Thu', 'the figures sealed'],
      ['Fri', 'the sample from France']],
    body: 'Mendeleev posts this on Sunday evening and does not revise it.' },
  { style: 'warning', tag: 'SPECIMENS', heading: 'Cards travel; drawers do not',
    accent: '#b5502f', body: 'Everything is rearranged on the long table and nowhere else.' },
  { style: 'grid', tag: 'FIRE', heading: 'Assembly in the courtyard', accent: '#b5502f',
    body: 'Out of the porch, left, past the gates. Not through the lecture hall.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The third window will not shut',
    accent: '#8a6a1e', body: 'It has been reported. It has been reported since the spring.' },
  { style: 'list', tag: 'THE GAP BELOW ALUMINIUM', heading: 'What is claimed about an element nobody has', accent: '#5a3b2a',
    items: [['Atomic mass', 'about 70'], ['Density', 'about 6'],
      ['Oxide', 'two to three'], ['Found', 'not yet']],
    body: 'Printed, dated and sealed. That is the whole of what makes it a test.' },
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
  { title: 'Drawers', sub: 'sixty-three, in no order', glyph: 'column' },
  { title: 'Families', sub: 'behaviour that recurs', glyph: 'bars' },
  { title: 'The run', sub: 'ordered by one thing', glyph: 'ruler' },
  { title: 'Anomaly', sub: 'mass against chemistry', glyph: 'points' },
  { title: 'The gap', sub: 'left empty on purpose', glyph: 'plate' },
  { title: 'Prediction', sub: 'printed and dated', glyph: 'camera' },
  { title: 'Gallium', sub: 'three grams, by post', glyph: 'flask' },
  { title: 'Residuals', sub: 'small, and not nothing', glyph: 'fibre' },
  { title: 'Atomic number', sub: 'the order underneath', glyph: 'spiral' },
];

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  // What each room of *this* institute has in it. The names are interiorKit's
  // fitting makers; the choice per room is what makes a specimen store read
  // differently from a lecture hall.
  const FITTINGS = {
    PORCH: ['toolBoard'],
    SPEC:  ['sampleStore', 'rack', 'rack', 'toolBoard'],
    CARDS: ['whiteboard', 'whiteboard', 'rack'],
    BENCH: ['sampleStore', 'gasCylinder', 'toolBoard', 'rack'],
    HALL:  ['whiteboard', 'monitorBank', 'whiteboard'],
    TEA:   ['whiteboard'],
    WEIGH: ['sampleStore', 'toolBoard', 'rack'],
    RACK:  ['rack', 'rack', 'barrel', 'cableDrum'],
    LIB:   ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', SPEC: 'lab', CARDS: 'station', BENCH: 'lab',
    HALL: 'workroom', TEA: 'waiting', WEIGH: 'supply', RACK: 'supply', LIB: 'quiet',
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

  // The specimen store's wall of drawers, down the outside wall. Sixty-three
  // elements in numbered drawers is what this campaign starts by pulling open,
  // and a store with shelving in it instead reads as a stationery cupboard.
  if(room.id === 'SPEC'){
    box(0.62, 2.10, 9.0, b.xOuter - f * 0.52, 1.05, b.cz, M.rail);
    for(let i = 0; i < 7; i++){
      const cz = b.cz - 3.6 + i * 1.2;
      box(0.04, 1.9, 0.06, b.xOuter - f * 0.20, 1.05, cz, M.frame);
    }
    hard(b.xOuter - f * 0.52, b.cz, 0.8, 9.2, 2.1);
  }

  // The card desk's long table, which is where the whole argument happens. It
  // runs down the middle rather than against a wall, because the point of it is
  // that people stand on both sides moving cards about.
  if(room.id === 'CARDS'){
    box(1.60, 0.90, 6.40, b.cx, 0.45, b.cz, M.frame);
    hard(b.cx, b.cz, 1.8, 6.6, 0.95);
  }

  // The lecture hall's raked bench and the demonstration table in front of it.
  if(room.id === 'HALL'){
    for(let i = 0; i < 3; i++){
      box(0.80, 0.42 + i * 0.30, 7.0, b.xOuter - f * (0.9 + i * 0.95),
        (0.42 + i * 0.30) / 2, b.cz, M.rail);
      hard(b.xOuter - f * (0.9 + i * 0.95), b.cz, 0.9, 7.2, 0.9 + i * 0.3);
    }
    box(0.80, 0.95, 3.20, b.xInner + f * 1.6, 0.475, b.cz, M.frame);
    hard(b.xInner + f * 1.6, b.cz, 1.0, 3.4, 1.0);
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
    // An imperial institute in 1869 writes by hand on laid paper and prints its
    // notices on the same stock. A bright white sheet in a room lit like this
    // reads as a light box.
    print: { paper: '#e6ddc6', ink: '#2a2317', soft: '#6e6650', accent: '#2c3a30' },
    seed: `qd_periodic-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand, at the far end of every group room. Furniture standing
      // on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The drawers, the long table and the raked bench.
      ...(room.id === 'SPEC' ? [{ x: b.xOuter - f * 0.52, z: b.cz, r: 1.4 }] : []),
      ...(room.id === 'CARDS' ? [{ x: b.cx, z: b.cz, r: 2.6 }] : []),
      ...(room.id === 'HALL' ? [{ x: b.xOuter - f * 1.9, z: b.cz, r: 3.0 }] : []),
    ],
    target: 16,
  });

  // Paint, where a room earns it. Low contrast and unframed: a mural is meant to
  // be seen and not read.
  const MURAL = {
    // A grid with holes in it, at the scale of the wall, over the table the
    // holes were argued about on.
    CARDS: { kind: 'lattice', w: 5.0, h: 2.5, ink: '#5a3b2a' },
    // A property rising and falling and rising again, enormous and faint, above
    // the drawers it was noticed in.
    SPEC:  { kind: 'spiral', w: 4.6, h: 2.5, ink: '#3f7f6a' },
    // One field of colour and nothing to read. The only wall in the building
    // allowed to say nothing.
    LIB:   { kind: 'wash', w: 4.2, h: 2.3, paper: '#d9d0b8' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      paper: '#d8cfb6',
      ...MURAL,
    });
  }
}

/**
 * Fit out the corridor.
 *
 * Fifty metres of it, and it is the only route between the two halves of the
 * argument. What goes in it is what accumulates in a working institute — notice
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
    seed: 'qd_periodic-spine',
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
    plan, P, side, run: sp, paper: '#d8cfb6', ...opts,
  });

  // The chain, along the east wall.
  //
  // The band is at 2.20 with a 0.62 m height in every one of these buildings,
  // whatever the ceiling is, because what sets it is where the player's eye is
  // rather than where the slab is. Set against `tileH` instead it sits above the
  // top of a 66-degree frame at walking distance from the wall, and a corridor
  // drawing nobody can see while walking is a corridor drawing that is not there.
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#2c3a30', soft: '#6e6650',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing
  // and is the only thing in the corridor that does not.
  along('w', { y: 0.9, h: 0.44, kind: 'wash', paper: '#a99e80' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
