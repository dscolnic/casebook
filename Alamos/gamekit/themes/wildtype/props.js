// props.js — the objects that make Pellow Head a working field station.
//
// Generic fittings come from engine/world/kit.js and are placed from site.js.
// What is here is the handful of things this place has and nowhere else does:
//
//   · **The living island is the subject.** Nursery beds under hoop tunnels, a
//     marsh with a boardwalk and a hide, grazing, a seed orchard, a strand line
//     and the ship at its jetty — see the dressing pass at the foot of this
//     file, which is most of what a player walks through.
//   · **The shore sampling point is where the island is measured**, above the
//     tide line, with a quadrat frame against it and a marked stake at the
//     water. The route out to it is marked the whole way.
//   · **The marsh bay is separated by distance**, which is why it is a small
//     building with a rope barrier at eighteen metres. The open ground round it
//     is what keeps the survey undisturbed.
//   · **The dune crest is the edge of the world.** A fence along it and a set of
//     steps down that go nowhere the player may follow.
//   · **The station's own aerials and racks** are on the roof, because a
//     one-storey building with nothing on it reads as a garage.
//
// Placement helpers take `(x, z, y)` — ground last.
import * as THREE from 'three';
import {
  MATERIALS, box, cyl, sign, fenceRun,
  vehicle, VEHICLE_DRIVE, quadBike, QUAD_DRIVE, clearSpot,
} from '../../engine/world/kit.js';
import { mat } from '../../engine/world/materials.js';
import { spin, sway, bob, wander } from '../../engine/world/animators.js';
import { driveable } from '../../engine/world/driving.js';

const CONCRETE = () => MATERIALS.concrete();
const PAINT = (c) => MATERIALS.paintedSteel(c);

/** The manhole: a lid, a frame and the duct stubs either side of it. */
/**
 * The shore sampling point, which was a cable manhole.
 *
 * Same chamber, same lid, same bollards: what a field station has above its
 * tide line is a hatch over a sampling well with a stand beside it, and what
 * the previous campaign had was where a submarine cable stopped being one. The
 * geometry survives the change; the quadrat frame leaning on it is what says
 * which campaign this is.
 */
function manhole(scene, x, z, y){
  box(scene, 4.4, 0.35, 4.4, x, y + 0.18, z, CONCRETE());
  box(scene, 2.4, 0.12, 1.6, x, y + 0.40, z, PAINT(0x6f6a5c));
  for(const s of [-1, 1]) cyl(scene, 0.18, 1.6, x + s * 1.6, y + 0.2, z, PAINT(0x55504a));
  // The bollards that stop a vehicle parking on it.
  for(const [dx, dz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]){
    cyl(scene, 0.11, 1.0, x + dx, y + 0.5, z + dz, PAINT(0xc9a23f));
  }
  // A quadrat frame propped against the chamber, and a marked stake at the
  // tide line — the two objects a shore survey leaves where it works.
  const q = box(scene, 1.0, 1.0, 0.06, x + 2.4, y + 0.6, z - 0.4, PAINT(0xb8b2a4));
  q.rotation.x = 0.5;
  q.rotation.y = 0.3;
  cyl(scene, 0.05, 1.4, x - 2.6, y + 0.7, z + 1.2, PAINT(0xc9a23f));
  for(let i = 0; i < 4; i++){
    box(scene, 0.13, 0.05, 0.13, x - 2.6, y + 0.35 + i * 0.3, z + 1.2, PAINT(0x2f2f2c));
  }
}

/**
 * A HOSE REEL, WHICH WAS A DRUM OF SUBMARINE CABLE.
 *
 * The store yard's one big round thing. A nursery runs on water and this is
 * what it is carried in; the previous campaign's drum of armoured cable is the
 * same two flanges and a barrel, in green, with a lay-flat tail led off it.
 */
function cableDrum(scene, x, z, y){
  const flange = () => cyl(scene, 1.6, 0.14, x, y + 1.6, z, PAINT(0x7f7a6c));
  for(const dz of [-0.7, 0.7]){
    const f = cyl(scene, 1.6, 0.14, x, y + 1.6, z + dz, PAINT(0x7f7a6c));
    f.rotation.x = Math.PI / 2;
  }
  void flange;
  const barrel = cyl(scene, 1.05, 1.3, x, y + 1.6, z, PAINT(0x2f5f3a));
  barrel.rotation.x = Math.PI / 2;
  cyl(scene, 0.07, 3.4, x, y + 1.6, z, MATERIALS.steel()).rotation.x = Math.PI / 2;
  // The tail, led off the reel and pegged down.
  box(scene, 0.09, 0.09, 2.6, x + 1.1, y + 0.12, z + 2.0, PAINT(0x2f5f3a));
}

