// props.js — the machines that make Corbin Park an amusement park.
//
// Generic fittings (benches, bins, queue rail, signs, crates) come from
// engine/world/kit.js and are configured in site.js. What is here is the seven
// rides, and they are the reason this place looks like nowhere else in the set:
//
//   · **The rides are the skyline.** A lift hill and a loop at 26 metres, a
//     wheel at 28 and a tower at 45, all of them visible from the gate and from
//     each other. Every other outdoor game in this repo is navigated by
//     buildings; this one is navigated by machines, and the buildings are the
//     little sheds underneath them.
//   · **The track is a curve, not a row of boxes.** The coaster is a tube swept
//     along a spline — lift, drop, valley, vertical loop, brake run — with a
//     bent under it every six metres. It is the one prop in the repo that could
//     not be built out of the kit, and it is what the whole game is about.
//   · **It is a decrepit park, which is a state and not a colour.** Boarded
//     stalls, tarpaulins over three of the machines, cones round the carousel,
//     a crane parked where the wheel's arm nine comes down, and grass through
//     the asphalt everywhere the site data allows it.
//   · **The lights come back on as the campaign does.** A state hook runs the
//     festoon lighting over the midway off the number of rides certified, so a
//     player who has signed five of seven walks a park that is visibly closer to
//     opening than it was on day one.

import * as THREE from 'three';
import {
  MATERIALS, box, cyl, crateStack, vehicle, sign,
  utilityCart, CART_DRIVE, clearSpot,
} from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';
import { site } from './site.js';

const PI = Math.PI;

/** Paint, forty-one years on: nothing here is one flat colour. */
const PAINT = (hex) => MATERIALS.paintedSteel(hex);
const RUST = () => MATERIALS.paintedSteel(0x7a4a35);
const STEEL = () => MATERIALS.steel();
const DARK = () => MATERIALS.paintedSteel(0x3a3f45);
const TARP = () => MATERIALS.paintedSteel(0x4f5a52);

/** Seeded, so the same park is laid out the same way every time it is built. */
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
 * A run of track, swept along a curve.
 *
 * `lateral` offsets the tube sideways from the spine using the curve's own
 * frames, which is what puts two rails either side of a spine without a second
 * spline to maintain. Frenet frames roll through an inversion — that is what
 * makes a vertical loop work at all — so the rails stay with the track rather
 * than with the world, and at the crown they are correctly upside down.
 */
function sweep(scene, curve, { radius = 0.16, lateral = 0, material, segments = 420 }){
  const pts = curve.getPoints(segments);
  if(lateral){
    const frames = curve.computeFrenetFrames(segments, false);
    const out = pts.map((p, i) => p.clone().addScaledVector(frames.binormals[Math.min(i, segments - 1)], lateral));
    curve = new THREE.CatmullRomCurve3(out);
  }
  const geo = new THREE.TubeGeometry(curve, segments, radius, 6, false);
  const m = new THREE.Mesh(geo, material);
  m.castShadow = true;
  m.receiveShadow = true;
  scene.add(m);
  return m;
}

/**
 * The coaster: one chain lift, one drop, one vertical loop, one brake run.
 *
 * The loop is the point of the whole game, so it is built from its own
 * geometry rather than fudged: a circle of the measured radius standing in a
 * vertical plane, entered and left through the valley. Its crown is at 20 m and
 * its radius at the crown is 7.4 — the number Kovač put a tape on, and 1.8
 * metres more than the drawing says.
 */
function coaster(scene, groundAt, colliders, rand){
  const y0 = groundAt(-46, -44);
  const track = [];
  const P = (x, y, z) => track.push(new THREE.Vector3(x, y0 + y, z));

  // Station, then the chain lift climbing away to the north.
  P(-46, 3.2, -34); P(-46, 3.2, -44); P(-46, 3.6, -52);
  P(-46, 8, -60); P(-46, 15, -68); P(-46, 22, -74); P(-46, 26, -79);
  // Over the crest and down the first drop, turning east.
  P(-44, 25.5, -83); P(-40, 21, -86); P(-34, 12, -87); P(-28, 4.0, -84);
  // Through the valley and up into the loop.
  P(-24, 2.2, -78); P(-22, 2.4, -72); P(-22, 4.0, -66);
  // The vertical loop: a circle of radius 7.4 in the x = -22 plane, crown at 20.
  for(let i = 0; i <= 14; i++){
    const a = -Math.PI / 2 + (i / 14) * Math.PI * 2;
    P(-22 + Math.sin(a) * 1.2, 12.6 + 7.4 * -Math.cos(a), -58 + Math.sin(a) * 7.4);
  }
  // Out of the loop, a long banked turn back, and the brake run into the station.
  P(-22, 4.2, -50); P(-24, 3.6, -44); P(-30, 3.4, -38); P(-38, 3.3, -34);
  P(-44, 3.2, -32); P(-46, 3.2, -30); P(-46, 3.2, -34);

  const curve = new THREE.CatmullRomCurve3(track, true, 'catmullrom', 0.2);
  sweep(scene, curve, { radius: 0.22, material: DARK() });                    // the spine
  sweep(scene, curve, { radius: 0.10, lateral: 0.62, material: PAINT(0xc4b23f) });   // rails
  sweep(scene, curve, { radius: 0.10, lateral: -0.62, material: PAINT(0xc4b23f) });

  // Bents: a post to the ground every few metres, with a cross brace. This is
  // what makes a spline read as a structure rather than as a drawn line.
  const N = 68;
  for(let i = 0; i < N; i++){
    const p = curve.getPoint(i / N);
    const g = groundAt(p.x, p.z);
    const h = p.y - g;
    if(h < 1.6) continue;
    // Nothing under the loop's own crown: the track there is held by the loop.
    if(p.z > -66 && p.z < -50 && p.y - y0 > 6) continue;
    const post = new THREE.Group();
    for(const s of [-1, 1]) cyl(post, 0.17, h, s * 0.9, h / 2, 0, i % 5 === 0 ? RUST() : STEEL());
    for(let k = 1; k * 3.4 < h; k++){
      box(post, 2.0, 0.10, 0.10, 0, k * 3.4, 0, STEEL());
      const x1 = box(post, 2.3, 0.07, 0.07, 0, k * 3.4 - 1.7, 0, STEEL());
      x1.rotation.z = 0.98;
    }
    post.position.set(p.x, g, p.z);
    scene.add(post);
    if(h > 6) colliders?.push(new THREE.Box3(
      new THREE.Vector3(p.x - 1.1, g, p.z - 0.6), new THREE.Vector3(p.x + 1.1, g + h, p.z + 0.6)));
  }

  // The train, standing in the station where it stopped in October.
  const train = new THREE.Group();
  for(let c = 0; c < 4; c++){
    const car = new THREE.Group();
    box(car, 1.5, 0.9, 2.4, 0, 0.75, 0, PAINT(c % 2 ? 0xb43a2e : 0xa2853f));
    box(car, 1.6, 0.35, 2.5, 0, 1.35, 0, DARK());
    for(const s of [-1, 1]) cyl(car, 0.24, 0.14, s * 0.8, 0.25, 0.9, DARK());
    car.position.set(0, 0, c * 2.7);
    train.add(car);
  }
  train.position.set(-46, y0 + 2.6, -40);
  scene.add(train);
  colliders?.push(new THREE.Box3(
    new THREE.Vector3(-47, y0 + 2.6, -41), new THREE.Vector3(-45, y0 + 4.4, -29)));
  void rand;
}

