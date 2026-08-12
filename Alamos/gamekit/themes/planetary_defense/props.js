// props.js — what makes Cerro Alto an observatory and not a business park.
//
// The engine's `kit.js` gives generic buildings, benches, posts and signs, and
// `site.js` places them. Everything in this file is the vocabulary that only
// this game has: telescope domes with open shutters, a steerable radar dish,
// red service lamps, cable trays, and the guard rail along the drop.
//
// Rules this file obeys, each of which cost somebody hours to learn:
//   · placement helpers take (x, z, y) — ground LAST;
//   · nothing goes within ten metres of the spawn;
//   · no real lights. This is a night scene and the temptation to light it with
//     point lights is exactly how a floor went from 118 fps to 20. Everything
//     that glows here is an emissive material.
import * as THREE from 'three';
import { MATERIALS, cyl, box, post, vehicle } from '../../engine/world/kit.js';
import { flyable } from '../../engine/world/flying.js';
import { driveable } from '../../engine/world/driving.js';
import { PADS } from './site.js';

/** Red service lighting. Emissive only — never a real light. */
const RED = 0xd8321c;

function redLamp(scene, x, z, y, height = 3.6){
  const p = post(scene, x, z, y, height, 0.09, 0x33333a);
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 12, 8),
    new THREE.MeshStandardMaterial({ color: RED, emissive: RED, emissiveIntensity: 1.6, roughness: 0.5 }));
  head.position.set(x, y + height, z);
  scene.add(head);
  return { soft: p, glow: head };
}

/**
 * A telescope dome: a drum, a hemisphere, and the shutter standing open with
 * the tube visible inside it.
 *
 * The shutter is the whole silhouette. A closed dome is a grain silo; an open
 * one, with a slot of darker sky and a tube pointing out of it, is unmistakably
 * a telescope even at two hundred metres in the dark.
 */
function dome(scene, x, z, y, r, opts = {}){
  const facing = opts.facing ?? 0;
  const shell = new THREE.MeshStandardMaterial({
    color: 0xb9bcc0, roughness: 0.55, metalness: 0.35, envMapIntensity: 0.45,
  });
  // Drum
  const drum = cyl(scene, r, r * 0.42, x, y + r * 0.21, z, shell);
  // Hemisphere, open at the bottom
  const cap = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), shell);
  cap.position.set(x, y + r * 0.42, z);
  cap.castShadow = true; cap.receiveShadow = true;
  scene.add(cap);

  // The shutter opening: a dark wedge cut across the cap, made by two panels
  // standing proud of it with the gap between them.
  const gap = r * 0.30;
  const panel = new THREE.MeshStandardMaterial({ color: 0x8f9296, roughness: 0.6, metalness: 0.3 });
  for(const s of [-1, 1]){
    const p = new THREE.Mesh(new THREE.BoxGeometry(r * 0.5, r * 0.9, 0.28), panel);
    p.position.set(x + Math.sin(facing) * 0, y + r * 0.42 + r * 0.5, z + Math.cos(facing) * 0);
    p.position.x += Math.cos(facing) * s * (gap + r * 0.25);
    p.rotation.y = facing;
    scene.add(p);
  }
  // The slot itself — a dark face so the opening reads as a hole rather than a
  // seam. Single-sided: text and arrows are not the only things that render
  // mirrored from behind, a dark face on DoubleSide reads as a black wall from
  // inside the dome.
  const slot = new THREE.Mesh(
    new THREE.PlaneGeometry(gap * 2, r * 1.5),
    new THREE.MeshBasicMaterial({ color: 0x07080c, side: THREE.FrontSide }));
  slot.position.set(x + Math.sin(facing) * (r * 0.99), y + r * 0.42 + r * 0.42, z + Math.cos(facing) * (r * 0.99));
  slot.rotation.y = facing;
  scene.add(slot);

  // The tube, leaning out of the slot.
  const tube = new THREE.Mesh(
    new THREE.CylinderGeometry(r * 0.17, r * 0.19, r * 1.25, 16),
    new THREE.MeshStandardMaterial({ color: 0x2f3238, roughness: 0.5, metalness: 0.5 }));
  tube.position.set(x + Math.sin(facing) * r * 0.35, y + r * 0.42 + r * 0.62, z + Math.cos(facing) * r * 0.35);
  tube.rotation.set(-0.5, facing, 0);
  tube.castShadow = true;
  scene.add(tube);

  // A red lamp on the drum, which is how these are actually lit at night.
  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 10, 8),
    new THREE.MeshStandardMaterial({ color: RED, emissive: RED, emissiveIntensity: 1.5, roughness: 0.5 }));
  lamp.position.set(x + Math.cos(facing) * (r + 0.2), y + r * 0.34, z - Math.sin(facing) * (r + 0.2));
  scene.add(lamp);

  return { drum, cap, glow: lamp, soft: { x, z, r: r + 0.4 } };
}