/** The bay: a rope barrier at the working distance, and a beacon on a pole. */
function bay(scene, ctx){
  const { groundHeight } = ctx;
  const x = -70, z = -196, y = groundHeight(x, z);
  // The barrier, a ring of posts and rope at 18 m — the day-nine arithmetic,
  // standing in the world at the distance it computes.
  const R = 18;
  for(let i = 0; i < 16; i++){
    const a = (i / 16) * Math.PI * 2;
    const px = x + Math.cos(a) * R, pz = z + Math.sin(a) * R;
    const py = groundHeight(px, pz);
    cyl(scene, 0.06, 1.1, px, py + 0.55, pz, PAINT(0xc9a23f));
  }
  // The beacon, and the pot's trolley outside the door.
  cyl(scene, 0.10, 4.2, x + 5, y + 2.1, z + 4, PAINT(0xb9b3a4));
  box(scene, 0.5, 0.5, 0.4, x + 5, y + 4.4, z + 4, PAINT(0xc23f3f));
  box(scene, 0.9, 0.7, 0.7, x + 3.2, y + 0.35, z + 2.6, PAINT(0xe8c33a));
}

/** Cable racks and two aerials on the station roofs, so they are not garages. */
function roofs(scene, ctx){
  const { groundHeight } = ctx;
  for(const [x, z, h] of [[16, 8, 5.4], [24, -18, 4.0], [-28, 8, 4.2]]){
    const y = groundHeight(x, z) + h;
    for(let i = 0; i < 4; i++){
      box(scene, 5.6, 0.1, 0.5, x, y + 0.3 + i * 0.35, z - 2 + i * 1.2, PAINT(0x8f9a92));
    }
  }
  const ax = 20, az = 2, ay = groundHeight(ax, az) + 5.4;
  cyl(scene, 0.07, 6.0, ax, ay + 3.0, az, MATERIALS.steel());
  for(const dy of [1.6, 2.6, 3.6]) box(scene, 1.4, 0.05, 0.05, ax, ay + dy, az, MATERIALS.steel());
}

/** The dune-crest fence: the seaward edge of the walkable world. */
function crestFence(scene, ctx){
  const { groundHeight, colliders } = ctx;
  for(let x = -120; x <= 120; x += 6){
    const z = -206, y = groundHeight(x, z);
    cyl(scene, 0.07, 1.3, x, y + 0.65, z, PAINT(0x8a8272));
    box(scene, 6.0, 0.05, 0.05, x + 3, y + 1.15, z, PAINT(0x8a8272));
  }
  const y0 = groundHeight(0, -206);
  colliders.push(new THREE.Box3(
    new THREE.Vector3(-130, y0, -207.4), new THREE.Vector3(130, y0 + 1.4, -204.6)));
}

export function decorate(scene, ctx){
  const { groundHeight } = ctx;
  const at = (x, z) => groundHeight(x, z);

  manhole(scene, 4, -120, at(4, -120));
  cableDrum(scene, -44, 42, at(-44, 42));
  bay(scene, ctx);
  roofs(scene, ctx);
  crestFence(scene, ctx);

  // --------------------------------------------------------------- transport
  // The radiography bay is 196 m out in the dunes and the beach manhole is 120 m
  // down the sand, and the book says the track "shifts with the sand". So: the
  // works van for the station apron and the yard, and the quad for the dune
  // track and the beach, which is the only one of the two that gets there.
  transport(scene, ctx, at);

  // ---- the dressing pass. See gamekit/DRESSING_PASS.md; the numbers are its
  // list. This is the campaign where dressing is not decoration: a biology
  // campaign whose island has nothing living on it argues against itself.
  const trays = nursery(scene, ctx);   // 1
  marsh(scene, ctx);                   // 2, 3
  grazing(scene, ctx);                 // 4
  orchard(scene, ctx);                 // 5
  shore(scene, ctx);                   // 6
  insects(scene, ctx);                 // 7
  hedging(scene, ctx);                 // 8
  stationYard(scene, ctx);             // 9–13
  shipAndCart(scene, ctx);             // 14, 16
  growingState(scene, ctx, trays);     // 15, 17, 18

  // The duct trench, left open for twelve metres where the splice trailer is
  // parked against it — which is why the trailer is where it is.
  for(let i = 0; i < 6; i++){
    const z = -24 - i * 2.2, y = at(-16, z);
    box(scene, 1.2, 0.5, 2.0, -16, y - 0.1, z, CONCRETE());
  }
}


