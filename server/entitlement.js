/* Who may open a course, and why.
 *
 * The whole of the subscription question that is OURS rather than a payment
 * provider's. Stripe, Apple and a school invoice all answer "has this person
 * paid"; none of them answers "may this request have this file", and that
 * answer has to live in one place or it will be written three times and differ.
 *
 * Four things it is built around.
 *
 * IT IS OFF BY DEFAULT. `ENTITLEMENT_ENFORCED` is unset everywhere until the
 * day it is not, and with it unset every signed-in account plays everything,
 * exactly as today. That is what lets the layer be built, deployed, tested and
 * corrected while a TestFlight beta runs unlocked — the alternative is a flag
 * day where billing, enforcement and a public release all happen in one deploy
 * and the first failure locks out paying customers.
 *
 * IT FAILS OPEN. A database that will not answer, a row that makes no sense, a
 * clock that disagrees: every one of those lets the player in, and logs. The
 * two failures are not equal. Letting somebody play free for an afternoon costs
 * a subscription; locking a paying teacher out in front of a class costs the
 * customer, and they will not be back to try again on Thursday.
 *
 * A LAPSED SUBSCRIPTION IS A LOCK, NOT A DELETE. Nothing here touches saves,
 * results or accounts. terms.html promises exactly that, and this file is where
 * the promise is either kept or quietly broken.
 *
 * THE DECISIONS ARE PURE. isEntitled(), needsEntitlement() and themeOf() take
 * their inputs and return an answer — no database, no request, no clock of
 * their own — so scripts/test-entitlement.js can put every case to them in Node
 * with nothing running. The impure half is two queries at the bottom.
 */

function db() { return require("./db").pool; }

/* Enforcement, and the free list, read once at load.
 *
 * Read once because a flag that can change under a running process gives two
 * requests in the same second different answers, and the bug that produces is
 * unreproducible by construction. Changing either means a restart, which is the
 * honest cost of changing who may play.
 */
const ENFORCED = /^(1|true|yes|on)$/i.test(String(process.env.ENTITLEMENT_ENFORCED || ""));

// Courses anybody signed in may play, subscription or not — the sample that
// makes a shelf worth signing up to look at. Empty unless set:
// FREE_THEMES=hospital,quantum
const FREE_THEMES = new Set(
  String(process.env.FREE_THEMES || "")
    .split(",").map((s) => s.trim()).filter(Boolean),
);

/* How long past the end of a paid period somebody still plays.
 *
 * Not generosity. A card that fails on renewal is retried by Stripe for days,
 * and Apple's billing retry runs longer than that — so the window between "the
 * period ended" and "we know whether they renewed" is real, and everybody in it
 * has paid every time so far. Locking them out during it is a support ticket
 * from a customer who is about to succeed.
 */
const GRACE_DAYS = Number(process.env.ENTITLEMENT_GRACE_DAYS || 3);
const DAY = 24 * 60 * 60 * 1000;

// How long a client may believe an entitlement it was told about while offline.
// An installed course plays with no network by design, so the check cannot be
// per launch; a week is long enough to survive a holiday and short enough that
// a cancelled subscription stops mattering quickly.
const OFFLINE_DAYS = Number(process.env.ENTITLEMENT_OFFLINE_DAYS || 7);

// A status that entitles while its period is unexpired. `canceled` is on the
// list deliberately: cancelling stops the next renewal, and the period already
// paid for runs to its end — which is what terms.html says, and what every
// subscriber expects. What ends access is the date, not the intent.
const LIVE = new Set(["active", "trialing", "canceled", "grace"]);

/* Is this row good right now?
 *
 * A null period end means an entitlement with no end — a school agreement, a
 * comp, a lifetime grant — and it lasts while its status is live.
 */
function rowLive(row, now) {
  if (!row || !LIVE.has(String(row.status))) return false;
  const end = row.current_period_end ? new Date(row.current_period_end).getTime() : null;
  if (end === null) return true;
  if (!Number.isFinite(end)) return false;
  return now <= end + GRACE_DAYS * DAY;
}

/* The answer, from every entitlement a person holds.
 *
 * Any live one is enough — somebody may hold a personal subscription and sit in
 * a school's licence, and the two must not cancel each other out. The `until`
 * returned is the furthest away, for the same reason.
 */
function isEntitled(rows, now = Date.now()) {
  const live = (Array.isArray(rows) ? rows : []).filter((r) => rowLive(r, now));
  if (!live.length) return { entitled: false, until: null, source: null };
  // Furthest end wins, and a null end beats every date.
  let best = live[0], bestEnd = -Infinity, forever = false;
  for (const r of live) {
    if (!r.current_period_end) { best = r; forever = true; break; }
    const t = new Date(r.current_period_end).getTime();
    if (t > bestEnd) { bestEnd = t; best = r; }
  }
  return {
    entitled: true,
    until: forever ? null : new Date(bestEnd).toISOString(),
    source: best.source || null,
  };
}

