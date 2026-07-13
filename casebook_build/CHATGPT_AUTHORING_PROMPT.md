# Casebook — authoring prompt for ChatGPT

**Paste everything below the line into ChatGPT as your first message, then paste one or more
`pack_*.js` stub files after it.** ChatGPT returns the same files with every `""` and `[]` filled
in. Give it **2–4 stubs at a time** (each finished file is long; more than that and quality drops or
the reply gets truncated).

---

## ROLE

You are a meticulous game writer and science/history editor. You finish "packs" for **Casebook**, a
Clue-style educational deduction game. I will paste one or more JavaScript stub files. For each one,
you return the **complete file**, with every empty string `""` and empty array `[]` filled with
authored prose, and **every other line copied verbatim**. You never invent facts and you never break
the schema.

## THE GAME (so your writing fits)

In each case the player solves three columns — **WHO** is behind it, **WHERE** it culminates, and
**WHAT** is really happening. They travel a small board, meet three informants, and before each
informant a "figure of the day" profile pops up (a real historical pioneer). The informant then
quizzes the player with three questions about that pioneer's topic; acing them yields clues.

The soul of every case is the **WHAT** column, which always has three options:

- an **OVERCLAIM** trap — the sensational wrong answer (sabotage, aliens, bioweapon, cover-up,
  "discovery of the century");
- a **DISMISSAL** trap — the complacent wrong answer ("nothing's wrong," act of God, freak accident,
  honest mistake, pilot error);
- the **TRUTH** — the nuanced middle: a real, concealed, systemic problem.

Your prose must quietly arm the player to reject **both** traps and recognize the truth. The
overclaim and dismissal ids are already filled in `endings.overclaimWhat` / `endings.dismissalWhat`,
and all three WHAT labels are in `CATS.what`.

## WHAT IS GIVEN vs WHAT YOU AUTHOR

**COPY VERBATIM — never change:** `id`, `title`, `discipline`, all ids everywhere, `CATS`, `PLACES`,
`EDGES`, `CHARACTERS`, `TOPICMAP`, every `sci` name+dates, every `topic`, every `no`, the `// cell:`
comments, `endings.overclaimWhat`, `endings.dismissalWhat`, and the top-level label strings that are
already non-empty. **Do not add, remove, rename, or reorder any key.**

**AUTHOR — fill every empty `""` and `[]`:**

### 1. `TOPICS` — 18 entries. For each entry fill:
- **`lede`** — one vivid sentence (~12–20 words) hooking the pioneer.
- **`profile`** — **250–330 words**, person-centered. Teach the concept *through the real pioneer's
  real work*. Split paragraphs with `\n\n` (usually 3–4 paragraphs). **End with one or two sentences
  tying the concept to THIS investigation** — how understanding it helps tell the overclaim and the
  dismissal apart from the truth. Accurate facts only.
- **`frame`** — 1–3 sentences **in the voice of the informant named in the `// cell:` comment above
  the entry**, setting up the quiz as a test/plea/challenge (never "here are three questions"). Match
  that informant's personality from `CHARACTERS`.
- **`q`** — **exactly 3 questions**. Each: `{ q:"…", o:[ four options ] }`. Each option is
  `{ t:"answer text", v:"expert|partial|wrong|danger", fb:"one-sentence teaching feedback" }`.
  - **Exactly one** option per question has `v:"expert"` (the best answer).
  - The other three use `partial` (defensible but incomplete), `wrong` (incorrect), or `danger` (a
    seductive misconception — ideally flavored like the overclaim or the dismissal).
  - **Every** option has a one-sentence `fb` that teaches, whether the player picks it or not.

### 2. `STORIES` — 9 strings (3 informants × 3 places)
Each is a 1–2 sentence in-character scene **with a spoken quote**, matching that informant's
personality and the place. (The player sees this when meeting informant X at place Y.)

### 3. `story` — 4 short HTML paragraphs for the title screen
Atmospheric, not a rules list. Paragraph shape that works well: (1) the scene, (2) the people you can
meet — **name the three informants**, (3) the suspects and the stakes — **name the overclaim and the
dismissal as the two tempting wrong answers**, (4) the clock/urgency. Use `<b>` for emphasis.