// ------------------------------------------------------------------ transport
/** The spawn, so nothing is parked on top of it. Mirrors `site.start`. */
const SPAWN = { x: 0, z: 70 };
const VAN_AT = { x: 14, z: 56 }, VAN_FACING = Math.PI, VAN_COLOUR = 0xd8d3c4;
const VAN_ID = 'works-van', VAN_LABEL = 'works van';
const QUAD_AT = { x: -12, z: 54 }, QUAD_FACING = Math.PI, QUAD_COLOUR = 0x2f6f7a;
const QUAD_ID = 'dune-quad', QUAD_LABEL = 'dune quad';
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

// ============================================================ the dressing
//
// A BIOLOGY CAMPAIGN WHOSE ISLAND HAS NOTHING LIVING ON IT argues against
// itself. What was here was Dark Fibre's ground with the rooms renamed: four
// low sheds on sand, a road and a dune track. Everything below is the island
// the bible is about — a nursery, a marsh, grazing, an orchard, a shore — plus
// the ship the campaign counts fifteen days down to and never showed.
//
// See gamekit/DRESSING_PASS.md; the numbers are its list. Placers take
// `(x, z, y)`; `colliders` is `THREE.Box3` and `softColliders` is `{x, z, r}`.

function rngW(seed){
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
const betweenW = (r, a, b) => a + r() * (b - a);
function solidW(colliders, x, z, y, r, h = 2.4){
  const b = new THREE.Box3(new THREE.Vector3(x - r, y, z - r),
                           new THREE.Vector3(x + r, y + h, z + r));
  colliders?.push(b);
  return b;
}

const LEAF = () => mat('pellow.leaf', () => new THREE.MeshStandardMaterial({
  color: 0x3f6b34, roughness: 0.92, metalness: 0, envMapIntensity: 0.45 }));
const POLY = () => mat('pellow.poly', () => new THREE.MeshStandardMaterial({
  color: 0xcfd8d2, roughness: 0.35, metalness: 0.05, transparent: true, opacity: 0.55,
  envMapIntensity: 0.8 }));
const TIMBERW = () => mat('pellow.timber', () => new THREE.MeshStandardMaterial({
  color: 0x6b5a42, roughness: 0.94, metalness: 0, envMapIntensity: 0.4 }));
const REED = () => mat('pellow.reed', () => new THREE.MeshStandardMaterial({
  color: 0x7a7a44, roughness: 0.95, metalness: 0, envMapIntensity: 0.4 }));
const MARSHWATER = () => mat('pellow.marsh', () => new THREE.MeshStandardMaterial({
  color: 0x3a4a44, roughness: 0.22, metalness: 0.2, envMapIntensity: 0.9 }));
const KELP = () => mat('pellow.kelp', () => new THREE.MeshStandardMaterial({
  color: 0x4a3f26, roughness: 0.85, metalness: 0 }));

/**
 * 1. The nursery beds outside the Growth Hall — the campaign opens on pale
 *    seedlings and there were none. The trays are the state hook below.
 */
function nursery(scene, ctx){
  const { groundHeight, softColliders, animate } = ctx;
  const ox = 30, oz = 8;
  const trays = [];
  for(let b = 0; b < 8; b++){
    const x = ox + (b % 2) * 5.2, z = oz - 10 + Math.floor(b / 2) * 5.4;
    const y = groundHeight(x, z);
    // The bed: a timber frame with soil in it.
    box(scene, 4.2, 0.34, 1.7, x, y + 0.17, z, TIMBERW());
    box(scene, 3.9, 0.1, 1.45, x, y + 0.36, z, mat('pellow.soil',
      () => new THREE.MeshStandardMaterial({ color: 0x3a2f24, roughness: 1, metalness: 0 })));
    // Seedlings, in rows. Their colour is what mission 1 is about.
    for(let i = 0; i < 14; i++){
      for(let k = 0; k < 3; k++){
        const s = box(scene, 0.09, 0.26, 0.09, x - 1.8 + i * 0.28, y + 0.53, z - 0.45 + k * 0.45,
          LEAF());
        trays.push(s);
      }
    }
    softColliders?.push({ x, z, r: 2.2 });
    // Half of them under a hoop tunnel.
    if(b % 2 === 0){
      for(let h = 0; h <= 4; h++){
        const hz = z - 0.8 + h * 0.4;
        const hoop = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.03, 5, 12, Math.PI),
          MATERIALS.steel());
        hoop.position.set(x, y + 0.3, hz);
        hoop.rotation.y = Math.PI / 2;
        scene.add(hoop);
      }
      const sheet = box(scene, 4.3, 0.03, 2.2, x, y + 1.3, z, POLY());
      animate?.(sway(sheet, 'z', 0.02, 0.7, b));
    }
  }
  // Trestles with trays on them, and coiled hose.
  const tx = ox - 5, tz = oz + 6, ty = groundHeight(tx, tz);
  box(scene, 3.2, 0.1, 0.9, tx, ty + 0.85, tz, TIMBERW());
  for(const sx of [-1.4, 1.4]) box(scene, 0.1, 0.85, 0.1, tx + sx, ty + 0.42, tz, TIMBERW());
  for(let i = 0; i < 4; i++){
    box(scene, 0.7, 0.12, 0.5, tx - 1.2 + i * 0.8, ty + 0.96, tz, MATERIALS.paintedSteel(0x3f4a52));
  }
  for(let i = 0; i < 3; i++){
    const c = new THREE.Mesh(new THREE.TorusGeometry(0.5 - i * 0.08, 0.045, 5, 16),
      MATERIALS.paintedSteel(0x2f5f3a));
    c.position.set(tx + 3.4, ty + 0.06 + i * 0.09, tz);
    c.rotation.x = Math.PI / 2;
    scene.add(c);
  }
  return trays;
}

