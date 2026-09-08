# FIRST PERSON LEARNING

# MASTER CAMPAIGN DESIGN AND IMPLEMENTATION BRIEF

## Story-first cumulative AP campaigns for ChatGPT, Claude, and Claude Code

**Version 2.1 - adds engine-complete interaction payloads, readability gates, per-stop reasons, glossary checks, and measurable keystone retrieval requirements**

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

## 3.6 Build a glossary dependency check

Every player-facing technical term must either be ordinary language, defined before first use, or linked to a definition the player can open. Definitions must not depend on another undefined term.

Audit the glossary as a dependency graph. If a definition of intermolecular forces uses “boiling,” then boiling or boiling point must already be defined in plain language. The same rule applies to every subject: defining one piece of jargon with a second unexplained piece of jargon is not a definition.

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
- introduce the mission authority through an action or one memorable line;
- do not front-load unexplained course jargon;
- do not separately announce a percentage already shown by the campaign bars.

When the card clears:

1. reveal the four-bar campaign HUD at its starting values;
2. activate the Mission 1 briefing icon;
3. keep the player in the normal playable view.

Generic template:

> `[WORLD]` is already trying to accomplish `[CAMPAIGN GOAL]`. `[PLAIN-LANGUAGE SYSTEM EXPLANATION]`. `[DEADLINE]`, and failure means `[HUMAN CONSEQUENCE]`. `[MISSION AUTHORITY]` gives the player responsibility and says, "[SHORT LINE THAT DEFINES THE STANDARD]." `[IMMEDIATE EVENT OR WARNING WITHOUT REPEATING HUD VALUES].`

## 6.2 Opening quality check

After reading only the opening and seeing the four bars, a new player must be able to answer:

- Where am I?
- What are we trying to do?
- How long do we have?
- What happens if we fail?
- What am I responsible for?

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
2. apply named automatic story-event changes to the bars;
3. check whether any bar has reached 0%;
4. show time and incorrect-submission results;
5. calculate and award Recovery Points;
6. allow allocation among unlocked bars or the Recovery Bank;
7. apply any earned 100% lock;
8. show the quick concept review;
9. activate the next briefing.

## 7.6 Post-mission metric screen - exact fields

Every mission specification must include exact player-facing copy for:

```text
Header: MISSION [N] COMPLETE
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
3. **Travel trigger:** names the next destination and explains why the evidence requires the move.
4. **Final-stop beat:** converts the last answer into the mission decision.
5. **Outcome and hook:** gives 45 to 90 seconds of non-quiz play, dialogue, or world change before the metric screen.

Late missions may add a second travel/result beat because they use three locations.

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
```

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
Stop reason - exact player copy: [one short line explaining why this task is needed now]
Question card story setup - exact player copy: [two short sentences, 30-45 words total]
Question card story-science connection - exact player copy: [one sentence]
Question card prompt - exact player copy: [the actual task]
```

## 12.1 Stop-reason rule

The stop reason answers “Why are we doing this today, in this emergency, at this fixture?” It is not a learning objective such as “Practice molarity.” Display it in the call, dialogue, fixture, or short lead-in immediately before the question card.

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

The connection sentence says how the scientific result changes the narrative decision. It should not repeat the setup or give a textbook definition.

Examples:

> If the available feed can already meet the target, overdriving the intake wastes time and may damage the compressor.

> A controlled reversal can prove that the setting changed the rate while leaving the operator's motive unresolved.

> Pressure and total mass cannot certify composition, so an independent assay controls GO or NO-GO.

## 12.4 Question-card scientific content

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
- `answerText` or the engine's canonical answer/explanation field;
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

Include Header, Card title, Go now, a 30-to-70-word four-sentence Card body, and Objective. Maintain failure consequence and later travel as authoring checks; print them only when they add nonredundant player information.

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

Use the current importer/schema as the authority. At minimum, verify these common contracts against the repository version in use:

- **ALLOCATE:** positive pool; at least four uniquely identified items with costs; at least three decision questions; at least one required item; protected items that do not consume the full pool; `answerText`.
- **VALUE:** positive budget; at least four costed options on meaningfully different evidence or action axes; at least one required option; total available cost greater than the budget; `answerText`.
- **ATTEST:** at least four claims with backing status; a numeric verification limit; at least one critical unbacked claim; not every claim already backed; `answerText`.
- **TRACE:** at least four labeled channels/readings; a named shared upstream resource; at least two target-dependent channels; at least one independent channel; `answerText`.
- **CONTROL:** at least three candidate controls with unique IDs; numeric baseline and nonzero response; a noise band smaller than the meaningful response; `answerText`.
- **DEGENERACY:** exactly two controls, each with minimum, maximum, and step; positive tolerance; at least five points on the first locus and three on the second; labeled physical constraint; numeric truth pair; `answerText`.
- **CHAIN:** at least four uniquely identified transfers with labels and carried quantity; an order that names at least four required transfers exactly once; no more than two decoys; governing relationship; `answerText`.
- **TRIGGER:** one decision rule; numeric scale with minimum and maximum; no more than four numeric anchors; explicit objective, direction, and consequence limit; `answerText`.
- **STRESS, RESIDUAL, VERIFY, and BALANCE:** the format's own named data block, visible readings, the correct action or conclusion, and `answerText`.
- **DIAGNOSIS:** headline, readings, candidate explanations, and one keyed correct diagnosis.
- **PROTOCOL:** scenarios, possible responses, and the keyed mapping.
- **CASEBOOK:** evidence rows, labels, readings, and keyed interpretation.
- **SCIENCETANK:** proposals, evidence, constraints, and recommended allocation.
- **PROBE, SWEEP, and HOLDOUT:** available points or settings, readings or revealed data, and the keyed conclusion.

Never replace a missing format block with a generic option list merely to make a stop import. If the importer refuses the format, hold the stop back, add the required data, and retest it.

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

The quick review should be concise and cumulative:

- three to five bullets;
- one idea per bullet;
- plain language first, notation second;
- include at least one “when to use this” idea;
- retrieve earlier concepts when they contributed;
- make the final bullet the **Mission takeaway**, stating the one durable idea the player should carry forward;
- do not ask another graded question after the final campaign decision.

---

# 18. Accessibility and writing standards

## 18.1 Plain language before jargon

Introduce the everyday function first, then the technical name.

Example:

> The reactor combines carbon dioxide and hydrogen to make methane and water. This is the Sabatier reaction.

Not:

> Use the Sabatier stoichiometric model to inspect feed constraints.

## 18.2 Short blurbs, reasons, and two-sentence setups

Question-card story setups should be exactly two short sentences totaling 30 to 45 words. Stop reasons should be a short, concrete “why now” line. Scene blurbs should state the situation concisely, not become a mini-lecture. Put teaching in the story-science connection, mechanism, answer text, and feedback fields.

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
- every term required to understand player-facing copy: defined before use or present in a recursively complete glossary.

These limits apply to player-facing copy, not to designer explanations or scientific mechanism notes.

---

# 19. Internal authoring metadata

Maintain metadata approximately like this for every graded stop, even if some fields remain in the design document rather than shipping files:

```yaml
mission:
stop:

concept:
subconcept:
keystone:
prerequisites:
takes_as_read:

learning_role: introduce | practice | retrieve | combine | transfer
difficulty: L1 | L2 | L3 | L4 | L5
format:

story_role: clue | obstacle | character | reversal | reveal | decision | payoff

briefing_decision:
scene_problem:
player_goal:
reason:

question_story_setup:
question_story_science_connection:
question_prompt:
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
- every mission briefing card;
- every stop reason, two-sentence 30-to-45-word question-card story setup, and story-science connection;
- every beat's bubbles, panel text, world change, and waypoint;
- every exact prompt, format-specific interaction block, result, `answerText`, mechanism explanation, and feedback;
- every mission outcome;
- every metric screen and quick review.

## Step 9 - Audit the throughlines

For every mission, read only:

> card body -> four story setups -> four story-science connections -> mission outcome

Also inspect the visible chain with stop reasons included:

> card body -> stop reason -> story setup -> story-science connection -> result beat -> next stop reason

The chain should make sense without designer notes. Repair any jump.

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
- run word-count, sentence-count, closing-card grade-level, glossary-dependency, and character-first-mention validation;
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
| AP/course concept | Concept and subconcept |
| Keystone tag | Broader recurring concept that materially contributes |
| Prerequisites | What must already be understood |
| Learning role | INTRODUCE/PRACTICE/RETRIEVE/COMBINE/TRANSFER |
| Difficulty | L1-L5 |
| Story role | Clue/obstacle/character/reversal/reveal/decision/payoff |
| Briefing decision | The mission question this stop helps answer |
| Stop reason | Exact short player-facing “why now” line |
| Story setup | Exact two-sentence player copy, 30-45 words total |
| Story-science connection | Exact one-sentence player copy |
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

## 22.4 Character and dialogue audit

- Is each major character introduced while competently doing a job?
- On first mention in each mission, is the character's working role restated?
- Do all names, roles, pronouns, and short forms match the canonical roster and theme files?
- Does each have wants, a blind spot, a domain, and an arc?
- Are disagreements between legitimate constraints?
- Is any character present only to ask questions?
- Are ordinary beats limited to two short bubbles?
- Can essential information be understood without voice, animation, or sound?
- Do greetings and optional dialogue change after revelations?
- Are named character reactions kept out of system-owned closing cards and placed in the preceding beat?

