// fixtures.js — the objects the questions are about, one per area's worth of work.
//
// A fixture is a thing standing in a room that a question is asked AT. It is
// declared by NAME AND WALL and never by coordinate: `interiorFixtures.js`
// computes the position from `room.bounds`, which is the only thing that knows
// where this room's walls actually are. A theme that never writes a coordinate
// cannot put a prop sixteen metres in the air. See gamekit/PLACEMENT_PASS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'    (mirrored with the room, like the fit-out)
//   along:  -1 … 1, where along that wall. 0 is the middle.
//
// A lesson points at one with `at: <id>` in books/overwind.yml. A lesson that
// points at nothing is answered at the case stand, exactly as before.
//
// ## The fortnight is visible in these rooms
//
// `until: <day>` removes a fixture when that day comes; `from: <day>` adds one.
// Four of them here, and every one of them is a thing the campaign's own cards
// already claim happens, on ground the player crosses every day:
//
//   day  7  the sheared bin bolts come off the tip bench — day 6 explained them
//   day 10  the March position tape leaves the drawer it has sat in since the
//           inquiry, and the March board goes up in its place. Day 10's stake
//           says "everything the March inquiry did not have is now on one board";
//           before this pass the room showed neither the drawer nor the board.
//   day 11  the trace from the test wind on the empty cage appears in the winder
//           house — Marchetti agrees to that wind on day 11's own card.
//
// An `until:` fixture wears a hazard-yellow band at knee height, built by
// `addFixture`, so the shape still says what the object is and the colour says it
// is not finished yet.
//
// ## Which wall, and why not the obvious one
//
// A fixture is placed by the room, and the room already has furniture. The first
// placement put `pad-bench` and `coil-rig` on their areas' BACK walls and
// `gravimeter` on GRAV's LEFT wall, and every one of the three was built inside
// the room's own counter — `benchAlong` in `interiorBuilding.js` runs a bench
// `min(wallSpan - 2.6, 9.6)` metres long, CENTRED, so on a 14 m wall it covers
// `along` −0.89 to +0.89 and there is no room left on that wall at all. Only a
// screenshot showed it; nothing threw and the check stayed green.
//
// So the rule here is: **put nothing on the wall carrying the room's own bench.**
// The layout is picked from the room's name by `pickLayout`, deterministically:
//
//   BANK  office    bench: none        instrument back    → left / back / right
//   WIND  office    bench: none        instrument back    → left ×2, back
//   ROPE  workshop  bench: BACK wall   instrument right   → left ×2, right
//   CAGE  workshop  bench: BACK wall   instrument right   → left ×2, right ×2
//   TIP   office    bench: none        instrument back    → left / back / right
//   GRAV  bay       bench: LEFT wall   instrument left    → right ×2, back
//
// And the wall-mounted instrument is NOT always in the middle of its wall. A
// side-mounted one sits at `u = d/2 - 3.6` (`IU` in `interiorBuilding.js`), which
// on a 12 m workshop wall is u = +2.4, not 0 — so ROPE's cappel and CAGE's pad
// bench at `along: 0.6` (u = +2.64) were standing under their own screens. Both
// are negative now. On a back-mounted instrument u IS 0, spanning ±0.75, so the
// office rooms' back-wall fixtures sit at |along| 0.55 (u = ±1.73).
//
// One more, and it is the reason WIND has nothing on its right wall. The delivery
// board is built by `buildInteriorBuilding` BEFORE any fixture exists, so its
// clearance test cannot see them — it tests against `colliders`, and a fixture's
// collider is added later, when the room is entered. In WIND (`delivery.where`)
// the board takes the RIGHT wall at u = 0 and is 2.8 m along it, so `test-trace`
// at `right`/0.5 (u = +1.33) would have been built standing in the board's own
// plinth, with nothing anywhere reporting it. Both WIND fixtures are on the left
// wall now, 2.9 m apart.
//
// What is deliberately NOT here: a position recorder at the bank. The ending card
// says the shaft has one at the inset and none at this end, and that is the end
// where the same effect would be an overwind. It stays missing because it is one
// of the three things the fortnight does not fix.
export const FIXTURES = {
  BANK: [
    { id: 'profile-desk', name: 'The profile desk', build: 'bench', wall: 'left', along: -0.4,
      caption: 'The curve the winder is driven to, with the ramps and the crawl marked on it.' },
    { id: 'signal-board', name: 'The signal board', build: 'board', wall: 'back', along: -0.55,
      caption: 'Bell codes to the winder, and the handle that stops a wind.' },
    { id: 'depth-dial', name: 'The depth indicator', build: 'board', wall: 'right', along: 0.4,
      caption: 'Where the cage is, and how fast it is getting there.' },
  ],
  WIND: [
    { id: 'drum', name: 'The drum', build: 'vessel', wall: 'left', along: -0.55,
      caption: 'Two metres to the rope, eighteen tonnes of steel, re-flanged since the file was written.' },
    { id: 'winder-desk', name: 'The winder desk', build: 'bench', wall: 'back', along: 0.55,
      caption: 'The motor rating, the drum trace from March, and the submission open at the torque page.' },
    // Marchetti agrees to one test wind on the empty cage on day 11. Before that
    // there is nothing in this room that was measured rather than claimed.
    { id: 'test-trace', name: 'The test wind trace', build: 'rack', wall: 'left', along: 0.55,
      from: 11, caption: 'One wind on the empty cage, recorded. The first number here that was measured.' },
  ],
  ROPE: [
    { id: 'rope-bench', name: 'The rope bench', build: 'bench', wall: 'left', along: -0.55,
      caption: 'The rope record: four re-caps in two years, forty metres shorter, the same steel.' },
    { id: 'coil-rig', name: 'The coil rig', build: 'rack', wall: 'left', along: 0.55,
      caption: 'A length of locked coil between two anchors, with a dial gauge on it.' },
    { id: 'cappel', name: 'The spare cappel', build: 'vessel', wall: 'right', along: -0.5,
      caption: 'The fitting that grips the rope end and hangs the cage off it.' },
  ],
  CAGE: [
    { id: 'body-bench', name: 'The bench drawing', build: 'bench', wall: 'left', along: -0.55,
      caption: 'One chosen body at a time, with everything acting on it and nothing else.' },
    { id: 'pad-bench', name: 'The pad bench', build: 'bench', wall: 'right', along: -0.2,
      caption: 'Two sets of pads, and a certificate that says cold, on a bench, at a stated pressure.' },
    { id: 'arrestor', name: 'The crush-tested arrestor', build: 'rack', wall: 'left', along: 0.55,
      caption: "From the maker's rig, folded to about half its original height." },
    // Days 1–9: the tape is in the drawer. Day 10 is the day it comes out.
    { id: 'march-drawer', name: 'The inquiry drawer', build: 'bench', wall: 'right', along: -0.85,
      until: 10, caption: 'The position tape from March, in a drawer nobody has opened since the inquiry.' },
    { id: 'march-board', name: 'The March board', build: 'board', wall: 'left', along: 0,
      from: 10, caption: "The stiffness, the period and the tape, on one board at last." },
  ],
  TIP: [
    { id: 'belt-drive', name: 'The belt drive', build: 'rack', wall: 'left', along: -0.4,
      caption: 'It tripped twice on the night shift with nothing over four tonnes on it.' },
    { id: 'weightometer', name: 'The weightometer', build: 'board', wall: 'back', along: 0.55,
      caption: "The belt's own scale, reading tonnes an hour rather than newtons." },
    // Off the bench once day 6 has said what sheared them.
    { id: 'bin-bolts', name: 'Two sheared bin bolts', build: 'bench', wall: 'right', along: -0.5,
      until: 7, caption: 'On the bench since Friday, with nothing yet to blame for them.' },
  ],
  GRAV: [
    { id: 'gravimeter', name: 'The gravimeter', build: 'vessel', wall: 'right', along: -0.45,
      caption: 'A weighted spring in a case, reading where it stands to a millionth.' },
    { id: 'level-book', name: 'The level book', build: 'bench', wall: 'right', along: 0.45,
      caption: 'The elevation of every station, the time of every reading, and what they tie back to.' },
    { id: 'pillar', name: 'The station pillar', build: 'rack', wall: 'back', along: -0.6,
      caption: 'Concrete to rock, so what is measured is the ground and not the hut floor.' },
  ],
};

export default FIXTURES;