/**
 * 2–3. The marsh, and the birds on it. The bay was dry ground on a campaign
 *      whose sixth area is a Marsh Research Bay.
 */
function marsh(scene, ctx){
  const { groundHeight, softColliders, animate } = ctx;
  // CLEAR OF THE BAY'S OWN DOOR at (-63, -196). The first cut centred the water
  // on (-66, -180) with an 18 m soft collider, which put the Marsh Research
  // Bay's approach inside the marsh and walled the stop off — house rule 8, and
  // `reachable.mjs` rather than the eye is what found it. The water sits north
  // of the building now and the approach from the dune track is open.
  const cx = -78, cz = -150;
  const y = groundHeight(cx, cz);
  // Standing water, and a darker rim of mud round it.
  box(scene, 46, 0.4, 34, cx, y - 0.24, cz, mat('pellow.mud',
    () => new THREE.MeshStandardMaterial({ color: 0x38332a, roughness: 1, metalness: 0 })));
  const water = box(scene, 42, 0.08, 30, cx, y - 0.02, cz, MARSHWATER());
  water.receiveShadow = false;
  softColliders?.push({ x: cx, z: cz, r: 18 });
  // Reed beds along two edges.
  const r = rngW(0x3eed22);
  for(let i = 0; i < 260; i++){
    const edge = i % 2;
    const x = cx + betweenW(r, -21, 21);
    const z = edge ? cz - 15 + betweenW(r, -2.5, 2.5) : cz + 15 + betweenW(r, -2.5, 2.5);
    const gy = groundHeight(x, z);
    const blade = cyl(scene, 0.018, betweenW(r, 0.9, 1.8), x, gy + 0.6, z, REED());
    blade.rotation.z = betweenW(r, -0.2, 0.2);
    blade.castShadow = false;
    if(i % 9 === 0) animate?.(sway(blade, 'z', 0.1, betweenW(r, 0.6, 1.1), i));
  }
  // The boardwalk out onto it, on piles, and a hide at the end.
  for(let i = 0; i < 14; i++){
    const z = cz + 17 - i * 1.6;
    const py = groundHeight(cx + 6, z);
    for(const sx of [-0.7, 0.7]) cyl(scene, 0.09, 1.2, cx + 6 + sx, py + 0.1, z, TIMBERW());
    box(scene, 1.8, 0.1, 1.5, cx + 6, py + 0.68, z, TIMBERW());
  }
  const hy = groundHeight(cx + 6, cz - 6);
  box(scene, 2.6, 1.9, 2.2, cx + 6, hy + 1.5, cz - 6, TIMBERW());
  box(scene, 2.4, 0.35, 0.06, cx + 6, hy + 1.7, cz - 7.05, mat('pellow.slot',
    () => new THREE.MeshStandardMaterial({ color: 0x14181a, roughness: 1, metalness: 0 })));
  box(scene, 3.0, 0.12, 2.6, cx + 6, hy + 2.5, cz - 6, TIMBERW());

  // Waders standing in the shallows, and two flights that circle.
  for(let i = 0; i < 6; i++){
    const x = cx + betweenW(r, -14, 14), z = cz + betweenW(r, -10, 10);
    const g = new THREE.Group();
    g.position.set(x, groundHeight(x, z) + 0.05, z);
    g.rotation.y = betweenW(r, 0, 6.2);
    cyl(g, 0.025, 0.34, 0, 0.17, 0, MATERIALS.paintedSteel(0x8f8a7c));
    box(g, 0.12, 0.2, 0.3, 0, 0.42, 0, MATERIALS.paintedSteel(0xd8d2c2));
    box(g, 0.09, 0.1, 0.13, 0, 0.58, -0.12, MATERIALS.paintedSteel(0xd8d2c2));
    box(g, 0.04, 0.04, 0.16, 0, 0.6, -0.24, MATERIALS.paintedSteel(0x2f2a22));
    scene.add(g);
    animate?.((t) => { g.rotation.y += Math.sin(t * 0.3 + x) * 0.004; });
  }
  for(let f = 0; f < 2; f++){
    const flock = new THREE.Group();
    for(let i = 0; i < 9; i++){
      const b = new THREE.Group();
      b.position.set(betweenW(r, -7, 7), betweenW(r, -1.5, 1.5), betweenW(r, -7, 7));
      for(const sx of [-1, 1]){
        const wing = box(b, 0.5, 0.03, 0.14, sx * 0.28, 0, 0, MATERIALS.paintedSteel(0xe0dccf));
        wing.rotation.z = sx * 0.3;
      }
      box(b, 0.16, 0.08, 0.34, 0, 0, 0, MATERIALS.paintedSteel(0xe0dccf));
      flock.add(b);
    }
    scene.add(flock);
    const rad = 26 + f * 12, hgt = 14 + f * 6, sp = 0.09 + f * 0.03;
    animate?.((t) => {
      flock.position.set(cx + Math.cos(t * sp + f) * rad, groundHeight(cx, cz) + hgt,
        cz + Math.sin(t * sp + f) * rad);
      flock.rotation.y = -t * sp;
    });
  }
}

