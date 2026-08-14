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

import { furnishRoom, furnishCorridor, furnishingMaterials } from '../../engine/world/interiorKit.js';

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
  const { groundHeight } = ctx;
  void scene; void groundHeight;
}

/**
 * Fit out one room.
 *
 * The lab's own objects first — a dilution refrigerator is not a filing cabinet —
 * then the generic layer from `engine/world/interiorKit.js`, which is what stops a
 * room reading as a corridor with a door on it. `pieceDensity.mjs` had these
 * thirteen rooms at three pieces each while every other game's rooms held nine to
 * fifteen; the bar is fifteen and it is measured.
 *
 * `fittings` is passed explicitly rather than left to the kit's name matching,
 * because this building's rooms are specific: the store holds cryogen dewars and
 * the racks room holds microwave racks, and both would otherwise match on the word
 * "store" and "room".
 */
export function fitOutRoom(room, ctx){
  const { bounds: b, box, materials: M, soft, hard, opening } = ctx;
  const f = b.sign;                    // +1 for east rooms, -1 for west
  const inX  = b.xInner + f * 0.5;     // just inside the spine wall

  // What each room of *this* building has in it, in its own words.
  const FITTINGS = {
    ARRIVE: ['monitorBank', 'toolBoard'],
    OFFICE: ['whiteboard', 'monitorBank', 'toolBoard'],
    FAB:    ['sampleStore', 'gasCylinder', 'toolBoard', 'rack'],
    CRYO:   ['dewar', 'gasCylinder', 'pumpSet', 'toolBoard'],
    QUIET:  ['whiteboard', 'monitorBank'],
    SENSE:  ['rack', 'dewar', 'monitorBank', 'toolBoard'],
    STORE:  ['dewar', 'gasCylinder', 'barrel', 'cableDrum'],
    CTRL:   ['monitorBank', 'rack', 'rack', 'whiteboard'],
    RACKS:  ['rack', 'rack', 'rack', 'cableDrum'],
    VER:    ['monitorBank', 'whiteboard', 'rack', 'toolBoard'],
    DESK:   ['monitorBank', 'monitorBank', 'whiteboard'],
    NET:    ['rack', 'rack', 'cableDrum', 'monitorBank'],
    SHIELD: ['rack', 'monitorBank', 'toolBoard'],
  };
  const KIND = {
    ARRIVE: 'reception', OFFICE: 'office', FAB: 'lab', CRYO: 'workroom',
    QUIET: 'quiet', SENSE: 'lab', STORE: 'supply', CTRL: 'station',
    RACKS: 'supply', VER: 'lab', DESK: 'station', NET: 'workroom', SHIELD: 'quiet',
  };

  // The one thing that is this room and nothing else, kept from the original
  // fit-out and placed before the kit fills in around it.
  switch(room.kind){
    case 'reception':
      // A counter you queue at, with a low accessible section.
      box(1.0, 1.05, 4.2, inX + f * 1.9, 0.525, b.cz - 0.6, M.frame);
      hard(inX + f * 1.9, b.cz - 0.6, 1.2, 4.4, 1.1);
      break;
    case 'workroom':
    case 'lab':
    case 'station':
      // A working surface against the spine wall, which is where the room's own
      // instrument screen and case stand go.
      box(0.62, 0.9, 3.0, inX + f * 0.9, 0.45, b.cz, M.frame);
      hard(inX + f * 0.9, b.cz, 0.8, 3.2, 0.95);
      break;
    default:
      break;
  }

  furnishRoom({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    // Inside the room, off the spine wall by enough that nothing lands in the
    // doorway and nothing blocks the working surface above.
    bounds: {
      x0: b.xInner + f * 2.0, x1: b.xOuter - f * 0.55,
      z0: room.z0 + 0.7, z1: room.z1 - 0.7,
    },
    kind: KIND[room.id] ?? room.kind ?? 'lab',
    roomName: room.name ?? room.id,
    fittings: FITTINGS[room.id],
    seed: `quantum-${room.id}`,
    hard, soft,
    keepClear: [
      // The way in stays a way in.
      ...(opening ? [{ x: b.xInner + f * 1.2, z: opening.cz ?? b.cz, r: 2.2 }] : []),
      // And the case stand: the engine puts one at the far end of every group
      // room, and furniture standing on it is a question nobody can reach.
      ...(room.group ? [{ x: b.xOuter - f * 1.5, z: b.cz, r: 2.4 }] : []),
    ],
    target: 17,
  });
}

/**
 * Fit out the spine.
 *
 * A corridor with nothing in it is a corridor nobody works in, and this one is
 * sixty-six metres long. What goes in it is what accumulates in a working
 * building: the cable tray that carries every line in the place, a trolley of
 * helium somebody left, the notice board, the fire points. Nothing stands in the
 * middle — the corridor is how the player gets everywhere.
 */
export function fitOutSpine(ctx){
  const { plan, P, box, materials: M, hard } = ctx;
  const sp = plan.spine ?? { z0: -8, z1: 58 };
  furnishCorridor({
    box: (w, h, d, x, y, z, material, ry = 0) => box(w, h, d, x, y, z, material, ry),
    mats: furnishingMaterials({ surface: M.frame, metal: M.rail, dark: M.base, pale: M.wall }),
    halfWidth: P.corridorHalfWidth,
    z0: sp.z0, z1: sp.z1,
    seed: 'quantum-spine',
    every: 5,
    hard,
    // Every doorway on both sides: a fire extinguisher across a door is a joke.
    keepClear: (plan.rooms ?? []).map(r => ({ z: (r.z0 + r.z1) / 2, r: 2.4 })),
  });
}
