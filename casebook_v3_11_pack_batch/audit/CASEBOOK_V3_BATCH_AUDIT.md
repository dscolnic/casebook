# Casebook V3 — 11-pack conversion audit

Generated against `CASEBOOK_SPEC_V3_THREE_READINGS.md`, the V3 addendum, and `validate_casebook_v3.js`.

## Structural summary

| Pack | Topics | Questions | Answers | Profile words | Expert longest | Max option spread | Exact duplicate stems/options/feedback | Repeated 8-word profile runs |
|---|---:|---:|---:|---|---:|---:|---|---:|
| `f_crypto` | 3 | 9 | 36 | 267, 269, 273 | 2/9 | 13 | 0/0/0 | 0 |
| `f_privacy` | 3 | 9 | 36 | 262, 272, 276 | 3/9 | 14 | 0/0/0 | 0 |
| `j_press` | 3 | 9 | 36 | 283, 287, 274 | 2/9 | 13 | 0/0/0 | 0 |
| `m_bridge` | 3 | 9 | 36 | 287, 288, 273 | 3/9 | 14 | 0/0/0 | 0 |
| `m_stadium` | 3 | 9 | 36 | 296, 298, 305 | 3/9 | 14 | 0/0/0 | 0 |
| `m_tunnel` | 3 | 9 | 36 | 273, 270, 274 | 4/9 | 15 | 0/0/0 | 0 |
| `t_pipeline` | 3 | 9 | 36 | 275, 269, 284 | 4/9 | 14 | 0/0/0 | 0 |
| `t_transformer` | 3 | 9 | 36 | 267, 298, 269 | 2/9 | 14 | 0/0/0 | 0 |
| `w_compound` | 3 | 9 | 36 | 275, 277, 270 | 4/9 | 15 | 0/0/0 | 0 |
| `w_surg` | 3 | 9 | 36 | 279, 280, 284 | 3/9 | 14 | 0/0/0 | 0 |
| `w_water` | 3 | 9 | 36 | 286, 274, 283 | 4/9 | 10 | 0/0/0 | 0 |

## Batch-level automated scrutiny

- Packs: **11**
- Topics: **33**
- Questions: **99**
- Answer choices: **396**
- Unique question stems: **99/99**
- Unique answer choices: **396/396**
- Unique feedback messages: **396/396**
- Near-duplicate stem pairs at TF-IDF cosine ≥ 0.82: **0**
- Near-duplicate profile pairs at TF-IDF cosine ≥ 0.55: **0**
- Near-duplicate frame pairs at TF-IDF cosine ≥ 0.72: **0**
- Near-duplicate title-story pairs at TF-IDF cosine ≥ 0.72: **0**
- Flagged padding fragments: **0**
- Non-expert choices containing an absolute-word tell: **0**
- JavaScript/schema validation: **PASS for all 11 packs**
- Every reading: **3 questions and one WHO, one WHAT, one WHERE clue**
- All profiles: **250–330 words**
- Expert-longest rate: **≤4/9 in every pack**
- Maximum option-length spread: **≤15 characters in every question**

### Near-duplicate question-stem pairs

None.

### Near-duplicate profile pairs

None.

### Near-duplicate frame pairs

None.

### Near-duplicate title-story pairs

None.

### Absolute-word distractor flags for manual review

None.

### Padding flags

None.

## Nine-clue cohesion sheets

Each category is shown in suggestive → corroborating → decisive order. These sheets are included for semantic playtest review; automated validation cannot prove the “any 6 of 9” requirement.

### `f_crypto` — The Cipher at Meridian Bank

**WHO**
1. The staff cryptographers documented the public-analysis weakness, but the architect who owned production design renewed the exception instead of replacing the cipher.
2. The key custodian logged repeated-use violations, but the crypto architect approved the daily-stream policy to avoid replacing legacy transaction hardware.
3. The official whose approval appears on every renewal after the cipher review, key-reuse finding, and completed migration plan owned the production architecture decision.

**WHERE**
1. The technical weakness was demonstrated in the lab; its continued acceptance culminated in the security architect’s office.
2. The vault logs document reuse, while the policy that made reuse acceptable is preserved with architecture exceptions in the security office.
3. The lab and vault each documented one weakness; the office risk file joins both to the decision to keep the system live.

