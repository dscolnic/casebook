// minors.js — the two places that are not areas, and what is inside them.
//
// Both were facades: modelled, lit, walkable up to and shut, because in this
// engine an interior is keyed by an area and neither of these is one. The
// screened room is the worse case of the two — three lessons have carried
// `place: Screened Room` since the game shipped, and the door has never opened.
//
// A minor room has no case stand, no beacon and no delivery board. What it owes
// the player is a panel saying something the area panels do not: on this site,
// what the sheet actually does to a four-kilovolt-a-metre field, and what a
// shot costs in consumables before anybody talks about volts.
//
// Hand-written, and merged over the generated `interiors.js` in theme.js.
// `tools/import-book.mjs` never writes this file. See gamekit/PLACEMENT_PASS.md.
export const MINOR_INTERIORS = {
  SCREEN: {
    caption: 'Conducting sheet on all six faces. The flat outside is at four kilovolts a metre '
      + 'and the meter in here reads nothing at all.',
    standLine: 'A door left ajar is not a screened room, and the fingerstock is what makes the door a face.',
    station: { kind: 'panel', title: 'Screened room', rows: [
      { label: 'Field outside', value: '4.0 kV/m', status: 'alarm' },
      { label: 'Field inside', value: '0.00 kV/m', status: 'normal' },
      // SHORT. 'fingerstock, all four edges' ran straight over its own label in the
      // render — the panel's value column is narrow and nothing warns you.
      { label: 'Door seal', value: 'fingerstock', status: 'normal' },
      { label: 'Record window', value: '1 µs', status: 'high' },
    ] },
  },
  ROCKETS: {
    caption: 'Two-metre rockets, spools of fine wire and igniters, counted out before a shot '
      + 'and counted back after it.',
    standLine: 'A season is as long as the store is, and nothing here is made on site.',
    station: { kind: 'panel', title: 'Rocket store', rows: [
      { label: 'Rockets in stores', value: '9', status: 'low' },
      { label: 'Wire on the spool', value: '700 m a shot', status: 'normal' },
      { label: 'Igniters', value: '14', status: 'normal' },
      { label: 'Shots fired this season', value: '3', status: 'normal' },
    ] },
  },
};