### 4. `overclaimTease` — one *italic-tone* sentence
Warns the player off the overclaim toward the truth. (Replace the `FILL:` placeholder text.)

### 5. `endings`
- **`win`**: three tiers of a *correct* accusation — `expert` (thorough), `sound` (solid),
  `named` (thin but right). Each has a short `…Title` and a 2-paragraph body `[ "", "" ]`. Reference
  the true who / where / what by their real labels. The `expert` tier should explicitly name all
  three and explicitly reject both traps (e.g. "Not aliens. Not a glitch.").
- **`overclaim`**: `{ title, body:["",""] }` — the player fell for the sensational WHAT. Explain why
  it's wrong and how chasing it *discredits* the real, provable finding.
- **`dismissal`**: `{ title, body:["",""] }` — the player accepted "nothing's wrong." Explain what
  they missed and the cost of looking away.
- **`wrongNames`**: `{ title, body:[""] }` — right WHAT, wrong who/where. End the single paragraph so
  a follow-up sentence naming the real answer can flow after it.

## HARD RULES (a pack is rejected if it breaks these)

1. **LENGTH PARITY — the #1 reason packs fail. Take it seriously.**
   The game shuffles option order, so position carries no signal — **length is the only tell left.**
   - Across all 54 questions, the `expert` option must be the **longest** of its four choices in **no
     more than ~1/3** of questions (hard ceiling: 45%).
   - Keep all four options within **~12 characters** of each other in length.
   - **Wrong/partial/danger options must be as specific, confident, and well-crafted as the right
     one** — never short throwaways, never vague. A knowledgeable person should find every wrong
     option genuinely tempting.
   - Before returning, mentally check each question: is the correct answer the longest? If it is for
     more than about a third of your questions, lengthen the shorter wrong options with concrete
     detail and/or trim the expert one.

2. **Real people, accurate facts.** Every `sci` figure is already chosen and real — write only true,
   well-documented facts about them and the concept. If you are unsure of a specific date or detail,
   stay general but correct; **never invent specifics**.

3. **Schema exactness.** Exactly one `expert` per question; exactly 4 options each; valid verdicts
   (`expert|partial|wrong|danger`); every option has `fb`; 18 topics; profiles 250–330 words. Output
   must be valid JavaScript that would `require()` without error.

4. **No spoilers before play.** In `story`, `teaser`, and `overclaimTease`: name the overclaim and
   dismissal as tempting wrong answers, but **never name, paraphrase, or strongly hint at the true
   WHAT, and never telegraph the guilty WHO.** Tease only that the truth is quieter/graver — let play
   reveal it. (Informant `hint`s already in the file may gesture at what they know; leave them.)

5. **No AI-tells, no templated sameness.** Do **not** use any of these phrases (they are
   auto-flagged):
   > "quieter and graver", "quieter than the first and graver than the second", "three people will
   > help you", "each carrying a piece", "none the whole", "hides a tempting wrong answer", "it's
   > important to note", "plays a crucial/vital role", "a testament to", "rich tapestry", "delve
   > into", "navigate the complexities", "stands as a", "serves as a reminder", "in the world of",
   > "when it comes to".

   Also **do not reuse your own sentence formulas across files.** Each pack's prose must read freshly
   written — vary sentence openings, structure, and imagery between games. (A validator flags any
   6-word run that repeats across packs.)

6. **No trailing junk tokens.** Every option `t` and `fb` must end cleanly at its final punctuation —
   no stray word tacked on after the closing period (e.g. `"…with medication. overall"` or
   `"…below the threshold. overall too"`). Before returning, scan every option string and delete any
   dangling token after the last sentence.

## STYLE

Concrete and specific over abstract. Name real instruments, documents, materials, institutions.
Define a term the first time it appears. Confident, literate, lightly atmospheric — closer to good
science journalism than a textbook. Feedback (`fb`) teaches in one crisp sentence. Vary voice
between the three informants.

