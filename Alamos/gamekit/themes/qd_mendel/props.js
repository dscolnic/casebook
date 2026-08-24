// props.js — the objects unique to the Abbey Garden.
//
// Everything generic — the buildings, the signs, the benches, the posts — is
// `engine/world/kit.js`, placed from site.js. This file is the handful of things
// that make this a breeding garden rather than a field: the trial beds
// themselves, the wall round them, the frames, the skeps, and the two ways of
// getting about.
//
// Placement helpers take `(x, z, y)` — ground last. House rule 7.

import * as THREE from 'three';
import { box, cyl, crateStack, post, clearSpot } from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';

/**
 * One trial bed: a raised edge, a row of pea haulm on canes, and a label stake.
 *
 * The canes are the silhouette. A pea bed without them is a green rectangle and
 * reads as a lawn from twenty metres; with them it reads as a crop somebody is
 * managing, which is the whole difference between a garden and a field. Ten
 * canes with a string course between them costs twenty-two meshes a bed, which
 * is why there are twenty-eight beds and not two hundred.
 */
function trialBed(scene, { x, z, y, mats, len = 7.0, wide = 1.6, ripe = false, hard }){
  const g = new THREE.Group();
  // Board edging and the soil inside it.
  for(const s of [-1, 1]) box(g, 0.08, 0.26, len, s * wide / 2, 0.13, 0, mats.timber);
  box(g, wide, 0.16, len, 0, 0.08, 0, mats.soil);
  // The haulm: a low mass of foliage along the row. Two stops darker than looks
  // right, because house rule 19 is about exactly this — mid-green plants on
  // mid-green ground read as one flat smear from twenty metres.
  box(g, wide * 0.72, 0.75, len - 0.4, 0, 0.62, 0, ripe ? mats.haulmDry : mats.haulm);
  // Canes and one string course.
  const n = 8;
  for(let i = 0; i < n; i++){
    const cz = -len / 2 + 0.5 + i * ((len - 1) / (n - 1));
    for(const s of [-1, 1]) cyl(g, 0.022, 1.7, s * wide * 0.32, 0.85, cz, mats.cane);
  }
  for(const s of [-1, 1]) box(g, 0.02, 0.02, len - 0.8, s * wide * 0.32, 1.45, 0, mats.twine);
  // The label stake at the head of the bed, which is the only thing here that
  // makes one bed different from the next.
  cyl(g, 0.02, 0.7, 0, 0.35, len / 2 + 0.25, mats.timber);
  box(g, 0.30, 0.16, 0.02, 0, 0.68, len / 2 + 0.25, mats.label);
  g.position.set(x, y, z);
  scene.add(g);
  if(hard) hard(x, z, wide + 0.2, len, 1.0);
  return g;
}