**WHAT**
1. The attackers reconstructed the algorithm from distributed software and applied established cryptanalysis; no novel mathematical breakthrough was required.
2. Thousands of messages reused the same short daily stream, letting attackers cancel key material and exploit predictable transaction formats instead of searching the full keyspace.
3. The compromise combined known algorithmic weakness with repeated key material—the kind of system failure that avoids both novel mathematics and exhaustive brute force.

### `f_privacy` — The Beacon Consent Scandal

**WHO**
1. The mapping calls used the service account owned by the data-product chief’s team, not a stolen customer credential or processor login.
2. The privacy review recommended aggregate outputs, but the data-product chief approved exact row export because individual targeting increased the product’s value.
3. The executive who approved the linkage service, exact-output specification, and broker contract controlled the entire changed data flow.

**WHERE**
1. The warehouse contains the raw rows, but the decisive lookup table and product mapping were controlled through the data-product office.
2. The analytics laboratory performed the linkage, but the specification and approval that made person-level output the product sit in the chief’s office.
3. The decisive mismatch appears where the service consent and commercial broker contract are joined: the data-product chief’s office.

**WHAT**
1. The released rows combine persistent IDs, fine-grained times, and locations that reproduce exact customer matches; anonymity fails through linkage rather than theft.
2. The product returned exact individual dossiers with persistent identifiers and no privacy budget; it was designed for reconstruction, not privacy-bounded analysis.
3. Customers provided records for service delivery, while the broker received re-identified profiles for targeting—a changed recipient and purpose, not harmless anonymous analysis.

### `j_press` — The Ashford Dispatch

**WHO**
1. Only one journalist controlled every contact with the supposed witness and repeatedly blocked normal internal identity confirmation.
2. The contact entries, interview timestamps, and revisions were all created from Corin Faye’s credentials, with no incoming external account behind them.
3. The journalist whose credentials created every false witness and confirming pathway remains the only surviving origin once the information chains are separated.

**WHERE**
1. The verification desk raised the alarms, but the decisive absence is inside the source and fact-check file where corroboration should have been recorded.
2. The contradictions are assembled in the editorial source archive, where the absent records can be compared with the reporter-created contact entries.
3. The source map, notes, contact history, and fact-check objections meet in the source file, making that archive the case’s decisive location.

**WHAT**
1. The series lacks an independent verification trail for its central witness; the quotes survive only inside the reporter’s own notes.
2. The source biography fails across employer, address, court, and telephone records—a pattern too broad for an ordinary reporting mistake.
3. The supposed corroborators repeat distinctive wording that originated in the reporter’s notes, collapsing several voices into one manufactured information chain.

### `m_bridge` — The Halloway Span

**WHO**
1. Maintenance crews had reported the painted crack, but the decision to leave it in service came from the authority that controlled closure and reinspection funding.
2. The technician requested the timed return, while the director’s office removed it from the funded inspection calendar despite updated traffic counts.
3. The authority official who overrode the engineering deadline, deferred the scan, and kept the span open signed the decisive disposition.

**WHERE**
1. The gusset preserves the fracture history, while the authority office preserves the reports and dispositions that allowed the flaw to remain.
2. The NDT platform found the initial indication, but the missed reinspection exists as a scheduling and disposition decision in the authority office.
3. The engineering calculation, recommended deadline, funding deferral, and final disposition are joined in the Bridge Authority Office.

**WHAT**
1. The fracture contains a broad oxidized region and a small final bright tear, showing a long-standing flaw that ran only after reaching critical size.
2. The scan indication, traffic history, and fracture markings fit stable cyclic growth from detectable size to final failure under ordinary crossings.
3. The measured flaw and CTOD assessment still allowed a repair window at the prior inspection; failure followed only after that window was extended.

### `m_stadium` — The Coronet Arena Roof

**WHO**
1. Erectors queried the mismatch, but the substitution arrived as an approved developer value-engineering instruction rather than a field improvisation.
2. The crowd data had been included in the original design check; only the developer-approved weaker node removed the margin against the measured combined demand.
3. The developer who approved the weaker splice, rejected reanalysis delay, and retained the savings is the only candidate joining authority and benefit.

