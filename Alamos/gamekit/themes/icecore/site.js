// site.js — Vestri Dome, as data. Outdoor, and flatter than anywhere else here.
//
// `engine/world/outdoorTown.js` builds all of it. The place is a deep-drilling
// camp on the high plateau: six modules on legs beside a groomed route, a drill
// trench dug into the snow at the far end, and a stake array out to the east.
//
// Looking down, -Z is away from the player at spawn:
//
//        [ Drill Trench ]                                z = -68
//   [ Cold Lab ]        [ Gas Lab ]                      z = -32
//   [ Science Module ]  [ Core Line ]                    z =   0
//        [ Mess ]  [ Generators ]                        z =  22
//                 ¤ spawn ¤            [ Snow Study Hut ] (east, on its own)
//
// Three things here are load-bearing rather than decorative:
//
//   · The spawn at (0, 44) has nothing within ten metres of it. A prop over the
//     spawn welds the player in place: the scene renders and W does nothing.
//   · Every `group` below is a group id in content/groups.js. A group with no
//     building is a call the player cannot reach, and `worldParity` is the only
//     check that notices.
//   · The horizon ranks are almost flat on purpose. This is the one place in the
//     set with nothing on the skyline, and the low ranks are what sell it —
//     removing them entirely leaves a hard line where the dome meets the ground.

const PI = Math.PI;

/** The flag line: a marked route is the only thing you can follow in a whiteout. */
const flags = (x0, z0, x1, z1, n) => Array.from({ length: n }, (_, i) => ({
  kind: 'post',
  x: x0 + ((x1 - x0) * i) / (n - 1),
  z: z0 + ((z1 - z0) * i) / (n - 1),
  height: 2.6,
  r: 0.05,
}));

export const site = {
  kind: 'outdoor',
  name: 'Vestri Dome Station',

  terrain: {
    size: 900, segments: 300, playerLimit: 150,
    // Sastrugi rather than hills: the plateau falls a few metres over the whole
    // site and everything else is wind-carved ridges a knee high.
    profile: 'flat', relief: 0.35,
    // Snow, written far darker than snow looks. Under a bright sky IBL with
    // ACES tone mapping anything near white renders as a flat blown-out sheet,
    // and the sastrugi shading is the only thing that says the ground is not a
    // painted plane.
    ground: { base: [150, 158, 170], spread: [16, 16, 18], repeat: 26, normalRepeat: 220 },
  },

  // Thin, dry, very clear air. Low turbidity and high rayleigh give the deep
  // blue zenith and the pale band at the horizon that a plateau actually has.
  atmosphere: { turbidity: 2.1, rayleigh: 3.1, mie: 0.002, mieG: 0.72, scale: 900, stars: 1400 },

  // Groomed snow, not road. `tone` is the per-channel offset the path texture
  // is drawn with — the default is warm grit, which reads as a brown road
  // across an ice sheet — and `lift` raises it toward white. Tinting the
  // material cannot do this: multiplying a warm texture by a cold colour scales
  // the warmth rather than removing it, which is what the first attempt did.
  paths: [
    // The groomed route through camp, and the spur out to the stake array.
    { cx: 0, cz: -14, w: 12, d: 130, worn: 7, tone: [-16, -6, 8], lift: 74 },
    { cx: 38, cz: 26, w: 90, d: 8, worn: 5, tone: [-16, -6, 8], lift: 74 },
    // The skiway, off to the west, groomed flat and two hundred metres long.
    { cx: -96, cz: 10, w: 26, d: 200, worn: 8, tone: [-14, -5, 8], lift: 82 },
  ],

  // Painted for visibility rather than for taste: every polar station is red,
  // orange, blue or yellow, because a module the colour of the snow is a module
  // nobody finds in blowing snow.
  buildings: [
    { id: 'DATA', group: 'DATA', name: 'Science Module',
      x: -22, z: 0, w: 20, d: 12, h: 5.4, facing: 0, colour: 0xb8452c },
    { id: 'CORE', group: 'CORE', name: 'Core Line',
      x: 20, z: 0, w: 24, d: 11, h: 5.2, facing: 0, colour: 0x2f6f9f },
    { id: 'COLD', group: 'COLD', name: 'Cold Laboratory',
      x: -24, z: -32, w: 18, d: 12, h: 5.2, facing: 0, colour: 0x2f8f88 },
    { id: 'GAS', group: 'GAS', name: 'Gas Laboratory',
      x: 22, z: -32, w: 18, d: 12, h: 5.2, facing: 0, colour: 0xc9a52a },
    // The trench is the biggest structure on the station and the only one dug
    // in rather than raised: the tower needs the headroom and the hole needs
    // the temperature.
    { id: 'DRILL', group: 'DRILL', name: 'Drill Trench',
      x: -4, z: -68, w: 34, d: 18, h: 9.5, facing: 0, colour: 0x4a5a68 },
    // Out on its own, at the head of the stake array. The walk is the point:
    // the day's budget is measured from the route, so a call out here is a
    // decision about the whole day.
    { id: 'FIELD', group: 'FIELD', name: 'Snow Study Hut',
      x: 82, z: 26, w: 12, d: 9, h: 4.4, facing: -PI / 2, colour: 0xc9702a },

    // No group: the camp the science sits inside.
    { id: 'MESS', name: 'Mess and Accommodation', sub: 'Where the season is argued about',
      x: -26, z: 26, w: 26, d: 13, h: 5.0, facing: PI, colour: 0xb8452c },
    { id: 'GEN', name: 'Generator Module', sub: 'Two sets, one of them running',
      x: 24, z: 26, w: 14, d: 10, h: 4.6, facing: PI, colour: 0x5c6670 },
    { id: 'STORE', name: 'Core Store', sub: 'Below the surface, and colder than the air',
      x: 46, z: -14, w: 14, d: 10, h: 3.4, facing: -PI / 2, colour: 0x8fa6bd },
  ],

  board: { x: 8, z: 34, facing: PI, title: 'Season board' },

  // Kept clear of the route (|x| < 7) so nothing narrows it. Everything on a
  // plateau is either anchored or gone by morning.
  furniture: [
    { kind: 'bench', x: -12, z: 18, facing: PI },
    { kind: 'bin', x: 12, z: 18 },
    ...flags(9, 40, 9, -60, 14),
    ...flags(-9, 40, -9, -60, 14),
    ...flags(34, 22, 74, 22, 7),
  ],

  // Nothing grows here. The band is kept so the field stays empty rather than
  // being filled with something that would look like vegetation from a distance.
  scrubCount: 0,
  scrubColour: 0x8d99a6,
  scrubBand: [40, 300],

  // The flattest skyline in the set: the dome falls away in every direction and
  // there is nothing on it. Two very low ranks, far out, so the horizon reads as
  // a distance rather than as a hard edge against the sky.
  horizon: [
    { radius: 620, height: 7, colour: 0x9fb0c0, haze: 0.72 },
    { radius: 820, height: 11, colour: 0xb4c2cf, haze: 0.86 },
  ],

  // yaw 0 is -Z, the camera's default: this looks down the flag line into camp.
  spawn: { x: 0, z: 44, yaw: 0 },
};

export default site;
