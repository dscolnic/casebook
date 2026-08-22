# The Contaminated City (AP Chemistry edition) — play-through review

*Theme `contamcity_hs` · AP Chemistry, the aqueous half, retargeted from first-year analytical chemistry · grade 12 · 15 days, 48 stops · reviewed 2026-08-21 by reading `books/contamcity-hs.yml` in full, working every board, and comparing against the parent `contamcity`.*

## Verdict

A complete and correct AP Chemistry aqueous course, delivered inside a river-city emergency. **17 of 17 syllabus equations are computed**, and the fourteen estimate boards cover the syllabus without a gap:

| Board | Chemistry |
| --- | --- |
| V = nRT/P = 2.0 × 10⁴ × 8.31 × 300 ÷ 1.0 × 10⁵ = 499 m³ | ideal gas |
| 500 ÷ 50 = 10 mol A, 640 ÷ 80 = 8 mol B → 5 mol | limiting reactant, with a 2:1 ratio |
| ΔG = −180 − 291 × (−0.40) = −63.6 kJ/mol | free energy, at a real water temperature |
| 0.86 ÷ 172 = 0.0050 mol; ÷ 0.250 L = 0.020 M | molarity from a mass |
| 2.4 × 10⁻⁵ ÷ 0.020 = 1.2 × 10⁻³ M | common-ion effect from Ksp |
| 2.5 × 100.0 ÷ 10.0 = 25 mg/L | undoing a dilution |
| 4.5 × 10⁻⁵ × 172 = 7.7 mg/L ≈ 7.7 ppm | molarity to ppm |
| pH = −log₁₀(4.0 × 10⁻⁴) = 3.40 | pH |
| Q = 8.0 × 10⁻⁴ × 1.2 × 10⁻² = 9.6 × 10⁻⁶ against Ksp 2.4 × 10⁻⁵ | Q versus K |
| Ka = (7.9 × 10⁻⁴)² ÷ 0.050 = 1.25 × 10⁻⁵, pKa 4.90 | weak-acid equilibrium |
| q = mcΔT = 2,000 × 4.2 × 5 = 42 MJ | calorimetry |
| E°cell = 0.40 − (−0.44) = +0.84 V | electrochemistry |
| 2.0 ÷ (7,900 × 4.0) = 6.3 × 10⁻⁵ m/yr = 0.063 mm/yr | corrosion rate |
| Q = 40 × 21,600 = 864,000 C; n = ÷ (2 × 96,485) = 4.48 mol | Faraday's law |

All fourteen reproduce, and three are the ones AP students most often get wrong: the limiting reactant needs the stoichiometric ratio rather than the smaller number, the common-ion calculation is a Ksp rearrangement rather than a solubility, and the Faraday calculation divides by the electron count.

Its best editorial decision is the one it inherits: **the compound is identified by two methods rather than one**, and the closing card says the package held because of it. That is the difference between a chemistry course and a chemistry job, and it is the campaign's spine in both editions.

**Answerable:** 48/48.
**Sense:** The parent's plot survives, and the retarget's additions (Q versus K, the cell potential, the corrosion rate) all attach to things already in the fiction.
**Level:** Right for AP Chemistry's aqueous half.
**Fun:** Inherits the parent's, which is solid rather than high — see CH-04.

## Implemented since this review

- **CH-03**, the numeral damage (eleven occurrences, five of them *"1 dilution"*).
- **CH-02**, the opening card now names Adaeze Okonjo.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| CH-01 | WORTH | 6 of 47 shared stops | **The title is the parent's and the question is not.** The clearest is **"How many moles of acid are present?"** → *estimate the pH of the intake water*: the title asks for an amount and the question asks for a logarithm of a concentration, which is the inverse operation and the exact confusion the topic generates. Also **"Find the anode and cathode"** → *estimate the standard cell potential of the pair* (related but not the same question), **"Interpret the shift"** → *estimate the reaction quotient*, **"Resolve the ambiguous peak"** → *estimate the molarity of the made-up solution*, **"Map concentration with limited samples"** → *estimate the concentration in parts per million*, **"Use the common-ion effect to clear the limit"** → *estimate the metal concentration left*. Fewer than the other two retargets (14 and 16), which suggests this edition was retitled partway. | Finish it. "How many moles of acid are present?" → "What the pH meter is actually reporting". Cross-campaign §10. |
| CH-02 | WORTH | `opening:` | The card names nobody — only the player's own title, "the city's Chief Scientific Officer". The parent's is the same. Both editions are otherwise good openings, and the parent's argument (identify it twice, or move fast) is between two people who are not on the card. | One clause. Cross-campaign §8. |
| CH-03 | CLOSED | Numeral damage, 11 occurrences | Eleven in this book, and one word is hit five times: **"1 dilution"** where "one dilution" belongs. In a chemistry course a serial dilution is a numbered thing, so "1 dilution" reads as the first dilution rather than as a single one, and the sentences invert. Also "1 sitting", "1 ratio", "1 reactivity", "1 metals". The parent has twelve of the same class. | Editorial pass, this book and the parent together. The five "1 dilution" cases first, because they change meaning rather than just reading badly. Cross-campaign §1. |
| CH-04 | WORTH | 0 of 48 scenes name a person | **The parent scores 0 of 48 and this edition scores 2 of 48.** Across all 42 campaigns the median is about 70% and the best is Yellow Bay at 45 of 45. Both ContamCity editions name somebody in **every** day stake — 15 of 15 — so the cast exists and is introduced, and then every question is asked by nobody, in an institution rather than a room. This is the same finding as Project Y's PY-01 and it is the largest single quality gap in the four docx-origin campaigns. | Put the day's named person into the day's three stops. It is roughly 48 sentences per edition and it is the highest-value editorial work available on either. |
| CH-05 | WORTH | Days 1, 6 and 10 | Three days author 4 stops against the loop's 3, matching the parent. | Prefer a move to a delete. |
| CH-06 | TASTE | 14 takesAsRead declarations | Senior campaign, so declarations are legitimate, and 14 is in line with other AP editions. Worth checking each still matches its stop's claim after the retarget — a declaration written against the parent's claim is a stale exemption if the stop's question moved, and six stops' questions did move (CH-01). | Cross-check the six retitled stops' `takesAsRead` against their new claims. The importer refuses a declaration the stop's claim is not built out of, so if they were re-imported clean they are probably fine — but the refusal cannot see a declaration that is merely *irrelevant* now. |

## What the retarget did well

- **Two methods, not one.** Inherited, and still the best thing about either edition.
- **Every number is a real chemical quantity.** Ksp 2.4 × 10⁻⁵, Ka 1.25 × 10⁻⁵, E° values that are the actual couple potentials, 96,485 C/mol.
- **The corrosion-rate board** turns a mass-loss measurement into a depth per year, which is the one calculation in this course that a working chemist does most often and no textbook covers.

## Opening and closing

Opening: names the situation, the authority and the clock in reserves measured in days. CH-02 is its gap.

Closing: three paragraphs, all inherited from the parent and all good. The last is addressed to the player and ends "A city is drinking its own water again. You are the reason it can."

## Warm-ups

Authored for this edition. No findings.
