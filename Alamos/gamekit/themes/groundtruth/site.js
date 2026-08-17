// site.js — Station 12, Sablon Flats, as data. Outdoor, flat, and under weather.
//
// `engine/world/outdoorTown.js` builds all of it. The place is a lightning
// research station on a coastal salt flat: a sixty-metre instrumented mast, a
// launch rail out to the north of it, an impulse hall and a compound behind,
// and an outstation trailer two hundred metres away that the campaign is about.
//
// Looking down, -Z is away from the player at spawn:
//
//                    [ Launch Rail ]                       z = -74
//                       ¦ mast ¦                           z = -20   (props.js)
//   [ Earthing ]                    [ Mast Base ]          z =  -6
//                                   [ Impulse Hall ]       z =  12
//   [ Field Station ]                      [ Screened Room ] z = 26
//        [ Launch Control ]                 [ Crew Shelter ]  z = 30
//                 ¤ spawn ¤                                   z = 52
//
//   Nothing stands on the axis between the spawn and the mast. That is
//   deliberate: the first frame of this game is sixty metres of lattice alone on
//   a flat, and the first version had launch control parked in front of it.
//
//                    [ Outstation ]                        z = 180
//
// Three things here are load-bearing rather than decorative:
//
//   · The outstation is 200 m from the mast because that is the distance the
//     campaign argues about, and the day budget is measured from the route — so
//     a call out there really does cost most of a morning.
//   · The flat is empty on purpose and the mast is the only thing on the
//     skyline. `props.js` builds it, and it is the whole silhouette of the game.
//   · The sky is a storm sky. Preetham solves for a clear atmosphere, so the
//     grey comes from `atmosphere.tint` and `atmosphere.haze` — the two keys Red
//     Sand added for a Martian sky, used here for weather. Set one without the
//     other and a seam appears along the horizon.

const PI = Math.PI;

/** A run of marker posts: the trench route, and the walk out to the outstation. */
const posts = (x0, z0, x1, z1, n, height = 1.2) => Array.from({ length: n }, (_, i) => ({
  kind: 'post',
  x: x0 + ((x1 - x0) * i) / (n - 1),
  z: z0 + ((z1 - z0) * i) / (n - 1),
  height,
  r: 0.05,
}));

