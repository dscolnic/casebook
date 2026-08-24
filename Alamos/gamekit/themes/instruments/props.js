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
  vehicle, VEHICLE_DRIVE, scooter, scooterRack, clearSpot,
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
 * Meridian's two vehicles.
 *
 * This is the format bank rather than a shipped campaign, and it is still a
 * registered outdoor theme somebody can play — a bank whose site is missing what
 * every other site has is a bank that stops being a fair sample of one. The
 * pairing is the plainest one the kit offers: a truck for the far end of the
 * site and a scooter for the near buildings, which between them are the two
 * halves of every motor pool in this repo.
 */
function transport(scene, ctx){
  const { groundHeight, colliders, interactables, softColliders, blocked } = ctx;
  const y = (x, z) => groundHeight(x, z);
  const spawn = { x: 0, z: 36, r: 13 };

  const ts = clearSpot({ x: -18, z: 26 }, blocked, { pad: 3.4, avoid: [spawn] });
  const truck = vehicle(scene, ts.x, ts.z, y(ts.x, ts.z), { facing: 0, colour: 0x4a6b7a });
  driveable(scene, truck.group, {
    ...VEHICLE_DRIVE,
    id: 'meridian-truck', label: 'site truck', kind: 'truck',
    seat: { x: 0.52, y: 2.18, z: truck.cabZ },
    wheels: truck.wheels,
    colliders, interactables,
  });

  const rs = clearSpot({ x: 16, z: 26 }, blocked,
    { pad: 1.4, avoid: [spawn, { x: ts.x, z: ts.z, r: 5 }] });
  const rail = scooterRack(scene, rs.x, rs.z, y(rs.x, rs.z), { facing: 0, slots: 2 });
  if(rail.soft) softColliders.push(rail.soft);
  for(let i = 0; i < 2; i++){
    // Along the rack and 0.7 m out from the bar, which is where the rear wheel
    // sits. Parked on the bar itself the rail runs through the deck, and the
    // scooter starts inside a collider it can never get out of.
    const sx = rs.x + (i - 0.5) * 0.9;
    const sz = rs.z - 0.7;
    const sc = scooter(scene, sx, sz, y(sx, sz), { facing: 0, colour: i ? 0x1f7a6b : 0x2f7fa8 });
    driveable(scene, sc.group, {
      id: `meridian-scooter-${i + 1}`, label: 'site scooter', kind: 'scooter', verb: 'Ride',
      halfWidth: 0.34, halfLength: 0.7, height: 1.35, clearance: 0.22,
      seat: { x: 0, y: 1.62, z: 0.34 },
      steer: sc.steer, steerAxis: 'y', steerAmount: 0.5,
      wheels: sc.wheels, wheelRadius: 0.115,
      topSpeed: 9, sprint: 1.2,
      accel: 9, brake: 7, reverseAccel: 2.2, coastDrag: 1.9, driveDrag: 0.7,
      turn: 1.9, gripAt: 1.6, reverseFrac: 0.14, lean: 0.26,
      hint: 'W/S ride · A/D steer · Shift faster · E — step off',
      ignore: [rail.soft],
      colliders, interactables,
    });
  }
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
