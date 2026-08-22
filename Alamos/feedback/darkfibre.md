# Dark Fibre — play-through review

*Theme `darkfibre` · AP Physics 2, optics and modern (grade 12) · 12 days, 36 stops, 12 DERIVE · reviewed 2026-08-21 by reading the full book (`books/darkfibre.yml`), working every derivation and every board, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

Tied with Yellow Bay for the most physically accurate book in the catalogue, and the best of the three DERIVE campaigns on the one measure that matters for the format: **only 2 of its 47 derivation steps ask a rule question with a single possible answer**, against Slack Water's 15 and Overwind's 21. Whatever Dark Fibre did when authoring its rule vocabulary is the thing the other two need.

Every constant is the real constant, used the way an optical engineer uses it. A 1550 nm photon is **0.80 eV** and the book says eight tenths of an electron volt. The group index is **1.4682**, so light in the glass runs at 2.042 × 10⁸ m/s — and the round trip to 84.6 km is 828 µs, which the day-2 derivation produces. The Fresnel reflection at a glass–air step is ((1.468 − 1)/(1.468 + 1))² = **3.6%**, and day 3 is called "Three and a half per cent, straight back". A germanium or InGaAs detector near 1550 nm has a responsivity of about **one amp a watt**, and day 6's title is "One amp a watt, near enough". Averaging 64 times as many OTDR traces buys 5 log₁₀ 64 = **9.0 dB** of reach, and the day-6 key is *nine decibels of reach, for sixty-four times the time*. An Ir-192 radiography source falls to a tenth of its strength in 73.8 × log₂ 10 = **245 days**, and day 9's derivation gives 243. A quarter-wave antireflection coating at 1550 nm with n ≈ 1.21 is **320 nm** thick, which is day 8's title.

I have not seen a games book get this many independent physical constants right, and the pedagogical value is that the arithmetic is always a subtraction or a division rather than a lookup.

The plot is the best of the three. Sarraf has a trace putting the fault within a few metres; Okonkwo laid the cable with slack coiled into it and says the instrument measures along the glass while the ship searches the seabed. Both are right, and the resolution is a stack of three corrections **all pointing the same way**: the pulse travels at the group index and not the core index, there is more fibre than cable, and there is more cable than route. 1.7 kilometres of error, none of it anybody's mistake. And the second half is better still — **the loss was equal at both wavelengths, which no bend or crush can be**, so the fibre was never damaged; a pump had aged, and switching repeater 6 to its spare returned 3.6 of the 4.1 dB.

**Answerable:** 36/36.
**Sense:** Excellent. Two findings, both derived, and the ship goes to the right kilometre for the right object.
**Level:** Right for AP Physics 2's optics and modern half, and it closes the gap the submarine edition could only retrofit at four concepts.
**Fun:** High. Forty thousand a day of charter and a ship that digs where this station says is the sharpest cost pressure in the set.

## The questions, solved

Three boards, all verified: 2.998 × 10⁸ ÷ 1.4682 = 2.042 × 10⁸ m/s; 7.9 × 10⁻⁶ ÷ 1.28 × 10⁻¹⁹ ÷ 10¹⁰ = 6,172 photons a bit (7.9 µW at 10 Gbit/s, with the photon energy right); and 2.0 × √(640 ÷ 7.5) = 18.5 m for the radiography barrier by inverse square.

The twelve derivations:

| Day | Derivation | Physics 2 topic |
| --- | --- | --- |
| 1 | Seven degrees of everything | the acceptance cone, from Snell's law |
| 2 | 828 microseconds | group velocity and round-trip delay |
| 3 | 3.5% straight back | Fresnel reflection at an index step |
| 4 | 21.8 | the span loss budget in decibels |
| 5 | 0.8 electron volts | photon energy, E = hc/λ |
| 6 | One amp a watt | responsivity, one electron per photon |
| 7 | Seven per cent, and no more | attenuation through 40 mm of steel |
| 8 | 320 nanometres | quarter-wave antireflection coating |
| 9 | 243 days | radioactive decay to a tenth |
| 10 | 82.9 | the three corrections between a distance and a place |
| 11 | 74 milliwatts, at most | the ceiling on what a pump can give |
| 12 | Four decibels, accounted for | the whole budget, closed |

Day 10 is the campaign's hinge and day 11 is its second half. Day 11's derivation is the one I would show somebody as the argument for this format: a ceiling on what a pump can *ever* give, used to state a decline that nobody could measure from shore. That is a bound doing work, which is the same move Slack Water's day 10 makes in a different subject.

Two CHOICE stops worth naming. **"Current, and not light"** — *that the pump laser is being driven, and nothing about its output* — is the defect that cost three weeks, stated on day 3 and cashed on day 11, and it is the same class of finding as Yellow Bay's certificate with no field for type. And **"Bright and useless"** — *each arrival carries too little energy to free a charge* — is the photoelectric threshold as a practical engineering fact rather than a historical experiment.

## Implemented since this review

