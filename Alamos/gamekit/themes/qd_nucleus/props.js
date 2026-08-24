// props.js — the objects and the wall text unique to the scattering laboratory.
//
// Anything generic (benches, chairs, racks, notice boards, shelving) comes from
// engine/world/interiorKit.js, and so does the whole structural half of this file
// — where a wall has a doorway in it, where a mural may be painted, which way a
// sliced drawing runs on each side of a corridor. What is left here is what makes
// this building 1910 Manchester rather than a corridor: the wall text, the chain
// painted along it, and four rooms' worth of fittings.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * Nine parts earnest, one part joke per room. None of it is on the syllabus and
 * none of it is checked; all of it has to land at 1.4 m/s.
 */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'VISITORS', heading: 'Sign the book', accent: '#3a5a44',
      body: 'The book is the fire roll. Sign out as well as in. Nobody opens the '
        + 'chamber room while the red lamp is lit.' },
    { style: 'list', tag: 'THE BUILDING', heading: 'Which side is which', accent: '#5b6a72',
      items: [['West', 'source, bench, chamber'], ['East', 'dark room, counting'],
        ['East, far', 'the professor'], ['West, far', 'tea and the store']],
      body: 'Apparatus on one side, arithmetic on the other. That is deliberate.' },
    { style: 'warning', tag: 'RADIUM', heading: 'The source stays in the lead pot',
      accent: '#b5502f',
      body: 'It is moved with the tongs and it is moved by Marsden. If the pot is open '
        + 'and nobody is standing at the bench, shut it.' },
    { style: 'sticky', tag: 'LOST', heading: 'One pair of dark goggles', accent: '#8a6a1e',
      body: 'Whoever has them is not dark-adapting, they are just walking round in the dark.' },
  ],
  BENCH: [
    { style: 'banner', tag: 'WHY THE HOLE MATTERS', heading: 'An angle needs a starting direction',
      accent: '#8a6a1e',
      body: 'Without the collimator a particle arriving ten degrees off might have set '
        + 'off that way. With it, every angle at the far end was acquired at the leaf.' },
    { style: 'grid', tag: 'THE LEAF', heading: 'Beaten to about four hundred atoms',
      accent: '#8a6a1e',
      body: 'Thinner is better and thinner tears. Four hundred is the compromise, and '
        + 'most particles cross it meeting one atom or none.' },
    { style: 'chart', tag: 'BEAM WIDTH', heading: 'Against source distance', accent: '#5b6a72',
      body: 'Brighter beam, wider beam, worse angle. Every run is somewhere on this curve.' },
    { style: 'list', tag: 'BEFORE EVERY RUN', heading: 'In this order', accent: '#3a5a44',
      items: [['1', 'source in the pot, tongs only'], ['2', 'collimator bore clear'],
        ['3', 'leaf mounted and unbroken'], ['4', 'chamber pumped'],
        ['5', 'prediction sheet dated']],
      body: 'The last one is not paperwork. Ask the professor.' },
    { style: 'sticky', tag: 'ON THE LEAF PRESS', heading: 'Do not breathe on it', accent: '#8a6a1e',
      body: 'This is not a joke and it has cost two afternoons.' },
  ],
  CHAMBER: [
    { style: 'banner', tag: 'THE MEASUREMENT', heading: 'The screen moves, the axis does not',
      accent: '#3f6f8f',
      body: 'The quantity is the angle, so the detector has to reach any angle while '
        + 'everything that defines the beam stays exactly where it is.' },
    { style: 'warning', tag: 'PUMP DOWN FIRST', heading: 'Air scatters too', accent: '#b5502f',
      body: 'Above about a twentieth of a millimetre of mercury, a fair share of what '
        + 'you count is the air rather than the gold.' },
    { style: 'grid', tag: 'ANGLE PLATE', heading: 'Checked against the jig on Mondays',
      accent: '#3f6f8f',
      body: 'An arm a degree out is a run whose every bin is shifted the same way, '
        + 'and nothing in the counts will tell you.' },
    { style: 'chart', tag: 'WHERE THE FLASHES ARE', heading: 'Almost all of them under five degrees',
      accent: '#5b6a72',
      body: 'And a few past ninety, which is the part of this chart nobody ordered.' },
    { style: 'sticky', tag: 'NOTE', heading: 'It came back at me', accent: '#b5502f',
      body: 'Geiger, at the eyepiece, at half past one in the morning. Left up on purpose.' },
  ],
  COUNT: [
    { style: 'banner', tag: 'TWENTY MINUTES', heading: 'Before you see anything at all',
      accent: '#7a4fa3',
      body: 'Sit in the dark room first. An eye that has just seen a lamp will miss '
        + 'a third of the flashes and will not know it has.' },
    { style: 'list', tag: 'THE RULE OF TWO', heading: 'Every bin that matters', accent: '#7a4fa3',
      items: [['Observer A', 'first half hour'], ['Observer B', 'second half hour'],
        ['Both', 'the bin past ninety'], ['Neither', 'after ninety minutes']],
      body: 'The same eye counts differently when it is tired. Two counts show the drift.' },
    { style: 'grid', tag: 'IN THE BOOK', heading: 'Count, angle, time, initials',
      accent: '#5b6a72',
      body: 'A count with no watching time beside it cannot be turned into a share of '
        + 'the beam, which makes it worth nothing next door.' },
    { style: 'chart', tag: 'HOW STEADY IS IT', heading: 'A count of ten is ten give or take three',
      accent: '#8a6a1e',
      body: 'Scatter falls as the square root of the count. That is why the small bins '
        + 'take most of the night.' },
    { style: 'tally', tag: 'HOURS AT THE EYEPIECE', heading: 'This week', accent: '#5b6a72',
      body: '' },
  ],
  STUDY: [
    { style: 'banner', tag: 'THE RULE OF THIS ROOM', heading: 'Predict first, in a number',
      accent: '#b5502f',
      body: 'A model that has not said what it expects cannot be wrong, and a model '
        + 'that cannot be wrong is not being tested.' },
    { style: 'grid', tag: 'THREE CANDIDATE ATOMS', heading: 'Chalked, dated, undecided',
      accent: '#b5502f',
      body: 'Charge spread through the volume. A hard shell at the outside. All of it '
        + 'in one small central region.' },
    { style: 'chart', tag: 'MONDAY\'S PREDICTION', heading: 'Nothing past a fifth of a degree',
      accent: '#5b6a72',
      body: 'Four hundred atoms, a hundredth of a degree each, and random directions. '
        + 'Signed before the shutter opened.' },
    { style: 'list', tag: 'WHAT IS SETTLED', heading: 'And what is not', accent: '#3a5a44',
      items: [['Where the charge is', 'nearly'], ['How big it is', 'an upper bound'],
        ['What holds the electrons up', 'no idea'], ['Why the atom is stable', 'no idea']],
      body: 'The last two lines are not being hidden. They are the next problem.' },
    { style: 'sticky', tag: 'PINNED OVER THE DOOR', heading: 'Ninety-nine per cent agreement is not evidence',
      accent: '#b5502f', body: 'Undated. Nobody has taken it down.' },
  ],
  DARK: [
    { style: 'warning', tag: 'NO LAMPS', heading: 'None. Not a match either', accent: '#b5502f',
      body: 'Twenty minutes wasted for everybody in the room, not just for you.' },
    { style: 'sticky', tag: 'THE CHAIRS', heading: 'Are for sitting in and waiting', accent: '#8a6a1e',
      body: 'There is nothing else to do in here. That is what the room is.' },
  ],
  TEA: [
    { style: 'list', tag: 'COUNTING ROTA', heading: 'This week', accent: '#5b6a72',
      items: [['Mon', 'Kowalczyk, Aitken'], ['Tue', 'Kowalczyk, Bhatt'],
        ['Wed', 'Aitken, Marsden'], ['Thu', 'anybody'], ['Fri', 'nobody, historically']],
      body: 'Ninety minutes maximum at the eyepiece. After that you are guessing.' },
    { style: 'sticky', tag: 'THE URN', heading: 'Off at the wall', accent: '#8a6a1e',
      body: 'The switch on the urn does nothing. It has never done anything.' },
    { style: 'grid', tag: 'COLLOQUIUM', heading: 'Thursday, four o\'clock', accent: '#3a5a44',
      body: 'In here, because the lecture theatre is being repainted. Bring a chair.' },
  ],
  RACK: [
    { style: 'grid', tag: 'STOCK', heading: 'Brass, lead sheet, spare screens', accent: '#5b6a72',
      body: 'Sign for the lead. Zinc-sulfide screens are made up on Fridays and they '
        + 'do not keep.' },
    { style: 'sticky', tag: 'THE PUMP OIL', heading: 'Is not the microscope oil', accent: '#8a6a1e',
      body: '' },
  ],
  LIB: [
    { style: 'list', tag: 'ON LOAN', heading: 'And to whom', accent: '#5b6a72',
      items: [['Thomson, 1904', 'Rutherford'], ['Bragg, 1906', 'Geiger'],
        ['Handbook of tables', 'Aitken'], ['Kelvin, 1901', 'missing']],
      body: 'Sign the card inside the front cover.' },
    { style: 'sticky', tag: 'QUIET', heading: 'The only room that is quiet and lit',
      accent: '#3a5a44', body: 'The other quiet room is the dark room, which is not the same thing.' },
  ],
};

