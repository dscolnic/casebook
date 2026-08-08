// props.js — the objects unique to this theme.
//
// Anything generic (chairs, counters, carts, bins, screens, shelving, plants)
// should come from engine/world/kit.js; this file is only for the ten or so
// things that make *this* place recognisable.
//
// Both hooks receive the builder context from engine/world/interiorSite.js:
//   { scene, plan, geo, P, box, wall, materials, soft, hard, addInteractable }

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
