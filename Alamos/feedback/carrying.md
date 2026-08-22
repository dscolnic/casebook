# Carrying Capacity — play-through review

*Theme `carrying` · AP Environmental Science (grade 12) · 15 days, 45 stops · reviewed 2026-08-21 by reading the full book (`books/carrying.yml`), solving every question, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

The campaign whose **scale** is best matched to its subject. AP Environmental Science is a course about budgets — what comes in, what leaves, what stays — and Vellan Island is a place where every budget is small enough to be counted by one person and closed by hand. Ninety-one people. One ferry a day. Six standpipes. Nineteen children on the school register. Eleven months of fresh water underground. Nothing here is a national statistic; everything is a number somebody wrote in a book, and the campaign's method is to go and read the book.

The framing is the best-balanced argument in the set after Midway's. Calloway has the arithmetic that keeps the school open — nineteen children, and the fees a second daily sailing brings. Berhane has the arithmetic that says salt water is already reaching the borehole. **Neither is arguing about the environment against the economy; both are arguing about whether there will be an island.** That is a genuinely more sophisticated framing than the one this subject usually gets, and the campaign holds it for fifteen days without picking a side until the player does.

Fifteen estimate boards, and I verified every one from first principles: percentage change with the correct denominator, groundwater recharge from rainfall and a recharge fraction, the rule-of-70 doubling time, trophic efficiency compounded three times, the species–area relationship with z = 0.25, aquifer residence time, a nutrient load in kg/day and kg/yr, maximum sustainable yield as rK/4, mg/L to µg/L to ppm, a dose in mg per kg per day, methane at 28 CO₂e, a capacity factor, a payback period, diesel at 2.63 kg CO₂ per litre, and a population growth rate from four flows. Every one reproduces and every conversion factor is the real one.

**One serious defect, fixed during this review: the ending card was the scaffold's placeholder text, and it was shipping.**

**Answerable:** 45/45.
**Sense:** Excellent, and the numbers interlock better than in any other campaign here — see below.
**Level:** Right for APES, and the arithmetic is pitched exactly where the course pitches it.
**Fun:** Good, in the quietest register in the set. There is no disaster; the tension is a council vote in a fortnight and a borehole that is already going salt.

## The numbers interlock

Worth recording separately, because it is the campaign's best quiet achievement. Day 1 establishes that the west ground landed 214 tonnes five years ago and 168 last season — a 21.5% fall. Day 5 then has the player compute maximum sustainable yield as rK/4 = 0.42 × 1600 ÷ 4 = **168 tonnes a year**. Last season's landing is exactly the theoretical maximum, and nothing on the card points at it. A player who notices has discovered the whole fishery problem four days early, by arithmetic, from two stops that never mention each other.

The same trick runs through the water: day 2 computes recharge at 294,000 m³ a year, day 4 divides the 2.6 × 10⁶ m³ store by it to get an 8.8-year residence time, and the HUNT warm-up notes the distribution main is losing about a fifth of what the borehole lifts — so a fifth of the recharge is going into the ground before anybody drinks it. Three separate stops, one conclusion, never stated.

## Implemented since this review

