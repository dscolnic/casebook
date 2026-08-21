// test-api-base.js — the two halves of api-base.js, in Node.
//
// WHY THIS IS TESTED AND NOT LOOKED AT. Every case here passes in a browser on
// the web whatever the file says, because on the web `base` is empty and the
// function is the identity. The behaviour that matters exists only inside the
// app bundle, on a device, behind a sign-in — and its failure is a 404 on a
// path that reads correctly in the source. So the bundled case is simulated: a
// fake window with a `capacitor:` protocol, which is the actual condition.
//
// Each trap puts one specific bug back and asserts it breaks exactly the cases
// it claims. Diffed against a reference implementation rather than against the
// live module, for the reason scripts/test-public.js gives: diffing against the
// live one makes a single real bug fail every trap at once, and nine failures
// naming nine unrelated rules is how a test stops being read.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = fs.readFileSync(path.join(__dirname, '..', 'api-base.js'), 'utf8');
const REMOTE = 'https://firstpersonlearn.com';

// A window with just enough in it. `fetch` records rather than calls.
function load(protocol, host, mutate) {
  const calls = [];
  const win = {
    location: { protocol, host },
    fetch: (u, o) => { calls.push({ url: u, opts: o }); return Promise.resolve({ ok: true }); }
  };
  win.window = win;
  const src = mutate ? mutate(SRC) : SRC;
  vm.runInNewContext(src, { window: win, globalThis: win, Object });
  return { api: win.FPL_API, calls };
}

const web = (m) => load('https:', 'firstpersonlearn.com', m);
const app = (m) => load('capacitor:', 'localhost', m);

