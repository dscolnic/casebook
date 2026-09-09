// props.js — the objects that make the Fenwick Coordinating Centre itself.
//
// Anything generic (worktops, chairs, cabinets, shelving, crates, notices) comes
// from engine/world/interiorKit.js through `furnishRoom`. This file is the ten
// or so things that are this building and nowhere else:
//
//   · the kit warehouse — aisles of numbered boxes, which is what allocation
//     concealment looks like when you can walk down it;
//   · the cold room door, with its logger chart;
//   · the infusion bay's recliners, curtain rails, drip stands and drug fridge;
//   · the data floor's desk pods, cubicle screens and monitors;
//   · the CONSORT flow chart the data floor faces, and the enrolment wall beside
//     it, one card per site;
//   · the mesh cage round the trial master file, and the one red door in the
//     building.
//
// Interior hooks get the builder context from engine/world/interiorSite.js:
//   { scene, plan, geo, P, box, wall, materials, soft, hard, addInteractable,
//     lightPanels, bounds, opening }
//
// ## Three floors, three finishes
//
// The shell comes off one `METRICS.palette`, so straight out of the builder the
// clinic, the working floor and the unblinded floor are the same beige corridor
// three times over and the only thing telling them apart is the number on the
// blade sign. That is a real defect in a building whose whole argument is that
// **the walk from the patient to the number is a climb** — if the climb changes
// nothing you can see, the argument is a caption.
//
// So the difference is put on top of the shell, in these hooks, and it is a
// difference in *fit-out* rather than in palette:
//
//   Level 0, the clinic         handrail, wall guard and a painted dado down
//                               both corridor walls; a crash cart; a drug
//                               fridge; curtain rails and drip stands over the
//                               recliners in the infusion bay.
//   Level 1, the working floor  carpet — a runner down the corridor and a patch
//                               under the whole data floor; back-to-back bench
//                               desks behind cubicle screens, with monitors;
//                               a photocopier; pinboards of printed sheets.
//   Level 2, past the firewall  a hazard line across the floor at the head of
//                               the stair; a badge reader beside every door; a
//                               red door on Randomisation; a mesh cage round the
//                               master file; a charcoal skirting; and fewer
//                               notices than either floor below, because the
//                               floor where nobody may say anything is the floor
//                               with least written on its walls.
import * as THREE from 'three';
import { furnishRoom, furnishCorridor, furnishingMaterials, markWallMounted, markStructure,
  paintMural, spineSolidSpans }
  from '../../engine/world/interiorKit.js';
import { LEVELS } from './plan.js';
import { dressRoom, dressSpine } from './story.js';

/**
 * Which floor a z is on. `fitOutRoom` and `fitOutSpine` are both handed one
 * level at a time and neither is told which — the reconstructed plan
 * `interiorLevels.js` passes carries the level's rooms and its spine and no id —
 * so the spine's own z is what answers it.
 */
function levelOf(z){
  for(let i = LEVELS.length - 1; i >= 0; i--) if(z >= LEVELS[i].spine.z0) return LEVELS[i].id;
  return 0;
}

/**
 * The colours this building needs and the shell palette does not carry.
 *
 * Made once, on first use, and shared by every level: three floors' worth of
 * fit-out through one material per finish is a few dozen draw calls, and a
 * material per object is a few thousand.
 */
let PAL = null;
const paint = () => (PAL ??= {
  // level 0 — the clinic
  dado:    new THREE.MeshStandardMaterial({ color: 0x8fb0bd, roughness: 0.86, envMapIntensity: 0.45 }),
  guard:   new THREE.MeshStandardMaterial({ color: 0xc8d5da, roughness: 0.35, metalness: 0.1 }),
  crash:   new THREE.MeshStandardMaterial({ color: 0xa8352a, roughness: 0.42, metalness: 0.12 }),
  chill:   new THREE.MeshStandardMaterial({ color: 0xe2eaee, roughness: 0.28, metalness: 0.45 }),
  curtain: new THREE.MeshStandardMaterial({ color: 0x7fa79f, roughness: 0.97, envMapIntensity: 0.35 }),
  vinyl:   new THREE.MeshStandardMaterial({ color: 0x4e6b74, roughness: 0.62, envMapIntensity: 0.5 }),
  // level 1 — the working floor
  carpet:  new THREE.MeshStandardMaterial({ color: 0x515f66, roughness: 0.99, envMapIntensity: 0.3 }),
  cubicle: new THREE.MeshStandardMaterial({ color: 0x7c8a80, roughness: 0.97, envMapIntensity: 0.3 }),
  copier:  new THREE.MeshStandardMaterial({ color: 0x353c43, roughness: 0.5, metalness: 0.2 }),
  cork:    new THREE.MeshStandardMaterial({ color: 0xb08b56, roughness: 0.95 }),
  paper:   new THREE.MeshStandardMaterial({ color: 0xf1efe6, roughness: 0.9 }),
  // A monitor is a dark panel with a faint glow in it, never a light — see
  // THEME_CONTRACT rule 1. Twenty-two of these on one floor at one point light
  // each is the twenty-eight-point-light floor that ran at 20 fps.
  screen:  new THREE.MeshStandardMaterial({
    color: 0x0e151a, emissive: 0x2a5468, emissiveIntensity: 0.55, roughness: 0.24, metalness: 0.1 }),
  // level 2 — past the firewall
  secure:  new THREE.MeshStandardMaterial({ color: 0x333940, roughness: 0.6, envMapIntensity: 0.5 }),
  cage:    new THREE.MeshStandardMaterial({ color: 0x6e767c, roughness: 0.5, metalness: 0.6 }),
  reader:  new THREE.MeshStandardMaterial({ color: 0x262c32, roughness: 0.5, metalness: 0.3 }),
  led:     new THREE.MeshStandardMaterial({
    color: 0x2fd98c, emissive: 0x2fd98c, emissiveIntensity: 1.5, roughness: 0.4 }),
  redLeaf: new THREE.MeshStandardMaterial({ color: 0x8c2f26, roughness: 0.48, envMapIntensity: 0.6 }),
  hazard:  new THREE.MeshStandardMaterial({ color: 0xb0492c, roughness: 0.85, envMapIntensity: 0.35 }),
  // shared
  sky:     new THREE.MeshStandardMaterial({
    color: 0xdfeaf0, emissive: 0xdfeaf0, emissiveIntensity: 0.9, roughness: 0.12, metalness: 0.05 }),
});

/**
 * What is on the walls, room by room.
 *
 * A working building, so: the rota, the counts somebody actually keeps, the
 * notice that exists because of something that happened once. Nine parts earnest
 * and one part the joke a real office has, because reversing that ratio turns a
 * trials unit into a sitcom set. Everything here has to land at walking pace.
 */
