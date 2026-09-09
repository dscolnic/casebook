# Red Sand — Arcadia Rise (AP Chemistry) — round 1

`MARS.md`, read against the build.

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
The current ending card is 42 words of praise and closes on "you"; the story gate
(`checkStory`) asks that a campaign close on what came of it.

## 4. Landmark-only spaces to open

§3 in the four new bibles lists two to four **landmark-only spaces** — rooms with
no graded stop that carry the human stakes (Whiteout's Mess & Bunks and Medical
Bay; Overwind's Lamp Room with forty-one tallies on hooks, and its Change House).
We open those as walkable rooms and dress them. Name two to four for this place,
with one sentence each on what is visibly in them and how it changes over the
campaign.

## 5. The story gates, which every bible in the set fails the same way

`checkStory` reports **23 problems** here. Three shapes account for nearly all of
them, across all twelve campaigns:

- **The segue does not turn.** Rule 11 is But-or-Therefore: the line that closes
  a day must carry a complication or a forced consequence, with a number, a clock
  or a person in it. "The council asks how to fund the separate housing measure"
  turns; "the next required location pulses on the map" does not.
- **No "Today you decide …" clause** on the plan card. Fifteen days, and the card
  never says what the player is deciding today in one sentence.
- **The opening never says what the player is** — "You are the …, which means …"
  is the beat; and the ending closes on "you" rather than on the world.

Reading level: the sixteen cards nobody can skip read at a **mean grade 9.7,
worst 12.2**, against a 6.5 bar the four new bibles clear (2.5–3.7). Same
demand, shorter sentences, the term named and glossed on the spot.

## 6. Notes on this campaign

**What is already right.** The world-state lines here are physical and specific
— *"the reactor branch turns yellow as nitrogen mole fraction rises"*, *"Achebe
places a clean field vial in a rover case"*, *"Three initial-rate trials appear
beside Herrera's signed override"* — and the vehicle's gauge already fills a
piece a shift. M10 "The Saboteur" and M8 "The Override" are a story. This bible
needs the least from §1: write the lines you have as `### Physical aftermath`
blocks with a Home fixture id, and add the twelve that are missing.

**Physical aftermaths with fixtures already declared:** the INTAKE branch
colour (M2, M4); the HSTORE ledger and tank gauge (M5); the KINET catalyst bed
swapped (M9) and the rate trials pinned (M11); the EQUIL reactor hall's
temperature tag (M7); the PHASE cold end's methane model (M4); Herrera's override
sheet at GIBBS (M8), and the saboteur's evidence bagged (M10). The PAD's ascent
vehicle: a gauge that fills, and on GO, a countdown.

**Payoff.** GO / NO-GO is already the last mission's name. Make GO visible: the
crew walks to the pad, the vehicle's lights come on, the gauge reads FULL, the
countdown board starts — and NO-GO is a countdown board that stays at HOLD with
the reason printed. Both are endings; write both.

**Education.** 22 formats, no DERIVE, right for AP Chem. Reading level is the
second-worst of the eight (mean 9.7, worst 12.2) and the segue gate fails on
nine days — the story is there; the closing lines do not carry it.

---

## On our side

Nothing above needs a schema change. The story layer (`themes/<t>/story.js` on `engine/world/paper.js`) is built and running on four campaigns; with §1–§4 in hand this campaign gets it in a session. Fixture ids are read from §3 as written, so please keep the ids stable.
