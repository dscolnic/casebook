// props.js — the objects that make Sarn Barrage a barrage.
//
// Generic fittings (benches, bins, posts, boards) come from
// engine/world/kit.js and are placed from site.js. What is here is the handful
// of things this place has and nowhere else does:
//
//   · **The barrage is the silhouette.** A concrete deck across the neck of the
//     estuary with six gate bays in it, the leaves half raised, and a handrail
//     the whole way. Nothing else on the site is above nine metres except the
//     gauge tower, so every screenshot of this game is a horizontal line with
//     one vertical beside it.
//   · **The training wall runs off the map.** A line of armour units from the
//     eastern abutment out into the channel, getting lower as it goes, which is
//     the geometry days five and six are about. It is the only thing that
//     reaches past the bank.
//   · **The tide poles are instruments you can walk up to**, banded in half
//     metres, which is what makes the range visible as a height rather than as a
//     number on a board.
//   · **The float rack at the pontoon** holds the nine that came back. Day two
//     is about the tenth.
//
// Placement helpers take `(x, z, y)` — ground last.
import * as THREE from 'three';
import {
  MATERIALS, box, cyl,
  vehicle, VEHICLE_DRIVE, quadBike, QUAD_DRIVE, clearSpot,
} from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';

/** The line of the barrage, and how wide its deck is. */
const LINE = { z: -12, x0: -72, x1: 72, deck: 6.0, top: 3.6 };
/** Where the training wall leaves the eastern abutment, and where it ends. */
const WALL = { x: 170, z0: -16, z1: -140 };

const CONCRETE = () => MATERIALS.concrete();
const PAINT = (c) => MATERIALS.paintedSteel(c);

/**
 * The barrage: a deck on piers, six gate bays with their leaves part raised, and
 * a handrail along the seaward edge.
 *
 * Built as bays rather than as one long box because the gates are the thing the
 * whole campaign is about, and a solid wall across an estuary reads as a road
 * embankment.
 */
function barrage(scene, ctx){
  const { groundHeight, colliders } = ctx;
  const y = groundHeight(0, LINE.z);
  const bays = 6;
  const span = (LINE.x1 - LINE.x0) / bays;

  // The deck, in one piece so the walkway reads as continuous, with the road
  // crossing it at x = 0.
  const deck = box(scene, LINE.x1 - LINE.x0, 0.9, LINE.deck,
    (LINE.x0 + LINE.x1) / 2, y + LINE.top, LINE.z, CONCRETE());
  deck.receiveShadow = true;
  // Two colliders rather than one, so the barrage road is a gap in the wall
  // rather than a wall across the road. A deck the player cannot cross puts the
  // whole seaward half of the site out of reach, which is house rule 8.
  for(const [a, b] of [[LINE.x0, -5.5], [5.5, LINE.x1]]){
    const wall = new THREE.Box3(
      new THREE.Vector3(a, y, LINE.z - LINE.deck / 2),
      new THREE.Vector3(b, y + LINE.top + 0.9, LINE.z + LINE.deck / 2));
    colliders.push(wall);
  }

  for(let i = 0; i <= bays; i++){
    const px = LINE.x0 + i * span;
    // A pier between every pair of bays, wider than the deck so it reads as
    // carrying it.
    box(scene, 2.4, LINE.top, LINE.deck + 2.0, px, y + LINE.top / 2, LINE.z, CONCRETE());
    if(i === bays) break;
    // The gate leaf, hanging in its bay, raised by a different amount in each so
    // the line reads as a working machine rather than as a fence.
    const raise = [0.4, 1.8, 3.1, 2.2, 0.9, 3.6][i];
    const leaf = box(scene, span - 2.6, 3.4, 0.5,
      px + span / 2, y + 1.2 + raise, LINE.z - 1.4, PAINT(0x4a5b52));
    leaf.castShadow = true;
    // The hoist frame over it, and the two screw jacks that lift it.
    box(scene, span - 2.2, 0.35, 0.6, px + span / 2, y + LINE.top + 1.9, LINE.z - 1.4, PAINT(0x6f767c));
    for(const s of [-1, 1]){
      cyl(scene, 0.10, 2.2, px + span / 2 + s * (span / 2 - 1.8),
        y + LINE.top + 0.9, LINE.z - 1.4, MATERIALS.steel());
    }
  }

  // Handrail along the seaward edge, in posts and a top rail.
  for(let x = LINE.x0 + 1; x < LINE.x1; x += 3){
    cyl(scene, 0.05, 1.1, x, y + LINE.top + 1.0, LINE.z + LINE.deck / 2 - 0.3, PAINT(0xb9b3a4));
  }
  box(scene, LINE.x1 - LINE.x0, 0.07, 0.07,
    (LINE.x0 + LINE.x1) / 2, y + LINE.top + 1.55, LINE.z + LINE.deck / 2 - 0.3, PAINT(0xb9b3a4));
}

/**
 * The training wall: armour units in a line running seaward, each a little lower
 * than the last, ending under the water.
 */
