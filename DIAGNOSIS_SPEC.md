# Diagnosis — authoring spec

A **Diagnosis game** teaches one transferable skill: *differential reasoning from instruments* — find the
single cause that fits the **whole** panel of readings (especially the calm ones), reject the loud-but-wrong
and the do-nothing answers, and when two causes look identical up top, reason one step deeper.

The **engine is fixed** (a single HTML file renders any game). Your job is to write one **data pack** — the
system, the schematic, the readings, the candidate causes, and three rounds. This document is the contract.

Reference implementation (the gold standard): `diagnosis_nuclear_logic.html`.
Difficulty oracle (run it): `diagnosis_logic_levels.js`.

---

## 1. The shape of every game

- **One domain** with a *system* you can instrument (reactor, aircraft, market, body, …).
- A **schematic** ("the map") with a pin per reading, drawn once per domain (all its triads reuse it).
- A **"How this system works"** explainer on the first page, plus a small collapsible **method** link
  (the reasoning tips — identical across all games; copy verbatim from the reference).
- A **constant paradox** every round: a *loud alarming* reading vs a *calm reassuring* one (the reassuring
  pole is a **red herring** and is the same every round).
- **4 candidate causes**, constant across rounds. Exactly one is the **dismissal** (the tempting
  "nothing's really wrong / just settling" answer) — it is **never** the right call.
- **3 rounds.** The **correct answer rotates** (a different cause each round). The **full panel is shown every
  round — nothing hidden, no choosing which sensors to read.**
- **Difficulty = logic depth**, not hidden information (see §4). Score is out of 3, one point per round called
  right on the **first** try.

---

## 2. The data-pack schema

```js
const PACK = {
  id: 'reactor', title: 'Meltdown Watch', domain: 'Nuclear reactor operations',
  role: 'You are the operator on watch.',                 // 2nd-person framing

  system: {
    // the "How this system works" explainer (first page). 4–6 bullets, then the payoff line.
    parts: [ ['Core → primary loop', 'Uranium heats water in a sealed high-pressure loop…'], … ],
    soWrong: 'So only a few things can truly be wrong: losing coolant … or the heat has nowhere to go.'
  },

  schematic: { viewBox: '0 0 520 470', svg: `<!-- static SVG: the system, no pins -->` },

  salient: ['rcs', 'przr'],   // the "LOUD" readings — the ones a person notices first (the alarm gauges)

  readings: {                 // one entry per sensor/pin
    rcs:  { name:'RCS pressure', pin:{x:205,y:270}, zone:'primary',
            purpose:'Pressure in the coolant loop (~2,235 psia). Falls if coolant leaks; rises if heat can’t escape.' },
    …                         // include a plain-language "what it watches / what a change means" purpose
  },

  hypotheses: {               // the 4 candidate causes; each has a PREDICTED SIGNATURE over the readings
    loca:     { label:'Loss-of-coolant accident', call:{ title:'…', arg:'…' },
                sig:{ rcs:'down', przr:'down', sump:'rise', contRad:'up', secRad:'normal', … } },
    sgtr:     { label:'Tube rupture',             call:{ title:'…', arg:'…' },
                sig:{ rcs:'down', przr:'down', sump:'dry',  contRad:'normal', secRad:'up',  … } },
    heatsink: { … },
    normal:   { … },          // ← this one is the dismissal
  },
  dismissal: 'normal',
  reassuring: { lab:'Reactor status', val:'SCRAMMED — rods in',   // the CONSTANT red-herring pole
                note:'Fission is stopped. But a just-shut core still pours out decay heat.' },

  rounds: [                   // exactly 3, in order easy → hard
    {
      answer: 'heatsink',                 // the correct cause this round
      alarm:  'coretemp',                 // which reading is the presenting alarm (drawn red on the map)
      poleA:  { lab:'Core temperature', val:'Rising', note:'Climbing after the trip instead of easing.' },
      hook:   'Two minutes after a trip…',
      riddle: 'The core is shut down — so why is it heating up?',
      vals:   { rcs:'2,410 psia, RISING', przr:'58%, steady', coretemp:'climbing', … },  // observed (display)
      reasons:{ loca:'A leak drops pressure and wets the sump; pressure is rising and the sump is dry.', … },
      resolve:{ title:'Lost heat sink.', paras:['…','…'],
                why:{ loud:'Why the loud reading was enough…', quiet:'Why not a leak…' },
                chain:['Heat sink lost','Decay heat trapped','Temperature climbs'],
                take:'A naked single: one loud gauge eliminates every rival.' }
    },
    { /* round 2 */ }, { /* round 3 */ }
  ]
};
```

**`vals` (display strings) must agree with `sig` (tokens).** `sig` drives the difficulty math; `vals` is what
the player reads. E.g. `sig.rcs:'down'` ⇒ `vals.rcs:'1,650 psia, falling'`.

---

## 3. The reasoning that makes it educational

Every case must be solvable by, and only by, this method — state it in the prose:

1. **The alarm says something is wrong, not what.** The loud pole grabs attention but rarely names the cause.
2. **The right cause fits the *whole* panel — including the normal readings.** A perfectly normal reading is
   often the clincher: the sign a wrong explanation *would* have disturbed, but didn't.
3. **When two causes tie on the loud readings, reason one step deeper** into the quiet readings (e.g. for a
   leak: *where* did it go?).

---

## 4. Difficulty = logic depth (the core mechanic)

