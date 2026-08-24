// props.js — the objects that make Station 12 a lightning research station.
//
// Generic fittings (benches, bins, posts, signs, crates) come from
// engine/world/kit.js and are configured in site.js. What is here is the half
// dozen things this place has and nowhere else does, and one of them is most of
// the game:
//
//   · **The mast is the silhouette.** Sixty metres of lattice with three shunt
//     boxes on the down-conductor, guyed at two levels, alone on a flat with
//     nothing else above four metres. Every screenshot of this game has it in.
//   · **The launch rail is small and matters.** Rocket-triggered lightning is a
//     two-metre rail and a spool of wire, and the modesty of it against the mast
//     is the point: the whole apparatus for making lightning on purpose fits on
//     a trolley.
//   · **The trench is open at the halfway point** and the two conductors in it
//     run parallel for forty metres, which is the geometry days nine and ten are
//     about. It is visible from the road and nobody has ever noticed it.
//   · **The field mills are instruments you can walk up to**, four of them, each
//     a squat drum on a post with a shutter that turns.
//
// Placement helpers take `(x, z, y)` — ground last.
import * as THREE from 'three';
import {
  MATERIALS, box, cyl,
  vehicle, VEHICLE_DRIVE, quadBike, QUAD_DRIVE, clearSpot,
} from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';
import { site } from './site.js';

/** Where the mast stands, and how tall it is. Read by everything below. */
const MAST = { x: 0, z: -20, h: 60, w: 1.9 };

/** Galvanised lattice: dark enough on paper to survive a bright sky IBL. */
const GALV = () => MATERIALS.paintedSteel(0x6f767c);
const COPPER = () => MATERIALS.paintedSteel(0x8a5a34);
const CABINET = () => MATERIALS.paintedSteel(0x99a0a4);

/**
 * One bay of a square lattice tower: four legs, a horizontal frame at the top of
 * the bay, and a pair of diagonals on each face.
 *
 * Built as bays rather than as one tapering solid because a lattice read from
 * two hundred metres is a texture of gaps, and a solid box at this size reads as
 * a chimney.
 */
function bay(parent, y0, y1, w0, w1, m){
  const half0 = w0 / 2, half1 = w1 / 2;
  const legs = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  for(const [sx, sz] of legs){
    // A leg leans in as the tower tapers, so it is drawn as a thin box rotated
    // by the taper angle rather than as a vertical post.
    const dx = (sx * half1 - sx * half0), dz = (sz * half1 - sz * half0);
    const len = Math.hypot(y1 - y0, dx, dz);
    const leg = box(parent, 0.09, len, 0.09,
      sx * (half0 + half1) / 2, (y0 + y1) / 2, sz * (half0 + half1) / 2, m);
    leg.rotation.z = -Math.atan2(dx, y1 - y0);
    leg.rotation.x = Math.atan2(dz, y1 - y0);
  }
  // The frame at the top of the bay.
  for(const sz of [-1, 1]){
    box(parent, w1, 0.06, 0.06, 0, y1, sz * half1, m);
    box(parent, 0.06, 0.06, w1, sz * half1, y1, 0, m);
  }
  // Diagonals, one per face, alternating so the tower reads as braced rather
  // than as a stack of squares.
  const dy = y1 - y0;
  const diag = Math.hypot(dy, w1);
  for(const [ax, az, rot] of [[0, -half1, 0], [0, half1, 0], [-half1, 0, Math.PI / 2], [half1, 0, Math.PI / 2]]){
    const d = box(parent, 0.05, diag, 0.05, ax, (y0 + y1) / 2, az, m);
    d.rotation.y = rot;
    d.rotation.z = Math.atan2(w1, dy) * (ax + az > 0 ? 1 : -1);
  }
}

