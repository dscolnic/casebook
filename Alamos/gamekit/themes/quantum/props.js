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
    { style: 'banner', tag: 'VISITORS', heading: 'Sign in at the desk', accent: '#3f6f8f',
      body: 'Badge visible at all times. You must be escorted past the yellow line. '
        + 'Sign out when you leave — the sheet is the fire roll.' },
    { style: 'warning', tag: 'DO NOT BRING IN', heading: 'Beyond this point', accent: '#b5502f',
      body: 'No watches, phones or keys past the shielded room. No loose tools. '
        + 'No food or drink beyond the group office.' },
    { style: 'list', tag: 'FIRE WARDENS', heading: 'Call these first', accent: '#b5502f',
      items: [['Ijeoma Okafor', 'ext 2214'], ['Kofi Mensah', 'ext 2190'],
        ['Anders Holm', 'ext 2233'], ['Site security', 'ext 2000'],
        ['Ambulance', '999 then 2000']],
      body: 'Assembly point: the gate on Hollis Road.' },
    { style: 'grid', tag: 'BADGES', heading: 'Visitor badges 01–24', accent: '#5b6a72',
      body: 'Take one, return it here. 07 has not come back.' },
  ],
  OFFICE: [
    { style: 'grid', tag: 'FORTNIGHT', heading: 'Two weeks to the review', accent: '#b5502f',
      body: 'Red is committed. If it is not on this chart it is not happening first.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Sign the card for Ruth', accent: '#8a6a1e',
      body: 'Pen is on the string. Do not take the pen. Lunch is Friday, one o\'clock.' },
    { style: 'list', tag: 'THE PRINTER', heading: 'Who can actually fix it', accent: '#5b6a72',
      items: [['Ren Nakamura', 'usually'], ['Sara Lindqvist', 'if paper jam'],
        ['Estates, ext 2410', 'if smoke']],
      body: 'In that order. Do not open the back yourself.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'We last blamed the fridge', accent: '#8a6a1e',
      body: '' },
  ],
  FAB: [
    { style: 'banner', tag: 'GOWNING', heading: 'Overshoes, hood, coverall, gloves',
      accent: '#8a6a1e',
      body: 'In that order, every time. Gloves last and they do not leave the bay. '
        + 'If you touch the door handle, change them.' },
    { style: 'warning', tag: 'NO PAPER', heading: 'Past this line', accent: '#b5502f',
      body: 'Notebooks stay outside. Use the terminal. This includes the crossword.' },
    { style: 'grid', tag: 'BAY BOOKING', heading: 'Evaporator, this week', accent: '#3f6f8f',
      body: 'Initial the slot before you start. Two hours maximum without asking.' },
    { style: 'chart', tag: 'JUNCTION RESISTANCE', heading: 'Coupon, run 41 — spread is 2× normal',
      accent: '#8a6a1e', body: 'Target 11.4 kΩ. Anything outside 10.2–12.6 is scrapped.' },
    { style: 'photo', tag: 'RUN 38', heading: 'The feature at 4.55 GHz, three chips',
      accent: '#5b6a72', body: 'Same process window. Ringed in green. Do not tune here.' },
  ],
  CRYO: [
    { style: 'warning', tag: 'DANGER', heading: 'Oxygen deficiency hazard', accent: '#b5502f',
      body: 'Helium and nitrogen displace air without warning or smell. Never transfer alone. '
        + 'If the monitor reads below 19.5 per cent, leave and prop the door.' },
    { style: 'grid', tag: 'FRIDGE TIME', heading: 'Booked in four-day slots', accent: '#3f6f8f',
      body: 'Warm-up and cooldown is four days. Take the whole slot or take none of it.' },
    { style: 'chart', tag: 'COOLDOWN', heading: '300 K to 11 mK, the good run', accent: '#5b6a72',
      body: 'Sixty-one hours. Still the one to compare against.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Label your dewar', accent: '#8a6a1e',
      body: 'Returns go Thursday. Unlabelled ones come back to you, full, next week.' },
    { style: 'tally', tag: 'COOLDOWNS', heading: 'This year', accent: '#5b6a72', body: '' },
  ],
  QUIET: [
    { style: 'banner', tag: 'VIVA', heading: 'Friday, 2 p.m., this room', accent: '#3f6f8f',
      body: 'Anders Holm, on coherence limits in the twelve-qubit device. '
        + 'Bring a chair — the room seats nine.' },
    { style: 'sticky', tag: 'PLEASE', heading: 'Reshelve what you take', accent: '#5b6a72',
      body: 'The trolley by the door is for anything you cannot find a place for.' },
    { style: 'sticky', tag: 'LEAVE IT', heading: 'The jigsaw is not finished', accent: '#8a6a1e',
      body: 'Nobody knows whose it is. It has been three months. Do not tidy it away.' },
  ],
  SENSE: [
    { style: 'grid', tag: 'CALIBRATION', heading: 'Against the reference, monthly',
      accent: '#3f6f8f',
      body: 'Before any measurement anybody has asked for. Ratio goes in the log, signed.' },
    { style: 'photo', tag: 'THANK YOU', heading: 'From the Royal Ashwell paediatric study',
      accent: '#1f8a4c', body: 'Third year of monthly data. Signed by the whole department.' },
    { style: 'banner', tag: 'QUIET PLEASE', heading: 'Measurement in progress',
      accent: '#b5502f',
      body: 'When this is on the door, no lifts, no trolleys, no doors on this corridor. '
        + 'An acquisition is forty minutes.' },
    { style: 'chart', tag: 'SENSITIVITY', heading: 'Resolvable field against averaging time',
      accent: '#5b6a72', body: 'Best at about thirty-five seconds. Past that, drift wins.' },
  ],
  STORE: [
    { style: 'grid', tag: 'CYLINDER STOCK', heading: 'Full and empty, by gas', accent: '#5b6a72',
      body: 'Mark the board when you take one. Empties to the left-hand rack.' },
    { style: 'warning', tag: 'CHAIN EVERY CYLINDER', heading: 'Top and bottom',
      accent: '#b5502f',
      body: 'A falling cylinder took the door off its hinges in March. Both chains, every time.' },
    { style: 'banner', tag: 'DELIVERIES', heading: 'Tuesday and Friday mornings',
      accent: '#3f6f8f',
      body: 'Gate code on request from sign-in. Do not prop the outer door open for them.' },
  ],
  CTRL: [
    { style: 'banner', tag: 'HANDOVER', heading: 'Written, every shift', accent: '#3f6f8f',
      body: 'What is running, what is calibrated, what you changed and why. '
        + 'Blank forms on the clip. A verbal handover is not a handover.' },
    { style: 'warning', tag: 'DO NOT SWITCH OFF', heading: 'Socket 4, under the bench',
      accent: '#b5502f',
      body: 'The reference oscillator. It takes two days to settle after a power cut.' },
    { style: 'list', tag: 'BEST T₂', heading: 'By qubit, this quarter', accent: '#8a6a1e',
      items: [['Q3', '38 µs  A.H.'], ['Q7', '36 µs  K.M.'], ['Q1', '34 µs  A.H.'],
        ['Q11', '33 µs  R.N.'], ['Q12', '19 µs  —']],
      body: 'Microseconds. Beat one and cross it out.' },
    { style: 'photo', tag: 'FIRST FRINGE', heading: 'Rabi oscillation, 14 March',
      accent: '#5b6a72', body: 'Qubit 3, 84 ns period. K.M. and A.H., at four in the morning.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Darts: not during a run', accent: '#8a6a1e',
      body: 'You know who you are. The board comes down next time.' },
  ],
  RACKS: [
    { style: 'grid', tag: 'CABLE LOAN', heading: 'Sign it out, bring it back',
      accent: '#3f6f8f',
      body: 'Semi-rigid lines are numbered. Six are out. Two have been out since spring.' },
    { style: 'warning', tag: 'BROKEN', heading: 'Tagged units do not go back in',
      accent: '#b5502f',
      body: 'Tag it, log it, tell Ren. An untagged fault costs somebody a day.' },
    { style: 'list', tag: 'TORQUE', heading: 'SMA connectors, by type', accent: '#5b6a72',
      items: [['SMA, brass', '56 N·cm'], ['SMA, stainless', '90 N·cm'],
        ['2.92 mm', '90 N·cm'], ['Semi-rigid', 'hand tight, then 1/8']],
      body: 'Use the wrench, not your fingers.' },
    { style: 'sticky', tag: 'BEFORE YOU ASK', heading: 'Have you tried', accent: '#8a6a1e',
      body: 'Retuning. Recooling. Recalibrating. Going home and coming back.' },
  ],
  VER: [
    { style: 'chart', tag: 'CIRCUIT FIDELITY', heading: 'Same circuit, three sessions',
      accent: '#3f6f8f', body: 'Differences ringed. None of them is within its own error bar.' },
    { style: 'banner', tag: 'REPORTING', heading: 'What travels with a number',
      accent: '#5b6a72',
      body: 'Method. Sample size. Uncertainty, and how it was estimated. '
        + 'A figure without all three does not leave this room.' },
    { style: 'chart', tag: 'ERROR BUDGET', heading: 'Where the fidelity goes', accent: '#8a6a1e',
      body: 'Readout, gates, decoherence, and one slice nobody has named yet.' },
    { style: 'banner', tag: 'CHSH', heading: 'S = 2.78 ± 0.04', accent: '#b5502f',
      body: 'Local hidden variables obey |S| ≤ 2. Quantum mechanics permits 2√2 ≈ 2.83. '
        + 'On-chip, so this is a demonstration and not a loophole-free test.' },
    { style: 'sticky', tag: 'DO NOT ERASE', heading: 'The board behind you', accent: '#5b6a72',
      body: 'Third time it has been wiped. The permanent marker was me. Sorry. — R.' },
  ],
  DESK: [
    { style: 'sticky', tag: 'THESE ARE NOT', heading: 'Error bars', accent: '#b5502f',
      body: 'They are the spread of three runs. Say which you mean on every axis label.' },
    { style: 'chart', tag: 'WHY', heading: 'This step, every session since June',
      accent: '#8a6a1e', body: 'Nobody has explained it. Ask before you fit through it.' },
    { style: 'sticky', tag: 'HEADPHONES ON', heading: 'Means ask me later', accent: '#3f6f8f',
      body: 'Unless the fridge is warming, in which case interrupt.' },
    { style: 'list', tag: 'ANALYSIS', heading: 'Who owns which script', accent: '#5b6a72',
      items: [['fit_t1t2.py', 'Holm'], ['rb_decay.py', 'Petrova'],
        ['discriminator.py', 'Castellan'], ['chsh.py', 'Holm'], ['plots/', 'everyone']],
      body: 'Do not edit someone else\'s in place. Branch it.' },
  ],
  NET: [
    { style: 'warning', tag: 'KEY MATERIAL', heading: 'Nothing leaves on removable media',
      accent: '#b5502f',
      body: 'No exceptions, including yours. Requests are refused in writing and the '
        + 'refusal is logged. The form is in the tray.' },
    { style: 'list', tag: 'LOSS BUDGET', heading: 'Measured, not from the datasheet',
      accent: '#3f6f8f',
      items: [['Fibre, per km', '0.19 dB'], ['Connector', '0.28 dB'],
        ['Fusion splice', '0.03 dB'], ['Patch panel', '0.6 dB'], ['Total, Ashwell', '3.1 dB']],
      body: 'Re-measure after any work in the plant room.' },
    { style: 'photo', tag: 'FIRST LINK', heading: 'Ashwell to the exchange, 9 km',
      accent: '#5b6a72', body: 'Lit at 03:40. Sadiq and the contractor, in a plant room.' },
    { style: 'sticky', tag: 'LABELLED', heading: 'Entangled — do not separate',
      accent: '#8a6a1e', body: 'Two boxes. They are a matched pair and they stay together.' },
  ],
  SHIELD: [
    { style: 'warning', tag: 'CLOSE THE DOOR', heading: 'Behind you, every time',
      accent: '#b5502f',
      body: 'The shield is only a shield when it is shut. Check the latch has seated. '
        + 'Nothing else is posted in this room, on purpose.' },
  ],
};

