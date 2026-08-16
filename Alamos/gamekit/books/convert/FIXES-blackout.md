# Blackout — fix list

**Nothing is blocked.** All thirteen changes apply: nine new instruments, four
retypes, and thirty-two rows of rewritten prose. This is the cleanest pass any
game has come back with.

For the record, what landed:

| | |
| --- | --- |
| New instruments | 9, on days 1, 2, 5, 7, 9, 10, 12, 13, 15 |
| Distinct formats | 8 — TRACE, TRIGGER, VALUE ×2, CONTROL, DEGENERACY, CHAIN, DELEGATE, ATTEST |
| Retypes | 4 (DIAGNOSIS and TRIAGE screens with no panel → CHOICE) |
| Rows reworded | 32 |
| Reading level | inside grade 12 |

One instrument per day, never two, and no format used more than twice. That is
the spread the brief asks for and the first sheet to hit it exactly.

## Three things worth knowing, none of them blocking

**Some of your field names were absorbed rather than matched.** All of these were
read correctly and none needs changing:

- `locus1` / `locus2` → the two loci of a DEGENERACY, with `answerTolerance` as
  its tolerance.
- a CONTROL written as a baseline *state* plus a table of runs — `baseline: {waveform: AC, …, response: 5.0}` with `results[].set` — which is a better description of a bench than the schema's own.
- `people` → the DELEGATE roster, and `keep` → the problem command takes itself.
- `correctOrder` → a CHAIN's path.

The normaliser now handles each. No round trip was needed for any of them.

**`blackout.m11.s2` reports `SWEEP -> SWEEP`.** That is a no-op and is treated as
one. It briefly read as a refusal because the tooling took any format it could
not build a block for as an error; a row keeping the format it already has is
asking for nothing. Nothing to do.

**Three lines score above grade 12 on Flesch–Kincaid**, and all three are false
positives — single sentences of unavoidable vocabulary. One is
`blackout.m05.s1`'s answerText, "About 85% round-trip efficiency", which scores
17.0 because it is five words long. No action.

## How to send it back

Nothing to send back. This one is ready to apply.
