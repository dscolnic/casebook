// site.js — the Ellery Variety Theatre, as data.
//
// This theme brings its own world (`world:` below) for the reason Mission
// Control does: the engine's interior builder makes a corridor with rooms off
// it, and a corridor with rooms off it is a hospital. A theatre is one enormous
// raked volume looking at a hole in a wall, with the working part of the
// building wrapped round a yard behind it — and the geometry *is* the course.
// AP Precalculus is four families of function, and here each one is a place you
// stand in: the pit is logarithms, the board is polar and matrix work, the fly
// floor is vectors, the house is the geometry of a room built in 1911.
//
// Looking at the house from the back of the stalls:
//
//                ╔═════ stage ══════╗                       z = -34
//                ║   ghost light    ║   fly tower over it
//        ╔═══════╬══ proscenium ════╬═══════╗                z = -19
//        ║  pit  ·  ORCHESTRA PIT & SOUND   ║                z = -15
//        ║        tier 0   seats            ║                z = -10
//        ║        tier 1   seats            ║                z =  -3
//        ║        tier 2   PRODUCTION DESK  ║                z =   4
//        ║        tier 3   LIGHTING BOARD   ║                z =  11
//        ╚══ pass doors ══ balcony over ════╝                z =  20
//
// Each tier is one step higher than the tier in front of it, so the whole rake
// looks down at the stage and the board at the back looks over everybody. The
// steps are the only vertical movement in any of these games.
//
// Behind the house, the working building: a ring corridor round the scene-dock
// yard, with six offices off it. Units are metres. +z runs up the rake, away
// from the stage; +x is house left.

/**
 * Where the work happens *in the house*. Three of the six areas of study are
 * the room itself, so they are a desk on the rake rather than a door: the pit
 * at the stage end, the production desk in the middle of the stalls with the
 * seats taken out around it, and the lighting board at the back.
 *
 * A position with no `group` is furniture and crew — a real position in a
 * working theatre that is not where the player's work is.
 *
 *   x      across the house, 0 is the centre aisle
 *   row    0 is nearest the stage; each row is one step up
 *   w      how wide the desk is
 */
export const POSITIONS = [
  { group: 'PIT',   name: 'Orchestra Pit and Sound', x: 0,  row: 0, w: 5.6, z: -15.4 },
  { group: 'HOUSE', name: 'The House',               x: 0,  row: 2, w: 6.4 },
  { group: 'BOARD', name: 'Lighting Board',          x: 0,  row: 3, w: 8.0 },
  // Not areas of study. The prompt desk runs the show and the followspot bench
  // is where two operators sit through every performance; neither is a call.
  { name: 'Prompt Desk',       x: -18.5, row: 0, w: 2.6, z: -14.0 },
  { name: 'Followspot Bench',  x:  18.5, row: 3, w: 3.0 },
];

/**
 * The offices round the yard, one door each off the ring.
 *
 * A theatre is not its auditorium. The box office faces the street, the shop
 * cuts timber, the flys are worked from a gallery with its own office at the
 * foot of it, and the wardrobe, the green room and the dock all want a door
 * onto the yard the scenery comes in through — which is what makes a working
 * day in this building a day that walks somewhere.
 *
 *   side   'w' or 'e', which side of the yard
 *   z0/z1  how far the office runs along the ring
 */
export const OFFICES = [
  { group: 'FRONT', name: 'Box Office',   side: 'w', z0: 26.5, z1: 35.0 },
  { group: 'SHOP',  name: 'Scene Shop',   side: 'w', z0: 35.5, z1: 44.5 },
  {                 name: 'Scene Dock',   side: 'w', z0: 45.0, z1: 53.5, id: 'DOCK' },
  { group: 'FLY',   name: 'Fly Floor',    side: 'e', z0: 26.5, z1: 35.0 },
  {                 name: 'Green Room',   side: 'e', z0: 35.5, z1: 44.5, id: 'GREEN' },
  {                 name: 'Wardrobe',     side: 'e', z0: 45.0, z1: 53.5, id: 'WARDROBE' },
];

/**
 * Where the four tiers are, in z. One declaration: the house envelope below
 * uses it as `rowZ`, the map footprints are built from it, and the world's
 * `groundHeight` staircase reads it from the envelope. Written twice, the map
 * and the floor disagree about where a desk is and only the map is wrong.
 */
const ROW_Z = [-10, -3, 4, 11];

/** The ring corridor's outer wall, and how deep the offices beyond it are. */
const RING_HW = 23, WING = 8;

export const rooms = [
  // The three positions on the rake, drawn at the size of the desk plus enough
  // z either side to carry a label. Without x0/x1 the map falls back to
  // "corridor with rooms either side", which is the building this is not.
  ...POSITIONS.filter(p => p.group).map(p => ({
    id: p.group,
    name: p.name,
    group: p.group,
    side: p.x < 0 ? 'w' : p.x > 0 ? 'e' : 'spine',
    x0: p.x - p.w / 2,
    x1: p.x + p.w / 2,
    z0: ROW_Z[p.row] - 1.6,
    z1: ROW_Z[p.row] + 2.0,
  })),
  // And the offices, at their real size.
  ...OFFICES.map(r => ({
    id: r.group ?? r.id,
    name: r.name,
    ...(r.group ? { group: r.group } : {}),
    side: r.side,
    x0: r.side === 'w' ? -(RING_HW + WING) : RING_HW,
    x1: r.side === 'w' ? -RING_HW : RING_HW + WING,
    z0: r.z0,
    z1: r.z1,
  })),
];