/** A cold frame: a brick kerb with a sloping light over it. */
function coldFrame(scene, { x, z, y, mats, w = 3.0, d = 1.8 }){
  const g = new THREE.Group();
  box(g, w, 0.5, d, 0, 0.25, 0, mats.brick);
  const light = box(g, w - 0.1, 0.06, d + 0.2, 0, 0.62, 0, mats.glass);
  light.rotation.x = 0.18;
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

/**
 * A brick garden wall with a stone coping, as a run between two points.
 *
 * `kit.js`'s `fenceRun` is chain-link — a galvanised mesh panel with a diagonal
 * weave on it — which is right for a switchyard and two generations early for a
 * monastery garden. The geometry, the collider and the reachability are
 * identical either way, so only a screenshot says which one is standing there.
 */
function wallRun(scene, { x0, z0, x1, z1, y = 0, height = 2.6, mats, hard }){
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const g = new THREE.Group();
  box(g, len, height, 0.38, 0, height / 2, 0, mats.brick);
  box(g, len, 0.14, 0.5, 0, height + 0.07, 0, mats.stone);
  const piers = Math.max(2, Math.round(len / 5));
  for(let i = 0; i <= piers; i++){
    box(g, 0.5, height + 0.3, 0.56, -len / 2 + (i / piers) * len, (height + 0.3) / 2, 0, mats.brick);
  }
  g.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  g.rotation.y = Math.atan2(dx, dz);
  scene.add(g);
  if(hard){
    const n = Math.max(2, Math.round(len / 3));
    for(let i = 0; i <= n; i++){
      const t = i / n;
      hard(x0 + dx * t, z0 + dz * t, 1.3, 1.3, height);
    }
  }
  return g;
}

export function decorate(scene, ctx){
  const { groundHeight, colliders, MATERIALS } = ctx;
  const std = (colour, roughness = 0.9, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color: colour, roughness, metalness });
  const mats = {
    // Ground and crop have to be a value apart and the ground is the one to move
    // — house rule 19, learnt on a field of thirteen hundred plots that read as
    // one smear. The soil here is two stops below what looks right on the canvas
    // and browner than a soil swatch.
    soil:     std(0x4a3b2c),
    haulm:    std(0x415c2c),
    haulmDry: std(0x6d6a35),
    cane:     std(0x9a8558),
    twine:    std(0xa79a7c),
    timber:   std(0x6d5c44),
    label:    std(0xcfc7ae),
    brick:    std(0x7d5f4a),
    stone:    std(0x8a8271),
    iron:     new THREE.MeshStandardMaterial({ color: 0x3c4042, roughness: 0.55, metalness: 0.45,
      envMapIntensity: 0.4 }),
    // A low-roughness pane facing the sky renders as one flat white plate, which
    // on a run of cold frames reads as three sheets of paper on the grass. The
    // other outdoor site in this set found the same thing on a terrace's sashes.
    glass:    new THREE.MeshStandardMaterial({ color: 0x2f3d3e, roughness: 0.55, metalness: 0.05,
      envMapIntensity: 0.18 }),
    straw:    std(0xa4914f),
    dark:     std(0x2c2e2f),
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

  // ---- the trial beds, either side of the walk and IN FRONT of both buildings.
  //
  // These are the thing the campaign is about, so they are between the player and
  // the glasshouse rather than behind it. The other outdoor site in this set
  // learnt that the expensive way: a horn antenna a campaign was named after was
  // placed behind its own hut, and from everywhere anybody walks the hut was in
  // front of it.
  //
  // Two blocks of six either side, both of them NEARER the spawn than the
  // buildings are, with a 1.6 m alley between the rows.
  //
  // Both numbers were wrong first time and `reachable` found it. At 2.6 m centres
  // a 1.6 m bed leaves an 0.8 m alley, which is narrower than the player's own
  // diameter, so the whole block was one solid mass; and the far row sat at z = −3,
  // between the spawn and the glasshouse door at z = −7.5, so two of the four stops
  // were walled off behind a pea bed. The beds go where the walk is not.
  for(let i = 0; i < 6; i++){
    const bx = -12 - i * 3.4;
    trialBed(scene, { x: bx, z: 12, y: groundHeight(bx, 12), mats, hard });
    trialBed(scene, { x: bx, z: 4, y: groundHeight(bx, 4), mats, ripe: true, hard });
  }
  for(let i = 0; i < 6; i++){
    const bx = 8 + i * 3.4;
    trialBed(scene, { x: bx, z: 12, y: groundHeight(bx, 12), mats, hard });
    trialBed(scene, { x: bx, z: 4, y: groundHeight(bx, 4), mats, ripe: true, hard });
  }

  // ---- the garden wall. A monastery garden is walled, and the wall is why the
  // bees are a manageable problem rather than an unmanageable one.
  wallRun(scene, { x0: -44, z0: 24, x1: -8, z1: 24, y: groundHeight(-26, 24), height: 2.6, mats, hard });
  wallRun(scene, { x0: 6, z0: 24, x1: 40, z1: 24, y: groundHeight(24, 24), height: 2.6, mats, hard });
  wallRun(scene, { x0: -46, z0: 24, x1: -46, z1: -30, y: groundHeight(-46, -4), height: 2.6, mats, hard });

  // ---- cold frames along the sunny side of the glasshouse.
  for(const cz of [-16, -13.5, -11]) coldFrame(scene, { x: -34, z: cz, y: groundHeight(-34, cz), mats });

  // ---- the skeps outside the bee house, which are the reason every flower in
  // the glasshouse is bagged before it opens.
  // On a shelf against the wall behind the bee house rather than across its door
  // — six skeps at (−24…−20, 11…13) stood exactly on the way in, and `reachable`
  // correctly reported the place unreachable behind its own bees.
  for(const [sx, sz] of [[-40, 18], [-38, 18], [-36, 18], [-40, 16.5], [-38, 16.5], [-36, 16.5]]){
    const y = groundHeight(sx, sz);
    box(scene, 0.9, 0.4, 0.9, sx, y + 0.2, sz, mats.stone);
    cyl(scene, 0.34, 0.55, sx, y + 0.68, sz, mats.straw, 0.16);
  }

  // ---- water butts at the head of the walk, and the trays stacked by the
  // counting room.
  for(const [tx, tz] of [[6, 14], [6, 11]]){
    cyl(scene, 0.55, 1.3, tx, groundHeight(tx, tz) + 0.65, tz, mats.timber);
    hard(tx, tz, 1.2, 1.2, 1.3);
  }
  crateStack(scene, 30, -40, groundHeight(30, -40), { rows: 3, colour: 0x8a7a58 });

  // ---- posts marking the walk, because the seed store is eighty-five metres out.
  for(const z of [16, -14, -34, -56, -74]){
    post(scene, -4, z, groundHeight(-4, z), 1.4, 0.07, 0x9c9078);
  }

  transport(scene, ctx, mats);
}

// ------------------------------------------------------------------ transport
/**
 * A wheelbarrow and a water bowser.
 *
 * Two kinds because the site asks two different questions about getting about.
 * The alleys between the beds are under a metre wide, so anything with two
 * wheels and a bed on it cannot go down them and the barrow can; the seed store
 * is eighty-five metres down the walk, and carrying a season's trays that far by
 * hand is what the bowser's cart is for. That is the rule this set follows —
 * the kinds come from what the place is already about rather than from a list.
 *
 * Both are built here rather than taken from the kit, because the kit's utility
 * cart has a canopy and a bench seat and reads as a groundskeeper's buggy.
 */
function transport(scene, ctx, mats){
  const { groundHeight, colliders, interactables, blocked } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const spawn = { x: 0, z: 36, r: 13 };

  const bs = clearSpot({ x: -11, z: 26 }, blocked, { pad: 2.6, avoid: [spawn] });
  const b = wheelbarrow(scene, bs.x, bs.z, y(bs.x, bs.z), { facing: Math.PI, mats });
  driveable(scene, b.group, {
    id: 'wheelbarrow', label: 'wheelbarrow', kind: 'wheelbarrow',
    halfWidth: 0.42, halfLength: 1.05, height: 1.05, clearance: 0.22,
    // Walking behind it: the eye is where a walking player's is, which is what a
    // pushed vehicle should feel like.
    seat: { x: 0, y: 1.55, z: -0.95 },
    wheels: b.wheels, wheelRadius: 0.30,
    topSpeed: 5.0, sprint: 1.2, accel: 4.2, brake: 5.2, reverseAccel: 2.0,
    coastDrag: 3.2, driveDrag: 1.3, turn: 2.1, gripAt: 1.4, reverseFrac: 0.4, lean: 0,
    hint: 'W/S push · A/D steer · E — set it down',
    colliders, interactables,
  });

  const ws = clearSpot({ x: 10, z: 22 }, blocked,
    { pad: 3.0, avoid: [spawn, { x: bs.x, z: bs.z, r: 5 }] });
  const w = bowser(scene, ws.x, ws.z, y(ws.x, ws.z), { facing: Math.PI, mats });
  driveable(scene, w.group, {
    id: 'bowser', label: 'water bowser', kind: 'bowser',
    halfWidth: 0.80, halfLength: 1.50, height: 1.70, clearance: 0.30,
    seat: { x: 0, y: 1.58, z: -1.40 },
    wheels: w.wheels, wheelRadius: 0.56,
    topSpeed: 6.0, sprint: 1.15, accel: 3.6, brake: 4.6, reverseAccel: 1.8,
    coastDrag: 2.8, driveDrag: 1.4, turn: 1.4, gripAt: 1.6, reverseFrac: 0.35, lean: 0,
    hint: 'W/S haul · A/D steer · E — drop the shafts',
    colliders, interactables,
  });
}

/**
 * A spoked wheel, as eight boxes and a torus.
 *
 * Shared by both vehicles here. The spokes were a thin disc at almost the tyre's
 * radius in the first cut of the bicycle in `kit.js`, which renders as a solid
 * grey wheel — a moped rather than a bicycle — and the note there says a
 * screenshot is the only thing that finds it. Same trade, same reason.
 */
function spoked(mats, R, spokes = 8){
  const w = new THREE.Group();
  w.add(new THREE.Mesh(new THREE.TorusGeometry(R - 0.04, 0.04, 6, 18), mats.iron));
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 10), mats.iron);
  hub.rotation.x = Math.PI / 2;
  w.add(hub);
  for(let i = 0; i < spokes; i++){
    const a = (i / spokes) * Math.PI * 2;
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.03, R - 0.08, 0.03), mats.timber);
    s.position.set(Math.cos(a) * (R - 0.08) / 2, Math.sin(a) * (R - 0.08) / 2, 0);
    s.rotation.z = a - Math.PI / 2;
    w.add(s);
  }
  w.rotation.y = Math.PI / 2;
  w.userData.spinAxis = 'x';
  return w;
}

