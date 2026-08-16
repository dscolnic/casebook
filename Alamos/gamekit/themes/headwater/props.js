// props.js — the objects that make Ashfell Dam itself.
//
// Anything generic (worktops, chairs, cabinets, shelving, crates, notices) comes
// from engine/world/interiorKit.js through `furnishRoom`. This file is the
// dozen or so things that are this structure and nowhere else:
//
//   · the gallery itself — a drain channel down one side, bulkhead lamps, and a
//     datum plate at every chainage, which is what makes a tunnel inside a wall
//     read as a tunnel inside a wall;
//   · the seepage weirs and the uplift standpipes, which are the only place the
//     dam reports on its own condition;
//   · two gate hoists over the spillway, and the slots the gates run in;
//   · two machines at the toe, under a crane rail;
//   · the crest handrail, with a hundred metres of air on the other side of it.
//
// Interior hooks get the builder context from engine/world/interiorSite.js:
//   { scene, plan, geo, P, box, wall, materials, soft, hard, addInteractable }

import * as THREE from 'three';
import { furnishRoom, furnishCorridor, furnishingMaterials, markWallMounted, markStructure }
  from '../../engine/world/interiorKit.js';

/**
 * What is on the walls, room by room.
 *
 * A dam is a fifty-year-old building run by a small crew, so the notices are
 * the ones such a place actually has: the permit rules, the readings somebody
 * keeps by hand, the sign that exists because of one incident in 1998. Nine
 * parts earnest and one part the joke a real crew room has. Everything here has
 * to land at walking pace.
 */
