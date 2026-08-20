// props.js — the objects unique to this theme.
//
// Anything generic (worktops, racks, trolleys, cylinders, notices) comes from
// engine/world/interiorKit.js. This file says what is in each room of *this*
// building, what is written on its walls, and what the corridor looks like.
//
// The place is one gowned corridor with six process bays off it. Two things
// make it read as a fab rather than as a laboratory corridor: everything is
// behind a gown room, and the litho end is lit amber because the coating in
// there answers to blue and shorter.

import * as THREE from 'three';
import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural }
  from '../../engine/world/interiorKit.js';

/**
 * The amber ceiling of the litho bay.
 *
 * This is the one thing that makes the place look like a fab rather than a
 * laboratory corridor, and it is a fact about the chemistry: the coating
 * responds to blue and shorter, so the bay is lit with everything above 500
 * nanometres filtered out and the room is the colour of what is left.
 *
 * Emissive panels rather than lights — house rule 2. Twenty-eight real point
 * lights took one build from 118 fps to 20, and a room lit by emissive ceiling
 * tiles is indistinguishable at this scale.
 */
function amberCeiling(ctx, room, b){
  const { scene, P, lightPanels } = ctx;
  const mat = new THREE.MeshStandardMaterial({
    color: 0xf0c246, emissive: 0xe8b32e, emissiveIntensity: 0.95,
    roughness: 0.35, metalness: 0.0,
  });
  const h = (P.tileH ?? 2.75) - 0.02;
  const x0 = Math.min(b.xInner, b.xOuter), x1 = Math.max(b.xInner, b.xOuter);
  // Four wide panels down the length of the bay rather than one slab, so the
  // ceiling still reads as a ceiling grid with the colour in it.
  for(let i = 0; i < 4; i++){
    const cz = room.z0 + (i + 0.5) * (room.z1 - room.z0) / 4;
    const g = new THREE.BoxGeometry(Math.abs(x1 - x0) - 1.2, 0.05, (room.z1 - room.z0) / 4 - 0.9);
    const m = new THREE.Mesh(g, mat);
    m.position.set((x0 + x1) / 2, h, cz);
    scene.add(m);
    lightPanels?.push(m);
  }
}

/**
 * What is on the walls, room by room.
 *
 * Nine parts earnest and one joke per room. A player goes past at 1.4 m/s, so
 * every one of these has to land at walking pace: a tag, a heading, and a body
 * somebody would actually have typed.
 */
