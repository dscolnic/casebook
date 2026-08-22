# Ghost Light — play-through review

*Theme `ghostlight` · AP Precalculus (grade 12) · 15 days, 45 stops · reviewed 2026-08-21 by reading the full book (`books/ghostlight.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The cleanest campaign in the catalogue. Fifteen days, forty-five stops, three stops a day exactly, sixteen estimate boards that all reproduce, a `guide` and an authored `background` on every stop, zero collapsed boilerplate paragraphs, zero rows in any debt file, and effectively zero numeral damage. I could not find a defect worth writing down. What follows is mostly a record of what it does well, because the useful thing about Ghost Light is that it is the answer to several questions the other campaigns raise.

The subject is AP Precalculus, which is the hardest course in this set to give a *reason* — it is a toolkit, not a story. Ghost Light's solution is the best available: a theatre is a room where every one of those tools is already load-bearing. A seat is a sightline, which is two lines meeting. A lantern is an angle, which is an arctangent. A fader is a logarithm because loudness is. A flying cue is two rates converging. A price on a seat map is inverse variation. A grid load is a resolved vector. A rake is an arithmetic sequence and a dimmer curve is a geometric one, and the campaign's second day is *literally* about telling the two apart — sixteen pieces of a rake, each a little shorter, matching for the first few and half a metre out by the top.

**It never once says "this is like a real-world application of…"** Every stop is a thing somebody in the building actually needs, and the arithmetic is the way to get it. That is the whole difficulty of teaching precalculus and Ghost Light simply does not have the problem.

**Answerable:** 45/45.
**Sense:** Excellent. Every thread lands, including the roof leak, which is deliberately left unfixed.
**Level:** Right for AP Precalculus, and the trigonometry is more physical than the course usually manages.
**Fun:** High and unusual — the pleasure is a building coming back to life, and the props layer shows it.

## The questions, solved

All sixteen boards verified:

| Stop | Arithmetic | Topic |
| --- | --- | --- |
| Off the flat part | (188 − 41) ÷ 2 = 73.5 seats a week | average rate of change |
| An arc, a radius and an angle | 4.2 × 1.15 = 4.83 m | s = rθ, radians |
| Four stages, each times something | 0.004 × 3.2⁴ = 0.42 V | geometric growth |
| Six metres up, nine metres out | arctan(6.2 ÷ 9.4) = 33.4° | inverse trig |
| Tall, often, centred, and starting where | (0.62 − 0.18) ÷ 2 = 0.22 V on a 0.40 midline | sinusoid amplitude |
| The same fraction each week | 41 × 0.70 = 28.7 tickets | exponential decay |
| From the centre out | 7.4 × sin 38° = 4.56 m | resolving a bearing |
| Not half each | 180 ÷ (2 cos 22°) = 97.1 kg per line | vector components |
| Ten times the log of it | 10 log₁₀(3.2 × 10⁸) = 85.1 dB | logarithms |
| Four pi d squared | 9600 ÷ (4π × 11.3²) = 6.0 lux | inverse square |
| The one that leans furthest | 260 ÷ (2 cos 41°) = 172 kg per line | vector components |
| What the curve says the twelve are worth | 12 × £205 = £2,460 | inverse variation |
| Two angles, an hour | arctan(6.2 ÷ 8.2) = 37.1° | inverse trig |
| When the two rates meet | 4.4 ÷ 0.73 = 6.0 s | linear systems |
| The room is different now | 10 log₁₀(0.072 ÷ 0.22) = −4.8 dB | log ratio |

Three panels I want to record.

**Day 14's ALLOCATE is the best-tuned pool in the repo.** Four hours = 240 minutes. The company notes are `protected` at 30 ("forty-one people cannot open on notes they have not heard"), and the exit walk is `required` at 40 because the licence needs a figure under 150 seconds. That leaves **170 minutes against four jobs costing 60, 55, 50 and 45** — so the player funds exactly three of four, and every one of the four ways is a defensible plan with a different thing left undone. Compare Red Sand's storm ALLOCATE, where the forced items consume 390 of 430 and the correct play is to commit without choosing anything. The difference is arithmetic, and it is the difference between a decision and a form.

**Day 7's "Where it stops being one" is the most valuable single stop on this syllabus.** The key is *"the curve is right and the extrapolation is not"* — a fitted model that describes the data it was fitted to and says nothing about the region beyond it. That is the one thing a precalculus student who can do all the algebra still routinely gets wrong, and it is a CHOICE stop on day 7 rather than a caution in a verdict.

**Day 6's "What cancels at the cloth and not at the grid"** — the vertical components cancel where the lines meet and the horizontal ones load the ironwork in tension — is the best physical use of vector resolution here, and it is the reason day 9's grid BALANCE means anything.

## Implemented since this review

- **GL-01**, the HUNT item name.
- **GL-02** `dayNoun`.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

No FIX-level defects. No rows in `curriculum-debt`, `concept-debt`, `equation-debt`, `format-debt`, `daycalls-debt` or `warmup-debt`. Every day carries exactly three stops. One numeral-normalisation occurrence in the whole book — "a sequence with n terms has n − 1 steps in it" — which is correct mathematics.

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| GL-01 | WORTH | `warmups.hunt` | No `item: { name, plural }`, so the run's HUD counts generic items rather than naming what is being found. Three books are missing this field: `carrying`, `changeover` and `ghostlight`. | One line. Whatever the six items are in Ghost Light's HUNT story, name them so the HUD reads "0 of 6". |
| GL-02 | WORTH | `themes/ghostlight/theme.js` | No `dayNoun`. The plan card prints "Day N" while the campaign's clock is *the fourteenth* — an opening night, named in the last mission's own title. This is the campaign where a `dayNoun` would pay most, because the countdown to a fixed date is the entire pressure. | `dayNoun: 'Day'` at minimum; better, have the stakes count down to the fourteenth so the plan card and the prose agree. Same finding as CC-04, WM-03, IC-04 — cross-campaign §4. |
| GL-03 | WORTH | Day 10 "What the curve says the twelve are worth" | The solution reads *"12 seats at £205 each is £2,460 — which is the fitted constant, because price times seats is constant."* The arithmetic is right and the sentence is doing two things at once: it computes a revenue and it asserts an inverse-variation model, and a student who does not already know what "the fitted constant" refers to cannot tell which claim the £2,460 supports. | Split it. "Twelve seats at £205 is £2,460 of revenue. And because the fitted model has price × seats constant, that product is the same £2,460 at every point on the curve — which is why the twelve are worth the same whatever price band they sit in." Two sentences, and the second is the actual lesson. |
| GL-04 | TASTE | Day 15 "The fourteenth" | The last day is a PROTOCOL, a CHOICE and a SEQUENCE — no arithmetic on opening day, in a campaign whose method is arithmetic. Unlike Carrying's equivalent (CC-06) this reads as deliberate: the numbers are finished, the file is closed, and the last SEQUENCE is titled "Four numbers that used to be opinions", which is the right closing beat. | Nothing. Recording it only because Carrying has the same shape and there it is a weakness — the difference is that Ghost Light's last day *says* the arithmetic is over. |
| GL-05 | TASTE | The roof | The ending's second paragraph is one sentence: "What is unfinished is the roof. The rain that came through it on the ninth is still coming through it, and the run pays for a scaffold in March if the houses hold." That is the shortest unfinished-business paragraph in the set and among the best. But the rain on the ninth is not in any day-9 stake I can find. | Optional: put the rain in day 9's stake. It costs one clause and turns the ending's best line into a callback. |

## Day-by-day notes (short)

- **Day 1** — Eleven years of dust and nine hundred seats. Average rate of change, a sightline as two lines meeting, and arc length. Three tools, three theatre problems, no analogies.
- **Day 2** — An even step, and a doubling one. **The best day in the campaign**: sixteen pieces of a rake that match an arithmetic model for the first few and are half a metre out by the top. Arithmetic against geometric, decided by a measurement rather than by a definition.
- **Days 3–4** — What the lantern is pointing at, and four numbers describing a wave. The second differences being nearly constant is how a quadratic is *recognised*, which is the right way round.
- **Day 5** — Adding what multiplies. A BALANCE stop on why a fader is a logarithm. Best possible motivation for logs on this syllabus.
- **Days 6–8** — How often how loud how hard, the room as the instrument, and what arrives at the performer. Decibels, reverberation as a fixed fraction each half second, and inverse square at 4πd². The three-inch rail stop — "at nearly two degrees per three inches from 1.1 metres back" — is a lovely small piece of trigonometry with a real consequence.
- **Day 9** — Three and a half tonnes, written down. Two vector-resolution stops and a grid BALANCE. Osei's argument from day 1 gets settled here, with numbers.
- **Day 10** — The seat map goes to print at four. The twelve seats that cannot see, and the resolution — *move the mark 1.2 metres downstage and keep all twelve on sale* — which is the best single decision in the campaign: not a withdrawal, not a discount, a blocking change.
- **Days 11–13** — Three channels and a matrix (order matters for the equaliser and the compressor and not for the others, which is function composition stated as a mixing problem), two equations one stage, and the rig in the coordinates it was drawn in. The bearings-without-a-reference CHOICE is the same lesson as Yellow Bay's TRACE in a different currency.
- **Days 14–15** — Everything at once with one rehearsal left, and the fourteenth.

## Opening and closing

Opening: "The Ellery is a theatre shut for eleven years, and it opens in a fortnight. The council will not let an audience in without a safety licence, and the inspection is on opening night… Forty-one people are on the payroll for a run that only exists if the doors open." All four beats, both sides of the argument, and a consequence in wages.

Closing: three paragraphs. The first is specific in the way this document keeps asking for — 861 of 900 seats, three and a half tonnes on a load plot that is on a wall rather than in somebody's head, and a walked clearance of 148 seconds, seven better than the file estimated and thirteen better than the first walk. The second is the roof, in one sentence. The third is addressed to the player and its best clause is "twelve seats that could not see were found in a rehearsal instead of by an audience." Keep all of it.

## Warm-ups

All seven authored and specific to a dark theatre. One defect, GL-01.

## What to keep

- Everything. This is the campaign to hand somebody as the example of what the others should look like.
- Day 2. Arithmetic against geometric, settled by sixteen measured pieces of a rake.
- The day-14 ALLOCATE's arithmetic. 240 minutes, 70 forced, 170 left, four jobs at 60/55/50/45.
- "The curve is right and the extrapolation is not."
- "Four numbers that used to be opinions."
