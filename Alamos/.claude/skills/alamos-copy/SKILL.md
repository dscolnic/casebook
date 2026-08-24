---
name: alamos-copy
description: The writing bar: the opening card's four beats, the scene-is-situation/verdict-is-teaching rule, name-arrives-with-the-job (introRule), endings addressed to the player, the day-debrief's earned praise in three registers, audience.grade and the middle-school/retarget editions, and the discovery games' real-people rule (theme.history, real: true, no unsupported ATTEST claim signed by a real person). Read before writing or editing any player-facing prose.
---

## A day closes on something somebody said

Fifteen missions used to end on one sentence — *Every call made. The team writes it up
overnight.* — identical on day 1 and day 15, identical after three right answers and after
three wrong ones. The only acknowledgement anywhere in a campaign was the two-word kicker on
the verdict (`The call holds`), the `Correct` headline, and, once, the authored `ending`. **A
game whose youngest audience is in the third grade closed fifteen working days without ever
telling the player they had done well.**

`engine/core/debrief.js` composes the closing card and `engine/dev/dayDebrief.mjs` is the
gate. Four rules, and the last two were found by the gate rather than written into it:

- **The praise is earned or it is not given.** The tier is read off `missionResults`, `hints`
  and `retries` — `clean` (all held, unaided), `worked` (all held, a hint or a second attempt),
  `mixed`, `rough` — so a day on which nothing held cannot be told it went well. A card that
  congratulates every day is a card nobody reads by day 3, and a child praised for a wrong
  answer has been taught that the praise is noise. `clean` and `worked` are separate for the
  same reason: a day carried by three hints is not the day nobody had to check.