/** 4. The grazing enclosure between the compound and the bay. */
function grazing(scene, ctx){
  const { groundHeight, softColliders, animate } = ctx;
  const x0 = -46, z0 = -50, x1 = -14, z1 = -96;
  fenceRun(scene, { x0, z0, x1, z0, y: groundHeight(x0, z0), height: 1.3 });
  fenceRun(scene, { x0: x1, z0, x1, z1, y: groundHeight(x1, z0), height: 1.3 });
  fenceRun(scene, { x0, z0: z1, x1, z1, y: groundHeight(x0, z1), height: 1.3 });
  fenceRun(scene, { x0, z0, x1: x0, z1, y: groundHeight(x0, z0), height: 1.3 });
  // The trough, and the gate post that says it is a gate.
  const tx = -30, tz = -70, ty = groundHeight(tx, tz);
  box(scene, 2.6, 0.4, 0.7, tx, ty + 0.2, tz, CONCRETE());
  box(scene, 2.4, 0.06, 0.55, tx, ty + 0.38, tz, MARSHWATER());
  softColliders?.push({ x: tx, z: tz, r: 1.4 });
  const r = rngW(0x60a7ee);
  for(let i = 0; i < 6; i++){
    const x = betweenW(r, x0 + 4, x1 - 4), z = betweenW(r, z1 + 5, z0 - 5);
    const y = groundHeight(x, z);
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.rotation.y = betweenW(r, 0, 6.2);
    box(g, 0.5, 0.48, 0.95, 0, 0.6, 0, mat('pellow.fleece',
      () => new THREE.MeshStandardMaterial({ color: 0xa8a292, roughness: 0.96, metalness: 0 })));
    box(g, 0.28, 0.28, 0.3, 0, 0.7, -0.56, MATERIALS.paintedSteel(0x4a4038));
    for(const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]){
      box(g, 0.07, 0.38, 0.07, sx * 0.18, 0.19, sz * 0.32, MATERIALS.paintedSteel(0x4a4038));
    }
    scene.add(g);
    animate?.(wander(g, 9, 0.014, betweenW(r, 0, 6)));
  }
}

/** 5. The seed orchard: thirty young trees in guards, in a grid. */
function orchard(scene, ctx){
  const { groundHeight, softColliders } = ctx;
  const ox = -46, oz = 16;
  for(let i = 0; i < 30; i++){
    const x = ox + (i % 6) * 3.4, z = oz + Math.floor(i / 6) * 3.6;
    const y = groundHeight(x, z);
    cyl(scene, 0.06, 1.5, x, y + 0.75, z, TIMBERW());
    for(let k = 0; k < 3; k++){
      cyl(scene, 0.55 - k * 0.16, 0.5, x, y + 1.5 + k * 0.36, z, LEAF(), 0.12);
    }
    // The guard: a translucent tube round the stem, which is what a young tree
    // in a planting scheme actually looks like.
    const guard = cyl(scene, 0.14, 1.1, x, y + 0.55, z, POLY());
    guard.castShadow = false;
    if(i % 6 === 0) softColliders?.push({ x, z, r: 0.6 });
  }
}

