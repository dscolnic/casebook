// site.js — Corbin Park, as data. Outdoor, on the south shore of a lake.
//
// `engine/world/outdoorTown.js` builds all of it. The place is a closed
// amusement park three weeks before it tries to reopen: seven rides, a midway
// of boarded stalls between them, a workshop, and a lake along the north edge
// that the flume takes its water from.
//
// **The rides are the buildings.** Every area in this game is a ride, so every
// group here is a station or a plant room at the foot of a machine — and the
// machines themselves, which are the whole silhouette of the place, are props.
// The coaster's lift hill and loop, the wheel, the tower and the ship are what
// a player navigates by; the buildings under them are where the questions
// happen. Nothing else in this repo has a skyline made of rides.
//
// Looking down, -Z is away from the player at the gate:
//
//                    ~ ~ ~   the lake   ~ ~ ~                    z = -150
//              [ Log Flume ]                                     z = -96
//   [ Coaster ]                         [ Drop Tower ]           z = -44 … -60
//              [ Bumper Cars ]                                   z = -24
//   [ Carousel ]                        [ Pirate Ship ]          z =  -4 … 6
//              [ Ferris Wheel ]                                  z =  22
//   [ Workshop ]      ¤ spawn ¤      [ Arcade ]                  z =  44 … 58
//                     [ Front Gate ]                             z =  70
//
// Three things here are load-bearing rather than decorative:
//
//   · The spawn at (0, 58) is inside the gate and clear for twelve metres. A
//     prop over the spawn welds the player in place: the scene renders and W
//     does nothing.
//   · Every `group` below is a group id in content/groups.js — one per ride. A
//     group with no building is a call the player cannot reach, and
//     `worldParity` and `reachable` are what notice.
//   · The horizon is shaped. Low wooded hills stand across the south behind the
//     car park, the north is open water, and that asymmetry is the wayfinding:
//     if there are trees on the skyline you are facing away from the lake.

import { ranges, S, SW, SE } from '../../engine/world/horizonShape.js';

const PI = Math.PI;

/** A line of queue rail, which is most of the ground furniture in a park. */
const rail = (x0, z0, x1, z1, n) => Array.from({ length: n }, (_, i) => ({
  kind: 'post',
  x: x0 + ((x1 - x0) * i) / (n - 1),
  z: z0 + ((z1 - z0) * i) / (n - 1),
  height: 1.05,
  r: 0.045,
  colour: 0x8a8577,
}));

