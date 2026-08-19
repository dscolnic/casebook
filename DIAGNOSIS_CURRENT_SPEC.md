# Diagnosis — Current Authoring and Validation Specification

**Status:** Authoritative current standard  
**Supersedes:** the original L1/L2/L3 authoring contract and all intermediate notes  
**Standard progression:** **L2 → L3 → L4**

---

## 1. Purpose

**Diagnosis** is a browser-based educational game about differential reasoning from instruments.

The player is placed inside one measurable system and must identify the explanation that fits the **entire panel of readings**, including calm and normal readings. The goal is not vocabulary recall. It is to learn how to:

1. understand how a system normally works;
2. understand what its instruments actually measure;
3. preserve several plausible explanations at first;
4. combine independent clues;
5. reject explanations that fit the loud alarm but fail elsewhere; and
6. recognize when no single diagnosis can explain a contradictory panel.

The central transferable rule is:

> **The loud reading gets your attention. The right explanation fits the whole panel.**

The educational balance should be approximately **50% system operation and 50% sensing/diagnostic reasoning**.

---

## 2. Standard pack shape

Every standard game contains:

- one real, instrumentable domain;
- one recognizable schematic or system-flow map;
- a pre-game educational introduction;
- exactly **five** candidate causes;
- exactly one dismissal or benign explanation;
- at least six readings across at least three meaningful zones;
- exactly two salient, headline readings;
- one constant reassuring red-herring status;
- three rounds, in this order:
  - Round 1: L2;
  - Round 2: L3;
  - Round 3: L4;
- a different presenting alarm in each round;
- the complete reading panel visible in every round;
- score out of three, based on the first submission in each round.

The terms **L2**, **L3**, and **L4** are authoring and validation labels only. They must not appear in the player-facing interface.

### Candidate rules

- All five candidates remain available in all three rounds.
- Each choice contains a short label and a one-sentence mechanism.
- Exactly one candidate is the dismissal.
- The dismissal is never a correct single answer and is never part of the L4 pair.
- The L2 and L3 answers must be different.
- At least one member of the L4 pair must not already have been a correct single answer.
- Correct answer positions should vary across a library; do not create positional meta-patterns.

---

## 3. Educational introduction

The first screen should contain approximately **150–300 words** and be split roughly evenly between:

### How the system works

Explain:

- the system’s purpose;
- what moves through it: mass, energy, information, force, fluid, blood, commands, money, etc.;
- its main components;
- how one part affects another; and
- the major ways control can be lost.

### How the system is sensed

Explain:

- the major instrument families;
- what each measures directly;
- what must be inferred;
- why one sensor is rarely decisive;
- what environmental, procedural, or instrumentation effects can mimic a true fault; and
- why normal readings are useful evidence.

A useful four-card structure is:

1. normal operation;
2. control or failure mechanisms;
3. what the instruments measure;
4. why cross-checks and false signals matter.

End with one concise takeaway about fitting the complete panel.

After play begins, retain a small **How this system works** control that returns to the introduction.

For medical, military, industrial, security, or emergency domains, state that the game is educational and not a substitute for professional or operational procedures.

---

## 4. Player-facing interface

The main screen should include:

- a short title;
- round number and score;
- the small introduction link;
- the schematic;
- the presenting case;
- the five answer choices;
- the full reading panel;
- post-answer reasoning and resolution.

Do not include:

- visible difficulty labels;
- a permanent logic ladder before submission;
- repeated instructions to click sensors;
- a long subtitle that crowds the header;
- hidden or unlockable readings;
- repeated prose that restates the same alarm in the header, hook, pole, and reading card.

### Standalone delivery

Each `*_playable.html` must be a genuinely standalone file:

- inline CSS;
- inline JavaScript;
- embedded pack data;
- inline SVG;
- no external script, stylesheet, image, font, or data dependency;
- no web server required for normal play.

A multi-game launcher may link to separate HTML files and therefore requires the full folder.

---

## 5. Reading cards

Each reading card follows this hierarchy:

1. **Raw observed value**
2. **Typical, baseline, expected, or reference value**
3. **Plain-language purpose and limitations**

Examples of good raw observations:

- `92.0 → 105.5 m / 75 s`
- `Command +9°; measured −6°`
- `27% of scheduled shaft speed`
- `+0.01 m/s vertical`
- `14 checksum errors / 10 min`

