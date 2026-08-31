// minors.js — the places on this barrage that are not areas, and what is inside
// them.
//
// Three buildings stood modelled, lit, walkable up to and SHUT, because in this
// engine an interior is keyed by an area and none of these is an area: the
// turbine hall, the boat shed and the warning post out on the marsh road. Each
// is somewhere the questions already talk about — the eleven floats are day 6's,
// the generation report's mean value is day 11's, and the warning post is where
// the ninety graziers on the opening card actually read the call. `enter:` in
// site.js gives a building an interiors key without making it an area: a door,
// a room, no case stand and no delivery board. The gauge tower is NOT here on
// purpose; site.js says why.
//
// A minor room is somewhere to STAND and READ, and on this site each one also
// hosts one sited question (see ./fixtures.js and `at:` in books/slackwater.yml)
// — which is what opens it, per engine/core/access.js. What it owes the player
// beyond that is a panel saying something the office's own numbers do not: what
// the turbines took out of the ebb, how many floats came back, and what the
// graziers were last told.
//
// These are hand-written and merged over the generated `interiors.js` in
// theme.js. `import-book.mjs` never writes this file. See
// gamekit/PLACEMENT_PASS.md.
export const MINOR_INTERIORS = {
  TURBINE: {
    caption: 'Four sets, on the ebb only. Every hour they run is an hour the gates cannot be shut.',
    standLine: 'The generation report has always assumed the water went out at the middle of the release.',
    station: { kind: 'panel', title: 'Generation', rows: [
      { label: 'Sets available', value: '4 of 4', status: 'normal' },
      { label: 'Window, this ebb', value: '4 h 10 min', status: 'normal' },
      { label: 'Taken last spring tide', value: '31.4 MWh', status: 'high' },
      { label: 'Lost to an early close', value: '1 window', status: 'alarm' },
    ] },
  },
  BOAT: {
    caption: 'The launch on its trailer, spare drogues, and one empty cradle that has not been filled in two years.',
    standLine: 'Eleven floats went out of this shed. Nine of them came back.',
    station: { kind: 'panel', title: 'Boat shed', rows: [
      { label: 'Floats issued', value: '11', status: 'normal' },
      { label: 'Recovered', value: '9', status: 'normal' },
      { label: 'Still reporting', value: '1 (float 7)', status: 'high' },
      { label: 'Core stations needing the boat', value: '2 of 14', status: 'alarm' },
    ] },
  },
  MARSH: {
    caption: 'A hut, a board and a shutter, forty metres up the marsh road. This is where the call stops being arithmetic.',
    standLine: 'Ninety holdings read the gate call off this board, and none of them read the prediction.',
    station: { kind: 'panel', title: 'Warning post', rows: [
      { label: 'Holdings on the marsh', value: '90', status: 'normal' },
      { label: 'Ground above the lowest holding', value: '0.6 m', status: 'alarm' },
      { label: 'Notice the graziers ask for', value: '6 h', status: 'high' },
      { label: 'Last posted', value: 'the twelfth', status: 'normal' },
    ] },
  },
};

export default MINOR_INTERIORS;
