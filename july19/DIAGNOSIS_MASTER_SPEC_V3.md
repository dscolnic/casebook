# Diagnosis — Master Game, Logic, Graphics, and Build Specification

**Version:** 3.0  
**Date:** 2026-07-19  
**Status:** Authoritative standard for future Diagnosis games  
**Supersedes:** the original L1/L2/L3 contract, intermediate depth-hardening notes, and earlier graphics guidance

---

## 1. What a Diagnosis game is

**Diagnosis** is a browser-based educational game about reasoning from instruments.

The player enters one real, measurable system—such as a bridge, telescope, spacecraft power system, crop field, bioreactor, data center, or water-treatment plant—and must identify the cause that fits the **entire instrument panel**.

The game teaches one transferable habit:

> **The loud reading gets your attention. The right explanation fits the whole panel.**

A Diagnosis game is not a trivia quiz, a hidden-information mystery, or a vocabulary-matching exercise. The player should succeed by understanding:

1. how the system normally moves mass, energy, force, information, fluid, heat, commands, or material;
2. what each instrument measures directly;
3. which different causes can initially produce the same headline symptom;
4. how normal and quiet readings eliminate rivals;
5. when two independently supported causes must be present at once.

The educational balance should be approximately:

- **50% system operation and physical mechanism**;
- **50% sensing, cross-checking, and differential reasoning**.

---

## 2. Non-negotiable design principles

Every game must satisfy all of the following.

### 2.1 Full-panel reasoning

The complete reading panel is shown in every round. The player does not pay to inspect readings, unlock sensors, or choose a limited subset.

Difficulty comes from **overlap among plausible causes**, not from hiding evidence.

### 2.2 Calm readings matter

At least one normal, stable, or reassuring reading should eliminate a plausible rival in each round. A normal reading is evidence because it shows that an expected consequence of a wrong explanation did **not** occur.

### 2.3 The alarm is a symptom, not a diagnosis

The presenting alarm should be compelling but nonspecific. It may establish that something is wrong without revealing why.

### 2.4 Mechanisms, not labels

Answer choices explain mechanisms. The player should distinguish causes by their expected system-wide consequences, not by matching a sensor name to an answer name.

### 2.5 The validator is a floor, not a quality oracle

A mathematically valid puzzle can still be poor if it is cluttered, arbitrary, repetitive, or inelegant.

Do not add micro-decoys, extra sensors, or contrived artifacts merely to satisfy a depth calculation. Prefer a small set of meaningful alternatives and an understandable physical “aha.”

### 2.6 Graphics support reasoning

The schematic is a diagnostic map, not decoration. It should show where energy, material, force, information, or control flows and where each measurement belongs.

No text, arrow, number badge, or component should obscure another.

---

## 3. Standard deliverables

A completed game normally includes:

1. **`dpack_<id>.js`** — editable source data pack;
2. **`<id>_playable.html`** — fully standalone playable page;
3. optional validation output;
4. optional preview image;
5. inclusion in a multi-game `index.html` launcher.

### 3.1 Standalone HTML requirement

Each individual playable HTML file must contain:

- inline CSS;
- inline JavaScript;
- embedded pack data;
- inline SVG graphics;
- no external fonts, images, scripts, stylesheets, APIs, or data files.

It must open directly from disk in a modern browser without a local server or internet connection.

A launcher may link to separate playable pages and therefore requires the full folder.

---

## 4. Standard game shape

Each standard game contains:

- one real, instrumentable domain;
- one role stated in the second person;
- one educational introduction;
- one schematic reused in all rounds;
- normally **5–7 visible candidate causes**;
- up to **8 candidates** only when every distinction is materially different and the answer panel remains usable;
- exactly one benign or dismissal candidate;
- at least 6 meaningful readings, normally 8–12;
- at least 3 measurement zones;
- exactly 2 salient or “loud” readings;
- one constant reassuring red-herring status;
- 3 rounds in the order **L2 → L3 → L4**;
- score out of 3, based on the player’s first submission in each round.

The labels **L2**, **L3**, and **L4** are authoring and validation terms only. They must never appear in the player-facing interface.

---

## 5. Candidate causes

### 5.1 Candidate-set rules

