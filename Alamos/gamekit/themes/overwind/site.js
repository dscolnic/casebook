// site.js — Kerrow No. 3, as data. A deep shaft on a moorland bench.
//
// `engine/world/outdoorTown.js` builds all of it. The place is a working mine
// hoist: a headframe over the shaft with the winder house beside it, the rope
// running across the yard between them at head height, and a gravity station
// three hundred metres out on the bench where the moor takes over.
//
// Looking down, -Z is away from the player at spawn:
//
//        [ Gravity Station ]                                z = -290
//                        ~ the bench, and the moor ~
//                             [ Tip and Conveyor ]          z =  -30
//                    ¦ headframe ¦                          z =   -4  (props.js)
//                     [ The Bank ]     [ Shaft and Brake ]  z =   -4
//   [ Winder House ]                       [ Lamp Room ]    z =    6
//        [ Rope Shop ]     [ Change House ]                 z =   34
//                       ¤ spawn ¤                            z =   70
//
// Three things here are load-bearing rather than decorative:
//
//   · The gravity station is 367 m from the spawn and everything else is inside
//     107 m, which is what makes `engine/core/orientation.js` call this a
//     two-tier site: the far lap and the vehicles come out on day 4. Move it in
//     and the second lap silently stops being offered.
//   · The winder house is 26 m from the shaft and offset from it, because the
//     rope has to run from the drum, up over the sheaves and down the shaft.
//     `props.js` builds that run, and it is the one thing on this site the
//     player walks under rather than round.
//   · Nothing here is tall except the headframe. The silhouette of this game is
//     one steel frame on an empty moor with a horizontal yard under it, so the
//     buildings are low and the horizon ranks are hills rather than anything
//     built.

const PI = Math.PI;

/** A run of marker posts: the bench track out to the gravity station. */
const posts = (x0, z0, x1, z1, n, height = 1.2) => Array.from({ length: n }, (_, i) => ({
  kind: 'post',
  x: x0 + ((x1 - x0) * i) / (n - 1),
  z: z0 + ((z1 - z0) * i) / (n - 1),
  height,
  r: 0.06,
  colour: 0x4a4740,
}));

