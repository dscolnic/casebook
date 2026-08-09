// interiors.js — what is inside each of the five technical buildings.
//
// The engine builds the room (gamekit/engine/world/interiorBuilding.js); this
// file says what the instrument in it reads. One entry per division id from
// divisions.js.
//
// Everything here is a reading on an instrument: counts, tolerances, purities,
// timing spreads. The game is about measurement and evidence under a deadline,
// so that is what the rooms show — nothing here is a design, a quantity or a
// procedure for building anything.

export const INTERIORS = {
  T: {
    caption: 'A number without its uncertainty is an opinion with a decimal point.',
    standLine: 'Two computing groups have returned estimates that disagree by more than '
      + 'either one’s stated error. One of the two error bars is wrong.',
    station: {
      kind: 'panel', title: 'Computing room',
      rows: [
        { label: 'Group A estimate', value: '1.00 ×', status: 'normal' },
        { label: 'Group B estimate', value: '1.31 ×', status: 'high' },
        { label: 'Stated spread', value: '± 4 %', status: 'alarm' },
        { label: 'Method', value: 'hand computation, checked twice', status: 'normal' },
      ],
    },
  },
  P: {
    caption: 'Counting is a random process. A single run is a sample, not a result.',
    standLine: 'The counter is running against a background that has not been measured '
      + 'today. Everything downstream depends on that subtraction.',
    station: {
      kind: 'vitals', animated: true, wave: 'ecg', rate: 7, title: 'Counting bench',
      rows: [
        { label: 'Counts', value: 412, unit: 'per minute', status: 'normal' },
        { label: 'Background', value: 'not run', unit: 'today', status: 'alarm' },
        { label: 'Dead time', value: 3.1, unit: '% of window', status: 'high' },
      ],
    },
  },
  CM: {
    caption: 'A material is what the analysis says it is, not what the label says.',
    standLine: 'Purity is inside tolerance and the swipe survey outside the glovebox '
      + 'is not. Both belong to the same batch.',
    station: {
      kind: 'panel', title: 'Metallurgy bay',
      rows: [
        { label: 'Purity, assayed', value: '99.4 %', status: 'normal' },
        { label: 'Swipe, bench edge', value: 'above limit', status: 'alarm' },
        { label: 'Glovebox pressure', value: '-12 Pa', status: 'normal' },
        { label: 'Batch traceability', value: 'complete', status: 'normal' },
      ],
    },
  },
  E: {
    caption: 'An interface is where two groups each assumed the other had it.',
    standLine: 'Channel timing across the firing set is inside specification on '
      + 'average and outside it on two channels. Averages do not fire anything.',
    station: {
      kind: 'vitals', animated: true, wave: 'sine', rate: 4, title: 'Timing rig',
      status: 'high',
      rows: [
        { label: 'Spread, all channels', value: 0.9, unit: 'µs', status: 'normal' },
        { label: 'Worst channel', value: 4.2, unit: 'µs', status: 'alarm' },
        { label: 'Qualification shots', value: 6, unit: 'of 20', status: 'low' },
      ],
    },
  },
  X: {
    caption: 'Integration is where four groups’ evidence has to survive being put together.',
    standLine: 'Every group reports success against its own criterion. The question '
      + 'on this bench is whether the four criteria are the same one.',
    station: {
      kind: 'panel', title: 'Integration board',
      rows: [
        { label: 'Theory', value: 'estimate delivered', status: 'normal' },
        { label: 'Diagnostics', value: 'background pending', status: 'high' },
        { label: 'Materials', value: 'batch cleared', status: 'normal' },
        { label: 'Engineering', value: 'two channels out', status: 'alarm' },
        { label: 'Agreed criterion', value: 'none written', status: 'alarm' },
      ],
    },
  },
};
