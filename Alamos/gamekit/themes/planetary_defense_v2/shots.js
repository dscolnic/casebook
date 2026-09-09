// shots.js — where to stand to photograph Cerro Alto, at night.
//
// `engine/dev/shots.mjs` reads VIEWS. Without it the tool turns on the spot at
// the spawn and takes eight views of the same fifty metres of road, which on a
// two-and-a-half-kilometre range is eight photographs of nothing. Every site
// here is a kilometre from the next, so the useful contact sheet is one view
// per landform plus the two things the whole place is built around: the domes,
// and the sky over them.
//
// THE SHOTS ARE NIGHT SHOTS AND THAT IS THE TEST. The tool puts the clock in
// the middle of `look.dayWindow` before it renders, and this game's window is
// [19, 31] — so mid-window is 01:00 and every frame below is taken under the
// stars, with the sun switched off and nothing lighting the range but the
// ambient term and whatever emits. If a building cannot be found in these, the
// building cannot be found in play.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z,
// which on this site is uphill toward the saddle and the summits beyond it, and
// θ = π looks back down toward the valley and Valle Seco.
//
// ONE THING THIS FILE CANNOT DO: point the camera up. `player.teleport` sets
// `camera.rotation.set(0, yaw, 0)` — pitch is zeroed, and there is no pitch key
// in the view format — so there is no straight-up view of the Milky Way to be
// had here. The band is instead caught where it comes DOWN, at the south-east
// bearing the valley opens on, which is the bearing `props.js` aims it at for
// exactly this reason. See the note on `milkyWay()`.
const N = 0;
const S = Math.PI;
// Where the band meets the horizon: south-east, down the valley the road climbs.
const SE = -Math.PI * 0.75;

export const VIEWS = [
  { name: 'the-road-up', at: { x: 2, z: 62 }, yaw: N,
    note: 'the spawn, looking up the road — the pools under the red lamps should '
      + 'make the road a road, and the domes should be findable on the skyline' },

  { name: 'coordination-office', at: { x: -30, z: 62 }, yaw: N,
    note: 'the Coordination Office front. The window band and the lamp over the door '
      + 'are emissive, not lit: if this reads as a dark box the night rig is wrong' },

  { name: 'base-camp', at: { x: 30, z: 120 }, yaw: N,
    note: 'the saddle from the south — the office, the board, the archive and the '
      + 'quarters at once. The quarters have blackout blinds and only a door lamp' },

  { name: 'the-pad', at: { x: 6, z: 122 }, yaw: N,
    note: 'base camp pad: the perimeter ring, the strobe on its mast, and the '
      + 'helicopter with its rotor turning slowly on the deck' },

  { name: 'the-relay-mast', at: { x: 96, z: -34 }, yaw: N,
    note: 'the microwave relay, forty-five metres of it. Three aviation strobes '
      + 'flashing together near the top; the drums face off-ridge' },

  { name: 'survey-telescope', at: { x: -690, z: -655 }, yaw: 2.36,
    note: 'the Survey Telescope from its own pad on Cerro Alto. The shutter and the '
      + 'tube slew together, a few degrees a minute — two stills a minute apart differ' },

  { name: 'the-radar', at: { x: -965, z: 400 }, yaw: N,
    note: 'the planetary radar on the basin floor, sweeping in azimuth. The dish '
      + 'should turn about the vertical, not roll' },

  { name: 'valle-seco-from-the-ridge', at: { x: 26, z: 168 }, yaw: -3.05,
    note: 'over the cattle guard at the boundary, down the valley: the town the '
      + 'campaign is defending, as a field of window lights that shimmer' },

  { name: 'the-milky-way', at: { x: 26, z: 168 }, yaw: SE,
    note: 'south-east, where the band comes down to the horizon. The camera cannot '
      + 'be pitched up from here, so this is the band at its lowest — it should rise '
      + 'out of the skyline and leave the top of the frame' },

  { name: 'the-valley-road', at: { x: 200, z: 340 }, yaw: S,
    note: 'the switchbacks and the headlights coming up them; nothing on this '
      + 'horizon but the far ranges and the sky reaching down to them' },

  // ------------------------------------------------------ the story layer
  // story.js: the world changing mission by mission. Run with `--day 15` (or
  // a won save) for the convoy, the open shutter and the tracking dish.
  { name: 'mission-header', at: { x: 12, z: 60 }, yaw: N,
    note: 'the header board beside the road at the spawn — the bible\'s own line, '
      + 'MISSION n - h HOURS TO THE PREDICTED ENCOUNTER, under its red hood lamp' },

  { name: 'dome-catwalk', at: { x: -118, z: 50 }, yaw: N,
    note: 'the disused dome on its plinth, the railed deck south of it and the '
      + 'shutter leaves — a slit of sky until mission 15, then open with the '
      + 'dome\'s red working light inside' },

  { name: 'ridge-terrace', at: { x: 40, z: 164 }, yaw: S,
    note: 'the terrace at the boundary: the rail along the drop, two benches, '
      + 'the binoculars, the sign — and the town a kilometre and a half below. '
      + 'From mission 12 amber beacons wave across it; once won, marked buses leave' },

  { name: 'night-kitchen', at: { x: -33.5, z: 115 }, yaw: N,
    note: 'the porch on the west end of the Night Crew Quarters under its one '
      + 'warm lamp: cold cups, the untouched meal, the dawn clock, the radio — '
      + 'and from mission 11 the closed Aegis binder by the cup' },

  { name: 'the-generator', at: { x: -80, z: 92 }, yaw: N,
    note: 'the running set outside the fuel bund, its amber inspection lamp '
      + 'shimmering at the engine\'s own frequency, exhaust off the stack' },

  { name: 'the-dish-parked', at: { x: -965, z: 400 }, yaw: N,
    note: 'the radar stowed at zenith on any night but 7 and 14 — compare with '
      + '"the-radar", which is the same view on an echo night, dish down and sweeping' },
];

export default VIEWS;
