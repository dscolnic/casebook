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
// `hold` keeps the boot gate shut, which is the state the app is in for the few
// milliseconds before native-auth.js reports. Every other case opens it, because
// otherwise each one waits out the 15-second failsafe and the test takes an hour
// to tell you nothing.
function load(protocol, host, mutate, opts) {
  const calls = [];
  const injected = [];
  // A document, because inside the app this file creates the boot gate on its
  // way to fetching native-auth.js — so a window without one is not the app,
  // and every gate case would pass for the wrong reason. The injected script is
  // never given a load event, which is the state the gate exists to cover.
  const win = {
    location: { protocol, host },
    fetch: (u, o) => { calls.push({ url: u, opts: o }); return Promise.resolve({ ok: true }); },
    document: {
      head: { appendChild: (el) => injected.push(el.src) },
      createElement: () => ({}),
    },
    setTimeout, clearTimeout,
  };
  // How long the boot gate waits before opening on its own. Production is 15s;
  // a case that wants to watch the failsafe fire shortens it, and a case that
  // wants to prove the gate was opened by the RESTORE rather than by the clock
  // lengthens it.
  if (opts && typeof opts.failsafe === 'number') win.FPL_FAILSAFE_MS = opts.failsafe;
  win.window = win;
  const src = mutate ? mutate(SRC) : SRC;
  vm.runInNewContext(src, {
    window: win, globalThis: win, Object, Promise,
    document: win.document, setTimeout, clearTimeout,
  });
  if (!(opts && opts.hold) && win.FPL_API) win.FPL_API.waitFor(null);
  return { api: win.FPL_API, calls, injected };
}

