# The three-change pass — one brief, one campaign per agent

**Six mandates**, run together on a single campaign by a single agent. The file's
name is from the first three, which came first and were done on
`outbreak_riverton` by hand — the gotchas below are paid for, not theoretical. Each
agent gets: this file, the theme id, and nothing else assumed.

**Mandate 4a below is the only one that touches a shared engine file
(`engine/core/warmups.js`), it is done ONCE and centrally, and it is already
done** — see the callout under mandate 4. Confirm it, never redo it: every
campaign agent editing that file in parallel is the exact "fork the engine"
mistake this repo does not repeat. 4b is book content, per campaign, like the
rest.

## Running ten campaigns at once — read this before launching any of them

The brief is written for one agent on one campaign, and it is safe that way. Ten in
parallel in one checkout breaks in four places, and **two of them fail silently** —
no error, no red, a permanently weakened gate. All four were checked against the
source, not assumed.

1. **No campaign agent may EVER run `--write-debt`. It is an orchestrator step.**
   `plainCards.mjs` and `plainQuestions.mjs` **ignore the theme argument when
   banking**: `names = wantAll || writeDebt || !wanted.length ? themeNames() : wanted`
   (`plainCards.mjs:172`, and the same line at `plainQuestions.mjs:289`). So
   `plainCards.mjs redsand --write-debt` re-measures **all 62 themes** off disk and
   rewrites the whole debt file. Run from one agent while nine others are mid-edit,
   it banks their half-finished prose as the new ratchet floor — the numbers only
   ever fall, so a card transiently at grade 7.2 becomes that theme's permanent
   allowance and nothing fails for it again. Nothing reports this. `checkStory.mjs`
   and `equationPlacement.mjs` do honour the theme argument, but each still
   read-modify-writes one shared JSON, so two overlapping runs lose one agent's
   entry outright. The `--write-debt` line is struck from the verification loop
   below for this reason: agents report their numbers, one process banks them
   afterwards.
2. **`npm run check` with no theme argument is an orchestrator step too.**
   `check.mjs:15` — no argument means all 62 themes *plus* the repo-wide tail
   (`checkStyles`, `worldParity`, `readabilityParity`, the five selftests). Ten
   agents running it at the end each see the other nine's in-flight edits, and an
   agent that finds a failure in a theme it was never given will try to fix it.
   That is the fork-the-engine mistake wearing a different hat. Per agent:
   `npm run check <theme>`, never bare.
3. **A base theme and all its editions go to ONE agent, as a single unit.** An
   edition's place belongs to the base and is imported across by the manifest —
   `editionParity.mjs` compares areas, cast, places and the manifest's world
   description against the base, and mandate 2 edits exactly those files. Two
   agents holding `redsand` and `redsand_ms` are two agents editing one `site.js`.
   The twelve families, each of which is **one** unit of work:

   | base | goes with |
   | --- | --- |
   | `contamcity` | `contamcity_ms`, `contamcity_hs` |
   | `deepwatch` | `deepwatch_ms`, `deepwatch_hs` |
   | `the_trial` | `the_trial_ms`, `the_trial_hs` |
   | `blackout` | `blackout_ms`, `blackout_fable` |
   | `bring_them_home` | `bring_them_home_ms` |
   | `outbreak_riverton` | `outbreak_riverton_ms` |
   | `planetary_defense` | `planetary_defense_ms` |
   | `aftershock` | `aftershock_ms` |
   | `icecore` | `icecore_ms` |
   | `seedbank` | `seedbank_ms` |
   | `redsand` | `redsand_ms` |
   | `sightline` | `sightline_ms` |

   The other 34 themes are standalone, so there are **46 units**, not 62. Note that
   mandate 6 is still per-card inside a family: `editionParity` does not read
   `opening`, so each edition needs its own cut and its own four beats at its own
   grade.
4. **Never run `git add`, `git commit`, `git stash` or `git checkout`.** Staging is
   repo-wide in one worktree, so one agent's commit captures nine others'
   half-finished files. Reporting a diff is the agent's job; committing is not.
5. **`shots.mjs` IS parallel-safe — do not serialize it.** It takes a fresh vite
   port and a fresh CDP port from the kernel (`freePort()`) and gives Chrome a
   per-process profile (`gamekit-shots-${process.pid}`); its own header records
   that fixed ports were the bug that "two themes could not be shot at the same
   time" fixed. The only cost is ten concurrent SwiftShader Chromes, which is CPU,
   not correctness. Stagger the shots step if the machine grinds.