const WALL_TEXT = {
  POWER: [
    { style: 'warning', tag: 'BEFORE THE MACHINE TURNS', heading: 'Nobody in the draft tube', accent: '#b5502f',
      body: 'Permit on the board, key in the pocket of whoever is inside, and the wicket gates '
        + 'locked out. Two people, every time, no exceptions for a quick look.' },
    { style: 'grid', tag: 'MACHINE 2', heading: 'Bearing inspection — deferred', accent: '#8a6a1e',
      body: 'Due August. Cannot be done with the tailrace up. Ask before you defer it again.' },
    { style: 'chart', tag: 'OUTPUT', heading: 'Against head, both machines', accent: '#3f6f8f',
      body: 'The curve is the machines. The head is the reservoir. Only one of them is ours.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'The trash rack blocked', accent: '#5b6a72', body: '' },
  ],
  GATES: [
    { style: 'warning', tag: 'GATE RUNNING', heading: 'Nobody on the deck below', accent: '#b5502f',
      body: 'Sound the horn, wait, sound it again. The spillway deck cannot be seen from the '
        + 'hoist and the man who cannot hear you is the one standing on it.' },
    { style: 'list', tag: 'BEFORE OPENING', heading: 'Every time, in this order', accent: '#1d4a52',
      items: [['Warn', 'the reach, before the gate'], ['Log', 'head over sill, and the time'],
        ['Open', 'in steps, watch the gauge below'], ['Record', 'discharge, not gate position']],
      body: 'The gate log is not the discharge log. The river only ever saw one of them.' },
    { style: 'chart', tag: 'RATING', heading: 'Discharge against head, gate full open', accent: '#8a6a1e',
      body: 'Three halves power. The last half metre of head is worth more than the first two.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Gate 2 seats slow', accent: '#b5502f',
      body: 'Eleven seconds over. Bearing changed Thursday. Watch it. — R.W.' },
  ],
  STRUCT: [
    { style: 'banner', tag: 'FOUNDATION GALLERY', heading: 'Read against the level, always', accent: '#1d4a52',
      body: 'Seepage rises with the pool and so does uplift. A reading is only news when it is '
        + 'above what the pool accounts for.' },
    { style: 'list', tag: 'THE ROUND', heading: 'Nine weirs, twelve standpipes', accent: '#5b6a72',
      items: [['06:00', 'daily, whoever is on'], ['W3', 'the one that moves first'],
        ['D12', 'runs muddy when it matters'], ['U7', 'tracks the pool exactly']],
      body: 'Write the pool level at the top of the sheet before you write anything else.' },
    { style: 'chart', tag: 'SEEPAGE', heading: 'Four years, against reservoir level', accent: '#3f6f8f',
      body: 'Above 90 per cent this line is a guess. We are about to find out.' },
    { style: 'warning', tag: 'CONFINED SPACE', heading: 'The drainage adit', accent: '#b5502f',
      body: 'Gas test, harness, and somebody at the door who is not doing anything else.' },
  ],
  STORE: [
    { style: 'banner', tag: 'STORAGE', heading: 'Level is measured. Volume is converted.', accent: '#1d4a52',
      body: 'Everything on this board except the level has been through the stage–storage curve. '
        + 'The curve was surveyed in 2003.' },
    { style: 'chart', tag: 'STAGE–STORAGE', heading: 'Sheet 3, and the one everybody uses', accent: '#8a6a1e',
      body: 'Read it twice. The scale changes at 210 m and people miss it.' },
    { style: 'grid', tag: 'FREEBOARD', heading: 'Metres, and hours', accent: '#b5502f',
      body: 'Metres is what the crest is. Hours is what you have. Convert before you report it.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Rasmussen has the boat out', accent: '#5b6a72',
      body: 'Eleven transects so far. He says do not quote him yet. We are quoting him.' },
  ],
  INFLOW: [
    { style: 'list', tag: 'THE NETWORK', heading: 'Eleven rain, four river, one snowline', accent: '#1d4a52',
      items: [['Upper gauges', 'radar reads them badly'], ['Ashfell', 'the one that matters'],
        ['Tributaries', 'below us, not ours'], ['Snowline', 'phoned in, weekly']],
      body: 'Most of the rain falls where the radar is worst. That is not a coincidence.' },
    { style: 'chart', tag: 'THIS EVENT', heading: 'Flow, and the hourly increment under it', accent: '#3f6f8f',
      body: 'The increment turns first. Plot both or the turn arrives as a surprise.' },
    { style: 'grid', tag: 'FORECAST CONFIDENCE', heading: 'By lead time', accent: '#8a6a1e',
      body: '6 h: act on it. 2 d: prepare on it. 5 d: know about it. Say which you are handing over.' },
    { style: 'sticky', tag: 'NOTE', heading: 'Saturated ground', accent: '#b5502f',
      body: 'Second storm in a wet spell is the one that gets you. Ask 1998.' },
  ],
  SAFE: [
    { style: 'banner', tag: 'THE REACH', heading: 'Eleven villages, four to eleven hours', accent: '#1d4a52',
      body: 'Every one of them is a phone call and a person who has to do something afterwards. '
        + 'A warning that arrives with the water is not a warning.' },
    { style: 'list', tag: 'LEAD TIMES', heading: 'What each action needs', accent: '#b5502f',
      items: [['Telephone round', '4 hours'], ['Wardens mustered', '8 hours'],
        ['Low road closed', '12 hours'], ['Caravan sites cleared', '6 hours']],
      body: 'Set the trigger by the action, not by how alarming the number looks.' },
    { style: 'grid', tag: 'BANK-FULL', heading: 'Narrows, 12 km down: 260 m³/s', accent: '#8a6a1e',
      body: 'Everything in the channel counts, including what joins below us.' },
    { style: 'photo', tag: '1998', heading: 'The low road, from the bridge', accent: '#5b6a72',
      body: 'Nine hours of notice would have moved the cattle. There were two.' },
  ],
  CONTROL: [
    { style: 'banner', tag: 'CONTROL ROOM', heading: 'Log it as you do it', accent: '#1d4a52',
      body: 'Time, level, inflow, gate position, discharge, and who decided. The log is the only '
        + 'part of tonight that will still exist in ten years.' },
    { style: 'warning', tag: 'HANDOVER', heading: 'Both engineers, out loud', accent: '#b5502f',
      body: 'What is set, what is expected, and what would change your mind. Not a signature.' },
    { style: 'tally', tag: 'DAYS SINCE', heading: 'Somebody trusted a gate log', accent: '#8a6a1e', body: '' },
  ],
  REST: [
    { style: 'sticky', tag: 'PLEASE', heading: 'Wash your own mug', accent: '#5b6a72',
      body: 'There are four of us.' },
    { style: 'grid', tag: 'ROTA', heading: 'Nights, this month', accent: '#3f6f8f',
      body: 'Swaps go through the duty engineer, in writing, before the shift starts.' },
  ],
  ARCHIVE: [
    { style: 'banner', tag: 'RECORDS', heading: 'Every survey, with its year', accent: '#1d4a52',
      body: 'A curve is a survey, not a law. The year on it is part of the reading.' },
    { style: 'list', tag: 'ON THE SHELVES', heading: 'What is here', accent: '#5b6a72',
      items: [['Stage–storage', '1971, 1988, 2003'], ['Spillway rating', '1974, modelled 1996'],
        ['Gallery plots', 'continuous since 1982'], ['Flood records', 'since impoundment']],
      body: 'Nothing leaves the room. Read it here and put it back where it was.' },
  ],
  CREST: [
    { style: 'warning', tag: 'CREST WALK', heading: 'Harness beyond the second bay', accent: '#b5502f',
      body: 'The parapet is 1.05 m and the drop is a hundred. In wind, do not go past the gate.' },
    { style: 'banner', tag: 'ASHFELL DAM', heading: 'Impounded 1968', accent: '#1d4a52',
      body: 'Crest 216.80 m. Spillway sill 213.20 m. Catchment 148 square kilometres.' },
  ],
  INTAKE: [
    { style: 'list', tag: 'INTAKE', heading: 'Which level the machines draw from', accent: '#1d4a52',
      items: [['Top port', 'warm, weedy in summer'], ['Middle', 'the default'],
        ['Bottom', 'cold, and silty after a flood'], ['Trash rack', 'differential alarms at 0.4 m']],
      body: 'After a flood the bottom port is silt. Use it and the machines find out first.' },
  ],
  LOOKOUT: [
    { style: 'photo', tag: 'THE POOL', heading: 'The only place you can see the level', accent: '#5b6a72',
      body: 'Everything else in this building is a number that stands for this.' },
  ],
};

/** Which kit recipe each room draws its furniture from. */
const KIND = {
  TAILRACE: 'supply', POWER: 'workroom', SWITCH: 'supply', GAUGE: 'lab',
  SAFE: 'station', PLANT: 'supply',
  STRUCT: 'lab', SUMP: 'supply', CORE: 'supply', INSTR: 'lab', GROUT: 'workroom', REST: 'quiet',
  INFLOW: 'station', STORE: 'station', MET: 'quiet', CONTROL: 'station',
  ARCHIVE: 'supply', BRIEF: 'quiet',
  GATES: 'workroom', HOIST: 'supply', CREST: 'quiet', INTAKE: 'lab', SPILL: 'supply',
  LOOKOUT: 'quiet',
};

/** The narrative fittings each room gets before the generic furniture fills in. */
const FITTINGS = {
  POWER: ['rack', 'toolBoard', 'barrel', 'cableDrum'],
  SWITCH: ['rack', 'rack', 'cableDrum'],
  GAUGE: ['monitorBank', 'toolBoard'],
  SAFE: ['monitorBank', 'whiteboard', 'toolBoard'],
  PLANT: ['toolBoard', 'barrel', 'crate', 'cableDrum'],
  STRUCT: ['sampleStore', 'monitorBank', 'toolBoard'],
  SUMP: ['barrel', 'crate', 'toolBoard'],
  CORE: ['sampleStore', 'shelfUnit', 'crate'],
  INSTR: ['toolBoard', 'monitorBank', 'rack'],
  GROUT: ['toolBoard', 'barrel', 'crate'],
  INFLOW: ['monitorBank', 'whiteboard', 'rack'],
  STORE: ['whiteboard', 'monitorBank', 'rack'],
  CONTROL: ['monitorBank', 'monitorBank', 'rack', 'whiteboard'],
  ARCHIVE: ['shelfUnit', 'shelfUnit', 'crate'],
  GATES: ['toolBoard', 'cableDrum', 'barrel'],
  HOIST: ['cableDrum', 'toolBoard', 'crate'],
  INTAKE: ['monitorBank', 'toolBoard'],
  SPILL: ['crate', 'barrel'],
};

/**
 * The gorge, the fall, and the pool it lands in.
 *
 * `engine/world/interiorLevels.js` calls this once with the whole scene, after
 * every floor is built, which makes it the one place a theme can put something
 * *outside* the building. Everything here lives east of the glazing and runs the
 * full height and length of the tower, so it is in the window of every room on
 * that side and on every landing of the stair.
 *
 * Four rules it is built to, three of them from THEME_CONTRACT.md:
 *
 *   · **No real lights.** This is a hundred metres of moving water and the
 *     contract's ceiling is six lights for the whole scene. It is lit by
 *     emissive materials and the ambient rig instead, which is also why it still
 *     reads at dusk.
 *   · **The sheet is layered, not one plane.** One translucent quad is a sheet
 *     of perspex. Five, at slightly different depths and opacities with the
 *     streaks offset between them, is falling water.
 *   · **Nothing here is `DoubleSide` with text on it**, and nothing here is a
 *     collider the player can reach — the glazing already stops them.
 *   · It is drawn from the *inside* out: the only viewpoints that matter are
 *     from behind the glass, so the back of the gorge is a backdrop rather than
 *     a place.
 */
export function decorate(scene, ctx){
  if(!scene) return;

  // The gorge runs past the whole tower, which is 128 m of spine plus its stairs.
  const Z0 = -40, Z1 = 176, ZMID = (Z0 + Z1) / 2, ZLEN = Z1 - Z0;
  const GLASS_X = 10.0;            // just outside the east envelope
  const FALL_X = GLASS_X + 21;     // the sheet itself, across the gorge
  const ROCK_X = GLASS_X + 40;     // the far wall
  const HEAD = 30;                 // the lip, above the top floor
  const POOL = -44;                // and the pool it lands in

  const M = {
    rock: new THREE.MeshStandardMaterial({ color: 0x30363a, roughness: 0.96, metalness: 0.0 }),
    darkRock: new THREE.MeshStandardMaterial({ color: 0x23282b, roughness: 0.97 }),
    // Water is emissive because there are no lights out here and a fall in
    // shadow reads as a grey wall.
    sheet: new THREE.MeshStandardMaterial({
      color: 0xeaf6fa, emissive: 0xcfe6ee, emissiveIntensity: 0.40,
      roughness: 0.22, transparent: true, opacity: 0.62, depthWrite: false }),
    streak: new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: 0xe8f4f8, emissiveIntensity: 0.85,
      roughness: 0.2, transparent: true, opacity: 0.36, depthWrite: false }),
    spray: new THREE.MeshStandardMaterial({
      color: 0xf2f7f8, emissive: 0xdfeaee, emissiveIntensity: 0.5,
      roughness: 1.0, transparent: true, opacity: 0.13, depthWrite: false }),
    pool: new THREE.MeshStandardMaterial({
      color: 0x2b4a52, emissive: 0x16323a, emissiveIntensity: 0.25,
      roughness: 0.14, metalness: 0.1 }),
    backdrop: new THREE.MeshBasicMaterial({ color: 0xb9c2c4, fog: false }),
  };

  const put = (w, h, d, x, y, z, mat, ry = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.rotation.y = ry;
    m.castShadow = false;
    m.receiveShadow = false;
    // None of this is furniture and none of it is reachable: the placement and
    // density checks should not count a hundred-metre waterfall as a fitting.
    m.userData.ignoreAudit = true;
    markStructure([m], 'scenery');
    scene.add(m);
    return m;
  };

  // ---- the far wall of the gorge, stepped so it is not one flat slab
  // Top at about y = 46, not 105. A gorge wall taller than the building blocks
  // the sky from every gallery, and the sky is the point of an open deck.
  put(10, 92, ZLEN, ROCK_X + 5, 0, ZMID, M.rock);
  for(let z = Z0; z < Z1; z += 14){
    const depth = 9 + ((z * 7919) % 11);
    put(6, 78 + ((z * 104729) % 22), depth, ROCK_X - 2, -6, z + depth / 2, M.darkRock);
  }
  // ---- the near wall, *below* the tower: the abutment the building stands on.
  // Its top has to sit below the cill, or the thing outside the window is a
  // hundred metres of rock at eye level — which is what it was.
  put(8, 120, ZLEN, GLASS_X + 3.4, -64, ZMID, M.darkRock);

  // **The fall runs the whole length of the building.**
  //
  // The first version was a single 13 m chute centred at z = 62, and the levels
  // are offset along z — so it faced the operations floor and nothing else, and
  // from four of the five floors the window looked at bare rock. That is what
  // "I cannot see anything outside" was.
  //
  // What is there instead is what a dam this size actually has: a long ogee
  // spillway, water over the whole crest, split into bays by piers. Every floor
  // looks out at a different part of the same fall.
  const BAY = 26, PIER = 3.4;
  const bays = Math.ceil(ZLEN / BAY);

  for(let i = 0; i < bays; i++){
    const z0 = Z0 + i * BAY, cz = z0 + BAY / 2;
    const w = BAY - PIER;

    // The pier between this bay and the next: dark, and the thing that makes
    // the curtain read as bays rather than as one wall of white.
    put(11, 96, PIER, FALL_X + 1.5, -12, z0, M.darkRock);

    // The lip the water leaves from.
    put(15, 3.2, w, FALL_X - 0.6, HEAD + 1.6, cz, M.rock);

    // Two opaque sheets. **Water is opaque**: the first version stacked five
    // translucent sheets, twenty-two translucent streaks and seven mist veils,
    // and twelve transparent surfaces in a row sum to a flat grey wash — which
    // looks exactly like a fall that is not rendering at all.
    const back = M.sheet.clone();
    back.transparent = false; back.opacity = 1;
    back.color.setHex(0x9fc4d2); back.emissive.setHex(0x6f97a8); back.emissiveIntensity = 0.9;
    put(2.4, HEAD - POOL + 6, w, FALL_X + 0.8, (HEAD + POOL) / 2, cz, back);

    const front = M.sheet.clone();
    front.transparent = false; front.opacity = 1;
    front.color.setHex(0xffffff); front.emissive.setHex(0xdcf0f8); front.emissiveIntensity = 1.5;
    put(1.6, HEAD - POOL + 4, w - 1.6, FALL_X - 1.4, (HEAD + POOL) / 2 - 1, cz, front);

    // The streaks: opaque ribbons at four brightnesses and irregular lengths,
    // which is the only thing here that makes it look like it is falling.
    const shades = [0xffffff, 0xeef7fa, 0xd6e8ee, 0xc2d8e0];
    for(let k = 0; k < 14; k++){
      const z = z0 + PIER / 2 + 0.7 + (k * 1.63) % (w - 1.4);
      const h = (HEAD - POOL) * (0.5 + ((k * 37 + i * 11) % 45) / 100);
      const mat = M.streak.clone();
      mat.transparent = false; mat.opacity = 1;
      mat.color.setHex(shades[(k + i) % shades.length]);
      mat.emissive.setHex(shades[(k + i) % shades.length]);
      mat.emissiveIntensity = 1.1 + ((k + i) % 3) * 0.7;
      put(0.5, h, 0.42 + ((k * 7) % 9) / 12, FALL_X - 2.5, HEAD - h / 2 + 2, z, mat);
    }

    // And the mist at the foot of each bay, thin in x so it stays in the gorge.
    // Wide veils centred on the fall reach back through the glazing and hang
    // *inside* the building, over every window.
    const mist = M.spray.clone();
    mist.opacity = 0.13;
    put(7, 16, w, FALL_X - 4.5, POOL + 10, cz, mist);
  }

  // ---- what it lands in: a pool running the length of the gorge, and the boil
  // along the foot of the curtain.
  put(34, 3, ZLEN + 40, FALL_X + 9, POOL - 1.5, ZMID, M.pool);
  put(16, 1.6, ZLEN, FALL_X, POOL + 1.2, ZMID, M.spray);

  // ---- the sky.
  //
  // An interior has none, and this building is open to it: the galleries are
  // decks with nothing overhead, so what is above the handrail has to be a real
  // sky or the player is standing under a black void. A dome and a few thousand
  // points, both with `fog: false` — the fog in this scene is there to make the
  // far wall of the gorge recede and it would wash the stars out completely.
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(520, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0x070b14, side: THREE.BackSide, fog: false }));
  dome.position.set(0, 0, ZMID);
  dome.userData.ignoreAudit = true;
  markStructure([dome], 'sky');
  scene.add(dome);

  // Stars: a shell of points, thinned toward the horizon the way the real thing
  // is when there is haze in a valley.
  const N = 3200;
  const pos = new Float32Array(N * 3);
  let seed = 20260815;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for(let i = 0; i < N; i++){
    const a = rnd() * Math.PI * 2;
    const t = Math.pow(rnd(), 0.65);            // bias upward
    const el = t * (Math.PI / 2 - 0.06) + 0.06;
    const r = 480;
    pos[i * 3] = Math.cos(a) * Math.cos(el) * r;
    pos[i * 3 + 1] = Math.sin(el) * r;
    pos[i * 3 + 2] = ZMID + Math.sin(a) * Math.cos(el) * r;
  }
  const stars = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)),
    new THREE.PointsMaterial({ color: 0xeaf1ff, size: 2.1, sizeAttenuation: false, fog: false }));
  stars.userData.ignoreAudit = true;
  markStructure([stars], 'sky');
  scene.add(stars);

  void ctx;
}