const web = (m, o) => load('https:', 'firstpersonlearn.com', m, o);
const app = (m, o) => load('capacitor:', 'localhost', m, o);

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
  ['app: no token means no Authorization header', async ({ a }) => {
    a.api.setToken(null);
    await a.api.fetch('/api/saves');
    const h = (a.calls.at(-1).opts.headers) || {};
    eq(h.Authorization, undefined);
  }],
  ['app: a token is sent as Bearer', async ({ a }) => {
    a.api.setToken('tok_123');
    await a.api.fetch('/api/saves');
    eq(a.calls.at(-1).opts.headers.Authorization, 'Bearer tok_123');
    a.api.setToken(null);
  }],
  ['app: the request goes to the absolute url', async ({ a }) => {
    await a.api.fetch('/api/saves');
    eq(a.calls.at(-1).url, REMOTE + '/api/saves');
  }],
  ['web: credentials are still same-origin, so the cookie goes', async ({ w }) => {
    await w.api.fetch('/api/saves');
    eq(w.calls.at(-1).opts.credentials, 'same-origin');
  }],
  ['a caller\'s own options survive', async ({ a }) => {
    await a.api.fetch('/api/account', { method: 'DELETE' });
    eq(a.calls.at(-1).opts.method, 'DELETE');
  }],
  ['a caller\'s own headers survive alongside the token', async ({ a }) => {
    a.api.setToken('tok_9');
    await a.api.fetch('/api/rooms', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    const h = a.calls.at(-1).opts.headers;
    eq(h['Content-Type'], 'application/json');
    eq(h.Authorization, 'Bearer tok_9');
    a.api.setToken(null);
  }],

  // THE PROVIDER. A Clerk session token lives about a minute, so the thing that
  // must not happen is one token captured at sign-in and reused: the campaign
  // would keep playing while every autosave answered 401. The provider is asked
  // per request, which is the whole point of it being a function.
  ['app: the provider is asked on every request, not once', async ({ a }) => {
    let n = 0;
    a.api.setTokenProvider(() => 'tok_' + (++n));
    await a.api.fetch('/api/save');
    await a.api.fetch('/api/save');
    eq(a.calls.at(-2).opts.headers.Authorization, 'Bearer tok_1');
    eq(a.calls.at(-1).opts.headers.Authorization, 'Bearer tok_2');
    a.api.setTokenProvider(null);
  }],
  ['app: an async provider is awaited, not stringified', async ({ a }) => {
    a.api.setTokenProvider(() => Promise.resolve('tok_async'));
    await a.api.fetch('/api/save');
    eq(a.calls.at(-1).opts.headers.Authorization, 'Bearer tok_async');
    a.api.setTokenProvider(null);
  }],
  ['app: a provider returning null sends no header, and still sends the request',
    async ({ a }) => {
      const before = a.calls.length;
      a.api.setTokenProvider(() => null);
      await a.api.fetch('/api/save');
      eq(a.calls.length, before + 1);
      eq((a.calls.at(-1).opts.headers || {}).Authorization, undefined);
      a.api.setTokenProvider(null);
    }],
  // A refresh that fails is a signed-out player, not a broken app: the request
  // goes bare and the server answers 401, which every caller already handles.
  ['app: a provider that rejects still sends the request', async ({ a }) => {
    const before = a.calls.length;
    a.api.setTokenProvider(() => Promise.reject(new Error('no session')));
    await a.api.fetch('/api/save');
    eq(a.calls.length, before + 1);
    eq((a.calls.at(-1).opts.headers || {}).Authorization, undefined);
    a.api.setTokenProvider(null);
  }],
  ['app: the provider wins over a fixed token', async ({ a }) => {
    a.api.setToken('tok_fixed');
    a.api.setTokenProvider(() => 'tok_live');
    await a.api.fetch('/api/save');
    eq(a.calls.at(-1).opts.headers.Authorization, 'Bearer tok_live');
    a.api.setTokenProvider(null);
    a.api.setToken(null);
  }],
  // THE BOOT GATE. Restoring a session is asynchronous, and the shelf's first
  // request goes out during boot. Without the gate it leaves before the token
  // exists, answers 401, and the account header never appears for somebody who
  // is signed in — which reads as "the app forgot me".
  ['app: the first request waits for the boot restore', async ({ held }) => {
    const g = held();
    let restored = false;
    g.api.waitFor(new Promise(res => setTimeout(() => {
      restored = true;
      g.api.setToken('tok_restored');
      res();
    }, 20)));
    await g.api.fetch('/api/auth/user');
    eq(restored, true);
    eq(g.calls.at(-1).opts.headers.Authorization, 'Bearer tok_restored');
  }],
  // The failsafe. Nothing may hold a request for ever — a 404 on the script, an
  // unreachable Clerk, a restore that hangs.
  ['app: a gate nothing ever reports on opens by itself', async ({ held }) => {
    const g = held({ failsafe: 40 });
    await g.api.fetch('/api/saves');
    eq(g.calls.length, 1);
  }],

  // The failsafe is set long here on purpose: what is being asserted is that the
  // FAILED RESTORE opened the gate, not that the clock did.
  ['app: a gate that rejects still sends the request', async ({ held }) => {
    const g = held({ failsafe: 5000 });
    // Rejected on a timer rather than immediately, because that is what a failed
    // restore is — a request to Clerk that comes back badly — and an
    // already-rejected promise is unhandled for a turn before anything can
    // attach to it, which is an artifact of the test and not of the code.
    g.api.waitFor(new Promise((_, rej) => setTimeout(() => rej(new Error('no session')), 5)));
    await Promise.race([
      g.api.fetch('/api/saves'),
      new Promise((_, rej) => setTimeout(() => rej(new Error('still waiting')), 300)),
    ]);
    eq(g.calls.length, 1);
  }],

  ['app: native-auth.js is fetched, so every page can sign in', async ({ a }) => {
    if (!a.injected.includes('/native-auth.js')) {
      throw new Error('nothing fetched native-auth.js: ' + JSON.stringify(a.injected));
    }
  }],
  ['web: native-auth.js is not fetched, because the cookie already did it',
    async ({ w }) => {
      eq(w.injected.length, 0);
    }],

  ['fetch always returns a promise, provider or not', async ({ w }) => {
    const r = w.api.fetch('/api/saves');
    eq(typeof r.then, 'function');
    await r;
  }]
];

