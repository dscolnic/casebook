# carrying_v2: the stops that cannot be built yet

**27 of the campaign's stops are held back.** Every one names a
format the game has, and the science in each is right — what is missing is a
number or a line the board is physically made of. Below is each stop and what
the build refused it with, grouped by format so one decision fixes many.

Nothing here asks you to change the story, the science, or which format a stop
uses. Where a board genuinely cannot carry what is asked — three quantities that
all have to be predicted, an order that really does branch — **split it into two
stops** and say so, rather than thinning the science to fit.

## BELT — 3 stops

**M1 S3 — Separate matter from energy** *(What the Island Depends On)*

- a BELT needs a `belt` block — without it the panel renders empty
- a belt needs `left` and `right`, each with a `name` — they are the two bins, and an unnamed bin is a bin nobody can aim at
- both belt bins are called the same thing
- a belt needs at least 24 items and this one has 0 — the bank is shuffled and only part of it is played, so a short bank means every run is the same run
- the belt has 0 on one side and 0 on the other — each bin needs at least 8
- NaN% of the belt goes to one bin — a player who always chooses that side passes without reading anything
- a belt run of 20 items needs a bank at least that big, and at least 8

**M9 S1 — Sort the mixed waste** *(Waste and Land-Use Controls)*

- a BELT needs a `belt` block — without it the panel renders empty
- a belt needs `left` and `right`, each with a `name` — they are the two bins, and an unnamed bin is a bin nobody can aim at
- both belt bins are called the same thing
- a belt needs at least 24 items and this one has 0 — the bank is shuffled and only part of it is played, so a short bank means every run is the same run
- the belt has 0 on one side and 0 on the other — each bin needs at least 8
- NaN% of the belt goes to one bin — a player who always chooses that side passes without reading anything
- a belt run of 20 items needs a bank at least that big, and at least 8

**M13 S1 — Screen the arriving cargo** *(The Biosecurity Rule)*

- a BELT needs a `belt` block — without it the panel renders empty
- a belt needs `left` and `right`, each with a `name` — they are the two bins, and an unnamed bin is a bin nobody can aim at
- both belt bins are called the same thing
- a belt needs at least 24 items and this one has 0 — the bank is shuffled and only part of it is played, so a short bank means every run is the same run
- the belt has 0 on one side and 0 on the other — each bin needs at least 8
- NaN% of the belt goes to one bin — a player who always chooses that side passes without reading anything
- a belt run of 20 items needs a bank at least that big, and at least 8

## STRESS — 3 stops

**M2 S4 — Set the ceiling** *(The Groundwater Recharge Estimate)*

- a STRESS needs a `stress` block — without it the panel renders empty
- a stress board needs at least three candidates
- a stress board needs at least two criteria
- a stress assumption needs min, max, nominal and step
- the stress nominal is outside its own range
- the stress robust candidate "undefined" is not one of its candidates
- no candidate survives the pessimistic end of the range — the stop cannot be answered
- a stress board needs `optimiseOn` — the criterion the nominal makes look best
- the STRESS board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

**M10 S4 — Stress the catch ceiling** *(The Reef Evidence)*

- a STRESS needs a `stress` block — without it the panel renders empty
- a stress board needs at least three candidates
- a stress board needs at least two criteria
- a stress assumption needs min, max, nominal and step
- the stress nominal is outside its own range
- the stress robust candidate "undefined" is not one of its candidates
- no candidate survives the pessimistic end of the range — the stop cannot be answered
- a stress board needs `optimiseOn` — the criterion the nominal makes look best
- the STRESS board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

**M14 S4 — Stress the human-demand forecast** *(The Population Outlook)*

- a STRESS needs a `stress` block — without it the panel renders empty
- a stress board needs at least three candidates
- a stress board needs at least two criteria
- a stress assumption needs min, max, nominal and step
- the stress nominal is outside its own range
- the stress robust candidate "undefined" is not one of its candidates
- no candidate survives the pessimistic end of the range — the stop cannot be answered
- a stress board needs `optimiseOn` — the criterion the nominal makes look best
- the STRESS board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

