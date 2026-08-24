// props.js — the objects and the wall text unique to the interferometer station.
//
// The structural half of an interior fit-out lives in
// `engine/world/interiorKit.js`: where a wall has a doorway in it, where a mural
// may be painted, and which way a sliced drawing runs on each side of a corridor.
// What is left here is what makes this a detector site rather than a corridor.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/** What is on the walls, room by room. Nine parts earnest, one part joke. */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'THE SITE', heading: 'Instrument west, everything else east',
      accent: '#1c3f52',
      body: 'Optics and parameters on your left. Calibration, isolation and the '
        + 'control room on your right. The arms leave the building at the far corner.' },
    { style: 'grid', tag: 'LOCK', heading: 'How long both arms have held', accent: '#1c3f52',
      body: 'It resets when either arm drops out. Nobody watches it and everybody '
        + 'knows what it says.' },
    { style: 'warning', tag: 'DO NOT RUN', heading: 'Anywhere on this floor', accent: '#b5502f',
      body: 'The instrument can hear you. So can everybody looking at a candidate.' },
    { style: 'sticky', tag: 'LOST', heading: 'One torque wrench, calibrated', accent: '#8a6a1e',
      body: 'It is not the same as the uncalibrated one. Please do not swap them back.' },
  ],
  OPTICS: [
    { style: 'banner', tag: 'IT MEASURES A DIFFERENCE', heading: 'Not a length',
      accent: '#3f7f8f',
      body: 'The instrument has no idea how long either arm is. What it reports is '
        + 'whether one has changed relative to the other.' },
    { style: 'chart', tag: 'THE FRINGE', heading: 'Why the port is nearly dark',
      accent: '#3f7f8f',
      body: 'Poised at cancellation, the smallest change in one path makes the '
        + 'largest change in brightness. A whisker off, so the sign survives.' },
    { style: 'grid', tag: 'ONE PART IN 10^21', heading: 'Across four kilometres',
      accent: '#3f7f8f',
      body: 'About a thousandth of the width of a proton. Written down it sounds '
        + 'impossible, which is roughly correct.' },
    { style: 'list', tag: 'BEFORE ANY MEASUREMENT', heading: 'In this order', accent: '#5b6a72',
      items: [['1', 'both arms locked'], ['2', 'working point set'],
        ['3', 'calibration current'], ['4', 'auxiliary channels logging']],
      body: 'A strain with no calibration behind it is a brightness.' },
    { style: 'sticky', tag: 'ON THE DOOR', heading: 'The mirrors are hanging on wires',
      accent: '#b5502f', body: 'Treat every surface in here as though it were, too.' },
  ],
  ISOL: [
    { style: 'banner', tag: 'BOTH ENDS ARE HOPELESS', heading: 'For opposite reasons',
      accent: '#8a6a1e',
      body: 'Ground motion below. Photon counting statistics above. Thermal motion '
        + 'in between. The floor is the instrument.' },
    { style: 'chart', tag: 'NOISE BUDGET', heading: 'Added in quadrature', accent: '#8a6a1e',
      body: 'Three plus four is five, not seven. Improve the small one and the total '
        + 'barely moves.' },
    { style: 'list', tag: 'AUXILIARY CHANNELS', heading: 'What they are for', accent: '#5b6a72',
      items: [['A lorry', 'appears in one'], ['A storm', 'appears in several'],
        ['A weld cracking', 'appears in one'], ['A wave', 'appears in none']],
      body: 'A quiet auxiliary set is not proof. It is the absence of the causes we watch.' },
    { style: 'warning', tag: 'THE STACKS', heading: 'Do not lean, sit, or set anything down',
      accent: '#b5502f',
      body: 'Every stage is there to stop something the size of a footstep reaching '
        + 'a mirror.' },
    { style: 'tally', tag: 'LOCK LOSSES THIS WEEK', heading: 'Cause known in', accent: '#5b6a72',
      body: '' },
  ],
  CTRL: [
    { style: 'banner', tag: 'LOOK LIKE SOMETHING', heading: 'Not merely look odd',
      accent: '#b5502f',
      body: 'A rising sweep is a particular shape. A template either accounts for it '
        + 'or leaves structure behind, and the structure is the answer.' },
    { style: 'grid', tag: 'THE OTHER SITE', heading: 'Within ten milliseconds',
      accent: '#b5502f',
      body: 'Three thousand kilometres, at the speed of light. Anything matched at '
        + 'fifty is rejected on geometry alone.' },
    { style: 'chart', tag: 'INSPIRAL, MERGER, RINGDOWN', heading: 'Three regimes, two masses',
      accent: '#5b6a72',
      body: 'The theory predicts all three from the same pair. Fitting one of them '
        + 'proves very little.' },
    { style: 'list', tag: 'BEFORE WAKING ANYBODY', heading: 'Check these', accent: '#5b6a72',
      items: [['Template residual', 'no structure'], ['Auxiliary channels', 'quiet'],
        ['Other site', 'coherent'], ['Delay', 'inside ten ms']],
      body: 'In that order. The last one is the cheapest and the strongest.' },
    { style: 'sticky', tag: 'BY THE TELEPHONE', heading: 'It is four in the morning there too',
      accent: '#8a6a1e', body: 'They are two hours behind, not asleep. Ring.' },
  ],
  PARAM: [
    { style: 'banner', tag: 'A COMBINATION FIRST', heading: 'A number afterwards',
      accent: '#7a4fa3',
      body: 'The sweep rate fixes one combination of the two masses. How the signal '
        + 'ends fixes a different one. Two combinations, two masses.' },
    { style: 'chart', tag: 'THE LEDGER', heading: 'What went in, what came out',
      accent: '#7a4fa3',
      body: 'Thirty-six and twenty-nine in, about sixty-two out. The difference left '
        + 'as waves.' },
    { style: 'warning', tag: 'TEACHING NUMBERS', heading: 'Not a catalogue fit', accent: '#b5502f',
      body: 'These are early-reported values for one event. The precision fits came '
        + 'later and moved them. Say so in the paper.' },
    { style: 'list', tag: 'WHAT IS STILL OPEN', heading: 'After all of it', accent: '#5b6a72',
      items: [['The two masses', 'fixed'], ['The distance', 'roughly'],
        ['Either spin', 'barely'], ['Alternative theories', 'constrained, not dead']],
      body: 'The last line is why the claim says consistent with.' },
    { style: 'sticky', tag: 'PINNED', heading: 'For a fifth of a second it outshone the universe',
      accent: '#7a4fa3', body: 'In gravitational waves. Nobody saw a thing.' },
  ],
  TEA: [
    { style: 'grid', tag: 'GROUND MOTION', heading: 'Printed every hour', accent: '#1c3f52',
      body: 'If it is bad, the lock will drop and it is not your fault.' },
    { style: 'sticky', tag: 'THE MACHINE', heading: 'Grinds, so not during a lock stretch',
      accent: '#8a6a1e', body: 'This is only half a joke.' },
    { style: 'list', tag: 'GROUP MEETING', heading: 'Thursdays', accent: '#5b6a72',
      items: [['This week', 'the candidate'], ['Next', 'the mass ledger'],
        ['After', 'the paper']],
      body: 'Ten minutes each. Bergström keeps the clock.' },
  ],
  DARK: [
    { style: 'warning', tag: 'DRIVE RUNNING', heading: 'A mirror is being shaken on purpose',
      accent: '#b5502f', body: 'Anything in the strain channel right now is us.' },
    { style: 'sticky', tag: 'THE TABLES', heading: 'Use the one for the run', accent: '#8a6a1e',
      body: 'Not the newest one. The run number is on the sleeve.' },
  ],
  RACK: [
    { style: 'grid', tag: 'STORE', heading: 'Suspension wire, optics, spares', accent: '#5b6a72',
      body: 'Optics stay in their cases until they are in the chamber. No exceptions '
        + 'and no explanations required.' },
    { style: 'sticky', tag: 'THE CRATE', heading: 'Is a mirror', accent: '#8a6a1e',
      body: 'It weighs forty kilograms and it is worth more than the building.' },
  ],
  LIB: [
    { style: 'list', tag: 'ON THE SHELF', heading: 'And who has it out', accent: '#5b6a72',
      items: [['Waveform catalogue', 'Bergström'], ['Suspension handbook', 'Mwangi'],
        ['Detector characterisation', 'Takahashi'], ['Interferometry, vol 2', 'missing']],
      body: 'Sign the card. There is one copy of anything.' },
    { style: 'sticky', tag: 'QUIET', heading: 'On a site whose whole purpose is quiet',
      accent: '#1c3f52', body: 'This room is the only place it is for your benefit.' },
  ],
};

