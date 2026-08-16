// props.js — the objects that make Arcadia Rise a propellant plant on Mars.
//
// Generic fittings (benches, bins, posts, signs, crates, tanks, pipe runs) come
// from engine/world/kit.js and are configured in site.js. What is here is
// everything that says *this planet and this plant*, and it is five ideas:
//
//   · **Nothing here has a roof anybody would recognise.** Every module is
//     buried to its eaves in regolith, because two metres of dirt is the only
//     radiation shielding anybody is going to get. From outside the station is a
//     line of long mounds with a door at one end and a vent stack at the other,
//     which is the single strongest cue that this is not a town.
//   · **The plant is plumbed, and the plumbing is the lesson.** A pipe leaves
//     the intake, passes the electrolysis hall, reaches the reactor, goes on to
//     the cold end and ends at the tank farm. Walking the site walks the carbon.
//   · **The vehicle is the whole point of the place.** It stands on a pad beyond
//     the tank farm, taller than anything else by a factor of four, with a
//     propellant gauge up its side that fills as the campaign does.
//   · **The ground is wind, not water.** Barchan dunes with their horns
//     downwind, dark streaks in the lee of every boulder, and dust on
//     everything that has been outside for a week.
//   · **The sun is a resource with a number on it.** Eighteen hundred square
//     metres of panel, some of it swept and some of it not, and you can see
//     which from the track.
//
// A note on domes, since it is the obvious question: nobody builds a glass dome
// on a planet with half a per cent of Earth's atmospheric pressure and no
// magnetic field. What gets built is buried cylinders, and the interesting
// silhouette here is the plant rather than the housing.

import * as THREE from 'three';
import { MATERIALS, box, cyl, crateStack, tank, pipeRun, vehicle } from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';
// The world's decorate context does not carry the site, and the berms are
// placed off the same numbers the buildings are.
import { site } from './site.js';

/** Regolith, in three shades. Dark on paper, because the sky IBL is tinted warm. */
const DIRT = () => MATERIALS.paintedSteel(0x6f4a35);
const DIRT_L = () => MATERIALS.paintedSteel(0x835a41);
const DIRT_D = () => MATERIALS.paintedSteel(0x5a3b2b);
/** Dust-coated white: insulation, tank lagging, the vehicle. Never actually white. */
const LAGGING = () => MATERIALS.paintedSteel(0xcabfb2);

/** One sphere and one rock, shared by every mound and boulder on the plain. */
const BLOB = new THREE.SphereGeometry(1, 10, 7);
const ROCK = new THREE.IcosahedronGeometry(1, 0);

