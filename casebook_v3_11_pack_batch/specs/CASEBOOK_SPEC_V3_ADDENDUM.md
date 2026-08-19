# Casebook V3 — Addendum for the pack author (ChatGPT)

This supplements `CASEBOOK_SPEC_V3_THREE_READINGS.md`. It captures decisions made while building the prototype player (`play_v3.html`) and the content work still needed. The base spec defines the data; this defines **the engine contract the player enforces** and **the authoring bar for a case that holds together.**

---

## Part A — Engine contract (a pack that violates these breaks the player)

The player reads these fields exactly. Every pack must satisfy:

1. `READING_ORDER` — exactly **3** informant keys, each present in `CHARACTERS`.
2. Each `CHARACTERS[key].reading` points to a real `TOPICS` entry. Exactly **3** topics.
3. Each topic has exactly **3** questions. Each question has exactly **4** options.
4. **Exactly one option per question has `v:"expert"`.** The other three use `partial`, `wrong`, `danger` (one of the wrong-family; `danger` = the actively unsafe reading).
5. Every question has a `clue` with `category` in `who|what|where`, a `label`, and `text`.
6. **Within each reading the three clues cover one `who`, one `what`, and one `where`** (no duplicates, none missing).
7. `CATS.who`, `CATS.where`, `CATS.what` each list exactly **3** `items` (`id`,`label`) and a `truth` id that exists in that list.
8. `endings.overclaimWhat` and `endings.dismissalWhat` must each equal one of the **two non-truth** `CATS.what` ids (they are the sensational trap and the do-nothing trap). The third what id is the truth.
9. `endings.win` must have `expertTitle`/`expert`, `soundTitle`/`sound`, `namedTitle`/`named`. `endings.overclaim`, `endings.dismissal`, `endings.wrongNames` each need `title` + `body[]`.
10. Provide `agent`, `standingLabel`, `readingShort`, `readingLabel`, `dossierName`, `emblem` (inline SVG), `teaser`, and `story[]` (see Part C).

*(A validator already checks most of this — keep running `validate_casebook_v3.js` before shipping.)*

---

## Part B — Interaction model the player now implements (author to this)

- **Clues are awarded after the whole reading, not per question.** The player answers all three questions seeing only *correct/incorrect + why*; the clues for the questions they got right are then filed into the notepad together. So a reading is a single unit — write its three questions as one arc, not three unrelated items.
- **A missed question forfeits its clue for that playthrough.** Author on the assumption that a player may reach the accusation with fewer than 9 clues. The case must still be solvable — see B‑cohesion below.
- **The notepad (right rail) shows all candidates and lets the player cross them off.** The `CATS[*].items` labels are visible from the start, so they must **not telegraph the answer** (see Part C, anti-giveaway).
- **Win tiers are by clue count**: 8–9 = expert, 5–7 = sound, ≤4 = named. Write the three `win` variants so they read sensibly at each depth (the `named` text should acknowledge a correct-but-thinly-supported call).
- **The verdict screen reveals the truth explicitly** (a table of the player's pick vs. the true who/where/what). So the `endings` prose should *explain* rather than *reveal* — the reveal is already shown.

---

## Part C — The content bar (this is what fixes "it doesn't stick together")

The core problem to solve: the nine clues must **reconstruct one causal chain**, not just tag three labels. Author every case against these tests.

### 1. The nine-clue cohesion test (most important)
Lay the nine clues out in notepad order (the three WHO, the three WHERE, the three WHAT). Read them as a paragraph. **They must narrate the event end to end** — from the underlying decision, through the mechanism, to the outcome and the person responsible. If they read as nine disconnected facts, rewrite. Each clue should hand off to the next.

### 2. Each category's three clues escalate
Within a category, order the three clues so they go from suggestive → corroborating → decisive. The third WHO clue, read after the first two, should make the responsible party unmistakable — without any single clue naming them outright.

### 3. Solvable at 6/9, satisfying at 9/9
Because missed questions cost clues, verify the case is still **deducible from any 6 of the 9** (i.e., losing one clue per reading). If one specific clue is load-bearing and its absence makes the case unsolvable, spread that information across two clues.

### 4. The WHAT must remain a real judgment (the Casebook heart)
The WHAT column carries the sensational trap (`overclaimWhat`) and the do-nothing trap (`dismissalWhat`). The three scientist passages must **teach the player how to reject both** — the readings should give the reasoning to see why the vivid story overclaims and why the "just chance / nothing to see" story dismisses. If a player finishes the readings and still can't argue against the two traps, the passages have failed their job.

### 5. Anti-giveaway (same discipline as the other RECKON games)
- No single clue names the full solution.
- Each clue uses the **vocabulary/concept of its own scientist passage** — it should feel like that expert's knowledge applied to the case, not free-floating testimony.
- The `CATS` option **labels must not leak the answer by tone.** The three WHAT options especially should be phrased with equal confidence; the truth should not "sound most reasonable" on the label alone.

### 6. Passage discipline
- Person-centered, historically real, and it must actually **teach the concept its three questions test.**
- Keep the three passages in a case comparable in length and depth (pacing). The length win comes from 3 readings instead of 9 — individual passages can stay substantive.
- Distinct across packs (the cross-pack tf-idf checks in the audit should stay low).

### 7. Per-question quality
- The three non-expert options are genuinely tempting, not filler; each `fb` explains *why* in one specific sentence (educational, not just "wrong").
- Keep option lengths close (the audit tracks option-length spread — don't let the expert answer be consistently the longest).

---

## Part D — Quick punch-list to send with a pack request

> For each case: 3 informants, 3 passages, 3 questions each, one expert option per question, one who/one where/one what clue per reading. The nine clues must read as one connected causal story (run the cohesion test). Keep the case solvable from any 6 of 9 clues. The WHAT column's three options are the truth + a sensational trap + a do-nothing trap, and the passages must teach why both traps are wrong. No clue or option label may give the answer away. Wire all four endings (win with expert/sound/named tiers, overclaim, dismissal, wrongNames) and set overclaimWhat/dismissalWhat to the two non-truth WHAT ids. Run validate_casebook_v3.js.
