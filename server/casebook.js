// Serves the "puzzle of the day" system: which case runs on which calendar
// day, and the archive of past days. Deliberately keeps unreleased case
// content out of memory-to-browser responses — only released packs are ever
// sent to the client (see getCaseIfReleased).
const { pool } = require("./db");
const { loadPacks } = require("../casebook_build/load_packs");

let PACKS_BY_ID = new Map();
let ORDERED_IDS = [];

function init() {
  const { packs, passing } = loadPacks();
  if (passing.length === 0) {
    throw new Error(
      "No valid case packs found in casebook_build/ — check `node casebook_build/build_casebook.js`."
    );
  }
  console.log(`Casebook: loaded ${passing.length}/${packs.length} valid case pack(s).`);
  PACKS_BY_ID = new Map(passing.map((p) => [p.id, p]));
  ORDERED_IDS = passing.map((p) => p.id);
}

function getOrderedIds() {
  return ORDERED_IDS.slice();
}

// DML only (INSERT), never DDL — see server/db.js for why schema changes
// must go through Publish, not app startup.
async function syncCaseBank() {
  for (const id of ORDERED_IDS) {
    await pool.query(
      "INSERT INTO case_bank (game_id) VALUES ($1) ON CONFLICT (game_id) DO NOTHING",
      [id]
    );
  }
}

// Returns today's assigned game_id, assigning the next case in rotation
// (oldest-unused-first) if today doesn't have one yet. All date logic runs
// in Postgres (CURRENT_DATE) to avoid app/db timezone drift.
async function ensureTodayAssigned() {
  const existing = await pool.query(
    "SELECT game_id FROM daily_puzzles WHERE puzzle_date = CURRENT_DATE"
  );
  // Only reuse an existing assignment if it still maps to a loaded pack;
  // a stale id left over from a previous engine would break today's case.
  if (existing.rows.length > 0 && PACKS_BY_ID.has(existing.rows[0].game_id)) {
    return existing.rows[0].game_id;
  }

  // Pick the next case in rotation, restricted to packs actually loaded now
  // (so stale case_bank ids from an old engine are never assigned).
  const next = await pool.query(
    `SELECT cb.game_id FROM case_bank cb
     WHERE cb.game_id = ANY($1)
     ORDER BY (SELECT MAX(dp.puzzle_date) FROM daily_puzzles dp WHERE dp.game_id = cb.game_id) ASC NULLS FIRST,
              cb.id ASC
     LIMIT 1`,
    [ORDERED_IDS]
  );
  if (next.rows.length === 0) {
    throw new Error("Case bank is empty — add pack_*.js files and restart the server.");
  }
  const gameId = next.rows[0].game_id;
  // Upsert: replaces a stale/broken today-assignment left by an old engine.
  // (Only reached when today has no valid assignment, so this never rewrites
  // a good historical row.)
  await pool.query(
    "INSERT INTO daily_puzzles (puzzle_date, game_id) VALUES (CURRENT_DATE, $1) ON CONFLICT (puzzle_date) DO UPDATE SET game_id = EXCLUDED.game_id",
    [gameId]
  );
  const row = await pool.query(
    "SELECT game_id FROM daily_puzzles WHERE puzzle_date = CURRENT_DATE"
  );
  return row.rows[0].game_id;
}

function metadataFor(gameId) {
  const p = PACKS_BY_ID.get(gameId);
  if (!p) return null;
  return { id: p.id, title: p.title, discipline: p.discipline, subt: p.subt || null, teaser: p.teaser, overclaimTag: p.overclaimTag };
}

// The shelf has two parts:
//   released — today + the past 14 days of assignments (newest first). Playable.
//   upcoming — every case still in the bank that has never been released, in
//              rotation order. Sent WITHOUT title/teaser so it's clear more is
//              loaded and coming, but the daily reveal isn't spoiled.
// Never includes future days as playable (their content is gated server-side).
async function getShelf() {
  const todayId = await ensureTodayAssigned();
  const rel = await pool.query(
    "SELECT to_char(puzzle_date, 'YYYY-MM-DD') AS date, game_id FROM daily_puzzles WHERE puzzle_date <= CURRENT_DATE AND puzzle_date > CURRENT_DATE - INTERVAL '14 days' ORDER BY puzzle_date DESC"
  );
  const released = rel.rows
    .map((r) => {
      const meta = metadataFor(r.game_id);
      if (!meta) return null; // pack removed from disk since it was assigned
      return { ...meta, date: r.date, isToday: r.game_id === todayId };
    })
    .filter(Boolean);

  const up = await pool.query(
    `SELECT cb.game_id FROM case_bank cb
     WHERE NOT EXISTS (SELECT 1 FROM daily_puzzles dp WHERE dp.game_id = cb.game_id)
     ORDER BY cb.id ASC`
  );
  const upcoming = up.rows
    .map((r) => {
      const p = PACKS_BY_ID.get(r.game_id);
      return p ? { discipline: p.discipline, locked: true } : null;
    })
    .filter(Boolean);

  return { released, upcoming, upcomingCount: upcoming.length };
}

// Full case content — but only if it has actually been released (today or a
// past day). Unreleased packs never leave the server process.
async function getCaseIfReleased(gameId) {
  const r = await pool.query(
    "SELECT 1 FROM daily_puzzles WHERE game_id = $1 AND puzzle_date <= CURRENT_DATE",
    [gameId]
  );
  if (r.rows.length === 0) return null;
  return PACKS_BY_ID.get(gameId) || null;
}

module.exports = { init, getOrderedIds, syncCaseBank, getShelf, getCaseIfReleased };
