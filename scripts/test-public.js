/* Which paths are readable with no session — server/publicPaths.js.
 *
 * Every case here is a path whose failure is INVISIBLE to the person who broke
 * it. Behind the sign-in gate each one answers 302 to /sign-in.html, which is a
 * valid response that a manifest parser, a worker registration, a JSON parser
 * and an App Store reviewer all fail at differently and quietly — and all of
 * them work when you test them, because you are signed in. There is no browser
 * check for this. This file is the check.
 *
 * The traps at the bottom are the part that matters. A test that asserts a list
 * contains what the list contains passes for ever, including after somebody
 * reorders the gate so the list is consulted too late to matter. Each trap puts
 * one specific bug back and asserts it breaks exactly the cases it claims and
 * no others — because a trap that fires for the wrong reason is worse than none.
 *
 *   node scripts/test-public.js
 */
const fs = require('fs');
const path = require('path');
const { isPublic } = require('../server/publicPaths');

const ROOT = path.join(__dirname, '..');
let pass = 0;
const fails = [];

function ok(label, cond) {
  if (cond) { pass++; return; }
  fails.push(label);
}

// ---------------------------------------------------------------------------
// 1. Public, and why each one has to be.

const PUBLIC = [
  ['/privacy.html', 'App Store Connect requires the privacy URL, read with no account'],
  ['/support.html', 'App Store Connect requires the support URL, read with no account'],
  ['/legal.css', 'the two public pages are unreadable without their stylesheet'],
  ['/manifest.webmanifest', 'fetched without credentials; a 302 makes the app uninstallable'],
  ['/sw.js', 'must arrive as JavaScript or registration fails'],
  ['/sw-policy.js', 'importScripts from the worker'],
  ['/offline.html', 'served by the worker when there is no network and no session'],
  ['/icon-180.png', 'apple-touch-icon'],
  ['/icon-192.png', 'manifest icon'],
  ['/icon-512.png', 'manifest icon'],
  ['/sign-in.html', 'read by definition without a session'],
  ['/sign-out.html', 'read while the session is being destroyed'],
  ['/games/shots/quantum.png', 'the hero shot behind the sign-in card'],
  ['/games/shots/red_sand.jpg', 'hero shots, either extension'],
  ['/api/save', 'answers 401 itself; a 302 would reach a JSON parser as HTML'],
  ['/api/auth/user', 'same'],
];
for (const [p, why] of PUBLIC) ok(`public: ${p} — ${why}`, isPublic(p) === true);

// ---------------------------------------------------------------------------
// 2. Gated. The app is behind a sign-in and these must stay behind it.

const GATED = [
  '/games/',                   // the shelf
  '/games/index.html',
  '/games/quantum/index.html', // a campaign
  '/games/games.json',         // the catalogue
  '/teacher.html',             // somebody else's roster
  '/room.html',
  '/join.html',
  '/',
];
for (const p of GATED) ok(`gated: ${p}`, isPublic(p) === false);

// A near miss on each pattern, because a regex written with . instead of \. or
// without an anchor is the way one of these silently opens up a directory.
const NEAR = [
  '/icon-192.png.html',
  '/iconx192.png',
  '/icon-192xpng',             // an unescaped dot in the icon pattern lets this in
  '/icon-.png',
  '/games/shots/../../server/db.js',
  '/games/shots/../../server/leaked.png',   // a shot pattern allowing / walks out
  '/games/shots/quantum.png/../../index.html',
  '/games/shotsx/quantum.png',
  '/privacy.html.bak',
  '/notprivacy.html',
  '/apix/save',
  '/api',                      // the prefix without its slash is not the API
];
for (const p of NEAR) ok(`near miss stays gated: ${p}`, isPublic(p) === false);

// Not a path at all.
for (const junk of [null, undefined, 42, {}, '', 'privacy.html', 'https://elsewhere/privacy.html']) {
  ok(`refuses ${JSON.stringify(junk)}`, isPublic(junk) === false);
}

// ---------------------------------------------------------------------------
// 3. The file has to exist, or the exemption serves a 404 to the reviewer.
//
// This is the half a pure-function test cannot reach: /privacy.html can be
// perfectly public and simply not be there. Both failures look identical from
// App Store Connect, which reports only that the URL did not work.

for (const p of ['/privacy.html', '/support.html', '/legal.css', '/offline.html',
                 '/manifest.webmanifest', '/sw.js', '/sw-policy.js',
                 '/icon-180.png', '/icon-192.png', '/icon-512.png']) {
  ok(`file exists: ${p}`, fs.existsSync(path.join(ROOT, p.slice(1))));
}

// And the two public pages must link each other and the shelf, because a
// reviewer landing on one with no navigation is a dead end.
const privacy = fs.readFileSync(path.join(ROOT, 'privacy.html'), 'utf8');
const support = fs.readFileSync(path.join(ROOT, 'support.html'), 'utf8');
ok('privacy links support', privacy.includes('/support.html'));
ok('support links privacy', support.includes('/privacy.html'));
ok('privacy links the shelf', privacy.includes('/games/'));
ok('both load the shared stylesheet',
   privacy.includes('/legal.css') && support.includes('/legal.css'));
