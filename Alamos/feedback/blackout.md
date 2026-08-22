# Blackout — play-through review

*Theme `blackout` · senior-high electrical engineering (grade 12 manifest) · 15 days, ~45 stops · reviewed 2026-08-21 by reading the full book (`books/blackout.yml`), solving every question, and reading opening, stakes, warm-ups, interiors and ending in play order.*

## Verdict

Structurally the strongest campaign in the set. Its spine is a single wrong number: on day 4 the room holds a corridor inside an emergency rating derived from a sensor nobody has checked; on day 9 that corridor trips at the worst hour of the worst day; on day 11 Farrow traces the sensor and the rating was never real; day 12 re-reads the whole fortnight from it; day 15 makes "cross-check any instrument a decision rests on" the practice that outlives the emergency. Days 9–12 are the best four consecutive missions in the repo. The two CASEBOOK stops on day 11 — which of the week's conclusions still stand, and why each one falls or holds — are the single most sophisticated thing any of these games asks a player to do.

Against that: **three CHOICE stops are keyed to the wrong option**, two of them in this book and one in its junior edition, and all three are live in the shipped generated content. On each, the stop's own `answerText`, `why` and rebuttals state the correct answer while `answer:` names a distractor — so a player who reasons correctly is marked wrong and then shown a verdict that agrees with them. One of these is the transformer stop that `equationSupply.mjs` was written for.

**Answerable:** 41/45. Three stops mark the right answer wrong (BL-01, BL-02, BL-03); the corridor's numbers do not reconcile across five stops (BL-04).
**Sense:** Excellent between missions. Inside individual cards, this book has the most numeric drift of any reviewed.
**Level:** Right, and the ladder is well built — I²R, then three-phase √3, then impedance in quadrature, then a fault current, then annealing.
**Fun:** High, and unusually well paced: day 10 is deliberately a shift where nothing happens, and the book says so.

## Opening blurb

> "The Calder network carries electricity to four million people, and all of it runs on one number… A fault takes seconds; getting a system back takes days."

Both leads named with their positions and their disagreement stated. One of the two best openings in the set. Keep.

## The questions, solved

