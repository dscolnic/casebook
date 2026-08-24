// props.js — what a magnitude 6.8 leaves behind, three days later.
//
// The other seven games decorate a working place. This one decorates a broken
// one, and the damage is the instrument: every object here is something an
// engineer would photograph and write a number against.
//
// The vocabulary, and what each thing teaches:
//
//   the scarp        a kerb, a centre line and a fence stepped 1.8 m across a
//                    line you can walk. The fault is not an abstraction on a map.
//   sand boils       grey fans of ejected sand in the Flats streets, with a car
//                    down to its axles. Liquefaction, and why fill is not soil.
//   raking shores    timber from the pavement to the parapet line in Upper Town.
//                    Unreinforced masonry fails outward; the shores hold it in.
//   Marina Court     six storeys at eight degrees on a raft that is undamaged.
//                    Bearing failure — the building is fine, the ground is not.
//   the soft storey  a car park level pancaked under four floors that are intact.
//                    Where the stiffness stops, the storey goes.
//   the wharf        quay edge cracked parallel to the water and moved seaward,
//                    with the gangway now short. Lateral spreading.
//   placards         red, yellow and green on every door. The campaign's whole
//                    decision, readable from across the street.
//   crack network    ground cracks that wander, branch and carry a lip, run out
//                    from the scarp and the creek line rather than scattered.
//   facade cracks    the shear and settlement cracking on the walls themselves,
//                    drawn as a texture because a crack is a line, not a solid.
//   holes            the ground gone from under a street: a rim of tipped
//                    asphalt, three darkening steps down, rebar, ponded water.
//   overturned       what a 6.8 does to anything that was not tied down — cars
//                    on their roofs, containers off the stack, a bus on its side.
//   smoke and dust   smouldering fires and the dust of three days of clearing,
//                    as sprites, because they must face the camera and drift.
//
// House rules that bit while writing this: `kit.box` rotates about Y only, so
// anything leaning is a THREE.Group with a z-rotation; emissive geometry rather
// than lights, because six real lights is the ceiling and the base camp alone
// would eat it; and placers take `(x, z, y)` with the ground last.
import * as THREE from 'three';
import {
  MATERIALS, box, cyl, post, sign, fenceRun, crateStack, vehicle, displayBoard, tank,
  VEHICLE_DRIVE, quadBike, QUAD_DRIVE, clearSpot,
} from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';
// The buildings, so the damage on them is placed from the same numbers the world
// built them with. A wall crack whose position is typed by hand goes stale the
// first time a building moves, and nothing checks a decal.
import { site } from './site.js';

/** The three placard colours, which are the same everywhere in this world. */
const PLACARD = {
  red: 0xb3342a,
  yellow: 0xd8a02a,
  green: 0x3f8f56,
};

/**
 * A placard on a door: a coloured card in a frame, at eye height, facing out.
 *
 * Emissive at a low level so it stays readable in the dust haze without being a
 * light — these are the wayfinding of the whole game and a grey card at fifty
 * metres is invisible.
 */
function placard(scene, x, z, y, colour, facing = 0){
  const g = new THREE.Group();
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.86, 0.05),
    MATERIALS.paintedSteel(0x2e2b26),
  );
  const card = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.74, 0.06),
    new THREE.MeshStandardMaterial({
      color: colour, emissive: new THREE.Color(colour), emissiveIntensity: 0.35,
      roughness: 0.85, metalness: 0,
    }),
  );
  card.position.z = 0.02;
  g.add(back, card);
  g.position.set(x, y + 1.55, z);
  g.rotation.y = facing;
  scene.add(g);
  return card;
}

/** Timber raking shores: the diagonal props holding a façade in. */
function shores(scene, { x, z, y, facing = 0, length = 9, count = 4, height = 6.2 }){
  const timber = MATERIALS.paintedSteel(0x8a7350);
  for(let i = 0; i < count; i++){
    const off = (i - (count - 1) / 2) * 2.6;
    const g = new THREE.Group();
    // The raker itself, leaning back from the wall at about 60°.
    const len = Math.hypot(height, length * 0.55);
    const r = new THREE.Mesh(new THREE.BoxGeometry(0.22, len, 0.22), timber);
    r.position.set(0, len / 2, 0);
    r.rotation.x = Math.atan2(length * 0.55, height);
    g.add(r);
    // Sole plate on the ground and a cleat against the wall.
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.18, 2.2), timber);
    sole.position.set(0, 0.09, length * 0.5);
    g.add(sole);
    g.position.set(x + Math.cos(facing) * off, y, z + Math.sin(facing) * off);
    g.rotation.y = facing;
    scene.add(g);
  }
}

/** A fan of ejected sand, with the crack it came out of. */
function sandBoil(scene, x, z, y, r = 3.4){
  const sand = new THREE.MeshStandardMaterial({ color: 0x9d9483, roughness: 1, metalness: 0 });
  const fan = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.15, 0.16, 18), sand);
  fan.position.set(x, y + 0.08, z);
  scene.add(fan);
  const vent = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.16, r * 0.2, 0.2, 10),
    MATERIALS.paintedSteel(0x4a4740));
  vent.position.set(x, y + 0.14, z);
  scene.add(vent);
}


/**
 * A building sitting slightly out of plumb.
 *
 * `kit.box` rotates about Y only, so anything leaning has to be a Group with a
 * z-rotation. Differential settlement is the point: a street where every house
 * is out by a different degree or two reads as *ground* failing, where one
 * dramatic lean reads as one unlucky building.
 */
function leaner(scene, { x, z, y, w = 9, d = 8, h = 6, tilt = 0.03, colour = 0xa39a8b, facing = 0 }){
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), MATERIALS.paintedSteel(colour));
  body.position.y = h / 2;
  g.add(body);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.6, 0.5, d + 0.6),
    MATERIALS.paintedSteel(0x5d5347));
  roof.position.y = h + 0.25;
  g.add(roof);
  g.position.set(x, y, z);
  g.rotation.y = facing;
  g.rotation.z = tilt;
  scene.add(g);
  return g;
}

/**
 * The spray-painted record of an inspection: a date, initials and a placard
 * letter, straight onto the wall beside the door.
 *
 * Drawn as a small canvas texture rather than geometry, because it is the
 * cheapest way to put readable writing on a wall and this is the visual
 * language of the whole subject — every building in a placarded town wears one.
 */
function doorCode(scene, { x, z, y, facing = 0, text = '09/03  AW', colour = '#d8a02a' }){
  const c = document.createElement('canvas');
  c.width = 256; c.height = 128;
  const cx = c.getContext('2d');
  cx.clearRect(0, 0, 256, 128);
  cx.strokeStyle = colour; cx.lineWidth = 9; cx.lineCap = 'round';
  // The circle-and-slash the search teams actually use, then the writing.
  cx.beginPath(); cx.arc(60, 64, 40, 0, Math.PI * 2); cx.stroke();
  cx.beginPath(); cx.moveTo(30, 34); cx.lineTo(90, 94); cx.stroke();
  cx.font = 'bold 34px monospace'; cx.fillStyle = colour;
  cx.fillText(text, 112, 78);
  const tex = new THREE.CanvasTexture(c);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.3),
    new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 1,
      polygonOffset: true, polygonOffsetFactor: -3 }));
  m.position.set(x, y + 2.1, z);
  m.rotation.y = facing;
  scene.add(m);
  return m;
}

/** A ridge tent, for the people who are not sleeping in their houses. */
function tent(scene, x, z, y, { w = 4.2, l = 6.4, h = 2.6, facing = 0, colour = 0xb9b2a2 } = {}){
  const g = new THREE.Group();
  const mat = MATERIALS.paintedSteel(colour);
  for(const side of [-1, 1]){
    const p = new THREE.Mesh(new THREE.BoxGeometry(w * 0.62, 0.12, l), mat);
    p.position.set(side * w * 0.26, h * 0.55, 0);
    p.rotation.z = side * 0.72;
    g.add(p);
  }
  const end = new THREE.Mesh(new THREE.BoxGeometry(w, h * 0.5, 0.1), mat);
  end.position.set(0, h * 0.25, l / 2);
  g.add(end);
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  return g;
}

/** A crack in the ground: a thin dark line with a lip on one side. */
function fissure(scene, { x, z, y, len = 12, ang = 0, width = 0.5, throwUp = 0.12 }){
  const dark = MATERIALS.paintedSteel(0x2f2b26);
  box(scene, len, 0.12, width, x, y + 0.04, z, dark, ang);
  // The lip: one side of a crack is almost always a little higher than the other.
  box(scene, len, throwUp, width * 0.5, x + Math.sin(ang) * width, y + throwUp / 2,
    z + Math.cos(ang) * width, MATERIALS.paintedSteel(0x8a8172), ang);
}

// --------------------------------------------------------------- the damage
// Everything below this line is the earthquake itself rather than the response
// to it. Four ideas, and each one is a shape the eye reads as broken:
// a crack wanders and branches, a hole has a rim, a thing that fell over is
// still recognisably the thing, and smoke moves.

/**
 * A seeded random. Every piece of damage has to land in the same place on every
 * run — a crack that moves between two screenshots cannot be judged, and
 * `npm run shots` is how this game gets looked at.
 */
