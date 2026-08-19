# The question brief — how every stop gets rewritten, and how we know it worked

This is the sweep brief for the 1,334 stops in the eighteen games. It exists
because one stop — Quantum's day-10 HOLDOUT — turned out to be unplayable for a
reason no check in this repo could see, and the fix generalised. Read
`tools/BOOK_TEMPLATE.md` for the fields; this is the *editorial* bar and the
order of work.

Measure before and after with:

```sh
node engine/dev/cardLoad.mjs --all           # progress: the "done" column
node engine/dev/cardLoad.mjs <theme>         # the work list, heaviest card first
node engine/dev/cardLoad.mjs --selftest      # the measurement can tell the shapes apart
```

---

## 1. What was wrong, in one case

The HOLDOUT asks you to choose a discriminator threshold on one batch of shots,
freeze it, and report what it scores on a batch it never saw. Before the rewrite
the card carried **nine** things: the scene, "takes as read", "what this is
about", two syllabus equation chips (neither used by the question), two glossary
chips, the question, and then the panel's own "what you are doing", hint, and
"what counts as done" — the last of which restated the question.

Every block was defensible. The sum was unreadable, and a player reported exactly
that. Then, having read all nine, they still could not answer, because **nothing
said what was being varied, what the plotted number meant, which direction was
better, or what freezing bought.** Those four are the mechanics, and no block
owned them.

And when the mechanics were finally written down, the *data* turned out to
contradict them — see §5, which is the expensive half of this brief.

## 2. The target card

Three things above the controls, in this order:

| | what it carries | length |
| --- | --- | --- |
| **`scene`** | what has happened, and every word or quantity the question needs | ≤ 80 words |
| **`guide`** | on a live panel: what the player does, what the numbers mean, and the caution that makes the judgment decidable. On a board or a CHOICE: **how to think across the options** — what they disagree about, the test that separates them, and what the distinction costs if it goes the wrong way | ≤ 80 words, hard cap 130 |
| **`background`** | one button. Course material, in prose | any length |

Then the format's own one-line instruction (`question`), then the instrument.

The button holds, in this order: the authored `background` paragraphs, **each
syllabus equation spelled out in a sentence** with its symbols named, the glossary
definitions, and finally `assumes` and `takeaway`. Nothing is deleted; it stops
competing. A chip reading `n_phys ≈ d²` is useful only to somebody who already
knows what it says.

A stop with a `guide` **suppresses the panel's own three lines** — the guide is
the instruction — and the importer refuses a `sweep.hint` / `holdout.goals` and
the rest authored beside one.

## 3. The mechanics the guide must cover

For any stop where the player operates something, answer all of these or the stop
is not finished. The HOLDOUT's guide answers them in 72 words.

