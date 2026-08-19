# Alamos — mission-based learning games

Eight first-person, mission-driven educational games on three.js, plus the
shared engine they run on. Each is the same loop in a different setting:
15 missions × 3 stops, walk to a place, answer a science question, hand off.
No combat, no weapons.

**`gamekit/NEW_GAME.md` is how to build one of these** — the whole path in
order: decide the course, scaffold, write the book, build the place, meet the
writing bar, meet the question bar, check and print. It carries the bar each step
has to clear and the checker that enforces it. Read it before starting a ninth
game, and add to it when the next rule turns up.

**`GAME_IDEAS.md` is what to build next** — the subject gaps across the eight,
and the candidate games worked up against them, each with its course, its place
and the argument it turns on.

**`gamekit/SEQUENCING_PASS.md` is how to fix *when* a shipping game teaches each
idea** — the smaller pass beside the rewrite: leave every question where it is and
put the concepts in an order the player can follow. It carries the rollout for the
other twenty-seven courses, ranked, and the two checkers that lie during the pass.
The price of admission is `t` on a syllabus concept, and that is **64 of 724**
today, so it is 26,000 words of curriculum prose rather than an engine project.

**`gamekit/REWRITE_PASS.md` is how to re-author a game that already ships** —
a parallel edition at the same grade, sandboxed so the shipping game cannot be
damaged, with the delivery snapshot as the invariant and a teardown that costs
one `rm -rf` and three reverted lines. Ranked candidates are in it; the trigger
is equations the course never computes, never format mix.

**`README.md` is the landing page** — start there for a new game: it names the
two documents to read first and the order the work goes in.

**`GAMES.md` is the inventory** — all eight games, what each one is, where its
content and its place live, and what is still unfinished. Read it first if you
are picking this up cold. **`gamekit/STORY_SPEC.md` is the story contract** —
what a campaign needs beyond correct content, and the checker that enforces it.

**Read `gamekit/THEME_CONTRACT.md` before touching world code.** It is short and
every rule in it cost hours to learn.

**Read `gamekit/INTERIORS.md` before working on the inside of a place.** It has
the check-and-look loop, which builder each game's rooms come from — three of
them are furnished outside the shared fit-out entirely — and the one mistake that
has now been made four times.

## The eighteen games

`GAMES.md` is the full inventory with what each one teaches. This table is the
short version — the place, and the command that runs it.

| Game | Where | The place, and why it looks unlike the others | Run it |
| --- | --- | --- | --- |
| The Contaminated City | `gamekit/themes/contamcity/` | Riverton: a wide, bright river city. College chemistry | `THEME=contamcity npm run dev` |
| Deep Watch | `gamekit/themes/deepwatch/` | A submarine — its own world, one line of compartments | `THEME=deepwatch npm run dev` |
| Outbreak: Riverton | `gamekit/themes/outbreak_riverton/` | A hospital campus in week three: courtyards, triage marquees, container labs, a decon tunnel on the main route, a fence with one gate | `THEME=outbreak_riverton npm run dev` |
| Bring Them Home | `gamekit/themes/bring_them_home/` | Mission Control — its own world. One room, four tiers stepping down to a wall of plot boards; the teams are rows, not rooms | `THEME=bring_them_home npm run dev` |
| Planetary Defense | `gamekit/themes/planetary_defense/` | A mountain ridge, played entirely at night: one dark road, domes, a radar dish, red service lamps | `THEME=planetary_defense npm run dev` |
| Blackout | `gamekit/themes/blackout/` | Calder Switching Station: a flat river plain, a switchyard, lattice towers walking off the map. Senior-high electrical engineering | `THEME=blackout npm run dev` |
| Aftershock | `gamekit/themes/aftershock/` | Kestrel Bay three days after: granite bench above, liquefied fill below, and a 1.8 m fault scarp walked between them | `THEME=aftershock npm run dev` |
| Quantum | `gamekit/themes/quantum/` | An interior spine that is a temperature gradient, walked warm end to cold | `THEME=quantum npm run dev` |
| The Trial | `gamekit/themes/the_trial/` | One long floor of a coordinating centre; the walk down it is distance from the patient. AP Statistics | `THEME=the_trial npm run dev` |
| Ice Core | `gamekit/themes/icecore/` | A deep-drilling camp on a polar plateau: modules on legs, flag lines, a trench under a tower | `THEME=icecore npm run dev` |
| Headwater | `gamekit/themes/headwater/` | A five-storey tower in a gorge beside a dam: one glazed wall onto the spillway, and no ceiling over the hallways. Calculus | `THEME=headwater npm run dev` |
| Wellmere | `gamekit/themes/seedbank/` | A breeding station on a headland, laid out in concentric rings by isolation distance; sea on three sides, one causeway. AP Biology, the heredity half | `THEME=seedbank npm run dev` |
| Safety Factor | `gamekit/themes/midway/` | Corbin Park: a shut amusement park, and the rides are the syllabus — tower, coaster, carousel, wheel, bumper floor, ship, flume. AP Physics 1, taught in derivations | `THEME=midway npm run dev` |
| Red Sand | `gamekit/themes/redsand/` | A propellant plant on Mars: modules buried in regolith along one track, an ascent vehicle on a pad with a gauge that fills as the campaign does, and a butterscotch sky. AP Chemistry, the back half | `THEME=redsand npm run dev` |
| Sightline | `gamekit/themes/sightline/` | The Hallam Exchange: one hall with the Ferrier Street corner rebuilt across the end of it, and the identification distance painted on the floor. AP Psychology | `THEME=sightline npm run dev` |
| Ground Truth | `gamekit/themes/groundtruth/` | Station 12, Sablon Flats: a salt flat, a 60 m instrumented mast and a storm season. AP Physics C E&M, ten derivations | `THEME=groundtruth npm run dev` |
| Project Y | `gamekit/themes/projecty/` | Los Alamos 1943–45, outdoor mesa | `THEME=projecty npm run dev` |
| Hospital Heroes | `gamekit/themes/hospital/` | Children's hospital, interior, ~grades 3–4 | `THEME=hospital npm run dev` |

**A game's silhouette comes from its world module.** Two themes on the same
world look like each other however the palette differs, which is why three of
the five here either bring their own world (`themes/<name>/world.js`) or carry a
props layer heavy enough to change the shape of the space. Worlds:
`engine/world/outdoorTown.js`, `engine/world/interiorFloor.js`, and a theme's
own. Nocturnal games set `look.dayWindow` and `atmosphere.nightSky`.

**Deep Watch is the first game built the way the rest are supposed to be built.**
It came from `deep_watch/`, which was its own engine — a persistent boat, five
simulation systems, a stage-based mission runtime. The boat came across as
`themes/deepwatch/boat/` behind an adapter; the simulation did not, because a
flooding rate that rises while you read a gauge has nowhere to live in a loop
that is walk, answer, hand off. Everything else is one book file,
`books/deep-watch.yml`, and `themes/deepwatch/site.js` reads the boat's own
`LAYOUT` so there is still one description of the compartments.

A theme may bring its own world: declare `world: 'themes/<name>/world.js'` in
site.js and vite.config.js points `@world` at it.

**All three share one engine** (`gamekit/engine/core`). Their `src/*.js` logic
files are re-export shims. `gamekit/` also holds the world layer, the tools and
the content importers.

## Content is normalised on the way in

`engine/content/normalize.js` runs once, in `engine/core/theme.js`, before any
core module reads a lesson. It canonicalises `game.type` (books write
`Sequence`, `SEQUENCE` and `Science Tank`), expands diagnosis packs into the
lessons that name them, retypes a format that has no data for its format,
registers estimate specs across a lesson and its reviews, and reports a group
with nobody on the roster. **Themes ship data; they do not ship repair code.**

## The one thing that will trip you up

**`main.js` is shared now, and there are no forks left.** The wiring every game
needs identically lives in `engine/core/app.js` — `createInteriors`,
`makeActivate`, `exposeDebug` — and every theme runs off `gamekit/src/main.js`.

It was three entry points for most of this repo's life, and the cost is worth
remembering: the passage quiz shipped working in one of them and invisible in
the other two, the crowd's stand-aside fix had to be written three times, and a
TDZ bug that put a red banner over Project Y every frame existed only because
that game had its own copy of a loop the others had already fixed. Project Y
went first (833 lines of `main.js`, its own `index.html` and stylesheet, an
890-line `npcs.js`), then Hospital Heroes (900, 1,070-line world, 951-line
`npcs.js`). Both directories are tombstone READMEs now.

Shared (edit once): `gameState, simulation, questionUI, dashboard, save,
constants, time, utils, terminology, interactions, player, personQuiz, map,
figures`, and everything under `engine/world` and `engine/people`.

Per game (edit three times): `main.js`, `index.html`, `world.js`, props, plan/site,
and all content — `curriculum, missions, divisions, leaders, historicCharacters`.

## Starting a new game

**`gamekit/NEW_GAME.md` is the whole thing**, in the order to do it in, with the
writing bar and the question bar that took seven games to learn. Short version:

```sh
cd gamekit
npm run new-theme <name>                 # a town   — or `-- --interior` for a floor
npm run check <name> && THEME=<name> npm run dev          # green and walkable already
node tools/import-book.mjs books/<name>.yml <name> --verify   # then write the real game
```

The scaffold imports a starter book, so what comes out is a **complete playable
game** — four areas, four days, a worked example of every question format — and
the baseline is green before you touch it. A theme served from `gamekit/` needs
no entry point of its own: `gamekit/src/main.js` names nothing game-specific.
The campaign is as long as the book; 15 missions is what the shipped games have,
not a requirement.

**Every game is a book file.** `tools/BOOK_TEMPLATE.md` is the format, with a
worked example of every question format; the importer checks it instead of
guessing, and refuses to write a book that would produce an unplayable game.
`books/` holds all seven, `tools/export-book.mjs` writes one out of a game, and
`engine/dev/bookParity.mjs` — inside `npm run check` — fails if a book stops
regenerating the content its game ships. The three games that predate the format
were converted that way; their `src/*.js` content files are now one-line doors
onto the generated `content/`. The docx importers stay only for the two Word
documents they were written for:

```sh
node tools/import-missionbook.mjs <book>.docx <theme> --dry   # MISSION n / Activity n.m books
node tools/import-designbook.mjs  <book>.docx <theme> --dry   # SHIFT n • CASE m books
```

Run both with `--dry`; the one that reports missions is the right one. A docx
has to be *inferred* from, and every inference has cost a defect — 63 lessons
typed as the nearest format the importer knew, nine packs referenced and never
imported. Only the place — `site.js` or `plan.js` — and the props stay outside
the book.

## The games ship to an app that has accounts

`gamekit/dist` behind a static server is how these are played locally. The other
way they are played is the **casebook** app (`~/code/casebook`, Replit, Express +
Clerk + Postgres), where `/` is the game shelf and every page is behind a
sign-in.

```sh
cd gamekit
npm run sync-casebook                      # build all 15, copy them into casebook/games/
npm run sync-casebook -- --only headwater  # one of them
npm run sync-casebook -- --no-build        # copy what dist/ already has
```

Built output is **committed to casebook deliberately.** The theme is chosen at
build time, so serving eighteen games means eighteen builds, and running those on
the app host would put ten minutes of vite in front of a deploy for output that
only changes when a game does.

