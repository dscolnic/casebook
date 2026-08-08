// npcs.js — the population of the Hill.
//
// Two tiers. The 27 historic figures carry full rigs, nameplates and dialogue;
// roughly forty anonymous extras carry a cheaper rig and no interaction, which
// is what makes the place read as a town of thousands rather than a cast list.
//
// Nobody wanders at random. Everyone moves between hand-placed spots inside
// their own zone, so no NPC ever tries to walk through the Tech Area wire.
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { scene, colliders, interactables } from './world.js';
import { camera } from './player.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import { CHARACTER_DIVISION } from './simulation.js';
import { getState } from './gameState.js';
import { srand, srandRange, terrainHeight } from './env.js';

let npcs = [];        // historic figures — interactive
let extras = [];      // anonymous population — decorative
let npcGroup = null;

const NOMINAL_H = 1.775;   // height of the rig as modelled, in metres

// --------------------------------------------------------------- appearance
// Wartime Los Alamos dress: work shirts and suspenders, Army khaki and olive,
// WAC uniforms, lab coats, house dresses, wool sweaters against the altitude.
const OUTFITS = [
  { top: 0xe6e2d6, bottom: 0x3a3a40, name: 'white shirt' },
  { top: 0x7f92a8, bottom: 0x34383c, name: 'work shirt' },
  { top: 0xa89571, bottom: 0x9c8a68, name: 'Army khaki' },
  { top: 0x4a5136, bottom: 0x434a31, name: 'olive drab' },
  { top: 0xe2e0d6, bottom: 0x4a4a4a, name: 'lab coat' },
  { top: 0x8f6a72, bottom: 0x8f6a72, name: 'house dress' },
  { top: 0x8a5a44, bottom: 0x4a4238, name: 'plaid' },
  { top: 0x6a6252, bottom: 0x3c3830, name: 'sweater' },
  { top: 0x59606b, bottom: 0x3a3f46, name: 'suit' },
  { top: 0x3f4a52, bottom: 0x3f4a52, name: 'WAC service' },
];
const SKIN = [0xf0cfae, 0xe3b48c, 0xc99167, 0xa9714a, 0x7d5033, 0x5c3a24];
const HAIR = [0x2a1d12, 0x3f2a17, 0x6b4a22, 0x8a7a5a, 0x9a9a95, 0x1a1512];

// One material per distinct colour, shared across every body that uses it.
const matCache = new Map();
function mat(hex, rough = 0.88){
  const key = `${hex}_${rough}`;
  let m = matCache.get(key);
  if(!m){
    // envMapIntensity matches the damping world.js applies to matte surfaces,
    // so people sit in the same light as the buildings behind them.
    m = new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0, envMapIntensity: 0.40 });
    matCache.set(key, m);
  }
  return m;
}

