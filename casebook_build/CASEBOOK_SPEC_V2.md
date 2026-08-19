# Casebook — authoring & redo spec for ChatGPT (daily model)

**Use this to build a new case or to REDO an existing one into the current model.** Paste everything
below the line into ChatGPT, then paste one or more `pack_*.js` files (finished or stub). Return each
**complete file**, every line present. Do **2–4 at a time** — finished files are long.

This sheet is the source of truth. It supersedes the older 18-figure / travel-board guidance in
`CHATGPT_AUTHORING_PROMPT.md`; that file is still useful only for prose mechanics (the gold-example
profile, the banned-phrase list). Where they disagree, **this sheet wins.**

---

## ROLE

You are a meticulous game writer and science/history editor working on **Casebook**, a daily
Clue-style educational deduction game. You never invent facts and you never break the schema.

## WHAT CHANGED (if you've seen the old model)

- **9 figures, not 18.** A case is **3 witnesses × 3 places × 1 profile each = 9**.
- **No travel board.** The player picks a **witness**, then puts a **WHERE** and a **WHO** to them.
- **`DAYS_TOTAL` is 5**, and each conversation costs exactly one day.
- Each pack carries an **`emblem`** — a small bespoke line-art SVG of the case's central scene.
- **Each figure carries a `whatHint`** — a vague, figure-named steer on the WHAT, delivered as an
  accumulating **"What — case note"** when its quiz is answered well. This is now the primary way the WHAT
  is armed (profiles alone are unreliable — a player reads only ~3–4 of the 9).

## THE GAME — how it now plays (so your writing fits)

Each case is a **fixed daily puzzle** (same for everyone — no randomization). The player names three
things and accuses: **WHO** is behind it, **WHERE** it culminates, and **WHAT** really happened.

The loop:
1. **Choose a witness** (there are three; each is shown once). This is the case's hub.
2. **Put a WHERE and a WHO to them** — pick one place and one suspect to test. This costs **one day**.
3. The witness **briefs you on one real figure** — *which* figure depends on the WHERE you chose
   (each place × witness pairs to exactly one figure). You read that profile, then answer a **3-question
   quiz** on it.
4. Answer well and the witness **confirms the held clues** among your suggested {where, who} — crossing
   wrong WHO/WHERE options off. Ace all three → up to two confirmations; slip → fewer.
5. That same good conversation also earns **one WHAT note** — a vague, science-anchored steer on *what
   really happened*, in the voice of the figure you just read. Notes accumulate in a **"What — case
   notes"** log the player can reopen any time.

So **WHO and WHERE are facts, settled by clues.** A sharp player pins them within the 5 days; a shaky
one arrives only partway.

**WHAT is never a clue — it is a JUDGMENT the player makes from the readings.** No witness hands it over.
The player arms that judgment two ways: the **profiles** teach the science, and each figure's **`whatHint`**
(delivered as a "What — case note" when its quiz is answered well) supplies a vague steer. Because a 5-day
player reads only ~3–4 of the 9, the **`whatHint`s are the reliable vehicle** — write all nine so the *set*
decides the WHAT. This is the soul of the case.

---

## DESIGNING THE WHAT — the heart of the job

A judgment is only real if **the wrong answers are genuinely tempting.** The failure mode to avoid:
three options shaped *crazy → reasonable → crazy*, so the player picks the middle by reflex without
reading. "The truth is the moderate one" is a pattern, not a thought.

**The bar:** three answers a knowledgeable person could each defend — ideally with **the two wrong
answers *more* immediately seductive than the right one**, so resisting them requires understanding.

### The four tests — run every WHAT through all of them

1. **Shape test.** Could someone pick the right answer *without reading*, from the option shapes alone
   (the moderate one, the longest, the hedged one, the one that says "systemic/gradual")? If so,
   **redesign.** The truth must be invisible to pattern-matching.
2. **Seduction test.** Is at least one wrong answer *more* attractive than the truth (more famous,
   dramatic, obvious)? If both wrongs are cartoons nobody would pick, **redesign.**
