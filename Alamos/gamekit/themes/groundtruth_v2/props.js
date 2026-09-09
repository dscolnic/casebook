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
//     a trolley. It is also the one thing here that the campaign changes — see
//     `launcher` and SHOT_DAYS.
//   · **The trench is open at the halfway point** and the two conductors in it
//     run parallel for forty metres, which is the geometry days nine and ten are
//     about. It is visible from the road and nobody has ever noticed it.
//   · **The field mills are instruments you can walk up to**, four of them, each
//     a squat drum on a post with a shutter that turns.
//   · **It is storm season**, and the site says so without a caption: a low
//     broken cloud deck drifting on the wind, puddles standing on the crust,
//     water in the bottom of the trench, and guy wires that will not sit still.
//
// Placement helpers take `(x, z, y)` — ground last.
import * as THREE from 'three';
import {
  MATERIALS, box, cyl,
  vehicle, VEHICLE_DRIVE, quadBike, QUAD_DRIVE, clearSpot,
} from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';
import { animate, spin, blink, sway } from '../../engine/world/animators.js';
import { site } from './site.js';
import { storyOutdoors } from './story.js';

/** Where the mast stands, and how tall it is. Read by everything below. */
const MAST = { x: 0, z: -20, h: 60, w: 1.9 };
/** Where the launch rail stands. The wire trail runs from here toward the mast. */
const RAIL = { x: 0, z: -74 };

/**
 * The days the rocket leaves the rail, from content/missions.js:
 *
 *   day 4  "Why the mast starts hissing" — the marginal cell; the written rule
 *          still says launch, and the segue says the shot goes.
 *   day 12 "The rule fails on a fast cell" — "you commit to a prediction, fire,
 *          and measure it."
 *
 * Day 14's shot is the Marx bank in the hall, not the rail. So the rail is armed
 * — rocket on the rail, full spool — up to and on a shot day, and stands empty
 * afterwards; the scorch and the burnt wire trail from a shot are on the flat
 * from the morning after it. `state.week` is the one-based day.
 */
export const SHOT_DAYS = [4, 12];
export function railArmed(week){
  const w = Number(week) || 1;
  return w <= SHOT_DAYS[0] || SHOT_DAYS.includes(w);
}
export function shotsFired(week){
  const w = Number(week) || 1;
  return SHOT_DAYS.filter(d => w > d).length;
}

/** Galvanised lattice: dark enough on paper to survive a bright sky IBL. */
const GALV = () => MATERIALS.paintedSteel(0x6f767c);
const COPPER = () => MATERIALS.paintedSteel(0x8a5a34);
const CABINET = () => MATERIALS.paintedSteel(0x99a0a4);

/** A seeded random, so the puddles and the cloud lumps are where they were yesterday. */
function rng(seed){
  let s = seed >>> 0 || 1;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

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
  // The obstruction lamp, just under the terminal, blinking. Sixty metres of
  // lattice under a storm sky is an aviation hazard, and a red lamp that
  // actually blinks is the one thing that says the mast is live.
  const lampMat = new THREE.MeshStandardMaterial({
    color: 0xd8321c, emissive: 0xd8321c, emissiveIntensity: 2.6, roughness: 0.4 });
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), lampMat);
  lamp.position.set(0, MAST.h - 0.6, 0.6);
  lamp.userData.ignoreAudit = true;
  g.add(lamp);
  animate(blink(lampMat, 1.6, 0.25, { on: 3.0, off: 0.2 }));

  // The down-conductor, run outside the lattice on the south face so it can be
  // instrumented, with the three shunt boxes on it at 45, 30 and 15 m.
  const cu = COPPER();
  box(g, 0.05, MAST.h, 0.05, 0.55, MAST.h / 2, 0.95, cu);
  for(const h of [45, 30, 15]){
    box(g, 0.34, 0.5, 0.28, 0.55, h, 1.12, CABINET());
  }
  // And the bond at the base, which is the six metres of copper day ten is about.
  box(g, 0.05, 0.05, 6.0, 0.55, 0.35, 4.0, cu);

  // Guys at two levels, four each, out to anchors on the flat. Each one
  // vibrates: a wire under tension in a wind sings, and a guy that hangs
  // perfectly still under a storm deck reads as a drawn line. The rotation is a
  // fraction of a degree about the wire's own middle — a few centimetres at the
  // ends, at a rate you can see but not count — and no two wires share a phase.
  const anchor = [[26, 0], [-26, 0], [0, 26], [0, -26]];
  let k = 0;
  for(const level of [26, 48]){
    for(const [ax, az] of anchor){
      const len = Math.hypot(ax, az, level);
      const guy = cyl(g, 0.018, len, ax / 2, level / 2, az / 2, MATERIALS.steel());
      guy.rotation.z = Math.atan2(ax, level);
      guy.rotation.x = -Math.atan2(az, Math.hypot(ax, level));
      // Sway about the axis the wire does NOT lie along, so the ends move
      // sideways rather than the wire stretching along itself.
      animate(sway(guy, ax !== 0 ? 'x' : 'z', 0.006, 9.5 + k * 0.7, k * 1.9));
      k++;
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
  // The shutter, a disc with two sectors cut out of it, drawn as two plates —
  // on its own pivot, because a field mill's shutter turns, and one that does
  // not is a drum with a cross on it.
  const shutter = new THREE.Group();
  for(const a of [0, Math.PI / 2]){
    const s = box(shutter, 0.42, 0.012, 0.16, 0, 0, 0, MATERIALS.steel());
    s.rotation.y = a;
  }
  shutter.position.y = 1.58;
  g.add(shutter);
  animate(spin(shutter, 'y', 6.0 + (x * 0.013) % 1.5));
  g.position.set(x, y, z);
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; } });
  scene.add(g);
  return g;
}

