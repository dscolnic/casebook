// props.js — the objects and the wall text unique to the Memory and Testimony Unit.
//
// Anything generic (benches, chairs, racks, notice boards, shelving) comes from
// engine/world/interiorKit.js; this file is the handful of things that make *this*
// unit recognisable, plus every word pinned on its walls.
//
// The building's argument is on its walls, deliberately — with one exception. The
// study room and the interview suites carry almost nothing, because anything
// memorable in either is competing with the thing being measured, and the whole
// subject is that an account picks up material from wherever it is taken.

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
  // ONE notice, and that is the whole of it.
  //
  // The first version of this room carried five, including a list of the words
  // and a tally board — and the room's own banner says nothing on these walls is
  // worth remembering. A screenshot from the corridor is what found it: seven
  // boards on the wall of the room whose design principle is that there is
  // nothing to look at. Everything the five said is on the cards the player
  // reads, which is where it belongs.
  STUDY: [
    { style: 'banner', tag: 'STUDY ROOM', heading: 'Nothing on these walls is worth remembering',
      accent: '#3a5566',
      body: 'That is deliberate. Anything memorable in here would be competing '
        + 'with the list, and the list is the experiment.' },
  ],
  EVENT: [
    { style: 'banner', tag: 'EVENT BAY', heading: 'Everybody sees the same thing',
      accent: '#5a7f3f',
      body: 'One recording, one screen, one seat. Whatever differs afterwards did '
        + 'not differ here.' },
    { style: 'grid', tag: 'THE SEQUENCE', heading: 'Twelve seconds, one junction, two cars',
      accent: '#5a7f3f',
      body: 'Nothing distressing and nothing anybody has to be warned about. The '
        + 'interesting part happens in the interview afterwards.' },
    { style: 'list', tag: 'ASSIGNMENT', heading: 'How groups are made', accent: '#5b6a72',
      items: [['By coin', 'no'], ['By arrival order', 'no'],
        ['By a sealed list', 'yes'], ['By the interviewer', 'never']],
      body: 'The interviewer does not know which wording their participant is getting.' },
    { style: 'warning', tag: 'NO DISCUSSION', heading: 'Not in the corridor, not in the waiting room',
      accent: '#b5502f',
      body: 'Two participants comparing notes have contaminated each other, and '
        + 'neither of them can be used.' },
  ],
  INT1: [
    { style: 'grid', tag: 'THE WORDING', heading: 'A question can put a thing into an interview',
      accent: '#7a4fa3',
      body: 'Ask about the sign and the sign is now something they have met. '
        + 'That meeting is indistinguishable later from having seen it.' },
    { style: 'chart', tag: 'TWO GROUPS', heading: 'Same event, one word different',
      accent: '#7a4fa3',
      body: 'Everything either group saw is identical. What differs is one clause '
        + 'in one question, a week earlier.' },
    { style: 'list', tag: 'ORDER OF ASKING', heading: 'Always', accent: '#5b6a72',
      items: [['1', 'tell me everything'], ['2', 'open questions'],
        ['3', 'specific questions'], ['4', 'anything to add']],
      body: 'Never the other way round. What you ask first shapes everything after it.' },
    { style: 'sticky', tag: 'REMINDER', heading: 'Record before anybody discusses it',
      accent: '#8a6a1e',
      body: 'An account written down after a conversation is an account of the conversation.' },
  ],
  DATA: [
    { style: 'banner', tag: 'DATA ROOM', heading: 'One person recalling wrongly proves nothing',
      accent: '#2f6f8a',
      body: 'Two groups, randomly assigned, differing in one clause, is what makes '
        + 'the clause the cause.' },
    { style: 'grid', tag: 'CONFIDENCE AND ACCURACY', heading: 'Two measurements, not one',
      accent: '#2f6f8a',
      body: 'They are related and the relation is weaker than anybody expects, and '
        + 'weakest under exactly the conditions that produce errors.' },
    { style: 'list', tag: 'THIS STUDY', heading: 'Numbers as of Friday', accent: '#5b6a72',
      items: [['Misled group reporting it', '41 %'], ['Neutral group reporting it', '12 %'],
        ['Difference', '29 points'], ['People in each group', '100']],
      body: 'The third row is the finding. The first two on their own are not.' },
    { style: 'warning', tag: 'NO SUBGROUPS AFTERWARDS', heading: 'Not once you have seen the data',
      accent: '#b5502f',
      body: 'Any set of numbers contains a subgroup that says something. Decide the '
        + 'comparisons first and write them down.' },
  ],
  INT2: [
    { style: 'list', tag: 'SUITE B', heading: 'Identical to suite A on purpose', accent: '#5b6a72',
      items: [['Chairs', 'same'], ['Table', 'same'], ['Lighting', 'same'],
        ['Recorder', 'same']],
      body: 'Two rooms that differ are a variable nobody meant to introduce.' },
  ],
  OBS: [
    { style: 'warning', tag: 'OBSERVATION', heading: 'The microphone is live in both suites',
      accent: '#b5502f', body: 'Say nothing you would not say in the room next door.' },
    { style: 'list', tag: 'WHAT IS LOGGED', heading: 'Every session', accent: '#5b6a72',
      items: [['Wording used', 'yes'], ['Time taken', 'yes'],
        ['Confidence stated', 'yes'], ['Interviewer\'s opinion', 'no']],
      body: 'The last row is not an oversight.' },
  ],
  WAIT: [
    { style: 'sticky', tag: 'PLEASE', heading: 'Do not discuss the study while you wait',
      accent: '#8a6a1e', body: 'Two people comparing notes cost the study two people.' },
    { style: 'list', tag: 'ROTA', heading: 'Who runs the machine', accent: '#5b6a72',
      items: [['Mon', 'Achebe'], ['Tue', 'Vance'], ['Wed', 'Achebe'],
        ['Thu', 'nobody'], ['Fri', 'nobody']],
      body: 'Thursday and Friday have been blank since the rota went up.' },
  ],
  BRIEF: [
    { style: 'banner', tag: 'BRIEFING ROOM', heading: 'Everybody is told what this was',
      accent: '#3a5566',
      body: 'Fully, before they leave, including which wording they had. Nobody '
        + 'goes home thinking they saw something they did not.' },
  ],
  RECS: [
    { style: 'grid', tag: 'TRANSCRIPTS', heading: 'Verbatim, and in their own words',
      accent: '#5b6a72', body: 'A tidied transcript is a transcript with somebody else in it.' },
  ],
  STORE: [
    { style: 'list', tag: 'STOCK', heading: 'On the shelf', accent: '#5b6a72',
      items: [['Recorders', '4'], ['Tapes', 'ample'], ['Response sheets', '900'],
        ['Confidence scales', '900']],
      body: 'One confidence scale per response sheet. They are printed together for a reason.' },
  ],
};

