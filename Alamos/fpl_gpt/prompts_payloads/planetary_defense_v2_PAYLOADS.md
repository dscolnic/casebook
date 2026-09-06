# planetary_defense_v2: the stops that cannot be built yet

**35 of the campaign's stops are held back.** Every one names a
format the game has, and the science in each is right — what is missing is a
number or a line the board is physically made of. Below is each stop and what
the build refused it with, grouped by format so one decision fixes many.

Nothing here asks you to change the story, the science, or which format a stop
uses. Where a board genuinely cannot carry what is asked — three quantities that
all have to be predicted, an order that really does branch — **split it into two
stops** and say so, rather than thinning the science to fit.

## CLOUD — 4 stops

**M2 S4 — Propagate the allowed cloud** *(Six Points Are Not an Orbit)*

- a CLOUD needs a `cloud` block — without it the panel renders empty
- a cloud needs bounds with max above min
- a cloud needs a numeric centre and a positive spread
- a cloud `pass` is the fraction that has to finish inside, between 0 and 1
- a cloud needs at least two actions
- a cloud with no narrowing action cannot be answered — information is the only thing that reduces a spread
- re-centring alone reaches NaN% inside, which clears the NaN% needed — the cloud has to come with the dot
- even with every action applied only NaN% finishes inside — the stop cannot be answered right

**M3 S2 — Why better data made the number worse** *(The Probability Goes Up)*

- a CLOUD needs a `cloud` block — without it the panel renders empty
- a cloud needs bounds with max above min
- a cloud needs a numeric centre and a positive spread
- a cloud `pass` is the fraction that has to finish inside, between 0 and 1
- a cloud needs at least two actions
- a cloud with no narrowing action cannot be answered — information is the only thing that reduces a spread
- re-centring alone reaches NaN% inside, which clears the NaN% needed — the cloud has to come with the dot
- even with every action applied only NaN% finishes inside — the stop cannot be answered right

**M8 S3 — Read the b-plane cloud** *(The Orbit Narrows)*

- a CLOUD needs a `cloud` block — without it the panel renders empty
- a cloud needs bounds with max above min
- a cloud needs a numeric centre and a positive spread
- a cloud `pass` is the fraction that has to finish inside, between 0 and 1
- a cloud needs at least two actions
- a cloud with no narrowing action cannot be answered — information is the only thing that reduces a spread
- re-centring alone reaches NaN% inside, which clears the NaN% needed — the cloud has to come with the dot
- even with every action applied only NaN% finishes inside — the stop cannot be answered right

**M13 S3 — Read the separated cloud** *(Through the Keyhole)*

- a CLOUD needs a `cloud` block — without it the panel renders empty
- a cloud needs bounds with max above min
- a cloud needs a numeric centre and a positive spread
- a cloud `pass` is the fraction that has to finish inside, between 0 and 1
- a cloud needs at least two actions
- a cloud with no narrowing action cannot be answered — information is the only thing that reduces a spread
- re-centring alone reaches NaN% inside, which clears the NaN% needed — the cloud has to come with the dot
- even with every action applied only NaN% finishes inside — the stop cannot be answered right

## ATTEST — 3 stops

**M1 S4 — Certify only what is known** *(The Moving Point)*

- a ATTEST needs a `attest` block — without it the panel renders empty
- an attest board needs at least four claims
- an attest board needs a numeric `checks` budget
- the board allows undefined verifications for 0 claims — with enough for the whole list there is no decision about where to look
- every critical claim is already backed — there is nothing to hold, so closing the list blind is the right answer
- 0 critical claims are unbacked and only undefined verifications are allowed — the stop cannot be answered right
- no critical claim is backed — holding every critical claim passes without reading anything

**M12 S4 — Sign the public claims** *(The Line We Promise)*

- a ATTEST needs a `attest` block — without it the panel renders empty
- an attest board needs at least four claims
- an attest board needs a numeric `checks` budget
- the board allows undefined verifications for 0 claims — with enough for the whole list there is no decision about where to look
- every critical claim is already backed — there is nothing to hold, so closing the list blind is the right answer
- 0 critical claims are unbacked and only undefined verifications are allowed — the stop cannot be answered right
- no critical claim is backed — holding every critical claim passes without reading anything

**M15 S1 — Attest the recovery** *(The Honest Warning)*

