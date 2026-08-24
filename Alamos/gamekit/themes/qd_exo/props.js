// props.js — the objects and the wall text unique to the planet search floor.
//
// The structural half of an interior fit-out lives in
// `engine/world/interiorKit.js`: where a wall has a doorway in it, where a mural
// may be painted, and which way a sliced drawing runs on each side of a corridor.
// What is left here is what makes this a search programme rather than a corridor.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/** What is on the walls, room by room. Nine parts earnest, one part joke. */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'THE PROGRAMME', heading: 'Spectra west, photometry east',
      accent: '#274a4f',
      body: 'Two instruments that share nothing. That is deliberate, and it is why '
        + 'their agreeing on a period is worth anything.' },
    { style: 'list', tag: 'OBSERVING', heading: 'Who is on the mountain', accent: '#5b6a72',
      items: [['Tonight', 'Mayor'], ['Tomorrow', 'Charbonneau'], ['Thursday', 'nobody'],
        ['Friday', 'weather']],
      body: 'Swaps go through Oduya, in writing, before the run starts.' },
    { style: 'grid', tag: 'THE CLOCK', heading: 'Still set to the summit', accent: '#5b6a72',
      body: 'It is four hours behind and it is not going to be changed.' },
    { style: 'sticky', tag: 'LOST', heading: 'A cartridge marked N-19', accent: '#8a6a1e',
      body: 'It has the night the fifth dip should be on it. Please.' },
  ],
  SPEC: [
    { style: 'banner', tag: 'WHAT THIS MEASURES', heading: 'The star, not the planet',
      accent: '#3f7f8f',
      body: 'A thousand lines, measured together, moving by a few parts in ten '
        + 'million. Nothing in this room has ever seen a planet.' },
    { style: 'chart', tag: 'FOLDED', heading: 'One period makes it a curve',
      accent: '#3f7f8f',
      body: 'At the right spacing every cycle lands on every other. At twice it, '
        + 'two humps. At half it, a smear.' },
    { style: 'warning', tag: 'IT IS A MINIMUM', heading: 'Never a mass', accent: '#b5502f',
      body: 'The instrument sees motion along the line of sight only. A heavy '
        + 'companion tilted away looks exactly like a light one edge-on.' },
    { style: 'list', tag: 'WHAT FAKES A WOBBLE', heading: 'And how to tell', accent: '#5b6a72',
      items: [['A second star', 'its own lines'], ['Surface patches', 'line shapes change'],
        ['The instrument', 'no clean period'], ['A planet', 'none of the above']],
      body: 'Rule the first three out before saying the fourth.' },
    { style: 'sticky', tag: 'ON THE DOOR', heading: 'Do not lean on the bench',
      accent: '#8a6a1e', body: 'Nothing here is bolted to anything for a reason.' },
  ],
  PHOT: [
    { style: 'banner', tag: 'ONE DIP IS NOTHING', heading: 'A predicted dip is everything',
      accent: '#c98a2b',
      body: 'Four dips on a schedule could be the schedule. A fifth where you said '
        + 'it would be could not.' },
    { style: 'chart', tag: 'THE FOLDED TRANSIT', heading: 'Flat bottom, three hours wide',
      accent: '#c98a2b',
      body: 'Flat because the planet hides the same area once it is fully on. A '
        + 'pointed bottom is something else.' },
    { style: 'warning', tag: 'CORRECTIONS', heading: 'Use the fewest parameters that work',
      accent: '#b5502f',
      body: 'Cloud, temperature and detector drift all change the brightness by '
        + 'more than a transit. So does a correction with too much freedom.' },
    { style: 'grid', tag: 'DEPTH TO SIZE', heading: 'Take the square root', accent: '#5b6a72',
      body: 'A hundredth of the light is a tenth of the radius. The squaring is why '
        + 'small planets are so hard.' },
    { style: 'tally', tag: 'NIGHTS LOST TO CLOUD', heading: 'This month', accent: '#8a6a1e',
      body: '' },
  ],
  FOLLOW: [
    { style: 'banner', tag: 'THE LIST', heading: 'Everything that makes a dip and is not a planet',
      accent: '#b5502f',
      body: 'A blended eclipsing binary is the good one. Right depth, right shape, '
        + 'perfect schedule, and the light comes from next door.' },
    { style: 'grid', tag: 'WHAT SEPARATES A BLEND', heading: 'Where the light goes',
      accent: '#b5502f',
      body: 'Measure the middle of the light in the image during the dip. If it '
        + 'moves away from the neighbour, the neighbour is the one dimming.' },
    { style: 'list', tag: 'PRECISION IS NOT DECISIVENESS', heading: 'Read this before booking',
      accent: '#5b6a72',
      items: [['More photometry', 'better depth'], ['More spectra', 'better minimum mass'],
        ['A catalogue lookup', 'a neighbour, as usual'], ['Centroid', 'settles it']],
      body: 'Three of those four are careful measurements of the wrong quantity.' },
    { style: 'chart', tag: 'VALIDATED, NOT CONFIRMED', heading: 'The impostors we thought of',
      accent: '#5b6a72',
      body: 'This list is finite and the universe is not. Say validated.' },
    { style: 'sticky', tag: 'ABOVE THE SCHEDULE', heading: 'April is no use to a February paper',
      accent: '#8a6a1e', body: 'Oduya. Underlined twice.' },
  ],
  CLASS: [
    { style: 'banner', tag: 'NEITHER ALONE', heading: 'A mass and a size, or nothing',
      accent: '#7a4fa3',
      body: 'The wobble gives one, the transit gives the other, and only their '
        + 'ratio says what the thing is built from.' },
    { style: 'chart', tag: 'DENSITY', heading: 'Mass over radius cubed', accent: '#7a4fa3',
      body: 'Rock is four times Jupiter. Iron is nearly ten. Anything below '
        + 'Jupiter cannot be rock at any mass.' },
    { style: 'grid', tag: 'THE TILT', heading: 'A transit is a statement about geometry',
      accent: '#7a4fa3',
      body: 'It only happens within a few degrees of edge-on, which is what turns '
        + 'a minimum mass into a mass.' },
    { style: 'list', tag: 'ON THE SHEET', heading: 'And what is not', accent: '#5b6a72',
      items: [['Period', 'measured'], ['Mass', 'measured, once the tilt is fixed'],
        ['Radius', 'measured'], ['Atmosphere', 'not measured']],
      body: 'A class quoted without the four is a label.' },
    { style: 'sticky', tag: 'PINNED', heading: 'Most of them never transit',
      accent: '#b5502f', body: 'Ferrand. It is on the wall because people forget it.' },
  ],
  TEA: [
    { style: 'grid', tag: 'SUMMIT WEATHER', heading: 'Printed every hour', accent: '#274a4f',
      body: 'Read it before you plan a night. Believe it about half the time.' },
    { style: 'sticky', tag: 'THE KETTLE', heading: 'Fill it at the sink, not the fountain',
      accent: '#8a6a1e', body: 'The fountain water furs it up in a fortnight.' },
    { style: 'list', tag: 'GROUP MEETING', heading: 'Wednesdays', accent: '#5b6a72',
      items: [['This week', 'the fifth dip'], ['Next', 'the centroid result'],
        ['After', 'the paper']],
      body: 'Ten minutes each. Ferrand keeps the clock.' },
  ],
  DARK: [
    { style: 'warning', tag: 'CARTRIDGES', heading: 'Ordered by night, not by candidate',
      accent: '#b5502f', body: 'Reordering them has cost a week before now.' },
    { style: 'sticky', tag: 'THE DRIVE', heading: 'Wait for the light to go out',
      accent: '#8a6a1e', body: 'It is slower than you are. It is also the only one.' },
  ],
  RACK: [
    { style: 'grid', tag: 'STORE', heading: 'Drives, lamps, spares', accent: '#5b6a72',
      body: 'Sign for the calibration lamps. They are matched pairs and they do not '
        + 'come singly.' },
    { style: 'sticky', tag: 'THE CRATE', heading: 'Is the new detector', accent: '#8a6a1e',
      body: 'It has been the new detector since March.' },
  ],
  LIB: [
    { style: 'list', tag: 'ON LOAN', heading: 'And to whom', accent: '#5b6a72',
      items: [['Bright star catalogue', 'Mayor'], ['Finding charts, north', 'Charbonneau'],
        ['False positives review', 'Haraldsson'], ['Planet tables', 'missing']],
      body: 'Sign the card inside the front cover.' },
    { style: 'sticky', tag: 'QUIET', heading: 'And the chair with the lamp',
      accent: '#274a4f', body: 'Not reserved. Always taken.' },
  ],
};