- The same candidate set appears in all three rounds.
- Each candidate has a short label and one-sentence mechanism.
- Exactly one candidate is the dismissal or benign state.
- The dismissal is never a correct single answer.
- The dismissal is never part of the L4 pair.
- The L2 and L3 answers must differ.
- Candidate order must not create a library-wide position pattern.

### 5.2 Reusing causes in L4

An L4 pair **may** reuse one or both earlier single-round answers when the compound case teaches genuinely new reasoning—for example:

- an interaction whose combined response is worse than either single-fault model;
- a cascade with independently established timing;
- one fault masking or amplifying another.

Do not forbid reuse merely to satisfy a meta-rule. However, a final round that simply places the two earlier answers side by side with no emergent logic is weak.

A new cause in L4 is welcome, but not mandatory.

### 5.3 Avoid micro-decoys

Do not fill the answer list with several nearly identical sensor biases merely to increase matrix depth. Merge alternatives when the player would learn the same lesson from both.

An eighth choice is justified only when it represents a genuinely different system state, such as:

- real occupancy versus broken rail versus maintenance shunt;
- load surge versus lost generation versus degraded storage;
- cloud versus focus versus tracking versus detector calibration.

---

## 6. Educational introduction

The first screen should contain approximately **150–300 words**, divided roughly evenly between system operation and sensing.

### 6.1 System operation

Explain:

- the system’s purpose;
- the main components;
- what flows through it;
- how the components interact;
- how control is normally maintained;
- the major classes of failure.

### 6.2 Sensing and diagnosis

Explain:

- the major instrument families;
- what each measures directly;
- what must be inferred;
- why one reading is rarely decisive;
- how expected operations can resemble faults;
- how redundant or independent measurements resolve ambiguity.

### 6.3 Recommended four-card structure

1. **How the system works**
2. **How it can lose control**
3. **What the instruments measure**
4. **Why context and cross-checks matter**

End with a concise takeaway about fitting the whole panel.

After play begins, retain a small **How this system works** button that returns to the introduction.

### 6.4 Scope note

For medical, military, industrial, emergency, security, or safety-critical domains, include a compact note that the game is educational and does not replace professional or operational procedures.

Military games should teach public engineering principles and avoid tactical, classified, platform-specific, or operationally sensitive detail.

---

## 7. Player-facing interface

### 7.1 Desktop layout

The game should show:

- title and domain;
- round and score pills;
- introduction link;
- schematic and sensor key;
- case briefing;
- alarming and reassuring poles;
- answer choices;
- full reading panel;
- post-answer resolution.

### 7.2 Narrow-screen order

On phone-sized screens, the order should be:

1. case briefing and answer choices;
2. schematic;
3. collapsible sensor key;
4. full reading panel;
5. resolution.

A long sensor key should be collapsed behind a **Show sensor key** control.

### 7.3 Do not show

Do not show:

- difficulty-level labels;
- a permanent logic ladder before the player answers;
- hidden or locked readings;
- repeated instructions to click readings;
- long subtitles inside the main header;
- redundant restatements of the same alarm in every section.

### 7.4 Answer behavior

For L2 and L3:

- clicking one answer submits immediately;
- the first submission determines the score;
- the correct answer is highlighted;
- the resolution appears after submission.

For L4:

- the player may select one or two normal answer cards;
- selecting a third deselects or is disallowed;
- a separate submit button is used;
- there is no synthetic combined answer card.

---

## 8. Readings

Each reading must have:

- a unique ID;
- a concise name;
- a plain-language purpose;
- a meaningful zone;
- a numbered map callout;
- one value in every round;
- one predicted token in every candidate signature.

### 8.1 Reading-card hierarchy

Each card displays, in this order:

1. **raw observed value**;
2. **reference, expected, typical, or baseline value**;
3. **what the measurement watches and what it cannot prove alone**.

Good observations:

- `28.1 → 25.9 V / 12 s`
- `Command +8°; measured +7.6°`
- `1.18 kW; command 640 W`
- `0.01 m/s vertical`
- `11,400 counts/mL`

Bad observations:

- `dangerous voltage collapse`;
- `failed actuator`;
- `abnormal sensor`;
- `propulsion loss confirmed`.

