// plan.js — the Fenwick Coordinating Centre, as data. Three floors of it.
//
// A spine with rooms down both sides is the shape the engine builds. This place
// is three of them, stacked, and the stack is the point: **the walk from the
// patient to the number is a climb.**
//
//   Level 0, at ground     the clinic and the stores. Screening, the infusion
//                          bay, the monitors' room, the lab, and the kit
//                          warehouse where the blind is four thousand identical
//                          boxes in numbered order.
//   Level 1, +4.2 m        the working floor. Data management, adjudication,
//                          statistics, regulatory. Nobody here knows an arm.
//   Level 2, +8.4 m        past the firewall. Randomisation, the unblinded
//                          statistician, the monitoring board room, the master
//                          file. The blinded/unblinded boundary is not a door
//                          in this building. It is a flight of stairs.
//
// **Why the levels are also offset along z.** `groundHeight(x, z)` is the
// engine's one source of truth for floor height and it takes no third argument,
// and collision boxes are tested in x and z with the player's own y ignored — so
// two rooms at the same (x, z) on different floors would share a floor height
// and each other's walls. Offsetting each level along the spine keeps every
// (x, z) belonging to exactly one floor, which means the height function, the
// colliders, the map, the waypoint and the day's travel budget all keep working
// unchanged. The building reads as a section: three storeys stepping back, with
// a stair well at each joint and a void to see down through.
//
//   z = -8 … 22    level 0, floor at y = 0
//   z = 22 … 28    the lower stair, rising 4.2 m
//   z = 28 … 54    level 1, floor at y = 4.2
//   z = 54 … 60    the upper stair, and the firewall gates at the top of it
//   z = 60 … 84    level 2, floor at y = 8.4
//
// Load-bearing rather than decorative:
//
//   · Every `group` below is a group id in content/groups.js. A group with no
//     room is a call the player cannot reach and only `worldParity` notices.
//   · The rooms with no group carry the place: goods in, the infusion bay, the
//     sample store, the randomisation office, the master file.
//   · `open: true` means no spine wall — the infusion bay is glazed to the
//     corridor and the data floor really is open to it. Nowhere else.
//   · `openEnds` on a level's own plan is what lets the shell continue into the
//     stair instead of ending in a wall. `engine/world/interiorSite.js` honours
//     it; `themes/the_trial/world.js` builds what is on the other side.

const METRICS = {
  // Wide enough for a records trolley to pass somebody, because that is what
  // goes up and down it all day.
  corridorHalfWidth: 2.0,
  roomDepth: 8.0,
  ceilingH: 3.0,
  tileH: 2.8,
  // Clinical, but an office building rather than a ward: warm grey vinyl,
  // off-white walls, and one blue that means wayfinding and nothing else.
  palette: {
    floorSpine: [204, 201, 194],
    floorRoom:  [196, 198, 197],
    wall:  '#e8e6e0',
    base:  '#4f565e',
    rail:  '#8b9199',
    frame: '#b4b8bb',
    door:  '#7d8891',
    signBand: '#1f4e6b',
  },
};

/** Floor-to-floor. Two flights of it, and the reason this is not one corridor. */
export const LEVEL_RISE = 4.2;

/**
 * The three floors. `y` is the floor height; `stair` is the z band above it,
 * which `world.js` fills with a flight of stairs and a void to look down.
 */
export const LEVELS = [
  {
    id: 0, y: 0, name: 'Clinic and stores',
    spine: { z0: -8, z1: 22 },
    stairUp: { z0: 22, z1: 28 },
    rooms: [
      { id: 'SCREEN', side: 'w', z0: -6, z1: 2, name: 'Screening & Consent', kind: 'reception' },
      { id: 'INFUSE', side: 'w', z0: 2, z1: 12, name: 'Infusion Bay', kind: 'waiting', open: true, door: 'wide' },
      { id: 'MONITOR', side: 'w', z0: 12, z1: 21, name: 'Monitors’ Room', kind: 'workroom', group: 'SITE', door: 'wide' },
      { id: 'GOODS', side: 'e', z0: -6, z1: 0, name: 'Goods In', kind: 'supply' },
      { id: 'LAB', side: 'e', z0: 0, z1: 8, name: 'Central Lab & Sample Store', kind: 'lab' },
      { id: 'KIT', side: 'e', z0: 8, z1: 21, name: 'Kit Warehouse & Cold Room', kind: 'supply', group: 'RAND', door: 'wide' },
    ],
  },
  {
    id: 1, y: LEVEL_RISE, name: 'The working floor',
    spine: { z0: 28, z1: 54 },
    stairUp: { z0: 54, z1: 60 },
    // The blinded/unblinded line, at the top of this flight and nowhere else.
    gate: true,
    rooms: [
      { id: 'DATA', side: 'w', z0: 29, z1: 39, name: 'Data Management Floor', kind: 'station', open: true },
      { id: 'STATS', side: 'w', z0: 39, z1: 50, name: 'Statistics & Analysis', kind: 'station', group: 'STAT', door: 'wide' },
      { id: 'TEA', side: 'w', z0: 50, z1: 53, name: 'Kitchen', kind: 'quiet' },
      { id: 'ADJUD', side: 'e', z0: 29, z1: 39, name: 'Adjudication Room', kind: 'quiet', group: 'ENDP' },
      { id: 'REG', side: 'e', z0: 39, z1: 49, name: 'Regulatory & Registry', kind: 'lab', group: 'REG', door: 'wide' },
      { id: 'FILES', side: 'e', z0: 49, z1: 53, name: 'Records Store', kind: 'supply' },
    ],
  },
  {
    id: 2, y: LEVEL_RISE * 2, name: 'Past the firewall',
    spine: { z0: 60, z1: 84 },
    stairUp: null,
    rooms: [
      { id: 'UNBLIND', side: 'w', z0: 61, z1: 69, name: 'Unblinded Statistics', kind: 'quiet' },
      { id: 'BOARD', side: 'w', z0: 69, z1: 81, name: 'Monitoring Board Room', kind: 'station', group: 'SAFE', door: 'wide' },
      { id: 'RANDOM', side: 'e', z0: 61, z1: 71, name: 'Randomisation Office', kind: 'workroom' },
      { id: 'ARCHIVE', side: 'e', z0: 71, z1: 81, name: 'Trial Master File', kind: 'supply' },
    ],
  },
];