// Each trap: what it breaks in the source, and exactly which case names it must
// take down. Nothing else may move.
const TRAPS = [
  ['no-scheme-test — decide by window.Capacitor instead of the protocol',
    s => s.replace(/var bundled = [^;]+;/, 'var bundled = !!root.Capacitor;'),
    ['app: an api path is made absolute', 'app: a ws path is made absolute',
      'app: the socket is wss at the deployment, not at localhost', 'app: bundled is true',
      'app: the request goes to the absolute url',
      // And the sign-in never arrives, which reads as an app that cannot sign in
      // rather than as a wrong answer about where it is running.
      'app: native-auth.js is fetched, so every page can sign in']],

  ['rewrite-everything — send every absolute path to the deployment',
    s => s.replace(
      "if (path.indexOf('/api/') === 0 || path.indexOf('/ws/') === 0) return base + path;",
      'return base + path;'),
    ['app: a game build stays in the bundle', 'app: an icon stays in the bundle']],

  ['socket-uses-page-host — build the socket url from location.host in the app too',
    s => s.replace(/if \(!base\) \{\n {6}var scheme[\s\S]*?\n {4}\}\n {4}return base\.replace/,
      'var scheme = root.location.protocol === \'https:\' ? \'wss\' : \'ws\';\n    return scheme + \'://\' + root.location.host + path;\n    return base.replace'),
    ['app: the socket is wss at the deployment, not at localhost']],

  // It breaks both, and correctly: with no token the header would read
  // "Bearer null", which is a request that looks authenticated and is not.
  ['token-always — send the header even with no token',
    s => s.replace('if (value) {', 'if (true) {'),
    ['app: no token means no Authorization header',
      'app: a provider returning null sends no header, and still sends the request']],

  ['clobber-headers — set the Authorization header instead of merging',
    s => s.replace(
      "o.headers = Object.assign({}, o.headers, { Authorization: 'Bearer ' + value });",
      "o.headers = { Authorization: 'Bearer ' + value };"),
    ['a caller\'s own headers survive alongside the token']],

  ['clobber-opts — replace the caller\'s options instead of merging',
    s => s.replace(/var o = Object\.assign\(\{ credentials: 'same-origin' \}, opts \|\| \{\}\);/,
      "var o = { credentials: 'same-origin' };"),
    ['a caller\'s own options survive', 'a caller\'s own headers survive alongside the token']],

  ['base-not-empty-on-web — point the web at the deployment as well',
    s => s.replace('var base = bundled ? REMOTE : \'\';', 'var base = REMOTE;'),
    ['web: an api path stays relative', 'web: a ws path stays relative',
      'web: base is empty, so base + path is still relative']],

  // The defect this whole design exists to prevent: ask the provider once and
  // keep what it said. Everything works for about a minute.
  ['provider-asked-once — cache the first token the provider returns',
    s => s.replace('var t = provider ? provider() : token;',
      'if (provider && !token) { token = provider(); }\n    var t = token;'),
    ['app: the provider is asked on every request, not once',
      'app: the provider wins over a fixed token']],

  ['no-refresh-handler — let a failed refresh reject instead of sending bare',
    s => s.replace(/\n {6}\}, function \(\) \{[\s\S]*?\n {6}\}\);/, '\n      });'),
    ['app: a provider that rejects still sends the request']],

  ['no-gate — send the first request without waiting for the restore',
    s => s.replace('var ready = gate ? Promise.resolve(gate).catch(function () {}) : Promise.resolve();',
      'var ready = Promise.resolve();'),
    ['app: the first request waits for the boot restore']],

  // Nothing may hold a request for ever: a 404 on the script, an unreachable
  // Clerk or a restore that hangs all end with the app playing offline.
  ['no-failsafe — leave the gate shut when nothing ever reports',
    s => s.replace('typeof root.FPL_FAILSAFE_MS === \'number\' ? root.FPL_FAILSAFE_MS : 15000',
      '15000000'),
    ['app: a gate nothing ever reports on opens by itself']],

  ['gate-never-opens-on-a-failed-restore — release only on success',
    s => s.replace(`      Promise.resolve(p).then(function () {
        if (releaseGate) releaseGate();
      }, function () {
        if (releaseGate) releaseGate();
      });`, `      Promise.resolve(p).then(function () {
        if (releaseGate) releaseGate();
      });`),
    ['app: a gate that rejects still sends the request']],

  ['token-wins — prefer the fixed token over the provider',
    s => s.replace('var t = provider ? provider() : token;',
      'var t = token ? token : (provider ? provider() : null);'),
    ['app: the provider wins over a fixed token']]
];

// A trap deliberately breaks error handling, and one of the ways this module can
// be broken is "let a rejection go unhandled" — on which Node's default is to
// kill the process. That would take the whole test down instead of failing the
// one case the trap claims, so rejections are swallowed here. The cases still
// see the behaviour: what they assert is whether the REQUEST went out, not
// whether a promise was tidy.
process.on('unhandledRejection', () => {});

function eq(got, want) {
  if (got !== want) throw new Error(`got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
}

// EVERY CASE IS RACED AGAINST A TIMER. One of the ways this module can be broken
// is "the gate never opens", and that does not throw — it waits. A case that
// awaits it would hang the whole test rather than fail, which is the least
// useful way for a check to be right.
const LIMIT_MS = 1500;

function bounded(promise, name) {
  let timer;
  return Promise.race([
    Promise.resolve().then(() => promise),
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(`${name}: never settled`)), LIMIT_MS);
    }),
  ]).finally(() => clearTimeout(timer));
}

async function run(mutate) {
  const failed = [];
  for (const [name, fn] of CASES) {
    let w, a;
    try { w = web(mutate); a = app(mutate); }
    catch (e) { failed.push(name); continue; }
    try {
      await bounded(fn({ w, a, held: (o) => app(mutate, Object.assign({ hold: true }, o)) }), name);
    } catch (e) { failed.push(name); }
  }
  return failed;
}

let bad = 0;

async function main() {
const base = await run(null);
if (base.length) {
  bad += base.length;
  for (const n of base) console.log('FAIL  ' + n);
}
console.log(`${CASES.length - base.length} passed, ${base.length} failed`);
console.log('');

for (const [name, mutate, expect] of TRAPS) {
  const broke = await run(mutate);
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
}

main();