Interpretation belongs in the player’s reasoning and the post-answer explanation, not in the raw value.

### 8.2 Purpose text

A purpose should state:

1. what is directly measured;
2. what physical changes can move it;
3. at least one ambiguity or limitation.

Example:

> Measures flow through the evaporator fans. Low flow can follow fan failure or blocked circulation; normal motor speed does not guarantee that air reaches the product.

### 8.3 No decorative sensors

Every reading should matter in at least one round or eliminate a credible rival. Avoid adding sensors merely to fill a diagram.

---

## 9. Signature model

Each hypothesis predicts one categorical token for every reading.

```js
sig: {
  busv: 'down',
  battcur: 'high',
  array: 'normal',
  load: 'high'
}
```

The displayed values must physically and semantically agree with the token.

### 9.1 Matching

A candidate matches a reading subset when its signature equals the observed token on every reading in that subset.

### 9.2 Minimum solving depth

The minimum solving depth is the smallest number of readings whose combined token pattern leaves only the correct answer.

For L3, quiet depth is calculated only among candidates surviving both salient readings.

For L4, pair-isolation depth is the smallest number of readings whose combined coverage leaves exactly one unordered pair.

---

## 10. Round 1 — L2: two-reading intersection

### 10.1 Required structure

- Neither salient reading alone identifies the answer.
- At least one rival shares salient reading A.
- A different rival shares salient reading B.
- The two salient readings together identify the answer.
- No single reading anywhere on the panel uniquely identifies the answer.
- Minimum solving depth is exactly **2**.

The intended reasoning shape is:

```text
Reading A leaves multiple candidates
Reading B leaves multiple candidates
A + B leave one candidate
Quiet readings confirm the mechanism
```

### 10.2 Reject L2 when

- one reading is a naked single;
- the salient pair is still shared;
- a quiet assay directly names the answer;
- the answer choice merely repeats the decisive observation.

---

## 11. Round 2 — L3: loud tie plus quiet combination

### 11.1 Required structure

- At least **3 candidates** match both salient readings.
- The loud readings do not distinguish the answer.
- No single quiet reading uniquely identifies the answer among the loud finalists.
- Minimum quiet solving depth is at least **2**; depth 2 is the standard target.
- Each required quiet clue remains consistent with at least one rival by itself.
- The required quiet clues should preferably use different zones or measurement types.
- Exactly one candidate fits the full panel.

Intended reasoning:

```text
Both loud readings leave at least three finalists
Quiet clue 1 removes some, but not all, rivals
Quiet clue 2 removes a different rival
The combination identifies the answer
```

### 11.2 Good L3 archetypes

- independent-clue intersection;
- temporal ordering or lag;
- spatial localization, gradient, or propagation;
- controlled intervention or response test;
- authorization or provenance;
- expected consequence that is absent;
- ratio, balance, or relational mismatch;
- real-versus-artifact first, mechanism second.

### 11.3 Riddle style

The L3 question should state the underlying physical distinction without listing the answer choices.

Weak:

> Is this cloud, gain drift, or bad focus?

Better:

> Did fewer photons reach the observatory, or did one detector merely count them differently?

### 11.4 Reject L3 when

- one loud reading decides it;
- fewer than three finalists survive the loud pair, unless the domain makes three impossible and the exception is documented;
- one quiet reading is an answer key;
- the question tells the player exactly which sensor to inspect;
- more than one candidate fits the full panel.

---

## 12. Round 3 — L4: uniquely forced compound diagnosis

### 12.1 Required structure

- Exactly two non-dismissal causes are declared in `compound`.
- No single candidate explains the full observed panel.
- Exactly one unordered pair explains or covers the full panel.
- Each cause contributes at least **2 independently supported readings**.
- The evidence should span at least **3 zones** when the domain permits.
- Every single candidate leaves at least **2 contradictions or unexplained readings**.
- No subset of 1, 2, or 3 readings isolates the pair.
- Minimum pair-isolation depth is at least **4**.

The final round should feel qualitatively harder, not merely longer.

### 12.2 Separable-pair coverage

For independent or separable causes, a pair covers a reading when either member predicts the observed token.

```js
pairCoversReading(a, b, reading) =
  sig[a][reading] === observed[reading] ||
  sig[b][reading] === observed[reading]
```