**And size the batch honestly, because the brief used to read as if segues existed.**
**60 of the 62 themes have ZERO authored segues.** Only `outbreak_riverton` and
`planetary_defense` have any (14/15 each). The drama gate only fires on a segue that
is there, so `segue-drama-debt.json` naming one theme means "almost nothing is
written yet", not "everything is clean" — and a green `checkStory` proves nothing
here: `darkfibre` passes today with **0/11** segues and says so as a note. Mandates 3
and 5 are therefore a **writing** job, not an editing one: 15 new closing cards for a
course campaign, 10 for a junior edition, 3 for a Quick Discovery. A Quick Discovery
is a fifth of the work of a course campaign — do not fill ten slots with a mix of the
two and expect them to land together.

**Choosing the ten:** ten distinct units from the table above or the standalone list,
never a base in one slot and its edition in another; and either ten course campaigns
or ten Quick Discoveries, not a blend, so the batch finishes at roughly one time.

## The mandates

1. **Accessibility.** Hard concepts, taught at a sixth-grade reading level. The
   course's judgement does not move; the prose does. Authority: `alamos-accessibility`
   skill — read it before touching a word. It is a teaching pass, not a shortening
   pass: keep every official term, gloss it once on the spot, then reuse the gloss.
   Includes the equation-exposure rule below (mandate 1b).
   - **1b — show a gapped equation where the mention already earns it.**
     `engine/dev/curriculumDelivery.mjs` records, per campaign, every syllabus
     equation that is "mentioned only" (the words appear in prose but nothing
     computes it) as a recorded gap, with the exact stop indices it is mentioned at
     (`· known gap: <equation> — mentioned only, at stop(s) …`). At one of those
     mention stops — pick the one with the best narrative fit, not all of them —
     set the actual symbolic equation (e.g. `Rₑ = R₀ × S`) in the blurb before the
     question, the way a whiteboard or a printout in the scene would actually show
     it. **Only where the tie is genuinely good.** This does not close the gap or
     change its status in `curriculum-debt.json` — the equation still is not
     *computed* there, so it stays a recorded gap and is still reported as one. This
     is purely a recognition aid: a reader meets the notation next to the idea it
     names, in a place the story already put it in front of them.
2. **Placement.** Far places are built into the campaign later, and are not walkable
   into until the campaign has sent the player there. Authority: `PLACEMENT_PASS.md`
   — read the "per-campaign work, in order" section and the follow-on section on
   giving opened places a reason to be entered.