const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'THE UNIT', heading: 'Memory and Testimony', accent: '#3a5566',
    body: 'Study room and the interview suites on your left. Event bay, '
      + 'observation and the data room on your right.' },
  { style: 'list', tag: 'THIS WEEK', heading: 'What is expected where', accent: '#5b6a72',
    items: [['Mon', 'lists and recognition'], ['Tue', 'the event shown'],
      ['Wed', 'the questioning'], ['Thu', 'the recall test'],
      ['Fri', 'the interview method']],
    body: 'Loftus posts this on Sunday evening and does not revise it.' },
  { style: 'warning', tag: 'NO DISCUSSION', heading: 'Not in this corridor',
    accent: '#b5502f', body: 'Two participants comparing notes have contaminated each other.' },
  { style: 'grid', tag: 'ONE RULE', heading: 'Record before anybody talks about it', accent: '#3a5566',
    body: 'An account taken after a conversation is an account of the conversation.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The waiting room clock is nine minutes fast',
    accent: '#8a6a1e', body: 'It has been reported. Nobody has decided whether that matters.' },
  { style: 'list', tag: 'ONE STUDY', heading: 'What Friday holds', accent: '#2f6f8a',
    items: [['People', '200'], ['Groups', '2'], ['Words different', '1'],
      ['Difference found', '29 points']],
    body: 'One clause, a week earlier, and twenty-nine people in a hundred.' },
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
  { title: 'The list', sub: 'fifteen pointing at one', glyph: 'column' },
  { title: 'The lure', sub: 'never presented', glyph: 'plate' },
  { title: 'Familiar', sub: 'and with no origin on it', glyph: 'points' },
  { title: 'The event', sub: 'everybody sees the same', glyph: 'camera' },
  { title: 'The wording', sub: 'one clause different', glyph: 'fibre' },
  { title: 'Recall', sub: 'a week later', glyph: 'ruler' },
  { title: 'Two groups', sub: 'the difference between them', glyph: 'bars' },
  { title: 'Confidence', sub: 'a second measurement', glyph: 'flask' },
  { title: 'The method', sub: 'ask, and add nothing', glyph: 'spiral' },
];

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  // What each room of *this* unit has in it. The names are interiorKit's fitting
  // makers; the choice per room is what makes an interview suite read differently
  // from a data room — which here means having almost nothing in it.
  const FITTINGS = {
    STUDY: ['monitorBank', 'whiteboard'],
    EVENT: ['monitorBank', 'toolBoard'],
    INT1:  ['toolBoard'],
    INT2:  ['toolBoard'],
    OBS:   ['monitorBank', 'rack'],
    DATA:  ['monitorBank', 'whiteboard', 'rack', 'toolBoard'],
    WAIT:  ['whiteboard'],
    BRIEF: ['whiteboard', 'rack'],
    RECS:  ['rack', 'rack', 'sampleStore'],
    STORE: ['rack', 'rack', 'cableDrum'],
  };
  const KIND = {
    STUDY: 'lab', EVENT: 'lab', INT1: 'quiet', INT2: 'quiet', OBS: 'quiet',
    DATA: 'station', WAIT: 'waiting', BRIEF: 'workroom', RECS: 'supply', STORE: 'supply',
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

  // An interview suite is a table and two chairs and nothing else, and the
  // nothing else is the design. A room with anything in it worth looking at is a
  // room that has contributed something to the account taken in it.
  if(room.id === 'INT1' || room.id === 'INT2'){
    box(0.90, 0.74, 1.40, b.cx, 0.37, b.cz, M.frame);
    hard(b.cx, b.cz, 1.1, 1.6, 0.8);
  }

  // The data room's long bench down the outside wall, where the two halves of
  // the study are set beside each other.
  if(room.id === 'DATA'){
    box(0.70, 0.76, 7.20, b.xOuter - f * 0.58, 0.38, b.cz, M.frame);
    hard(b.xOuter - f * 0.58, b.cz, 0.9, 7.4, 0.85);
  }

  // The two bays at the near end each get one thing: a screen on a stand in the
  // event bay, and a card easel in the study room. Both face the corridor,
  // because both bays open onto it.
  if(room.id === 'EVENT' || room.id === 'STUDY'){
    box(0.16, 1.30, 2.00, b.xOuter - f * 1.2, 1.35, b.cz, M.base);
    hard(b.xOuter - f * 1.2, b.cz, 0.5, 2.2, 2.0);
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
    // A university unit in the nineties prints on white A4 from a laser printer,
    // and that is genuinely what these notices are. Still a half-step down from
    // pure white, which in a room lit like this reads as a light box.
    print: { paper: '#eceef0', ink: '#1e242a', soft: '#6d757c', accent: '#3a5566' },
    seed: `qd_memory-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand, at the far end of every group room. Furniture standing
      // on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The interview tables, the data bench and the two bay screens.
      ...(room.id === 'INT1' || room.id === 'INT2' ? [{ x: b.cx, z: b.cz, r: 1.8 }] : []),
      ...(room.id === 'DATA' ? [{ x: b.xOuter - f * 0.58, z: b.cz, r: 1.3 }] : []),
      ...(room.id === 'EVENT' || room.id === 'STUDY' ? [{ x: b.xOuter - f * 1.2, z: b.cz, r: 2.0 }] : []),
    ],
    target: 16,
  });

  // Paint, where a room earns it. Low contrast and unframed: a mural is meant to
  // be seen and not read.
  const MURAL = {
    // A run of words converging on one that is not there, at the scale of the
    // wall, in the room the lists are read in.
    DATA:  { kind: 'lattice', w: 4.8, h: 2.3, ink: '#2f6f8a' },
    // One field of colour and nothing to read, in the room where everybody is
    // finally told what the study was.
    BRIEF: { kind: 'wash', w: 4.0, h: 2.2, paper: '#dfe3e6' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      paper: '#e2e5e8',
      ...MURAL,
    });
  }
}

/**
 * Fit out the corridor.
 *
 * Fifty metres of it, and it is the only route between the two halves of the
 * argument. What goes in it is what accumulates in a working unit — notice
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
    seed: 'qd_memory-spine',
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
    plan, P, side, run: sp, paper: '#e2e5e8', ...opts,
  });

  // The chain, along the east wall.
  //
  // The band is at 2.20 with a 0.62 m height in every one of these buildings,
  // whatever the ceiling is, because what sets it is where the player's eye is
  // rather than where the slab is. Set against `tileH` instead it sits above the
  // top of a 66-degree frame at walking distance from the wall, and a corridor
  // drawing nobody can see while walking is a corridor drawing that is not there.
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#3a5566', soft: '#6d757c',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing
  // and is the only thing in the corridor that does not.
  along('w', { y: 0.9, h: 0.44, kind: 'wash', paper: '#a8b0b6' });
}

/** Unused here — this theme has no outdoor world. Exported so all three can be. */
export function decorate(scene, ctx){
  void scene; void ctx;
}