/** The corridor's own boards. */
const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'PLANET SEARCH', heading: 'Spectra west, photometry east',
    accent: '#274a4f',
    body: 'Spectrograph, coffee, characterisation and the store on your left. Tape '
      + 'room, photometry, validation and the reading room on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected when', accent: '#5b6a72',
    items: [['Mon', 'the wobble closed'], ['Tue', 'the fifth dip predicted'],
      ['Wed', 'the centroid booked'], ['Thu', 'a class on the sheet'],
      ['Fri', 'draft']],
    body: 'Posted Sunday and not revised.' },
  { style: 'warning', tag: 'IT IS A MINIMUM MASS', heading: 'Until something fixes the tilt',
    accent: '#b5502f', body: 'This applies to every candidate on the board.' },
  { style: 'chart', tag: 'TWO INSTRUMENTS, ONE PERIOD', heading: 'Sharing no detector and no site',
    accent: '#274a4f',
    body: 'That is the strong part of the result, and it is a property of the floor '
      + 'plan as much as of the data.' },
  { style: 'grid', tag: 'FIRE', heading: 'Assembly at the car park', accent: '#b5502f',
    body: 'Left out of the entrance. Not through the tape room.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The corridor lights are on a timer',
    accent: '#8a6a1e', body: 'If it goes dark, keep walking. It comes back.' },
];

