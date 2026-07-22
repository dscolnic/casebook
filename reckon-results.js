/* RECKON shared results reporter.
 * Drop into any game: <script src="reckon-results.js"></script>
 *
 * On the Replit app (with the /api backend + a signed-in player) it records
 * results so every game feeds the same streak/badge/stats system. On the
 * static site (GitHub Pages, no /api) it silently no-ops — the auth check
 * fails, so nothing is ever posted and nothing breaks.
 *
 * Usage in a game:
 *   reckonStart(packId)                       // when a playable unit begins
 *   reckonReport({                            // when it ends
 *     gameId:   packId,                       // the pack id  (DB key)
 *     gameTitle:pack.title,                   // shown in stats
 *     rank:     "SOLVED",                     // any short label; Casebook uses tiers
 *     won:      true,                         // boolean
 *     cluesGathered: 9,                       // optional integer
 *     solveSeconds:  123                      // optional; auto-filled from reckonStart if omitted
 *   })
 */
(function () {
  var AUTH = null;
  var started = {};

  function checkAuth() {
    return fetch("/api/auth/user", { credentials: "same-origin" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (u) { AUTH = u; return u; })
      .catch(function () { AUTH = null; return null; });
  }
  checkAuth();

  window.reckonAuth = function () { return AUTH; };
  window.reckonStart = function (gameId) { if (gameId) started[gameId] = Date.now(); };
  window.reckonReport = function (p) {
    if (!AUTH || !p || !p.gameId) return; // no-op when signed out / on static site
    var payload = {
      gameId: p.gameId,
      gameTitle: p.gameTitle || p.gameId,
      rank: p.rank || (p.won ? "SOLVED" : "MISSED"),
      won: !!p.won,
      cluesGathered: p.cluesGathered != null ? p.cluesGathered : null,
      solveSeconds: p.solveSeconds != null ? p.solveSeconds : null,
    };
    if (payload.solveSeconds == null && started[p.gameId] != null) {
      payload.solveSeconds = Math.max(0, Math.round((Date.now() - started[p.gameId]) / 1000));
    }
    try {
      fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      }).catch(function () {});
    } catch (e) {}
  };
})();
