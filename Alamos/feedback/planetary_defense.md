# Planetary Defense — play-through review

*Theme `planetary_defense` · college astronomy / physics (grade 12 manifest) · 15 phases, 48 stops · reviewed 2026-08-21 by reading the full book (`books/planetary-defense.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The most ambitious *shape* in the catalogue: the campaign runs from eleven days before a close pass to eight years after it, and the object it is about changes character three times — a moving dot, then a size argument, then a deflection experiment. Phase 10 ("What have we failed to see?") is the single best-conceived mission I have read in five campaigns: the campaign audits itself, finds that the object was bright enough to detect for weeks and geometrically invisible the whole time, and the INJECT panel then makes completeness *measurable* rather than rhetorical. The through-line — "the single line through the middle is the most dangerous object in this campaign, because it looks like knowledge" — is stated on phase 3 and paid off on phases 4, 8, 9 and 15.

What needs fixing is arithmetic housekeeping, and one piece of it is serious: the campaign quotes three different impact energies for the same object across two adjacent phases, and the radar sizing stop grades a diameter its own verdict contradicts.

**Answerable:** 44/48 clean. PD-01 (radar diameter: board vs verdict disagree), PD-02 (a second question grafted on), PD-03/04 (energy figures inconsistent, albedo physically implausible).
**Sense:** Excellent across phases; the defects are all inside individual cards.
**Level:** Right, and the arithmetic ladder is well built — angular rate, then angle×distance, then volume, then energy, then momentum.
**Fun:** High. The night-time world suits it, and the "you are auditing your own campaign" phases (10 and 15) are a structure nothing else here has.

## Opening blurb

> "A survey telescope flagged a faint moving point near the ecliptic four hours ago… a deflection mission that would have to launch years before anyone could be certain it is needed."

The last clause is the whole campaign in fourteen words. Keep. `dayNoun: 'Phase'` against stakes counting real time ("Nine days to the pass" → "Eight years after the discovery") — no collision, and the widening interval does real narrative work.

## The questions, solved

Verified: 12 arcsec ÷ 20 min × 60 = 36 arcsec/h; 37/100,000 = 0.037%; √(1/4) = 0.5× diameter; 3.5 h × 2 maxima = 7 h; 2³ = 8× search volume; 3.1e17 ÷ 4.184e15 = 74 Mt; 10⁴ kg × 1.2e4 m/s ÷ 7.9e9 kg = 0.0152 m/s; 9e6 × 0.005 = 45,000; Kepler 1.6^1.5 ≈ 2.0 y, 2.5^1.5 ≈ 4.0 y, 4^1.5 = 8.0 y; ½(4π/3)(90)³(2600)(20000)² = 1.59e18 J. The DEGENERACY solves as designed (the reflected-light locus is a family; the thermal locus crosses it once). The TRACE (1.4 μm dip: standard star shows it, it deepens with airmass, the space spectrum lacks it) is the cleanest TRACE in the repo. The INJECT is genuinely instructive — the strategy with the *fewest* total detections is the right answer, and the panel makes you see why.

## Implemented since this review

- **The opening card** now names Dr. Anna Fischer and the radar window she has to spend.
- Numeral damage.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| PD-01 | CLOSED | Phase 7 "Diameter from angular width" (BALLPARK) | The scene and the `why` state 0.09 arcsec at 4.0×10⁸ m and conclude "about 1.7×10² m, or roughly 170 m across". The estimate board states 0.10 arcsec at 6.0×10⁸ m and grades **291 m**. So the panel marks 291 correct and the verdict then tells the player the answer is 170 — and 291 m also contradicts the ~180 m the DEGENERACY (phase 5), the radar answer text and two stakes all commit to. | Make the board match the scene and the campaign: labels `0.09 arcsec`, `206,265`, `4.0e8 m`, target `175`, tolerance ~25. Keep the two decoys (1 AU, the seeing) — they work. Then re-read the `solution` line, which currently states the 0.10/6.0e8 arithmetic. |
| PD-02 | CLOSED | Phase 8 "The speed it actually arrives at" (BALLPARK) | The stop carries a full second question grafted on: four `choices`, an `answer` ("Earth's gravity accelerates it, so entry is nearer 16 km/s…") and three rebuttals, alongside the estimate block that computes the same thing numerically. One card, two questions, one of which gives away the other's answer — the CHOICE's key states the conclusion the estimate exists to produce. | Keep the estimate; move the four options' content into `background` as one paragraph on why the atmosphere cannot lower entry speed. (Same defect family as Outbreak's acid-base stop and Deep Watch's sonar-budget stop — worth one sweep for `choices:` co-occurring with `estimate:` across all books.) |
| PD-03 | CLOSED | Phases 8–9, three stops | Three impact energies for one object, none reconciled. Phase 8 stop 1: radius 90 m, 20 km/s → **1.59×10¹⁸ J ≈ 380 Mt**, and the phase-8 stake says "roughly 400 megatons". Phase 8 stop 2: the same object at 12 km/s far-field → **1.06×10¹⁸ J ≈ 250 Mt**. Phase 9 stop 1 then converts **3.1×10¹⁷ J = 74 Mt** with no derivation and no note that it is a quarter of the figure two stops earlier. A player who is tracking the number — which this campaign explicitly asks them to do — cannot reconcile them. | Pick one approach speed for the object (12 km/s far-field is the physically motivated one, since phase 8 stop 2 depends on it) and make phase 8 stop 1 use it, giving ~1.06×10¹⁸ J. Then either set phase 9's conversion input to that value (≈250 Mt) or state in its scene that 3.1×10¹⁷ J is the *airburst-deposited* fraction rather than the entry total — which would also make the phase-9 airburst material land harder. Update the phase-8 stake's "400 megatons" to match whatever survives. |
| PD-04 | WORTH | Phase 5 "Bound the diameter" (DEGENERACY) | The physics of the panel is right and its numbers are not credible for an asteroid. The reflected-light locus runs to **albedo 1.0** at 120 m (a perfect mirror), and the answer sits at **albedo 0.444**, which is brighter than all but a handful of known bodies (typical range 0.04–0.25). In the one campaign whose entire thesis is that albedo is unknown and matters, teaching a 0.44 answer and a 1.0 endpoint undercuts the lesson. | Two options. Cheapest: narrow the reflected-light range from "120–600 m" to "180–600 m" in the scene, stake and locus, which drops the albedo-1.0 point and leaves 0.44 as the bright end. Better: move the truth to something like 240 m / 0.25 and re-author the thermal locus to cross there, then update the three places quoting 180 m. Either way, add a background line saying what a normal asteroid albedo is — the campaign never states the range, which is why the number reads as arbitrary. |
| PD-05 | WORTH | ~14 stakes and scenes | Numeral normalisation damage, same class as Outbreak and Bring Them Home. Worst cases: "1 has it reaching the ground, 1 has it coming apart 30 kilometres up, 1 is between" (phase 9); "The next 1 is up there now, unfound, and the survey line that caught this 1 expires in 11 months" (phase 15 — the campaign's closing line); "1 observatory's nightly window repeats on almost the same interval" (phase 6); "Roughly 1 in 600 allowed solutions impact" (phase 4, where it is arguably fine); "Dr. Arjun…" style constructions elsewhere. | Editorial pass restoring words where the digit replaced a word that is not a count: *one has it reaching the ground*, *the next one is up there now*, *one observatory's nightly window*. Phase 15's line is the last sentence the player reads before the ending card and it should not have a digit in it. |
| PD-06 | WORTH | Phase 12 "Design the Intercept" | Two of the three stops are PROTOCOL matching boards back to back (subsystem-owns-the-constraint, then semi-major-axis-to-period). The second is pure arithmetic dressed as a matching board — four axes, four periods, no distractor that is wrong for an interesting reason — and it sits in the phase whose stake is the campaign's biggest decision ("miss this window and there is no second attempt"). | Convert the Kepler board to a BALLPARK (axis → period, with 1.6 AU and a decoy that is the axis doubled) or fold it into the mission-design PROTOCOL as a given. That also fixes the format repetition inside one day. |
| PD-07 | TASTE | Phase 2 "Buy the best next observation" (VALUE) | The `parallax` option's `reveals` text argues against itself — "useful but less leverage on the six-day along-track prediction than the missing time baseline" — which is the verdict's job, not the card's. A player reading the options is told which one loses before choosing. | Trim to what the measurement reveals ("An independent distance constraint from simultaneous viewing geometry") and let the rebuttal carry the comparison. It already does. |
| PD-08 | TASTE | ~25 stops | The three repeated format essays in `background`. Same as every campaign. Notable here because this book's stop-specific backgrounds are exceptional — "why 1.4 microns is the suspicious place", "why total detections is the wrong score", "why a missed window is not like other misses" — and they are third in a list the player has learned to skip. | Keep each essay on first use of its format. |

## Phase-by-phase notes (short)

- **Phase 1** — Object-or-artifact is the right opening question and the BELT (motion, not brightness) reinforces it in a different register. Good pairing.
- **Phase 2** — Focal-plane distortion as the answer, with the second telescope as the exculpatory reading, is a properly hard DIAGNOSIS. PD-07 sits here.
- **Phases 3–4** — The orbit-family arc is the campaign's intellectual core, and the "point where the solutions diverge, on Tuesday" CHOICE is the best single question about experimental design in the whole catalogue. The CLOUD is well-tuned (both actions needed).
- **Phase 5** — DEGENERACY: right format, wrong numbers (PD-04).
- **Phase 6** — Rotation aliasing against an observatory's own nightly window is a lovely trap, and the HOLD (dish pointing against katabatic gusts) is the best-motivated HOLD I have read — eleven minutes, no second attempt for years.
- **Phase 7** — PD-01 sits here, in the stop that closes the size question "for good".
- **Phases 8–9** — Energy block. PD-02 and PD-03 both here; fix these two and the campaign's headline number becomes defensible.
- **Phase 10** — Best-conceived mission in the set. The blind-spot CHOICE, the volume-cube estimate, and the INJECT together make one argument three ways.
- **Phases 11–13** — Deflection arc. VERIFY's "the applause is not the result" and the locked pre-impact prediction are exactly right. The TRIGGER's two-day lead time on a planning cell is clean.
- **Phases 14–15** — The closing ATTEST (two checks, five signed claims, spend by consequence) and the legacy CHOICE both land. The final stake is the best in the repo apart from its stray digit (PD-05).

## Closing blurb

Three paragraphs, last one to the player and specific to their actual calls ("you separated what the radar could prove from what the model merely preferred, you kept the size uncertainty in front of everybody who wanted a single clean number"). "Valle Seco slept through it. That was your doing." is the best closing line in the five campaigns read so far. Keep.

## Warm-ups

Present and specific, and the two-tier structure is real here (base camp inside 200 m, outstations 1.6 km down the ridge), so `trial-far` earns its place. The SPOT stop on phase 10 ("what the dish is chasing tonight") makes the same point the warm-ups do about withdrawn instructions, in the right setting. No findings.

## What to keep

- The eight-year time base and the way the stake intervals widen. No other campaign uses its clock this way.
- Phase 10 as a self-audit, and the INJECT that makes completeness a number.
- "A sharper-looking orbit drawn from the same data is the most dangerous product on this list, because it looks like progress and narrows nothing." That rebuttal is the campaign's thesis in one sentence.
- Every "quiet channel decides it" DIAGNOSIS: no crater, no seismic signal, clear weather, healthy detector.
