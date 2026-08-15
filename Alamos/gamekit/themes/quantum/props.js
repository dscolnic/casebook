// props.js — the objects unique to this theme.
//
// Anything generic (chairs, counters, carts, bins, screens, shelving, plants)
// should come from engine/world/kit.js; this file is only for the ten or so
// things that make *this* place recognisable.
//
// Which hook runs depends on the world:
//   outdoor   decorate(scene, ctx)     after ground, buildings and furniture
//             ctx = { groundHeight, colliders, softColliders, interactables,
//                     blocked, sign, MATERIALS, lightPanels, areaScreens }
//   interior  fitOutRoom / fitOutSpine, with the builder context from
//             engine/world/interiorSite.js:
//             { scene, plan, geo, P, box, wall, materials, soft, hard,
//               addInteractable }
//
// The unused ones are ignored, so all three can be exported from here.

import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural }
  from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * Authored from `WALLS.md`, which carries the whole list and the reasoning. None of
 * it is on the syllabus and none of it is checked: a building where every notice is
 * a safety instruction is a building nobody works in. It is nine parts earnest — the
 * records, the rotas, the plots somebody actually took — and one joke per room,
 * because reversing that ratio turns a laboratory into a sitcom set.
 *
 * Every one of these has to land at walking pace. A player goes past at 1.4 m/s.
 */
