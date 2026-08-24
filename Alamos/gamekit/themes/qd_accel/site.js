// site.js — Cerro Vela Survey Operations, as data.
//
// A Quick Discovery reskin of themes/bring_them_home/site.js. The geometry is
// that file's, unchanged, because themes/qd_accel/props.js and world.js are
// copies of that game's and are placed off these numbers. What is changed is
// everything a player reads: the name, the four areas of study, the console
// labels and the three plot boards.
//
// The place is the analysis floor of a supernova survey: a single large volume
// with the floor stepped down toward a wall of plot boards, teams sitting as
// rows rather than in rooms, a ring corridor behind it and two rooms off that.
//
// Looking at the floor from the back doors:
//
//        ╔══════════════ PLOT BOARDS ══════════════╗   z = -19
//        ║  row 1   PHOT                            ║   z = -10
//        ║  row 2                                    ║   z =  -3
//        ║  row 3                                    ║   z =   4
//        ║  row 4   COSMO · the cosmology console    ║   z =  11
//        ╚══ back doors ═══ gallery above ════════╝   z =  20
//
// SPEC and PRESS are the two rooms off the ring corridor behind that, one each
// side. Each row sits one step higher than the row in front of it, so the whole
// floor looks down at the boards.

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
  // Which two areas sit on the floor is not arbitrary. Photometry is this room —
  // the boards it faces are its own output — and the cosmology console is the one
  // desk the whole floor is arranged around, so both belong on the tiers. The
  // other two areas are behind a door, because a campaign whose every call is in
  // one room is a campaign nobody walks anywhere in.
  { group: 'PHOT',  name: 'Photometry Desk',   x: -11, row: 0, w: 8.5 },
  { group: 'COSMO', name: 'Cosmology Console', x:   0, row: 3, w: 11 },
  // The rest of the floor. Real positions on a survey analysis floor and none of
  // them an area of study: they are staffed, they are lit, and they are not where
  // the player's work is. They exist so the room reads as a floor with a team on
  // it rather than as two desks in a hall.
  { name: 'Search & Subtraction', x:  11, row: 0, w: 8.5 },
  { name: 'Scheduling',           x: -11, row: 1, w: 8.5 },
  { name: 'Archive',              x:  11, row: 1, w: 8.5 },
  { name: 'Telescope Liaison',    x: -11, row: 2, w: 8.5 },
];

/**
 * The two areas that work outside the analysis floor, one room each off the ring.
 *
 * A survey is not one room. Spectroscopy needs a room with the arc lamps and the
 * standards in it, and the publication room is where what may be said out loud is
 * argued over — and a level that never leaves the console floor is a level that
 * never walks anywhere, which is half of what these games are.
 *
 *   side   'w' or 'e', which wing the room is in
 *   z0/z1  how far the room runs along the building
 */
export const WORKROOMS = [
  { group: 'SPEC',  name: 'Spectroscopy Room', side: 'w', z0: 20, z1: 40 },
  { group: 'PRESS', name: 'Publication Room',  side: 'e', z0: 20, z1: 40 },
];

/**
 * What the wall of boards at the front of the room is showing.
 *
 * Sized against the ceiling rather than by eye. `buildBoards` stands a board on
 * `y = 1.15` with a bezel a fifth of a metre proud of it, so the tallest of the
 * three has to satisfy `1.15 + h + 0.2 <= 7.2` — the room's own ceiling, thirty
 * lines down. Inherited from the donor at 5.8 on a base of 2.4, which puts a
 * metre of the middle board *inside the soffit*, and what is in that metre is the
 * title bar: the board a room of forty people faces was the one board whose name
 * could not be read, and every check passed because a board is a plane and a
 * plane can be anywhere.
 */
export const BOARDS = [
  { label: 'LIGHT CURVES',   x: -13.5, w: 11, h: 5.0 },
  { label: 'HUBBLE DIAGRAM', x:  0,   w: 13, h: 5.6 },
  { label: 'RESIDUALS',      x:  13.5, w: 11, h: 5.0 },
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
  name: 'Cerro Vela Survey Operations',

  // The theme's own world. vite.config.js points `@world` here instead of at
  // one of the engine's two builders. Deep Watch does the same with its boat.
  world: 'themes/qd_accel/world.js',

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
   * The floor on its own was a box with no outside: the player spawned in it,
   * worked in it and never left it, and an operations centre that is only its
   * own operations room has nowhere for the people in it to have come from. So the
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
   *                ║      THE ANALYSIS FLOOR         ║
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
