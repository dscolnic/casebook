# Eight campaign bibles: handback 1 revisions

Revised from the eight supplied bibles and their respective round-one handbacks. These are complete replacement bibles, not addenda.

## Story and scene changes

Every campaign retains 15 missions and 60 graded stops. Each now has:

- 15 physical aftermath blocks with existing fixture homes, explicit accepted-stop triggers, exact actions, persistence, and visible next problems.
- A 15-row persistent world-state ledger.
- Rewritten required opening and mission cards, with a player role, a clock, and “Today you decide…” on every mission card.
- Three ungraded landmark spaces and a final playable scene with a defined visible change, player route, and ending card.
- Specific closing dialogue and causal turns, plus persistent accepted-result slips replacing generic world-state stage directions. Answers appear on those slips only after acceptance.
- Completion guards and retry behavior that prevent scenes from granting unearned clearance, measurements, or resources.

| Bible | Main story improvement | Physical payoff |
|---|---|---|
| CARRYING | Tomas’s summer ferry plan meets the costs borne by the school, fishers, waterworks, and reef. Mission titles now name situations rather than audit topics. | Conditional second-ferry arrival; a failed safeguard leaves the berth fenced and the single service running. |
| CHANGEOVER | The public queue, bank timing, wage contracts, and lost orders make policy costs visible. | Counters open, old notes leave in sealed cages, new notes enter the trays, and street signs change. |
| GROUNDTRUTH | Visible bank flashes, rocket shots, contrasting fast and slow traces, and Ortiz’s season deadline connect the investigation. | The witnessed shot leads to certification; its traces remain beside the printed final report. |
| HEADWATER | Mission names match the actual calculus sequence; water, machinery, and the four warning circuits carry the countdown. | The player walks onto the crest above the staged release already performed in Stop 59. |
| MARS | The override dispute has concrete evidence, an acknowledgement of withheld information, and a shared recovery plan. | GO opens the crew gate and begins boarding; NO-GO leaves bags by the door and prints the failed checks. |
| PLANETARY | The dot, orbit cloud, weak echo, and separate fragment remain visible through successive interpretations. | Targeted warning acknowledgements and buses leaving below the ridge, with the main-body stand-down preserved. |
| SAFETY | Hart’s card, the sealed controller crate, arm nine, and the wrong coaster radius drive the final certificate. | Six cleared operating sections open around the deliberately closed coaster. |
| TRIAL | A visiting fast-site investigator, the site wall, opened analysis envelope, locked cabinet, and arriving board make the records human. | The player carries the pack into the meeting; site permissions reflect the safeguards rather than a blanket restart. |

## Teaching and continuity corrections

Added fixture source panels to all 88 DERIVE stops, retaining symbolic derivations where numbers are not appropriate. Added source-record delivery to all 60 Carrying stops. These keep inputs visible at their actual fixtures and preserve the prediction-before-operation sequence.

Trial Mission 6 starts with two terms. Control, replication, concealment, paired designs, sampling spread, and waiting-time models are taught at the relevant stops. Its screening question no longer prints its numerical target. A paired-design distractor now distinguishes genuine pairing from loose similarity without incorrectly implying that matched patients must each receive both treatments.

Corrected Changeover Mission 3’s inherited closing summary, which had repeated the output-gap lesson from Mission 4. Treated first-week cases before changeover as rehearsals rather than results from a week that has not occurred. Aligned Headwater’s mission names with the lessons actually present beneath them.

Two handback suggestions needed timing adjustments to preserve the authored evidence:

- Safety’s arm-nine barrier stays until the external inspection returns after Stop 59. Removing it at Mission 9 would contradict the conditional wheel clearance.
- Groundtruth’s final shot occurs after the repair and readiness checks but before Stop 60 certification. Certification then prints the report and preserves the shot scene; it does not launch an unverified extra shot.

## Validation and limits

Local checks passed for all eight files: 120 missions, 480 stops in order, 120 physical aftermaths with declared fixture homes, 600 explicitly triggered story beats, 120 decision clauses, and all 120 existing worked-example panels retained. Existing stop Format/placement and Correct result fields match the supplied bibles exactly.

