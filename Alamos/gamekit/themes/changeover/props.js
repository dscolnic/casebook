// props.js — the objects that make Kesteven House, and the city out of the glass.
//
// Anything generic (worktops, chairs, cabinets, shelving, crates, notices) comes
// from engine/world/interiorKit.js through `furnishRoom`. This file is the dozen
// or so things that are this place and nowhere else:
//
//   · **the city, from a hundred and eighty metres up**, which is the reason the
//     game is in a tower at all — every quantity this course asks about has
//     something out of the window that it is a number for;
//   · the plaza directly below, with the queue for the counter on it, which is
//     the money supply and the expectations at the same time;
//   · Vend Street running west, whose prices are two thirds of the basket;
//   · the port on the eastern horizon, where the trade figures come from;
//   · the note scales, the ledger racks, the telex bank and the board table —
//     four rooms' worth of equipment that is what this fortnight is made of.
//
// Interior hooks get the builder context from engine/world/interiorSite.js:
//   { scene, plan, geo, P, box, wall, materials, soft, hard, addInteractable }
// and, from the tower, `floor` — which of the four this call is furnishing.

import * as THREE from 'three';
import { furnishRoom, furnishCorridor, furnishingMaterials, markStructure }
  from '../../engine/world/interiorKit.js';

// --------------------------------------------------------------- the outside
//
// How far down the plaza is. Floor 45 is the game's ground, so everything out
// there is measured from it: the tower's own forty-four floors below, and a city
// whose tallest other building comes to about a third of this one.
const PLAZA_Y = -180;
/** The plate, so the facade is built on the same line the glass is. */
const PLATE = { x: 10.6, z0: -12, z1: 14 };

/**
 * A grid of windows, most of them dark.
 *
 * At this distance a building is a silhouette plus whether the lights are on,
 * and the second half is what makes it a working city rather than a model of
 * one. One canvas, reused by every block: a texture per building would be nine
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
      const r = rnd();
      g.fillStyle = r > 0.86 ? lit : glass;
      g.fillRect(col * 8 + 1.5, row * 8 + 2, 5, 4.5);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.LinearFilter;
  return t;
}

/** A vertical gradient, for the one thing in this game that is not a building. */
function skyTexture(){
  const c = document.createElement('canvas');
  c.width = 4; c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0.00, '#6d90b4');
  grad.addColorStop(0.45, '#a8c0d4');
  grad.addColorStop(0.78, '#cfd8dc');
  grad.addColorStop(1.00, '#c2c8c6');
  g.fillStyle = grad; g.fillRect(0, 0, 4, 128);
  return new THREE.CanvasTexture(c);
}

/**
 * What is outside every window.
 *
 * Nothing here is lit by the interior rig — a city under a RoomEnvironment IBL
 * is a city inside a lampshade — so it is Lambert against the ambient and the
 * hemisphere, which gives roofs brighter than flanks and costs no shadow map.
 * All of it is `ignoreAudit` and `structure`: a hundred and eighty metres of
 * facade is not a fitting, and `pieceDensity` should not count a skyline.
 */
