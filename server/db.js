// Postgres connection pool + one-time schema setup for Casebook accounts,
// results, and streaks. Uses the project's built-in Postgres database
// (DATABASE_URL is provided by the environment).
const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set — the project's Postgres database is not reachable.");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// NOTE: this schema is applied to the development database via
// `scripts/init-db.js` (run manually, once). It is intentionally NOT run at
// server startup: Replit's Publish flow diffs the dev/prod schemas and
// applies the result to production automatically, so the running app must
// never issue DDL against its own database connection.
const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR PRIMARY KEY,
  email VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  profile_image_url VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);
-- Per-user saved investigator portrait (from character.html). Idempotent.
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar JSONB;

CREATE TABLE IF NOT EXISTS game_results (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id VARCHAR NOT NULL,
  game_title VARCHAR NOT NULL,
  rank VARCHAR NOT NULL,
  won BOOLEAN NOT NULL,
  days_used INTEGER,
  clues_gathered INTEGER,
  solve_seconds INTEGER,
  game VARCHAR,
  score INTEGER,
  played_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_game_results_user ON game_results(user_id, played_at DESC);
-- Migration for databases created before solve-time tracking (idempotent).
ALTER TABLE game_results ADD COLUMN IF NOT EXISTS solve_seconds INTEGER;
ALTER TABLE game_results ADD COLUMN IF NOT EXISTS game VARCHAR;
ALTER TABLE game_results ADD COLUMN IF NOT EXISTS score INTEGER;

CREATE TABLE IF NOT EXISTS user_streaks (
  user_id VARCHAR PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_played_date DATE
);

-- Every case pack the server has ever discovered on disk (casebook_build/pack_*.js),
-- in first-seen order (id is the rotation order). New packs pushed via git get
-- appended here automatically the next time the server starts.
CREATE TABLE IF NOT EXISTS case_bank (
  id SERIAL PRIMARY KEY,
  game_id VARCHAR UNIQUE NOT NULL
);

-- Which case ran on which calendar day. This is the permanent historical
-- record: once a row exists it never changes, even if the bank is reordered.
CREATE TABLE IF NOT EXISTS daily_puzzles (
  id SERIAL PRIMARY KEY,
  puzzle_date DATE UNIQUE NOT NULL,
  game_id VARCHAR NOT NULL REFERENCES case_bank(game_id),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

module.exports = { pool, SCHEMA_SQL };
