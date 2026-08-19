# A rewrite pass — re-authoring one game's course, safely

This is how to hand a whole campaign to a model and let it rewrite the
questions without risking the game that ships. It was written while setting up
`blackout_fable`, and `books/convert/BLACKOUT_FABLE_BRIEF.md` is the worked
example of the brief this document tells you to write.

**What a rewrite pass is.** A *parallel edition at the same grade*: the same
place, the same cast, the same syllabus, the questions authored a second time
from scratch. Both games stay registered and playable, so the comparison is a
diff and a walk-through rather than a memory of what the old one felt like. What
comes out is either adopted into the base game or deleted, and both endings are
cheap.

**What it is not.** Not a new game (`NEW_GAME.md`), not a junior edition
(`MIDDLE_SCHOOL_EDITIONS.md` — that changes the *reader*), and not a
conversion sweep (`tools/export-stops.mjs` → `apply-conversions.mjs`, which
edits stops in place). Reach for those first when they fit; this is the one to
reach for when the answer to "is the course actually taught here" is no, and
the fix is more than a stop at a time.

## 1. Pick a game

Two numbers say a game wants this, and neither is format variety:

- **equations computed by a question**, from `curriculumDelivery` — an equation
  the syllabus lists that no question computes is a lesson the course claims and
  does not deliver;
- **stops by move** — a campaign that is mostly `select` is a campaign the
  player reads rather than works.

CHOICE share is the *diagnosis* you run once one of those fails, never the
trigger. `CLAUDE.md` §"Diversity is not the measurement; delivery is" is the
argument, and it is worth re-reading before proposing a rewrite on mix alone.

As of August 2026, the senior games ranked by need:

| Game | equations computed | moves (select/construct/operate) | CHOICE |
| --- | --- | --- | --- |
| Aftershock | **2/10** | 28 / 17 / 0 | 49% |
| Wellmere (seedbank) | **3/6** | 31 / 12 / 2 | 64% |
| The Trial | **6/11** | 26 / 18 / 1 | 53% |
| Blackout | 9/11 | 17 / 26 / 2 | 27% (in progress) |
| Sightline | 7/7 | 31 / 16 / 4 | 56% |
| Ground Truth | 11/11 | 24 / 19 / 2 | 51% |
| Red Sand | 8/9 | 25 / 27 / 1 | 36% |

Sightline and Ground Truth are the caution: both teach every equation on their
syllabus, and a rewrite aimed at their CHOICE share would be work sent at two of
the games needing it least. Aftershock computes two equations in ten and has
zero stops where the player operates anything.

## 2. Build the sandbox

Everything below is one game, named `<base>`, at its own grade `<g>` (read it
from `themes/<base>/theme.js`, `audience: { grade }`).

```sh
cd gamekit
node tools/derive-edition.mjs <base>                       # prints the day sheet, writes nothing
node tools/derive-edition.mjs <base> --suffix fable --grade <g> --days 1,2,…,N
```

List **every** day: a rewrite keeps the campaign's length, unlike a junior
edition. That writes `books/<base>-fable.yml`, `themes/<base>_fable/` (manifest
plus place shims, content generated) and the `themes.json` line, and imports the
book so the theme is playable before anything is rewritten.

Then three edits by hand, all additive:

**a. Declare the rewrite.** `editionParity` fails a same-grade edition, because
an edition nobody rewrote for a different reader is a second copy of the game.
A rewrite is the honest exception and has to say so, in `themes/<base>_fable/theme.js`:

```js
// edition-of: <base>
// same-grade-rewrite: a second authoring of the same course, for comparison with <base>
```

The line fails in both directions: absent at the same grade, or present at a
different one.

**b. Alias the syllabus.** `SYLLABUS` and `EQUATIONS` in `tools/syllabus.js` key
on the exact theme id with no edition fallback, so the rewrite has no course
until you add one. At the foot of that file:

```js
SYLLABUS.<base>_fable = SYLLABUS.<base>;
EQUATIONS.<base>_fable = EQUATIONS.<base>;
```

**By reference, never a copy.** A second literal would let the rewrite quietly
edit the ruler it is being measured against, which is the whole thing the
snapshot invariant exists to stop.

**c. Mirror the debt.** Copy the base's list in
`engine/dev/curriculum-debt.json` to a `<base>_fable` key. The sandbox starts
with exactly the base game's gaps; paying one off is a line deleted, and a gap
that is not listed fails immediately.

Then re-import — the first import ran before the syllabus existed, so no stop
got a key concept stamped — and confirm green:

```sh
node tools/import-book.mjs books/<base>-fable.yml <base>_fable --verify
npm run check <base>_fable
```

## 3. Take the baseline

The rewrite is measured against where it started, so capture that first:

```sh
node engine/dev/curriculumDelivery.mjs <base>_fable --snapshot books/convert/<base>-fable-before.json
node engine/dev/curriculumDelivery.mjs <base>_fable --verbose     # concepts by tier, the work list
node engine/dev/syllabusEquations.mjs <base>_fable                # which equations a question computes, and when
node engine/dev/cardLoad.mjs <base>_fable                         # how much is read before the player can act
npm run export-stops <base>_fable                                 # every stop as one row
node tools/edition-addendum.mjs <base>_fable --write              # this game's cast, areas, syllabus
```

The snapshot is the load-bearing one. `--against` afterwards fails a dropped
concept, a dropped `assumes`, a changed takeaway or an equation the campaign no
longer computes, and *reports and allows* a changed format. **The objective is
fixed, the format is the variable.** Without it, a rewrite can rewrite the
syllabus while every other check stays green, because every other check reads
the content as it now is.

## 4. Write the brief

Copy `books/convert/BLACKOUT_FABLE_BRIEF.md` and re-point it. What it must
carry, and why each part earns its place:

- **The one writable file** — `books/<base>-fable.yml`. Everything under
  `themes/<base>_fable/content/` is generated; hand-editing it is overwritten on
  the next import and fails `bookParity`.
- **What is off limits** — the base theme, its book, its junior edition,
  `engine/**`, `tools/**`, every other theme. Inside the book: `theme`,
  `groups`, `roster` and `places` are the base game's.
- **The reading list** — `tools/BOOK_TEMPLATE.md`, `QUESTION_BRIEF.md`,
  `FORMATS.md`, `STORY_SPEC.md`, `NEW_GAME.md`, and the generated addendum.
- **The baseline numbers from step 3**, in a block. A model that cannot see
  where the game stands optimises the wrong half.
- **The recorded gaps by name**, and that paying one off means deleting its line.
- **The loop**, ending in `npm run check <base>_fable` and the `--against` run.
- **The bar**: answerable questions with every number on the card; scene 30–45
  words of situation; `why` 70–90 words of mechanism with a rebuttal per wrong
  option; no leak into scene, guide, takeaway or `concept.t`; goals printed and
  targets never; house rule 21 on equation order; both sides of the campaign
  argument still winning a day.
- **What to hand back**: the book, a green check, the `--against` report, and a
  note naming every format that changed and what the new move asks.

Say explicitly that improving on the baseline is expected and losing any part of
it is not. A model told only "do not lose anything" will hand back the same game.

## 5. Run it, then read it

One model, one game, one book — two passes on the same base at once will
clobber each other's bytes, and the only symptom is a stop count that moves.

When it comes back, the checks are necessary and are not the judgement:

```sh
npm run check <base>_fable
node engine/dev/curriculumDelivery.mjs <base>_fable --against books/convert/<base>-fable-before.json
node engine/dev/cardLoad.mjs <base>_fable
npm run traps
npm run drive <base>_fable
npm run lessons                        # then answer them yourself
THEME=<base>_fable npm run dev
```

**Play it.** Every expensive defect in this repo — the gable roof, the TRIAL
gates under the floor, the TALLY panel a player passed by clicking, the FLY stop
that printed none of its four criteria — passed every assertion available and was
found by somebody looking at it. A rewrite that is green and unplayable is the
most likely failure mode of this whole procedure, because a model can satisfy
twenty checks and still write forty-five stops nobody wants to answer.

The comparison is the point: `THEME=<base> npm run dev` in another tab, the same
day in both.

## 6. Adopt, or delete

**To adopt**, the rewrite becomes the base game's own book:

```sh
node -e "…"                                # patch the book's theme id back to <base>
cp books/<base>-fable.yml books/<base>.yml  # after the id patch, and after reading the diff
node tools/import-book.mjs books/<base>.yml <base> --verify
npm run check <base>
```

Then pay the debt properly — a gap the rewrite fixed has to leave the base's own
list in `curriculum-debt.json`, not just the sandbox's — and tear the sandbox
down: delete `themes/<base>_fable/`, `books/<base>-fable.yml`, the `themes.json`
line, the two `tools/syllabus.js` alias lines, the `<base>_fable` debt key and
the snapshot files.

Two things adoption does **not** do. It does not update the junior edition:
`books/<base>-ms.yml` is its own book, derived once, and a rewritten senior
course means that edition is now derived from something that no longer exists —
either re-derive it or say in the commit that it was not. And it does not
re-check the games that share nothing but the engine; `npm run check` with no
argument still has to pass before it ships.

**To delete**, remove the same six things and nothing else is left behind. That
is the reason for the whole sandbox: the outcome where the rewrite is worse is
one `rm -rf` and three reverted lines, and it should be reachable without
anybody arguing for keeping work that did not earn it.
