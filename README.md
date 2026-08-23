# Casebook

Two families of educational games behind one account.

**The app's front door is First Person Learning** — fifteen mission-based games
where you walk a place, answer a question you cannot answer without the science,
and hand off. `/` goes to `/games/`; see [`games/README.md`](games/README.md) for
how they get here (they are built in the Alamos repo and synced, not authored
here) and how a campaign is kept against the account.

### Contact form

`/contact.html` is public (`server/publicPaths.js`) and posts to `/api/contact`
(`server/contact.js`). The destination address is **never written on the page** —
a `mailto:` there publishes the inbox on the one page outside the sign-in gate —
so it lives in the environment. On Replit, set these as Secrets:

    CONTACT_SMTP_USER   the Gmail address messages are sent FROM and TO
    CONTACT_SMTP_PASS   a Google App Password (not the account password; needs 2FA on)
    CONTACT_TO          optional — where to deliver, if not the same address
    CONTACT_SMTP_HOST   optional — defaults to smtp.gmail.com
    CONTACT_SMTP_PORT   optional — defaults to 465

With no credentials the route is **inert rather than broken**: every message is
still written to `contact_messages` and a line is logged saying the mail was not
sent. That table is the record and the email is a notification about it, because
SMTP fails silently and a lost report is indistinguishable from one nobody sent
— `SELECT * FROM contact_messages WHERE NOT emailed` is the ones that did not
arrive. The table is new, so `scripts/init-db.js` has to be run once against the
development database before Publish can diff it into production.

`node scripts/test-contact.js` covers the validation, the honeypot and the rate
limit with no server, no database and no credentials.

### Subscriptions and entitlement

`server/entitlement.js` answers one question — may this account open this course
— and it is the half that is ours rather than Stripe's or Apple's. Two rules
built into it:

**It is off by default.** `ENTITLEMENT_ENFORCED` unset means every signed-in
account plays everything, exactly as before. That is what lets the layer be
deployed and corrected while a beta runs unlocked, instead of a flag day where
billing, enforcement and a public release land in one deploy.

**It fails open.** A database that will not answer lets the player in and logs.
Letting somebody play free for an afternoon costs a subscription; locking a
paying teacher out in front of a class costs the customer.

    ENTITLEMENT_ENFORCED=1        turn the paywall on (restart required)
    FREE_THEMES=hospital,quantum  courses anybody signed in may play
    ENTITLEMENT_GRACE_DAYS=3      how long past a period end access survives
    ENTITLEMENT_OFFLINE_DAYS=7    how long a client may believe it while offline

What is gated is course files and nothing else — not the shelf, not the
catalogue, not the hero shots, and not `/api/*`, because a lapsed subscriber
must still sync the day they played and delete their account. A lapsed
subscription is a **lock, not a delete**: no save, result or account is touched,
which is what terms.html promises.

`entitlements` is one row per (user, source), so a renewal updates rather than
accumulates and a webhook delivered twice is not two subscriptions. Any live row
is enough — somebody may hold a personal subscription and a seat in a school
licence. `current_period_end` NULL means no end.

Grants by hand, which is how a beta tester, a comp or a school on a purchase
order gets access:

    node scripts/grant.js who dan@example.com
    node scripts/grant.js grant user_2abc... --days 90
    node scripts/grant.js grant user_2abc... --forever --source school --plan "Rye High"
    node scripts/grant.js list
    node scripts/grant.js revoke user_2abc...

`node scripts/test-entitlement.js` covers the decisions and four traps, each a
plausible implementation that passes every positive assertion: a `startsWith`
path test that locks the shelf itself, cancelling ending access immediately
rather than at the period end, a null period end sorting as zero so a school
licence expires on someone's personal date, and no grace period at all.

**Nothing bills anybody yet.** There is no Stripe, no StoreKit and no webhook —
`grant()` is the only writer. Adding a processor means calling it from a webhook
handler and nothing else changes.

### The iOS app

Capacitor, bundle `com.firstpersonlearn.app`, project at
`ios/App/App.xcodeproj`. `npm run ios` rebuilds `ios_www` and syncs it into the
project — **run it before every archive**, or the app ships the previous bundle.