/** A garden wheelbarrow: one wheel forward, a shallow tray, two handles back. */
function wheelbarrow(scene, x, z, y = 0, { facing = 0, mats } = {}){
  const g = new THREE.Group();
  const R = 0.30;
  const wheel = spoked(mats, R, 8);
  wheel.position.set(0, R, -1.05);
  g.add(wheel);
  // The tray: a floor and four sloping sides.
  box(g, 0.78, 0.05, 1.10, 0, 0.52, -0.05, mats.timber);
  for(const s of [-1, 1]){
    const side = box(g, 0.05, 0.36, 1.10, s * 0.42, 0.68, -0.05, mats.timber);
    side.rotation.z = s * 0.20;
  }
  box(g, 0.86, 0.34, 0.05, 0, 0.68, -0.62, mats.timber);
  box(g, 0.86, 0.34, 0.05, 0, 0.68, 0.52, mats.timber);
  // Handles and the two legs it stands on.
  for(const s of [-1, 1]){
    box(g, 0.06, 0.06, 2.30, s * 0.36, 0.48, -0.10, mats.timber);
    box(g, 0.06, 0.48, 0.06, s * 0.36, 0.24, 0.72, mats.timber);
  }
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  g.traverse(o => { if(o.isMesh) o.castShadow = true; });
  return { group: g, wheels: [wheel], R };
}

