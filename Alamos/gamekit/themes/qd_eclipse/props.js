// props.js — the objects unique to the eclipse camp.
//
// Everything generic — the huts, the signs, the benches, the posts, the scrub —
// is `engine/world/kit.js`, placed from site.js. This file is the eight or so
// things that make this a camp waiting for an eclipse rather than a village:
// the coelostat, the lens on its trestles, the guy ropes, the water, the wire.
//
// Placement helpers take `(x, z, y)` — ground last. House rule 7, and it cost
// six display boards sixteen metres in the air the one time it was written
// `(x, y, z)`.

import * as THREE from 'three';
import {
  box, cyl, crateStack, post, tank,
  bicycleRack, BICYCLE_DRIVE, clearSpot,
} from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';

/**
 * A guyed tent or awning: four poles, a roof plane, and ropes to the ground.
 *
 * The ropes are what make it read as a camp. A canvas roof on four legs is a
 * bandstand; the same thing with lines going down to pegs is something somebody
 * pitched this week and will strike next week.
 */
function guyedAwning(scene, { x, z, y, w = 6, d = 5, h = 2.9, mats }){
  const legs = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  for(const [sx, sz] of legs){
    cyl(scene, 0.06, h, x + sx * w / 2, y + h / 2, z + sz * d / 2, mats.metal);
  }
  // The roof, pitched very slightly so it does not read as a slab.
  box(scene, w + 0.5, 0.06, d + 0.5, x, y + h + 0.1, z, mats.canvas);
  box(scene, w + 0.2, 0.5, 0.06, x, y + h - 0.15, z - d / 2 - 0.2, mats.canvas);
  // Guy ropes: a thin box from each corner out and down to a peg.
  for(const [sx, sz] of legs){
    const x0 = x + sx * w / 2, z0 = z + sz * d / 2;
    const x1 = x + sx * (w / 2 + 1.6), z1 = z + sz * (d / 2 + 1.6);
    const len = Math.hypot(x1 - x0, z1 - z0, h);
    const rope = box(scene, 0.035, 0.035, len, (x0 + x1) / 2, y + h / 2, (z0 + z1) / 2,
      mats.rope);
    rope.lookAt(new THREE.Vector3(x1, y, z1));
    cyl(scene, 0.05, 0.4, x1, y + 0.2, z1, mats.metal);
  }
}

/**
 * The coelostat: a mirror on a clock drive that follows the Sun and throws its
 * light down a lens which never moves.
 *
 * This is the one object in the camp that explains the campaign's own hurry. The
 * lens is long, so it cannot be swung about in five minutes; the mirror is small,
 * so it can. Everything about the plan follows from that trade being made in
 * hardware before anybody arrived.
 */
function coelostat(scene, { x, z, y, mats }){
  // The pier, which is masonry rather than timber because it must not move.
  box(scene, 1.3, 1.1, 1.3, x, y + 0.55, z, mats.stone);
  // The polar axis and the clock drive housing.
  cyl(scene, 0.16, 1.5, x, y + 1.7, z, mats.metal);
  box(scene, 0.7, 0.5, 0.7, x, y + 2.5, z, mats.dark);
  // The mirror, tilted, on a fork.
  for(const sx of [-1, 1]) cyl(scene, 0.05, 0.9, x + sx * 0.42, y + 3.0, z, mats.metal);
  const mirror = box(scene, 1.5, 0.07, 1.5, x, y + 3.35, z, mats.mirror);
  mirror.rotation.x = -0.6;
  return { x, y: y + 3.35, z };
}

/**
 * The lens, laid along trestles on its side, pointing at the coelostat.
 *
 * Four metres of brass tube on three trestles, with the plate holder at the far
 * end and a cloth hood over it. It is horizontal because the mirror does the
 * pointing, which is the whole reason the mirror exists.
 */
function longLens(scene, { x, z, y, len = 6.5, mats }){
  for(let i = 0; i < 3; i++){
    const tz = z - len / 2 + (i * len) / 2;
    for(const sx of [-1, 1]){
      cyl(scene, 0.05, 1.05, x + sx * 0.3, y + 0.52, tz, mats.wood);
    }
    box(scene, 0.9, 0.08, 0.3, x, y + 1.06, tz, mats.wood);
  }
  cyl(scene, 0.19, len, x, y + 1.22, z, mats.brass).rotation.x = Math.PI / 2;
  // The plate holder and its hood at the near end.
  box(scene, 0.5, 0.5, 0.22, x, y + 1.22, z + len / 2 + 0.2, mats.dark);
  box(scene, 0.75, 0.75, 0.5, x, y + 1.22, z + len / 2 + 0.6, mats.canvas);
}