**`tools/games.js` is the catalogue** — one row per game, read by both front
doors (`tools/gallery.mjs` writes `dist/index.html`, `tools/sync-casebook.mjs`
writes `games.json` for the app's shelf). It was inline in gallery.mjs and was
two games stale within a week of Wellmere and Red Sand shipping, which is what
extracting it is for.

**`engine/core/cloudSave.js` is the account, and it is inert without one.** It
reads the campaign at boot, debounces the write (the engine autosaves on every
tick and treats saving as free), clears the server copy on restart, and posts a
row when a campaign finishes. The first failed call turns the whole module off
for the session, so a 404 from a static server and a 401 from a signed-out
session both mean "carry on with localStorage". Two things it must keep doing:
the read happens in `index.html` **before** `src/main.js` is imported, because
the entry point reads the save during module evaluation; and the local timestamp
is re-stamped from the server's own `savedAt` after a write, because two
browsers signed into one account do not agree what time it is and a fast clock
would silently stop that device pulling the account's campaign.

## Several people can play one campaign

`?room=CODE` turns a game into a co-op session: one campaign, one countdown, and
everybody walking around the same place able to see each other. Without that
parameter every line of it is inert, which is why nothing had to be switched off
for the other sixteen games — `engine/core/room.js` returns an empty answer to
every question when `constants.js` `ROOM` is null.

Made and joined at `/room.html` in the casebook app. The rooms themselves live in
`casebook/server/rooms.js`.

- **The server is a relay, a clock and a lock table — not a second copy of the
  game.** Putting the rules on the server would mean the engine's decisions
  living in two repos, and this one already knows what that costs. So the clients
  compute the campaign and the server stores the last blob anybody sent.
- **Which means the campaign is last-write-wins, and the claim is what makes that
  safe.** A stop can only be opened by whoever the server grants it to, so the
  one mutation two people can make at the same instant is serialised. Everything
  else two players do at once either does not write the campaign or writes a part
  nobody else is in. It is not airtight — two people spending money in the same
  second can lose a debit — and that is an accepted limit rather than an
  oversight.
- **The clock is the exception: `dayLeft` is the server's.** Not for
  authority — it is pure arithmetic — but because *a background tab gets no
  `requestAnimationFrame`*, so a client-owned countdown stops the moment somebody
  alt-tabs. The same trap as the screenshot rule, arriving in the one place where
  it desynchronises six people instead of confusing one. `tickDay` reads the
  room's number instead of counting down; the pace is applied server-side,
  because only the server knows whether *anybody* has a panel open.
- **The budget is still computed on a client**, because it needs the map and the
  server has no world to measure a route through. `startDay` computes it and
  hands it over.
- **Position carries a SPACE, not just coordinates.** Interiors are built in a
  district four kilometres along +x, so a teammate who has walked through a door
  is at a coordinate that means something else entirely; without the space id
  they render as a figure standing far out across the terrain. Avatars are only
  drawn for a matching space.
- **A remote player is `buildBody` plus `stepGait`** — the rig the crowd already
  uses. Their look is derived from a hash of their id **by hand**, not through
  `pickLook`, which pulls from the world's shared seeded generator: drawing from
  it when somebody joins would move every subsequent draw, so a player walking in
  would change what the next tree looked like.
- **Nothing new draws through walls.** The cone over somebody the day wants is
  still the only exception, and a second one would end the rule. A teammate
  behind a bulkhead is found on the co-op panel instead, which gives a bearing
  and a distance.
- **A room gets its own save slot** — `gamekit_<theme>_room_<CODE>_v1`. Pointing
  a shared campaign at the theme's own slot would overwrite the player's solo
  game the first time they joined somebody else's, which is house rule 14
  arriving through a different door.
- **The room's campaign is hydrated in `index.html`, after the cloud save and
  before `src/main.js`** — same ordering constraint as `cloudSave.hydrate`, and
  second because the shared campaign has to win. `connect()` is bounded by a
  timeout: a socket that opens and never says `welcome` must not leave somebody
  looking at a title card for ever.

Testing it is the awkward part, and the reason is house rule–adjacent: **two
browser tabs cannot both be tested at once**, because the hidden one gets no
animation frame and its loop stops sending. The partner has to be a plain
WebSocket client. There is no checker for any of this — `npm run check` asserts
nothing about the wire, which is the same gap that let A and D strafe backwards
for years.

## A measurement can be wrong in a way that looks like a finding

**A number costs what a number costs, however it is spelled.** Flesch–Kincaid is
words-per-sentence and syllables-per-word and nothing else, so the way a book
writes its quantities moves the grade without changing a word of the prose:
"eleven point four" is three words and five syllables where `11.4` is one and
one, and `11.4` also contains a full stop, which the sentence counter counts.
Spelling numbers out pushes a card *up* the scale; using digits pushes it
*down*. The two conventions are wrong in opposite directions, which is worse
than either alone, because it spreads the games apart on an axis that is not
reading difficulty at all.

It was found by sweeping the fifteen mission cards, ranking the games, and
noticing that Red Sand — thirteen numbers spelled out, no digits anywhere — came
second, while Aftershock, which does the exact opposite, came ninth. The first
published table was partly a ranking of house style. `tools/readability.js`
normalises both forms to one dotless token now, and
`engine/dev/readabilityParity.mjs` (inside `npm run check`) asserts that the same
sentence scores identically written both ways.

The general rule, which is the expensive half: **a measurement that produces a
plausible answer is not thereby a working measurement.** Every check in this
repo asserts that content is wrong in some way; this one asserted nothing about
itself, so it reported confident numbers for weeks that were partly an artifact
of the formula. When a new metric is added, write the case where two inputs that
should score the same actually do — before trusting anything it says.

The books remain free to spell numbers however they like; nothing enforces a
convention, and the choice is a voice decision. What is enforced is that the
measurement cannot see the difference.

**And it bit a third time, at the sentence boundary.** `normaliseNumerals` collapses
a run of number words into one dotless token so that "eleven point four" and `11.4`
cost the same. It did that across sentence ends: "…survive into the second one.
Three features…" became "…the second 0 features…", so two sentences were counted as
one and that card's words-per-sentence read 38 where the text has 18. It surfaced
because a guide written for `QUESTION_BRIEF.md` measured over the 28-word cap while
containing no sentence longer than 22 — the prose was right and the ruler was
wrong. The swallower now stops at terminal punctuation, `readabilityParity` carries
the pair both ways, and it also asserts the sentence *count* directly, because
parity alone cannot see a boundary that both forms lose identically. Putting the bug
back fails that case and only that case.

**And the same rule cost the whole thing again, one level up.** Nine
middle-school editions shipped with every passage at Flesch–Kincaid 4 to 6, all
sixteen checks green — and the first sixth grader to play one found it much too
hard. Both facts were true. The reading score is words-per-sentence and
syllables-per-word, so it cannot see that "which explanation is consistent with
all four readings" demands more than "how far did it move", however plainly each
is written. The editions were derived from senior-high stops: the prose came
down two grades and the *demand* stayed exactly where an AP course had put it.

`engine/dev/questionLoad.mjs` is the missing measurement, and it applies to any
theme at grade 8 or below. Four numbers, because a limit written as a sentence
is a limit nobody can fail: **at most two operations** in an estimate with
nothing over 9,999 or under 0.1; **twelve words** in an option, since four of
them have to be held in mind at once; **two named people** in a stop and four
across a day; and a **budget on judgement stops** — 20% of the campaign, one a
day, and none before day 3, because a player who has answered nothing has no
ground to judge from and the first stop of day 1 decides whether there is a day
2. Most of the instruments *are* the demand — TRACE is "agreement is not
independence", ATTEST is "the record is not the condition" — so they are
budgeted rather than banned. CONTROL and VERIFY are deliberately not budgeted:
the fair test and predict-act-measure are what a middle-school science course is
about, and a young player should meet them more often, not less.

**And then the same failure, one level in: the budget counted the instruments
and nobody measured one.** A sixth grader stopped on Bring Them Home's day-9
TRACE, whose prose is fine — scene at Flesch–Kincaid 7.4, verdict at 6.3 — and
whose *board* was the twelfth-grade board, unchanged: five channels, four
sources, name one source **and** tick exactly two of the five, all-or-nothing.
Sweeping the nine grade-6 editions against the games they came from, **37 of 38
instrument boards were identical in size to their AP parents** —
`derive-edition` rewrites the words and copies the block, and nothing looked at
the block. Two more numbers in `questionLoad`: **four items in any list graded
as an exact subset** with no feedback until commit (TRACE channels, TRACE
sources, ATTEST claims, VALUE options), the same argument as the twelve-word
option; and **six** where you compare the list and pick one, or the panel
narrows live as you work. Eight stops across six editions failed, every one of
them TRACE or ATTEST, and all eight are fixed by dropping the second distractor
rather than the argument.

Two things that cost a revision. **The importer floors a TRACE at four channels
and an ATTEST at four claims**, so a junior board sits *at* the limit, not under
it — and a first attempt also capped `sources × 2^channels` at 32, which no legal
TRACE can reach. A limit the format's own minimum cannot satisfy is a ban on the
format, not a limit on its size; that number is reported now, not enforced. And
**conjunctive grading is reported, never failed**: TRACE marks "name the source"
and "keep the right channels" together, so partial understanding scores as zero —
but CHAIN and ROUTE are two-part by construction, and failing it would ban them.

**Two more things a sixth grader found that no check could see.** The first is a
term built out of ordinary words. `checkJargon`'s lexicon is morphemes, so
"cabin pressure" and "power bus" — six ordinary words between them, four
syllables — were invisible to every test in the file, and day 1 of Bring Them
Home used five such terms before explaining any of them. `PHRASES` in
`checkJargon.mjs` is the list, matched whole, applied only at grade 8 and below
because an AP course is entitled to say "cabin pressure" without stopping. The
second is that **once is not teaching**. A glossary chip explains a word to
somebody who thinks to open it; a scene explains it to somebody reading the
scene; a verdict explains it to somebody who has just been wrong about it. Those
are three different readers and often the same child on three different days, so
a junior edition now has to explain every term it uses in at least two places, in
different words. Both fail an edition and advise a game written to its own
audience from scratch.

And **the shift opening is read before every day**, which is what made its length
worse than its grade. The editions inherited theirs from the senior games almost
word for word: a mean of 107 words, up to nine sentences, one of them 33 words
long. `checkStory` now caps a junior stake at 85 words and any sentence in it at
24. The four beats fit in seventy — Bring Them Home's ten now average 73 words at
grade 4.2, and say the same things.

The one that will bite next: fixing `ordinary()` so that "moved" is as ordinary
as "move" (a length floor was rejecting the stripped stem) reclassified "sided",
which cost Headwater's `Limit` its `core: true` flag — it had been core only
because "one-sided" looked technical. A vocabulary list is load-bearing in four
tools; change it and re-import every book before believing `bookParity`.

## A field nothing renders is where instructions go to die

`engine/dev/fieldCoverage.mjs` reads the *renderers* rather than the content: it
carves `questionUI.js` and `instruments.js` into named blocks, follows each
format's panel through the functions it calls, and collects every `ch.x` and
`lesson.x` on that path. A sentence the book wrote that appears on none of them
is a sentence that reaches no screen. It is **advisory** for now, because neither
of its two findings is clean yet and a gate in front of unfinished content work
is a gate that acquires a permanent `--advisory` flag.

- **Three formats print a hardcoded instruction over the author's own**, at 164
  stops: SEQUENCE (98 of 176), PROTOCOL (47 of 126) and SCIENCETANK (19 of 32).
  SEQUENCE says "Put the 4 steps in order, earliest first" whatever the book
  wrote, and about one ordering item in nine is graded on cost, risk or
  reversibility rather than on time — ContamCity's evidence workflow, whose four
  cards are photograph, headspace, non-destructive spectrum, destructive method,
  three of which say they consume nothing. The axis was authored in `setup` and
  in `task`, and `tools/BOOK_TEMPLATE.md` described `setup` as "what the panel
  says above the question", which nothing has ever done. **`axis` and `ends` are
  the fix** — the instruction line and the two rail captions, authored per stop —
  and eleven stops across eight games carry them. PROTOCOL and SCIENCETANK are
  the same fix and have not had it.
  **The first version of this said twelve formats and 181 stops, and nine of
  those were the checker's own fault.** Every instrument panel opens with
  `ask(ch, fallback)`, which reads `ch.question || ch.task` — so all twenty of
  them do render the author's line. But `ask` is `const ask = (ch, fallback) => …`
  with a template-literal body, and the carver only knew `function name(){}` and
  `const NAME = {}`. It never carved `ask`, so nothing that called it inherited
  its reads, and nine instruments were reported mute. The `missing` guard could
  not catch it because that only checks the *entry points*, which all existed —
  a shared helper going missing is exactly the hole it does not cover. This is
  the false negative the file's own header warns about, found in the file itself
  within the hour, and the reason three selftest cases now name `ask` directly.
- **`scene` was checked and `story` was rendered** — **fixed**, and it is one
  character short of a one-line fix. All five gates read `scene ?? story`
  (`validateContent` twice, `checkVoice`, `checkNames`, `probeQuestions`,
  `placeStory`); `storyBriefText` alone read `lesson.story || …`. 122 stops write
  both and mean different things by them, so on every one of those the
  reading-level rule, the 40-word sentence rule and the GIVEAWAY probe were
  grading a string the player never saw. ContamCity's grade-6 edition checked 26
  scenes at Flesch–Kincaid 5.8 and displayed stories at 12.5, one of them 2.6
  against 15.1; the hospital's grade-2 reader got 4.4 where 1.3 had passed. And
  the drifted stories run 42 to 96 words against the scene's 27 to 38, which is
  not merely longer — ContamCity's ordering stop opened on "some observations
  leave the sample exactly as they found it … a destructive method gives the best
  identification and gives it once", which is the answer to the question beneath
  it. The scene-carries-the-teaching mistake, still shipping years after the
  rewrite that removed it, through the one field nothing was reading.
  **The measurement rule bites twice here.** A set of read field names cannot see
  a fallback chain's *order*, and the order was the whole defect — both fields
  are read either way. So `briefPrefersScene()` reads the chain itself, and it
  was confirmed by putting the bug back and watching that one case, and only
  that case, fail. Every check in this repo should be able to show that.
  **What is left over is content work:** those 122 `story` values, 8,589 words of
  it, are now displayed nowhere. They are still in the books and still exported.
  Either fold what each one adds into its scene or delete it, but a stop should
  not carry two situations.

**And `fieldCoverage` cannot see the other end of the pipe.** It compares the
content a theme ships against the renderers, so a field the *importer* drops is
invisible to it: nothing is in the content to be uncovered. CHAIN's per-link
`reading` — the observed state of that link, and the only thing that makes
"which one governs" answerable rather than a guess — was authored in eleven of
the fifteen books, under three different names (`reading`; `capacity` + `unit`;
`evidence`, once as a chain-level map keyed by link id with a key naming no link
at all), and `import-book.mjs` mapped none of them. It had never rendered.
Meanwhile three of those games printed hints saying "inspect the link readings",
"use each reading" and "the largest number on the screen is not automatically
the governing one", with no numbers on the screen. The fix is one name —
`reading` — with the other three *refused* by the importer rather than aliased,
because an alias is how a field ends up under four names next time, and four
traps in `npm run traps` that make each refusal fire. **The rule: when a book
key stops reaching the game, look at the importer before the renderer.** A
`need()` that refuses an unknown key is cheap; a key silently dropped is a
sentence nobody will ever read.

**And it happened a second time, in the format written for exactly this.** A
player answering Aftershock's day-6 TRACE was told the verdict "a threefold
Flats-to-vault ratio becomes roughly 4.8 relative to competent rock" against a
board that printed neither the 1.6 nor the 4.8, and whose two dependent channels
read `3.0 (expected value published in the fortnight report)` — a provenance note
with no statement of what 3.0 counts. The book had authored the correction, as
`originalRatio` / `referenceAmplification` / `correctedRockRatio`; `import-book.mjs`
mapped none of the three and no renderer had ever read the block. So the one fact
the whole stop is about — what the reference turned out to be — was in the book,
in the answer text and on no screen. `correction` is now `what` / `was` / `now` /
`effect` / `corrected`, **all strings**, printed as a given above the channels
with `corrected` held back for the verdict. Strings because a numeric
`referenceAmplification: 1.6` rendered by the engine is how `3.0` got onto a board
meaning nothing: **a correction is a factor in one game and a clock offset in
another, and the unit is the author's to state.** Three refusals, all trapped —
the old numeric keys by name rather than aliased, a correction whose `was` equals
its `now`, and a channel `reading` that is a bare number. Two dead keys came out
with it: `tolerance` on a TRACE (nothing about a trace is graded numerically) and
a channel's own `independent:` flag, which was a second description of the
`independent` list the grade actually reads, dropped on the floor in six books.

The selftest is the load-bearing part, and it earned that on its first run by
failing an assertion its own author had written backwards — that the ask card
shows `scene`. Two of its cases would otherwise invert silently: if the sink list
stops being applied, `setup` reads as covered and the file reports all-clear; if
`showChallengeForStop` is followed, every format inherits every other format's
reads and the file reports all-clear again. Both were live bugs during the hour
it was written.

**Three defects the estimate panel could hide, all found by a player.** They are
in `validateContent` now, and each is a class rather than a stop.

- **A stop that declares two equations.** "Degrees lost = energy lost ÷ energy
  for one degree. Energy lost = watts × seconds", with three slots and a unit
  conversion already done in the prose — a sixth grader read that and said there
  was too much going on. One relationship per stop at grade 8 and below, and
  `questionLoad --sweep` lists the multi-step estimates in *every* game, senior
  ones included, because it fails nothing and the same smell is worth seeing at
  any level.
- **A tile whose label is not its value.** The player clicks the label and the
  panel adds the value, and nothing compared them. `apply-conversions` refuses to
  guess at a `labels` list whose length changed, so a re-targeted estimate keeps
  the old tiles: Outbreak's grade-6 panel read 90, 99, 10, 9,801 over values
  10000, 0.01, 0.9, 0.99, and Deep Watch's asked about pressure at ninety metres
  while grading gallons per minute. Ten stops across seven games. Both readings
  are internally consistent, which is why the formula check passed them.
- **An equation chip that is not the stop's equation.** The syllabus attaches an
  equation by keyword, and a bare key like "how long" put `time = distance ÷
  speed` on a thermal card whose panel divided joules. `activity` did it to
  Project Y's critical-path stop, `megawatt` to Blackout's demand forecast. The
  check compares the chip against the relationship, the template and the worked
  solution — in words where the equation is written in words, and by symbol where
  it is written as `df/dt = (P_gen − P_load) / 2H`, because those two currencies
  share no vocabulary. Six games were wrong; three of them were wrong because the
  equation the stop actually computes was not in the syllabus at all, and adding
  it is the fix.

The general shape, again: each of these renders perfectly, grades consistently,
and is wrong in a way only a person playing it can see — until somebody writes
down what agreement would look like.

It runs `--selftest` inside `npm run check`, on two whole fixture campaigns whose
answer is known. That is not ceremony — the selftest failed the first time it
ran and found two real holes, one of them a gate that only fired on BALLPARK and
so could not see senior-high arithmetic left on a retyped stop.

## No format holds more than a third of a campaign

**`gamekit/DIVERSITY_PASS.md` is the pass**, and the rule is one line: at a 45-stop
campaign no answer format may hold more than **15** stops, 10 at a 30-stop junior
edition, 18 at Hospital's 55. `engine/dev/formatMix.mjs` is the gate, inside
`npm run check`, with `format-debt.json` recording the campaigns still over it —
**75 stops across 10 campaigns** when the pass started.

**The cap is the gate and nothing else is**, because the two obvious numbers are
worthless as targets: across the seventeen senior campaigns the effective format count
scores **ρ −0.07** against whether the syllabus equations are computed, and CHOICE
share −0.01, where the **share of stops carrying arithmetic scores +0.69**. So a
conversion has to pay for itself in teaching — an equation the syllabus lists and no
question computes, or a mechanism concept the player only ever picks off a list — and
the format is chosen from what the stop is already about. A stop that cannot support
one honestly stays as it is and a different stop moves instead.

**Why the catalogue looked like that, measured rather than guessed.** The books
authored it — `grep format: books/seedbank.yml` gives 29 CHOICE of 45, and nothing was
retyped by the engine. The first nine books average **33%** CHOICE among their board
stops and the last six average **59%**, because the early ones had a source document
carrying exercise shapes (the seven FPS interaction guides in `books/copy/`, and the
two docx design books whose activity types map onto PROTOCOL, SEQUENCE, BALLPARK and
TRIAGE) while the late ones were written straight from a one-paragraph idea in
`GAME_IDEAS.md`. Two controls settle it: Outbreak had no interaction guide and has the
best mix in the repo, because it came from a design book; and Quantum had no source
document either but its book header states its own rule — *every question is about an
instrument, a number or a choice* — and it has the best board diversity in the
catalogue. **Writing the distribution down before writing 45 stops is the whole
mechanism**, and `tools/BOOK_TEMPLATE.md` never asked for one: grep it for mix,
variety or distribution and there are no hits, while the nineteen instruments live in
a different file an author has to know to open.

**The pass is done: 76 conversions across ten campaigns, and every campaign in the
catalogue is inside the cap.** What it bought, besides the histogram: **five campaigns
now compute every equation on their syllabus** where four of them did not (Aftershock
2/10 → 10/10, The Trial 6/11 → 11/11, Wellmere 3/6 → 6/6, Red Sand 8/9 → 9/9, junior
Wellmere 1/4 → 4/4), **26 rows left `curriculum-debt.json`**, and select-only mechanism
concepts went 7 → 1 in Wellmere, 3 → 0 in The Trial, 5 → 0 in Ground Truth, 7 → 2 in
Sightline. Ground Truth's OPERATE tier went from 2 stops to 13, Sightline's from 4 to 14.

**The junior editions needed four rules the senior games never hit**, and each one is a
`questionLoad` gate doing its job. The **judgement budget is per campaign and per day** —
TRACE, ATTEST, VALUE, STRESS, DEGENERACY, DIAGNOSIS and HOLDOUT are all format-demanding,
so a pass that reaches for instruments reaches into that budget; junior Wellmere went to
30% against a 20% limit and three conversions had to be re-authored as CHAIN, VERIFY and
BALLPARK (CONTROL, VERIFY, CHAIN and the boards are free). **Nothing under 0.1 in the
arithmetic** — the fix is a different unit, per cent of gravity instead of g, "five in
every hundred" instead of 0.05. **Four items is the board limit and it counts the label** —
a junior CHAIN card is twelve words *including* what it transfers. And **grade 2 is a
different language**: all eight Hospital conversions failed the reading gate first time,
one at grade 8, and what passes is one clause per sentence with no subordination.

**A conversion can create an ordering defect, so run `equationOrder` after every one.**
Red Sand's day-3 assay stop became a BALLPARK that computes the reaction quotient,
which paid the cap and the last equation gap together — and immediately failed, because
Q against K is built on ΔG = ΔH − TΔS and nothing computed that until day 5. The fix
was a second conversion putting the base on day 2, not a new debt row. A stop that
starts computing something starts owing its prerequisites.

**And two measurement forks turned up while doing it, both of the kind this file keeps
paying for.** `export-book.mjs` wrote each `takesAsRead` declaration out as the
player-facing `assumes` line the importer derives from it, so a book recovered from a
game silently lost the field four checkers read — and `bookParity` could not see it,
because the generated content is byte-identical either way. And `import-book.mjs` kept
its **own copy of the keyword matcher**: when `keywordHit` learned that `3 : 1` and
`3:1` are the same ratio, the gate saw a computed equation while the importer stamped
it as merely mentioned, so one stop was simultaneously teaching the monohybrid ratio
and reported as asking a derived equation before its base. The importer imports the
shared function now. Both are `readabilityParity`'s rule in a new file: a measurement
must not be able to tell one spelling of a thing from another, and two copies of one
rule will drift the first time either is corrected.

## Checks — one command, several tools

```sh
cd gamekit
npm run check              # every registered theme, every check
npm run check hospital     # one of them
```

`themes.json` maps a theme name to its directory, so a bare name works for all
three games even though two of them live in their own package directories.
Behind `check`:

```sh
node engine/dev/validateContent.mjs <theme>   # content agrees with itself + the contract
node engine/dev/smokeCampaign.mjs  <theme>    # the engine can reach and grade every stop
node engine/dev/probeQuestions.mjs <theme>    # no question answerable without the science
node engine/dev/answerShape.mjs    <theme>    # the longest option is not the answer key
node engine/dev/checkVoice.mjs    <theme>    # cards brief the player, they do not perform
node engine/dev/placeStory.mjs    <theme>    # the landscape matches the story told on it
node engine/dev/checkPassages.mjs <theme>    # talking to somebody teaches something
node engine/dev/personStops.mjs    <theme>    # every mission person opens their question
node engine/dev/equationOrder.mjs  <theme>    # nothing is asked before the equation it is built out of
node engine/dev/conceptOrder.mjs   <theme>    # and nothing is claimed before the concept it is built out of
node engine/dev/conceptOrder.mjs --selftest   # and it can tell an earlier day from the same day
node engine/dev/placement.mjs      <theme>    # everything hung is on a wall, not in it or over a doorway
node engine/dev/questionLoad.mjs   <theme>    # the questions are as small as the sentences (grade 8 and below)
node engine/dev/questionLoad.mjs --sweep      # every game: estimates that smush two equations together
node engine/dev/questionLoad.mjs --selftest   # and that gate can tell a hard campaign from an easy one
node engine/dev/worldFormats.mjs --selftest    # the six world-graded formats measure the place correctly
node engine/dev/fieldCoverage.mjs  <theme>    # the sentences the book wrote that no panel prints
node engine/dev/fieldCoverage.mjs --selftest  # and it knows which end of an alias the engine reads
node engine/dev/instrumentGoals.mjs <theme>   # the panel says what counts as done before it is done
node engine/dev/instrumentGoals.mjs --selftest # and it can tell a panel that says so from one that does not
node engine/dev/curriculumDelivery.mjs <theme> # every equation on the syllabus is computed, not just mentioned
node engine/dev/curriculumDelivery.mjs --selftest # and it can tell computing one from talking about it
node engine/dev/curriculumDelivery.mjs <theme> --snapshot before.json   # the conversion invariant:
node engine/dev/curriculumDelivery.mjs <theme> --against  before.json   # objective fixed, format variable
node engine/dev/checkStyles.mjs               # no game stylesheet re-declares the engine's
node engine/dev/readabilityParity.mjs         # the reading grade cannot tell 11.4 from "eleven point four"
node engine/dev/worldParity.mjs               # every group has somewhere to happen in the data
```

## Diversity is not the measurement; delivery is

**The obvious gate does not survive contact with the numbers.** The catalogue is
63% four formats and 28% CHOICE alone, so the response that suggests itself is a
variety gate — no format over a quarter of a campaign, an effective format count
of six, six distinct instruments. That gate was written down, and then the mix was
crossed against `syllabusEquations`:

| | CHOICE share | mix rank | equations a question **computes** |
| --- | --- | --- | --- |
| Ground Truth | 51% | second-worst | 11/11 |
| Sightline | 47% | third-worst | 7/7 |
| Quantum | 20% | **best in the repo** | 5/10 |
| Outbreak: Riverton | 16% | fourth-best | 3/7 |

Format variety does not predict whether the course is taught, and the variety
gate would have sent the work at the four games needing it least. Same shape as
Flesch–Kincaid ranking house style, as nine junior editions passing sixteen checks
with twelfth-grade demand, and as an instrument budget that counted instruments
and measured none of them: a number that is plausible, cheap and *adjacent* to the
thing.

So **`engine/dev/curriculumDelivery.mjs` is the gate and format mix is the
diagnosis** you run when it fails. It gates on one rule that is not a matter of
taste — *an equation the syllabus lists must be computed by some question* —
where computed means a number came out of it: the `relationship`, the template,
the worked solution or a DERIVE's own lines. This is house rule 21 as a check.
CHOICE has none of those fields, so it cannot compute by construction, and a
CHOICE-heavy game whose equations are all computed passes, correctly.

**Ninety-seven equations across 23 themes fail that rule today**, which is too
many to gate on cold — and the answer is *not* an `--advisory` flag, because a
gate in front of unfinished work acquires a permanent flag and stops being read.
`engine/dev/curriculum-debt.json` records the gaps that exist now. A gap not on
the list fails immediately, so nothing new drifts in; **a gap on the list that has
since been fixed also fails**, naming the line to delete, so the file cannot
become a standing excuse. It only shrinks.

What it reports and never fails: the 30-concept syllabus, by the **tier of move**
its stops demand — SELECT (the answer is on screen and you pick it), CONSTRUCT
(you build it out of parts), OPERATE (you drive an instrument). A mechanism
concept reached only at SELECT is the diversification work list. It is a report
because select-tier is often right — Sightline is AP Psychology and "identify the
bias" *is* a discrimination — and because uncovered concepts are expected:
twenty-five of thirty is a syllabus map, thirty of thirty is a flattering one.

**The conversion invariant is the other half, and it is what makes a
diversification pass safe.** `--snapshot` before, `--against` after: a changed
takeaway, a dropped `assumes`, a concept the campaign no longer touches or an
equation it no longer computes all fail. A changed **format** is reported and
allowed. The rule in one line: *the objective is fixed, the format is the
variable.* Without it a sweep rewrites the syllabus while every other check stays
green, because every other check reads the content as it now is.

**And the detector was wrong twice, both found by pointing it at a real game.**
Wellmere reported four uncomputed equations and has two.

- **An instrument keeps its numbers in its own block**, so nothing a player
  computes on a board reached the strict haystack — the same hole `deriveWork()`
  was written to close for DERIVE, one format wider. `instrumentWork()` is the
  general form. **Its first version harvested captions and was worse than the
  bug**: a caption is both the name of a quantity and the name of the topic, so a
  STRESS row reading "Temperature rise that doubles reaction rate" cleared
  `rate = k[A]ⁿ` on a board that computes no order, and a TRIGGER axis reading
  "98 % germination" cleared `part = whole × share`. Three of the eight gaps it
  cleared were wrong. What survives is the two things that cannot be a topic
  word: an authored `formula` field, and the board's own numbers — where a
  "number" is a value with at most a short unit, because `"98 % germination"`
  leads with a digit and is a sentence.
- **A keyword list is prose, and prose goes stale.** Wellmere's stop 16 authors
  `Ne = 4NmNf ÷ (Nm + Nf)` in its `relationship`; the list asked for
  "contributing plants". Eighteen equations across the set had a stop whose
  arithmetic states them and whose keywords miss. `symbolSignature()` reduces an
  equation to its notation — subscripts to plain letters, `÷` to `/`, `≈` to `=`,
  spacing gone — and a stop that *writes the equation* computes it whatever the
  keywords say. This is `readabilityParity`'s rule one level up: **a measurement
  must not be able to tell `11.4` from "eleven point four"**, and it must not be
  able to tell `Nₑ ≈ 4NmNf / (Nm + Nf)` from `Ne = 4NmNf ÷ (Nm + Nf)`. The
  selftest asserts exactly that, plus the case that keeps it honest — a
  relationship writing a *different* equation must not match.

Between them: **97 recorded gaps → 88**, nine of which were the measurement and
not the content. Every flip was inspected by hand before the baseline moved, and
three proposed flips were rejected on inspection. Do that; a debt file that
shrinks because the detector got looser is worse than one that never shrinks.

Both halves have a selftest, and it earned its place immediately: the first run
failed four cases, and three of them were the *fixture's* fault — the prose wrote
the monohybrid ratio as `3 : 1` where the syllabus keyword is `3:1`, and a bland-
looking distractor ("Two genes", then "The plot was unusual") matched a second
syllabus concept off the option list alone, so a clean conversion "lost" a concept
the question had never taught. A checker that can be fooled by how a person types
a ratio is the readability defect again.

`placement` is the one that fires rays. Four rounds of play-testing were spent on
the same defect — boards floating in doorways, boards hung *inside* the wall so
only the dark edge shows, a mural running past the end of the wall — and every
check passed each time, because they asked whether a *point* had a wall behind it
and a notice board is a metre wide. This asks through the whole face of a fitting,
from both sides. Anything on a wall goes up through `markWallMounted` in
`interiorKit`, and anything the walls are made of through `markStructure`, because
guessing which meshes are walls from their proportions is how a checker starts
lying. It cannot see a hand-built world, and it cannot see a fitting that never
said it was one.

Wall furniture is placed *proud* of the line a caller passes, never on it: a wall
is raised centred on that line, so a 0.18 m wall on x = 2.1 shows its face at 2.01
and anything hung at 2.07 is inside the plaster. `furnishRoom` takes
`wallThickness` and does that arithmetic once.

Two reports that are not part of `check`, because they answer "is this good
enough" rather than "is this broken":

```sh
npm run traps                                 # break every instrument trap; all 72 must fire
npm run drive <theme>                         # drive every live panel in Chrome, right and wrong
npm run laps <theme>                          # take every warm-up run in the real game, morning by morning
node engine/dev/pieceDensity.mjs --all        # how furnished every room is, thinnest first
node engine/dev/syllabusEquations.mjs quantum # which equations a question computes, and when
npm run shots <theme>                         # a picture of every room, and a contact sheet
npm run lessons                               # harvest two real stops of every format, then
                                              # /engine/dev/lessons.html — answer them yourself
node engine/dev/cardLoad.mjs --all            # how much a player reads before they can act
node engine/dev/cardLoad.mjs <theme>          # the sweep's work list, heaviest card first
node engine/dev/cardLoad.mjs --selftest       # and it can tell a heavy card from a light one
```

**A panel that enforces the player's decision has removed it.** TALLY's whole
subject is *when is there enough data to report* — and a player came back with "I
just keep clicking until it lets me submit, there is no challenge." They were
right. The commit button unlocked at `minShots`, and at Quantum's authored numbers
that floor already put the statistic inside its own tolerance about 95% of the
time: σ = √(Σ4p(1−p)/n) is 0.072 at 400 shots a pair against a tolerance of 0.14.
Lowering the floor alone does not fix it either, because shots are free and the
clock is stopped behind a panel, so the correct play becomes clicking forty times —
tedium, not judgment. **`tally.budget` is the fix**: a finite pot of batches for the
whole stop, spent across the pairs, with the Run buttons dying when it is gone and
commit allowed the moment the pot is empty whatever state the pairs are in (a
player who dumps the budget on one row must not be locked in a panel). All four
correlations enter the combination with equal weight, so an even split buys a
better statistic than the same pot poured into the noisiest-looking row — the
strategy is real and it is in the background rather than the guide. Two importer
refusals make it stick, both trapped: a floor whose scatter is already inside the
tolerance, and a budget too small for an even split to pass. Quantum's is 24
batches of 100 with a floor of 1 batch: reporting at the floor is a coin toss,
full even spend is 2.4σ.

**The second paragraph of a card is for the question, not for the controls.** 836 of
the 1,045 board and CHOICE stops carried a mechanics paragraph — "choose one of the 4
and press Check; the options are dealt in a fresh order each time, so the lettering
carries nothing" — in six distinct texts across the whole catalogue. Every word of it
was already on the screen: each board format prints its own `compactInstruction` a few
pixels below, so the one place a player looks for help with the *question* was spent
explaining a control they could see. All 1,045 are rewritten to `QUESTION_BRIEF.md`
§7a: what the options disagree about, the test that separates them, and what the
distinction costs. No mechanics, never the answer, and never a restatement of the
scene — the last of which needs measuring rather than trusting, because thirty-three
guides quoted a run of their own scene back at the player and every one of them read
well in isolation.

**SCIENCETANK had it backwards twice, and `rules` is the fix.** A tank stop's second
paragraph was the *scoring* rule — commit eighty of the hundred, thirty-five on one
proposal — while the `evidence` the allocation is argued from sat behind a collapsed
disclosure inside the panel. So the player met the arithmetic before meeting a single
fact. `rules` is a new authorable field rendered as its own **Rules** button, the
evidence moves up into `guide`, and the panel drops its own "Evidence available"
disclosure when a stop carries `rules` so nothing is printed twice. The editorial half
matters as much: **evidence that only describes the proposals worth funding is a hint,
not evidence.** Fourteen of the 31 tank stops had no evidence at all.

**TALLY's subject is convergence, and for most of this engine's life the only picture
of it arrived in the verdict** — after the decision it was evidence for. A column of
counts cannot show a number settling. The panel now draws the statistic against shots
taken with the same `lineChart` the verdict uses, redrawn as each batch lands, plus a
per-pair ±1σ column and a combined spread: the trace answers *when* it has converged
and the column answers *which row is still moving it*, which is the whole of how a
finite budget should be split. The bound is drawn and the target and tolerance are
not — instrument rule 2, where a goal is the constraint the answer is written against
and grading slack stays unprinted. Quantum's stop had also lost its `budget` and had
`minShots` at 400, which is the trap the importer refuses; restored to 24 batches with
a floor of one, where reporting at the floor is a coin toss and a full even spend is
2.4σ.

**And CLOUD printed the two numbers it was supposed to be teaching.** Its whole
subject is that a spread is a spread rather than a number with a decoration on it —
and its readouts said `nominal 6.90` and `spread (1σ) 0.90`, straight off the
book, with a bell drawn with its peak on the answer. A player read the centre and
the width off the panel, bought actions until the "inside the limits" percentage
cleared the pass mark, and never once had to find either number in the scatter.
The cloud was scenery. Now **the mean and the uncertainty are reported by placing
them**: three bars over the points — the middle, and ±1σ either side — dragged on
the plot or driven from two sliders, with live counts of how many points fall
below the middle, how many above, and how many between the σ bars. Placed right,
a pair halves the cloud and holds about 68% of it, which is what one sigma *means*
and what no version of this panel had ever asked anybody to notice. Four things
that keep it honest: dragging the middle bar carries both σ bars with it and
dragging either σ bar moves the other one the same distance the other way, so the
controls are the format's own moral (moving the nominal moves the whole band and
changes nothing about its width, and an uncertainty is one number); the drawn bell
is the player's *report*, never the truth; the samples are standardised to the
authored mean and spread, so the report is graded against the cloud on the screen
and a seed cannot decide a right answer; and an action makes the report stale, so
both bars have to be placed again and the strip under the plot says which is
outstanding rather than greying the button and saying nothing. `report:
{ centreTol, spreadTol }` is the placement slack — 0.3 of the finishing spread by
default, so a narrowed cloud has to be located better — and it stays unprinted,
because grading slack on a value the player reports is not a goal. Two importer
refusals, both trapped: a tolerance wider than half the finishing spread, and one
that is not a positive number.

