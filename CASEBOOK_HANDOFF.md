# CASEBOOK — handoff for Fable

You are picking up a project mid-flight. Read this whole file first, then continue. Everything
you need is in `/Users/scolnic/code/Nuclear/` — nothing lives in a session scratchpad anymore.

## What Casebook is
**Casebook** is a collection of Clue-style, educational deduction games that share ONE engine.
Each game: the player solves three columns — **WHO** is behind it, **WHERE** it culminates,
**WHAT** is happening — by traveling a 3-place board, meeting 3 informants who HOLD clues, and
passing 3-question quizzes tied to a "figure of the day" profile (a real pioneer) that pops up
before each meeting. The soul of every case: a **WHAT** column with an **OVERCLAIM trap** (the
sensational wrong answer — "bioweapon / aliens / sabotage / cyberattack") and a **DISMISSAL trap**
(the do-nothing wrong answer — "nothing's wrong / act of God / pilot error"). The TRUTH is the
nuanced middle: a real, concealed, systemic problem. Winning teaches judgment, not trivia.

Two finished standalone games already exist and are the tone reference:
`calibration-witness.html` (nuclear physics) and `germline-witness.html` (CRISPR).

## Architecture (important)
- **Engine = 1 file**: `/Users/scolnic/code/Nuclear/casebook.html`. It is generic and pack-driven.
  It renders a shelf of games and loads whichever "pack" (data + prose) the player picks. DO NOT
  fork the engine per game.
- **Games = data packs.** Each game is one JS object. The build tool validates all packs and
  injects the passing ones into `casebook.html` at the `/*__GAMES__*/` marker as `const PACKS=[...]`.
- Build directory: **`/Users/scolnic/code/Nuclear/casebook_build/`** contains:
  - `SPEC.md` — the authoring spec + hard quality gates. **Read it before authoring.**
  - `build_casebook.js` — assembles the CRISPR pack (inline) + every `pack_*.js`, validates each
    (schema, 18 topics, solvability sim, length-parity, exactly-one-expert, profile length),
    and injects the PASSING packs into `casebook.html`. Idempotent; safe to re-run.
  - `crispr_topics_block.js` — the CRISPR game's 18 topics (used by build_casebook.js). Leave alone.
  - `generate_starters.js` — regenerates the 9 starter packs' STRUCTURE (only needed if you want
    to change a mystery's skeleton; normally you won't).
  - `pack_<id>.js` — the 9 non-CRISPR games. Structure (ids, real pioneers, board, informants,
    TOPICMAP, the three columns + truths) is ALREADY FILLED. Prose is what gets authored.

## How to build & verify (do this after every change)
```
cd /Users/scolnic/code/Nuclear/casebook_build
node build_casebook.js
```
It prints `[OK ]` / `[FAIL]` per pack (with reasons) and injects the passing ones. Then open
`/Users/scolnic/code/Nuclear/casebook.html` in a browser to play the shelf.

## CURRENT STATE — updated 2026-07-11 (overnight session)
| # | id | Title | Discipline | Status |
|---|----|-------|-----------|--------|
| 0 | crispr | The Germline Witness | CRISPR / gene editing | ✅ PASSING (in casebook.html) |
| 1 | aircrash | The Fall of Ardent 9 | Aerospace | ✅ PASSING |
| 2 | signal | The Vasca Signal | Astronomy | ✅ PASSING |
| 3 | outbreak | The Meridian Fever | Epidemiology | ✅ PASSING (parity fixed 67→17%) |
| 4 | forensics | A Death at Ashford House | Forensic science | ✅ PASSING (parity fixed 70→26%) |
| 5 | volcano | The Halcyon Caldera | Volcanology/seismology | ✅ PASSING (parity fixed 56→22%) |
| 6 | blackout | The Cascade | Electrical grid | ✅ PASSING (parity fixed 76→24%) |
| 7 | tower | The Verrin Tower | Structural engineering | ✅ PASSING (22% parity) |
| 8 | chemplant | The Ardsley Works | Chemical/process eng | ✅ PASSING (22% parity) |
| 9 | software | Fatal Exception | Software safety | ✅ PASSING (20% parity) |

**ALL 10 games are live and end-to-end verified** — headless jsdom playthrough of every game passes
**81/81 checks**: correct accusations win, overclaim endings fire, no shelf/story spoilers, options
shuffle, no page errors. Verification harness: `scratchpad/playall.js` (run against casebook.html).

### Stretch: 5 MORE games (in progress) — brings the shelf to 15
`generate_more.js` (in casebook_build/) defines 5 new cases with 90 vetted real pioneers and writes
their starters: **marine** (ferry capsize / naval architecture), **dam** (earth-dam failure /
hydraulics), **rail** (derailment / railway safety), **rocket** (launch failure / spaceflight —
Feynman-O-ring lineage), **reactor** (meltdown / nuclear). Each is the same overclaim/dismissal/
concealed-truth triad. Starters are generated; authoring runs via resumable chunked-edit agents
(marine/dam/rail first, then rocket/reactor). Author remaining stubs the same way, then rebuild +
run playall.js. NOTE: run generate_more.js only once — re-running overwrites any authored prose.

