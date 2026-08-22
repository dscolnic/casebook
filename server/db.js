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

-- One in-progress First Person Learning campaign per user per game. The state
-- blob is the engine's own save object, stored opaquely: the games are the only
-- thing that reads it, and its shape changes with them. One row per (user,
-- theme) — the engine keeps a single campaign per game, and a second row would
-- mean a save the player has no way to choose between.
CREATE TABLE IF NOT EXISTS game_saves (
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR NOT NULL,
  state JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, theme)
);

-- What a player thought of a game they finished. One row per (user, game),
-- not an append-only log like game_results: a second campaign re-rates rather
-- than voting twice, so the shelf's average is an average over people rather
-- than over playthroughs. The star value is constrained here because the
-- average is the only thing anybody ever sees — a 0 or a 7 written once is
-- invisible afterwards and moves every reading of that game for ever.
CREATE TABLE IF NOT EXISTS game_ratings (
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id VARCHAR NOT NULL,
  stars SMALLINT NOT NULL CHECK (stars BETWEEN 1 AND 5),
  rated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, game_id)
);
-- The shelf reads every game's average in one query, which is game-first.
CREATE INDEX IF NOT EXISTS idx_game_ratings_game ON game_ratings(game_id);

-- A teacher's roster. There is no role column and there does not need to be:
-- whoever created the class teaches it, and every other member is a student of
-- it. The same account can teach one class and sit in another.
--
-- "theme" is the game the class was set, and it is nullable because a class
-- outlives an assignment — a teacher who moves the group from Red Sand to
-- Blackout changes one row rather than starting a new roster. The dashboard
-- treats it as the default selection, not as a restriction: it will show any
-- game the class actually has campaigns in.
CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
  teacher_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  theme VARCHAR,
  join_code VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes(teacher_id, created_at DESC);

CREATE TABLE IF NOT EXISTS class_members (
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (class_id, user_id)
);
-- Read from the student's side too — "which classes am I in" is a per-user
-- lookup, and the primary key above only indexes the class-first direction.
CREATE INDEX IF NOT EXISTS idx_class_members_user ON class_members(user_id);

-- A co-op room: one campaign several players share. The live parts of a room —
-- who is connected, where they are standing, which stop is claimed — are in
-- memory in server/rooms.js and deliberately not here; they are about this
-- moment and mean nothing after a restart. What is here is the part that must
-- survive one: the campaign blob and the day's remaining clock.
--
-- Stored opaquely for the same reason game_saves is: the engine owns the shape.
CREATE TABLE IF NOT EXISTS rooms (
  code VARCHAR PRIMARY KEY,
  theme VARCHAR NOT NULL,
  owner_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  state JSONB,
  version INTEGER NOT NULL DEFAULT 0,
  clock JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_rooms_updated ON rooms(updated_at DESC);

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
