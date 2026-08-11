// site.js — Cerro Alto, at night, as data.
//
// This is the one game in the set that is played in the dark. An observatory
// works nights, and the campus is built for that: nothing is where it is for
// convenience, it is where it is because of what it can and cannot see.
//
// The shape is a RIDGE, not a grid. There is one road, it runs the length of
// the mountain, and everything hangs off it at the elevation its instrument
// needs. You do not cross a town square here — you walk a long dark road with
// domes above you on one side and the drop on the other, and the distances are
// deliberately longer than a city's, because a survey telescope and a radar
// transmitter cannot sit near each other.
//
// Along the road, from the gate up (-Z is uphill):
//
//   z = -150   [ Survey Dome ]        the highest and darkest point
//   z =  -96                   [ Spectroscopy Dome ]
//   z =  -42   [ Orbit Determination ]
//   z =    6                   [ Entry & Consequences ]
//   z =   54   [ Coordination Office ]      ¤ spawn at (6, 74) ¤
//   z =  120                   [ Planetary Radar ]  far out, on the flat
//
// Two rules this file is careful about. Every `group` must exist in
// content/groups.js or that area's calls are unreachable. And the spawn has ten
// clear metres around it — a prop over the spawn welds the player in place, and
// the scene still renders perfectly.

const PI = Math.PI;

/**
 * One per area of study, strung along the ridge road rather than facing a
 * square. `dome: true` is read by props.js, which puts a hemisphere with an
 * open shutter on top of the building instead of a roof.
 */
const AREA_BUILDINGS = [
  { id: 'DISC', group: 'DISC', name: 'Survey Telescope', dome: 12.5,
    x: -30, z: -150, w: 20, d: 20, h: 7.0, facing: 0, colour: 0x6e6a66 },
  { id: 'CHAR', group: 'CHAR', name: 'Spectroscopy Dome', dome: 9.5,
    x: 34, z: -96, w: 16, d: 16, h: 6.0, facing: 0, colour: 0x6a6764 },
  { id: 'ORBIT', group: 'ORBIT', name: 'Orbit Determination', dome: 0,
    x: -34, z: -42, w: 22, d: 13, h: 5.4, facing: 0, colour: 0x5f5f63 },
  { id: 'IMPACT', group: 'IMPACT', name: 'Entry & Consequences Lab', dome: 0,
    x: 34, z: 6, w: 22, d: 13, h: 5.4, facing: 0, colour: 0x64605c },
  { id: 'OPS', group: 'OPS', name: 'Coordination Office', dome: 0,
    x: -32, z: 54, w: 24, d: 14, h: 5.6, facing: 0, colour: 0x605d5a },
  // The radar sits far down the road and away from everything: a megawatt
  // transmitter beside an optical telescope ruins both.
  { id: 'RADAR', group: 'RADAR', name: 'Planetary Radar Control', dome: 0,
    x: 46, z: 120, w: 20, d: 12, h: 5.0, facing: PI, colour: 0x5c5f63 },
];

const LANDMARKS = [
  { id: 'BOARD', name: 'Campaign Briefing Hall', sub: 'Where the board sits',
    x: 0, z: -196, w: 22, d: 13, h: 6.2, facing: 0, colour: 0x585a60, accent: 0x8a2d22 },
  { id: 'TIME', name: 'Time and Frequency Standards', sub: 'Every timestamp on this mountain',
    x: -60, z: -6, w: 12, d: 9, h: 4.2, facing: PI / 2, colour: 0x5a5754 },
  { id: 'ARCHIVE', name: 'Plate and Data Archive', sub: 'Every image the survey has taken',
    x: 62, z: -48, w: 14, d: 10, h: 4.6, facing: -PI / 2, colour: 0x5a5754 },
  { id: 'DORM', name: 'Night Crew Quarters', sub: 'Blackout blinds, and a rule about noise',
    x: -58, z: 96, w: 18, d: 11, h: 4.8, facing: PI, colour: 0x5d5a57 },
];

