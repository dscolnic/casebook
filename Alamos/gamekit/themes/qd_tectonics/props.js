// props.js — the objects and the wall text unique to the Global Survey Section.
//
// The structural half of an interior fit-out — where a wall has a doorway in it,
// where a mural may be painted, which way a sliced drawing runs on each side of a
// corridor — is `engine/world/interiorKit.js`. What is left here is what makes
// this a postwar survey building rather than a corridor: the wall text, the chain
// painted along it, the map wall, and four rooms' worth of fittings.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/** What is on the walls, room by room. Nine parts earnest, one part joke. */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'THE SECTION', heading: 'Land west, sea east', accent: '#2f4a55',
      body: 'Map room and kinematics on your left. Marine survey and seismology on '
        + 'your right. The reading room is at the far end and so is the quiet.' },
    { style: 'list', tag: 'EXPEDITIONS OUT', heading: 'And when they are back',
      accent: '#5b6a72',
      items: [['Atlantic, leg 4', 'March'], ['Indian Ocean', 'June'],
        ['Chile margin', 'August'], ['Iceland', 'overdue']],
      body: 'Post goes to the pigeonholes and is not forwarded.' },
    { style: 'warning', tag: 'CHARTS', heading: 'Do not roll them the other way',
      accent: '#b5502f',
      body: 'A chart rolled against its own curl has to be pressed flat for a week '
        + 'before anything can be plotted on it.' },
    { style: 'sticky', tag: 'THE BAROMETER', heading: 'Has not been adjusted since 1949',
      accent: '#8a6a1e', body: 'It is not broken. Nobody knows what it is set to.' },
  ],
  MAP: [
    { style: 'banner', tag: 'THE RULE OF THIS WALL', heading: 'Fit at the shelf, not the beach',
      accent: '#8a6a1e',
      body: 'A coastline is where the sea stands this century. The shelf edge is where '
        + 'the continent stops. They can be a hundred miles apart.' },
    { style: 'grid', tag: 'ON PINS', heading: 'Eleven pieces, none of them glued',
      accent: '#8a6a1e',
      body: 'Move whatever you like. Put it back where the pencil marks are.' },
    { style: 'chart', tag: 'ROCK BELTS', heading: 'Four of them cross the join',
      accent: '#5b6a72',
      body: 'Same rock, same age, running off one piece and continuing on the other. '
        + 'That is the part that is hard to arrange by luck.' },
    { style: 'list', tag: 'FOSSIL CARDS', heading: 'And what each one costs to dismiss',
      accent: '#3a5a44',
      items: [['Freshwater reptile', 'expensive'], ['Seed fern', 'expensive'],
        ['Seabird', 'nothing at all'], ['Marine shell', 'nothing at all']],
      body: 'A fossil is worth what its alternative explanation costs.' },
    { style: 'sticky', tag: 'PINNED SINCE MARCH', heading: 'A good fit is not a mechanism',
      accent: '#b5502f', body: 'Ewing. Nobody has taken it down and nobody has answered it.' },
  ],
  MARINE: [
    { style: 'banner', tag: 'TEN YEARS OF SHIPS', heading: 'Position, depth, age, on every sample',
      accent: '#3f6f8f',
      body: 'A sample with no position is a rock. Log it before it leaves the deck.' },
    { style: 'chart', tag: 'AGE AGAINST DISTANCE', heading: 'Both sides of the ridge',
      accent: '#3f6f8f',
      body: 'Youngest at the crest, older outward, and the same slope on either side. '
        + 'That was a prediction before it was a graph.' },
    { style: 'grid', tag: 'MAGNETIC TRACES', heading: 'Rolled in tubes, by leg',
      accent: '#3f6f8f',
      body: 'Correct for the ship\'s own iron before you plot anything. The correction '
        + 'is on the card inside each tube.' },
    { style: 'list', tag: 'WHAT A BAND IS NOT', heading: 'A date', accent: '#5b6a72',
      items: [['A band', 'a shape and a width'], ['A width', 'how long that polarity lasted'],
        ['A date', 'from the land timeline'], ['The timeline', 'somebody else\'s work']],
      body: 'Match the pattern first. Read the years off afterwards.' },
    { style: 'sticky', tag: 'ON THE CABINET', heading: 'Leg 4 samples are not in leg 4',
      accent: '#8a6a1e', body: 'They are in leg 3. Ask Hess. Do not reorganise them.' },
  ],
  SEIS: [
    { style: 'banner', tag: 'EVERY SHOCK HAS A DEPTH', heading: 'And the depth is the point',
      accent: '#b5502f',
      body: 'On a flat map these are belts. With depths they are sheets, hundreds of '
        + 'kilometres long, tilting down and inland.' },
    { style: 'chart', tag: 'DEPTH AGAINST DISTANCE INLAND', heading: 'One trench, forty years',
      accent: '#b5502f',
      body: 'Nearly a straight line, which makes its slope an angle.' },
    { style: 'grid', tag: 'BELTS, NOT SCATTER', heading: 'Ninety per cent inside narrow bands',
      accent: '#5b6a72',
      body: 'Anything that says earthquakes are randomly placed has not seen this wall.' },
    { style: 'list', tag: 'WHAT IS MEASURED', heading: 'And what is inferred', accent: '#3a5a44',
      items: [['Where rock is breaking', 'measured'], ['How deep', 'measured'],
        ['The shape of the sheet', 'measured'], ['That it is a plate', 'inferred']],
      body: 'The last line is the whole argument, and it is not on this wall.' },
    { style: 'sticky', tag: 'NOTE', heading: 'The Iceland pins are provisional',
      accent: '#8a6a1e', body: 'The station clock drifted. Benioff is refitting them.' },
  ],
  MODEL: [
    { style: 'banner', tag: 'NO DATA IN THIS ROOM', heading: 'Deliberately',
      accent: '#7a4fa3',
      body: 'Sections, arrows and argument. If a claim needs a file, the file is in '
        + 'another room and you should go and get it.' },
    { style: 'grid', tag: 'THREE THINGS TWO PLATES CAN DO', heading: 'And nothing else',
      accent: '#7a4fa3',
      body: 'Separate. Converge. Slide past. Every boundary on Earth is one of those.' },
    { style: 'chart', tag: 'SEVEN FILES', heading: 'Any framework has to take all of them',
      accent: '#5b6a72',
      body: 'Shelf fit, fossils, ice scratches, rock ages, magnetic bands, earthquake '
        + 'depths, volcanoes.' },
    { style: 'list', tag: 'WHAT IS STILL OPEN', heading: 'And it is not small', accent: '#b5502f',
      items: [['That plates move', 'settled'], ['Where crust is made', 'settled'],
        ['Where it goes back', 'settled'], ['What drives it', 'open']],
      body: 'The strength of the claim is that it does not depend on the last line.' },
    { style: 'sticky', tag: 'ON THE ROLLERS', heading: 'Do not leave a section half run',
      accent: '#8a6a1e', body: 'The next person will read it as a finished one.' },
  ],
  TEA: [
    { style: 'grid', tag: 'FIELD SEASONS', heading: 'Marked in wool on the wall map',
      accent: '#3a5a44', body: 'One colour each. Do not use somebody else\'s colour.' },
    { style: 'sticky', tag: 'THE URN', heading: 'Off at the wall', accent: '#8a6a1e',
      body: 'The switch on the urn does nothing and never has.' },
    { style: 'list', tag: 'SEMINAR', heading: 'Thursdays, four o\'clock', accent: '#5b6a72',
      items: [['This week', 'Matthews, on the bands'], ['Next', 'Benioff, on depths'],
        ['After', 'Ewing, on all of it']],
      body: 'Bring your own chair. These ones do not leave.' },
  ],
  DARK: [
    { style: 'warning', tag: 'DOOR SHUT', heading: 'When the red lamp is on', accent: '#b5502f',
      body: 'A trace takes a fortnight at sea and one second to fog.' },
    { style: 'sticky', tag: 'THE LINE', heading: 'Is for prints, not for coats',
      accent: '#8a6a1e', body: '' },
  ],
  RACK: [
    { style: 'grid', tag: 'STORE', heading: 'Rolled charts, pins, plan-chest drawers',
      accent: '#5b6a72', body: 'Sign for anything that leaves. The crates are not empty.' },
    { style: 'sticky', tag: 'THE ICELAND CRATES', heading: 'Have not been opened',
      accent: '#8a6a1e', body: 'Since August. Somebody should.' },
  ],
  LIB: [
    { style: 'list', tag: 'ON LOAN', heading: 'And to whom', accent: '#5b6a72',
      items: [['Wegener, 1929', 'Tharp'], ['Holmes, 1931', 'Ewing'],
        ['Ewing, 1954', 'Hess'], ['Reversal timeline', 'Matthews']],
      body: 'Sign the card inside the front cover.' },
    { style: 'sticky', tag: 'QUIET', heading: 'And the one good chair',
      accent: '#3a5a44', body: 'It is not reserved. It is simply always taken.' },
  ],
};