/** Seeded, so the same plain is laid out the same way every time it is built. */
function rng(seed){
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A lump of ground. Nothing made of dirt has a straight edge on it. */
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
 * Is this point on one of the site's own tracks?
 *
 * Everything in this file that puts a mound on the ground asks this first. A
 * berm shoulder that reaches into the route is not a shielding decision, it is
 * a bank across the road: the graded track is where the rovers run and where
 * the day's walking happens, and the one at Plant Control crossed it — drawn
 * and collided — until a route probe walked the line and hit it.
 */
const onTrack = (x, z, margin = 0) => (site.paths ?? []).some(p =>
  Math.abs(x - p.cx) < p.w / 2 + margin && Math.abs(z - p.cz) < p.d / 2 + margin);

/**
 * Collide a mound: its own world box, inset, and cut down to the height it
 * actually stands at.
 *
 * Inset because the drawn shape is an ellipse and its box is not — a dune's
 * corners are empty ground, and blocking them makes the plain feel like a maze.
 * `setFromObject` is used rather than arithmetic so a rotated crescent gets the
 * box it really occupies.
 */
function collideMound(colliders, group, { inset = 0.78, height = 1 } = {}){
  if(!colliders) return;
  const b = new THREE.Box3().setFromObject(group);
  if(!Number.isFinite(b.min.x) || b.isEmpty()) return;
  const cx = (b.min.x + b.max.x) / 2, cz = (b.min.z + b.max.z) / 2;
  const hx = (b.max.x - b.min.x) / 2 * inset, hz = (b.max.z - b.min.z) / 2 * inset;
  colliders.push(new THREE.Box3(
    new THREE.Vector3(cx - hx, b.min.y, cz - hz),
    new THREE.Vector3(cx + hx, b.min.y + (b.max.y - b.min.y) * height, cz + hz)));
}

/**
 * The regolith berm banked over a module.
 *
 * A habitat on this planet is a pressure vessel under two metres of dirt, and
 * the dirt is what the eye reads. The shell the world drew is left standing —
 * this banks against all four walls and lies over the roof line, with a gap cut
 * at the door so the entrance is a cutting rather than a mound.
 *
 * The gap matters for more than looks: a berm across the door is a stop the
 * player cannot walk to, which no check in the repo would catch.
 *
 * **Every flank is a collider.** Two metres of dirt is an obstacle, and the
 * first build gave it no collision at all: the player walked *through* each
 * bank and the near plane cut the mound open around them, which is also what
 * happens to anybody standing inside one. Boxes rather than the circles used
 * for the dunes, because the crowd's `blocked` predicate reads `colliders` and
 * nothing else — a soft collider stops the player and lets every walker stroll
 * through the same bank.
 *
 * The one thing collision must not do is close the cutting, so a flank whose
 * box lies across the approach to the door is drawn and not collided.
 */
function berm(scene, b, y, rand, colliders){
  const g = new THREE.Group();
  const dx = Math.sin(b.facing ?? 0), dz = Math.cos(b.facing ?? 0);
  const hw = b.w / 2, hd = b.d / 2;
  // Where somebody stands to use the door, and the lane they walk in along.
  // `kit.building` puts the entry d/2 + 3.2 out along the facing, so this is the
  // same arithmetic the world used and cannot drift from it.
  const ex = b.x + dx * (hd + 3.2), ez = b.z + dz * (hd + 3.2);
  const LANE = 1.9;
  /** Does this footprint lie across the walk in to the door? */
  const onApproach = (cx, cz, hx, hz) => {
    for(let k = -1; k <= 12; k++){
      const px = ex + dx * k, pz = ez + dz * k;
      if(Math.abs(px - cx) < hx + LANE && Math.abs(pz - cz) < hz + LANE) return true;
    }
    return false;
  };
  /** A flank's box, inset from the ellipse it is drawn as. */
  const collide = (cx, cz, lx, lz, height) => {
    if(!colliders) return;
    const wx = b.x + cx, wz = b.z + cz;
    const hx = lx * 0.74, hz = lz * 0.74;
    if(onApproach(wx, wz, hx, hz)) return;
    colliders.push(new THREE.Box3(
      new THREE.Vector3(wx - hx, y, wz - hz),
      new THREE.Vector3(wx + hx, y + height * 0.7, wz + hz)));
  };
  // Banked to a little over half the wall rather than over the top of it. The
  // first pass buried each module completely and the station read as a row of
  // mud hills: the shielding is the point, and so is being able to see that
  // there is a building under it — the door, the upper band and the sign all
  // have to stay above the dirt.
  const top = b.h * 0.52;

  // The four flanks, as long lumps lying against the walls. The one containing
  // the door is split into two with a gap between them.
  // Sunk by two thirds of its own height, so what shows is the top of a bank
  // rather than the side of a ball.
  const flank = (cx, cz, lx, lz, yaw) => {
    // Cut back where the track runs. Drawing it and not colliding it would be
    // worse than either: a bank you can see and walk through.
    const wx = b.x + cx, wz = b.z + cz;
    for(const [ox, oz] of [[0, 0], [lx * 0.6, 0], [-lx * 0.6, 0], [0, lz * 0.6], [0, -lz * 0.6]]){
      if(onTrack(wx + ox, wz + oz, 1.0)) return;
    }
    lump(g, cx, -top * 0.32, cz, lx, top, lz, rand() < 0.5 ? DIRT() : DIRT_L(), yaw);
    collide(cx, cz, lx, lz, top);
  };

  for(const [sx, sz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){
    const isDoor = (sx !== 0 && Math.abs(dx) > 0.5 && Math.sign(dx) === sx)
                || (sz !== 0 && Math.abs(dz) > 0.5 && Math.sign(dz) === sz);
    const cx = sx * (hw + 2.6), cz = sz * (hd + 2.6);
    const lx = sx ? 4.2 : hw + 5.0, lz = sz ? 4.2 : hd + 5.0;
    if(!isDoor){ flank(cx, cz, lx, lz, 0); continue; }
    // Two shoulders either side of the cutting, and nothing across it.
    const off = (sx ? hd : hw) * 0.62 + 2.0;
    if(sx){ flank(cx, off, lx, lz * 0.42, 0); flank(cx, -off, lx, lz * 0.42, 0); }
    else  { flank(off, cz, lx * 0.42, lz, 0); flank(-off, cz, lx * 0.42, lz, 0); }
  }

  // The cap over the roof: a low mound covering the slab and standing a little
  // proud of the parapet. `kit.building` puts the floor at 0.35 and the parapet
  // above the wall, so the top of the shell is neither `y` nor `y + h`.
  const deck = 0.35 + b.h;
  const nx = Math.max(2, Math.round(b.w / 5)), nz = Math.max(2, Math.round(b.d / 5));
  for(let i = 0; i < nx; i++){
    for(let j = 0; j < nz; j++){
      const x = -hw + (b.w * (i + 0.5)) / nx;
      const z = -hd + (b.d * (j + 0.5)) / nz;
      // Inset and sunk into the slab. Overhanging cells and a cap that floated
      // above the parapet gave every module a brim, which read as a mushroom
      // rather than as a metre of dirt lying on a roof.
      const h = 0.55 + rand() * 0.2;
      lump(g, x * 0.86 + (rand() - 0.5) * 0.4, deck + 0.05 - h * 0.35, z * 0.86 + (rand() - 0.5) * 0.4,
        (b.w / nx) * 0.62, h, (b.d / nz) * 0.62, (i + j) % 3 ? DIRT() : DIRT_D(), rand() * 3.1);
    }
  }

  // The vent stack and the pressure-relief cowl, which is the one thing that
  // stands above the berm and says a machine lives under it.
  const steel = MATERIALS.steel();
  cyl(g, 0.34, 3.2, hw * 0.55, deck + 2.4, -hd * 0.4, steel);
  cyl(g, 0.62, 0.5, hw * 0.55, deck + 4.1, -hd * 0.4, steel);

  g.position.set(b.x, y, b.z);
  scene.add(g);
  return g;
}

/**
 * A barchan dune: a crescent, horns pointing downwind, steep on the lee face.
 *
 * These are the shape a dune takes where there is one prevailing wind and not
 * enough sand to cover the ground, which is most of this plain. Built as an arc
 * of lumps that shrink toward the horns, so the crescent reads from the air and
 * as a long ridge from the ground.
 */
function dune(scene, x, z, y, { facing = 0, span = 14, height = 1.6, rand = Math.random, colliders = null } = {}){
  const g = new THREE.Group();
  const n = 9;
  for(let i = 0; i < n; i++){
    const t = (i / (n - 1)) * 2 - 1;              // -1 … 1 across the crescent
    const f = 1 - t * t;                          // fat in the middle
    const h = height * (0.35 + 0.65 * f) * (0.85 + rand() * 0.3);
    // The horns trail downwind, which is +z in the dune's own frame. Sunk by
    // half its height and half again as wide as it is long: a barchan is a
    // ripple a metre high and twenty across, and a sphere sitting on the ground
    // at those proportions is a dome.
    lump(g, t * span * 0.5, -h * 0.45, t * t * span * 0.30,
      span * 0.20, h, span * 0.26 * (0.6 + 0.4 * f),
      i % 3 ? DIRT_L() : DIRT(), rand() * 0.6);
  }
  g.rotation.y = facing;
  g.position.set(x, y, z);
  scene.add(g);
  // A dune is a metre and a half of sand and it stops you, which is the whole
  // reason a station puts its route where it does.
  g.updateMatrixWorld(true);
  collideMound(colliders, g, { inset: 0.72 });
  return g;
}

/**
 * A boulder, and the wind streak in its lee.
 *
 * The streaks are the thing worth having. Every rock of any size on this planet
 * has a dark tail behind it where the wind has swept the bright dust away, all
 * of them lying the same way, and a plain of rocks without them reads as a
 * quarry rather than as a desert. The streak is a flat plane on the ground, not
 * a mound: it is a change of colour rather than a change of shape.
 */
function boulderWithTail(scene, x, z, y, { r = 1.1, wind = 0, rand = Math.random, soft = null } = {}){
  const rock = new THREE.Mesh(ROCK, rand() < 0.5 ? DIRT_D() : DIRT());
  rock.position.set(x, y + r * 0.45, z);
  rock.scale.set(r, r * (0.6 + rand() * 0.4), r * (0.8 + rand() * 0.5));
  rock.rotation.set(rand() * 3, rand() * 3, rand() * 3);
  rock.castShadow = true;
  rock.receiveShadow = true;
  scene.add(rock);
  // Anything knee-high and up is an obstacle. Below that it is ground texture
  // and colliding it would give the plain a hundred invisible kerbs.
  if(soft && r >= 0.85) soft.push({ x, z, r: r * 0.8 });

  const len = r * (7 + rand() * 6);
  const streak = new THREE.Mesh(
    new THREE.PlaneGeometry(r * 2.1, len),
    new THREE.MeshStandardMaterial({ color: 0x4a3122, roughness: 1, metalness: 0,
      transparent: true, opacity: 0.75, depthWrite: false }));
  streak.rotation.x = -Math.PI / 2;
  streak.rotation.z = -wind;
  streak.position.set(x + Math.sin(wind) * len * 0.5, y + 0.03, z + Math.cos(wind) * len * 0.5);
  streak.receiveShadow = true;
  streak.userData.ignoreAudit = true;
  scene.add(streak);
  return rock;
}

/**
 * The solar field: rows of tilted panels, and the dust on them.
 *
 * Instanced, because there are six hundred of them and they are the difference
 * between a station and a station that runs. Two instanced meshes rather than
 * one: the swept panels are a different material from the dusty ones, and which
 * is which is visible from the track — which is the point, since a whole sol of
 * this campaign is about how much sun reaches these.
 */
function solarField(scene, groundAt, { x0, z0, cols, rows, pitch = 3.2, rand }){
  const clean = new THREE.MeshStandardMaterial({
    color: 0x1b2740, roughness: 0.25, metalness: 0.55, envMapIntensity: 0.5 });
  const dusty = new THREE.MeshStandardMaterial({
    color: 0x6a5442, roughness: 0.9, metalness: 0.1, envMapIntensity: 0.35 });
  const panelGeo = new THREE.BoxGeometry(2.4, 0.06, 1.3);
  const legGeo = new THREE.BoxGeometry(0.08, 0.9, 0.08);
  const total = cols * rows;
  const meshes = [
    new THREE.InstancedMesh(panelGeo, clean, total),
    new THREE.InstancedMesh(panelGeo, dusty, total),
  ];
  const legs = new THREE.InstancedMesh(legGeo, MATERIALS.steel(), total * 2);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  const v = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
  let n = [0, 0], nl = 0;
  // Tilted to the north — the sun is in the south from this latitude, and a
  // panel lying flat collects a fraction of what a tilted one does.
  const TILT = -0.42;
  for(let c = 0; c < cols; c++){
    for(let r = 0; r < rows; r++){
      const x = x0 + c * pitch, z = z0 + r * (pitch * 1.35);
      const gy = groundAt(x, z);
      // A block of the field was swept this week and the rest was not. The
      // boundary is a straight line because a crew sweeps along a row.
      const swept = c < cols * 0.38 ? 0 : 1;
      e.set(TILT, 0, 0);
      q.setFromEuler(e);
      v.set(x, gy + 0.92, z);
      m4.compose(v, q, s);
      meshes[swept].setMatrixAt(n[swept]++, m4);
      for(const off of [-0.9, 0.9]){
        m4.compose(new THREE.Vector3(x + off, gy + 0.45, z), new THREE.Quaternion(), s);
        legs.setMatrixAt(nl++, m4);
      }
    }
  }
  meshes.forEach((mesh, i) => {
    mesh.count = n[i];
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  });
  legs.count = nl;
  legs.instanceMatrix.needsUpdate = true;
  scene.add(legs);
  return { clean: n[0], dusty: n[1] };
}

/**
 * The ascent vehicle, on its pad.
 *
 * Twenty-six metres of it, which makes it four times the height of anything
 * else on the plain and visible from every stop in the game. That is
 * deliberate: it is what the plant is for, and a player who has forgotten why
 * they are arguing about a catalyst can look up.
 *
 * The gauge up its side is the campaign. `stateHooks` drives it from the sol
 * number, and it is the only thing on this station that changes as the player
 * works — the tanks are also the win condition, so the win condition is
 * something you can see from four hundred metres away.
 */
function ascentVehicle(scene, x, z, y, { stateHooks, colliders } = {}){
  const g = new THREE.Group();
  const shell = LAGGING();
  const dark = MATERIALS.paintedSteel(0x3a3f45);
  const H = 26, R = 2.6;

  // Body, tank section and nose. The frost band is where the methane tank sits.
  cyl(g, R, H * 0.62, 0, H * 0.31, 0, shell);
  cyl(g, R * 0.99, H * 0.16, 0, H * 0.70, 0, MATERIALS.paintedSteel(0xd7dee2));
  cyl(g, R * 0.92, H * 0.14, 0, H * 0.85, 0, shell);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(R * 0.92, H * 0.20, 16), shell);
  nose.position.y = H * 1.02;
  nose.castShadow = true;
  g.add(nose);

  // Four legs, splayed, with pads. A rocket on a plain with no pad structure
  // reads as a chimney; the legs are what make it a vehicle.
  for(let i = 0; i < 4; i++){
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const leg = box(g, 0.34, 7.4, 0.34, Math.cos(a) * 2.9, 3.4, Math.sin(a) * 2.9, dark);
    leg.rotation.z = -Math.cos(a) * 0.30;
    leg.rotation.x = Math.sin(a) * 0.30;
    cyl(g, 0.9, 0.28, Math.cos(a) * 4.6, 0.16, Math.sin(a) * 4.6, dark);
  }
  // Engines, under the skirt.
  for(let i = 0; i < 3; i++){
    const a = (i / 3) * Math.PI * 2;
    const bell = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1.5, 12, 1, true), dark);
    bell.position.set(Math.cos(a) * 1.1, 0.9, Math.sin(a) * 1.1);
    g.add(bell);
  }

  // The propellant gauge: an empty channel with a filling bar inside it, facing
  // back up the track toward the plant, which is the direction it is read from.
  box(g, 0.5, H * 0.56, 0.14, 0, H * 0.30, R + 0.02, MATERIALS.paintedSteel(0x2a2e33));
  const barMat = MATERIALS.emissive(0x5fd0a0, 1.6);
  const bar = box(g, 0.34, 1, 0.10, 0, 0, R + 0.10, barMat);
  const fullH = H * 0.52, base = H * 0.30 - fullH / 2;
  const setFill = (frac) => {
    const f = Math.max(0.04, Math.min(1, frac));
    bar.scale.y = fullH * f;
    bar.position.y = base + (fullH * f) / 2;
  };
  setFill(0.59);            // 3.9 t of the 6.6 t the vehicle needs, at sol 291

  // The umbilical mast, which is how the propellant actually gets aboard.
  const mast = new THREE.Group();
  box(mast, 0.7, 22, 0.7, 0, 11, 0, MATERIALS.steel());
  box(mast, 3.0, 0.5, 0.5, 1.5, 15.5, 0, MATERIALS.steel());
  box(mast, 0.4, 0.4, 0.4, 3.0, 15.0, 0, dark);
  mast.position.set(x - 7.5, y, z);
  scene.add(mast);

  g.position.set(x, y, z);
  scene.add(g);

  if(colliders){
    colliders.push(new THREE.Box3(
      new THREE.Vector3(x - 5.4, y, z - 5.4), new THREE.Vector3(x + 5.4, y + 27, z + 5.4)));
    colliders.push(new THREE.Box3(
      new THREE.Vector3(x - 8.0, y, z - 0.6), new THREE.Vector3(x - 7.0, y + 22, z + 0.6)));
  }

  // The fill, over the fifteen sols. Sol 291 opens at 3.9 tonnes of the 6.6 the
  // vehicle needs and the campaign finishes it, so the bar is the story told in
  // one dimension. Anything the player has not reached yet is a bar that has
  // not moved.
  stateHooks?.push((state) => {
    const sol = Math.max(1, Math.min(15, Number(state?.week) || 1));
    setFill(0.59 + 0.41 * ((sol - 1) / 14));
  });
  return g;
}

