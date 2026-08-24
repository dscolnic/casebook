---
name: alamos-measurement
description: The most expensive rule in the repo, worked: twenty-odd live defects that passed every assertion, and the selftest discipline that catches them (write the case where two equal inputs score equal, then put the bug back). Also the importer-before-renderer rule for dropped book keys, what fieldCoverage reports, the three estimate-panel defect classes, and equationSupply. Read before writing or trusting ANY checker, metric, or count.
---

## The most expensive rule in this repo

**A measurement that produces a plausible answer is not thereby a working measurement.**
Every check here asserts that content is wrong in some way; a check that asserts nothing
about *itself* reports confident numbers that are partly an artifact of its own formula.
So when a metric is added, **write the case where two inputs that should score the same
actually do — before trusting anything it says**, and confirm it by putting the bug back
and watching that case, and only that case, fail.

It has been paid for at least fifteen times. Each row is a live defect that passed every
assertion available:

| Where it bit | The lie | The fix |
| --- | --- | --- |
| Flesch–Kincaid vs house style | F–K is words-per-sentence and syllables-per-word only, so `11.4` (one word, one syllable, plus a full stop the sentence counter counts) scores differently from "eleven point four". The first published ranking was partly a ranking of house style: Red Sand (all numbers spelled out) came second, Aftershock (the opposite) ninth | `tools/readability.js` normalises both to one dotless token; `engine/dev/readabilityParity.mjs` asserts the same sentence scores identically written both ways. Books stay free to spell numbers as they like |
| The sentence boundary | `normaliseNumerals` swallowed across sentence ends: "…the second one. Three features…" became "…the second 0 features…", so one card read 38 words-per-sentence where the text has 18. Surfaced because a guide measured over the 28-word cap while containing no sentence longer than 22 — the prose was right and the ruler was wrong | The swallower stops at terminal punctuation; `readabilityParity` carries the pair both ways **and asserts the sentence count directly**, because parity alone cannot see a boundary both forms lose identically |
| Nine junior editions | Every passage at F–K 4–6, all sixteen checks green, and the first sixth grader found it much too hard. Reading score cannot see that "which explanation is consistent with all four readings" demands more than "how far did it move". The prose came down two grades; the *demand* stayed where an AP course had put it | `engine/dev/questionLoad.mjs`, at grade 8 and below — see its four numbers below |
| The instrument budget | It counted instruments and measured none. A grade-6 TRACE with fine prose (scene 7.4, verdict 6.3) carried the **twelfth-grade board**, unchanged: five channels, four sources, all-or-nothing. **37 of 38 junior instrument boards were identical in size to their AP parents** — `derive-edition` rewrites the words and copies the block | Two more `questionLoad` numbers: four items in an exactly-graded list, six where you compare and pick one. Eight stops across six editions failed; all eight fixed by dropping the second distractor, not the argument |
| A term built of ordinary words | `checkJargon`'s lexicon is morphemes, so "cabin pressure" and "power bus" — six ordinary words, four syllables — were invisible to every test. Day 1 of Bring Them Home used five such terms before explaining any | `PHRASES` in `checkJargon.mjs`, matched whole, applied at grade 8 and below |
| Once is not teaching | A glossary chip explains a word to somebody who thinks to open it; a scene to somebody reading the scene; a verdict to somebody who has just been wrong. Three readers, often the same child on three days | A junior edition explains every term in at least two places, in different words |
| The shift opening | Read before every day, inherited from the senior games almost verbatim: mean 107 words, up to nine sentences, one of them 33 words | `checkStory` caps a junior stake at 85 words and any sentence at 24. The four beats fit in seventy |
| `fieldCoverage`'s own carver | Every instrument panel opens with `ask(ch, fallback)` reading `ch.question \|\| ch.task`, but `ask` is `const ask = (ch, f) => …` and the carver knew only `function name(){}` and `const NAME = {}`. Nine instruments were reported mute. The `missing` guard could not catch it — that checks only entry points, and a shared helper going missing is exactly the hole it does not cover | Three selftest cases name `ask` directly |
| `readsIn` matched a literal dot | `lesson?.concept` was not a read, and eight fields in `questionUI.js`/`instruments.js` are reached only that way — `guide`, `rules`, `assumes`, `equations` among them. A measurement must not tell `lesson.guide` from `lesson?.guide`, because the player cannot | Three selftest cases |
| `scene` checked, `story` rendered | All five gates read `scene ?? story`; `storyBriefText` alone read `lesson.story \|\| …`. 122 stops write both and mean different things, so on every one the reading-level rule, the 40-word rule and the GIVEAWAY probe graded a string the player never saw. ContamCity's grade-6 edition checked 26 scenes at 5.8 and displayed stories at 12.5 | One character. A set of read field *names* cannot see a fallback chain's **order**, and the order was the whole defect, so `briefPrefersScene()` reads the chain itself |
| `symbolSignature` | Wellmere authors `Ne = 4NmNf ÷ (Nm + Nf)`; the keyword list asked for "contributing plants". Eighteen equations had a stop whose arithmetic states them and whose keywords miss | A stop that *writes the equation* computes it whatever the keywords say. A measurement must not tell `Nₑ ≈ 4NmNf / (Nm + Nf)` from `Ne = 4NmNf ÷ (Nm + Nf)` |
| `instrumentWork`'s first version | Harvested captions and was worse than the bug: a caption is both the name of a quantity and the name of the topic, so a STRESS row "Temperature rise that doubles reaction rate" cleared `rate = k[A]ⁿ` on a board computing no order. Three of the eight gaps it cleared were wrong | What survives is the two things that cannot be a topic word: an authored `formula`, and the board's own numbers — a value with at most a short unit, because `"98 % germination"` leads with a digit and is a sentence |
| `row.pday` | Three analysis scripts read the day a prerequisite is claimed, and `conceptOrder` never emitted the field. Every row classified as "claimed by nothing" and the summary said all 326 needed a question written. Plausible, confident, wrong. Only the gate's `why` string carried the truth, as prose | `pday` exists. With it fixed, 208 of 269 rows are prerequisites taught later, 27 want a claim, 34 are never mentioned |
| `checkNames` on an initial | Split "the laboratory director, J. Robert Oppenheimer" at the `J.` and reported an introduction that was right there | An initial is not a full stop |
| `cardLoad` on landing | Reported 0 stops over target the moment fold-by-default landed — it modelled the three lines the four questionUI panels print and never looked at the 24 in instruments.js, so every instrument stop was counted three blocks light. True figure: 244 | It renders those panels now, and the target is per tier |
| Two copies of one rule | `export-book.mjs` wrote each `takesAsRead` out as the player-facing `assumes` line, so a recovered book silently lost the field four checkers read — and `bookParity` could not see it, because the generated content is byte-identical either way. And `import-book.mjs` kept its **own** keyword matcher: when `keywordHit` learned `3 : 1` and `3:1` are one ratio, the gate saw a computed equation while the importer stamped it as mentioned | The importer imports the shared function. Two copies of one rule drift the first time either is corrected |
| The concept picker | "Two of 41 wrong" was the picker grading its own homework. Read by hand against the scenes, **nine** of Blackout's 41 were wrong, and three were unreachable by keyword at all — the stop whose subject is synchronising says only that four quantities have to agree | `concept:` is authorable, taking the number or the exact title, with `pickKeyConcept` as fallback |
| `ordinary()` | Fixing it so "moved" is as ordinary as "move" (a length floor was rejecting the stripped stem) reclassified "sided", which cost Headwater's `Limit` its `core: true` — it had been core only because "one-sided" looked technical | **A vocabulary list is load-bearing in four tools; change it and re-import every book before believing `bookParity`** |
| `baseTitle` required a digit | Hospital's 105 review variants are `— Review 3`; Red Sand's 8 and Sightline's 9 are bare `— Review`. Two campaigns' review stops were reachable through no day at all, and the concepts they claim were claimed by nothing | One `REVIEW_SUFFIX` regex, digit optional, used by both the stripper and the test. Cleared three `concept-debt.json` rows |
| `diffSnapshots` keyed `group:index` | The lesson index is a *position*: `import-book.mjs` writes each group's CURRICULUM in the order its stops appear, so exchanging two stops of one area, or moving one to another day, renumbers every lesson after it. Six of eight reported losses were two DIST stops trading places, and the two "lost" equations are computed by the other half of the swap; later, moving one stop reported an `assumes` line lost that was still in the book | **Fixed.** `pairStops` pairs by identity before anything is compared — `title` (unique across all 1,267 stops in all 29 campaigns) with `takeaway` as the fallback, so a deliberately retitled stop is still recognised as itself. A pair whose key moved is reported as a renumber, two that swapped as one exchange, and only a stop matched by neither is a loss. Six selftest cases, each verified by putting the key-keyed comparison back. **A wall of false failures is how a gate stops being read** — worse than the drift it was written to catch, because the first real loss it found afterwards had been sitting among them |
| A slate row naming a stop by number | Stop numbers move. Two swaps renumbered four stops and three rows in `plans/plansData.mjs` went on pointing at the number while meaning the question — one at a stop rewritten into something else | Every row carries the title it was written against; `render.mjs` throws on a mismatch |
| `askRule: true`, validated four ways and never emitted | `import-book.mjs` refused a rules list under three, refused a list without the flag, refused a candidate claiming a rule not in the list, and refused a step with no rule — then returned a derive object carrying `start`, `goal`, `startNote`, `rules`, `steps`, `hint` and `caption`, and **no `askRule`**. So Slack Water, Overwind and Dark Fibre authored it on twelve stops each and Ground Truth on eleven, and the rule half of all **177 steps was inert in the shipped game**. `bookParity` cannot see a dropped flag — the content is byte-identical either way, which is `export-book`'s `takesAsRead` blind spot — and `fieldCoverage` reads `ch.x`, one level above `ch.derive.askRule` | The importer emits the flag. `engine/dev/deriveRules.mjs` asserts it on the content: a `rules` list without `askRule` reaches no screen |
| An estimate board grading a different question | Deep Watch's day 5 asks "about how much gauge pressure is the sea applying at 90 metres?", states p = ρgh, gives a density and a g — and puts a **bilge-flooding board** in front of the player: 8 cm of rise a minute, 11 gallons a centimetre, a 55 gpm pump, graded to a target of 143 with `units: gallons per minute`. Then the solution computes 9.05 × 10⁵ Pa. Carried into the AP edition too. `validateContent`'s formula check passes, because target *does* equal formula(values[correct]) — the tiles and the question are each internally consistent and about different things | `engine/dev/boardAnswer.mjs`. Fires only when the solution's operands are none of the graded tiles **and** the target is stated nowhere in the solution: 2 of 307 boards, both real. Condition 1 alone flags ten and eight are benign, because a solution may show a later stage of its own working |
| The scaffold's own words, shipping | `carrying` closed fifteen days on the template's instructions to the author — "Say how it came out, in the same voice…", "you held the corridor, you brought them up" — including a reference to Blackout's fiction. And `checkStory` **passed it for the worst possible reason**: the rule is "the last paragraph is addressed to the player and says what they did", and the placeholder *quotes an example of exactly that*. A measurement whose subject is a description of itself | No shipped card may share ten words with `themes/_template/theme.js`, read as text from its two card blocks — not the module (the scaffold's generated content does not import) and not the whole file (joining every quoted string moves the sentence boundaries) |
| A digit where the pronoun belongs | The numeral pass could not tell a count from a pronoun, so 27 books shipped "She is the 1 who keeps saying so", "The earlier 1 is 98°F", "the radius is not the 1 on the 1974 drawing", "1 governs the interim in 20 days" — and **ten of Hospital's review-variant titles** read "6 Patients, 1 First Room", "Follow 1 Breath", while the base titles were intact. 106 occurrences fixed | `engine/dev/numeralWords.mjs`, on a **closed list of words that can only follow the pronoun**. "1 cup", "1 mole", "1 barn", "Day 1 had 96 events", "1 of 600 allowed solutions", "goes to 1 at t = 0", "a 3 : 1 fit" all keep their digits. In a *title*, any bare "1 " fires, because no title in the corpus counts with it |
| The youngest audience was the one the gate could not fail | `questionLoad`'s four numbers apply at grade 8 and below, and it decided whether to fail on `!!editionBase(name)` — is this a derived edition. Run across all 42 themes, **Hospital Heroes was the only theme it reported at all and the only one it could not fail**: 110 findings, advisory for ever, at grade 2. The twelve junior editions were swept and pass, so the numbers existed because of a lesson learned on the editions and the one grade-2 campaign was exempt from them | The test is the reader's age, not the file's provenance, with `questionload-debt.json` beside it. 51 of the 110 are one decision: a four-card SEQUENCE graded as one exact permutation with no feedback is a 1-in-24 guess for a seven-year-old |
| A panel field keyed to nothing | Bring Them Home's STRESS listed three criteria keyed `life_support`, `entry_margin` and `propellant_margin` against scores keyed `returnHours`, `entryMarginDeg` and `propellantMarginKg`. `instruments.js` renders the table as `scores[candidate][criterion.key]`, so **every cell in every column was an em dash** and the panel put no numbers in front of the player at all | An importer refusal, and a trap: a criterion whose key no candidate scores for |
| `equationCoverage` on a prose equation | A junior syllabus writes its equations as words — "part = whole × share", "spare = what can be made − what is being used" — so `symbolSignature` finds nothing structural and the whole test rests on a five-word keyword list. `blackout_ms` recorded four gaps of which one was false: "part = whole × share" **is** computed, twice, by boards whose relationship reads *"Lost = what it carries × the share lost"*, which the list (`per cent`, `percentage`, `share of`) cannot see. **A debt file recording gaps that are not there is worse than none**: the work list is wrong and the real gaps hide among the false ones | The keyword lists carry `the share`. One row cleared, verified by hand, and a before/after diff across all 42 themes confirmed nothing else moved. The general fix — an equation's own content words as keywords — was written, measured at zero effect, and reverted |