1. **What am I varying, and what is one position?** ("Each place you stop is a
   different threshold.")
2. **What is the number the panel shows?** ("The share of shots it labels
   correctly.")
3. **Which direction is better, and why?** ("Higher — fewer shots called wrong.")
4. **What does each control commit me to?** ("Freezing commits your threshold and
   opens tray B.")
5. **What exactly am I reporting or being graded on?** ("Report tray B's number.")
6. **What would make my first instinct wrong?** — the caution, below.

## 4. The caution, and the line it must not cross

A judgment stop is only fair if the *reason not to do the obvious thing* is on
screen before committing. State the general fact; never the answer.

- Fair: "Each score comes from 400 shots, so it wobbles by about a point; and you
  are keeping the best of sixteen positions, which is a contest luck can win."
- Not fair: "the plateau is the trustworthy region", "94.8 or over passes",
  "the 14 mV spike is noise."

The distinction is instrument rule 2 in `engine/core/instruments.js`: the panel
prints the **goal** — the constraint the answer is written against — and never the
**target**, which is the answer. Grading slack stays unprinted always: a BALLPARK
tolerance, a VERIFY band, a HOLDOUT pass mark. Knowing it changes nothing about
how you get there and invites aiming at the edge of it.

## 5. The numbers have to be possible

**This is the part that cost the most, and it applies to every stop with authored
data.** The HOLDOUT's card said scores wobble by "a few tenths"; its tempting
spike stood 1.2 points above the plateau, which is 3.5σ at the stated 4,000
shots. A player reasoning from the number they were given was *right* to trust the
spike. And the two data sets — described in the fiction as two halves of one
8,000-shot pool — differed by up to 3.8 points at the same threshold, where
sampling permits about 0.5. The stop taught the right lesson with numbers that
could not happen.

Before authoring or accepting any numeric stop, ask:

1. **What is the implied uncertainty?** For a count or a rate, σ = √(p(1−p)/n) or
   √N. Write it down. Every authored difference is then either inside it (noise,
   and must not be gradeable) or outside it (real, and must not be called noise).
2. **Are two samples of one population consistent with being that?** Two halves
   of one set differ by ~√2·σ, not by three times it.
3. **Is the decoy a *plausible* fluctuation?** A trap the player is meant to
   resist has to be resistible for a reason they can see, and no bigger than the
   noise plus a selection effect they were warned about.
4. **Is the graded difference real?** If the truth is flat where the decoy sits,
   choosing it costs nothing and there is nothing to grade — the harm is only in
   the number reported. Either grade the reporting or give the curve a real
   optimum. (This is why the HOLDOUT's curve was rebuilt from two overlapping
   Gaussians rather than a flat top with a bump on it.)
5. **Would a student who did the arithmetic reach the intended answer?** If not,
   the stop is a trick.

Generate such data with a script that states its model, and keep the script — the
HOLDOUT's is `holdoutData3.mjs`, and the two attempts before it are wrong in ways
worth reading.

## 6. Reading level

Measure, do not judge. `tools/readability.js`, or read it off `cardLoad`.

- `scene` and `guide` at or under the theme's `audience.grade`, and **at or under
  grade 8 wherever the vocabulary allows regardless of audience** — the HOLDOUT is
  a grade-12 course and its card is at 5.6 and 3.2. Hard topics stay; sentences
  get shorter.
- No sentence over 28 words.
- `background` may sit a grade or two higher. It is the depth, and it is optional
  to the player.
- The subject's own words are not "hard words": "discriminator" stays, and the
  card defines it.

## 7. The tiers, and the order to work in

`node engine/dev/cardLoad.mjs --all` when this brief was written: **1,334 stops,
1 converted, 841 over the four-block target.** The problem is fragmentation, not
length — the median card is 75 words in 5 to 6 blocks.

**Two numbers moved since, and one of them was the measurement's own fault.**
Folding by default took the 841 down without a word being written. Then `cardLoad`
was taught to *render* the 24 panels in instruments.js instead of modelling only the
four in questionUI.js, and the true count came back: **244 over target, exactly the
instrument stops**, each drawing a format lecture, a hint and a goal the measurement
had never counted. The rule from §5 applies to the instruments too — a measurement
that produces a plausible answer is not thereby a working measurement.

The targets are therefore per tier: **4 blocks and 170 words for a card, 6 and 240
for a stop with an instrument**, which keeps its own hint and its "what counts as
done". A briefed stop drops the format's generic lecture — `normalize.js` stamps
`game.briefed` from the lesson's `guide`, and `method()` in instruments.js reads it —
because the guide is that sentence written for this stop.

| tier | stops | what it needs |
| --- | --- | --- |
| **1a — live panels** (SWEEP, HOLDOUT, TALLY, PROBE) | 19 | ✅ done. These print three panel lines of their own and were the acute case |
| **1b — instruments** (the other 24 formats) | 244 | ✅ done. All 27 games and every junior edition |
| **2 — boards** (BALLPARK, SEQUENCE, PROTOCOL, TRIAGE, CASEBOOK, DIAGNOSIS, SCIENCETANK, DERIVE) | 728 | ✅ done, and **not** the way this row first said. See §7a |
| **3 — CHOICE** | 343 | ✅ done, and not the way this row first said either. See §7a |

Work theme by theme, tier 1a first across all games, then 1b, then 2, then 3.

## 7a. Tiers 2 and 3 got the wrong instruction, and a player said so

This brief's first version told tier 2 to write a guide "only where the pieces'
meaning is not obvious", and told tier 3 to write none at all, on the argument that
four written options are their own instruction. Both rows were then filled in
anyway, by the mass-production drafters, with a paragraph of **mechanics** — 836
stops of "choose one of the 4 and press Check; the options are dealt in a fresh
order each time, so the lettering carries nothing". Only six distinct texts covered
all 361 CHOICE stops.

The whole of that paragraph was already on the screen. Every board format prints its
own `compactInstruction` a few pixels below — SEQUENCE prints the axis or "put the 4
steps in order", PROTOCOL prints "join each situation to the response it calls for",
CHOICE prints the stop's own question. So the second paragraph of the card, the one
place a player looks for help with the *question*, was spent telling them how to
operate a control they could see.

**The rule now: on a board or a CHOICE stop the guide is about the content of the
options.** Three moves, in about sixty words:

1. **What the options disagree about.** Not what they say — what axis separates
   them. "All four agree that something cannot be sent. They disagree about what."
   For an estimate, the options are the numbers: "five numbers, and two of them
   belong to the aftermath rather than the first instant."
2. **The test that separates them.** A question the player can put to each option in
   turn. "Ask of each whether it is a level or a speed." "Ask of each candidate how
   many of the five readings it covers."
3. **What the distinction costs.** One sentence on why it matters here, in the
   fiction. "A rate read as a size sends the control room a megawatt figure it then
   acts on."

And the same three prohibitions as everywhere else. No mechanics — no *click*,
*press*, *tile*, *slot*, *shuffle*, *lettering*. Never the answer, and never enough
elimination to be the answer by another route. And **not a restatement of the
scene**: a guide that quotes eight consecutive words of its own scene has added
nothing, which is worth measuring rather than trusting.

All 1,045 of those stops are rewritten, one guide per stop, drafted from that stop's
own `why`, `rebuttals`, cards, pairs, readings or tiles. Where a lesson has `— Review`
copies the copies share its guide, because they are the same lesson.

### SCIENCETANK is the one that had it backwards twice

A tank stop's second paragraph was the *scoring* rule — commit at least eighty of the
hundred, thirty-five or more on one proposal, keep the unsupported ones under
fifteen — while the stop's `evidence`, the facts the allocation is supposed to be
argued from, sat behind a collapsed "Evidence available" disclosure inside the panel.
So the player met the arithmetic of the allocation before meeting a single fact about
what they were allocating between.

`rules` is the fix: a new optional field, rendered as its own **Rules** button on the
card, holding the scoring text verbatim. The evidence moves up into `guide`, and the
panel drops its own disclosure when a stop carries `rules`, so the same prose is
never printed twice. All 31 tank stops carry both.

The second half of that fix is editorial. **Evidence that only describes the
proposals worth funding is not evidence, it is a hint.** Two of the shipped stops
gave facts for the recommended pair and nothing for the other two, which turns
"spread a hundred points" into "find the two paragraphs that exist". Every tank
stop's evidence now carries a fact bearing on every proposal — a cost, a lead time, a
measurement already taken, a reason it is on the list at all — without saying which
to fund. Fourteen of the 31 had no `evidence` at all and now have some. A
game is done when `cardLoad <theme>` shows every stop converted or deliberately
exempt.

## 8. Per-stop procedure

```sh
node engine/dev/cardLoad.mjs <theme>                       # pick the heaviest
node tools/import-book.mjs books/<book>.yml <theme> --verify
npm run lessons                                            # refresh the gallery
#   then open /engine/dev/lessons.html?f=<FORMAT> and answer it, right and wrong —
#   and the card under it, which is the same format out of another campaign
npm run traps                                              # if the stop's data moved
node engine/dev/check.mjs <theme>
```

1. Read the stop's `why`. If it explains something the card never said, that
   sentence belongs in the guide or the background, not only in the verdict.
2. Write `scene` and `guide` to §2 and §3. Check §4 before writing the caution.
3. Move `assumes`, `takeaway`, the equations and the vocabulary into `background`
   as prose. Add whatever the mechanics need that the card cannot afford.
4. Delete the panel's `hint`/`goals` if the guide now says it — the importer will
   refuse them otherwise.
5. If the stop has numbers, do §5 with a script, and rewrite `answerText` and
   `why` to the new values.
6. Re-import, then **answer it in the gallery** and look at the card. Both halves:
   the numbers can be right and the controls hidden.

## 8a. Two things the sweep itself got wrong

**Long sentences.** The first 84 guides written to this brief broke its own
28-word rule 42 times, in the same way each time: a compound sentence joined by an
em dash, a semicolon or ", so". They read fluently to whoever wrote them, which is
why the rule is a number rather than a judgement. Cut at the joint —
`", so X"` becomes `". So X"` — and re-measure; the repo's voice takes
sentence-initial *So* and *And* without complaint. Measure after every batch:

```sh
node engine/dev/cardLoad.mjs <theme>     # the FK column, and the flag
```

**Concurrent edits.** `tools/brief-stop.mjs` reads a whole book, edits it and
writes it back, so a second session editing the same book loses its work silently.
Meridian's stop set moved twice during this sweep — a format was added and then
withdrawn — which showed up only as a total that went from 1,334 to 1,333. The tool
now re-reads the file immediately before writing and refuses if the bytes changed.
If you are sweeping while somebody else is authoring, work on different books.

## 8b. Draft from the book, not from the content

The five drafters that wrote the mass-produced guides read a **theme's content**
for the stop's format, and then wrote to the **book** by `(group, position within
group)`. That is safe exactly as long as the two agree, and for one hour they did
not: a second session was migrating `CHAIN`'s `reading` key, so twelve themes
refused to import and their content stood still while their books moved. Guides
were written against the format a stop used to have. **145 stops ended up carrying
another format's guide** — a TRIAGE guide on a CHOICE panel, a SEQUENCE guide over
an estimate — and every one of them rendered, graded and read perfectly.

The book is what a stop *is*. `regenGuides.mjs` reads it with
`tools/yaml-lite.mjs` and rewrites every templated guide in place
(`brief-stop.mjs --replace`), which repairs drift whether or not anything spotted
it. Two things it has to know, and both cost a wrong answer first:

- **`lessons:` is a second top-level list of stops** — the review variants, 105 of
  them in the hospital, 101 in Project Y — and `import-book` numbers each group's
  days straight through `missions:` and then `lessons:`, in file order. Walk both,
  in that order, or every review's day is out by the number of mission stops in
  its group. A drafter that walks only `missions:` silently covers 1,105 of 1,328.
- **The book's `format:` is what renders, with exactly two exceptions.**
  `normalize.js` retypes a DIAGNOSIS with no panel and a CASEBOOK with no mapping
  and no real proposals to CHOICE, at load — 26 stops. Copy those two rules rather
  than guessing at them. The first audit written for this did not know them and
  reported 64 correct guides as defects, which is this repo's own rule about
  measurements arriving in the file written to enforce it.

**And a wiped book is recoverable if the edit sets are kept.** Every batch in this
sweep was applied from an `edits-*.json`, and when ~900 guides disappeared from
the books in one go, replaying those files restored all of them in under a minute.
Keep them. `brief-stop` skips a stop that already carries a guide, so a replay is
idempotent — but it applies the rest of the edit, because several sets also carry
a rewritten `scene` and skipping the edit whole would discard that with it.

## 9. Traps this sweep will hit, all paid for once already

- **Never edit a book by string slicing.** A slice-based edit cloned seven whole
  missions of `books/quantum.yml` — a thousand lines — and every check passed,
  because a 22-mission campaign is valid and `bookParity` was green against the
  doubled book. Edit by line range, assert the mission list is unchanged, and
  refuse to write if it moved. The importer now fails on two missions sharing a
  title, which is the loud version of that.
- **A trap anchored on prose goes quiet when the prose is rewritten.** The
  HOLDOUT's pass-mark trap silently stopped firing three times. Anchor on a key
  (`guide: >-`), not a sentence, and re-run `npm run traps` after any data change.
- **Adding blocks can hide the controls.** `.modalBody .modalActions` is
  `position:sticky; bottom:0`, so 150 px of new explanation pushed a slider and
  both readouts under the pinned bar. `scrollIntoView({block:'nearest'})` does not
  fix it — an element one pixel inside the container is "in view" and completely
  covered. `showControls()` subtracts the bar's height; every panel that grows
  should call it.
- **`- >-` in a sequence** did not parse until this sweep began; `tools/yaml-lite.mjs`
  handles it now, and a `background:` list is the first thing to use it.
- **A field the importer does not carry never reaches a screen.** Add the key to
  `import-book.mjs` in the same commit as the book that uses it, and prefer a
  refusal over a silent drop.

## 10. What not to do

- Do not add a guide that repeats the format's own instruction. A paragraph that
  says "choose the best answer" is noise — but the *absence* of a paragraph is not
  the fix, because the drafters will fill the gap with mechanics. Write §7a's three
  moves instead.
- Do not simplify the science. The card gets shorter sentences and more defined
  words; the physics stays, and the background is where it goes to be explained
  at length.
- Do not touch a `scene` that already carries the situation and nothing else
  merely to reformat it.
- Do not print the answer to buy clarity. If the only way to make a stop decidable
  is to say which option is right, the stop's data is wrong — go back to §5.

## 11. Progress and acceptance

A stop is done when all of these hold:

- `cardLoad <theme>` marks it converted, and it is at or under 4 blocks.
- Its scene and guide are at or under the audience grade, and no sentence exceeds
  28 words.
- The six questions in §3 are answered on the card.
- The caution in §4 is present and names no answer.
- Its numbers survive §5.
- It has been answered right *and* wrong in `/engine/dev/lessons.html`, and the
  verdict was correct both times.
- `node engine/dev/check.mjs <theme>` is green, and `npm run traps` is 72/72 if
  any instrument data moved.

### Where the sweep got to

**1,328 of 1,328 stops carry a guide, and none of them is a mechanics paragraph.**
The twenty instruments and the four live panels were written one stop at a time. The
1,045 board and CHOICE stops were mass-produced from a template first — 836 of them
identically — and have since been rewritten one stop at a time to §7a, together with
the 31 SCIENCETANK stops' `rules` and evidence. `cardLoad --all` reports every stop
converted, none over the block target, and two over the word budget (both instrument
stops that predate this).

Three checks are worth keeping in a scratch directory beside the edit sets, because
each one caught something the reading could not:

```sh
node <scratch>/audit.mjs    # no target-format guide still contains a mechanics word
node <scratch>/echo.mjs     # no guide repeats 8+ consecutive words of its own scene
node <scratch>/lint.mjs edits.json   # per-guide: words, 28-word sentences, reading
                                     # grade, mechanics, and whether it names the answer
```

`echo.mjs` is the one that earned its place. Thirty-three guides quoted a run of
their own scene straight back at the player — one of them fourteen words of it — and
every one of those read perfectly well in isolation. Twelve were rewritten; the
twenty-one that remain are single hinge clauses used as pointers, checked by hand.

The seventeen Hospital Heroes estimates with **no numeric spec at all** are still
seventeen. `BALLPARK_CALCS` has no entry for them, so the panel prints "not yet
converted to the number-tile format"; their guides describe the reasoning rather
than tiles that are not there.

Each of those seventeen still needs a relationship, five labelled tiles, a target
and a tolerance, written for a reader of about eight.

Two tools maintain this from here:

```sh
node <scratch>/regenGuides.mjs                 # rewrite every templated guide from the books
node tools/brief-stop.mjs edits-regen.json --replace
node <scratch>/auditGuides.mjs                 # and check every guide belongs to its stop
```

`auditGuides` compares each templated guide against what the template would
produce for that stop *now*, so a book edited by anybody — a format changed, a
stop moved, a whole book reverted — shows up as a mismatch rather than as a
paragraph that reads well and describes a different panel. For the 252 per-stop
instrument guides it can only do the weaker test: a guide carrying another
format's vocabulary is on the wrong stop.
