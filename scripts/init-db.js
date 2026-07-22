// One-off, manually-run setup for the development database. Not invoked by
// the server or by post-merge — Replit's Publish flow is what applies this
// schema to production (see server/db.js for why we don't run DDL at
// startup).
const { pool, SCHEMA_SQL } = require("../server/db");

async function main() {
  await pool.query(SCHEMA_SQL);
  console.log("Schema applied.");
  await pool.end();
}

main().catch((err) => {
  console.error("Failed to apply schema:", err);
  process.exit(1);
});
