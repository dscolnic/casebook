// props.js — the objects unique to this theme.
//
// Anything generic (chairs, counters, carts, bins, screens, shelving, plants)
// should come from engine/world/kit.js; this file is only for the ten or so
// things that make *this* place recognisable.
//
// Which hook runs depends on the world:
//   outdoor   decorate(scene, ctx)     after ground, buildings and furniture
//             ctx = { groundHeight, colliders, softColliders, interactables,
//                     blocked, sign, MATERIALS, lightPanels, areaScreens }
//   interior  fitOutRoom / fitOutSpine, with the builder context from
//             engine/world/interiorSite.js:
//             { scene, plan, geo, P, box, wall, materials, soft, hard,
//               addInteractable }
//
// The unused ones are ignored, so all three can be exported from here.

import {
  vehicle, VEHICLE_DRIVE, bicycleRack, BICYCLE_DRIVE, clearSpot,
} from '../../engine/world/kit.js';
import { driveable } from '../../engine/world/driving.js';

/**
 * Decorate an outdoor town. Everything generic — benches, bins, posts, signs,
 * fences, tanks, pipe runs, display boards, vehicles — is already in
 * engine/world/kit.js and is placed from site.js. This is for what makes *this*
 * place recognisable.
 *
 * Placement helpers take `(x, z, y)` — ground last. One call written `(x, y, z)`
 * put six display boards sixteen metres in the air.
 *
 * To make a parked vehicle driveable, see themes/contamcity/props.js `park()`.
 */
export function decorate(scene, ctx){
  transport(scene, ctx);
}

/**
 * The island's two vehicles.
 *
 * Day 4's card says "the truck is signed out for it. Drive the road once…", and
 * until now Vellan had nothing to drive. The tip is 206 m up the island road,
 * the turbine yard the same the other way and the reef station 318 m out — a
 * campaign about ninety-one people on a low island that was walked end to end.
 *
 * Two kinds, and on an island of ninety-one people that is not a stylistic
 * choice: there is one flatbed, shared, because the island has one — and there
 * are bicycles, because that is what everybody else uses and the road is flat.
 * A game whose subject is carrying capacity should not have a truck each.
 */
function transport(scene, ctx){
  const { groundHeight, colliders, interactables, blocked } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const spawn = { x: 0, z: 75, r: 13 };

  const ts = clearSpot({ x: -18, z: 60 }, blocked, { pad: 3.4, avoid: [spawn] });
  const flat = vehicle(scene, ts.x, ts.z, y(ts.x, ts.z),
    { facing: 0, colour: 0x8a5f3a, box: false });
  driveable(scene, flat.group, {
    ...VEHICLE_DRIVE,
    id: 'island-flatbed', label: 'island flatbed', kind: 'pickup',
    seat: { x: 0.52, y: 2.18, z: flat.cabZ },
    wheels: flat.wheels,
    // An island road, not a highway. Slower than a town truck on purpose.
    topSpeed: 10,
    colliders, interactables,
  });

  const rs = clearSpot({ x: 15, z: 63 }, blocked,
    { pad: 2.2, avoid: [spawn, { x: ts.x, z: ts.z, r: 6 }] });
  const { rail, bicycles } = bicycleRack(scene, rs.x, rs.z, y(rs.x, rs.z), {
    facing: Math.PI,
    list: [
      { colour: 0x2c4a5c, basket: true },
      { colour: 0x7a3a2c, basket: false },
      { colour: 0x3c6a4a, basket: true },
    ],
  });
  if(rail.soft) ctx.softColliders?.push(rail.soft);
  bicycles.forEach((b, i) => {
    driveable(scene, b.group, {
      ...BICYCLE_DRIVE,
      id: `island-bicycle-${i + 1}`, label: 'island bicycle', kind: 'bicycle', verb: 'Ride',
      wheels: b.wheels, steer: b.steer, ignore: b.ignore,
      colliders, interactables,
    });
  });
}

/** Fit out one room. `bounds` gives the room's inner/outer faces and centre. */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, scene } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX  = b.xInner + f * 0.5;     // just inside the spine wall
  const outX = b.xOuter - f * 0.5;     // against the exterior wall

  switch(room.kind){
    case 'reception':
      // A counter you queue at, with a low accessible section.
      box(1.0, 1.05, 4.2, b.xInner + f * 2.4, 0.525, b.cz - 0.6, M.frame);
      hard(b.xInner + f * 2.4, b.cz, 1.2, 6.0, 1.1);
      break;

    case 'waiting':
      // Seats come from plan.seats so people and chairs cannot drift apart.
      // (Build them with kit.chair once engine/world/kit.js is wired in.)
      break;

    case 'workroom':
      // The mission destination. A working surface and somewhere to sit.
      box(0.62, 0.72, 1.75, b.cx + f * 0.6, 0.36, b.cz, M.frame);
      hard(b.cx + f * 0.6, b.cz, 0.8, 1.9, 0.8);
      break;

    case 'lab':
      box(0.58, 0.86, 3.4, outX, 0.43, b.cz - 1.0, M.frame);
      hard(outX, b.cz - 1.0, 0.7, 3.4, 0.95);
      break;

    case 'station':
      box(0.7, 1.15, 5.0, b.xInner + f * 1.1, 0.575, b.cz, M.frame);
      hard(b.xInner + f * 1.1, b.cz, 0.9, 5.1, 1.2);
      break;

    case 'supply':
    case 'quiet':
    default:
      break;
  }
}

/** Fit out the spine: parked equipment, wall furniture, floor wayfinding. */
export function fitOutSpine(ctx){
  const { plan, P, soft } = ctx;
  // Coloured routes let into the floor are the cheapest wayfinding there is.
  // Replace the colours and destinations for this theme.
  void plan; void P; void soft;
}