/**
 * The Ferris wheel: two rims, twenty-four gondolas, an A-frame each side.
 *
 * The gondolas hang from pins on the outer rim and are drawn hanging, which is
 * the detail that makes a wheel read as a wheel rather than as a bicycle part:
 * every car stays level whatever angle its pin is at.
 */
function ferrisWheel(scene, x, z, y, colliders){
  const R = 14, g = new THREE.Group();
  const rim = new THREE.TorusGeometry(R, 0.16, 6, 60);
  for(const dz of [-1.6, 1.6]){
    const m = new THREE.Mesh(rim, PAINT(0x8e7fa8));
    m.position.z = dz;
    m.castShadow = true;
    g.add(m);
  }
  // Spokes, alternating with tie rods, and a hub the size of a car.
  for(let i = 0; i < 24; i++){
    const a = (i / 24) * Math.PI * 2;
    for(const dz of [-1.6, 1.6]){
      const s = box(g, 0.09, R, 0.09, Math.cos(a) * R / 2, Math.sin(a) * R / 2, dz, STEEL());
      s.rotation.z = a - Math.PI / 2;
    }
  }
  cyl(g, 1.1, 4.0, 0, 0, 0, DARK()).rotation.x = Math.PI / 2;
  // Gondolas, hanging level from their pins.
  for(let i = 0; i < 24; i++){
    const a = (i / 24) * Math.PI * 2;
    const gx = Math.cos(a) * R, gy = Math.sin(a) * R;
    const car = new THREE.Group();
    box(car, 2.0, 0.14, 1.9, 0, -1.5, 0, DARK());
    box(car, 2.0, 1.15, 1.9, 0, -0.95, 0, PAINT(i % 3 === 0 ? 0x96513f : i % 3 === 1 ? 0x466f7e : 0xa2853f));
    box(car, 2.1, 0.10, 2.0, 0, -0.30, 0, DARK());
    for(const s of [-1, 1]) cyl(car, 0.05, 1.0, s * 0.85, 0.15, 0, STEEL());
    car.position.set(gx, gy, 0);
    g.add(car);
  }
  g.position.set(x, y + R + 3.4, z);
  scene.add(g);

  // Two A-frames and the axle they carry.
  for(const dz of [-5.5, 5.5]){
    const f = new THREE.Group();
    for(const s of [-1, 1]){
      const leg = box(f, 0.5, R + 4.6, 0.5, s * 5.2, (R + 3.4) / 2, 0, PAINT(0x6f6a74));
      leg.rotation.z = -s * 0.30;
    }
    box(f, 10.0, 0.3, 0.3, 0, (R + 3.4) * 0.55, 0, STEEL());
    f.position.set(x, y, z + dz);
    scene.add(f);
    colliders?.push(new THREE.Box3(
      new THREE.Vector3(x - 6.4, y, z + dz - 0.6), new THREE.Vector3(x + 6.4, y + 4, z + dz + 0.6)));
  }
  cyl(scene, 0.34, 12, x, y + R + 3.4, z, STEEL()).rotation.x = Math.PI / 2;
  return g;
}

/**
 * The drop tower: a lattice mast, a gondola ring at the bottom of it, and the
 * copper fins the whole of day two is about.
 */
