// site.js — Wellmere, on Saltmere Point, as data.
//
// THE LAYOUT IS THE SYLLABUS, AND THE QUANTITY IS ISOLATION DISTANCE.
//
// The first version of this place was buildings standing in a yard with a trial
// field north of them, and nothing about where anything sat taught anything —
// the vault was near the drying hall because a station has to put them
// somewhere. The set's good places all have an axis that is the course: Quantum
// walks a temperature, Red Sand walks a carbon atom through a process, Headwater
// walks a height. This one walks the hardest practical constraint in plant
// breeding.
//
// **Two populations that must not cross must not be able to reach each other.**
// Wheat is safe at about 20 m, maize wants 200, and a wind-pollinated outcrosser
// wants a kilometre. So the station is concentric, and the rings are the rule:
//
//        r = 0        THE CROSSING BLOCK — bagged heads, eight slots a year
//        r = 18–40    inner buffer: mown, empty, and empty is the point
//        r = 42–75    THE INCREASE RING — screenhouses, regeneration plots
//        r = 78–100   outer buffer
//        r = 102–150  THE TRIAL RING — plots in arcs, on the ring
//        r = 141      THE COMPOUND, on the neck: vault, laboratory, records
//        r = 170      the cliff, and the sea, on every bearing but one
//        r = 170–392  THE CAUSEWAY, tapering south, sea on both sides
//        r = 326      THE GATE — the only way on or off, and the end of the walk
//
// The mainland is horizon and distant props, never terrain. A rim is one radius
// per bearing and cannot say land, sea, land; the player is stopped at the gate,
// so Idris Fenn's farm is a silhouette to the south-west that is looked at and
// argued about and never walked to.
//
// What that buys, and none of it needed a line of question-writing:
//
//   · **The walk costs what the science costs.** `budgetForRoute` measures the
//     day from the actual map, so reaching the crossing block is expensive
//     *because it is isolated*, which is the trade-off a breeder makes for real.
//   · **The buffers are visible and empty.** A player asking why nothing is
//     planted in a forty-metre band has asked the question the ring answers.
//   · **The threat has a direction.** The prevailing wind is south-west, over
//     the causeway, off the mainland — so the one approach to the headland is
//     also the one bearing contamination can arrive on. Fenn's farm is at the
//     end of it, visible and not enterable, which is why the argument about
//     somebody else's crop is an argument about something you can see.
//   · **The sea is the isolation.** Three bearings of open water is a boundary
//     that needs no fence and no explaining.
//
// Load-bearing rather than decorative:
//
//   · Every `group` is a group id in content/groups.js, or that area's calls are
//     unreachable and only `worldParity` says so.
//   · `terrain.mesa.rimRadius` is a **function of bearing** — see `rimRadius()`
//     in engine/world/outdoorSite.js. It is what makes this a promontory rather
//     than a mesa, and it is the only thing keeping the causeway above water.
//   · `water.open` skips the carved channel and the bank. This is a sea, not a
//     river; a bank is a kerb along one edge and a kerb across open water is a
//     concrete wall standing in it.
//   · The spawn is at the gate with ten clear metres round it. A prop over the
//     spawn welds the player in place and the scene still renders perfectly.

import { ranges, S, SW } from '../../engine/world/horizonShape.js';

const PI = Math.PI;

// ---------------------------------------------------------------- the rings
//
// One export, because props.js draws the buffers and the plots from the same
// numbers the buildings are placed against. Two descriptions of one ring is how
// a boundary marker ends up forty metres from the boundary.
export const RINGS = {
  crossing:  { r0: 0,   r1: 18 },
  buffer1:   { r0: 18,  r1: 42 },
  increase:  { r0: 42,  r1: 75 },
  buffer2:   { r0: 75,  r1: 102 },
  trial:     { r0: 102, r1: 150 },
  rim:       170,          // the cliff edge on every bearing but the neck
  neck:      { bearing: S, halfWidth: 0.075, reach: 392 },
};

// TWO ANGLE CONVENTIONS LIVE IN THIS FILE AND THEY ARE NOT THE SAME.
// `rimAt` is handed `Math.atan2(z, x)` by the terrain, which is what
// horizonShape's N/E/S/W constants are written in. `at()` below is compass
// degrees — 0 north, 90 east — because a building's bearing is easier to read
// that way. Mixing them is how the crossing block ends up in the sea.