**And two lessons from getting the measurement wrong while reviewing all 42 campaigns.**

- **A count is not a finding until the renderer is read.** `deriveRules.mjs`'s first
  version failed 44 derivation steps whose candidates all carry one rule, on the strength
  of a sentence in this file — and the panel offers the chain's **whole** `rules` list, not
  the candidates', so every one of those steps is answerable. What such a step actually
  loses is the *coupling* between the two halves, which is worth printing and is not a
  defect. Worse: those 44 false failures would have sat on top of the real defect, which
  was that none of the 177 rule questions was being asked at all.
- **Grep for the field the contract names, not the field you expect.** Four campaign
  reviews reported a SCIENCETANK with "no evidence", from a grep for an `evidence:` key.
  There is no such book key — `rules` is the authorable scoring rule and **the evidence
  moves up into `guide`**, which is where all twenty tank stops carry it. Four findings
  withdrawn.

Related traps of the same family:

- **A trap that fires is not thereby a trap that works.** Two were firing on the wrong
  refusal — a BELT mutation tripping the duplicate-name guard and a SPOT one tripping the
  wanted-by-every-instruction guard, each before reaching the rule it was written for.
- **All four `warmups:` refusals sat below the line that reports them**, inside the emit block
  which runs *after* `if(problems.length)`, so a slot name that is not one of the seven imported
  clean and always had. **A refusal nothing exercises is a comment.**
