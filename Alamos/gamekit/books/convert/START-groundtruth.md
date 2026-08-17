# Ground Truth — instructions for this game's pass

Hand over three files together:

```
books/convert/groundtruth-stops.jsonl            the 45 stops, editable
books/convert/groundtruth-stops.manifest.json    course, curriculum, equations, groups
books/interactions/CONVERSION_BRIEF.md           the twenty formats and every rule
```

This note is the game-specific half. The brief is the general half and everything
in it still applies — the reading level rule, the takeaway rule, the minimums, the
checklist in §8. Nothing here overrides it.

**This game's pass is not the usual one.** Read "What this game needs" below
before planning anything: every day already carries a panel, so the headroom is
in the twenty-six CHOICE stops sitting beside them, and the failure mode here is
adding a second heavy panel to a day that cannot hold one.

## What this game is

Station 12 is a rocket-triggered lightning research station on a coastal salt
flat, three weeks into the last half of a six-week storm season. The player is
the measurements lead: not the station lead, not the safety officer, the person
who has to be able to derive the number beside every claim in the season report.
Six areas — Field & Charge, Impulse Hall, Mast & Down-conductor, Earthing &
Transients, Coupling & the Outstation, Launch & Records.

**The argument the campaign turns on.** Adeyinka Vero holds that six weeks a year
is the entire supply of triggered strikes and a marginal field is still a field.
Hal Brenner holds that the crew is on an open flat under sixty metres of steel and
that a cell which outruns the nowcast does not care about a countdown. **Vero is
right on day 4. Brenner is right on day 12**, when the lead time goes to nothing
and the station loses a trailer. Neither is a straw man; keep both voices.

Audience: **grade 12**, AP Physics C: Electricity & Magnetism, all five units. The
subject's vocabulary is not negotiable — "Ampèrian loop", "mutual inductance",
"dielectric strength" are the words — so the lever on reading level is sentence
length.

## Where this game stands

| | |
| --- | --- |
| Stops | 45 |
| DERIVE | **10** — one on each of days 2, 3, 4, 5, 6, 8, 9, 10, 13, 14 |
| Other instruments | 5 — TRIGGER (d1) · TRACE (d7) · PROBE (d11) · VERIFY (d12) · CLOUD (d15) |
| CHOICE | **26** of 45 |
| Everything else | BALLPARK 2 · DIAGNOSIS 1 · CASEBOOK 1 |
| Concepts covered | 30 of 30 |
| Equations computed | 11 of 11, none mention-only |

**Every one of the fifteen days already carries exactly one panel.** That is the
constraint the whole pass runs into.

## What this game needs

Not eight to ten conversions. Four to six, and only on the five days whose panel
is *light*:

| Day | Existing panel | Room for a second |
| --- | --- | --- |
| 1 | TRIGGER | yes — a short one |
| 7 | TRACE | yes |
| 11 | PROBE | yes |
| 12 | VERIFY | yes |
| 15 | CLOUD | yes |
| 2–6, 8–10, 13–14 | **DERIVE** | **no** — a derivation is the heaviest panel in the engine and the day already has one |

On the ten derivation days, the work is prose and question quality on the other
two stops: sharper distractors, shorter sentences in the verdicts, and CHOICE
questions that cannot be answered by elimination. That is most of this pass, and
it is worth more here than another instrument.

Formats that fit the material where there is room:

* **VALUE** (d12) — what would this measurement change, on a day already about
  predicting and then measuring.
* **PROPAGATE** (d11) — which input width dominates the peak-current estimate:
  the shunt calibration, the clamp position or the digitiser's timebase.
* **BALANCE** (d7) — close the ledger on where the strike current went, given the
  grid legs, the conduit and the trailer rod.
* **ATTEST** (d15) — the season's claims against what actually backs each; the
  CASEBOOK there does part of this, so pick one or the other.
* **STRESS** (d1) — the launch criterion against the range of cell speeds
  actually recorded this month.

**Do not add a second DERIVE anywhere.** Ten is already the most in any game.

## What may not change

**The numbers, because they are all connected.** Field 4.5 kV/m at the ground and
σ = 8.0 × 10⁻⁸ C/m² on the layer · cloud base 1.2 km up, so V = −5.4 MV · mast
60 m, tip radius 0.020 m, so 1.4 × 10⁷ V/m against 3 × 10⁶ for dry air · plate
model A = 1.0 × 10⁷ m², C = 74 nF · bank 12 stages × 100 nF × 50 kV = 125 J a
stage, 1,500 J total, 600 kV out at 8.3 nF · strike 30 kA peak, 100 µs long, 3 C
delivered, front 1 µs so dI/dt = 3 × 10¹⁰ A/s · B = 3.0 mT at 2 m · trench run
ℓ = 40 m, a = 1.5 m, b = 3.5 m, M = 6.8 µH, ε ≈ 200 kV · bonding lead 6 m at
1 µH/m, R = 0.3 mΩ, so 9 V resistive and 180 kV inductive · earth grid 25 Ω at DC
· electrometer 10 MΩ × 100 pF, τ = 1 ms · day 11: 29 kA at the 15 m shunt, 18 kA
at the base, so 12 kA leaves through the conduit.