/**
 * The chain painted along the corridor's east wall.
 *
 * Walking the corridor walks the detection: a star that looks ordinary, a shift
 * too small to see, a period, a dip, a size, a mass, a name. It is in the
 * corridor because no room owns it and the whole point is that it crosses.
 */
const CHAIN_STATIONS = [
  { title: 'Star', sub: 'ordinary, in every image', glyph: 'globe' },
  { title: 'Lines', sub: 'a thousand, together', glyph: 'grid' },
  { title: 'Shift', sub: 'parts in ten million', glyph: 'wave' },
  { title: 'Period', sub: 'found by folding', glyph: 'curve' },
  { title: 'Dip', sub: 'a hundredth, three hours', glyph: 'points' },
  { title: 'Radius', sub: 'the square root of it', glyph: 'ruler' },
  { title: 'Tilt', sub: 'fixed by the transit', glyph: 'beam' },
  { title: 'Density', sub: 'mass over radius cubed', glyph: 'bars' },
  { title: 'Class', sub: 'four measurements at once', glyph: 'column' },
];

/** Fit out one room. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;
  const inX = b.xInner + f * 0.5;

  const FITTINGS = {
    PORCH:  ['toolBoard', 'monitorBank'],
    SPEC:   ['monitorBank', 'rack', 'toolBoard', 'sampleStore'],
    PHOT:   ['monitorBank', 'monitorBank', 'rack', 'whiteboard'],
    FOLLOW: ['whiteboard', 'whiteboard', 'rack'],
    CLASS:  ['whiteboard', 'monitorBank', 'rack'],
    TEA:    ['whiteboard'],
    DARK:   ['rack', 'rack', 'sampleStore'],
    RACK:   ['rack', 'rack', 'barrel', 'cableDrum'],
    LIB:    ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', SPEC: 'lab', PHOT: 'lab', FOLLOW: 'workroom', CLASS: 'station',
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

  // The spectrograph itself: a bench-mounted box in a temperature-controlled
  // enclosure, with the fibre coming in at one end. Nothing in this room is
  // bolted to the building, because a spectrograph that can feel the floor is a
  // spectrograph that measures the floor.
  if(room.id === 'SPEC'){
    const cx = b.cx + f * 1.6;
    box(2.6, 1.5, 1.6, cx, 0.75, b.cz, M.base);              // the enclosure
    box(2.2, 0.1, 1.2, cx, 1.55, b.cz, M.rail);              // the lid
    // The fibre run comes in along the top of the enclosure rather than floating
    // beside it. The first version hung it in mid-air a metre off the case, which
    // is what `placement.mjs` reports as a loose piece supported by nothing.
    box(0.12, 0.12, 1.4, cx - f * 1.0, 1.62, b.cz, M.rail);
    hard(cx, b.cz, 2.9, 1.9, 1.7);
  }

  // The photometry room's long wall: a month of light curve at a metre a night,
  // with dips in it on a regular spacing. This is the building's silhouette.
  if(room.id === 'PHOT'){
    const wx = b.xOuter - f * (ctx.P.wall / 2 + 0.06);
    box(0.06, 1.9, 11.0, wx, 1.55, b.cz, M.pale ?? M.wall);
    // The trace, as a run of short segments, with a notch every 4.2 metres.
    for(let i = 0; i < 54; i++){
      const t = i / 53;
      const z = b.cz - 5.2 + t * 10.4;
      const dip = ((i + 3) % 11 === 0) ? -0.22 : 0;
      box(0.03, 0.05, 0.2, wx - f * 0.07, 1.75 + dip + Math.sin(i * 2.1) * 0.02, z, M.base);
    }
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
    print: { paper: '#e9e4da', ink: '#221e1a', soft: '#6b6255', accent: '#274a4f' },
    seed: `qd_exo-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.4 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      ...(room.id === 'SPEC' ? [{ x: b.cx + f * 1.6, z: b.cz, r: 2.6 }] : []),
    ],
    target: 17,
  });

  const MURAL = {
    // A folded velocity curve, at wall scale and faint enough to be a texture.
    SPEC:  { kind: 'spectrum', w: 4.8, h: 2.2, ink: '#3f7f8f' },
    CLASS: { kind: 'lattice', w: 4.6, h: 2.2, ink: '#7a4fa3' },
    LIB:   { kind: 'wash', w: 4.2, h: 2.1, paper: '#a79c90' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      paper: '#b6ada2',
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
    seed: 'qd_exo-spine',
    every: 5,
    signEvery: 3.2,
    signs: CORRIDOR_TEXT,
    hard,
    keepClear: [],
    wallOk: (x, z) => spineWallOk(plan, P, x, z),
  });

  const along = (side, opts) => paintAlongWall({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    plan, P, side, run: sp, paper: '#b6ada2', ...opts,
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
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#25332f', soft: '#6b6255',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing.
  along('w', { y: 0.92, h: 0.42, kind: 'wash', paper: '#8f8578' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
