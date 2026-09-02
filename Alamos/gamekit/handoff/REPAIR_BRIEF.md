# The repair brief — corrected after the Red Sand pilot

You are one of eight agents, each repairing the failing content gates of **one** Alamos
campaign. A pilot ran this brief on Red Sand first and closed every gate it was allowed to
touch. Nine things it learned are folded in below, marked **PILOT**. Read them: four of them
change what the work actually is, and the pilot says it wasted drafts finding them.

Work from `/Users/scolnic/code/Nuclear/Alamos/gamekit`.

Your job is to close as many failing gates as you can **without making the cards worse to
read**. Quality over volume: a closed gate bought with worse prose is a net loss and will be
caught, because your numbers are re-measured rather than accepted.

---

## Read first, in this order

1. `/Users/scolnic/code/Nuclear/Alamos/CLAUDE.md`. The line that governs everything: hard
   concepts, explained at a sixth-grade reading level, with the syllabus left where it is.
2. Invoke the **`alamos-accessibility`** skill — the seven defects to find in a card before
   touching its prose, and the rule that the official term is kept and glossed, never deleted.
3. Invoke **`alamos-curriculum`** (the card's required shape) and **`alamos-copy`** (the
   writing bar).
4. Your campaign's baseline file, named in your task. That is your target list.
5. `gamekit/tools/BOOK_TEMPLATE.md` — the format you are editing.

## The only two files you may edit

- `gamekit/books/<your-book>.yml` — every card edit.
- `gamekit/themes/<your-theme>/theme.js` — opening card, ending card, `delivery`.

Then run `node tools/import-book.mjs books/<book>.yml <theme>` to regenerate
`themes/<theme>/content/`. **Never hand-edit `themes/<theme>/content/*`** — `bookParity`
requires the book to regenerate exactly what ships.

## Absolutely off-limits

- **Any `engine/dev/*-debt.json`.** Never edit one, and never run any tool with
  `--write-debt`. These are whole-file JSON shared by all 62 themes; eight agents writing
  them is silent data loss. Re-banking is serialized and done by the main session.
- **`engine/dev/*.mjs` and `tools/syllabus.js`.** Gates and syllabus are frozen. If you think
  a gate is wrong, **say so in your report** — the pilot found a real one that way.
- **Any other campaign's book, theme directory, or content.** Seven other agents are running
  right now, each in its own campaign. Staying inside yours is what makes that safe.
- **`npm run check`** (it runs all 62 themes — use the per-theme commands below),
  `books/cards/*`, `shots/`, `dist/`.
- **Do not commit or stage anything.** Leave the working tree dirty.

Your book may already be dirty when you start — earlier work this session landed revised
books. That is expected; `git diff` on your book is not all yours. Do not revert it.

---

## Work in this order

### 1. Mechanical — no judgement calls, closes whole gates

- **`checkNames`**: put the job beside the name at its first mention — "Reyes, the shift
  supervisor, …". Run the gate for the list.
- **`warmupOrder`**: same rule in the book's `warmups:` block. **A warm-up `why` must stay
  ONE sentence of twelve or more words** — a live cap — so fit the gloss inside the existing
  sentence rather than adding a second.
- **`checkJargon` / `jargonDepth`**: a hard word used and never introduced needs a glossary
  entry or a gloss in place. `jargonDepth` findings are glossary definitions leaning on
  undefined words.
- **`delivery`**: if the opening card never names the thing the campaign builds, add a clause
  naming it. Cheap shape: "In fifteen days you sign the &lt;named thing&gt;: what X, what Y,
  and what nobody has checked yet." A caption too long for a board cell gets shortened.

> **PILOT — the opening card has no 70-word floor on a `stakeStyle: 'brief'` campaign.**
> `checkStory` sets the floor to 0 for brief campaigns and checks the four beats directly.
> The live caps are **≤ 5 sentences** and a note over 180 words. Red Sand's card was 59 words
> and passing; padding it to 70 would have made it worse for no gate. Check your theme's
> `stakeStyle` before assuming a floor.

