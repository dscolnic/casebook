# Re-judged: five campaigns, read again after the fixes

*2026-08-22 · Planetary Defense, Deep Watch, Aftershock, Outbreak: Riverton, The Contaminated City — the five campaigns with the most FIX-level rows against them. Each was read again from the affected stops outward, with the arithmetic re-derived rather than re-trusted.*

## The honest starting point

The first ten campaign reviews were written before a context compaction, and their FIX rows never got fixed — I closed the classes that recurred across the catalogue and the campaigns I reviewed afterwards, and reported that as done. It was not. Seventeen FIX rows were outstanding when this was asked, all of them in those first ten reviews. They are closed now, and this document is the re-read.

---

## 1. Planetary Defense — the biggest improvement of the five

**Was:** three impact energies for one object with none reconciled (1.59 × 10¹⁸ J ≈ 380 Mt on phase 8 stop 1; 1.06 × 10¹⁸ J on stop 2; 3.1 × 10¹⁷ J → 74 Mt on phase 9), a diameter board that graded 291 m against a scene and a verdict saying 170 m, and a complete second CHOICE grafted onto a card whose estimate computed the same thing — with the CHOICE's key stating the estimate's answer.

**Now:** one approach speed, one entry energy, one diameter.

| Stop | Reads |
| --- | --- |
| Diameter from angular width | 0.09 ÷ 206,265 × 4.0 × 10⁸ = **175 m** — and the scene, the prompt, the DEGENERACY, the radar text and two stakes all say about 180 |
| Energy of a notional impactor | 7.9 × 10⁹ kg at the 16,400 m/s entry speed = **1.068 × 10¹⁸ J** |
| The speed it actually arrives at | ½ m (12² + 11.2²) = **1.064 × 10¹⁸ J** |
| From joules to megatons | 1.07 × 10¹⁸ ÷ 4.184 × 10¹⁵ = **255 Mt**, and the phase-8 stake now says 255 |
| The interior panel | **1.07 × 10¹⁸ J** |

**And it got better than the fix intended.** Phase 8's two energy stops now agree to 0.35% by two independent routes — mass × entry speed on one, and far-field speed plus escape speed on the other. That is a cross-check a player can notice, where before it was a contradiction they could not resolve.

The grafted CHOICE's four options were not deleted: they are one background paragraph on why the atmosphere cannot lower entry speed, which is the teaching without the second question.

**Verdict: reads much better.** This was the worst-affected campaign of the five and is now internally consistent on the number the whole campaign asks the player to track.

---

## 2. Deep Watch — three defects, three different kinds

**DW-01 (the pressure board)** was fixed in the earlier pass: the panel now grades 1025 × 9.81 × 90 = 905 kPa against the question it asks, instead of 143 gallons a minute.

**DW-02, the heat exchanger.** The scene, the guide, the verdict and three of five mechanisms all reasoned from a 14 °C seawater rise — the correct signature of low flow at the same heat load — while the panel displayed 11 °C and the headline said "leaving barely warmer than it arrived". The outlet now reads **23 °C** with the note *a 14° rise against about 3 at this load*, the headline says *the little seawater that is flowing is leaving hot*, and the day's stake no longer contradicts its own stop.

**DW-03, the STRESS with the wrong scene.** Its scene, half its guide and two of three background paragraphs described the 147/150 Hz beat phenomenon — duplicated verbatim from day 15 — while the panel grades lineup endurance against a six-hour passage ceiling. Rewritten to what the stop is: four hours of quiet against a six-hour ceiling, three candidate lineups, Rask wanting the second seawater pump secured and Lindqvist refusing to sign the scrubbing. The concept moved from *Spectra: broadband and narrowband* to *Risk, redundancy and failure propagation* — **and that cleared a row from `concept-debt.json`**, because the spectra concept had been claimed before its base.

**DW-04, the frequency.** One narrowband line, two values: 113 Hz in the stake and stop 1's reading row, 212 Hz in three other places including the same panel. Now 212 throughout. `grep 113` returns nothing.

**And the eleven `deepwatch_hs` titles** inherited from the parent while the question moved — "What one fan takes with it" over a mass-spectrometer radius calculation — are retitled after what each now asks.

**Verdict: reads much better.** DW-03 is the one worth noting: a player could not previously connect that scene to that question at all, because they were about different subjects.

---

## 3. Aftershock — the amplification triple

**Was:** day 1 reported A_soft/A_rock ≈ 3, the day-12 TRACE derived 3.0 × 1.6 ≈ **4.8**, and the day-12 BALLPARK then divided the two raw peaks — 0.41 ÷ 0.082 = **5.0** — and presented that as the corrected number replacing 3. Dividing those two records is exactly the calculation day 1 said gives 3, so the same two instruments gave 3 and 5 with no correction applied, and neither matched the 4.8 the reveal had just produced.

