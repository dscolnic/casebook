# A retarget pass — the same place, aimed at a different course

This is how one of the seven university-level games gets a high-school edition
that is not a simplification of it. `MIDDLE_SCHOOL_EDITIONS.md` changes the
**reader**; `REWRITE_PASS.md` re-authors the **questions** for the same course;
this changes the **course** and keeps everything else.

Three exist: `deepwatch_hs`, `contamcity_hs`, `the_trial_hs`.

## 1. Why these three, and not the other four

The seven games at university level got there the same way: **the setting is a
workplace, and a workplace runs on the professional layer of its subject.** A
submarine needs the sonar equation, a switching station needs N-1 contingency, a
coordinating centre needs alpha spending. So the AP course a place could carry is
usually a subset of what the campaign teaches, plus one or two units it does not.

The test for a retarget is not difficulty. It is **whether the place can host the
whole of an AP syllabus**, and it was answered per game before any writing:

| Game | Retargeted to | What the place could not host |
| --- | --- | --- |
| Deep Watch | AP Physics 2, all seven units | electrostatics, optics and modern physics — see §2 |
| The Contaminated City | AP Chemistry, the aqueous half | nothing; the analytical layer comes *out* |
| The Trial | AP Statistics, all nine units | nothing; a coordinating centre already has all of it |
| Blackout | — | AP Physics 2 minus circuits and induction is five units of nothing |
| Ice Core | — | APES wants populations, land use, energy; a polar camp has none |
| Aftershock | — | the honest AP is Physics 1, which Safety Factor already is |
| Quantum | — | no AP course contains it |

Two of the three also had real delivery debt, which a retarget pays at the same
time: Deep Watch computed 6 of its 10 syllabus equations and ContamCity 7 of 12.

## 2. The fittings that carry a missing unit

Deep Watch looked three units short and was not, and the general lesson is that a
workplace usually already contains the school version of its own subject:

- **electrostatics** — the sonar transducer is a slab of piezoelectric ceramic
  between two electrodes, i.e. a capacitor driven at kilovolts;
- **geometric optics** — the periscope is two mirrors and an objective, looking up
  through a refracting surface, so Snell's window is on the boat already;
- **modern physics** — the atmosphere rig is a mass spectrometer, the low-light
  channel is a photocathode, and the escape-route markers are tritium.

**No reactor was added.** The tempting move was to make the boat nuclear to reach
the modern-physics unit, which would have changed the place — and the place is
the one thing a retarget may not touch.

The 2024 AP redesign is what makes the fit work at all: fluids moved out of
Physics 2 into Physics 1, and waves and sound moved in. So the flooding and
depth-change days are not hydrostatics stops any more. They are the
thermodynamics unit, because blowing a ballast tank at ninety metres is gas at
pressure doing work.

## 3. The marker, and why it is its own line

`editionParity` fails a same-grade edition, because an edition nobody rewrote for
anybody is a second copy of the game. `REWRITE_PASS.md` has the exemption:

    // same-grade-rewrite: a second authoring of the same course, for comparison

A retarget is not that, and using that line would make the marker lie in the file
whose whole job is to stop an unexplained copy. So:

    // same-grade-retarget: AP Physics 2, where deepwatch is naval acoustics

The two are mutually exclusive, and the retarget marker has one more refusal
behind it: **the edition must have its own syllabus block, whose `course` differs
from the base's.** An edition claiming a new course while sharing the old one's
syllabus is exactly the copy the rule exists to catch, wearing the exemption.

## 4. The order of work, and what each step cost

```sh
cd gamekit
node tools/derive-edition.mjs <base> --suffix hs --grade 12 --days 1,2,…,15
```

Every day, because a retarget keeps the campaign's length. Then:

1. **The marker**, by hand, in `themes/<base>_hs/theme.js` (§3).
2. **A syllabus block and an equation list** in `tools/syllabus.js` — 30 concepts
   with a `needs` graph, and 16–19 equations. **Check the graph for cycles the
   moment it is authored**; and expect to delete edges, because the first draft
   of a `needs` list states sequencing conveniences as derivations. Six came out
   of these three: refraction does not come from reflection, F = qv×B is not a
   consequence of the field a current makes, kinetic theory is statable without
   the gas law, nuclear decay does not rest on electronic structure, free energy
   is not derived from calorimetry, and a standard potential is measured rather
   than derived from ΔG.
3. **`curriculumDelivery` is the work list.** It reported 3/19, 6/16 and 4/16 on
   the scaffolds. Every gap is one stop to author.
4. **The stop rewrites** — 19, 12 and 14 of 48. `import-book` after each pair,
   because its refusals are the cheapest checker in the loop.
5. **`concept:` and `takesAsRead:`** to satisfy `conceptOrder`. Most rows are the
   keyword picker guessing from the wrong unit — an electrical concept on a sonar
   stop — and are fixed by authoring the claim, not by declaring anything.
6. `npm run check <edition>`.

`derive-edition` already strips `concept:` and `takesAsRead:` on the way across,
which is what a retarget needs: the new syllabus shares no concept title with the
old one.

## 5. Two rules the stop rewrites obey

**A day-1 stop can only claim a root concept.** `conceptOrder` requires a base on
a *strictly earlier* day, so any chain inside day 1 fails however it is ordered.
The Trial's day 1 claims three roots — a sample and its population, a
distribution, and probability rules — and its mean stop declares the
distribution rather than pretending to teach it that morning.

**A stop says which equation it computes, in words the syllabus can match.**
`curriculumDelivery` reads `relationship`, the template, the worked solution, a
DERIVE's own lines, and an instrument board's numbers. A board's numbers are bare
quantities, so an instrument stop had no way to say what it was computing — see
the importer note below. And a short signature (`pv=nrt` is six characters) is
below the significance floor, so the relationship has to carry one of the
equation's own keywords: *the ideal gas law, PV = nRT, rearranged to n = PV ÷ RT*.

## 6. One importer fix came out of this, and it was already a live defect

`relationship` was only read out of an `estimate:` block, so it was a BALLPARK
field in practice — while `curriculumDelivery` decides whether the course *taught*
an equation by reading exactly that string. A VERIFY that predicts a volt drop
from Ohm's law was computing the equation on screen and uncomputed as far as every
gate could tell.

It was already being authored at stop level: `books/redsand-ms.yml` writes one on
a BALANCE, where it had been silently dropped since the day it was written. That
is this repo's own rule about a key that never reaches the game, so it is carried
for every format now. The BALLPARK branch takes the estimate block's own value
first and the stop-level one as the fallback — spreading `base` and then assigning
`''` there is what blanked it.
