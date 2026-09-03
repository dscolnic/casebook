# The question types — all 44 formats, what each asks, where it is asked

Every stop in every campaign is one of the formats below. The **canonical list is
the `FORMATS` set in `engine/content/normalize.js`** — not this file, not
`FORMATS.md`, not a book. A format that is not in that set cannot be authored:
`tools/import-book.mjs` refuses the stop, and `normalize.js` reports it if a
stale generated file carries one.

Three functions decide everything about a type:

| Function | Lives in | Answers |
| --- | --- | --- |
| `canonicalType(t)` | `engine/content/normalize.js` | `'Science Tank'`, `'science_tank'`, `'SCIENCETANK'` are one format. **Never compare a type as a raw string** — the books spell them three ways. |
| `isInstrument(k)` | `engine/core/instruments.js` | does `instruments.js` render a live panel for it — 32 of the 44 are in the `INSTRUMENTS` registry (the base eight and Quantum's four render in `questionUI.js` instead) |
| `stopKind(t)` | `engine/content/normalize.js` | `decision` (ask a **person**) / `calculation` (ask at a **room** — desk, bench, board) / `operated` (ask at the **fixture** the player drives) |

`isInstrument` and `stopKind` are different questions about the same word and
have already cost one wrong guess. DERIVE and BALANCE render as instruments and
belong at a desk; VALUE and ATTEST render as instruments and belong to a person.

## The counts are measured, not quoted

Everything in the "stops" and "games" columns was counted on **2 September 2026**
by walking `CURRICULUM` in all 62 registered themes (25 campaigns + 10 Quick
Discoveries + 12 junior and 3 AP editions + the `instruments` demo book):

**2,331 lessons, every one carrying exactly one game, and the per-format totals
sum to 2,331 exactly.** No lesson carries a second typed challenge.

"Games" is the number of *themes* authoring the format at least once, so an
edition counts separately from its parent — a format at 30 games is usually one
stop in each of thirty campaigns, not thirty stops in one.

---

## The base eight — authored in nearly every game

Rendered by `engine/core/questionUI.js`. `tools/BOOK_TEMPLATE.md` carries the
worked YAML for each of these, and it is the only family the template covers.

| Format | The player | Asked at | Stops | Games | Heaviest | Book fields |
| --- | --- | --- | --- | --- | --- | --- |
| `CHOICE` | one question, four candidates, a rebuttal per wrong one | person | 570 | 62 | hospital 32, sightline 19, redsand 18 | `question`, `choices`, `answer`, `why`, `rebuttals` |
| `BALLPARK` | assembles an estimate from quantity tiles against a live log scale | room | 484 | 61 | projecty 38, hospital 19, deepwatch_hs 16 | `estimate:` block — `labels`/`values`/`slots`/`template`/`formula`/`correct`/`target`/`tolerance` |
| `PROTOCOL` | matches situations to responses, drawn as lines | room | 251 | 58 | projecty 34, contamcity 9, planetary_defense 9 | `scenarios`, `choices`, `mapping` (a permutation) |
| `SEQUENCE` | puts steps in order on a numbered rail | room | 243 | 48 | hospital 51, projecty 41, outbreak_riverton 13 | `cards`, `order`; `axis` + `ends` when the order is not chronological |
| `CASEBOOK` | matches clues to explanations — PROTOCOL's fields, an evidence frame | person | 59 | 18 | hospital 26, quantum 6, blackout 3 | `scenarios`, `choices`, `mapping` |
| `DIAGNOSIS` | reads a whole instrument panel and names the one cause that fits every reading | room | 52 | 31 | outbreak_riverton 6, contamcity 3, projecty 3 | `headline`, `readings` (≥3 zones, not all alarms), `choices` with `mechanism`, `answer` |
| `TRIAGE` | sorts items into named buckets — renders as CHOICE, reads honestly as "who first" | person | 46 | 14 | hospital 15, changeover 8, quantum 6 | as `CHOICE` |
| `SCIENCETANK` | spends 100 points across proposals, graded on what would change the decision | person | 38 | 15 | projecty 19, quantum 3, blackout 2 | `proposals`, `recommended` (≥60 total), `evidence` |

The quiet readings are the point of DIAGNOSIS: they are what rule explanations
out. A CASEBOOK with no `mapping` is a CHOICE — type it as one.

## The four from Quantum's interaction document

The precedent the whole instrument catalogue extends: a control the player moves
and the instrument answers back.

| Format | The player | Asked at | Stops | Games | Heaviest | Block |
| --- | --- | --- | --- | --- | --- | --- |
| `SWEEP` | turns one control; the response is plotted only where they look | fixture | 25 | 19 | quantum 7, blackout 1, headwater 1 | `sweep:` |
| `PROBE` | takes readings station by station, names where the pattern breaks | fixture | 7 | 7 | quantum 1, headwater 1, sightline 1 | `probe:` |
| `HOLDOUT` | fits on one set, freezes it, is scored on data it never saw | fixture | 5 | 5 | quantum 1, headwater 1, seedbank 1 | `holdout:` |
| `TALLY` | accumulates shots into bins and decides when there is enough data | fixture | 1 | 1 | quantum 1 | `tally:` |

## Tier 1 — the twelve moves six interaction documents converged on

104 authored interactions across six unrelated subjects turned out to be 19
designs. These twelve carry four authored instances or more; each is a move a
scientist makes that no format above can express.

| Format | The player | Asked at | Stops | Games | Heaviest | Block |
| --- | --- | --- | --- | --- | --- | --- |
| `VERIFY` | predicts, acts, measures — and failing to measure is its own failure | fixture | 55 | 40 | ghostlight 6, hospital 3, sightline 3 | `verify:` |
| `VALUE` | spends a budget on evidence; graded on what would change the decision | person | 45 | 30 | projecty 4, contamcity 2, outbreak_riverton 2 | `value:` |
| `CONTROL` | changes one thing, holds the rest, confirms by reversal | fixture | 33 | 28 | sightline 3, projecty 2, hospital 2 | `control:` |
| `ATTEST` | verifies claims on a budget; the record is not the condition | person | 32 | 27 | aftershock 2, instruments 2, aftershock_ms 2 | `attest:` |
| `ALLOCATE` | spends a finite pool across claims, scalar or rate × time | fixture | 30 | 27 | outbreak_riverton 2, seedbank 2 | `allocate:` |
| `TRACE` | opens each channel's dependencies — agreement is not independence | fixture | 30 | 26 | bring_them_home 2, instruments 2, seedbank 2 | `trace:` |
| `BALANCE` | reads streams, decides which to count, closes the ledger | room | 26 | 19 | ghostlight 3, instruments 2, seedbank 2 | `balance:` |
| `CHAIN` | builds a transfer path in order and names the governing link | fixture | 24 | 22 | aftershock 2, seedbank_ms 2, hospital 1 | `chain:` |
| `TRIGGER` | writes each stage's threshold on a blank board, *then* the updates arrive | fixture | 19 | 19 | one stop in each of 19 campaigns | `trigger:` |
| `CLOUD` | narrows or shifts a distribution against a corridor | fixture | 18 | 18 | one stop in each of 18 campaigns | `cloud:` |
| `DEGENERACY` | slides two controls along a locus until other physics collapses it | room | 17 | 17 | one stop in each of 17 campaigns | `degeneracy:` |
| `TRIANGULATE` | switches constraints in, corrects a systematic, clicks the region | room | 2 | 2 | instruments 1, qd_tectonics 1 | `triangulate:` |

TRIANGULATE is tier 1 by design and tier 3 by reach: it picked up its first real
game instance in `qd_tectonics`.

## Tier 2 — built, thin on reach

Two or three authored instances each, and ROUTE with the demo plus three.

| Format | The player | Asked at | Stops | Games | Heaviest | Block |
| --- | --- | --- | --- | --- | --- | --- |
| `STRESS` | moves an assumption through its range and watches candidates go dark | person | 15 | 14 | deepwatch_hs 2, contamcity 1, deepwatch 1 | `stress:` |
| `DELEGATE` | takes one condition, hands the rest over with an owner and a threshold | person | 14 | 14 | one stop in each of 14 campaigns | `delegate:` |
| `RESIDUAL` | compares residual fields and refuses the lowest RMS | fixture | 6 | 6 | instruments 1, headwater 1, slackwater 1 | `residual:` |
| `PROPAGATE` | reads a live error budget and buys the measurement that moves it | room | 5 | 5 | instruments 1, headwater 1, icecore 1 | `propagate:` |
| `ROUTE` | learns a route lit, rebuilds it dark, recovers after a blocked door | fixture | 4 | 4 | deepwatch 1, instruments 1, deepwatch_ms 1 | `route:` |
| `FLY` | commits a pulse-and-brake plan on undamped dynamics, then watches it run | fixture | 3 | 3 | bring_them_home 1, instruments 1 | `fly:` |
| `INJECT` | pushes a known population through their own pipeline and counts what returns | fixture | 3 | 3 | planetary_defense 1, instruments 1, sightline 1 | `inject:` |

## The thirteenth — DERIVE

It did not come from the six interaction documents. It is the one move a
mathematics syllabus is about, and it is the only format with a standing rule
against conversion.

| Format | The player | Asked at | Stops | Games | Heaviest | Block |
| --- | --- | --- | --- | --- | --- | --- |
| `DERIVE` | builds the derivation a line at a time, picking the expression *and* naming what licenses each step | room | 71 | 8 | headwater 13, slackwater 12, overwind 12, darkfibre 12, midway 10, groundtruth 10 | `derive:` |

**Never convert a DERIVE stop out of Headwater, Slack Water, Midway, Ground
Truth or Overwind.** In those courses the derivations *are* the course. All the
games using DERIVE grade the line alone.

## Tier 3 — the fun-first formats

Same registry, same contract, same checks. What differs is that the move is the
*player's* rather than the scientist's, and one bit of subject matter is carried
at speed. `ARCADE.md` is the argument for them being in the same registry.

| Format | The player | Asked at | Stops | Games | Heaviest | Block |
| --- | --- | --- | --- | --- | --- | --- |
| `BELT` | sorts a binary category against a line that speeds up | fixture | 30 | 30 | one stop in each of 30 campaigns | `belt:` |
| `HOLD` | holds one quantity inside a closing band while loads push it out | fixture | 30 | 30 | one stop in each of 30 campaigns | `hold:` |
| `SPOT` | takes what the standing instruction wants — and it is replaced mid-run | fixture | 29 | 29 | one stop in each of 29 campaigns | `spot:` |
| `LOB` | sets angle and charge against a mark, launch speed withheld | fixture | 2 | 2 | instruments 1, midway 1 | `lob:` |
| `STACK` | answers a rail while a well fills; a wrong answer packs a row | fixture | **0** | 0 | **suspended** | `stack:` |

`STACK` is in `SUSPENDED_FORMATS` — reported broken in play. Its entry, panel and
traps stay (deleting a format is how the work of rebuilding it starts), but
`import-book.mjs` refuses any book authoring it. Lift the suspension by deleting
the one line in `normalize.js`.

## The seven world-graded runs — warm-ups, not stops

These are graded against the **place** rather than a board: they share `ctx.world`
and `worldFormats.js`. They reach a campaign through the book's `warmups:` block,
not as a mission stop, which is why their "stops" count is 1 — the `instruments`
demo book is the only place they are authored as a stop, one each, so that all 44
can be compared side by side.

| Format | The player | Block |
| --- | --- | --- |
| `TRIAL` | drives the theme's own world through gates, graded on the order rather than the clock | `trial:` |
| `GREET` | gets round a list of people before the hour is out | `greet:` |
| `FOLLOW` | stays inside a band behind somebody who will not wait | `follow:` |
| `HUNT` | finds enough of the same thing, and knows when to stop looking | `hunt:` |
| `CANVASS` | asks a yes-or-no question until the sample can answer it | `canvass:` |
| `EVADE` | holds a clear distance for a stretch of time, using the ground | `evade:` |
| `TAG` | closes a distance on somebody walking away, which a straight line cannot do | `tag:` |

**42 campaigns author all seven** (`TRIAL` twice on the 14 two-tier sites —
`trial-near` and `trial-far`). The schedule is engine, in
`engine/core/warmups.js`, and authored nowhere:

- **before day 1** — the single opener: `TRIAL` where there is far ground to
  learn, `GREET` where there is not
- **before day 4** — the far lap, *only* on a two-tier site; otherwise the first
  tail format
- **before days 8 and 13** — the next unused tail format
- **nowhere else**, and never before day 2. A campaign under `WARMUP_MIN_DAYS`
  (4 days) schedules none, which is why no Quick Discovery has one.

The book supplies the *story* (a title and a `why` per format) because a warm-up
with no story attached is a tutorial. The engine supplies the run, sized off the
campaign's own data — the tier's areas for a lap, the roster for a round, capped
so neither puts more than five places or people in front of a player.

---

## Rules that hold across every format

- **One type per lesson.** `lesson.game.type`, canonicalised on the way in. All
  2,331 lessons carry exactly one.
- **Placement follows `stopKind`.** Decisions go to a person, calculations to a
  room, anything the player *operates* to the equipment it operates. See
  `PLACEMENT_PASS.md`; the default for an unclassified format is `operated`.
- **The four panel rules** (`alamos-formats`): a panel that enforces the player's
  decision has removed it; a panel grading against a number prints the **goal**,
  never the target; a live instrument can be simulated twice; a greyed commit
  button must say what is missing.
- **`formatMix` caps any one format at a third of a campaign's *scheduled* stops** (`capFor(n) = max(1, round(n/3))`, and exactly at the cap is inside it) — a
  diagnostic on the way in, never a reason to convert a DERIVE.
- **The scene is the situation; the verdict is the teaching.** Scene 30–45 words
  of situation only, `why` 70–90 of mechanism, a rebuttal per wrong option, and
  `takeaway` never equals `why`.
- **Grading is by label**, so `choices` must contain `correctChoice` verbatim.
- **Every format carries a trap the importer refuses.** `npm run traps` breaks
  each one in turn and fails if the importer accepts any.

## Where to look next

| Want | Read |
| --- | --- |
| the canonical list, in code | `engine/content/normalize.js` — `FORMATS`, `DECISION_FORMATS`, `CALCULATION_FORMATS`, `SUSPENDED_FORMATS` |
| the registry and every panel | `engine/core/instruments.js` — `INSTRUMENTS`, `INSTRUMENT_BLOCK`, `isInstrument` |
| YAML for the base eight | `tools/BOOK_TEMPLATE.md` |
| a worked stop of all 44 | `books/instruments.yml` — the Meridian Verification Office, one stop per format |
| the design argument per instrument | `FORMATS.md` (tiers 1–2, and DERIVE), `ARCADE.md` (tier 3) |
| the card shape every stop is written to | `QUESTION_BRIEF.md` |

```sh
npm run traps                  # break every trap; the importer must refuse all of them
npm run drive instruments      # open every panel in Chrome, answer it right and wrong
npm run lessons                # two authored stops of every format, from two games, answerable
THEME=instruments npm run dev  # then /engine/dev/instruments.html
```

`npm run lessons` is the one to open to **judge** a format rather than test it:
the panel inside the card a player actually meets, asked by that game's person,
graded by the engine's own grading. It is also the only place all 44 can be
compared side by side, since most are authored in one game each.
