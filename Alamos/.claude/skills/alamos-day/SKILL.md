---
name: alamos-day
description: The day model: the plan card, budgetForRoute from the map, real-time countdown with PANEL_PACE, penalty boxes and priced ways out, the money rules, and shapeMissions' shape of a teaching day (no room twice, one person stop, callbacks from day 3). Read before touching engine/core/day.js, the countdown, the economy, or mission shaping.
---

## A mission is a day, and a day is a countdown

The campaign clock is gone. It charged time in lumps — `walkCost` on arrival, `visitBuildingCost` on
opening a question, a penalty for a wrong answer — so the player could not see what a decision cost until
after making it, and standing still was free. The optimal play was to think as long as you liked and then
walk in a straight line.

- **The day opens with a plan.** `createDay()` in `engine/core/app.js` puts up the calls, what each is,
  whether it is a room or a person, and how far away, with the map underneath. The countdown does not move
  until the player accepts. The note is "Take them in whatever order." Nothing else.
- **The budget comes from the map, not from an author.** `day.js` `budgetForRoute()` walks the day's stops
  nearest-neighbour from the spawn, converts distance to walking time, and says travel should be a little
  under half the day. Spread-out days get more hours; a day that never leaves one building gets the floor of
  five. Move a building and the budget follows.
- **Time runs in real time, one game minute a second** while walking, driving or flying, and **stops dead
  while a panel is open** (`PANEL_PACE`, 0 in every game). It was a quarter rate for most of this engine's
  life, on the argument that thinking is not free, and that argument was about the wrong thing: **the clock
  exists to make the route a decision** — which calls to take, in what order, how far to walk, who to talk
  to on the way — and none of that happens while a question is up. What the quarter rate charged was reading
  the evidence, hardest of all on the player who most needed to re-read the scene. **`tickDay` read
  `pace > 0 ? pace : 1`**, so the one value meaning "stop" was the one value that ran at full speed — every
  caller would have looked correct while the day drained four times faster behind a panel than while
  walking. Zero is a rate now; only negative and non-finite fall back. A format may also declare
  `pausesClock: true`, which BELT does; redundant today and kept deliberately, so restoring the global rate
  cannot silently un-fix the format the decision was made for. In a room the clock is the server's, so the
  client says so through `setPanel(open, frozen)` — additive, ignored by a casebook that has not deployed the
  other half.
- **The stops are open in any order.** `openStopIndices()` is the truth; `nextMissionStopIndex` survives only
  as "the first still open". Every open room's case beacon is lit at once and the map outlines all of them.
- **A wrong call is a penalty box.** The stop closes for an hour of the day's own countdown and reopens
  itself — free — or $10 has it back immediately. There is always a free way forward, so the only dead end is
  a wrong call with less than an hour left and nothing in the reserve; then the day restarts, which is still
  escapable because a restart clears `state.passages` and every person in town is worth $3 again — **which is
  now the only source of money in the game.** `DAILY_STIPEND` and `WEEKLY_APPROPRIATION` are both 0, so after
  the opening $20 nothing is issued for turning up or for finishing a day; the reserve is earned by talking to
  people or it is not earned. Both log lines are written to say nothing at zero rather than announcing a $0
  allowance, and the stipend's once-per-mission stamp is still set either way, so turning it back on cannot
  pay twice for a day already opened. The box is
  `state.penalties[visitKey]`, stored as the `dayLeft` the hour expires at — the day only counts down, so it
  needs no wall clock and survives a save. A wrong call charges only a 3-hour minimum, then offers four
  priced ways out: answer again ($5 / 12 h) or move on ($10 / 24 h). Money options disable when the reserve
  is short; time options never do, so nobody is ever trapped.
- **Running out of time restarts the day too.** Same card, same rule.
- **The last call does not end the day.** Whatever is left on the clock is the player's: conversations pay $3
  each, once per person per day.

Two traps, both already paid for: the entry points start their frame loop during module evaluation, so
`const day` (like `const driving`) must be declared *above* that call or every frame throws `Cannot access
'day' before initialization`; and `state.timeHours` is now derived from the countdown for the sun angle only
— nothing should add to it.

## The shape of a teaching day

`engine/content/normalize.js` `shapeMissions()` reshapes whatever the books wrote, at load, for every theme
— so a re-import cannot lose it.

- **Nobody walks into the same room twice in a day.** The design books write a day as one unit on one topic
  and an area is a building, so Riverton and the hospital sent the player to the same building three times,
  on 15 days out of 15. The unit is kept: the first call on an area is at its room, any repeat that day is a
  person stop.
- **Each day has exactly one person stop**, unless a repeat forces a second. The old rule — every third stop
  campaign-wide — knew nothing about the day it landed in, and stacked with the rule above made 34 of
  Riverton's 58 calls a person hunt.
- **From day 3, every day carries a callback**: one extra call revisiting an area taught earlier, oldest
  first, **and only where there is a `— Review` variant to serve** (see the day-calls gate above). Blocked
  practice is how the books are written and how people forget; this is the spaced retrieval that fixes it,
  and it is why a day has a second building to walk to.
- A stop's `person` and `callback` flags are authored data; `isPersonStopForIdx` honours the flag and falls
  back to the campaign-wide rule for anything unshaped.

## The plan card says why, and what today adds

Two lines the plan card did not have, and both are generated rather than authored
— `engine/core/app.js` `reasonFor` and `engine/core/delivery.js`
`deliveryPlanLine`:

- **A reason under every call.** The card named six places and gave no reason to
  walk to any of them, so a day read as an itinerary somebody else had drawn up
  — when the one thing the player is actually deciding is the route. A person's
  reason is the job they hold, which is why it is them; a room's is what that area
  is for, which the book already wrote as the group's `desc`. A stop may override
  it with `reason:`, and where one does, that wins. **Deliberately not the day's
  question**, which used to be printed there and was taken out for being a second
  briefing: a reason is a clause, and a call with three lines under it is a card
  nobody reads twice.
- **One line saying which piece of the delivery today is**, under the stake:
  *"Today's work is the parallel path flow map — piece 7 of 15 of The Winter
  Operating Case. 6 pieces are already on the board in System Operations."* It is
  the answer to "why am I doing today at all", which the fiction gave and the
  campaign answered with a week number in the HUD.

And the card that closes a day carries the **handover** under the debrief:
`deliveryGainHTML`. Under it rather than inside it, because the debrief is
composed from the day's results and this is what the day left behind, which is
true whichever way the day went.
