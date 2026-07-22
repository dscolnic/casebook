// One-off, manually-run script to backfill past days so the archive isn't
// empty. Assigns the oldest N cases (in bank order) to the N days before
// today; today itself is left alone — the running app assigns it lazily on
// first request (see server/casebook.js).
//
// Usage: node scripts/seed-daily-puzzles.js [days]   (default 7)
const casebook = require("../server/casebook");
const { pool } = require("../server/db");

async function main() {
  const days = parseInt(process.argv[2] || "7", 10);
  casebook.init();
  await casebook.syncCaseBank();
  const ids = casebook.getOrderedIds();
  if (ids.length <= days) {
    throw new Error(
      `Only ${ids.length} case(s) in the bank — need more than ${days} to backfill ${days} past day(s) and still leave one for today.`
    );
  }
  for (let k = days; k >= 1; k--) {
    const gameId = ids[days - k];
    await pool.query(
      `INSERT INTO daily_puzzles (puzzle_date, game_id)
       VALUES (CURRENT_DATE - $1::int, $2)
       ON CONFLICT (puzzle_date) DO NOTHING`,
      [k, gameId]
    );
  }
  console.log(`Backfilled ${days} past day(s).`);
  await pool.end();
}

main().catch((err) => {
  console.error("Failed to backfill:", err);
  process.exit(1);
});
