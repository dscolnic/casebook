# Ballpark — Full Current Specification and Future Authoring Handoff

**Canonical version:** Real-facts, equation-chain, shared-number-bank edition  
**Last consolidated:** July 2026  
**Reference engine:** `ballpark_casebook_61_real_facts_specific_clues.html`  
**Reference data:** `ballpark_casebook_61_real_facts_specific_clues_data.json`

> This document supersedes every earlier Ballpark specification, prototype, and handoff.
>
> Do **not** revert to the original slider/convergence game, two-factor pairing game, decoy-tile game, or fictional case-model dataset.

---

# 1. What Ballpark is now

Ballpark is an educational estimation and numerical-reasoning game.

The player sees:

- one coherent topic;
- four related quantitative questions;
- every factor name;
- every factor unit;
- every operator;
- a short, specific clue describing what each factor represents;
- one shared bank of numerical values.

The player must decide which number belongs in each named factor slot.

The educational goals are:

1. learn memorable magnitudes about real things;
2. understand how quantities combine;
3. reason from units and likely scale;
4. distinguish related facts from one another;
5. improve an answer using structured feedback.

The game is not primarily a test of arithmetic. The arithmetic is visible and simple. The challenge is matching real numbers to meaningful quantities.

---

# 2. Current game mechanic

Each topic game contains exactly:

- **4 equations**
- **2 equations with 2 factors**
- **2 equations with 3 factors**
- **10 factor slots total**
- **10 unique numerical choices**
- **3 rounds**

The operators are already shown. The player does not choose multiplication or division.

The player can:

- drag a number into a factor slot; or
- click a number, then click a slot.

Every number is used exactly once.

After each submitted round, each equation is marked:

- **Right**
- **Too high**
- **Too low**
- **Right total, misplaced**

The game also identifies each individual component that is correct.

Correct components:

- turn green;
- lock in place;
- cannot be removed;
- are removed from the remaining problem.

A completely correct equation also locks.

After round 3, or when all equations are correct, the reveal shows:

- the full factual question;
- the correct numerical chain;
- the final answer;
- an explanation;
- a factual note for each component;
- source links.

---

# 3. Scoring

Each equation is worth:

- **3 points** if solved in round 1;
- **2 points** if solved in round 2;
- **1 point** if solved in round 3;
- **0 points** if not solved.

Maximum score:

```text
4 equations × 3 points = 12 points
```

Correct individual components help the player but do not directly add points.

---

# 4. Topic-to-Casebook relationship

When Ballpark is paired with Casebook:

- use the Casebook id for one-to-one mapping;
- use the Casebook discipline and science concepts to choose the domain;
- retain the Casebook title only as a companion label if desired;
- do not use the fictional incident as a numerical dataset;
- do not reveal the hidden cause, culprit, bait, clue answer, or investigative conclusion.

The governing principle is:

> **Casebook supplies the domain. Real-world sources supply the numbers.**

The Ballpark questions may move well beyond the fictional case.

Example:

A fictional wildfire case may produce a Ballpark game about:

- the documented area burned in a real fire season;
- the capacity of a real firefighting aircraft;
- the energy released by dry wood;
- the travel time of a real fire front at a published spread rate.

It should not ask for invented Pinehaven acreage, fictional evacuation counts, or a made-up fuel load.

---

# 5. Priority: learning numbers worth remembering

Every question must pass this test:

> Would a curious player be glad to know this magnitude after the game?

Strong targets include:

- the depth of Challenger Deep;
- the energy of the Chelyabinsk airburst;
- the number of lines on the Rosetta Stone;
- the length of a famous bridge;
- annual ridership of a real transit system;
- typical adult cardiac output;
- energy stored in a named grid battery;
- sound travel time through a real ocean depth;
- the number of yards in a regulation football field;
- a published dose, threshold, capacity, or population.

Weak targets include:

- a fictional building’s assumed floor area;
- a made-up town population;
- an invented operating rate;
- a “rounded case-model estimate”;
- an unsupported number chosen only to make an equation convenient.

A mechanically valid equation can still be a bad Ballpark question.

---

# 6. Acceptable numerical inputs

Every factor value must be one of the following.

## 6.1 Published measured fact

Examples:

- measured depth;
- reported span;
- official population;
- observed annual total;
- documented mass;
- recorded attendance.

## 6.2 Published historical fact

Examples:

- number of ships;
- traditional line count;
- launch mass;
- years of operation;
- catalogued artifact dimensions.

## 6.3 Defined conversion or constant

Examples:

- seconds per minute;
- metres per kilometre;
- kilograms per tonne;
- joules per kilotonne of TNT;
- pi;
- Avogadro’s constant.

## 6.4 Published standard or regulatory value

Examples:

- dose limit;
- design threshold;
- pitch dimensions;
- blood-alcohol limit;
- safety separation.

## 6.5 Published typical or representative value

Use when no single exact value exists.

Examples:

- typical resting cardiac output;
- representative speed of sound in seawater;
- typical pack energy density;
- typical snow density.

It must be clearly described as:

- typical;
- representative;
- approximate;
- a rounded value within a published range.

## 6.6 Transparent calculation from factual inputs

The final answer may be newly calculated.

Example:

```text
official annual ridership ÷ days per year
```

The answer need not itself be quoted by a source if every input is traceable and the arithmetic is transparent.

---

# 7. Prohibited numerical inputs

Do not use:

- fictional case measurements;
- unsupported “reasonable assumptions”;
- numbers invented to create variety;
- false precision;
- fake conversions;
- altered constants;
- duplicate values disguised by formatting;
- one equation’s answer as another equation’s input;
- a rounded or converted form of an earlier answer;
- vague adjustment factors;
- synthetic rates created by multiplying other facts together;
- a precise number with no identifiable source.

Forbidden descriptions include:

- “A rounded case-model estimate”
- “Assumed for this fictional system”
- “Representative value for the case”
- “Modeled incident quantity”
- “Planning-scale value for this scenario”

If a value cannot be defended, redesign the equation.

---

# 8. Four-question topic design

All four questions must belong to one recognizable domain, but they should teach different aspects of it.

A strong set often includes:

1. a famous real object or event;
2. a physical scale or conversion;
3. a rate, time, capacity, or throughput;
4. a human, operational, economic, or environmental consequence.

Example: **Deep ocean and submersibles**

1. Sonar round-trip time to Challenger Deep
2. Hydrostatic pressure at a real depth
3. Descent time of a documented submersible
4. Energy or oxygen endurance of a real vehicle

Do not make all four questions different ways to estimate the same answer.

Do not make Question 2 depend on Question 1.

---

# 9. Required factor-count pattern

Each topic must have the sorted factor pattern:

```text
[2, 2, 3, 3]
```

That means:

- two 2-factor equations;
- two 3-factor equations;
- ten values total.

The equations may appear in any order.

No equation may contain:

- 1 factor;
- 4 or more factors.

---

# 10. Good equation shapes

Use a variety of forms.

## Two-factor forms

```text
count × amount per item
rate × time
distance ÷ speed
total ÷ amount per unit
area × loading per area
power × time
diameter × pi
reported value × conversion
```

## Three-factor forms

```text
count × rate per item × time
area × depth × fraction
mass × speed × conversion
rate × duration ÷ conversion
power × efficiency × time
population × fraction × frequency
sample rate × channels × duration
length × width × depth
```

## Avoid

- multiplying by 1;
- padding with a meaningless factor;
- two routine conversions in one equation;
- obscure algebra;
- unnecessarily nested conversions;
- arbitrary “efficiency” factors with no source;
- a three-factor equation that is really a two-factor equation with filler.

At most one routine conversion factor per equation is preferred.

---

# 11. Arithmetic order

The engine evaluates from left to right.