Avoid interpretive headlines such as:

- “dangerous dive”;
- “failed actuator”;
- “abnormal current”;
- “bad sensor”;
- “propulsion loss confirmed.”

Every reading must have:

- a name;
- a meaningful schematic pin;
- a zone;
- a purpose explaining what it measures, what can change it, and what it cannot prove alone.

Display strings must agree with the signature tokens.

Do not include decorative readings that never matter. Normal readings should often eliminate a plausible rival.

---

## 6. Answer choices and prose

Each answer choice contains:

1. a concise diagnosis label;
2. one sentence explaining its mechanism and expected evidence.

The choice must educate without echoing the current decisive clue so directly that vocabulary matching gives away the answer.

### Hook

One or two sentences establishing the scene. It should not solve the case.

### Riddle

A focused diagnostic question. In L3 it should pose the deeper distinction rather than name the exact two finalists.

### Wrong-answer reasons

For each wrong candidate:

1. acknowledge what it explains;
2. cite a specific reading or value that defeats it.

### Resolution

After submission, show:

- the correct diagnosis;
- what physically happened;
- why the loud evidence was insufficient or needed combining;
- which quiet or normal readings mattered;
- why major rivals failed;
- a short post-answer deduction tree;
- a three-node cause → mechanism → consequence chain; and
- one transferable lesson.

The deduction tree appears only after the player answers.

---

## 7. Signature model

Each hypothesis predicts one token for every reading.

For a single-cause round, the observed token vector is normally the answer’s signature.

A candidate matches a subset of readings when its tokens equal the observed tokens on every reading in that subset.

### Minimum solving depth

The **minimum solving depth** is the smallest number of readings whose combined token pattern leaves exactly one candidate: the answer.

For L3, quiet-depth calculations are performed only among candidates that survive both salient readings.

For L4, pair-isolation depth is the smallest number of readings whose combined pair coverage leaves exactly one unordered candidate pair: the declared pair.

---

## 8. Round 1 — L2: two-reading intersection

### Required structure

- Neither salient reading alone uniquely identifies the answer.
- The pair of salient readings uniquely identifies the answer.
- At least one rival shares salient reading A.
- A different rival shares salient reading B.
- No single reading anywhere on the full panel may uniquely identify the answer.
- The minimum solving depth must be **exactly two readings**.

Required reasoning shape:

```text
Reading A leaves several candidates
Reading B leaves several candidates
A + B leave one candidate
Quiet readings corroborate the mechanism
```

Reject L2 if:

- one reading is a naked single;
- the salient pair is shared;
- a quiet assay or self-test directly names the answer;
- the answer choice repeats the decisive reading.

---

## 9. Round 2 — L3: loud tie plus two quiet clues

### Required structure

- At least **three candidates** match both salient readings.
- The loud readings do not distinguish the answer.
- No single quiet reading uniquely identifies the answer among the loud finalists.
- The minimum quiet solving depth must be at least **two readings**; two is the standard target.
- Each required quiet clue must individually remain consistent with at least one rival.
- The quiet clues should preferably use different measurement types or zones.
- Exactly one candidate fits the full panel.

Preferred reasoning shape:

```text
Both loud readings leave at least three finalists
Quiet clue 1 removes some, but not all, rivals
Quiet clue 2 removes a different rival
The combination identifies the answer
```

### L3 archetypes

A library should deliberately vary the deeper reasoning move. Controlled examples include:

- intersection of independent quiet clues;
- temporal ordering;
- spatial localization or propagation;
- controlled intervention or response test;
- authorization/provenance;
- missing expected consequence;
- relational lag, ratio, or gradient;
- hierarchical real-vs-artifact then mechanism diagnosis.

Reject L3 if:

- a loud reading decides it;
- only two candidates survive the loud readings in the standard design;
- one quiet reading is an answer key;
- the riddle explicitly tells the player which exact cross-check to inspect;
- multiple candidates fit the full panel.

---

## 10. Round 3 — L4: significantly harder, uniquely forced pair

### Required structure

