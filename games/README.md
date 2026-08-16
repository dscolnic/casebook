# games/ — First Person Learning

The fifteen mission-based games, built. This is the app's front door: `/` redirects
to `/games/`, and every page here is behind the same Clerk sign-in gate as the rest
of the site.

**Nothing in here is authored in this repo.** The games are built in the Alamos
repo (`Nuclear/Alamos/gamekit`), where each one is a theme plus a book file, and
copied here as static output. The two files that *are* written here are
`index.html`, the shelf, and this README.

## Layout

| Path | What | Written by |
|------|------|------------|
| `index.html` | the shelf — cards, subject filters, account header, resume line | by hand, here |
| `games.json` | the catalogue: title, course, field, place, hero, campaign length, whether it is built | the sync tool |
| `<theme>/` | one built game — `index.html` plus hashed assets | `vite build --base ./` |
| `shots/<theme>.jpg` | the card image | the sync tool, from `gamekit/shots/` |

## Updating the games

In the Alamos checkout:

```sh
cd gamekit
npm run sync-casebook                      # build all 15, copy them here
npm run sync-casebook -- --only headwater  # just one
npm run sync-casebook -- --no-build        # copy what is already in dist/
```

It finds this repo at `../../../casebook`; pass `--out /path/to/casebook` or set
`CASEBOOK_DIR` if it is somewhere else. Then commit `games/` here — the output is
checked in deliberately, so the Replit app serves static files and never runs a
build.

Adding a game is a row in `gamekit/tools/games.js` and a sync. The shelf reads
`games.json`, so it needs no edit.

## The account

Three endpoints in `server/index.js` back the campaigns, and the games call them
from `engine/core/cloudSave.js` in the Alamos repo:

- `GET  /api/save?theme=<id>` — the account's campaign, read once at boot, before
  the game reads its own localStorage. The newer of the two wins.
- `POST /api/save` — the campaign, debounced. The games autosave constantly.
- `DELETE /api/save?theme=<id>` — restarting the campaign clears the account's
  copy too, or the next boot restores the run the player just threw away.
- `GET /api/saves` — every campaign in progress, for the shelf's resume line.
  Signed out is an empty list, not a 401.

A finished campaign also posts to `/api/results` with `game: 'fpl'`, which is the
same table the deduction games write, so one streak covers both.

**Served anywhere else, all of that turns itself off.** The first failed call
disables the layer for the session and the game runs on localStorage, which is
how `gamekit/dist` works behind a plain static server. A game copied out of here
onto any host still plays.

## After a schema change

`game_saves` is new. `server/db.js` holds the schema and it is applied by hand:

```sh
node scripts/init-db.js
```

The running server never issues DDL — see the note in `server/db.js`.