## TRIGGER — 3 stops

**M4 S4 — Write the aquifer trigger** *(The Aquifer Warning)*

- a TRIGGER needs a `trigger` block — without it the panel renders empty
- a trigger board is one rule — this one has 0. The lead time, the window and the two failure directions are all in a single stage; a second stage is a second decision and belongs in its own stop
- trigger scale needs min and max, with max above min
- a trigger scale needs a `label` — it is the name of the quantity every threshold is set on, and the rows print a bare number without it
- a trigger needs at least three updates — one update is not a stream
- the stream is declared rising and its highest reading (-Infinity) is the one it opens on, so no threshold past the opening reading can ever fire
- the trigger scale tops out at undefined and the stream reaches -Infinity — every threshold fires, so no rule can be written badly

**M8 S4 — Set the school action level** *(The School-Water Finding)*

- a TRIGGER needs a `trigger` block — without it the panel renders empty
- a trigger board is one rule — this one has 0. The lead time, the window and the two failure directions are all in a single stage; a second stage is a second decision and belongs in its own stop
- trigger scale needs min and max, with max above min
- a trigger scale needs a `label` — it is the name of the quantity every threshold is set on, and the rows print a bare number without it
- a trigger needs at least three updates — one update is not a stream
- the stream is declared rising and its highest reading (-Infinity) is the one it opens on, so no threshold past the opening reading can ever fire
- the trigger scale tops out at undefined and the stream reaches -Infinity — every threshold fires, so no rule can be written badly

**M15 S4 — Enact the ferry triggers** *(The Conditional Ferry Recommendation)*

- a TRIGGER needs a `trigger` block — without it the panel renders empty
- a trigger board is one rule — this one has 0. The lead time, the window and the two failure directions are all in a single stage; a second stage is a second decision and belongs in its own stop
- trigger scale needs min and max, with max above min
- a trigger scale needs a `label` — it is the name of the quantity every threshold is set on, and the rows print a bare number without it
- a trigger needs at least three updates — one update is not a stream
- the stream is declared rising and its highest reading (-Infinity) is the one it opens on, so no threshold past the opening reading can ever fire
- the trigger scale tops out at undefined and the stream reaches -Infinity — every threshold fires, so no rule can be written badly

## CLOUD — 3 stops

**M5 S2 — Read the survivorship curves** *(The Fishery Ceiling)*

- a CLOUD needs a `cloud` block — without it the panel renders empty
- a cloud needs bounds with max above min
- a cloud needs a numeric centre and a positive spread
- a cloud `pass` is the fraction that has to finish inside, between 0 and 1
- a cloud needs at least two actions
- a cloud with no narrowing action cannot be answered — information is the only thing that reduces a spread
- re-centring alone reaches NaN% inside, which clears the NaN% needed — the cloud has to come with the dot
- even with every action applied only NaN% finishes inside — the stop cannot be answered right

**M10 S3 — Map acidification damage** *(The Reef Evidence)*

- a CLOUD needs a `cloud` block — without it the panel renders empty
- a cloud needs bounds with max above min
- a cloud needs a numeric centre and a positive spread
- a cloud `pass` is the fraction that has to finish inside, between 0 and 1
- a cloud needs at least two actions
- a cloud with no narrowing action cannot be answered — information is the only thing that reduces a spread
- re-centring alone reaches NaN% inside, which clears the NaN% needed — the cloud has to come with the dot
- even with every action applied only NaN% finishes inside — the stop cannot be answered right

**M14 S1 — Read the age structure** *(The Population Outlook)*

- a CLOUD needs a `cloud` block — without it the panel renders empty
- a cloud needs bounds with max above min
- a cloud needs a numeric centre and a positive spread
- a cloud `pass` is the fraction that has to finish inside, between 0 and 1
- a cloud needs at least two actions
- a cloud with no narrowing action cannot be answered — information is the only thing that reduces a spread
- re-centring alone reaches NaN% inside, which clears the NaN% needed — the cloud has to come with the dot
- even with every action applied only NaN% finishes inside — the stop cannot be answered right