- **DF-03** `dayNoun`.
- **DF-04 stands as written and is now measured by a gate**: Dark Fibre is 2 of 47, the best of the four `askRule` campaigns, and `deriveRules.mjs` prints the figure for each.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| DF-01 | WITHDRAWN | Day 12 SCIENCETANK, "A hundred points before the ship" | **This finding was wrong and is withdrawn.** I reported no `evidence` on the tank, having grepped for an `evidence:` key. There is no such key — the contract puts the evidence in `guide`, and this stop's guide carries four facts, one per proposal: a pump output figure for repeater 6 that is four years old and was never re-measured; a slack figure that is an average over a whole route; an instrument whose index setting was wrong for eleven years and has now been corrected; and eleven mechanical joints on the shore end as old as the cable. Then the closing line that makes it a decision: "the traffic is on a diverse route with no spare of its own." | Nothing. This is one of the better-argued tank stops in the set. |
| DF-02 | WORTH | Authored `background`, 24 of 36 stops | Twelve of thirty-six carry authored background. Same shape as Slack Water and Overwind. Highest cost here on days 5, 8 and 9, where the *modern physics* is doing the work: a photon energy, a coating that cancels by interference, and a source that decays. Each is one paragraph from being memorable and the paragraph is not there. | One paragraph per DERIVE. Day 8's is the one to write first: two reflections a quarter-wave apart arrive out of step, so the coating cancels rather than blocks — which is the same interference the day-7 CHOICE is about, and nothing on either card says so. |
| DF-03 | WORTH | `themes/darkfibre/theme.js` | No `dayNoun`, in a 12-day campaign whose clock is a ship on charter **from the thirteenth at forty thousand a day**. That is the most legible deadline in the catalogue and the plan card does not carry it. Cross-campaign §4. | Count down to the thirteenth. Every other campaign's version of this finding is worth one clause; this one is worth a number in pounds. |
| DF-04 | WORTH | `askRule: true` — recorded as the good case | Dark Fibre's rule vocabulary is the model: **2 of 47 steps have a single distinct rule** (Snell's law, the small-angle condition, integration of an exponential attenuation, the choice of index, conservation of energy at a detector). The two that fail are "Put the numbers in" (`substitution of the stated values`) and "Convert it into electron volts" (`conversion of units`) — both genuinely one-licence steps that should simply not ask. | Nothing to fix beyond dropping the rule question on those two steps. **Record this book as the reference when fixing OW-01 and SW-05**: the difference between 4% and 44% is that Dark Fibre's rules are theorems and Overwind's are, 79 times out of 192, descriptions of typing. |
| DF-05 | TASTE | The ending's third unfinished item | *"nobody has measured this rope of glass — the stiffness of the argument, the index a pulse really travels at on this cable, is still the maker's figure."* The point is right and the metaphor is Overwind's: that campaign's ending says "the rope's stiffness is still the maker's modulus rather than a measurement of this rope", and it fits there because a hoisting rope really does have a stiffness. A fibre's group index is not a stiffness, and "the stiffness of the argument" is a phrase that does not resolve. | Say it plainly: "and nobody has measured the index on *this* cable — the number every distance in the file is divided by is still the maker's figure." Same fact, and it names the thing that matters, which is that one unmeasured constant scales every position the station has ever reported. |

Notable: **zero numeral damage** in the whole book, and **no rows in any debt file**.

## Day-by-day notes (short)

- **Day 1** — What stays in the glass. The acceptance cone on the first morning, then the two CHOICE stops that set up the fortnight: something lost 4.1 dB at a particular delay, and a fusion splice removes the index step so nothing reflects at the gap.
- **Days 2–3** — A delay and what it is worth; what comes straight back. Group velocity, Fresnel reflection, a SWEEP on a window and the peak beside it, and the pump-current CHOICE that turns out to be the whole story.
- **Days 4–6** — What the span can afford; how much is one photon; one electron for one photon. The decibel budget, E = hc/λ, and responsivity. The OTDR-averaging CHOICE (*nine decibels of reach, for sixty-four times the time*) is the best statement of a signal-averaging trade-off here.
- **Days 7–9** — Through forty millimetres of steel; a coating that cancels; a tenth of what it was. The radiography thread is a genuine second subject and it earns its place: the housing on the deck has to be radiographed, the source has decayed, and the exposure and the barrier distance both follow.
- **Day 10** — The kilometre the trace is out by. **The campaign.** Three corrections, all the same sign, and a VERIFY beside it on whether the loss is three and a half decibels or nothing.
- **Days 11–12** — What the pump could ever give, and what the ship is told. The DIAGNOSIS key — *the pump in repeater 6 has aged* — is reached rather than announced, and the final CASEBOOK on one nucleus and one line closes the modern half.

## Opening and closing

Opening: "An undersea cable runs out from Pellow Head, and nineteen days ago the light coming back dropped away… A repair ship is on charter from the thirteenth at forty thousand a day, and it digs where this station says." All four beats, and the cost is a rate rather than a total, which is the sharper form.

Closing: three paragraphs. The first is the best summary of a two-part finding in the set — the position was out for three reasons that all pointed the same way, *and* the loss was equal at both wavelengths, which no bend or crush can be. The second's unfinished list is specific (see DF-05 for the one clause to reword). The third is addressed to the player and its last line is the right one: "A ship went to the right kilometre for the right object."

## Warm-ups

All seven authored and specific to a landing station in the dunes. No findings.

## What to keep

- Every constant. 0.80 eV, 1.4682, 3.6%, one amp a watt, 9 dB for 64×, 73.8 days, 320 nm.
- Three corrections all pointing the same way, and nobody at fault.
- "The loss was equal at both wavelengths, which no bend or crush can be."
- The pump current telemetered and its optical output not. A measurement whose *absence* is the defect.
- The rule vocabulary. This is the book that shows what `askRule: true` is supposed to feel like.