export const site = {
  kind: 'outdoor',
  name: 'Kerrow No. 3',

  terrain: {
    // A bench cut into a moor: level where the plant stands, rolling beyond it.
    // The player has to reach the gravity station at z = -290.
    size: 1000, segments: 300, playerLimit: 340,
    profile: 'rolling', relief: 1.6,
    // Peat and moor grass over shale, written darker and browner than moorland
    // looks on the canvas: house rule 19, so the crushed-stone yard and the
    // steel read as separate values from the ground they stand on.
    ground: { base: [62, 58, 44], spread: [18, 17, 12], repeat: 28, normalRepeat: 260 },
  },

  // Northern, high, and usually overcast. Enough haze to put the far ranks
  // behind something without greying the yard.
  atmosphere: {
    turbidity: 7.5, rayleigh: 1.4, mie: 0.012, mieG: 0.80,
    // Outside the horizon ranks, which reach 880 m here — see house rule 18.
    scale: 1100, stars: 1000,
    haze: { day: 0x99a09c, night: 0x0f1214 },
  },

  // Strongly negative, because `pathTexture`'s base is a light grey 112 and this
  // ground is dark peat at 62: without it the yard reads as a sheet laid over the
  // moor rather than as crushed stone graded into it.
  // Every path carries a `colour` as well as a `tone`: the decal's material has
  // no envMapIntensity cap, so under a bright sky IBL an untinted grit texture
  // renders near-white and the road reads as a sheet of ice. House rule 6, and this
  // ground is darker still.
  paths: [
    { cx: 0, cz: 26, w: 10, d: 100, worn: 6, tone: [-40, -36, -30], colour: 0x5f5b50 },   // the yard, spawn to the shaft
    { cx: -22, cz: 14, w: 40, d: 6, worn: 5, tone: [-40, -36, -30], colour: 0x5f5b50 },   // across to the winder house
    { cx: 26, cz: -14, w: 6, d: 44, worn: 5, tone: [-40, -36, -30], colour: 0x5f5b50 },   // out to the tip
    { cx: -36, cz: -140, w: 5, d: 250, worn: 3, tone: [-40, -36, -30], colour: 0x5f5b50 },// the bench track
    { cx: -54, cz: -288, w: 34, d: 5, worn: 3, tone: [-40, -36, -30], colour: 0x5f5b50 }, // the last leg to the hut
  ],

  // Painted in what a mine gets painted in: oxide red steel, grey harling, one
  // yellow lamp room. The headframe is the only dark thing above four metres.
  buildings: [
    { id: 'BANK', group: 'BANK', name: 'The Bank',
      x: -9, z: -4, w: 13, d: 9, h: 5.4, facing: PI, colour: 0xa8a49a },
    { id: 'WIND', group: 'WIND', name: 'Winder House',
      x: -30, z: 6, w: 20, d: 14, h: 8.6, facing: PI / 2, colour: 0x9c5f45 },
    { id: 'ROPE', group: 'ROPE', name: 'Rope Shop',
      x: -34, z: 34, w: 14, d: 9, h: 4.6, facing: PI, colour: 0x8f8b80 },
    { id: 'CAGE', group: 'CAGE', name: 'Shaft and Brake House',
      x: 20, z: -4, w: 12, d: 9, h: 4.8, facing: PI, colour: 0x9c9790 },
    { id: 'TIP', group: 'TIP', name: 'Tip and Conveyor',
      x: 34, z: -30, w: 16, d: 11, h: 7.4, facing: PI, colour: 0x8a7f6a },
    // Three hundred metres out on the bench, which is what makes this a
    // two-tier site.
    { id: 'GRAV', group: 'GRAV', name: 'Gravity Station',
      x: -70, z: -290, w: 7, d: 6, h: 3.2, facing: PI / 2, colour: 0xbdb8a8 },

    // No group: the plant the mechanics sits inside.
    { id: 'COMPRESSOR', name: 'Compressor House', sub: 'Air for the drills below',
      x: 40, z: 22, w: 14, d: 10, h: 5.6, facing: PI, colour: 0x8f8b80 },
    { id: 'LAMP', name: 'Lamp Room', sub: 'Forty-one lamps, forty-one tallies',
      x: 12, z: 8, w: 8, d: 6, h: 3.4, facing: PI, colour: 0xc9a23f },
    // Off the axis on purpose: at x = 6 this stood between the spawn and the
    // headframe and the first frame of the game was a grey wall. House rule 8 is
    // about the route; this is the same rule about the *view*, and only a
    // screenshot shows it.
    { id: 'CHANGE', name: 'Change House', sub: 'Where a shift starts and ends',
      x: 28, z: 44, w: 16, d: 10, h: 4.2, facing: PI, colour: 0xa39d8c },
  ],

  // The map should show the ground people stand on rather than 300 m of moor.
  mapBounds: { x0: -100, x1: 100, z0: -310, z1: 100 },

  board: { x: 14, z: 52, facing: PI, title: 'Shift board' },

  furniture: [
    { kind: 'bench', x: -2, z: 46, facing: PI },
    { kind: 'bin', x: 18, z: 44 },
    // The bench track, marked the whole way out, and two posts at the shaft
    // fence line.
    ...posts(-36, -20, -36, -262, 14),
    ...posts(-56, -286, -66, -286, 3),
    { kind: 'post', x: -3, z: 4, height: 2.4, r: 0.09, colour: 0x6f6a5c },
    { kind: 'post', x: 5, z: 4, height: 2.4, r: 0.09, colour: 0x6f6a5c },
  ],

  // Moor grass and heather, kept off the yard and out onto the bench.
  scrubCount: 170,
  scrubColour: 0x55583a,
  scrubBand: [90, 420],

  // Moorland hills, two ranks, hazed. Nothing built on the skyline: the point
  // of the headframe is that it is the only vertical thing for a mile.
  horizon: [
    { radius: 620, height: 34, colour: 0x6c7568, haze: 0.62 },
    { radius: 880, height: 52, colour: 0x7e8678, haze: 0.82 },
  ],

  // yaw 0 is -Z: this looks straight up the yard at the headframe, which is the
  // only thing on the skyline and is meant to be the first thing anybody sees.
  spawn: { x: 0, z: 70, yaw: 0 },
};

export default site;