`capacitor.config.json` sets **`scrollEnabled: true`**, and that is a decision
rather than a default. It was `false`, which disables scrolling for the whole
webview: the shelf, the privacy page, the terms and the teacher dashboard could
all be tapped and none of them could be scrolled, which on the shelf means the
games below the fold do not exist. What `false` was protecting against — a drag
in a game world rubber-banding the page — is already handled, because
`engine/core/touch.js` calls `preventDefault()` on every handler with
`passive: false`, so a touch inside a game is consumed before the page sees it.
If bounce ever does appear in a world, the fix belongs in the engine's own
stylesheet (`overscroll-behavior: none`), not in a flag that breaks every
document page in the app.

Everything below is **Casebook**, the deduction games, which the app **no longer
serves**. `/casebook.html`, `/casebook_static.html`, `/reckon.html` and
`/character.html` redirect to the shelf, `/api/shelf` and `/api/case/:id` answer
410, and startup no longer syncs the case bank. Nothing was deleted — the files,
the packs, the build tool and every row they wrote are all still here, and
undoing it is deleting one middleware in `server/index.js` and restoring two
calls in `main()`. The documentation below is kept for that reason and is
otherwise out of date about how the app runs.

---

Clue-style **educational deduction games** that share one engine. In each case you solve three
columns — **WHO** is behind it, **WHERE** it culminates, **WHAT** is really happening — by traveling
a small board, questioning informants who *hold* clues, and passing quizzes tied to a "figure of the
day" (a real pioneer whose profile pops up before each meeting).

Every case has the same soul: a **WHAT** column with an **OVERCLAIM trap** (the sensational wrong
answer — sabotage, a bomb, aliens, a hack) and a **DISMISSAL trap** (the do-nothing wrong answer —
"nothing's wrong," "act of God," "operator error"). The truth is the nuanced middle: a real,
concealed, systemic problem you can prove. **Winning teaches judgment, not trivia.**

## Play it

`casebook.html` is a single, self-contained, offline file — open it in any browser, or serve the
folder and open it. On a static HTTPS host (e.g. Replit → Static deployment of the repo root) it's
also an installable PWA: open on iPhone Safari → **Share → Add to Home Screen** for a full-screen,
offline app. See [`IPHONE.md`](IPHONE.md) for that and a native Xcode/WKWebView wrapper
(`casebook_ios/`).

## Status

- **15 games authored.** 13 are built into `casebook.html` and verified end-to-end; two more
  (`rocket`, `reactor`) pass every gate on disk — run the build (below) to inject them.
- **50 more games fully designed and stubbed** — balanced 7 per weekday across 7 categories
  (Machines & Structures, Energy & Matter, Body & Medicine, Earth & Sky, Code & Signals,
  Law/Money/Power, Mind & Culture), with 876 distinct real figures deduped against the existing set.
  They await the prose-authoring run.

## Architecture

- **Engine = one file:** `casebook.html`. Generic and pack-driven; it renders a shelf of games and
  loads whichever "pack" the player picks. Design is the "Editorial" look (NYT-minimal, WCAG-AA,
  full keyboard support); quiz options shuffle at render.
- **Games = data packs.** Each game is one JS object (`casebook_build/pack_<id>.js`). Structure
  (ids, real pioneers, board, informants, the three columns + truths) is fixed; the prose is authored.
- **Build tool:** `casebook_build/build_casebook.js` validates every pack (schema, 18 topics,
  solvability sim, length-parity anti-tell, exactly-one-expert, profile length) and injects the
  passing ones into `casebook.html`. Idempotent.

```bash
cd casebook_build
node build_casebook.js          # validate + inject passing packs; prints [OK]/[FAIL] per pack
```

Authoring spec and quality gates: [`casebook_build/SPEC.md`](casebook_build/SPEC.md).

## Classes — a teacher's view of a roster

A class is a join code. A teacher makes one at `/teacher.html`, reads the code
out, and students enter it once at `/join.html`. After that every First Person
Learning campaign those accounts play shows up on the teacher's dashboard.

It reads the saves the games already write (`game_saves.state`) and adds nothing
to what a game has to do — no engine change, no rebuild of `games/`.

- `server/classes.js` — the roster, and the aggregation. **Authorisation lives in
  the SQL**: every teacher-side query joins `classes ON teacher_id = $caller`
  rather than fetching a row and checking ownership afterwards. This is student
  data, and a join that returns nothing cannot be forgotten the way an `if` can.
- Two numbers, and the difference between them is the point. *Correct* is what
  the student's campaign records — which counts an answer that was got wrong,
  bought back and given again. *Right first time* is correct with no retry on
  record. A lesson the class only passes on the second attempt reads as 100% in
  one column and 0% in the other.