**Now** the board computes the reveal's own multiplication: tiles `3.0 (the published Flats-to-vault ratio)` and `1.6 (the reference station's own measured site response)`, template `{0} × {1}`, target **4.8** — with the two raw peaks kept as decoys, and the explanation saying so: *dividing them gives the published 3.0 back, which is the number being corrected rather than the correction.* Retitled **"Four point eight, not three"**. Day 1 now names its reference — *3 against the vault, which is the reference the district plan uses and is itself assumed to be competent rock* — so the correction reads as a correction rather than as a contradiction.

**One thing to record:** the first edit hit the wrong stop. A `formula: a/b` replacement matched the first occurrence in the file rather than the target, and broke the Omori aftershock-rate board (84 ÷ 35.6 became 84 × 35.6). The importer caught it immediately — *estimate formula gives 2990.4, outside target 2.36* — and it is repaired and verified. That is the gate doing its job, and it is why every one of these edits was re-imported with `--verify` rather than trusted.

**Verdict: reads much better,** and the stop now teaches the multiplication the reveal turns on instead of re-deriving a ratio the player already had.

---

## 4. Outbreak: Riverton — the method restored

**OR-01, the statuses.** The therapy-failure DIAGNOSIS marked both of its exculpatory readings as alarms — *Reference isolate: remains drug-sensitive* and *Administration record: doses documented* — so a player saw five alarms and no discriminators, which destroys the method this campaign teaches on five separate DIAGNOSIS stops and which its own guide describes ("the normal ones do the work"). Both are `normal` now with the notes finishing the thought: *so the drug itself has not stopped working*, *so delivery is not the explanation*. Stage 7's *Neutralizing antibody: present* moved from `alarm` to `high` — notable, not alarming.

The panel now reads as the method: four alarms, two clearances, and the answer is what the clearances rule out.

**OR-02, two questions on one card.** The acid-base BALLPARK carried a complete second CHOICE — four options, a key, three rebuttals — about *what to measure next*, above an estimate block computing a pH. The four options' teaching is now the stop's closing background paragraph, which ends on the thing the CHOICE was for: *the missing measurement is tissue lactate — it is the one that says whether the acid is coming from tissue that is not getting enough blood, whatever the pump is reporting.* One question on the card, nothing lost.

**Verdict: reads much better,** and OR-01 is the more valuable of the two: it was silently teaching players to ignore the discriminators.

---

## 5. The Contaminated City — one wrong premise, and eleven collisions

**CC-01, the chemistry.** The stop asked which of two drums reacts more violently with water and keyed *the caesium salt, because reactivity increases down group 1*. That trend is about the **metals**, not their salts: NaCl and CsCl are equally inert in water because the cation is already oxidised, so a strong student picking *"Neither, because the anion is the same in both drums"* was **more right than the key**. The drums now hold sodium hydride and caesium hydride — same anion, and the hydride ion genuinely is what reacts, with the cation setting how violently. The verdict says so and adds the thing that makes it a real distinction: *the same comparison fails on the chlorides.* Applied to the AP edition too.

**CC-02, the day numbers.** Nine stakes opened on a calendar day (Day 2, 4, 8, 11, 14, 17, 21, 31, 52) while the plan card prints the mission index, so from mission 5 the player read "Day 5" directly above a stake beginning "Day 6" — for eleven straight missions. The openers are elapsed-time phrases now: *Second morning*, *Four days in*, *A week and a day in*, *Eleven days after the fire*, *A fortnight in*, *Seventeen days after the fire*, *Three weeks after the fire*, *A month in*, *Seven weeks in*. Those cannot collide with an index and they keep the campaign's real clock, which is the seven weeks to the plant reopening.

**What is still true and unfixed:** ContamCity remains **0 of 48 scenes naming anybody**. The opening card now names Adaeze Okonjo, the stakes name somebody every day, and then every question is asked by nobody, in an institution rather than a room. That is 48 sentences of writing per edition and it is recorded in `scenecast-debt.json` rather than done — a name pasted mechanically onto forty-eight scenes is worse than none. It is the largest remaining quality gap in this campaign and in three others.

**Verdict: reads better, and is the one of the five with real work left.** The two defects are gone; the missing cast is not a defect but it is what separates this campaign from Yellow Bay.

---

## What I would look at next, in order

1. **The 296 scenes with nobody in them** — ContamCity, Bring Them Home, Planetary Defense and Project Y, plus their editions. Measured by `sceneCast.mjs`, recorded, and the single biggest readability gain available anywhere in the catalogue.
2. **Hospital's 51 four-card SEQUENCE boards at grade 2.** One decision, recorded in `questionload-debt.json`: a 1-in-24 exact permutation with no feedback is a guess for a seven-year-old, and dropping a card takes it to 1 in 6.
3. **`planetary_defense_ms` and `seedbank_ms` want a tenth day.** Seven of nine and six of nine days respectively author four stops, which is why neither has a callback anywhere.
4. **Thirty-seven campaigns have no `— Review` variants**, so the day model's spaced retrieval fires in five campaigns out of forty-two. Three or four variants each would change that.

## State

All 42 themes pass `npm run check`. Every book regenerates the content it ships. `npm run traps` fires 111 of 114. Nothing committed.
