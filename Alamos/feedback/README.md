# Campaign reviews — 42 campaigns, read and solved

Every campaign in `gamekit/themes.json` was read from the opening card to the closing
paragraph, every question was solved, and every estimate board was checked against first
principles. One PDF per campaign, plus one cross-campaign document.

**Read `_rejudged.pdf` first** — five campaigns read again after the fixes, and the honest note about what the first pass missed. Then `_plan.pdf` for what is left and the order to do it in, and `_cross-campaign.pdf` for the patterns.

**Read `_cross-campaign.pdf` third.** It carries the five defects that mattered most, the
two findings of mine that turned out to be wrong, the six new gates, and the one thing
that is recorded rather than fixed.

Each campaign PDF opens with a verdict, then **Implemented since this review** where
something was changed, then a findings table using three severities:

- **FIX** — a player doing the right thing is told they are wrong, or content the campaign
  paid for reaches no screen.
- **WORTH** — a real improvement with a clear shape.
- **TASTE** — recorded so nobody "fixes" it by accident, or a house tic worth naming.

Row states: **CLOSED**/**FIXED** (fixed and verified), **WITHDRAWN** (I was wrong — the reasoning is in the row), **RECORDED** (measured, in a debt file that only shrinks, deliberately not done), **PLAN** (see `_plan.pdf`). **No FIX row is open.**

Some rows read **FIXED** or **WITHDRAWN**. Withdrawn means I was wrong; the reasoning is
in the row, because it is the kind of wrong this repo's own house rule warns about.

## State of the tree

- `npm run check` — green on all 42 themes
- `npm run traps` — 111 of 114 fire (four skipped for the suspended STACK)
- Six new gates, each with a selftest, each validated by putting the defect back:
  `boardAnswer.mjs`, `deriveRules.mjs`, `numeralWords.mjs`, `sceneCast.mjs`, and
  extensions to `checkStory.mjs` and `questionLoad.mjs`
- Two new debt files, both of which only shrink: `questionload-debt.json` (110 rows,
  Hospital at grade 2) and `scenecast-debt.json` (8 campaigns whose scenes name nobody)

## Reading order, if you only read a few

| PDF | Why |
| --- | --- |
| `_cross-campaign` | The patterns, the gates, and what is left |
| `ghostlight`, `yellowbay`, `sightline_ms` | The three best-made campaigns in the set, and the shape to copy |
| `redsand`, `midway` | The two with the most fixed in them |
| `projecty`, `contamcity` | The docx-origin problem, measured |
| `hospital` | The youngest audience, and the gate that could not fail it |