- **A limit the format's own minimum cannot satisfy is a ban on the format.** The importer floors
  a TRACE at four channels and an ATTEST at four claims, so a junior board sits *at* the limit;
  a first attempt also capped `sources × 2^channels` at 32, which no legal TRACE can reach. That
  number is reported, not enforced. Likewise **conjunctive grading is reported, never failed** —
  TRACE marks "name the source" and "keep the right channels" together, but CHAIN and ROUTE are
  two-part by construction and failing it would ban them.
- **Ask what a player who understood nothing would score, before believing any pass mark.**
  Three formats shipped a first version too generous the same way. SPOT's was sharpest: scoring
  every item, a run that went on applying the *withdrawn* instruction scored 86% and passed,
  because most of what arrives is wanted by neither instruction and correctly ignored. Only
  **discriminating** items are scored now — wanted by the instruction in force, by the one it
  replaced, or taken by the player — and the same run scores 55%.
- **A frame count is not a clock, and a `requestAnimationFrame` promise is not guaranteed to
  settle.** The driver budgeted a 45-second run at 4200 frames assuming 60 fps; headless Chrome
  ran at 123 and reported a working format as broken. And a page behind twenty mounted panels
  stops being given frames at all, so a bare await never resolves and the driver hangs at 0% CPU
  with nothing printed. Waits are bounded by wall time and raced against a timer; a format
  running on authored seconds is driven on a **rescaled copy** (HOLD's physics is rate × time,
  so every time ÷ 15 and every rate × 15 traces the same curve). Any future format on its own
  clock needs the same.
