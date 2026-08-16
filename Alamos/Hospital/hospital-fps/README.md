# hospital-fps — gone. The game is `gamekit/themes/hospital`.

Hospital Heroes was the last game with an entry point of its own, and the last
with a hand-built world. It is an ordinary gamekit theme now, and this directory
is a tombstone: a bookmark, a stale `npm run dev` in a terminal tab, or a session
that remembers the old layout fails here rather than quietly booting a copy of
the game that no longer gets fixed.

```sh
cd gamekit
THEME=hospital npm run dev      # the game
npm run check hospital          # its checks
npm run shots hospital          # its screenshots
```

## What moved where

| Was | Is |
| --- | --- |
| `src/main.js`, 900 lines | `gamekit/src/main.js`, shared with every theme |
| `src/world.js`, 1,070 lines | `engine/world/interiorFloor.js`. `interiorSite.js` was generalised out of *this floor*, so the flip renamed the plan's keys rather than rebuilding the place |
| `src/plan.js` | `themes/hospital/plan.js`, in the engine's own plan shape |
| `src/npcs.js`, 951 lines | `engine/people/crowd.js`, plus `themes/hospital/outfits.js` for the scrubs |
| `src/hospitalProps.js`, 766 lines, and `src/interiorEnv.js` | `themes/hospital/props.js` on top of `engine/world/interiorKit.js`, which has had two years of fixes this fork never got |
| `index.html`, `styles.css` | gamekit's, shared |
| `content/` | `gamekit/themes/hospital/content/`, generated from `gamekit/books/hospital.yml` |

## What is worth knowing

The ward is unchanged as a *place* — same corridor, same thirteen rooms, same
room ids, so the book and every mission still point at the rooms they always
did. What changed is who builds it.

`audience: { grade: 2 }` still scales the whole interface up 1.18×, and
`playerRadius` is 0.34 here rather than the usual 0.45: the doorways are 1.25 m
and getting wedged in one is the fastest way to lose a player who is eight.

Everything is in git if any of it is wanted again:

```sh
git log --oneline -- Hospital/hospital-fps
git show <commit>:Alamos/Hospital/hospital-fps/src/world.js
```