/**
 * The telegraph line: poles and a wire, running off the map toward the coast.
 *
 * It goes to the edge of the world rather than to a building, because that is
 * what the last stop of the campaign is about — a sentence leaving the camp and
 * arriving somewhere with none of the argument attached to it.
 */
function telegraphLine(scene, { x, z0, z1, ground, mats }){
  const n = 7;
  let prev = null;
  for(let i = 0; i <= n; i++){
    const z = z0 + ((z1 - z0) * i) / n;
    const y = ground(x, z);
    cyl(scene, 0.13, 7.0, x, y + 3.5, z, mats.wood);
    box(scene, 1.5, 0.1, 0.1, x, y + 6.7, z, mats.wood);
    const top = { x, y: y + 6.6, z };
    if(prev){
      const len = Math.hypot(top.z - prev.z, top.y - prev.y);
      // A single sag-free span. A catenary would be nicer and is not legible at
      // 1.4 m/s from a hundred metres away.
      const wire = box(scene, 0.03, 0.03, len, x, (top.y + prev.y) / 2 - 0.25,
        (top.z + prev.z) / 2, mats.rope);
      wire.lookAt(new THREE.Vector3(top.x, top.y, top.z));
    }
    prev = top;
  }
}

export function decorate(scene, ctx){
  const { groundHeight, colliders, MATERIALS } = ctx;
  const std = (colour, roughness = 0.85, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color: colour, roughness, metalness });
  const mats = {
    canvas: std(0xa89b7a, 0.95),
    wood:   std(0x6b543a, 0.9),
    metal:  std(0x6e6a60, 0.6, 0.35),
    brass:  std(0x8a7238, 0.45, 0.55),
    dark:   std(0x2f2b24, 0.9),
    stone:  std(0x8d8371, 0.95),
    rope:   std(0x4a4438, 0.95),
    mirror: new THREE.MeshStandardMaterial({ color: 0xcdd3d6, roughness: 0.12, metalness: 0.85 }),
  };
  // `ctx.MATERIALS` is deliberately NOT spread in here. It is a map of *factory
  // functions* — `MATERIALS.steel()`, `MATERIALS.paintedSteel(hex)` — so merging
  // it over the palette above replaces materials with functions, and a function
  // handed to three.js as a material renders as default white. That is how the
  // telegraph poles came out as bare white columns the first time this ran, and
  // the only thing that showed it was a screenshot.
  void MATERIALS;
  /**
   * A solid box the player cannot walk into.
   *
   * `colliders` here is a list of `THREE.Box3`, not of `{x, z, w, d}` — the
   * outdoor world builds them with `setFromObject` and `reachable.mjs` reads
   * `c.min.x`. Pushing the interior world's plain-number shape instead threw on
   * the first ray the checker fired, which is the cheapest possible version of
   * this mistake.
   */
  const hard = (x, z, w, d, h = 2) => {
    if(!colliders) return;
    const y = groundHeight(x, z);
    colliders.push(new THREE.Box3(
      new THREE.Vector3(x - w / 2, y, z - d / 2),
      new THREE.Vector3(x + w / 2, y + h, z + d / 2)));
  };

  // ---- the camera field, which is the whole reason for the expedition.
  //
  // Everything here is set to one side of the spur path and clear of the hut's own
  // door. The first version put the coelostat at (0, −70), which is directly in
  // front of the camera hut, and `reachable.mjs` correctly reported the stop as
  // walled off by its own instrument.
  for(const [cx, len] of [[-13, 6.5], [13, 4.4]]){
    coelostat(scene, { x: cx, z: -72, y: groundHeight(cx, -72), mats });
    hard(cx, -72, 2.2, 2.2, 3.6);
    longLens(scene, { x: cx, z: -64, y: groundHeight(cx, -64), len, mats });
    hard(cx, -64, 1.2, len + 0.9, 1.6);
  }
  // The awning the observers stand under, and the plate boxes, well off the path.
  guyedAwning(scene, { x: -24, z: -66, y: groundHeight(-24, -66), w: 7, d: 5, mats });
  hard(-24, -66, 7.6, 5.6, 2.9);
  crateStack(scene, -24, -62, groundHeight(-24, -62), { rows: 2, colour: 0x8a7248 });

  // ---- the plate hut's dark tent, pitched against its wall.
  guyedAwning(scene, { x: -34, z: -8, y: groundHeight(-34, -8), w: 5, d: 4, h: 2.6, mats });
  hard(-34, -8, 5.6, 4.6, 2.6);
  // Water. There is no water on this plain and everything in the hut needs it.
  tank(scene, -42, -10, groundHeight(-42, -10), { r: 1.1, h: 2.4, colour: 0x7c7f76 });
  hard(-42, -10, 2.4, 2.4, 2.4);

  // ---- the computing tent: an awning beside the hut, not in front of its door.
  guyedAwning(scene, { x: 46, z: -14, y: groundHeight(46, -14), w: 6, d: 5, h: 2.8, mats });
  hard(46, -14, 6.6, 5.6, 2.8);
  box(scene, 2.2, 0.06, 1.0, 46, groundHeight(46, -14) + 0.78, -14, mats.wood);
  for(const sx of [-1, 1]) for(const sz of [-1, 1]){
    cyl(scene, 0.04, 0.76, 46 + sx * 0.95, groundHeight(46, -14) + 0.38, -14 + sz * 0.4, mats.metal);
  }

  // ---- the wire out. It leaves the map, which is the point of it.
  telegraphLine(scene, { x: 40, z0: 20, z1: 122, ground: groundHeight, mats });

  // ---- the store tent's stack, and a few posts marking the track at night.
  crateStack(scene, -22, 26, groundHeight(-22, 26), { rows: 3, colour: 0x8a7248 });
  tank(scene, -31, 24, groundHeight(-31, 24), { r: 1.0, h: 2.2, colour: 0x7c7f76 });
  hard(-31, 24, 2.2, 2.2, 2.2);
  for(const z of [8, -6, -22, -40, -54]){
    post(scene, -6, z, groundHeight(-6, z), 1.5, 0.07, 0xb8ac90);
  }

  transport(scene, ctx);
}
// ------------------------------------------------------------------ transport
/**
 * A motor lorry and two bicycles: what an expedition of this period arrived on.
 *
 * The instruments came up from the railhead on a hired lorry — a coelostat, a
 * lens, plate boxes and a darkroom tent are half a ton before anybody's kit —
 * and it stays with the camp because there is nothing else to move a crate on.
 * The bicycles are the other half of that: the camera field is 120 m from the
 * store tent and the plate hut 60 m the other way, and on the morning of an
 * eclipse somebody is going to have to do that in three minutes.
 *
 * The lorry is deliberately slow. This campaign's own stake is that the walk
 * between the plate hut and the camera field is what five minutes of totality
 * costs you if a box is in the wrong place, and a vehicle that makes the site
 * small would take the stake away. At seven metres a second it saves a load
 * being carried, not a decision being made.
 */