/**
 * The planetary radar: a parabolic dish on an alt-azimuth mount, tipped toward
 * the horizon the way one is when it is tracking something low.
 *
 * A LatheGeometry parabola rather than a sphere section — a dish's profile is
 * the recognisable part, and a hemisphere reads as a bowl.
 */
function dish(scene, x, z, y, R = 15){
  const steel = new THREE.MeshStandardMaterial({
    color: 0xc3c6c9, roughness: 0.45, metalness: 0.6, envMapIntensity: 0.5, side: THREE.DoubleSide,
  });
  const pts = [];
  for(let i = 0; i <= 16; i++){
    const t = i / 16;
    pts.push(new THREE.Vector2(t * R, (t * R) * (t * R) / (2.6 * R)));   // y = r²/(4f)
  }
  const face = new THREE.Mesh(new THREE.LatheGeometry(pts, 40), steel);

  const rig = new THREE.Group();
  rig.add(face);
  // Feed on a quadrupod at the focus.
  const feed = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.7, 1.8, 10),
    new THREE.MeshStandardMaterial({ color: 0x3a3d42, roughness: 0.5, metalness: 0.5 }));
  feed.position.y = R * 0.62;
  rig.add(feed);
  for(const a of [0, Math.PI / 2, Math.PI, -Math.PI / 2]){
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, R * 0.68, 6),
      new THREE.MeshStandardMaterial({ color: 0x6f7276, roughness: 0.5, metalness: 0.6 }));
    leg.position.set(Math.cos(a) * R * 0.55, R * 0.3, Math.sin(a) * R * 0.55);
    leg.rotation.z = Math.cos(a) * -0.7;
    leg.rotation.x = Math.sin(a) * 0.7;
    rig.add(leg);
  }
  // Tipped up 40°, and turned to look off the ridge.
  rig.rotation.x = -Math.PI / 2 + 0.7;
  rig.rotation.z = 0.5;
  rig.position.set(x, y + R * 0.95, z);
  scene.add(rig);

  // Mount: a fat cylinder and a yoke.
  cyl(scene, 2.6, R * 0.75, x, y + R * 0.37, z, MATERIALS.concrete());
  for(const s of [-1, 1]){
    box(scene, 1.0, R * 0.5, 1.0, x + s * 3.4, y + R * 0.72, z, MATERIALS.steel());
  }
  return { soft: { x, z, r: R * 0.55 } };
}

/** A run of cable tray on short legs, which is how a mountain site is wired. */
function cableTray(scene, x0, z0, x1, z1, y, height = 0.75){
  const len = Math.hypot(x1 - x0, z1 - z0);
  const mid = { x: (x0 + x1) / 2, z: (z0 + z1) / 2 };
  const ang = Math.atan2(x1 - x0, z1 - z0);
  const tray = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, len),
    new THREE.MeshStandardMaterial({ color: 0x55585c, roughness: 0.7, metalness: 0.4 }));
  tray.position.set(mid.x, y + height, mid.z);
  tray.rotation.y = ang;
  scene.add(tray);
  const n = Math.max(2, Math.round(len / 9));
  for(let i = 0; i <= n; i++){
    const t = i / n;
    cyl(scene, 0.06, height, x0 + (x1 - x0) * t, y + height / 2, z0 + (z1 - z0) * t, MATERIALS.steel());
  }
}

