// shots.js — the views worth photographing at Station 12.
//
// The default for an outdoor theme with no shots.js is eight frames of a turn
// on the spot at the spawn, which for this place is seven pictures of an empty
// salt flat and one of the mast. These are the things the station has.
//
// Yaw is in degrees: 0 looks along −z (down the site at the mast), 180 looks
// back up it toward the outstation, 90 west, 270 east.
//
// TWO THINGS THE HARNESS CANNOT DO, and both shape the list below.
//
//   · **There is no pitch.** `engine/core/player.js` `teleport(pos, yaw)` sets
//     `camera.rotation.set(0, yaw, 0)` — the camera is always level. So there is
//     no such thing as a view looking *up* the mast, and the cloud deck (113 to
//     183 m) is only in frame where it is far enough away to fall inside the
//     33° half-field: about 230 m of horizontal distance for a lump at 150 m.
//     That is why the deck views stand a long way back rather than at its foot.
//   · **There is no day.** `--sol N` advances the week, but it is read inside
//     the `--room` branch of `engine/dev/shots.mjs`, which runs *after* every
//     outdoor view here has already been photographed — and `--at`/`--yaw` short
//     -circuits the whole list before it. So no outdoor view, from this file or
//     from the command line, can be taken on a later day. The launch rail is
//     armed on day 1 and stands empty with two burnt wire trails on the flat
//     from the morning after day 4 and again after day 12 (SHOT_DAYS in
//     props.js), and none of that is reachable by this tool. `the-launch-rail`
//     below is therefore always the armed rail; the spent one wants either a
//     `sol:` key honoured per view or the `--sol` block hoisted above the view
//     loop. Flagged in the report as an engine need.
export const VIEWS = [
  { name: 'the-mast', at: { x: 0, z: 40 }, yaw: 0,
    note: 'the spawn view: sixty metres of lattice, and nothing else above four' },
  { name: 'mast-full-height', at: { x: 0, z: 22 }, yaw: 0,
    note: 'far enough back to hold the whole mast, guys and all' },
  { name: 'the-mast-base', at: { x: 6, z: -12 }, yaw: 0,
    note: 'the down-conductor, the shunt boxes and the cabinet two metres from it' },

  // ---- the weather. Both of these are about the top of the frame.
  { name: 'the-cloud-deck', at: { x: 3, z: 130 }, yaw: 0,
    note: 'the deck over the mast: 150 m back, so the lumps at 150 m altitude fall '
      + 'inside a level camera\'s 33° half-field. Broken, not a lid — 63% coverage, '
      + 'measured. If this reads as a grey ceiling the lump count or their size is wrong' },
  { name: 'the-deck-off-the-flat', at: { x: 3, z: 176 }, yaw: 0,
    note: 'from the outstation end: two hundred metres of wet crust, the mast small in the '
      + 'middle of it, and the deck drifting across the whole top of the frame' },
  { name: 'puddles-on-the-crust', at: { x: -16, z: -24 }, yaw: 90,
    note: 'ground level, west across the open flat. Four puddles in this cone and the nearest '
      + 'is four metres out — they are near-mirrors, so what says the crust is wet is the sky '
      + 'in them, not their colour' },

  // ---- the rail, and the modesty of it.
  { name: 'the-launch-rail', at: { x: 0, z: -60 }, yaw: 0,
    note: 'the whole apparatus for making lightning on purpose, on a trolley — armed, which is '
      + 'what day 1 shows: rocket on the rail, full spool of fine wire on the hub' },
  { name: 'the-rail-against-the-mast', at: { x: 0, z: -120 }, yaw: 180,
    note: 'looking back down the pad spur: the trolley at forty metres and the mast at a hundred '
      + 'behind it. The point of the frame is the size difference' },

  { name: 'the-trench', at: { x: 7, z: 20 }, yaw: 90,
    note: 'the open section: two conductors running parallel where nobody chose' },
  { name: 'the-trench-standing-water', at: { x: 5.5, z: 40 }, yaw: 0,
    note: 'along the length of the slot from the north plate. Storm season: eight centimetres '
      + 'of still water in the bottom with both conductors under it, which is the remark the '
      + 'April earthing certificate does not carry' },
  { name: 'the-earthing-grid', at: { x: -30, z: 6 }, yaw: 0,
    note: 'copper under the crust, uncovered where the compound has it open' },
  { name: 'the-impulse-hall', at: { x: 34, z: 28 }, yaw: 0,
    note: 'twelve stages behind that wall, and a placard on the barrier' },
  { name: 'a-field-mill', at: { x: -20, z: 22 }, yaw: 0,
    note: 'a drum on a post with a shutter turning over it' },
  { name: 'the-walk-out', at: { x: 3, z: 96 }, yaw: 180,
    note: 'the long run north: the outstation is two hundred metres from the mast' },
  { name: 'the-outstation', at: { x: 3, z: 170 }, yaw: 180,
    note: 'the trailer, bonded to its own rod, at the far end of the cable run' },
  { name: 'back-from-the-outstation', at: { x: 3, z: 168 }, yaw: 0,
    note: 'what two hundred metres looks like from the other end of it' },
  { name: 'launch-control', at: { x: -17, z: 44 }, yaw: 0,
    note: 'radar on one screen, four mills on the other, and the season board' },
];

export default VIEWS;
