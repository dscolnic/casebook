# Casebook

Two families of educational games behind one account.

**The app's front door is First Person Learning** — fifteen mission-based games
where you walk a place, answer a question you cannot answer without the science,
and hand off. `/` goes to `/games/`; see [`games/README.md`](games/README.md) for
how they get here (they are built in the Alamos repo and synced, not authored
here) and how a campaign is kept against the account.

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
| `casebook_ios/` | native WKWebView wrapper (`IPHONE.md` has build steps) |
| `casebook_pwa/` | icon generator + PWA notes |
| `calibration-witness.html`, `germline-witness.html` | the two original standalone games (tone reference) |
| `CASEBOOK_HANDOFF.md` | detailed project handoff / history |

## Note on facts

Cases are fictional; **the figures of the day are real** and their profiles must be accurate — that's
the #1 quality gate. When authoring at scale, the binding risk is factual accuracy across thousands
of biographies, which is why the pipeline pairs authoring with deterministic gates and (recommended)
a fact-check pass.
