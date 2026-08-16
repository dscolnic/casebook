// props.js — the objects that make Vestri Dome a drilling camp on an ice sheet.
//
// Generic fittings (benches, bins, posts, signs, crates, vehicles) come from
// engine/world/kit.js and are configured in site.js. What is here is everything
// that says *polar station*, and it is mostly three ideas:
//
//   · **Nothing sits on the snow.** Every module is up on piles with a metre of
//     air under it, because a building resting on the surface drifts over in a
//     season. The gap under a module is the single strongest cue that this is
//     not a town.
//   · **Everything windward has a drift behind it.** Snow banks up on the lee
//     side of any obstruction, and a camp with no drifts reads as a model.
//   · **The drill tower is the silhouette.** It is the only tall thing for two
//     hundred kilometres and it is what the place is for.
//
// A note on igloos, since it is the obvious question: a deep-drilling station is
// steel modules, a trench and a tower. Nobody has lived in snow houses on a
// plateau since aircraft could reach one. The place is made recognisable by the
// piles, the drifts, the flag lines and the fuel, not by the roofs.

import * as THREE from 'three';
import { MATERIALS, box, cyl, crateStack, scooter, vehicle } from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';
// The world's decorate context does not carry the site, and the piles and
// drifts are placed off the same numbers the buildings are.
import { site } from './site.js';

/** Snow: bright, matt, and dark enough on paper to survive a sky IBL. */
const SNOW = () => MATERIALS.paintedSteel(0xd9e2ec);
/** The same snow, slightly shaded, so a pile has some form in flat light. */
const SNOW_SHADE = () => MATERIALS.paintedSteel(0xc3cfdd);

/** One sphere, shared by every lump of snow on the station. */
const BLOB = new THREE.SphereGeometry(1, 10, 7);

