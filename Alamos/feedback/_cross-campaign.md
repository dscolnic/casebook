# Across the catalogue — patterns worth one sweep, not forty-two edits

*All 42 campaigns read, solved and reviewed · 2026-08-21 · findings that recur widely enough that fixing them campaign-by-campaign would be the wrong shape of work. The per-campaign PDFs carry everything specific to one game, and each one now opens with what was implemented.*

**Status: all 42 themes pass `npm run check`, and `npm run traps` fires 111 of 114 (four skipped for the suspended STACK).** Six new gates were written, each with a selftest, each validated by putting the defect back and watching only the right case fail.

## What was fixed during the review

Eight defects were repaired and verified rather than only reported, because each one meant a player doing the right thing was told they were wrong, or content the campaign paid for was not reaching a screen.

| # | Campaign | Defect | State |
| --- | --- | --- | --- |
| 1 | Blackout | Transformer stop keyed to "loss falls by 20×"; its own answerText says 400× and the rebuttal refutes the key | fixed, live, green |
| 2 | Blackout | RMS/peak stop keyed to "× 2"; verdict divides by √2. `blackout_fable` keys the same stop correctly | fixed, live, green |
| 3 | `blackout_ms` | Same RMS/peak stop, same mis-key; also "one and a half times" for a factor of 1.41 | fixed, live, green |
| 4 | Quantum | No-cloning keyed to a file-size distractor the first rebuttal names and refutes | fixed, live, green |
| 5 | Midway | Rotational inertia keyed to the centre-heavy wheel — I = Σmr², so the answer is the rim-heavy one | fixed, live, green |
| 6 | Wellmere | Marker-assisted selection keyed to "challenge every generation"; answerText says use the marker early | fixed, live, green |
| 7 | `seedbank_ms` | Junior edition of the same stop, same mis-key | fixed, live, green |
| 8 | `outbreak_riverton_ms` | A stop missing its list `- `, silently merging two stops and deleting one from the shipped game | fixed, live, green |

