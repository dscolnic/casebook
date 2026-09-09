# Changeover — Kesteven House (AP Macroeconomics) — round 1

`CHANGEOVER.md`, read against the build.

Read against the build that now runs twelve campaigns. Four of them (Whiteout,
Overwind, Boomtown, Wildtype) went through a **story-layer pass** this week: every
`**World state:**`, `### Physical aftermath` and ledger line in their bibles became
a prop in the world — a slip clipped to a bench, a board whose text changes, a gate
that opens, a ship that appears — keyed to the mission that writes it. The rooms
change as the campaign does.

**This bible cannot get that pass yet, and this handback is about why.** It is
one round, four asks, and some notes on story, education and payoff. The four asks
are worth more to the game than anything else we could request.

---

## 0. What is there now

`**World state:**` lines: 75, of which **9** are the same sentence —
*"Mission outcome and hook | Stop the timer and keep the next unresolved consequence visible"* — which is a stage direction, not a state. `### Physical
aftermath` blocks: **0**. Prop states: **0**. So the world we can build from this
bible is the world of day 1, fifteen times.

## 1. Physical aftermaths — one per mission, in Overwind's exact shape

Overwind v1.2 writes twelve of these and they were the easiest thing in the set to
build, because every field is a thing:

```
### Physical aftermath — ow-drum-tag
**Home:** `drum`. **Before:** Obsolete drawing has no warning tag.
**After — exact action:** Ewan ties the superseded tag through the drawing clip.
**Trigger:** accepted_stop_8. **Persistence:** retain the changed prop at its home
for later inspection; retries do not repeat the action.
```

One per mission, please, with:

- **Home** — one declared fixture id from §3 (never a room, never a person).
- **Before** — what the object looks like on the morning of the mission.
- **After — exact action** — one sentence, one named person, one verb, one
  object. *Ties a tag*, *clips a card*, *crosses out a sheet*, *turns a valve*,
  *pins a photograph*. This sentence is rendered verbatim on the prop, so it is
  player copy.
- **Trigger** — the accepted stop.
- **The next problem, physically** — what the player can *see* that says
  tomorrow's mission exists (Overwind: "The rope record lists more hanging steel
  than the cage and its load"; Whiteout: "the Habitat tile flashes `SCRUBBER: 2
  COMMANDS / 1 SENSOR`").

Where a change is a reading or a label, write the exact text, in caps as it would
print: `BRAKE PAGE OPEN`, `SUPERSEDED`, `LIVE STABLE / RECOVERY UNVERIFIED`. We
never compose player-facing text; we print yours.

## 2. A persistent world-state ledger with a *visible* state per row

Whiteout and Wildtype carry `## 7.1 Persistent world-state ledger`: one row per
mission — *state that persists* · *next visible problem*. Please add one. The test
for each row is that a player walking past the place on day 15 could point at the
thing the row names.

## 3. An ending you walk into, not a card

Whiteout's §3 says the Runway Door "stays shut until final rescue readiness and
the canary gate are satisfied", and its ending has the plane land, the lights come
on and the player step out through the door. Overwind's passenger gate opens for
the forty-one. Wildtype's covered cart rolls down to a ship that appeared offshore
the day before. All three are built and they are the best minute in each game.

The engine can open a door, start a vehicle, light a runway, raise a level, turn
on a ride, on the final accepted stop. **Name the one thing in this world that
changes when the campaign is won**, where it is, and what the player does in the
sixty seconds after — then write the ending card as what they see from there.
The current ending card is 34 words of praise and closes on "you"; the story gate
(`checkStory`) asks that a campaign close on what came of it.

## 4. Landmark-only spaces to open

§3 in the four new bibles lists two to four **landmark-only spaces** — rooms with
no graded stop that carry the human stakes (Whiteout's Mess & Bunks and Medical
Bay; Overwind's Lamp Room with forty-one tallies on hooks, and its Change House).
We open those as walkable rooms and dress them. Name two to four for this place,
with one sentence each on what is visibly in them and how it changes over the
campaign.

## 5. The story gates, which every bible in the set fails the same way

`checkStory` reports **29 problems** here. Three shapes account for nearly all of
them, across all twelve campaigns:

- **The segue does not turn.** Rule 11 is But-or-Therefore: the line that closes
  a day must carry a complication or a forced consequence, with a number, a clock
  or a person in it. "The council asks how to fund the separate housing measure"
  turns; "the next required location pulses on the map" does not.
- **No "Today you decide …" clause** on the plan card. Fifteen days, and the card
  never says what the player is deciding today in one sentence.
- **The opening never says what the player is** — "You are the …, which means …"
  is the beat; and the ending closes on "you" rather than on the world.

Reading level: the sixteen cards nobody can skip read at a **mean grade 9.2,
worst 12.8**, against a 6.5 bar the four new bibles clear (2.5–3.7). Same
demand, shorter sentences, the term named and glossed on the spot.

## 6. Notes on this campaign

**Story.** The best titles in the set ("4.15 On The Clock", "Too Late By
Itself", "Crowded Out Twice") and a real premise — a currency changeover with a
date. The world does not know the date. This is a tower with the city out of
every window, and the city is the visible state: shop price boards, the queue at
the exchange counter, the bank's night lights, a news ticker. Ask for a clock on
every plan card (days to changeover) and for the queue and the prices to move
with the missions.

**Physical aftermaths with fixtures already declared:** the COUNTER queue
(length by mission); the NOTES hall's crates of old crowns filling and new
crowns arriving; the PRICES floor's basket board with the CPI line redrawn (M3);
the BANKS reserve clock (M7, M9); the TRADE payment wires lighting (M9); the
RATE room's policy wall gaining a signed page per mission until the Rate Book is
whole (M15). Out of the windows: shop signs repricing on M8 ("The Rate People
Feel").

**Payoff.** Changeover day. On the final accepted stop the counters open, the
old-crown crates are sealed and wheeled out, the new notes go into the trays, and
the city's price boards outside all flip to the new currency. The Rate Book is
signed "with conditions" — print the conditions on the wall. The player walks
down to the counter and watches the first exchange.

**Education.** 20 DERIVE stops carry the course, which is right for macro's
identities. Reading level is the worst in the set (mean 9.2, worst 12.8) and the
concept order gate flags eight days; the demand is fine, the sentences are long.

---

## On our side

Nothing above needs a schema change. The story layer (`themes/<t>/story.js` on `engine/world/paper.js`) is built and running on four campaigns; with §1–§4 in hand this campaign gets it in a session. Fixture ids are read from §3 as written, so please keep the ids stable.
