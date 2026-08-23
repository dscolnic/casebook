/* Who may open a course — server/entitlement.js.
 *
 * Every case here is one where being wrong is expensive and quiet. A paywall
 * has two failure directions and they are not symmetric: letting somebody play
 * free costs a subscription, and locking a paying teacher out in front of a
 * class costs the customer. So the cases are weighted accordingly, and the
 * traps at the bottom are the ones that would pass every positive assertion
 * while doing something indefensible.
 *
 * Pure decisions only — no database, no server, no credentials.
 *
 *   node scripts/test-entitlement.js
 */
const { isEntitled, rowLive, themeOf, needsEntitlement, LIVE, GRACE_DAYS } =
  require('../server/entitlement');

let pass = 0;
const fails = [];
const ok = (label, cond) => { if (cond) pass++; else fails.push(label); };

const NOW = 1_700_000_000_000;
const DAY = 24 * 60 * 60 * 1000;
const at = (days) => new Date(NOW + days * DAY).toISOString();
const row = (o) => ({ source: 'stripe', status: 'active', plan: 'monthly',
                      current_period_end: at(10), ...o });

// ---------------------------------------------------------------------------
// 1. The ordinary cases.

ok('a live subscription entitles', isEntitled([row()], NOW).entitled);
ok('no rows at all does not', isEntitled([], NOW).entitled === false);
ok('neither does undefined', isEntitled(undefined, NOW).entitled === false);
ok('an expired subscription does not',
   isEntitled([row({ current_period_end: at(-30) })], NOW).entitled === false);
ok('a trial entitles', isEntitled([row({ status: 'trialing' })], NOW).entitled);

// THE ONE EVERY SUBSCRIBER EXPECTS AND MOST CODE GETS WRONG. Cancelling stops
// the next renewal; the period already paid for runs to its end. terms.html
// says exactly this. Locking somebody out the moment they press Cancel takes
// away time they have paid for, and it is the most infuriating way to be wrong.
ok('cancelled but not yet expired still plays',
   isEntitled([row({ status: 'canceled', current_period_end: at(9) })], NOW).entitled);
ok('cancelled and expired does not',
   isEntitled([row({ status: 'canceled', current_period_end: at(-9) })], NOW).entitled === false);

// ---------------------------------------------------------------------------
// 2. The grace period. A card that fails on renewal is retried for days, and
//    everybody inside that window has paid every time so far.

ok('a day past the end is still in grace',
   isEntitled([row({ current_period_end: at(-1) })], NOW).entitled);
ok(`${GRACE_DAYS + 5} days past the end is not`,
   isEntitled([row({ current_period_end: at(-(GRACE_DAYS + 5)) })], NOW).entitled === false);
ok('the boundary is inclusive rather than off by one',
   rowLive(row({ current_period_end: at(-GRACE_DAYS) }), NOW));

// ---------------------------------------------------------------------------
// 3. More than one entitlement. Somebody may hold a personal subscription AND
//    sit in a school's licence, and the two must not cancel each other out.

{
  const rows = [row({ source: 'stripe', current_period_end: at(-40) }),
                row({ source: 'school', current_period_end: at(200) })];
  const out = isEntitled(rows, NOW);
  ok('a dead row beside a live one still entitles', out.entitled);
  ok('and the answer names the source that is actually paying', out.source === 'school');
  ok('and reports the furthest end, not the first', out.until === at(200));
}
{
  // A school agreement with no end date. Null must beat every date rather than
  // sorting as zero, which is what a naive comparison does — and the symptom is
  // a school licence that expires on the personal subscription's date.
  const rows = [row({ source: 'stripe', current_period_end: at(3) }),
                row({ source: 'school', current_period_end: null })];
  const out = isEntitled(rows, NOW);
  ok('an entitlement with no end wins over a dated one', out.entitled && out.until === null);
  ok('and names itself as the source', out.source === 'school');
}
ok('an open-ended entitlement lasts',
   isEntitled([row({ current_period_end: null })], NOW + 4000 * DAY).entitled);
ok('but not once its status stops being live',
   isEntitled([row({ status: 'refunded', current_period_end: null })], NOW).entitled === false);

// ---------------------------------------------------------------------------
// 4. Rubbish in. Every one of these must decide something rather than throw —
//    a paywall that throws is a paywall that 500s the course.