const WALL_TEXT = {
  SCREEN: [
    { style: 'banner', tag: 'BEFORE ANYTHING', heading: 'Consent is a conversation', accent: '#1f4e6b',
      body: 'The form records it. It is not it. If they cannot say back what the trial is asking of '
        + 'them, they have not consented yet.' },
    { style: 'list', tag: 'ENTRY CRITERIA', heading: 'CLARION-3, protocol v6', accent: '#5b6a72',
      items: [['Age', '18 and over'], ['Diagnosis', 'confirmed, documented'],
        ['Prior treatment', 'at least one course'], ['Amended v4', 'two criteria widened']],
      body: 'Record everybody screened, including the ones you do not enter. Especially those.' },
    { style: 'sticky', tag: 'NOTE', heading: 'The pen on the string', accent: '#8a6a1e',
      body: 'Is the third one this year. It stays here.' },
  ],
  INFUSE: [
    { style: 'banner', tag: 'INFUSION BAY', heading: 'Four hours in the chair', accent: '#1f4e6b',
      body: 'Blankets in the cupboard, tea on the trolley, and somebody will tell you how long is '
        + 'left if you ask. The wifi password is on the window.' },
    { style: 'warning', tag: 'IF YOU FEEL WARM', heading: 'Say so at the time', accent: '#b5502f',
      body: 'Flushing in the first fortnight is common and settles. It is still recorded, every '
        + 'time, in the notes.' },
    { style: 'grid', tag: 'THIS WEEK', heading: 'Chairs 1–6, Monday to Friday', accent: '#5b6a72',
      body: 'Bring somebody if you like. Chair 4 is the one by the window and everybody wants it.' },
  ],
  MONITOR: [
    { style: 'banner', tag: 'MONITORING', heading: 'The notes are the source', accent: '#1f4e6b',
      body: 'The form is a copy of the notes. Where they disagree the notes win, and a query goes '
        + 'back the same day.' },
    { style: 'grid', tag: 'SITE VISITS', heading: 'This quarter: 22 of 31', accent: '#3f6f8f',
      body: 'Sites 12 and 19 twice. Red is overdue. Nobody is in trouble for a red square.' },
    { style: 'chart', tag: 'OPEN QUERIES', heading: 'Down from 340 in March', accent: '#8a6a1e',
      body: 'Forty-one left, and eleven of those are one site with a fax machine.' },
    { style: 'list', tag: 'ON THE ROAD', heading: 'Who is where this week', accent: '#5b6a72',
      items: [['Marchetti', 'sites 4 and 19'], ['Two monitors', 'the northern group'],
        ['Nobody', 'site 12 — booked for next week']],
      body: 'Mileage claims to Renner, not to me.' },
  ],
  LAB: [
    { style: 'warning', tag: 'MINUS EIGHTY', heading: 'The freezer alarms to three phones', accent: '#b5502f',
      body: 'If it sounds, do not open it. Call the number before you do anything else. '
        + 'Everything in there is somebody who came in once and cannot come again.' },
    { style: 'list', tag: 'CHAIN OF CUSTODY', heading: 'Every aliquot, every move', accent: '#5b6a72',
      items: [['Taken', 'site, date, time'], ['Received', 'here, signed'],
        ['Moved', 'rack and position'], ['Destroyed', 'date and by whom']],
      body: 'A sample with no history is a sample about nothing.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Somebody left the door ajar', accent: '#8a6a1e', body: '' },
  ],
  STATS: [
    { style: 'banner', tag: 'THE PLAN', heading: 'Written before the data', accent: '#1f4e6b',
      body: 'Analysis plan v4, in force since March. Every version kept, every date recorded. '
        + 'If it is not in here, we are not claiming it.' },
    { style: 'chart', tag: 'ACCRUAL', heading: '246 of 380 events', accent: '#3f6f8f',
      body: 'Information fraction 0.65. The calendar says three quarters. The calendar is not what '
        + 'the boundary is set from.' },
    { style: 'grid', tag: 'PRESPECIFIED SUBGROUPS', heading: 'Fourteen of them', accent: '#8a6a1e',
      body: 'Numbered, in the plan, since 2021. One of fourteen clearing the line is close to '
        + 'expected. Count before you argue.' },
    { style: 'sticky', tag: 'NOTE', heading: 'No, you cannot have a peek', accent: '#b5502f',
      body: 'Asked and answered. — M.F.' },
  ],
  REG: [
    { style: 'list', tag: 'REPORTING WINDOWS', heading: 'Clock starts when we know', accent: '#b5502f',
      items: [['Fatal or life-threatening', '7 days'], ['Other serious, unexpected, related', '15 days'],
        ['Annual safety report', 'due 30 June'], ['Registry update', 'before the change is used']],
      body: 'The window is set by what it is, not by what we think caused it.' },
    { style: 'grid', tag: 'PROTOCOL VERSIONS', heading: 'v1 to v6, and the dates', accent: '#5b6a72',
      body: 'Four amendments. Ask me which was in force on any day of the last four years — that is '
        + 'the whole job.' },
    { style: 'banner', tag: 'REGISTERED', heading: 'ISRCTN 44 802 173', accent: '#1f4e6b',
      body: 'Public entry updated eleven days ago. A trial nobody can find is a trial that can '
        + 'quietly stop existing.' },
  ],
  DATA: [
    { style: 'banner', tag: 'DATA MANAGEMENT', heading: 'Empty is not zero', accent: '#1f4e6b',
      body: 'A blank field means nobody wrote anything down. A zero means somebody looked and found '
        + 'none. Storing them the same way destroys one of them.' },
    { style: 'chart', tag: 'RECONCILIATION', heading: 'Balanced on the first run', accent: '#3f6f8f',
      body: 'First time in two years. Nobody is to touch anything.' },
    { style: 'grid', tag: 'ENROLMENT', heading: 'One card per site, 31 of them', accent: '#8a6a1e',
      body: 'Site 12 is the tall one. That is not straightforwardly good news.' },
    { style: 'sticky', tag: 'LOCK', heading: 'Thursday, 17:00', accent: '#b5502f',
      body: 'Queries that change an endpoint first. Spellings can wait until Friday.' },
  ],
  ADJUD: [
    { style: 'banner', tag: 'ADJUDICATION', heading: 'No arm, no site, no name', accent: '#1f4e6b',
      body: 'Three readers to a file. If you recognise a case, say so and hand it on.' },
    { style: 'list', tag: 'THE DEFINITION', heading: 'Agreed 2021, unchanged', accent: '#5b6a72',
      items: [['Admission', 'for the trial condition'], ['Duration', 'overnight or longer'],
        ['Evidence', 'contemporaneous notes'], ['Ambiguous', 'ruled by majority, recorded']],
      body: 'A file assembled after the fact is a file with an opinion in it already.' },
    { style: 'warning', tag: 'QUIET', heading: 'Reading in progress', accent: '#b5502f',
      body: 'Do not come in to ask how it is going. It is going.' },
  ],
  KIT: [
    { style: 'warning', tag: 'COLD CHAIN', heading: '2 to 8 degrees, no exceptions', accent: '#b5502f',
      body: 'Logger on the door, alarm to two phones. An acknowledged alarm is not a resolved alarm. '
        + 'Site 19 acknowledged twice and nobody went.' },
    { style: 'grid', tag: 'KIT NUMBERS', heading: '0001 to 4000, in order', accent: '#3f6f8f',
      body: 'Identical but for the number. That is not packaging — that is the trial.' },
    { style: 'list', tag: 'CODE BREAK', heading: 'Two in four years', accent: '#8a6a1e',
      items: [['Envelope', 'in the box, sealed'], ['Who may open', 'the treating doctor'],
        ['Permission needed', 'none'], ['Logged', 'always, within 24 hours']],
      body: 'If knowing changes what they do for that person tonight, open it.' },
    { style: 'tally', tag: 'QUARANTINE', heading: 'Boxes held, this year', accent: '#5b6a72', body: '' },
  ],
  UNBLIND: [
    { style: 'warning', tag: 'UNBLINDED AREA', heading: 'Do not read over a shoulder', accent: '#b5502f',
      body: 'Everything on this desk is by arm. If you are blinded and you are in here, look at the '
        + 'floor and say what you came to say.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Printouts face down', accent: '#8a6a1e',
      body: 'Yes, including that one.' },
  ],
  RANDOM: [
    { style: 'banner', tag: 'ALLOCATION', heading: 'The sequence, and nothing else', accent: '#1f4e6b',
      body: 'Generated before the trial opened, held here, released one participant at a time. '
        + 'Screens face the wall, and that is deliberate.' },
    { style: 'grid', tag: 'BLOCKS', heading: 'Length varies, and is not published', accent: '#5b6a72',
      body: 'Balance at every site, without the next one being guessable. Both halves matter.' },
  ],
  BOARD: [
    { style: 'banner', tag: 'CLOSED SESSION', heading: 'Independent monitoring board', accent: '#b5502f',
      body: 'Three meetings in the life of this trial. The only room in the building where the two '
        + 'arms appear on the same page.' },
    { style: 'list', tag: 'WHAT IT MAY RECOMMEND', heading: 'Three things, and only three', accent: '#1f4e6b',
      items: [['Continue', 'to the planned events'], ['Stop', 'for benefit'],
        ['Stop', 'for futility'], ['The sponsor', 'decides — the board advises']],
      body: 'Minutes are the argument. They outlast everybody in the room.' },
    { style: 'grid', tag: 'MEMBERSHIP', heading: 'Nobody with a stake', accent: '#5b6a72',
      body: 'No role in the trial, no shareholding, no paper riding on it. That is the qualification.' },
  ],
  ARCHIVE: [
    { style: 'banner', tag: 'TRIAL MASTER FILE', heading: 'Everything, with its date', accent: '#1f4e6b',
      body: 'Kept for twenty-five years after the last participant. Somebody who has never met any '
        + 'of us has to be able to reconstruct what we promised and when.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Nothing leaves this room', accent: '#8a6a1e',
      body: 'Sign the sheet, read it here, put it back where it was.' },
  ],
};

