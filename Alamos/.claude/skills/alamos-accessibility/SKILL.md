---
name: alamos-accessibility
description: The accessibility pass — how a question card is rewritten so a sixth grader can read it with the course's judgement left intact. The seven things to find before touching prose (a load-bearing fact missing from the stem, stem/option grammar mismatch, the key identifiable by clause shape, one quantity under several names, a forward reference, a guide that states the answer, a scene promising a decision the stem never asks for), the rewrite rules (two handles one word each, abstract nouns out, one real analogy, fragments allowed), the shape the book still requires, and the word/Flesch-Kincaid evidence to report. Read before rewriting, simplifying, or lowering the reading level of ANY player-facing question.
---

# The accessibility pass

**Hard concepts explained for sixth graders.** Reading level drops; demand does not.
That sentence is the product, and this file is how a card is brought to it.

The worked instance is `redsand KINET-1` — *Rate is not yield*, sol 1, the first
question in the game. Flesch-Kincaid 7.9 → 4.2 with the AP judgement untouched, and
the two mistakes made on the way are recorded below because both are cheap to repeat.

## Edit the book, never the generated content

`books/<theme>.yml` is the source. `themes/<theme>/content/curriculum.js` is
regenerated and hand edits are lost on the next import. Finish every card with:

```sh
node tools/import-book.mjs books/<theme>.yml <theme> --verify
npm run check <theme>
```

## Read the card cold first, and report what fights the reader

Do this before changing a word. Each of the seven is a live defect found on the
first card the pass was run on.

1. **Is a load-bearing fact missing from the stem?** KINET-1 turned on the reaction
   being exothermic and the word appeared nowhere on the card — *"a heat-releasing
   reaction"* sat once inside the `guide`, which is scaffolding. **A fact that lives
   only in the scaffolding is a fact the player can skip.** Check `guide` and
   `background` for anything the answer depends on, and move it into the stem.
2. **Is the question well-posed at all?** KINET-1 asked what a 40-degree rise does to
   per-pass methane. Flow was fixed, so residence time was fixed, and a
   *kinetically* limited bed run hotter gives **more** methane per pass, not less.
   The key was correct only if the bed was already at equilibrium, and nothing said
   it was. One clause in the scene fixed it. The stop that teaches that very
   distinction — `EQUIL-7`, *Change the time, not the ceiling* — sits eight days
   later, so the card was presupposing its own answer.
3. **Does the stem's grammar match the options'?** *"What happens?"* takes a clause,
   so an option beginning *"Faster,"* is not an answer to it. **This one was
   introduced by the rewrite itself** — compressing four options to fragments broke
   agreement with a stem nobody had re-read. If two quantities are wanted, the stem
   must name both: *"What happens to the speed, and to the methane it ends up with?"*
   Then *"Neither of them changes much"* has an antecedent, too.
4. **Is the key identifiable by clause shape?** Compare structure, not just length.
   On KINET-1 every distractor ended in a `since …` justification and the key did
   not, and the key was the only hedged option (*"falls a little"*). A test-wise
   student picks the odd one out with no chemistry. `answerShape` checks *length* as
   a binomial tail per game and will not see this.
5. **Does one quantity carry several names?** *yield* / *the amount at equilibrium* /
   *what a single pass can give*, across four options, is three quantities to a
   reader. Worse, *"a single pass"* is per-pass conversion — a kinetic-and-
   thermodynamic quantity — used where the teaching is that the two are separate.
6. **Does anything depend on a concept taught later?** *"a single pass"* implies a
   recycle loop; per-pass against overall conversion is concept 8, taught on sol 11.
   Check each term against the day it is first taught.
7. **Does the guide state the answer, or count the wrong options?** KINET-1's guide
   gave both mechanisms, the conclusion, *and* "two of these options treat speed and
   yield as one thing". A reader who takes it seriously then hunts for a subtler
   question that isn't there. Over-scaffolding reads as a trick.
8. **Does the scene promise a decision the stem doesn't ask for?**
9. **Do the stem and the explanations speak one vocabulary — and does the stem set
   it?** This is finding 5 turned outward, and it is the one the pass itself keeps
   creating. Rewriting the `guide` and `why` in plain words while leaving the
   `question` alone produces a card where the stem says *"the methane the mixture
   settles at"*, the options say *"More methane"*, and the verdict says
   *"equilibrium"* — three names for one quantity, all introduced by the fix. On the
   first Red Sand batch **five of seven cards drifted this way**, and one contradicted
   itself outright: ELEC-1's stem said *"match each part of the cell"* while the
   rewritten guide correctly pointed out that the fourth item is not part of the cell
   at all. **Read the stem, guide, why and every option together as one text, last,
   and make the stem's words win.** *"One setting may
   rescue the schedule or deepen the shortfall"* sets up a choice; the stem then asks
   what physically happens.

## Then rewrite to these rules

- **Two handles, one word each.** Pick the quantities the card turns on, name them
  in the plainest words available — *speed*, *ceiling*, *how much it ends up with* —
  and use **those exact words** in the guide, in every option, and in the verdict.
  Repetition of a short handle beats precision of a long one, and this is the change
  that moves the score most.