/**
 * The building, for the map only.
 *
 * The world is this theme's own module, so nothing else describes the place in
 * a form `engine/core/map.js` can draw. Rectangles in world metres.
 */
export const shapes = [
  { kind: 'floor', x0: -14, x1: 14, z0: -34, z1: -19, name: 'Stage' },
  { kind: 'wall',  x0: -RING_HW, x1: RING_HW, z0: -19.6, z1: -18.6, name: 'Proscenium' },
  { kind: 'floor', x0: -RING_HW, x1: RING_HW, z0: -19, z1: 20 },              // the house
  { kind: 'floor', x0: -RING_HW, x1: RING_HW, z0: 20, z1: 26 },               // south leg
  { kind: 'floor', x0: -RING_HW, x1: -17, z0: 26, z1: 54 },                   // west leg
  { kind: 'floor', x0: 17, x1: RING_HW, z0: 26, z1: 54 },                     // east leg
  { kind: 'floor', x0: -RING_HW, x1: RING_HW, z0: 54, z1: 60 },               // north leg
  { kind: 'court', x0: -17, x1: 17, z0: 26, z1: 54, name: 'Scene dock yard' },
  // The ways through, dashed: the pass doors at the back of the stalls, the way
  // through the proscenium onto the stage, the three openings onto the yard, and
  // one door per office.
  { kind: 'open', x0: -7.3, x1: 7.3, z0: -19.4, z1: -18.6 },
  { kind: 'open', x0: -2, x1: 2, z0: 19.6, z1: 20.4 },
  { kind: 'open', x0: -9, x1: -5, z0: 25.6, z1: 26.4 },
  { kind: 'open', x0: 5, x1: 9, z0: 25.6, z1: 26.4 },
  { kind: 'open', x0: -2, x1: 2, z0: 53.6, z1: 54.4 },
  ...OFFICES.map(r => ({
    kind: 'open',
    x0: r.side === 'w' ? -RING_HW - 0.4 : RING_HW - 0.4,
    x1: r.side === 'w' ? -RING_HW + 0.4 : RING_HW + 0.4,
    z0: (r.z0 + r.z1) / 2 - 0.9,
    z1: (r.z0 + r.z1) / 2 + 0.9,
  })),
];

export const site = {
  kind: 'interior',
  name: 'The Ellery Variety Theatre',

  // The theme's own world. vite.config.js points `@world` here instead of at
  // one of the engine's two builders. Mission Control and Deep Watch do the same.
  world: 'themes/ghostlight/world.js',

  // What the validator and the map read. The world reads `house`, `stage`,
  // `building`, `POSITIONS` and `OFFICES`.
  plan: { rooms, shapes },

  /** The auditorium envelope, in metres. */
  house: {
    halfWidth: 23,
    front: -19,          // the proscenium wall
    back: 20,            // the back wall, with the pass doors and the balcony over
    ceiling: 12.0,
    rowZ: ROW_Z,
    rowStep: 0.6,        // each tier is this much higher than the one in front
    // The 1911 opening, narrowed in 1958. Half-widths, so the wall either side
    // of it is one description and the sightline argument has a number in it.
    prosceniumHalf: 7.3,
    prosceniumH: 8.2,
    // The pit: in front of the proscenium, on the flat apron, behind a rail.
    pit: { z0: -17.2, z1: -13.6, half: 6.2 },
    // The balcony, over the back tiers. Scenery: there are no stairs to it, and
    // it is what the back of a variety house looks like from the stalls.
    balcony: { z0: 12, z1: 20, rise: 3.6 },
  },

  /**
   * The stage, and the tower over it.
   *
   * Behind the proscenium and 0.95 m up, which is the one place in this game
   * where the floor is somewhere the player looks at rather than walks on. The
   * tower is nearly twice the height of the auditorium ceiling, because a house
   * that flies its scenery needs somewhere to fly it to — and it is the reason
   * this building has a silhouette at all.
   */
  stage: {
    z0: -34, z1: -19,
    half: 14,
    floor: 0.95,
    tower: 18.0,
    grid: 14.5,          // the working grid the bars hang from
  },

  /**
   * The working building behind the house.
   *
   *        z = 60  ╔═══════════ north leg ═══════════╗
   *                ║        ┌─────────────┐          ║
   *                ║  west  │  DOCK YARD  │  east    ║
   *                ║  leg   └─────────────┘  leg     ║
   *        z = 20  ╠════════ south leg ══════════════╣
   *                ║          THE HOUSE              ║
   *        z = -19 ╚═════════ proscenium ════════════╝
   *
   * The corridor floor is level with the back of the stalls — the highest tier
   * — so the pass doors are step-free and `groundHeight` is a staircase only
   * inside the auditorium.
   */
  building: {
    halfWidth: RING_HW,   // the ring's outer wall, in line with the house
    wing: WING,           // how deep the offices beyond the ring are
    corridor: 6,          // how wide the ring is, all four legs
    southLeg: [20, 26],   // between the back wall of the stalls and the yard
    northLeg: [54, 60],
    courtyard: { x0: -17, x1: 17, z0: 26, z1: 54 },
    ceiling: 4.2,         // lower than the auditorium's 12, as a corridor is
    doorW: 4.0,           // the pass doors at the back of the stalls
    roomDoorW: 1.8,       // an office off the corridor
  },

  // On the centre aisle at the back of the stalls, under the balcony, looking
  // down the rake at the stage. Ten clear metres in every direction: a prop over
  // the spawn welds the player in place and the scene still renders perfectly.
  spawn: { x: 0, z: 16.8, yaw: 0 },
};

export default site;
