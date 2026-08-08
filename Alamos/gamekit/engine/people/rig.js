// rig.js — the human rig, shared by every theme.
//
// Only the clothing changes between games, so the rig itself is engine-level.
// Four things here were each learned the hard way and must not regress:
//   * feet sit on y = 0 (an earlier rig sank 0.22 m into the ground)
//   * the head is human-sized, not half the torso
//   * the torso is a tapered cylinder — a box the same width as the arms makes
//     every figure read as a carton with sticks beside it
//   * the leg is jointed at the knee, because a single capsule cannot sit down
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { srand, srandRange, srandPick } from '../world/materials.js';

export const NOMINAL_H = 1.775;

export const SKIN = [0xf0cfae, 0xe3b48c, 0xc99167, 0xa9714a, 0x7d5033, 0x5c3a24];
export const HAIR = [0x2a1d12, 0x3f2a17, 0x6b4a22, 0x8a7a5a, 0x9a9a95, 0x1a1512];

const matCache = new Map();
/** Shared body materials, damped to match the world's environment level. */
export function bodyMat(hex, rough = 0.88, envMapIntensity = 0.5){
  const key = `${hex}_${rough}_${envMapIntensity}`;
  let m = matCache.get(key);
  if(!m){
    m = new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0, envMapIntensity });
    matCache.set(key, m);
  }
  return m;
}
export function clearBodyMaterials(){ matCache.clear(); }