- The round declares exactly two non-dismissal causes in `compound`.
- No single candidate explains the full panel.
- Exactly one unordered pair covers every observed reading.
- The player selects up to two of the normal five answer cards and submits.
- There is no synthetic combined sixth answer.
- Both pair members must contribute real, independently supported evidence.
- Each pair member must contribute at least **two readings** to its evidence chain.
- The pair evidence should span at least **three zones** when the system permits.
- Every single-cause candidate must leave at least **two confirmed contradictions** or unexplained readings.
- No subset of one, two, or three readings may uniquely isolate the pair.
- The minimum pair-isolation depth must be at least **four readings**.

A correct L4 should feel qualitatively harder than L2 and L3, not merely longer.

### Pair coverage for separable compounds

A pair covers a reading if at least one member predicts the observed token.

```js
pairCoversReading(a,b,r) =
  sig[a][r] === observed[r] ||
  sig[b][r] === observed[r]
```

The pair closes only when it covers every observed reading.

### Valid L4 archetypes

- independent simultaneous faults;
- real event + failed protection;
- cascade, with evidence establishing order;
- masking or compensation;
- real event + contradictory/failed sensor;
- interacting faults with an explicit compound signature;
- common-cause split;
- real event + unrelated benign process.

For nonlinear `interaction` cases, the pack must explicitly define any compound-only signature rather than pretending ordinary OR coverage predicts it.

Reject L4 if:

- a single cause fits;
- more than one pair closes;
- one pair member contributes only one giveaway clue;
- the pair can be isolated with fewer than four readings;
- one member is the dismissal;
- both members merely repeat the two earlier single answers;
- the contradiction is asserted only in prose rather than encoded in readings;
- the pair is plausible but not forced.

---

## 11. Constant paradox and round rotation

Every round juxtaposes:

- one changing alarming pole (`poleA`); and
- the same reassuring red-herring pole (`reassuring`).

The reassuring status must be genuinely calming but not dispositive.

The presenting alarm should change across the three rounds so the player cannot treat one gauge as the game’s universal starting point.

The candidate list is fixed, but the correct reasoning path and answer position should rotate.

---

## 12. Schematic and graphics

Use one inline SVG per domain, reused across all three rounds.

### Required qualities

- recognizable physical cutaway or logical flow;
- distinct labeled zones;
- each reading pin placed where the measurement physically or logically occurs;
- meaningful spatial clustering of evidence;
- clear flow direction when relevant;
- sufficient contrast;
- no text collisions;
- no tiny labels over complex shapes;
- no pin overlap;
- broad use of the map area;
- graphic elements that support reasoning rather than decorate it.

### Recommended automated visual checks

- at least 24 meaningful SVG elements for a complex physical system;
- at least five readable diagram labels;
- at least four represented measurement zones;
- minimum pin-to-pin distance of roughly 24 SVG units;
- broad horizontal and vertical pin coverage;
- no external image assets;
- screenshot review at desktop and narrow widths.

---

## 13. Library-level logic diversity

Scientific subject diversity is not enough. The formal deduction structures must also vary.

For a library of approximately ten games:

- use at least **three L3 archetypes**;
- use at least **four L4 archetypes**;
- no L3 archetype should appear more than four times;
- no L4 archetype should appear more than three times;
- neighboring games in the launcher should not repeat both the same L3 and L4 structures;
- answer positions should not repeat more than about twice per single-answer round;
- do not always use a sensor artifact in L3;
- do not always use two independent mini-puzzles in L4.

The checker must not trust free-text family names alone. It should verify structural requirements, such as:

- temporal archetype has ordered timestamps;
- intervention archetype has command-before/after response;
- spatial archetype uses location, gradient, or arrival structure;
- protection-failure archetype includes a real demand and a failed safeguard;
- masking archetype includes an aggregate reading made deceptively normal by opposing effects;
- sensor-contradiction archetype includes independent corroboration against an isolated channel;
- interaction archetype defines pair-only behavior.

---

## 14. Factual and safety standard

- Use real components, real instruments, and physically defensible failure modes.
- Verify technical domains with primary or authoritative sources.
- Do not invent a mechanism to satisfy the signature matrix.
- Values and units must be plausible for the explicitly stated scenario.
- When real platform values are proprietary, sensitive, variable, or unavailable, use clearly labeled normalized or illustrative test values rather than implying operational specifications.
- Do not provide tactical, classified, emergency-response, or professional operating instructions.
- Military-domain games should teach public engineering principles, not tactics or platform-specific procedures.

---

## 15. Recommended pack fields

