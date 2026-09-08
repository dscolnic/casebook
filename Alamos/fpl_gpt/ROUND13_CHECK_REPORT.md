# Round 13 correction and check report

## Scope

Revised the eight bibles supplied with WHAT_TO_HAND_BACK_13.md. Earlier upload versions were not used as the campaign sources. The master campaign brief also incorporates the round-13 rules for future authoring.

## 1. Stop-copy check

Replaced all 480 stop reasons and all 480 story-science connections with individually authored lines. Each reason addresses the current investigation or operating decision; each connection names what this stop's answer settles. Removed the old per-format closing sentences from those labels.

Preserved numerical information formerly placed only in a reason by moving it into the situation or the DERIVE givens. Removed generic instructional tails from setups, and supplied explicit sample situations and inputs for the identified Mars calculation cards. Shortened DERIVE task prompts without discarding their input data.

| Campaign | Stops | Distinct reasons | Distinct connections | Entire reason repeated in setup |
| --- | ---: | ---: | ---: | ---: |
| Safety Factor | 60 | 60 | 60 | 0 |
| The Trial | 60 | 60 | 60 | 0 |
| Planetary Defense | 60 | 60 | 60 | 0 |
| Changeover | 60 | 60 | 60 | 0 |
| Mars | 60 | 60 | 60 | 0 |
| Headwater | 60 | 60 | 60 | 0 |
| Ground Truth | 60 | 60 | 60 | 0 |
| Carrying Capacity | 60 | 60 | 60 | 0 |

The automated comparison tests literal repetition, not semantic quality. The new reason and connection sentences were authored against each stop's situation and keyed result.

## 2. Derivation check

All 88 canonical DERIVE rails parse, contain displayed givens, and retain exactly two distinct candidates with exactly one correct candidate in each of their 299 steps. Safety Factor's earlier board representation and later rail both retain the givens.

| Campaign | DERIVE rails | Two-choice steps |
| --- | ---: | ---: |
| Safety Factor | 10 | 42 |
| The Trial | 17 | 58 |
| Planetary Defense | 1 | 4 |
| Changeover | 20 | 71 |
| Headwater | 20 | 55 |
| Ground Truth | 20 | 69 |

Mars and Carrying Capacity have no canonical DERIVE rails in these supplied versions; their other formats were preserved.

Specific repairs include:

- Ground Truth: named the two downward field contributions before substitution; retained cloud height and signed field; expanded trapezoid averages, tip-radius ratio, capacitance conversion, wire-field and loop-emf substitutions; made current-force and reroute calculations explicit; corrected several quantity labels, including total bond voltage.
- Headwater: exposed numerical evaluation in the limit, derivative, linkage slope and curvature, accumulation, seepage, and capacity calculations; corrected the general derivative label from I'(2) to I'(t); repaired missing derivative and secant-slope labels where encountered.
- The Trial: exposed sample-proportion calculations, pooled denominator, squared standard deviations, observed-minus-expected contributions, and expected cell counts; supplied the paired-interval critical value; repaired doubled equals signs and the probability label.
- Changeover: retained expenditure, reserve, inflation, and output inputs on the rail; showed the index difference explicitly; removed answer-reciting transmission chains from the task and givens.
- Safety Factor: retained the stated measurements and governing relationships on both representations; added numerical evaluation for effective pendulum length and the contact-speed requirement, each with a common-mistake alternative. The length rounds to 9.39 m using the stated g = 9.80 m/s² and T = 6.15 s.
- Planetary Defense: gave displacement, lead time, day-to-second conversion, and adopted asteroid mass explicitly on the two-choice rail.

These are source-level repairs and structural checks. The repository containing engine/dev/deriveGivens.mjs was not supplied, so its imported-campaign number-provenance check was not run. A nonempty givens list alone is not proof that an engine provenance check will pass. The receiving build should run that check against these revised files, particularly where a first numerical line computes an intermediate quantity.

## 3. Remaining round-13 checks

- Repaired both Trial Symbols lines, Ground Truth's permittivity gloss, Changeover's multiword output labels, and Carrying Capacity's water-balance meanings.
- Confirmed Headwater and The Trial already have titled, story-motivated warm-ups for days 4, 8, and 13. Added the missing Ground Truth warm-up block for those days.
- Shortened The Trial's final opening sentence while preserving its five-sentence opening.
- Confirmed the calculation formats checked in Carrying Capacity are placed at fixtures, not person stops. The supplied version already contains this placement repair.
- Parsed all 92 exact-player-copy figure JSON blocks. Bar figures use bars with named numeric values; line and peaks figures use series with points. No second-y-axis fields were found in these objects.
- Confirmed all eight revised bibles contain no em-dash characters.

No live gameplay, renderer screenshot review, or importer test is claimed. Existing unrelated answer keys and campaign mechanics were not comprehensively re-audited in this round.

## Files

The package contains eight complete revised bibles, the updated master campaign brief, this report, and the source-check script. The new filenames identify round 13 and avoid spaces for reliable downloads.