- **A named person says it, and the name arrives with the job attached.** Somebody from the
  area the player actually worked in, picked from `(week, area)` through the pure hash in
  `utils.js` — never the world's seeded generator, which hands out looks and would move every
  later draw. The cite takes the authored role **verbatim**: bending it into a sentence ("the
  shift supervisor") means lowercasing it, and every rule that gets that right gets `NASA
  Flight Director` wrong.
- **The crowd is not the staff, and the first version could not tell.** Hospital Heroes has 38
  people on its roster and 30 of them are the children being treated, so the first card that
  ran said *"Nobody had to fix your work today"* over the byline `Lena, Patient`. Nothing in
  the data says "staff"; what it does say is that **one role is held by a crowd and the rest by
  one person each**. A role more than a quarter of the roster shares is the crowd, and the
  area's own leader is kept whatever their role is called.
- **Three registers, not two.** Senior, junior (grade 8 and below) and **primary** (grade 3 and
  below), because the junior lines measured at grade 3–5 on Hospital — "nobody had to fix your
  work" is three clauses' worth of syllables in nine words. Junior and primary interpolate no
  question title: a title is written at the parent course's level and one of them in a short
  sentence undoes the whole register, which is this file's nine-times-paid-for failure arriving
  through a slot fill. The rule lives in `fillSlots`, exported and asserted directly, because
  no junior line uses `{title}` today — read through the banks the case passes for the wrong
  reason and goes on passing after the guard is deleted.
- **The carry line is senior only.** The mission's `takeaway` is the one sentence on the card
  written for another surface, and 41 of the 143 junior takeaways carry a 19-to-23-word
  sentence, usually joined on a semicolon. Taking it only when it measures short enough needs a
  syllable count inside `engine/core`, and the engine deliberately imports nothing from
  `tools/` — a second copy of `SYL` drifts from the first the day either is corrected. So the
  junior and primary cards end on the compliment, which for a seven-year-old is the better last
  line anyway. The other refusal is not hypothetical: Hospital's fifteen mission takeaways all
  read "Shift complete", and *"Carry this into shift 4: Shift complete"* is worse than ending
  on what somebody just said.

**Nothing is authored, deliberately.** The alternative was a `praise:` key on every mission —
435 lines of writing across 29 campaigns, and a new book key `import-book.mjs` would have to
map or silently drop. What makes a generated line specific is that every slot in it is a fact
about the day just played.

**And the gate lied first, in the way this file records fifteen times.** It stripped the markup
and measured the card as one string — but a `<cite>` carries no full stop, so *"That is a good
watch."* plus *"Machinist's Mate Ruth Hallam, Auxiliary Division, Pumps & Patches"* plus the
next paragraph read as one 25-word sentence, and **all thirteen junior editions failed on prose
whose longest real sentence is nine words**. It measures the lede, each spoken line and the
carry line separately now. A byline is not a sentence, and a person's rank is not something a
reading level may ask to be simplified.

Thirteen selftest cases, each verified by putting the bug back. Two would otherwise invert
silently: the byline one above, and a junior line quoting a question title — invisible to every
content gate, because the title is correct where it was authored.

## The discovery games name the real people, and the player is never one of them

**The player is an unnamed role in all ten, and that is the rule.** Every Quick
Discovery opens *"You are the analyst on the team"*, *"the expedition
astronomer"*, *"the radio astronomer on the site"* — a job, never a name. It has
to stay that way now the rest of the cast is real: the ending tells the player
*you made those calls*, and attributing those to somebody who existed is a claim
about what that person did rather than a dramatisation of what they did.

**Everybody else is real where one identifiable person held that role.** 39 of the
60 roster slots across the ten games are now the people who did the work —
Rutherford, Geiger and Marsden; Eddington, Cottingham, Crommelin and Davidson;
Leavitt, Slipher, Hubble and Humason; Franklin, Gosling, Crick, Randall and
Chargaff; Tharp, Hess, Matthews, Benioff and Ewing; Penzias, Wilson, Dicke,
Wilkinson and Roll; Schmidt, Riess, Filippenko and Suntzeff; Mayor, Queloz and
Charbonneau; Ellis, Gross, Gianotti and Incandela; Weiss and González. The other
21 stay invented, and **the reason is not squeamishness**: a Higgs reconstruction
lead or a LIGO parameter-estimation lead was a job held by dozens, and picking one
name for it invents a fact rather than reporting one.

**What it replaced was worse than either.** Three rosters were *pastiche* —
`Ernest Rutherfield`, `Hedda Geiger` (real surname, invented first name),
`Tomas Marsden`, `Marta Leavett`, `Anton Slipworth`. Not real, so nobody was
credited; close enough that a reader who knew the history saw three mangled names
and one who did not learnt three that were almost right and would go on to
mis-cite them. `qd_nucleus` was the sharpest case: a fake Rutherford standing in a
scene that *is* the Geiger–Marsden experiment, on a blackboard already citing
*Thomson, 1904* and *Bragg, 1906* by their real names.

**`theme.history` is the closing note, and it is a different voice from the
ending.** The ending is the last beat of the fiction and is addressed to the
player — `checkStory` enforces that. This steps out: the real people, the real
date and institution, what the game compressed, and one paragraph of *what it does
not soften* — Franklin's data reaching Cambridge without her consent, Tharp's name
off the papers, Hubble's distances a factor of seven small, the blind injections
LIGO had been running for years. It lives in `theme.js` beside `ending` (the
importer has never touched either) and renders as its own block under the ending
card, above the rating.

**`real: true` on a roster entry is the one book key this needed, and it exists
for what it forbids.** `engine/dev/discoveryHistory.mjs` is the gate, in `npm run
check`:

- every Quick Discovery declares a `history` note of at least 60 words;
- every roster person flagged `real` is named in that note, so a rename cannot
  drift the cast and the credit apart;
- the opening casts the player as a role and never as a real person;
- **no ATTEST claim the game marks unsupported is `signedBy` a real person.**
  ATTEST's whole subject is that the record is not the condition, so the board is
  built out of claims that do not hold. An invented colleague signing one is
  drama; a real scientist signing one is a sentence the game invented and put in
  a living person's mouth. The books already did this by hand — every unsupported
  claim is signed by `press office`, `a review draft`, `a summer student`, `a
  theory group` — and the flag is what keeps it true after a rename. Declared and
  not inferred, because nothing can tell `Ernest Marsden` from `Ernest
  Rutherfield` by looking.

**And the gate passed that fourth rule for the wrong reason on its first run.**
The carver read `lesson.attest.claims`; the format payload hangs off
`lesson.game.attest`. So it found **zero ATTEST boards in every campaign**, ticked
all ten games, and passed a deliberately injected Gianotti signature — the same
one-level-too-high read that once reported nine mute instruments in
`fieldCoverage`. Two selftest cases were added from the shipped nesting, and the
row now prints the board count, so a carver going blind shows up in the ordinary
output rather than only under an injection. All three rules are verified by
putting each bug back and watching only that rule fire.

**A consequence to keep in view.** The invented rosters were deliberately diverse;
the real 1911 Manchester, 1919 eclipse and 1953 King's casts are not, and eleven
slots changed gender in the rewrite. Tharp, Franklin, Leavitt, Gianotti and
González are real and stay; most slots had no such option. The supporting slots
were kept invented partly to hold some of it, and the notes say plainly what each
of those women was denied at the time.

## Editions, audience and copy

- **A theme declares who it is for.** `audience: { grade }` in the manifest; `engine/core/typography.js`
  scales the root font size from it — 1.18× primary, 1.10× middle, 1.04× high school, 1× undergraduate.
  `audience.textScale` overrides. Applied from `theme.js`, once, for every game. The same game can
  therefore ship at several reading levels: a new edition is a manifest line plus a differently-written
  book.
- **A game can also be retargeted rather than re-levelled.** `RETARGET_PASS.md`:
  same place, same cast, same grade, a **different course**. Seven games teach
  above high school because their setting is a workplace, and a workplace runs on
  the professional layer of its subject — so three of them now ship an AP edition
  built on the same world. `deepwatch_hs` is AP Physics 2 where the base is naval
  acoustics, `contamcity_hs` is the aqueous half of AP Chemistry where the base is
  first-year analytical, `the_trial_hs` is AP Statistics where the base is clinical
  epidemiology. **The marker is its own line** — `same-grade-retarget:` rather than
  `same-grade-rewrite:`, mutually exclusive with it, and refused unless the edition
  has a syllabus block whose `course` differs from the base's. Four of the seven
  were rejected and the reasons are in that file: an AP Physics 2 Blackout is five
  units of nothing, a polar camp cannot host APES, Aftershock's honest AP is the
  course Safety Factor already is, and no AP course contains Quantum.
- **An edition is a registered theme, not a build flag** — `MIDDLE_SCHOOL_EDITIONS.md` is the plan, and
  fourteen of sixteen games are getting a grade-6 one. **Twelve exist.** The nine of the first pass were
  swept for `questionLoad` after the fact; `sightline_ms`, `redsand_ms` and `the_trial_ms` were written
  against it from the first stop, which is cheaper and produces a different edition — see that file's §9. `themes/<base>_ms/` holds a manifest, a one-line
  `site.js` re-export and its generated content, and **nothing else**: place, props, interiors and
  outfits are the base theme's. `tools/derive-edition.mjs` writes one; `engine/dev/editionParity.mjs`
  fails the game if cast, areas, places or manifest have drifted. It is a separate theme id rather than
  an `EDITION=` alias because of the save key `gamekit_${theme.id}_v1`, and the group ids are
  deliberately identical between editions, so house rule 14's guard would wave a ten-day campaign into a
  fifteen-day slot.
- **Measure the reading level, do not judge it.** The hospital's opening card was written at F–K 7.7 for
  an audience whose lessons sit at 2.7. Hospital ≈ 2.6; the college games run 10–14. `audience.grade` is
  a gate: `validateContent` notes any passage above it and fails one two grades over. The vocabulary of a
  subject cannot always be simplified — "spontaneous fission" is the word — so the lever is sentence
  length, the other term in the formula.
- **The opening card is ONE paragraph of situation.** No mechanics (order, clock, prices), no scope
  disclaimer, no controls note. And never tell the player what they *do not* do: "you do not touch the
  vehicle", "you do not prescribe" both read as apologies for the game.
- **It was the one piece of prose nothing was counting.** The reading-level gate covered scenes and
  verdicts; `checkVoice` read the opening only for the slogan it ends on. So the first paragraph a player
  ever sees — the only one read before the game has taught them a word — had no gate, and ten of fifteen
  cards failed the moment one existed. Red Sand opened on "the transfer window opens on sol 486" and "the
  ascent vehicle standing on the pad", three undefined terms in a 45-word sentence; Ice Core opened at
  F–K 17.5 with a 55-word sentence. `validateContent` now checks the card's reading level against
  `audience.grade`, fails a sentence over 40 words, and lists hard words the glossary never defines.
  **The sentence length is the one that bites** — the bad cards were not hard vocabulary, they were
  pile-ups. What no cheap rule catches is a domain term built from ordinary words, which is exactly what
  "transfer window" is: for that, read the card.
- **Inside that paragraph there are four beats, in this order**: what has happened or is about to, and to
  whom; the player's job stated as authority — "You are the …, which means …"; the clock or the argument,
  with somebody from the roster in it; and last, what it costs, in people. **The failure they were swept
  for is the inventory opening**: Red Sand began "nine modules buried to the eaves, eighteen hundred
  square metres of solar panel, an ascent vehicle four hundred metres past the last of them" — every fact
  true, no situation, nobody in it, and a specification for a closing line. It now opens on the transfer
  window that does not move and ends on six people going home on what two named engineers can agree to
  make. **A card ending on a number is usually a card that has not said what the number does to
  anybody.** And two games shipped with no opening at all — Project Y and Hospital Heroes rendered an
  empty title card for as long as they existed, because `opening` is optional and nothing checked.
- **The verdict says `Correct` / `Incorrect` first.** "Evidence accepted" is the response's language, one
  inference away from what the player asked.
- **A name arrives with the job attached, every time it is the first time.** `checkNames` used to accept a
  full name as an introduction, so "Dolores Reyes says the steadying matters more than the fall" passed
  while telling a player nothing about why hers is the opinion in the sentence — and it read the stakes,
  briefings and scenes only, so a name whose first appearance was on the **opening card or a warm-up
  card** was judged on its second mention. Both halves fixed: `engine/dev/introRule.mjs` is the rule,
  shared with `warmupOrder` because two copies of one rule drift, and every surface the campaign shows is
  read in the order a player reads it. 259 first mentions across 29 campaigns said nothing about the job;
  all do now. Four things the rule deliberately does and does not accept: a **rank** is a job
  (`Captain Vasquez`) and a **courtesy title** is not (`Dr. Patel has the notes`); a job noun loose in the
  sentence belongs to whoever it belongs to ("Reyes tells the substation technician to wait" introduces
  nobody), so the job has to be *attached* — apposition, a role phrase in front, a rank, a job verb, or a
  clause off the name using the campaign's own words; a **warm-up card is judged whole**, because the job
  is usually in the `why` under the title; and **an initial is not a full stop**.
- **The last paragraph of an ending is about the player.** Twenty-five campaigns shipped an `ending` that
  said what came of the fortnight and what it cost and never once said who had done it, so a player who
  had just held a corridor for fourteen days closed the game on a paragraph about a report. Every campaign
  now closes on the two or three calls that were theirs and what those calls bought — *you checked the
  instruments the decisions rested on; four million people had power; that was your fortnight.*
  `checkStory` fails a closing paragraph not addressed to the player, and four campaigns that had **no
  `ending` at all** have one. The scaffold carries the shape, so a ninth game cannot ship without it.
- **The scene is the situation. The verdict is the teaching.** This is the opposite of how all seven games
  shipped, and the single most expensive content mistake in the repo. A scene of 90–100 words carrying the
  mechanism means the player reads the answer, answers, and learns nothing from being right — Project Y
  explained the four rotational rules and then asked the player to match them, against a verdict of nine
  words. Every game was rewritten: scene **30–45 words** of situation only, `why` **70–90 words** of
  mechanism (Hospital ~50, for a second-grade reader), and a rebuttal per wrong option saying why *that*
  one fails. Teaching-to-scene went from 0.22–0.52 to 2.7–3.4.
- **A stop declares what it assumes.** `assumes:` on the lesson — the prior knowledge the question is
  entitled to expect. It exists because the honest version of "could a student answer this?" is "with what
  already in their head?", and writing it down is what stops a question quietly requiring a degree.
- **`theme.stopNoun`** — what a non-person stop is called. Mission Control has no rooms and no doors, and
  "a room" sent players hunting for one.
