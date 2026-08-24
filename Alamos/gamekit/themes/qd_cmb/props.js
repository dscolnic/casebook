// props.js — the objects unique to the hilltop antenna site.
//
// Everything generic — the huts, the signs, the benches, the posts, the scrub —
// is `engine/world/kit.js`, placed from site.js. This file is the six or so things
// that make this a radio site rather than a farm: the horn itself, its mount, the
// ground shield, the cable run down to the hut, and the newer dishes further along
// the ridge.
//
// Placement helpers take `(x, z, y)` — ground last. House rule 7.

import * as THREE from 'three';
import { box, cyl, crateStack, post, tank, VEHICLE_DRIVE, vehicle, clearSpot } from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';

/**
 * The horn: a rectangular funnel, twenty feet of it, wide end open to the sky and
 * narrow end down at the receiver.
 *
 * It is built as a run of tapering boxes rather than as a real funnel because the
 * silhouette is the whole of what matters at 1.4 m/s, and a swept surface here
 * costs geometry and reads identically. What has to be right is the taper and the
 * tilt: a horn lying flat is a gutter, and a horn standing vertical is a chimney.
 */
function horn(scene, { x, z, y, mats, tilt = 0.62, len = 6.4 }){
  const g = new THREE.Group();
  const n = 8;
  for(let i = 0; i < n; i++){
    const t = i / (n - 1);
    const w = 0.9 + t * 2.9;            // narrow at the throat, wide at the mouth
    const h = 0.7 + t * 2.4;
    box(g, w, h, len / n + 0.04, 0, 0, -len / 2 + (i + 0.5) * (len / n), mats.alum);
  }
  // The lip round the mouth, which is what makes it read as open rather than solid.
  box(g, 4.1, 0.14, 0.14, 0, 1.3, len / 2, mats.dark);
  box(g, 4.1, 0.14, 0.14, 0, -1.3, len / 2, mats.dark);
  for(const sx of [-1, 1]) box(g, 0.14, 2.7, 0.14, sx * 2.0, 0, len / 2, mats.dark);
  g.position.set(x, y + 3.2, z);
  g.rotation.x = -tilt;
  scene.add(g);
  return g;
}

/** The mount: a concrete pier, a horizontal axis, and a counterweight. */
function mount(scene, { x, z, y, mats }){
  box(scene, 3.0, 1.0, 3.0, x, y + 0.5, z, mats.concrete);
  for(const sx of [-1, 1]){
    box(scene, 0.4, 2.4, 0.4, x + sx * 1.15, y + 2.2, z, mats.steel);
  }
  cyl(scene, 0.22, 3.0, x, y + 3.2, z, mats.steel).rotation.z = Math.PI / 2;
  cyl(scene, 0.6, 0.5, x, y + 3.2, z + 2.6, mats.dark);
}

/** A run of cable on short trestles, from the throat of the horn to a hut. */
function cableRun(scene, { x0, z0, x1, z1, ground, mats }){
  const n = 6;
  for(let i = 0; i <= n; i++){
    const t = i / n;
    const x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t;
    const y = ground(x, z);
    box(scene, 0.3, 0.5, 0.3, x, y + 0.25, z, mats.concrete);
    if(i < n){
      const nx = x0 + (x1 - x0) * ((i + 1) / n), nz = z0 + (z1 - z0) * ((i + 1) / n);
      const len = Math.hypot(nx - x, nz - z);
      const run = box(scene, 0.16, 0.16, len, (x + nx) / 2, y + 0.55, (z + nz) / 2, mats.steel);
      run.lookAt(new THREE.Vector3(nx, ground(nx, nz) + 0.55, nz));
    }
  }
}

/** A small parabolic dish on a post: the newer instrument, further up the ridge. */
function dish(scene, { x, z, y, mats, r = 1.6, tilt = 0.5, facing = 0 }){
  const g = new THREE.Group();
  cyl(g, 0.16, 2.2, 0, 1.1, 0, mats.steel);
  const face = new THREE.Mesh(
    new THREE.SphereGeometry(r, 20, 12, 0, Math.PI * 2, 0, 0.45),
    mats.alum);
  face.rotation.x = Math.PI - tilt;
  face.position.set(0, 2.4, 0);
  g.add(face);
  cyl(g, 0.07, r * 0.9, 0, 2.4 + r * 0.45, 0, mats.dark);
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  return g;
}

