# The card pass — one campaign, to the tagline

**Hard concepts, explained at a sixth-grade reading level.** The syllabus does not
move. The sentences come down to meet the reader. You are rewriting ONE campaign's
narrative cards: its opening card and every day's stake. Nothing else.

## Do not touch
- questions, scenes, verdicts, options, takeaways, primers, briefings, objectives
- the roster, the `delivery` block, the site, props, anything in `engine/`
- `engine/dev/plaincards-debt.json` — never write it
- generated content under `themes/<theme>/content/` — a stake lives in the BOOK

## The bar, all of it enforced
Run these and iterate until every one is green. They are the spec:

    node engine/dev/plainCards.mjs <theme>        # grade <= 6.5 per card, <= 28-word sentences
    node engine/dev/checkStory.mjs <theme>
    node engine/dev/checkNames.mjs <theme>
    node engine/dev/validateContent.mjs <theme>
    node engine/dev/bookParity.mjs <theme>
    node engine/dev/delivery.mjs <theme>

If the campaign names real people — every `qd_*` Quick Discovery does — also run

    node engine/dev/discoveryHistory.mjs <theme>

and **never change a real person's name, and never invent a first name for one.**
Rutherford, Franklin, Tharp, Riess, Hess, Ewing and the rest are on those rosters
because they did the work. A card that says "Rei Hess" where the roster says Harry
Hess is the defect this repo has already paid for twice; `checkNames` fails the
build for it now. Their nine cards are titled `Level 1`, `Level 2`, `Level 3` and
carry the same rules as a day card.

What they will fail you for, so write to it first time:
- **stake length**: 90–200 words at audience grade 9+; **60–85 words** and **no
  sentence over 24 words** at audience grade 8 or below (the `_ms` editions).
- **stake must say the decision**: a literal `Today you …` clause.
- **stake must be dated** in its first two sentences ("Monday", "Tuesday, 16:40",
  "Sol 12", "Three days after the quake").
- **stake must name somebody** from the roster, and a name's FIRST mention anywhere
  in the campaign carries their job ("Sten Lindgren, the load forecasting analyst").
  A name that is not on the roster fails the build.
- **stake must not contain the day's own answer** — never state which way anything
  moves, never give the number the question asks for.
- **opening card**: ONE paragraph, 70–180 words (55 at grade 4 or below), a plain
  `You are the …` clause, no mechanics (no clock rules, no controls, no scoring), a
  closing sentence carrying a number or a clock, no sentence over 40 words, and it
  must name the campaign's `delivery` (every distinctive word of that name).
- **no cast introductions on the opening card** and **no em-dashes anywhere**.

## How to write it
1. Read the current cards. `node engine/dev/plainCards.mjs <theme>` gives the
   numbers; the cards themselves are `opening:` in `themes/<theme>/theme.js` and
   `stake:` per mission in `books/<theme>.yml` (dashed filename for `_ms`/`_hs`).
2. Keep every fact, name, number, date and decision. This is a rewrite of the
   prose, not of the campaign. If a card currently says something true and useful,
   it still says it afterwards.
3. Rules that did the work on the two campaigns already done:
   - **one clause a sentence.** Break every "which means", "so that", "because",
     semicolon and dash into its own sentence.
   - **one fact a sentence.** Lists of three abstract things become three short
     sentences, or one concrete thing.
   - **the plainest word that is still true.** "heat record", not "thermal record".
     "street-level circuits", not "distribution feeders". "how long it holds its
     phase", not "coherence time" — but KEEP a technical term the course needs and
     gloss it once in plain words. Lowering the demand is a failure; lowering the
     sentences is the job.
   - **say the consequence; do not imply it.** "Hold back too little and homes lose
     power on the coldest night" replaces "hold too little and the first cold
     evening finds out". Oblique closing lines are the tic to hunt, and the grade
     score cannot see them, so hunt them by eye.
   - **one decision in the `Today you` clause.** Not three verbs. The day's stops
     are listed on the same card already.
   - fragments are fine. "Nothing after that." reads faster than a clause.
4. Write the cards with the tool, then re-import if you changed any stake:

       node tools/rewrite-cards.mjs /tmp/<theme>-cards.json
       node tools/import-book.mjs books/<book>.yml <theme> --verify

   The JSON is `{ "<theme>": { "opening": "…", "stakes": { "1": "…", "2": "…" } } }`.
5. Re-run the six checks. Fix what they say. A stake that came out under the word
   floor gets another concrete sentence, not padding.

## Worked example, from the campaign already done
Was (grade 9.2): *"Wednesday, 04:12, and the largest unit on the Calder system has
tripped without warning. Frequency fell and then steadied somewhere below where it
began, which Dolores Reyes says matters more than the fall itself — a system that
stops falling has found a new balance, and the new balance is short."*

Now (grade 4.0): *"Wednesday, 04:12. The biggest power station on the system has
shut down with no warning. The frequency dropped, then stopped dropping. It is now
steady, but lower than it was. Reyes says that is the worrying part. A system that
stops falling has found a new balance, and the new balance is short of power."*

Same facts, same concept, same person. Nine sentences where there were three.

## Report back, as JSON only
    { "theme": "...", "before": { "mean": 9.2, "worst": 11.4 },
      "after": { "mean": 4.8, "worst": 6.4 },
      "cards": 16, "gates": "green" | ["what still fails"],
      "notes": "anything a human should look at" }