Change one of those and the derivation two days later stops closing.

**The two reversals.** Day 9: the outstation died from 200 kV induced around a
loop bonded to nothing the strike touched — the insulation is intact and a
battery logger three metres away is unharmed. Day 10: the April certificate is an
honest measurement of steady-state resistance and is silent about the term that
did the damage. Neither is a mistake by a person; both are the right measurement
of the wrong quantity.

**`askRule: true` stays on, and every step keeps at least two distinct rules
among its candidates.** This is the only game in the set that asks for the rule,
and the reason is that in E&M the choice of law *is* the physics. A step whose
key applies superposition while a distractor applies Gauss's law to a surface
with no symmetry is the lesson. A step where all four candidates claim the same
rule turns the second half of the answer into a click with one possible value,
which is why it is off in Midway and Headwater. If you rewrite a DERIVE step,
check that condition yourself.

**Every DERIVE step keeps a wrong branch marked `survives: true`** — one that is
algebraically valid and leads somewhere wrong. A step whose wrong branches are
all visibly malformed is passable by elimination, and the importer refuses it.

**The cast, by role.** Vero (Station Lead), Brenner (Operations & Safety),
Sifuentes (Earthing Engineer), Strand (High-Voltage Engineer), Lauwers (EMC
Engineer), Tate (Rigger & Mast Supervisor), Halvorsen (Field Instruments), Nakata
(Current Measurement), Ruiz (Impulse Hall Technician), Okoro (Test Engineer),
Abioye (Instrumentation), Kaya (Records & Data). **Sifuentes signed the
certificate that turns out to be beside the point, and she is the one who says
so** — she is not the person who got it wrong, and no rewrite may make her one.

**The safety frame.** Nobody handles a charged bank, nobody is on the flat under
a cell, and the rockets are research hardware. The stakes are a season, a
trailer and a funding review.

## The four things it will get wrong

1. **Reordering options.** They are applied by position. Rewording in place is
   fine; moving one re-keys the question to whatever lands in that slot. Same for
   rebuttals, and same for a DERIVE step's candidates — `answer` is an index.
2. **A `BALLPARK` with no runnable `formula`.** It needs `labels`, `values`,
   `correct`, `slots`, `template`, `formula`, `target`, `tolerance`, `units`, at
   least one distractor tile, and no tile that *is* the answer.
3. **Long sentences, not hard words.** Five verdicts in this game had to be split
   before it passed its own reading gate, and none of them had a hard word in it.
4. **A pass mark that is a sentence, or a number nothing can reach.** State the
   arithmetic at both ends in `trap_is_satisfied_by`.

One more, particular to this game: **the keyed answer must not be the longest
option.** The first draft had it longest in 21 of 27 questions and had to be
rebalanced to 0; a batch of rewrites that puts the reason back into the key
undoes that, and `answerShape` will fail the game.

## The prompt

> You are editing one educational game — an AP Physics C: Electricity & Magnetism
> campaign for grade 12 — to improve its questions and prose, and to convert a
> small number of its multiple-choice stops into instrument panels.
>
> I have uploaded three files:
>
> 1. `CONVERSION_BRIEF.md` — the brief: the instrument formats, the book block
>    each needs, and the trap each has to clear. Read §4b and §8 before writing.
> 2. `START-groundtruth.md` — this game specifically: what it is, the argument it
>    turns on, the numbers that may not change, and — importantly — which days
>    have room for another panel and which do not.
> 3. `groundtruth-stops.jsonl` — the forty-five stops, one JSON object per line.
>
> Work in five batches of three days, starting with days 1–3. For each batch
> return only the JSONL rows for those days, edited in place — same ids, same
> field names, same option order, same candidate order inside any DERIVE. Stop
> after each batch and wait for me to say "next".
>
> Convert four to six stops in total, and only on days 1, 7, 11, 12 and 15. Do
> not add a second panel to a day that already carries a DERIVE. Do not add
> another DERIVE anywhere. Every converted row carries its own `data` block with
> real numbers and the trap arithmetic stated at both ends in
> `trap_is_satisfied_by`.
>
> On the ten derivation days, the work is the other two stops: sharper
> distractors, shorter sentences in the verdicts, and questions that cannot be
> answered by elimination. If you edit a DERIVE step, keep at least one wrong
> candidate marked `survives: true` and at least two distinct `rule` values among
> the candidates.
>
> Do not change any number listed under "What may not change" — the derivations
> are chained and one changed value breaks a later day.
>
> After the last batch, write the prose summary the brief asks for in §8.

## When it comes back

```sh
cd gamekit
node tools/check-conversions.mjs groundtruth returned.jsonl
node tools/apply-conversions.mjs groundtruth returned.jsonl --dry
node tools/apply-conversions.mjs groundtruth returned.jsonl
node tools/import-book.mjs books/groundtruth.yml groundtruth --verify
npm run check groundtruth
npm run drive groundtruth
```

`npm run drive` matters more here than in any other game: fourteen of this game's
panels are interactive, and a DERIVE that renders perfectly can still fail to
grade if a candidate index moved.
