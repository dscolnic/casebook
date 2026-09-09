# Boomtown — first read

`BOOMTOWN_AP_Microeconomics_Campaign_Implementation_Bible_v1.0.md`, built and
imported. **It plays.** Fifteen missions, sixty stops, five offices on the mesa
town's own footprint, four bars, worked examples, every stop reachable.

Two things are missing that only you can write; one line has already been
changed on your behalf and needs to come back in your next revision; and the
concept spine has an ordering problem worth a look.

---

## 0. One word we changed, which you should carry back

**M14 stop 3, the STRESS board.** `"optimiseOn": "net"` names the column the
robust plan *already wins* — access retrofit scores 15 on net against 0 and
−10 — so at the nominal the right answer is also the best number and moving the
slider teaches nothing. Your own wrong-path line says which column is the
tempting one:

> New line fails above 10% even though its nominal **service** score is
> attractive.

So it is `"optimiseOn": "service"`, where the new line leads at 50 against 35
and 20. We changed that one word in the copy of the bible we build from,
because it was the last thing standing between this campaign and importing at
all. **It will revert the next time you send a file**, so please make it in
yours.

## 1. The fifteen pieces of what the town builds

Every campaign in this set builds **one named thing, a piece a mission**: the
opening card names it, each mission hands over that day's piece, and a board in
one room shows all fifteen at once. Boomtown names nothing, so the board in the
Civic Advice Office is still showing **Project Y's** — "The Evidence Chain",
"The counting notebook", "The mass defect calculation" — which is a weapons
laboratory's paperwork in a town hall.

Your §2.1 already writes the fifteen, one per mission:

> | 1 | The diner posts a meal-for-repair agreement and reopens its lunch queue |
> | 8 | New vendor permits appear beside the diner's old menu |
> | 14 | The new-line ribbon is taken down and the access retrofit stays on the hearing board |

What is needed is a **name** for the whole thing and a **short name per piece**:

```yaml
delivery:
  name: "The Freight Agreement"          # or whatever the town actually signs
  what: "…one sentence: what it is and who reads it."
  pieces:
    - "The lunch price finding"          # M1
    - "The demand-shift explanation"     # M2
    - …fifteen in all, one per mission
```

## 2. Nothing closes the campaign

No **ending card** anywhere. Mission 15's outcome is written; what is missing is
the two or three paragraphs after it — the agreement was signed, this is what it
cost and who it cost, this is what the town did not settle. A campaign whose
subject is distribution should close on who gained and who paid.

---

## 3. Twenty-nine concept-ordering problems

This is the largest content finding and it is worth reading carefully, because
the measurement is against **your own §5 Prerequisites column**. We build a
syllabus from that column — concept 4 "Demand, supply and equilibrium" lists
prerequisites 1 and 3 — and then check that a stop claiming a concept comes
after a stop that taught what it is built out of.

Two shapes come up:

- **21 stops claim a concept whose prerequisite no stop ever teaches.** Concept
  3, "Marginal choice and utility per dollar", is a prerequisite of concept 4
  and is claimed by no stop in the campaign. Either a stop should teach it or it
  should not be listed as a prerequisite.
- **8 stops sit on the same day as their own prerequisite.** Day 1 teaches
  concept 1 at stop 1 and claims concept 2 at stops 2, 3 and 4. That may be
  deliberate — a day that builds on itself — but a player meets both in one
  sitting, so it is worth confirming rather than inheriting.

## 4. Fifteen mission cards never say what the player decides

*"Today you decide which explanation the council should post."* Fifteen of
fifteen say what is happening and never turn to the player.

## 5. Thirteen segues do not turn

The segue's job is a complication — *but*, *yet*, *so*, *now*. Thirteen state a
fact and stop.

## 6. Six stakes run 60 to 67 words

The card is read in about fifteen seconds. Two sentences, or three short ones.

## 7. No question scene names anybody

**0 of 60.** Mara Velez, Nico Bell, Ruth Sen, Leila Moss and Owen Price are on
the calls and in no question. *Nico has the week's invoices spread on the
ledger desk* is four words and puts him in the room.

## 8. Fourteen cards over the reading ceiling

Mean 7.3, worst 8.6, fourteen of sixteen above 6.5. This is the accessibility
pass and it is a round of its own — worth doing after the items above.

## 9. Five passages, no questions

The five bios are readable and none carries a question.

---

## On our side, no action wanted

The place is Project Y's mesa with the footprint preserved exactly as §3 asks —
same five compounds, same roads, same pond, same fourteen landmarks — and now
dressed as a town in a boom: a tent and trailer row with washing lines and a
standpipe, a half-framed building with lumber and a mixer, a freight yard with
bays and a container, market stalls, queues at the diner and the parcel counter,
hoardings on Trinity Drive. The jeeps are modern pickups inside the identical
colliders, which §3 asks for outright. Your §2.1 events drive the dressing: the
lunch queue opens on M1, the vacant rooms on M3, two more stalls on M8, and the
new-line ribbon stands from M10 and comes down on M14.

Three things the build learned from this bible:

- **your boards are JSON and nothing read JSON.** 45 of your 60 came back empty,
  including fifteen CHOICE stops reported as having no options at all;
- a SEQUENCE that numbers its cards from one — `order: ["1","2","3","4"]` — was
  being read as positions, so the rail came out with one card twice and one
  never placed;
- a VERIFY whose truth is negative (−10 dollars a shift) had its pass band
  computed by division, which inverts. Both the check and the panel's grading
  had it wrong.
