// fixtures.js — the objects the questions are about, standing in the rooms.
//
// A fixture is a thing in a room that a question is asked AT. It is declared by
// name and wall and never by coordinate: `engine/world/interiorFixtures.js`
// computes the position from `room.bounds`, which is the only thing that knows
// where this room's walls are. See gamekit/PLACEMENT_PASS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'    (mirrored with the room, like the fit-out)
//   along:  -1 … 1, where along that wall. 0 is the middle.
//
// A lesson points at one with `at: <id>` in books/groundtruth.yml. A lesson that
// points at nothing is answered at the case stand, exactly as before, so nothing
// here can strand a question.
//
// `from:` and `until:` are the world growing rather than the question moving: a
// fixture with either stands in the room over a range of days whatever is being
// asked, and nothing points at it. All four of the ones here are facts the
// ending card has claimed since the game shipped and the rooms never showed —
// the reissued certificate, the bonded conduit, the trailer stripped after the
// week-five strike — plus the open trench the earthing copy has always named.
export const FIXTURES = {
  // ---- Launch & Records. Every criterion on this campaign is decided here, and
  // the three objects are the three things a launch call is made out of: the
  // board it is written on, the screens it is read off, and the desk it becomes
  // a record at.
  SHOT: [
    { id: 'launch-board', name: 'The launch board', build: 'board', wall: 'back', along: 0,
      caption: 'Where the criterion is written before the cell arrives, with the three lead times under it.' },
    { id: 'radar-desk', name: 'The radar and mill desk', build: 'bench', wall: 'left', along: -0.3,
      caption: 'Radar on one screen, four mills on the other, and a clock between them.' },
    { id: 'record-desk', name: 'The records desk', build: 'bench', wall: 'right', along: 0.3,
      caption: 'Where a shot becomes a record. Or does not.' },
  ],

  // ---- Mast & Down-conductor.
  MAST: [
    { id: 'shunt-rack', name: 'The shunt rack', build: 'rack', wall: 'left', along: -0.3,
      caption: 'Three shunts on the down-conductor and a clamp at its base, all reading the same strike.' },
    { id: 'cabinet', name: 'The instrument cabinet', build: 'rack', wall: 'right', along: 0.25,
      caption: 'Two metres from the down-conductor, and there for nine years.' },
    { id: 'mast-desk', name: "Tate's bench", build: 'bench', wall: 'back', along: -0.35,
      caption: 'Bond sheets, torque figures, and what the last climb found.' },
    // Bonded on day 12, after day 11 finds a third of the strike going down it.
    // The ending card has always said this was bonded and not rerouted.
    { id: 'conduit-bond', name: 'The bonded instrument conduit', build: 'rack', wall: 'back', along: 0.75,
      from: 12, caption: 'Bonded at both ends. It still carries a third of every strike, and now it says so.' },
  ],

  // ---- Impulse Hall.
  BANK: [
    { id: 'bank-stages', name: 'The twelve stages', build: 'vessel', wall: 'left', along: -0.4,
      caption: 'A hundred nanofarads each, fifty kilovolts each, and the earthing stick visibly on.' },
    { id: 'gap-row', name: 'The row of spark gaps', build: 'rack', wall: 'right', along: 0.3,
      caption: 'What is set here decides the front, and nothing else does.' },
    { id: 'hall-board', name: "Strand's board", build: 'board', wall: 'back', along: 0.35,
      caption: 'Whatever the hall is standing in for this week is written on it.' },
  ],

  // ---- Field & Charge.
  FIELD: [
    { id: 'mill-bench', name: 'The reference mill, opened up', build: 'bench', wall: 'left', along: -0.35,
      caption: 'Its shutter, its sign convention on a card beside it, and it never goes outside.' },
    { id: 'mill-array', name: 'The mill array readout', build: 'board', wall: 'back', along: 0.3,
      caption: 'Four mills across the flat, read side by side, and the spread between them.' },
  ],

  // ---- Earthing & Transients. Nothing is asked at either of these: they are the
  // room catching up with the story. The trench has been open at the halfway
  // point since the game shipped, and the certificate is reissued on day 10.
  EARTH: [
    { id: 'earth-trench', name: 'The trench at the halfway point', build: 'bench', wall: 'right', along: -0.6,
      until: 11, caption: 'Still open. Nobody has agreed what the certificate on the wall should say.' },
    { id: 'earth-cert', name: 'The reissued April certificate', build: 'board', wall: 'back', along: 0.55,
      from: 11, caption: 'Back on the wall with the quantity it measured written on its face.' },
  ],

  // ---- Coupling & the Outstation. A strike takes the trailer for the season on
  // day 12, and nobody is inside it. What is left is a rack with its cards out.
  COUPLE: [
    { id: 'trailer-cards', name: 'The outstation cards, out of their rack', build: 'rack', wall: 'right', along: 0.7,
      from: 13, caption: 'Pulled after the week-five strike. The trailer is out for the year and nobody was in it.' },
  ],

  // ---- SITED CALLS: a fixture in a place that is not an area.
  //
  // A stop whose `at:` resolves under this key is asked HERE. The question still
  // belongs to Mast & Down-conductor — it is still that area's question about
  // what a channel recorded — and the player is sent to the screened room to
  // answer it, because that is where the sheet is. `sitedAt` in
  // interiorFixtures.js resolves it and `callLabel` prints "Go to the Screened
  // Room". Three lessons have carried `place: Screened Room` since the game
  // shipped and the room was a facade: modelled, lit, and shut.
  // TWO, not three. A third on the back wall at `along: 0` is exactly where the
  // room's own station panel hangs, and the printed sheet came out through the
  // panel — visible only in engine/dev/shots.mjs --room SCREEN, nothing failed.
  SCREEN: [
    { id: 'sheet-cage', name: 'The screened enclosure', build: 'rack', wall: 'left', along: -0.2,
      caption: 'Six faces of conducting sheet, and a door with fingerstock all round it.' },
    { id: 'record-budget', name: 'The record budget board', build: 'board', wall: 'right', along: 0.25,
      caption: 'One microsecond of record, and more channels than there is room for.' },
  ],
};
