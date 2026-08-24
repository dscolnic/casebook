// props.js — the objects and the wall text unique to the mountain observatory.
//
// The structural half of an interior fit-out lives in
// `engine/world/interiorKit.js`: where a wall has a doorway in it, where a mural
// may be painted, and which way a sliced drawing runs on each side of a corridor.
// What is left here is what makes this a 1920s observatory rather than a corridor.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/** What is on the walls, room by room. Nine parts earnest, one part joke. */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'THE FLOOR', heading: 'Plates west, spectra east',
      accent: '#2e3d48',
      body: 'Plate vault and the diagram room on your left. Darkroom, spectrograph '
        + 'and the ladder desk on your right.' },
    { style: 'grid', tag: 'SEEING', heading: 'Chalked at dusk and again at midnight',
      accent: '#2e3d48',
      body: 'If it says four or worse, the long exposures are off and nobody is to '
        + 'blame for it.' },
    { style: 'list', tag: 'TONIGHT', heading: 'Who is on what', accent: '#5b6a72',
      items: [['Spectrograph', 'Slipher'], ['Direct plates', 'Humason'],
        ['Measuring', 'Leavitt'], ['Nobody', 'the ladder desk']],
      body: 'Swaps go in the book, not by word of mouth.' },
    { style: 'sticky', tag: 'THE CLOCK', heading: 'Is on sidereal time', accent: '#8a6a1e',
      body: 'It is not wrong. Do not set it to the wireless.' },
  ],
  PLATES: [
    { style: 'banner', tag: 'THE RULE', heading: 'Grade the star before you measure it',
      accent: '#8a6a1e',
      body: 'Crowded, saturated, or photographed once — three kinds of useless, and '
        + 'each one fails in its own direction.' },
    { style: 'chart', tag: 'PERIOD AND BRIGHTNESS', heading: 'The slow ones are the bright ones',
      accent: '#8a6a1e',
      body: 'Which is the whole ladder, and the relation was somebody else\'s work '
        + 'before it was ours.' },
    { style: 'warning', tag: 'CROWDING', heading: 'Makes a star look nearer', accent: '#b5502f',
      body: 'Extra light from a neighbour is a bias and not scatter. It does not '
        + 'average away over many galaxies.' },
    { style: 'grid', tag: 'THE DRAWERS', heading: 'By field, then by date', accent: '#5b6a72',
      body: 'Glass back in its own sleeve, sleeve back in its own drawer. A plate in '
        + 'the wrong drawer is a plate that is gone.' },
    { style: 'tally', tag: 'PLATES BROKEN', heading: 'Since the vault opened', accent: '#8a6a1e',
      body: '' },
  ],
  SPEC: [
    { style: 'banner', tag: 'ONE LINE IS AN IDENTIFICATION', heading: 'Several agreeing is a redshift',
      accent: '#3f7f8f',
      body: 'A feature at an odd wavelength could always be a different feature at '
        + 'rest. A whole set shifted by the same fraction could not.' },
    { style: 'warning', tag: 'THE TABLE', heading: 'Is not a measurement', accent: '#b5502f',
      body: 'Expected wavelengths are somebody else\'s compilation. Anything measured '
        + 'against it inherits whatever is wrong with it.' },
    { style: 'grid', tag: 'EXPOSURES', heading: 'Several nights for one nebula',
      accent: '#3f7f8f',
      body: 'Guide it by hand and log the interruptions. An exposure with no log is a '
        + 'plate of unknown length.' },
    { style: 'list', tag: 'COMPARISON LAMPS', heading: 'On the shelf, matched', accent: '#5b6a72',
      items: [['Iron arc', 'wavelengths direct'], ['Neon', 'wavelengths direct'],
        ['The table', 'expected only'], ['Guess', 'no']],
      body: 'Use a lamp where you can. Use the table where you must, and say so.' },
    { style: 'sticky', tag: 'ON THE PIER', heading: 'Do not lean on it', accent: '#8a6a1e',
      body: 'It is a separate pier for a reason and the reason is you.' },
  ],
  LADDER: [
    { style: 'banner', tag: 'A DISTANCE INHERITS EVERYTHING', heading: 'In the brightness it came from',
      accent: '#b5502f',
      body: 'The arithmetic cannot see a bad input, and nothing about the calculation '
        + 'looks wrong afterwards.' },
    { style: 'chart', tag: 'ERROR BUDGET', heading: 'Width times the power it enters at',
      accent: '#b5502f',
      body: 'Ranking by power is quick and wrong whenever a badly known term enters '
        + 'at first order.' },
    { style: 'grid', tag: 'WHICH AXIS IS WORSE', heading: 'The distances, by a long way',
      accent: '#5b6a72',
      body: 'Redshifts are good to a per cent or two. The ladder is not, and a slope '
        + 'inherits its worse axis whole.' },
    { style: 'list', tag: 'THE FIRST RUNG', heading: 'And who established it', accent: '#2e3d48',
      items: [['Period-luminosity', 'Leavitt'], ['Calibrating distances', 'others'],
        ['Everything above it', 'inherits it'], ['If it is wrong', 'all of it is']],
      body: 'This is on the wall because it is the least celebrated part of the ladder.' },
    { style: 'sticky', tag: 'PENCIL, NOT INK', heading: 'The budget changes weekly',
      accent: '#8a6a1e', body: 'Anybody inking it in has stopped believing it.' },
  ],
  DIAGRAM: [
    { style: 'banner', tag: 'TWO AXES, TWO ROOMS', heading: 'A line is a claim about both',
      accent: '#7a4fa3',
      body: 'Distances from the vault, speeds from the spectrograph, different '
        + 'people and different nights. The line joins them.' },
    { style: 'chart', tag: 'THROUGH THE ORIGIN', heading: 'A galaxy at no distance is not receding',
      accent: '#7a4fa3',
      body: 'Fit an intercept anyway as a check. A large one means something is wrong '
        + 'with an axis.' },
    { style: 'grid', tag: 'SCATTER NEARBY', heading: 'Is not the fit failing', accent: '#5b6a72',
      body: 'A few hundred kilometres a second of a galaxy\'s own motion is most of '
        + 'the recession nearby and almost none of it far out.' },
    { style: 'list', tag: 'WHO IS OWED WHAT', heading: 'Pinned by the theory desk', accent: '#2e3d48',
      items: [['Most of the redshifts', 'a decade, elsewhere'],
        ['An expanding solution', 'published 1927'],
        ['The distance relation', 'Leavitt'],
        ['This plot', 'a synthesis']],
      body: 'Farouk put this up. Nobody has taken it down.' },
    { style: 'sticky', tag: 'THE STRAIGHTEDGE', heading: 'Pivots at the origin, on purpose',
      accent: '#8a6a1e', body: 'If you have moved the pivot, put it back.' },
  ],
  TEA: [
    { style: 'grid', tag: 'THE STOVE', heading: 'Lit at dusk, out by dawn', accent: '#2e3d48',
      body: 'Whoever is last down the mountain closes the damper.' },
    { style: 'sticky', tag: 'THE ROTA', heading: 'Has been amended by hand', accent: '#8a6a1e',
      body: 'By four people. In three colours. Ask before you rely on it.' },
    { style: 'list', tag: 'COLLOQUIUM', heading: 'Fridays, when the moon is up',
      accent: '#5b6a72',
      items: [['This week', 'Farouk, on what it means'], ['Next', 'the slope'],
        ['After', 'the paper']],
      body: 'Bring your own chair. These do not leave.' },
  ],
  DARK: [
    { style: 'warning', tag: 'RED LAMP ONLY', heading: 'And the door stays shut', accent: '#b5502f',
      body: 'Several nights of exposure, one second of white light.' },
    { style: 'sticky', tag: 'THE LINE', heading: 'Is for prints', accent: '#8a6a1e', body: '' },
  ],
  RACK: [
    { style: 'grid', tag: 'UNEXPOSED', heading: 'Sealed, and cold', accent: '#5b6a72',
      body: 'Take from the front of the box. Sign for a plate holder.' },
    { style: 'sticky', tag: 'THE CRATE', heading: 'Is the new grating', accent: '#8a6a1e',
      body: 'It has been the new grating since the spring.' },
  ],
  LIB: [
    { style: 'list', tag: 'ON LOAN', heading: 'And to whom', accent: '#5b6a72',
      items: [['Plate catalogue', 'Humason'], ['Slipher, 1917', 'Slipher'],
        ['Lemaitre, 1927', 'Farouk'], ['Leavitt, 1912', 'missing']],
      body: 'Sign the card inside the front cover. The last line is not a joke.' },
    { style: 'sticky', tag: 'THE LAMP', heading: 'Works at this desk only',
      accent: '#2e3d48', body: 'Which is why this desk is always taken.' },
  ],
};

