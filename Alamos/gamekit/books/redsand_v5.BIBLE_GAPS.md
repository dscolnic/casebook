# What the bible still owes, after v10.2

Source:
`Mars_AP_Chemistry_Campaign_Implementation_Bible_v10.2_Compact_Glossary.md`.
Built: **missions 1, 2 and 3 — twelve stops.** Missions 4–15 are unbuilt and are
not what this file is about; everything below was found by building the first
three.

**v10.2 paid off almost the whole of the previous list.** The five items this file
carried against v7 are gone: every mission card now ends on *"By the end of the
mission"*, every outcome opens on `Mission decision:`, every setup after stop 1
names what the previous stop established, every stop carries a `Stop reason` and
an `Answer text`, and the operated stops carry their interaction payloads. Two
arithmetic defects went with them — mission 2's *"supports 20 kmol CH4"* (the 20
was the leftover carbon dioxide; v10.2 writes 130) and mission 2's *"Erik"*
Sundqvist. The glossary moved onto the mission cards as compact one-line entries,
which is where this build now lifts it from.

Four things are left.

---

## 1. Stop 11's probe is one station short, and has no expected values

**The only place in the book where a number is not the bible's.**

v10.2's `probe:` payload for *Sample the branches* has three points — tank
headspace, regulator outlet, reactor branch. The importer refuses a probe with
fewer than four: *"a pattern needs somewhere to break"*, and it is right. With
three, two of them normal, there is one candidate and no pattern to read. The
importer also wants, per station, a `reading` **and** an `expected` — this run
against what the line is supposed to show — and the bible gives readings only.

The previous build held the stop back rather than invent anything, and the price
was a quarter of mission 3: no partial-pressure calculation anywhere in the
campaign, and the bible's own beat 3 unable to fire because it keys off a stop
that was not there. This build restores it and writes two things:

- **`expected`**, as the line's specification — hydrogen-rich, at or above 95% H2.
  It is not a fourth measurement; it is what the bible's own beat 3 calls
  hydrogen-rich.
- **A fourth station upstream of the tank**, the delivery header the electrolysis
  hall feeds the store through. It reads normal, so it makes no claim the bible
  does not make and it does not move the answer: the pattern still breaks at the
  reactor branch, which is v10.2's own `truth`.

**What the bible should add:** a fourth sampling point on the run from store to
reactor, and a nominal composition per port.

## 2. Three terms the cards use and the glossary does not define

v10.2's own rule is that *"every player-facing technical term resolves through the
glossary without depending on an undefined word."* Three do not:

| term | where it is used | what this build did |
| --- | --- | --- |
| `methane` | everywhere, from the opening card on | written from mission 2's own Sabatier entry, said the other way round |
| `stoichiometric` | mission 2, stop 5's verdict — the bible's own words | written from nothing; the word appears in a verdict the bible wrote and in no entry it wrote |
| `PV`, `nRT` | mission 3, stop 10's prompt | lifted from mission 3's own equation block — the equation, what it is for, and every symbol |

Two of the three are the bible's own material re-pointed; only `stoichiometric` is
invented. All three are marked in `books/redsand_v5.yml` and should be replaced by
the bible's wording.

## 3. The foundation glossary stacks three concepts deep by mission 2

`jargonDepth` fails two of v10.2's own entries:

> Reactant (d2) is 3 concepts deep, and day 2 allows 2
> Product (d2) is 3 concepts deep, and day 2 allows 2

The chain is the bible's: **Reactant** is defined through *chemical reaction*,
which is defined through *chemical bonds*, which is defined through *atoms* and
*molecule*. Each link is fine and each is introduced before it is leaned on — the
card-order rule passes. What fails is the ceiling: a term introduced on day two may
rest on one other defined term, not two, and these rest on two.

This is new with v10.2, and it is a consequence of a good decision. v7 defined none
of the foundation and simply assumed an AP reader held it; v10.2 defines the whole
chain, which is the right call for *hard concepts explained at a sixth-grade
reading level* — and it is what puts mission 2's vocabulary three deep.

**What the bible should do:** define `Reactant` and `Product` without routing
through *chemical reaction* — "a starting substance the reactor consumes" and "a
substance the reactor makes" both say it in words already defined — or move the two
entries onto mission 3's card, where the ceiling is 3.

## 4. The metric economy is winnable, but by 26 points

Unchanged from v7 and still worth confirming, because v10.2 did not revisit the
numbers. Computed from the bible's own fifteen post-mission bar changes:

| | Methane | Oxygen | Power | Integrity |
| --- | ---: | ---: | ---: | ---: |
| start | 82 | 88 | 72 | 70 |
| sum of authored deltas | −34 | +13 | −55 | +10 |
| where the campaign ends with no Recovery Points spent | **48** | **101** | **17** | **80** |
| Recovery Points needed to reach 100 | 52 | — | **83** | 20 |

- **Total RP required: 154. Maximum earnable: 180** (12 × 15 missions).
  **Headroom: 26 points** across the whole campaign — roughly two committed
  mistakes per mission and no badly missed timers. Tight, and possibly intentional.
- **Power Reserve absorbs 83 of the 154.** More than half the campaign's entire
  earnings go to one bar.
- **Ascent Oxygen overshoots to 101,** so a point of authored gain is clamped away
  and the bar is never actually in play.
- **The Mission 13 crisis floor turns on one point.** On the authored deltas alone
  Power Reserve arrives at mission 13 at **39%**, one under the 40% threshold that
  collapses the bus. A player who banks their Recovery Points rather than spending
  any on Power hits an unavoidable game-over that nothing on screen announces.
  Either widen the margin, move the threshold, or have somebody say out loud before
  M12 that the bus will not start below 40.

---

## What the engine side has already done

So the bible does not need to work around any of it:

- `guide` and `takeaway` removed from question cards, the importer and the reading
  gates.
- `beatRooms:` — arrival beats fire in minor rooms (Atmosphere Intake, Hydrogen
  Store, Ice Cut), which is where most missions happen.
- `panel:` doubles as the beat board's row, so a beat writing a Panel/HUD line gets
  its world change for free.
- `primer:` — the mission card's own "Primer concepts" list prints on the plan card
  between the calls and the map.
- `EQUATIONS.redsand_v5` in `tools/syllabus.js` is the mission cards' "Equations
  first needed today", one for one: equation, what it is for, symbols, and the
  campaign-specific reason.
- `metricsPlan.mjs` in `npm run check` — fails a mission with no target, a delta
  naming a bar that does not exist, or a bar that moves with no named cause.
- `Failure means:` and `Later travel:` are not printed, by decision, and the
  importer no longer carries them.

## Two checks that fail and are not the bible's fault

- **`dayDebrief`** — *"3 clean days produce only 0 distinct compliments."* The
  campaign authors its own closing prose, and `debrief.js` deliberately prints no
  generated praise over an authored close. The gate has not been told. Pre-dates
  this build.
- **`probeQuestions`** — one LEAK on mission 3 stop 9: the key concept line repeats
  63% of the keyed answer's own words. Both strings are the bible's. Pre-dates this
  build.