// A policy with no way to contact anybody does not satisfy the requirement.
ok('privacy carries a contact address', /mailto:[^"']+@[^"']+/.test(privacy));
ok('support carries a contact address', /mailto:[^"']+@[^"']+/.test(support));
// The deletion route is the one claim in the policy that is a promise about
// code. If the route goes, the sentence describing it is a false statement.
const index = fs.readFileSync(path.join(ROOT, 'server', 'index.js'), 'utf8');
ok('the account-deletion route the policy promises exists',
   index.includes('app.delete("/api/account"'));

// ---------------------------------------------------------------------------
// 4. index.js consults the list, and consults it BEFORE the session check.
//
// The ordering is the whole defect. A gate that checks getUserId() first and the
// public list second is a gate that redirects every one of these paths while
// containing a correct and complete list of them, and both halves read fine in
// review.

ok('the gate calls isPublic', index.includes('isPublic(req.path)'));
ok('the gate imports it from publicPaths',
   /require\(["']\.\/publicPaths["']\)/.test(index));
{
  const gate = index.indexOf('isPublic(req.path)');
  const session = index.indexOf('if (getUserId(req)) return next();');
  ok('isPublic is consulted before the session check',
     gate > -1 && session > -1 && gate < session);
}
// A second copy of the list in index.js is how the two drift.
ok('index.js keeps no second copy of the list',
   !index.includes('"/manifest.webmanifest"') && !index.includes("'/manifest.webmanifest'"));

// ---------------------------------------------------------------------------
// 5. Traps. Put each bug back, assert it breaks exactly what it claims to.

const traps = [];
function trap(name, breaks, fn) { traps.push({ name, breaks, fn }); }

// Re-implementations of isPublic, each with one thing wrong.
const SETS = {
  auth: ['/sign-in.html', '/sign-out.html'],
  shell: ['/manifest.webmanifest', '/sw.js', '/sw-policy.js', '/offline.html'],
  pages: ['/privacy.html', '/support.html', '/legal.css'],
};
function build({ drop = [], icon = /^\/icon-\d+\.png$/, shot = /^\/games\/shots\/[A-Za-z0-9_-]+\.(jpg|png)$/, api = true } = {}) {
  const all = new Set([...SETS.auth, ...SETS.shell, ...SETS.pages].filter(p => !drop.includes(p)));
  return (p) => {
    if (typeof p !== 'string' || p[0] !== '/') return false;
    if (api && p.startsWith('/api/')) return true;
    if (all.has(p)) return true;
    if (icon.test(p)) return true;
    if (shot.test(p)) return true;
    return false;
  };
}

trap('the privacy page is dropped from the list',
     ['/privacy.html'],
     build({ drop: ['/privacy.html'] }));

trap('the support page is dropped from the list',
     ['/support.html'],
     build({ drop: ['/support.html'] }));

trap('the stylesheet is forgotten, so both public pages render unstyled',
     ['/legal.css'],
     build({ drop: ['/legal.css'] }));

trap('the manifest is dropped, so the app is not installable',
     ['/manifest.webmanifest'],
     build({ drop: ['/manifest.webmanifest'] }));

// The classic: an unanchored regex. It still passes every real icon, so a test
// that checks only the positive cases sees nothing wrong. What it also passes is
// every path ending in "html" — which is most of the app.
trap('the icon pattern loses its anchors',
     ['/icon-192.png.html', '/notprivacy.html', '/games/index.html',
      '/games/quantum/index.html', '/games/shots/quantum.png/../../index.html',
      '/teacher.html', '/room.html', '/join.html'],
     build({ icon: /icon-\d+\.png|html$/ }));

// A dot that is not escaped: /iconx192.png is then public. One character.
trap('the icon pattern does not escape its dot',
     ['/icon-192xpng'],
     build({ icon: /^\/icon-\d+.png$/ }));

// A shot pattern that allows a slash in the name walks out of the directory.
trap('the hero-shot pattern allows a slash in the filename',
     ['/games/shots/../../server/leaked.png'],
     build({ shot: /^\/games\/shots\/.+\.(jpg|png)$/ }));

// Dropping the /api/ exemption sends every fetch() to an HTML sign-in page.
trap('the API exemption is dropped, so fetch() gets HTML',
     ['/api/save', '/api/auth/user'],
     build({ api: false }));

const ALL_CASES = [
  ...PUBLIC.map(([p]) => p), ...GATED, ...NEAR,
];

// The reference is build() with nothing wrong with it, and each trap is diffed
// against THAT rather than against the live isPublic. Diffing against the live
// one looks equivalent and is not: a single real bug in publicPaths.js then
// shows up as a failure in every trap at once, because every trap disagrees
// with the broken module about that path. Nine failures naming nine unrelated
// regexes is how a gate stops being read — worse than the bug, which is one
// line. So the drift between the reference and the real module is asserted once,
// on its own, and says which paths moved.
const reference = build();
{
  const drift = ALL_CASES.filter(p => reference(p) !== isPublic(p));
  ok(`the reference agrees with server/publicPaths.js${drift.length ? ' — drifted on ' + drift.join(', ') : ''}`,
     drift.length === 0);
}

for (const t of traps) {
  const changed = ALL_CASES.filter(p => t.fn(p) !== reference(p));
  const want = [...t.breaks].sort().join(',');
  const got = [...changed].sort().join(',');
  if (want === got) pass++;
  else fails.push(`TRAP ${t.name}\n         expected exactly [${want}]\n         but broke   [${got}]`);
}

// ---------------------------------------------------------------------------
console.log(`${pass} passed, ${fails.length} failed`);
if (fails.length) {
  for (const f of fails) console.error('  FAIL ' + f);
  process.exit(1);
}