For:

```js
factors: [A, B, C],
ops: ["×", "÷"]
```

the result is:

```text
(A × B) ÷ C
```

Do not assume conventional precedence beyond the visible chain.

Allowed operators:

```js
"×"
"÷"
"+"
```

Addition should be rare and used only when it represents a genuine sum.

Required:

```js
ops.length === factors.length - 1
```

---

# 12. The shared number bank

The ten factor values form one shuffled number bank.

Required:

- exactly 10 values;
- all numeric `value` fields unique;
- all `display` strings unique;
- each value belongs to exactly one factor;
- no factor shares a value with another factor;
- no final answer equals a factor value;
- no value is reused in another equation.

Do not fake uniqueness.

Bad:

- changing 1,000 into 999;
- using 5, 5.0, and 5.00;
- altering a real constant;
- using an incorrect conversion.

If two equations naturally require the same value, redesign one equation.

---

# 13. Question wording before reveal

Before reveal, the question should identify the estimation task but should not state the numerical givens.

Current format may be compact:

> Chelyabinsk energy: estimate the result in joules using the real-world facts below.

The reveal may use the fuller wording:

> About how many joules of energy did the 2013 Chelyabinsk airburst release?

No bank value may appear in:

- the title;
- topic tag;
- context;
- vocabulary;
- question wording;
- factor label;
- factor clue.

Proper names containing numbers are allowed when unavoidable, such as Apollo 11.

---

# 14. Factor labels

A factor label names the exact quantity.

Good:

- `Depth of Challenger Deep`
- `Seconds per minute`
- `Mean diameter of Apophis`
- `Rosetta Stone Greek lines`
- `Regulation field length`
- `Typical resting cardiac output`

Bad:

- `Distance`
- `Value A`
- `Conversion factor`
- `Amount`
- `Rate`
- `Case estimate`

Labels must be semantically distinct. Two factors in the same topic should not be interchangeable.

---

# 15. Factor clues: the most important writing rule

Each factor has a player-facing `playDesc`.

The clue must identify the exact fact or relationship without revealing its numerical value.

The clue should answer:

1. What specific quantity is this?
2. What object, event, population, standard, or period does it refer to?
3. Why is it meaningful in this equation?
4. Is it exact, reported, approximate, or typical?

## Good specific clues

- `The number of yards from one goal line to the other on a regulation American football field.`
- `NASA/JPL’s approximate energy estimate for the 2013 fireball.`
- `The reported depth of the deepest known point in the ocean.`
- `The number of preserved Greek lines documented on the Rosetta Stone.`
- `The number of seconds corresponding to one minute.`
- `A representative sound speed used for a simple seawater travel-time calculation.`
- `The United States population reported by the 2020 Census.`
- `The traditional number of books into which the Iliad is divided.`

## Bad generic clues

- `A sourced real-world fact or defined conversion; use its unit and likely scale to choose a value.`
- `Use the units to estimate the number.`
- `A published quantity.`
- `A defined conversion.`
- `A real-world fact.`
- `The relevant value for this equation.`

The rejected generic placeholder must never appear:

```text
A sourced real-world fact or defined conversion; use its unit and likely scale to choose a value.
```

## Conversion clue pattern

Do not merely say `Defined time conversion`.

Write:

- `The number of seconds corresponding to one minute.`
- `The number of metres corresponding to one kilometre.`
- `The number of kilograms in one metric tonne.`
- `The energy in joules equivalent to one kilotonne of TNT.`
- `The ratio of a circle’s circumference to its diameter.`

## Typical-value clue pattern

Write:

> A representative sound speed used for a simple ocean-acoustics estimate; the real value varies with temperature, salinity, and pressure.

Do not write:

> Sound speed estimate.

---

# 16. `desc` versus `playDesc`

Each factor has two explanatory fields.

## `playDesc`

Shown during play.

It must:

- be specific;
- help the player understand the quantity;
- not disclose the value;
- not cite a raw URL;
- remain concise enough for the equation card.

## `desc`

Shown after reveal.

It may:

- be more explicit;
- name the institution;
- explain approximation conditions;
- discuss why the fact matters;
- identify the source context.

Example:

```js
playDesc:
  "The reported depth of the deepest known point in the ocean."

desc:
  "A modern reported depth for Challenger Deep from the cited oceanographic source."
```

The two may be identical when the original description is already specific and concise.

---

# 17. Vocabulary and free educational help

Each topic should include 3–6 terms.

Definitions should:

- remove jargon barriers;
- use plain language;
- not disclose numerical values;
- clarify units or scientific concepts;
- be useful even before playing.

Good:

**Discharge**  
The volume of water passing a point during a unit of time.

Bad:

**Discharge**  
About 480 cubic metres per second.

The free help should teach concepts. Numerical placement remains the puzzle.

---

# 18. Source requirements

Every nontrivial factor must be traceable to a source.

Each factor should contain:

```js
source: {
  label: "NASA — Apophis facts",
  url: "https://...",
  accessed: "2026-07-18"
}
```

Each equation should also include a deduplicated `sources` array for reveal links.

Preferred source hierarchy:

1. government scientific or statistical agency;
2. official operator, institution, museum, or standards body;
3. peer-reviewed paper;
4. university or professional society;
5. high-quality reference work;
6. reputable secondary source only when necessary.

Strong source families include:

- NASA
- NOAA
- USGS
- CDC
- NIH
- WHO
- NIST
- EPA
- DOE
- EIA
- Census Bureau
- BLS
- NTSB
- FAA
- FRA
- official museums, libraries, transit systems, utilities, and operators
- peer-reviewed literature
- recognized standards bodies

Do not use:

- unsourced blogs;
- random fact sites;
- AI summaries as sources;
- search-result snippets;
- pages that do not actually support the value.

---

# 19. Time-sensitive facts

Facts that change must state:

- year;
- geography;
- relevant reporting frame.

Good:

- `United States population in the 2020 Census`
- `2024 annual passenger journeys`
- `Area burned in Canada during the 2023 fire season`
- `Installed U.S. wind capacity at the end of 2025`

Bad:

- `Population`
- `Annual riders`
- `Area burned`
- `Wind capacity`

When authoring new games, verify current facts on the web.

---

# 20. Exact, reported, approximate, and typical wording

Use honest qualifiers.

## Defined

> The number of seconds in one hour.

## Reported

> NASA’s reported mean diameter.

## Approximate

> NASA/JPL’s approximate energy estimate.

## Typical

> A typical resting value for a healthy adult.

Do not present a typical range midpoint as a universal exact fact.

Do not add false decimal precision.

---

# 21. No answer chaining

One equation’s result may never be used as another equation’s factor.

This prohibition includes:

- exact reuse;
- rounded reuse;
- converted reuse;
- renamed reuse;
- a disguised bundled factor;
- a rate manufactured from a previous answer.

Bad:

1. Calculate annual energy.
2. Use annual energy to calculate homes served.

Better:

1. Calculate annual energy from real plant parameters.
2. Calculate homes served independently from a published operator comparison or separate real inputs.

Each question must stand alone.

---

# 22. No numerical leakage

Search all pre-reveal text for the ten display values and four answers.

Check:

- title;
- tag;
- context;
- vocabulary;
- `q`;
- factor `label`;
- `playDesc`.

The number belongs only in:

- `value`;
- `display`;
- the placed tile;
- the reveal.

---

# 23. Current data schema

A topic is one object in `const GAMES = [...]`.