/** The corridor's own boards. */
const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'OBSERVATORY', heading: 'Plates west, spectra east',
    accent: '#2e3d48',
    body: 'Plate vault, common room, diagram room and the store on your left. '
      + 'Darkroom, spectrograph, ladder desk and the library on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected when', accent: '#5b6a72',
    items: [['Mon', 'distances graded'], ['Tue', 'redshifts closed'],
      ['Wed', 'a slope on the wall'], ['Thu', 'the units'], ['Fri', 'colloquium']],
    body: 'Posted Sunday and amended by everybody.' },
  { style: 'warning', tag: 'RED LAMP', heading: 'The darkroom door stays shut',
    accent: '#b5502f', body: 'Several nights of exposure. One second of light.' },
  { style: 'chart', tag: 'THE WORSE AXIS', heading: 'Is always the distances',
    accent: '#2e3d48',
    body: 'A slope inherits it whole, and every early value of this one was wrong '
      + 'for exactly that reason.' },
  { style: 'grid', tag: 'FIRE', heading: 'Assembly at the dome road', accent: '#b5502f',
    body: 'Out of the entrance and downhill. Not through the plate vault.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'Carry glass in two hands',
    accent: '#8a6a1e', body: 'The tally in the vault is high enough.' },
];

/**
 * The chain painted along the corridor's east wall.
 *
 * Walking the corridor walks a nebula from a photographic plate to a claim about
 * the whole universe. It is in the corridor because the two halves of it are
 * measured on opposite sides of it.
 */