/** 6. The shore: wet rock, kelp on the strand line, and pools that hold sky. */
function shore(scene, ctx){
  const { groundHeight, animate } = ctx;
  const r = rngW(0x5407ee);
  for(let i = 0; i < 46; i++){
    const x = betweenW(r, -150, 150), z = betweenW(r, -238, -206);
    const y = groundHeight(x, z);
    const rock = box(scene, betweenW(r, 1.2, 3.4), betweenW(r, 0.3, 0.9), betweenW(r, 1.0, 2.8),
      x, y + 0.15, z, mat('pellow.wetrock', () => new THREE.MeshStandardMaterial({
        color: 0x3e3a34, roughness: 0.55, metalness: 0.05, envMapIntensity: 0.7 })));
    rock.rotation.y = betweenW(r, 0, 3.1);
    // A pool in the lee of every third one.
    if(i % 3 === 0){
      const p = box(scene, 1.6, 0.04, 1.2, x + 1.6, y + 0.06, z + 0.8, MARSHWATER());
      p.receiveShadow = false;
    }
  }
  // The strand line: kelp and debris in a band, which is what says "tide".
  for(let i = 0; i < 120; i++){
    const x = betweenW(r, -160, 160), z = -200 + betweenW(r, -3, 3);
    const y = groundHeight(x, z);
    const k = box(scene, betweenW(r, 0.3, 1.1), 0.06, betweenW(r, 0.1, 0.3), x, y + 0.04, z, KELP());
    k.rotation.y = betweenW(r, 0, 3.1);
    k.castShadow = false;
  }
}

/** 7. Insects over the flower trays — the campaign has a pollinator mission. */
function insects(scene, ctx){
  const { groundHeight, animate } = ctx;
  const r = rngW(0x1e5ec7);
  for(let i = 0; i < 5; i++){
    const x = 28 + betweenW(r, -6, 8), z = 4 + betweenW(r, -10, 8);
    const y = groundHeight(x, z);
    const g = new THREE.Group();
    g.position.set(x, y + 1.1, z);
    for(let k = 0; k < 4; k++){
      box(g, 0.05, 0.05, 0.05, betweenW(r, -0.3, 0.3), betweenW(r, -0.2, 0.2),
        betweenW(r, -0.3, 0.3), mat('pellow.insect', () => new THREE.MeshBasicMaterial({
          color: 0x2f2a1e })));
    }
    scene.add(g);
    const bx = x, bz = z, phase = betweenW(r, 0, 6);
    animate?.((t) => {
      g.position.set(bx + Math.sin(t * 0.9 + phase) * 1.1, y + 1.0 + Math.sin(t * 1.7 + phase) * 0.35,
        bz + Math.cos(t * 0.7 + phase) * 1.1);
    });
  }
}

/** 8. Windbreak hedging on the seaward side, which the flat site has none of. */
function hedging(scene, ctx){
  const { groundHeight, softColliders, animate } = ctx;
  const r = rngW(0x4ed6e2);
  for(let i = 0; i < 60; i++){
    const x = -60 + i * 2.1, z = -30 + Math.sin(i * 0.3) * 1.4;
    const y = groundHeight(x, z);
    const h = betweenW(r, 1.6, 2.4);
    const bush = box(scene, 2.0, h, 1.5, x, y + h / 2, z, mat('pellow.hedge',
      () => new THREE.MeshStandardMaterial({ color: 0x33502f, roughness: 0.96, metalness: 0,
        envMapIntensity: 0.4 })));
    bush.rotation.y = betweenW(r, -0.2, 0.2);
    if(i % 5 === 0){
      softColliders?.push({ x, z, r: 1.1 });
      animate?.(sway(bush, 'z', 0.02, betweenW(r, 0.5, 0.9), i));
    }
  }
}

