// site.js — Mission Control, as data.
//
// This theme brings its own world (`world: …` below), because the shape of a
// control centre is the one thing that makes this game not look like the
// others. The engine's interior builder makes a corridor with rooms off it,
// which is a hospital; a control room is a single large volume with the floor
// stepped down toward a wall of displays, and the teams are *rows*, not rooms.
//
// Looking at the room from the back doors:
//
//        ╔══════════════ PLOT BOARDS ══════════════╗   z = -19
//        ║  row 1   NAV        THERM              ║   z = -10
//        ║  row 2   ELEC       COMMS              ║   z =  -3
//        ║  row 3   STRUCT                        ║   z =   4
//        ║  row 4   INTEG · flight director       ║   z =  11
//        ╚══ back doors ═══ gallery above ════════╝   z =  20
//
// Each row sits one step higher than the row in front of it, so the whole floor
// looks down at the boards and the flight director looks down at everyone. The
// steps are the only vertical movement in any of these games.

/**
 * The console clusters. `group` ties one to an area of study, and the world
 * builds a stop out of it — the desk is what the player walks to, and pressing
 * E there opens the back room behind it.
 *
 *   x      across the room, 0 is the centre aisle
 *   row    0 is nearest the boards; each row is one step up
 *   w      how wide the desk is
 */
export const CONSOLES = [
  // Which two areas sit on the floor is not arbitrary, and the first attempt got
  // it backwards: Guidance and Integration are the two areas the book gives the
  // most lessons to — 39 of the campaign's 56 calls between them — so leaving both
  // in here left the wings with 30% of the work and three shifts that never went
  // through the door. Integration IS this room, and CAPCOM is a console position
  // by definition; guidance keeps its computer, and its computer fills a room.
  { group: 'COMMS', name: 'Capsule Communications', x: -11, row: 0, w: 8.5 },
  { group: 'INTEG', name: 'Flight Director',        x:   0, row: 3, w: 11 },
  // The rest of the floor. These are real Apollo-era console positions and none of
  // them is an area of study: they are manned, they are lit, and they are not
  // where the player's work is. Six areas of study all sitting in this one room is
  // what made the whole shift happen in one room — four of them work in the
  // building now (WORKROOMS below), and the floor keeps its rows.
  { name: 'Retrofire',      x:  11, row: 0, w: 8.5 },
  { name: 'Booster',        x: -11, row: 1, w: 8.5 },
  { name: 'Procedures',     x:  11, row: 1, w: 8.5 },
  { name: 'Public Affairs', x: -11, row: 2, w: 8.5 },
];

/**
 * The four areas that work outside the control room, one room each off the ring.
 *
 * A control centre is not one room. Life support runs a lab, power has a bay with
 * the spare hardware in it, comms sits with the antennas, and structures has a
 * test floor — and a shift that never leaves the console floor is a shift that
 * never walks anywhere, which is half of what these games are.
 *
 *   side   'w' or 'e', which wing the room is in
 *   z0/z1  how far the room runs along the building
 */
export const WORKROOMS = [
  { group: 'NAV',    name: 'Guidance Computer Room', side: 'w', z0: 20, z1: 40 },
  { group: 'ELEC',   name: 'Power & Circuits Bay',   side: 'w', z0: 40, z1: 60 },
  { group: 'THERM',  name: 'Life Support Lab',       side: 'e', z0: 20, z1: 40 },
  { group: 'STRUCT', name: 'Structures Test Bay',    side: 'e', z0: 40, z1: 60 },
];

/** What the wall of boards at the front of the room is showing. */
export const BOARDS = [
  { label: 'TRAJECTORY',  x: -13.5, w: 11, h: 5.2 },
  { label: 'GROUND TRACK', x:  0,   w: 13, h: 5.8 },
  { label: 'SYSTEMS',     x:  13.5, w: 11, h: 5.2 },
];

/**
 * The consoles as "rooms".
 *
 * The world builder below does not read this — it builds desks on tiers from
 * `CONSOLES` directly. The validator and the map do, and they need to see that
 * every area of study has somewhere to happen. Deep Watch does the same with
 * its compartments: a theme that brings its own world still owes the checks a
 * description of where its areas are.
 */
/**
 * Where the four rows are, in z. One declaration: the room envelope below uses it
 * as `rowZ`, the map footprints above are built from it, and the world's
 * `groundHeight` staircase reads it from the envelope. Written twice, the map and
 * the floor disagree about where a console is and only the map is wrong.
 */
const ROW_Z = [-10, -3, 4, 11];

/** The corridor ring's outer wall, and how deep the rooms beyond it are. */
const RING_HW = 23, WING = 8;

export const rooms = [...CONSOLES.filter(c => c.group).map(c => ({
  id: c.group,
  name: c.name,
  group: c.group,
  side: c.x < 0 ? 'w' : c.x > 0 ? 'e' : 'spine',
  // The map draws these where they are, now that it accepts a footprint: the
  // desk's own width, and a metre and a half either side of it in z so the
  // rectangle is big enough to carry a label. Without x0/x1 the map falls back to
  // "corridor with rooms either side", which is a hospital and not this.
  x0: c.x - c.w / 2,
  x1: c.x + c.w / 2,
  z0: ROW_Z[c.row] - 1.6,
  z1: ROW_Z[c.row] + 2.0,
})),
// And the four rooms in the wings, at their real size.
...WORKROOMS.map(r => ({
  id: r.group,
  name: r.name,
  group: r.group,
  side: r.side,
  x0: r.side === 'w' ? -(RING_HW + WING) : RING_HW,
  x1: r.side === 'w' ? -RING_HW : RING_HW + WING,
  z0: r.z0,
  z1: r.z1,
}))];

