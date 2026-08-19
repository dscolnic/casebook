# How to sequence a campaign that already ships

`REWRITE_PASS.md` re-authors a game. This is the smaller pass beside it: leave
every question where it is and fix **when** the course teaches each idea against
**where the story is standing** when it does. It was worked out on Blackout, whose
day 1 asked what a falling frequency trend is evidence of and named *inertia,
governor response and droop control* — layer 5 of 6 — while the concept droop is
built out of was claimed by no stop until day 12, and the concept under *that* by no
stop at all. Every one of the sixteen checks was green.

The output is `plans/blackout-sequence.html`, and the whole of Blackout's pass was:
**twelve authored claims, two swaps, one rewritten question, one re-order of the
fifteen missions, and thirty-five declarations of prior knowledge.** No stop moved
between areas, no scene was rewritten except the one whose question changed, and no
objective left the campaign.

---

## What has to exist before any of this can run

The gate reads what a card **claims**, and a card claims a concept only when that
concept has its two sentences written. So:

> **`t` on a syllabus concept is the price of admission.** A concept with no `t`
> stamps nothing, shows no door, and is invisible to every measurement here.

Today that is **64 concepts of 724**, and 32 of those are Blackout's list counted
twice because its fable sandbox shares it. Twenty-seven courses have none. So the
rollout is not an engine project; it is roughly **26,000 words of authored
curriculum prose**, and the engine work below is a couple of days.

| | |
| --- | --- |
| Concepts across 29 registered themes | 724 |
| With a takeaway (`t`) written | 64 — Blackout only |
| With a dependency (`needs`) written | 62 — Blackout only |
| Equations across the same themes | 240 |
| Equations that carry a `needs` | 93 |

The equation column is the encouraging one: **93 dependencies are already
authored**, which means most courses have had somebody think about what comes out of
what. Writing `needs` on the concepts is the same judgement one level up, and the
equation graph is the draft.

---

## Per game, in order. Six steps, and only the first is long

Do them in this order. Each one is verifiable before the next begins, which is the
only reason the pass is safe on a shipping game.

### 1. Write `t` and `needs` on the syllabus, together

In `tools/syllabus.js`, on each concept: `t` is two sentences and 30–45 words —
*what the idea says, then what it lets you decide* — and `needs` names the concepts
it is built out of, **by title**, the way the equation `needs` already do.

```js
{ c: "Ohm's law and resistive networks",
  needs: ['Charge, current, voltage and resistance'],
  k: ['ohm', 'resistive', 'v = ir'],
  t: 'V = IR holds for any element whose resistance does not change with the current '
   + 'through it. It lets a whole network stand in as one number, which stays '
   + 'legitimate only while nothing in it is heating or saturating.' },
```

Three things about `needs` that cost time to learn:

* **It is not difficulty.** Droop control is no harder than phasors; it is further
  downstream. A hard concept early is fine — the rule is the same one
  `equationOrder` enforces, and its header says so.
* **It is not the list's own order.** Blackout's syllabus lists transformers at 13
  and Faraday's law at 17, so position cannot stand in for dependency without
  asserting that a transformer is teachable before induction. Expect to find one or
  two of these in every course you graph; they are not bugs in the list, they are
  the reason the field is needed.
* **By title, never by index.** A number silently follows a re-ordering of the list
  to whatever concept lands in that slot. A title fails loudly.

Then check the graph before trusting anything built on it: every `needs` name
resolves, and the depth comes out at five to seven layers for a senior course. A
graph two layers deep means the dependencies have not been written, only the
obvious ones.

### 2. Author the claim on every stop

`concept:` in the book, by exact title. `pickKeyConcept` remains the fallback and it
is a reasonable one, but it is a keyword matcher, and on Blackout **nine of 41
stamped cards named the wrong concept — three of them unreachable by keyword at
all**: the stop whose subject is synchronising says only that four quantities have
to agree, and the stop about the turns ratio asks why the machine makes 20 kV and
the line outside runs at 400.