### 2. Concept visibility — BEFORE any reading-level work

`node engine/dev/conceptVisible.mjs <theme>` lists cards that never name the concept they
teach. The fix is to put the concept's own term into the **question stem or one of the
options**. The gate reads only those two, deliberately — the scene, guide, background and
verdict are where a concept hides.

Do this first because it **raises** course vocabulary, which is the opposite of what step 3
does. Doing it afterwards means fighting the pass that just removed words.

> **PILOT — three ways to fake this gate. Do not use any of them.**
> - **The `assumes` trap.** `conceptZones` folds a stop's `assumes` lines into the "option"
>   zone, so a keyword parked in a takes-as-read line turns the gate green while the concept
>   stays exactly as invisible. This is the cheapest cheat available; it is forbidden.
> - **The homonym trap.** A concept's keyword list can contain an ordinary word. Red Sand had
>   a concept whose list contains `trace`, on a card whose guide already said "the shape of
>   the flow trace" — moving that clause into the stem would have gone green on a homonym.
>   Check that the word you are using means the concept.
> - **Check whether the stop *authored* its `concept:` or the importer picked it.** Two of
>   the pilot's six had no `concept:` line, so `pickKeyConcept` chose one off a keyword in the
>   verdict. That changes the fix from "name what this card teaches" to "name something true
>   about a concept this card was matched to" — and it is where the dishonest fixes live.
>   Say which of yours are which in your report.
>
> **Do not make the term the giveaway.** Prefer the stem. If an option carries it, check it
> is not identifiable by length or wording, and re-run `probeQuestions` after this step.

### 3 & 4. Reading level and time anchors — ONE edit, not two

> **PILOT — the original brief had these as separate steps and they fight.** Adding a time
> clause to a stake is exactly what pushes its grade back over the bar, so doing grade first
> and anchors second means touching every stake twice. **Rewrite each stake once, with the
> anchor already in it.**

- **`plainCards`** — the opening card and each day's stake. Sixteen cards, read before every
  day by every player.

> **PILOT — `plainCards` is a 16-card job, not an N-cards-over-6.5 job.** The gate's second
> ratchet is *worst card ≤ banked worst + 0.05*. Red Sand's banked worst was **5.5** against
> an actual 8.1, so closing it required **every one of the 16 cards under 5.55** — ten of
> them were between 5.5 and 6.5 and invisible in the gate's one-line output. **Read your
> theme's row in `engine/dev/plaincards-debt.json` before you start** (read only — never
> write it). The file is stale campaign-wide, so you are probably measured against a
> pre-briefing-pass number you cannot see from the gate.

> **PILOT — the arithmetic, so you do not have to find it.** `checkStory` caps stake +
> briefing at **4 sentences**; most campaigns' briefings are 1 sentence, so the stake is
> hard-limited to **3**. Sentence length is therefore *not* a free lever — the only levers are
> fewer words and plainer words. With 3 sentences, grade ≤ 5.5 needs roughly
> **`0.13 × words + 11.8 × syllables_per_word ≤ 21.09`** — about **40 words at 1.35
> syllables**. Aim there.

- **A time anchor in the first two sentences.** Your campaign's own day noun counts ("On sol
  292", "Level 3"), as do weekdays, months, years and elapsed phrases ("since this morning",
  "overnight", "before the window").

> **PILOT — this gate had a defect, now fixed.** It matched the modal verb "may" as the month
> May, so one card per campaign could count as dated when it was not; and it did not know
> non-`day` day nouns. Both are corrected, so your baseline count may be one lower than an
> older report says, and your own day noun now counts.

- **`plainQuestions`** — every question card. **The hard rule: never delete an official term
  to lower a grade.** Name it and gloss it on the spot — "its rate — how fast the gas
  reacts". The gate watches `spw` (syllables per word) against *falling* for exactly this.

> **PILOT — `plainQuestions` is fought at one decimal place.** It compares `toFixed(1)`
> against banked + 0.1, so a `wps` of 12.566 against a banked 12.4 is 0.02 over the line and
> fails. Splitting the over-28 sentences cleared it with **zero margin** — budget one or two
> extra dense cards so the next edit does not re-break it. Same for the over-28 count, which
> is gated against rising.

