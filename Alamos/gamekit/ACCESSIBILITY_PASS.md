# The accessibility pass

**Hard concepts explained for sixth graders.** Reading level down, demand untouched.

**The rules are in the `alamos-accessibility` skill** — the seven defects to find in a
card before touching its prose, the rewrite rules, the shape the book still requires,
and the evidence to report. This file is the runbook: scope, order, and what to do
when a whole book is in front of you rather than one card.

## Order

One card, or one area at a time. Never the whole book in one edit.

```sh
cd gamekit
cp books/<theme>.yml /tmp/<theme>.yml.bak        # the teardown is one cp back
# rewrite the cards of ONE group in books/<theme>.yml
node tools/import-book.mjs books/<theme>.yml <theme> --verify
npm run check <theme>
```

Import after every group, not at the end. `readerProbe` fails on a `takeaway` that
repeats its own answer, and finding out which of eighteen cards did it is the
expensive way.

`bookParity` inside `npm run check` is what makes the pass safe: if a book stops
regenerating the content its game ships, the check fails. So the book is the only
place to edit and the check is the only proof.

## What travels across a whole book

Three things stop being one card's problem once the pass runs on all of a book:

- **Shared boilerplate.** `redsand.yml` carries the same three test-design
  `background` paragraphs — *"Why the wrong options are the interesting ones"* — on 17
  cards. Replacing them per card leaves the book inconsistent. Decide once whether
  real per-card background is the book's rule, and then it is every card's job.
- **The handles.** Two cards teaching the same idea should use the same plain words
  for it. *speed* and *ceiling* on KINET-1 have to be *speed* and *ceiling* on
  KINET-3, KINET-9 and EQUIL-11, or the repetition that lowers the load is spent.
  Write the handle list for the book before the second card.
- **Forward references.** Finding 6 in the skill is per-card, but the day map is
  per-book. Get the shaped schedule once — `shapeMissions` places the `— Review`
  callbacks at load, so the authored day is not the day played — and check terms
  against it rather than against the book's order.

## What the pass is not

- **Not a re-authoring.** `REWRITE_PASS.md` is for a game whose questions are wrong
  for its course; this is for questions that are right and read too hard. Same
  stops, same keys, same formats, same days.
- **Not a sequencing fix.** A card filed under the wrong concept stays there.
  `SEQUENCING_PASS.md` owns that, and moving a `concept` moves
  `conceptOrder`/`equationOrder` dependencies across the campaign.
- **Not a format conversion.** `DIVERSITY_PASS.md` owns the format cap. A CHOICE that
  reads hard becomes a readable CHOICE.

## Status

| Theme | Cards | Done | Whole-card grade | words/sentence | syllables/word |
| --- | --- | --- | --- | --- | --- |
| `redsand` | 56 | **all 56** | **7.72 → 5.84** | 15.6 → 12.2 | 1.55 (held) |

Red Sand is the reference implementation. Every card carries three real
`background` paragraphs, every official term is glossed on the spot, no sentence
runs past 25 words, and `npm run check redsand` is green. Three shipping defects were
found on the way and are recorded in the skill: a `guide` truncated mid-sentence by a
colon in prose, a `guide` deleted by an indent slip, and a `guide` merged into its own
`scene` by another. **Two of those three passed every gate in the repo.**
