// fixtures.js — the objects the questions are about, one per area's worth of work.
//
// A fixture is a thing standing in a room that a question is asked AT. It is
// declared by name and wall and never by coordinate: `interiorFixtures.js`
// computes the position from `room.bounds`, which is the only thing that knows
// where this room's walls actually are. See gamekit/PLACEMENT_PASS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'    (mirrored with the room, like the fit-out)
//   along:  -1 … 1, where along that wall. 0 is the middle.
//
// A lesson points at one with `at: <id>` in books/midway.yml. A lesson that
// points at nothing is answered at the case stand, exactly as before — which is
// every decision-format call in this book, deliberately: a decision is made with
// a person, not at a bench.
//
// THIS PARK CANNOT EARN A FAR TIER, and the arithmetic is worth writing down so
// nobody re-derives it. `tiersFor` wants a distance ratio of 2.0 against the next
// place in, and at least 120 m. Measured from the spawn at (0, 58): the wheel is
// 40 m, the ship 67, the carousel 76, the bumper floor 85, the coaster 112, the
// tower 126, the flume 156. The largest gap in that list is 27 m and the best
// ratio is 1.32. A midway is a place you walk end to end in ninety seconds, and
// putting a shed 320 m out to buy a ratio would be a fence pretending to be a
// distance. So what grows here is *doors*, not ground: three buildings that were
// modelled and shut open on the day the campaign first sends somebody to them —
// the workshop on day 5, the plant room on day 10 and the boarded stalls on day
// 11. `access.js` derives that from the sited calls below; nothing declares it.
export const FIXTURES = {
  TOWER: [
    { id: 'fin-stack', name: 'A section of copper fin, on trestles', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Fin and magnet, cut out of the stack. Nothing here touches anything else.' },
    { id: 'drop-log', name: 'The drop log', build: 'board', wall: 'back', along: -0.35,
      caption: 'Every test drop since 1996, with the height and nothing else.' },
    { id: 'brake-desk', name: 'The brake desk', build: 'board', wall: 'right', along: 0.3,
      caption: 'Two lamps, a current trace, and the key that arms the carriage.' },
    // Vey witnesses the drop test on day 14, and what he signs is a sheet with a
    // reading on it. It is on the wall from day 15 because that is the morning
    // anybody could read it.
    { id: 'witness-sheet', name: 'The witnessed drop test', build: 'board', wall: 'back', along: 0.55,
      from: 15, caption: '5.4 g against the 6.0 the certificate allows, with a signature under it.' },
  ],
  COASTER: [
    { id: 'profile-drawing', name: 'The 1974 track profile', build: 'board', wall: 'back', along: -0.3,
      caption: 'One chain, one hill, one loop, drawn once and never redrawn.' },
    { id: 'station-wheel', name: 'The station speed wheel', build: 'bench', wall: 'left', along: -0.35,
      caption: 'Kovač\'s wheel, on the same bracket it has been on for three springs.' },
    { id: 'lift-panel', name: 'The chain motor panel', build: 'board', wall: 'right', along: 0.35,
      caption: 'Amps on the way up the hill, and a rating plate underneath.' },
    // Kovač tapes the crown on day 9. The tape reading goes up beside the drawing
    // it contradicts, which is the whole argument of the second week on one wall.
    { id: 'crown-tape', name: 'The taped crown radius', build: 'board', wall: 'back', along: 0.4,
      from: 10, caption: '7.4 metres, pinned next to a drawing that says 5.6.' },
  ],
  CAROUSEL: [
    { id: 'chain-rig', name: 'A swing chair on its chains', build: 'rack', wall: 'left', along: -0.4,
      caption: 'Hung off the roof beam so the angle can be read with a protractor.' },
    { id: 'pole-jig', name: 'An outer horse pole, in a jig', build: 'bench', wall: 'back', along: -0.35,
      caption: 'Out of the platform and clamped. Brennan\'s note on it reads "outer, 1991".' },
    { id: 'drive-panel', name: 'The carousel drive panel', build: 'board', wall: 'right', along: 0.3,
      caption: 'Current, revolutions, and one lamp nobody has ever seen lit.' },
    { id: 'platform-jacks', name: 'The platform jacks and shims', build: 'bench', wall: 'left', along: 0.5,
      caption: 'Four jacks, a box of shims, and a level that has been on the floor all week.' },
    // The new speed controller, still boxed until Adeyemi has a computed force to
    // wire it to. She gets one on day 5.
    { id: 'controller-crate', name: 'The new controller, crated', build: 'rack', wall: 'back', along: 0.7,
      until: 6, caption: 'Strapped, addressed to the park, and not going in until somebody derives a number.' },
  ],
  WHEEL: [
    { id: 'hub-schedule', name: 'The hub bolt schedule', build: 'board', wall: 'back', along: -0.3,
      caption: 'Twenty-four arms, eight bolts a hub, and one drawing from 1945.' },
    { id: 'gondola-shell', name: 'A gondola shell, off the wheel', build: 'bench', wall: 'left', along: -0.35,
      caption: 'Down for painting. A flat side, and the wind gets all of it.' },
    { id: 'brake-drum', name: 'The wheel brake drum', build: 'vessel', wall: 'right', along: 0.3,
      caption: 'A band on a drum, and eighty-one years of glaze on the lining.' },
    // Bianchi photographs and sizes the indication in arm nine on day 8. The file
    // stays on the wall for the rest of the campaign, because nothing resolves it.
    { id: 'arm-nine-file', name: 'The arm nine file', build: 'board', wall: 'back', along: 0.5,
      from: 8, caption: 'A 41 millimetre indication, photographed, sized, and not judged.' },
  ],
  BUMPER: [
    { id: 'car-on-stands', name: 'A car up on stands', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Chen\'s accelerometer taped to the seat frame and another on the floor pan.' },
    { id: 'dummy-rig', name: 'The dummy and its neck rig', build: 'rack', wall: 'back', along: -0.3,
      caption: 'What a collision does to a car, and what it does to the head on top of it.' },
    { id: 'floor-console', name: 'The floor console', build: 'board', wall: 'right', along: 0.3,
      caption: 'Power, a bell, and the switch that stops twelve cars at once.' },
    // The rule Hart writes on day 6 goes on a card by the console, because that is
    // the only place a rule is ever read.
    { id: 'console-card', name: 'The operator\'s card', build: 'board', wall: 'right', along: 0.7,
      from: 7, caption: 'Laminated, in Hart\'s handwriting, at the height a nineteen-year-old reads.' },
  ],
  SHIP: [
    { id: 'arm-trestles', name: 'The swing arm, on trestles', build: 'bench', wall: 'left', along: -0.4,
      caption: '8.6 metres of it, off the ride, with the pivot end towards the door.' },
    { id: 'drive-console', name: 'Idowu\'s console', build: 'board', wall: 'back', along: -0.3,
      caption: 'Drive interval, seat count, and twenty years of knowing which is wrong.' },
    { id: 'seat-frame', name: 'A seat frame and its bar', build: 'rack', wall: 'right', along: 0.3,
      caption: 'One seat of the sixty, bolted to a stand at the height it hangs at.' },
    // The period trace comes off the arm on day 7 and settles a two-season
    // argument. It stays up.
    { id: 'timing-trace', name: 'The period trace', build: 'board', wall: 'back', along: 0.5,
      from: 8, caption: '6.15 seconds of swing against 5.85 seconds of drive, on one sheet.' },
  ],
  FLUME: [
    { id: 'header-gauge', name: 'The header tank gauge board', build: 'board', wall: 'back', along: -0.3,
      caption: 'Depth, delivery, and the difference that has been growing for three seasons.' },
    { id: 'gate-ram', name: 'The hydraulic gate, in section', build: 'vessel', wall: 'left', along: -0.35,
      caption: 'A two centimetre ram driving a nine centimetre one, and a note reading "plenty".' },
    { id: 'hull-scales', name: 'A moulded hull, on scales', build: 'bench', wall: 'right', along: 0.3,
      caption: 'Empty, then with weight in it, and a waterline drawn on the side in pencil.' },
    // The pump curve is settled on day 10 and the flume runs the weekend on it.
    { id: 'pump-curve', name: 'The new pump curve', build: 'board', wall: 'back', along: 0.5,
      from: 11, caption: 'Head against flow, with the duty point marked and the plate rating beside it.' },
  ],

  // ---- SITED CALLS: fixtures in places that are not areas.
  //
  // A stop whose `at:` resolves under one of these keys is asked THERE. The
  // question still belongs to its own area — the pump sizing is still the flume's
  // question — and the player is sent to the room where the thing is.
  // `sitedAt` in interiorFixtures.js resolves it and `callLabel` prints the walk.
  //
  // This is what stops the three opened buildings being three rooms nobody has a
  // reason to walk into, and it is what opens them at all: `access.js` seals a
  // door until the campaign sends somebody through it.
  WORKSHOP: [
    // Day 5. The official drop test is a written procedure before it is a drop,
    // and it is written at the bench with the notebooks open, because the order it
    // has to run in is the order Brennan never wrote down.
    { id: 'bench-notebooks', name: 'The bench, and eleven notebooks', build: 'bench', wall: 'back', along: 0,
      caption: 'Forty-one years of settings in one hand, laid out in date order for the first time.' },
  ],
  PLANT: [
    // Day 10. The pump's duty is a lift and a flow; what says whether the park may
    // ask for it is the motor plate and the breaker feeding it, and both are here
    // rather than in the pumphouse.
    { id: 'motor-plate', name: 'The pump starter and its rating plate', build: 'board', wall: 'left', along: -0.2,
      caption: '55 kilowatts on the plate. Everything on the midway runs off this board.' },
  ],
  ARCADE: [
    // Day 11. The water cannon is a midway stall, and the stall is in here behind
    // the boards. It is the one thing in this park that nobody has to certify,
    // which is why it is the only place the physics can be played with.
    { id: 'stall-cannon', name: 'The water cannon stall', build: 'bench', wall: 'back', along: 0,
      caption: 'A nozzle on a pivot, three marks on the back wall, and a pressure gauge.' },
  ],
};

export default FIXTURES;