- **Keep the official term. Gloss it on the spot, then use the gloss.** Deleting the
  vocabulary is not the pass — a student who never meets *equilibrium yield* cannot
  read their own textbook. Name it, define it in the same breath in the plainest
  words available, and let the plain half carry the rest of the card: *"its rate —
  how fast the gas reacts"*, *"its equilibrium yield — how much methane it ends up
  with once it stops changing"*, *"the activation energy — the push a collision needs
  before it reacts"*. Term first, gloss immediately, handle thereafter.
- **Prefer the official term as the handle when it is already short.** *rate* and
  *yield* are one word each and are what the course calls them, so they beat any
  invented substitute. Reach for a plain handle only where the term is long
  (*overpotential* → *the wasted volts*, glossed once) — never to avoid the term.
- **Gloss once per card, not once per book.** A card is met on one day and may be the
  reader's first sight of the word. The cost is a clause; pay it every card.
- **One concrete analogy per mechanism, and it must be the real mechanism.**
  Le Châtelier as *"adding more of what it is already trying to get rid of, so it
  backs off"*. Not a simile standing in for a mechanism.
- **Fragments are allowed and read faster.** *"How fast the gas reacts. And how much
  methane it ends up with once it stops changing."* — grade 1.2, and no checker
  objects. But see the voice rule: a card made entirely of fragments reads as a
  checklist, not a teacher.
- **Write the `guide` in a good teacher's voice, not a checklist's.** The failure mode
  is a card that opens on a count and continues in bare imperatives — *"Four reasons
  to clean the stream first. Ask of each whether it names a temperature…"*. Correct
  and lifeless. A teacher speaks to the player, stands in the scene with them, hands
  over the vocabulary, and leaves the judgement: *"Cho has a reason for refusing that
  stream, and it is not fussiness. Follow the pipe down with her…"*. Use the cast —
  it is their board, their argument, their reason for asking. Second person is fine.
  Warmth is not padding.
- **The `question` gets the pass too, not just the prose around it.** It is the one
  sentence the player must parse to answer, so it is the *last* place to leave an
  ungloossed term or a clause that no option answers. On the first Red Sand batch six
  of seven stems were left untouched while everything around them was rewritten —
  check every stem explicitly, and say which ones you changed.
- **Every option: same subject shape, same connective, no hedge on the key alone.**
  Keep the discriminating pair differing in one word where the chemistry allows.
- **Keep the technical term where the course needs it, glossed once in plain words.**
  Hiding the vocabulary is a different failure from hiding the demand, and the
  tagline only asks for the second.

## The shape the book still requires

The pass lowers the reading level inside the existing bar; it does not relax it.
See `alamos-copy` for the whole bar.

- `scene` 30–45 words, **situation only** — no teaching, no mechanism. A measured
  fact about the plant's state *is* situation, which is how fix 2 is delivered.
- `guide` says what to check. Never which way anything moves, never how many options
  are wrong.
- `why` 70–90 words of mechanism.
- One rebuttal per wrong option, naming why *that* option fails.
- `takeaway` is the **principle**, not a restatement of the key. It prints *before*
  the question and `readerProbe` fails the build if it repeats the keyed answer's
  words — it caught a first draft at 73% overlap. *"Temperature acts on the speed and
  on the amount at balance separately, and for a reaction that gives off heat the two
  move opposite ways"* passes; the same sentence phrased as the answer does not.
- `background`: real mechanism the reader can use. Not commentary on how the question
  was written.

## Budget and evidence

**Three `background` paragraphs, and accept the growth.** Replacing boilerplate with
real mechanism costs words and the glosses cost more — Red Sand's cards run +25 to
+115. That was decided and it is the standing rule: the mechanism gets the room it
needs. Report the count before and after anyway, so growth stays visible.

Everything else stays tight. Growth is licensed for `background` and for glosses, not
for a longer `scene`, a chattier `guide`, or a `why` past 90 words.

**Hard cap: 15 words a sentence on average, nothing over 25.** This is the rule that
went missing on Red Sand's first seventeen cards and it is the most important one on
the page. Six of those cards came out of the pass *harder to read than they went in*,
and the cause was uniform: teacher voice written as long sentences. The card that
worked averaged 15.7 words a sentence; the ones that regressed averaged 17 to 18.

Keeping the official term costs syllables, and that cost is correct — technical cards
sit near 1.6 syllables a word and cannot go lower without deleting the vocabulary.
**Sentence length is the lever that is free.** It costs no term, no gloss and no
mechanism, and it is entirely under your control. A good teacher is warm in short
sentences. Warm in long ones lands on a sixth grader as the same wall of prose with
friendlier furniture.

The failure looks like this — one 38-word sentence from a rewritten `background`:

> Electrons that did something else still crossed, and still counted as charge — a
> side reaction at the electrode, a shuttle current carrying charge back and forth to
> no purpose, hydrogen recombining inside the cell before it ever reaches the
> separator.

Three mechanisms in one breath. It wants to be four sentences. **A list of three
things is three sentences, not three clauses.** Em-dash appositives and
semicolon-joined independent clauses are where the words hide — count them.

