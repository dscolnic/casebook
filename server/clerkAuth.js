// Authentication via Clerk (https://clerk.com). Replaces the old Replit OIDC
// flow. Sign-in / sign-out happen client-side (sign-in.html / sign-out.html)
// using ClerkJS; this module validates the Clerk session on the server and
// maps the Clerk user into our own `users` table.
//
// Requires two environment variables (set them as Replit Secrets):
//   CLERK_PUBLISHABLE_KEY   (also hard-coded, publicly, into sign-in.html)
//   CLERK_SECRET_KEY        (server-only — never put this in the HTML)
const { clerkMiddleware, getAuth, clerkClient } = require("@clerk/express");
const { upsertUserProfile, deleteUserData, countUserData } = require("./storage");

function setupAuth(app) {
  // Replit terminates TLS at a proxy; trust it so secure cookies work.
  app.set("trust proxy", 1);
  // Reads the Clerk session from the request cookies/headers and attaches the
  // auth state to the request (read later with getAuth()).
  app.use(clerkMiddleware());
}

function getUserId(req) {
  try {
    return getAuth(req).userId || null;
  } catch (e) {
    return null;
  }
}

// Accounts deleted by this process, so nothing can put one back.
//
// This is the whole reason deletion is orchestrated here rather than in the
// route. ensureUser() upserts a users row on any authenticated request, and a
// Clerk session token stays cryptographically valid for up to its expiry after
// the account behind it is gone — so a request already in flight, or one from
// another tab a few seconds later, would re-insert the row with the email that
// was just erased. Everything downstream then looks correct: the row is there,
// no error anywhere, and the deletion silently did not happen.
//
// Bounded because it is only needed for the seconds around a delete; a Clerk id
// is never reissued, so losing the oldest entries costs nothing.
const _deleted = new Set();
const DELETED_MAX = 1000;
function tombstone(userId) {
  _deleted.add(userId);
  if (_deleted.size > DELETED_MAX) _deleted.delete(_deleted.values().next().value);
}
function isDeleted(userId) {
  return _deleted.has(userId);
}

// Make sure a `users` row exists for this Clerk user — game_results and the
// avatar column reference it. Synced from Clerk once per user per process.
const _synced = new Set();
async function ensureUser(userId) {
  if (_deleted.has(userId)) throw new Error("account deleted");
  if (_synced.has(userId)) return;
  const u = await clerkClient.users.getUser(userId);
  await upsertUserProfile({
    id: userId,
    email: (u.emailAddresses && u.emailAddresses[0] && u.emailAddresses[0].emailAddress) || null,
    firstName: u.firstName || null,
    lastName: u.lastName || null,
    profileImageUrl: u.imageUrl || null,
  });
  _synced.add(userId);
}

// Route guard: 401 unless signed in. Sets req.userId and ensures the user row.
async function requireUser(req, res, next) {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  // A token that outlived its account. 401 rather than 500: from the caller's
  // side there is no session, which is exactly true.
  if (isDeleted(userId)) return res.status(401).json({ message: "Unauthorized" });
  req.userId = userId;
  try {
    await ensureUser(userId);
  } catch (err) {
    console.error("ensureUser failed:", err.message);
  }
  next();
}

// ---------------------------------------------------------------------------
// Delete an account and everything it owns. App Store guideline 5.1.1(v).
//
// THE ORDER IS THE DESIGN, and it is chosen for which half is safe to fail:
//
//   1. tombstone   — from here on no request can re-create the users row
//   2. Postgres    — one DELETE, cascading to saves, results, streaks, classes
//   3. Clerk       — the sign-in itself, which invalidates every session
//
// Postgres before Clerk because that failure is recoverable: the session is
// still live, so the caller can be told to try again. The other way round, a
// Clerk delete followed by a database failure leaves rows nobody can ever reach
// to clean up, because the account that owned them can no longer sign in.
//
// If step 3 fails the tombstone is lifted so the caller can retry — step 2 is
// idempotent (the row is already gone) and step 3 then finishes the job.
async function deleteAccount(userId) {
  const had = await countUserData(userId).catch(() => null);
  tombstone(userId);
  try {
    await deleteUserData(userId);
  } catch (err) {
    _deleted.delete(userId);
    throw err;
  }
  try {
    await clerkClient.users.deleteUser(userId);
  } catch (err) {
    _deleted.delete(userId);
    err.stage = "clerk";
    throw err;
  }
  _synced.delete(userId);
  return had;
}

/* A one-time ticket the iOS app can sign in with.
 *
 * WHY THE APP CANNOT JUST DO OAUTH. It tried. Inside the app the origin is
 * capacitor://localhost, so the provider has to be opened in the system browser
 * — and Clerk then refuses its own OAuth callback with authorization_invalid,
 * with capacitor://localhost in allowed_origins and the custom scheme in
 * redirect_urls. Google authenticates perfectly; the handoff back is what fails.
 *
 * So the browser signs in on OUR origin, where Clerk has always worked, and
 * hands the app a ticket instead of a nonce. `signInTokens` is Clerk's own
 * mechanism for exactly this: a short-lived, single-use token that a client
 * redeems with signIn.create({ strategy: 'ticket' }).
 *
 * WHAT MAKES IT SAFE. The caller must already be signed in — the route is
 * behind requireUser, so the ticket is only ever minted for the account that
 * asked for it, and the secret key never leaves the server. The token is
 * single-use and expires in a minute, which is the window between the browser
 * redirecting and the app redeeming; anything longer would be a bearer
 * credential sitting in a URL.
 */
const SIGN_IN_TOKEN_TTL_SECONDS = 60;

async function createSignInTicket(userId) {
  const token = await clerkClient.signInTokens.createSignInToken({
    userId,
    expiresInSeconds: SIGN_IN_TOKEN_TTL_SECONDS,
  });
  // The field is `token`; returning the whole object would put an id and a
  // status into a URL for no reason.
  if (!token || !token.token) throw new Error("Clerk returned no sign-in token");
  return token.token;
}

module.exports = {
  setupAuth, requireUser, getUserId, ensureUser, clerkClient,
  deleteAccount, isDeleted, createSignInTicket, SIGN_IN_TOKEN_TTL_SECONDS,
};