Difficulty is a **property of how much the correct answer's signature overlaps its nearest rival's** — measured
in **salient-separation**: the number of *loud* (`salient`) readings on which the answer and its nearest rival
differ. You do **not** hand-label difficulty; you *design the overlap* and the oracle derives it.

| Round | Target level | salient-sep | The inference required |
|------|--------------|:-----------:|------------------------|
| 1 | **L1 naked single** | **≥ 2** | a loud gauge alone eliminates the rival — one glance |
| 2 | **L2 one clear line** | **1** | exactly one loud reading decides; you must find it |
| 3 | **L3 the loud gauges tie** | **0** | loud readings match a rival; separate only on **quiet** readings + a sharper question |
| (opt) 4 | **L4 two faults** | n/a | **no single cause fits** the observed — the answer is a *pair* of causes |

**To make a round harder you do NOT add sensors or hide anything. You choose a nearest rival whose signature
shares more of the LOUD readings**, pushing the true separation into quiet or derived features. (This is the
Sudoku move: remove the naked singles so the solver must chain deeper.)

Run the oracle to confirm each round lands on its target level:

```
node diagnosis_logic_levels.js      # prints observed, candidates, nearest rival, salient-sep, level
```

`analyze(observed, pool)` returns `{ best, rival, salientDiffs, quietDiffs, level }`. A pack is **wrong** if a
round's derived level ≠ its slot (e.g. round 3 shows salient-sep 1 → it's only Medium, fix the signatures).

---

## 5. HARD RULES (a pack is rejected otherwise)

1. **Accurate domain facts.** Real system, real components, real failure modes, real instruments. Every
   signature must be physically true for that cause. No invented mechanisms.
2. **Difficulty must hold.** Round 1 salient-sep ≥ 2, round 2 = 1, round 3 = 0 (loud readings TIE with the
   nearest rival). Verify with the oracle. If round 3 can be solved by a loud reading, it isn't Hard.
3. **The L3 discriminator is a QUIET reading**, and ideally lives in a *different zone* of the schematic than
   the loud readings — so the "where/what" question is a spatial read on the map.
4. **Constant paradox.** `reassuring` pole is identical every round and is a genuine red herring (reassuring
   but not dispositive). `poleA` varies and is the presenting alarm.
5. **Rotating answers + one dismissal.** The 3 correct answers are 3 *different* causes. Exactly one candidate
   is the `dismissal` and it is never correct.
6. **No spot-the-flag.** Readings show **raw values** (+ a baseline in the `purpose`), never a pre-computed
   "abnormal" flag. The player judges. The `alarm` red pin marks the presenting alarm only.
7. **Every reading has a plain-language `purpose`** — what it measures and what a change means. Purposes must
   carry the material for the L3 deeper question (e.g. "rises only if coolant leaks into the STEAM side").
8. **Full panel every round.** No pay-to-look, no locked/hidden readings, no "choose N sensors." (Retired.)
9. **Anti-sameness across a library.** Vary which cause occupies each slot and *what kind* of deeper question
   L3 asks (where did it go / which of two acids / real-vs-artifact / two-faults). Do **not** always put the
   "instrument fault / false alarm" twist in the same round across games — players will learn the meta.

---

## 6. Writing style

- **hook**: 1–2 sentences of scene. **riddle**: the paradox as a question; for L3 it should *pose the deeper
  question* ("…but the containment floor is dry. So where is the water going?").
- **reasons** (for each wrong candidate): name what fits, *then* the reading that kills it — cite specific
  values, and at L3 acknowledge the shared loud readings before the quiet discriminator.
- **resolve**: `title` = the answer; `paras[0]` = what happened; `paras[1]` = *why the reasoning worked at this
  depth* (name the level: "a naked single", "the loud gauges tie"). `why.loud/quiet` = the two-pole rebuttal.
  `chain` = 3 nodes cause→mechanism→outcome. `take` = the one-line transferable lesson.
- Confident, concrete, lightly atmospheric — good science journalism, not a textbook.

---

## 7. The schematic

- **One drawing per domain** (all triads reuse it), inline SVG, no external assets.
- A recognizable **cutaway** for physical systems (reactor, aircraft) or a **system/flow diagram** for abstract
  ones (a market ecosystem: Company → Order book → Exchanges → Price). Both must (a) put each reading's pin in a
  *meaningful* place and (b) let the diagnosis **cluster spatially** (a leak lights the primary loop; a tube
  rupture lights the steam side).
- Give each reading a `zone`; the L3 discriminator should sit in a different zone than the loud readings.

---

## 8. Build & verify checklist

- [ ] `node --check` the game's script (a stray escape blanks the page — always run this).
- [ ] `node diagnosis_logic_levels.js`-style oracle: round levels derive to L1 / L2 / L3.
- [ ] Answers rotate; exactly one dismissal; it's never the answer.
- [ ] `reassuring` pole constant; `poleA` varies.
- [ ] Every reading has a `purpose`; L3's discriminator is quiet + off-zone.
- [ ] Facts spot-checked by someone who knows the domain (the engine validates structure, not truth).
- [ ] First page has the "How this system works" explainer + the method link.

---

## 9. Delegating to ChatGPT

Paste §1–§6 + the reference pack from `diagnosis_nuclear_logic.html` as the system message, then ask for one
new domain's pack as a single `PACK = { … }` object. Require it to (a) return the signatures **and** a line
per round stating the derived salient-separation, and (b) name the L3 deeper question. Reject and return any
round whose salient-separation doesn't match its slot.