const WALL_TEXT = {
  ARRIVE: [
    { tag: 'VISITORS', heading: 'Sign in, badge on', accent: '#3f6f8f',
      body: 'Escorted at all times past the yellow line. Badges go back on the board on the way out.' },
    { tag: 'DO NOT BRING IN', heading: 'Past this point', accent: '#b5502f',
      body: 'No watches. No keys. No loose tools beyond the racks. No food past the office.' },
    { tag: 'BADGE BOARD', heading: 'Three are missing', accent: '#5b6a72',
      body: 'Whoever has 07, it is not yours.' },
    { tag: 'FIRE', heading: 'Assembly point is the gate', accent: '#b5502f',
      body: 'Wardens listed below. Last drill went well apart from the people who kept walking.' },
  ],
  OFFICE: [
    { tag: 'FORTNIGHT', heading: 'Review planner', accent: '#b5502f',
      body: 'Blocked out in red. Anything that is not on this chart is not happening before it.' },
    { tag: 'SIGN IT', heading: 'Leaving card', accent: '#3f6f8f',
      body: 'Pen on the string. Do not take the pen.' },
    { tag: 'WHO CAN FIX', heading: 'The printer', accent: '#5b6a72',
      body: 'Three names. Two of them crossed out.' },
    { tag: 'DAYS SINCE', heading: 'We blamed the fridge', accent: '#8a6a1e',
      body: 'Zero. The nought is written over a rubbed-out number, again.' },
  ],
  FAB: [
    { tag: 'GOWNING', heading: 'In this order', accent: '#8a6a1e',
      body: 'Overshoes, hood, coverall, gloves. Laminated because it gets read wet.' },
    { tag: 'NO PAPER', heading: 'Past this line', accent: '#b5502f',
      body: 'This includes the crossword.' },
    { tag: 'BAY BOOKING', heading: 'This week', accent: '#3f6f8f',
      body: 'Initials in most squares. Two are somebody optimistic about Friday.' },
    { tag: 'THE COUPON', heading: 'Junction resistance, this run', accent: '#5b6a72',
      body: 'Spread twice as wide as usual. Circled in green by whoever plotted it.' },
    { tag: 'HELLO AGAIN', heading: '4.55 GHz, on three chips now', accent: '#8a6a1e',
      body: 'Printed spectrum, the feature ringed in biro, the date written small.' },
  ],
  CRYO: [
    { tag: 'WARNING', heading: 'Oxygen deficiency hazard', accent: '#b5502f',
      body: 'Helium and nitrogen displace air. Nobody transfers alone.',
      footer: 'Monitor above 19.5 per cent' },
    { tag: 'FRIDGE TIME', heading: 'Booked to the end of the quarter', accent: '#3f6f8f',
      body: 'Four days a slot, warm-up and cooldown. Take the whole slot or none of it.' },
    { tag: 'GOOD RUN', heading: 'Cooldown curve, kept', accent: '#5b6a72',
      body: 'Hand-drawn, from the year it was installed, still the one everybody compares against.' },
    { tag: 'DEWAR RETURNS', heading: 'Thursdays', accent: '#8a6a1e',
      body: 'Label it or it comes back to you.' },
    { tag: 'COOLDOWNS', heading: 'This year', accent: '#5b6a72',
      body: 'A tally in fives on the door frame. Nobody remembers who started it.' },
  ],
  QUIET: [
    { tag: 'VIVA', heading: 'Friday, two o\'clock', accent: '#3f6f8f',
      body: 'Bring a chair. The room is small.' },
    { tag: 'PLEASE', heading: 'Reshelve', accent: '#5b6a72',
      body: 'Written above a shelf that plainly nobody has.' },
    { tag: 'LEAVE IT', heading: 'The jigsaw', accent: '#8a6a1e',
      body: 'Half done. It has been half done for a while.' },
  ],
  SENSE: [
    { tag: 'CALIBRATION', heading: 'Due monthly', accent: '#3f6f8f',
      body: 'Against the reference, before anything anybody wants. The ratio goes in the log.' },
    { tag: 'THANK YOU', heading: 'From the hospital study', accent: '#1f8a4c',
      body: 'A card, pinned where visitors see it, signed by eleven people.' },
    { tag: 'QUIET PLEASE', heading: 'Measuring', accent: '#b5502f',
      body: 'Hangs on a hook by the door. Out more often than not.' },
    { tag: 'THE DOOR', heading: 'Was too small', accent: '#5b6a72',
      body: 'Photograph of the magnetometer coming in sideways, six people and a strap.' },
  ],
  STORE: [
    { tag: 'STOCK', heading: 'Full and empty', accent: '#5b6a72',
      body: 'Chalked tally, updated daily, wrong by Wednesday.' },
    { tag: 'CHAIN EVERY CYLINDER', heading: 'Every one', accent: '#b5502f',
      body: 'With a photograph of one that was not, and what it did to the door.' },
    { tag: 'DELIVERIES', heading: 'Tuesday and Friday', accent: '#3f6f8f',
      body: 'Gate code below, half rubbed out, everybody knows it anyway.' },
  ],
  CTRL: [
    { tag: 'HANDOVER', heading: 'In writing, every shift', accent: '#3f6f8f',
      body: 'Blank forms on the clip. Half of them get filled in.' },
    { tag: 'DO NOT SWITCH OFF', heading: 'This socket', accent: '#b5502f',
      body: 'No explanation given. Nobody has dared ask.' },
    { tag: 'BEST T2', heading: 'This quarter', accent: '#8a6a1e',
      body: 'A leaderboard by qubit, initials beside each. One is crossed out and written higher.' },
    { tag: 'FIRST FRINGE', heading: 'Framed', accent: '#5b6a72',
      body: 'The group\'s first Rabi oscillation, with the date and two sets of initials.' },
    { tag: 'NOT DURING A RUN', heading: 'The dartboard', accent: '#b5502f',
      body: 'Hung low, next to a rule everybody has broken once.' },
  ],
  RACKS: [
    { tag: 'CABLE LOAN', heading: 'Sign it out', accent: '#3f6f8f',
      body: 'Six lines used. Two returned. The sheet has been up since spring.' },
    { tag: 'BROKEN', heading: 'Do not use', accent: '#b5502f',
      body: 'Three tags, hanging on a hook rather than on the equipment they belong to.' },
    { tag: 'HAVE YOU TRIED', heading: 'In this order', accent: '#8a6a1e',
      body: 'Retuning. Recooling. Recalibrating. Going home.' },
    { tag: 'TORQUE', heading: 'SMA connectors', accent: '#5b6a72',
      body: 'The table, greasy at one corner, correct to the newton centimetre.' },
  ],
  VER: [
    { tag: 'RESULTS', heading: 'Same measurement, three sessions', accent: '#3f6f8f',
      body: 'Pinned side by side with the differences ringed. Nobody has taken them down.' },
    { tag: 'REPORTING', heading: 'What travels with a number', accent: '#5b6a72',
      body: 'Method, sample size, uncertainty. Or it does not leave the room.' },
    { tag: 'ERROR BUDGET', heading: 'Where it all goes', accent: '#8a6a1e',
      body: 'A pie chart printed at A3, three slices labelled in pen because the script does not know their names.' },
    { tag: 'S = 2.78', heading: 'Two is the bound', accent: '#b5502f',
      body: 'The inequality printed large, the bound crossed out, the measured value written above it in red.' },
    { tag: 'DO NOT ERASE', heading: 'In three hands', accent: '#5b6a72',
      body: 'One of them in permanent marker by mistake. The apology is written underneath.' },
  ],
  DESK: [
    { tag: 'THESE ARE NOT', heading: 'Error bars', accent: '#b5502f',
      body: 'They are the spread of three runs. In the handwriting of whoever lost that argument.' },
    { tag: 'WHY', heading: 'One word, one arrow', accent: '#8a6a1e',
      body: 'Written on a printed plot and pinned back up unanswered.' },
    { tag: 'HEADPHONES ON', heading: 'Means do not ask me things', accent: '#3f6f8f',
      body: 'Printed in a jokey font. Entirely serious.' },
    { tag: 'TWO MINUTES FAST', heading: 'The clock', accent: '#5b6a72',
      body: 'Deliberate. There is a note explaining it, which is somehow worse.' },
  ],
  NET: [
    { tag: 'KEY MATERIAL', heading: 'Nothing leaves on removable media', accent: '#b5502f',
      body: 'Ask, and it will be refused in writing. The form is in the tray.' },
    { tag: 'LOSS BUDGET', heading: 'Per span, per connector, per splice', accent: '#3f6f8f',
      body: 'Posted so nobody has to guess, and initialled where it was last measured.' },
    { tag: 'FIRST LINK', heading: 'Lit, and dated', accent: '#5b6a72',
      body: 'Two people shaking hands in a plant room, neither of them dressed for a photograph.' },
    { tag: 'ENTANGLED', heading: 'Do not separate', accent: '#8a6a1e',
      body: 'Written on two boxes of cable that have been beside each other for years.' },
  ],
  SHIELD: [
    { tag: 'CLOSE THE DOOR', heading: 'Behind you', accent: '#b5502f',
      body: 'The only notice on this wall, and the only one this room gets.' },
  ],
};

