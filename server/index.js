const http = require("http");
const path = require("path");
const express = require("express");
const { setupAuth, requireUser, getUserId, clerkClient } = require("./clerkAuth");
const {
  getUser, recordResult, getStats, getAvatar, setAvatar,
  getGameSave, putGameSave, deleteGameSave, listGameSaves,
} = require("./storage");
const {
  createClass, listClassesForTeacher, listClassesForStudent,
  updateClass, deleteClass, joinClass, leaveClass, removeMember, classProgress,
} = require("./classes");
const { attach: attachRooms, createRoom, getRoom, issueTicket, roomSummary } = require("./rooms");

const PORT = process.env.PORT || 5000;
const ROOT = path.join(__dirname, "..");

// The Clue-style deduction games this app used to be. The files are all still
// in the tree — server/casebook.js, casebook.html, casebook_build/ — and so is
// everything they wrote to the database; they are simply not served any more.
// Undoing this is deleting the middleware below and restoring the two startup
// calls, which is why nothing was removed instead.
//
// Startup no longer runs casebook.init() or syncCaseBank(), which read every
// pack off disk and wrote the case bank on every boot. Nothing reads that bank
// now, and it was the app's only way to fail to start.
const RETIRED = new Set([
  "/casebook.html",
  "/casebook_static.html",
  "/reckon.html",
  "/character.html",
]);