// Every case is a name, and a function of the two loaded modules that throws on
// failure. A case must fail for one reason only, or a trap cannot claim it.
const CASES = [
  ['web: an api path stays relative', ({ w }) => eq(w.api.url('/api/save'), '/api/save')],
  ['web: a ws path stays relative', ({ w }) => eq(w.api.url('/ws/room'), '/ws/room')],
  ['web: base is empty, so base + path is still relative',
    ({ w }) => eq(w.api.base + '/api/save', '/api/save')],
  ['web: bundled is false', ({ w }) => eq(w.api.bundled, false)],
  ['web: the socket follows the page scheme and host',
    ({ w }) => eq(w.api.socketURL('/ws/room?t=1'), 'wss://firstpersonlearn.com/ws/room?t=1')],

  ['app: an api path is made absolute',
    ({ a }) => eq(a.api.url('/api/save'), REMOTE + '/api/save')],
  ['app: a ws path is made absolute',
    ({ a }) => eq(a.api.url('/ws/room'), REMOTE + '/ws/room')],
  ['app: the socket is wss at the deployment, not at localhost',
    ({ a }) => eq(a.api.socketURL('/ws/room?t=1'), 'wss://firstpersonlearn.com/ws/room?t=1')],
  ['app: bundled is true', ({ a }) => eq(a.api.bundled, true)],

  // The bundle half. A game build, the catalogue and a hero shot are all IN the
  // app; sending them to the deployment would put the network in front of
  // offline play, which is the native capability the App Store listing rests on
  // (Guideline 4.2 — a thin wrapper is rejected).
  ['app: a game build stays in the bundle',
    ({ a }) => eq(a.api.url('/games/blackout/index.html'), '/games/blackout/index.html')],
  ['app: an icon stays in the bundle', ({ a }) => eq(a.api.url('/icon-192.png'), '/icon-192.png')],
  ['app: a relative path is untouched', ({ a }) => eq(a.api.url('./games.json'), './games.json')],

  // The auth half.
  ['app: no token means no Authorization header', ({ a }) => {
    a.api.setToken(null);
    a.api.fetch('/api/saves');
    const h = (a.calls.at(-1).opts.headers) || {};
    eq(h.Authorization, undefined);
  }],
  ['app: a token is sent as Bearer', ({ a }) => {
    a.api.setToken('tok_123');
    a.api.fetch('/api/saves');
    eq(a.calls.at(-1).opts.headers.Authorization, 'Bearer tok_123');
    a.api.setToken(null);
  }],
  ['app: the request goes to the absolute url', ({ a }) => {
    a.api.fetch('/api/saves');
    eq(a.calls.at(-1).url, REMOTE + '/api/saves');
  }],
  ['web: credentials are still same-origin, so the cookie goes', ({ w }) => {
    w.api.fetch('/api/saves');
    eq(w.calls.at(-1).opts.credentials, 'same-origin');
  }],
  ['a caller\'s own options survive', ({ a }) => {
    a.api.fetch('/api/account', { method: 'DELETE' });
    eq(a.calls.at(-1).opts.method, 'DELETE');
  }],
  ['a caller\'s own headers survive alongside the token', ({ a }) => {
    a.api.setToken('tok_9');
    a.api.fetch('/api/rooms', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    const h = a.calls.at(-1).opts.headers;
    eq(h['Content-Type'], 'application/json');
    eq(h.Authorization, 'Bearer tok_9');
    a.api.setToken(null);
  }]
];

// Each trap: what it breaks in the source, and exactly which case names it must
// take down. Nothing else may move.
const TRAPS = [
  ['no-scheme-test — decide by window.Capacitor instead of the protocol',
    s => s.replace(/var bundled = [^;]+;/, 'var bundled = !!root.Capacitor;'),
    ['app: an api path is made absolute', 'app: a ws path is made absolute',
      'app: the socket is wss at the deployment, not at localhost', 'app: bundled is true',
      'app: the request goes to the absolute url']],

  ['rewrite-everything — send every absolute path to the deployment',
    s => s.replace(
      "if (path.indexOf('/api/') === 0 || path.indexOf('/ws/') === 0) return base + path;",
      'return base + path;'),
    ['app: a game build stays in the bundle', 'app: an icon stays in the bundle']],

  ['socket-uses-page-host — build the socket url from location.host in the app too',
    s => s.replace(/if \(!base\) \{\n {6}var scheme[\s\S]*?\n {4}\}\n {4}return base\.replace/,
      'var scheme = root.location.protocol === \'https:\' ? \'wss\' : \'ws\';\n    return scheme + \'://\' + root.location.host + path;\n    return base.replace'),
    ['app: the socket is wss at the deployment, not at localhost']],

  ['token-always — send the header even with no token',
    s => s.replace('if (token) {', 'if (true) {'),
    ['app: no token means no Authorization header']],

  ['clobber-headers — set the Authorization header instead of merging',
    s => s.replace(/o\.headers = Object\.assign\(\{\}, o\.headers, \{ Authorization: 'Bearer ' \+ token \}\);/,
      "o.headers = { Authorization: 'Bearer ' + token };"),
    ['a caller\'s own headers survive alongside the token']],

  ['clobber-opts — replace the caller\'s options instead of merging',
    s => s.replace(/var o = Object\.assign\(\{ credentials: 'same-origin' \}, opts \|\| \{\}\);/,
      "var o = { credentials: 'same-origin' };"),
    ['a caller\'s own options survive', 'a caller\'s own headers survive alongside the token']],

  ['base-not-empty-on-web — point the web at the deployment as well',
    s => s.replace('var base = bundled ? REMOTE : \'\';', 'var base = REMOTE;'),
    ['web: an api path stays relative', 'web: a ws path stays relative',
      'web: base is empty, so base + path is still relative']]
];

function eq(got, want) {
  if (got !== want) throw new Error(`got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
}

function run(mutate) {
  const failed = [];
  for (const [name, fn] of CASES) {
    let w, a;
    try { w = web(mutate); a = app(mutate); }
    catch (e) { failed.push(name); continue; }
    try { fn({ w, a }); } catch (e) { failed.push(name); }
  }
  return failed;
}

let bad = 0;

const base = run(null);
if (base.length) {
  bad += base.length;
  for (const n of base) console.log('FAIL  ' + n);
}
console.log(`${CASES.length - base.length} passed, ${base.length} failed`);
console.log('');

for (const [name, mutate, expect] of TRAPS) {
  const broke = run(mutate);
  const missed = expect.filter(n => !broke.includes(n));
  const extra = broke.filter(n => !expect.includes(n));
  if (missed.length || extra.length) {
    bad++;
    console.log(`FAIL  ${name}`);
    for (const n of missed) console.log(`        did not break: ${n}`);
    for (const n of extra) console.log(`        also broke:    ${n}`);
  } else {
    console.log(`ok    ${name}: breaks only ${broke.length} case(s)`);
  }
}

console.log('');
console.log(bad
  ? `api-base.js: ${bad} problem(s).`
  : `api-base.js: ${CASES.length} cases, ${TRAPS.length} traps, all green.`);
process.exit(bad ? 1 : 0);