**WHERE**
1. The failed node preserves the physical substitution; the developer’s project office preserves the value-engineering authorization.
2. The stand supplies the measured occupancy demand, but the accepted combined-load capacity and change decision remain in the project office.
3. The reliability gap appears only when the original calculation, substituted detail, and approval are joined in the developer’s project office.

**WHAT**
1. The collapse initiated at a node whose installed splice had less area and fewer bolts than the load-path detail, not at a blast crater or overloaded snow bay.
2. Turnstiles and video show a dense, rhythmic crowd that increased service demand but remained within the approved event envelope used in the original design.
3. Recalculation with the installed node shows failure under the measured crowd-and-snow combination even though that combination remained inside the approved design envelope.

### `m_tunnel` — The Kingsgate Bore

**WHO**
1. Face crews recorded shortened grout runs, but the reduced quantity was imposed by the contractor authority controlling production targets.
2. The surveyor issued escalating trough alerts to the contractor, and the same production manager kept advance moving without restoring grout or stopping work.
3. The contractor who signed the combined directive cutting grout, raising alarm limits, and ordering uninterrupted advance controlled the decisive choices.

**WHERE**
1. The face reveals support falling behind, while the contractor’s site office preserves the production instruction that caused it.
2. The surface network shows the growing trough, but its relation to reduced grout volumes becomes decisive only in the contractor office records.
3. The monitoring instruments recorded movement, but the altered thresholds, reduced grout plan, and continue-work instruction converge in the contractor’s site office.

**WHAT**
1. The machine advanced while tail support and grout placement lagged, leaving a path for soft ground to move into the new annular space.
2. Survey contours form a construction-aligned settlement trough behind the shield, not the localized ejecta or pressure damage expected from an explosion.
3. Settlement and convergence crossed the original intervention thresholds while work continued under raised limits, converting a detectable trend into uncontrolled ground loss.

### `t_pipeline` — The Brant Hollow Pipeline

**WHO**
1. Patrol escalations and coating-survey anomalies were forwarded to the integrity program, placing the unaddressed condition under the operator who controlled inspection priorities.
2. The dispatcher responded to the pressure loss; the unresolved wall-risk and inspection cancellation remained under the integrity operator’s authority.
3. The operator who cancelled the run, accepted the patrol anomaly without substitute examination, and left the segment live owned the missed inspection.

**WHERE**
1. The right-of-way preserves the corrosion morphology; the integrity office preserves the warnings, scheduling choices, and accountability.
2. The control center reconstructs the rupture sequence, but the cancelled inspection that left the weak wall in service is not a dispatch decision.
3. The planned tool, anomaly rules, cancellation, and rescheduling failure all converge in the operator’s integrity office rather than at the control console.

**WHAT**
1. The rupture originated in rounded, scaled wall loss beneath damaged coating, not a fresh gouge or deformation expected from an external strike.
2. The first anomaly was a growing flow imbalance, followed later by collapse and valve action; the trace lacks a causal surge before the leak began.
3. The recovered wall-loss dimensions fall inside the detection capability of the planned inline inspection, showing a preventable missed observation rather than unknowable ground failure.

### `t_transformer` — The Aldergate Substation Fire

**WHO**
1. Substation staff logged the overheating, but the instruction to maintain the elevated loading came through the asset operator who controlled dispatch exceptions.
2. The oil technicians escalated the trend twice; the same asset authority signed both deferrals and kept the transformer in the high-load plan.
3. The asset operator whose approval appears on the overload plan, both test deferrals, and the replacement postponement controlled the whole decline.

**WHERE**
1. The yard instruments recorded the symptoms, while the approved rating exceptions and dispatch instructions culminate in the utility’s asset office.
2. The oil laboratory documented the warnings, but repeated deferral approvals were attached to the asset-office maintenance schedule.
3. The complete thermal history is not one alarm panel; it is the office file joining load waivers, maintenance deferrals, and replacement decisions.

