# The diversity pass — no format over a third of a campaign

**The rule.** No single answer format may hold more than a third of a campaign's
scheduled stops. At the 45-stop campaigns that is **15**; at a 30-stop junior edition
10; at Hospital's 55 it is 18. Measured on scheduled mission stops — `pagesFor`,
deduped by `group:lesson`, so a callback counts once — because that is what a player
meets.

**And the rule is not the goal.** Format variety scores **ρ −0.07** against whether a
campaign's syllabus equations are actually computed; the share of stops carrying
arithmetic scores **+0.69**. So a cap enforced by picking the nearest format would buy
a prettier histogram and teach nothing. Every conversion in this pass has to pay for
itself in teaching, and the order of preference below is how that is decided.

## Why the catalogue looks like this

Not subject matter, and not the engine retyping anything — the books authored it.
`grep format: books/seedbank.yml` gives 29 CHOICE out of 45. Three causes, in order of
how much they explain:

1. **Variety was inherited, not invented.** The first nine books (written 9–13 August)
   average **33%** CHOICE among their board stops; the last six average **59%**. The
   early ones had a source document carrying exercise shapes — the seven FPS-native
   interaction guides in `books/copy/`, and the two docx design books whose activity
   types map onto PROTOCOL, SEQUENCE, BALLPARK and TRIAGE. The late books say so in
   their own headers: *"Written to `tools/BOOK_TEMPLATE.md`; the plan it came from is
   `GAME_IDEAS.md`"* — a one-paragraph idea with no activity shapes in it.
2. **Two controls prove it is the source and not the date.** Outbreak: Riverton had no
   interaction guide and has the best mix in the repo (19% CHOICE of boards) because it
   came from a design book. Quantum had no source document either, but its book header
   states its own rule — *every question is about an instrument, a number or a
   choice* — and it has the best board diversity in the catalogue. Writing the
   distribution down beforehand is the whole mechanism.
3. **Nothing asks for a mix and CHOICE is the cheapest block.** `tools/BOOK_TEMPLATE.md`
   documents seven board formats and says nothing about distribution — grep for mix,
   variety or distribution returns zero hits. The nineteen instruments are not even in
   that file; they are in `books/interactions/README.md`, which an author has to know
   to open. CHOICE needs four labels and rebuttals; every other format needs numbers,
   bins, tolerances, per-link readings, an unprinted pass mark, and each carries an
   importer trap that refuses a sloppy version.

## The work list — 75 stops over the cap, in 10 campaigns

| campaign | stops | cap | worst | over | uncomputed equations | select-only concepts |
| --- | --- | --- | --- | --- | --- | --- |
| ~~seedbank~~ | 45 | 15 | CHOICE **15** | **done** | 3 → **0** | 7 → 1 |
| ~~aftershock~~ | 45 | 15 | CHOICE **15** | **done** | 8 → **0** | 6 → 5 |
| ~~the_trial~~ | 45 | 15 | CHOICE **15** | **done** | 5 → **0** | 3 → **0** |
| ~~groundtruth~~ | 45 | 15 | CHOICE **15** | **done** | 0 | 5 → **0** |
| ~~sightline~~ | 51 | 17 | CHOICE **17** | **done** | 0 | 7 → 2 |
| ~~seedbank_ms~~ | 30 | 10 | CHOICE **10** | **done** | 3 → **0** | 3 → 1 |
| ~~aftershock_ms~~ | 30 | 10 | CHOICE **10** | **done** | 5 → 1 | 4 |
| ~~hospital~~ | 55 | 18 | CHOICE **18** + SEQUENCE **18** | **done** | 0 | 5 → 3 |
| seedbank_ms | 30 | 10 | CHOICE 22 | **12** | 3 | 3 |
| sightline | 51 | 17 | CHOICE 27 | **10** | 0 | 7 |
| the_trial | 45 | 15 | CHOICE 24 | **9** | 5 | 3 |
| groundtruth | 45 | 15 | CHOICE 23 | **8** | 0 | 5 |
| hospital | 55 | 18 | CHOICE 22 + SEQUENCE 22 | **8** | 0 | 5 |
| aftershock | 45 | 15 | CHOICE 22 | **7** | 8 | 6 |
| aftershock_ms | 30 | 10 | CHOICE 15 | **5** | 5 | 4 |
| ~~redsand~~ | 53 | 18 | CHOICE **17** | **done** | 1 → **0** | 2 |
| ~~deepwatch_ms~~ | 30 | 10 | CHOICE **10** | **done** | 4 → 3 | 2 |