The pair closes only if it covers every observed reading.

### 12.3 Interacting pairs

For nonlinear interactions, ordinary OR coverage is not enough. The pack must explicitly state the compound-only behavior.

Examples:

- high load through a high-resistance battery produces more sag than either single-fault model;
- reduced cooling capacity during a workload surge creates a temperature rise beyond either envelope;
- one fault masks another in an aggregate reading.

Use a structured `interaction` or `compoundSignature` field containing:

- readings involved;
- prediction for cause A alone;
- prediction for cause B alone;
- observed combined behavior;
- declared closing pair.

### 12.4 Good L4 archetypes

- independent simultaneous faults;
- interacting faults;
- cascade with established order;
- real demand plus failed protection;
- real event plus contradictory sensor;
- masking or compensation;
- common-cause split;
- real event plus unrelated benign process.

### 12.5 Reject L4 when

- a single cause fits;
- more than one pair closes;
- one member contributes only one giveaway clue;
- the pair isolates with fewer than four readings;
- one member is the dismissal;
- the final pair is only a trivial recombination of earlier answers;
- the contradiction exists only in prose and is not encoded in readings;
- the pair is merely plausible rather than forced.

---

## 13. Constant paradox and round rotation

Every round juxtaposes:

- a changing alarming pole, `poleA`;
- the same reassuring status, `reassuring`.

The reassuring status should be genuinely comforting but not dispositive—for example:

- regulation loop active;
- chlorine residual on target;
- tracking enabled;
- pressure hull dry;
- signal logic healthy.

Prefer a different presenting alarm in each round so the player does not learn one universal starting gauge. Repetition is permitted only when the repeated symptom is pedagogically central and the inference paths remain clearly different.

---

## 14. Writing standard

### 14.1 Tone

Use confident, concrete, lightly atmospheric prose. Aim for good science journalism rather than a textbook or procedure manual.

Explanations should be accessible to an interested high-school reader while remaining technically defensible.

### 14.2 Hook

One or two sentences establishing the scene. It should create urgency without solving the case.

### 14.3 Riddle

One focused diagnostic question. It should pose the conceptual distinction rather than enumerate the candidates.

### 14.4 Wrong-answer reasons

For each wrong candidate:

1. acknowledge what it explains;
2. cite a specific value or relationship that defeats it.

Good:

> Shadowing shares the low-voltage, high-discharge pair, but array current remains 31.0 A and Sun-pointing error is only 1.1°.

Weak:

> Shadowing is wrong because the array is normal.

### 14.5 Resolution

After submission, show:

- the diagnosis;
- what physically happened;
- why the loud evidence was insufficient or required combination;
- which quiet or normal readings mattered;
- why major rivals failed;
- a post-answer deduction tree;
- a three-node cause → mechanism → consequence chain;
- one transferable lesson.

The deduction tree is revealed only after the answer.

---

## 15. Schematic purpose

The schematic must answer three questions at a glance:

1. **What are the major components or zones?**
2. **What flows between them?**
3. **Where is each reading taken?**

The drawing should be a simplified cutaway, flow diagram, system map, or spatial field—not an ornamental illustration.

Use the same schematic in all three rounds so the player develops a mental model of the domain.

---

## 16. Standard SVG canvas and safe regions

### 16.1 Canvas

Use:

```js
schematic: {
  viewBox: '0 0 520 390',
  svg: `...`
}
```

Recommended border:

- outer rectangle around approximately `x=12, y=12, width=496, height=366`;
- corner radius about 24;
- keep all visible content inside the border.

### 16.2 Protected regions

Do not put an internal title, subtitle, or footer sentence inside the SVG. The page already supplies a **System map** heading and a numbered sensor legend.

Reserve:

- top callout band around `y=30–45`;
- bottom callout band around `y=345–360`;
- left callout band around `x=25–35`;
- right callout band around `x=485–495`;
- central system area approximately `x=65–455`, `y=65–325`.

These bands prevent numbers from covering system labels.

---

## 17. Numbered reading callouts

### 17.1 Pin meaning

In the clean schematic system, `readings[id].pin` is the center of the **numbered perimeter badge**, not necessarily the physical sensor location.