function rng(seed){
  let s = (seed * 9301 + 49297) % 233280;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

/**
 * The canvas a ground crack is painted on: a line that wanders the length of
 * the strip and throws off a branch or two, with a pale spalled edge under it.
 */
function groundCrackCanvas(seed){
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 256;
  const g = c.getContext('2d');
  const rand = rng(seed);
  g.clearRect(0, 0, 1024, 256);
  g.scale(2, 2);   // authored at 512 x 128, drawn at twice that, so the line is crisp
  const walk = (next, x0, y0, steps, seg, wide, colour, drift) => {
    g.strokeStyle = colour; g.lineWidth = wide; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x0, y0);
    let px = x0, py = y0, a = 0;
    const pts = [];
    for(let i = 0; i < steps; i++){
      a += (next() - 0.5) * drift;
      a = Math.max(-1.0, Math.min(1.0, a));
      px += Math.cos(a) * seg; py += Math.sin(a) * seg;
      py = Math.max(14, Math.min(114, py));
      g.lineTo(px, py);
      pts.push({ x: px, y: py, a });
    }
    g.stroke();
    return pts;
  };
  const y0 = 40 + rand() * 48, steps = 26, seg = 512 / 26;
  // Spall first, then the crack over it, both from the same seed so they follow
  // the same path — the pale edge is the ground broken away beside the opening,
  // and it is what makes the crack read at all. The first pass drew a dark line
  // on dark asphalt at dusk and the whole network was invisible on screen.
  g.globalAlpha = 0.8;
  walk(rng(seed), 0, y0 + 3, steps, seg, 17, '#a89d8a', 0.75);
  g.globalAlpha = 1;
  const pts = walk(rng(seed), 0, y0, steps, seg, 7.5, '#17130f', 0.75);
  // Branches: a crack network is what makes a street read as shaken rather than
  // as cut. Two per strip, off points along the run.
  for(const i of [Math.floor(steps * 0.3), Math.floor(steps * 0.7)]){
    const p = pts[i];
    if(!p) continue;
    const b = rng(seed * 31 + i);
    g.strokeStyle = '#17130f'; g.lineWidth = 4.4; g.beginPath(); g.moveTo(p.x, p.y);
    let bx = p.x, by = p.y, ba = p.a + (rand() < 0.5 ? 1 : -1) * 1.0;
    for(let k = 0; k < 5; k++){
      ba += (b() - 0.5) * 0.8;
      bx += Math.cos(ba) * seg * 0.7; by += Math.sin(ba) * seg * 0.7;
      g.lineTo(bx, by);
    }
    g.stroke();
  }
  return c;
}

/**
 * A crack in the ground that wanders, branches and carries a lip.
 *
 * The straight-line `fissure` above is the diagram version, and it is right
 * where the point being made is the measurement. This is the one for everywhere
 * else — and it is a *texture*, after the first attempt built it out of boxes:
 * two meshes every three metres came to about fourteen hundred extra meshes
 * across the town, which froze the renderer outright in headless Chrome and
 * shipped a game that would not take a screenshot. A crack is a line a
 * centimetre wide, and the only way to build that out of boxes is to make it
 * half a metre wide, which is a painted stripe.
 *
 * The strip is cut into three so it follows the ground rather than floating off
 * a slope, and a couple of solid lips go on for relief, because a decal alone
 * has no edge to catch the low sun.
 */
function crackRun(scene, groundAt, { x, z, ang = 0, len = 26, width = 6, seed = 1 }){
  const rand = rng(seed);
  const tex = new THREE.CanvasTexture(groundCrackCanvas(seed));
  const parts = 3, span = len / parts;
  for(let i = 0; i < parts; i++){
    const d = (i + 0.5) * span - len / 2;
    const px = x + Math.sin(ang) * d, pz = z + Math.cos(ang) * d;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(span, width),
      new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 1, metalness: 0,
        depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 }));
    // The strip is cut across its own length, so each part shows its own third
    // of the canvas and the crack still runs continuously through all three.
    m.material.map = tex.clone();
    m.material.map.repeat.set(1 / parts, 1);
    m.material.map.offset.set(i / parts, 0);
    m.material.map.needsUpdate = true;
    m.rotation.x = -Math.PI / 2;
    m.rotation.z = -ang;
    m.position.set(px, groundAt(px, pz) + 0.05, pz);
    scene.add(m);
  }
  // Two lips of thrown-up ground along the run. One side of a crack is almost
  // always proud of the other, and that is the part the sun catches.
  for(let i = 0; i < 2; i++){
    const d = (rand() - 0.5) * len * 0.7;
    const px = x + Math.sin(ang) * d + Math.cos(ang) * (rand() - 0.5) * 1.2;
    const pz = z + Math.cos(ang) * d - Math.sin(ang) * (rand() - 0.5) * 1.2;
    box(scene, 0.5 + rand() * 0.5, 0.08 + rand() * 0.14, span * 0.7,
      px, groundAt(px, pz) + 0.06, pz, MATERIALS.paintedSteel(0x8f8677), ang + (rand() - 0.5) * 0.3);
  }
}

/** A soft round puff, cached: the map behind every piece of smoke and dust. */
let PUFF = null;
function puffTexture(){
  if(PUFF) return PUFF;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, 'rgba(255,255,255,0.95)');
  grad.addColorStop(0.45, 'rgba(255,255,255,0.42)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.beginPath(); g.arc(64, 64, 62, 0, Math.PI * 2); g.fill();
  PUFF = new THREE.CanvasTexture(c);
  return PUFF;
}

/**
 * A column of smoke.
 *
 * Sprites, not geometry: smoke has to face the camera from every angle and it
 * has to move, and `THREE.Sprite` gives the first for free. The second is
 * `onBeforeRender` on each sprite — the outdoor world animates the waypoint and
 * the board screens and nothing else, and a props layer has no frame hook of
 * its own. A sprite is a rendered object, so three calls it; the position set
 * there lands one frame late, which nobody can see.
 *
 * Each puff runs the whole column on its own phase and fades in at the vent and
 * out at the top, because a column that stops at a hard edge reads as a decal.
 */
function smokeColumn(scene, { x, z, y, height = 16, r = 2.6, count = 12, tint = 0x8b8378,
  opacity = 0.32, lean = 4, speed = 0.05, seed = 1 }){
  const tex = puffTexture();
  const rand = rng(seed);
  for(let i = 0; i < count; i++){
    const phase = i / count;
    const sway = 0.7 + rand() * 1.4, off = rand() * 6.28;
    const mat = new THREE.SpriteMaterial({ map: tex, color: tint, transparent: true,
      opacity, depthWrite: false, fog: true });
    const s = new THREE.Sprite(mat);
    s.position.set(x, y + phase * height, z);
    s.scale.setScalar(r);
    s.renderOrder = 2;
    s.onBeforeRender = () => {
      const k = (phase + performance.now() * 0.001 * speed) % 1;
      s.position.set(
        x + Math.sin(k * 3.1 + off) * sway + k * lean,
        y + 0.6 + k * height,
        z + Math.cos(k * 2.3 + off) * sway * 0.7,
      );
      s.scale.setScalar(r * (0.5 + k * 2.0));
      mat.opacity = opacity * Math.min(1, k * 6) * (1 - k * 0.8);
    };
    scene.add(s);
  }
}

/**
 * Dust hanging over a district and drifting across it.
 *
 * Three days of pulverised masonry, and it is the difference between a town
 * that is broken and a town that is broken and still being worked on. Low, wide
 * and very faint: `look.fog` already carries the distance haze, and this is the
 * part of it that moves past you.
 */
function dustDrift(scene, groundAt, { x, z, w = 120, d = 60, count = 10, r = 26,
  tint = 0xaaa091, opacity = 0.13, speed = 0.012, seed = 1 }){
  const tex = puffTexture();
  const rand = rng(seed);
  for(let i = 0; i < count; i++){
    const phase = rand();
    const oz = z + (rand() - 0.5) * d;
    const gy = groundAt(x, oz) + 2.4 + rand() * 3.5;
    const scale = r * (0.7 + rand() * 0.8);
    const mat = new THREE.SpriteMaterial({ map: tex, color: tint, transparent: true,
      opacity, depthWrite: false, fog: true });
    const s = new THREE.Sprite(mat);
    s.position.set(x, gy, oz);
    s.scale.setScalar(scale);
    s.renderOrder = 1;
    s.onBeforeRender = () => {
      const k = (phase + performance.now() * 0.001 * speed) % 1;
      s.position.x = x - w / 2 + k * w;
      // Fade at both ends of the run, or the sheet pops into existence upwind.
      mat.opacity = opacity * Math.min(1, k * 5) * Math.min(1, (1 - k) * 5);
    };
    scene.add(s);
  }
}

/**
 * A crack on a wall, as a texture.
 *
 * Geometry is the wrong answer here: a crack is a line a few millimetres wide
 * and the only way to build one out of boxes is to make it ten centimetres
 * wide, which reads as a moulding. Drawn on a canvas and hung a hair proud of
 * the wall, with a pale ghost stroke behind the dark one — that is the spalled
 * edge, and without it the crack looks drawn on.
 */
