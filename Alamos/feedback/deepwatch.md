# Deep Watch — play-through review

*Theme `deepwatch` · senior high physics via naval acoustics (grade 12 manifest) · 15 missions, 46 stops · reviewed 2026-08-21 by reading the full book (`books/deep-watch.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The best-written campaign I've reviewed so far, and the one with real cross-day memory: the quiet lineup Rask asks for on day 9 causes the hot bearing on day 13, gets argued at the refit on day 14, and the breaker "nobody logged" pays off the whole thread. The boat feels like one system. Question quality is high — CHAIN, CONTROL, ATTEST, DELEGATE and the two HOLDs are all doing exactly what their formats are for. But this book has more copy-paste damage than contamcity: one estimate board grades the wrong stop's arithmetic, one diagnosis contradicts its own readings, one STRESS stop wears another stop's scene, and one frequency changes value mid-mission. All four are fixable in the book without touching a panel.

**Answerable:** 42/46 clean. Four stops carry internal contradictions or mismatched boards (DW-01…04).
**Sense:** Excellent between stops; the four findings are all *within*-stop copy/paste faults.
**Level:** Right for grade 12. Arithmetic is one relationship per board (except the honest 6-slot PV=nRT, which is fair at this level).
**Fun:** Highest of the set so far. Continuity, consequence, and a cast whose arguments are the plot.

## Opening blurb

> "You have the watch on a submarine at ninety metres… Surfacing is where every one of these problems stops being fatal. Somebody has to be willing to call it."

Excellent — situation, authority, stakes, and the last two sentences are the campaign's thesis. Keep.

## The questions, solved

Numbers all verified except where flagged: set = 0.55×3.5 = 1.93 nm; sounder depth = ½×1500×0.120 = 90 m vs charted 102; margin = 4/2 − 2/2 = 1 nm; inflow = 88+55 = 143 gpm; PV/RT = 1013×36/(8.314×293) ≈ 15 mol → 1.85 h; 9/3 − 9/8 = 1.875 h; Δf/f·c = 0.3/150×1500 = 3 m/s; 1.025×1.6 = 1.64 t; 6/0.3 = 20 h; SNR = 145−55−(85−20)−10 = 15 dB; 2^(12/3) = 16×; beats = 150−147 = 3 Hz. The CONTROL (13 dB response vs 2 dB noise, reversal required), CHAIN (45% seawater flow is the governing link, hot bearing is the distractor), ATTEST (valve + escape routes are the two critical-and-unbacked claims) and DELEGATE (boundary at 54 °C rising 6 °C/min against an 80 °C limit is the one you keep) all solve cleanly from what's on screen.

## Implemented since this review

- **The day-5 estimate board.** It asked for a gauge pressure at 90 m and graded 143 gallons a minute off a bilge-flooding tile row. Rebuilt on 1025 × 9.81 × 90 with the pump and the bilge level as decoys; target 904,972 Pa, units `Pa (about 0.91 MPa)`; the guide rewritten to say which two numbers describe the water going *out*.
- **`engine/dev/boardAnswer.mjs`** now gates the class — 2 of 307 boards fired, both this one, zero false positives.
- Numeral damage: two occurrences.
- `dayNoun` was already present.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| DW-01 | CLOSED | Day 6 "What 90 metres puts behind the valve" (BALLPARK) | The stop's question, scene, `relationship`, `why`, `answerText` and `solution` are all hydrostatic pressure (ρgh ≈ 0.91 MPa) — but the estimate board's labels, values, template and target are a **copy of the previous stop's inflow arithmetic**: `8 cm × 11 gal/cm + 55 gpm = 143 gallons per minute`. No density or g tile exists, so the stated question is uncomputable, and what the panel grades is the number the player just computed one stop earlier. (This is the exact defect CLAUDE.md records as caught by `apply-conversions` — it is still in the book.) | Rebuild the board as the pressure estimate: labels `1025 kg/m³ (seawater density)`, `9.81 m/s² (g)`, `90 m (depth)`, distractors `1000 kg/m³ (fresh water)` and `9 m (periscope depth)`; template `{0} × {1} × {2}`, target `905000`, tolerance ~40000, units `Pa` (or work in kPa). Guide rewrite to match ("two densities on the board, one of them fresh"). Re-import and run `equationOrder`. |
| DW-02 | CLOSED | Day 13 "One link is not handing the heat on" (DIAGNOSIS) | Two incompatible stories in one stop. Scene/guide/why: seawater enters 9 °C, **leaves 23 °C** — ΔT 14 instead of 3, the correct signature of low flow with the same heat load. Headline/readings/stake: outlet **11 °C**, "leaving barely warmer than it arrived." The player is told to reason from a 14° rise while the panel displays a 2° rise, and the mechanism the answer teaches (lower mass flow ⇒ larger ΔT) is contradicted by the reading on screen. | Pick the physically-right story: set the Outlet reading to `23 °C` (status alarm, note "14° rise against a normal 3"), rewrite headline to "…and the little seawater that is flowing is leaving hot", and fix the day's stake sentence ("the seawater leaving the heat exchanger is barely warmer" → "is far hotter than it should be"). |
| DW-03 | CLOSED | Day 12 "Four hours of quiet" (STRESS) | The scene, half the guide, and background ¶1 belong to a different stop — they describe the 147/150 Hz beat phenomenon (duplicated verbatim from day 15's beat BALLPARK), while the STRESS panel is about lineup endurance vs schedule margin. "Sound speed is about 1500 m/s… those are the facts the surviving plan has to be consistent with" is not true of anything the panel grades. A player cannot connect the scene to the question. | Write the scene this stop needs: the four-hour transit, the six-hour ceiling, three candidate lineups on the board, Haruki and Rask's argument. Guide keeps only the margin-slider instruction. Drop the beats background paragraph (it lives on the day-15 stop already); keep ¶2 (why stress the margin) and ¶3 if rewritten without sound speed. Also change `concept` from "Spectra: broadband and narrowband" to the planning/redundancy concept. |
| DW-04 | CLOSED | Day 11 "Sonar Blinded by the Boat" | The new narrowband line is **113 Hz** in the stake and in stop 1's readings table, and **212 Hz** in stop 1's scene, stop 2's scene/CONTROL, and stop 3. One number, two values, three screens apart — and stop 1 shows both on the same panel (scene 212, reading 113). | Pick 212 Hz (the CONTROL and Doppler stops already use it) and fix the stake and stop 1's reading row. One value, three lines. |
| DW-05 | WORTH | Day 2 "The bearing that does not move" (CHOICE) | The key ("We are on a collision course, and the range is closing") over-claims relative to the stop's own guide ("Steady bearing with a rising level **does not prove** a collision") and why ("The important point is not that a steady bearing proves collision by itself"). A player who takes the guide seriously will refuse the key and pick "Nothing until a range is available." | Reword the key to the doctrine the why actually teaches: "Treat it as collision geometry until proved otherwise — the bearing rules out it sliding safely across the bow." The rebuttal for "Nothing until a range" already carries the counter. |
| DW-06 | WORTH | Stakes from mission 4 on | Calendar-day stakes ("Fifth day… Twenty-second day") vs the plan card's `Day {mission index}` — same visible collision as contamcity (CC-02), starting at mission 4 (header "Day 4", stake "Fifth day"). | Same options as CC-02; here the fix is even cheaper because the openers are ordinal words — "Two days out," "A week into the patrol," etc. |
| DW-07 | WORTH | Day 11 stop 1 vs stop 2 | Stop 1's scene states "its frequency shifts slightly when the seawater-pump speed changes" — which is the causal answer stop 2's CONTROL exists to establish. The experiment is pre-solved one card earlier. | Weaken stop 1 to the correlational fact only ("appeared twenty minutes after a pump was started"); keep the frequency-tracking fact as what the CONTROL's reversal proves. Stop 1's own answer (machinery fault, not external) survives on "rise on every bearing" alone. |
| DW-08 | WORTH | Day 11 BELT "Ours, or somebody else's" | "Echo sounder" is binned *Made outside* — but a fathometer is one of the classic own-ship noise sources, and this boat demonstrably has one (day 3 uses it). A knowledgeable player will bin it left and be marked wrong. | Rename the item to disambiguate: "Another ship's echo sounder" or "Fishing-fleet sounder". |
| DW-09 | TASTE | Day 12 "What silence buys, term by term" (BALLPARK) | The stop carries stray PROTOCOL keys (`columns`, `scenarios`, `choices`, `mapping`, matching-style rebuttals) alongside the estimate block. Presumably ignored by the renderer, but it is a booby trap for the exporter and for `fieldCoverage`. | Delete the matching-board keys; keep the estimate and its rebuttals if the panel prints them, else drop. |
| DW-10 | TASTE | ~20 stops | Same repeated format-boilerplate in Background as contamcity (CC-05). The stop-specific backgrounds here (CONTROL's "why one machine at a time", the trim HOLD's density paragraphs) show how good the door is when it's specific. | Same treatment as CC-05: keep the essay on first use per format. |

## Day-by-day notes (short)

- **Day 1** — The ROUTE with landmark recovery is the best tutorial-in-disguise in the set. Walkdown SEQUENCE's order is defensible and the rebuttals argue it well.
- **Days 2–3** — Sonar classification arc is genuinely teachable; the 90 m vs 102 m sounder stop is a model "independence" lesson. DW-05 is the one soft key.
- **Day 4** — Margin BALLPARK's "number of halves" tile is a clever non-quantity distractor.
- **Days 5–6** — The BALANCE (pump hides 55 gpm) is excellent; DW-01 sits right beside it and steals its arithmetic. The 5-card electrical SEQUENCE earns its fifth card.
- **Days 7–8** — Two-fault atmosphere DIAGNOSIS (shut damper *and* bad sensor) is the hardest fair question in the game. DELEGATE's return-conditions structure is the format at its best.
- **Days 9–15** — The quiet-lineup consequence chain (DW-04/07 aside) is the campaign's spine and it lands. ATTEST's "signed by a man who was ashore that morning" is a lovely stake detail. The final CHOICE ("nothing on the board is red") is the right closing exam.

## Closing blurb

Three paragraphs, last one to the player, with the surfacing call named as theirs. Earned. Keep.

## Warm-ups

All seven specific and in-fiction (two breathing sets moved and unlogged; the chief wanting an answer you don't have readings for is the best EVADE premise in the repo alongside contamcity's gate owner). No findings.

## What to keep

- Cross-day causality (quiet lineup → hot bearing → refit argument). No other campaign reviewed so far does this.
- Whitfield being wrong on day 4 and right on day 8, said out loud in the stakes.
- The one-source-two-displays motif recurring (day 3 nav, day 13 breaker, day 14 sounder) — it's the course's thesis and the book knows it.