## 22.5 Location audit

- Do Missions 1-4 use exactly one meaningful place each?
- Do Missions 5-10 use exactly two?
- Do Missions 11-15 use exactly three?
- Is distant travel locked until after Mission 4?
- Does evidence cause every move?
- Does each destination offer a fixture, measurement, sample, person, or authority unavailable at the prior location?

## 22.6 Format audit

- Are all formats canonical and currently supported?
- Does each format match the player verb?
- Are decision formats attached to real decisions?
- Are operated formats placed at equipment?
- Are calculation formats placed at suitable boards, rooms, or benches?
- Are too many consecutive stops the same action?
- Are CHOICE and BALLPARK overused?

## 22.7 Interaction-payload audit

- Does every nonplain format include its canonical named data block?
- Do required collections meet their minimum item, point, reading, claim, or candidate counts?
- Are IDs unique and referenced consistently by truth keys and mappings?
- Are budgets, pools, costs, ranges, steps, tolerances, baselines, responses, and limits numerically valid?
- Does each stop provide the canonical `answerText` or current equivalent?
- Does the actual importer accept every stop with zero missing interaction-data errors?
- Have generic option-list fallbacks been rejected for formats that require operated or diagnostic data?

## 22.8 Scientific and grading audit

- Has every numerical result been independently recalculated?
- Do units, formula, keyed answer, explanation, and tolerance agree?
- Are coefficients applied to the correct quantities?
- Are model assumptions visible?
- Are fictional thresholds clearly labeled?
- Do wrong answers teach the mechanism?
- Can a correct student ever fail because the tolerance is centered on a wrong key?

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
- Are removed question-card fields such as `guide` and `takeaway` absent?
- Is color never the only pass/fail signal?
- Are units visible?
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

**Authoring-only failure consequence:** [concrete consequence already expressed in player-facing copy; do not print redundantly]

**Authoring-only later travel:** [unlock and causal reason; do not print “none”]

## Main story happening - designer summary

[State what physically happens, how the four stops cause successive beats, what decision closes the mission, and what new problem follows. Every important sentence here must have a player-facing delivery point below.]

## Designer intent - not shown to player

[One paragraph.]

## Player-facing beat script

### Beat 1 - Arrival | [LOCATION] | automatic after accepting briefing

**Presentation:** [methods]

**Player control:** [pause/continue/restore]

**World state:** [visible condition]

**Dialogue bubbles:** [exact copy]

**Panel/HUD text:** [exact copy]

**Unlocks:** Stop [N].

### Beat 2 - After Stop(s) [...] | [LOCATION] | automatic

[Same fields.]

### Beat 3 - Travel trigger | [FROM] to [TO] | automatic

[Same fields; evidence must cause travel.]

### Beat 4 - After final stop | [LOCATION] | automatic decision

[Same fields.]

### Beat 5 - Mission outcome and hook | [LOCATION] | automatic

[Same fields.]

## Location plan

**[One/Two/Three] locations:** [stop-by-stop route and causal travel explanation.]

## Characters and dramatic beat

[Who wants what, conflict, and relationship change.]

## Key concepts, explained here

[Plain-language explanation of concepts and narrative use.]

## Stop [#] - [TITLE]

**Format/placement:**

**Metadata:** concept; keystone; prerequisites; learning role; difficulty; story role.

**Stop reason - exact player copy:** [one short line explaining why this task is needed now]

**Question card story setup - exact player copy:** [exactly two short sentences, 30-45 words total]

**Question card story-science connection - exact player copy:** [one sentence]

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

> Read every supplied file before editing. Preserve the central world and premise unless there is a strong reason to change them. First perform the diagnosis, dependency graph, metric design, dramatic spine, character/location plan, clue ledger, concept matrix, full stop blueprint, and all audits in this brief. Do not immediately rewrite YAML, JavaScript, JSON, or scene files. When the architecture is approved, write all exact player-facing content, including the opening card, mission briefing cards, per-stop “why now” reasons, two-sentence 30-to-45-word question setups, story-science connections, complete format-specific interaction payloads and answer text, stop-linked dialogue/world beats, explicit “Mission decision” outcomes, timer/Recovery Point screens, and quick reviews. Then implement against the repository's actual schema and canonical question formats, recalculate every numerical answer, run the importer and all validators with zero missing interaction-data errors, and play the full campaign on both a wrong-first and right-first path. The final graded stop must be followed by story payoff, not another quiz.

---

# 27. Final standard

The campaign is ready only when a player can experience each mission as one understandable arc:

> I know what just happened. I know where to go. I know what I am trying to find out. Each task gives me the next piece I need. The final task lets me make the promised decision. I see what changed because of that decision. I understand the ideas I can now use. The next problem follows from what I just did.

That continuity is the standard for every subject, world, and campaign.