/** The blast berm: a broken ring of pushed-up regolith around the pad. */
function blastBerm(scene, groundAt, { cx, cz, r = 30, rand, colliders = null }){
  for(let i = 0; i < 34; i++){
    const a = (i / 34) * Math.PI * 2;
    // The gap on the plant side is where the track and the pipe come in.
    if(Math.abs(((a - Math.PI / 2 + Math.PI) % (Math.PI * 2)) - Math.PI) < 0.30) continue;
    const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
    const h = 2.4 + rand() * 1.2;
    const g = new THREE.Group();
    lump(g, 0, -h * 0.30, 0, 5.4, h, 3.2, rand() < 0.4 ? DIRT_D() : DIRT(), a);
    g.position.set(x, groundAt(x, z), z);
    scene.add(g);
    g.updateMatrixWorld(true);
    collideMound(colliders, g, { inset: 0.8 });
  }
}

/**
 * A flexible tunnel between two modules: a corrugated tube on short legs.
 *
 * Crews on this station move between buildings inside these rather than suiting
 * up, and they are the reason the plant reads as one machine rather than as a
 * row of sheds. Built as a run of rings, so the corrugation is the silhouette.
 */
function flexTunnel(scene, groundAt, x0, z0, x1, z1){
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const rings = Math.max(4, Math.round(len / 1.4));
  const g = new THREE.Group();
  const skin = MATERIALS.paintedSteel(0xa8a094);
  for(let i = 0; i <= rings; i++){
    const t = i / rings;
    const r = i % 2 ? 1.05 : 0.95;
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.8, 12), skin);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 1.6, -len / 2 + t * len);
    ring.castShadow = true;
    g.add(ring);
    if(i % 4 === 0) box(g, 0.16, 1.2, 0.16, 0, 0.6, -len / 2 + t * len, MATERIALS.steel());
  }
  g.position.set((x0 + x1) / 2, groundAt((x0 + x1) / 2, (z0 + z1) / 2), (z0 + z1) / 2);
  g.rotation.y = Math.atan2(dx, dz);
  scene.add(g);
  return g;
}