- **A `needs` graph can be non-terminating rather than wrong.** Five of sixteen courses came out
  with a cycle — intermolecular forces ⇄ phase changes, rate constants ⇄ activation energy,
  reliability ⇄ validity, α/β ⇄ sample size, decibels ⇄ signal-to-noise — each a pair where the
  physics runs one way and the prose reads both. A cycle overflows the depth calculation instead
  of reporting anything, so **check for cycles the moment a graph is authored**. Three more were
  self-references, which the applier now refuses.
- **`- >-` inside a sequence had never worked.** `tools/yaml-lite.mjs` handled a block scalar
  after a key and not after a dash, so four paragraphs arrived as the literal `">-"` with the
  prose skipped as a deeper block. Quantum's book was the only one that had ever used the form.
- **Quote any inline `{ … }` value containing a comma.** `yaml-lite` split a flow map on every
  top-level comma and silently skipped any fragment without a colon, so `{ landmark: the second
  door, hinged inward }` arrived as "the second door". Quantum, Blackout and Aftershock shipped
  36 such lines through every check. The parser refuses a colon-less fragment; a braced value
  with no colons anywhere is still a string, which is what `{0} ÷ {1}` needs.
- Both yaml bugs are the same class: **what reaches the game is a valid shorter string, so
  nothing downstream can tell.**

