// npcs.js — the people on the floor.
//
// Two tiers, as in the outdoor build. Named staff and patients from
// historicCharacters.js carry full rigs, nameplates and dialogue; anonymous
// extras carry a cheaper merged rig and no interaction, which is what makes a
// corridor feel like a working hospital rather than a cast list.
//
// Nobody wanders. Everyone moves between hand-placed spots in the corridor and
// the open rooms, so no one ever tries to walk through a closed door.
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { scene, colliders, interactables } from './world.js';
import { camera } from './player.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import { CHARACTER_DIVISION } from './simulation.js';
import { getState } from './gameState.js';
import { srand, srandRange } from './interiorEnv.js';
import { CORRIDOR, WAITING_CHAIRS } from './plan.js';

let npcs = [];
let extras = [];
let npcGroup = null;

const NOMINAL_H = 1.775;

// ------------------------------------------------------------- what they wear
// Scrubs in the usual ward colours, white coats over street clothes for the
// doctors, printed gowns for admitted patients, ordinary clothes for families.
const OUTFITS = {
  scrubTeal:   { top: 0x3f8f8a, bottom: 0x357b77, kind: 'staff' },
  scrubNavy:   { top: 0x374a63, bottom: 0x2f4056, kind: 'staff' },
  scrubMaroon: { top: 0x7a3f4c, bottom: 0x6b3743, kind: 'staff' },
  scrubGrey:   { top: 0x5d6a70, bottom: 0x515c62, kind: 'staff' },
  coat:        { top: 0xf1f1ec, bottom: 0x3c4450, kind: 'doctor' },
  gownBlue:    { top: 0x9fb8cc, bottom: 0x9fb8cc, kind: 'patient' },
  gownMint:    { top: 0xa8c6b4, bottom: 0xa8c6b4, kind: 'patient' },
  street1:     { top: 0xc4705f, bottom: 0x3a3f47, kind: 'visitor' },
  street2:     { top: 0x6f7f96, bottom: 0x44403c, kind: 'visitor' },
  street3:     { top: 0xd0b06a, bottom: 0x3e4a45, kind: 'visitor' },
  street4:     { top: 0x7c6f92, bottom: 0x33383f, kind: 'visitor' },
};
const STAFF_OUTFITS = ['scrubTeal', 'scrubNavy', 'scrubMaroon', 'scrubGrey'];
const VISITOR_OUTFITS = ['street1', 'street2', 'street3', 'street4'];
const PATIENT_OUTFITS = ['gownBlue', 'gownMint'];

const SKIN = [0xf0cfae, 0xe3b48c, 0xc99167, 0xa9714a, 0x7d5033, 0x5c3a24];
const HAIR = [0x2a1d12, 0x3f2a17, 0x6b4a22, 0x8a7a5a, 0x9a9a95, 0x1a1512];

const matCache = new Map();
function mat(hex, rough = 0.88){
  const key = `${hex}_${rough}`;
  let m = matCache.get(key);
  if(!m){
    // envMapIntensity matches the interior IBL damping used for the building,
    // so people sit in the same light as the corridor behind them.
    m = new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0, envMapIntensity: 0.55 });
    matCache.set(key, m);
  }
  return m;
}

