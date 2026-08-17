// Drives server/classes.js classProgress() against a stubbed pool, so the
// aggregation can be checked without a database. The thing actually under test
// is the join between two different key spaces: missionResults is keyed
// `${week}-${stopIndex}` and retries/hints are keyed `${week}-${groupId}`.
const Module = require("module");
const path = require("path");

const SERVER = path.join(__dirname, "..", "server");

let rowsFor = { cls: [], progress: [] };
const pool = {
  query: async (sql) => {
    if (/FROM classes c/.test(sql) && /COUNT/.test(sql)) return { rows: rowsFor.cls };
    if (/FROM class_members cm/.test(sql) && /LEFT JOIN game_saves/.test(sql)) return { rows: rowsFor.progress };
    throw new Error("unexpected query:\n" + sql);
  },
};

const realLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "./db") return { pool, SCHEMA_SQL: "" };
  return realLoad.apply(this, arguments);
};

const classes = require(path.join(SERVER, "classes.js"));

// --- fixture ---------------------------------------------------------------
// Four stops answered. Day 2's fuel-cell stop was got wrong, bought back and
// answered again — so its result reads `correct` while a retry is on record.
// Day 3's stop used a hint. Day 4 is simply wrong.
const state = {
  week: 4,
  status: "playing",
  missionResults: {
    "1-0": { group: "sabatier", correct: true,  lesson: "Le Chatelier on the Sabatier reactor" },
    "1-1": { group: "cryo",     correct: true,  lesson: "Phase change and boil-off" },
    "2-0": { group: "fuelcell", correct: true,  lesson: "Standard cell potentials" },
    "3-0": { group: "electro",  correct: true,  lesson: "Faraday's laws of electrolysis" },
    "4-0": { group: "regolith", correct: false, lesson: "Percent yield from a dusty feedstock" },
  },
  retries: { "2-fuelcell": true },
  hints:   { "3-electro": true },
};

rowsFor.cls = [{
  id: 7, teacher_id: "t1", name: "Period 3", theme: "redsand",
  join_code: "K4M7QX", created_at: new Date("2026-08-01"), size: "2",
}];
rowsFor.progress = [
  { id: "s1", first_name: "Ada", last_name: "Byron", email: "ada@school.edu",
    theme: "redsand", updated_at: new Date("2026-08-16T10:00:00Z"),
    week: "4", status: "playing",
    mission_results: state.missionResults, retries: state.retries, hints: state.hints },
  // A second campaign for the same student in another game — must summarise but
  // must NOT leak into the selected game's stop detail or lesson table.
  { id: "s1", first_name: "Ada", last_name: "Byron", email: "ada@school.edu",
    theme: "blackout", updated_at: new Date("2026-08-14T09:00:00Z"),
    week: "2", status: "playing",
    mission_results: { "1-0": { group: "yard", correct: false, lesson: "The swing equation" } },
    retries: {}, hints: {} },
  // Enrolled, never opened a game: the LEFT JOIN's empty half.
  { id: "s2", first_name: "Grace", last_name: "Hopper", email: "grace@school.edu",
    theme: null, updated_at: null, week: null, status: null,
    mission_results: null, retries: null, hints: null },
];

// --- run -------------------------------------------------------------------
let failures = 0;
function check(label, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}` + (ok ? "" : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`));
}

(async () => {
  const out = await classes.classProgress(7, "t1", "redsand");

  check("class name", out.class.name, "Period 3");
  check("join code surfaces", out.class.joinCode, "K4M7QX");
  check("themes seen", out.themes, ["blackout", "redsand"]);
  check("students listed", out.students.map(s => s.name), ["Ada Byron", "Grace Hopper"]);

  const ada = out.students[0];
  check("Ada has both campaigns", ada.campaigns.map(c => c.theme).sort(), ["blackout", "redsand"]);

  const rs = ada.campaigns.find(c => c.theme === "redsand");
  check("answered counts every stop", rs.answered, 5);
  check("correct counts the bought-back answer", rs.correct, 4);
  check("firstTime does not", rs.firstTime, 3);
  check("day read off the save", rs.day, 4);

  check("stop detail is the selected game only", ada.stops.length, 5);
  const retried = ada.stops.find(s => s.group === "fuelcell");
  check("retry joined by week+group", [retried.correct, retried.retried], [true, true]);
  const hinted = ada.stops.find(s => s.group === "electro");
  check("hint joined by week+group", hinted.hinted, true);
  check("a stop with neither is clean",
    ada.stops.filter(s => s.retried || s.hinted).length, 2);

  const grace = out.students[1];
  check("student who never started still appears", grace.campaigns, []);
  check("...with no stop detail", grace.stops, null);

  check("lesson table covers the selected game only", out.lessons.length, 5);
  check("worst lesson first", out.lessons[0].lesson, "Percent yield from a dusty feedstock");
  check("the bought-back stop ranks second worst", out.lessons[1].lesson, "Standard cell potentials");
  check("...and reads 0% first time", out.lessons[1].firstTime, 0);
  check("...while still reading correct", out.lessons[1].correct, 1);
  check("hint recorded against its lesson",
    out.lessons.find(l => l.lesson === "Faraday's laws of electrolysis").hinted, 1);

  // No theme selected: summaries only, no per-stop detail, no lesson table.
  const overview = await classes.classProgress(7, "t1", null);
  check("overview has no lesson table", overview.lessons, []);
  check("overview has no stop detail", overview.students[0].stops, null);
  check("overview still counts campaigns", overview.students[0].campaigns.length, 2);

  console.log(failures ? `\n${failures} failed` : "\nall passed");
  process.exit(failures ? 1 : 0);
})();