**A card names the concept it is an instance of, and says what the idea is for.**
`Key concept` is a second door beside `Background`, and the two sit in one row —
`.askDoors`, a closed door is a pill and an open one takes the width, because a
`<details>` body squeezed into a flex column is a paragraph two words wide. The
Background label lost its tail on the way (`Background — where this fits, the
words, the equations, what it assumes` is now one word): two pills of five words
each read as a paragraph of controls rather than as two things to press, and the
new door was invisible beside it.

**Which concept a stop is about has to be picked, and the pick is the whole of
the work.** `conceptCoverage` answers "which stops touch this concept", which is
what the syllabus audit asks; the card asks the opposite question and it is not
that lookup inverted. The matcher is keywords over the whole question, so across
838 senior stops the median matches **three** concepts, the worst thirteen, and
19 match none. `pickKeyConcept` scores on two things a bare keyword hit cannot
see — **where it landed** (title 5, ask and takeaway 4, scene and why 2, an
option label 1, and an option-only match can never win) and **how rare it is
across the campaign**, since a concept twenty stops mention is the course's
background hum and one that three mention is what those three are for. Rarity
needs the whole campaign, so it is a post-pass in `import-book.mjs` next to the
equation one, and the engine reads a stamped `lesson.concept` rather than
reaching into `tools/` for a syllabus.