const WALL_TEXT = {
  ARRIVE: [
    { style: 'banner', tag: 'GOWNING', heading: 'Overshoes, hood, coverall, gloves', accent: '#8a6a1e',
      body: 'In that order, every time. Gloves last, and they do not leave the bay. '
        + 'If you touch a door handle, change them.' },
    { style: 'warning', tag: 'DO NOT BRING IN', heading: 'Past the yellow line', accent: '#b5502f',
      body: 'No paper, no pencils, no cardboard. No cosmetics. Nothing that sheds. '
        + 'A person at rest sheds a hundred thousand particles a minute, which is what the suit is for.' },
    { style: 'list', tag: 'CALL FIRST', heading: 'Gas release, any bay', accent: '#b5502f',
      items: [['Lena Vance', 'ext 4180'], ['Fab control', 'ext 4100'],
        ['Site emergency', 'ext 4000'], ['Ambulance', '999 then 4000']],
      body: 'Assembly point: the gatehouse on Ardley Road. Do not go back for the lot.' },
    { style: 'grid', tag: 'SUIT SIZES', heading: 'Large is out again', accent: '#5b6a72',
      body: 'Order goes in Thursdays. Two people are wearing extra-large and know who they are.' },
  ],
  WAFER: [
    { style: 'grid', tag: 'INCOMING', heading: 'Lots 38 to 52, this quarter', accent: '#3f6f8f',
      body: 'Signed for against the certificate. A lot with no certificate does not come off the dock.' },
    { style: 'warning', tag: 'RETAINED SAMPLES', heading: 'Sealed means sealed', accent: '#b5502f',
      body: 'One box a lot, unopened. It is the only material in this building that has been through '
        + 'no tool, and it is the only thing that settles an argument six weeks later.' },
    { style: 'chart', tag: 'RESISTIVITY', heading: 'Every lot inside 8 to 12 ohm centimetre', accent: '#5b6a72',
      body: 'Fifteen lots, fifteen passes. The certificate has no field for anything else.' },
    { style: 'sticky', tag: 'NOTE', heading: 'The scanner is in the wrong bay', accent: '#8a6a1e',
      body: 'Again. If you borrow it, bring it back — the dock cannot book anything in without it.' },
  ],
  ATOM: [
    { style: 'banner', tag: 'SPECTROMETER', heading: 'Booked in four-hour blocks', accent: '#3f6f8f',
      body: 'Pump-down is ninety minutes of that. Take the whole block or take none of it, and '
        + 'initial the sheet before you load.' },
    { style: 'chart', tag: 'SILICON 2p', heading: 'Lattice at 99.2, oxide four across', accent: '#8a6a1e',
      body: 'Same shell, two chemical states. The gap is the finding; the areas are the quantity.' },
    { style: 'warning', tag: 'NO GLOVES ON THE STAGE', heading: 'Handle by the edge', accent: '#b5502f',
      body: 'Everything this instrument measures is in the top nanometre, and a fingerprint is '
        + 'about a thousand of them.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Somebody blamed the instrument', accent: '#5b6a72', body: '' },
  ],
  LITHO: [
    { style: 'warning', tag: 'AMBER ONLY', heading: 'No white light past this door', accent: '#b5502f',
      body: 'The coating answers to blue and shorter. A torch, a phone screen or a propped door '
        + 'exposes every wafer on the track.' },
    { style: 'grid', tag: 'QUEUE TIME', heading: 'Bench to coater: thirty minutes', accent: '#8a6a1e',
      body: 'Measured from the last rinse. Over that and the lot goes back to the wet bench.' },
    { style: 'chart', tag: 'EXPOSURE', heading: '248 nanometres, and the bay at 580', accent: '#3f6f8f',
      body: 'Brightness is not the variable. Wavelength is.' },
    { style: 'sticky', tag: 'PLEASE', heading: 'Log the develop bath', accent: '#5b6a72',
      body: 'Whoever changed it on Tuesday and wrote nothing: we know it was changed.' },
  ],
  DEP: [
    { style: 'warning', tag: 'PYROPHORIC', heading: 'Silane burns on contact with air', accent: '#b5502f',
      body: 'No line is opened without a purge and a second person. The cabinet alarm means leave '
        + 'by the corridor, not by the subfab stair.' },
    { style: 'chart', tag: 'FURNACE 3', heading: 'Setpoint 720, stage reading 702', accent: '#8a6a1e',
      body: 'Since the controller change in February. Nothing else on the tool moved.' },
    { style: 'grid', tag: 'CHAMBER', heading: 'One millitorr, and why', accent: '#3f6f8f',
      body: 'Five centimetres between collisions in a chamber thirty across. Below that, chemistry '
        + 'happens in mid-air and lands as particles.' },
    { style: 'list', tag: 'PRECURSORS', heading: 'On the line this quarter', accent: '#5b6a72',
      items: [['Silane', 'four Si–H bonds'], ['Ammonia', 'one lone pair'],
        ['Dichlorosilane', 'hotter, and worth it'], ['Argon', 'purge only']],
      body: 'Bond enthalpy sets the temperature. The temperature sets everything else.' },
  ],
  DOPE: [
    { style: 'banner', tag: 'THE IMPURITY IS THE PRODUCT', heading: 'Group 13 one way, group 15 the other',
      accent: '#8a6a1e',
      body: 'One electron short leaves a gap; one over leaves an electron. Everywhere else in this '
        + 'building an impurity is a defect. Here it is the reason the wafer works.' },
    { style: 'chart', tag: 'DOSE', heading: 'Delivered spread against the customer band', accent: '#b5502f',
      body: 'Four hundred wafers. The middle is off and the width is worse.' },
    { style: 'grid', tag: 'IN ATOMS', heading: 'Five parts per billion is 2.5e14 per cubic centimetre',
      accent: '#3f6f8f', body: 'Which is why the incoming limit is where it is. Ratios flatter; counts do not.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Beam current before species', accent: '#5b6a72',
      body: 'Read the current first. It has caught two wrong recipes and nothing else has caught any.' },
  ],
  WET: [
    { style: 'warning', tag: 'ACIDS', heading: 'Face shield, apron, both gloves', accent: '#b5502f',
      body: 'Add acid to water and never the other way. The eyewash is at the end of the bench and '
        + 'it is tested Mondays.' },
    { style: 'banner', tag: 'A CLEAN SURFACE IS AN EVENT', heading: 'Not a state', accent: '#8a6a1e',
      body: 'Bare silicon has bonds reaching nothing, and the air satisfies them in minutes. '
        + 'Everything after a strip is racing that.' },
    { style: 'grid', tag: 'BATH LOG', heading: 'Cycles since the last change', accent: '#3f6f8f',
      body: 'Write the number, not a tick. A tick is how we lost six weeks of history in March.' },
    { style: 'photo', tag: 'POLISH', heading: 'Wide feature dished, narrow one flat', accent: '#5b6a72',
      body: 'Same pad, same pressure, same wafer. Ringed in green.' },
  ],
  STORE: [
    { style: 'grid', tag: 'SHELF LIFE', heading: 'Everything here has a date on it', accent: '#3f6f8f',
      body: 'Front of shelf is oldest. If the date has gone, it goes to waste, not back on the shelf.' },
    { style: 'warning', tag: 'SEGREGATION', heading: 'Acids left, bases right, solvents in the cabinet',
      accent: '#b5502f', body: 'Nothing shares a tray. Nothing is decanted into an unlabelled bottle.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Take the whole box or none of it', accent: '#8a6a1e',
      body: 'Half a box is how stock control decides we have plenty.' },
  ],
  DESK: [
    { style: 'grid', tag: 'FIFTEEN DAYS', heading: 'To the qualification lot', accent: '#b5502f',
      body: 'Red is committed. If it is not on this chart it is not happening first.' },
    { style: 'chart', tag: 'YIELD', heading: 'Since the second week of March', accent: '#8a6a1e',
      body: 'Four in ten. Two explanations on the board and neither of them covers all of it.' },
    { style: 'list', tag: 'ARGUING', heading: 'Who thinks what', accent: '#3f6f8f',
      items: [['Ferreira', 'the substrate is not what it says'], ['Ostrowski', 'a recipe has drifted'],
        ['Hale', 'bring a measurement']],
      body: 'Both of the first two have been right about something before.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Nobody has washed a mug in here', accent: '#5b6a72',
      body: 'Since the shutdown. The kettle is fair game; the mugs are somebody\'s.' },
  ],
  QUIET: [
    { style: 'banner', tag: 'QUIET ROOM', heading: 'The only door on this floor that shuts', accent: '#3f6f8f',
      body: 'No tools, no calls, no lot numbers. Ten minutes is enough and everybody knows it.' },
    { style: 'sticky', tag: 'PLEASE', heading: 'Put the chair back', accent: '#5b6a72',
      body: 'Facing the window. It is the only window.' },
  ],
  BACK: [
    { style: 'warning', tag: 'SUBFAB', heading: 'Hearing protection below this landing', accent: '#b5502f',
      body: 'Pumps, abatement and six hundred metres of gas line. Nothing down there is quiet and '
        + 'nothing down there is cold.' },
    { style: 'grid', tag: 'GAS LINES', heading: 'Six stations, each with a tap', accent: '#3f6f8f',
      body: 'Cylinder, regulator, purifier, manifold, long run, chamber inlet. In that order, always.' },
    { style: 'sticky', tag: 'NOTE', heading: 'The manifold was rebuilt in February', accent: '#8a6a1e',
      body: 'By a contractor who has since left. The work order says it was tested.' },
  ],
};