/** Which kit recipe each room draws its furniture from. */
const KIND = {
  SCREEN: 'reception', INFUSE: 'waiting', MONITOR: 'office', LAB: 'lab',
  STATS: 'station', REG: 'office', DATA: 'station', ADJUD: 'quiet',
  KIT: 'supply', UNBLIND: 'quiet', RANDOM: 'workroom', BOARD: 'station',
  ARCHIVE: 'supply',
};

/** The narrative fittings each room gets before the generic furniture fills in. */
const FITTINGS = {
  SCREEN: ['monitorBank', 'toolBoard'],
  INFUSE: ['monitorBank', 'trolley'],
  MONITOR: ['monitorBank', 'toolBoard', 'crate'],
  LAB: ['sampleStore', 'rack', 'toolBoard'],
  STATS: ['monitorBank', 'whiteboard', 'rack'],
  REG: ['rack', 'cabinet', 'monitorBank'],
  DATA: ['monitorBank', 'monitorBank', 'whiteboard'],
  ADJUD: ['monitorBank', 'whiteboard'],
  KIT: ['shelfUnit', 'crate', 'barrel', 'trolley'],
  UNBLIND: ['monitorBank', 'cabinet'],
  RANDOM: ['rack', 'rack', 'monitorBank'],
  BOARD: ['monitorBank', 'whiteboard'],
  ARCHIVE: ['shelfUnit', 'shelfUnit', 'crate'],
};

/** Nothing here: this theme has no outdoor world. */
export function decorate(scene, ctx){ void scene; void ctx; }

/**
 * Build the seats `plan.seats` declares, for the room they fall inside.
 *
 * The crowd sits people at those coordinates whether or not anything is there,
 * and the scaffold leaves the building of them to the theme — so an infusion bay
 * with five declared chairs rendered as five drip stands and a floor, with staff
 * sitting in mid-air beside them.
 */
function buildSeats(room, ctx, style = 'pedestal'){
  const { bounds: b, box, materials: M, soft } = ctx;
  const pal = paint();
  const seats = (ctx.plan?.seats ?? []).filter(([x, z]) =>
    z > room.z0 && z < room.z1 && (b.sign > 0 ? x > b.xInner : x < b.xInner));
  for(const [x, z, yaw = 0] of seats){
    // A box at `ry = yaw` has its local +z along `(sin yaw, cos yaw)`, which is
    // exactly the direction the crowd's `body.rotation.y = facing` looks along.
    // So "in front" is +local z and "across" is +local x, and every offset below
    // is written in those two.
    const fwd = (d) => [x + Math.sin(yaw) * d, z + Math.cos(yaw) * d];
    const side = (d) => [x + Math.cos(yaw) * d, z - Math.sin(yaw) * d];
    const [bx, bz] = fwd(-0.26);
    if(style === 'recliner'){
      // Four hours in the chair, so it is a chair somebody could be in for four
      // hours: a deep pad, a tall back, arms to get out of it by and a leg rest.
      box(0.64, 0.14, 0.74, x, 0.44, z, pal.vinyl, yaw);
      box(0.64, 0.80, 0.14, bx, 0.90, bz, pal.vinyl, yaw);
      for(const s of [-1, 1]){
        const [ax, az] = side(s * 0.33);
        box(0.09, 0.10, 0.62, ax, 0.66, az, pal.vinyl, yaw);
        box(0.06, 0.28, 0.06, ax, 0.44, az, M.rail, yaw);
      }
      const [lx, lz] = fwd(0.46);
      box(0.56, 0.10, 0.44, lx, 0.36, lz, pal.vinyl, yaw);
      box(0.52, 0.30, 0.60, x, 0.16, z, M.frame, yaw);
      soft(x, z, 0.52);
    } else if(style === 'task'){
      // A gas-lift task chair on a star base: the data floor's chair, and the
      // one whose back is always at a different angle to its neighbour's.
      box(0.50, 0.09, 0.50, x, 0.46, z, pal.vinyl, yaw);
      box(0.48, 0.54, 0.07, bx, 0.79, bz, pal.cubicle, yaw);
      box(0.09, 0.44, 0.09, x, 0.24, z, M.rail);
      for(let k = 0; k < 5; k++){
        const a = yaw + (k / 5) * Math.PI * 2;
        box(0.07, 0.04, 0.46, x + Math.sin(a) * 0.19, 0.05, z + Math.cos(a) * 0.19, M.rail, a);
      }
      soft(x, z, 0.44);
    } else if(style === 'kitchen'){
      // Four legs, a back, no arms. A kitchen has the cheap chairs.
      box(0.46, 0.07, 0.46, x, 0.45, z, M.frame, yaw);
      box(0.44, 0.48, 0.06, bx, 0.73, bz, M.frame, yaw);
      for(const sx of [-1, 1]) for(const sz of [-1, 1]){
        const [px, pz] = [x + Math.cos(yaw) * sx * 0.18 + Math.sin(yaw) * sz * 0.18,
                          z - Math.sin(yaw) * sx * 0.18 + Math.cos(yaw) * sz * 0.18];
        box(0.05, 0.44, 0.05, px, 0.22, pz, M.rail);
      }
      soft(x, z, 0.4);
    } else if(style === 'meeting'){
      // Arms, a high back and a heavier base: the chairs a board sits in for a
      // whole afternoon and does not get up from.
      box(0.54, 0.11, 0.54, x, 0.46, z, pal.vinyl, yaw);
      box(0.54, 0.66, 0.10, bx, 0.85, bz, pal.vinyl, yaw);
      for(const s of [-1, 1]){
        const [ax, az] = side(s * 0.30);
        box(0.07, 0.08, 0.48, ax, 0.64, az, M.frame, yaw);
      }
      box(0.11, 0.42, 0.11, x, 0.23, z, M.rail);
      box(0.52, 0.05, 0.52, x, 0.03, z, M.rail, yaw);
      soft(x, z, 0.46);
    } else {
      box(0.52, 0.08, 0.52, x, 0.44, z, M.frame, yaw);          // the seat
      box(0.52, 0.52, 0.08, bx, 0.72, bz, M.frame, yaw);        // and its back
      box(0.1, 0.42, 0.1, x, 0.21, z, M.rail);                  // the pedestal
      box(0.44, 0.05, 0.44, x, 0.03, z, M.rail);                // and its foot
      soft(x, z, 0.42);
    }
  }
  return seats.length;
}

