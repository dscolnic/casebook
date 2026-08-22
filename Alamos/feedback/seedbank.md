# Wellmere — play-through review

*Theme `seedbank` · AP Biology, the heredity half (grade 12) · 15 days, ~46 stops · reviewed 2026-08-21 by reading the full book (`books/seedbank.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The campaign with the best-chosen *place* in the catalogue. A breeding station laid out in concentric rings spaced by pollen travel distance means the geography **is** the genetics: every decision about ground is a decision about isolation, and the closing card's last unfinished item — "the isolation rings are spaced on a pollen distance measured before the causeway hedge came out" — is a piece of world-building that is also a scientific finding.

Its subject is competition for a resource that cannot be expanded: three weeks of sowing, one field, and three people who each need it. Volpe wants a release, Qureshi wants the oldest accessions grown out "while enough of them will still come up", and the rust is 200 km east with one gene against it. Nobody is wrong, and the campaign never resolves that by making one of them foolish.

The genetics teaching is the most complete in the set. A 3:1 ratio is made into evidence by naming the rival model it beats (15:1 predicts 375 of 400, the count says 306, so a single tray separates them). Allele frequency is computed from copies rather than plants. Nₑ = 4N_mN_f/(N_m+N_f) is computed rather than quoted. The breeder's equation is applied and then immediately qualified. A HOLDOUT stop makes a marker prove itself on a population it was not fitted in.

**Answerable:** 45/46 clean. One DEGENERACY panel's numbers do not reproduce the disagreement it is about (WM-01).
**Sense:** Excellent. The drift thread — small grow-outs, a negative screen that no longer proves absence, and a farmer's field holding what the vault lost — is the best-built argument here after Blackout's sensor.
**Level:** Right for AP Biology and generous with it. Nothing is hand-waved.
**Fun:** High. The three-way argument over ground gives every day a real stake.

## Fixed earlier in this review

The marker-assisted-selection stop ("DNA present, resistance working?") was keyed to *"Challenge plants in every generation; use the DNA marker only after the final backcross"* while its own `answerText` said to use the marker early and test the final line — and its second rebuttal refuted the keyed option by name. The junior edition carried the same mis-key. Both fixed, re-imported, green. Details in the cross-campaign document.

## The questions, solved

Verified: 16 × 4 = 64× storage life (and the panel's whole point is that adding them gives 20, which is the mistake); 400 × 3 ÷ 4 = 300 against 306 observed; allele frequency 0.6; 6 ÷ 200 × 100 = 3 cM; 4 × 18 × 102 ÷ 120 = 61.2 effective plants; 7.4 + 0.3 × (9.1 − 7.4) = 7.91 t/ha.

The day-2 BALANCE is the best in the repo: 19.6 fixed − 6.1 respired + 0.3 minerals − 2.4 root and stubble = 11.4 t over the weighbridge, with 4,000 tonnes of transpired water on the board as a row that **cannot be counted** because it is not dry mass. A student who adds it is wrong by two orders of magnitude with no unit to warn them, and the stop says so.

## Implemented since this review

- **WM-01, the DEGENERACY.** The observation is 16 of 400, not 11 — which is what a 4 cM marker predicts and what the stop's own background says ("about four plants per hundred"). Fixed in the stake, the scene, the observable and the second panel's label, and in the junior edition.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| WM-01 | CLOSED | Day 2 "One disagreement, two possible causes" (DEGENERACY) | The panel's numbers do not reproduce the observation it is built on. The scene and observable state **11 disagreements in 400 plants** = 2.75%. The locus is five pairs each summing to **0.04** (4%), and the authored truth is (recombination 0.04, marker error 0). But 4% of 400 is **16** disagreements, not 11 — and the background says so explicitly: "a marker four centimorgans from the gene is expected to be separated from it in about four plants per hundred." So the family of combinations the player explores predicts 16 while the card reports 11, and the "truth" the panel commits to is the one that fits neither. | Make the two agree. Either set the observation to **16 of 400** (keeps the 4 cM marker distance, which day 5's map-distance stop also uses) or move the locus to pairs summing to 0.0275 and describe the marker as "about three centimorgans". The first is cleaner because 4 cM is stated in three other places. |
| WM-02 | WORTH | Day 5 "What came with the gene" vs day 2 | Day 5 computes the resistance-to-height distance as **3 cM** from 6 recombinants in 200 backcross plants. Day 2 describes the resistance marker as "about four centimorgans from the gene". Those are two different loci (a marker near the gene, and a height locus linked to it) so there is no strict contradiction — but a player meeting 4 cM on day 2 and 3 cM on day 5 has no way to tell they are different measurements. | One clause in the day-5 scene naming the height locus as a *different* linkage than the day-2 marker. The stop is good and only needs disambiguating. |
| WM-03 | WORTH | `themes/seedbank/theme.js` | No `dayNoun`, so the plan card prints "Day N", while stakes open "Monday in the first week of March", "Tuesday", then drift to un-dated openings. The campaign's real clock is the three-week sowing window, and it never appears on the plan card. | Either count down the sowing window in the stakes ("Twelve days of the sowing window left") or set a `dayNoun` that cannot collide. The three-week deadline is this campaign's best pressure — Blackout's corridor, Ice Core's aircraft — and it is currently invisible where the player plans the day. |
| WM-04 | WORTH | Missions 11 and 13 | Both author 4 stops against the loop's 3 (the importer warns). The extra stops are good ones — a HOLD on drying-room moisture and a SPOT on the rogueing instruction. | Prefer a move to a delete: day 1 is light on the vault side and would host the drying HOLD; the rogueing SPOT belongs with day 12's rust arrival. |
| WM-05 | WORTH | ~10 stakes and scenes | Numeral normalisation: "Toft has 11 tonnes from **1** field", "40 accessions, **1** field, and a number nobody wants to hear", "The screen has **1** clean source of a second resistance gene", "How can **1** DNA substitution change…". The counts (400 plants, 41,000 accessions, 6 recombinants) are all fine; the damaged ones are where *one* was a pronoun or an article. | Editorial pass. Cross-campaign §1. |
| WM-06 | TASTE | Day 3 "Six per cent, while the lorries arrive" (HOLD) | The eighth HOLD in the catalogue, and they share a template closely: `band: 0.4`, `narrowTo: 0.2`, `duration: 45`, `authority: 0.1`, `pass: 0.8`, and three disturbances at 4, 20 and 38 with amounts −0.03, +0.05, −0.045. Every campaign's HOLD uses those exact numbers. The *fiction* differs and is well chosen each time (a drying room, a borehole, a mixing chamber, an isolation ward), but the panel plays identically. | Vary at least the disturbance profile per campaign — the drying room's intake arrives in lorry-loads, which is a different shape from a katabatic gust. The format's own subject is "a step in the rate", and three identical steps in every game is a missed chance to show different rate shapes. |
| WM-07 | TASTE | ~26 stops | Repeated format boilerplate in `background`. Wellmere's stop-specific paragraphs are strong — "why they multiply", "why the clean controls are not an answer", "what dry matter is" — and sit behind it. | Keep each essay on first use per format. Cross-campaign §2. |

## Day-by-day notes (short)

- **Day 1** — Why the vault is cold (a rate, not a switch), what a cross asks for, why a line is sown four times. The 64× stop's insistence that the factors multiply rather than add is the right first lesson for a storage facility.
- **Day 2** — The 3:1 count made into evidence, the DEGENERACY (WM-01), and the dry-matter BALANCE. Best day in the campaign apart from its one broken panel.
- **Days 3–4** — Frequencies not plants, what 30 plants costs against 200, a CONTROL that moves yield and puts it back, and the deferral CHOICE ("every line behind it in the pipeline waits too").
- **Day 5** — Linkage drag. The HOLDOUT — fit a marker threshold where it was mapped, freeze it, score it somewhere new — is the second-best HOLDOUT in the repo after Quantum's.
- **Day 6** — Nₑ from unequal parent numbers, then a TRIGGER writing the viability rule before germination falls. Correctly ordered: the rule before the number.
- **Days 7–9** — One base and a broken lock, where an unused allele lives, and a BALANCE finding the resistant line's hidden 2%. The "landraces from districts where the rust is endemic" answer is the campaign's thesis about why collections exist.
- **Days 10–11** — The drift thread. The TRACE sorting which results inherit the repeated small grow-outs, and the ATTEST on what the store can and cannot claim.
- **Days 12–15** — The rust arrives, the farmer's field turns out to hold what the vault lost ("rust has selected it every year the vault was standing still" — the best single line here), and the close commits eight crosses to 2033.

## Opening and closing

Opening: "Two hundred kilometres east there is a wheat disease the breeding programme has exactly one gene against. The wind that would carry it here comes in over the causeway." Threat, distance, mechanism, and the geography that makes it a threat — in two sentences. One of the three best openings in the set.

Closing: three paragraphs. The middle one is exemplary: ground three people wanted and one got, accessions regrown "at the rate the glasshouses allow rather than the rate they are dying at", and one resistance gene still carrying the whole programme. Keep.

## Warm-ups

Present and specific — this is the two-tier site whose far ground is the outer isolation rings, and `trial-far` earns it. No findings.

## What to keep

- The rings. A layout spaced by pollen distance, with the hedge that changed it named as unfinished business in the closing card.
- Every ratio that names the model it beats.
- The transpired-water row on the BALANCE board: a number that must not be counted, with a unit note saying why.
- "Rust has selected it every year the vault was standing still."