The other 19 campaigns are already inside the cap and are not touched.

## How a target format is chosen — teaching first, in this order

For each stop that has to move, the target is the highest item on this list that the
stop's own content can honestly support. If none can, **the stop stays CHOICE and a
different stop in the same campaign moves instead** — a conversion that has to invent
its subject is the diversification trap this repo has already documented.

1. **It computes an equation the syllabus lists and no question computes.** The only
   rule `curriculumDelivery` gates on, and the measurement that actually predicts
   teaching. Wellmere's `Nₑ = 4NmNf/(Nm+Nf)` and both its ratios are here.
2. **It lifts a mechanism concept off the select-only list** — from SELECT to CONSTRUCT
   or OPERATE. A mechanism reached only by picking it off a list is the diversification
   work list `curriculumDelivery` reports and never fails.
3. **It is the format whose own subject is the stop's own sentence.** ATTEST is *the
   record is not the condition*; TRACE is *agreement is not independence*; CONTROL is
   *change one thing and reverse it*; VALUE is *what would this measurement change*.
   Where a stop's takeaway already says one of those, the format is not a costume.
4. **It is a format this campaign has none or one of** — 217 stops across the
   catalogue are the only instance of their format in their game, so this term breaks
   ties without driving the choice.

**Junior editions take the same list with three of its answers removed.** At grade 8
and below `questionLoad` caps an exactly-graded ordering board at 3 cards and a joined
board at 3 rows, so SEQUENCE and PROTOCOL are usually unavailable; DERIVE is banned
below grade 9 outright. What is left, and what a middle-school science course is
actually about, is **CONTROL** (the fair test) and **VERIFY** (predict, act, measure) —
deliberately unbudgeted at junior level — plus BALLPARK at two operations, CLOUD,
TRIGGER and CHAIN at two links.

## What this pass refuses to do

- **No conversion may change the objective.** `curriculumDelivery --snapshot` before
  and `--against` after, per campaign: a changed takeaway, a dropped `assumes`, a
  concept the campaign no longer touches or an equation it no longer computes all fail.
  A changed *format* is reported and allowed. The objective is fixed, the format is the
  variable.
- **No arcade formats.** BELT, TRIAL, HOLD, SPOT and LOB need engine-side work or a
  physical fit, and STACK is suspended. They are authored nowhere today and this is not
  the pass that changes that.
- **No DERIVE conversions in Headwater, Midway or Ground Truth.** The derivations are
  the course.
- **Nothing may be graded on dexterity**, and nothing may print its own answer — the
  target is a constraint, never the value the player reports.

## The recipe, per campaign

```sh
node engine/dev/curriculumDelivery.mjs <theme> --snapshot /tmp/<theme>-before.json
# author the conversions in books/<book>.yml
node tools/import-book.mjs books/<book>.yml <theme> --verify
node engine/dev/curriculumDelivery.mjs <theme> --against  /tmp/<theme>-before.json
node engine/dev/formatMix.mjs <theme>          # the cap, and what is left
npm run check <theme>
npm run traps                                  # any converted instrument's own trap
```

`engine/dev/formatMix.mjs` is the gate, with `format-debt.json` recording the 75 rows
that exist today: a campaign over the cap and not on the list fails immediately, and a
row on the list that has since been paid also fails, naming the line to delete. It only
shrinks. **The gate is on the cap alone** — not on effective format count, not on
CHOICE share — because those are the numbers that do not predict teaching, and a gate
in front of a number nobody should optimise is how a check stops being read.

