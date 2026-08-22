# Ground Truth — play-through review

*Theme `groundtruth` · AP Physics C: E&M, in derivations (grade 12) · 15 days, 48 stops, 10 DERIVE · reviewed 2026-08-21 by reading the full book (`books/groundtruth.yml`), working every derivation and every board, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The campaign with the best *single result* in the catalogue. Last August a triggered strike killed every circuit board in a trailer two hundred metres away, on earthing signed off that spring, and nobody could say how. Over fifteen days the player derives the answer: for forty metres the signal pair runs beside the down-conductor, near side 1.5 m, far side 3.5 m, so the mutual inductance is (μ₀ℓ/2π)·ln(3.5/1.5) = **6.8 µH**, and at a 30 kA front rising in a microsecond that is dI/dt = 3 × 10¹⁰ A/s and an induced EMF of **200 kilovolts around a loop that touched nothing.** I checked it: 2 × 10⁻⁷ × 40 × ln 2.333 = 6.78 µH, times 3 × 10¹⁰ = 2.03 × 10⁵ V. Exactly right.

That result then does three more things, which is why it is the best one here. It **explains the certificate**: the April earthing document was reissued "with the words *steady-state resistance* on its face", because 25 Ω measured at DC says nothing about a microsecond. It **gets tested rather than believed** — the bench loop in the hall read within nine per cent of the prediction at a shortened front. And it **funds the station**: the review granted a second mast on the strength of one paragraph that could be defended line by line.

The format mix has been transformed. CLAUDE.md records Ground Truth as 51% CHOICE and third-worst in the repo; it now runs **18 distinct formats across 48 stops with CHOICE at 31%**, and the OPERATE tier went 2 → 13. Days 8, 11 and 13 each carry four stops because of it, which is the price and worth paying.

**Answerable:** 48/48.
**Sense:** Excellent. Vero wants shots while there is sky, Brenner wants warning times that match how fast cells cross this flat, and **both get a day where they are right** — days 4 and 12 are explicitly titled that way, which no other campaign does.
**Level:** Right for Physics C E&M and the hardest arithmetic in the set. Gauss's law surfaces, a line integral of E, mutual inductance from a logarithm, an LR transient, instrument bandwidth as an RC circuit.
**Fun:** High. A place that makes lightning on purpose, and a review at the end that gives it a second mast or a padlock.

## The questions, solved

Five boards, all verified: 3,800 × 0.9 = 3,420 V across one stride at a metre from the mast, against 30 × 0.9 = 27 V at forty; 1.2 × 10⁻⁶ ÷ 500 = 2.4 nF over 200 m, or 12 pF a metre; 30,000 × 100 × 10⁻⁶ = 3 C down the channel; (μ₀/2π)·I/r = 2 × 10⁻⁷ × 30,000 ÷ 2 = 3.0 mT at two metres, and at 1,500 T/s a 0.1 m² cabinet loop sees about 150 V; 8.0 × 10⁻⁸ × 1.0 × 10⁷ = 0.8 C.

The step-potential board is the one I would keep above all others: 3,420 V across one stride at a metre and 27 V at forty. Two numbers, three orders of magnitude apart, from the same formula — and it is the number that decides where a person may stand.

Ten derivations, covering the syllabus: a Gaussian pillbox through the cloud base; a line integral of E down a path, with the sign; the field enhancement at 60 m up and 2 cm across; the cloud as a parallel-plate capacitor at 10 km² and 1,200 m; where the ½ in ½CV² comes from; Ampère's law once round the conductor; the loop nobody drew; the same wire twice at nine volts and at a hundred and eighty thousand; the RC circuit that decides what is recordable; and in parallel to charge, in series to fire.

Two CHOICE stops worth naming. **"Two plates, and a factor of two"** — *both plates contribute a field in the same direction between them* — is the single most-missed factor in E&M and it gets its own stop. And **"The rod is not a fixed point"** — *it rises with the current, and so does the rack* — is the reason three instruments that agree can all be wrong together, and it is day 7's TRACE in one sentence.

## Implemented since this review