async function main() {
  const app = express();
  // A First Person Learning campaign is a fair-sized object — fifteen missions
  // of progress plus a hundred-line log — and the default 100 kB body limit
  // rejects one with a 413 the game has no way to report.
  app.use(express.json({ limit: "2mb" }));

  // Every redirect this file issues says no-store, and it is not belt and
  // braces. express.static sets no-store on the files it serves, but a redirect
  // never reaches it — so while `/` pointed at `/reckon.html`, it answered 302
  // with no cache headers at all, and a browser is entitled to keep that. The
  // symptom is the worst kind: the server is right, the deploy is right, and one
  // machine keeps arriving at a page that is no longer linked from anywhere.
  const goTo = (res, where) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res.redirect(302, where);
  };

  // The front door is the game shelf.
  app.get("/", (_req, res) => goTo(res, "/games/"));

  // Retired, before anything else can answer for them. A page goes to the shelf
  // rather than a 404 — anyone arriving has a bookmark, and a dead end teaches
  // them nothing — but the two case APIs answer 410, because their caller is
  // fetch() and a redirect to an HTML page would arrive at a JSON parser.
  app.use((req, res, next) => {
    // Lowercased: on a case-insensitive filesystem — which is every Mac this is
    // developed on — `/Casebook.html` misses the set and then static serves the
    // file anyway. Linux would 404 it, so the bypass only exists where it is
    // least likely to be noticed.
    if (RETIRED.has(req.path.toLowerCase())) return goTo(res, "/games/");
    if (req.path === "/api/shelf" || req.path.startsWith("/api/case/")) {
      res.set("Cache-Control", "no-store, no-cache, must-revalidate");
      return res.status(410).json({ message: "The casebook games are no longer served here." });
    }
    next();
  });

  setupAuth(app);

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

  // ---------------------------------------------------------------------
  // Classes. A teacher creates one, reads out the join code, and watches the
  // roster's campaigns from teacher.html.
  //
  // Every route that touches somebody else's progress passes the caller's own
  // id down to the query, which joins on it. There is no route here that takes
  // a class id and trusts it — see the note at the top of server/classes.js.
  app.get("/api/classes", requireUser, async (req, res, next) => {
    try {
      const [teaching, enrolled] = await Promise.all([
        listClassesForTeacher(req.userId),
        listClassesForStudent(req.userId),
      ]);
      res.json({ teaching, enrolled });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/classes", requireUser, async (req, res, next) => {
    try {
      const { name, theme } = req.body || {};
      if (!name || !String(name).trim()) {
        return res.status(400).json({ message: "name is required" });
      }
      res.json(await createClass(req.userId, name, theme));
    } catch (err) {
      next(err);
    }
  });

  app.patch("/api/classes/:id", requireUser, async (req, res, next) => {
    try {
      const { name, theme } = req.body || {};
      const out = await updateClass(Number(req.params.id), req.userId, { name, theme });
      if (!out) return res.status(404).json({ message: "No such class" });
      res.json(out);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/api/classes/:id", requireUser, async (req, res, next) => {
    try {
      const gone = await deleteClass(Number(req.params.id), req.userId);
      if (!gone) return res.status(404).json({ message: "No such class" });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  });

  // Join by code. A wrong code is a 404 rather than a 400: from the student's
  // side "no class with that code" is the only distinction that matters, and
  // saying anything more precise would confirm which codes exist.
  app.post("/api/classes/join", requireUser, async (req, res, next) => {
    try {
      const out = await joinClass(req.userId, (req.body || {}).code);
      if (!out) return res.status(404).json({ message: "No class with that code" });
      if (out.alreadyTeaching) {
        return res.status(409).json({ message: "That is your own class — you already teach it." });
      }
      res.json(out);
    } catch (err) {
      next(err);
    }
  });

  // Leaving is the student's own action; removing somebody is the teacher's.
  // Both end at the same row, so one route handles them and decides by who is
  // asking — a student may only ever name themselves.
  app.delete("/api/classes/:id/members/:userId", requireUser, async (req, res, next) => {
    try {
      const classId = Number(req.params.id);
      const target = String(req.params.userId);
      if (target === req.userId) {
        await leaveClass(classId, req.userId);
        return res.status(204).end();
      }
      const gone = await removeMember(classId, req.userId, target);
      if (!gone) return res.status(404).json({ message: "No such member" });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  });

  // The dashboard. `theme` picks which game the per-stop detail and the lesson
  // table are about; without it the answer is campaign summaries only.
  app.get("/api/classes/:id/progress", requireUser, async (req, res, next) => {
    try {
      const out = await classProgress(
        Number(req.params.id), req.userId,
        req.query.theme ? String(req.query.theme) : null
      );
      if (!out) return res.status(404).json({ message: "No such class" });
      res.json(out);
    } catch (err) {
      next(err);
    }
  });

  // ---------------------------------------------------------------------
  // Co-op rooms. The campaign, the clock and everybody's position live in
  // server/rooms.js behind a WebSocket; these three routes are only the way in.
  //
  // The socket itself is authenticated by a ticket rather than by the session
  // cookie: Clerk's middleware runs on the Express request, and an HTTP upgrade
  // does not go through it. Asking for a ticket is an ordinary signed-in request,
  // so the auth layer stays in exactly one place.
  app.post("/api/rooms", requireUser, async (req, res, next) => {
    try {
      const theme = String((req.body || {}).theme || "");
      if (!theme) return res.status(400).json({ message: "theme is required" });
      res.json(await createRoom(theme, req.userId));
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/rooms/:code", requireUser, async (req, res, next) => {
    try {
      const room = await getRoom(req.params.code);
      if (!room) return res.status(404).json({ message: "No room with that code" });
      res.json(roomSummary(room));
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/rooms/:code/ticket", requireUser, async (req, res, next) => {
    try {
      const room = await getRoom(req.params.code);
      if (!room) return res.status(404).json({ message: "No room with that code" });
      // The display name is whatever the account calls itself. Falling back to
      // the email's local part rather than to "Player" matters more than it
      // looks: the name is what floats over an avatar and what a claim message
      // reads out, and six players called Player is the same as no names at all.
      const u = await clerkClient.users.getUser(req.userId).catch(() => null);
      const email = u?.emailAddresses?.[0]?.emailAddress || "";
      const name = [u?.firstName, u?.lastName].filter(Boolean).join(" ")
        || email.split("@")[0] || "Player";
      res.json({ ticket: issueTicket(room.code, req.userId, name), code: room.code, theme: room.theme });
    } catch (err) {
      next(err);
    }
  });

  // Investigator portrait: per-user saved character. Its page (character.html)
  // is retired, so nothing calls these — they stay because the column they read
  // still holds every portrait anyone drew, and a route is cheaper to keep than
  // a column is to restore.
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
    return goTo(res, "/sign-in.html");
  });

  // Static site: games/, icons, manifest, service worker, and whatever else is
  // in the root that has not been retired above.
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

  // An explicit http server rather than app.listen(), because the co-op rooms
  // need the 'upgrade' event and app.listen() does not hand it back.
  const server = http.createServer(app);
  attachRooms(server);
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Casebook server listening on http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
