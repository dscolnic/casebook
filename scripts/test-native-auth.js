// test-native-auth.js — the native sign-in flow, in Node.
//
// WHAT A DEVICE CANNOT TELL YOU, AND THIS CAN. The OAuth round trip itself needs
// a real Clerk instance, a registered redirect and a person tapping "Continue",
// so it can only be exercised on hardware. What can be asserted here is the
// plumbing around it, and that is where the failures are silent:
//
//   · the URL scheme is stated in TWO files — Info.plist and native-auth.js —
//     and when they disagree nothing errors. iOS hands the redirect to nobody,
//     the browser sheet sits there, and the sign-in simply never comes back.
//   · the deep-link listener has to be registered BEFORE the browser opens. Open
//     first and it is a race: it works every time the provider is slow, which is
//     every time you test it by hand, and fails for the player whose session is
//     already warm and comes straight back.
//   · a first-time user comes back "transferable" rather than signed in. Miss it
//     and every new player is refused, having been told their Google account
//     does not work.
//
// The flow itself is Clerk's own native SSO sequence — the same one
// @clerk/expo's startSSOFlow performs — so what is checked is that this file
// performs those steps, in that order, with the values Clerk hands back.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'native-auth.js'), 'utf8');
const API = fs.readFileSync(path.join(ROOT, 'api-base.js'), 'utf8');
const PLIST = fs.readFileSync(path.join(ROOT, 'ios', 'App', 'App', 'Info.plist'), 'utf8');

// A window with a Capacitor bridge in it, and a Clerk that behaves like the real
// one: create() leaves a provider URL on the verification, reload() applies the
// nonce, setActive() signs in.
function load(opts = {}, mutate) {
  const log = [];
  const clerkState = {
    verification: {
      externalVerificationRedirectURL: opts.noProviderURL ? null
        : { toString: () => 'https://accounts.google.com/o/oauth2/auth?x=1' },
      status: opts.transferable ? 'transferable' : 'verified',
    },
    nonceSeen: null,
    active: null,
  };

  let urlOpenHandler = null;

  const Browser = {
    open: (o) => { log.push('browser.open ' + o.url); deliver(); return Promise.resolve(); },
    close: () => { log.push('browser.close'); return Promise.resolve(); },
  };
  const App = {
    addListener: (name, fn) => {
      log.push('addListener ' + name);
      if (name === 'appUrlOpen') urlOpenHandler = fn;
      return Promise.resolve({ remove: () => log.push('listener.remove') });
    },
  };

  // The provider coming back. Called the instant the browser is opened, which is
  // the worst case for the race and therefore the case worth testing.
  function deliver() {
    if (opts.neverReturns) return;
    const url = opts.callbackURL !== undefined ? opts.callbackURL
      : 'com.firstpersonlearn.app://sso-callback?rotating_token_nonce=NONCE-1';
    if (urlOpenHandler) urlOpenHandler({ url });
    else log.push('DROPPED: nobody was listening when the provider came back');
  }

  class FakeClerk {
    constructor(pk) { this.pk = pk; log.push('new Clerk ' + pk.slice(0, 12)); }
    load(o) {
      log.push('clerk.load standardBrowser=' + String(o && o.standardBrowser));
      this.client = {
        signIn: {
          create: (p) => {
            log.push('signIn.create ' + p.strategy + ' -> ' + p.redirectUrl);
            this.client.signIn.firstFactorVerification = clerkState.verification;
            return Promise.resolve();
          },
          reload: (p) => {
            clerkState.nonceSeen = p.rotatingTokenNonce;
            log.push('signIn.reload nonce=' + p.rotatingTokenNonce);
            return Promise.resolve();
          },
          firstFactorVerification: clerkState.verification,
          createdSessionId: opts.transferable ? null : 'sess_signin',
        },
        signUp: {
          create: (p) => {
            log.push('signUp.create transfer=' + String(p.transfer));
            return Promise.resolve({ createdSessionId: 'sess_signup' });
          },
        },
      };
      this.session = { getToken: () => Promise.resolve('tok_live') };
      return Promise.resolve();
    }
    setActive(p) { clerkState.active = p.session; log.push('setActive ' + p.session); this.user = { id: 'u_1' }; return Promise.resolve(); }
    signOut() { log.push('signOut'); this.user = null; return Promise.resolve(); }
  }

  const win = {
    location: { protocol: 'capacitor:', host: 'localhost' },
    fetch: () => Promise.resolve({ ok: true }),
    atob: (s) => Buffer.from(s, 'base64').toString('utf8'),
    Capacitor: { Plugins: { Browser, App } },
    document: {
      readyState: 'complete',
      head: { appendChild(el) { win.Clerk = { Clerk: FakeClerk }; if (el.onload) el.onload(); } },
      // The shelf is recognised by the account element it owns; a game page has
      // no such element and must get no sign-out button over its world.
      getElementById: (id) => (opts.shelf && id === 'account' ? {} : null),
      body: { appendChild: (el) => { win.__bar = el; log.push('bar appended'); } },
      addEventListener: () => {},
      createElement: () => ({
        style: {}, children: [],
        setAttribute() {}, addEventListener() {},
        appendChild(c) { this.children.push(c); },
        set textContent(v) { this._text = v; if (v === '') this.children = []; },
        get textContent() { return this._text; },
      }),
    },
    console: { warn: (...a) => log.push('warn ' + a.join(' ')) },
    setTimeout, clearTimeout, URLSearchParams, Promise, Object, Error, String,
  };
  win.window = win;

  vm.runInNewContext(API, { window: win, globalThis: win, Object, Promise });
  // Boot happens while native-auth.js is being evaluated, so the spy has to be
  // in place before it runs — this is the only moment it can be installed.
  const realWaitFor = win.FPL_API.waitFor;
  win.FPL_API.waitFor = function (p) { log.push('gate set'); return realWaitFor(p); };
  const src = mutate ? mutate(SRC) : SRC;
  vm.runInNewContext(src, { window: win, globalThis: win, Object, Promise, Error, String, URLSearchParams, setTimeout, clearTimeout, console: win.console, document: win.document, atob: win.atob });

  return { api: win.FPL_API, auth: win.FPL_AUTH, log, clerkState, win };
}

