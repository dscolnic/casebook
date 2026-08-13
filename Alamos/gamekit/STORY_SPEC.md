# What a new game needs before it is a game

> One of the phases of `NEW_GAME.md`, which is the whole build in order. This
> file is the campaign-as-a-story part of the writing bar.

Every rule below was bought with a defect that shipped, in prose that read
perfectly well. Most of them are checked automatically:

```sh
cd gamekit
node engine/dev/checkStory.mjs <theme>   # or just: npm run check
```

`checkStory.mjs` reads all fifteen cards against each other and against the
lessons under them, because none of these failures is visible in one card.

---

## 1. The campaign has one argument, and both sides win

Not a theme — an argument, between two named people who want different things,
that recurs and is settled differently at different times.

| Game | The argument | Where each side is right |
| --- | --- | --- |
| Bring Them Home | Whitaker: act on the numbers you have · Carter: hold for one measurement outside the chain | Whitaker on shift 3, Carter on shift 14 |
| Deep Watch | Vance: the mission · Whitfield: the boat and the people in it | Vance in the narrows, Whitfield on the compound casualty |
| Planetary Defense | Rossi: no number I cannot defend · Ellery: two counties need telling today | Ellery on phase 4, Rossi on phase 14 |
| Riverton | Reyes: reopen the intake · Nakamura: defend the number | Reyes on day 6, Nakamura on day 45 |
| Outbreak | Morales: the population · Ortiz: the patient in front of her | Ortiz on stage 7, Morales on stage 8 |
| Project Y | Groves: the schedule · Bethe: what can be trusted on paper | Groves in autumn 1944, Bethe in March 1945 |
| Hospital Heroes | *(none — see below)* | |

**If one side is always right, the player learns a slogan.** "Always wait for
more data" is not a lesson, it is a superstition. Give each side a day.

A second axis helps and is cheaper: Shah's amps against Brooks's warmth and
air; Rask's quiet against Haruki's plant; Okonjo's identification against
Osei's treatment schedule.

**Below about grade 4, do not do this.** Hospital Heroes instead has one nurse
present for all fifteen shifts whose *relationship to the player* changes: she
tells you what to look at, then asks what you saw, and on the last shift asks
you first and listens. Same function, one character.

## 2. Somebody is in every card

Rule: **at least 80% of cards name somebody from the roster.** Enforced.

Before this pass there were 74 written cast members across five games and the
day cards named two of them, both by accident. Meanwhile the rosters already
carried methodological positions — Carter distrusting instruments that agree
because they share a source is *literally* the answer to Bring Them Home's
shift 14, and she was not in that card.

So: write the roster first, or at least write down what each lead believes,
then let the cards use it. A person in a card must want something, not merely
be present.

**Recurring people beat new names.** A patient who comes back (Ben's ankle in
shift 1, his wrist in shift 6) is worth more than two patients.

## 3. Every card says when it is happening

Rule: **at least 80% of cards carry a time marker in their first two
sentences.** Enforced.

This is the failure that produced the most confusion in play. Planetary Defense
had one card saying the object was "found eleven days before its closest
approach" and another, three cards later, saying "the encounter is eight years
out". Both were true. Neither was on the page, so the game read as though an
asteroid were arriving next week and in a decade at once.

**Write the timeline down before the cards.** Then check the content against
it: Bring Them Home's own lessons said the vehicle had been powered down two
days and the shield cold for four, which is a five-day return being told as
fifteen days.

## 4. The mission counter is called what the game calls it

`dayNoun` in the manifest. The engine's model is one mission = one working day
with a countdown budgeted from the route, and that model does not change — only
the label does.

```js
dayNoun: 'Shift',   // Bring Them Home, Hospital Heroes
dayNoun: 'Watch',   // Deep Watch
dayNoun: 'Phase',   // Planetary Defense — eight years in fifteen sittings
dayNoun: 'Stage',   // Outbreak, Project Y
// omitted -> 'Day' — right only when a mission really is one day
```

It reaches the plan card title, the continuity line, the turn-in button
("Finish this watch and move on" rather than "Go to sleep"), the day-over card
and the campaign log.

## 5. The card briefs; it does not hint

Four beats, in this order:

1. **What has happened**, concretely, with the real objects and people in it.
2. **What you are being asked to decide today** — literally "This shift you
   decide…". Enforced: every card must have that clause.
3. **What you need to understand to decide it.** Each idea explained by what it
   *does*. A term appears only with its gloss attached in the same breath: "a
   chromatogram — a chart with one peak for each thing it managed to separate
   out"; "stoichiometry, which is really just bookkeeping".
4. **What it costs**, in people.

Length: **130–160 words** (90–110 at grade 2–4). Enforced at 90 (70 for young
audiences) and noted over 200. Being brief is what made the first version
opaque, not what made it clear.

**Say what happens, never that something happens.** Two sentences that failed
this and had to be rewritten:

> "A loop like that gives no warning in proportion to what it is about to do."

— an abstraction about warning. What is true is: *it creeps for an hour and then
goes in minutes; the early rise is small, and by the time it is large there is
no time left to cool the vessel.*

> "The cure this city is counting on could become the worst hazard on the site."

— never says what happens. What happens is: *treatment gathers a spill spread
thin across a yard into a single tank, and a tank that runs away lifts its vent
or splits.*

If a sentence cannot be checked by a reader, it is not saying anything.

## 6. The card must not answer the day's own questions

Enforced: the checker compares each card against every `correctChoice`,
`answer` and `solution` in that day's stops.

Riverton's day 4 card originally said "the lab whose result everybody prefers
ran a solvent that would produce that exact peak", and the answer to that day's
Diagnosis is *the 3.1-minute peak is laboratory contamination*. The player read
the answer on the plan card and then "got it right".

**Every twist is the question a day opens with, never its answer.**

## 7. Reading level is measured against the declared audience

`audience.grade` in the manifest. Enforced: a card two grades over fails.
Current means — Hospital 2.4, Outbreak 7.2, Riverton 7.3, Bring Them Home 7.4,
Deep Watch 7.5, Planetary Defense 8.1, Project Y 8.5.

The lever is **sentence length**, because subject vocabulary cannot be swapped
out: "spontaneous fission" is the word. Project Y came from 10.6 to 8.5 by
splitting twenty-one sentences in two and changing nothing else.

## 8. The stakes match the title

Planetary Defense was authored around a 100-metre object — 3 × 10¹⁷ J, about
seventy-five megatons, whose worst case is one metro area — and answered the
size question on card 5, so ten cards were consequences of a known small
object. A game with that name needs the range to include the frightening end
*and* to close honestly: reflectivity alone allows 120 m to 600 m until the
thermal and radar measurements land, which is the difference between a city and
a country, and the measurements are what buy the relief.

Also: **make the ending caused.** It misses because of the impactor this
campaign sized and launched, not because it was always going to.

## 9. Write the arc down, then check days against it

`STORIES.md` at the repo root holds two paragraphs per game, taken from the
cards rather than invented for the summary. It exists so a day can be checked
against the story it belongs to: if a day stops serving the arc, either the day
is wrong or the file is stale.

---

## The order that works

1. Timeline and arc → `STORIES.md`.
2. Roster, with what each lead believes and which two of them disagree.
3. `dayNoun` and `audience.grade` in the manifest.
4. The book: missions, stops, lessons.
5. The fifteen cards, last — they can only be written once the answers exist,
   because rule 6 is a comparison against them.
6. `npm run check`, then read three cards in the running game. Everything in
   this file passed every other check in `engine/dev/` before it was written.
