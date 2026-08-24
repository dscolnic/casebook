// plan.js — floors two to five of Marrable House, as data.
//
// A BANK IN ITS OWN BUILDING, WHICH IS WHY THE TOWER EARNS ITS KEEP. The trouble
// with putting a bank run in a place is that everything in the subject is
// arithmetic done in a room: a balance sheet, a maturity mismatch, a fire-sale
// price. Stack the rooms and one of them stops being arithmetic — **the queue is
// out of the window**. The counter floor is level with the top of it. The crisis
// desk is three floors up and can see how far down Marrable Street it now goes,
// which is the only number in this game nobody has to be told.
//
// Walking *up* the building walks the argument the course teaches:
//
//   Floor 2   the counter — deposits, and the people asking for them
//   Floor 3   the loan book — what the money was turned into, and for how long
//   Floor 4   the reserve floor — the cash there actually is, and what a sale raises
//   Floor 5   the crisis desk — where somebody decides which problem this is
//
// The lift is what makes that a decision rather than a corridor — see
// `engine/world/interiorTower.js` and `engine/core/lift.js`.
//
// Load-bearing rather than decorative:
//
//   · `world:` points at the tower module, spelled out as a literal below. The
//     floors are stacked on ONE footprint, which `interiorFloor.js` cannot do.
//   · `glazedSide: 'w'` and no glazed ends. A 1933 stone bank has punched windows
//     on the street front and solid party walls, not a curtain wall — and
//     everything glazed has to have something built outside it, or the tower is
//     four trays of furniture stacked in mid-air. `props.decorate()` builds
//     Marrable Street, the block opposite, the city out to two kilometres, and
//     the queue.
//   · The lift band on the west side is the same z on every floor, because it is
//     one shaft. Move it on one floor and the car opens into a wall on the others.
//
// Units are metres. +z runs along the corridor, +x is east, y is up the building.

const METRICS = {
  // A commercial floor plate: an 18 m × 24 m plate with a corridor down the
  // middle and rooms to the wall on both sides.
  corridorHalfWidth: 2.3,
  roomDepth: 7.0,
  ceilingH: 3.2,
  tileH: 2.95,
  // A bank of the period: dark panelling to shoulder height, cream distemper
  // above it, a green-black composition floor, brass and heavy oak. Every one of
  // these is darker than it looks on a swatch, which is house rule 6 indoors.
  palette: {
    floorSpine: [62, 56, 48],
    floorRoom:  [58, 54, 50],
    wall:  '#cdc4ac',
    base:  '#33291f',
    rail:  '#6b573a',
    frame: '#8a7a5a',
    door:  '#3d2c19',
    signBand: '#2b3d47',
  },
};

/** Floor to floor. Four of them, which is what makes this a tower. */
export const RISE = 4.6;

/** The shaft. The same z band on every floor, because it is one shaft. */
const LIFT = { side: 'w', z0: 0.6, z1: 5.0 };

// The plate, north to south. The corridor runs between them; the west rooms face
// Marrable Street and the east rooms face the light well.
const Z0 = -11, Z1 = 13;