/** The mast: bays, guys, down-conductor, shunt boxes and an air terminal. */
function mast(scene, y0, ctx){
  const g = new THREE.Group();
  const m = GALV();
  const bays = 10;
  for(let i = 0; i < bays; i++){
    const y1 = (MAST.h * (i + 1)) / bays, yy0 = (MAST.h * i) / bays;
    // Tapers from 1.9 m at the base to 0.8 m at the top.
    const w0 = MAST.w - (MAST.w - 0.8) * (i / bays);
    const w1 = MAST.w - (MAST.w - 0.8) * ((i + 1) / bays);
    bay(g, yy0, y1, w0, w1, m);
  }
  // The air terminal: a 2 m rod with the 20 mm tip the day-four derivation is
  // about.
  cyl(g, 0.05, 2.0, 0, MAST.h + 1.0, 0, m);
  cyl(g, 0.02, 0.3, 0, MAST.h + 2.1, 0, MATERIALS.steel());

  // The down-conductor, run outside the lattice on the south face so it can be
  // instrumented, with the three shunt boxes on it at 45, 30 and 15 m.
  const cu = COPPER();
  box(g, 0.05, MAST.h, 0.05, 0.55, MAST.h / 2, 0.95, cu);
  for(const h of [45, 30, 15]){
    box(g, 0.34, 0.5, 0.28, 0.55, h, 1.12, CABINET());
  }
  // And the bond at the base, which is the six metres of copper day ten is about.
  box(g, 0.05, 0.05, 6.0, 0.55, 0.35, 4.0, cu);

  // Guys at two levels, four each, out to anchors on the flat.
  const anchor = [[26, 0], [-26, 0], [0, 26], [0, -26]];
  for(const level of [26, 48]){
    for(const [ax, az] of anchor){
      const len = Math.hypot(ax, az, level);
      const guy = cyl(g, 0.018, len, ax / 2, level / 2, az / 2, MATERIALS.steel());
      guy.rotation.z = Math.atan2(ax, level);
      guy.rotation.x = -Math.atan2(az, Math.hypot(ax, level));
    }
  }
  g.position.set(MAST.x, y0, MAST.z);
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; o.receiveShadow = true; } });
  scene.add(g);
  if(ctx.colliders){
    // Only the bottom bay is a collider: the player has to be able to walk up to
    // the base, and a box the height of the tower would block the whole flat.
    ctx.colliders.push(new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(MAST.x, 1.5, MAST.z), new THREE.Vector3(2.4, 3.0, 2.4)));
  }
  return g;
}

/** A field mill: a drum on a post with a shutter across the top of it. */
function mill(scene, x, z, y){
  const g = new THREE.Group();
  cyl(g, 0.05, 1.3, 0, 0.65, 0, MATERIALS.steel());
  cyl(g, 0.22, 0.26, 0, 1.43, 0, CABINET());
  // The shutter, a disc with two sectors cut out of it, drawn as two plates.
  for(const a of [0, Math.PI / 2]){
    const s = box(g, 0.42, 0.012, 0.16, 0, 1.58, 0, MATERIALS.steel());
    s.rotation.y = a;
  }
  g.position.set(x, y, z);
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; } });
  scene.add(g);
  return g;
}

/** The launch rail: a trolley, a two-metre rail, and a spool of wire. */
function launcher(scene, x, z, y){
  const g = new THREE.Group();
  box(g, 1.6, 0.25, 1.6, 0, 0.28, 0, MATERIALS.paintedSteel(0xc9a23f));
  for(const [dx, dz] of [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]]){
    cyl(g, 0.07, 0.16, dx, 0.08, dz, MATERIALS.rubber());
  }
  const rail = box(g, 0.12, 2.1, 0.12, 0, 1.45, 0, MATERIALS.steel());
  rail.rotation.x = 0.12;
  // The spool: a hundred metres of fine wire that goes up with the rocket and
  // is gone afterwards.
  cyl(g, 0.3, 0.22, 0.75, 0.55, 0, COPPER());
  box(g, 0.06, 0.6, 0.06, 0.75, 0.3, 0, MATERIALS.steel());
  g.position.set(x, y, z);
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; } });
  scene.add(g);
  return g;
}

/**
 * The cable trench, open at the halfway point.
 *
 * Two conductors running parallel a metre and a half and three and a half
 * metres from the down-conductor, for the first forty metres of the run north.
 * This is the geometry of the day-nine derivation, and it is visible from the
 * road for anybody who looks down.
 */
function trench(scene, ctx){
  const sand = MATERIALS.paintedSteel(0x6b6559);
  const cu = COPPER();
  const y = ctx.groundHeight(3, 20);
  // The open section reads as a slot rather than as a kerb: a dark recess flush
  // with the crust, with the two conductors lying in the bottom of it. The first
  // version stood a half-metre block proud of the ground and from the road it
  // looked like a line of paving slabs.
  box(scene, 1.4, 0.06, 26, 3.0, y - 0.30, 20, sand);
  box(scene, 0.16, 0.62, 26, 2.25, y - 0.31, 20, sand);
  box(scene, 0.16, 0.62, 26, 3.75, y - 0.31, 20, sand);
  box(scene, 0.05, 0.05, 26, 2.55, y - 0.26, 20, cu);
  box(scene, 0.07, 0.07, 26, 3.45, y - 0.26, 20, MATERIALS.paintedSteel(0x2f3338));
  // Spoil along the near side: low, pale and irregular, so it reads as earth.
  const spoil = MATERIALS.paintedSteel(0xa8a08d);
  for(let i = 0; i < 12; i++){
    const z = 8 + i * 2.2;
    const w = 0.7 + (i % 3) * 0.16;
    box(scene, w, 0.11, 1.5, 4.5 + (i % 2) * 0.2, ctx.groundHeight(4.5, z) + 0.055, z, spoil);
  }
  // Two plates where it goes back under, at each end.
  for(const z of [7, 33]){
    box(scene, 2.4, 0.08, 1.2, 3.0, ctx.groundHeight(3, z) + 0.04, z, MATERIALS.steel());
  }
}