/** The corridor's own boards. */
const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'INTERFEROMETER SITE', heading: 'Instrument west, the rest east',
    accent: '#1c3f52',
    body: 'Optics, coffee, parameters and the store on your left. Calibration, '
      + 'isolation, control and the reading room on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected when', accent: '#5b6a72',
    items: [['Mon', 'the noise budget closed'], ['Tue', 'candidate review'],
      ['Wed', 'masses fitted'], ['Thu', 'group meeting'], ['Fri', 'draft to the collaboration']],
    body: 'Posted Sunday and not revised, whatever turns up at four in the morning.' },
  { style: 'warning', tag: 'DO NOT RUN', heading: 'The instrument can hear you',
    accent: '#b5502f', body: 'It can hear the door as well. Use the handle.' },
  { style: 'chart', tag: 'TEN MILLISECONDS', heading: 'Three thousand kilometres at the speed of light',
    accent: '#1c3f52',
    body: 'That is the whole window a real wave has between the two sites, and it is '
      + 'the cheapest veto on the floor.' },
  { style: 'grid', tag: 'FIRE', heading: 'Assembly at the gate', accent: '#b5502f',
    body: 'Out of the entrance and left. Not through the isolation bay.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The corridor floor joint is being watched',
    accent: '#8a6a1e', body: 'It shows up on channel 214. It is not a fault, it is a joint.' },
];

