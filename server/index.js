const path = require("path");
const express = require("express");
const { setupAuth, requireUser, getUserId, clerkClient } = require("./clerkAuth");
const { getUser, recordResult, getStats, getAvatar, setAvatar } = require("./storage");
const casebook = require("./casebook");

const PORT = process.env.PORT || 5000;
const ROOT = path.join(__dirname, "..");

async function main() {
  casebook.init();
  await casebook.syncCaseBank();

  const app = express();
  app.use(express.json());
  app.get("/", (_req, res) => res.redirect("/reckon.html"));

  setupAuth(app);

  app.get("/api/shelf", async (req, res, next) => {
    try {
      res.json(await casebook.getShelf());
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/case/:id", async (req, res, next) => {
    try {
      const pack = await casebook.getCaseIfReleased(req.params.id);
      if (!pack) return res.status(404).json({ message: "Case not found" });
      res.json(pack);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/auth/user", async (req, res, next) => {
    try {
      const userId = getUserId(req);
      if (!userId) return res.status(401).json({ message: "Unauthorized" });
      const u = await clerkClient.users.getUser(userId);
      res.json({
        id: userId,
        email: (u.emailAddresses && u.emailAddresses[0] && u.emailAddresses[0].emailAddress) || null,
        firstName: u.firstName || null,
        lastName: u.lastName || null,
        profileImageUrl: u.imageUrl || null,
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/results", requireUser, async (req, res, next) => {
    try {
      const userId = req.userId;
      const { gameId, gameTitle, rank, won, daysUsed, cluesGathered, solveSeconds, game, score } = req.body || {};
      const out = await recordResult(userId, { gameId, gameTitle, rank, won, daysUsed, cluesGathered, solveSeconds, game, score });
      res.json(out);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/stats", requireUser, async (req, res, next) => {
    try {
      const stats = await getStats(req.userId);
      res.json(stats);
    } catch (err) {
      next(err);
    }
  });

  // Investigator portrait (character.html): per-user saved character.
  app.get("/api/avatar", requireUser, async (req, res, next) => {
    try {
      res.json({ avatar: await getAvatar(req.userId) });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/avatar", requireUser, async (req, res, next) => {
    try {
      const avatar = req.body && req.body.avatar != null ? req.body.avatar : null;
      const saved = await setAvatar(req.userId, avatar);
      res.json({ avatar: saved });
    } catch (err) {
      next(err);
    }
  });

  // Site-wide sign-in gate: every page requires a signed-in user. /api/* is
  // exempt, and the Clerk sign-in / sign-out pages must be reachable while
  // signed out. Any other request from a signed-out visitor goes to sign-in.
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    if (req.path === "/sign-in.html" || req.path === "/sign-out.html") return next();
    if (getUserId(req)) return next();
    return res.redirect("/sign-in.html");
  });

  // Static site (casebook.html, icons, manifest, service worker, etc.)
  app.use(
    express.static(ROOT, {
      dotfiles: "ignore",
      index: "index.html",
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      },
    })
  );

  app.use((err, req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Casebook server listening on http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