function trainingWall(scene, ctx){
  const { groundHeight, colliders } = ctx;
  const n = 26;
  for(let i = 0; i < n; i++){
    const t = i / (n - 1);
    const z = WALL.z0 + (WALL.z1 - WALL.z0) * t;
    const g = groundHeight(WALL.x, z);
    // The crest falls from 3.2 m at the root to nothing at the head, which is
    // what makes the far end read as being overtopped.
    const h = 3.2 * (1 - t) + 0.4;
    for(const s of [-1, 0, 1]){
      const u = box(scene, 2.2, h, 2.6, WALL.x + s * 2.4, g + h / 2 - 0.6, z,
        MATERIALS.paintedSteel(0x8e8b80));
      u.rotation.y = ((i * 37 + s * 11) % 90) * Math.PI / 180;
      u.castShadow = true;
      u.userData.ignoreAudit = true;      // the seaward half is deliberately in the water
    }
    if(i < 3){
      const c = new THREE.Box3(
        new THREE.Vector3(WALL.x - 4, g, z - 1.4),
        new THREE.Vector3(WALL.x + 4, g + h, z + 1.4));
      colliders.push(c);
    }
  }
  // The gauge at the head, on a pile, which is where Fell's notebook comes from.
  const hz = WALL.z1 + 6;
  cyl(scene, 0.22, 7.5, WALL.x, groundHeight(WALL.x, hz) + 2.4, hz, MATERIALS.steel());
  box(scene, 0.7, 0.9, 0.5, WALL.x, groundHeight(WALL.x, hz) + 6.4, hz, PAINT(0xc9a23f));
}

/** A tide pole: banded in half metres, so a range is a height and not a number. */
function tidePole(scene, x, z, y){
  cyl(scene, 0.09, 9.0, x, y + 4.5, z, PAINT(0xe8e4d8));
  for(let i = 0; i < 9; i++){
    if(i % 2) continue;
    box(scene, 0.20, 0.5, 0.20, x, y + 0.25 + i, z, PAINT(0x2f3b42));
  }
}

/** The float rack: nine recovered floats on their sides, and one empty cradle. */
function floatRack(scene, x, z, y){
  box(scene, 6.0, 0.15, 1.4, x, y + 0.9, z, PAINT(0x7f7a6c));
  for(let i = 0; i < 10; i++){
    const fx = x - 2.7 + i * 0.6;
    if(i === 6) continue;                 // float 7, still out
    cyl(scene, 0.19, 0.9, fx, y + 1.35, z, PAINT(i % 2 ? 0xd8552f : 0xe8a13a));
    cyl(scene, 0.03, 0.7, fx, y + 2.1, z, MATERIALS.steel());
  }
}

/** The jetty the launch lies alongside, running seaward from the boat shed over
 *  the water — the bed is cut here, so the piles stand in the estuary. */
function jetty(scene, ctx){
  const { groundHeight, colliders } = ctx;
  for(let i = 0; i < 9; i++){
    const z = -12 - i * 4;
    const y = groundHeight(-58, z);
    box(scene, 3.2, 0.18, 3.8, -58, y + 1.4, z, PAINT(0x8a8272));
    for(const s of [-1, 1]){
      cyl(scene, 0.12, 2.2, -58 + s * 1.4, y + 0.5, z, MATERIALS.steel());
      cyl(scene, 0.05, 1.0, -58 + s * 1.5, y + 1.9, z, PAINT(0xb9b3a4));
    }
  }
  const y0 = groundHeight(-58, -30);
  colliders.push(new THREE.Box3(
    new THREE.Vector3(-60.2, y0, -50), new THREE.Vector3(-55.8, y0 + 1.6, -10)));
}

export function decorate(scene, ctx){
  const { groundHeight } = ctx;
  const at = (x, z) => groundHeight(x, z);

  barrage(scene, ctx);
  trainingWall(scene, ctx);
  jetty(scene, ctx);

  // Tide poles: one on the seaward face of the barrage, one in the impoundment,
  // one out at the root of the wall.
  for(const [x, z] of [[-22, -18], [-22, 6], [160, -6]]) tidePole(scene, x, z, at(x, z));

  floatRack(scene, -42, 8, at(-42, 8));

  // --------------------------------------------------------------- transport
  // The wall station is 170 m east along the shore and the campaign's own
  // warm-up card sends the player out there on the unlock day. Two kinds,
  // because the estuary is two surfaces: the works van has the barrage road and
  // stops where the metalling does, and the quad is what crosses the mud to the
  // training wall — which is the difference the far lap is about.
  transport(scene, ctx, at);

  // The stilling well: a vertical pipe down the seaward face of the gauge tower,
  // which is the forty minutes the whole gate-timing argument turns on.
  cyl(scene, 0.28, 12.0, -12, at(-12, 1.4) + 6.0, 1.4, PAINT(0x9aa0a2));
  box(scene, 0.9, 0.7, 0.5, -12, at(-12, 1.4) + 1.1, 1.4, PAINT(0xc9a23f));
}


// ------------------------------------------------------------------ transport
/** The spawn, so nothing is parked on top of it. Mirrors `site.start`. */
const SPAWN = { x: 0, z: 70 };
const VAN_AT = { x: 16, z: 56 }, VAN_FACING = Math.PI, VAN_COLOUR = 0x2f5f7a;
const VAN_ID = 'barrage-van', VAN_LABEL = 'barrage van';
const QUAD_AT = { x: -16, z: 54 }, QUAD_FACING = Math.PI, QUAD_COLOUR = 0xb4741f;
const QUAD_ID = 'mud-quad', QUAD_LABEL = 'mud quad';
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