3. **Story stakes.** Every day connects on a **But** or a **Therefore**, never an
   **And Then** (`STORY_SPEC.md` rule 11) — the *idea*, not the word: a
   complication or a forced consequence, worded however the sentence wants it
   ("Nobody has looked at the composition yet", "So nobody in that ward moves
   tonight", "That leaves eleven hours"). And the campaign has real drama: named people at
   risk, a clock, an irreversible commitment, a twist that is evidence reframing what
   the room believed — never an event (rule 10, same file). Read `STORY_SPEC.md`
   rules 1, 10 and 11 before writing a word. Includes the closing/opening continuity
   rule below (mandate 5). **This is now a hard gate, not just a review discipline**
   — `checkStory.mjs` fails a segue that does not turn, names no
   number/clock/named person, or shares a 6-word run with the next stake or with the
   day's own takeaway, unless the day is recorded in `engine/dev/segue-drama-debt.json`
   (ratcheted the same as every other debt file here). Planetary Defense shipped eight
   segues that fail it; that theme is the worked "found a real defect" case, and
   `outbreak_riverton` is the worked clean one.
   - **The turn test is `engine/dev/turnRule.mjs`, and it is a sense test, not a
     spelling test.** It accepts either family however it is written — the But
     family (`but, yet, however, though, although, instead, whereas, unless,
     until, except, no longer, even so, on the other hand`, and a clause-initial
     `still`) or the Therefore family (`therefore, thus, hence, as a result,
     which/that means, which/that leaves, which/that puts, which/that forces,
     because of that`, and a clause-initial `so` or `now`). It was two literal words, and
     that gate was worth removing twice over: it failed segues that turn cleanly
     in plainer English, and it passed a science recap with a "But" welded on the
     front, which is the exact defect rule 11 exists to catch. **Do not write
     toward the word list.** Write the beat; the list is wide enough that a
     genuine turn lands inside it, and a segue that needs a connective bolted on
     to pass is the register problem mandate 5 describes, not a wording problem.
   - **The turn has to be visible, though.** "The blank ran clean. Nobody in that
     ward gets moved tonight." is a Therefore to a reader and nothing at all to
     the checker — the connective is implied by the juxtaposition, and no gate
     can see an implication. One word fixes it ("So nobody in that ward gets
     moved tonight"), and it reads better out loud anyway.
4. **Warm-up schedule — cut to four slots, ever.**
   - **4a (engine, one-time, shared) — DONE; confirm, do not redo.**
     `engine/core/warmups.js` used to schedule an opener before day 1 *and* day 2
     (TRIAL and GREET, in either order), a second TRIAL before the unlock day on a
     two-tier site, and then FOLLOW/HUNT/CANVASS/EVADE/TAG one per morning across
     every day left. It now runs a warm-up **only before missions 1, 4, and — where
     the campaign is long enough to have them — 8 and 13, and nowhere else**
     (`WARMUP_SLOT_DAYS = [1, 4, 8, 13]` in that file); the day-2 slot is gone.
     Day 4 keeps its existing job (`trial-far` where a far tier exists, per the
     unlock-day rule already in the file; the next tail format where it does not). Days 8 and 13 each take one of the remaining tail formats
     (`FOLLOW, HUNT, CANVASS, EVADE, TAG`), in the schedule's existing order, however
     many of the four days the campaign is actually long enough to reach —
     `WARMUP_MIN_DAYS` and the short-campaign rule (`warmupPlan` returns `[]` under
     4 days) are unchanged. `warmupOrder.mjs`'s selftest already asserts the new
     shape — every scheduled day is one of 1/4/8/13, day 2 never is, at most four
     runs ever — so `node engine/dev/warmupOrder.mjs --selftest` is how you confirm
     this in one line before you start.
   - **4b (per-campaign, content).** For the warm-up that survives before mission 1:
     do not tie it to the story or the argument. Its authored `why` in the book's
     `warmups:` block becomes **one sentence**, purely functional — enough to get
     oriented (who's here / what's the ground), nothing that reads as plot. This is
     a deliberate exception to the "a run with no reason is a tutorial" rule in
     `alamos-warmups` — the reason here is orientation itself, stated once, not
     manufactured drama on a morning the player has met nobody yet. The mission-4,
     8 and 13 warm-ups keep a real authored reason as before (they land once the
     player already knows the cast and the argument, so a reason lands honestly).
5. **Closing card and next opening card must not read as the same card twice.**
   A mission's `segue` (the closing card, printed off `mission.segue`) and the next
   mission's `stake` (the opening/plan card) are read back-to-back by the player with
   nothing in between. Two failure modes, both real: restating the same fact in
   both, and writing the segue as a science recap instead of a story beat.
   - **The segue's job is drama, not the takeaway's job.** `takeaway` already carries
     the principle; `segue` is not a second, informal takeaway. Write it as what
     happened *to the people in the room* and what it now costs, not a summary of
     what was measured or concluded. Compare: "The test was negative, ruling out
     bacterial cause" (science recap — wrong register) against "The blank ran clean.
     So nobody in that ward gets moved tonight" (same fact, told as consequence —
     right register, and the turn is on the page rather than implied).
   - **Check side by side before moving on.** Read the segue and the next `stake`
     together. If they share the same key noun phrase or restate the same fact as
     their headline, one of them is redundant — cut the repeated fact from the
     segue and let it name what changes instead. The stake sets the new problem; the
     segue is the bridge that earns arriving at it, not a preview of it.
6. **The opening card — five sentences, the drama at the top, and no table of
   contents.** The first card anybody reads, `opening` in
   `themes/<theme>/theme.js`. All 62 were read end to end in August 2026 against
   three questions — is it easy to understand, is it five sentences or fewer, does
   it feel like a crisis you have to walk into. **The reading level passes and the
   length and the drama do not.** 60 of 62 score Flesch-Kincaid 2.1–6.3; only
   `redsand` (4 sentences) and the `instruments` harness (5, not a game) are at or
   under five sentences. The median is **13**. The worst are `qd_eclipse` and
   `qd_memory` at 17, `qd_tectonics` and `the_trial_hs` at 16.
   - **Failure pattern 1: the paperwork third act.** A course campaign opens on a
     real threat and then spends three to six sentences reciting the table of
     contents of the thing being handed over — *"It says … It says … It says …"*.
     Measured share of the card's sentences that are deliverable-admin:
     `the_trial_ms` 60%, `deepwatch_ms` 50%, `slackwater` 46%, `icecore` and
     `projecty` 43%, `blackout_ms` / `carrying` / `changeover` 42%. `slackwater`
     is the clean case to study: sentences 1–3 are a
     storm surge against six gates, 8–11 are a form, and the line that is actually
     the drama — *"Ninety graziers move stock off the marsh on one number you
     signed"* — is stranded at the bottom behind an index nobody read to.
   - **Failure pattern 2: the Quick Discoveries have no downside.** Zero admin
     sentences, which is right, but the cost of being wrong is career
     inconvenience: *"four benches are about to waste a week"* (`qd_penicillin`),
     *"four benches waste a month"* (`qd_crispr`), *"four benches waste a whole
     season"* (`qd_oxygen`) — the same sentence three times. And *"the X, the Y
     and the Z all come through you"* appears in **13 of the 20** QD cards.
     `qd_periodic`'s worst case is that the proceedings go to press on Friday.
     `qd_dna`'s is that three shapes go on standing. Nobody saves a day in either.
     Fixing this is mandate 3's work, not a wording job: the campaign needs a real
     thing to lose (`STORY_SPEC.md` rule 10), and for a discovery game that is
     usually the people the discovery was for — `qd_germ` already has it
     (*"Sixty-six people in one court are dead or dying. The houses fifty yards
     away are almost untouched."*).
   - **The target shape is `redsand`'s, and it is the only card in the repo that
     has it.** Four beats, one sentence each, in this order: **the threat → your
     job stated as authority → the clock → who pays.** Read it as the model:
     *"The rocket on the pad leaves when Mars and Earth line up, and it has to lift
     off full. You are the propellant lead at Arcadia Rise, and the fuel is made
     here out of Martian air and ground. In fifteen sols you have to put enough of
     it in that tank to fly home. Six people go on what the tank holds, or they
     wait twenty-six months."* Sixty-eight words. Nothing about what the handover
     document contains.
   - **Where the cut beats go, because this is the story change.** The deliverable
     index is not opening-card material, and deleting it loses nothing only if its
     one load-bearing fact moves. What has to be handed over belongs in the **day-1
     `stake`**, where the player is about to write the first piece of it — the same
     move `BRIEFING_PASS.md` already made for the plan card, which the opening card
     never got. The per-day *"one figure is settled a day"* beat belongs nowhere:
     the day cards demonstrate it. Expect this to shift day 1's stake, which is why
     mandate 6 is in this pass and not a separate sweep.
   - **None of this licenses breaking the gates the opening card already has.**
     They all still hold and they are all in `checkStory.mjs`'s opening-card
     block: one paragraph, an authority clause
     (`you are/have/lead/run/direct/command/own`), no mechanics vocabulary, no
     sentence over 40 words, and a closing line carrying a number, a clock or a
     named person. This mandate is a cut inside those, not around them.

## Order of operations — do not run these as separate edits

**Mandates 1 and 3 touch the same fields** (`scene`, `guide`, `background`, `why`,
`stake`, `briefing`, `segue`). Rewriting a card for reading level, then rewriting it
again for drama, is two edits fighting over one paragraph and the second one
regresses the first. Write each card **once**, satisfying both at the same time: a
sixth-grade sentence that also carries the stake. Short sentences serve both masters
— they are the free lever for reading grade *and* the way tension actually reads
("Seven patients had serious side effects. The safety board meets tonight.").

**Mandate 2 is a different set of files** (`themes/<theme>/fixtures.js`,
`themes/<theme>/site.js` or `plan.js`, `at:`/`enter:`/`from:`/`until:` in the book) —
run it before or after the prose pass, it does not interact with 1 or 3. It can be
done by the same agent in either order; it does not need to be sequenced with the
writing pass.

**Mandate 6 is the one edit outside the book.** `opening` lives in
`themes/<theme>/theme.js` and in no `.yml` — neither `bookParity` nor
`editionParity` reads it. Two consequences. You do **not** re-run
`import-book.mjs` for it, so cutting the opening card cannot be undone by the next
import. And **every edition carries its own card**: 62 of them, not 25, and a
junior edition's is not regenerated from its parent's. Do this one **first**, before
any card rewriting — it is the card that decides what day 1's stake has to pick up,
and mandate 5's segue/stake read-through starts from a day-1 stake you have already
settled.

**Mandate 4a is already done; confirm it before your agent starts** — one line,
`node engine/dev/warmupOrder.mjs --selftest`, which asserts that every scheduled
day is one of 1/4/8/13 and that day 2 never is. If that fails, stop and say so
rather than editing the shared file yourself. Mandate 4b (the one-sentence day-1 `why`) and mandate 5 (segue/stake
continuity) are per-campaign content — fold them into the same pass as 1 and 3, same
reasoning: they touch the same book fields, so write them once, correctly, rather
than as a separate later edit.

**Before touching any card, do this first, in this order:**

1. Read `STORY_SPEC.md` rule 1's table for this campaign's own two-sided argument (who
   is right on which day) — the drama pass has to serve an argument that already
   exists in the roster, not invent an unrelated one.
2. Write the arc down (rule 9): one line per mission — fifteen in a senior
   campaign, ten in a junior edition — each a But or a Therefore off the one
   before. Do this *before* rewriting individual cards — a twist planted on
   day 9 has to be visible as a foreshadowed thread on day 1, and you cannot see that
   from inside one card.
3. Pick a recurring human thread — one or two named figures (patient, colleague,
   bystander) native to the campaign's setting who carry risk across missions, so the
   science has someone it is *for*. Not required by any checker; it is what makes a
   reversal land. (`outbreak_riverton`'s worked example: a patient and his son recur
   from day 1 through the ending — a relapse drives the immune-system reversal, his
   father's survival is what the funding-legacy ending pays off.) Keep it to figures
   who are not on the checked roster, so you never collide with `checkNames`'s
   name-before-job rule on a roster lead.
4. Cut the opening card to its four beats (mandate 6) and note which fact you
   moved out of it into day 1. Do this before any mission card, so the day-1 stake
   is written once knowing what it inherited.
5. Only then, rewrite mission by mission: `stake`/`briefing` → each stop's
   `scene`/`guide`/`background` (checking each mentioned-only equation for a good
   mandate-1b tie as you go) → `segue` (checked against the *next* mission's `stake`
   for mandate 5 before moving on — you have both in front of you at this point,
   which is the only time this check is cheap).

## Gotchas — paid for already, do not re-pay them

- **Two ratchet files gate regressions, silently, by exact number.**
  `engine/dev/plaincards-debt.json` covers the opening card + every mission's `stake`
  (grade must not exceed 6.5, ratcheted). `engine/dev/plainquestions-debt.json`
  covers every stop's pooled `scene`+`guide`+`question`+`why`+`takeaway`+`background`+
  `choices` (gates on: no more sentences over 28 words than recorded `long`; average
  words/sentence — `wps` — may not rise more than +0.1; syllables/word — `spw` — may
  not FALL by more than 0.03, which is the anti-cheat against buying a grade by
  deleting course vocabulary).
  **The mean grade is reported, not gated. The count of cards `over` 6.5, the
  `worst` single card and the pile-ups are ratcheted** — you may not add one, and
  you are never asked to drive them to zero. So do not chase a technical grade-12
  campaign's numbers downward for their own sake; a card about *perchlorate* or
  *electrolysis* is syllable-bound and correct as it stands. Just do not make it
  worse: one more card over the bar, or a worst card 0.05 worse than the banked
  one, fails.
- **Cutting the opening card to five sentences will RAISE its reading grade
  unless you also shorten the words, and for five themes there is no room for
  that.** The floor in `checkStory.mjs` is **70 words** (55 at `audience.grade` ≤ 4,
  and none at all for the five themes carrying `stakeStyle: 'brief'` —
  `outbreak_riverton`, `planetary_defense`, `seedbank`, `redsand`, `slackwater`).
  Five sentences holding 70 words is 14 words a sentence against the current
  average of about 10, and Flesch-Kincaid charges roughly **+1.6 grades** for that
  on its own. So the lever here is **syllables, not sentence count**: `redsand`
  runs 17 words a sentence and still scores 4.2, because almost every word in it
  is one syllable.
  Then check the headroom before you start, because the opening card *is* the
  banked `worst` in `plaincards-debt.json` for **`bring_them_home` (5.9),
  `planetary_defense` (5.6), `groundtruth` (6.3) and `qd_oxygen` (4.3)**, with
  `qd_accel` 0.1 away. On those five the cut has to hold the grade to the tenth or
  the ratchet fails, and `groundtruth` at 6.3 has 0.2 to the bar itself. Every
  other theme has 0.6 or more.
- **Short sentences, not fewer words, is how you satisfy the ratchet while adding
  drama.** Splitting one 30-word sentence into two 15-word ones lowers `wps` and adds
  no length. This is the actual fix when a drama rewrite pushes a theme over its
  banked `wps` — don't cut content, add a period.
- **Check the campaign's `dayNoun`** (`themes/<theme>/theme.js`). If it is not
  `'Day'` (`Stage`, `Shift`, `Watch`, `Sol`, `Phase`, `Level`…), never write the
  literal word "tomorrow" into a `segue` — `dayDebrief`'s checker fails any generated
  debrief card containing it in a game that "counts in \<dayNoun\>s". Write "the next
  call" / "next \<dayNoun\>" instead.
- **A segue on a day where nothing held may not read as praise.** Avoid the literal
  words "hold"/"held", "well done", "good work", "every one right" in a mission's
  `segue` unless you have checked it does not land on that mission's roughest tier.
- **`checkNames.mjs` (its own check, beside `checkStory`) requires the job beside
  the name at first mention, campaign-wide — and it scans stop `scene`s, not just
  narrative cards.**
  If you rewrite the very first card OR the very first stop scene a roster lead
  appears on and drop their appositive ("Dr. X, the \<role\> lead,"), you break this
  even if every other mention downstream is fine. Grep the roster names across your
  whole rewrite (scenes included) and confirm each one's first appearance still
  carries the role — this is exactly what caught a pre-existing gap in
  `outbreak_riverton` (Ortiz, never introduced with her title anywhere in the book,
  passed for weeks because nothing had put her name in a segue before).
- **A "But" welded onto a recap does not buy the gate off any more, and never
  bought the register.** The turn test reads for a complication or a forced
  consequence in any wording (`engine/dev/turnRule.mjs`), so the move that used
  to pass — front a science summary with "But" — now buys nothing the sentence
  did not already earn, and the three other drama checks are the ones that
  actually fail. Two ambiguous words are read only at the head of a clause: "so"
  and "still" turn in "So nobody moves" and "Still, nobody moves", and do not in
  "so many samples" or "the water went still". Confirm the rule itself with
  `node engine/dev/turnRule.mjs --selftest`, which is where its equality cases
  live — the same beat on "But" and on "yet" has to score the same.
- **The drama-gate's "concrete stake" check only recognizes two shapes of person:
  a roster surname, or a capitalized First Last pair** (so a deliberately
  off-roster recurring figure like "Elias Webb" still counts — see the recurring-
  human-thread technique above). A segue that names risk only abstractly ("this
  changes everything") satisfies neither and fails; add a number, a clock, or a
  name.
- **The drama gate's echo check is verbatim, word-for-word, 6 words long** — it
  will not catch a paraphrase, and it will catch an exact shared clause even if
  a single word elsewhere in the sentence differs. If your segue and the next
  `stake` (or this day's own `takeaway`) were drafted from the same sentence,
  as they often will be since they describe the same fact, change the segue's
  wording, not just trim it.
- **Never touch a value a question grades against.** `readings`, `stream`, `scale`,
  `answer`, `choices`' exact strings, and any number that also appears in a
  structured data block are load-bearing. Numbers repeated in prose (a patient's
  labs, a percentage, a day count) can be dressed with narrative but must not be
  changed — the mechanics read the structured field, not the sentence, but keep them
  consistent for the reader.
- **A twist is a measurement, never an event.** No fires, no saboteurs, no random
  accidents — reframe with evidence someone already had reason to collect (a
  sequence match, a control that came back wrong, a denominator nobody checked).
- **Facades vs. ground, for mandate 2.** `access.js` seals *doors*, never open
  ground — a player may always walk the whole map, an unopened building is simply
  dark and unnamed until the campaign sends someone. Do not fence terrain to
  simulate distance; open a door late instead.
- **A far tier needs a real distance ratio.** `tiersFor` requires roughly **2.0×**
  the distance of the next-closest place, and at least **120 m**, or it will not
  register as far at all — check with a one-line script before authoring, per
  `PLACEMENT_PASS.md` step 5.
- **An opened place with nothing sent to it is a dead room.** After opening a
  facade or a far place, confirm something actually goes there: a mission stop `at:`
  it, a warm-up item scattered near its door, or the delivery board. `placement.mjs`
  and the traffic table both report a place nobody was ever sent to.

## The verification loop — run after every mission, not just at the end

```sh
cd gamekit
node tools/import-book.mjs books/<theme>.yml <theme> --verify   # after any book edit
node engine/dev/checkStory.mjs <theme>                          # the stake cards + the opening card's four gates, rule 11's And Then, the drama gate
node engine/dev/plainCards.mjs <theme>                          # mandate 6: the opening card + every stake against grade 6.5, ratcheted
node engine/dev/turnRule.mjs --selftest                         # the turn rule itself, if you touched it
# NO --write-debt, ever, from a campaign agent. plainCards/plainQuestions ignore the
# theme argument when banking and rewrite all 62 themes from disk; see "Running ten
# campaigns at once" above. Report your numbers and let the orchestrator bank them.
node engine/dev/placement.mjs <theme>                           # mandate 2 diagnosis
node engine/dev/warmupOrder.mjs <theme>                         # mandate 4 schedule + reasons
npm run check <theme>                                           # every gate, this theme only
node engine/dev/shots.mjs <theme> --room all                    # screenshot before believing anything visual
```

Nothing counts the opening card's sentences — `plainCards.mjs` scores its grade and
`checkStory.mjs` checks its four beats, and neither has an opinion about length in
sentences. Count them by hand, and read them numbered, with:

```sh
node -e '
const id = process.argv[1];
const dir = JSON.parse(require("fs").readFileSync("themes.json","utf8")).themes[id];
import(`./${dir}/theme.js`).then(m => {
  const t = m.theme ?? m.default;
  const txt = (t.opening ?? []).join(" ");
  const s = txt.split(/(?<=[.!?])\s+/).filter(x => x.trim());
  console.log(`${id}: ${s.length} sentences, ${txt.split(/\s+/).length} words`);
  s.forEach((x, i) => console.log(`  ${i + 1}. ${x}`));
});' <theme>
```

Read the numbered list and ask of each line: is this the threat, the authority, the
clock, or who pays? A line that is none of the four is the line to cut. **Do not add
a gate for this without the equality case first** — `alamos-measurement`'s rule, and
a sentence-splitting regex on prose containing "No. 3" and "88%" is exactly the kind
of metric that produces a plausible wrong number.

**Running alone:** finish with the full `npm run check` (no theme argument) to confirm
nothing shared broke and no other theme regressed. **Running as one of ten: do not.**
It measures all 62 themes and would read the other nine agents' in-flight edits —
that run belongs to the orchestrator, after every agent has reported.

**Read the actual prose, not just the gate output.** `node tools/make-dossier.mjs
<theme>` builds a reading dossier (`books/dossier/<theme>-dossier.html`) straight off
the theme's own normalized content — cover, every phase's cards, the closing card off
each `segue`, the ending. Publish it as an Artifact (`alamos-dossier` skill) and
actually read the arc end to end before calling the pass done; a green check has
caught none of the drama, teaching-voice, or twist judgement calls this brief asks
for.

On a `plainQuestions` failure, that check prints exactly which metric regressed
and the worst 1–3 offending cards by word count — trim those specific sentences,
don't re-edit at random.

## Definition of done, per campaign

- [ ] `STORY_SPEC.md` rules 1, 9, 10, 11 all satisfied. Only rule 11 has a gate
      (`checkStory.mjs`: the And Then ban, the turn, and rule 10's
      something-concrete-at-risk half). Rules 1 and 9, and rule 10's
      twist-is-a-measurement judgement, are read by a human.
- [ ] Every mission's `segue` present (except the last), no "and then", no banned
      words on a rough-tier day, `dayNoun`-safe.
- [ ] Every segue passes the drama gate outright (it turns — a complication or a
      forced consequence, in any wording, on the page rather than implied;
      something concrete at risk; no verbatim echo of the next stake or this
      day's own takeaway) — zero new entries in `segue-drama-debt.json` for this
      theme.
- [ ] Every question card still reads its official terms, still teaches the same
      concept, still grades the same way — only the prose changed.
- [ ] No ratchet regression: `long`, `wps` and `spw` in
      `plainquestions-debt.json`, and `over`, `worst` and `long` in
      `plaincards-debt.json`, all hold or improve.
- [ ] At least one far place exists and opens on the mission the campaign first
      sends someone there — never mission 1 — and has a reason to be entered
      (`placement.mjs` clean, traffic table shows a visit).
- [ ] Every mentioned-only equation checked for a mandate-1b tie; the equation is
      shown at the mention with the best narrative fit, and nowhere it doesn't fit.
- [ ] Warm-ups land only before missions 1, 4, 8 and 13 (as many of those four as the
      campaign's length reaches) — none before mission 2, none anywhere else. The
      mission-1 warm-up's `why` is one sentence and carries no story.
- [ ] Every segue checked against its next mission's `stake`: no repeated headline
      fact, and the segue reads as consequence to the people in it, not a recap of
      what the science concluded.
- [ ] The opening card is **five sentences or fewer**, one paragraph, and its
      beats are threat / authority / clock / who pays — no sentence describing what
      the handover document contains, and no per-day "one figure a day" line. Its
      `plainCards` grade holds or improves against the banked `worst`.
- [ ] Whatever load-bearing fact came out of the opening card is in day 1's
      `stake`, and day 1 reads correctly without it having been said twice.
- [ ] (Quick Discoveries) the cost of being wrong is somebody's, not the lab's — no
      variant of "four benches waste a week", and no "the X, the Y and the Z all
      come through you".
- [ ] `npm run check <theme>` green. (Full `npm run check` and every `--write-debt`
      re-bank are the orchestrator's, not yours, whenever this runs as one of a
      batch.)
- [ ] Screenshots taken and looked at (`shots.mjs --room all`), not just built.

## What NOT to do

- Do not touch `engine/core/*`, `engine/world/*`, or any other theme's files. One
  campaign, one agent, its own `books/<theme>.yml` + `themes/<theme>/*`. This
  includes `engine/core/warmups.js` — mandate 4a is a prerequisite done once, before
  any campaign agent runs, never by a campaign agent itself.
- Do not invent a new argument, cast member, or place name that contradicts
  `GAMES.md`'s entry for this campaign or `STORY_SPEC.md`'s rule-1 table — extend
  what exists.
- Do not chase the reported mean grade past what the ratchet actually requires; a
  technical campaign at `audience.grade: 12` is not trying to read like a
  children's book. Holding the banked `over`/`worst`/`long` numbers is the whole
  obligation.
- Do not write a segue toward the turn rule's word list. The gate reads for a
  complication or a forced consequence in any wording; a connective bolted onto a
  science recap passes the word check and fails everything the card is for.
- Do not pad the opening card back to length to clear the 70-word floor. If four
  beats come to 62 words, the theme wants `stakeStyle: 'brief'` in its manifest
  (which removes the floor entirely) — say so and stop, rather than writing a fifth
  sentence with nothing in it. Five themes already carry that flag.
- Do not merge branches, push, or run destructive git commands. Commit only if
  asked.

## After all ten report — the orchestrator's steps, run ONCE

Nothing here is a campaign agent's job, and every line of it is wrong if run while an
agent is still working. In order:

```sh
cd gamekit
npm run check                                    # all 62 themes + the repo-wide tail
node engine/dev/plainCards.mjs --all             # read the numbers BEFORE banking them
node engine/dev/plainQuestions.mjs --all
```

Read those two reports against what the agents said they achieved. A theme whose
numbers got *worse* than the agent reported means somebody edited outside their
assignment — find it before banking, because banking makes it the new floor and the
ratchet never asks again. Only then:

```sh
node engine/dev/plainCards.mjs --write-debt       # re-banks ALL themes; this is why it runs once
node engine/dev/plainQuestions.mjs --write-debt
node engine/dev/checkStory.mjs <theme> --write-debt   # per theme, only where a segue deliberately still owes the gate
```

## Per-agent prompt (fill in `<theme>`)

> Apply the brief in `gamekit/THREE_PASS_BRIEF.md` to the campaign `<theme>` only.
> Read that file first, in full, before touching anything. Confirm mandate 4a
> (the shared warm-up schedule change) is already done — do not do it yourself. Then
> read `books/<theme>.yml`, `themes/<theme>/theme.js`, and `STORY_SPEC.md`'s rule-1
> row for this campaign. Cut the opening card in `themes/<theme>/theme.js` to five
> sentences on the four beats first (mandate 6), noting which fact moves into day 1.
> Then do the accessibility, story-stakes, equation-exposure
> (1b) and segue-continuity (5) rewrite as one pass per card (brief section "Order
> of operations"), then the placement pass, then the mission-1 warm-up's one-sentence
> rewrite (4b). Run the verification loop after every mission and again at the end.
> Report: what ratchet numbers moved, which far place you opened and when, the
> one-line arc you wrote down before touching prose, any mentioned-only equation
> you exposed (or deliberately left alone for want of a good tie), and the opening
> card before and after with its sentence count, word count and `plainCards` grade
> on both sides.
>
> You are one of ten agents working in this one checkout at the same time. Touch
> only `<theme>` (and its editions, if the family table lists any — they are yours
> too). Never run `--write-debt`, never run `npm run check` without a theme
> argument, and never run `git add`, `git commit`, `git stash` or `git checkout` —
> read "Running ten campaigns at once" at the top of the brief for why each of those
> corrupts the other nine. If a check fails in a theme you were not given, say so
> and stop; do not fix it.