/** Guard rail along the drop, which is the only thing between the road and it. */
function guardRail(scene, x, z0, z1, y){
  const n = Math.max(2, Math.round(Math.abs(z1 - z0) / 6));
  for(let i = 0; i <= n; i++){
    const z = z0 + (z1 - z0) * (i / n);
    cyl(scene, 0.07, 1.05, x, y + 0.52, z, MATERIALS.steel());
  }
  const len = Math.abs(z1 - z0);
  const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.09, len),
    new THREE.MeshStandardMaterial({ color: 0x8c9095, roughness: 0.5, metalness: 0.6 }));
  rail.position.set(x, y + 1.0, (z0 + z1) / 2);
  scene.add(rail);
}

/**
 * Called by engine/world/outdoorTown.js once the ground, buildings and street
 * furniture exist.
 */

// --------------------------------------------------------------- landing pads
/**
 * A pad: a painted circle, a ring of low blue lights, and a white strobe on a
 * mast beside it. The strobe is the only thing on this range visible from the
 * next summit, so it is what the player navigates by.
 *
 * Nothing here is a real light. Six point lights is the engine's ceiling and
 * the sun rig takes three; these are emissive discs, which read as lights at
 * night and cost nothing.
 */
function helipad(scene, x, z, y, { r = 11 } = {}){
  const g = new THREE.Group();
  g.position.set(x, y + 0.02, z);
  scene.add(g);

  const deck = new THREE.Mesh(new THREE.CircleGeometry(r, 40),
    new THREE.MeshStandardMaterial({ color: 0x1e2126, roughness: 0.95 }));
  deck.rotation.x = -Math.PI / 2;
  deck.receiveShadow = true;
  g.add(deck);

  // The H, in paint that has been rained on for years.
  const paint = new THREE.MeshStandardMaterial({ color: 0xb9bec4, roughness: 0.85,
    emissive: 0x2a2f36, emissiveIntensity: 0.35 });
  const bar = (w, d, ox) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), paint);
    m.rotation.x = -Math.PI / 2;
    m.position.set(ox, 0.03, 0);
    g.add(m);
  };
  bar(0.9, r * 0.85, -r * 0.28);
  bar(0.9, r * 0.85, r * 0.28);
  const cross = new THREE.Mesh(new THREE.PlaneGeometry(r * 0.56, 0.9), paint);
  cross.rotation.x = -Math.PI / 2;
  cross.position.y = 0.03;
  g.add(cross);

  // Perimeter lights. Blue, low, and close together — they only resolve from
  // inside a couple of hundred metres, which is what makes the final approach
  // feel like an approach.
  const lamp = new THREE.MeshStandardMaterial({ color: 0x1b2b46, emissive: 0x2f6fd0,
    emissiveIntensity: 2.4, roughness: 0.5 });
  const lamps = [];
  for(let i = 0; i < 16; i++){
    const a = (i / 16) * Math.PI * 2;
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), lamp);
    m.position.set(Math.cos(a) * (r + 0.9), 0.24, Math.sin(a) * (r + 0.9));
    g.add(m);
    lamps.push(m);
  }

  // The strobe, on a mast clear of the rotor disc.
  // `post` takes its height, radius and colour POSITIONALLY. Called with an
  // options object it read the object as the height, built a cylinder of NaN
  // length, and three.js logged "Computed radius is NaN" once per pad — five
  // masts that were never drawn and five soft colliders that never existed.
  const mast = post(scene, x + r + 3.4, z, y, 7.5, 0.13, 0x33373d);
  const strobeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff,
    emissiveIntensity: 3.2, roughness: 0.3 });
  const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8), strobeMat);
  strobe.position.set(x + r + 3.4, y + 7.7, z);
  strobe.userData.ignoreAudit = true;
  scene.add(strobe);

  // `post` returns the soft collider itself — {x, z, r} — not a wrapper with a
  // `soft` field, so the old `mast?.soft` was always undefined.
  return { group: g, strobe: strobeMat, lamps: lamp, soft: mast };
}

// ---------------------------------------------------------------- the aircraft
/**
 * A light utility helicopter. Modelled nose-along -z, which is the direction
 * `flying.js` flies, so no wrapper is needed.
 */