const CASES = [
  // The two-files fact. Nothing errors when these disagree.
  ['the plist registers the scheme native-auth.js redirects to', async () => {
    const { auth } = load();
    const schemes = [...PLIST.matchAll(/<string>([a-z0-9.\-]+)<\/string>/g)].map(m => m[1]);
    if (!schemes.includes(auth.scheme)) {
      throw new Error(`Info.plist registers no scheme "${auth.scheme}"`);
    }
  }],
  ['the redirect url is built from that scheme', async () => {
    const { auth } = load();
    eq(auth.redirectUrl, auth.scheme + '://sso-callback');
  }],
  ['the clerk host is derived from the publishable key, not written twice', async () => {
    const { auth } = load();
    eq(auth.hostFromKey(auth.publishableKey), 'clerk.firstpersonlearn.com');
  }],

  ['clerk is loaded with standardBrowser false, because cookies cannot be set', async () => {
    const { auth, log } = load();
    await auth.load();
    has(log, 'clerk.load standardBrowser=false');
  }],

  // The race. deliver() fires the moment the browser opens.
  ['the listener is registered before the browser opens', async () => {
    const { auth, log } = load();
    await auth.signIn('oauth_google');
    const listen = log.findIndex(l => l.startsWith('addListener appUrlOpen'));
    const open = log.findIndex(l => l.startsWith('browser.open'));
    if (listen < 0) throw new Error('no listener was registered');
    if (open < 0) throw new Error('the browser was never opened');
    if (listen > open) throw new Error('the browser opened before anything was listening');
    if (log.some(l => l.startsWith('DROPPED'))) throw new Error('the redirect arrived with nobody listening');
  }],

  ['the flow runs Clerk\'s own steps, in order', async () => {
    const { auth, log } = load();
    await auth.signIn('oauth_google');
    const order = ['signIn.create', 'browser.open', 'signIn.reload', 'setActive'];
    let at = -1;
    for (const step of order) {
      const i = log.findIndex((l, j) => j > at && l.startsWith(step));
      if (i < 0) throw new Error(`${step} never happened`);
      at = i;
    }
  }],
  ['the provider url Clerk gave is the one opened', async () => {
    const { auth, log } = load();
    await auth.signIn('oauth_google');
    has(log, 'browser.open https://accounts.google.com/o/oauth2/auth?x=1');
  }],
  ['the nonce off the callback is what reload is given', async () => {
    const { auth, clerkState } = load();
    await auth.signIn('oauth_google');
    eq(clerkState.nonceSeen, 'NONCE-1');
  }],
  ['the session Clerk created is the one made active', async () => {
    const { auth, clerkState } = load();
    await auth.signIn('oauth_google');
    eq(clerkState.active, 'sess_signin');
  }],
  ['the browser sheet is closed after the redirect', async () => {
    const { auth, log } = load();
    await auth.signIn('oauth_google');
    has(log, 'browser.close');
  }],

  // A first-time player. Without the transfer they are simply refused.
  ['a transferable verification becomes a sign-up', async () => {
    const { auth, log, clerkState } = load({ transferable: true });
    await auth.signIn('oauth_google');
    has(log, 'signUp.create transfer=true');
    eq(clerkState.active, 'sess_signup');
  }],

  ['every request asks for a fresh token once signed in', async () => {
    const { auth, api, win } = load();
    await auth.signIn('oauth_google');
    const calls = [];
    win.fetch = (u, o) => { calls.push(o); return Promise.resolve({ ok: true }); };
    await api.fetch('/api/save');
    eq(calls[0].headers.Authorization, 'Bearer tok_live');
  }],

  ['the nonce parser reads the callback and nothing else', async () => {
    const { auth } = load();
    eq(auth.nonceFrom('com.firstpersonlearn.app://sso-callback?rotating_token_nonce=abc'), 'abc');
    eq(auth.nonceFrom('com.firstpersonlearn.app://sso-callback'), '');
    eq(auth.nonceFrom('com.firstpersonlearn.app://sso-callback?other=1'), '');
  }],

  ['a player who backs out is not left signed in', async () => {
    const { auth, clerkState, log } = load({ neverReturns: true });
    // The real wait is five minutes, which is longer than any test should be, so
    // this asserts the state rather than the timeout: the browser was opened,
    // nothing came back, and NOTHING was made active. A flow that signs somebody
    // in before the redirect arrives would fail here.
    auth.signIn('oauth_google').catch(() => {});
    for (let i = 0; i < 20; i++) await Promise.resolve();
    has(log, 'browser.open https://accounts.google.com/o/oauth2/auth?x=1');
    eq(clerkState.active, null);
  }],

  ['a missing provider url is an error, not a silent no-op', async () => {
    const { auth } = load({ noProviderURL: true });
    let msg = null;
    await auth.signIn('oauth_google').catch(e => { msg = e.message; });
    if (!msg) throw new Error('it resolved with no provider URL');
  }],

  // The boot gate, in two halves: that this module hands the restore over, and
  // that the api layer then holds a request behind it. Without both, the shelf's
  // first request leaves before the token exists, gets a 401, and the app reads
  // as having forgotten the account.
  ['the restore is handed to the api layer at boot', async () => {
    const { log } = load({ shelf: true });
    has(log, 'gate set');
  }],
  // The other half — that the api layer then HOLDS a request behind the gate —
  // belongs to api-base.js and is asserted there, against an instance whose gate
  // is still shut. By the time this harness has loaded, boot has already opened
  // it, so a case here would pass for the wrong reason.

  ['the sign-in bar is drawn on the shelf', async () => {
    const { auth, win } = load({ shelf: true });
    await auth.load();
    auth.draw();
    if (!win.__bar) throw new Error('no bar was appended to the shelf');
    const labels = (win.__bar.children || []).map(c => c.textContent);
    if (!labels.includes('Sign in')) throw new Error('the bar has no Sign in button: ' + labels);
  }],

  // Signing out halfway through a campaign, from a bar over the world, is not a
  // control anybody asked for.
  ['no bar is drawn on a game page', async () => {
    const { auth, win } = load({ shelf: false });
    await auth.load();
    auth.draw();
    if (win.__bar) throw new Error('a bar was drawn on a page that is not the shelf');
  }],

  ['once signed in the bar offers the way out', async () => {
    const { auth, win } = load({ shelf: true });
    await auth.signIn('oauth_google');
    auth.draw();
    const labels = (win.__bar.children || []).map(c => c.textContent);
    if (!labels.includes('Sign out')) throw new Error('signed in, but no Sign out: ' + labels);
  }],

  ['signing in is only needed inside the app', async () => {
    const { auth } = load();
    eq(auth.needed(), true);
  }],
];

