# RECKON Navy Course — Authoring Spec (new topics, new puzzles)

Goal: ChatGPT designs a semester of **new** topics and authors a **new puzzle for each
week** in its assigned game's format, as a **course-only set** (these do NOT join the
games' daily rotation — that separation is handled on the repo side). It also produces
the syllabus page that links into them.

**Hand ChatGPT these three files:** this spec, `GAME_TEMPLATES.md` (the exact structure
to mimic per game), and `GAME_CATALOG.md` (only to avoid id collisions + for the
deep-link format).

---

## 1. Workflow

1. Design a **14–16 week** naval-science semester: each week has a topic, a learning
   objective, and an assigned game.
2. For each week, **author a brand-new puzzle** in that game's format by copying the
   matching block in `GAME_TEMPLATES.md` and changing only the content — same fields,
   same shape.
3. Give every new puzzle an id prefixed **`nc_`** (e.g. `nc_sonar_seq`, `bp_nc_reactor`)
   so course puzzles never collide with existing ids and can be routed out of rotation.
4. Return the puzzles grouped by game + the week→puzzle mapping + the syllabus page
   (§§5–7).

## 2. Which games to use (be realistic)

- **Easy & reliable — use these for most weeks:** **Protocol, Sequence, Ballpark.**
  Clean schemas; new puzzles will load with light checking.
- **Advanced — use sparingly, at most 1–2 weeks each, and expect heavy verification:**
  **Diagnosis, Casebook, Science Tank.** Their templates are large and internally
  interlocking (a Diagnosis panel must stay logically consistent; a Casebook pack has
  clue-tagging; Science Tank needs defensible economics). Only attempt these by mimicking
  the template field-for-field.

## 3. Course data model

```js
const course = {
  title: "Reasoning for Naval Science",
  subtitle: "A 15-week problem-solving semester",
  intro: "1–2 sentences framing the course.",
  weeks: [
    {
      week: 1,
      topic: "Sound in seawater and passive sonar",
      game: "Sequence",                 // exact game name
      puzzleId: "nc_sonar_seq",          // the new puzzle's id (nc_ prefixed)
      objective: "One sentence: what the student can do after this week.",
      note: ""
    }
    // ...one per week
  ]
};
```

## 4. Per-game authoring rules (structure comes from GAME_TEMPLATES.md)

Match the template exactly; these are the content rules on top of it.

- **Protocol** — ordered `events`; each `answer` is a card id; `cards` = events + **exactly
  3 decoys**. Exactly one card fits each event; give each event two independent
  disambiguating cues; decoys plausible but clearly wrong. (Full rules: `PROTOCOL_SPEC.md`.)
- **Sequence** — 3 chapters of 4 `cards` each; a true `chapterOrder`; `segues` between
  chapters; 2 `hints`; `principles`; `intro`. Every adjacency must be *uniquely* ordered
  by real cause/effect — no two steps that are genuinely simultaneous.
- **Ballpark** — `eqs` of `factors` combined by `ops` to an `answer`. **Every factor
  value needs a real cited source or a defined conversion**, the arithmetic must check
  out exactly, and **no two factor values across the topic may share the same display
  number** (that shared bank must stay unambiguous).
- **Diagnosis** (advanced) — one fault (or compound) must be consistent with **every**
  gauge while each wrong candidate is contradicted by ≥1 specific reading. Keep every
  signature logically consistent or the puzzle is unfair.
- **Casebook** (advanced) — Who/Where/What solution; three informants; only the
  `expert`-tagged option files a clue; the truth sits between a sensational and a
  do-nothing explanation. Deducible from the filed clues alone.
- **Science Tank** (advanced) — 3 round packages (via a GAME_SETS group); each idea's
  reveal (`returnMultiplier`, `impactTier`) must be historically defensible; separate
  historical impact from investor return.

**Universal:** real, accurate science; deducible from what's shown; one defensible
answer; neutral editorial voice; naval/defense relevance where the topic allows.

## 5. The syllabus page (`navy_course.html`)

A self-contained presentation page (not a game):
- Header: title, subtitle, intro, and a `← RECKON` link to `reckon.html`.
- One card per week: week number, topic, objective, a game badge, the puzzle's title,
  and a **"Play this puzzle →"** button using the deep-link (§6) for the new id.
- Reuse the RECKON editorial look:
  ```css
  :root{--bg:#fff;--ink:#1a1a17;--muted:#565651;--accent:#2f5d86;--hair:#e4e4e2;
        --chip:#f4f4f1;--hover:#eef0f2;--serif:Georgia,serif;--sans:system-ui,sans-serif;}
  @media (prefers-color-scheme:dark){:root{--bg:#16150f;--ink:#f0eee6;--muted:#a8a69c;--hair:#33322b;--chip:#22211b;--hover:#26251e;}}
  ```
- Responsive, theme-aware, minimal, no hype. Optional: mark a week done in
  `localStorage` when its link is clicked (cosmetic only).

## 6. Deep-link format (link the course page to the NEW ids)

| Game | href |
|---|---|
| Casebook | `casebook_static.html#<id>` |
| Diagnosis | `diagnosis/<file>` (each puzzle is its own file — for a new one, supply a filename) |
| Sequence | `sequence.html#<id>` |
| Ballpark | `ballpark.html#<id>` |
| Science Tank | `sciencetank.html#<id>` |
| Protocol | `protocol.html#<id>` |

## 7. Deliverables

1. **New puzzle objects, grouped by game**, each matching its `GAME_TEMPLATES.md` shape,
   with `nc_`-prefixed ids. (These get merged + kept out of daily rotation on the repo side.)
2. **`course.weeks`** mapping each week to its game + new puzzle id + objective.
3. **`navy_course.html`** implementing §§5–6, with the syllabus filled in.
4. A note of any week you couldn't author well (especially advanced-game weeks) so it
   can be hand-finished.

## 8. What happens after ChatGPT returns it (repo side — not ChatGPT's job)

Merging the new puzzles into each game's data, keeping them out of the daily rotation
(the hub only rotates its own listed ids), verifying every puzzle for accuracy/fairness,
and wiring `navy_course.html` into the site — all handled here.