/** Which floor a point is on, and how high that floor is. */
export function levelAt(z){
  for(let i = LEVELS.length - 1; i >= 0; i--){
    if(z >= LEVELS[i].spine.z0) return LEVELS[i];
  }
  return LEVELS[0];
}

/**
 * The floor height anywhere in the building — level, then stair, then level.
 * `world.js` exports this as `groundHeight`, and nothing else may hold a second
 * opinion about the floor.
 */
export function floorHeight(x, z){
  for(const L of LEVELS){
    if(z < L.spine.z1) return L.y;
    if(L.stairUp && z < L.stairUp.z1){
      const t = (z - L.stairUp.z0) / (L.stairUp.z1 - L.stairUp.z0);
      // Smooth rather than linear, so the top and bottom of the flight are not
      // two kinks the player walks over.
      return L.y + LEVEL_RISE * (t * t * (3 - 2 * t));
    }
  }
  return LEVELS[LEVELS.length - 1].y;
}

/**
 * One plan covering the whole building, which is what everything outside the
 * world module reads: the map, `worldParity`, `pieceDensity`, `shots`. The
 * builder itself is handed one level at a time.
 */
export const plan = {
  world: 'themes/the_trial/world.js',
  metrics: METRICS,
  // Read by engine/world/interiorLevels.js: the floors, and the floor-to-floor.
  rise: LEVEL_RISE,
  spine: { z0: LEVELS[0].spine.z0, z1: LEVELS[LEVELS.length - 1].spine.z1 },
  levels: LEVELS,
  rooms: LEVELS.flatMap(L => L.rooms.map(r => ({ ...r, level: L.id, floorY: L.y }))),

  /** Overhead wayfinding, read from both directions. */
  bladeSigns: [
    { z: 7.0, west: 'Infusion Bay', east: 'Central Lab' },
    { z: 21.5, west: 'Stairs — first floor', east: 'Kit Warehouse' },
    { z: 38.5, west: 'Statistics', east: 'Adjudication' },
    { z: 53.5, west: 'Stairs — unblinded floor', east: 'Badge required above' },
    { z: 70.0, west: 'Monitoring Board', east: 'Trial Master File' },
  ],

  /** Seating shared by the fit-out and the crowd, so nobody hovers over a chair. */
  seats: [
    // the infusion bay
    [-4.6, 3.6, Math.PI / 2], [-4.6, 5.4, Math.PI / 2], [-4.6, 7.2, Math.PI / 2],
    [-4.6, 9.0, Math.PI / 2], [-4.6, 10.8, Math.PI / 2],
    [-7.6, 4.4, -Math.PI / 2], [-7.6, 6.2, -Math.PI / 2],
    // the board table, two floors up
    [-5.0, 72.0, Math.PI / 2], [-5.0, 73.6, Math.PI / 2], [-5.0, 75.2, Math.PI / 2],
    [-8.0, 72.0, -Math.PI / 2], [-8.0, 73.6, -Math.PI / 2], [-8.0, 75.2, -Math.PI / 2],
  ],

  /** Where people stand, and where the working day sends them. */
  spots: {
    spine: [
      [-1.4, -4], [1.4, -1], [-1.4, 3], [1.4, 7], [-1.4, 11], [1.4, 15], [-1.4, 19],
      [1.4, 30], [-1.4, 34], [1.4, 38], [-1.4, 42], [1.4, 46], [-1.4, 50],
      [1.4, 63], [-1.4, 67], [1.4, 72], [-1.4, 77],
    ],
    open: [[-5.4, 5.4], [-6.8, 8.2], [-5.2, 31.0], [-6.6, 34.4], [-5.2, 36.0]],
  },
  anchors: {
    // The day starts on the working floor, which is the middle of everything.
    base:  [[-5.2, 31.0], [-6.6, 34.4], [1.4, 34], [-1.4, 38]],
    // The rooms people are actually in when they are working.
    work:  [[-1.4, 16], [1.4, 14], [-1.4, 44], [1.4, 44], [-1.4, 73]],
    // The clinic end, which is where the trial meets the people in it.
    front: [[-5.4, 5.4], [-1.4, 3], [1.4, -1], [-4.6, 10.8]],
  },
};

export default plan;