export const site = {
  kind: 'outdoor',
  name: 'Cerro Alto',

  terrain: {
    // A long site: the road alone is 320 metres, which is the point — this
    // campaign is walked, and its distances are what the day's budget reads.
    size: 900, segments: 320, playerLimit: 240,
    profile: 'flat', relief: 2.4,
    // Volcanic scree under starlight. Almost no colour, and dark: at night the
    // ground is lit by the sky and a few red lamps, nothing else.
    // Night values were [46, 43, 40] — under a daytime sun that reads as
    // near-black asphalt across the whole ridge. Lifted to a dry mountain
    // gravel; put the darker pair back with the nocturnal dayWindow.
    ground: { base: [96, 90, 82], spread: [22, 20, 18], repeat: 16, normalRepeat: 150 },
  },

  // Thin, dry, high air — which is why an observatory is here at all. Low
  // turbidity and low Mie scattering give a hard dark sky, and the star count
  // is four times a river valley's.
  // `nightTurbidity` / `nightRayleigh` are the floor the sky falls to after
  // dark. The engine's default floor is tuned so a daytime game's 3 a.m. is not
  // pitch black; here the campaign never leaves the dark, and at that floor the
  // dome renders grey with the stars on a pale field.
  atmosphere: {
    turbidity: 1.6, rayleigh: 1.2, mie: 0.0015, mieG: 0.82, scale: 950, stars: 4200,
    nightTurbidity: 0.02, nightRayleigh: 0.015,
    // Deep night hides the sky dome and paints this instead — the physical sky
    // has a radiance floor that tone mapping lifts to grey, and no uniform
    // reaches it. Not pure black: a mountain sky under starlight is a very dark
    // blue, and pure black makes the horizon ranks disappear.
    // Only used below deep night, which a daytime window never reaches. Left in
    // place so restoring dayWindow: [19, 31] restores the night sky with it.
    nightSky: 0x05070d,
  },

  // One road the length of the ridge, and two short spurs. No grid anywhere.
  paths: [
    { cx: 0, cz: -30, w: 9, d: 380, worn: 7 },     // the ridge road
    { cx: -22, cz: -150, w: 34, d: 7, worn: 4 },   // spur to the survey dome
    { cx: 30, cz: 120, w: 40, d: 7, worn: 4 },     // spur to the radar
  ],

  buildings: [...AREA_BUILDINGS, ...LANDMARKS],

  board: { x: 8, z: 62, facing: PI, title: 'Campaign Status' },

  // Sparse, and all of it beside the road. A mountain site has no street
  // furniture to speak of — posts carrying the red service lamps, and a bench
  // outside the coordination office where people take their break in the cold.
  furniture: [
    { kind: 'post', x: 7, z: -170, height: 3.6, r: 0.1, colour: 0x3a3a3e },
    { kind: 'post', x: -7, z: -120, height: 3.6, r: 0.1, colour: 0x3a3a3e },
    { kind: 'post', x: 7, z: -70, height: 3.6, r: 0.1, colour: 0x3a3a3e },
    { kind: 'post', x: -7, z: -20, height: 3.6, r: 0.1, colour: 0x3a3a3e },
    { kind: 'post', x: 7, z: 30, height: 3.6, r: 0.1, colour: 0x3a3a3e },
    { kind: 'post', x: -7, z: 80, height: 3.6, r: 0.1, colour: 0x3a3a3e },
    { kind: 'bench', x: -14, z: 60, facing: PI / 2 },
    { kind: 'bin', x: 9, z: 66 },
  ],

  // Scrub only low down; the summit is bare rock. `scrubBand` is a distance
  // band from the origin, so keeping it wide and thin puts vegetation on the
  // lower slopes and none along the ridge.
  scrubCount: 260,
  scrubColour: 0x3f4432,
  scrubBand: [90, 300],

  // Ranges beyond the ridge, nearly black under starlight.
  horizon: [
    { radius: 460, height: 74, colour: 0x2a2f36, haze: 0.3 },
    { radius: 640, height: 108, colour: 0x333a42, haze: 0.5 },
    { radius: 820, height: 140, colour: 0x3c434b, haze: 0.68 },
  ],

  // On the road below the coordination office, looking uphill at the domes.
  spawn: { x: 6, z: 74, yaw: 0 },
};

export default site;
