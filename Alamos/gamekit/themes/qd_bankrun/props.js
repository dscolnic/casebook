// props.js — the objects that make Marrable House, and the street out of the window.
//
// Anything generic (worktops, chairs, cabinets, shelving, notices) comes from
// engine/world/interiorKit.js through `furnishRoom`. This file is the handful of
// things that are this place and nowhere else: the counter, the reserve cages,
// the crisis table — and **Marrable Street**, which is the reason the game is in
// a tower at all. Every quantity in this campaign is arithmetic done in a room
// except one, and that one is out of the window and getting longer.
//
// Interior hooks get the builder context from engine/world/interiorSite.js, and
// from the tower, `floor` — which of the four this call is furnishing.

import * as THREE from 'three';
import { furnishRoom, furnishCorridor, furnishingMaterials, paintMural, markStructure,
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
  COUNTER: [
    { style: 'banner', tag: 'THE HALL', heading: 'Pay what is asked, in the order it is asked',
      accent: '#2b3d47',
      body: 'Nobody is turned away and nobody is served out of turn. The queue is '
        + 'the only thing in this building everybody can see.' },
    { style: 'grid', tag: 'BOTH SIDES', heading: 'What we hold against what we owe',
      accent: '#2b3d47',
      body: 'Cash and loans on one side, deposits and the owners\' stake on the '
        + 'other, and the two totals equal by construction.' },
    { style: 'list', tag: 'THIS MORNING', heading: 'As at ten o\'clock', accent: '#5b6a72',
      items: [['Reserves', '10'], ['Loans outstanding', '90'],
        ['Deposits', '90'], ['Owners\' stake', '10']],
      body: 'The last row is what absorbs a loss before a depositor does.' },
    { style: 'warning', tag: 'DO NOT ANNOUNCE A LIMIT', heading: 'Not at the counter',
      accent: '#b5502f',
      body: 'A limit announced is a reason to be early. Anything of that kind is '
        + 'said from the fifth floor or not at all.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Someone said a sound bank has nothing to fear',
      accent: '#8a6a1e', body: '' },
  ],
  LOANS: [
    { style: 'banner', tag: 'THE BOOK', heading: 'Lent long, and callable on demand',
      accent: '#7a5a2b',
      body: 'That mismatch is the business. It is also the whole of what is '
        + 'wrong with this morning.' },
    { style: 'grid', tag: 'THE TRADE', heading: 'Cash meets any demand and earns nothing',
      accent: '#7a5a2b',
      body: 'A loan earns a return and cannot be recalled this afternoon. No '
        + 'prudent bank holds cash for everybody, and that is not carelessness.' },
    { style: 'list', tag: 'MATURITY', heading: 'When the book comes back', accent: '#5b6a72',
      items: [['Within a month', '4'], ['Within a year', '19'],
        ['One to five years', '41'], ['Longer', '26']],
      body: 'Four units are callable this month. Depositors asked for thirty-two today.' },
    { style: 'warning', tag: 'VALUATIONS', heading: 'Worth held and worth sold are different numbers',
      accent: '#b5502f',
      body: 'Both are on the file. Quoting the first one during a run is how a '
        + 'board decides something it would not otherwise decide.' },
  ],
  VAULT: [
    { style: 'grid', tag: 'THE RESERVE', heading: 'What is actually in the building',
      accent: '#3f6f8a',
      body: 'Counted twice daily, and it is a much smaller number than the one on '
        + 'the deposit ledgers downstairs.' },
    { style: 'chart', tag: 'WHAT A SALE RAISES', heading: 'Face value against what is bid today',
      accent: '#3f6f8a',
      body: 'Seventy on the pound this morning and falling, because everybody '
        + 'selling is selling the same week.' },
    { style: 'list', tag: 'TODAY', heading: 'The count', accent: '#5b6a72',
      items: [['In the vault at open', '10'], ['Asked for by noon', '32'],
        ['Sold, face value', '20'], ['Raised by the sale', '14']],
      body: 'The gap between the second row and the last two is the whole question upstairs.' },
    { style: 'warning', tag: 'FORCED SALES', heading: 'Every one of them is priced by the hurry',
      accent: '#b5502f',
      body: 'A buyer who knows you must sell today is a buyer who will wait until three.' },
  ],
  CRISIS: [
    { style: 'banner', tag: 'THE DESK', heading: 'Say which problem this is before choosing a tool',
      accent: '#8a4a3f',
      body: 'Short of cash and short of value are different failures. The same '
        + 'loan cures one and postpones the other at greater cost.' },
    { style: 'grid', tag: 'WHAT A GUARANTEE DOES', heading: 'It changes the reason to queue',
      accent: '#8a4a3f',
      body: 'Promise a depositor their money whether they are first or last, and '
        + 'being first stops being worth anything.' },
    { style: 'list', tag: 'ON THE WIRE', heading: 'Four banks this morning', accent: '#5b6a72',
      items: [['Marrable', 'short of cash'], ['Ordish & Co', 'short of cash'],
        ['Penhale', 'short of value'], ['Vessey', 'not yet asked']],
      body: 'The third row is the one the facility must not be lent to on the same terms.' },
    { style: 'sticky', tag: 'THE WINDOW', heading: 'You can see how long it is from here',
      accent: '#8a6a1e',
      body: 'Down Marrable Street and round into Cathcart Row at half past eleven.' },
  ],
  TELLER: [
    { style: 'list', tag: 'TILLS', heading: 'Made up this morning', accent: '#5b6a72',
      items: [['Till 1', 'opened 09:30'], ['Till 2', 'opened 09:30'],
        ['Till 3', 'opened 10:10'], ['Till 4', 'not opened']],
      body: 'Opening a fourth till would be read as expecting a longer queue.' },
  ],
  LEDGERS: [
    { style: 'grid', tag: 'DEPOSIT LEDGERS', heading: 'Every account, and what it is entitled to',
      accent: '#5b6a72', body: 'Ninety units owed, on demand, to about four thousand people.' },
  ],
  DEALING: [
    { style: 'warning', tag: 'DEALING', heading: 'Nothing sold without the desk knowing the price',
      accent: '#b5502f', body: 'A sale reported afterwards is a valuation nobody agreed to.' },
  ],
  STRONG: [
    { style: 'list', tag: 'STRONGROOM', heading: 'Two keys, two people', accent: '#5b6a72',
      items: [['Morning count', 'done'], ['Midday count', 'done'],
        ['Evening count', 'pending'], ['Discrepancies', 'none']],
      body: 'The count is not a formality on a day like this. It is the number the fifth floor works from.' },
  ],
  PRESS: [
    { style: 'sticky', tag: 'PRESS', heading: 'Nothing is said that is not already true',
      accent: '#8a6a1e', body: 'A reassurance that turns out to be wrong is worth less than silence, twice over.' },
  ],
  CHAIR: [
    { style: 'banner', tag: 'CHAIRMAN', heading: 'Solvent is a claim about value',
      accent: '#33291f', body: 'It is not a claim about this afternoon, and saying it as though it were is how a board loses a bank.' },
  ],
  WIRE: [
    { style: 'list', tag: 'THE WIRE', heading: 'What the other banks are reporting', accent: '#5b6a72',
      items: [['Ordish & Co', 'queue since nine'], ['Penhale', 'closed at eleven'],
        ['Vessey', 'quiet'], ['Country branches', 'quiet so far']],
      body: 'Quiet so far is not a state. It is a time of day.' },
  ],
};