- a ATTEST needs a `attest` block — without it the panel renders empty
- an attest board needs at least four claims
- an attest board needs a numeric `checks` budget
- the board allows undefined verifications for 0 claims — with enough for the whole list there is no decision about where to look
- every critical claim is already backed — there is nothing to hold, so closing the list blind is the right answer
- 0 critical claims are unbacked and only undefined verifications are allowed — the stop cannot be answered right
- no critical claim is backed — holding every critical claim passes without reading anything

## RESIDUAL — 3 stops

**M2 S3 — Refuse the prettiest fit** *(Six Points Are Not an Orbit)*

- a RESIDUAL needs a `residual` block — without it the panel renders empty
- a residual needs at least two candidate fits to choose between
- the residual to accept, "undefined", is not one of the fits
- the RESIDUAL board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

**M10 S1 — See the alternating residual** *(One Object, Two Motions)*

- a RESIDUAL needs a `residual` block — without it the panel renders empty
- a residual needs at least two candidate fits to choose between
- the residual to accept, "undefined", is not one of the fits
- the RESIDUAL board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

**M13 S2 — Refit the corrected residuals** *(Through the Keyhole)*

- a RESIDUAL needs a `residual` block — without it the panel renders empty
- a residual needs at least two candidate fits to choose between
- the residual to accept, "undefined", is not one of the fits
- the RESIDUAL board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

## STRESS — 3 stops

**M3 S3 — Stress the warning** *(The Probability Goes Up)*

- a STRESS needs a `stress` block — without it the panel renders empty
- a stress board needs at least three candidates
- a stress board needs at least two criteria
- a stress assumption needs min, max, nominal and step
- the stress nominal is outside its own range
- the stress robust candidate "undefined" is not one of its candidates
- no candidate survives the pessimistic end of the range — the stop cannot be answered
- a stress board needs `optimiseOn` — the criterion the nominal makes look best
- the STRESS board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

**M8 S4 — Stress the planning sentence** *(The Orbit Narrows)*

- a STRESS needs a `stress` block — without it the panel renders empty
- a stress board needs at least three candidates
- a stress board needs at least two criteria
- a stress assumption needs min, max, nominal and step
- the stress nominal is outside its own range
- the stress robust candidate "undefined" is not one of its candidates
- no candidate survives the pessimistic end of the range — the stop cannot be answered
- a stress board needs `optimiseOn` — the criterion the nominal makes look best
- the STRESS board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

**M11 S3 — Stress the kinetic impactor** *(One Push)*

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

**M3 S4 — Write the line before the update** *(The Probability Goes Up)*

- a TRIGGER needs a `trigger` block — without it the panel renders empty
- a trigger board is one rule — this one has 0. The lead time, the window and the two failure directions are all in a single stage; a second stage is a second decision and belongs in its own stop
- trigger scale needs min and max, with max above min
- a trigger scale needs a `label` — it is the name of the quantity every threshold is set on, and the rows print a bare number without it
- a trigger needs at least three updates — one update is not a stream
- the stream is declared rising and its highest reading (-Infinity) is the one it opens on, so no threshold past the opening reading can ever fire
- the trigger scale tops out at undefined and the stream reaches -Infinity — every threshold fires, so no rule can be written badly

**M12 S1 — Draw the action thresholds** *(The Line We Promise)*

- a TRIGGER needs a `trigger` block — without it the panel renders empty
- a trigger board is one rule — this one has 0. The lead time, the window and the two failure directions are all in a single stage; a second stage is a second decision and belongs in its own stop
- trigger scale needs min and max, with max above min
- a trigger scale needs a `label` — it is the name of the quantity every threshold is set on, and the rows print a bare number without it
- a trigger needs at least three updates — one update is not a stream
- the stream is declared rising and its highest reading (-Infinity) is the one it opens on, so no threshold past the opening reading can ever fire
- the trigger scale tops out at undefined and the stream reaches -Infinity — every threshold fires, so no rule can be written badly

**M15 S3 — Trigger the promised action** *(The Honest Warning)*

- a TRIGGER needs a `trigger` block — without it the panel renders empty
- a trigger board is one rule — this one has 0. The lead time, the window and the two failure directions are all in a single stage; a second stage is a second decision and belongs in its own stop
- trigger scale needs min and max, with max above min
- a trigger scale needs a `label` — it is the name of the quantity every threshold is set on, and the rows print a bare number without it
- a trigger needs at least three updates — one update is not a stream
- the stream is declared rising and its highest reading (-Infinity) is the one it opens on, so no threshold past the opening reading can ever fire
- the trigger scale tops out at undefined and the stream reaches -Infinity — every threshold fires, so no rule can be written badly

