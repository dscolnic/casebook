/* Selftest for sw-policy.js — the service worker's decisions, in Node.
 *
 * A cache that produces a plausible answer is not thereby a working cache. The
 * failure this file exists for is silent by construction: cache the sign-in page
 * under a game's URL and everything looks fine until somebody is offline, and
 * then it looks like the game is broken rather than like the cache is wrong.
 *
 * So every case below is paired with a MUTATION that puts a specific bug back,
 * and the test asserts that mutation makes exactly the expected cases fail —
 * not more, not fewer. A guard nothing exercises is a comment.
 *
 *   node scripts/test-sw.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ORIGIN = 'https://example.test';
const SRC = path.join(__dirname, '..', 'sw-policy.js');

// A fresh V8 context has the ECMAScript intrinsics and nothing else, so URL
// has to be handed in. Without it every parse in routeFor() throws into its own
// catch and the policy reports 'bypass' for the whole site — which is a
// perfectly plausible answer, and wrong, and looked like a policy bug for as
// long as it took to notice the sandbox was the thing that was broken.
function loadPolicy(source) {
  const sandbox = { module: { exports: {} }, globalThis: {}, URL, URLSearchParams, console };
  sandbox.exports = sandbox.module.exports;
  vm.runInNewContext(source, sandbox, { filename: 'sw-policy.js' });
  return sandbox.module.exports;
}

const req = (url, { method = 'GET', headers = {}, mode = 'no-cors' } = {}) => {
  const lower = Object.keys(headers).map((k) => k.toLowerCase());
  return {
    url: new URL(url, ORIGIN).href,
    method,
    headers: { has: (h) => lower.includes(String(h).toLowerCase()) },
    mode,
  };
};
const res = (url, { status = 200, redirected = false, type = 'basic' } = {}) => ({
  url: new URL(url, ORIGIN).href, status, redirected, type,
});

// ---------------------------------------------------------------------------
// The cases. `route` and `cacheable` are each checked when present.
const GAME = '/games/quantum/';
const ASSET = '/games/quantum/assets/three-BGOGa3hi.js';

const CASES = [
  // --- routing -----------------------------------------------------------
  { name: 'hashed asset is immutable',
    request: req(ASSET), route: 'cache-first',
    response: res(ASSET), cacheable: true },

  // Two inputs that should score the same. A cache-buster on an already-hashed
  // file must not demote it to network-first, or a reload re-downloads three.js.
  { name: 'hashed asset with a query scores the same',
    request: req(ASSET + '?v=2'), route: 'cache-first' },

  { name: 'game page is network-first',
    request: req(GAME, { mode: 'navigate' }), route: 'network-first',
    response: res(GAME), cacheable: true },

  // Two spellings of one document. Both are the shelf; both must route and cache
  // alike, including when the server answers the directory with index.html.
  { name: 'shelf directory is network-first',
    request: req('/games/', { mode: 'navigate' }), route: 'network-first',
    response: res('/games/index.html'), cacheable: true },
  { name: 'shelf index.html scores the same',
    request: req('/games/index.html', { mode: 'navigate' }), route: 'network-first',
    response: res('/games/'), cacheable: true },

  { name: 'catalogue is network-first so a sync is never stale',
    request: req('/games/games.json'), route: 'network-first' },

  { name: 'hero shot is stale-while-revalidate',
    request: req('/games/shots/quantum.png'), route: 'stale-revalidate',
    response: res('/games/shots/quantum.png'), cacheable: true },
  { name: 'hero shot in capitals scores the same',
    request: req('/games/shots/quantum.PNG'), route: 'stale-revalidate' },

  { name: 'API is bypassed',
    request: req('/api/save?theme=quantum'), route: 'bypass',
    response: res('/api/save?theme=quantum'), cacheable: false },
  { name: 'API listing is bypassed',
    request: req('/api/saves'), route: 'bypass' },

  { name: 'sign-in page is never touched',
    request: req('/sign-in.html', { mode: 'navigate' }), route: 'bypass',
    response: res('/sign-in.html'), cacheable: false },
  { name: 'sign-out page is never touched',
    request: req('/sign-out.html', { mode: 'navigate' }), route: 'bypass' },

  { name: 'cross-origin is bypassed',
    request: req('https://clerk.example.com/npm/@clerk/clerk-js@5/dist/clerk.browser.js'),
    route: 'bypass' },

  { name: 'a POST is bypassed',
    request: req('/api/results', { method: 'POST' }), route: 'bypass' },

  { name: 'a Range request is bypassed',
    request: req('/games/quantum/assets/three-BGOGa3hi.js', { headers: { Range: 'bytes=0-1' } }),
    route: 'bypass' },

  // --- the one this file exists for --------------------------------------
  // Every page is behind a gate that answers 302 to /sign-in.html. A worker
  // fetch follows it and hands back a 200 whose body is the sign-in form.
  { name: 'a followed sign-in redirect is NOT cached under the game URL',
    request: req(GAME, { mode: 'navigate' }),
    response: res('/sign-in.html', { redirected: true }), cacheable: false },

  // The case the `redirected` flag is the ONLY guard against. WebKit has
  // historically handed back a response with an empty `url`, and mayCache falls
  // back to the request's own URL when that happens — so the pathname
  // comparison below compares /games/quantum/ against itself and says yes, to a
  // body that is the sign-in form. Without this case the redirect check is
  // redundant with the pathname check and its trap fires on nothing.
  { name: 'a redirect with a blank response.url is still refused',
    request: req(GAME, { mode: 'navigate' }),
    response: { url: '', status: 200, redirected: true, type: 'basic' }, cacheable: false },

  { name: 'a bare 302 is not cached',
    request: req(GAME, { mode: 'navigate' }),
    response: res(GAME, { status: 302 }), cacheable: false },

  { name: 'a 404 is not cached',
    request: req('/games/nope/'), response: res('/games/nope/', { status: 404 }), cacheable: false },

  { name: 'a 206 partial is not cached',
    request: req(ASSET), response: res(ASSET, { status: 206 }), cacheable: false },

  { name: 'an opaque redirect is not cached',
    request: req(GAME), response: res(GAME, { type: 'opaqueredirect' }), cacheable: false },

  { name: 'an error response is not cached',
    request: req(GAME), response: res(GAME, { type: 'error' }), cacheable: false },

  // A server that rewrites instead of redirecting would defeat `redirected`.
  { name: 'a body served from another path is not cached',
    request: req(GAME, { mode: 'navigate' }),
    response: res('/teacher.html'), cacheable: false },
];

// ---------------------------------------------------------------------------
// The mutations, each naming exactly the cases it must break.
const MUTATIONS = [
  {
    name: 'drop-redirected',
    what: 'stop checking response.redirected',
    apply: (s) => s.replace('if (response.redirected) return false;', ''),
    // Not the sign-in case: that one is caught by the pathname comparison too,
    // and a trap that fires on the wrong refusal is a trap that is not testing
    // its own rule. This is the case only this guard can see.
    breaks: ['a redirect with a blank response.url is still refused'],
  },
  {
    name: 'drop-both-redirect-guards',
    what: 'drop the redirect flag AND the pathname comparison',
    apply: (s) => s
      .replace('if (response.redirected) return false;', '')
      .replace("if (fold(res.pathname) !== fold(req.pathname)) return false;", ''),
    // The whole point: the sign-in body is refused by two independent reads of
    // the same defect, so losing either one alone does not open the hole.
    breaks: [
      'a followed sign-in redirect is NOT cached under the game URL',
      'a redirect with a blank response.url is still refused',
      'a body served from another path is not cached',
    ],
  },
  {
    name: 'drop-pathname-fold',
    what: 'compare pathnames without folding index.html',
    apply: (s) => s.replace("const fold = (p) => p.replace(/index\\.html$/, '');",
                            'const fold = (p) => p;'),
    breaks: ['shelf directory is network-first', 'shelf index.html scores the same'],
  },
  {
    name: 'drop-status',
    what: 'cache any status, not only 200',
    apply: (s) => s.replace('if (response.status !== 200) return false;', ''),
    breaks: ['a bare 302 is not cached', 'a 404 is not cached', 'a 206 partial is not cached'],
  },
  {
    name: 'drop-type',
    what: 'cache opaque and error responses',
    apply: (s) => s.replace(
      "if (type !== 'basic' && type !== 'default' && type !== 'cors') return false;", ''),
    breaks: ['an opaque redirect is not cached', 'an error response is not cached'],
  },
  {
    name: 'drop-range',
    what: 'intercept Range requests',
    apply: (s) => s.replace(
      "if (request.headers && request.headers.has && request.headers.has('range')) return 'bypass';", ''),
    breaks: ['a Range request is bypassed'],
  },
  {
    name: 'drop-api-bypass',
    what: 'let the worker cache the API',
    apply: (s) => s.replace("if (path.startsWith('/api/')) return 'bypass';", ''),
    breaks: ['API is bypassed', 'API listing is bypassed'],
  },
  {
    name: 'drop-signin-bypass',
    what: 'let the worker cache the sign-in pages',
    apply: (s) => s.replace('if (NEVER.has(path)) return \'bypass\';', ''),
    breaks: ['sign-in page is never touched', 'sign-out page is never touched'],
  },
  {
    name: 'images-cache-first',
    what: 'pin hero shots for ever instead of revalidating',
    apply: (s) => s.replace("if (IMAGE.test(path)) return 'stale-revalidate';",
                            "if (IMAGE.test(path)) return 'cache-first';"),
    breaks: ['hero shot is stale-while-revalidate', 'hero shot in capitals scores the same'],
  },
  {
    name: 'hash-needs-no-query-strip',
    what: 'match the hash against the whole URL instead of the pathname',
    apply: (s) => s.replace('if (HASHED.test(path)) return \'cache-first\';',
                            'if (HASHED.test(url.href)) return \'cache-first\';'),
    breaks: ['hashed asset with a query scores the same'],
  },
];

// ---------------------------------------------------------------------------
function run(policy) {
  const failed = [];
  for (const c of CASES) {
    try {
      if (c.route !== undefined) {
        const got = policy.routeFor(c.request, ORIGIN);
        if (got !== c.route) { failed.push(c.name); continue; }
      }
      if (c.cacheable !== undefined) {
        const got = policy.mayCache(c.request, c.response, ORIGIN);
        if (got !== c.cacheable) { failed.push(c.name); continue; }
      }
    } catch (err) {
      failed.push(c.name);
    }
  }
  return failed;
}

const source = fs.readFileSync(SRC, 'utf8');
let problems = 0;

// 1. The real policy passes every case.
const baseFailures = run(loadPolicy(source));
if (baseFailures.length) {
  problems += baseFailures.length;
  console.log('FAIL  ' + baseFailures.length + ' case(s) fail against the real policy:');
  baseFailures.forEach((n) => console.log('        · ' + n));
} else {
  console.log('ok    ' + CASES.length + ' cases pass');
}

// 2. Each mutation breaks exactly the cases it claims, and no others.
for (const m of MUTATIONS) {
  const mutated = m.apply(source);
  if (mutated === source) {
    problems++;
    console.log('FAIL  ' + m.name + ': the mutation changed nothing — sw-policy.js has been ' +
                'edited and this trap no longer reaches the line it was written for');
    continue;
  }
  let failures;
  try { failures = run(loadPolicy(mutated)); }
  catch (err) { failures = ['<mutated policy would not load: ' + err.message + '>']; }

  const expected = [...m.breaks].sort().join(' | ');
  const actual = [...failures].sort().join(' | ');
  if (expected === actual) {
    console.log('ok    ' + m.name + ' — ' + m.what + ': breaks only ' + m.breaks.length + ' case(s)');
  } else {
    problems++;
    console.log('FAIL  ' + m.name + ' — ' + m.what);
    console.log('        expected to break: ' + (expected || '(nothing)'));
    console.log('        actually broke:    ' + (actual || '(nothing)'));
  }
}

if (problems) {
  console.log('\n' + problems + ' problem(s).');
  process.exit(1);
}
console.log('\nsw-policy.js: ' + CASES.length + ' cases, ' + MUTATIONS.length + ' traps, all green.');