3. **Discriminator test.** Name the exact **`whatHint`(s)** (backed by profile sentences) that let a
   careful reader rule out each wrong answer and confirm the right one. Every WHAT option needs a
   killing/confirming cue in the hints. If you can't name them, the readings don't arm the judgment —
   **write/fix the hints.**
4. **Leak test.** Does settling WHO/WHERE (the clue-facts) hand over the WHAT by inference? If knowing
   the cause/agent tells you the answer, **restructure** so the clue-facts and the judgment differ.

Target difficulty: **earnable only by understanding.** A careful reader gets it; a skimmer cannot guess
it from shape.

### The two trap ids are not strawmen

`endings.overclaimWhat` and `endings.dismissalWhat` are the two wrong WHATs — think of them as *two
seductive failure modes* (e.g. the flashy/famous one and the obvious/grand one), not "sensational vs
nothing-wrong." Baits must be answers smart people actually reach for. Delete strawmen no one believes.

### Worked example — Troy, before and after

**BEFORE (bad):** overclaim "the gods razed the walls" (nobody believes it) / dismissal "pure legend" /
truth "a real fall magnified by tradition" (the obvious middle). Goldilocks + strawman — you pick the
middle blind.

**AFTER (good):** *Which buried city is Homer's Troy?* — Troy II (Schliemann's gold) / Troy VI (the
grand walls) / **Troy VIIa** (poorer, crowded, *burned*, truth). Both wrongs are *more* seductive than
the shabby right one (fame; grandeur). Decidable only by reading: Troy II is a millennium too early;
grand VI fell to an *earthquake*; only VIIa burned with weapons in the right era. No shape tells you.

### Good WHAT patterns

- Famous-but-wrong vs. unglamorous-but-right (Troy: gold vs. burnt shed).
- Two real competing hypotheses experts argued (earthquake vs. assault; collision vs. fatigue).
- Stated reason vs. material reason (a war "for Helen" vs. control of a strait).
- Right phenomenon, wrong mechanism — all three agree *something* happened; only one mechanism fits.

Avoid any triad that reads *reckless / sensible / lazy*.

---

## THE WHAT NOTES (`whatHint`) — how the readings arm the judgment

Each of the 9 figures carries a **`whatHint`**: one or two sentences, in that figure's name, that steer the
player toward the true WHAT or away from a bait. When the player answers that figure's quiz well, the hint
is added to the **"What — case notes"** log. Since a 5-day player reads only ~3–4 of the 9, the *set* of
hints — not any single profile sentence — is how the WHAT is armed. **Write all nine.**

**Each `whatHint` must:**
- **Name its figure** and lean on that figure's real idea — *"Byerly's first motions are the clean
  test…"*, *"Cornell's maps ask where the faults are, not where the wells are."*
- **Give an observation, method, or lean — never the verdict.** Say what to look at and which way it
  points; never write "so it was X." The player still has to conclude.
- **Stay vague and short** — a steer, not a solution (one or two sentences).
- **Target a specific WHAT option.** Most hints should *kill a bait* (that's what makes both wrongs
  resistible); a few affirm the truth's signature.

**The nine together must:**
- **Rule out BOTH baits and support the truth.** Per the fairness rule, every WHAT option's killing/
  confirming cue must be carried by hints on **at least two different witnesses**, so any two witnesses
  consulted decide the WHAT.
- **Not all lean one way.** If eight hints push a bait and one corrects it, the readings mislead — balance
  them. (Same reason profiles must never argue *for* a bait without its balancing evidence: no templated
  "read as support for [the bait]" filler.)
- **Never name the truth outright** — no spoilers, same as `story`/`teaser`.

**Gold set — e_quake** (truth: tectonic double-couple; baits: underground explosion / fluid injection):
- **Byerly** (first motions): *"…a pressure source pushes outward all around, while a slipping fault throws
  compression and dilation into opposing quadrants. Plot the polarities before deciding."* → kills *explosion*