function dropTower(scene, x, z, y, colliders){
  const H = 45, S = 2.4, g = new THREE.Group();
  for(const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]){
    cyl(g, 0.22, H, sx * S, H / 2, sz * S, PAINT(0x9a3f30));
  }
  for(let k = 1; k * 3.0 < H; k++){
    const yy = k * 3.0;
    for(const [ax, az, bx, bz] of [[-1, -1, 1, -1], [1, -1, 1, 1], [1, 1, -1, 1], [-1, 1, -1, -1]]){
      const mx = (ax + bx) / 2 * S, mz = (az + bz) / 2 * S;
      const along = ax === bx;
      box(g, along ? 0.12 : S * 2, 0.12, along ? S * 2 : 0.12, mx, yy, mz, STEEL());
      const br = box(g, along ? 0.09 : S * 2.5, 0.09, along ? S * 2.5 : 0.09, mx, yy - 1.5, mz, STEEL());
      br.rotation[along ? 'x' : 'z'] = along ? 0.9 : -0.9;
    }
  }
  // The fins the brake works against: copper strip up one face, and the magnet
  // stack at the bottom nine metres of it.
  for(let k = 0; k < 30; k++){
    box(g, 0.06, 1.3, 0.5, S + 0.4, 1.0 + k * 1.45, 0, PAINT(0xa9633a));
  }
  box(g, 0.9, 9.0, 1.6, S + 0.9, 5.0, 0, DARK());
  // The gondola ring, parked at the bottom where it has sat all winter.
  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.5, 8, 28), PAINT(0x96513f));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 2.1;
  g.add(ring);
  for(let i = 0; i < 12; i++){
    const a = (i / 12) * Math.PI * 2;
    box(g, 0.7, 1.2, 0.7, Math.cos(a) * 4.2, 1.5, Math.sin(a) * 4.2, DARK());
  }
  box(g, 2.6, 0.6, 2.6, 0, H + 0.4, 0, DARK());
  g.position.set(x, y, z);
  scene.add(g);
  colliders?.push(new THREE.Box3(
    new THREE.Vector3(x - 4.8, y, z - 4.8), new THREE.Vector3(x + 4.8, y + H, z + 4.8)));
  return g;
}

/**
 * The pirate ship: an A-frame each side, an arm, and a hull hanging off it at
 * the angle it stopped at.
 */
function pirateShip(scene, x, z, y, colliders){
  const g = new THREE.Group();
  const L = 8.6;
  for(const dz of [-4.4, 4.4]){
    for(const s of [-1, 1]){
      const leg = box(g, 0.44, 12.4, 0.44, s * 4.0, 6.0, dz, PAINT(0x4a6a86));
      leg.rotation.z = -s * 0.31;
    }
    box(g, 8.4, 0.26, 0.26, 0, 11.4, dz, STEEL());
  }
  cyl(g, 0.36, 9.6, 0, 11.6, 0, STEEL()).rotation.x = Math.PI / 2;

  // The arm and the boat, swung back to the angle it was stopped at.
  const swing = new THREE.Group();
  for(const dz of [-1.5, 1.5]) box(swing, 0.34, L, 0.34, 0, -L / 2, dz, PAINT(0x8a5f3a));
  const hull = new THREE.Group();
  box(hull, 9.4, 1.5, 2.6, 0, 0, 0, PAINT(0x7a4a2f));
  box(hull, 9.6, 0.5, 2.8, 0, 0.8, 0, PAINT(0xa2853f));
  const prow = new THREE.Mesh(new THREE.ConeGeometry(1.3, 2.6, 8), PAINT(0x7a4a2f));
  prow.rotation.z = -Math.PI / 2;
  prow.position.set(5.8, 0.1, 0);
  hull.add(prow);
  const stern = prow.clone();
  stern.rotation.z = Math.PI / 2;
  stern.position.set(-5.8, 0.1, 0);
  hull.add(stern);
  for(let i = -3; i <= 3; i++) box(hull, 0.9, 0.7, 2.2, i * 1.25, 0.9, 0, DARK());
  hull.position.y = -L;
  swing.add(hull);
  swing.rotation.z = 0.30;
  swing.position.y = 11.6;
  g.add(swing);

  g.position.set(x, y, z);
  scene.add(g);
  colliders?.push(new THREE.Box3(
    new THREE.Vector3(x - 5.2, y, z - 5.4), new THREE.Vector3(x + 5.2, y + 12, z + 5.4)));
  return g;
}

/** The carousel: a platform, a conical roof, poles, and horses on the poles. */
function carousel(scene, x, z, y, colliders){
  const g = new THREE.Group();
  const R = 6.8;
  cyl(g, R, 0.6, 0, 1.0, 0, PAINT(0x9a6f3a));
  cyl(g, R + 0.3, 0.2, 0, 0.7, 0, DARK());
  cyl(g, 0.9, 6.0, 0, 3.6, 0, PAINT(0xa2853f));
  // The roof: a cone with a scalloped rim under it, which is the silhouette.
  const roof = new THREE.Mesh(new THREE.ConeGeometry(R + 0.9, 3.0, 16), PAINT(0x96513f));
  roof.position.y = 8.0;
  roof.castShadow = true;
  g.add(roof);
  cyl(g, R + 0.9, 0.5, 0, 6.5, 0, PAINT(0xe8dfc8));
  for(let i = 0; i < 12; i++){
    const a = (i / 12) * Math.PI * 2;
    const px = Math.cos(a) * (R - 1.1), pz = Math.sin(a) * (R - 1.1);
    cyl(g, 0.07, 5.2, px, 3.9, pz, PAINT(0xd8cfae));
    if(i % 2 === 0){
      // A horse: a body, a neck and four legs, at the height its pole has it.
      const h = new THREE.Group();
      const body = box(h, 1.9, 0.85, 0.55, 0, 0, 0, PAINT(0xe6dccb));
      void body;
      box(h, 0.45, 0.9, 0.42, 0.75, 0.55, 0, PAINT(0xe6dccb));
      box(h, 0.5, 0.35, 0.4, 1.0, 0.95, 0, PAINT(0xe6dccb));
      for(const [lx, lz] of [[0.6, 0.22], [0.6, -0.22], [-0.6, 0.22], [-0.6, -0.22]]){
        box(h, 0.16, 0.9, 0.16, lx, -0.7, lz, PAINT(0xe6dccb));
      }
      box(h, 1.0, 0.30, 0.62, -0.1, 0.5, 0, PAINT(0x96513f));
      h.position.set(px, 2.6 + (i % 4 === 0 ? 0.5 : 0), pz);
      h.rotation.y = a + Math.PI / 2;
      g.add(h);
    }
  }
  g.position.set(x, y, z);
  scene.add(g);
  colliders?.push(new THREE.Box3(
    new THREE.Vector3(x - R, y, z - R), new THREE.Vector3(x + R, y + 9.5, z + R)));
  return g;
}