## Progress, and what each campaign cost

**All ten done, 76 conversions.** Every campaign in the catalogue is inside the cap and `format-debt.json` is empty of rows. The three are in `format-debt.json` no longer,
and every one was verified with the snapshot invariant, the delivery gate, the
equation-order gate and `npm run check`.

| campaign | conversions | CHOICE | equations computed | select-only | notes |
| --- | --- | --- | --- | --- | --- |
| seedbank | 14 | 29 → **15** | 3/6 → **6/6** | 7 → 1 | BALLPARK ×4, ATTEST, CHAIN, CONTROL, BALANCE, STRESS, ALLOCATE, VALUE, TRACE, CLOUD, SEQUENCE |
| redsand | 2 | 19 → **17** | 8/9 → **9/9** | 2 | one conversion met the cap; the second was needed because the first put Q vs K two days ahead of ΔG |
| deepwatch_ms | 1 | 11 → **10** | 2/6 → 3/6 | 2 | the junior echo stop computes its own depth now |
| aftershock | 7 | 22 → **15** | 2/10 → **10/10** | 6 → 5 | the worst delivery in the catalogue; BALLPARK ×5, CHAIN, and the period the design coefficient is read at |
| the_trial | 9 | 24 → **15** | 6/11 → **11/11** | 3 → **0** | BALLPARK ×5, STRESS, SEQUENCE, PROTOCOL, CLOUD |
| groundtruth | 8 | 23 → **15** | 11/11 | 5 → **0** | BALLPARK ×3 (one of them the concept no stop touched), CONTROL, ATTEST, VERIFY, ALLOCATE, VALUE |
| sightline | 10 | 27 → **17** | 7/7 | 7 → 2 | ALLOCATE (six seconds of attention as a budget), TRACE, VERIFY ×2, DEGENERACY, CONTROL, PROTOCOL ×2, SEQUENCE, ATTEST, BALLPARK ×2 |
| seedbank_ms | 13 | 22 → **10** | 1/4 → **4/4** | 3 → 1 | BALLPARK ×6, CHAIN ×2, VERIFY ×2, CONTROL, SEQUENCE |
| aftershock_ms | 5 | 15 → **10** | 1/6 → 5/6 | 4 | BALLPARK ×3, CONTROL, VERIFY |
| hospital | 8 | CHOICE 22 → **18**, SEQUENCE 22 → **18** | 4/4 | 5 → 3 | at grade 2: VERIFY ×2, CONTROL ×2, BALLPARK ×2, CHAIN, PROTOCOL |

**Red Sand is the pattern worth remembering.** Converting the day-3 assay stop to a
BALLPARK that computes the reaction quotient paid the cap and the equation gap at
once — and immediately failed `equationOrder`, because Q against K is built on
ΔG = ΔH − TΔS and nothing computed that until day 5. The fix was not to record a new
inversion but to convert the day-2 free-energy stop as well, so the base arrives
first. **A conversion can create an ordering defect, so run `equationOrder` after
every one**: a stop that starts computing something is a stop that starts owing its
prerequisites.

## Four tool defects this pass turned up, all fixed

1. **`export-book.mjs` silently dropped `takesAsRead`.** It wrote each declaration as
   the player-facing `assumes` line the importer derives from it, so a book recovered
   from a game lost the field — and `bookParity` could not see the loss, because the
   generated content is byte-identical either way. Four checkers read that field.
2. **`import-book.mjs` kept its own copy of the keyword matcher.** When `keywordHit`
   learned that `3 : 1` and `3:1` are the same ratio, the delivery gate saw a computed
   equation and the importer stamped it as merely mentioned — so one stop was both
   teaching the monohybrid ratio and reported as asking a derived equation before its
   base. One rule, one function: the importer imports it now.
3. **`keywordHit` could tell `3 : 1` from `3:1`.** `readabilityParity`'s rule one file
   over. A ratio is the same ratio however it is spaced, and a `curriculumDelivery`
   selftest case now fails if the un-spaced regex comes back.
