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
  // Protective equipment. A hood is a second head, a visor is a shell segment
  // across the front of it — three.js measures phi from +X toward +Z, so
  // phiStart = π/2 - half puts the middle of the segment on +Z, which is the
  // face — and a mask is a box over the nose and mouth.
  hood:   new THREE.SphereGeometry(0.132, 14, 12),
  visor:  new THREE.SphereGeometry(0.138, 14, 10, Math.PI / 2 - 0.62, 1.24, 0.72, 0.86),
  mask:   new THREE.BoxGeometry(0.125, 0.085, 0.035),
  filter: new THREE.CylinderGeometry(0.036, 0.036, 0.055, 8),
  vent:   new THREE.BoxGeometry(0.10, 0.06, 0.05),
  // A life-support pack, worn on the back. `accessory` could draw one, but only
  // on the articulated rig: the crowd never passes that opt and the merged
  // extras never see it, so a named person would carry air and the twenty
  // people around them would not.
  pack:   new THREE.BoxGeometry(0.30, 0.40, 0.17),
  hose:   new THREE.BoxGeometry(0.045, 0.24, 0.045),
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
 * Protective equipment, in body-local space — the same list for the articulated
 * rig and for the merged extras, so a crowd in PPE is a crowd in PPE at both
 * tiers. An outfit asks for it by carrying the colour:
 *
 *   hood    a suit hood over the whole head. Hides hair and cap; a hood with
 *           hair sticking through it is the first thing anybody notices.
 *   visor   a face shield across the front — a shell segment, not a plane, so
 *           it reads as curved from three-quarters on.
 *   mask    over nose and mouth. `filter` adds the canister that turns a
 *           surgical mask into a respirator.
 *   pack    a life-support pack on the back, with hoses over the shoulders.
 *           A hood and a pack together are a pressure suit, which is what
 *           anybody outdoors on Mars is wearing and the reason Red Sand has no
 *           dome over it.
 *
 * The head sits at y = 1.63 with its own (1, 1.26, 1.06) scale, so everything
 * here is sized against that and not against the bare sphere.
 */