/** The corridor's own boards. */
const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'GLOBAL SURVEY SECTION', heading: 'Land west, sea east',
    accent: '#2f4a55',
    body: 'Map room, tea, kinematics and the store on your left. Photographic, '
      + 'marine survey, seismology and the reading room on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected when', accent: '#5b6a72',
    items: [['Mon', 'the land evidence closed'], ['Tue', 'the sea file opened'],
      ['Wed', 'one framework, in writing'], ['Thu', 'seminar'], ['Fri', 'to the printer']],
    body: 'Posted Sunday and not revised.' },
  { style: 'warning', tag: 'RED LAMP', heading: 'The photographic room door stays shut',
    accent: '#b5502f', body: 'A fortnight of towing, one second of light.' },
  { style: 'grid', tag: 'FIRE', heading: 'Assembly in the yard', accent: '#b5502f',
    body: 'Out of the porch and right. Not through the map room.' },
  { style: 'chart', tag: 'THE SEVEN FILES', heading: 'And which room each lives in',
    accent: '#2f4a55',
    body: 'Fossils and fit: map room. Ages and bands: marine. Depths and volcanoes: '
      + 'seismology. Nothing lives in kinematics.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The lino outside the tea room is lifting',
    accent: '#8a6a1e', body: 'Reported. Reported twice.' },
];