Verified: 187/220 = 0.85; 3 × 1150² × 4.2 = 16.66 MW; 3 × 1280² × 4.2 = 20.6 MW; 2 × 25,000 × 0.30 ÷ 50 = 300 MW; √(3.1² + 12.4²) = 12.78 Ω; 900 × 3 ÷ 9 = 300 A; 1.732 × 11,000 × 310 × 0.95 = 5.61 MW; √3 × 310 × (1.8×0.95 + 0.9×0.31) = 1,069 V; 6,350 ÷ 0.42 = 15.1 kA; 6,400 + 120×4 = 6,880 MW; 300 × 2.5 = 750 MWh. The DEGENERACY (island: |ΔP|/E_k = 0.004 s⁻¹, inertia measured at 25,000 MW·s ⇒ 100 MW) is correct and is the best use of that format in the repo — a slope genuinely cannot separate the two unknowns. The CHAIN's governing link is the 8 MW startup feeder against a 500 MW distractor. The SWEEP's curve steepens correctly (heat ∝ I²).

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| BL-01 | CLOSED | Day 1 "The reason the wires are not at wall voltage" (CHOICE) | The key is wrong. Options include "Current falls by 20× and resistive line loss falls by **400×**" (correct) and "…falls by **20×**", and `answer:` names the 20× one. The stop's `answerText` says "Resistive loss then falls by 20² = 400×", the `why` says "Resistive loss then falls with current squared", and the first rebuttal — written against a wrong option — says "Loss then scales with the square of that current, **not in direct proportion**", which refutes the keyed answer. Verified live: `themes/blackout/content/curriculum.js` carries `correctChoice: "…falls by 20×"`. This is the stop CLAUDE.md records as the origin of `equationSupply.mjs`. | One line: `answer: Current falls by 20× and resistive line loss falls by 400×.` Then re-import and confirm `correctChoice` in the generated content. |
| BL-02 | CLOSED | Day 6 "Two instruments, two quantities" (CHOICE) | Same defect. Options are `325 V ≈ 230 V × √2` (correct, first) and `325 V ≈ 230 V × 2`; `answer:` names the ×2 option. `answerText` says "325 V ≈ 230 V × √2", the `why` derives 325/1.414 = 230, and the first rebuttal says "Doubling would make peak twice RMS, but a sine wave differs by root two." **`books/blackout-fable.yml` — the same-grade rewrite of this campaign — keys the identical stop correctly**, which is what proves this is a regression rather than a choice. | `answer: 325 V ≈ 230 V × √2.` |
| BL-03 | CLOSED | `blackout_ms` day "Two instruments, two numbers" (CHOICE) | The junior edition has the same bug in the same lesson: options include "The peak is about 1.4 times the meter's number" (correct) and "about twice"; `answer:` names "about twice", and the first rebuttal reads "Twice would make the peak 460, and the scope is showing 325." Separately, that stop's `why` says "the peak sits about **one and a half** times higher" — the factor is 1.41, and 1.5 is a number a grade-6 reader will carry forward. | `answer: The peak is about 1.4 times the meter's number.` and change "one and a half times higher" to "about one and a half times" → better, "about forty per cent higher". |
| BL-04 | CLOSED | The corridor, across five stops and one interior panel | The corridor's numbers do not form one picture. Continuous rating is **1,060 A** on the TRANS interior panel and **~1,150 A** in the day-11 SWEEP (the current at which the conductor reaches its 75 °C limit). Loading is "108% of continuous" in the day-4 TRIGGER (= 1,145 A at 1,060, or 1,242 A at 1,150) while day 2 has the corridor carrying **1,280 A** and day 1 has **1,150 A**. Emergency rating is "1,240 A for 30 min" on the panel and "120% of continuous" in the TRIGGER (= 1,272 A at 1,060). A player tracking the corridor — which days 4, 9 and 11 all require — cannot reconcile these. | Fix one canonical set and propagate. Suggested, because it preserves the SWEEP reveal and day 4's 108%: continuous **1,060 A**, emergency **1,270 A (120%)**, day-2 loading **1,150 A (108%)**, and the SWEEP's 75 °C crossing at **1,060 A** with 1,150 A reading 89 °C once corrected. Then the drifted sensor makes the corridor look *cooler* than it was, which is the story the campaign tells; at present the SWEEP implies the corridor could carry more than believed, which inverts it. |
| BL-05 | CLOSED | `interiors:` panel rows, six values | Thousands separators have been split by a space: `'6, 400 MW'`, `'4, 200 MW·s'`, `'1, 060 A'`, `'1, 240 A for 30 min'`, `'14, 200'`, `'6, 900 MW'`. These render on the room's instrument panel exactly as written, so the player reads "6, 400 MW" on the wall. | Remove the spaces: `6,400 MW` etc. Worth grepping `interiors:` in every book for `', '` inside a quoted numeric value. |
| BL-06 | WORTH | METER interior panel vs the day-3 TRACE | The panel says the SCADA scan is **4 s** and the TRACE says **2.0 s**; the panel says last calibration was **41 days** ago while the stake and the TRACE both say the relay clock was last checked **in the spring** (months). The panel is the instrument the room reasons with, so both numbers are read against the stop. | Set the panel to `2 s` and `last checked: spring` (or a month count consistent with it). |
| BL-07 | WORTH | Day 4 TRIGGER "What you do before a relay does it for you" | The stake gives the room "about 40 minutes" before the relay acts, and the TRIGGER's stream runs over **24 days** with `hoursLeft` from 576 to 0 and a six-hour redispatch lead time. Two incompatible clocks for one decision: minutes in the prose, weeks on the panel. | Decide which the day is about. If it is the 40-minute relay margin, the stream should be minutes and the lead time a redispatch that fits inside it. If it is the multi-day thermal creep the SWEEP later re-reads, the stake should say so instead of "40 minutes". The second reads better against day 11. |
| BL-08 | WORTH | ~12 stakes and scenes | Numeral-normalisation damage, same class as three other campaigns: "3 things arrive together… Reyes has 1 control room, 1 crew" (day 2); "the lower-impedance circuit carries twice the current of the older **1**" (day 7); "the newer **1** is 3 ohms"; "**2** methods that do not share the corridor sensor" (day 11); "**1** corridor above continuous rating" (interior); "11 feeders are still dead and the crews can only be in **1** place at a time" (day 5 briefing). | Editorial pass restoring the word where the digit replaced one that is not a count. |
| BL-09 | TASTE | Day 13 "Merit order" (SCIENCETANK) | The allocation rules are authored as four numeric constraints in prose (≥80 committed, largest ≥35, unsupported <15, supported ≥20) and the `recommended` block gives exactly A:55 B:25 — the unique allocation satisfying all four with two proposals. So the "portfolio judgement" the background describes has one arithmetic solution. Defensible as authored, but it is a puzzle rather than a judgement. | If the intent is judgement, widen the bands (largest ≥30, supported ≥15) so several allocations pass. If the intent is a puzzle, the background should stop describing it as a spread of belief. |
| BL-10 | TASTE | ~24 stops | The repeated format essays in `background`. Same as every campaign; noted again because this book's stop-specific backgrounds are the best in the repo (the current-transformer explanation, "what sets the temperature", "why the room wants the wrong thing" on black start) and they sit behind boilerplate the player has learned to skip. | Keep each essay on first use per format. |

## Day-by-day notes (short)

- **Day 1** — Round-trip efficiency, the transformer stop (BL-01) and Kirchhoff's node law. A good opening triple, one broken key.
- **Day 2** — DELEGATE with "watch it" explicitly refused is the format used properly. The SEQUENCE with authored `axis`/`ends` ("Improves your information" → "Cannot be taken back") is a model non-chronological rail.
- **Day 3** — The df/dt inference (300 MW from a slope and an inertia figure) is exactly the right hard question. The TRACE on three records of eight seconds is excellent and the relay-clock answer is derivable.
- **Day 4** — BL-07 sits here. The physics of the TRIGGER is right; its clock is not.
- **Days 5–7** — Distribution block. The dialysis-clinic CHOICE is decided on two grounds (consequence of waiting *and* job length) and says so, which is better than most triage questions.
- **Day 6** — BL-02. Otherwise the √3 stop and the synchronising SEQUENCE are both strong.
- **Day 8** — Fault current and the CONTROL on a current transformer (steady DC produces nothing) is a genuinely surprising, genuinely fair experiment.
- **Days 9–12** — The campaign's spine, and it holds. DEGENERACY on the island slope, CHAIN on black start, the sensor DIAGNOSIS, the SWEEP, and two CASEBOOKs that ask which conclusions survive a bad input. Nothing else in the catalogue does this.
- **Days 13–15** — SCIENCETANK (BL-09), the annealing CHOICE, and an ATTEST that spends two checks by consequence. The closing CHOICE names the practice the whole fortnight was about.

## Closing blurb

Three paragraphs. The middle one — "What it cost… What is unfinished: the trip has no proven cause, the store has been measured once, and the practice that would have caught all of it is a paragraph in a report until somebody on nights makes it a habit" — is the best paragraph of prose in any of these games. The third addresses the player specifically. Keep all three.

## Warm-ups

All seven authored and specific: six earths against a log that says five; the contractor who wants a verbal instruction in the yard; catching Whitlock before she drives off with the only unfiled relay settings. Names arrive with jobs. No findings.

## What to keep

- The wrong-number spine (day 4 → day 9 → day 11 → day 15). It is the best long-form argument in the repo.
- Day 11's two CASEBOOKs. "One wrong number voids what leaned on it and nothing more" is a lesson no other campaign teaches.
- Day 10 as a deliberately quiet shift.
- The corridor as a recurring character — once BL-04 makes its numbers agree.