export const site = {
  kind: 'outdoor',
  name: 'Station 12, Sablon Flats',

  terrain: {
    // The outstation sits at z = 180 and the player has to be able to walk to
    // it and back, so the limit is well beyond the buildings rather than around
    // them.
    size: 900, segments: 300, playerLimit: 260,
    profile: 'flat', relief: 0.5,
    // Salt crust over damp sand. Written darker and greyer than salt looks:
    // under a bright sky IBL anything near white blows out, and the whole point
    // of this ground is that it reads as a surface rather than as a sheet.
    ground: { base: [140, 136, 126], spread: [14, 13, 12], repeat: 22, normalRepeat: 200 },
  },

  // Storm. The recipe is in two halves and both are needed: `rayleigh` near zero
  // takes the dome from blue to white — that uniform is the only one that moves
  // it along that axis — and `tint` then greys the white. Tinting a blue sky
  // grey leaves it blue, which is what the first two passes at this looked like.
  // High turbidity and mie put something in the air. `haze` has to match the
  // tint or the far ranks sit against a different sky from the one above them.
  atmosphere: {
    turbidity: 14.0, rayleigh: 0.15, mie: 0.060, mieG: 0.86,
    scale: 900, stars: 900,
    tint: 0x79808a,
    haze: { day: 0x646b76, night: 0x0e1116 },
    nightSky: 0x0a0d12,
    nightTurbidity: 1.2, nightRayleigh: 0.5,
  },

  // Graded tracks over the crust: the service road down the middle of the site,
  // the spur out to the pad, and the long run north to the outstation, which is
  // also where the cable trench is.
  paths: [
    { cx: 0, cz: 10, w: 7, d: 90, worn: 6, tone: [-6, -4, -2] },
    { cx: 0, cz: -50, w: 5, d: 50, worn: 5, tone: [-6, -4, -2] },
    { cx: 3, cz: 108, w: 4, d: 150, worn: 4, tone: [-6, -4, -2] },
    { cx: -22, cz: 6, w: 40, d: 5, worn: 4, tone: [-6, -4, -2] },
  ],

  // Painted in what a research station gets painted in: pale grey boxes, one
  // yellow shed and a white trailer, so the mast is the only dark thing.
  buildings: [
    { id: 'FIELD', group: 'FIELD', name: 'Field Station',
      x: -34, z: 26, w: 12, d: 8, h: 3.6, facing: 0, colour: 0x9aa3a8 },
    { id: 'BANK', group: 'BANK', name: 'Impulse Hall',
      x: 34, z: 12, w: 20, d: 13, h: 7.2, facing: 0, colour: 0xb0a48c },
    { id: 'MAST', group: 'MAST', name: 'Mast Base',
      x: 14, z: -6, w: 9, d: 7, h: 3.2, facing: 0, colour: 0x8f959a },
    { id: 'EARTH', group: 'EARTH', name: 'Earthing Compound',
      x: -30, z: -6, w: 11, d: 8, h: 3.0, facing: 0, colour: 0x8a8f86 },
    { id: 'SHOT', group: 'SHOT', name: 'Launch Control',
      x: -17, z: 30, w: 14, d: 9, h: 4.0, facing: PI, colour: 0x9aa3a8 },
    // Two hundred metres out, which is the distance the whole campaign is
    // about. The walk is the point.
    { id: 'COUPLE', group: 'COUPLE', name: 'Outstation',
      x: 3, z: 180, w: 9, d: 4.5, h: 3.0, facing: PI, colour: 0xc8c6bd },

    // No group: the station the science sits inside.
    { id: 'SCREEN', name: 'Screened Room', sub: 'Conducting sheet on all six faces',
      x: 19, z: 26, w: 7, d: 6, h: 3.2, facing: PI, colour: 0x7f858a },
    { id: 'SHELTER', name: 'Crew Shelter', sub: 'Where the flat is watched from',
      x: 17, z: 42, w: 9, d: 6, h: 3.0, facing: PI, colour: 0xc9a23f },
    { id: 'ROCKETS', name: 'Rocket Store', sub: 'Wire spools and igniters, counted out and counted back',
      x: -14, z: -52, w: 7, d: 5, h: 2.8, facing: -PI / 2, colour: 0x8a8f86 },
  ],

  board: { x: -11, z: 44, facing: PI, title: 'Season board' },

  furniture: [
    { kind: 'bench', x: -13, z: 40, facing: PI },
    { kind: 'bin', x: 12, z: 38 },
    // The trench route, marked the whole way out to the trailer, and the posts
    // along the pad spur.
    ...posts(3, 40, 3, 176, 18),
    ...posts(-4, -32, -4, -70, 6),
    ...posts(4, -32, 4, -70, 6),
  ],

  // Salt crust. Nothing grows on it within the site, and the band is kept so the
  // far field stays bare rather than being filled with something that reads as
  // scrub from the mast.
  scrubCount: 60,
  scrubColour: 0x7d7a67,
  scrubBand: [200, 420],

  // The flattest horizon in the set after Ice Core's, and for the opposite
  // reason: this one is a coast, so there is a low dune line one way and
  // nothing at all the other.
  horizon: [
    { radius: 560, height: 9, colour: 0x8d94a0, haze: 0.70 },
    { radius: 780, height: 14, colour: 0x969ca8, haze: 0.86 },
  ],

  // yaw 0 is -Z: this looks straight down the site at the mast, which is the
  // only thing on the skyline and is meant to be the first thing anybody sees.
  spawn: { x: 0, z: 52, yaw: 0 },
};

export default site;
