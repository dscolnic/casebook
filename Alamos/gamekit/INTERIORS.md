# Interiors

How to work on the inside of a place, and what is already done for you.

## The loop

```sh
npm run check <theme>        # placement.mjs gates: nothing hung in a wall or over a doorway
npm run shots <theme>        # a picture of every room
open shots/<theme>/index.html
```

Look at the contact sheet before deciding anything is finished. Every visual
defect in this project's history was found by a person walking into a room, and
almost every one of them was obvious in a still.

## The one mistake that keeps happening

**Where a surface is and which parts of it are solid are different questions,
and anything you hang on a wall has width.**

Four separate rounds were lost to this. Boards floating in doorways. Boards hung
*inside* the wall, so only the dark edge showed. A mural running past the end of
the wall it was painted on. Every check passed every time, because they all asked
whether a *point* had a wall behind it, and a notice board is a metre across: its
middle can be on the wall while both ends hang over the opening.

Two things now stop it, and both only work if you use them:

- `markWallMounted(objects, faceX, toward, label)` — say that something goes on a
  wall. `placement.mjs` fires rays through the whole face of anything tagged, from
  both sides. Anything untagged is invisible to it.
- `markStructure(objects, kind)` — say what the walls are made of. Guessing which
  meshes are walls from their proportions is how a checker starts lying.

Both live in `engine/world/interiorKit.js`. `wordedSign`, `paintMural` and
everything `furnishRoom` places on a wall already call them.

**Wall furniture goes proud of the line, never on it.** A caller passes the line
its walls were *built on*, and a wall is raised centred on that line — so a 0.18 m
wall on x = 2.1 shows its face at 2.01, and anything hung at 2.07 is inside the
plaster. `furnishRoom` takes `wallThickness` and does the arithmetic once. If you
place something on a wall yourself, do the same: `wallT / 2 + 0.03`.

## What builds what

| Builder | Used by | Gets the wall layer? | `placement.mjs` sees it? |
|---|---|---|---|
| `interiorSite.js` (a floor: spine + rooms) | quantum only — the only theme with a `plan.js` | yes | yes |
| `interiorBuilding.js` (the room behind a door) | every theme's `interiors.js` | yes | yes |
| `furnishArea` in `interiorKit.js` | Deep Watch's submarine, the Hospital, Bring Them Home | **no** | **no** |

`furnishRoom` and `furnishCorridor` carry the whole wall layer: signs with real
text, posters with artwork on them, pinboards, a quota per wall from that wall's
own length, and spread positions so nothing bunches at one end.

`furnishArea` carries none of it. It takes the caller's own makers and places them
apart from each other, which is all a submarine compartment or a mission-control
tier wanted at the time. **Three of the games are furnished entirely through it.**

## Known gaps, roughly in order of what they would buy

1. **`furnishArea` has no wall layer.** Deep Watch, the Hospital and Bring Them
   Home get no posters, no pinboards, no per-wall quota, no spread — none of the
   work that fixed the rooms in Quantum. This is the single biggest one.
2. **Case-room signage is generic in eight of nine themes.** `interiorBuilding`
   never passes `notices` through to `furnishRoom`, so every theme except Quantum
   falls back to the built-in notices matched on room name. Letting `interiors.js`
   carry `notices` per room is a small engine change and then authoring.
3. **`shots.js` exists for one game.** Only `themes/bring_them_home/shots.js`.
   Without one, a theme with no `plan.js` falls back to turning on the spot at the
   spawn — eight views of one place. A hand-built world needs its own list; that
   file is the worked example.
4. **`placement.mjs` cannot reach a hand-built world at all.** The Hospital is
   entirely beyond it; Bring Them Home and Deep Watch are covered only for their
   case rooms. Screenshots are the only cover those have, which is why (3) matters
   more for them than for anyone else.
5. **The Hospital's four small east-side rooms are under the piece bar** — Clean
   Supply 4, Clean Laboratory 8, Quiet Room 9, Pharmacy 10. They are 4–6 m rooms,
   so a flat count of 15 is the wrong bar for them; density is the honest measure.

## Reports, not gates

```sh
node engine/dev/pieceDensity.mjs --all        # how furnished every room is, thinnest first
```

It counts placed pieces per room against floor area. It cannot tell you whether a
room *looks* furnished — six pieces in a corner and six spread evenly measure the
same and read completely differently. That is what the contact sheet is for.