function transport(scene, ctx){
  const { groundHeight, colliders, interactables, blocked } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const spawn = { x: 0, z: 44, r: 13 };

  const ls = clearSpot({ x: 14, z: 34 }, blocked, { pad: 3.2, avoid: [spawn] });
  const l = lorry(scene, ls.x, ls.z, y(ls.x, ls.z), { facing: Math.PI });
  driveable(scene, l.group, {
    id: 'expedition-lorry', label: 'expedition lorry', kind: 'lorry',
    halfWidth: 1.15, halfLength: 2.80, height: 2.60, clearance: 0.50,
    seat: { x: 0.42, y: 2.02, z: -0.90 },
    wheels: l.wheels, wheelRadius: 0.50,
    // A 1919 lorry on a dirt track. Everything about it is slow, and the brakes
    // most of all — which is the one number here that is a period fact rather
    // than a balance decision.
    topSpeed: 7, sprint: 1.1,
    accel: 3.0, brake: 2.6, reverseAccel: 1.6, coastDrag: 2.8, driveDrag: 1.2,
    turn: 1.1, gripAt: 3.0, reverseFrac: 0.3, lean: 0,
    colliders, interactables,
  });

  const bs = clearSpot({ x: -11, z: 32 }, blocked,
    { pad: 2.0, avoid: [spawn, { x: ls.x, z: ls.z, r: 6 }] });
  const { rail, bicycles } = bicycleRack(scene, bs.x, bs.z, y(bs.x, bs.z), {
    facing: Math.PI,
    list: [{ colour: 0x2c3a44, basket: true }, { colour: 0x5a3a2c, basket: false }],
  });
  if(rail.soft) ctx.softColliders?.push(rail.soft);
  bicycles.forEach((b, i) => {
    driveable(scene, b.group, {
      ...BICYCLE_DRIVE,
      id: `camp-bicycle-${i + 1}`, label: 'camp bicycle', kind: 'bicycle', verb: 'Ride',
      wheels: b.wheels, steer: b.steer, ignore: b.ignore,
      colliders, interactables,
    });
  });
}