## PROBE — 3 stops

**M7 S3 — Read delay and Doppler** *(The Echo Clock)*

- a probe needs at least four stations — a pattern needs somewhere to break
- the probe target "undefined" is not one of its stations

**M9 S3 — Compare corridor consequences** *(Where It Lands)*

- a probe needs at least four stations — a pattern needs somewhere to break
- the probe target "undefined" is not one of its stations

**M14 S2 — Probe the separated return** *(The Second Echo)*

- a probe needs at least four stations — a pattern needs somewhere to break
- the probe target "undefined" is not one of its stations

## VERIFY — 2 stops

**M5 S4 — Predict, observe, verify** *(The Summit Test)*

- a VERIFY needs a `verify` block — without it the panel renders empty
- a verify needs a prediction range with min, max and step
- a verify needs a numeric `truth` — what the measurement will find
- the verify truth is outside the range the player can predict
- a verify `passRatio` brackets 1 — [0.5, 2] means "within a factor of two either way"
- every prediction in the range passes — widen the range or tighten the ratio, or the prediction is not being tested
- a verify needs a `measurement` with a label — it is the thing the player can skip

**M14 S1 — Verify the primary track** *(The Second Echo)*

- a VERIFY needs a `verify` block — without it the panel renders empty
- a verify needs a prediction range with min, max and step
- a verify needs a numeric `truth` — what the measurement will find
- the verify truth is outside the range the player can predict
- a verify `passRatio` brackets 1 — [0.5, 2] means "within a factor of two either way"
- every prediction in the range passes — widen the range or tighten the ratio, or the prediction is not being tested
- a verify needs a `measurement` with a label — it is the thing the player can skip

## HOLDOUT — 2 stops

**M7 S4 — Freeze the claim before the image** *(The Echo Clock)*

- holdout needs axis.min and axis.max, with max greater than min
- holdout needs at least five authored points in `fit`
- the HOLDOUT board could not be read — Cannot read properties of undefined (reading 'every'). Its payload is probably still in the bible's own field names.

**M13 S4 — Reveal the independent holdout** *(Through the Keyhole)*

- holdout needs axis.min and axis.max, with max greater than min
- holdout needs at least five authored points in `fit`
- the HOLDOUT board could not be read — Cannot read properties of undefined (reading 'every'). Its payload is probably still in the bible's own field names.

## BALANCE — 2 stops

**M8 S2 — Balance the fit** *(The Orbit Narrows)*

- a BALANCE needs a `balance` block — without it the panel renders empty
- a balance needs at least three streams
- a balance needs a numeric total
- a balance needs a positive tolerance
- a balance needs at least three countable streams
- the countable streams sum to 0 and the total is undefined — the ledger does not close even when everything is counted
- a balance with no `hidden` stream is arithmetic — the removal term that does not announce itself is the format
- the obvious streams alone sum to 0, inside the tolerance — leaving the hidden term out is not wrong, so nothing is learned by finding it

**M15 S2 — Balance orbit and consequence** *(The Honest Warning)*

- a BALANCE needs a `balance` block — without it the panel renders empty
- a balance needs at least three streams
- a balance needs a numeric total
- a balance needs a positive tolerance
- a balance needs at least three countable streams
- the countable streams sum to 0 and the total is undefined — the ledger does not close even when everything is counted
- a balance with no `hidden` stream is arithmetic — the removal term that does not announce itself is the format
- the obvious streams alone sum to 0, inside the tolerance — leaving the hidden term out is not wrong, so nothing is learned by finding it

## TRIANGULATE — 1 stop

**M2 S2 — Add geometric leverage** *(Six Points Are Not an Orbit)*

- a TRIANGULATE needs a `triangulate` block — without it the panel renders empty
- a triangulation needs at least three stations — two give a pair of points
- a triangulation needs a numeric truth position
- a triangulation needs a positive tolerance

## PROPAGATE — 1 stop

**M4 S3 — Propagate the error budget** *(The Last Dark Window)*

- a PROPAGATE needs a `propagate` block — without it the panel renders empty
- an error budget needs at least three inputs
- a propagate needs at least two candidate measurements to buy
- the propagate dominant term "undefined" is not one of its inputs
- the PROPAGATE board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

