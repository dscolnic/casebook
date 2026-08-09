# Hospital Heroes — Junior Doctor

Interior first-person mission game, roughly grades 3–4. Fifteen shifts across
six departments.

```sh
npx vite          # dev
npx vite build    # dist/
```

## It runs on the shared engine

`src/gameState.js`, `time.js`, `utils.js`, `terminology.js`, `interactions.js`,
`simulation.js`, `questionUI.js`, `dashboard.js`, `save.js`, `constants.js` and
`player.js` are **one-line re-exports of `../../../gamekit/engine/core/`**.
Editing them here does nothing; edit the engine, and build all three games.

`theme.js` adapts this game's content. `vite.config.js` needs
`resolve.dedupe: ['three']` and `server.fs.allow: ['..']`.

## Still this game's own

`src/main.js` (the wiring), `src/world.js`, `src/interiorEnv.js`,
`src/hospitalProps.js`, `src/plan.js`, `src/npcs.js`, and all content.

## Two known gaps

- **The world cannot migrate yet.** It needs
  `gamekit/engine/world/interiorBuilding.js`, which does not exist —
  `interiorSite.js` has the parts but not the world-contract exports.
- **Bios are one-liners** (median 14 characters), so the passage quiz falls back
  to a role question for 32 of the 37 characters. Fixing that is content: those
  characters want two or three sentences each, as the other two games' casts
  have. `content` invariants are checked by `validateContent.mjs`.