- **Gutenberg** (magnitude / travel-times): *"…a source seated in ordinary crust — not shallow and
  man-made — weighs against a set charge."* → kills *explosion* (by depth)
- **Cornell** (seismic hazard): *"…maps ask where the faults are, not where the wells are. Check whether the
  source sits on a mapped fault — or beside an injection site."* → kills *injection*
- **Reid** (elastic rebound): *"…strain stored along a fault over years and finally let go — not something
  freshly pumped in or set off."* → kills *both* baits, affirms tectonic

No hint says "it was tectonic"; each hands over an observation and a lean, and the baits die from *different*
witnesses.

---

## THE 9 FIGURES — choosing and placing them

Pick the **9 real pioneers best-suited to the case** — enough to arm the WHAT and teach the science,
no filler. Arrange them so each **witness owns 3 figures in their domain**, one per place:

```
TOPICMAP:{
  place1:{ witnessA:["figA1"], witnessB:["figB1"], witnessC:["figC1"] },
  place2:{ witnessA:["figA2"], witnessB:["figB2"], witnessC:["figC2"] },
  place3:{ witnessA:["figA3"], witnessB:["figB3"], witnessC:["figC3"] }
}
```

- **Each `TOPICMAP[place][witness]` is an array of exactly ONE topic id.** 9 unique topics total; every
  topic appears exactly once.
- Each witness's three figures should fit that witness's expertise (their `hint` and `face`).

**Fairness rule (critical, because the player reads only ~4 of 9 in 5 days):** spread the WHAT's
**`whatHint` steers** (and profile discriminators) so that **consulting any two of the three witnesses is
enough to decide the WHAT.** Never hide the deciding cue in a single one-of-nine figure. Each of the three
WHAT options must have its confirming/killing cue carried by figures held by **at least two different
witnesses** — so whichever two witnesses a player picks, both baits still die.

---

## THE EMBLEM — a bespoke graphic with meaning

Each pack carries an **`emblem`**: an inline SVG of the case's central scene or mechanism — not
decoration. It renders in a framed banner above the witnesses (the engine adds the venue caption, so
**put no text in the SVG**).

Rules:
- `viewBox="0 0 660 140"`, `width` fluid (the engine sizes it). Keep it ~140 tall.
- **Editorial line-art, monochrome:** ink `#121212` for the main lines, faint `#e2e2d8` for background
  contours/grid, and **at most one accent** — blue `#326891` or red `#B3261E` — reserved for the
  critical event (the failure, the break, the anomaly).
- Depict the case's *mechanism*: a bridge with a fatigue crack; a reactor with a runaway temperature
  line; a transformer arcing; Troy's stacked layers with the burnt one marked. Make it legible at a
  glance and specific to this case.
- One line, valid SVG, no external refs, no `<text>`.

Example (the submarine case — descent, depth contours, a red implosion burst, the wreck below):

```js
emblem:'<svg viewBox="0 0 660 140" role="img" aria-label="A submersible descending to a wreck; an implosion above it"><path d="M0 52 C130 46,270 58,410 52 S620 46,660 52" fill="none" stroke="#e2e2d8" stroke-width="1"/><path d="M0 80 C130 74,270 86,410 80 S620 74,660 80" fill="none" stroke="#e2e2d8" stroke-width="1"/><path d="M0 22 C90 14,180 30,270 22 S450 14,540 22 S650 28,660 22" fill="none" stroke="#121212" stroke-width="1.5"/><line x1="300" y1="24" x2="300" y2="58" stroke="#326891" stroke-width="1.5" stroke-dasharray="3 4"/><g stroke="#B3261E" stroke-width="1.6" stroke-linecap="round"><line x1="300" y1="54" x2="300" y2="82"/><line x1="286" y1="68" x2="314" y2="68"/><line x1="290" y1="58" x2="310" y2="78"/><line x1="310" y1="58" x2="290" y2="78"/></g><circle cx="300" cy="68" r="3.5" fill="#B3261E"/><g transform="rotate(-7 470 118)"><path d="M432 116 L512 116 L500 128 L446 128 Z" fill="none" stroke="#121212" stroke-width="1.5"/></g></svg>'
```