### Changes made this session (beyond the original handoff)
- **Engine redesigned** to the "Editorial" look (NYT-minimal: white, Georgia serif, hairline rules,
  one blue accent, flat verdict tiles, right notepad rail). WCAG AA verified; full keyboard support;
  aria-live verdicts; prefers-reduced-motion. See memory `casebook-design-direction`.
- **Quiz options now SHUFFLE at render** (engine `renderQuestion`) — kills the "expert is always A"
  position tell that affected every pack. Length parity is now the only remaining tell.
- **Spoilers removed**: shelf cards + title stories + teases no longer name the true WHAT. SPEC.md
  updated to forbid it. Applied to all authored packs.
- **iPhone app**: `casebook.html` is now an installable PWA (manifest.webmanifest, sw.js offline
  cache, icon-{180,192,512}.png, apple meta, safe-area insets). Native WKWebView wrapper in
  `casebook_ios/`. Instructions in `IPHONE.md`. Icon generator: `casebook_pwa/make_icons.js`.
- Parity-fix helper scripts live in the session scratchpad; the reusable measurement one-liner is in
  section A below.

**Do NOT launch ~9 parallel subagents (that hits the session limit). 2–3 at a time is safe.**
Authoring a whole ~90KB pack in ONE Write fails (connection closes) — instruct agents to fill the
stub with MANY small per-topic Edits; that preserves partial progress and survives resumes.

## REMAINING WORK, in priority order

### A. Fix length-parity on packs 3–6 (outbreak, forensics, volcano, blackout) — MECHANICAL
These are fully authored and good; they only fail the anti-tell gate: the correct (`v:"expert"`)
option is the LONGEST choice too often (must be the longest in ≤ ~45%, ideally ~33%, of questions;
keep all four options within ~12 characters of each other). Fix WITHOUT dumbing down wrong answers:
lengthen the shorter wrong/partial options with specific detail, and/or trim the expert option.
Measure per pack:
```
node -e "const P=require('./pack_outbreak.js').PACK;let L=0,t=0;Object.values(P.TOPICS).forEach(x=>x.q.forEach(q=>{t++;const m=Math.max(...q.o.map(o=>o.t.length));if(q.o.find(o=>o.v==='expert').t.length===m)L++;}));console.log(Math.round(100*L/t)+'%')"
```
Iterate until each is ≤45%, then `node build_casebook.js`.

### B. Author packs 7–9 (tower, chemplant, software) — FULL PROSE
Open each `pack_<id>.js`. Structure is done; fill every empty `""` and `[]` per `SPEC.md`:
18 TOPICS (lede, 250–330-word person-centered profile, in-character `frame`, 3 questions × 4
options with exactly one `expert` + one-sentence `fb` each), 9 STORIES, 4 `story` paragraphs,
`endings` (win expert/sound/named + overclaim + dismissal + wrongNames), and `overclaimTease`.
Use the passing packs (aircrash, signal, crispr) as worked examples of tone/length/quiz style.
Each topic's `// cell:` comment names which informant tests it (write `frame` in that voice).

Their mysteries (overclaim → dismissal → TRUTH; guilty WHO / WHERE it culminates):
- **tower** (structural): sabotage → freak-wind act-of-God → **a concealed value-engineering cut
  to the safety factor**. WHO = Marcus Ketterly (developer, id `dev`); WHERE = Design & Project
  Office (`office`), where the buried warning memo & change-orders live.
- **chemplant** (chemical): sabotage → freak accident → **safety systems (scrubber/flare/
  refrigeration/interlocks) disabled to cut costs** (Bhopal pattern). WHO = plant manager Voss
  (`manager`); WHERE = the Plant Manager's Office (`office`).
- **software** (systems safety): a malicious hack → operator error → **a concealed software defect
  (a race condition) plus a removed hardware interlock** (Therac-25 pattern). WHO = manufacturer
  software lead Renwick (`maker`); WHERE = the Manufacturer's Software Office (`vendor`).

### C. Final pass
`node build_casebook.js` should show all 10 `[OK ]` and inject 10 packs. Open `casebook.html`,
click through the shelf, and spot-check one full playthrough per new game (read a profile →
answer a quiz → collect clues → accuse). Confirm every game is solvable within its 8-day budget
(the build's solvability sim already checks this — all currently pass at 4 visits / ≤5 days).

## Hard quality gates (build enforces most)
1. Real, accurate facts about every pioneer (each `sci` is a genuine figure). No invented people.
2. **Length parity** (the #1 failure mode — see section A).
3. Exactly one `expert` per question; 4 options; valid verdicts (`expert|partial|wrong|danger`);
   every option has `fb`.
4. Profiles 250–330 words, person-centered, teaching the concept toward rejecting both traps.
5. Solvable within the day budget (sim in build).

## Note on the pilot's purpose
This is the "make 10 to see how it looks / measure the yield" pilot for a possible large library.
Yield so far: of 9 delegated packs, 2 passed clean, 4 need only a length-parity rebalance, 3 were
not written (killed by the session limit) — i.e. the dominant real failure mode is the length tell,
which is mechanical to fix. Worth noting in any writeup back to the user.
