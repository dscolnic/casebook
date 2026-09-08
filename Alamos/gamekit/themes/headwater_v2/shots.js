// shots.js — where to stand to photograph a tower.
//
// Headwater builds its own world, so nothing generates these. Without the file
// the tool fell back to a turn on the spot at the spawn, and every one of the
// fourteen pictures it produced was a wall, a ceiling or a black window — which
// is how this game came to be represented on the shelf by a photograph of an
// unlit pane of glass.
//
// THE ONE THING THAT DECIDES EVERY COORDINATE HERE. `teleport` ignores the y it
// is given — it puts the camera at `groundHeight(x, z) + playerHeight`. That is
// not a limitation to work around, it is the plan working: each level occupies
// its own stretch of z (see plan.js on why), so z alone says which floor you are
// standing on. Every view below is (x, z), and the level it lands on is whichever
// one owns that z. Stray outside a level's `spine` range and the shot is of the
// floor below, from inside its ceiling.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ).
const N = 0;                 // toward −z — back down the tower
const S = Math.PI;           // toward +z — on up it
const E = -Math.PI / 2;      // toward +x — the glass, the gorge and the fall
const W = Math.PI / 2;       // toward −x — the rooms

// The gallery runs x −2.6…+2.6 with the glass on its east face and the rooms
// behind its west one. Standing at −2.0 and looking east puts the whole screen
// through the glass, which is the only reason this building is shaped like this.
const GLASS = -2.0;
// A room is 7.4 deep behind the gallery wall. Photograph its outer wall from
// just inside the door, and the door wall from just inside the outer one — from
// the middle you get two metres of wall and lose both ends.
const IN_DOOR = -3.7;
const AT_WALL = -8.9;
// Hard against the mullions, half a metre off the glass. From −2.0 the frame
// still carries the deck and the rail; from here it is the gorge and nothing
// else, which is what a shot of the water is for.
const AT_GLASS = 2.1;

export const VIEWS = [
  // ---- the view, once per level -------------------------------------------
  // The lesson is out of the window on every floor, and the fall is a hundred
  // metres tall, so what is in frame changes as the tower climbs. If any of
  // these five comes back grey, the glazing is drawing but the gorge behind it
  // is not, and that is the bug — not the shot.
  { name: 'glass-0-machine', at: { x: GLASS, z: 5 }, yaw: E,
    note: 'machine floor, out at the plunge pool' },
  { name: 'glass-1-portal', at: { x: GLASS, z: 31 }, yaw: E,
    note: 'gallery portal, out at the foot of the fall' },
  { name: 'glass-2-operations', at: { x: GLASS, z: 59 }, yaw: E,
    note: 'operations, level with the middle of the sheet' },
  { name: 'glass-3-gates', at: { x: GLASS, z: 88 }, yaw: E,
    note: 'gate floor, out at the spillway' },
  { name: 'glass-4-lookout', at: { x: GLASS, z: 113 }, yaw: E,
    note: 'the lookout, level with the crest and the top of the fall' },

  // ---- the gallery itself, both ways --------------------------------------
  // The glass is on the left going up and on the right coming down, which is
  // the only way to see whether the mullions march evenly the length of a floor.
  { name: 'gallery-0-up', at: { x: 0, z: -4 }, yaw: S, note: 'machine floor, looking up the spine' },
  { name: 'gallery-1-up', at: { x: 0, z: 23 }, yaw: S, note: 'gallery portal, looking up' },
  { name: 'gallery-2-up', at: { x: 0, z: 49 }, yaw: S, note: 'operations, looking up' },
  { name: 'gallery-2-down', at: { x: 0, z: 70 }, yaw: N, note: 'operations, looking back down' },
  { name: 'gallery-3-up', at: { x: 0, z: 79 }, yaw: S, note: 'gate floor, looking up' },
  { name: 'gallery-4-up', at: { x: 0, z: 106 }, yaw: S, note: 'the lookout, looking up' },
  { name: 'gallery-4-down', at: { x: 0, z: 120 }, yaw: N, note: 'the lookout, looking back down' },

  // ---- the rooms a mission sends you to -----------------------------------
  // Six of these carry a `group`, which means a case opens in them and a player
  // stands in them for the length of a question. They are the rooms worth
  // furnishing and therefore the rooms worth looking at.
  { name: 'powerhouse--wall', at: { x: IN_DOOR, z: 7.5 }, yaw: W, note: 'Powerhouse, the outer wall' },
  { name: 'powerhouse--door', at: { x: AT_WALL, z: 7.5 }, yaw: E, note: 'Powerhouse, back toward the gallery' },
  { name: 'seepage--wall', at: { x: IN_DOOR, z: 27.5 }, yaw: W, note: 'Seepage & Uplift Bay, the outer wall' },
  { name: 'inflow--wall', at: { x: IN_DOOR, z: 53.5 }, yaw: W, note: 'Catchment & Inflow Desk' },
  { name: 'storage--wall', at: { x: IN_DOOR, z: 64.5 }, yaw: W, note: 'Storage & Level Board' },
  { name: 'gatehouse--wall', at: { x: IN_DOOR, z: 83.5 }, yaw: W, note: 'Gate House, the hoists' },
  { name: 'gatehouse--door', at: { x: AT_WALL, z: 83.5 }, yaw: E, note: 'Gate House, back toward the gallery' },
  { name: 'warning--wall', at: { x: IN_DOOR, z: 93.5 }, yaw: W, note: 'Downstream Warning Desk' },
  { name: 'briefing--wall', at: { x: IN_DOOR, z: 116.5 }, yaw: W, note: 'Briefing Room' },

  // ---- the four things the world pass changed, each from where it shows ----
  // These are not spare views of the same window. Each one is the check for one
  // piece of work, and each is framed so that the piece either reads or does
  // not: standing at the mullion rather than at the rooms, so the frame is the
  // gorge and nothing else.

  // 1. The sheet, from the middle of the tower, at the height where the fall
  //    fills the whole window: scrolling streaks on the front sheet, and the
  //    faster veil in front of them. If this is a flat pale panel the texture is
  //    not reaching the material; if it moves upward the scroll sign is wrong.
  { name: 'fall-2-sheet', at: { x: AT_GLASS, z: 55 }, yaw: E,
    note: 'operations, hard against the glass — the moving sheet and the veil' },

  // 2. The same fall from the top floor, where the crest is at eye level: the
  //    handrail run, the two lamps, the hoist gantries and a raised gate leaf,
  //    against the storm sky rather than against stars.
  { name: 'fall-4-crest', at: { x: AT_GLASS, z: 110 }, yaw: E,
    note: 'the lookout — the crest walkway, the lamps, the gate hoists, the sky' },

  // 3. The mist, from the bottom floor, which is the only one low enough to look
  //    into the top of the plume. Sixty rising discs; if they are visible west of
  //    the mullions they are inside the building and the x range is wrong.
  { name: 'mist-0-foot', at: { x: AT_GLASS, z: 9 }, yaw: E,
    note: 'machine floor — the mist rising out of the plunge pool, and the boil' },

  // 4. The gallery on level 2 with the glass on the left: what the time-of-day
  //    decision was actually about. The deck, the rooms and the sky have to look
  //    like one hour of one day.
  { name: 'corridor-2-lit', at: { x: -1.4, z: 50 }, yaw: S,
    note: 'operations gallery, glass on the left — interior light against the sky' },
];

export default VIEWS;