- **CC-01**, the ending (written during the review).
- **CC-03**, the HUNT item name.
- **CC-04** `dayNoun`.
- **And the gate**: `checkStory` now fails any card sharing ten words with `themes/_template/theme.js`. It passed this one before, because the placeholder quotes an example of the thing the ending check looks for.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| CC-01 | FIXED | `themes/carrying/theme.js`, `ending:` | **The ending card is the scaffold's own instructions to the author, and it ships to the player.** Verbatim: *"Say how it came out, in the same voice: what held, what it cost, and what the next crew inherits."* / *"Then say what the player did, and say it plainly. Name the two or three calls that were theirs… you held the corridor, you brought them up, you are the reason it reads that way."* A player who finishes fifteen days closes the campaign on a specification for the paragraph they were supposed to get, including a reference to holding a corridor, which is Blackout's fiction. I swept all 42 registered themes: **carrying is the only one**, and `_template` is the other match, correctly. | **Done.** Written to `themes/carrying/theme.js`; `npm run check carrying` green. The three paragraphs are: The material is all in the book already and the shape is fixed by nine other campaigns: **(1)** how the vote came out and what the licence now says — the day-15 CHOICE keys it as *support the second sailing, with abstraction capped at recharge and metered at the berth*, so the ending is that the sailing was approved with a cap; **(2)** the cost and the unfinished list — the fifth of lifted water still lost between the borehole and the six standpipes, the tip still sitting up-catchment of the borehole, the west ground landing at exactly its MSY with no margin, and eleven years of one man's reef counts still the only baseline; **(3)** the player's own calls — you capped the abstraction at what the rain actually puts back, you priced the diesel plant off the July peak half hour rather than the annual average, and you found the fifth of the water that never arrives. |
| CC-02 | CLOSED | `checkStory` | The gate **passed this campaign**. It reports "15/15 cards name the cast, 15/15 say when, 15/15 say what you decide" and a single note about `dayNoun`. The rule that a closing paragraph must be addressed to the player is satisfied by the placeholder, because the placeholder contains the words "you held the corridor, you brought them up, you are the reason it reads that way" — the instruction *quotes an example* of the thing being checked for. This is CLAUDE.md's most expensive rule arriving through a new door: a measurement that produces a plausible answer. | One assertion in `checkStory`: fail an `opening` or `ending` paragraph that matches the scaffold's own text. The literal strings are in `themes/_template/theme.js`, so the check is "no shipped card shares a sentence with the template", which is cheap and cannot false-positive on real prose. Then add the case that would otherwise invert silently — a hand-written ending containing the phrase "say what the player did" must still pass — and verify by putting the placeholder back and watching only carrying fail. |
| CC-03 | WORTH | `warmups.hunt` | The HUNT card is *"Six standpipes, and one of them is the leak"* and the site has exactly six areas, so the count is right. But the book authors no `item: { name, plural }`, so the run's HUD counts generic items rather than reading "0 of 6 standpipes" — and a warm-up whose whole story is the standpipes shows the player a counter that does not name them. Three books are missing this field: `carrying`, `changeover` and `ghostlight`. | `item: { name: standpipe, plural: standpipes }`. One line, and the same for the other two. |
| CC-04 | WORTH | `themes/carrying/theme.js` | No `dayNoun`, so the plan card prints "Day N" while the campaign's clock is a council vote in a fortnight. `checkStory` notes it and nothing fails. Vellan's stakes are unusually good about time — a fortnight, a spring meeting, twice a year, eleven years — and the plan card is the one surface that does not participate. | Either set `dayNoun` explicitly or have the stakes count down to the vote. This is the same finding as WM-03 and IC-04; see cross-campaign §4. |
| CC-05 | WORTH | Day 1 and day 5 | The 168-tonne coincidence described above is the best thing in the campaign and **nothing says it**. Day 5's MSY stop computes 168 and its verdict does not mention that this is last season's actual landing, so the finding is available only to a player who remembers a number from four days earlier. | One sentence in day 5's `why`: "168 tonnes is also what the west ground landed last season, which means the fishery is being worked at exactly its theoretical maximum with no margin for a bad year." That converts a hidden elegance into the campaign's central fishery result, and it costs nothing — the arithmetic is already on both cards. |
| CC-06 | TASTE | Day 15 "What the island can carry" | The last day's three stops are a CHOICE, a PROTOCOL and a SEQUENCE — no arithmetic, and the campaign's whole method is arithmetic. It reads as a paperwork day after fourteen days of measurement. | Optional. The day-15 CHOICE ("support it, with abstraction capped at recharge and metered at the berth") would be stronger as a BALLPARK computing what the cap actually is in cubic metres per head per day, which is the number the licence has to contain. That is 294,000 ÷ 91 ÷ 365 = 8.9 m³ per person per day — a number a player would remember, and the one the council is actually voting on. |

Notable for its absence: **no debt rows in any file** — `curriculum-debt`, `concept-debt`, `equation-debt`, `format-debt`, `daycalls-debt` and `warmup-debt` are all clean for `carrying`. And **almost no numeral damage**: two occurrences in the whole book. Along with Sightline and Yellow Bay, this is a book whose house style spells numbers out and is therefore immune.