/** Where the plateau ends, by bearing. A circle, and one long tongue south. */
export function rimAt(ang){
  const d = Math.abs(((ang - RINGS.neck.bearing + PI) % (2 * PI) + 2 * PI) % (2 * PI) - PI);
  if(d >= RINGS.neck.halfWidth) return RINGS.rim;
  // Squared cosine over the neck's own width: full reach on the bearing, back
  // to the rim at its edges, and no corner where the two meet.
  const t = Math.cos((d / RINGS.neck.halfWidth) * (PI / 2)) ** 2;
  return RINGS.rim + (RINGS.neck.reach - RINGS.rim) * t;
}

/** Polar placement, so a building's radius is legible where it is written. */
const at = (r, bearingDeg) => {
  const a = (bearingDeg * PI) / 180;
  return { x: Math.sin(a) * r, z: -Math.cos(a) * r };
};

/**
 * The six areas of study, each at the radius its work belongs at.
 *
 * The radius is the argument. Crossing is at the centre because a controlled
 * cross is the thing that must not be reached; regeneration is in the increase
 * ring because a grow-out *is* an increase, and the drift lesson on day 9 is
 * then taught standing in the plots that caused it; the vault and the laboratory
 * are on the neck because they need power, plumbing and a lorry.
 */
const AREA_BUILDINGS = [
  // ---- the centre: the thing everything else is kept away from
  { id: 'CROSS', group: 'CROSS', name: 'Crossing Hall', dome: 0,
    ...at(0, 0), w: 18, d: 12, h: 5.4, facing: PI, colour: 0x9ea892, accent: 0x7a4fa3 },

  // ---- the increase ring: where an accession is multiplied, and lost
  { id: 'POP', group: 'POP', name: 'Genetic Resources Office', dome: 0,
    ...at(59, 315), w: 17, d: 12, h: 5.2, facing: PI * 0.75, colour: 0x9d9f8e },

  // ---- the trial ring: commercial scale, and the ground that flatters
  { id: 'TRIAL', group: 'TRIAL', name: 'Field Laboratory', dome: 0,
    ...at(116, 45), w: 19, d: 12, h: 5.6, facing: -PI * 0.25, colour: 0xa39e8c },
  { id: 'DRY', group: 'DRY', name: 'Drying & Processing Hall', dome: 0,
    ...at(129, 96), w: 22, d: 14, h: 6.8, facing: -PI / 2, colour: 0xa8a695 },

  // ---- the compound, on the neck
  { id: 'VAULT', group: 'VAULT', name: 'Seed Vault', dome: 0,
    x: -27, z: 138, w: 25, d: 15, h: 6.2, facing: 0, colour: 0x9aa39c, accent: 0x2f5d52 },
  { id: 'LAB', group: 'LAB', name: 'Molecular Laboratory', dome: 0,
    x: 29, z: 138, w: 21, d: 14, h: 6.2, facing: 0, colour: 0x94a0a6 },
];

/**
 * The Site Office — a minor place, near spawn, that exists to answer one
 * question: what does day 1 do when it needs a lesson from a far area before
 * the far ring has any business being called?
 *
 * Two of day 1's three stops are `CROSS` (the crossing block, r=155) and
 * `TRIAL` (the Field Laboratory, r=251) — both far by `tiersFor`, and the far
 * lap does not run until day 4. `shapeMissions`' `nearFirst` used to be the
 * only answer to that: trade the far call for a near one from a later day.
 * Measured, it pulled day 12's Molecular Laboratory lesson onto day 1 in
 * CROSS's place — a rust-screen allocation call, in a season that has not
 * found the rust yet, on the first morning. That is the defect the placement
 * pass exists to catch one level up: a question asked in the wrong place is
 * bad; a question asked on the wrong DAY, because the engine had nowhere near
 * to put it, is the same defect at the calendar's scale.
 *
 * The fix is the one `PLACEMENT_PASS.md` already names for this: site the
 * stop at a near place instead of trading the day away. CROSS's and TRIAL's
 * day-1 lessons are already framed as somebody's own paperwork — Volpe's two
 * parents pinned above a bench, Quiroga's plot map on a wall — and a season
 * lead's first morning is exactly when a station keeps its overview boards
 * somewhere central rather than making a new hire walk both rings before
 * breakfast. `CROSS`'s and `TRIAL`'s own LATER lessons keep their own halls;
 * only their day-1 ones are sited here.
 *
 * Fixing only those two moved the problem rather than closing it: with day 1
 * no longer trading, `nearFirst` picked different partners for day 2's DRY
 * call and day 3's POP call, and day 3's card ended up asking about grain
 * moisture and gene expression under a stake about a duplicate accession
 * record — the exact defect the fix was for, one day over. Both are the same
 * shape (a slip, a count sheet) so the office grew two more boards.
 */