> **PILOT — splitting a long sentence lowers `spw` slightly** (it adds short function words),
> even when no term was deleted. Red Sand's went 1.609 → 1.596 with `overpotential` *added*.
> That is fine — there is headroom against the banked figure — but **report the movement and
> name any term you removed**, even a borderline one. The pilot named `ohmic` and was right
> to.

### 5. Curriculum order — last, because steps 2–4 move cards

`conceptOrder`, `equationOrder`, `takesAsRead`. Two shapes:

- A concept whose prerequisite is claimed later, the same day, or by nothing. Fix by claiming
  it earlier or declaring it with `takesAsRead:` — **and `takesAsRead` must name a
  prerequisite of that stop's own concept**, from `tools/syllabus.js`'s `needs`. Naming
  anything else, including the stop's own concept, makes the importer refuse the whole book.
- **A stale debt row** — "…which is in order now, delete the line". **Leave it. Report it.**
  That is the serialized re-bank's job.

---

## How to verify — per theme, read-only, run as often as you like

```
cd /Users/scolnic/code/Nuclear/Alamos/gamekit
node tools/import-book.mjs books/<book>.yml <theme> --dry    # will it import at all
node tools/import-book.mjs books/<book>.yml <theme>          # write it
node engine/dev/smokeCampaign.mjs <theme>                    # every stop gradeable
node engine/dev/bookParity.mjs <theme>                       # book regenerates what ships
node engine/dev/conceptVisible.mjs <theme>
node engine/dev/plainCards.mjs <theme>
node engine/dev/plainQuestions.mjs <theme>
node engine/dev/checkStory.mjs <theme>
node engine/dev/checkNames.mjs <theme>
node engine/dev/checkJargon.mjs <theme>
node engine/dev/jargonDepth.mjs <theme> --check
node engine/dev/warmupOrder.mjs <theme>
node engine/dev/delivery.mjs <theme>
node engine/dev/probeQuestions.mjs <theme>
node engine/dev/validateContent.mjs <theme>
node engine/dev/conceptOrder.mjs <theme>
node engine/dev/equationOrder.mjs <theme>
node engine/dev/check.mjs <theme>                            # all of them, your theme only
```

The importer is all-or-nothing: while it reports any problem it writes **nothing**, so
`--dry` early and often. If it refuses on a `takesAsRead`, the error names the prerequisite
the stop actually needs — swap to that or drop the line.

> **PILOT — `tools/yaml-lite.mjs` rejects an unquoted comma inside an inline-map value** with
> a confusing *"has no colon in it"* error. Quote any inline `note:` or `label:` you add.

## Definition of done

Not "all green" — several of these cannot go green.

- **`smokeCampaign` and `bookParity` stay green.** Non-negotiable. If either breaks, fix it
  before anything else.
- **Zero new failures in any gate you did not start with.** Check every gate in the list
  above, not only the ones you worked on.
- `spw` did not fall materially; `wps` and the over-28 count did not rise.
- `conceptVisible` UNNAMED at zero. UNREACHED needs a whole new stop, so it is reported
  rather than required.
- `probeQuestions` no worse than baseline.
- Anything you could not close: leave it alone and explain why.

## Your report

1. **A before/after table**, one row per gate, with the **actual numbers** from the commands
   above — never your estimate of them.
2. **What you changed**, grouped by step, with two or three **verbatim before/after card
   excerpts** so the prose can be judged rather than the count.
3. **What you left, and why.** Specific and honest. If a fix would have needed a term deleted
   or content the course does not have, say so. Name any term you removed. Report any
   movement in `spw`.
4. **Anything this brief got wrong** — a step in the wrong order, a rule fighting another
   rule, a gate whose message misled you, a defect in a gate. The pilot's version of this
   section is why the brief you are reading is better than the one it got.

Do not overstate. If a number did not move, say it did not move.
