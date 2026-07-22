# RECKON — Game Pack Standard

How every RECKON game is organized, and how to author new content. The goal
is one format so (a) content lives in small files instead of giant HTML, and
(b) the same backend (daily puzzle, release gating, streaks/stats) can serve
every game uniformly.

## The rule

**A game = one thin engine + many `.js` data packs.** Data never lives inside
the HTML by hand. The HTML is a *generated artifact*; the packs are the source
of truth.

```
<game>.html                 ← engine (renders whatever packs it's given)
<game>_build/
  pack_<id>.js              ← one data pack per playable unit: module.exports = { PACK: {...} }
  manifest.json             ← ordered list of pack ids (controls display order)
  load_packs.js             ← discovers + validates packs, returns { packs, passing }
  build_<game>.js           ← inlines packs into ../<game>.html for the static site
```

Two ways the engine gets its data:
- **Static site (GitHub Pages):** `build_<game>.js` inlines the packs into the
  HTML. Run it after editing packs.
- **App (Replit backend):** the server's `load_packs.js` discovers the packs and
  serves them through the API (`/api/shelf`, `/api/case/:id`), with daily
  release gating. Nothing unreleased ever reaches the browser.

## Pack file shape (all games)

```js
module.exports = { PACK: {
  id: "e_quake",              // REQUIRED — unique, stable, kebab/snake, used in URLs + DB
  title: "Nine Seconds to Cordera",  // REQUIRED — shown on the shelf and in stats
  discipline: "Seismology",   // REQUIRED — short topic tag for the shelf
  // ...game-specific fields below...
} };
```

`id`, `title`, `discipline` are mandatory for **every** game — the shelf and the
stats/results system key off them. Everything else is game-specific.

### Casebook pack (v3 — the deduction game)
Must set `schemaVersion: 3` (or `mode: "three_informants_three_readings"`) or the
loader ignores it. Required structure:
- `teaser`, `story[]`, `emblem` (inline SVG), `agent`, `subt`
- `READING_ORDER` — exactly 3 informant keys
- `CHARACTERS` — the 3 informants (`name`, `role`, `face`, `hint`, `reading`→TOPICS key)
- `TOPICS` — exactly 3, each `{ sci, topic, lede, profile, frame, q:[3] }`; each
  question has 4 options (`t`, `v` ∈ expert|partial|wrong|danger, `fb`) with
  **exactly one expert**, and a `clue { category: who|where|what, label, text }`.
  The 3 clues in a reading cover one who, one where, one what.
- `CATS.{who,where,what}` — each `{ title, truth, items:[3] {id,label} }`
- `endings` — `win {expertTitle/expert, soundTitle/sound, namedTitle/named}`,
  plus `overclaim`, `dismissal`, `wrongNames` (each `{title, body[]}`), and
  `overclaimWhat`/`dismissalWhat` = the two **non-truth** WHAT ids.
- Authoring rules (anti-archetype, cohesion, no giveaways) are in
  `CASEBOOK_SPEC_V3_ADDENDUM.md` / `CASEBOOK_V3_BATCH_REVISION_NOTE.md`.

### Ballpark pack (Fermi estimation)
`{ id, title, casebookTitle, tag, context, terms:[[term,def],…], eqs:[…], sourceSummary }`
— `eqs` is the list of estimation problems (each with factors, real values, sources).

### Sequence pack (reconstruct the order)
`{ id, icon, discipline, title, headline, kicker, story, overview, terms, note,
sources, chapters, chapterOrder, segues, principles, hints, intro, collection }`.

### Science Tank pack (invest across historical innovations)
Two-level today (`GAME_SETS` reference shared `roundPackages`). When converted,
each pack should be **self-contained**: bundle the game's 3 resolved rounds
inside the pack so it matches every other game (one pack = one playable unit).
Shape: `{ id, title, words:[3], gameConfig, rounds:[3] }` where each round is the
full round object (concealed ideas, research, reveal). See "Not yet converted".

## Authoring workflow (for ChatGPT)

1. Write `<game>_build/pack_<newid>.js` following the shape above.
2. Add `"<newid>"` to `<game>_build/manifest.json` where you want it in order.
3. Validate: `node <game>_build/load_packs.js` (or the game's validator) — fix
   anything it flags.
4. Build the static site: `node <game>_build/build_<game>.js` (regenerates the
   HTML from packs). On the Replit app, just restart — the server auto-discovers
   the new pack and adds it to the daily rotation.

Rules of thumb:
- **Never edit the big HTML's data by hand.** Edit the pack, rebuild.
- Keep `id` stable once shipped — it's the URL hash *and* the database key for
  stats/results, so renaming it orphans a player's history.
- One pack = one thing a player sits down and plays.
- `title` + `discipline` are player-facing; write them for the shelf.

## How packs feed the backend (results & stats)

Every game reports results through one shared helper, **`reckon-results.js`**
(repo root). Include it in a game and call two functions:

```html
<script src="reckon-results.js"></script>
```
```js
reckonStart(packId)            // when a playable unit begins (starts the solve timer)
reckonReport({ gameId: packId, gameTitle: pack.title, rank, won, cluesGathered, solveSeconds })
                               // when it ends
```

`reckonReport` POSTs to `/api/results` **only when signed in on the Replit app**;
on the static site (no `/api`) it silently no-ops, so it's safe to ship
everywhere. Stats are keyed by `gameId`, so every game feeds the same
streak/badge system with no schema change.

**Per-game hook points** (where to place the two calls):

| Game | `reckonStart` at | `reckonReport` at | won / rank |
|---|---|---|---|
| Casebook | case opens | `resolve()` verdict | won = all 3 correct; rank = EXPERT WITNESS / SOUND, THIN / NAMED / OVERCLAIM / … |
| Science Tank | `startGame()` ✅ wired | `finishRound()` final branch ✅ wired | won = bankroll ≥ target; rank = TARGET REACHED / MISSED |
| Diagnosis | when a case loads | `reveal()` after the diagnosis is committed | won = chosen cause === PACK truth; rank = SOLVED / MISSED |
| Sequence | when a case loads | when the order is completed | won = order correct; rank = SOLVED / MISSED |
| Ballpark | when a pack starts | after the last estimation | estimation has no natural win — send rank = an accuracy band (e.g. WITHIN 2× / WITHIN 10×), won = within a chosen threshold. **Decide the band before wiring.** |

Casebook and Science Tank are wired. The other three get wired when each is
brought onto the Replit backend (so the hook can be tested live) — this is the
same one-game-at-a-time migration Casebook went through: give the game a
`load_packs.js` the server can call, decide daily-gated vs always-open, add it
to the hub, then wire + test the two calls above.

## Status

| Game | Format | Packs |
|---|---|---|
| Casebook | ✅ standard (`casebook_build/`) | 37 v3 |
| Ballpark | ✅ standard (`ballpark_build/`) | 61 |
| Sequence | ✅ standard (`sequence_build/`) | 20 |
| Science Tank | ⏳ monolithic HTML (two-level `GAME_SETS`) | 32 |
| Diagnosis | ⏳ one HTML file per case (not data-driven) | ~10 |

### Not yet converted
- **Science Tank** — data is inlined and two-level (games reference shared
  rounds). Conversion: resolve each game's `roundIds` into embedded `rounds` so
  each pack is self-contained, then the same manifest/build/validator pattern.
- **Diagnosis** — each case is a separate hand-built HTML (`diagnosis/*_playable.html`),
  not engine+data. Conversion is larger: extract a shared engine and turn each
  case into a data pack. Recommended before putting Diagnosis on the backend.
