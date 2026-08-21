// plan.js — the top four floors of Kesteven House, as data.
//
// A CURRENCY BOARD IN A BORROWED TOWER, WHICH IS WHY THE COURSE FITS. AP
// Macroeconomics is a set of national quantities and a set of levers on them,
// and the problem with putting either in a building is that nothing in the
// subject is visible: an index, a money supply and a multiplier are all
// arithmetic done in a room. A changeover makes them local for a fortnight —
// and forty-five floors up, it makes them *visible*. The queue for the counter
// is on the plaza directly below. Vend Street, whose prices are two thirds of
// the basket, runs west from the foot of the building. The port the trade
// figures come off is on the horizon, and so is the weather coming in over it.
//
// **The window is the aggregate.** That is the whole argument for this place:
// every quantity the course asks about has something out of the glass that it is
// a number for, and the player can look at both at once.
//
// The board took the top four floors in nine days, because they were the only
// vacant plate in Halvern big enough for four hundred people — empty since
// Ambrose Life folded in the spring, with the lift engineers' notices still on
// the wall. Nobody chose a tower. What a tower gives is the one thing the old
// stone bank on Ferrand Row could not: the counter, the statisticians, the wires
// and the board in one building, four minutes apart.
//
//   Floor 45   the counter floor — households, and the notes coming back
//   Floor 46   the measurement floor — the basket, the index, the ledgers
//   Floor 47   the wire floor — the open economy, one telex at a time
//   Floor 48   the board floor — where the rate is set, glass on four sides
//
// Walking *up* the building walks the causal chain the course teaches:
// households, then prices, then banks, then the outside world, then policy. The
// lift is what makes that a decision rather than a corridor — see
// `engine/world/interiorTower.js` and `engine/core/lift.js`.
//
// Load-bearing rather than decorative:
//
//   · `world:` points at the tower module. The floors are stacked on ONE
//     footprint, which `interiorLevels.js` cannot do, and the reason it cannot
//     is written at the top of both files.
//   · `glazedSide: 'all'` with `glazedEnds: true` is the point of the building:
//     curtain wall on four faces, so every room and both ends of the corridor
//     look out. `props.decorate()` builds what is out there.
//   · The lift band on the west side is the same z on every floor, because it is
//     a shaft. Move it on one floor and the car opens into a wall on the others.
//   · Every `group` here exists in content/groups.js or its calls are
//     unreachable, and only `worldParity` notices.
//
// Units are metres. +z runs along the corridor, +x is east, y is up the building.

const METRICS = {
  // A tower floor plate, not a hospital corridor: a 21 m × 26 m plate with a
  // corridor down the middle and rooms to the glass on both sides.
  corridorHalfWidth: 2.6,
  roomDepth: 8.0,
  ceilingH: 3.0,
  tileH: 2.75,
  // Late-fifties commercial: cream plaster, bottle-green dado, anodised steel
  // and a brown cork floor that was laid for an insurance company.
  palette: {
    floorSpine: [150, 132, 112],
    floorRoom:  [176, 160, 138],
    wall:  '#e6e2d4',
    base:  '#2f4a3c',
    rail:  '#8d8676',
    frame: '#9aa0a2',
    door:  '#5b4a33',
    signBand: '#1f3d52',
  },
};

/** Floor to floor. Four of them, which is what makes this a tower. */
export const RISE = 4.4;

/** The shaft. The same z band on every floor, because it is one shaft. */
const LIFT = { side: 'w', z0: 0.4, z1: 4.8 };

// The plate, north to south. Rooms run to the glass on both sides; the corridor
// is glazed at both ends, so the walk down it is a walk between two views.
const Z0 = -12, Z1 = 14;