```js
{
  id: "bp_e_asteroid",
  title: "Asteroids and Planetary Defense",
  casebookTitle: "The Hollow Vale Impact",
  tag: "asteroids · impacts · planetary defense",

  context:
    "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",

  terms: [
    [
      "Kilotonne of TNT",
      "An energy comparison unit used for explosions and impacts."
    ],
    [
      "Momentum",
      "Mass multiplied by velocity."
    ]
  ],

  eqs: [
    {
      id: "chely_energy",

      q:
        "Chelyabinsk energy: estimate the result in joules using the real-world facts below.",

      revealQ:
        "About how many joules of energy did the 2013 Chelyabinsk airburst release?",

      unit: "joules",

      factors: [
        {
          id: "chely_energy_f0",
          label: "Chelyabinsk energy",
          unit: "kilotonnes of TNT",
          value: 440,
          display: "440",

          playDesc:
            "NASA/JPL’s approximate energy estimate for the 2013 fireball.",

          desc:
            "NASA/JPL’s approximate energy estimate for the 2013 fireball.",

          source: {
            label: "NASA/JPL — Chelyabinsk fireball facts",
            url: "https://www.jpl.nasa.gov/...",
            accessed: "2026-07-18"
          }
        },

        {
          id: "chely_energy_f1",
          label: "Joules per kilotonne of TNT",
          unit: "joules per kilotonne",
          value: 4184000000000,
          display: "4,184,000,000,000",

          playDesc:
            "The energy in joules equivalent to one kilotonne of TNT.",

          desc:
            "Defined energy conversion.",

          source: {
            label: "NIST — SI units and conversions",
            url: "https://www.nist.gov/...",
            accessed: "2026-07-18"
          }
        }
      ],

      ops: ["×"],

      answer: 1840960000000000,
      answerDisplay: "1,840,960,000,000,000",

      explain:
        "Convert NASA’s kilotonne estimate into joules.",

      sources: [
        {
          label: "NASA/JPL — Chelyabinsk fireball facts",
          url: "https://www.jpl.nasa.gov/...",
          accessed: "2026-07-18"
        },
        {
          label: "NIST — SI units and conversions",
          url: "https://www.nist.gov/...",
          accessed: "2026-07-18"
        }
      ]
    }
  ],

  sourceSummary:
    "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
}
```

---

# 24. Field definitions

## Topic fields

### `id`

Unique stable id.

For Casebook-linked topics:

```text
bp_<casebook-id>
```

### `title`

Plain-language real-world topic title.

### `casebookTitle`

Companion mapping label. It should not influence the numbers.

### `tag`

Three or four short domain terms separated by `·`.

### `context`

Two or three spoiler-free sentences.

It should explain that values are real, sourced, typical, or defined.

It must not reveal bank values.

### `terms`

Array of:

```js
["Term", "Plain-language definition."]
```

### `eqs`

Exactly four equation objects.

### `sourceSummary`

Short statement about source quality.

---

## Equation fields

### `id`

Unique within the topic.

Use lowercase snake case.

### `q`

Compact pre-reveal task.

Must not contain bank values.

### `revealQ`

Full factual wording shown after play.

### `unit`

Final answer unit.

### `factors`

Exactly 2 or 3 factor objects.

### `ops`

Exactly one fewer operator than factors.

### `answer`

Exact numeric result using stored values.

### `answerDisplay`

Readable result string.

### `explain`

One or two sentences explaining the arithmetic and scientific meaning.

### `sources`

Deduplicated sources supporting the equation’s factors.

---

## Factor fields

### `id`

Unique within the entire topic.

Recommended pattern:

```text
<equation_id>_f<index>
```

### `label`

Exact quantity name.

### `unit`

Human-readable unit.

### `value`

Numeric JavaScript value used for matching and arithmetic.

### `display`

Exact text shown in the bank.

`value` and `display` must represent the same number.

### `playDesc`

Specific player-facing clue.

### `desc`

Reveal explanation.

### `source`

Source metadata.

---

# 25. Current interface behavior

The engine must preserve these features.

## Home screen

Displays:

- dynamic topic count using `GAMES.length`;
- title;
- tag;
- Casebook companion label.

Clicking any card must open the game.

