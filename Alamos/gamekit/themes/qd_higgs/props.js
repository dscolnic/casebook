// props.js — the objects and the wall text unique to the collider analysis floor.
//
// The structural half of an interior fit-out lives in
// `engine/world/interiorKit.js`: where a wall has a doorway in it, where a mural
// may be painted, and which way a sliced drawing runs on each side of a corridor.
// What is left here is what makes this a working analysis floor rather than a
// corridor — the wall text, the chain painted along it, and four rooms' fittings.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/** What is on the walls, room by room. Nine parts earnest, one part joke. */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'BADGES', heading: 'Visible above the waist', accent: '#1f4a63',
      body: 'Sign in even if you were here an hour ago. The book is the fire roll and '
        + 'the building is a kilometre long.' },
    { style: 'grid', tag: 'TODAY', heading: 'Collisions recorded', accent: '#1f4a63',
      body: 'Updated every ten minutes. It has never gone down, which somebody should '
        + 'probably look at.' },
    { style: 'list', tag: 'WHERE THINGS ARE', heading: 'This floor', accent: '#5b6a72',
      items: [['West', 'theory, coffee, combination'], ['East', 'calibration, display, histograms'],
        ['Far east', 'reading room'], ['Far west', 'computing store']],
      body: 'The tape robot is two floors down and you do not need to go there.' },
    { style: 'sticky', tag: 'LOST', heading: 'A blue notebook, half full', accent: '#8a6a1e',
      body: 'It has the September energy-scale numbers in it. Please.' },
  ],
  CHART: [
    { style: 'banner', tag: 'READ THE WHOLE SENTENCE', heading: 'Not the first half of it',
      accent: '#3a5f8a',
      body: 'The field is what electroweak symmetry breaking is about. It is not where '
        + 'a proton keeps its mass.' },
    { style: 'chart', tag: 'A PROTON, BY MASS', heading: 'About one per cent is its quarks',
      accent: '#3a5f8a',
      body: 'Nearly all the rest is the energy of the strong force holding them '
        + 'together. Draw this before you say the slogan.' },
    { style: 'grid', tag: 'THE CHART', heading: 'Twelve fermions, four gauge bosons, one empty slot',
      accent: '#3a5f8a', body: 'The empty slot is a scalar slot. That is not filing, it is physics.' },
    { style: 'list', tag: 'MASSES', heading: 'And which are zero', accent: '#5b6a72',
      items: [['Photon', 'zero'], ['Gluon', 'zero'], ['W', '80 GeV'], ['Z', '91 GeV']],
      body: 'Why the first two and not the second two is the whole question.' },
    { style: 'sticky', tag: 'FROM THE PRESS OFFICE', heading: 'Can we just say it gives things mass',
      accent: '#b5502f', body: 'No. Ellis, nine times, in writing.' },
  ],
  EVENT: [
    { style: 'banner', tag: 'NOTHING IS LABELLED', heading: 'The detector does not know either',
      accent: '#c98a2b',
      body: 'Each layer either registered something or did not. An identification is '
        + 'the whole pattern, silences included.' },
    { style: 'list', tag: 'WHAT EACH LAYER SEES', heading: 'Inside out', accent: '#c98a2b',
      items: [['Tracker', 'charged things only'], ['EM layer', 'electrons and photons'],
        ['Hadron layer', 'jets'], ['Muon system', 'what got through']],
      body: 'A photon is an EM shower with no track in front of it. That is the whole test.' },
    { style: 'warning', tag: 'ONE EVENT IS NOT A RESULT', heading: 'However good it looks',
      accent: '#b5502f',
      body: 'Out of a billion collisions something will look extraordinary. You cannot '
        + 'count it, because you chose it after seeing it.' },
    { style: 'grid', tag: 'ISOLATION', heading: 'Why it is on every panel', accent: '#5b6a72',
      body: 'A shower inside a spray of other energy is part of a jet. One standing on '
        + 'its own came from the collision.' },
    { style: 'sticky', tag: 'ON THE DOOR', heading: 'Lights off, and mean it',
      accent: '#8a6a1e', body: 'The screens are calibrated for a dark room. So are eyes.' },
  ],
  HIST: [
    { style: 'banner', tag: 'THE WINDOW STAYS MASKED', heading: 'Until the background is frozen',
      accent: '#7a4fa3',
      body: 'A shape chosen while you can see the window is a shape chosen to fit the '
        + 'window. Fit the sidebands. Freeze. Then look.' },
    { style: 'chart', tag: 'FREEDOM AGAINST SCORE', heading: 'Two curves, going opposite ways',
      accent: '#7a4fa3',
      body: 'More parameters always fit the sidebands better and usually do worse where '
        + 'it matters. That crossing is the whole method.' },
    { style: 'warning', tag: 'WHAT A FLEXIBLE BACKGROUND DOES', heading: 'It eats the signal',
      accent: '#b5502f',
      body: 'A rise underneath the bump and a dip either side, and the excess is now '
        + 'part of the background. Nothing looks wrong afterwards.' },
    { style: 'list', tag: 'IN THE FOLDER', heading: 'Sixteen candidate shapes', accent: '#5b6a72',
      items: [['2 parameters', 'nearly a straight line'], ['4', 'the usual choice'],
        ['8', 'follows a lot'], ['12', 'follows everything']],
      body: 'Initial the one you froze and the date you froze it.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Somebody peeked at the window',
      accent: '#8a6a1e', body: '' },
  ],
  STATS: [
    { style: 'banner', tag: 'WHAT A SIGNIFICANCE SAYS', heading: 'How often background alone would do this',
      accent: '#b5502f',
      body: 'And nothing else. It is not the probability that a theory is true, and no '
        + 'theory entered the calculation.' },
    { style: 'grid', tag: 'THE COMBINATION', heading: 'Two channels, two experiments',
      accent: '#b5502f',
      body: 'Same mass, different backgrounds, different systematics. That is what turns '
        + 'a bump into a result.' },
    { style: 'list', tag: 'WHAT IS MEASURED', heading: 'And what is not', accent: '#3a5f8a',
      items: [['Mass', 'measured'], ['Excess, two channels', 'measured'],
        ['Spin and parity', 'not yet'], ['Couplings', 'not yet']],
      body: 'Any sentence that needs the bottom two lines is a sentence with nothing under it.' },
    { style: 'chart', tag: 'SIGMA TO P-VALUE', heading: 'On the convention this field uses',
      accent: '#5b6a72', body: 'Three sigma is evidence. Five is what gets called discovery.' },
    { style: 'sticky', tag: 'ABOVE THE TELEPHONE', heading: 'Read it out loud before you send it',
      accent: '#b5502f', body: 'If it sounds better than the plots, it is wrong. Gianotti.' },
  ],
  TEA: [
    { style: 'grid', tag: 'BEAM SCHEDULE', heading: 'This week, allegedly', accent: '#1f4a63',
      body: 'Everybody reads it and nobody trusts it. Both of those are correct.' },
    { style: 'sticky', tag: 'THE MACHINE', heading: 'Takes the old coins', accent: '#8a6a1e',
      body: 'There is a jar of them on the shelf. Put your coins in the jar.' },
    { style: 'list', tag: 'GROUP MEETING', heading: 'Thursdays', accent: '#5b6a72',
      items: [['This week', 'Gross, backgrounds'], ['Next', 'Novak, energy scale'],
        ['After', 'the combination']],
      body: 'Ten minutes each and Incandela keeps the clock.' },
  ],
  DARK: [
    { style: 'warning', tag: 'TEST PULSES RUNNING', heading: 'Do not unplug anything',
      accent: '#b5502f', body: 'A calibration run takes six hours and cannot be resumed.' },
    { style: 'sticky', tag: 'THE TABLES', heading: 'Counts to GeV, by run', accent: '#8a6a1e',
      body: 'Use the table for the run the data came from. Not the newest one.' },
  ],
  RACK: [
    { style: 'grid', tag: 'TAPES', heading: 'By run number, not by date', accent: '#5b6a72',
      body: 'Sign for anything that leaves the room. Nothing leaves the building.' },
    { style: 'sticky', tag: 'THE SPARE DISKS', heading: 'Are not spare', accent: '#8a6a1e', body: '' },
  ],
  LIB: [
    { style: 'list', tag: 'ON THE SHELF', heading: 'And who has it out', accent: '#5b6a72',
      items: [['Higgs, 1964', 'Ellis'], ['Englert & Brout, 1964', 'Ellis'],
        ['Statistics for physicists', 'Gross'], ['Detector handbook', 'missing']],
      body: 'Sign the card. There is only one copy of anything.' },
    { style: 'sticky', tag: 'QUIET', heading: 'The only room on the floor that is',
      accent: '#3a5f8a', body: 'The event display is dark, which is a different thing.' },
  ],
};

