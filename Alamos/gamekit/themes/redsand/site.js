// site.js — Arcadia Rise, as data. Outdoor, and on another planet.
//
// `engine/world/outdoorTown.js` builds all of it. The place is a propellant
// plant on Arcadia Planitia: nine half-buried modules along one graded track, a
// solar field to the east, a tank farm at the far end and an ascent vehicle
// standing on a pad beyond that.
//
// **The geography is the process.** The player walks the carbon: atmosphere in
// at the top of the site, water out of the ground beside it, hydrogen made in
// the middle, the two combined in the reactor, the product cooled at the far
// end, and what survives all of that stored in the tank farm and loaded into
// the vehicle. Walking from the spawn to the pad is walking one molecule
// through the whole plant, in order, which is the same trick Quantum plays with
// its temperature gradient and the reason a call at the cold end costs a real
// part of the sol.
//
// Looking down, -Z is away from the player at spawn:
//
//                       [ Ascent Vehicle ]                    z = -132
//                        [ Tank Farm ]                        z =  -70
//        [ Reactor Hall ]            [ Cold End ]             z = -34 … -46
//        [ Water Plant  ]            [ Catalyst Bay ]         z =  -2 … -10
//        [ Intake       ]            [ Electrolysis Hall ]    z =  26 … 30
//              [ Plant Control ]                              z =   16
//   [ Habitat ]        ¤ spawn ¤        [ Garage ]            z =  40 … 52
//                                                [ Array Shed → panels ] east
//
// Three things here are load-bearing rather than decorative:
//
//   · The spawn at (0, 52) has nothing within twelve metres. A prop over the
//     spawn welds the player in place: the scene renders and W does nothing.
//   · Every `group` below is a group id in content/groups.js. A group with no
//     building is a call the player cannot reach, and `worldParity` is the only
//     check that notices.
//   · The horizon is shaped rather than concentric. A crater rim stands across
//     the north, a butte sits west, and the east is open to the plain the array
//     is laid out on — so the skyline says which way the player is facing,
//     which on a plain with no other landmarks is the whole of wayfinding.

import { ranges, N, W, NE } from '../../engine/world/horizonShape.js';

const PI = Math.PI;

/** A line of route markers. On a plain in a dust storm they are the route. */
const markers = (x0, z0, x1, z1, n) => Array.from({ length: n }, (_, i) => ({
  kind: 'post',
  x: x0 + ((x1 - x0) * i) / (n - 1),
  z: z0 + ((z1 - z0) * i) / (n - 1),
  height: 2.4,
  r: 0.06,
}));

