# Casebook — content-pack authoring spec

You are authoring ONE game "pack" for **Casebook**, a Clue-style educational deduction engine.
The engine is fixed. Your job is to write a JavaScript file that exports one `PACK` object.

## The gameplay (so your writing fits)
The player solves three columns — **WHO** is behind it, **WHERE** it culminates, **WHAT** is
happening — one answer each. They travel a 3-place board, meet informants who HOLD clues, and
before each meeting a "figure of the day" profile pops up (a real pioneer). The informant then
tests the player with 3 questions on exactly that figure's topic; acing all 3 yields up to 2 clues,
one miss yields 1, two misses yield none. The heart of every case: **there is an OVERCLAIM trap**
(the sensational wrong WHAT — e.g. "sabotage/bioweapon/aliens") **and a DISMISSAL trap** (the
"nothing's wrong / act of God / freak accident" wrong WHAT). The TRUTH is the nuanced middle:
a real, concealed, systemic problem. Your prose must teach the player to reject both traps.

## What you MUST produce
A file `pack_<ID>.js` (ID given in your brief) in this directory containing exactly:

```js
module.exports = { PACK: { /* the object below */ } };
```

Most STRUCTURAL fields are GIVEN to you pre-filled in your brief (CATS, PLACES, EDGES,
CHARACTERS, TOPICMAP, and the top-level strings). **Copy them verbatim.** You AUTHOR these:

- `TOPICS`: an object of **18 entries**, keyed by the topic-ids used in TOPICMAP. Each:
  - `sci`: the pioneer's name with dates/'role', e.g. `"Leonhard Euler (1707-1783)"` or
    `"Maria Jasin (genome-editing pioneer)"`. MUST contain a parenthesis. MUST be a REAL person.
  - `topic`: the concept subtitle, e.g. `"Buckling & Slender Columns"`.
  - `lede`: one vivid sentence hook.
  - `no`: a dossier number 1–18 (assign each topic a unique number; roughly chronological by the
    figure's era is nice but any 1–18 bijection is fine).
  - `profile`: **250–330 words**, person-centered, teaching the concept through the pioneer's real
    work, ending with why it matters to THIS investigation (how the concept helps tell the
    overclaim/dismissal from the truth). Split paragraphs with `\n\n`. Accurate facts only.
  - `frame`: 1–3 sentences, IN THE INFORMANT'S VOICE, setting up the quiz as a test/plea/challenge
    (not "here are three questions"). The informant is named in your brief per topic's cell.
  - `q`: an array of **exactly 3 questions**. Each: `{ q:"...", o:[4 options] }`. Each option is
    `{ t:"answer text", v:"expert|partial|wrong|danger", fb:"one-sentence teaching feedback" }`.
    Rules per question: EXACTLY ONE option has `v:"expert"` (the best answer). The others use
    `partial` (defensible-but-incomplete), `wrong` (incorrect), or `danger` (seductive misconception
    — ideally the overclaim/dismissal flavor). Feedback teaches briefly, win or lose.

- `STORIES`: `{ informantId: { placeId: "in-character scene, 1–2 sentences with a quote" } }` for all
  3 informants × 3 places (9 strings). Match each informant's personality.

- `story`: an array of **4 short HTML paragraphs** for the title screen — the SCENE, the PEOPLE you
  can meet (name the 3 informants), the SUSPECTS + STAKES, and the clock. Use `<b>` for emphasis.
  This must read as an atmospheric story, not a rules list. Name the overclaim and the dismissal as
  the tempting wrong answers, but **NEVER name, paraphrase, or strongly hint at the true WHAT** (or
  telegraph the guilty WHO) — tease only that the truth is "quieter/graver" and let play reveal it.
  The same rule applies to `teaser` and `overclaimTease`, which the player sees before the game:
  warn against the traps without answering the WHAT column. Informant descriptions may hint at what
  they know, but must not narrate the true mechanism.

- `endings`: object with:
  - `overclaimWhat`: the WHAT id of the overclaim trap (given in brief).
  - `dismissalWhat`: the WHAT id of the dismissal trap (given in brief).
  - `win`: `{ expertTitle, expert:[2 paras], soundTitle, sound:[2 paras], namedTitle, named:[2 paras] }`
    — three tiers of a CORRECT accusation (thorough → thin). Reference the true who/where/what.
  - `overclaim`: `{ title, body:[2 paras] }` — the player fell for the sensational WHAT; explain why
    it's wrong and how it discredits the real, provable finding.
  - `dismissal`: `{ title, body:[2 paras] }` — the player accepted the "nothing wrong" WHAT; explain
    what they missed.
  - `wrongNames`: `{ title, body:[1 para] }` — right WHAT, wrong who/where. (Engine appends a line
    naming the truth, so end your paragraph so a follow-up sentence flows.)

## HARD QUALITY GATES (your file is auto-rejected otherwise)
1. **Real people & accurate facts.** Every `sci` is a genuine, well-documented figure who really is
   associated with that concept. No invented scientists. No wrong dates you're unsure of — if unsure
   of a birth year, use a role descriptor in parens instead, e.g. `"(process-safety pioneer)"`.
2. **Length parity — critical.** The correct (`expert`) option must NOT be systematically the
   longest. Across your 54 options-sets, the expert answer should be the longest choice in **no more
   than ~1/3** of questions. Keep all four options within ~12 characters of each other in length.
   Wrong answers must be as specific, confident, and well-crafted as the right one — never obviously
   short/dumb throwaways. This is the #1 way these games fail; take it seriously.
   (The engine shuffles option ORDER at render time, so the position you author carries no signal —
   length is the only remaining tell, which is why this gate matters.)
3. **Exactly one `expert` per question; 4 options each; valid verdicts; every option has `fb`.**
4. **Profiles 250–330 words**, person-centered, factually correct, teaching the concept.
5. **18 unique topics**, matching the ids in the given TOPICMAP.
6. The three WHAT options embody OVERCLAIM (sensational), DISMISSAL (nothing-wrong), and TRUTH.
   Your questions and profiles should quietly arm the player to reject the two traps.

## Reference
A complete, gold-standard example pack (the CRISPR game "The Germline Witness") is the object built
in `build_casebook.js` in this directory (the `crispr` const) — read it to match structure, tone,
length, and the verdict/feedback style. Also `/Users/scolnic/code/Nuclear/germline-witness.html`.

Return, as your final message, only the absolute path of the file you wrote and a 1-line self-check
of the correct-is-longest percentage you achieved.