Plus three guide/board mismatches (Contamcity and its AP edition claiming "five numbers" on a six-tile board; the recovered Outbreak stop wearing the next stop's guide).

**All 42 themes pass `npm run check`.**

### The mis-keyed answers were invisible to every gate

`validateContent` asserts the key appears verbatim among the choices — all seven did. `probeQuestions` asks whether a question is answerable without the science; a mis-keyed question is answerable, just not correctly. `answerShape` measures option length. Nothing compared the key against the stop's own verdict.

`engine/dev/answerKey.mjs` now does, and is registered in `npm run check` with a six-case selftest. **It is deliberately narrow.** Three broader detectors were written first and all three lied: scoring word overlap between options and `answerText` + `why` flags 104 stops, nearly all correctly keyed, because the `why` discusses the distractors *by design*; ordered rebuttal-to-option alignment flags eight, three of them correct. The rule that survives fires only when `answerText` quotes six or more consecutive words from a non-keyed option and none from the key. That caught one of the seven with zero false positives across all 41 books.

One in seven is poor recall, and it is the right trade — a wall of false failures is how a gate stops being read. **The other six were found by reading and solving, which remains the only complete method.** All 537 plain-choice stops in the catalogue have now been read and solved; the seven above were the only mis-keys.

## The five defects that mattered most, and what they have in common

Everything below was live in the shipped game, passed every existing gate, and is fixed.

**1. `askRule: true` was validated four ways and never emitted.** `import-book.mjs` refused a
rules list shorter than three, refused a list without the flag, refused a candidate claiming a
rule not in the list, and refused a step with no rule on any candidate — and then returned a
derive object with no `askRule` in it. So Slack Water, Overwind and Dark Fibre authored the flag
on twelve stops each and Ground Truth on eleven, and **the rule half of all 177 derivation steps
was inert.** `bookParity` cannot see a dropped flag, because the content is byte-identical either
way — the same blind spot `export-book.mjs` had with `takesAsRead`. `fieldCoverage` reads `ch.x`,
one level above `ch.derive.askRule`. The importer emits it now and `engine/dev/deriveRules.mjs`
asserts it on the content.

**2. An estimate board that graded a different question.** Deep Watch's day 5 asks "about how
much gauge pressure is the sea applying at 90 metres?", states p = ρgh, gives a density and a g —
and put a **bilge-flooding board** in front of the player: 8 cm of rise a minute, 11 gallons a
centimetre, a 55 gpm pump, `template: {0} × {1} + {2}`, `target: 143`, **`units: gallons per
minute`**. The solution then computes 9.05 × 10⁵ Pa. Carried into the AP edition too, because the
board was copied. `validateContent`'s formula check passes it, because target *does* equal
formula(values[correct]) — both halves are internally consistent and about different things.
Rebuilt, and gated by `engine/dev/boardAnswer.mjs`.

**3. A STRESS panel showing no numbers.** Bring Them Home keyed its three criteria
`life_support`, `entry_margin` and `propellant_margin` against scores keyed `returnHours`,
`entryMarginDeg` and `propellantMarginKg`. `instruments.js` renders the table as
`scores[candidate][criterion.key]`, so **every cell in every column was an em dash**. Fixed, with
an importer refusal and a trap behind it.

**4. A campaign that ended on the scaffold's instructions to the author.** `carrying` closed
fifteen days on *"Say how it came out, in the same voice: what held, what it cost, and what the
next crew inherits"* and *"you held the corridor, you brought them up"* — the second of which is
Blackout's fiction. And `checkStory` **passed it for the worst possible reason**: its rule is
"the last paragraph is addressed to the player and says what they did", and the placeholder
*quotes an example of exactly that*. Written properly; no shipped card may now share ten words
with `themes/_template/theme.js`.

**5. The youngest audience was the only one the audience gate could not fail.** `questionLoad`'s
four numbers apply at grade 8 and below, and it decided whether to *fail* on
`!!editionBase(name)` — whether the theme is a derived edition. Across all 42 themes **Hospital
Heroes was the only theme it reported at all and the only one it could not fail**: 110 findings,
advisory for ever, at grade 2. It fails on the reader's age now, with
`questionload-debt.json` holding those 110 rows. Fifty-one of them are one decision, and it is a
decision for a person: a four-card SEQUENCE graded as one exact permutation with no feedback is a
one-in-twenty-four guess for a seven-year-old.

## Two findings of mine that were wrong

Recorded because the reasoning that produced them is the reasoning this catalogue's own house
rule warns about.

- **44 derivation steps reported as "a click with one possible value."** They are not. The panel
  offers the chain's **whole** `rules` list — "the full list for the course rather than the two
  that are plausible here", as its own docstring says — so a step whose candidates share a rule
  is still answerable, and what it loses is the *coupling* between the two halves. The first
  version of `deriveRules.mjs` failed all 44 on the strength of a sentence in CLAUDE.md, without
  reading the renderer. Worse: those 44 false failures would have sat directly on top of defect 1
  above, which is that none of the 177 was being asked at all. **A count is not a finding until
  the renderer is read.**
- **Four SCIENCETANK stops reported as having "no evidence."** From a grep for an `evidence:`
  book key. There is no such key: `rules` is the authorable scoring rule and **the evidence moves
  up into `guide`**, which is where all twenty tank stops carry it, several of them very well.
  Four findings withdrawn in the Red Sand, Slack Water, Overwind and Dark Fibre reviews.

## The six new gates

| Gate | Rule | Found |
| --- | --- | --- |
| `boardAnswer.mjs` | An estimate board's solution must work with the tiles the panel grades, or state the target | 2 of 307 boards, both real |
| `deriveRules.mjs` | A `rules` list must carry `askRule`; every asked step must be answerable | 4 campaigns, 177 inert questions |
| `numeralWords.mjs` | No digit stands in for the pronoun "one", and no title carries a bare "1 " | 106 occurrences, 10 titles |
| `sceneCast.mjs` | Somebody is in the room where the question is asked | 8 campaigns under one in ten |
| `checkStory` (extended) | No shipped card shares ten words with the scaffold; the opening card names somebody from the roster | 1 placeholder ending, 17 nameless openings |
| `questionLoad` (retargeted) | Fails on the reader's age rather than on the file's provenance | 110 rows at grade 2 |

Each has a selftest whose load-bearing cases are the ones that must **pass**: a solution showing
a later stage of its own working; a step whose candidates share a rule; "Day 1 had 96 events" and
"a 3 : 1 fit"; a scene whose subject is an instrument; a hand-written ending that happens to use
the word "you". Every gate was validated by reintroducing the defect and confirming that only the
right case failed.

## What was fixed campaign by campaign

Beyond the five above and the eight answer-key defects: Red Sand's equilibrium constant made
self-consistent across three stops and its storm ALLOCATE given a real decision; Midway's ship
drive reconciled across two stops and its ending, its drop-test acceptance band tightened past
the answer it existed to rule out, **a new stop computing ΣF = ma that cleared five inversions
from `equation-debt.json` at once**, and its margin CHOICE converted so `safety factor = capacity
÷ demand` is computed — Midway is 12 of 12 with no curriculum debt; Wellmere's DEGENERACY
observation corrected from 11 to the 16 its own marker distance predicts; Ice Core's two
layer-thickness figures reconciled by making the discrepancy the lesson; Changeover's ALLOCATE
answer rewired to what it grades; Project Y given the cost paragraph its ending was missing;
Ground Truth's two duplicated-role introductions; Midway's EVADE card, which called Delia Marsh
"he"; `dayNoun` on fifteen themes; the HUNT item name on three; and the instruments book's header
and opening card, which described a twelve-format book over four days while holding thirty-three
over eleven.

**One finding is recorded rather than fixed, deliberately.** Eight campaigns name somebody in
every one of their fifteen day stakes and in almost none of their forty-eight stop scenes —
ContamCity and Project Y at 0% and 1%, Bring Them Home and Planetary Defense at 0%, against a
corpus median near 70% and Yellow Bay at 45 of 45. That is 296 sentences of real writing, and a
name pasted mechanically onto forty-eight scenes is worse than none. It is measured by
`sceneCast.mjs` and recorded in `scenecast-debt.json`, which only shrinks.

## Patterns that want one sweep

### 1. Numeral normalisation has damaged prose in at least six campaigns

> **Done.** 106 occurrences across 27 books and ten damaged titles, fixed and gated by `engine/dev/numeralWords.mjs`. The class the gate deliberately does not touch — a count, a unit, an ordinal label, a ratio, mathematics — was read and left alone.

Some pass has replaced spelled-out words with digits in places where the digit is not a count, producing sentences that read as transcription errors. This is the most visible quality problem in the catalogue because it lands in **stakes** — the first paragraph a player reads each day.

Worst instances found:

- `planetary_defense`, final stake: "The next **1** is up there now, unfound, and the survey line that caught this **1** expires in 11 months." This is the last sentence before the ending card.
- `aftershock`, day 2: "an audience that has heard **2** numbers and a rumour about a bigger **1** coming."
- `bring_them_home`, day 15: "**A hundred and 18** hours in."
- `outbreak_riverton`, day 9: "Dr. Arjun Singh, the **1** Health lead" — and day 14 "Day 121 districts are on visibly different paths and the council wants **1** policy… 90 of the region's **hundred and 20** critical-care beds."
- `blackout`, day 7: "the lower-impedance circuit carries twice the current of the older **1**."
- `planetary_defense`, day 9: "**1** has it reaching the ground, **1** has it coming apart 30 kilometres up, **1** is between."

The rule to apply: a digit is right where it is a *measurement or a count the reader will compare*; it is wrong where it replaced a word doing grammatical work (*one*, *One Health*, *one hundred and eighteen*). Books stay free to spell numbers as they like — `readability.js` already normalises both forms — so this is purely editorial, and it is a single pass with a word list rather than 41 separate jobs.

### 2. The Background door has trained players not to open it

Every campaign repeats the same three format essays verbatim on every stop of that format — "Why the order is graded whole", "Why this is a matching board and not four separate questions", "Why the wrong options are the interesting ones", "Why an estimate rather than a calculation". Across the catalogue that is roughly 1,900 repetitions of about a dozen paragraphs.

The cost is specific and measurable in play: these essays are *first* in the `background` list, so the stop-specific paragraphs — which are often the best writing in the game — sit third or fourth behind text the player has already read fifteen times. By day 3 the door stops being worth pressing, and the paragraphs it stops delivering include:

- Blackout's explanation of how a current transformer reads a live conductor without touching it
- Aftershock's "why the tanks matter" (two full water tanks in an unvisited room above ninety patients)
- Planetary Defense's "why total detections is the wrong score"
- Bring Them Home's "twelve decibels is about one sixteenth of the power arriving"
- Deep Watch's "why one machine at a time" — a rule about the boat as well as the measurement

Recommended: keep each format essay on the **first** stop that uses that format in a campaign and drop it elsewhere, leaving the stop-specific paragraphs plus the equation and glossary lines. This is mechanical (the essays are byte-identical) and it would remove roughly 1,850 paragraphs while losing nothing a player has not already read.

### 3. Two questions on one card

Several stops carry a complete second question grafted on: a BALLPARK estimate block *plus* a four-option `choices`/`answer`/`rebuttals` set. Either the player meets two questions on one card, or the renderer ignores one and several authored rebuttals reach no screen.

Confirmed instances: `outbreak_riverton` "Read the downstream acid–base signal" (pH estimate + a "what do you measure next" CHOICE); `planetary_defense` "The speed it actually arrives at" (energy estimate + a CHOICE whose key states the estimate's conclusion); `deep_watch` "What silence buys, term by term" (sonar budget + stray PROTOCOL keys — `columns`, `scenarios`, `choices`, `mapping`).

Mechanically detectable: `choices:` co-occurring with `estimate:` on one stop. Worth an importer refusal rather than a report, since there is no legitimate case for it.

### 4. Dead keys on instrument blocks

Keys the engine never reads, sitting in books as though they were doing something:

- `bring_them_home` CONTROL: `reversalRequired`, `acceptResponseDb` (the panel hardcodes reversal and compares against `noise`)
- `outbreak_riverton` CONTROL: `variables[].result`, `deltaFromBaseline`, and a whole parallel `states` table alongside the `baseline`/`response`/`noise`/`truth` the panel actually uses
- `aftershock` day 6: an empty `takesAsRead:` with no value

This is the family CLAUDE.md records twice already ("a `need()` that refuses an unknown key is cheap; a key silently dropped is a sentence nobody will ever read"). One sweep across all CONTROL blocks, then either wire the keys in or refuse them.

### 5. Day-number collisions between the plan card and the stakes

> **Done.** `dayNoun` added to fifteen themes; `checkStory` reports none.

Four campaigns write stakes on a real calendar while the plan card prints `Day {mission index}`:

- **Contamcity** — stakes run Day 1 → Day 52 against a header counting 1–15. From mission 5 the player reads "Day 5 —" directly above a stake beginning "Day 6", for eleven consecutive missions.
- **Deep Watch** — "Fifth day" under a header reading "Day 4", from mission 4 on.
- **Blackout** and **Aftershock** use weekday names, so they collide only in feel, not in number.

Three campaigns already solve this cleanly and should be the model: **Outbreak** (`dayNoun: 'Stage'`), **Planetary Defense** (`'Phase'`), **Bring Them Home** (`'Shift'`). Each prints a unit that cannot be confused with the calendar the stakes use, and in Planetary Defense's case the widening interval between stakes — eleven days to eight years — does real narrative work.

### 6. Two campaigns share a closing triple

`aftershock` and `blackout` (and both junior editions and `blackout_fable`) end on the same three stop titles with the same arguments: an ATTEST called "Measured, inferred, assumed", a CHOICE called "The number that has to be a range", and a closer called "What outlives the emergency". The "Three things at once" mission and its DELEGATE stop "Which of the three cannot wait" are also shared, and that DELEGATE title appears in eight books.

The *shape* is good and worth keeping — a campaign should end by grading its own claims. What makes the repetition visible is the identical titles and framing. Retitling and re-angling one of the two costs nothing and removes the only place in the catalogue where two games feel like the same game.

## What is strong across the set, and should not be touched

Worth recording because a review that only lists defects misrepresents the work.

- **The opening cards.** All eleven read so far hit the four beats without mechanics, and several are better than that: Deep Watch's "Somebody has to be willing to call it", Planetary Defense's "a deflection mission that would have to launch years before anyone could be certain it is needed", Blackout's naming of both leads and their disagreement.
- **The closing cards.** Every campaign's last paragraph is addressed to the player and specific to calls they actually made. Blackout's middle paragraph — what it cost, what is unfinished, and the practice that is "a paragraph in a report until somebody on nights makes it a habit" — is the best prose in the repo.
- **Estimate boards.** Every target in all 41 books reproduces from its own formula and correct-tile set; the only structural failure is one STRESS block's key mismatch. Distractor tiles are consistently the same quantity in the wrong currency — 273 K beside 300 K, hours beside seconds, water's density beside steel's — which is the right trap at every level.
- **Long-form causal spines.** Four campaigns carry an argument across the whole fortnight: Blackout's unchecked sensor, Aftershock's mis-sited reference station, Deep Watch's quiet lineup, Bring Them Home's shared reference and shared clock. Nothing else in educational-game content I have read does this.
- **Stops that state their own limits.** "Two pulls are not a factor of safety." "One number is not a spectrum." "A core does not reach the column." "This is a rate, not a schedule." That habit is the catalogue's real curriculum.

## Suggested order of work

1. **The numeral pass** (§1) — highest visible quality return per hour, and it lands on the first paragraph of every day.
2. **The background de-duplication** (§2) — mechanical, and it makes the best writing in the games reachable again.
3. **`choices:` beside `estimate:`** (§3) — an importer refusal, then fix the three confirmed stops.
4. **`dayNoun` on Contamcity and Deep Watch** (§5) — two manifest lines, or eleven sentence-openers.
5. **Dead instrument keys** (§4) and **the shared closing triple** (§6) — housekeeping, no urgency.

The per-campaign findings — chemistry premises, contradicted numbers, panels that render blank — are in the individual PDFs and are mostly one-stop repairs that do not batch.