export const site = {
  kind: 'outdoor',
  name: 'Arcadia Rise',

  terrain: {
    size: 900, segments: 300, playerLimit: 170,
    // Arcadia Planitia is one of the flattest large surfaces in the solar
    // system, which is most of why it is a landing site at all. What relief
    // there is comes from dunes and ejecta, and those are props rather than
    // terrain: a heightfield cannot make a barchan's slip face.
    profile: 'flat', relief: 0.9,
    // Regolith. Written far darker and more saturated than "red" suggests,
    // because the sky IBL here is tinted warm and multiplies straight into it —
    // the first pass at this ground was a beach.
    ground: { base: [92, 58, 41], spread: [34, 24, 17], repeat: 16, normalRepeat: 170 },
  },

  // Six millibars of carbon dioxide with dust suspended through all of it.
  //
  // `rayleigh` is near zero because there is almost no gas to scatter off, and
  // `turbidity` and `mie` are high because there is a great deal of dust — which
  // is the whole inversion of Earth's sky: the colour comes from suspended
  // particles rather than from the air, so the dome is butterscotch by day and
  // the light around the sun is the *blue* part of it. `tint` is what carries
  // that, since Preetham's model solves for nitrogen and oxygen and cannot be
  // argued into this colour by its own four uniforms. `haze` is the colour the
  // far ranks and the fog are taken toward, and it has to match the dome or a
  // seam appears along the skyline.
  atmosphere: {
    turbidity: 6.5, rayleigh: 0.32, mie: 0.021, mieG: 0.86,
    scale: 900, stars: 2400,
    tint: 0xffb488,
    haze: { day: 0xc08154, night: 0x140c0a },
    nightSky: 0x07050a,
    nightTurbidity: 0.25, nightRayleigh: 0.10,
  },

  // Rover tracks, which on this ground are *darker* than what they run over:
  // the wheels press the bright dust away and leave the coarser material under
  // it showing. `tone` is the per-channel offset the path texture is drawn with
  // and `lift` raises it toward white, so both go the other way here from every
  // other game in the set.
  paths: [
    // The main track: spawn, down past every module, out to the tank farm and
    // the pad. This is the process line, and walking it is the plant.
    { cx: 0, cz: -36, w: 11, d: 200, worn: 7, tone: [0, -26, -42], lift: -26 },
    // The spur east to the array field, and the one west to the habitat.
    { cx: 44, cz: 30, w: 90, d: 7, worn: 5, tone: [0, -24, -40], lift: -34 },
    { cx: -34, cz: 44, w: 64, d: 7, worn: 4, tone: [0, -24, -40], lift: -34 },
    // The excavation ground north-west, cut over and over for ice.
    { cx: -74, cz: -30, w: 40, d: 46, worn: 9, tone: [0, -28, -44], lift: -30 },
  ],

  buildings: [
    // The six areas of study, in process order down the site.
    { id: 'ELEC', group: 'ELEC', name: 'Electrolysis Hall',
      x: 27, z: 26, w: 22, d: 12, h: 5.6, facing: PI, colour: 0x8f9aa0 },
    { id: 'SOIL', group: 'SOIL', name: 'Water Plant',
      x: -31, z: -2, w: 20, d: 13, h: 5.4, facing: 0, colour: 0x9a8f78 },
    { id: 'KINET', group: 'KINET', name: 'Catalyst Bay',
      x: 25, z: -10, w: 18, d: 12, h: 5.6, facing: PI, colour: 0xa3936a },
    { id: 'EQUIL', group: 'EQUIL', name: 'Reactor Hall',
      x: -27, z: -34, w: 24, d: 14, h: 6.6, facing: 0, colour: 0x9c7059 },
    { id: 'PHASE', group: 'PHASE', name: 'Cold End',
      x: 29, z: -46, w: 22, d: 13, h: 6.2, facing: PI, colour: 0x7f909c },
    // Control sits where the track from the habitat meets the plant line, which
    // is where an argument about the energy budget actually happens.
    { id: 'GIBBS', group: 'GIBBS', name: 'Plant Control',
      x: -6, z: 16, w: 16, d: 11, h: 5.2, facing: 0, colour: 0x8a7f92 },

    // No group: the places that carry the station rather than a lesson.
    { id: 'INTAKE', name: 'Atmosphere Intake', sub: 'Six millibars in, twelve bar out',
      x: -30, z: 30, w: 16, d: 10, h: 4.8, facing: 0, colour: 0x87837c },
    { id: 'HAB', name: 'Habitat', sub: 'Six people, nineteen degrees',
      x: -58, z: 42, w: 26, d: 14, h: 5.8, facing: PI, colour: 0xa8a196 },
    { id: 'GARAGE', name: 'Vehicle Bay', sub: 'Two rovers and everything that comes back in with them',
      x: 48, z: 44, w: 20, d: 14, h: 6.0, facing: PI, colour: 0x8d8578 },
    { id: 'ARRAY', name: 'Array Shed', sub: 'Eighteen hundred square metres of panel',
      x: 80, z: 22, w: 12, d: 9, h: 4.2, facing: -PI / 2, colour: 0x7d8a90 },
    // East of the track rather than astride it. The first placement put the
    // tank farm and its three cryogenic tanks in the middle of the road, which
    // a straight-line route probe walked into and no check could see.
    { id: 'TANKS', name: 'Tank Farm', sub: 'Everything the plant has made so far',
      x: 17, z: -72, w: 22, d: 14, h: 4.4, facing: 0, colour: 0xb0b4b6 },
  ],

  board: { x: 9, z: 40, facing: PI, title: 'Sol board' },

  // Kept off the track (|x| < 7) so nothing narrows the route the whole plant
  // is strung along.
  furniture: [
    { kind: 'bench', x: -12, z: 34, facing: PI },
    { kind: 'bin', x: 11, z: 34 },
    ...markers(9, 48, 9, -110, 16),
    ...markers(-9, 48, -9, -110, 16),
    ...markers(36, 26, 72, 26, 6),
  ],

  // Nothing grows here, and the band is kept so the empty ring stays empty
  // rather than being filled with something that reads as vegetation.
  scrubCount: 0,
  scrubColour: 0x8a6a52,
  scrubBand: [40, 300],

  // A shaped skyline, not a bowl. The crater rim runs across the north, the
  // butte stands west of the plant, and the east is open plain — which is where
  // the array is, and why the array looks like it goes on forever.
  horizon: [
    { radius: 520, height: 30, colour: 0x6b4634, haze: 0.46,
      amp: ranges([{ at: N, width: 2.0, hi: 1.0 }, { at: W, width: 0.7, hi: 1.25 }], 0.10) },
    { radius: 780, height: 38, colour: 0x7d5540, haze: 0.72,
      amp: ranges([{ at: N, width: 2.4, hi: 1.0 }, { at: NE, width: 0.8, hi: 0.45 }], 0.08) },
  ],

  // yaw 0 is -Z, the camera's default: this looks straight down the plant line,
  // with the vehicle on the pad at the end of it.
  spawn: { x: 0, z: 52, yaw: 0 },
};

export default site;