## ALLOCATE — 3 stops

**M5 S4 — Fund an enforceable ceiling** *(The Fishery Ceiling)*

- a ALLOCATE needs a `allocate` block — without it the panel renders empty
- an allocation needs a positive pool
- an allocation needs at least four items to choose between
- every item together costs 0 against a pool of undefined — the whole board is affordable, so nothing is being traded away
- the protected items alone cost 0, more than the pool
- an allocation needs at least three questions its plan may answer
- no allocation answer is `required` — every plan passes
- the required answers and the protected items cost 0 against a pool of undefined — the stop cannot be answered right
- every allocation answer is required — there is nothing the plan is allowed to forgo, which is the decision this format exists to make

**M9 S4 — Fund source controls** *(Waste and Land-Use Controls)*

- a ALLOCATE needs a `allocate` block — without it the panel renders empty
- an allocation needs a positive pool
- an allocation needs at least four items to choose between
- every item together costs 0 against a pool of undefined — the whole board is affordable, so nothing is being traded away
- the protected items alone cost 0, more than the pool
- an allocation needs at least three questions its plan may answer
- no allocation answer is `required` — every plan passes
- the required answers and the protected items cost 0 against a pool of undefined — the stop cannot be answered right
- every allocation answer is required — there is nothing the plan is allowed to forgo, which is the decision this format exists to make

**M12 S4 — Allocate firm power** *(The Leak and Turbine Case)*

- a ALLOCATE needs a `allocate` block — without it the panel renders empty
- an allocation needs a positive pool
- an allocation needs at least four items to choose between
- every item together costs 0 against a pool of undefined — the whole board is affordable, so nothing is being traded away
- the protected items alone cost 0, more than the pool
- an allocation needs at least three questions its plan may answer
- no allocation answer is `required` — every plan passes
- the required answers and the protected items cost 0 against a pool of undefined — the stop cannot be answered right
- every allocation answer is required — there is nothing the plan is allowed to forgo, which is the decision this format exists to make

## TRACE — 2 stops

**M1 S4 — Find the shared omission** *(What the Island Depends On)*

- a TRACE needs a `trace` block — without it the panel renders empty
- a trace needs at least four channels
- a trace needs at least one shared resource to name
- the trace target "undefined" is not one of its resources
- fewer than two channels depend on the trace target — with only one there is no common mode, and the agreement the stop is about never happens
- a trace with no independent channel cannot be answered — something has to survive the correction, or the right move is to throw everything away

**M7 S1 — Trace the hidden exports** *(The Hidden Losses)*

- a TRACE needs a `trace` block — without it the panel renders empty
- a trace needs at least four channels
- a trace needs at least one shared resource to name
- the trace target "undefined" is not one of its resources
- fewer than two channels depend on the trace target — with only one there is no common mode, and the agreement the stop is about never happens
- a trace with no independent channel cannot be answered — something has to survive the correction, or the right move is to throw everything away

## ATTEST — 2 stops

**M6 S1 — Audit the landing claim** *(The Enforcement Plan)*

- a ATTEST needs a `attest` block — without it the panel renders empty
- an attest board needs at least four claims
- an attest board needs a numeric `checks` budget
- the board allows undefined verifications for 0 claims — with enough for the whole list there is no decision about where to look
- every critical claim is already backed — there is nothing to hold, so closing the list blind is the right answer
- 0 critical claims are unbacked and only undefined verifications are allowed — the stop cannot be answered right
- no critical claim is backed — holding every critical claim passes without reading anything

**M12 S1 — Audit the gearbox schedule** *(The Leak and Turbine Case)*

- a ATTEST needs a `attest` block — without it the panel renders empty
- an attest board needs at least four claims
- an attest board needs a numeric `checks` budget
- the board allows undefined verifications for 0 claims — with enough for the whole list there is no decision about where to look
- every critical claim is already backed — there is nothing to hold, so closing the list blind is the right answer
- 0 critical claims are unbacked and only undefined verifications are allowed — the stop cannot be answered right
- no critical claim is backed — holding every critical claim passes without reading anything