const G = {
  torso: new THREE.CylinderGeometry(0.235, 0.205, 0.60, 12).scale(1, 1, 0.56),
  hips:  new THREE.CylinderGeometry(0.20, 0.185, 0.18, 12).scale(1, 1, 0.60),
  collar:new THREE.BoxGeometry(0.30, 0.07, 0.045),
  head:  new THREE.SphereGeometry(0.115, 14, 12),
  arm:   new THREE.CapsuleGeometry(0.052, 0.50, 3, 7),
  // Thigh and shin are separate so the leg can bend at the knee. A single
  // capsule cannot sit down: it sticks straight out in front of the chair.
  thigh: new THREE.CapsuleGeometry(0.078, 0.28, 3, 7),
  shin:  new THREE.CapsuleGeometry(0.068, 0.30, 3, 7),
  shoe:  new THREE.BoxGeometry(0.15, 0.09, 0.27),
  badge: new THREE.BoxGeometry(0.075, 0.105, 0.012),
  lanyard: new THREE.BoxGeometry(0.02, 0.20, 0.012),
  cap:   new THREE.SphereGeometry(0.128, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
  scope: new THREE.TorusGeometry(0.13, 0.014, 5, 14, Math.PI),
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

function pickLook(role){
  const r = (role || '').toLowerCase();
  let key;
  if(r.includes('patient')) key = PATIENT_OUTFITS[Math.floor(srand() * PATIENT_OUTFITS.length)];
  else if(r.includes('nurse')) key = STAFF_OUTFITS[Math.floor(srand() * STAFF_OUTFITS.length)];
  else if(r) key = 'coat';
  else key = srand() < 0.42 ? STAFF_OUTFITS[Math.floor(srand() * STAFF_OUTFITS.length)]
           : srand() < 0.5 ? VISITOR_OUTFITS[Math.floor(srand() * VISITOR_OUTFITS.length)]
           : PATIENT_OUTFITS[Math.floor(srand() * PATIENT_OUTFITS.length)];
  const outfit = OUTFITS[key];
  return {
    outfit, key,
    skin: SKIN[Math.floor(srand() * SKIN.length)],
    hair: HAIR[Math.floor(srand() * HAIR.length)],
    // Patients here are children, so the patient rigs are genuinely smaller.
    height: outfit.kind === 'patient' ? srandRange(1.18, 1.48) : srandRange(1.58, 1.90),
    shoulders: srandRange(0.90, 1.14),
    scrubCap: outfit.kind === 'staff' && srand() < 0.35,
    stethoscope: outfit.kind === 'doctor' || (outfit.kind === 'staff' && srand() < 0.4),
    hairStyle: srand() < 0.62,
  };
}

/** Full articulated rig. Feet sit on y = 0; limbs pivot at the joint. */
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

  if(look.outfit.kind === 'doctor'){
    // Open white coat: a second, slightly larger shell over the torso.
    const coat = new THREE.Mesh(G.torso, mat(0xf4f4ef, 0.88));
    coat.position.y = 1.12;
    coat.scale.set(look.shoulders * 1.1, 1.22, 1.14);
    coat.castShadow = true;
    group.add(coat);
  }

  const head = new THREE.Mesh(G.head, skinMat);
  head.position.y = 1.63;
  head.scale.set(1.0, 1.26, 1.06);
  head.castShadow = true;
  head.userData.isHead = true;
  group.add(head);
  addFace(head, look, mat);

  if(look.scrubCap){
    const cap = new THREE.Mesh(G.cap, mat(look.outfit.top, 0.92));
    cap.position.y = 1.685;
    cap.scale.set(1.08, 1.05, 1.08);
    group.add(cap);
  } else if(look.hairStyle){
    const hair = new THREE.Mesh(G.cap, mat(look.hair, 0.98));
    hair.position.y = 1.66;
    hair.scale.set(1.04, 1.0, 1.06);
    group.add(hair);
  }

  // ID badge on a lanyard — universal, and the quickest read of "staff".
  if(look.outfit.kind !== 'patient'){
    const lan = new THREE.Mesh(G.lanyard, mat(0x2c3742, 0.9));
    lan.position.set(0, 1.36, 0.135);
    group.add(lan);
    const badge = new THREE.Mesh(G.badge, mat(0xf6f4ec, 0.7));
    badge.position.set(0, 1.21, 0.14);
    group.add(badge);
  }
  if(look.stethoscope){
    const s = new THREE.Mesh(G.scope, mat(0x2b3238, 0.55));
    s.rotation.x = Math.PI / 2;
    s.rotation.z = Math.PI;
    s.position.set(0, 1.43, 0.05);
    group.add(s);
    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.014, 10), mat(0xb9bcc0, 0.35));
    bell.position.set(0.13, 1.30, 0.09);
    group.add(bell);
  }

  const shoulderY = 1.40, hipY = 0.88;
  const limbs = [];
  for(const side of [-1, 1]){
    const armPivot = new THREE.Group();
    armPivot.position.set(side * (0.245 * look.shoulders), shoulderY, 0);
    const arm = new THREE.Mesh(G.arm, skinMat);
    arm.position.y = -0.285;
    arm.castShadow = true;
    const sleeve = new THREE.Mesh(G.arm, topMat);
    sleeve.position.y = -0.14;
    sleeve.scale.set(1.16, 0.46, 1.16);
    armPivot.add(arm, sleeve);
    armPivot.userData = { isArm: true, side };
    group.add(armPivot);
    limbs.push(armPivot);

    const legPivot = new THREE.Group();
    legPivot.position.set(side * 0.115, hipY, 0);
    const thigh = new THREE.Mesh(G.thigh, botMat);
    thigh.position.y = -0.22;
    thigh.castShadow = true;
    legPivot.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -0.44;
    const shin = new THREE.Mesh(G.shin, botMat);
    shin.position.y = -0.22;
    shin.castShadow = true;
    const shoe = new THREE.Mesh(G.shoe, mat(look.outfit.kind === 'patient' ? 0xdad6cc : 0x2e241a, 0.85));
    shoe.position.set(0, -0.40, 0.035);
    shoe.castShadow = true;
    knee.add(shin, shoe);
    knee.userData = { isKnee: true, side };
    legPivot.add(knee);
    legPivot.userData = { isLeg: true, side, knee, shoe };
    group.add(legPivot);
    limbs.push(legPivot);
  }

  group.scale.setScalar(look.height / NOMINAL_H);
  group.userData.limbs = limbs;
  group.userData.torso = torso;
  group.userData.head = head;
  if(opts.seated) poseSeated(group);
  return group;
}