/**
 * Build the seats `plan.seats` declares, for the room they fall inside.
 *
 * The crowd sits people at those coordinates whether or not anything is there,
 * and the scaffold leaves the building of them to the theme — so a briefing
 * room with five declared chairs renders as five people sitting in mid-air.
 */
function buildSeats(room, ctx){
  const { bounds: b, box, materials: M, soft } = ctx;
  const seats = (ctx.plan?.seats ?? []).filter(([x, z]) =>
    z > room.z0 && z < room.z1 && (b.sign > 0 ? x > b.xInner : x < b.xInner));
  for(const [x, z, yaw = 0] of seats){
    box(0.5, 0.07, 0.5, x, 0.44, z, M.frame, yaw);
    box(0.5, 0.5, 0.07, x - Math.sin(yaw) * 0.23, 0.71, z - Math.cos(yaw) * 0.23, M.frame, yaw);
    box(0.09, 0.42, 0.09, x, 0.21, z, M.rail);
    box(0.42, 0.05, 0.42, x, 0.03, z, M.rail);
    soft({ x, z, r: 0.4 });
  }
  return seats.length;
}

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX = b.xInner + f * 0.5;
  const seated = buildSeats(room, ctx);

  switch(room.id){
    case 'POWER': {
      // Two machines under a crane rail. A powerhouse is one big room with two
      // of everything in it, and the giveaway is the rail running its length.
      for(const cz of [b.cz - 2.6, b.cz + 2.6]){
        const casing = box(2.8, 1.5, 2.8, b.cx, 0.75, cz, M.frame);
        markStructure([casing], 'machine');
        box(1.0, 0.9, 1.0, b.cx, 1.9, cz, M.rail);
        box(0.5, 1.35, 0.5, b.cx + f * 1.9, 0.68, cz, M.base);
        hard(b.cx, cz, 3.0, 3.0, 2.4);
        soft({ x: b.cx + f * 1.9, z: cz, r: 0.5 });
      }
      markStructure([box(0.16, 0.3, room.z1 - room.z0 - 1.5, b.cx, 2.7, b.cz, M.rail)], 'crane rail');
      break;
    }
    case 'GATES': {
      // Two hoists over two gate slots, and the slots go through the floor —
      // the only thing in this building the player can look down.
      for(const cz of [b.cz - 2.4, b.cz + 2.4]){
        markStructure([box(2.2, 2.4, 0.5, b.cx, 1.2, cz, M.rail)], 'hoist');
        box(1.6, 0.5, 0.5, b.cx, 2.3, cz, M.base);
        for(const s of [-1, 1]) box(0.1, 1.9, 0.1, b.cx + s * 0.9, 0.95, cz, M.rail);
        box(1.9, 0.05, 0.7, b.cx, 0.02, cz, M.base);
        for(const s of [-1, 1]) box(2.0, 0.06, 0.06, b.cx, 0.5, cz + s * 0.45, M.rail);
        hard(b.cx, cz, 2.4, 0.9, 2.5);
      }
      break;
    }
    case 'STRUCT': {
      // The weirs: a channel along the outer wall with nine V-notch plates in
      // it, and the standpipes that report the pressure under the foundation.
      const chX = b.xOuter - f * 0.8;
      markStructure([box(0.7, 0.35, room.z1 - room.z0 - 1.4, chX, 0.17, b.cz, M.base)], 'channel');
      for(let i = 0; i < 9; i++){
        const z = room.z0 + 1.2 + i * ((room.z1 - room.z0 - 2.4) / 8);
        box(0.72, 0.4, 0.06, chX, 0.36, z, M.rail);
        box(0.12, 0.9, 0.12, chX - f * 0.55, 0.45, z, M.frame);
        soft({ x: chX - f * 0.55, z, r: 0.2 });
      }
      break;
    }
    default:
      if(room.group || KIND[room.id] === 'station'){
        box(0.6, 0.9, 3.0, inX + f * 0.9, 0.45, b.cz, M.frame);
        hard(inX + f * 0.9, b.cz, 0.8, 3.2, 0.95);
      }
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
    kind: KIND[room.id] ?? room.kind ?? 'workroom',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    notices: WALL_TEXT[room.id],
    seed: `headwater-${room.id}`,
    hard, soft,
    keepClear: [
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
      ...(room.id === 'POWER' ? [{ x: b.cx, z: b.cz, r: 4.6 }] : []),
      ...(room.id === 'GATES' ? [{ x: b.cx, z: b.cz, r: 4.2 }] : []),
      ...(room.id === 'STRUCT' ? [{ x: b.xOuter - f * 0.8, z: b.cz, r: 3.0 }] : []),
      ...((ctx.plan?.seats ?? []).filter(([x, z]) =>
        z > room.z0 && z < room.z1 && (f > 0 ? x > b.xInner : x < b.xInner))
        .map(([x, z]) => ({ x, z, r: 0.9 }))),
    ],
    target: seated ? 11 : 15,
  });
}