The actual physical measurement location is shown by a thin leader line terminating in a small anchor dot.

### 17.2 Badge design

For a 520 × 390 viewBox:

- badge radius: approximately **10.5 units**;
- outline: cyan, approximately 3 units;
- fill: dark map background;
- number: white, bold, approximately 10–11 units;
- badges render after all schematic content so they remain readable.

### 17.3 Placement

Default to perimeter positions:

- left: `x ≈ 30`;
- right: `x ≈ 490`;
- top: `y ≈ 35`;
- bottom: `y ≈ 355`.

Spread badges across multiple sides rather than stacking all readings on one edge.

Minimum badge-center spacing:

- **55 SVG units** preferred;
- **45 units absolute minimum** only for unusually dense maps and only after screenshot review.

No badge may overlap:

- another badge;
- a component label;
- a flow arrowhead;
- the outer border;
- a major component edge in a way that hides its shape.

### 17.4 Sensor names

Do not write the full sensor name beside the number inside the SVG. The number maps to the sensor key and reading cards below the figure.

This is the main defense against clutter.

---

## 18. Leader lines and anchors

### 18.1 Leader-line design

Leader lines should be:

- thin and visually subordinate;
- neutral blue-gray;
- approximately 1.0–1.5 units wide;
- orthogonal or gently bent;
- no arrowheads;
- normally no more than 3 segments;
- routed around labels and major flow arrows.

Terminate the line in a small anchor dot, approximately 2–3 units in radius, at the physical measurement point.

### 18.2 Routing order

Recommended path:

1. move inward from the badge;
2. travel along an open horizontal or vertical lane;
3. turn toward the component;
4. end at the anchor.

Avoid diagonal leaders crossing the system unless a diagonal route is clearly the cleanest option.

### 18.3 Current-engine contract

The current engine appends the numbered badges from `readings[id].pin`. Therefore:

- leader lines and anchor dots must be included in `schematic.svg`;
- each leader line must begin near the corresponding pin coordinate;
- the source pack and embedded HTML pack must remain synchronized.

A future engine may add a separate `anchor:{x,y}` field and generate leaders automatically, but that is not required by the current playable format.

---

## 19. Component labels

### 19.1 What to label

Label only the major components or zones needed to understand the system, normally **4–7 labels**.

Examples:

- atmosphere;
- telescope optics;
- detector;
- mount + guider;
- solar array;
- main bus;
- battery;
- chiller plant;
- rack row.

Do not duplicate every reading name inside the drawing.

### 19.2 Label capsules

Place component names inside protected dark capsules:

- dark fill with strong opacity;
- subtle outline;
- 10–11 unit bold font;
- sufficient horizontal padding;
- normally 21–25 units high;
- located outside the component or in a deliberately empty interior region.

A capsule must not overlap:

- a numbered badge;
- a leader line endpoint;
- another label;
- a flow arrow;
- important component detail.

### 19.3 Text limits

Keep labels short—usually one to three words. Put detailed explanation in the sensor key, introduction, and reading cards.

---

## 20. Flow arrows and system shapes

### 20.1 Flow arrows

Use flow arrows only for meaningful movement:

- power;
- water;
- air;
- heat;
- commands;
- light;
- train progression;
- biological feed or gas.

Use a dedicated open lane. An arrow must never run through a label or badge.

Limit arrow width and arrowhead size so they do not dominate the figure.

### 20.2 Z-order

Recommended SVG order:

1. definitions and background;
2. main components;
3. internal details;
4. primary flow arrows;
5. component label capsules;
6. leader lines;
7. anchor dots;
8. numbered badges added by the engine.

Flow arrows should remain behind label capsules. Leader lines should remain behind badges.

### 20.3 Shape complexity

Use enough detail to make the system recognizable, but simplify aggressively.

The player should recognize the system at normal browser size without zooming. Avoid dense machinery drawings, tiny symbols, decorative piping, and repeated internal grids that compete with the readings.

---

## 21. Graphics acceptance criteria

A schematic passes only when all of the following are true.

### 21.1 Automated geometry checks