---

## PACK STRUCTURE (what you output)

Top-level fields (copy any that already exist verbatim; fill/adjust the rest):

- `id`, `title`, `discipline` — keep.
- `teaser` — 1–2 sentences naming the mystery without spoiling the true WHAT.
- `overclaimTag` (the bait shown on the shelf card), `truthTag` (the quiet truth, general).
- `emblem` — the SVG above.
- `venue`, `agent:{name,role}`, `standingLabel`, `readingShort`, `readingLabel`, `dossierName`,
  `enterLabel`, `subt`.
- **`DAYS_TOTAL:5`**.
- `overclaimTease` — one sentence steering off the overclaim toward the truth.
- `CATS` — three columns:
  - `who` — `{title, truth, items:[3 {id,label}]}`.
  - `where` — `{title, truth, items:[3 {id,label}]}`. **Every `where` id MUST equal a `PLACES` id.**
  - `what` — `{title, truth, items:[3 {id,label}]}`. The three labels must be within ~12 characters of
    each other and the truth must **not** be the longest (no shape tell).
- `PLACES` — 3 entries `{name, xy:[x,y]}` (xy is legacy, keep any values). ids == `where` ids.
- `CHARACTERS` — 3 witnesses `{name, role, face, badge, legend, hint}`. **`face` is an emoji that
  signifies that witness's domain** (it becomes their portrait on the hub — choose it meaningfully).
  `hint` is one line of what they know (shown on the hub).
- `TOPICMAP` — the 3×3×1 layout above.
- `TOPICS` — 9 entries. Above each, a `// cell: <WitnessName> @ <PlaceName>` comment (whose voice the
  `frame` uses). Each entry: `{ sci:"Name (dates)", topic:"short title", lede, no:1..9, profile, frame,
  whatHint, q:[3] }`.
  - `profile` — **250–330 words**, person-centered, real facts, `\n\n` between paragraphs. Teaches the
    science; **must not argue *for* a bait** without its balancing evidence.
  - `frame` — one in-character line. **The engine prints the witness's name as a bold label above it, so
    do NOT open the frame by restating that name** — write *"Aligns three seismograms at…"*, not *"Field
    Tech Odile aligns three seismograms…"*.
  - `whatHint` — one or two vague, figure-named sentences steering the WHAT (see **THE WHAT NOTES**).
    An observation or lean, **never the verdict**; never names the truth.
  - `q` — **exactly 3** questions, each `{q, o:[4 options]}`; each option `{t, v, fb}` with
    `v` ∈ `expert|partial|wrong|danger`; **exactly one `expert`** per question; every option has `fb`.
- `STORIES` — `{witness:{place:"one in-character line with a quote", ...×3}, ...×3}` (9 lines).
- `story` — 4 short HTML title-screen paragraphs (name the two tempting wrong WHATs; never the truth).
- `endings` — `{ overclaimWhat, dismissalWhat, win:{expertTitle,expert:[2],soundTitle,sound:[2],
  namedTitle,named:[2]}, overclaim:{title,body:[2]}, dismissal:{title,body:[2]}, wrongNames:{title,
  body:[1]} }`. Win names the true who/where/what and rejects both baits; overclaim/dismissal each
  explain that specific wrong WHAT's seductive error.

---

## REDO PROCEDURE (for an existing pack I paste)

Return the complete rewritten file:

1. **Keep** the subject, discipline, and the strongest real figures.
2. **Cut to 9 figures** (3 witnesses × 3 places × 1). Drop the weakest; keep those that best arm the
   WHAT and cover the science. Rebuild `TOPICMAP` to the 3×3×1 layout; renumber `no` 1–9.
3. **Audit the WHAT** against the four tests. If it's a Goldilocks/strawman triad, redesign the three
   `CATS.what` labels into a real controversy; set `truth` and the two trap ids accordingly.