/** The corridor's own boards. Building-wide, and the ones everybody walks past. */
const CORRIDOR_TEXT = [
  { tag: 'THIS WEEK', heading: 'Who is on, who is away', accent: '#3f6f8f',
    body: 'Half the slots in pencil. One crossed out twice and written again underneath.' },
  { tag: 'SEMINARS', heading: 'This term', accent: '#5b6a72',
    body: 'Three of them already past. One has MOVED — SEE EMAIL written across it.' },
  { tag: 'COFFEE FUND', heading: 'Honesty box', accent: '#8a6a1e',
    body: 'A pound a cup. Two pounds if you take the last one and do not make more.' },
  { tag: 'LOST PROPERTY', heading: 'At sign-in', accent: '#5b6a72',
    body: 'One glove. A bike light. A mug with a duck on it, unclaimed for a year.' },
  { tag: 'COHERENCE', heading: 'Five years, by hand', accent: '#3f6f8f',
    body: 'One point a quarter, the ink changing colour where the pen ran out. The flat stretch is labelled: the bad oxide.' },
  { tag: 'FIRE', heading: 'On hearing the alarm', accent: '#b5502f',
    body: 'Nearest exit, assembly at the gate. Do not stop for anything, including a run.' },
  { tag: 'NO CLONING', heading: 'On the photocopier', accent: '#8a6a1e',
    body: 'Somebody printed it, laminated it, and stuck it on at eye height. Nobody has taken it down.' },
  { tag: 'DAYS SINCE', heading: 'We blamed the fridge', accent: '#8a6a1e',
    body: 'Zero. The nought is written over a rubbed-out number, and has been all year.' },
  { tag: 'QUBITS', heading: 'The other kinds', accent: '#3f6f8f',
    body: 'Trapped ion, photonic, spin, neutral atom, topological. Our own column is ringed in marker.' },
  { tag: 'DELFT', heading: 'Their poster, kept', accent: '#5b6a72',
    body: 'Presented at the spring meeting. Displayed here with visible ambivalence.' },
  { tag: 'THE FRIDGE', heading: 'Annotated by hand', accent: '#3f6f8f',
    body: 'A photograph of our own, every stage labelled in marker. The version people actually use.' },
  { tag: 'ENTANGLED', heading: 'Do not separate', accent: '#8a6a1e',
    body: 'Written on two boxes of cable that have stood beside each other for four years.' },
  { tag: 'SEMINAR', heading: 'Thursday, four o\'clock', accent: '#5b6a72',
    body: 'Speaker, title, and an arrow somebody drew to the words free lunch.' },
  { tag: 'REFEREE 2', heading: 'One line highlighted', accent: '#b5502f',
    body: 'The rest of the page unmarked. Everybody in the building knows which line.' },
  { tag: 'BEER MATS', heading: 'Eleven cities', accent: '#5b6a72',
    body: 'Pinned in a grid. Two are from conferences nobody here attended.' },
  { tag: 'FIRST CHIP', heading: 'The one that worked', accent: '#3f6f8f',
    body: 'Framed, crooked, and photographed so badly that the date is the only legible thing on it.' },
  { tag: 'WANTED', heading: 'A two-level system', accent: '#b5502f',
    body: 'Last seen near 4.55 gigahertz. Answers to no name. Do not approach with a qubit.' },
  { tag: 'LIQUID HELIUM', heading: 'Price, five years', accent: '#8a6a1e',
    body: 'A chart going one way only, taped up by somebody who wanted it noticed.' },
];