**A mechanism bonus was tried and removed, and it is the one term that made the
pick worse.** The argument for it was that "how you report it" is rarely what a
player is stuck on. What it did on Blackout was hand three method stops to a
mechanism that was not their subject — the TRACE on what order the records claim
and the CHOICE on the sensor that was confident and wrong both went to a
transmission concept over `Metering, instrument transformers and measurement
error`, which is what those two questions are about. Half this catalogue's
instruments have method as their subject, so a standing thumb against method
concepts is a thumb against the formats. Two rarity curves were tried against the
same 45 stops and moved nothing, so the scoring is the simplest thing that works.
Two of Blackout's 41 picks still land on a neighbouring concept, and the honest
name for the field is *the concept this stop is most likely about*.

**And "two of 41" was itself the picker grading its own homework.** Read by hand
against the scenes rather than sampled, **nine** of Blackout's 41 were wrong — and
three of those were not reachable by keyword at all, so no matcher was ever going
to find them: the stop whose subject is synchronising says only that four
quantities have to agree, and the one about the turns ratio asks why the machine
makes 20 kV and the line outside runs at 400. **`concept:` is authorable on a stop
now**, taking the concept's number or its exact title, with `pickKeyConcept` as the
fallback. Three properties earn their keep. A name that is not on the theme's
syllabus is **refused** rather than dropped, because a near-miss title falling back
to the picker is indistinguishable from having authored nothing. A concept with no
`t` written is refused too — asking for the door by name and getting silence is not
the same as never asking. And prefer the **title** over the number in a book: a
number silently follows a syllabus reorder to whatever concept lands at that index,
where a title fails loudly.

**Nothing could gate on this while the field was derived**, which is the reason to
have built it. `plans/blackout-sequence.html` is the sequencing audit — when a
campaign teaches a concept against where the story is standing — and its rule is
`equationOrder`'s, one field over: *every concept a stop claims has a base claimed
on an earlier day, or the stop says in `assumes` that it takes it as read.* Earlier
and not the same day, because `openStopIndices()` opens a day's stops in any order,
so a prerequisite beside its dependent is one half the players meet second.
Blackout's day 1 asked what a falling frequency trend is evidence of and named
*droop control*, whose base arrived on day 12; **twelve of its 28 inversions rested
on material the campaign itself teaches later, and that is now one** — eleven
authored claims, two swaps and one rewritten question, with no mission re-ordered
and no scene touched. The 26 that remain all rest on the bottom of the graph (what
a volt is, Ohm's law, RMS, induction), which an AP Physics 2 course may take as
read and must therefore *say* it takes as read.

**The gate exists now, and it is per stop rather than per concept.**
`engine/dev/conceptOrder.mjs`, inside `npm run check`, with `needs` authored on
Blackout's 32 concepts in `tools/syllabus.js` beside the equation `needs` that were
already there. A course whose concepts carry no dependency is not checked at all,
which is why the other 27 themes are silent. `takesAsRead:` is the hatch and the
importer refuses two things about it: a title not on the syllabus, and — the one that
keeps it honest — **a concept the stop's own claim is not built out of**, because
without that the field is a place to park anything and a declaration left behind by a
re-claimed stop would go on excusing a prerequisite the stop no longer has. A stale
exemption is indistinguishable from a considered one. Each declaration is printed to
the player as an `assumes` line, so the sentence they read and the fact the checker
reads are the same authored line.

**Per stop is not the same audit as per concept, and the difference was six real
rows.** Two stops can claim one concept and each has to answer for its own
prerequisites; the concept-level count in `plans/blackout-sequence.html` had collapsed
those, and hid a stop standing *beside* its own base on day 6 rather than after it.
The document reads `orderRows` out of the gate now rather than keeping its own copy of
the rule. Of the six, four were declarations and two were ordering — and one of those
is the shape worth copying: day 10's dark-hours estimate claims *energy from power over
time*, which is what `E = Pt` is, and that single re-claim put the base under two later
stops at once. **Prefer a re-claim to a move**: it costs no scene and no story.

**And the card was printing a claim nobody had earned.** The Key concept door said
`Concept 19 of 32 on this course`, which a player on day 1 reads as the nineteenth
thing they are being taught — and said it about a card that was right. The syllabus
list is grouped by topic, not ordered by dependency: it puts transformers at 13 and
Faraday's law at 17, so its index cannot mean "how far in this is". The count is fine
and the ordinal is not. It reads `One of 32 concepts on this course` now, followed by
what the idea **rests on**, with anything the stop takes as read marked as such —
which is the pair of facts a player would actually use to work out where they are.
Found by playing the game, after every check was green.

**All sixteen senior campaigns are sequenced now, and the graphs are the asset.**
494 concepts across 18 themes carry a `needs`, up from 62, and `conceptOrder` is green
on every one — every claim's prerequisites arrive on an earlier day or are declared on
the card. Most of the residue was bottom-of-graph and became declarations (Outbreak 29,
Red Sand 33, Ice Core 23), which is a senior course leaning on a first course, said out
loud. What is left is 132 lines in `concept-debt.json`, concentrated in three games:
**Midway 21, ContamCity 21, Aftershock 11.**

**Midway is what the pass was for.** AP Physics 1 taught in derivations across an
amusement park, where the day is set by which ride you are standing at — so the
teaching order follows the rides. Writing its equation graph (it had *none* of twelve)
turned up the bigger thing: **`ΣF = ma` is shown on a card from day 1 and computed by no
question in the game**, while centripetal force, the energy books, torque, the pendulum
and fluid pressure are all computed from it. Seven equation-order inversions out of one
missing stop. Headwater has the calculus twin: the chain rule claimed on day 2, the
power rule not until day 5 — the exact sentence `equationOrder` was written for, one
field over.

**Every registered theme carries a graph now — 637 concepts of 724 — and the nine
junior editions are the part that needed a different policy.** "Taken as read" needs an
earlier course to take it as read from: an AP course may open on frequency without
teaching what a volt is, and a grade-6 edition has nothing in front of it, so a
prerequisite it declares is one it has quietly decided not to teach. That is the
middle-school failure this file already records twice, through a third door. Junior rows
go in the debt file instead, and `conceptOrder` reports any declaration at grade 8 or
below rather than accepting it. Thirty-four declarations were stripped from two editions
when the policy was corrected. `engine/dev/concept-debt.json` is **186 rows across 26
themes** now, concentrated in Midway (22), ContamCity (16) and Aftershock (13). Its own
`_` key is eight lines of header, and counting those as debt is how the total read 194
for an afternoon — a file whose length is the metric needs to say which lines are not
data.

**Working the debt down took it 236 → 206, and the more useful outcome was finding the
measurement wrong again.** Thirty rows were foundations no card claimed, restored to the
stop that teaches them — Midway's net force and simple harmonic motion, Aftershock's
stress and strain, Quantum's T1, Groundtruth's charged-sheet field, the junior editions'
matter and averaging. Two batches made the number *worse* and were reverted: a claim that
clears three rows can raise four, so re-measure after every batch. **Then: three analysis
scripts read `row.pday` — the day a prerequisite is claimed — and `conceptOrder` never
emitted that field.** A missing field reads as `undefined`, so every row classified as
"claimed by nothing" and the summary said all 326 needed a question written. Plausible,
confident, wrong: these campaigns do have coverage gaps. Only the gate's `why` string
carried the truth, as prose, and the disagreement between the per-theme table and the
summary is what surfaced it. `pday` exists now.

**With it fixed, the residue is an ordering problem, not a labelling one:** of 269 rows,
**208 are prerequisites taught later** (want a re-order or a swap), 27 want a claim, and
34 are never mentioned at all. A free re-order would take ContamCity 22 → 11, Hospital
15 → 9, Red Sand 11 → 5, Headwater and Quantum 12 → 8 — but a *free* re-order will move a
carousel stop into the closing-report day, so it needs each game's chronology read off its
fifteen stakes, which is Blackout's slate C done twenty-five more times.
**Midway is the exception:** its rows are not order at all — *work as a force times a
distance* and *free-body thinking* are mentioned at no stop in an AP Physics 1 game whose
torque, power, friction-as-negative-work, PE and KE all rest on them. Two written stops,
not a permutation.

**And the re-order half is far smaller than the search says.** ContamCity and Hospital
were re-ordered (22 → 16 and 15 → 9), Headwater swapped four stops, and then the pairwise
swap search was run on the six themes with the largest offers: **twelve of sixteen
proposals were story-wrong**, and the way to see it is the day's own stake rather than
the row count. Aftershock offered four and lost all four — "What eight degrees does" *is*
Marina Court, which is day 4, and a stop whose scene names the day's event cannot move.
Junior Blackout offered three and lost all three. What landed was one swap each in junior
Aftershock, Ice Core and Wellmere, plus the fable taking Blackout's own slate-B pair
instead of the optimiser's. **A game whose days are an event calendar (Aftershock, Red
Sand) or a topic list (Midway, Ground Truth) is not re-orderable at all**, so its rows are
paid by declaring `takesAsRead` or by writing the missing question — which makes the
residue mostly writing work, not permutation work. `gamekit/SEQUENCING_PASS.md` carries
the test.

**And `derive-edition` overwrote a shipping edition without saying so.** Run on
`blackout` to check one line of its output, it rewrote the nine days it was handed over
the ten `blackout_ms` ships — book and generated content both — and nothing failed,
because a nine-day campaign is a valid campaign and `npm run check` passed on it. The
only evidence was a mission count in a file nobody was reading, which is house rule 14's
shape one directory over. It refuses now unless `--force`, and it prints how many days
the edition currently ships. It also strips `concept:`/`takesAsRead:` on the way across,
because a junior concept list shares no title with its parent's — carried over, every one
of those lines is a title the importer refuses, after the edition has been written.

**Two engine gaps the rollout exposed.** A claim no longer waits on its takeaway: the
importer used to skip a concept with no `t`, so 26 of 28 courses claimed nothing and
this gate had nothing to read — claims are recorded now and the door still appears only
when `t` is written, which separates *the course is in a teachable order* from the
26,000 words of curriculum prose. And **`equationOrder` had no debt file**, so authoring
a truthful graph on a shipping game turned green into red in the same commit; the
realistic outcome of that is a graph somebody has quietly made wrong.
`engine/dev/equation-debt.json` exists now, same two properties as the others.

**And a `needs` graph can be non-terminating rather than wrong.** Five of the sixteen
courses came out with a cycle on the first pass — intermolecular forces ⇄ phase changes,
rate constants ⇄ activation energy, reliability ⇄ validity, α/β ⇄ sample size, decibels
⇄ signal-to-noise — each a pair where the physics runs one way and the prose reads both
ways. A cycle overflows the depth calculation instead of reporting anything, so **check
for cycles the moment a graph is authored**, before another tool reads it. Three more
were self-references, which the applier refuses outright now.

**Two things that pass every check and are still wrong, both found here.**
`diffSnapshots` keys a stop by `group:index`, so **exchanging two stops of one area
reads as both of them losing their objective** — six of the eight losses reported
after this pass were two DIST stops trading places, and the two equations it called
lost are computed by the other half of the swap. It was settled by matching every
before-objective against the after-content by takeaway: exactly one had left the
campaign, the one deliberately rewritten. Match by identity and report an exchange
as an exchange; a wall of false failures is how a gate stops being read. And
**a slate row in `plans/plansData.mjs` names a stop by number, and stop numbers
move**: the same two swaps renumbered four stops, and three rows went on pointing
at the number while meaning the question — one of them at a stop that had been
rewritten into something else. Every row carries the title it was written against
now, and `render.mjs` throws on a mismatch.

**The takeaway is authored, and it is fixed per concept rather than per stop.**
`t` on each syllabus concept, two sentences and 30–45 words: what the idea says,
then what it lets you decide. Every stop that scores to `Protection: relays,
breakers and coordination` opens onto the same two sentences, which is the
difference between this door and everything else on the card — `takeaway` is the
principle *this* question is an instance of, written once for one stop, and this
is what the course says the idea is for. **A concept with no `t` stamps nothing
and shows no door**, which is why adding this changed the generated content of
exactly one game: an empty door is worse than none, and it teaches a player not
to press the next one. 32 of the 692 concepts across 27 courses are written
(Blackout); the other 660 are the work list.

**And it is a leak the existing probe could not see.** A per-stop takeaway that
gives the answer away costs one question; a *concept* takeaway that does costs
every stop the picker sends to it, and nobody rewriting the stop would think to
look at the syllabus. `probeQuestions` now runs the takeaway's own LEAK test
against `concept.t` as well — the shared-content-word fraction at a higher
threshold, since 40 words collect more of anything by chance, plus a verbatim-run
test that is insensitive to length. Planting a stop's keyed answer as its
concept's takeaway fires both, on every stop that concept reaches.

**`fieldCoverage` could not see the new field, and the reason was a spelling.**
`readsIn` matched a literal dot, so `lesson?.concept` was not a read — and eight
fields in `questionUI.js` and `instruments.js` are reached only that way,
`guide`, `rules`, `assumes` and `equations` among them. Same class as the carver
not knowing `const ask = () => …`: a checker that reads source has to know every
spelling the source is allowed to use, and the ones it does not know are silently
invisible rather than loudly missing. This is `readabilityParity`'s rule in a
different file — a measurement must not be able to tell `lesson.guide` from
`lesson?.guide`, because the player cannot. Three selftest cases, and putting
each bug back fails those cases and only those.

**`gamekit/QUESTION_BRIEF.md` is the sweep brief** — the card shape every stop is
being rewritten to, the six mechanics a guide has to answer, the line between a
caution and the answer, and §5, which is the rule that authored numbers have to be
*possible*. `cardLoad` is its measurement: 1,334 stops, and the median card was 75 words in 5 to
6 blocks — so the defect is fragmentation, not length. The tiers are 19 live panels,
244 instruments, 728 boards and 343 CHOICE, in that order of need.

**Two things about that measurement are worth keeping.** It reported 0 stops over
target the moment fold-by-default landed, which was flattery: it modelled the three
lines the four questionUI panels print and never looked at the 24 in instruments.js,
so every instrument stop was counted three blocks light. It renders those panels now
and the true figure was 244. And the target has to be per tier — 4 blocks for a
card, 6 for a stop with an instrument, which keeps its own hint and its "what counts
as done" — because one number either excuses the fragmentation or bans two blocks
worth keeping. A briefed stop drops only the format's generic lecture, through
`game.briefed`, stamped in `normalize.js` and read by `method()`.

Sweep progress: **262 of 1,333 briefed, and tier 1 is finished — every instrument stop in all 27 games.** Tier 1a is complete (all 19
live panels) and tier 1b with it: all 244 instrument stops, across every game and
every junior edition. What is left is tier 2 — the 728 board stops, of which
BALLPARK's 206 always need a guide — and tier 3, the 343 CHOICE stops, which need
only the fold they already have.

