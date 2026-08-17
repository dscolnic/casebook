// Classes — a teacher's roster, and what their students' campaigns say.
//
// Everything here reads `game_saves.state`, which is the game engine's own save
// object stored opaquely (see storage.js). That is deliberate and it is also the
// constraint: nothing in the database knows what a lesson is, so the reporting
// below is a reader of the engine's shape and will need revisiting if that shape
// changes. The three fields it depends on are named at `summariseCampaign`.
//
// WHY AUTHORISATION IS IN THE SQL. Every teacher-side query joins
// `classes ON teacher_id = $teacher` rather than fetching the class and then
// checking ownership in JavaScript. A missed check is the whole failure mode
// here — this is student data — and a join that returns no rows cannot be
// forgotten the way an `if` can.
const { pool } = require("./db");

// No I, O, 0 or 1. The code is read off a whiteboard and typed by thirty people
// at once; the ambiguous pairs are the entire cost of getting that wrong.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 6;

function makeCode() {
  let out = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return out;
}

// Codes are typed, so they are compared case-insensitively and with the spaces
// and dashes people put in them thrown away.
function normaliseCode(raw) {
  return String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function displayName(row) {
  const name = [row.first_name, row.last_name].filter(Boolean).join(" ").trim();
  return name || row.email || "Unnamed";
}

// ---------------------------------------------------------------------------
// Reading a campaign.
//
// Three fields of the engine's save carry everything a teacher needs:
//
//   state.missionResults  { "<week>-<stopIndex>": { group, correct, lesson } }
//   state.retries         { "<week>-<groupId>": true }
//   state.hints           { "<week>-<groupId>": true }
//
// The two key spaces are different — questionUI's `visitKey()` is week and area
// id, while `markMissionStopComplete` writes week and stop index — and the
// `group` recorded in each result is what joins them.
//
// `correct` is the answer that STOOD, not the first one given: a wrong call that
// is bought back and answered again overwrites its own result. So "correct" on
// its own overstates how well a class is doing, and `firstTime` — correct with
// no retry against it — is the number worth reading. Both are reported.
function summariseCampaign(state) {
  const results = (state && state.missionResults) || {};
  const retries = (state && state.retries) || {};
  const hints = (state && state.hints) || {};
  const stops = [];
  for (const [key, r] of Object.entries(results)) {
    if (!r || typeof r !== "object") continue;
    const week = Number(String(key).split("-")[0]) || null;
    const visitKey = week != null && r.group ? `${week}-${r.group}` : null;
    stops.push({
      week,
      group: r.group ?? null,
      lesson: r.lesson ?? null,
      correct: !!r.correct,
      retried: visitKey ? !!retries[visitKey] : false,
      hinted: visitKey ? !!hints[visitKey] : false,
    });
  }
  stops.sort((a, b) => (a.week || 0) - (b.week || 0));
  const correct = stops.filter((s) => s.correct).length;
  const firstTime = stops.filter((s) => s.correct && !s.retried).length;
  return { stops, answered: stops.length, correct, firstTime };
}

// ---------------------------------------------------------------------------
// Classes.

async function createClass(teacherId, name, theme) {
  const title = String(name || "").trim();
  if (!title) throw new Error("a class needs a name");
  // Collisions are vanishingly rare (32^6) but not impossible, and a unique
  // violation here would surface as a 500 on the one action a teacher takes
  // first. Retry a few times, then give up honestly.
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO classes (teacher_id, name, theme, join_code)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [teacherId, title.slice(0, 120), theme ? String(theme) : null, makeCode()]
      );
      return shapeClass(rows[0], 0);
    } catch (err) {
      if (err && err.code === "23505") continue; // unique_violation on join_code
      throw err;
    }
  }
  throw new Error("could not allocate a join code");
}

function shapeClass(row, size) {
  return {
    id: row.id,
    name: row.name,
    theme: row.theme || null,
    joinCode: row.join_code,
    size: size ?? (row.size != null ? Number(row.size) : 0),
    createdAt: new Date(row.created_at).getTime(),
  };
}