export const OFFICE = { id: 'OFFICE', enter: 'OFFICE', name: 'The Site Office',
  sub: 'Postings for a season lead’s first morning',
  x: 0, z: 175, w: 9, d: 7, h: 4.4, facing: 0, colour: 0xa39d8a };

/**
 * Places with no lesson of their own. They carry the place and the wayfinding —
 * and since the placement pass, all five of them open.
 *
 * `enter:` gives a building an interiors key without making it an area: a door,
 * a room, a caption and a panel, and no case stand, because nothing is *called*
 * here. Four of the five have questions ASKED in them all the same — a lesson
 * whose `at:` resolves under `GH1`, `GH3`, `RECORDS` or `THRESH` in fixtures.js
 * is sited there, and the call reads "Go to Glasshouse 1". The question still
 * belongs to its own area and is still about that area's subject; the player is
 * sent to the warm bay to count a segregating generation because that is where
 * the four hundred plants are standing. See gamekit/PLACEMENT_PASS.md.
 *
 * **The glasshouse range stands INSIDE the inner buffer, and that is the point.**
 * The buffer is a band where nothing may flower in the open, because anything
 * flowering there can reach the crossing block eighteen metres away. A
 * glasshouse may stand in it precisely because it is its own isolation: sealed,
 * vented through screens, nothing in or out. So the one structure allowed in the
 * empty band is the one that does not need the band — which is the rule stated
 * as a building, and it puts the warm bay a short walk from the crossing work it
 * exists to serve.
 */
const LANDMARKS = [
  { id: 'GH1', enter: 'GH1', name: 'Glasshouse 1', sub: 'Warm bay · the crosses that cannot wait for spring',
    ...at(30, 318), w: 12, d: 20, h: 5.2, facing: PI * 1.77, colour: 0x9db2ab, accent: 0x6f9487 },
  { id: 'GH2', enter: 'GH2', name: 'Glasshouse 2', sub: 'Cool bay · vernalisation',
    ...at(31, 0), w: 12, d: 20, h: 5.2, facing: PI, colour: 0x9db2ab, accent: 0x6f9487 },
  { id: 'GH3', enter: 'GH3', name: 'Glasshouse 3', sub: 'Screening bay · rust nursery, kept apart',
    ...at(30, 42), w: 12, d: 20, h: 5.2, facing: PI * 0.23, colour: 0x9db2ab, accent: 0xb5502f },
  // BOTH OF THESE STOOD EIGHT METRES OVER THE CLIFF, and everything about them
  // rendered perfectly. At (-30, 172) the radius is 174.6 and the rim on that
  // bearing — off the neck, so the plain circle — is 166 with the wobble in it,
  // which put the back half of each shed in the air above the sea and its door
  // exactly on the edge. `reachable.mjs` had been saying so for the life of the
  // game, in the half of its output that is a note rather than a failure: "its
  // door cannot be walked to from the spawn". They are on the yard now, one
  // either side of it, facing in, with ten metres of margin to the drop.
  { id: 'RECORDS', enter: 'RECORDS', name: 'Passport Records', sub: 'Where every accession came from',
    x: -48, z: 148, w: 15, d: 10, h: 4.8, facing: PI / 2, colour: 0xa7a293 },
  { id: 'THRESH', enter: 'THRESH', name: 'Threshing Floor', sub: 'Harvest in, chaff out',
    x: 48, z: 148, w: 17, d: 11, h: 5.6, facing: -PI / 2, colour: 0x9c9384 },
  // THE GATE IS NOT HERE, and that is a map decision rather than a world one.
  // `engine/core/map.js` takes its bounds from `site.buildings`, so a gatehouse
  // 326 m down the causeway stretched the minimap into a vertical ribbon with
  // the whole station squashed into its top quarter — on a game whose map is how
  // a person stop is found. props.js builds the gate instead, and the map is the
  // station.
];

