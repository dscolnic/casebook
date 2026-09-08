# Eight BALLPARK boards that would open on a broken panel

The eight campaigns import clean apart from these, and they are all one thing.

| campaign | mission | stop |
| --- | --- | --- |
| Ground Truth | 7 Four Screens, One Wire | 4 |
| Ground Truth | 8 A Field Without Contact | 3 |
| Headwater | 1 The Rate-Limit Rule | 3 |
| Headwater | 5 The Last-Half-Metre Relation | 2 |
| Headwater | 11 The Quiet-Day Check | 2 |
| Headwater | 14 The Lead-Time Rule | 1 |
| Planetary Defense | 11 One Push | 1 |
| Red Sand | 7 Heat | 2 |

Each still carries the one-board-per-format template the second handback was
about. Ground Truth's mission 7 stop is the clearest: the question asks the
player to use `I = 3.0 mA`, `R = 120 Ω` and `V_true = -4.2 V` and submit a
voltage drop, a recorded voltage and a lead power. Its estimate block is:

```yaml
estimate:
  target: 360.0
  tolerance: 18.0
  unit: "units printed on the card"
  tiles: [{label: "displayed numerator", value: 720.0}, {label: "displayed divisor", value: 2}]
  formula: "displayed numerator / displayed divisor"
```

720 ÷ 2 is not in the stop. Neither is a numerator.

**Why these eight and not the other eleven.** Every other BALLPARK board came
back in the fifth round's shape and all eleven now build:

```yaml
estimate:
  quantity: "maximum methane from the hydrogen supply"
  unit: "mol CH4"
  inputs:
    - {label: "Hydrogen feed", value: 320, unit: "mol H2"}
    - {label: "Hydrogen coefficient", value: 4, unit: "mol H2 per mol CH4"}
    - {label: "Carbon-dioxide feed", value: 100, unit: "mol CO2", contextOnly: true}
  operation: "divide hydrogen feed by the 4:1 stoichiometric coefficient"
  formula: "320 / 4"
  correctResult: 80
  tolerance: 1
```

**Write these eight the same way.** The panel is a bank of number tiles: each
input becomes one, a `contextOnly` input becomes a distractor, and the printed
row is read off the formula. A number the formula uses that no input carries
stays a constant rather than becoming a tile nobody measured.

## Why it is worth doing rather than leaving

The template board has no printed row for the panel to fill in, and the panel
builds its equation by replacing the slots in that row. There is nothing to
replace, so the stop **throws before drawing anything** — a dead panel where the
question should be, in the middle of a mission. That is now refused at import
rather than found in play, which is why these eight are the only thing standing
between the eight campaigns and a clean build.

---

## Three bibles changed after you last sent them — re-upload these first

Your last upload was the eight bibles at 18:44. Three of them have been edited
since, to close the last six refusals, and **your copies are now behind**. If you
work from your own copies of these three and send them back, the edits go with
them and the six problems return.

| file | what changed |
| --- | --- |
| `ELEVEN_DAYS_Planetary_Defense_Campaign_Implementation_Bible_v1 (1)(1).md` | Mission 4's PROPAGATE board rewritten as a **Handback 7** block. The earlier ones are left in place. |
| `Safety_Factor_AP_Physics_1_Campaign_Implementation_Bible_v1 (1)(1).md` | One cast heading: Luka Kovač is now `TOWER mechanical lead, working the coaster and the flume`. |
| `CARRYING_CAPACITY_APES_Campaign_Implementation_Bible(1)(1)(1).md` | Four items added to the mission 1 **Handback 6** BELT block: `sulfur` and `potassium` on the left, `electrical work` and `infrared radiation` on the right. The bank is 24, twelve a side. |

The other five are byte-for-byte what you sent. Ground Truth and Red Sand were
not in the 18:44 upload at all, so those two are still your 17:09 versions.

**Only Planetary Defense is one of the four campaigns this page asks about.** The
other two are here because a stale copy would undo work, not because they owe
anything.

### Why the Planetary Defense board was rewritten rather than sent back

Every input was written `sigmaFrac: 1.0` with its real width in `value`, in
kilometres. The panel ranks contributions by `|exponent| × sigmaFrac`, so a
uniform fraction made that ranking nothing but the exponent: angular arc came out
dominant where the board named range, and the budget then appeared to cover
everything. The widths are now fractions of a named corridor —

```yaml
output: {label: "b-plane corridor width", value: 16000, unit: "km"}
```

— which makes range the widest at 0.863 against angular arc's 0.776, with angular
arc still carrying the larger exponent. That is the shortcut the format exists to
break. Your costs are unchanged and they work: the range fix is affordable at 50
of 65, and 65 will not buy it plus anything else. `radar_plus_dawn` is no longer
an input, because it is the purchase that narrows the range term rather than a
fifth source of error, and the corridor still closes to about 4,600 km.

**The same trap applies to any error budget you write from here.** A `sigmaFrac`
is a fraction of the quantity the terms propagate into, never the width itself.
