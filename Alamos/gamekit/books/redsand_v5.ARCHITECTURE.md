# Red Sand: Full Tank — campaign architecture

Built to `Campaign_Design_and_Implementation_Master_Brief_v2`, from the content in
`Mars_AP_Chemistry_Campaign_Implementation_Bible_v10.2_Compact_Glossary.md`.

**Section 1's matrix is a reading of v7 and has not been recomputed against
v10.2.** v10.2 renamed the keystones — it now tags each stop with one of thirteen
named keystones and carries its own "Keystone retrieval compliance ledger" — so
the ten-row table below and the bible's thirteen rows are two answers to the same
question and only one of them is the source's. Recompute before citing it. Section
3 is superseded outright: v10.2 meets all three contracts, and
`books/redsand_v5.BIBLE_GAPS.md` records what it still owes.

The brief's Step 1 is *diagnose the existing campaign*. This file is that
diagnosis and nothing more.

**ALL CONTENT COMES FROM THE BIBLE.** The book matches the bible's copy to places,
fixtures, formats and gameplay; it does not write player-facing prose, and neither
does this file. Everything below is a finding to take back to the bible — where a
contract is unmet or a concept never returns, that is recorded here and left for
the source to answer. Nothing in section 2 or 3 is an edit to make in the YAML.

Regenerate the matrix below with:

```sh
node tools/keystones.mjs <stops.json>
```

`tools/keystones.mjs` holds the keystone → label mapping. It is a *reading* of the
existing blueprint: every stop keeps its mission, its format and its story role.

---

## 1. The diagnosis

v7 ships **60 stops carrying 60 distinct concept labels.** Nothing recurs by name,
even where the same idea is being used for the fourth time — `grams-moles-particles`
(M1), `stoichiometric workflow` (M2), `full atom ledger` (M6) and
`coupled stoichiometry` (M12) are all one keystone wearing four names.

So the brief's question — §3.2, *"keystone concepts should recur approximately
three to five times in different roles"* — could not be asked of the campaign at
all. Mapping the 60 labels onto the 10 keystones they are instances of makes it
answerable, and the answer is mixed.

### The concept-encounter matrix (§3.5)

| Keystone | stops | missions | INTRODUCE | PRACTICE | RETRIEVE | COMBINE | APPLY | TRANSFER | verdict |
|---|---:|---|---|---|---|---|---|---|---|
| Follow the amount | 9 | M1 M2 M6 M11 M12 | M1 M1 M2 M12 | M1 M2 M11 | — | — | — | M6 M12 | **ok** |
| Evidence has to be independent | 16 | M5 M6 M8 M9 M10 M14 M15 | M5 M10 | M10 | M6 M14 M14 | M6 M9 M10 | M6 M8 M14 | M10 M14 M15 M15 | **ok** |
| What runs out first | 5 | M2 M13 M15 | — | M2 | — | M2 | — | M13 M15 M15 | **ok** |
| Concentration is not amount | 5 | M5 M12 | M5 M5 M12 | M5 | — | M12 | — | — | **ok** (thin) |
| Rate is not yield | 7 | M8 M9 M11 | M8 M9 | M8 M9 | — | — | M8 M9 | M11 | one block M8–M11 |
| Structure sets behaviour | 5 | M1 M4 | M1 M4 | M4 | — | M4 | M4 | — | one block M1–M4 |
| Gases carry the evidence | 4 | M3 | M3 M3 | — | — | M3 | M3 | — | **one mission** |
| Energy has to go somewhere | 4 | M7 | M7 M7 | M7 | — | M7 | — | — | **one mission** |
| Equilibrium settles it | 2 | M11 | M11 | — | — | M11 | — | — | **one mission** |
| Electrons do work | 3 | M13 | M13 M13 | M13 | — | — | — | — | **never returns** |

### What that says

**Two keystones carry the campaign and carry it well.** *Follow the amount* runs
M1 → M2 → M6 → M11 → M12 and ends in TRANSFER; *evidence has to be independent*
is 16 stops across M5–M15 and is the only keystone that is ever RETRIEVEd. Those
two are the reason the campaign already reads as cumulative.

**Six are taught as blocks and abandoned.** Gases are the whole of M3 and are
never asked for again. Thermochemistry is the whole of M7. Equilibrium is two
stops in M11. Electrochemistry is three stops in M13 and never returns in any
role. That is *Unit 3, then Unit 4, then Unit 5* — the shape §2.2 and the brief's
opening explicitly reject:

