# Handing an edition to an outside model

What to upload, in what order, and what to say. Written for `planetary_defense_ms`;
every other edition is the same three files with its own name in them.

## The three files

| Upload | What it is | Size |
| --- | --- | --- |
| `books/GRADE6_BRIEF.md` | the general brief — what a stop is, the nineteen formats, every trap, the checklist | ~59 kB |
| `books/convert/<theme>-addendum.md` | this game only — cast with roles, areas that may not be dropped, the grade-6 syllabus, the equations it may compute and the ones it may not, the ten days with their formats and current reading grade, the campaign argument | ~10 kB |
| `books/convert/<theme>-stops.jsonl` | the work — one JSON row per stop, every editable sentence in it, plus whatever question data the stop already carries | ~68 kB |

Together about 34,000 tokens, so all three go in one conversation. **Do not**
upload `<theme>-stops.manifest.json` — it maps ids back to the book for
`apply-conversions.mjs` and the model has no use for it.

## Why the output has to come back in batches

Thirty rows, each carrying a rewritten scene, verdict, options and — on eight of
them — a full instrument data block, is more than any single reply will hold.
A model asked for all thirty in one message will silently shorten the later
ones, and short rows are exactly the failure the brief's §8 is about.

Ask for **three days at a time**, ten batches of three or four rows, and paste
each batch into one growing `.jsonl` file. Rows are independent; order does not
matter to the applier.

## The prompt

> You are editing one educational game so it can be played by a sixth grader.
>
> I have uploaded three files:
>
> 1. `GRADE6_BRIEF.md` — the brief. Read §0a (what you may not change), §4b
>    (what has gone wrong before) and §8 (the checklist) before writing anything.
> 2. `planetary_defense_ms-addendum.md` — this game specifically: the cast you
>    may name, the areas you may not drop, the course this edition teaches, the
>    equations it may compute, and the ten days as they currently stand.
> 3. `planetary_defense_ms-stops.jsonl` — the thirty stops, one JSON object per
>    line. Every field the brief lists as editable is yours to rewrite.
>
> The prose in the sheet is the senior-high original. It is the scaffold, not
> the target: it reads at grade 9.9 and it has to read at grade 6.
>
> Do this in ten batches of one day each, starting with day 1. For each batch
> return only the JSONL rows for that day's stops, edited in place — same ids,
> same field names, same option order. Stop after each batch and wait for me to
> say "next".
>
> Across the whole game convert six to eight stops into instruments, at most one
> per day, taking variety in the formats. Every converted row carries its own
> `data` block with real numbers, and the trap arithmetic stated at both ends in
> `trap_is_satisfied_by`.
>
> After the last batch, write the prose summary the brief asks for in §8: your
> editorial opinion of the game, the questions that were too easy and what gave
> them away, a day sheet, which curriculum concepts are thin, which equations you
> moved from mentioned to computed, and what you deliberately did not change.

## The four things it will get wrong

Each of these has come back from a real pass and cost a round trip. Worth
pasting as a reminder before the first batch:

1. **Reordering options.** They are applied by position. Rewording in place is
   fine; moving one re-keys the question to whatever lands in that slot, and
   every check still passes. Same for rebuttals.
2. **A `BALLPARK` with no runnable `formula`.** A prompt, a relationship and a
   worked solution in prose is not an estimate — the panel returns NaN. It needs
   `labels`, `values`, `correct`, `slots`, `template`, `formula`, `target`,
   `tolerance`, `units`, at least one distractor tile, and no tile that *is* the
   answer.
3. **Long sentences, not hard words.** The reading gate is Flesch–Kincaid, so
   sentence length dominates it. A 45-word scene in two sentences fails; the
   same 45 words in four sentences usually passes.
4. **A pass mark that is a sentence, or a number nothing can reach.** Every
   threshold, target, tolerance and pass mark is a number, and the arithmetic
   has to work at both ends — the cheap move falls short, the full set of right
   moves clears.

## When it comes back

```sh
cd gamekit
node tools/check-conversions.mjs planetary_defense_ms returned.jsonl
node tools/apply-conversions.mjs planetary_defense_ms returned.jsonl --dry
node tools/apply-conversions.mjs planetary_defense_ms returned.jsonl
node tools/import-book.mjs books/planetary-defense-ms.yml planetary_defense_ms --verify
npm run check planetary_defense_ms
npm run drive planetary_defense_ms        # only once it has instruments
```

`check-conversions` normalises field names that came back close but not exact —
that is deliberate, and it is why the prompt says nothing about getting them
right. It will not invent a number, so a row whose trap fails is rejected and
comes back to the model with the arithmetic quoted.
