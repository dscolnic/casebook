# Sightline — play-through review

*Theme `sightline` · AP Psychology (grade 12) · 15 days, ~46 stops · reviewed 2026-08-21 by reading the full book (`books/sightline.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The most *disciplined* campaign in the catalogue, and the one whose subject and format are best matched. AP Psychology is largely a course in how a judgement can be confidently wrong, and Sightline is fifteen days of taking one confident judgement apart without ever suggesting the person who made it was careless or lying. Alma Cardoza saw what she saw. Every single thing that went wrong afterwards was policy.

Three things nothing else here manages. First, the campaign is **built out of measurements rather than opinions**, and it says so: the review measures the distance instead of arguing about it, dates every claim in the file, and shows the array to forty people who were never there rather than asking the witness to be sure again. Second, **the numbers arrive in a sequence where each one demolishes the last**: the file says 22 metres, the survey says 34; the array has six photographs and a functional size of 1.54; the corner had 12.5 lux, and then a fault ticket on column 4471 removes the lamp that figure was calculated from. Third, and rarest, **the campaign is honest that the review's own conduct had costs**: Cardoza learned from a newspaper that the identification she gave in good faith had been taken apart, because the unit decided not to interview her and nobody told her anything.

No defects were found that need fixing. That is the second campaign of thirteen where I can write that sentence, and unlike The Trial it is not because the campaign is cautious — Sightline runs eleven distinct instrument formats including a SPOT, an INJECT and a DEGENERACY, and all of them land.

**Answerable:** 46/46.
**Sense:** Excellent, and unusually cumulative — the day-13 fault ticket only means anything because the player computed 12.5 lux on day 4.
**Level:** Right for AP Psychology and considerably more rigorous than the course requires. Functional array size, d′, and a Bayesian pool calculation are all above the syllabus and all correctly scaffolded.
**Fun:** High, in a register nothing else here uses. The pleasure is forensic rather than dramatic, and the fifteen days genuinely feel like assembling an argument.

## The questions, solved

All verified. 1 ÷ 6 = 0.167 as the pick rate from the procedure alone; 0.063 ÷ 22 = 2.86 mrad ≈ 10 arc minutes for the eye gap at the recorded distance; 1,800 ÷ 12² = 12.5 lux on the doorway; 40 ÷ 26 = **1.54 effective array members** against a nominal six; 3 × 10⁻⁴ × 34 = 1.0 cm as the smallest detail an eye resolves at the surveyed distance — which is why that stop is called "A centimetre of face"; z(0.70) − z(0.30) = 0.52 − (−0.52) = **1.04** for d′; 0.90 × 8 = 7.2 expected years against an apparent 0.75, which is the arithmetic of the nineteenth hour; (51 − 42) ÷ 7 = −1.29 standard deviations for the suggestibility score; 0.00025 × 15 = 0.0038, about 1 in 270, for the odds that the identified man is the offender given the pool.

Four panels deserve specific note.

**The six-seconds ALLOCATE (day 2)** is how a scalar pool should be built. Six seconds; the weapon takes 2.8 and is `protected` because attention is not voluntary; the face takes 2.0 and is `required` because without it there is no identification. That leaves **1.2 seconds**, which funds exactly one of "which way he went" (0.8), "what he was wearing" (1.2) or "whether there was a second man" (0.9) — and the number plate, at 1.6, is unaffordable at any point. The player discovers by arithmetic that a witness cannot have both the face and the plate, which is the entire encoding-capacity lesson delivered as a budget rather than as a paragraph.

**The DEGENERACY (day 14)** is the best use of that format in the repo. The arousal–performance curve is an inverted U, so the map from accuracy back to arousal is not one-to-one: a middling overall accuracy is produced both by moderate arousal with attention spread and by high arousal clamped on the weapon. Distress at interview cannot break the tie because every branch predicts it — it is arousal at *retrieval*. What breaks it is measuring central and peripheral accuracy separately. The verdict's closing sentence is the best in the campaign: *"her distress establishes nothing about her identification, and the pattern of what she is accurate about establishes quite a lot."*

**The SPOT (day 12)** is the argued exception the engine documentation describes, and here the argument is airtight. A review changes its question three times in a day — procedure, then what could have been seen, then what the witness was told afterwards — and nobody announces the change. The reason it is a *review* rather than a production line: a document read under the wrong question is not merely unhelpful, it is **ticked**, and the thing it would have shown is now behind a mark saying somebody looked. That is a genuinely original observation about how information is lost, and it is on the AP Psychology syllabus as post-identification feedback rather than being flavour.

**The two TRACE stops (day 7)** are the campaign's spine: four of five statements point at Ward, and the source they share is twenty minutes on a kerb. Agreement is not independence, stated twice, in two different currencies.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| SL-01 | WORTH | Day 1 "Six at once" vs day 8 "Six photographs, and how many alternatives" | Two effective array sizes: day 1's solution notes *"1 ÷ 3 ≈ 0.33 once three implausible fillers are discounted"*, implying a functional size of about 3; day 8 measures 40 ÷ 26 = **1.54**. This is a legitimate progression — day 1 is an analyst's eyeball estimate and day 8 is a mock-witness measurement — and it is the campaign's own thesis that the measurement beats the estimate. But nothing on day 8 says so, so a careful player is left with two numbers and no statement about which supersedes which. | One clause in day 8's `why`: "an eyeball count of plausible fillers put this near three; forty mock witnesses put it at one and a half, and the measurement is the one that goes in the report." That converts an apparent inconsistency into the campaign's best single illustration of its own method, at the cost of nineteen words. |
| SL-02 | WORTH | Days 3, 8 and 13 | Three days author 4 stops against the loop's 3. The extra stops are the PROBE walk-down (day 3), the filler BELT (day 8) and the INJECT (day 13) — three of the campaign's best, and none is a deletion candidate. | Prefer a move to a delete. Day 11 ("How sure, and when") is the natural home for the filler BELT, since it is about what a comparison is against; day 15 would host the INJECT well, as six hundred offender-absent arrays is the right last measurement before disposition. |
| SL-03 | TASTE | ~26 stops (85 collapsed paragraphs) | Repeated format boilerplate in `background`. Sightline is among the *least* affected books, and its stop-specific backgrounds are consistently first-rate — "why a review changes its question", "why the changeover costs a review", "why lineup protection comes from real alternatives". | Keep each essay on first use per format. Cross-campaign §2. |
| SL-04 | TASTE | Naming | Two people in the file are named only by surname in several stakes (Ntuli, Ilori) where the campaign's own rule — and `introRule` — is that the job arrives with the name. Both are correctly introduced on first mention; this is about the fifth and sixth mentions reading as inside-baseball to a player who met eleven names in a fortnight. | Optional. Adding the role back on a late mention costs three words and helps a player who put the game down for a week. Not a defect. |

Notable for its absence: **almost no numeral damage.** Sightline spells its numbers out — "forty mock-witness tally marks", "twenty-six sit under one photograph", "eight years and one month" — and the normalisation pass that mangled a dozen sentences in nine other campaigns found almost nothing here to break. Four occurrences total, none load-bearing. Whatever the house style argument is elsewhere, this book is the evidence for spelling them out.

## Day-by-day notes (short)

- **Day 1** — What the file claims. An ATTEST on what the store can stand behind, the 1-in-6 pick rate, and a CHOICE on what writing down the features of a sound procedure protects the review from — *"counting only the findings that point the way the room already leans."* That is the review's own bias named on the first morning, which is the correct place for it.
- **Day 2** — What a face is at that distance. The angle, the six seconds, and a VERIFY that predicts the suspect-pick share before forty cards turn.
- **Day 3** — Walk it. The PROBE — volunteers could describe *something* from every mark, so the question is at which station naming the individual stops working — is the single best use of that format in the repo, because the format's subject (take readings yourself along a physical chain and name where the pattern breaks) is literally the review's method.
- **Day 4** — Two lamps and a wet road. 12.5 lux, the weapon-focus DIAGNOSIS, and the CHOICE on why "street lighting normal" is not evidence: *nobody can now say what the officer compared it against.*
- **Days 5–6** — Four days before anybody asked, and the photograph in the evening paper. The forty-two-day BALANCE finding the interval that changed what sources were available is the cleanest use of BALANCE outside Wellmere's dry-matter ledger.
- **Day 7** — Two witnesses who agree. Both TRACE stops. The best day here.
- **Day 8** — How the six were chosen. Functional size 1.54, and a CLOUD that correctly separates moving the middle from narrowing the spread.
- **Days 9–10** — Thirty-four metres, and who was standing behind her. Two CONTROL stops back to back, one on room features and one on session differences, and both change one thing and put it back.
- **Days 11–13** — How sure and when, the nineteenth hour, and what a match is worth. The nineteenth-hour STRESS is the campaign at its most uncomfortable and its most rigorous: how should the review use a 01:20 agreement from somebody whose ability to weigh distant consequences was badly reduced, when holding out *appeared* to cost him 7.2 expected years and actually cost him 6.
- **Days 14–15** — The last reversible moment, the DEGENERACY, and disposition. The final CHOICE — what holds if everybody withdraws — answers "the distance, the illuminance and what an eye resolves at that range", which is the right last sentence for a campaign about the difference between a measurement and an account.

## Opening and closing

Opening: "On a November night in 2019 a stranger watched a robbery from across Ferrier Street. Her account put Elias Ward in prison, and he has served seven years of fourteen on no other evidence… Ward is thirty-four; if the board says no, nobody looks again until 2033." Situation, authority, both sides of the internal argument, and a clock measured in a man's life. Among the three best cards in the set.

Closing: three paragraphs, and the second is the bravest in the catalogue — it names two people the report damaged, one of whom did nothing but run the policy she was given, and it says the unit asked for funding to count the other arrays and was given half of it, "which is enough for the ones where somebody is still inside." The first paragraph is careful to say the court did not find Ward innocent, which almost no fiction about exoneration is willing to do. Keep every word.

## Warm-ups

All seven authored and specific to a review unit working a rebuilt street corner. No findings.

## What to keep

- The corner. Rebuilding Ferrier Street inside a hall, with identification distance painted on the floor, is the best single piece of world design in the repo.
- Every number that demolishes the one before it: 22 → 34 metres, six → 1.54 members, 12.5 lux → no lamp.
- The six-second budget. The plate is unaffordable, and the player finds that out by arithmetic.
- "Her distress establishes nothing about her identification, and the pattern of what she is accurate about establishes quite a lot."
- Nobody in this campaign lied. That is the whole point and it never wavers.