/**
 * The chain painted along the corridor's east wall.
 *
 * Walking the corridor walks the argument: what the land gives, then what the sea
 * gives, then the framework. It is in the corridor because no room owns it — the
 * point of the building's layout is that the argument crosses it.
 */
const CHAIN_STATIONS = [
  { title: 'Shelf fit', sub: 'the real edge', glyph: 'globe' },
  { title: 'Fossils', sub: 'what needs explaining', glyph: 'flask' },
  { title: 'Ice', sub: 'scratches on three continents', glyph: 'grid' },
  { title: 'Ridge', sub: 'where floor is made', glyph: 'beam' },
  { title: 'Ages', sub: 'rising outward, both sides', glyph: 'points' },
  { title: 'Bands', sub: 'a record read outward', glyph: 'bars' },
  { title: 'Depths', sub: 'a sheet going down', glyph: 'curve' },
  { title: 'Trench', sub: 'where floor goes back', glyph: 'dish' },
  { title: 'Plates', sub: 'one moving system', glyph: 'spiral' },
];

/** Fit out one room. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;
  const inX = b.xInner + f * 0.5;

  const FITTINGS = {
    PORCH:  ['toolBoard'],
    MAP:    ['whiteboard', 'rack', 'toolBoard', 'whiteboard'],
    MARINE: ['rack', 'rack', 'monitorBank', 'sampleStore', 'toolBoard'],
    SEIS:   ['monitorBank', 'whiteboard', 'rack', 'toolBoard'],
    MODEL:  ['whiteboard', 'whiteboard', 'rack'],
    TEA:    ['whiteboard'],
    DARK:   ['sampleStore', 'rack', 'barrel'],
    RACK:   ['rack', 'rack', 'barrel', 'cableDrum'],
    LIB:    ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', MAP: 'station', MARINE: 'lab', SEIS: 'lab', MODEL: 'workroom',
    TEA: 'waiting', DARK: 'supply', RACK: 'supply', LIB: 'quiet',
  };

  switch(room.kind){
    case 'reception':
      box(1.0, 1.05, 3.4, inX + f * 1.9, 0.525, b.cz - 0.4, M.frame);
      hard(inX + f * 1.9, b.cz - 0.4, 1.2, 3.6, 1.1);
      break;
    case 'workroom':
    case 'lab':
    case 'station':
      box(0.62, 0.9, 3.0, inX + f * 1.0, 0.45, b.cz, M.frame);
      hard(inX + f * 1.0, b.cz, 0.8, 3.2, 0.95);
      break;
    default:
      break;
  }

  // The map wall itself: continents cut out of board and hung on pins, along the
  // whole outer wall of the map room. This is the building's silhouette, and it is
  // built here rather than left to the kit because nothing in the kit is sixteen
  // metres of one continuous thing.
  //
  // It is hung *proud* of the wall's own face. `interiorSite` raises a wall centred
  // on the line it is given, so the surface a player sees is half the thickness
  // inside that — hanging at the line puts the board inside the plaster.
  if(room.id === 'MAP'){
    const wx = b.xOuter - f * (ctx.P.wall / 2 + 0.05);
    const z0 = room.z0 + 1.0, z1 = room.z1 - 1.0;
    // The backing board, in three panels so it reads as installed rather than
    // extruded, then the pieces pinned to it.
    for(let i = 0; i < 3; i++){
      const len = (z1 - z0) / 3;
      box(0.06, 2.5, len - 0.1, wx, 1.6, z0 + (i + 0.5) * len, M.wall);
    }
    // Eleven pieces, at the sizes and heights a wall map has them at. Deliberately
    // irregular: a grid of identical rectangles reads as a noticeboard.
    const PIECES = [
      [0.9, 1.1, 2.2], [0.7, 0.8, 1.4], [1.3, 1.6, 2.6], [0.6, 0.7, 1.1],
      [1.0, 1.2, 2.0], [0.8, 0.5, 1.7], [0.5, 0.6, 0.9], [1.1, 0.9, 2.3],
      [0.7, 1.0, 1.3], [0.9, 0.6, 1.8], [0.6, 0.8, 1.0],
    ];
    let z = z0 + 0.5;
    for(const [h, w, yy] of PIECES){
      if(z + w > z1 - 0.3) break;
      box(0.03, h, w, wx - f * 0.05, yy, z + w / 2, M.frame);
      z += w + 0.35;
    }
  }

  // The seismology wall: one blank world, and forty years of pins in it.
  if(room.id === 'SEIS'){
    const wx = b.xOuter - f * (ctx.P.wall / 2 + 0.05);
    box(0.06, 2.6, 9.0, wx, 1.65, b.cz, M.pale ?? M.wall);
    for(let i = 0; i < 26; i++){
      const t = i / 25;
      box(0.05, 0.05, 0.05, wx - f * 0.06, 0.95 + Math.sin(t * 7.0) * 0.55 + t * 0.5,
        b.cz - 4.0 + t * 8.0, M.base);
    }
  }

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    bounds: {
      x0: b.xInner + f * 2.2, x1: b.xOuter - f * 1.6,
      z0: room.z0 + 0.8, z1: room.z1 - 0.8,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: ctx.P.wall,
    wallOk: roomWallOk(room, b, ctx.plan, ctx.P),
    kind: KIND[room.id] ?? room.kind ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    print: { paper: '#e5e0cd', ink: '#1e2320', soft: '#666253', accent: '#2f4a55' },
    seed: `qd_tectonics-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.4 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
    ],
    target: 17,
  });

  // Paint, where a room earns it.
  const MURAL = {
    // The age pattern, at the scale of a wall.
    MARINE: { kind: 'spectrum', w: 5.0, h: 2.3, ink: '#3f6f8f' },
    // Motion arrows over a schematic globe, faint enough to be a texture.
    MODEL:  { kind: 'lattice', w: 4.6, h: 2.3, ink: '#7a4fa3' },
    LIB:    { kind: 'wash', w: 4.4, h: 2.2, paper: '#aca789' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.9, z: b.cz, faceX: true, toward: -f,
      paper: '#bdb9a4',
      ...MURAL,
    });
  }
}

/** Fit out the corridor. */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard } = ctx;
  const sp = plan.spine ?? { z0: -6, z1: 48 };

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: P.corridorHalfWidth,
    wallThickness: P.wall,
    z0: sp.z0, z1: sp.z1,
    seed: 'qd_tectonics-spine',
    every: 5,
    signEvery: 3.4,
    signs: CORRIDOR_TEXT,
    hard,
    keepClear: [],
    wallOk: (x, z) => spineWallOk(plan, P, x, z),
  });

  const along = (side, opts) => paintAlongWall({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    plan, P, side, run: sp, paper: '#bdb9a4', ...opts,
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
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#26332f', soft: '#666253',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, one step off the
  // distemper, which says nothing.
  along('w', { y: 0.95, h: 0.46, kind: 'wash', paper: '#2f4a3c' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