/** Sitting in a waiting-room chair: thighs forward, shins down. */
function poseSeated(group){
  group.userData.limbs.forEach(l => {
    if(l.userData.isLeg){
      l.rotation.x = -1.45;                 // thigh forward, roughly level
      if(l.userData.knee) l.userData.knee.rotation.x = 1.45;   // shin back down
    }
    if(l.userData.isArm) l.rotation.x = -0.45;
  });
  group.userData.torso.rotation.x = 0.1;
  // Sitting *lowers* the hips to seat height; raising the whole body left
  // everyone hovering above the chairs.
  group.position.y -= 0.44 * group.scale.y;
}

/** Cheap merged rig for the anonymous extras: one upper body plus two legs. */
function buildExtraBody(look){
  const group = new THREE.Group();
  const geos = [], mats = [];
  const push = (geo, material, pos, scale) => {
    const g = geo.clone();
    if(scale) g.scale(scale.x, scale.y, scale.z);
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
  if(look.outfit.kind !== 'patient'){
    push(G.badge, mat(0xf6f4ec, 0.7), { x: 0, y: 1.21, z: 0.14 });
    push(G.lanyard, mat(0x2c3742, 0.9), { x: 0, y: 1.36, z: 0.135 });
  }
  for(const side of [-1, 1]){
    const ax = side * 0.245 * look.shoulders;
    push(G.arm, skinMat, { x: ax, y: 1.115, z: 0 });
    push(G.arm, topMat, { x: ax, y: 1.26, z: 0 }, { x: 1.16, y: 0.46, z: 1.16 });
  }
  if(look.scrubCap) push(G.cap, mat(look.outfit.top, 0.92), { x: 0, y: 1.685, z: 0 }, { x: 1.08, y: 1.05, z: 1.08 });
  else if(look.hairStyle) push(G.cap, mat(look.hair, 0.98), { x: 0, y: 1.66, z: 0 }, { x: 1.04, y: 1, z: 1.06 });

  const merged = BufferGeometryUtils.mergeGeometries(geos, true);
  const upper = new THREE.Mesh(merged, mats);
  upper.castShadow = true;
  upper.userData.isTorso = true;
  group.add(upper);

  const limbs = [];
  for(const side of [-1, 1]){
    const legPivot = new THREE.Group();
    legPivot.position.set(side * 0.115, 0.88, 0);
    const thigh = new THREE.Mesh(G.thigh, botMat);
    thigh.position.y = -0.22;
    thigh.castShadow = true;
    legPivot.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -0.44;
    const shin = new THREE.Mesh(G.shin, botMat);
    shin.position.y = -0.22;
    shin.castShadow = true;
    const shoe = new THREE.Mesh(G.shoe, mat(0x2e241a, 0.85));
    shoe.position.set(0, -0.40, 0.035);
    knee.add(shin, shoe);
    legPivot.add(knee);
    legPivot.userData = { isLeg: true, side, knee, shoe };
    group.add(legPivot);
    limbs.push(legPivot);
  }
  group.scale.setScalar(look.height / NOMINAL_H);
  group.userData.limbs = limbs;
  group.userData.torso = upper;
  return group;
}

// -------------------------------------------------------------------- routing
const HW = CORRIDOR.halfWidth - 0.55;      // stay clear of the crash rails

/** Standing spots. Corridor positions plus the open rooms staff pass through. */
const SPOTS = {
  corridor: [
    [-HW, -3], [HW, -1], [-HW, 2], [HW, 5], [-HW, 8], [HW, 11],
    [-HW, 15], [HW, 18], [-HW, 21], [HW, 24], [-HW, 27], [HW, 30],
    [-HW, 33], [HW, 36], [-HW, 39], [HW, 42], [-HW, 45],
  ],
  open: [
    [-5.0, 0], [-6.6, 2.4], [-4.2, 8], [-6.4, 11],     // reception and waiting
    [5.2, 39], [6.8, 41], [4.4, 40.5],                  // nurses' station
  ],
};
/** Where the shift sends people, by hour. */
const ANCHORS = {
  station: [[5.2, 39], [6.8, 41], [4.4, 40.5], [HW, 39], [-HW, 39]],
  wards:   [[-HW, 18], [HW, 23], [-HW, 27], [HW, 31], [-HW, 35]],
  front:   [[-5.0, 0], [-6.6, 2.4], [HW, 2], [-HW, 5], [-4.2, 8]],
};

// Seating comes from the shared plan, so a seated patient is always on a
// chair that hospitalProps.js actually built.
const CHAIRS = WAITING_CHAIRS;
export function getChairs(){ return CHAIRS; }

function pick(arr){ return arr[Math.floor(srand() * arr.length)]; }
function isClear(x, z, pad = 0.9){
  for(const b of colliders){
    if(x > b.min.x - pad && x < b.max.x + pad && z > b.min.z - pad && z < b.max.z + pad) return false;
  }
  return true;
}
function scheduledTarget(n){
  const state = getState();
  const h = ((((state?.timeHours ?? 8) % 24) + 24) % 24) + n.chrono;
  let pool;
  if(h < 7.5) pool = ANCHORS.station;
  else if(h < 12) pool = srand() < 0.6 ? ANCHORS.wards : ANCHORS.station;
  else if(h < 13.5) pool = ANCHORS.front;
  else if(h < 18) pool = srand() < 0.6 ? ANCHORS.wards : ANCHORS.station;
  else pool = ANCHORS.station;
  const base = srand() < 0.62 ? pick(pool) : pick(SPOTS.corridor);
  for(let i = 0; i < 10; i++){
    const x = base[0] + srandRange(-0.5, 0.5);
    const z = base[1] + srandRange(-2.5, 2.5);
    if(isClear(x, z)) return new THREE.Vector3(x, 0, z);
  }
  return new THREE.Vector3(base[0], 0, base[1]);
}

/**
 * Chest badge. Sized to its text rather than a fixed 1.35 m plank floating over
 * the head: the canvas is measured, the plane takes the same aspect, so a short
 * name gets a small badge. Name only — the role is already in the interaction
 * prompt, and two lines are unreadable at chest scale.
 */
const PLATE_H = 0.075;              // world height of the badge, in metres
const PLATE_LIFT = 1.30;            // chest height on the 1.775 m rig
const PLATE_STANDOFF = 0.26;        // how far it floats in front of the chest

function nameplate(ch){
  const PAD = 22, FONT = 34, H = 64;
  const measure = document.createElement('canvas').getContext('2d');
  let font = FONT;
  measure.font = `800 ${font}px Inter, Helvetica, Arial, sans-serif`;
  let name = ch.name;
  // Shrink, then clip, so a long name never produces a comically wide badge.
  while(measure.measureText(name).width > 420 && font > 22){
    font -= 2;
    measure.font = `800 ${font}px Inter, Helvetica, Arial, sans-serif`;
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
  const r = 12;
  const w = cvs.width, h = cvs.height;
  // rounded card
  ctx.fillStyle = 'rgba(250,250,247,0.96)';
  ctx.beginPath();
  ctx.moveTo(r, 0); ctx.lineTo(w - r, 0); ctx.quadraticCurveTo(w, 0, w, r);
  ctx.lineTo(w, h - r); ctx.quadraticCurveTo(w, h, w - r, h);
  ctx.lineTo(r, h); ctx.quadraticCurveTo(0, h, 0, h - r);
  ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath(); ctx.fill();
  // a thin accent edge, as a clipped ID card has
  ctx.fillStyle = '#25506b';
  ctx.fillRect(0, 0, w, 3);
  ctx.fillStyle = '#1b1e22';
  ctx.font = `800 ${font}px Inter, Helvetica, Arial, sans-serif`;
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

export function spawnNPCs(count = 40){
  if(npcGroup) return;
  npcGroup = new THREE.Group();
  scene.add(npcGroup);

  const roster = count >= HISTORIC_CHARACTERS.length
    ? [...HISTORIC_CHARACTERS]
    : [...HISTORIC_CHARACTERS].sort(() => srand() - 0.5).slice(0, count);

  let chairIdx = 0;
  roster.forEach((ch, i) => {
    const division = CHARACTER_DIVISION[ch.id] || 'TRI';
    ch.division = division;
    const look = pickLook(ch.role);
    const isPatient = (ch.role || '').toLowerCase().includes('patient');
    // Patients are seated in the waiting room until their case is called.
    const seat = isPatient && chairIdx < CHAIRS.length ? CHAIRS[chairIdx++] : null;
    const body = buildBody(look, { seated: !!seat });

    const plate = nameplate(ch);
    npcGroup.add(plate);

    let pos;
    if(seat){
      pos = new THREE.Vector3(seat[0], 0, seat[1]);
      body.position.set(pos.x, body.position.y, pos.z);
      body.rotation.y = seat[2];
    } else {
      // Deal staff down the whole corridor rather than round-robin over a
      // short spot list, which stacked several people on the same few metres.
      const s = SPOTS.corridor[(i * 7) % SPOTS.corridor.length];
      pos = new THREE.Vector3(s[0] + srandRange(-0.3, 0.3), 0, s[1] + srandRange(-2.5, 2.5));
      body.position.set(pos.x, 0, pos.z);
    }

    const hit = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1.8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hit.position.set(pos.x, 0.95, pos.z);
    scene.add(hit);

    npcGroup.add(body);
    interactables.push({
      mesh: hit, type: 'npc', id: ch.id,
      prompt: `E — Talk to ${ch.name} — ${ch.role}`,
      info: `<b>${ch.name}</b> — ${ch.role}<br><br>${ch.bio}`,
      char: ch, hit, body,
    });

    const n = {
      char: ch, body, hit, plate, division, look,
      seated: !!seat,
      pos, target: new THREE.Vector3(),
      speed: srandRange(0.75, 1.25),
      bobPhase: srand() * Math.PI * 2,
      pause: srandRange(0, 3),
      chrono: srandRange(-0.5, 0.5),
      sway: srand() * Math.PI * 2,
      swayRate: srandRange(0.4, 0.8),
    };
    if(!seat) n.target.copy(scheduledTarget(n));
    npcs.push(n);
  });

  // ---- anonymous extras
  const EXTRA_COUNT = 22;
  let made = 0;
  // Small standing groups: a handover in the corridor, families at the desk.
  const clusters = [[-0.9, 20.5], [0.9, 33.5], [5.6, 40.5], [-5.4, 3.2]];
  clusters.forEach(([cx, cz]) => {
    const size = 2 + Math.floor(srand() * 2);
    for(let k = 0; k < size && made < EXTRA_COUNT; k++){
      const a = (k / size) * Math.PI * 2 + srandRange(-0.3, 0.3);
      const r = 0.62 + srandRange(0, 0.25);
      const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
      const look = pickLook('');
      const body = buildExtraBody(look);
      body.position.set(x, 0, z);
      body.rotation.y = Math.atan2(cx - x, cz - z);
      npcGroup.add(body);
      extras.push({ body, mode: 'stand', pos: new THREE.Vector3(x, 0, z),
                    sway: srand() * Math.PI * 2, swayRate: srandRange(0.5, 0.9) });
      made++;
    }
  });
  // Remaining chairs get anonymous families.
  while(chairIdx < CHAIRS.length && made < EXTRA_COUNT){
    const [x, z, ry] = CHAIRS[chairIdx++];
    const look = pickLook('');
    const body = buildExtraBody(look);
    body.position.set(x, 0, z);
    body.rotation.y = ry;
    poseSeated(body);
    npcGroup.add(body);
    extras.push({ body, mode: 'sit', pos: new THREE.Vector3(x, 0, z),
                  sway: srand() * Math.PI * 2, swayRate: srandRange(0.3, 0.6) });
    made++;
  }
  // The rest walk the corridor on the same schedule as everyone else.
  while(made < EXTRA_COUNT){
    const s = pick(SPOTS.corridor);
    const x = s[0] + srandRange(-0.4, 0.4), z = s[1] + srandRange(-2, 2);
    const look = pickLook('');
    const body = buildExtraBody(look);
    body.position.set(x, 0, z);
    npcGroup.add(body);
    const e = {
      body, mode: 'walk',
      pos: new THREE.Vector3(x, 0, z), target: new THREE.Vector3(),
      speed: srandRange(0.7, 1.3),
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

/**
 * Nudge apart anyone who has ended up inside someone else. A corridor is
 * narrow, so without this the whole floor converges into one clump of
 * interpenetrating bodies at the first shared destination.
 */
const PERSONAL_SPACE = 0.62;
function separate(n){
  const push = (other) => {
    if(other === n || !other.pos) return;
    const dx = n.pos.x - other.pos.x, dz = n.pos.z - other.pos.z;
    const d2 = dx * dx + dz * dz;
    if(d2 > PERSONAL_SPACE * PERSONAL_SPACE || d2 < 1e-6) return;
    const d = Math.sqrt(d2);
    const shove = (PERSONAL_SPACE - d) * 0.5;
    const ux = dx / d, uz = dz / d;
    const nx = n.pos.x + ux * shove, nz = n.pos.z + uz * shove;
    if(isClear(nx, nz, 0.4)) n.pos.set(nx, 0, nz);
  };
  for(let i = 0; i < npcs.length; i++) push(npcs[i]);
  for(let i = 0; i < extras.length; i++) push(extras[i]);
}

function stepWalker(n, delta){
  if(n.pause > 0){ n.pause -= delta; animateIdle(n, delta); return; }
  tmpDir.subVectors(n.target, n.pos);
  tmpDir.y = 0;
  const dist = tmpDir.length();
  if(dist < 0.6){
    n.target.copy(scheduledTarget(n));
    n.pause = srandRange(1.5, 6);
    return;
  }
  tmpDir.normalize();
  const step = n.speed * delta;
  const nx = n.pos.x + tmpDir.x * step;
  const nz = n.pos.z + tmpDir.z * step;
  if(!isClear(nx, nz, 0.55)){
    n.target.copy(scheduledTarget(n));
    n.pause = srandRange(0.3, 1.2);
    return;
  }
  n.pos.set(nx, 0, nz);
  separate(n);

  n.bobPhase += gaitAdvance(n.speed, delta);
  const bob = applyGait(n.body, n.bobPhase, n.speed);
  n.body.position.set(n.pos.x, bob, n.pos.z);

  const want = Math.atan2(tmpDir.x, tmpDir.z);
  let d = want - n.body.rotation.y;
  while(d > Math.PI) d -= Math.PI * 2;
  while(d < -Math.PI) d += Math.PI * 2;
  n.body.rotation.y += d * Math.min(1, delta * 6);

  if(n.hit) n.hit.position.set(n.pos.x, 0.95, n.pos.z);
}

function animateIdle(n, delta){
  n.sway = (n.sway ?? 0) + delta * (n.swayRate ?? 0.7);
  const s = Math.sin(n.sway);
  if(n.body.userData.torso) n.body.userData.torso.rotation.y = s * 0.045;
  if(n.seated || n.mode === 'sit') return;   // keep the seated pose intact
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
    if(n.seated) animateIdle(n, delta);
    else stepWalker(n, delta);
    if(n.plate){
      // Visible only when close AND actually being looked at, then faded by
      // distance. An always-on label is the loudest "this is a game" tell.
      toNpc.set(n.pos.x - playerPos.x, 0, n.pos.z - playerPos.z);
      const dist = toNpc.length();
      let opacity = 0;
      if(dist < 9){
        toNpc.normalize();
        const facing = toNpc.x * camForward.x + toNpc.z * camForward.z;
        if(facing > 0.86){
          opacity = Math.min(1, (9 - dist) / 2.5) * Math.min(1, (facing - 0.86) / 0.06);
        }
      }
      n.plate.material.opacity += (opacity - n.plate.material.opacity) * Math.min(1, delta * 9);
      n.plate.visible = n.plate.material.opacity > 0.01;
      if(n.plate.visible){
        // Sit it in front of the chest, on the line to the player, so it never
        // clips into the torso however the person is facing.
        const lift = PLATE_LIFT * (n.body.scale.y || 1) + (n.seated ? -0.30 : 0);
        const dx = playerPos.x - n.pos.x, dz = playerPos.z - n.pos.z;
        const len = Math.hypot(dx, dz) || 1;
        n.plate.position.set(
          n.pos.x + (dx / len) * PLATE_STANDOFF,
          n.body.position.y + lift,
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
  return npcs.find(n => n.division === division && !n.seated)
      || npcs.find(n => n.division === division)
      || npcs[0];
}
export function getNPCByCharId(charId){
  return npcs.find(n => n.char.id === charId) || null;
}
export function highlightNPCForDivision(division, on = true){
  for(const n of npcs){
    if(n.plate) n.plate.material.color.setHex(n.division === division && on ? 0xbcd8ea : 0xffffff);
  }
}
export function pauseNPC(id, secs = 6){
  const n = npcs.find(x => x.char.id === id);
  if(n){ n.pause = Math.max(n.pause, secs); if(n.target) n.target.copy(n.pos); }
}
export function getNPCs(){ return npcs; }