> The ideal player experience is not: Unit 1, then Unit 2, then Unit 3.

**RETRIEVE appears three times in sixty stops, and never on a chemistry keystone.**
§3.3 is blunt about what that means: *"Do not claim that a concept has been
covered five times if all five encounters are introductory recognition
questions."* Six of ten keystones are covered once, in one sitting.

---

## 2. Six gaps, for the bible to answer

**These are findings, not a plan.** Content is the bible's; this file and the book
match it to places, fixtures and gameplay. Closing a gap below means changing what
a stop *reasons about*, which is authoring — so each one is written here as a
question for the source, not as an edit anybody should make in the YAML.

Where each abandoned keystone could plausibly come back, on the evidence of what
the late stops already argue about:

| Keystone last seen | a late stop that already leans on it | what it would take |
|---|---|---|
| Gases — M3 | M11 S44 reads Q off the plant's **partial pressures** to separate a rate effect from an equilibrium shift | least: the gas work is already doing the job and is simply not named. A relabel plus a `why` that says why pressures and not concentrations |
| Gases — M3 | M6 S22 argues the leak case on pressure and composition | a relabel; the gas model is what makes a leak falsifiable |
| Energy — M7 | M9 S36 decides poisoning against operating limits, which is a bed running hot | a relabel, and a `why` that reaches back to the heat balance |
| Energy — M7 | M10 S39 argues a **temperature** safety margin | a relabel |
| Structure — M4 | M12 S46 is solubility, which is M4's polarity argument | a relabel |
| Structure — M4 | M14 S55 tells contaminants apart | a relabel |
| Equilibrium — M11 | M14 S53 — Batch C sits at a composition the tank never left | a relabel |
| Electrochemistry — M13 | M15 S58 collapses the last two plans | **most**: today the stop argues certified methane against gross mass end to end. Making Faraday's law matter means adding a constraint — the surviving plan needs electrolysis to replace lost hydrogen, under the Power Reserve cap. That is new reasoning, and only the bible should write it |

So of the eight: seven are the bible already using a keystone without naming it,
and one (M15 S58) would need the bible to add a constraint. Nothing here is
actionable in the book until the bible says so.

## 3. Three contracts v7 did not meet — all three paid by v10.2

Kept as a record of what changed, not as a finding:

1. **§11.1 — the card body's fourth sentence.** Every mission card now ends on
   *"By the end of the mission, decide …"*.
2. **§13.4 — the outcome's opener.** Every outcome now opens on
   `Mission decision:` and answers the card outright.
3. **§13.2 — chained setups.** Every setup after stop 1 now names what the
   previous stop established.

### Two engine constraints worth knowing when the bible is revised

- **The closing card has a hard reading ceiling of grade 6.5.** v7's mission 1
  outcome reads at 6.9 and is carried in `engine/dev/seguegrade-debt.json`. Rewrite
  it shorter and the debt line has to be deleted; the gate says so.
- **A scene is 30–45 words, and the theme is graded 12.** One sentence carrying 30
  words lands near grade 14–18 and fails, which is worth knowing before §12.1's
  "exactly one simple sentence" is applied literally. Two short sentences meet
  both that and §18.4's fifth-grade situation rule.

### One deliberate deviation, already taken

§11 lists `Failure means:` and `Later travel:` as required card fields. **This
campaign does not print them**, by decision, and the importer no longer carries
them. Recorded so the next reader knows it was chosen and not missed.

## 4. The metric spine (§7)

Four bars, and the whole campaign's arithmetic, are declared in
`themes/redsand_v5/theme.js` under `metrics`. Targets, story events and automatic
bar changes are v7's, mission by mission. `npm run check` runs
`engine/dev/metricsPlan.mjs`, which fails a mission with no plan, no target, a
delta naming a bar that does not exist, or a bar that moves with no named cause.

| Bar | key | start | locks |
|---|---|---:|---|
| Flight-Ready Methane | `flight_ready_methane` | 82% | never — reaches 100 in M12 and falls in M14 |
| Ascent Oxygen | `ascent_oxygen` | 88% | eligible after M13 |
| Power Reserve | `power_reserve` | 72% | never |
| Plant Integrity | `plant_integrity` | 70% | eligible after M10 |

`RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions)`, bank 30.
