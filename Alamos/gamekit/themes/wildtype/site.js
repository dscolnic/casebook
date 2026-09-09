// site.js — Pellow Head Island, as data. Dunes, low buildings and a marsh bay.
//
// `engine/world/outdoorTown.js` builds all of it. The place is where a submarine
// island prepares a return: a sampling point in the dunes above the tide line,
// a service trench
// up to a low concrete station, and a radiography bay three hundred metres out
// along the dunes because of what is in the pot.
//
// Looking down, -Z is seaward and away from the player at spawn:
//
//                 ~ the sea, to the horizon ~                 z = -430
//        — — — the dune crest — — —                           z = -210
//   [ Marsh Research Bay ]                                       z = -196
//                    [ Shore Sampling Point ]                 z = -120
//        [ Genetics Trailer ]      [ Field Planning Room ]                z =  -18
//   [ Seed Room ]            [ Growth Hall ]      z =    8
//        [ Field Clinic ]     [ Generator House ]             z =   34
//                     ¤ spawn ¤                               z =   70
//
// Three things here are load-bearing rather than decorative:
//
//   · The radiography bay is 307 m from the spawn and everything else is inside
//     91 m, which is what makes `engine/core/orientation.js` call this a
//     two-tier site: the far lap and the vehicles come out on day 4. It is also
//     why the bay is out there at all — a gamma source is separated by distance
//     rather than by lead, which is day nine's arithmetic standing in the world.
//   · The water is a channel rather than open sea, because a channel cuts a bed
//     into the terrain and leaves a bank along its landward edge. On a flat
//     profile an `open: true` plane sits *under* the ground and renders as
//     nothing at all. The dune crest at z = -210 is that edge.
//   · The station is one storey and the dunes are higher than it. The silhouette
//     of this game is a low concrete box with sand above it and nothing on the
//     skyline, which is what a working field station looks like: the
//     interesting object is buried.

const PI = Math.PI;

/** A run of marker posts: the service route, and the track out to the bay. */
const posts = (x0, z0, x1, z1, n, height = 1.1) => Array.from({ length: n }, (_, i) => ({
  kind: 'post',
  x: x0 + ((x1 - x0) * i) / (n - 1),
  z: z0 + ((z1 - z0) * i) / (n - 1),
  height,
  r: 0.06,
  colour: 0x8a8272,
}));