/** Which chair each room's declared seats are built as. */
const SEAT_STYLE = { INFUSE: 'recliner', DATA: 'task', TEA: 'kitchen', BOARD: 'meeting' };

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const pal = paint();
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall
  const level = levelOf(room.z0);
  const seated = buildSeats(room, ctx, SEAT_STYLE[room.id]);
  /**
   * Wall the room's own fit-out has already taken.
   *
   * `furnishRoom` hangs its notices wherever `wallOk` says there is plaster, and
   * it has no way of knowing what this hook put up before it — so the enrolment
   * wall and the CONSORT chart were both hangable-over. Rectangles here are in
   * plan x/z and deliberately ignore height: a notice half a metre above a chart
   * still reads as two things fighting over one wall.
   */
  const taken = [];
  const reserve = (x0, x1, z0, z1) => taken.push({
    x0: Math.min(x0, x1), x1: Math.max(x0, x1),
    z0: Math.min(z0, z1), z1: Math.max(z0, z1),
  });
  const spoken = (x, z) => taken.some(t => x >= t.x0 && x <= t.x1 && z >= t.z0 && z <= t.z1);

  /**
   * A badge reader on the corridor face of this room's door frame.
   *
   * Level 2 only, and every door on it. The blinded/unblinded boundary is a
   * flight of stairs rather than a lock, so what says "you are past it" has to be
   * something on every door up here that is on no door below.
   */
  if(level === 2 && opening){
    const rx = b.xInner - f * (ctx.P.wall / 2 + 0.03);      // the corridor face
    const rz = opening.cz + opening.dw / 2 + 0.36;
    const body = box(0.06, 0.20, 0.13, rx, 1.24, rz, pal.reader);
    const led = box(0.02, 0.035, 0.035, rx - f * 0.035, 1.30, rz, pal.led);
    markWallMounted([body, led], true, -f, 'badge reader');
    ctx.lightPanels?.push(led);
  }

  // The one thing that is this room and nothing else, placed before the kit
  // fills in around it.
  switch(room.id){
    case 'KIT': {
      // Two aisles of racking down the long axis, and a cold-room box at the
      // north end with its own door. This is the room the game is named after
      // in every way that matters: identical boxes in numbered order.
      // Racking against both long walls, with the aisle down the middle on the
      // line of the door. Built across the middle instead — which is where it
      // was first — the room is a wall of boxes you cannot walk into, and the
      // doorway view is a close-up of a crate.
      const rackX = [b.xInner + f * 1.0, b.xOuter - f * 1.0];
      for(const ax of rackX){
        const nearSpine = Math.abs(ax - b.xInner) < 1.4;
        for(let z = room.z0 + 1.4; z < room.z1 - 5.2; z += 2.4){
          // Keep the way in clear: nothing on the spine side across the doorway.
          if(nearSpine && Math.abs(z + 1.0 - b.cz) < 2.4) continue;
          // And nothing through the case stand, which `interiorSite.js` builds on
          // the OUTER wall at mid depth before this hook runs — so the outer run
          // of racking had a bay standing in the thing the player presses E on.
          if(!nearSpine && room.group && Math.abs(z + 1.0 - b.cz) < 1.7) continue;
          const upright = box(0.7, 2.3, 0.08, ax, 1.15, z, M.rail);
          markStructure([upright], 'rack');
          for(const shelfY of [0.4, 0.95, 1.5, 2.05]){
            box(0.7, 0.05, 2.0, ax, shelfY, z + 1.0, M.frame);
            // The boxes themselves: pale, identical, four to a shelf, and the
            // only thing telling them apart is a number.
            for(let i = 0; i < 4; i++){
              box(0.3, 0.22, 0.36, ax, shelfY + 0.14, z + 0.3 + i * 0.47, M.wall);
            }
          }
          hard(ax, z + 1.0, 0.8, 2.1, 2.3);
        }
      }
      // The cold room: a walk-in box against the far wall with a heavy door.
      const cz = room.z1 - 2.6;
      box(3.2, 2.6, 4.0, b.xOuter - f * 1.7, 1.3, cz, M.frame);
      box(0.12, 2.0, 1.0, b.xOuter - f * 3.3, 1.0, cz - 1.2, M.rail);
      hard(b.xOuter - f * 1.7, cz, 3.4, 4.2, 2.6);
      break;
    }
    case 'INFUSE': {
      // Drip stands beside the recliners plan.js declares, so nobody sits in a
      // bay with nothing in it. `soft` is positional — `(x, z, r)`. Handed an
      // object it pushed `{ x: {x,z,r}, z: undefined, r: undefined }`, which is a
      // soft collider at NaN: it never blocks anything and never reports itself.
      for(const [x, z] of [[-4.6, 4.6], [-4.6, 6.4], [-4.6, 8.2], [-4.6, 10.0], [-4.6, 11.8]]){
        box(0.05, 1.9, 0.05, x - 0.75, 0.95, z, M.rail);
        box(0.16, 0.3, 0.12, x - 0.75, 1.86, z, M.wall);
        box(0.34, 0.03, 0.34, x - 0.75, 0.02, z, M.rail);          // the wheeled foot
        soft(x - 0.75, z, 0.3);
      }
      // Curtain rails over the near row, and a curtain half drawn at each bay
      // divider. A bay is private one chair at a time, and a rail with nothing on
      // it reads as a room somebody forgot to finish.
      for(const cz of [4.5, 6.3, 8.1, 9.9]){
        box(1.9, 0.05, 0.05, -5.05, 2.28, cz, pal.guard);
        // Cloth, half drawn: the leading edge stops short of the rail's end.
        box(1.05, 1.18, 0.03, -5.55, 1.62, cz, pal.curtain);
        for(const dx of [-0.4, 0.1]) box(0.03, 0.09, 0.03, dx - 5.0, 2.22, cz, M.rail);
      }
      // A run of rail along the far pair as well, so the whole bay reads as one
      // room rather than one furnished row and one empty one.
      box(0.05, 0.05, 2.6, -8.3, 2.28, 5.3, pal.guard);
      box(0.03, 1.18, 1.4, -8.3, 1.62, 5.6, pal.curtain);
      // The drug fridge, on the cross-wall at the head of the bay: glass front,
      // a lit shelf line, and a logger on the door. Everything in it is somebody's
      // next four hours.
      box(0.9, 2.0, 0.7, -8.6, 1.0, 11.4, pal.chill);
      box(0.66, 1.30, 0.05, -8.6, 1.20, 11.03, M.glass);
      for(const sy of [0.72, 1.10, 1.48]) box(0.62, 0.03, 0.5, -8.6, sy, 11.3, pal.guard);
      box(0.2, 0.14, 0.04, -8.6, 1.94, 11.02, pal.screen);
      hard(-8.6, 11.4, 0.95, 0.78, 2.0);
      reserve(-9.3, -7.9, 10.8, 12.1);
      break;
    }
    case 'BOARD': {
      // One table, six places, and the room is the meeting.
      //
      // It runs ACROSS the room in the north half rather than down the middle.
      // Down the middle it stood on the door line — the player walks in at
      // (−3.6, 75) — and its west end stood inside the case stand, which is
      // built on the outer wall at mid depth before this hook is called.
      const tz = 77.6;
      box(4.6, 0.09, 1.3, -6.0, 0.75, tz, M.frame);
      for(const sx of [-1.9, 1.9]) for(const sz of [-0.45, 0.45]){
        box(0.11, 0.71, 0.11, -6.0 + sx, 0.37, tz + sz, M.rail);
      }
      hard(-6.0, tz, 4.8, 1.5, 0.85);
      // A name card at every place, folded, facing whoever sits behind it. Nobody
      // on this board has ever met most of the others: that is the qualification.
      for(const sx of [-1.6, 0, 1.6]) for(const s of [-1, 1]){
        box(0.26, 0.09, 0.02, -6.0 + sx, 0.84, tz + s * 0.5, M.wall);
      }
      // The water jug and glasses in the middle, because three hours.
      box(0.16, 0.28, 0.16, -6.0, 0.93, tz, M.glass);
      for(const sx of [-0.34, 0.34]) box(0.08, 0.12, 0.08, -6.0 + sx, 0.85, tz, M.glass);
      break;
    }
    case 'DATA': {
      // ------------------------------------------------ the working floor's floor
      // Carpet, which is the cheapest thing in the building that says "this is not
      // the clinic". Two millimetres proud of the slab and casting nothing.
      const rug = box(7.3, 0.004, 9.3, -6.05, 0.004, b.cz, pal.carpet);
      rug.castShadow = false;

      // ------------------------------------------------ the desks
      // Two bench rows back to back with a cubicle screen between them, on the
      // line plan.js seats the six task chairs against. A screen is what makes a
      // room of desks read as data management and not as a canteen.
      //
      // The whole pod is 1.5 m across — two 750 mm bench tops meeting at the
      // screen — and the chairs sit 450 mm clear of the desk edge on each side.
      // A wider pod puts its own collider under the chairs plan.js declares, and
      // a seat inside a collider is a person the player cannot walk up to.
      const screenX = -6.1;
      box(0.05, 1.28, 6.2, screenX, 0.64, 33.0, pal.cubicle);
      for(const dz of [-3.1, 3.1]) box(0.08, 1.34, 0.08, screenX, 0.67, 33.0 + dz, M.rail);
      hard(screenX, 33.0, 0.12, 6.2, 1.3);
      // `faceSign` is the direction that row's sitter looks: the west row looks
      // +x at the screen, the east row looks −x at it.
      for(const faceSign of [1, -1]){
        const deskX = screenX - faceSign * 0.375;
        box(0.75, 0.06, 6.2, deskX, 0.73, 33.0, M.frame);
        for(const dz of [-2.9, 0, 2.9]){
          box(0.06, 0.70, 0.58, deskX - faceSign * 0.3, 0.36, 33.0 + dz, M.rail);
        }
        for(const mz of [31.2, 33.0, 34.8]){
          // A monitor at every place, on a stalk, its dark face turned back at
          // whoever is sitting there.
          const mx = screenX - faceSign * 0.2;
          box(0.045, 0.42, 0.60, mx, 1.12, mz, pal.screen);
          box(0.04, 0.44, 0.62, mx + faceSign * 0.03, 1.12, mz, M.base);
          box(0.14, 0.26, 0.14, mx, 0.80, mz, M.rail);
          box(0.30, 0.02, 0.15, screenX - faceSign * 0.58, 0.77, mz, M.base);      // keyboard
          box(0.20, 0.05, 0.28, deskX - faceSign * 0.18, 0.78, mz + 0.62, pal.paper);
        }
        hard(deskX, 33.0, 0.78, 6.3, 0.78);
      }

      // ------------------------------------------------ the far wall
      // The wall the room looks at was blank: 31 cards the size of a hand and
      // eight metres of paint. What a data management floor actually faces is the
      // flow chart the whole trial is counted down — screened, eligible,
      // randomised, treated, followed, analysed — because every argument on this
      // floor is about which of those boxes somebody fell out of.
      const wallX = b.xOuter - f * (ctx.P.wall / 2 + 0.03);
      paintMural({
        box, x: wallX, y: 1.74, z: 32.9, faceX: true, toward: -f, w: 5.6, h: 2.1,
        kind: 'chain', ink: '#20262c', paper: '#eef1ef', soft: '#5b6a72',
        seed: 'the_trial-consort',
        text: { stations: [
          { title: 'Screened', sub: '3,914 assessed', glyph: 'points' },
          { title: 'Eligible', sub: '2,606 met the criteria', glyph: 'grid' },
          { title: 'Randomised', sub: '2,400 allocated', glyph: 'beam' },
          { title: 'Treated', sub: '2,371 had a first dose', glyph: 'column' },
          { title: 'Followed', sub: '2,208 still in follow-up', glyph: 'curve' },
          { title: 'Analysed', sub: '2,400 as assigned', glyph: 'bars' },
        ] },
      });
      reserve(b.xOuter - f * 0.6, b.xOuter + f * 0.3, 29.8, 36.0);

      // The enrolment wall keeps its cards, moved north of the chart: one per
      // site, filling as the trial recruits, and site 12 the odd one out.
      const cardZ0 = 36.3;
      for(let i = 0; i < 31; i++){
        const col = i % 8, row = Math.floor(i / 8);
        const card = box(0.03, 0.16, 0.11, wallX, 2.05 - row * 0.24, cardZ0 + col * 0.28,
          i === 11 ? M.rail : M.frame);
        markWallMounted([card], true, -f, 'enrolment card');
      }
      reserve(b.xOuter - f * 0.6, b.xOuter + f * 0.3, 36.0, 38.8);
      break;
    }
    case 'ARCHIVE': {
      // The master file, behind mesh.
      //
      // Twenty-five years of everything, in a room anybody may walk into and
      // nothing may leave. A cage is what that looks like: a run of bar and mesh
      // across the room with one gate in it, and the shelving behind it.
      const cageX = b.xOuter - f * 5.4;
      const gate = { z0: 75.4, z1: 76.9 };
      for(const seg of [{ z0: 71.9, z1: gate.z0 }, { z0: gate.z1, z1: 80.1 }]){
        const len = seg.z1 - seg.z0, cz2 = (seg.z0 + seg.z1) / 2;
        for(let z = seg.z0 + 0.15; z < seg.z1; z += 0.3){
          markStructure([box(0.035, 2.5, 0.035, cageX, 1.25, z, pal.cage)], 'rack');
        }
        for(const y of [0.12, 1.3, 2.48]) box(0.05, 0.05, len, cageX, y, cz2, pal.cage);
        hard(cageX, cz2, 0.2, len, 2.5);
      }
      // The gate itself: a frame, a leaf standing ajar and the sign-out shelf
      // beside it, since nothing leaves the room and everything is signed for.
      for(const gz of [gate.z0, gate.z1]) box(0.09, 2.5, 0.09, cageX, 1.25, gz, pal.cage);
      box(0.09, 0.09, gate.z1 - gate.z0, cageX, 2.5, (gate.z0 + gate.z1) / 2, pal.cage);
      box(0.05, 2.2, 1.3, cageX + f * 0.28, 1.1, gate.z0 + 0.9, pal.cage, 0.3);
      box(0.5, 0.05, 0.7, cageX - f * 0.35, 0.95, gate.z0 - 0.7, M.frame);
      soft(cageX - f * 0.35, gate.z0 - 0.7, 0.4);
      break;
    }
    case 'RANDOM': {
      // The red door.
      //
      // One door in this building is a different colour from the other thirteen,
      // and it is the one the allocation sequence is behind. The leaf is the
      // engine's — `interiorSite.js` builds it before this hook runs — so it is
      // recoloured in place rather than a second leaf being hung over it, and the
      // architrave and threshold are painted with it in case the leaf ever moves.
      if(opening){
        const leafGroup = ctx.scene.children.find(o => o.isGroup && o.children?.length
          && Math.abs(o.position.x - opening.x) < 0.02
          && Math.abs(o.position.z - (opening.cz + opening.dw / 2)) < 0.02);
        const panel = leafGroup?.children?.find(c => c.isMesh && c.geometry?.type === 'BoxGeometry');
        if(panel) panel.material = pal.redLeaf;
        const ax = b.xInner - f * (ctx.P.wall / 2 + 0.04);
        const arch = [];
        for(const s of [-1, 1]){
          arch.push(box(0.03, ctx.P.doorH + 0.2, 0.13, ax,
            (ctx.P.doorH + 0.2) / 2, opening.cz + s * (opening.dw / 2 + 0.12), pal.redLeaf));
        }
        arch.push(box(0.03, 0.13, opening.dw + 0.5, ax, ctx.P.doorH + 0.155, opening.cz, pal.redLeaf));
        markWallMounted(arch, true, -f, 'red door architrave');
        const sill = box(1.0, 0.004, opening.dw + 0.3, b.xInner + f * 0.5, 0.004,
          opening.cz, pal.redLeaf);
        sill.castShadow = false;
      }
      // Screens face the wall, and that is deliberate: two monitors turned to the
      // outer wall with their backs to the room.
      for(const dz of [-1.1, 1.1]){
        box(0.06, 0.4, 0.6, b.xOuter - f * 0.85, 1.14, b.cz + dz, pal.screen);
        box(0.7, 0.74, 0.7, b.xOuter - f * 1.1, 0.37, b.cz + dz, M.frame);
      }
      break;
    }
    case 'ADJUD':
      // Two reading screens back to back, so neither reader sees the other's.
      for(const s of [-1, 1]){
        box(0.08, 0.9, 1.4, b.cx + s * 0.06, 1.25, b.cz, M.base);
        box(0.7, 0.74, 1.6, b.cx + s * 0.85, 0.37, b.cz, M.frame);
      }
      hard(b.cx, b.cz, 2.0, 1.8, 1.7);
      break;
    case 'TEA': {
      // The kitchen, which is three metres deep and holds two chairs, a table and
      // a run of counter — and had none of the three, though plan.js now seats
      // two people at a table here.
      box(0.9, 0.07, 1.3, -7.2, 0.74, 51.5, M.frame);
      for(const sx of [-0.34, 0.34]) for(const sz of [-0.52, 0.52]){
        box(0.06, 0.72, 0.06, -7.2 + sx, 0.37, 51.5 + sz, M.rail);
      }
      hard(-7.2, 51.5, 1.0, 1.4, 0.8);
      box(0.6, 0.9, 2.4, -9.35, 0.45, 51.5, M.frame);
      box(0.64, 0.05, 2.44, -9.35, 0.92, 51.5, M.base);
      box(0.4, 0.06, 0.5, -9.3, 0.94, 51.0, pal.chill);              // the sink
      box(0.18, 0.24, 0.18, -9.3, 1.06, 52.1, pal.guard);            // the kettle
      for(let i = 0; i < 4; i++) box(0.08, 0.09, 0.08, -9.1, 0.99, 51.4 + i * 0.16, M.wall);
      hard(-9.35, 51.5, 0.7, 2.5, 0.95);
      break;
    }
    default:
      // A working surface against the spine wall, which is where the room's own
      // instrument screen and case stand go.
      //
      // BESIDE the doorway, never across it. Centred on `b.cz` — which is the
      // door's own centre line — this stood on the exact point the player walks
      // to on entering: `getStopEntry` is 1.6 m in from the spine line and the
      // bench ran from 1.1 to 1.7. Three rooms with a case in them could be
      // stepped into by half a metre and no gate said so, because a bench is
      // furniture and the checkers ask about walls.
      if(room.group || KIND[room.id] === 'station' || KIND[room.id] === 'office'){
        const dw = room.door === 'wide' ? ctx.P.doorWideW : ctx.P.doorW;
        // The two clear runs of spine wall, and whichever is longer wins.
        const near = [room.z0 + 0.6, b.cz - dw / 2 - 0.7];
        const far = [b.cz + dw / 2 + 0.7, room.z1 - 1.4];
        const pickRun = (far[1] - far[0]) > (near[1] - near[0]) ? far : near;
        const run = Math.min(3.0, pickRun[1] - pickRun[0]);
        if(run > 1.2){
          const wz = (pickRun[0] + pickRun[1]) / 2;
          box(0.62, 0.9, run, inX + f * 0.9, 0.45, wz, M.frame);
          box(0.66, 0.05, run + 0.06, inX + f * 0.9, 0.92, wz, M.base);
          hard(inX + f * 0.9, wz, 0.8, run + 0.2, 0.95);
        }
      }
      break;
  }

  // The story: the props the bible keys to each mission, the landmark spaces
  // and the room's own extras — see story.js. It runs after this room's own
  // fittings and before the kit fills in, and hands back the wall it took and
  // the floor it needs kept clear.
  const story = dressRoom(room.id, room, ctx);
  for(const [x0, x1, z0, z1] of story.reserve) reserve(x0, x1, z0, z1);

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    bounds: {
      // The master file's furniture goes BEHIND the cage, which is the whole
      // point of the cage: the kit's own x0 starts on its far side.
      x0: room.id === 'ARCHIVE' ? b.xOuter - f * 4.7 : b.xInner + f * 2.0,
      x1: b.xOuter - f * 0.55,
      z0: room.z0 + 0.7, z1: room.z1 - 0.7,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: ctx.P.wall,
    // Where those planes are actually solid: a doorway in the middle of every
    // closed room's spine face, nothing but end nibs across an open one, and no
    // cross-wall where nothing adjoins.
    wallOk: (x, z) => {
      // Wall this hook already used. `furnishRoom` cannot see what was put up
      // before it, so the chart and the enrolment wall have to be declared or a
      // notice board lands on top of the drawing the room is about.
      if(spoken(x, z)) return false;
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
    kind: KIND[room.id] ?? room.kind ?? 'office',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    seed: `the_trial-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The warehouse aisles and the cold room are built above; keep the kit
      // from putting a filing cabinet in the middle of one.
      ...(room.id === 'KIT' ? [{ x: b.cx, z: (room.z0 + room.z1) / 2, r: 6.0 }] : []),
      // The bay, its curtain line and the drug fridge at the head of it.
      ...(room.id === 'INFUSE'
        ? [{ x: -5.2, z: 8.0, r: 4.4 }, { x: -8.3, z: 5.4, r: 1.8 }, { x: -8.6, z: 11.4, r: 1.6 }]
        : []),
      // The desk pod and the carpet it stands on.
      ...(room.id === 'DATA' ? [{ x: -6.1, z: 33.0, r: 3.9 }] : []),
      // The board table, across the north half of the room.
      ...(room.id === 'BOARD' ? [{ x: -6.0, z: 77.6, r: 2.7 }] : []),
      // The gate through the cage, and the sign-out shelf beside it.
      ...(room.id === 'ARCHIVE' ? [{ x: b.xOuter - f * 5.0, z: 76.1, r: 2.0 }] : []),
      // The two screens turned to face the wall.
      ...(room.id === 'RANDOM' ? [{ x: b.xOuter - f * 1.0, z: b.cz, r: 2.2 }] : []),
      // The kitchen's table and its counter, in a room three metres deep.
      ...(room.id === 'TEA' ? [{ x: -7.2, z: 51.5, r: 1.5 }, { x: -9.3, z: 51.5, r: 1.5 }] : []),
      // The evidence cabinet, the courier shelves, the visitor's bench.
      ...story.keepClear,
      // Nothing on top of a chair somebody is going to be sitting in.
      ...((ctx.plan?.seats ?? []).filter(([x, z]) =>
        z > room.z0 && z < room.z1 && (f > 0 ? x > b.xInner : x < b.xInner))
        .map(([x, z]) => ({ x, z, r: 0.9 }))),
    ],
    // A room whose seats are its furniture needs fewer pieces around them, and
    // the unblinded floor is deliberately barer than either floor below it: the
    // rooms where nobody may say anything are the rooms with least in them.
    // A flat count is the wrong bar for a small room — the kitchen and the
    // records store are three and four metres deep — so it is scaled by area
    // against the 80 m² a full-depth room on this plan has.
    target: Math.max(5, Math.round(
      (level === 2 ? 0.75 : 1) * (seated ? 11 : 16)
      * Math.min(1, ((room.z1 - room.z0) * ctx.P.roomDepth) / 80))),
  });
}

/**
 * Fit out one level's corridor.
 *
 * The firewall itself is not here any more: it belongs at the head of the upper
 * stair, which is `world.js`'s territory, because the stair is the thing it
 * gates. What is here is what a working corridor accumulates, per floor.
 */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard, soft } = ctx;
  const pal = paint();
  // One level's corridor, not the building's: `world.js` calls this once per
  // floor with that floor's own plan. Reading the whole building's spine here
  // built three copies of everything, stacked, at the same z.
  const sp = plan.spine ?? { z0: -8, z1: 22 };
  const hw = plan.metrics?.corridorHalfWidth ?? 2.0;
  const level = levelOf(sp.z0);
  // The face of the spine wall, and the line anything hung on it sits proud of.
  // The wall is raised CENTRED on ±hw, so its surface is half a thickness inside
  // that; painting on the line itself puts the paint inside the plaster.
  // `onFace` is a MAGNITUDE, and anything standing proud of the plaster is
  // `s * (onFace - out)` — never `s * (onFace - s * out)`, which moves the west
  // wall's trim the wrong way and buries it. The handrail on one side of this
  // corridor and the pinned sheets on one of its two pinboards were inside the
  // plaster for exactly that reason, and both rendered.
  const onFace = hw - P.wall / 2 - 0.03;

  /** z ranges on one side this hook has taken, kept off the corridor kit. */
  const spineTaken = [];
  const takeSpine = (side, z0, z1) => spineTaken.push({ side, z0, z1 });

  // ------------------------------------------------------ level 0: the clinic
  //
  // A dado band, a wall guard and a handrail down both walls, on whichever parts
  // of them are actually wall. `spineSolidSpans` is the same function the kit's
  // own `wallOk` is built out of, so the paint stops at every doorway and at the
  // open face of the infusion bay rather than crossing it.
  if(level === 0){
    for(const side of ['w', 'e']){
      const s = side === 'w' ? -1 : 1;
      for(const span of spineSolidSpans(plan, P, side)){
        const len = span.z1 - span.z0 - 0.12;
        if(len < 0.5) continue;
        const cz = (span.z0 + span.z1) / 2;
        // The painted band, floor to hip: the half of a clinical corridor that
        // gets scuffed, in the one colour this building uses for anything.
        const dado = box(0.02, 0.62, len, s * onFace, 0.52, cz, pal.dado);
        dado.castShadow = false;
        // The guard above it, which is what a trolley actually hits.
        const guard = box(0.07, 0.19, len, s * (onFace - 0.02), 0.90, cz, pal.guard);
        // And the rail, on brackets, which is what a patient holds.
        const rail = box(0.06, 0.06, len, s * (onFace - 0.09), 1.06, cz, M.rail);
        const brk = [];
        for(let z = span.z0 + 0.8; z < span.z1 - 0.4; z += 1.7){
          brk.push(box(0.11, 0.05, 0.05, s * (onFace - 0.05), 1.06, z, M.rail));
        }
        markStructure([dado, guard, rail, ...brk], 'trim');
      }
    }
    // The crash cart, in the corridor opposite the infusion bay. Red, on the
    // wall, on the side the bay is not — a cart parked across the bay's own open
    // face is a cart in a doorway.
    // Parked hard against the wall and PARALLEL to it: turned across the
    // corridor a 0.9 m cart takes half the width of it — see house rule 9.
    box(0.6, 0.06, 0.88, 1.58, 1.02, 6.5, pal.crash);
    box(0.58, 0.72, 0.86, 1.58, 0.62, 6.5, pal.crash);
    for(const dy of [0.44, 0.62, 0.80]) box(0.61, 0.03, 0.8, 1.56, dy, 6.5, M.base);
    for(const sz of [-1, 1]) for(const sx of [-1, 1]){
      box(0.09, 0.1, 0.09, 1.58 + sx * 0.22, 0.2, 6.5 + sz * 0.33, M.rail);
    }
    box(0.2, 0.5, 0.2, 1.48, 1.32, 6.9, M.frame);            // the cylinder on the end
    hard(1.58, 6.5, 0.66, 0.95, 1.1);
    takeSpine('e', 5.6, 7.4);
  }

  // ------------------------------------- level 1: the working floor
  if(level === 1){
    // Carpet down the middle of the corridor. Two millimetres of it, casting
    // nothing: the cheapest thing in the building that tells a still which floor
    // it was taken on.
    const runner = box(hw * 2 - 0.5, 0.004, sp.z1 - sp.z0 - 1.2, 0, 0.004,
      (sp.z0 + sp.z1) / 2, pal.carpet);
    runner.castShadow = false;
    // The photocopier, on the regulatory office's long wall, with the paper
    // nobody has cleared off the top of it.
    box(0.72, 1.05, 0.98, 1.56, 0.52, 41.0, pal.copier);
    box(0.76, 0.06, 1.02, 1.56, 1.08, 41.0, M.base);
    box(0.3, 0.05, 0.34, 1.48, 1.13, 40.7, pal.paper);
    box(0.16, 0.03, 0.24, 1.42, 1.12, 41.5, pal.screen);
    hard(1.56, 41.0, 0.74, 1.05, 1.1);
    takeSpine('e', 40.1, 41.9);
    // Two pinboards of printed sheets, which is where a floor that argues about
    // numbers puts the numbers. Cork, a frame, and sheets pinned unevenly.
    for(const [side, z] of [['w', 31.0], ['e', 36.6]]){
      const s = side === 'w' ? -1 : 1;
      const bd = box(0.04, 1.15, 2.0, s * onFace, 1.62, z, pal.cork);
      const fr = [];
      for(const dz of [-1.02, 1.02]) fr.push(box(0.05, 1.23, 0.06, s * onFace, 1.62, z + dz, M.frame));
      for(const dy of [-0.61, 0.61]) fr.push(box(0.05, 0.06, 2.06, s * onFace, 1.62 + dy, z, M.frame));
      const sheets = [];
      for(let i = 0; i < 8; i++){
        const col = i % 4, row = (i / 4) | 0;
        sheets.push(box(0.01, 0.30, 0.22, s * (onFace - 0.03),
          1.90 - row * 0.42 + (i % 3) * 0.02, z - 0.72 + col * 0.48 + (i % 2) * 0.03, pal.paper));
      }
      markWallMounted([bd, ...fr, ...sheets], true, -s, 'pinboard');
      takeSpine(side, z - 1.3, z + 1.3);
    }
  }

  // ------------------------------------- level 2: past the firewall
  if(level === 2){
    // The line itself, painted across the floor at the head of the stair. The
    // blinded/unblinded boundary is not a door in this building, so the thing
    // that says you have crossed it has to be underfoot.
    const line = box(hw * 2 - 0.1, 0.004, 0.34, 0, 0.004, sp.z0 + 0.9, pal.hazard);
    line.castShadow = false;
    // A charcoal skirting and a kick strip down both walls: the same corridor,
    // detailed like somewhere you are counted in and out of.
    for(const side of ['w', 'e']){
      const s = side === 'w' ? -1 : 1;
      for(const span of spineSolidSpans(plan, P, side)){
        const len = span.z1 - span.z0 - 0.12;
        if(len < 0.5) continue;
        const cz = (span.z0 + span.z1) / 2;
        const skirt = box(0.03, 0.24, len, s * onFace, 0.12, cz, pal.secure);
        const kick = box(0.03, 0.05, len, s * onFace, 0.26, cz, pal.cage);
        skirt.castShadow = false; kick.castShadow = false;
        markStructure([skirt, kick], 'trim');
      }
    }
    // The badge readers `fitOutRoom` hangs beside every door up here are on this
    // wall too, and the corridor kit has to be kept off them.
    for(const r of (plan.rooms ?? [])){
      const dw = r.door === 'wide' ? P.doorWideW : P.doorW;
      const cz = (r.z0 + r.z1) / 2;
      takeSpine(r.side, cz + dw / 2 - 0.1, cz + dw / 2 + 0.9);
    }
  }

  // -------------------------------------------------- daylight at both ends
  //
  // `plan.glazedEnds` is read by `interiorSite.js` and is NOT carried into the
  // per-level plan `interiorLevels.js` reconstructs — that plan copies
  // `glazedSide`, `ceiling`, `soffit` and `board` and stops — so setting it on
  // this building's plan would do nothing at all, silently. What the builder does
  // do is put four emissive panels across an end it closes, and it closes an end
  // only where there is no stair: the clinic's south end and the unblinded
  // floor's north end. Every other end of every floor had no daylight in it, and
  // level 1 had none at either end.
  //
  // So: the same panel, on the wall the builder raises either side of a stair
  // opening. It is emissive geometry registered as a light panel, never a light —
  // rule 1 — so it dims with the clock like every other window here.
  const openEnd = plan.openEnds ?? {};
  for(const [zz, inward, open] of [[sp.z0, 1, openEnd.z0], [sp.z1, -1, openEnd.z1]]){
    if(!open) continue;                       // the builder already glazed it
    // Close in to the opening rather than spread across the whole end: the
    // corridor walls stop a metre short of the end wall, so what a player
    // actually sees of one of these is the two alcoves either side of the stair,
    // and a panel out at x = 6.6 is round a corner from all of it.
    for(const dx of [-5.6, -2.9, 2.9, 5.6]){
      const zf = zz + inward * (P.wall / 2 + 0.04);
      const pane = box(2.1, 1.95, 0.03, dx, 1.62, zf, pal.sky);
      pane.castShadow = false;
      const fr = [];
      for(const sx of [-1.11, 1.11]) fr.push(box(0.07, 2.09, 0.05, dx + sx, 1.62, zf, M.frame));
      for(const sy of [-1.04, 1.04]) fr.push(box(2.25, 0.07, 0.05, dx, 1.62 + sy, zf, M.frame));
      fr.push(box(2.25, 0.05, 0.05, dx, 1.62, zf, M.frame));      // the transom
      markWallMounted([pane, ...fr], false, inward, 'end window');
      ctx.lightPanels?.push(pane);
    }
  }

  // ---- what a long corridor accumulates: notices, fire points, a records
  // trolley. Nothing in the middle; the spine is how the player gets about.
  //
  // Where each side is actually solid. Not the whole corridor: an `open` room has
  // no spine wall but a nib at each end, every other room has a doorway cut out
  // of the middle of its wall, and between z = 43 and 47 there is no room at all
  // because that is a stair. A board hung at a fixed spacing lands in one of
  // those gaps about a third of the time — which is exactly what it did.
  const solidAt = (side, z) => {
    const NIB = 0.9;
    // Wall this hook already took: the crash cart, the photocopier, the two
    // pinboards, the badge reader beside every door on the top floor.
    if(spineTaken.some(t => t.side === side && z > t.z0 && z < t.z1)) return false;
    for(const r of (plan.rooms ?? []).filter(x => x.side === side)){
      if(z < r.z0 || z > r.z1) continue;
      const cz = (r.z0 + r.z1) / 2;
      if(r.open) return z < r.z0 + NIB || z > r.z1 - NIB;
      const dw = r.door === 'wide' ? P.doorWideW : P.doorW;
      return Math.abs(z - cz) > dw / 2 + 0.2;
    }
    return false;               // no room on this side here: no wall either
  };

  // The site wall, the board antechamber, the clock, the trolley — story.js.
  // Before the corridor kit, so it knows which wall is spoken for.
  const story = dressSpine(ctx);
  spineTaken.push(...story.taken);

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: hw,
    z0: sp.z0, z1: sp.z1,
    wallThickness: P.wall,
    // Per level, and the seed too: one seed for three corridors laid the same
    // trolley at the same offset on all three floors.
    seed: `the_trial-spine-${level}`,
    // The unblinded floor is the quiet one. Everything below it accumulates —
    // rotas, counts, the notice that exists because of something that happened
    // once — and above the line almost nothing may be written down at all, so it
    // gets a third of the signage and half the clutter of the floors under it.
    every: level === 2 ? 8 : 5,
    signEvery: level === 2 ? 7.5 : 3.2,
    hard, soft,
    wallOk: (x, z) => solidAt(x < 0 ? 'w' : 'e', z),
    // The heads and feet of the stairs stay clear: they are how the player gets
    // between the floors, and a notice board in one is a notice board in a doorway.
    // So do the things this hook parked against a wall.
    keepClear: [
      { x: 0, z: sp.z0 + 1.5, r: 2.2 }, { x: 0, z: sp.z1 - 1.5, r: 2.2 },
      ...(level === 0 ? [{ z: 6.5, r: 1.7 }] : []),
      ...(level === 1 ? [{ z: 41.0, r: 1.7 }, { z: 31.0, r: 1.5 }, { z: 36.6, r: 1.5 }] : []),
      ...story.keepClear,
    ],
    signs: [
      { style: 'banner', tag: 'FENWICK COORDINATING CENTRE', heading: 'CLARION-3', accent: '#1f4e6b',
        body: 'Phase III. 2,400 randomised, 31 sites. Second interim analysis this month.' },
      { style: 'warning', tag: 'BLINDED SIDE', heading: 'Everything south of the gates', accent: '#b5502f',
        body: 'Nobody here knows which arm anybody is on. If you find out, tell the trial '
          + 'statistician the same day. It is not a disciplinary matter and it is not optional.' },
      { style: 'list', tag: 'FIRE', heading: 'Wardens, and the assembly point', accent: '#b5502f',
        items: [['Renner', 'ext 2140'], ['Umeh', 'ext 2118'], ['Diouf', 'the warehouse'],
          ['Assembly', 'the car park, by the trees']],
        body: 'The sign-in sheet at Screening is the fire roll.' },
      { style: 'grid', tag: 'THIS WEEK', heading: 'Board pack, then the lock', accent: '#3f6f8f',
        body: 'Queries Tuesday. Adjudication tray cleared Wednesday. Lock Thursday 17:00. '
          + 'Board sits the following Tuesday.' },
    ],
  });
}