function crackCanvas(seed, lines){
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const rand = rng(seed);
  g.clearRect(0, 0, 256, 256);
  // One walk, driven by a generator handed in — so the spall stroke and the
  // crack over it can take exactly the same turns from the same seed.
  const walk = (next, x0, y0, a0, seg, steps, wide, colour) => {
    g.strokeStyle = colour; g.lineWidth = wide; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x0, y0);
    let px = x0, py = y0, a = a0;
    for(let i = 0; i < steps; i++){
      a += (next() - 0.5) * 1.1;
      px += Math.cos(a) * seg; py += Math.sin(a) * seg;
      g.lineTo(px, py);
    }
    g.stroke();
    return { x: px, y: py, a };
  };
  for(let i = 0; i < lines; i++){
    // Shear cracking runs diagonally between the openings, which is why these
    // start near the head or the sill and head across rather than straight down.
    const x0 = rand() * 256, y0 = rand() < 0.5 ? 8 + rand() * 40 : 200 + rand() * 48;
    const a0 = (y0 < 128 ? 0.6 : -0.6) + (rand() - 0.5) * 1.4;
    const seg = 14 + rand() * 10, steps = 7 + Math.floor(rand() * 6);
    const path = seed * 13 + i;
    // The spall is what carries the crack on screen. A 3 cm dark line on a dark
    // wall at dusk is invisible at any distance a player looks at a building
    // from, and the first pass shipped exactly that: forty-four crack panels
    // hung on eleven buildings, and not one of them showed in a screenshot.
    g.globalAlpha = 0.8;
    walk(rng(path), x0 + 2, y0 + 2, a0, seg, steps, 8, '#d2c8b2');
    g.globalAlpha = 1;
    const tail = walk(rng(path), x0, y0, a0, seg, steps, 3.6, '#17130f');
    // One branch off the tail, which is what a crack does at a lintel.
    if(rand() < 0.7){
      walk(rng(seed * 29 + i), tail.x, tail.y,
        tail.a + (rand() < 0.5 ? 1 : -1) * 0.9, seg * 0.6, 4, 1.8, '#241f1a');
    }
  }
  return c;
}

/** Hang a crack panel on a wall face, a hair proud of the plaster. */
function wallCrack(scene, { x, z, y, facing = 0, w = 3, h = 3.4, seed = 1, lines = 3 }){
  const tex = new THREE.CanvasTexture(crackCanvas(seed, lines));
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 1, metalness: 0,
      depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 }));
  m.position.set(x, y, z);
  m.rotation.y = facing;
  scene.add(m);
  return m;
}

/**
 * A hole punched clean through a wall, with what came out of it on the ground.
 *
 * The dark plate is the inside of a building nobody has lit for three days;
 * the ragged brick around it is what makes it a hole rather than a window.
 */
function wallHole(scene, groundAt, { x, z, y, facing = 0, w = 2.4, h = 2.0, seed = 3 }){
  const rand = rng(seed);
  const dir = { x: Math.sin(facing), z: Math.cos(facing) };
  const side = { x: Math.cos(facing), z: -Math.sin(facing) };
  box(scene, w, h, 0.1, x, y, z, MATERIALS.paintedSteel(0x171513), facing);
  // The ragged edge: brick ends around the opening, none of them square on.
  for(let i = 0; i < 16; i++){
    const t = i / 16 * Math.PI * 2;
    const ex = x + side.x * Math.cos(t) * w * 0.52 + dir.x * 0.06;
    const ez = z + side.z * Math.cos(t) * w * 0.52 + dir.z * 0.06;
    box(scene, 0.42, 0.2, 0.22, ex, y + Math.sin(t) * h * 0.52, ez,
      MATERIALS.paintedSteel(0x8f6a55), facing + (rand() - 0.5) * 0.8);
  }
  // And the spill of it on the pavement below, which is where the eye goes.
  for(let i = 0; i < 22; i++){
    const bx = x + dir.x * (0.6 + rand() * 3.2) + side.x * (rand() - 0.5) * w * 1.6;
    const bz = z + dir.z * (0.6 + rand() * 3.2) + side.z * (rand() - 0.5) * w * 1.6;
    box(scene, 0.46, 0.2, 0.22, bx, groundAt(bx, bz) + 0.1 + (i % 3) * 0.18, bz,
      MATERIALS.paintedSteel(0x8f6a55), rand() * 3.1);
  }
}

/**
 * The ground gone from under a street.
 *
 * The terrain is a heightfield and a prop cannot dig it, so depth here is
 * painted rather than modelled: a rim of tipped slabs, three discs stepping
 * darker toward the middle, rebar hanging out of the edge, and water in the
 * bottom of the ones on the Flats — where the water table is a metre down and
 * every hole in that ground has found it.
 */
function sinkhole(scene, groundAt, { x, z, r = 4, seed = 5, ponded = false }){
  const rand = rng(seed);
  const y = groundAt(x, z);
  const disc = (radius, colour, lift) => {
    const m = new THREE.Mesh(new THREE.CircleGeometry(radius, 22),
      new THREE.MeshStandardMaterial({ color: colour, roughness: 1, metalness: 0 }));
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, y + lift, z);
    scene.add(m);
    return m;
  };
  disc(r, 0x453e35, 0.05);
  disc(r * 0.74, 0x2a251f, 0.045);
  disc(r * 0.44, 0x131110, 0.04);
  if(ponded) disc(r * 0.3, 0x2d3a3a, 0.035);
  // The rim: slabs of road surface tipped in, which is the whole read at eye
  // height. Without them a hole is a dark circle painted on the ground.
  for(let i = 0; i < 10; i++){
    const t = i / 10 * Math.PI * 2 + rand() * 0.2;
    const rr = r * (0.86 + rand() * 0.22);
    const sx = x + Math.cos(t) * rr, sz = z + Math.sin(t) * rr;
    const g = new THREE.Group();
    box(g, 1.5 + rand(), 0.22, 1.2 + rand() * 0.8, 0, 0, 0, MATERIALS.paintedSteel(0x6c6459));
    g.position.set(sx, groundAt(sx, sz) + 0.12, sz);
    g.rotation.y = -t;
    g.rotation.z = 0.25 + rand() * 0.5;   // tipped in toward the middle
    scene.add(g);
  }
  // Rebar and a severed service pipe, hanging over the edge.
  for(let i = 0; i < 3; i++){
    const t = rand() * 6.28, rr = r * 0.8;
    const bx = x + Math.cos(t) * rr, bz = z + Math.sin(t) * rr;
    box(scene, 0.05, 0.05, 1.4 + rand(), bx, y + 0.4, bz, MATERIALS.steel(), t);
  }
  cyl(scene, 0.18, 1.6, x + r * 0.7, y + 0.3, z - r * 0.5, MATERIALS.paintedSteel(0x5b5f52), 0.18);
  return { x, z, r: r + 0.8 };
}

/**
 * Anything the shaking put on its side.
 *
 * `kit.box` rotates about Y only, so a tipped object is a Group with a roll on
 * it — the same rule the leaners follow. `lift` is how far off the ground the
 * object's own origin has to be once it is over, and it is the only fiddly
 * number here: get it wrong and a car on its roof is buried to the windows.
 */
function tumble(scene, { x, z, y, yaw = 0, roll = 0, pitch = 0, lift = 0 }, build){
  const g = new THREE.Group();
  build(g);
  g.position.set(x, y + lift, z);
  g.rotation.set(pitch, yaw, roll);
  scene.add(g);
  return g;
}

/** A shipping container, built at the origin so `tumble` can put it anywhere. */
function container(g, colour = 0x9a5a3a, { w = 2.5, h = 2.6, l = 6.1 } = {}){
  const body = MATERIALS.paintedSteel(colour);
  const rib = MATERIALS.paintedSteel(new THREE.Color(colour).multiplyScalar(0.8).getHex());
  box(g, w, h, l, 0, h / 2, 0, body);
  for(let i = 0; i < 7; i++) box(g, w + 0.05, h * 0.86, 0.09, 0, h / 2, -l / 2 + 0.7 + i * 0.9, rib);
  for(const s of [-1, 1]) box(g, w + 0.08, 0.18, 0.18, 0, h - 0.09, s * (l / 2 - 0.09), rib);
  return g;
}

/** A town bus. Nothing else on a street says "that was thrown" at this size. */
function bus(g, colour = 0x3f6f7a){
  const body = MATERIALS.paintedSteel(colour);
  box(g, 2.6, 3.0, 11, 0, 1.7, 0, body);
  box(g, 2.66, 1.0, 9.2, 0, 2.45, 0, MATERIALS.glass());
  box(g, 2.4, 1.2, 0.12, 0, 2.3, -5.55, MATERIALS.glass());
  for(const [sx, sz] of [[1, 3.6], [-1, 3.6], [1, -3.4], [-1, -3.4]]){
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.36, 12), MATERIALS.rubber());
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(sx * 1.24, 0.6, sz);
    g.add(wheel);
  }
  return g;
}

/**
 * Cracking on the buildings the world built, placed from the site data.
 *
 * The rule the damage follows is the course's whole argument: Upper Town is on
 * granite and cracked, the Flats are on fill and cracked far worse. Anything at
 * z > 20 is on the fill.
 */