export function decorate(scene, ctx){
  if(!scene) return;
  const floors = ctx?.floors ?? [];
  const rise = ctx?.rise ?? 4.4;
  const topY = (floors[floors.length - 1]?.y ?? 13.2);

  const M = {
    sky:    new THREE.MeshBasicMaterial({ map: skyTexture(), side: THREE.BackSide, fog: false }),
    plaza:  new THREE.MeshLambertMaterial({ color: 0x40433f }),
    kerb:   new THREE.MeshLambertMaterial({ color: 0x74776f }),
    water:  new THREE.MeshLambertMaterial({ color: 0x46595e }),
    person: new THREE.MeshLambertMaterial({ color: 0x2b2f33 }),
    stone:  new THREE.MeshLambertMaterial({ color: 0xb2a894 }),
    crane:  new THREE.MeshLambertMaterial({ color: 0x8c5a3c }),
    // The tower's own skin, below the four floors the game is played on.
    skin:   new THREE.MeshLambertMaterial({ map: windowTexture('#8d8a80', '#43555e', '#e2d9b4', 11) }),
    spandrel: new THREE.MeshLambertMaterial({ color: 0x7f7d74 }),
    plant:  new THREE.MeshLambertMaterial({ color: 0x6e6c64 }),
  };
  // Three bays across and one row a floor. At (6, 44) the windows came out
  // smaller than the mullions and the whole shaft read as a chequerboard.
  M.skin.map.repeat.set(3, 41);

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
  // colour at this altitude reads as fog and the horizon is what tells the
  // player how high up they are.
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1200, 24, 16), M.sky);
  dome.position.y = PLAZA_Y + 200;
  dome.userData.ignoreAudit = true;
  markStructure([dome], 'sky');
  scene.add(dome);

  // ---- the tower itself, above and below the four floors that are the game.
  //
  // Forty-four floors of skin under the player's feet, and the parapet over
  // their head. Without it the four plates hang in the air and the city below is
  // seen past the edge of nothing.
  const shaftH = -PLAZA_Y;
  for(const [w, d, x, z] of [
    [PLATE.x * 2 + 0.5, 0.4, 0, PLATE.z0 - 0.25],
    [PLATE.x * 2 + 0.5, 0.4, 0, PLATE.z1 + 0.25],
    [0.4, PLATE.z1 - PLATE.z0 + 0.5, -PLATE.x - 0.25, (PLATE.z0 + PLATE.z1) / 2],
    [0.4, PLATE.z1 - PLATE.z0 + 0.5, PLATE.x + 0.25, (PLATE.z0 + PLATE.z1) / 2],
  ]){
    put(w, shaftH, d, x, PLAZA_Y + shaftH / 2, z, M.skin);
    /**
     * The slab edge and the spandrel at every one of the game's own four floors.
     *
     * Without this the top of the building is a doll's house: the curtain wall is
     * ten per cent opaque, so from outside — and from any floor looking down past
     * its own cill — the four plates are trays of furniture stacked in mid-air
     * with daylight between them. It took a screenshot from outside to see it;
     * from inside, every window looked merely hazy.
     *
     * Two bands, because a floor of a tower shows two things from outside: the
     * edge of the slab you are standing on, and the spandrel between the head of
     * your glass and the slab above.
     */
    for(const f of floors){
      put(w, 0.5, d, x, f.y + 0.1, z, M.spandrel);                          // slab edge
      put(w, rise - 3.0, d, x, f.y + 3.0 + (rise - 3.0) / 2, z, M.spandrel); // spandrel
    }
  }
  // The roof: parapet, plant room and the lift motor room over the shaft.
  put(PLATE.x * 2 + 1.2, 1.1, PLATE.z1 - PLATE.z0 + 1.2, 0, topY + 3.5, (PLATE.z0 + PLATE.z1) / 2, M.spandrel);
  put(9.0, 3.4, 7.0, -3.0, topY + 5.6, 2.6, M.plant);
  put(1.2, 6.5, 1.2, 6.0, topY + 7.2, -6.0, M.plant);

  // ---- the plaza, and the podium the tower stands on
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(4600, 4600), M.plaza);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = PLAZA_Y;
  ground.userData.ignoreAudit = true;
  markStructure([ground], 'scenery');
  scene.add(ground);
  put(56, 9, 46, 0, PLAZA_Y + 4.5, 1, M.stone);          // the podium
  put(80, 0.3, 70, 0, PLAZA_Y + 0.16, 1, M.kerb);        // the paving round it
  // Vend Street's own paving, running west from the door. It is here so the queue
  // reads: a dark figure on dark asphalt from a hundred and eighty metres up is
  // three pixels of nothing, and against pale paving it is a queue.
  put(210, 0.28, 26, -140, PLAZA_Y + 0.2, 8, M.kerb);

  /**
   * The queue, on the plaza, forty-four floors down.
   *
   * A person 1.7 m tall at 180 m subtends about nine pixels at this field of
   * view, so a queue reads as a line of specks that is either long or short —
   * which is the only quantity about it that matters, and the one the counter
   * floor argues about every morning. Instanced: one draw call for the lot.
   */
  const queueN = 150;
  const queue = new THREE.InstancedMesh(new THREE.BoxGeometry(0.62, 1.75, 0.62), M.person, queueN);
  queue.userData.ignoreAudit = true;
  const tmp = new THREE.Object3D();
  for(let i = 0; i < queueN; i++){
    // Out of the podium, west along Vend Street, and doubling back twice — a
    // queue that has been there since before the doors opened.
    const t = i / queueN;
    const leg = Math.floor(t * 3);
    const along = (t * 3 - leg);
    // Clear of the podium, which is 56 m across: the first thirty metres of the
    // queue was inside it.
    const x = -34 - along * 92;
    const z = 6 + leg * 3.2 + ((i * 7919) % 13) * 0.14;
    tmp.position.set(x, PLAZA_Y + 0.9, z);
    tmp.rotation.set(0, 0, 0);
    tmp.updateMatrix();
    queue.setMatrixAt(i, tmp.matrix);
  }
  scene.add(queue);

  // ---- the river, north-east, and the port on the far side of it
  put(4600, 0.6, 150, 0, PLAZA_Y + 0.3, -430, M.water);
  for(let i = 0; i < 7; i++){
    const x = -260 + i * 96;
    put(74, 11, 26, x, PLAZA_Y + 5.5, -336, M.stone);          // the quays
    put(3.0, 34, 3.0, x - 18, PLAZA_Y + 17, -344, M.crane);    // and a crane on each
    put(26, 2.2, 2.4, x - 6, PLAZA_Y + 33, -344, M.crane);
  }

  /**
   * The city: a grid of blocks with streets left in it.
   *
   * Three instanced meshes, one per stone, so the whole skyline is three draw
   * calls. The gaps are the streets and they are not decoration — Vend Street is
   * named on the price room's own basket sheet, and the player can look down it.
   */
  //
  // **Two rings, and the outer one is not decoration.** From inside a room the
  // player stands six metres back from the glass, and a 3 m window at that
  // distance only lets the eye down about eleven degrees — which from a hundred
  // and eighty metres up first meets the ground **nine hundred metres out**. A
  // city that stops at 760 m is therefore a city that is invisible from every
  // room in the building and visible only from the corridor ends, which is how
  // the first version of this looked: a flat grey field out of every window.
  // Measured off a screenshot, not reasoned about in advance.
  const RINGS = [
    { cell: 34, reach: 760, lo: 62 },
    { cell: 96, reach: 1600, lo: 760 },
  ];
  const buckets = [[], [], []];
  for(const R of RINGS){
    for(let gx = -R.reach; gx <= R.reach; gx += R.cell){
      for(let gz = -R.reach; gz <= R.reach; gz += R.cell){
        const r = Math.hypot(gx, gz);
        if(r < R.lo || r > R.reach) continue;              // this ring only
        if(gz < -350 && gz > -510) continue;               // the river
        if(Math.abs(gz - 6) < 17 && gx < -40) continue;    // Vend Street, west
        if(Math.abs(gx) < 17 && gz > 40) continue;         // Ferrand Row, south
        const n = ((gx * 73856093) ^ (gz * 19349663)) >>> 0;
        if((n % 100) < 16) continue;                       // squares and yards
        // Tall in the middle, low at the edges — and a handful of real towers in
        // the inner ring, because a city with no second-tallest building gives
        // the eye nothing to measure this one against.
        const tall = r < 320 && (n % 23) === 0;
        const h = tall ? 58 + (n % 31) : 9 + (n % 47) * (r < 300 ? 1.15 : 0.6);
        const w = R.cell * (0.5 + ((n >> 7) % 30) / 100);
        const d = R.cell * (0.5 + ((n >> 13) % 30) / 100);
        buckets[n % 3].push([w, h, d, gx + ((n >> 3) % 7) - 3, PLAZA_Y + h / 2, gz + ((n >> 9) % 7) - 3]);
      }
    }
  }
  // Darker than looks right on the canvas, which is rule 6 in a city: under ACES
  // with a bright sky a mid stone renders as white card, and the first version of
  // this skyline was nine hundred pale boxes with no depth in it at all.
  const stones = ['#6b6760', '#5c5d59', '#77705f'];
  buckets.forEach((rows, i) => {
    if(!rows.length) return;
    const mat = new THREE.MeshLambertMaterial({
      map: windowTexture(stones[i], '#3d4a52', '#e6dcb8', 17 + i * 5) });
    mat.map.repeat.set(4, 6);
    const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mat, rows.length);
    mesh.userData.ignoreAudit = true;
    rows.forEach(([w, h, d, x, y, z], k) => {
      tmp.position.set(x, y, z);
      tmp.scale.set(w, h, d);
      tmp.rotation.set(0, 0, 0);
      tmp.updateMatrix();
      mesh.setMatrixAt(k, tmp.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    scene.add(mesh);
  });

  // ---- Ferrand Row: the old central bank, low, pale and two hundred metres
  // south. The building the board would be in if this fortnight were normal.
  put(64, 24, 40, 0, PLAZA_Y + 12, 214, M.stone);
  put(70, 1.6, 46, 0, PLAZA_Y + 24.8, 214, M.kerb);
}

// ------------------------------------------------------------- the interiors
/** What is on the walls, room by room. Nine parts earnest, one part the joke a
 *  real office has. Everything here has to land at walking pace. */
const WALL_TEXT = {
  COUNTER: [
    { style: 'warning', tag: 'AT THE COUNTER', heading: 'No rate is quoted from this floor', accent: '#b5502f',
      body: 'Downstairs answers questions about today. Anything about Monday goes to the board, '
        + 'in writing. A number said out loud at a counter is a number the city has heard.' },
    { style: 'list', tag: 'EVERY OPENING', heading: 'In this order', accent: '#1f3d52',
      items: [['Count', 'the float, before the doors'], ['Post', 'the daily limit where it can be read'],
        ['Log', 'the queue at the hour, not the average'], ['Wire', 'the take up at four']],
      body: 'The queue at the hour is a measurement. The average is a comfort.' },
    { style: 'chart', tag: 'TAKE-UP', heading: 'Share taking the full limit, by day', accent: '#8a6a1e',
      body: 'Nine in ten on day one. If it stays there, the limit is the policy and not the ceiling.' },
    { style: 'tally', tag: 'DAYS OPEN', heading: 'Without turning anyone away', accent: '#5b6a72', body: '' },
  ],
  NOTES: [
    { style: 'warning', tag: 'CANCELLED NOTES', heading: 'Nothing leaves this floor uncancelled', accent: '#b5502f',
      body: 'Two signatures on the weight, then the punch. An old mark that walks back out of '
        + 'this room is money supply nobody has counted.' },
    { style: 'grid', tag: 'SCALES', heading: 'Kilogram to a million marks', accent: '#8a6f4a',
      body: 'Eleven hundred notes to the kilo, mixed denominations. Weigh, do not count, and '
        + 'record which denominations the sack was.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Scale 2 reads light', accent: '#b5502f',
      body: 'Four hundred grams under, every load. Certificate is in the drawer. — T.T.' },
  ],
  PRICES: [
    { style: 'banner', tag: 'THE BASKET', heading: 'Price what people buy, not what we listed in 1954', accent: '#3f8f7a',
      body: 'Twelve of the forty-one lines are things this city no longer sells. An index of a '
        + 'city nobody lives in is an accurate number about nothing.' },
    { style: 'list', tag: 'EVERY WEDNESDAY', heading: 'Vend Street, both sides', accent: '#1f3d52',
      items: [['Same shops', 'the same shops as last week'], ['Same size', 'the tin, not the price per tin'],
        ['Note it', 'when a size changes and the price does not'], ['Sign it', 'the collector signs, not the desk']],
      body: 'A smaller tin at the same price is inflation with the label filed off.' },
    { style: 'chart', tag: 'INDEX', heading: 'Base 100, four years', accent: '#8a6a1e',
      body: 'The step in the spring is the fuel line, not the basket. Say which, every time.' },
  ],
  BANKS: [
    { style: 'banner', tag: 'THE LEDGERS', heading: 'Reserves are what is here, not what is promised', accent: '#5f7fa8',
      body: 'Eleven regional banks, one column each. The column that matters is the one that '
        + 'has to be there on the fifteenth.' },
    { style: 'chart', tag: 'MULTIPLIER', heading: 'What a reserve requirement does to deposits', accent: '#8a6a1e',
      body: 'One over the requirement, and the requirement is the only end of that we hold.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Kestrel Mutual returns are late again', accent: '#b5502f',
      body: 'Third week. Chase before the board asks, not after. — P.I.' },
  ],
  TRADE: [
    { style: 'warning', tag: 'WIRE ROOM', heading: 'Nothing quoted goes out unsigned', accent: '#b5502f',
      body: 'A rate on a telex is a rate the counterparty can hold us to. Signature and time '
        + 'on every outgoing, and the time is the time it was sent.' },
    { style: 'grid', tag: 'THE WIRES', heading: 'Six correspondents, three time zones', accent: '#4a7f8a',
      body: 'The port desk closes at four and the western wires open at five, so the hour '
        + 'between them is the only hour anybody can be told anything.' },
    { style: 'chart', tag: 'CURRENT ACCOUNT', heading: 'Goods, services and what pays for both', accent: '#8a6a1e',
      body: 'The gap is not a mistake. It is somebody buying our paper, and it stops when they stop.' },
  ],
  RATE: [
    { style: 'banner', tag: 'THE BOARD', heading: 'One rate, published once, held', accent: '#8a5c7f',
      body: 'A rate the board revisits on Tuesday is not a rate. It is a forecast, and the city '
        + 'will price the next one before we have set it.' },
    { style: 'list', tag: 'BEFORE THE VOTE', heading: 'On the table, every time', accent: '#1f3d52',
      items: [['The index', 'certified, with the basket printed'], ['The supply', 'weighed, not estimated'],
        ['The reserves', 'what can be defended for a fortnight'], ['The lag', 'when this lands, not when it is voted']],
      body: 'The last line is the one the minutes always leave out.' },
    { style: 'tally', tag: 'DAYS', heading: 'Until the old mark stops being money', accent: '#b5502f', body: '' },
  ],
  LOOKOUT: [
    { style: 'banner', tag: 'FROM THIS WINDOW', heading: 'Everything on the board is out there', accent: '#1f3d52',
      body: 'The queue on the plaza is the money supply. Vend Street is the basket. The port is '
        + 'the current account. Nothing in this building is abstract; it is only far away.' },
  ],
  PRESS: [
    { style: 'warning', tag: 'PRESS ROOM', heading: 'The board speaks once, at four', accent: '#b5502f',
      body: 'Anything said before four is a leak whatever it is true of, because the city will '
        + 'trade on it before the board has voted.' },
  ],
};

/**
 * What is on the corridor walls, floor by floor.
 *
 * The corridor of a building whose floors are all the same plate is the one place
 * a player can be lost, so every floor's signage says which floor it is and what
 * is on it. Nine parts earnest, one part the joke a real office has.
 */
const SPINE_SIGNS = {
  0: [
    { style: 'banner', tag: 'FLOOR 45', heading: 'Counter floor — currency board', accent: '#1f3d52',
      body: 'Counter room and note room. The counters themselves are on the plaza; nothing is '
        + 'paid out on this floor and the sign downstairs says so twice.' },
    { style: 'list', tag: 'THE FOUR FLOORS', heading: 'What is on each', accent: '#5b6a72',
      items: [['45', 'counter, notes'], ['46', 'prices, banks'], ['47', 'wires, port'],
        ['48', 'the board']],
      body: 'The lift is the only way between them. Allow a minute a floor and rather more at four.' },
    { style: 'warning', tag: 'GOODS HOIST', heading: 'Cancelled notes only, both signatures', accent: '#b5502f',
      body: 'Nothing goes down this shaft that has not been weighed, punched and entered. What '
        + 'reaches the furnace cannot be brought back and counted again.' },
  ],
  1: [
    { style: 'banner', tag: 'FLOOR 46', heading: 'Measurement floor', accent: '#3f8f7a',
      body: 'Price room, ledger hall, calculating room. Every figure the board publishes is '
        + 'built on this floor and signed on the one above it.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Comptometer 4 is out again', accent: '#b5502f',
      body: 'Do not use it for the index. It rounds the third place down. — E.R.' },
    { style: 'list', tag: 'VEND STREET', heading: 'Collection, every Wednesday', accent: '#1f3d52',
      items: [['Same shops', 'both sides, in order'], ['Same size', 'the tin, not the price'],
        ['Note it', 'when a size changes'], ['Sign it', 'the collector signs']],
      body: 'It is four hundred metres west and visible from the price room window. There is no '
        + 'excuse for pricing it from memory.' },
  ],
  2: [
    { style: 'banner', tag: 'FLOOR 47', heading: 'Wire floor', accent: '#4a7f8a',
      body: 'Wire room, telex, port desk, press. Everything that arrives from outside Halvern '
        + 'arrives on this floor, and everything said to outside Halvern leaves from it.' },
    { style: 'warning', tag: 'OUTGOING', heading: 'Nothing quoted goes out unsigned', accent: '#b5502f',
      body: 'A rate on a wire is a rate a counterparty can hold us to. Signature and the time it '
        + 'was actually sent, on every one.' },
    { style: 'grid', tag: 'THE HOUR', heading: 'Four to five, every day', accent: '#8a6a1e',
      body: 'The port desk closes at four and the western wires open at five. That hour is the '
        + 'only one in which anybody can be told anything.' },
  ],
  3: [
    { style: 'banner', tag: 'FLOOR 48', heading: 'The board', accent: '#8a5c7f',
      body: 'Rate room, dealing desk, and the observation room at the north end, which is open '
        + 'and which everything on the board can be seen from.' },
    { style: 'warning', tag: 'BEFORE FOUR', heading: 'Nothing is said to the press', accent: '#b5502f',
      body: 'The board speaks once, at four, in writing. Anything said earlier is a leak whatever '
        + 'it is true of, because the city will trade on it before the vote.' },
    { style: 'tally', tag: 'DAYS', heading: 'Until the old mark stops being money', accent: '#b5502f', body: '' },
  ],
};

/** The one big thing each room is, before the generic furniture goes in. */
function signature(room, ctx){
  const { bounds: b, box, materials: M, soft, hard } = ctx;
  const f = b.sign;
  const inX = b.xInner + f * 1.4;
  const midX = b.cx;

  switch(room.id){
    case 'COUNTER': {
      // The counter floor does not have a counter on it — the counters are on
      // the plaza, forty-four floors down. What is here is the board they are
      // run from: a long desk facing the window, with the queue in it.
      box(0.7, 0.78, 5.4, inX, 0.39, b.cz, M.frame);
      hard(inX, b.cz, 0.9, 5.6, 0.85);
      for(const dz of [-1.8, 0, 1.8]) soft(inX + f * 0.8, b.cz + dz, 0.35);
      return true;
    }
    case 'NOTES': {
      // Three platform scales and a punch press. The money supply, by weight.
      for(const dz of [-2.6, 0, 2.6]){
        markStructure([box(1.5, 0.28, 1.5, midX, 0.14, b.cz + dz, M.rail)], 'machine');
        box(0.16, 1.15, 1.4, midX + f * 0.6, 0.72, b.cz + dz, M.frame);
        box(0.5, 0.34, 0.5, midX + f * 0.6, 1.42, b.cz + dz, M.base);
        hard(midX, b.cz + dz, 1.7, 1.7, 1.5);
      }
      return true;
    }
    case 'PRICES': {
      // The basket itself: a rack of forty-one numbered pigeonholes, one line of
      // the index each, with the week's dockets in them.
      const rx = b.xOuter - f * 1.1;
      markStructure([box(0.55, 2.1, 4.6, rx, 1.05, b.cz, M.frame)], 'rack');
      for(let i = 0; i < 7; i++){
        box(0.6, 0.03, 4.5, rx, 0.32 + i * 0.28, b.cz, M.rail);
      }
      hard(rx, b.cz, 0.7, 4.8, 2.1);
      return true;
    }
    case 'BANKS': {
      // Eleven ledger stands in a row, one per regional bank, each at reading
      // height and open. The multiplier is a column in one of them.
      for(let i = 0; i < 6; i++){
        const z = b.cz - 3.2 + i * 1.3;
        box(0.85, 1.06, 0.62, midX, 0.53, z, M.frame);
        box(0.9, 0.05, 0.66, midX, 1.1, z, M.wall);
        soft(midX, z, 0.42);
      }
      hard(midX, b.cz, 1.0, 8.0, 1.1);
      return true;
    }
    case 'TRADE':
    case 'TELEX': {
      // The telex bank: eight machines under a paper rail, each with its own
      // spool. The open economy arrives here one line at a time.
      const n = room.id === 'TRADE' ? 6 : 4;
      for(let i = 0; i < n; i++){
        const z = b.cz - (n - 1) * 0.75 + i * 1.5;
        box(0.75, 0.72, 0.6, b.xOuter - f * 1.2, 0.36, z, M.frame);
        box(0.6, 0.3, 0.5, b.xOuter - f * 1.2, 0.87, z, M.base);
        soft(b.xOuter - f * 1.2, z, 0.4);
      }
      hard(b.xOuter - f * 1.2, b.cz, 0.9, n * 1.5, 1.1);
      return true;
    }
    case 'RATE': {
      // The board table, along the glass, so the vote is taken looking at the
      // city it lands on. Eight chairs, and the chair's is the one facing in.
      const tz = b.cz;
      markStructure([box(2.5, 0.08, 6.4, b.cx, 0.76, tz, M.frame)], 'table');
      for(const [dx, dz] of [[-1.0, 0], [1.0, 0]]){
        box(0.35, 0.72, 5.4, b.cx + dx, 0.36, tz + dz, M.base);
      }
      hard(b.cx, tz, 2.7, 6.6, 0.8);
      for(let i = 0; i < 4; i++){
        for(const s of [-1, 1]){
          const cx = b.cx + s * 1.75, cz = tz - 2.4 + i * 1.6;
          box(0.5, 0.46, 0.5, cx, 0.23, cz, M.base);
          box(0.5, 0.5, 0.09, cx + s * 0.2, 0.7, cz, M.base);
          soft(cx, cz, 0.4);
        }
      }
      return true;
    }
    case 'LOOKOUT': {
      // Nothing but a rail at the glass and two benches back from it. The room
      // is the window.
      markStructure([box(0.08, 0.06, 9.0, b.xOuter - f * 0.9, 1.02, b.cz, M.rail)], 'rail');
      for(const s of [-1, 1]) box(0.08, 1.0, 0.08, b.xOuter - f * 0.9, 0.5, b.cz + s * 4.3, M.rail);
      for(const dz of [-2.2, 2.2]){
        box(0.55, 0.42, 1.9, b.cx + f * 0.4, 0.21, b.cz + dz, M.frame);
        soft(b.cx + f * 0.4, b.cz + dz, 0.5);
      }
      return true;
    }
    default:
      return false;
  }
}

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening, P } = ctx;
  const f = b.sign;
  const big = signature(room, ctx);

  // A cill at the glass, in every room. It is what stops the furniture pass
  // putting a filing cabinet in front of the one thing this building is for, and
  // it is what a curtain wall actually has at the floor.
  markStructure([box(0.42, 0.34, room.z1 - room.z0 - 0.6, b.xOuter - f * 0.24, 0.17, b.cz, M.base)], 'cill');

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    // **Two and a half metres clear at the glass.** The furniture pass fills the
    // deepest lane it is given, and given the full room it stood a two-metre
    // shelf unit along the curtain wall — which in this building walls off the
    // one thing every room is for. Measured off a screenshot: the window was a
    // strip of sky above a wall of cabinets.
    bounds: {
      x0: b.xInner + f * 2.0, x1: b.xOuter - f * 2.6,
      z0: room.z0 + 0.8, z1: room.z1 - 0.8,
    },
    walls: { x0: b.xInner, x1: b.xOuter, z0: room.z0, z1: room.z1 },
    wallThickness: P.wall,
    /**
     * Where there is wall to hang something on — and in this building that is
     * the question, because **three of every room's four faces are not wall**.
     * The outer face is the curtain wall; hanging a notice on it puts a board in
     * front of the city and, worse, `placement.mjs` cannot see glazing as
     * backing and fires a ray straight through it. The two cross-walls exist
     * only where a partition was actually built, which at the ends of the plate
     * is nowhere: those are glass too.
     */
    wallOk: (x, z, wallName) => {
      // The glass. Never.
      if(Math.abs(x - b.xOuter) < 0.5) return false;
      const plate = ctx.plan?.spine ?? { z0: -12, z1: 14 };
      const glazedEnd = (zz) => Math.abs(zz - plate.z0) < 0.06 || Math.abs(zz - plate.z1) < 0.06;
      if(Math.abs(z - room.z0) < 0.5 && glazedEnd(room.z0)) return false;
      if(Math.abs(z - room.z1) < 0.5 && glazedEnd(room.z1)) return false;
      // The spine wall, minus its doorway — or, for an open room, minus all of
      // it but the two nibs.
      const onSpine = Math.abs(x - b.xInner) < 0.5 || wallName === (f < 0 ? 'xHi' : 'xLo');
      if(!onSpine) return true;
      const NIB = 0.9;
      if(room.open) return z < room.z0 + NIB || z > room.z1 - NIB;
      const dw = room.door === 'wide' ? P.doorWideW : P.doorW;
      return Math.abs(z - b.cz) > dw / 2 + 0.25;
    },
    kind: room.kind ?? 'workroom',
    roomName: room.name ?? room.id,
    notices: WALL_TEXT[room.id],
    seed: `changeover-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      ...(big ? [{ x: b.cx, z: b.cz, r: 3.4 }] : []),
      ...((ctx.floor?.seats ?? []).filter(([x, z]) =>
        z > room.z0 && z < room.z1 && (f > 0 ? x > b.xInner : x < b.xInner))
        .map(([x, z]) => ({ x, z, r: 0.9 }))),
    ],
    target: big ? 11 : 15,
  });
}

/**
 * Fit out one floor's corridor.
 *
 * `engine/world/interiorTower.js` calls this once per floor with that floor's
 * own plan, and every floor is the same twenty-six metres of corridor — so
 * anything placed from the whole building's extent is built four times in the
 * same place. `ctx.floor` says which one this is, and the floor number on the
 * wall is the only thing in the corridor that differs between them.
 */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, soft, hard, floor } = ctx;
  const sp = plan.spine ?? { z0: -12, z1: 14 };
  const hw = P.corridorHalfWidth;
  const L = plan.lift ?? { side: 'w', z0: 0.4, z1: 4.8 };

  // The lift lobby: a bench opposite the car, and the floor number over it,
  // large, because in a building where every floor is the same plate the number
  // is the only thing that says where you are.
  const lz = (L.z0 + L.z1) / 2;
  box(0.5, 0.44, 1.8, hw - 0.35, 0.22, lz, M.frame);
  soft(hw - 0.35, lz, 0.5);
  markStructure([box(0.06, 0.62, 0.62, hw - 0.06, 1.9, lz, M.base)], 'sign');

  /**
   * Which side of the corridor has wall on it, at this z.
   *
   * The corridor's walls are the rooms' own partitions, so there is no wall at a
   * doorway, none across the lift opening, and none at all where a room is open
   * to the corridor. And nothing may be hung on the two ends: they are glass.
   */
  const rooms = floor?.rooms ?? [];
  const solidAt = (side, z) => {
    const r = rooms.find(x => x.side === side && z > x.z0 && z < x.z1);
    if(!r){
      // No room here. On the lift side that is the shaft, which is wall; on the
      // other side it is the gap between two rooms, which is not.
      return side === L.side && z > L.z0 && z < L.z1
        ? Math.abs(z - (L.z0 + L.z1) / 2) > 1.1
        : false;
    }
    const cz = (r.z0 + r.z1) / 2;
    if(r.open) return z < r.z0 + 0.9 || z > r.z1 - 0.9;
    const dw = r.door === 'wide' ? P.doorWideW : P.doorW;
    return Math.abs(z - cz) > dw / 2 + 0.25;
  };

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: hw,
    z0: sp.z0 + 1.4, z1: sp.z1 - 1.4,
    wallThickness: P.wall,
    seed: `changeover-spine-${floor?.id ?? 0}`,
    every: 6,
    signEvery: 4.2,
    hard, soft,
    wallOk: (x, z) => solidAt(x < 0 ? 'w' : 'e', z),
    // Both ends are curtain wall, and the lift opening is a hole.
    keepClear: [
      { x: 0, z: sp.z0 + 1.6, r: 2.0 },
      { x: 0, z: sp.z1 - 1.6, r: 2.0 },
      { x: 0, z: lz, r: 1.8 },
    ],
    signs: SPINE_SIGNS[floor?.id ?? 0] ?? SPINE_SIGNS[0],
  });
}
