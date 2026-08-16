// plan.js — the Ashfell control tower, as data. Five floors of it, beside a fall.
//
// **This place exists to be looked out of.** The tower stands on the east
// abutment with its long side glazed from floor to head on every level, and
// forty metres away across the gorge the spillway comes over in a sheet a
// hundred metres tall. Every room on the glazed side has the fall in the window;
// the stair does too. When the gates open, the view is the lesson.
//
// The first version of this game was a stack of galleries buried inside the dam,
// on the same world module as The Trial — and it looked like The Trial, because
// **a game's silhouette comes from its world module** and a palette is not a
// silhouette. The fix is not a different corridor. It is a building with one
// wall made of glass and something enormous behind it.
//
//   Level 0, +0     the machine floor: turbines, switch room, the way in
//   Level 1, +5.4   the gallery portal — the tunnel into the wall starts here
//   Level 2, +10.8  operations: inflow, storage, the control room
//   Level 3, +16.2  the gate floor: hoists, and the spillway deck door
//   Level 4, +21.6  the lookout, level with the crest and the top of the fall
//
// **Why the levels step back along the spine as well as up.**
// `groundHeight(x, z)` takes no level argument and collision is tested in x and
// z with the player's y ignored, so two rooms at one (x, z) on different floors
// would share a floor height and each other's walls. Offsetting each level keeps
// every (x, z) on exactly one floor, and it is why the tower reads as stepping
// back into the hillside as it climbs — which is what a building on an abutment
// does anyway. `engine/world/interiorLevels.js` builds it.
//
// Load-bearing rather than decorative:
//
//   · `glazedSide: 'e'` is the whole point of the building. It makes the east
//     envelope a mullioned screen instead of a wall, so `props.decorate()` can
//     put the gorge, the fall and the plunge pool behind it.
//   · Nothing is placed on the east side but the glass. Rooms live on the west.
//   · Every `group` here exists in content/groups.js or its calls are
//     unreachable, and only `worldParity` notices.

const METRICS = {
  // A tower floor plate, not a hospital corridor: you walk along the glass with
  // the rooms on one hand, and the corridor is the viewing gallery.
  corridorHalfWidth: 2.6,
  roomDepth: 7.4,
  ceilingH: 3.2,
  tileH: 3.0,
  // Wet concrete, painted steel and a lot of grey daylight coming off the water.
  palette: {
    floorSpine: [178, 182, 180],
    floorRoom:  [168, 174, 172],
    wall:  '#d6dad6',
    base:  '#3f474b',
    rail:  '#79858a',
    frame: '#9aa4a6',
    door:  '#55636a',
    signBand: '#1d4a52',
  },
};

/** Floor to floor. Five of them, which is what makes this a tower. */
export const LEVEL_RISE = 5.4;

export const LEVELS = [
  {
    id: 0, y: 0, name: 'Machine floor',
    spine: { z0: -6, z1: 16 },
    stairUp: { z0: 16, z1: 21 },
    rooms: [
      { id: 'ARRIVE', side: 'w', z0: -4, z1: 2, name: 'Sign-in', kind: 'reception' },
      { id: 'POWER', side: 'w', z0: 2, z1: 13, name: 'Powerhouse', kind: 'workroom', group: 'POWER', door: 'wide' },
      { id: 'SWITCH', side: 'w', z0: 13, z1: 15, name: 'Switch Room', kind: 'supply' },
    ],
  },
  {
    id: 1, y: LEVEL_RISE, name: 'Gallery portal',
    spine: { z0: 21, z1: 42 },
    stairUp: { z0: 42, z1: 47 },
    rooms: [
      { id: 'STRUCT', side: 'w', z0: 22, z1: 33, name: 'Seepage & Uplift Bay', kind: 'lab', group: 'STRUCT', door: 'wide' },
      { id: 'CORE', side: 'w', z0: 33, z1: 38, name: 'Core Store', kind: 'supply' },
      { id: 'REST', side: 'w', z0: 38, z1: 41, name: 'Crew Room', kind: 'quiet' },
    ],
  },
  {
    id: 2, y: LEVEL_RISE * 2, name: 'Operations',
    spine: { z0: 47, z1: 72 },
    stairUp: { z0: 72, z1: 77 },
    rooms: [
      { id: 'INFLOW', side: 'w', z0: 48, z1: 59, name: 'Catchment & Inflow Desk', kind: 'station', group: 'INFLOW', door: 'wide' },
      { id: 'STORE', side: 'w', z0: 59, z1: 70, name: 'Storage & Level Board', kind: 'station', group: 'STORE', door: 'wide' },
    ],
  },
  {
    id: 3, y: LEVEL_RISE * 3, name: 'Gate floor',
    spine: { z0: 77, z1: 99 },
    stairUp: { z0: 99, z1: 104 },
    rooms: [
      { id: 'GATES', side: 'w', z0: 78, z1: 89, name: 'Gate House', kind: 'workroom', group: 'GATES', door: 'wide' },
      { id: 'SAFE', side: 'w', z0: 89, z1: 98, name: 'Downstream Warning Desk', kind: 'station', group: 'SAFE', door: 'wide' },
    ],
  },
  {
    id: 4, y: LEVEL_RISE * 4, name: 'The lookout',
    spine: { z0: 104, z1: 122 },
    stairUp: null,
    rooms: [
      { id: 'ARCHIVE', side: 'w', z0: 105, z1: 112, name: 'Records & Rating Curves', kind: 'supply' },
      { id: 'BRIEF', side: 'w', z0: 112, z1: 121, name: 'Briefing Room', kind: 'quiet' },
    ],
  },
];

