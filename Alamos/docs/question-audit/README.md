# Question audit — all seven games

One document per game, holding **every mission question with its correct answer written out**, followed by a graded assessment of each question on three axes. Generated from the shipped content (`CURRICULUM` + `MISSIONS` + `BALLPARK_CALCS` + the diagnosis packs, run through `engine/content/normalize.js` exactly as the engine does at load), then read and graded by hand.

**This is the third pass.** The first audit found a set of defects; the second fixed them and regraded; the third went back through every row scoring 1 or 2 and rewrote the ones that were genuinely weak. **No question now scores below 3 for educational value.** What changed is listed under [What was fixed](#what-was-fixed), including two findings from the first pass that turned out to be wrong.

## Scores

| Game | Document | Stops | Solvability | Educational value | Curriculum fit |
| --- | --- | :-: | :-: | :-: | :-: |
| The Contaminated City | [contamcity-questions.md](contamcity-questions.md) | 45 | 4.3 | 4.0 | 4.1 |
| Deep Watch | [deepwatch-questions.md](deepwatch-questions.md) | 45 | 4.5 | 3.7 | 2.4 |
| Outbreak: Riverton | [outbreak_riverton-questions.md](outbreak_riverton-questions.md) | 45 | 4.4 | **4.4** | **4.4** |
| Bring Them Home | [bring_them_home-questions.md](bring_them_home-questions.md) | 45 | 4.3 | 4.3 | 3.8 |
| Planetary Defense | [planetary_defense-questions.md](planetary_defense-questions.md) | 45 | 4.3 | **4.4** | 4.0 |
| Project Y | [projecty-questions.md](projecty-questions.md) | **49** | **4.5** | 4.1 | 3.4 |
| Hospital Heroes | [hospital-questions.md](hospital-questions.md) | 45 | 4.5 | 3.7 | 4.1 |
| **All** | | **319** | **4.4** | **4.1** | **3.8** |

### What moved

First audit → after the fixes → after the pass over every 1 and 2.

| Game | Solvability | Educational value | Curriculum fit |
| --- | :-: | :-: | :-: |
| The Contaminated City | 4.2 → 4.3 → **4.3** | 3.4 → 3.8 → **4.0** | 3.4 → 4.0 → **4.1** |
| Deep Watch | 4.3 → 4.4 → **4.5** | 3.4 → 3.5 → **3.7** | 2.3 → 2.3 → **2.4** |
| Outbreak: Riverton | 4.2 → 4.4 → **4.4** | 4.0 → 4.3 → **4.4** | 4.2 → 4.4 → **4.4** |
| Bring Them Home | 4.2 → 4.3 → **4.3** | 3.8 → 4.2 → **4.3** | 3.6 → 3.8 → **3.8** |
| Planetary Defense | 4.1 → 4.2 → **4.3** | 4.2 → 4.4 → **4.4** | 3.9 → 4.0 → **4.0** |
| Project Y | 4.2 → 4.5 → **4.5** | 4.0 → 4.0 → **4.1** | 3.4 → 3.4 → **3.4** |
| Hospital Heroes | 4.8 → 4.5 → **4.5** | 3.3 → 3.5 → **3.7** | 4.0 → 4.0 → **4.1** |

Hospital Heroes is the only game whose solvability fell, deliberately: its wrong answers used to be impossible rather than tempting.

### The pass over every 1 and 2

Sixty-eight rows carried a 1 or a 2 on some axis. **None was a 1 or 2 for solvability** — nothing was broken. Twenty-six scored 2 for educational value, and those were the real targets: orderings whose sequence was a convention to memorise, matchings whose answers were readable off the card text, and two estimates that were bare arithmetic. All twenty-six were rewritten to turn on something the subject constrains, and **no question now scores below 3 for educational value.**

The remaining forty-two carried a low curriculum fit only, and most of them were left alone on purpose. Deep Watch M6.2 and M12.1 score 5 and 4 for educational value inside a game whose subject — reasoning under instrument uncertainty — is not a course. Fifty-five rows still score 2 or below for fit, forty of them in Deep Watch and the hospital's safety procedures. Forcing a syllabus topic into a damage-control locker or a handwashing routine would have made both games worse.

### By format

| Format | n | Solvability | Educational value | Curriculum fit |
| --- | :-: | :-: | :-: | :-: |
| DIAGNOSIS | 41 | 4.7 | 4.8 | 4.0 |
| BALLPARK | 63 | 4.7 | 4.3 | 4.4 |
| SEQUENCE | 70 | 4.4 | 3.8 | 3.6 |
| PROTOCOL | 48 | 4.4 | 4.0 | 3.6 |
| TRIAGE | 5 | 4.2 | 3.6 | 2.8 |
| CHOICE | 92 | 4.1 | 4.0 | 3.5 |

**SCIENCETANK no longer appears: all 61 reachable funding rounds are now decisions.** In the first pass that format averaged 3.9 / 3.3 / 2.8 and occupied 19% of every campaign. As CHOICE questions the same 61 stops average **4.1 / 4.1 / 3.4** — a full point of educational value and half a point of curriculum fit, from asking "what should we do?" instead of "how would you spread a hundred credits?".

BALLPARK is the other big mover: 4.3 / 4.0 / 4.4 to **4.7 / 4.3 / 4.4**, because 29 estimate items had no decoy tiles at all and now do.

SEQUENCE gained the most in the last pass — 3.4 to **3.8** for educational value — because fifteen of the orderings had no forced order at all, and now state what each step leaves the next one to work with.

## The rubric

Each question scored 1–5 on three axes. The same rubric was applied to all seven games; **Fit is judged against the audience each game declares**, so Hospital Heroes is measured against NGSS 3–5 and grade-3/4 mathematics, not against a college syllabus.

**Solvability** — can a prepared student reach the keyed answer from the scene and panel alone, by reasoning rather than by eliminating an absurdity or recalling something never shown?

| | |
| :-: | --- |
| 5 | Fully determined by what is on screen; every distractor is individually killed by a stated fact. |
| 4 | Determined, with one soft spot — a giveaway distractor, or a rival a strong student could defend. |
| 3 | Answerable but with a real crack: genuine ambiguity, an undefined term, or an ordering that is convention rather than dependency. |
| 2 | Under-determined, or the keyed answer does not match the question asked. |
| 1 | Broken as shipped — unanswerable or ungradable. |

**Educational value** — does getting it right require and build transferable subject knowledge?

| | |
| :-: | --- |
| 5 | A real concept, applied to a situation that is not the one it was stated in. |
| 4 | A solid concept, lightly applied. |
| 3 | Thin — one definition, or arithmetic with the concept supplied. |
| 2 | Mostly generic process wisdom; little subject content. |
| 1 | Restates the scene. |

**Curriculum fit** — does it map onto a named topic in a standard course for the stated audience?

| | |
| :-: | --- |
| 5 | Squarely a named syllabus topic. |
| 4 | An applied or adjacent version of one. |
| 3 | A methods, lab, or measurement topic — taught, but usually not examined. |
| 2 | Generic research or project management. |
| 1 | Not curriculum content. |

## What was fixed

### 1. All 61 funding rounds are now decisions

Every reachable SCIENCETANK stop was rewritten as a "what should we do" question: one decision, four candidate actions, one keyed answer, a `why` grounded in the scene's own evidence, and a rebuttal for each rival that concedes what is right about it. The rebuttals matter — four of the games had none at all, so a player who picked wrong was told the right answer and nothing about their own reasoning.

The conversions were written where each game's content lives: in `gamekit/books/*.yml` for the four book-based themes (re-imported with `tools/import-book.mjs`), and directly in the generated `curriculum.js` for The Contaminated City, Project Y and the hospital.

Scene text that instructed the player to "spend the hundred credits" was rewritten with it — eighteen scene endings in The Contaminated City alone.

### 2. 29 estimate items had no decoy tiles

The estimate panel asks the player to pick number tiles and drop them into a template. When every tile offered belongs in the answer, the item stops being "which quantities enter this relationship?" and becomes "arrange these three things".

| Game | Estimate specs | Zero-decoy before | Zero-decoy now |
| --- | :-: | :-: | :-: |
| Bring Them Home | 12 | 12 | 0 |
| Planetary Defense | 9 | 9 | 0 |
| Outbreak: Riverton | 6 | 5 | 0 |
| Deep Watch | 7 | 1 | 0 |
| others | 51 | 0 | 0 |

Four items went further and had the taught step pre-computed into a tile — a degree-to-radian conversion, a `sin 90° = 1`, a transferred momentum, a pair of true/false positive counts. All four now supply the inputs and make the student do the step.

Every one of the 85 specs across all seven games is now checked to evaluate to its own target within tolerance, and to carry an `explanation` for the verdict card. That check caught **Deep Watch M4.2, whose template referenced a slot the player could not fill and which returned NaN for every submission.**

### 3. 66 stops had no `why` text

Outbreak (19), Bring Them Home (24) and Planetary Defense (23) shipped with an empty "Why:" line on every funding round and most estimates — roughly 40% of those games' verdict cards explained nothing. All 319 stops now carry one.

### 4. A zero-weight proposal was fundable for free

`bindTank()` counted a proposal as unsupported only when it had no entry at all in `recommended`, so a decoy listed at `0` was "supported at zero" and cost nothing. A player could fund "erase records to avoid future criticism" or "identify the chemicals by smell" and still pass. Planetary Defense did this in eleven of its fourteen rounds.

Moot for the shipped content now that the format is gone, and fixed in `engine/core/questionUI.js` anyway so a book written later cannot reintroduce it.

### 5. Diagnosis panels were colouring key readings as alarms

`applyPack` set a reading's status from the pack's `salient` list — the readings the puzzle turns on. That is not a severity, and it is frequently the reassuring readings that are decisive: *"counts with the detector high voltage off: 0"* is what clears the electronics, and it was arriving in alarm red. There is now a fifth status, **key reading**, in blue; and the panel hint no longer offers a key reading as though it were incidental.

### 6. Individual bad questions

- **The Contaminated City M2.2** offered the identical string *"Ideal volume tends to increase."* as two of its four choices, which a match-each-choice-once panel cannot express. The two situations are now Charles's law and Boyle's law, stated separately.
- **The Contaminated City M14.1** asked *"Is this an unambiguous pass?"* and computed `9.0 + 2.0`. It now asks for the top of the plausible range; the pass/fail judgement is in the verdict.
- **Deep Watch M5.2** asked *"is the pump winning, and by how much?"* and computed only the inflow. It now computes what the scene's explanation always claimed: the sea is putting in the rise *plus* what the pump is already removing.
- **Deep Watch M8.3** asked what slowing buys and computed the time at present speed.
- **Deep Watch M9.3** needed a rotordynamics fact — that imbalance acts once per revolution and misalignment twice — which the scene never supplied. It does now.
- **Project Y M3.2**'s verdict read *"8500/10000=0.85"* beside a keyed answer of 80%.
- **Project Y M12.1** asked for a number and a verdict and graded the number.
- **Project Y M15.4** was an allocation in which every option was recommended, so no answer was wrong. It is now a choice among positions people at Los Alamos actually took.
- **Hospital M4.2 and M6.1** offered one specific answer against three *system* names, so both were solvable by category mismatch alone.
- **Hospital M10.2** taught one order in its scene and rewarded another in its key.
- **Hospital: seven stops typed PROTOCOL** were step orderings whose four choices were the literal strings "Step 1" to "Step 4". Retyped to SEQUENCE (19 lessons once review variants are counted).
- **Hospital: 22 option sets** were rebuilt because the wrong answers were impossible rather than tempting.

### Two findings from the first pass that were wrong

Both were errors in the audit, not in the games, and both are corrected in the per-game tables:

- **Project Y M11.3 and M13.3 were reported as ungradable.** They are not. `applyPack` splits a pack's `"A + B"` answer into `correctChoices` at load, and `themes/projecty/theme.js` does supply the packs. The original check ran against raw content without normalisation. Both rows are restored, and both are among the better questions in that game.
- **"No estimate target carries a unit" was wrong.** The field is `units`, not `unit`; every one of the 85 specs has always had it and the panel has always rendered it.

## Known and not fixed

- **Project Y's curriculum holds 150 lessons and its campaign reaches 49.** The other 101 are not `— Review` variants — unlike the hospital's 105, which are reachable as callbacks — they are simply unreferenced, and nineteen of them are funding rounds. Rewriting content no player can reach was not worth the authoring. Whether to wire it in or delete it is a campaign decision.
- **187 stops still have no `rebuttals` array.** These are the PROTOCOL, SEQUENCE, BALLPARK and DIAGNOSIS stops, where the verdict already shows format-specific detail — the full mapping, the ordered list, the tiles with the worked solution and explanation, the candidate mechanisms — so the card is not empty. Rebuttals would still improve them.
- **The last third of every college game leaves its subject** for readiness process, risk communication and stewardship. It is a defensible capstone and it is why four of the five college games lose a point of curriculum fit after Mission 12.
- **A question's text can still contradict what its panel computes.** Four of the defects above were that shape, and no automated check catches them without reading both. The rest of the class is now covered — see below.

### The checks now cover this

`engine/dev/validateContent.mjs` gained the checks that would have caught most of the above, so `npm run check` fails on them rather than a person noticing months later:

- an estimate's formula is **evaluated** with its own correct tiles and compared against its own target and tolerance — this is what a one-off script used to find Deep Watch M4.2's NaN;
- an estimate must offer at least one distractor tile, and must carry `units`;
- no two choices in a set may be the same string;
- a CHOICE or TRIAGE answer must be one of its own choices;
- a missing `explanation` or `why` is reported as a note.

While adding them, **two of that file's existing checks turned out to be dead.** The sequence-ordering check and the estimate-spec check compared `g.type` against `"Sequence"` and `"Ballpark"` as the books spell them, and `normalizeContent` canonicalises those to `SEQUENCE` and `BALLPARK` before the checker sees them. Neither branch had fired since normalisation moved into `theme.js`. That is house rule 12 — *compare a challenge format through `kindOf()`, never as a raw string* — broken inside the tool written to enforce it.

### Not a bug

`mapping` and `order` are the identity permutation in almost every lesson. `questionUI.js` shuffles both the protocol choices and the sequence card bank with `shuffleSeeded` before display, so the data ordering is not a giveaway. Nobody should "fix" it.

## Regenerating

The question bodies are generated; the grading sections below them are hand-written and will be lost if the generator is re-run. The extractor reads each theme's `curriculum.js` / `missions.js` / `ballpark-specs.js` / diagnosis packs through `engine/content/normalize.js`, so it stays correct as long as those exports do.

For the four book-based themes, **the book is the source of truth** — edit `gamekit/books/<name>.yml` and re-import. For The Contaminated City, Project Y and Hospital Heroes there is no book, and `curriculum.js` was edited directly.