## Game header

Displays:

- real-world topic title;
- `real facts` badge;
- Casebook companion label;
- round number;
- number of solved equations;
- progress bar.

## Educational panel

Open by default:

- context;
- vocabulary.

## Equations

Show:

- question number;
- compact question;
- factor label;
- specific `playDesc`;
- factor unit;
- number slot;
- fixed operator;
- live calculated final result.

## Number bank

Desktop:

- right-side sticky toolbar;
- separate column reserved for it;
- remains visible while scrolling;
- may scroll independently if necessary.

Narrow screens:

- moves above the equations;
- becomes a sticky horizontal strip;
- does not overlap equation cards.

Current breakpoints:

```css
@media(max-width:1180px) { ... }
@media(max-width:940px)  { ... }
```

Do not allow the toolbar to cover the right side of equations.

## Controls

- Check round
- Use feedback for next round
- See answers, facts, and sources
- Clear unlocked equations
- Restart topic
- Other topics

## Reveal

Shows:

- score out of 12;
- full question;
- correct equation;
- final answer;
- explanation;
- factor notes;
- source links.

---

# 26. Feedback logic

For each submitted equation:

## Right

Every number is in the correct named slot.

Action:

- equation locks;
- all factors lock;
- solved round is recorded.

## Too high

Placed values produce a result above the correct answer.

## Too low

Placed values produce a result below the correct answer.

## Right total, misplaced

The numerical result matches the answer, but at least one number is attached to the wrong factor label.

This is important because arithmetic equality is not semantic correctness.

## Component feedback

Each correctly placed factor locks even if the equation is otherwise wrong.

If none are correct:

> No individual components are in the right slot yet.

If some are correct:

> Correct components: [names]. Those values are now locked in place.

---

# 27. Required authoring workflow

## Step 1 — Choose a real domain

For Casebook, use the manifest discipline and science taught.

For standalone additions, choose one coherent subject.

## Step 2 — Find real anchor facts first

Do not invent an equation and then search for convenient numbers.

Start with:

- official objects;
- documented events;
- national statistics;
- standards;
- constants;
- published typical ranges.

## Step 3 — Draft four worthwhile questions

Check that each answer is worth learning.

## Step 4 — Draft equation shapes

Make the factor pattern exactly:

```text
[2, 2, 3, 3]
```

## Step 5 — Gather and verify sources

Record source metadata immediately.

## Step 6 — Choose values and displays

Use rounded values only when the source supports approximation.

## Step 7 — Write exact labels

Avoid vague factor names.

## Step 8 — Write specific clues

No placeholders.

Every clue should identify the exact fact.

## Step 9 — Write reveal explanations

Explain both arithmetic and meaning.

## Step 10 — Run structural and arithmetic validation

## Step 11 — Run editorial validation

Check:

- sources;
- leakage;
- answer chaining;
- clue specificity;
- educational value;
- fairness;
- spoilers.

## Step 12 — Test the browser

Play:

- a completely correct path;
- a high-result path;
- a low-result path;
- a partial-component-correct path;
- a right-total-misplaced path;
- all three rounds;
- reveal;
- desktop toolbar;
- narrow-screen layout.

---

# 28. Automated validator

Use a validator equivalent to this.

