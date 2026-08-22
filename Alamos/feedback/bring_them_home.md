# Bring Them Home — play-through review

*Theme `bring_them_home` · college physics via spaceflight operations (grade 12 manifest) · 15 shifts, ~45 stops · reviewed 2026-08-21 by reading the full book (`books/bring-them-home.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The most disciplined *course* of the four reviewed. It teaches one idea — several agreeing measurements are one measurement if they share a part — and then earns it twice with different physics: three pressure channels on one electrical reference in shift 1, three tracking products on one station clock in shift 14, and a closing CHOICE that names the repetition as the thing worth funding. That is a campaign with a thesis. The cast argument (Whitaker "correct on shift 3, expensive by shift 14") is the best-tracked disagreement in the set, and the entry sequence closes on a genuinely tense ATTEST.

Three defects need fixing before this ships well. One STRESS panel will render a table of dashes because its criteria keys and its score keys are different words. One VERIFY asks the player to predict a current the card gives no way to compute. And one FLY offers a start pulse that cannot reach the target under any braking choice. All three are book-level; none needs engine work.

**Answerable:** 42/45 clean. BH-01 (STRESS shows no numbers), BH-02 (VERIFY unguessable), BH-03 (FLY dead option).
**Sense:** Strong. Continuity across shifts is deliberate and it lands.
**Level:** Right. Every BALLPARK is one relationship, and the distractor tiles are consistently the same quantity in the wrong currency.
**Fun:** High, and unusually varied in *texture* — a shift where nothing goes wrong (11), a shift where something is simply fixed (12), and a shift that is all bookkeeping before blackout (15).

## Opening blurb

> "Three people are in a spacecraft on the far side of a quarter-million miles, and something aboard has just exploded… The crew can hear every word said on the loop."

Best closing clause of any opening in the set. Keep unchanged.

`dayNoun: 'Shift'` against stakes counting mission-elapsed hours ("34 hours in") — same clean separation Outbreak gets from "Stage", no collision. Keep.

## The questions, solved

Verified: Δv = 6000×20/30000 = 4 m/s; τ = 200×3 = 600 N·m; 18 kWh ÷ 3 kW = 6 h; P = 20²×0.05 = 20 W; ΔT = 1000×10800/12e6 = 0.9 K; CO₂ = 3×20×6 = 360 L; λ = 3e8/2e9 = 0.15 m; s = ½×0.004×90² = 16.2 m; KE = ½×5000×11000² = 3.0×10¹¹ J; T = 2π√(4/400) = 0.628 s; √(6²+8²) = 10 km. The two CHAIN stops (seawater-flow analogue: filter is governing, fan is the distractor; oxygen delivery: gas exchange governing, cardiac output the distractor) both solve from the readings. Both TRACE/CONTROL stops solve on the shared-dependency argument. The FLY arithmetic checks out for the 6 s pulse: 2 deg/s² for 6 s gives 12 deg/s after 36°, needs 36° to stop, so brake at 54° — inside the authored 35–90 range.

## Implemented since this review

- **Its STRESS panel now shows numbers.** Three criteria were keyed `life_support`, `entry_margin` and `propellant_margin` against scores keyed `returnHours`, `entryMarginDeg` and `propellantMarginKg`, and `instruments.js` renders the table as `scores[candidate][criterion.key]` — so every cell in every column was an em dash. The keys are the score fields now, the importer refuses the mismatch, and `npm run traps` covers it.
- **BH-01's opening card** now names Dr. Camila Reyes with the guidance job attached.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| BH-01 | CLOSED | Shift 13 "Select the robust trajectory" (STRESS) | The panel renders every score cell as `—`. `instruments.js` STRESS reads `s.scores[candidate.id][criterion.key]`, and this stop's criteria declare `key: life_support / entry_margin / propellant_margin` while its scores supply `returnHours / entryMarginDeg / propellantMarginKg`. Nothing matches, so the table has four candidate names, three empty columns and a slider — the format's entire argument (rows going dark as numbers cross limits) is invisible. Both other STRESS stops in the repo (contamcity `heat/cooling/time`, deepwatch `quiet/endurance`) use matching keys, so this one is the outlier. | Rename the criteria keys to the score keys: `key: returnHours`, `key: entryMarginDeg`, `key: propellantMarginKg`. Also drop the non-standard `type: returnHours<=assumption` on the first criterion (no other book uses it and the engine doesn't read it) — the `feasible` map already encodes the endurance cutoff. While there: `feasible.fast: 224` is a sentinel meaning "never feasible" (above the slider max of 112); if that's intended, comment it, because every other value in that map is a real endurance figure. |
| BH-02 | CLOSED | Shift 6 "Qualify the emergency battery plan" (VERIFY) | The player must lock a predicted equalisation current between 6 and 16 A, graded at 14 ± 10%. The card gives the module voltage (31 V against 37 nominal) and the connector rating (8 A) and *no resistance and no bus voltage*, so the prediction cannot be computed — it is a guess with a 1-in-5 chance. The background even states the method ("the difference between the two, divided by the resistance of everything between them") while withholding both terms. | The numbers already exist one shift earlier: the sagging bus reads **24 V** (shift 5) and a tile there gives **0.5 Ω** for the cable run. 31 − 24 = 7 V over 0.5 Ω = 14 A, exactly the authored truth. Put both in the scene: "the healthy bus is holding 24 volts and the improvised path measures about half an ohm." The stop becomes computable, and it rewards a player who remembers shift 5. |
| BH-03 | CLOSED | Shift 4 "Execute a manual attitude maneuver" (FLY) | The pulse selector offers 4, 6 or 8 s at 2 deg/s². The 8 s pulse reaches 16 deg/s after 64°, and needs another 64° to stop — 128° total against a 90° target, so it overshoots under *every* brake setting and no authored tolerance can save it. A player who reads "harder start, shorter turn" and picks 8 s is guaranteed to fail with nothing telling them the option was impossible. | Either drop the 8 s option (`max: 6`) or raise the target so 8 s is flyable. Dropping it is cleaner and keeps the intended lesson (4 s and 6 s both work, with different brake points). If it is kept deliberately as a trap, the background must say that a pulse can be too large for the available angle — currently it only says a small pulse is "easier to fly", which reads as a preference, not a constraint. |
| BH-04 | WORTH | Shift 5 "How long can the battery last?" (BALLPARK) | The answer is 6 h and one of the distractor tiles is `6 h (time to the next burn)`. A distractor whose value equals the target defeats the format's own sanity check — "does the size of the answer look right" can be satisfied by the wrong tile, and a player who mis-places will see a plausible 6 and stop. | Change the burn time to a non-colliding value (4 h or 8 h works with the surrounding fiction) or make the distractor a different quantity entirely (`28 V` and `3.5 kW` already cover the "wrong currency" trap). |
| BH-05 | WORTH | Shift 2 "Which measurement constrains what?" (PROTOCOL) | The four right-column options are 45–60-word paragraphs each (the Doppler one is 57 words) on a two-column matching board where all four must be held in mind at once. That is roughly 220 words of options plus scene, guide and columns — the heaviest single card I have read in four campaigns, and the explanations are teaching material that belongs behind the Background door. | Cut the options to their claim ("Photograph it against catalogued stars", "Compare the returned frequency with the transmitted one", "Time a pulse out and back", "Repeat the position measurement and subtract"). Move the physics — the catalogue precision, the fractional-shift relation, the error-carrying-forward note — into `background`. The rebuttals already carry the short version. |
| BH-06 | WORTH | Shift 13 "Protect the entry corridor" (CLOUD) | Two problems. The `shift` action is `amount: 1` on a corridor 2.4 degrees wide, while the authored answer says the solution should end "centred near 6.5 degrees" — a move of +0.3 from 6.2, not +1. And contamcity's CLOUD uses `amount: 0.0333` on a 26-unit axis, so the field's units are inconsistent between books. Either this stop shifts the band clean out of the corridor, or `amount` is in some derived unit nobody has documented. | Screenshot the panel with these numbers before trusting either reading. If `amount` is absolute, set it to 0.3. Whatever it is, add a one-line comment in the book stating the unit, because two books currently disagree by a factor of thirty. |
| BH-07 | WORTH | ~10 stakes and scenes | Numeral normalisation damage, same class as Outbreak's: "A hundred and 18 hours in" (shift 15), "caught this 1 — worth saying" (shift 12), "1 thruster quad is dead" (shift 4), "3 crew members each exhale" (shift 8), "2 narrowband components sit at 147 and 150 hertz" (shift 12 scene), "Several ground measurements… 1 is 6 kilometres" (shift 14). "A hundred and 18" is the worst — it reads as a transcription error in the first line the player sees that shift. | Editorial pass restoring the word where the digit replaced a word that is not a count: *one hundred and eighteen*, *caught this one*, *one thruster quad*, *Two narrowband components*, *One is 6 kilometres*. |
| BH-08 | TASTE | Shift 9 "Why did the signal fade?" (CONTROL) | The block carries two keys the engine never reads: `reversalRequired: true` (the panel hardcodes reversal as always required — its own summary line prints "reversal required") and `acceptResponseDb: 0.6` (the panel compares against `noise`). Harmless today; exactly the shape of the dropped-key class this repo has paid for twice. | Delete both, or if they are wanted as authorable, wire them in `instruments.js` and add importer refusals. Note the same family of dead keys appears in Outbreak's CONTROL (`variables[].result`, `deltaFromBaseline`, `states`) — worth one sweep across all CONTROL stops rather than four separate fixes. |
| BH-09 | TASTE | ~25 stops | The three repeated format essays in `background`, as in every campaign so far. Called out again only because this book's stop-specific backgrounds are the best of the four — the FLY's "why the brake has to lead", the CONTROL's "why two stations at once is the clue", the ATTEST's "how to choose between two unbacked claims" — and they are buried behind the same three paragraphs the player has already stopped reading. | Keep each essay on first use of its format only. |

## Shift-by-shift notes (short)

- **Shift 1** — Opens on the campaign's thesis (three channels, one reference) and then organises the room. "Attention is a physical resource" is the right first CHOICE for a flight director.
- **Shifts 2–4** — Navigation block. The measurement-to-quantity matching is good content buried in too many words (BH-05). FLY is a highlight apart from BH-03.
- **Shifts 5–6** — Power/battery arc is excellent: I²R at 20 W "in a joint the size of a thumbnail, in a sealed cabin" is the best-argued number in the campaign. BH-02 and BH-04 sit here.
- **Shifts 7–8** — Thermal and air. The CHAIN (working fan, blocked filter) and the "sealed flow path beats exposed area" CHOICE are the two stops most worth keeping verbatim.
- **Shifts 9–10** — Comms recovery and optics. The trace-reading PROTOCOL ("a step with no slope change after it is bookkeeping, not a manoeuvre") is a lesson no other campaign teaches.
- **Shifts 11–12** — Entry energy and resonance. Deliberately calmer, and the book says so in the stakes; that pacing choice is right and rare.
- **Shifts 13–15** — BH-01 and BH-06 are both here, in the two stops carrying the most decision weight. Worth fixing first for that reason. The final ATTEST (shield configuration changed without a record, eleven minutes, two checks) is the best closing question in the set so far.

## Closing blurb

Three paragraphs, last one to the player and specific to the calls that were theirs ("you worked out which reading could wait and which could not… you said out loud what you were still unsure of"). Earned. Keep.

## Warm-ups

Present and specific (`books/bring-them-home.yml` line 3260) — nine spare tapes, catching a lead before a console handover, and the EVADE built around somebody who wants a verbal commitment. Consistent with the campaign's own subject: every one is about a record or a number rather than about walking. No findings.

## What to keep

- The one-thesis structure: shared reference (shift 1) → shared clock (shift 14) → fund the redesign (shift 15). Nothing else in the catalogue closes a loop that cleanly.
- Whitaker vs Carter, right on shift 3 and expensive by shift 14, with both stakes saying so.
- Shift-texture variety — a shift where nothing goes wrong, a shift where something is simply fixed.
- "Twelve decibels is about one sixteenth of the power arriving" as a background paragraph. That is how a log scale should be explained to somebody who has to act on it.
