# Ice Core — play-through review

*Theme `icecore` · early-college palaeoclimate / earth science (grade 12) · 15 days, ~46 stops · reviewed 2026-08-21 by reading the full book (`books/icecore.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

A campaign about the difference between a **count** and a **model**, set somewhere that punishes getting it wrong. Its spine is the disagreement with Skarv, 400 km away, and the resolution is not that anybody was careless — it is that the two records were being compared on two different clocks, because a bubble and the ice around it are 458 years apart at this site and a fraction of that at theirs. That is a genuinely subtle finding and the campaign earns it over eleven days.

The best thing here is how consistently it distinguishes *what a proxy measures* from *what people want it to mean*. The isotope stop asks what the record most directly records and the answer is "where the snow condensed, over this region, in the season it fell" — not hemispheric temperature. The dust stop refuses to convert four times the dust into four times the wind. The ash-layer stop fixes the age of the ice "and nothing else on its own". No other campaign is this disciplined about the chain between a thing and a number.

One real problem: two stops give layer thickness at nearly the same depth and disagree by a factor of sixteen, and the campaign's headline conclusion depends on the smaller figure.

**Answerable:** 45/46. The layer-thickness pair (IC-01) leaves a player holding two incompatible pictures of the same core.
**Sense:** Strong across days. The Skarv thread, the core-store failure and the tephra horizon all resolve.
**Level:** Right, and the arithmetic is well chosen — density conversion, a depth–age division, radiative forcing from a log ratio, a decay age.
**Fun:** Good. The place does a lot of work: everything is on a deadline set by an aircraft, and "what has not been measured by then is not measured until the next crew flies in, two years from now."

## Fixed during this review

The brittle-zone depth range had been destroyed by numeral normalisation, in two places in this book and one in the junior edition:

> "Ice between **51200** metres holds bubbles at pressures the surface cannot support"

"500 and 1," had been swallowed. Now reads "between 500 and 1,200 metres". It appeared in a roster bio and in the day-2 SEQUENCE verdict, and it was live in both `icecore` and `icecore_ms`. Repaired, re-imported, both themes green.

## The questions, solved

Verified: 0.32 × 340 ÷ 917 = 0.119 m ice equivalent; 88 ÷ 0.32 = 275 years of firn; 88 × 0.62 ÷ 0.119 = 458 years of gas–ice age difference (and the closing card's "four hundred and fifty-odd years" matches); (1.935 ÷ 2.005 − 1) × 1000 = −34.9 ‰; 5.35 × ln(280/190) = 2.07 W/m²; −8267 × ln(0.55) = 4,941 years. The contamination DIAGNOSIS is settleable and well built — the *blank before* is ordinary and the *blank after* is high, which places the contamination inside the run, and the replicate core rules out the atmosphere. The TRACE on which conclusions survive the flow model being wrong is the right question for this campaign to end on.

## Implemented since this review

- **IC-01, the layer thickness.** The two figures were 16× apart and both were presented as the layer thickness in the same core. The day-11 stop is now explicitly *what simple thinning predicts*, and its answer says the line measures 1.5 mm against the model's 24 — so the discrepancy is the finding rather than a contradiction, and the takeaway says why the counted record and the modelled one end in different places.
- **IC-03** numeral damage, and **IC-04** `dayNoun`.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| IC-01 | CLOSED | Day 3 SWEEP vs day 11 BALLPARK | Two stops describe annual layer thickness in the same core and disagree by 16×. **Day 3's SWEEP** plots "measured annual layer thickness" falling to 3.0 mm at 2,180 m — and the whole stop exists to establish that counting stops there, which is the campaign's headline conclusion. **Day 11's BALLPARK** applies λ(z) = λ₀(H−z)/H with λ₀ = 0.119 m, H = 3,010 m, z = 2,400 m and gets **24.1 mm** — eight times the scanner's 3 mm limit, at a depth 220 m *deeper* than where day 3 said counting became impossible. The same model at 2,180 m gives 32.8 mm. So the model the book teaches on day 11 says the counted record should run far deeper than day 3 concluded. | Make one of them the authority. Cheapest and best for the campaign: keep day 3's measured curve as canonical (its conclusion is load-bearing) and change day 11's stop to *use* that curve rather than Nye — e.g. ask for the thickness at 2,400 m read off the measured profile, with the Nye figure offered as a decoy tile labelled "what simple thinning would predict". That converts the contradiction into the stop's lesson: real thinning near the bed outruns the simple model. Alternatively re-author day 3's response curve to follow Nye, but then the counted record ends near 2,900 m and several days' conclusions move with it. |
| IC-02 | WORTH | The campaign's depth–age scale | Following from IC-01: no single thinning law reconciles the stated figures with the ending. Integrating Nye from the surface gives ~32,600 years at 2,180 m and ~43,000 at 2,470 m, against a closing card that reports "by counting, about nine thousand nine hundred years, and by flow model something under thirty thousand" at 2,470 m. A player is very unlikely to integrate a thinning function, so this is not a play-blocking defect — but the numbers do not form one core. | Once IC-01 is settled, pick the counted depth and the counted age together and let the ending quote them. If the counted record is ~9,900 years, that is roughly the first 700–900 m at this accumulation rate, and the "counting stops" depth should say so. |
| IC-03 | WORTH | ~12 stakes and scenes | Numeral normalisation, the catalogue-wide class: "**11** Skarv samples" and "**4** annual signals" are fine as counts, but "the isotope line can take **4** of them" beside "**11** samples, **1** working day" reads as a telegram, and "**3** abandoned sites" / "**2** kilometres down" / "**1** annual layer" replace words doing grammatical work. | Editorial pass. Cross-campaign §1. Ice Core is moderately affected. |
| IC-04 | WORTH | `themes/icecore/theme.js` | No `dayNoun`, so the plan card prints "Day N". The stakes open "First morning of the season", "Second day", then switch to weekdays ("Wednesday", "Thursday is the aircraft window"). Days 1–2 align with the header by luck; from day 3 the player reads "Day 3" above "Wednesday", and the aircraft window — the campaign's clock — is never expressed in the same unit as the header. | Set `dayNoun: 'Day'` explicitly and make the stakes count days from the aircraft ("Twelve days to the aircraft"), or keep weekdays and use a non-numeric noun. The aircraft deadline is the campaign's best pressure and it deserves to be legible on the plan card. |
| IC-05 | TASTE | Day 2 SEQUENCE, five cards | The brittle-zone lift is a five-card ordering graded as one exact permutation. That is legal and it is the only 5-card SEQUENCE outside Deep Watch's electrical one, where the fifth card earns its place. Here cards 4 and 5 ("carry it to the storage trench and leave it for the relaxation period" / "cut and distribute only after it has stopped cracking") are nearly the same instruction, so the pair is decided by wording rather than by physics. | Merge 4 and 5, or differentiate them: card 4 is about *where* it rests, card 5 about *when* it may be cut. The `why` already makes the distinction; the cards do not. |
| IC-06 | TASTE | ~26 stops | Repeated format boilerplate in `background`. Notable because this campaign's stop-specific backgrounds are excellent — "why the crossing is a depth rather than a year", "why too much is as bad as too little", "what melt does to everything else". | Keep each essay on first use per format. Cross-campaign §2. |

## Day-by-day notes (short)

- **Day 1** — Snow to ice equivalent, why the hole is on the dome (flow, not cold), and a year read off four independent markers. "Where three of the four agree, a year is a year. Where only one does, it is a candidate."
- **Day 2** — The brittle zone, the unplaceable section ("a sample without a depth is a measurement of nothing in particular"), and the contamination DIAGNOSIS. The unplaced-section stop's rule — the uncertainty travels with the sample because the danger is somebody downstream who never hears about it — is the best sentence in the campaign.
- **Day 3** — The borehole-fluid HOLD (a two-sided band whose failure modes converge with depth is a genuinely good use of the format), then the counting-limit SWEEP. IC-01 starts here.
- **Days 4–5** — The melt-layer BELT and the last day of shared-instrument access. "After Thursday the comparison is between two laboratories rather than two cores" is exactly the right stake.
- **Days 6–7** — Isotopes to degrees, the CLOUD on how firmly the cooling can be stated, and the gas–ice age difference. The CHAIN asking which stage *decides* the difference is well posed.
- **Days 8–9** — Dust, the tephra horizon, and a TRIAGE about the one clear day. The ash-layer stop's refusal to let a dated horizon date the gas as well as the ice is the campaign's discipline in miniature.
- **Days 10–11** — Where the record runs out. IC-01's second half sits here, alongside a PROPAGATE stop that is one of only a handful in the catalogue.
- **Days 12–15** — The forcing calculation, the offset that was not climate, the generator failure and its ATTEST, and a close that sorts what survives the flow model.

## Opening and closing

Opening: "None of it can be let above minus twenty. You are the season science lead, which means the climate record this station sends home is the one you signed… The aircraft that takes everybody off the ice arrives in fifteen days." Authority as signature, and a hard deadline. Keep.

Closing: the middle paragraph is the strongest — a night of the core store above minus twenty took the gas measurements from four sections with it, and "a fortnight in which the comparison was argued about on two timescales that could not be compared." It names the resolution as mostly the gas–ice age difference and says the residual was smaller than either group's stated uncertainty, "and the report said so in the hedged sentence rather than the confident one."

## Warm-ups

Present and specific to a plateau camp. No findings.

## What to keep

- The gas–ice age difference as the campaign's answer. It is the right kind of resolution: nobody was wrong, the comparison was.
- Every stop that names what its proxy does *not* measure.
- "A layer counted wrong moves every date below it, in the same direction, for ever."
- The aircraft. A fortnight with a hard end and no second attempt is the best pressure in the catalogue after Blackout's corridor.
