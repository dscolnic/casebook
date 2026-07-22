// Data-access helpers for users, game results, and streaks.
const { pool } = require("./db");

async function upsertUser(claims) {
  const id = claims["sub"];
  const email = claims["email"] || null;
  const firstName = claims["first_name"] || null;
  const lastName = claims["last_name"] || null;
  const profileImageUrl = claims["profile_image_url"] || null;
  await pool.query(
    `INSERT INTO users (id, email, first_name, last_name, profile_image_url, updated_at)
     VALUES ($1, $2, $3, $4, $5, now())
     ON CONFLICT (id) DO UPDATE SET
       email = EXCLUDED.email,
       first_name = EXCLUDED.first_name,
       last_name = EXCLUDED.last_name,
       profile_image_url = EXCLUDED.profile_image_url,
       updated_at = now()`,
    [id, email, firstName, lastName, profileImageUrl]
  );
  return getUser(id);
}

async function getUser(id) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows[0] || null;
}

function toDateOnlyUTC(d) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD in UTC
}

async function recordResult(userId, { gameId, gameTitle, rank, won, daysUsed, cluesGathered, solveSeconds }) {
  if (!gameId || !gameTitle || !rank) {
    throw new Error("gameId, gameTitle, and rank are required");
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows: resultRows } = await client.query(
      `INSERT INTO game_results (user_id, game_id, game_title, rank, won, days_used, clues_gathered, solve_seconds)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [userId, gameId, gameTitle, rank, !!won, daysUsed ?? null, cluesGathered ?? null, solveSeconds ?? null]
    );

    const streak = await updateStreak(client, userId);

    await client.query("COMMIT");
    return { result: resultRows[0], streak };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function updateStreak(client, userId) {
  const today = toDateOnlyUTC(new Date());
  const { rows } = await client.query(
    `SELECT * FROM user_streaks WHERE user_id = $1`,
    [userId]
  );
  const existing = rows[0];

  let currentStreak = 1;
  let longestStreak = 1;

  if (existing) {
    longestStreak = existing.longest_streak;
    if (existing.last_played_date) {
      const last = new Date(existing.last_played_date + "T00:00:00Z");
      const diffDays = Math.round((new Date(today + "T00:00:00Z") - last) / 86400000);
      if (diffDays === 0) {
        currentStreak = existing.current_streak; // already played today
      } else if (diffDays === 1) {
        currentStreak = existing.current_streak + 1;
      } else {
        currentStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, currentStreak);
  }

  const { rows: upserted } = await client.query(
    `INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_played_date)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id) DO UPDATE SET
       current_streak = EXCLUDED.current_streak,
       longest_streak = EXCLUDED.longest_streak,
       last_played_date = EXCLUDED.last_played_date
     RETURNING *`,
    [userId, currentStreak, longestStreak, today]
  );
  return upserted[0];
}

async function getStats(userId) {
  const { rows: results } = await pool.query(
    `SELECT * FROM game_results WHERE user_id = $1 ORDER BY played_at DESC LIMIT 100`,
    [userId]
  );
  const { rows: streakRows } = await pool.query(
    `SELECT * FROM user_streaks WHERE user_id = $1`,
    [userId]
  );
  const streak = streakRows[0] || { current_streak: 0, longest_streak: 0, last_played_date: null };

  // best rank per game (first win, or most recent attempt if never won)
  const bestByGame = new Map();
  for (const r of results) {
    const existing = bestByGame.get(r.game_id);
    if (!existing || (r.won && !existing.won)) {
      bestByGame.set(r.game_id, r);
    }
  }

  // derived stats
  const wins = results.filter(r => r.won).length;
  const winRate = results.length > 0 ? Math.round((wins / results.length) * 100) : null;
  const wonWithDays = results.filter(r => r.won && r.days_used != null);
  const avgDaysUsed = wonWithDays.length > 0
    ? Math.round((wonWithDays.reduce((s, r) => s + r.days_used, 0) / wonWithDays.length) * 10) / 10
    : null;

  // average wall-clock solve time (seconds), over results that recorded it
  const withTime = results.filter(r => r.solve_seconds != null);
  const avgSolveSeconds = withTime.length > 0
    ? Math.round(withTime.reduce((s, r) => s + r.solve_seconds, 0) / withTime.length)
    : null;
  // average clues gathered on wins (v3's depth metric, replaces "days used")
  const wonWithClues = results.filter(r => r.won && r.clues_gathered != null);
  const avgClues = wonWithClues.length > 0
    ? Math.round((wonWithClues.reduce((s, r) => s + r.clues_gathered, 0) / wonWithClues.length) * 10) / 10
    : null;

  // badges — computed from existing data, no extra schema needed
  const currentStreak = streak.current_streak;
  const longestStreak = streak.longest_streak;
  const hasExpertWitness = results.some(r => r.rank === "EXPERT WITNESS");
  const hasSharpMind = results.some(r => r.won && r.solve_seconds != null && r.solve_seconds <= 300);
  const BADGES = [
    { id: "first_case",      emoji: "🔍", name: "First Case",      desc: "Completed your first case",           earned: results.length >= 1 },
    { id: "on_a_roll",       emoji: "🔥", name: "On a Roll",       desc: "Current streak of 3 or more days",    earned: currentStreak >= 3 },
    { id: "week_strong",     emoji: "📅", name: "Week Strong",     desc: "Longest streak of 7 or more days",    earned: longestStreak >= 7 },
    { id: "expert_witness",  emoji: "⭐", name: "Expert Witness",  desc: "Achieved the Expert Witness rank",    earned: hasExpertWitness },
    { id: "sharp_mind",      emoji: "🎯", name: "Sharp Mind",      desc: "Won a case in under 5 minutes",    earned: hasSharpMind },
    { id: "veteran",         emoji: "🏆", name: "Veteran",         desc: "Attempted 10 or more cases",          earned: results.length >= 10 },
  ];

  return {
    results,
    bestByGame: Array.from(bestByGame.values()),
    streak: {
      currentStreak: streak.current_streak,
      longestStreak: streak.longest_streak,
      lastPlayedDate: streak.last_played_date,
    },
    wins,
    winRate,
    avgDaysUsed,
    avgSolveSeconds,
    avgClues,
    badges: BADGES,
  };
}

module.exports = { upsertUser, getUser, recordResult, getStats };