/**
 * The launch rail: a trolley, a two-metre rail, and a spool of wire — and the
 * rocket on the rail, when there is one.
 *
 * Returns the two things the campaign switches: `armed` (the rocket and the
 * full spool) and `spent` (the bare hub the wire has gone off). Exactly one of
 * them is visible at a time; `decorate` drives it from `state.week`.
 */
function launcher(scene, x, z, y){
  const g = new THREE.Group();
  box(g, 1.6, 0.25, 1.6, 0, 0.28, 0, MATERIALS.paintedSteel(0xc9a23f));
  for(const [dx, dz] of [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]]){
    cyl(g, 0.07, 0.16, dx, 0.08, dz, MATERIALS.rubber());
  }
  const rail = box(g, 0.12, 2.1, 0.12, 0, 1.45, 0, MATERIALS.steel());
  rail.rotation.x = 0.12;
  // The spool's axle, which is there whether the wire is or not.
  box(g, 0.06, 0.6, 0.06, 0.75, 0.3, 0, MATERIALS.steel());

  // ARMED: a hundred metres of fine wire on the spool, and the rocket — a metre
  // of tube with a nose and three fins, sat on the rail at the rail's own angle.
  const armed = new THREE.Group();
  cyl(armed, 0.3, 0.22, 0.75, 0.55, 0, COPPER());
  const rocket = new THREE.Group();
  const white = MATERIALS.paintedSteel(0xe4e2dc);
  cyl(rocket, 0.05, 0.95, 0, 0, 0, white);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.22, 12), MATERIALS.paintedSteel(0xb4451f));
  nose.position.y = 0.585;
  rocket.add(nose);
  for(let i = 0; i < 3; i++){
    const fin = box(rocket, 0.012, 0.16, 0.13, 0, -0.4, 0.1, MATERIALS.paintedSteel(0xb4451f));
    fin.rotation.y = (i / 3) * Math.PI * 2;
    fin.position.set(Math.sin(fin.rotation.y) * 0.1, -0.4, Math.cos(fin.rotation.y) * 0.1);
  }
  rocket.position.set(0, 1.55, -0.12);
  rocket.rotation.x = 0.12;
  armed.add(rocket);
  g.add(armed);

  // SPENT: the bare hub, and nothing on the rail.
  const spent = new THREE.Group();
  cyl(spent, 0.09, 0.22, 0.75, 0.55, 0, MATERIALS.paintedSteel(0x3a3d40));
  spent.visible = false;
  g.add(spent);

  g.position.set(x, y, z);
  g.traverse(o => { if(o.isMesh){ o.castShadow = true; } });
  scene.add(g);
  return { group: g, armed, spent };
}

/**
 * What a shot leaves on the flat: a scorched patch where the strike came down
 * on the rail, and the burnt wire trail — the wire is vaporised by the return
 * stroke and what falls is a line of black beads from the rail toward the mast,
 * bent downwind. Two of them, because the campaign fires twice; the second is
 * offset and a little fresher.
 *
 * Everything here is a centimetre or two above the crust and `ignoreAudit`, the
 * same as the graded tracks it lies across.
 */