## When a book key stops reaching the game, look at the importer before the renderer

`fieldCoverage` compares shipped content against the renderers, so a field the *importer* drops
is invisible to it — nothing is in the content to be uncovered. Two cases, both of which had
never rendered:

- **CHAIN's per-link `reading`** — the observed state of that link, and the only thing making
  "which one governs" answerable rather than a guess. Authored in eleven of fifteen books under
  three names (`reading`; `capacity` + `unit`; `evidence`, once as a chain-level map keyed by link
  id with a key naming no link at all), and mapped by none. Meanwhile three games printed hints
  saying "inspect the link readings" with no numbers on the screen. The fix is one name —
  `reading` — with the other three **refused** rather than aliased, because an alias is how a
  field ends up under four names next time.
- **TRACE's correction.** A player was told "a threefold Flats-to-vault ratio becomes roughly 4.8
  relative to competent rock" against a board printing neither the 1.6 nor the 4.8, whose two
  dependent channels read `3.0 (expected value published in the fortnight report)` — a provenance
  note with no statement of what 3.0 counts. The book had authored it as
  `originalRatio`/`referenceAmplification`/`correctedRockRatio`; none were mapped. `correction` is
  now `what`/`was`/`now`/`effect`/`corrected`, **all strings**, printed as a given above the
  channels with `corrected` held for the verdict. Strings because a numeric
  `referenceAmplification: 1.6` rendered by the engine is how `3.0` got onto a board meaning
  nothing: **a correction is a factor in one game and a clock offset in another, and the unit is
  the author's to state.**