```js
module.exports = { PACK: {
  id,
  title,
  domain,
  role,

  intro: {
    title,
    lead,
    cards:[{title,body}, ...],
    takeaway
  },

  system: {
    parts:[[title, explanation], ...],
    soWrong
  },

  schematic:{ viewBox, svg },
  salient:['readingA','readingB'],

  readings:{
    readingA:{ name, purpose, pin:{x,y}, zone },
    ...
  },

  hypotheses:{
    cause:{
      label,
      choice,
      call:{title,arg},
      sig:{ readingA:'token', ... }
    },
    ...
  },

  dismissal,
  reassuring:{lab,val,note},

  rounds:[
    {
      answer,
      alarm,
      poleA:{lab,val,note},
      hook,
      riddle,
      vals:{
        readingA:{observed,reference},
        ...
      },
      reasons:{ cause:'...', ... },
      resolve:{
        title,
        paras:['...','...'],
        why:{loud,quiet},
        chain:['cause','mechanism','outcome'],
        take
      },
      logic:[[clue,result], ...],
      challenge:{level:'L2'|'L3',archetype,...}
    },

    { /* L3 */ },

    {
      answer,
      compound:['causeA','causeB'],
      observed:{ readingA:'token', ... },
      ...,
      challenge:{
        level:'L4',
        archetype,
        compoundMode,
        evidenceChains:[
          {cause:'causeA',readings:['r1','r2']},
          {cause:'causeB',readings:['r3','r4']}
        ]
      }
    }
  ],

  design:{
    visual:{layout,palette,flow},
    challenges:[...]
  }
}};
```

---

## 16. Required validator outputs

For L2, print:

- candidates remaining after each salient reading;
- minimum full-panel solving depth;
- all solving pairs;
- any naked-single readings.

For L3, print:

- loud finalists;
- quiet naked singles;
- minimum quiet depth;
- solving quiet sets;
- zones and evidence modes of the solving clues.

For L4, print:

- declared pair;
- all full-panel closing pairs;
- minimum pair-isolation depth;
- readings uniquely contributed by each member;
- number of contradictions left by every single candidate;
- zones represented in the required evidence set.

A standard pack passes only when it derives to:

```text
Round 1 → L2, minimum depth 2
Round 2 → L3, ≥3 loud finalists, no quiet single, quiet depth ≥2
Round 3 → L4, one closing pair, pair depth ≥4, ≥2 clues per member
```

---

## 17. Build checklist

### Logic

- [ ] Exactly five candidates
- [ ] Exactly one dismissal; never correct or in L4
- [ ] L2 and L3 answers differ
- [ ] At least one L4 member is new as a correct cause
- [ ] L2 has no naked single and minimum depth 2
- [ ] L3 has at least three loud finalists
- [ ] L3 has no quiet naked single
- [ ] L3 quiet depth is at least 2
- [ ] L4 has no perfect single match
- [ ] Exactly one pair closes
- [ ] L4 pair depth is at least 4
- [ ] Each L4 member has at least two supporting readings
- [ ] Every single candidate leaves at least two contradictions in L4

### Education

- [ ] Intro is approximately half system and half sensing
- [ ] All reading purposes explain meaning and limitations
- [ ] Answer choices teach mechanisms
- [ ] Normal readings matter
- [ ] Resolution teaches the reasoning move

### Writing

- [ ] Raw observation first
- [ ] Reference second
- [ ] Explanation below
- [ ] No clue names the diagnosis
- [ ] Different presenting alarm each round
- [ ] No redundant prose
- [ ] High-school-accessible explanations

### Interface and graphics

- [ ] No visible difficulty labels
- [ ] Full panel always visible
- [ ] L4 uses max-two multi-select
- [ ] No combined sixth answer
- [ ] Post-answer deduction tree only
- [ ] Small introduction link retained
- [ ] Clear schematic and meaningful pins
- [ ] Standalone HTML has no external dependencies

### Technical

- [ ] `node --check` passes
- [ ] Logic validator passes
- [ ] Visual audit passes
- [ ] HTML opens directly from disk
- [ ] Desktop and narrow-width screenshots reviewed

---

## 18. Current standard in one sentence

> Build a standalone three-round game in which L2 requires a two-reading intersection, L3 requires a three-way loud tie broken by at least two quiet clues, and L4 requires a uniquely forced two-cause explanation that cannot be isolated with fewer than four readings.
