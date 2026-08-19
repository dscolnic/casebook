# Blackout, re-authored — the brief

You are rewriting the **content** of one campaign: `blackout_fable`, a parallel
edition of Blackout (Calder Switching Station, AP-level electrical engineering,
grade 12). The place is not yours. The cast is not yours. The course is.

The point of the exercise is a second authoring of the same syllabus that is
better than the first: the concepts actually taught, every question answerable
from what the card gives you, hard ideas explained plainly, and a mix of
question types that is fun to play rather than twelve multiple-choice stops in
a row.

## What you may write

**One file: `gamekit/books/blackout-fable.yml`.** Everything under
`gamekit/themes/blackout_fable/content/` is generated from it by the importer —
never hand-edit it, it will be overwritten and `bookParity` will fail you.

Do **not** touch: `themes/blackout/**` (the base game), `books/blackout.yml`,
`books/blackout-ms.yml`, `engine/**`, `tools/**`, any other theme. The place —
`site.js`, `props.js`, `interiors.js`, `outfits.js` — belongs to the base theme
and is imported across; `engine/dev/editionParity.mjs` fails the game if this
directory grows any file of its own, or if the cast, the areas or the world
drift from `blackout`.

Sections of the book you may rewrite freely: `missions` (days, stops, scenes,
questions, formats, verdicts, guides, backgrounds). Sections you must leave
alone: `theme`, `groups`, `roster`, `places` — the id, the six areas, the twelve
people and their bios are the base game's.

## Read these first, in order

| File | Why |
| --- | --- |
| `gamekit/tools/BOOK_TEMPLATE.md` | the book format, with a worked example of every question format |
| `gamekit/QUESTION_BRIEF.md` | the card shape. §7a is the guide rule, §5 is "authored numbers must be possible" |
| `gamekit/FORMATS.md` | all 35 formats and what move each one asks the player to make |
| `gamekit/STORY_SPEC.md` | the campaign has an argument, and both sides must win a day |
| `gamekit/NEW_GAME.md` | the writing bar and the question bar |
| `books/convert/blackout_fable-addendum.md` | **this game's** cast, areas, syllabus and equations, generated |
| `CLAUDE.md` | §"Diversity is not the measurement; delivery is", §instrument goals vs targets, §"the scene is the situation, the verdict is the teaching" |

## The course you are matching

`tools/syllabus.js` — `SYLLABUS.blackout` (32 concepts) and
`EQUATIONS.blackout` (11 equations) — is the curriculum. `blackout_fable`
aliases both by reference, deliberately: the sandbox must not be able to rewrite
the ruler it is measured against.

Where the current campaign stands (baseline, all checks green):

```
45 stops over 15 days · 6 areas · 12 people
equations computed by a question   9/11   (2 recorded gaps, see below)
concepts touched                  31/32   select-only 2, construct 21, operate 8
stops by move                     select 17 · construct 26 · operate 2
format mix   CHOICE 12 (27%)  BALLPARK 10 (22%)  PROTOCOL 6 (13%)  CASEBOOK 3
             VALUE 2  SEQUENCE 2  SCIENCETANK 2  and one each of DEGENERACY,
             CHAIN, DELEGATE, TRIGGER, SWEEP, TRACE, CONTROL, ATTEST
card load    median 4 blocks · heaviest TRANS/1 at 198 words in 6 blocks
```

Two known gaps, recorded in `engine/dev/curriculum-debt.json` under
`blackout_fable`: `N₁/N₂ = V₁/V₂` and `ΔV ≈ I(R cos φ + X sin φ)` are mentioned
by stops and computed by none. **Fixing them is in scope** — write a question
that computes each, then delete its line from the debt file. The file may only
shrink; a gap that is not listed fails immediately, and a listed gap that has
been fixed also fails until the line goes.

Two mechanism concepts the player only ever picks from a list, which is the
diversification work list: `Earthing, step-and-touch potential and safety`
(stop 21) and `Cascading failure and the sequence of events` (stop 6).

## The invariant that makes this safe

A snapshot of the delivered course was taken before you started:
`books/convert/blackout-fable-before.json`. After every import, run:

```sh
node engine/dev/curriculumDelivery.mjs blackout_fable --against books/convert/blackout-fable-before.json
```

A dropped concept, a dropped `assumes`, a changed takeaway or an equation the
campaign no longer computes **fails**. A changed **format** is reported and
allowed. The rule in one line: *the objective is fixed, the format is the
variable.* You are expected to improve on the baseline — computing an equation
it only mentioned, reaching a concept it only selected from — never to lose one.

## The loop

```sh
cd gamekit
node tools/import-book.mjs books/blackout-fable.yml blackout_fable --verify
npm run check blackout_fable          # 20 checks; all must pass
node engine/dev/cardLoad.mjs blackout_fable
node engine/dev/curriculumDelivery.mjs blackout_fable --against books/convert/blackout-fable-before.json
npm run traps                         # all instrument traps must still fire
npm run drive blackout_fable          # every live panel driven right and wrong
```

`npm run check` is the gate. It includes `probeQuestions` (no question
answerable without the science), `answerShape` (the longest option is not the
key), `equationOrder` (nothing asked before the equation it is built out of),
`checkVoice`, `checkPassages`, `placeStory`, `instrumentGoals`, `fieldCoverage`
and `bookParity`.

## The bar

**Answerable.** Every number the question needs is on the card or on the panel.
A stop that requires a figure the player was never given is the defect this
whole exercise is about. `QUESTION_BRIEF.md` §5: authored numbers must be
physically possible, and the arithmetic must actually come out.

**The scene is the situation; the verdict is the teaching.** Scene 30–45 words,
what has happened and to whom, defining any word the question needs — never the
mechanism, never the answer. `why` 70–90 words carrying the mechanism, plus a
rebuttal per wrong option saying why *that* one fails.

**Explain hard things plainly, do not remove them.** This is grade 12 and the
course keeps its teeth: symmetrical components, distance protection, the swing
equation, merit order. What comes down is sentence length and pile-up, not
content. A `guide` paragraph says what the player does and what the numbers
mean; `background` is a list of paragraphs behind one button, where the
equations get spelled out in sentences with their symbols named.

**Never leak the answer** — not in the scene, the guide, the takeaway, the
`assumes`, or the concept takeaway `concept.t`. `probeQuestions` tests for it.

**Print goals, never targets or grading slack.** A goal is the constraint the
answer is written against ("at least 95% inside the corridor"); a target is the
answer. A BALLPARK tolerance, a VERIFY band, a HOLDOUT pass mark stay unprinted.

**Format variety is fun, and it is a diagnosis rather than a goal.** 27% CHOICE
is worth moving, but only by converting stops where another format asks a better
question — an ordering that turns on cost rather than time, a chain where the
governing transfer has to be named, a control where one thing changes and is put
back. A conversion that keeps the objective and changes the move is exactly what
the snapshot invariant is there to permit. Every instrument carries an importer
trap; read `FORMATS.md` before authoring one.

**House rule 21.** No derived equation before some question *computes* its base.
CHOICE computes nothing, so a base taught only through CHOICE is untaught.

**Story.** Fifteen days, six areas, twelve people; both sides of the campaign
argument must still win a day (`STORY_SPEC.md` §1 — nothing checks this, a
person has to read it).

## What to hand back

The rewritten `books/blackout-fable.yml`, a green `npm run check
blackout_fable`, the `--against` report, and a short note: what you changed and
why, which stops changed format and what the new move asks, which of the two
debt lines you paid off, and anything you found wrong with the original that you
did not fix.