**The sweep broke its own reading rule and needed a second pass.** The first 84
guides carried 42 sentences over the 28-word cap, every one of them a compound
joined by an em dash, a semicolon or ", so" — fluent to write and over the bar. They
were cut at the joint and re-measured, which is the only reason it was found: the
prose read well enough that nothing but `cardLoad`'s own column objected. And
`tools/brief-stop.mjs` now refuses to write a book whose bytes changed since it read
them, because it clobbers a concurrent session otherwise — Meridian's stop count
moved twice mid-sweep and the only visible symptom was a total dropping by one.

**Quote any inline `{ … }` value containing a comma.** `tools/yaml-lite.mjs` used
to split a flow map on every top-level comma and silently skip any fragment
without a colon, so `{ landmark: the second door, hinged inward }` arrived as
"the second door" and nothing downstream could tell — what reaches the game is a
perfectly valid shorter string. Quantum, Blackout and Aftershock shipped 36 lines
like that, choice labels and mechanisms cut off mid-sentence, through every
check. The parser now refuses a colon-less fragment; a braced value with no
colons anywhere is still a string, which is what an estimate template like
`{0} ÷ {1}` needs.

`drive` is the answer to everything a checker cannot judge about an *interactive*
panel. The instruments can render, print their question, expose a commit
button and never reach the grade because one selector is wrong, and nothing in
`check` can see it. On its first run it found a TRACE whose resource container
shared a class with its resource buttons — a click bubbled to a handler that read
`dataset.res` off a div, the selection silently became NaN, and every right
answer graded wrong.

`shots` is the answer to everything a checker cannot judge. Whether a room looks
lived in, whether a mural is clipped, whether a seal is hidden behind the gallery
— all of that has been found by a person launching the game, walking there, and
saying so, and most of it was obvious in a still. It runs vite, renders the game
in headless Chrome through SwiftShader, drives the game's own `teleport` to each
viewpoint, and writes `shots/<theme>/index.html`: every room on one page, about
two minutes for fifty views. Views come from `--at x,y,z --yaw deg` for one
specific thing, else `themes/<theme>/shots.js`, else the theme's `plan.js`, else
a turn on the spot at the spawn. A hand-built world should have a `shots.js`;
`themes/bring_them_home/shots.js` is the worked example, and that game has no
other automatic check on where anything is.

**And the first thing it found was a format nobody could play.** Quantum's day-10
HOLDOUT asks you to choose a threshold on one batch of shots, freeze it, and report
what it scores on a batch it never saw. Its two tabs said "Calibration shots" and
"Shots it has never seen", and *nothing on the panel said what either of those
was*, what a shot is, or why a broad plateau in the curve should be trusted where a
tall narrow spike should not. All of that was in `why`, which arrives after the
answer. The reason is structural: **SWEEP, HOLDOUT, TALLY and PROBE print no
`METHOD` line and no goal line**, because both come from `instruments.js` and those
four predate that registry and live in `questionUI.js`. The four most
instrument-like panels in the engine were the four that never said what kind of
move they were. Three of them also hardcoded their hint, so a book could not
explain its own panel.

Fixed for all four, not for the one stop: `METHOD` gained their four lines,
`methodBlock` and `goalBlock` are exported from `instruments.js` so the markup and
the classes stay single, and `hint` + `goals` are authorable on all four blocks
(`panelWords` in the importer). HOLDOUT also takes `fitNote` / `testNote` — what
each batch *is*, per stop, since a batch is shots in one game and patients in
another — and its idle tab now says "no number until you freeze" rather than
sitting blank. Quantum's stop is rewritten around tray A and tray B, with the
counting-noise-versus-separated-clouds argument on the panel where it can be used.
The pass mark stays unprinted, and `npm run traps` has a case that fires when a
book puts it in the hint.

**And then the fix was the wrong shape, which is the more useful finding.** With
the method line and the goal line added, the card carried *six* blocks before the
player touched anything: the scene, "takes as read", "what this is about", a row
of syllabus equation chips — two of which, `F_total ≈ F^n` and `n_phys ≈ d² per
logical qubit`, have nothing to do with the question — a row of glossary chips,
then the panel's own three lines, one of which restated the question. Every block
was defensible on its own and the sum was unreadable. Explaining a format is not
the same as adding a block that explains it.

So a stop may now carry **two paragraphs and a door**: `scene` says what has
happened and defines any word the question needs, `guide` says what the player
does and what the numbers mean, and `background` is a list of paragraphs behind
one button. The button holds what was crowding the card, in prose: the background
paragraphs, then **each syllabus equation spelled out in a sentence** with its
symbols named, then the glossary definitions, then `assumes` and `takeaway`. A
chip reading `n_phys ≈ d²` is useful only to somebody who already knows what it
says. A stop with a `guide` also suppresses the panel's own three lines, and
authoring a panel hint beside one is refused rather than dropped. Quantum's
HOLDOUT is the worked example: scene at Flesch–Kincaid 6.8, guide at 4.0,
background 4.4 to 6.3, and every block that used to compete now either the
instruction or behind the button. Nothing is deleted and nothing is dumbed down —
the coin-flip explanation of why a 4,000-shot percentage wobbles is *more* physics
than the card had before, it is just not in the way.

**`- >-` inside a sequence had never worked**, and the background list is what
found it: `tools/yaml-lite.mjs` handled a block scalar after a key and not after a
dash, so all four paragraphs arrived as the literal string ">-" with the prose
under them skipped as a deeper block. Quantum's is the only book that had ever
used the form. Same class as the comma-split flow map — what reaches the game is a
valid string, so nothing downstream can tell.

**Adding those two blocks then broke the panel, in the way this repo has already
paid for twice.** `.modalBody .modalActions` is `position:sticky; bottom:0`, so
150 px of explanation pushed the slider, the axis labels and both readouts *under*
the pinned action row: a plot, a gap, and a button. And `scrollIntoView({ block:
'nearest' })` — the remedy SWEEP already carried — **does not fix it**, because an
element one pixel inside the scroll container is "in view" by that definition and
entirely hidden by the bar over it; the browser scrolled six pixels and stopped.
`showControls()` subtracts the bar's own height, and all four panels call it. The
lesson is the screenshot rule again, one level in: the DOM had every element, the
checks were green, and only a picture showed the controls were gone.

`lessons` is the answer to "what does one of these actually feel like to answer",
across all 35 formats at once. `engine/dev/lessonGallery.mjs` reads every
registered game, picks the best authored instance of each format — the richest
card, from a real game rather than from Meridian, from the senior edition rather
than the junior one — and writes `engine/dev/lessons.json`;
`engine/dev/lessons.html` mounts one at a time, answerable and graded, and keeps
a tally of what you got right.

**Every format is shown twice, the second card from a different campaign**, because
one card cannot separate the renderer from the book that authored it — a SEQUENCE
ordered by time and a SEQUENCE ordered by cost are the same panel asking different
questions, and the second card is what shows which half is the engine. The pair
must come from different *families*, not merely different theme ids: a grade-6
edition is the senior book with shorter sentences, so ROUTE's pair was deepwatch
and deepwatch_ms until `editionBase` was folded into the choice. Where no other
book authors the format the second card comes from `instruments`, and where there
is no second stop at all — TALLY, TRIANGULATE — the page says so rather than
inventing one. Six formats are still authored nowhere: BELT, TRIAL, HOLD, SPOT,
STACK, LOB. Any theme can be serving: the person asking, their
colour, the source game's glossary and the estimate's numbers all arrive with the
stop, because they belong to the game it came from.

**Nothing on that page renders or grades anything.** `questionUI.mountStandalone`
is one hook — `finishVisit` diverted, plus the two rerender paths — so the card,
the panel, the shuffle, the grading, the verdict figure and the reasoning are all
the engine's own code, and a panel that is broken there is broken in the game.
That is the same argument as `engine/dev/instruments.html`, and it is worth
restating because the tempting version of this page is a harness with its own
copy of eight renderers, which would pass while the game was broken. What the
page does *not* have is the campaign half: no clock, no money, so no hint and no
priced way out, and the verdict carries the teaching without the readiness
ledger. Three things it found on the first run: the verdict's own CSS lived in
`index.html` rather than in the engine sheet (moved), the estimate's numeric spec
was looked up from a key written out in five places (stamped once on the active
challenge now), and `themes/instruments` had been titled "Template" since it was
scaffolded.

`pieceDensity` builds each place headless — `engine/dev/headless.mjs` stubs the
canvas and the renderer, since three.js touches no GPU until something renders —
and counts placed pieces per room against floor area. It is how "the rooms feel
empty" became a number: Quantum's own rooms hold a median of 3 pieces where the
engine's case rooms hold 9–15.

In the browser console, before judging how anything looks:

```js
const { reportAudit } = await import('/engine/dev/audit.js');
reportAudit(gamekit.scene, gamekit.renderer, {
  spawn: gamekit.theme.start,
  colliders: gamekit.world.colliders,
  groundHeight: gamekit.world.groundHeight,   // outdoor: or every prop in a dip is reported
});
```

`smokeCampaign` exists because a theme once had entirely valid content and two
thirds of its campaign unreachable. `validateContent` cannot see that.

## Two tiers of ground, and the two laps that teach them

**A site with a far half opens it on day 4, with the keys.** `engine/core/orientation.js`
measures every area from the spawn, and a **far tier exists only when the split is
real**: the nearest far area must be at least twice the distance of the furthest
near one *and* at least 120 m out. Both terms are load-bearing. The ratio alone
called Calder Switching Station two-tier, where the "far" metering hut is 48 m
from the gate and visible from it; the distance alone would have split a site
that is uniformly spread. Nothing is authored — same argument as
`budgetForRoute`, move a building and the split follows it, and a `tier: 'far'`
in site.js is a second description of the map.

Eight themes have a far tier: Outbreak, Planetary Defense, Aftershock, Wellmere
and their four grade-6 editions. **Every other theme is untouched with no flag to
set**, which is the right answer for reasons that are not geometric — there is no
far ground on a submarine and no vehicle to unlock in Mission Control.

- **Before day 1, a lap of the near ground; on day 4, a lap of the far ground.**
  Both are TRIAL, the one format graded against the world. The gates are the
  areas' own entry points — the same positions the budget walks and the map
  draws — so a lap needs no authoring and cannot repeat the mistake TRIAL has
  already made once, where a gate resolved to a building's *centre* rendered
  under the floor with a collider between the player and all of them.
- **The lap grades nothing, and it can be skipped.** TRIAL-the-format grades
  order because order is its subject; there is no science in "which of these six
  sheds is which", and on day 1 the player has been taught nothing to order it
  by. A second-campaign player who is made to sit through a tutorial is a player
  who stops on day 1, and the day model already says there is always a free way
  forward. Skipping marks it done; so does abandoning it half way.
- **The far ground is walkable from the first morning — it is just not *called*.**
  Locking it would be house rule 8 with a schedule attached: a player who walks
  somewhere and meets an invisible wall has learned the world is smaller than it
  looks, which is the opposite of what a lap teaches.
- **The vehicles come out on the same day, and that is now general.**
  `AIRCRAFT_FROM_DAY` already existed for one theme's helicopter; scooters and
  cars were never gated at all. Both are `VEHICLES_FROM_DAY` now, driven by the
  tier rule where there is one. Signing them out earlier would let a player drive
  to ground with nothing open on it, which teaches that the far half of the map
  is empty.
- **`shapeMissions` trades far calls out of the opening days rather than moving
  them.** Every two-tier campaign teaches in its far half on day 1 — Wellmere had
  seven of its first ten calls out past the glasshouses — so something had to
  give. A far call on day 2 swaps places with a near call from a later day: both
  days keep their stop count, every lesson is still taught, the books are
  untouched, and only the order two lessons are met in changes. Wellmere went
  7 far calls in days 1–3 → 4, Aftershock 6 → 1, Planetary Defense 3 → 2,
  Outbreak was already 0.
- **It reasons about equations not at all, deliberately.** The syllabus lives in
  `tools/`, the engine does not import it, and a second dependency solver in
  `normalize.js` would be a second description of a rule `equationOrder` owns. So
  the swap is conservative — it prefers the *latest* partner, pushing lessons
  later rather than earlier, because a course is written so later work depends on
  earlier work — and `equationOrder` is the guard. It passes on all four.
- **What cannot be traded is reported, not dropped.** Wellmere's spawn sits
  beside the vault and the lab and everything else is out in the rings, so only
  two areas are near: a day can hold at most two near calls before the third
  becomes a person hunt, and four far calls in days 1–3 have nowhere to go. That
  is a limit of the place, it is printed as a change, and a silent exception is
  how a rule stops meaning anything.
- **The tiers are stamped on the content, not passed at each call site.**
  `theme.js` normalises once with the site; every checker that imports a theme
  and re-normalises reads the same `content.TIERS`. A tool that hand-builds a
  campaign gets one tier and today's behaviour.

**Not yet play-tested.** The logic is verified across all 28 themes and every
game builds, but nobody has watched a lap run — which is the one thing this repo
says you may not conclude from a green check. `THEME=seedbank npm run dev`, and
watch the gates actually stand where the doors are.

## Seven runs open the campaign, and each one needs a reason

**`engine/core/warmups.js` is the schedule and it is the only copy of it.** The
seven world-graded formats — TRIAL, GREET, FOLLOW, HUNT, CANVASS, EVADE, TAG —
run *before* a day's plan card, and which one runs when is now a property of the
campaign rather than of the ground:

    before day 1 and day 2   TRIAL and GREET, in either order
    before the unlock day    TRIAL again, and only where there is far ground
    after that               FOLLOW, HUNT, CANVASS, EVADE, TAG, one a day, in
                             order, spread evenly over every morning that is
                             left — first as early as it can be, last on the
                             final day of the campaign

**Spread, not stacked, and the first version got this wrong.** Handing the five
out on the next five free mornings put all seven runs inside the first week of a
fifteen-day campaign and left the back half opening on nothing — blocked practice
in the one part of the day a player meets before anything else, which is the
mistake `shapeMissions` already fixes for lessons. Blackout now runs on days 1, 2,
3, 6, 9, 12 and 15: a run about every third morning, right through. Three selftest
cases hold it — the last run lands on the last day, no two land on consecutive
days, and at least two fall in the second half — and putting the old loop back
fails those three and only those.

**Either order is decided rather than left open.** A two-tier site opens on TRIAL,
because what a player cannot read on that first plan card is the ground; a
one-tier site opens on GREET, because its ground is one building and what they
cannot read is who everybody is. Both slots are always filled — only which one
leads is geometry. The second TRIAL is the far lap and exists nowhere else, so a
one-tier campaign simply has one fewer morning taken and nothing is authored to
make that happen.

**The save key is the slot, not the format.** `trial-near` and `trial-far` are
separate keys because the old two-key scheme would have let one lap mark the other
done the moment a third existed.

**The schedule is engine logic; the reason is authored.** `warmups:` in the book
gives each slot a title and a `why` — worried about spies, six earths and a log
that says five, catch Whitlock before she drives off. A run with no reason is a
tutorial, and the day model has a rule against those. The importer refuses a slot
name that is not one of the seven, a `why` under twelve words, and a `trial-far`
authored on a site with one tier of ground. Everything the run itself needs
defaults from the campaign's own data — gates from the areas, a GREET roster from
the cast, HUNT positions from the area entries — so a book that writes only the
story still gets a working run.

**`engine/dev/warmupOrder.mjs` checks both halves, and only one of them can be in
debt.** It asserts the *properties* the schedule has to have rather than comparing
against a table, because a table would be a second description of the rule. The
authoring is `warmup-debt.json`: **204 slots across 28 campaigns** when the
schedule landed, three campaigns written (Blackout, Deep Watch, Aftershock).
Fifteen selftest cases, including the two that would otherwise invert silently —
the two laps sharing a save slot, and a five-day campaign being asked for five
tail runs it has no room for.

**The debt is paid: 204 slots across 28 campaigns → nothing, and the file holds no
rows.** Every one of the 29 campaigns now authors all seven runs (eight where there
is far ground), so an unwritten slot fails immediately rather than being waved
through as a known gap. What the writing turned up is that the reason is
campaign-specific in a way the schedule is not: HUNT is six earths at Calder, eleven
bagged heads at Wellmere, fourteen ventilators at Riverton and nine spare tapes in
Mission Control, and the same slot in the same order reads as a different job in each.
That is the argument for authoring the reason at all — the generic `DEFAULT_WORDS`
render a run that works and a run nobody is doing for a reason.

