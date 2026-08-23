/* Which paths are reachable with no session, and why each one has to be.
 *
 * Pulled out of the gate in server/index.js for the reason sw-policy.js was
 * pulled out of sw.js: it is pure decisions, so scripts/test-public.js can put
 * every case to it in Node with no database, no Clerk keys and no server. The
 * gate itself is then one call, and there is one description of the rule.
 *
 * Every entry is a path that BREAKS SILENTLY behind the gate. That is what they
 * have in common and it is the whole reason this file is worth having: the gate
 * answers 302 to /sign-in.html, and a 302 is a perfectly good response that
 * fetch(), a manifest parser, a service worker registration and an App Store
 * reviewer each fail differently and quietly. None of them report a redirect.
 * And all of them work when you test them, because you are signed in.
 */

// The installable shell. A manifest is fetched WITHOUT credentials by default,
// so behind the gate it arrives as the sign-in page's HTML, fails to parse, and
// Add to Home Screen silently makes a bookmark instead of an app. A worker
// script must arrive as JavaScript or registration fails. offline.html is served
// BY the worker when there is no network, when there is no session to check.
const PWA_SHELL = new Set([
  '/manifest.webmanifest',
  '/sw.js',
  '/sw-policy.js',
  '/offline.html',
]);

// The two pages a stranger is entitled to read, and their stylesheet.
// App Store Connect requires a privacy policy URL and a support URL, and both
// are opened by a reviewer who has no account and will not make one. Behind the
// gate that is a rejection under Guideline 5.1.1, and one that costs a review
// cycle to learn.
// contact.html is the third, and it is public for a different reason: it is
// linked from the shelf, which a visitor reads before deciding to sign in, and
// the likeliest message it carries is a report of a wrong question from
// somebody who has not made an account. Behind the gate the form would answer
// the sign-in page and the report would never be written.
const PUBLIC_PAGES = new Set([
  '/privacy.html',
  '/support.html',
  '/contact.html',
  '/legal.css',
]);

// Clerk's own pages. They load Clerk's script and set the session, so they are
// by definition read without one.
// native-signin.html is the third: it is the iOS app's sign-in, opened in the
// system browser, and it is read by somebody with no session for the same
// reason the other two are. Behind the gate it would answer the gate's own
// sign-in page — which would sign the browser in and never hand the app a
// ticket, so the app would sit there while the browser quietly succeeded.
const AUTH_PAGES = new Set(['/sign-in.html', '/sign-out.html', '/native-signin.html']);

// The shelf itself. The front door of the app is the game catalogue, and a
// visitor decides whether to sign in by looking at it — so the page, the
// catalogue it reads, and nothing else under /games/ is public. The games stay
// gated: clicking a card is what meets the sign-in. Exact paths, never a
// prefix — startsWith('/games') would open every campaign with them.
const SHELF = new Set(['/games', '/games/', '/games/index.html', '/games/games.json']);

// The app icons.
const ICON = /^\/icon-\d+\.png$/;

// The hero shots. sign-in.html puts one behind the sign-in card, read by a
// visitor who by definition has no session — without this the browser gets the
// 302, the image fails, and the page falls back to bare dark ground with no way
// to tell anything was meant to be there. They are screenshots of a game world:
// nothing private, and already the public face of the app on the shelf.
const SHOT = /^\/games\/shots\/[A-Za-z0-9_-]+\.(jpg|png)$/;

/* True if this path may be served to a visitor with no session.
 *
 * /api/* is included because those routes answer 401 themselves. That is not a
 * formality: their caller is fetch(), and a 302 to an HTML sign-in page arrives
 * at a JSON parser as a syntax error, which is the least informative way for an
 * expired session to present itself.
 */
function isPublic(pathname) {
  if (typeof pathname !== 'string' || pathname[0] !== '/') return false;
  if (pathname.startsWith('/api/')) return true;
  if (AUTH_PAGES.has(pathname)) return true;
  if (PWA_SHELL.has(pathname)) return true;
  if (PUBLIC_PAGES.has(pathname)) return true;
  if (SHELF.has(pathname)) return true;
  if (ICON.test(pathname)) return true;
  if (SHOT.test(pathname)) return true;
  return false;
}

module.exports = { isPublic, PWA_SHELL, PUBLIC_PAGES, AUTH_PAGES, SHELF, ICON, SHOT };