export const FLOORS = [
  {
    id: 0, label: '45', name: 'Counter floor',
    rooms: [
      { id: 'COUNTER', side: 'w', z0: Z0,  z1: 0.4, name: 'Counter Room',    kind: 'station',  group: 'COUNTER', door: 'wide' },
      { id: 'CASHIER', side: 'w', z0: 4.8, z1: Z1,  name: "Cashiers' Room",  kind: 'quiet' },
      { id: 'NOTES',   side: 'e', z0: Z0,  z1: 1.0, name: 'Note Room',       kind: 'workroom', group: 'NOTES', door: 'wide' },
      { id: 'STRONG',  side: 'e', z0: 1.0, z1: Z1,  name: 'Strongroom',      kind: 'supply' },
    ],
    seats: [[-6.4, 8.0, Math.PI / 2], [-6.4, 9.6, Math.PI / 2], [-9.2, 8.8, -Math.PI / 2]],
    spots: { spine: [[-1.4, -9], [1.4, -4], [-1.4, 2], [1.4, 7], [-1.4, 12]], open: [[5.6, 6.0], [-5.6, 10.0]] },
  },
  {
    id: 1, label: '46', name: 'Measurement floor',
    rooms: [
      { id: 'PRICES',  side: 'w', z0: Z0,  z1: 0.4, name: 'Price Room',      kind: 'lab',      group: 'PRICES', door: 'wide' },
      { id: 'CALC',    side: 'w', z0: 4.8, z1: Z1,  name: 'Calculating Room', kind: 'workroom' },
      { id: 'BANKS',   side: 'e', z0: Z0,  z1: 1.0, name: 'Ledger Hall',     kind: 'station',  group: 'BANKS', door: 'wide' },
      { id: 'RETURNS', side: 'e', z0: 1.0, z1: Z1,  name: 'Returns Room',    kind: 'workroom' },
    ],
    seats: [[-6.2, 9.0, Math.PI / 2], [-8.8, 9.0, -Math.PI / 2]],
    spots: { spine: [[1.4, -8], [-1.4, -3], [1.4, 3], [-1.4, 8], [1.4, 12]], open: [[6.0, 5.0], [-6.0, 11.0]] },
  },
  {
    id: 2, label: '47', name: 'Wire floor',
    rooms: [
      { id: 'TRADE',   side: 'w', z0: Z0,  z1: 0.4, name: 'Wire Room',       kind: 'lab',      group: 'TRADE', door: 'wide' },
      { id: 'TELEX',   side: 'w', z0: 4.8, z1: Z1,  name: 'Telex Room',      kind: 'lab' },
      { id: 'PORT',    side: 'e', z0: Z0,  z1: 1.0, name: 'Port Desk',       kind: 'station' },
      { id: 'PRESS',   side: 'e', z0: 1.0, z1: Z1,  name: 'Press Room',      kind: 'quiet' },
    ],
    seats: [[7.0, 7.4, -Math.PI / 2], [7.0, 9.0, -Math.PI / 2], [9.8, 8.2, Math.PI / 2]],
    spots: { spine: [[-1.4, -9], [1.4, -3], [-1.4, 4], [1.4, 9], [-1.4, 13]], open: [[-6.0, 9.0], [6.4, 4.0]] },
  },
  {
    id: 3, label: '48', name: 'Board floor',
    rooms: [
      { id: 'RATE',    side: 'w', z0: Z0,  z1: 0.4, name: 'Rate Room',       kind: 'station',  group: 'RATE', door: 'wide' },
      { id: 'CHAIR',   side: 'w', z0: 4.8, z1: Z1,  name: "Chair's Office",  kind: 'quiet' },
      { id: 'DEALING', side: 'e', z0: Z0,  z1: 1.0, name: 'Dealing Desk',    kind: 'workroom' },
      // Open to the corridor: the one room on the four floors with nothing
      // between the door and the glass, which is where people stand when a
      // number they have been arguing about all morning finally lands.
      { id: 'LOOKOUT', side: 'e', z0: 1.0, z1: Z1,  name: 'Observation Room', kind: 'reception', open: true },
    ],
    seats: [[-6.4, 8.4, Math.PI / 2], [-6.4, 10.0, Math.PI / 2], [-9.2, 9.2, -Math.PI / 2]],
    spots: { spine: [[1.4, -9], [-1.4, -4], [1.4, 2], [-1.4, 7], [1.4, 12]], open: [[6.4, 6.0], [6.4, 10.0]] },
  },
];

export const plan = {
  // **The literal has to be here, spelled out.** `vite.config.js` resolves a
  // theme's own world by running `/\bworld:\s*'(themes\/[^']+)'/` over this file
  // as *text* — it never imports it, because it has to answer before the build
  // exists. Naming a constant here and putting the string on a `const` line above
  // matches nothing, and what happens then is not an error: the theme falls back to
  // `kind: 'interior'`, which is `interiorFloor.js`, which builds `plan.rooms` —
  // all four floors, flattened — as one flat plan. Sixteen rooms on four
  // footprints, every partition and every notice coincident with three others,
  // and no lift, because the one-floor builder does not know about one. It
  // rendered, and it looked like a glitching corridor with no way up.
  world: 'themes/changeover/world.js',
  metrics: METRICS,
  rise: RISE,
  floors: FLOORS,
  lift: LIFT,
  spine: { z0: Z0, z1: Z1 },
  // Curtain wall on four faces. Both together, or the corridor ends in a lit
  // rectangle painted on plaster while the rooms either side look out.
  glazedSide: 'all',
  glazedEnds: true,
  // A suspended ceiling on every floor: there is another floor plate 4.4 m up,
  // and what is over the corridor of floor 45 is the underside of floor 46.
  ceiling: true,

  // Every floor's rooms, flattened and stamped, which is what the checkers read
  // — `worldParity` asks whether each mission group has somewhere to happen, and
  // handing it one floor would report the other three floors' rooms as missing.
  // The map filters this by floor at draw time instead: see `planRooms` in
  // engine/core/map.js.
  rooms: FLOORS.flatMap(f => f.rooms.map(r => ({ ...r, level: f.id, floorY: f.id * RISE }))),
  // Half the plate, for the map's own extent.
  halfWidth: METRICS.corridorHalfWidth + METRICS.roomDepth,

  /**
   * The lift, on the map, on every floor — because it is the same shaft on every
   * floor and because it is the one thing a player has to find before anything
   * else on these four floors is reachable. `shapes` is drawn under the rooms.
   */
  shapes: [
    { kind: 'wall', name: 'Lift',
      x0: -(METRICS.corridorHalfWidth + METRICS.roomDepth), x1: -METRICS.corridorHalfWidth,
      z0: LIFT.z0, z1: LIFT.z1 },
  ],

  /** Overhead wayfinding, hung in the corridor, read from both directions. */
  bladeSigns: [
    // `west` and `east` are what is on each side of the corridor at that point,
    // and the sign puts them on the correct hand for whichever way you are
    // walking. The first one is the whole reason a player can find the lift.
    { z: LIFT.z1 + 1.4, west: 'Lift · floors 45–48', east: 'Strongroom' },
    { z: Z0 + 3.2, west: 'Counter room', east: 'Note room' },
  ],
  // Fallback for anything that asks the plan rather than a floor.
  spots: FLOORS[0].spots,
  seats: [],
};

export default plan;