**`npm run laps <theme>` drives them in the real game, and it found three things
no check could.** `warmupOrder` asserts the schedule and `worldFormats` asserts the
formats against a fake world; neither can see `runLap` in `src/main.js`, which is
the wiring between them. `engine/dev/lapDrive.mjs` boots the actual game in
headless Chrome, opens the plan on every morning, reads the card, takes the run,
checks a HUD appeared and gives it up with Esc.

- **EVADE was handed a `quarry` where the format reads `pursuer`.** So `npcById`
  found nobody, the run started and finished on its first frame, and the lap was
  marked done — from the plan card indistinguishable from a format that does not
  exist. One word. Both EVADE and TAG now **refuse to start** with nobody in them,
  because a run that ends immediately and a run that never mounted look the same,
  and `main.js`'s own `if(!started) onDone()` then says so out loud. Two selftest
  cases, and the TAG one needs its **own rig**: `begin` also refuses while a run is
  already going, so on the shared rig it passed for that reason instead of its own.
- **All four `warmups:` refusals were recorded below the line that reports them.**
  The validation sat inside the emit block, which runs *after*
  `if(problems.length)`, so a slot name that is not one of the seven imported
  clean and always had. Moved above the gate, and all four are now trapped in
  `npm run traps` — a refusal nothing exercises is a comment.
- **The story named a count the run cannot place.** HUNT puts one item at each
  area entry, so "Eleven bagged heads" on a six-area site is a card that lies
  about its own run; **twenty of the twenty-nine campaigns were wrong**, and only
  the HUD ever put the two numbers side by side. All twenty rewritten, the count
  is now an importer refusal, and `item: { name, plural }` is authorable so the
  HUD reads "0 of 6 earths" rather than "0 of 6 marker".

Two traps were also firing on the wrong refusal — a BELT mutation that tripped the
duplicate-name guard and a SPOT one that tripped the wanted-by-every-instruction
guard before reaching the rule each was written for. Both now say what they meant
to test. This is the measurement rule again: a trap that fires is not thereby a
trap that works.

**Ten things a person found by playing the runs, none of which a check could see.**
They are grouped because they are one lesson: a warm-up is read and walked, and
everything wrong with it was wrong in a way only that tells you.

- **A finished run said "That is the round" and a summary.** It says *Congrats! You
  are now ready to start the day* and nothing else — the tally is already on the HUD
  the player was looking at. And the card that offers a run no longer carries "nothing
  here is graded, the clock does not start until you take the plan": two sentences of
  mechanics on the one card whose job is the reason for the run.
- **TRIAL's gates carried a name board four metres up.** A panel with no post under
  it reads as a hoarding on the roof of the building it names, and from any angle but
  head-on it floats. It is gone, and putting the name on the beacon instead only
  printed it under the building's own sign — so the gate says "here" and the HUD and
  the map carry the names.
- **The clock ran up.** A stopwatch with no number to beat is a readout, so TRIAL
  counts **down**, from the route the gates actually make: nearest-neighbour from the
  spawn at walking pace with half again on top, capped at fifteen minutes, driven pace
  on the far lap. Nothing authored — same argument as `budgetForRoute`. A run that
  ends on the clock is short of gates, and `instruments.js` now refuses to commit a
  partial order as a route rather than grading it against a full one.
- **The near lap was handed the whole site.** At Planetary Defense — base camp inside
  200 m, outstations 1.6 km down the ridge — the first morning's lap was the entire
  range and its countdown came out at **eighty-one minutes**. The tiers already exist;
  the near lap is `TIERS.near` and the far lap is `TIERS.far`, which is what makes the
  second lap worth taking.
- **A windowed map drew nothing for the gates it had cut off.** `mapRadius` is 170 m
  at Planetary Defense, so the far lap's four gates were simply absent — a lap of
  ground the map denied existed. A running format's pins now get the edge arrows that
  buildings and wanted people already had, first in the queue.
- **The day's own markers stayed up during a run.** The waypoint post over the next
  building, the cones over the next person — the one thing in these games allowed to
  draw through walls — and the "Still open" banner, all pointing at work that has
  nothing to do with the run. `showDayMarkers(false)` for the length of it, in one
  call because there are three of them in three files and a fourth would be
  forgotten. Both run HUDs also moved out of the stat bar they were sitting on.
- **GREET labelled people with a four-letter area code.** `OPS`, `TRI`, `SONAR` — what
  the save file needs, not what a person would say about themselves. The subtitle over
  somebody's head is their `role`. Two roster entries had a department where the job
  should be (*Metering & Standards*, *Load Forecasting*) and read as nonsense the
  moment anything printed them in a sentence.
- **The cards promised everybody.** GREET's target is about 70% of the roster, and
  eighteen books said "put a name to everybody" — the run then ends with the job
  apparently half done. All of them now ask for as many as you can get round.
- **A card named a stranger.** "Farrow wants you known to both" is read on the first
  morning of the campaign, when nobody is anybody yet. Every name a warm-up uses is
  introduced on that card, with the job beside it, and `warmupOrder` fails a campaign
  that does not — four accepted shapes (apposition, full name, role-then-name, or a
  verb that states the job). Two selftest cases exist because the first version passed
  for the wrong reason: `Dr.` read as a first name, so "Dr. Patel has the notes"
  counted as a full-name introduction while saying nothing about what she does.
- **TAG and EVADE inherited whatever gap the crowd had wandered into.** On Blackout's
  day 15 the quarry was standing two metres from the spawn, so the run was won on its
  first frame — the same "already over" failure as the wrong spec key, arriving through
  geometry instead of wiring. Both now set the gap up: a quarry too close is stood back
  to twelve metres, a pursuer who starts clear is brought inside the ring, and a person
  already at a fair distance is left alone, because teleporting somebody the player can
  see is worse than the problem.

**`export-book.mjs` was lossy in a way that only shows when you need it.** It knew
the six formats that predate the instrument registry, so a book recovered from a
game came back with **every instrument board deleted** — and with no `guide`, no
`background` and no `warmups`, which is the whole of the card sweep and the whole of
the run stories. This was found the worst way: `git checkout` on a book with a day's
uncommitted work in it, and the recovery path was the only way back. ContamCity was
recovered and is parity-clean, at the cost of the book's comments and its line
wrapping. The exporter now writes each format's own block by name — `g[format]`, so
a twenty-first instrument exports the day it is authored — plus `guide`,
`background`, `rules`, `hint`, `goals`, `concept` and `warmups`. **A recovery path
nobody has exercised is not a recovery path**, and the way to exercise this one is
export → import → `bookParity`, which is now the documented test of it.

**The junior editions do not inherit the senior's warm-ups**, and `derive-edition`
does not carry the block across. The prose has to come down two grades like every
other paragraph in the edition, and a `why` written for an AP reader is exactly the
demand-stays-put failure this file records three times over. Junior Blackout's HUNT
says the same thing as its parent's in half the words; Hospital's, at grade 2, is
one clause per sentence.

## A mission is a day, and a day is a countdown

The campaign clock is gone. It charged time in lumps — `walkCost` on arrival,
`visitBuildingCost` on opening a question, a penalty for a wrong answer — which
meant the player could not see what a decision cost until after making it, and
standing still was free. The optimal play was to think as long as you liked and
then walk in a straight line.

Each mission is now one working day:

- **The day opens with a plan.** `createDay()` in `engine/core/app.js` puts up
  the calls, what each one is, whether it is a room or a person, and how far
  away it is, with the map underneath. The countdown does not move until the
  player accepts it.
- **The budget comes from the map, not from an author.** `day.js`
  `budgetForRoute()` walks the day's stops nearest-neighbour from the spawn,
  converts the distance to walking time and says travel should be a little
  under half the day. Spread-out days get more hours; a day that never leaves
  one building gets the floor of five. Move a building and the budget follows.
- **Time runs in real time, one game minute a second** while the player is
  walking, driving or flying, and **stops dead while a panel is open**
  (`PANEL_PACE`, now 0 in every game). Nothing is charged. It was a quarter rate
  for most of this engine's life, on the argument that thinking is not free, and
  that argument was about the wrong thing: **the clock exists to make the route a
  decision** — which calls to take, in what order, how far to walk, who to talk
  to on the way — and none of that is happening while a question is up. What the
  quarter rate actually charged was reading the evidence, hardest of all to the
  player who most needed to re-read the scene. Time is spent getting places, not
  spent reading. Nothing else about the day changed: the budget still comes from
  the route, a day still ends, running out still restarts it.
- **The stops are open in any order.** `openStopIndices()` is the truth;
  `nextMissionStopIndex` survives only as "the first still open". Every open
  room's case beacon is lit at once and the map outlines all of them.
- **A wrong call is a penalty box.** The stop closes for an hour of the day's
  own countdown and reopens itself — free — or $10 has it back immediately.
  There is always a free way forward, so the only dead end is a wrong call with
  less than an hour left to run and nothing in the reserve; then the day
  restarts, which is still escapable because each morning pays a stipend and
  clears `state.passages` so the town is worth talking to again. The box is
  `state.penalties[visitKey]`, stored as the `dayLeft` the hour expires at —
  the day only counts down, so it needs no wall clock and survives a save.
- **Running out of time restarts the day too.** Same card, same rule.
- **The last call of the day does not end the day.** Whatever is left on the
  clock is the player's: conversations pay $3 each, once per person per day.

Two traps, both already paid for: the entry points start their frame loop
during module evaluation, so `const day` (like `const driving`) must be
declared *above* that call or every frame throws `Cannot access 'day' before
initialization`; and `state.timeHours` is now derived from the countdown for
the sun angle only — nothing should add to it.

## The shape of a teaching day

`engine/content/normalize.js` `shapeMissions()` reshapes whatever the books
wrote, at load, for every theme — so a re-import cannot lose it.

- **Nobody walks into the same room twice in a day.** The design books write a
  day as one unit on one topic and an area is a building, so Riverton and the
  hospital sent the player to the same building three times, on 15 days out of
  15. The unit is kept: the first call on an area is at its room, any repeat
  that day is a person stop.
- **Each day has exactly one person stop**, unless a repeat forces a second.
  The old rule — every third stop campaign-wide — knew nothing about the day it
  landed in, and stacked with the rule above it made 34 of Riverton's 58 calls
  a person hunt.
- **From day 3, every day carries a callback**: one extra call revisiting an
  area taught earlier, oldest first. Blocked practice is how the books are
  written and how people forget; this is the spaced retrieval that fixes it,
  and it is why a day has a second building to walk to. A callback prefers a
  `— Review` variant of the lesson where the theme has one — the hospital has
  105 of them and none were reachable before this.
- A stop's `person` and `callback` flags are authored data; `isPersonStopForIdx`
  honours the flag and falls back to the campaign-wide rule for anything
  unshaped.

## What a mission stop looks like now

- Three stops per mission plus a callback from day 3; **the day's person stop**
  is found by walking to a named person instead of entering a building.
- Answer formats: Protocol, Sequence, Ballpark, Science Tank, Diagnosis
  (instrument panel + candidates, draws a figure), TRIAGE, CASEBOOK, and CHOICE
  — one question, four candidates, and the rebuttals for the wrong ones.