```yaml
      - group: GEN
        title: Four things that have to agree before the breaker closes
        concept: Synchronous machines and synchronisation
```

Read every stop's claim; author the ones that are wrong and let the picker keep the
rest. The importer refuses an unknown title, and refuses a concept whose `t` is
unwritten rather than showing an empty door.

### 3. Run the gate and read the split

```sh
node engine/dev/conceptOrder.mjs <theme>
```

Every row is a claim arriving before something it is built out of. Split them by
where the prerequisite sits in the graph, because the two halves are different
decisions:

* **Bottom of the graph** (layers 0–2: what a volt is, an AC waveform, power against
  energy) — a senior course following a first course is entitled to take these as
  read. Step 5.
* **Material this campaign itself teaches**, later than the stop that needs it —
  this is the work list. Step 4.

Blackout's 28 rows split 16 / 12.

### 4. Fix the in-course rows, cheapest instrument first

In this order, because each is strictly cheaper than the next:

1. **Re-claim.** The base is already taught on an earlier stop whose card names
   something else. Costs one line. Blackout's best single fix was day 10's
   dark-hours estimate claiming *energy from power over time*, which is what
   `E = Pt` is — one re-claim put the base under two later stops at once.
2. **Swap, never move.** Two constraints bind: `shapeMissions` turns a second stop
   in the same area on one day into a person hunt, and `import-book` warns on a
   mission that is not three stops long. So exchange two stops rather than moving
   one, and prefer a pair in the same area, where the area rule holds by
   construction. Search the legal exchanges rather than choosing by hand — Blackout
   had eighteen legal sets and the one taken was also the one that read.
3. **Write the question the course is missing.** Only when the prerequisite is
   taught nowhere. Blackout needed exactly one: reactance and impedance, the base of
   both voltage drop and three-phase power, mentioned at no stop in the fortnight.
   This is a deliberate curriculum change — re-snapshot, and say so in the commit.

### 5. Declare the rest, out loud

`takesAsRead:` on the stop, by exact title. It is printed to the player as an
`assumes` line, so the sentence they read and the fact the checker reads are the same
authored line.

```yaml
        takesAsRead:
          - Synchronous machines and synchronisation
          - "AC waveforms: frequency, period and phase"     # quote anything with a colon
```

The hatch is what makes the rule satisfiable — day 1 can otherwise only ever claim a
concept with no prerequisites — and the importer keeps it honest by refusing a
concept the stop's own claim is **not** built out of. Without that refusal the field
becomes a place to park anything, and a declaration left behind by a re-claimed stop
would go on excusing a prerequisite that stop no longer has. A stale exemption is
indistinguishable from a considered one.

Count them and look at the number. Thirty-five on a fifteen-day senior campaign is a
course that leans on a first course, which is true and now written down. Sixty would
mean the campaign is not teaching its own bases.

### 6. Decide whether the story is in the way — and only then re-order

Everything above leaves the missions alone. Re-order only if the *drama* wants it:
Blackout's re-cut was taken because the swing equation was the first arithmetic
anybody met, not because a number said so.

```sh
node plans/sequence.mjs <theme>       # the audit, the ceilings, the slates
```

Rank candidate orders **by prerequisite breaks first and correlation second.** On
Blackout the correlation-maximal legal order scored ρ 0.46 and taught backwards; the
order taken scores 0.29 with zero breaks. Then:

* Read the chronology off the stakes as pairs — *this mission must be played before
  that one* — and search only the orders that respect them.
* Expect to re-declare: moving a mission changes which day a base arrives on.
  Blackout needed three more declarations.
* Expect `checkNames` to fail, and be glad. It knows nothing about re-ordering; it
  asks whether a person is introduced before they are used, and it caught a
  generation lead who had been introduced on the old day 1.
* Fix the weekday stamps and the back-references. Blackout took eight edits: the
  stamps, one line referring to an event that had not happened yet, one scene tail
  that assumed an event board.

