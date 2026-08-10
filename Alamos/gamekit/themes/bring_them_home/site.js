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
  { group: 'NAV',    name: 'Guidance',              x: -11, row: 0, w: 8.5 },
  { group: 'THERM',  name: 'Thermal & Life Support', x: 11, row: 0, w: 8.5 },
  { group: 'ELEC',   name: 'Electrical',            x: -11, row: 1, w: 8.5 },
  { group: 'COMMS',  name: 'Communications',         x: 11, row: 1, w: 8.5 },
  { group: 'STRUCT', name: 'Structures & Dynamics', x: -11, row: 2, w: 8.5 },
  { group: 'INTEG',  name: 'Flight Director',        x:   0, row: 3, w: 11 },
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
export const rooms = CONSOLES.map(c => ({
  id: c.group,
  name: c.name,
  group: c.group,
  side: c.x < 0 ? 'w' : c.x > 0 ? 'e' : 'spine',
  z0: -12 + c.row * 7,
  z1: -12 + c.row * 7 + 5,
}));

export const site = {
  kind: 'interior',
  name: 'Mission Control',

  // The theme's own world. vite.config.js points `@world` here instead of at
  // one of the engine's two builders. Deep Watch does the same with its boat.
  world: 'themes/bring_them_home/world.js',

  // What the validator and the map read. The world reads `room` and `CONSOLES`.
  plan: { rooms },

  /** Room envelope, in metres. */
  room: {
    halfWidth: 23,
    front: -19,          // the board wall
    back: 20,            // the back wall, with the doors and the gallery above
    ceiling: 7.2,
    rowZ: [-10, -3, 4, 11],
    rowStep: 0.55,       // each row is this much higher than the one in front
  },

  // On the centre aisle at the back of the room, looking down at the boards.
  // Ten clear metres in every direction: a prop over the spawn welds the player
  // in place and the scene still renders perfectly.
  spawn: { x: 0, z: 16.5, yaw: 0 },
};

export default site;
