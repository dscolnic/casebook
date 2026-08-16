# The Trial — fix list

Eight new instruments came back, on eight separate days, in seven distinct
formats — VALUE ×2, CONTROL, ALLOCATE, ATTEST, TRACE, DELEGATE, DEGENERACY —
plus three retypes of DIAGNOSIS screens that had no panel behind them. Five of
the eight apply as they are, and all three retypes do.

Three rows are blocked, each on one missing field, and two larger things are
missing from the pass as a whole.

## 1. `the_trial.m09.s2` — "Which numbers this reaches" · `TRACE`

Six sources, four channels, correct dependency graph, correct independent pair.
**No channel has a `reading`** — the line saying what that measurement currently
says. Without it the board shows four labels and nothing to weigh.

One sentence each, in the numbers the stop already implies:

| channel | needs |
| --- | --- |
| Symptom score | what the score currently shows, and in which direction |
| Returned-kit adherence | the adherence figure the returned kit gives |
| Adjudicated admission | the admission count or rate as adjudicated |
| All-cause death | the death count from the register |

The point of the format is that the player reads four numbers that agree and has
to work out that two of them agree because they share a source. They cannot do
that without the four numbers.

## 2. `the_trial.m11.s2` — "Which questions have to be answered first" · `DELEGATE`

Three problems, two people, three first actions, return conditions, and the
unresolved event date correctly marked rising and irreversible. **No problem has
a `rate`** — how fast it is moving, against what margin.

`rate` is what makes one of the three an order rather than a preference. All
three need one:

| problem | the margin it is running against |
| --- | --- |
| Primary-event date unresolved | how long until Thursday's cut, and how long resolving it takes |
| Visit appears twice in one week | how fast duplicate visits are accumulating |
| Large pile of contact-field corrections | how fast the pile grows, against a deadline it does not have |

The third one's rate should make it obvious that it is loud and going nowhere,
which is exactly what you have already written into its consequence.

## 3. `the_trial.m15.s1` — "The same number, two ways" · `DEGENERACY`

**This is the best conversion in the file** and it is one field short.

Two controls, a first locus of five rate pairs that all give a relative risk of
0.778, a second measurement — the absolute risk reduction — that cuts the family
down to one point, and a truth of 0.189 / 0.147 which is the trial's own result
from `m10.s2`. It teaches precisely the thing the stop was about: a ratio does
not say how big an effect is, and it takes a second measurement to pin the pair
down.

**It needs `tolerance`**, one positive number per control, saying how close the
player has to land:

```
tolerance: { p_control: 0.01, p_treatment: 0.008 }
```

Those two are a suggestion, not a requirement — pick what you think a student
should have to hit. Anything tight enough that the other four locus points sit
outside it will work, which is what makes the first locus read as a *family* of
answers rather than one answer with noise.

## 4. The editorial pass did not really happen

Of forty-five rows, **four** came back with any prose changed. Thirty were
returned untouched, and eleven were the conversions.

That is not what §2b of the brief asks for. The pass is meant to go through the
story, the information given, and the questions and answers, and say where the
wording could be better, where a question is too easy, and where the story stops
carrying the science — with opinions, in prose, alongside the file. On the other
games that has been the most useful half of the return.

The Trial's prose is good, and "mostly leave it alone" may well be the right
verdict. But it is a verdict, and it should come back as one.

## 5. The syllabus gaps are still open

The manifest named three things nothing in the game teaches. After this pass:

- **Relative risk — closed.** `m15.s1` now computes it, and the contrast between
  the ratio and the absolute difference is the stop's subject. This was the
  biggest of the three and it is a good fix.
- **Surrogate outcomes — still absent.** Not one of forty-five stops mentions
  the idea. A trial measuring a laboratory number instead of the thing anybody
  cares about is one of the two or three most consequential ideas in the
  subject, and CLARION-3's clinical endpoint means the game never has to face
  it. It belongs on an ENDP stop, not in a new one.
- **Standard error — still never computed.** `SE = √(p(1−p)/n)` is why halving
  an interval costs four times the participants, which is the reason sample size
  is fixed before a trial rather than during it. Three stops mention intervals
  and none gets a number out of one.

## 6. One question about the conversions

The note sent with the sheet named ten candidate stops with a proposed format for
each. One of the ten came back as proposed — `m08.s3` → ATTEST. The other seven
conversions are elsewhere, and several are good: `m15.s1` is better than anything
on that list, and `m09.s2` → TRACE is the same idea as the proposed `m10.s1` →
TRACE and arguably the stronger stop for it.

That is a fine outcome. **But the reasoning did not come back**, so there is no
way to tell whether the list was considered and rejected or never applied. Three
sentences would settle it. In particular: `m04.s1` (the α budget as a pool that
does not refill) and `m13.s1` (running subgroup tests under a true null) were the
two strongest suggestions on it, and both are still plain screens.

## How to send it back

Work from your own `the_trial-stops-edited.jsonl`, add the three missing fields,
and return every row. If the editorial pass is coming, it comes in the same file
and its opinions come in prose beside it.
