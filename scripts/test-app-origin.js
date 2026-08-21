// test-app-origin.js — the CORS decision for the iOS app, in Node.
//
// This is tested rather than tried because of how it fails. WebKit refuses the
// request BEFORE sending it, so the app reports "Load failed" and the server
// logs nothing: there is no status code to read, no request to trace, and the
// same build works perfectly in every browser on the site. It cost a probe page
// on a simulator to see it once.
//
// Each trap puts one bug back and asserts it breaks exactly the cases it claims,
// diffed against a reference rather than against the live module — the reason
// scripts/test-public.js gives.
const path = require('path');
const { appOrigin, headersFor, isAppOrigin, APP_ORIGIN } = require(path.join(__dirname, '..', 'server', 'appOrigin'));

// A response and a request, with just enough surface.
function call(mw, { method = 'GET', origin } = {}) {
  const headers = {};
  let status = null;
  let ended = false;
  let nexted = false;
  const res = {
    setHeader: (k, v) => { headers[k] = v; },
    status: (s) => { status = s; return res; },
    end: () => { ended = true; },
  };
  mw({ method, headers: origin === undefined ? {} : { origin } }, res, () => { nexted = true; });
  return { headers, status, ended, nexted };
}

let current = null;

const CASES = [
  ['the app origin is allowed', () => {
    const r = call(current, { origin: APP_ORIGIN });
    eq(r.headers['Access-Control-Allow-Origin'], APP_ORIGIN);
  }],
  ['the Authorization header is allowed, because that is how the app signs in', () => {
    const r = call(current, { origin: APP_ORIGIN });
    if (!String(r.headers['Access-Control-Allow-Headers']).includes('Authorization')) {
      throw new Error('Authorization is not in the allowed headers');
    }
  }],
  ['DELETE is allowed, because account deletion has to work inside the app', () => {
    const r = call(current, { origin: APP_ORIGIN });
    if (!String(r.headers['Access-Control-Allow-Methods']).includes('DELETE')) {
      throw new Error('DELETE is not allowed');
    }
  }],

  // The preflight. A browser sends OPTIONS before any request with an
  // Authorization header, and the gate would answer it with a 302 to HTML.
  ['a preflight from the app is answered here, with 204', () => {
    const r = call(current, { method: 'OPTIONS', origin: APP_ORIGIN });
    eq(r.status, 204);
    eq(r.ended, true);
    eq(r.nexted, false);
  }],
  ['an ordinary app request is passed on, not answered', () => {
    const r = call(current, { origin: APP_ORIGIN });
    eq(r.nexted, true);
    eq(r.status, null);
  }],

  // Everything that is not the app.
  ['the site\'s own origin gets no allow header', () => {
    const r = call(current, { origin: 'https://firstpersonlearn.com' });
    eq(r.headers['Access-Control-Allow-Origin'], undefined);
    eq(r.nexted, true);
  }],
  ['somebody else\'s origin gets no allow header', () => {
    const r = call(current, { origin: 'https://evil.example' });
    eq(r.headers['Access-Control-Allow-Origin'], undefined);
  }],
  // curl, a health check, a same-origin navigation. Treating these as the app
  // would make the check meaningless, since anybody can send no Origin at all.
  ['a request with no Origin is not the app', () => {
    const r = call(current, {});
    eq(r.headers['Access-Control-Allow-Origin'], undefined);
    eq(r.nexted, true);
  }],
  ['a preflight from anywhere else is NOT answered here', () => {
    const r = call(current, { method: 'OPTIONS', origin: 'https://evil.example' });
    eq(r.status, null);
    eq(r.nexted, true);
  }],

  // A cache that cannot see the origin will serve one origin's answer to
  // another. Every response, app or not.
  ['Vary: Origin is set whoever asked', () => {
    eq(call(current, { origin: APP_ORIGIN }).headers.Vary, 'Origin');
    eq(call(current, { origin: 'https://firstpersonlearn.com' }).headers.Vary, 'Origin');
    eq(call(current, {}).headers.Vary, 'Origin');
  }],

  // The app sends a Bearer token and never a cookie. Allowing credentials would
  // let a page on this origin read a signed-in browser's answers.
  ['credentials are not allowed', () => {
    const r = call(current, { origin: APP_ORIGIN });
    eq(r.headers['Access-Control-Allow-Credentials'], undefined);
  }],
  // A wildcard is covered by 'the app origin is allowed', which asserts the
  // exact origin: the two would be one case written twice.
];

