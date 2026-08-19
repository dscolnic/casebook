# CASEBOOK ANTI-TEMPLATING & PLAYTEST QUALITY ADDENDUM

**This addendum is mandatory and overrides any workflow that favors speed, batch conversion, schema compliance, or option-length parity over writing quality.**

## Core principle

Treat every pack as a separate writing project and every encounter as a separate scene. A pack is not finished merely because it has 9 topics, 27 questions, valid JavaScript, balanced answer lengths, and a passing schema. It is finished only when the nine encounters feel meaningfully different to a player.

Do not generate profiles, questions, options, feedback, frames, or witness scenes from a shared prose template with names and technical terms substituted.

## Required planning before writing

For each of the 9 topics, write a private five-part design note before drafting:

1. **Unique lesson:** the one idea this pioneer teaches that no other profile in the pack teaches.
2. **Case discriminator:** how that lesson helps judge one of the three WHAT hypotheses.
3. **Question trio:** three different cognitive tasks, not three versions of “state the contribution / apply the method / name the lesson.”
4. **Distractor models:** the specific misconception behind each wrong, partial, and danger answer.
5. **Encounter identity:** what this witness physically does, notices, or reveals in this place that is different from the other eight encounters.

Do not begin prose until all nine design notes are distinct.

## Question rules

Across the 27 questions:

- Every question stem must be independently written.
- Exact duplicate stems: **0**.
- Near-duplicate stems with the same syntax and task: **0**.
- No generic stem may appear more than once, including:
  - “Which description best captures…”
  - “Which practice is most defensible?”
  - “Which principle best follows?”
  - “How should investigators apply this work?”
- No single question archetype may appear more than twice in the pack.
- Questions must vary in task: interpretation, comparison, diagnosis, chronology, mechanism, evidence selection, counterfactual, error detection, experimental design, source criticism, quantitative reasoning, or decision-making.
- At least one question per profile must depend on a concrete fact or mechanism unique to that pioneer.
- At least one question per profile must connect the reading to the case discriminator without naming the correct WHAT directly.

## Answer-choice rules

Across the 108 answer choices:

- Each option must be written for its specific question.
- Do not reuse stock wrong-answer structures with nouns swapped.
- Do not append filler to satisfy length parity.
- Forbidden padding includes phrases such as:
  - “Fits.”
  - “Context fits.”
  - “The record fits.”
  - “The evidence remains available.”
  - “Practice makes this view plausible.”
  - “Analyst review appears prudent.”
- If options differ too much in length, rewrite all four naturally. Never repair length by adding generic clauses.
- Wrong answers must be plausible misconceptions, not self-refuting cartoons.
- Avoid giveaway absolutes such as “never,” “always,” “only,” “impossible,” “must,” “cannot,” “completely,” “proves,” or “guarantees,” unless the statement is scientifically accurate and still genuinely tempting.
- The expert answer must not be the only careful, qualified, or technically specific option.
- Each option must sound like something a smart but partly informed player could select.

## Feedback rules

Across the 108 feedback messages:

- Unique feedback messages: **108/108**.
- Feedback must explain the specific error or strength of that option.
- Do not reuse four verdict templates across the pack.
- Feedback must name the missing distinction, mistaken mechanism, evidentiary limit, or unsafe decision.
- Feedback should teach something not already obvious from the option label.
- Do not use generic responses such as:
  - “This leaves important context unresolved.”
  - “That conclusion overreads the evidence.”
  - “This allows the failure to continue.”
  unless followed by a question-specific explanation.

## Profile rules

Each 250–330-word profile must have its own intellectual shape.

- Do not reuse a four-paragraph domain template across all nine profiles.
- Do not repeat the same general paragraph about records, uncertainty, institutions, safety barriers, or system thinking in every profile.
- Repeated 8-word runs across profiles within one pack: **0**, excluding unavoidable titles, proper names, and standard technical terms.
- No pair of profiles should be more than approximately 35% textually similar.
- Each profile must contain:
  - a distinct biographical or historical opening;
  - the pioneer’s actual contribution;
  - a distinct explanation of the mechanism or method;
  - a case-relevant discriminator;
  - a conclusion unique to that profile.
- The case connection may be educational, but the historical figure must remain the center of the profile.

## Witness and scene rules

The three witnesses must sound like different people with different jobs.

- Every `frame` must depict a different physical action, object, record, instrument, or observation.
- Near-duplicate frames: **0**.
- Every `STORIES` line must be a genuinely different scene, not the same sentence with witness, place, and document names replaced.
- Near-duplicate `STORIES` lines: **0**.
- Each witness should use a distinct vocabulary and rhythm appropriate to their role.
- The same quoted sentence structure may not be reused across that witness’s three places.
- A player meeting two informants in succession should immediately feel a change of voice and investigative method.

## WHAT coverage rule

The nine readings must collectively arm the WHAT judgment.

- Each WHAT option must have at least two discriminators taught by at least two different witnesses.
- Do not select nine figures merely by taking the first topic from each old pair.
- Choose the nine figures based on educational distinctness and discriminator coverage.
- Before finalizing, list which profiles:
  - support the truth;
  - reject the overclaim;
  - reject the dismissal.
- A player who consults any two witnesses must have enough information to decide the WHAT.

## Mandatory playtest simulation

Before claiming a pack is complete, simulate five days of play:

1. Choose five plausible witness/place combinations.
2. Read the five frames, profiles, questions, choices, and feedback in sequence.
3. Ask:
   - Did any two encounters feel like the same lesson?
   - Did the same question pattern recur?
   - Did the same wrong answer recur?
   - Did the same feedback recur?
   - Did witnesses sound interchangeable?
   - Was any option padded to match length?
4. Rewrite every repeated or interchangeable element.

A schema validator cannot replace this playtest.

## Mandatory automated scrutiny

Run and report all of the following:

- Topic count: **9**
- Question count: **27**
- Answer count: **108**
- Exact duplicate question stems: **0**
- Near-duplicate question stems: **0**
- Unique answer choices: **108/108**
- Unique feedback messages: **108/108**
- Repeated 8-word profile passages: **0**
- Near-duplicate profiles: **0**
- Near-duplicate frames: **0**
- Near-duplicate `STORIES` lines: **0**
- Flagged padding fragments: **0**
- Flagged absolute-word distractor tells: **0**
- Exactly one expert answer per question
- Expert-longest rate within the specification
- Maximum option-length spread within the specification
- Profiles 250–330 words
- JavaScript loads successfully

Semantic similarity must be checked in addition to literal string equality. Changing a name or two nouns does not make a sentence unique.

## Batch rule

For multi-pack batches:

- Complete and scrutinize one pack at a time.
- After every three packs, run a cross-pack duplication audit.
- At the end, audit the full batch for repeated question stems, feedback formulas, profile paragraphs, frames, scene structures, and padding fragments.
- Do not claim that the batch is polished merely because all files pass schema validation.
- If full scrutiny was not completed, state that plainly and do not label the files final.

## Completion gate

Do not say “done,” “validated,” “fully converted,” or “quality checked” unless every scrutiny requirement above passes.

A structurally valid but repetitive pack is a failed pack.
