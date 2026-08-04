/**
 * NavigationSystem — where the boat actually is, where the boat thinks it is, and
 * why those are not the same number.
 *
 * The true position is advanced by course and speed AND by the water the boat is
 * sitting in. The estimate is advanced by course and speed alone, because that is
 * all a dead-reckoning plot knows. The gap between them grows quietly at the drift
 * rate, and the uncertainty ring grows with it. Nothing tells the player the true
 * position, ever — they close the gap by getting a fix from a source that does not
 * share the one that has been drifting.
 *
 * Content lineage:
 *   Dead Reckoning (`dead_reckoning_three_chapter_course_edition.html`, `nc_dr_1`)
 *     — estimate vs truth, set and drift, uncertainty that only a fix resets,
 *       precision versus accuracy.
 *   Ballpark (`ballpark.html`, `nc_bp_depth`) — distance run = speed × time, and
 *     the offset a current puts on you over that time; ranges, not exact answers.
 *   Casebook (`casebook_static.html`, `nc_greywake_case`) — the required scenario:
 *     two navigation displays agree because both are fed by one degraded inertial
 *     unit. Agreement between them is not corroboration.
 *
 * Chart frame: x east, y north, in nautical miles. Heading is degrees true.
 */

/** Where a position fix can come from, and what it actually depends on. */
export const FIX_SOURCES = {
  inertial: {
    name: 'Inertial navigator A', source: 'inertial_A', independent: false,
    note: 'The primary. It has been running a long time since the last reset.',
  },
  plot_repeat: {
    name: 'Electronic plot repeat', source: 'inertial_A', independent: false,
    note: 'A second display of the inertial solution. Not a second measurement.',
  },
  contour: {
    name: 'Bottom-contour comparison', source: 'fathometer', independent: true,
    note: 'Sound the bottom and match the depth against the charted contour band.',
  },
};

/**
 * Bathymetry for the passage: deep water to the south-west, a shoal bank running
 * north-east, and a narrow gut between them. Depth in metres.
 */
export function bottomDepth(x, y) {
  // A bank whose crest runs along y = 0.55x + 3.2.
  const d = (y - (0.55 * x + 3.2)) / Math.sqrt(1 + 0.55 ** 2);
  const bank = 165 * Math.exp(-(d * d) / 1.15);      // shoaling toward the crest
  const base = 240 + x * 3 - y * 4;
  // A pinnacle on the eastern shoulder of the bank. This is what makes a lateral
  // position error dangerous rather than merely untidy: set east onto this and the
  // water goes from comfortable to thirty-odd metres.
  const px = x - 1.15, py = y - 3.85;
  const pinnacle = 92 * Math.exp(-(px * px * 2.6 + py * py * 2.6));
  return Math.max(24, base - bank - pinnacle);
}

/** Candidate routes out of the area. Charted least depth is what the player must weigh. */
export const ROUTES = [
  {
    id: 'north', name: 'North of the bank', course: 42, lengthNm: 9.5,
    chartedLeastDepth: 46, exposure: 'shortest, but the least water',
    waypoints: [[0, 0], [4.4, 4.9], [7.1, 8.6]],
  },
  {
    id: 'gut', name: 'Through the gut', course: 15, lengthNm: 7.8,
    chartedLeastDepth: 62, exposure: 'quickest, narrow, unforgiving of a position error',
    waypoints: [[0, 0], [1.2, 4.0], [2.0, 7.7]],
  },
  {
    id: 'south', name: 'South-about, deep water', course: 335, lengthNm: 13.2,
    chartedLeastDepth: 190, exposure: 'longest, but you cannot hit anything',
    waypoints: [[0, 0], [-3.4, 5.0], [-5.2, 11.9]],
  },
];

export class NavigationSystem {
  constructor({ state, eventBus }) {
    this.state = state;
    this.bus = eventBus;
    this.fixes = [];              // fixes the player has taken this mission
    this.routeChosen = null;
    this.driftApplied = false;    // has the player corrected the plot for the current?
    this._elapsed = 0;
  }

  /** Set up a mission's navigation picture. */
  seed({ truePosition, estimatedPosition, current, forecast, uncertainty, fixAgeMin }) {
    const s = this.state;
    s.truePosition = { ...truePosition };
    s.estimatedPosition = { ...estimatedPosition };
    s.externalCurrent = { ...current };
    // What the navigator has been given to work with. Close to the truth, and not
    // the truth — so applying it improves the plot without closing the gap, and an
    // independent measurement is still needed.
    s.forecastCurrent = { ...(forecast || current) };
    s.navigationUncertainty = uncertainty;
    s.lastTrustedFix = { x: estimatedPosition.x, y: estimatedPosition.y, ageMin: fixAgeMin };
    this.fixes.length = 0;
    this.routeChosen = null;
    this.driftApplied = false;
    this._elapsed = 0;
  }

