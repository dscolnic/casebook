# project-y-fps — gone. The game is `gamekit/themes/projecty`.

Project Y was the last game with an entry point of its own. It is an ordinary
gamekit theme now, and this directory is a tombstone: a bookmark, a stale
`npm run dev` in a terminal tab, or a session that remembers the old layout
fails here instead of quietly booting a copy of the game that no longer gets
fixed.

```sh
cd gamekit
THEME=projecty npm run dev      # the game
npm run check projecty          # its checks
npm run shots projecty          # its screenshots
```

## What moved where

| Was | Is |
| --- | --- |
| `src/main.js`, 833 lines | `gamekit/src/main.js`, shared with every theme here |
| `index.html`, `styles.css` | gamekit's, shared |
| `src/npcs.js`, 890 lines | `engine/people/crowd.js`, plus `themes/projecty/outfits.js` for what people wear |
| `src/world.js` | nothing. It was an adapter over `engine/world/outdoorTown.js`, which the shared entry point calls directly |
| `site.js`, `props.js`, `interiors.js`, `theme.js` | `gamekit/themes/projecty/` |
| `src/props.js`, `src/env.js` | `gamekit/themes/projecty/legacy/` — the forest, the Tech Area wire and the duckboards were the part of the old world worth keeping |
| `content/` | `gamekit/themes/projecty/content/`, generated from `gamekit/books/project-y.yml` |

## What was dropped, deliberately

The weekly funding economy (`fundSelected`, `fundAllSelected`, `advanceWeek`)
and the special-request vignettes. Both lived only in the forked entry point,
and the shared loop replaced the weekly funding model with the day countdown
everywhere else. Bringing them back means making them optional features of
`gamekit/src/main.js` — not restoring this directory.

Everything is in git if any of it is wanted again:

```sh
git log --oneline -- project-y-fps
git show <commit>:Alamos/project-y-fps/src/main.js
```
