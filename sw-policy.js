/* Which cache strategy a request gets, and whether a response may be stored.
 *
 * Loaded twice on purpose: sw.js does importScripts('/sw-policy.js') and
 * scripts/test-sw.js requires it. Two copies of one rule drift the first time
 * either is corrected, and the rule that matters most here — see mayCache —
 * is the one whose failure is invisible until somebody is offline.
 *
 * Nothing in this file touches caches or the network. It is pure decisions, so
 * the test can put every case to it in Node without a browser.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SW_POLICY = api;
})(typeof self !== 'undefined' ? self : globalThis, function () {

  // Bump this to retire every cache. activate() deletes any cache whose name is
  // not in CACHES below, so a bump is the whole of an eviction.
  const VERSION = 'fpl-v1';
  const SHELL_CACHE = VERSION + '-shell';
  const RUNTIME_CACHE = VERSION + '-runtime';
  const CACHES = [SHELL_CACHE, RUNTIME_CACHE];

  // Precached at install, and deliberately small: the shelf, its catalogue, the
  // icons, the offline card. The 37 MB of game builds are NOT here. A first
  // visit that downloads twenty-nine games before showing anything is a first
  // visit nobody waits out; a game caches itself in full the first time it is
  // actually opened, because every file it needs is requested on load.
  const SHELL = [
    '/games/',
    '/games/games.json',
    '/offline.html',
    '/manifest.webmanifest',
    '/icon-180.png',
    '/icon-192.png',
    '/icon-512.png',
  ];

  // Vite writes content-hashed filenames — assets/three-BGOGa3hi.js. The hash
  // IS the version, so these are immutable and may be served from cache without
  // asking. Anything else may have been replaced in place by a sync.
  const HASHED = /\/assets\/[^/]*-[A-Za-z0-9_-]{8,}\.[a-z0-9]+$/;

  // Hero shots. Stable filenames with changing content (sync-casebook writes
  // shots/<id>.png over the old one), so cache-first would pin last month's
  // picture and network-first would re-fetch 1.4 MB on every shelf load —
  // express.static sets no-store, so the HTTP cache does not help here.
  const IMAGE = /\.(png|jpe?g|webp|avif|gif|svg|woff2?)$/i;

  // Never cached, never intercepted. The sign-in pages load Clerk's own script
  // and set the session; a stale copy of either is a sign-in that cannot work
  // and cannot be cleared by the person stuck behind it.
  const NEVER = new Set(['/sign-in.html', '/sign-out.html']);

  /* Which of the four strategies this request gets.
   * 'bypass'          — hand it to the network untouched, cache nothing
   * 'cache-first'     — immutable; ask the cache and only then the network
   * 'stale-revalidate'— serve the cached copy, refresh it behind the player
   * 'network-first'   — always fresh online, cache only as the offline fallback
   */
  function routeFor(request, selfOrigin) {
    const method = (request.method || 'GET').toUpperCase();
    if (method !== 'GET') return 'bypass';

    // A Range request cannot be stored — cache.put() rejects a 206 — and a
    // partial response served whole is worse than no response at all.
    if (request.headers && request.headers.has && request.headers.has('range')) return 'bypass';

    let url;
    try { url = new URL(request.url, selfOrigin); } catch (_) { return 'bypass'; }
    if (url.origin !== selfOrigin) return 'bypass';

    const path = url.pathname;
    if (path.startsWith('/api/')) return 'bypass';
    if (NEVER.has(path)) return 'bypass';

    if (HASHED.test(path)) return 'cache-first';
    if (IMAGE.test(path)) return 'stale-revalidate';

    return 'network-first';
  }

  /* Whether a response may be written to a cache.
   *
   * THE RULE THIS FILE EXISTS FOR is `response.redirected`. Every page on this
   * app is behind a sign-in gate that answers 302 to /sign-in.html, and a
   * service worker fetch follows that redirect and hands back a perfectly good
   * 200 whose body is the sign-in page. Store it under /games/quantum/ and the
   * player who next opens that game offline gets a sign-in form for ever, with
   * no way to tell that is what happened. It looks like the cache working.
   *
   * The pathname comparison after it is a second, independent read of the same
   * defect, for a server that one day rewrites where it now redirects.
   */
  function mayCache(request, response, selfOrigin) {
    if (!response) return false;
    if (routeFor(request, selfOrigin) === 'bypass') return false;
    if (response.status !== 200) return false;         // no 206, no 3xx, no errors
    if (response.redirected) return false;             // the gate, followed
    const type = response.type || 'basic';
    if (type !== 'basic' && type !== 'default' && type !== 'cors') return false;

    let req, res;
    try {
      req = new URL(request.url, selfOrigin);
      res = new URL(response.url || request.url, selfOrigin);
    } catch (_) { return false; }
    if (res.origin !== req.origin) return false;
    // Directory requests answer from index.html either spelling, so compare
    // with a trailing "index.html" folded off both sides.
    const fold = (p) => p.replace(/index\.html$/, '');
    if (fold(res.pathname) !== fold(req.pathname)) return false;

    return true;
  }

  return { VERSION, SHELL_CACHE, RUNTIME_CACHE, CACHES, SHELL, NEVER, routeFor, mayCache };
});
