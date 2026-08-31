// site.js — Sarn Barrage and the Sarn estuary, as data. Outdoor, low, and tidal.
//
// `engine/world/outdoorTown.js` builds all of it. The place is a tidal barrage
// across the neck of an estuary: six gates and a turbine hall on the line of the
// barrage, the offices behind it on the landward side, and a training wall
// running seaward from the eastern abutment with a station at its root.
//
// Looking down, -Z is seaward and away from the player at spawn:
//
//                    ~ the estuary, to the horizon ~          z = -240
//        ¦ the training wall, running seaward ¦                z = -140
//   — — the barrage: six gates across the water — —            z = -12
//                                        [ Wall Station ]      z =   0, x = 170
//        [ Gauge Tower ] [ Sluice Control ] [ Turbine Hall ]   z =   4
//   [ Boat Shed ]  [ Survey Pontoon ]      [ Currents Room ]   z =  16
//        [ Prediction Office ]      [ Mud Laboratory ]         z =  40
//                       ¤ spawn ¤                              z =  70
//
// Three things here are load-bearing rather than decorative:
//
//   · The Wall Station is 224 m from the spawn and everything else is inside
//     80 m, which is what makes `engine/core/orientation.js` call this a
//     two-tier site: the far lap and the vehicles come out on day 4. Move it in
//     and the second lap silently stops being offered.
//   · The water is a channel rather than open sea, because a channel cuts a bed
//     into the terrain and leaves a bank along its landward edge. On a flat
//     profile an `open: true` plane sits *under* the ground and renders as
//     nothing at all. Here the cut edge lands on the barrage line itself, so the
//     gates have water on one face and mud on the other.
//   · The site is deliberately low and wide. Nothing here is taller than the
//     gauge tower, so the silhouette is a horizontal line of gates with one
//     vertical beside it, and the horizon ranks are the far shore rather than
//     hills.

const PI = Math.PI;

/** A run of marker posts: the causeway out to the wall, and the flats route. */
const posts = (x0, z0, x1, z1, n, height = 1.3) => Array.from({ length: n }, (_, i) => ({
  kind: 'post',
  x: x0 + ((x1 - x0) * i) / (n - 1),
  z: z0 + ((z1 - z0) * i) / (n - 1),
  height,
  r: 0.06,
  colour: 0x4c4a42,
}));

