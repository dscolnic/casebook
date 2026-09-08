# FIRST PERSON LEARNING

# MASTER CAMPAIGN DESIGN AND IMPLEMENTATION BRIEF

## Story-first cumulative AP campaigns for ChatGPT, Claude, and Claude Code

**Version 2.2.23 - stop-specific copy and visible derivation inputs, preserving prior requirements**

## Version 2.2.23 round-13 authoring and validation rules

The four stop labels do different jobs. The stop reason is one sentence explaining why this task is needed at this point in the story. The setup describes the actual situation and supplies its givens. The story-science connection names the particular quantity or conclusion and the decision it informs. The prompt requests the submission and its form and units without providing the worked route or reciting the answer. Never write reasons or connections from per-format templates. Check the reason beside the setup and the connection beside the reason, as they appear to the player.

Before replacing an old reason, preserve any input values it contains in the setup or displayed givens. Every canonical DERIVE rail must carry explicit `givens`; synchronize these with any earlier interaction representation. Input measurements, physical constants, unit conversions, and adopted values must appear before substitution. Computed intermediate values must show their calculation, not masquerade as new measurements. A symbolic derivation ending in a numerical result must show a numerical substitution. Keep exactly two equally complete choices per step, one correct and one specific common mistake. Do not paste a worked solution or answer-revealing chain into `givens` to satisfy a number checker.

Write standalone symbol glosses. Separate each symbol or multiword quantity label from its meaning with backticks, such as `nominal GDP` output valued at current prices. Name a constant before giving its value, such as `ε0` permittivity of free space (8.854e-12 F/m). Do not use “other symbols as above” or merely say that quantities are measured.

Calculation stops belong at a declared bench, instrument, or board; a character may introduce the task without becoming its calculation surface. Scheduled warm-ups need both a title and a story-specific `why` in the actual `warmups` block. Opening dialogue must avoid overloaded closing sentences.

For figures, `bars` uses `bars: [{name, value}]`; `line` and `peaks` use `series` with `points`. Keep one y-axis and reserve status colors for status. Validate authored figures rather than replacing useful plots with descriptions of their shapes.

Report three separate checks: (1) stop-copy roles, uniqueness, and non-repetition; (2) derivation givens, substitutions, and two-option structure; (3) symbols, placements, warm-ups, opening copy, and figure schemas. Name the files checked and distinguish source-file checks from an actual importer or engine run. Where available, run `engine/dev/deriveGivens.mjs` against the imported campaign. A local text check is not a substitute for that integration check. Do not chase stale findings when the supplied source already contains the correction.

## Version 2.2.22 round-12 build-completeness patch

A CHOICE stop is complete only when its canonical interaction block contains exactly four fully written options, exactly one keyed option, and one mechanism-specific rebuttal for each wrong option. A prose option list elsewhere in the stop does not replace the canonical payload. Validate the block the importer actually reads, and reject duplicate or conflicting answer keys.

Every operated format must contain the physical board the player manipulates. For VALUE, supply the budget, every selectable option, cost and decision-relevant information, the keyed selection, total, reserve, and pass rule. For SCIENCETANK, supply the pool, named categories, bounds and step sizes, keyed allocation, and total constraint. For SWEEP, supply the control values, every displayed reading at each value, acceptance limits, objective, and keyed setting. Apply the same completeness test to every other operated format; a declared format plus prose is not build data.

Every displayed equation is followed by a Symbols line in which each mathematical symbol is visually separable from its plain-language meaning. Do not generate Symbols by tokenizing the equation explanation, use placeholders such as `standard`, give letters without glosses, or cross-reference an earlier Symbols line. Define quantities and units on the card where the equation appears, even when the equation is being retrieved.

Site calculations and operated quantitative decisions on declared benches, boards, instruments, consoles, or other fixtures. A character may introduce or react to the task, but the interaction placement and call point to the operated object. Every authored warm-up record has a concrete player-facing title and a `why` that connects its movement to that day's evidence. Split an opening authority handoff from an overlong motivational quote when one sentence is carrying both jobs, while keeping the full opening at no more than five sentences.

Before handoff, validate figures against the keyed data as well as the renderer schema. A structurally valid chart that displays a different estimate, limit, category, or unit from the answer is a blocking defect.

## Version 2.2.21 player-prompt boundary patch

A **Question card prompt - exact player copy** contains only information the player needs before answering: the concrete evidence or givens, the intellectual task, the required output, units, and any genuinely necessary governing relationship. It must not contain the worked solution, keyed classification, correct sequence, final numerical result, distractor list, tolerance used only by grading, authoring notes, renderer schema, payload syntax, or instructions such as `Keep each choice complete`. Keep `lines`, `candidates`, `decoys`, `correct`, `correct_order`, `answerText`, and control payloads in their implementation fields.

Do not turn evidence into an answer key by labeling claims `backed`, `unbacked`, `critical`, or `exploratory` before asking the player to classify them. Present the registry entries, timestamps, measurements, or source records and let the player infer the status. Likewise, a sequence prompt states the evidence and ordering goal but does not recite the draggable cards in their keyed order. A derivation prompt may state a governing formula and ask the player to build or license lines, but it cannot print the completed substitutions or final line that the interaction is supposed to assess.

Before handoff, scan every required-stop prompt independently of its payload. Fail any prompt containing an answer label, completed worked chain, distractor commentary, schema fragment, or internal build instruction. Confirm that removing those items does not remove necessary givens, definitions, units, or the requested output.

## Version 2.2.20 introduction-before-use patch

No player-facing card may introduce a technical phrase, acronym, named rule, threshold, record, model, or formula as if the player already knows what it means or where it came from. At first use, expand every acronym and give the plain-language function of the term. Identify the source and meaning of every story-specific observation, such as “one patient's recorded recovery time is 34 days,” instead of dropping in “the 34-day record.”

Before asking for a calculation, explain what the calculated quantity represents and how it affects the immediate decision. A threshold formula must say what the threshold does, not merely print its algebra. Every displayed formula names its result on the left, defines every nonstandard symbol, gives units where they matter, and identifies the measured or recorded source of its numerical inputs. A familiar formula may be retrieved by name only after a prior required card has supplied that usable introduction.

Run a first-use audit in player order across the required campaign. Fail any unexplained acronym, undefined named technique, anonymous record or reading, unlabeled numerical input, or equation whose purpose and symbols are absent from both the current card and an earlier required introduction. Optional review content must remain self-contained and cannot serve as the missing prerequisite for a required stop.

## Version 2.2.19 round-11 interaction-integrity patch

Every DERIVE branch must be written at the same level of detail as its paired keyed branch. Use the same notation, named quantities, units, number of relevant terms, and amount of intermediate work. Never create a distractor by truncating the keyed line, giving only its final result, attaching explanatory prose to only the wrong line, or adding a wrong-only qualifier such as `under the same displayed conditions`. If a condition applies to both lines, print it on both or move it above the pair. Keep the explanation of the mistake in the candidate's feedback, not in the selectable line. Audit every campaign with a blind strategy that always chooses the shorter candidate; its success rate should remain near chance, normally 40% to 60%, and no repeated wording pattern may identify wrong branches.

Every question-card story setup contains exactly two sentences. Sentence one states the immediate story situation and identifies the displayed measurements, equations, objects, or evidence in ordinary language. Sentence two states what the player must do with them and why that result matters now. An instruction by itself is not a setup. Preserve the 30-to-45-word target by replacing generic process language rather than deleting the situation.

Every CHOICE interaction contains exactly four fully written options, exactly one keyed answer, and a specific rebuttal for each of the three wrong options. A generic `settings_only` or `overclaim` placeholder is not authored content. Every operated format includes the complete board payload that the renderer needs: controls, candidate values, readings, expected values, limits, mappings, and keyed state as required by that format. A format declaration, prose description, or generic range is not a payload.

Every post-mission metric screen contains a separate **Story event - exact player copy** line naming what happened in the world and caused the automatic metric change. Praise and the mission decision do not replace it. Automatic changes must name the campaign's real metric labels. Every warm-up record names a player-facing title and a `why`. Put calculations on a declared bench, board, instrument, console, or other operated fixture, never on a person stop.

When an optional review question tests a visible shape, shift, distribution, comparison, threshold, or ordering, include a renderer-ready **Figure - exact player copy** object inside that question. Use one y-axis only, label both axes with the question's quantities and units, and reserve status colors for status rather than data series.

A `bars` figure uses a `bars` array, never `series` or `points`: `{"kind":"bars","xLabel":"Day-30 outcome","yLabel":"Patients","caption":"Counts of improved and not-improved patients.","bars":[{"name":"Improved","value":68},{"name":"Not improved","value":32}]}`. Reserve `series` with `points` for `line` and `peaks` figures only. Do not disguise an interval, threshold comparison, or categorical display as another kind merely to reuse `series`. Validate every figure by `kind`, including figures in required stops and optional reviews.

A SEQUENCE prompt gives the evidence, the ordering goal, and the consequence of the order, but never lists its draggable cards in their keyed sequence. Author the complete card text and `correct_order` only in the interaction payload, and require `shuffle_on_open:true`. If a named mnemonic is instructional, introduce and expand it naturally on the player-facing setup card without turning the prompt into an answer key. Wrong-path feedback addresses the player's ordering error and how to reason on retry; it must never be an authoring instruction such as “require X” or “make the distractor do Y.”

## Version 2.2.18 mission-briefing accessibility patch

Treat each four-sentence mission briefing as the player's first plain-language view of that day's situation. Name the concrete thing being observed before using a compressed story label: write “graph of reservoir height,” “one measurement,” “set of possible asteroid paths,” or “grounding connection,” not an unexplained “trace,” “recorded point,” “cloud,” “profile,” or “bond.” A campaign-specific record, room, instrument, group, or nickname may appear only when its function is immediately clear from the same sentence. Define necessary academic vocabulary briefly in context, and replace internal production shorthand with what the player sees or does.

The briefing exists to motivate and orient, not to summarize the whole lesson. Keep it at exactly four sentences and 30 to 70 words: a concrete problem, one accessible conceptual bridge, the player's action, and the consequential mission decision. Prefer ordinary words when a technical label is not necessary. During revision, do not make a briefing longer merely to explain its shorthand; replace the shorthand or remove detail instead.

## Version 2.2.17 applied-review patch

GO DEEPER questions are not vocabulary-identification exercises. Do not use recurring stems such as “distinguish X from related ideas,” “which statement correctly applies X,” or “which description of X should guide the team.” Do not build an option set from four glossary definitions and ask the player to name the matching term.

Each review question must present a concrete follow-up situation with quantities, observations, a graph, experimental conditions, or a defensible decision. Ask the player to calculate, predict, interpret a figure, diagnose an error, choose a valid procedure, or determine which conclusion the evidence supports. Keep the connection to the campaign loose enough that the question transfers the course idea rather than asking what happened at a named stop.

Use the optional review first for relevant course topics that were introduced in the briefing but not required in the four main stops. Remaining questions may revisit a main-stop topic only through new evidence, different values, or a new application. Every distractor must be a plausible AP-course mistake for that specific problem, and every feedback line must explain that mistake rather than saying only that it describes another concept.

## Version 2.2.16 prerequisite-order patch

No required stop or optional GO DEEPER question may use a named rule, theorem, law, identity, equation, distribution, or operation before the player has received a usable introduction. The introduction must give the name, applicable conditions, relationship, symbols, and purpose when those are needed to perform the task. An unnamed equation does not introduce a name that a later prompt requires, and a printed advanced rule does not solve a missing prerequisite such as differentiation before L'Hopital's rule.

Maintain a mission-by-mission prerequisite ledger and rerun it after every stop swap or mission reorder. If moving a later stop forward would violate the dependency chain, choose an earlier-ready stop for the swap and place the dependent stop after its prerequisites. Report every sequencing violation found and repaired during the final handback.

## Version 2.2.15 stop-copy redundancy and payload-formula patch

The stop reason, question-card story setup, and story-science connection must do three different jobs. The stop reason explains why the task blocks progress now. The setup introduces the concrete situation, evidence, quantities, and requested action. The story-science connection explains how the academic reasoning changes the story decision. Do not copy the same sentence, clause, or lightly edited premise into two or three fields. In particular, never begin all three fields with the same sentence and then attach a generic format sentence.

Write each field directly. Do not use repeated format boilerplate such as “Calculate the requested estimate now,” “Using the stated inputs and units,” “Writing each transformation exposes mistakes,” or “the team needs this result before it acts” unless the sentence names the actual quantity, comparison, uncertainty, or decision in that stop. The three fields may refer to the same situation, but they must add different information rather than restating it.

The named-equation rule applies inside interaction payloads as well as prose. Every authored `formula`, calculation template, worked line, and displayed arithmetic expression must name its result on the left. Write `q=(1000)(3.8)(3.0)`, `V_trap=...`, or `p_total=960-520`, not `1000×3.8×3.0`, an unlabeled trapezoid sum, or `960-520`. A slot may contain a number by itself only when its visible label already names the quantity and the number is a selectable value rather than a displayed equation.

## Version 2.2.14 named-equation context patch

Whenever exact player copy presents a formula or expression, show it as a complete named relation with a left-hand side. Do not write “the model is (t^2-36)/(t-6),” “use (108-102)/102,” or “derive integral_0^2...” without naming what that expression equals. Write forms such as `H(t)=(t^2-36)/(t-6)`, `inflation=(108-102)/102`, and `V=integral_0^2 Q(t)dt`.

Before asking the player to manipulate a relation, explain in plain language what the left-side quantity represents, what the input variable represents, and the units when they matter. Never use a vague label such as “local model,” “signal,” “transform,” or “relationship” by itself. Say what the formula predicts, measures, converts, or totals. For example, `H(t)` can be the logger's predicted water height in centimetres at time `t` minutes, and `L=lim_(t->6)H(t)` can be the height that prediction approaches near minute 6.

For DERIVE, the story setup must introduce and explain the starting equation before the interaction. The prompt must repeat the complete starting relation, including its left-hand side, and state which left side remains visible through the derivation. The inline interaction block and canonical YAML must preserve that named relation and any active operator, such as a limit, integral, sum, probability, or vector operation, until the operator is legitimately evaluated.

## Version 2.2.13 DERIVE equation-continuity patch

Every DERIVE begins by naming the quantity being derived, such as `L = lim_(t->6) (t^2-36)/(t-6)`, and preserves an explicit left side throughout the chain. Every displayed choice must be a complete equation, inequality, approximation, or other relation. Never present a bare expression, operation command, or final number such as `t+6`, `multiply by the conjugate`, or `12 cm` and require the player to infer what it equals.

Use the same left-side symbol across algebraic transformation steps unless the reasoning explicitly defines a new quantity. Preserve governing notation that is still active, including `lim`, summation, integral, vector, probability, and unit notation. The final line must also name the result, for example `L = 12 cm`. If the intellectual choice is a method or verbal conclusion rather than an equation, give it an honest named left side such as `method = ...` or `conclusion = ...`; do not force prose after a numerical symbol in a way that creates a false equation.

