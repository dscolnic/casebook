// horizonShape.js — which way the mountains are.
//
// `buildHorizon` has always accepted an `amp(a)` per rank, called with the
// bearing in radians, and until now every rank in every game returned the
// default 1. The result was that all eight themes shipped the scaffold's two
// concentric rings — a river city, a wartime mesa, a hospital campus and a
// switching station all standing in the middle of the same bowl of hills, which
// is why the landscape never told you which game you were in.
//
// A horizon is the cheapest thing in the engine that can carry a story. It says
// where the valley is, which way the corridor leaves, and what is on the other
// side of the river. All of that is a function of bearing, so this is a small
// set of them.
//
// Bearings, matching the sites' own convention (looking down, -Z is north):
//
//            N  (-π/2)
//              |
//   W (π) ---- + ---- E (0)
//              |
//            S  (π/2)

export const N = -Math.PI / 2;
export const E = 0;
export const S = Math.PI / 2;
export const W = Math.PI;
export const NE = -Math.PI / 4;
export const NW = -3 * Math.PI / 4;
export const SE = Math.PI / 4;
export const SW = 3 * Math.PI / 4;

const TAU = Math.PI * 2;
/** Shortest angular distance between two bearings, always 0…π. */
const apart = (a, b) => Math.abs(((a - b + Math.PI) % TAU + TAU) % TAU - Math.PI);
const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

/**
 * A range of hills over one arc of the compass, falling away outside it.
 *
 * `centre` and `width` are in radians; `hi` is the height multiplier inside the
 * arc and `lo` outside it. `lo` is deliberately not zero by default: a rank that
 * drops to nothing has a visible seam where the geometry meets the sky, and real
 * country almost always has *something* on the skyline.
 */
export function arc(centre, width, { hi = 1, lo = 0.16, fade = 0.55 } = {}) {
  const half = Math.max(0.05, width / 2);
  const soft = Math.max(0.05, half * fade);
  return (a) => {
    const d = apart(a, centre);
    if(d <= half) return hi;
    return hi + (lo - hi) * smooth(clamp01((d - half) / soft));
  };
}

/**
 * Several arcs at once, taking the highest at each bearing.
 *
 * This is how a place gets a real geography rather than a ring: high country on
 * one side, a low broken line on another, open sky where the story wants
 * distance.
 *
 *   amp: ranges([{ at: W, width: 1.6, hi: 1.25 }, { at: N, width: 1.1, hi: 0.5 }], 0.1)
 */
export function ranges(specs, floor = 0.12) {
  const fns = specs.map(s => arc(s.at, s.width, { hi: s.hi ?? 1, lo: s.lo ?? floor, fade: s.fade }));
  return (a) => Math.max(floor, ...fns.map(f => f(a)));
}

/**
 * A gap in an otherwise continuous rank: hills all round except one bearing.
 *
 * The inverse of `arc`, and the one that buys the most on a site whose story is
 * about somewhere else — the corridor leaves this way, the city is out there,
 * the sky at the horizon is where the telescope points.
 */
export function opening(centre, width, { deep = 0.06, hi = 1, fade = 0.7 } = {}) {
  const cut = arc(centre, width, { hi: 1, lo: 0, fade });
  return (a) => hi - (hi - deep) * cut(a);
}

/**
 * A skyline rather than a ridge: flat-topped steps at a few scales.
 *
 * Buildings read as a city because their tops are horizontal and their edges are
 * vertical, which is exactly what the ridge noise in `buildHorizon` destroys. A
 * rank using this still gets that noise added on top, so keep the amplitude
 * high and the rank low: it is a silhouette to sit lights in front of, not a
 * model of a city.
 */
export function skyline(centre, width, { hi = 1, lo = 0.1, seed = 7 } = {}) {
  const within = arc(centre, width, { hi: 1, lo: 0, fade: 0.5 });
  const step = (a, n, s) => {
    const k = Math.floor((a + Math.PI) * n + s);
    // A cheap hash, so the same bearing always gives the same tower.
    const h = Math.sin(k * 12.9898 + s * 78.233) * 43758.5453;
    return h - Math.floor(h);
  };
  return (a) => {
    const w = within(a);
    if(w <= 0.001) return lo;
    const blocks = 0.45 + 0.55 * step(a, 9, seed)      // districts
                 + 0.35 * step(a, 26, seed + 3)        // blocks
                 + 0.22 * step(a, 61, seed + 11);      // individual towers
    return lo + (hi * blocks / 1.3 - lo) * w;
  };
}