const CORRIDOR_TEXT = [
  { style: 'banner', tag: 'MARRABLE HOUSE', heading: 'Floors two to five', accent: '#2b3d47',
    body: 'Counter on two. Loan book on three. Reserve on four. The desk on five. '
      + 'The lift is the only way between them.' },
  { style: 'list', tag: 'TODAY', heading: 'What is expected where', accent: '#5b6a72',
    items: [['Two', 'both sides of the sheet'], ['Three', 'what the book is worth'],
      ['Four', 'what a sale raises'], ['Five', 'which problem this is'],
      ['Five, later', 'who gets the facility']],
    body: 'Posted at eight this morning. Nothing on it has been revised.' },
  { style: 'warning', tag: 'THE QUEUE', heading: 'Nobody comments on it in the lift',
    accent: '#b5502f', body: 'Not to a customer, not to a clerk, not to each other.' },
  { style: 'grid', tag: 'ONE RULE', heading: 'Short of cash and short of value are different',
    accent: '#8a4a3f',
    body: 'The first is a timing problem and can be lent against. The second is '
      + 'not, and lending into it is a transfer somebody has to account for.' },
  { style: 'sticky', tag: 'NOTICE', heading: 'The lift is slow between three and four',
    accent: '#8a6a1e', body: 'It has been reported. It has been reported since the building opened.' },
  { style: 'list', tag: 'THE MORNING', heading: 'Four numbers', accent: '#3f6f8a',
    items: [['Reserves at open', '10'], ['Asked for by noon', '32'],
      ['Raised by selling', '14'], ['Still owed today', '8']],
    body: 'The last row is what the fifth floor is for.' },
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
  { title: 'Deposits', sub: 'owed on demand', glyph: 'column' },
  { title: 'The book', sub: 'lent for years', glyph: 'bars' },
  { title: 'The trade', sub: 'cash earns nothing', glyph: 'ruler' },
  { title: 'Solvent', sub: 'and short of cash', glyph: 'plate' },
  { title: 'The sale', sub: 'seventy on the pound', glyph: 'points' },
  { title: 'The queue', sub: 'why being early pays', glyph: 'fibre' },
  { title: 'Guarantee', sub: 'the reason removed', glyph: 'flask' },
  { title: 'The facility', sub: 'lent against good paper', glyph: 'camera' },
  { title: 'Diagnosis', sub: 'which problem, first', glyph: 'spiral' },
];

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;      // just inside the spine wall

  // What each room of *this* building has in it. The names are interiorKit's
  // fitting makers; the choice per room is what makes a banking hall read
  // differently from a strongroom.
  const FITTINGS = {
    COUNTER: ['toolBoard', 'rack', 'whiteboard'],
    TELLER:  ['rack', 'toolBoard'],
    LEDGERS: ['rack', 'rack', 'toolBoard'],
    POST:    ['rack', 'barrel'],
    LOANS:   ['rack', 'rack', 'whiteboard', 'toolBoard'],
    SEC:     ['sampleStore', 'rack'],
    CREDIT:  ['rack', 'rack', 'sampleStore'],
    VALUERS: ['whiteboard', 'rack'],
    VAULT:   ['sampleStore', 'sampleStore', 'toolBoard'],
    COUNT:   ['rack', 'toolBoard'],
    DEALING: ['monitorBank', 'toolBoard', 'rack'],
    STRONG:  ['sampleStore', 'sampleStore', 'rack'],
    CRISIS:  ['whiteboard', 'monitorBank', 'whiteboard'],
    CHAIR:   ['rack', 'whiteboard'],
    WIRE:    ['monitorBank', 'toolBoard'],
    PRESS:   ['whiteboard', 'rack'],
  };
  const KIND = {
    COUNTER: 'station', TELLER: 'quiet', LEDGERS: 'workroom', POST: 'supply',
    LOANS: 'lab', SEC: 'workroom', CREDIT: 'supply', VALUERS: 'workroom',
    VAULT: 'station', COUNT: 'workroom', DEALING: 'lab', STRONG: 'supply',
    CRISIS: 'station', CHAIR: 'quiet', WIRE: 'reception', PRESS: 'quiet',
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

  // The counter itself: a long mahogany run across the banking hall with a brass
  // grille over it. A banking hall without a counter is an office, and the
  // counter is the thing the queue outside is a queue for.
  if(room.id === 'COUNTER'){
    box(1.10, 1.15, 7.60, b.cx + f * 0.6, 0.575, b.cz, M.rail);
    box(1.10, 0.10, 7.60, b.cx + f * 0.6, 1.18, b.cz, M.frame);
    for(let i = 0; i < 5; i++){
      box(0.08, 0.85, 0.08, b.cx + f * 0.6, 1.62, b.cz - 3.0 + i * 1.5, M.base);
    }
    hard(b.cx + f * 0.6, b.cz, 1.3, 7.8, 1.2);
  }

  // The reserve room's cages. What is in this building is counted twice a day,
  // and the counting happens against a wall of steel rather than at a desk.
  if(room.id === 'VAULT'){
    box(0.70, 2.20, 6.60, b.xOuter - f * 0.55, 1.10, b.cz, M.base);
    for(let i = 0; i < 5; i++){
      box(0.05, 2.00, 0.06, b.xOuter - f * 0.22, 1.10, b.cz - 2.6 + i * 1.3, M.rail);
    }
    hard(b.xOuter - f * 0.55, b.cz, 0.9, 6.8, 2.2);
  }

  // The crisis desk's own table, down the middle rather than against a wall,
  // because four people sit round it and one of them has to be able to see the
  // window.
  if(room.id === 'CRISIS'){
    box(1.60, 0.78, 3.60, b.cx, 0.39, b.cz, M.frame);
    hard(b.cx, b.cz, 1.8, 3.8, 0.85);
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
    // Where those planes are actually solid.
    //
    // `roomWallOk` knows about doorways and cross-walls and does not know about
    // glass, so on a glazed face it reports a wall and `furnishRoom` hangs a
    // notice board on a window. `placement` fires a ray through it and reports
    // fifty-seven floating fittings — which is the only thing that finds it,
    // because from inside a room a board over a window looks like a board.
    // The west face of every room on this plate is the street front.
    wallOk: (x, z, wallName) => {
      if(Math.abs(x - b.xOuter) < 0.5) return false;
      return roomWallOk(room, b, ctx.plan, ctx.P)(x, z, wallName);
    },
    kind: KIND[room.id] ?? room.kind ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    // A bank in 1933 types on foolscap and writes ledgers by hand. A bright
    // white notice in a room lit like this reads as a light box.
    print: { paper: '#e7dfc7', ink: '#241d13', soft: '#6d6450', accent: '#2b3d47' },
    seed: `qd_bankrun-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand, at the far end of every group room. Furniture standing
      // on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      // The counter, the cages and the crisis table.
      ...(room.id === 'COUNTER' ? [{ x: b.cx + f * 0.6, z: b.cz, r: 2.2 }] : []),
      ...(room.id === 'VAULT' ? [{ x: b.xOuter - f * 0.55, z: b.cz, r: 1.5 }] : []),
      ...(room.id === 'CRISIS' ? [{ x: b.cx, z: b.cz, r: 2.4 }] : []),
    ],
    target: 16,
  });

  // Paint, where a room earns it. Low contrast and unframed: a mural is meant to
  // be seen and not read.
  // Murals go on EAST rooms only. The west face of every room on this plate is
  // the street front, and a mural painted on it is painted on a window — which
  // renders correctly, hangs in mid-air over Marrable Street, and is invisible
  // to everything except `placement`.
  const MURAL = {
    // Both sides of a balance sheet at the scale of the wall, in the room where
    // the right-hand side is written down by hand.
    LEDGERS: { kind: 'lattice', w: 4.4, h: 2.3, ink: '#2b3d47' },
    // A queue doubling back on itself, enormous and faint, on the wall of the
    // room that spends the afternoon watching one.
    DEALING: { kind: 'spiral', w: 4.2, h: 2.3, ink: '#8a4a3f' },
    // One field of colour and nothing to read.
    PRESS:   { kind: 'wash', w: 3.8, h: 2.2, paper: '#dbd3ba' },
  }[room.id];
  if(MURAL){
    paintMural({
      box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
      x: b.xOuter - f * 0.12, y: 1.85, z: b.cz, faceX: true, toward: -f,
      paper: '#dad2b9',
      ...MURAL,
    });
  }
}

/**
 * Fit out the corridor.
 *
 * Fifty metres of it, and it is the only route between the two halves of the
 * argument. What goes in it is what accumulates in a working bank — notice
 * boards, fire points, a trolley of ledgers somebody left — and nothing stands in the
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
    seed: 'qd_bankrun-spine',
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
    plan, P, side, run: sp, paper: '#dad2b9', ...opts,
  });

  // The chain, along the east wall.
  //
  // The band is at 2.20 with a 0.62 m height in every one of these buildings,
  // whatever the ceiling is, because what sets it is where the player's eye is
  // rather than where the slab is. Set against `tileH` instead it sits above the
  // top of a 66-degree frame at walking distance from the wall, and a corridor
  // drawing nobody can see while walking is a corridor drawing that is not there.
  along('e', { y: 2.20, h: 0.62, kind: 'chain', ink: '#2b3d47', soft: '#6d6450',
    text: { stations: CHAIN_STATIONS } });

  // And a painted band along the west wall at waist height, which says nothing
  // and is the only thing in the corridor that does not.
  along('w', { y: 0.9, h: 0.44, kind: 'wash', paper: '#aca185' });
}

// --------------------------------------------------------------- the outside
//
// How far down Marrable Street is. Floor 2 is the game's ground, so everything
// out there is measured from it: the banking hall's own double-height storey and
// the pavement under it.
const STREET_Y = -11;
/** The plate, so the facade is built on the same line the windows are. */
const PLATE = { x: 9.3, z0: -11, z1: 13 };

/**
 * A grid of windows, most of them dark.
 *
 * At this distance a building is a silhouette plus whether the lights are on,
 * and the second half is what makes it a working street rather than a model of
 * one. One canvas, reused by every block: a texture per building would be two
 * hundred textures.
 */
function windowTexture(base, glass, lit, seed = 1){
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, 64, 64);
  let s = seed || 1;
  const rnd = () => ((s = (s * 48271) % 2147483647) / 2147483647);
  for(let row = 0; row < 8; row++){
    for(let col = 0; col < 8; col++){
      g.fillStyle = rnd() > 0.88 ? lit : glass;
      g.fillRect(col * 8 + 1.5, row * 8 + 2, 5, 4.5);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.LinearFilter;
  return t;
}

/** A vertical gradient, for the one thing out there that is not a building. */
function skyTexture(){
  const c = document.createElement('canvas');
  c.width = 4; c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0.00, '#7f8d96');
  grad.addColorStop(0.45, '#a3adb2');
  grad.addColorStop(0.80, '#c0c4c1');
  grad.addColorStop(1.00, '#b4b5ac');
  g.fillStyle = grad; g.fillRect(0, 0, 4, 128);
  return new THREE.CanvasTexture(c);
}

/**
 * What is outside every window on the street front.
 *
 * Nothing here is lit by the interior rig — a street under a RoomEnvironment IBL
 * is a street inside a lampshade — so it is Lambert against the ambient and the
 * hemisphere, which gives roofs brighter than flanks and costs no shadow map.
 * All of it is `ignoreAudit` and `structure`: a facade is not a fitting and
 * `pieceDensity` should not count a skyline.
 *
 * Two things here are load-bearing and both were learnt the expensive way on the
 * other tower in this repo. **Every floor needs its own slab edge and spandrel**,
 * or from outside the building is four trays of furniture stacked in mid-air with
 * daylight between them — and from inside it merely looks hazy, so only a
 * screenshot from the street says so. And **the city has to reach two
 * kilometres**: a window seen from a few metres back lets the eye down about
 * eleven degrees, so a street that stops at three hundred metres leaves a blank
 * band across the bottom of every window in the building.
 */
export function decorate(scene, ctx){
  if(!scene) return;
  const floors = ctx?.floors ?? [];
  const rise = ctx?.rise ?? 4.6;
  const topY = (floors[floors.length - 1]?.y ?? 13.8);

  const M = {
    sky:      new THREE.MeshBasicMaterial({ map: skyTexture(), side: THREE.BackSide, fog: false }),
    road:     new THREE.MeshLambertMaterial({ color: 0x3a3a38 }),
    pavement: new THREE.MeshLambertMaterial({ color: 0x6f6d66 }),
    person:   new THREE.MeshLambertMaterial({ color: 0x24262a }),
    stone:    new THREE.MeshLambertMaterial({ color: 0x8b8271 }),
    // The building's own skin, below and above the four floors the game is on.
    skin:     new THREE.MeshLambertMaterial({ map: windowTexture('#7d7566', '#3d4750', '#d8caa0', 7) }),
    spandrel: new THREE.MeshLambertMaterial({ color: 0x6d6555 }),
    far:      new THREE.MeshLambertMaterial({ color: 0x6a6f70 }),
  };
  M.skin.map.repeat.set(3, 6);

  const put = (w, h, d, x, y, z, mat, ry = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.rotation.y = ry;
    m.castShadow = false; m.receiveShadow = false;
    m.userData.ignoreAudit = true;
    markStructure([m], 'scenery');
    scene.add(m);
    return m;
  };

  // ---- the sky. A dome rather than a background colour, because a flat clear
  // colour reads as fog and the horizon is what says how high up this is.
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2400, 24, 16), M.sky);
  dome.position.y = STREET_Y + 200;
  dome.userData.ignoreAudit = true;
  markStructure([dome], 'sky');
  scene.add(dome);

  // ---- the building itself, below and above the four floors that are the game.
  const shaftH = -STREET_Y;
  for(const [w, d, x, z] of [
    [PLATE.x * 2 + 0.5, 0.4, 0, PLATE.z0 - 0.25],
    [PLATE.x * 2 + 0.5, 0.4, 0, PLATE.z1 + 0.25],
    [0.4, PLATE.z1 - PLATE.z0 + 0.5, -PLATE.x - 0.25, (PLATE.z0 + PLATE.z1) / 2],
    [0.4, PLATE.z1 - PLATE.z0 + 0.5, PLATE.x + 0.25, (PLATE.z0 + PLATE.z1) / 2],
  ]){
    put(w, shaftH, d, x, STREET_Y + shaftH / 2, z, M.skin);
    for(const f of floors){
      put(w, 0.5, d, x, f.y + 0.1, z, M.spandrel);                            // slab edge
      put(w, rise - 3.1, d, x, f.y + 3.1 + (rise - 3.1) / 2, z, M.spandrel);  // spandrel
    }
  }
  // The cornice and the roof, so the top of the building is a top.
  put(PLATE.x * 2 + 1.4, 1.0, PLATE.z1 - PLATE.z0 + 1.4, 0, topY + 3.6, (PLATE.z0 + PLATE.z1) / 2, M.stone);
  put(7.0, 2.6, 6.0, -2.0, topY + 5.4, 3.0, M.spandrel);

  // ---- Marrable Street, running north to south past the west front, with the
  // pavement the queue stands on and the block opposite.
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(4800, 4800), M.road);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = STREET_Y;
  ground.userData.ignoreAudit = true;
  markStructure([ground], 'scenery');
  scene.add(ground);
  // The pavement outside the west front. It is here so the queue reads: a dark
  // figure on dark asphalt is nothing, and against pale paving it is a queue.
  put(7.0, 0.26, 150, -13.5, STREET_Y + 0.14, 0, M.pavement);
  put(6.0, 0.26, 150, -30.0, STREET_Y + 0.14, 0, M.pavement);
  // The block opposite, and the terrace running away north and south of it.
  //
  // Kept BELOW the eye line of the top floor on purpose. The first cut put a
  // twenty-six metre block twenty metres away, which from floor five fills the
  // whole window with brickwork: the street, the pavement and the queue are all
  // behind it and the one thing this building exists to show is gone. A
  // screenshot from inside is the only thing that says so, because from the
  // model's point of view the block is exactly where a block should be.
  put(20, 15, 44, -58, STREET_Y + 7.5, -8, M.skin);
  put(20, 1.1, 44, -58, STREET_Y + 15.6, -8, M.stone);
  put(17, 13, 40, -56, STREET_Y + 6.5, 42, M.skin);
  put(17, 16, 38, -56, STREET_Y + 8, -58, M.skin);

  // ---- the city behind it, out to two kilometres. Four ranks, each one lower
  // and hazier: what a street looks like from twenty-five metres up is a wall
  // opposite and then a long way of roofs.
  let seed = 7;
  const rnd = () => ((seed = (seed * 48271) % 2147483647) / 2147483647);
  for(const [dist, count, hi] of [[150, 22, 14], [340, 26, 18], [700, 24, 24], [1500, 18, 30]]){
    for(let i = 0; i < count; i++){
      const x = -dist - rnd() * dist * 0.5;
      const z = (rnd() - 0.5) * dist * 3.2;
      const h = 8 + rnd() * hi;
      const w = 16 + rnd() * 30;
      put(w, h, w * (0.7 + rnd() * 0.7), x, STREET_Y + h / 2, z, dist > 400 ? M.far : M.skin);
    }
  }

  /**
   * The queue, on the pavement below.
   *
   * A person at twenty-five metres is a recognisable figure rather than a speck,
   * which is the opposite of the other tower in this repo and is why this street
   * is only four storeys down. What matters about the queue is how far along it
   * goes, so it runs the length of the west front and turns the corner — and the
   * crisis desk on the top floor is the only room that can see the whole of it.
   * Instanced: one draw call for the lot.
   */
  const N = 190;
  const queue = new THREE.InstancedMesh(new THREE.BoxGeometry(0.58, 1.72, 0.58), M.person, N);
  queue.userData.ignoreAudit = true;
  const tmp = new THREE.Object3D();
  for(let i = 0; i < N; i++){
    const t = i / N;
    // Two abreast along the pavement, then round the corner at the south end.
    let x, z;
    if(t < 0.72){
      x = -12.0 - ((i % 2) * 1.5);
      z = PLATE.z0 + 1 + (t / 0.72) * 92;
    } else {
      const u = (t - 0.72) / 0.28;
      x = -12.0 - u * 34;
      z = PLATE.z0 + 95 + ((i % 2) * 1.4);
    }
    tmp.position.set(x, STREET_Y + 0.86 + 0.26, z + ((i * 7919) % 11) * 0.06);
    tmp.rotation.y = ((i * 104729) % 100) / 100 * 0.7;
    tmp.updateMatrix();
    queue.setMatrixAt(i, tmp.matrix);
  }
  markStructure([queue], 'scenery');
  scene.add(queue);
}
