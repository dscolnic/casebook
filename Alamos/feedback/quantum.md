# Quantum — play-through review

*Theme `quantum` · graduate-level quantum computing (no `audience` declared, so undergraduate default) · 15 days, ~45 stops · reviewed 2026-08-21 by reading the full book (`books/quantum.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The most intellectually ambitious campaign in the catalogue, and the only one whose subject is *how a laboratory fools itself*. Its spine is not a broken instrument but a broken **method**: a discriminator tuned on the data it was later scored against, which inflated a fidelity, put a wrong number in a conference abstract, and was only caught because a second group with better hardware reported a worse result. That is a real class of scientific failure that nothing else here attempts.

Day 11's HOLDOUT is the best single panel in the repo. It makes the winner's curse *playable*: the tray-A curve has a spurious peak at 14 mV that beats the honest middle, and tray B — sealed until you freeze — gives that same threshold 92.5 against the middle's 95.7. A player who chases the best visible score is punished by arithmetic rather than by a lecture. The five background paragraphs on that stop are the best teaching writing in the catalogue, and they earn their length.

The four live instrument panels (PROBE, SWEEP ×4, TALLY, HOLDOUT) are all here and all doing work only they can do. This is also the campaign that most needs a proofreading pass: three verdicts shipped with sentences the numeral-normalisation pass had destroyed.

**Answerable:** 44/45 clean. Three verdicts were unreadable (QU-01, fixed).
**Sense:** Excellent, with genuine cross-day consequence (the day-2 defect met again from the other side on day 6; the day-4 threshold caught on day 11).
**Level:** The highest in the set, and appropriate — this is a graduate research group, and the honesty about model dependence is what makes it teachable.
**Fun:** High for the right audience. Day 12 ("a day when the machine behaves") is a deliberate breather and one of the best-conceived days anywhere here.

## Fixed during this review

Three shipped verdicts had prose destroyed by numeral normalisation. All three reached the player. Repaired and re-imported; theme is green.

| Stop | Shipped as | Now reads |
| --- | --- | --- |
| Day 8, "What averaging buys" | "…the reason sensing is a patience problem rather than a **precision 3 things then fight.**" | "…rather than a precision problem. Three things then fight." |
| Day 9, "Four correlations, one number" | "…can put the combination **either side of 600 usually does not.**" | "…either side of two, and 600 shots usually does not." |
| Day 1, "The energy of one quantum…" | The whole verdict wrapped in a literal `"` with `\"the ground state\"` inside, so the player saw backslashes and stray quotes | plain prose |

The day-9 one is the worst of the three: the sentence's job is to tell the player that 100 shots can land either side of **the bound of two** — which is the entire comparison the stop exists to make — and the number was eaten.

## The questions, solved

Verified: e^(−3.3e-24/5.8e-25) = e^−5.69 = 0.0034 (and the note that 11 mK gives ~3×10⁻¹⁰ checks out at e^−22); 84 ns ÷ 2 = 42 ns; 1/(1/32 − 1/180) = 38.9 µs; 0.988^400 = 0.0079; 0.941^12 = 0.476; 10^(12/10) = 15.85. The TALLY's four correlations are E = 2p−1 → 0.71, −0.69, 0.70, 0.68, giving S = 0.71 − (−0.69) + 0.70 + 0.68 = **2.78** exactly as claimed, between the classical 2 and the Tsirelson 2.83. The SWEEP curves are all correctly shaped: the qubit at 4.61 GHz with a decoy sixth-amplitude feature at 4.55; the T1 dip at 4.555 (the *same* defect, met from the other side four days later — the best cross-day detail in the repo); the averaging knee at 35 s where 1/√N gives way to drift; the discriminator floor at the crossing near −3 mV; the benchmarking half-life at 57 gates (0.988^57 = 0.50 ✓).

## Implemented since this review

- `dayNoun`.
- Numeral damage, including the damaged title *One bad qubit out of 12*.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| QU-01 | CLOSED | Days 1, 8, 9 | Three verdicts shipped with destroyed sentences (table above). | **Fixed during this review.** The class is catalogue-wide — see the cross-campaign document. |
| QU-02 | WORTH | No `audience` declared | `themes/quantum/theme.js` has no `audience: { grade }`, so `typography.js` applies no scaling and every grade-aware gate treats it as undergraduate. This campaign is plainly harder than that — CHSH loopholes, randomised-benchmarking metrics, threshold theorems, the winner's curse — and its own stakes read at research-group level. | Declare `audience: { grade: 16 }` (or whatever the house uses for postgraduate). It changes nothing about the content and it stops the grade-8 gates and the reading-level notes being applied against a course they were not written for. |
| QU-03 | WORTH | Day 11 HOLDOUT, `pass: 94.8` | The pass mark sits at 94.8 while the honest middle of the curve scores 94.9–95.7 on tray B and the spurious peak scores 92.5. That is correct and tight. But the *fit* curve's plateau (−9 to 0 mV) is 94.8–94.9 — so a player who picks the plateau and is then scored on tray B passes, and a player who picks the peak fails, which is the intent. Worth confirming by screenshot that the 0.1-point margin between plateau and pass mark is not sensitive to how the panel rounds. | Screenshot the panel and check the boundary. If it rounds against the player, drop `pass` to 94.0 — the lesson is peak-versus-plateau, not a tenth of a point. |
| QU-04 | WORTH | Day 3 "What scrambles a phase without taking energy" (PROTOCOL) | Two of the four right-column entries are near-identical: "Dephasing — it moves the frequency without taking energy" and "Dephasing, by the same route as flux noise." On a matching board where every response is used once, two responses that say the same thing make the pairing arbitrary between rows 1 and 2 — a player who swaps them is wrong for no reason the physics supports. | Differentiate the second: "Dephasing, through the same frequency shift but from a control line rather than the environment." The rebuttal already makes that distinction; the option should carry it. |
| QU-05 | WORTH | Day 13 "Three things at once" | Shared mission title and DELEGATE-stop title with Blackout, Aftershock, Midway and Red Sand (eight books carry "Which of the three cannot wait"). Quantum's version is well-adapted — a cut fibre, a drifting clock, a review deadline — but the title is the fifth appearance. | Retitle. See the cross-campaign document, §6. |
| QU-06 | TASTE | Day 1 PROBE "Which stage the leak is on" | The one PROBE stop in the repo, and it is good — the two unchanged top stages are what rule out a whole family of causes. But `minReadings: 3` on six stations means a player can commit after reading only the mixing chamber and two others, and the *reasoning* the verdict describes requires reading the top of the chain specifically. A player who reads the three coldest stages and commits gets the right answer for the wrong reason. | Either raise `minReadings` to 4, or have the panel's commit note say the answer has to explain the stages that did *not* move. The verdict already says it; the panel does not require it. |
| QU-07 | TASTE | ~26 stops | The repeated format boilerplate in `background`. Called out here because day 11's five stop-specific paragraphs prove what the door is worth when it is not preceded by text the player has read fifteen times. | Keep each essay on first use per format. |

## Day-by-day notes (short)

- **Day 1** — A PROBE, an exponential-suppression estimate, and a TRIAGE about what is worth measuring on a broken machine. "A warm-state diagnostic filed as a baseline is worse than no measurement at all" is the right first lesson.
- **Day 2** — Finding the qubit by sweeping for it, then turning the drive into a pulse. The decoy feature at 4.55 GHz is planted here and collected on day 6.
- **Day 3** — T1 against T2 read off the same curves at the same fraction, then the rate-subtraction, then the mechanism board. QU-04 sits here.
- **Day 4** — The readout chain, the discriminator threshold, and the error budget. The threshold stop's closing background line — "a threshold set in the wrong place does not announce itself; it quietly lowers whatever is reported downstream, which is a thing that happens to this group again on day 10" — is a campaign telling the player where the trap is and still catching them.
- **Day 5** — The Delft offer. The PROTOCOL on what may cross and what must not ("importing Ridgeway's fitted rule would preserve a common failure mode") is the best replication-methodology stop I have read.
- **Day 6** — The defect traced to a fabrication window, then the T1 dip, then a TRIAGE that correctly refuses to revert a measured yield gain on a three-chip correlation.
- **Day 7** — The magnetometer day. The averaging SWEEP with a drift knee is the cleanest demonstration of "more data can make the answer worse" anywhere here.
- **Days 8–9** — Benchmarking, then CHSH. The Bell day is careful in the way that matters: it computes the number, states what it excludes, and then makes the player name the loopholes their own apparatus leaves open.
- **Day 10** — Reading a rival's advantage claim as three different kinds of statement. The CASEBOOK separating measured data, a model-dependent fidelity and a runtime conditional on this year's algorithms is excellent.
- **Day 11** — The HOLDOUT. Best panel in the repo.
- **Day 12** — The quiet day. Three stops about what a passing calibration, a converged optimiser and an inherited parameter actually establish. Nothing goes wrong and it is one of the strongest days here.
- **Days 13–15** — Triage, the correction window, and the closing sort by evidence class. "What outlives the fortnight" correctly picks the held-out evaluation over the pipeline versioning, and says why versioning is not the same thing.

## Opening and closing

Opening: "This morning the fridge came down to forty-two thousandths of a degree instead of eleven. That is the difference between a quantum processor and a warm chip." Situation, authority, stake, and a named person who needs the answer. Keep.

Closing: three paragraphs. The middle one lists what is unfinished — "the gate error is above the threshold where error correction starts to help" — and the last is addressed to the player: "you tested the analysis on data it had never seen, you ran the tune-up again instead of publishing the number you wanted, and you said in public which part of it was your own mistake. A field is a little closer to true because of that." That is the best closing line in the catalogue.

## What to keep

- The HOLDOUT, and the five background paragraphs that make it teachable.
- The defect planted on day 2 and collected on day 6 from the other side — absorbing drive in one stop, draining energy in the other.
- Day 12 as a day when nothing is wrong.
- Every stop that names its own model dependence: "for *this stated simplified model*", "toy model", "not a measured twelve-qubit circuit fidelity". No other campaign is this careful, and the care is the curriculum.