```js
function calcEquation(e) {
  let result = e.factors[0].value;

  e.ops.forEach((op, i) => {
    const next = e.factors[i + 1].value;

    if (op === "×") result *= next;
    else if (op === "÷") result /= next;
    else if (op === "+") result += next;
    else throw new Error(`Unsupported operator: ${op}`);
  });

  return result;
}

function nearlyEqual(a, b) {
  return Math.abs(a - b) <= Math.max(
    1e-9,
    Math.abs(b) * 1e-9
  );
}

function validateGame(g) {
  const errors = [];
  const eqs = g.eqs || [];
  const factors = eqs.flatMap(e => e.factors || []);

  const factorCounts = eqs
    .map(e => e.factors.length)
    .sort((a, b) => a - b);

  const values = factors.map(f => f.value);
  const displays = factors.map(f => f.display);

  const ids = [
    g.id,
    ...eqs.map(e => e.id),
    ...factors.map(f => f.id)
  ];

  if (eqs.length !== 4) {
    errors.push("must have exactly four equations");
  }

  if (
    JSON.stringify(factorCounts) !==
    JSON.stringify([2, 2, 3, 3])
  ) {
    errors.push("factor pattern must be [2,2,3,3]");
  }

  if (factors.length !== 10) {
    errors.push("must have exactly ten factors");
  }

  if (new Set(values).size !== 10) {
    errors.push("numeric values must be unique");
  }

  if (new Set(displays).size !== 10) {
    errors.push("display strings must be unique");
  }

  if (new Set(ids).size !== ids.length) {
    errors.push("all ids must be unique");
  }

  eqs.forEach(e => {
    if (e.ops.length !== e.factors.length - 1) {
      errors.push(`${e.id}: wrong operator count`);
    }

    const calculated = calcEquation(e);

    if (!Number.isFinite(calculated)) {
      errors.push(`${e.id}: non-finite answer`);
    } else if (!nearlyEqual(calculated, e.answer)) {
      errors.push(`${e.id}: answer does not match arithmetic`);
    }

    if (!e.revealQ) {
      errors.push(`${e.id}: missing revealQ`);
    }

    if (!e.explain) {
      errors.push(`${e.id}: missing explanation`);
    }

    if (!Array.isArray(e.sources) || !e.sources.length) {
      errors.push(`${e.id}: missing equation sources`);
    }
  });

  factors.forEach(f => {
    if (!Number.isFinite(f.value)) {
      errors.push(`${f.id}: value is not finite`);
    }

    if (!f.display || !f.display.trim()) {
      errors.push(`${f.id}: missing display`);
    }

    if (!f.playDesc || !f.playDesc.trim()) {
      errors.push(`${f.id}: missing playDesc`);
    }

    if (
      f.playDesc ===
      "A sourced real-world fact or defined conversion; use its unit and likely scale to choose a value."
    ) {
      errors.push(`${f.id}: rejected generic clue`);
    }

    if (!f.desc || !f.desc.trim()) {
      errors.push(`${f.id}: missing reveal description`);
    }

    if (
      !f.source ||
      !f.source.label ||
      !f.source.url
    ) {
      errors.push(`${f.id}: missing source metadata`);
    }
  });

  const answers = eqs.map(e => e.answer);

  answers.forEach((answer, i) => {
    if (values.some(v => nearlyEqual(v, answer))) {
      errors.push(
        `${eqs[i].id}: answer is reused as a factor value`
      );
    }
  });

  return {
    ok: errors.length === 0,
    errors,
    equationCount: eqs.length,
    factorPattern: factorCounts,
    bankSize: factors.length
  };
}
```

---

# 29. Editorial validation checklist

Automated validation is not sufficient.

For every topic, manually check:

## Factual integrity

- Does every source support the stated value?
- Is a typical value labeled typical?
- Is a dynamic value dated?
- Is geography clear?
- Is precision honest?
- Is any value fictional?
- Is any conversion wrong?

## Question quality

- Is the final number worth knowing?
- Are the four questions meaningfully different?
- Is the domain coherent?
- Does each factor earn its place?
- Is the math accessible?
- Is the bank fair?

## Clue quality

- Does every clue identify the exact quantity?
- Does any clue use generic placeholder language?
- Does a clue reveal the number?
- Does it identify the real object, event, standard, or period?
- Are conversion clues written concretely?

## Independence

- Is any result reused later?
- Is any factor secretly derived from another equation?
- Could each equation be played independently?

## Casebook safety

- Is the hidden cause omitted?
- Is the bait omitted?
- Are clue answers omitted?
- Can the Ballpark game be played without knowing the Casebook story?

