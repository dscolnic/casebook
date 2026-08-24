---
name: alamos-shipping
description: How Alamos games ship: dist/ + the gallery, npm run sync-casebook, tools/games.js as the catalogue, cloudSave.js and the ending-card rating, and the ?room=CODE co-op protocol (relay/clock/lock table, last-write-wins, per-room save slot). Read before touching build output, the casebook app, accounts, ratings, or multiplayer.
---

## The games ship to an app that has accounts

`gamekit/dist` behind a static server is how these are played locally. The other way is the
**casebook** app (`~/code/casebook`, Replit, Express + Clerk + Postgres), where `/` is the game
shelf and every page is behind a sign-in.

```sh
cd gamekit
npm run sync-casebook                      # build all 15, copy them into casebook/games/
npm run sync-casebook -- --only headwater  # one of them
npm run sync-casebook -- --no-build        # copy what dist/ already has
```

Built output is **committed to casebook deliberately.** The theme is chosen at build time, so
serving nineteen games means nineteen builds, and running those on the app host would put ten
minutes of vite in front of a deploy for output that only changes when a game does.

**`tools/games.js` is the catalogue** — one row per game, read by both front doors
(`tools/gallery.mjs` writes `dist/index.html`, `tools/sync-casebook.mjs` writes `games.json`
for the app's shelf). It was inline in gallery.mjs and was two games stale within a week of
Wellmere and Red Sand shipping, which is what extracting it is for.

**`engine/core/cloudSave.js` is the account, and it is inert without one.** It reads the
campaign at boot, debounces the write (the engine autosaves every tick and treats saving as
free), clears the server copy on restart, and posts a row when a campaign finishes. The first
failed call turns the module off for the session, so a 404 from a static server and a 401 from
a signed-out session both mean "carry on with localStorage". Two things it must keep doing:
the read happens in `index.html` **before** `src/main.js` is imported, because the entry point
reads the save during module evaluation; and the local timestamp is re-stamped from the
server's own `savedAt` after a write, because two browsers on one account do not agree what
time it is and a fast clock would silently stop that device pulling the account's campaign.

**The rating on the ending card goes down the same pipe.** A finished campaign offers five stars
(`showEnding` in `engine/core/app.js`, `readRating`/`postRating` in `cloudSave.js`), one row per
account per game in `game_ratings`, and the shelf averages them under every card. Three things it
has to keep doing: the block is drawn **hidden** and shown only once `readRating()` answers, because
whether there is an account cannot be known synchronously and a static host would otherwise get five
dead stars — a control that answers nothing teaches the player not to press the next one; a rating
already given is **shown back**, since a second campaign re-rates rather than voting twice; and a
POST that fails says so, because a star that lights up on a request that never landed is a lie the
player cannot see. On the shelf the same distinction is `ratingsLive` — no endpoint means no rating
line at all, not thirty cards reading "Not rated yet".

## Several people can play one campaign

`?room=CODE` turns a game into a co-op session: one campaign, one countdown, everybody in the
same place able to see each other. Without that parameter every line is inert, which is why
nothing had to be switched off for the other games — `engine/core/room.js` returns an empty
answer to every question when `constants.js` `ROOM` is null. Made and joined at `/room.html`;
the rooms live in `casebook/server/rooms.js`.

- **The server is a relay, a clock and a lock table — not a second copy of the game.** Putting
  the rules on the server would mean the engine's decisions living in two repos. Clients
  compute the campaign; the server stores the last blob anybody sent.
- **So the campaign is last-write-wins, and the claim makes that safe.** A stop can only be
  opened by whoever the server grants it to, so the one mutation two people can make at the
  same instant is serialised. Not airtight — two people spending money in the same second can
  lose a debit — and that is an accepted limit.
- **The clock is the exception: `dayLeft` is the server's.** Not for authority, but because *a
  background tab gets no `requestAnimationFrame`*, so a client-owned countdown stops the moment
  somebody alt-tabs. `tickDay` reads the room's number; the pace is applied server-side, because
  only the server knows whether anybody has a panel open.
- **The budget is still computed on a client**, because it needs the map and the server has no
  world to measure a route through. `startDay` computes it and hands it over.
- **Position carries a SPACE, not just coordinates.** Interiors are built four kilometres along
  +x, so a teammate through a door is at a coordinate meaning something else entirely; without
  the space id they render as a figure far out across the terrain.
- **A remote player is `buildBody` plus `stepGait`.** Their look is derived from a hash of their
  id **by hand**, not through `pickLook`, which pulls from the world's shared seeded generator:
  drawing from it when somebody joins would move every subsequent draw.
- **Nothing new draws through walls.** The cone over somebody the day wants is still the only
  exception. A teammate behind a bulkhead is found on the co-op panel, which gives a bearing and
  a distance.
- **A room gets its own save slot** — `gamekit_<theme>_room_<CODE>_v1`. Pointing a shared
  campaign at the theme's own slot would overwrite the player's solo game, which is house rule 14
  through a different door.
- **The room's campaign is hydrated in `index.html`, after the cloud save and before
  `src/main.js`** — same ordering constraint as `cloudSave.hydrate`, and second because the shared
  campaign has to win. `connect()` is bounded by a timeout: a socket that opens and never says
  `welcome` must not leave somebody looking at a title card for ever.

Testing it is awkward: **two browser tabs cannot both be tested at once**, because the hidden one
gets no animation frame and its loop stops sending. The partner has to be a plain WebSocket
client. There is no checker for any of this — `npm run check` asserts nothing about the wire, the
same gap that let A and D strafe backwards for years.

## The deploy, end to end, and why there is no branch merge in it

**One repo, two branches, and they are not two versions of one tree.**

| | `deep-watch-integration` | `main` |
| --- | --- | --- |
| holds | `Alamos/` — books, themes, engine, tools | `games/`, `server/`, the app |
| has `Alamos/`? | yes | **no** |
| who reads it | this workshop | Replit, which pulls main and nothing else |

So a change to a book, a manifest or the engine is invisible to a player until
the games are **rebuilt** and the built output reaches main. Pushing the
workshop branch is not shipping. It took a "why can I not see it on Replit" to
find that out loud.

```sh
cd gamekit
npm run check                     # green first, always
npm run sync-casebook             # builds every theme, writes ../../../casebook/games
cd /Users/scolnic/code/casebook   # the SAME repo, checked out on main
git add games && git commit && git push origin main
```

`sync-casebook` takes `--only theme,theme` and `--no-build` when the output in
`dist/` is already current, and `--out` or `CASEBOOK_DIR` when the casebook
checkout is somewhere else. It writes `games/games.json` beside the shelf;
`games/index.html` belongs to the app and is not touched.

**Do not merge the branches to "get it onto main".** They have diverged by
hundreds of commits in both directions, and the merge would import the entire
workshop — books, themes, engine, screenshots — into the branch a live Reserved
VM with Clerk auth and co-op rooms is serving. The sync is the supported path
and the only one the tooling knows about.

**The build flag that will bite is in `sync-casebook`'s own header**: every game
is built `--base ./`. Without it a game asks for `/assets/…` at the server root,
which is casebook's root, and comes up blank with a 200 and no error anywhere.