/** The corridor's own boards: wayfinding, and the week's argument. */
const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'THE LABORATORY', heading: 'Apparatus west, arithmetic east',
    accent: '#3a5a44',
    body: 'Bench and chamber on your left. Dark room, counting and the professor '
      + 'on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected when', accent: '#5b6a72',
    items: [['Mon', 'prediction signed'], ['Tue', 'counts to a hundred and fifty'],
      ['Wed', 'a model on the board'], ['Thu', 'colloquium'], ['Fri', 'written up']],
    body: 'Posted Sunday and not revised.' },
  { style: 'warning', tag: 'RED LAMP', heading: 'The chamber shutter is open',
    accent: '#b5502f', body: 'Do not open that door.' },
  { style: 'grid', tag: 'FIRE', heading: 'Assembly on the quadrangle', accent: '#b5502f',
    body: 'Out of the porch and left. Not through the chamber.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The floor outside the tea room is uneven',
    accent: '#8a6a1e', body: 'Reported. Reported since the building opened.' },
  { style: 'list', tag: 'COLLOQUIUM', heading: 'Thursday', accent: '#3a5a44',
    items: [['Speaker', 'Geiger'], ['Title', 'A count of ten, and why it is not nothing'],
      ['Time', '4 p.m.'], ['Room', 'the tea room']],
    body: 'Bring a chair.' },
];