/** The corridor's own boards. */
const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'ANALYSIS FLOOR', heading: 'Theory west, detectors east',
    accent: '#1f4a63',
    body: 'Theory wall, coffee, combination and computing on your left. Calibration, '
      + 'event display, histograms and the reading room on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected when', accent: '#5b6a72',
    items: [['Mon', 'channels chosen'], ['Tue', 'background frozen'],
      ['Wed', 'combination'], ['Thu', 'group meeting'], ['Fri', 'draft to the collaboration']],
    body: 'Posted Sunday. Not revised, whatever turns up.' },
  { style: 'warning', tag: 'THE WINDOW', heading: 'Masked until the background is frozen',
    accent: '#b5502f', body: 'This applies to everybody, including whoever is reading this.' },
  { style: 'chart', tag: 'ONE EVENT AGAINST A DISTRIBUTION', heading: 'Why the second one is the result',
    accent: '#1f4a63',
    body: 'A spectacular event was chosen after it was seen. A modest excess in the '
      + 'same bin, again, was not.' },
  { style: 'grid', tag: 'FIRE', heading: 'Assembly at the gate', accent: '#b5502f',
    body: 'Left out of the entrance. Not through the display room in the dark.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The corridor lights are on a timer',
    accent: '#8a6a1e', body: 'If it goes dark, walk. It comes back.' },
];

