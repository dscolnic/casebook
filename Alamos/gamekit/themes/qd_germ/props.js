// props.js — the objects unique to Marlow Fields.
//
// Everything generic — the buildings, the signs, the benches, the posts, the
// scrub — is `engine/world/kit.js`, placed from site.js. This file is the handful
// of things that make this a Victorian court beside a fever hospital rather than
// a farm: the standpipe the campaign is named after, the terrace of houses round
// it, the fence between the court and the hospital ground, and the two ways of
// getting about.
//
// Placement helpers take `(x, z, y)` — ground last. House rule 7.

import * as THREE from 'three';
import { box, cyl, crateStack, post, bicycle, BICYCLE_DRIVE,
  clearSpot } from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';

/**
 * The standpipe: a stone plinth, a cast-iron column, a spout and the handle.
 *
 * The handle is the object this game is named after, so it is built long and
 * horizontal rather than as a stub — from ten metres the silhouette of a pump is
 * a column with an arm sticking out of it, and a column on its own is a bollard.
 */
function standpipe(scene, { x, z, y, mats }){
  const g = new THREE.Group();
  // The step. The first cut of this was 1.9 m square and 0.5 m tall in a pale
  // stone, which under ACES with a bright sky IBL renders as a white pallet with
  // a stick in it — house rule 6 — and it was wider than the pump was tall. A
  // worn kerb is 1.2 m and dark.
  box(g, 1.20, 0.16, 1.20, 0, 0.08, 0, mats.kerb);
  // The column: slim, tapering, and only head height. A standpipe reads by being
  // thinner than a bollard, which the first version was not.
  cyl(g, 0.11, 1.55, 0, 0.94, 0, mats.iron, 0.085);
  cyl(g, 0.16, 0.10, 0, 1.76, 0, mats.iron);
  // The swan neck and the spout, out over the step, at bucket height.
  const neck = cyl(g, 0.05, 0.44, 0, 1.62, 0.20, mats.iron);
  neck.rotation.x = Math.PI / 2;
  cyl(g, 0.05, 0.30, 0, 1.47, 0.40, mats.iron);
  // The handle: a long arm on a pivot, resting down. This is the thing the
  // parish took off, so it is nearly as long as the column is tall and it sits
  // clear of it at the top rather than crossing it halfway.
  const arm = new THREE.Group();
  box(arm, 0.07, 0.07, 1.20, 0, 0, -0.50, mats.iron);
  box(arm, 0.06, 0.22, 0.06, 0, -0.09, -1.02, mats.dark);
  arm.position.set(0, 1.58, 0);
  arm.rotation.x = 0.30;
  g.add(arm);
  // The bucket somebody left on the step.
  cyl(g, 0.15, 0.28, 0.42, 0.30, 0.30, mats.iron, 0.13);
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

/**
 * A terrace of low houses: one long block with the party walls picked out and a
 * door and a window per house.
 *
 * Built as boxes rather than through `building()` because these are the court
 * rather than places anybody goes into, and forty households have to read as a
 * wall of dwellings from the lane. `n` houses, running along +x from (x, z).
 */
function terrace(scene, { x, z, y, n, mats, facing = 0, hard }){
  // A two-up two-down is about three and a half metres wide, and the windows are
  // taller than they are broad. The first cut used 4.2 m bays and square windows,
  // which renders as a block of modern flats — the proportion is the whole of the
  // period here, not the colour.
  const W = 3.5, D = 5.4, H = 5.6;
  const g = new THREE.Group();
  for(let i = 0; i < n; i++){
    const cx = (i - (n - 1) / 2) * W;
    box(g, W - 0.06, H, D, cx, H / 2, 0, i % 2 ? mats.brick : mats.brickDark);
    // Party wall, standing proud of the front and carried above the eaves, which
    // is what stops a terrace reading as one long block.
    box(g, 0.20, H + 0.9, D + 0.16, cx + W / 2, (H + 0.9) / 2, 0, mats.brickDark);
    // Door, and two tall sashes above and beside it.
    box(g, 0.86, 2.00, 0.09, cx - 0.78, 1.00, D / 2 + 0.05, mats.door);
    box(g, 0.80, 1.30, 0.07, cx + 0.82, 1.45, D / 2 + 0.05, mats.glass);
    box(g, 0.80, 1.30, 0.07, cx - 0.78, 3.60, D / 2 + 0.05, mats.glass);
    box(g, 0.80, 1.30, 0.07, cx + 0.82, 3.60, D / 2 + 0.05, mats.glass);
    // Chimney stack on the party wall, which is where it belongs and where it
    // reads against the sky.
    box(g, 0.62, 1.7, 0.9, cx + W / 2, H + 1.75, -0.8, mats.brickDark);
    for(const px of [-0.16, 0.16]) cyl(g, 0.09, 0.36, cx + W / 2 + px, H + 2.75, -0.8, mats.pot);
  }
  // A slate roof over the whole run, as two slopes with a real pitch. The first
  // version rotated by 0.20 rad, which at this span is a flat plate: it read as a
  // parapet and the terrace looked like an office block.
  const runW = n * W;
  const pitch = 0.62;
  for(const s of [-1, 1]){
    const r = box(g, runW + 0.4, 0.12, D * 0.62, 0, H + 0.85, s * (D * 0.27), mats.slate);
    r.rotation.x = s * pitch;
  }
  // The gable ends, filling the triangle the two slopes leave.
  for(const s of [-1, 1]){
    box(g, 0.24, 1.5, D * 0.5, s * (runW / 2), H + 0.7, 0, mats.brickDark);
  }
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  if(hard){
    const cos = Math.cos(facing), sin = Math.sin(facing);
    for(let i = 0; i < n; i++){
      const off = (i - (n - 1) / 2) * W;
      hard(x + off * cos, z - off * sin, W, D, H);
    }
  }
  return g;
}

/**
 * A brick wall with a stone coping, as a run between two points.
 *
 * `kit.js`'s `fenceRun` is chain-link — a galvanised mesh panel with a diagonal
 * weave texture on it. That is right for a switchyard and it is a hundred years
 * early here, and a screenshot is the only thing that says so: the geometry, the
 * collider and the reachability are all identical either way.
 */
function wallRun(scene, { x0, z0, x1, z1, y = 0, height = 2.1, mats, hard }){
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const g = new THREE.Group();
  box(g, len, height, 0.34, 0, height / 2, 0, mats.brickDark);
  box(g, len, 0.12, 0.44, 0, height + 0.06, 0, mats.stone);
  // Piers every four metres, which is what stops a long run reading as a slab.
  const piers = Math.max(2, Math.round(len / 4));
  for(let i = 0; i <= piers; i++){
    box(g, 0.44, height + 0.22, 0.5, -len / 2 + (i / piers) * len, (height + 0.22) / 2, 0, mats.brick);
  }
  g.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  g.rotation.y = Math.atan2(dx, dz);
  scene.add(g);
  if(hard){
    const n = Math.max(2, Math.round(len / 3));
    for(let i = 0; i <= n; i++){
      const t = i / n;
      hard(x0 + dx * t, z0 + dz * t, 1.2, 1.2, height);
    }
  }
  return g;
}

export function decorate(scene, ctx){
  const { groundHeight, colliders, MATERIALS } = ctx;
  const std = (colour, roughness = 0.9, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color: colour, roughness, metalness });
  const mats = {
    // London stock brick under coal smoke, which is a great deal darker than a
    // brick swatch. House rule 6: under ACES with a bright sky IBL, a mid albedo
    // renders near-white, and the first cut of this terrace was a row of cream
    // boxes with nothing Victorian about it.
    // Two stops below what looks right on the canvas, which is house rule 6 and
    // the reason the first cut of this court read as a row of tan holiday lets.
    brick:     std(0x4a3a2e),
    brickDark: std(0x3d3027),
    stone:     std(0x5c574b),
    kerb:      std(0x4e4a41),
    pot:       std(0x5a3f31),
    slate:     std(0x262a2f),
    iron:      new THREE.MeshStandardMaterial({ color: 0x3b3f42, roughness: 0.55, metalness: 0.45,
      envMapIntensity: 0.4 }),
    dark:      std(0x2b2d2f),
    door:      std(0x3f3128),
    // Roughness 0.25 and an environment at half strength turned the upstairs
    // windows into one continuous white bar running across two houses — a sash
    // catching the sky, merged by distance. Only a screenshot from across the
    // court shows it; from square on it reads as a bright window.
    glass:     new THREE.MeshStandardMaterial({ color: 0x293335, roughness: 0.62, metalness: 0.05,
      envMapIntensity: 0.15 }),
    timber:    std(0x6a5943),
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

  // ---- the standpipe, out in the open court and IN FRONT of its own shelter.
  //
  // The pump shelter is at (−24, −12) and its door faces the player, so anything
  // put behind it is invisible from the whole lane. The other site in this set
  // learnt that the expensive way: the horn antenna a campaign was named after was
  // placed north of its hut, which is correct for a real site and means the hut
  // is exactly in front of it from everywhere anybody walks. This stands ten
  // metres nearer the spawn than the shelter does, clear of both.
  const px = -25, pz = 1;
  standpipe(scene, { x: px, z: pz, y: groundHeight(px, pz), mats });
  hard(px, pz, 1.4, 1.4, 2.6);

  // ---- the court: two terraces facing each other across the pump, which is what
  // makes forty households on one standpipe a thing you can see rather than read.
  terrace(scene, { x: -25, z: 13, y: groundHeight(-25, 13), n: 5, mats, facing: Math.PI, hard });
  terrace(scene, { x: -25, z: -11, y: groundHeight(-25, -11), n: 4, mats, facing: 0, hard });

  // ---- the fence between the court and the hospital ground, with the gap that
  // is the gate. Everything in level two is on the far side of it.
  wallRun(scene, { x0: -46, z0: -26, x1: -8, z1: -26, y: groundHeight(-24, -26), height: 2.1, mats, hard });
  wallRun(scene, { x0: 4, z0: -26, x1: 42, z1: -26, y: groundHeight(24, -26), height: 2.1, mats, hard });

  // ---- the water company's stopcock chamber and its stacked pipe, beside the lane.
  box(scene, 1.2, 0.18, 1.2, -12, groundHeight(-12, 12) + 0.09, 12, mats.stone);
  for(let i = 0; i < 4; i++){
    const cx = -14 - (i % 2) * 0.7, cz = 16 + Math.floor(i / 2) * 0.7;
    const p = cyl(scene, 0.28, 3.2, cx, groundHeight(cx, cz) + 0.28, cz, mats.iron);
    p.rotation.z = Math.PI / 2;
  }
  hard(-14, 16.4, 3.6, 2.0, 0.8);

  // ---- the ward's linen and its bins, which is where a transmission route is
  // actually argued about.
  crateStack(scene, 34, -40, groundHeight(34, -40), { rows: 2, colour: 0x77705e });
  for(const [bx, bz] of [[33, -34], [35.4, -34]]){
    cyl(scene, 0.42, 0.9, bx, groundHeight(bx, bz) + 0.45, bz, mats.iron);
    hard(bx, bz, 0.9, 0.9, 0.9);
  }

  // ---- posts marking the lane, because the laboratory hut is ninety metres out.
  for(const z of [8, -8, -32, -56, -76]){
    post(scene, -5, z, groundHeight(-5, z), 1.6, 0.08, 0x9a9280);
  }

  transport(scene, ctx, mats);
}

// ------------------------------------------------------------------ transport
/**
 * A costermonger's barrow and a bicycle.
 *
 * Two kinds because the site is two places and two eras. The court and the
 * registrar's office are a few yards apart at the near end and everything that
 * turns the argument into an experiment — the ward, the laboratory hut — is a
 * long way up the lane. The barrow is what moves buckets, linen and bins round
 * the court; the bicycle is how one person gets to the far end and back with a
 * culture plate in a carrier.
 *
 * Period rather than function, which is the rule the rest of this set follows:
 * a utility cart out of the kit has a canopy and a bench seat and reads as a
 * groundskeeper's buggy, so the barrow is built here. The bicycle is the kit's,
 * because a safety bicycle is a safety bicycle.
 */
function transport(scene, ctx, mats){
  const { groundHeight, colliders, interactables, blocked } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const spawn = { x: 0, z: 38, r: 13 };

  const bs = clearSpot({ x: -13, z: 26 }, blocked, { pad: 3.0, avoid: [spawn] });
  const b = barrow(scene, bs.x, bs.z, y(bs.x, bs.z), { facing: Math.PI, mats });
  driveable(scene, b.group, {
    id: 'barrow', label: 'costermonger\'s barrow', kind: 'barrow',
    halfWidth: 0.72, halfLength: 1.35, height: 1.20, clearance: 0.26,
    // Standing between the shafts rather than sitting: the eye is where a
    // walking player's is, which is what a pushed vehicle should feel like.
    seat: { x: 0, y: 1.55, z: -1.05 },
    wheels: b.wheels, wheelRadius: 0.52,
    topSpeed: 5.5, sprint: 1.2, accel: 4.0, brake: 5.0, reverseAccel: 2.2,
    coastDrag: 3.0, driveDrag: 1.2, turn: 1.7, gripAt: 1.6, reverseFrac: 0.4, lean: 0,
    hint: 'W/S push · A/D steer · E — let go of the shafts',
    colliders, interactables,
  });

  const cs = clearSpot({ x: 11, z: 20 }, blocked,
    { pad: 2.2, avoid: [spawn, { x: bs.x, z: bs.z, r: 5 }] });
  const cyc = bicycle(scene, cs.x, cs.z, y(cs.x, cs.z),
    { facing: Math.PI, colour: 0x2f3a30, basket: true });
  driveable(scene, cyc.group, {
    ...BICYCLE_DRIVE,
    id: 'bicycle', label: 'bicycle', kind: 'bicycle',
    wheels: cyc.wheels,
    colliders, interactables,
  });
}

/**
 * A costermonger's barrow: a flat bed on two tall spoked wheels, with two shafts
 * running forward for whoever is pushing it.
 *
 * The wheels are the silhouette. They are 1.04 m across — taller than the bed —
 * because that is what a barrow of this period had and it is the only thing
 * separating it at ten metres from a modern trolley. Spokes are eight boxes
 * rather than a disc, for the reason `kit.js` records against the bicycle: a
 * thin disc renders as a solid grey wheel.
 *
 * The body runs along -z, like every driveable.
 */
function barrow(scene, x, z, y = 0, { facing = 0, mats } = {}){
  const g = new THREE.Group();
  const R = 0.52;
  const wheels = [];
  for(const sx of [0.72, -0.72]){
    const w = new THREE.Group();
    const tyre = new THREE.Mesh(new THREE.TorusGeometry(R - 0.04, 0.045, 6, 20), mats.iron);
    w.add(tyre);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.14, 10), mats.iron);
    hub.rotation.x = Math.PI / 2;
    w.add(hub);
    for(let i = 0; i < 8; i++){
      const a = (i / 8) * Math.PI * 2;
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.035, R - 0.08, 0.035), mats.timber);
      s.position.set(Math.cos(a) * (R - 0.08) / 2, Math.sin(a) * (R - 0.08) / 2, 0);
      s.rotation.z = a - Math.PI / 2;
      w.add(s);
    }
    w.rotation.y = Math.PI / 2;
    w.position.set(sx, R, 0.05);
    w.userData.spinAxis = 'x';
    wheels.push(w);
    g.add(w);
  }
  // The bed, its sides, and the tailboard.
  box(g, 1.30, 0.09, 2.05, 0, 0.66, 0, mats.timber);
  for(const s of [-1, 1]) box(g, 0.07, 0.34, 2.05, s * 0.63, 0.87, 0, mats.timber);
  box(g, 1.30, 0.34, 0.07, 0, 0.87, 1.02, mats.timber);
  // The two shafts, running forward, and the prop leg they rest on.
  for(const s of [-1, 1]) box(g, 0.07, 0.07, 1.50, s * 0.52, 0.74, -1.45, mats.timber);
  box(g, 1.15, 0.07, 0.07, 0, 0.74, -2.16, mats.timber);
  box(g, 0.06, 0.72, 0.06, 0, 0.38, -1.95, mats.timber);
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  g.traverse(o => { if(o.isMesh) o.castShadow = true; });
  return { group: g, wheels, R };
}

/** Unused here — this theme is outdoor. Exported so all three can be. */
export function fitOutRoom(){}
export function fitOutSpine(){}