async function listClassesForTeacher(teacherId) {
  const { rows } = await pool.query(
    `SELECT c.*, COUNT(cm.user_id) AS size
       FROM classes c
       LEFT JOIN class_members cm ON cm.class_id = c.id
      WHERE c.teacher_id = $1
      GROUP BY c.id
      ORDER BY c.created_at DESC`,
    [teacherId]
  );
  return rows.map((r) => shapeClass(r));
}

// The student's view. Deliberately thinner than the teacher's: a class name, the
// game it was set, and who set it. No roster, no join code, nothing about anyone
// else's progress.
async function listClassesForStudent(userId) {
  const { rows } = await pool.query(
    `SELECT c.id, c.name, c.theme, u.first_name, u.last_name, u.email, cm.joined_at
       FROM class_members cm
       JOIN classes c ON c.id = cm.class_id
       JOIN users u ON u.id = c.teacher_id
      WHERE cm.user_id = $1
      ORDER BY cm.joined_at DESC`,
    [userId]
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    theme: r.theme || null,
    teacher: displayName(r),
    joinedAt: new Date(r.joined_at).getTime(),
  }));
}

async function getClassForTeacher(classId, teacherId) {
  const { rows } = await pool.query(
    `SELECT c.*, COUNT(cm.user_id) AS size
       FROM classes c
       LEFT JOIN class_members cm ON cm.class_id = c.id
      WHERE c.id = $1 AND c.teacher_id = $2
      GROUP BY c.id`,
    [classId, teacherId]
  );
  return rows[0] ? shapeClass(rows[0]) : null;
}

async function updateClass(classId, teacherId, { name, theme }) {
  // The casts are not decoration: node-pg sends every parameter as untyped
  // text, and a bare $n inside COALESCE or a CASE branch gives Postgres nothing
  // to infer from — "could not determine data type of parameter" at runtime,
  // on the one route that has no other way to fail.
  const { rows } = await pool.query(
    `UPDATE classes
        SET name  = COALESCE($3::varchar, name),
            theme = CASE WHEN $4::boolean THEN $5::varchar ELSE theme END
      WHERE id = $1 AND teacher_id = $2
      RETURNING *`,
    [
      classId, teacherId,
      name != null ? String(name).trim().slice(0, 120) || null : null,
      theme !== undefined,
      theme ? String(theme) : null,
    ]
  );
  return rows[0] ? shapeClass(rows[0]) : null;
}

async function deleteClass(classId, teacherId) {
  const { rowCount } = await pool.query(
    `DELETE FROM classes WHERE id = $1 AND teacher_id = $2`,
    [classId, teacherId]
  );
  return rowCount > 0;
}

// Joining is by code, and the code is the only thing that grants membership —
// so it is also the only thing that has to be kept off a public page.
async function joinClass(userId, rawCode) {
  const code = normaliseCode(rawCode);
  if (!code) return null;
  const { rows } = await pool.query(`SELECT * FROM classes WHERE join_code = $1`, [code]);
  const cls = rows[0];
  if (!cls) return null;
  // A teacher joining their own class would appear on their own dashboard as a
  // student. Harmless, and confusing enough to be worth refusing.
  if (cls.teacher_id === userId) return { alreadyTeaching: true };
  await pool.query(
    `INSERT INTO class_members (class_id, user_id) VALUES ($1, $2)
     ON CONFLICT (class_id, user_id) DO NOTHING`,
    [cls.id, userId]
  );
  return { id: cls.id, name: cls.name, theme: cls.theme || null };
}

async function leaveClass(classId, userId) {
  await pool.query(
    `DELETE FROM class_members WHERE class_id = $1 AND user_id = $2`,
    [classId, userId]
  );
}

async function removeMember(classId, teacherId, userId) {
  const { rowCount } = await pool.query(
    `DELETE FROM class_members cm
      USING classes c
      WHERE cm.class_id = c.id
        AND c.id = $1 AND c.teacher_id = $2 AND cm.user_id = $3`,
    [classId, teacherId, userId]
  );
  return rowCount > 0;
}