function crackFacades(scene, groundAt){
  for(const b of site.buildings ?? []){
    const base = groundAt(b.x, b.z) + 0.35;      // the slab kit.building stands the walls on
    const onFill = b.z > 20;
    const rand = rng(Math.round(b.x * 131 + b.z * 17) + 91);
    const count = onFill ? 5 : 3;
    for(let i = 0; i < count; i++){
      // 0 = the entrance face, then the back, then the two ends.
      const side = i % 4;
      const half = (side < 2 ? b.d : b.w) / 2 + 0.07;
      const along = side < 2 ? b.w : b.d;
      const n = b.facing + [0, Math.PI, Math.PI / 2, -Math.PI / 2][side];
      const pw = Math.min(3.4, along * 0.34) * (0.7 + rand() * 0.6);
      const ph = Math.min(4.2, b.h * 0.72) * (0.7 + rand() * 0.5);
      let u = (rand() - 0.5) * Math.max(0.5, along - pw - 1.2);
      // The doorway, the canopy and the sign own the middle of the entrance
      // face. A crack panel over them renders as a smear across the name.
      if(side === 0 && Math.abs(u) < 3.4) u += (u < 0 ? -1 : 1) * 3.4;
      const px = b.x + Math.sin(n) * half + Math.cos(n) * u;
      const pz = b.z + Math.cos(n) * half - Math.sin(n) * u;
      wallCrack(scene, { x: px, z: pz, y: base + 0.5 + rand() * Math.max(0.2, b.h - ph - 0.8),
        facing: n, w: pw, h: ph, seed: Math.round(b.x + b.z) * 7 + i * 13,
        lines: onFill ? 3 : 2 });
    }
  }
}