- zero badge–badge collisions;
- zero badge–label collisions;
- zero label–label collisions;
- minimum badge spacing meets the standard;
- every reading has a pin;
- every pin lies inside the viewBox;
- at least 3 meaningful zones are represented;
- broad horizontal and vertical coverage;
- no external image assets.

### 21.2 Human screenshot review

Automated checks are not enough. Review screenshots at:

- normal desktop width;
- narrow/mobile width;
- optionally a large/high-DPI width.

The reviewer must confirm:

- labels are readable;
- no arrows pass through words;
- no badge obscures a label or component;
- leader lines are traceable;
- the physical flow is understandable;
- the map is not visually empty or excessively dense;
- the alarm pin highlight remains legible.

A figure that technically has zero bounding-box collisions may still fail if it looks confusing.

---

## 22. Data-pack schema

```js
module.exports = { PACK: {
  id: 'short_id',
  title: 'Player-facing title',
  domain: 'Domain description',
  role: 'You are the ...',

  scopeNote: 'Optional educational-scope note.',

  intro: {
    title: 'How this system works',
    lead: '150–300 word introduction split across lead and cards.',
    cards: [
      { title: 'Normal operation', body: '...' },
      { title: 'Failure mechanisms', body: '...' },
      { title: 'What instruments measure', body: '...' },
      { title: 'Why cross-checks matter', body: '...' }
    ],
    takeaway: 'The loud reading ...'
  },

  system: {
    parts: [
      ['Component', 'Plain-language explanation'],
      ['Component', 'Plain-language explanation']
    ],
    soWrong: 'Why the same symptom can have multiple causes.'
  },

  schematic: {
    viewBox: '0 0 520 390',
    svg: `<!-- components, labels, flows, leaders, anchors; no badges -->`
  },

  salient: ['reading_a', 'reading_b'],

  readings: {
    reading_a: {
      name: 'Reading name',
      purpose: 'What it measures, what changes it, and its limitation.',
      pin: { x: 30, y: 105 },
      zone: 'zone_name'
    }
  },

  hypotheses: {
    cause_a: {
      label: 'Cause label',
      choice: 'One-sentence mechanism.',
      call: {
        title: 'Operational diagnosis title.',
        arg: 'What the diagnosis means.'
      },
      sig: {
        reading_a: 'token',
        reading_b: 'token'
      }
    }
  },

  dismissal: 'benign_cause',

  reassuring: {
    lab: 'Status label',
    val: 'Reassuring status',
    note: 'Why it does not rule out the problem.'
  },

  rounds: [
    {
      answer: 'cause_a',
      alarm: 'reading_a',
      poleA: { lab: '...', val: '...', note: '...' },
      hook: '...',
      riddle: '... <span class="q">Question?</span>',
      vals: {
        reading_a: {
          observed: 'raw value',
          reference: 'expected range'
        }
      },
      reasons: {
        wrong_cause: 'What fits, then the value that defeats it.'
      },
      resolve: {
        title: 'Correct diagnosis',
        paras: ['What happened.', 'Why the logic worked.'],
        why: { loud: '...', quiet: '...' },
        chain: ['Cause', 'Mechanism', 'Outcome'],
        take: 'Transferable lesson.'
      },
      logic: [
        ['Clue or clue combination', 'Candidates remaining']
      ],
      challenge: {
        level: 'L2',
        archetype: 'intersection',
        evidenceModes: ['...', '...']
      }
    },

    { /* L3 */ },

    {
      answer: 'cause_a',
      compound: ['cause_a', 'cause_b'],
      observed: {
        reading_a: 'token'
      },
      /* same player-facing fields */
      challenge: {
        level: 'L4',
        archetype: 'interaction',
        compoundMode: 'interaction',
        evidenceChains: [
          { cause: 'cause_a', readings: ['r1', 'r2'] },
          { cause: 'cause_b', readings: ['r3', 'r4'] }
        ],
        interaction: {
          readings: ['r1', 'r2', 'r3', 'r4'],
          singleA: 'Prediction for A alone',
          singleB: 'Prediction for B alone',
          combined: 'Observed compound behavior',
          closesFor: ['cause_a', 'cause_b']
        }
      }
    }
  ],

  design: {
    visual: {
      layout: 'short controlled layout name',
      palette: 'short palette name',
      flow: 'short flow description'
    },
    challenges: [ /* structural metadata */ ]
  }
}};
```

