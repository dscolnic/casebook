# The Trial — instructions for this game's pass

Hand over three files together:

```
books/convert/the_trial-stops.jsonl            the 45 stops, editable
books/convert/the_trial-stops.manifest.json    course, curriculum, equations, groups
books/interactions/CONVERSION_BRIEF.md         the nineteen formats and every rule
```

This note is the game-specific half. The brief is the general half and everything
in it still applies — the reading level rule, the takeaway rule, the minimums, the
checklist in §8. Nothing here overrides it.

## What this game is

CLARION-3 is a running clinical trial, three weeks before its second interim
analysis. The player is the Methodology & Operations Lead: not a doctor, not a
statistician, the person who has to keep the trial able to answer its own
question. Six areas — Randomisation & Blinding, Endpoints & Measurement, Safety
Monitoring, Statistical Analysis, Site Operations, Regulatory & Reporting.

**The argument the campaign turns on.** Balogun holds that every month of delay
is people left on the arm that will turn out to be worse. Feldman holds that the
boundary exists so the room cannot fool itself, and that trials stopped early
overstate what they found. **Balogun is right on day 3. Feldman is right on day
13.** Both are right at different points, neither is a straw man, and the player
should feel that shift happen rather than be told about it. Preserve both voices
exactly as they are.

Audience: **grade 12**. The course is AP Statistics' design and inference units,
carried through a real trial, plus the trial methodology an introductory clinical
epidemiology course adds. The vocabulary of the subject is not negotiable —
"allocation concealment" is the term — so the lever on reading level is sentence
length, not word choice.

## Where this game stands, and why it is the biggest job

| | |
| --- | --- |
| Stops | 45 |
| Instruments already | **0** |
| CHOICE | **27** of 45 |
| Everything else | BALLPARK 4 · PROTOCOL 4 · SEQUENCE 3 · TRIAGE 3 · DIAGNOSIS 3 · SCIENCETANK 1 |

Twenty-seven of forty-five stops are the same screen: read a situation, pick one
of four. The prose is good and the reasoning is real, but three CHOICE stops in a
row is three identical days. **This game has more room for instruments than any
other and has none.**

Target **8 to 10 conversions**, as the brief says. Not more.

## The ten candidates, with the format each should become

These are proposals, not orders. If you disagree with one, say why and propose a
different stop — but return the reasoning, because "no conversions here" with no
argument is the one answer that cannot be acted on.

**1. `the_trial.m04.s1` — "What an extra look spends" (STAT) → `ALLOCATE`**
The type I error budget is a finite pool that does not refill, and every look at
the endpoint spends part of it. That is exactly what ALLOCATE is: a pool, items
with costs, and a plan that must not be affordable whole. The trap writes itself
— if every planned look plus the unplanned one fits inside α, the stop teaches
that looking is free.

**2. `the_trial.m05.s1` — "What a short screening log says" (SITE) → `BALANCE`**
A recruitment funnel is a ledger: screened = eligible + excluded + declined +
entered. The short log means one term is missing, and BALANCE is the format for
closing a ledger and naming the hidden term. Currently a DIAGNOSIS.

**3. `the_trial.m05.s2` — "Balance is bought in blocks" (RAND) → `CLOUD`**
Simple randomisation produces a *distribution* of arm imbalance, wide in small
numbers; blocking narrows it without moving its centre. CLOUD is the format where
narrowing is not shifting, and this is the cleanest instance of that idea in the
whole game.

**Note — two days carry two candidates each.** Candidates 2 and 3 are both on day
5; candidates 4 and 9 are both on day 14. **Take one from each pair, not both** —
the brief allows at most two instruments in a day and one is better. Taking one
from each pair leaves eight conversions, which is exactly the target.

**4. `the_trial.m14.s1` — "Three things the board can say" (SAFE) → `STRESS`**
The board can stop for benefit, stop for futility, or continue, and the true
effect is not known — it is a range. STRESS runs candidates against an
assumption's range, and this is the stop where the campaign's own argument gets
settled: an effect that has not crossed its boundary looks like a win at the top
of the range and like nothing at the bottom, which is why trials stopped early
overstate what they found. It is currently a PROTOCOL matching four board actions
to what each gives up, which is the right content in a format that lets the player
match rather than test. **Safety Monitoring has no instrument otherwise**, and an
area with no instrument across fifteen days is a flat area.