export function decorate(scene, ctx){
  const { groundHeight, colliders, softColliders, interactables, lightPanels } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const soft = (s) => { if(s) softColliders.push(s); };
  const glow = (m) => { if(m) lightPanels?.push(m); };

  transport(scene, ctx, y);

  // ===================================================== the rupture, on foot
  // The fault trace runs from (-400, 40) to (400, -110). Where it crosses the
  // things people built in straight lines, it left the offset you can measure —
  // which is the first field measurement of the campaign.
  {
    // The trace, parameterised so everything below sits on it.
    const x0 = -400, z0 = 40, x1 = 400, z1 = -110;
    const at = (t) => ({ x: x0 + (x1 - x0) * t, z: z0 + (z1 - z0) * t });
    const ang = Math.atan2(z1 - z0, x1 - x0);

    // Survey pegs along the trace, every twenty metres, on the walkable stretch.
    for(let t = 0.42; t <= 0.60; t += 0.012){
      const p = at(t);
      post(scene, p.x, p.z, y(p.x, p.z), 1.1, 0.05, 0xd8a02a);
    }

    // Kestrel Street's centre line, stepped where it crosses. Two straight runs
    // that do not meet — which is the whole point.
    const paint = MATERIALS.paintedSteel(0xd9d2c0);
    for(let i = 0; i < 7; i++){
      const z = -46 - i * 6;
      box(scene, 0.28, 0.04, 3.4, 1.9, y(1.9, z) + 0.03, z, paint);   // upthrown side
    }
    for(let i = 0; i < 7; i++){
      const z = -6 + i * 6;
      box(scene, 0.28, 0.04, 3.4, -0.6, y(-0.6, z) + 0.03, z, paint); // downthrown side
    }

    // A boundary fence walking across the trace, with its dogleg.
    fenceRun(scene, { x0: -96, z0: 24, x1: -30, z1: 12, y: y(-60, 18), height: 1.5 });
    fenceRun(scene, { x0: -28, z0: 9.4, x1: 34, z1: -2, y: y(0, 4), height: 1.5 });

    // The scarp face itself: a raw earth step, dressed with a line of broken
    // kerbstones so the eye reads it as ground rather than as a wall.
    for(let t = 0.36; t <= 0.66; t += 0.006){
      const p = at(t);
      const g = y(p.x, p.z);
      const jitter = Math.abs(Math.sin(t * 211)) * 0.5;
      box(scene, 3.6, 0.5 + jitter, 1.1, p.x, g - 0.1, p.z,
        MATERIALS.paintedSteel(0x7d7365), ang + Math.sin(t * 97) * 0.15);
    }

    // The lateral offset. A step you can only read from the side; a road whose
    // centre line goes sideways 2.4 m and carries on is the photograph everybody
    // has seen of a fault, and it is legible from a hundred metres.
    for(let i = 0; i < 6; i++){
      const z = -50 - i * 6;
      box(scene, 0.28, 0.04, 3.4, 4.3, y(4.3, z) + 0.03, z, paint);
    }
    // The kerb, offset the same way, with the broken tail between the two runs.
    box(scene, 0.4, 0.32, 40, -3.4, y(-3.4, 6) + 0.16, 6, MATERIALS.paintedSteel(0x9d968a));
    box(scene, 0.4, 0.32, 40, -1.0, y(-1.0, -56) + 0.16, -56, MATERIALS.paintedSteel(0x9d968a));

    // The ramp: bulldozed fill pushed over the step so vehicles can cross, which
    // is what the terrain now does under the road and this is the evidence of it.
    {
      const rz = -34;
      for(let i = 0; i < 7; i++){
        const w = 13 - i * 0.7;
        box(scene, w, 0.5, 3.0, 0, y(0, rz - 9 + i * 3) + 0.2 + i * 0.12, rz - 9 + i * 3,
          MATERIALS.paintedSteel(0x7f7565));
      }
      // Spoil shoved off to both sides, cones down the middle, and the board.
      for(const sx of [-9, 9]){
        for(let i = 0; i < 5; i++){
          const cz = rz - 8 + i * 4;
          box(scene, 4 + (i % 2), 1.1 + (i % 3) * 0.4, 3.4, sx + (i % 2), y(sx, cz) + 0.55, cz,
            MATERIALS.paintedSteel(0x6f6656), i * 0.5);
        }
      }
      for(let i = 0; i < 8; i++){
        const cz = rz - 12 + i * 3.4, cx = i % 2 ? 4.6 : -4.6;
        cyl(scene, 0.34, 0.75, cx, y(cx, cz) + 0.37, cz, MATERIALS.paintedSteel(0xc4531f), 0.16);
      }
      sign(scene, 'RAMP — 10 km/h', { x: 7.5, z: rz + 13, y: y(7.5, rz + 13) + 2.3, facing: Math.PI,
        sub: 'Surface rupture — single lane, banksman', accent: 0xd8a02a });
      // A total station on a tripod, watching the scarp for movement.
      const tx = -12, tz = rz - 4, ty = y(tx, tz);
      for(let i = 0; i < 3; i++){
        const a = i * 2.09;
        box(scene, 0.07, 1.5, 0.07, tx + Math.cos(a) * 0.35, ty + 0.75, tz + Math.sin(a) * 0.35,
          MATERIALS.paintedSteel(0xd8cfae), a);
      }
      box(scene, 0.42, 0.34, 0.3, tx, ty + 1.62, tz, MATERIALS.paintedSteel(0x2f3b46));
    }

    sign(scene, 'SURFACE RUPTURE', { x: 14, z: -28, y: y(14, -28) + 2.3, facing: Math.PI,
      sub: 'Do not cross plant or vehicles', accent: 0xd8a02a });
  }

  // ================================================ the Flats: liquefaction
  // Grey fans of sand in the streets, wettest near the old creek line, and a
  // car that parked on what used to be ground.
  {
    // The fans follow the 1892 creek, because that is where the loosest and
    // wettest material is. Scattered at random they were decoration; on a line
    // they are the argument Navarro makes on day one, drawn on the ground.
    const creek = (t) => ({ x: -150 + t * 300, z: 62 + Math.sin(t * 3.1) * 34 + t * 26 });
    for(let i = 0; i <= 26; i++){
      const p = creek(i / 26);
      // Real ejecta covers a street rather than dotting it, so these overlap
      // into a continuous sheet with the odd larger vent in it.
      sandBoil(scene, p.x, p.z, y(p.x, p.z), 6.5 + (i % 4) * 2.2);
      if(i % 3 === 0){
        const o = creek((i + 0.5) / 26);
        sandBoil(scene, o.x + 9, o.z - 7, y(o.x + 9, o.z - 7), 4.5);
      }
    }
    // Tyre tracks cut through the silt, because people have been driving in it.
    for(let i = 0; i < 22; i++){
      const p = creek(i / 22);
      box(scene, 11, 0.05, 0.55, p.x, y(p.x, p.z) + 0.2, p.z + 1.6,
        MATERIALS.paintedSteel(0x6c6355), 0.1);
      box(scene, 11, 0.05, 0.55, p.x, y(p.x, p.z) + 0.2, p.z - 1.6,
        MATERIALS.paintedSteel(0x6c6355), 0.1);
    }

    // Fissures radiating through the Flats: kerbs pulled apart, a footpath
    // opened, garden walls unzipped.
    for(let i = 0; i < 16; i++){
      const a = i * 0.7;
      const fx = -110 + i * 14, fz = 88 + Math.sin(a) * 30;
      fissure(scene, { x: fx, z: fz, y: y(fx, fz), len: 9 + (i % 4) * 5, ang: 0.3 + Math.sin(a) * 0.9 });
    }

    // Down to the axles, nose-down, in the biggest of them.
    const car = vehicle(scene, 24, 86, y(24, 86) - 0.55, { facing: 0.7, colour: 0x8d99a6 });
    soft({ x: 24, z: 86, r: 2.6 });

    // A terrace, every house out by a different degree or two. One dramatic lean
    // is an unlucky building; a street of small ones is the ground failing.
    for(let i = 0; i < 9; i++){
      const hx = -104 + i * 13, hz = 128;
      const t = (Math.sin(i * 2.3) * 0.5 + Math.sin(i * 5.1) * 0.5) * 0.045;
      leaner(scene, { x: hx, z: hz, y: y(hx, hz), w: 10, d: 9, h: 6.4, tilt: t,
        colour: [0xa89c8a, 0x9c9484, 0xb0a48f][i % 3] });
      doorCode(scene, { x: hx + 3.2, z: hz - 4.6, y: y(hx, hz), facing: 0,
        text: ['09/03  AW', '10/03  MO', '09/03  AW'][i % 3],
        colour: ['#d8a02a', '#b3342a', '#3f8f56'][i % 3] });
    }

    sign(scene, 'BAY ROAD CLOSED', { x: -6, z: 70, y: y(-6, 70) + 2.2, facing: 0,
      sub: 'Ejecta — no through traffic', accent: 0xb3342a });
  }

  // ============================================ Upper Town: masonry and shores
  // The Parade is a row of 1890s shopfronts with a heavy parapet. The parapet is
  // now in the street, and what is left is held in by timber.
  {
    const px = -74, pz = -34, py = y(px, pz);
    shores(scene, { x: px + 17, z: pz, y: py, facing: -Math.PI / 2, length: 9, count: 5, height: 6.4 });

    // The parapet, where it landed: a spill of brick across the footpath.
    for(let i = 0; i < 70; i++){
      const t = (Math.sin(i * 17.3) + 1) / 2, u = (Math.sin(i * 7.7) + 1) / 2;
      const bx = px + 18 + u * 6.5, bz = pz - 6 + t * 12;
      box(scene, 0.5, 0.22, 0.24, bx, y(bx, bz) + 0.11 + (i % 3) * 0.2, bz,
        MATERIALS.paintedSteel(0x9a6b52), t * 3.1);
    }
    // Hoarding and cordon along the front, because nobody may walk under it.
    fenceRun(scene, { x0: px + 24, z0: pz - 16, x1: px + 24, z1: pz + 16, y: py, height: 2.0 });
    placard(scene, px + 15.6, pz - 4, py, PLACARD.red, -Math.PI / 2);
    placard(scene, px + 15.6, pz + 6, py, PLACARD.red, -Math.PI / 2);

    // Two chimneys down in the street behind it, and a house off its piles.
    for(const [cx, cz] of [[-96, -56], [-58, -62]]){
      for(let i = 0; i < 14; i++){
        const bx = cx + Math.sin(i * 3.1) * 2.4, bz = cz + Math.cos(i * 2.7) * 2.0;
        box(scene, 0.42, 0.2, 0.2, bx, y(bx, bz) + 0.1, bz, MATERIALS.paintedSteel(0x8f6a55), i * 0.7);
      }
    }
  }

  // ========================================== Marina Court, eight degrees over
  // The building the whole course turns on: six storeys leaning, sitting on a
  // raft foundation that came through undamaged. Nothing structural failed. The
  // ground underneath stopped being able to hold it up.
  {
    const bx = 62, bz = 132, by = y(bx, bz);
    const tilt = 8 * Math.PI / 180;
    const g = new THREE.Group();
    const shell = MATERIALS.paintedSteel(0x9fa6ac);
    const H = 21;
    const body = new THREE.Mesh(new THREE.BoxGeometry(17, H, 15), shell);
    body.position.y = H / 2;
    g.add(body);
    // Floor bands, so the lean is legible against the horizon.
    for(let f = 1; f < 6; f++){
      const band = new THREE.Mesh(new THREE.BoxGeometry(17.4, 0.5, 15.4),
        MATERIALS.paintedSteel(0x7e858b));
      band.position.y = f * 3.4;
      g.add(band);
    }
    g.position.set(bx, by, bz);
    g.rotation.z = tilt;
    scene.add(g);
    // A Box3, because that is what every consumer of `colliders` expects — the
    // crowd's blocked() reads c.min.x directly, so a centre-and-size record
    // throws before the world has finished building.
    colliders.push(new THREE.Box3(
      new THREE.Vector3(bx - 10, by, bz - 9), new THREE.Vector3(bx + 10, by + H, bz + 9)));

    // The raft, tipped out of the ground on the high side and perfectly sound.
    box(scene, 20, 1.2, 18, bx - 1.4, by - 0.2, bz, MATERIALS.paintedSteel(0x8b8880), 0);
    placard(scene, bx - 9.5, bz + 7, by, PLACARD.red, Math.PI);
    sign(scene, 'MARINA COURT', { x: bx - 12, z: bz + 12, y: by + 2.4, facing: Math.PI,
      sub: 'Evacuated — raft intact, ground is not', accent: 0xb3342a });
  }

  // ============================================ the soft storey on Bay Road
  // Four floors of flats sitting on a car park, and the car park is gone. The
  // floors above it are undamaged, which is the lesson: the failure went where
  // the stiffness stopped.
  {
    const bx = -56, bz = 62, by = y(bx, bz);
    const shell = MATERIALS.paintedSteel(0xa8a091);
    box(scene, 22, 10.5, 14, bx, by + 6.1, bz, shell);           // the intact block
    for(let f = 1; f < 4; f++){
      box(scene, 22.4, 0.4, 14.4, bx, by + 0.85 + f * 3.1, bz, MATERIALS.paintedSteel(0x8a836f));
    }
    // The collapsed level: a metre of slab where three metres of car park were,
    // with the columns lying under it.
    box(scene, 22, 0.9, 14, bx, by + 0.45, bz, MATERIALS.paintedSteel(0x9b9790));
    for(let i = 0; i < 6; i++){
      const cx = bx - 9 + i * 3.6;
      box(scene, 0.5, 0.5, 3.2, cx, by + 0.25, bz + 6.4, MATERIALS.paintedSteel(0x8d8a82), 1.3 + i * 0.2);
    }
    colliders.push(new THREE.Box3(
      new THREE.Vector3(bx - 12, by, bz - 8), new THREE.Vector3(bx + 12, by + 11, bz + 8)));
    placard(scene, bx, bz + 8, by, PLACARD.red, 0);
  }

  // ================================================== the wharf, moved seaward
  // Lateral spreading: the quay edge slid toward the water and left cracks
  // parallel to the shore behind it, so the gangway no longer reaches.
  {
    const qz = 176;
    box(scene, 220, 1.4, 22, 0, y(0, qz) + 0.3, qz, MATERIALS.paintedSteel(0x8f8b80));
    // Tension cracks behind the edge, widening toward the water.
    for(let i = 0; i < 5; i++){
      const z = qz - 14 - i * 5;
      box(scene, 150 - i * 14, 0.1, 0.5 + (5 - i) * 0.18, -8, y(0, z) + 0.36, z,
        MATERIALS.paintedSteel(0x3f3b34), 0.02 * i);
    }
    // Bollards, one of them pulled over with the ground.
    for(let i = 0; i < 7; i++){
      const bx = -66 + i * 22;
      cyl(scene, 0.42, 1.1, bx, y(bx, qz + 6) + 0.85, qz + 6, MATERIALS.paintedSteel(0x54504a));
    }
    // Containers thrown off a stack.
    for(const [cx, cz, rot] of [[-40, 158, 0.1], [-32, 152, 0.9], [-46, 150, 0.35], [-22, 160, 1.4]]){
      crateStack(scene, cx, cz, y(cx, cz), { rows: 1, colour: [0x9a5a3a, 0x3a6a7a, 0x7a7a4a][(cx + 60) % 3] });
    }
    sign(scene, 'PORT — CLOSED', { x: 8, z: 150, y: y(8, 150) + 2.4, facing: Math.PI,
      sub: 'Quay moved 2.1 m — no craneage', accent: 0xb3342a });
  }

  // ======================================================== the incident base
  // A car park with the response in it: containers, a marquee, a generator, a
  // water bowser, and the board everybody argues in front of.
  {
    const cx = 0, cz = 30;
    for(let i = 0; i < 4; i++){
      const x = -34 + i * 9, z = cz + 22;
      crateStack(scene, x, z, y(x, z), { rows: 1, colour: 0x5f6a55 });
    }
    tank(scene, 26, cz + 24, y(26, cz + 24), { r: 1.5, h: 3.0, colour: 0x8a8f92 });
    // Generator, and the emissive floodlight head it feeds. No real lights: the
    // ceiling is six and the sun rig has three of them.
    box(scene, 3.2, 1.8, 1.6, 34, y(34, cz + 24) + 0.9, cz + 24, MATERIALS.paintedSteel(0x6c6f63));
    const head = box(scene, 1.4, 0.5, 0.35, 34, y(34, cz + 24) + 4.6, cz + 22.6,
      new THREE.MeshStandardMaterial({ color: 0xb9b39a, emissive: new THREE.Color(0xffedc0),
        emissiveIntensity: 0.8, roughness: 0.8 }));
    glow(head);
    cyl(scene, 0.1, 4.4, 34, y(34, cz + 24) + 2.2, cz + 22.6, MATERIALS.paintedSteel(0x55584f));

    const b = displayBoard(scene, -16, cz + 18, y(-16, cz + 18), {
      facing: 0, title: 'PLACARDS TODAY', tint: 0xd8a02a });
    soft(b.soft); glow(b.screen);
    interactables.push({
      mesh: b.screen, type: 'info', id: 'BOARD_PLACARDS',
      prompt: 'E — Read the placard tally',
    });

    // Helipad, because the hospital decision means moving people.
    box(scene, 18, 0.08, 18, 74, y(74, cz + 40) + 0.05, cz + 40, MATERIALS.paintedSteel(0x5b5f57));
    box(scene, 2.0, 0.1, 7.0, 74, y(74, cz + 40) + 0.11, cz + 40, MATERIALS.paintedSteel(0xd9d2c0));
    box(scene, 6.0, 0.1, 2.0, 74, y(74, cz + 40) + 0.11, cz + 40, MATERIALS.paintedSteel(0xd9d2c0));
  }

  // ============================================ the bridge that dropped a span
  // A deck off its bearings over the creek, and a truck stopped short of the
  // gap. Nothing else on this map says "the ground moved" at this scale.
  {
    const bz = 112, by = y(0, bz);
    // Abutments and the pier that stayed.
    for(const bx of [-26, 26]) box(scene, 9, 5.0, 14, bx, by + 2.5, bz, MATERIALS.paintedSteel(0x8b857a));
    box(scene, 4, 4.6, 10, 0, by + 2.3, bz, MATERIALS.paintedSteel(0x8b857a));
    // The span that held, and the one that did not — dropped at one end and
    // resting on the pier at the other.
    box(scene, 24, 0.9, 12, -14, by + 5.3, bz, MATERIALS.paintedSteel(0x9a958c));
    const drop = new THREE.Group();
    const deck = new THREE.Mesh(new THREE.BoxGeometry(24, 0.9, 12), MATERIALS.paintedSteel(0x9a958c));
    deck.position.set(0, 0, 0);
    drop.add(deck);
    drop.position.set(15, by + 3.6, bz);
    drop.rotation.z = -0.16;
    scene.add(drop);
    // Bearings and a rail hanging over the gap.
    for(let i = 0; i < 5; i++) box(scene, 0.5, 0.5, 0.5, 2 + i * 0.9, by + 5.1 - i * 0.35, bz - 5.6,
      MATERIALS.paintedSteel(0x50564f), i * 0.3);
    vehicle(scene, -32, bz + 1, y(-32, bz + 1), { facing: Math.PI / 2, colour: 0x9c6b3a });
    sign(scene, 'BRIDGE CLOSED', { x: -34, z: bz + 10, y: y(-34, bz + 10) + 2.3, facing: 0,
      sub: 'Span dropped — no detour south of Bay Road', accent: 0xb3342a });
    fenceRun(scene, { x0: -30, z0: bz + 8, x1: 30, z1: bz + 8, y: by, height: 1.3 });
  }

  // =================================================== the rail, bent seaward
  // Lateral spreading at a hundred metres: the ground crept toward the water and
  // took the track with it, so a straight line is now an S.
  {
    const z0 = 150;
    for(let i = 0; i < 40; i++){
      const t = i / 39;
      const rx = -150 + t * 300;
      const bend = Math.sin(t * Math.PI * 2) * 5.2 * Math.sin(t * Math.PI);
      const rz = z0 + bend;
      const ang = Math.atan2(Math.cos(t * Math.PI * 2) * 5.2 * 0.02, 1);
      for(const off of [-0.72, 0.72]){
        box(scene, 8.2, 0.16, 0.14, rx, y(rx, rz) + 0.28, rz + off,
          MATERIALS.paintedSteel(0x6b5f52), ang);
      }
      box(scene, 1.0, 0.16, 2.4, rx, y(rx, rz) + 0.16, rz, MATERIALS.paintedSteel(0x5a5348), ang);
    }
  }

  // ======================================================= where people sleep
  // Four hundred households are named on nearly every card and the map has never
  // shown one of them. Numbered rows in the park, a bowser, and a queue.
  {
    const px = 96, pz = 60;
    for(let r = 0; r < 4; r++){
      for(let c = 0; c < 7; c++){
        const tx = px + c * 6.4, tz = pz + r * 8.2;
        tent(scene, tx, tz, y(tx, tz), { facing: 0, colour: [0xb9b2a2, 0xa9a294, 0xc0b9a8][(r + c) % 3] });
      }
      sign(scene, `ROW ${r + 1}`, { x: px - 5.5, z: pz + r * 8.2, y: y(px - 5.5, pz + r * 8.2) + 1.7,
        w: 1.8, h: 0.8, facing: -Math.PI / 2, accent: 0x2f6f8f });
    }
    tank(scene, px + 46, pz + 12, y(px + 46, pz + 12), { r: 1.4, h: 2.6, colour: 0x7f8f96 });
    for(let i = 0; i < 6; i++) post(scene, px + 42 + i * 1.4, pz + 16, y(px + 42, pz + 16), 1.0, 0.06, 0x8f8778);
    sign(scene, 'WELFARE CENTRE', { x: px + 14, z: pz - 7, y: y(px + 14, pz - 7) + 2.4, facing: 0,
      sub: 'Registration · water · overnight beds', accent: 0x2f8f7a });
  }

  // ================================================== work, not just aftermath
  // Three days in, a town is busy. A crane over the Parade, a skip, spoil, and
  // the ladders the assessors are actually standing on.
  {
    const cx = -60, cz = -46, cy = y(cx, cz);
    cyl(scene, 0.9, 26, cx, cy + 13, cz, MATERIALS.paintedSteel(0xc4531f));
    box(scene, 30, 0.9, 1.4, cx + 9, cy + 25.4, cz, MATERIALS.paintedSteel(0xc4531f));
    box(scene, 1.2, 6.0, 1.2, cx + 21, cy + 21.8, cz, MATERIALS.paintedSteel(0x4a4740));
    box(scene, 6, 2.4, 3, cx - 8, cy + 1.2, cz, MATERIALS.paintedSteel(0x6f6656));      // counterweight
    // Skip, spoil, and a stack of props waiting to go in.
    box(scene, 6.2, 2.0, 2.6, cx + 16, cy + 1.0, cz + 9, MATERIALS.paintedSteel(0xb06a2a));
    for(let i = 0; i < 7; i++) box(scene, 5, 0.24, 0.24, cx + 12, cy + 0.2 + i * 0.26, cz + 14,
      MATERIALS.paintedSteel(0x8a7350), 0.05 * i);
    for(let i = 0; i < 4; i++){
      const lx = cx + 26 + i * 3;
      box(scene, 0.4, 5.4, 0.12, lx, cy + 2.7, cz - 8, MATERIALS.paintedSteel(0xd8cfae), 0.12);
    }
  }

  // ================================================= what the town looks like
  // Door codes and taped windows on everything the assessors have reached, which
  // is the visual language of a placarded town and the cheapest thing here.
  {
    const marks = [
      [-74, -22, 0, '09/03  AW', '#b3342a'], [-74, -46, 0, '09/03  AW', '#b3342a'],
      [-30, -96, 0, '10/03  MO', '#d8a02a'], [44, -60, 0, '10/03  MO', '#3f8f56'],
      [-52, -60, 0, '09/03  AW', '#3f8f56'], [74, 26, Math.PI / 2, '11/03  AW', '#3f8f56'],
      [8, 152, Math.PI, '10/03  MO', '#d8a02a'], [-6, -8, 0, '11/03  MO', '#d8a02a'],
    ];
    for(const [mx, mz, f, t, c] of marks) doorCode(scene, { x: mx, z: mz, y: y(mx, mz), facing: f, text: t, colour: c });
    // Tape across the windows of the worst terrace.
    for(let i = 0; i < 9; i++){
      const wx = -104 + i * 13;
      for(const s2 of [-1, 1]) box(scene, 3.2, 0.06, 0.06, wx, y(wx, 128) + 2.6, 123.6,
        MATERIALS.paintedSteel(0xd8cfae), s2 * 0.62);
    }
  }

  // ============================================ the clock, stopped at 04:12
  {
    const kx = -30, kz = -104, ky = y(kx, kz);
    // The top third came down into the yard beside it.
    for(let i = 0; i < 22; i++){
      const bx = kx + 7 + (i % 5) * 1.3, bz = kz + 5 + Math.floor(i / 5) * 1.2;
      box(scene, 0.5, 0.22, 0.24, bx, y(bx, bz) + 0.11 + (i % 3) * 0.2, bz,
        MATERIALS.paintedSteel(0x9a6b52), i * 0.6);
    }
    const face = new THREE.Mesh(new THREE.CircleGeometry(1.5, 20),
      new THREE.MeshStandardMaterial({ color: 0xe6dfcc, roughness: 0.9 }));
    face.position.set(kx, ky + 11.6, kz + 6.1);
    scene.add(face);
    // Hands at 04:12, which is when it stopped.
    box(scene, 0.9, 0.09, 0.06, kx + 0.35, ky + 11.75, kz + 6.2, MATERIALS.paintedSteel(0x2f2b26), 0);
    box(scene, 1.25, 0.08, 0.06, kx - 0.3, ky + 11.25, kz + 6.2, MATERIALS.paintedSteel(0x2f2b26), 1.05);
  }

  // ====================================== the lights, because there is no grid
  // Emissive only. Six real lights is the ceiling and the sun rig has three.
  {
    const lamps = [
      [-40, 46], [-24, 40], [0, -34], [-52, -56], [40, -62], [96, 56], [8, 146],
    ];
    for(const [lx, lz] of lamps){
      const ly = y(lx, lz);
      cyl(scene, 0.12, 5.2, lx, ly + 2.6, lz, MATERIALS.paintedSteel(0x55584f));
      const head = box(scene, 1.6, 0.5, 0.4, lx, ly + 5.3, lz,
        new THREE.MeshStandardMaterial({ color: 0xb9b39a, emissive: new THREE.Color(0xffedc0),
          emissiveIntensity: 0.9, roughness: 0.8 }));
      glow(head);
    }
    // One lit building in a dark town: the hospital never closed.
    for(let f = 0; f < 3; f++){
      const w = box(scene, 38, 1.0, 0.3, -6, y(-6, -18) + 3.4 + f * 3.4, -28.2,
        new THREE.MeshStandardMaterial({ color: 0x2c2e30, emissive: new THREE.Color(0xffe6b4),
          emissiveIntensity: 0.85, roughness: 0.9 }));
      glow(w);
    }
  }

  // ================================================= silt over half the town
  // The Flats are grey with dried ejecta and Upper Town is not. Large, very flat
  // decals rather than a second terrain material, which the engine does not have.
  {
    for(let i = 0; i < 14; i++){
      const sx = -140 + i * 21, sz = 96 + Math.sin(i * 1.7) * 26;
      box(scene, 26 + (i % 3) * 8, 0.03, 30 + (i % 4) * 6, sx, y(sx, sz) + 0.02, sz,
        MATERIALS.paintedSteel(0x8e8778), i * 0.2);
    }
  }

  // ================================================ the ground, everywhere
  // The scarp and the sand boils are the *evidence*; this is the damage. Cracks
  // run out from the two things that moved — the rupture and the old creek —
  // rather than being scattered, because scattered cracking reads as texture
  // and a network reads as a town that was shaken.
  {
    // Off the rupture, both sides, fanning south.
    for(let i = 0; i < 18; i++){
      const t = i / 17;
      const cx = -170 + t * 300, cz = -34 + Math.sin(i * 1.7) * 46;
      crackRun(scene, y, { x: cx, z: cz, ang: 1.2 + Math.sin(i * 2.1) * 0.9,
        len: 16 + (i % 4) * 9, width: 4.5 + (i % 3) * 1.5, seed: 101 + i * 7 });
    }
    // The Flats, where the fill spread toward the water: cracks open roughly
    // parallel to the shore, which is what lateral spreading leaves behind.
    for(let i = 0; i < 22; i++){
      const cx = -150 + i * 14, cz = 74 + Math.sin(i * 0.9) * 34;
      crackRun(scene, y, { x: cx, z: cz, ang: 1.57 + Math.sin(i * 1.3) * 0.35,
        len: 22 + (i % 5) * 8, width: 5.5 + (i % 4) * 1.4, seed: 401 + i * 11 });
    }
    // And through the streets themselves, across the kerb lines.
    for(const [cx, cz, a] of [
      [-40, 44, 0.2], [22, 44, 2.9], [-70, 52, 1.1], [58, 50, 1.9],
      [-12, 116, 0.4], [40, 122, 2.6], [-92, 88, 1.4], [86, 104, 0.7],
      [-64, -18, 2.2], [30, -22, 0.9], [-30, -78, 1.8], [56, -44, 2.4],
    ]) crackRun(scene, y, { x: cx, z: cz, ang: a, len: 30, width: 6, seed: cx * 3 + cz });

    // The buildings crack too, and worse on the fill than on the granite.
    crackFacades(scene, y);
  }

  // ======================================================= holes in the ground
  // Fill that liquefied, ran out from under a street and left the street with
  // nothing to sit on. Every one on the Flats has found the water table.
  {
    const holes = [
      { x: -18, z: 74, r: 4.6, ponded: true,  cordon: true },
      { x: 30, z: 100, r: 5.2, ponded: true,  cordon: true },
      { x: -88, z: 106, r: 3.6, ponded: true },
      { x: 66, z: 74, r: 4.0, ponded: true },
      { x: -52, z: 138, r: 4.8, ponded: true },
      { x: 108, z: 96, r: 3.2, ponded: true },
      // Upper Town, on rock: no water, and these are cellars and services
      // rather than liquefaction — smaller, and with square edges to them.
      { x: -40, z: -56, r: 3.0 },
      { x: 20, z: -60, r: 2.4 },
      { x: -84, z: -74, r: 2.6 },
    ];
    for(const h of holes){
      soft(sinkhole(scene, y, { x: h.x, z: h.z, r: h.r, seed: h.x * 5 + h.z, ponded: h.ponded }));
      if(!h.cordon) continue;
      // Cones and tape, because a hole in a live street is somebody's decision
      // and this game is about who made it.
      for(let i = 0; i < 8; i++){
        const t = i / 8 * Math.PI * 2;
        const cx = h.x + Math.cos(t) * (h.r + 2.2), cz = h.z + Math.sin(t) * (h.r + 2.2);
        cyl(scene, 0.32, 0.72, cx, y(cx, cz) + 0.36, cz, MATERIALS.paintedSteel(0xc4531f), 0.15);
      }
    }
    // Smaller punctures where a service trench collapsed. No cordon and no
    // collider: they are ankle-deep, and a soft collider on every one of them
    // turns a walk down Bay Road into an obstacle course.
    for(const [px, pz] of [[12, 40], [-26, 36], [44, 62], [-6, 132], [72, 46], [-70, 118]]){
      sinkhole(scene, y, { x: px, z: pz, r: 1.3, seed: px * 9 + pz, ponded: pz > 40 });
    }
  }

  // ================================================== what did not stay put
  // Three days on, nobody has righted any of it. A car on its roof is the one
  // object that tells a player the shaking was violent rather than long.
  {
    // Two cars in the Flats: one flipped by the ground going out from under it,
    // one shoved onto its side against a kerb.
    tumble(scene, { x: -14, z: 84, y: y(-14, 84), yaw: 0.8, roll: Math.PI * 0.97, lift: 2.66 },
      g => vehicle(g, 0, 0, 0, { facing: 0, colour: 0x9c4034, box: false }));
    soft({ x: -14, z: 84, r: 3.0 });
    tumble(scene, { x: 36, z: 70, y: y(36, 70), yaw: 2.1, roll: Math.PI * 0.55, lift: 1.34 },
      g => vehicle(g, 0, 0, 0, { facing: 0, colour: 0x6f7d8a, box: false }));
    soft({ x: 36, z: 70, r: 3.0 });

    // A bus on its side, laid along Bay Road rather than across it — a bus
    // across a road the player has to walk is a wall with no way round.
    tumble(scene, { x: -26, z: 44, y: y(-26, 44), yaw: 1.46, roll: Math.PI / 2, lift: 1.36 },
      g => bus(g, 0x3f6f7a));
    colliders.push(new THREE.Box3(
      new THREE.Vector3(-32, y(-26, 44), 41.6), new THREE.Vector3(-20, y(-26, 44) + 2.7, 46.6)));

    // The container stack at the port, off the stack. One on its side, one on
    // its end, one nose-down over the quay edge.
    tumble(scene, { x: -50, z: 162, y: y(-50, 162), yaw: 0.4, roll: Math.PI / 2, lift: 1.3 },
      g => container(g, 0x9a5a3a));
    tumble(scene, { x: -58, z: 152, y: y(-58, 152), yaw: 1.1, roll: Math.PI / 2 + 0.35, lift: 1.5 },
      g => container(g, 0x3a6a7a));
    tumble(scene, { x: -30, z: 168, y: y(-30, 168), yaw: 2.3, pitch: 0.9, lift: 0.9 },
      g => container(g, 0x7a7a4a));
    for(const [sx, sz] of [[-50, 162], [-58, 152], [-30, 168]]) soft({ x: sx, z: sz, r: 3.4 });

    // A water tank off its stand and rolled, at the base camp. The stand is
    // still there, which is what makes it read as fallen rather than as stored.
    tumble(scene, { x: 44, z: 66, y: y(44, 66), yaw: 0.7, roll: Math.PI / 2, lift: 1.5 },
      g => tank(g, 0, 0, 0, { r: 1.5, h: 3.0, colour: 0x8a8f92 }));
    soft({ x: 44, z: 66, r: 2.6 });
    for(const o of [-0.9, 0.9]) post(scene, 40 + o, 66, y(40, 66), 0.9, 0.09, 0x6c6f63);

    // A lamp column down beside Kestrel Street, out of the carriageway, with the
    // head smashed at the far end of it.
    tumble(scene, { x: -10, z: 22, y: y(-10, 22), yaw: 1.15, pitch: Math.PI / 2, lift: 0.14 },
      (g) => {
        cyl(g, 0.12, 5.2, 0, 2.6, 0, MATERIALS.paintedSteel(0x55584f));
        box(g, 1.6, 0.5, 0.4, 0, 5.3, 0, MATERIALS.paintedSteel(0x4a4740));
      });
    soft({ x: -10, z: 22, r: 1.4 });

    // Scaffold that came down off the Parade, in a heap. Tubes lying every way
    // is the shape of collapsed staging, and a neat stack is not.
    {
      const hx = -58, hz = -26, hy = y(hx, hz);
      const r2 = rng(77);
      for(let i = 0; i < 26; i++){
        const a = r2() * 3.14;
        const tx = hx + (r2() - 0.5) * 7, tz = hz + (r2() - 0.5) * 6;
        const g = new THREE.Group();
        cyl(g, 0.05, 2.4 + r2() * 2.6, 0, 0, 0, MATERIALS.steel());
        g.position.set(tx, hy + 0.12 + (i % 4) * 0.14, tz);
        g.rotation.set(Math.PI / 2 + (r2() - 0.5) * 0.5, a, (r2() - 0.5) * 0.4);
        scene.add(g);
      }
      soft({ x: hx, z: hz, r: 4.2 });
    }

    // A chimney stack that came over whole and is lying in the yard beside the
    // clock tower, still in courses.
    {
      const cx = -22, cz = -96, cy = y(cx, cz);
      for(let i = 0; i < 9; i++){
        box(scene, 1.5, 1.5, 1.1, cx + i * 1.05, cy + 0.75, cz + i * 0.22,
          MATERIALS.paintedSteel(0x8f6a55), 0.2 + i * 0.02);
      }
      soft({ x: cx + 4, z: cz + 1, r: 3.0 });
    }

    // Street furniture and stores, turned over where they stood: crates off
    // their pallets at the base camp, bins down the length of Bay Road, and the
    // welfare park's own kit tipped in the first aftershock.
    tumble(scene, { x: -30, z: 58, y: y(-30, 58), yaw: 0.5, roll: Math.PI / 2 + 0.2, lift: 0.9 },
      g => crateStack(g, 0, 0, 0, { rows: 1, colour: 0x5f6a55 }));
    tumble(scene, { x: -22, z: 60, y: y(-22, 60), yaw: 2.4, roll: -Math.PI / 2, lift: 0.9 },
      g => crateStack(g, 0, 0, 0, { rows: 1, colour: 0x5f6a55 }));
    for(const [bx, bz, a] of [[16, 42, 1.2], [-44, 46, 2.6], [64, 44, 0.4], [92, 58, 1.9]]){
      tumble(scene, { x: bx, z: bz, y: y(bx, bz), yaw: a, roll: Math.PI / 2, lift: 0.36 },
        g => { cyl(g, 0.34, 0.95, 0, 0.475, 0, MATERIALS.paintedSteel(0x4a5b6e)); });
    }
    for(const [bx, bz, a] of [[104, 92, 0.8], [126, 88, 2.2]]){
      tumble(scene, { x: bx, z: bz, y: y(bx, bz), yaw: a, roll: Math.PI * 0.62, lift: 0.5 },
        (g) => {
          box(g, 1.9, 0.1, 0.5, 0, 0.44, 0, MATERIALS.paintedSteel(0x8a7050));
          for(const s of [-0.7, 0.7]) box(g, 0.12, 0.44, 0.44, s, 0.22, 0, MATERIALS.paintedSteel(0x6f6656));
        });
    }
  }

  // ===================================================== holes in the walls
  // Where a floor came through a wall, or a parapet went in rather than out.
  {
    // The Parade, above the shored front. Its site row is 30 x 12 turned a
    // quarter, so the street face is at x = -68 and not where its own props sit.
    wallHole(scene, y, { x: -67.85, z: -28, y: y(-67.85, -28) + 4.2, facing: Math.PI / 2,
      w: 2.6, h: 2.2, seed: 11 });
    // The soft storey block, where the collapsing car park took the wall with it.
    wallHole(scene, y, { x: -44.8, z: 66, y: y(-44.8, 66) + 3.4, facing: Math.PI / 2,
      w: 3.0, h: 1.8, seed: 12 });
    // Marina Court's low side, where the raft tipped and the ground floor is
    // now half a metre into the mud.
    wallHole(scene, y, { x: 68, z: 140.4, y: y(68, 140.4) + 2.4, facing: 0,
      w: 2.4, h: 2.0, seed: 13 });
  }

  // ===================================================== smoke, dust and haze
  // Three days of pulverised masonry that has not settled, two fires nobody has
  // got to yet, and the dust of the clearing work itself. Sprites: smoke has to
  // face the camera from wherever the player stands, and it has to move.
  {
    // A shop on the Parade that burned out and is still going.
    smokeColumn(scene, { x: -66, z: -40, y: y(-66, -40) + 6.0, height: 26, r: 3.4,
      count: 14, tint: 0x4f4941, opacity: 0.34, lean: 7, speed: 0.045, seed: 3 });
    // The container yard at the port.
    smokeColumn(scene, { x: -36, z: 156, y: y(-36, 156) + 2.4, height: 30, r: 3.8,
      count: 14, tint: 0x5a5249, opacity: 0.3, lean: 9, speed: 0.04, seed: 5 });
    // A car still smouldering in the Flats, and the generator at base camp:
    // both thin, because a thin column at a known object is what tells the eye
    // the big ones are smoke rather than cloud.
    smokeColumn(scene, { x: 24, z: 86, y: y(24, 86) + 1.4, height: 12, r: 1.5,
      count: 9, tint: 0x6a625a, opacity: 0.26, lean: 3, speed: 0.07, seed: 7 });
    smokeColumn(scene, { x: 34, z: 54, y: y(34, 54) + 2.0, height: 9, r: 0.9,
      count: 7, tint: 0x7d7871, opacity: 0.2, lean: 2, speed: 0.09, seed: 9 });
    // Dust off the two places being worked: the crane over the Parade, and the
    // collapsed level on Bay Road. Paler, slower and much lower than a fire.
    smokeColumn(scene, { x: -60, z: -46, y: y(-60, -46) + 1.0, height: 14, r: 3.6,
      count: 9, tint: 0xa89c8a, opacity: 0.18, lean: 5, speed: 0.03, seed: 11 });
    smokeColumn(scene, { x: -56, z: 70, y: y(-56, 70) + 1.0, height: 11, r: 3.2,
      count: 8, tint: 0xa89c8a, opacity: 0.16, lean: 4, speed: 0.025, seed: 13 });

    // And the air itself. Low sheets drifting across the districts — the fog in
    // `look` carries the distance haze, and this is the part of it that moves
    // past you at head height.
    dustDrift(scene, y, { x: 0, z: 92, w: 300, d: 80, count: 12, r: 30,
      tint: 0xafa593, opacity: 0.13, speed: 0.010, seed: 21 });
    dustDrift(scene, y, { x: 0, z: -46, w: 260, d: 70, count: 8, r: 26,
      tint: 0xa79d8c, opacity: 0.10, speed: 0.013, seed: 23 });
    dustDrift(scene, y, { x: 0, z: 158, w: 280, d: 50, count: 7, r: 28,
      tint: 0xb2a897, opacity: 0.11, speed: 0.008, seed: 25 });
  }

  // ============================================== placards on the landmarks
  // The wayfinding and the story in one object. Green on the school, yellow on
  // the hospital — the decision the fortnight turns on is that yellow.
  {
    placard(scene, -6, -8, y(-6, -8), PLACARD.yellow, 0);
    placard(scene, 74, 27, y(74, 27), PLACARD.green, Math.PI / 2);
    placard(scene, 8, 154, y(8, 154), PLACARD.yellow, Math.PI);
  }
}