function helicopter(scene, x, z, y, { facing = 0 } = {}){
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);

  const shell = new THREE.MeshStandardMaterial({ color: 0x2c3742, roughness: 0.55, metalness: 0.35 });
  const trim = new THREE.MeshStandardMaterial({ color: 0xb4552a, roughness: 0.6 });

  // Cabin: a rounded body with the nose down the -z axis.
  const cabin = new THREE.Mesh(new THREE.SphereGeometry(1.55, 16, 12), shell);
  cabin.scale.set(1.0, 0.92, 1.65);
  cabin.position.set(0, 1.75, -0.9);
  cabin.castShadow = true;
  g.add(cabin);

  // Glass, forward and low, so the pilot is looking down at the ground.
  const glass = new THREE.Mesh(new THREE.SphereGeometry(1.42, 14, 10,
    0, Math.PI * 2, 0, Math.PI * 0.55), MATERIALS.glass());
  glass.scale.set(0.98, 0.9, 1.2);
  glass.rotation.x = Math.PI * 0.92;
  glass.position.set(0, 1.62, -2.05);
  g.add(glass);

  // Tail boom and fin. `cyl` is (scene, r, h, x, y, z, material, rTop) — called
  // as (r, rTop, h, …) it took the *material* as the z and the taper radius as the
  // material, and built a cylinder with a NaN radius: three.js logged "Computed
  // radius is NaN" and the boom and both skid rails were never drawn.
  const boom = cyl(g, 0.30, 5.4, 0, 2.05, 2.9, shell, 0.18);
  if(boom) boom.rotation.x = Math.PI / 2;
  box(g, 0.12, 1.5, 0.9, 0, 2.7, 5.2, trim);

  // Skids.
  for(const sx of [-1.15, 1.15]){
    const rail = cyl(g, 0.09, 4.4, sx, 0.22, -0.6, shell);
    if(rail) rail.rotation.x = Math.PI / 2;
    box(g, 0.12, 0.9, 0.12, sx, 0.7, -1.9, shell);
    box(g, 0.12, 0.9, 0.12, sx, 0.7, 0.7, shell);
  }

  // Rotors. Thin plates rather than blades: at 26 rad/s nobody sees geometry.
  const mainRotor = new THREE.Group();
  mainRotor.position.set(0, 3.35, -0.6);
  for(let i = 0; i < 4; i++){
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 9.2), shell);
    blade.rotation.y = (i / 4) * Math.PI * 2;
    mainRotor.add(blade);
  }
  g.add(mainRotor);
  const tailRotor = new THREE.Group();
  tailRotor.position.set(0.42, 2.7, 5.2);
  for(let i = 0; i < 3; i++){
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.9, 0.22), shell);
    blade.rotation.x = (i / 3) * Math.PI * 2;
    tailRotor.add(blade);
  }
  g.add(tailRotor);

  // Landing light: a cone of emissive geometry under the nose, switched on by
  // `flying.js` when somebody climbs in. Not a real light — the engine's budget
  // is six and the sun rig has three of them.
  const beamMat = new THREE.MeshBasicMaterial({ color: 0xffe9c4, transparent: true,
    opacity: 0.14, depthWrite: false });
  const beam = new THREE.Mesh(new THREE.ConeGeometry(7.5, 26, 14, 1, true), beamMat);
  beam.position.set(0, 1.2, -9);
  beam.rotation.x = -Math.PI / 2.35;
  beam.visible = false;
  beam.userData.ignoreAudit = true;
  g.add(beam);

  // Anti-collision light on the belly, always on: it is how you find the
  // machine again on a dark pad.
  const acl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6),
    new THREE.MeshStandardMaterial({ color: 0x3a0d0d, emissive: 0xd8261f, emissiveIntensity: 3.0 }));
  acl.position.set(0, 0.62, 0.4);
  g.add(acl);

  return { group: g, rotors: { main: mainRotor, tail: tailRotor }, light: beam };
}

