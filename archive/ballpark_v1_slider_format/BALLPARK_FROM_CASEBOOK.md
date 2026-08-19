# Ballpark ← Casebook — authoring handoff (ChatGPT)

**Goal:** turn each of the 61 Casebook cases into **one Ballpark estimation question on the same domain**, so a
player who solved the seismology *case* can later estimate the seismology *quantity*. One Ballpark per case, 1:1.

## How to use

1. Attach **three files** to ChatGPT: `ballpark_prototype.html` (engine + 3 gold examples), `BALLPARK_SPEC.md`
   (the schema + HARD RULES + verify snippet), and `ballpark_casebook_manifest.md` (the 61 source blocks).
2. Work through the manifest, **one case per reply** (or one theme-batch per reply if asked). For each, return a
   single `QUESTIONS` object plus the spec's self-check line.
3. Ballpark id = **`bp_<casebook-id>`** (e.g. `bp_e_quake`). This is how a Ballpark question maps back to its case.

## What the manifest gives you (per case)

- **Discipline + scenario** — the domain to stay on-topic.
- **Real cause vs. bait** — the physical phenomenon at the heart of the case.
- **Science taught** — the 9 real concepts the case covers. *Mine these for factors and to keep the question
  educational* (e.g. seismology → moment magnitude, stress drop, rupture area).
- **Suggested estimand + three handles** — a decomposable starting point. **Keep it if it verifies; swap the
  estimand if you cannot make exactly three independent methods cancel to the target unit.**

## THE ONE TECHNIQUE THAT TRIPS EVERYONE UP

The engine cancels **identical unit tokens only — it does NOT simplify dimensions.** `m2 × m` is *not* `m3`;
`kg·m/s²` is *not* `N`. So you cannot build a method as "area × depth" and expect it to reach `m3`.

**The reliable pattern:** target = `[per-X quantity] × [X]`, i.e. a factor `{n:[TARGET], d:[X]}` times a factor
`{n:[X]}`. Every method is "a total-per-something × that something." The three methods differ by using **distinct
denominator tokens** X (rule 6/8). This is exactly the pyramid gold example (`m3/block × blocks`), generalized.

- Pick **one target token** for the answer (e.g. `m3`, `joule`, `person`, `dollar`).
- Give each method a per-unit factor `{n:[target], d:[Xi]}` and a count factor `{n:[Xi]}`, with X1≠X2≠X3.
- Decoys: two factors whose tokens **cannot** reach the target under ×, A÷B, or B÷A (the manifest's science line
  is a good source of plausible-but-wrong quantities).
- Run the spec's `check()` on every question: need `exactlyThree && convergent && nearTruth && boundsOk`.

## GOLD EXAMPLE — derived from a Casebook case (verified)

Source block → `bp_e_flood` ("The Rossmere Flood", Hydrology). Estimand: *how many m³ of water passed during the
flood?* Three independent handles become three `[m³/X] × [X]` methods with distinct X (`s`, `m`, `km2`):

```js
{ id:'bp_e_flood',
  q:"How many cubic metres of water passed through Rossmere during the flood?",
  target:'m3', unitName:'cubic metres', trueVal:2e7, trueLabel:"≈ 20 million m³",
  cd:"hydrograph · reservoir · catchment",     // the 3 independent handles
  blocks:[
    // METHOD 1 — hydrograph: discharge × time
    {id:'disch',  lb:'Peak discharge past the gauge',            un:'m³/s',  unit:{n:['m3'],d:['s']},   exp:500,   lo:10,   hi:1e4},
    {id:'dur',    lb:'Flood duration',                           un:'seconds',unit:{n:['s'],d:[]},      exp:43200, lo:3.6e3,hi:1e6},
    // METHOD 2 — reservoir: storage-per-metre × level drop
    {id:'resPerM',lb:'Reservoir storage per metre of drawdown',  un:'m³/m',  unit:{n:['m3'],d:['m']},   exp:4e6,   lo:1e4,  hi:1e8},
    {id:'drop',   lb:'Reservoir level drop',                     un:'metres',unit:{n:['m'],d:[]},       exp:5,     lo:0.5,  hi:100},
    // METHOD 3 — catchment: runoff-yield-per-area × catchment area
    {id:'yield',  lb:'Runoff yield per unit catchment',          un:'m³/km²',unit:{n:['m3'],d:['km2']}, exp:1e5,   lo:1e3,  hi:1e8},
    {id:'catch',  lb:'Catchment area',                           un:'km²',   unit:{n:['km2'],d:[]},     exp:200,   lo:5,    hi:5e3},
    // DECOYS — cannot reach m3 with anything
    {id:'intens', lb:'Rainfall intensity',                       un:'mm/hr', unit:{n:['mm'],d:['hr']},  exp:20,    lo:1,    hi:200},
    {id:'pop',    lb:'People living downstream',                 un:'people',unit:{n:['people'],d:[]},  exp:5000,  lo:100,  hi:1e6}
  ],
  methods:[['disch','dur'],['resPerM','drop'],['yield','catch']] }
```

Self-check: `bp_e_flood: 3 methods [disch+dur, resPerM+drop, yield+catch] · decoys reject · expert spread 1.08x · true ≈ 2e7 · lo/hi ok`

## Turning a manifest "handle" into a method (recipe)

Each manifest handle reads like **"factorA (unitA) × factorB (unitB)."** To encode it:
- Decide the target token T from the estimand's unit.
- Write factorA as a *rate/per-unit* in T: `{n:[T], d:[X]}`; write factorB as the count `{n:[X]}`. Choose X so
  the two multiply/divide to T. If a handle is naturally "A ÷ B" (e.g. energy ÷ energy-per-kg = kg), keep that —
  the engine tries ×, A÷B and B÷A, so you only supply the two units and it finds the operator.
- If two handles would share a denominator token, rename one so all three X differ (rule 6).
- Set `exp` so all three methods land within ~2–3× of each other and of `trueVal` (facts must be real,
  order-of-magnitude honest). Set `lo`/`hi` ~3–4 orders wide, truth inside but off-center.

## Output format (per case)

One `QUESTIONS` code block, then the self-check line
`bp_<id>: 3 methods [pairs] · decoys reject · expert spread N.Nx · true ≈ V · lo/hi ok`.
Span the disciplines as you go — the manifest is already grouped into 7 themes; the estimands vary count / mass /
energy / money / people so the estimation *shapes* stay varied too.