- **GT-02**, the two duplicated-role introductions.
- **GT-05** `dayNoun`.
- **And the rule half of its ten derivations now renders at all** — the importer validated `askRule: true` four ways and never emitted it, so all 34 of Ground Truth's rule questions were inert in the shipped game. Fixed in `import-book.mjs` and gated by `engine/dev/deriveRules.mjs`.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| GT-01 | WORTH | `askRule: true`, all ten DERIVE stops | **Six of thirty-five derivation steps offer only one distinct rule** — 17%, between Dark Fibre's 4% and Slack Water's 31%, and much better than Overwind's 44%. But the cause is the same vocabulary problem: **`rearrangement` appears 73 times of roughly 155 candidate rules**, and on two of the six failing steps it is also the *wrong* name — "Integrate from empty to the final charge" is tagged `rearrangement`, and integration is not rearrangement. The good rules here are the good ones anywhere: `Gauss's law`, `line integral of E`, `symmetry argument`, `superposition`, `boundary condition`, `separation of variables`. | Retire `rearrangement` as a rule and re-tag those steps with what the step actually licenses — `separation of variables` for the integration step, `boundary condition` for the limits, `symmetry argument` for the ones that pick a surface. Then drop the rule question on the two or three steps that are genuinely arithmetic. Same fix as OW-01 and SW-05; see cross-campaign §7. |
| GT-02 | WORTH | Two scenes | A person's role is stated twice in one clause: *"Instrumentation specialist Sam Abioye, the instrumentation technician, has the outstation trench route on the wall"* and *"Earthing engineer Ana Sifuentes, the earthing engineer"*. Both read as an editing artefact, and the second is worse because the two halves are identical. `introRule` accepts either form and cannot see the duplication — the job *is* attached, twice. | Drop the leading title in both: "Sam Abioye, the instrumentation technician, has the outstation trench route on the wall." I swept all nineteen books I have read so far and these are the only two occurrences, so this is a two-line fix rather than a class. |
| GT-03 | WORTH | `engine/dev/concept-debt.json`, 8 rows | All eight are bottom-of-graph E&M foundations that no card claims: parallel plates before dielectrics, Gauss's law before the sheet field, capacitance as a ratio before the plate formula, Kirchhoff before the RC and LR transients, self-inductance before inductive volts, Faraday before mutual inductance. This is a Physics C course leaning on a first course, which CLAUDE.md says is legitimate — but Ground Truth is a *senior* campaign, so declaring them as `takesAsRead` is available and would clear all eight. | Eight `takesAsRead:` declarations, each printed to the player as an `assumes` line. That is the honest form: this course does assume a student has met Kirchhoff and Gauss, and saying so on the card is better than the debt file saying it in a place nobody reads. Check each against the importer's rule that the declared concept must be one the stop's own claim is built out of — all eight look like they qualify. |
| GT-04 | WORTH | Days 8, 11 and 13 | Three days author 4 stops against the loop's 3 — the price of the diversity pass, and every extra stop is one of the good ones (the charge HOLD, the down-conductor PROBE, the discriminating-check VALUE, the storm SPOT, the microsecond ALLOCATE, the strike-or-instrument BELT). | Prefer a move to a delete. Day 6 carries three and would host the charge HOLD; day 14 would host the microsecond ALLOCATE, since that day is already "the last thing that can be changed". Two moves clears two of the three. |
| GT-05 | WORTH | `themes/groundtruth/theme.js` | No `dayNoun`. The clock is "three weeks are left, and the review at the end gives this place a second mast or a padlock" — and the plan card prints "Day N". Cross-campaign §4. | Count down to the review. |
| GT-06 | TASTE | ~26 stops (52 collapsed paragraphs) | Repeated format boilerplate in `background`. All 48 stops carry both a `guide` and an authored `background`, which is the right shape — but 52 paragraphs are the same essay repeated, and Ground Truth's stop-specific backgrounds are strong enough to deserve the room. | Keep each essay on first use per format. Cross-campaign §2. |

## Day-by-day notes (short)

- **Day 1** — What the flat is for. A TRIGGER on the first morning — write the rule before the cell arrives — is the right opening for a station whose whole business is committing in advance. The 25 Ω CHOICE (*how the grid opposes a **steady** current in the soil*) plants day 9's whole finding on day 1, in the word "steady".
- **Days 2–3** — The layer overhead, and volts are a path. Gaussian pillbox, the factor of two, and the step-potential board.
- **Day 4** — Why the tall thing is struck. Field enhancement at 60 m and 2 cm, and *"the afternoon Vero is right about"* — every stage met with its required lead time intact.
- **Days 5–6** — The cloud as a capacitor, and where the half comes from. The ½CV² derivation is the right way to teach that factor, and the ATTEST on charge that is still there is a genuine safety fact rather than a paperwork exercise.
- **Day 7** — Three instruments that agree. TRACE plus DEGENERACY plus the rod-is-not-a-fixed-point CHOICE. Best-constructed day here.
- **Days 8–9** — What thirty kiloamps does at two metres, and nothing was connected to anything. **The campaign.** Ampère's law, then the loop nobody drew, then the DIAGNOSIS whose key is *flux through the trench loop drove the pair*.
- **Days 10–12** — Nine volts and a hundred and eighty thousand (the same wire, twice — best title in the campaign), where the current goes, and predict-then-measure. *"The afternoon Brenner is right about"* — the lead time, which the second cell used up faster than projected — is the counterweight to day 4 and the reason neither man is a foil.
- **Days 13–15** — What the mill cannot see, the last thing that can be changed, and what the season can say. The final CHOICE on what is still open (*whether the predicted bonding-lead voltage appears during a stroke*) is the correct last sentence: the campaign's headline number is still computed rather than measured, and it says so.

## Opening and closing

Opening: "Station 12 makes lightning on purpose… Last August a triggered strike killed every circuit board in a trailer two hundred metres away, on earthing signed off that spring, and nobody can say how… Three weeks are left, and the review at the end gives this place a second mast or a padlock." All four beats, a mystery, and a binary consequence.

Closing: three paragraphs. The first is the best single paragraph in the catalogue — it names the mechanism, the arithmetic ("computed from a length and a logarithm"), the test that validated it to nine per cent, the certificate reissued with three words on its face, and a lead time changed from thirty minutes to twenty-two because that is how fast cells actually cross this flat. The second's cost includes "an afternoon in week five when the crew came in late and Brenner was right in a way nobody wanted to be right." The third is addressed to the player. Keep every word.

## Warm-ups

All seven authored and specific to a salt flat with a 60 m mast. No findings.

## What to keep

- 6.8 µH from a length and a logarithm, and 200 kV around a loop that touched nothing.
- "Steady-state resistance", added to a certificate that had been true and useless.
- 3,420 V across one stride at a metre; 27 V at forty.
- Day 4 and day 12: the afternoon Vero is right about, and the afternoon Brenner is right about.
- The last open question being the campaign's own headline number.