function shotAftermath(scene, at, nth){
  const g = new THREE.Group();
  const scorch = new THREE.MeshStandardMaterial({ color: 0x2c2a26, roughness: 1.0, metalness: 0 });
  const ash = new THREE.MeshStandardMaterial({ color: nth === 0 ? 0x35332f : 0x24221f, roughness: 1.0, metalness: 0 });
  const side = nth === 0 ? 1 : -1;
  // The patch: a flattened disc at the rail, and a darker one on the rail's own
  // footprint.
  const disc = new THREE.Mesh(new THREE.CircleGeometry(1, 24), scorch);
  disc.rotation.x = -Math.PI / 2;
  disc.scale.set(3.2, 2.6, 1);
  disc.position.set(RAIL.x + side * 0.6, at(RAIL.x, RAIL.z) + 0.03, RAIL.z + 0.4);
  disc.receiveShadow = true;
  g.add(disc);
  // The trail: from the rail toward the mast, drifting east with the wind and
  // wandering as a fallen wire does. Short beads rather than one line, so it
  // reads as debris rather than as a painted stripe.
  const r = rng(4100 + nth * 977);
  const n = 16;
  let px = RAIL.x + side * 0.8, pz = RAIL.z - 1.2;
  for(let i = 0; i < n; i++){
    const nx = RAIL.x + side * 0.8 + ((i + 1) / n) * (7.5 + nth * 2.5) + (r() - 0.5) * 1.6;
    const nz = RAIL.z + 2 + ((i + 1) / n) * 44 + (r() - 0.5) * 1.2;
    const len = Math.hypot(nx - px, nz - pz);
    const mx = (px + nx) / 2, mz = (pz + nz) / 2;
    const b = box(g, 0.14, 0.03, len * 0.82, mx, at(mx, mz) + 0.045, mz, ash, Math.atan2(nx - px, nz - pz));
    b.castShadow = false;
    // Every few beads a small burn where a length of wire lay hot.
    if(i % 4 === 2){
      const s = new THREE.Mesh(new THREE.CircleGeometry(1, 14), scorch);
      s.rotation.x = -Math.PI / 2;
      s.scale.set(0.7 + r() * 0.5, 0.5 + r() * 0.3, 1);
      s.position.set(mx, at(mx, mz) + 0.025, mz);
      g.add(s);
    }
    px = nx; pz = nz;
  }
  g.traverse(o => { if(o.isMesh){ o.userData.ignoreAudit = true; o.userData.structure = 'aftermath'; } });
  g.visible = false;
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
  // Storm season: water standing in the bottom of it. Ten centimetres of dark,
  // still water between the walls, with the two conductors under it — which is
  // its own remark on the earthing certificate, measured in April on dry ground.
  const water = new THREE.Mesh(new THREE.PlaneGeometry(1.34, 25.8), new THREE.MeshStandardMaterial({
    color: 0x2b323a, roughness: 0.06, metalness: 0.35, envMapIntensity: 0.9,
    transparent: true, opacity: 0.82, depthWrite: false }));
  water.rotation.x = -Math.PI / 2;
  water.position.set(3.0, y - 0.19, 20);
  water.userData.ignoreAudit = true;
  water.receiveShadow = true;
  scene.add(water);
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

// ------------------------------------------------------------------- weather
/**
 * The cloud deck. The weather layer puts rain in the air and a flash in the
 * lights; the sky behind it is still Preetham's clear dome tinted grey, and a
 * grey dome reads as haze, not as a storm. This is the ceiling of a storm — a
 * broken deck of dark lumps between 120 and 180 m, drifting on the site's wind.
 *
 * One InstancedMesh: a tile of lumps 300 m on a side, laid 3 × 3 so it covers
 * the whole flat to the fog, and slid along the wind by a distance taken modulo
 * the tile — so the drift never has to wrap anything visibly. `fog: false`
 * because a deck fogged to the horizon colour is a deck you cannot see.
 *
 * COVERAGE IS THE WHOLE DESIGN, and it is a number, not a feeling. A deck that
 * closes over is a grey ceiling and a grey ceiling is what the sky already was;
 * the storm reads as a storm because there are gaps in it and the gaps move.
 * The first draft of this said "kept under two-thirds" in this comment and was
 * measured afterwards at **92%** — 34 lumps of 34–64 m semi-axis on a 300 m
 * tile, three times the tile's own area, a lid with a comment on it claiming it
 * was not. What is here is 44 smaller lumps, which rasterises to 0.63: more of
 * them, so the edges are broken in more places, and each one small enough that
 * the gaps survive the overlap.
 *
 * Nothing under it is shadowed: the sun rig's shadow camera is 110 m across and
 * a caster 150 m up would put the whole site in the dark. The deck is the sky's
 * texture, not its light. The lowest lump bottoms out at 113 m and the highest
 * tops out at 183; the mast reaches 62, so the deck never caps the one thing on
 * this skyline, and a level camera never has a cloud behind the air terminal.
 */
function cloudDeck(scene, ctx){
  const P = 300, TILES = 3, PER_TILE = 12;
  const wind = site.weather?.wind ?? { x: 2, z: 1 };
  const geo = new THREE.SphereGeometry(1, 14, 9);
  // UNLIT, and that is the whole fix. A lit cloud under this site's storm rig —
  // ambient 0.08, hemi 0.22, and a sun scaled down by the day blend — renders
  // its dark albedo as BLACK, with a specular highlight on every lump: the
  // first render of this deck was a field of hard obsidian lozenges hanging
  // over the flat, and it looked like debris rather than weather. A basic
  // material takes exactly the colour it is given, so the deck is painted
  // rather than lit, which is what every other unlit thing in the sky here
  // already does (the horizon ranks, the star field).
  const mat = new THREE.MeshBasicMaterial({
    color: 0x5a6068, transparent: true, opacity: 0.62,
    depthWrite: false, fog: false,
  });
  const n = PER_TILE * TILES * TILES;
  const deck = new THREE.InstancedMesh(geo, mat, n);
  deck.castShadow = false; deck.receiveShadow = false;
  deck.frustumCulled = false;
  deck.userData.ignoreAudit = true;
  deck.userData.structure = 'sky';
  deck.renderOrder = 2;
  const r = rng(77_031);
  // FEWER AND FAR BIGGER, at the same coverage. `sx` is a RADIUS on a unit
  // sphere, so 44 lumps of mean radius 27 covered pi·27·22 · 44 = 0.95 of the
  // tile before overlap and 0.63 after — the number was right and the picture
  // was wrong, because at that size every lump is individually legible and the
  // deck reads as a shoal of objects. Twelve lumps of mean radius 55 by 43 come
  // to the same raw 0.95, and they read as one broken mass with holes in it,
  // which is what a storm deck is. Flatter too: 8–13 m of thickness rather than
  // 7–13 on a 19 m radius, so nothing is a sphere.
  const lumps = Array.from({ length: PER_TILE }, () => ({
    x: r() * P, z: r() * P,
    y: 118 + r() * 34,
    sx: 40 + r() * 30, sy: 8 + r() * 5, sz: 32 + r() * 23,
    rot: r() * Math.PI,
    shade: 0.86 + r() * 0.26,
  }));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  const c = new THREE.Color();
  let i = 0;
  for(let tx = 0; tx < TILES; tx++) for(let tz = 0; tz < TILES; tz++) for(const L of lumps){
    p.set(L.x + (tx - 1) * P, L.y, L.z + (tz - 1) * P);
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), L.rot);
    s.set(L.sx, L.sy, L.sz);
    m.compose(p, q, s);
    deck.setMatrixAt(i, m);
    deck.setColorAt(i, c.setScalar(L.shade));
    i++;
  }
  deck.instanceMatrix.needsUpdate = true;
  if(deck.instanceColor) deck.instanceColor.needsUpdate = true;
  // Centred over the site rather than the origin: the flat runs to z = 180.
  const home = { x: -P / 2, z: 40 - P / 2 };
  deck.position.set(home.x, 0, home.z);
  scene.add(deck);
  // Drift: cloud speed is the site wind, and the offset is taken modulo the
  // tile so it is periodic without a jump.
  const speed = 1.35;
  (ctx.animate ?? animate)((t) => {
    deck.position.x = home.x + ((t * wind.x * speed) % P);
    deck.position.z = home.z + ((t * wind.z * speed) % P);
  });
  return deck;
}

