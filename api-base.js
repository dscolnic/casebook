// api-base.js — where the API is, and how a request to it authenticates.
//
// On the web this file has nothing to do: every path in this app is relative
// (`/api/save`, `/api/rooms`, `wss://<host>/ws/room`), the page is served from
// the same origin as the server, and the session cookie goes with the request.
//
// In the iOS app it is the whole difference between working and not. The pages
// are loaded out of the app bundle, so the origin is `capacitor://localhost`
// and there is no server behind it — every one of those relative paths resolves
// into the bundle and 404s. Two halves, and this file is both of them:
//
//   WHERE.  An absolute base, applied to every /api/ and /ws/ path. One place,
//           because five call sites each deciding is five chances to ship the
//           one that only fails on device — and it only fails on device, which
//           is the last place anybody looks.
//   HOW.    The session cookie is not sent from capacitor://localhost to
//           another origin, so the app sends Clerk's token in an
//           `Authorization: Bearer` header instead. The SERVER NEEDS NO CHANGE
//           for this: clerkMiddleware() reads headers as well as cookies, so
//           getUserId() answers the same either way.
//
// WHY THE TEST IS THE SCHEME AND NOT A BUILD FLAG. The condition that actually
// breaks a relative URL is the page not being served over http(s) — that is the
// defect itself rather than a proxy for it. A build flag would let a web build
// ship pointing absolute at production, which works, so nothing would catch it.
// `window.Capacitor` is a symptom of the same thing and is not always defined
// before this file runs.
(function (root) {
  'use strict';

  // The deployment the app talks to. A bundled page has no origin to be
  // relative to, so this is the one hard-coded fact in the file.
  var REMOTE = 'https://firstpersonlearn.com';

  var proto = (root.location && root.location.protocol) || '';
  var bundled = !(proto === 'http:' || proto === 'https:');
  var base = bundled ? REMOTE : '';

  // Set by the native sign-in once Clerk has a session. Absent on the web,
  // where the cookie does the same job.
  var token = null;

  // WHY A PROVIDER AND NOT A TOKEN. A Clerk session token is deliberately
  // short-lived — about a minute — so a token captured once and held would sign
  // the player out mid-campaign, and the first symptom would be an autosave
  // silently returning 401 while the game carried on. The provider is asked on
  // every request instead; Clerk's own session.getToken() serves a cached token
  // and refreshes it when it is close to expiring, so this is not a request per
  // request. `token` above remains for a caller that genuinely has one fixed
  // string, and the provider wins when both are set.
  var provider = null;

  // Something that has to finish before the first request goes out. The app's
  // sign-in restores a Clerk session at boot, and that is asynchronous: without
  // this, the shelf's first /api/auth/user leaves before the token exists, comes
  // back 401, and the account header never appears for somebody who IS signed
  // in. Awaited once and then forgotten, so it costs nothing after boot — and it
  // is never set on the web, where the cookie is already on the request.
  var gate = null;
  var releaseGate = null;

  function url(path) {
    // Only server paths are rewritten. Everything else — the catalogue, a game
    // build, a hero shot — is in the bundle and must stay relative.
    if (!base) return path;
    if (path.charAt(0) !== '/') return path;
    if (path.indexOf('/api/') === 0 || path.indexOf('/ws/') === 0) return base + path;
    return path;
  }

  function socketURL(path) {
    if (!base) {
      var scheme = root.location.protocol === 'https:' ? 'wss' : 'ws';
      return scheme + '://' + root.location.host + path;
    }
    return base.replace(/^http/, 'ws') + path;
  }

  // The one entry point. `credentials` is kept for the web; the header is added
  // only when there is a token, so a signed-out app sends neither and gets the
  // same 401 the web does.
  //
  // Always a promise, including when there is no provider: a function that is
  // sometimes synchronous and sometimes not is one every caller has to remember
  // about.
  function call(path, opts) {
    var o = Object.assign({ credentials: 'same-origin' }, opts || {});
    // A gate that rejects must not take the request with it: a failed restore is
    // a signed-out player, and the shelf still has to draw.
    var ready = gate ? Promise.resolve(gate).catch(function () {}) : Promise.resolve();
    return ready.then(function () {
      var t = provider ? provider() : token;
      return Promise.resolve(t).then(function (value) {
        if (value) {
          o.headers = Object.assign({}, o.headers, { Authorization: 'Bearer ' + value });
        }
        return root.fetch(url(path), o);
      }, function () {
        // A provider that throws is a session that could not be refreshed, which
        // is a signed-out player and not a broken app. Send the request bare and
        // let the server answer 401, which every caller here already handles.
        return root.fetch(url(path), o);
      });
    });
  }

  root.FPL_API = {
    // `''` on the web, so `FPL_API.base + '/api/x'` is still a relative path.
    get base() { return base; },
    bundled: bundled,
    url: url,
    socketURL: socketURL,
    fetch: call,
    setToken: function (t) { token = t || null; },
    // fn returns a token or a promise of one, and null when nobody is signed in.
    setTokenProvider: function (fn) { provider = typeof fn === 'function' ? fn : null; },
    // Held in front of the first request. See `gate` above. Inside the app the
    // gate is already open by the time this is called — it is created below, on
    // the way to fetching native-auth.js — so what this does is release it when
    // the restore has settled, either way.
    waitFor: function (p) {
      if (!bundled) { gate = p || null; return; }
      if (!p) { if (releaseGate) releaseGate(); return; }
      Promise.resolve(p).then(function () {
        if (releaseGate) releaseGate();
      }, function () {
        if (releaseGate) releaseGate();
      });
    },
    get token() { return token; },
    get signedIn() { return !!(provider || token); }
  };
  /* THE APP'S SIGN-IN IS FETCHED FROM HERE, and that is not a shortcut.
   *
   * native-auth.js is needed on EVERY page in the app, not only the shelf: a
   * game's cloudSave has no cookie to fall back on, so without the token
   * provider a campaign silently stops syncing. Loading it from each of the five
   * pages would be five places to forget it, and forgetting it looks exactly
   * like being signed out. This file is already on all of them, and it is the
   * one that knows whether the page is bundled.
   *
   * The gate is opened HERE rather than by native-auth.js, because between this
   * line and that script evaluating there is a window in which the shelf can
   * already have asked /api/auth/user. Gating from inside the script it is
   * waiting for would be a race it loses on a fast machine.
   */
  if (bundled && typeof document !== 'undefined') {
    gate = new Promise(function (resolve) { releaseGate = resolve; });

    // Nothing may hold a request for ever. A script that 404s, a Clerk that
    // cannot be reached, a restore that hangs — all of them end with the app
    // playing offline, which is a working app, so the gate opens regardless.
    // Overridable so it can be tested. A gate that only ever opens after fifteen
    // seconds cannot be asserted inside a test that anybody will run, and a
    // failsafe nothing exercises is a comment — the same reason HOLD is driven on
    // a rescaled copy of its own clock.
    var FAILSAFE_MS = typeof root.FPL_FAILSAFE_MS === 'number' ? root.FPL_FAILSAFE_MS : 15000;
    var failsafe = setTimeout(function () { if (releaseGate) releaseGate(); }, FAILSAFE_MS);
    var open = function () { clearTimeout(failsafe); if (releaseGate) releaseGate(); };

    var el = document.createElement('script');
    el.src = '/native-auth.js';
    el.async = false;
    el.onerror = open;
    document.head.appendChild(el);
  }
})(typeof window !== 'undefined' ? window : globalThis);