- The lesson table is sorted worst first, and the tie-break is deliberate: two
  lessons both at 0% first time are not the same problem if one of them was
  eventually got right, so eventual-correct breaks the tie before sample size
  does.
- No route lets a teacher change a campaign, and there should not be one — the
  table is worth reading precisely because it says what happened.

New tables (`classes`, `class_members`) are in `server/db.js`. As with the rest
of the schema, DDL is **not** run at startup:

```bash
node scripts/init-db.js      # apply the schema to the dev database, once
npm test                     # aggregation checks — no database needed
```

## Rooms — several people, one campaign

`/room.html` makes a room and hands out a five-character code. Everyone who
enters it lands in the same day of the same game, sees the others walking around
it, and shares one clock and one set of calls. The game side is
`Alamos/gamekit/engine/core/room.js`; this repo holds the room itself.

- `server/rooms.js` — the registry, the claim table and the countdown, over a
  WebSocket on `/ws/room`. The server is a **relay, not a second copy of the
  game**: it stores the campaign blob opaquely and never computes it, because the
  rules live in the engine and a second copy of them here would have to be kept
  in step for ever.
- **Campaign writes are last-write-wins, and the claim table is what makes that
  safe.** One player at a time may have a stop open, so the only mutation two
  people can make in the same instant is serialised. The accepted limit is
  simultaneous spending, which can lose a debit; the fix would be a field-level
  merge and it is not worth its complexity for six players.
- **`dayLeft` is the exception and is genuinely server-owned** — a browser tab
  that goes to the back stops getting animation frames, so a client-owned
  countdown would freeze for whoever alt-tabbed. The room's pace drops to a
  quarter while *anybody* has a question panel open, which is the only reason
  the server tracks panels at all.
- **The socket is authenticated by a ticket, not by the session cookie.** Clerk's
  middleware runs on Express requests and an HTTP upgrade does not go through it,
  so asking for a ticket is an ordinary signed-in POST and the auth layer stays in
  one place. Tickets are single-use and expire in a minute.
- Only the durable half of a room is in Postgres (`rooms`): the campaign and the
  clock. Who is connected, where they are standing and which stop is claimed are
  in memory, because after a restart none of them are true.

Needs `node scripts/init-db.js` for the `rooms` table, and `ws` from
package.json.

## Scaling to more games — the batch pipeline (`casebook_build/batch/`)

Unattended, resumable, idempotent production so you don't babysit a session:

- `manifest.json` — the source of truth: every game, day-tagged, with its mystery brief and status.
- `batch_driver.py` — authors each pending game headless (`claude -p`), then runs, for **zero tokens**,
  the correctness/parity gates **and** `style_gate.js` (bans stock AI phrases + cross-game echoes),
  then a second **editor pass** that varies voice. Rides through rate limits; state lives on disk.
- `style_gate.js` — the anti-staleness gate. `generate_batch50.js` — assembles the 50 designs into
  stubs + manifest. `com.casebook.batch.plist` — launchd runner for hands-off overnight runs.

```bash
export ANTHROPIC_API_KEY=sk-ant-...        # in Replit, use the Secrets manager — never commit it
cd casebook_build/batch
python3 batch_driver.py --status           # see all games + status
python3 batch_driver.py --once             # author + gate + edit ONE game (smoke test / cost check)
python3 batch_driver.py                     # then run the full set unattended
```

## Repo layout

| Path | What |
|------|------|
| `casebook.html` | the engine + injected games (the app) |
| `manifest.webmanifest`, `sw.js`, `icon-*.png` | PWA runtime (offline install) |
| `casebook_build/` | engine source, `pack_*.js` games, build tool, `SPEC.md`, generators |
| `casebook_build/batch/` | the batch authoring pipeline (driver, gates, manifest, launchd) |
| `teacher.html`, `join.html` | classes: the teacher's dashboard and the student's join page |
| `room.html` | co-op: make or join a room, which sends you into a game with `?room=` |
| `casebook_ios/` | native WKWebView wrapper (`IPHONE.md` has build steps) |
| `casebook_pwa/` | icon generator + PWA notes |
| `calibration-witness.html`, `germline-witness.html` | the two original standalone games (tone reference) |
| `CASEBOOK_HANDOFF.md` | detailed project handoff / history |

## Note on facts

Cases are fictional; **the figures of the day are real** and their profiles must be accurate — that's
the #1 quality gate. When authoring at scale, the binding risk is factual accuracy across thousands
of biographies, which is why the pipeline pairs authoring with deterministic gates and (recommended)
a fact-check pass.