A local syllable-based readability estimate puts all revised required opening and mission cards below grade 6.5. This is an approximate prose check, not the build’s readability implementation.

The running game, its importer, and its checkStory/deriveGivens source were not supplied. These revisions were checked as documents; they have not been imported or playtested in the engine, and no engine-gate pass is claimed. Existing numerical interaction payloads were retained rather than subjected to a fresh full-course scientific audit.


## Standalone Go Deeper revision

All 720 optional review questions have been revised to stand alone. Removed mission-title references, follow-up wrappers, instructions to revisit earlier decisions, and reliance on unseen cards or observations. Conceptual questions now ask directly about the concept; applied questions state their own givens. The optional review introductions no longer ask players to revisit the mission.

Reworked mismatched figures into independent graph questions, supplied missing mathematical models, and cleaned options and feedback that contained build instructions or references to prior results. All 81 review figure slots remain. In particular, Headwater’s opening review now states the rational function directly; its separate asymptote question supplies its own function. Standalone implicit-differentiation examples use a relation consistent with their supplied evaluation point.

Each bible now includes a Standalone Go Deeper question contract: no prior mission or review question may be required, and the prompt, choices, hint, feedback, and figure must be understandable together without external context.

Validation: each bible has 90 review questions, four distinct choices and a keyed answer per question, four feedback entries, and valid JSON for every review figure. All 480 main graded-stop blocks are byte-for-byte unchanged from the preceding story revision. Physical aftermaths and optional worked examples are retained. This was a document revision, not an engine import or playtest.


## Full repetition sweep

Reviewed all eight bibles for repeated claims within passages, including all 480 graded question setups, all 88 DERIVE source panels, and all 720 standalone review questions. Removed duplicated sentences, paraphrased repeats, appended copies of equations and givens, and unrelated glossary definitions carried into Groundtruth answer choices.

Headwater’s opening now introduces the water-level model once, defines its variables once, and asks for the limit once. The same cleanup covers its float-gain and accumulator questions, Groundtruth’s field and RC questions, and redundant source-panel copy in Safety, Trial, Planetary, and Changeover. Mars and Carrying passed the repetition checks without requiring question-text changes.

Where duplicate inputs disagreed, matched the surviving copy to the existing solution: Trial’s paired differences use days, its goodness-of-fit expected counts are 40/40/20, and Changeover’s monetary aggregate uses small time deposits. All answer keys and numerical results remain unchanged.

Added an editing rule to every bible: integrate givens into existing prose, state each fact once within a passage, and display independently useful source panels separately from question setups. Go Deeper questions retain their own context and data.

Validation confirmed 60 graded stops, 90 review questions with four distinct choices and four feedback entries, 15 worked-example panels, and 15 physical aftermath blocks per campaign. Existing figure JSON remains parseable. The earlier note about byte-identical graded-stop text describes the standalone-review pass; this repetition pass intentionally edits graded setup and source text.


## Opening-card closing quotes

Restored the original character quote at the end of all eight campaign opening cards. Each card remains five sentences: the two short stakes statements are combined, followed by the original attributed quote. Delivery directions now agree with the sentence count and explicitly prevent additional player-visible prose after the quote. Mission cards, questions, answers, and the repetition-sweep changes remain unchanged.


## Final opening-quote edit

Replaced the restored long quotes with brief character dialogue in all eight bibles. The quotes now express a concern, promise, or request instead of recapping the campaign: Headwater’s downstream homes, Groundtruth’s earlier sign-off, Changeover’s entrusted savings, Safety’s authority to keep a ride shut, Mars’s offer of support, Planetary’s need to justify evacuation, Carrying’s children staying on the island, and Trial’s obligation to include uncomfortable findings.

Each opening remains five sentences and ends with its attributed quote. All other story content, questions, and answer keys are unchanged from the preceding version. This edit supersedes the verbatim quote restoration described above.
