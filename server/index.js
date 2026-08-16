const path = require("path");
const express = require("express");
const { setupAuth, requireUser, getUserId, clerkClient } = require("./clerkAuth");
const {
  getUser, recordResult, getStats, getAvatar, setAvatar,
  getGameSave, putGameSave, deleteGameSave, listGameSaves,
} = require("./storage");
const casebook = require("./casebook");

const PORT = process.env.PORT || 5000;
const ROOT = path.join(__dirname, "..");

async function main() {
  casebook.init();
  await casebook.syncCaseBank();

  const app = express();
  // A First Person Learning campaign is a fair-sized object — fifteen missions
  // of progress plus a hundred-line log — and the default 100 kB body limit
  // rejects one with a 413 the game has no way to report.
  app.use(express.json({ limit: "2mb" }));
  // The front door is the game shelf. reckon.html and casebook.html still work
  // if you type them; nothing links to them.
  app.get("/", (_req, res) => res.redirect("/games/"));

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

  // ---------------------------------------------------------------------
  // First Person Learning campaigns (games/<theme>/).
  //
  // The games call these three from engine/core/cloudSave.js. A signed-out
  // visitor never reaches them — the gate below redirects the page itself —
  // but they answer 401 rather than redirecting, because the caller is fetch()
  // and a 302 to an HTML sign-in page would arrive at a JSON parser.
  app.get("/api/save", requireUser, async (req, res, next) => {
    try {
      const theme = String(req.query.theme || "");
      if (!theme) return res.status(400).json({ message: "theme is required" });
      const saved = await getGameSave(req.userId, theme);
      // No campaign yet is a normal answer, not an error: the game starts fresh.
      res.json(saved || { state: null, savedAt: 0 });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/save", requireUser, async (req, res, next) => {
    try {
      const { theme, state } = req.body || {};
      if (!theme || !state) return res.status(400).json({ message: "theme and state are required" });
      res.json(await putGameSave(req.userId, String(theme), state));
    } catch (err) {
      next(err);
    }
  });

  app.delete("/api/save", requireUser, async (req, res, next) => {
    try {
      const theme = String(req.query.theme || "");
      if (!theme) return res.status(400).json({ message: "theme is required" });
      await deleteGameSave(req.userId, theme);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  });

  // Every campaign in progress, for the shelf. Signed out is an empty list
  // rather than a 401: the hub renders the same either way.
  app.get("/api/saves", async (req, res, next) => {
    try {
      const userId = getUserId(req);
      if (!userId) return res.json({ saves: [] });
      res.json({ saves: await listGameSaves(userId) });
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