## HOLDOUT — 1 stop

**M2 S3 — Freeze the estimate** *(The Groundwater Recharge Estimate)*

- holdout needs axis.min and axis.max, with max greater than min
- holdout needs at least five authored points in `fit`
- the HOLDOUT board could not be read — Cannot read properties of undefined (reading 'every'). Its payload is probably still in the bible's own field names.

## SEQUENCE — 1 stop

**M3 S2 — Read recovery and habitat** *(The Ecological Limits)*

- sequence needs at least three cards

## CHAIN — 1 stop

**M7 S2 — Build the treatment chain** *(The Hidden Losses)*

- a CHAIN needs a `chain` block — without it the panel renders empty
- a chain needs at least four transfers
- the chain order must name at least four links, each of them once, all from `links`
- the chain's governing link "undefined" is not one of its transfers
- the chain needs a `distractor` — the large obvious member somebody names instead
- the chain's distractor is its governing link — there is nothing to be wrong about
- the governing link "undefined" is not in the path

## VALUE — 1 stop

**M7 S4 — Choose the repair priority** *(The Hidden Losses)*

- a VALUE needs a `value` block — without it the panel renders empty
- a value board needs a positive budget
- a value board needs at least four options
- the options cost 0 and the budget is undefined — the whole board is affordable, so nothing is being traded away
- no value option is marked `decisive` — nothing on the board would change the decision, so every answer is as good as every other
- the decisive options together cost more than the budget — the stop cannot be answered right
- every value option asks about the same axis — buying more of the same is the trap, so at least two axes have to be on the board

## VERIFY — 1 stop

**M8 S3 — Verify the garden source** *(The School-Water Finding)*

- a VERIFY needs a `verify` block — without it the panel renders empty
- a verify needs a prediction range with min, max and step
- a verify needs a numeric `truth` — what the measurement will find
- the verify truth is outside the range the player can predict
- a verify `passRatio` brackets 1 — [0.5, 2] means "within a factor of two either way"
- every prediction in the range passes — widen the range or tighten the ratio, or the prediction is not being tested
- a verify needs a `measurement` with a label — it is the thing the player can skip

## RESIDUAL — 1 stop

**M10 S1 — Read the patterned residuals** *(The Reef Evidence)*

- a RESIDUAL needs a `residual` block — without it the panel renders empty
- a residual needs at least two candidate fits to choose between
- the residual to accept, "undefined", is not one of the fits
- the RESIDUAL board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

## CONTROL — 1 stop

**M10 S2 — Control heat and nutrients** *(The Reef Evidence)*

- a CONTROL needs a `control` block — without it the panel renders empty
- a controlled trial needs at least three candidates
- the control truth "undefined" is not one of its variables
- a controlled trial needs a numeric baseline and a non-zero response
- the response undefined is not clear of the noise ±0 — the trial would be a coin toss, which is the opposite of a controlled experiment
- changing the suspect takes the reading to NaN, below zero — `response` is the signed change in the reading, so a suspect that is suppressing the signal has a positive response, not a negative one

## INJECT — 1 stop

**M13 S2 — Test survey recovery** *(The Biosecurity Rule)*

- a INJECT needs a `inject` block — without it the panel renders empty
- an inject needs a population with a numeric `n`
- an inject needs at least three configurations
- an inject needs a `metric` with a label — the thing that is not the detection count
- the inject best configuration "undefined" is not one of them
- the INJECT board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

## Not tied to one stop

- group "WATER" has nobody on the roster — its person stops are unreachable
- group "COMMON" has nobody on the roster — its person stops are unreachable
- group "TIP" has nobody on the roster — its person stops are unreachable
- group "POWER" has nobody on the roster — its person stops are unreachable
- warmups: the hunt warm-up's title says 6 and the run places 7 — one item per area, so the story names a count the player cannot reach

## What to hand back

The same bible, with the missing numbers and lines added to these stops in your
own field names. The build converts the shape; it may not invent a value.