for (const bad of [null, undefined, {}, { status: 'active' }, 'active', 42]) {
  let threw = false, out = null;
  try { out = isEntitled([bad], NOW); } catch (e) { threw = true; }
  ok(`survives a row of ${JSON.stringify(bad)}`, !threw && !!out);
}
ok('an unparseable date is not an entitlement',
   isEntitled([row({ current_period_end: 'next Tuesday' })], NOW).entitled === false);
ok('a status of the wrong case is not quietly accepted',
   isEntitled([row({ status: 'ACTIVE' })], NOW).entitled === false);

// ---------------------------------------------------------------------------
// 5. WHICH PATHS ARE GATED. The expensive half.
//
// Getting this wrong in the permissive direction gives a course away. Getting
// it wrong in the other direction locks the SHOP WINDOW — and a visitor who
// cannot see the shelf can never get far enough to subscribe, which is a
// failure that looks like nobody wanting the product.

for (const p of ['/games/quantum/index.html', '/games/quantum/assets/app.js',
                 '/games/blackout/index.html', '/games/deepwatch_ms/x/y/z.png']) {
  ok(`gated: ${p}`, needsEntitlement(p) === true);
}
for (const p of ['/games/', '/games/index.html', '/games/games.json', '/games',
                 '/games/shots/quantum.png', '/games/shots/red_sand.jpg',
                 '/privacy.html', '/terms.html', '/contact.html', '/sign-in.html',
                 '/api/save', '/api/entitlement', '/api/account', '/', '/teacher.html']) {
  ok(`not gated: ${p}`, needsEntitlement(p) === false);
}

// The account API in particular. terms.html promises deletion stays available
// whether subscribed or not, and gating /api/* would quietly break that promise
// for exactly the people most likely to use it.
ok('a lapsed subscriber can still delete their account', needsEntitlement('/api/account') === false);
ok('and still sync the day they played', needsEntitlement('/api/save') === false);

ok('themeOf reads the theme', themeOf('/games/quantum/index.html') === 'quantum');
ok('themeOf ignores the shelf', themeOf('/games/index.html') === null);
ok('themeOf ignores the hero shots', themeOf('/games/shots/quantum.png') === null);
for (const junk of [null, undefined, 42, '', 'games/quantum/', 'https://x/games/q/']) {
  ok(`themeOf refuses ${JSON.stringify(junk)}`, themeOf(junk) === null);
}

// ---------------------------------------------------------------------------
// 6. Traps. Each is a plausible implementation, and each breaks exactly one
//    thing that every assertion above would still pass.

const traps = [];
const trap = (name, fn) => traps.push({ name, fn });

// The classic. `startsWith('/games')` is the obvious way to write "a course",
// and it locks the shelf, the catalogue and the hero shots behind the paywall.
// Every gated case above still passes.
trap('a prefix test locks the shelf itself', () => {
  const gate = (p) => typeof p === 'string' && p.startsWith('/games');
  return gate('/games/quantum/index.html') && gate('/games/index.html') &&
         !needsEntitlement('/games/index.html');
});

// Treating `canceled` as "no longer entitled". Passes every case about expiry,
// and takes away time somebody has paid for.
trap('cancelling ends access immediately', () => {
  const live = new Set(['active', 'trialing']);
  const bad = live.has('canceled');
  return !bad && LIVE.has('canceled');
});

// Sorting a null period end as 0. The school licence then "ends" on whatever
// date the personal subscription carries, and only for people holding both.
trap('a null end sorts as zero', () => {
  const rows = [{ source: 'stripe', status: 'active', current_period_end: at(3) },
                { source: 'school', status: 'active', current_period_end: null }];
  const naive = rows.slice().sort((a, b) =>
    new Date(b.current_period_end || 0) - new Date(a.current_period_end || 0))[0];
  return naive.source === 'stripe' && isEntitled(rows, NOW).source === 'school';
});

// No grace period. Correct-looking, and it locks out everybody Stripe is
// mid-retry on — who overwhelmingly do end up paying.
trap('no grace period', () => {
  const strict = (r) => NOW <= new Date(r.current_period_end).getTime();
  const r = row({ current_period_end: at(-1) });
  return !strict(r) && rowLive(r, NOW);
});

for (const t of traps) {
  let held = false;
  try { held = t.fn() === true; } catch (e) { held = false; }
  if (held) pass++; else fails.push(`TRAP did not demonstrate the bug: ${t.name}`);
}

// ---------------------------------------------------------------------------
console.log(`${pass} passed, ${fails.length} failed`);
if (fails.length) {
  for (const f of fails) console.error('  FAIL ' + f);
  process.exit(1);
}
