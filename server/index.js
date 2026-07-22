const path = require("path");
const express = require("express");
const { setupAuth, isAuthenticated } = require("./replitAuth");
const { getUser, recordResult, getStats } = require("./storage");
const casebook = require("./casebook");

const PORT = process.env.PORT || 5000;
const ROOT = path.join(__dirname, "..");

async function main() {
  casebook.init();
  await casebook.syncCaseBank();

  const app = express();
  app.use(express.json());
  app.get("/", (_req, res) => res.redirect("/reckon.html"));

  await setupAuth(app);

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

  app.get("/api/auth/user", (req, res) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const claims = req.user.claims || {};
    res.json({
      id: claims.sub,
      email: claims.email || null,
      firstName: claims.first_name || null,
      lastName: claims.last_name || null,
      profileImageUrl: claims.profile_image_url || null,
    });
  });

  app.post("/api/results", isAuthenticated, async (req, res, next) => {
    try {
      const userId = req.user.claims.sub;
      const { gameId, gameTitle, rank, won, daysUsed, cluesGathered, solveSeconds, game, score } = req.body || {};
      const out = await recordResult(userId, { gameId, gameTitle, rank, won, daysUsed, cluesGathered, solveSeconds, game, score });
      res.json(out);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/stats", isAuthenticated, async (req, res, next) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await getStats(userId);
      res.json(stats);
    } catch (err) {
      next(err);
    }
  });

  // Site-wide sign-in gate: every page requires a signed-in user. /api/* is
  // exempt (so the login + OIDC callback flow works); any other request from a
  // signed-out visitor is sent to login.
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    if (req.isAuthenticated && req.isAuthenticated()) return next();
    return res.redirect("/api/login");
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