export const G = {
  torso: new THREE.CylinderGeometry(0.235, 0.205, 0.60, 12).scale(1, 1, 0.56),
  hips:  new THREE.CylinderGeometry(0.20, 0.185, 0.18, 12).scale(1, 1, 0.60),
  head:  new THREE.SphereGeometry(0.115, 14, 12),
  arm:   new THREE.CapsuleGeometry(0.052, 0.50, 3, 7),
  thigh: new THREE.CapsuleGeometry(0.078, 0.28, 3, 7),
  shin:  new THREE.CapsuleGeometry(0.068, 0.30, 3, 7),
  shoe:  new THREE.BoxGeometry(0.15, 0.09, 0.27),
  cap:   new THREE.SphereGeometry(0.128, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
  badge: new THREE.BoxGeometry(0.075, 0.105, 0.012),
  lanyard: new THREE.BoxGeometry(0.02, 0.20, 0.012),
  collar: new THREE.BoxGeometry(0.30, 0.07, 0.045),
};

/**
 * Draw an appearance. `outfit` is theme data: { top, bottom, kind }.
 * `kind` drives proportions and accessories — 'child' rigs are genuinely
 * smaller rather than scaled-down adults.
 */
export function pickLook(outfit, opts = {}){
  const child = outfit.kind === 'child' || opts.child;
  return {
    outfit,
    skin: srandPick(SKIN),
    hair: srandPick(HAIR),
    height: child ? srandRange(1.18, 1.48) : srandRange(1.58, 1.90),
    shoulders: srandRange(0.90, 1.14),
    hairStyle: srand() < 0.62,
    cap: !!opts.cap && srand() < (opts.capChance ?? 0.35),
    badge: opts.badge !== false && !child,
    overcoat: !!opts.overcoat,
    accessory: opts.accessory || null,
  };
}

function addLimbs(group, look, skinMat, topMat, botMat, shoeHex){
  const limbs = [];
  for(const side of [-1, 1]){
    const armPivot = new THREE.Group();
    armPivot.position.set(side * (0.245 * look.shoulders), 1.40, 0);
    const arm = new THREE.Mesh(G.arm, skinMat);
    arm.position.y = -0.285; arm.castShadow = true;
    // Sleeve in the garment colour, so the arm separates from the torso at a
    // distance instead of merging into one silhouette.
    const sleeve = new THREE.Mesh(G.arm, topMat);
    sleeve.position.y = -0.14;
    sleeve.scale.set(1.16, 0.46, 1.16);
    armPivot.add(arm, sleeve);
    armPivot.userData = { isArm: true, side };
    group.add(armPivot);
    limbs.push(armPivot);

    const legPivot = new THREE.Group();
    legPivot.position.set(side * 0.115, 0.88, 0);
    const thigh = new THREE.Mesh(G.thigh, botMat);
    thigh.position.y = -0.22; thigh.castShadow = true;
    legPivot.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -0.44;
    const shin = new THREE.Mesh(G.shin, botMat);
    shin.position.y = -0.22; shin.castShadow = true;
    const shoe = new THREE.Mesh(G.shoe, bodyMat(shoeHex, 0.85));
    shoe.position.set(0, -0.40, 0.035); shoe.castShadow = true;
    knee.add(shin, shoe);
    legPivot.add(knee);
    legPivot.userData = { isLeg: true, side, knee };
    group.add(legPivot);
    limbs.push(legPivot);
  }
  return limbs;
}

/** Full articulated rig, for anyone the player can talk to. */
export function buildBody(look, opts = {}){
  const group = new THREE.Group();
  const skinMat = bodyMat(look.skin, 0.78);
  const topMat = bodyMat(look.outfit.top, 0.9);
  const botMat = bodyMat(look.outfit.bottom, 0.92);

  const torso = new THREE.Mesh(G.torso, topMat);
  torso.position.y = 1.18;
  torso.scale.x = look.shoulders;
  torso.castShadow = true;
  torso.userData.isTorso = true;
  group.add(torso);

  const hips = new THREE.Mesh(G.hips, botMat);
  hips.position.y = 0.90; hips.castShadow = true;
  group.add(hips);

  if(look.overcoat){
    const coat = new THREE.Mesh(G.torso, bodyMat(look.outfit.coat ?? 0xf4f4ef, 0.88));
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

  if(look.cap){
    const cap = new THREE.Mesh(G.cap, bodyMat(look.outfit.top, 0.92));
    cap.position.y = 1.685; cap.scale.set(1.08, 1.05, 1.08);
    group.add(cap);
  } else if(look.hairStyle){
    const hair = new THREE.Mesh(G.cap, bodyMat(look.hair, 0.98));
    hair.position.y = 1.66; hair.scale.set(1.04, 1.0, 1.06);
    group.add(hair);
  }

  if(look.badge){
    const lan = new THREE.Mesh(G.lanyard, bodyMat(0x2c3742, 0.9));
    lan.position.set(0, 1.36, 0.135); group.add(lan);
    const badge = new THREE.Mesh(G.badge, bodyMat(0xf6f4ec, 0.7));
    badge.position.set(0, 1.21, 0.14); group.add(badge);
  }
  if(typeof look.accessory === 'function') look.accessory(group, look, bodyMat);

  group.userData.limbs = addLimbs(group, look, skinMat, topMat, botMat,
    look.outfit.shoe ?? 0x2e241a);
  group.userData.torso = torso;
  group.userData.head = head;
  group.scale.setScalar(look.height / NOMINAL_H);
  if(opts.seated) poseSeated(group);
  return group;
}

/**
 * Cheap rig for anonymous extras: one merged upper body plus two jointed legs.
 * Four meshes instead of fourteen, which is what makes a crowd affordable.
 */
export function buildExtraBody(look){
  const group = new THREE.Group();
  const geos = [], mats = [];
  const push = (geo, material, pos, scale) => {
    const g = geo.clone();
    if(scale) g.scale(scale.x, scale.y, scale.z);
    g.translate(pos.x, pos.y, pos.z);
    geos.push(g); mats.push(material);
  };
  const skinMat = bodyMat(look.skin, 0.78);
  const topMat = bodyMat(look.outfit.top, 0.9);
  const botMat = bodyMat(look.outfit.bottom, 0.92);
  push(G.torso, topMat, { x: 0, y: 1.18, z: 0 }, { x: look.shoulders, y: 1, z: 1 });
  push(G.hips, botMat, { x: 0, y: 0.90, z: 0 });
  push(G.head, skinMat, { x: 0, y: 1.63, z: 0 }, { x: 1, y: 1.26, z: 1.06 });
  if(look.badge){
    push(G.badge, bodyMat(0xf6f4ec, 0.7), { x: 0, y: 1.21, z: 0.14 });
    push(G.lanyard, bodyMat(0x2c3742, 0.9), { x: 0, y: 1.36, z: 0.135 });
  }
  for(const side of [-1, 1]){
    const ax = side * 0.245 * look.shoulders;
    push(G.arm, skinMat, { x: ax, y: 1.115, z: 0 });
    push(G.arm, topMat, { x: ax, y: 1.26, z: 0 }, { x: 1.16, y: 0.46, z: 1.16 });
  }
  if(look.cap) push(G.cap, bodyMat(look.outfit.top, 0.92), { x: 0, y: 1.685, z: 0 }, { x: 1.08, y: 1.05, z: 1.08 });
  else if(look.hairStyle) push(G.cap, bodyMat(look.hair, 0.98), { x: 0, y: 1.66, z: 0 }, { x: 1.04, y: 1, z: 1.06 });

  const upper = new THREE.Mesh(BufferGeometryUtils.mergeGeometries(geos, true), mats);
  upper.castShadow = true;
  upper.userData.isTorso = true;
  group.add(upper);

  group.userData.limbs = addLimbs(group, look, skinMat, topMat, botMat,
    look.outfit.shoe ?? 0x2e241a).filter(l => l.userData.isLeg);
  group.userData.torso = upper;
  group.scale.setScalar(look.height / NOMINAL_H);
  return group;
}

/** Sitting: thigh forward, shin down, and the hips *drop* to seat height. */
export function poseSeated(group, seatHeight = 0.44){
  group.userData.limbs.forEach(l => {
    if(l.userData.isLeg){
      l.rotation.x = -1.45;
      if(l.userData.knee) l.userData.knee.rotation.x = 1.45;
    }
    if(l.userData.isArm) l.rotation.x = -0.45;
  });
  if(group.userData.torso) group.userData.torso.rotation.x = 0.1;
  group.position.y -= seatHeight * group.scale.y;
}

/** One frame of the walk cycle. Stride rate follows actual speed. */
export function stepGait(body, phase, speed){
  const swing = Math.min(0.5, Math.max(0.14, speed * 0.40));
  const s1 = Math.sin(phase) * swing, s2 = -s1;
  body.userData.limbs.forEach(l => {
    if(l.userData.isLeg){
      const sw = l.userData.side === -1 ? s1 : s2;
      l.rotation.x = sw;
      if(l.userData.knee) l.userData.knee.rotation.x = Math.max(0, -sw) * 0.9;
    } else {
      l.rotation.x = (l.userData.side === -1 ? s2 : s1) * 0.62;
    }
  });
  // Counter-rotating torso is what makes a walk read as human.
  if(body.userData.torso) body.userData.torso.rotation.y = -Math.sin(phase) * 0.10;
  if(body.userData.head) body.userData.head.rotation.y = Math.sin(phase) * 0.06;
  return Math.abs(Math.sin(phase)) * 0.03;      // vertical bob
}

/** Standing still is not standing frozen: weight shifts, arms settle. */
export function idleSway(body, sway, seated = false){
  const s = Math.sin(sway);
  if(body.userData.torso) body.userData.torso.rotation.y = s * 0.045;
  if(seated) return;
  body.userData.limbs?.forEach(l => {
    if(l.userData.isLeg) l.rotation.x = l.userData.side === -1 ? s * 0.035 : -s * 0.035;
    else l.rotation.x = (l.userData.side === -1 ? -s : s) * 0.05;
  });
}
