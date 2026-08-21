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
  function call(path, opts) {
    var o = Object.assign({ credentials: 'same-origin' }, opts || {});
    if (token) {
      o.headers = Object.assign({}, o.headers, { Authorization: 'Bearer ' + token });
    }
    return root.fetch(url(path), o);
  }

  root.FPL_API = {
    // `''` on the web, so `FPL_API.base + '/api/x'` is still a relative path.
    get base() { return base; },
    bundled: bundled,
    url: url,
    socketURL: socketURL,
    fetch: call,
    setToken: function (t) { token = t || null; },
    get token() { return token; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
