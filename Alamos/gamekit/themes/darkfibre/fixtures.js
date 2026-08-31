// fixtures.js — the objects the questions are actually about, room by room.
//
// A fixture is a thing standing in a room that a question is asked AT. It is
// declared by name and wall and never by coordinate: `interiorFixtures.js`
// computes the position from `room.bounds`, which is the only thing that knows
// where this room's walls are. See gamekit/PLACEMENT_PASS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'    (mirrored with the room, like the fit-out)
//   along:  -1 … 1, where along that wall. 0 is the middle.
//   from:/until:  the day it appears / the day it goes. This is how the station
//                 stops being finished on the first morning.
//
// A lesson points at one with `at: <id>` in books/darkfibre.yml. A lesson that
// points at nothing is answered at the case stand, exactly as before.
//
// The last two keys — GEN and STORE — are NOT areas. They are the two buildings
// in site.js that carry `enter:` rather than `group:`, and a lesson pointing at a
// fixture declared under them is SITED there: the question is asked in the
// generator house or the ship's store rather than in the area that owns it.
export const FIXTURES = {
  TERM: [
    { id: 'term-bench', name: 'The termination bench', build: 'bench', wall: 'back', along: 0.4,
      caption: 'Two indices on a card, and every fibre in the cable brought out by hand.' },
    { id: 'index-book', name: "The maker's fibre data book", build: 'board', wall: 'left', along: -0.4,
      caption: 'Core, cladding and group index, measured eleven years ago and not since.' },
    // The span's own end, dark since the loss, and lit again by Friday's switch to
    // repeater 6's spare pump on day 10. The one thing in this station a player can
    // watch change without being told a number.
    { id: 'term-dark', name: 'The dark end', build: 'rack', wall: 'right', along: 0.85, until: 11,
      caption: 'The span\'s own connector, with nothing coming back out of it.' },
    { id: 'term-live', name: 'The span, live again', build: 'rack', wall: 'right', along: 0.85, from: 11,
      caption: 'Light on the fibre again since the switch, and three and a half decibels better.' },
  ],
  TEST: [
    { id: 'otdr', name: 'The reflectometer', build: 'board', wall: 'back', along: -0.3,
      caption: 'One pulse out, one trace back, and a step in it nineteen days old.' },
    { id: 'sweep-drum', name: 'The spare fibre drum', build: 'vessel', wall: 'left', along: -0.45,
      caption: 'A kilometre of this cable\'s own fibre, wound and never laid.' },
    { id: 'trace-table', name: 'The trace table', build: 'bench', wall: 'right', along: 0.35,
      caption: 'Three weeks of records, laid out so that no two of them can hide each other.' },
    // Bare for eleven years, and gone from day 10 — the film thickness is derived on
    // day 8 and Ramnarine coats the face that week.
    { id: 'front-connector', name: "The instrument's front connector, bare", build: 'rack', wall: 'back',
      along: 0.85, until: 10,
      caption: 'Uncoated since the cable was landed. Its reflection comes off every trace by hand.' },
  ],
  SPLICE: [
    { id: 'splicer', name: 'The fusion splicer', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Two cleaved ends, one dry and one in gel, and a microscope over both.' },
    { id: 'fault-tray', name: 'The fault tray', build: 'bench', wall: 'right', along: 0.35,
      caption: 'Four faults cut out of shore ends over the years, each with its trace beside it.' },
    { id: 'coating-rig', name: 'The coating rig', build: 'rack', wall: 'back', along: 0.35,
      caption: 'A face, a film and a thickness gauge. The thickness is the whole question.' },
    { id: 'coated-face', name: 'The first coated face', build: 'board', wall: 'left', along: 0.85, from: 10,
      caption: 'Three hundred and twenty nanometres of film, and the reflection gone with it.' },
  ],
  AMP: [
    { id: 'amp-desk', name: 'The amplifier desk', build: 'board', wall: 'back', along: -0.35,
      caption: 'Two wavelengths, four years of telemetry, and every reading inside limits.' },
    { id: 'pump-panel', name: "Repeater 6's pump panel", build: 'rack', wall: 'left', along: -0.4,
      caption: 'The working pump and the spare, and one switch that can only be thrown once.' },
    { id: 'cause-board', name: 'The cause board', build: 'bench', wall: 'right', along: 0.35,
      caption: 'Four things that could have taken four decibels, and what each costs to test.' },
  ],
  RECV: [
    { id: 'recv-bench', name: 'The receiver bench', build: 'bench', wall: 'back', along: 0.4,
      caption: 'Power in, bits out, and the count that sits between the two.' },
    { id: 'diode-station', name: 'The photodiode test station', build: 'rack', wall: 'left', along: -0.4,
      caption: 'A measured efficiency of 82 in a hundred, against a sheet that claims ninety.' },
  ],
  RAD: [
    { id: 'bay-bench', name: 'The bay bench', build: 'bench', wall: 'back', along: 0.4,
      caption: 'Three radiographs of one weld, two years apart, and one of them annotated.' },
    { id: 'source-pot', name: 'The source pot', build: 'vessel', wall: 'left', along: -0.45,
      caption: 'Renewed eight months ago. Every exposure since has been a little longer.' },
    { id: 'survey-meter', name: 'The survey meter and the barrier tape', build: 'rack', wall: 'right',
      along: 0.3, caption: 'A dose rate at two metres, and the distance it has to fall to.' },
  ],

  // ——— not areas: the two buildings opened by `enter:` in site.js ———
  GEN: [
    { id: 'feed-board', name: 'The cable power feed board', build: 'board', wall: 'back', along: 0,
      caption: 'Constant current up the cable, and the span\'s loss written beside it as a rate.' },
  ],
  STORE: [
    { id: 'offcut-rack', name: 'The offcut rack', build: 'bench', wall: 'back', along: 0.35,
      caption: 'Short lengths kept for exactly this: bending one to see what it costs.' },
    { id: 'spares-cage', name: 'The spares cage', build: 'rack', wall: 'left', along: -0.4,
      caption: 'What a hundred points of spares money has already been spent on.' },
  ],
};

export default FIXTURES;