export const site = {
  kind: 'outdoor',
  name: 'Sarn Barrage',

  terrain: {
    // Wide and flat: an estuary neck with reclaimed ground behind it. The
    // player has to reach the wall station at z = -196 and the marsh road at
    // z = 100, so the limit is well outside the buildings.
    size: 1200, segments: 320, playerLimit: 300,
    profile: 'flat', relief: 0.6,
    // Estuary silt over reclaimed fill. Written darker and browner than mud
    // looks on the canvas: house rule 19, and the concrete of the barrage has to
    // read as a separate value from the ground it stands on.
    ground: { base: [78, 71, 58], spread: [16, 15, 12], repeat: 26, normalRepeat: 240 },
  },

  // The channel. `open` is deliberately left off: a channel cuts a bed through
  // the terrain and leaves a low bank along its landward edge, which is exactly
  // what the seaward end of this site is.
  water: {
    cx: 0, cz: -246, width: 1600, depth: 464, level: -0.9,
    // The seaward edge lands on z = −10, which is the barrage line: the gates
    // hold water on their far face and mud on this one, which is the whole
    // point of the place. `bank` is left at its default 1.6 m of bed, and the
    // low kerb `buildWater` leaves along that edge is under the barrage.
    colour: 0x33474b, roughness: 0.22, metalness: 0.22,
  },

  // Temperate maritime, with enough haze to put the far shore behind something.
  atmosphere: {
    turbidity: 5.6, rayleigh: 1.9, mie: 0.009, mieG: 0.78,
    // The sky dome has to be *outside* the horizon ranks, which reach 940 m here:
    // ranks poking through the dome is house rule 18 seen from the other side.
    scale: 1200, stars: 1100,
    haze: { day: 0x9aa6ab, night: 0x101519 },
  },

  // The tone is strongly negative because `pathTexture`'s own base is 112 — a
  // light grey — and this ground is dark estuary silt at 78. Without it the
  // graded track reads as a sheet of ice laid over mud. House rule 19 again,
  // one layer up: the road and the ground have to be a value apart, and it is
  // the road that has to move here.
  // Every path carries a `colour` as well as a `tone`: the decal's material has
  // no envMapIntensity cap, so under a bright sky IBL an untinted grit texture
  // renders near-white and the road reads as a sheet of ice. House rule 6, one
  // layer down from the buildings.
  paths: [
    { cx: 0, cz: 20, w: 9, d: 130, worn: 6, tone: [-30, -26, -22], colour: 0x6e6a5c },    // the barrage road
    { cx: 34, cz: 34, w: 60, d: 5, worn: 4, tone: [-30, -26, -22], colour: 0x6e6a5c },    // spur east to the offices
    { cx: -32, cz: 12, w: 46, d: 5, worn: 4, tone: [-30, -26, -22], colour: 0x6e6a5c },   // spur west to the pontoon
    { cx: 120, cz: 4, w: 190, d: 5, worn: 4, tone: [-30, -26, -22], colour: 0x6e6a5c },   // the shore track east
    { cx: 166, cz: 8, w: 5, d: 22, worn: 3, tone: [-30, -26, -22], colour: 0x6e6a5c },   // the last leg to the station
  ],

  // Painted in what a barrage gets painted in: grey concrete, one green
  // turbine hall, white offices. The gauge tower is the only pale vertical.
  buildings: [
    { id: 'PRED', group: 'PRED', name: 'Prediction Office',
      x: -26, z: 40, w: 15, d: 10, h: 4.2, facing: PI, colour: 0xb4b2a8 },
    { id: 'SLUICE', group: 'SLUICE', name: 'Sluice Control',
      x: 10, z: 4, w: 12, d: 8, h: 4.6, facing: PI, colour: 0x9aa0a2 },
    { id: 'TRACK', group: 'TRACK', name: 'Survey Pontoon',
      x: -42, z: 16, w: 13, d: 9, h: 3.4, facing: PI / 2, colour: 0xa9a79b },
    { id: 'ROSE', group: 'ROSE', name: 'Currents Room',
      x: 20, z: 20, w: 12, d: 9, h: 4.0, facing: PI, colour: 0xb0aea2 },
    { id: 'FLATS', group: 'FLATS', name: 'Mud Laboratory',
      x: 30, z: 42, w: 14, d: 9, h: 3.8, facing: PI, colour: 0xa39d8c },
    // A hundred and seventy metres along the shore to the east, at the root of
    // the training wall, which is what makes this a two-tier site. It has to sit
    // landward of z = −14: the water rectangle spans the whole width of the map,
    // so the shoreline is that line everywhere and anything seaward of it is in
    // the estuary. The first version of this building was standing in the sea up
    // to the crew's shoulders, which no check could see and one screenshot did.
    { id: 'WALL', group: 'WALL', name: 'Wall Station',
      x: 170, z: 0, w: 9, d: 7, h: 3.6, facing: 0, colour: 0xc0bcae },

    // No group, and now `enter:` — the barrage itself and what stands on it.
    //
    // Three of these four were modelled, lit, walkable up to and SHUT, because
    // an interior in this engine is keyed by an area and none of them is an
    // area. Each is somewhere the questions already are: the eleven floats are
    // day 6's, the generation report's mean value is day 11's, and the warning
    // post is where the ninety graziers on the opening card read the call.
    // `enter:` gives a building an interiors key without making it an area — a
    // door, a room, no case stand and no delivery board. Each of the three
    // carries a sited question, which is what opens it
    // (engine/core/access.js), so none of them is a door with nothing behind
    // it. See ./minors.js and gamekit/PLACEMENT_PASS.md.
    //
    // THE GAUGE TOWER IS DELIBERATELY STILL A FACADE, and the reason is worth
    // writing down because it is not a judgement about the fiction. The stilling
    // well's forty minutes is the campaign's central operational trade-off and
    // the tower is the obvious room for it — but the only question about it,
    // day 4's "Forty minutes of water", is the day's PERSON stop, and
    // `map.js` gives a person stop a person to find rather than a place to walk
    // to (`callLabel` returns "Talk to Oyelaran" and ignores the sited place).
    // Siting it here would open a door on day 4 and send nobody through it,
    // which is exactly the dead room PLACEMENT_PASS.md's step 6b exists to
    // prevent. Better a facade than a room nobody is ever sent to.
    { id: 'TURBINE', enter: 'TURBINE', name: 'Turbine Hall', sub: 'Four sets, on the ebb only',
      x: 46, z: 2, w: 24, d: 12, h: 8.4, facing: PI, colour: 0x5f7a68 },
    { id: 'TOWER', name: 'Gauge Tower', sub: 'Stilling well, outer face',
      x: -12, z: 4, w: 5, d: 5, h: 13.5, facing: PI, colour: 0xcac6b8 },
    { id: 'BOAT', enter: 'BOAT', name: 'Boat Shed', sub: 'The launch, and eleven floats',
      x: -58, z: 6, w: 11, d: 8, h: 4.4, facing: 0, colour: 0x8c8577 },
    // Grown from 4 x 4 to a keeper's hut with a board on the front of it. At a
    // post you cannot walk into, the day-12 call about what the east gate closes
    // on would have been answered back in Sluice Control, three hundred metres
    // from the ninety people it is about. Still clear of the spawn at (0, 70)
    // and of the marsh road.
    { id: 'MARSH', enter: 'MARSH', name: 'Marsh Warning Post', sub: 'Where the graziers read the call',
      x: -44, z: 62, w: 8, d: 6, h: 3.4, facing: PI, colour: 0xb8a24a },
  ],

  // The map should show the ground people stand on. The union would otherwise
  // include four hundred metres of channel.
  mapBounds: { x0: -110, x1: 210, z0: -60, z1: 100 },

  board: { x: 8, z: 56, facing: PI, title: 'Tide board' },

  furniture: [
    { kind: 'bench', x: -4, z: 52, facing: PI },
    { kind: 'bin', x: 14, z: 50 },
    // Tide poles down the barrage road, and the marked route out to the wall.
    ...posts(-4, 2, -4, 30, 5, 2.6),
    ...posts(40, 4, 156, 4, 10),
    ...posts(166, 14, 166, 2, 3),
  ],

  // Saltmarsh behind the barrage and nothing at all on the flats, so the band
  // is kept landward of the site rather than round it.
  scrubCount: 90,
  scrubColour: 0x6a6b46,
  scrubBand: [110, 300],

  // The far shore of the estuary, and the low land beyond it. Two ranks, both
  // hazed hard: this is a place whose horizon is water and weather.
  horizon: [
    { radius: 700, height: 11, colour: 0x8d97a0, haze: 0.74 },
    { radius: 940, height: 17, colour: 0x99a3ac, haze: 0.88 },
  ],

  // yaw 0 is -Z: this looks straight down the barrage road at the line of gates,
  // with the gauge tower on the left and the channel behind them.
  spawn: { x: 0, z: 70, yaw: 0 },
};

export default site;