export function decorate(scene, ctx){
  const { groundHeight, softColliders, lightPanels, colliders, interactables } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const soft = (s) => { if(s) softColliders.push(s); };
  const glow = (m) => { if(m) lightPanels.push(m); };

  // ------------------------------------------------------------ the domes
  // Each on its own summit, thirteen hundred metres apart, which is the whole
  // reason this site is shaped the way it is: two optical instruments that can
  // see each other's lights are two instruments working at half sensitivity.
  // These coordinates are DISC and CHAR in site.js. Move a dome there and it has
  // to move here, or the shell and the shutter part company.
  const d1 = dome(scene, -725, -620, y(-725, -620) + 7.0, 12.5, { facing: Math.PI * 0.15 });
  const d2 = dome(scene, 590, -510, y(590, -510) + 6.0, 9.5, { facing: -Math.PI * 0.2 });
  soft(d1.soft); soft(d2.soft);
  glow(d1.glow?.material ? d1.glow : null);

  // ------------------------------------------------------------- the dish
  // Out on the basin floor, thirty metres of it, pointed up at nothing yet.
  soft(dish(scene, -965, 350, y(-965, 350), 15));

  // -------------------------------------------------- base camp lighting
  // Red, dim, and only where people walk at night. Nothing on this range
  // spills light upward if it can be helped.
  for(let i = 0; i < 6; i++){
    const z = 96 - i * 40;
    const x = i % 2 ? 8 : -8;
    const l = redLamp(scene, x, z, y(x, z));
    soft(l.soft); glow(l.glow);
  }

  // ------------------------------------------------------- infrastructure
  cableTray(scene, -22, -30, -22, 60, y(-22, 20));
  cableTray(scene, 24, -40, 24, 30, y(24, 0));
  guardRail(scene, 22, -30, 90, y(22, 20));

  // --------------------------------------------------------- landing pads
  // One per site, lit. These are the navigation system: the strobes are
  // visible from the next summit and nothing else out there is.
  for(const p of PADS){
    const pad = helipad(scene, p.x, p.z, y(p.x, p.z), { r: p.r });
    glow(pad.strobe); glow(pad.lamps);
    soft(pad.soft);
  }

  // --------------------------------------------------------- the site truck
  // The aircraft is not signed out until the fourth phase (`aircraftFromDay` in
  // theme.js), and the first phase already sends the player to Cerro Alto — so
  // there has to be a way across the range on the ground. There is no graded road
  // up either summit; this is a four-wheel-drive on scree, which is what the
  // people who work here actually use, and it stays useful after the aircraft
  // arrives because a 900-metre hop is not worth spinning up a rotor for.
  //
  // Parked on the road shoulder fifteen metres from the spawn — in view on the
  // first frame, because a vehicle the player has to go looking for is a vehicle
  // they walk the range without. Not closer: a prop within ten metres of the
  // spawn is how a player ends up welded in place.
  // West side of the road, not east: the campaign status board stands at (8, 62)
  // and a truck parked behind it is a truck the player never sees.
  const truck = vehicle(scene, -14, 46, y(-14, 46), { facing: 0, colour: 0x8a5a2c, box: false });
  driveable(scene, truck.group, {
    id: 'site-truck',
    label: 'site truck',
    halfWidth: 1.25, halfLength: 2.9, height: 3.0,
    // In the cab, on the left, looking out over the bonnet — not behind the load,
    // which puts the whole vehicle between the driver and the road.
    seat: { x: 0.52, y: 2.18, z: truck.cabZ },
    wheels: truck.wheels,
    // Faster than the town trucks in the other games: this is a mountain range
    // and the shortest leg on it is 780 metres.
    topSpeed: 16,
    colliders, interactables,
  });

  // ----------------------------------------------------------- the aircraft
  // Parked on the base camp pad at the start of every shift. Without this the
  // five sites are five hours of walking, which is the version of this game
  // that existed before the range did.
  const home = PADS[0];
  const heli = helicopter(scene, home.x, home.z, y(home.x, home.z), { facing: Math.PI });
  flyable(scene, heli.group, {
    id: 'survey-helicopter',
    label: 'survey helicopter',
    rotors: heli.rotors,
    light: heli.light,
    seat: { x: 0, y: 1.9, z: -1.5 },
    halfWidth: 1.7, halfLength: 5.4, height: 3.6,
    cruise: 34, ceiling: 140,
    colliders, interactables,
  });
}

export default decorate;

// The interior hooks the shared floor builder would call. This game is
// outdoors, so they are here only so the manifest can export the same three
// names whichever world it uses.
export function fitOutRoom(){}
export function fitOutSpine(){}
