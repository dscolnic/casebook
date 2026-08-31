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
| Red Sand | Sundqvist: the window does not move, run the bed hotter · Herrera: a hotter bed hands back less methane and the batch still has to meet a specification | Sundqvist on sol 292, Herrera on sol 293 — and on sol 299 the assay says both were arguing about a variable that was not doing the damage |
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
dayNoun: 'Sol',     // Red Sand — a Martian day, 39 minutes longer than this one
// omitted -> 'Day' — right only when a mission really is one day
```

It reaches the plan card title, the continuity line, the turn-in button
("Finish this watch and move on" rather than "Go to sleep"), the day-over card
and the campaign log.

## 4b. The opening card is required, and it is the mission and the delivery

`opening` in the manifest, ONE paragraph of 70–180 words (55 at a primary
audience), in this order:

1. **What has happened, or is about to, and to whom.** Short sentences. No
   inventory of the place.
2. **The job, as authority.** "You are the …" and then, plainly, what you decide.
   `checkStory` fails a card with no `you are / you have / you lead / you run /
   you direct / you command` in it.
3. **What is handed over at the end**, named, with what is in it — see § 4c.
4. **What one day of it produces.** "You write one of them a night." A fortnight
   that produces something has to say what today's share of it is.
5. **What it costs, in people or in time, last.** `checkStory` fails a closing
   line with no number, no clock and nobody in it.

**Two rules that were dropped, deliberately, and are not coming back.**

- **No cast introduction on this card.** For a while `checkStory` *failed* a card
  that named nobody, and what that produced was two sentences of introduction and
  disagreement — *"Ada Verhoeven, the board chair, wants the rate fixed on Friday.
  Emil Radic, the board's statistician, has three weeks of price data"* — in front
  of the only paragraph a player reads before the game has taught them a word. The
  argument is a campaign property (§ 1) and the day cards make it, with the person
  standing in front of you. The rule is gone; `checkNames`/`introRule` still
  introduces everybody wherever they are first named, which is now usually a day-1
  stake.
- **No em-dashes, no piled-up clauses.** *"You are the duty engineer, which means
  the water let out each morning is ordered by you — out of gauge readings taken
  hours ago and a survey of the reservoir made in 2003"* is one sentence trying to
  be three. Say it directly: *"You are the duty engineer. You order how much water
  goes out each morning, from gauge readings taken hours ago and a survey of the
  reservoir made in 2003."*

**The failure they were all swept for is still the inventory opening**: a paragraph
of true facts about the place, with nobody in it, ending on a specification. Red
Sand opened with nine modules, eighteen hundred square metres of panel and a
vehicle four hundred metres away, and never said that six people do not leave for
another twenty-six months if the tank is not filled. Full worked before-and-after
in `NEW_GAME.md` § 5.

## 4c. The campaign builds ONE thing, and the opening card names it

`delivery` in the manifest, beside `opening` and `ending`:

```js
delivery: {
  name:   'The Winter Operating Case',       // the thing itself
  what:   'who receives it, and what it lets them do',
  where:  'OPS',                             // the area whose room keeps it
  pieces: [ 'The reserve margin page', ... ] // one per mission, in order
}
```

**Why it exists.** A campaign was fifteen days of correct answers with nothing
between them. The opening card said what was at stake, each day's card said what
was owed that morning, the ending said how it turned out — and a day that closed
left behind nothing a player could go and look at. The only record of twelve days
of work was the week number in the corner of the HUD.

Four surfaces read it, and each answers a question the campaign could not answer
before:

- the **opening card** names it, so day 1 knows what day 15 produces;
- each **plan card** says which piece today is, which is the answer to "why am I
  doing today at all";
- the **card that closes a day** hands that piece over — under the debrief, not
  inside it: the debrief is how the day went and this is what the day left
  behind, which is true whichever way it went;
- **one room keeps all of them**, on a board with a cell per piece and a case
  under it with a block on it per piece earned, so "how far through this am I" is
  answered by walking somewhere and looking.

**Four rules, and `engine/dev/delivery.mjs` is the gate.**

1. **One piece per mission, in mission order.** `deliveryPieces` reads mission
   *n* beside piece *n*, so a list of the wrong length silently drops the last
   day's piece or invents a day with no takeaway to print.
2. **A piece is a thing somebody could hand over**, two to eight words, not a
   sentence. It goes in a cell on a board.
3. **`where` has to be an area with somewhere to stand** — a room behind a door
   in an outdoor game, a room of its own on the plan in a floor game. Name an
   area with neither and the board is built where nobody can walk into it, which
   renders, raises nothing, and looks exactly like a board nobody has found yet.
   **And a game with its own world module can still get this wrong in a way no
   checker can see**: Mission Control's `INTEG` is on the site plan and is a
   console on the control-room floor rather than a wing room, so the first
   version built the board nowhere and every gate was green. Take the
   screenshot.
4. **Nothing is authored per piece beyond its name.** The sentence under it on
   the board is the day's own `takeaway`, which is already written — and is
   dropped where it is a stub, for the reason `debrief.js` drops it: Hospital's
   fifteen takeaways all read "Shift complete".

**And the opening card pays for it.** The delivery sentence is not added to the
card, it replaces something: fold it into the sentence that already carries the
argument, or cut the least load-bearing sentence in the paragraph. All 41
campaigns' cards are the same length or shorter than they were before they named
what the fortnight builds.

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

## 10. The arc has a shape, and the last day resolves it

Rules 1 to 9 are checkable and checked. This one is judgement, and it is the
difference between fifteen correct days and a campaign somebody finishes.

**The shape that has worked, four times.** Not a formula — a distribution of
kinds of day, which is what stops days 4 through 12 reading identically:

| Days | What the day is for |
| --- | --- |
| 1 | The thing has already happened. Establish the room, the stakes and the argument; no twist yet |
| 2–4 | The argument opens. Each side wins one, and the player is told which was right on which day |
| 5–8 | Escalation by consequence, not by volume: a decision from day 3 comes back with a cost |
| ~9 | **The reversal.** New evidence reframes what everyone has been working on |
| ~11 | **The quiet day.** Nothing goes wrong, and it reads as unnerving rather than as filler |
| 12–13 | The compound day: three things at once, and the job is ranking them |
| 14 | The last reversible moment. After this the decisions are made |
| 15 | Disposition: go through the claims, say how strongly each is held, decide what outlives the emergency |

**A twist is evidence, never an event.** Riverton's sewer sample tested positive
four days before the first patient walked in. Project Y's reactor plutonium
arrives and ends a year of work in a fortnight. Both reframe what the room has
been doing, and both are a measurement somebody took — not a fire, not a
saboteur. An event that could have happened to anybody is not a twist in a game
about evidence.

**Tension comes from four things, and gore is not one of them.** A clock that is
running; a named person who is harmed if you are slow; a commitment that cannot
be undone once made; a number that moved and should not have. Every shipped day
uses at least two.

**Cash the player's own decisions.** The engine writes one continuity line from
the stored results, which is the floor, not the ceiling. Day 13 of Bring Them
Home opens with the correction the player flew on day 3 coming back expensive.
That is what makes a campaign rather than a series.

**Somebody has to be right, including against the player.** "And this time
Whitaker is right" appears on four cards across the games. A room where the
player is always the sensible one is a room with no argument in it.

**The ending resolves, and is earned.** `ending: [...]` in the manifest is the
last thing anybody reads, and three rules hold:

- **Say what happened, in the world.** The crew came home; the city drank its own
  water again; the object passed at two Earth radii and five thousand kilometres
  of that were bought by the impact.
- **Name what it cost, and what is unfinished.** A resolved ending is not a tidy
  one. The survey line that caught this object expires in eleven months. The
  monitoring programme needs funding after the emergency budget closes.
- **Earn it from the player's own work.** The ending may not introduce a rescue
  nobody worked for. It reads back what the fifteen days established — which is
  why day 15 is a disposition of claims rather than a new problem.
- **And say what the player did, last.** Twenty-five endings shipped saying what
  came of the fortnight and what it cost, and not one of them said who had done
  it: a player who has just held a corridor for fourteen days closed the game on
  a paragraph about a report. The closing paragraph is addressed to them — the
  two or three calls that were theirs, what those calls bought, and the credit
  said plainly. *You checked the instruments the decisions rested on. Four
  million people had power. That was your fortnight.* `checkStory` fails a
  campaign whose last paragraph does not address the player and say what they
  did, and it is the last thing on the card because it is what the card is for.

And do not end on the mechanics. "Campaign complete" in the HUD corner is what
all seven games used to do, and it is why this rule is written down.

## 11. Days connect on But or Therefore, never And Then

The South Park writers' room rule, imported whole because it names a defect
this repo has: fifteen stakes that read as a list — *the survey finds it, AND
THEN the orbit gets fit, AND THEN the size gets measured, AND THEN the
composition gets measured* — is fifteen correct facts and no momentum. A
reader can always insert "and then" between two sentences; the test is whether
"but" or "therefore" fits better, because those are the only two shapes that
carry a plot forward. **The two words name the shapes; they are not required
spellings.** "Nobody has looked at what it is made of yet" is a But, and "So the
number goes public tonight" is a Therefore, and both are better sentences than
the version with the named word bolted on the front.

- **But** introduces a complication: the data disagrees, the window is
  shorter than hoped, the number everyone needed just got worse. It answers
  "then something got in the way."
- **Therefore** introduces a forced consequence: because the corridor reached
  a coastline, the number goes public; because the public number is wrong,
  today narrows it. It answers "and because of that, now this has to happen."
- **Neither is a character fighting another character.** Rule 1's recurring
  argument between two named leads is real and stays — it is texture, and
  it is allowed to be wrong on some days. The conflict this rule is about is
  the plot engine underneath it: the player, trying to do the job, against
  the situation — a deadline, a disagreement in the instruments, a budget,
  the object itself. "Rossi and Ellery clashed at the meeting" is not a But.
  "The corridor crosses a coastline, but the size that decides who evacuates
  is still unknown" is.
- **Planetary Defense's own audit, for calibration.** The macro arc holds:
  day 1→4 is But (one camera disagrees) → Therefore (build a clean track) →
  But (some orbits hit Earth eight years from now, not this pass) →
  Therefore (the number goes public, and has to be defended). Days 5 through
  8 do not: *the size gets measured, and then the composition, and then the
  rotation, and then radar* is checklist order, one open question per day
  with nothing forcing the next one. That is the shape to listen for.

**The debrief card carries the connective tissue.** `mission.segue` — one to
three sentences, authored per mission, optional — prints first on the card
that closes a day, before the generated compliment (`engine/core/debrief.js`).
It is not the takeaway (a principle) and not the stake (tomorrow's situation,
read on tomorrow's plan card before the day starts); it is what closes today
out and pushes into tomorrow, read at the moment the player has nothing left
to do but read it. It does not appear on the last day — the campaign's own
`ending` is the next card up, same as the takeaway.

```yaml
missions:
  - title: How Large Is It?
    segue: >-
      Reflected light and heat together finally pin the size down. But a
      number this size still splits into a city or a country depending on
      what it is made of, and nobody has looked yet.