const TRAPS = [
  ['open-then-listen — open the browser before registering the listener',
    s => s.replace(
      `          var back = waitForCallback();
          var opened = Browser
            ? Browser.open({ url: to.toString(), presentationStyle: 'popover' })
            : Promise.resolve(root.open(to.toString(), '_blank'));
          return opened.then(function () { return back; });`,
      `          var opened = Browser
            ? Browser.open({ url: to.toString(), presentationStyle: 'popover' })
            : Promise.resolve(root.open(to.toString(), '_blank'));
          return opened.then(function () { return waitForCallback(); });`),
    ['the listener is registered before the browser opens',
      'the flow runs Clerk\'s own steps, in order',
      'the provider url Clerk gave is the one opened',
      'the nonce off the callback is what reload is given',
      'the session Clerk created is the one made active',
      'the browser sheet is closed after the redirect',
      'a transferable verification becomes a sign-up',
      'once signed in the bar offers the way out',
      'every request asks for a fresh token once signed in']],

  ['no-transfer — treat a transferable verification as a finished sign-in',
    s => s.replace(/if \(si\.firstFactorVerification\.status === 'transferable'\) \{[\s\S]*?\n {10}\}\n/,
      ''),
    ['a transferable verification becomes a sign-up']],

  ['standard-browser — load clerk-js as if cookies could be set',
    s => s.replace("c.load({ standardBrowser: false })", "c.load({})"),
    ['clerk is loaded with standardBrowser false, because cookies cannot be set']],

  ['wrong-scheme — change the scheme in this file only',
    s => s.replace("var SCHEME = 'com.firstpersonlearn.app';", "var SCHEME = 'com.firstpersonlearn.ios';"),
    ['the plist registers the scheme native-auth.js redirects to',
      // The fake provider still answers on the old scheme, so the redirect is
      // now ignored — exactly what a real mismatch does.
      'the listener is registered before the browser opens',
      'the flow runs Clerk\'s own steps, in order',
      'the provider url Clerk gave is the one opened',
      'the nonce off the callback is what reload is given',
      'the session Clerk created is the one made active',
      'the browser sheet is closed after the redirect',
      'a transferable verification becomes a sign-up',
      'once signed in the bar offers the way out',
      'every request asks for a fresh token once signed in']],

  ['static-token — capture one token at sign-in instead of asking per request',
    s => s.replace(/root\.FPL_API\.setTokenProvider\(function \(\) \{[\s\S]*?\n {8}\}\);/,
      "root.FPL_API.setToken('tok_at_signin');"),
    ['every request asks for a fresh token once signed in']],

  ['bar-everywhere — draw the bar on any page, not just the shelf',
    s => s.replace("return document.getElementById('account') ? document.body : null;",
      'return document.body;'),
    ['no bar is drawn on a game page']],

  ['no-gate — let the shelf ask before the session is restored',
    s => s.replace('root.FPL_API.waitFor(restored);', ''),
    ['the restore is handed to the api layer at boot']],

  ['nonce-by-hand — split the callback url on the wrong thing',
    s => s.replace("var params = new URLSearchParams(url.slice(q + 1));\n    return params.get('rotating_token_nonce') || '';",
      "return url.split('=')[1] || '';"),
    ['the nonce parser reads the callback and nothing else']],
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
function has(log, line) {
  if (!log.some(l => l === line)) throw new Error(`log has no ${JSON.stringify(line)}\n  ${log.join('\n  ')}`);
}

async function run(mutate) {
  const failed = [];
  for (const [name, fn] of CASES) {
    try { await fn(mutate); } catch (e) { failed.push(name); continue; }
  }
  return failed;
}

// EVERY CASE IS RACED AGAINST A TIMER, and that is not belt-and-braces: the
// failure this file is most about — a redirect that arrives on a scheme nobody
// is listening for — does not throw. It never resolves. A case that awaits it
// waits for ever, so the whole test would hang rather than report the defect,
// which is the least useful way for a check to be right.
const LIMIT_MS = 2000;

function bounded(promise, name) {
  let timer;
  return Promise.race([
    Promise.resolve().then(() => promise),
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(`${name}: never settled`)), LIMIT_MS);
    }),
  ]).finally(() => clearTimeout(timer));
}

async function runWith(mutate) {
  const failed = [];
  for (const [name, fn] of CASES) {
    loadRef.current = mutate;
    try { await bounded(fn(), name); }
    catch (e) { failed.push(name); }
    finally { loadRef.current = null; }
  }
  return failed;
}

// load() reads the current mutation rather than taking it as an argument, so a
// case can stay readable.
const loadRef = { current: null };
const rawLoad = load;
load = function (opts) { return rawLoad(opts, loadRef.current); };

async function main() {
  let bad = 0;

  const base = await runWith(null);
  bad += base.length;
  for (const n of base) console.log('FAIL  ' + n);
  console.log(`${CASES.length - base.length} passed, ${base.length} failed`);
  console.log('');

  for (const [name, mutate, expect] of TRAPS) {
    const broke = await runWith(mutate);
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
    ? `native-auth.js: ${bad} problem(s).`
    : `native-auth.js: ${CASES.length} cases, ${TRAPS.length} traps, all green.`);
  process.exit(bad ? 1 : 0);
}

void run;
main();
