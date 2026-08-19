# Casebook V3 — Batch revision note (break the answer archetype)

The eleven converted packs are strong on craft: within each case the nine clues now reconstruct one causal chain, the scientist passages are apt and real, and the WHAT column correctly offers a truth plus a sensational trap and a do-nothing trap. Keep all of that.

**One problem to fix: every case has the same answer.** Across all eleven packs the solution is the identical archetype, which lets a player who has done two or three cases solve the rest without reading anything.

## The pattern (measured across all 11)

| Element | What it is in every single case |
|---|---|
| **WHO (truth)** | the authority / decision-maker — director, architect, manager, owner. **Never** the frontline worker who flagged the problem; **never** the outside inspector / auditor / regulator. |
| **WHERE (truth)** | that authority's **office** — and it is **always listed third** in `CATS.where.items`. |
| **WHAT (truth)** | **always the third option** in `CATS.what.items`; the overclaim trap is always first, the dismissal trap always second. |
| **Moral** | identical every time: "management ignored a known problem and covered it up." |

So the learnable meta-rule is *"it's the boss, in the boss's office, via the boring systemic cause they signed off on."* That collapses the deduction and makes the collection monotonous.

## Fix 1 — Vary who is actually responsible and what actually happened

Do not let the truth always be the authority figure via the systemic middle cause. Across the set, distribute the solutions so the player cannot predict them:

- **Sometimes the culprit is the frontline worker** who genuinely cut a corner, and the manager who signed off is a decoy.
- **Sometimes it is the external actor** — the inspector who waved it through, the outside contractor, a genuine bad actor.
- **Crucially, sometimes the overclaim is TRUE** (it really was sabotage / a novel attack / a vessel strike), and **sometimes the dismissal is TRUE** (it really was within limits / genuine bad luck / an unpreventable fluke). If the systemic middle option is correct in every case, "reject both traps" becomes a rote reflex instead of a judgment the readings have to earn.
- Vary the culprit's role and the location of culmination case to case. The WHERE truth should not always be an "office."

Aim, across eleven cases, for a spread — e.g. a mix where roughly a third resolve to the worker, a third to an authority, a third to an outside/other party; and where the overclaim and the dismissal are each the real answer in at least one or two cases. Exact counts are yours to balance, but no single archetype should dominate.

When the overclaim or dismissal is the truth, the two remaining WHAT options become the traps — set `overclaimWhat` / `dismissalWhat` accordingly (they must still be the two non-truth ids), and make sure the passages teach why the *now-incorrect* systemic story is the tempting-but-wrong one.

## Fix 2 — Randomize positions so order carries no signal

Independent of content, the ordering itself currently leaks the answer:

- In `CATS.what.items`, put the truth in a **different slot in each pack** (sometimes 1st, 2nd, or 3rd). Same for the overclaim and dismissal traps — do not fix overclaim=1 / dismissal=2 / truth=3.
- In `CATS.where.items` and `CATS.who.items`, vary which slot the truth occupies across packs.
- Within every question, vary which of the four options is the `expert` one (do not let the correct option sit in a consistent slot, and keep honoring the existing rule that the expert option is not consistently the longest).

The goal: knowing a truth's list position in one case tells you nothing about any other.

## What to preserve

- The nine-clue cohesion (run the cohesion sheet again after rebalancing).
- One WHO / one WHERE / one WHAT clue per reading; clues indirect and anchored to their scientist's concept; no clue naming the solution outright.
- All four endings wired (win expert/sound/named, overclaim, dismissal, wrongNames), and `overclaimWhat` / `dismissalWhat` = the two non-truth WHAT ids.
- The engine contract in `specs/CASEBOOK_SPEC_V3_ADDENDUM.md` Part A — all packs must still pass it.

## Deliverable

Return the eleven packs rebalanced so the solution archetype varies across the set and list positions are randomized, with within-case cohesion intact. Note in a short changelog which archetype each case now resolves to (worker / authority / outside; and whether the truth is the systemic cause, the overclaim, or the dismissal) so the spread is easy to verify.
