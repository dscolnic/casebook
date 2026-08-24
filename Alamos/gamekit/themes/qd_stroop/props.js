// props.js — the objects and the wall text unique to the reaction-time laboratory.
//
// Anything generic (benches, chairs, racks, notice boards, shelving) comes from
// engine/world/interiorKit.js; this file is the handful of things that make *this*
// laboratory recognisable, plus every word painted or pinned on its walls.
//
// The building's argument is on its walls, deliberately. This is a campaign about
// a difference between two conditions, so the long wall carries the chain from a
// plain colour patch to a wall of times, and each room carries the records the
// people in it keep.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural,
  roomWallOk, spineWallOk, paintAlongWall } from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * Nine parts earnest, one part joke per room. A place where every notice is a
 * safety instruction is a place nobody works in, and one where every notice is a
 * gag is a set. None of this is on the syllabus and none of it is checked;
 * all of it has to land at 1.4 m/s.
 */
const WALL_TEXT = {
  PORCH: [
    { style: 'banner', tag: 'PARTICIPANTS', heading: 'Wait here and read nothing', accent: '#2f3f4a',
      body: 'The cards on the walls further in are the experiment. '
        + 'Somebody will come and fetch you.' },
    { style: 'list', tag: 'EXTENSIONS', heading: 'Who is where', accent: '#5b6a72',
      items: [['Booth', '214'], ['Chronoscope', '217'], ['Tabulation', '221'],
        ['The wall', '203'], ['Front desk', '200']],
      body: 'Ring before you walk down. A booth door opened mid-block spoils the block.' },
    { style: 'warning', tag: 'QUIET', heading: 'The corridor carries', accent: '#b5502f',
      body: 'A door shut hard at this end is heard in the booth. Somebody is always being timed.' },
    { style: 'sticky', tag: 'LOST', heading: 'One stopwatch, second-hand bent', accent: '#8a6a1e',
      body: 'Last seen Tuesday on the chronoscope bench. It has been wrong by two seconds since March.' },
  ],
  BOOTH: [
    { style: 'grid', tag: 'BEFORE THE MIXED BLOCK', heading: 'Plain patches, then plain words',
      accent: '#3f6f8a',
      body: 'Both of those come first and both get recorded. Without them there '
        + 'is nothing for the third block to be compared against.' },
    { style: 'chart', tag: 'ONE PERSON, THREE BLOCKS', heading: 'What the same hand does in each',
      accent: '#3f6f8a',
      body: 'People differ enormously and so does the equipment. The comparison '
        + 'that means anything is a person against themselves.' },
    { style: 'list', tag: 'BLOCK ORDER', heading: 'As posted', accent: '#5b6a72',
      items: [['1', 'colour patches'], ['2', 'words in grey'],
        ['3', 'matching'], ['4', 'conflicting']],
      body: 'Never run four before three. Half the effect would be practice.' },
    { style: 'warning', tag: 'INSTRUCTIONS', heading: 'Read them out; do not paraphrase',
      accent: '#b5502f',
      body: 'The wording is part of the apparatus. Two experimenters improvising '
        + 'are running two experiments.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Someone told a participant to try harder',
      accent: '#8a6a1e', body: '' },
  ],
  CHRON: [
    { style: 'banner', tag: 'THE CHRONOSCOPE', heading: 'Start on the card, stop on the voice',
      accent: '#2f3f4a',
      body: 'Both ends of that have a delay in them and both delays are in every '
        + 'reading. That is why only differences are reported.' },
    { style: 'grid', tag: 'WHAT A DIFFERENCE REMOVES', heading: 'Everything the two blocks share',
      accent: '#2f3f4a',
      body: 'The apparatus, the operator, the room, the person and the hour all '
        + 'cancel. What is left is the thing that differed.' },
    { style: 'list', tag: 'CALIBRATION', heading: 'This week', accent: '#5b6a72',
      items: [['Mon', 'checked, good'], ['Tue', 'checked, good'],
        ['Wed', 'not checked'], ['Thu', 'drifting, adjusted']],
      body: 'Wednesday is why every block since is reported as a difference and not a time.' },
    { style: 'warning', tag: 'DO NOT ANNOUNCE THE BLOCK', heading: 'They will prepare for it',
      accent: '#b5502f',
      body: 'Telling somebody the hard one is next changes the thing being measured.' },
  ],
  TAB: [
    { style: 'grid', tag: 'THE MIDDLE VALUE', heading: 'One sneeze does not move it',
      accent: '#8a6a1e',
      body: 'Times bunch up with a long tail. A mean follows the tail and a '
        + 'median follows the bunch, and the bunch is the person.' },
    { style: 'chart', tag: 'TIMES AND ERRORS', heading: 'Both columns or neither', accent: '#8a6a1e',
      body: 'Anybody can go faster by being less careful. A block described by '
        + 'its time alone can be improved by cheating.' },
    { style: 'list', tag: 'ON THE SHEETS', heading: 'This week', accent: '#5b6a72',
      items: [['Participants', '42'], ['Blocks each', '4'],
        ['Trials a block', '100'], ['Sheets to check', 'all of them']],
      body: 'Every sheet is checked by somebody who did not write it.' },
    { style: 'sticky', tag: 'REMINDER', heading: 'A difference, never a time', accent: '#8a6a1e',
      body: 'A raw time is a fact about the apparatus. Written up here since 1932.' },
  ],
  WALL: [
    { style: 'banner', tag: 'THE WALL', heading: 'Eight hundred times, all of them',
      accent: '#5a4a7a',
      body: 'Not a summary. The shape of the thing is the finding, and a shape '
        + 'cannot be read off two numbers.' },
    { style: 'grid', tag: 'WHAT IT SHOWS', heading: 'The same person, two conditions',
      accent: '#5a4a7a',
      body: 'Two piles with the same shape and one of them shifted along. That '
        + 'is what a cost looks like when it is real.' },
    { style: 'list', tag: 'ACCOUNTS ON OFFER', heading: 'All of which fit', accent: '#5b6a72',
      items: [['Two responses racing', 'fits'], ['One channel, two loads', 'fits'],
        ['A gate that is slow to shut', 'fits'], ['A single centre in the brain', 'fits']],
      body: 'A result every account fits is not evidence for any of them.' },
    { style: 'warning', tag: 'DO NOT SAY INHIBITION CENTRE', heading: 'Not from this',
      accent: '#b5502f',
      body: 'The effect is as solid as anything in the subject. Why it happens is a different argument.' },
  ],
  TEA: [
    { style: 'list', tag: 'ROTA', heading: 'Who makes the tea', accent: '#5b6a72',
      items: [['Mon', 'Ward'], ['Tue', 'Kell'], ['Wed', 'Boateng'],
        ['Thu', 'nobody'], ['Fri', 'nobody']],
      body: 'Thursday and Friday have been blank since the rota went up.' },
    { style: 'sticky', tag: 'SEMINAR', heading: 'Thursday, four o\'clock', accent: '#8a6a1e',
      body: 'Cattell, on reading being faster than naming, which he showed in 1886. Bring your own chair.' },
  ],
  DARK: [
    { style: 'warning', tag: 'TWENTY MINUTES', heading: 'Do not open the door on a run',
      accent: '#b5502f', body: 'A red lamp outside means somebody is sitting in the dark on purpose.' },
    { style: 'list', tag: 'IN USE FOR', heading: 'Other work', accent: '#5b6a72',
      items: [['Threshold studies', 'Tue and Thu'], ['Afterimages', 'Mon'],
        ['Colour matching', 'Wed'], ['This experiment', 'never']],
      body: 'Nothing in the colour work needs the dark. The booth has a daylight lamp.' },
  ],
  RACK: [
    { style: 'grid', tag: 'CARDS', heading: 'Printed here, and printed again in a fresh order',
      accent: '#5b6a72', body: 'A deck that is always in the same order is a deck people learn.' },
    { style: 'list', tag: 'STOCK', heading: 'On the shelf', accent: '#5b6a72',
      items: [['Patch cards', '600'], ['Grey word cards', '600'],
        ['Matching cards', '600'], ['Conflicting cards', '600']],
      body: 'Four inks and one press. The conflicting decks take three times as long to set.' },
  ],
  LIB: [
    { style: 'banner', tag: 'READING ROOM', heading: 'Quiet, and the offprints stay in the case',
      accent: '#42342a', body: 'Cattell 1886 is in the second drawer. Everybody asks.' },
  ],
};

