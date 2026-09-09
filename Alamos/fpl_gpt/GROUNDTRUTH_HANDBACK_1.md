# Ground Truth — Station 12, Sablon Flats (AP Physics C: E&M) — round 1

`GROUNDTRUTH.md`, read against the build.

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

`**World state:**` lines: 75, of which **12** are the same sentence —
*"The completed decision changes the mission world and locks into the campaign record"* — which is a stage direction, not a state. `### Physical
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
The current ending card is 29 words of praise and closes on "you"; the story gate
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

Reading level: the sixteen cards nobody can skip read at a **mean grade 7.9,
worst 11.8**, against a 6.5 bar the four new bibles clear (2.5–3.7). Same
demand, shorter sentences, the term named and glossed on the spot.

## 6. Notes on this campaign

**Story.** Rocket-triggered lightning on a salt flat in storm season, and a
mission called "Predict, Then Fire". Nothing in the world fires. The spine is
already there — M12 predicts, M13 finds the missing microsecond, M14 is "The
Shot That Almost Closed the Case" — so the ask is to write those three as things
seen from the flat: a rocket up the wire, the channel, the mast-tip corona, the
recorder traces. Add a person with a stake in the shot going ahead (a sponsor, a
season deadline) so "both limits for every shot" costs someone.

**Physical aftermaths with fixtures already declared:** the FIELD mill array's
needles (M2, M5); the BANK hall's stage lamps charging (M6, M12); the MAST
base's shunt board (M3); the EARTH trench's buried loop marker and bond reading
(M9, M10); the SCREEN room's four traces merging to one (M7); the COUPLE
outstation's damaged card in a bag (M8). The Season Report assembles at SHOT.

**Payoff.** A shot. On the final accepted stop, with both limits posted, the
rocket goes, the channel connects to the mast tip, every recorder in the station
lights, and the report's last page prints. The storm that has been on the horizon
all season is overhead for it. The certificate is the paper; the shot is the
ending.

**Education.** 20 DERIVE — this and Headwater are the two where the derivations
*are* the course, and it shows. Reading level is the best of the eight older
bibles (mean 7.9); still 14 of 16 cards over the bar.

---

## On our side

Nothing above needs a schema change. The story layer (`themes/<t>/story.js` on `engine/world/paper.js`) is built and running on four campaigns; with §1–§4 in hand this campaign gets it in a session. Fixture ids are read from §3 as written, so please keep the ids stable.
