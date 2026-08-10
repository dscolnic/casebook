// site.js — the campaign centre, as data.
//
// The book names telescopes, radars and coordination offices across half the
// world. What it never says is where the player physically stands. This is a
// mountain campus — survey dome and image processing on the ridge, the orbit
// and characterization groups along the road below them, the radar dish at the
// far end where its transmitter cannot interfere with anything, and the
// coordination office nearest the gate because that is who visitors come for.
//
// Looking down, -Z is uphill toward the domes:
//
//   [ Survey Dome / Imaging ]    [ Spectroscopy & Characterization ]   z = -58
//        --------------- ridge road ---------------                    z = -32
//   [ Orbit Determination ]      [ Entry & Consequences ]              z =  -6
//        --------------- campus road --------------                    z =  22
//   [ Coordination Office ]              [ Planetary Radar ]           z =  44
//                     ¤ spawn ¤                                        z =  62
//
// Two things here are load-bearing rather than decorative: the spawn at (0, 62)
// has nothing within ten metres of it, and every `group` below must exist in
// content/groups.js or that area's calls cannot be reached.

const PI = Math.PI;

const AREA_BUILDINGS = [
  { id: 'DISC', group: 'DISC', name: 'Survey Dome & Image Processing',
    x: -50, z: -58, w: 26, d: 17, h: 10.5, facing: 0, colour: 0xa8a49a },
  { id: 'CHAR', group: 'CHAR', name: 'Spectroscopy & Characterization',
    x: 50, z: -58, w: 24, d: 15, h: 8.0, facing: 0, colour: 0x93a29c },
  { id: 'ORBIT', group: 'ORBIT', name: 'Orbit Determination Centre',
    x: -52, z: -6, w: 26, d: 16, h: 7.8, facing: 0, colour: 0x8f9aa2 },
  { id: 'IMPACT', group: 'IMPACT', name: 'Entry & Consequences Laboratory',
    x: 52, z: -6, w: 26, d: 16, h: 8.2, facing: 0, colour: 0xa89388 },
  { id: 'OPS', group: 'OPS', name: 'Coordination Office',
    x: -48, z: 44, w: 24, d: 15, h: 7.2, facing: PI, colour: 0xaea089 },
  { id: 'RADAR', group: 'RADAR', name: 'Planetary Radar Facility',
    x: 62, z: 44, w: 30, d: 20, h: 9.0, facing: PI, colour: 0x8a949c, accent: 0xb3462f },
];

const LANDMARKS = [
  { id: 'BOARD', name: 'Campaign Briefing Hall', sub: 'Where the board sits',
    x: 0, z: -84, w: 24, d: 15, h: 8.6, facing: 0, colour: 0x8b94a0, accent: 0x1f3b4d },
  { id: 'TIME', name: 'Time and Frequency Standards', sub: 'Every timestamp on this mountain',
    x: -86, z: 22, w: 16, d: 11, h: 5.6, facing: PI / 2, colour: 0xa79f90 },
  { id: 'ARCHIVE', name: 'Plate and Data Archive', sub: 'Every image the survey has taken',
    x: 88, z: 22, w: 18, d: 12, h: 6.0, facing: -PI / 2, colour: 0xa79f90 },
];

export const site = {
  kind: 'outdoor',
  name: 'Cerro Alto Campus',

  terrain: {
    // A mountain site: some relief, and thin dry vegetation.
    size: 800, segments: 300, playerLimit: 122,
    profile: 'flat', relief: 1.6,
    ground: { base: [82, 74, 62], spread: [40, 36, 30], repeat: 15, normalRepeat: 150 },
  },

  // High and dry: less haze, a deeper sky, and more stars than a river valley.
  atmosphere: { turbidity: 2.2, rayleigh: 1.9, mie: 0.003, mieG: 0.8, scale: 900, stars: 2200 },

  paths: [
    { cx: 0, cz: -32, w: 230, d: 9, worn: 5 },
    { cx: 0, cz: 22,  w: 230, d: 9, worn: 5 },
    { cx: 0, cz: 0,   w: 10, d: 170, worn: 6 },
  ],

  buildings: [...AREA_BUILDINGS, ...LANDMARKS],

  board: { x: 10, z: 54, facing: PI, title: 'Campaign Status' },

  furniture: [
    { kind: 'bench', x: -9, z: 34, facing: PI / 2 },
    { kind: 'bench', x: 9, z: -20, facing: -PI / 2 },
    { kind: 'bin', x: 8, z: 30 },
    { kind: 'bin', x: -8, z: -26 },
    { kind: 'post', x: 6, z: 16, height: 3.4, r: 0.11 },
    { kind: 'post', x: -6, z: 16, height: 3.4, r: 0.11 },
    { kind: 'post', x: 6, z: -38, height: 3.4, r: 0.11 },
    { kind: 'post', x: -6, z: -38, height: 3.4, r: 0.11 },
  ],

  scrubCount: 420,
  scrubColour: 0x6a6a44,
  scrubBand: [28, 260],

  horizon: [
    { radius: 500, height: 58, colour: 0x54606a, haze: 0.38 },
    { radius: 700, height: 92, colour: 0x646f79, haze: 0.6 },
  ],

  // On the campus road, clear of everything, looking uphill at the domes.
  spawn: { x: 0, z: 62, yaw: 0 },
};

export default site;