const TRAPS = [
  ['wildcard — allow every origin',
    { headersFor: (o) => ({ ...base(o), 'Access-Control-Allow-Origin': '*' }) },
    ['the app origin is allowed']],

  // The bug is in the origin test, so it has to be put back in BOTH places the
  // module asks the question — otherwise headersFor still says no and the trap
  // passes for a reason that has nothing to do with it.
  ['no-origin-is-the-app — treat a missing Origin as the app',
    {
      isAppOrigin: (o) => o === APP_ORIGIN || o === undefined,
      headersFor: (o) => (o === APP_ORIGIN || o === undefined ? base(APP_ORIGIN) : null),
    },
    ['a request with no Origin is not the app']],

  ['preflight-falls-through — let OPTIONS reach the sign-in gate',
    { swallowPreflight: false },
    ['a preflight from the app is answered here, with 204']],

  ['no-vary — set Vary only when the app asked',
    { vary: 'app-only' },
    ['Vary: Origin is set whoever asked']],

  ['with-credentials — allow cookies as well as the token',
    { headersFor: (o) => (o === APP_ORIGIN ? { ...base(o), 'Access-Control-Allow-Credentials': 'true' } : null) },
    ['credentials are not allowed']],

  ['no-authorization — forget the header the token travels in',
    { headersFor: (o) => (o === APP_ORIGIN ? { ...base(o), 'Access-Control-Allow-Headers': 'Content-Type' } : null) },
    ['the Authorization header is allowed, because that is how the app signs in']],

  ['answer-everything — reply 204 to every request from the app',
    { swallowAll: true },
    ['an ordinary app request is passed on, not answered']],
];

function base(o) {
  return o === APP_ORIGIN ? { ...headersFor(APP_ORIGIN) } : null;
}

// A REFERENCE implementation, so a trap is diffed against what the module ought
// to do rather than against what it currently does. Diffing against the live one
// looks equivalent and is not: one real bug then fails every trap at once, and
// seven failures naming seven unrelated rules is how a test stops being read.
function reference(bug = {}) {
  const isApp = bug.isAppOrigin || isAppOrigin;
  const heads = bug.headersFor || headersFor;
  return function (req, res, next) {
    if (bug.vary === 'app-only') {
      if (isApp(req.headers.origin)) res.setHeader('Vary', 'Origin');
    } else {
      res.setHeader('Vary', 'Origin');
    }
    const h = isApp(req.headers.origin) ? heads(req.headers.origin) : null;
    if (h) for (const [k, v] of Object.entries(h)) res.setHeader(k, v);
    if (bug.swallowAll && h) return res.status(204).end();
    const swallow = bug.swallowPreflight === false ? false : true;
    if (swallow && req.method === 'OPTIONS' && h) return res.status(204).end();
    return next();
  };
}

function eq(got, want) {
  if (got !== want) throw new Error(`got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
}

function run(mw) {
  const failed = [];
  for (const [name, fn] of CASES) {
    try {
      // Cases call `appOrigin` by name, so the middleware under test is swapped
      // in here rather than passed down.
      current = mw;
      fn();
    } catch (e) { failed.push(name); }
  }
  return failed;
}

const realAppOrigin = appOrigin;
const shim = (req, res, next) => (current || realAppOrigin)(req, res, next);

let bad = 0;

// The live module first: the reference is only a yardstick for the traps.
current = realAppOrigin;
const base0 = run(realAppOrigin);
bad += base0.length;
for (const n of base0) console.log('FAIL  ' + n);
console.log(`${CASES.length - base0.length} passed, ${base0.length} failed`);

// And the reference with no bug in it must agree with the module, or every trap
// below is measuring the gap between them instead of the bug.
const drift = run(reference());
if (drift.length) {
  bad++;
  console.log(`\nFAIL  the reference implementation disagrees with server/appOrigin.js on:`);
  for (const n of drift) console.log(`        ${n}`);
}
console.log('');

for (const [name, bug, expect] of TRAPS) {
  const broke = run(reference(bug));
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

void shim;
console.log('');
console.log(bad
  ? `appOrigin.js: ${bad} problem(s).`
  : `appOrigin.js: ${CASES.length} cases, ${TRAPS.length} traps, all green.`);
process.exit(bad ? 1 : 0);
