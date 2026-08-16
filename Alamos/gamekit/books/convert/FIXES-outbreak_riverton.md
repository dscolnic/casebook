# Outbreak: Riverton — fix list

**Eight instruments went in.** Four things came back wrong.

## 1. Two scenes are above the reading level

- `outbreak_riverton.m13.s1` — "Did the comparison stay fair?" · **scene, 15.2**
- `outbreak_riverton.m15.s3` — "Fund the post-crisis legacy" · **scene, 15.5**

A scene is 30–45 words of situation. At grade 15 it is almost certainly two long
sentences doing the work of four short ones.

## 2. Two hard words are never introduced

- **"epidemiology"** — first used on **day 1**, in `outbreak_riverton.m01.s1`
  ("Signal or noise?"). Day one of the game, in a game about an outbreak, and it
  is never defined.
- **"buffer"** — first used on **day 2**, in `outbreak_riverton.m02.s3` ("When
  heat changes an enzyme assay"). The chemistry sense, which a reader who knows
  the everyday sense will get wrong.

One clause each in the relevant stop's `assumes`.

## 3. Three takeaways give the answer away

- `outbreak_riverton.m02.s3` — "When heat changes an enzyme assay" · **50%**
- `outbreak_riverton.m10.s2` — "Selection or sampling artifact?" · **67%**

The first also has a review variant later in the campaign that shares its lesson,
so fixing it fixes both.

### Why a takeaway can now give the answer away

`takeaway` is rendered **above the question**, under "What this is about" — not
after the answer. That is deliberate: a stuck player needs to know what the
question is about before they answer it, not afterwards.

It means a takeaway that reuses the keyed answer's own words hands the answer
over. Write it as **the principle the question is an instance of**, in different
words from the answer.

- Answer: *"the roof-to-panel anchor governs"* → takeaway: *"A load path is
  limited by its weakest required transfer."*
- Not: *"The anchor is the weakest transfer in the path."*

## 4. An option set scorable without the question

### `outbreak_riverton.m15.s3` — "Fund the post-crisis legacy"

**Two of the three wrong options use an absolute — "always", "never", "only" —
and the right one does not.** That is the oldest tell in multiple choice: a
test-wise student scores it without reading the question.

Either remove the absolutes from the wrong options, or put one in the right
option so the pattern carries no information.

## Two conversions not applied

### `outbreak_riverton.m03.s3` — `CONTROL` · blocked

No `response`. The block gives a baseline and a noise of ±5, and nothing that
says what the reading becomes when the suspect is changed. Either give each
variable its result, or give the suspect a response — it must exceed **15** to
clear three times the noise.

### `outbreak_riverton.m06.s3` — `BALLPARK` retype · not applied

No `estimate` block. Same as elsewhere: tiles, values, correct, target,
tolerance, units, relationship, solution.

---

## How to send it back

Work from your own `outbreak_riverton-stops-edited.jsonl`, change only the rows named above, and return the
whole file the same way. Every row, changed or not.
