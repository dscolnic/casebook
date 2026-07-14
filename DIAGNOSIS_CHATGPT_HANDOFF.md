# Diagnosis — ChatGPT handoff

**How to use:** open a ChatGPT chat, **attach the 3 files listed below**, then paste everything under the line
as your first message. ChatGPT will produce new `dpack_<id>.js` files. Save each next to the others and run
`node build_diagnosis.js` locally to validate + play.

**Attach these files (they define the format):**
- `dpack_reactor.js` — the gold-standard example pack. Copy its structure exactly.
- `DIAGNOSIS_SPEC.md` — the full authoring spec.
- `validate_pack.js` — the validator. If you have a code tool, RUN it on your output.

Also on disk as *content sources to port* (older standalone prototypes, same differentials, not yet packs):
`diagnosis_aviation_map.html`, `diagnosis_market_map.html`.

---

## ROLE

You are authoring **data packs** for *Diagnosis*, a browser game that teaches differential reasoning from
instruments. The **engine (`diagnosis.html`) and validator are fixed** — you only write a `dpack_<id>.js` file
that exports one `PACK` object. `node build_diagnosis.js` validates every pack and injects the passing ones.

## THE GAME (so your writing fits)

Each game is one system (reactor, aircraft, market, …). Every round shows the **whole panel of readings**
(nothing hidden) plus a **paradox**: a loud *alarming* reading vs a calm *reassuring* one (the reassuring pole
is a red herring and is identical every round). The player picks, from **4 candidate causes**, the one that
fits **all** the readings. Three rounds; the **correct answer rotates**; exactly one candidate is the
**dismissal** ("nothing's really wrong") and is never correct. Difficulty is **logic depth**, and it is
**derived from the signatures** — you don't label it, you design it.

## WHAT YOU WRITE

A file `dpack_<id>.js` containing `module.exports = { PACK: { … } }`. Match `dpack_reactor.js` field-for-field:
`id, title, domain, role, system{parts,soWrong}, salient[], readings{ id:{name,purpose,pin,zone} },
hypotheses{ id:{label, call{title,arg}, sig{readingId:token}} }, dismissal, reassuring{lab,val,note},
rounds[3]{ answer, alarm, poleA{lab,val,note}, hook, riddle, vals{}, reasons{}, resolve{title,paras[],why{loud,quiet},chain[],take} },
schematic{viewBox, svg}`.

`sig` (tokens like `'up'`/`'down'`/`'normal'`) drives the difficulty math. `vals` (display strings like
`"1,650 psia, falling"`) is what the player reads — the two must agree.

## HOW DIFFICULTY IS DERIVED (design to hit L1 → L2 → L3)

`salient` = the "loud" readings (the alarm gauges). For each round, with `observed` = the answer's `sig`:

- **L1 (round 1) — naked single:** some *single salient reading* has a value only the answer has. One glance.
- **L2 (round 2) — one clear line:** no salient reading is solo, but the answer is the *only* candidate matching
  the observed on **all** salient readings (you need the loud readings together).
- **L3 (round 3) — loud gauges tie:** **≥2 candidates** match the observed on all salient readings, so the loud
  readings can't decide — the answer separates only on **quiet** readings, via a deeper question (e.g. "*where*
  did it go?"). The L3 discriminator must be a quiet reading, ideally in a different `zone` of the schematic.

**To make a round harder, make the nearest rival share more of the LOUD readings.** The validator computes this
and **rejects** any pack whose rounds don't derive to exactly L1 / L2 / L3.

### Constructive recipe for the loud signatures (do this FIRST, before any prose)

Pick **2 salient readings** (A, B). Give your 4 causes these loud (A,B) values so difficulty falls out:

```
answer R1 : (X, ·)      X is a value NO other cause has on reading A   → L1 naked single
answer R2 : (Y, Z)      Y appears on another cause, Z appears on another,
                        but the PAIR (Y,Z) is unique to this cause      → L2 one clear line
answer R3 : (Y, Z2)  ┐  these two share the SAME loud pair, so the loud
tie-partner: (Y, Z2) ┘  readings cannot separate them                  → L3 loud gauges tie
```

Then the R3 answer and its tie-partner must differ on a **quiet** reading — that's the deeper question the
player has to ask. (The tie-partner is often the dismissal, or another real cause.)

**Worked example (reactor):** salient = pressure, level.
`heatsink (up, ·)` → L1 (pressure "up" is unique). `overcool (down, normal)` → L2 (pair unique, no solo).
`loca (down, down)` and `shrink (down, down)` share the loud pair → L3, separated by the *quiet* sump /
containment-radiation readings ("is coolant actually leaving?"). Confirm every time with `validate_pack.js`.

## HARD RULES (auto-rejected otherwise)

1. Accurate domain facts; every `sig` is physically true for that cause. No invented mechanisms.
2. Rounds derive to L1 / L2 / L3 (run `validate_pack.js`). Round 3's loud readings must tie with a rival.
3. Raw values only — **no pre-computed "abnormal" flags**. Put the baseline in each reading's `purpose`.
4. Constant `reassuring` pole (red herring); `poleA` varies (the presenting alarm).
5. Three distinct correct answers; exactly one `dismissal`, never correct.
6. Every reading has a plain-language `purpose` that carries the material for round 3's deeper question.
7. Full panel every round — no hidden/locked/"choose N" readings.
8. **Anti-sameness:** across packs, vary which cause sits in each slot and what *kind* of deeper question L3
   asks (where-did-it-go / which-of-two / real-vs-artifact). Don't always park the twist in the same round.
9. Valid JS; a stray backslash-escape breaks the file — keep prose in the object's string literals clean.

## SCHEMATIC

One inline SVG per domain (all its future packs reuse it). A recognizable cutaway for physical systems, or a
system/flow diagram for abstract ones. Place each reading's pin in a meaningful spot so the diagnosis clusters
spatially. Give each reading a `zone`.

## OUTPUT

For each requested domain, return the **complete** `dpack_<id>.js` in one code block (no elisions), then a line:
`<id>: rounds derive to L1/L2/L3 · answers <a>/<b>/<c> · dismissal <d>`.
If you can run code, run `node validate_pack.js dpack_<id>.js` and paste the `OK` output.

## SUGGESTED NEXT PACKS (each already has a clean L1/L2/L3 differential)

- **aviation** (port from `diagnosis_aviation_map.html`): stall (L1) / one-reading (L2) / **unreliable airspeed
  vs real overspeed** — both fast-looking, separated by GPS groundspeed cross-check (L3).
- **market** (port from `diagnosis_market_map.html`): real news (L1) / manipulation (L2) / **data glitch vs real
  crash** — one venue vs the consolidated tape (L3).
- **chemical plant**: reactor temp/pressure — runaway vs cooling-loss vs a sensor-shared signature.
- **ICU / sepsis**: shock — cardiogenic / hypovolemic / **septic vs anaphylactic** (share hypotension).
- **spacecraft**: attitude alarm — real thruster fault vs bad star-tracker vs thermal transient.

Start with **aviation** and **market** (differentials are worked out); do one pack per reply.
