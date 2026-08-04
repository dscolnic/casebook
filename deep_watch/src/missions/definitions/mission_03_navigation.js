/**
 * Mission 3 — Position Without a Trusted Fix (Unit I: Qualify on the Boat).
 *
 * The boat has been submerged for hours on dead reckoning. The plot is a
 * confident-looking line drawn from course and speed, and it has no idea about
 * the two knots of water that has been setting the boat sideways the whole time.
 * Ahead is a bank. The player has to work out not where they are, but how well
 * they know where they are, and then choose a route that survives being wrong.
 *
 * The Casebook trap is the required one from the spec, undisguised: the chart
 * overlay and the electronic plot repeat agree perfectly, because both are drawn
 * from the same inertial navigator. Taking a "fix" from either shrinks the
 * uncertainty ring without moving the estimate one yard — precision with no
 * accuracy. Only the fathometer is independent.
 *
 * Source games: Dead Reckoning (`nc_dr_1`), Ballpark (`nc_bp_depth`),
 * Casebook (`nc_greywake_case`).
 */
export const mission03Navigation = {
  id: 'mission_03_navigation',
  title: 'Position Without a Trusted Fix',
  unit: 1,
  startLocation: 'control_room',
  sourceGames: ['Dead Reckoning', 'Ballpark', 'Casebook'],
  sourceIds: ['nc_dr_1', 'nc_bp_depth', 'nc_greywake_case'],
  learningObjectives: [
    'Record the datum: know exactly when your position last came from a measurement.',
    'Advance a dead-reckoned plot, and account for the water separately from the boat.',
    'Recognise two displays that agree because they share one degraded source.',
    'Use an independent measurement — the bottom — to correct a plot, not just to confirm it.',
    'Convert a position uncertainty into water under the keel, and pick a route that survives it.',
  ],

  onStart(rt) {
    const { state, nav } = rt;
    state.depth = 70;
    state.orderedDepth = 70;
    state.speed = 8;
    state.heading = 20;
    state.orderedHeading = 20;
    // Three and a half hours of a 0.55 kn set of 118° that nobody has applied:
    // the truth is about two miles east-south-east of the plot, which is exactly
    // the direction the water has been pushing. The forecast the chart table shows
    // is close but not right, so applying it helps and does not finish the job.
    nav.seed({
      truePosition: { x: 2.23, y: 1.28 },
      estimatedPosition: { x: 0.5, y: 2.2 },
      current: { set: 118, drift: 0.55 },
      forecast: { set: 105, drift: 0.30 },
      uncertainty: 1.9,
      fixAgeMin: 214,
    });
    rt.toast('Position Without a Trusted Fix',
      'Three and a half hours since the last fix, a bank ahead, and a plot that has been drawn from course and speed alone.');
  },

  stages: [
    {
      id: 'record_datum',
      target: { interactable: 'navigation', compartment: 'control_room' },
      label: 'The Datum',
      objective: 'At the navigation table, record the last trusted position and how old it is.',
      hints: [
        'The chart table is on the starboard side of the control room.',
        'The Plot face has the button. Note the age — everything since then is assumption.',
      ],
      arm: (rt) => rt.onEvent('nav:lastFixRecorded',
        'Datum recorded. Three and a half hours of dead reckoning stands on it.')(rt),
    },
    {
      id: 'advance_dr',
      target: { interactable: 'navigation', compartment: 'control_room' },
      label: 'Distance Run',
      objective: 'On the Dead reckoning face, work the distance run and apply the current to the plot.',
      hints: [
        'Speed × time is the advance along the course. The set and drift is a separate offset on top of it.',
        'The table already shows you the set and the drift. Enter them and apply.',
        'A dead-reckoned plot does not know about water. It only knows what you tell it.',
      ],
      arm: (rt) => rt.onEvent('nav:currentApplied',
        'Plot advanced for set and drift. That is the boat AND the water accounted for — as far as the numbers you were given go.')(rt),
    },
    {
      id: 'false_fix',
      target: { interactable: 'navigation', compartment: 'control_room' },
      label: 'Two Displays, One Source',
      objective: 'Try to fix the position from the navigation displays on the Fix sources face, and read what the source-dependency graph is telling you.',
      hints: [
        'Take a fix from the inertial navigator or the plot repeat and watch what happens to the estimate.',
        'The ring gets smaller. Did the position move? Ask why not.',
        'Both displays are drawn from Inertial navigator A. They cannot check each other.',
      ],
      arm: (rt) => {
        const off = rt.bus.on('nav:fixTaken', (f) => {
          if (!f.independent) {
            rt.flags.sawFalseFix = true;
            rt.complete('The ring shrank and the estimate did not move a yard. Two displays off one inertial unit will agree with each other all the way onto the bank.');
          }
        });
        return off;
      },
    },
    {
      id: 'sound_bottom',
      target: { interactable: 'navigation', compartment: 'control_room' },
      label: 'Ask the Bottom',
      objective: 'Get an independent measurement: sound the bottom on the Dead reckoning face and compare it with the charted depth at the estimate.',
      hints: [
        'The fathometer does not care what the inertial unit thinks.',
        'If the sounding and the chart disagree at your estimated position, the estimate is wrong — not the sea.',
      ],
      arm: (rt) => rt.onEvent('nav:sounded',
        'The bottom says something different from the plot. One honest disagreement is worth more than two displays agreeing.',
        (p) => Math.abs(p.diff) > 8)(rt),
    },
    {
      id: 'independent_fix',
      target: { interactable: 'navigation', compartment: 'control_room' },
      label: 'A Real Fix',
      objective: 'Take the bottom-contour fix on the Fix sources face and reset the plot on something that does not share the inertial source.',
      hints: ['Fix sources face → Bottom-contour comparison → Fix.'],
      arm: (rt) => rt.onEvent('nav:fixTaken',
        'Estimate moved onto the contour and the ring reset for a real reason. That is the difference between confidence and accuracy.',
        (p) => p.independent)(rt),
    },
    {
      id: 'choose_route',
      target: { interactable: 'navigation', compartment: 'control_room' },
      label: 'The Route',
      objective: 'On the Route face, pick a route out of the area that stays safe even at the edge of your position ring.',
      hints: [
        'Charted least depth is what the chart promises if you are exactly where you think you are.',
        'Your ring says you might be a fraction of a mile off. On a bank that shoals, that is metres of water.',
        'The shortest route is not the one with the most water.',
      ],
      arm: (rt) => {
        const off = rt.bus.on('nav:routeChosen', (r) => {
          if (r.safe) {
            rt.flags.routeSafe = true;
            rt.complete(`${r.name} ordered — ${r.clearance.toFixed(0)} m under the keel even if you are at the edge of the ring.`);
          } else {
            rt.flags.unsafeRoutes = (rt.flags.unsafeRoutes || 0) + 1;
            rt.toast('Not enough water', 'At the edge of your ring that route puts the bank inside your draft. Either shrink the ring or take the deeper way round.');
          }
        });
        return off;
      },
    },
    {
      id: 'verify_contour',
      target: { interactable: 'navigation', compartment: 'control_room' },
      label: 'Verify',
      objective: 'Steady on the new course, then sound the bottom again and confirm the plot and the chart now agree.',
      hints: [
        'Give the boat a minute on the new course before you sound.',
        'Agreement between the sounding and the chart at the estimated position is the check that the fix actually worked.',
      ],
      arm: (rt) => rt.onEvent('nav:sounded',
        'Sounding matches the charted contour at the estimate. The plot is a measurement again, not an assumption.',
        (p) => Math.abs(p.diff) < 8)(rt),
    },
    {
      id: 'file_report',
      label: 'Notebook',
      objective: 'Open the notebook (N) and file the navigation report.',
      hints: ['Press N, then the Mission report tab.'],
      arm: (rt) => rt.onEvent('notebook:reportSubmitted', 'Navigation report filed.')(rt),
    },
  ],

  scoring: (rt) => {
    const f = rt.flags;
    const parts = [];
    let score = 0;
    const add = (label, got, max, why) => { score += got; parts.push({ label, got: Math.round(got), max, why }); };

    add('Common-mode error', f.sawFalseFix ? 25 : 10, 25,
      f.sawFalseFix
        ? 'Recognised that two navigation displays sharing one inertial source cannot corroborate each other.'
        : 'Never tested the dependent fix sources.');

    const independent = rt.nav.fixes.filter((x) => x.independent).length;
    add('Independent fix', independent ? 25 : 0, 25,
      independent ? 'Corrected the plot from the fathometer, which does not share the inertial source.' : 'No independent fix taken.');

    const finalError = rt.nav.trueError;
    add('Position accuracy', Math.max(0, 20 - finalError * 12), 20,
      `Final estimate was ${finalError.toFixed(2)} nm from the true position.`);

    const unsafe = f.unsafeRoutes || 0;
    add('Route judgement', Math.max(0, 20 - unsafe * 7), 20,
      unsafe ? `${unsafe} route${unsafe > 1 ? 's' : ''} proposed that the position ring did not support.`
             : 'Chose a route that survived the position uncertainty first time.');

    const hints = rt.hintsUsed || 0, skipped = rt.skipped || 0;
    add('Independence', Math.max(0, 10 - hints * 2 - skipped * 4), 10,
      [hints ? `${hints} hint${hints > 1 ? 's' : ''}` : null, skipped ? `${skipped} skipped` : null]
        .filter(Boolean).join('; ') || 'No hints taken, nothing skipped.');

    rt.scoreParts = parts;
    return Math.max(0, Math.min(100, Math.round(score)));
  },
};