/**
 * The swing carousel, standing at the angle the derivation on day four is
 * about: chains out at thirty-one degrees, seats on the end of them.
 */
function swingCarousel(scene, x, z, y, colliders){
  const g = new THREE.Group();
  cyl(g, 0.55, 9.0, 0, 4.5, 0, PAINT(0x6f7f5a));
  cyl(g, 3.0, 0.5, 0, 8.6, 0, PAINT(0xa2853f));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 1.4, 14), PAINT(0x3f7f6a));
  roof.position.y = 9.6;
  g.add(roof);
  const TILT = 0.54;                     // 31° from the vertical, as derived
  for(let i = 0; i < 14; i++){
    const a = (i / 14) * Math.PI * 2;
    const hub = new THREE.Vector3(Math.cos(a) * 3.0, 8.5, Math.sin(a) * 3.0);
    const out = 4.5 * Math.sin(TILT), down = 4.5 * Math.cos(TILT);
    const seat = new THREE.Vector3(
      Math.cos(a) * (3.0 + out), 8.5 - down, Math.sin(a) * (3.0 + out));
    const mid = hub.clone().lerp(seat, 0.5);
    const chain = box(g, 0.05, 4.5, 0.05, mid.x, mid.y, mid.z, STEEL());
    chain.rotation.z = -Math.cos(a) * TILT;
    chain.rotation.x = Math.sin(a) * TILT;
    box(g, 0.6, 0.12, 0.55, seat.x, seat.y, seat.z, PAINT(0x96513f));
    box(g, 0.6, 0.6, 0.10, seat.x, seat.y + 0.35, seat.z, PAINT(0x96513f));
  }
  g.position.set(x, y, z);
  scene.add(g);
  colliders?.push(new THREE.Box3(
    new THREE.Vector3(x - 1.2, y, z - 1.2), new THREE.Vector3(x + 1.2, y + 10, z + 1.2)));
  return g;
}

/**
 * The log flume: a channel on trestles, a lift chute up to the header tank, and
 * the splash pool at the bottom of the drop.
 */
function logFlume(scene, groundAt, colliders, softColliders){
  const trough = (x0, z0, x1, z1, h0, h1) => {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const g = new THREE.Group();
    const n = Math.max(2, Math.round(len / 5));
    for(let i = 0; i <= n; i++){
      const t = i / n;
      const x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t;
      const yTop = h0 + (h1 - h0) * t;
      const gy = groundAt(x, z);
      const seg = new THREE.Group();
      box(seg, 1.9, 0.18, 5.4, 0, 0, 0, PAINT(0x6f7a74));                  // the floor
      for(const s of [-1, 1]) box(seg, 0.14, 0.62, 5.4, s * 0.95, 0.30, 0, PAINT(0x8a948e));
      // Water in the channel, a hand's depth, and never a DoubleSide plane.
      box(seg, 1.6, 0.16, 5.3, 0, 0.14, 0, MATERIALS.glass());
      seg.position.set(x, gy + yTop, z);
      seg.rotation.y = Math.atan2(x1 - x0, z1 - z0);
      scene.add(seg);
      // A trestle under it, wherever it is off the ground.
      if(yTop > 0.8){
        for(const s of [-1, 1]) cyl(scene, 0.11, yTop, x + s * 0.8, gy + yTop / 2, z, STEEL());
      }
      if(softColliders && i % 2 === 0) softColliders.push({ x, z, r: 1.3 });
    }
    return g;
  };

  // The circuit: out of the station, up the chute, round the top, and down the
  // drop into the pool.
  trough(-26, -88, -6, -88, 1.4, 1.4);
  trough(-6, -88, 6, -96, 1.4, 9.4);          // the lift chute
  trough(6, -96, 26, -104, 9.4, 9.0);
  trough(26, -104, 30, -120, 9.0, 8.4);
  trough(30, -120, 6, -126, 8.4, 7.8);
  trough(6, -126, -14, -118, 7.8, 1.6);       // the drop
  trough(-14, -118, -26, -100, 1.6, 1.4);

  // The header tank at the top of the chute, and the splash pool at the bottom.
  const ty = groundAt(8, -98);
  cyl(scene, 3.2, 4.0, 8, ty + 11.0, -98, PAINT(0x8a948e));
  cyl(scene, 3.4, 0.4, 8, ty + 13.2, -98, DARK());
  colliders?.push(new THREE.Box3(
    new THREE.Vector3(4.6, ty, -101.4), new THREE.Vector3(11.4, ty + 13.4, -94.6)));
  const py = groundAt(-16, -116);
  box(scene, 16, 0.5, 10, -16, py + 0.25, -116, PAINT(0x6f7a74));
  box(scene, 15, 0.4, 9, -16, py + 0.7, -116, MATERIALS.glass());

  // Two boats, one in the station and one left on the top bend all winter.
  for(const [bx, bz, by, ry] of [[-22, -88, 1.9, 0], [26, -110, 9.2, 0.4]]){
    const b = new THREE.Group();
    box(b, 1.3, 0.7, 3.4, 0, 0, 0, PAINT(0x7a4a2f));
    box(b, 1.4, 0.2, 3.5, 0, 0.42, 0, PAINT(0xa2853f));
    for(let i = -1; i <= 1; i++) box(b, 1.0, 0.5, 0.5, 0, 0.5, i * 1.0, DARK());
    b.position.set(bx, groundAt(bx, bz) + by, bz);
    b.rotation.y = ry;
    scene.add(b);
  }
}

