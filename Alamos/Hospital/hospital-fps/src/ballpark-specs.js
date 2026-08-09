// ballpark-specs.js — the number-tile estimates, which the book could not supply.
//
// The design book writes its Ballpark activities as four buttons with the
// answer among them: "5 breaths in 15 seconds is about how many in 60 seconds?
// (10 / 15 / 20 / 60)". That is a multiple-choice question about arithmetic,
// not an estimate — the player never handles the quantities, and picking 20
// from a list is not the same skill as knowing that a minute holds four
// fifteen-second parts.
//
// `BALLPARK_CALCS` was empty for this game, so every one of these lessons
// opened with "this estimate has not yet been converted to the number-tile
// format". These are that conversion: the player picks the quantities that
// belong in the calculation, the panel shows the running value on an
// instrument readout, and the verdict puts their answer against the true one.
//
// Keyed by lesson title rather than by day, because each of these appears four
// or five times across the campaign as review lessons on different days.
// theme.js registers one entry per matching lesson.
//
// Every number here is a chart-reading exercise in a fictional hospital. None
// of them is a threshold, a target, or a rule about anybody's care.

export const BALLPARK_BY_TITLE = {
  'Count the Breaths': {
    prompt: 'The nurse counts Mrs. Grant’s breathing while she rests comfortably.',
    question: 'She counted 5 breaths in 15 seconds. Estimate the count for a whole minute.',
    labels: [
      '5 breaths  (counted)',
      '4  (fifteen-second parts in a minute)',
      '15 seconds  (how long she counted)',
      '60 seconds  (one minute)',
      '2  (halves of a minute)',
    ],
    values: [5, 4, 15, 60, 2],
    slots: 2,
    template: '{0} × {1}',
    formula: 'a*b',
    correct: [0, 1],
    target: 20,
    tolerance: 0.5,
    units: 'breaths per minute',
    solution: '5 breaths × 4 fifteen-second parts = 20 breaths per minute.',
    explanation: 'A minute holds four fifteen-second parts, so a fifteen-second count is multiplied by '
      + 'four. Counting for the short window and scaling up is how it is done at the bedside — '
      + 'a full minute of standing still changes how somebody breathes.',
  },

  'Pulse Math': {
    prompt: 'Jordan is resting after climbing the stairs and the therapist takes his pulse.',
    question: 'She counted 18 beats in 15 seconds. Estimate the count for a whole minute.',
    labels: [
      '18 beats  (counted)',
      '4  (fifteen-second parts in a minute)',
      '15 seconds  (how long she counted)',
      '60 seconds  (one minute)',
      '3  (twenty-second parts in a minute)',
    ],
    values: [18, 4, 15, 60, 3],
    slots: 2,
    template: '{0} × {1}',
    formula: 'a*b',
    correct: [0, 1],
    target: 72,
    tolerance: 0.5,
    units: 'beats per minute',
    solution: '18 beats × 4 fifteen-second parts = 72 beats per minute.',
    explanation: 'The same scaling as a breathing count, and the same reason for the short window. '
      + 'Note what it is not: a number that decides anything on its own. What the team watches is '
      + 'the same person’s count before and after, and whether it settles.',
  },

  'The Drink Tracker': {
    prompt: 'Mrs. Lee’s drink tracker has one row for each part of the day.',
    question: 'The chart shows 2 cups in the morning, 1 with lunch and 3 later. Total the chart.',
    labels: [
      '2 cups  (morning)',
      '1 cup  (with lunch)',
      '3 cups  (later)',
      '8 cups  (the empty row on the sheet)',
      '3 rows  (how many entries)',
    ],
    values: [2, 1, 3, 8, 3],
    slots: 3,
    template: '{0} + {1} + {2}',
    formula: 'a+b+c',
    correct: [0, 1, 2],
    target: 6,
    tolerance: 0.5,
    units: 'cups',
    solution: '2 + 1 + 3 = 6 cups on the chart.',
    explanation: 'Reading a chart means totalling what is written on it, including the small entries. '
      + 'The blank row is not a zero and not an eight — it is a row nobody has filled in yet.',
  },

  'Therapy Sets': {
    prompt: 'Mr. Diaz’s therapist has chosen a set of gentle leg lifts for him.',
    question: 'The plan is 3 sets of 5 lifts. Estimate the total number of lifts.',
    labels: [
      '3 sets',
      '5 lifts in a set',
      '2 rest breaks',
      '10 minutes  (how long the session runs)',
      '1 leg at a time',
    ],
    values: [3, 5, 2, 10, 1],
    slots: 2,
    template: '{0} × {1}',
    formula: 'a*b',
    correct: [0, 1],
    target: 15,
    tolerance: 0.5,
    units: 'leg lifts',
    solution: '3 sets × 5 lifts = 15 lifts.',
    explanation: 'Groups of a thing multiply; they do not add. Three sets and five lifts added together '
      + 'gives eight, which is neither the number of sets nor the number of lifts.',
  },

  'Temperature Difference': {
    prompt: 'The chart carries an earlier temperature and a later one, for this arithmetic practice.',
    question: 'The chart reads 98 °F earlier and 101 °F later. How much higher is the later reading?',
    labels: [
      '101 °F  (later reading)',
      '98 °F  (earlier reading)',
      '100 °F  (the round number on the scale)',
      '2 readings  (how many are charted)',
      '3 hours  (between the two)',
    ],
    values: [101, 98, 100, 2, 3],
    slots: 2,
    template: '{0} − {1}',
    formula: 'a-b',
    correct: [0, 1],
    target: 3,
    tolerance: 0.5,
    units: '°F',
    solution: '101 − 98 = 3 °F higher than the earlier reading.',
    explanation: 'A difference is a subtraction, and the order matters: later minus earlier says how '
      + 'much it rose. Adding them gives 199, which is not a temperature anything has.',
  },
};