---

## 23. Engine behavior contract

The current standalone engine should:

- derive `ids` from `Object.keys(PACK.readings)`;
- append numbered badges after the static SVG;
- make each badge scroll to its reading card;
- render the sensor key from the same reading order;
- highlight only the presenting alarm pin in red;
- render raw value, reference, and purpose for every reading;
- disable answer choices after first submission;
- score only the first submission;
- render the full explanation after submission;
- support one- or two-choice L4 submission;
- preserve the introduction link;
- support mobile reordering and collapsible sensor key.

The editable `.js` pack and embedded HTML pack must contain identical data.

---

## 24. Logic validator requirements

### 24.1 L2 output

Print:

- candidates remaining after each salient reading;
- naked-single readings;
- all solving pairs;
- minimum full-panel solving depth.

Pass condition:

```text
no naked single
salient pair uniquely identifies answer
minimum depth = 2
```

### 24.2 L3 output

Print:

- loud finalists;
- quiet naked singles;
- minimum quiet depth;
- all minimum solving quiet sets;
- zones and evidence types used.

Pass condition:

```text
at least 3 loud finalists
no quiet naked single
quiet depth >= 2
exactly one full-panel answer
```

### 24.3 L4 output

Print:

- declared pair;
- all full-panel closing pairs;
- minimum pair-isolation depth;
- readings contributed by each member;
- contradictions left by every single candidate;
- zones in the required evidence set.

Pass condition:

```text
no single cause fits
exactly 1 pair closes
pair depth >= 4
each member contributes >= 2 readings
each single leaves >= 2 contradictions
```

### 24.4 Interaction validator

For interaction rounds, additionally verify:

- pair-only behavior is explicitly declared;
- each single-fault prediction differs from the observation;
- the combined prediction closes only for the declared pair;
- any numeric envelope or balance stated in prose agrees with displayed values.

---

## 25. Visual validator requirements

The visual checker should inspect at least:

- pin count equals reading count;
- all pins are in bounds;
- pin spacing;
- pin-label collisions;
- label-label collisions;
- pin-pin collisions;
- protected callout bands;
- text count and readable font size;
- broad map coverage;
- zone coverage;
- no external assets;
- no title, subtitle, or footer prose embedded in the SVG;
- leader line from each perimeter pin area to a physical anchor.

The final acceptance still requires screenshot review.

---

## 26. Library-level diversity

A set of games must vary not only by topic but by formal reasoning structure.

For a library of roughly ten games:

- use at least **4 L3 archetypes**;
- use at least **4 L4 archetypes**;
- no L3 archetype should dominate more than about 3 games;
- no L4 archetype should dominate more than about 3 games;
- neighboring launcher entries should not repeat both the same L3 and L4 forms;
- avoid putting a sensor artifact in the same round position repeatedly;
- avoid making every L4 two unrelated mini-puzzles;
- distribute correct answer positions deliberately;
- do not place the L2 answer first in every game or repeat one L3 position throughout the library.

The validator should check actual structure rather than trusting free-text archetype labels.

Examples:

- temporal cases require real timestamps or ordering;
- intervention cases require command-before/after response;
- provenance cases require physical state plus authorization record;
- spatial cases require location, gradient, or propagation;
- protection cases require a real demand and failed safeguard;
- sensor-contradiction cases require independent corroboration;
- interaction cases require pair-only behavior.

---

## 27. Factuality and safety

- Use real components and real measurement principles.
- Use physically defensible failure modes.
- Check technical facts with primary or authoritative sources.
- Do not invent mechanisms to make the matrix work.
- Use plausible units and values.
- If actual values are proprietary, variable, sensitive, or unavailable, label values as normalized or illustrative.
- Avoid tactical, classified, emergency-response, or professional operating instructions.
- Do not imply that the game represents a specific military platform, proprietary factory, medical protocol, or live industrial procedure unless authoritative public evidence supports it.

---

## 28. Recommended authoring workflow

### Step 1 — Define the system lesson

Write one sentence describing the system balance or control loop the player should understand.

### Step 2 — Build the failure-mode matrix

Choose 5–7 materially different causes and list what each should do to each potential reading.

### Step 3 — Select readings