export const site = {
  kind: 'outdoor',
  name: 'Corbin Park',

  terrain: {
    size: 700, segments: 300, playerLimit: 165,   // the car parks reach z = 140
    // A lakeside flat with a slight fall to the water. Amusement parks are built
    // on ground somebody could pour a slab on.
    profile: 'flat', relief: 0.5,
    // Asphalt and worn grass, written dark: the midway is a dark surface under a
    // bright sky, and the first pass at this came out the colour of sand.
    ground: { base: [70, 68, 58], spread: [22, 22, 18], repeat: 18, normalRepeat: 160 },
  },

  // Lake air in March: clean, with a high sun and a pale band at the horizon.
  // A low rayleigh washes the whole dome out, which is what the first pass did.
  atmosphere: { turbidity: 2.3, rayleigh: 3.2, mie: 0.003, mieG: 0.76, scale: 850, stars: 900 },

  // The midway itself: one avenue from the gate to the lake, with two cross
  // paths. Worn tarmac rather than road — `tone` takes the warm grit out of the
  // default texture and `lift` drops it toward grey.
  paths: [
    { cx: 0, cz: -20, w: 14, d: 180, worn: 9, tone: [-12, -12, -10], lift: -46 },
    { cx: 0, cz: 22, w: 120, d: 8, worn: 5, tone: [-12, -12, -10], lift: -46 },
    { cx: 0, cz: -52, w: 130, d: 8, worn: 5, tone: [-12, -12, -10], lift: -46 },
    // The service road round the back of the rides, and the car park apron.
    { cx: -62, cz: -20, w: 8, d: 150, worn: 4, tone: [-10, -10, -8], lift: -52 },
    // The car parks either side of the approach, and the road in off the county
    // route. A park this size sells a hundred and six days a year and has to
    // put eight hundred cars somewhere on each of them.
    { cx: -56, cz: 108, w: 96, d: 64, worn: 20, tone: [-12, -12, -10], lift: -50 },
    { cx: 56, cz: 108, w: 96, d: 64, worn: 20, tone: [-12, -12, -10], lift: -50 },
    { cx: 0, cz: 92, w: 60, d: 30, worn: 12, tone: [-12, -12, -10], lift: -48 },
    { cx: 0, cz: 146, w: 250, d: 12, worn: 8, tone: [-12, -12, -10], lift: -44 },
  ],

  // The lake. `setWaterBed` cuts the channel, so the bed and shore are set
  // explicitly rather than left to the 420 m river defaults.
  water: { cx: 0, cz: -190, width: 460, depth: 150, level: -1.4, bed: 3.0, shore: 26 },

  buildings: [
    // The seven rides. Each entry is the building at the foot of the machine —
    // station, plant room or operator's booth — and the machine itself is in
    // props.js, standing over it.
    // Facing east, onto the midway. Facing it north put its door under the
    // track, with the standing train across the approach — which the
    // reachability fill caught and no other check could see.
    { id: 'COASTER', group: 'COASTER', name: 'Coaster Station',
      x: -46, z: -44, w: 26, d: 12, h: 5.0, facing: PI / 2, colour: 0x3f6474 },
    { id: 'TOWER', group: 'TOWER', name: 'Drop Tower Control',
      x: 44, z: -60, w: 14, d: 10, h: 4.4, facing: PI / 2, colour: 0x8f4536 },
    { id: 'BUMPER', group: 'BUMPER', name: 'Bumper Car Pavilion',
      x: 22, z: -24, w: 26, d: 18, h: 5.6, facing: PI, colour: 0x4a7059 },
    { id: 'CAROUSEL', group: 'CAROUSEL', name: 'Carousel Drive House',
      x: -44, z: -4, w: 14, d: 10, h: 4.2, facing: PI / 2, colour: 0x9c8144 },
    { id: 'SHIP', group: 'SHIP', name: 'Pirate Ship Console',
      x: 42, z: 6, w: 14, d: 10, h: 4.2, facing: -PI / 2, colour: 0x4a5f70 },
    { id: 'WHEEL', group: 'WHEEL', name: 'Wheel Machine Room',
      x: -18, z: 22, w: 16, d: 11, h: 4.6, facing: 0, colour: 0x60527a },
    { id: 'FLUME', group: 'FLUME', name: 'Flume Pumphouse',
      x: -26, z: -96, w: 20, d: 13, h: 5.2, facing: 0, colour: 0x3f6f6b },

    // No group: the places that carry the park rather than a lesson.
    { id: 'GATE', name: 'Front Gate', sub: 'Closed since October',
      x: 0, z: 74, w: 24, d: 9, h: 4.6, facing: PI, colour: 0xa8a08c },
    { id: 'WORKSHOP', name: 'Workshop', sub: "Brennan's bench, and eleven notebooks",
      x: -54, z: 46, w: 20, d: 13, h: 5.4, facing: PI / 2, colour: 0x8d7f6a },
    { id: 'ARCADE', name: 'Arcade and Stalls', sub: 'Boarded, and not on the list',
      x: 40, z: 44, w: 24, d: 12, h: 5.0, facing: PI, colour: 0x8a5a49 },
    { id: 'PLANT', name: 'Plant Room', sub: 'Everything on the midway runs off this board',
      x: -60, z: -70, w: 14, d: 10, h: 4.4, facing: PI / 2, colour: 0x7d8288 },
  ],

  board: { x: 11, z: 60, facing: PI, title: 'Reopening board' },

  // Queue rails, bins and benches — the ground furniture of a midway. Kept off
  // the avenue (|x| < 8) so nothing narrows the walk from the gate to the lake.
  furniture: [
    { kind: 'bench', x: -13, z: 40, facing: PI },
    { kind: 'bench', x: 13, z: 12, facing: PI },
    { kind: 'bench', x: -13, z: -30, facing: 0 },
    { kind: 'bin', x: 10, z: 40 },
    { kind: 'bin', x: -10, z: -10 },
    { kind: 'bin', x: 10, z: -66 },
    ...rail(-30, -34, -30, -50, 6),
    ...rail(30, -50, 30, -64, 6),
    ...rail(-30, 4, -30, -6, 5),
    ...rail(28, 14, 28, 2, 5),
    ...rail(-9, 30, -9, 14, 6),
  ],

  // Grass coming through the asphalt and up the fences. A closed park is a
  // vegetation problem before it is anything else, and the band starts close
  // in because the weeds here are between the rides rather than beyond them.
  scrubCount: 520,
  scrubColour: 0x6b7340,
  scrubBand: [16, 220],

  // Wooded hills across the south, behind the car park; open water to the
  // north. Nothing on the lake side of the skyline, which is how a player knows
  // which way they are facing on a midway of identical stalls.
  horizon: [
    { radius: 400, height: 26, colour: 0x4d5a44, haze: 0.40,
      amp: ranges([{ at: S, width: 2.2, hi: 1.0 }, { at: SW, width: 1.0, hi: 1.2 }], 0.05) },
    { radius: 620, height: 34, colour: 0x5c6a52, haze: 0.68,
      amp: ranges([{ at: S, width: 2.6, hi: 1.0 }, { at: SE, width: 0.9, hi: 0.7 }], 0.04) },
  ],

  // yaw 0 is -Z, the camera's default: this looks up the midway, with the wheel
  // on the left, the ship on the right and the coaster's lift hill behind them.
  spawn: { x: 0, z: 58, yaw: 0 },
};

export default site;
