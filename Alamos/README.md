# Alamos — mission-based learning games

First-person, mission-driven educational games on three.js, plus the shared
engine they run on. Fifteen games are registered in `gamekit/themes.json`
and `npm run check` runs every one. Each is the same loop in a different
setting: fifteen missions × three stops, walk to a place, answer a science
question, hand off.
No combat, no weapons.

```sh
cd gamekit
npm run check                      # every game: content, reachability, story, styles
THEME=planetary_defense npm run dev
```

---

## Starting a new game — read these two, in this order

**1. [`gamekit/STORY_SPEC.md`](gamekit/STORY_SPEC.md) — what a game needs before
it is a game.** The story contract: one argument with two sides that each win
somewhere, a cast in every day card, a stated timeline, the four beats of a
briefing, and the rule that a card must never contain its own day's answer.
Every rule in it was bought with a defect that shipped in prose that read
perfectly well, and each one is checked by `engine/dev/checkStory.mjs`, which
runs inside `npm run check`.

**2. [`gamekit/NEW_GAME.md`](gamekit/NEW_GAME.md) — the runbook.** The whole path
in order: decide the course, scaffold, write the book, build the place, meet the
writing bar and the question bar, check and print.

The order that works, from STORY_SPEC:

1. Timeline and arc → add two paragraphs to [`STORIES.md`](STORIES.md)
2. Roster, with what each lead believes and which two of them disagree
3. `dayNoun` and `audience.grade` in the manifest
4. The book: missions, stops, lessons
5. The fifteen day cards **last** — the no-spoiler check compares them against
   answers that have to exist already
6. `npm run check`, then open the game and read three cards in place

## The other docs, and when you want them

| File | Read it when |
| --- | --- |
| [`GAMES.md`](GAMES.md) | Picking this up cold — the inventory — what each game is, where its content and place live, what is unfinished |
| [`STORIES.md`](STORIES.md) | You need to know what actually happens in a game, or whether a day still serves its arc |
| [`CLAUDE.md`](CLAUDE.md) | The working manual — house rules, the day model, editions and copy conventions, and the lessons that cost the most |
| [`gamekit/THEME_CONTRACT.md`](gamekit/THEME_CONTRACT.md) | Before touching world code. Short, and every rule in it cost hours |
| [`gamekit/INTERIORS.md`](gamekit/INTERIORS.md) | Before working on the inside of a place |
| [`gamekit/FORMATS.md`](gamekit/FORMATS.md) | Choosing a question format — all twenty instruments, and the trap each one carries |
| [`gamekit/tools/BOOK_TEMPLATE.md`](gamekit/tools/BOOK_TEMPLATE.md) | Writing the book file, with a worked example of every format |
| [`GAME_IDEAS.md`](GAME_IDEAS.md) | Deciding what to build next |

## The games

Every game lives in `gamekit/themes/<name>/`, and `gamekit/themes.json` is the
list `npm run check` walks. `GAMES.md` describes each one; the short version:

| Game | Subject | Unit |
| --- | --- | --- |
| The Contaminated City | College chemistry — a river city after a freight-yard fire | Day |
| Outbreak: Riverton | College biology — clinical through One Health | Stage |
| Deep Watch | Reasoning under pressure — sonar, flooding, air, navigation | Watch |
| Bring Them Home | College physics — a lunar return | Shift |
| Planetary Defense | Astronomy — discovery, characterisation, deflection | Phase |
| Project Y | Los Alamos 1943–45, five divisions | Stage |
| Hospital Heroes | ~grade 2 — junior doctor, children's hospital | Shift |
| Red Sand | AP Chemistry, the back half — a propellant plant on Mars | Sol |
| Blackout · Aftershock · Quantum · The Trial · Headwater · Ice Core · Wellmere | The newer courses | Day |

`instruments` is not a game: it is one stop of every question format, which is
how you look at all twenty of them without playing to the right day.

## What `npm run check` actually runs

```sh
node engine/dev/validateContent.mjs <theme>   # content agrees with itself
node engine/dev/smokeCampaign.mjs  <theme>    # every stop is reachable and gradeable
node engine/dev/probeQuestions.mjs <theme>    # no question answerable without the science
node engine/dev/personStops.mjs    <theme>    # every mission person opens their question
node engine/dev/checkStory.mjs     <theme>    # the campaign tells a story  ← STORY_SPEC
node engine/dev/checkStyles.mjs               # no game re-declares the engine's CSS
node engine/dev/worldParity.mjs               # every group has somewhere to happen
```

And the two that answer "is this good enough" rather than "is this broken":
`npm run shots <theme>` renders every room to one page, and `npm run drive
<theme>` drives every live instrument panel in Chrome.