/** A boarded stall: the midway's own building, and there are a dozen of them. */
function stall(scene, x, z, y, { facing = 0, colour = 0x96513f, rand = Math.random } = {}){
  const g = new THREE.Group();
  box(g, 4.4, 3.0, 3.2, 0, 1.5, 0, PAINT(colour));
  box(g, 4.8, 0.25, 3.6, 0, 3.1, 0, PAINT(0xe8dfc8));
  // The counter shutter, boarded over with three planks at an angle.
  box(g, 4.0, 1.3, 0.12, 0, 1.7, 1.66, DARK());
  for(let i = 0; i < 3; i++){
    const p = box(g, 4.6, 0.28, 0.06, 0, 1.2 + i * 0.6, 1.74, PAINT(0x8a7f6a));
    p.rotation.z = (rand() - 0.5) * 0.16;
  }
  // A canopy on two poles, which is what makes a shed read as a stall.
  const c = box(g, 5.0, 0.10, 1.8, 0, 2.9, 2.6, PAINT(0xd8cfae));
  c.rotation.x = -0.16;
  for(const s of [-1, 1]) cyl(g, 0.06, 2.9, s * 2.2, 1.45, 3.3, STEEL());
  g.rotation.y = facing;
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

/**
 * Festoon lighting over the midway, and the state hook that brings it back.
 *
 * Emissive geometry rather than lights: forty bulbs over the avenue at one real
 * light each would be six times the engine's whole budget. The hook runs them
 * off how far the campaign has got, so the park is visibly closer to opening on
 * day twelve than it was on day one — the one thing on this site that changes
 * as the player works.
 */
function festoon(scene, stateHooks, groundAt){
  const bulbs = [];
  const mat = MATERIALS.emissive(0xffd9a0, 0.05);
  for(let k = 0; k < 5; k++){
    const z0 = 54 - k * 26, z1 = z0 - 26;
    for(const s of [-1, 1]){
      const x = s * 9.5;
      cyl(scene, 0.09, 5.4, x, groundAt(x, z0) + 2.7, z0, STEEL());
      for(let i = 0; i < 9; i++){
        const t = i / 8;
        const z = z0 + (z1 - z0) * t;
        // A catenary, near enough: the sag is what says a wire rather than a bar.
        const sag = Math.sin(t * Math.PI) * 0.8;
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.13, 6, 5), mat);
        b.position.set(x, groundAt(x, z) + 5.2 - sag, z);
        b.userData.ignoreAudit = true;
        scene.add(b);
        bulbs.push(b);
      }
    }
  }
  stateHooks?.push((state) => {
    // Certified rides light their share of the midway. `week` is the day number,
    // which is the only campaign progress a prop can read without the state's
    // internals.
    const day = Math.max(1, Math.min(15, Number(state?.week) || 1));
    mat.emissiveIntensity = 0.05 + 1.5 * ((day - 1) / 14);
  });
  return bulbs;
}

/**
 * A car park: bays painted on asphalt, lighting columns, and whatever is
 * standing in it three weeks before opening.
 *
 * The bays are what make an apron read as a car park — an empty lot with no
 * markings is a yard. They are drawn as thin pale slabs a few millimetres proud
 * of the ground rather than as a texture, because the ground texture belongs to
 * the site data and a prop has no business rewriting it.
 */
