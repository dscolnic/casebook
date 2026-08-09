// site.js — the boat, as data.
//
// Deep Watch was built as its own game with its own engine: a persistent
// submarine, five simulation systems, and a mission runtime of timed stages.
// The boat itself came across; the simulation did not, because this engine's
// loop is walk somewhere, work the evidence, hand off — and a flooding rate
// that keeps rising while you read a gauge has no place to live in it.
//
// What survives is the part that was already data. `boat/SubmarineWorld.js`
// keeps its own `LAYOUT`, and this reads it, so there is still exactly one
// description of the compartments: the world builds from it, and the checks,
// the map and the missions read it here.
import { LAYOUT, BOAT_LENGTH, HALF_W } from './boat/SubmarineWorld.js';

/**
 * Which compartment each area of study happens in.
 *
 * Six areas, six compartments; the other four are places the player walks
 * through and reads, which is what the other games' filler buildings are for.
 * Each pairing is where that work would actually be done on a boat: flooding is
 * forward because that is where the sea connection is, fire is at the
 * switchboard, atmosphere is with the scrubbers in auxiliary machinery.
 */
export const AREA_COMPARTMENT = {
  SONAR: 'sonar_room',
  NAV:   'control_room',
  DC:    'forward_equipment',
  FIRE:  'electrical',
  ATMO:  'auxiliary',
  ENG:   'propulsion',
};

const byId = Object.fromEntries(LAYOUT.map(c => [c.id, c]));
const groupOf = Object.fromEntries(Object.entries(AREA_COMPARTMENT).map(([g, c]) => [c, g]));

/**
 * The compartments as rooms. A submarine is one line of spaces rather than
 * rooms off both sides of a corridor, so `side` is 'spine' throughout — the
 * world builder is the boat's own and does not read it, but the validator and
 * the map do, and they need to see that every area has somewhere to happen.
 */
export const rooms = LAYOUT.map(c => ({
  id: c.id,
  name: c.name,
  side: 'spine',
  z0: c.zStart,
  z1: c.zEnd,
  colour: c.color,
  section: c.section,
  ...(groupOf[c.id] ? { group: groupOf[c.id] } : {}),
}));

export const site = {
  kind: 'interior',
  name: 'The boat',

  // This theme brings its own world module. vite.config.js reads this and
  // points `@world` at it, the way the two older games point their own aliases
  // at theirs — except that here the boat lives inside the theme rather than in
  // a separate package.
  world: 'themes/deepwatch/world.js',

  plan: { rooms, length: BOAT_LENGTH, halfWidth: HALF_W },

  // Amidships in the control room, facing forward down the boat. Nothing is
  // parked here: a prop over the spawn welds the player in place, and on this
  // boat the passage is 4.5 m wide with equipment down both sides.
  spawn: { x: 0, z: byId.control_room.zMid, yaw: Math.PI },
};

export default site;