export function decorate(scene, ctx){
  const { groundHeight, colliders, MATERIALS } = ctx;
  const std = (colour, roughness = 0.85, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color: colour, roughness, metalness });
  const mats = {
    // Weathered aluminium, not new. Under a bright sky IBL with ACES tone mapping a
    // light metal at low roughness blows out to white — house rule 6 — and the horn
    // and its shielding came out as a set of blank panels the first time.
    alum:     new THREE.MeshStandardMaterial({ color: 0x74797d, roughness: 0.55, metalness: 0.4,
      envMapIntensity: 0.4 }),
    steel:    std(0x6c7176, 0.5, 0.5),
    concrete: std(0x8d8a80, 0.95),
    dark:     std(0x2d3033, 0.9),
    canvas:   std(0x9a9078, 0.95),
  };
  // `ctx.MATERIALS` is deliberately not spread in: it is a map of factory
  // functions, and a function handed to three.js as a material renders as default
  // white. That mistake produced a row of bare white poles on another site.
  void MATERIALS; void std;

  /**
   * A solid box the player cannot walk into.
   *
   * The outdoor world's `colliders` is a list of `THREE.Box3` — it builds them
   * with `setFromObject` and `reachable.mjs` reads `c.min.x`. Pushing the interior
   * world's plain-number shape instead throws on the first ray a checker fires.
   */
  const hard = (x, z, w, d, h = 2) => {
    if(!colliders) return;
    const y = groundHeight(x, z);
    colliders.push(new THREE.Box3(
      new THREE.Vector3(x - w / 2, y, z - d / 2),
      new THREE.Vector3(x + w / 2, y + h, z + d / 2)));
  };

  // ---- the horn, on its mount, out on the grass well clear of every building.
  //
  // It was first put behind the antenna hut, which is correct for a real site and
  // wrong for this one: from anywhere on the track the hut is exactly in front of
  // it, so a player walking up to the thing the campaign is named after never sees
  // it. Only a screenshot says so. Out here it is visible from the whole west side
  // and from the spawn, and the hut is what you walk into rather than what you
  // walk round.
  const hx = -40, hz = -10;
  mount(scene, { x: hx, z: hz, y: groundHeight(hx, hz), mats });
  horn(scene, { x: hx, z: hz, y: groundHeight(hx, hz), mats });
  hard(hx, hz, 3.4, 3.4, 5.5);
  // The ground shield: a low fence of panels round the mouth, which is what stops
  // the horn collecting the hill it is standing on.
  for(let i = 0; i < 12; i++){
    const a = (i / 12) * Math.PI * 2;
    const sx = hx + Math.cos(a) * 6.5, sz = hz + Math.sin(a) * 6.5;
    box(scene, 1.9, 1.5, 0.12, sx, groundHeight(sx, sz) + 0.75, sz, mats.alum, a + Math.PI / 2);
  }

  // ---- the cable down to the receiver hut, which is the only thing connecting
  // the two halves of level one.
  cableRun(scene, { x0: hx + 7, z0: hz, x1: 4, z1: -8, ground: groundHeight, mats });

  // ---- the cold load's dewar outside the hut, and the crates it arrived in.
  tank(scene, 16, -6, groundHeight(16, -6), { r: 0.9, h: 2.0, colour: 0x8f959a });
  hard(16, -6, 2.0, 2.0, 2.0);
  crateStack(scene, 14, -2, groundHeight(14, -2), { rows: 2, colour: 0x7b6f52 });

  // ---- the newer instrument, further along the ridge: three dishes in a line,
  // which is what a building put here decades later looks like from the track.
  for(const [dx, dz, r] of [[36, -52, 1.6], [40, -46, 1.3], [33, -46, 1.3]]){
    dish(scene, { x: dx, z: dz, y: groundHeight(dx, dz), mats, r, facing: 0.4 });
    hard(dx, dz, 1.2, 1.2, 3.4);
  }

  // ---- posts marking the track, because the far end of it is eighty metres out.
  for(const z of [10, -6, -30, -54, -74]){
    post(scene, -6, z, groundHeight(-6, z), 1.5, 0.07, 0xb0a890);
  }

  transport(scene, ctx);
}
// ------------------------------------------------------------------ transport
/**
 * A Bell System service van and a staff car, which is 1964 on a hill in
 * Holmdel and is also the campaign's own geography.
 *
 * Two kinds because the site is two places. The horn and the receiver hut are a
 * few metres apart at the top of the hill and everything else — the spectrum
 * building, the theory room — is a long way up the ridge, which the site file
 * says is the chronology as geometry. The van is what brought the cold load, the
 * liquid helium and, eventually, the ladder for the pigeon trap; the car is how
 * two people get down to a building and back with an argument half settled.
 */