---

## The two checkers that will lie to you during this pass

**`diffSnapshots` keys a stop by `group:index`,** so exchanging two stops of one area
reads as *both* of them losing their objective, and re-ordering fifteen missions
reads as 74 losses. Blackout's re-order lost nothing: it was settled by matching every
before-objective against the after-content by takeaway, which is four lines of script
and the only honest way to read that output until the invariant matches by identity.

**`validateContent`'s equation-chip rule asks whether the chip and the panel share any
content word,** which is satisfied by one shared phrase. It cannot see a *missing term*
in an equation both of them state — Blackout's day-1 chip read
`df/dt = (P_gen − P_load) / 2H` while the panel divided by nominal frequency, a factor
of fifty apart, and the chip's own numbers gave 0.006 Hz/s against the 0.30 the card
stated. A player found it. **Read the chip against the arithmetic by hand on the first
two days of every game you sequence** until the stronger check below exists.

---

## Engine work, once, before the first game

Small, and all of it earned by Blackout's pass:

1. ~~**`conceptOrder.mjs --sweep`**~~ — **done.** One line per theme: concepts, how
   many carry `t` and `needs`, how many stops claim one, rows out of order, recorded
   debt, declarations. Unsequenced courses sort to the top, so the output is the work
   list; the footer reads `2 theme(s) sequenced, 26 to go`.
2. **`plans/sequence.mjs` for any theme** — its editorial block (the chronology, the
   portable missions, the mis-pick readings) is per game and should be optional, so
   the audit renders for any course whose concepts carry `needs`.
3. **Symbol agreement between a chip and its panel** — every symbol in a printed
   equation appears in the arithmetic, and every quantity the arithmetic divides by
   has a symbol in the chip. Advisory with a debt file first, since it will fire
   widely; it is the check that would have caught the missing f₀.
4. **Report a declaration that is no longer needed.** Blackout authors 35
   `takesAsRead` entries and the gate exercises 34: one prerequisite is met by
   ordering anyway, so its declaration is dead weight. The importer already refuses a
   declaration the claim does not *need*; nothing yet reports one the ordering has
   made redundant, and after a re-order there will be several. Report, never fail —
   a redundant declaration is honest, just stale.
5. **`derive-edition` has to handle claims.** It slices the book as text, so
   `concept:` and `takesAsRead:` lines carry into the junior edition verbatim — and
   the junior syllabus is a *different* list, written in child language, with **zero
   title overlap**. A re-derive after step 2 therefore fails the edition's import.
   Either map senior title → junior title per edition, or strip both fields and warn.
   Decide before sequencing any game that has an `_ms` edition.

---

## What the first sixteen actually cost, and what they turned up

All sixteen senior campaigns are through steps 1–5. **The graphs are written — 494
concepts across 18 themes carry a dependency, up from 62** — every claim's
prerequisites now arrive earlier or are declared, and `npm run check` is green on all
of them. Two things about how it went are worth carrying into the junior editions.

**Nearly all of the residue is bottom-of-graph, which is the answer the plan
predicted.** 400-odd rows across the sixteen, of which the great majority were
declarations: `outbreak_riverton` 29, `redsand` 33, `icecore` 23, `bring_them_home`
20, `projecty` 19. Those are senior courses leaning on a first course, which is
legitimate and is now written on the cards. What is left in
`concept-debt.json` is the in-course residue, and it is small everywhere except three
games: **midway 21, contamcity 21, aftershock 11.**

**Midway is the finding of the pass.** AP Physics 1 taught in derivations across an
amusement park, and the day is set by which ride you are standing at — so the
teaching order follows the rides. Twenty-one in-course inversions, and writing its
equation graph (it had *none* of twelve) surfaced the bigger one: **`ΣF = ma` is shown
on a card from day 1 and computed by no question in the game.** Everything built on it
— centripetal force, the energy books, torque, the pendulum, fluid pressure — is
computed. That is seven equation-order inversions from a single missing stop, and it
is the same defect this repo has already paid for once, still shipping.

