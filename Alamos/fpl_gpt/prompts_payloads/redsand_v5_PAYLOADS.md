# redsand_v5: the stops that cannot be built yet

**11 of the campaign's stops are held back.** Every one names a
format the game has, and the science in each is right — what is missing is a
number or a line the board is physically made of. Below is each stop and what
the build refused it with, grouped by format so one decision fixes many.

Nothing here asks you to change the story, the science, or which format a stop
uses. Where a board genuinely cannot carry what is asked — three quantities that
all have to be predicted, an order that really does branch — **split it into two
stops** and say so, rather than thinning the science to fit.

## STRESS — 2 stops

**M6 S2 — Does calibration uncertainty rescue the leak theory?** *(The Leak That Was Not)*

- a STRESS needs a `stress` block — without it the panel renders empty
- a stress board needs at least three candidates
- a stress board needs at least two criteria
- a stress assumption needs min, max, nominal and step
- the stress nominal is outside its own range
- the stress robust candidate "undefined" is not one of its candidates
- no candidate survives the pessimistic end of the range — the stop cannot be answered
- a stress board needs `optimiseOn` — the criterion the nominal makes look best
- the STRESS board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

**M10 S3 — Stress the hidden temperature error** *(The Saboteur)*

- a STRESS needs a `stress` block — without it the panel renders empty
- a stress board needs at least three candidates
- a stress board needs at least two criteria
- a stress assumption needs min, max, nominal and step
- the stress nominal is outside its own range
- the stress robust candidate "undefined" is not one of its candidates
- no candidate survives the pessimistic end of the range — the stop cannot be answered
- a stress board needs `optimiseOn` — the criterion the nominal makes look best
- the STRESS board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

## BALANCE — 2 stops

**M6 S3 — Close C, H, and O at the Tank Farm** *(The Leak That Was Not)*

- a BALANCE needs a `balance` block — without it the panel renders empty
- a balance needs at least three streams
- a balance needs a numeric total
- a balance needs a positive tolerance
- a balance needs at least three countable streams
- the countable streams sum to 0 and the total is undefined — the ledger does not close even when everything is counted
- a balance with no `hidden` stream is arithmetic — the removal term that does not announce itself is the format
- the obvious streams alone sum to 0, inside the tolerance — leaving the hidden term out is not wrong, so nothing is learned by finding it

**M11 S2 — Complete the ICE table** *(Fast Is Not the Same as More)*

- a BALANCE needs a `balance` block — without it the panel renders empty
- a balance needs at least three streams
- a balance needs a numeric total
- a balance needs a positive tolerance
- a balance needs at least three countable streams
- the countable streams sum to 0 and the total is undefined — the ledger does not close even when everything is counted
- a balance with no `hidden` stream is arithmetic — the removal term that does not announce itself is the format
- the obvious streams alone sum to 0, inside the tolerance — leaving the hidden term out is not wrong, so nothing is learned by finding it

## HOLDOUT — 2 stops

**M10 S1 — Freeze the accusation and reveal the holdout** *(The Saboteur)*

- holdout needs axis.min and axis.max, with max greater than min
- holdout needs at least five authored points in `fit`
- the HOLDOUT board could not be read — Cannot read properties of undefined (reading 'every'). Its payload is probably still in the bible's own field names.

**M14 S2 — Test certification on the newest sample** *(FULL)*

- holdout needs axis.min and axis.max, with max greater than min
- holdout needs at least five authored points in `fit`
- the HOLDOUT board could not be read — Cannot read properties of undefined (reading 'every'). Its payload is probably still in the bible's own field names.

## SWEEP — 1 stop

**M4 S4 — Can the blue residue ride the gas stream?** *(What Can Travel Where?)*

- sweep needs axis.min and axis.max, with max greater than min
- every sweep series needs at least four authored response points
- every sweep response point needs a numeric `at` and `value`
- sweep needs a numeric target
- the sweep target is outside its own axis
- sweep needs a positive tolerance
- the sweep starts on its own answer — move `start` away from `target`
- the SWEEP board could not be read — Cannot read properties of undefined (reading 'map'). Its payload is probably still in the bible's own field names.

## BALLPARK — 1 stop

**M7 S2 — Size the coolant load** *(Heat)*

- ballpark needs an `estimate` block, or an `estimatesByTitle` entry for its title — prose carries no arithmetic

## ALLOCATE — 1 stop

**M13 S4 — Allocate the recovery power** *(Power)*

- every allocation answer is required — there is nothing the plan is allowed to forgo, which is the decision this format exists to make

## TRIGGER — 1 stop

**M14 S4 — Write the rule before the final samples** *(FULL)*

- a TRIGGER needs a `trigger` block — without it the panel renders empty
- a trigger board is one rule — this one has 0. The lead time, the window and the two failure directions are all in a single stage; a second stage is a second decision and belongs in its own stop
- trigger scale needs min and max, with max above min
- a trigger scale needs a `label` — it is the name of the quantity every threshold is set on, and the rows print a bare number without it
- a trigger needs at least three updates — one update is not a stream
- the stream is declared rising and its highest reading (-Infinity) is the one it opens on, so no threshold past the opening reading can ever fire
- the trigger scale tops out at undefined and the stream reaches -Infinity — every threshold fires, so no rule can be written badly

## DEGENERACY — 1 stop

**M15 S2 — Collapse the last degeneracy** *(GO / NO-GO)*

- the two loci do not both pass through the truth — they have to cross there, or the intersection is not the answer

## What to hand back

The same bible, with the missing numbers and lines added to these stops in your
own field names. The build converts the shape; it may not invent a value.