export const site = {
  kind: 'outdoor',
  name: 'Wellmere, Saltmere Point',

  terrain: {
    // A promontory: flat on top, a hard cliff all round, and the sea below it.
    // `farRise` is put beyond the mesh so nothing climbs back out of the water —
    // on a mesa that value is the next landform, and here there is not one.
    // 320 rather than 400 over 1200 m. The headless renderer in `npm run shots`
    // runs on SwiftShader and died on the finer mesh — 160k terrain vertices plus
    // 2,600 plot instances — while Chrome was perfectly happy, which is a
    // difference worth knowing before blaming the scene.
    size: 1200, segments: 320, playerLimit: 400,
    profile: 'mesa', relief: 0.5,
    mesa: {
      rimRadius: rimAt,       // the headland, and the neck running south
      rimWobble: [3.5, 2.2, 1.1],
      dropDepth: 26,          // cliff height above the water
      dropRun: 16,            // and how far it takes — short, so it reads as rock
      farRise: 4000,
    },
    // Worked coastal ground: turned earth over rock, not turf. Two stops darker
    // and browner than looks right on the canvas — under ACES with a bright sky
    // IBL a mid albedo renders near-white, and the first version of this site
    // came out the same value as the crop standing on it, so a field of 700
    // plots read as one flat green smear from twenty metres.
    ground: { base: [70, 62, 44], spread: [22, 20, 15], repeat: 34, normalRepeat: 300 },
  },

  // The sea. `open` is what stops the engine cutting a river channel through it
  // and laying a concrete bank across the middle.
  water: {
    cx: 0, cz: 0, width: 2400, depth: 2400, level: -19.5, open: true,
    // Its own colour, because the engine's default is a river seen from a bank
    // and it mirrored the sky to white across the whole bay. Rougher and less
    // metallic: a cold sea with a chop on it, not a mirror.
    colour: 0x24414c, roughness: 0.34, metalness: 0.16,
  },

  // Maritime: more haze than an inland site, and a sky doing something. The
  // campaign's whole argument is about seasons and about wind.
  atmosphere: {
    turbidity: 4.0, rayleigh: 2.4, mie: 0.006, mieG: 0.76, scale: 700, stars: 1200,
  },

  paths: [
    { cx: 0, cz: 155, w: 100, d: 10, worn: 6 },        // the compound yard
    { cx: 0, cz: 78, w: 8, d: 150, worn: 6 },        // the ring road in to the centre
    { cx: 0, cz: 250, w: 5, d: 170, worn: 3 },       // the causeway — narrow, on a narrow neck
  ],

  buildings: [...AREA_BUILDINGS, ...LANDMARKS, OFFICE],

  // What the map draws. Without this it takes the union of every building and
  // path, which here includes 170 m of empty causeway and squeezed the whole
  // station into the top quarter of a vertical ribbon. The map is how a person
  // stop is found; it should show the ground people are standing on, and the
  // causeway is a corridor with nobody on it.
  mapBounds: { x0: -160, x1: 160, z0: -150, z1: 195 },

  board: { x: 13, z: 160, facing: PI, title: 'Season Board' },

  furniture: [
    { kind: 'post', x: -7, z: 132, height: 3.6, r: 0.1, colour: 0x4a4a3e },
    { kind: 'post', x: 7, z: 132, height: 3.6, r: 0.1, colour: 0x4a4a3e },
    { kind: 'bench', x: -16, z: 157, facing: 0 },
    { kind: 'bin', x: 14, z: 157 },
  ],

  // Rough coastal grass, and only outside the trial ring. Nothing volunteers
  // inside a buffer that is mown every fortnight, which is the whole point of
  // mowing it.
  scrubCount: 700,
  scrubColour: 0x53603a,
  scrubBand: [152, 168],

  // Not a ring of hills. Three bearings are open sea and have nothing on them at
  // all; the mainland is a low line to the south with the hills behind it, which
  // is the direction the causeway runs, the wind blows and the rust is coming.
  horizon: [
    { radius: 760, height: 26, colour: 0x6b7364, haze: 0.5,
      amp: ranges([{ at: S, width: 2.2, hi: 1.0 }, { at: SW, width: 1.3, hi: 0.8 }], 0.0) },
    { radius: 1000, height: 78, colour: 0x5f6a5c, haze: 0.62,
      amp: ranges([{ at: S, width: 1.5, hi: 1.0 }], 0.0) },
  ],

  // At the gate end of the compound, facing north up the ring road: the vault
  // and the laboratory either side, the trial ring beyond them, and the crossing
  // block a hundred and fifty metres out at the centre of everything.
  spawn: { x: 0, z: 155, yaw: 0 },
};

export default site;