**But read the Midway equation debt before believing it.** `ΣF = ma` is computed by no
question *as such* — no stop gets a force from a mass and an acceleration — and yet the
course computes it constantly as instances: day 4's DERIVE writes `T sinθ = mv²/r` and
`T cosθ = mg`, day 9's writes `N + mg = mv²/r`, and day 14's BALLPARK works
`N/mg = 1 + v²/(rg)`. Every one of those *is* the second law applied, and neither the
keyword list nor `symbolSignature` can see it, because what the stop writes is the
instance rather than the law's own notation. So the seven recorded rows are one
editorial question — *should a course teach `F = ma` plainly once before using it six
ways* — and not seven missing stops. Answer it before paying that debt down, and put
the answer in the debt file's comment when you do.

**Headwater has the calculus twin of it:** the chain rule claimed on day 2 with the
power rule not claimed until day 5. `equationOrder` was written for exactly this
sentence at the equation level; at the concept level it was still there.

**Three courses had a dependency I got wrong on the first pass, in the same way.** A
cycle: intermolecular forces ⇄ phase changes, rate constants ⇄ activation energy,
reliability ⇄ validity, α/β ⇄ sample size, decibels ⇄ signal-to-noise. Each is a pair
where the physics runs one way and the prose reads both ways, and a cycle makes the
depth calculation non-terminating rather than wrong — so **check for cycles the moment
a graph is authored**, before anything reads it. Three of them were self-references,
which is a typo the applier now refuses outright.

**Two engine gaps the rollout exposed, both fixed:**

* **A claim no longer waits on its takeaway.** The importer used to skip a concept
  with no `t`, so 26 of 28 courses claimed nothing and this whole gate had nothing to
  read. Claims are recorded now and the door still only appears when `t` is written —
  which separates "the course is in a teachable order", checkable today, from the
  26,000 words of curriculum prose, which is not.
* **`equationOrder` had no debt file.** With none, authoring a truthful `needs` graph
  on a shipping game turns green into red in the same commit, and the realistic
  outcome is a graph somebody has quietly made wrong. `engine/dev/equation-debt.json`
  now exists with the same two properties as the others, holding Midway's seven.

**What was deliberately not done:** the per-stop claim review. Nine claims were
authored across the sixteen games where an unclaimed base concept had an obvious early
host, and the rest are still `pickKeyConcept`'s. On Blackout, read by hand, that
matcher was wrong on nine of 41 — so **expect a fifth of every game's claims to be
wrong, and expect some of the recorded debt to be an artefact of a wrong claim rather
than a real inversion.** Reading the claims is the next pass, and it is the one that
will shrink the debt file honestly.

## The junior editions are not the same job, and the difference matters

All nine `_ms` editions and the hospital game are through as well — **every registered
theme carries a graph now, 637 concepts of 724, and `conceptOrder` is green on all 28.**
But the auto-declare policy that is right for a senior course is *wrong* for a junior
one, and the first two editions were done the wrong way before it was caught.

> **"Taken as read" needs an earlier course to take it as read from.** AP Physics 2 may
> open on frequency without teaching what a volt is. A grade-6 edition has nothing in
> front of it: its whole premise is that an eleven-year-old is met where they are, so a
> prerequisite it declares is one it has quietly decided not to teach.

That is the middle-school failure this repo has already paid for twice, arriving through
a third door. So on a junior edition the rows go in the debt file, where they read as
work, and `conceptOrder` now **reports** any declaration on a theme at grade 8 or below
rather than accepting it silently. Twelve declarations were stripped from ContamCity's
edition and twenty-two from Deep Watch's when the policy was corrected.

The junior graphs are quick — sixteen concepts, mostly one prerequisite each — and they
turned up the same cycle trap as the senior ones: rate ⇄ reading a gauge, averaging ⇄
calibration.