/**
 * Puddles. A salt pan in storm season is standing water in every hollow, and
 * the reflection is what tells you the crust is wet — the discs are the sky's
 * colour, near-mirror, and lie a centimetre above the ground with nothing under
 * them. One InstancedMesh, so ninety of them are one draw call.
 *
 * Off the tracks and the pads, off the trench and the rail and the grid, and
 * off the spawn — a puddle nobody can walk through is a puddle in the wrong
 * place, so they are scattered rather than placed, and rejected where the site
 * already has something.
 */
function puddles(scene, ctx, at){
  const paths = site.paths ?? [];
  const onTrack = (x, z, pad) => paths.some(p =>
    Math.abs(x - p.cx) < p.w / 2 + pad && Math.abs(z - p.cz) < p.d / 2 + pad);
  const keepOut = [
    { x: 3, z: 20, r: 16 },        // the trench
    { x: RAIL.x, z: RAIL.z, r: 7 }, // the rail and its scorch
    { x: -30, z: -6, r: 11 },       // the earthing grid
    { x: MAST.x, z: MAST.z, r: 5 }, // the mast base
    { x: 0, z: 52, r: 8 },          // the spawn
    { x: -52, z: 6, r: 3 },         // the met mast
  ];
  const clear = (x, z) => !onTrack(x, z, 1.2) && !ctx.blocked?.(x, z, 2.2)
    && !keepOut.some(k => Math.hypot(x - k.x, z - k.z) < k.r);

  const r = rng(90_210);
  const spots = [];
  let tries = 0;
  while(spots.length < 72 && tries++ < 3000){
    const x = -95 + r() * 190, z = -100 + r() * 175;
    if(!clear(x, z)) continue;
    if(spots.some(s => Math.hypot(s.x - x, s.z - z) < 5)) continue;
    spots.push({ x, z });
  }
  // A thinner scatter along the walk north, so the outstation run is wet too.
  tries = 0;
  while(spots.length < 92 && tries++ < 1500){
    const x = 3 + (r() - 0.5) * 36, z = 60 + r() * 125;
    if(!clear(x, z)) continue;
    if(spots.some(s => Math.hypot(s.x - x, s.z - z) < 6)) continue;
    spots.push({ x, z });
  }

  const geo = new THREE.CircleGeometry(1, 22);
  // Darker than the sky it reflects, and slightly transparent. At 0x6a727c and
  // fully opaque these rendered as flat pale-blue paint on white crust — the
  // colour was the sky's, which is right, and the VALUE was the sky's too,
  // which is why a nine-metre one in the foreground read as a tarpaulin. Water
  // over a bright floor is darker than the floor, and its edge is where the
  // crust shows through.
  const mat = new THREE.MeshStandardMaterial({
    color: 0x4d545e, roughness: 0.04, metalness: 0.45, envMapIntensity: 0.85,
    transparent: true, opacity: 0.82, depthWrite: false,
  });
  const inst = new THREE.InstancedMesh(geo, mat, spots.length);
  inst.castShadow = false; inst.receiveShadow = true;
  inst.frustumCulled = false;
  inst.userData.ignoreAudit = true;
  inst.userData.structure = 'puddles';
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  const flat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
  spots.forEach((sp, i) => {
    // Up to 6 m across rather than 9: the biggest of the old ones filled the
    // bottom third of a frame taken from the road.
    const long = 1.1 + r() * 1.9, short = long * (0.45 + r() * 0.4);
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), r() * Math.PI).multiply(flat);
    s.set(long, short, 1);
    p.set(sp.x, at(sp.x, sp.z) + 0.012, sp.z);
    m.compose(p, q, s);
    inst.setMatrixAt(i, m);
  });
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);
  return inst;
}