The exact player prompt must state the starting relation and tell the player to preserve the named left side. The inline `Complete format-specific interaction block` and the canonical DERIVE YAML must use identical complete lines. DERIVE still has exactly two choices per step: one correct line and one plausible common-mistake line. During the final audit, reject every candidate that lacks an explicit relation or silently drops the quantity being derived.

## Version 2.2.12 multiple-choice figure patch

Whenever a multiple-choice question is easier or more faithful to the course when the player can inspect a chart, plot, curve, comparison, threshold, trace, estimate, or ordering, put a structured figure inside that question. This applies especially to optional **GO DEEPER** questions, but it also applies to required CHOICE and DIAGNOSIS stops. Do not replace the visual with prose such as “one graph can show,” “the curve is bowed,” or “the histogram is right-skewed.” Describing the shape makes the item a reading-memory test instead of a graph-reading question.

Place the figure immediately after the prompt and before the options:

**Figure - exact player copy:**

```json
{"kind":"line","xLabel":"Exchange service","yLabel":"Bank support","caption":"A bowed production possibilities curve.","series":[{"name":"PPC","points":[[0,100],[20,97],[40,90],[60,76],[80,52],[100,0]]}]}
```

Use `line` for a curve, time series, residual pattern, or shift; `bars` for a comparison or distribution; `peaks` for a separation or spectral trace; `scale` for an estimate against a reference value; and `timeline` for an ordering. A threshold figure may add `"limit":{"at":60,"label":"Action threshold"}`. Every figure has exactly one x-axis and one y-axis. Never add a second y-axis. Do not use status colors as series colors, and do not encode a pass or failure only through color. The plotted values, labels, caption, options, key, and feedback must describe the same authored case.

## Version 2.2.11 closing-card anti-template patch

Every happy ending card must be written from that mission's actual decision and immediate story consequence. Compliment the player's judgment in fresh, natural language, state what the player established or chose, and name who or what is safer, closer to success, or able to act because of it. Do not use one campaign-wide sentence fifteen times or swap only the subject and team name across campaigns.

The construction “Brilliant work! You used [subject] to save the day. The [team] recognizes how smartly you...” is prohibited, as are close variants that merely replace the adjective, subject, or group. The card does not need to name the school subject if the decision itself shows the learning. Across a campaign, every closing card must be textually distinct, and neighboring missions must use different praise openings and sentence structures.

## Version 2.2.10 review-quality and starting-metric patch

The six optional **GO DEEPER** questions must be AP-style transfer questions, not memory checks about the campaign script. Never ask which conclusion, answer, quotation, or record belonged to a named stop. Never use a stop title as the clue. Give the player a fresh but parallel story situation and ask them to calculate, interpret data or a graph, identify a mechanism, evaluate evidence, or choose the best model or policy. Keep the story connection loose enough that the academic reasoning remains clear. Questions may cover a concept used in the required mission or a relevant concept moved out of **Worth knowing first**.

Across each six-question set, vary the intellectual work when the subject permits it. Include a manageable calculation, data or graph interpretation, conceptual prediction, and evidence or model judgment rather than six definition-identification questions. Use new values and observations instead of copying the required stop's keyed answer. Distractors must be plausible same-topic mistakes, such as reversing a sign, confusing movement with a shift, using the wrong denominator, treating association as causation, ignoring units, or overgeneralizing evidence. Feedback must name the specific mistake.

All four campaign metrics begin at round multiples of ten. Prefer values such as 40%, 60%, or 70% instead of 42%, 61%, or 68%. Update the metric table, initial game state, first metric screen, canonical path, and every repeated starting snapshot together. The four values may differ when the story economy needs distinct strengths and weaknesses.

## Version 2.2.9 praise and optional-depth patch

Every dialogue box triggered by a correct answer begins with a brief, natural compliment such as “Nice work,” “Good thinking,” or “Exactly right.” The compliment comes before the scientific result or next instruction. The dialogue at mission completion begins with a visibly stronger compliment that recognizes the whole mission, such as “Outstanding work. You solved the mission.” Praise must be sincere and short; it must not replace the explanation, consequence, or next direction.

The required mission-opening **Worth knowing first** block contains only concepts, terms, and equations needed to complete that mission's four required stops. Do not front-load related course material merely because it belongs to the same unit. Move enrichment, edge cases, unused graph features, and broader variants into an optional secondary brief shown after mission completion.

Every mission ends with an optional **GO DEEPER** secondary brief containing exactly six objective, single-answer multiple-choice questions. Each question has four distinct and plausible options labeled A through D, exactly one defensible answer, a nonspoiling hint, and specific feedback for every option. Use the six questions first to cover concepts intentionally moved out of the required mission card; use remaining questions to retrieve or extend concepts the player already applied. Make the questions AP-style applications built around fresh calculations, data, graphs, evidence, mechanisms, models, or policies with a loose mission-story connection. Do not ask the player to match an answer to a stop title or recall which conclusion appeared earlier. A structured figure is required whenever inspecting a curve, shift, distribution, trend, comparison, threshold, trace, estimate, or ordering is part of the intellectual work. The optional review does not change metrics, Recovery Points, mission completion, or the next-mission unlock.

## Version 2.2.8 punctuation patch

Do not use em dashes anywhere in a campaign bible, including authoring guidance, headings, tables, metadata, dialogue, exact player copy, payload text, feedback, or implementation notes. Rewrite the sentence with a period, comma, colon, semicolon, parentheses, or ordinary words. A spaced hyphen may separate compact labels where appropriate, but it must not become a habitual substitute for sentence punctuation. Run a literal Unicode scan across the entire finished file and require zero em dash characters before handoff.

## Version 2.2.7 opening-charge patch

The final quotation on the campaign opening card must motivate the player for the whole campaign, not merely offer a short maxim about evidence, caution, or numbers. Give the mission authority one strong sentence that names the people, community, or place depending on the player; states the campaign-scale outcome they must secure; and charges them to act. The line should sound urgent and human when spoken aloud. Avoid vague aphorisms such as “A number is safe only when its consequences agree,” “Every claim must survive its evidence,” or “Count what the island can replace.” Preserve the maximum-five-sentence opening by using one sentence inside the quotation, and keep the quotation as the final words on the card.

## Version 2.2.6 stop-copy clarity patch

Keep pre-answer copy and post-grade explanation completely separate. A **Question card prompt - exact player copy** field contains only the task the player sees before submitting. Never append `answerText`, `Answer text`, a keyed result, grading syntax, or an authoring label to that prompt or to any other pre-answer field. Put the explanation shown after grading in its own standalone **Answer text** field.

Every stop reason must make sense without internal campaign shorthand. In 20 to 55 words, name the concrete evidence, hazard, decision, person, place, or piece of equipment that makes the task necessary now, then state what the player must establish before the mission can proceed. Do not rely on an undefined story object such as “the Rate Book,” use ceremonial language such as “Only backed claims may enter,” or substitute a generic line such as “The team needs this result before it acts.”

Every story-science connection must also be concrete and distinct from both the stop reason and the story setup. In 20 to 55 words, explain how this question's actual measurement, comparison, calculation, or classification resolves the immediate story uncertainty or controls the next decision. Name the relevant evidence or quantities. Avoid abstract narration such as “The first page must preserve what is known,” generic textbook definitions, and interchangeable claims that the task “connects the measured mechanism to the mission.”

## Version 2.2.5 clarity and mission-payoff patch

Every learner-facing acronym or abbreviation must be introduced on its first appearance in that mission as `full term (ABBREVIATION)`. A glossary entry such as `PPC: ...` is not enough; write `Production possibilities curve (PPC): ...`. Apply the same rule in the opening card, briefing, **Worth knowing first** primer, question cards, feedback, outcome, and review. Do not expose internal location or group codes as if the player already knows them. Standard one-letter mathematical variables may be defined in the adjacent symbols line, and chemical formulas may be introduced in a clearly labeled formulas line before the equation.

The opening card must end with the mission authority's quoted line. That quote must be a campaign-scale motivational charge naming who or what depends on the player, what outcome they must secure, and the action required - not a vague aphorism or compressed rule about evidence. Do not add an event, warning, reading, or other narrator sentence after the closing quotation. Put any immediate new event in Mission 1's briefing or first world beat instead.

Every mission must end with exactly one short, upbeat **Happy ending card - exact player copy** after the outcome and before the metric details. It must praise the player's judgment, name the specific decision or result just earned, and state the immediate benefit to the people, place, evidence, or system protected in that mission. Do not require the literal phrase “saved the day,” repeat one card throughout a campaign, or generate cross-campaign copies by swapping the subject and team name. Do not add another graded task.

## Version 2.2.4 decision-board and verification patch

Every interactive board must present a real decision that can be answered incorrectly. A board is not finished merely because it renders: unset windows, an already-correct opening control, candidates that all survive, allocations with nothing to choose, visible ledgers that already close, and panels that print their own target are nonfunctional interactions.

Author TRIGGER, STRESS, ALLOCATE, HOLDOUT, BALANCE, CLOUD, RESIDUAL, and DIAGNOSIS from the exact intellectual action each format represents. Use the detailed contracts in §15.1, then perform the three mandatory pre-handoff checks in §22.7: **Can this board be got wrong? Does its axis name a quantity and unit used by the question? Does it print its own answer?** These checks are required in addition to schema and importer validation.

Concept-number assignment is an authoring judgment, not a string-matching task. Select exactly one entry from the campaign's authoritative numbered course spine for every actual stop, preserve the stop's narrow concept wording, and verify the assignment against what the player must understand to answer - not merely the closest shared vocabulary.

## Version 2.2.3 subject-identity patch

The first opening card the player sees must explicitly name the campaign's main academic subject in player-facing copy - for example, **physics**, **chemistry**, **statistics**, **calculus**, **macroeconomics**, or **environmental science**. Do not rely on the game title, course metadata, menus, or later mission cards to communicate the subject. Work the subject naturally into the situation or the player's responsibility rather than displaying it as a detached catalog label.

## Version 2.2.2 build-integrity patch

Every structured board must be authored from that stop's own question and payload. Its axis names a quantity the question actually mentions, in the same units; its candidates and numbers come from that stop; and its player-facing panel states the goal without printing the target or keyed answer. Never fill missing §7 data with a format-wide sample board. Repeated numbers across unrelated campaigns are a warning that a template has replaced authored content.

DERIVE is a strict two-choice interaction in these campaigns. Every step presents exactly one correct line and one plausible common-mistake line, randomized left/right. The wrong line must be marked `survives: true` only after an author has confirmed that it requires genuine reading, and it must not be visibly shorter than the keyed line.

Every stop carries the number of its entry in the campaign's single numbered course-concept spine while retaining its narrow concept wording. Every area/group used by a person stop has a named roster owner, and every dialogue bubble has a named speaker rather than a role label such as “Mission lead.”

When the player must calculate without a supplied calculator or displayed intermediate result, use friendly integers or simple ratios and key the answer to an integer or at most one useful decimal place. Update the prompt, payload, prediction, measurement, tolerance, correct result, answer text, and later references together.

## Version 2.2 implementation delta

Every mission card now carries a player-facing **Worth knowing first** block immediately after the objective. It appears in this order: **Glossary terms**, **Primer concepts**, then **Equations first needed today**. Glossary entries use one compact line in the form `Term: definition`; do not split them into separate `Also called` and `Definition` lines. Equation entries keep only the equation, what it is for, every symbol needed to read it, and why the campaign needs it; do not add `Also called` or `Concept` lines.

These primers prepare the player for the lessons but do not excuse jargon in the briefing itself. The four-sentence briefing must still explain the immediate system problem in ordinary language before assuming a technical label. The mission outcome must still directly answer the decision promised in sentence four, and after Stop 1 each question setup must visibly build from the result just established.

Orientation must also serve the campaign. Do not use a pre-day or pre-mission task whose main purpose is to race through locations, greet a list of people, or tour the map. If orientation is needed, fold it into a real story action, evidence trail, equipment task, or Mission 1 investigation.

## Version 2.2.1 action-clarity patch

The player must never have to infer the interaction sequence from a format name, a slogan such as “predict, act, and measure,” or an implementation payload they cannot see. When a stop combines calculation, commitment, operation, measurement, and interpretation, the exact player-facing prompt must state those phases in order. If a calculation must be submitted before equipment unlocks, begin the prompt with **“First, calculate and commit...”** and name the quantity, units, visible inputs, and relationship the player should use.

Use the explicit sequence **CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET** whenever all four phases apply. Display each phase as a separate instruction or UI state. Do not unlock a later phase until the required earlier phase is complete, and do not make the player guess whether the expected response is a number, control setting, selected model, allocation, or written conclusion.

Every numerical question must expose all values required to reproduce the keyed answer. Every operated question must name the control the player changes, what remains fixed, what must be measured, and whether the control must be restored. Every slider or two-control question must tell the player to adjust the named controls and state whether they must submit a parameter pair, select a plan, or do both.

---

## How to use this document

Give this brief to the AI session that will design or implement a First Person Learning campaign. Also provide:

1. the existing campaign files, if any;
2. the subject reference material, standards, course outline, or cheat sheet;
3. `QUESTION_TYPES.md` or the current canonical interaction-format documentation;
4. the game engine schema, importer, and validation commands;
5. any existing world, theme, location, character, and fixture files that must be preserved.

Replace bracketed placeholders such as `[SUBJECT]`, `[WORLD]`, and `[CAMPAIGN GOAL]` with the project-specific information. Do not invent engine fields or question types when the repository already defines them.

When documents disagree about an interaction's required data, use this order of authority: the current importer/schema and its validation errors, then the canonical interaction-format documentation, then this brief. Record any deliberate campaign-specific deviation instead of silently ignoring a requirement.

This brief has two uses:

- **Architecture mode:** diagnose and redesign the campaign before touching implementation files.
- **Implementation mode:** convert the approved architecture into exact player-facing copy and valid game data.

If both are requested, complete architecture first. Do not start rewriting YAML, JavaScript, JSON, or scene files until the learning progression, story progression, clue ledger, locations, characters, and mission throughlines work together.

---

# 1. The assignment

You are designing or rebuilding a long-form educational adventure for **First Person Learning**. The game combines:

- an explorable first-person world;
- an urgent story with characters, conflict, setbacks, discoveries, and twists;
- cumulative review of `[SUBJECT]`;
- varied interactive challenges in which the student measures, calculates, tests, diagnoses, and decides;
- visible campaign resources that respond to both story events and player performance.

Your job is not merely to improve isolated questions. Your job is to make the academic progression and the dramatic progression into the same structure.

The finished campaign must pass both tests:

> If the academic challenges were removed, the story would stop making sense because the player's growing knowledge is what reveals the truth and makes action possible.

> If the story were removed, the student would still complete a deliberately sequenced, spaced, cumulative course review in which foundational concepts become tools for later concepts.

The ideal player experience is not:

> Unit 1, then Unit 2, then Unit 3.

It is:

> Something important is going wrong. I need to understand the system well enough to find out why, decide what to do, and live with the consequences.

---

