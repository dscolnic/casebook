// props.js — the objects that make Pellow Head a cable landing station.
//
// Generic fittings come from engine/world/kit.js and are placed from site.js.
// What is here is the handful of things this place has and nowhere else does:
//
//   · **The cable is the object and it is buried.** What can be seen of it is a
//     manhole lid in the dunes, a line of duct markers up to the station, and
//     one bight of the real thing on a drum in the store yard — armoured, as
//     thick as a wrist, and the only piece of this game a player can look at.
//   · **The bay is separated by distance rather than by lead**, which is why it
//     is a small concrete box with a rope barrier at eighteen metres and a
//     warning beacon on a pole. The empty ground round it is the shielding.
//   · **The dune crest is the edge of the world.** A fence along it and a set of
//     steps down that go nowhere the player may follow.
//   · **The station's own aerials and cable racks** are on the roof, because a
//     one-storey building with nothing on it reads as a garage.
//
// Placement helpers take `(x, z, y)` — ground last.
import * as THREE from 'three';
import { MATERIALS, box, cyl } from '../../engine/world/kit.js';

const CONCRETE = () => MATERIALS.concrete();
const PAINT = (c) => MATERIALS.paintedSteel(c);

/** The manhole: a lid, a frame and the duct stubs either side of it. */
function manhole(scene, x, z, y){
  box(scene, 4.4, 0.35, 4.4, x, y + 0.18, z, CONCRETE());
  box(scene, 2.4, 0.12, 1.6, x, y + 0.40, z, PAINT(0x6f6a5c));
  for(const s of [-1, 1]) cyl(scene, 0.18, 1.6, x + s * 1.6, y + 0.2, z, PAINT(0x55504a));
  // The bollards that stop a vehicle parking on it.
  for(const [dx, dz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]){
    cyl(scene, 0.11, 1.0, x + dx, y + 0.5, z + dz, PAINT(0xc9a23f));
  }
}

/** A drum of the real cable, in the store yard: the only visible bight of it. */
function cableDrum(scene, x, z, y){
  const flange = () => cyl(scene, 1.6, 0.14, x, y + 1.6, z, PAINT(0x7f7a6c));
  for(const dz of [-0.7, 0.7]){
    const f = cyl(scene, 1.6, 0.14, x, y + 1.6, z + dz, PAINT(0x7f7a6c));
    f.rotation.x = Math.PI / 2;
  }
  void flange;
  const barrel = cyl(scene, 1.05, 1.3, x, y + 1.6, z, PAINT(0x3a3a36));
  barrel.rotation.x = Math.PI / 2;
  cyl(scene, 0.07, 3.4, x, y + 1.6, z, MATERIALS.steel()).rotation.x = Math.PI / 2;
  // The tail, led off the drum and pegged down.
  box(scene, 0.09, 0.09, 2.6, x + 1.1, y + 0.12, z + 2.0, PAINT(0x2f2f2c));
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

  // The duct trench, left open for twelve metres where the splice trailer is
  // parked against it — which is why the trailer is where it is.
  for(let i = 0; i < 6; i++){
    const z = -24 - i * 2.2, y = at(-16, z);
    box(scene, 1.2, 0.5, 2.0, -16, y - 0.1, z, CONCRETE());
  }
}

export function fitOutRoom(){}
export function fitOutSpine(){}