/**
 * The measurement chain painted along the corridor's east wall.
 *
 * Walking the corridor walks one alpha particle from the radium pot to the claim.
 * It is in the corridor rather than in any room because no room owns it — the
 * whole point of the building's layout is that the chain crosses it.
 */
const CHAIN_STATIONS = [
  { title: 'Source', sub: 'radium salt, all directions', glyph: 'flask' },
  { title: 'Collimator', sub: 'a hole in lead', glyph: 'column' },
  { title: 'Beam', sub: 'one direction, known', glyph: 'beam' },
  { title: 'Leaf', sub: 'four hundred atoms', glyph: 'fibre' },
  { title: 'Encounter', sub: 'one atom, one push', glyph: 'globe' },
  { title: 'Screen', sub: 'one flash, one particle', glyph: 'plate' },
  { title: 'Angle', sub: 'read off the plate', glyph: 'ruler' },
  { title: 'Counts', sub: 'per bin, per hour', glyph: 'bars' },
  { title: 'Distribution', sub: 'a peak and a tail', glyph: 'curve' },
  { title: 'Nucleus', sub: 'small, positive, heavy', glyph: 'points' },
];

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  const FITTINGS = {
    PORCH:   ['toolBoard'],
    BENCH:   ['sampleStore', 'toolBoard', 'rack', 'barrel'],
    CHAMBER: ['pumpSet', 'monitorBank', 'rack', 'gasCylinder', 'toolBoard'],
    COUNT:   ['monitorBank', 'whiteboard', 'toolBoard'],
    STUDY:   ['whiteboard', 'whiteboard', 'rack'],
    DARK:    [],
    TEA:     ['whiteboard'],
    RACK:    ['rack', 'rack', 'barrel', 'cableDrum'],
    LIB:     ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', BENCH: 'lab', CHAMBER: 'workroom', COUNT: 'lab',
    STUDY: 'station', DARK: 'quiet', TEA: 'waiting', RACK: 'supply', LIB: 'quiet',
  };

  switch(room.kind){
    case 'reception':
      box(1.0, 1.05, 3.4, inX + f * 1.9, 0.525, b.cz - 0.4, M.frame);
      hard(inX + f * 1.9, b.cz - 0.4, 1.2, 3.6, 1.1);
      break;
    case 'workroom':
    case 'lab':
    case 'station':
      box(0.62, 0.9, 3.0, inX + f * 0.9, 0.45, b.cz, M.frame);
      hard(inX + f * 0.9, b.cz, 0.8, 3.2, 0.95);
      break;
    default:
      break;
  }

  // The chamber itself: a brass vessel on a pier, with the screen's arm reaching
  // out of it and the beam line running in from the bench wall. The room was made
  // fourteen metres deep to hold that straight run.
  //
  // Two things here were wrong first time and only a screenshot showed either. The
  // vessel was built 2.3 m across, which is four times the size of the real thing
  // and reads as a shipping container — a laboratory instrument has to be a size a
  // person could lean over. And it stood on the room's own centre line, directly
  // in front of the doorway, so the view into the room was a brown wall. It is set
  // back toward the outer wall now, with the doorway sight line left clear.
  if(room.id === 'CHAMBER'){
    const cx = b.cx + f * 2.2;
    box(0.72, 0.86, 0.72, cx, 0.43, b.cz, M.base);         // the pier
    box(1.05, 0.5, 1.05, cx, 1.13, b.cz, M.rail);          // the vessel
    box(0.34, 0.34, 0.34, cx, 1.5, b.cz, M.frame);         // the lid boss
    box(0.12, 0.1, 2.1, cx, 1.13, b.cz + 1.3, M.frame);    // the screen arm
    box(0.34, 0.42, 0.16, cx, 1.13, b.cz + 2.3, M.frame);  // the screen
    hard(cx, b.cz, 1.2, 1.2, 1.6);
    hard(cx, b.cz + 2.2, 0.5, 0.6, 1.4);
    // The beam line, running in across the room from the bench wall.
    box(3.2, 0.09, 0.09, cx - f * 2.0, 1.13, b.cz, M.rail);
  }

  // The counting room's microscope and stool, which is the whole of its apparatus.
  if(room.id === 'COUNT'){
    box(0.8, 0.78, 1.4, b.cx, 0.39, b.cz + 1.0, M.frame);
    box(0.16, 0.55, 0.16, b.cx, 1.05, b.cz + 1.0, M.rail);
    box(0.34, 0.12, 0.34, b.cx, 1.38, b.cz + 1.0, M.rail);
    hard(b.cx, b.cz + 1.0, 1.0, 1.6, 1.5);
  }

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    bounds: {
      x0: b.xInner + f * 2.2, x1: b.xOuter - f * 1.4,
      z0: room.z0 + 0.8, z1: room.z1 - 0.8,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: ctx.P.wall,
    wallOk: roomWallOk(room, b, ctx.plan, ctx.P),
    kind: KIND[room.id] ?? room.kind ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    // A university laboratory in 1910 types in black on cream and rules its
    // tables by hand. Nothing in here is printed on white.
    print: { paper: '#e6dfcc', ink: '#1f1b14', soft: '#6a6250', accent: '#3a5a44' },
    seed: `qd_nucleus-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.4 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      ...(room.id === 'CHAMBER' ? [{ x: b.cx + f * 0.4, z: b.cz, r: 3.4 },
        { x: b.cx + f * 0.4, z: b.cz + 3.0, r: 1.6 }] : []),
      ...(room.id === 'COUNT' ? [{ x: b.cx, z: b.cz + 1.0, r: 1.6 }] : []),
    ],
    target: 16,
  });

  // Paint, where a room earns it.
  const MURAL = {
    // The distribution the whole building is arguing about, at the scale of a
    // wall: a peak at nothing and a tail that should not be there.
    COUNT:   { kind: 'spectrum', w: 5.0, h: 2.4, ink: '#7a4fa3' },
    // The atom, drawn as a field of nearly nothing with something in the middle.
    STUDY:   { kind: 'lattice', w: 4.6, h: 2.4, ink: '#b5502f' },
    // One field of colour and nothing to read: the only wall in the building
    // that is allowed to say nothing at all.
    LIB:     { kind: 'wash', w: 4.4, h: 2.3, paper: '#a89c80' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.95, z: b.cz, faceX: true, toward: -f,
      paper: '#b8ae92',
      ...MURAL,
    });
  }
}

/**
 * Fit out the corridor.
 *
 * Fifty-two metres, and the only route between the apparatus and the arithmetic.
 * Nothing stands in the middle of it.
 */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard } = ctx;
  const sp = plan.spine ?? { z0: -6, z1: 46 };

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: P.corridorHalfWidth,
    wallThickness: P.wall,
    z0: sp.z0, z1: sp.z1,
    seed: 'qd_nucleus-spine',
    every: 5,
    signEvery: 3.4,
    signs: CORRIDOR_TEXT,
    hard,
    keepClear: [],
    wallOk: (x, z) => spineWallOk(plan, P, x, z),
  });

  const along = (side, opts) => paintAlongWall({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    plan, P, side, run: sp, paper: '#b8ae92', ...opts,
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
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#2b2a20', soft: '#6a6250',
    text: { stations: CHAIN_STATIONS } });

  // And a dado band along the west wall, one step off the distemper. It says
  // nothing, which is the only thing in this corridor that does not.
  along('w', { y: 1.0, h: 0.5, kind: 'wash', paper: '#2f4038' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