## What is measured, and what is GATED — they are not the same

`npm run check` runs `engine/dev/plainQuestions.mjs` over every question card. It
**gates three numbers and merely reports the grade**, and the reason is arithmetic.
Flesch-Kincaid is `0.39 × (words/sentence) + 11.8 × (syllables/word) − 15.59`. The
syllable term carries three times the weight, and on a question card those syllables
*are* the course. So the grade a technical card can reach is fixed by its vocabulary
before a sentence is written:

| syllables/word | words/sentence needed for grade 6.5 |
| --- | --- |
| 1.48 | 11.9 |
| 1.55 | 9.7 |
| 1.65 | **6.7 — unreachable** |
| 1.69 | **5.5 — unreachable** |

Quantum sits at 1.69. It got its over-length count to zero and still has 42 of 52
cards above 6.5, and the only way to move them is to delete the terms this pass
exists to keep. A bar nobody can reach without breaking the rules is not a bar; it is
an invitation to cheat the measurement. So:

- **GATED — over-28 sentence count.** May not rise. The free lever.
- **GATED — words per sentence.** May not rise (a tenth of slack for re-wrapping).
- **GATED — syllables per word may not FALL.** This is the anti-cheat. The one way to
  buy a grade is to delete vocabulary, and this catches it.
- **REPORTED, not gated — the grade, the count over 6.5, the worst card.** Look at
  them; a human should. Do not chase them.

**Do not report `cards over 6.5` as a success criterion for a technical theme.** Red
Sand has eight such cards that are syllable-bound — *perchlorate*, *stoichiometry*,
*electrolysis* — and they are correct as they stand.

Report **words-per-sentence and syllables-per-word alongside the grade**, per card, so
this cannot drift again. Flesch-Kincaid alone will not show you which half moved:

```sh
node --input-type=module -e '
import {fleschKincaid as fk} from "./tools/readability.js";
import {CURRICULUM as C} from "./themes/<theme>/content/curriculum.js";
const l=C.<GROUP>[<i>], g=l.game;
const G=t=>{const v=fk(t); return v==null?"n/a":v.toFixed(1)};
for(const [k,v] of Object.entries({scene:l.scene,guide:l.guide,
  question:g.question,why:g.why,takeaway:l.takeaway,
  choices:(g.choices||[]).join(" "),background:(l.background||[]).join(" ")}))
  console.log(k.padEnd(11),G(v),v.trim().split(/\s+/).length);'
```

`fleschKincaid` returns `null` under 25 words — that is the floor the function
declines below, not a failure.

Expect **the options to be the highest part and to stay there.** Each must carry a
claim, a direction and a justification in one sentence, and the course's own nouns
(*catalyst*, *methane*, *pressure*) cannot be spelled shorter. KINET-1's options went
7.2 → 7.9 when every one was given a subject so it would answer the stem. That trade
is correct: a fragment that does not answer the question is worse than a grade-8
sentence that does. **Do not buy a lower score by dropping the justification
clauses** — that reintroduces the shape tell from finding 4.

## Two things the pass must not do

- **Do not retarget a card's `concept` to fix a mismatch.** KINET-1 is filed under
  concept 6, Le Châtelier, and actually tests the split between concept 4 (the
  equilibrium constant and that temperature moves it) and concept 10 (rate constants
  and how steeply they climb). Moving it moves `conceptOrder`/`equationOrder`
  dependencies across the whole campaign. That is `SEQUENCING_PASS.md`, not this.
- **Do not silently make one card an exception to its book's boilerplate.** The
  test-design `background` paragraphs — *"Why the wrong options are the interesting
  ones"* — sit on 17 cards in `redsand.yml`. Replacing them on one card is right for
  that card and leaves the book inconsistent. Decide whether it is the book's rule or
  the card's exception, and say which.

## The narrative cards now have a gate; the questions still do not

`questionLoad`'s four numbers gate at grade 8 and below only, and a game declaring
`audience: { grade: 12 }` — Red Sand does — passes every gate with grade 12 prose.
**For a question card, the Flesch-Kincaid step above is still the entire gate.**

For the two cards nobody can avoid — the opening card and every day's stake —
`engine/dev/plainCards.mjs` is that check now: grade **6.5**, fixed, regardless of
`audience.grade`, plus a 28-word ceiling on any one sentence, ratcheted against
`plaincards-debt.json` so a campaign cannot gain a card over the bar or make its
worst one worse. It runs in `npm run check`. Its selftest carries the equality case
this repo insists on (the same prose in an opening card and in a day card scores the
same) and the case that says what the length rule is for: one 30-word pile-up hiding
inside nine short sentences, where the mean comes out under the bar and the card
still stops a reader dead.

**Blackout is the worked campaign**: fifteen day cards from grade 9.2 to 4.8, the
opening card at 4.4, nothing taken out of the course. `alamos-copy` carries the
before-and-after table.

**The questions are the rest of the job.** 57 of 61 campaigns are over the bar on
their narrative cards today and the debt file names every one; the stops behind them
have never been measured at all.
