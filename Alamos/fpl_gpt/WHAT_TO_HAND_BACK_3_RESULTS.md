# WHAT_TO_HAND_BACK_3 — completion and QA

## Work completed in the required order

1. **Decision boards:** Re-authored every held-back TRIGGER, STRESS, and ALLOCATE stop. TRIGGER stages now have named quantities, bounded windows, forward updates, and positive lead times satisfied by the stream. STRESS assumptions now have valid ranges and in-range nominals, two criteria, `optimiseOn`, and at least one candidate that fails. ALLOCATE questions now have nonempty `requires` lists and at least one outcome the plan may forgo.
2. **Format mismatches:** Changed the eight freeze/reveal HOLDOUT stops to HOLD; changed the eleven visible-arithmetic BALANCE stops to BALLPARK; changed the table-shaped CLOUD stops to evidence-based CHOICE boards. This preserves the authored task instead of inventing curves, hidden ledgers, or clouds.
3. **RESIDUAL:** Every held-back residual board now marks the lower-error patterned fit `structured`, rejects it, and supplies authored coordinates on an axis named in the question.
4. **Answer leakage:** Removed the five exact-answer anchors (97.0%, 5.0 kV/m, 8.0 m/s, 1.0 m, and 0.025). The 36.850 mm/h asymptote, 0.4 constant, and 4,600 km width are stated in their graded results.
5. **Prose payloads:** Replaced the fourteen prose-only payloads with structured in-place boards, including all four DIAGNOSIS stops.
6. **Concept numbers:** Confirmed one manually selected, course-spine concept number beside the existing tag on every actual stop: 60 per campaign, 480 total. All are within the supplied campaign spine. The handback says 496, but the eight bibles and eight concept files contain 60 stop rows each, so the auditable total is 480 rather than creating sixteen nonexistent stops.
7. **Reachability and small fixes:** Put all fifteen unresolved group IDs into actual character-role entries; fixed the duplicate Mission 8 beat ID; and made the warm-up titles match their seven- and eight-area runs.

## Coverage

| Campaign | Current diagnostic stops | Repaired in place | Concept numbers |
|---|---:|---:|---:|
| Carrying Capacity | 24 | 24 | 60/60 |
| Changeover | 14 | 14 | 60/60 |
| Ground Truth | 14 | 14 | 60/60 |
| Headwater | 16 | 16 | 60/60 |
| Safety Factor / Midway | 16 | 16 | 60/60 |
| Planetary Defense | 28 | 28 | 60/60 |
| Red Sand / Mars | 10 | 10 | 60/60 |
| The Trial | 12 | 12 | 60/60 |
| **Total** | **134** | **134** | **480/480** |

All 134 Handback 3 YAML repair blocks parse successfully. Each bible still has exactly 60 globally numbered stops. The first opening card names its subject in all eight games. The retained DERIVE interaction audit found 297 authored steps, each with exactly two candidates: one correct and one plausible common mistake.

## The three requested checks

1. **Can the board be got wrong? — PASS, 134/134.** No repaired trigger has an unset window or unsatisfied lead time; no repaired stress board has all candidates survive; no repaired allocation has empty requirements or every outcome pre-protected. Other repaired formats contain an explicit distractor, rejection, failure condition, or common-mistake path.
2. **Does the axis name the question's quantity in the same units? — PASS, 134/134.** Zero repaired boards use `decision units`, `controlled setting`, `display A`, or a placeholder axis. Trigger, stress, residual, and sweep axes were checked directly against their stop questions and units.
3. **Does the board print its own answer? — PASS, 134/134.** Zero effective trigger anchors equal a keyed stage boundary or carry an answer label. The five named leaking anchors were moved off their thresholds. No opening control state is itself the keyed decision.

## Additional checks

- Structured repair coverage: **134/134**.
- Repair YAML parse errors: **0**.
- Missing or out-of-range concept numbers: **0**.
- Unowned diagnostic groups after roster integration: **0/15**.
- Opening cards missing the subject: **0/8**.
- DERIVE steps with anything other than two choices or without one common-mistake distractor: **0/297**.

These are document-level authoring and structural checks. A repository importer/runtime test was not available in this workspace, so this report does not claim a game-build execution pass.