## GOLD EXAMPLE (one finished `TOPICS` entry, to match for tone/length/quiz style)

```js
    // cell: Bo the caretaker @ The Radio Dish
    vs_jansky:{ sci:"Karl Jansky (1905-1950)", topic:"The birth of radio astronomy",
      lede:"The radio engineer who heard the galaxy hissing and gave astronomy a second window on the sky.",
      no:1,
      profile:"Karl Jansky was a young physicist hired by Bell Telephone Laboratories in 1928 to hunt down the sources of static that plagued transatlantic radio-telephone calls. He built a rotating antenna array on a New Jersey field — colleagues called it 'Jansky's merry-go-round' — tuned to about 20 megahertz, and spent months cataloguing hiss.\n\nHe sorted the interference into three groups: nearby thunderstorms, distant thunderstorms, and a faint, steady hiss he could not place. That third signal rose and fell once a day, so at first he suspected the Sun. But over months the peak drifted, completing a cycle not in 24 hours but in 23 hours and 56 minutes — the sidereal day, the rhythm of the stars rather than the Sun. The source was fixed to the celestial sphere, and it pointed toward Sagittarius, the direction of the Milky Way's center.\n\nIn 1933 Jansky announced that the hiss came from the Galaxy itself. It was the first detection of cosmic radio waves and the founding moment of radio astronomy. Bell Labs, satisfied the static was unavoidable, reassigned him; he never worked in the field again, and died at 44. The unit of radio flux density, the jansky, carries his name.\n\nHis method is the whole lesson of this case. Jansky did not leap to a sensational cause; he isolated an unknown signal only after ruling out storms and the Sun, and clinched its origin with a boring, decisive clue — the timing. A signal locked to sidereal time is celestial; one locked to human schedules is not. Before anyone shouts 'aliens' or 'glitch,' the first question is Jansky's: what does the signal's clock say?",
      frame:"Bo leans back against the pedestal of the dish. \"Kid who started all this worked for the phone company, chasing static. Before I let you near my logs, show me you know how he told sky from noise.\"",
      q:[
        { q:"How did Jansky finally show his mystery hiss came from beyond the Solar System?",
          o:[
            { t:"The hiss peaked every 23 hours 56 minutes — sidereal time, the clock of the stars.", v:"expert", fb:"Exactly: the sidereal period fixed the source to the celestial sphere, not the Sun." },
            { t:"He matched the hiss to a catalogue of powerful commercial transmitters overseas.", v:"wrong", fb:"That would have proved a terrestrial source, the opposite of what he found." },
            { t:"He aimed the antenna straight up and watched the hiss fade with altitude.", v:"wrong", fb:"Altitude tests don't localize a source; the daily timing was the real clue." },
            { t:"He saw the hiss vanish completely whenever heavy storms rolled through.", v:"partial", fb:"Storms were a separate noise group he removed; the steady hiss remained." } ] },
        // ...two more questions in the same shape...
      ] },
```

Notice: the four options are within a dozen characters of each other, the wrong ones are specific and
plausible, and the correct one is **not** the longest. Do that everywhere.

## OUTPUT FORMAT

For **each** stub I paste:
1. A line: `=== pack_<id>.js ===`
2. One fenced ```js code block containing the **entire completed file**, starting at
   `module.exports = { PACK: {` and ending at `}};` — every field present, nothing elided, no
   `// ...` placeholders.

Then, after the code blocks, a short **self-check** line per file:
`<id>: expert-is-longest ≈ NN% · profiles all 250–330w · 1 expert/question · no banned phrases · no trailing tokens`.

If anything about a case is ambiguous, make the most historically/scientifically sound choice and
proceed — do not ask me questions mid-batch.

---

*(After ChatGPT returns each file, save it over the matching `pack_<id>.js`, then run
`node build_casebook.js` in `casebook_build/`. It validates schema, length-parity, solvability, and
factual structure, and reports `[OK ]`/`[FAIL]` with reasons. Re-run ChatGPT on any `[FAIL]`, quoting
the reason.)*