/**
 * The building, for the map only.
 *
 * The world is this theme's own module, so nothing else describes the place in a
 * form `engine/core/map.js` can draw — and after the courtyard went in, the map
 * showed six consoles floating in an empty rectangle with no building round them.
 * Rectangles in world metres, drawn under the consoles.
 */
export const shapes = [
  { kind: 'floor', x0: -RING_HW, x1: RING_HW, z0: -19, z1: 20 },              // control room
  { kind: 'wall',  x0: -RING_HW, x1: RING_HW, z0: -19.6, z1: -18.6, name: 'Plot boards' },
  { kind: 'floor', x0: -RING_HW, x1: RING_HW, z0: 20, z1: 26 },               // south leg
  { kind: 'floor', x0: -RING_HW, x1: -17, z0: 26, z1: 54 },                   // west leg
  { kind: 'floor', x0: 17, x1: RING_HW, z0: 26, z1: 54 },                     // east leg
  { kind: 'floor', x0: -RING_HW, x1: RING_HW, z0: 54, z1: 60 },               // north leg
  { kind: 'court', x0: -17, x1: 17, z0: 26, z1: 54, name: 'Courtyard' },
  // The ways through, dashed: the control room's back doors, the three openings
  // onto the courtyard, and one door per room in the wings.
  { kind: 'open', x0: -2, x1: 2, z0: 19.6, z1: 20.4 },
  { kind: 'open', x0: -9, x1: -5, z0: 25.6, z1: 26.4 },
  { kind: 'open', x0: 5, x1: 9, z0: 25.6, z1: 26.4 },
  { kind: 'open', x0: -2, x1: 2, z0: 53.6, z1: 54.4 },
  ...WORKROOMS.map(r => ({
    kind: 'open',
    x0: r.side === 'w' ? -RING_HW - 0.4 : RING_HW - 0.4,
    x1: r.side === 'w' ? -RING_HW + 0.4 : RING_HW + 0.4,
    z0: (r.z0 + r.z1) / 2 - 0.9,
    z1: (r.z0 + r.z1) / 2 + 0.9,
  })),
];

export const site = {
  kind: 'interior',
  name: 'Mission Control',

  // The theme's own world. vite.config.js points `@world` here instead of at
  // one of the engine's two builders. Deep Watch does the same with its boat.
  world: 'themes/bring_them_home/world.js',

  // What the validator and the map read. The world reads `room` and `CONSOLES`.
  plan: { rooms, shapes },

  /** Room envelope, in metres. */
  room: {
    halfWidth: 23,
    front: -19,          // the board wall
    back: 20,            // the back wall, with the doors and the gallery above
    ceiling: 7.2,
    rowZ: ROW_Z,
    rowStep: 0.55,       // each row is this much higher than the one in front
  },

  /**
   * The building the control room is one wing of.
   *
   * Mission Control on its own was a box with no outside: the player spawned in
   * it, worked in it and never left it, and a control centre that is only its
   * own control room has nowhere for the people in it to have come from. So the
   * room is now the south wing of a square building with a ring corridor and an
   * open courtyard in the middle — a loop you can walk right round, glazed on the
   * courtyard side, with the night sky over the middle of it.
   *
   * The room is untouched. Its own back wall is the ring's south boundary and its
   * doors open onto the corridor, so nothing about the tiers, the boards or the
   * consoles changes.
   *
   *        z = 60  ╔═══════════ north leg ═══════════╗
   *                ║        ┌─────────────┐          ║
   *                ║  west  │  COURTYARD  │  east    ║
   *                ║  leg   └─────────────┘  leg     ║
   *        z = 20  ╠════════ south leg ══════════════╣
   *                ║        MISSION CONTROL          ║
   *        z = -19 ╚═════════ plot boards ═══════════╝
   *
   * The corridor floor is level with the back of the control room — the highest
   * tier — so the doors are step-free and `groundHeight` is a staircase only
   * inside the room.
   */
  building: {
    halfWidth: RING_HW,   // the ring's outer wall, in line with the control room
    wing: WING,           // how deep the rooms beyond the ring are
    corridor: 6,          // how wide the ring is, all four legs
    southLeg: [20, 26],   // between the room's back wall and the courtyard
    northLeg: [54, 60],
    courtyard: { x0: -17, x1: 17, z0: 26, z1: 54 },
    ceiling: 4.2,         // lower than the control room's 7.2, as a corridor is
    doorW: 4.0,           // the control room's back doors
    roomDoorW: 1.8,       // a room off the corridor
  },

  // On the centre aisle at the back of the room, looking down at the boards.
  // Ten clear metres in every direction: a prop over the spawn welds the player
  // in place and the scene still renders perfectly.
  spawn: { x: 0, z: 16.5, yaw: 0 },
};

export default site;