**5. `the_trial.m07.s3` — "What is worth chasing" (SITE) → `DELEGATE`**
A fortnight of monitoring effort across thirty-one sites, a finite team, and some
visits that command has to take itself. Currently SCIENCETANK, which is close but
does not make the player feel the team run out.

**6. `the_trial.m08.s3` — "Recorded, whether or not it mattered" (REG) → `ATTEST`**
"The record is not the condition" is the ATTEST tagline and it is this stop's
takeaway in different words. An excursion that changed no result is still a
deviation, because the record exists so somebody later can judge it.

**7. `the_trial.m10.s1` — "Reading the same files twice" (ENDP) → `TRACE`**
Two adjudicators reading the same source notes are not two independent readings —
they share a reference, and agreement between them is not evidence. TRACE is
built for exactly that confusion.

**8. `the_trial.m13.s1` — "How often something clears the line by luck" (STAT) → `TALLY`**
Currently a BALLPARK that computes 1 − 0.95¹⁴. Good arithmetic, but the lesson
lands far harder if the player *runs* subgroup tests under a true null and watches
one clear the line. TALLY accumulates into bins and grades the decision about when
there is enough to report.

**9. `the_trial.m14.s2` — "What the rest of the trial would probably do" (STAT) → `TRIGGER`**
Conditional power is a futility rule, and a futility rule is worthless written
after the number arrives. TRIGGER makes the player state the rule before the
number moves, which is the whole point.

**10. `the_trial.m06.s2` — "Who a wider door lets in" (SITE) → `CONTROL`**
The amendment changed one thing — eligibility — and the event rate fell. CONTROL
is change one thing, reverse it, and see whether the effect follows.

**11. `the_trial.m09.s2` — "Which numbers this reaches" (ENDP) → `STRESS`, in reserve**
A 71 per cent guessing rate is an assumption with a range, and the four endpoints
survive that range differently: the counted ones are untouched, the judged ones
are not. Take this **only if you reject one of the ten above** — candidate 4 is
the stronger STRESS and two of the same instrument in one campaign is a waste of a
format.

## The syllabus gaps — these are real content targets

The manifest carries 33 concepts and 10 equations. Coverage as it stands:

**One concept nothing teaches:**

- **Surrogate outcomes, and what they stand in for.** Nowhere in 45 stops. A
  trial that measures a laboratory number instead of the thing anybody cares about
  is one of the two or three most consequential ideas in the subject, and CLARION-3
  has an adjudicated clinical endpoint, so the game never has to confront it.
  Worth adding to an existing ENDP stop rather than inventing a new one.

**Three equations the game names and never computes:**

- **`RR = p_treatment / p_control`** — *absent entirely*. `m10.s2` computes ARR
  and NNT from 18.9% and 14.7%, and its explanation *mentions* that the same
  result is a 22 per cent relative reduction. The player never works that out. The
  contrast between the two ways of stating one result is `m15.s1`'s entire
  subject — that stop and this equation belong to each other and are currently
  strangers.
- **`CI ≈ estimate ± 1.96 × SE`** — mentioned in three stops, computed in none,
  even though `m10.s2`'s takeaway is that the *width* of the interval is what says
  how much is unknown.
- **`SE = √(p(1−p)/n)`** — mentioned in three, computed in none. This is why
  halving an interval costs four times the participants, which is the reason
  sample size is fixed before a trial rather than during it.

Closing these matters more than any single conversion. Say which ones you moved
from mentioned to computed.

## Two things specific to this game

**Do not soften the ending.** Days 13 to 15 are about what a result is entitled to
claim, what a subgroup finding is worth, and what the trial owes the people in it
after the board reports. The last three takeaways —"Two true sentences about one
result can leave very different impressions", "An honest claim carries its
uncertainty", "Consent is maintained, not collected once" — are the point of the
whole campaign. They must not be rewritten into anything reassuring.

**Watch the names of the six areas.** RAND, ENDP, SAFE, STAT, SITE, REG. A stop's
`group` is not editable and a conversion must still teach that area's subject —
converting a SAFE stop into a statistics puzzle empties an area.

## What comes back

One file, `the_trial-stops-edited.jsonl`, **every row**, changed or not, in the
same order. Plus the prose summary §6 of the brief asks for, which for this game
must answer:

1. Which conversions you took, which of the eleven above you rejected and why.
2. Which equations moved from mentioned to computed.
3. Whether surrogate outcomes got taught anywhere, and where.
4. Whether Balogun and Feldman still read as themselves.
