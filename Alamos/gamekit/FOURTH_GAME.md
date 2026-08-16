# Making the next game cheap

`NEW_GAME.md` is the runbook for building one today. This is the ledger: what
the fourth game cost, what was changed so the fifth costs less, and what is
still expensive.

**Game four shipped.** Deep Watch is `themes/deepwatch/`, written as one book
file and brought across with its own submarine behind the world contract. It is
the first game built the way the rest are supposed to be built.

```sh
cd gamekit
npm run new-theme <name>     # scaffolds, imports a starter book, registers it
npm run check                # every registered theme, every check
```

## Where the phases landed

**Phase 1 — done.** Content normalisation moved into
`engine/content/normalize.js` and runs once at load for every theme; the theme
contract is enforced; one harness (`npm run check`) over a `themes.json`
registry.

**Phase 2 — done.** The interior manager, the E-key dispatch, the debug handle
and the day now live in `engine/core/app.js`; the stylesheet forks are gone
(107 duplicated rules each) with a check that they cannot come back;
`gamekit/src/main.js` names nothing game-specific, so **a theme served from
`gamekit/` needs no entry point of its own** — two themes already share it.

**Phase 3 — done except the worlds.** The importer emits canonical formats,
errors on an unresolved pack and takes `--verify`; `worldParity` keeps the site
data honest. Both older games declare their site as data and still build their
place by hand in `src/world.js`. That is the last fork.

## What the fifth game found

Each of these was discovered by scaffolding a theme and trying to play it —
which is the only reason to keep doing it before every new game.

| What was broken | Why it went unnoticed |
| --- | --- |
| A scaffolded theme failed `npm run check` on placeholder content, with a stack trace rather than a message | `themes/_template` was never registered, so nothing ever checked it |
| `--interior` changed nothing but the sentence printed at the end | the flag was only ever read for the message |
| `site.kind: 'interior'` pointed at `interiorSite.js`, which exports none of the contract | both indoor games predate this engine; one brings its own world |
| `vite.config.js` read the first `kind:` in `plan.js` — a *room's* `kind: 'reception'` | no theme here had a plan |
| The campaign length was fixed at 15 | all four games have 15 missions |
| A day's callback stop was reported by the validator as a malformed mission | the note was written before callbacks existed |
| `COPY` was checked by room id for rooms the book keys by group | the book format changed after the check |

The fixes: the scaffold now imports a starter book and hands back a complete
playable game; `engine/world/interiorFloor.js` satisfies the contract over
`interiorSite`'s builder; `WEEKS` comes from `MISSIONS.length`.

## What the forks cost, measured

Each of these shipped. All of them were invisible: the code ran, the build
passed, and one game quietly did the wrong thing.

| What broke | Cause | Blast radius |
| --- | --- | --- |
| Passage quiz worked in one game, invisible in two | `main.js` forked | 2 games |
| Figures and readings drawn with no styling at all | `styles.css` fork stops before the instrument rules | 2 games |
| `SEQUENCE` matched no renderer — "not yet implemented" | raw comparison against `'Sequence'` | 72 lessons |
| Nine authored diagnosis panels never reached the game | `diagnosis.js` imported by nothing | 9 lessons |
| Person stops with nobody to find | 1 of 26 roster entries had a `division` | 3 areas |
| One game's save loaded into the other two | legacy save key read by every theme | 2 games |
| Clock went NaN, sun angle followed, world went black | `advanceTime(walkCost(d))` in one fork | 1 game |
| Two checkers could not run on two of the games | harness assumed `themes/<name>` | 2 games |

## Still expensive

1. **The world forks.** The hospital's builds
   their place directly. Roads, boardwalks, poles, fences, vehicles and the
   central board have no home in the site data yet.
2. **Two entry points.** Project Y and the hospital keep their own `main.js`,
   `index.html` and stylesheet fork. Anything added to one reaches one game.
3. **Question renderers are not pluggable.** A hospital TRIAGE screen is not a
   Los Alamos one, and both live in `questionUI.js`.
4. **The engine's vocabulary.** `divisions`, `budget`, `Director funds`,
   `historicCharacters` — mechanical to rename, touches every file.

## Definition of done for a new game

- No file outside `themes/<name>/` was edited to build it.
- `npm run check <name>` passes: content consistent, every stop reachable and
  gradeable headless, no stylesheet collision, every group somewhere to happen.
- Its rooms have been walked into and screenshotted. None of the checks above
  can see a wrong-looking scene, and a background tab renders one whether it is
  wrong or not.