## INJECT — 1 stop

**M5 S1 — Put known objects through the pipeline** *(The Summit Test)*

- a INJECT needs a `inject` block — without it the panel renders empty
- an inject needs a population with a numeric `n`
- an inject needs at least three configurations
- an inject needs a `metric` with a label — the thing that is not the detection count
- the inject best configuration "undefined" is not one of them
- the INJECT board could not be read — Reduce of empty array with no initial value. Its payload is probably still in the bible's own field names.

## CONTROL — 1 stop

**M5 S3 — Move the mask, not the object** *(The Summit Test)*

- a CONTROL needs a `control` block — without it the panel renders empty
- a controlled trial needs at least three candidates
- the control truth "undefined" is not one of its variables
- a controlled trial needs a numeric baseline and a non-zero response
- the response undefined is not clear of the noise ±0 — the trial would be a coin toss, which is the opposite of a controlled experiment
- changing the suspect takes the reading to NaN, below zero — `response` is the signed change in the reading, so a suspect that is suppressing the signal has a positive response, not a negative one

## CHAIN — 1 stop

**M8 S1 — Transfer the evidence chain** *(The Orbit Narrows)*

- a CHAIN needs a `chain` block — without it the panel renders empty
- a chain needs at least four transfers
- the chain order must name at least four links, each of them once, all from `links`
- the chain's governing link "undefined" is not one of its transfers
- the chain needs a `distractor` — the large obvious member somebody names instead
- the chain's distractor is its governing link — there is nothing to be wrong about
- the governing link "undefined" is not in the path

## DEGENERACY — 1 stop

**M10 S2 — Separate shape from surface** *(One Object, Two Motions)*

- a DEGENERACY needs a `degeneracy` block — without it the panel renders empty
- a degeneracy has exactly two controls — that is what makes a locus
- a degeneracy needs at least five points on its first locus — three is a line, and the player has to see a family
- a degeneracy needs a second locus of at least three points — the measurement that collapses it
- the second measurement needs a label saying what physics it uses
- a degeneracy needs a numeric truth pair
- a degeneracy needs a positive tolerance on each control
- the DEGENERACY board could not be read — Cannot read properties of undefined (reading 'min'). Its payload is probably still in the bible's own field names.

## SWEEP — 1 stop

**M10 S3 — Sweep the radar frames** *(One Object, Two Motions)*

- sweep needs axis.min and axis.max, with max greater than min
- every sweep series needs at least four authored response points
- every sweep response point needs a numeric `at` and `value`
- sweep needs a numeric target
- the sweep target is outside its own axis
- sweep needs a positive tolerance
- the sweep starts on its own answer — move `start` away from `target`
- the SWEEP board could not be read — Cannot read properties of undefined (reading 'map'). Its payload is probably still in the bible's own field names.

## BALLPARK — 1 stop

**M11 S1 — Carry the mass honestly** *(One Push)*

- ballpark needs an `estimate` block, or an `estimatesByTitle` entry for its title — prose carries no arithmetic

## DERIVE — 1 stop

**M11 S2 — Derive the required impulse** *(One Push)*

- a DERIVE needs a `derive` block — without it the panel renders empty
- a derivation needs a `start` — the line it begins from
- a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel can say where it is going without printing where it ends up
- a derivation of one line is not a derivation

## ALLOCATE — 1 stop

**M12 S2 — Allocate limited capacity** *(The Line We Promise)*

- a ALLOCATE needs a `allocate` block — without it the panel renders empty
- an allocation needs a positive pool
- an allocation needs at least four items to choose between
- every item together costs 0 against a pool of undefined — the whole board is affordable, so nothing is being traded away
- the protected items alone cost 0, more than the pool
- an allocation needs at least three questions its plan may answer
- no allocation answer is `required` — every plan passes
- the required answers and the protected items cost 0 against a pool of undefined — the stop cannot be answered right
- every allocation answer is required — there is nothing the plan is allowed to forgo, which is the decision this format exists to make

## Not tied to one stop

- group "TOWN" has nobody on the roster — its person stops are unreachable
- group "CHAR" has nobody on the roster — its person stops are unreachable
- group "RADAR" has nobody on the roster — its person stops are unreachable

## What to hand back

The same bible, with the missing numbers and lines added to these stops in your
own field names. The build converts the shape; it may not invent a value.