export const plan = {
  world: 'themes/headwater/world.js',
  metrics: METRICS,
  rise: LEVEL_RISE,
  levels: LEVELS,
  // The east envelope is glass on every floor, and what is behind it is the
  // reason this building is shaped the way it is.
  glazedSide: 'e',
  // No tile grid over the corridor. A suspended ceiling stops half a metre
  // short of the glass and caps the view, which in a building whose whole point
  // is the window reads as a hallway with a lid on it. The rooms keep theirs;
  // the corridor is open to the deck above.
  ceiling: 'rooms',
  // And nothing over the open part either. The galleries are terraced decks
  // open to the sky — an open-air mall on the side of a gorge — so what is
  // above the corridor is the night, which `props.decorate()` builds.
  soffit: false,
  spine: { z0: LEVELS[0].spine.z0, z1: LEVELS[LEVELS.length - 1].spine.z1 },
  rooms: LEVELS.flatMap(L => L.rooms.map(r => ({ ...r, level: L.id, floorY: L.y }))),

  bladeSigns: [
    { z: 13.5, west: 'Machines', east: 'Stairs — gallery portal' },
    { z: 37.5, west: 'Core store', east: 'Stairs — operations' },
    { z: 70.0, west: 'Storage board', east: 'Stairs — gate floor' },
    { z: 97.0, west: 'Warning desk', east: 'Stairs — lookout' },
    { z: 118.0, west: 'Briefing room', east: 'Crest level' },
  ],

  seats: [
    // the briefing room, at the top, facing the glass
    [-5.0, 114.0, Math.PI / 2], [-5.0, 115.6, Math.PI / 2], [-5.0, 117.2, Math.PI / 2],
    [-8.0, 114.8, -Math.PI / 2], [-8.0, 116.4, -Math.PI / 2],
    // the crew room, four floors down
    [-5.2, 39.0, Math.PI / 2], [-5.2, 40.2, Math.PI / 2],
  ],

  spots: {
    // Along the glass, which is where people actually stand in this building.
    spine: [
      [1.6, -2], [-1.6, 4], [1.6, 9], [-1.6, 14],
      [1.6, 24], [-1.6, 29], [1.6, 35], [-1.6, 40],
      [1.6, 50], [-1.6, 56], [1.6, 62], [-1.6, 68],
      [1.6, 80], [-1.6, 86], [1.6, 92], [-1.6, 97],
      [1.6, 107], [-1.6, 113], [1.6, 119],
    ],
    open: [[1.9, 52], [1.9, 64], [1.9, 110], [1.9, 118]],
  },
  anchors: {
    base:  [[1.9, 52], [1.9, 64], [-1.6, 56], [1.6, 62]],
    work:  [[-1.6, 8], [-1.6, 27], [-1.6, 53], [-1.6, 83], [-1.6, 93]],
    front: [[1.6, -2], [-1.6, 4], [1.6, 9]],
  },
};

export default plan;