Two dead keys came out with it: `tolerance` on a TRACE (nothing about a trace is graded
numerically) and a channel's own `independent:` flag, a second description of the `independent`
list the grade actually reads, dropped on the floor in six books. All refusals are trapped in
`npm run traps`: the old numeric keys by name, a correction whose `was` equals its `now`, and a
channel `reading` that is a bare number. **A `need()` that refuses an unknown key is cheap; a key
silently dropped is a sentence nobody will ever read.**

## What `fieldCoverage` reports, and what is left over

It reads the *renderers* rather than the content: carves `questionUI.js` and `instruments.js` into
named blocks, follows each format's panel through the functions it calls, and collects every `ch.x`
and `lesson.x` on that path. A sentence appearing on none of them reaches no screen. **Advisory**,
because neither finding is clean and a gate in front of unfinished content work acquires a
permanent `--advisory` flag.

- **Three formats print a hardcoded instruction over the author's own**, at 164 stops: SEQUENCE
  (98 of 176), PROTOCOL (47 of 126), SCIENCETANK (19 of 32). SEQUENCE says "Put the 4 steps in
  order, earliest first" whatever the book wrote, and about one ordering item in nine is graded on
  cost, risk or reversibility rather than time — ContamCity's evidence workflow, whose four cards
  are photograph, headspace, non-destructive spectrum, destructive method, three of which consume
  nothing. **`axis` and `ends` are the fix** — the instruction line and the two rail captions,
  authored per stop — and eleven stops across eight games carry them. PROTOCOL and SCIENCETANK are
  the same fix and have not had it.
- **122 `story` values, 8,589 words, are displayed nowhere.** Still in the books, still exported.
  Fold what each adds into its scene or delete it; a stop should not carry two situations. The
  drifted stories run 42–96 words against the scene's 27–38, and ContamCity's ordering stop opened
  on "a destructive method gives the best identification and gives it once" — which is the answer
  to the question beneath it.

The selftest is load-bearing and earned that on its first run by failing an assertion its own
author had written backwards. Two cases would otherwise invert silently: if the sink list stops
being applied, `setup` reads as covered and the file reports all-clear; if `showChallengeForStop`
is followed, every format inherits every other format's reads and it reports all-clear again. Both
were live bugs during the hour it was written.

## Three defects the estimate panel could hide

All found by a player, all now in `validateContent`, each a class rather than a stop.

- **A stop that declares two equations.** "Degrees lost = energy lost ÷ energy for one degree.
  Energy lost = watts × seconds", three slots, a unit conversion already done in the prose. One
  relationship per stop at grade 8 and below, and `questionLoad --sweep` lists multi-step estimates
  in *every* game because the same smell is worth seeing at any level.
- **A tile whose label is not its value.** The player clicks the label and the panel adds the value,
  and nothing compared them. `apply-conversions` refuses to guess at a `labels` list whose length
  changed, so a re-targeted estimate keeps the old tiles: Outbreak's grade-6 panel read 90, 99, 10,
  9,801 over values 10000, 0.01, 0.9, 0.99, and Deep Watch's asked about pressure at ninety metres
  while grading gallons per minute. Ten stops across seven games. Both readings are internally
  consistent, which is why the formula check passed them.
