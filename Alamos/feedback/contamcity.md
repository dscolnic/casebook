# The Contaminated City — play-through review

*Theme `contamcity` · college chemistry (grade 12 manifest) · 15 missions, 47 stops · reviewed 2026-08-21 by reading the full book (`books/contamcity.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

This is a strong campaign — arguably the model for what the senior games should feel like. The arc is real (fire → plume → tunnel → river → treatment → release decision → legacy), the cast tensions pay off (Nakamura vs Reyes is set up on day 8 and resolved on day 45, and day 45's stake says so), and the format mix is the best kind of varied: every instrument is doing work only it can do. I could solve 45 of 47 stops from what the card gives, at the right level, and most `why` blocks taught me something even when I was right. Two chemistry findings need fixing; the rest is polish.

**Answerable:** 45/47 clean. One stop has a shaky chemical premise (CC-01), one asks three questions and grades one (CC-03).
**Sense:** Coherent throughout. One cosmetic contradiction between the HUD day number and the stake text (CC-02).
**Level:** Right. First-year-college/AP-boundary chemistry, single-relationship estimates, honest distractors.
**Fun:** High. The best stops (titration DIAGNOSIS, stored-heat-vs-reaction DIAGNOSIS, the TRACE, the mass BALANCE) are genuinely satisfying to work. Weakest part is repeated boilerplate in the Background door (CC-05).

## Opening blurb

> "A freight yard beside the river burned last night, and nobody can say what came off it. You are the city's Chief Scientific Officer… the reserves are measured in days."

Excellent. All four beats, authority stated, the clock in the last clause, no mechanics. No change needed.

## The questions, solved

Every BALLPARK checks out numerically: V = nRT/P = 498.6 m³; min(10/2, 8) = 5 mol B; ΔG = −180 − 291(−0.40) = −63.6 kJ/mol; 2.5×100/10 = 25 mg/L; 10⁻⁴×1000 = 0.10 mol; 0 − 2×1.86×1.2 = −4.46 °C; 2000×4.2×5 = 42,000 kJ; 2/(4×7900)×1000 = 0.063 mm/yr; 40×21600/(2×96485) = 4.48 mol. Every distractor tile is a real trap (STP vs ambient, °C vs K, water vs steel density, hours vs seconds). The ALLOCATE (18 of 20 bottles) and BALANCE (80 of 100 kg) both close correctly and cannot be bought whole/read off. The TRACE is derivable: the blank's peak plus the structure spectrum's miss isolates the prep-solvent lot uniquely — the detector calibration can't invent a peak, and the card gives you enough to see that. The two DIAGNOSIS stops are the best content in the game: the east bay as a built-in control, and the titration's strong-acid reference on the same axes, are exactly how a diagnosis should be settled.

## Implemented since this review

- **CH-03/CM-08**, the numeral damage across all three editions, including the five *"1 dilution"* cases where the digit changed the meaning.
- **The opening card** now names Adaeze Okonjo, who runs analytical chemistry, and her position on the two-method question.
- **CM-04 is now measured and recorded** by `engine/dev/sceneCast.mjs`: ContamCity is 0 of 48 and its editions 1 and 2. Not fixed — see the note in the Project Y review about why 296 scene rewrites are recorded rather than done.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

> **Closed on 2026-08-22.** The rows marked CLOSED below were fixed and verified after the first pass; see `_rejudged.pdf` for the re-read.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| CC-01 | CLOSED | Day 4, "What the position in the table tells you" (CHOICE) | Chemical premise is wrong as written. The drums hold a sodium **salt** and a caesium **salt** of the same anion, and the key is "reactivity with water increases down group 1." That trend is about the **metals** (and their hydrides), not their salts — CsCl and NaCl are equally inert in water, because the cation is already oxidised. A strong student will pick "Neither, because the anion is the same in both drums," and be more right than the key. | Name the anion as one that reacts with water and whose violence the cation modulates — make them the metal **hydrides** (NaH vs CsH: same anion, and reactivity genuinely rises down the group), or make the drums hold the metals themselves. One word in the scene ("a sodium hydride and a caesium hydride") repairs the stop; adjust the "Neither" rebuttal to say the hydride ion is what reacts and the cation sets how violently. |
| CC-02 | CLOSED | Every stake from mission 5 on | The stakes run on calendar days (Day 6, 8, 11 … 52 — a nice device) but the plan card header prints `Day {mission index}` (`app.js:874`), so from mission 5 the player sees "Day 5 — What Dissolved in the River?" directly above a stake beginning "Day 6." Visible contradiction for 11 straight missions. | Cheapest: rewrite the stake openers to elapsed-time phrases that can't collide — "Six days since the fire." / "A week in." / "Day fifty-two of the response" is fine only if the header stops printing an index. Alternatively give the mission a `calendarDay` the plan card prefers; but the copy fix costs eleven sentence-openers and no engine work. |
| CC-03 | WORTH | Day 3, "Which reactant limits?" (BALLPARK) | The task and question promise three answers — limiting reactant, max mol B, percent yield — but the board computes only max B; the 84% yield lives in `solution` text and 4.2 mol is nowhere among the givens or labels. A player who tries to answer what was asked can't. This is the multi-step-estimate smell `questionLoad --sweep` flags repo-wide. | Narrow the ask to what the board grades: "How much B can actually react?" Move the yield sentence to `why`/background as a coda ("the recovered 4.2 mol is an 84% yield of that limit"), or author a second slot-pair for the yield if it's worth a stop of its own. |
| CC-04 | WORTH | Day 1, "Water first, or never water" (BELT) | Three items sit on the AP-knowledge boundary in ways the card doesn't arm the player for: **sodium hydroxide pellets** (left) heat water strongly on dissolution — a cautious player bins them right; **magnesium powder** (right) is taught at AP as reacting with steam, not cold water — it's right-bin because of the fire context, but the card never says the yard is hot; **calcium oxide** (right) vs NaOH (left) turns on hydration-reaction vs dissolution, a distinction the background paragraphs never state. With need=20 of 25 and pass=0.8 there's slack, but these are the misses that will feel unfair. | Add one background line drawing the line the board actually grades: "Dissolving can be hot — NaOH pellets warm the bucket — and it is still dilution. Reacting makes a new substance or a gas: an oxide slaking to hydroxide, a metal or hydride giving off hydrogen." Optionally swap magnesium powder for a cleaner right-bin item (e.g., calcium hydride). |
| CC-05 | WORTH | ~23 stops, Background door | The same three boilerplate paragraphs repeat verbatim on every PROTOCOL ("Why this is a matching board…"), every CHOICE ("Why the wrong options are the interesting ones…"), and every SEQUENCE ("Why the order is graded whole…"). By day 3 the door stops being worth opening, which costs the stops whose background is actually specific (the sampling-design ones are excellent). | Keep the format essay on the **first** stop of each format only; on later stops replace it with one stop-specific paragraph or drop it, leaving the equation/glossary lines. This is book editing, not engine work. |
| CC-06 | WORTH | Day 45, "Approve, condition, or hold" (CLOUD) | The cloud's axis is authored `bounds: {min: -16, max: 10}` for a report centred at 9 with spread 1 — a 26-unit axis for a ±2 band, with the limit at the extreme right edge. Unless the panel re-windows, the cloud renders as a smear crushed against one edge and the σ-bar placement (the whole exercise) is done in a few pixels. Also: the scene says "9 ± 2" while the authored spread is 1 — presumably ±2σ, but the card never says which, and this stop is *about* what a band means. | Set bounds to something like `{min: 4, max: 12}` and screenshot the panel. State the band's convention in the scene or guide ("give or take two — the full supported range" or "±1σ of 1"). |
| CC-07 | TASTE | Day 8, "Map concentration with limited samples" (CHOICE) | "Densely around the intake" vs "spread along the river over several days" is a close call the guide only just tips — the temporal-coverage argument (two grabs disagree 6×, which the *previous* stop's ALLOCATE treated as the design brief) genuinely supports the distractor. Defensible as authored judgment; noting it because it's the one CHOICE where I hesitated for the wrong reason (contradiction with day 6's lesson) rather than the right one. | If touched: have the guide acknowledge day 6 explicitly — "the survey already covers the river; this question is where the *map's* detail goes." |
| CC-08 | TASTE | Stops carrying both `scene` and `story` | Most stops carry a `story` paragraph (42–96 words) displayed nowhere — the known repo-wide dead-field issue, listed here only because this book is a heavy contributor. The prose is good; some of it (e.g., the vapour-pressure story) is better than the scene it shadows. | Fold the best sentences into `scene`/background during the next pass over this book; delete the rest. Already on the repo's unfinished-work list. |

## Day-by-day notes (short)

- **Day 1** — Four stops, three formats plus the BELT. Strong opening day; the SEQUENCE (evidence workflow with authored `axis`/`ends`) is a model of the non-chronological rail. CC-04 lands here.
- **Day 2** — Ideal gas BALLPARK is exactly scaled; the "two of them describe conditions the release is not at" guide line is the right kind of hint.
- **Day 3** — Tunnel day has real menace. CC-03 lands here. The ΔG estimate's Celsius-as-tile distractor is excellent.
- **Day 4** — CC-01 lands here. The TRACE beside it is one of the best stops in the catalogue.
- **Days 6–8** — Sampling-design pair (ALLOCATE, then the map CHOICE) teaches the same idea from two ends; CC-07 is the seam between them. The SPOT (bench priorities) is a good fit for a lab, not just a reflex test.
- **Day 11** — The titration DIAGNOSIS is the best single stop in the game. TRIGGER's one-reading-of-lag rule is honest and the rehearsal stream is a kind touch.
- **Days 14–21** — Equilibrium/thermal block holds up; the east-bay control in the self-heating DIAGNOSIS is textbook-good. HOLD's pH-is-a-logarithm background is the right teaching in the right place.
- **Days 26–38** — Corrosion and treatment train are solid; the mass BALANCE (80 of 100 kg) is the campaign's thesis stated as arithmetic.
- **Days 45–52** — The CLOUD needs its axis checked (CC-06); everything else about the close is right, and the ending paragraph addressed to the player is earned.

## Closing blurb

Three paragraphs, last one about the player, specific to their actual calls ("you identified the compound with two methods instead of one… you signed nothing you could not show the working for"). No change.

## Warm-ups

All seven authored, all specific (six drums on the manifest, four in the yard; the owner at the gate wanting a verbal all-clear is the best EVADE reason in the set I've read so far). Names arrive with jobs. No findings.

## What to keep (do not "fix")

- The calendar-day stakes device itself — just resolve the header collision (CC-02).
- Nakamura/Reyes tension and its day-45 payoff.
- The two DIAGNOSIS stops and the TRACE — reference-quality.
- Tile distractors that are the same quantity in the wrong currency (273 K, 6 hours, water's density).