/** A bank of radiator fins: how a plant that makes heat gets rid of it. */
function radiators(scene, x, z, y, { facing = 0, n = 7, h = 4.2 } = {}){
  const g = new THREE.Group();
  const fin = new THREE.MeshStandardMaterial({
    color: 0xdad6cc, roughness: 0.45, metalness: 0.2, side: THREE.DoubleSide });
  for(let i = 0; i < n; i++){
    const f = box(g, 0.06, h, 5.0, (i - (n - 1) / 2) * 1.1, h / 2 + 1.0, 0, fin);
    f.rotation.y = 0.08;
  }
  box(g, n * 1.1 + 0.6, 0.4, 5.4, 0, 0.9, 0, MATERIALS.steel());
  for(const sx of [-1, 1]) box(g, 0.3, 1.0, 0.3, sx * (n * 0.5), 0.5, 0, MATERIALS.steel());
  g.rotation.y = facing;
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

/**
 * The high-gain antenna, pointed low at the horizon.
 *
 * Earth is never far from the ecliptic as seen from here, so the dish sits at a
 * shallow elevation rather than pointing up — which is the detail that makes it
 * read as an interplanetary link rather than as a satellite dish.
 */
function antenna(scene, x, z, y){
  const g = new THREE.Group();
  const steel = MATERIALS.steel();
  cyl(g, 0.24, 5.0, 0, 2.5, 0, steel);
  const dish = new THREE.Mesh(
    new THREE.SphereGeometry(2.6, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.36),
    new THREE.MeshStandardMaterial({ color: 0xd8d4ca, roughness: 0.5, metalness: 0.3,
      side: THREE.DoubleSide }));
  dish.rotation.x = Math.PI * 0.66;         // low elevation, looking at the horizon
  dish.position.y = 5.6;
  g.add(dish);
  cyl(g, 0.12, 1.8, 0, 4.4, 1.5, steel);
  for(const a of [0.4, 2.5, 4.6]){
    const guy = box(g, 0.04, 5.4, 0.04, Math.cos(a) * 1.6, 2.4, Math.sin(a) * 1.6, steel);
    guy.rotation.z = Math.cos(a) * 0.3;
    guy.rotation.x = -Math.sin(a) * 0.3;
  }
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

/**
 * A dust devil, standing on the plain a long way off.
 *
 * They are a real and constant feature of this ground — a column of lifted dust
 * a few metres across and a hundred or more tall, wandering across the plain
 * for half an hour. Static here: a moving one would need an update hook and
 * would be, at this distance, a slow smudge. Rendered as a tapering translucent
 * column, drawn without depth writing so it does not cut a hole in the sky.
 */
function dustDevil(scene, x, z, y, { h = 90, r = 3.5 } = {}){
  const geo = new THREE.CylinderGeometry(r * 2.1, r * 0.5, h, 12, 1, true);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xc79a72, transparent: true, opacity: 0.24, depthWrite: false,
    side: THREE.DoubleSide, fog: true });
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y + h / 2, z);
  m.rotation.z = 0.06;
  m.userData.ignoreAudit = true;
  scene.add(m);
  return m;
}