// ---------------------------------------------------------------------------
// The dashboard.
//
// One query, aggregated here rather than in SQL: `missionResults` is an object
// with a key per stop, and unpacking that in Postgres would put the engine's
// save shape into the schema, which is the one thing storage.js is careful not
// to do.
//
// Only the aggregate leaves this function. A class of thirty with five campaigns
// each is a few hundred kilobytes of raw state; what the page receives is a
// couple of numbers per campaign, plus the per-stop detail for ONE game.
async function classProgress(classId, teacherId, theme) {
  const cls = await getClassForTeacher(classId, teacherId);
  if (!cls) return null;

  const { rows } = await pool.query(
    `SELECT u.id, u.first_name, u.last_name, u.email,
            gs.theme, gs.updated_at,
            gs.state->>'week'          AS week,
            gs.state->>'status'        AS status,
            gs.state->'missionResults' AS mission_results,
            gs.state->'retries'        AS retries,
            gs.state->'hints'          AS hints
       FROM class_members cm
       JOIN classes c ON c.id = cm.class_id AND c.teacher_id = $2
       JOIN users u ON u.id = cm.user_id
       -- LEFT, so a student who has started nothing still appears. "Who has not
       -- begun" is the first question a teacher asks and an inner join hides it.
       LEFT JOIN game_saves gs ON gs.user_id = cm.user_id
      WHERE cm.class_id = $1
      ORDER BY u.last_name NULLS LAST, u.first_name NULLS LAST, u.id, gs.updated_at DESC`,
    [classId, teacherId]
  );

  const selected = theme ? String(theme) : null;
  const byUser = new Map();
  const themes = new Set();
  // lesson -> tally, for the selected game only.
  const lessons = new Map();

  for (const r of rows) {
    let student = byUser.get(r.id);
    if (!student) {
      student = {
        userId: r.id,
        name: displayName(r),
        email: r.email || null,
        campaigns: [],
        stops: null,
      };
      byUser.set(r.id, student);
    }
    if (!r.theme) continue; // the LEFT JOIN's empty half
    themes.add(r.theme);

    const sum = summariseCampaign({
      missionResults: r.mission_results,
      retries: r.retries,
      hints: r.hints,
    });
    student.campaigns.push({
      theme: r.theme,
      day: r.week ? Number(r.week) : null,
      status: r.status || null,
      savedAt: new Date(r.updated_at).getTime(),
      answered: sum.answered,
      correct: sum.correct,
      firstTime: sum.firstTime,
    });

    if (selected && r.theme === selected) {
      student.stops = sum.stops;
      for (const s of sum.stops) {
        if (!s.lesson) continue;
        const t = lessons.get(s.lesson) || {
          lesson: s.lesson, group: s.group, week: s.week,
          attempts: 0, correct: 0, firstTime: 0, hinted: 0,
        };
        t.attempts++;
        if (s.correct) t.correct++;
        if (s.correct && !s.retried) t.firstTime++;
        if (s.hinted) t.hinted++;
        lessons.set(s.lesson, t);
      }
    }
  }

  return {
    class: cls,
    themes: Array.from(themes).sort(),
    theme: selected,
    students: Array.from(byUser.values()),
    // Worst first: the point of the table is which lesson the class is stuck on,
    // and a teacher should not have to sort it to find out.
    //
    // Three keys, and the middle one earns its place. A lesson everybody got
    // wrong and a lesson everybody got right on the second attempt both score
    // zero first time, and they are not the same problem — the first is a
    // lesson the class does not have, the second is one it nearly has. So the
    // eventual-correct rate breaks that tie before the sample size does.
    // Sample size is last, so a lesson two people have reached cannot outrank
    // one twenty people have failed.
    lessons: selected
      ? Array.from(lessons.values()).sort((a, b) =>
          (a.firstTime / a.attempts) - (b.firstTime / b.attempts)
          || (a.correct / a.attempts) - (b.correct / b.attempts)
          || b.attempts - a.attempts)
      : [],
  };
}

module.exports = {
  createClass, listClassesForTeacher, listClassesForStudent, getClassForTeacher,
  updateClass, deleteClass, joinClass, leaveClass, removeMember, classProgress,
};
