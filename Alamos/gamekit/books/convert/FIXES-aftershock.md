# Aftershock — fix list

**Seven instruments went in** and 35 stops took rewritten prose — the heaviest
edit of any game. Three things came back wrong.

## 1. Three verdicts are above the reading level

Grade 12 game. Anything over 14 is rejected.

- `aftershock.m09.s2` — "Soft ground, three days on" · **`why`, grade 15.0**
- `aftershock.m10.s1` — "A real crack, and an unknown building" · **`why`, 14.7**
- `aftershock.m12.s3` — "Five times, not three" · **`why`, 14.5**

Same fix as before: average about 15 words a sentence, nothing over 25. The
pattern in all three is a multi-clause sentence carrying two ideas — split it.

## 2. "CPT" is never introduced

First used on **day 14**, in `aftershock.m14.s2` ("A measurable acceptance
target"), with no glossary entry, no primer mention and no definition in place.

It is a cone penetration test, and the stop turns on reading its profile — a
player who does not know what it is cannot follow the argument at all. Add a
clause to that stop's `assumes`, which renders above the question under "Takes as
read".

## 3. Two takeaways give the answer away

- `aftershock.m08.s2` — "Which way the cracks run" — takeaway repeats **50%** of
  the keyed answer's own words
- `aftershock.m10.s2` — "Down there with a torch" — same, **50%**

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

## One conversion not applied

### `aftershock.m12.s1` — `TRACE`

A channel names its own dependency in its label or reading. That hands over the
graph: the player reads one row, sees the shared source spelled out, and never
opens anything.

The dependency belongs in `depends` and nowhere else. Whatever the label says —
"…from the shared reference", "…via the common clock" — take it out and let the
player find it by opening the channel.

---

## How to send it back

Work from your own `aftershock-stops-edited.jsonl`, change only the rows named above, and return the
whole file the same way. Every row, changed or not.