/**
 * Decorate the flat.
 *
 * Everything generic is in site.js. This is the mast, the launcher, the mills,
 * the trench and the grid — what the place has — and the weather it stands in.
 */
export function decorate(scene, ctx){
  const { groundHeight } = ctx;
  const at = (x, z) => groundHeight(x, z);

  if(!globalThis.__NO_MAST) mast(scene, at(MAST.x, MAST.z), ctx);

  // The rail, and what the campaign does to it. Before a shot the rocket is on
  // the rail; the morning after, the spool is bare and the flat carries the
  // burn. `stateHooks` runs on every state refresh, so this is right after a
  // load, a day turning over, and the shots harness's `--sol`.
  const rail = launcher(scene, RAIL.x, RAIL.z, at(RAIL.x, RAIL.z));
  const after = SHOT_DAYS.map((_, i) => shotAftermath(scene, at, i));
  const showShot = (week) => {
    const armed = railArmed(week);
    rail.armed.visible = armed;
    rail.spent.visible = !armed;
    const fired = shotsFired(week);
    after.forEach((g, i) => { g.visible = i < fired; });
  };
  showShot(1);
  ctx.stateHooks?.push((state) => showShot(state?.week));

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

  // ----------------------------------------------------------------- weather
  // Placed last, after the vehicles, so `blocked` knows where they are parked.
  cloudDeck(scene, ctx);
  puddles(scene, ctx, at);

  // The season made visible: the mission header off the spawn, the three
  // landmark spaces, the storm building over the flat, the mast-tip corona, the
  // stage lamps, and the witnessed final shot. See story.js.
  storyOutdoors(scene, ctx);
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