/**
 * Fit out one level's gallery.
 *
 * `engine/world/interiorLevels.js` calls this once per level with that level's
 * own plan, so everything is scoped to `plan.spine` — reading the whole
 * building's extent builds five stacked copies of the same corridor.
 *
 * There is nothing overhead in here on purpose: no ceiling, no fittings and no
 * cable tray (`tray: false`). The gallery is open to the sky, and anything hung
 * in it reads as the ceiling coming back.
 */
export function fitOutSpine(ctx){
  const { plan, P, hard, soft } = ctx;
  const sp = plan.spine ?? { z0: -6, z1: 16 };
  const hw = plan.metrics?.corridorHalfWidth ?? 2.6;

  const solidAt = (side, z) => {
    const NIB = 0.9;
    for(const r of (plan.rooms ?? []).filter(x => x.side === side)){
      if(z < r.z0 || z > r.z1) continue;
      const cz = (r.z0 + r.z1) / 2;
      if(r.open) return z < r.z0 + NIB || z > r.z1 - NIB;
      const dw = r.door === 'wide' ? P.doorWideW : P.doorW;
      return Math.abs(z - cz) > dw / 2 + 0.2;
    }
    return false;
  };

  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => ctx.box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({
      surface: ctx.materials.frame, metal: ctx.materials.rail,
      dark: ctx.materials.base, pale: ctx.materials.wall,
    }),
    halfWidth: hw,
    z0: sp.z0, z1: sp.z1,
    wallThickness: P.wall,
    seed: `headwater-spine-${sp.z0}`,
    // Nothing overhead in the gallery: no ceiling, no fittings, no cable tray.
    tray: false,
    every: 7,
    signEvery: 4.0,
    hard, soft,
    // Only the room side has wall to hang anything on; the other side is glass.
    wallOk: (x, z) => (x < 0 ? solidAt('w', z) : false),
    keepClear: [{ x: 0, z: sp.z0 + 1.5, r: 2.2 }, { x: 0, z: sp.z1 - 1.5, r: 2.2 }],
    signs: [
      { style: 'banner', tag: 'ASHFELL DAM', heading: 'Control tower — sign in at the machine floor',
        accent: '#1d4a52',
        body: 'Hard hats on the gate floor and above. If you are on the crest after dark, tell '
          + 'the duty engineer before you go out.' },
      { style: 'warning', tag: 'WHEN THE SIREN SOUNDS', heading: 'The gates are about to run',
        accent: '#b5502f',
        body: 'Two long blasts, a pause, two more. Nobody on the spillway deck, nobody at the toe, '
          + 'and the tailrace walkway is closed until it stops.' },
      { style: 'list', tag: 'THE FLOORS', heading: 'What is on each', accent: '#5b6a72',
        items: [['Machine floor', 'turbines, switch room'], ['Gallery portal', 'seepage, uplift'],
          ['Operations', 'inflow, storage, control'], ['Gate floor', 'hoists, warning desk'],
          ['Lookout', 'records, briefing']],
        body: 'Every one of them looks at the same fall from a different height.' },
      { style: 'grid', tag: 'DUTY', heading: 'Who is on, this week', accent: '#3f6f8f',
        body: 'Engineer, mechanic and one of the operations staff. Nights are two.' },
    ],
  });
}
