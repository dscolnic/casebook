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
  eye:   new THREE.SphereGeometry(0.017, 8, 6),
  nose:  new THREE.BoxGeometry(0.026, 0.042, 0.032),
  mouth: new THREE.BoxGeometry(0.046, 0.010, 0.013),
};

/**
 * A face, in head-local units — the head sphere is r = 0.115 with +Z forward,
 * before the head's own (1, 1.26, 1.06) scale is applied.
 *
 * There was no face at all, which is most of why a walking person read as a
 * mannequin: with no eyes there is nothing to tell you which way they are
 * looking, so a body turning to face its direction of travel communicates
 * nothing. Six small parts is enough at conversation distance and cheap enough
 * for the extras, who get them merged into their single upper-body mesh.
 */
export const FACE = [
  { geo: 'eye',   at: [-0.040,  0.020, 0.112], tint: 'eye' },
  { geo: 'eye',   at: [ 0.040,  0.020, 0.112], tint: 'eye' },
  // No brows: the hair cap's rim sits at head-local y ≈ 0.022, level with the
  // top of the eyes, so a brow is covered on every character who has hair. An
  // invisible mesh on 49 people is pure cost.
  { geo: 'nose',  at: [ 0.000, -0.006, 0.124], tint: 'skin' },
  { geo: 'mouth', at: [ 0.000, -0.058, 0.112], tint: 'mouth' },
];

/** Face colours derived from the look, so they never clash with the skin. */
export function faceTints(look){
  const dark = (hex, f) => {
    const c = new THREE.Color(hex);
    c.multiplyScalar(f);
    return c.getHex();
  };
  return {
    eye: 0x241c17,
    hair: look.hair,
    skin: dark(look.skin, 0.94),
    mouth: dark(look.skin, 0.62),
  };
}

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
    legPivot.userData = { isLeg: true, side, knee, shoe };
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

  // Counter-scaled, so the head's own stretch does not smear the features.
  const face = new THREE.Group();
  face.scale.set(1, 1 / 1.26, 1 / 1.06);
  const tints = faceTints(look);
  for(const part of FACE){
    const m = new THREE.Mesh(G[part.geo], bodyMat(tints[part.tint], part.tint === 'eye' ? 0.35 : 0.85));
    m.position.set(part.at[0], part.at[1], part.at[2]);
    face.add(m);
  }
  head.add(face);

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
  // The head was pushed pre-scaled, so face parts follow the same transform.
  const tints = faceTints(look);
  for(const part of FACE){
    push(G[part.geo], bodyMat(tints[part.tint], part.tint === 'eye' ? 0.35 : 0.85),
      { x: part.at[0], y: 1.63 + part.at[1] * 1.26, z: part.at[2] });
  }
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

// Hip pivot to sole, at nominal scale: 0.88 (hip) - 0.44 (knee) - 0.40 (ankle).
export const LEG_LENGTH = 0.84;

/**
 * How far the body travels per full walk cycle, for a given leg swing.
 *
 * At heel strike the two feet are `2·L·sin(A)` apart — that is one step — and a
 * full cycle is two steps. Everything below is derived from this identity, which
 * is the thing the old gait did not do: it swung the legs by an amplitude
 * proportional to speed while advancing the body by a *fixed* 0.74 m stride, so
 * the feet travelled about twice as far as the ground did. That mismatch is
 * exactly what reads as "the legs are moving but they are not taking him
 * anywhere" — the feet skate, and no amount of torso sway hides it.
 */
export function strideFor(speed){
  // Real walking raises step length and cadence together. Both are clamped so a
  // dawdling NPC does not mince and a hurrying one does not do the splits.
  const step = Math.min(0.80, Math.max(0.30, 0.42 + 0.30 * speed));
  const swing = Math.asin(Math.min(0.95, step / (2 * LEG_LENGTH)));
  return { step, swing, cycleDistance: 2 * step };
}

/** Radians of phase for one frame at this speed. Pair with stepGait. */
export function gaitAdvance(speed, delta){
  const { cycleDistance } = strideFor(speed);
  return (speed * delta / cycleDistance) * Math.PI * 2;
}

/**
 * One frame of the walk cycle, in the body's own local space (+Z is forward).
 *
 * Phase convention: `theta = A·sin(phase)` is the leg angle, positive = behind
 * the body. So phase π/2 is toe-off (leg fully back), 3π/2 is heel strike (leg
 * fully forward), and 0 and π are mid-stance with the legs together.
 *
 * Returns the vertical offset for the body — the pelvis *drops* when the legs
 * are apart, because the leg is a longer hypotenuse than it is a vertical. The
 * old version raised it instead, which put the bounce exactly out of phase with
 * the step and made the walk look like wading.
 */
export function stepGait(body, phase, speed){
  const { swing } = strideFor(speed);
  const lead = Math.sin(phase);
  body.userData.limbs.forEach(l => {
    const opposed = l.userData.side === -1 ? lead : -lead;
    if(l.userData.isLeg){
      const theta = opposed * swing;
      l.rotation.x = theta;
      // The knee is straight at heel strike and at toe-off, and flexes through
      // mid-swing so the foot clears the ground. Bending it at full extension —
      // which is what Math.max(0, -theta) did — is the opposite of a stride.
      const swingPhase = l.userData.side === -1 ? phase : phase + Math.PI;
      const bend = Math.max(0, -Math.cos(swingPhase));
      if(l.userData.knee) l.userData.knee.rotation.x = bend * 1.15;
      // Hold the sole roughly level instead of letting it point wherever the
      // leg happens to aim.
      if(l.userData.shoe) l.userData.shoe.rotation.x = -theta - bend * 1.15 * 0.55;
    } else {
      l.rotation.x = -opposed * swing * 0.55;      // arms oppose the same-side leg
    }
  });
  if(body.userData.torso) body.userData.torso.rotation.y = -lead * 0.10;
  if(body.userData.head) body.userData.head.rotation.y = lead * 0.05;
  // Pelvis height: L·cos(theta) is shorter than L whenever the leg is swung out.
  return -LEG_LENGTH * (1 - Math.cos(swing)) * Math.abs(lead);
}

/** Standing still is not standing frozen: weight shifts, arms settle. */
export function idleSway(body, sway, seated = false){
  const s = Math.sin(sway);
  if(body.userData.torso) body.userData.torso.rotation.y = s * 0.045;
  if(seated) return;
  body.userData.limbs?.forEach(l => {
    if(l.userData.isLeg){
      l.rotation.x = l.userData.side === -1 ? s * 0.035 : -s * 0.035;
      // Standing still means knees straight and soles flat; without this a
      // person who stops mid-stride keeps the bent knee for ever.
      if(l.userData.knee) l.userData.knee.rotation.x = 0;
      if(l.userData.shoe) l.userData.shoe.rotation.x = 0;
    } else {
      l.rotation.x = (l.userData.side === -1 ? -s : s) * 0.05;
    }
  });
}