/** The earthing grid, exposed where the compound has it uncovered. */
function grid(scene, ctx){
  const cu = COPPER();
  const y0 = ctx.groundHeight(-30, -6);
  for(let i = -2; i <= 2; i++){
    box(scene, 0.04, 0.04, 16, -30 + i * 3, y0 + 0.02, -6, cu);
    box(scene, 16, 0.04, 0.04, -30, y0 + 0.02, -6 + i * 3, cu);
  }
  // Two rods driven at the corners, with their heads proud.
  for(const [x, z] of [[-36, -12], [-24, 0]]){
    cyl(scene, 0.03, 1.0, x, ctx.groundHeight(x, z) + 0.2, z, MATERIALS.steel());
  }
}

/**
 * Decorate the flat.
 *
 * Everything generic is in site.js. This is the mast, the launcher, the mills,
 * the trench and the grid, and nothing else — which is what the place has.
 */
export function decorate(scene, ctx){
  const { groundHeight } = ctx;
  const at = (x, z) => groundHeight(x, z);

  if(!globalThis.__NO_MAST) mast(scene, at(MAST.x, MAST.z), ctx);
  launcher(scene, 0, -74, at(0, -74));

  // Four mills across the flat, and the reference one is indoors and not here.
  for(const [x, z] of [[-20, 14], [22, -34], [-46, -22], [26, 44]]){
    mill(scene, x, z, at(x, z));
  }

  trench(scene, ctx);
  grid(scene, ctx);

  // The instrument cabinet two metres from the down-conductor, which day eight
  // is about and which has stood there for nine years.
  const cx = MAST.x + 2.0, cz = MAST.z + 0.9;
  box(scene, 0.8, 1.9, 0.6, cx, at(cx, cz) + 0.95, cz, CABINET());

  // --------------------------------------------------------------- transport
  // Sablon Flats is a salt pan with an outstation 180 m out and a rocket store
  // at the other end of the site, and the season is storms — a station keeps
  // something that will run for the mast in ten minutes and something that will
  // cross wet salt when the pan is standing in water. Hence two.
  transport(scene, ctx, at);

  // The met mast: small, guyed, and the only other vertical thing on the site.
  const mx = -52, mz = 6, my = at(mx, mz);
  cyl(scene, 0.06, 10, mx, my + 5, mz, MATERIALS.steel());
  box(scene, 1.1, 0.1, 0.1, mx + 0.5, my + 9.6, mz, MATERIALS.steel());
  cyl(scene, 0.16, 0.2, mx + 1.0, my + 9.75, mz, CABINET());

  void site;
}

/** Not used: this theme is outdoor, and its rooms come from interiorBuilding. */

// ------------------------------------------------------------------ transport
/** The spawn, so nothing is parked on top of it. Mirrors `site.start`. */
const SPAWN = { x: 0, z: 52 };
const VAN_AT = { x: -14, z: 42 }, VAN_FACING = 0, VAN_COLOUR = 0xc9b07a;
const VAN_ID = 'field-truck', VAN_LABEL = 'field truck';
const QUAD_AT = { x: 4, z: 36 }, QUAD_FACING = Math.PI, QUAD_COLOUR = 0xb4451f;
const QUAD_ID = 'flats-quad', QUAD_LABEL = 'flats quad';
/**
 * The two vehicles this site keeps, and the player can take either.
 *
 * `clearSpot` rather than a hand-checked coordinate: a vehicle parked inside a
 * collider is one you get into and cannot move (house rule 16 from the other
 * side), and the spawn is in the avoid list because a prop over the spawn welds
 * the player in place (house rule 8).
 */
function transport(scene, ctx, at){
  const { colliders, interactables, blocked } = ctx;
  const spawn = { x: SPAWN.x, z: SPAWN.z, r: 14 };

  const vs = clearSpot(VAN_AT, blocked, { pad: 3.4, avoid: [spawn] });
  const van = vehicle(scene, vs.x, vs.z, at(vs.x, vs.z), { facing: VAN_FACING, colour: VAN_COLOUR });
  driveable(scene, van.group, {
    ...VEHICLE_DRIVE,
    id: VAN_ID, label: VAN_LABEL, kind: 'van',
    seat: { x: 0.52, y: 2.18, z: van.cabZ },
    wheels: van.wheels,
    colliders, interactables,
  });

  const qs = clearSpot(QUAD_AT, blocked, { pad: 1.8, avoid: [spawn, { x: vs.x, z: vs.z, r: 5 }] });
  const q = quadBike(scene, qs.x, qs.z, at(qs.x, qs.z), { facing: QUAD_FACING, colour: QUAD_COLOUR });
  driveable(scene, q.group, {
    ...QUAD_DRIVE,
    id: QUAD_ID, label: QUAD_LABEL, kind: 'quad',
    wheels: q.wheels, steer: q.steer,
    colliders, interactables,
  });
}

export function fitOutRoom(){}
export function fitOutSpine(){}