```

`engine/dev/checkStory.mjs` reports, per campaign, how many of its missions
carry a `segue` and fails any that does contain the literal words "and then"
— the one thing a reader can always insert and the one this rule exists to
make unnecessary. It also fails a segue that does not **turn** at all:
`engine/dev/turnRule.mjs` reads for a complication (the But family — `yet`,
`however`, `instead`, `unless`, `no longer`, `even so`, …) or a forced
consequence (the Therefore family — `thus`, `as a result`, `that leaves`,
`because of that`, a clause-initial `so`/`now`/`still`, …), in whatever wording
the sentence uses. What it cannot see is an implied connective: "The blank ran
clean. Nobody moves tonight." is a Therefore to a reader and nothing to the
checker, so put the word in. Alongside it, the same gate asks that something
concrete be at risk (a number, a clock, a name) and that the segue not repeat a
six-word run of the next stake or of the day's own takeaway — those three are
the drama gate, debt-recorded in `engine/dev/segue-drama-debt.json`. Below `SEGUE_MIN_DAYS` (see the same file), coverage is
reported only: a fifteen-day campaign should reach for this on most of its
days, a nine-stop Quick Discovery in one sitting has nowhere for "tomorrow"
to go and is not asked to write one.

## The order that works

1. Timeline and arc → `STORIES.md`.
2. Roster, with what each lead believes and which two of them disagree.
3. `dayNoun` and `audience.grade` in the manifest.
4. The book: missions, stops, lessons.
5. The fifteen cards, last — they can only be written once the answers exist,
   because rule 6 is a comparison against them.
6. `npm run check`, then read three cards in the running game. Everything in
   this file passed every other check in `engine/dev/` before it was written.