# 2. Non-negotiable design principles

## 2.1 The story creates the need for the science

Do not stop the story to administer unrelated school questions.

Weak:

> Before you can open the door, identify the molecular geometry of ammonia.

Strong:

> The crew needs to know which vapor could have crossed a damaged separator. The player uses molecular geometry, polarity, and intermolecular forces to determine which route is physically possible.

Correct scientific reasoning should change at least one of the following:

- what the player believes;
- which explanation remains possible;
- what the crew is willing to risk;
- what equipment can be operated;
- which location opens next;
- what evidence should be collected;
- what resource should be spent;
- whether the final action is authorized.

## 2.2 Concepts build; they do not merely appear

Organize important concepts through a progression such as:

> prerequisite -> introduce -> practice -> retrieve -> combine -> transfer

A keystone concept should usually recur three to five meaningful times. Later encounters should require a more mature intellectual action, not merely longer arithmetic.

Example:

> identify a force -> draw it -> measure its effect -> diagnose a system from several forces -> choose an action under force and safety constraints

## 2.3 Scientific knowledge creates fair twists

Use the pattern:

> PLANT -> REINFORCE -> REINTERPRET -> PAY OFF

An early observation should be objectively true. Characters attach a reasonable but incomplete meaning to it. Later knowledge allows the player to reinterpret the same evidence. A good twist does not change the facts; it changes what those facts support.

## 2.4 Correct answers can produce bad news

Avoid a constant rhythm of:

> correct -> celebration -> reward -> next question

Sometimes scientific success should make the situation harder:

> Correct. The raw material is sufficient. Therefore the shortage must be somewhere else.

> Correct. The engineer did change the controls. That proves the action, not the motive.

> Correct. The tank is full. The independent assay shows that some of what fills it is unsafe contamination.

## 2.5 The stakes must be concrete and understandable

Do not rely on vague urgency, unexplained technical nouns, arbitrary prices, or a character saying “this is critical.” A player should be able to explain the stakes in plain language after reading the opening once.

Weak:

> The calibration anomaly threatens mission parameters.

Strong:

> If the reading is wrong, the crew may launch with too little usable fuel and lose the engine before reaching safety.

For every mission, answer:

1. What is wrong now?
2. Why does it matter to people?
3. What must the player find out or accomplish?
4. What decision will become possible at the end?

---

# 3. Design the learning spine first

## 3.1 Build a dependency graph

Before detailed story writing, identify the required concepts and their prerequisites. Do not blindly follow textbook order, but do not ask students to use an idea before its necessary foundations.

For each concept, record:

- prerequisite concepts;
- observable or calculation it enables;
- later concepts it unlocks;
- possible real-world equipment or decision connected to it;
- likely misconceptions.

## 3.2 Select keystone concepts

For a substantial campaign, select approximately 10 to 15 keystone concepts. A keystone concept:

- is important in the course;
- unlocks several later ideas;
- can naturally recur in the story;
- can mature from recognition to decision.

Minor facts may appear once or twice. Keystone concepts should recur approximately three to five times in different roles.

A keystone does not count as recurring merely because several adjacent stops use it in one mission block. Every keystone must:

- be explicitly tagged at every stop where it materially contributes, even when the stop's narrower concept label is different;
- appear in at least three separated missions unless the approved architecture documents a reason for fewer;
- have at least one delayed **RETRIEVE** encounter after an intervening mission;
- contribute to at least one later **COMBINE** or **TRANSFER** decision;
- be named in the mechanism explanation when it does real work.

## 3.3 Assign a learning role to every graded stop

Use exactly one primary learning role:

- **INTRODUCE:** first focused encounter with the concept;
- **PRACTICE:** apply essentially the same idea in a new example;
- **RETRIEVE:** bring back the concept after meaningful time has passed;
- **COMBINE:** use it with one or more previously learned concepts;
- **TRANSFER:** recognize and use it in a situation where the applicable concept is not announced.

Do not claim that a concept has been covered five times if all five encounters are introductory recognition questions.

`RETRIEVE` is not a decorative label. A retrieval stop must require knowledge learned earlier, after enough separation that the player must bring it back. Do not spend all retrieval labels on minor facts while core keystones appear only once.

## 3.4 Assign a difficulty level to every graded stop

- **L1 - Recognize:** identify, classify, or recall.
- **L2 - Perform:** carry out a familiar procedure or calculation.
- **L3 - Apply:** determine which known method fits a contextual problem.
- **L4 - Synthesize:** use several observations or concepts to identify an explanation.
- **L5 - Decide:** choose among competing actions under constraints, uncertainty, or limited resources.

The campaign should generally move from L1/L2 early, through L2/L3/L4 in the middle, to L3/L4/L5 late. Later difficulty should come from deciding and combining, not from making numbers uglier.

## 3.5 Build a concept-encounter matrix

Before full question writing, create a matrix such as:

| Concept | Introduce | Practice | Retrieve | Combine | Transfer/payoff |
|---|---|---|---|---|---|
| `[Concept A]` | M1 | M2 | M5 | M8 | M15 |
| `[Concept B]` | M3 | M3 | M7 | M11 | M14-M15 |

Use the matrix to confirm that keystone ideas recur, deepen, and return after delays.

Maintain both a narrow `concept` label and a broader `keystone` label. For example, a late stop about rate versus equilibrium may also retrieve gases if the player must reason from partial pressure. Tag and explain both; do not let the underlying keystone remain invisible because the immediate question has a different title.

Maintain one authoritative numbered course-concept spine for the whole campaign. Every graded stop must store exactly one matching spine number beside its existing narrow concept wording, for example `Concept: 12 - logistic growth`. Do not renumber concepts separately by mission, infer numbers during import, or replace the stop's precise wording with the broader spine label. If no external concept file is supplied, derive the numbered spine from the campaign's own course outline, dependency graph, and recurring-concept section before assigning stop numbers.

Choose each number by reading what the stop actually teaches and requires the player to do. Automated similarity rankings may suggest candidates, but the top lexical match is not authoritative: shared words can connect a stop to the wrong course idea. Validate that every stop header has one number, every number falls within the course spine's range, and the count of assignments equals the count of actual stop headers rather than a copied summary total.

## 3.6 Build a glossary dependency check

Every player-facing technical term must either be ordinary language, defined before first use, or linked to a definition the player can open. Definitions must not depend on another undefined term.

Spell out every acronym or abbreviation before its first use within each mission, using `full term (ABBREVIATION)`. Treat each mission card as independently readable: an expansion several missions earlier does not excuse an undefined first use today. During review, inspect every **Worth knowing first** block for unexplained capital-letter tokens and replace internal room/group codes with their player-facing names. Do not mistake equation variables for acronyms; define mathematical symbols in the adjacent symbols line and introduce chemical formulas in a formulas line before use.

Audit the glossary as a dependency graph. If a definition of intermolecular forces uses “boiling,” then boiling or boiling point must already be defined in plain language. The same rule applies to every subject: defining one piece of jargon with a second unexplained piece of jargon is not a definition.

Player-facing glossary entries use one compact line:

> `Particle: one counted piece of matter. In this mission, a particle may be an atom, a molecule, or an ion.`

Do not format one term as a three-line block with a bold title, `Also called`, and `Definition`. Do not expose alias lists merely because an internal search or parser may use them. If aliases are needed by the engine, keep them as hidden implementation metadata rather than player-facing copy.

The authored definition should be complete enough to lift directly into the game. Do not rely on the implementation layer to expand a shorthand definition into a longer explanation.

## 3.7 Build the mission-card primer

Every mission must author a player-facing **Worth knowing first** block immediately after the mission objective and before the player begins the lessons. The block contains only material the player needs to understand that day's four required stops. If a term, graph feature, special case, or equation is not needed to answer one of those stops, move it to the optional post-mission secondary brief.

Use this order:

1. **Glossary terms** - compact one-line `Term: definition` entries.
2. **Primer concepts** - a few short bullets stating the ideas the player should have in mind before the first stop.
3. **Equations first needed today** - only equations newly needed or first made operational that day.

For each equation, use:

```text
Equation: [equation]
What it is for: [plain-language job]
Symbols: [define every symbol needed to read the equation]
Why this campaign needs it: [specific story/decision reason]
```

Do not add `Also called` or `Concept` lines to equation entries. If the mission introduces no new numerical equation, say so in one plain sentence and point the player to the already-recorded relationships being retrieved.

Primer concepts are not a mini-lecture. Prefer one to three short bullets that make the upcoming tasks intelligible. They may remind the player of an earlier idea, but the real retrieval still has to happen inside a graded stop. Audit each glossary entry, primer bullet, and equation against a named required stop before keeping it on the mission-opening card.

The primer does not replace plain-language briefing copy. A technical term that appears in the card body before the player reaches its definition must still be explained in ordinary language in that body.

---

# 4. Design the dramatic spine

For an approximately 15-mission campaign, use a shape like this:

- **Missions 1-3:** establish the main problem and a plausible first explanation.
- **Missions 4-6:** gather contradictions and reach Twist 1.
- **Missions 7-10:** deepen the technical and human conflict and reach Twist 2.
- **Missions 11-13:** reveal coupled systems and require concepts to work together.
- **Mission 14:** apparent victory followed by Twist 3 or the final complication.
- **Mission 15:** integrated decision, execution, and story payoff.

Aim for:

- three major twists;
- three to five smaller reversals, setbacks, discoveries, or changed constraints;
- a meaningful change every two to three missions;
- an apparent victory before the final complication;
- no major new academic concept in the finale.

Use different kinds of twists:

- wrong physical explanation;
- correct observation, wrong meaning;
- apparent villain reversal;
- hidden second problem;
- solution creates another problem;
- two mysteries connect;
- the objective changes;
- a model fails on unseen evidence;
- a success metric proves to be the wrong definition of success.

For each mission, state three movements:

**SCIENCE**

What can the student now understand or do that they could not before?

**MYSTERY**

What does the player now believe that they did not believe before?

**STAKES**

Why is the situation more urgent, dangerous, constrained, or consequential?

A mission is structurally weak if all three remain unchanged.

---

# 5. The clue ledger

Maintain a clue ledger for every important observation.

| Field | Required content |
|---|---|
| Mission planted | Where the player first encounters it |
| Objective observation | What is physically or historically true |
| Initial interpretation | What the player or characters first think it means |
| True meaning | What it actually supports |
| Concept needed | What later knowledge enables reinterpretation |
| Reinforcement | Where the initial theory gains credibility |
| Payoff mission | Where the clue changes the case |

Every major twist needs multiple earlier clues. Do not introduce decisive information at the reveal with no prior setup.

A clue does not need to be immediately followed by a question. Sometimes let the player see an object, reading, residue, timestamp, argument, or environmental change and move on. Bringing it back later creates mystery and prevents every visible detail from advertising the next answer.

---

# 6. Campaign opening: exact player-facing rules

## 6.1 Opening sequence

The opening is a single short text card, not a four-click dialogue sequence.

Requirements:

- maximum five sentences;
- show all sentences together;
- place it over the normal playable starting location;
- one Continue action dismisses the whole card;
- state where the player is, what must be accomplished, what deadline exists, and what happens if the crew fails;
- explicitly name the campaign's main academic subject in ordinary player-facing language;
- introduce the mission authority through an action or one memorable line;
- end the card on the mission authority's quoted line, with no narration after the closing quotation;
- do not front-load unexplained course jargon;
- do not separately announce a percentage already shown by the campaign bars.

When the card clears:

1. reveal the four-bar campaign HUD at its starting values;
2. activate the Mission 1 briefing icon;
3. keep the player in the normal playable view.

Generic template:

> `[WORLD]` is already trying to accomplish `[CAMPAIGN GOAL]`. Your knowledge of `[MAIN SUBJECT - for example, physics or chemistry]` is needed to `[PLAIN-LANGUAGE SYSTEM JOB]`. `[DEADLINE]`, and failure means `[HUMAN CONSEQUENCE]`. `[MISSION AUTHORITY]` gives the player responsibility and says, "[SHORT LINE THAT DEFINES THE STANDARD]."`

## 6.2 Opening quality check

After reading only the opening and seeing the four bars, a new player must be able to answer:

- Where am I?
- What are we trying to do?
- How long do we have?
- What happens if we fail?
- What am I responsible for?
- What main subject will I use in this campaign?

If any answer requires later exposition, rewrite the opening.

---

# 7. Four campaign metrics, timer, and recovery economy

## 7.1 Select four bars that together define victory

Use exactly four player-facing campaign bars. They should represent four different kinds of constraint:

1. **Primary objective readiness** - the main thing the campaign is trying to produce, repair, locate, or prove.
2. **Secondary requirement** - a second necessary condition without which the primary objective is useless.
3. **Operational reserve** - power, time, supplies, access, personnel capacity, or another spendable capability.
4. **System integrity** - safety, stability, public trust, habitat condition, containment, structural health, or another failure boundary.

Example only:

| Bar | Meaning |
|---|---|
| Flight-Ready Methane | Usable methane that counts toward launch |
| Ascent Oxygen | Stored oxygen required for ascent |
| Power Reserve | Electrical margin above protected loads |
| Plant Integrity | Thermal and mechanical safety margin |

Create subject-appropriate names for other campaigns. Do not keep Mars-specific bars when the story is about epidemiology, ecology, physics, engineering, or another setting.

## 7.2 Metric behavior

- Every bar is bounded from 0% to 100%.
- Victory requires all four bars at 100%, plus any explicit final scientific threshold.
- If any bar reaches 0%, the game ends and restores the mission-start snapshot or uses the engine's approved recovery behavior.
- Some bars may reach 100% early and then remain vulnerable.
- Some may become permanently locked at 100% only after an in-story verification or repair.
- Some must be raised by player allocation rather than story events alone.
- A bar may fall only because of a named, visible story event.
- Never lower a bar as an unexplained punishment for narrative drama.

Examples of justified decreases:

- a dust storm cuts solar power;
- a containment breach lowers system integrity;
- a test consumes the last sterile samples;
- an independent assay decertifies material previously counted as ready;
- another work shift passes while production is stopped.

## 7.3 Mission timer

Every mission has:

- a visible elapsed timer;
- an authored target time;
- a clear start event, normally when the arrival beat closes and Stop 1 becomes active;
- defined pause states for required dialogue, loading, accessibility menus, app backgrounding, and system interruptions.

The timer should not run while the player is trapped in required noninteractive text.

## 7.4 Recovery Points

After each mission, award points based on speed and accuracy. A useful default is:

`RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`

Recommended time modifier:

- `+1` at or before target;
- `0` after target through 125% of target;
- `-2` beyond 125% of target.

One committed incorrect answer costs one point. Exploratory actions before Commit do not.

One Recovery Point raises one unlocked bar by one percentage point. The player may spend immediately or save points in a capped Recovery Bank.

## 7.5 Required order after each mission

1. deliver the non-quiz outcome beat;
2. show exactly one mission-specific happy ending card praising the player's judgment, naming the decision just earned, and stating its concrete benefit;
3. apply named automatic story-event changes to the bars;
4. check whether any bar has reached 0%;
5. show time and incorrect-submission results;
6. calculate and award Recovery Points;
7. allow allocation among unlocked bars or the Recovery Bank;
8. apply any earned 100% lock;
9. show the quick concept review;
10. activate the next briefing.

## 7.6 Post-mission metric screen - exact fields

Every mission specification must include exact player-facing copy for:

```text
Header: MISSION [N] COMPLETE
Happy ending card: [fresh praise + the actual mission decision or result + the concrete benefit to the story]
Timer line: TIME {elapsed} / TARGET [MM:SS]
Accuracy line: INCORRECT SUBMISSIONS {incorrect_submissions}
Story event: [plain-language event that caused automatic changes]
Automatic bar change: [BAR A +/-N | BAR B +/-N | BAR C +/-N | BAR D +/-N]
Recovery Point line: [formula and awarded value]
Allocation prompt: [what one point does and whether banking is allowed]
Canonical QA example: [expected bars and bank on the reference path]
Lock result: [if applicable]
Failure check: [if applicable]
```

The metric economy is part of the story. A calculation can discover a solution while the mission event still consumes time, power, supplies, or safety margin.

---

# 8. Location progression and travel

Use a controlled escalation in spatial complexity:

| Campaign phase | Places per mission | Rule |
|---|---:|---|
| Missions 1-4 | 1 | Local investigation; no distant travel |
| Missions 5-10 | 2 | Evidence at the first place creates the need to visit the second |
| Missions 11-15 | 3 | The player crosses connected subsystems and synthesizes evidence |

Do not begin using far-away or visually remote locations until after Mission 4.

Locations are not sightseeing stops. Every move must be caused by evidence, a testable prediction, a sample transfer, a required operation, or a decision that can only be made at the destination.

For each mission, specify:

- starting location;
- exact player-facing “Go now” destination;
- which stop occurs at each fixture;
- the evidence or result that unlocks later travel;
- the waypoint text;
- why this move could not be replaced by staying in the previous room.

Early missions should teach the local environment. Middle missions should connect two departments or viewpoints. Late missions should make the world itself function like a walkable system diagram.

Do not use a provided location list merely to showcase every place. Use only locations that perform a story and learning function.

## 8.1 No filler orientation games

Do not put a throwaway game before the real missions whose goal is mainly to visit many places quickly, greet a roster of characters, collect names, or prove that the player can walk around the map. Those tasks consume attention before the story has created a reason to care.

If the player must learn movement, interaction, or the layout, attach that learning to a meaningful action: deliver a sample, inspect a warning, follow a molecule or signal, meet the authority who stops a risky action, or operate the first real fixture. Prefer folding orientation into Mission 1 rather than creating a separate sightseeing trial.

A pre-campaign or pre-day activity is justified only if its result changes knowledge, state, access, evidence, resources, or the next action.

---

# 9. Character design and gameplay use

## 9.1 Introduce competence before biography

The first time a character appears, show that person doing a job under pressure. Do not pause for a biography.

Examples:

- a commander cancels a risky action;
- an engineer scrapes frost from an intake window;
- an analyst carries an independent standard rather than trusting the wall display;
- a safety lead asks for raw timestamps while everyone else argues.

The player should understand what the character values before learning personal history.

## 9.2 Give every major character a gameplay function

For each major character, define:

- **Role:** their responsibility in the world;
- **Wants:** what outcome they push for;
- **Blind spot:** the reasonable mistake their expertise makes tempting;
- **Scientific domain:** the concepts and equipment they naturally introduce;
- **Decision function:** the kinds of choices they can credibly ask of the player;
- **Verbal habit:** a recurring question or way of framing evidence;
- **Arc:** what evidence changes their behavior;
- **Relationship state:** how greetings and optional dialogue change after major revelations.

Characters should represent competing legitimate constraints, not “smart” and “stupid” sides.

Example functions:

- mission authority: frames stakes, receives diagnoses, commits final action;
- production lead: pushes speed and throughput;
- safety engineer: protects operating limits and asks what changed first;
- process specialist: asks what material can physically move where;
- analytical lead: asks which standard or independent measurement supports a claim;
- resource officer: asks what stops working if a proposal is funded.

## 9.3 Characters are not quiz dispensers

A named character should not exist only to ask one school question. A character should do at least one of these:

- provide evidence from their specialty;
- propose a tempting but incomplete action;
- disagree about the meaning of real evidence;
- authorize or block equipment use;
- reveal a consequence;
- change their mind because of the player's result;
- own part of the final integrated plan.

Characters may be wrong about explanations, but they should not be casually wrong about basic facts inside their specialty without a stated reason such as bad data, pressure, hidden information, or a known blind spot.

## 9.4 Dialogue rules

- Keep ordinary beats to no more than two short dialogue bubbles.
- Begin every correct-answer dialogue box with a quick, natural compliment before stating the result or next step.
- Begin the mission-completion dialogue with a larger compliment that recognizes the player's success across the whole mission before giving the outcome hook.
- Keep praise brief and varied enough to sound spoken; praise never replaces scientific feedback, story consequence, or direction.
- On a character's first mention in every mission, give the character's name and working role, such as “Ingrid Sundqvist, production and catalyst lead.” Do not assume the player remembers a surname from an earlier mission.
- Do not let one character speak more than roughly 90 words without player movement, inspection, or response.
- Wrong-answer dialogue should explain the failed mechanism, not ridicule the player.
- After evidence changes a relationship, change later greetings and optional dialogue.
- In the finale, each major character should contribute one constraint, not deliver six speeches.
- The player should be the only person whose role spans all constraints.
- Keep system-owned closing cards impersonal. Put named character reactions in the dialogue bubble, radio call, or world beat immediately before the closing card unless the engine explicitly supports names there.

Minor voices can provide observations or consequences, but not new subplots or isolated school questions.

## 9.5 Character identity validation

Maintain one canonical roster containing each character's display name, role, pronouns, and allowed short name. Validate briefing destinations, dialogue, stop reasons, theme data, and implementation files against it. A renamed, misspelled, or wrong-gendered character is a hard content error, not harmless flavor variation.

Every area or group referenced by a person stop must have at least one named character assigned to it in the canonical roster. A role description that merely sounds related is not a substitute for an explicit group assignment. Every dialogue bubble must identify its speaker by canonical name; labels such as `Mission lead:`, `Arrival bubble:`, `Engineer:`, or another unnamed role make the beat unreachable or unattributable.

---

# 10. Non-cinematic story delivery

Do not require movies, pre-rendered cinematics, voice acting, forced camera movement, or bespoke character animation to carry essential information.

Deliver story through:

- nearby character dialogue bubbles;
- radio bubbles for characters elsewhere;
- equipment-panel updates;
- persistent world-state changes;
- waypoint notifications;
- short system banners for one conclusion, warning, or destination;
- objects, samples, lights, labels, barriers, logs, and instrument states that remain visible.

Sound, lighting, particles, lip sync, and object animation may reinforce a beat, but the player must still understand everything important without them.

## 10.1 Standard beat structure

Each mission should normally include:

1. **Arrival beat:** automatically plays when the player enters the briefing destination.
2. **Stop response beat:** after one or two stops, shows what the result changed.
3. **After-stop travel beat:** fires after the named stop, then names the next destination and explains why the evidence requires the move.
4. **Final-stop beat:** converts the last answer into the mission decision.
5. **Outcome and hook:** gives 45 to 90 seconds of non-quiz play, dialogue, or world change before the metric screen.

Late missions may add a second travel/result beat because they use three locations.

Every beat heading and trigger must use one of three engine-legible forms: **On arrival at [place]**, **After Stop [number]** or **After Stops [numbers]**, or **At mission end**. Do not invent trigger labels such as `Travel trigger`, `Epilogue`, or `Before and after`; express travel and payoff as the result of one of the allowed triggers.

Give every beat a unique stable ID. Duplicate beat IDs can make one authored reaction overwrite or hide another even when both pieces of prose are correct.

## 10.2 Beat implementation fields

For every beat, provide:

```yaml
beat:
  trigger:
  location:
  presentation: nearby_character_bubble | radio_bubble | equipment_panel_update | persistent_world_change | waypoint_notification | system_banner
  player_control:
  world_state:
  dialogue_bubbles:
  panel_or_hud_text:
  unlocks:
```

Required dialogue may pause local interaction, but the player advances it with one Continue control and regains control immediately afterward. Do not leave essential bubbles on an active mission timer.

Copy important completed dialogue, conclusions, and destinations into a mission log or casebook so the player can review them later.

---

# 11. Mission briefing card - exact player-facing contract

The mission briefing is not designer commentary. It is the first thing the player reads before traveling. It must explain enough for the mission to make sense before the lesson begins.

Every briefing must include exact player-facing copy for:

```text
Header: [deadline or campaign status]
Card title: [short mission title]
Go now: Go to [PLACE] and meet [CHARACTER] at [FIXTURE].
Card body: [exact four-sentence briefing, 30-70 words total]
Objective: [one plain-language action/result]

Worth knowing first:
  Glossary terms: [compact one-line Term: definition entries]
  Primer concepts: [short bullets]
  Equations first needed today:
    Equation: [equation]
    What it is for: [plain-language job]
    Symbols: [every symbol]
    Why this campaign needs it: [story-specific reason]