**And `derive-edition` will overwrite a shipping edition without saying so.** It did:
run on `blackout` to check one line of output, it rewrote the nine days it was given
over the ten that ship, book and generated content both, and nothing failed — a nine-day
campaign is a valid campaign and `npm run check` passed on it. The only evidence was a
mission count in a file nobody was reading. It refuses now unless `--force`, printing
how many days the edition currently ships. Claims are stripped on the way across, with
the count reported, since a junior list shares no title with its parent's.

## The claim review, and what it did to the numbers

Every game has now had its claims read stop by stop — 1,300-odd stops across 28
themes, against a sheet showing what each card claims, what its own words reach, and
the first line of its scene. **235 claims were re-authored.** The rate is close to
Blackout's hand-read 9 of 41, and it is much worse on the junior editions:

| | claims corrected | of |
| --- | --- | --- |
| `blackout_ms` `contamcity_ms` `deepwatch_ms` | 16 · 14 · 14 | 30 stops each |
| `aftershock_ms` `seedbank_ms` `outbreak_riverton_ms` | 14 · 15 · 14 | 30 each |
| `bring_them_home_ms` `planetary_defense_ms` `icecore_ms` | 13 · 13 · 13 | 30 each |
| `hospital` `quantum` `blackout_fable` `redsand` | 17 · 12 · 11 · 8 | 45–55 |
| the other senior games | 2–9 each | 45–53 |

**Why the junior editions are the worst.** A grade-6 list is sixteen short, plain
sentences — *"current is the flow, and voltage is the push behind it"*, *"a circuit is
a loop"* — and plain words match everything. Blackout's edition had eight of its
thirty cards claiming one of those two concepts. The picker is not weak here so much
as the vocabulary is: rarity scoring cannot separate concepts whose words are the
words the whole course is written in.

**The debt went UP, 201 → 236, and that is the pass working.** A card that names the
right concept demands the right prerequisites; a card naming a vague one demanded
nothing. Midway went 20 → 27 as its claims got accurate, ContamCity 17 → 20, Quantum
8 → 16. The only game that fell sharply is `blackout_fable`, 31 → 10, because it could
inherit Blackout's own eleven decisions wholesale — which is the argument for doing
the senior game before its sandbox and its edition.

So read the debt file as **the campaigns' real teaching order, now that the cards say
what they teach.** It is 236 lines, and the three worst are the three worth arguing
about: Midway 27 (the ride sets the day), ContamCity 20 (solutions and gas laws on day
2, the mole on day 6), Quantum 16.

**Four mechanical things that cost time, for whoever does this next.** A stop title in
the review sheet is truncated, and `/tmp/claim.mjs`-style tooling should fail on the
whole batch rather than apply half of it — it does, which is right, but it means
copying the exact title. `— Review` variants are generated by `shapeMissions` and have
no line in the book, so they cannot be claimed directly; fix the parent. A re-claim
leaves stale `takesAsRead` behind and the importer refuses them, so prune after every
batch. And on a junior edition, do not auto-declare: strip and record.

## Working the debt down, and the measurement that was lying about it

