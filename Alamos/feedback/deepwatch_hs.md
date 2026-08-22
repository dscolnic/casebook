# Deep Watch (AP Physics 2 edition) — play-through review

*Theme `deepwatch_hs` · AP Physics 2, retargeted from naval acoustics · grade 12 · 15 days, 48 stops · reviewed 2026-08-21 by reading `books/deepwatch-hs.yml` in full, working every board, and comparing against the parent `deepwatch`.*

## Verdict

The best of the three same-grade retargets, and the strongest argument in the repo for `RETARGET_PASS.md` as a technique. The submarine is unchanged — same boat, same compartments, same fourteen people, same fifteen casualties — and the course underneath it has been swapped from naval engineering to AP Physics 2. **19 of 19 syllabus equations are computed by a question**, which is a perfect score on the hardest gate here, and the physics is real:

| Day | Board | Physics 2 topic |
| --- | --- | --- |
| 1 | λ = 1500 ÷ 250 = 6.0 m | waves |
| 2 | θc = arcsin(1.00 ÷ 1.33) = 48.8° | total internal reflection |
| 5 | 1025 × 9.81 × 90 = 0.91 MPa | fluid statics |
| 5 | W = PΔV = 1.01 × 10⁶ × 1.6 = 1.6 MJ | work by a fluid |
| 6 | P = I²R = 46² × 0.11 = 233 W | DC circuits |
| 7 | n = PV/RT = 4.3 × 10³ mol | ideal gas |
| 7 | r = mv ÷ qB = 3.4 mm | charged particle in a field |
| 9 | Δf = −0.3 Hz → −3.0 m/s | Doppler |
| 12 | 1/dᵢ = 1/0.42 − 1/8000 | thin lens |
| 12 | 12 dB = 2⁴ = 16× lower | logarithmic scales |
| 13 | E = hc/λ = 1240 ÷ 800 = 1.55 eV vs a 1.9 eV work function | photoelectric effect |
| 14 | N/N₀ = 2^(−14/12.3) = 0.45 | radioactive decay |
| 15 | f_beat = \|150 − 147\| = 3 Hz | beats |

Every one of those reproduces, and the last four are the "modern" half of AP Physics 2 that the junior edition could only retrofit at four concepts — which is exactly the gap this edition was built to close. The photoelectric stop is the model: a lamp is bright and useless because *each arrival carries too little energy to free a charge*, which is a practical fact about a lamp on a submarine and also the whole of the photoelectric threshold.

**Answerable:** 47 of 48. One board grades a different quantity from the one it asks for (DH-01).
**Sense:** The parent's plot survives the retarget intact, which is the surprising part.
**Level:** Right for AP Physics 2 and slightly above it in places.
**Fun:** Inherits the parent's, which is high — a boat where nobody can see out.

## Implemented since this review