Also worth recording: **`readbook` collapsed zero repeated background paragraphs.** All 45 stops carry a `guide` and all 45 carry an authored `background`, and none of it is boilerplate. Carrying, Yellow Bay and Sightline are the three books where the card sweep is finished, and they are the three that read best.

## Day-by-day notes (short)

- **Day 1** — Ninety-one people and one of everything. The percentage-change stop's `background` is the clearest statement of why the denominator is the earlier value anywhere here, and it is followed by the right second thought: "twenty-one per cent of 214 tonnes is 46 tonnes, and 46 tonnes is either a crisis or a rounding error."
- **Day 2** — One deposit, four standing orders. Recharge, doubling time, and per-head visitor-nights against resident days in the same month — which is how a seasonal population is actually counted and almost never how it is quoted.
- **Day 3** — The thin end of the food web. Trophic efficiency compounded three times, and the species–area relationship. Half the ground keeps five sixths of the species, which is the correct and counter-intuitive answer.
- **Day 4** — Salt in the borehole. Residence time, a nutrient load from a small up-catchment pipe, and a PROTOCOL matching the pipe to the field.
- **Day 5** — What the west ground can replace. MSY, a stocking limit, and the r-versus-K life-history CHOICE: *"the same tonnage is a far heavier harvest on the slow-maturing one."*
- **Days 6–8** — The rule and the money behind it, what a kilowatt-hour costs, and what leaks out of the hole. The July peak half hour sizing the diesel plant is a real and unglamorous piece of engineering economics, and the campaign is right that it is the number that matters.
- **Day 9** — What is put on the ground. A TRIGGER on forty tonnes twice, and an ALLOCATE on what the tip gets back.
- **Days 10–12** — A warmer sourer sea, what the diesel buys, and the gearbox. The SWEEP on two degrees in August is a good use of the format, and the capacity factor and payback pair is the best small piece of energy arithmetic in the repo.
- **Days 13–14** — What came in on the boat, and nineteen on the register. The invasive-species CHOICE — four conditions and it has all of them, so only food and space limit it — is correctly built, and the demography CHOICE about *shape not total* is the most sophisticated question on this syllabus.
- **Day 15** — What the island can carry. See CC-06.

## Opening and closing

Opening: "Vellan is a low island with ninety-one people on it, one ferry a day, and eleven months of fresh water left underground… Ninety-one people live on what those two can be got to agree." All four beats, and the last clause is the best closing line of any opening card here.

Closing: written during this review (CC-01). Three paragraphs — the vote carried five to four with abstraction capped at recharge; the cost and the unfinished list (a fifth of the lifted water still lost between the borehole and the six standpipes, the tip still up-catchment of the borehole since 1974, the west ground worked at exactly the tonnage the model says it can replace so one bad year is the whole margin, and eleven springs of one man counting the same reef still the only baseline); and the player's own three calls. Read it and change the tone if it is not the voice you want — the facts are all from the book, the phrasing is mine.

## Warm-ups

All eight authored — this is a two-tier site, so it carries `trial-far` as well — and they are the best-written set in the repo. Three of them are load-bearing rather than decorative: the far lap opens the tip, the hill and the reef station *and signs out the truck*, which is the tier rule doing exactly what it was designed to do; the HUNT is the fifth of the island's water that never arrives, which is a bigger number than the ferry argument; and the CANVASS asks nine graziers one question each because the council paper needs to say whether they would accept an inspected limit and the grazing officer will not put words in their mouths. One defect, CC-03.

## What to keep

- The scale. Ninety-one people is small enough that every number has a name attached, and the campaign never reaches for a national statistic.
- Calloway and Berhane, both arguing for the island's survival from opposite arithmetic.
- The 168-tonne coincidence — and say it out loud (CC-05).
- Every real conversion factor: 28 for methane, 2.63 kg per litre of diesel, z = 0.25, 70 for the doubling time.
- "A figure you asked for is worth three you found in a file."