4. **A block-splice regex that swallowed three stops and a mission header.** Anchoring
   on `      - group: ` and letting a lazy prefix run forward to the title matched from
   an *earlier* stop's group line. The result is still valid YAML, `npm run check`
   passed on the shortened campaign, and the only evidence was a stop count. Recovered
   through `export-book` — which is how defect 1 was found. **Split on the boundary and
   pick the block whose own title matches; never span from an anchor to a title.**

## Three more rules the pass earned, after Aftershock, The Trial and Ground Truth

1. **The keyword has to be in the `relationship`, not the solution.** `pagesFor`'s formula
   haystack is relationship, template, worked solution, DERIVE lines, instrument numbers
   and `givens` — but the importer maps only some of those, and in practice a converted
   BALLPARK's `solution` does not reach it. A short equation signature (`σ=f/a` is five
   characters, under the eight `SIGNIFICANT` needs) therefore falls back to keywords, and
   the keywords have to sit in the relationship. Write *"Stress is σ = F / A"*, not
   *"σ = F / A"*.
2. **`background` reaches no checker and neither does `answerText`.** `conceptCoverage`
   and `jargonDepth` read the title, scene, question, task, `why`, the option labels and
   `assumes`. A sentence moved into the background door leaves the concept untouched and
   the term unintroduced — Ground Truth lost three syllabus concepts that way and got them
   back by moving one sentence into `why`, which is where the teaching belongs anyway.
3. **A conversion moves other stops' claims.** `pickKeyConcept` weighs rarity across the
   whole campaign, so writing a stop that talks about linkage changes what a *different*
   stop is judged to be about — and the declaration that stop carries then fails as
   "a declaration the claim does not need". Six stops across three games needed
   `concept:` pinned for this reason. **Pin the claim on any stop whose text you rewrite,
   and expect to pin one or two you did not touch.**

## The junior editions needed four rules the senior games never hit

The three youngest campaigns — two grade-6 editions and Hospital at grade 2 — each
refused a conversion the senior policy would have accepted, and every refusal was a
`questionLoad` rule doing its job.

1. **The judgement budget is per campaign AND per day.** Junior Wellmere's twelve
   conversions took its judgement stops from 4 to 9 of 30 — 30% against a 20% limit —
   and put two on one day. TRACE, ATTEST, VALUE, STRESS, DEGENERACY, DIAGNOSIS and
   HOLDOUT are all *format*-demanding, so a diversification pass that reaches for
   instruments reaches straight into that budget. Three of them were re-authored as
   CHAIN, VERIFY and BALLPARK, and one **pre-existing** DIAGNOSIS had to come out too
   for the day to fit. **Count the demanding formats before choosing them**, and note
   that CONTROL, VERIFY, CHAIN, ROUTE and the boards are free.
2. **Nothing under 0.1 in the arithmetic.** Two junior BALLPARKs were refused for using
   0.082 and 0.05. The fix is not a smaller tolerance — it is a different unit:
   per cent of gravity instead of g, and "five in every hundred" instead of 0.05, which
   is one more tile and a better sentence.
3. **Four items is the board limit, and it counts the labels too.** A junior TRACE takes
   four channels, not five; a junior CHAIN card is twelve words including what it
   transfers, which turns *"Carbon dioxide let in through the pores — 6 units, down from
   21 in a wet summer"* into *"Carbon let in — 6 units, was 21"*. The short version is
   better.
4. **Grade 2 is a different language, not shorter sentences.** Every one of Hospital's
   eight conversions failed the reading gate on the first pass, some at grade 8. What
   passes is one clause per sentence and no subordination at all: *"The fan is not doing
   the cooling. It just carries the damp air away. Then more sweat can dry."* Write it
   that way first; editing senior prose down does not get there.

**And a name is a budget too.** Two junior days went over the four-people limit because
my conversions kept the scene's cast and added the guide's. Dropping one name per day
fixed it — and then `checkNames` failed, because the name I dropped was where the
character had been introduced. Introduce them at the first mention that survives.
