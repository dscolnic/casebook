// fixtures.js — the objects Aster Station's questions are asked at.
//
// The bible's §3 declares six areas and thirty-three fixtures by name, and every
// stop in the campaign is placed at one of them or at a person. This file is the
// half of that the bible does not decide: the id each name resolves to, what
// kind of object it is, and which wall of its room it stands against.
//
// A fixture is declared by NAME and WALL and never by coordinate —
// `engine/world/interiorFixtures.js` computes the position from `room.bounds`,
// which is the only thing that knows where this room's walls are. See
// gamekit/PLACEMENT_PASS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'     (mirrored with the room, like the fit-out)
//   along:  -1 … 1, where along that wall. 0 is the middle.
//
// FOUR BUILDS FOR THIRTY-THREE OBJECTS, and the mapping is not arbitrary:
// anything the crew reads is a `board`, anything they work at is a `bench`,
// anything with cards or modules in it is a `rack`, and the two pieces of plant
// that are actually plant — the generator controller's cabinet and the air
// handler — are `vessel`s. A software station whose every object was a screen
// would be six identical rooms.
//
// Twenty of the thirty-three carry a stop today; the rest are declared because
// §3 declares them, and a room with only its examined objects in it is a set
// rather than a place.
export const FIXTURES = {
  // ------------------------------------------------------------------- OPS
  // Station command. The systems map is the wall everybody stands at, so it
  // takes the back wall and the consoles work off the sides.
  OPS: [
    { id: 'incident-console', name: 'The incident console', build: 'board', wall: 'left', along: -0.45,
      caption: 'Open incidents, oldest at the top, none of them closed.' },
    { id: 'systems-map', name: 'The systems map', build: 'board', wall: 'back', along: 0,
      caption: 'The whole station on one wall, every module drawn as a box with a light on it.' },
    { id: 'rescue-board', name: 'The rescue board', build: 'board', wall: 'right', along: 0.4,
      caption: 'The window, the aircraft, and what has to be true before either matters.' },
    { id: 'shift-log-desk', name: 'The shift log desk', build: 'bench', wall: 'left', along: 0.4,
      caption: 'Two weeks of handovers in one book, written by whoever was awake.' },
    { id: 'emergency-radio', name: 'The emergency radio', build: 'rack', wall: 'right', along: -0.45,
      caption: 'The set that does not go through the station network, kept charged.' },
    { id: 'incident-analysis-board', name: 'The incident analysis board', build: 'board', wall: 'back', along: -0.55,
      caption: 'Where a fault is argued out: readings on the left, explanations on the right.' },
  ],

  // ------------------------------------------------------------------ CODE
  // The software lab. The review wall is the room's subject and faces the door.
  CODE: [
    { id: 'code-review-wall', name: 'The code review wall', build: 'board', wall: 'back', along: 0,
      caption: 'Source on glass, wide enough to read a method without scrolling.' },
    { id: 'test-bench', name: 'The test bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Where a suite is run against a build nobody has trusted yet.' },
    { id: 'build-console', name: 'The build console', build: 'board', wall: 'right', along: -0.4,
      caption: 'What compiled, what did not, and how long ago.' },
    { id: 'version-rack', name: 'The version rack', build: 'rack', wall: 'right', along: 0.45,
      caption: 'Every build the station has run, on labelled cards, in order.' },
    { id: 'sandbox-terminal', name: 'The sandbox terminal', build: 'bench', wall: 'left', along: 0.45,
      caption: 'A copy of the controller with nothing real on the other end of it.' },
  ],

  // ----------------------------------------------------------------- POWER
  // Plant, and it looks like plant. The load board is the thing the whole
  // campaign opens on.
  POWER: [
    { id: 'generator-controller', name: 'The generator controller', build: 'vessel', wall: 'left', along: -0.45,
      caption: 'A cabinet on the generator itself, with the decision it just made printed on the front.' },
    { id: 'battery-rack', name: 'The battery rack', build: 'rack', wall: 'left', along: 0.45,
      caption: 'Cells in a steel frame, each with its own state of charge.' },
    { id: 'heat-loop-panel', name: 'The heat-loop panel', build: 'board', wall: 'right', along: -0.4,
      caption: 'Flow and return for every loop in the station, in one column each.' },
    { id: 'load-board', name: 'The load board', build: 'board', wall: 'back', along: 0,
      caption: 'Delivered power against requested power, and the percentage between them.' },
    { id: 'breaker-cabinet', name: 'The breaker cabinet', build: 'rack', wall: 'right', along: 0.45,
      caption: 'Every protected circuit in the station, labelled by hand.' },
  ],

  // ------------------------------------------------------------------- HAB
  // Life support. Six fixtures is the most of any area, so they take all three
  // walls two apiece.
  HAB: [
    { id: 'air-handler-panel', name: 'The air handler panel', build: 'vessel', wall: 'left', along: -0.5,
      caption: 'The handler itself, with its own gauge at head height.' },
    { id: 'scrubber-console', name: 'The scrubber console', build: 'board', wall: 'back', along: -0.5,
      caption: 'What the scrubbers are doing, and what they were told to do.' },
    { id: 'sensor-wall', name: 'The sensor wall', build: 'board', wall: 'back', along: 0.5,
      caption: 'One tile per occupied room, each reading its own air.' },
    { id: 'alarm-cabinet', name: 'The alarm cabinet', build: 'rack', wall: 'right', along: -0.45,
      caption: 'Every alarm the habitat can raise, and the condition under each.' },
    { id: 'habitat-analysis-board', name: 'The habitat analysis board', build: 'board', wall: 'right', along: 0.45,
      caption: 'Where two alarms from one reading get taken apart.' },
    { id: 'sensor-probe-rack', name: 'The sensor probe rack', build: 'rack', wall: 'left', along: 0.5,
      caption: 'Spare probes, calibrated, in the order they were last checked.' },
  ],

  // ------------------------------------------------------------------- VEH
  VEH: [
    { id: 'rover-diagnostic-cart', name: 'The rover diagnostic cart', build: 'bench', wall: 'left', along: -0.5,
      caption: 'Wheeled up to whatever came back broken, with its own screen.' },
    { id: 'drone-rack', name: 'The drone rack', build: 'rack', wall: 'left', along: 0.5,
      caption: 'Four airframes on their sides, batteries out.' },
    { id: 'route-table', name: 'The route table', build: 'bench', wall: 'right', along: -0.45,
      caption: 'A paper map of the sector under glass, marked in wax pencil.' },
    { id: 'charging-console', name: 'The charging console', build: 'board', wall: 'right', along: 0.45,
      caption: 'What is on charge, at what rate, and for how much longer.' },
    { id: 'parts-bench', name: 'The parts bench', build: 'bench', wall: 'back', along: 0.55,
      caption: 'Hubs, motors and one drawer of hardware that fits nothing.' },
    { id: 'route-planning-board', name: 'The route planning board', build: 'board', wall: 'back', along: -0.45,
      caption: 'The lap the rover is running, step by step, as the software has it.' },
  ],

  // ----------------------------------------------------------------- COMMS
  COMMS: [
    { id: 'link-console', name: 'The link console', build: 'board', wall: 'left', along: -0.45,
      caption: 'The satellite pass, counted down to the second.' },
    { id: 'packet-monitor', name: 'The packet monitor', build: 'board', wall: 'back', along: 0,
      caption: 'Raw traffic as it arrives, before anything has formatted it.' },
    { id: 'weather-mast-console', name: 'The weather mast console', build: 'board', wall: 'right', along: -0.45,
      caption: 'Wind, visibility and temperature from the mast on the ridge.' },
    { id: 'antenna-router', name: 'The antenna router', build: 'rack', wall: 'right', along: 0.45,
      caption: 'Every channel on the station, and which mast each one leaves by.' },
    { id: 'message-queue-board', name: 'The message queue board', build: 'board', wall: 'left', along: 0.45,
      caption: 'What is waiting to be sent, in the order it will go.' },
  ],
};

export default FIXTURES;
