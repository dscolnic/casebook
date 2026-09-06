# midway_v2: the stops that cannot be built yet

**30 of the campaign's stops are held back.** Every one names a
format the game has, and the science in each is right — what is missing is a
number or a line the board is physically made of. Below is each stop and what
the build refused it with, grouped by format so one decision fixes many.

Nothing here asks you to change the story, the science, or which format a stop
uses. Where a board genuinely cannot carry what is asked — three quantities that
all have to be predicted, an order that really does branch — **split it into two
stops** and say so, rather than thinning the science to fit.

## DERIVE — 10 stops

**M1 S3 — Rebuild the brake prediction** *(Three Clocks)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

**M3 S1 — Derive the inward acceleration** *(Turning Inward)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

**M5 S2 — Predict the brake-entry speed** *(The Missing Procedure)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

**M7 S2 — Derive the joined speed** *(The Card in Hart's Hand)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

**M8 S2 — Derive what controls the period** *(Six Seconds)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

**M9 S2 — Build the braking response** *(Arm Nine)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

**M10 S2 — Derive the contact minimum** *(The Loop on Paper)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

**M11 S2 — Build the flow and power result** *(Water Has a Budget)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

**M13 S2 — Derive rotational stop demand** *(One Park, Not Seven Machines)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

**M14 S2 — Recompute for the real loop** *(The Wrong Radius)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

## ATTEST — 4 stops

**M5 S4 — Attest today's configuration** *(The Missing Procedure)*

- a ATTEST needs a `attest` block — without it the panel renders empty
- an attest board needs at least four claims
- an attest board needs a numeric `checks` budget
- the board allows undefined verifications for 0 claims — with enough for the whole list there is no decision about where to look
- every critical claim is already backed — there is nothing to hold, so closing the list blind is the right answer
- 0 critical claims are unbacked and only undefined verifications are allowed — the stop cannot be answered right
- no critical claim is backed — holding every critical claim passes without reading anything

**M6 S2 — Verify the installation claim** *(One Source, Three Readings)*

- a ATTEST needs a `attest` block — without it the panel renders empty
- an attest board needs at least four claims
- an attest board needs a numeric `checks` budget
- the board allows undefined verifications for 0 claims — with enough for the whole list there is no decision about where to look
- every critical claim is already backed — there is nothing to hold, so closing the list blind is the right answer
- 0 critical claims are unbacked and only undefined verifications are allowed — the stop cannot be answered right
- no critical claim is backed — holding every critical claim passes without reading anything

**M12 S4 — Attest both configurations** *(The Force a Rider Feels)*

- a ATTEST needs a `attest` block — without it the panel renders empty
- an attest board needs at least four claims
- an attest board needs a numeric `checks` budget
- the board allows undefined verifications for 0 claims — with enough for the whole list there is no decision about where to look
- every critical claim is already backed — there is nothing to hold, so closing the list blind is the right answer
- 0 critical claims are unbacked and only undefined verifications are allowed — the stop cannot be answered right
- no critical claim is backed — holding every critical claim passes without reading anything

**M15 S4 — Attest the certificate** *(The Name on the Certificate)*

- a ATTEST needs a `attest` block — without it the panel renders empty
- an attest board needs at least four claims
- an attest board needs a numeric `checks` budget
- the board allows undefined verifications for 0 claims — with enough for the whole list there is no decision about where to look
- every critical claim is already backed — there is nothing to hold, so closing the list blind is the right answer
- 0 critical claims are unbacked and only undefined verifications are allowed — the stop cannot be answered right
- no critical claim is backed — holding every critical claim passes without reading anything

## BALANCE — 3 stops

**M2 S3 — Divide the load** *(What Pushes Back)*

- a BALANCE needs a `balance` block — without it the panel renders empty
- a balance needs at least three streams
- a balance needs a numeric total
- a balance needs a positive tolerance
- a balance needs at least three countable streams
- the countable streams sum to 0 and the total is undefined — the ledger does not close even when everything is counted
- a balance with no `hidden` stream is arithmetic — the removal term that does not announce itself is the format
- the obvious streams alone sum to 0, inside the tolerance — leaving the hidden term out is not wrong, so nothing is learned by finding it

**M4 S2 — Close the stopping ledger** *(Where the Energy Went)*

- a BALANCE needs a `balance` block — without it the panel renders empty
- a balance needs at least three streams
- a balance needs a numeric total
- a balance needs a positive tolerance
- a balance needs at least three countable streams
- the countable streams sum to 0 and the total is undefined — the ledger does not close even when everything is counted
- a balance with no `hidden` stream is arithmetic — the removal term that does not announce itself is the format
- the obvious streams alone sum to 0, inside the tolerance — leaving the hidden term out is not wrong, so nothing is learned by finding it

**M9 S1 — Balance the wheel** *(Arm Nine)*

- a BALANCE needs a `balance` block — without it the panel renders empty
- a balance needs at least three streams
- a balance needs a numeric total
- a balance needs a positive tolerance
- a balance needs at least three countable streams
- the countable streams sum to 0 and the total is undefined — the ledger does not close even when everything is counted
- a balance with no `hidden` stream is arithmetic — the removal term that does not announce itself is the format
- the obvious streams alone sum to 0, inside the tolerance — leaving the hidden term out is not wrong, so nothing is learned by finding it

## TRIGGER — 3 stops

**M3 S4 — Write the rule before the run** *(Turning Inward)*

- a TRIGGER needs a `trigger` block — without it the panel renders empty
- a trigger board is one rule — this one has 0. The lead time, the window and the two failure directions are all in a single stage; a second stage is a second decision and belongs in its own stop
- trigger scale needs min and max, with max above min
- a trigger scale needs a `label` — it is the name of the quantity every threshold is set on, and the rows print a bare number without it
- a trigger needs at least three updates — one update is not a stream
- the stream is declared rising and its highest reading (-Infinity) is the one it opens on, so no threshold past the opening reading can ever fire
- the trigger scale tops out at undefined and the stream reaches -Infinity — every threshold fires, so no rule can be written badly

**M9 S4 — Commit the wheel limits** *(Arm Nine)*

- a TRIGGER needs a `trigger` block — without it the panel renders empty
- a trigger board is one rule — this one has 0. The lead time, the window and the two failure directions are all in a single stage; a second stage is a second decision and belongs in its own stop
- trigger scale needs min and max, with max above min
- a trigger scale needs a `label` — it is the name of the quantity every threshold is set on, and the rows print a bare number without it
- a trigger needs at least three updates — one update is not a stream
- the stream is declared rising and its highest reading (-Infinity) is the one it opens on, so no threshold past the opening reading can ever fire
- the trigger scale tops out at undefined and the stream reaches -Infinity — every threshold fires, so no rule can be written badly

**M13 S4 — Commit the joint rules** *(One Park, Not Seven Machines)*

- a TRIGGER needs a `trigger` block — without it the panel renders empty
- a trigger board is one rule — this one has 0. The lead time, the window and the two failure directions are all in a single stage; a second stage is a second decision and belongs in its own stop
- trigger scale needs min and max, with max above min
- a trigger scale needs a `label` — it is the name of the quantity every threshold is set on, and the rows print a bare number without it
- a trigger needs at least three updates — one update is not a stream
- the stream is declared rising and its highest reading (-Infinity) is the one it opens on, so no threshold past the opening reading can ever fire
- the trigger scale tops out at undefined and the stream reaches -Infinity — every threshold fires, so no rule can be written badly

## STRESS — 3 stops

**M9 S3 — Stress the wind assumption** *(Arm Nine)*

- a STRESS needs a `stress` block — without it the panel renders empty
- a stress board needs at least three candidates
- a stress board needs at least two criteria
- a stress assumption needs min, max, nominal and step
- the stress nominal is outside its own range
- the stress robust candidate "undefined" is not one of its candidates
- no candidate survives the pessimistic end of the range — the stop cannot be answered
- a stress board needs `optimiseOn` — the criterion the nominal makes look best
- the STRESS board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

**M12 S3 — Stress the tower result** *(The Force a Rider Feels)*

- a STRESS needs a `stress` block — without it the panel renders empty
- a stress board needs at least three candidates
- a stress board needs at least two criteria
- a stress assumption needs min, max, nominal and step
- the stress nominal is outside its own range
- the stress robust candidate "undefined" is not one of its candidates
- no candidate survives the pessimistic end of the range — the stop cannot be answered
- a stress board needs `optimiseOn` — the criterion the nominal makes look best
- the STRESS board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

**M15 S2 — Stress all seven decisions** *(The Name on the Certificate)*

- a STRESS needs a `stress` block — without it the panel renders empty
- a stress board needs at least three candidates
- a stress board needs at least two criteria
- a stress assumption needs min, max, nominal and step
- the stress nominal is outside its own range
- the stress robust candidate "undefined" is not one of its candidates
- no candidate survives the pessimistic end of the range — the stop cannot be answered
- a stress board needs `optimiseOn` — the criterion the nominal makes look best
- the STRESS board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

## RESIDUAL — 2 stops

**M10 S3 — Refuse the lowest average error** *(The Loop on Paper)*

- a RESIDUAL needs a `residual` block — without it the panel renders empty
- a residual needs at least two candidate fits to choose between
- the residual to accept, "undefined", is not one of the fits
- the RESIDUAL board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

**M14 S3 — Compare residual fields** *(The Wrong Radius)*

- a RESIDUAL needs a `residual` block — without it the panel renders empty
- a residual needs at least two candidate fits to choose between
- the residual to accept, "undefined", is not one of the fits
- the RESIDUAL board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

## HOLD — 1 stop

**M3 S2 — Hold the chair inside its limit** *(Turning Inward)*

- a HOLD needs a `hold` block — without it the panel renders empty
- a hold needs a `quantity` to hold and a named `control` to hold it with
- a hold needs a numeric `hold` and a positive `band`
- `narrowTo` is the band at the END of the run, so it must be positive and no wider than the band at the start
- a hold with no disturbances is a needle that stays where it is

## SWEEP — 1 stop

**M5 S3 — Sweep the brake response** *(The Missing Procedure)*

- sweep needs axis.min and axis.max, with max greater than min
- every sweep series needs at least four authored response points
- every sweep response point needs a numeric `at` and `value`
- sweep needs a numeric target
- the sweep target is outside its own axis
- sweep needs a positive tolerance
- the sweep starts on its own answer — move `start` away from `target`
- the SWEEP board could not be read — Cannot read properties of undefined (reading 'map'). Its payload is probably still in the bible's own field names.

## LOB — 1 stop

**M11 S4 — Use the water arc as a speed check** *(Water Has a Budget)*

- a LOB needs a `lob` block — without it the panel renders empty
- a lob needs between two and five marks and this one has 0

## CHAIN — 1 stop

**M12 S2 — Build the load chain** *(The Force a Rider Feels)*

- a CHAIN needs a `chain` block — without it the panel renders empty
- a chain needs at least four transfers
- the chain order must name at least four links, each of them once, all from `links`
- the chain's governing link "undefined" is not one of its transfers
- the chain needs a `distractor` — the large obvious member somebody names instead
- the chain's distractor is its governing link — there is nothing to be wrong about
- the governing link "undefined" is not in the path

## HOLDOUT — 1 stop

**M14 S1 — Freeze the old prediction** *(The Wrong Radius)*

- holdout needs axis.min and axis.max, with max greater than min
- holdout needs at least five authored points in `fit`
- the HOLDOUT board could not be read — Cannot read properties of undefined (reading 'every'). Its payload is probably still in the bible's own field names.

## Not tied to one stop

- group "COASTER" has nobody on the roster — its person stops are unreachable
- group "CAROUSEL" has nobody on the roster — its person stops are unreachable
- group "WHEEL" has nobody on the roster — its person stops are unreachable
- group "BUMPER" has nobody on the roster — its person stops are unreachable
- group "FLUME" has nobody on the roster — its person stops are unreachable
- mission 8 beat 4 ("after-stop-32"): two beats share the id "after-stop-32", so one of them plays once for both

## What to hand back

The same bible, with the missing numbers and lines added to these stops in your
own field names. The build converts the shape; it may not invent a value.