/** A water bowser: a barrel lying on a two-wheeled frame, with shafts forward. */
function bowser(scene, x, z, y = 0, { facing = 0, mats } = {}){
  const g = new THREE.Group();
  const R = 0.56;
  const wheels = [];
  for(const sx of [0.78, -0.78]){
    const w = spoked(mats, R, 10);
    w.position.set(sx, R, 0);
    wheels.push(w);
    g.add(w);
  }
  // The frame, and the barrel lying along it.
  box(g, 1.40, 0.10, 1.90, 0, 0.70, 0, mats.timber);
  const barrel = cyl(g, 0.52, 1.70, 0, 1.28, 0, mats.timber);
  barrel.rotation.x = Math.PI / 2;
  for(const bz of [-0.55, 0, 0.55]){
    const hoop = cyl(g, 0.545, 0.06, 0, 1.28, bz, mats.iron);
    hoop.rotation.x = Math.PI / 2;
  }
  // The bung on top and the tap at the back.
  cyl(g, 0.07, 0.12, 0, 1.84, 0, mats.dark);
  cyl(g, 0.05, 0.26, 0, 1.05, 0.92, mats.iron).rotation.x = Math.PI / 2;
  // Shafts forward, and the prop leg they rest on.
  for(const s of [-1, 1]) box(g, 0.07, 0.07, 1.60, s * 0.56, 0.78, -1.70, mats.timber);
  box(g, 1.20, 0.07, 0.07, 0, 0.78, -2.46, mats.timber);
  box(g, 0.06, 0.76, 0.06, 0, 0.40, -2.25, mats.timber);
  g.position.set(x, y, z);
  g.rotation.y = facing;
  scene.add(g);
  g.traverse(o => { if(o.isMesh) o.castShadow = true; });
  return { group: g, wheels, R };
}

/** Unused here — this theme is outdoor. Exported so all three can be. */
export function fitOutRoom(){}
export function fitOutSpine(){}
