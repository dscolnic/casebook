# Safety Factor — Corbin Park (AP Physics 1) — round 1

`SAFETY.md`, read against the build.

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

`**World state:**` lines: 75+, and — unusually for the older bibles — most of
them are physical (see §6). `### Physical aftermath` blocks: **0**. Prop states:
**0**. The lines exist; they are not yet in the shape the build reads, and about
a dozen missions still close on a stage direction rather than a thing.
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
The current ending card is 35 words of praise and closes on "you"; the story gate
(`checkStory`) asks that a campaign close on what came of it.

## 4. Landmark-only spaces to open

§3 in the four new bibles lists two to four **landmark-only spaces** — rooms with
no graded stop that carry the human stakes (Whiteout's Mess & Bunks and Medical
Bay; Overwind's Lamp Room with forty-one tallies on hooks, and its Change House).
We open those as walkable rooms and dress them. Name two to four for this place,
with one sentence each on what is visibly in them and how it changes over the
campaign.

## 5. The story gates, which every bible in the set fails the same way

`checkStory` reports **30 problems** here. Three shapes account for nearly all of
them, across all twelve campaigns:

- **The segue does not turn.** Rule 11 is But-or-Therefore: the line that closes
  a day must carry a complication or a forced consequence, with a number, a clock
  or a person in it. "The council asks how to fund the separate housing measure"
  turns; "the next required location pulses on the map" does not.
- **No "Today you decide …" clause** on the plan card. Fifteen days, and the card
  never says what the player is deciding today in one sentence.
- **The opening never says what the player is** — "You are the …, which means …"
  is the beat; and the ending closes on "you" rather than on the world.

Reading level: the sixteen cards nobody can skip read at a **mean grade 8.4,
worst 11.2**, against a 6.5 bar the four new bibles clear (2.5–3.7). Same
demand, shorter sentences, the term named and glossed on the spot.

## 6. Notes on this campaign

**What is already right.** This is the one older bible whose world-state lines
are physical: *"Three operating cards print and the corresponding midway lights
switch on"*, *"The Workshop door receives an OPENS TOMORROW marker"*, *"the crane
barricade remains around arm nine"*. That is the shape §1 asks for; please write
the other twelve missions the same way. Hart's card (M7) and the October stop are
real story — a named person and an accident under inquiry — keep them and let
the segues carry them.

**Physical aftermaths with fixtures already declared:** each ride's operating
card printing and its midway lights coming on as it is certified (WHEEL, SHIP,
BUMPER, COASTER, TOWER, FLUME); the PLANT room's shared schedule board (M13);
arm nine's barricade coming down (M9); the wind envelope on the wheel's control
(M14, "The Wrong Radius"). The certificate at TOWER gains a name per mission.

**Payoff.** The park opens. On the final accepted stop the rides that were
certified start turning — wheel, ship, carousel — the midway lights run, music,
a crowd at the gate, and the rides that were *not* certified stay dark with
their cards. The certificate is signed; the park is the ending. The engine
already animates a ride; it needs the bible to say which start.

**Education.** 24 formats and 10 DERIVE — the best-balanced mix of the eight.
The story gate's main complaint here is different from the others: opening
blurbs name people (that belongs on the call's own reason line, not the plan
card).

---

## On our side

Nothing above needs a schema change. The story layer (`themes/<t>/story.js` on `engine/world/paper.js`) is built and running on four campaigns; with §1–§4 in hand this campaign gets it in a session. Fixture ids are read from §3 as written, so please keep the ids stable.
