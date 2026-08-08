// theme.js — the manifest. This is the only file the engine reads directly.
//
// Copy this directory to start a new game:
//   cp -r themes/_template themes/airport
// then work through THEME_CONTRACT.md § "Adding a theme".
import { plan } from './plan.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS } from './content/missions.js';
import { CURRICULUM } from './content/curriculum.js';
import { ROSTER } from './content/roster.js';
import { COPY } from './content/copy.js';
import { fitOutRoom, fitOutSpine } from './props.js';

export default {
  id: '_template',
  title: 'Template',
  subtitle: 'Copy this to start a new game',

  // The place. 'interior' uses engine/world/interiorSite.js and needs a plan;
  // 'outdoor' uses engine/world/outdoorSite.js and needs terrain settings.
  site: { kind: 'interior', plan },

  content: { GROUPS, MISSIONS, CURRICULUM, ROSTER, COPY },

  people: {
    OUTFITS,
    roleToOutfit,
    // spawn must be >= ROSTER.length, or characters past the limit never
    // appear and any mission stop naming them is unreachable. Validated.
    spawn: ROSTER.length,
    extras: 22,
  },

  look: {
    fov: 66,            // a 72° field distorts badly in a corridor
    near: 0.08,
    far: 160,
    fog: { colour: 0xdfe4e6, near: 26, far: 96 },
    exposure: 1.0,
    lighting: 'interiorFluorescent',
  },

  // Where the player starts, and which way they face.
  start: { x: 0, z: 12, yaw: 0 },

  // Theme hooks. Both receive the builder context described in
  // engine/world/interiorSite.js.
  fitOutRoom,
  fitOutSpine,
};