4. **Arm & spread the discriminators** across witnesses per the fairness rule, and **write the nine
   `whatHint` steers** (see THE WHAT NOTES) — figure-named, observation-not-verdict, both baits killed
   from ≥2 witnesses. (Retrofitting an older pack that has no `whatHint`s? Add all nine.)
5. **Set `DAYS_TOTAL:5`.**
6. **Add an `emblem`** SVG for the case.
7. Make each witness's **`face`** a meaningful domain emoji.
8. Rewrite `teaser`, `overclaimTag`, `truthTag`, `overclaimTease`, `story`, and all `endings` to match
   the (possibly new) WHAT — never naming the truth pre-play.
9. Keep/redo `STORIES` (9 lines). Profiles 250–330 words, real facts.
10. Re-check every hard rule below.

---

## HARD RULES (a pack is rejected if it breaks these)

1. **9 unique topics**, each referenced exactly once in `TOPICMAP`; every `TOPICMAP` cell is an array
   of exactly one topic id.
2. **`CATS.where` ids == `PLACES` ids.** (A where-clue is only confirmable when its place is suggested.)
3. **WHAT carries no clues** — never design it to be crossed off. It is judged from the readings.
4. **`DAYS_TOTAL:5`.**
5. **`emblem` present** — valid inline SVG, no `<text>`, palette as specified.
6. **Length parity** — across the 27 quiz questions the `expert` option may be the longest in **no more
   than ~1/3** (ceiling 45%); keep all four options within ~12 characters; wrong/partial/danger must be
   as specific and tempting as the right one. The three **WHAT labels** obey this too.
7. **Real people, accurate facts.** Verify each `sci` figure's dates. Unsure of a specific → stay
   general but correct; never invent.
8. **Schema exactness** — exactly one `expert` per question; 4 options each; valid verdicts; every option
   has `fb`; profiles 250–330 words. Must `require()` without error.
9. **No spoilers** in `teaser`/`story`/`overclaimTease` — name the two tempting wrong WHATs, never the
   truth or the guilty WHO/WHERE.
10. **No AI-tells / templated sameness.** Banned phrases (auto-flagged): "quieter and graver", "quieter
    than the first and graver than the second", "three people will help you", "each carrying a piece",
    "none the whole", "hides a tempting wrong answer", "it's important to note", "plays a crucial/vital
    role", "a testament to", "rich tapestry", "delve into", "navigate the complexities", "stands as a",
    "serves as a reminder", "in the world of", "when it comes to". Don't reuse your own 6-word runs.
11. **No trailing junk tokens** — every `t`/`fb`/label ends cleanly at its final punctuation.
12. **9 `whatHint`s present** — one per figure; each names its figure and gives an observation/lean,
    **never the verdict or a spoiler**; across the set both baits are killed by cues on **≥2 different
    witnesses**. Profiles never argue *for* a bait without its balancing evidence.

---

## SELF-CHECK (append one line per file, after the code block)

`<id>: WHAT=<mystery> · shape PASS (truth not identifiable by shape) · seduction PASS (≥1 wrong more
tempting) · 9 whatHints, both baits killed from ≥2 witnesses [list which figure kills which bait] · leak
PASS · 9 topics/3×3×1 · DAYS_TOTAL 5 · emblem present · expert-is-longest ≈ NN% · profiles 250–330w ·
1 expert/q · no banned phrases`

If you can't honestly write "shape PASS" and name, for each WHAT option, the `whatHint`(s) that kill or
confirm it (on ≥2 different witnesses), the WHAT isn't done — fix it before returning.

## OUTPUT FORMAT

For each file: a line `=== pack_<id>.js ===`, then one fenced ```js block with the **entire** file
(`module.exports = { PACK: {` … `}};`, nothing elided), then the self-check line. Make the soundest
historical/scientific choice on any ambiguity — don't ask mid-batch.

*After each file is saved over its `pack_<id>.js`, run `node build_casebook.js`; it validates schema,
9-topic layout, length parity, and solvability (4 who+where clues within 5 days), reporting `[OK]`/`[FAIL]`.
The build checks mechanics, not WHAT quality — that's on you and the four tests.*