/** 9–13. The working station: the cart track, quarantine, frames, butts, mast. */
function stationYard(scene, ctx){
  const { groundHeight, softColliders, animate } = ctx;
  // The quarantine porch at the Clinic.
  const cx = -18, cz = 28, cy = groundHeight(cx, cz);
  box(scene, 1.2, 0.12, 0.8, cx - 2, cy + 0.06, cz, MATERIALS.paintedSteel(0x2f4a52));
  box(scene, 1.1, 0.05, 0.7, cx - 2, cy + 0.14, cz, MARSHWATER());
  for(const sx of [-0.8, 0.8]) box(scene, 0.09, 2.0, 0.09, cx + 1 + sx, cy + 1.0, cz, TIMBERW());
  box(scene, 2.0, 0.09, 0.09, cx + 1, cy + 1.95, cz, TIMBERW());
  for(let i = 0; i < 4; i++){
    box(scene, 0.4, 0.7, 0.1, cx + 0.4 + i * 0.4, cy + 1.5, cz, MATERIALS.paintedSteel(0xc9b23c));
  }
  softColliders?.push({ x: cx + 1, z: cz, r: 1.2 });
  // Cold frames and a potting bench outside SEED.
  const sx0 = -34, sz0 = 16, sy0 = groundHeight(sx0, sz0);
  for(let i = 0; i < 3; i++){
    const x = sx0 + i * 2.6;
    box(scene, 2.2, 0.4, 1.3, x, sy0 + 0.2, sz0, TIMBERW());
    const lid = box(scene, 2.2, 0.04, 1.35, x, sy0 + 0.5, sz0, POLY());
    lid.rotation.x = -0.14;
  }
  box(scene, 3.0, 0.1, 0.9, sx0 + 1, sy0 + 0.9, sz0 + 3, TIMBERW());
  for(const sx of [-1.3, 1.3]) box(scene, 0.1, 0.9, 0.1, sx0 + 1 + sx, sy0 + 0.45, sz0 + 3, TIMBERW());
  softColliders?.push({ x: sx0 + 1, z: sz0 + 3, r: 1.6 });
  // Water butts and a rain gauge on the Growth Hall.
  const wx = 22, wz = 14, wy = groundHeight(wx, wz);
  for(const dx of [0, 1.4]){
    cyl(scene, 0.55, 1.5, wx + dx, wy + 0.75, wz, MATERIALS.paintedSteel(0x2f4a3a));
    cyl(scene, 0.57, 0.06, wx + dx, wy + 1.53, wz, MATERIALS.paintedSteel(0x24382c));
  }
  cyl(scene, 0.09, 0.9, wx + 3, wy + 0.45, wz, MATERIALS.paintedSteel(0xd8d3c4));
  softColliders?.push({ x: wx + 0.7, z: wz, r: 1.2 });
  // The weather mast, with an anemometer that turns.
  const mx = 8, mz = -6, my = groundHeight(mx, mz);
  cyl(scene, 0.08, 7.5, mx, my + 3.75, mz, MATERIALS.paintedSteel(0xc4c0b4));
  const cups = new THREE.Group();
  cups.position.set(mx, my + 7.6, mz);
  for(let i = 0; i < 3; i++){
    const a = (i / 3) * Math.PI * 2;
    box(cups, 0.1, 0.1, 0.1, Math.cos(a) * 0.32, 0, Math.sin(a) * 0.32,
      MATERIALS.paintedSteel(0xe0dccf));
    box(cups, 0.32, 0.03, 0.03, Math.cos(a) * 0.16, 0, Math.sin(a) * 0.16,
      MATERIALS.steel()).rotation.y = -a;
  }
  scene.add(cups);
  animate?.(spin(cups, 'y', 2.8));
  const vane = box(scene, 0.5, 0.3, 0.03, mx, my + 7.1, mz, MATERIALS.paintedSteel(0xc4342a));
  animate?.((t) => { vane.rotation.y = Math.sin(t * 0.2) * 0.8; });
}

/**
 * 14, 16. The ship, and the cart that goes to it.
 *
 * Fifteen days count down to a departure and there was no vessel on the island.
 * The cart fills a box per mission and, on the last day, goes down the track and
 * up the gangway — which is the bible's own closing line standing in the world.
 */