export default decorate;

// Kestrel Bay is outdoors, so the interior fit-out hooks do nothing. They have
// to exist: the manifest exports the same three names whichever world it is
// wired to, and a props file without them kills the world with a SyntaxError
// about a missing export.

// ------------------------------------------------------------------ transport
/**
 * The incident base's two vehicles.
 *
 * Day 4's card reads "the van is signed out to reach them. Drive the route
 * once…", and until now nothing on this site could be driven — the card
 * promised a run the world did not have.
 *
 * Two kinds because the scarp is the whole game. The van has Bay Road and the
 * granite bench, which is the half of Kestrel Bay that still has a road surface.
 * The quad is what gets down the 1.8 m scarp onto liquefied fill, where a van
 * with a rear axle is a van being dug out — and that is exactly the distinction
 * the far tier exists to teach.
 */
function transport(scene, ctx, y){
  const { colliders, interactables, blocked } = ctx;
  const spawn = { x: 0, z: 56, r: 13 };

  const vs = clearSpot({ x: -14, z: 46 }, blocked, { pad: 3.4, avoid: [spawn] });
  const van = vehicle(scene, vs.x, vs.z, y(vs.x, vs.z),
    { facing: Math.PI, colour: 0xd8d3c4 });
  driveable(scene, van.group, {
    ...VEHICLE_DRIVE,
    id: 'assessment-van', label: 'assessment van', kind: 'van',
    seat: { x: 0.52, y: 2.18, z: van.cabZ },
    wheels: van.wheels,
    colliders, interactables,
  });

  const qs = clearSpot({ x: 14, z: 44 }, blocked,
    { pad: 1.8, avoid: [spawn, { x: vs.x, z: vs.z, r: 5 }] });
  const q = quadBike(scene, qs.x, qs.z, y(qs.x, qs.z),
    { facing: Math.PI, colour: 0xd8a02a });
  driveable(scene, q.group, {
    ...QUAD_DRIVE,
    id: 'fill-quad', label: 'fill quad', kind: 'quad',
    wheels: q.wheels, steer: q.steer,
    colliders, interactables,
  });
}

export function fitOutRoom(){}
export function fitOutSpine(){}