/** Seeded, so the mess is the same mess every time the station is built. */
function rng(seed){
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A lump of snow.
 *
 * Snow is the one material here with no straight lines in it, so every pile is
 * squashed spheres rather than boxes. The first version of this was five
 * stepped slabs and it read as a staircase from three metres away — which is
 * the whole reason the screenshot rule exists.
 */
function lump(parent, x, y, z, rx, ry, rz, m, yaw = 0){
  const b = new THREE.Mesh(BLOB, m);
  b.position.set(x, y, z);
  b.scale.set(rx, ry, rz);
  b.rotation.y = yaw;
  b.castShadow = true;
  b.receiveShadow = true;
  parent.add(b);
  return b;
}

/**
 * A pile: several overlapping lumps, sunk into the ground so no sphere shows
 * its underside, with the biggest one off-centre. Nothing about a pile of snow
 * is symmetric.
 */
function pile(parent, x, y, z, { r = 3, h = 1.4, rand = Math.random, lumps = 5 } = {}){
  const g = new THREE.Group();
  const m = SNOW(), ms = SNOW_SHADE();
  for(let i = 0; i < lumps; i++){
    const f = i / lumps;
    const a = rand() * Math.PI * 2;
    const d = r * 0.55 * f * (0.5 + rand());
    const rr = r * (0.85 - f * 0.4) * (0.7 + rand() * 0.6);
    const hh = h * (1 - f * 0.55) * (0.7 + rand() * 0.6);
    // Sunk by a third of its height: a sphere resting on the ground shows a
    // curve underneath it and reads as a ball.
    lump(g, Math.cos(a) * d, hh * 0.34, Math.sin(a) * d,
      rr, hh, rr * (0.7 + rand() * 0.7), i % 3 === 0 ? ms : m, rand() * 3.1);
  }
  g.position.set(x, y, z);
  parent.add(g);
  return g;
}

/**
 * A drift on the lee side of something: a long tail that starts at the
 * obstruction and thins away downwind, built from lumps that shrink along it.
 */
function drift(scene, x, z, y, { facing = 0, length = 9, width = 5, height = 1.2, rand = Math.random } = {}){
  const g = new THREE.Group();
  const m = SNOW(), ms = SNOW_SHADE();
  const n = 7;
  for(let i = 0; i < n; i++){
    const f = i / n;
    const hh = height * (1 - f) ** 1.3 + 0.08;
    const w = (width / 2) * (1 - f * 0.35) * (0.8 + rand() * 0.4);
    const along = -(f * length + length / (2 * n));
    lump(g, (rand() - 0.5) * width * 0.25, hh * 0.3, along,
      w, hh, length / n * 1.5, i % 2 ? m : ms, rand() * 3.1);
  }
  g.rotation.y = facing;
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

/**
 * Snow on a roof, and the cornice hanging over the lee edge.
 *
 * A flat roof at this latitude carries a metre of it by midwinter, and the wind
 * builds a lip along the downwind edge that overhangs. It is the cheapest cue
 * that the whole camp is being buried rather than standing in a white field.
 */
function roofSnow(scene, b, y, rand){
  const g = new THREE.Group();
  const m = SNOW(), ms = SNOW_SHADE();
  // The deck the snow lies on, and the parapet standing 0.5 m proud of it.
  // `kit.building` puts the floor slab at 0.35 and the parapet on top of the
  // wall, so the roof is neither `y` nor `y + h`. Getting this wrong is what
  // made the first version look like it was hovering: the snow sat *inside* the
  // roof, the parapet hid the body of it, and only the crowns showed above the
  // edge — which reads exactly like blobs floating over the building.
  const deck = y + 0.35 + b.h;
  const parapet = deck + 0.5;
  const nx = Math.max(3, Math.round(b.w / 3.2)), nz = Math.max(2, Math.round(b.d / 3.2));
  for(let i = 0; i < nx; i++){
    for(let j = 0; j < nz; j++){
      const x = -b.w / 2 + (b.w * (i + 0.5)) / nx;
      const z = -b.d / 2 + (b.d * (j + 0.5)) / nz;
      // Deep enough to bury the parapet and stand above it, which is what a
      // flat roof at this latitude looks like by midwinter.
      const h = 0.95 + rand() * 0.5;
      lump(g, x + (rand() - 0.5) * 0.5, parapet + 0.1 - h * 0.55, z + (rand() - 0.5) * 0.5,
        (b.w / nx) * 0.95, h, (b.d / nz) * 0.95, (i + j) % 3 ? m : ms, rand() * 3.1);
    }
  }
  // The lip along the eaves: proud of the wall by a hand's breadth and no more.
  // A cornice really does overhang, and a metre of it with nothing underneath is
  // the thing that looks wrong from the ground.
  for(let i = 0; i < nx; i++){
    if(rand() < 0.2) continue;
    const x = -b.w / 2 + (b.w * (i + 0.5)) / nx;
    const h = 0.55 + rand() * 0.3;
    lump(g, x, parapet + 0.05 - h * 0.45, b.d / 2 - 0.05,
      (b.w / nx) * 0.6, h, 0.55, ms, rand() * 3.1);
  }
  g.position.set(b.x, 0, b.z);
  scene.add(g);
  return g;
}

/**
 * The banks a plough throws up either side of a route.
 *
 * These are why the tractors exist, and they are the thing that makes a groomed
 * road read as cleared rather than as painted on. Built along the path, offset
 * to both shoulders, with the height wandering.
 */
function plowBanks(scene, groundAt, { x0, z0, x1, z1, halfWidth, rand, height = 1.5, step = 6 }){
  const len = Math.hypot(x1 - x0, z1 - z0);
  const n = Math.max(2, Math.round(len / step));
  const ux = (x1 - x0) / len, uz = (z1 - z0) / len;
  const px = -uz, pz = ux;                 // across the route
  for(let i = 0; i <= n; i++){
    const t = i / n;
    const cx = x0 + (x1 - x0) * t, cz = z0 + (z1 - z0) * t;
    for(const side of [-1, 1]){
      // A bank is not continuous: a plough lifts the blade at driveways and
      // leaves gaps, and a solid wall of snow reads as a hedge.
      if(rand() < 0.16) continue;
      const off = halfWidth + 0.9 + rand() * 0.7;
      const x = cx + px * off * side, z = cz + pz * off * side;
      const h = height * (0.55 + rand() * 0.8);
      const g = new THREE.Group();
      lump(g, 0, h * 0.28, 0, 1.1 + rand() * 0.9, h, step * 0.62, rand() < 0.45 ? SNOW_SHADE() : SNOW(),
        Math.atan2(ux, uz));
      g.position.set(x, groundAt(x, z), z);
      scene.add(g);
    }
  }
}

/**
 * The piles a module stands on, and the drift banked under it.
 *
 * The building shell is drawn by the world at ground level, so the piles are
 * cosmetic: eight short legs around the footprint and a skirt of banked snow
 * on one side. Raising the shell itself would need the door and its collider
 * to move with it, which is the world's business rather than this file's.
 */
function piles(scene, b, y){
  const g = new THREE.Group();
  const steel = MATERIALS.paintedSteel(0x5a6068);
  const nx = Math.max(2, Math.round(b.w / 7)), nz = Math.max(2, Math.round(b.d / 6));
  for(let i = 0; i <= nx; i++){
    for(let j = 0; j <= nz; j++){
      // Only the perimeter: the middle of the underside is never seen.
      if(i > 0 && i < nx && j > 0 && j < nz) continue;
      const x = -b.w / 2 + (b.w * i) / nx;
      const z = -b.d / 2 + (b.d * j) / nz;
      cyl(g, 0.16, 1.0, x, 0.5, z, steel);
    }
  }
  g.position.set(b.x, y, b.z);
  scene.add(g);
  return g;
}

/**
 * The drill tower over the trench.
 *
 * Four battered legs, three brace levels and a crown sheave, drawn from boxes:
 * at the distance this is read from, the silhouette is the whole content and a
 * real derrick is several hundred members nobody resolves. It stands over the
 * trench rather than beside it, because the hole is under it.
 */
function tower(scene, x, z, y, h = 22){
  const g = new THREE.Group();
  const steel = MATERIALS.paintedSteel(0x707880);
  const dark = MATERIALS.paintedSteel(0x3e454c);
  const spread = 3.1, top = 0.9;
  for(const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]){
    for(let i = 0; i < 3; i++){
      const f0 = i / 3, f1 = (i + 1) / 3;
      const r0 = spread + (top - spread) * f0, r1 = spread + (top - spread) * f1;
      const mid = (r0 + r1) / 2;
      box(g, 0.26, h / 3, 0.26, sx * mid, (h * (f0 + f1)) / 2, sz * mid, steel);
    }
    for(let i = 1; i < 5; i++){
      const f = i / 5, r = spread + (top - spread) * f;
      box(g, r * 2, 0.14, 0.14, 0, h * f, sz * r, steel);
      box(g, 0.14, 0.14, r * 2, sx * r, h * f, 0, steel);
    }
  }
  // The crown, and the cable hanging down the middle of the tower.
  box(g, 2.6, 0.5, 2.6, 0, h + 0.3, 0, dark);
  cyl(g, 0.05, h - 1.2, 0, (h - 1.2) / 2, 0, dark);
  // The winch drum at the foot, which is where the season is actually spent.
  cyl(g, 1.05, 2.6, 3.4, 1.0, 0, dark);
  g.rotation.z = Math.PI / 2;
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

/** A fuel cache: drums on their sides in a double row, the way they are stored. */
function drums(scene, x, z, y, { facing = 0, rows = 2, per = 6 } = {}){
  const g = new THREE.Group();
  const paint = [0xb5462f, 0x2f6f9f, 0xb59a2f];
  for(let r = 0; r < rows; r++){
    for(let i = 0; i < per; i++){
      const m = MATERIALS.paintedSteel(paint[(r + i) % paint.length]);
      const d = cyl(g, 0.29, 0.88, i * 0.64 - (per * 0.64) / 2, 0.3 + r * 0.6, r * 0.2, m);
      d.rotation.z = Math.PI / 2;
    }
  }
  g.rotation.y = facing;
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

/** The met mast: a guyed pole with instrument arms, out at the stake array. */
function metMast(scene, x, z, y, h = 10){
  const g = new THREE.Group();
  const steel = MATERIALS.paintedSteel(0x8b9299);
  const dark = MATERIALS.paintedSteel(0x2f3438);
  cyl(g, 0.09, h, 0, h / 2, 0, steel);
  for(const level of [0.35, 0.62, 0.9]){
    box(g, 1.5, 0.08, 0.08, 0.75, h * level, 0, steel);
    box(g, 0.22, 0.22, 0.22, 1.45, h * level, 0, dark);
  }
  // Three guys, which is what stops it being a flagpole to look at.
  for(const a of [0, 2.1, 4.2]){
    const gy = box(g, 0.04, h * 1.05, 0.04, Math.cos(a) * 2.6, h * 0.45, Math.sin(a) * 2.6, steel);
    gy.rotation.z = Math.cos(a) * 0.42;
    gy.rotation.x = -Math.sin(a) * 0.42;
  }
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

/**
 * Decorate the station.
 *
 * Order matters only in that the drifts go down after the modules they bank
 * against, so their positions can be read off the same numbers.
 */
export function decorate(scene, ctx){
  const { groundHeight, colliders, interactables } = ctx;
  const at = (x, z) => groundHeight(x, z);
  // Colliders are boxes, not meshes: `blocked` reads `.min` and `.max` off every
  // entry, so pushing the group straight in throws on the first person the crowd
  // tries to place — which is a black screen, not a bad collision.
  const hard = (g) => { if(g && colliders) colliders.push(new THREE.Box3().setFromObject(g)); };

  /**
   * A snow tractor with a blade, and the player can drive it.
   *
   * The camp route and the skiway are groomed by these, which is the only
   * reason either exists — snow that nobody moves closes a station in a
   * fortnight. `vehicle()` gives the body, wheels and cab; the blade is two
   * boxes on the front of it, and `driveable` does the rest.
   */
  const plow = (x, z, opts = {}) => {
    const v = vehicle(scene, x, z, at(x, z), { facing: opts.facing ?? 0, colour: opts.colour ?? 0xc9702a });
    const blade = new THREE.Group();
    const steel = MATERIALS.paintedSteel(0x9aa3ab);
    const paint = MATERIALS.paintedSteel(opts.colour ?? 0xc9702a);
    // The mouldboard, angled, with a cutting edge along the bottom and two arms
    // back to the frame. It sits ahead of the body along -z, which is the way
    // `kit.vehicle` is laid out and the way `driveable` drives.
    const board = box(blade, 4.6, 1.5, 0.22, 0, 1.0, -3.5, paint);
    board.rotation.y = 0.28;
    const edge = box(blade, 4.6, 0.22, 0.3, 0, 0.28, -3.5, steel);
    edge.rotation.y = 0.28;
    box(blade, 0.18, 0.18, 1.6, -1.1, 1.0, -2.6, steel);
    box(blade, 0.18, 0.18, 1.6, 1.1, 1.0, -2.6, steel);
    v.group.add(blade);
    return driveable(scene, v.group, {
      id: opts.id, label: opts.label ?? 'snow tractor',
      halfWidth: 1.4, halfLength: 3.4, height: 3.0,
      seat: { x: 0.48, y: 2.16, z: v.cabZ },
      // Slower than a truck on a road: a blade in snow is a load, and the
      // groomed route is two hundred metres end to end.
      wheels: v.wheels, topSpeed: 8,
      colliders, interactables,
    });
  };

  // The wind is from the north-west here, which is why every drift tails
  // south-east and every door faces the other way.
  const LEE = Math.PI * 0.75;
  const rand = rng(0x1ce0c0de);

  // Where each door is, so nothing is banked across it. Crews dig their own
  // entrances out first and a drift over the only way in is not weather, it is
  // a mistake — and in a game it is a stop the player cannot walk to.
  const doorAt = (b2) => ({
    dx: Math.sin(b2.facing ?? 0), dz: Math.cos(b2.facing ?? 0),
  });
  const aprons = (site?.buildings ?? []).map((b2) => {
    const { dx, dz } = doorAt(b2);
    const reach = (Math.abs(dx) ? b2.w : b2.d) / 2 + 7;
    return { x: b2.x + dx * reach * 0.7, z: b2.z + dz * reach * 0.7, r: 8 };
  });
  const clearOfDoors = (x, z) => !aprons.some(a2 => Math.hypot(x - a2.x, z - a2.z) < a2.r);

  for(const b of site?.buildings ?? []){
    const y0 = at(b.x, b.z);
    const { dx, dz } = doorAt(b);
    piles(scene, b, y0);
    roofSnow(scene, b, y0, rand);
    // Both tails go off the back and the flanks, never across the entrance.
    drift(scene, b.x - dx * b.w * 0.55 + dz * b.w * 0.3, b.z - dz * b.d * 0.62 - dx * b.d * 0.3, y0, {
      facing: LEE, length: 8 + b.w * 0.3, width: b.d * 0.8, height: 1.5, rand,
    });
    drift(scene, b.x - dx * b.w * 0.5 - dz * b.w * 0.34, b.z - dz * b.d * 0.5 + dx * b.d * 0.34, y0, {
      facing: LEE + 0.5, length: 5 + b.w * 0.15, width: b.d * 0.5, height: 0.9, rand,
    });
    // Banked hard against the wall the wind hits, which is the back of it.
    pile(scene, b.x - dx * (b.w * 0.55 + 1.6), y0, b.z - dz * (b.d * 0.55 + 1.6),
      { r: 3.2, h: 1.6, rand, lumps: 6 });
  }

  // The banks the tractors throw up either side of the groomed route, the spur
  // and the skiway. This is what makes a cleared road read as cleared.
  plowBanks(scene, at, { x0: 0, z0: 46, x1: 0, z1: -78, halfWidth: 6, rand, height: 1.05 });
  plowBanks(scene, at, { x0: 36, z0: 26, x1: 92, z1: 26, halfWidth: 4, rand, height: 0.85, step: 7 });
  plowBanks(scene, at, { x0: -96, z0: 110, x1: -96, z1: -90, halfWidth: 13, rand, height: 0.8, step: 9 });

  // Piles wherever snow has been pushed and left: against the fuel cache, at
  // the ends of the banks, behind the crates, in the corners of the camp.
  for(const [x, z, r, h] of [
    [-42, 30, 4.5, 2.2], [-36, 40, 3.4, 1.7], [30, 42, 5.0, 2.4],
    [44, 8, 3.8, 1.9], [-46, -14, 4.2, 2.1], [40, -46, 4.6, 2.3],
    [-30, -52, 3.6, 1.8], [16, -14, 2.8, 1.3], [-16, -18, 2.6, 1.2],
    [58, 34, 3.2, 1.5], [-64, 20, 5.2, 2.6], [64, -22, 4.0, 2.0],
  ]) if(clearOfDoors(x, z)) pile(scene, x, at(x, z), z, { r, h, rand, lumps: 6 });

  // The tower, over the trench at the far end of the route.
  hard(tower(scene, -4, -68, at(-4, -68), 22));

  // Fuel: the year's supply, cached upwind of the generators where a spill
  // runs away from the camp rather than through it.
  drums(scene, 34, 30, at(34, 30), { facing: 0.3 });
  drums(scene, 34, 34, at(34, 34), { facing: 0.3, rows: 1 });

  // Cargo, on pallets so it can be found after a storm.
  crateStack(scene, -40, 12, at(-40, 12), { count: 5 });
  crateStack(scene, -44, 16, at(-44, 16), { count: 3 });
  crateStack(scene, 12, -52, at(12, -52), { count: 4 });

  // Skidoos: the only way anybody gets to the stake array and back in a day.
  scooter(scene, -14, 30, at(-14, 30), { facing: 0.4, colour: 0xc4452f });
  scooter(scene, -11, 30, at(-11, 30), { facing: 0.4, colour: 0x2f6f9f });
  scooter(scene, 70, 24, at(70, 24), { facing: -1.4, colour: 0xc4452f });

  // The mast, at the head of the array, and a second one by the hut.
  metMast(scene, 96, 20, at(96, 20), 10);
  metMast(scene, 4, 52, at(4, 52), 6);

  // Sastrugi: the wind-carved ridges that cover an entire plateau, all lying
  // along the wind. Instanced, because there are eight hundred of them and they
  // are the difference between a snowfield and a white plane.
  const sast = new THREE.InstancedMesh(BLOB, SNOW_SHADE(), 800);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const WIND = -Math.PI * 0.25;
  let n = 0;
  for(let i = 0; i < 800; i++){
    const a2 = rand() * Math.PI * 2, d = 26 + rand() * 300;
    const x = Math.cos(a2) * d, z = Math.sin(a2) * d;
    // Nothing on the groomed route, nothing near the spawn, nothing where a
    // building is: a ridge across the road is a ridge the player walks into.
    if(Math.abs(x) < 9 && z > -80 && z < 50) continue;
    if(Math.hypot(x, z - 44) < 14) continue;
    if(!clearOfDoors(x, z)) continue;
    if((site?.buildings ?? []).some(b2 =>
      Math.abs(x - b2.x) < b2.w / 2 + 3 && Math.abs(z - b2.z) < b2.d / 2 + 3)) continue;
    const len = 1.6 + rand() * 5.0;
    e.set(0, WIND + (rand() - 0.5) * 0.35, 0);
    q.setFromEuler(e);
    m4.compose(
      new THREE.Vector3(x, at(x, z) + 0.04, z), q,
      new THREE.Vector3(0.35 + rand() * 0.5, 0.10 + rand() * 0.16, len),
    );
    sast.setMatrixAt(n++, m4);
  }
  sast.count = n;
  sast.instanceMatrix.needsUpdate = true;
  sast.receiveShadow = true;
  scene.add(sast);

  // Snow lying on everything that has been left outside for a week.
  for(const [x, z, r] of [[-40, 12, 1.6], [-44, 16, 1.3], [12, -52, 1.5], [34, 30, 2.0]]){
    pile(scene, x, at(x, z) + 0.9, z, { r, h: 0.5, rand, lumps: 3 });
  }

  // Three snow tractors, parked where they are used: one on the camp route, one
  // at the head of the skiway, one out by the stake array spur. All driveable.
  plow(-14, 38, { facing: 0, colour: 0xc9702a, id: 'plow-camp', label: 'snow tractor' });
  plow(-84, 34, { facing: -Math.PI / 2, colour: 0xb8452c, id: 'plow-skiway', label: 'skiway groomer' });
  plow(52, 22, { facing: Math.PI / 2, colour: 0xc9a52a, id: 'plow-array', label: 'stake-array tractor' });
}

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box: put, materials: M, soft, scene } = ctx;
  const f = b.sign;
  const inX = b.xInner + f * 0.5;
  void put; void M; void soft; void scene; void inX; void room;
}

/** Fit out the spine. Unused here: this theme's rooms come from the outdoor world. */
export function fitOutSpine(){}