/**
 * The chain painted along the corridor's east wall.
 *
 * Walking the corridor walks one collision from the beam to the sentence. It is in
 * the corridor because no room owns it — the point of the floor's layout is that
 * the chain crosses it twice.
 */
const CHAIN_STATIONS = [
  { title: 'Beam', sub: 'two protons, head on', glyph: 'beam' },
  { title: 'Collision', sub: 'billions a second', glyph: 'globe' },
  { title: 'Layers', sub: 'hits, and silences', glyph: 'grid' },
  { title: 'Objects', sub: 'photon, muon, jet', glyph: 'flask' },
  { title: 'Mass', sub: 'one number per event', glyph: 'ruler' },
  { title: 'Bins', sub: 'every candidate, once', glyph: 'bars' },
  { title: 'Background', sub: 'fitted and frozen', glyph: 'curve' },
  { title: 'Excess', sub: 'in one window only', glyph: 'points' },
  { title: 'Claim', sub: 'and what is still open', glyph: 'column' },
];

/** Fit out one room. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;
  const inX = b.xInner + f * 0.5;

  const FITTINGS = {
    PORCH: ['toolBoard', 'monitorBank'],
    CHART: ['whiteboard', 'whiteboard', 'rack'],
    EVENT: ['monitorBank', 'monitorBank', 'rack', 'toolBoard'],
    HIST:  ['monitorBank', 'whiteboard', 'rack', 'toolBoard'],
    STATS: ['whiteboard', 'monitorBank', 'rack', 'whiteboard'],
    TEA:   ['whiteboard'],
    DARK:  ['rack', 'sampleStore', 'toolBoard'],
    RACK:  ['rack', 'rack', 'cableDrum', 'barrel'],
    LIB:   ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', CHART: 'station', EVENT: 'lab', HIST: 'lab', STATS: 'workroom',
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

  // The event display: two large screens on a stand, facing into a dark room, with
  // a row of desks in front of them. This is the building's silhouette, and it is
  // built here because nothing in the kit is a three-metre screen.
  if(room.id === 'EVENT'){
    const wx = b.xOuter - f * (ctx.P.wall / 2 + 0.06);
    for(const dz of [-2.4, 2.4]){
      box(0.08, 1.9, 3.2, wx, 1.85, b.cz + dz, M.base);
      box(0.03, 1.7, 3.0, wx - f * 0.06, 1.85, b.cz + dz, M.rail);
    }
    for(const dz of [-2.4, 0, 2.4]){
      box(1.5, 0.74, 1.4, b.cx + f * 0.6, 0.37, b.cz + dz, M.frame);
      hard(b.cx + f * 0.6, b.cz + dz, 1.7, 1.6, 0.85);
    }
  }

  // The histogram room's long wall: the distribution itself, printed at wall size,
  // with a masking strip across the search window.
  if(room.id === 'HIST'){
    const wx = b.xOuter - f * (ctx.P.wall / 2 + 0.06);
    box(0.06, 2.3, 10.0, wx, 1.6, b.cz, M.pale ?? M.wall);
    // The bins, as a falling run of bars with one taller than its neighbours.
    for(let i = 0; i < 34; i++){
      const t = i / 33;
      const h = 1.5 * Math.exp(-t * 1.6) + (i === 12 ? 0.28 : 0);
      box(0.04, h, 0.22, wx - f * 0.07, 0.42 + h / 2, b.cz - 4.6 + t * 9.2, M.base);
    }
    // And the masking strip, over the window nobody is allowed to look at yet.
    box(0.05, 2.1, 0.9, wx - f * 0.1, 1.5, b.cz - 4.6 + (12 / 33) * 9.2, M.rail);
  }

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    bounds: {
      x0: b.xInner + f * 2.2, x1: b.xOuter - f * 1.7,
      z0: room.z0 + 0.8, z1: room.z1 - 0.8,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: ctx.P.wall,
    wallOk: roomWallOk(room, b, ctx.plan, ctx.P),
    kind: KIND[room.id] ?? room.kind ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    print: { paper: '#eceff1', ink: '#1b2126', soft: '#68727c', accent: '#1f4a63' },
    seed: `qd_higgs-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.4 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      ...(room.id === 'EVENT' ? [{ x: b.cx + f * 0.6, z: b.cz, r: 3.6 }] : []),
    ],
    target: 17,
  });

  const MURAL = {
    // The distribution, at wall scale and faint enough to be a texture.
    STATS: { kind: 'spectrum', w: 4.8, h: 2.2, ink: '#b5502f' },
    // The chart's own lattice, enormous and quiet.
    CHART: { kind: 'lattice', w: 4.8, h: 2.3, ink: '#3a5f8a' },
    LIB:   { kind: 'wash', w: 4.2, h: 2.1, paper: '#9ea7ae' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      paper: '#aeb6bd',
      ...MURAL,
    });
  }
}

/** Fit out the corridor. */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard } = ctx;
  const sp = plan.spine ?? { z0: -6, z1: 46 };

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: P.corridorHalfWidth,
    wallThickness: P.wall,
    z0: sp.z0, z1: sp.z1,
    seed: 'qd_higgs-spine',
    every: 5,
    signEvery: 3.2,
    signs: CORRIDOR_TEXT,
    hard,
    keepClear: [],
    wallOk: (x, z) => spineWallOk(plan, P, x, z),
  });

  const along = (side, opts) => paintAlongWall({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    plan, P, side, run: sp, paper: '#aeb6bd', ...opts,
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
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#1b2b34', soft: '#68727c',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing.
  along('w', { y: 0.92, h: 0.42, kind: 'wash', paper: '#8f989f' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