Choose 8–12 readings that:

- span several zones;
- use different measurement methods;
- include useful normal readings;
- can distinguish the chosen causes without artificial clues.

### Step 4 — Design L2 mathematically

Create a two-reading intersection with no naked single.

### Step 5 — Design L3 mathematically

Create a three-way loud tie broken by two quiet clues using a controlled archetype.

### Step 6 — Design L4 mathematically

Create one uniquely closing pair with at least four required readings and two evidence chains.

### Step 7 — Write player-facing values

Convert tokens into raw, plausible observations and references without interpretive flags.

### Step 8 — Write prose

Write hook, riddle, choices, wrong-answer reasons, and resolution after the logic is stable.

### Step 9 — Draw the schematic

Use the perimeter-callout system, component capsules, protected lanes, and leader lines.

### Step 10 — Build standalone HTML

Embed the pack in the standard engine.

### Step 11 — Validate

Run:

- JavaScript syntax check;
- L2/L3/L4 logic validator;
- structural pack validator;
- graphics collision audit.

### Step 12 — Human review

Play all three rounds and inspect desktop and mobile screenshots.

Ask:

- Is the answer forced?
- Is the insight elegant?
- Are the alternatives educational?
- Is the figure readable immediately?
- Does the final round teach something new?

---

## 29. Required build checklist

### Game structure

- [ ] One domain and one reusable schematic
- [ ] 5–7 candidates, or documented 8-choice exception
- [ ] Exactly one dismissal
- [ ] Three rounds in L2 → L3 → L4 order
- [ ] Full panel visible every round
- [ ] Score based on first submission

### Logic

- [ ] L2 has no naked single
- [ ] L2 minimum depth is 2
- [ ] L3 has at least 3 loud finalists
- [ ] L3 has no quiet naked single
- [ ] L3 quiet depth is at least 2
- [ ] L4 has no fitting single
- [ ] Exactly one L4 pair closes
- [ ] L4 pair depth is at least 4
- [ ] Each pair member contributes at least 2 readings
- [ ] Every single leaves at least 2 contradictions
- [ ] Interaction cases define compound-only behavior

### Education and writing

- [ ] Introduction is approximately half system and half sensing
- [ ] Every purpose explains meaning and limitation
- [ ] Values are raw and references are separate
- [ ] Answer choices explain mechanisms
- [ ] Wrong-answer reasons cite values
- [ ] Normal readings matter
- [ ] Resolution teaches the reasoning move
- [ ] L3 riddle does not list the finalists

### Graphics

- [ ] 520 × 390 SVG viewBox
- [ ] No internal title, subtitle, or footer prose
- [ ] 4–7 short component labels
- [ ] Component labels use protected capsules
- [ ] Reading badges primarily use perimeter bands
- [ ] Badge radius approximately 10.5
- [ ] Preferred badge spacing at least 55 units
- [ ] Leader lines terminate at physical anchors
- [ ] No badge–badge collision
- [ ] No badge–label collision
- [ ] No label–label collision
- [ ] No arrow through text
- [ ] Flow direction is understandable
- [ ] Desktop screenshot reviewed
- [ ] Mobile screenshot reviewed

### Interface and technical

- [ ] No visible level labels
- [ ] L4 uses normal multi-select cards
- [ ] No synthetic combined answer
- [ ] Sensor key collapses on mobile
- [ ] Case appears before map on mobile
- [ ] Introduction link remains available
- [ ] Standalone HTML has no dependencies
- [ ] `.js` and embedded pack are synchronized
- [ ] `node --check` passes
- [ ] HTML opens directly from disk

---

## 30. Final quality standard

A strong Diagnosis game should make the player feel:

1. **“Several explanations really do fit at first.”**
2. **“That normal or quiet reading changes everything.”**
3. **“Now I understand how this system and its instruments work.”**
4. **“The final case could not be solved by guessing one obvious flag.”**

The master standard in one sentence:

> **Build a clean standalone three-round game in which L2 requires a two-reading intersection, L3 preserves a loud three-way tie until at least two quiet clues combine, and L4 requires a uniquely forced two-cause explanation supported by at least four readings—presented on a collision-free schematic whose numbered callouts never obscure the system.**