- **An equation chip that is not the stop's equation.** The syllabus attaches an equation by
  keyword, and a bare key like "how long" put `time = distance ÷ speed` on a thermal card whose
  panel divided joules; `activity` did it to Project Y's critical-path stop, `megawatt` to
  Blackout's demand forecast. The check compares the chip against the relationship, the template and
  the worked solution — in words where the equation is in words, and by symbol where it is
  `df/dt = (P_gen − P_load) / 2H`, because those two currencies share no vocabulary. Six games were
  wrong; three because the equation the stop computes was not in the syllabus at all.

Its `--selftest` runs inside `npm run check` on two whole fixture campaigns whose answer is known.
Not ceremony: it failed on its first run and found two real holes, one a gate that only fired on
BALLPARK and so could not see senior-high arithmetic left on a retyped stop.

## The fourth one: the card's arithmetic against the equations the card gives

A player on Blackout's day 1 said the stop required equations that were not given, and it did. "For the
same real power, what happens when voltage steps from 20 kV to 400 kV?" — four options pairing a current
change with a loss change, so answering it is `P = IV` (current falls 20×) and `P = I²R` (loss falls
400×). The campaign computes neither until day 4, and the one equation printed on the card was the turns
ratio, which the question never uses because it hands you both voltages.

**The cause was a rule doing its job, in the one case where it should not.** The importer drops an
equation chip from any day before the day something computes it — Quantum's day 1 showed four formulas
and used one — and `normalize.js` applies the same rule again at load on the shaped day. Right for a stop
that merely *mentions* an equation; wrong for one whose own options and verdict work numbers with it,
where the chip is not decoration but the tool the question is asked with. `demandsEquation` in
`tools/syllabus.js` is the test — the equation's symbols written in what the card shows, or its keywords
beside arithmetic — the importer stamps `demanded: true`, and both drop passes keep a demanded chip. A
flag rather than a second copy of the rule, because the engine does not import the syllabus.

**Then the cap hid what the exception had saved.** The chip row is two per card and `card: false` past
that, and the Background door inherited the same filter — so on six stops the demanded equation reached
*no screen at all*, which is `fieldCoverage`'s defect in the one field a question is worked from.
Midway's day 3 derives a loop speed with `safety factor = capacity ÷ demand` hidden; Headwater's day 2
integrates a drain law that was not on the card. The row keeps its cap; the door now spells out every
equation the stop computes with or is worked from.

**`engine/dev/equationSupply.mjs` is the gate**, inside `npm run check`, and its rule is what counts as
having been given an equation: a question on an **earlier** day computes it (strictly earlier — a day
opens its stops in any order), or this stop computes it, or the card prints it. **A `takesAsRead`
declaration is deliberately not a supply**, which is the whole point: Blackout's stop declared
"electrical power and energy over time — taken as read" and that declaration is exactly what let a day-1
CHOICE rest on two uncomputed relations with every other check green. `equationOrder` cannot see it
because a CHOICE computes nothing and is invisible to that gate at both ends; `syllabusEquations` asserts
no chip is shown early, which says nothing about an equation nothing computes; `conceptOrder` is
satisfied by the declaration.

**The measurement was wrong twice before it was right, both times by being plausible.** A first pass
counted "a question mentions an equation the campaign computes later" and reported 35 across 14 games —
but most of those print the equation on the card, so the player has it: Deep Watch's Snell's law and
`d = ½vt` are chipped on the stops that use them. Then the corrected version passed Blackout — the stop
this all came from — because it read only the verdict, and that stop's arithmetic is in its four
**options**, with the `why` merely repeating it. Reading the options is what made it fire. The honest
count was **14 gaps across 9 themes**, all equations computed later rather than never, and they are all
supplied now: the debt file exists and is empty.
