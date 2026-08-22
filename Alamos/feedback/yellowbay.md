# Yellow Bay — play-through review

*Theme `yellowbay` · AP Chemistry, the structure half — atomic structure, periodicity, bonding, intermolecular forces (grade 12) · 15 days, 45 stops · reviewed 2026-08-21 by reading the full book (`books/yellowbay.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The most technically accurate campaign in the catalogue, and the only one I checked where **every number is a real number**. Al Kα at 1486.6 eV and the silicon 2p binding energy at 99.2 eV, giving a photoelectron at 1387.4 eV. A KrF stepper at 248 nm, which is why the bay is lit amber. Silicon at 5 × 10²² atoms per cubic centimetre. Si–H at 318 kJ/mol against H–H at 436, so cracking silane costs 400 kJ per mole. A mean free path of 5.1 cm at 0.133 Pa. Silicon nitride at 60.1% silicon by mass. I checked all ten estimate boards against first principles and every one reproduces, in the right units, with the physical constants a real spectroscopist would use.

That precision is not decoration — it is what makes the campaign's structure work. The subject is a fab with a 40% scrap rate and **two independent faults that everyone is trying to explain with one**: Ferreira says the incoming silicon is not what its certificate claims, Ostrowski says the material is fine and a recipe has drifted, and *both are right about different things*. The substrate is the wrong type and the furnace controller is also wrong. The closing card's best line is the reason there was a lot to run at all: "you would not let one explanation stand for two faults."

The day-6 TRACE is the finest instrument stop in the repo. Four substrate measurements agree closely; four of them were computed against one reference wafer, so their agreement is a property of the arithmetic. The one that disagrees is a hot-probe reading, which responds to the *sign* of the carriers rather than to how many there are — and that is the measurement that finds an n-type wafer in a p-type lot. The certificate has no field for type, because for thirty years the supplier shipped one type and nobody wrote a field for a thing that never varied. Every clause of that is true of real fabs, and it is also a complete lesson in what a specification is.

**Answerable:** 45/45.
**Sense:** Excellent, and the two-fault structure is the best-plotted in the set.
**Level:** Right for AP Chemistry's structure half, and it uses real instrument numbers rather than round ones — which is *easier* for the student, not harder, because the arithmetic is a subtraction rather than a lookup.
**Fun:** High. A gowned fab with a customer that is 60% of revenue and one proving batch is a good clock, and the glass crossing over the subfab is a genuinely distinctive place.

## The questions, solved

All ten estimate boards verified from first principles:

| Stop | Arithmetic | Check |
| --- | --- | --- |
| What is actually in a lot | 125 ÷ 28.1 = 4.45 mol Si | ✓ |
| Why the bay is lit amber | (6.63 × 10⁻³⁴ × 3.00 × 10⁸) ÷ 2.48 × 10⁻⁷ = 8.02 × 10⁻¹⁹ J | ✓ 248 nm is KrF |
| How tightly the nucleus holds on | 14 ÷ 0.0121 = 1,157 relative units | ✓ Z/r² |
| The charge that is left over | 15 − 10 = 5 proton charges | ✓ Z_eff for phosphorus |
| How much is still in there | (0.133 × 0.060) ÷ (8.31 × 900) = 1.07 × 10⁻⁶ mol | ✓ PV = nRT in Pa, m³, K |
| The photon in, the electron out | 1486.6 − 99.2 = 1387.4 eV | ✓ real Al Kα, real Si 2p |
| How far a molecule travels | kT ÷ (√2 π d² P) = 0.051 m | ✓ to two figures at 0.133 Pa |
| Five in a billion, counted | (5 ÷ 10⁹) × 5.0 × 10²² = 2.5 × 10¹⁴ cm⁻³ | ✓ real Si density |
| What breaking the precursor costs | (318 × 4) − (436 × 2) = 400 kJ/mol | ✓ SiH₄ → Si + 2H₂ |
| The formula the recipe claims | (28.1 × 3) ÷ 140.3 × 100 = 60.1% | ✓ Si₃N₄ |

The day-11 DIAGNOSIS is the second-best stop here: one spectrum, two findings — an oxide on top *and* carbon beneath it — which is the two-fault thesis arriving as a single measurement. And the day-14 DIAGNOSIS ("the copper was nearly pure and deformed under the pad") is a lovely inversion, because purity is normally the thing you want.

## Implemented since this review

- `dayNoun`. Yellow Bay had no other findings.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

No FIX-level defects. **Yellow Bay carries no rows in `curriculum-debt.json`, `concept-debt.json`, `equation-debt.json`, `format-debt.json` or `daycalls-debt.json` — the only campaign of the fifteen reviewed so far with a completely clean slate**, and I could not find anything by hand that the gates had missed.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| YB-01 | WORTH | Authored `background`, 39 of 45 stops | Only six stops carry authored background prose. Every stop still gets a Background door — the engine composes it from the syllabus equations, glossary, `assumes` and `takeaway` — so nothing is missing that a player needs, and the six that *are* authored are correctly targeted at the hardest stops (the TRACE, the polarity CHOICE, the melting-point SEQUENCE). But the campaign has less depth behind the door than any other here, and this is the one book where more of it would be read: the day-4 "two gases, one mass" stop (N₂ and CO both at 28) and the day-7 chemical-shift stop ("the same element, four electronvolts over") are each one paragraph away from being memorable, and the paragraph is not there. | Add background to the eight or ten stops where the *mechanism* is the interesting part rather than the arithmetic. Do not add it to the other twenty-nine — the near-absence of boilerplate is why this book reads faster than every other, and `readbook` found **zero** repeated paragraphs to collapse here against Red Sand's 118. Yellow Bay is the model for what the card sweep was trying to achieve and it should not lose that. |
| YB-02 | WORTH | The carbon layer | The closing card lists "the carbon layer under the nitride has a source nobody has found" as unfinished, and it is the right kind of loose end. But it is found on day 11 and never referred to again across days 12–15, so a player reads about it in the ending as though it were a thread rather than a single stop's finding. | One sentence in a day-13 or day-14 stake — somebody has looked and not found it — makes the unfinished item land as unfinished business rather than as a fact the ending introduces. |
| YB-03 | TASTE | Day 13 SCIENCETANK, "Two more pieces of work" | Not a defect — this is the **best-authored tank stop in the repo** and I want it recorded as the reference. It carries `rules` (a hundred points, spread as you choose, judged on where the weight sits) *and* `evidence` (a fact about each proposal, including the two already partly answered), which is exactly the shape CLAUDE.md prescribes and which fourteen of the thirty-one tank stops elsewhere lack entirely. | Nothing. Use it as the template when fixing the others — Red Sand's two carry neither field. |
| YB-04 | TASTE | The two-wing world | `themes/yellowbay/world.js` calls the engine's `buildInterior` once per wing and slides one sideways, which is the documented cheap way to bring your own world. It works and the glass crossing over the subfab is the most distinctive interior shot in the set. Worth a screenshot pass before shipping any change to it, per the standing rule — nothing here is a finding, but this is the world with the most ways to be silently wrong. | None. Note for whoever touches it next. |

Notable for its absence: **numeral damage.** Four occurrences in the whole book, none load-bearing. Along with Sightline, this is the evidence that a house style of spelling numbers out immunises a book against the normalisation pass.

## Day-by-day notes (short)

- **Day 1** — What the wafer is, before anybody argues about it. Moles in a lot, the atomic number as the thing that names an element, and what five parts in a billion is a claim about. Exactly the right first morning: define the object before anybody disputes it.
- **Day 2** — Light with a threshold, and gas that never stops moving. The amber lighting is explained by the photon energy at 248 nm, which means the *room the player is standing in* is the answer to a question. Best use of place-as-content in the campaign.
- **Days 3–5** — Shielding, effective nuclear charge, what a peak at mass 28 could be (N₂ or CO — the ambiguity that matters), the photoelectron energy, and the mean free path. Five days that build an instrument from the periodic table up.
- **Day 6** — The TRACE. Best day, and the campaign's hinge.
- **Days 7–9** — Shapes, shifts and a sea of electrons; two drawings of one molecule; the ledger of breaking and making. The bond-enthalpy ledger and the mass-percent formula check land back to back, which is the right pairing.
- **Day 10** — What each material is held together by, and a PROBE down six hundred metres of line for one reading. The PROBE is well chosen: a fab's utilities *are* a physical chain, and naming where the pattern breaks is what a facilities engineer does.
- **Days 11–12** — A clean surface is an event, not a state. The CONTROL on what is regrowing on the wafer, the two-findings DIAGNOSIS, and a CLOUD that separates aiming from knowing.
- **Days 13–15** — Which step decides whether the film grows, predict-change-measure, and the lot. The day-15 TRIAGE and the closing PROTOCOL on what the light can be trusted to do are the right last questions.

## Opening and closing

Opening: "Ardley Fab 7 prints silicon chips, layer by layer, on wafers the size of a dinner plate. Since March four wafers in ten have come out unsellable… One customer is large enough to close the plant." Situation, scale, authority, both sides of the argument, and a consequence in jobs. Meets all four beats and does not waste a clause.

Closing: three paragraphs. The second is the model this document keeps citing — eleven weeks of wafers written off before anybody measured the right thing, a supplier relationship cooler for a year, and four days of spectrometer time spent on wafers already scrapped. The unfinished list is specific and each item is a real engineering debt: a queue-time rule that is a piece of paper rather than an interlock, and copper bought against a specification that has been met at a tenth of its stated value twice. Third paragraph is addressed to the player and ends "Nine hundred people came back on the Monday." Keep all of it.

## Warm-ups

All seven authored, all specific to a gowned fab. No findings.

## What to keep

- Every real number. 1486.6, 99.2, 248, 318, 436, 5 × 10²², 140.3. This is the argument for looking numbers up rather than inventing round ones.
- Two faults, one explanation, and the campaign's refusal to let the second hide behind the first.
- The day-6 TRACE, and a certificate with no field for the thing that turned out to matter.
- The amber bay. The room is lit that way *because* of the answer to a day-2 question.
- Zero collapsed boilerplate paragraphs. Yellow Bay reads faster than anything else here and that is a design achievement, not an omission.
