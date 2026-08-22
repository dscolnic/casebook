# Hospital Heroes — play-through review

*Theme `hospital` · human body systems, observation and triage · `audience: { grade: 2 }` · 15 days, 45 stops + 105 review variants · reviewed 2026-08-21 by reading the full book (`books/hospital.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The campaign with the best **teaching structure** in the catalogue and the worst **prose hygiene**, and both facts come from the same place: it is the only game here with 105 authored review variants, and the only one whose text has never been swept since the numeral-normalisation pass ran over it.

What it gets right is the thing every other campaign in this catalogue is missing. **Hospital Heroes is the only game with working spaced retrieval.** I measured the normalised content of all forty-two themes: days carrying a callback are hospital **13**, Red Sand 8, Sightline 7, and their two junior editions — and **zero in the other thirty-seven**. The mechanism requires an unserved `— Review` variant, and hospital authors 105 of the corpus's 142. So a seven-year-old playing this game meets each idea again on a later day, in a differently-worded question, and nobody playing Blackout or Yellow Bay or Overwind ever does.

The second thing it gets right is safety framing, and it is relentless about it: **eleven stops carry an explicit disclaimer** — *"This is a math problem, not drink advice"*, *"The care team decides what numbers mean"*, *"Clean Team, Not DIY Doctor"* is an entire stop title. A game that puts a second grader in a doctor's coat has exactly one way to go wrong and this book closes it every time.

The third is the questions themselves. "Observation or Measurement?" on day 1 is the correct first distinction in all of science, asked of a seven-year-old with a thermometer. "Same Symptom, Same Germ?" keys to *not enough evidence — many different problems can make a person tired*, which is a refusal to conclude, taught at grade 2. "The Dusty-Room Clue" and "What Job Did the Skin Lose?" are both diagnostic reasoning from a functional deficit. This is a better science curriculum than most of what is taught at this age.

**Answerable:** 45/45.
**Sense:** Excellent. Every day is one body system and the systems accumulate.
**Level:** The prose is right for grade 2. **The demand is not** — see HH-01.
**Fun:** High for the audience. Names, faces, a ward, and a child who goes home.

## The questions, solved

Three estimate boards: 3 × 0.5 = 1.5 litres of water; 180 − 2 = 178 litres put back by the kidneys (real physiological numbers, correctly used, at grade 2); and 5 breaths × 4 fifteen-second parts = 20 breaths a minute. All three verified.

The rest are TRIAGE, CASEBOOK, SEQUENCE, DIAGNOSIS, CHOICE, CONTROL, CHAIN and VERIFY, and the format choices are well judged: CONTROL for the handwashing challenge and for tired muscles (change one thing, put it back) is exactly the fair-test idea the age wants, and CLAUDE.md is right that CONTROL and VERIFY should not be budgeted at this level.

## Implemented since this review

- **HH-01, the gate.** `questionLoad` now fails at grade 8 and below rather than only on derived editions, with `questionload-debt.json` beside it holding Hospital's 110 rows. Before this, the youngest audience in the catalogue was the only theme the gate reported and the only one it could not fail.
- **HH-02**, the ten damaged review-variant titles: *Six Patients, One First Room*, *Follow One Breath*, *Three Jobs, Three Organs*.
- **HH-03**, the numeral damage in the prose, including *"The earlier one is 98°F"*.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| HH-01 | CLOSED | `engine/dev/questionLoad.mjs`, line 516 | **The youngest audience in the catalogue is the one the audience gate cannot fail.** `questionLoad` reports **110 things that ask more than the audience** on hospital — three-and-four-name stops, 13-word options, four-card SEQUENCE boards graded as one exact permutation with no feedback until commit — and every one is advisory, because `const isEdition = !!editionBase(name)` and hospital is a base theme rather than a derived edition. Run across all 42 themes, **hospital is the only theme the gate reports at all**, and it is the only one it cannot fail. The twelve junior editions were all swept and pass. So the file's four numbers exist because of a lesson learned on the junior editions, and the one grade-2 campaign in the repo is exempt from them. | Two parts. **(a) The gate**: fail on `grade <= 8` rather than on `editionBase(name)`. Hospital will then fail with 110 problems, so it needs `engine/dev/questionload-debt.json` beside it — same two properties as the other debt files — and the 110 rows go in on day one. That converts an advisory nobody has to clear into a list that can only shrink. **(b) The content**: the biggest single win is the four-card SEQUENCE. Twenty of the reported problems are *"the SEQUENCE board carries 4 cards to order, graded as one exact permutation with no feedback until commit — 3 is the limit at this level"*, and 24 combinations with one attempt is a 4% guess for a seven-year-old. Dropping one card from each affected SEQUENCE takes it to 6 combinations and clears about a third of the list. The naming limit is next: "Who Needs You First?" names Ava, Ben and Maya, and "Six Patients, One First Room" names four — at grade 2 a stop with four names is also a memory test, and the fix is to describe two of them by what is wrong rather than by who they are. |
| HH-02 | CLOSED | Ten review-variant titles | Numeral normalisation has damaged **titles**, and only in the review variants — the base stops are correct and their variants are not: "Six Patients, One First Room" → **"6 Patients, 1 First Room — Review 2/3/4"**; "Follow One Breath" → **"Follow 1 Breath — Review 2/3/4/5"**; "Three Jobs, Three Organs" → **"3 Jobs, 3 Organs — Review 2/3/4"**. Ten titles, in the game whose reader is seven, on the cards that exist to be met a second time. Across the whole corpus there are fourteen damaged titles and ten of them are here. | Ten edits. Because the base titles are intact, this looks like the variants were generated after the pass rather than damaged by it — worth checking whether whatever generated them is still in use, since it would do the same again. |
| HH-03 | CLOSED | ~27 scenes, stories and verdicts | Numeral damage in the prose, and at grade 2 it is not cosmetic — it changes whether a sentence can be read aloud. The worst three: *"The earlier **1** is 98°F. The later **1** is 101°F"*; *"**1** minute has 4 15-second parts. So 18 beats in 15 seconds is **18 4 times**, which is 72"* — where a multiplication sign or the word "times" has been eaten and the sentence is now unreadable; and *"15 seconds is **1 quarter** of a minute"*. Plus "1 cup" ×17 and "1 minute" ×10, which are defensible as measurements in a senior book and are not defensible in a book whose house style is words. | Editorial pass, and this is the campaign to do first. "The earlier one is 98°F." "One minute has four fifteen-second parts, so eighteen beats in fifteen seconds is eighteen four times, which is seventy-two." Note the second sentence needs a real repair, not just a substitution — the operator is missing. Cross-campaign §1. |
| HH-04 | WORTH | Thirteen of fifteen days author 4 stops | The highest in the catalogue. `dayCalls` passes because 4 is `MAX_CALLS` and the callback is one of the four rather than a fifth — which is how hospital manages 13 callback days. So unlike Project Y's seven four-stop days, this is the mechanism working as designed. | Nothing to fix. Recording it because it is the *reason* hospital has spaced retrieval and the others do not: the callback is inside the day's four calls here, and elsewhere a fourth authored stop displaces it. |
| HH-05 | WORTH | `engine/dev/concept-debt.json`, 9 rows | Nine ordering rows: body temperature before homeostasis, digestion before levels of organisation, triage before vital signs and normal ranges, fluids before kidneys, germs before immune defence, imaging before the skeleton. CLAUDE.md records hospital being re-ordered once (15 → 9). The remaining nine are the hard half. **The junior-edition policy applies here** — `takesAsRead` is not available at grade 8 and below, because there is no earlier course to take it from — so these are ordering or writing work, not declarations. | Two look like genuine swaps. **Triage before vital signs**: day 1's TRIAGE opens the campaign and day 1's second stop is "Observation or Measurement?", which is the base — so this is a *within-day* inversion, and `openStopIndices` opens a day's stops in any order, which is exactly the case the gate exists for. Moving the TRIAGE to day 2 or the measurement stop to day 1 of a re-cut ordering fixes it. **Fluids before kidneys**: day 8 is "Water Watch" and its third stop is "What the Kidneys Do", same within-day problem. The other seven want a written claim rather than a move. |
| HH-06 | WORTH | `ending:` | Three paragraphs, and the second is one sentence: "Nurse Alex Lee says you can read the clues now, and the team wants you back tomorrow." Every senior campaign's second paragraph is the cost and the unfinished business. **At grade 2 leaving the cost out is probably right** — and the praise paragraph is genuinely good ("You picked the right child to see first, again and again"). What is missing is smaller and worth having: one concrete thing from the fortnight that is not finished, in a child's terms. | One sentence. "Mrs. Patel is still dizzy, and the balance doctor sees her on Thursday." A seven-year-old can hold an unfinished thing, and it is the difference between a ward and a scoreboard. |
| HH-07 | TASTE | Titles throughout | Hospital is the only campaign in Title Case — "Who Needs You First?", "The Blood Loop", "Germ Detective Shift". Every other book uses sentence case. It reads as a different house, which is the docx origin showing. | Leave it. At this age Title Case is arguably right, and the titles themselves are good — "Follow the Sandwich", "The Dusty-Room Clue", "Clean Team, Not DIY Doctor" are the best-named stops in the repo for their audience. Recording it so nobody "fixes" it by accident. |
| HH-08 | TASTE | ~26 stops (256 collapsed paragraphs) | Repeated format boilerplate in `background` — 256 paragraphs, second worst after Project Y's 328. At grade 2 the cost is highest of all: a seven-year-old who opens the Background door and finds the same two paragraphs they read yesterday learns not to open it. | Keep each essay on first use per format. Cross-campaign §2. |

## Day-by-day notes (short)

- **Day 1 (Morning Rush)** — TRIAGE, then "Observation or Measurement?", then the first exam room. Opening on a triage decision before teaching measurement is the HH-05 inversion, and it is also *dramatically* the right opening, which is why it is a real trade-off rather than an error.
- **Days 2–3** — Lunch Shift, X-Ray Day. "Follow the Sandwich" and "Three Jobs, Three Organs" are digestion taught as a route and as a division of labour.
- **Days 4–5** — Brain Signal Day, Heart on the Move. The hormone CHOICE — *a chemical message that travels in the blood and works slowly* — distinguishes nervous from endocrine signalling at grade 2, correctly, in one clause.
- **Days 6–8** — Sense Detective, Breathing Room, Water Watch. The kidney board's 180 litres filtered and 178 put back is the single most surprising true fact in the campaign and it is well placed.
- **Days 9–10** — Germ Detective Shift, Immune Team. The handwashing CONTROL and the *not enough evidence* DIAGNOSIS are the two best stops here.
- **Days 11–13** — Rehab Race, Skin Shield, Allergy Alert. "What Job Did the Skin Lose?" keying to *protection from the outside environment* is functional reasoning rather than recall.
- **Days 14–15** — Temperature Trouble, The Super Shift. The last day is six patients, one first room, and a handoff, which is the right closing shape.

## Opening and closing

Opening: "You are a new doctor at the children's hospital. Today is your first day on the ward. Children come in hurt, or sick, or scared. Some of them are too little to say what is wrong. Nurse Alex Lee will show you round this morning. Then she will start asking you what you saw… Three children are waiting by the door right now." Seven short sentences, a named person with the job attached, the player's job stated as looking closely, and a clock. The best-pitched opening card in the catalogue for its audience.

Closing: see HH-06. "Every one of them went home" is the right last fact.

## Warm-ups

All seven authored. No findings.

## What to keep

- The 105 review variants. This is the only campaign in the repo where an idea comes back, and thirty-seven others should be looking at it.
- Eleven safety disclaimers, in a game where a child plays a doctor.
- "Observation or Measurement?" as the second question a seven-year-old is ever asked here.
- "Not enough evidence — many different problems can make a person tired."
- 180 litres in, 178 back.