function carPark(scene, groundAt, { cx, cz, cols, rows, cars = 0, rand, colliders, soft }){
  const BAY_W = 2.6, BAY_D = 5.2, AISLE = 6.4;
  const line = MATERIALS.paintedSteel(0xcfc9b4);
  const x0 = cx - (cols * BAY_W) / 2;
  const z0 = cz - (rows * (BAY_D * 2 + AISLE)) / 2;
  for(let r = 0; r < rows; r++){
    const zTop = z0 + r * (BAY_D * 2 + AISLE);
    for(const [zz, dir] of [[zTop, 1], [zTop + BAY_D * 2, -1]]){
      // The bay divisions, and the stop line along the head of the row.
      for(let c = 0; c <= cols; c++){
        const x = x0 + c * BAY_W;
        const y = groundAt(x, zz);
        box(scene, 0.16, 0.03, BAY_D, x, y + 0.03, zz + dir * BAY_D / 2, line);
      }
      box(scene, cols * BAY_W, 0.03, 0.16, cx, groundAt(cx, zz) + 0.03, zz, line);
    }
  }
  // Lighting columns down the middle of each aisle. Emissive heads, never lights:
  // twelve of these as real lights is twice the engine's entire budget.
  const lamp = MATERIALS.emissive(0xffe6b0, 0.25);
  for(let r = 0; r <= rows; r++){
    const z = z0 + r * (BAY_D * 2 + AISLE) - AISLE / 2;
    for(const x of [cx - cols * BAY_W * 0.3, cx + cols * BAY_W * 0.3]){
      const y = groundAt(x, z);
      cyl(scene, 0.14, 8.0, x, y + 4.0, z, PAINT(0x6b6f74));
      box(scene, 1.5, 0.22, 0.5, x, y + 8.0, z, PAINT(0x6b6f74));
      box(scene, 1.2, 0.10, 0.4, x, y + 7.86, z, lamp);
      soft?.push({ x, z, r: 0.6 });
    }
  }
  // What is actually parked here in the third week of March: the crew, a
  // contractor's van, and the coach nobody has moved since last season.
  const body = [0x6b6f74, 0x4a5560, 0x7a5f4a, 0x55604a, 0x8a8f94];
  for(let i = 0; i < cars; i++){
    const c = i % cols, r = Math.floor(i / cols) % (rows * 2);
    const x = x0 + c * BAY_W + BAY_W / 2 + (rand() - 0.5) * 0.4;
    const z = z0 + Math.floor(r / 2) * (BAY_D * 2 + AISLE) + (r % 2 ? BAY_D * 1.5 : BAY_D * 0.5);
    const y = groundAt(x, z);
    const g = new THREE.Group();
    const paint = PAINT(body[i % body.length]);
    box(g, 1.8, 0.7, 4.3, 0, 0.75, 0, paint);
    box(g, 1.7, 0.62, 2.1, 0, 1.4, -0.2, PAINT(0x33383d));
    for(const [wx, wz] of [[0.85, 1.4], [-0.85, 1.4], [0.85, -1.4], [-0.85, -1.4]]){
      const w = cyl(g, 0.32, 0.2, wx, 0.32, wz, MATERIALS.rubber());
      w.rotation.z = Math.PI / 2;
    }
    g.position.set(x, y, z);
    g.rotation.y = (rand() - 0.5) * 0.06;
    scene.add(g);
    soft?.push({ x, z, r: 1.6 });
  }
  void colliders;
}

/**
 * The ticket line: five booths under one canopy, and the turnstiles behind them.
 *
 * Two of the five are shuttered, which is what a park that has not sold a ticket
 * since October looks like. The booths are the first thing a player walks past
 * and the only place on the site where a price would be written, so the signs
 * say what the place is rather than what it costs.
 */
function ticketLine(scene, groundAt, x, z, colliders, soft){
  const y = groundAt(x, z);
  const g = new THREE.Group();
  // The canopy the whole row stands under.
  box(g, 16, 0.3, 5.0, 0, 4.2, 0, PAINT(0x8a8f8a));
  box(g, 16, 0.5, 0.3, 0, 3.9, 2.4, PAINT(0x96513f));
  for(const px of [-7, 0, 7]) cyl(g, 0.14, 4.2, px, 2.1, 2.2, STEEL());
  for(let i = 0; i < 3; i++){
    const bx = -5 + i * 5;
    const shut = i === 2;
    box(g, 3.4, 3.0, 3.0, bx, 1.5, 0, PAINT(0xa89a82));
    box(g, 3.6, 0.25, 3.2, bx, 3.1, 0, PAINT(0xe0d8c4));
    // The window and its counter shelf — or the roller shutter, on the two
    // positions the park is not planning to open.
    box(g, 2.4, 1.1, 0.12, bx, 1.75, 1.56, shut ? PAINT(0x6b6f74) : MATERIALS.glass());
    box(g, 2.8, 0.12, 0.55, bx, 1.15, 1.75, PAINT(0x7a6a55));
    if(shut) for(let k = 0; k < 5; k++) box(g, 2.4, 0.06, 0.14, bx, 1.3 + k * 0.24, 1.62, PAINT(0x5a5f64));
  }
  g.position.set(x, y, z);
  scene.add(g);
  colliders?.push(new THREE.Box3(
    new THREE.Vector3(x - 8, y, z - 1.7), new THREE.Vector3(x + 8, y + 4.4, z + 1.7)));

  // Turnstiles, in the gap between the booths and the gate: a post pair each,
  // with the arms folded back the way they are left when a park closes.
  for(let i = 0; i < 4; i++){
    const tx = x - 4.5 + i * 3;
    const ty = groundAt(tx, z - 8);
    cyl(scene, 0.16, 1.1, tx, ty + 0.55, z - 8, STEEL());
    for(const a of [0, 2.1, 4.2]){
      const arm = box(scene, 0.7, 0.07, 0.07, tx + Math.cos(a) * 0.35, ty + 0.95, z - 8 + Math.sin(a) * 0.35, STEEL());
      arm.rotation.y = a;
    }
    box(scene, 0.5, 1.0, 0.5, tx + 1.5, ty + 0.5, z - 8, PAINT(0x6b6f74));
    soft?.push({ x: tx, z: z - 8, r: 0.5 });
  }
}

/**
 * A billboard: two posts, a lattice frame and a painted face.
 *
 * The face is `kit.sign`, which draws text as two back-to-back single-sided
 * panels — never one DoubleSide plane, which renders every letter mirrored to
 * anybody approaching from behind. That rule has cost this repo real hours and a
 * billboard is the largest possible way to break it.
 */