/**
 * Decorate an outdoor town. Everything generic — benches, bins, posts, signs,
 * fences, tanks, pipe runs, display boards, vehicles — is already in
 * engine/world/kit.js and is placed from site.js. This is for what makes *this*
 * place recognisable.
 *
 * Placement helpers take `(x, z, y)` — ground last. One call written `(x, y, z)`
 * put six display boards sixteen metres in the air.
 *
 * To make a parked vehicle driveable, see themes/contamcity/props.js `park()`.
 */
export function decorate(scene, ctx){
  const { groundHeight } = ctx;
  void scene; void groundHeight;
}

/**
 * Fit out one room.
 *
 * The lab's own objects first — a dilution refrigerator is not a filing cabinet —
 * then the generic layer from `engine/world/interiorKit.js`, which is what stops a
 * room reading as a corridor with a door on it. `pieceDensity.mjs` had these
 * thirteen rooms at three pieces each while every other game's rooms held nine to
 * fifteen; the bar is fifteen and it is measured.
 *
 * `fittings` is passed explicitly rather than left to the kit's name matching,
 * because this building's rooms are specific: the store holds cryogen dewars and
 * the racks room holds microwave racks, and both would otherwise match on the word
 * "store" and "room".
 */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX  = b.xInner + f * 0.5;     // just inside the spine wall

  // What each room of *this* building has in it, in its own words.
  const FITTINGS = {
    ARRIVE: ['monitorBank', 'toolBoard'],
    OFFICE: ['whiteboard', 'monitorBank', 'toolBoard'],
    FAB:    ['sampleStore', 'gasCylinder', 'toolBoard', 'rack'],
    CRYO:   ['dewar', 'gasCylinder', 'pumpSet', 'toolBoard'],
    QUIET:  ['whiteboard', 'monitorBank'],
    SENSE:  ['rack', 'dewar', 'monitorBank', 'toolBoard'],
    STORE:  ['dewar', 'gasCylinder', 'barrel', 'cableDrum'],
    CTRL:   ['monitorBank', 'rack', 'rack', 'whiteboard'],
    RACKS:  ['rack', 'rack', 'rack', 'cableDrum'],
    VER:    ['monitorBank', 'whiteboard', 'rack', 'toolBoard'],
    DESK:   ['monitorBank', 'monitorBank', 'whiteboard'],
    NET:    ['rack', 'rack', 'cableDrum', 'monitorBank'],
    SHIELD: ['rack', 'monitorBank', 'toolBoard'],
  };
  const KIND = {
    ARRIVE: 'reception', OFFICE: 'office', FAB: 'lab', CRYO: 'workroom',
    QUIET: 'quiet', SENSE: 'lab', STORE: 'supply', CTRL: 'station',
    RACKS: 'supply', VER: 'lab', DESK: 'station', NET: 'workroom', SHIELD: 'quiet',
  };

  // The one thing that is this room and nothing else, kept from the original
  // fit-out and placed before the kit fills in around it.
  switch(room.kind){
    case 'reception':
      // A counter you queue at, with a low accessible section.
      box(1.0, 1.05, 4.2, inX + f * 1.9, 0.525, b.cz - 0.6, M.frame);
      hard(inX + f * 1.9, b.cz - 0.6, 1.2, 4.4, 1.1);
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

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    // Inside the room, off the spine wall by enough that nothing lands in the
    // doorway and nothing blocks the working surface above.
    bounds: {
      x0: b.xInner + f * 2.0, x1: b.xOuter - f * 0.55,
      z0: room.z0 + 0.7, z1: room.z1 - 0.7,
    },
    // The wall planes, so the notices hang on walls rather than a metre out in the
    // room where the furniture rectangle starts.
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    kind: KIND[room.id] ?? room.kind ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    seed: `quantum-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand: the engine puts one at the far end of every group
      // room, and furniture standing on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
    ],
    target: 17,
  });

  // Paint, where a room gets it. Low contrast and unframed on purpose: a mural is
  // meant to be seen and not read, which is the opposite of everything else on
  // these walls.
  const MURAL = {
    // The chip's own layout at enormous scale, faint enough to be a texture.
    FAB: { kind: 'lattice', w: 5.2, h: 2.6, ink: '#8a6a1e' },
    // One quiet field of colour and nothing to read. The only wall in the building
    // allowed to say nothing.
    QUIET: { kind: 'wash', w: 4.6, h: 2.4, paper: '#dfe0d8' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      ...MURAL,
    });
  }
}

/**
 * Fit out the spine.
 *
 * A corridor with nothing in it is a corridor nobody works in, and this one is
 * sixty-six metres long. What goes in it is what accumulates in a working
 * building: the cable tray that carries every line in the place, a trolley of
 * helium somebody left, the notice board, the fire points. Nothing stands in the
 * middle — the corridor is how the player gets everywhere.
 */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard } = ctx;
  const sp = plan.spine ?? { z0: -8, z1: 58 };
  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: P.corridorHalfWidth,
    z0: sp.z0, z1: sp.z1,
    seed: 'quantum-spine',
    every: 5,
    // A board every three metres or so. At four and a half, with every doorway
    // skipped, a sixty-metre corridor carried four of them and read as a building
    // that had opened last week.
    signEvery: 3.2,
    signs: CORRIDOR_TEXT,
    hard,
    // Every doorway on both sides: a fire extinguisher across a door is a joke.
    keepClear: (plan.rooms ?? []).map(r => ({ z: (r.z0 + r.z1) / 2, r: 2.4 })),
  });

  const mural = (opts) => paintMural({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    ...opts,
  });
  const wallX = P.corridorHalfWidth - 0.06;

  /**
   * Where the spine wall on one side is actually solid.
   *
   * This is not the whole corridor. A room marked `open: true` has no spine wall
   * except a nib at each end, and every other room has a doorway cut out of the
   * middle of its wall — so a mural painted as one long panel per side hangs in
   * mid-air across the openings, which is exactly what it did: a band at waist
   * height carrying on past the end of the wall it was painted on.
   *
   * `interiorSite.partition()` is where those gaps are cut, and these are the same
   * numbers read back off it.
   */
  const solidSpans = (side) => {
    const out = [];
    const NIB = 0.9;
    for(const r of (plan.rooms ?? []).filter(x => x.side === side)){
      const cz = (r.z0 + r.z1) / 2;
      if(r.open){
        out.push({ z0: r.z0, z1: r.z0 + NIB });
        out.push({ z0: r.z1 - NIB, z1: r.z1 });
      } else {
        const dw = r.door === 'wide' ? P.doorWideW : P.doorW;
        out.push({ z0: r.z0, z1: cz - dw / 2 - 0.06 });
        out.push({ z0: cz + dw / 2 + 0.06, z1: r.z1 });
      }
    }
    // Anything under a metre is a stub of wall, not somewhere to paint.
    return out.filter(sp => sp.z1 - sp.z0 > 1.0);
  };

  /** Paint one kind of mural along whichever bits of a side are wall. */
  const alongWall = (side, opts) => {
    const sign = side === 'w' ? -1 : 1;
    const runZ0 = sp.z0, runZ1 = sp.z1;
    for(const span of solidSpans(side)){
      // Long spans are painted in sections so no single panel is enormous, and
      // each section carries its own slice of the run.
      const len = span.z1 - span.z0 - 0.5;
      const parts = Math.max(1, Math.round(len / 7));
      for(let i = 0; i < parts; i++){
        const w = len / parts;
        const cz = span.z0 + 0.25 + (i + 0.5) * w;
        mural({
          x: sign * wallX, z: cz, faceX: true, toward: -sign,
          w: w - 0.12, paper: '#dfe3e6',
          t0: (cz - w / 2 - runZ0) / (runZ1 - runZ0),
          t1: (cz + w / 2 - runZ0) / (runZ1 - runZ0),
          seed: `${side}-${Math.round(cz)}`,
          ...opts,
        });
      }
    }
  };

  // The temperature gradient, along whichever parts of the west wall are wall:
  // warm at the south end where the people and the coffee are, cold at the north
  // where the fridge is. Nobody in the story admits it is deliberate.
  alongWall('w', { y: 0.95, h: 0.5, kind: 'gradient' });

  // The group's own first spectroscopy trace, along the east wall above head
  // height. The peak falls where it falls.
  alongWall('e', { y: 2.45, h: 0.42, kind: 'spectrum', ink: '#7f8f9a' });

  // And a Bloch sphere three metres across on the end wall, correct up close and
  // decoration from the far end of the corridor.
  // Forward of the end structure, not flat against the last centimetre of it: the
  // rooms' end walls project into the corridor up there and were cutting the
  // sphere down to a vertical strip.
  mural({ x: 0, y: 1.95, z: sp.z1 - 1.25, faceX: false, toward: -1,
    // The wall's own colour behind it, or the panel reads as a poster of a Bloch
    // sphere rather than a Bloch sphere painted on the wall.
    w: 3.4, h: 3.4, kind: 'bloch', ink: '#46535c', paper: '#dfe3e6' });
}
