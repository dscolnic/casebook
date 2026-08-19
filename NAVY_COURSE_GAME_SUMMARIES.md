# The 11 RECKON Games (Navy Course)

A summary of each game type used in `navy_course.html`, the reasoning skill it trains, and how it adapts to new subject matter.

Two families: **6 content-pack games** (authored purely as JSON data — no code changes to reskin) and **5 standalone apps** (interactive simulations; some need per-level code, not just data).

---

## Content-pack games (data-only to adapt)

### 1. Sequence *(sonar path, radar echo, gas turbine, layered defense…)*
- **Play:** Order a set of cards into the correct causal/physical sequence — *and* order the chapters those cards belong to. You're reconstructing "what leads to what."
- **Skill:** Cause-and-effect reasoning; understanding a process as an ordered chain rather than a list of facts.
- **Adapt:** Any process with a real order — a chemical reaction, a legal procedure, a boot sequence. Author supplies chapters of 4 ordered cards, a chapter order, bridging "segues," principles, and hints. (Catalog already has 20 across medicine, astronomy, law, ecology, finance…)

### 2. Ballpark *(underwater acoustics, buoyancy, set & drift, radar horizon…)*
- **Play:** Estimate a real-world quantity by assembling an equation from a shared bank of sourced factor values — Fermi-style order-of-magnitude reasoning.
- **Skill:** Quantitative intuition; knowing which numbers matter and how they combine.
- **Adapt:** Any domain where scale/magnitude matters. Author supplies a topic with equations (`factors` with real sourced values, `ops`, `answer`, `explain`). Every value needs a citation. (61 puzzles already, from asteroids to blackouts.)

### 3. Protocol *(multi-sensor contact ID, electrical fire, power restore, UNREP…)*
- **Play:** Match each stage of an unfolding mission to the correct tool/action card, choosing from real cards plus exactly 3 decoys.
- **Skill:** Procedural judgment — picking the right instrument/response for the required signal at each phase.
- **Adapt:** Any staged response protocol — volcano monitoring, emergency medicine, incident response. Author supplies ordered `events` (each with its answer card + why) and a card pool with 3 decoys.

### 4. Diagnosis *(shipboard flooding)* — **advanced**
- **Play:** Read a full instrument panel (gauges, readings, schematic) and deduce which single fault (or compound fault) is consistent with *every* reading.
- **Skill:** Differential diagnosis; eliminating hypotheses against a body of evidence.
- **Adapt:** Any monitored system — bioreactor, bridge, data-center cooling, spacecraft power (10 already built). Hard to author: every candidate fault's signature must match/mismatch each gauge so exactly one fits. Heavy verification required.

### 5. Casebook *(independent navigation evidence / common-mode error)* — **advanced**
- **Play:** Three-informant deduction toward a Who/Where/What solution, using clue-tagged multiple-choice questions; only "expert"-tagged answers file a real clue.
- **Skill:** Evidence evaluation; distinguishing independent corroboration from common-mode error; resisting the plausible-but-wrong.
- **Adapt:** Any investigation/forensics scenario — failure analysis, fraud, art authentication, archaeology (37 built). Many interlocking fields; author by mimicking the template exactly.

### 6. Science Tank *(historical naval innovation under uncertainty)* — **advanced**
- **Play:** A "Shark Tank" for historical ideas: across 3 rounds, evaluate concealed ideas and judge their real return/impact under period-accurate uncertainty.
- **Skill:** Calibrated judgment under uncertainty; valuing ideas before outcomes are known.
- **Adapt:** Any era/field of innovation decisions. Author supplies round packages of ~3 ideas with historically defensible economics (return multiplier, impact tier). Requires real historical grounding.

---

## Standalone app games

### 7. Spectrum Stack *(sensing the environment, platform health, future systems)*
- **Play:** Tetris fused with a quiz — a block falls while you pick which of four technologies fits the described need (A/S/D/F). Right answers unlock rotation; wrong answers speed the fall and raise a pressure row.
- **Skill:** Fast categorization — mapping a scenario to the right modality under time pressure.
- **Adapt:** Data-only. Author supplies rounds of `{four category labels, scenario→category question triples with explanations, per-category briefing text}`. Easiest app to reskin — any "which tool/type fits this case" taxonomy.