/** The corridor's own boards: building-wide, and the ones everybody walks past. */
const CORRIDOR_TEXT = [
  { style: 'grid', tag: 'THIS WEEK', heading: 'Who is in, who is away', accent: '#3f6f8f',
    body: 'Write your own name in. Pencil, so the next person can move it.' },
  { style: 'list', tag: 'SEMINARS', heading: 'Thursdays at four, lecture room B',
    accent: '#5b6a72',
    items: [['Delft — readout', 'past'], ['Materials group', 'past'],
      ['E. Barros — sensing', 'this week'], ['A. Holm — benchmarking', 'next'],
      ['M. Castellan', 'moved, see email']],
    body: 'Coffee from half past three.' },
  { style: 'chart', tag: 'COFFEE FUND', heading: 'Balance since January', accent: '#8a6a1e',
    body: 'A pound a cup. Two if you take the last one and do not make more.' },
  { style: 'banner', tag: 'LOST PROPERTY', heading: 'At the sign-in desk', accent: '#5b6a72',
    body: 'One glove. A bike light. A mug with a duck on it, unclaimed since last winter. '
      + 'Anything left past the end of term goes to the charity shop.' },
  { style: 'chart', tag: 'COHERENCE', heading: 'Best T₂, five years, by quarter',
    accent: '#3f6f8f',
    body: 'Updated by hand. The flat stretch in year three is the oxide change.' },
  { style: 'warning', tag: 'FIRE', heading: 'Leave by the nearest exit', accent: '#b5502f',
    body: 'Assembly at the Hollis Road gate. Do not stop for a running measurement. '
      + 'Wardens are listed at sign-in.' },
  { style: 'sticky', tag: 'ON THE COPIER', heading: 'No cloning', accent: '#8a6a1e',
    body: 'It has been there four years. Nobody is taking it down.' },
  { style: 'tally', tag: 'DAYS SINCE', heading: 'We blamed the fridge', accent: '#8a6a1e',
    body: '' },
  { style: 'grid', tag: 'QUBIT MODALITIES', heading: 'Who is doing what, worldwide',
    accent: '#3f6f8f',
    body: 'Superconducting, trapped ion, photonic, spin, neutral atom, topological. '
      + 'Ours is column one.' },
  { style: 'photo', tag: 'DELFT', heading: 'Their poster from the spring meeting',
    accent: '#5b6a72', body: 'Kept up deliberately. Read it before you argue about it.' },
  { style: 'photo', tag: 'THE FRIDGE', heading: 'Ours, with the shields off',
    accent: '#3f6f8f', body: 'Every stage labelled. Taken the week it was installed.' },
  { style: 'list', tag: 'FIRST AID', heading: 'Trained staff', accent: '#1f8a4c',
    items: [['Grace Whitfield', 'ext 2251'], ['Ren Nakamura', 'ext 2207'],
      ['Priya Raghavan', 'ext 2180'], ['Cold burns', 'see the green card']],
    body: 'Kits at sign-in and in the cryogen store.' },
  { style: 'banner', tag: 'WANTED', heading: 'One two-level system', accent: '#b5502f',
    body: 'Last seen near 4.55 GHz on three chips from the same process window. '
      + 'Answers to no name. Do not tune a qubit into it.' },
  { style: 'chart', tag: 'LIQUID HELIUM', heading: 'Price per litre, five years',
    accent: '#8a6a1e', body: 'This is why the recovery line matters. Do not vent.' },
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
    wallThickness: ctx.P.wall,
    // And where those planes are actually solid. The spine face is the one with
    // holes in it: a doorway in the middle of every closed room, and nothing at all
    // across an open one but a nib at each end. Signs were hanging in both.
    wallOk: (x, z) => {
      // Cross-walls exist at every room's z0, and at the far end of the last room
      // on each side. A room whose z1 nothing adjoins — Cryogenics, with a gap
      // between it and the Reading Room — has no wall at that end, and notices hung
      // on it stood in the gap.
      const mine = (ctx.plan?.rooms ?? []).filter(r2 => r2.side === room.side);
      const last = mine[mine.length - 1];
      const crossAt = (zz) => mine.some(r2 => Math.abs(r2.z0 - zz) < 0.06)
        || (last && Math.abs(last.z1 - zz) < 0.06);
      if(Math.abs(z - room.z0) < 0.4 && !crossAt(room.z0)) return false;
      if(Math.abs(z - room.z1) < 0.4 && !crossAt(room.z1)) return false;
      // The spine face is the one with the doorway in it, and an open room has no
      // spine face at all beyond a nib at each end.
      const onSpine = Math.abs(x - b.xInner) < 0.4;
      if(!onSpine) return true;
      const NIB = 0.9;
      if(room.open) return z < room.z0 + NIB || z > room.z1 - NIB;
      const dw = room.door === 'wide' ? ctx.P.doorWideW : ctx.P.doorW;
      return Math.abs(z - b.cz) > dw / 2 + 0.2;
    },
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

  /** Is the spine wall solid on this side, at this z? */
  const solidAt = (side, z) => solidSpans(side).some(sp2 => z > sp2.z0 + 0.35 && z < sp2.z1 - 0.35);

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: P.corridorHalfWidth,
    // The walls are centred on the corridor half-width, so the kit needs the
    // thickness to find the face the player actually sees.
    wallThickness: P.wall,
    z0: sp.z0, z1: sp.z1,
    seed: 'quantum-spine',
    every: 5,
    // A board every three metres or so. At four and a half, with every doorway
    // skipped, a sixty-metre corridor carried four of them and read as a building
    // that had opened last week.
    signEvery: 3.2,
    signs: CORRIDOR_TEXT,
    hard,
    // No blanket keep-out at the doorways any more. It was applied to both sides
    // at once — a door on the west blocked the east wall too — and with thirteen
    // rooms at 2.4 m each it excluded sixty-two of the corridor's sixty-six metres.
    // Seven boards survived it. `wallOk` already knows where each side's doorways
    // are, because it is built from the same spans the walls are cut with.
    keepClear: [],
    wallOk: (x, z) => solidAt(x < 0 ? 'w' : 'e', z),
  });

  const mural = (opts) => paintMural({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    ...opts,
  });
  const wallX = P.corridorHalfWidth - 0.06;

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
  //
  // It was drawn 3.4 m tall centred at 1.95, which runs from 0.25 up to 3.65 in a
  // corridor whose ceiling is at 3.2 — so the top of it was inside the slab, and
  // the fix at the time was to pull the whole panel 1.25 m forward of the wall,
  // where it hung in the middle of the corridor on nothing. Sized to the corridor
  // instead, it goes back on the wall it is supposed to be painted on.
  mural({ x: 0, y: 1.68, z: sp.z1 - ctx.P.wall / 2 - 0.03, faceX: false, toward: -1,
    // The wall's own colour behind it, or the panel reads as a poster of a Bloch
    // sphere rather than a Bloch sphere painted on the wall.
    w: 2.9, h: 2.9, kind: 'bloch', ink: '#46535c', paper: '#dfe3e6' });
}