/**
 * A motor lorry of about 1919: a wooden flatbed body, an open cab under a canvas
 * roof, a tall radiator and narrow spoked wheels.
 *
 * Built here rather than taken from `kit.vehicle`, which is a modern van and
 * would be the only object on this site that is not of its period. The wheels
 * are the tell — a 1919 lorry runs 0.50 m wheels 0.12 m wide, so they are tall
 * and thin where a modern tyre is short and fat, and that proportion is most of
 * what makes the silhouette read as old.
 *
 * Like every driveable, the body runs along -z.
 */
function lorry(scene, x, z, y = 0, { facing = 0 } = {}){
  const std = (colour, roughness = 0.85, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color: colour, roughness, metalness });
  const g = new THREE.Group();
  const paint = std(0x3f4a3a, 0.7, 0.15);
  const wood = std(0x6b543a, 0.9);
  const black = std(0x22242a, 0.6, 0.2);
  const brass = std(0x9a7a3a, 0.45, 0.6);

  const wheels = [];
  for(const [sx, wz] of [[0.92, 1.35], [-0.92, 1.35], [0.92, -1.30], [-0.92, -1.30]]){
    const w = new THREE.Group();
    const tyre = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.50, 0.12, 14), black);
    tyre.rotation.z = Math.PI / 2;
    w.add(tyre);
    // Twelve spokes and a hub, which is the other half of the period tell.
    for(let i = 0; i < 12; i++){
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.86, 0.035), wood);
      sp.rotation.x = (i / 12) * Math.PI * 2;
      w.add(sp);
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.20, 10), brass);
    hub.rotation.z = Math.PI / 2;
    w.add(hub);
    w.position.set(sx, 0.50, wz);
    w.userData.spinAxis = 'x';
    wheels.push(w);
    g.add(w);
  }

  box(g, 1.70, 0.20, 5.00, 0, 0.66, 0.10, black);                  // chassis rails
  // The flatbed body, behind the cab: a floor and three sides of planking.
  box(g, 1.90, 0.10, 2.60, 0, 0.82, 1.35, wood);
  for(const s of [-1, 1]) box(g, 0.08, 0.60, 2.60, s * 0.91, 1.17, 1.35, wood);
  box(g, 1.90, 0.60, 0.08, 0, 1.17, 2.61, wood);
  // The open cab: a floor, a bench, a dash and four posts under a canvas roof.
  box(g, 1.70, 0.10, 1.30, 0, 0.82, -0.55, wood);
  box(g, 1.60, 0.44, 0.24, 0, 1.09, -0.10, std(0x4a3a2a, 0.9));
  box(g, 1.70, 0.44, 0.10, 0, 1.30, -1.18, paint);
  for(const [sx, cz] of [[0.80, 0.06], [-0.80, 0.06], [0.80, -1.14], [-0.80, -1.14]]){
    box(g, 0.06, 1.00, 0.06, sx, 1.72, cz, wood);
  }
  box(g, 1.86, 0.06, 1.40, 0, 2.25, -0.54, std(0xa89b7a, 0.95));   // canvas roof
  // The bonnet and radiator, which on a lorry of this date stand proud and tall.
  box(g, 1.10, 0.66, 1.30, 0, 1.15, -1.90, paint);
  box(g, 1.06, 0.86, 0.12, 0, 1.28, -2.55, brass);
  for(const s of [-1, 1]){
    const lamp = cyl(g, 0.13, 0.20, s * 0.62, 1.34, -2.52, brass);
    lamp.rotation.x = Math.PI / 2;
  }
  // Mudguards over the front wheels, and a step under the cab.
  for(const s of [-1, 1]){
    box(g, 0.30, 0.06, 1.20, s * 0.92, 1.06, -1.30, paint);
    box(g, 0.34, 0.05, 0.44, s * 0.98, 0.52, -0.55, black);
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