---

# 30. Package and file workflow

For future work, attach:

1. `BALLPARK_FULL_SPEC_CURRENT.md`
2. `ballpark_casebook_61_real_facts_specific_clues.html`
3. `ballpark_casebook_61_real_facts_specific_clues_data.json`
4. a topic manifest or list of new domains

The HTML is the current engine and may also contain the game data.

The JSON is the easier source for bulk editing.

When updating:

1. edit the JSON;
2. validate the JSON;
3. replace the embedded `const GAMES = ...` data in the HTML;
4. preserve the engine functions and CSS;
5. syntax-check the JavaScript;
6. test clicks and gameplay.

Do not rebuild the engine from scratch unless the user asks for a mechanic change.

---

# 31. Engine integrity checks

Before delivery, confirm:

- `function renderGame()` exists;
- every home card click calls a defined function;
- `GAMES.length` controls the displayed count;
- all game cards open;
- the shared bank displays 10 values;
- `playDesc` is rendered in `.fdesc`;
- no fallback generic clue is being used;
- round checking works;
- component locking works;
- reveal works;
- sources open in new tabs;
- the toolbar does not overlap equations.

A previous failure occurred because `renderGame()` was omitted. This must be explicitly tested.

A second previous failure occurred because the interface ignored specific descriptions and displayed the same placeholder for all 610 clues. Search the final HTML for the rejected placeholder before delivery.

---

# 32. Search checks before delivery

Search the final HTML and JSON for:

```text
A sourced real-world fact or defined conversion
rounded case-model estimate
assumed for this scenario
representative value for the fictional system
function renderGame
playDesc
```

Expected:

- zero matches for rejected placeholder phrases;
- at least one `function renderGame`;
- one `playDesc` per factor.

For a 61-game build:

```text
61 games
244 equations
610 factors
610 playDesc fields
```

---

# 33. Recommended output for one new topic

Return:

1. one complete `GAMES` object;
2. a self-check line.

Format:

```text
<id>: 4 equations · factors [2,2,3,3] · 10 unique values · 10 specific clues · all inputs real or defined · sources attached · no leakage · no answer chaining · arithmetic ok
```

---

# 34. Recommended output for a batch

For a batch:

- return a JSON file or JavaScript array;
- include one validation line per topic;
- list sources;
- identify any typical values;
- state any unresolved source uncertainty;
- do not claim completion if editorial sourcing is incomplete.

---

# 35. Compact future prompt

After attaching the current spec, engine, data, and topic list, use:

> Create additional Ballpark games using the attached current specification and engine. For each topic, create exactly four related but independent equations with factor pattern `[2,2,3,3]`, ten unique values, fixed labels and operators, and one shared number bank. Every numerical input must be a sourced real-world fact, defined conversion, documented historical value, standard, or clearly labeled published typical range. Each factor must have a specific player clue that identifies the exact quantity without revealing its value; never use a generic placeholder. Add reveal descriptions and source metadata. Enforce no fictional case-model estimates, no numerical leakage, no answer chaining, no duplicate values, correct arithmetic, accessible vocabulary, and browser-tested component locking, high/low feedback, scoring, reveal, and non-overlapping right toolbar. Preserve the current engine rather than recreating it.

---

# 36. Non-negotiable summary

A publishable Ballpark topic must have:

- 4 equations;
- factor pattern `[2,2,3,3]`;
- 10 unique values;
- 10 exact factor labels;
- 10 specific clues;
- real or defined inputs;
- source metadata;
- no fictional numerical dataset;
- no answer chaining;
- no value leakage;
- correct arithmetic;
- three rounds;
- high/low feedback;
- component locking;
- right-total-misplaced feedback;
- reveal explanations;
- source links;
- a usable right-side toolbar;
- working game-card clicks.

The central design rule is:

> **Teach specific, memorable numbers about real things, and make the clue specific enough to teach what the number means without giving the number away.**
