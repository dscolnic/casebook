# Alamos — mission-based learning games

Three first-person, mission-driven educational games on three.js, plus the
shared engine they now run on. Each is the same loop in a different setting:
15 missions × 3 stops, walk to a place, answer a science question, hand off.
No combat, no weapons.

**Read `gamekit/THEME_CONTRACT.md` before touching world code.** It is short and
every rule in it cost hours to learn.

## The three games

| Game | Where | Setting | Run it |
| --- | --- | --- | --- |
| The Contaminated City | `gamekit/themes/contamcity/` | Riverton, college chemistry, outdoor | `cd gamekit && THEME=contamcity npm run dev` |
| Project Y | `project-y-fps/` | Los Alamos 1943–45, outdoor | `cd project-y-fps && npx vite` |
| Hospital Heroes | `Hospital/hospital-fps/` | Children's hospital, interior, ~grades 3–4 | `cd Hospital/hospital-fps && npx vite` |

**All three share one engine** (`gamekit/engine/core`). Their `src/*.js` logic
files are re-export shims. `gamekit/` also holds the world layer, the tools and
the content importers.

## The one thing that will trip you up

**`main.js` is NOT shared.** Each game has its own entry point, and it is the
only file the migration deliberately left forked. A feature added to
`gamekit/src/main.js` reaches exactly one game. This has already caused a bug —
the passage quiz shipped working in one game and invisible in the other two.

Shared (edit once): `gameState, simulation, questionUI, dashboard, save,
constants, time, utils, terminology, interactions, player, personQuiz, map,
figures`, and everything under `engine/world` and `engine/people`.

Per game (edit three times): `main.js`, `index.html`, `world.js`, props, plan/site,
and all content — `curriculum, missions, divisions, leaders, historicCharacters`.

## Starting a new game

Full runbook: `gamekit/NEW_GAME.md`. Short version:

```sh
cd gamekit
node tools/import-missionbook.mjs <book>.docx <theme> --dry   # MISSION n / Activity n.m books
node tools/import-designbook.mjs  <book>.docx <theme> --dry   # SHIFT n • CASE m books
```

Run both with `--dry`; the one that reports missions is the right one. Then
write the mission→area map, `cp -r themes/_template themes/<name>`, import, and
hand-write the three things a book cannot supply — `content/groups.js`,
`content/roster.js`, `content/ballpark-specs.js`.

## Checks — run all three, they catch different things

```sh
cd gamekit
node engine/dev/validateContent.mjs <theme>   # content agrees with itself
node engine/dev/smokeCampaign.mjs  <theme>    # the engine can reach every stop
```

In the browser console, before judging how anything looks:

```js
const { reportAudit } = await import('/engine/dev/audit.js');
reportAudit(gamekit.scene, gamekit.renderer, {
  spawn: gamekit.theme.start,
  colliders: gamekit.world.colliders,
  groundHeight: gamekit.world.groundHeight,   // outdoor: or every prop in a dip is reported
});
```

`smokeCampaign` exists because a theme once had entirely valid content and two
thirds of its campaign unreachable. `validateContent` cannot see that.

## What a mission stop looks like now

- Three stops per mission; **every third is a person stop** — find a named
  person from that area instead of entering the building.
- Answer formats: Protocol, Sequence, Ballpark, Science Tank, Diagnosis
  (instrument panel + candidates, draws a figure), plus TRIAGE and CASEBOOK.
- **Right or wrong, the verdict is a card on its own overlay**, not appended
  below the question.
- A wrong call charges only a 3-hour minimum, then offers four priced ways out:
  answer again ($5 / 12 h) or move on ($10 / 24 h). Money options disable when
  the reserve is short; time options never do, so nobody is ever trapped.
- Talking to anyone who is not this mission's person opens their passage and one
  generated question about it, worth $1 once. The passage closes before the
  question; reading it again is offered and forfeits the dollar.

## House rules learned the hard way

1. **Do not fork the engine again.** Three copies meant every fix three times.
2. **Budget real lights.** 28 point lights took a floor from 118 fps to 20.
   Ambient + hemisphere + emissive panels + IBL. Ceiling of 6 real lights.
3. **Never put text on a `DoubleSide` material.** It renders mirrored from behind.
4. **One source of truth for ground height.** Shipped broken twice.
5. **Never dim gameplay elements with opacity.** Darken the colour instead.
6. **Outdoor palettes blow out.** Under ACES with a bright sky IBL a mid albedo
   renders near-white. `envMapIntensity` 0.35–0.5, exposure below 1.0, and an
   albedo darker than looks right written down.
7. **`kit.js` placers take `(x, z, y)` — ground last.** One call written
   `(x, y, z)` put six display boards sixteen metres in the air.
8. **Keep the spawn point and the route clear.** A prop over the spawn welds the
   player in place: renders perfectly, W does nothing.
9. **Grep for the previous game's nouns before assuming a module is generic.**
   `simulation.js` held one game's cast, `constants.js` one game's save key,
   `player.js` one game's field of view and floor height.

## Screenshot before believing anything visual

This is the most expensive lesson in the repo. In one session: a gable roof was
inside out in the *shipped* game and in the port of it; a building sign sat
behind a canopy slab; half the crowd never moved; a walk cycle's feet travelled
twice as far as the body. **Every one of them passed every assertion available** —
exports present, meshes created, no errors, builds clean.

Corollaries:

- A "before" screenshot is a baseline, not a correctness check. The roof was
  already wrong in the reference shot and I matched it faithfully.
- **A background browser tab gets no `requestAnimationFrame`.** The scene renders
  dark, nothing animates, `getCurrentTarget()` stays null, and synthetic key
  presses appear to do nothing. Check `document.visibilityState` before
  concluding anything is broken. `window.gamekit` exposes `updateCrowd`,
  `updateInteractions`, `getCurrentTarget` and `activate` so a throttled tab can
  be stepped by hand.
- A dynamic `import()` from the console may resolve to a **second copy** of the
  module graph with its own state. Compare
  `getState() === window.gamekit.getState()` before trusting a console test.

## Content and safety

Audience varies: Hospital Heroes is ~grades 3–4, The Contaminated City is
college chemistry. The design books carry explicit safety framing — the player
never prescribes, diagnoses for real, or handles hazardous material outside a
fictional frame. Keep it. No gore; stakes come from time, teamwork and
consequence.

Content invariants, all asserted by `validateContent`: every lesson has a real
`scene`; `takeaway` never equals `why`; `choices` contains `correctChoice`
verbatim (grading is by label); the pre-question panel shows the scene and where
you are, never the takeaway.

## Known unfinished work

- **Worlds are still forked.** Logic is shared; `world.js`, props and plan are
  not. `project-y-fps/site.js` holds all 19 buildings as data but **nothing
  imports it** — `@world` still points at `src/world.js`. Before flipping it:
  each filler building wants a side-by-side against the original, the roads,
  boardwalks, poles, fences, vehicles and central board have no home in the data
  yet, and hospital needs `engine/world/interiorBuilding.js` written from
  nothing.
- **Hospital bios are one-liners** (median 14 characters), so the passage quiz
  falls back to a role question for 32 of its 37 characters. That is a content
  gap, not a code one.
- `questionUI.js` question renderers should become pluggable per theme.
- `engine/core/*` still uses Los Alamos vocabulary in places (`divisions`,
  `budget`, `Director funds`).