- **Nineteen more are instruments in `engine/core/instruments.js`**, and they
  came from counting: six FPS-native interaction documents, one per game, specify
  104 interactions between them, which turn out to be nineteen distinct designs.
  `gamekit/FORMATS.md` is that catalogue, and all nineteen are built, plus a
  twentieth — **DERIVE** — which did not come from the documents at all: it was
  written for a calculus course, grades the line the previous one actually gives
  you, and its trap is that one wrong branch per step must stay algebraically
  valid or the step is passable by elimination. It once graded a second half —
  name the rule that licenses each step — and that is **off by default** now,
  behind `askRule: true`. The argument for it was that the right line for the
  wrong reason is how somebody passes calculus without learning it; the argument
  against is what counting found, that in five of Midway's 29 steps and ten of
  Headwater's 33 every candidate carried the *same* rule, so the second half of
  the answer was a click with one possible value. A `rules` list without
  `askRule` is refused by the importer rather than quietly ignored. The twelve
  carrying four or more instances each — TRIGGER (write the rule before the number moves), VALUE (what
  would this measurement change), CLOUD (a distribution against a limit, where
  narrowing is not shifting), ALLOCATE (a finite pool, scalar or rate × time),
  TRACE (which channels share a reference; agreement is not independence),
  ATTEST (the record is not the condition), CONTROL (change one thing, reverse
  it), TRIANGULATE (constraints make a region, a systematic moves it),
  DEGENERACY (a family of solutions until other physics arrives), CHAIN (name
  the governing transfer), BALANCE (close the ledger, find the hidden term) and
  VERIFY (predict, act, measure — failing to measure is its own failure). And
  seven thinner ones: PROPAGATE (which input width dominates the output's),
  STRESS (candidates against an assumption's range), DELEGATE (a finite team and
  what command takes itself), FLY (bounded commands on undamped dynamics, so the
  brake has to lead), RESIDUAL (structure in what a fit leaves over), INJECT
  (push a known population through your own pipeline) and ROUTE (a sequence that
  can be rejoined after an interruption). `books/instruments.yml` authors one
  stop of each across seven days. **Red Sand is the first shipped game to author
  one**: its sol 12 is an ALLOCATE — four hundred and thirty kilowatt-hours on a
  dust-storm sol against seven loads that want more than that between them — and
  `npm run drive redsand` drives it right and wrong. The other fourteen author
  none, which is content work rather than engine work.
- **Seven formats are graded against the place rather than against a board.**
  TRIAL was the first and the exception; GREET (get round a list of people before
  the hour is out), FOLLOW (stay inside a band behind somebody who will not
  wait), HUNT (find enough of the same thing, all of them drawn on the map),
  CANVASS (ask a yes-or-no question until the sample can answer it), EVADE (hold
  a clear radius for a stretch of time) and TAG (the same test the other way
  round — close on somebody walking away, which a straight line cannot do,
  because two people walking the same way close at the *difference* of their
  paces) followed. The panel is a briefing;
  pressing the button **suspends** it and hands the player back to the site with
  the run going on around them. All six share one lifecycle in
  `engine/world/worldFormats.js` — teleport to the spawn, hang something in the
  scene, run a clock, watch a distance, tear it down however it ends — because
  five copies of that is house rule 1 in a new directory. **Four of them borrow a
  person the crowd already owns** (`npc.scripted`, honoured by `crowd.js`) rather
  than building a figure, which would draw a look from the world's own seeded
  generator and move every later draw. **Their trap is one sentence in five
  currencies**: *a run whose goal is reached by standing still, or by walking to
  whatever is nearest, asks nothing* — so all five read the theme's `site.js`, as
  TRIAL's does, and settle it in closed form the way HOLD's does. Eighteen cases in
  `npm run traps`. And the measurement that matters is the one a browser cannot
  make: `npm run drive` plays all six through a **stub world** that hands back
  whatever the play asked for, so it is blind to whether walking up to somebody
  counts as a greeting or whether EVADE's clock stops while you are caught.
  `engine/dev/worldFormats.mjs --selftest` is that half, in Node, inside
  `npm run check` — and its first FOLLOW case passed while measuring the wrong
  thing, which is why the case that survives is walking at the guide's shoulder.
- **Five more formats are fun first, and they are in the same registry on
  purpose.** BELT — a binary category sorted against a line that speeds up —
  TRIAL — the theme's own world, driven through gates and graded on the order
  rather than the clock — HOLD — one quantity held inside a closing band while
  scripted loads push it out — SPOT — a standing instruction replaced mid-run
  without announcement — STACK — the `spectrum_stack.html` port, a question
  rail over a filling well where a wrong answer packs a row — and LOB — angle and
  charge against a mark, with the launch speed deliberately withheld so it cannot
  be computed — did not come from the six documents. The move it renders is the *player's* rather than the
  scientist's, and it exists because a stop a child replays is worth as much as
  one a specification asked for. `gamekit/ARCADE.md` is the argument and the plan
  for one more, and `ARCADE.md` §16 is the argument that FLOW as specified should
  not be one of them. They are entries in
  `INSTRUMENTS`, not a second system, because a second registry is a second thing
  **STACK is suspended** — reported broken in play, and `SUSPENDED_FORMATS` in
  `engine/content/normalize.js` is the list that says so. A suspended format keeps
  its panel, its METHOD line and its traps; what is refused is *authoring* one, at
  both ends — `import-book.mjs` fails the stop and `validateContent` fails a theme
  that ships one through a stale generated file. `books/instruments.yml` keeps its
  STACK stop commented rather than deleted, because deleting it would mean
  rewriting the bank to lift the suspension, and `npm run traps` skips its four
  cases *out loud* rather than passing them vacuously — a blanket refusal would
  otherwise satisfy every "the importer refuses this" assertion for the wrong
  reason. Lifting it is deleting one line.
  `questionUI`, `fieldCoverage`, `instrumentGoals`, `instrumentTraps`,
  `instruments.html` and `instrumentDrive` each have to learn about — and six
  tools learning a special case is how the engine got forked the first time.
  **The line it must not cross is rule 3, difficulty is judgment never
  dexterity**: speed is the pressure and accuracy is the grade, so
  `ctx.commit(ok)` fires on the fraction sorted right and never on the score.
  **SPOT is the argued exception**: the cost of a withdrawn instruction is
  measured in seconds and a version with no clock measures nothing, so it weights
  the seconds either side of a change while refusing to grade reaction speed —
  and for Sightline that is the AP Psychology syllabus rather than flavour.
  Two new pieces of engine came with it and both are general: `playSurface.js`,
  a canvas that repaints every frame and pauses itself when the tab
  backgrounds — `figures.js` draws a picture once, which is the wrong shape for
  anything that moves — and `ctx.onClose(fn)`, the first teardown hook a panel
  has ever had, because `bind()` returns nothing and a frame loop nobody cancels
  draws into a detached canvas for the rest of the session. TRIAL needed three
  more, all optional and all absent in every harness: `ctx.world`,
  `ctx.suspend()` and `ctx.resume(html)`, so a format can hand the player back to
  the place they are standing in and take the panel down while they drive.
  `engine/world/trial.js` owns the gates and knows nothing about the right order;
  `instruments.js` still imports no three.js, which is what keeps it loadable in
  Node and on a page with no scene.
- **A gate is not a building's centre, and a screenshot is the only thing that
  said so.** TRIAL gates resolved by building id were placed at `x, z` — the
  middle of the building — so every ring rendered under the floor with its beacon
  inside the roof, and a solid collider stood between the player and all of them.
  The importer's geometry check passed, the driver passed, the run completed and
  the order came back correct, **because every harness teleports**. Gates now
  stand off the door by `d / 2 + 10` on `kit.js`'s own `facing` convention. The
  same lesson as the gable roof, in a feature whose entire content is where
  things are.
- **A frame count is not a clock, and a `requestAnimationFrame` promise is not
  guaranteed to settle.** Both cost a day on HOLD, and both are in
  `instrumentDrive.mjs` rather than in any game. The driver budgeted a 45-second
  run at 4200 frames on the assumption of 60 fps; headless Chrome ran at 123, so
  it bought 34 seconds and reported a working format as broken. And a headless
  page sitting behind twenty mounted panels stops being given frames at all, so a
  bare await on rAF never resolves and the whole driver hangs at 0% CPU with
  nothing printed. Waits are bounded by wall time and raced against a timer now,
  and a format whose panel runs for authored seconds is driven on a **rescaled
  copy** — HOLD's physics is rate × time, so every time ÷ 15 and every rate × 15
  traces the same curve through the same band in three seconds. Any future format
  that runs on its own clock needs the same treatment.
- **Ask what a player who understood nothing would score, before believing any
  pass mark.** Three formats in a row shipped a first version that was too
  generous in the same way, and the wrong-answer path in `npm run drive` is what
  caught each one. SPOT's was the sharpest: scoring every item on the board, a
  run that went on applying the *withdrawn* instruction scored 86% and passed,
  because most of what arrives is wanted by neither instruction and is correctly
  ignored by somebody who has understood nothing. Only the **discriminating**
  items are scored now — wanted by the instruction in force, wanted by the one it
  replaced, or taken by the player — and the same run scores 55%.
- **A step in the load is a step in the rate.** HOLD's whole subject, and the
  reason its trap can be settled in closed form: integrate the authored
  disturbances with the control untouched and compare the *fraction* of the run
  inside the band against the pass mark. The first version asked only "does the
  needle ever leave", which a board a player passes by doing nothing satisfies —
  the same too-weak-measurement mistake as everything else in this file.
- **The day's clock is stopped while any panel is open, in every game.**
  `PANEL_PACE` in `day.js` is the one number; it is 0, and putting 0.25 back
  charges every panel again. BELT is what made the case — a format with its own
  rising pressure running against a day that also ran down charges the player
  twice — and the same objection turned out to hold for a Diagnosis panel with
  six readings and for any junior edition whose reader is eleven. A format may
  also declare `pausesClock: true`, which BELT does; that is redundant today and
  kept deliberately, so that restoring the global rate cannot silently un-fix the
  format the decision was made for. **`tickDay` read `pace > 0 ? pace : 1`**, so
  the one value meaning "stop" was the one value that ran at full speed — every
  caller would have looked correct while the day drained four times faster behind
  a panel than while walking. Zero is a rate now; only negative and non-finite
  fall back. In a room the clock is the server's, so the client says so through
  `setPanel(open, frozen)` — additive, ignored by a casebook that has not
  deployed the other half, which degrades to the server's own panel rate.
- **Every instrument carries a trap, and the trap is an importer check.** A
  cloud whose pass mark a re-target reaches, an allocation board affordable
  whole, a chain whose distractor governs, a verify whose every prediction is
  accepted — all of them render perfectly, grade perfectly, and teach the
  opposite of what they were written for. `npm run traps` breaks all 35 and
  asserts the importer refuses each.
- **Four of them are instruments the player operates**, not questions they read.
  SWEEP is one control and a response plotted only where the player looks — a
  resonance, a decay, a trade-off. HOLDOUT fits a rule on one set of data, freezes
  it, and scores it on data it has never seen; the fitting curve carries a spike
  that beats the honest answer, so overfitting costs the player the stop. TALLY
  accumulates shots into bins and builds a statistic out of them, and the decision
  it grades is when there is enough data to report. PROBE hands over no readings at
  all: the player takes them one station at a time along a physical chain and names
  where the pattern breaks. All four are in Quantum;
  `engine/dev/instruments.html` draws every one in a theme on a single page, which
  is the only sane way to look at them — reaching one in the game means playing to
  the right day with time left on the clock.
- **A panel that grades against a number has to print that number, and a panel
  that simulates has to let you simulate twice.** Both halves were found by one
  player on one stop. Bring Them Home's FLY graded a pulse-and-brake plan against
  four criteria — arrive at 90 ± 3 degrees, be turning under 1 deg/s when you get
  there, spend no more than 16 s of thruster — and printed none of them until
  after the *single* run it allowed; the target line was parked off-canvas until
  then. So the player set two sliders with no idea what either was for, watched a
  trace, and was finished. Every check was green, because every check reads the
  book and the book had all four numbers in it.
  **The distinction that makes this safe** is against rule 2 in
  `instruments.js` — *the panel never prints the target*. The target there is the
  **answer**; a goal is the **constraint the answer is written against**, and
  they are not the same object. Print "at least 95% inside the corridor"; never
  print BALANCE's total, which *is* the answer. And grading slack on a value the
  player reports — a BALLPARK tolerance, a VERIFY band, a HOLDOUT pass mark —
  stays unprinted: knowing it changes nothing about how you get there and invites
  aiming at the edge of it. `engine/dev/instrumentGoals.mjs` is the check, with a
  selftest, and it fired on four panels the first time it ran.
  **The second half cost a leak nobody was looking for.** CONTROL's commit button
  was gated on having isolated *the culprit* and reversed it — so the button
  lighting up announced which machine was the answer, rule 1 broken by the
  enabling rule of a button. The gate is now about the variable the player has
  **named**: isolate it, put it back, then commit. A greyed-out button is only
  fair when the panel says what is missing, which is what the strip under the
  rows now does.
  **CHOICE exists because importers guess.** An activity that is a plain
  multiple-choice question gets typed as the nearest format the importer knows,
  which is how the hospital ended up with 36 "diagnoses" that had no instrument
  panel and 27 "casebooks" whose proposals read "Other pattern". `theme.js`
  retypes them; the book's own `rebuttals` now appear in the verdict.
- **People stand aside.** Walking into somebody displaces them — straight back
  where there is room, sideways where there is not. A four-metre passage with
  two people in it is otherwise a blocked passage the player cannot ask to
  move. In `engine/people/crowd.js`, and in the hospital's forked `npcs.js`.
- **Every room is walkable whenever you like, in every game.** What
  changes with the mission is whether a case is open there. A room with nothing
  open shows a short card and charges nothing — it is not a locked door.
- **The outdoor games have interiors now.** A door opens a real room built by
  `engine/world/interiorBuilding.js` from the theme's `interiors` block: bench,
  live instrument screen, case plate, case stand, way out. The rooms are built
  lazily in an *interior district* at x ≈ 4000 and entering teleports you
  there — not inside the exterior shells, which are solid boxes on graded
  terrain. The caller swaps the player's ground function and bounds
  (`setGround` / `setBounds`) on the way in and back on the way out.
- **Questions are instrument-first.** Any lesson can carry a `figure`
  (`engine/core/figures.js`) and every format renders one: Ballpark runs a live
  readout and settles onto a log scale against the true value, Sequence is a
  numbered rail, Protocol draws its matches as lines that redraw as you choose.
- **Right or wrong, the verdict is a card on its own overlay**, not appended
  below the question. It carries the figure that shows *how* wrong.
- A wrong call charges only a 3-hour minimum, then offers four priced ways out:
  answer again ($5 / 12 h) or move on ($10 / 24 h). Money options disable when
  the reserve is short; time options never do, so nobody is ever trapped.
- **The map shows the person you have to find**, where they are standing now
  and which way they are facing; you carry a facing arrow too. Person stops
  used to be findable only by walking the town reading nameplates.
- **Each stop opens with why it matters now** — which call of how many, whether
  the earlier ones held, and the clock. Composed in `stopDramaHTML()`, so it
  needs nothing authored; a theme that writes `stop.why` overrides it.
- Talking to anyone who is not this mission's person opens their passage and one
  question about it, worth $1 once. The passage closes before the question;
  reading it again is offered and forfeits the dollar. The question is authored
  where the roster carries a `quiz` array, and generated by lifting a sentence
  where it does not.

## The games are played with thumbs too

`engine/core/touch.js` is the second input path, and it exists because the
casebook app is opened on tablets. Touch fires no `keydown`, so WASD is inert;
iPadOS Safari has no Pointer Lock API, so `controls.lock()` never resolves — and
that is the half that matters, because **`isLocked` gates both `updatePlayer`
and the interaction raycast**. Without it the world renders perfectly and the
player is welded to the spawn, which is house rule 8 arriving through a
different door. `initPlayer` builds the layer and sets `isLocked` by hand: there
is no pointer to capture, so there is nothing to be locked out of.

- **It writes the same `moveState` the keys write**, which is why it drives a
  scooter and flies a helicopter without knowing either exists — `driving.js`
  and `flying.js` both read the player's key state through an `input()`
  callback, so anything that satisfies WASD satisfies them. The stick is
  analogue, so a half-pushed thumb walks at half speed where a key only ever
  says 1.
- **Everything else is a synthetic `KeyboardEvent` on `window`** — use, map,
  summary, the collective. `main.js` stays the single description of what each
  control does; a touch button that called `activate()` itself would be a second
  copy of that decision, and this repo has paid for second copies.
- **Look is done here, not through PointerLockControls**, whose `onMouseMove`
  returns early unless *its* `isLocked` is true and that flag belongs to the
  browser. The rotation maths is lifted from it verbatim so a drag and a mouse
  move produce the same turn.
- **Turned on by `(pointer: coarse) and (hover: none)`, not by `maxTouchPoints`
  ** — a touchscreen laptop answers yes to the second and has a mouse. `?touch=1`
  and `?touch=0` force it either way, which is the only way to iterate at a desk.
- **Anything absolutely positioned from a `Touch`'s `clientX/clientY` must be a
  child of `#touchLayer`.** It is the only element in the layer whose origin is
  the top left of the window; the move zone is anchored bottom-left, and the
  floating stick parented there drew several hundred pixels below the fold —
  invisible, and indistinguishable from the stick not working.
- **A panel opening has to zero the stick.** The panels all cover the layer at a
  higher stacking level, so they already swallow taps, but a thumb still resting
  on the stick keeps walking behind an open question card while the day's clock
  runs. `touch.js` watches the same element list `app.js` `panelUp()` uses, plus
  the title blocker.

`gamekit.moveState` and `gamekit.updatePlayer` are on the dev handle so an input
path can be stepped by hand in a throttled tab. Importing `player.js` from the
console does **not** work for this — it resolves to a second copy of the module
with its own uninitialised `camera`.

**`engine/device.js` is where the device question is answered**, not `touch.js`,
because two layers need the same answer and nothing under `engine/world` has
ever imported from `engine/core`. `world/materials.js` `tuneRendererForDevice()`
is the other caller: pixel ratio 1.5 instead of 2 and `PCFShadowMap` instead of
`PCFSoftShadowMap` on a coarse pointer. A tablet reports a device pixel ratio of
2, which on an iPad is the fragment count of a 4K monitor for a fraction of the
GPU; 1.5 is 47% fewer fragments and invisible at that density. **Five modules
create a renderer** — the three engine worlds and the two themes that bring
their own — and all five wrote the same four lines, which is why the numbers
moved into one function. A mobile budget applied in three places out of five is
worse than none.

What that does *not* fix is the draw call count, which is the real cost: Red Sand
issues about 1,500 a frame from 1,973 meshes with 5 instanced, 1,601 of them
shadow casters. That is content work — instancing, and not every bolt needing to
cast — not a renderer flag.

**`vh` is wrong on iOS wherever a panel is sized against the window.** It is the
height with the browser toolbars *hidden*, so `.modal{max-height:85vh}` let a
long question panel run its own bottom under the chrome — and `.modalActions` is
sticky to the bottom of that box, so the answer button went under with it. Every
such rule now carries a `dvh` line after the `vh` one. Same bug as `#canvas`
being `100vh`, and it will happen again the next time something is sized in
viewport units.

## House rules learned the hard way

1. **Do not fork the engine again.** Three copies meant every fix three times.
2. **Budget real lights.** 28 point lights took a floor from 118 fps to 20.
   Ambient + hemisphere + emissive panels + IBL. Ceiling of 6 real lights.
3. **Never put text on a `DoubleSide` material.** It renders mirrored from behind.
4. **One source of truth for ground height.** Shipped broken twice.
5. **Never dim gameplay elements with opacity.** Darken the colour instead.
6. **Outdoor palettes blow out.** Under ACES with a bright sky IBL a mid albedo
   renders near-white. `envMapIntensity` 0.35–0.5, exposure below 1.0, and an
   albedo darker than looks right written down.
7. **`kit.js` placers take `(x, z, y)` — ground last.** One call written
   `(x, y, z)` put six display boards sixteen metres in the air.
8. **Keep the spawn point and the route clear.** A prop over the spawn welds the
   player in place: renders perfectly, W does nothing.
9. **A crowd checks its destination, not its path — fix both.** `blocked` was
   consulted when a walker *chose* somewhere to go and never while it walked
   there, so on open ground people rarely crossed a building and in a submarine
   they walked through every bulkhead. The same predicate now takes a pad, since
   the margin that keeps somebody from being *placed* against a wall is wider
   than their shoulders. A fanned-out crowd position needs the same check: a
   person placed inside the furniture stands there all game, because every
   direction out is blocked and no target is reachable.
10. **The player's width is a theme decision.** 0.45 suits a street. A hatch is
   a 1.1 m opening, which leaves a twelve-centimetre slot — "sometimes I cannot
   get through the door". `look.playerRadius`.
11. **`scene.environmentIntensity` does not exist before three r163.** Setting it
   is silent and the environment applies at full strength — a submarine rendered
   with every bulkhead lifted to pale sage. `dampEnvironment(scene, level)` in
   `engine/world/materials.js` is the repo's answer, and it works per material.
12. **Compare a challenge format through `kindOf()`, never as a raw string.**
   The books spell them "Sequence", "SEQUENCE" and "Science Tank". Comparing
   raw strings left 72 of the hospital's lessons matching no branch and
   rendering "challenge type SEQUENCE is not yet implemented" in a game that
   had shipped. Both dev checkers canonicalise the same way.
13. **`walkCost()` charges the time itself.** It returns advanceTime's verdict,
   not a number of hours, so `advanceTime(walkCost(d))` adds `undefined` to the
   clock. NaN reached the sun angle before it reached the HUD, so the symptom
   was the whole world going black. `advanceTime` now refuses non-finite hours.
14. **A save belongs to the theme that wrote it.** `loadState` used to fall back
   to the hospital's legacy key for *every* theme, so playing the hospital and
   then opening either other game loaded a hospital campaign into it — group ids
   that theme has never heard of, and the first question panel died on
   `gs.issue` of undefined. `tryLoadSaved` now rejects a save whose group ids do
   not match the theme.
14b. **A control nobody complains about can still be backwards.** `rightDir` is
   `dir × up`, which *is* the camera's own right, and `updatePlayer` scaled it by
   `-right` — so A strafed right and D strafed left in all fifteen games, for as
   long as the engine has existed. Nobody reported it because a mouse corrects
   the heading faster than the error registers, and these are walk-to-a-place
   games where strafing is rarely load-bearing. A thumbstick has no such cover,
   which is how it finally surfaced. Nothing in `check` asserts anything about
   input, and this is what that costs: the fix is one character and it was
   available for years.
15. **The two older games fork `styles.css`.** Their forks stop before the
   instrument-panel rules, so anything the shared question UI draws had no
   styling there at all. Both now `@import` the engine sheet at the top of their
   fork — a `<link>` cannot do it, the path leaves Vite's root and 404s.
16. **Nobody may be *placed* without asking whether the spot is free.** A person
   dropped inside a collider is there permanently: every walker refuses to step
   into a blocked point, and from inside one every neighbouring point is blocked
   too, so they cannot walk out. Three of the hospital's four spawn paths had no
   check at all. `settle()` (all three crowds) rings outward to the nearest
   clear spot, and each walker also rescues anybody already inside something.
17. **The physical sky has a radiance floor.** With the sun below the horizon and
   both scattering terms at zero it still renders ~0.03 linear, which tone
   mapping lifts to flat grey. No uniform reaches it. A nocturnal theme sets
   `atmosphere.nightSky` and the dome is hidden below deep night. Related:
   `nightTurbidity` / `nightRayleigh` and `look.nightLift` exist because the
   engine's defaults are tuned for a *daytime* game's dusk.
18. **`look.far` has to clear the sky dome outdoors — from the far end of the
   site, not from the spawn.** At an interior's 160 the dome is clipped away and
   the sky renders black in broad daylight, with no error anywhere and the
   horizon ranks gone. 900 is the working value on a compact site; the clearance
   is `atmosphere.scale + how far the player can get from the origin`, so
   Wellmere's 300 m of headland and causeway needs 1500 against a dome of 700.
   The symptom is a black band above the horizon at one end of the map only,
   which reads as a rendering bug and is a camera setting.
19. **Ground and crop have to be a value apart, and the ground is the one to
   move.** Wellmere's first field put mid-green plots on mid-green turf and
   1,300 of them read as one flat smear from twenty metres. Lightening the crop
   turns it to pastel under ACES; darkening and browning the *ground* — turned
   earth, two stops below what looks right on the canvas — separates them and
   makes the alleys read as alleys. Same rule as house rule 6, applied to a pair
   rather than a surface.
20. **Grep for the previous game's nouns before assuming a module is generic.**
   `simulation.js` held one game's cast, `constants.js` one game's save key,
   `player.js` one game's field of view and floor height.
20. **The sky model is Earth's, and it can be tinted rather than argued with.**
   `buildSky` runs three.js's Preetham sky, which solves for Rayleigh scattering
   off nitrogen and oxygen. No combination of its four uniforms reaches the
   butterscotch of a dusty carbon-dioxide atmosphere — turbidity and mie only
   make it hazier and paler, rayleigh only moves it between blue and white. Red
   Sand added two optional keys instead: `atmosphere.tint` multiplies the dome's
   output *and* the dome that bakes the IBL, so the ground is lit by the sky the
   player sees, and `atmosphere.haze: { day, night }` replaces the hard-coded
   blue-grey the far ranks and the fog are taken toward. Both are inert unless a
   theme sets them. Set one without the other and a seam appears along the
   skyline, which is what the first pass looked like.
21. **A hard equation early is fine; a derived one before its base is not.** The
   test is dependency, not difficulty — Blackout opens on the swing equation and
   that is the right first question. What was wrong in eight of the fifteen games
   was impulse on day 3 with `F = ma` computed nowhere, the chain rule on day 2
   with the power rule not until day 7, apparent power on day 3 with `P = IV` on
   day 10. `needs` in `tools/syllabus.js` names what each equation is derived
   from, by `e` string rather than by position, and `equationOrder.mjs` fails the
   game for an inversion. Only a question that *computes* settles it, so a base
   taught only through `CHOICE` — which has no relationship, template or worked
   solution — is a base the course never teaches. Corollary: a `DERIVE`'s own
   lines are arithmetic, and reading only `relationship` said Headwater computed
   the power rule on day 7 when the player had been applying it on day 1.

## Screenshot before believing anything visual

This is the most expensive lesson in the repo. In one session: a gable roof was
inside out in the *shipped* game and in the port of it; a building sign sat
behind a canopy slab; half the crowd never moved; a walk cycle's feet travelled
twice as far as the body. **Every one of them passed every assertion available** —
exports present, meshes created, no errors, builds clean.

Corollaries:

- A "before" screenshot is a baseline, not a correctness check. The roof was
  already wrong in the reference shot and I matched it faithfully.
- **A background browser tab gets no `requestAnimationFrame`.** The scene renders
  dark, nothing animates, `getCurrentTarget()` stays null, and synthetic key
  presses appear to do nothing. Check `document.visibilityState` before
  concluding anything is broken. `window.gamekit` exposes `updateCrowd`,
  `updateInteractions`, `getCurrentTarget` and `activate` so a throttled tab can
  be stepped by hand; `window.hospital` and `window.projecty` are the same
  handle for the other two (`teleport`, `getPosition`, `scene`, `THREE`, and
  each game's own extras).
- A dynamic `import()` from the console may resolve to a **second copy** of the
  module graph with its own state. Compare
  `getState() === window.gamekit.getState()` before trusting a console test.

## Editions, audience and copy

- **A theme declares who it is for.** `audience: { grade }` in the manifest;
  `engine/core/typography.js` scales the root font size from it — 1.18× at
  primary, 1.10× middle, 1.04× high school, 1× undergraduate. `audience.textScale`
  overrides. Applied from `engine/core/theme.js`, once, for every game. The same
  game can therefore ship at several reading levels: a new edition is a manifest
  line plus a differently-written book.
- **An edition is a registered theme, not a build flag** —
  `MIDDLE_SCHOOL_EDITIONS.md` is the whole plan, and fourteen of the sixteen
  games are getting a grade-6 one. `themes/<base>_ms/` holds a manifest, a
  one-line `site.js` re-export and its generated content, and **nothing else**:
  the place, props, interiors and outfits are the base theme's, imported across.
  `tools/derive-edition.mjs` writes one; `engine/dev/editionParity.mjs` (inside
  `npm run check`) fails the game if the cast, the areas, the places or the
  manifest have drifted from the base. The reason it is a separate theme id
  rather than an `EDITION=` alias is the save key: `gamekit_${theme.id}_v1`, and
  the group ids are deliberately identical between editions, so house rule 14's
  guard would wave a ten-day campaign into a fifteen-day slot.
  **`DERIVE` is banned below grade 9** — its subject is algebraic manipulation,
  and a softened version is spot-the-malformed-line.
- **Measure the reading level, do not judge it.** The hospital's opening card was
  written at Flesch–Kincaid 7.7 for an audience whose lessons sit at 2.7.
  Hospital ≈ 2.6; the college games run 10–14.
- **The opening card is ONE paragraph of situation.** No mechanics (order,
  clock, prices), no scope disclaimer, no controls note — all of it was removed
  from every game. And never tell the player what they *do not* do: "you do not
  touch the vehicle", "you do not prescribe" both read as apologies for the game.
- **And it was the one piece of prose nothing was counting.** The reading-level
  gate covered scenes and verdicts; `checkVoice` read the opening only for the
  slogan it ends on. So the first paragraph a player ever sees — the only one
  read before the game has taught them a word — had no gate, and ten of fifteen
  cards failed the moment one existed. Red Sand opened on "the transfer window
  opens on sol 486" and "the ascent vehicle standing on the pad", three undefined
  terms in a 45-word sentence; Ice Core opened at Flesch–Kincaid 17.5 with a
  55-word sentence. `validateContent` now checks the card's reading level against
  `audience.grade`, fails a sentence over 40 words, and lists hard words the
  glossary never defines. **The sentence length is the one that bites** — the bad
  cards were not hard vocabulary, they were pile-ups, and a 40-word sentence with
  two semicolons is unreadable however plain its words. What no cheap rule
  catches is a domain term built from ordinary words, which is exactly what
  "transfer window" is: for that, read the card.
- **Inside that paragraph there are four beats, in this order.** Every card in
  the set was swept against them: what has happened or is about to, and to whom;
  the player's job stated as authority — "You are the …, which means …"; the
  clock or the argument, with somebody from the roster in it; and last, what it
  costs, in people. **The failure they were swept for is the inventory opening**:
  Red Sand began "nine modules buried to the eaves, eighteen hundred square
  metres of solar panel, an ascent vehicle four hundred metres past the last of
  them" — every fact true, no situation, nobody in it, and a specification for a
  closing line. The same paragraph now opens on the transfer window that does not
  move and ends on six people going home on what two named engineers can agree to
  make. A card ending on a number is usually a card that has not said what the
  number does to anybody. **And two games shipped with no opening at all** —
  Project Y and Hospital Heroes rendered an empty title card for as long as they
  have existed, because `opening` is optional in the manifest and nothing checks
  for it.
- **The verdict says `Correct` / `Incorrect` first.** "Evidence accepted" is the
  response's language, one inference away from what the player asked.
- **The plan card note is "Take them in whatever order."** Nothing else.
- **The scene is the situation. The verdict is the teaching.** This is the
  opposite of how all seven games shipped, and it was the single most expensive
  content mistake in the repo. A scene of 90–100 words carrying the mechanism
  means the player reads the answer, answers, and learns nothing from being
  right — Project Y explained the four rotational rules and then asked the
  player to match them, against a verdict of nine words. Every game was
  rewritten: scene **30–45 words** of situation only, `why` **70–90 words** of
  mechanism (Hospital ~50, because it is written for a second-grade reader), and
  a rebuttal per wrong option saying why *that* one fails. Measured across the
  seven, teaching-to-scene went from 0.22–0.52 to 2.7–3.4.
- **A stop declares what it assumes.** `assumes:` on the lesson — the prior
  knowledge the question is entitled to expect. It exists because the honest
  version of "could a student answer this?" is "with what already in their
  head?", and writing it down is what stops a question quietly requiring a
  degree.
- **Reading level is measured, not judged.** `audience.grade` in the manifest is
  a gate: validateContent notes any passage above it and fails one two grades
  over. The vocabulary of a subject cannot always be simplified — "spontaneous
  fission" is the word — so the lever is sentence length, which is the other
  term in the formula.
- **`theme.stopNoun`** — what a non-person stop is called. Mission Control has no
  rooms and no doors, and "a room" sent players hunting for one.

## Finding things and people

- **Anybody the day still wants has a cone over their head**, several at once,
  drawn with `depthTest: false` so it shows through walls. The only thing in
  these games allowed to draw over everything. In `engine/people/crowd.js` and
  the hospital's forked `npcs.js`.
- **Any open call is marked** — case beacon in a room, and in Mission Control a
  beacon over the console (there is no room to put one in).
- **The map is drawn at the size it will be seen at.** `renderMap({ maxW, maxH })`
  fits the box and turns the plan sideways when that shows it larger; it used to
  be 720 px wide regardless and then scaled down by CSS, which made a long site's
  labels two pixels high. Interior rooms are drawn on their own side of the
  corridor — drawing every room full-width put opposite rooms on top of each
  other — and a name that will not fit inside its room goes outside with a leader
  line rather than being truncated.
- **A site spread over kilometres draws a window, not the whole place.**
  `site.mapRadius` (Planetary Defense: 170 m) centres the map on the player and
  reduces everything outside it to an arrow on the edge it lies beyond, with the
  distance — because the range is 1.6 km wide and base camp is seven buildings
  inside 200 m of it, so the whole-site map drew the only part anybody walks
  around as one unreadable blob. The window is half a radius in the short
  direction and opened out to the panel's aspect in the long one, and clamped
  inside the site so it never shows ground beyond the edge of the world. The
  arrow labels carry their distance after a `·`, so they are placed with
  `whole: true` — the label placer's shortening rule cuts at exactly that
  separator, and threw the distance away. Themes without `mapRadius` are
  unchanged.
- **`maxW` for the map sheet is 760, because the card is `min(820px, 100%)`.**
  The caller asked for 1100 for years and it never showed, because the aspect of
  a whole site capped the width first; the first map that could fill it ran its
  right-hand edge and every label on it under the edge of the card.

## Content and safety

Audience varies: Hospital Heroes is ~grades 3–4, The Contaminated City is
college chemistry. The design books carry explicit safety framing — the player
never prescribes, diagnoses for real, or handles hazardous material outside a
fictional frame. Keep it. No gore; stakes come from time, teamwork and
consequence.

Content invariants, all asserted by `validateContent`: every lesson has a real
`scene`; `takeaway` never equals `why`; `choices` contains `correctChoice`
verbatim (grading is by label); the pre-question panel shows the scene and where
you are, never the takeaway.

## Known unfinished work

- ~~One world is still hand-built: the hospital's.~~ **Both flips are done.**
  Project Y builds the mesa from `site.js` through `engine/world/outdoorTown.js`,
  and the hospital builds its ward from `plan.js` through
  `engine/world/interiorFloor.js` — `worldParity` says "generated from the site
  data" for both where it used to say "hand-built". The hospital's was the easy
  one in the end and nobody expected that: `interiorSite.js` had been
  generalised out of that exact floor, so the flip renamed the plan's keys
  (`CORRIDOR.halfWidth` to `metrics.corridorHalfWidth`, `ROOMS` to `rooms`) and
  deleted 1,070 lines of world builder, 766 of fit-out and 236 of interior
  lighting. What replaced them is `themes/hospital/props.js` on top of
  `interiorKit`, which is 300 lines and has had every fix the fork missed.
- **How the Project Y flip was done, because the hospital's will want the same
  shape.** It went in two steps, a year apart, and the order is the lesson. First
  an *adapter*, not a rewrite: `src/world.js` kept the old names and mapped them
  onto the engine's contract — one-argument `initWorld`, argument-less
  `updateWorldFromState`, `getBuildingPosition` onto `getStopPosition`,
  `updateDayNight` onto `updateTimeOfDay` — so the flip touched the world and left
  the game alone. Then the entry point went, and with it the adapter: with
  `gamekit/src/main.js` calling `outdoorTown` directly there was nothing left for
  it to adapt. `project-y-fps/` is a tombstone README now, and the game is
  `themes/projecty/`. Dropped on the way across, deliberately: the weekly funding
  economy and the special-request vignettes, which existed only in that entry
  point and which the day model had already replaced everywhere else. What made it safe was checking the terrain *before* porting it: the
  engine's `mesa` profile was compared against the heightfield `env.js` computed by
  hand over 841 points, mean difference 0.06 m, and the only half-metre cases were
  building pads where the old surface noise dipped a bench that should read level.
  Do that comparison first; if it fails, the flip is a terrain port and a much
  bigger job.
- **Project Y is not fully declarative yet.** The pine forest, the ground scatter
  and the lamp positions are code in `themes/projecty/props.js` rather than site
  data. `src/env.js` is down from 640 lines to 244: the sky, terrain, roads and
  ridges it used to build are deleted, and what is left is `plantTrees`, the seeded
  random and `terrainHeight`, which is a door onto the engine's `groundHeight`.
  **`ROADS`, `onRoad` and `MESA_PLAYER_LIMIT` look dead from outside and are not** —
  `plantTrees` reads all three to decide where a tree may stand, which is why the
  roads are declared twice, once as `site.paths` for the engine to grade and once
  here as the rectangles the forest keeps out of.
- See `gamekit/FOURTH_GAME.md` for the plan this came from and what is left.
- **Project Y bios have no authored questions yet.** Its 26 bios are long and
  good (164 words mean) and not one carries a `quiz` array, so every one falls
  through to the generated sentence-lift question. Hospital, The Contaminated
  City, Deep Watch and Bring Them Home all author theirs.
- **Outbreak and Planetary Defense have half a roster each.** Six of twelve
  people in each carry a real two-paragraph bio and a question; the other six
  carry one sentence restating their job title and no question at all. Bring
  Them Home had the same split and has been written; these two have not.
- ~~`Hospital/hospital-fps/src/questions.js` is dead Project Y trivia~~ — gone
  with the package it lived in.
- `questionUI.js` question renderers should become pluggable per theme.
- `engine/core/*` still uses Los Alamos vocabulary in places (`divisions`,
  `budget`, `Director funds`).