**WHAT**
1. The long load record predicts copper heating and reduced thermal margin before the fire; the final arc therefore has a months-long electrical prehistory.
2. Rising fault gases before the fire indicate an internal insulation condition developing over time, not merely gas produced by the final rupture.
3. The temperature record rose with repeated overload periods, while cooling alarms and oil warnings accumulated—the pattern of accelerating thermal ageing.

### `w_compound` — The Compounding Room

**WHO**
1. Technicians could start cycles but could not shorten validated recipes; the altered parameters came from a production authority above the clean-room staff.
2. The repeated environmental positives were acknowledged in internal reviews, yet the same executive kept the affected lots on the release schedule.
3. One owner’s signature recurs after shortened cycles, failed environmental plates, and interstate release, joining motive, authority, and outcome.

**WHERE**
1. The physical barrier failed in the clean room, but the incomplete cycle became a released medicine only through the batch-authorization file in the owner’s office.
2. Monitoring plates identified the room source, but the decision to disregard repeated positives is preserved with the release deviations in the business office.
3. The complete batch genealogy—including cycle deviations, culture results, output targets, and release signatures—converges in the owner’s business office.

**WHAT**
1. The released loads never completed the validated steam hold, creating a plausible route for living environmental organisms without any added poison.
2. The same viable organism appears along the room-to-vial-to-patient path, supporting survival or entry during production rather than unrelated post-injection illness.
3. The cases cluster by lot, not by hospital, and the organism matches the facility environment—the expected shape of a released sterility failure.

### `w_surg` — The Wrong Side

**WHO**
1. The theatre team had raised earlier mismatches, but the standing instruction to omit the pause on delayed lists came from service leadership rather than the operating surgeon.
2. The shortcut appeared across surgeons and rooms whenever the service missed its throughput target, pointing to the official who set that rule rather than one operator.
3. The end-result cards link multiple near misses to the same chief-approved throughput exception, making the responsible authority unmistakable without relying on one surgeon’s account.

**WHERE**
1. The physical mistake occurred in theatre, but the recurring waiver is documented in the surgical office policy file where the safeguard was downgraded.
2. The hospital possessed the checklist in theatre, but the process exception was created and tracked in the surgical service’s administrative records.
3. The surgical office contains the joined end-result register, prior near misses, and the memo that converted mandatory verification into an optional delay.

**WHAT**
1. The consent, theatre list, and skin mark conflicted, yet the formal time-out was omitted—the signature of a missing team barrier rather than an anatomical surprise.
2. Transfer logs show wristband and site checks were repeatedly shortened whenever lists fell behind; the failure pattern follows a waived process, not chance anatomy.
3. Three prior wrong-side mismatches were caught only when staff improvised a pause; the injury occurred after the service formally removed that last chance to reconcile records.

### `w_water` — The Tap

**WHO**
1. The corrosion-control feed was absent because the source-change authorization bypassed the plant’s normal chemistry review; the operator lacked authority to approve that exception.
2. The exclusions followed a reporting rule sent from the emergency manager’s staff after the chemists had already validated the high samples.
3. The same city executive signed the unreviewed source order, denied the corrosion feed, and approved the response that discounted residents’ samples.

**WHERE**
1. The chemically important change began at the intake, but the unreviewed exception is preserved in the city administration’s source-switch file.
2. The laboratory retained the raw warnings, but the instruction to omit them points to the city manager’s reporting file rather than the sample bench.
3. The decisive chain is assembled in the city manager’s office: source authorization, corrosion waiver, complaint responses, and the edited public summary.

**WHAT**
1. The plant outlet remained low in lead while household taps rose after the source switch—a Pourbaix-style pattern of protective scale becoming unstable downstream.
2. The elevated results formed a neighborhood pattern tied to older plumbing and time on the new source, not the random scatter expected from unrelated illnesses.
3. The pipe-loop study predicted loss of protective scale, the control feed stayed off, and the tap pattern followed that mechanism rather than a planted contaminant.

## Completion statement

All eleven files pass the supplied V3 validator and the literal/TF-IDF checks reported above. The clue sheets were reviewed as connected causal narratives, but “deducible from any 6 of 9” remains a semantic design judgment rather than a formal proof; the packs should therefore be treated as **playtest-ready V3 drafts**, not as production-final content.