export const site = {
  kind: 'outdoor',
  name: 'Pellow Head',

  terrain: {
    // Low dunes over a shelf of rock. The player has to reach the bay at
    // z = -196 and the compound road behind the station.
    size: 1000, segments: 300, playerLimit: 280,
    profile: 'rolling', relief: 2.2,
    // Marram and sand: written darker and greyer than sand looks on the canvas,
    // house rule 19, so the concrete of the station reads as a separate value
    // from the ground it stands on.
    ground: { base: [118, 108, 84], spread: [20, 18, 14], repeat: 24, normalRepeat: 220 },
  },

  // The sea, as a channel so that a bed is cut and a bank is left along the dune
  // crest. `open` is deliberately absent.
  water: {
    cx: 0, cz: -430, width: 1600, depth: 440, level: -3.4,
    colour: 0x2f4a52, roughness: 0.20, metalness: 0.24,
  },

  // Bright coastal air with enough haze to put the horizon behind something.
  atmosphere: {
    turbidity: 4.4, rayleigh: 2.2, mie: 0.008, mieG: 0.76,
    // Outside the horizon ranks, which reach 900 m here — see house rule 18.
    scale: 1100, stars: 1200,
    haze: { day: 0xa8b2b6, night: 0x0e1216 },
  },

  // The ground here is pale sand at 118 and `pathTexture`'s base is 112, so the
  // road needs only a little taken off it to read as a separate surface — the
  // opposite end of house rule 19 from the two dark sites.
  // Every path carries a `colour` as well as a `tone`: the decal's material has
  // no envMapIntensity cap, so under a bright sky IBL an untinted grit texture
  // renders near-white and the road reads as a sheet of ice. House rule 6; on sand the
  // tint is lighter than the other two sites need.
  paths: [
    { cx: 0, cz: 26, w: 9, d: 110, worn: 6, tone: [-18, -15, -10], colour: 0x9c9482 },     // the compound road
    { cx: -26, cz: 8, w: 44, d: 5, worn: 4, tone: [-18, -15, -10], colour: 0x9c9482 },     // across to the termination room
    { cx: 4, cz: -70, w: 5, d: 120, worn: 4, tone: [-18, -15, -10], colour: 0x9c9482 },    // the duct route to the manhole
    { cx: -34, cz: -150, w: 5, d: 130, worn: 3, tone: [-18, -15, -10], colour: 0x9c9482 }, // the dune track
    { cx: -50, cz: -194, w: 40, d: 5, worn: 3, tone: [-18, -15, -10], colour: 0x9c9482 },  // the last leg to the bay
  ],

  // Painted in what a field station gets painted in: grey concrete, one green
  // trailer, a white generator house. Nothing above five metres.
  buildings: [
    { id: 'SEED', group: 'SEED', name: 'Seed Room',
      x: -28, z: 8, w: 14, d: 10, h: 4.2, facing: PI, colour: 0xb0aca0 },
    { id: 'PLAN', group: 'PLAN', name: 'Field Planning Room',
      x: 24, z: -18, w: 12, d: 9, h: 4.0, facing: PI, colour: 0xa8a49a },
    { id: 'GENE', group: 'GENE', name: 'Genetics Trailer',
      x: -22, z: -18, w: 10, d: 4.5, h: 3.2, facing: PI, colour: 0x4f7a5c },
    { id: 'GROW', group: 'GROW', name: 'Growth Hall',
      x: 16, z: 8, w: 18, d: 12, h: 5.4, facing: PI, colour: 0x9ea69f },
    { id: 'CLINIC', group: 'CLINIC', name: 'Field Clinic',
      x: -18, z: 34, w: 13, d: 9, h: 3.8, facing: PI, colour: 0xb4b0a4 },
    // Three hundred metres out in the dunes, which is what makes this a
    // two-tier site and is also the physics of day nine.
    { id: 'MARSH', group: 'MARSH', name: 'Marsh Research Bay',
      x: -70, z: -196, w: 9, d: 8, h: 3.6, facing: PI / 2, colour: 0xc2bcac },

    // No group: the shore route, and what keeps the station alive.
    //
    // `enter:` gives a building an interiors key without making it an area — no
    // case stand, no beacon, nothing called there by the day model. What sends a
    // player in is a stop SITED at a fixture declared under that key in
    // fixtures.js, which is how day 4 ends up at the power feed board and days 8
    // and 12 in the store. See themes/wildtype/minors.js.
    //
    // The sampling point deliberately has no `enter:`. It is 1.2 m high and a chamber
    // under the sand: there is nowhere in it to stand and nothing in it to ask.
    { id: 'MANHOLE', name: 'Shore Sampling Point', sub: 'Where the tide line is measured',
      x: 4, z: -120, w: 4, d: 4, h: 1.2, facing: PI, colour: 0x8f8b80 },
    { id: 'GEN', enter: 'GEN', name: 'Generator House', sub: 'Two sets, one running',
      x: 26, z: 34, w: 12, d: 9, h: 4.4, facing: PI, colour: 0xc8c4b6 },
    { id: 'STORE', enter: 'STORE', name: 'Shipping Store', sub: 'Staged for the ship on the fifteenth',
      x: -44, z: 52, w: 14, d: 9, h: 4.6, facing: PI, colour: 0x8a8272 },
  ],

  // The map should show the compound and the dune track, not 400 m of sea.
  mapBounds: { x0: -100, x1: 100, z0: -215, z1: 95 },
  // A window on the player rather than the whole site: the far station is
  // 300 m out and the whole-site map drew the yard as a blob. Everything past
  // the window is an arrow on the edge with its distance, as Planetary Defense
  // does it. See `focusBounds` in engine/core/map.js.
  mapRadius: 90,

  // Sea haze and a little drizzle; story.js clears it for the ship.
  weather: { kind: 'drizzle', density: 0.08, wind: { x: 1.4, z: 2.0 } },

  board: { x: 10, z: 54, facing: PI, title: 'Field Notice Board' },

  furniture: [
    { kind: 'bench', x: -4, z: 48, facing: PI },
    { kind: 'bin', x: 14, z: 46 },
    // The service route, marked the whole way to the shore, and the dune track.
    ...posts(4, -30, 4, -116, 9),
    ...posts(-34, -90, -34, -190, 8),
    ...posts(-52, -192, -64, -192, 3),
  ],

  // Marram grass on the dunes, kept off the compound and out towards the crest.
  scrubCount: 320,
  scrubColour: 0x8a8a52,
  scrubBand: [80, 300],

  // Low dune ranks one way and nothing the other: the horizon of this game is
  // sea on one side and sand on the other.
  horizon: [
    { radius: 640, height: 13, colour: 0x9aa39a, haze: 0.66 },
    { radius: 900, height: 20, colour: 0xa4ada6, haze: 0.86 },
  ],

  // yaw 0 is -Z: this looks up the compound road at the station, with the dunes
  // above it and the sea behind them.
  spawn: { x: 0, z: 70, yaw: 0 },
};

export default site;