const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'THE LABORATORY', heading: 'Reaction Time', accent: '#2f3f4a',
    body: 'Booth and tabulation on your left. Dark room, chronoscope and the '
      + 'distribution wall on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected where', accent: '#5b6a72',
    items: [['Mon', 'baselines run'], ['Tue', 'the mixed blocks'],
      ['Wed', 'the difference taken'], ['Thu', 'practice blocks'],
      ['Fri', 'the wall read']],
    body: 'Stroop posts this on Sunday evening and does not revise it.' },
  { style: 'warning', tag: 'QUIET', heading: 'Somebody is always being timed',
    accent: '#b5502f', body: 'Shut doors softly. Do not talk outside the booth.' },
  { style: 'grid', tag: 'ONE RULE', heading: 'Report a difference, not a time', accent: '#2f3f4a',
    body: 'Every raw reading carries the apparatus, the operator and the person '
      + 'in it. A difference between two blocks carries none of them.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The corridor light by the booth flickers',
    accent: '#8a6a1e', body: 'It has been reported. It has been reported since Michaelmas.' },
  { style: 'list', tag: 'ONE PARTICIPANT', heading: 'What a session costs', accent: '#8a6a1e',
    items: [['Blocks', '4'], ['Trials', '400'], ['Minutes', '35'],
      ['Numbers that leave the room', '2']],
    body: 'Four hundred trials produce two numbers, and one of them is a difference.' },
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
  { title: 'Patches', sub: 'colour, no words', glyph: 'plate' },
  { title: 'Words', sub: 'grey, no colour', glyph: 'column' },
  { title: 'Prediction', sub: 'written before the block', glyph: 'camera' },
  { title: 'Matching', sub: 'word and ink agree', glyph: 'bars' },
  { title: 'Conflicting', sub: 'word and ink disagree', glyph: 'points' },
  { title: 'Medians', sub: 'the bunch, not the tail', glyph: 'ruler' },
  { title: 'Difference', sub: 'one block minus the other', glyph: 'fibre' },
  { title: 'Practice', sub: 'smaller, and not gone', glyph: 'flask' },
  { title: 'The wall', sub: 'every account still fits', glyph: 'spiral' },
];

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  // What each room of *this* laboratory has in it. The names are interiorKit's
  // fitting makers; the choice per room is what makes a testing booth read
  // differently from a tabulation room.
  const FITTINGS = {
    PORCH: ['toolBoard'],
    BOOTH: ['monitorBank', 'toolBoard', 'rack'],
    CHRON: ['monitorBank', 'pumpSet', 'toolBoard', 'rack'],
    TAB:   ['whiteboard', 'rack', 'toolBoard', 'rack'],
    WALL:  ['whiteboard', 'whiteboard', 'monitorBank'],
    TEA:   ['whiteboard'],
    DARK:  ['rack', 'barrel'],
    RACK:  ['rack', 'rack', 'sampleStore', 'cableDrum'],
    LIB:   ['rack', 'rack', 'whiteboard'],
  };
  const KIND = {
    PORCH: 'reception', BOOTH: 'lab', CHRON: 'lab', TAB: 'station',
    WALL: 'workroom', TEA: 'waiting', DARK: 'quiet', RACK: 'supply', LIB: 'quiet',
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

  // The booth itself: a three-sided cubicle with a card stand at one end and a
  // chair at the other. A testing booth without walls is a desk, and the whole
  // point of it is that a participant sees the card and nothing else.
  if(room.id === 'BOOTH'){
    for(const s of [-1, 1]){
      box(2.60, 2.20, 0.10, b.xOuter - f * 1.5, 1.10, b.cz + s * 1.30, M.rail);
    }
    box(0.10, 2.20, 2.60, b.xOuter - f * 0.25, 1.10, b.cz, M.rail);
    box(0.60, 0.78, 1.20, b.xOuter - f * 1.5, 0.39, b.cz, M.frame);
    hard(b.xOuter - f * 1.4, b.cz, 1.6, 2.8, 2.2);
  }

  // The distribution wall's own long table, for laying eight hundred slips out
  // on before any of them goes up. It runs down the middle rather than against a
  // wall, because the wall is the thing being covered.
  if(room.id === 'WALL'){
    box(1.40, 0.90, 7.00, b.cx, 0.45, b.cz, M.frame);
    hard(b.cx, b.cz, 1.6, 7.2, 0.95);
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
    // An interwar department types on buff card in a ribbon that is never quite
    // black. A bright white sheet in a room lit like this reads as a light box.
    print: { paper: '#e5dcc2', ink: '#2b2419', soft: '#6e6551', accent: '#2f3f4a' },
    seed: `qd_stroop-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand, at the far end of every group room. Furniture standing
      // on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The booth and the long table.
      ...(room.id === 'BOOTH' ? [{ x: b.xOuter - f * 1.4, z: b.cz, r: 2.4 }] : []),
      ...(room.id === 'WALL' ? [{ x: b.cx, z: b.cz, r: 2.8 }] : []),
    ],
    target: 16,
  });

  // Paint, where a room earns it. Low contrast and unframed: a mural is meant to
  // be seen and not read.
  const MURAL = {
    // Two piles of times with the same shape, one of them shifted along, at the
    // scale of the wall it is drawn on.
    WALL:  { kind: 'lattice', w: 5.0, h: 2.5, ink: '#5a4a7a' },
    // A response arriving whether or not it was wanted, enormous and faint, over
    // the bench that measures how late it makes everything else.
    CHRON: { kind: 'spiral', w: 4.6, h: 2.5, ink: '#2f3f4a' },
    // One field of colour and nothing to read. The only wall in the building
    // allowed to say nothing.
    LIB:   { kind: 'wash', w: 4.2, h: 2.3, paper: '#d8d0b6' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      paper: '#d7ceb4',
      ...MURAL,
    });
  }
}

/**
 * Fit out the corridor.
 *
 * Fifty metres of it, and it is the only route between the two halves of the
 * argument. What goes in it is what accumulates in a working laboratory — notice
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
    seed: 'qd_stroop-spine',
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
    plan, P, side, run: sp, paper: '#d7ceb4', ...opts,
  });

  // The chain, along the east wall.
  //
  // The band is at 2.20 with a 0.62 m height in every one of these buildings,
  // whatever the ceiling is, because what sets it is where the player's eye is
  // rather than where the slab is. Set against `tileH` instead it sits above the
  // top of a 66-degree frame at walking distance from the wall, and a corridor
  // drawing nobody can see while walking is a corridor drawing that is not there.
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#2f3f4a', soft: '#6e6551',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing
  // and is the only thing in the corridor that does not.
  along('w', { y: 0.9, h: 0.44, kind: 'wash', paper: '#a89d80' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
