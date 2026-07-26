/* reckon_course.js — shared, standalone (no server) progress + ship-unlock layer
   for the "Reasoning for Naval Science" course and the games it links to.

   Included by: navy_course.html, battleship.html, and every lesson game
   (sequence/ballpark/protocol/casebook/sciencetank + diagnosis/*).

   Storage model (localStorage, keyed per signed-in user):
     reckon-user                      -> {name,email}  (global, current sign-in)
     reckon-course-progress::<email>  -> {done:{nc_id:ts}, battleship:{easy,normal,hard}, seenUnlockCount:int}
   Signed-out users fall back to a shared "guest" store so play still works.        */
(function () {
  "use strict";
  var USER_KEY = "reckon-user";

  /* ---- week -> course puzzle id (single source of truth) ---- */
  var WEEK_NC = [
    "nc_sonar_path", "nc_bp_sonar", "nc_contact_protocol", "nc_bp_navigation",
    "nc_radar_echo", "nc_flooding", "nc_bp_depth", "nc_fire_protocol",
    "nc_gas_turbine_drive", "nc_power_restore", "nc_greywake_case",
    "nc_unrep_protocol", "nc_layered_defense", "nc_bp_radar", "nc_naval_innovation"
  ];
  var WEEK_SET = {}; WEEK_NC.forEach(function (id) { WEEK_SET[id] = true; });

  /* ---- module game chapters -> lesson id ----
     The multi-chapter modules are graded lessons too. Each course chapter has a
     stable id below (Spectrum Ch III + IV share the merged lesson nc_spectrum_3). */
  var MODULE_NC = [
    "nc_spectrum_1", "nc_spectrum_2", "nc_spectrum_3",
    "nc_dr_1", "nc_dr_2", "nc_dr_3",
    "nc_strait_1", "nc_strait_2", "nc_strait_3"
  ];
  /* Every graded, non-SensorShip lesson: 15 topic lessons + 9 module chapters. */
  var LESSON_NC = WEEK_NC.concat(MODULE_NC);
  var LESSON_SET = {}; LESSON_NC.forEach(function (id) { LESSON_SET[id] = true; });

  /* ---- ships: unlock order + metadata (mirrors battleship.html LIB) ----
     You START with the first two (one big Dreadnought, one small Fast Cutter);
     every third graded lesson completed (SensorShip matches excluded) unlocks
     the next ship in this order.        */
  var SHIP_ORDER = ["dreadnought", "cutter", "battleship", "destroyer", "carrier",
    "cruiser", "frigate", "submarine", "corvette", "patrol"];
  var SHIPS = {
    dreadnought: { name: "Dreadnought", color: "#2f5c8f", size: 5, kind: "gunship", blurb: "Active sonar 5, passive 2. Commands the map — but can't move once it's hit." },
    carrier: { name: "Fleet Carrier", color: "#1f7a6d", size: 5, kind: "carrier", blurb: "Active 4, passive 3. Slow flagship that can still crawl away after damage." },
    battleship: { name: "Battleship", color: "#6d4ca3", size: 4, kind: "gunship", blurb: "Active 4, thin passive 1. Heavy hitter that stalls the moment it's hit." },
    cruiser: { name: "Guided Cruiser", color: "#3f8f43", size: 4, kind: "escort", blurb: "Active 3, passive 2, decent mobility; keeps maneuvering after a hit." },
    destroyer: { name: "Destroyer", color: "#b06a2c", size: 3, kind: "escort", blurb: "Active 3, fast (move 3); a nimble hunter that stays mobile when damaged." },
    frigate: { name: "Frigate", color: "#a03f6b", size: 3, kind: "escort", blurb: "No active sonar, long passive ears (3); never gives its own position away." },
    submarine: { name: "Attack Submarine", color: "#2b8fa3", size: 3, kind: "sub", blurb: "Short active 2, strong passive 3. Sneaky and evasive after damage." },
    corvette: { name: "Corvette", color: "#8f7d2f", size: 2, kind: "small", blurb: "Fast passive picket (move 3, passive 2); no active sonar." },
    patrol: { name: "Patrol Boat", color: "#5a6b7a", size: 2, kind: "small", blurb: "Tiny and very fast, but stalls the instant it takes a hit." },
    cutter: { name: "Fast Cutter", color: "#6b4a2f", size: 2, kind: "small", blurb: "Fast starter hull; minimal sensors, always able to keep moving." }
  };
  var BASE_SHIPS = 2; // you begin with the first two ships
  var MAX_FLEET = 4;  // per-MATCH fielding cap: you field up to 4, the enemy always fields 4
  // (you can UNLOCK all 10 ship types over the course; you just pick <=4 for any one match)

  /* ---- user + storage ---- */
  function getUser() { try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; } catch (e) { return null; } }
  function setUser(u) { try { localStorage.setItem(USER_KEY, JSON.stringify(u)); } catch (e) {} }
  function signOut() { try { localStorage.removeItem(USER_KEY); } catch (e) {} }
  function progKey() { var u = getUser(); return "reckon-course-progress" + (u && u.email ? "::" + String(u.email).toLowerCase().trim() : "::guest"); }
  function load() { try { var s = JSON.parse(localStorage.getItem(progKey())); return normalize(s); } catch (e) { return normalize(null); } }
  function normalize(s) {
    s = s || {};
    if (!s.done || typeof s.done !== "object") s.done = {};
    if (!s.battleship || typeof s.battleship !== "object") s.battleship = {};
    if (typeof s.seenUnlockCount !== "number") s.seenUnlockCount = BASE_SHIPS;
    return s;
  }
  function save(s) { try { localStorage.setItem(progKey(), JSON.stringify(s)); } catch (e) {} }

  /* ---- progress math ---- */
  function completedCount(s) { s = s || load(); var n = 0; for (var k in s.done) if (LESSON_SET[k]) n++; return n; }
  function unlockedCount(count) { return Math.min(SHIP_ORDER.length, BASE_SHIPS + Math.floor(count / 3)); }
  function unlockedShips(count) { return SHIP_ORDER.slice(0, unlockedCount(count)); }
  function isWeekDone(week, s) { s = s || load(); return !!s.done[WEEK_NC[week - 1]]; }
  function isDone(id, s) { s = s || load(); return !!(id && s.done[id]); }

  /* ---- current puzzle id (from hash, or window.NC_ID set by a page) ---- */
  function currentNcId() {
    var h = (location.hash || "").replace(/^#/, "");
    if (h && /^nc_/.test(h) && LESSON_SET[h]) return h;
    if (window.NC_ID && LESSON_SET[window.NC_ID]) return window.NC_ID;
    return null;
  }

  /* Record a genuine solve of a course puzzle. Fires the in-game unlock popup
     if this solve pushed the player past a new odd-numbered milestone.         */
  function markSolved(id) {
    if (!id || !LESSON_SET[id]) return false;
    var s = load();
    if (s.done[id]) return false;                 // already recorded — no double count
    var before = unlockedCount(completedCount(s));
    s.done[id] = Date.now();
    var after = unlockedCount(completedCount(s));
    save(s);
    if (after > before) queueUnlockPopups(before, after);
    return true;
  }
  function markSolvedCurrent() { return markSolved(currentNcId()); }

  function markBattleship(level) {
    if (["easy", "normal", "hard"].indexOf(level) < 0) return;
    var s = load(); s.battleship[level] = Date.now(); save(s);
  }

  /* ---- unlock popups (in-game at solve, and catch-up on the course page) ---- */
  function pendingUnlocks(s) {
    s = s || load();
    var target = unlockedCount(completedCount(s));
    var seen = s.seenUnlockCount || BASE_SHIPS;
    var out = [];
    for (var i = seen; i < target; i++) out.push(SHIP_ORDER[i]); // ship at index i is the (i+1)th unlocked
    return out;
  }
  function queueUnlockPopups(fromCount, toCount) {
    var keys = SHIP_ORDER.slice(fromCount, toCount);
    showUnlockSequence(keys);
  }
  // Course page calls this on load to show anything not yet acknowledged.
  function flushPendingUnlocks() {
    var s = load(); var keys = pendingUnlocks(s);
    if (keys.length) showUnlockSequence(keys);
  }
  function ackUnlocks() {
    var s = load(); s.seenUnlockCount = unlockedCount(completedCount(s)); save(s);
  }

  /* ---- ship pictures (parametric SVG silhouettes) ---- */
  function shipSVG(key, opts) {
    var sh = SHIPS[key] || SHIPS.cutter, c = sh.color, size = sh.size, kind = sh.kind;
    var w = 200, h = 96, cx = 100;
    var hullLen = 60 + size * 20;                 // bigger ships → longer hull
    var x0 = cx - hullLen / 2, x1 = cx + hullLen / 2, deck = 58;
    var sea = "<path d='M0 78 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0' fill='none' stroke='rgba(47,93,134,.35)' stroke-width='2'/>";
    var hull = "<path d='M" + x0 + " " + deck + " L" + x1 + " " + deck + " L" + (x1 - 14) + " " + (deck + 16) + " L" + (x0 + 14) + " " + (deck + 16) + " Z' fill='" + c + "'/>";
    var top = "";
    if (kind === "carrier") {
      top = "<rect x='" + (x0 + 6) + "' y='" + (deck - 8) + "' width='" + (hullLen - 12) + "' height='8' rx='2' fill='" + c + "'/>" +
            "<rect x='" + (x1 - 30) + "' y='" + (deck - 22) + "' width='12' height='14' fill='" + c + "'/>" +
            "<line x1='" + (x1 - 24) + "' y1='" + (deck - 22) + "' x2='" + (x1 - 24) + "' y2='" + (deck - 36) + "' stroke='" + c + "' stroke-width='2'/>";
    } else if (kind === "sub") {
      top = ""; // override hull below
    } else if (kind === "gunship") {
      top = "<rect x='" + (cx - 12) + "' y='" + (deck - 20) + "' width='24' height='20' rx='2' fill='" + c + "'/>" +
            "<rect x='" + (x0 + 16) + "' y='" + (deck - 9) + "' width='16' height='9' rx='3' fill='" + c + "'/>" +
            "<rect x='" + (x1 - 32) + "' y='" + (deck - 9) + "' width='16' height='9' rx='3' fill='" + c + "'/>" +
            "<line x1='" + cx + "' y1='" + (deck - 20) + "' x2='" + cx + "' y2='" + (deck - 40) + "' stroke='" + c + "' stroke-width='2'/>";
    } else if (kind === "escort") {
      top = "<rect x='" + (cx - 14) + "' y='" + (deck - 16) + "' width='22' height='16' rx='2' fill='" + c + "'/>" +
            "<line x1='" + (cx - 3) + "' y1='" + (deck - 16) + "' x2='" + (cx - 3) + "' y2='" + (deck - 38) + "' stroke='" + c + "' stroke-width='2'/>" +
            "<line x1='" + (cx - 9) + "' y1='" + (deck - 30) + "' x2='" + (cx + 5) + "' y2='" + (deck - 30) + "' stroke='" + c + "' stroke-width='2'/>";
    } else { // small
      top = "<rect x='" + (cx - 9) + "' y='" + (deck - 11) + "' width='16' height='11' rx='2' fill='" + c + "'/>" +
            "<line x1='" + (cx - 1) + "' y1='" + (deck - 11) + "' x2='" + (cx - 1) + "' y2='" + (deck - 26) + "' stroke='" + c + "' stroke-width='2'/>";
    }
    if (kind === "sub") {
      hull = "<path d='M" + x0 + " " + (deck + 4) + " Q" + x0 + " " + (deck - 6) + " " + (x0 + 20) + " " + (deck - 6) +
             " L" + (x1 - 20) + " " + (deck - 6) + " Q" + x1 + " " + (deck - 6) + " " + x1 + " " + (deck + 4) +
             " Q" + x1 + " " + (deck + 14) + " " + (x1 - 20) + " " + (deck + 14) +
             " L" + (x0 + 20) + " " + (deck + 14) + " Q" + x0 + " " + (deck + 14) + " " + x0 + " " + (deck + 4) + " Z' fill='" + c + "'/>";
      top = "<rect x='" + (cx - 8) + "' y='" + (deck - 18) + "' width='16' height='14' rx='3' fill='" + c + "'/>" +
            "<line x1='" + cx + "' y1='" + (deck - 18) + "' x2='" + cx + "' y2='" + (deck - 30) + "' stroke='" + c + "' stroke-width='2'/>";
    }
    return "<svg viewBox='0 0 " + w + " " + h + "' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='" + sh.name + "'>" +
      sea + top + hull + "</svg>";
  }

  /* ---- unlock modal (self-contained; works on any page) ---- */
  function ensureStyles() {
    if (document.getElementById("rc-style")) return;
    var css = ".rc-ov{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:18px;background:rgba(18,22,26,.55);font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif}" +
      ".rc-modal{width:min(400px,100%);background:#fff;color:#1a1a17;border-radius:22px;padding:26px 24px 22px;text-align:center;box-shadow:0 26px 80px rgba(0,0,0,.32);animation:rc-pop .28s ease}" +
      "@keyframes rc-pop{from{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}" +
      ".rc-eyebrow{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#2f5d86;margin:0 0 6px}" +
      ".rc-modal h2{font-family:Georgia,'Times New Roman',serif;font-size:26px;margin:0 0 4px}" +
      ".rc-pic{margin:12px auto 6px;width:230px;max-width:100%;background:linear-gradient(#eef4f8,#e2ecf2);border:1px solid #dbe4ea;border-radius:16px}" +
      ".rc-pic svg{display:block;width:100%;height:auto}" +
      ".rc-blurb{color:#565651;font-size:13.5px;margin:8px 4px 18px;line-height:1.45}" +
      ".rc-btn{border:0;border-radius:999px;background:#2f5d86;color:#fff;font:inherit;font-weight:800;font-size:14px;padding:11px 22px;cursor:pointer}" +
      ".rc-btn:hover{background:#274d70}" +
      "@media(prefers-color-scheme:dark){.rc-modal{background:#1c1b15;color:#f0eee6}.rc-pic{background:linear-gradient(#22303a,#1a2731);border-color:#33414b}.rc-blurb{color:#a8a69c}}";
    var st = document.createElement("style"); st.id = "rc-style"; st.textContent = css;
    document.head.appendChild(st);
  }
  var _queue = [], _open = false;
  function showUnlockSequence(keys) {
    if (!keys || !keys.length) return;
    _queue = _queue.concat(keys);
    if (!_open) nextUnlock();
  }
  function nextUnlock() {
    if (!_queue.length) { _open = false; ackUnlocks(); return; }
    _open = true;
    var key = _queue.shift(), sh = SHIPS[key] || SHIPS.cutter;
    ensureStyles();
    var ov = document.createElement("div"); ov.className = "rc-ov";
    ov.innerHTML = "<div class='rc-modal' role='dialog' aria-modal='true'>" +
      "<p class='rc-eyebrow'>New ship unlocked</p>" +
      "<h2>" + sh.name + "</h2>" +
      "<div class='rc-pic'>" + shipSVG(key) + "</div>" +
      "<p class='rc-blurb'>" + sh.blurb + " <br><b>Now available in Battleship.</b></p>" +
      "<button class='rc-btn' type='button'>Add to fleet</button></div>";
    document.body.appendChild(ov);
    // advance seen count as each is acknowledged so it isn't shown twice
    var s = load(); s.seenUnlockCount = Math.min(SHIP_ORDER.length, (s.seenUnlockCount || BASE_SHIPS) + 1); save(s);
    function close() { ov.remove(); nextUnlock(); }
    ov.querySelector(".rc-btn").addEventListener("click", close);
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
  }

  /* battleship launch URL for a given difficulty, using current unlocks */
  function battleshipURL(diff, base) {
    var ships = unlockedShips(completedCount());
    return (base || "battleship.html") + "?diff=" + encodeURIComponent(diff) + "&ships=" + ships.join(",");
  }

  window.ReckonCourse = {
    WEEK_NC: WEEK_NC, MODULE_NC: MODULE_NC, LESSON_NC: LESSON_NC, SHIP_ORDER: SHIP_ORDER, SHIPS: SHIPS, BASE_SHIPS: BASE_SHIPS, MAX_FLEET: MAX_FLEET,
    getUser: getUser, setUser: setUser, signOut: signOut,
    load: load, save: save,
    completedCount: completedCount, unlockedCount: unlockedCount, unlockedShips: unlockedShips,
    isWeekDone: isWeekDone, isDone: isDone, currentNcId: currentNcId,
    markSolved: markSolved, markSolvedCurrent: markSolvedCurrent, markBattleship: markBattleship,
    shipSVG: shipSVG, flushPendingUnlocks: flushPendingUnlocks, showUnlockSequence: showUnlockSequence,
    battleshipURL: battleshipURL
  };

  /* When a lesson game was opened from the Naval Science course (its URL carries an
     nc_* course puzzle, or it was navigated to from navy_course.html), repoint that
     game's "← RECKON" back link to the course instead of the RECKON hub. Games opened
     from the RECKON hub for normal play are left untouched. */
  function relinkBackToCourse() {
    try {
      var fromCourse = !!currentNcId() || /navy_course\.html/i.test(document.referrer || "");
      if (!fromCourse) return;
      var inSub = /\/diagnosis\//i.test(location.pathname || "");
      var href = (inSub ? "../" : "") + "navy_course.html";
      var as = document.getElementsByTagName("a");
      for (var i = 0; i < as.length; i++) {
        var h = as[i].getAttribute("href") || "";
        if (/(^|\/)reckon\.html(\?|#|$)/i.test(h)) { as[i].setAttribute("href", href); as[i].textContent = "← Course"; }
      }
    } catch (e) {}
  }
  if (document.readyState !== "loading") relinkBackToCourse();
  else document.addEventListener("DOMContentLoaded", relinkBackToCourse);

  /* Wrap the games' existing completion reporter. Every lesson game already calls
     window.reckonReport({gameId, won, ...}) on a genuine finish (via reckon-results.js,
     which no-ops on the static site). We chain it: a won:true report for one of our
     course puzzles records a real solve — so a week can only be completed by playing
     and winning it, never by a manual click. Include this file AFTER reckon-results.js. */
  var prevReport = window.reckonReport;
  window.reckonReport = function (payload) {
    try { if (payload && payload.won && payload.gameId) markSolved(payload.gameId); } catch (e) {}
    if (typeof prevReport === "function") { try { return prevReport.apply(this, arguments); } catch (e) {} }
  };
})();