function billboard(scene, groundAt, x, z, { facing = 0, text, sub = '', w = 9, h = 4.2, lift = 5.5, accent = null }){
  const y = groundAt(x, z);
  const g = new THREE.Group();
  for(const s of [-1, 1]) cyl(g, 0.24, lift + h / 2, s * w * 0.3, (lift + h / 2) / 2, 0, PAINT(0x6b6f74));
  // The frame behind the face, and the maintenance walkway under it.
  box(g, w + 0.6, h + 0.5, 0.25, 0, lift + h / 2, -0.2, PAINT(0x55595e));
  for(let i = -2; i <= 2; i++){
    const br = box(g, 0.12, h + 0.4, 0.12, i * (w / 5), lift + h / 2, -0.35, STEEL());
    br.rotation.z = i % 2 ? 0.5 : -0.5;
  }
  box(g, w + 0.4, 0.1, 0.9, 0, lift - h / 2 - 0.4, 0.4, PAINT(0x8a8f94));
  g.rotation.y = facing;
  g.position.set(x, y, z);
  scene.add(g);
  sign(scene, text, { x, y: y + lift + h / 2, z, w, h, facing, sub, accent });
  return g;
}

/** Decorate the park. */
export function decorate(scene, ctx){
  const { groundHeight, colliders, softColliders, interactables, stateHooks, blocked } = ctx;
  const at = (x, z) => groundHeight(x, z);
  const rand = rng(0x51DE5170);

  // ------------------------------------------------------------- the rides
  coaster(scene, at, colliders, rand);
  ferrisWheel(scene, -18, 34, at(-18, 34), colliders);
  dropTower(scene, 44, -74, at(44, -74), colliders);
  pirateShip(scene, 42, -6, at(42, -6), colliders);
  carousel(scene, -44, -16, at(-44, -16), colliders);
  swingCarousel(scene, -44, 8, at(-44, 8), colliders);
  logFlume(scene, at, colliders, softColliders);

  // The bumper pavilion's own roof: the site data gives the shed, and what makes
  // it a bumper floor is the steel ceiling grid the poles run up to.
  {
    const y = at(22, -24);
    for(let i = -3; i <= 3; i++) box(scene, 24, 0.08, 0.08, 22, y + 5.4, -24 + i * 2.6, STEEL());
    for(let i = -4; i <= 4; i++) box(scene, 0.08, 0.08, 16, 22 + i * 2.6, y + 5.4, -24, STEEL());
    for(let i = 0; i < 9; i++){
      const cx = 22 + (rand() - 0.5) * 18, cz = -24 + (rand() - 0.5) * 12;
      const car = new THREE.Group();
      cyl(car, 1.05, 0.5, 0, 0.3, 0, PAINT([0x96513f, 0x466f7e, 0xa2853f][i % 3]));
      cyl(car, 0.9, 0.55, 0, 0.75, 0, PAINT(0x2f3439));
      box(car, 0.7, 0.7, 0.6, 0, 1.1, -0.3, PAINT(0x2f3439));
      cyl(car, 0.05, 4.6, 0, 2.6, 0, STEEL());
      car.position.set(cx, y + 0.1, cz);
      car.rotation.y = rand() * 6.28;
      scene.add(car);
      softColliders?.push({ x: cx, z: cz, r: 1.2 });
    }
  }

  // --------------------------------------------------------- the midway
  // Boarded stalls down both sides of the avenue, and the dead fountain.
  const stalls = [
    [-14, 48, 0.2, 0x96513f], [-14, 36, 0.1, 0x466f7e], [-14, 4, -0.1, 0xa2853f],
    [-14, -8, 0.0, 0x96513f], [14, 48, 3.3, 0x466f7e], [14, 34, 3.2, 0x96513f],
    [14, 20, 3.1, 0x6b5a80], [14, -6, 3.2, 0xa2853f], [-14, -34, 0.1, 0x466f7e],
    [14, -40, 3.1, 0x96513f], [-14, -62, 0.0, 0xa2853f], [14, -84, 3.2, 0x466f7e],
  ];
  for(const [x, z, f, c] of stalls){
    stall(scene, x, z, at(x, z), { facing: f, colour: c, rand });
    softColliders?.push({ x, z, r: 2.6 });
  }
  {
    const y = at(0, 30);
    cyl(scene, 3.4, 0.7, 0, y + 0.35, 30, PAINT(0x9a958a));
    cyl(scene, 2.9, 0.3, 0, y + 0.75, 30, PAINT(0x6b6f60));   // dry, and full of leaves
    cyl(scene, 0.4, 1.6, 0, y + 1.2, 30, PAINT(0x9a958a));
    softColliders?.push({ x: 0, z: 30, r: 3.8 });
  }

  festoon(scene, stateHooks, at);

  // ------------------------------------------------ three weeks of works
  // Tarpaulins, cones, scaffold and a crane: what a park looks like when it is
  // being got ready rather than when it is running.
  for(const [x, z, w, d] of [[-44, -16, 15, 15], [42, -6, 12, 12], [-30, 30, 8, 6]]){
    const y = at(x, z);
    const t = box(scene, w, 0.12, d, x, y + 0.08, z, TARP());
    t.rotation.y = rand() * 0.3;
    void t;
  }
  for(let i = 0; i < 26; i++){
    const x = (rand() - 0.5) * 150, z = 60 - rand() * 190;
    if(Math.abs(x) < 8) continue;
    const c = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.72, 8), PAINT(0xd4642a));
    c.position.set(x, at(x, z) + 0.36, z);
    scene.add(c);
  }
  {
    // Scaffold at the foot of arm nine, and the crane parked beside it.
    const y = at(-6, 40);
    for(const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]){
      cyl(scene, 0.06, 9.0, -6 + sx * 1.6, y + 4.5, 40 + sz * 1.6, STEEL());
    }
    for(let k = 1; k <= 3; k++){
      box(scene, 3.2, 0.06, 0.06, -6, y + k * 2.2, 41.6, STEEL());
      box(scene, 3.2, 0.06, 0.06, -6, y + k * 2.2, 38.4, STEEL());
      box(scene, 0.9, 0.05, 3.2, -6, y + k * 2.2 - 0.05, 40, PAINT(0xa2853f));
    }
    colliders?.push(new THREE.Box3(
      new THREE.Vector3(-8, y, 38), new THREE.Vector3(-4, y + 9, 42)));
  }
  // ------------------------------------------------- arriving at the park
  // Two car parks either side of the approach, the ticket line under the gate
  // canopy, and the billboards that tell somebody on the county road that this
  // place exists. This is the half of a park a visitor meets before any ride.
  carPark(scene, at, { cx: -56, cz: 108, cols: 16, rows: 2, cars: 14, rand, colliders, soft: softColliders });
  carPark(scene, at, { cx: 56, cz: 108, cols: 16, rows: 2, cars: 7, rand, colliders, soft: softColliders });
  // The coach bay, and the coach that has been in it since last September.
  {
    const y = at(-104, 88);
    const c = new THREE.Group();
    box(c, 2.8, 3.0, 12.0, 0, 1.9, 0, PAINT(0x9aa0a6));
    box(c, 2.7, 1.0, 11.0, 0, 3.0, 0, PAINT(0x33383d));
    box(c, 2.6, 1.2, 0.3, 0, 2.2, -6.0, PAINT(0x33383d));
    for(const [wx, wz] of [[1.3, 4.0], [-1.3, 4.0], [1.3, -3.6], [-1.3, -3.6]]){
      const w = cyl(c, 0.52, 0.3, wx, 0.52, wz, MATERIALS.rubber());
      w.rotation.z = Math.PI / 2;
    }
    c.position.set(-104, y, 88);
    scene.add(c);
    colliders?.push(new THREE.Box3(
      new THREE.Vector3(-106, y, 82), new THREE.Vector3(-102, y + 3.6, 94)));
  }

  // Two blocks of booths either side of the entrance axis rather than one row
  // across it. The first version put five booths straight over the gate's own
  // door, which the reachability fill caught: a ticket office you cannot walk
  // past is a gate nobody gets through.
  // Outside the gate, facing the car park, which is the order a visitor meets
  // them in: billboard, ticket window, turnstile, gate, midway.
  ticketLine(scene, at, -14, 86, colliders, softColliders);
  ticketLine(scene, at, 14, 86, colliders, softColliders);

  // Billboards: one on the county road facing the traffic, one over the car park
  // and two on the midway. The park's name is on the first thing anybody sees.
  billboard(scene, at, -30, 148, { facing: 0, w: 12, h: 5.4, lift: 7.0,
    text: 'CORBIN PARK', sub: 'Seven rides · Open for the season', accent: '#c9a13a' });
  billboard(scene, at, 78, 140, { facing: 0.3, w: 9, h: 4.2,
    text: 'PARKING', sub: 'Coaches to the left', accent: '#4a7a80' });
  billboard(scene, at, 26, 78, { facing: -PI / 2, w: 8, h: 3.6, lift: 4.6,
    text: 'THE LOOP', sub: 'Since 1974', accent: '#96513f' });
  billboard(scene, at, -26, 12, { facing: PI / 2, w: 7, h: 3.2, lift: 4.4,
    text: 'THE BIG WHEEL', sub: 'Twenty-eight metres', accent: '#60527a' });

  crateStack(scene, -50, 56, at(-50, 56), { count: 5 });
  crateStack(scene, -46, 60, at(-46, 60), { count: 3 });
  crateStack(scene, 34, 56, at(34, 56), { count: 4 });

  /**
   * The park's own truck, and the player can drive it.
   *
   * Corbin Park is four hundred metres end to end and the flume is at the far
   * end of it, past the coaster. Everything in the maintenance crew's day is
   * carried, which is why there is a flatbed rather than a car.
   */
  const truck = vehicle(scene, -56, 62, at(-56, 62), { facing: 0, colour: 0x3f6f5a });
  driveable(scene, truck.group, {
    id: 'park-truck', label: 'maintenance truck', kind: 'truck',
    halfWidth: 1.4, halfLength: 3.2, height: 3.2,
    seat: { x: 0.45, y: 2.1, z: truck.cabZ },
    wheels: truck.wheels, topSpeed: 10,
    colliders, interactables,
  });

  /**
   * And a service cart, which is the vehicle an amusement park is actually run
   * on and the one this one should have had first.
   *
   * The truck is the right answer to *carrying* and the wrong answer to the
   * midway: Corbin Park's paths are three metres wide between the carousel and
   * the bumper floor, and a flatbed on them is a flatbed being three-point
   * turned. A canopied cart goes down them, which is what the ride fitters use
   * to get a gearbox from the workshop to the wheel without going round by the
   * service road. Slower flat out, and quicker to everywhere that matters.
   */
  const cs = clearSpot({ x: -46, z: 68 }, blocked,
    { pad: 2.0, avoid: [{ x: 0, z: 58, r: 13 }, { x: -56, z: 62, r: 6 }] });
  const cart = utilityCart(scene, cs.x, cs.z, at(cs.x, cs.z),
    { facing: 0, colour: 0x96513f });
  driveable(scene, cart.group, {
    ...CART_DRIVE,
    id: 'park-cart', label: 'service cart', kind: 'cart', verb: 'Take',
    wheels: cart.wheels,
    colliders, interactables,
  });
}

/** Fit out one room. Unused: this theme's rooms come from the outdoor world. */
export function fitOutRoom(){}
/** Fit out the spine. Unused for the same reason. */
export function fitOutSpine(){}
