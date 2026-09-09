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
import { scrollUV } from '../../engine/world/animators.js';
// The story layer: the bible's fifteen physical aftermaths, the three landmark
// spaces and the finale, keyed to the campaign through world.js's state hook.
import { dressRoom, storySpine, storyExtras } from './story.js';

// ---------------------------------------------------------------- textures
//
// Everything here is painted onto a 2D canvas at build time. No asset files, and
// `engine/dev/headless.mjs` stubs the context, so a checker can build this world
// in node without drawing a pixel.

/** A tiny deterministic generator, so the same gorge is built every run. */
function rng(seed){
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

/**
 * A tile of vertical water streaks, for the falling sheet.
 *
 * Broken dashes rather than full-height lines: a continuous line scrolled
 * downward reads as a barber's pole, and what makes falling water look like
 * falling water is that the *breaks* move. `alpha: true` leaves the gaps
 * transparent, which is what the faster front veil wants.
 *
 * **Which way the scroll has to go.** three.js samples
 * `v_sampled = uv.y * repeat.y + offset.y`, and `flipY` puts the top of the
 * canvas at v = 1 — so *increasing* `offset.y` shows content from higher in the
 * tile at a given height on the sheet, and the pattern travels **down**. The
 * `dv` passed to `scrollUV` for this texture is therefore positive. It is worth
 * the paragraph: the sign is the difference between a waterfall and a fountain,
 * and nothing headless can tell them apart.
 */
function streakTexture(seed, { w = 128, h = 512, count = 14, alpha = false } = {}){
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  const rnd = rng(seed);
  if(alpha) g.clearRect(0, 0, w, h);
  else { g.fillStyle = '#8ba9b8'; g.fillRect(0, 0, w, h); }
  for(let i = 0; i < count; i++){
    const cx = (i + rnd() * 0.7) * (w / count);
    const wide = 1.5 + rnd() * (w / 12);
    let y = -rnd() * h;
    while(y < h){
      const len = h * (0.05 + rnd() * 0.30);
      const peak = alpha ? 0.10 + rnd() * 0.26 : 0.30 + rnd() * 0.60;
      const tint = 206 + Math.floor(rnd() * 46);
      const blue = Math.min(255, tint + 8);
      // Three narrowing passes give the ribbon a soft edge without a gradient,
      // which the headless canvas stub cannot draw anyway.
      for(let k = 0; k < 3; k++){
        const f = (k + 1) / 3;
        g.fillStyle = `rgba(${tint},${tint + 2 > 255 ? 255 : tint + 2},${blue},${(peak * f).toFixed(3)})`;
        g.fillRect(cx - (wide * (1 - k * 0.28)) / 2, y, wide * (1 - k * 0.28), len);
      }
      y += len + h * (0.02 + rnd() * 0.10);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Slow mottled ripple for the plunge pool's own surface. */
function rippleTexture(seed){
  const S = 256;
  const c = document.createElement('canvas');
  c.width = S; c.height = S;
  const g = c.getContext('2d');
  const rnd = rng(seed);
  g.fillStyle = '#6f8f9b'; g.fillRect(0, 0, S, S);
  for(let i = 0; i < 220; i++){
    const x = rnd() * S, y = rnd() * S, r = 4 + rnd() * 26;
    const light = rnd() > 0.45;
    g.fillStyle = light ? `rgba(214,232,238,${(0.05 + rnd() * 0.12).toFixed(3)})`
      : `rgba(30,58,68,${(0.05 + rnd() * 0.14).toFixed(3)})`;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** One soft disc, for the mist. White in the middle, nothing at the rim. */
function discTexture(){
  const S = 64;
  const c = document.createElement('canvas');
  c.width = S; c.height = S;
  const g = c.getContext('2d');
  g.clearRect(0, 0, S, S);
  for(let k = 12; k >= 1; k--){
    const r = (S / 2) * (k / 12);
    g.fillStyle = `rgba(255,255,255,${(0.055 * (13 - k) / 12).toFixed(3)})`;
    g.beginPath(); g.arc(S / 2, S / 2, r, 0, Math.PI * 2); g.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * The sky, painted rather than modelled.
 *
 * A sphere's `u` is azimuth and its `v` is elevation, with `u = 0.5` at +x —
 * which in this gorge is due east, straight out of the glazing and across the
 * fall. So the warm break in the cloud goes at the middle of the canvas, low
 * down, and the storm bands run across it.
 */
function stormSkyTexture(seed){
  const W = 512, H = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  const rnd = rng(seed);
  const grad = g.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0.00, '#2f373e');     // straight up: the base of the cloud
  grad.addColorStop(0.45, '#4e5960');
  grad.addColorStop(0.78, '#78838a');
  grad.addColorStop(1.00, '#96a0a4');     // the horizon, where the light gets in
  g.fillStyle = grad; g.fillRect(0, 0, W, H);
  // Ragged cloud banding. A flat gradient reads as a studio backdrop.
  for(let i = 0; i < 60; i++){
    const y = H * (0.05 + rnd() * 0.85);
    const h = 3 + rnd() * 22;
    const x = rnd() * W, w = W * (0.10 + rnd() * 0.45);
    const dark = rnd() > 0.4;
    g.fillStyle = dark ? `rgba(24,30,36,${(0.05 + rnd() * 0.16).toFixed(3)})`
      : `rgba(186,196,201,${(0.04 + rnd() * 0.11).toFixed(3)})`;
    g.fillRect(x, y, w, h);
    g.fillRect(x - W, y, w, h);
  }
  // The sun, low and behind the fall: a warm bruise in the cloud rather than a
  // disc. It is late afternoon and the light is coming under the weather.
  const sun = g.createRadialGradient(W * 0.5, H * 0.90, 4, W * 0.5, H * 0.90, W * 0.34);
  sun.addColorStop(0.0, 'rgba(236,206,163,0.85)');
  sun.addColorStop(0.35, 'rgba(206,178,146,0.42)');
  sun.addColorStop(1.0, 'rgba(180,166,150,0.0)');
  g.fillStyle = sun; g.fillRect(0, H * 0.55, W, H * 0.45);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * The wet strip inside the glass line. Made once and shared by all five levels:
 * `fitOutSpine` runs per level, and five copies of one material is five
 * uploads of the same thing.
 */
let WET_MAT = null;
const wetMaterial = () => (WET_MAT ??= new THREE.MeshStandardMaterial({
  color: 0x232c31, roughness: 0.07, metalness: 0.18, envMapIntensity: 1.3 }));

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
 *
 * ## IT IS LATE AFTERNOON, AND IT IS RAINING. Why that, and not night.
 *
 * This building used to have two times of day in it at once: the galleries sat
 * under a black dome full of stars while the corridor and every room behind it
 * were lit like an office at eleven in the morning. One of the two had to go,
 * and **the engine decides which one can go.**
 *
 * `buildInteriorLighting` in `engine/world/interiorSite.js` is a daylight rig —
 * ambient, hemisphere, a key from twenty-four metres up, four point lights and a
 * warm directional called `day` — and `updateInteriorTimeOfDay` only takes it
 * down after 19:30. A campaign played between eight and six is lit at full
 * strength every frame, and a theme cannot change that: the rig is engine code
 * and `look.lighting` moves the base numbers for the whole building at once, so
 * buying a dark gallery costs a dark control room with it. Committing to night
 * would mean fighting the engine on every floor and losing on most of them.
 *
 * So the sky comes down to meet the building instead. A storm afternoon is the
 * one weather that agrees with a lit interior: the lamps are on because it is
 * dark *outside*, which is exactly what the rig already renders. It is also the
 * right weather for the story — nine days of rain on the high ground is why the
 * player is here — and it keeps the fall legible, because a white curtain reads
 * against mid-grey cloud and dark wet rock far better than it reads as the only
 * bright object in a black frame.
 *
 * Everything below follows from that: a grey gradient dome with the sun low and
 * warm behind the fall, no stars, wet rock, and the crest lamps lit.
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
  const BAY = 26, PIER = 3.4;      // one spillway bay, and the pier beside it
  const CREST_Y = HEAD + 3.2;      // the top of the lip: the walkable crest
  const rnd = rng(20260906);

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
    // Wet structural concrete for the crest walkway, and painted steel for the
    // handrail, the hoist gantries and the gate leaves.
    deck: new THREE.MeshStandardMaterial({ color: 0x4a5157, roughness: 0.62, metalness: 0.04 }),
    steel: new THREE.MeshStandardMaterial({ color: 0x6d757b, roughness: 0.44, metalness: 0.55 }),
    gate: new THREE.MeshStandardMaterial({ color: 0x2f4148, roughness: 0.5, metalness: 0.45 }),
  };

  // The pool gets a real surface: mottled ripple, scrolled slowly, so the water
  // the fall lands in is moving rather than a sheet of painted metal.
  const poolTex = rippleTexture(4021);
  poolTex.repeat.set(3, 26);
  M.pool.map = poolTex;
  M.pool.needsUpdate = true;

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
  const bays = Math.ceil(ZLEN / BAY);
  const scrolls = [];              // every texture that has to be slid, and how fast

  // THE TWO GATED BAYS ARE DRY UNTIL THE RELEASE. The bible has the hoist
  // resting "at its baseline mark above a dry spillway" on day 7 and water
  // moving only in the graded staged operation of the last mission; the seven
  // ungated bays are the free overflow crest and run all fortnight. Every mesh
  // that is water in a gated bay is collected here and handed to story.js, which
  // hides it until the gates open and shows it as they rise.
  const GATED_Z0 = [64, 90];
  const gated = new Map(GATED_Z0.map(z => [z, { z0: z, cz: z + BAY / 2, water: [], leaf: null, lugs: [] }]));

  for(let i = 0; i < bays; i++){
    const z0 = Z0 + i * BAY, cz = z0 + BAY / 2;
    const w = BAY - PIER;

    // The pier between this bay and the next: dark, and the thing that makes
    // the curtain read as bays rather than as one wall of white.
    put(11, 96, PIER, FALL_X + 1.5, -12, z0, M.darkRock);

    // The lip the water leaves from.
    put(15, 3.2, w, FALL_X - 0.6, HEAD + 1.6, cz, M.rock);
    const G = gated.get(z0) ?? null;
    // A gated bay has a face to be dry: wet concrete down the chute, behind the
    // water when it runs and the only thing there when it does not.
    if(G) put(1.2, HEAD - POOL + 6, w, FALL_X + 2.4, (HEAD + POOL) / 2, cz, M.deck);

    // Two opaque sheets. **Water is opaque**: the first version stacked five
    // translucent sheets, twenty-two translucent streaks and seven mist veils,
    // and twelve transparent surfaces in a row sum to a flat grey wash — which
    // looks exactly like a fall that is not rendering at all.
    // **The emissive here is a brightness budget, not a dial to turn up.**
    // At 1.5 on a pure-white front sheet the curtain clipped, and a clipped
    // curtain is flat: the streaks below are drawn at four brightnesses and all
    // four came out the same white. The window then reads as a blank panel, and
    // the reasonable conclusion from inside the game is that the glazing is
    // opaque and the fall is not rendering — which is what was reported. Keep
    // the front sheet under the clip and let the streaks be what is bright.
    const back = M.sheet.clone();
    back.transparent = false; back.opacity = 1;
    back.color.setHex(0x8fb3c2); back.emissive.setHex(0x4e7c8a); back.emissiveIntensity = 0.35;
    G?.water.push(put(2.4, HEAD - POOL + 6, w, FALL_X + 0.8, (HEAD + POOL) / 2, cz, back));

    // The front sheet carries the moving water itself: a tile of vertical
    // streaks, wrapped, scrolled downward. The map is on `emissiveMap` as well
    // as `map`, so the bright ribbons in the tile are also the ones that glow —
    // out here that is the only light there is.
    //
    // Repeat is set from the face, not by taste. The face is
    // (HEAD − POOL + 4) = 78 m tall and (w − 1.6) ≈ 21 m across, so 3 × 5 puts
    // a tile at about 7 m × 15.6 m, and 14 streaks in a tile land them roughly
    // half a metre apart — which at forty metres is about the width of a real
    // one. At 0.62 tiles a second the water travels a little under 10 m/s.
    const front = M.sheet.clone();
    front.transparent = false; front.opacity = 1;
    front.color.setHex(0xdfeef4); front.emissive.setHex(0x9dc4d4); front.emissiveIntensity = 0.5;
    const frontTex = streakTexture(9001 + i * 37, { count: 14 });
    frontTex.repeat.set(3, 5);
    frontTex.offset.y = (i * 0.31) % 1;      // bays are not in step with each other
    front.map = frontTex;
    front.emissiveMap = frontTex;
    front.needsUpdate = true;
    scrolls.push([frontTex, 0.62]);
    G?.water.push(put(1.6, HEAD - POOL + 4, w - 1.6, FALL_X - 1.4, (HEAD + POOL) / 2 - 1, cz, front));

    // And a second, faster, thinner veil in front of everything else — the spray
    // that peels off the face of a fall and runs ahead of it. Transparent, so it
    // is the one and only transparent surface in this stack; the header explains
    // why there is not a second.
    const veil = new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: 0xe4f2f7, emissiveIntensity: 0.55,
      roughness: 0.3, transparent: true, opacity: 0.34, depthWrite: false });
    const veilTex = streakTexture(5200 + i * 53, { count: 9, alpha: true });
    veilTex.repeat.set(2, 3);
    veilTex.offset.y = (i * 0.47) % 1;
    veil.map = veilTex;
    veil.emissiveMap = veilTex;
    veil.needsUpdate = true;
    scrolls.push([veilTex, 1.55]);
    G?.water.push(put(0.3, HEAD - POOL, w - 2.4, FALL_X - 3.6, (HEAD + POOL) / 2 - 2, cz, veil));

    // The boil where this bay hits the pool: its own pad, on its own phase, so
    // the foot of the fall churns unevenly the way it actually does. One band
    // pulsing along the whole length reads as a dimmer switch.
    const boil = M.spray.clone();
    boil.opacity = 0.16;
    const boilMesh = put(11, 2.6, w - 1.0, FALL_X - 2.2, POOL + 2.2, cz, boil);
    G?.water.push(boilMesh);
    (ctx.__boils ??= []).push({ mat: boil, mesh: boilMesh, y0: boilMesh.position.y,
      phase: i * 1.7 + 0.4 });

    // The streaks: opaque ribbons at four brightnesses and irregular lengths,
    // which is the only thing here that makes it look like it is falling.
    const shades = [0xffffff, 0xeef7fa, 0xd6e8ee, 0xc2d8e0];
    if(!ctx.__streaks) ctx.__streaks = [];
    for(let k = 0; k < 14; k++){
      const z = z0 + PIER / 2 + 0.7 + (k * 1.63) % (w - 1.4);
      const h = (HEAD - POOL) * (0.5 + ((k * 37 + i * 11) % 45) / 100);
      const mat = M.streak.clone();
      mat.transparent = false; mat.opacity = 1;
      mat.color.setHex(shades[(k + i) % shades.length]);
      mat.emissive.setHex(shades[(k + i) % shades.length]);
      // The streaks are the brightest thing in the gorge now, and the only
      // thing above the sheets behind them — so the four shades stay four.
      mat.emissiveIntensity = 0.75 + ((k + i) % 3) * 0.45;
      const streak = put(0.5, h, 0.42 + ((k * 7) % 9) / 12, FALL_X - 2.5, HEAD - h / 2 + 2, z, mat);
      G?.water.push(streak);
      ctx.__streaks.push({ m: streak, mat, base: mat.emissiveIntensity, y0: streak.position.y, phase: k * 0.7 + i * 1.3 });
    }

    // And the mist at the foot of each bay, thin in x so it stays in the gorge.
    // Wide veils centred on the fall reach back through the glazing and hang
    // *inside* the building, over every window.
    const mist = M.spray.clone();
    mist.opacity = 0.13;
    G?.water.push(put(7, 16, w, FALL_X - 4.5, POOL + 10, cz, mist));
    (ctx.__mists ??= []).push({ mat: mist, phase: i * 0.9 });
  }

  // THE FALL MOVES. A hundred metres of white boxes is a photograph of a
  // waterfall until something in it changes: every streak shimmers on its own
  // phase and slides a little, the mist at the foot breathes. It costs nothing
  // and it is the difference between a mural and a window.
  const streaks = ctx.__streaks ?? [], mists = ctx.__mists ?? [], boils = ctx.__boils ?? [];
  ctx.animate?.((t) => {
    for(const s of streaks){
      s.mat.emissiveIntensity = s.base * (0.82 + 0.3 * Math.sin(t * 6.5 + s.phase) * Math.sin(t * 2.1 + s.phase * 0.6));
      s.m.position.y = s.y0 + Math.sin(t * 3.7 + s.phase) * 0.45;
    }
    for(const m of mists) m.mat.opacity = 0.11 + 0.04 * Math.sin(t * 0.9 + m.phase);
    // The boil: opacity and height together. Opacity alone reads as a light
    // being turned up and down; a pad that also swells reads as water.
    for(const b of boils){
      const k = Math.sin(t * 1.9 + b.phase) * Math.sin(t * 0.77 + b.phase * 1.4);
      b.mat.opacity = 0.17 + 0.11 * k;
      b.mesh.scale.y = 1 + 0.28 * k;
      b.mesh.position.y = b.y0 + 0.35 * k;
    }
  });

  // ---- what it lands in: a pool running the length of the gorge, and the boil
  // along the foot of the curtain.
  put(34, 3, ZLEN + 40, FALL_X + 9, POOL - 1.5, ZMID, M.pool);
  const band = M.spray.clone();
  band.opacity = 0.14;
  const bandMesh = put(16, 1.6, ZLEN, FALL_X, POOL + 1.2, ZMID, band);
  const bandY = bandMesh.position.y;

  // Everything with a texture that has to travel: the nine bay sheets, the nine
  // veils in front of them, and the pool itself. One animator each, from the
  // engine's own helper — see `streakTexture` on why the sign is positive.
  for(const [tex, dv] of scrolls) ctx.animate?.(scrollUV(tex, 0, dv));
  ctx.animate?.(scrollUV(poolTex, 0.03, -0.09));
  ctx.animate?.((t) => {
    band.opacity = 0.13 + 0.07 * Math.sin(t * 1.3) * Math.sin(t * 0.41 + 1.2);
    bandMesh.position.y = bandY + Math.sin(t * 0.9) * 0.22;
  });

  // ---- THE MIST AT THE FOOT.
  //
  // Sixty soft discs that rise out of the plunge pool, fade in, fade out and
  // start again — one `THREE.Points` cloud, one draw call, additively blended so
  // that fading a point's colour toward black *is* fading it out.
  //
  // **They stay in the gorge.** Every one of them is spawned between x = 25 and
  // x = 35 and a disc is nine metres across, so nothing reaches closer than
  // x ≈ 20 and the glazing is at x = 10. The reason that is a rule rather than a
  // preference: a wide veil centred on the fall reaches back *through* the glass
  // and hangs inside the building, and from a gallery it does not read as mist —
  // it reads as the window being dirty on the inside.
  const MIST_N = 60;
  const MIST_Y0 = POOL + 1, MIST_RISE = 42;      // out of the pool to about the machine floor
  const mistPos = new Float32Array(MIST_N * 3);
  const mistCol = new Float32Array(MIST_N * 3);
  const puffs = [];
  const respawn = (p, first) => {
    p.x = FALL_X - 6 + rnd() * 10;               // 25 … 35
    p.z = Z0 + rnd() * ZLEN;
    p.y = MIST_Y0 + (first ? rnd() * MIST_RISE : rnd() * 3);
    p.v = 1.1 + rnd() * 1.9;
    p.seed = rnd() * 6.283;
  };
  for(let i = 0; i < MIST_N; i++){ const p = {}; respawn(p, true); puffs.push(p); }
  const mistGeo = new THREE.BufferGeometry();
  mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
  mistGeo.setAttribute('color', new THREE.BufferAttribute(mistCol, 3));
  const mistCloud = new THREE.Points(mistGeo, new THREE.PointsMaterial({
    map: discTexture(), size: 9, sizeAttenuation: true, vertexColors: true,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
  mistCloud.frustumCulled = false;               // the cloud is 216 m long; its bounds never update
  mistCloud.userData.ignoreAudit = true;
  markStructure([mistCloud], 'scenery');
  scene.add(mistCloud);
  ctx.animate?.((t, dt) => {
    for(let i = 0; i < MIST_N; i++){
      const p = puffs[i];
      p.y += p.v * dt;
      let k = (p.y - MIST_Y0) / MIST_RISE;
      if(k >= 1){ respawn(p, false); k = 0; }
      // In over the first fifth, out over the last half: a puff is thickest
      // just clear of the water and thins as it climbs.
      const a = 0.30 * Math.min(1, k / 0.18) * Math.min(1, (1 - k) / 0.5);
      mistPos[i * 3]     = p.x + Math.sin(t * 0.5 + p.seed) * 1.8;
      mistPos[i * 3 + 1] = p.y;
      mistPos[i * 3 + 2] = p.z + Math.cos(t * 0.37 + p.seed) * 1.3;
      mistCol[i * 3]     = a * 0.90;
      mistCol[i * 3 + 1] = a * 0.96;
      mistCol[i * 3 + 2] = a;
    }
    mistGeo.attributes.position.needsUpdate = true;
    mistGeo.attributes.color.needsUpdate = true;
  });

  // ---- THE CREST, at the top of the fall.
  //
  // From the gate floor the lip is twenty-two degrees up and from the lookout
  // fifteen, so this is the part of the structure those two floors actually look
  // at — and until now the top of a hundred-metre spillway was a bare slab. What
  // goes on it is what goes on a real one: a walkway, a handrail with a hundred
  // metres of air past it, two lamps, and the hoists that lift the gates.
  const WALK_X = FALL_X + 5.2;
  put(3.2, 0.3, ZLEN, WALK_X, CREST_Y + 0.15, ZMID, M.deck);
  // The rail in four long runs rather than one box per bay: it is 216 m of
  // handrail and every metre of it is off in the distance.
  for(let s = 0; s < 4; s++){
    const cz = Z0 + ZLEN * (s + 0.5) / 4;
    put(0.09, 0.09, ZLEN / 4, WALK_X + 1.4, CREST_Y + 1.35, cz, M.steel);
    put(0.07, 0.07, ZLEN / 4, WALK_X + 1.4, CREST_Y + 0.80, cz, M.steel);
  }
  for(let z = Z0 + 3; z < Z1; z += 7){
    put(0.09, 1.35, 0.09, WALK_X + 1.4, CREST_Y + 0.98, z, M.steel);
  }

  // Two lamp posts, and they are lit: the whole point of the storm afternoon is
  // that it is dark enough outside for the lights to be on. Emissive geometry,
  // never a real light — house rule 1, and there are already five in this scene.
  // Registered in `ctx.lightPanels` so `updateInteriorTimeOfDay` dims them with
  // everything else as the day runs out.
  for(const lz of [88, 113]){
    put(0.16, 5.0, 0.16, WALK_X + 0.4, CREST_Y + 2.6, lz, M.steel);
    put(0.9, 0.12, 0.16, WALK_X + 0.0, CREST_Y + 5.0, lz, M.steel);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xfff2d6, emissive: 0xffe3ac, emissiveIntensity: 2.2, roughness: 0.4 });
    const bulb = put(0.5, 0.22, 0.5, WALK_X - 0.4, CREST_Y + 4.88, lz, bulbMat);
    ctx.lightPanels?.push(bulb);
  }

  // The gate hoists. Two of them, on the piers either side of the bays the gate
  // floor and the lookout look straight out at — z = 64…90 and z = 90…116, which
  // is the gate floor's own stretch of spine and the one above it. The gates are
  // up, because it is the fourth day of a flood and the spillway is running.
  for(const gz0 of [64, 90]){
    const gcz = gz0 + BAY / 2;
    for(const pz of [gz0, gz0 + BAY]){
      for(const lx of [FALL_X - 1.0, FALL_X + 4.0]){
        put(0.5, 6.4, 0.5, lx, CREST_Y + 5.0, pz, M.steel);
      }
    }
    for(const lx of [FALL_X - 1.0, FALL_X + 4.0]){
      put(0.6, 0.7, BAY + PIER, lx, CREST_Y + 8.4, gcz, M.steel);
    }
    put(5.6, 0.5, 0.5, FALL_X + 1.5, CREST_Y + 8.8, gcz, M.steel);      // the cross-brace
    put(1.1, 1.1, 4.0, FALL_X + 1.5, CREST_Y + 7.4, gcz, M.steel);      // the drum
    for(const s of [-1, 1]){
      put(0.12, 4.2, 0.12, FALL_X + 1.5, CREST_Y + 5.2, gcz + s * 4.6, M.steel);
    }
    // The leaf itself. Built hoisted; story.js seats it on the sill until the
    // release and lifts it, in signed order, when the last mission is accepted.
    const G = gated.get(gz0);
    const leaf = put(0.7, 6.0, BAY - PIER - 1.2, FALL_X - 0.4, CREST_Y + 3.6, gcz, M.gate);
    if(G) G.leaf = leaf;
    for(const s of [-1, 1]){
      const lug = put(0.9, 0.5, 0.5, FALL_X - 0.4, CREST_Y + 6.4, gcz + s * 5.2, M.gate);
      G?.lugs.push(lug);
    }
  }

  // ---- the sky, and it is weather.
  //
  // An interior has none, and this building is open to it: the galleries are
  // decks with nothing overhead, so what is above the handrail has to be a real
  // sky or the player is standing under a black void.
  //
  // **This used to be a night dome and three thousand stars, and the building
  // behind it was lit like a Tuesday morning.** The header explains why the sky
  // is the half that moved: the engine's interior rig is a daylight rig and a
  // theme cannot make it night. What is here now is a storm afternoon — cloud
  // base dark overhead, the light getting in under it at the horizon, and the
  // sun low and warm behind the fall, which on a sphere is `u = 0.5`.
  //
  // `fog: false`, because the fog in this scene exists to make the far wall of
  // the gorge recede and it would flatten the whole sky to one grey. Instead the
  // fog *colour* and the horizon band of this texture are written to match, so
  // the top of the gorge wall dissolves into the cloud rather than ending on a
  // seam. Change one and change the other — `look.fog.colour` in theme.js.
  const domeTex = stormSkyTexture(770311);
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(520, 32, 20),
    new THREE.MeshBasicMaterial({ map: domeTex, side: THREE.BackSide, fog: false }));
  dome.position.set(0, 0, ZMID);
  dome.userData.ignoreAudit = true;
  markStructure([dome], 'sky');
  scene.add(dome);

  // ---- the story, outside the glass: the gated bays and their release, the
  // level gauge on the pier, the valley below the dam, the crest access gate,
  // and the weather closing in. See story.js.
  storyExtras(scene, { ...ctx, put, materials: M, gated: [...gated.values()],
    geom: { Z0, Z1, ZMID, ZLEN, GLASS_X, FALL_X, ROCK_X, HEAD, POOL, BAY, PIER, CREST_Y, WALK_X } });
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
    soft(x, z, 0.4);
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
        soft(b.cx + f * 1.9, cz, 0.5);
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
        soft(chX - f * 0.55, z, 0.2);
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

  // The bible's aftermaths at their home fixtures, and the shift kitchen.
  dressRoom(room.id, room, ctx);
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

  // ---- the wet strip, inside the glass line.
  //
  // Forty metres of falling water throws spray at the glazing all day and the
  // deck under it never dries. It is a strip of dark, almost polished floor a
  // hand's width in from the mullions, running the length of the level: low
  // roughness, so it takes a bright reflection of the fall and picks the glass
  // line out from twenty metres down the gallery.
  //
  // Not a collider and not a fitting. It is 30 mm proud of the deck, nobody
  // walks round it, and a floor finish that raised the room's piece count would
  // be measuring the wrong thing.
  const wet = ctx.box(0.72, 0.03, sp.z1 - sp.z0, hw - 0.5, 0.016, (sp.z0 + sp.z1) / 2,
    wetMaterial());
  wet.castShadow = false;
  wet.userData.ignoreAudit = true;
  markStructure([wet], 'floor');

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

  // Rain on this level's glass, the storm board, the valley lookout and the
  // crest rail — whichever of them this level carries.
  storySpine(ctx);
}