function shipAndCart(scene, ctx){
  const { groundHeight, softColliders, animate, stateHooks } = ctx;
  // The jetty and the coaster alongside it, off the south shore.
  const jx = 30, jz = -196;
  const jy = groundHeight(jx, jz);
  for(let i = 0; i < 12; i++){
    const z = jz + 12 - i * 2.2;
    for(const sx of [-1.6, 1.6]) cyl(scene, 0.16, 2.2, jx + sx, jy - 0.3, z, TIMBERW());
    box(scene, 4.0, 0.14, 2.1, jx, jy + 0.66, z, TIMBERW());
  }
  const ship = new THREE.Group();
  ship.position.set(jx + 9, jy - 0.9, jz - 6);
  box(ship, 7.0, 3.2, 26, 0, 1.6, 0, MATERIALS.paintedSteel(0x2b3a44));
  box(ship, 7.2, 0.5, 26.4, 0, 3.3, 0, MATERIALS.paintedSteel(0x8a5a3a));
  box(ship, 5.0, 3.0, 6.0, 0, 4.9, -8, MATERIALS.paintedSteel(0xd8d3c4));
  box(ship, 4.6, 1.0, 0.1, 0, 5.4, -11.05, MATERIALS.glass());
  cyl(ship, 0.5, 3.4, 0, 6.9, -6, MATERIALS.paintedSteel(0xc4342a));
  for(let i = 0; i < 4; i++){
    cyl(ship, 0.2, 5.5, -1.5 + i, 6.0, 6 + i * 0.2, MATERIALS.paintedSteel(0x9a9488));
  }
  scene.add(ship);
  animate?.(bob(ship, 0.09, 0.35));
  animate?.(sway(ship, 'z', 0.012, 0.3));
  // The gangway down to the jetty.
  const gang = box(scene, 1.2, 0.1, 8, jx + 5, jy + 1.4, jz - 6, TIMBERW());
  gang.rotation.z = 0.1;
  gang.rotation.y = 0.4;

  // The cart, and the boxes that accumulate on it.
  const cart = new THREE.Group();
  const startX = -14, startZ = 30;
  cart.position.set(startX, groundHeight(startX, startZ), startZ);
  box(cart, 1.6, 0.12, 1.0, 0, 0.62, 0, TIMBERW());
  for(const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]){
    cyl(cart, 0.26, 0.08, sx * 0.7, 0.26, sz * 0.42, MATERIALS.paintedSteel(0x3a3a38))
      .rotation.z = Math.PI / 2;
  }
  box(cart, 0.1, 0.7, 0.1, 0.85, 0.95, 0, TIMBERW());
  const boxes = [];
  for(let i = 0; i < 15; i++){
    const b = box(cart, 0.42, 0.3, 0.36, -0.6 + (i % 4) * 0.4, 0.83 + Math.floor(i / 4) * 0.32,
      -0.3 + (i % 2) * 0.3, mat('pellow.samplebox',
        () => new THREE.MeshStandardMaterial({ color: 0xb9b0a0, roughness: 0.9, metalness: 0 })));
    b.visible = false;
    boxes.push(b);
  }
  scene.add(cart);
  softColliders?.push({ x: startX, z: startZ, r: 1.2 });

  stateHooks?.push((state) => {
    const day = Math.max(1, state?.week ?? 1);
    boxes.forEach((b, i) => { b.visible = i < day; });
    // On the last day it is at the ship rather than at the clinic.
    const done = day >= 15;
    const x = done ? jx : startX, z = done ? jz + 8 : startZ;
    cart.position.set(x, groundHeight(x, z) + (done ? 0.66 : 0), z);
    cart.rotation.y = done ? Math.PI / 2 : 0;
  });
  return null;
}

/**
 * 15, 17, 18. What the campaign changes about the growing.
 *
 * The trays go from pale to green with the campaign's own progress, which is
 * mission 1's whole argument in one material; the lamp trial lights one tunnel
 * on mission 4 and stays that way because mission 5 halts the wider reset; and
 * the ventilated lids appear after mission 3.
 */
function growingState(scene, ctx, trays){
  const { groundHeight, stateHooks, lightPanels } = ctx;
  const PALE_C = new THREE.Color(0x9aa06a), GREEN_C = new THREE.Color(0x3f6b34);
  const leaf = LEAF();
  // The lamps over one tunnel, dark until the trial.
  const lamps = [];
  for(let i = 0; i < 4; i++){
    const x = 30, z = -6 + i * 1.2;
    const y = groundHeight(x, z);
    const l = box(scene, 1.4, 0.12, 0.3, x, y + 1.9, z, mat('pellow.lamp',
      () => new THREE.MeshStandardMaterial({ color: 0x2a2f33, roughness: 0.6, metalness: 0.3,
        emissive: 0xffd9a0, emissiveIntensity: 0 })));
    lamps.push(l);
  }
  // Ventilated lids, which mission 3 fits.
  const lids = [];
  for(let i = 0; i < 6; i++){
    const x = 24 + (i % 3) * 1.1, z = 2 + Math.floor(i / 3) * 1.1;
    const y = groundHeight(x, z);
    const lid = box(scene, 0.9, 0.05, 0.9, x, y + 0.62, z, POLY());
    lid.visible = false;
    lids.push(lid);
  }
  stateHooks?.push((state) => {
    const day = Math.max(1, state?.week ?? 1);
    // Pale on day one, green by the end. One material, and it is the campaign.
    leaf.color.copy(PALE_C).lerp(GREEN_C, Math.min(1, (day - 1) / 12));
    for(const l of lamps) l.material.emissiveIntensity = day >= 4 ? 0.9 : 0;
    for(const lid of lids) lid.visible = day >= 3;
  });
}