export const FLOORS = [
  {
    id: 0, label: '2', name: 'Counter floor',
    rooms: [
      { id: 'COUNTER', side: 'w', z0: Z0,  z1: 0.6, name: 'Banking Hall',    kind: 'station',  group: 'COUNTER', door: 'wide' },
      { id: 'TELLER',  side: 'w', z0: 5.0, z1: Z1,  name: "Tellers' Room",   kind: 'quiet' },
      { id: 'LEDGERS', side: 'e', z0: Z0,  z1: 1.2, name: 'Deposit Ledgers', kind: 'workroom' },
      { id: 'POST',    side: 'e', z0: 1.2, z1: Z1,  name: 'Post Room',       kind: 'supply' },
    ],
    seats: [[-6.0, 8.0, Math.PI / 2], [-6.0, 9.6, Math.PI / 2], [-8.6, 8.8, -Math.PI / 2]],
    spots: { spine: [[-1.3, -8], [1.3, -3], [-1.3, 3], [1.3, 8], [-1.3, 12]], open: [[5.2, 6.0], [-5.2, 10.0]] },
  },
  {
    id: 1, label: '3', name: 'Loan book floor',
    rooms: [
      { id: 'LOANS',   side: 'w', z0: Z0,  z1: 0.6, name: 'Loan Book Room',  kind: 'lab',      group: 'LOANS', door: 'wide' },
      { id: 'SEC',     side: 'w', z0: 5.0, z1: Z1,  name: 'Securities Room', kind: 'workroom' },
      { id: 'CREDIT',  side: 'e', z0: Z0,  z1: 1.2, name: 'Credit Files',    kind: 'supply' },
      { id: 'VALUERS', side: 'e', z0: 1.2, z1: Z1,  name: "Valuers' Room",   kind: 'workroom' },
    ],
    seats: [[-6.0, 9.0, Math.PI / 2], [-8.4, 9.0, -Math.PI / 2]],
    spots: { spine: [[1.3, -7], [-1.3, -2], [1.3, 4], [-1.3, 9], [1.3, 12]], open: [[5.6, 5.0], [-5.6, 11.0]] },
  },
  {
    id: 2, label: '4', name: 'Reserve floor',
    rooms: [
      { id: 'VAULT',   side: 'w', z0: Z0,  z1: 0.6, name: 'Reserve Room',   kind: 'station',  group: 'VAULT', door: 'wide' },
      { id: 'COUNT',   side: 'w', z0: 5.0, z1: Z1,  name: 'Counting Room',  kind: 'workroom' },
      { id: 'DEALING', side: 'e', z0: Z0,  z1: 1.2, name: 'Dealing Room',   kind: 'lab' },
      { id: 'STRONG',  side: 'e', z0: 1.2, z1: Z1,  name: 'Strongroom',     kind: 'supply' },
    ],
    seats: [[6.4, 7.4, -Math.PI / 2], [6.4, 9.0, -Math.PI / 2], [9.0, 8.2, Math.PI / 2]],
    spots: { spine: [[-1.3, -8], [1.3, -2], [-1.3, 5], [1.3, 9], [-1.3, 12]], open: [[-5.6, 9.0], [5.8, 4.0]] },
  },
  {
    id: 3, label: '5', name: 'Crisis desk',
    rooms: [
      { id: 'CRISIS',  side: 'w', z0: Z0,  z1: 0.6, name: 'Crisis Desk',    kind: 'station',  group: 'CRISIS', door: 'wide' },
      { id: 'CHAIR',   side: 'w', z0: 5.0, z1: Z1,  name: "Chairman's Room", kind: 'quiet' },
      // Open to the corridor: the one room on the four floors with nothing
      // between the door and the window, which is where people stand when they
      // want to see how far down the street the queue has got.
      { id: 'WIRE',    side: 'e', z0: Z0,  z1: 1.2, name: 'Wire Room',      kind: 'reception', open: true },
      { id: 'PRESS',   side: 'e', z0: 1.2, z1: Z1,  name: 'Press Room',     kind: 'quiet' },
    ],
    seats: [[-6.0, 8.4, Math.PI / 2], [-6.0, 10.0, Math.PI / 2], [-8.6, 9.2, -Math.PI / 2]],
    spots: { spine: [[1.3, -8], [-1.3, -3], [1.3, 3], [-1.3, 8], [1.3, 12]], open: [[5.8, 6.0], [5.8, 10.0]] },
  },
];

export const plan = {
  // **The literal has to be here, spelled out.** `vite.config.js` resolves a
  // theme's own world by running a regular expression over this file as *text* —
  // it never imports it, because it has to answer before the build exists.
  // Naming a constant matches nothing, and the failure is silent: the theme falls
  // back to the one-floor builder, which flattens sixteen rooms onto one
  // footprint with every partition coincident with three others and no lift.
  world: 'themes/qd_bankrun/world.js',
  metrics: METRICS,
  rise: RISE,
  floors: FLOORS,
  lift: LIFT,
  spine: { z0: Z0, z1: Z1 },
  // Windows on the street front only. A 1933 stone bank has punched windows and
  // solid party walls, and every glazed face has to have something built outside
  // it — see `props.decorate()`.
  glazedSide: 'w',
  glazedEnds: false,
  // A suspended ceiling on every floor: there is another floor plate 4.6 m up,
  // and what is over the corridor of floor 2 is the underside of floor 3.
  ceiling: true,

  // Every floor's rooms, flattened and stamped, which is what the checkers read
  // — `worldParity` asks whether each mission group has somewhere to happen, and
  // handing it one floor would report the other three floors' rooms as missing.
  rooms: FLOORS.flatMap(f => f.rooms.map(r => ({ ...r, level: f.id, floorY: f.id * RISE }))),
  halfWidth: METRICS.corridorHalfWidth + METRICS.roomDepth,

  /**
   * The lift, on the map, on every floor — because it is the same shaft on every
   * floor and because it is the one thing a player has to find before anything
   * else on these four floors is reachable.
   */
  shapes: [
    { kind: 'wall', name: 'Lift',
      x0: -(METRICS.corridorHalfWidth + METRICS.roomDepth), x1: -METRICS.corridorHalfWidth,
      z0: LIFT.z0, z1: LIFT.z1 },
  ],

  /** Overhead wayfinding, hung in the corridor, read from both directions. */
  bladeSigns: [
    { z: LIFT.z1 + 1.4, west: 'Lift · floors 2–5', east: 'Post room' },
    { z: Z0 + 3.0, west: 'Banking hall', east: 'Deposit ledgers' },
  ],
  spots: FLOORS[0].spots,
  seats: [],
};

export default plan;
