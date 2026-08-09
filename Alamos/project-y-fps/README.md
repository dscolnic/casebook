# Project Y — Los Alamos, 1943–45

Outdoor first-person mission game. Fifteen missions across five divisions.

```sh
npx vite          # dev
npx vite build    # dist/
```

## It runs on the shared engine

`src/gameState.js`, `time.js`, `utils.js`, `terminology.js`, `interactions.js`,
`simulation.js`, `questionUI.js`, `dashboard.js`, `save.js`, `constants.js` and
`player.js` are **one-line re-exports of `../../gamekit/engine/core/`**. Editing
them here does nothing; edit the engine, and build all three games.

`theme.js` adapts this game's content to the shape the engine reads.
`vite.config.js` needs `resolve.dedupe: ['three']` and `server.fs.allow: ['..']`
or three.js loads twice and dev cannot serve the engine.

## Still this game's own

`src/main.js` (the wiring — a feature added here reaches only this game),
`src/world.js`, `src/env.js`, `src/props.js`, `src/npcs.js`, and all content:
`curriculum.js`, `missions.js`, `divisions.js`, `leaders.js`,
`historicCharacters.js`, `specialRequests.js`.

## site.js is written but not wired

It describes all 19 buildings and Ashley Pond as data for `gamekit`'s
`outdoorTown`. **Nothing imports it yet** — `@world` still points at
`src/world.js`. See `../gamekit/THEME_CONTRACT.md` for what has to happen before
it can be switched over, and screenshot every building against the original when
it is.