// Geometry is built once and shared; only transforms differ per person.
const G = {
  // A tapered, rounded torso instead of a slab: a hard box the same width as
  // the arms made every figure read as a white carton with sticks beside it.
  torso: new THREE.CylinderGeometry(0.235, 0.205, 0.60, 12).scale(1, 1, 0.56),
  hips:  new THREE.CylinderGeometry(0.20, 0.185, 0.18, 12).scale(1, 1, 0.60),
  collar:new THREE.BoxGeometry(0.30, 0.07, 0.045),
  head:  new THREE.SphereGeometry(0.115, 14, 12),
  arm:   new THREE.CapsuleGeometry(0.052, 0.50, 3, 7),
  // Leg runs the full hip-to-ankle distance; the old 0.52 capsule left a
  // visible gap between shin and shoe.
  leg:   new THREE.CapsuleGeometry(0.075, 0.70, 3, 7),
  shoe:  new THREE.BoxGeometry(0.15, 0.09, 0.27),
  badge: new THREE.BoxGeometry(0.09, 0.11, 0.012),
  hatCrown: new THREE.CylinderGeometry(0.125, 0.135, 0.15, 12),
  hatBrim:  new THREE.CylinderGeometry(0.245, 0.245, 0.022, 14),
  capCrown: new THREE.SphereGeometry(0.128, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
  capPeak:  new THREE.BoxGeometry(0.24, 0.02, 0.11),
};

// ——— walk cycle ———————————————————————————————————————————————————————
// Ported from gamekit/engine/people/rig.js. The old gait swung the legs by an
// amplitude proportional to speed while advancing the body by a fixed 0.74 m
// stride, so the feet travelled about twice as far as the ground did and the
// walk read as pedalling on the spot. Everything here derives from one
// identity: at heel strike the feet are 2·L·sin(A) apart, and that is one step.
const LEG_LENGTH = 0.84;                 // hip pivot to sole, nominal scale
function strideFor(speed){
  const step = Math.min(0.80, Math.max(0.30, 0.42 + 0.30 * speed));
  const swing = Math.asin(Math.min(0.95, step / (2 * LEG_LENGTH)));
  return { step, swing, cycleDistance: 2 * step };
}
function gaitAdvance(speed, delta){
  return (speed * delta / strideFor(speed).cycleDistance) * Math.PI * 2;
}
/** Returns the vertical offset: the pelvis DROPS when the legs are apart. */
function applyGait(body, phase, speed){
  const { swing } = strideFor(speed);
  const lead = Math.sin(phase);
  body.userData.limbs.forEach(l => {
    const opposed = l.userData.side === -1 ? lead : -lead;
    if(l.userData.isLeg){
      const theta = opposed * swing;
      l.rotation.x = theta;
      // Straight at heel strike and toe-off, flexed through mid-swing so the
      // foot clears the ground. The old max(0, -theta) bent it at full
      // extension, which is the opposite of a stride.
      const swingPhase = l.userData.side === -1 ? phase : phase + Math.PI;
      const bend = Math.max(0, -Math.cos(swingPhase));
      if(l.userData.knee) l.userData.knee.rotation.x = bend * 1.15;
      if(l.userData.shoe) l.userData.shoe.rotation.x = -theta - bend * 1.15 * 0.55;
    } else {
      l.rotation.x = -opposed * swing * 0.55;
    }
  });
  if(body.userData.torso) body.userData.torso.rotation.y = -lead * 0.10;
  if(body.userData.head) body.userData.head.rotation.y = lead * 0.05;
  return -LEG_LENGTH * (1 - Math.cos(swing)) * Math.abs(lead);
}

// ——— faces ————————————————————————————————————————————————————————————
// There were none, which is most of why a walking person read as a mannequin:
// with no eyes there is nothing to say which way someone is looking, so a body
// turning to face its direction of travel communicates nothing.
const FACE_GEO = {
  eye:   new THREE.SphereGeometry(0.017, 8, 6),
  nose:  new THREE.BoxGeometry(0.026, 0.042, 0.032),
  mouth: new THREE.BoxGeometry(0.046, 0.010, 0.013),
};
const FACE = [
  { geo: 'eye',   at: [-0.040,  0.020, 0.112], tint: 'eye' },
  { geo: 'eye',   at: [ 0.040,  0.020, 0.112], tint: 'eye' },
  // No brows: the hair cap's rim sits at head-local y ≈ 0.022, level with the
  // top of the eyes, so a brow is covered on every character who has hair. An
  // invisible mesh on 49 people is pure cost.
  { geo: 'nose',  at: [ 0.000, -0.006, 0.124], tint: 'skin' },
  { geo: 'mouth', at: [ 0.000, -0.058, 0.112], tint: 'mouth' },
];
function faceTints(look){
  const dim = (hex, f) => { const c = new THREE.Color(hex); c.multiplyScalar(f); return c.getHex(); };
  return { eye: 0x241c17, hair: look.hair, skin: dim(look.skin, 0.94), mouth: dim(look.skin, 0.62) };
}
/** Face parented to the head, counter-scaled so the head stretch never smears it. */
function addFace(head, look, matFor){
  const face = new THREE.Group();
  face.scale.set(1, 1 / 1.26, 1 / 1.06);
  const tints = faceTints(look);
  for(const part of FACE){
    const m = new THREE.Mesh(FACE_GEO[part.geo], matFor(tints[part.tint], part.tint === 'eye' ? 0.35 : 0.85));
    m.position.set(part.at[0], part.at[1], part.at[2]);
    face.add(m);
  }
  head.add(face);
}

function pickAppearance(seedChar){
  const outfit = OUTFITS[Math.floor(srand() * OUTFITS.length)];
  return {
    outfit,
    skin: SKIN[Math.floor(srand() * SKIN.length)],
    hair: HAIR[Math.floor(srand() * HAIR.length)],
    height: srandRange(1.58, 1.90),
    shoulders: srandRange(0.90, 1.14),
    hat: seedChar?.hat && seedChar.hat !== 'none' ? seedChar.hat
       : (srand() < 0.34 ? (srand() < 0.5 ? 'fedora' : 'cap') : 'none'),
    hairStyle: srand() < 0.62,
  };
}

/**
 * Full articulated rig. Feet sit on y=0 (the old rig sank 0.22 m into the
 * ground) and the head is human-sized rather than a sphere half the torso.
 */
function buildBody(look, opts = {}){
  const group = new THREE.Group();
  const skinMat = mat(look.skin, 0.78);
  const topMat = mat(look.outfit.top, 0.9);
  const botMat = mat(look.outfit.bottom, 0.92);

  const torso = new THREE.Mesh(G.torso, topMat);
  torso.position.y = 1.18;
  torso.scale.x = look.shoulders;
  torso.castShadow = true;
  torso.userData.isTorso = true;
  group.add(torso);

  const hips = new THREE.Mesh(G.hips, botMat);
  hips.position.y = 0.90;
  hips.castShadow = true;
  group.add(hips);

  const collar = new THREE.Mesh(G.collar, mat(0xf4f1e8, 0.85));
  collar.position.set(0, 1.455, 0.10);
  group.add(collar);

  // Everyone on the mesa wore a numbered badge; it is the site's signature detail.
  const badge = new THREE.Mesh(G.badge, mat(0xf2eee0, 0.8));
  badge.position.set(-0.14 * look.shoulders, 1.30, 0.128);
  group.add(badge);

  const head = new THREE.Mesh(G.head, skinMat);
  head.position.y = 1.63;
  head.scale.set(1.0, 1.26, 1.06);
  head.castShadow = true;
  head.userData.isHead = true;
  group.add(head);
  addFace(head, look, mat);

  if(look.hat === 'fedora' || look.hat === 'hat'){
    const crown = new THREE.Mesh(G.hatCrown, mat(0x2a2620, 0.9));
    crown.position.y = 1.80; group.add(crown);
    const brim = new THREE.Mesh(G.hatBrim, mat(0x2a2620, 0.9));
    brim.position.y = 1.725; group.add(brim);
  } else if(look.hat === 'cap' || look.hat === 'peaked'){
    const crown = new THREE.Mesh(G.capCrown, mat(look.outfit.bottom, 0.9));
    crown.position.y = 1.71; group.add(crown);
    const peak = new THREE.Mesh(G.capPeak, mat(look.outfit.bottom, 0.9));
    peak.position.set(0, 1.712, 0.15); peak.rotation.x = -0.12; group.add(peak);
  } else if(look.hairStyle){
    const hair = new THREE.Mesh(G.capCrown, mat(look.hair, 0.98));
    hair.position.y = 1.66;
    hair.scale.set(1.04, 1.0, 1.06);
    group.add(hair);
  }

  // Limbs pivot at the joint, not the middle, so the walk cycle looks jointed.
  const shoulderY = 1.40, hipY = 0.88;
  const limbs = [];
  for(const side of [-1, 1]){
    const armPivot = new THREE.Group();
    armPivot.position.set(side * (0.245 * look.shoulders), shoulderY, 0);
    const arm = new THREE.Mesh(G.arm, skinMat);
    arm.position.y = -0.285;
    arm.castShadow = true;
    // short sleeves on shirts, long on coats
    const sleeve = new THREE.Mesh(G.arm, topMat);
    sleeve.position.y = -0.14;
    sleeve.scale.set(1.12, 0.44, 1.12);
    armPivot.add(arm, sleeve);
    armPivot.userData = { isArm: true, side };
    group.add(armPivot);
    limbs.push(armPivot);

    const legPivot = new THREE.Group();
    legPivot.position.set(side * 0.115, hipY, 0);
    const leg = new THREE.Mesh(G.leg, botMat);
    leg.position.y = -0.425;
    leg.castShadow = true;
    const shoe = new THREE.Mesh(G.shoe, mat(0x2e241a, 0.85));
    shoe.position.set(0, -0.835, 0.035);
    shoe.castShadow = true;
    legPivot.add(leg, shoe);
    legPivot.userData = { isLeg: true, side };
    group.add(legPivot);
    limbs.push(legPivot);
  }

  const s = look.height / NOMINAL_H;
  group.scale.setScalar(s);
  group.userData.limbs = limbs;
  group.userData.torso = torso;
  group.userData.head = head;
  if(opts.seated) poseSeated(group);
  return group;
}

/** Sitting on a pond bank or a step: thighs forward, shins down, torso back. */
function poseSeated(group){
  group.userData.limbs.forEach(l => {
    if(l.userData.isLeg) l.rotation.x = -1.35;
    if(l.userData.isArm) l.rotation.x = -0.5;
  });
  group.userData.torso.rotation.x = 0.12;
  group.position.y -= 0.42 * group.scale.y;
}

/**
 * Cheap rig for the anonymous extras: one merged upper body plus two legs.
 * Four meshes instead of fourteen, which is what lets us afford forty of them.
 */
function buildExtraBody(look){
  const group = new THREE.Group();
  const geos = [], mats = [];
  const push = (geo, material, pos, scale, rot) => {
    const g = geo.clone();
    if(scale) g.scale(scale.x, scale.y, scale.z);
    if(rot) g.rotateX(rot);
    g.translate(pos.x, pos.y, pos.z);
    geos.push(g); mats.push(material);
  };
  const skinMat = mat(look.skin, 0.78);
  const topMat = mat(look.outfit.top, 0.9);
  const botMat = mat(look.outfit.bottom, 0.92);
  push(G.torso, topMat, { x: 0, y: 1.18, z: 0 }, { x: look.shoulders, y: 1, z: 1 });
  push(G.hips, botMat, { x: 0, y: 0.90, z: 0 });
  push(G.head, skinMat, { x: 0, y: 1.63, z: 0 }, { x: 1, y: 1.26, z: 1.06 });
  {
    const tints = faceTints(look);
    for(const part of FACE){
      push(FACE_GEO[part.geo], mat(tints[part.tint], part.tint === 'eye' ? 0.35 : 0.85),
        { x: part.at[0], y: 1.63 + part.at[1] * 1.26, z: part.at[2] });
    }
  }
  push(G.badge, mat(0xf2eee0, 0.8), { x: -0.14 * look.shoulders, y: 1.30, z: 0.128 });
  for(const side of [-1, 1]){
    const ax = side * 0.245 * look.shoulders;
    push(G.arm, skinMat, { x: ax, y: 1.115, z: 0 });
    // Sleeve in the shirt colour, so the arm separates from the torso instead
    // of merging into one silhouette at a distance.
    push(G.arm, topMat, { x: ax, y: 1.26, z: 0 }, { x: 1.16, y: 0.46, z: 1.16 });
  }
  if(look.hat === 'fedora'){
    push(G.hatCrown, mat(0x2a2620, 0.9), { x: 0, y: 1.80, z: 0 });
    push(G.hatBrim, mat(0x2a2620, 0.9), { x: 0, y: 1.725, z: 0 });
  } else if(look.hat === 'cap'){
    push(G.capCrown, mat(look.outfit.bottom, 0.9), { x: 0, y: 1.71, z: 0 });
  } else if(look.hairStyle){
    push(G.capCrown, mat(look.hair, 0.98), { x: 0, y: 1.66, z: 0 }, { x: 1.04, y: 1, z: 1.06 });
  }
  const merged = BufferGeometryUtils.mergeGeometries(geos, true);
  const upper = new THREE.Mesh(merged, mats);
  upper.castShadow = true;
  upper.userData.isTorso = true;
  group.add(upper);

  const limbs = [];
  for(const side of [-1, 1]){
    const legPivot = new THREE.Group();
    legPivot.position.set(side * 0.115, 0.88, 0);
    const leg = new THREE.Mesh(G.leg, botMat);
    leg.position.y = -0.425;
    leg.castShadow = true;
    const shoe = new THREE.Mesh(G.shoe, mat(0x2e241a, 0.85));
    shoe.position.set(0, -0.835, 0.035);
    legPivot.add(leg, shoe);
    legPivot.userData = { isLeg: true, side };
    group.add(legPivot);
    limbs.push(legPivot);
  }
  group.scale.setScalar(look.height / NOMINAL_H);
  group.userData.limbs = limbs;
  group.userData.torso = upper;
  return group;
}

// -------------------------------------------------------------------- routing
// Hand-placed loitering spots. Two zones, never connected, because the Tech
// Area wire has one gate and these NPCs do not path-find.
const SPOTS = {
  town: [
    [-90, 12], [-70, 14], [-50, 8], [-34, 12], [-14, 7], [2, 14], [8, 6],
    [28, 12], [40, 8], [52, 14], [72, 10], [88, 13],
    [-9, -6], [9, -6], [0, -19], [-11, -14], [11, -14],
    [-13, -27], [13, -30], [0, -21], [20, -40],
    [-48, -33], [-40, -20], [44, -33], [36, -20],
    [-66, -13], [-80, -13], [-58, -2],
    [-76, 33], [-68, 26],
    [-28, 30], [-20, 24], [30, 33], [38, 26],
    [52, 24], [58, 31], [64, 24], [52, 38], [64, 44],
    [68, 2], [74, -6], [60, -12],
    [-48, 42], [-42, 34], [-54, 28],
    [16, 78], [16, 96], [22, 84], [11, 92],
  ],
  tech: [
    [-30, 34], [-18, 38], [-16, 52], [-4, 40], [0, 50], [6, 44],
    [16, 40], [16, 50], [16, 64], [14, 68], [32, 34],
    [24, 52], [36, 54], [40, 62], [-24, 60], [-34, 64], [-6, 68], [-40, 50],
    [26, 66], [-14, 64],
  ],
};
// Where each zone's population reports, eats and sleeps. Schedules pull toward
// one of these, so the streets fill and empty on the shift pattern.
const ANCHORS = {
  town: {
    home:   [[-66, -13], [-80, -13], [-48, -33], [44, -33], [-28, 30], [30, 33], [-76, 33]],
    work:   [[-40, -20], [36, -20], [-58, -2], [16, 78]],
    social: [[52, 24], [58, 31], [68, 2], [74, -6], [-9, -6], [9, -6], [0, -19]],
    chapel: [[-48, 42], [-42, 34]],
  },
  tech: {
    home:   [[16, 64], [14, 68], [-6, 68], [26, 66], [-34, 64]],
    work:   [[-30, 34], [-4, 40], [32, 34], [-18, 38], [24, 52], [0, 50]],
    social: [[16, 50], [6, 44], [-16, 52], [36, 54]],
    chapel: [[16, 40]],
  },
};
// Seats on the Ashley Pond bank — people really did eat lunch here.
const SEATS = [
  [-7.5, -13.5, 0.5], [7.5, -13.5, -0.5], [0, -16.5, 0], [-8.2, -3.5, 2.1], [8.0, -3.2, -2.1],
];

function pick(arr){ return arr[Math.floor(srand() * arr.length)]; }
function isClear(x, z, pad = 1.0){
  for(const b of colliders){
    if(x > b.min.x - pad && x < b.max.x + pad && z > b.min.z - pad && z < b.max.z + pad) return false;
  }
  return true;
}
/** Chooses the destination appropriate to the hour, with per-person jitter. */
function scheduledTarget(n){
  const state = getState();
  const h = ((((state?.timeHours ?? 8) % 24) + 24) % 24) + n.chrono;
  const a = ANCHORS[n.zone];
  let pool;
  if(h < 6.3 || h >= 21.5) pool = a.home;
  else if(h < 7.6) pool = srand() < 0.5 ? a.home : a.work;
  else if(h < 11.9) pool = a.work;
  else if(h < 13.2) pool = a.social;
  else if(h < 17.4) pool = a.work;
  else if(h < 20.6) pool = srand() < 0.65 ? a.social : a.home;
  else pool = a.home;
  // Sunday morning fills the chapel.
  const day = Math.floor((state?.timeHours ?? 8) / 24) + 1;
  if(day % 7 === 0 && h >= 8.6 && h < 11.4 && srand() < 0.5) pool = a.chapel;
  // Most people head for the anchor; some just drift to a nearby spot.
  const base = srand() < 0.7 ? pick(pool) : pick(SPOTS[n.zone]);
  for(let i = 0; i < 12; i++){
    const x = base[0] + srandRange(-3.5, 3.5);
    const z = base[1] + srandRange(-3.5, 3.5);
    if(isClear(x, z)) return new THREE.Vector3(x, 0, z);
  }
  return new THREE.Vector3(base[0], 0, base[1]);
}

/**
 * Chest badge. Sized to its text rather than a fixed plank floating over the
 * head: the canvas is measured and the plane takes the same aspect, so a short
 * name gets a small badge. Name only — the role and division are already in the
 * interaction prompt, and extra lines are unreadable at chest scale.
 */
const PLATE_H = 0.075;              // world height of the badge, in metres
const PLATE_LIFT = 1.30;            // chest height on the 1.775 m rig
const PLATE_STANDOFF = 0.26;        // how far it floats in front of the chest

function nameplate(ch){
  const PAD = 22, FONT = 34, H = 64;
  const measure = document.createElement('canvas').getContext('2d');
  let font = FONT;
  measure.font = `800 ${font}px Georgia, serif`;
  let name = ch.name;
  // Shrink, then clip, so a long name never produces a comically wide badge.
  while(measure.measureText(name).width > 420 && font > 22){
    font -= 2;
    measure.font = `800 ${font}px Georgia, serif`;
  }
  if(measure.measureText(name).width > 420){
    while(name.length > 6 && measure.measureText(name + '…').width > 420) name = name.slice(0, -1);
    name += '…';
  }
  const textW = measure.measureText(name).width;
  const cvs = document.createElement('canvas');
  cvs.width = Math.ceil(textW + PAD * 2);
  cvs.height = H;
  const ctx = cvs.getContext('2d');
  const w = cvs.width, h = cvs.height, r = 10;
  // A pinned card, in the period palette.
  ctx.fillStyle = 'rgba(246,242,232,0.96)';
  ctx.beginPath();
  ctx.moveTo(r, 0); ctx.lineTo(w - r, 0); ctx.quadraticCurveTo(w, 0, w, r);
  ctx.lineTo(w, h - r); ctx.quadraticCurveTo(w, h, w - r, h);
  ctx.lineTo(r, h); ctx.quadraticCurveTo(0, h, 0, h - r);
  ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2c2822'; ctx.fillRect(0, 0, w, 3);
  ctx.fillStyle = '#231f19';
  ctx.font = `800 ${font}px Georgia, serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(name, w / 2, h / 2 + 2);

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(PLATE_H * (w / h), PLATE_H),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false })
  );
  plate.renderOrder = 5;
  plate.visible = false;
  plate.userData.isPlate = true;
  return plate;
}

export function spawnNPCs(count = 20){
  if(npcGroup) return;
  npcGroup = new THREE.Group();
  scene.add(npcGroup);

  // Historic figures: everyone in a Tech Area division works inside the wire.
  const TECH_DIVISIONS = new Set(['CM', 'E', 'T']);
  const spawnList = count >= HISTORIC_CHARACTERS.length
    ? [...HISTORIC_CHARACTERS]
    : [...HISTORIC_CHARACTERS].sort(() => srand() - 0.5).slice(0, count);

  spawnList.forEach((ch, i) => {
    const division = CHARACTER_DIVISION[ch.id] || 'T';
    ch.division = division;
    const zone = TECH_DIVISIONS.has(division) ? 'tech' : 'town';
    const look = pickAppearance(ch);
    // Directors and officers dress the part regardless of the random draw.
    if(ch.id === 'oppenheimer' || ch.id === 'groves') look.outfit = OUTFITS[ch.id === 'groves' ? 3 : 8];
    const body = buildBody(look);

    const plate = nameplate(ch);
    npcGroup.add(plate);

    const spotPool = SPOTS[zone];
    const start = spotPool[i % spotPool.length];
    const pos = new THREE.Vector3(start[0] + srandRange(-2, 2), 0, start[1] + srandRange(-2, 2));
    body.position.set(pos.x, terrainHeight(pos.x, pos.z), pos.z);

    const hit = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 1.8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hit.position.set(pos.x, terrainHeight(pos.x, pos.z) + 0.95, pos.z);
    scene.add(hit);

    npcGroup.add(body);
    interactables.push({
      mesh: hit, type: 'npc', id: ch.id,
      prompt: `E — Talk to ${ch.name} [${division}] — ${ch.role}`,
      info: `<b>${ch.name}</b> — ${ch.role}<br><br>${ch.bio}`,
      char: ch, hit, body,
    });

    const n = {
      char: ch, body, hit, plate, division, zone, look,
      pos, target: new THREE.Vector3(),
      speed: srandRange(0.7, 1.25),
      bobPhase: srand() * Math.PI * 2,
      pause: srandRange(0, 3),
      chrono: srandRange(-0.5, 0.5),   // not everyone keeps the same hours
      facing: srand() * Math.PI * 2,
    };
    n.target.copy(scheduledTarget(n));
    npcs.push(n);
  });

  // -------- anonymous extras: walkers, standing groups, and people sitting
  const EXTRA_COUNT = 40;
  let made = 0;

  // Standing conversations — three clusters per zone, two or three people each.
  const clusterSpots = [
    ['town', 4, 15], ['town', 53, 20], ['town', -47, -30],
    ['town', 62, -2], ['town', -20, 27],
    ['tech', -20, 42], ['tech', 18, 55], ['tech', 34, 50],
  ];
  clusterSpots.forEach(([zone, cx, cz]) => {
    const size = 2 + Math.floor(srand() * 2);
    for(let k = 0; k < size && made < EXTRA_COUNT; k++){
      const a = (k / size) * Math.PI * 2 + srandRange(-0.3, 0.3);
      const r = 0.75 + srandRange(0, 0.3);
      const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
      const look = pickAppearance();
      const body = buildExtraBody(look);
      body.position.set(x, terrainHeight(x, z), z);
      body.rotation.y = Math.atan2(cx - x, cz - z);   // face the middle of the group
      npcGroup.add(body);
      extras.push({ body, mode: 'stand', zone, pos: new THREE.Vector3(x, 0, z),
                    sway: srand() * Math.PI * 2, swayRate: srandRange(0.5, 0.9) });
      made++;
    }
  });

  // People sitting on the pond bank.
  SEATS.forEach(([x, z, ry]) => {
    if(made >= EXTRA_COUNT) return;
    const look = pickAppearance();
    const body = buildExtraBody(look);
    body.position.set(x, terrainHeight(x, z), z);
    body.rotation.y = ry;
    poseSeated(body);
    npcGroup.add(body);
    extras.push({ body, mode: 'sit', zone: 'town', pos: new THREE.Vector3(x, 0, z),
                  sway: srand() * Math.PI * 2, swayRate: srandRange(0.3, 0.6) });
    made++;
  });

  // The rest walk their zone on the same schedule as everyone else.
  while(made < EXTRA_COUNT){
    const zone = srand() < 0.68 ? 'town' : 'tech';
    const spot = pick(SPOTS[zone]);
    const x = spot[0] + srandRange(-3, 3), z = spot[1] + srandRange(-3, 3);
    const look = pickAppearance();
    const body = buildExtraBody(look);
    body.position.set(x, terrainHeight(x, z), z);
    npcGroup.add(body);
    const e = {
      body, mode: 'walk', zone,
      pos: new THREE.Vector3(x, 0, z), target: new THREE.Vector3(),
      speed: srandRange(0.65, 1.3),
      bobPhase: srand() * Math.PI * 2,
      pause: srandRange(0, 4),
      chrono: srandRange(-0.6, 0.6),
    };
    e.target.copy(scheduledTarget(e));
    extras.push(e);
    made++;
  }
}

// ------------------------------------------------------------------ per frame
const camForward = new THREE.Vector3();
const toNpc = new THREE.Vector3();
const tmpDir = new THREE.Vector3();

/** Advances one walker. Shared by historic figures and extras. */
function stepWalker(n, delta){
  if(n.pause > 0){
    n.pause -= delta;
    animateIdle(n, delta);
    return;
  }
  tmpDir.subVectors(n.target, n.pos);
  tmpDir.y = 0;
  const dist = tmpDir.length();
  if(dist < 0.7){
    n.target.copy(scheduledTarget(n));
    n.pause = srandRange(1.5, 7);      // people stop and talk
    return;
  }
  tmpDir.normalize();
  const step = n.speed * delta;
  const nx = n.pos.x + tmpDir.x * step;
  const nz = n.pos.z + tmpDir.z * step;
  // Blocked by a building or the wire: give up on this destination, pick another.
  if(!isClear(nx, nz, 0.7)){
    n.target.copy(scheduledTarget(n));
    n.pause = srandRange(0.3, 1.2);
    return;
  }
  n.pos.set(nx, 0, nz);
  const groundY = terrainHeight(nx, nz);

  // Stride rate follows actual speed, so nobody sprints their legs while strolling.
  n.bobPhase += gaitAdvance(n.speed, delta);
  const bob = applyGait(n.body, n.bobPhase, n.speed);
  n.body.position.set(nx, groundY + bob, nz);

  // Turn toward travel instead of snapping.
  const want = Math.atan2(tmpDir.x, tmpDir.z);
  let d = want - n.body.rotation.y;
  while(d > Math.PI) d -= Math.PI * 2;
  while(d < -Math.PI) d += Math.PI * 2;
  n.body.rotation.y += d * Math.min(1, delta * 6);

  if(n.hit) n.hit.position.set(nx, groundY + 0.95, nz);
}

/** Standing still is not standing frozen: weight shifts, arms settle. */
function animateIdle(n, delta){
  n.sway = (n.sway ?? 0) + delta * (n.swayRate ?? 0.7);
  const s = Math.sin(n.sway);
  if(n.body.userData.torso) n.body.userData.torso.rotation.y = s * 0.045;
  n.body.userData.limbs?.forEach(l => {
    if(l.userData.isLeg){
      l.rotation.x = l.userData.side === -1 ? s * 0.035 : -s * 0.035;
      // Knees straight and soles flat, or a person who stops mid-stride keeps
      // the bent knee for ever.
      if(l.userData.knee) l.userData.knee.rotation.x = 0;
      if(l.userData.shoe) l.userData.shoe.rotation.x = 0;
    } else {
      l.rotation.x = (l.userData.side === -1 ? -s : s) * 0.05;
    }
  });
}

export function updateNPCs(delta, playerPos){
  if(!npcs.length && !extras.length) return;
  if(camera) camera.getWorldDirection(camForward);

  for(const n of npcs){
    stepWalker(n, delta);
    // Nameplate: visible only when close AND actually being looked at, then
    // faded by distance. An always-on label is the loudest "this is a game" tell.
    if(n.plate){
      toNpc.set(n.pos.x - playerPos.x, 0, n.pos.z - playerPos.z);
      const dist = toNpc.length();
      let opacity = 0;
      if(dist < 11){
        toNpc.normalize();
        const facing = toNpc.x * camForward.x + toNpc.z * camForward.z;
        if(facing > 0.86){                                  // roughly a 30° cone
          opacity = Math.min(1, (11 - dist) / 3) * Math.min(1, (facing - 0.86) / 0.06);
        }
      }
      n.plate.material.opacity += (opacity - n.plate.material.opacity) * Math.min(1, delta * 9);
      n.plate.visible = n.plate.material.opacity > 0.01;
      if(n.plate.visible){
        // Sit it in front of the chest, on the line to the player, so it never
        // clips into the torso however the person is facing.
        const dx = playerPos.x - n.pos.x, dz = playerPos.z - n.pos.z;
        const len = Math.hypot(dx, dz) || 1;
        n.plate.position.set(
          n.pos.x + (dx / len) * PLATE_STANDOFF,
          n.body.position.y + PLATE_LIFT * (n.body.scale.y || 1),
          n.pos.z + (dz / len) * PLATE_STANDOFF);
        n.plate.lookAt(playerPos.x, n.plate.position.y, playerPos.z);
      }
    }
  }

  for(const e of extras){
    if(e.mode === 'walk') stepWalker(e, delta);
    else animateIdle(e, delta);
  }
}

export function getNPCForDivision(division){
  return npcs.find(n => n.division === division)
      || npcs.find(n => n.char.id === 'oppenheimer')
      || npcs[0];
}
export function getNPCByCharId(charId){
  return npcs.find(n => n.char.id === charId) || null;
}
export function highlightNPCForDivision(division, on = true){
  // Tint the nameplate card rather than making a person glow.
  for(const n of npcs){
    const isTarget = n.division === division;
    if(n.plate) n.plate.material.color.setHex(isTarget && on ? 0xbcd8ea : 0xffffff);
  }
}
export function pauseNPC(id, secs = 6){
  const n = npcs.find(x => x.char.id === id);
  if(n){ n.pause = Math.max(n.pause, secs); n.target.copy(n.pos); }
}
export function getNPCs(){ return npcs; }