export function ppeParts(outfit){
  const parts = [];
  if(!outfit) return parts;
  if(outfit.hood){
    parts.push({ geo: 'hood', hex: outfit.hood, rough: 0.86,
      pos: [0, 1.638, 0], scale: [1.12, 1.30, 1.14] });
    // The suit closes at the shoulders, not at the chin: a collar ring is what
    // stops a hood reading as a helmet resting on somebody's neck.
    parts.push({ geo: 'collar', hex: outfit.hood, rough: 0.88,
      pos: [0, 1.475, 0], scale: [1.0, 1.1, 1.6] });
  }
  if(outfit.visor){
    parts.push({ geo: 'visor', hex: outfit.visor, rough: 0.18,
      pos: [0, 1.645, 0.004], scale: [1.06, 1.10, 1.12] });
  }
  if(outfit.pack){
    parts.push({ geo: 'pack', hex: outfit.pack, rough: 0.72,
      pos: [0, 1.22, -0.165], scale: [1, 1, 1] });
    // Two hoses over the shoulders into the hood, which is what says the pack
    // is breathing apparatus rather than a rucksack.
    for(const side of [-1, 1]){
      parts.push({ geo: 'hose', hex: outfit.pack, rough: 0.8,
        pos: [side * 0.12, 1.42, -0.05], scale: [1, 1, 1] });
    }
  }
  if(outfit.mask){
    parts.push({ geo: 'mask', hex: outfit.mask, rough: 0.9,
      pos: [0, 1.588, 0.112], scale: [1, 1, 1] });
    if(outfit.filter){
      parts.push({ geo: 'filter', hex: outfit.filter, rough: 0.7,
        pos: [0.052, 1.575, 0.145], scale: [1, 1, 1], rotX: Math.PI / 2 });
      parts.push({ geo: 'vent', hex: outfit.filter, rough: 0.7,
        pos: [-0.052, 1.578, 0.132], scale: [1, 1, 1] });
    }
  }
  return parts;
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
    // An outfit may ask for a hood and a shell directly. The crowd never passes
    // these opts — so `kind: 'lead'` promised an overcoat in every theme's
    // outfits.js and delivered one nowhere — and a theme whose people are
    // outdoors at forty below needs to be able to say so.
    cap: outfit.cap !== undefined
      ? !!outfit.cap
      : (!!opts.cap && srand() < (opts.capChance ?? 0.35)),
    badge: outfit.badge !== undefined
      ? (!!outfit.badge && !child)
      : (opts.badge !== false && !child),
    overcoat: outfit.overcoat !== undefined ? !!outfit.overcoat : !!opts.overcoat,
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
    //
    // It covered the top 46 per cent of the arm and nothing else, which is a
    // short sleeve — every person in every game was in a t-shirt, which is fine
    // in a hospital and wrong at forty below. An outfit can now say how far down
    // the sleeve goes, and a parka takes the whole arm with a mitt on the end.
    const reach = look.outfit.sleeve ?? (look.overcoat ? 1 : 0.46);
    const sleeveMat = look.overcoat
      ? bodyMat(look.outfit.coat ?? look.outfit.top, 0.88)
      : topMat;
    const sleeve = new THREE.Mesh(G.arm, sleeveMat);
    // The sleeve hangs from the shoulder, so its centre moves down as it grows.
    sleeve.position.y = -0.285 * reach;
    sleeve.scale.set(1.16, reach, 1.16);
    armPivot.add(arm, sleeve);
    if(reach >= 0.95){
      // A mitt, because a full sleeve that stops at the wrist leaves a bare
      // hand, which is the detail that gives the whole figure away.
      const mitt = new THREE.Mesh(G.head, sleeveMat);
      mitt.position.y = -0.60;
      mitt.scale.set(0.42, 0.42, 0.42);
      armPivot.add(mitt);
    }
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

  const ppe = ppeParts(look.outfit);
  for(const p of ppe){
    const m = new THREE.Mesh(G[p.geo], bodyMat(p.hex, p.rough));
    m.position.set(p.pos[0], p.pos[1], p.pos[2]);
    m.scale.set(p.scale[0], p.scale[1], p.scale[2]);
    if(p.rotX) m.rotation.x = p.rotX;
    m.castShadow = true;
    group.add(m);
  }

  if(look.outfit.hood){
    // Nothing on top of a hood.
  } else if(look.cap){
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
  // The shell, if this outfit has one. The cheap rig skipped it, so every
  // anonymous extra stood in the crowd in shirtsleeves while the named people
  // beside them wore parkas — visible from the first screenshot of a camp.
  const coatMat = bodyMat(look.outfit.coat ?? look.outfit.top, 0.88);
  if(look.overcoat){
    push(G.torso, coatMat, { x: 0, y: 1.12, z: 0 },
      { x: look.shoulders * 1.1, y: 1.22, z: 1.14 });
  }
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
  const reach = look.outfit.sleeve ?? (look.overcoat ? 1 : 0.46);
  const sleeveMat = look.overcoat ? coatMat : topMat;
  for(const side of [-1, 1]){
    const ax = side * 0.245 * look.shoulders;
    push(G.arm, skinMat, { x: ax, y: 1.115, z: 0 });
    // The sleeve hangs from the shoulder at 1.40, so its centre drops as it
    // lengthens — the same arithmetic the articulated rig does.
    push(G.arm, sleeveMat, { x: ax, y: 1.40 - 0.285 * reach, z: 0 },
      { x: 1.16, y: reach, z: 1.16 });
    if(reach >= 0.95){
      push(G.head, sleeveMat, { x: ax, y: 0.80, z: 0 }, { x: 0.42, y: 0.42, z: 0.42 });
    }
  }
  // The same PPE the articulated rig wears, merged in. An extra in shirtsleeves
  // standing beside a named person in a suit is the crowd giving the game away.
  for(const p of ppeParts(look.outfit)){
    const g = G[p.geo].clone();
    if(p.rotX) g.rotateX(p.rotX);
    g.scale(p.scale[0], p.scale[1], p.scale[2]);
    g.translate(p.pos[0], p.pos[1], p.pos[2]);
    geos.push(g); mats.push(bodyMat(p.hex, p.rough));
  }

  if(look.outfit.hood){ /* nothing goes on top of a hood */ }
  else if(look.cap) push(G.cap, bodyMat(look.outfit.top, 0.92), { x: 0, y: 1.685, z: 0 }, { x: 1.08, y: 1.05, z: 1.08 });
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