const CHAIN_STATIONS = [
  { title: 'Nebula', sub: 'faint, on glass', glyph: 'globe' },
  { title: 'Variable', sub: 'a cycle to time', glyph: 'wave' },
  { title: 'Brightness', sub: 'emitted, and arriving', glyph: 'flask' },
  { title: 'Distance', sub: 'in megaparsecs', glyph: 'ruler' },
  { title: 'Spectrum', sub: 'nights of exposure', glyph: 'column' },
  { title: 'Lines', sub: 'all shifted alike', glyph: 'grid' },
  { title: 'Speed', sub: 'a fraction of light', glyph: 'beam' },
  { title: 'Plot', sub: 'two rooms, one point', glyph: 'points' },
  { title: 'Slope', sub: 'per megaparsec', glyph: 'curve' },
  { title: 'Time', sub: 'one over the slope', glyph: 'bars' },
];

/** Fit out one room. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;
  const inX = b.xInner + f * 0.5;

  const FITTINGS = {
    PORCH:   ['toolBoard'],
    PLATES:  ['rack', 'rack', 'sampleStore', 'toolBoard'],
    SPEC:    ['rack', 'pumpSet', 'toolBoard', 'gasCylinder'],
    LADDER:  ['whiteboard', 'rack', 'toolBoard'],
    DIAGRAM: ['whiteboard', 'whiteboard', 'rack'],
    TEA:     ['whiteboard'],
    DARK:    ['sampleStore', 'barrel', 'rack'],
    RACK:    ['rack', 'rack', 'barrel'],
    LIB:     ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', PLATES: 'lab', SPEC: 'lab', LADDER: 'workroom', DIAGRAM: 'station',
    TEA: 'waiting', DARK: 'supply', RACK: 'supply', LIB: 'quiet',
  };

  switch(room.kind){
    case 'reception':
      box(1.0, 1.05, 3.2, inX + f * 1.9, 0.525, b.cz - 0.4, M.frame);
      hard(inX + f * 1.9, b.cz - 0.4, 1.2, 3.4, 1.1);
      break;
    case 'workroom':
    case 'lab':
    case 'station':
      box(0.62, 0.9, 3.0, inX + f * 0.95, 0.45, b.cz, M.frame);
      hard(inX + f * 0.95, b.cz, 0.8, 3.2, 0.95);
      break;
    default:
      break;
  }

  // The plate vault's drawers: a run of shallow cabinets along the outer wall,
  // which is what years of glass actually looks like and is the one thing in the
  // kit that has no equivalent.
  if(room.id === 'PLATES'){
    const wx = b.xOuter - f * 0.9;
    for(let i = 0; i < 5; i++){
      const z = room.z0 + 2.0 + i * 2.4;
      box(1.4, 2.1, 2.2, wx, 1.05, z, M.frame);
      for(let d = 0; d < 7; d++){
        box(0.05, 0.06, 2.0, wx - f * 0.72, 0.35 + d * 0.28, z, M.base);
      }
      hard(wx, z, 1.6, 2.3, 2.1);
    }
    // The blink comparator, which is the room's own instrument.
    box(1.1, 0.8, 1.6, b.cx - f * 0.4, 0.4, b.cz - 1.4, M.frame);
    box(0.34, 0.5, 0.34, b.cx - f * 0.4, 1.05, b.cz - 1.4, M.rail);
    hard(b.cx - f * 0.4, b.cz - 1.4, 1.4, 1.8, 1.4);
  }

  // The spectrograph on its own pier, and the telescope feed coming down to it.
  if(room.id === 'SPEC'){
    const cx = b.cx + f * 1.6;
    box(1.4, 1.0, 1.4, cx, 0.5, b.cz, M.base);              // the pier
    box(0.9, 0.7, 2.6, cx, 1.35, b.cz, M.rail);             // the instrument
    box(0.28, 1.6, 0.28, cx, 2.5, b.cz - 1.4, M.rail);      // the feed coming down
    hard(cx, b.cz, 1.6, 2.8, 1.8);
  }

  // The diagram room's plot: one large framed sheet on the outer wall, with the
  // points inked on it and a straightedge pivoted at the origin.
  if(room.id === 'DIAGRAM'){
    const wx = b.xOuter - f * (ctx.P.wall / 2 + 0.06);
    box(0.07, 2.4, 6.4, wx, 1.6, b.cz, M.pale ?? M.wall);
    box(0.05, 2.6, 6.6, wx + f * 0.01, 1.6, b.cz, M.base);
    // Eleven points climbing across it, and the line they climb along.
    for(let i = 0; i < 11; i++){
      const t = (i + 0.5) / 11;
      const jitter = (i < 4 ? (i % 2 ? 0.18 : -0.14) : (i % 2 ? 0.05 : -0.04));
      box(0.03, 0.09, 0.09, wx - f * 0.08, 0.65 + t * 1.7 + jitter, b.cz - 2.9 + t * 5.8, M.base);
    }
    const rule = box(0.04, 0.05, 6.0, wx - f * 0.12, 1.5, b.cz, M.rail);
    rule.rotation.x = 0.28;
  }

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    bounds: {
      x0: b.xInner + f * 2.2, x1: b.xOuter - f * 1.9,
      z0: room.z0 + 0.8, z1: room.z1 - 0.8,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: ctx.P.wall,
    wallOk: roomWallOk(room, b, ctx.plan, ctx.P),
    kind: KIND[room.id] ?? room.kind ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    print: { paper: '#e7e0cb', ink: '#241f18', soft: '#6c6350', accent: '#2e3d48' },
    seed: `qd_hubble-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.4 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      ...(room.id === 'SPEC' ? [{ x: b.cx + f * 1.6, z: b.cz, r: 2.6 }] : []),
      ...(room.id === 'PLATES' ? [{ x: b.cx - f * 0.4, z: b.cz - 1.4, r: 1.8 }] : []),
    ],
    target: 16,
  });

  const MURAL = {
    PLATES:  { kind: 'spectrum', w: 4.4, h: 2.1, ink: '#8a6a1e' },
    LADDER:  { kind: 'lattice', w: 4.4, h: 2.1, ink: '#b5502f' },
    LIB:     { kind: 'wash', w: 4.0, h: 2.0, paper: '#a89b80' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.9, z: b.cz, faceX: true, toward: -f,
      paper: '#c0b49b',
      ...MURAL,
    });
  }
}

/** Fit out the corridor. */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard } = ctx;
  const sp = plan.spine ?? { z0: -6, z1: 44 };

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: P.corridorHalfWidth,
    wallThickness: P.wall,
    z0: sp.z0, z1: sp.z1,
    seed: 'qd_hubble-spine',
    every: 5,
    signEvery: 3.2,
    signs: CORRIDOR_TEXT,
    hard,
    keepClear: [],
    wallOk: (x, z) => spineWallOk(plan, P, x, z),
  });

  const along = (side, opts) => paintAlongWall({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    plan, P, side, run: sp, paper: '#c0b49b', ...opts,
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
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#2a2c24', soft: '#6c6350',
    text: { stations: CHAIN_STATIONS } });

  // And a painted dado band along the west wall, one step off the distemper.
  along('w', { y: 0.98, h: 0.48, kind: 'wash', paper: '#3a3a30' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