/** What the corridor itself says, between the bays. */
const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'CLASS 100', heading: 'Walk, do not stride', accent: '#3f6f8f',
    body: 'Fast movement lifts what has settled. The corridor is sixty metres and nothing here is urgent enough.' },
  { style: 'warning', tag: 'AIRLOCK', heading: 'One door at a time', accent: '#b5502f',
    body: 'Both open is a pressure loss, and a pressure loss is the whole floor.' },
  { style: 'grid', tag: 'LOT ROUTING', heading: 'Store, litho, deposition, implant, wet, metrology',
    accent: '#8a6a1e', body: 'Forty times before it is a chip. The route is on the traveller, not on the wall.' },
  { style: 'sticky', tag: 'NOTE', heading: 'Carts left in the corridor get moved', accent: '#5b6a72',
    body: 'To the subfab stair. Ask Bramall where yours went.' },
  { style: 'chart', tag: 'PARTICLE COUNT', heading: 'Bay by bay, this shift', accent: '#3f6f8f',
    body: 'Litho is always the best of them, which is what the gowning is buying.' },
  { style: 'tally', tag: 'DAYS SINCE', heading: 'A door was propped open', accent: '#b5502f', body: '' },
];

/** Nothing outdoors in this game. */
export function decorate(scene, ctx){ void scene; void ctx; }

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  // A fab bay is a tool and the things that feed it, so every process room gets
  // gas cylinders and a rack whatever else is in it.
  const FITTINGS = {
    ARRIVE: ['toolBoard', 'shelfUnit', 'monitorBank'],
    WAFER:  ['sampleStore', 'rack', 'toolBoard', 'sampleStore'],
    ATOM:   ['monitorBank', 'rack', 'pumpSet', 'toolBoard'],
    LITHO:  ['sampleStore', 'monitorBank', 'toolBoard', 'rack'],
    DEP:    ['gasCylinder', 'pumpSet', 'rack', 'toolBoard'],
    DOPE:   ['rack', 'monitorBank', 'gasCylinder', 'toolBoard'],
    WET:    ['barrel', 'sampleStore', 'toolBoard', 'gasCylinder'],
    STORE:  ['barrel', 'gasCylinder', 'cableDrum', 'toolBoard'],
    DESK:   ['monitorBank', 'monitorBank', 'whiteboard'],
    QUIET:  ['whiteboard', 'monitorBank'],
    BACK:   ['pumpSet', 'cableDrum', 'barrel', 'gasCylinder'],
  };

  // The one thing that is this room and nothing else, placed before the kit
  // fills in around it.
  switch(room.kind){
    case 'reception':
      // The gowning bench, which everybody sits on to get the overshoes on.
      box(1.0, 0.48, 5.0, inX + f * 1.9, 0.24, b.cz - 0.6, M.frame);
      hard(inX + f * 1.9, b.cz - 0.6, 1.2, 5.2, 0.6);
      break;
    case 'workroom':
    case 'lab':
    case 'station':
      // The tool's load port: a working surface along the spine wall, which is
      // also where the room's instrument screen and case stand go.
      box(0.62, 0.95, 3.4, inX + f * 0.9, 0.475, b.cz, M.frame);
      hard(inX + f * 0.9, b.cz, 0.8, 3.6, 1.0);
      break;
    default:
      break;
  }

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    bounds: {
      x0: b.xInner + f * 2.0, x1: b.xOuter - f * 0.55,
      z0: room.z0 + 0.7, z1: room.z1 - 0.7,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: ctx.P.wall,
    // Where those planes are actually solid: a doorway in the middle of every
    // closed room, and nothing but a nib at each end of an open one. A notice
    // hung across a doorway is the mistake this predicate exists to stop.
    wallOk: (x, z) => {
      const mine = (ctx.plan?.rooms ?? []).filter(r2 => r2.side === room.side);
      const last = mine[mine.length - 1];
      const crossAt = (zz) => mine.some(r2 => Math.abs(r2.z0 - zz) < 0.06)
        || (last && Math.abs(last.z1 - zz) < 0.06);
      if(Math.abs(z - room.z0) < 0.4 && !crossAt(room.z0)) return false;
      if(Math.abs(z - room.z1) < 0.4 && !crossAt(room.z1)) return false;
      const onSpine = Math.abs(x - b.xInner) < 0.4;
      if(!onSpine) return true;
      const NIB = 0.9;
      if(room.open) return z < room.z0 + NIB || z > room.z1 - NIB;
      const dw = room.door === 'wide' ? ctx.P.doorWideW : ctx.P.doorW;
      return Math.abs(z - b.cz) > dw / 2 + 0.2;
    },
    kind: room.kind ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    seed: `yellowbay-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // The case stand at the far end of every group room. Furniture standing on
      // it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
    ],
    target: 17,
  });

  // The litho bay is lit amber, which is the whole reason it has its name.
  if(room.id === 'LITHO') amberCeiling(ctx, room, b);

  // Paint, in the two rooms that get it. Seen and not read, which is the
  // opposite of everything else on these walls.
  const MURAL = {
    // The die layout at enormous scale, faint enough to be a texture.
    LITHO: { kind: 'lattice', w: 5.4, h: 2.6, ink: '#8a6a1e' },
    QUIET: { kind: 'wash', w: 4.4, h: 2.3, paper: '#e2ded0' },
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
 * Sixty-four metres of gowned corridor. What accumulates in one is the cable
 * tray, a cart somebody left, the notice boards and the fire points — and
 * nothing in the middle, because the corridor is how the player gets anywhere.
 */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard } = ctx;
  const sp = plan.spine ?? { z0: -6, z1: 58 };

  /**
   * Where the spine wall on one side is actually solid. An open room has no
   * spine wall except a nib at each end, and every other room has a doorway cut
   * out of the middle — so a board hung without this check stands in mid-air
   * across an opening. These are the same numbers `interiorSite.partition()`
   * cuts the walls with.
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
    return out.filter(s => s.z1 - s.z0 > 1.0);
  };
  const solidAt = (side, z) => solidSpans(side).some(s => z > s.z0 + 0.35 && z < s.z1 - 0.35);

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: P.corridorHalfWidth,
    wallThickness: P.wall,
    z0: sp.z0, z1: sp.z1,
    seed: 'yellowbay-spine',
    every: 5,
    signEvery: 3.2,
    signs: CORRIDOR_TEXT,
    hard,
    keepClear: [],
    wallOk: (x, z) => solidAt(x < 0 ? 'w' : 'e', z),
  });
}
