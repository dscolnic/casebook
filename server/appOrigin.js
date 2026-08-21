/* The one origin that is this app but is not this site.
 *
 * Inside the iOS app the pages are loaded out of the app bundle, so the browser
 * calls them `capacitor://localhost`. Every /api/ call is therefore
 * cross-origin, and without the headers below WebKit refuses it before it is
 * sent — the app reports "Load failed" and the server never sees a request. It
 * is not a 401 and not a 404: from the client it looks like the network is
 * down, and from the server like nobody called.
 *
 * WHY THIS IS NOT `cors()` WITH A WILDCARD. Two reasons, and the second is the
 * one that matters. A wildcard cannot be combined with credentials, and more to
 * the point this app authenticates the app's requests with a Bearer token in a
 * header — so what has to be allowed is exactly one origin and exactly the
 * Authorization header, and anything wider is a larger promise than the app
 * needs. `Vary: Origin` is on every answer because the reply differs by origin
 * and a shared cache must not hand one origin's answer to another.
 *
 * WHY IT IS ITS OWN FILE. It is pure decisions, so scripts/test-app-origin.js
 * can put every case to it with no server, no database and no Clerk keys — the
 * same reason publicPaths.js and sw-policy.js came out.
 */

// The scheme comes from capacitor.config.json (`iosScheme`), and the host is
// Capacitor's own. Change either and this must change with it.
const APP_ORIGIN = 'capacitor://localhost';

// What the app actually sends. DELETE is here for /api/account, which App Store
// guideline 5.1.1(v) requires be reachable from inside the app.
const METHODS = 'GET, POST, PATCH, DELETE, OPTIONS';
const HEADERS = 'Authorization, Content-Type';

/* True if this request came from the app rather than from a browser on the
 * site. A request with no Origin at all — curl, a health check, a same-origin
 * navigation — is NOT the app, and must not be given the headers: answering
 * every origin-less request as though it were the app is how a check like this
 * stops meaning anything. */
function isAppOrigin(origin) {
  return origin === APP_ORIGIN;
}

/* The headers to add, or null when there are none to add. Returned rather than
 * written, so the decision can be tested without a response object. */
function headersFor(origin) {
  if (!isAppOrigin(origin)) return null;
  return {
    'Access-Control-Allow-Origin': APP_ORIGIN,
    'Access-Control-Allow-Methods': METHODS,
    'Access-Control-Allow-Headers': HEADERS,
    // The app sends a Bearer token, never a cookie, so credentials are not
    // allowed — and saying so is not a formality: allowing them would let a
    // page at this origin read a signed-in browser's answers.
    'Access-Control-Max-Age': '600',
  };
}

/* Express middleware. Two things it must keep doing:
 *
 *  · answer the preflight ITSELF, with 204. A browser sends OPTIONS before any
 *    request carrying an Authorization header, and if that falls through to the
 *    sign-in gate it is answered with a 302 to an HTML page — which the browser
 *    reads as "preflight failed" and reports as a network error.
 *  · set Vary: Origin on EVERY response, app or not. Otherwise a cache that saw
 *    the site's answer can hand it to the app, and the app's to the site.
 */
function appOrigin(req, res, next) {
  res.setHeader('Vary', 'Origin');
  const headers = headersFor(req.headers.origin);
  if (headers) {
    for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  }
  if (req.method === 'OPTIONS' && headers) return res.status(204).end();
  return next();
}

module.exports = { appOrigin, isAppOrigin, headersFor, APP_ORIGIN, METHODS, HEADERS };