- **The day-5 estimate board** (DH-01), same fix as the parent's.
- **The opening card now names Chief Petty Officer Dario Ferro** with the damage control attached (DH-03), and `checkStory` fails a nameless opening from now on.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| DH-01 | CLOSED | Day 5, "What 90 metres puts behind the valve" | **The board asks for a pressure and grades a flow rate.** One estimate block contains: `relationship: Hydrostatic pressure at depth is p = ρgh`; `prompt: The fitting is 90 m deep in seawater of density 1025 kg/m³. Use g = 9.81 m/s²`; `question: Estimate the gauge pressure at the fitting`; and then a tile row that is a **bilge-flooding board** — *8 cm (rise in 1 minute)*, *11 gallons per cm (this bilge)*, *55 gpm (drain pump at this head)*, *31 cm (level at the first reading)* — with `template: {0} × {1} + {2}`, `target: 143`, and **`units: gallons per minute`**. The `solution` then reads "1025 × 9.81 × 90 ≈ 9.05 × 10⁵ Pa = 0.91 MPa". So the player is asked for a pressure, places three tiles, is graded correct on **143 gallons per minute**, and reads a verdict computing 0.91 MPa. Neither of the prompt's own numbers (1025, 9.81) is on any tile. **The same defect is live in the parent `deep-watch`** — this stop was copied across. CLAUDE.md records this exact case as fixed ("Deep Watch's asked about pressure at ninety metres while grading gallons per minute"); it is not. Every gate passes it, because the tiles and the template are internally consistent with each other and the question and relationship are internally consistent with each other. | Replace the tile row with the hydrostatic one and set the target to the pressure. Tiles: *1025 kg/m³ (seawater density)*, *9.81 m/s² (g)*, *90 m (depth)*, plus two decoys from the compartment — *31 cm (bilge level)* and *55 gpm (drain pump)*, which keeps the guide's "they are not all about the same thing" argument intact and makes the decoys the *flooding* numbers rather than the answer. `template: "{0} × {1} × {2}"`, `formula: a*b*c`, `correct: [0,1,2]`, `target: 905000`, `tolerance: 60000`, `units: Pa (about 0.91 MPa)`. Fix both books. **And add the gate**: an estimate whose `units` names a physical quantity absent from its own `question` and `relationship` is this defect, and it is checkable. |
| DH-02 | WORTH | Days 9, 10 and 12 | Three days author 4 stops against the loop's 3. The parent has the same three. | Prefer a move to a delete, as in the parent. |
| DH-03 | WORTH | `opening:` | The card names nobody. The parent's does not either, and the junior edition's names Commander Iris Vance — so the *middle-school* edition satisfies CLAUDE.md's third beat and the two senior ones do not. The card is otherwise excellent ("Surfacing is where every one of these problems stops being fatal. Somebody has to be willing to call it"), and the missing element is the person who has to be willing. | One clause naming whoever can order the boat up, with the job attached — the junior edition already has the sentence. Cross-campaign §8. |
| DH-04 | WORTH | 16 of 48 stops | **The title is the parent's and the question is not.** `derive-edition` carries titles across and `editionParity` deliberately does not compare content, so a retarget can keep a title whose subject has moved. Sixteen stops here differ in question or format from the parent under the same title, and on several the title now describes something the stop no longer does: **"What one fan takes with it"** → *estimate the radius the carbon dioxide ion is bent to* (a mass spectrometer, not a fan); **"Smoke is not only a breathing problem"** → *at what field across the insulation do you isolate the bus*; **"The bearing that does not move"** → *estimate the wavelength of the 250-hertz line*; **"The rise on every bearing"** → *read what you need and report the energy the bank delivers each second*. A title is read on the plan card, on the map and above the question. | Retitle the sixteen after what the question now asks. Most are a phrase away: "What one fan takes with it" → "The radius a heavier ion is bent to". The same finding applies to `the_trial_hs` (14 stops) and `contamcity_hs` (6) — cross-campaign §10. |
| DH-05 | WORTH | 9 passages above grade 12 | `validateContent` notes nine verdicts over the declared grade, the worst at 13.8 ("Nine people and a shut damper"). Advisory, and defensible for AP Physics 2 — but the parent has fewer, so the retarget has made the prose harder as well as the physics. | Cut the long sentences rather than the vocabulary. The nine are pile-ups, not hard words: same failure the opening-card sweep found. |
| DH-06 | TASTE | Format mix | 16 BALLPARK of 48 with only one DERIVE. The parent is a naval-operations game where reading an instrument is the move; an AP Physics 2 edition is a course where deriving is. Ground Truth and Dark Fibre both cover Physics C/2 material at ten and twelve derivations. | Not a defect — `formatMix` passes and every equation is computed. Recording it because if this edition is ever extended, DERIVE is the format its course wants and it has one. |

## What the retarget did well, and worth copying

- **The place did not move and the course did.** Fifteen casualties, same compartments, same fourteen people, and the syllabus underneath is a different subject. That is the whole claim of `RETARGET_PASS.md` and this edition proves it.
- **The modern-physics half is not bolted on.** A radiation source, a photoelectric threshold and a decay half-life are all things a submarine actually carries, so days 13–14 are not a visit to a different game.
- **The `same-grade-retarget:` marker is present** in `themes/deepwatch_hs/theme.js` with the course named on the same line. Keep that convention.

## Opening and closing

Opening: strong, and DH-03 is its one gap.

Closing: three paragraphs, and the second is the best of the three retargets — "Nothing was lost on this patrol that could not be repaired. The whole crew went up the ladder into daylight, which is the only measure of a watch that matters." Identical to the parent's, which is correct: the retarget changed the course, not the fortnight.

## Warm-ups

Present and inherited-in-spirit but authored for this edition. No findings.
