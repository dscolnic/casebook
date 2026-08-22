# Project Y — play-through review

*Theme `projecty` · nuclear physics, measurement and scientific responsibility (undergraduate) · 15 days, 52 stops · reviewed 2026-08-21 by reading the full book (`books/project-y.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The most accurate physics teaching in the catalogue and the least dramatised. Every one of the seventeen estimate boards reproduces from first principles — mass defect to binding energy per nucleon, the decay law through to activity, macroscopic cross section to mean free path to exponential attenuation, Poisson counting statistics, a spontaneous-fission neutron background against a microsecond assembly, an equation of state as pressure times volume, four half-lives read off a factor of sixteen, simultaneity as 0.4 m over 2 × 10⁸ m/s, motion blur, quadrature timing jitter, quadrature uncertainty propagation, an acceptance criterion, a critical-path float, a prediction band in sigmas. There is no fudged number in this book.

Its real subject is better than "how the bomb worked", and it is stated in the opening card: Oppenheimer "holds a meeting every week where anyone may be asked anything, **so that being wrong costs days instead of months.**" The campaign is about what a measurement can and cannot say, in a place where certainty arriving too early was worse than being wrong. Day 5's TRACE — *are the neutrons missing, or the counts?* — is the whole thesis. Day 6's SEQUENCE on why Thin Man was abandoned is the correct way to teach the design pivot: a spontaneous-fission rate against an assembly time, worked out, and the architecture follows. And day 15 ends on scientific responsibility with a key that draws the right line — provide a clear technical account of expected consequences and uncertainties, **while labelling separately any personal or political recommendation.**

But it is the campaign that most shows its origin. Project Y and the hospital predate the book format and were converted from Word documents, and the seams are all in the same place: **the questions are topics rather than situations, and there is almost nobody in them.**

**Answerable:** 52/52. Nothing is unreachable and nothing is mis-keyed.
**Sense:** The physics coheres. The fiction barely exists between the day stakes.
**Level:** Undergraduate and pitched consistently. The arithmetic is genuinely well graded.
**Fun:** The lowest in the set, and PY-01 is why.

## The measurement that matters

I ran one number across all forty-two campaigns: **how many stop scenes name somebody from the roster.**

| Campaign | Scenes naming a person |
| --- | --- |
| Yellow Bay | 45 of 45 (100%) |
| Sightline, Headwater, Dark Fibre | 94% |
| Overwind, Ground Truth, Ice Core, The Trial | 90–92% |
| *median across 42 books* | *~70%* |
| Deep Watch | 16 of 48 (33%) |
| Outbreak: Riverton | 12 of 48 (25%) |
| Bring Them Home | **0 of 48** |
| The Contaminated City | **0 of 48** |
| Planetary Defense | **0 of 48** |
| **Project Y** | **1 of 52** |

All four zero-rate books name a person in **every** day stake — 15 of 15 — so the cast exists and is properly introduced. What is missing is people in the room where the work happens. A player reads "Ines Calloway has the landings book open at two pages" on Wellmere and "The Theoretical Division needs a reaction rate and has a cross section written in barns" on the mesa, and the difference is not vocabulary or difficulty; it is whether anybody is there.

## Implemented since this review

- **PY-02**, the missing cost paragraph. The ending now names what the fortnight cost and what was still open at the freeze — the equation of state at pressures nobody could reach, the last few per cent of implosion symmetry, and what the fallout would do downwind — and it keeps the day-15 distinction between a technical account and a recommendation.
- **PY-04 is now measured**: `engine/dev/sceneCast.mjs` reports the share of scenes naming somebody for every theme and records the eight campaigns under one in ten. **PY-01 is deliberately not fixed** — 296 scenes across eight books is writing, and a name pasted onto forty-eight scenes is worse than none.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| PY-01 | RECORDED | All 52 stop scenes, and the stop and mission titles | **The docx origin is still visible in every card the player answers, and it is the reason this campaign is less engaging than its physics deserves.** Three symptoms of one cause. (a) **1 of 52 scenes names a person** — see the table. Scenes are institutional: "The Theoretical Division needs a reaction rate", "Chemistry and Metallurgy is being asked what it can and cannot deliver", "After Trinity, reports of yield, fallout, and measurement uncertainty are spread across the laboratory." (b) **The stop titles are syllabus headings, not situations**: "The nucleus as a physical system", "Isotopes and chemical identity", "Reaction cross sections", "Poisson counting statistics", "Equations of state", "Phase diagrams", "Mechanical properties". Every other campaign titles a stop after what happened — "The rope is heavier than the cage", "A metre and six tenths", "Rust has selected it every year the vault was standing still". (c) **The mission titles are learning objectives in the imperative**: "Read the atomic world", "Account for nuclear energy", "Follow radioactivity through the laboratory", "Recognize the design pivot", "Make symmetry measurable". Those are chapter aims from a course document, and they are what the player sees on the plan card fifteen times. | This is an editorial pass, not an engine change, and it is the highest-value single piece of work available on this campaign. **Do the scenes first**: the roster is 26 people, all with written bios and quizzes, and each day's stake already names two or three of them. Putting the day's named person into that day's three or four scenes is roughly 52 sentences and it converts the campaign from a course into a fortnight. **Then the titles**: retitle after the finding rather than the topic — "Reaction cross sections" becomes something like "One barn, and a hundred centimetres of graphite"; "Why Thin Man was abandoned" is already right and shows what the others should look like. **Then the mission titles**, which are fifteen lines. Note that four stop titles already do it correctly — "Will it hold a chain, or will it not", "Just critical, for as long as it takes", "Where the fragments go", "The plot that makes a decay a straight line" — and they were plainly written later. Use them as the register. |
| PY-02 | WORTH | `ending:` | Three paragraphs, and it is the only ending in the catalogue with **no numbers, no cost list and no unfinished business.** It says the technical questions closed in August 1945, the war ended, the mesa emptied, the physics did not stay secret, and "that record is the part you inherit." Every other campaign's second paragraph names what it cost — *eleven sols of production and one catalyst charge with no replacement on the planet*, *twenty-four gondolas stood still through the whole season*, *Alma Cardoza learned from a newspaper*. Here the cost of the fortnight is the one thing a Project Y ending cannot avoid and it is not in the card. The third paragraph is addressed to the player and is good. | Write the second paragraph the way the other twenty-four do, from the campaign's own material: what the measurement programme cost in time and material, what the uncertainty budget still could not close at the freeze, and what was left unresolved in August 1945 — the campaign's own day-15 stop is about exactly that. **The consequences belong here too**, stated as the day-15 key states them: a technical account of expected effects and their uncertainty, separately from any recommendation. This campaign has earned the right to that paragraph by teaching it, and leaving it out reads as an evasion rather than as restraint. |
| PY-03 | WORTH | Seven of fifteen days author 4 stops | Days 2, 8, 11, 12, 13, 14 and 15 each carry four — the highest count of any senior campaign. `dayCalls` passes, because `shapeMissions` responds by adding **no callback**, and Project Y therefore has **zero days with a callback** (I checked the normalised content directly). See PY-04: that turns out to be true of 37 campaigns for a different reason, so it is not this campaign's fault — but the four-stop days are the reason it could not be fixed here even if variants existed. | Prefer a move to a delete. Days 1, 3, 4, 7, 9 and 10 carry three, and several of the extras have a natural home: the criticality HOLD belongs with day 5's neutron transport rather than day 8's timing; "Where the fragments go" belongs with day 2's binding-energy day, not day 11's uncertainty budget. Four moves brings seven four-stop days down to three. |
| PY-04 | DECISION | The callback mechanism, all campaigns — surfaced here | **Project Y has no spaced retrieval, and neither do 36 other campaigns.** The engine's rule is that from day 3 every day carries a callback revisiting an area taught earlier — CLAUDE.md calls it "the spaced retrieval that fixes" blocked practice, and "why a day has a second building to walk to". But the callback now requires an **unserved `— Review` variant**, and only **five of forty-two books author any**: hospital 105, sightline 10, sightline_ms 9, redsand 9, redsand_ms 9. I measured the normalised content: days carrying a callback are hospital 13, redsand 8, sightline 7, redsand_ms 8, sightline_ms 6, **and zero everywhere else.** The 295-duplicate defect was fixed by making the callback conditional, which was right; the consequence nobody measured is that the mechanism then fired in 12% of campaigns. | This is a cross-campaign decision rather than a Project Y fix, and it belongs in the summary document (§9). Three options, in increasing cost. **(a)** Accept it and delete the claim: if 37 campaigns have no callback, CLAUDE.md's "from day 3, every day carries a callback" should say "where a review variant exists", and the day model documentation should stop describing it as the answer to blocked practice. **(b)** Author variants where they are cheapest: a `— Review` variant is a second question on a lesson already written, and three or four per campaign would give the back half of every campaign a callback on most days. Red Sand and Sightline did it with nine each. **(c)** Let the callback re-serve with a *different* format on the same concept rather than requiring a new lesson — retrieval with a changed surface is what spacing research actually asks for, and it would not re-serve a byte-identical card. That is an engine change and needs its own selftest. |
| PY-05 | WORTH | ~26 stops (328 collapsed paragraphs) | Repeated format boilerplate in `background`. **Project Y is the worst-affected book in the catalogue by a wide margin — 328 repeated paragraphs**, against Red Sand's 118 and zero in six of the newer books. Every stop carries an authored `guide` and an authored `background`, which is the right shape; the problem is that most of the background is the same three essays. | Keep each essay on first use per format. Cross-campaign §2. On this book it is worth more than on any other. |
| PY-06 | WORTH | `curriculum-debt.json` (2), `concept-debt.json` (2) | `A = λN` and `I ∝ 1/r²` are listed by the syllabus and computed by no question; and attenuation and criticality both rest on cross sections and mean free path without an earlier claim. The first is odd, because day 3's own board *does* compute activity from λ and N — the solution reads "A = λN ≈ 0.12 s⁻¹" — so this may be a detector miss rather than a content gap. | Check `A = λN` first: if day 3's board computes it, the row is paid and should be deleted, and if the gate cannot see it the gate is what needs looking at. `I ∝ 1/r²` genuinely is uncomputed — the day-15 board computes 2 cm × √100 = 20 cm, which is a statistics result, not an inverse square — and it wants one stop. The two concept rows are one `takesAsRead` each. |
| PY-07 | TASTE | Day 8 "Just critical, for as long as it takes" (HOLD) | Recording this as the best-titled stop in the campaign and the model for PY-01. It is a HOLD format, it names the physical condition, it says what the difficulty is, and a player knows what they are about to do. Compare "Phase diagrams" two days earlier. | Nothing. Use it as the register for the retitling pass. |

## Day-by-day notes (short)

- **Days 1–2** — Read the atomic world; account for nuclear energy. The mass-defect board and the DEGENERACY on one reference line not being a calibration are both strong. "Will it hold a chain, or will it not" is a BELT and the best-named stop in the first week.
- **Days 3–4** — Follow radioactivity; measure interactions not impressions. The decay-law board is a three-step chain (λ, then N(t), then A) which is exactly the right shape, and the CONTROL on what carries the background is the campaign's method arriving as an instrument.
- **Days 5–6** — Track neutrons; recognise the design pivot. **The best two days.** The TRACE (*are the neutrons missing, or the counts?*), then spontaneous fission against assembly time, then why Thin Man was abandoned. The physics and the history are the same argument here.
- **Days 7–9** — Matter under compression, symmetry made measurable, evidence with real materials. Simultaneity at 2 ns, timing jitter found by CONTROL, and the CHOICE on why a handling limit is written down — *it keeps any single credible handling error from consuming the entire safety margin* — which is the best safety sentence in the repo.
- **Days 10–12** — Synchronise many channels; build an uncertainty budget; design the non-nuclear campaign. Quadrature twice, an acceptance criterion that fails at 99 against a 100 threshold, and the scaled-shot CHOICE about which conclusions transfer.
- **Days 13–15** — Treat Trinity as an experiment; reconcile and freeze; complete the chain. The prediction band at 0.5σ, isotope separation as a physical rather than chemical problem, and the responsibility stop.

## Opening and closing

Opening: "It is April 1943, and the site is three weeks old: a boys' school on a mesa in New Mexico with a laboratory going up around it… Nobody yet knows whether the thing on three blackboards will work at all. Oppenheimer, who directs the laboratory, holds a meeting every week where anyone may be asked anything, so that being wrong costs days instead of months." All four beats, a named person with the job attached, and the last clause is the best statement of an institutional value in the set.

Closing: see PY-02. The third paragraph — "you settled what a measurement could and could not say, in a place where being wrong was expensive and being certain too early was worse" — is right. The second paragraph is the gap.

## Warm-ups

All seven authored and specific to a compartmentalised site. GREET's justification is the best in the repo: *"half of them are not allowed to say what they are working on… compartmentalisation means the only way you will know who to ask is having been introduced to them by somebody who knows what you are cleared for."* That is a warm-up whose reason is a property of the place. No findings.

## What to keep

- Every number. Seventeen boards, seventeen correct results, no fudging.
- "So that being wrong costs days instead of months."
- Day 5's TRACE and day 6's SEQUENCE: the design pivot derived from a spontaneous-fission rate rather than asserted from history.
- "It keeps any single credible handling error from consuming the entire safety margin."
- The day-15 line between a technical account and a recommendation, kept separate and both named.