### 8. Sonar Spy *(passive detection, bearing geometry, prosecuting a submarine)*
- **Play:** Real-time sonar-operator sim — read a bearing-time waterfall, create tracks, classify contacts from frequency signatures, maneuver for parallax fixes, and (later) ping for range or fire.
- **Skill:** Multi-step inference from incomplete sensor data; geometry of detection; the stealth-vs-information trade.
- **Adapt:** Mostly data (`levelConfigs`, `createScenario`, `classificationHints`), but tied to the sonar metaphor. Reskins well to any "interpret a live signal display to identify/locate hidden objects" domain (radar, radio astronomy, medical imaging) — the contact taxonomy + signatures + per-level objectives are authored.

### 9. Dead Reckoning *(navigation fundamentals, no trusted fix, mission navigation)*
- **Play:** Turn-based grid navigation where the chart shows only an *estimated* position drifting from the hidden *true* one. Spend limited nav points on tools (depth, radar, celestial, GPS…), each trading cost, precision, and stealth — some spoofable.
- **Skill:** Reasoning under uncertainty; evidence fusion; precision ≠ accuracy.
- **Adapt:** Data-driven via a `missions` array (grid, currents, hazards, tool palette with costs/behaviors) plus a global tool `defs`. Generalizes to any "estimate true state from imperfect, costly, sometimes-unreliable measurements" theme — robotics localization, sensor fusion, even epidemiological estimation.

### 10. Strait Support *(build the operational picture, sustain the force, Operation Narrow Gate)*
- **Play:** Place assets on a tactical map so their *coverage areas overlap* over the places that matter (a contact confirmed by two sensors, a report path back to base). Graded on relationships, not hitting one hidden coordinate — many layouts win.
- **Skill:** Systems/relational thinking — how independent parts combine into one connected network.
- **Adapt:** **Hardest to reskin** — the pass/fail logic is per-piece code in `evaluatePieceRule`, not pure data. New material means redrawing terrain, defining pieces with coverage shapes, *and writing matching relationship rules in code*. Fits any "build a network where parts must connect/cover/overlap" domain (comms mesh, supply chain, ecological corridors).

### 11. SensorShip *(the three Battle milestones — easy/normal/hard)*
- **Play:** Reimagined Battleship on a shared board. Plan each round: move ships, toggle active sonar (reveals enemies but exposes you) vs. passive (only hears already-hit hulls). Sink the enemy fleet within 7 rounds through the fog.
- **Skill:** Hidden-information deduction + risk/resource management — is the info from active sensing worth the exposure?
- **Adapt:** The engine is generic; the only "content" is the **ship stat table** (`length, activeRange, passiveRange, mobility, moveAfterHit`) and the lesson→unlock mapping. Serves as the course's recurring boss/reward — you unlock a new hull every 3 lessons. Reskinning is mostly renaming units and tuning stats.

---

## The adaptation pattern, at a glance

| Game | To adapt, you supply | Effort |
|---|---|---|
| Spectrum Stack | Categories + scenario questions | Easy (data) |
| Sequence | Ordered cards + chapters | Easy (data) |
| Ballpark | Sourced equation factors | Easy (data, needs citations) |
| Protocol | Ordered events + decoy cards | Easy (data) |
| Sonar Spy | Contacts, signatures, objectives | Medium (data, metaphor-bound) |
| Dead Reckoning | Missions: grid, tools, currents | Medium (data) |
| SensorShip | Ship stat table | Medium (mostly tuning) |
| Diagnosis | Self-consistent fault/gauge matrix | Hard (verification) |
| Casebook | 3-informant Who/Where/What | Hard (template mimicry) |
| Science Tank | Historically grounded idea rounds | Hard (research) |
| Strait Support | Terrain + pieces **+ code rules** | Hardest (needs code) |

The common thread: **each game targets a distinct reasoning skill** (ordering, estimation, procedure, diagnosis, evidence, judgment, categorization, inference, uncertainty, systems thinking) — so choosing a game for new material is really choosing *which thinking skill* the material should exercise, then pouring the domain content into that game's template.