  reset() { this.seed({
    truePosition: { x: 0, y: 0 }, estimatedPosition: { x: 0, y: 0 },
    current: { set: 210, drift: 1.2 }, uncertainty: 0.3, fixAgeMin: 0,
  }); }

  /** How far off the estimate actually is, nm. Never shown to the player. */
  get trueError() {
    const s = this.state;
    return Math.hypot(s.truePosition.x - s.estimatedPosition.x, s.truePosition.y - s.estimatedPosition.y);
  }

  /** Depth under the keel where the boat really is. */
  soundBottom() {
    const s = this.state;
    const d = bottomDepth(s.truePosition.x, s.truePosition.y);
    return d + (Math.random() - 0.5) * 1.5;
  }

  /** Depth the chart PREDICTS at the estimated position. */
  chartedDepthAtEstimate() {
    const s = this.state;
    return bottomDepth(s.estimatedPosition.x, s.estimatedPosition.y);
  }

  /**
   * Take a fix. Only a source that does not share the drifting inertial unit
   * actually moves the estimate toward the truth; the other two just redraw the
   * same wrong answer with a confident-looking ring.
   */
  takeFix(sourceId) {
    const def = FIX_SOURCES[sourceId];
    if (!def) return { ok: false };
    const s = this.state;
    const before = this.trueError;

    if (def.independent) {
      // Pull the estimate most of the way onto the truth and reset the ring.
      s.estimatedPosition.x += (s.truePosition.x - s.estimatedPosition.x) * 0.88;
      s.estimatedPosition.y += (s.truePosition.y - s.estimatedPosition.y) * 0.88;
      s.navigationUncertainty = 0.25;
      s.lastTrustedFix = { x: s.estimatedPosition.x, y: s.estimatedPosition.y, ageMin: 0 };
    } else {
      // Looks like a fix. Shrinks the ring. Does not move the estimate, because the
      // error is IN the source. This is the trap, and it must be survivable.
      s.navigationUncertainty = Math.max(0.3, s.navigationUncertainty * 0.55);
    }

    const fix = {
      source: sourceId, name: def.name, independent: def.independent,
      clock: s.formatClock(), errorBefore: before, errorAfter: this.trueError,
    };
    this.fixes.push(fix);
    this.bus.emit('nav:fixTaken', fix);
    return { ok: true, ...fix };
  }

  /** The player tells the plot what the current has been doing to them. */
  applyCurrentCorrection(setDeg, driftKn, minutes) {
    const rad = (setDeg * Math.PI) / 180;
    const dist = driftKn * (minutes / 60);
    const s = this.state;
    s.estimatedPosition.x += Math.sin(rad) * dist;
    s.estimatedPosition.y += Math.cos(rad) * dist;
    this.driftApplied = true;
    const err = this.trueError;
    this.bus.emit('nav:currentApplied', { setDeg, driftKn, minutes, dist, errorAfter: err });
    return { dist, errorAfter: err, improved: err < 0.9 };
  }

  /** Choose a route. Safe if the charted least depth clears the boat plus the ring. */
  chooseRoute(routeId) {
    const route = ROUTES.find((r) => r.id === routeId);
    if (!route) return { ok: false };
    const s = this.state;
    // A position ring of U nm can put you U nm off track; on a bank that shoals
    // steeply, that converts straight into lost water under the keel.
    const shoalingPerNm = 95;
    const worstDepth = route.chartedLeastDepth - s.navigationUncertainty * shoalingPerNm;
    const clearance = worstDepth - s.depth;
    const safe = clearance > 15;
    this.routeChosen = { ...route, worstDepth, clearance, safe };
    this.bus.emit('nav:routeChosen', this.routeChosen);
    return { ok: true, ...this.routeChosen };
  }

  update(dt) {
    this._elapsed += dt;
    const s = this.state;
    const hours = dt / 3600;
    const hdg = (s.heading * Math.PI) / 180;

    // Truth: course and speed, plus the water the boat is in.
    s.truePosition.x += Math.sin(hdg) * s.speed * hours;
    s.truePosition.y += Math.cos(hdg) * s.speed * hours;
    const setRad = (s.externalCurrent.set * Math.PI) / 180;
    s.truePosition.x += Math.sin(setRad) * s.externalCurrent.drift * hours;
    s.truePosition.y += Math.cos(setRad) * s.externalCurrent.drift * hours;

    // The plot: course and speed only. It does not know about the water.
    s.estimatedPosition.x += Math.sin(hdg) * s.speed * hours;
    s.estimatedPosition.y += Math.cos(hdg) * s.speed * hours;
  }
}