function transport(scene, ctx){
  const { groundHeight, colliders, interactables, blocked } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const spawn = { x: 0, z: 40, r: 13 };

  const vs = clearSpot({ x: -14, z: 28 }, blocked, { pad: 3.4, avoid: [spawn] });
  const van = vehicle(scene, vs.x, vs.z, y(vs.x, vs.z), { facing: Math.PI, colour: 0xc9c4b4 });
  driveable(scene, van.group, {
    ...VEHICLE_DRIVE,
    id: 'service-van', label: 'service van', kind: 'van',
    seat: { x: 0.52, y: 2.18, z: van.cabZ },
    wheels: van.wheels,
    topSpeed: 10,
    colliders, interactables,
  });

  const cs = clearSpot({ x: 10, z: 22 }, blocked,
    { pad: 2.4, avoid: [spawn, { x: vs.x, z: vs.z, r: 5 }] });
  const c = staffCar(scene, cs.x, cs.z, y(cs.x, cs.z), { facing: Math.PI, colour: 0x2f4a6b });
  driveable(scene, c.group, {
    id: 'staff-car', label: 'staff car', kind: 'car',
    halfWidth: 1.00, halfLength: 2.60, height: 1.50, clearance: 0.30,
    // Low, and behind a long bonnet: this is the one vehicle in the repo whose
    // driver sits below the height of a person standing beside it.
    seat: { x: 0.38, y: 1.22, z: 0.10 },
    wheels: c.wheels, wheelRadius: 0.36,
    topSpeed: 14, accel: 6.0, brake: 5.0, turn: 1.4, gripAt: 4.0, lean: 0.04,
    colliders, interactables,
  });
}

/**
 * A staff car of about 1964: long bonnet, long boot, a low greenhouse with
 * plenty of glass, chrome along the flank, and four whitewall wheels.
 *
 * Theme-local rather than in the kit, because it is a period as much as a shape
 * — the proportions here (2.4 m of bonnet and boot to 1.6 m of cabin, a roof
 * 1.4 m off the ground) are what makes it read as a sixties car rather than a
 * modern one, and no other site in this repo is set before 1980 except Project
 * Y, whose vehicles are Army issue.
 *
 * The body runs along -z, like every driveable.
 */
function staffCar(scene, x, z, y = 0, { facing = 0, colour = 0x2f4a6b } = {}){
  const std = (c, roughness = 0.6, metalness = 0.25) =>
    new THREE.MeshStandardMaterial({ color: c, roughness, metalness });
  const g = new THREE.Group();
  const paint = std(colour, 0.42, 0.35);
  const chrome = std(0xc8ccd2, 0.22, 0.9);
  const glass = new THREE.MeshStandardMaterial({
    color: 0x9fb6c2, roughness: 0.12, metalness: 0.1, transparent: true, opacity: 0.55 });
  const tyre = std(0x22242a, 0.95, 0);

  const wheels = [];
  for(const [sx, wz] of [[0.86, 1.55], [-0.86, 1.55], [0.86, -1.50], [-0.86, -1.50]]){
    const w = new THREE.Group();
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.20, 14), tyre);
    t.rotation.z = Math.PI / 2;
    w.add(t);
    // A whitewall and a hubcap, which is most of what dates a wheel of this era.
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.22, 12), chrome);
    cap.rotation.z = Math.PI / 2;
    cap.position.x = sx > 0 ? 0.01 : -0.01;
    w.add(cap);
    w.position.set(sx, 0.36, wz);
    w.userData.spinAxis = 'x';
    wheels.push(w);
    g.add(w);
  }

  box(g, 1.86, 0.52, 5.00, 0, 0.62, 0, paint);                 // the body sill to waist
  box(g, 1.80, 0.30, 2.10, 0, 1.02, -1.35, paint);             // bonnet
  box(g, 1.80, 0.30, 1.55, 0, 1.02, 1.75, paint);              // boot
  // The cabin: a glass band with a roof over it, set in from the flanks.
  box(g, 1.66, 0.52, 2.30, 0, 1.12, 0.10, glass);
  box(g, 1.62, 0.10, 2.10, 0, 1.42, 0.10, paint);              // roof
  for(const s of [-1, 1]) box(g, 0.05, 0.52, 2.30, s * 0.84, 1.12, 0.10, paint);   // door tops
  // Chrome: a strip down each flank, a bumper at each end, and a grille.
  for(const s of [-1, 1]) box(g, 0.04, 0.06, 4.40, s * 0.94, 0.72, 0, chrome);
  box(g, 1.90, 0.16, 0.16, 0, 0.60, -2.56, chrome);
  box(g, 1.90, 0.16, 0.16, 0, 0.60, 2.56, chrome);
  box(g, 1.60, 0.26, 0.10, 0, 0.86, -2.50, chrome);
  for(const s of [-1, 1]){
    const lamp = cyl(g, 0.13, 0.12, s * 0.62, 0.94, -2.48, chrome);
    lamp.rotation.x = Math.PI / 2;
    // Tail lights, and a modest fin over each: 1964 is after the tall ones.
    box(g, 0.22, 0.14, 0.08, s * 0.70, 0.86, 2.52, std(0xa8332a, 0.5, 0.2));
    box(g, 0.10, 0.16, 0.60, s * 0.88, 1.24, 2.10, paint);
  }

  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  g.traverse(o => { if(o.isMesh) o.castShadow = true; });
  return { group: g, wheels };
}

/** Unused here — this theme has no interior world of its own. */
export function fitOutRoom(){}
export function fitOutSpine(){}