/**
 * The chain painted along the corridor's east wall.
 *
 * Walking the corridor walks one signal from a pair of black holes to a sentence.
 * It is in the corridor because no room owns it, and the point of the floor plan
 * is that the chain crosses it.
 */
const CHAIN_STATIONS = [
  { title: 'Binary', sub: 'two masses, closing', glyph: 'globe' },
  { title: 'Radiation', sub: 'energy leaving the orbit', glyph: 'wave' },
  { title: 'Strain', sub: 'space itself, stretched', glyph: 'beam' },
  { title: 'Arms', sub: 'one longer, one shorter', glyph: 'grid' },
  { title: 'Fringe', sub: 'a brightness at a dark port', glyph: 'column' },
  { title: 'Channel', sub: 'a fifth of a second', glyph: 'curve' },
  { title: 'Template', sub: 'judged on what is left', glyph: 'points' },
  { title: 'Two sites', sub: 'inside ten milliseconds', glyph: 'dish' },
  { title: 'Masses', sub: 'a combination, then a number', glyph: 'bars' },
  { title: 'Ledger', sub: 'three suns, gone', glyph: 'ruler' },
];

/** Fit out one room. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;
  const inX = b.xInner + f * 0.5;

  const FITTINGS = {
    PORCH:  ['toolBoard', 'monitorBank'],
    OPTICS: ['rack', 'pumpSet', 'toolBoard', 'gasCylinder'],
    ISOL:   ['pumpSet', 'rack', 'rack', 'toolBoard', 'cableDrum'],
    CTRL:   ['monitorBank', 'monitorBank', 'whiteboard', 'rack'],
    PARAM:  ['whiteboard', 'monitorBank', 'rack', 'whiteboard'],
    TEA:    ['whiteboard'],
    DARK:   ['rack', 'toolBoard', 'sampleStore'],
    RACK:   ['rack', 'rack', 'barrel', 'cableDrum'],
    LIB:    ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', OPTICS: 'lab', ISOL: 'workroom', CTRL: 'lab', PARAM: 'station',
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

  // The beam splitter chamber and the two beam tubes leaving it at right angles.
  // This is the site's silhouette: nothing else in the building is a metre-wide
  // pipe going out through a wall, and it is the only thing in the game that says
  // the arms are four kilometres long.
  if(room.id === 'OPTICS'){
    const cx = b.cx + f * 1.4;
    box(2.4, 2.6, 2.4, cx, 1.3, b.cz, M.rail);                       // the chamber
    box(2.7, 0.3, 2.7, cx, 2.75, b.cz, M.base);                      // its lid
    hard(cx, b.cz, 2.8, 2.8, 2.9);
    // One tube out through the far wall, one out through the end wall.
    box(5.4, 1.0, 1.0, cx + f * 3.4, 1.4, b.cz, M.rail);
    box(1.0, 1.0, 5.4, cx, 1.4, b.cz - 3.4, M.rail);
    hard(cx + f * 3.4, b.cz, 5.6, 1.2, 1.9);
    hard(cx, b.cz - 3.4, 1.2, 5.6, 1.9);
  }

  // The isolation bay's suspension stacks: four storeys of nothing stacked on
  // each other, which is what the room's depth and ceiling height are for.
  if(room.id === 'ISOL'){
    for(const dz of [-4.5, 0, 4.5]){
      const cx = b.cx + f * 0.8;
      for(let i = 0; i < 4; i++){
        const w = 2.2 - i * 0.35;
        box(w, 0.16, w, cx, 0.5 + i * 0.85, b.cz + dz, M.rail);
        for(const sx of [-1, 1]) for(const sz of [-1, 1]){
          box(0.06, 0.7, 0.06, cx + sx * (w / 2 - 0.1), 0.9 + i * 0.85,
            b.cz + dz + sz * (w / 2 - 0.1), M.base);
        }
      }
      hard(cx, b.cz + dz, 2.4, 2.4, 3.6);
    }
  }

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    bounds: {
      x0: b.xInner + f * 2.2, x1: b.xOuter - f * 1.7,
      z0: room.z0 + 0.9, z1: room.z1 - 0.9,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: ctx.P.wall,
    wallOk: roomWallOk(room, b, ctx.plan, ctx.P),
    kind: KIND[room.id] ?? room.kind ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    print: { paper: '#eaedef', ink: '#1a1f24', soft: '#697076', accent: '#1c3f52' },
    seed: `qd_ligo-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.6 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.6 }] : []),
      ...(room.id === 'OPTICS' ? [{ x: b.cx + f * 1.4, z: b.cz, r: 4.2 },
        { x: b.cx + f * 1.4, z: b.cz - 3.4, r: 3.4 }] : []),
      ...(room.id === 'ISOL' ? [-4.5, 0, 4.5].map(dz =>
        ({ x: b.cx + f * 0.8, z: b.cz + dz, r: 2.4 })) : []),
    ],
    target: 17,
  });

  const MURAL = {
    CTRL:  { kind: 'spectrum', w: 4.8, h: 2.2, ink: '#b5502f' },
    PARAM: { kind: 'lattice', w: 4.6, h: 2.2, ink: '#7a4fa3' },
    LIB:   { kind: 'wash', w: 4.2, h: 2.1, paper: '#98a0a5' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.95, z: b.cz, faceX: true, toward: -f,
      paper: '#a8aeb2',
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
    seed: 'qd_ligo-spine',
    every: 5,
    signEvery: 3.4,
    signs: CORRIDOR_TEXT,
    hard,
    keepClear: [],
    wallOk: (x, z) => spineWallOk(plan, P, x, z),
  });

  const along = (side, opts) => paintAlongWall({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    plan, P, side, run: sp, paper: '#a8aeb2', ...opts,
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
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#18262e', soft: '#697076',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing.
  along('w', { y: 0.95, h: 0.44, kind: 'wash', paper: '#868e94' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