/**
 * Phobos, up there.
 *
 * It crosses this sky three times a sol from west to east, close enough to show
 * a disc and a shape. One emissive lump, well inside the camera's far plane and
 * outside anywhere the player can walk, and it is worth the eight lines: it is
 * the one object in the scene that could not be anywhere else.
 */
function phobos(scene, x, y, z){
  const m = new THREE.Mesh(ROCK, MATERIALS.emissive(0xbfb2a4, 0.5));
  m.position.set(x, y, z);
  m.scale.set(9, 7.4, 8);
  m.rotation.set(0.6, 1.1, 0.3);
  m.userData.ignoreAudit = true;
  scene.add(m);
  return m;
}

/**
 * Decorate the station.
 *
 * Order matters in one place: the berms go down after their modules, because
 * they are positioned off the same numbers.
 */
export function decorate(scene, ctx){
  const { groundHeight, colliders, softColliders, interactables, stateHooks } = ctx;
  const at = (x, z) => groundHeight(x, z);
  // Colliders are boxes, not meshes: `blocked` reads `.min` and `.max` off every
  // entry, so pushing a group straight in throws on the first person the crowd
  // tries to place — which is a black screen rather than a bad collision.
  const hard = (g) => { if(g && colliders) colliders.push(new THREE.Box3().setFromObject(g)); };
  const rand = rng(0x5EED2A11);

  // The wind is from the north-west, which is why every streak and every dune
  // horn on this plain lies the same way.
  const WIND = Math.PI * 0.75;

  // ------------------------------------------------------------- the modules
  // Buried to the eaves, with the door end cut open.
  for(const b of site.buildings){
    berm(scene, b, at(b.x, b.z), rand, colliders);
  }

  // The tunnels the crew actually walk in, between the modules that are close
  // enough to be joined. The plant line itself is too long to tunnel, which is
  // why there are rovers.
  flexTunnel(scene, at, -30, 30, -31, -2);        // intake to water plant
  flexTunnel(scene, at, -6, 16, -30, 30);         // control to intake
  flexTunnel(scene, at, 27, 26, 25, -10);         // electrolysis to catalyst bay
  flexTunnel(scene, at, -58, 42, -6, 16);         // habitat to control

  // ------------------------------------------------------- the process line
  // The pipe that is the whole argument: atmosphere in at the top of the site,
  // hydrogen joining it, the reactor, the cold end, the tanks, the vehicle.
  // Every one of these is a run the player walks beside on the way to a stop.
  // Two spines running parallel to the track with short spurs off them, rather
  // than the shortest line between each pair of modules. The first version ran
  // diagonally across the frontage at chest height and put a handrail across
  // every door in the station — a plant is plumbed along its roads for exactly
  // that reason.
  const line = [
    [13.5, 32, 13.5, -104],    // the east spine: gas, all the way to the pad
    [-14.5, 32, -14.5, -62],   // the west spine: water and product
    [13.5, 26, 20, 26],        // spur to the electrolysis hall
    [13.5, -10, 19, -10],      // spur to the catalyst bay
    [13.5, -46, 22, -46],      // spur to the cold end
    [-14.5, 30, -23, 30],      // spur to the intake
    [-14.5, -2, -24, -2],      // spur to the water plant
    [-14.5, -34, -19, -34],    // spur to the reactor hall
    [13.5, -72, 13.5, -78],    // spur down into the tank farm
  ];
  for(const [x0, z0, x1, z1] of line){
    const soft = pipeRun(scene, { x0, z0, x1, z1, y: at(x0, z0), height: 2.2, r: 0.20,
      colour: 0x7f7264 });
    if(softColliders) softColliders.push(...soft);
  }

  // Radiators beside the cold end and the electrolysis hall: both of them are
  // machines whose real problem is getting rid of heat, and on a planet with
  // almost no air the only way out is radiation.
  hard(radiators(scene, 42, -44, at(42, -44), { facing: -Math.PI / 2, n: 8 }));
  hard(radiators(scene, 40, 30, at(40, 30), { facing: -Math.PI / 2, n: 5, h: 3.4 }));

  // ------------------------------------------------------------ the tank farm
  // Lagged white and standing in a bund, with a vent stack that is the only
  // thing on the station allowed to be losing something on purpose.
  for(const [tx, tz, r, h] of [[13, -80, 2.6, 9], [21, -82, 2.6, 9], [28, -79, 2.0, 7]]){
    const t = tank(scene, tx, tz, at(tx, tz), { r, h, colour: 0xd2cec4 });
    if(softColliders) softColliders.push(t);
  }
  {
    const g = new THREE.Group();
    cyl(g, 0.22, 7.0, 0, 3.5, 0, MATERIALS.steel());
    cyl(g, 0.42, 0.6, 0, 7.2, 0, MATERIALS.paintedSteel(0x8f6a4a));
    g.position.set(34, at(34, -80), -80);
    scene.add(g);
  }

  // -------------------------------------------------------------- the vehicle
  // Beyond the tank farm, inside a broken ring of pushed-up ground.
  blastBerm(scene, at, { cx: 0, cz: -132, r: 30, rand, colliders });
  ascentVehicle(scene, 0, -132, at(0, -132), { stateHooks, colliders });

  // ------------------------------------------------------------ the array
  // Six hundred panels east of the plant, the near third of them swept this
  // week and the rest carrying a fortnight of dust. Which is which is legible
  // from the track, which is the point.
  solarField(scene, at, { x0: 62, z0: -18, cols: 26, rows: 23, pitch: 3.4, rand });
  antenna(scene, 88, 44, at(88, 44));

  // Cable trays from the field back to the plant, on low trestles.
  for(const dz of [-2, 2]){
    const soft = pipeRun(scene, { x0: 60, z0: 22 + dz, x1: 34, z1: 22 + dz,
      y: at(60, 22), height: 1.2, r: 0.16, colour: 0x5d5a52 });
    if(softColliders) softColliders.push(...soft);
  }

  // ------------------------------------------------------- the excavation
  // The ground north-west of the plant, cut over and over for the ice cemented
  // through it. The drill rig stands at the working face.
  {
    const g = new THREE.Group();
    const steel = MATERIALS.steel();
    box(g, 4.2, 1.2, 6.0, 0, 0.9, 0, MATERIALS.paintedSteel(0x9a6a3a));
    for(const sx of [-1, 1]) box(g, 0.8, 0.9, 5.4, sx * 1.9, 0.45, 0, MATERIALS.rubber());
    const mastG = box(g, 0.5, 9.0, 0.5, 0, 5.4, -1.2, steel);
    mastG.rotation.x = 0.22;
    box(g, 1.6, 0.4, 0.4, 0, 9.6, -3.0, steel);
    cyl(g, 0.18, 3.0, 0, 8.0, -3.4, steel);
    g.position.set(-74, at(-74, -30), -30);
    g.rotation.y = 0.4;
    scene.add(g);
    hard(g);
  }
  // Spoil heaps from the cut, and the hopper the loads go into.
  // Kept off the haul lane. The machine and the rovers come in from the east
  // along z ≈ -26, and the first placement put three heaps and the rig in a ring
  // around the working face: a flood fill from the spawn could not reach the
  // drill at all, which is a place with a prop in it and no way in.
  for(const [x, z, r, h] of [[-62, -8, 4.0, 2.0], [-86, -42, 4.6, 2.4], [-72, -48, 3.4, 1.7]]){
    const g = new THREE.Group();
    for(let i = 0; i < 5; i++){
      const a = rand() * 6.28, d = r * 0.4 * rand();
      lump(g, Math.cos(a) * d, -h * 0.25, Math.sin(a) * d,
        r * (0.9 + rand() * 0.5), h * (0.6 + rand() * 0.5), r * (0.9 + rand() * 0.5),
        i % 2 ? DIRT() : DIRT_D(), rand() * 3.1);
    }
    g.position.set(x, at(x, z), z);
    scene.add(g);
    g.updateMatrixWorld(true);
    collideMound(colliders, g, { inset: 0.76 });
  }

  // ----------------------------------------------------------- the ground
  // Dunes, all lying across the wind, kept off the track and away from the
  // buildings. A dune across the route is a dune the player walks into.
  const clearOfPlant = (x, z) =>
    !onTrack(x, z, 6) &&
    Math.abs(x) > 14 &&
    !site.buildings.some(b => Math.abs(x - b.x) < b.w / 2 + 8 && Math.abs(z - b.z) < b.d / 2 + 8) &&
    Math.hypot(x, z - 52) > 20 && Math.hypot(x, z + 132) > 42;
  for(let i = 0; i < 60; i++){
    const a = rand() * Math.PI * 2, d = 40 + rand() * 260;
    const x = Math.cos(a) * d, z = Math.sin(a) * d;
    if(!clearOfPlant(x, z)) continue;
    // (x, z, y) — ground last, like every placer in kit.js. Written the other
    // way round the first time, which put eighteen dunes into the sky at the
    // height of their own z coordinate: the contact sheet showed four brown
    // lumps hanging over the excavation and nothing else was wrong anywhere.
    dune(scene, x, z, at(x, z), {
      facing: WIND + (rand() - 0.5) * 0.4,
      span: 12 + rand() * 22, height: 0.9 + rand() * 1.3, rand, colliders,
    });
  }

  // Boulders with their streaks, thicker near the crater ejecta to the north.
  for(let i = 0; i < 150; i++){
    const a = rand() * Math.PI * 2, d = 26 + rand() * 300;
    const x = Math.cos(a) * d, z = Math.sin(a) * d;
    if(!clearOfPlant(x, z)) continue;
    // More of them to the north, where the rim is: ejecta thins with distance
    // from the crater that threw it.
    if(z > 0 && rand() < 0.55) continue;
    boulderWithTail(scene, x, z, at(x, z), { r: 0.5 + rand() * 1.8, wind: WIND, rand, soft: softColliders });
  }

  // Small scatter close in, so the ground the player walks over is not bare.
  const scatter = new THREE.InstancedMesh(ROCK, DIRT_D(), 900);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  let n = 0;
  for(let i = 0; i < 900; i++){
    const a = rand() * Math.PI * 2, d = 14 + rand() * 200;
    const x = Math.cos(a) * d, z = Math.sin(a) * d;
    if(Math.abs(x) < 8 && z > -120 && z < 50) continue;       // the track
    if(Math.hypot(x, z - 52) < 12) continue;                  // the spawn
    const s = 0.12 + rand() * 0.3;
    e.set(rand() * 3, rand() * 3, rand() * 3);
    q.setFromEuler(e);
    m4.compose(new THREE.Vector3(x, at(x, z) + s * 0.3, z), q,
      new THREE.Vector3(s, s * 0.7, s * 1.2));
    scatter.setMatrixAt(n++, m4);
  }
  scatter.count = n;
  scatter.instanceMatrix.needsUpdate = true;
  scatter.receiveShadow = true;
  scene.add(scatter);

  // Three dust devils out on the plain, at the distance they are usually seen
  // at, and one moon.
  dustDevil(scene, 210, -180, at(0, 0), { h: 110, r: 4.0 });
  dustDevil(scene, -260, -90, at(0, 0), { h: 70, r: 2.8 });
  dustDevil(scene, 150, 240, at(0, 0), { h: 85, r: 3.2 });
  phobos(scene, -180, 300, -420);

  // --------------------------------------------------------------- the yard
  crateStack(scene, 40, 50, at(40, 50), { count: 5 });
  crateStack(scene, 44, 54, at(44, 54), { count: 3 });
  crateStack(scene, -46, 34, at(-46, 34), { count: 4 });
  crateStack(scene, 12, -62, at(12, -62), { count: 3 });

  /**
   * A pressurised rover, and the player can drive it.
   *
   * The plant is four hundred metres end to end and the pad is another hundred
   * beyond that, in a suit, on a planet where a walk is an oxygen budget. The
   * rovers are why a call at the cold end is affordable at all.
   */
  const rover = (x, z, opts = {}) => {
    const v = vehicle(scene, x, z, at(x, z), { facing: opts.facing ?? 0, colour: opts.colour ?? 0xb8b2a6 });
    // What makes it pressurised rather than a pickup: a hard shell over the bed,
    // a docking ring on the back, and a ladder up to the roof rack.
    const shell = new THREE.Group();
    const skin = MATERIALS.paintedSteel(opts.colour ?? 0xb8b2a6);
    const dark = MATERIALS.paintedSteel(0x3a3f45);
    const hull = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 3.4, 12), skin);
    hull.rotation.x = Math.PI / 2;
    hull.position.set(0, 2.5, 1.1);
    shell.add(hull);
    const ringMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.4, 12), dark);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 2.5, 2.9);
    shell.add(ringMesh);
    box(shell, 2.0, 0.1, 1.4, 0, 3.7, 1.0, dark);
    for(const sx of [-1, 1]) box(shell, 0.08, 1.2, 0.08, sx * 0.9, 3.1, 2.7, dark);
    v.group.add(shell);
    return driveable(scene, v.group, {
      id: opts.id, label: opts.label ?? 'pressurised rover',
      halfWidth: 1.4, halfLength: 3.2, height: 3.9,
      seat: { x: 0.42, y: 2.1, z: v.cabZ },
      // Slower than a truck on a road, and this is not a road.
      wheels: v.wheels, topSpeed: 9,
      colliders, interactables,
    });
  };

  rover(15, 46, { facing: 0, colour: 0xb8b2a6, id: 'rover-yard', label: 'pressurised rover' });
  rover(-16, 8, { facing: Math.PI, colour: 0xa07a5a, id: 'rover-plant', label: 'plant rover' });
  rover(-70, -18, { facing: 0.4, colour: 0x8f9aa4, id: 'rover-dig', label: 'excavation rover' });
}

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box: put, materials: M, soft, scene } = ctx;
  void b; void put; void M; void soft; void scene; void room;
}

/** Fit out the spine. Unused here: this theme's rooms come from the outdoor world. */
export function fitOutSpine(){}