/* Which theme a path is asking for, or null if it is not asking for a course.
 *
 * The shelf, the catalogue and the hero shots are NOT courses — they are the
 * shop window, and a window nobody may look in until they have paid is not a
 * window. Getting this wrong in the other direction is worse and quieter: a
 * prefix test on "/games" locks the shelf itself, and the symptom is a visitor
 * who can never get far enough to subscribe.
 */
function themeOf(pathname) {
  if (typeof pathname !== "string" || pathname[0] !== "/") return null;
  const m = /^\/games\/([A-Za-z0-9_-]+)\//.exec(pathname);
  if (!m) return null;
  const theme = m[1];
  // The shelf's own furniture lives under the same prefix.
  if (theme === "shots") return null;
  return theme;
}

/* Does this request need a subscription?
 *
 * Deliberately narrow: course pages and their files, nothing else. Not the
 * save API, not the account API, not the co-op API. A player whose subscription
 * lapsed mid-campaign must still be able to sync the day they played, read
 * their own results, and delete their account — the last of which terms.html
 * promises stays available whether subscribed or not, and gating /api/* would
 * quietly take it away.
 */
function needsEntitlement(pathname) {
  const theme = themeOf(pathname);
  if (!theme) return false;
  if (FREE_THEMES.has(theme)) return false;
  return true;
}

// ---------------------------------------------------------------------------
// The impure half.

async function entitlementsFor(userId) {
  const { rows } = await db().query(
    `SELECT source, status, plan, current_period_end
       FROM entitlements
      WHERE user_id = $1`,
    [userId],
  );
  return rows;
}

/* What the app is allowed to do, for one account.
 *
 * `offlineUntil` is what a client may cache: the entitlement's own end, or a
 * week out, whichever is sooner. Cheerfully approximate — it decides how long
 * an aeroplane keeps working, not who has paid.
 */
async function statusFor(userId, now = Date.now()) {
  if (!ENFORCED) {
    return { enforced: false, entitled: true, until: null, source: null,
             offlineUntil: new Date(now + OFFLINE_DAYS * DAY).toISOString() };
  }
  let rows = [];
  try {
    rows = await entitlementsFor(userId);
  } catch (err) {
    // Fail open, loudly. See the header: an outage must not lock out the people
    // who have paid.
    console.error("[entitlement] could not read entitlements, letting them in:", err.message);
    return { enforced: true, entitled: true, until: null, source: "fail-open",
             offlineUntil: new Date(now + DAY).toISOString() };
  }
  const out = isEntitled(rows, now);
  const cap = now + OFFLINE_DAYS * DAY;
  const end = out.until ? new Date(out.until).getTime() : cap;
  return {
    enforced: true, ...out,
    offlineUntil: out.entitled ? new Date(Math.min(cap, end)).toISOString() : null,
  };
}

/* The gate, for pages.
 *
 * Sits AFTER the sign-in gate in server/index.js, and that order is the whole
 * of it: an unsubscribed visitor and a signed-out one need different answers,
 * and a signed-out one asked to subscribe has been asked the wrong question.
 */
function requireEntitlement(goTo) {
  return async (req, res, next) => {
    if (!ENFORCED) return next();
    if (!needsEntitlement(req.path)) return next();
    const userId = req.userId || (req.auth && req.auth.userId) || null;
    // No user should be impossible here — the sign-in gate ran first — so this
    // is a wiring error rather than a visitor, and it fails open like the rest.
    if (!userId) {
      console.error("[entitlement] no user on a gated path; is the gate ordered wrong?", req.path);
      return next();
    }
    const out = await statusFor(userId);
    if (out.entitled) return next();
    const theme = themeOf(req.path);
    return goTo(res, "/games/?locked=" + encodeURIComponent(theme || ""));
  };
}

/* Write an entitlement. One row per (user, source), so a renewal updates rather
 * than accumulating and a webhook delivered twice is not two subscriptions.
 */
async function grant(userId, { source, status = "active", plan = null,
                               currentPeriodEnd = null, externalId = null, raw = null }) {
  const { rows } = await db().query(
    `INSERT INTO entitlements (user_id, source, status, plan, current_period_end, external_id, raw)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (user_id, source) DO UPDATE SET
       status = EXCLUDED.status, plan = EXCLUDED.plan,
       current_period_end = EXCLUDED.current_period_end,
       external_id = EXCLUDED.external_id, raw = EXCLUDED.raw,
       updated_at = now()
     RETURNING user_id, source, status, plan, current_period_end`,
    [userId, source, status, plan, currentPeriodEnd, externalId, raw],
  );
  return rows[0];
}

module.exports = {
  ENFORCED, FREE_THEMES, GRACE_DAYS, OFFLINE_DAYS, LIVE,
  rowLive, isEntitled, themeOf, needsEntitlement,
  entitlementsFor, statusFor, requireEntitlement, grant,
};
