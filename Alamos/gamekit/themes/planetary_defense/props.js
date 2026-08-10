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
import { MATERIALS, cyl, box, post } from '../../engine/world/kit.js';

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
export function decorate(scene, ctx){
  const { groundHeight, softColliders, lightPanels } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const soft = (s) => { if(s) softColliders.push(s); };
  const glow = (m) => { if(m) lightPanels.push(m); };

  // ------------------------------------------------------------ the domes
  // Sat on top of the two buildings that carry telescopes, facing the open
  // sky over the drop rather than back at the ridge.
  const d1 = dome(scene, -30, -150, y(-30, -150) + 7.0, 12.5, { facing: Math.PI * 0.15 });
  const d2 = dome(scene, 34, -96, y(34, -96) + 6.0, 9.5, { facing: -Math.PI * 0.2 });
  soft(d1.soft); soft(d2.soft);
  glow(d1.glow.material ? d1.glow : null);

  // ------------------------------------------------------------- the dish
  // Off the end of the radar spur, well clear of everything optical.
  soft(dish(scene, 76, 132, y(76, 132), 15));

  // ------------------------------------------------- red road lighting
  // Every fifty metres, alternating sides, all the way up the ridge. This is
  // the only lighting on the road and it is deliberately dim: the whole point
  // of a mountain site is that nothing here spills light upward.
  for(let i = 0; i < 8; i++){
    const z = 100 - i * 46;
    const x = i % 2 ? 8 : -8;
    const l = redLamp(scene, x, z, y(x, z));
    soft(l.soft); glow(l.glow);
  }

  // ------------------------------------------------------- infrastructure
  cableTray(scene, -20, -140, -20, -50, y(-20, -100));
  cableTray(scene, 22, -86, 22, 0, y(22, -40));
  cableTray(scene, 22, 30, 40, 118, y(30, 70));

  // The drop is on the east side all the way down the ridge.
  guardRail(scene, 13, -170, 100, y(13, 0));
}

export default decorate;

// The interior hooks the shared floor builder would call. This game is
// outdoors, so they are here only so the manifest can export the same three
// names whichever world it uses.
export function fitOutRoom(){}
export function fitOutSpine(){}