```

The `Worth knowing first` material belongs to the mission card/mission log experience, not to designer notes. Do not add player-facing `Also called`, `Definition`, or equation `Concept` sublines. If there is no new equation that day, use one short sentence saying that the mission retrieves equations already recorded in the mission log.

Also maintain these authoring fields:

```text
Failure consequence: [concrete consequence that must already be visible in the card body or another required briefing field]
Later travel: [locations that may unlock and the causal reason; authoring-only unless the route is intentionally previewed]
```

Do not print a redundant “Failure means” line when the card body already states the consequence. Do not print “Later travel: none.” These fields help the writer test the mission; they are not automatic UI requirements.

## 11.1 Four-sentence card-body structure

Use this structure within 30 to 70 words unless the engine imposes a tighter limit:

1. **Connection:** state what the previous mission established and what problem remains now.
2. **Plain-language system explanation:** explain any new process, device, reaction, model, or term before using its technical label as the mission's assumed knowledge.
3. **Player work:** state what the player will test, calculate, compare, trace, or operate during this mission.
4. **Promised result:** begin with “By the end of the mission” and name the decision or conclusion the outcome will answer.

Treat sentence four as a contract. The first sentence of the mission outcome must answer that same decision directly; do not let the outcome solve a different problem, broaden the question after the fact, or substitute a narrator reveal for the player's final result.

Example pattern:

> The last mission showed `[PRIOR RESULT]`, but `[CURRENT PROBLEM]`. `[NEW SYSTEM OR CONCEPT]` means `[PLAIN-LANGUAGE EXPLANATION]`. At `[LOCATION]`, `[PLAYER ACTIONS]`. By the end of the mission, decide `[EXACT DECISION].`

## 11.2 Briefing clarity test

Do not write:

> Sundqvist blames thin Martian air.

unless the sentence states what she blames it for.

Do not write:

> The Sabatier equation becomes a production tool.

before explaining that the Sabatier reaction combines carbon dioxide and hydrogen to make methane and water.

Do not write:

> The answer is bad news.

without stating the question, the mission goal, and why that answer changes action.

A player reading only the briefing should know:

- where to go first;
- who or what is waiting there;
- what has already been learned;
- what is still uncertain;
- what they will do during the mission;
- what decision the mission must produce;
- what failure would cost.

---

# 12. Question cards must bridge briefing and outcome

Every graded stop needs player-facing story copy, not only a technical prompt.

Required fields:

```text
Stop reason - exact player copy: [20-55 concrete words explaining why this task is needed now]
Question card story setup - exact player copy: [two short sentences, 30-45 words total]
Question card story-science connection - exact player copy: [20-55 concrete words explaining how this result changes the story decision]
Question card prompt - exact player copy: [the actual task]
```

## 12.1 Stop-reason rule

The stop reason answers “Why are we doing this today, in this emergency, at this fixture?” It is not a learning objective such as “Practice molarity.” Write 20 to 55 words in one or two short sentences and display them in the call, dialogue, fixture, or short lead-in immediately before the question card.

The line must stand on its own for a player who has not memorized campaign lore. Name the evidence, hazard, decision, person, place, or equipment that creates the immediate need, and say what the player must establish next. If a story object matters, identify its ordinary function instead of assuming its name explains the stakes. Avoid ceremonial commands, metaphors about what may “enter” a book or board, and generic urgency that could be pasted into another stop.

If a named character is first mentioned in the mission here, include the character's role. A good reason can also carry the immediate consequence:

> Ingrid Sundqvist, production and catalyst lead, needs this upper-limit calculation before she risks another compressor cycle.

## 12.2 Story setup rule

The story setup is exactly two short sentences totaling 30 to 45 words. The first grounds the current evidence or situation. The second states why this specific task is the next necessary step toward the decision promised by the briefing.

- Stop 1 begins the mission's investigation.
- Stop 2 uses the result of Stop 1.
- Stop 3 uses what the player has now established and may cause travel.
- Stop 4 combines or verifies the chain and produces the mission decision.

Avoid four independent questions that merely share a topic.

Weak sequence:

1. Calculate concentration.
2. Identify a wavelength.
3. Trace a sensor.
4. Choose an explanation.

Strong sequence:

1. Calculate the sample concentration to establish the expected signal.
2. Choose the wavelength that can measure that concentration reliably.
3. Trace the surprising agreement among instruments to discover that they share one calibration.
4. Compare the independent sample with the shared channels and decide whether the alarm is physical or a calibration error.

## 12.3 Story-science connection rule

The connection says how the scientific result changes the narrative decision. Write 20 to 55 words in one or two short sentences. Name the question's actual measurement, quantities, comparison, or classification and the immediate uncertainty or choice it resolves. It must add information rather than repeat the setup, stop reason, or a textbook definition.

Do not describe an abstract virtue such as preserving knowledge, honoring evidence, or protecting a plan. Do not use interchangeable claims that the task “connects the mechanism to the mission.” State the operational consequence: what this result will confirm, rule out, distinguish, permit, block, or change in the next decision.

Examples:

> If the available feed can already meet the target, overdriving the intake wastes time and may damage the compressor.

> A controlled reversal can prove that the setting changed the rate while leaving the operator's motive unresolved.

> Pressure and total mass cannot certify composition, so an independent assay controls GO or NO-GO.

## 12.4 Player-action and calculation-order rule

The exact prompt must describe what the player physically and intellectually does in the order the interface requires it. A format label is not an instruction.

When a stop requires a calculation before an experiment, use:

1. **CALCULATE AND COMMIT:** show every required input with units, show or name the governing relationship, name the requested quantity and units, and require submission before equipment unlocks.
2. **OPERATE:** name the exact control or action and the target setting.
3. **MEASURE:** name every reading the player must collect.
4. **INTERPRET:** name the comparison or decision the player must make from the prediction and measurements.

The player-facing prompt may be split across staged cards or instructions, but the complete authored copy must exist in the bible. Do not use “Predict, act, and measure,” “Apply the constraints,” “Build a plan,” or “Estimate the result” as the only instruction when the payload expects several distinct actions.

For every numerical stop, verify that the player-visible card contains:

- every numerical input;
- every required unit and conversion constant;
- the equation or previously recorded relationship the player should use;
- the quantity and unit the player must submit;
- the tolerance or grading rule in implementation data;
- worked arithmetic in the post-answer explanation.

If the player performs the arithmetic without a supplied calculator or displayed intermediate value, choose inputs that are friendly integers or simple ratios. Prefer mental products and quotients and a result that is an integer or has at most one useful decimal place. Complexity should come from choosing the relationship and interpreting the result, not from avoidable arithmetic. More realistic precision is appropriate only when the interface supplies the calculator or intermediate result and the learning target is interpretation. Whenever inputs change, update every dependent prompt, board field, prediction, revealed measurement, tolerance, correct result, answer text, feedback line, and later reference as one atomic edit.

For every CONTROL or VERIFY stop, state what changes, what stays fixed, when the player commits a prediction, what is measured, whether restoration is required, and what conclusion is submitted. For every DEGENERACY or multi-slider stop, name both controls, the constraints, the expected parameter-pair submission, and any final plan choice.

Weak:

> Predict, act, and measure.

Strong:

> First calculate and commit the pressure predicted at 330 K using the displayed starting pressure and temperature. Then warm the sealed branch, measure pressure and composition, and decide which part of the leak explanation survives.

## 12.5 Question-card scientific content

Each stop must also contain:

- format and placement;
- concept, keystone tag, and prerequisites;
- learning role;
- difficulty;
- story role;
- stop reason;
- visible data with units;
- exact prompt;
- complete format-specific interaction payload;
- correct result and tolerance if numerical;
- `answerText` or the engine's canonical answer/explanation field, stored as a distinct post-grade field and never embedded in pre-answer player copy;
- mechanism explanation;
- misconception or wrong-path feedback;
- state/output and unlocks;
- earlier concept retrieved;
- later payoff or setup.

Recalculate every numerical answer. Never allow a keyed value, tolerance, explanation, and worked formula to disagree. If the correct calculation lies outside the acceptance tolerance, the question is broken even if the prose is good.

Do not create `guide` or `takeaway` question-card fields when the engine has removed them. Put teaching in the setup, story-science connection, mechanism, answer text, and wrong-path feedback. The mission-level takeaway belongs in the final quick-review bullet.

---

# 13. The mission throughline contract

Treat every mission as one causal chain:

> briefing promise -> Stop 1 foundation -> Stop 2 consequence -> Stop 3 test or travel -> Stop 4 decision -> outcome consequence -> next mission problem

Before approving a mission, write these seven statements in order and check that each one begins where the previous one ended.

## 13.1 Briefing-to-question check

Every question must help answer the decision named in the briefing. If a question teaches useful course content but does not move that decision, move it to another mission, rewrite the mission problem, or remove it.

## 13.2 Question-to-question check

After Stop 1, each story setup should explicitly refer to what was just learned using phrases such as:

- “With the amount established...”
- “Because that prediction failed...”
- “Now that the rate effect is known...”
- “Take that result to...”
- “Combine that pattern with...”
- “Because the two plans still fit...”

Do not force the player to infer why the game has changed subjects.

## 13.3 Final-question check

The final stop should answer or directly enable the decision promised by the briefing. A mission should not end on a disconnected calculation followed by a narrator announcing the true conclusion.

## 13.4 Outcome reflection check

The first sentence of the outcome must begin:

> **Mission decision:** `[DIRECT ANSWER TO THE BRIEFING'S PROMISED RESULT]`.

The remaining outcome sentences should:

1. cite the decisive evidence or mechanism;
2. show what the crew does because of it;
3. reveal a consequence, contradiction, setback, or next problem;
4. create the reason for the next mission.

If the briefing asks whether to repair A or B, the outcome must explicitly say repair A or repair B. Do not replace the answer with atmosphere or vague reflection.

---

# 14. Required mission chapter structure

For every mission, provide the following sections in this order.

## A. Mission briefing card - exact player copy

Include Header, Card title, Go now, a 30-to-70-word four-sentence Card body, Objective, and the player-facing **Worth knowing first** block. The primer must appear in this order: compact one-line glossary entries, primer concepts, then equations first needed that day. Maintain failure consequence and later travel as authoring checks; print them only when they add nonredundant player information.

## B. Main story happening - designer summary

State what physically and dramatically happens during the mission, what changes after each stop, and what decision the crew makes. This is not automatically shown to the player; its content must be delivered through the briefing, stop reasons, question setups, beats, and outcome.

## C. Designer intent - not shown to player

Explain the mission's teaching and story purpose in one concise paragraph.

## D. Player-facing beat script

Tie every beat to arrival, completed stops, travel, the final decision, or the outcome. Use dialogue bubbles, panels, world changes, and waypoints rather than required movies.

## E. Location plan

State the exact one-, two-, or three-location route and why each move occurs.

## F. Characters and dramatic beat

State who appears, what each person wants, where they disagree, and what evidence changes the relationship.

## G. Key concepts, explained here

Explain the mission's concepts in plain language before the stop details. Define any term that the briefing used. Make clear how each concept affects the world problem.

## H. Four graded stops

For each stop, include the exact stop reason, two-sentence 30-to-45-word story setup, story-science connection, prompt, complete format-specific interaction payload, answer text, mechanism, feedback, and state changes.

## I. Mission outcome

Begin with “Mission decision:” and directly answer the briefing. Continue with the consequence and next hook.

## J. Post-mission metric screen - exact player copy

Include timer, accuracy, automatic bar changes, Recovery Points, allocation prompt, locks/failures, and a canonical QA result.

## K. Quick concept review

Provide three to five short points. Review what the player can now use, not the exact wording of the questions.

Recommended outcome-screen labels:

- **WHAT CHANGED**
- **CHEMISTRY/PHYSICS/BIOLOGY YOU CAN NOW USE**

Return the player to the world after the screen.

---

# 15. Question formats are player verbs

Read the supplied `QUESTION_TYPES.md` completely. Use only canonical, supported formats.

Do not treat formats as decorative skins. A format should match what the player intellectually and physically does.

Possible progression:

- **Recognize:** CHOICE, TRIAGE, BELT, or the available equivalent.
- **Organize or calculate:** SEQUENCE, PROTOCOL, BALLPARK, DERIVE, BALANCE.
- **Experiment:** SWEEP, PROBE, VERIFY, CONTROL, TALLY.
- **Diagnose:** CASEBOOK, DIAGNOSIS, TRACE, RESIDUAL, DEGENERACY.
- **Decide:** VALUE, STRESS, SCIENCETANK, PROPAGATE, TRIGGER, ALLOCATE.

Use the actual format definitions, not these summaries, as the authority.

Particularly useful dramatic mechanics include:

- **DIAGNOSIS:** which explanation fits every observation, including quiet readings;
- **TRACE:** several agreeing outputs share one upstream dependency;
- **CONTROL:** change one variable and reverse it to establish causation;
- **HOLDOUT:** freeze a model before revealing unseen data;
- **STRESS:** test whether a conclusion survives reasonable uncertainty;
- **RESIDUAL:** expose a patterned failure hidden by a good average score;
- **DEGENERACY:** two explanations fit until one physical constraint is added;
- **ATTEST:** verify identity, timing, and physical condition with independent records;
- **TRIGGER:** commit thresholds before results appear;
- **VALUE:** choose the one measurement that could change the decision;
- **SCIENCETANK:** fund competing parts of a causal plan under limited resources.

Do not use a format merely because it has not appeared yet. The campaign does not need to showcase every interaction. Avoid long runs of identical verbs, especially repeated CHOICE and BALLPARK questions.

## 15.1 Interaction-data completeness is a shipping gate

A format name and prose description do not create a playable interaction. Basic formats such as CHOICE, BALLPARK, or SEQUENCE may use shared fields, but operated, diagnostic, and decision formats require their own structured board data. A stop is not implementation-ready until the current importer accepts that exact payload.

Prose is not a board. Instructions such as “three readings plus a quiet control,” “show several candidates,” or “add a threshold” must be replaced by the actual structured readings, labels, zones, values, candidates, bounds, keys, and feedback the renderer and grader consume. Never ask an importer or converter to invent the missing scientific data.

Structured board data must be stop-specific. Derive the axis quantity, units, bounds, readings, candidates, and numbers from that stop's exact question and authored interaction payload. If the payload line already contains the correct board, explicitly designate it as the source rather than replacing it with a format-level example. The board may store a keyed answer for grading, but the player-facing panel states the goal and available evidence, never the target, winning basket, committed rule, or other answer.

Do not reuse one numerical board across stops or campaigns merely because the format is the same. Labels such as `decision units`, `controlled setting`, `display A`, `station A`, or `uncertainty index` are prohibited unless those exact quantities genuinely appear in the stop's question. As a cross-campaign check, identical multi-number board signatures in unrelated stops must be reviewed as likely template leakage.

**DERIVE campaign override:** every step contains exactly two displayed choices - one correct line and one plausible common-mistake line. Randomize their left/right order. Mark the wrong candidate `survives: true` only after reading it and confirming that it is not visibly absurd; rewrite it first if necessary. The wrong line must be at least as visually substantial as the keyed line so answer length does not reveal the key. Do not add a third decoy even if a general format example permits more.

Use the current importer/schema as the authority. At minimum, verify these common contracts against the repository version in use:

- **CHOICE:** at least two genuine options, one keyed choice, and a specific rebuttal for each wrong option. When a settings-and-readings CLOUD is relabelled as CHOICE, carry the actual readings into the evidence and author real options plus the key; do not retain generic centre/spread scaffolding.
- **BALLPARK:** an `estimate` naming the stop's actual quantity and unit, the visible numeric `inputs`, the operation, a formula written from those inputs and literal constants, a numeric `correctResult`, and a positive tolerance. Each input becomes a labeled number tile; mark a visible but unused value `contextOnly: true` so it becomes a distractor. Never substitute the generic `target`/`tiles` template, invent a displayed numerator or divisor, or reference a number absent from both the inputs and the formula's legitimate constants. Keep unaided arithmetic mentally manageable, normally producing an integer or at most one useful decimal. A prose key or an old BALANCE payload is not a calculation board.
- **HOLD:** a live control run, not a freeze-and-reveal test. Name the quantity, unit and control; provide a numeric `hold`, positive band, positive `narrowTo` no wider than the starting band, duration from 20–120 seconds, `direction` (`raise` or `lower`), positive control `authority`, and a `pass` fraction above 0.5. Every disturbance needs a label, an `at` time inside the run, and a nonzero rate `amount`. Simulate both extremes before shipping: doing nothing must fail, while attentive control must still be capable of recovery.
- **ALLOCATE:** positive pool; at least four uniquely identified items with costs; at least three decision questions; every question has a nonempty `requires` list; at least one question may be forgone; and the protected items do not already satisfy every requirement or consume the full pool. The player must have to choose a plan. Store the keyed allocation for grading and provide `answerText`, but do not print the winning basket on the board.
- **VALUE:** positive budget; at least four costed options on meaningfully different evidence or action axes; at least one required option; total available cost greater than the budget; `answerText`.
- **ATTEST:** at least four claims with backing status; a numeric verification limit; at least one critical unbacked claim; not every claim already backed; `answerText`.
- **TRACE:** at least four labeled channels/readings; a named shared upstream resource; at least two target-dependent channels; at least one independent channel; `answerText`.
- **CONTROL:** at least three candidate controls with unique IDs; numeric baseline and nonzero response; a noise band smaller than the meaningful response; `answerText`.
- **DEGENERACY:** exactly two controls, each with minimum, maximum, and step; positive tolerance; at least five points on the first locus and three on the second; labeled physical constraint; numeric truth pair; `answerText`.
- **CHAIN:** at least four uniquely identified links with labels and carried quantity; an order that names at least four required links exactly once; a `governingLink`; and a `distractor` that names one actual link other than the governing link. The distractor is the conspicuous large or loud member a novice might name instead of the causal governing link. Provide `answerText`.
- **TRIGGER:** one named decision quantity and unit; numeric scale with valid minimum, maximum, and step; one rule; no more than four numeric anchors; and an update stream of at least three forward-ordered entries containing `at`, `value`, and `hoursLeft`. Every stage has a label, positive `leadHours`, and `window: {min, max}`; at least one stream update satisfies both the stage window and its lead requirement. The opening slider position must not already pass. Anchors may orient the player but must not sit exactly on the keyed threshold or carry labels such as `ACCEPT MINIMUM`. Provide the objective, direction, consequence limit, and `answerText` without revealing the committed rule.
- **STRESS:** an assumption with label, unit, valid minimum, maximum, nominal, and step, with nominal inside the range; at least two explicit criteria; `optimiseOn`; and preferably at least three candidates. At least one candidate must fail somewhere in the tested range, while at least one remains viable over the relevant adverse range. The robust answer should normally trade away some nominal performance instead of winning every criterion at every setting. Provide `answerText`.
- **RESIDUAL:** competing fits with comparable error scores and residual points at real coordinates derived from a quantity defined in the question. The pedagogical trap is the lower-error fit whose residuals show a systematic pattern; mark that fit `structured: true`. The accepted fit may have slightly higher error but must lack the rejecting pattern. Never invent index coordinates unless the question explicitly defines an ordered index. Provide the keyed conclusion and `answerText`.
- **BALANCE:** a counted-stream ledger with at least one genuinely hidden or unrecorded stream that the player must infer. A row marked “not counted” is not a hidden stream. If all streams are visible and the task is only arithmetic, use BALLPARK or another calculation format instead. Provide the keyed conclusion and `answerText`.
- **CLOUD:** a numeric scatter/uncertainty field with bounds, centre, spread, pass condition, and at least two available actions, including an action that narrows the cloud. A settings-and-readings table without this geometry belongs in CHOICE, PROTOCOL, or another better-matched format. Provide the keyed action or conclusion and `answerText`.
- **VERIFY:** the format's own named data block, visible readings, correct action or conclusion, and `answerText`.
- **DIAGNOSIS:** headline; at least three readings, each with a zone, label, and value, including a quiet control where scientifically appropriate; at least four candidate explanations; one keyed diagnosis; and mechanism-specific rebuttal text for the wrong candidates.
- **PROTOCOL:** at least two situations and exactly one distinct response per situation. The keyed mapping is a permutation: no response may serve two situations. If two situations genuinely share an action, merge them or author distinct situation-specific responses.
- **CASEBOOK:** evidence rows, labels, readings, and keyed interpretation.
- **SCIENCETANK:** proposals, evidence, constraints, and recommended allocation.
- **PROBE:** at least four named stations, each with its authored reading and expected comparison, plus the keyed conclusion.
- **SWEEP:** a numeric target and positive tolerance, a target inside the named axis, a starting position away from the answer, and at least four authored response points per series, each with numeric `at` and `value` coordinates. Do not print the target in scene or question prose; the player must locate it from the plotted response.
- **PROPAGATE:** labeled numeric inputs with positive `sigmaFrac`, numeric exponent, positive measurement cost, a `costUnit`, and a positive budget that forces a real choice. Compute each contribution from the format's stated rule, including its exponent and fractional width, and make the declared `dominant` equal the actual largest contribution. Do not let the budget buy the dominant term plus every useful alternative.
- **INJECT:** a population with numeric `n` and competing configurations whose best target metric is not merely the one with the largest raw detection count.
- **TRIANGULATE:** every station has a label, x, y, numeric distance, and observation, and each authored ring reaches the truth within tolerance.
- **LOB:** between two and five authored marks, plus target, correct result, tolerance, quantity, and unit.
- **SEQUENCE:** one rail containing at least three authored cards and one keyed order that names every card exactly once. A comparison between two routes is not a SEQUENCE; keep only the route being ordered or use a comparison format.
- **TALLY:** at least two settings that run simultaneously, each with a numeric `pSame` between 0 and 1. Its expected statistic is the sum of `2·pSame − 1` across all settings and must land on the numeric target within tolerance. Set `minShots` low enough that reporting immediately remains meaningfully uncertain; the player, not the panel, decides when enough observations have accumulated. A board that asks the player to choose one keyed setting is CHOICE or SWEEP, not TALLY.
- **BELT:** both bins need several semantically diagnostic items. Audit repeated words and visible spelling patterns: if a word appears in several items, it must not perfectly predict one bin unless that vocabulary distinction is itself the learning objective. Hyphenation does not count as placing the same word in both bins.
- **HOLDOUT:** the freeze-and-reveal instrument. Use two scored curves over the same explicitly named threshold axis, with at least five fit points and five held-out test points, plus a numeric pass rule and keyed generalization conclusion. The calibration curve must contain a narrow best-fit spike that fails on the held-out curve; at least one less optimized setting must pass the holdout. If the best calibration setting also passes, chasing the sample costs nothing and the board has no trap.

Never replace a missing format block with a generic option list merely to make a stop import. If the importer refuses the format, hold the stop back, add the required data, and retest it.

When several handback rounds coexist in a bible, number every canonical block (`Handback 3`, `Handback 4`, `Handback 5`, and so on). The importer must select the highest round present for that stop. Keep the earlier block in place so the revised payload can still be compared with the prose and previous decision.

A field labelled **exact player copy** is literal screen text. Do not add Markdown backticks, emphasis markers, code fences, or other authoring markup unless those characters are meant to appear to the player. Mathematical notation in exact-copy fields must use the game's supported plain-text or equation rendering syntax.

Authoring labels and grading data are never player copy. In particular, a prompt must not contain an appended `answerText:` fragment, a bold **Answer text:** label, a correct result, or a serialized answer object. The standalone **Answer text** field is revealed only after submission and grading. Audit the entire pre-answer field set - not only the prompt - because an answer leak in a setup, connection, board label, candidate name, or opening state is still an answer leak.

The post-grade explanation must state every numerical figure used by the grader that the player needs in order to understand why the result passed or failed. Keep those figures in hidden grading data or post-grade `answerText`; do not leak them into the pre-answer goal, anchor labels, candidate names, or opening state.

For multi-phase formats, validate the player-visible sequence as well as the payload. A technically complete `required_sequence` is still unusable if the card never tells the player that a calculation must be completed first. Confirm that each staged instruction names the response expected at that stage and that later controls remain locked until prerequisite actions are complete.

## 15.2 Format payload example

An ALLOCATE stop should be specified at a level like this before implementation:

```yaml
allocate:
  pool: 100
  items:
    - {id: methane, label: Methane production, cost: 40, required: true}
    - {id: diagnostic, label: Diagnostic test, cost: 25, required: true}
    - {id: restart, label: Restart reserve, cost: 20, protected: true}
    - {id: contingency, label: Contingency reserve, cost: 15}
  questions:
    - Which allocation preserves restart capability?
    - Which allocation still funds the diagnostic?
    - Which allocation best advances today's mission decision?
  correct_allocation: {methane: 40, diagnostic: 25, restart: 20, contingency: 15}
answerText: The plan funds production and the test without consuming the protected restart reserve.
```

The example communicates completeness, not universal field spelling. Convert it to the exact canonical schema in the target repository.

---

# 16. World, fixtures, and state changes

The world should remember scientific progress.

A fixture is a persistent object standing in a room that a player can walk up to, named as someone in that world would name it. It exists whether or not a question is active, and several stops may use it. A fixture table must describe the room's actual reusable equipment, desks, boards, racks, vessels, consoles, or work surfaces - not reproduce the stop list with IDs such as `s01-name-the-data` and generic captions such as “presents the evidence and controls for this stop.” Aim for roughly three to six meaningful fixtures per place, declare every referenced fixture exactly once, and repoint every `Format/placement` to one declared object.

Examples:

- a warning changes color and text;
- a suspect pipe illuminates after a valid probe;
- a false clue receives a maintenance tag rather than vanishing;
- barricades are removed when a leak search ends;
- a control setting receives a visible safety boundary;
- a sample physically appears at the laboratory;
- a quarantined object gains or loses a ring;
- a process route lights in the order the player reconstructed;
- a character's console access locks or unlocks;
- a destination appears only after the evidence creates a reason to go there.

Persistent state changes provide story without requiring a cinematic. They also make the player's reasoning visible and memorable.

For every stop, specify the visible state change. For every mission, specify which changes persist into later missions.

---

# 17. Mission outcomes and concept reviews

Every mission needs 45 to 90 seconds of non-quiz aftermath. This may be:

- equipment responding;
- a short walk to see the consequence;
- a sample transfer;
- a brief argument in dialogue bubbles;
- a repaired or damaged world object;
- a new reading that changes the mystery;
- a character conceding or complicating a claim;
- the next route appearing.

The outcome is not an answer explanation pasted after the question. It is what happens because the answer is now known.

The player-facing closing card must:

- begin with **“Mission decision:”** and give the direct answer promised by the briefing;
- use short sentences and score at or below grade 6.5 on the project's reading check;
- keep the science accurate while simplifying syntax and vocabulary;
- avoid character names on the system card; place a named reaction in the preceding dialogue or radio beat;
- make the next mission's problem visible rather than merely announcing that it exists.

After that outcome, show exactly one separate **Happy ending card - exact player copy**. It must be upbeat, compliment the player's judgment, name the actual mission decision or result, and explain what people or system benefited. Keep it short, do not undermine the earned local win with a trailing negative sentence, and do not ask another question. Every card in a campaign must be textually distinct. Vary praise openings and sentence structures, and never reuse a subject-swap template across campaigns.

After mission completion, offer **GO DEEPER** as an optional secondary brief. It contains exactly six ungraded single-answer multiple-choice questions. Each question must include four distinct options labeled A through D, exactly one correct answer, one useful hint, and feedback for all four options. Cover any relevant concepts removed from the required opening card first, then revisit or extend the mission's required ideas. Frame each item as a fresh AP-style application with a loose story connection. Mix calculation, data or graph interpretation, prediction, and evidence or model judgment when appropriate. Do not ask which answer belongs to a named stop, repeat a keyed stop result as a recall cue, or use unrelated stop answers as distractors. The player may skip the section without losing metrics, Recovery Points, completion, or the next mission.

The quick review should be concise and cumulative:

- three to five bullets;
- one idea per bullet;
- plain language first, notation second;
- include at least one “when to use this” idea;
- retrieve earlier concepts when they contributed;
- make the final bullet the **Mission takeaway**, stating the one durable idea the player should carry forward;
- do not ask another graded question after the final campaign decision.

Any player-facing count in a quick-review, warm-up, retrieval, or mission label must equal the number of items actually placed. Recount the rendered or imported items after editing; do not preserve a stale label from an earlier draft.

---

# 18. Accessibility and writing standards

## 18.1 Plain language before jargon

Introduce the everyday function first, then the technical name.

Example:

> The reactor combines carbon dioxide and hydrogen to make methane and water. This is the Sabatier reaction.

Not:

> Use the Sabatier stoichiometric model to inspect feed constraints.

## 18.2 Short blurbs, reasons, and two-sentence setups

Question-card story setups should be exactly two short sentences totaling 30 to 45 words. Stop reasons and story-science connections should each use 20 to 55 concrete words, make sense without unexplained campaign shorthand, and do different jobs: the reason explains why the task is needed now; the connection explains how the actual scientific result changes the decision. Any auxiliary card, fixture, location, or scene blurb that is not the four-sentence mission briefing or the required two-sentence question setup should be **one simple sentence**. Do not turn blurbs into mini-lectures. Put teaching in the `Worth knowing first` primer, story-science connection, mechanism, answer text, and feedback fields.

## 18.3 Units and thresholds

- Show units in visible data and spoken explanations.
- State whether a threshold is inclusive.
- Use kelvin where absolute temperature is required.
- Label fictional safety or flight thresholds as campaign specifications, not real operational guidance.

## 18.4 Multiple ways to receive information

- Color is never the only alarm or pass/fail signal; include text and/or icons.
- Essential story information does not depend on sound.
- Completed dialogue and conclusions are reviewable.
- Required bubbles pause the timer.
- Incorrect feedback names the mechanism and gives a route to retry.
- A fifth-grade reader should understand the immediate situation even when the eventual reasoning is AP-level.

## 18.5 Measurable reading gates

Run the project's readability check rather than judging simplicity by feel:

- briefing-card body: 30 to 70 words;
- question-card story setup: exactly two sentences and 30 to 45 words total;
- mission closing card: grade level 6.5 or lower;
- dialogue bubble: short enough to scan while standing in the game world;
- every term required to understand player-facing copy: defined before use or present in a recursively complete glossary;
- glossary presentation: one line per term in `Term: definition` form, with no visible alias or `Definition` subline;
- equation presentation: equation, job, symbols, and campaign-specific reason only; no visible `Also called` or `Concept` line;
- auxiliary card/scene blurb: one simple sentence.

These limits apply to player-facing copy, not to designer explanations or scientific mechanism notes.

---

# 19. Internal authoring metadata

Maintain metadata approximately like this for every graded stop, even if some fields remain in the design document rather than shipping files:

```yaml
mission:
stop:
area:

concept:
concept_number:
subconcept:
keystone:
prerequisites:
takes_as_read:

learning_role: introduce | practice | retrieve | combine | transfer
difficulty: L1 | L2 | L3 | L4 | L5
format:
group:

story_role: clue | obstacle | character | reversal | reveal | decision | payoff

briefing_decision:
scene_problem:
player_goal:
reason:

question_story_setup:
question_story_science_connection:
question_prompt:
call_exact_player_copy:
format_payload:
answer_text:

player_believes_before:
player_learns_after:

clue:
clue_truth:
initial_interpretation:
pays_off_in:

misconception:
correct_mechanism:
correct_result:
tolerance:

visible_state_change:
unlocks:
retrieves_from:
sets_up:
mission_takeaway:
```

This metadata enables automated checks for prerequisites, spacing, repeated formats, unpaid clues, weak throughlines, and late introduction of new content.

---

# 20. Required design workflow

Work in stages.

## Step 1 - Diagnose the existing campaign

Summarize:

- current story;
- current mission structure;
- current course concepts;
- strengths worth preserving;
- prerequisite problems;
- repeated or shallow concept use;
- unsupported question formats;
- unclear stakes or jargon;
- briefing/question/outcome disconnects;
- location and pacing problems;
- characters who function only as narrators or quiz dispensers;
- numerical or answer-key inconsistencies.

Do not rewrite implementation files yet.

## Step 2 - Build the dependency graph

Identify foundations, dependent concepts, keystones, movable concepts, and required prerequisites.

## Step 3 - Define the four metrics and failure boundaries

Name all four bars, starting values, what each means, what events can change it, whether and when it can lock, and what 0% means.

## Step 4 - Build the dramatic spine

For each mission give title, main story event, science movement, mystery movement, stakes movement, mission decision, outcome, and next hook. Mark three major twists, smaller reversals, apparent victory, and final crisis.

## Step 5 - Build the character and location plans

Define the major cast, their wants and blind spots, and the one/two/three-location escalation. Every later move must have a causal trigger.

## Step 6 - Build the clue ledger and concept matrix

Confirm that every twist is reconstructible. For every keystone, show at least three separated missions, one delayed RETRIEVE after an intervening mission, and one later COMBINE or TRANSFER use, unless an approved exception explains why that structure is impossible.

## Step 7 - Build the 55-70-stop blueprint

For each stop provide narrow concept, broader keystone tag, role, difficulty, format, story role, stop reason, player action, complete format-specific payload, mechanism, misconception, clue/reveal, retrieval, payoff, and state change.

## Step 8 - Write exact player-facing content

Write:

- the maximum-five-sentence opening card;
- every mission briefing card and its `Worth knowing first` block;
- compact one-line glossary entries, short primer concepts, and equation entries containing only equation/job/symbols/campaign reason;
- every stop reason, two-sentence 30-to-45-word question-card story setup, and story-science connection;
- every beat's bubbles, panel text, world change, and waypoint;
- every exact prompt, format-specific interaction block, result, `answerText`, mechanism explanation, and feedback;
- every mission outcome;
- every metric screen and quick review.

## Step 9 - Audit the throughlines

For every mission, read only:

> card body -> four story setups -> four story-science connections -> mission outcome

Separately verify that the `Worth knowing first` block prepares the player for those stops without changing the mission decision or becoming required narrative exposition.

Also inspect the visible chain with stop reasons included:

> card body -> stop reason -> story setup -> story-science connection -> result beat -> next stop reason

The chain should make sense without designer notes. Repair any jump.

Then run an action-clarity audit on every stop:

- Can the player state exactly what to do before touching the controls?
- If a calculation comes first, does the card explicitly say **calculate and commit first**?
- Are all required numerical inputs and units visible?
- Does the prompt name the expected response: number, setting, parameter pair, selection, allocation, or conclusion?
- For VERIFY, does the visible order read prediction -> commitment -> action -> measurement -> interpretation?
- For CONTROL, does the prompt say what changes, what stays fixed, and whether restoration and a second measurement are required?
- For DEGENERACY, does the prompt name both adjustable controls and require the numeric pair before the plan choice?
- Does the worked explanation reproduce the keyed answer from the same visible inputs?

## Step 10 - Implement only after approval

When rewriting campaign files:

- preserve the engine schema;
- use only canonical formats;
- require every nonplain format to pass the importer's data contract with zero missing blocks;
- preserve required identifiers, placements, and asset references;
- keep one typed challenge per lesson if that is the engine rule;
- use exact answer logic, not prose similarity;
- recalculate all numerical results;
- keep scenes concise and story-first;
- preserve working behavior unless a change is necessary;
- run import, schema, content, location, lesson, and gameplay validation;
- run word-count, sentence-count, closing-card grade-level, glossary-dependency, mission-primer-format, auxiliary-blurb, and character-first-mention validation;
- confirm glossary entries are one-line `Term: definition` entries and equation primers contain no player-facing `Also called` or `Concept` lines;
- confirm removed fields such as question-card `guide` and `takeaway` are absent;
- play once wrong-first and once right-first;
- confirm the final payoff begins immediately after the last graded stop.

---

# 21. Full stop blueprint fields

For each proposed stop, provide:

| Field | Content |
|---|---|
| Mission and stop number | Exact position |
| Format and placement | Canonical format and credible fixture/person |
| Area | One authoritative area-of-study/group value used by the world and roster |
| Call - exact player copy | Exact destination instruction; a person stop names exactly one canonical character |
| AP/course concept | Concept and subconcept |
| Keystone tag | Broader recurring concept that materially contributes |
| Prerequisites | What must already be understood |
| Learning role | INTRODUCE/PRACTICE/RETRIEVE/COMBINE/TRANSFER |
| Difficulty | L1-L5 |
| Story role | Clue/obstacle/character/reversal/reveal/decision/payoff |
| Briefing decision | The mission question this stop helps answer |
| Stop reason | Exact 20-to-55-word player-facing explanation of the concrete “why now” |
| Story setup | Exact two-sentence player copy, 30-45 words total |
| Story-science connection | Exact 20-to-55-word player copy connecting this result to the immediate decision |
| Player action | What the player actually does |
| Data/prompt | Exact visible content with units |
| Format-specific payload | Every structured block required by the importer |
| Correct result | Exact grading truth and tolerance |
| Answer text | Canonical result/explanation field shown after grading |
| Mechanism | Why the result is scientifically correct |
| Misconception | Likely wrong model |
| Wrong-path feedback | How the game teaches and permits retry |
| Visible change | Panel, object, dialogue, or world state |
| Retrieval | Earlier concept brought back |
| Unlock | Next stop, fixture, or location |
| Later payoff | What this establishes for the story |

---

# 22. Validation audits

## 22.1 Learning audit

- Does any concept appear before its prerequisites?
- Does every stop carry exactly one author-reviewed number from the campaign's authoritative numbered course-concept spine while retaining its narrow concept wording?
- Does every concept number fall within the spine's valid range, and does the assignment count equal the count of actual stop headers?
- Are 10 to 15 keystone concepts clearly identified?
- Does every keystone recur in at least three separated missions unless an exception is documented?
- Do later encounters require more sophisticated actions?
- Does every keystone have a delayed RETRIEVE after an intervening mission?
- Does every keystone contribute to a later COMBINE or TRANSFER use?
- Is the broader keystone tagged and named in the mechanism even when the stop's narrow concept differs?
- Are retrieval opportunities concentrated on keystones rather than minor facts?
- Is any concept repeated only at INTRODUCE level?
- Does the finale introduce a major concept for the first time?

## 22.2 Story audit

- Is the main human consequence clear in the opening?
- Does the opening end with one strong spoken sentence that names who or what depends on the player, states the campaign-scale outcome, and charges the player to act?
- Would the closing quote still feel specific to this campaign if the authority's name were removed, rather than reading as an interchangeable aphorism?
- Does something meaningful change every two to three missions?
- Are there approximately three distinct major twists?
- Does each twist have several earlier clues?
- Are all clues objectively true before and after reinterpretation?
- Do characters have motives and blind spots?
- Does scientific progress change what characters believe or do?
- Is there an apparent victory before the final complication?
- Does the final decision matter?

## 22.3 Briefing and throughline audit

- Does every briefing connect to the previous outcome?
- Does it define new jargon before assuming it?
- Is every acronym or abbreviation expanded on its first appearance in this mission as `full term (ABBREVIATION)`?
- Are internal location/group codes absent from player-facing primer prose unless the code itself has been introduced?
- Does every mission card include `Worth knowing first` in the order glossary -> primer concepts -> equations first needed today?
- Can every retained glossary term, primer bullet, and equation be tied to at least one of that mission's four required stops?
- Has related but unnecessary enrichment been moved to the optional post-mission secondary brief instead of front-loaded?
- Are glossary entries one-line `Term: definition` entries with no player-facing alias or `Definition` sublines?
- Does each equation include its job, every symbol, and the campaign-specific reason, with no `Also called` or `Concept` lines?
- If there is no new equation, does the card say so briefly instead of inventing one?
- Does “Go now” name the initial location and fixture?
- Is the briefing body 30 to 70 words?
- Does it say what the player will do?
- Does its fourth sentence begin “By the end of the mission” and promise an exact decision?
- Does every stop reason explain why the task is necessary now?
- Is each story setup exactly two short sentences totaling 30 to 45 words?
- Does each story setup identify the next necessary step?
- After Stop 1, does each setup connect to the prior result?
- Does the final stop produce the promised decision?
- Does the first outcome sentence explicitly answer it?
- Does the rest of the outcome create the next mission's problem?
- Does every mission have exactly one happy ending card that praises the player's judgment, names that mission's result, and states its concrete benefit?
- Are all fifteen happy ending cards textually distinct, with varied openings and sentence structures?
- Is the “You used [subject] to save the day” subject-swap template absent across all campaigns?

## 22.4 Character and dialogue audit

- Is each major character introduced while competently doing a job?
- On first mention in each mission, is the character's working role restated?
- Do all names, roles, pronouns, and short forms match the canonical roster and theme files?
- Does each have wants, a blind spot, a domain, and an arc?
- Are disagreements between legitimate constraints?
- Is any character present only to ask questions?
- Are ordinary beats limited to two short bubbles?
- Does every correct-answer dialogue begin with a quick compliment before its scientific result or next instruction?
- Does every mission-completion dialogue begin with a larger compliment recognizing the whole mission?
- Does the praise remain short enough that it does not replace feedback, consequence, or direction?
- Can essential information be understood without voice, animation, or sound?
- Do greetings and optional dialogue change after revelations?
- Are named character reactions kept out of system-owned closing cards and placed in the preceding beat?
- Does every person-stop group have an explicitly assigned named roster owner?
- Does every dialogue bubble use a canonical character name rather than an unnamed role or beat label?
- Does every beat have a unique stable ID?
- Does every person stop name exactly one canonical character in both placement and exact player-facing call?

## 22.5 Location audit

- Do Missions 1-4 use exactly one meaningful place each?
- Do Missions 5-10 use exactly two?
- Do Missions 11-15 use exactly three?
- Is distant travel locked until after Mission 4?
- Have sightseeing races, greeting checklists, and other filler orientation games been removed or folded into meaningful Mission 1 actions?
- Does evidence cause every move?
- Does each destination offer a fixture, measurement, sample, person, or authority unavailable at the prior location?
- Is every fixture a persistent, world-native object reused where appropriate rather than a stop-specific `s01-...` wrapper?
- Does every `Format/placement` resolve to exactly one declared fixture, with roughly three to six meaningful fixtures per place?

## 22.6 Format audit

- Are all formats canonical and currently supported?
- Does each format match the player verb?
- Are decision formats attached to real decisions?
- Are operated formats placed at equipment?
- Are calculation formats placed at suitable boards, rooms, or benches?
- Are too many consecutive stops the same action?
- Are CHOICE and BALLPARK overused?

## 22.7 Interaction-payload audit

Before any aggregate report, perform these three handback checks and record the result:

1. **Can this board be got wrong?** Reject it if every candidate survives, nothing is required, a window is unset, visible rows already settle the ledger, or the opening control position is accepted.
2. **Does the declared format's own data exist?** Reject a HOLD carrying only `holdout:`, a BALLPARK carrying only a counted-stream ledger, a CHOICE carrying only cloud geometry, or any canonical block whose values are placeholders copied from another format.
3. **Is every person named anywhere in the campaign on its canonical roster?** Check opening cards, warm-ups, find/follow/catch copy, beat speakers, group leaders, and role/division ownership. A first-name match is valid only when it identifies exactly one roster member.

For group reachability, every instructional group ID must appear at the front of at least one rostered person's role or division assignment. Do not infer ownership only from dialogue or subject expertise, and do not remove a prior group owner while closing a new ownership gap.

Also preserve the two established presentation checks: the axis must name a quantity and unit used by the question, and the pre-answer board must not print or visibly cue its own keyed answer.

Then run the remaining checks:

- Does every nonplain format include its canonical named data block?
- Has every prose placeholder been replaced by actual structured fields, values, candidates, and keys?
- Do required collections meet their minimum item, point, reading, claim, or candidate counts?
- Are IDs unique and referenced consistently by truth keys and mappings?
- Are budgets, pools, costs, ranges, steps, tolerances, baselines, responses, and limits numerically valid?
- Does each stop provide the canonical `answerText` or current equivalent?
- Is every `Answer text` value stored as a standalone post-grade field, with no `answerText:`, keyed result, grading syntax, or authoring label embedded anywhere in pre-answer copy?
- Does every stop reason make sense without undefined story shorthand, name the concrete reason the task is needed now, and avoid ceremonial or generic mission language?
- Does every story-science connection name the actual evidence or quantities and explain what the result confirms, rules out, distinguishes, permits, blocks, or changes?
- Are the stop reason, story setup, and story-science connection substantively distinct rather than three paraphrases of one sentence?
- Does the actual importer accept every stop with zero missing interaction-data errors?
- Have generic option-list fallbacks been rejected for formats that require operated or diagnostic data?
- Does every board use an axis quantity and units explicitly named by that stop's question or payload?
- Have format-level sample numbers, generic labels, and suspicious cross-campaign duplicate number signatures been eliminated?
- Does every player-facing panel state the goal without printing the keyed target or answer?
- Do the stop reason, story setup, and story-science connection begin differently and contribute three distinct pieces of information, with no repeated sentence or generic format filler?
- Does every formula in exact player copy or an interaction payload have a visible left-hand side, an explanation of what that quantity represents, and definitions or units for unfamiliar symbols?
- Does every DERIVE story setup explain the starting equation in concrete subject and story terms before asking the player to manipulate it?
- Does every DERIVE prompt repeat the complete starting relation and require its left side to be preserved?
- Is every DERIVE candidate a complete equation, inequality, approximation, or honestly named verbal relation rather than a bare expression, instruction, or number?
- Does every DERIVE step have exactly two choices, exactly one correct line, and one reviewed `survives: true` common-mistake line at least as visually substantial as the key?
- Does every wrong option or candidate have its own mechanism-specific rebuttal rather than one generic retry sentence?
- Does every TRIGGER have valid stages and windows, a positive lead time, a forward-ordered update stream, at least one reachable firing update, and a nonpassing opening position?
- Does every STRESS nominal fall inside its range, with at least one candidate that fails somewhere and at least one viable robust candidate?
- Does every ALLOCATE question have a nonempty `requires` list, with a meaningful option to forgo and no plan already completed by protected items?
- Does every HOLDOUT contain two scored curves, at least five fit and five held-out points, one shared threshold axis, and a numeric pass rule?
- Does every CHAIN name a non-governing link as its distractor?
- Does every PROPAGATE board's declared dominant term agree with its own contribution arithmetic?
- Has every BELT been checked for a word or spelling cue that perfectly predicts a bin?
- Does every TALLY run multiple `pSame` settings simultaneously and leave the report-time decision genuinely open?
- Does every BALANCE contain a genuinely hidden counted stream rather than only visible arithmetic?
- Does every CLOUD contain numeric bounds, centre, spread, pass condition, and a narrowing action?
- Does every RESIDUAL use real question-defined coordinates and reject a lower-error fit marked `structured: true` for its residual pattern?
- Does every DIAGNOSIS provide a headline, at least three fully valued readings, at least three choices, a key, and specific rebuttals?

## 22.8 Scientific and grading audit

- Has every numerical result been independently recalculated?
- Do units, formula, keyed answer, explanation, and tolerance agree?
- Are coefficients applied to the correct quantities?
- Are model assumptions visible?
- Are fictional thresholds clearly labeled?
- Do wrong answers teach the mechanism?
- Can a correct student ever fail because the tolerance is centered on a wrong key?
- For every unaided calculation, are the inputs mentally manageable and the result an integer or at most one useful decimal place?
- When a number changed, were all dependent prompts, payloads, measurements, tolerances, answers, feedback, and later references changed with it?
- Is `Answer text` a player-facing explanation rather than a verbatim duplicate of `Correct result`?

## 22.9 Metric-economy audit

- Are there exactly four bars?
- Does every negative change name a visible event?
- Can each bar meaningfully influence decisions?
- Are lock conditions earned in the story?
- Does 0% cause a defined game-over state?
- Does every mission have a target timer and pause rules?
- Does Recovery Point math use time and committed incorrect answers?
- Can the canonical reference path reach 100/100/100/100 without requiring perfect play unless that is intentional?
- Does the final launch/action remain blocked until all four bars and all scientific thresholds pass?

## 22.10 Pacing and accessibility audit

- Are there stretches that feel like four school questions in a row?
- Are there exploration, conversation, environmental clues, and non-quiz outcomes?
- Are question-card setups exactly two sentences and 30 to 45 words?
- Are briefing bodies 30 to 70 words?
- Do mission closing cards score at or below grade level 6.5?
- Does every stop have a visible reason that answers “why now”?
- Can a new player state the immediate problem in plain language at every stop?
- Is every player-facing technical term defined before use or supported by a recursively complete glossary?
- Does every mission card carry the required `Worth knowing first` block?
- Is every glossary entry a compact one-line `Term: definition` entry?
- Are equation primers free of `Also called` and `Concept` lines?
- Are auxiliary card/fixture/location/scene blurbs one simple sentence?
- Are removed question-card fields such as `guide` and `takeaway` absent?
- Is color never the only pass/fail signal?
- Are units visible?
- Do warm-up, retrieval, quick-review, and mission labels state the number of items actually placed?
- Does every mission contain exactly one optional GO DEEPER secondary brief after completion?
- Does every optional secondary brief contain exactly six single-answer multiple-choice questions?
- Does every optional question use a fresh AP-style application rather than asking the player to recall a stop title, recorded answer, quotation, or conclusion?
- Does each six-question set vary the reasoning with calculations, data or graph interpretation, predictions, mechanisms, evidence, models, or policy where the subject permits?
- Does every multiple-choice item that depends on a curve, shift, distribution, trend, comparison, threshold, trace, estimate, or ordering include a structured `Figure - exact player copy` block inside the question?
- Does every figure use a supported kind, exactly one x-axis, exactly one y-axis, and data that match the prompt and answer?
- Are second y-axes and status colors used as series colors absent?
- Has graph-shape prose been replaced by an inspectable figure wherever the player is expected to interpret the shape?
- Are all four starting campaign metrics multiples of ten, with every initial snapshot and canonical reference updated to match?
- Does every optional question have four distinct options A through D, one defensible answer, one nonspoiling hint, and feedback for all four options?
- Are concepts removed from the required opening card covered before the optional review repeats already assessed material?
- Can the player skip the optional review without changing metrics, Recovery Points, mission completion, or the next-mission unlock?
- Are dialogue and conclusions reviewable?
- Is the final payoff free of further quizzes?

---

# 23. Reusable mission template

Copy this block once per mission.

```markdown
# Mission [N] - [TITLE]

## Mission briefing card - exact player copy

**Header:** [deadline/status]

**Card title:** [title]

**Go now:** Go to [PLACE] and meet [CHARACTER] at [FIXTURE].

**Card body (30-70 words):** [Sentence 1: prior result + remaining problem.] [Sentence 2: plain-language explanation of new system/concept.] [Sentence 3: what the player will do and where.] [Sentence 4: By the end of the mission, decide/determine/choose...]

**Objective:** [one action/result]

### Worth knowing first - exact player copy

#### Glossary terms

[Term]: [one-line plain-language definition.]

[Term]: [one-line plain-language definition.]

#### Primer concepts

- [short idea needed before the lessons]
- [short idea needed before the lessons]
- [optional reminder of an earlier idea]

#### Equations first needed today

**Equation:** [equation]  
**What it is for:** [plain-language job]  
**Symbols:** [define every symbol needed to read the equation.]  
**Why this campaign needs it:** [specific reason this mission uses it.]

[Repeat only for equations first needed today. If none are new, write one short sentence saying the mission retrieves equations already recorded in the mission log. Do not add `Also called` or `Concept` lines.]

**Authoring-only failure consequence:** [concrete consequence already expressed in player-facing copy; do not print redundantly]

**Authoring-only later travel:** [unlock and causal reason; do not print “none”]

## Main story happening - designer summary

[State what physically happens, how the four stops cause successive beats, what decision closes the mission, and what new problem follows. Every important sentence here must have a player-facing delivery point below.]

## Designer intent - not shown to player

[One paragraph.]

## Player-facing beat script

### Beat 1 - On arrival at [LOCATION] | automatic after accepting briefing

**Presentation:** [methods]

**Player control:** [pause/continue/restore]

**World state:** [visible condition]

**Dialogue bubbles:** [exact copy]

**Panel/HUD text:** [exact copy]

**Unlocks:** Stop [N].

### Beat 2 - After Stop(s) [...] | [LOCATION] | automatic

[Same fields.]

### Beat 3 - After Stop [N] | [FROM] to [TO] | automatic

[Same fields; evidence must cause travel.]

### Beat 4 - After Stop [FINAL STOP NUMBER] | [LOCATION] | automatic decision

[Same fields.]

### Beat 5 - At mission end | [LOCATION] | automatic outcome and hook

[Same fields.]

## Location plan

**[One/Two/Three] locations:** [stop-by-stop route and causal travel explanation.]

## Characters and dramatic beat

[Who wants what, conflict, and relationship change.]

## Key concepts, explained here

[Plain-language explanation of concepts and narrative use.]

## Stop [#] - [TITLE]

**Format/placement:**

**Metadata:** concept number and narrow concept wording; keystone; area/group; prerequisites; learning role; difficulty; story role.

**Call - exact player copy:** [exact destination and fixture; if this is a person stop, name exactly one canonical character]

**Stop reason - exact player copy:** [20-55 concrete words explaining why this task is needed now without unexplained campaign shorthand]

**Question card story setup - exact player copy:** [exactly two short sentences, 30-45 words total]

**Question card story-science connection - exact player copy:** [20-55 concrete words naming the evidence or quantities and the decision this result changes]

**Data/readings/options:**

**Format-specific interaction block:** [all canonical structured data required by the current importer]

**Question card prompt - exact player copy:**

**Correct result:**

**Answer text:**

**Why/mechanism:**

**Wrong-path feedback:**

**State/output:**

[Repeat for all stops.]

## Mission outcome

**Pre-card character beat:** [put any named character reaction here, with role on first mission mention]

Mission decision: [direct answer to briefing]. [Decisive evidence.] [Crew action and consequence.] [Next mission hook.] [No character names on this system-owned card; grade level 6.5 or lower.]

## Post-mission metric screen - exact player copy

**Header:** MISSION [N] COMPLETE

**Timer line template:** TIME {elapsed} / TARGET [MM:SS]

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:**

**Automatic bar change:**

**Recovery Point line template:**

**Allocation prompt:**

**Canonical QA example:**

**Lock/failure result:** [if applicable]

## Quick concept review

- [Concept/mechanism]
- [Concept/mechanism]
- [When to use it]
- **Mission takeaway:** [one durable idea, including an earlier idea retrieved when relevant]

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. Do not change metrics, Recovery Points, completion, or the next-mission unlock.

**Secondary briefing card - exact player copy:** [Short invitation naming the completed mission and explaining that this optional section reviews or extends its concepts.]

### Additional concepts kept out of the required mission card

- [Term, graph feature, edge case, or extension not needed for the four required stops. Omit this subsection when none were moved.]

### Review questions 1-6

For each question provide: a self-contained exact prompt; four distinct plausible options A through D; exactly one **Correct answer**; one nonspoiling **Hint - exact player copy**; and four entries under **Option feedback - exact player copy**. Test moved enrichment first, then required concepts. A small labeled figure is allowed when the question depends on a graph, spatial relation, or visual comparison.
```

---

# 24. Reusable character template

```yaml
name:
world_role:
first_entrance:
wants:
blind_spot:
scientific_domain:
gameplay_use:
decision_formats:
verbal_habit:
relationship_with_player_at_start:
evidence_that_changes_them:
arc_by_campaign_end:
optional_dialogue_states:
```

Character test:

> If this character were removed, which scientific viewpoint, operational constraint, or dramatic relationship would disappear?

If the answer is “none; another person could ask the same questions,” redesign or combine the character.

---

# 25. Reusable campaign-metric template

```yaml
campaign_metrics:
  - id:
    player_name:
    category: primary_objective
    start_percent:
    meaning:
    rises_when:
    falls_when:
    zero_consequence:
    lock_condition:

  - id:
    player_name:
    category: secondary_requirement
    start_percent:
    meaning:
    rises_when:
    falls_when:
    zero_consequence:
    lock_condition:

  - id:
    player_name:
    category: operational_reserve
    start_percent:
    meaning:
    rises_when:
    falls_when:
    zero_consequence:
    lock_condition:

  - id:
    player_name:
    category: system_integrity
    start_percent:
    meaning:
    rises_when:
    falls_when:
    zero_consequence:
    lock_condition:

recovery_points:
  formula: clamp(4, 12, 11 + time_modifier - incorrect_submissions)
  one_point_effect: raise_one_unlocked_bar_by_one_percent
  bank_cap: 30

victory_gate:
  bars_required: [100, 100, 100, 100]
  additional_scientific_thresholds:
```

Before implementation, produce a mission-by-mission ledger of automatic deltas and the canonical allocation path. Confirm that no ordinary story event accidentally makes the reference path unwinnable.

---

# 26. One-shot starting instruction for the next AI session

Paste this after the project-specific files are attached:

> Read every supplied file before editing. Preserve the central world and premise unless there is a strong reason to change them. First perform the diagnosis, dependency graph, metric design, dramatic spine, character/location plan, clue ledger, numbered concept spine, concept matrix, full stop blueprint, and all audits in this brief. Do not immediately rewrite YAML, JavaScript, JSON, or scene files. Remove or redesign filler orientation tasks that only make the player tour locations or greet people. Replace stop-shaped `s01-...` fixtures with a small set of reusable world-native objects in each place. When the architecture is approved, write all exact player-facing content, including an opening card that naturally and explicitly names the campaign's main academic subject, mission briefing cards, each card's `Worth knowing first` block, compact one-line `Term: definition` glossary entries, short primer concepts, equations with only equation/job/symbols/campaign reason, per-stop 20-to-55-word concrete “why now” reasons, two-sentence 30-to-45-word question setups, 20-to-55-word concrete story-science connections, complete per-stop format payloads, and standalone post-grade answer text, plus stop-linked named-speaker dialogue/world beats, explicit “Mission decision” outcomes, timer/Recovery Point screens, and quick reviews. Keep auxiliary blurbs to one simple sentence. Never embed `answerText`, a keyed result, grading syntax, or an authoring label in a prompt or any other pre-answer field. Make every reason understandable without campaign shorthand, and make every connection name the actual evidence or quantities and the decision they change. DERIVE must show exactly two options per step - one correct and one plausible reviewed common mistake. Use each stop's own quantities, units, candidates, and numbers; never insert a repeated format board, and never print the answer as the panel goal. Make unaided arithmetic mentally manageable, normally ending in an integer or at most one useful decimal. Select each stop's concept number by reading what it teaches, not by blindly accepting a lexical match. For every board, verify that it can be got wrong, its axis names the question's own quantity and unit, and it does not print its answer. Apply the exact TRIGGER, STRESS, ALLOCATE, HOLDOUT, BALANCE, CLOUD, RESIDUAL, and DIAGNOSIS contracts in §15.1; prose placeholders do not count as payloads. Then implement against the repository's actual schema and canonical question formats, recalculate every numerical answer, run the importer and all validators with zero missing interaction-data errors, and play the full campaign on both a wrong-first and right-first path. The final graded stop must be followed by story payoff, not another quiz.
>
> End the opening card with one spoken sentence from the mission authority that names who or what depends on the player, states the campaign-scale outcome, and gives a direct charge to act; reject interchangeable aphorisms, and place no narrator sentence after the quote.
>
> Keep each required Worth knowing first block limited to concepts needed for that mission's four stops. Begin every correct-answer dialogue with quick praise and every mission-completion dialogue with stronger praise. After each mission, offer an optional GO DEEPER secondary brief with exactly six four-option, single-answer questions, one hint per question, and feedback for every option; cover moved enrichment first, and never gate progress or metrics on this review.

---

# 26.1 Latest build gates

Before declaring a campaign implementation-ready, confirm all of the following:

- the first player-facing opening card explicitly names the main academic subject in natural language;
- the opening card ends with one campaign-specific motivational charge that names the people or place at stake, the outcome to secure, and the player's action, with no narrator sentence after it;
- every mission card contains `Worth knowing first` in the order **Glossary terms -> Primer concepts -> Equations first needed today**;
- every item retained in `Worth knowing first` is required by at least one of that mission's four stops, with broader enrichment moved to the optional secondary brief;
- glossary entries are compact one-line `Term: definition` entries;
- no player-facing glossary entry contains a separate `Also called` or `Definition` line;
- every equation primer contains the equation, its job, every symbol, and the campaign-specific reason;
- no player-facing equation primer contains `Also called` or `Concept`;
- the primer prepares the lessons but does not carry essential plot information that should have been in the briefing or beats;
- every briefing body remains four sentences and 30-70 words, with sentence four beginning **“By the end of the mission”**;
- the mission outcome begins **“Mission decision:”** and directly answers that sentence-four promise;
- every question setup is exactly two short sentences totaling 30-45 words;
- after Stop 1, each question setup visibly builds from the prior result;
- every stop has a separate visible “why now” reason;
- every stop declares exactly one area/group and an exact player-facing call;
- every beat fires only on arrival, after named stop(s), or at mission end, and every bubble names its canonical speaker;
- every correct-answer dialogue starts with a quick compliment, and every mission-completion dialogue starts with stronger mission-level praise;
- every mission has one optional GO DEEPER secondary brief containing exactly six questions, each with four options, one correct answer, a hint, and four specific feedback lines;
- every GO DEEPER question is an applied AP-style calculation, prediction, graph interpretation, error analysis, procedure choice, or evidence-based conclusion, with no “distinguish X from related ideas” vocabulary template;
- GO DEEPER covers relevant briefing concepts omitted from the four required stops before revisiting required-stop content through new values or evidence;
- optional deeper review never changes metrics, Recovery Points, mission completion, or next-mission access;
- auxiliary card, fixture, location, and scene blurbs are one simple sentence;
- filler orientation games based on racing around, greeting people, or touring locations are absent;
- fixtures are persistent world-native objects, reused where appropriate, and every placement resolves to a declared fixture;
- every nonplain stop carries the complete canonical interaction payload and answer text;
- every structured board is derived from its own stop's quantities, units, candidates, and numbers rather than a repeated format template;
- every structured board can be answered incorrectly, uses the question's exact quantity and unit on its axis, and keeps its keyed answer out of the pre-answer panel;
- TRIGGER, STRESS, ALLOCATE, HOLDOUT, BALANCE, CLOUD, RESIDUAL, and DIAGNOSIS satisfy the full format-specific contracts in §15.1;
- no prose placeholder is being passed off as a structured board;
- every stop reason, story setup, and story-science connection performs its own role without copying a sentence or premise across fields;
- every formula shown to the player or stored as a displayed payload formula is a named relation whose quantity, inputs, and relevant units are explained before use;
- every DERIVE setup and prompt displays the complete starting relation, and the derivation preserves its left side and active operator through the named result;
- every DERIVE step displays exactly two choices: one correct line and one plausible, reviewed common-mistake line marked `survives: true`;
- every stop carries exactly one author-reviewed numbered course-concept entry in range, and the count matches the actual stop headers;
- every person-stop group has a named roster owner and every dialogue bubble has a named speaker;
- unaided calculations use mental-math-friendly values and no more than one useful decimal place;
- `Answer text` does not merely repeat `Correct result`, and every wrong option has its own mechanism-specific rebuttal;
- all glossary, readability, throughline, character, location, metric, and importer checks pass.

## 26.2 Prerequisite-order gate

Build and verify a learner-facing prerequisite ledger before handback. For every named rule, theorem, law, identity, equation, distribution, or operation used in a required stop or optional GO DEEPER question, record:

- the first mission where the full idea is introduced to the player;
- the first stop or review question that requires the player to use it;
- any prerequisite operation the idea depends on;
- the exact briefing line that supplies the definition, conditions, equation, symbols, and use.

The first introduction must occur before, or in the Worth knowing first block immediately preceding, the first required use. A formula shown without its conventional name does not count as introducing that name when a later prompt asks the player to apply the named rule. A name without the rule's conditions or usable relationship also does not count as an introduction.

Check prerequisite depth as well as wording. For example, L'Hopital's rule cannot be assigned before differentiation has been introduced, even if the rule itself is printed on the card. If a stop is moved earlier and its prerequisites do not move safely with it, swap in a stop whose prerequisites are already available and move the dependent stop later.

Apply the same ordering rule to optional review. GO DEEPER may broaden or reinforce concepts introduced by that point, but it must not quietly require a later course tool. Run the ledger audit after every stop swap or mission reorder, and report every violation found and repaired in the handback notes.

Add these pass conditions to final QA:

- every named rule or equation has a learner-facing introduction at or before its first use;
- every introduction includes the conditions needed to know when the rule applies;
- every dependent operation has already been taught;
- conventional names used in prompts match the names provided in the briefing;
- required stops and optional review both pass the same chronological audit.

# 27. Final standard

The campaign is ready only when a player can experience each mission as one understandable arc:

> I know what just happened. I know where to go. I know what I am trying to find out. The mission card gives me the terms, ideas, and equations I need before I start. Each task gives me the next piece I need. The final task lets me make the promised decision. I see what changed because of that decision. I understand the ideas I can now use. The next problem follows from what I just did.

That continuity is the standard for every subject, world, and campaign.
