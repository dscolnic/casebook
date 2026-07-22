// Authentication via Clerk (https://clerk.com). Replaces the old Replit OIDC
// flow. Sign-in / sign-out happen client-side (sign-in.html / sign-out.html)
// using ClerkJS; this module validates the Clerk session on the server and
// maps the Clerk user into our own `users` table.
//
// Requires two environment variables (set them as Replit Secrets):
//   CLERK_PUBLISHABLE_KEY   (also hard-coded, publicly, into sign-in.html)
//   CLERK_SECRET_KEY        (server-only — never put this in the HTML)
const { clerkMiddleware, getAuth, clerkClient } = require("@clerk/express");
const { upsertUserProfile } = require("./storage");

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

// Make sure a `users` row exists for this Clerk user — game_results and the
// avatar column reference it. Synced from Clerk once per user per process.
const _synced = new Set();
async function ensureUser(userId) {
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
  req.userId = userId;
  try {
    await ensureUser(userId);
  } catch (err) {
    console.error("ensureUser failed:", err.message);
  }
  next();
}

module.exports = { setupAuth, requireUser, getUserId, ensureUser, clerkClient };