The debt went **236 → 206** on claims alone: about thirty rows were foundations that no
card claimed, restored to the stop that teaches them — Midway's net force, acceleration
and simple harmonic motion; ContamCity's measurement concept; Aftershock's stress and
strain; Quantum's T1 and measurement collapse; Groundtruth's charged-sheet field and
instrument bandwidth; the junior editions' matter, averaging and traits. Two attempts
made things *worse* and were reverted (Red Sand, Outbreak's edition): a claim that fixes
three rows can raise four, so **re-measure after every batch and put it back if the
number rises**.

**Then the interesting part.** Three of the analysis scripts written for this pass read
`row.pday` — the day a prerequisite is claimed — and the gate never emitted that field.
A missing field reads as `undefined`, so every row classified as *"claimed by nothing"*,
and the summary said **all 326 rows need a question written**. It was wrong in the
confident direction, and it survived several rounds of my own reading because the number
was plausible: these campaigns *do* have coverage gaps. The gate's own output was right
the whole time — only its `why` string carried the fact, as prose, which is why the
per-theme tables and the summary disagreed and the disagreement is what surfaced it.
`pday` is a real field now. Same lesson as everything else in this file: **a measurement
that produces a plausible answer is not thereby a working measurement.**

With it fixed, the residual 206 lines (269 rows) split into three kinds of work:

| | rows | what it needs |
| --- | --- | --- |
| the prerequisite is taught **later** | 208 | the day order — a re-order or a swap, not a claim |
| claimed by nothing but **mentioned** | 27 | a claim, on a stop that already says it |
| **never mentioned** anywhere | 34 | a question written |

So the remaining debt is overwhelmingly an **ordering** problem, and `/tmp`-style claim
work cannot touch it. What a free re-order would buy, measured per game by hill-climbing
mission permutations with no story constraints at all:

| | now | if the day order were free |
| --- | --- | --- |
| `contamcity` | 22 | **11** |
| `hospital` | 15 | 9 |
| `redsand` | 11 | 5 |
| `headwater` · `quantum` | 12 · 12 | 8 · 8 |
| `aftershock` | 20 | 14 |
| `midway` | 27 | 24 |

Midway is the exception and the diagnosis: its rows are not an order problem at all.
**Work as a force times a distance, and free-body thinking, are mentioned at no stop in
the game** — while torque, power, friction-as-negative-work, potential energy and kinetic
energy all rest on them. That is 17 of its rows and it needs two written stops, not a
permutation.

**So the next unit of work is a re-order pass per game, and it needs the one thing this
pass could not automate: each game's chronology.** The tool is built and takes the
constraints as pairs — `node /tmp/reorder.mjs <theme> '{"pins":{...},"chain":[[a,b],…]}'` —
and Blackout's slate C is the worked example of reading fifteen stakes for those pairs.
Do not run it unconstrained: a park inspection game will happily move a carousel stop
into the closing-report day, which is legal to the gate and nonsense to a player.

## The re-order pass, worked on ContamCity

**20 → 16 debt lines (22 → 18 rows), fifteen day stamps re-set, no stop rewritten.** The
recipe, and what each step actually cost:

**1. Read the chronology out of the stakes as pairs.** ContamCity's fifteen stakes each
open on a day number — *"Day one, and the freight yard fire has been out for six hours"* —
and its causal chains are legible from the objectives: the fire before the river, the
chromatogram before the concentration maps, the pH correction before the reservoir
equilibrium and before the corrosion, the plume before the secondary products, the
treatment before the release. Sixteen pairs, plus three pins: the fire opens, the plume is
day 2 by its own text, the city reopens last.

**2. Search only legal orders, and do not trust an unconstrained number.** A free order
scores 11 rows and moves the carousel-equivalent: it put the plume on day 7 and *"32 days
have been clean"* on day 8. Under the real constraints the best is 18, and the search must
generate random **topological** orders — with sixteen constraints a shuffled permutation is
almost never legal, so rejection sampling reports *no answer at all*, which is how the
first run came back empty.

**3. Expect the gain to come from the day you least want to move.** Every version that
forced *Equilibrium in the Reservoir* to stay late scored 21 of 22 — the whole gain is
moving that day from 12th to 8th, because it is the only stop that claims *Equilibrium and
Le Châtelier*, which four earlier rows want. Its stake framing ("a fortnight of results has
been clean") had to change; its argument — nothing was destroyed, it was moved into a form
that is not in the water today — did not.

**4. Re-stamp the calendar, and expect to find it already wrong.** The shipped book ran
1, 2, 3, 4, 6, 8, 11, 11, 14, **32, 26, 31**, 38, 45, 52 — mission 10 opened *"Day 32 days
have been clean"* and mission 7 *"Day 11 o'clock in the morning"*, both mangled, and the
day numbers were not monotonic with the mission order before anybody re-ordered anything.
The new calendar is 1, 2, 3, 4, 6, 8, 11, 14, 17, 21, 26, 31, 38, 45, 52.

**5. THE CONSTRAINTS ARE WRITTEN IN THE OLD NUMBERING, AND THE RE-ORDER INVALIDATES
THEM.** Re-running the search on the re-ordered book with the same pairs found "18 → 14",
which is nonsense: mission 3 is no longer the river, so `[3,5]` no longer means what it
meant. Translated into the new numbering, the current order is optimal — the identity
permutation. **Translate before believing a second pass**, or the tool will cheerfully
propose undoing the story.

**6. Then re-point everything keyed by stop number.** The re-order renumbered stops, so
`plansData.mjs`'s slate rows drifted and `render.mjs` threw — the third time that guard has
paid for itself. And one new same-day row appeared (reaction mechanisms beside reaction
kinetics on day 9); the only earlier host for kinetics is the free-energy stop, where the
claim would be false, so it stays as one line of debt.

**What it says about the other games.** The gap between the free ceiling (11) and the
legal answer (18) is the story, and it is most of the distance. Budget a re-order at ~30
lines of constraint-reading per game for a quarter to a third of its debt, and do not
expect the ceiling.

## Hospital, and the seventh step nobody would predict

**11 → 9 debt lines**, fifteen shift ordinals re-stamped, no stop rewritten — plus one
content defect the re-order dragged into the light.

Hospital's chronology is thin, which is what makes it a good second case: the only real
pairs are *Ben comes back* (X-Ray Day names "the boy with the sore ankle from your first
day"), germs before immunity before allergy, and the nervous system before the senses.
Five pairs and two pins against ContamCity's sixteen. The order taken runs triage,
digestion, X-ray, nerves, heart, senses, breathing, water, germs, immunity, rehab, skin,
allergy, temperature, the super shift.

**Step 7: in a game with authored review variants, the row count moves for reasons the
search cannot see.** `shapeMissions` builds each day's callback by preferring a `— Review`
variant of a lesson taught earlier, oldest first — so changing the day order changes *which
variants the campaign pulls in*, and the hospital has 105 of them. The search optimised
over the stop set as it stood and predicted 15 → 11 rows; what arrived was 17 rows and 9
debt lines, because a different set of review stops came with the new order. Lines are the
number to watch, not rows.

**And a variant that had never been reached failed the reading gate on arrival.** *After
the Head Bump — Review 2* opens at Flesch–Kincaid 6.3 in a game written for grade 2 —
"Three children arrive after playground accidents… seems confused and is having trouble
answering simple questions". It has been in the book all along; no campaign had ever
included it, so no check had ever read it. Rewritten to 2.3, in the three places it
appears. **A re-order is therefore also a coverage test of the review bank**, and a game
with authored variants should expect one or two of these per pass. The nine lines that
remain are all one shape — the anatomy that a physiology stop rests on arrives a day or two
after it, in a campaign whose days are wards rather than chapters.

## The debt file is the work list now

**186 rows across 26 themes** (the file's own `_` key is eight lines of header, and
counting them as debt is how the total read 194 for an afternoon). Every row is a
claim arriving before something the course itself teaches later. It is concentrated:

| theme | rows | what it is |
| --- | --- | --- |
| `midway` | 22 | the ride sets the day, so the physics order follows the park — and work and free-body reasoning are mentioned at no stop, which is two questions to write rather than an order to change |
| `contamcity` | 16 | after its re-order: the mole and Le Châtelier against a story that has to run in calendar order |
| `aftershock` | 13 | an assessment fortnight where every stop is bound to its own day's event |
| `redsand` `quantum` | 10 each | a sol diary and a fabrication run — both are chronologies |
| `hospital` | 9 | after its re-order; a grade-2 anatomy game with a small syllabus and long dependencies |
| everything else | 1–8 each | a handful per game |

Two cautions on reading it. **A line that disappears because a claim moved is not a
line that was paid** — check that the concept is still claimed somewhere before
deleting anything. And **the claim review is done now** (all ~1,300 stops), so what is
left is not matcher noise: these are real inversions in the content.

## Swap headroom is mostly a lie, and the day stake is what tells you

`/tmp/swapopt.mjs` (the pairwise search) will offer a swap for almost any game, with
the rows it would remove. On the six themes with the largest offers, **twelve of
sixteen proposals were story-wrong and were rejected by reading the day stake**:

- Aftershock offered four and all four failed. "What eight degrees does" *is* Marina
  Court, which is day 4; "The same event, recorded twice" *is* the two-agency
  magnitude day. A stop whose scene names the day's own event cannot move.
- Junior Blackout offered three and all three failed — its N-1 stop sits on the day
  the replacement power arrives down two lines instead of three, which is what N-1
  *is*.
- What did land: junior Aftershock 1 of 3 (both halves improved — locating the
  epicentre belongs on "nothing makes sense yet", and the two-recordings stop belongs
  on the two-numbers day), junior Ice Core 1 of 3, junior Wellmere 1 of 3, and the
  fable took Blackout's own two slate-B swaps rather than the optimiser's.

**The test is one question: does the moved stop still fit the mission topic of the day
it lands on?** Read the stake, not the row count. A swap that trades one topical drift
for another is worth taking only when the other half is a clear improvement; a swap
that moves a stop off the day its scene describes is never worth taking, at any row
count.

## The order to take the games in

Sixteen senior campaigns, nine junior editions, one hospital game at grades 3–4.
Priority is *how much the subject's order carries*, and the equation graph is the
best available proxy for that.

**Wave 1 — the derivation games.** `headwater` (AP Calculus, 13 of 15 equations
already carry a dependency), `groundtruth` (Physics C E&M, 7 of 11), `midway`
(AP Physics 1, **0 of 12** — the most order-dependent course in the catalogue with
no dependency written anywhere). These are taught in derivations; a concept out of
order is a stop that cannot be answered rather than one that reads oddly. Midway
needs its equation graph as well, so budget for both.

**Wave 2 — the chained sciences.** `contamcity` (8 of 12), `redsand`, `quantum`,
`seedbank`, `the_trial`. Stoichiometry, equilibrium, heredity and inference all have
a spine; expect real in-course rows.

**Wave 3 — the systems and method games.** `bring_them_home`, `deepwatch`,
`outbreak_riverton`, `aftershock`, `icecore`, `planetary_defense`, `projecty`,
`sightline`. Method is often the subject here, and a method concept has shallower
dependencies, so expect more declarations and fewer re-orders. Sightline is
AP Psychology and *identify the bias* is legitimately a discrimination task — do not
force a chain onto a course that does not have one.

**Wave 4 — the audiences that need different words.** `hospital` at grades 3–4, then
the nine `_ms` editions after their parents, with the derive-edition question from
the engine list settled first. A junior list is 16 concepts, so it is a fifth of the
writing — but its `t` has to be written for an eleven-year-old, which is not a
translation of the senior sentence.

**Per game, once step 1 is done, the rest is about a day:** Blackout's steps 2–6 were
twelve claims, thirty-five declarations, three ordering fixes, one question and a
re-order. Step 1 is the two thousand words.

---

## What "done" looks like for a game

```sh
node engine/dev/conceptOrder.mjs <theme>          # green, with the exceptions counted
node engine/dev/conceptOrder.mjs --selftest       # five cases
npm run check <theme>                             # everything else still green
node plans/sequence.mjs <theme>                   # the audit, published beside the plan
```

and in the game itself, on the Key concept door of the first day's stops: a concept
whose prerequisites either arrived earlier or say on the card that they are taken as
read. **Play the first two days.** Both of the defects a player found in Blackout —
the printed ordinal and the missing f₀ — were invisible to every check in this repo
and obvious in thirty seconds of reading the card.
