# BOOMTOWN — AP Microeconomics Campaign Implementation Bible

**Version 1.3 | 15 missions | 60 graded stops | contemporary Project Y adaptation**

## Source-to-display register — version 1.3

Render the following canonical copy verbatim once at its stated event. Keep the established world/metric/stop sequencing; these are field bindings, not new screens or extra gates. If an importer uses another key, map it explicitly rather than synthesizing a summary.

| Canonical source | Player surface and event |
|---|---|
| §1 Opening card — exact player copy, including its final line | Campaign opening before M1 starts; retain role, named action and closing constraint together |
| Each mission §A four-sentence mission body | Existing mission briefing when that mission opens |
| Each mission §A Stakes — exact player copy | Separate stakes block on that same briefing; do not substitute objective or designer intent |
| Each mission §A Worth knowing first glossary and Primer concepts | Required preparation card before the first graded stop; includes M2 marginal choice and M4 MRP |
| Each mission §A Equations first needed today | Same preparation card; render the equations and symbols, using §5’s authoring register to verify required exercise coverage |
| Each mission §J takeaway and Segue — exact player copy | Post-mission metric/result screen after existing outcome processing; show each in its distinct field |
| §4 per-person Bio question / Bio answer | Optional roster bio after selecting that person; question then reveal-on-request, timer paused, no state effects |
| M15 Ending card — exact player copy | Campaign completion after final mission result using the existing ending contract; preserve its three paragraphs |

## 0. Readiness boundary

The supplied handback reports that version 1.0 was built, imported and playable. Version 1.1 applied that handback; version 1.2 adds ensemble scenes, physical prop states and optional review. Handback 2 reports v1.2 builds, imports and plays. Version 1.3 revises choices, prerequisite/render mappings and mission-card copy against that handback; its new build has not been run here. The attached gate report distinguishes tested content from absent engine checks and records the authoring-process deviation.

**Authority:** Master Brief v3.6, Giant Gate v2.6, Ledger v1.6, QUESTION_TYPES(1).md and Whiteout v2.11 structure. The supplied Albert Microeconomics sheet supplies Units 1–6. Course percentages and exam timings are source metadata, not verified current exam claims. Project Y supplies geography, not the old nuclear subject or historical cast. Schema/importer and executable world files are absent; engine checks remain NOT TESTED.

# 1. Campaign premise and opening

Six weeks after a mineral discovery, a small mesa town faces rapid population growth. The mineral is fictional and its chemistry is irrelevant to this course. Freight access, wages, food, housing and water become linked disputes. The player is a junior member of a state economic advice team, with access to records but no power to set private prices. Fifteen investigations build an open recommendation before the freight agreement deadline. Firms, cooperative members and elected council members retain their own decisions. The objective is a defensible agreement with an explicit distribution plan, not maximizing every citizen's satisfaction.

## Opening card — exact player copy

As a junior state economic adviser, you arrive in a mesa town where a mine has drawn a rush of people. Shops need staff, homes cost more, and the taps serve long queues. You will build The Town and Freight Agreement so the town can see who gains and who pays. Mara Velez hands you the firms’ proposed terms to check. You have six weeks before they sign, and your first case is a diner that has run out of food.

## Opening implementation state

One card, five sentences, one Continue, over normal spawn (0,14); no forced camera. Continue reveals four bars and Mission 1. First movement follows the diner dispute to the Business Workshop. No pre-day tour, race or greeting checklist is scheduled. Sound and color only reinforce exact text; all evidence and dialogue stay in the mission log.

## 1.1 Named delivery and public board

```yaml
delivery:
  name: "The Town and Freight Agreement"
  what: "A public plan that the council, firms and housing co-op read to check each promise, its cost and who pays."
  pieces:
    - "The meal trade" # M1
    - "The lunch price finding" # M2
    - "The room price test" # M3
    - "The cook hiring rule" # M4
    - "The rent access count" # M5
    - "The housing fee account" # M6
    - "The supplier shift plan" # M7
    - "The fair entry rule" # M8
    - "The wage clause" # M9
    - "The freight access finding" # M10
    - "The pact risk forecast" # M11
    - "The water cost rule" # M12
    - "The filter cost account" # M13
    - "The access retrofit choice" # M14
    - "The signed town agreement" # M15
```

The existing public board in the Civic Advice Office displays all fifteen piece names from the start. Each mission outcome adds its named finding to the matching slot; slots preserve the findings and their later qualifications in order. The board replaces all Project Y delivery labels, including The Evidence Chain, without changing a room, collider or landmark. Piece 15 stays READY TO SIGN until Stop 60 is correct and the final resource check succeeds; only then does it become SIGNED and open the ending card. Pieces 1–14 remain visible in the log and on the board. No separate mission or graded stop is added.

# 2. Campaign metrics, timer, and recovery economy

| Bar | Start | Meaning | Decision relevance | Zero state |
|---|---:|---|---|---|
| Plan Evidence | 80 | Completeness of tested claims in the agreement | Incomplete evidence blocks signing | Review mandate expires; restore snapshot |
| Service Continuity | 85 | Readiness of food and housing continuity measures | Incomplete measures block signing | Service guarantee fails; restore snapshot |
| Field Budget | 85 | Staff and survey margin above committed work | Low margin postpones discretionary surveys | Survey capacity exhausted; restore snapshot |
| Public Accountability | 70 | Open evidence and named responsibility for promises | Unassigned promises block signing | Hearing loses its valid record; restore snapshot |

Bars are bounded 0–100 and are game progress/resources, not welfare measurements or predictions of prices. Each mission applies the event-specific deltas recorded in §2.1; its staff visits consume Field Budget when stated, and verified funding can restore that margin. Allocation represents follow-up work with assistance unlocked by performance, not money created by economics. All four at 100 plus Stop 60's justified plan and signed commitments are required for victory. No lock before final proof. At zero: end the attempt and restore mission-start bars, bank, readings, dialogue, unlocked stops and timer; completed earlier missions remain. No double awards.

Timer begins after arrival Continue; pause dialogue, examples, loading, accessibility, backgrounding, system interruptions and aftermath. RP = clamp(4,12,11+time_modifier−incorrect_submissions). time_modifier = +1 at elapsed ≤ target; 0 for target < elapsed ≤ 1.25 target; −2 thereafter. Exploration costs nothing; every committed wrong costs one RP before the floor. One RP raises one unlocked bar one percent; bank cap 30. Outcome → event → zero check → time/accuracy → RP → allocate/bank → lock → review → next briefing. After Stop 60 the payoff begins with the hearing reaction; final signing awaits this allocation screen so it cannot deadlock behind its own reward.



## 2.1 Event-specific deltas and minimum-RP reference path

Starts replace preliminary values: Plan Evidence 80, Service Continuity 85, Field Budget 85, Public Accountability 70. The bars measure agreement readiness, not residents’ utility. Every Field Budget decline is the named mission’s staff visit and records check; rises are confirmed funding or avoided duplicated field work. Evidence declines in M5/M10/M14 revoke specific earlier claims; service declines in M12/M14 reflect newly required water and replacement-plan work. Accountability falls in M14 when the double-counted public claim is withdrawn. No lost bar is punishment for a correct answer.

| M | Visible event | Automatic E/S/B/A | 4-RP allocation | Bars after | Bank |

|---:|---|---|---|---|---:|

| 1 | The diner posts a meal-for-repair agreement and reopens its lunch queue | [] | [0, 0, 0, 4] | [83, 87, 83, 76] | 0 |

| 2 | The notice board separates the lunch surge from the delivery cost dispute | [1] | [0, 0, 0, 4] | [85, 88, 82, 82] | 0 |

| 3 | The owner restores the lower advertised rate and opens the vacant rooms | [1] | [0, 0, 4, 0] | [86, 91, 85, 84] | 0 |

| 4 | The diner posts one job and keeps the equipment upgrade on its list | [1] | [0, 0, 3, 1] | [88, 93, 86, 86] | 0 |

| 5 | The hearing labels the rent cap as tenant relief rather than a promise of a home for all | [4] | [2, 0, 2, 0] | [88, 95, 87, 90] | 0 |

| 6 | The council reserves the measured fee proceeds for the housing measure | [1] | [1, 0, 3, 0] | [92, 97, 92, 92] | 0 |

| 7 | The supplier keeps its current shift and marks its lease for review | [1, 6] | [1, 0, 3, 0] | [94, 100, 94, 93] | 0 |

| 8 | New vendor permits appear beside the diner’s old menu | [4] | [1, 0, 2, 1] | [97, 100, 97, 96] | 0 |

| 9 | The wage agreement adds a fourth job and posts the offer openly | [4, 5] | [1, 0, 3, 0] | [100, 100, 99, 99] | 0 |

| 10 | The town posts the unused terminal slots beside the proposed second-line offer | [4] | [3, 0, 1, 0] | [100, 100, 99, 100] | 0 |

| 11 | The hearing removes the unenforced pact from its guaranteed service forecasts | [6, 7] | [0, 0, 2, 0] | [100, 100, 100, 100] | 2 |

| 12 | The water notice adds the downstream cost to the freight comparison | [4, 11] | [0, 2, 1, 0] | [100, 100, 100, 100] | 3 |

| 13 | The council retains the cheaper filter quote and publishes who would gain from the tariff | [7, 11] | [0, 0, 0, 0] | [100, 100, 100, 100] | 7 |

| 14 | The new-line ribbon is taken down and the access retrofit stays on the hearing board | [6] | [3, 1, 0, 0] | [99, 99, 98, 98] | 7 |

| 15 | The complete agreement is funded and prepared for the final resource check | [14] | [0, 0, 0, 0] | [100, 100, 100, 100] | 11 |

Every reference mission assumes elapsed >125% of target and at least five committed wrong answers: clamp(4,12,11−2−5)=4. Thus the same row sequence is an explicit high-error successful route. A tested synthetic zero event sets Field Budget to zero before recovery and restores the stored snapshot rather than letting RP revive a failed attempt. Award claims remain simulated arithmetic, not runtime play. Players who allocate poorly can reopen the current allocation screen before Continue; previously spent points do not multiply. Final-stage assistance reassigns unspent bank points only; it does not waive four 100% bars. The reference path proves reachability, not every arbitrary spending policy.



# 3. Mesa town — areas and fixtures

The supplied footprint is preserved: T (0,58), 20×11×5.4; CM (−30,42), 16×14×6.6; E (32,42), 20×10×5.2; P (−48,−10), 15×13×6.2; X (48,−10), 18×12×5.8 metres. The existing five compounds become offices and a shared service yard. Fences stay in their original bounds, gates remain on the same sides; security signage becomes delivery and worksite access signage. P and X task access opens after Mission 4, using the existing gate routes. No public road is blocked.

Spawn (0,14), yaw 0, stays clear by 12 metres. Ashley Pond centre (0,−8), 14×14, water −0.35, bed 0.8, shore 4; mesa size 760, player limit 105, profile mesa, relief 1.0; Trinity Drive (0,10), 240×16, worn 10; bridge road (16,54), 11×104, worn 6.5; access spur (−8,19), 11×22, worn 6. Preserve duplicated road exclusions, MESA_PLAYER_LIMIT, clearSpot avoid circles, forest colliders, six emissive road lights, unlit sky, sky scale 850 and look.far 2600. Placers use (x,z,y). Canyon rail remains at radius 96. No new building or changed road is authorized by this bible.

Fourteen landmark buildings keep positions/dimensions: Fuller Lodge (0,−30;22×12×8) is the community dining lodge; Big House (10,−38;16×10×7.5) is a guesthouse; 4-plexes (−48,−26;18×9×7) and (44,−26;18×9×7) remain homes; duplexes (−28,24;14×8×5.5); hutments (30,26;16×8×4.5) become modular homes; dorms (−66,−6;14×10×6) and (−80,−6;14×10×6) remain shared housing without gender restrictions; barracks (−76,26;16×9×5) become seasonal housing; theatre (68,−6;16×12×8), exchange (58,24;11×10×6) becomes a convenience store; chapel (−48,34;10×12×7) remains a meeting landmark; infirmary (58,38;12×10×6.5) becomes a clinic; gatehouse (27,88;6×6×4) becomes a delivery checkpoint. Water tank (−78,−46), boilerhouse (−60,52), icehouse (−18,−20), six west trailers and standpipe remain. Censorship mail signage becomes parcel collection. Modern utility pickups replace jeep styling within identical colliders; bicycles stay. Mine and railroad exist only in contracts, photographs and dispatch records, off-map.


## 3.1 Canonical persistent fixture inventory

These objects are newly authored room interiors within existing footprints; the source has no fixture registry, so build work is explicit. Three calculation/display objects and one operable terminal are sufficient in each office. Person stops use the named owner beside the same declared object. Each caption is one sentence.

| Stable ID | Physical name | Kind | Area / place | Physical appearance | Player caption | Graded stop references |
|---|---|---|---|---|---|---|
| `bt-budget-desk` | Budget Desk | work surface | T / Civic Advice Office | Scuffed laminate desk with two open binders and a metal cash tray. | The desk holds public budgets and the competing offers. | 5, 7, 9, 17, 21, 39, 51, 55 |
| `bt-town-map` | Town Map | map display | T / Civic Advice Office | Wall-mounted street plan with removable house and service tokens. | The map tracks town services and access constraints. | 6, 8, 10, 12, 18, 22, 28, 40, 44, 48, 52, 56, 60 |
| `bt-hearing-table` | Hearing Table | work surface | T / Civic Advice Office | Long timber table with paper clips and a flush trial touch panel. | The table holds signed hearing records. | 11, 27, 43, 47, 59 |
| `bt-public-notice-board` | Public Notice Board | notice board | T / Civic Advice Office | Cork board with fifteen labelled agreement slots behind a clear cover. | The board displays decisions and their named owners. | None; persistent display/storage |
| `bt-cost-ledger-desk` | Cost Ledger Desk | work surface | CM / Business Workshop | Steel desk with invoice stacks held down by a small brass scale. | The desk holds invoices and production costs. | 1, 13, 25, 29, 49 |
| `bt-kitchen-planning-table` | Kitchen Planning Table | work surface | CM / Business Workshop | Washable table with stove outlines and movable staffing counters. | The table carries staffing and equipment plans. | 2, 4, 14, 16, 24, 26, 30, 36, 42 |
| `bt-order-terminal` | Order Terminal | operable terminal | CM / Business Workshop | Touchscreen fixed beside a receipt printer and a stained order rail. | The terminal tests order and staffing records. | 3, 15, 23, 35 |
| `bt-supplier-shelves` | Supplier Shelves | storage fixture | CM / Business Workshop | Three shallow shelves with labelled sample bins and paper price cards. | The shelves hold supplier samples and current quotes. | None; persistent display/storage |
| `bt-dispatch-desk` | Dispatch Desk | work surface | E / Freight Contract Office | High desk with bound dispatch books and a rack of freight tags. | The desk carries original dispatch and capacity records. | 37, 41, 53 |
| `bt-booking-terminal` | Booking Terminal | operable terminal | E / Freight Contract Office | Fixed screen with a booking keypad and an archive-mode lamp. | The terminal runs archived booking trials. | 38, 46 |
| `bt-contract-table` | Contract Table | work surface | E / Freight Contract Office | Wide table with contract binders and a capped stamp pad. | The table holds access contracts and cost commitments. | None; persistent display/storage |
| `bt-freight-wall-map` | Freight Wall Map | map display | E / Freight Contract Office | Pinboard rail map with twine routes and removable capacity labels. | The map displays the off-map freight network. | None; persistent display/storage |
| `bt-lease-desk` | Lease Desk | work surface | P / Housing and Work Office | Desk with separate trays for signed leases and unmatched applications. | The desk holds leases and unmatched applications. | 19, 31, 33, 57 |
| `bt-job-board` | Job Board | notice board | P / Housing and Work Office | Slotted board with wage cards, vacancy hooks and a transparent cover. | The board lists wages and open jobs. | 20, 32, 34 |
| `bt-survey-terminal` | Survey Terminal | operable terminal | P / Housing and Work Office | Accessible-height screen with a trackball and a survey reference binder. | The terminal compares housing and labor records. | None; persistent display/storage |
| `bt-meeting-table` | Meeting Table | work surface | P / Housing and Work Office | Round table with folding chairs and a co-op stamp box. | The table holds cooperative commitments. | None; persistent display/storage |
| `bt-water-record-desk` | Water Record Desk | work surface | X / Water and Land Office | Desk with sealed record folders and a rack for sample photographs. | The desk holds measured water damage records. | 45 |
| `bt-catchment-map` | Catchment Map | map display | X / Water and Land Office | Raised wall map with blue stream lines and removable withdrawal markers. | The map links withdrawals and downstream effects. | 50, 54, 58 |
| `bt-planning-terminal` | Planning Terminal | operable terminal | X / Water and Land Office | Fixed screen beside water-use charts in wipe-clean sleeves. | The terminal tests water and freight plans. | None; persistent display/storage |
| `bt-permit-counter` | Permit Counter | work surface | X / Water and Land Office | Low counter with numbered permit trays and a date stamp. | The counter holds permits and reporting duties. | None; persistent display/storage |

These bible-level fixture IDs newly formalize the existing named objects; they do not replace any importer identity. Bind each ID to its existing object, keeping every coordinate and placement. Stop references above are exhaustive; an object with no graded stop remains a real room object.

For operated VERIFY stops, T uses a portable Hearing Terminal at the Hearing Table: it is the same persistent table’s integrated touch panel, named Hearing Table in placement. E uses Booking Terminal, CM Order Terminal, P Survey Terminal and X Planning Terminal. No new off-map place is implied by any archive or trial. All trials simulate the stated model or replay archived records; they are not claims of causal field validation.

# 4. Canonical roster

### Mara Velez

**Role:** state economic adviser. **Pronouns:** she/her. **Allowed short name:** Mara. **Area ownership:** T.

**Wants:** Resolve disputes without spending promises twice. **Blind spot:** Initially trusts neatly balanced aggregate totals.

**First entrance:** Opens the competing offers and demands their costs. **Domain:** marginal analysis, fiscal accounts and distribution.

**Decision function:** Receives final recommendations; the council retains the legal vote. **Verbal habit:** “What claim would change our choice?”

**Arc:** After M14 she requests separate resource and transfer columns before any recommendation. **Gameplay necessity:** Public accountability and final integration.

**Optional dialogue states:** Before evidence: “What claim would change our choice?” After the arc: “Keep both the gain and its cost in the record.” Final: “My signed part is ready for review.”


**Bio question — optional, ungraded:** Which cost could a neat total hide from Mara?

**Bio answer — reveal on request:** A gain for one group may be a bill paid by another. Mara must separate cash that changes hands from real resources saved, and name anyone left out of the total. The response stays ungraded and does not change campaign state.

### Nico Bell

**Role:** diner owner. **Pronouns:** he/him. **Allowed short name:** Nico. **Area ownership:** CM.

**Wants:** Keep the diner solvent and the town fed. **Blind spot:** Welcomes cheaper suppliers but initially resists competing food sellers.

**First entrance:** Reserves meals while marking the broken preparation bench. **Domain:** production, costs, firm behavior and labor contribution.

**Decision function:** Posts vacancies and implements the diner’s voluntary agreements. **Verbal habit:** “What changes if I do one more?”

**Arc:** After M8 he accepts the entry rule he wanted applied to his suppliers. **Gameplay necessity:** The recurring small-firm viewpoint.

**Optional dialogue states:** Before evidence: “What changes if I do one more?” After the arc: “Keep both the gain and its cost in the record.” Final: “My signed part is ready for review.”


**Bio question — optional, ungraded:** Would Nico want the same entry rule for a new diner as for his suppliers?

**Bio answer — reveal on request:** His interests pull both ways. Cheaper supplies help his diner, while new diners may cut his sales. A fair rule should apply to both; his own gain is not the whole town’s gain. The response stays ungraded and does not change campaign state.

### Ruth Sen

**Role:** terminal manager. **Pronouns:** she/her. **Allowed short name:** Ruth. **Area ownership:** E.

**Wants:** Keep the terminal solvent and its contractual service reliable. **Blind spot:** Initially presents private profit targets as physical capacity needs.

**First entrance:** Opens dispatch records without denying the unused capacity. **Domain:** market power, fixed costs, strategic interaction and access.

**Decision function:** Supplies original contracts; can commit terminal operating terms. **Verbal habit:** “Who covers the fixed bill?”

**Arc:** After M10 she separates cost recovery from exclusion and accepts an explicit access regime. **Gameplay necessity:** The cost recovery constraint behind the apparent antagonist.

**Optional dialogue states:** Before evidence: “Who covers the fixed bill?” After the arc: “Keep both the gain and its cost in the record.” Final: “My signed part is ready for review.”


**Bio question — optional, ungraded:** How could Ruth pay the fixed bill while letting more firms use the gate?

**Bio answer — reveal on request:** She could use open access terms with an explicit plan to cover fixed costs. The campaign tests that funded package; simply forcing a lower fee would not prove the terminal can pay its bills. The response stays ungraded and does not change campaign state.

### Leila Moss

**Role:** housing cooperative organizer. **Pronouns:** she/her. **Allowed short name:** Leila. **Area ownership:** P.

**Wants:** Keep both current tenants and new workers housed. **Blind spot:** Initially lets incumbent tenant gains stand for all applicants.

**First entrance:** Keeps unmatched application cards visible beside signed leases. **Domain:** housing allocation, labor markets and distribution.

**Decision function:** Signs cooperative funding and reports access to homes. **Verbal habit:** “Who is still outside?”

**Arc:** After M5 she retains tenant relief but demands a separate access count. **Gameplay necessity:** People omitted by averages and posted prices.

**Optional dialogue states:** Before evidence: “Who is still outside?” After the arc: “Keep both the gain and its cost in the record.” Final: “My signed part is ready for review.”


**Bio question — optional, ungraded:** Whose housing needs might Leila miss if she counts only signed leases?

**Bio answer — reveal on request:** New workers and people whose requests were turned down can vanish from a count of signed leases. Leila keeps unmatched requests visible so lower rent for tenants is not mistaken for homes for all. The response stays ungraded and does not change campaign state.

### Owen Price

**Role:** watershed engineer. **Pronouns:** he/him. **Allowed short name:** Owen. **Area ownership:** X.

**Wants:** Keep downstream water costs visible and protection funded. **Blind spot:** Initially treats a technically effective filter as affordable without checking trade policy.

**First entrance:** Carries raw water costs into the hearing instead of a single alarm color. **Domain:** externalities, common resources and monitoring.

**Decision function:** Owns the damage report and water-review commitments. **Verbal habit:** “Where did the cost go?”

**Arc:** After M13 he carries resource and payment accounts together. **Gameplay necessity:** External costs borne by nonparticipants.

**Optional dialogue states:** Before evidence: “Where did the cost go?” After the arc: “Keep both the gain and its cost in the record.” Final: “My signed part is ready for review.”


**Bio question — optional, ungraded:** Who pays if Owen picks a filter the town cannot afford?

**Bio answer — reveal on request:** The people who fund the plan must cover its price, and people down the stream may bear harm if the filter is never bought. Owen must check both how it works and how its purchase is funded. The response stays ungraded and does not change campaign state.

No real historical speaker is retained. Unnamed workers, applicants, council members and company labels are groups represented by these canonical owners, not extra quiz identities. Document headings, including Optional worked examples, are excluded from roster parsing.

## 4.0 Roster reflection rendering contract

Bind each canonical roster entry’s **Bio question — optional, ungraded** and **Bio answer — reveal on request** to the same person’s optional bio panel. Show the question after the biography and a Show explanation control directly below it; reveal only that person’s answer. No submitted answer, score, timer charge, unlock or story flag is required. All five questions and reveals were already present in v1.2 source; their visibility in the imported build must be checked, not inferred from source presence.

## 4.1 Ensemble state and optional conversation contract

Evidence flags `bt_evidence_M01` through `bt_evidence_M15` become true once the corresponding mission outcome is committed; `bt_signed` becomes true only after Stop 60, the final allocation and all existing signing conditions. Existing intermediate success events fire the numbered beats once. Flags grant no RP, change no bars and unlock no required question. Save them with the existing mission snapshot; restore uncommitted flags on retry. Earlier committed flags survive. `bt_signed` never substitutes for the resource gate.

All added speech is exact player copy in the existing beat log. Arrival lines remain; authored aftermath responses now accompany the existing physical outcomes. Added speech uses the existing Continue, pauses the timer and returns control to the same position; two bubbles maximum. When a second main character is outside the current office, their bubble is labelled **radio**; every second-speaker line below is radio to avoid creating a travel prerequisite. Main-speaker presence follows the beat's existing location, also using radio if their ownership area differs. No dialogue changes a correct answer or forces a new route.

Optional Talk selects the highest true priority: signed=30, character milestone=20, fallback=10. Show one line per explicit request, never on proximity. A repeat request repeats the selected line without state effects; log it once per state and leave earlier lines available in dialogue history. Greetings reveal only completed findings. Each character's milestone and final variants supersede their old generic optional-dialogue directions.

| Character | Priority 10: fallback, exact line | Priority 20: condition and exact line | Priority 30: `bt_signed`, exact line |
|---|---|---|---|
| Mara Velez | “The total looks neat. Let us find what it leaves out.” | `bt_evidence_M14`: “You found the same saving counted twice. I want both ledgers open.” | “The signed plan names the bill as well as the gain.” |
| Nico Bell | “I need supplies at a fair price and enough customers to pay my cooks.” | `bt_evidence_M08`: “Those new stalls use the rule I wanted for suppliers. I cannot ask for a private exception.” | “My diner has rivals now. The open lunch queue is still worth keeping.” |
| Ruth Sen | “I will open the dispatch book. Keep the fixed bill on the table too.” | `bt_evidence_M10`: “The unused slots are real. My price rule cannot stand in for a capacity count.” | “The access terms are signed, and the upkeep bill has an owner.” |
| Leila Moss | “I brought the leases and the cards from people who have no lease.” | `bt_evidence_M05`: “The cap helps some tenants. The unmatched cards stay beside the signed ones.” | “The agreement funds work on access. It does not say every family has a home.” |
| Owen Price | “Walk the stream on the map before you call another load a gain.” | `bt_evidence_M12`: “The water cost is in the comparison now. Keep the freight benefit there too.” | “I signed the reporting duty. The first bad water result still needs an answer.” |

### Relationships changed by evidence

| Relationship | Early disagreement / promise | Evidence turning point | Later acknowledgement and persistent change |
|---|---|---|---|
| Nico–Leila | M1 Nico promises meals while Leila asks who can afford to wait; M5 relief and access pull apart. | M8 entry evidence applies Nico's preferred supplier rule to competing diners. | M8 dialogue accepts the shared rule; M9 Nico accepts that a better wage offer need not be disloyalty. `bt_evidence_M08` changes his greeting and leaves vendor permit copies beside his menu. |
| Ruth–Mara | M6 Mara wants cheaper deliveries; Ruth insists the fixed bill cannot disappear. | M10 unused capacity separates a price rule from a physical limit. | M14 Mara withdraws her double-counted case for a new line; Ruth commits to funded open access rather than claiming vindication for exclusion. M15 both sign separate responsibilities. |
| Owen–Mara | M10 Mara wants an access gain counted promptly; Owen asks that harm stay visible. | M12 the social-cost comparison corrects the provisional freight target. | M13 Owen accepts cheaper imported filters when they meet the same standard; M14 Mara asks him to check the harm term before publishing. `bt_evidence_M12` updates Owen's greeting; the water-cost sleeve stays on the map. |

### Supporting voices

Supporting characters use existing locations or named radio links and never own a graded stop. At most one appears in a scene. Their exact observations below trigger after already-correct evidence, never as hidden evidence needed to answer.

| Voice / role | Trigger / channel | Exact observation |
|---|---|---|
| Rosa Kim, diner cook | M4 aftermath, Business Workshop doorway; after Nico's existing aftermath bubble | “There is a fourth name on the shift sheet. We still share the same stove.” |
| Dev Shah, tenant and delivery rider | M5 after Stop 19, radio from the trailer row | “My sister keeps her lower rent. My application is still in the other tray.” |
| Sal Ortiz, freight dispatcher | M10 after Stop 39, radio from the off-map terminal | “I have marked the usable slots. A booking rule kept them empty; the track did not vanish.” |

Supporting observations append one bubble only where the baseline has panel text, or replace an otherwise silent aftermath slot. Their triggers, log and retry rules match the owning beat; no extra scene, quest or interruption is added.

# 5. Authoritative numbered concept spine

| # | Course concept | Prerequisite concept numbers | Enables and later use | Common trap |

|---:|---|---|---|---|

| 1 | Scarcity, factors and production possibilities | [] | Stop 1: What the shift gives up | 8/24 reverses the requested unit. |

| 2 | Opportunity cost, comparative advantage and trade | [1] | Stop 2: Who has the better tradeoff; Stop 3: Try the exchange on the ledger; Stop 4: Keep the lunch service open | One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. |

| 3 | Marginal choice and utility per dollar | [1] | Primer and optional worked-example coverage; not independently graded | Confuse total and marginal gain; treat an efficient production point as a universally preferred allocation |

| 4 | Demand, supply and equilibrium | [1] | Stop 5: Count the unmatched orders; Stop 6: Separate four market changes; Stop 7: Read the lunch record; Stop 8: Explain the rise in public | 60 is supplied quantity, not shortage. |

| 5 | Elasticity and total revenue | [4] | Stop 9: Measure the lost receipts; Stop 10: Read response evidence; Stop 11: Check the midpoint claim; Stop 12: Reopen the vacant rooms | −100 is the signed new-minus-old change, not the requested decrease magnitude. |

| 6 | Short-run production and marginal product | [1] | Stop 13: Find the next worker’s output | 300 counts all output as the new worker’s contribution. |

| 7 | Cost measures and opportunity cost of ownership | [1, 6] | Stop 14: Separate the cost records; Stop 26: Read the avoidable costs; Stop 29: Which profit is at risk | An unavoidable current lease is fixed and paid out explicitly. |

| 8 | Price controls and allocation | [4] | Stop 17: Count homes the cap cannot promise; Stop 18: Who gets the benefit; Stop 19: Why the advertised rooms are gone; Stop 20: Keep the promise honest | 120 ignores the available homes. |

| 9 | Tax incidence and subsidies | [4, 5] | Stop 21: Reserve actual receipts; Stop 22: Follow the burden; Stop 24: Fund the promised measure | 200 taxes the old quantity. |

| 10 | Surplus and efficiency | [4] | Stop 23: Cost the vanished trades | 120 is revenue, not deadweight loss. |

| 11 | Competitive firm output and shutdown | [6, 7] | Stop 25: Measure the loss; Stop 27: Compare closing with staying open; Stop 28: Keep the shift or close it | −40 is signed profit, not the requested positive loss magnitude. |

| 12 | Entry, exit and long-run adjustment | [4, 11] | Stop 31: What entry changes; Stop 32: Let the new kitchens open | Supply cannot expand from entry before firms enter. |

| 13 | Differentiation and economies of scale | [7, 11] | Stop 30: Tell four firm situations apart | Homogeneity and price-taking motivate the competitive benchmark. |

| 14 | Factor demand and hiring | [6] | Stop 15: Test the fifth place at the stove; Stop 16: Approve the vacancy; Stop 34: Read the source of labor demand | 40 omits the wage. |

| 15 | Monopsony and minimum wages | [14] | Stop 33: The cost of one more hire; Stop 35: Test the wage floor; Stop 36: Set the agreement’s wage clause | 30 is the new wage, not the change in the whole bill. |

| 16 | Monopoly price, output and surplus | [7, 10] | Stop 37: Price the terminal’s chosen quantity; Stop 38: Separate firm and town benchmarks; Stop 39: Why space remains empty; Stop 40: Name the bottleneck accurately | 20 reads marginal revenue as the selling price. |

| 17 | Oligopoly and strategic interaction | [16] | Stop 41: Read what the pact offers; Stop 42: Read each incentive; Stop 43: Freeze the forecast; Stop 44: Use a defensible service forecast | 40 counts only one firm. |

| 18 | External costs and benefits | [10] | Stop 45: Add the missing cost; Stop 47: Test the corrected target; Stop 48: Correct the freight goal; Stop 59: Commit the final flow forecast | 20 excludes the external harm. |

| 19 | Public goods and common resources | [1, 18] | Stop 46: Which shared problem is which | The cartridge is excludable and rival. |

| 20 | Trade policy and distribution | [2, 4, 10] | Stop 49: Count the imported filters; Stop 50: Track the tariff’s effects; Stop 51: Read the distribution claim; Stop 52: Keep the compliance comparison fair | 100 ignores domestic supply. |

| 21 | Robust comparison of competing plans | [7, 10, 18] | Stop 53: Remove the double count; Stop 54: Keep the ledgers separate; Stop 55: Which plan survives the cost range; Stop 56: Reopen the apparent victory; Stop 57: Check the confirmed funding; Stop 58: Give each condition an owner; Stop 60: Sign the agreement | 30 counts the internal transfer as a resource saving. |

## 5.0 Prerequisite order and required preparation

Prerequisites here mean concepts assessed at earlier graded stops, not every related idea in the course. Concept 3 remains honestly marked as primer and optional-example coverage; no stop claims to assess utility maximization. It is not a hard prerequisite for reading supplied demand schedules, subtracting output, reading a payoff matrix or computing a supplied surplus triangle. The required primers teach each local marginal comparison before its first use. This preserves marginal reasoning without treating optional help as completed learning.

Concept 13 requires 7 and 11: cost measures and the competitive firm benchmark have already been assessed before Stop 30. Its classification board compares products and long-run average costs; it does not require the entry-adjustment sequence first taught at Stop 31. That distinction preserves the order of the four boards.

Same-day dependencies are intentional and enforced through the existing one-stop-at-a-time unlocks: M1 Stop 1 precedes Stops 2–4 (concept 1 → 2); M4 Stop 13 precedes Stop 14 (6 → 7) and Stops 15–16 (6 → 14); M12 Stop 45 precedes Stop 46 (18 → 19). The earlier result and explanation remain in the log before the next stop opens. All other required concept introductions occur on earlier days. Day boundaries do not substitute for this stop-order check.

### Stop-level prerequisite evidence and primer binding

The table below maps every required prerequisite to an earlier accepted stop and its displayed explanation. Existing sequential unlocks enforce the order; accepting a stop makes its feedback available before the next stop opens. The same-day chains are 1→2–4, 13→14–16, and 45→46. They do not require a day boundary.

Concept 3 now has explicit required teaching in the M2 primer, before Stop 5: next-unit gain, a six-versus-three utility-per-dollar comparison, and the interior allocation condition. It is preparatory household-choice coverage, not a claim that a graded stop assesses full utility maximization. Concept 4 uses a supplied demand schedule, so it requires scarcity (1), not a prior graded utility optimization. Hiring instead compares extra receipts with extra wage cost, taught before Stop 13 and applied at Stops 13 and 15; household utility is not its prerequisite. The curriculum coverage statement must retain this distinction.

**Rendering requirement:** Render every mission’s entire Worth knowing first glossary and primer before its first graded stop. Acknowledge the card with the existing mission-start control; do not add a quiz gate. Do not drop the marginal-choice paragraph or infer that opening optional examples teaches a prerequisite. Bind equation cards to the exact required uses below; optional questions and worked examples do not count as proof of mission use.

| Stop | Assessed concept | Prerequisite concept → earlier teaching/application stop |
|---:|---:|---|
| 1 | 1 | None |
| 2 | 2 | 1 → Stop 1 |
| 3 | 2 | 1 → Stop 1 |
| 4 | 2 | 1 → Stop 1 |
| 5 | 4 | 1 → Stop 1 |
| 6 | 4 | 1 → Stop 1 |
| 7 | 4 | 1 → Stop 1 |
| 8 | 4 | 1 → Stop 1 |
| 9 | 5 | 4 → Stop 5 |
| 10 | 5 | 4 → Stop 5 |
| 11 | 5 | 4 → Stop 5 |
| 12 | 5 | 4 → Stop 5 |
| 13 | 6 | 1 → Stop 1 |
| 14 | 7 | 1 → Stop 1; 6 → Stop 13 |
| 15 | 14 | 6 → Stop 13 |
| 16 | 14 | 6 → Stop 13 |
| 17 | 8 | 4 → Stop 5 |
| 18 | 8 | 4 → Stop 5 |
| 19 | 8 | 4 → Stop 5 |
| 20 | 8 | 4 → Stop 5 |
| 21 | 9 | 4 → Stop 5; 5 → Stop 9 |
| 22 | 9 | 4 → Stop 5; 5 → Stop 9 |
| 23 | 10 | 4 → Stop 5 |
| 24 | 9 | 4 → Stop 5; 5 → Stop 9 |
| 25 | 11 | 6 → Stop 13; 7 → Stop 14 |
| 26 | 7 | 1 → Stop 1; 6 → Stop 13 |
| 27 | 11 | 6 → Stop 13; 7 → Stop 14 |
| 28 | 11 | 6 → Stop 13; 7 → Stop 14 |
| 29 | 7 | 1 → Stop 1; 6 → Stop 13 |
| 30 | 13 | 7 → Stop 14; 11 → Stop 25 |
| 31 | 12 | 4 → Stop 5; 11 → Stop 25 |
| 32 | 12 | 4 → Stop 5; 11 → Stop 25 |
| 33 | 15 | 14 → Stop 15 |
| 34 | 14 | 6 → Stop 13 |
| 35 | 15 | 14 → Stop 15 |
| 36 | 15 | 14 → Stop 15 |
| 37 | 16 | 7 → Stop 14; 10 → Stop 23 |
| 38 | 16 | 7 → Stop 14; 10 → Stop 23 |
| 39 | 16 | 7 → Stop 14; 10 → Stop 23 |
| 40 | 16 | 7 → Stop 14; 10 → Stop 23 |
| 41 | 17 | 16 → Stop 37 |
| 42 | 17 | 16 → Stop 37 |
| 43 | 17 | 16 → Stop 37 |
| 44 | 17 | 16 → Stop 37 |
| 45 | 18 | 10 → Stop 23 |
| 46 | 19 | 1 → Stop 1; 18 → Stop 45 |
| 47 | 18 | 10 → Stop 23 |
| 48 | 18 | 10 → Stop 23 |
| 49 | 20 | 2 → Stop 2; 4 → Stop 5; 10 → Stop 23 |
| 50 | 20 | 2 → Stop 2; 4 → Stop 5; 10 → Stop 23 |
| 51 | 20 | 2 → Stop 2; 4 → Stop 5; 10 → Stop 23 |
| 52 | 20 | 2 → Stop 2; 4 → Stop 5; 10 → Stop 23 |
| 53 | 21 | 7 → Stop 14; 10 → Stop 23; 18 → Stop 45 |
| 54 | 21 | 7 → Stop 14; 10 → Stop 23; 18 → Stop 45 |
| 55 | 21 | 7 → Stop 14; 10 → Stop 23; 18 → Stop 45 |
| 56 | 21 | 7 → Stop 14; 10 → Stop 23; 18 → Stop 45 |
| 57 | 21 | 7 → Stop 14; 10 → Stop 23; 18 → Stop 45 |
| 58 | 21 | 7 → Stop 14; 10 → Stop 23; 18 → Stop 45 |
| 59 | 18 | 10 → Stop 23 |
| 60 | 21 | 7 → Stop 14; 10 → Stop 23; 18 → Stop 45 |

| Mission | Required use of displayed equation, or conceptual alternative |
|---:|---|
| 1 | Stop 1: 24/8 = 3 meal boxes per repair hour. |
| 2 | Stop 5: 90−60 = 30 lunches per day. |
| 3 | Stop 11: (4/8)/(10/45) = 2.25. |
| 4 | Stop 13: (60−48)/1 = 12 lunches per worker; 12×5 = $60 per shift. |
| 5 | Stop 17: 120−80 = 40 homes. |
| 6 | Stop 21: 4×30 = $120; Stop 23: 0.5×4×(50−30) = $40. |
| 7 | Stop 25: (8−10)×20 = −$40 profit; Stop 26: 100/20 = $5 AVC; Stop 27 compares $60 contribution with $100 fixed cost. |
| 8 | Stop 29: 180−120−40 = $20 economic profit. |
| 9 | Stop 33: (4×30−3×25)/1 = $45 per extra worker; Stop 35: the fifth adds $20 but costs 175−120=$55, while each of the first four adds at least its $30 wage. |
| 10 | Stop 37 uses 100−4Q = 20 to get Q=20, then P=100−2×20=$60. |
| 11 | No new equation; read each firm’s supplied payoff and compare unilateral changes at Stops 41–43. |
| 12 | Stop 45: 20+20=$40; Stop 47: 100−2Q=40 gives Q=30. |
| 13 | Stop 49: 100−40=60 imported filters. |
| 14 | No new equation; separate resource use from transfers at Stops 53–55. |
| 15 | No new equation; retrieve funding addition at Stop 57 and the social-cost target at Stop 59. |

## 5.1 Course-sheet coverage and qualifications

Units 1–6 are represented. Scarcity, factors, PPC location and utility-per-dollar receive primer/worked-example coverage; trade, market shifts, midpoint elasticity, cost measures, price controls, tax incidence, firm shutdown/entry, differentiation/scale, hiring/monopsony, monopoly, game theory, externalities/goods, trade policy and distribution receive graded applications. This is a cumulative campaign, not an exhaustive replacement for every graph-drawing FRQ; PPC construction, smooth cost-curve tangencies, detailed Lorenz/Gini calculation and every cross-elasticity variation need complementary practice. No source exam timing claim is adopted as current.

Sheet shorthand is qualified: general marginal revenue product (MRP, added revenue from one more worker)=MP×MR, with MP×P only for price-taking output; doubled MR slope only for linear demand; double shifts may be resolved if their magnitudes are supplied; taxes/subsidies can correct preexisting distortions; public goods can have multiple provision institutions; housing-ceiling effects depend on horizon and enforcement; a harm charge on an unchanged monopoly does not alone establish social efficiency. M15 specifies a replacement regulated access regime and separately funded fixed costs.

## 5.2 Keystone encounter matrix and architecture exceptions

| Keystone | Foundation | Delayed use | Synthesis | Scope note |

|---|---|---|---|---|

| Opportunity cost | M1 | M4/M8 | M14/M15 | Resource accounts retain forgone alternatives |

| Marginal analysis | M1 primer/M4 | M7/M9 | M10/M12/M15 | Utility-per-dollar itself is optional practice, not a false graded encounter |

| Price incentives | M2 | M5/M8 | M11/M15 | Entry and price rules alter responses |

| Equilibrium | M2 | M5/M6 | M12/M15 | Compare the same quantity/price boundary |

| Elasticity | M3 | M6 | M13 | M13 applies burden and traded-quantity responsiveness; formal elasticities not recalculated |

| Cost structure | M4 | M7/M8 | M14/M15 | Fixed-cost financing distinct from marginal pricing |

| Surplus | M5 distribution primer/M6 formal | M10/M12 | M13/M15 | Transfers are distinct from lost gains |

| Competition and entry | M8 | M10/M11 | M14/M15 | Three separated later applications |

| Factor demand | M4 | M9 | M15 conditions | Two main graded missions plus conditional finale recall; explicit compressed-scope exception |

| Social effects | M5 distribution/M6 corrective-tax example | M12 | M14/M15 | Externality foundation is formalized at M12, then synthesized without new final concepts |

This matrix does not relabel every repeated number as retrieval. Immediate repeats are PRACTICE; late decisions combine established concepts. Several secondary keystones recur as decision conditions rather than standalone calculations. The supplied 15-mission scope gives factor-demand fewer than three separated deep graded missions; the exception is explicit. Broader graded graph and utility work remains recommended complementary practice.

## 5.3 Glossary register

Every mission card supplies its actual compact definitions before Stop 1; the full register below remains searchable from any card. Definitions describe functions in ordinary words and do not require hidden aliases.

| Term | Exact definition | First mission | Required before stop |

|---|---|---:|---:|

| Scarcity | Wants exceed the resources available to meet them. | 1 | 1 |

| Opportunity cost | The next-best alternative given up by a choice. | 1 | 1 |

| Capital | Produced tools and equipment used to make other goods. | 1 | 1 |

| Comparative advantage | The ability to produce a good at a lower opportunity cost. | 1 | 1 |

| Production possibilities curve | The maximum combinations of two goods that available resources can produce. | 1 | 1 |

| Demand | Quantities buyers are willing and able to buy at different prices. | 2 | 5 |

| Supply | Quantities sellers are willing and able to sell at different prices. | 2 | 5 |

| Equilibrium | A price at which quantity demanded equals quantity supplied. | 2 | 5 |

| Substitute | A good that can be used in place of another. | 2 | 5 |

| Complement | A good used together with another. | 2 | 5 |

| Price elasticity of demand | The percentage quantity response divided by the percentage price change. | 3 | 9 |

| Midpoint method | A percentage change measured relative to the average of the two values. | 3 | 9 |

| Total revenue | Price multiplied by units sold. | 3 | 9 |

| Income elasticity | The percentage quantity response to a percentage income change. | 3 | 9 |

| Cross-price elasticity | The percentage quantity response to another good’s percentage price change. | 3 | 9 |

| Marginal product | Extra output from one more unit of an input. | 4 | 13 |

| Average product | Total output divided by input quantity. | 4 | 13 |

| Fixed input | An input that cannot change during the period studied. | 4 | 13 |

| Marginal revenue product | Extra revenue generated by one more unit of an input. | 4 | 13 |

| Marginal utility | Extra satisfaction from one more unit consumed. | 4 | 13 |

| Price ceiling | A legal maximum price. | 5 | 17 |

| Binding control | A price rule that prevents the market from reaching its otherwise available equilibrium. | 5 | 17 |

| Shortage | Quantity demanded exceeds quantity supplied at a stated price. | 5 | 17 |

| Distribution | How gains, costs or income are shared among people. | 5 | 17 |

| Excise tax | A payment charged per unit traded. | 6 | 21 |

| Tax incidence | How a tax burden is divided between buyers and sellers. | 6 | 21 |

| Consumer surplus | Willingness to pay minus actual payment, summed over buyers. | 6 | 21 |

| Producer surplus | Payment received minus minimum supply cost, summed over sellers. | 6 | 21 |

| Deadweight loss | Net gains from trade lost rather than transferred to another party. | 6 | 21 |

| Subsidy | A payment that lowers a recipient’s effective cost or raises its effective return. | 6 | 21 |

| Marginal cost | The extra total cost of one additional unit. | 7 | 25 |

| Average variable cost | Variable cost divided by output. | 7 | 25 |

| Average total cost | Total cost divided by output. | 7 | 25 |

| Economic profit | Revenue minus explicit and implicit opportunity costs. | 7 | 25 |

| Shutdown | Stopping production in the short run while unavoidable fixed costs remain. | 7 | 25 |

| Exit | Leaving an industry when all commitments can be reconsidered. | 7 | 25 |

| Perfect competition | Many price-taking firms sell identical goods with open entry and exit. | 8 | 29 |

| Monopolistic competition | Many firms sell differentiated products with open entry and exit. | 8 | 29 |

| Economies of scale | Long-run average cost falls as planned output grows. | 8 | 29 |

| Diseconomies of scale | Long-run average cost rises as planned output grows. | 8 | 29 |

| Normal profit | Zero economic profit after all opportunity costs are covered. | 8 | 29 |

| Derived demand | Demand for an input comes from the output it helps produce. | 9 | 33 |

| Monopsony | A market with a single buyer. | 9 | 33 |

| Marginal factor cost | The extra total spending needed to hire one more unit of an input. | 9 | 33 |

| Minimum wage | A legal minimum payment per unit of labor. | 9 | 33 |

| Monopoly | A sole seller protected by barriers to entry. | 10 | 37 |

| Marginal revenue | The extra total revenue from one more unit sold. | 10 | 37 |

| Allocative efficiency | Output at which marginal social benefit equals marginal social cost. | 10 | 37 |

| Barrier to entry | A condition that prevents or discourages new sellers. | 10 | 37 |

| Dominant strategy | An action that is best regardless of the other player’s action. | 11 | 41 |

| Nash equilibrium | A set of actions where neither player gains by changing alone. | 11 | 41 |

| Oligopoly | A market with a few interdependent sellers. | 11 | 41 |

| Collusion | An agreement among firms to reduce competition. | 11 | 41 |

| External cost | A cost imposed on people outside a transaction. | 12 | 45 |

| Marginal social cost | Private marginal cost plus external marginal cost. | 12 | 45 |

| Marginal social benefit | Private marginal benefit plus external marginal benefit. | 12 | 45 |

| Public good | A good that is both nonrival and nonexcludable. | 12 | 45 |

| Common resource | A rival resource from which users are difficult to exclude. | 12 | 45 |

| Free rider | Someone who benefits without contributing to provision. | 12 | 45 |

| Tariff | A tax on imported goods. | 13 | 49 |

| Import quota | A limit on how much of a good may be imported. | 13 | 49 |

| Terms of trade | The rate at which one good exchanges for another. | 13 | 49 |

| Lorenz curve | A curve relating cumulative population share to cumulative income share. | 13 | 49 |

| Gini coefficient | An inequality summary from zero for equality toward one for maximal concentration. | 13 | 49 |

| Transfer | A payment that changes who holds purchasing power without itself using up resources. | 14 | 53 |

| Fixed cost | A cost unchanged by output within the stated period. | 14 | 53 |

| Sensitivity analysis | Checking whether a conclusion changes across plausible input values. | 14 | 53 |

| Sunk cost | A cost already incurred that the current choice cannot recover. | 14 | 53 |

| Accountability | A named person or institution must report whether a promise is kept. | 15 | 57 |

| Feasible plan | A plan that meets all stated constraints with available resources. | 15 | 57 |

# 6. Dramatic spine and clue ledger

| Clue | Plant / reinforce | Initial reading | True meaning / economics | Payoff |

|---|---|---|---|---|

| Queue with unchanged kitchen cost | M1 meal queue / M2 old-price orders | Every rise is a supply failure | Demand can rise at unchanged costs | M2 explains lunch while M3 distinguishes room demand |

| Lower rent beside waiting applications | M3 empty rooms / M4 worker movement | Cheaper posted rent houses everyone | Allocation and distribution differ from posted prices | M5 first major reversal: relief does not meet access promise |

| Usable freight slots beside high prices | M6 lost deliveries / M9 freight complaint | The terminal must be physically full | Profit-maximizing output may be below capacity | M10 second major reversal: entry rules matter |

| Water-cost note on freight map | M5 housing water concern / M10 no-harm benchmark explicitly provisional | More output is always the efficiency goal | Social marginal costs change the benchmark | M12 corrected target |

| Fee reduction listed as a benefit | M10 price reduction proposal / M13 transfer ledger | Every lower payment is a resource saving | Internal transfers cannot be double-counted | M14 third major reversal overturns apparent victory |

| Grant application without award | M8 vendor financing distinction / M13 tariff revenues | A balanced proposed budget is already funded | Financing needs confirmed sources | M14/M15 no unconfirmed grant |

Plant implementation: M5 Meeting Table carries an ungraded water-use complaint card; M6 Budget Desk carries a photograph with empty freight slots labeled date and capacity unknown; M8 Supplier Shelves carries an ungraded grant application marked submitted, not awarded; M10 Freight Wall Map carries a water-review annotation and the proposed $40 lower-fee line; M13 Hearing Table displays the second-line banner and separates the $40 transfer column. These objects persist and do not expose future answer keys. The exact notes are “Water users request a cost review”, “Some slots look empty; usable capacity not checked”, “Grant request submitted; award not received”, “Lower fees claimed as a benefit”, and “Cost review pending”.

## 6.1 Physical prop continuity

All props below are small dressing at existing fixtures, not inventory items, new colliders or additional interaction gates. The named actor performs the action in the existing outcome beat. All triggers are the committed mission outcome after Stop 4 of that mission, except M15 which requires `bt_signed` after the final allocation. Present before/after in text as well as appearance. Save the final state once, keep it inspectable on return, and never duplicate the prop on replay. A failed current mission restores its before state; earlier committed mission props persist. Existing outdoor world events still occur. The fixture names identify registered homes in §3.1.

| Mission / prop ID | Home | Before | Action / after |
|---|---|---|---|
| 1 / `bt-prop-meal-trade-copy` | Kitchen Planning Table | Unsigned carbon-copy meal-for-repair slip under a clip. | Nico signs the agreed copy and clips it beside the kitchen plan. |
| 2 / `bt-prop-price-finding-pin` | Public Notice Board | Two loose cards labelled lunch orders and delivery costs. | Mara pins the separate findings into two labelled columns. |
| 3 / `bt-prop-room-rate-card` | Budget Desk | Old room-rate card face-up beside the occupancy record. | Mara turns over the old card and clips the tested lower offer on top. |
| 4 / `bt-prop-cook-shift-sheet` | Kitchen Planning Table | Shift sheet with three name slots occupied. | Nico clips the fourth cook’s accepted shift slip into the vacant slot. |
| 5 / `bt-prop-lease-tray-divider` | Lease Desk | Signed leases and unmatched applications separated by a loose card. | Leila fixes a labelled divider between the trays and carries neither pile away. |
| 6 / `bt-prop-fee-account-envelope` | Budget Desk | Open envelope labelled housing measure, with receipt copy beside it. | Mara encloses the confirmed receipt copy and seals it with the named purpose. |
| 7 / `bt-prop-supplier-lease-tab` | Supplier Shelves | Supplier lease copy folded beside sample bins. | Nico attaches a review-date tab while leaving this month’s shift slip on display. |
| 8 / `bt-prop-vendor-permit-copies` | Kitchen Planning Table | Blank permit sleeves beside the diner menu. | Nico clips the approved vendor permit copies beside his own menu. |
| 9 / `bt-prop-fourth-job-slip` | Job Board | Three filled vacancy hooks and one empty hook. | Leila hangs the fourth signed job slip under the posted wage clause. |
| 10 / `bt-prop-capacity-freight-tags` | Dispatch Desk | Usable-slot tags stacked beside the dispatch book. | Ruth lays unused-slot tags in a separate row labelled available, not booked. |
| 11 / `bt-prop-pact-cover-sheet` | Contract Table | Forecast packet marked guaranteed pact service. | Ruth removes the guarantee sleeve and clips a conditional forecast cover onto the same packet. |
| 12 / `bt-prop-water-cost-sleeve` | Catchment Map | Loose downstream-cost sheet beneath the map. | Owen clips the cost sheet to the stream segment and leaves the freight-benefit sheet beside it. |
| 13 / `bt-prop-filter-quote-seal` | Supplier Shelves | Two filter quote samples with loose compliance slips. | Nico staples the same-standard compliance slip to each quote and marks the cheaper qualifying one for review. |
| 14 / `bt-prop-line-ribbon` | Contract Table | New-line ribbon and two plan binders on the hearing tray. | Mara coils the withdrawn ribbon beside the rejected claim and sets the access retrofit binder on top. |
| 15 / `bt-prop-signed-agreement` | Meeting Table | Bound agreement with signature tabs, marked ready. | The parties sign their own tabs after the final gate and Mara binds the signed agreement. |

# 7. Mission answer, route and world-state ledger

| Mission | Route / actual unique count | Mission question | Actual answer | Visible consequence / next problem |

|---:|---|---|---|---|

| 1 | Business Workshop / 1 | whether the diner should trade packed meals for repairs | Trade two meal boxes for one repair hour | The diner posts a meal-for-repair agreement and reopens its lunch queue; The lunch queue grows despite the new agreement |

| 2 | Civic Advice Office / 1 | whether demand or supply explains the lunch price rise | Record higher demand as the cause of the lunch price rise | The notice board separates the lunch surge from the delivery cost dispute; A high posted price now leaves some rooms empty |

| 3 | Civic Advice Office / 1 | whether the tested rent increase raises room revenue | Reject the tested rent increase because room revenue falls | The owner restores the lower advertised rate and opens the vacant rooms; The diner still cannot turn all its new orders into meals |

| 4 | Business Workshop / 1 | whether another cook is worth hiring at the current wage | Hire the fourth cook but not the fifth at the stated wage | The diner posts one job and keeps the equipment upgrade on its list; The filled job draws a worker away from the bakery |

| 5 | Civic Advice Office → Housing and Work Office / 2 | whether the proposed rent ceiling alone houses every applicant | Reject the ceiling as a complete housing plan and retain a separate access measure | The hearing labels the rent cap as tenant relief rather than a promise of a home for all; The council asks how to fund the separate housing measure |

| 6 | Civic Advice Office → Business Workshop / 2 | whether the proposed market fee supplies enough revenue for the housing measure | Use the fee’s $120 revenue estimate and acknowledge its $40 efficiency cost | The council reserves the measured fee proceeds for the housing measure; One supplier says the new costs will force it to close |

| 7 | Business Workshop → Civic Advice Office / 2 | whether the supplier should operate during the current month | Keep the supplier operating this month while reviewing long-run exit | The supplier keeps its current shift and marks its lease for review; New firms are seeking permission to open nearby |

| 8 | Business Workshop → Housing and Work Office / 2 | whether the town should block new food sellers to protect current profits | Allow the proposed food sellers to enter and review service quality separately | New vendor permits appear beside the diner’s old menu; Workers ask whether new employers will change the wage offers |

| 9 | Housing and Work Office → Business Workshop / 2 | whether the proposed wage floor can raise both pay and employment in the stated model | Support the $30 wage floor under the stated monopsony model | The wage agreement adds a fourth job and posts the offer openly; The employer says freight charges now limit its output |

| 10 | Freight Contract Office → Civic Advice Office / 2 | whether the freight shortage is entirely a physical capacity problem | Record market power as part of the freight shortage | The town posts the unused terminal slots beside the proposed second-line offer; Two freight firms now propose competing access contracts |

| 11 | Freight Contract Office → Business Workshop → Civic Advice Office / 3 | whether the firms will keep their low-output pact without enforcement | Expect both firms to expand under the one-shot payoff table | The hearing removes the unenforced pact from its guaranteed service forecasts; Extra freight would also add traffic and pollution |

| 12 | Water and Land Office → Freight Contract Office → Civic Advice Office / 3 | whether the town should use the uncorrected freight quantity as its efficiency target | Use 30 freight units as the corrected efficiency target in the stated model | The water notice adds the downstream cost to the freight comparison; Imported filters could cut the harm, but a new border charge is proposed |

| 13 | Business Workshop → Water and Land Office → Civic Advice Office / 3 | whether the proposed filter tariff preserves the cheapest compliance option | Keep the untaxed filter option in the comparison and disclose the tariff’s transfers | The council retains the cheaper filter quote and publishes who would gain from the tariff; The second rail line now appears to meet every published condition |

| 14 | Freight Contract Office → Water and Land Office → Civic Advice Office / 3 | whether the second line remains the best plan after correcting the cost comparison | Reject the second line’s claimed dominance and retain the access retrofit | The new-line ribbon is taken down and the access retrofit stays on the hearing board; The council must now sign one fully funded and accountable plan |

| 15 | Housing and Work Office → Water and Land Office → Civic Advice Office / 3 | which complete agreement the council can sign under its published rules | Sign the access retrofit with funded housing support and the water-cost rule | The complete agreement is funded and prepared for the final resource check; The town reopens for free exploration with every signed commitment in the log |

## 7.1 Campaign-local format contract

| Format | stopKind | Move and shape | Key concealment / trap |

|---|---|---|---|

| CHOICE | decision/person | Four labels, one exact key, three own rebuttals | Shuffle labels; key and why hidden until grade |

| BALLPARK | calculation/room | Numeric tile bank; indexed correct list; slot-letter formula; positive target/tolerance and units | Log-scale-compatible positive result; reveal sign meaning in feedback |

| PROTOCOL | calculation/room | Four evidence cards, four unique response IDs, total permutation | Shuffle both columns independently; never preconnect lines |

| VERIFY | operated/fixture | Prediction range, representable numeric truth, tolerance, costed reading and phased commit | Blank opening; committed prediction required before trial and reading |

| DIAGNOSIS | calculation/room | Four zone readings with status, four mechanisms, exact key and own rebuttals | Quiet controls discriminate; neither order nor label length marks key |

| SEQUENCE | calculation/room | Four cards, causal axis and all-card order | Shuffle rail; reject skipped or repeated IDs |

| STRESS | decision/person | Overrun axis; score keys; numeric feasibility; robust named plan | Start without selection; inspect full range; new line fails before hard end |

# Mission 1 — THE MISSING BREAKFAST

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 1 OF 15

**Card title:** THE MISSING BREAKFAST

**Go now:** Go to Business Workshop and meet Nico Bell, diner owner, at the Cost Ledger Desk.

**Card body:** The diner has food but a broken work bench. Nico can cook or fix it, so one task must wait. Today you decide if a trade can keep lunch on time. By the end of the mission, you will choose a meal and repair deal.

**Objective:** Decide whether the diner should trade packed meals for repairs.

**Stakes — exact player copy:** You decide whether Nico should trade meals for repairs. A bad rate can cost one team more than doing the work itself.

### Worth knowing first — exact player copy

#### Glossary terms

Scarcity: Wants exceed the resources available to meet them.

Opportunity cost: The next-best alternative given up by a choice.

Capital: Produced tools and equipment used to make other goods.

Comparative advantage: The ability to produce a good at a lower opportunity cost.

Production possibilities curve: The maximum combinations of two goods that available resources can produce.

#### Primer concepts

- A scarce work shift can be used for one task only, so each choice gives up another task.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** OC = forgone output / gained output  
**What it is for:** Find what one additional unit costs in another good.  
**Symbols:** OC is opportunity cost; output is measured in the two stated goods.  
**Why this campaign needs it:** The diner needs a trade that both sides prefer.

**Required equation or concept use — authoring/render check:** Stop 1: 24/8 = 3 meal boxes per repair hour.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. A worker can make 9 bowls or 3 shelves; one shelf costs 9/3 = 3 bowls.

2. A team can make 8 hats or 16 scarves; one hat costs 16/8 = 2 scarves.

3. If a resource limit allows 10 cakes or 20 pies, the mix 3 cakes and 8 pies uses 3/10 + 8/20 = 0.7 of capacity and lies inside the straight boundary.

4. One studio gives up 4 prints per frame and another gives up 6; trading a frame for 5 prints benefits both because 4 < 5 < 6.

5. One extra service gives benefit 19 and costs 13; its net benefit is 19 − 13 = 6, so adding that service increases net benefit.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** All evidence remains in this room.

## B. Main story happening — designer summary

The first delivery has arrived, but the diner cannot serve every new customer. The four findings establish: What the shift gives up → Who has the better tradeoff → Try the exchange on the ledger → Keep the lunch service open. The diner posts a meal-for-repair agreement and reopens its lunch queue. The lunch queue grows despite the new agreement.

## C. Designer intent — not shown to player

The mission moves from scarcity, factors and production possibilities to a concrete recommendation: Trade two meal boxes for one repair hour. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M1-A — On arrival at Business Workshop

**Location:** Business Workshop.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Nico Bell, diner owner:** “The crew needs meals, and I need that bench repaired.”

**Unlocks:** Stop 1.

### Beat BT-M1-1 — After Stop 1

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The full shift gives up 24 meal boxes to gain 8 repair hours, so 24/8 = 3 meal boxes per repair hour.

**Unlocks:** Stop 2.

**Dialogue bubble — Nico Bell:** “Three meal boxes for a repair hour is what my own shift gives up. I had been pricing only the flour.”

**Dialogue bubble — Leila Moss, radio:** “Then count the lost meals before asking workers to repair your bench.”

### Beat BT-M1-2 — After Stop 2

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew. The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals. Both can make 8 repair hours per shift, so repair productivity is tied.

**Unlocks:** Stop 3.

**Dialogue bubble — Nico Bell:** “The repair crew gives up less to fix it. We can each keep doing the work we trade away least.”

### Beat BT-M1-3 — After Stop 3

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The contract charges 2 meal boxes per repair hour for 4 hours, giving 2 × 4 = 8 boxes; that is below the diner’s 12-box internal cost and above the crew’s 4-box internal cost.

**Unlocks:** Stop 4.

### Beat BT-M1-4 — After Stop 4

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Trade two meal boxes for one repair hour

**Unlocks:** Mission outcome.

### Beat BT-M1-E — At mission end

**Location:** Business Workshop.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** Nico marks two meal crates for the repair crew; the bench gains a completed-work tag.

**Panel/HUD text:** Nico marks two meal crates for the repair crew; the bench gains a completed-work tag. The lunch queue grows despite the new agreement.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Nico Bell:** “The repair crew has its signed copy. I can open lunch, but the queue is already longer than the one I planned for.”


## E. Location plan

**1 locations:** Business Workshop.

Stop 1: Business Workshop / Cost Ledger Desk | Stop 2: Business Workshop / Kitchen Planning Table | Stop 3: Business Workshop / Order Terminal | Stop 4: Business Workshop / Kitchen Planning Table. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Nico Bell, diner owner:** owns the original records in Business Workshop and must explain the recommendation to the people affected.

Nico marks two meal crates for the repair crew; the bench gains a completed-work tag. The lunch queue grows despite the new agreement.

## G. Key concepts, explained here

- **Scarcity:** Wants exceed the resources available to meet them.

- **Opportunity cost:** The next-best alternative given up by a choice.

- **Capital:** Produced tools and equipment used to make other goods.

- **Comparative advantage:** The ability to produce a good at a lower opportunity cost.

- **Production possibilities curve:** The maximum combinations of two goods that available resources can produce.

## H1. Stop 1 — What the shift gives up

**Format/placement:** BALLPARK, Business Workshop — Cost Ledger Desk.

**Metadata:** Concept: 1 — Scarcity, factors and production possibilities; Narrow concept: What the shift gives up; Keystone: Opportunity cost; Area: CM; Prerequisites: none; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** calculation; Use forgone meal boxes divided by repair hours to submit the opportunity cost of one repair hour in meal boxes.

**Briefing decision advanced:** whether the diner should trade packed meals for repairs.

**Actual mission answer — authoring only:** Trade two meal boxes for one repair hour.

**Call — exact player copy:** Go to the Cost Ledger Desk in Business Workshop.

**Stop reason — exact player copy:** The diner needs an internal repair cost before bargaining.

**Question card story setup — exact player copy:** Nico shows you the record: the diner has a full queue and a broken preparation bench, while the repair crew needs meals for its shift. Work out what the diner gives up by doing repairs itself before comparing the offered exchange.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** The cost of doing repairs internally sets the highest meal payment the diner should accept.

**Data/readings/options — exact player copy:** In one shift the diner team can pack 24 meal boxes or perform 8 repair hours; a straight production boundary and constant tradeoffs apply.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "What the shift gives up",
    "units": "meal boxes per repair hour",
    "labels": [
      "24",
      "8",
      "16",
      "3"
    ],
    "values": [
      24,
      8,
      16,
      3
    ],
    "slots": 2,
    "template": "{a} {b}",
    "formula": "a/b",
    "correct": [
      0,
      1
    ],
    "target": 3,
    "tolerance": 0.05,
    "correctResult": 3
  },
  "answerText": "The full shift gives up 24 meal boxes to gain 8 repair hours, so 24/8 = 3 meal boxes per repair hour.",
  "wrongFeedback": [
    "8/24 reverses the requested unit.",
    "24 treats the whole shift as one repair hour.",
    "Subtracting 8 from 24 mixes goods instead of finding a rate."
  ]
}
```

**Question card prompt — exact player copy:** Use forgone meal boxes divided by repair hours to submit the opportunity cost of one repair hour in meal boxes.

**Correct result:** 3; absolute tolerance 0.05 in the requested unit.

**Answer text:** The full shift gives up 24 meal boxes to gain 8 repair hours, so 24/8 = 3 meal boxes per repair hour.

**Why/mechanism:** The full shift gives up 24 meal boxes to gain 8 repair hours, so 24/8 = 3 meal boxes per repair hour. The cost of doing repairs internally sets the highest meal payment the diner should accept. Opportunity cost measures the next-best output forgone, so its unit must name meal boxes for each repair hour gained. 8/24 reverses the requested unit. 24 treats the whole shift as one repair hour.

**Misconception / wrong-path feedback:**

- 8/24 reverses the requested unit. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 24 treats the whole shift as one repair hour. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Subtracting 8 from 24 mixes goods instead of finding a rate. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Cost Ledger Desk stores this dated finding in text: The full shift gives up 24 meal boxes to gain 8 repair hours, so 24/8 = 3 meal boxes per repair hour.

**Unlock:** Stop 2.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** The lunch queue grows despite the new agreement.

**Consistency bundle:**
```json
{
  "source_values": "In one shift the diner team can pack 24 meal boxes or perform 8 repair hours; a straight production boundary and constant tradeoffs apply.",
  "derived_values": "The full shift gives up 24 meal boxes to gain 8 repair hours, so 24/8 = 3 meal boxes per repair hour.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 3,
  "tolerance": 0.05,
  "answer_text_values": "The full shift gives up 24 meal boxes to gain 8 repair hours, so 24/8 = 3 meal boxes per repair hour.",
  "wrong_feedback_values": [
    "8/24 reverses the requested unit.",
    "24 treats the whole shift as one repair hour.",
    "Subtracting 8 from 24 mixes goods instead of finding a rate."
  ],
  "later_story_references": "The lunch queue grows despite the new agreement"
}
```

## H2. Stop 2 — Who has the better tradeoff

**Format/placement:** PROTOCOL, Business Workshop — Kitchen Planning Table.

**Metadata:** Concept: 2 — Opportunity cost, comparative advantage and trade; Narrow concept: Who has the better tradeoff; Keystone: Opportunity cost; Area: CM; Prerequisites: 1; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the diner should trade packed meals for repairs.

**Actual mission answer — authoring only:** Trade two meal boxes for one repair hour.

**Call — exact player copy:** Go to the Kitchen Planning Table in Business Workshop.

**Stop reason — exact player copy:** The other team must gain too, or the exchange will fail.

**Question card story setup — exact player copy:** Nico shows you the record: the diner now knows its own repair cost, but a good trade also depends on the other team’s alternatives. Compare both production records before deciding which work each side should offer in the agreement.

**Prior result displayed in mission log:** The full shift gives up 24 meal boxes to gain 8 repair hours, so 24/8 = 3 meal boxes per repair hour.

**Question card story-science connection — exact player copy:** The two teams can gain from exchange even though neither is better at every task.

**Data/readings/options — exact player copy:** The diner can make 24 boxes or 8 repair hours per shift; the repair crew can make 8 boxes or 8 repair hours per shift.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "Diner: one box costs one-third repair hour; crew: one box costs one hour"
    },
    {
      "id": "e2",
      "label": "Diner: one repair hour costs three boxes; crew: one repair hour costs one box"
    },
    {
      "id": "e3",
      "label": "Equal shifts yield 24 meal boxes in one workplace and 8 in the other"
    },
    {
      "id": "e4",
      "label": "Equal shifts yield 8 repair hours in either workplace"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Allocate meal production to its lower-cost producer"
    },
    {
      "id": "r2",
      "label": "Allocate repairs to their lower-cost producer"
    },
    {
      "id": "r3",
      "label": "Only the meal output comparison establishes an absolute advantage"
    },
    {
      "id": "r4",
      "label": "The repair output comparison establishes no absolute advantage"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew. The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals. Both can make 8 repair hours per shift, so repair productivity is tied. The two teams can gain from exchange even though neither is better at every task.",
  "answerText": "One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew. The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals. Both can make 8 repair hours per shift, so repair productivity is tied.",
  "rebuttals": {
    "e1": "One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner.",
    "e2": "A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew.",
    "e3": "The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals.",
    "e4": "Both can make 8 repair hours per shift, so repair productivity is tied."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"Diner: one box costs one-third repair hour; crew: one box costs one hour": "Allocate meal production to its lower-cost producer", "Diner: one repair hour costs three boxes; crew: one repair hour costs one box": "Allocate repairs to their lower-cost producer", "Equal shifts yield 24 meal boxes in one workplace and 8 in the other": "Only the meal output comparison establishes an absolute advantage", "Equal shifts yield 8 repair hours in either workplace": "The repair output comparison establishes no absolute advantage"}; exact selection or mapping required.

**Answer text:** One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew. The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals. Both can make 8 repair hours per shift, so repair productivity is tied.

**Why/mechanism:** One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew. The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals. Both can make 8 repair hours per shift, so repair productivity is tied. The two teams can gain from exchange even though neither is better at every task.

**Misconception / wrong-path feedback:**

- One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Both can make 8 repair hours per shift, so repair productivity is tied. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Kitchen Planning Table stores this dated finding in text: One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew. The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals. Both can make 8 repair hours per shift, so repair productivity is tied.

**Unlock:** Stop 3.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** The lunch queue grows despite the new agreement.

**Consistency bundle:**
```json
{
  "source_values": "The diner can make 24 boxes or 8 repair hours per shift; the repair crew can make 8 boxes or 8 repair hours per shift.",
  "derived_values": "One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew. The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals. Both can make 8 repair hours per shift, so repair productivity is tied.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "Diner: one box costs one-third repair hour; crew: one box costs one hour": "Allocate meal production to its lower-cost producer",
    "Diner: one repair hour costs three boxes; crew: one repair hour costs one box": "Allocate repairs to their lower-cost producer",
    "Equal shifts yield 24 meal boxes in one workplace and 8 in the other": "Only the meal output comparison establishes an absolute advantage",
    "Equal shifts yield 8 repair hours in either workplace": "The repair output comparison establishes no absolute advantage"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew. The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals. Both can make 8 repair hours per shift, so repair productivity is tied.",
  "wrong_feedback_values": [
    "One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner.",
    "A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew.",
    "The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals.",
    "Both can make 8 repair hours per shift, so repair productivity is tied."
  ],
  "later_story_references": "The lunch queue grows despite the new agreement"
}
```

## H3. Stop 3 — Try the exchange on the ledger

**Format/placement:** VERIFY, Business Workshop — Order Terminal.

**Metadata:** Concept: 2 — Opportunity cost, comparative advantage and trade; Narrow concept: Try the exchange on the ledger; Keystone: Opportunity cost; Area: CM; Prerequisites: 1; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** operated; First, calculate and commit the meal boxes due using boxes = boxes per hour × hours. Then set the Order Terminal to the four-hour trial, measure the invoice total, and select whether it matches your prediction; no restoration or second reading is required.

**Briefing decision advanced:** whether the diner should trade packed meals for repairs.

**Actual mission answer — authoring only:** Trade two meal boxes for one repair hour.

**Call — exact player copy:** Go to the Order Terminal in Business Workshop.

**Stop reason — exact player copy:** Both teams need the trial payment checked before work starts.

**Question card story setup — exact player copy:** Nico shows you the record: the production records support specialization, and the teams have proposed a concrete exchange rate for a short trial. Check the invoice before anyone sends meals or starts the repairs that will reopen the lunch service.

**Prior result displayed in mission log:** One box costs the diner 1/3 hour and the repair crew 1 hour, so meals belong with the diner. A repair hour costs the crew 1 box and the diner 3 boxes, so repair belongs with the crew. The diner makes 24 boxes against 8 in the same shift, establishing absolute advantage in meals. Both can make 8 repair hours per shift, so repair productivity is tied.

**Question card story-science connection — exact player copy:** A trial invoice makes the promised exchange concrete before either team changes its work.

**Data/readings/options — exact player copy:** A proposed contract exchanges 2 meal boxes for each repair hour; request 4 repair hours, keep both production schedules fixed, and assume no transfer cost.

**Format-specific interaction block:**

```json
{
  "verify": {
    "quantity": "Try the exchange on the ledger",
    "units": "meal boxes",
    "predictionRange": {
      "min": 0,
      "max": 20,
      "step": 1
    },
    "truth": 8,
    "tolerance": 0.05,
    "measurement": {
      "label": "Run trial and read result",
      "cost": 1,
      "units": "trial credit"
    },
    "measurementBudget": 2,
    "conclusions": [
      "Prediction matches the trial",
      "Prediction does not match the trial"
    ],
    "correctConclusion": "Prediction matches the trial",
    "requiredSequence": [
      "calculate_commit",
      "operate",
      "measure",
      "interpret"
    ],
    "initialPrediction": null,
    "locks": {
      "operate": "prediction committed",
      "measure": "trial operated",
      "interpret": "reading collected"
    }
  },
  "answerText": "The contract charges 2 meal boxes per repair hour for 4 hours, giving 2 × 4 = 8 boxes; that is below the diner’s 12-box internal cost and above the crew’s 4-box internal cost.",
  "wrongFeedback": [
    "4 counts repair hours as meal boxes.",
    "12 is the diner’s internal cost, not the contract payment.",
    "16 doubles the payment twice."
  ]
}
```

**Question card prompt — exact player copy:** First, calculate and commit the meal boxes due using boxes = boxes per hour × hours. Then set the Order Terminal to the four-hour trial, measure the invoice total, and select whether it matches your prediction; no restoration or second reading is required.

**Correct result:** 8; absolute tolerance 0.05 in the requested unit.

**Answer text:** The contract charges 2 meal boxes per repair hour for 4 hours, giving 2 × 4 = 8 boxes; that is below the diner’s 12-box internal cost and above the crew’s 4-box internal cost.

**Why/mechanism:** The contract charges 2 meal boxes per repair hour for 4 hours, giving 2 × 4 = 8 boxes; that is below the diner’s 12-box internal cost and above the crew’s 4-box internal cost. A trial invoice makes the promised exchange concrete before either team changes its work. Comparative advantage makes the interval between the two internal costs the relevant test; an invoice inside that interval supports voluntary exchange. 4 counts repair hours as meal boxes.

**Misconception / wrong-path feedback:**

- 4 counts repair hours as meal boxes. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 12 is the diner’s internal cost, not the contract payment. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 16 doubles the payment twice. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Order Terminal stores this dated finding in text: The contract charges 2 meal boxes per repair hour for 4 hours, giving 2 × 4 = 8 boxes; that is below the diner’s 12-box internal cost and above the crew’s 4-box internal cost.

**Unlock:** Stop 4.

**Retrieval:** Use the prior mission log and concepts [1]; the prior-result line states the immediate dependency.

**Later payoff:** The lunch queue grows despite the new agreement.

**Consistency bundle:**
```json
{
  "source_values": "A proposed contract exchanges 2 meal boxes for each repair hour; request 4 repair hours, keep both production schedules fixed, and assume no transfer cost.",
  "derived_values": "The contract charges 2 meal boxes per repair hour for 4 hours, giving 2 × 4 = 8 boxes; that is below the diner’s 12-box internal cost and above the crew’s 4-box internal cost.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": 8,
  "correct_result": 8,
  "tolerance": 0.05,
  "answer_text_values": "The contract charges 2 meal boxes per repair hour for 4 hours, giving 2 × 4 = 8 boxes; that is below the diner’s 12-box internal cost and above the crew’s 4-box internal cost.",
  "wrong_feedback_values": [
    "4 counts repair hours as meal boxes.",
    "12 is the diner’s internal cost, not the contract payment.",
    "16 doubles the payment twice."
  ],
  "later_story_references": "The lunch queue grows despite the new agreement"
}
```

## H4. Stop 4 — Keep the lunch service open

**Format/placement:** CHOICE, Nico Bell at the Kitchen Planning Table in Business Workshop.

**Metadata:** Concept: 2 — Opportunity cost, comparative advantage and trade; Narrow concept: Keep the lunch service open; Keystone: Opportunity cost; Area: CM; Prerequisites: 1; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the diner should trade packed meals for repairs.

**Actual mission answer — authoring only:** Trade two boxes per repair hour, below the diner’s cost and above the crew’s cost.

**Call — exact player copy:** Go to Business Workshop and meet Nico Bell, diner owner, at the Kitchen Planning Table.

**Stop reason — exact player copy:** The diner must accept or reject the terms before lunch.

**Question card story setup — exact player copy:** Nico shows you the record: the invoice now agrees with the proposed rate, and both teams’ production alternatives remain visible in the log. Choose the agreement that improves both sides’ positions before the diner commits its next batch of meals.

**Prior result displayed in mission log:** The contract charges 2 meal boxes per repair hour for 4 hours, giving 2 × 4 = 8 boxes; that is below the diner’s 12-box internal cost and above the crew’s 4-box internal cost.

**Question card story-science connection — exact player copy:** The adviser can recommend the agreement without ordering either business to accept it.

**Data/readings/options — exact player copy:** The record contains opportunity costs of 3 boxes per repair hour for the diner and 1 for the crew; the trial invoice charges 8 boxes for 4 hours. Both teams can choose freely, and no other cost exists.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Trade two boxes per repair hour, below the diner’s cost and above the crew’s cost",
    "Trade at four boxes per hour, above both internal costs",
    "Reject any trade, since both teams have equal repair productivity",
    "Assign both teams to repairs, since the broken bench limits meals"
  ],
  "answer": "Trade two boxes per repair hour, below the diner’s cost and above the crew’s cost",
  "why": "At two boxes per hour, the diner gives up fewer boxes than its internal cost of three, while the crew receives more than its internal cost of one. Both gain on their own terms; tied absolute repair productivity does not erase different opportunity costs. The adviser can recommend the agreement without ordering either business to accept it. Four boxes exceeds the diner’s three-box internal cost. Comparative advantage depends on opportunity cost, not whether absolute productivity ties.",
  "rebuttals": {
    "Trade at four boxes per hour, above both internal costs": "Four boxes exceeds the diner’s three-box internal cost.",
    "Reject any trade, since both teams have equal repair productivity": "Comparative advantage depends on opportunity cost, not whether absolute productivity ties.",
    "Assign both teams to repairs, since the broken bench limits meals": "That discards the diner’s lower-cost meal production and leaves food unmade."
  },
  "answerText": "At two boxes per hour, the diner gives up fewer boxes than its internal cost of three, while the crew receives more than its internal cost of one. Both gain on their own terms; tied absolute repair productivity does not erase different opportunity costs."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Trade two boxes per repair hour, below the diner’s cost and above the crew’s cost"; exact selection or mapping required.

**Answer text:** At two boxes per hour, the diner gives up fewer boxes than its internal cost of three, while the crew receives more than its internal cost of one. Both gain on their own terms; tied absolute repair productivity does not erase different opportunity costs.

**Why/mechanism:** At two boxes per hour, the diner gives up fewer boxes than its internal cost of three, while the crew receives more than its internal cost of one. Both gain on their own terms; tied absolute repair productivity does not erase different opportunity costs. The adviser can recommend the agreement without ordering either business to accept it. Four boxes exceeds the diner’s three-box internal cost. Comparative advantage depends on opportunity cost, not whether absolute productivity ties.

**Misconception / wrong-path feedback:**

- Four boxes exceeds the diner’s three-box internal cost. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Comparative advantage depends on opportunity cost, not whether absolute productivity ties. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- That discards the diner’s lower-cost meal production and leaves food unmade. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Kitchen Planning Table stores this dated finding in text: At two boxes per hour, the diner gives up fewer boxes than its internal cost of three, while the crew receives more than its internal cost of one. Both gain on their own terms; tied absolute repair productivity does not erase different opportunity costs.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [1]; the prior-result line states the immediate dependency.

**Later payoff:** The lunch queue grows despite the new agreement.

**Consistency bundle:**
```json
{
  "source_values": "The record contains opportunity costs of 3 boxes per repair hour for the diner and 1 for the crew; the trial invoice charges 8 boxes for 4 hours. Both teams can choose freely, and no other cost exists.",
  "derived_values": "At two boxes per hour, the diner gives up fewer boxes than its internal cost of three, while the crew receives more than its internal cost of one. Both gain on their own terms; tied absolute repair productivity does not erase different opportunity costs.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Trade two boxes per repair hour, below the diner’s cost and above the crew’s cost",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "At two boxes per hour, the diner gives up fewer boxes than its internal cost of three, while the crew receives more than its internal cost of one. Both gain on their own terms; tied absolute repair productivity does not erase different opportunity costs.",
  "wrong_feedback_values": [
    "Four boxes exceeds the diner’s three-box internal cost.",
    "Comparative advantage depends on opportunity cost, not whether absolute productivity ties.",
    "That discards the diner’s lower-cost meal production and leaves food unmade."
  ],
  "later_story_references": "The lunch queue grows despite the new agreement"
}
```

## I. Mission outcome

**Delivery piece 1:** The meal trade. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Nico Bell:** “The crew needs meals, and I need that bench repaired.”

**Mission decision:** Trade two meal boxes for each hour of repairs. Both teams give up less than they would on their own. The bench is fixed and lunch can start. More people still join the queue.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 1 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 12:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The diner posts a meal-for-repair agreement and reopens its lunch queue.

**Automatic bar change:** Plan Evidence +3 | Service Continuity +2 | Field Budget -2 | Public Accountability +2

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [0, 0, 0, 4]; bars [83, 87, 83, 76]; bank 0, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** But Nico still has a growing lunch queue; repaired equipment has not settled why orders rose.

## K. Quick concept review

- A scarce work shift can be used for one task only, so each choice gives up another task.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The adviser can recommend the agreement without ordering either business to accept it.


## L. GO DEEPER — Trade and the next choice

**Secondary briefing — exact player copy:** Try a workshop, two makers and a small spending choice. The point is to compare what each action gives up, then decide whether the next gain is worth its cost. You do not need to recall the diner’s numbers.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- Opportunity cost is the best alternative forgone. On a straight production frontier, divide forgone output by gained output to find its constant tradeoff.
- Comparative advantage belongs to the lower opportunity cost, while absolute advantage compares output from equal resources. Trade can help both sides at a price between their opportunity costs.
- Marginal choice compares the benefit and cost of the next action. Utility is a model of satisfaction; marginal utility per dollar divides the next unit’s utility by its price.
- A production frontier describes what is attainable with current resources and skills. Idle equipment alone does not prove inefficiency if it cannot yet be used with those skills.

### BT-GD-M01-Q1

**Question:** A workshop can make 12 stools or 6 desks per day on a straight production frontier. What is the opportunity cost of one desk?

- **A.** 6 stools
- **B.** 12 stools
- **C.** 2 stools
- **D.** 0.5 stool

**Correct key:** C

**Hint:** Compare what is given up, or compare the next benefit with the next cost; total output and marginal choice are different.

**Worked explanation — reveal on request:** Six desks replace twelve stools, so each desk costs two stools.

**Feedback A:** Reconsider. Six is the maximum number of desks, not a marginal tradeoff.

**Feedback B:** Reconsider. Twelve is the whole day's stool output, not the cost of one desk.

**Feedback C:** Correct. Six desks replace twelve stools, so each desk costs two stools.

**Feedback D:** Reconsider. That is desks forgone per stool, the reverse ratio.


### BT-GD-M01-Q2

**Question:** Asha can make 8 lamps or 4 rugs daily; Ben can make 6 lamps or 6 rugs. Who has comparative advantage in rugs?

- **A.** Neither because Asha makes more lamps
- **B.** Ben
- **C.** Asha
- **D.** Both equally

**Correct key:** B

**Hint:** Compare what is given up, or compare the next benefit with the next cost; total output and marginal choice are different.

**Worked explanation — reveal on request:** Ben gives up one lamp per rug; Asha gives up two.

**Feedback A:** Reconsider. Absolute lamp output does not erase comparative advantage in rugs.

**Feedback B:** Correct. Ben gives up one lamp per rug; Asha gives up two.

**Feedback C:** Reconsider. Asha's rug opportunity cost is higher.

**Feedback D:** Reconsider. Their rug opportunity costs are one and two lamps, not equal.


### BT-GD-M01-Q3

**Question:** Asha gives up two lamps per rug; Ben gives up one. Which price for one rug permits both to gain from trade?

- **A.** 1.5 lamps
- **B.** 0.5 lamp
- **C.** 2.5 lamps
- **D.** 3 lamps

**Correct key:** A

**Hint:** Compare what is given up, or compare the next benefit with the next cost; total output and marginal choice are different.

**Worked explanation — reveal on request:** The price lies strictly between the two opportunity costs.

**Feedback A:** Correct. The price lies strictly between the two opportunity costs.

**Feedback B:** Reconsider. Ben would receive less than his one-lamp cost.

**Feedback C:** Reconsider. Asha could make a rug herself for two lamps.

**Feedback D:** Reconsider. This is above the buyer's two-lamp internal cost.


### BT-GD-M01-Q4

**Question:** A city uses all workers but leaves usable machines idle because workers have not learned to operate them. Relative to its currently attainable frontier with those workers' existing skills, what extra fact establishes productive inefficiency?

- **A.** The city wants more output
- **B.** Another city produces more
- **C.** Machines were costly to buy
- **D.** Existing workers can use them to raise one output without reducing any other output, with no extra resources or training

**Correct key:** D

**Hint:** Compare what is given up, or compare the next benefit with the next cost; total output and marginal choice are different.

**Worked explanation — reveal on request:** That feasible increase leaves all other outputs intact, establishing a point inside the current frontier.

**Feedback A:** Reconsider. Wants alone do not establish attainable extra output.

**Feedback B:** Reconsider. The cities may have different resources and skills.

**Feedback C:** Reconsider. Past cost does not establish what can be produced now.

**Feedback D:** Correct. That feasible increase leaves all other outputs intact, establishing a point inside the current frontier.


### BT-GD-M01-Q5

**Question:** The next hour of study is expected to add 7 points to a practice score; the hour after that adds 3. Each hour costs leisure valued at 5 points. With these values, how many extra hours should be chosen?

- **A.** Two
- **B.** Any number because total score rises
- **C.** One
- **D.** Zero

**Correct key:** C

**Hint:** Compare what is given up, or compare the next benefit with the next cost; total output and marginal choice are different.

**Worked explanation — reveal on request:** The first marginal benefit exceeds five; the second falls below five.

**Feedback A:** Reconsider. The second hour costs more than its marginal benefit.

**Feedback B:** Reconsider. A positive total gain does not make every extra hour worthwhile.

**Feedback C:** Correct. The first marginal benefit exceeds five; the second falls below five.

**Feedback D:** Reconsider. The first hour has a net benefit of two points.


### BT-GD-M01-Q6

**Question:** A snack gives 18 utility units for $3; a drink gives 16 for $4. Utility is a model of satisfaction. Which next purchase has greater marginal utility per dollar?

- **A.** The cheaper good always wins
- **B.** The snack
- **C.** The drink
- **D.** They are equal

**Correct key:** B

**Hint:** Compare what is given up, or compare the next benefit with the next cost; total output and marginal choice are different.

**Worked explanation — reveal on request:** The snack gives six units per dollar; the drink gives four.

**Feedback A:** Reconsider. Price alone is insufficient; this conclusion uses both utility and price.

**Feedback B:** Correct. The snack gives six units per dollar; the drink gives four.

**Feedback C:** Reconsider. Sixteen total units must be divided by four dollars.

**Feedback D:** Reconsider. Their per-dollar returns differ by two units.


# Mission 2 — THE QUEUE THAT GREW

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 2 OF 15

**Card title:** THE QUEUE THAT GREW

**Go now:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Budget Desk.

**Card body:** The meal trade works, but the lunch queue grows. More buyers or higher costs could push the price up. Today you decide which cause the town should post. By the end of the mission, you will test the lunch price claim.

**Objective:** Decide whether demand or supply explains the lunch price rise.

**Stakes — exact player copy:** You decide which cause belongs on the public board. A false claim can send Nico toward a fix that leaves the queue growing.

### Worth knowing first — exact player copy

#### Glossary terms

Demand: Quantities buyers are willing and able to buy at different prices.

Supply: Quantities sellers are willing and able to sell at different prices.

Equilibrium: A price at which quantity demanded equals quantity supplied.

Substitute: A good that can be used in place of another.

Complement: A good used together with another.

#### Primer concepts

**Required local preparation — read before Stop 5:** Read demand as how much people will buy at each price. Read supply as how much firms will sell. Compare the two amounts at the same price; the gap is not a change in the price itself.

- A price can rise because buyers want more or because sellers can offer less.

- Compare each proposed change with the stated alternative; record who gains and who pays.

- Marginal means the gain from the next unit, not the total already gained. A household with a fixed budget compares extra satisfaction per dollar.

- The next dollar on food gives six utility units; transport gives three. Moving a dollar from transport to food increases total utility by three units.

- At an interior best allocation, marginal utility per dollar is equal across goods. Units must be affordable and available; utility does not compare different people’s happiness.

#### Equations first needed today

**Equation:** Shortage = quantity demanded − quantity supplied  
**What it is for:** Count orders the diner cannot fill at the posted price.  
**Symbols:** Both quantities are lunches per day.  
**Required use:** Stop 5 computes 90 − 60 = 30 unfilled lunches per day.

**Required equation or concept use — authoring/render check:** Stop 5: 90−60 = 30 lunches per day.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. If Qd = 30 − P and Qs = 2P, set 30 − P = 2P; P = 10 and Q = 20.

2. At a price with Qd = 28 and Qs = 19, shortage = 28 − 19 = 9 units.

3. If tea becomes dearer and buyers switch to coffee, coffee demand shifts right; its own price did not cause that shift.

4. If fewer sellers operate, supply shifts left; with demand fixed, price rises and quantity falls.

5. If demand and supply both rise, quantity rises; price needs the relative shift sizes.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** All evidence remains in this room.

## B. Main story happening — designer summary

The meal exchange works, yet the lunch queue still stretches past the door. The four findings establish: Count the unmatched orders → Separate four market changes → Read the lunch record → Explain the rise in public. The notice board separates the lunch surge from the delivery cost dispute. A high posted price now leaves some rooms empty.

## C. Designer intent — not shown to player

The mission moves from demand, supply and equilibrium to a concrete recommendation: Record higher demand as the cause of the lunch price rise. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M2-A — On arrival at Civic Advice Office

**Location:** Civic Advice Office.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Mara Velez, state economic adviser:** “People see the price first; I need the order book too.”

**Unlocks:** Stop 5.

### Beat BT-M2-1 — After Stop 5

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** At the posted price, 90 − 60 = 30 lunches per day are wanted but not supplied.

**Unlocks:** Stop 6.

**Dialogue bubble — Mara Velez:** “The queue alone cannot tell us which curve moved. The order counts help.”

**Dialogue bubble — Nico Bell, radio:** “My costs did not rise with this crowd. That is worth saying before you blame the kitchen.”

### Beat BT-M2-2 — After Stop 6

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Additional buyers change demand at every price. The good’s own price changes quantity demanded along its curve. A dearer input raises production cost and shifts supply. A cheaper substitute draws buyers away from this lunch.

**Unlocks:** Stop 7.

**Dialogue bubble — Mara Velez:** “We can explain the lunch rise without pretending every price in town rose for the same reason.”

### Beat BT-M2-3 — After Stop 7

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Both price and traded quantity rose, and orders at the unchanged price increased while input cost stayed fixed. These readings support a rightward demand shift; a supply contraction alone predicts less output.

**Unlocks:** Stop 8.

### Beat BT-M2-4 — After Stop 8

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Record higher demand as the cause of the lunch price rise

**Unlocks:** Mission outcome.

### Beat BT-M2-E — At mission end

**Location:** Civic Advice Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The public board displays the old-price order count beside the new sales receipt.

**Panel/HUD text:** The public board displays the old-price order count beside the new sales receipt. A high posted price now leaves some rooms empty.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Mara Velez:** “The notice now explains this price rise. The vacant-room complaint needs its own test before we reuse that explanation.”


## E. Location plan

**1 locations:** Civic Advice Office.

Stop 5: Civic Advice Office / Budget Desk | Stop 6: Civic Advice Office / Town Map | Stop 7: Civic Advice Office / Budget Desk | Stop 8: Civic Advice Office / Town Map. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

The public board displays the old-price order count beside the new sales receipt. A high posted price now leaves some rooms empty.

## G. Key concepts, explained here

- **Demand:** Quantities buyers are willing and able to buy at different prices.

- **Supply:** Quantities sellers are willing and able to sell at different prices.

- **Equilibrium:** A price at which quantity demanded equals quantity supplied.

- **Substitute:** A good that can be used in place of another.

- **Complement:** A good used together with another.

## H1. Stop 5 — Count the unmatched orders

**Format/placement:** BALLPARK, Civic Advice Office — Budget Desk.

**Metadata:** Concept: 4 — Demand, supply and equilibrium; Narrow concept: Count the unmatched orders; Keystone: Price incentives, Equilibrium; Area: T; Prerequisites: 1; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** calculation; Submit the daily lunch shortage using quantity demanded minus quantity supplied.

**Briefing decision advanced:** whether demand or supply explains the lunch price rise.

**Actual mission answer — authoring only:** Record higher demand as the cause of the lunch price rise.

**Call — exact player copy:** Go to the Budget Desk in Civic Advice Office.

**Stop reason — exact player copy:** The council needs the size of the queue before choosing a response.

**Question card story setup — exact player copy:** Mara shows you the record: the repair agreement keeps lunch preparation running, yet customers still wait outside after the kitchen closes its order book. Count the unmet orders at the old price before deciding what information could explain the queue.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** An unmet quantity explains the queue without yet explaining what moved.

**Data/readings/options — exact player copy:** At the old $6 lunch price, customers request 90 lunches and the diner can supply 60 lunches each day.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Count the unmatched orders",
    "units": "lunches per day",
    "labels": [
      "90",
      "60",
      "30",
      "6"
    ],
    "values": [
      90,
      60,
      30,
      6
    ],
    "slots": 2,
    "template": "{a} {b}",
    "formula": "a-b",
    "correct": [
      0,
      1
    ],
    "target": 30,
    "tolerance": 0.05,
    "correctResult": 30
  },
  "answerText": "At the posted price, 90 − 60 = 30 lunches per day are wanted but not supplied.",
  "wrongFeedback": [
    "60 is supplied quantity, not shortage.",
    "150 adds plans on opposite sides.",
    "6 is a price, not a lunch count."
  ]
}
```

**Question card prompt — exact player copy:** Submit the daily lunch shortage using quantity demanded minus quantity supplied.

**Correct result:** 30; absolute tolerance 0.05 in the requested unit.

**Answer text:** At the posted price, 90 − 60 = 30 lunches per day are wanted but not supplied.

**Why/mechanism:** At the posted price, 90 − 60 = 30 lunches per day are wanted but not supplied. An unmet quantity explains the queue without yet explaining what moved. Equilibrium reasoning begins by comparing the two planned quantities at the same price; the shortage does not itself identify which demand or supply determinant changed. 60 is supplied quantity, not shortage. 150 adds plans on opposite sides. 6 is a price, not a lunch count.

**Misconception / wrong-path feedback:**

- 60 is supplied quantity, not shortage. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 150 adds plans on opposite sides. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 6 is a price, not a lunch count. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Budget Desk stores this dated finding in text: At the posted price, 90 − 60 = 30 lunches per day are wanted but not supplied.

**Unlock:** Stop 6.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** A high posted price now leaves some rooms empty.

**Consistency bundle:**
```json
{
  "source_values": "At the old $6 lunch price, customers request 90 lunches and the diner can supply 60 lunches each day.",
  "derived_values": "At the posted price, 90 − 60 = 30 lunches per day are wanted but not supplied.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 30,
  "tolerance": 0.05,
  "answer_text_values": "At the posted price, 90 − 60 = 30 lunches per day are wanted but not supplied.",
  "wrong_feedback_values": [
    "60 is supplied quantity, not shortage.",
    "150 adds plans on opposite sides.",
    "6 is a price, not a lunch count."
  ],
  "later_story_references": "A high posted price now leaves some rooms empty"
}
```

## H2. Stop 6 — Separate four market changes

**Format/placement:** PROTOCOL, Civic Advice Office — Town Map.

**Metadata:** Concept: 4 — Demand, supply and equilibrium; Narrow concept: Separate four market changes; Keystone: Price incentives, Equilibrium; Area: T; Prerequisites: 1; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether demand or supply explains the lunch price rise.

**Actual mission answer — authoring only:** Record higher demand as the cause of the lunch price rise.

**Call — exact player copy:** Go to the Town Map in Civic Advice Office.

**Stop reason — exact player copy:** A shortage is visible, but its cause is not yet established.

**Question card story setup — exact player copy:** Mara shows you the record: the old-price order count confirms a shortage, but that count alone does not explain why the queue grew. Separate the possible market changes before comparing the diner’s actual order, price and input-cost records.

**Prior result displayed in mission log:** At the posted price, 90 − 60 = 30 lunches per day are wanted but not supplied.

**Question card story-science connection — exact player copy:** Separate causes before blaming sellers for every price increase.

**Data/readings/options — exact player copy:** Each card describes an independent change while other determinants stay fixed.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "More residents seek the same lunch menu"
    },
    {
      "id": "e2",
      "label": "The lunch price itself rises"
    },
    {
      "id": "e3",
      "label": "Cooking fuel costs more"
    },
    {
      "id": "e4",
      "label": "The price of an alternative lunch falls"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Demand shifts right"
    },
    {
      "id": "r2",
      "label": "Quantity demanded falls along demand"
    },
    {
      "id": "r3",
      "label": "Supply shifts left"
    },
    {
      "id": "r4",
      "label": "Demand shifts left"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "Additional buyers change demand at every price. The good’s own price changes quantity demanded along its curve. A dearer input raises production cost and shifts supply. A cheaper substitute draws buyers away from this lunch. Separate causes before blaming sellers for every price increase. These classifications identify which curve changes before predicting an equilibrium; they do not infer the actual lunch cause until the unchanged-price orders and cost record are inspected.",
  "answerText": "Additional buyers change demand at every price. The good’s own price changes quantity demanded along its curve. A dearer input raises production cost and shifts supply. A cheaper substitute draws buyers away from this lunch.",
  "rebuttals": {
    "e1": "Additional buyers change demand at every price.",
    "e2": "The good’s own price changes quantity demanded along its curve.",
    "e3": "A dearer input raises production cost and shifts supply.",
    "e4": "A cheaper substitute draws buyers away from this lunch."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"More residents seek the same lunch menu": "Demand shifts right", "The lunch price itself rises": "Quantity demanded falls along demand", "Cooking fuel costs more": "Supply shifts left", "The price of an alternative lunch falls": "Demand shifts left"}; exact selection or mapping required.

**Answer text:** Additional buyers change demand at every price. The good’s own price changes quantity demanded along its curve. A dearer input raises production cost and shifts supply. A cheaper substitute draws buyers away from this lunch.

**Why/mechanism:** Additional buyers change demand at every price. The good’s own price changes quantity demanded along its curve. A dearer input raises production cost and shifts supply. A cheaper substitute draws buyers away from this lunch. Separate causes before blaming sellers for every price increase. These classifications identify which curve changes before predicting an equilibrium; they do not infer the actual lunch cause until the unchanged-price orders and cost record are inspected.

**Misconception / wrong-path feedback:**

- Additional buyers change demand at every price. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The good’s own price changes quantity demanded along its curve. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- A dearer input raises production cost and shifts supply. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- A cheaper substitute draws buyers away from this lunch. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: Additional buyers change demand at every price. The good’s own price changes quantity demanded along its curve. A dearer input raises production cost and shifts supply. A cheaper substitute draws buyers away from this lunch.

**Unlock:** Stop 7.

**Retrieval:** Use the prior mission log and concepts [1, 3]; the prior-result line states the immediate dependency.

**Later payoff:** A high posted price now leaves some rooms empty.

**Consistency bundle:**
```json
{
  "source_values": "Each card describes an independent change while other determinants stay fixed.",
  "derived_values": "Additional buyers change demand at every price. The good’s own price changes quantity demanded along its curve. A dearer input raises production cost and shifts supply. A cheaper substitute draws buyers away from this lunch.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "More residents seek the same lunch menu": "Demand shifts right",
    "The lunch price itself rises": "Quantity demanded falls along demand",
    "Cooking fuel costs more": "Supply shifts left",
    "The price of an alternative lunch falls": "Demand shifts left"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Additional buyers change demand at every price. The good’s own price changes quantity demanded along its curve. A dearer input raises production cost and shifts supply. A cheaper substitute draws buyers away from this lunch.",
  "wrong_feedback_values": [
    "Additional buyers change demand at every price.",
    "The good’s own price changes quantity demanded along its curve.",
    "A dearer input raises production cost and shifts supply.",
    "A cheaper substitute draws buyers away from this lunch."
  ],
  "later_story_references": "A high posted price now leaves some rooms empty"
}
```

## H3. Stop 7 — Read the lunch record

**Format/placement:** DIAGNOSIS, Civic Advice Office — Budget Desk.

**Metadata:** Concept: 4 — Demand, supply and equilibrium; Narrow concept: Read the lunch record; Keystone: Price incentives, Equilibrium; Area: T; Prerequisites: 1; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** calculation; Read every zone and select the one explanation consistent with all observations.

**Briefing decision advanced:** whether demand or supply explains the lunch price rise.

**Actual mission answer — authoring only:** Record higher demand as the cause of the lunch price rise.

**Call — exact player copy:** Go to the Budget Desk in Civic Advice Office.

**Stop reason — exact player copy:** The quiet cost record can rule out the wrong accusation.

**Question card story setup — exact player copy:** Mara shows you the record: the change cards distinguish a shift in buying from a rise in production costs, so the competing explanations now predict different patterns. Read the complete lunch record before attaching a cause to the higher price.

**Prior result displayed in mission log:** Additional buyers change demand at every price. The good’s own price changes quantity demanded along its curve. A dearer input raises production cost and shifts supply. A cheaper substitute draws buyers away from this lunch.

**Question card story-science connection — exact player copy:** The quiet cost reading rules out a tempting accusation.

**Data/readings/options — exact player copy:** Compare all readings; alarm, watch, and normal are text labels, not verdicts.

**Format-specific interaction block:**

```json
{
  "headline": "Read the lunch record",
  "readings": [
    {
      "zone": "Orders",
      "label": "Customers at unchanged menu price",
      "value": "90, formerly 60",
      "status": "alarm"
    },
    {
      "zone": "Kitchen",
      "label": "Input cost per lunch",
      "value": "$4, unchanged",
      "status": "normal"
    },
    {
      "zone": "Sales",
      "label": "Daily lunches sold",
      "value": "75, formerly 60",
      "status": "watch"
    },
    {
      "zone": "Price",
      "label": "Paid price",
      "value": "$8, formerly $6",
      "status": "watch"
    }
  ],
  "choices": [
    {
      "label": "Fewer buyers at each price",
      "mechanism": "Fewer buyers contradicts the 90 orders at the old price."
    },
    {
      "label": "More buyers at each price",
      "mechanism": "Both price and traded quantity rose, and orders at the unchanged price increased while input cost stayed fixed. These readings support a rightward demand shift; a supply contraction alone predicts less output."
    },
    {
      "label": "Higher cooking input costs",
      "mechanism": "Input cost is unchanged, contradicting the proposed cost shock."
    },
    {
      "label": "Fewer meals from each cook",
      "mechanism": "Lower productivity would constrain supply and reduce quantity, unlike the sales record."
    }
  ],
  "answer": "More buyers at each price",
  "rebuttals": {
    "Higher cooking input costs": "Input cost is unchanged, contradicting the proposed cost shock.",
    "Fewer meals from each cook": "Lower productivity would constrain supply and reduce quantity, unlike the sales record.",
    "Fewer buyers at each price": "Fewer buyers contradicts the 90 orders at the old price."
  },
  "answerText": "Both price and traded quantity rose, and orders at the unchanged price increased while input cost stayed fixed. These readings support a rightward demand shift; a supply contraction alone predicts less output."
}
```

**Question card prompt — exact player copy:** Read every zone and select the one explanation consistent with all observations.

**Correct result:** "More buyers at each price"; exact selection or mapping required.

**Answer text:** Both price and traded quantity rose, and orders at the unchanged price increased while input cost stayed fixed. These readings support a rightward demand shift; a supply contraction alone predicts less output.

**Why/mechanism:** Both price and traded quantity rose, and orders at the unchanged price increased while input cost stayed fixed. These readings support a rightward demand shift; a supply contraction alone predicts less output. The quiet cost reading rules out a tempting accusation. Input cost is unchanged, contradicting the proposed cost shock. Lower productivity would constrain supply and reduce quantity, unlike the sales record. Fewer buyers contradicts the 90 orders at the old price.

**Misconception / wrong-path feedback:**

- Input cost is unchanged, contradicting the proposed cost shock. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Lower productivity would constrain supply and reduce quantity, unlike the sales record. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Fewer buyers contradicts the 90 orders at the old price. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Budget Desk stores this dated finding in text: Both price and traded quantity rose, and orders at the unchanged price increased while input cost stayed fixed. These readings support a rightward demand shift; a supply contraction alone predicts less output.

**Unlock:** Stop 8.

**Retrieval:** Use the prior mission log and concepts [1, 3]; the prior-result line states the immediate dependency.

**Later payoff:** A high posted price now leaves some rooms empty.

**Consistency bundle:**
```json
{
  "source_values": "Compare all readings; alarm, watch, and normal are text labels, not verdicts.",
  "derived_values": "Both price and traded quantity rose, and orders at the unchanged price increased while input cost stayed fixed. These readings support a rightward demand shift; a supply contraction alone predicts less output.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "More buyers at each price",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Both price and traded quantity rose, and orders at the unchanged price increased while input cost stayed fixed. These readings support a rightward demand shift; a supply contraction alone predicts less output.",
  "wrong_feedback_values": [
    "Input cost is unchanged, contradicting the proposed cost shock.",
    "Lower productivity would constrain supply and reduce quantity, unlike the sales record.",
    "Fewer buyers contradicts the 90 orders at the old price."
  ],
  "later_story_references": "A high posted price now leaves some rooms empty"
}
```

## H4. Stop 8 — Explain the rise in public

**Format/placement:** CHOICE, Mara Velez at the Town Map in Civic Advice Office.

**Metadata:** Concept: 4 — Demand, supply and equilibrium; Narrow concept: Explain the rise in public; Keystone: Price incentives, Equilibrium; Area: T; Prerequisites: 1; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether demand or supply explains the lunch price rise.

**Actual mission answer — authoring only:** Record higher demand, since orders rose at the unchanged price.

**Call — exact player copy:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Town Map.

**Stop reason — exact player copy:** The council must post an explanation that matches both price and sales.

**Question card story setup — exact player copy:** Mara shows you the record: the lunch records now identify the pattern behind the price rise, including the unchanged cost of making each meal. Choose the public explanation that fits all those facts before the council responds to residents’ complaints.

**Prior result displayed in mission log:** Both price and traded quantity rose, and orders at the unchanged price increased while input cost stayed fixed. These readings support a rightward demand shift; a supply contraction alone predicts less output.

**Question card story-science connection — exact player copy:** A documented cause lets the town respond to capacity rather than blame without evidence.

**Data/readings/options — exact player copy:** Orders at $6 rose from 60 to 90; input cost stayed $4; the new outcome is $8 and 75 lunches per day. Only one curve shifted.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Record unchanged demand, since higher prices explain the rise in orders",
    "Record lower demand, since more residents divide a fixed food budget",
    "Record higher demand, since orders rose at the unchanged price",
    "Record lower supply, since higher prices must reflect higher input costs"
  ],
  "answer": "Record higher demand, since orders rose at the unchanged price",
  "why": "Higher orders at the same old price identify a demand shift, not movement along an unchanged curve. The price and sales increase agree with that diagnosis while the quiet cost record weakens a supply explanation. A documented cause lets the town respond to capacity rather than blame without evidence. A supply contraction predicts lower traded quantity with demand fixed. The old-price order comparison proves demand itself changed. The paid price rose rather than fell.",
  "rebuttals": {
    "Record lower supply, since higher prices must reflect higher input costs": "A supply contraction predicts lower traded quantity with demand fixed.",
    "Record unchanged demand, since higher prices explain the rise in orders": "The old-price order comparison proves demand itself changed.",
    "Record lower demand, since more residents divide a fixed food budget": "The paid price rose rather than fell."
  },
  "answerText": "Higher orders at the same old price identify a demand shift, not movement along an unchanged curve. The price and sales increase agree with that diagnosis while the quiet cost record weakens a supply explanation."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Record higher demand, since orders rose at the unchanged price"; exact selection or mapping required.

**Answer text:** Higher orders at the same old price identify a demand shift, not movement along an unchanged curve. The price and sales increase agree with that diagnosis while the quiet cost record weakens a supply explanation.

**Why/mechanism:** Higher orders at the same old price identify a demand shift, not movement along an unchanged curve. The price and sales increase agree with that diagnosis while the quiet cost record weakens a supply explanation. A documented cause lets the town respond to capacity rather than blame without evidence. A supply contraction predicts lower traded quantity with demand fixed. The old-price order comparison proves demand itself changed. The paid price rose rather than fell.

**Misconception / wrong-path feedback:**

- A supply contraction predicts lower traded quantity with demand fixed. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The old-price order comparison proves demand itself changed. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The paid price rose rather than fell. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: Higher orders at the same old price identify a demand shift, not movement along an unchanged curve. The price and sales increase agree with that diagnosis while the quiet cost record weakens a supply explanation.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [1, 3]; the prior-result line states the immediate dependency.

**Later payoff:** A high posted price now leaves some rooms empty.

**Consistency bundle:**
```json
{
  "source_values": "Orders at $6 rose from 60 to 90; input cost stayed $4; the new outcome is $8 and 75 lunches per day. Only one curve shifted.",
  "derived_values": "Higher orders at the same old price identify a demand shift, not movement along an unchanged curve. The price and sales increase agree with that diagnosis while the quiet cost record weakens a supply explanation.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Record higher demand, since orders rose at the unchanged price",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Higher orders at the same old price identify a demand shift, not movement along an unchanged curve. The price and sales increase agree with that diagnosis while the quiet cost record weakens a supply explanation.",
  "wrong_feedback_values": [
    "A supply contraction predicts lower traded quantity with demand fixed.",
    "The old-price order comparison proves demand itself changed.",
    "The paid price rose rather than fell."
  ],
  "later_story_references": "A high posted price now leaves some rooms empty"
}
```

## I. Mission outcome

**Delivery piece 2:** The lunch price finding. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Mara Velez:** “People see the price first; I need the order book too.”

**Mission decision:** More buyers caused the lunch price rise. Costs stayed fixed, but orders rose at the old price. The town posts the cause. The room desk now shows beds that no one will book.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 2 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 12:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The notice board separates the lunch surge from the delivery cost dispute.

**Automatic bar change:** Plan Evidence +2 | Service Continuity +1 | Field Budget -1 | Public Accountability +2

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [0, 0, 0, 4]; bars [85, 88, 82, 82]; bank 0, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** Yet Leila finds empty rooms after the rent rise; more arrivals have not guaranteed more bookings.

## K. Quick concept review

- A price can rise because buyers want more or because sellers can offer less.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** A documented cause lets the town respond to capacity rather than blame without evidence.


## L. GO DEEPER — Markets change for different reasons

**Secondary briefing — exact player copy:** Use a new set of shops to separate a change in price from a change in the conditions behind demand or supply. Keep each market’s own price distinct from prices of related goods.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- Equilibrium is where quantity demanded equals quantity supplied. A shortage at a stated price is demand minus supply when that difference is positive.
- An own-price change moves along a curve. Income, preferences or related-good prices can shift demand; technology and input costs can shift supply.
- Substitutes can replace one another in use. A rise in one substitute’s price can increase demand for the other.
- When demand and supply both increase, both push equilibrium quantity upward. Their price effects oppose, so the price result depends on their relative sizes.

### BT-GD-M02-Q1

**Question:** At a price of $8, buyers want 90 units and sellers offer 65. What is the shortage at this price?

- **A.** No shortage because 65 units are sold
- **B.** 25 units
- **C.** 155 units
- **D.** 65 units

**Correct key:** B

**Hint:** Separate an own-price movement from a changed determinant; when numbers are given, compare demand and supply at the same price.

**Worked explanation — reveal on request:** Quantity demanded exceeds quantity supplied by 90 minus 65.

**Feedback A:** Reconsider. Trades can occur while some demand remains unmet.

**Feedback B:** Correct. Quantity demanded exceeds quantity supplied by 90 minus 65.

**Feedback C:** Reconsider. Adding the two quantities does not measure unmet demand.

**Feedback D:** Reconsider. That is quantity supplied, not the gap.


### BT-GD-M02-Q2

**Question:** Demand is Qd=120−4P and supply is Qs=20+P. What is equilibrium price in dollars per unit?

- **A.** 20
- **B.** 25
- **C.** 40
- **D.** 100

**Correct key:** A

**Hint:** Separate an own-price movement from a changed determinant; when numbers are given, compare demand and supply at the same price.

**Worked explanation — reveal on request:** Setting the quantities equal gives 100=5P, so P=20.

**Feedback A:** Correct. Setting the quantities equal gives 100=5P, so P=20.

**Feedback B:** Reconsider. This does not make quantity demanded equal supply.

**Feedback C:** Reconsider. Forty is the equilibrium quantity, not the price.

**Feedback D:** Reconsider. One hundred is the intercept gap before division by five.


### BT-GD-M02-Q3

**Question:** The price of coffee rises. Tea is a substitute, and nothing else changes. What happens in the tea market?

- **A.** Tea supply shifts right
- **B.** Movement upward along tea demand only
- **C.** Tea demand shifts left
- **D.** Tea demand shifts right

**Correct key:** D

**Hint:** Separate an own-price movement from a changed determinant; when numbers are given, compare demand and supply at the same price.

**Worked explanation — reveal on request:** Some consumers switch from coffee to tea at each tea price.

**Feedback A:** Reconsider. A change in consumers' substitute price does not itself change tea production costs.

**Feedback B:** Reconsider. That movement requires a change in tea's own price with its demand curve fixed.

**Feedback C:** Reconsider. A dearer substitute makes tea more attractive, not less.

**Feedback D:** Correct. Some consumers switch from coffee to tea at each tea price.


### BT-GD-M02-Q4

**Question:** A new machine lowers the cost of making notebooks. With ordinary downward demand and upward supply, what is the predicted equilibrium change?

- **A.** Lower price and lower quantity
- **B.** No price change because the machine is not a buyer
- **C.** Lower price and higher quantity
- **D.** Higher price and higher quantity

**Correct key:** C

**Hint:** Separate an own-price movement from a changed determinant; when numbers are given, compare demand and supply at the same price.

**Worked explanation — reveal on request:** A rightward supply shift crosses fixed demand at a lower price and larger quantity.

**Feedback A:** Reconsider. That is the usual result of a leftward demand shift.

**Feedback B:** Reconsider. Supply changes affect equilibrium even without changing buyers' preferences.

**Feedback C:** Correct. A rightward supply shift crosses fixed demand at a lower price and larger quantity.

**Feedback D:** Reconsider. That is the usual result of a rightward demand shift.


### BT-GD-M02-Q5

**Question:** Both demand and supply shift right. Which result follows without knowing their sizes?

- **A.** Price and quantity both stay fixed
- **B.** Equilibrium quantity rises; price is ambiguous
- **C.** Both price and quantity must rise
- **D.** Quantity is ambiguous and price rises

**Correct key:** B

**Hint:** Separate an own-price movement from a changed determinant; when numbers are given, compare demand and supply at the same price.

**Worked explanation — reveal on request:** Both shifts raise quantity, but they push price in opposite directions.

**Feedback A:** Reconsider. Two shifts need not cancel, and their quantity effects reinforce.

**Feedback B:** Correct. Both shifts raise quantity, but they push price in opposite directions.

**Feedback C:** Reconsider. The supply shift pushes price down.

**Feedback D:** Reconsider. Both shifts push quantity up; the price effects conflict.


### BT-GD-M02-Q6

**Question:** A shop raises only its own price, with income, tastes and other prices fixed. What describes consumers buying less?

- **A.** Movement along the shop's demand curve
- **B.** A leftward shift of demand
- **C.** A rightward shift of supply
- **D.** An increase in demand

**Correct key:** A

**Hint:** Separate an own-price movement from a changed determinant; when numbers are given, compare demand and supply at the same price.

**Worked explanation — reveal on request:** An own-price change changes quantity demanded on a fixed demand curve.

**Feedback A:** Correct. An own-price change changes quantity demanded on a fixed demand curve.

**Feedback B:** Reconsider. A shift requires a changed non-own-price determinant.

**Feedback C:** Reconsider. This statement describes buyers' response, not a supply determinant.

**Feedback D:** Reconsider. Buying less after a price rise is not an increase in demand.


# Mission 3 — THE EMPTY ROOMS

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 3 OF 15

**Card title:** THE EMPTY ROOMS

**Go now:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Budget Desk.

**Card body:** The lunch price has a cause, but some rooms now stand empty. A rent rise can bring in less cash if too few guests stay. Today you decide if the room rate should stay high. By the end of the mission, you will check what the rise earned.

**Objective:** Decide whether the tested rent increase raises room revenue.

**Stakes — exact player copy:** You decide whether to reverse the tested rent rise. Empty rooms cost the owner sales and leave workers without bookings.

### Worth knowing first — exact player copy

#### Glossary terms

Price elasticity of demand: The percentage quantity response divided by the percentage price change.

Midpoint method: A percentage change measured relative to the average of the two values.

Total revenue: Price multiplied by units sold.

Income elasticity: The percentage quantity response to a percentage income change.

Cross-price elasticity: The percentage quantity response to another good’s percentage price change.

#### Primer concepts

- How much buying changes when price changes determines whether a higher price raises receipts.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** |PED| = |(Q2−Q1)/((Q1+Q2)/2)| / |(P2−P1)/((P1+P2)/2)|  
**What it is for:** Compare percentage quantity and price changes.  
**Symbols:** PED is price elasticity of demand; Q1,Q2 are old and new quantities; P1,P2 are old and new prices.  
**Why this campaign needs it:** The town must distinguish high prices from high receipts.

**Required equation or concept use — authoring/render check:** Stop 11: (4/8)/(10/45) = 2.25.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. Price rises from 4 to 6 while sales fall from 15 to 10; midpoint changes are 2/5 and −5/12.5, so absolute elasticity = 1.

2. At price 7 and 9 units, revenue is 7×9 = 63.

3. A 6% income rise with a 3% demand rise gives income elasticity 3/6 = 0.5, a normal good.

4. A 5% rise in one price with a 10% increase in another good’s demand gives cross-price elasticity 2, consistent with substitutes.

5. With inelastic demand, a price rise causes a proportionally smaller quantity fall, so revenue rises.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** All evidence remains in this room.

## B. Main story happening — designer summary

The lunch rise came from more buyers, but higher room prices have left beds empty. The four findings establish: Measure the lost receipts → Read response evidence → Check the midpoint claim → Reopen the vacant rooms. The owner restores the lower advertised rate and opens the vacant rooms. The diner still cannot turn all its new orders into meals.

## C. Designer intent — not shown to player

The mission moves from elasticity and total revenue to a concrete recommendation: Reject the tested rent increase because room revenue falls. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M3-A — On arrival at Civic Advice Office

**Location:** Civic Advice Office.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Mara Velez, state economic adviser:** “A room nobody takes earns nothing tonight.”

**Unlocks:** Stop 9.

### Beat BT-M3-1 — After Stop 9

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Old receipts are 40×10 = 400; new receipts are 50×6 = 300; revenue falls by 400−300 = $100 per night.

**Unlocks:** Stop 10.

**Dialogue bubble — Mara Velez:** “The higher room price brought in less money across the rooms that actually filled.”

**Dialogue bubble — Leila Moss, radio:** “And a vacant room beside a waiting family is a reason to ask how these offers reach people.”

### Beat BT-M3-2 — After Stop 10

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The absolute own-price ratio is 2, greater than one. The absolute own-price ratio is 0.5, below one. A negative income response identifies an inferior good, without judging quality. A negative cross-price response identifies complements.

**Unlocks:** Stop 11.

**Dialogue bubble — Mara Velez:** “This test supports changing this offer. It does not tell us every landlord faces the same response.”

### Beat BT-M3-3 — After Stop 11

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Quantity changes by −4/8 = −0.5; price changes by 10/45 = 2/9; absolute elasticity is 0.5 ÷ (2/9) = 2.25. A four-function calculator is supplied on the panel.

**Unlocks:** Stop 12.

### Beat BT-M3-4 — After Stop 12

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Reject the tested rent increase because room revenue falls

**Unlocks:** Mission outcome.

### Beat BT-M3-E — At mission end

**Location:** Civic Advice Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The guesthouse listing drops to the earlier rate and its vacant-room cards flip to available.

**Panel/HUD text:** The guesthouse listing drops to the earlier rate and its vacant-room cards flip to available. The diner still cannot turn all its new orders into meals.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Mara Velez:** “The lower offer is back on the card. That helps fill these rooms; it does not put another cook at the diner’s stove.”


## E. Location plan

**1 locations:** Civic Advice Office.

Stop 9: Civic Advice Office / Budget Desk | Stop 10: Civic Advice Office / Town Map | Stop 11: Civic Advice Office / Hearing Table | Stop 12: Civic Advice Office / Town Map. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

The guesthouse listing drops to the earlier rate and its vacant-room cards flip to available. The diner still cannot turn all its new orders into meals.

## G. Key concepts, explained here

- **Price elasticity of demand:** The percentage quantity response divided by the percentage price change.

- **Midpoint method:** A percentage change measured relative to the average of the two values.

- **Total revenue:** Price multiplied by units sold.

- **Income elasticity:** The percentage quantity response to a percentage income change.

- **Cross-price elasticity:** The percentage quantity response to another good’s percentage price change.

## H1. Stop 9 — Measure the lost receipts

**Format/placement:** BALLPARK, Civic Advice Office — Budget Desk.

**Metadata:** Concept: 5 — Elasticity and total revenue; Narrow concept: Measure the lost receipts; Keystone: Elasticity; Area: T; Prerequisites: 4; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** calculation; Submit the nightly revenue decrease as old revenue minus new revenue.

**Briefing decision advanced:** whether the tested rent increase raises room revenue.

**Actual mission answer — authoring only:** Reject the tested rent increase because room revenue falls.

**Call — exact player copy:** Go to the Budget Desk in Civic Advice Office.

**Stop reason — exact player copy:** Empty beds make the owner’s price claim testable today.

**Question card story setup — exact player copy:** Mara shows you the record: the lunch market grew because more buyers arrived, but the room owner’s higher advertised rate has left beds empty. Compare receipts before assuming that the town’s growing population makes every price rise profitable for every seller.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** The owner needs receipts rather than the price sign alone.

**Data/readings/options — exact player copy:** Ten rooms sold at $40 per night before the increase; six sell at $50 after it. Revenue equals price × rooms sold.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Measure the lost receipts",
    "units": "dollars per night",
    "labels": [
      "50",
      "6",
      "40",
      "10",
      "100"
    ],
    "values": [
      50,
      6,
      40,
      10,
      100
    ],
    "slots": 4,
    "template": "{a} {b} {c} {d}",
    "formula": "c*d-a*b",
    "correct": [
      0,
      1,
      2,
      3
    ],
    "target": 100,
    "tolerance": 0.05,
    "correctResult": 100
  },
  "answerText": "Old receipts are 40×10 = 400; new receipts are 50×6 = 300; revenue falls by 400−300 = $100 per night.",
  "wrongFeedback": [
    "−100 is the signed new-minus-old change, not the requested decrease magnitude.",
    "10 is only the nightly price increase.",
    "500 assumes all ten rooms still sell at the new price."
  ]
}
```

**Question card prompt — exact player copy:** Submit the nightly revenue decrease as old revenue minus new revenue.

**Correct result:** 100; absolute tolerance 0.05 in the requested unit.

**Answer text:** Old receipts are 40×10 = 400; new receipts are 50×6 = 300; revenue falls by 400−300 = $100 per night.

**Why/mechanism:** Old receipts are 40×10 = 400; new receipts are 50×6 = 300; revenue falls by 400−300 = $100 per night. The owner needs receipts rather than the price sign alone. Elasticity connects a price change to its quantity response, but the revenue comparison must multiply each price by the quantity actually sold at that price. −100 is the signed new-minus-old change, not the requested decrease magnitude. 10 is only the nightly price increase.

**Misconception / wrong-path feedback:**

- −100 is the signed new-minus-old change, not the requested decrease magnitude. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 10 is only the nightly price increase. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 500 assumes all ten rooms still sell at the new price. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Budget Desk stores this dated finding in text: Old receipts are 40×10 = 400; new receipts are 50×6 = 300; revenue falls by 400−300 = $100 per night.

**Unlock:** Stop 10.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** The diner still cannot turn all its new orders into meals.

**Consistency bundle:**
```json
{
  "source_values": "Ten rooms sold at $40 per night before the increase; six sell at $50 after it. Revenue equals price × rooms sold.",
  "derived_values": "Old receipts are 40×10 = 400; new receipts are 50×6 = 300; revenue falls by 400−300 = $100 per night.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 100,
  "tolerance": 0.05,
  "answer_text_values": "Old receipts are 40×10 = 400; new receipts are 50×6 = 300; revenue falls by 400−300 = $100 per night.",
  "wrong_feedback_values": [
    "−100 is the signed new-minus-old change, not the requested decrease magnitude.",
    "10 is only the nightly price increase.",
    "500 assumes all ten rooms still sell at the new price."
  ],
  "later_story_references": "The diner still cannot turn all its new orders into meals"
}
```

## H2. Stop 10 — Read response evidence

**Format/placement:** PROTOCOL, Civic Advice Office — Town Map.

**Metadata:** Concept: 5 — Elasticity and total revenue; Narrow concept: Read response evidence; Keystone: Elasticity; Area: T; Prerequisites: 4; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the tested rent increase raises room revenue.

**Actual mission answer — authoring only:** Reject the tested rent increase because room revenue falls.

**Call — exact player copy:** Go to the Town Map in Civic Advice Office.

**Stop reason — exact player copy:** The owner needs the right response measure for this experiment.

**Question card story setup — exact player copy:** Mara shows you the record: the room ledger shows a revenue loss after the higher rate, which makes the size of the buying response matter. Distinguish the response measures before using the room experiment to judge the owner’s price decision.

**Prior result displayed in mission log:** Old receipts are 40×10 = 400; new receipts are 50×6 = 300; revenue falls by 400−300 = $100 per night.

**Question card story-science connection — exact player copy:** Different response measures answer different business questions.

**Data/readings/options — exact player copy:** Each percentage comparison is measured with other conditions fixed.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "Quantity falls 20% after own price rises 10%"
    },
    {
      "id": "e2",
      "label": "Quantity falls 5% after own price rises 10%"
    },
    {
      "id": "e3",
      "label": "Demand falls 4% after income rises 8%"
    },
    {
      "id": "e4",
      "label": "Demand falls 6% after another price rises 3%"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Demand is elastic"
    },
    {
      "id": "r2",
      "label": "Demand is inelastic"
    },
    {
      "id": "r3",
      "label": "The good is inferior over this range"
    },
    {
      "id": "r4",
      "label": "The goods are complements over this range"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "The absolute own-price ratio is 2, greater than one. The absolute own-price ratio is 0.5, below one. A negative income response identifies an inferior good, without judging quality. A negative cross-price response identifies complements. Different response measures answer different business questions. The sign of an income or cross-price elasticity conveys a relationship between goods or income and demand; it must not be read as the absolute own-price responsiveness used for revenue.",
  "answerText": "The absolute own-price ratio is 2, greater than one. The absolute own-price ratio is 0.5, below one. A negative income response identifies an inferior good, without judging quality. A negative cross-price response identifies complements.",
  "rebuttals": {
    "e1": "The absolute own-price ratio is 2, greater than one.",
    "e2": "The absolute own-price ratio is 0.5, below one.",
    "e3": "A negative income response identifies an inferior good, without judging quality.",
    "e4": "A negative cross-price response identifies complements."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"Quantity falls 20% after own price rises 10%": "Demand is elastic", "Quantity falls 5% after own price rises 10%": "Demand is inelastic", "Demand falls 4% after income rises 8%": "The good is inferior over this range", "Demand falls 6% after another price rises 3%": "The goods are complements over this range"}; exact selection or mapping required.

**Answer text:** The absolute own-price ratio is 2, greater than one. The absolute own-price ratio is 0.5, below one. A negative income response identifies an inferior good, without judging quality. A negative cross-price response identifies complements.

**Why/mechanism:** The absolute own-price ratio is 2, greater than one. The absolute own-price ratio is 0.5, below one. A negative income response identifies an inferior good, without judging quality. A negative cross-price response identifies complements. Different response measures answer different business questions. The sign of an income or cross-price elasticity conveys a relationship between goods or income and demand; it must not be read as the absolute own-price responsiveness used for revenue.

**Misconception / wrong-path feedback:**

- The absolute own-price ratio is 2, greater than one. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The absolute own-price ratio is 0.5, below one. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- A negative income response identifies an inferior good, without judging quality. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- A negative cross-price response identifies complements. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: The absolute own-price ratio is 2, greater than one. The absolute own-price ratio is 0.5, below one. A negative income response identifies an inferior good, without judging quality. A negative cross-price response identifies complements.

**Unlock:** Stop 11.

**Retrieval:** Use the prior mission log and concepts [4]; the prior-result line states the immediate dependency.

**Later payoff:** The diner still cannot turn all its new orders into meals.

**Consistency bundle:**
```json
{
  "source_values": "Each percentage comparison is measured with other conditions fixed.",
  "derived_values": "The absolute own-price ratio is 2, greater than one. The absolute own-price ratio is 0.5, below one. A negative income response identifies an inferior good, without judging quality. A negative cross-price response identifies complements.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "Quantity falls 20% after own price rises 10%": "Demand is elastic",
    "Quantity falls 5% after own price rises 10%": "Demand is inelastic",
    "Demand falls 4% after income rises 8%": "The good is inferior over this range",
    "Demand falls 6% after another price rises 3%": "The goods are complements over this range"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The absolute own-price ratio is 2, greater than one. The absolute own-price ratio is 0.5, below one. A negative income response identifies an inferior good, without judging quality. A negative cross-price response identifies complements.",
  "wrong_feedback_values": [
    "The absolute own-price ratio is 2, greater than one.",
    "The absolute own-price ratio is 0.5, below one.",
    "A negative income response identifies an inferior good, without judging quality.",
    "A negative cross-price response identifies complements."
  ],
  "later_story_references": "The diner still cannot turn all its new orders into meals"
}
```

## H3. Stop 11 — Check the midpoint claim

**Format/placement:** VERIFY, Civic Advice Office — Hearing Table.

**Metadata:** Concept: 5 — Elasticity and total revenue; Narrow concept: Check the midpoint claim; Keystone: Elasticity; Area: T; Prerequisites: 4; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** operated; First, calculate and commit absolute midpoint price elasticity from the two prices and quantities. Then run the Hearing Table archive check, measure its computed ratio, and select whether your prediction matches; no restoration or second measurement is required.

**Briefing decision advanced:** whether the tested rent increase raises room revenue.

**Actual mission answer — authoring only:** Reject the tested rent increase because room revenue falls.

**Call — exact player copy:** Go to the Hearing Table in Civic Advice Office.

**Stop reason — exact player copy:** The archive check must use the same rooms and the same averaging rule.

**Question card story setup — exact player copy:** Mara shows you the record: the response cards separate own-price effects from changes in income and related goods, and the room record holds those other conditions fixed. Test the midpoint calculation before using demand responsiveness to explain the lost receipts.

**Prior result displayed in mission log:** The absolute own-price ratio is 2, greater than one. The absolute own-price ratio is 0.5, below one. A negative income response identifies an inferior good, without judging quality. A negative cross-price response identifies complements.

**Question card story-science connection — exact player copy:** The magnitude tests whether the revenue loss is consistent with the price response.

**Data/readings/options — exact player copy:** The same rooms sell 10 nights at $40 and 6 nights at $50; use midpoint percentage changes, holding season, room quality and advertising fixed.

**Format-specific interaction block:**

```json
{
  "verify": {
    "quantity": "Check the midpoint claim",
    "units": "elasticity ratio",
    "predictionRange": {
      "min": 0,
      "max": 5,
      "step": 0.01
    },
    "truth": 2.25,
    "tolerance": 0.05,
    "measurement": {
      "label": "Run trial and read result",
      "cost": 1,
      "units": "trial credit"
    },
    "measurementBudget": 2,
    "conclusions": [
      "Prediction matches the trial",
      "Prediction does not match the trial"
    ],
    "correctConclusion": "Prediction matches the trial",
    "requiredSequence": [
      "calculate_commit",
      "operate",
      "measure",
      "interpret"
    ],
    "initialPrediction": null,
    "locks": {
      "operate": "prediction committed",
      "measure": "trial operated",
      "interpret": "reading collected"
    }
  },
  "answerText": "Quantity changes by −4/8 = −0.5; price changes by 10/45 = 2/9; absolute elasticity is 0.5 ÷ (2/9) = 2.25. A four-function calculator is supplied on the panel.",
  "wrongFeedback": [
    "1.6 uses initial values rather than midpoint averages.",
    "0.4 reports a percentage quantity change without dividing by price response.",
    "0.44 reverses the elasticity ratio."
  ]
}
```

**Question card prompt — exact player copy:** First, calculate and commit absolute midpoint price elasticity from the two prices and quantities. Then run the Hearing Table archive check, measure its computed ratio, and select whether your prediction matches; no restoration or second measurement is required.

**Correct result:** 2.25; absolute tolerance 0.05 in the requested unit.

**Answer text:** Quantity changes by −4/8 = −0.5; price changes by 10/45 = 2/9; absolute elasticity is 0.5 ÷ (2/9) = 2.25. A four-function calculator is supplied on the panel.

**Why/mechanism:** Quantity changes by −4/8 = −0.5; price changes by 10/45 = 2/9; absolute elasticity is 0.5 ÷ (2/9) = 2.25. A four-function calculator is supplied on the panel. The magnitude tests whether the revenue loss is consistent with the price response. 1.6 uses initial values rather than midpoint averages. 0.4 reports a percentage quantity change without dividing by price response. 0.44 reverses the elasticity ratio.

**Misconception / wrong-path feedback:**

- 1.6 uses initial values rather than midpoint averages. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 0.4 reports a percentage quantity change without dividing by price response. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 0.44 reverses the elasticity ratio. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Hearing Table stores this dated finding in text: Quantity changes by −4/8 = −0.5; price changes by 10/45 = 2/9; absolute elasticity is 0.5 ÷ (2/9) = 2.25. A four-function calculator is supplied on the panel.

**Unlock:** Stop 12.

**Retrieval:** Use the prior mission log and concepts [4]; the prior-result line states the immediate dependency.

**Later payoff:** The diner still cannot turn all its new orders into meals.

**Consistency bundle:**
```json
{
  "source_values": "The same rooms sell 10 nights at $40 and 6 nights at $50; use midpoint percentage changes, holding season, room quality and advertising fixed.",
  "derived_values": "Quantity changes by −4/8 = −0.5; price changes by 10/45 = 2/9; absolute elasticity is 0.5 ÷ (2/9) = 2.25. A four-function calculator is supplied on the panel.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": 2.25,
  "correct_result": 2.25,
  "tolerance": 0.05,
  "answer_text_values": "Quantity changes by −4/8 = −0.5; price changes by 10/45 = 2/9; absolute elasticity is 0.5 ÷ (2/9) = 2.25. A four-function calculator is supplied on the panel.",
  "wrong_feedback_values": [
    "1.6 uses initial values rather than midpoint averages.",
    "0.4 reports a percentage quantity change without dividing by price response.",
    "0.44 reverses the elasticity ratio."
  ],
  "later_story_references": "The diner still cannot turn all its new orders into meals"
}
```

## H4. Stop 12 — Reopen the vacant rooms

**Format/placement:** CHOICE, Mara Velez at the Town Map in Civic Advice Office.

**Metadata:** Concept: 5 — Elasticity and total revenue; Narrow concept: Reopen the vacant rooms; Keystone: Elasticity; Area: T; Prerequisites: 4; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the tested rent increase raises room revenue.

**Actual mission answer — authoring only:** Reverse the tested rent rise, since lost bookings outweigh the higher payment per occupied room.

**Call — exact player copy:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Town Map.

**Stop reason — exact player copy:** Tonight’s listing must use a rate the evidence supports.

**Question card story setup — exact player copy:** Mara shows you the record: the archive check now agrees with an elastic response, and the lost bookings outweigh the extra payment on occupied rooms. Choose whether to keep the tested rate before tonight’s rooms are advertised at the desk.

**Prior result displayed in mission log:** Quantity changes by −4/8 = −0.5; price changes by 10/45 = 2/9; absolute elasticity is 0.5 ÷ (2/9) = 2.25. A four-function calculator is supplied on the panel.

**Question card story-science connection — exact player copy:** Vacant beds can reopen without pretending every landlord faces identical demand.

**Data/readings/options — exact player copy:** The same-quality rooms yielded $400 before and $300 after the rise; demand elasticity over that comparison is 2.25. No other demand determinant changed.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Retain the rent rise, since each occupied room pays more",
    "Retain the rent rise, since room demand is price inelastic",
    "Reverse the rent rise, since fewer bookings imply falling demand",
    "Reverse the tested rent rise, since lost bookings outweigh the higher payment per occupied room"
  ],
  "answer": "Reverse the tested rent rise, since lost bookings outweigh the higher payment per occupied room",
  "why": "The higher payment per occupied room is outweighed by fewer occupied rooms. The archive gives an elastic response and a $100 revenue loss, supporting reversal of this particular price experiment without asserting anything about legality. Vacant beds can reopen without pretending every landlord faces identical demand. Per-room receipts ignore the four lost bookings. The measured elasticity exceeds one, contradicting inelastic demand. Fewer bookings after the room’s own price rises can be movement along demand; no separate demand shift is shown.",
  "rebuttals": {
    "Retain the rent rise, since each occupied room pays more": "Per-room receipts ignore the four lost bookings.",
    "Retain the rent rise, since room demand is price inelastic": "The measured elasticity exceeds one, contradicting inelastic demand.",
    "Reverse the rent rise, since fewer bookings imply falling demand": "Fewer bookings after the room’s own price rises can be movement along demand; no separate demand shift is shown."
  },
  "answerText": "The higher payment per occupied room is outweighed by fewer occupied rooms. The archive gives an elastic response and a $100 revenue loss, supporting reversal of this particular price experiment without asserting anything about legality."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Reverse the tested rent rise, since lost bookings outweigh the higher payment per occupied room"; exact selection or mapping required.

**Answer text:** The higher payment per occupied room is outweighed by fewer occupied rooms. The archive gives an elastic response and a $100 revenue loss, supporting reversal of this particular price experiment without asserting anything about legality.

**Why/mechanism:** The higher payment per occupied room is outweighed by fewer occupied rooms. The archive gives an elastic response and a $100 revenue loss, supporting reversal of this particular price experiment without asserting anything about legality. Vacant beds can reopen without pretending every landlord faces identical demand. Per-room receipts ignore the four lost bookings. The measured elasticity exceeds one, contradicting inelastic demand. Fewer bookings after the room’s own price rises can be movement along demand; no separate demand shift is shown.

**Misconception / wrong-path feedback:**

- Per-room receipts ignore the four lost bookings. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The measured elasticity exceeds one, contradicting inelastic demand. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Fewer bookings after the room’s own price rises can be movement along demand; no separate demand shift is shown. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: The higher payment per occupied room is outweighed by fewer occupied rooms. The archive gives an elastic response and a $100 revenue loss, supporting reversal of this particular price experiment without asserting anything about legality.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [4]; the prior-result line states the immediate dependency.

**Later payoff:** The diner still cannot turn all its new orders into meals.

**Consistency bundle:**
```json
{
  "source_values": "The same-quality rooms yielded $400 before and $300 after the rise; demand elasticity over that comparison is 2.25. No other demand determinant changed.",
  "derived_values": "The higher payment per occupied room is outweighed by fewer occupied rooms. The archive gives an elastic response and a $100 revenue loss, supporting reversal of this particular price experiment without asserting anything about legality.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Reverse the tested rent rise, since lost bookings outweigh the higher payment per occupied room",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The higher payment per occupied room is outweighed by fewer occupied rooms. The archive gives an elastic response and a $100 revenue loss, supporting reversal of this particular price experiment without asserting anything about legality.",
  "wrong_feedback_values": [
    "Per-room receipts ignore the four lost bookings.",
    "The measured elasticity exceeds one, contradicting inelastic demand.",
    "Fewer bookings after the room’s own price rises can be movement along demand; no separate demand shift is shown."
  ],
  "later_story_references": "The diner still cannot turn all its new orders into meals"
}
```

## I. Mission outcome

**Delivery piece 3:** The room price test. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Mara Velez:** “A room nobody takes earns nothing tonight.”

**Mission decision:** Do not keep the tested rent rise. Receipts fell by $100 a night. The owner puts the old rate back on the board. The diner still needs more meals from the same oven.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 3 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 12:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The owner restores the lower advertised rate and opens the vacant rooms.

**Automatic bar change:** Plan Evidence +1 | Service Continuity +3 | Field Budget -1 | Public Accountability +2

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [0, 0, 4, 0]; bars [86, 91, 85, 84]; bank 0, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** Now Nico needs more meals from one stove, but another cook may cost more than the meals they add.

## K. Quick concept review

- How much buying changes when price changes determines whether a higher price raises receipts.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** Vacant beds can reopen without pretending every landlord faces identical demand.


## L. GO DEEPER — Response and revenue

**Secondary briefing — exact player copy:** A price change can sell fewer units and still bring in more money. Use new purchases and prices to test that claim, then distinguish income response from response to related prices.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- The midpoint percentage change divides the difference by the average of the old and new values. Absolute demand elasticity divides the absolute quantity percentage change by the price percentage change.
- Total revenue equals price times quantity. Locally, a price rise raises revenue with inelastic demand, lowers it with elastic demand and leaves it unchanged with unit elasticity.
- Income elasticity is quantity percentage change divided by income percentage change. A negative value identifies an inferior good over the observed range.
- Cross-price elasticity compares one good’s purchases with another good’s price. A negative value suggests complements; a positive value suggests substitutes.
- A longer adjustment period can let suppliers build or convert capacity. Supply elasticity can therefore differ between one week and several years.

### BT-GD-M03-Q1

**Question:** Price rises from $10 to $12 while quantity falls from 100 to 80. Using midpoint percentages, what is absolute demand elasticity to two decimals?

- **A.** 1.22
- **B.** 0.82
- **C.** 2.00
- **D.** 0.20

**Correct key:** A

**Hint:** Use percentage responses for elasticity and price times quantity for revenue; keep the direction of the change.

**Worked explanation — reveal on request:** The quantity change is 20/90; the price change is 2/11; their ratio is 11/9.

**Feedback A:** Correct. The quantity change is 20/90; the price change is 2/11; their ratio is 11/9.

**Feedback B:** Reconsider. That is approximately the inverse ratio.

**Feedback C:** Reconsider. Dividing the raw unit changes ignores percentage bases.

**Feedback D:** Reconsider. Twenty percent is one percentage change, not the elasticity ratio.


### BT-GD-M03-Q2

**Question:** A seller raises price from $5 to $6 and sales fall from 100 to 90. What happens to total revenue?

- **A.** It falls by $10
- **B.** It rises by $90
- **C.** It stays at $500
- **D.** It rises by $40

**Correct key:** D

**Hint:** Use percentage responses for elasticity and price times quantity for revenue; keep the direction of the change.

**Worked explanation — reveal on request:** Revenue changes from 500 to 540 dollars.

**Feedback A:** Reconsider. Ten is the unit-sales decline, not the revenue change.

**Feedback B:** Reconsider. The higher price applies to fewer units; compare both full products.

**Feedback C:** Reconsider. Quantity fell less proportionally than price rose.

**Feedback D:** Correct. Revenue changes from 500 to 540 dollars.


### BT-GD-M03-Q3

**Question:** A product has absolute demand elasticity 0.4 near the current point. A small price increase has what local revenue effect?

- **A.** Revenue is unchanged
- **B.** Revenue becomes profit
- **C.** Revenue rises
- **D.** Revenue falls

**Correct key:** C

**Hint:** Use percentage responses for elasticity and price times quantity for revenue; keep the direction of the change.

**Worked explanation — reveal on request:** With inelastic demand, the percentage quantity loss is smaller than the percentage price gain.

**Feedback A:** Reconsider. Unchanged revenue is the unit-elastic case.

**Feedback B:** Reconsider. Revenue excludes the firm's costs and is not profit.

**Feedback C:** Correct. With inelastic demand, the percentage quantity loss is smaller than the percentage price gain.

**Feedback D:** Reconsider. That local result applies to elastic demand.


### BT-GD-M03-Q4

**Question:** Income rises 10% and purchases of a product fall 5%, all else fixed. How is the product classified over this range?

- **A.** Perfectly inelastic good
- **B.** Inferior good
- **C.** Normal good
- **D.** Substitute

**Correct key:** B

**Hint:** Use percentage responses for elasticity and price times quantity for revenue; keep the direction of the change.

**Worked explanation — reveal on request:** Income elasticity is negative, −0.5, so demand falls as income rises.

**Feedback A:** Reconsider. Quantity has changed, so this observation does not show zero response.

**Feedback B:** Correct. Income elasticity is negative, −0.5, so demand falls as income rises.

**Feedback C:** Reconsider. A normal good has positive income elasticity.

**Feedback D:** Reconsider. Substitution is classified using another good's price, not income.


### BT-GD-M03-Q5

**Question:** The price of printers falls 8% and ink purchases rise 4%. What does the negative cross-price elasticity suggest?

- **A.** Printers and ink are complements
- **B.** They are substitutes
- **C.** Ink is inferior
- **D.** Ink supply is vertical

**Correct key:** A

**Hint:** Use percentage responses for elasticity and price times quantity for revenue; keep the direction of the change.

**Worked explanation — reveal on request:** The opposite-direction response gives −0.5, consistent with joint use.

**Feedback A:** Correct. The opposite-direction response gives −0.5, consistent with joint use.

**Feedback B:** Reconsider. Substitutes usually have a positive cross-price elasticity.

**Feedback C:** Reconsider. No income change is supplied.

**Feedback D:** Reconsider. The observation is a demand relation, not a supply slope.


### BT-GD-M03-Q6

**Question:** Why may housing supply respond more strongly to a sustained rent rise over five years than over one week?

- **A.** The supply curve must shift whenever rent rises
- **B.** Long-run demand must be perfectly elastic
- **C.** Demand must fall as construction takes longer
- **D.** Builders have time to add and convert housing

**Correct key:** D

**Hint:** Use percentage responses for elasticity and price times quantity for revenue; keep the direction of the change.

**Worked explanation — reveal on request:** Longer adjustment time can permit quantity responses unavailable immediately.

**Feedback A:** Reconsider. An own-price response can move along the supply curve without shifting it.

**Feedback B:** Reconsider. No such demand assumption follows.

**Feedback C:** Reconsider. A longer supply adjustment period does not itself require lower demand.

**Feedback D:** Correct. Longer adjustment time can permit quantity responses unavailable immediately.


# Mission 4 — TOO MANY HANDS

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 4 OF 15

**Card title:** TOO MANY HANDS

**Go now:** Go to Business Workshop and meet Nico Bell, diner owner, at the Cost Ledger Desk.

**Card body:** Rooms fill again, but Nico needs more meals from one stove. Each new cook may add less than the last. Today you decide if one more cook is worth the wage. By the end of the mission, you will choose which job to post.

**Objective:** Decide whether another cook is worth hiring at the current wage.

**Stakes — exact player copy:** You decide which cook Nico should hire. The wrong extra wage can use cash needed to keep the diner open.

### Worth knowing first — exact player copy

#### Glossary terms

Marginal product: Extra output from one more unit of an input.

Average product: Total output divided by input quantity.

Fixed input: An input that cannot change during the period studied.

Marginal revenue product: Extra revenue generated by one more unit of an input.

Marginal utility: Extra satisfaction from one more unit consumed.

#### Primer concepts

**Required local preparation — read before Stop 13:** Marginal means the change from one more unit. Subtract the old output from the new output. To judge a hire, compare the value of that extra output with the extra wage bill, not with all sales.

- More workers sharing fixed equipment eventually add less output per extra worker.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** MP = ΔTP/ΔL; MRP = MP×P for a price-taking output seller  
**What it is for:** Find extra output and extra receipts from one more worker.  
**Symbols:** MP is marginal product; TP is total product; L is labor; MRP is marginal revenue product; P is output price.  
**Why this campaign needs it:** The diner must compare added receipts with its wage offer.

**Required equation or concept use — authoring/render check:** Stop 13: (60−48)/1 = 12 lunches per worker; 12×5 = $60 per shift.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. Output rises from 21 to 30 when a fourth worker joins; marginal product is 9 and average product is 30/4 = 7.5.

2. If an extra worker makes 7 units sold at a fixed price of 3, extra receipts are 7×3 = 21.

3. A fixed oven limits extra workers; marginal output can fall while total output still rises.

4. If utility gained per dollar is 6 for pencils and 3 for erasers, shift spending toward pencils until the ratios meet or a constraint binds.

5. With output 12 and fixed cost 36, average fixed cost is 36/12 = 3.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** All evidence remains in this room.

## B. Main story happening — designer summary

Rooms are filling again, but the diner still cannot cook enough meals. The four findings establish: Find the next worker’s output → Separate the cost records → Test the fifth place at the stove → Approve the vacancy. The diner posts one job and keeps the equipment upgrade on its list. The filled job draws a worker away from the bakery.

## C. Designer intent — not shown to player

The mission moves from short-run production and marginal product to a concrete recommendation: Hire the fourth cook but not the fifth at the stated wage. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M4-A — On arrival at Business Workshop

**Location:** Business Workshop.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Nico Bell, diner owner:** “I can pay another cook if the oven can use another pair of hands.”

**Unlocks:** Stop 13.

### Beat BT-M4-1 — After Stop 13

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The fourth cook adds 60−48 = 12 lunches, each selling for $5, so extra receipts are 12×5 = $60 per shift.

**Unlocks:** Stop 14.

**Dialogue bubble — Nico Bell:** “Another pair of hands adds meals, but the gain gets smaller at this stove.”

**Dialogue bubble — Mara Velez, radio:** “Then a wage offer needs the next worker’s contribution, not the average of your whole crew.”

### Beat BT-M4-2 — After Stop 14

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** An unavoidable current lease is fixed and paid out explicitly. The extra wage changes with hiring and is an explicit payment. Forgone owner earnings are a real opportunity cost without a cash payment. Dividing the total by workers gives average rather than marginal product.

**Unlocks:** Stop 15.

**Dialogue bubble — Nico Bell:** “The fixed stove and the wage bill belong in different columns. Buying more hands does not buy more burners.”

### Beat BT-M4-3 — After Stop 15

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The fifth cook adds 8×5 = $40 revenue but costs $50, reducing profit by $10 per shift.

**Unlocks:** Stop 16.

### Beat BT-M4-4 — After Stop 16

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Hire the fourth cook but not the fifth at the stated wage

**Unlocks:** Mission outcome.

### Beat BT-M4-E — At mission end

**Location:** Business Workshop.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** One job card appears; a second is stamped HOLD FOR EQUIPMENT REVIEW.

**Panel/HUD text:** One job card appears; a second is stamped HOLD FOR EQUIPMENT REVIEW. The filled job draws a worker away from the bakery.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Nico Bell:** “The fourth cook has a place on the sheet. I will keep the stove upgrade on the list instead of blaming the next applicant.”

**Dialogue bubble — Rosa Kim, doorway:** “There is a fourth name on the shift sheet. We still share the same stove.”

## E. Location plan

**1 locations:** Business Workshop.

Stop 13: Business Workshop / Cost Ledger Desk | Stop 14: Business Workshop / Kitchen Planning Table | Stop 15: Business Workshop / Order Terminal | Stop 16: Business Workshop / Kitchen Planning Table. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Nico Bell, diner owner:** owns the original records in Business Workshop and must explain the recommendation to the people affected.

One job card appears; a second is stamped HOLD FOR EQUIPMENT REVIEW. The filled job draws a worker away from the bakery.

## G. Key concepts, explained here

- **Marginal product:** Extra output from one more unit of an input.

- **Average product:** Total output divided by input quantity.

- **Fixed input:** An input that cannot change during the period studied.

- **Marginal revenue product:** Extra revenue generated by one more unit of an input.

- **Marginal utility:** Extra satisfaction from one more unit consumed.

## H1. Stop 13 — Find the next worker’s output

**Format/placement:** BALLPARK, Business Workshop — Cost Ledger Desk.

**Metadata:** Concept: 6 — Short-run production and marginal product; Narrow concept: Find the next worker’s output; Keystone: Factor demand, Marginal analysis; Area: CM; Prerequisites: 1; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** calculation; Submit the fourth cook’s marginal revenue product as added lunches times price.

**Briefing decision advanced:** whether another cook is worth hiring at the current wage.

**Actual mission answer — authoring only:** Hire the fourth cook but not the fifth at the stated wage.

**Call — exact player copy:** Go to the Cost Ledger Desk in Business Workshop.

**Stop reason — exact player copy:** The vacancy must be costed before the owner posts it.

**Question card story setup — exact player copy:** Nico shows you the record: the room owner has reversed the failed price rise, but the diner cannot turn every new order into a meal. Measure the next cook’s contribution before offering a wage that the added sales cannot cover.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** Hiring depends on the contribution of the next worker, not average sales.

**Data/readings/options — exact player copy:** Three cooks produce 48 lunches; four produce 60; five produce 68. The oven is fixed and every extra lunch sells at a fixed $5 price.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Find the next worker’s output",
    "units": "dollars per shift",
    "labels": [
      "60",
      "48",
      "5",
      "12"
    ],
    "values": [
      60,
      48,
      5,
      12
    ],
    "slots": 3,
    "template": "{a} {b} {c}",
    "formula": "(a-b)*c",
    "correct": [
      0,
      1,
      2
    ],
    "target": 60,
    "tolerance": 0.05,
    "correctResult": 60
  },
  "answerText": "The fourth cook adds 60−48 = 12 lunches, each selling for $5, so extra receipts are 12×5 = $60 per shift.",
  "wrongFeedback": [
    "300 counts all output as the new worker’s contribution.",
    "12 is output rather than revenue.",
    "40 describes the fifth cook, not the fourth."
  ]
}
```

**Question card prompt — exact player copy:** Submit the fourth cook’s marginal revenue product as added lunches times price.

**Correct result:** 60; absolute tolerance 0.05 in the requested unit.

**Answer text:** The fourth cook adds 60−48 = 12 lunches, each selling for $5, so extra receipts are 12×5 = $60 per shift.

**Why/mechanism:** The fourth cook adds 60−48 = 12 lunches, each selling for $5, so extra receipts are 12×5 = $60 per shift. Hiring depends on the contribution of the next worker, not average sales. Marginal analysis uses the change from three cooks to four; including the whole kitchen output would assign existing workers’ production to the newcomer. 300 counts all output as the new worker’s contribution. 12 is output rather than revenue.

**Misconception / wrong-path feedback:**

- 300 counts all output as the new worker’s contribution. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 12 is output rather than revenue. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 40 describes the fifth cook, not the fourth. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Cost Ledger Desk stores this dated finding in text: The fourth cook adds 60−48 = 12 lunches, each selling for $5, so extra receipts are 12×5 = $60 per shift.

**Unlock:** Stop 14.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** The filled job draws a worker away from the bakery.

**Consistency bundle:**
```json
{
  "source_values": "Three cooks produce 48 lunches; four produce 60; five produce 68. The oven is fixed and every extra lunch sells at a fixed $5 price.",
  "derived_values": "The fourth cook adds 60−48 = 12 lunches, each selling for $5, so extra receipts are 12×5 = $60 per shift.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 60,
  "tolerance": 0.05,
  "answer_text_values": "The fourth cook adds 60−48 = 12 lunches, each selling for $5, so extra receipts are 12×5 = $60 per shift.",
  "wrong_feedback_values": [
    "300 counts all output as the new worker’s contribution.",
    "12 is output rather than revenue.",
    "40 describes the fifth cook, not the fourth."
  ],
  "later_story_references": "The filled job draws a worker away from the bakery"
}
```

## H2. Stop 14 — Separate the cost records

**Format/placement:** PROTOCOL, Business Workshop — Kitchen Planning Table.

**Metadata:** Concept: 7 — Cost measures and opportunity cost of ownership; Narrow concept: Separate the cost records; Keystone: Cost structure, Opportunity cost; Area: CM; Prerequisites: 1, 6; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether another cook is worth hiring at the current wage.

**Actual mission answer — authoring only:** Hire the fourth cook but not the fifth at the stated wage.

**Call — exact player copy:** Go to the Kitchen Planning Table in Business Workshop.

**Stop reason — exact player copy:** The wage decision must count the costs that actually change.

**Question card story setup — exact player copy:** Nico shows you the record: the fourth cook’s extra receipts are now known, while the lease and the owner’s unpaid work still appear on the ledger. Separate the cost types before comparing the hire with keeping the current staff.

**Prior result displayed in mission log:** The fourth cook adds 60−48 = 12 lunches, each selling for $5, so extra receipts are 12×5 = $60 per shift.

**Question card story-science connection — exact player copy:** The hiring recommendation must not confuse cash flow, total cost and marginal contribution.

**Data/readings/options — exact player copy:** The current $50 shift wage applies to each cook; the lease cannot change this month. The owner also works unpaid and could earn $30 elsewhere.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "The oven lease is owed even when shut"
    },
    {
      "id": "e2",
      "label": "The extra cook receives $50"
    },
    {
      "id": "e3",
      "label": "The owner forgoes a $30 outside job"
    },
    {
      "id": "e4",
      "label": "Total meals divided by cooks"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Fixed explicit cost"
    },
    {
      "id": "r2",
      "label": "Variable explicit cost"
    },
    {
      "id": "r3",
      "label": "Implicit opportunity cost"
    },
    {
      "id": "r4",
      "label": "Average product"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "An unavoidable current lease is fixed and paid out explicitly. The extra wage changes with hiring and is an explicit payment. Forgone owner earnings are a real opportunity cost without a cash payment. Dividing the total by workers gives average rather than marginal product. The hiring recommendation must not confuse cash flow, total cost and marginal contribution. The owner’s outside earnings matter for economic profit even though no invoice is paid; the immediate hiring comparison still isolates the wage and output changes caused by the additional cook.",
  "answerText": "An unavoidable current lease is fixed and paid out explicitly. The extra wage changes with hiring and is an explicit payment. Forgone owner earnings are a real opportunity cost without a cash payment. Dividing the total by workers gives average rather than marginal product.",
  "rebuttals": {
    "e1": "An unavoidable current lease is fixed and paid out explicitly.",
    "e2": "The extra wage changes with hiring and is an explicit payment.",
    "e3": "Forgone owner earnings are a real opportunity cost without a cash payment.",
    "e4": "Dividing the total by workers gives average rather than marginal product."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"The oven lease is owed even when shut": "Fixed explicit cost", "The extra cook receives $50": "Variable explicit cost", "The owner forgoes a $30 outside job": "Implicit opportunity cost", "Total meals divided by cooks": "Average product"}; exact selection or mapping required.

**Answer text:** An unavoidable current lease is fixed and paid out explicitly. The extra wage changes with hiring and is an explicit payment. Forgone owner earnings are a real opportunity cost without a cash payment. Dividing the total by workers gives average rather than marginal product.

**Why/mechanism:** An unavoidable current lease is fixed and paid out explicitly. The extra wage changes with hiring and is an explicit payment. Forgone owner earnings are a real opportunity cost without a cash payment. Dividing the total by workers gives average rather than marginal product. The hiring recommendation must not confuse cash flow, total cost and marginal contribution. The owner’s outside earnings matter for economic profit even though no invoice is paid; the immediate hiring comparison still isolates the wage and output changes caused by the additional cook.

**Misconception / wrong-path feedback:**

- An unavoidable current lease is fixed and paid out explicitly. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The extra wage changes with hiring and is an explicit payment. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Forgone owner earnings are a real opportunity cost without a cash payment. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Dividing the total by workers gives average rather than marginal product. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Kitchen Planning Table stores this dated finding in text: An unavoidable current lease is fixed and paid out explicitly. The extra wage changes with hiring and is an explicit payment. Forgone owner earnings are a real opportunity cost without a cash payment. Dividing the total by workers gives average rather than marginal product.

**Unlock:** Stop 15.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** The filled job draws a worker away from the bakery.

**Consistency bundle:**
```json
{
  "source_values": "The current $50 shift wage applies to each cook; the lease cannot change this month. The owner also works unpaid and could earn $30 elsewhere.",
  "derived_values": "An unavoidable current lease is fixed and paid out explicitly. The extra wage changes with hiring and is an explicit payment. Forgone owner earnings are a real opportunity cost without a cash payment. Dividing the total by workers gives average rather than marginal product.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "The oven lease is owed even when shut": "Fixed explicit cost",
    "The extra cook receives $50": "Variable explicit cost",
    "The owner forgoes a $30 outside job": "Implicit opportunity cost",
    "Total meals divided by cooks": "Average product"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "An unavoidable current lease is fixed and paid out explicitly. The extra wage changes with hiring and is an explicit payment. Forgone owner earnings are a real opportunity cost without a cash payment. Dividing the total by workers gives average rather than marginal product.",
  "wrong_feedback_values": [
    "An unavoidable current lease is fixed and paid out explicitly.",
    "The extra wage changes with hiring and is an explicit payment.",
    "Forgone owner earnings are a real opportunity cost without a cash payment.",
    "Dividing the total by workers gives average rather than marginal product."
  ],
  "later_story_references": "The filled job draws a worker away from the bakery"
}
```

## H3. Stop 15 — Test the fifth place at the stove

**Format/placement:** VERIFY, Business Workshop — Order Terminal.

**Metadata:** Concept: 14 — Factor demand and hiring; Narrow concept: Test the fifth place at the stove; Keystone: Factor demand, Marginal analysis; Area: CM; Prerequisites: 6; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Required stop kind / player verb:** operated; First, calculate and commit the fifth cook’s net addition to profit as added revenue minus wage. Then set the Order Terminal to five cooks, run one trial shift, measure the net change, and select whether it matches; restore the staffing simulation to four cooks after reading, with no second reading required.

**Briefing decision advanced:** whether another cook is worth hiring at the current wage.

**Actual mission answer — authoring only:** Hire the fourth cook but not the fifth at the stated wage.

**Call — exact player copy:** Go to the Order Terminal in Business Workshop.

**Stop reason — exact player copy:** The fifth place at the stove may cost more than it earns.

**Question card story setup — exact player copy:** Nico shows you the record: the cost records distinguish the extra wage from the existing lease, and the owner asks whether two hires would be even better. Test the fifth cook’s contribution before assuming that more meals always mean more profit.

**Prior result displayed in mission log:** An unavoidable current lease is fixed and paid out explicitly. The extra wage changes with hiring and is an explicit payment. Forgone owner earnings are a real opportunity cost without a cash payment. Dividing the total by workers gives average rather than marginal product.

**Question card story-science connection — exact player copy:** A smaller contribution can make the next hire unprofitable while total output still rises.

**Data/readings/options — exact player copy:** A fifth cook raises lunches from 60 to 68 at $5 each; wage is $50 per shift, and the oven and price stay fixed.

**Format-specific interaction block:**

```json
{
  "verify": {
    "quantity": "Test the fifth place at the stove",
    "units": "dollars per shift",
    "predictionRange": {
      "min": -50,
      "max": 50,
      "step": 1
    },
    "truth": -10,
    "tolerance": 0.05,
    "measurement": {
      "label": "Run trial and read result",
      "cost": 1,
      "units": "trial credit"
    },
    "measurementBudget": 2,
    "conclusions": [
      "Prediction matches the trial",
      "Prediction does not match the trial"
    ],
    "correctConclusion": "Prediction matches the trial",
    "requiredSequence": [
      "calculate_commit",
      "operate",
      "measure",
      "interpret"
    ],
    "initialPrediction": null,
    "locks": {
      "operate": "prediction committed",
      "measure": "trial operated",
      "interpret": "reading collected"
    }
  },
  "answerText": "The fifth cook adds 8×5 = $40 revenue but costs $50, reducing profit by $10 per shift.",
  "wrongFeedback": [
    "40 omits the wage.",
    "10 reverses revenue and wage.",
    "50 treats wage as extra output."
  ]
}
```

**Question card prompt — exact player copy:** First, calculate and commit the fifth cook’s net addition to profit as added revenue minus wage. Then set the Order Terminal to five cooks, run one trial shift, measure the net change, and select whether it matches; restore the staffing simulation to four cooks after reading, with no second reading required.

**Correct result:** -10; absolute tolerance 0.05 in the requested unit.

**Answer text:** The fifth cook adds 8×5 = $40 revenue but costs $50, reducing profit by $10 per shift.

**Why/mechanism:** The fifth cook adds 8×5 = $40 revenue but costs $50, reducing profit by $10 per shift. A smaller contribution can make the next hire unprofitable while total output still rises. Factor demand depends on the extra receipts produced by the additional worker; diminishing marginal product can make a further hire unprofitable despite higher total production. 40 omits the wage. 10 reverses revenue and wage. 50 treats wage as extra output.

**Misconception / wrong-path feedback:**

- 40 omits the wage. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 10 reverses revenue and wage. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 50 treats wage as extra output. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Order Terminal stores this dated finding in text: The fifth cook adds 8×5 = $40 revenue but costs $50, reducing profit by $10 per shift.

**Unlock:** Stop 16.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** The filled job draws a worker away from the bakery.

**Consistency bundle:**
```json
{
  "source_values": "A fifth cook raises lunches from 60 to 68 at $5 each; wage is $50 per shift, and the oven and price stay fixed.",
  "derived_values": "The fifth cook adds 8×5 = $40 revenue but costs $50, reducing profit by $10 per shift.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": -10,
  "correct_result": -10,
  "tolerance": 0.05,
  "answer_text_values": "The fifth cook adds 8×5 = $40 revenue but costs $50, reducing profit by $10 per shift.",
  "wrong_feedback_values": [
    "40 omits the wage.",
    "10 reverses revenue and wage.",
    "50 treats wage as extra output."
  ],
  "later_story_references": "The filled job draws a worker away from the bakery"
}
```

## H4. Stop 16 — Approve the vacancy

**Format/placement:** CHOICE, Nico Bell at the Kitchen Planning Table in Business Workshop.

**Metadata:** Concept: 14 — Factor demand and hiring; Narrow concept: Approve the vacancy; Keystone: Factor demand, Marginal analysis; Area: CM; Prerequisites: 6; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether another cook is worth hiring at the current wage.

**Actual mission answer — authoring only:** Hire the fourth cook only, since the fifth reduces profit.

**Call — exact player copy:** Go to Business Workshop and meet Nico Bell, diner owner, at the Kitchen Planning Table.

**Stop reason — exact player copy:** The job notice must reflect the marginal evidence.

**Question card story setup — exact player copy:** Nico shows you the record: the trial now separates a profitable extra hire from a further hire that would reduce earnings at the same wage. Choose the vacancy to post before the diner promises jobs its current oven cannot support.

**Prior result displayed in mission log:** The fifth cook adds 8×5 = $40 revenue but costs $50, reducing profit by $10 per shift.

**Question card story-science connection — exact player copy:** The diner fills one post while admitting that its offer may shift workers between local firms.

**Data/readings/options — exact player copy:** The fourth cook adds $60 receipts and the fifth adds $40; each costs $50. The firm can sell every added lunch at $5, and no other marginal costs change.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Hire the fourth cook only, since the fifth reduces profit",
    "Hire both extra cooks, since each adds to total lunch output",
    "Hire neither extra cook, since the fixed lease must be paid first",
    "Hire the fifth cook too, since average output remains above zero"
  ],
  "answer": "Hire the fourth cook only, since the fifth reduces profit",
  "why": "The fourth hire adds $10 to profit, while the fifth subtracts $10. The fixed lease does not change this marginal comparison, and positive total or average output cannot justify a hire whose added revenue is below added cost. The diner fills one post while admitting that its offer may shift workers between local firms. Rising output does not establish that revenue covers the next wage. The lease is unchanged across the available hiring choices.",
  "rebuttals": {
    "Hire both extra cooks, since each adds to total lunch output": "Rising output does not establish that revenue covers the next wage.",
    "Hire neither extra cook, since the fixed lease must be paid first": "The lease is unchanged across the available hiring choices.",
    "Hire the fifth cook too, since average output remains above zero": "Positive average output says nothing about the fifth worker’s marginal net gain."
  },
  "answerText": "The fourth hire adds $10 to profit, while the fifth subtracts $10. The fixed lease does not change this marginal comparison, and positive total or average output cannot justify a hire whose added revenue is below added cost."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Hire the fourth cook only, since the fifth reduces profit"; exact selection or mapping required.

**Answer text:** The fourth hire adds $10 to profit, while the fifth subtracts $10. The fixed lease does not change this marginal comparison, and positive total or average output cannot justify a hire whose added revenue is below added cost.

**Why/mechanism:** The fourth hire adds $10 to profit, while the fifth subtracts $10. The fixed lease does not change this marginal comparison, and positive total or average output cannot justify a hire whose added revenue is below added cost. The diner fills one post while admitting that its offer may shift workers between local firms. Rising output does not establish that revenue covers the next wage. The lease is unchanged across the available hiring choices.

**Misconception / wrong-path feedback:**

- Rising output does not establish that revenue covers the next wage. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The lease is unchanged across the available hiring choices. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Positive average output says nothing about the fifth worker’s marginal net gain. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Kitchen Planning Table stores this dated finding in text: The fourth hire adds $10 to profit, while the fifth subtracts $10. The fixed lease does not change this marginal comparison, and positive total or average output cannot justify a hire whose added revenue is below added cost.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [3, 6]; the prior-result line states the immediate dependency.

**Later payoff:** The filled job draws a worker away from the bakery.

**Consistency bundle:**
```json
{
  "source_values": "The fourth cook adds $60 receipts and the fifth adds $40; each costs $50. The firm can sell every added lunch at $5, and no other marginal costs change.",
  "derived_values": "The fourth hire adds $10 to profit, while the fifth subtracts $10. The fixed lease does not change this marginal comparison, and positive total or average output cannot justify a hire whose added revenue is below added cost.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Hire the fourth cook only, since the fifth reduces profit",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The fourth hire adds $10 to profit, while the fifth subtracts $10. The fixed lease does not change this marginal comparison, and positive total or average output cannot justify a hire whose added revenue is below added cost.",
  "wrong_feedback_values": [
    "Rising output does not establish that revenue covers the next wage.",
    "The lease is unchanged across the available hiring choices.",
    "Positive average output says nothing about the fifth worker’s marginal net gain."
  ],
  "later_story_references": "The filled job draws a worker away from the bakery"
}
```

## I. Mission outcome

**Delivery piece 4:** The cook hiring rule. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Nico Bell:** “I can pay another cook if the oven can use another pair of hands.”

**Mission decision:** Hire the fourth cook, but not the fifth. The fourth adds more sales than wage cost; the fifth does not. One job is posted. The bakery loses a worker to that offer.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 4 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 12:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The diner posts one job and keeps the equipment upgrade on its list.

**Automatic bar change:** Plan Evidence +2 | Service Continuity +2 | Field Budget -2 | Public Accountability +1

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [0, 0, 3, 1]; bars [88, 93, 86, 86]; bank 0, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** But Nico’s new cook still needs a home; Leila cannot turn a job offer into an available room.

## K. Quick concept review

- More workers sharing fixed equipment eventually add less output per extra worker.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The diner fills one post while admitting that its offer may shift workers between local firms.


## L. GO DEEPER — The next worker and the next unit

**Secondary briefing — exact player copy:** Work through small production records before making a hiring choice. Keep physical output separate from dollars and do not charge the next worker with costs that remain fixed either way.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- Marginal product is additional output from one more input. Average product divides total output by the number of inputs.
- For a price-taking product seller, marginal revenue product equals marginal product times output price. Compare that additional revenue with marginal hiring cost.
- A fixed cost remains the same as current output changes; variable costs change with output. The relevant time period must be stated.
- Marginal cost is the extra total cost per additional output unit. Positive but falling marginal product means total output rises more slowly, not that it falls.

### BT-GD-M04-Q1

**Question:** Output rises from 42 to 55 units when a fifth worker joins. What is that worker's marginal product?

- **A.** 11 units
- **B.** 55 units
- **C.** 42 units
- **D.** 13 units

**Correct key:** D

**Hint:** Use the change caused by one more input or output, and separate costs that vary from costs that remain due.

**Worked explanation — reveal on request:** Marginal product is the output change caused by the additional worker.

**Feedback A:** Reconsider. Eleven is average output per worker after hiring.

**Feedback B:** Reconsider. That is total output after hiring.

**Feedback C:** Reconsider. That is total output before hiring.

**Feedback D:** Correct. Marginal product is the output change caused by the additional worker.


### BT-GD-M04-Q2

**Question:** A price-taking firm sells each unit for $6. The next worker adds 9 units. What is the worker's marginal revenue product?

- **A.** $6
- **B.** $9
- **C.** $54
- **D.** $15

**Correct key:** C

**Hint:** Use the change caused by one more input or output, and separate costs that vary from costs that remain due.

**Worked explanation — reveal on request:** With a fixed product price, multiply marginal product nine by price six.

**Feedback A:** Reconsider. That is revenue from one product unit, not all nine extra units.

**Feedback B:** Reconsider. Nine measures physical output, not revenue.

**Feedback C:** Correct. With a fixed product price, multiply marginal product nine by price six.

**Feedback D:** Reconsider. Adding price and units mixes incompatible measures.


### BT-GD-M04-Q3

**Question:** A bakery pays $200 rent whether it opens or closes this week. Flour costs $2 per loaf baked. Which classification is correct for this week?

- **A.** Rent is variable; flour is fixed
- **B.** Rent is fixed; flour cost is variable
- **C.** Both costs are fixed
- **D.** Both costs are variable

**Correct key:** B

**Hint:** Use the change caused by one more input or output, and separate costs that vary from costs that remain due.

**Worked explanation — reveal on request:** Rent does not change with this week's output, while flour use does.

**Feedback A:** Reconsider. This reverses the supplied cost behavior.

**Feedback B:** Correct. Rent does not change with this week's output, while flour use does.

**Feedback C:** Reconsider. Flour expenditure rises with loaf output.

**Feedback D:** Reconsider. The stated rent remains due at zero output.


### BT-GD-M04-Q4

**Question:** At output 10, total cost is $90. At output 11, total cost is $97. What is the marginal cost of the eleventh unit?

- **A.** $7
- **B.** $8.82
- **C.** $90
- **D.** $97

**Correct key:** A

**Hint:** Use the change caused by one more input or output, and separate costs that vary from costs that remain due.

**Worked explanation — reveal on request:** Total cost rises seven dollars for one extra unit.

**Feedback A:** Correct. Total cost rises seven dollars for one extra unit.

**Feedback B:** Reconsider. That is approximately average total cost at eleven.

**Feedback C:** Reconsider. That is the earlier total cost.

**Feedback D:** Reconsider. That is total cost of all eleven units.


### BT-GD-M04-Q5

**Question:** More workers share a fixed oven. Extra workers add progressively fewer loaves but still add some. What happens to total output?

- **A.** It falls immediately
- **B.** It stays fixed
- **C.** It rises at an increasing rate
- **D.** It rises at a decreasing rate

**Correct key:** D

**Hint:** Use the change caused by one more input or output, and separate costs that vary from costs that remain due.

**Worked explanation — reveal on request:** Positive but falling marginal product means total output keeps rising more slowly.

**Feedback A:** Reconsider. Total output falls only when marginal product becomes negative.

**Feedback B:** Reconsider. Each worker still adds positive output.

**Feedback C:** Reconsider. That requires rising marginal product over this range.

**Feedback D:** Correct. Positive but falling marginal product means total output keeps rising more slowly.


### BT-GD-M04-Q6

**Question:** Marginal revenue product of the next three workers is $70, $50 and $30 per shift. Each costs $40; workers can be hired separately in that order. How many should be added?

- **A.** Three
- **B.** Zero
- **C.** Two
- **D.** One

**Correct key:** C

**Hint:** Use the change caused by one more input or output, and separate costs that vary from costs that remain due.

**Worked explanation — reveal on request:** The first two add revenue above cost; the third adds less than forty.

**Feedback A:** Reconsider. The third reduces the firm's net return by ten.

**Feedback B:** Reconsider. The first worker alone adds thirty dollars of net return.

**Feedback C:** Correct. The first two add revenue above cost; the third adds less than forty.

**Feedback D:** Reconsider. The second still adds ten dollars of net benefit.


# Mission 5 — THE RENT PROMISE

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 5 OF 15

**Card title:** THE RENT PROMISE

**Go now:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Budget Desk.

**Card body:** A cook took the new job, but still needs a home. A rent cap can help some tenants and leave others in a queue. Today you decide what the town can promise. By the end of the mission, you will check if the cap houses all who apply.

**Objective:** Decide whether the proposed rent ceiling alone houses every applicant.

**Stakes — exact player copy:** You decide whether the rent cap needs an access measure. Lower rent can help tenants while other applicants still lack homes.

### Worth knowing first — exact player copy

#### Glossary terms

Price ceiling: A legal maximum price.

Binding control: A price rule that prevents the market from reaching its otherwise available equilibrium.

Shortage: Quantity demanded exceeds quantity supplied at a stated price.

Distribution: How gains, costs or income are shared among people.

#### Primer concepts

- A legal maximum can lower the rent paid by some tenants while leaving other people unable to find homes.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** Shortage = Qd − Qs  
**What it is for:** Count unmet requests at a controlled price.  
**Symbols:** Qd is homes requested; Qs is homes offered.  
**Why this campaign needs it:** A lower price must not be confused with universal access.

**Required equation or concept use — authoring/render check:** Stop 17: 120−80 = 40 homes.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. At a ceiling of 9, buyers seek 42 units and sellers offer 30; the shortage is 12.

2. An equilibrium price of 14 with a ceiling of 18 leaves price unchanged because the ceiling is nonbinding.

3. A floor of 11 above equilibrium 8 produces excess supply if sellers offer 27 and buyers seek 17; the surplus is 10.

4. Four equal households share total income 80; each has 20 and the bottom half receives half the income.

5. If three identical applicants need two units, a fair lottery can distribute chances equally but cannot create the missing unit.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

The diner filled its job by drawing away a baker, and workers now ask for help with rent. The four findings establish: Count homes the cap cannot promise → Who gets the benefit → Why the advertised rooms are gone → Keep the promise honest. The hearing labels the rent cap as tenant relief rather than a promise of a home for all. The council asks how to fund the separate housing measure.

## C. Designer intent — not shown to player

The mission moves from price controls and allocation to a concrete recommendation: Reject the ceiling as a complete housing plan and retain a separate access measure. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M5-A — On arrival at Civic Advice Office

**Location:** Civic Advice Office.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Mara Velez, state economic adviser:** “A lower rent helps if you can get a key.”

**Unlocks:** Stop 17.

### Beat BT-M5-1 — After Stop 17

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The ceiling is below $700 and therefore binds; at $500, 120−80 = 40 households cannot obtain a unit in this model.

**Unlocks:** Stop 18.

**Dialogue bubble — Mara Velez:** “There are still applicants after the capped-price rooms are assigned.”

**Dialogue bubble — Leila Moss, radio:** “Keep the relief for those tenants in view. Just stop saying their leases settle everyone’s need.”

### Beat BT-M5-2 — After Stop 18

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** A tenant who retains occupancy gains from the lower payment. A shortage leaves some willing applicants without housing. The lower rent transfers income away from this landlord. Construction responds over time and depends on costs, rules and expected returns. Take this result to Housing and Work Office; its original records are needed for why the advertised rooms are gone.

**Unlocks:** Stop 19.

**Dialogue bubble — Leila Moss:** “I want both trays at the hearing: people helped by the cap and people it has not housed.”

### Beat BT-M5-3 — After Stop 19

**Location:** Housing and Work Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The ceiling is below the stated equilibrium, offers are below applications, and no destruction occurred. A shortage follows without any assumption that the policy immediately destroys homes; the separate long-run response remains conditional.

**Unlocks:** Stop 20.

**Dialogue bubble — Dev Shah, radio:** “My sister keeps her lower rent. My application is still in the other tray.”

### Beat BT-M5-4 — After Stop 20

**Location:** Housing and Work Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Reject the ceiling as a complete housing plan and retain a separate access measure

**Unlocks:** Mission outcome.

### Beat BT-M5-E — At mission end

**Location:** Housing and Work Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** One row of lease cards turns to reduced rent; forty application tokens remain marked waiting.

**Panel/HUD text:** One row of lease cards turns to reduced rent; forty application tokens remain marked waiting. The council asks how to fund the separate housing measure.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Leila Moss:** “I fixed the divider in place. We can defend tenant relief without hiding the people still waiting.”


## E. Location plan

**2 locations:** Civic Advice Office → Housing and Work Office.

Stop 17: Civic Advice Office / Budget Desk | Stop 18: Civic Advice Office / Town Map | Stop 19: Housing and Work Office / Lease Desk | Stop 20: Housing and Work Office / Job Board. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

**Leila Moss, housing cooperative organizer:** owns the original records in Housing and Work Office and must explain the recommendation to the people affected.

One row of lease cards turns to reduced rent; forty application tokens remain marked waiting. The council asks how to fund the separate housing measure.

## G. Key concepts, explained here

- **Price ceiling:** A legal maximum price.

- **Binding control:** A price rule that prevents the market from reaching its otherwise available equilibrium.

- **Shortage:** Quantity demanded exceeds quantity supplied at a stated price.

- **Distribution:** How gains, costs or income are shared among people.

## H1. Stop 17 — Count homes the cap cannot promise

**Format/placement:** BALLPARK, Civic Advice Office — Budget Desk.

**Metadata:** Concept: 8 — Price controls and allocation; Narrow concept: Count homes the cap cannot promise; Keystone: Equilibrium, Price incentives, Surplus; Area: T; Prerequisites: 4; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit the housing shortage at the proposed ceiling.

**Briefing decision advanced:** whether the proposed rent ceiling alone houses every applicant.

**Actual mission answer — authoring only:** Reject the ceiling as a complete housing plan and retain a separate access measure.

**Call — exact player copy:** Go to the Budget Desk in Civic Advice Office.

**Stop reason — exact player copy:** The hearing must distinguish a cheaper rent from an available home.

**Question card story setup — exact player copy:** Mara shows you the record: the diner’s new cook came from the bakery, and workers say their rent now limits which jobs they can accept. Count the homes the proposed cap leaves unmatched before calling it a complete housing solution.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** A cap can help successful tenants while leaving an allocation problem.

**Data/readings/options — exact player copy:** At the proposed $500 monthly ceiling, 120 households seek homes and 80 homes are offered; the otherwise available equilibrium is $700.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Count homes the cap cannot promise",
    "units": "homes",
    "labels": [
      "120",
      "80",
      "500",
      "700"
    ],
    "values": [
      120,
      80,
      500,
      700
    ],
    "slots": 2,
    "template": "{a} {b}",
    "formula": "a-b",
    "correct": [
      0,
      1
    ],
    "target": 40,
    "tolerance": 0.05,
    "correctResult": 40
  },
  "answerText": "The ceiling is below $700 and therefore binds; at $500, 120−80 = 40 households cannot obtain a unit in this model.",
  "wrongFeedback": [
    "120 ignores the available homes.",
    "200 adds both sides.",
    "40 dollars uses the wrong unit for a quantity gap."
  ]
}
```

**Question card prompt — exact player copy:** Submit the housing shortage at the proposed ceiling.

**Correct result:** 40; absolute tolerance 0.05 in the requested unit.

**Answer text:** The ceiling is below $700 and therefore binds; at $500, 120−80 = 40 households cannot obtain a unit in this model.

**Why/mechanism:** The ceiling is below $700 and therefore binds; at $500, 120−80 = 40 households cannot obtain a unit in this model. A cap can help successful tenants while leaving an allocation problem. Equilibrium reasoning distinguishes a binding price rule from its distributional effects: successful tenants pay less, while some applicants remain without a home. 120 ignores the available homes. 200 adds both sides. 40 dollars uses the wrong unit for a quantity gap.

**Misconception / wrong-path feedback:**

- 120 ignores the available homes. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 200 adds both sides. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 40 dollars uses the wrong unit for a quantity gap. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Budget Desk stores this dated finding in text: The ceiling is below $700 and therefore binds; at $500, 120−80 = 40 households cannot obtain a unit in this model.

**Unlock:** Stop 18.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** The council asks how to fund the separate housing measure.

**Consistency bundle:**
```json
{
  "source_values": "At the proposed $500 monthly ceiling, 120 households seek homes and 80 homes are offered; the otherwise available equilibrium is $700.",
  "derived_values": "The ceiling is below $700 and therefore binds; at $500, 120−80 = 40 households cannot obtain a unit in this model.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 40,
  "tolerance": 0.05,
  "answer_text_values": "The ceiling is below $700 and therefore binds; at $500, 120−80 = 40 households cannot obtain a unit in this model.",
  "wrong_feedback_values": [
    "120 ignores the available homes.",
    "200 adds both sides.",
    "40 dollars uses the wrong unit for a quantity gap."
  ],
  "later_story_references": "The council asks how to fund the separate housing measure"
}
```

## H2. Stop 18 — Who gets the benefit

**Format/placement:** PROTOCOL, Civic Advice Office — Town Map.

**Metadata:** Concept: 8 — Price controls and allocation; Narrow concept: Who gets the benefit; Keystone: Equilibrium, Price incentives, Surplus; Area: T; Prerequisites: 4; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the proposed rent ceiling alone houses every applicant.

**Actual mission answer — authoring only:** Reject the ceiling as a complete housing plan and retain a separate access measure.

**Call — exact player copy:** Go to the Town Map in Civic Advice Office.

**Stop reason — exact player copy:** Residents need to know which households the cap actually helps.

**Question card story setup — exact player copy:** Mara shows you the record: the cap leaves more applicants than offered homes, but that total does not say who receives its benefits. Follow the affected tenants, applicants and owners before deciding what the town can honestly promise in public.

**Prior result displayed in mission log:** The ceiling is below $700 and therefore binds; at $500, 120−80 = 40 households cannot obtain a unit in this model.

**Question card story-science connection — exact player copy:** The public record must distinguish incumbent tenants from applicants.

**Data/readings/options — exact player copy:** Under the cap, compare these four distinct households or owners; enforcement is effective, and offered housing is as recorded.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "An existing tenant keeps the same home and pays less"
    },
    {
      "id": "e2",
      "label": "An applicant cannot obtain one of the offered homes"
    },
    {
      "id": "e3",
      "label": "A landlord still rents the same home for less"
    },
    {
      "id": "e4",
      "label": "A builder can change next year’s construction quantity"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Receives a rent transfer benefit"
    },
    {
      "id": "r2",
      "label": "Remains excluded despite the lower posted rent"
    },
    {
      "id": "r3",
      "label": "Receives less rent on that unit"
    },
    {
      "id": "r4",
      "label": "May alter long-run supply in response to returns"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "A tenant who retains occupancy gains from the lower payment. A shortage leaves some willing applicants without housing. The lower rent transfers income away from this landlord. Construction responds over time and depends on costs, rules and expected returns. The public record must distinguish incumbent tenants from applicants. These outcomes can coexist under one rule, so reporting a benefit to an incumbent tenant cannot certify access for an applicant; the construction prediction also requires a longer adjustment horizon.",
  "answerText": "A tenant who retains occupancy gains from the lower payment. A shortage leaves some willing applicants without housing. The lower rent transfers income away from this landlord. Construction responds over time and depends on costs, rules and expected returns.",
  "rebuttals": {
    "e1": "A tenant who retains occupancy gains from the lower payment.",
    "e2": "A shortage leaves some willing applicants without housing.",
    "e3": "The lower rent transfers income away from this landlord.",
    "e4": "Construction responds over time and depends on costs, rules and expected returns."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"An existing tenant keeps the same home and pays less": "Receives a rent transfer benefit", "An applicant cannot obtain one of the offered homes": "Remains excluded despite the lower posted rent", "A landlord still rents the same home for less": "Receives less rent on that unit", "A builder can change next year’s construction quantity": "May alter long-run supply in response to returns"}; exact selection or mapping required.

**Answer text:** A tenant who retains occupancy gains from the lower payment. A shortage leaves some willing applicants without housing. The lower rent transfers income away from this landlord. Construction responds over time and depends on costs, rules and expected returns.

**Why/mechanism:** A tenant who retains occupancy gains from the lower payment. A shortage leaves some willing applicants without housing. The lower rent transfers income away from this landlord. Construction responds over time and depends on costs, rules and expected returns. The public record must distinguish incumbent tenants from applicants. These outcomes can coexist under one rule, so reporting a benefit to an incumbent tenant cannot certify access for an applicant; the construction prediction also requires a longer adjustment horizon.

**Misconception / wrong-path feedback:**

- A tenant who retains occupancy gains from the lower payment. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- A shortage leaves some willing applicants without housing. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The lower rent transfers income away from this landlord. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Construction responds over time and depends on costs, rules and expected returns. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: A tenant who retains occupancy gains from the lower payment. A shortage leaves some willing applicants without housing. The lower rent transfers income away from this landlord. Construction responds over time and depends on costs, rules and expected returns.

**Unlock:** Stop 19.

**Retrieval:** Use the prior mission log and concepts [4]; the prior-result line states the immediate dependency.

**Later payoff:** The council asks how to fund the separate housing measure.

**Consistency bundle:**
```json
{
  "source_values": "Under the cap, compare these four distinct households or owners; enforcement is effective, and offered housing is as recorded.",
  "derived_values": "A tenant who retains occupancy gains from the lower payment. A shortage leaves some willing applicants without housing. The lower rent transfers income away from this landlord. Construction responds over time and depends on costs, rules and expected returns.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "An existing tenant keeps the same home and pays less": "Receives a rent transfer benefit",
    "An applicant cannot obtain one of the offered homes": "Remains excluded despite the lower posted rent",
    "A landlord still rents the same home for less": "Receives less rent on that unit",
    "A builder can change next year’s construction quantity": "May alter long-run supply in response to returns"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "A tenant who retains occupancy gains from the lower payment. A shortage leaves some willing applicants without housing. The lower rent transfers income away from this landlord. Construction responds over time and depends on costs, rules and expected returns.",
  "wrong_feedback_values": [
    "A tenant who retains occupancy gains from the lower payment.",
    "A shortage leaves some willing applicants without housing.",
    "The lower rent transfers income away from this landlord.",
    "Construction responds over time and depends on costs, rules and expected returns."
  ],
  "later_story_references": "The council asks how to fund the separate housing measure"
}
```

## H3. Stop 19 — Why the advertised rooms are gone

**Format/placement:** DIAGNOSIS, Housing and Work Office — Lease Desk.

**Metadata:** Concept: 8 — Price controls and allocation; Narrow concept: Why the advertised rooms are gone; Keystone: Equilibrium, Price incentives, Surplus; Area: P; Prerequisites: 4; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Read every zone and select the one explanation consistent with all observations.

**Briefing decision advanced:** whether the proposed rent ceiling alone houses every applicant.

**Actual mission answer — authoring only:** Reject the ceiling as a complete housing plan and retain a separate access measure.

**Call — exact player copy:** Go to the Lease Desk in Housing and Work Office.

**Stop reason — exact player copy:** The housing explanation must fit the unchanged buildings too.

**Question card story setup — exact player copy:** Leila shows you the record: the household comparison shows that current tenants and new applicants can face different outcomes under the same lower rent. Read the office’s full record before claiming that the cap has already created homes or destroyed buildings.

**Prior result displayed in mission log:** A tenant who retains occupancy gains from the lower payment. A shortage leaves some willing applicants without housing. The lower rent transfers income away from this landlord. Construction responds over time and depends on costs, rules and expected returns.

**Question card story-science connection — exact player copy:** The housing office can separate rationing now from possible construction changes later.

**Data/readings/options — exact player copy:** Compare all readings; alarm, watch, and normal are text labels, not verdicts.

**Format-specific interaction block:**

```json
{
  "headline": "Why the advertised rooms are gone",
  "readings": [
    {
      "zone": "Rent",
      "label": "Enforced posted rent",
      "value": "$500, below $700 equilibrium",
      "status": "watch"
    },
    {
      "zone": "Offers",
      "label": "Homes available",
      "value": "80",
      "status": "normal"
    },
    {
      "zone": "Requests",
      "label": "Applications at cap",
      "value": "120",
      "status": "alarm"
    },
    {
      "zone": "Buildings",
      "label": "Units physically destroyed",
      "value": "0",
      "status": "normal"
    }
  ],
  "choices": [
    {
      "label": "A fall in housing demand leaves fewer applicants seeking homes",
      "mechanism": "There are 120 applicants and 80 offered homes; a fall in demand does not explain the excess applications."
    },
    {
      "label": "The binding rent cap leaves more applicants than offered homes",
      "mechanism": "The ceiling is below the stated equilibrium, offers are below applications, and no destruction occurred. A shortage follows without any assumption that the policy immediately destroys homes; the separate long-run response remains conditional."
    },
    {
      "label": "A loss of physical homes leaves fewer units available to offer",
      "mechanism": "The destruction reading is zero, so physical loss does not explain this shortage."
    },
    {
      "label": "A nonbinding rent cap leaves the existing market rent unchanged",
      "mechanism": "The ceiling is $200 below the market figure, so it is binding rather than nonbinding."
    }
  ],
  "answer": "The binding rent cap leaves more applicants than offered homes",
  "rebuttals": {
    "A loss of physical homes leaves fewer units available to offer": "The destruction reading is zero, so physical loss does not explain this shortage.",
    "A nonbinding rent cap leaves the existing market rent unchanged": "The ceiling is $200 below the market figure, so it is binding rather than nonbinding.",
    "A fall in housing demand leaves fewer applicants seeking homes": "There are 120 applicants and 80 offered homes; a fall in demand does not explain the excess applications."
  },
  "answerText": "The ceiling is below the stated equilibrium, offers are below applications, and no destruction occurred. A shortage follows without any assumption that the policy immediately destroys homes; the separate long-run response remains conditional."
}
```

**Question card prompt — exact player copy:** Read every zone and select the one explanation consistent with all observations.

**Correct result:** "The binding rent cap leaves more applicants than offered homes"; exact selection or mapping required.

**Answer text:** The ceiling is below the stated equilibrium, offers are below applications, and no destruction occurred. A shortage follows without any assumption that the policy immediately destroys homes; the separate long-run response remains conditional.

**Why/mechanism:** The ceiling is below the stated equilibrium, offers are below applications, and no destruction occurred. A shortage follows without any assumption that the policy immediately destroys homes; the separate long-run response remains conditional. The housing office can separate rationing now from possible construction changes later. Price incentives help explain the immediate mismatch between demand and offers; this evidence does not measure how builders respond after several years. The destruction reading is zero, so physical loss does not explain this shortage.

**Misconception / wrong-path feedback:**

- The destruction reading is zero, so physical loss does not explain this shortage. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The ceiling is $200 below the market figure, so it is binding rather than nonbinding. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- There are 120 applicants and 80 offered homes; a fall in demand does not explain the excess applications. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Lease Desk stores this dated finding in text: The ceiling is below the stated equilibrium, offers are below applications, and no destruction occurred. A shortage follows without any assumption that the policy immediately destroys homes; the separate long-run response remains conditional.

**Unlock:** Stop 20.

**Retrieval:** Use the prior mission log and concepts [4]; the prior-result line states the immediate dependency.

**Later payoff:** The council asks how to fund the separate housing measure.

**Consistency bundle:**
```json
{
  "source_values": "Compare all readings; alarm, watch, and normal are text labels, not verdicts.",
  "derived_values": "The ceiling is below the stated equilibrium, offers are below applications, and no destruction occurred. A shortage follows without any assumption that the policy immediately destroys homes; the separate long-run response remains conditional.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "The binding rent cap leaves more applicants than offered homes",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The ceiling is below the stated equilibrium, offers are below applications, and no destruction occurred. A shortage follows without any assumption that the policy immediately destroys homes; the separate long-run response remains conditional.",
  "wrong_feedback_values": [
    "The destruction reading is zero, so physical loss does not explain this shortage.",
    "The ceiling is $200 below the market figure, so it is binding rather than nonbinding.",
    "There are 120 applicants and 80 offered homes; a fall in demand does not explain the excess applications."
  ],
  "later_story_references": "The council asks how to fund the separate housing measure"
}
```

## H4. Stop 20 — Keep the promise honest

**Format/placement:** CHOICE, Leila Moss at the Job Board in Housing and Work Office.

**Metadata:** Concept: 8 — Price controls and allocation; Narrow concept: Keep the promise honest; Keystone: Equilibrium, Price incentives, Surplus; Area: P; Prerequisites: 4; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the proposed rent ceiling alone houses every applicant.

**Actual mission answer — authoring only:** Retain tenant relief, but add a separate housing access measure.

**Call — exact player copy:** Go to Housing and Work Office and meet Leila Moss, housing cooperative organizer, at the Job Board.

**Stop reason — exact player copy:** The public promise must not erase the excluded applicants.

**Question card story setup — exact player copy:** Leila shows you the record: the office record confirms an immediate allocation gap without a loss of physical buildings, and the council still wants every applicant housed. Decide what the cap can achieve before the hearing commits to its final promise.

**Prior result displayed in mission log:** The ceiling is below the stated equilibrium, offers are below applications, and no destruction occurred. A shortage follows without any assumption that the policy immediately destroys homes; the separate long-run response remains conditional.

**Question card story-science connection — exact player copy:** The advice distinguishes a factual shortage from a value judgment about tenant protection.

**Data/readings/options — exact player copy:** The cap creates a modeled 40-home shortage; incumbent tenants benefit, applicants can remain excluded, and the town’s stated aim is access for every applicant. No new homes or rent aid are included in the cap proposal.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Remove all tenant relief, since any landlord loss makes relief inefficient",
    "Count planned building as housing supply, before funding and permits arrive",
    "Retain tenant relief, but add a separate housing access measure",
    "Certify the rent cap, since lower rent gives every applicant access"
  ],
  "answer": "Retain tenant relief, but add a separate housing access measure",
  "why": "The stated goal concerns access, and 40 applicants remain unmatched under the cap. That disproves the claim that the ceiling alone meets the goal while leaving room for a normative choice to retain relief for existing tenants alongside additional measures. The advice distinguishes a factual shortage from a value judgment about tenant protection. A lower legal rent does not fill the 40-unit quantity gap. Distributional benefits remain real even when a policy is incomplete.",
  "rebuttals": {
    "Certify the rent cap, since lower rent gives every applicant access": "A lower legal rent does not fill the 40-unit quantity gap.",
    "Remove all tenant relief, since any landlord loss makes relief inefficient": "Distributional benefits remain real even when a policy is incomplete.",
    "Count planned building as housing supply, before funding and permits arrive": "No evidence or authorized input supports instant new supply."
  },
  "answerText": "The stated goal concerns access, and 40 applicants remain unmatched under the cap. That disproves the claim that the ceiling alone meets the goal while leaving room for a normative choice to retain relief for existing tenants alongside additional measures."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Retain tenant relief, but add a separate housing access measure"; exact selection or mapping required.

**Answer text:** The stated goal concerns access, and 40 applicants remain unmatched under the cap. That disproves the claim that the ceiling alone meets the goal while leaving room for a normative choice to retain relief for existing tenants alongside additional measures.

**Why/mechanism:** The stated goal concerns access, and 40 applicants remain unmatched under the cap. That disproves the claim that the ceiling alone meets the goal while leaving room for a normative choice to retain relief for existing tenants alongside additional measures. The advice distinguishes a factual shortage from a value judgment about tenant protection. A lower legal rent does not fill the 40-unit quantity gap. Distributional benefits remain real even when a policy is incomplete.

**Misconception / wrong-path feedback:**

- A lower legal rent does not fill the 40-unit quantity gap. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Distributional benefits remain real even when a policy is incomplete. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- No evidence or authorized input supports instant new supply. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Job Board stores this dated finding in text: The stated goal concerns access, and 40 applicants remain unmatched under the cap. That disproves the claim that the ceiling alone meets the goal while leaving room for a normative choice to retain relief for existing tenants alongside additional measures.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [4]; the prior-result line states the immediate dependency.

**Later payoff:** The council asks how to fund the separate housing measure.

**Consistency bundle:**
```json
{
  "source_values": "The cap creates a modeled 40-home shortage; incumbent tenants benefit, applicants can remain excluded, and the town’s stated aim is access for every applicant. No new homes or rent aid are included in the cap proposal.",
  "derived_values": "The stated goal concerns access, and 40 applicants remain unmatched under the cap. That disproves the claim that the ceiling alone meets the goal while leaving room for a normative choice to retain relief for existing tenants alongside additional measures.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Retain tenant relief, but add a separate housing access measure",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The stated goal concerns access, and 40 applicants remain unmatched under the cap. That disproves the claim that the ceiling alone meets the goal while leaving room for a normative choice to retain relief for existing tenants alongside additional measures.",
  "wrong_feedback_values": [
    "A lower legal rent does not fill the 40-unit quantity gap.",
    "Distributional benefits remain real even when a policy is incomplete.",
    "No evidence or authorized input supports instant new supply."
  ],
  "later_story_references": "The council asks how to fund the separate housing measure"
}
```

## I. Mission outcome

**Delivery piece 5:** The rent access count. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Leila Moss:** “A lower rent helps if you can get a key.”

**Mission decision:** The rent cap alone will not house all who apply. Forty homes are still missing from the offers. The town keeps relief and access as two goals. The access plan still needs funds.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 5 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 16:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The hearing labels the rent cap as tenant relief rather than a promise of a home for all.

**Automatic bar change:** Plan Evidence -2 | Service Continuity +2 | Field Budget -1 | Public Accountability +4

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [2, 0, 2, 0]; bars [88, 95, 87, 90]; bank 0, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** So Leila asks who will fund the access measure; a lower posted rent has created no new public revenue.

## K. Quick concept review

- A legal maximum can lower the rent paid by some tenants while leaving other people unable to find homes.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The advice distinguishes a factual shortage from a value judgment about tenant protection.


## L. GO DEEPER — Relief, access and rationing

**Secondary briefing — exact player copy:** A legal price rule can help a person who makes a trade while leaving someone else unmatched. Check when the rule binds, then count the people on both sides of the result.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- A ceiling is a maximum price; it binds below equilibrium. A floor is a minimum price; it binds above equilibrium.
- At a binding ceiling, shortage is quantity demanded minus quantity supplied. At a binding floor, excess supply can remain unsold if no other buyer intervenes.
- Nonprice rationing allocates by a rule such as waiting order. That rule need not maximize total surplus or prioritize need.
- A participant’s net benefit includes search and waiting costs as well as the posted price. Distribution asks which people gain and which remain excluded.

### BT-GD-M05-Q1

**Question:** Equilibrium rent is $900. A legal ceiling is set at $1,000. What is its immediate effect in the basic competitive model?

- **A.** It raises the equilibrium to $1,000
- **B.** It is a price floor
- **C.** It is nonbinding
- **D.** It creates a shortage automatically

**Correct key:** C

**Hint:** First ask whether the legal price binds; then distinguish the matched group from people left without a trade.

**Worked explanation — reveal on request:** The market can still trade at the nine-hundred-dollar equilibrium below the ceiling.

**Feedback A:** Reconsider. A maximum is not a required price.

**Feedback B:** Reconsider. A ceiling limits the maximum, not the minimum.

**Feedback C:** Correct. The market can still trade at the nine-hundred-dollar equilibrium below the ceiling.

**Feedback D:** Reconsider. A ceiling must be below equilibrium to bind.


### BT-GD-M05-Q2

**Question:** At a binding rent cap, 140 homes are demanded and 100 offered. What is the shortage?

- **A.** 240 homes
- **B.** 40 homes
- **C.** 100 homes
- **D.** 140 homes

**Correct key:** B

**Hint:** First ask whether the legal price binds; then distinguish the matched group from people left without a trade.

**Worked explanation — reveal on request:** Unmet demand at the capped price is 140 minus 100.

**Feedback A:** Reconsider. Adding demand and supply does not measure the gap.

**Feedback B:** Correct. Unmet demand at the capped price is 140 minus 100.

**Feedback C:** Reconsider. That is supplied housing.

**Feedback D:** Reconsider. That is all demanded housing, including matched tenants.


### BT-GD-M05-Q3

**Question:** Under a cap, 100 homes go to the first applicants in line. Why does the low posted rent not establish that the allocation is efficient?

- **A.** Waiting order need not allocate homes to those with the highest willingness to pay
- **B.** Every matched tenant must lose
- **C.** A low price proves all applicants are housed
- **D.** Efficiency means only the landlord's revenue

**Correct key:** A

**Hint:** First ask whether the legal price binds; then distinguish the matched group from people left without a trade.

**Worked explanation — reveal on request:** That can reduce total surplus; prioritizing need is a separate equity criterion, not the same efficiency ranking.

**Feedback A:** Correct. That can reduce total surplus; prioritizing need is a separate equity criterion, not the same efficiency ranking.

**Feedback B:** Reconsider. Matched tenants may benefit from lower rent.

**Feedback C:** Reconsider. The number of homes may be smaller than demand.

**Feedback D:** Reconsider. Efficiency concerns total surplus, not one group's receipts.


### BT-GD-M05-Q4

**Question:** A minimum price is $7 when competitive equilibrium is $5. At $7, supply is 80 and demand is 50. What surplus occurs if government buys nothing?

- **A.** 30 units of shortage
- **B.** 80 units are necessarily sold
- **C.** No surplus because the floor is legal
- **D.** 30 units offered remain unsold

**Correct key:** D

**Hint:** First ask whether the legal price binds; then distinguish the matched group from people left without a trade.

**Worked explanation — reveal on request:** At the floor, supply exceeds demand by thirty.

**Feedback A:** Reconsider. The excess is on the selling side, not buying side.

**Feedback B:** Reconsider. Only fifty are demanded at that price.

**Feedback C:** Reconsider. Legality does not make quantities demanded and supplied equal.

**Feedback D:** Correct. At the floor, supply exceeds demand by thirty.


### BT-GD-M05-Q5

**Question:** A capped-rent tenant saves $200 monthly but spends $60 worth of time securing the unit. Before other changes, what is the tenant's net gain in the first month?

- **A.** $260
- **B.** $60
- **C.** $140 in the first month
- **D.** $200

**Correct key:** C

**Hint:** First ask whether the legal price binds; then distinguish the matched group from people left without a trade.

**Worked explanation — reveal on request:** Subtract the sixty-dollar search-time cost from the two-hundred-dollar rent saving.

**Feedback A:** Reconsider. The time cost reduces the gain rather than adding to it.

**Feedback B:** Reconsider. That is the cost, not the net gain.

**Feedback C:** Correct. Subtract the sixty-dollar search-time cost from the two-hundred-dollar rent saving.

**Feedback D:** Reconsider. That ignores the supplied time cost.


### BT-GD-M05-Q6

**Question:** A rent policy helps existing leaseholders but leaves new arrivals unhoused. Which reporting pair best captures its distributional limit?

- **A.** Population growth alone
- **B.** Savings for matched tenants and the number of unmatched applicants
- **C.** Average rent alone
- **D.** Landlord names alone

**Correct key:** B

**Hint:** First ask whether the legal price binds; then distinguish the matched group from people left without a trade.

**Worked explanation — reveal on request:** It records both the benefit and the excluded group without claiming one cancels the other.

**Feedback A:** Reconsider. Growth may explain pressure but does not record who benefited or remained unmatched.

**Feedback B:** Correct. It records both the benefit and the excluded group without claiming one cancels the other.

**Feedback C:** Reconsider. An average among leases omits applicants without a lease.

**Feedback D:** Reconsider. Names do not measure either policy effect.


# Mission 6 — WHO PAYS THE FEE

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 6 OF 15

**Card title:** WHO PAYS THE FEE

**Go now:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Budget Desk.

**Card body:** The rent cap leaves some people out. The town wants a fee to fund more help, but lost sales could cut the cash it raises. Today you decide if the fee can pay for that help. By the end of the mission, you will check who bears its cost.

**Objective:** Decide whether the proposed market fee supplies enough revenue for the housing measure.

**Stakes — exact player copy:** You decide how much fee revenue the town can promise. An inflated budget leaves Leila’s housing measure short of cash.

### Worth knowing first — exact player copy

#### Glossary terms

Excise tax: A payment charged per unit traded.

Tax incidence: How a tax burden is divided between buyers and sellers.

Consumer surplus: Willingness to pay minus actual payment, summed over buyers.

Producer surplus: Payment received minus minimum supply cost, summed over sellers.

Deadweight loss: Net gains from trade lost rather than transferred to another party.

Subsidy: A payment that lowers a recipient’s effective cost or raises its effective return.

#### Primer concepts

**Required local preparation — read before Stop 21:** A trade adds a gain when the buyer values it above the seller’s cost. A tax can stop some such trades. Their lost gain is separate from the cash the town collects.

- A fee can be shared by buyers and sellers even when only one side sends the payment.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** Tax revenue = tQ; DWL = 0.5×t×(Q0−Qt)  
**What it is for:** Separate tax receipts from lost gains in a competitive market with no external effects.  
**Symbols:** t is tax per unit; Q is taxed trade; Q0 is initial trade; Qt is trade after tax; DWL is deadweight loss.  
**Why this campaign needs it:** The housing promise needs real receipts and honest costs.

**Required equation or concept use — authoring/render check:** Stop 21: 4×30 = $120; Stop 23: 0.5×4×(50−30) = $40.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. A tax of 3 on 14 units yields 42 of revenue.

2. A tax wedge of 6 reduces trade from 18 to 12; with linear curves, deadweight loss is 0.5×6×6 = 18.

3. If buyers pay 2 more and sellers receive 1 less, their shares of a 3 tax are two-thirds and one-third.

4. A per-unit subsidy of 4 on 9 units costs 36, even if consumers receive only part of its benefit.

5. For a negative external cost of 2 per unit, a matching corrective tax can remove an existing inefficiency instead of adding one.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

The cap cannot house everyone, so the council needs to cost its separate access measure. The four findings establish: Reserve actual receipts → Follow the burden → Cost the vanished trades → Fund the promised measure. The council reserves the measured fee proceeds for the housing measure. One supplier says the new costs will force it to close.

## C. Designer intent — not shown to player

The mission moves from tax incidence and subsidies to a concrete recommendation: Use the fee’s $120 revenue estimate and acknowledge its $40 efficiency cost. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M6-A — On arrival at Civic Advice Office

**Location:** Civic Advice Office.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Mara Velez, state economic adviser:** “The fee comes through my books, but customers see it too.”

**Unlocks:** Stop 21.

### Beat BT-M6-1 — After Stop 21

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Only taxed deliveries raise revenue: 4×30 = $120 per day; the 20 transactions that disappear raise none.

**Unlocks:** Stop 22.

**Dialogue bubble — Mara Velez:** “The fee funds part of a real housing measure. Its receipt is not a free gain.”

**Dialogue bubble — Ruth Sen, radio:** “I can report the freight bill. A lower charge here can still land on someone else.”

### Beat BT-M6-2 — After Stop 22

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Buyers pay three dollars more than before. Sellers receive one dollar less than before. Elastic responses determine price changes even when a seller sends the payment. The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand. Take this result to Business Workshop; its original records are needed for cost the vanished trades.

**Unlocks:** Stop 23.

**Dialogue bubble — Mara Velez:** “We will name the side that carries more burden, even if the legal collection point is elsewhere.”

### Beat BT-M6-3 — After Stop 23

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Lost trade is 50−30 = 20; the triangular lost gains are 0.5×4×20 = $40 per day. Tax receipts are transfers and are not counted again as lost gains.

**Unlocks:** Stop 24.

### Beat BT-M6-4 — After Stop 24

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Use the fee’s $120 revenue estimate and acknowledge its $40 efficiency cost

**Unlocks:** Mission outcome.

### Beat BT-M6-E — At mission end

**Location:** Business Workshop.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The housing fund receives a posted reservation while the delivery board loses twenty bookings.

**Panel/HUD text:** The housing fund receives a posted reservation while the delivery board loses twenty bookings. One supplier says the new costs will force it to close.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Mara Velez:** “The receipt copy is sealed for the housing measure. Now we owe the supplier a fair look at the bill left on its side.”


## E. Location plan

**2 locations:** Civic Advice Office → Business Workshop.

Stop 21: Civic Advice Office / Budget Desk | Stop 22: Civic Advice Office / Town Map | Stop 23: Business Workshop / Order Terminal | Stop 24: Business Workshop / Kitchen Planning Table. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

**Nico Bell, diner owner:** owns the original records in Business Workshop and must explain the recommendation to the people affected.

The housing fund receives a posted reservation while the delivery board loses twenty bookings. One supplier says the new costs will force it to close.

## G. Key concepts, explained here

- **Excise tax:** A payment charged per unit traded.

- **Tax incidence:** How a tax burden is divided between buyers and sellers.

- **Consumer surplus:** Willingness to pay minus actual payment, summed over buyers.

- **Producer surplus:** Payment received minus minimum supply cost, summed over sellers.

- **Deadweight loss:** Net gains from trade lost rather than transferred to another party.

- **Subsidy:** A payment that lowers a recipient’s effective cost or raises its effective return.

## H1. Stop 21 — Reserve actual receipts

**Format/placement:** BALLPARK, Civic Advice Office — Budget Desk.

**Metadata:** Concept: 9 — Tax incidence and subsidies; Narrow concept: Reserve actual receipts; Keystone: Elasticity, Surplus; Area: T; Prerequisites: 4, 5; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit daily tax revenue as tax per delivery times deliveries still traded.

**Briefing decision advanced:** whether the proposed market fee supplies enough revenue for the housing measure.

**Actual mission answer — authoring only:** Use the fee’s $120 revenue estimate and acknowledge its $40 efficiency cost.

**Call — exact player copy:** Go to the Budget Desk in Civic Advice Office.

**Stop reason — exact player copy:** The measure needs receipts from real taxed trades.

**Question card story setup — exact player copy:** Mara shows you the record: the hearing kept tenant relief separate from its promise of access, leaving a housing measure that still needs funds. Count the fee receipts from trades that actually remain before reserving money for the new commitment.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** A budget cannot spend tax receipts from transactions that no longer occur.

**Data/readings/options — exact player copy:** The competitive market initially trades 50 deliveries daily; a $4 tax reduces trade to 30; there are no external costs or benefits.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Reserve actual receipts",
    "units": "dollars per day",
    "labels": [
      "4",
      "30",
      "50",
      "20"
    ],
    "values": [
      4,
      30,
      50,
      20
    ],
    "slots": 2,
    "template": "{a} {b}",
    "formula": "a*b",
    "correct": [
      0,
      1
    ],
    "target": 120,
    "tolerance": 0.05,
    "correctResult": 120
  },
  "answerText": "Only taxed deliveries raise revenue: 4×30 = $120 per day; the 20 transactions that disappear raise none.",
  "wrongFeedback": [
    "200 taxes the old quantity.",
    "80 taxes the lost transactions.",
    "4 reports a rate rather than revenue."
  ]
}
```

**Question card prompt — exact player copy:** Submit daily tax revenue as tax per delivery times deliveries still traded.

**Correct result:** 120; absolute tolerance 0.05 in the requested unit.

**Answer text:** Only taxed deliveries raise revenue: 4×30 = $120 per day; the 20 transactions that disappear raise none.

**Why/mechanism:** Only taxed deliveries raise revenue: 4×30 = $120 per day; the 20 transactions that disappear raise none. A budget cannot spend tax receipts from transactions that no longer occur. The tax changes the equilibrium quantity, so the budget must use the new traded amount; elasticity helps explain why the quantity responds at all. 200 taxes the old quantity. 80 taxes the lost transactions. 4 reports a rate rather than revenue.

**Misconception / wrong-path feedback:**

- 200 taxes the old quantity. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 80 taxes the lost transactions. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 4 reports a rate rather than revenue. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Budget Desk stores this dated finding in text: Only taxed deliveries raise revenue: 4×30 = $120 per day; the 20 transactions that disappear raise none.

**Unlock:** Stop 22.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** One supplier says the new costs will force it to close.

**Consistency bundle:**
```json
{
  "source_values": "The competitive market initially trades 50 deliveries daily; a $4 tax reduces trade to 30; there are no external costs or benefits.",
  "derived_values": "Only taxed deliveries raise revenue: 4×30 = $120 per day; the 20 transactions that disappear raise none.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 120,
  "tolerance": 0.05,
  "answer_text_values": "Only taxed deliveries raise revenue: 4×30 = $120 per day; the 20 transactions that disappear raise none.",
  "wrong_feedback_values": [
    "200 taxes the old quantity.",
    "80 taxes the lost transactions.",
    "4 reports a rate rather than revenue."
  ],
  "later_story_references": "One supplier says the new costs will force it to close"
}
```

## H2. Stop 22 — Follow the burden

**Format/placement:** PROTOCOL, Civic Advice Office — Town Map.

**Metadata:** Concept: 9 — Tax incidence and subsidies; Narrow concept: Follow the burden; Keystone: Elasticity, Surplus; Area: T; Prerequisites: 4, 5; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the proposed market fee supplies enough revenue for the housing measure.

**Actual mission answer — authoring only:** Use the fee’s $120 revenue estimate and acknowledge its $40 efficiency cost.

**Call — exact player copy:** Go to the Town Map in Civic Advice Office.

**Stop reason — exact player copy:** The public budget must identify the burden on both market sides.

**Question card story setup — exact player copy:** Mara shows you the record: the fee’s receipts are now recorded, but the group that sends the payment may not bear its full cost. Compare buyers’ payments and sellers’ receipts before the council describes who funds the housing measure.

**Prior result displayed in mission log:** Only taxed deliveries raise revenue: 4×30 = $120 per day; the 20 transactions that disappear raise none.

**Question card story-science connection — exact player copy:** The legal payer cannot be used as a shortcut for who loses purchasing power.

**Data/readings/options — exact player copy:** Before tax, price is $10; afterward buyers pay $13, sellers retain $9 and the tax is $4. Compare the separate statements.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "Buyer price change from $10 to $13"
    },
    {
      "id": "e2",
      "label": "Seller receipt change from $10 to $9"
    },
    {
      "id": "e3",
      "label": "Payment sent by sellers to the treasury"
    },
    {
      "id": "e4",
      "label": "Buyers bear $3 while sellers bear $1 in the same competitive market"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Buyers bear $3 per delivery"
    },
    {
      "id": "r2",
      "label": "Sellers bear $1 per delivery"
    },
    {
      "id": "r3",
      "label": "Legal remittance does not determine incidence"
    },
    {
      "id": "r4",
      "label": "Demand is less elastic than supply over the tax comparison"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "Buyers pay three dollars more than before. Sellers receive one dollar less than before. Elastic responses determine price changes even when a seller sends the payment. The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand. The legal payer cannot be used as a shortcut for who loses purchasing power. The buyer and seller changes add to the entire wedge, giving a useful accounting check; a different legal remitter could face the same equilibrium burden when market responses are unchanged.",
  "answerText": "Buyers pay three dollars more than before. Sellers receive one dollar less than before. Elastic responses determine price changes even when a seller sends the payment. The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand.",
  "rebuttals": {
    "e1": "Buyers pay three dollars more than before.",
    "e2": "Sellers receive one dollar less than before.",
    "e3": "Elastic responses determine price changes even when a seller sends the payment.",
    "e4": "The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"Buyer price change from $10 to $13": "Buyers bear $3 per delivery", "Seller receipt change from $10 to $9": "Sellers bear $1 per delivery", "Payment sent by sellers to the treasury": "Legal remittance does not determine incidence", "Buyers bear $3 while sellers bear $1 in the same competitive market": "Demand is less elastic than supply over the tax comparison"}; exact selection or mapping required.

**Answer text:** Buyers pay three dollars more than before. Sellers receive one dollar less than before. Elastic responses determine price changes even when a seller sends the payment. The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand.

**Why/mechanism:** Buyers pay three dollars more than before. Sellers receive one dollar less than before. Elastic responses determine price changes even when a seller sends the payment. The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand. The legal payer cannot be used as a shortcut for who loses purchasing power. The buyer and seller changes add to the entire wedge, giving a useful accounting check; a different legal remitter could face the same equilibrium burden when market responses are unchanged.

**Misconception / wrong-path feedback:**

- Buyers pay three dollars more than before. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Sellers receive one dollar less than before. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Elastic responses determine price changes even when a seller sends the payment. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: Buyers pay three dollars more than before. Sellers receive one dollar less than before. Elastic responses determine price changes even when a seller sends the payment. The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand.

**Unlock:** Stop 23.

**Retrieval:** Use the prior mission log and concepts [4, 5]; the prior-result line states the immediate dependency.

**Later payoff:** One supplier says the new costs will force it to close.

**Consistency bundle:**
```json
{
  "source_values": "Before tax, price is $10; afterward buyers pay $13, sellers retain $9 and the tax is $4. Compare the separate statements.",
  "derived_values": "Buyers pay three dollars more than before. Sellers receive one dollar less than before. Elastic responses determine price changes even when a seller sends the payment. The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "Buyer price change from $10 to $13": "Buyers bear $3 per delivery",
    "Seller receipt change from $10 to $9": "Sellers bear $1 per delivery",
    "Payment sent by sellers to the treasury": "Legal remittance does not determine incidence",
    "Buyers bear $3 while sellers bear $1 in the same competitive market": "Demand is less elastic than supply over the tax comparison"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Buyers pay three dollars more than before. Sellers receive one dollar less than before. Elastic responses determine price changes even when a seller sends the payment. The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand.",
  "wrong_feedback_values": [
    "Buyers pay three dollars more than before.",
    "Sellers receive one dollar less than before.",
    "Elastic responses determine price changes even when a seller sends the payment.",
    "The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand."
  ],
  "later_story_references": "One supplier says the new costs will force it to close"
}
```

## H3. Stop 23 — Cost the vanished trades

**Format/placement:** VERIFY, Business Workshop — Order Terminal.

**Metadata:** Concept: 10 — Surplus and efficiency; Narrow concept: Cost the vanished trades; Keystone: Surplus, Marginal analysis; Area: CM; Prerequisites: 4; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** operated; First, calculate and commit deadweight loss using half the tax wedge times lost deliveries. Then run the Order Terminal market trial, measure the surplus loss excluding transfers, and select whether it matches; no restoration or second reading is required.

**Briefing decision advanced:** whether the proposed market fee supplies enough revenue for the housing measure.

**Actual mission answer — authoring only:** Use the fee’s $120 revenue estimate and acknowledge its $40 efficiency cost.

**Call — exact player copy:** Go to the Order Terminal in Business Workshop.

**Stop reason — exact player copy:** The council must disclose the gains lost as trade shrinks.

**Question card story setup — exact player copy:** Nico shows you the record: the price record divides the fee burden between buyers and sellers, while fewer deliveries now take place than before. Calculate the lost gains from those vanished trades before presenting the fee as merely a transfer.

**Prior result displayed in mission log:** Buyers pay three dollars more than before. Sellers receive one dollar less than before. Elastic responses determine price changes even when a seller sends the payment. The less responsive market side bears more of the wedge, so the larger buyer burden identifies relatively less elastic demand.

**Question card story-science connection — exact player copy:** The recommendation must carry its efficiency cost alongside revenue.

**Data/readings/options — exact player copy:** With linear supply and demand, no external effects, a $4 tax reduces deliveries from 50 to 30; all other determinants stay fixed.

**Format-specific interaction block:**

```json
{
  "verify": {
    "quantity": "Cost the vanished trades",
    "units": "dollars per day",
    "predictionRange": {
      "min": 0,
      "max": 200,
      "step": 1
    },
    "truth": 40,
    "tolerance": 0.05,
    "measurement": {
      "label": "Run trial and read result",
      "cost": 1,
      "units": "trial credit"
    },
    "measurementBudget": 2,
    "conclusions": [
      "Prediction matches the trial",
      "Prediction does not match the trial"
    ],
    "correctConclusion": "Prediction matches the trial",
    "requiredSequence": [
      "calculate_commit",
      "operate",
      "measure",
      "interpret"
    ],
    "initialPrediction": null,
    "locks": {
      "operate": "prediction committed",
      "measure": "trial operated",
      "interpret": "reading collected"
    }
  },
  "answerText": "Lost trade is 50−30 = 20; the triangular lost gains are 0.5×4×20 = $40 per day. Tax receipts are transfers and are not counted again as lost gains.",
  "wrongFeedback": [
    "120 is revenue, not deadweight loss.",
    "80 omits the triangle’s half.",
    "160 adds transfers to lost gains."
  ]
}
```

**Question card prompt — exact player copy:** First, calculate and commit deadweight loss using half the tax wedge times lost deliveries. Then run the Order Terminal market trial, measure the surplus loss excluding transfers, and select whether it matches; no restoration or second reading is required.

**Correct result:** 40; absolute tolerance 0.05 in the requested unit.

**Answer text:** Lost trade is 50−30 = 20; the triangular lost gains are 0.5×4×20 = $40 per day. Tax receipts are transfers and are not counted again as lost gains.

**Why/mechanism:** Lost trade is 50−30 = 20; the triangular lost gains are 0.5×4×20 = $40 per day. Tax receipts are transfers and are not counted again as lost gains. The recommendation must carry its efficiency cost alongside revenue. Surplus accounting distinguishes a transfer to the treasury from gains that disappear because beneficial trades no longer occur; only the latter form this triangle. 120 is revenue, not deadweight loss. 80 omits the triangle’s half.

**Misconception / wrong-path feedback:**

- 120 is revenue, not deadweight loss. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 80 omits the triangle’s half. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 160 adds transfers to lost gains. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Order Terminal stores this dated finding in text: Lost trade is 50−30 = 20; the triangular lost gains are 0.5×4×20 = $40 per day. Tax receipts are transfers and are not counted again as lost gains.

**Unlock:** Stop 24.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** One supplier says the new costs will force it to close.

**Consistency bundle:**
```json
{
  "source_values": "With linear supply and demand, no external effects, a $4 tax reduces deliveries from 50 to 30; all other determinants stay fixed.",
  "derived_values": "Lost trade is 50−30 = 20; the triangular lost gains are 0.5×4×20 = $40 per day. Tax receipts are transfers and are not counted again as lost gains.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": 40,
  "correct_result": 40,
  "tolerance": 0.05,
  "answer_text_values": "Lost trade is 50−30 = 20; the triangular lost gains are 0.5×4×20 = $40 per day. Tax receipts are transfers and are not counted again as lost gains.",
  "wrong_feedback_values": [
    "120 is revenue, not deadweight loss.",
    "80 omits the triangle’s half.",
    "160 adds transfers to lost gains."
  ],
  "later_story_references": "One supplier says the new costs will force it to close"
}
```

## H4. Stop 24 — Fund the promised measure

**Format/placement:** CHOICE, Nico Bell at the Kitchen Planning Table in Business Workshop.

**Metadata:** Concept: 9 — Tax incidence and subsidies; Narrow concept: Fund the promised measure; Keystone: Elasticity, Surplus; Area: CM; Prerequisites: 4, 5; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the proposed market fee supplies enough revenue for the housing measure.

**Actual mission answer — authoring only:** Budget $120 in receipts and report $40 in lost gains.

**Call — exact player copy:** Go to Business Workshop and meet Nico Bell, diner owner, at the Kitchen Planning Table.

**Stop reason — exact player copy:** The budget vote needs revenue and efficiency on separate lines.

**Question card story setup — exact player copy:** Nico shows you the record: the record now separates tax receipts, burden shares and lost gains, so the council can compare funding with its stated commitment. Choose the budget statement that pays for the housing measure without hiding the economic cost.

**Prior result displayed in mission log:** Lost trade is 50−30 = 20; the triangular lost gains are 0.5×4×20 = $40 per day. Tax receipts are transfers and are not counted again as lost gains.

**Question card story-science connection — exact player copy:** The council owns the distribution choice while the player certifies the calculation.

**Data/readings/options — exact player copy:** The housing measure costs $120 daily; fee receipts are $120, buyers bear $3 and sellers $1 per remaining delivery, and the undistorted linear-market deadweight loss is $40 daily. The council has explicitly chosen to fund this measure if receipts cover it.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Budget $200 in receipts and use the original volume of sales",
    "Budget $120 in receipts and assign the whole burden to sellers",
    "Budget $120 in receipts and count the receipts as net social gain",
    "Budget $120 in receipts and report $40 in lost gains"
  ],
  "answer": "Budget $120 in receipts and report $40 in lost gains",
  "why": "Under the council’s stated funding choice, $120 covers the measure. The adviser must also disclose $40 in lost gains and the buyer-heavy burden; those facts do not themselves establish whether redistribution is morally desirable. The council owns the distribution choice while the player certifies the calculation. The post-tax quantity is 30, not 50. Buyers bear most of the measured burden despite seller remittance. Tax receipts transfer money to the state; they are not an extra net social gain that erases the $40 deadweight loss.",
  "rebuttals": {
    "Budget $200 in receipts and use the original volume of sales": "The post-tax quantity is 30, not 50.",
    "Budget $120 in receipts and assign the whole burden to sellers": "Buyers bear most of the measured burden despite seller remittance.",
    "Budget $120 in receipts and count the receipts as net social gain": "Tax receipts transfer money to the state; they are not an extra net social gain that erases the $40 deadweight loss."
  },
  "answerText": "Under the council’s stated funding choice, $120 covers the measure. The adviser must also disclose $40 in lost gains and the buyer-heavy burden; those facts do not themselves establish whether redistribution is morally desirable."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Budget $120 in receipts and report $40 in lost gains"; exact selection or mapping required.

**Answer text:** Under the council’s stated funding choice, $120 covers the measure. The adviser must also disclose $40 in lost gains and the buyer-heavy burden; those facts do not themselves establish whether redistribution is morally desirable.

**Why/mechanism:** Under the council’s stated funding choice, $120 covers the measure. The adviser must also disclose $40 in lost gains and the buyer-heavy burden; those facts do not themselves establish whether redistribution is morally desirable. The council owns the distribution choice while the player certifies the calculation. The post-tax quantity is 30, not 50. Buyers bear most of the measured burden despite seller remittance. Tax receipts transfer money to the state; they are not an extra net social gain that erases the $40 deadweight loss.

**Misconception / wrong-path feedback:**

- The post-tax quantity is 30, not 50. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Buyers bear most of the measured burden despite seller remittance. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Tax receipts transfer money to the state; they are not an extra net social gain that erases the $40 deadweight loss. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Kitchen Planning Table stores this dated finding in text: Under the council’s stated funding choice, $120 covers the measure. The adviser must also disclose $40 in lost gains and the buyer-heavy burden; those facts do not themselves establish whether redistribution is morally desirable.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [4, 5]; the prior-result line states the immediate dependency.

**Later payoff:** One supplier says the new costs will force it to close.

**Consistency bundle:**
```json
{
  "source_values": "The housing measure costs $120 daily; fee receipts are $120, buyers bear $3 and sellers $1 per remaining delivery, and the undistorted linear-market deadweight loss is $40 daily. The council has explicitly chosen to fund this measure if receipts cover it.",
  "derived_values": "Under the council’s stated funding choice, $120 covers the measure. The adviser must also disclose $40 in lost gains and the buyer-heavy burden; those facts do not themselves establish whether redistribution is morally desirable.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Budget $120 in receipts and report $40 in lost gains",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Under the council’s stated funding choice, $120 covers the measure. The adviser must also disclose $40 in lost gains and the buyer-heavy burden; those facts do not themselves establish whether redistribution is morally desirable.",
  "wrong_feedback_values": [
    "The post-tax quantity is 30, not 50.",
    "Buyers bear most of the measured burden despite seller remittance.",
    "Tax receipts transfer money to the state; they are not an extra net social gain that erases the $40 deadweight loss."
  ],
  "later_story_references": "One supplier says the new costs will force it to close"
}
```

## I. Mission outcome

**Delivery piece 6:** The housing fee account. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Nico Bell:** “The fee comes through my books, but customers see it too.”

**Mission decision:** Use the $120 fee receipts and report the $40 loss in gains. The funds cover the chosen housing step. Buyers and sellers both bear costs. One supplier now wants to close.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 6 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 16:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The council reserves the measured fee proceeds for the housing measure.

**Automatic bar change:** Plan Evidence +3 | Service Continuity +2 | Field Budget +2 | Public Accountability +2

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [1, 0, 3, 0]; bars [92, 97, 92, 92]; bank 0, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** But Nico’s supplier is losing money; fee receipts will not tell its owner whether to close this month.

## K. Quick concept review

- A fee can be shared by buyers and sellers even when only one side sends the payment.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The council owns the distribution choice while the player certifies the calculation.


## L. GO DEEPER — Follow the policy money

**Secondary briefing — exact player copy:** Use a tax and a subsidy to track both budget receipts and changes in the gains from trade. The person who hands over the tax is not necessarily the person bearing most of its burden.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- Tax revenue equals the per-unit tax times the quantity actually traded after the tax. Subsidy budget cost likewise uses the paid subsidy and subsidized quantity.
- Economic incidence measures price changes borne by buyers and sellers; legal remittance only names who sends the payment. The less elastic side generally bears more of a small tax.
- For straight curves without externalities, tax deadweight loss is one-half times the tax wedge times the reduction in quantity. It is forgone surplus, not government revenue.
- A transfer changes who holds purchasing power. Its distribution matters, but it is not itself the destruction of resources in a total-surplus account.

### BT-GD-M06-Q1

**Question:** A $3 per-unit tax is collected on 40 units sold. What is government revenue?

- **A.** $3
- **B.** $120
- **C.** $43
- **D.** $13.33

**Correct key:** B

**Hint:** Separate the tax wedge, the post-policy traded quantity, transfers and trades that disappear.

**Worked explanation — reveal on request:** Tax revenue is the tax per traded unit times the post-tax quantity.

**Feedback A:** Reconsider. That is the receipt per unit, not the total.

**Feedback B:** Correct. Tax revenue is the tax per traded unit times the post-tax quantity.

**Feedback C:** Reconsider. Adding a price and a quantity is not a revenue calculation.

**Feedback D:** Reconsider. Dividing quantity by tax has the wrong units.


### BT-GD-M06-Q2

**Question:** Before a tax the price is $10. After it buyers pay $12 and sellers receive $9. What tax burden do buyers bear per unit?

- **A.** $2
- **B.** $3
- **C.** $1
- **D.** $12

**Correct key:** A

**Hint:** Separate the tax wedge, the post-policy traded quantity, transfers and trades that disappear.

**Worked explanation — reveal on request:** Buyers pay two dollars more than before; sellers bear the remaining one.

**Feedback A:** Correct. Buyers pay two dollars more than before; sellers bear the remaining one.

**Feedback B:** Reconsider. Three is the full tax wedge, not the buyers' portion.

**Feedback C:** Reconsider. One dollar is the seller's reduction from the old price.

**Feedback D:** Reconsider. Twelve is the new gross price, not its tax-induced increase.


### BT-GD-M06-Q3

**Question:** Demand is much less elastic than supply. Which side generally bears more of a small tax in the competitive model?

- **A.** Sellers because they remit the tax
- **B.** Both must bear exactly half
- **C.** Neither because government receives it
- **D.** Buyers

**Correct key:** D

**Hint:** Separate the tax wedge, the post-policy traded quantity, transfers and trades that disappear.

**Worked explanation — reveal on request:** The less responsive side has fewer alternatives and bears more of the wedge.

**Feedback A:** Reconsider. Legal remittance does not determine economic incidence.

**Feedback B:** Reconsider. Equal shares require additional conditions, not merely a tax.

**Feedback C:** Reconsider. Revenue comes from a burden on participants even when government receives the funds.

**Feedback D:** Correct. The less responsive side has fewer alternatives and bears more of the wedge.


### BT-GD-M06-Q4

**Question:** A tax wedge is $4 and quantity falls from 70 to 60. With straight curves and no externalities, what is deadweight loss?

- **A.** $240
- **B.** $280
- **C.** $20
- **D.** $40

**Correct key:** C

**Hint:** Separate the tax wedge, the post-policy traded quantity, transfers and trades that disappear.

**Worked explanation — reveal on request:** The lost-surplus triangle is one-half times four times ten.

**Feedback A:** Reconsider. That is tax revenue on sixty units.

**Feedback B:** Reconsider. That uses the pre-tax quantity to calculate a receipt that is not collected.

**Feedback C:** Correct. The lost-surplus triangle is one-half times four times ten.

**Feedback D:** Reconsider. That is the full rectangle rather than the triangle.


### BT-GD-M06-Q5

**Question:** A subsidy pays producers $2 per unit on 75 units. Ignoring administration, what is the public budget cost?

- **A.** Zero because producers receive it
- **B.** $150
- **C.** $77
- **D.** $37.50

**Correct key:** B

**Hint:** Separate the tax wedge, the post-policy traded quantity, transfers and trades that disappear.

**Worked explanation — reveal on request:** The treasury pays two dollars on each of seventy-five units.

**Feedback A:** Reconsider. A transfer to producers is still a cost to the public budget.

**Feedback B:** Correct. The treasury pays two dollars on each of seventy-five units.

**Feedback C:** Reconsider. Price and quantity cannot simply be added.

**Feedback D:** Reconsider. This divides where multiplication is required.


### BT-GD-M06-Q6

**Question:** A tax raises $100 and causes $15 deadweight loss in a market without externalities. Which statement is correct?

- **A.** Revenue is a transfer; deadweight loss is lost total surplus
- **B.** Total social loss is necessarily $115
- **C.** There is no cost because revenue is useful
- **D.** Deadweight loss is paid directly to sellers

**Correct key:** A

**Hint:** Separate the tax wedge, the post-policy traded quantity, transfers and trades that disappear.

**Worked explanation — reveal on request:** The receipt changes hands, while the fifteen-dollar loss reflects trades no longer made.

**Feedback A:** Correct. The receipt changes hands, while the fifteen-dollar loss reflects trades no longer made.

**Feedback B:** Reconsider. This counts the entire transfer as destroyed resources.

**Feedback C:** Reconsider. Useful revenue does not eliminate the stated forgone surplus.

**Feedback D:** Reconsider. It is surplus that is not realized, not someone's receipt.


# Mission 7 — THE SHUTTERED SUPPLIER

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 7 OF 15

**Card title:** THE SHUTTERED SUPPLIER

**Go now:** Go to Business Workshop and meet Nico Bell, diner owner, at the Cost Ledger Desk.

**Card body:** The fee funds help, but a supplier may close. A loss does not mean closing saves cash when some bills must still be paid. Today you decide if this shift should run. By the end of the mission, you will compare the two costs.

**Objective:** Decide whether the supplier should operate during the current month.

**Stakes — exact player copy:** You decide whether the supplier should stay open this month. Closing too soon can deepen its loss and cut the town’s supplies.

### Worth knowing first — exact player copy

#### Glossary terms

Marginal cost: The extra total cost of one additional unit.

Average variable cost: Variable cost divided by output.

Average total cost: Total cost divided by output.

Economic profit: Revenue minus explicit and implicit opportunity costs.

Shutdown: Stopping production in the short run while unavoidable fixed costs remain.

Exit: Leaving an industry when all commitments can be reconsidered.

#### Primer concepts

- A firm may keep operating with a loss if sales cover the costs it can avoid today.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** Profit = (P−ATC)Q; operate in short run if P≥AVC at the best output  
**What it is for:** Distinguish a loss from a reason to shut now.  
**Symbols:** P is price; ATC is average total cost; AVC is average variable cost; Q is output.  
**Why this campaign needs it:** The town needs supplies while the owner weighs an expiring lease.

**Required equation or concept use — authoring/render check:** Stop 25: (8−10)×20 = −$40 profit; Stop 26: 100/20 = $5 AVC; Stop 27 compares $60 contribution with $100 fixed cost.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. At price 9, average total cost 11 and output 7, profit is (9−11)×7 = −14.

2. If revenue is 80, variable cost 50 and unavoidable fixed cost 40, operating loses 10 while shutdown loses 40.

3. If price 3 lies below minimum average variable cost 4, shutdown avoids additional losses.

4. Accounting revenue 70 minus explicit cost 40 gives profit 30; an implicit cost of 18 reduces economic profit to 12.

5. If marginal revenue is 8 and marginal cost of the next unit is 6, that unit adds 2 to profit.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

The fee has a funded purpose, but a supplier now threatens to shut its doors. The four findings establish: Measure the loss → Read the avoidable costs → Compare closing with staying open → Keep the shift or close it. The supplier keeps its current shift and marks its lease for review. New firms are seeking permission to open nearby.

## C. Designer intent — not shown to player

The mission moves from competitive firm output and shutdown to a concrete recommendation: Keep the supplier operating this month while reviewing long-run exit. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M7-A — On arrival at Business Workshop

**Location:** Business Workshop.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Nico Bell, diner owner:** “Closing saves ingredients, but the lease still lands on my desk.”

**Unlocks:** Stop 25.

### Beat BT-M7-1 — After Stop 25

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Cost exceeds price by 10−8 = $2 per unit; at 20 units the economic loss is 2×20 = $40 per day.

**Unlocks:** Stop 26.

**Dialogue bubble — Nico Bell:** “The month still shows a loss. I understand why the supplier wants to turn the key.”

**Dialogue bubble — Mara Velez, radio:** “But closing also leaves a bill. Compare what can be avoided this month before advising it.”

### Beat BT-M7-2 — After Stop 26

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** 100/20 gives variable cost per unit. The other 100/20 is fixed cost per unit. Total cost is 200, so cost per unit is 10. Shutdown eliminates variable costs here but not the lease. Take this result to Civic Advice Office; its original records are needed for compare closing with staying open.

**Unlocks:** Stop 27.

**Dialogue bubble — Nico Bell:** “Keeping this shift buys time. It is no promise that the lease makes sense next year.”

### Beat BT-M7-3 — After Stop 27

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Operating contributes 160−100 = $60 toward fixed costs: its $40 loss is $60 smaller than shutdown’s $100 loss.

**Unlocks:** Stop 28.

### Beat BT-M7-4 — After Stop 28

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Keep the supplier operating this month while reviewing long-run exit

**Unlocks:** Mission outcome.

### Beat BT-M7-E — At mission end

**Location:** Civic Advice Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The supplier shutter remains open and the next-month lease review appears beside it.

**Panel/HUD text:** The supplier shutter remains open and the next-month lease review appears beside it. New firms are seeking permission to open nearby.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Nico Bell:** “The shift stays open and the lease gets a review date. I will not call a month of breathing room a permanent rescue.”


## E. Location plan

**2 locations:** Business Workshop → Civic Advice Office.

Stop 25: Business Workshop / Cost Ledger Desk | Stop 26: Business Workshop / Kitchen Planning Table | Stop 27: Civic Advice Office / Hearing Table | Stop 28: Civic Advice Office / Town Map. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Nico Bell, diner owner:** owns the original records in Business Workshop and must explain the recommendation to the people affected.

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

The supplier shutter remains open and the next-month lease review appears beside it. New firms are seeking permission to open nearby.

## G. Key concepts, explained here

- **Marginal cost:** The extra total cost of one additional unit.

- **Average variable cost:** Variable cost divided by output.

- **Average total cost:** Total cost divided by output.

- **Economic profit:** Revenue minus explicit and implicit opportunity costs.

- **Shutdown:** Stopping production in the short run while unavoidable fixed costs remain.

- **Exit:** Leaving an industry when all commitments can be reconsidered.

## H1. Stop 25 — Measure the loss

**Format/placement:** BALLPARK, Business Workshop — Cost Ledger Desk.

**Metadata:** Concept: 11 — Competitive firm output and shutdown; Narrow concept: Measure the loss; Keystone: Cost structure, Marginal analysis; Area: CM; Prerequisites: 6, 7; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit the positive magnitude of the daily economic loss using (average total cost minus price) times output.

**Briefing decision advanced:** whether the supplier should operate during the current month.

**Actual mission answer — authoring only:** Keep the supplier operating this month while reviewing long-run exit.

**Call — exact player copy:** Go to the Cost Ledger Desk in Business Workshop.

**Stop reason — exact player copy:** The supplier needs a measured loss before it closes the shift.

**Question card story setup — exact player copy:** Nico shows you the record: the housing measure has a funding source, but a local supplier says its current losses require an immediate shutdown. Calculate the loss at its best output before comparing closure with the costs that remain either way.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** A real loss is the start of the operating decision, not its conclusion.

**Data/readings/options — exact player copy:** At the supplier’s profit-maximizing output of 20 units daily, market price is $8 and average total cost is $10; the firm is a price taker.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Measure the loss",
    "units": "dollars per day",
    "labels": [
      "8",
      "10",
      "20",
      "2"
    ],
    "values": [
      8,
      10,
      20,
      2
    ],
    "slots": 3,
    "template": "{a} {b} {c}",
    "formula": "(b-a)*c",
    "correct": [
      0,
      1,
      2
    ],
    "target": 40,
    "tolerance": 0.05,
    "correctResult": 40
  },
  "answerText": "Cost exceeds price by 10−8 = $2 per unit; at 20 units the economic loss is 2×20 = $40 per day.",
  "wrongFeedback": [
    "−40 is signed profit, not the requested positive loss magnitude.",
    "160 is total revenue.",
    "200 is total cost rather than the difference."
  ]
}
```

**Question card prompt — exact player copy:** Submit the positive magnitude of the daily economic loss using (average total cost minus price) times output.

**Correct result:** 40; absolute tolerance 0.05 in the requested unit.

**Answer text:** Cost exceeds price by 10−8 = $2 per unit; at 20 units the economic loss is 2×20 = $40 per day.

**Why/mechanism:** Cost exceeds price by 10−8 = $2 per unit; at 20 units the economic loss is 2×20 = $40 per day. A real loss is the start of the operating decision, not its conclusion. Cost structure matters because a loss relative to all costs need not imply revenue falls below avoidable costs; the next comparison must inspect that distinction. −40 is signed profit, not the requested positive loss magnitude. 160 is total revenue.

**Misconception / wrong-path feedback:**

- −40 is signed profit, not the requested positive loss magnitude. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 160 is total revenue. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 200 is total cost rather than the difference. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Cost Ledger Desk stores this dated finding in text: Cost exceeds price by 10−8 = $2 per unit; at 20 units the economic loss is 2×20 = $40 per day.

**Unlock:** Stop 26.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** New firms are seeking permission to open nearby.

**Consistency bundle:**
```json
{
  "source_values": "At the supplier’s profit-maximizing output of 20 units daily, market price is $8 and average total cost is $10; the firm is a price taker.",
  "derived_values": "Cost exceeds price by 10−8 = $2 per unit; at 20 units the economic loss is 2×20 = $40 per day.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 40,
  "tolerance": 0.05,
  "answer_text_values": "Cost exceeds price by 10−8 = $2 per unit; at 20 units the economic loss is 2×20 = $40 per day.",
  "wrong_feedback_values": [
    "−40 is signed profit, not the requested positive loss magnitude.",
    "160 is total revenue.",
    "200 is total cost rather than the difference."
  ],
  "later_story_references": "New firms are seeking permission to open nearby"
}
```

## H2. Stop 26 — Read the avoidable costs

**Format/placement:** PROTOCOL, Business Workshop — Kitchen Planning Table.

**Metadata:** Concept: 7 — Cost measures and opportunity cost of ownership; Narrow concept: Read the avoidable costs; Keystone: Cost structure, Opportunity cost; Area: CM; Prerequisites: 1, 6; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the supplier should operate during the current month.

**Actual mission answer — authoring only:** Keep the supplier operating this month while reviewing long-run exit.

**Call — exact player copy:** Go to the Kitchen Planning Table in Business Workshop.

**Stop reason — exact player copy:** A shutdown choice changes some costs and leaves others intact.

**Question card story setup — exact player copy:** Nico shows you the record: the supplier’s loss is confirmed, yet the lease remains due even if no goods leave the workshop this month. Separate the avoidable costs from that commitment before deciding whether closure would improve the owner’s position.

**Prior result displayed in mission log:** Cost exceeds price by 10−8 = $2 per unit; at 20 units the economic loss is 2×20 = $40 per day.

**Question card story-science connection — exact player copy:** The owner needs the cost that changes with shutdown.

**Data/readings/options — exact player copy:** For 20 units the supplier has total variable cost $100 and fixed cost $100; its fixed cost is unavoidable this month.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "Total variable cost divided by 20 units"
    },
    {
      "id": "e2",
      "label": "Total fixed cost divided by 20 units"
    },
    {
      "id": "e3",
      "label": "All costs divided by 20 units"
    },
    {
      "id": "e4",
      "label": "Stopping all production this month"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "AVC is $5 per unit"
    },
    {
      "id": "r2",
      "label": "AFC is $5 per unit"
    },
    {
      "id": "r3",
      "label": "ATC is $10 per unit"
    },
    {
      "id": "r4",
      "label": "The $100 fixed cost remains"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "100/20 gives variable cost per unit. The other 100/20 is fixed cost per unit. Total cost is 200, so cost per unit is 10. Shutdown eliminates variable costs here but not the lease. The owner needs the cost that changes with shutdown. All three average measures use the same output denominator but different numerators; only the avoidable part changes with current closure, which is why a loss alone cannot settle shutdown.",
  "answerText": "100/20 gives variable cost per unit. The other 100/20 is fixed cost per unit. Total cost is 200, so cost per unit is 10. Shutdown eliminates variable costs here but not the lease.",
  "rebuttals": {
    "e1": "100/20 gives variable cost per unit.",
    "e2": "The other 100/20 is fixed cost per unit.",
    "e3": "Total cost is 200, so cost per unit is 10.",
    "e4": "Shutdown eliminates variable costs here but not the lease."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"Total variable cost divided by 20 units": "AVC is $5 per unit", "Total fixed cost divided by 20 units": "AFC is $5 per unit", "All costs divided by 20 units": "ATC is $10 per unit", "Stopping all production this month": "The $100 fixed cost remains"}; exact selection or mapping required.

**Answer text:** 100/20 gives variable cost per unit. The other 100/20 is fixed cost per unit. Total cost is 200, so cost per unit is 10. Shutdown eliminates variable costs here but not the lease.

**Why/mechanism:** 100/20 gives variable cost per unit. The other 100/20 is fixed cost per unit. Total cost is 200, so cost per unit is 10. Shutdown eliminates variable costs here but not the lease. The owner needs the cost that changes with shutdown. All three average measures use the same output denominator but different numerators; only the avoidable part changes with current closure, which is why a loss alone cannot settle shutdown.

**Misconception / wrong-path feedback:**

- 100/20 gives variable cost per unit. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The other 100/20 is fixed cost per unit. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Total cost is 200, so cost per unit is 10. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Shutdown eliminates variable costs here but not the lease. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Kitchen Planning Table stores this dated finding in text: 100/20 gives variable cost per unit. The other 100/20 is fixed cost per unit. Total cost is 200, so cost per unit is 10. Shutdown eliminates variable costs here but not the lease.

**Unlock:** Stop 27.

**Retrieval:** Use the prior mission log and concepts [1, 6]; the prior-result line states the immediate dependency.

**Later payoff:** New firms are seeking permission to open nearby.

**Consistency bundle:**
```json
{
  "source_values": "For 20 units the supplier has total variable cost $100 and fixed cost $100; its fixed cost is unavoidable this month.",
  "derived_values": "100/20 gives variable cost per unit. The other 100/20 is fixed cost per unit. Total cost is 200, so cost per unit is 10. Shutdown eliminates variable costs here but not the lease.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "Total variable cost divided by 20 units": "AVC is $5 per unit",
    "Total fixed cost divided by 20 units": "AFC is $5 per unit",
    "All costs divided by 20 units": "ATC is $10 per unit",
    "Stopping all production this month": "The $100 fixed cost remains"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "100/20 gives variable cost per unit. The other 100/20 is fixed cost per unit. Total cost is 200, so cost per unit is 10. Shutdown eliminates variable costs here but not the lease.",
  "wrong_feedback_values": [
    "100/20 gives variable cost per unit.",
    "The other 100/20 is fixed cost per unit.",
    "Total cost is 200, so cost per unit is 10.",
    "Shutdown eliminates variable costs here but not the lease."
  ],
  "later_story_references": "New firms are seeking permission to open nearby"
}
```

## H3. Stop 27 — Compare closing with staying open

**Format/placement:** VERIFY, Civic Advice Office — Hearing Table.

**Metadata:** Concept: 11 — Competitive firm output and shutdown; Narrow concept: Compare closing with staying open; Keystone: Cost structure, Marginal analysis; Area: T; Prerequisites: 6, 7; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** operated; First, calculate and commit the daily advantage of operating over shutdown using revenue minus avoidable variable cost. Then run the Hearing Table, measure the loss avoided, and select whether it matches; no restoration or second reading is required.

**Briefing decision advanced:** whether the supplier should operate during the current month.

**Actual mission answer — authoring only:** Keep the supplier operating this month while reviewing long-run exit.

**Call — exact player copy:** Go to the Hearing Table in Civic Advice Office.

**Stop reason — exact player copy:** The test compares closure with operation under the same lease.

**Question card story setup — exact player copy:** Mara shows you the record: the ledger now shows which payments disappear with production and which remain, making the two operating choices directly comparable. Test the advantage of staying open before the council accepts the supplier’s threatened loss of service.

**Prior result displayed in mission log:** 100/20 gives variable cost per unit. The other 100/20 is fixed cost per unit. Total cost is 200, so cost per unit is 10. Shutdown eliminates variable costs here but not the lease.

**Question card story-science connection — exact player copy:** The comparison protects current supplies without promising permanent profitability.

**Data/readings/options — exact player copy:** At the current best output, revenue is $160, variable cost $100 and unavoidable fixed cost $100 daily; keep price and the lease fixed.

**Format-specific interaction block:**

```json
{
  "verify": {
    "quantity": "Compare closing with staying open",
    "units": "dollars per day",
    "predictionRange": {
      "min": 0,
      "max": 200,
      "step": 1
    },
    "truth": 60,
    "tolerance": 0.05,
    "measurement": {
      "label": "Run trial and read result",
      "cost": 1,
      "units": "trial credit"
    },
    "measurementBudget": 2,
    "conclusions": [
      "Prediction matches the trial",
      "Prediction does not match the trial"
    ],
    "correctConclusion": "Prediction matches the trial",
    "requiredSequence": [
      "calculate_commit",
      "operate",
      "measure",
      "interpret"
    ],
    "initialPrediction": null,
    "locks": {
      "operate": "prediction committed",
      "measure": "trial operated",
      "interpret": "reading collected"
    }
  },
  "answerText": "Operating contributes 160−100 = $60 toward fixed costs: its $40 loss is $60 smaller than shutdown’s $100 loss.",
  "wrongFeedback": [
    "40 is the operating loss, not the advantage.",
    "100 is the shutdown loss.",
    "160 ignores variable costs."
  ]
}
```

**Question card prompt — exact player copy:** First, calculate and commit the daily advantage of operating over shutdown using revenue minus avoidable variable cost. Then run the Hearing Table, measure the loss avoided, and select whether it matches; no restoration or second reading is required.

**Correct result:** 60; absolute tolerance 0.05 in the requested unit.

**Answer text:** Operating contributes 160−100 = $60 toward fixed costs: its $40 loss is $60 smaller than shutdown’s $100 loss.

**Why/mechanism:** Operating contributes 160−100 = $60 toward fixed costs: its $40 loss is $60 smaller than shutdown’s $100 loss. The comparison protects current supplies without promising permanent profitability. Cost structure separates the avoidable wage and materials bill from the unchanged current lease; marginal analysis asks which choice leaves the owner less badly off today. 40 is the operating loss, not the advantage. 100 is the shutdown loss. 160 ignores variable costs.

**Misconception / wrong-path feedback:**

- 40 is the operating loss, not the advantage. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 100 is the shutdown loss. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 160 ignores variable costs. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Hearing Table stores this dated finding in text: Operating contributes 160−100 = $60 toward fixed costs: its $40 loss is $60 smaller than shutdown’s $100 loss.

**Unlock:** Stop 28.

**Retrieval:** Use the prior mission log and concepts [6, 7]; the prior-result line states the immediate dependency.

**Later payoff:** New firms are seeking permission to open nearby.

**Consistency bundle:**
```json
{
  "source_values": "At the current best output, revenue is $160, variable cost $100 and unavoidable fixed cost $100 daily; keep price and the lease fixed.",
  "derived_values": "Operating contributes 160−100 = $60 toward fixed costs: its $40 loss is $60 smaller than shutdown’s $100 loss.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": 60,
  "correct_result": 60,
  "tolerance": 0.05,
  "answer_text_values": "Operating contributes 160−100 = $60 toward fixed costs: its $40 loss is $60 smaller than shutdown’s $100 loss.",
  "wrong_feedback_values": [
    "40 is the operating loss, not the advantage.",
    "100 is the shutdown loss.",
    "160 ignores variable costs."
  ],
  "later_story_references": "New firms are seeking permission to open nearby"
}
```

## H4. Stop 28 — Keep the shift or close it

**Format/placement:** CHOICE, Mara Velez at the Town Map in Civic Advice Office.

**Metadata:** Concept: 11 — Competitive firm output and shutdown; Narrow concept: Keep the shift or close it; Keystone: Cost structure, Marginal analysis; Area: T; Prerequisites: 6, 7; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the supplier should operate during the current month.

**Actual mission answer — authoring only:** Operate this month and review exit when the lease expires.

**Call — exact player copy:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Town Map.

**Stop reason — exact player copy:** The owner must choose today’s shift and preserve next month’s review.

**Question card story setup — exact player copy:** Mara shows you the record: the trial shows that continued production covers part of the unavoidable lease, even though total economic profit stays negative. Decide what the supplier should do this month before treating a temporary operating choice as a permanent commitment.

**Prior result displayed in mission log:** Operating contributes 160−100 = $60 toward fixed costs: its $40 loss is $60 smaller than shutdown’s $100 loss.

**Question card story-science connection — exact player copy:** Short-run continuity and long-run sustainability require different comparisons.

**Data/readings/options — exact player copy:** Operating loses $40 daily; shutdown loses the unavoidable $100 lease charge; market price $8 exceeds AVC $5 at the best output. The lease can be reconsidered next month.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Operate this month and review exit when the lease expires",
    "Close this month because revenue fails to cover total economic cost",
    "Operate after lease renewal because current sales revenue remains positive",
    "Exclude the lease from total cost because it cannot be avoided now"
  ],
  "answer": "Operate this month and review exit when the lease expires",
  "why": "Operating minimizes the current loss, because revenue covers variable cost and part of the unavoidable lease. A later exit review is still needed when the lease can be avoided and all resources regain alternative uses. Short-run continuity and long-run sustainability require different comparisons. Shutdown loses $100 rather than $40 this month. Positive revenue alone does not cover all opportunity costs. The lease is a cost; it is simply unchanged by today’s shutdown choice.",
  "rebuttals": {
    "Close this month because revenue fails to cover total economic cost": "Shutdown loses $100 rather than $40 this month.",
    "Operate after lease renewal because current sales revenue remains positive": "Positive revenue alone does not cover all opportunity costs.",
    "Exclude the lease from total cost because it cannot be avoided now": "The lease is a cost; it is simply unchanged by today’s shutdown choice."
  },
  "answerText": "Operating minimizes the current loss, because revenue covers variable cost and part of the unavoidable lease. A later exit review is still needed when the lease can be avoided and all resources regain alternative uses."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Operate this month and review exit when the lease expires"; exact selection or mapping required.

**Answer text:** Operating minimizes the current loss, because revenue covers variable cost and part of the unavoidable lease. A later exit review is still needed when the lease can be avoided and all resources regain alternative uses.

**Why/mechanism:** Operating minimizes the current loss, because revenue covers variable cost and part of the unavoidable lease. A later exit review is still needed when the lease can be avoided and all resources regain alternative uses. Short-run continuity and long-run sustainability require different comparisons. Shutdown loses $100 rather than $40 this month. Positive revenue alone does not cover all opportunity costs. The lease is a cost; it is simply unchanged by today’s shutdown choice.

**Misconception / wrong-path feedback:**

- Shutdown loses $100 rather than $40 this month. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Positive revenue alone does not cover all opportunity costs. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The lease is a cost; it is simply unchanged by today’s shutdown choice. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: Operating minimizes the current loss, because revenue covers variable cost and part of the unavoidable lease. A later exit review is still needed when the lease can be avoided and all resources regain alternative uses.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [6, 7]; the prior-result line states the immediate dependency.

**Later payoff:** New firms are seeking permission to open nearby.

**Consistency bundle:**
```json
{
  "source_values": "Operating loses $40 daily; shutdown loses the unavoidable $100 lease charge; market price $8 exceeds AVC $5 at the best output. The lease can be reconsidered next month.",
  "derived_values": "Operating minimizes the current loss, because revenue covers variable cost and part of the unavoidable lease. A later exit review is still needed when the lease can be avoided and all resources regain alternative uses.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Operate this month and review exit when the lease expires",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Operating minimizes the current loss, because revenue covers variable cost and part of the unavoidable lease. A later exit review is still needed when the lease can be avoided and all resources regain alternative uses.",
  "wrong_feedback_values": [
    "Shutdown loses $100 rather than $40 this month.",
    "Positive revenue alone does not cover all opportunity costs.",
    "The lease is a cost; it is simply unchanged by today’s shutdown choice."
  ],
  "later_story_references": "New firms are seeking permission to open nearby"
}
```

## I. Mission outcome

**Delivery piece 7:** The supplier shift plan. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Nico Bell:** “Closing saves ingredients, but the lease still lands on my desk.”

**Mission decision:** Keep the supplier open this month and review exit next month. Staying open loses $40; closing loses $100. The shift goes ahead. New firms now want space to open.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 7 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 16:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The supplier keeps its current shift and marks its lease for review.

**Automatic bar change:** Plan Evidence +1 | Service Continuity +3 | Field Budget -1 | Public Accountability +1

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [1, 0, 3, 0]; bars [94, 100, 94, 93]; bank 0, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** Yet Nico wants to block new kitchens; the entry he welcomed for supplies now threatens his own profit.

## K. Quick concept review

- A firm may keep operating with a loss if sales cover the costs it can avoid today.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** Short-run continuity and long-run sustainability require different comparisons.


## L. GO DEEPER — A loss does not settle the shutdown choice

**Secondary briefing — exact player copy:** Decide whether a firm should keep operating for a specified period. Then look farther ahead, where contracts can end and new firms can enter. Keep accounting profit and economic profit separate.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- Profit equals revenue minus total cost. Economic cost includes the owner’s forgone salary or other implicit opportunity costs.
- Short-run shutdown compares the best operating revenue with avoidable variable cost. Unavoidable fixed cost is owed even if the firm closes.
- At price equal to minimum average variable cost, operating and shutdown yield the same fixed-cost loss in the simple model. Below that threshold, shutdown limits the loss.
- Free entry responds to positive economic profit by expanding market supply. Long-run entry or exit is distinct from closing a shift while a fixed bill remains due.

### BT-GD-M07-Q1

**Question:** A price-taking firm sells 20 units at $8. AVC is $6 and ATC is $10 at that output. What is economic profit?

- **A.** A $40 loss
- **B.** A $40 profit
- **C.** A $120 loss
- **D.** Zero

**Correct key:** A

**Hint:** Compare revenue with avoidable costs for a short-run choice; include opportunity costs when computing economic profit.

**Worked explanation — reveal on request:** Revenue is 160 and total cost is 200, giving profit −40.

**Feedback A:** Correct. Revenue is 160 and total cost is 200, giving profit −40.

**Feedback B:** Reconsider. Forty is revenue above variable cost, before fixed costs.

**Feedback C:** Reconsider. One hundred twenty is total variable cost, not loss.

**Feedback D:** Reconsider. Price is below average total cost.


### BT-GD-M07-Q2

**Question:** At its best positive output a competitive firm has P=$8, AVC=$6 and ATC=$10. Fixed costs are unavoidable this week. Should it operate this week?

- **A.** No, every loss means immediate shutdown
- **B.** Yes, because price exceeds ATC
- **C.** No, because marginal revenue is zero
- **D.** Yes, because it covers variable cost and part of fixed cost

**Correct key:** D

**Hint:** Compare revenue with avoidable costs for a short-run choice; include opportunity costs when computing economic profit.

**Worked explanation — reveal on request:** Operating contributes two dollars per unit toward a bill it owes even if closed.

**Feedback A:** Reconsider. Closing does not avoid the stated fixed cost.

**Feedback B:** Reconsider. Price is eight and ATC ten; this inequality is false.

**Feedback C:** Reconsider. A price-taking seller earns the product price on each extra unit.

**Feedback D:** Correct. Operating contributes two dollars per unit toward a bill it owes even if closed.


### BT-GD-M07-Q3

**Question:** A firm can earn at most $90 revenue while incurring $110 avoidable operating costs. An additional $50 fixed bill is unavoidable. What is the short-run choice?

- **A.** Operate because total cost is $160
- **B.** Close and pay nothing
- **C.** Close and pay the $50 fixed bill
- **D.** Operate because revenue is positive

**Correct key:** C

**Hint:** Compare revenue with avoidable costs for a short-run choice; include opportunity costs when computing economic profit.

**Worked explanation — reveal on request:** Operating loses seventy dollars; closing loses fifty.

**Feedback A:** Reconsider. That total implies a larger loss than closing.

**Feedback B:** Reconsider. The stated fixed bill remains due.

**Feedback C:** Correct. Operating loses seventy dollars; closing loses fifty.

**Feedback D:** Reconsider. Positive revenue need not cover avoidable costs.


### BT-GD-M07-Q4

**Question:** A firm earns $30,000 accounting profit but the owner's forgone salary is $35,000, with no other implicit costs. What is economic profit?

- **A.** Zero
- **B.** A $5,000 loss
- **C.** A $65,000 profit
- **D.** A $30,000 profit

**Correct key:** B

**Hint:** Compare revenue with avoidable costs for a short-run choice; include opportunity costs when computing economic profit.

**Worked explanation — reveal on request:** Economic profit subtracts the implicit forgone salary from accounting profit.

**Feedback A:** Reconsider. Thirty thousand and thirty-five thousand are not equal.

**Feedback B:** Correct. Economic profit subtracts the implicit forgone salary from accounting profit.

**Feedback C:** Reconsider. Forgone earnings are a cost, not added revenue.

**Feedback D:** Reconsider. That omits the implicit opportunity cost.


### BT-GD-M07-Q5

**Question:** In a competitive market with free entry, existing firms earn persistent positive economic profits. What adjustment is predicted?

- **A.** Entry expands market supply and puts downward pressure on price
- **B.** Existing firms can jointly fix price without consequence
- **C.** Supply contracts because profits are high
- **D.** Every firm's demand becomes upward sloping

**Correct key:** A

**Hint:** Compare revenue with avoidable costs for a short-run choice; include opportunity costs when computing economic profit.

**Worked explanation — reveal on request:** New firms are attracted by profit until entry erodes it under the model's assumptions.

**Feedback A:** Correct. New firms are attracted by profit until entry erodes it under the model's assumptions.

**Feedback B:** Reconsider. That replaces competition with coordination, not the stated model.

**Feedback C:** Reconsider. High profits encourage entry rather than market withdrawal.

**Feedback D:** Reconsider. A price taker still faces the market price.


### BT-GD-M07-Q6

**Question:** Price equals minimum AVC but lies below ATC. At the relevant output, how does operating compare with shutting down for this period?

- **A.** Operating earns zero economic profit
- **B.** Shutting down avoids the fixed cost
- **C.** Operating is strictly worse
- **D.** Both lose the unavoidable fixed cost

**Correct key:** D

**Hint:** Compare revenue with avoidable costs for a short-run choice; include opportunity costs when computing economic profit.

**Worked explanation — reveal on request:** Revenue exactly covers variable cost, leaving the same fixed loss either way.

**Feedback A:** Reconsider. Fixed costs are not covered.

**Feedback B:** Reconsider. It is explicitly unavoidable in this period.

**Feedback C:** Reconsider. At equality, both choices produce the same loss in this model.

**Feedback D:** Correct. Revenue exactly covers variable cost, leaving the same fixed loss either way.


# Mission 8 — A STREET FULL OF SIGNS

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 8 OF 15

**Card title:** A STREET FULL OF SIGNS

**Go now:** Go to Business Workshop and meet Nico Bell, diner owner, at the Cost Ledger Desk.

**Card body:** The supplier stays open, but new food stalls want space. Nico likes cheap supplies yet fears new rivals. Today you decide if the town should let the stalls in. By the end of the mission, you will test the case for fair entry rules.

**Objective:** Decide whether the town should block new food sellers to protect current profits.

**Stakes — exact player copy:** You decide whether new food sellers can enter. Nico fears lost profit; residents need more options for meals.

### Worth knowing first — exact player copy

#### Glossary terms

Perfect competition: Many price-taking firms sell identical goods with open entry and exit.

Monopolistic competition: Many firms sell differentiated products with open entry and exit.

Economies of scale: Long-run average cost falls as planned output grows.

Diseconomies of scale: Long-run average cost rises as planned output grows.

Normal profit: Zero economic profit after all opportunity costs are covered.

#### Primer concepts

- Entry changes competitive pressure, while different products and plant sizes change costs.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** Economic profit = total revenue − explicit costs − implicit costs  
**What it is for:** Distinguish a return to owned resources from above-normal gain.  
**Symbols:** All terms are dollars per period; implicit costs are forgone alternatives.  
**Why this campaign needs it:** Entry arguments must identify what income is actually threatened.

**Required equation or concept use — authoring/render check:** Stop 29: 180−120−40 = $20 economic profit.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. Revenue 95 minus explicit costs 55 and implicit costs 25 gives economic profit 15.

2. If all inputs can vary and average cost falls from 12 to 9 as plant output doubles, the firm has economies of scale over that range.

3. If worker crowding lowers extra output while equipment is fixed, the issue is diminishing marginal returns, not long-run diseconomies.

4. Profit attracts entry in a competitive market; market supply increases and price tends to fall, other things equal.

5. A differentiated café can earn zero economic profit while price remains above marginal cost because buyers do not treat every café as identical.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

The supplier stays open for now, and new food sellers are asking to enter town. The four findings establish: Which profit is at risk → Tell four firm situations apart → What entry changes → Let the new kitchens open. New vendor permits appear beside the diner’s old menu. Workers ask whether new employers will change the wage offers.

## C. Designer intent — not shown to player

The mission moves from cost measures and opportunity cost of ownership to a concrete recommendation: Allow the proposed food sellers to enter and review service quality separately. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M8-A — On arrival at Business Workshop

**Location:** Business Workshop.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Nico Bell, diner owner:** “The new stalls need workers; the old stalls need customers.”

**Unlocks:** Stop 29.

### Beat BT-M8-1 — After Stop 29

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** 180−120−40 = $20 economic profit; the $60 accounting margin includes compensation for the owner’s forgone outside work.

**Unlocks:** Stop 30.

**Dialogue bubble — Nico Bell:** “New kitchens could take the profit I hoped would pay for my stove.”

**Dialogue bubble — Leila Moss, radio:** “You asked for more suppliers when their prices hurt you. New diners deserve the same hearing.”

### Beat BT-M8-2 — After Stop 30

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Homogeneity and price-taking motivate the competitive benchmark. Product differences allow some price discretion despite entry. Falling long-run average cost defines economies of scale. Rising long-run average cost defines diseconomies, not short-run crowding. Take this result to Housing and Work Office; its original records are needed for what entry changes.

**Unlocks:** Stop 31.

**Dialogue bubble — Nico Bell:** “I cannot ask for open entry at the back door and close it at the front. Keep service checks fair for all of us.”

### Beat BT-M8-3 — After Stop 31

**Location:** Housing and Work Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Positive economic profit attracts new firms; their entry increases market supply, which reduces market price and erodes economic profit toward zero. Normal profit still compensates opportunity costs.

**Unlocks:** Stop 32.

### Beat BT-M8-4 — After Stop 32

**Location:** Housing and Work Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Allow the proposed food sellers to enter and review service quality separately

**Unlocks:** Mission outcome.

### Beat BT-M8-E — At mission end

**Location:** Housing and Work Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** New vendor permit placards appear at the existing supply shelves; the diner’s complaint is logged.

**Panel/HUD text:** New vendor permit placards appear at the existing supply shelves; the diner’s complaint is logged. Workers ask whether new employers will change the wage offers.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Nico Bell:** “Their permits are beside my menu. I asked for this rule when I was the buyer; now I have to live with it as a seller.”


## E. Location plan

**2 locations:** Business Workshop → Housing and Work Office.

Stop 29: Business Workshop / Cost Ledger Desk | Stop 30: Business Workshop / Kitchen Planning Table | Stop 31: Housing and Work Office / Lease Desk | Stop 32: Housing and Work Office / Job Board. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Nico Bell, diner owner:** owns the original records in Business Workshop and must explain the recommendation to the people affected.

**Leila Moss, housing cooperative organizer:** owns the original records in Housing and Work Office and must explain the recommendation to the people affected.

New vendor permit placards appear at the existing supply shelves; the diner’s complaint is logged. Workers ask whether new employers will change the wage offers.

## G. Key concepts, explained here

- **Perfect competition:** Many price-taking firms sell identical goods with open entry and exit.

- **Monopolistic competition:** Many firms sell differentiated products with open entry and exit.

- **Economies of scale:** Long-run average cost falls as planned output grows.

- **Diseconomies of scale:** Long-run average cost rises as planned output grows.

- **Normal profit:** Zero economic profit after all opportunity costs are covered.

## H1. Stop 29 — Which profit is at risk

**Format/placement:** BALLPARK, Business Workshop — Cost Ledger Desk.

**Metadata:** Concept: 7 — Cost measures and opportunity cost of ownership; Narrow concept: Which profit is at risk; Keystone: Cost structure, Opportunity cost; Area: CM; Prerequisites: 1, 6; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit economic profit after both cost types.

**Briefing decision advanced:** whether the town should block new food sellers to protect current profits.

**Actual mission answer — authoring only:** Allow the proposed food sellers to enter and review service quality separately.

**Call — exact player copy:** Go to the Cost Ledger Desk in Business Workshop.

**Stop reason — exact player copy:** The entry dispute needs a clear measure of the profit at stake.

**Question card story setup — exact player copy:** Nico shows you the record: the supplier keeps its current shift, while new vendors request stalls and the diner owner asks the town to block them. Separate true economic profit from payment for the owner’s alternatives before evaluating the protection claim.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** An incumbent cannot count every accounting dollar as an excess return threatened by entry.

**Data/readings/options — exact player copy:** A new food vendor expects daily revenue $180, explicit costs $120 and a forgone outside earning of $40 from its owner’s time.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Which profit is at risk",
    "units": "dollars per day",
    "labels": [
      "180",
      "120",
      "40",
      "60"
    ],
    "values": [
      180,
      120,
      40,
      60
    ],
    "slots": 3,
    "template": "{a} {b} {c}",
    "formula": "a-b-c",
    "correct": [
      0,
      1,
      2
    ],
    "target": 20,
    "tolerance": 0.05,
    "correctResult": 20
  },
  "answerText": "180−120−40 = $20 economic profit; the $60 accounting margin includes compensation for the owner’s forgone outside work.",
  "wrongFeedback": [
    "60 ignores implicit cost.",
    "40 reports outside earnings only.",
    "180 ignores all resource costs."
  ]
}
```

**Question card prompt — exact player copy:** Submit economic profit after both cost types.

**Correct result:** 20; absolute tolerance 0.05 in the requested unit.

**Answer text:** 180−120−40 = $20 economic profit; the $60 accounting margin includes compensation for the owner’s forgone outside work.

**Why/mechanism:** 180−120−40 = $20 economic profit; the $60 accounting margin includes compensation for the owner’s forgone outside work. An incumbent cannot count every accounting dollar as an excess return threatened by entry. Opportunity cost counts the owner’s foregone alternative even without a cash payment; positive economic profit is the remainder after paying for that resource too. 60 ignores implicit cost. 40 reports outside earnings only. 180 ignores all resource costs.

**Misconception / wrong-path feedback:**

- 60 ignores implicit cost. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 40 reports outside earnings only. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 180 ignores all resource costs. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Cost Ledger Desk stores this dated finding in text: 180−120−40 = $20 economic profit; the $60 accounting margin includes compensation for the owner’s forgone outside work.

**Unlock:** Stop 30.

**Retrieval:** Use the prior mission log and concepts [1, 6]; the prior-result line states the immediate dependency.

**Later payoff:** Workers ask whether new employers will change the wage offers.

**Consistency bundle:**
```json
{
  "source_values": "A new food vendor expects daily revenue $180, explicit costs $120 and a forgone outside earning of $40 from its owner’s time.",
  "derived_values": "180−120−40 = $20 economic profit; the $60 accounting margin includes compensation for the owner’s forgone outside work.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 20,
  "tolerance": 0.05,
  "answer_text_values": "180−120−40 = $20 economic profit; the $60 accounting margin includes compensation for the owner’s forgone outside work.",
  "wrong_feedback_values": [
    "60 ignores implicit cost.",
    "40 reports outside earnings only.",
    "180 ignores all resource costs."
  ],
  "later_story_references": "Workers ask whether new employers will change the wage offers"
}
```

## H2. Stop 30 — Tell four firm situations apart

**Format/placement:** PROTOCOL, Business Workshop — Kitchen Planning Table.

**Metadata:** Concept: 13 — Differentiation and economies of scale; Narrow concept: Tell four firm situations apart; Keystone: Competition and entry, Cost structure; Area: CM; Prerequisites: 7, 11; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the town should block new food sellers to protect current profits.

**Actual mission answer — authoring only:** Allow the proposed food sellers to enter and review service quality separately.

**Call — exact player copy:** Go to the Kitchen Planning Table in Business Workshop.

**Stop reason — exact player copy:** The town needs the right firm model before using an entry forecast.

**Question card story setup — exact player copy:** Nico shows you the record: the profit calculation includes the owner’s forgone earnings, but the proposed firms sell different goods with different equipment needs. Classify those business conditions before assuming that one market model or one cost pattern fits them all.

**Prior result displayed in mission log:** 180−120−40 = $20 economic profit; the $60 accounting margin includes compensation for the owner’s forgone outside work.

**Question card story-science connection — exact player copy:** The town should not promise every entrant identical costs or market power.

**Data/readings/options — exact player copy:** Read each independent business record; long-run means all inputs can vary.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "Identical fasteners, many sellers, easy entry"
    },
    {
      "id": "e2",
      "label": "Distinctive menus, many sellers, easy entry"
    },
    {
      "id": "e3",
      "label": "Larger plants have lower cost per meal"
    },
    {
      "id": "e4",
      "label": "Larger plants have higher cost per meal"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Perfectly competitive benchmark"
    },
    {
      "id": "r2",
      "label": "Monopolistically competitive benchmark"
    },
    {
      "id": "r3",
      "label": "Economies of scale over that range"
    },
    {
      "id": "r4",
      "label": "Diseconomies of scale over that range"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "Homogeneity and price-taking motivate the competitive benchmark. Product differences allow some price discretion despite entry. Falling long-run average cost defines economies of scale. Rising long-run average cost defines diseconomies, not short-run crowding. The town should not promise every entrant identical costs or market power. Scale comparisons require allowing all inputs to vary, whereas short-run crowding holds equipment fixed; product differentiation changes firms’ demand without eliminating the possibility of entry. Entry can reduce above-normal returns without eliminating product differences.",
  "answerText": "Homogeneity and price-taking motivate the competitive benchmark. Product differences allow some price discretion despite entry. Falling long-run average cost defines economies of scale. Rising long-run average cost defines diseconomies, not short-run crowding.",
  "rebuttals": {
    "e1": "Homogeneity and price-taking motivate the competitive benchmark.",
    "e2": "Product differences allow some price discretion despite entry.",
    "e3": "Falling long-run average cost defines economies of scale.",
    "e4": "Rising long-run average cost defines diseconomies, not short-run crowding."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"Identical fasteners, many sellers, easy entry": "Perfectly competitive benchmark", "Distinctive menus, many sellers, easy entry": "Monopolistically competitive benchmark", "Larger plants have lower cost per meal": "Economies of scale over that range", "Larger plants have higher cost per meal": "Diseconomies of scale over that range"}; exact selection or mapping required.

**Answer text:** Homogeneity and price-taking motivate the competitive benchmark. Product differences allow some price discretion despite entry. Falling long-run average cost defines economies of scale. Rising long-run average cost defines diseconomies, not short-run crowding.

**Why/mechanism:** Homogeneity and price-taking motivate the competitive benchmark. Product differences allow some price discretion despite entry. Falling long-run average cost defines economies of scale. Rising long-run average cost defines diseconomies, not short-run crowding. The town should not promise every entrant identical costs or market power. Scale comparisons require allowing all inputs to vary, whereas short-run crowding holds equipment fixed; product differentiation changes firms’ demand without eliminating the possibility of entry. Entry can reduce above-normal returns without eliminating product differences.

**Misconception / wrong-path feedback:**

- Homogeneity and price-taking motivate the competitive benchmark. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Product differences allow some price discretion despite entry. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Falling long-run average cost defines economies of scale. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Rising long-run average cost defines diseconomies, not short-run crowding. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Kitchen Planning Table stores this dated finding in text: Homogeneity and price-taking motivate the competitive benchmark. Product differences allow some price discretion despite entry. Falling long-run average cost defines economies of scale. Rising long-run average cost defines diseconomies, not short-run crowding.

**Unlock:** Stop 31.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** Workers ask whether new employers will change the wage offers.

**Consistency bundle:**
```json
{
  "source_values": "Read each independent business record; long-run means all inputs can vary.",
  "derived_values": "Homogeneity and price-taking motivate the competitive benchmark. Product differences allow some price discretion despite entry. Falling long-run average cost defines economies of scale. Rising long-run average cost defines diseconomies, not short-run crowding.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "Identical fasteners, many sellers, easy entry": "Perfectly competitive benchmark",
    "Distinctive menus, many sellers, easy entry": "Monopolistically competitive benchmark",
    "Larger plants have lower cost per meal": "Economies of scale over that range",
    "Larger plants have higher cost per meal": "Diseconomies of scale over that range"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Homogeneity and price-taking motivate the competitive benchmark. Product differences allow some price discretion despite entry. Falling long-run average cost defines economies of scale. Rising long-run average cost defines diseconomies, not short-run crowding.",
  "wrong_feedback_values": [
    "Homogeneity and price-taking motivate the competitive benchmark.",
    "Product differences allow some price discretion despite entry.",
    "Falling long-run average cost defines economies of scale.",
    "Rising long-run average cost defines diseconomies, not short-run crowding."
  ],
  "later_story_references": "Workers ask whether new employers will change the wage offers"
}
```

## H3. Stop 31 — What entry changes

**Format/placement:** SEQUENCE, Housing and Work Office — Lease Desk.

**Metadata:** Concept: 12 — Entry, exit and long-run adjustment; Narrow concept: What entry changes; Keystone: Competition and entry, Price incentives; Area: P; Prerequisites: 4, 11; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Arrange the four event cards in causal order and submit the complete sequence.

**Briefing decision advanced:** whether the town should block new food sellers to protect current profits.

**Actual mission answer — authoring only:** Allow the proposed food sellers to enter and review service quality separately.

**Call — exact player copy:** Go to the Lease Desk in Housing and Work Office.

**Stop reason — exact player copy:** The forecast must connect entry to supply and prices.

**Question card story setup — exact player copy:** Leila shows you the record: the business records separate identical products from distinctive menus, giving the town a clear competitive benchmark to use carefully. Reconstruct how entry changes that benchmark before deciding whether existing profits justify keeping qualified sellers out.

**Prior result displayed in mission log:** Homogeneity and price-taking motivate the competitive benchmark. Product differences allow some price discretion despite entry. Falling long-run average cost defines economies of scale. Rising long-run average cost defines diseconomies, not short-run crowding.

**Question card story-science connection — exact player copy:** Entry can discipline prices while preserving payment for the owners’ alternative uses.

**Data/readings/options — exact player copy:** Assume a competitive fastener market with positive economic profit, free entry, unchanged demand and no scale economies; order the adjustment until profit no longer attracts entry.

**Format-specific interaction block:**

```json
{
  "cards": [
    {
      "id": "1",
      "label": "Positive economic profit attracts entrants"
    },
    {
      "id": "2",
      "label": "New firms expand market supply"
    },
    {
      "id": "3",
      "label": "The market price falls"
    },
    {
      "id": "4",
      "label": "Economic profit tends toward zero"
    }
  ],
  "order": [
    "1",
    "2",
    "3",
    "4"
  ],
  "axis": "causal order",
  "ends": [
    "First change",
    "Final effect"
  ],
  "constraints": "Assume a competitive fastener market with positive economic profit, free entry, unchanged demand and no scale economies; order the adjustment until profit no longer attracts entry.",
  "why": "Positive economic profit attracts new firms; their entry increases market supply, which reduces market price and erodes economic profit toward zero. Normal profit still compensates opportunity costs. Entry can discipline prices while preserving payment for the owners’ alternative uses. Supply cannot expand from entry before firms enter. With demand fixed, more supply lowers rather than raises price. Zero economic profit is the endpoint of adjustment, not the cause of the initial profit.",
  "answerText": "Positive economic profit attracts new firms; their entry increases market supply, which reduces market price and erodes economic profit toward zero. Normal profit still compensates opportunity costs.",
  "rebuttals": [
    "Supply cannot expand from entry before firms enter.",
    "With demand fixed, more supply lowers rather than raises price.",
    "Zero economic profit is the endpoint of adjustment, not the cause of the initial profit."
  ]
}
```

**Question card prompt — exact player copy:** Arrange the four event cards in causal order and submit the complete sequence.

**Correct result:** ["1", "2", "3", "4"]; exact selection or mapping required.

**Answer text:** Positive economic profit attracts new firms; their entry increases market supply, which reduces market price and erodes economic profit toward zero. Normal profit still compensates opportunity costs.

**Why/mechanism:** Positive economic profit attracts new firms; their entry increases market supply, which reduces market price and erodes economic profit toward zero. Normal profit still compensates opportunity costs. Entry can discipline prices while preserving payment for the owners’ alternative uses. Supply cannot expand from entry before firms enter. With demand fixed, more supply lowers rather than raises price. Zero economic profit is the endpoint of adjustment, not the cause of the initial profit.

**Misconception / wrong-path feedback:**

- Supply cannot expand from entry before firms enter. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- With demand fixed, more supply lowers rather than raises price. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Zero economic profit is the endpoint of adjustment, not the cause of the initial profit. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Lease Desk stores this dated finding in text: Positive economic profit attracts new firms; their entry increases market supply, which reduces market price and erodes economic profit toward zero. Normal profit still compensates opportunity costs.

**Unlock:** Stop 32.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** Workers ask whether new employers will change the wage offers.

**Consistency bundle:**
```json
{
  "source_values": "Assume a competitive fastener market with positive economic profit, free entry, unchanged demand and no scale economies; order the adjustment until profit no longer attracts entry.",
  "derived_values": "Positive economic profit attracts new firms; their entry increases market supply, which reduces market price and erodes economic profit toward zero. Normal profit still compensates opportunity costs.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": [
    "1",
    "2",
    "3",
    "4"
  ],
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Positive economic profit attracts new firms; their entry increases market supply, which reduces market price and erodes economic profit toward zero. Normal profit still compensates opportunity costs.",
  "wrong_feedback_values": [
    "Supply cannot expand from entry before firms enter.",
    "With demand fixed, more supply lowers rather than raises price.",
    "Zero economic profit is the endpoint of adjustment, not the cause of the initial profit."
  ],
  "later_story_references": "Workers ask whether new employers will change the wage offers"
}
```

## H4. Stop 32 — Let the new kitchens open

**Format/placement:** CHOICE, Leila Moss at the Job Board in Housing and Work Office.

**Metadata:** Concept: 12 — Entry, exit and long-run adjustment; Narrow concept: Let the new kitchens open; Keystone: Competition and entry, Price incentives; Area: P; Prerequisites: 4, 11; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the town should block new food sellers to protect current profits.

**Actual mission answer — authoring only:** Allow entry and assess service quality under a separate rule.

**Call — exact player copy:** Go to Housing and Work Office and meet Leila Moss, housing cooperative organizer, at the Job Board.

**Stop reason — exact player copy:** The permit rule applies to new sellers as well as old ones.

**Question card story setup — exact player copy:** Leila shows you the record: the entry forecast explains why above-normal returns can fall without owners working for nothing, and the proposed vendors meet the published conditions. Choose the permit response before the diner’s preference becomes an unsupported barrier to competitors.

**Prior result displayed in mission log:** Positive economic profit attracts new firms; their entry increases market supply, which reduces market price and erodes economic profit toward zero. Normal profit still compensates opportunity costs.

**Question card story-science connection — exact player copy:** The diner owner accepts new sellers after seeing that earlier calls for cheaper inputs used the same competition argument.

**Data/readings/options — exact player copy:** The proposed vendors meet the same published health and space requirements as incumbents; they offer differentiated menus and use vacant permitted stalls. The council’s rule is open entry unless a demonstrated external harm justifies a restriction.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Allow entry and treat different menus as one identical market product",
    "Allow entry and assess service quality under a separate rule",
    "Block entry and protect the existing firms’ positive economic profit",
    "Allow entry and forecast lasting economic profit for every new firm"
  ],
  "answer": "Allow entry and assess service quality under a separate rule",
  "why": "The evidence contains no violation of the entry rule. Competition may reduce incumbent economic profit and give buyers more options, while product differences mean the perfect-competition price-taking model is not exact for every café. The diner owner accepts new sellers after seeing that earlier calls for cheaper inputs used the same competition argument. Protecting incumbent profit alone is not the adopted external-harm test. Entry can erode economic profit and does not guarantee returns.",
  "rebuttals": {
    "Block entry and protect the existing firms’ positive economic profit": "Protecting incumbent profit alone is not the adopted external-harm test.",
    "Allow entry and forecast lasting economic profit for every new firm": "Entry can erode economic profit and does not guarantee returns.",
    "Allow entry and treat different menus as one identical market product": "Differentiated menus can give individual firms price discretion."
  },
  "answerText": "The evidence contains no violation of the entry rule. Competition may reduce incumbent economic profit and give buyers more options, while product differences mean the perfect-competition price-taking model is not exact for every café."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Allow entry and assess service quality under a separate rule"; exact selection or mapping required.

**Answer text:** The evidence contains no violation of the entry rule. Competition may reduce incumbent economic profit and give buyers more options, while product differences mean the perfect-competition price-taking model is not exact for every café.

**Why/mechanism:** The evidence contains no violation of the entry rule. Competition may reduce incumbent economic profit and give buyers more options, while product differences mean the perfect-competition price-taking model is not exact for every café. The diner owner accepts new sellers after seeing that earlier calls for cheaper inputs used the same competition argument. Protecting incumbent profit alone is not the adopted external-harm test. Entry can erode economic profit and does not guarantee returns.

**Misconception / wrong-path feedback:**

- Protecting incumbent profit alone is not the adopted external-harm test. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Entry can erode economic profit and does not guarantee returns. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Differentiated menus can give individual firms price discretion. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Job Board stores this dated finding in text: The evidence contains no violation of the entry rule. Competition may reduce incumbent economic profit and give buyers more options, while product differences mean the perfect-competition price-taking model is not exact for every café.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [4, 11]; the prior-result line states the immediate dependency.

**Later payoff:** Workers ask whether new employers will change the wage offers.

**Consistency bundle:**
```json
{
  "source_values": "The proposed vendors meet the same published health and space requirements as incumbents; they offer differentiated menus and use vacant permitted stalls. The council’s rule is open entry unless a demonstrated external harm justifies a restriction.",
  "derived_values": "The evidence contains no violation of the entry rule. Competition may reduce incumbent economic profit and give buyers more options, while product differences mean the perfect-competition price-taking model is not exact for every café.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Allow entry and assess service quality under a separate rule",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The evidence contains no violation of the entry rule. Competition may reduce incumbent economic profit and give buyers more options, while product differences mean the perfect-competition price-taking model is not exact for every café.",
  "wrong_feedback_values": [
    "Protecting incumbent profit alone is not the adopted external-harm test.",
    "Entry can erode economic profit and does not guarantee returns.",
    "Differentiated menus can give individual firms price discretion."
  ],
  "later_story_references": "Workers ask whether new employers will change the wage offers"
}
```

## I. Mission outcome

**Delivery piece 8:** The fair entry rule. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Leila Moss:** “The new stalls need workers; the old stalls need customers.”

**Mission decision:** Let the new food sellers enter under the same rules. They meet the health and space checks. New permits go up beside the old menus. Workers now ask what more jobs will pay.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 8 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 16:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** New vendor permits appear beside the diner’s old menu.

**Automatic bar change:** Plan Evidence +2 | Service Continuity +1 | Field Budget +1 | Public Accountability +2

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [1, 0, 2, 1]; bars [97, 100, 97, 96]; bank 0, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** Now Leila has more job offers to examine, but one large employer can still shape the wage.

## K. Quick concept review

- Entry changes competitive pressure, while different products and plant sizes change costs.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The diner owner accepts new sellers after seeing that earlier calls for cheaper inputs used the same competition argument.


## L. GO DEEPER — Competition with different products

**Secondary briefing — exact player copy:** A cafe can have some pricing power without being the only place to eat. Explore entry, advertising and zero economic profit while keeping a firm’s own benefit distinct from a fair rule for the market.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- Monopolistic competition combines differentiated products with many firms and relatively easy entry. Each seller can face downward-sloping demand for its particular product.
- Entry of close substitutes can reduce an incumbent’s demand and economic profit. A markup over marginal cost does not by itself imply positive economic profit.
- Zero economic profit means revenue covers explicit and implicit costs, including a normal return to the owner’s alternatives. It does not mean no income.
- An incremental business decision compares added revenue with all added costs. Advertising cost and extra production cost both count when assessing an advertisement.

### BT-GD-M08-Q1

**Question:** A firm sells a differentiated product and many rivals can enter. Which model fits best?

- **A.** Perfect competition
- **B.** Pure monopoly
- **C.** Monopsony
- **D.** Monopolistic competition

**Correct key:** D

**Hint:** Separate differentiation, barriers to entry, marginal cost and average total cost.

**Worked explanation — reveal on request:** Product differentiation and many potential entrants characterize this structure.

**Feedback A:** Reconsider. That model assumes an identical product and price taking.

**Feedback B:** Reconsider. Many potential rivals conflict with a sole protected seller.

**Feedback C:** Reconsider. Monopsony describes market power by a buyer, not this seller structure.

**Feedback D:** Correct. Product differentiation and many potential entrants characterize this structure.


### BT-GD-M08-Q2

**Question:** For a differentiated seller, entry of close substitutes shifts its demand inward. What is the likely effect on its economic profit, other things equal?

- **A.** Its fixed cost must vanish
- **B.** Market power must become infinite
- **C.** Profit falls
- **D.** Profit must rise because there are more firms

**Correct key:** C

**Hint:** Separate differentiation, barriers to entry, marginal cost and average total cost.

**Worked explanation — reveal on request:** Some customers switch to new substitutes, reducing the incumbent's demand.

**Feedback A:** Reconsider. Entry does not erase its lease or equipment bill.

**Feedback B:** Reconsider. More close substitutes tend to constrain pricing power.

**Feedback C:** Correct. Some customers switch to new substitutes, reducing the incumbent's demand.

**Feedback D:** Reconsider. More rivals do not automatically bring the incumbent more customers.


### BT-GD-M08-Q3

**Question:** A monopolistically competitive firm in long-run equilibrium has P=ATC but P>MC. Which statement is consistent?

- **A.** It is necessarily productively efficient
- **B.** It earns zero economic profit while price exceeds marginal cost
- **C.** It must have positive economic profit
- **D.** It must shut down

**Correct key:** B

**Hint:** Separate differentiation, barriers to entry, marginal cost and average total cost.

**Worked explanation — reveal on request:** The first equality gives zero economic profit; the second allows markup and allocative inefficiency.

**Feedback A:** Reconsider. Its output need not be at minimum ATC.

**Feedback B:** Correct. The first equality gives zero economic profit; the second allows markup and allocative inefficiency.

**Feedback C:** Reconsider. A markup over marginal cost need not exceed average total cost.

**Feedback D:** Reconsider. Price can cover ATC and therefore operating costs.


### BT-GD-M08-Q4

**Question:** An owner spends $80 on an advertisement, gaining $130 revenue and $70 additional production cost. Should this isolated change be adopted for profit?

- **A.** No; incremental profit is −$20
- **B.** Yes; revenue rises $130
- **C.** Yes; profit rises $50
- **D.** No; profit falls $150

**Correct key:** A

**Hint:** Separate differentiation, barriers to entry, marginal cost and average total cost.

**Worked explanation — reveal on request:** Extra profit is 130 minus 70 minus 80.

**Feedback A:** Correct. Extra profit is 130 minus 70 minus 80.

**Feedback B:** Reconsider. Revenue alone omits the costs of obtaining it.

**Feedback C:** Reconsider. Subtracting the advertisement alone omits added production cost.

**Feedback D:** Reconsider. The cost total ignores the additional revenue.


### BT-GD-M08-Q5

**Question:** Two cafes charge different prices for different menus and locations. What additional evidence would most directly weaken an accusation that the higher price proves monopoly abuse?

- **A.** The expensive cafe likes profit
- **B.** Its profit margin exceeds zero
- **C.** Its posted price exceeds marginal cost
- **D.** Customers have several close alternatives and entry is easy

**Correct key:** D

**Hint:** Separate differentiation, barriers to entry, marginal cost and average total cost.

**Worked explanation — reveal on request:** Differentiation and convenience can support price differences without a protected sole supplier.

**Feedback A:** Reconsider. Most firms seek profit; that alone does not identify monopoly.

**Feedback B:** Reconsider. Positive profit alone does not establish monopoly or entry barriers.

**Feedback C:** Reconsider. Differentiated competitive sellers can also have a markup; this does not distinguish monopoly abuse.

**Feedback D:** Correct. Differentiation and convenience can support price differences without a protected sole supplier.


### BT-GD-M08-Q6

**Question:** A firm earns zero economic profit after covering explicit and implicit costs. What does this mean for its owner?

- **A.** Revenue is zero
- **B.** The firm must be nonprofit by law
- **C.** The owner receives the normal return included in opportunity costs
- **D.** The owner receives no income

**Correct key:** C

**Hint:** Separate differentiation, barriers to entry, marginal cost and average total cost.

**Worked explanation — reveal on request:** Zero economic profit includes compensation for the owner's next-best use of resources.

**Feedback A:** Reconsider. Revenue can exactly match total economic cost.

**Feedback B:** Reconsider. An economic result is not a legal organizational category.

**Feedback C:** Correct. Zero economic profit includes compensation for the owner's next-best use of resources.

**Feedback D:** Reconsider. Income can cover the opportunity cost without excess profit.


# Mission 9 — THE ONLY BIG PAYROLL

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 9 OF 15

**Card title:** THE ONLY BIG PAYROLL

**Go now:** Go to Housing and Work Office and meet Leila Moss, housing cooperative organizer, at the Lease Desk.

**Card body:** New stalls bring jobs, but the mine buys most skilled work. To hire one more worker, it may need to raise pay for all. Today you decide if a wage floor can raise pay and jobs here. By the end of the mission, you will test that claim.

**Objective:** Decide whether the proposed wage floor can raise both pay and employment in the stated model.

**Stakes — exact player copy:** You decide whether to support the tested wage floor. Leila needs a job forecast that workers can use.

### Worth knowing first — exact player copy

#### Glossary terms

Derived demand: Demand for an input comes from the output it helps produce.

Monopsony: A market with a single buyer.

Marginal factor cost: The extra total spending needed to hire one more unit of an input.

Minimum wage: A legal minimum payment per unit of labor.

#### Primer concepts

- One large employer may have to raise pay across its workforce to recruit another worker.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** MFC = Δ(total wage bill)/ΔL; hire while MRP≥MFC  
**What it is for:** Compare the extra wage bill with extra receipts.  
**Symbols:** MFC is marginal factor cost; L is workers; MRP is marginal revenue product.  
**Why this campaign needs it:** The wage proposal changes hiring incentives.

**Required equation or concept use — authoring/render check:** Stop 33: (4×30−3×25)/1 = $45 per extra worker; Stop 35: the fifth adds $20 but costs 175−120=$55, while each of the first four adds at least its $30 wage.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. Three workers at 12 each cost 36; four at 14 each cost 56; the fourth raises the wage bill by 20.

2. If an extra worker adds 5 units and output marginal revenue is 6, MRP = 30.

3. When output price is fixed at 6, the same calculation is MP×P; otherwise use marginal revenue, not price.

4. A wage floor below the employer’s existing wage is nonbinding.

5. With MRP 22 and marginal hiring cost 19, another worker adds 3 in net receipts.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

New vendors can enter, but the mine remains the only large buyer of skilled labor. The four findings establish: The cost of one more hire → Read the source of labor demand → Test the wage floor → Set the agreement’s wage clause. The wage agreement adds a fourth job and posts the offer openly. The employer says freight charges now limit its output.

## C. Designer intent — not shown to player

The mission moves from monopsony and minimum wages to a concrete recommendation: Support the $30 wage floor under the stated monopsony model. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M9-A — On arrival at Housing and Work Office

**Location:** Housing and Work Office.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Leila Moss, housing cooperative organizer:** “If the offer changes, I want the jobs counted as well as the pay.”

**Unlocks:** Stop 33.

### Beat BT-M9-1 — After Stop 33

**Location:** Housing and Work Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The wage bill rises from 3×25 = $75 to 4×30 = $120, so the fourth worker costs an extra $45.

**Unlocks:** Stop 34.

**Dialogue bubble — Leila Moss:** “The cost of the next hire includes what happens to the wage bill for existing staff.”

**Dialogue bubble — Nico Bell, radio:** “That makes my first tally too small. I counted one new wage and stopped.”

### Beat BT-M9-2 — After Stop 34

**Location:** Housing and Work Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** A higher output price raises receipts from an extra worker’s output. Greater productivity raises the worker’s marginal revenue product. Additional workers expand available labor at each wage. An own-wage change is a movement along existing schedules, not a determinant shift. Take this result to Business Workshop; its original records are needed for test the wage floor.

**Unlocks:** Stop 35.

**Dialogue bubble — Leila Moss:** “A better offer can change who takes a job. That is a choice workers make, not a debt they owe an old employer.”

### Beat BT-M9-3 — After Stop 35

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The first four workers each add at least $30 and cost $30 each under the floor. A fifth adds $20 but increases the wage bill from $120 to $175, a $55 marginal cost, so staffing stops at four.

**Unlocks:** Stop 36.

### Beat BT-M9-4 — After Stop 36

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Support the $30 wage floor under the stated monopsony model

**Unlocks:** Mission outcome.

### Beat BT-M9-E — At mission end

**Location:** Business Workshop.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The job board changes from three to four filled posts at the signed offer.

**Panel/HUD text:** The job board changes from three to four filled posts at the signed offer. The employer says freight charges now limit its output.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Leila Moss:** “There is a fourth job slip under the offer. We will check that job as well as the headline wage.”


## E. Location plan

**2 locations:** Housing and Work Office → Business Workshop.

Stop 33: Housing and Work Office / Lease Desk | Stop 34: Housing and Work Office / Job Board | Stop 35: Business Workshop / Order Terminal | Stop 36: Business Workshop / Kitchen Planning Table. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Leila Moss, housing cooperative organizer:** owns the original records in Housing and Work Office and must explain the recommendation to the people affected.

**Nico Bell, diner owner:** owns the original records in Business Workshop and must explain the recommendation to the people affected.

The job board changes from three to four filled posts at the signed offer. The employer says freight charges now limit its output.

## G. Key concepts, explained here

- **Derived demand:** Demand for an input comes from the output it helps produce.

- **Monopsony:** A market with a single buyer.

- **Marginal factor cost:** The extra total spending needed to hire one more unit of an input.

- **Minimum wage:** A legal minimum payment per unit of labor.

## H1. Stop 33 — The cost of one more hire

**Format/placement:** BALLPARK, Housing and Work Office — Lease Desk.

**Metadata:** Concept: 15 — Monopsony and minimum wages; Narrow concept: The cost of one more hire; Keystone: Factor demand, Competition and entry; Area: P; Prerequisites: 14; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit the fourth worker’s marginal factor cost as the increase in the whole wage bill.

**Briefing decision advanced:** whether the proposed wage floor can raise both pay and employment in the stated model.

**Actual mission answer — authoring only:** Support the $30 wage floor under the stated monopsony model.

**Call — exact player copy:** Go to the Lease Desk in Housing and Work Office.

**Stop reason — exact player copy:** The printed wage may understate the employer’s extra hiring cost.

**Question card story setup — exact player copy:** Leila shows you the record: new food sellers can enter, but the mine still dominates skilled hiring and workers question the offers on its board. Measure the whole wage-bill change before comparing the cost of another hire with its contribution.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** A single buyer’s hiring cost can exceed the wage printed in the job offer.

**Data/readings/options — exact player copy:** Without a wage floor, three workers each earn $25 per shift; recruiting a fourth requires $30 for each of all four workers.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "The cost of one more hire",
    "units": "dollars per shift",
    "labels": [
      "4",
      "30",
      "3",
      "25",
      "5"
    ],
    "values": [
      4,
      30,
      3,
      25,
      5
    ],
    "slots": 4,
    "template": "{a} {b} {c} {d}",
    "formula": "a*b-c*d",
    "correct": [
      0,
      1,
      2,
      3
    ],
    "target": 45,
    "tolerance": 0.05,
    "correctResult": 45
  },
  "answerText": "The wage bill rises from 3×25 = $75 to 4×30 = $120, so the fourth worker costs an extra $45.",
  "wrongFeedback": [
    "30 is the new wage, not the change in the whole bill.",
    "5 is the per-worker raise.",
    "120 is the entire new bill."
  ]
}
```

**Question card prompt — exact player copy:** Submit the fourth worker’s marginal factor cost as the increase in the whole wage bill.

**Correct result:** 45; absolute tolerance 0.05 in the requested unit.

**Answer text:** The wage bill rises from 3×25 = $75 to 4×30 = $120, so the fourth worker costs an extra $45.

**Why/mechanism:** The wage bill rises from 3×25 = $75 to 4×30 = $120, so the fourth worker costs an extra $45. A single buyer’s hiring cost can exceed the wage printed in the job offer. Factor demand must be compared with marginal factor cost, which includes the extra wages paid to existing employees under this employer’s upward-sloping labor supply. 30 is the new wage, not the change in the whole bill.

**Misconception / wrong-path feedback:**

- 30 is the new wage, not the change in the whole bill. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 5 is the per-worker raise. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 120 is the entire new bill. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Lease Desk stores this dated finding in text: The wage bill rises from 3×25 = $75 to 4×30 = $120, so the fourth worker costs an extra $45.

**Unlock:** Stop 34.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** The employer says freight charges now limit its output.

**Consistency bundle:**
```json
{
  "source_values": "Without a wage floor, three workers each earn $25 per shift; recruiting a fourth requires $30 for each of all four workers.",
  "derived_values": "The wage bill rises from 3×25 = $75 to 4×30 = $120, so the fourth worker costs an extra $45.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 45,
  "tolerance": 0.05,
  "answer_text_values": "The wage bill rises from 3×25 = $75 to 4×30 = $120, so the fourth worker costs an extra $45.",
  "wrong_feedback_values": [
    "30 is the new wage, not the change in the whole bill.",
    "5 is the per-worker raise.",
    "120 is the entire new bill."
  ],
  "later_story_references": "The employer says freight charges now limit its output"
}
```

## H2. Stop 34 — Read the source of labor demand

**Format/placement:** PROTOCOL, Housing and Work Office — Job Board.

**Metadata:** Concept: 14 — Factor demand and hiring; Narrow concept: Read the source of labor demand; Keystone: Factor demand, Marginal analysis, Price incentives, Equilibrium; Area: P; Prerequisites: 6; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the proposed wage floor can raise both pay and employment in the stated model.

**Actual mission answer — authoring only:** Support the $30 wage floor under the stated monopsony model.

**Call — exact player copy:** Go to the Job Board in Housing and Work Office.

**Stop reason — exact player copy:** The mine’s output market helps explain what labor is worth to it.

**Question card story setup — exact player copy:** Leila shows you the record: the wage-bill calculation shows why the next hire can cost more than its own pay, but labor demand has causes outside payroll. Trace the demand and productivity links before testing a wage rule against the hiring schedule.

**Prior result displayed in mission log:** The wage bill rises from 3×25 = $75 to 4×30 = $120, so the fourth worker costs an extra $45.

**Question card story-science connection — exact player copy:** The mine’s wage complaint must be connected to its output market.

**Data/readings/options — exact player copy:** The firm’s output is sold competitively; compare independent changes with everything else fixed.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "More buyers purchase the mineral at a higher output price"
    },
    {
      "id": "e2",
      "label": "Workers produce more units per hour"
    },
    {
      "id": "e3",
      "label": "More qualified workers move into town"
    },
    {
      "id": "e4",
      "label": "The wage itself changes with schedules unchanged"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Labor demand rises through higher MRP"
    },
    {
      "id": "r2",
      "label": "Labor demand rises through higher marginal product"
    },
    {
      "id": "r3",
      "label": "Labor supply shifts right"
    },
    {
      "id": "r4",
      "label": "Move along the existing labor schedules"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "A higher output price raises receipts from an extra worker’s output. Greater productivity raises the worker’s marginal revenue product. Additional workers expand available labor at each wage. An own-wage change is a movement along existing schedules, not a determinant shift. The mine’s wage complaint must be connected to its output market. The classification prevents a wage movement from being mistaken for a change in workers’ productivity; output prices and available skills can move the labor market through different channels.",
  "answerText": "A higher output price raises receipts from an extra worker’s output. Greater productivity raises the worker’s marginal revenue product. Additional workers expand available labor at each wage. An own-wage change is a movement along existing schedules, not a determinant shift.",
  "rebuttals": {
    "e1": "A higher output price raises receipts from an extra worker’s output.",
    "e2": "Greater productivity raises the worker’s marginal revenue product.",
    "e3": "Additional workers expand available labor at each wage.",
    "e4": "An own-wage change is a movement along existing schedules, not a determinant shift."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"More buyers purchase the mineral at a higher output price": "Labor demand rises through higher MRP", "Workers produce more units per hour": "Labor demand rises through higher marginal product", "More qualified workers move into town": "Labor supply shifts right", "The wage itself changes with schedules unchanged": "Move along the existing labor schedules"}; exact selection or mapping required.

**Answer text:** A higher output price raises receipts from an extra worker’s output. Greater productivity raises the worker’s marginal revenue product. Additional workers expand available labor at each wage. An own-wage change is a movement along existing schedules, not a determinant shift.

**Why/mechanism:** A higher output price raises receipts from an extra worker’s output. Greater productivity raises the worker’s marginal revenue product. Additional workers expand available labor at each wage. An own-wage change is a movement along existing schedules, not a determinant shift. The mine’s wage complaint must be connected to its output market. The classification prevents a wage movement from being mistaken for a change in workers’ productivity; output prices and available skills can move the labor market through different channels.

**Misconception / wrong-path feedback:**

- A higher output price raises receipts from an extra worker’s output. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Greater productivity raises the worker’s marginal revenue product. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Additional workers expand available labor at each wage. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- An own-wage change is a movement along existing schedules, not a determinant shift. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Job Board stores this dated finding in text: A higher output price raises receipts from an extra worker’s output. Greater productivity raises the worker’s marginal revenue product. Additional workers expand available labor at each wage. An own-wage change is a movement along existing schedules, not a determinant shift.

**Unlock:** Stop 35.

**Retrieval:** Use the prior mission log and concepts [3, 6]; the prior-result line states the immediate dependency.

**Later payoff:** The employer says freight charges now limit its output.

**Consistency bundle:**
```json
{
  "source_values": "The firm’s output is sold competitively; compare independent changes with everything else fixed.",
  "derived_values": "A higher output price raises receipts from an extra worker’s output. Greater productivity raises the worker’s marginal revenue product. Additional workers expand available labor at each wage. An own-wage change is a movement along existing schedules, not a determinant shift.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "More buyers purchase the mineral at a higher output price": "Labor demand rises through higher MRP",
    "Workers produce more units per hour": "Labor demand rises through higher marginal product",
    "More qualified workers move into town": "Labor supply shifts right",
    "The wage itself changes with schedules unchanged": "Move along the existing labor schedules"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "A higher output price raises receipts from an extra worker’s output. Greater productivity raises the worker’s marginal revenue product. Additional workers expand available labor at each wage. An own-wage change is a movement along existing schedules, not a determinant shift.",
  "wrong_feedback_values": [
    "A higher output price raises receipts from an extra worker’s output.",
    "Greater productivity raises the worker’s marginal revenue product.",
    "Additional workers expand available labor at each wage.",
    "An own-wage change is a movement along existing schedules, not a determinant shift."
  ],
  "later_story_references": "The employer says freight charges now limit its output"
}
```

## H3. Stop 35 — Test the wage floor

**Format/placement:** VERIFY, Business Workshop — Order Terminal.

**Metadata:** Concept: 15 — Monopsony and minimum wages; Narrow concept: Test the wage floor; Keystone: Factor demand, Competition and entry; Area: CM; Prerequisites: 14; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** operated; First, calculate and commit the profit-maximizing worker count under the floor. Then set the Order Terminal wage to $30, measure the chosen staffing count, and select whether it matches; restore the trial setting after reading, with no second measurement required.

**Briefing decision advanced:** whether the proposed wage floor can raise both pay and employment in the stated model.

**Actual mission answer — authoring only:** Support the $30 wage floor under the stated monopsony model.

**Call — exact player copy:** Go to the Order Terminal in Business Workshop.

**Stop reason — exact player copy:** The proposed floor has to be tested against this employer’s schedule.

**Question card story setup — exact player copy:** Nico shows you the record: the input-market record links hiring to output receipts, and the proposed wage floor changes the cost of adding workers. Test the stated schedule before accepting either side’s blanket claim about what a minimum wage must do.

**Prior result displayed in mission log:** A higher output price raises receipts from an extra worker’s output. Greater productivity raises the worker’s marginal revenue product. Additional workers expand available labor at each wage. An own-wage change is a movement along existing schedules, not a determinant shift.

**Question card story-science connection — exact player copy:** The wage floor must be evaluated against the actual hiring schedule.

**Data/readings/options — exact player copy:** Marginal revenue products for workers 1–5 are $60,$50,$40,$30,$20; with a $30 wage floor the firm can hire up to four workers at $30 each, but a fifth would require $35 for all five. Hold output demand and productivity fixed; at equality hire the worker.

**Format-specific interaction block:**

```json
{
  "verify": {
    "quantity": "Test the wage floor",
    "units": "workers",
    "predictionRange": {
      "min": 0,
      "max": 6,
      "step": 1
    },
    "truth": 4,
    "tolerance": 0.05,
    "measurement": {
      "label": "Run trial and read result",
      "cost": 1,
      "units": "trial credit"
    },
    "measurementBudget": 2,
    "conclusions": [
      "Prediction matches the trial",
      "Prediction does not match the trial"
    ],
    "correctConclusion": "Prediction matches the trial",
    "requiredSequence": [
      "calculate_commit",
      "operate",
      "measure",
      "interpret"
    ],
    "initialPrediction": null,
    "locks": {
      "operate": "prediction committed",
      "measure": "trial operated",
      "interpret": "reading collected"
    }
  },
  "answerText": "The first four workers each add at least $30 and cost $30 each under the floor. A fifth adds $20 but increases the wage bill from $120 to $175, a $55 marginal cost, so staffing stops at four.",
  "wrongFeedback": [
    "3 ignores that the floor removes the upward wage-bill jump through four workers.",
    "5 ignores the $55 marginal bill for the fifth.",
    "0 treats all wage regulation as requiring shutdown."
  ]
}
```

**Question card prompt — exact player copy:** First, calculate and commit the profit-maximizing worker count under the floor. Then set the Order Terminal wage to $30, measure the chosen staffing count, and select whether it matches; restore the trial setting after reading, with no second measurement required.

**Correct result:** 4; absolute tolerance 0.05 in the requested unit.

**Answer text:** The first four workers each add at least $30 and cost $30 each under the floor. A fifth adds $20 but increases the wage bill from $120 to $175, a $55 marginal cost, so staffing stops at four.

**Why/mechanism:** The first four workers each add at least $30 and cost $30 each under the floor. A fifth adds $20 but increases the wage bill from $120 to $175, a $55 marginal cost, so staffing stops at four. The wage floor must be evaluated against the actual hiring schedule. 3 ignores that the floor removes the upward wage-bill jump through four workers. 5 ignores the $55 marginal bill for the fifth.

**Misconception / wrong-path feedback:**

- 3 ignores that the floor removes the upward wage-bill jump through four workers. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 5 ignores the $55 marginal bill for the fifth. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 0 treats all wage regulation as requiring shutdown. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Order Terminal stores this dated finding in text: The first four workers each add at least $30 and cost $30 each under the floor. A fifth adds $20 but increases the wage bill from $120 to $175, a $55 marginal cost, so staffing stops at four.

**Unlock:** Stop 36.

**Retrieval:** Use the prior mission log and concepts [14]; the prior-result line states the immediate dependency.

**Later payoff:** The employer says freight charges now limit its output.

**Consistency bundle:**
```json
{
  "source_values": "Marginal revenue products for workers 1–5 are $60,$50,$40,$30,$20; with a $30 wage floor the firm can hire up to four workers at $30 each, but a fifth would require $35 for all five. Hold output demand and productivity fixed; at equality hire the worker.",
  "derived_values": "The first four workers each add at least $30 and cost $30 each under the floor. A fifth adds $20 but increases the wage bill from $120 to $175, a $55 marginal cost, so staffing stops at four.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": 4,
  "correct_result": 4,
  "tolerance": 0.05,
  "answer_text_values": "The first four workers each add at least $30 and cost $30 each under the floor. A fifth adds $20 but increases the wage bill from $120 to $175, a $55 marginal cost, so staffing stops at four.",
  "wrong_feedback_values": [
    "3 ignores that the floor removes the upward wage-bill jump through four workers.",
    "5 ignores the $55 marginal bill for the fifth.",
    "0 treats all wage regulation as requiring shutdown."
  ],
  "later_story_references": "The employer says freight charges now limit its output"
}
```

## H4. Stop 36 — Set the agreement’s wage clause

**Format/placement:** CHOICE, Nico Bell at the Kitchen Planning Table in Business Workshop.

**Metadata:** Concept: 15 — Monopsony and minimum wages; Narrow concept: Set the agreement’s wage clause; Keystone: Factor demand, Competition and entry; Area: CM; Prerequisites: 14; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the proposed wage floor can raise both pay and employment in the stated model.

**Actual mission answer — authoring only:** Support the tested $30 wage floor, since this monopsony model predicts more jobs at that wage.

**Call — exact player copy:** Go to Business Workshop and meet Nico Bell, diner owner, at the Kitchen Planning Table.

**Stop reason — exact player copy:** The wage clause must name the model that supports it.

**Question card story setup — exact player copy:** Nico shows you the record: the hiring trial now shows what the proposed floor does under the stated supply and productivity conditions, and both sides can inspect it. Choose the wage clause before the agreement turns a conditional result into a universal promise.

**Prior result displayed in mission log:** The first four workers each add at least $30 and cost $30 each under the floor. A fifth adds $20 but increases the wage bill from $120 to $175, a $55 marginal cost, so staffing stops at four.

**Question card story-science connection — exact player copy:** The worker agreement gains support from evidence rather than a blanket claim about regulation.

**Data/readings/options — exact player copy:** Without the floor, employment is 3 at $25; the wage schedule rises $5 per added worker from $15 at one worker, and MRP is 60,50,40,30,20. With the $30 floor, the trial hires 4 at $30.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Support every higher floor using this rise in jobs",
    "Treat the original wage as the competitive labor-market wage",
    "Support the tested $30 wage floor, since this monopsony model predicts more jobs at that wage",
    "Reject the $30 floor using the competitive labor-market prediction"
  ],
  "answer": "Support the tested $30 wage floor, since this monopsony model predicts more jobs at that wage",
  "why": "The specified wage floor raises pay and employment in this monopsony example by changing the marginal hiring-cost schedule. This is a model-dependent result, not a claim that every floor or every labor market behaves the same way. The worker agreement gains support from evidence rather than a blanket claim about regulation. The trial and schedules show four jobs instead of three. A floor above enough workers’ MRP can reduce hiring.",
  "rebuttals": {
    "Reject the $30 floor using the competitive labor-market prediction": "The trial and schedules show four jobs instead of three.",
    "Support every higher floor using this rise in jobs": "A floor above enough workers’ MRP can reduce hiring.",
    "Treat the original wage as the competitive labor-market wage": "One buyer faces rising supply and marginal hiring cost above wage."
  },
  "answerText": "The specified wage floor raises pay and employment in this monopsony example by changing the marginal hiring-cost schedule. This is a model-dependent result, not a claim that every floor or every labor market behaves the same way."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Support the tested $30 wage floor, since this monopsony model predicts more jobs at that wage"; exact selection or mapping required.

**Answer text:** The specified wage floor raises pay and employment in this monopsony example by changing the marginal hiring-cost schedule. This is a model-dependent result, not a claim that every floor or every labor market behaves the same way.

**Why/mechanism:** The specified wage floor raises pay and employment in this monopsony example by changing the marginal hiring-cost schedule. This is a model-dependent result, not a claim that every floor or every labor market behaves the same way. The worker agreement gains support from evidence rather than a blanket claim about regulation. The trial and schedules show four jobs instead of three. A floor above enough workers’ MRP can reduce hiring.

**Misconception / wrong-path feedback:**

- The trial and schedules show four jobs instead of three. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- A floor above enough workers’ MRP can reduce hiring. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- One buyer faces rising supply and marginal hiring cost above wage. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Kitchen Planning Table stores this dated finding in text: The specified wage floor raises pay and employment in this monopsony example by changing the marginal hiring-cost schedule. This is a model-dependent result, not a claim that every floor or every labor market behaves the same way.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [14]; the prior-result line states the immediate dependency.

**Later payoff:** The employer says freight charges now limit its output.

**Consistency bundle:**
```json
{
  "source_values": "Without the floor, employment is 3 at $25; the wage schedule rises $5 per added worker from $15 at one worker, and MRP is 60,50,40,30,20. With the $30 floor, the trial hires 4 at $30.",
  "derived_values": "The specified wage floor raises pay and employment in this monopsony example by changing the marginal hiring-cost schedule. This is a model-dependent result, not a claim that every floor or every labor market behaves the same way.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Support the tested $30 wage floor, since this monopsony model predicts more jobs at that wage",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The specified wage floor raises pay and employment in this monopsony example by changing the marginal hiring-cost schedule. This is a model-dependent result, not a claim that every floor or every labor market behaves the same way.",
  "wrong_feedback_values": [
    "The trial and schedules show four jobs instead of three.",
    "A floor above enough workers’ MRP can reduce hiring.",
    "One buyer faces rising supply and marginal hiring cost above wage."
  ],
  "later_story_references": "The employer says freight charges now limit its output"
}
```

## I. Mission outcome

**Delivery piece 9:** The wage clause. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Leila Moss:** “If the offer changes, I want the jobs counted as well as the pay.”

**Mission decision:** Support the $30 wage floor for this model. It raises jobs from three to four and raises pay. The offer goes on the board. The mine now points to high freight fees.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 9 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 16:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The wage agreement adds a fourth job and posts the offer openly.

**Automatic bar change:** Plan Evidence +2 | Service Continuity +2 | Field Budget -1 | Public Accountability +3

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [1, 0, 3, 0]; bars [100, 100, 99, 99]; bank 0, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** But Ruth has unused freight slots; better wages alone will not give rival firms access to them.

## K. Quick concept review

- One large employer may have to raise pay across its workforce to recruit another worker.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The worker agreement gains support from evidence rather than a blanket claim about regulation.


## L. GO DEEPER — A wage offer is part of a whole payroll

**Secondary briefing — exact player copy:** Use a new payroll to see why the next worker can cost more than the posted wage. Then consider how an outside employer or a carefully chosen wage floor changes the choices available.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- Marginal factor cost is the change in total input expenditure. If hiring requires a higher wage for all workers, it includes raises for existing workers.
- Labor demand reflects marginal revenue product. For a product price taker it is marginal product multiplied by the product price.
- A monopsonist has buyer power in a labor market; this does not require monopoly in the product it sells. Upward labor supply can make marginal factor cost exceed the wage.
- A suitable wage floor can raise employment in some monopsony models, but an excessively high floor can reduce it. Outside job options can also make workers less dependent on one buyer.

### BT-GD-M09-Q1

**Question:** A single employer must raise everyone's wage from $20 to $22 to increase staff from 4 to 5. What is marginal factor cost of the fifth hire?

- **A.** $2
- **B.** $110
- **C.** $30
- **D.** $22

**Correct key:** C

**Hint:** Compare the change in the whole wage bill with the revenue generated by the next worker.

**Worked explanation — reveal on request:** The wage bill rises from eighty to one hundred ten.

**Feedback A:** Reconsider. That is the wage increase per worker, not the total bill change.

**Feedback B:** Reconsider. That is the new total wage bill.

**Feedback C:** Correct. The wage bill rises from eighty to one hundred ten.

**Feedback D:** Reconsider. That omits the raise paid to the four existing staff.


### BT-GD-M09-Q2

**Question:** A competitive product seller's worker produces 5 extra units at a market price of $12. What is marginal revenue product?

- **A.** $12
- **B.** $60
- **C.** $17
- **D.** $2.40

**Correct key:** B

**Hint:** Compare the change in the whole wage bill with the revenue generated by the next worker.

**Worked explanation — reveal on request:** Five additional units each yield twelve dollars.

**Feedback A:** Reconsider. That counts only one of the five extra units.

**Feedback B:** Correct. Five additional units each yield twelve dollars.

**Feedback C:** Reconsider. Adding units and dollars is not revenue.

**Feedback D:** Reconsider. Dividing price by output has the wrong interpretation.


### BT-GD-M09-Q3

**Question:** An employer is a wage taker at $40. The next worker's marginal revenue product is $46. What is the profit effect of hiring that worker?

- **A.** Profit rises $6
- **B.** Profit rises $46
- **C.** Profit falls $40
- **D.** Profit is unchanged

**Correct key:** A

**Hint:** Compare the change in the whole wage bill with the revenue generated by the next worker.

**Worked explanation — reveal on request:** Additional revenue exceeds the added wage by six.

**Feedback A:** Correct. Additional revenue exceeds the added wage by six.

**Feedback B:** Reconsider. The wage cost must be subtracted.

**Feedback C:** Reconsider. This ignores the worker's contribution to revenue.

**Feedback D:** Reconsider. Marginal revenue product and wage are not equal.


### BT-GD-M09-Q4

**Question:** In an upward-sloping single-wage labor supply schedule, why is a monopsonist's marginal factor cost above the wage?

- **A.** Workers always produce less than they cost
- **B.** The wage equals total payroll
- **C.** The employer must also face zero product-market competition
- **D.** Hiring more requires raising pay for existing workers too

**Correct key:** D

**Hint:** Compare the change in the whole wage bill with the revenue generated by the next worker.

**Worked explanation — reveal on request:** The extra wage bill includes both the new worker's pay and raises for existing staff.

**Feedback A:** Reconsider. Productivity is a separate labor-demand question.

**Feedback B:** Reconsider. Wage is per worker; payroll covers all workers.

**Feedback C:** Reconsider. Buyer power in labor can coexist with competition in the product market.

**Feedback D:** Correct. The extra wage bill includes both the new worker's pay and raises for existing staff.


### BT-GD-M09-Q5

**Question:** A wage floor increases both wage and employment in a particular monopsony model. What conclusion is justified?

- **A.** The original market must have been perfectly competitive
- **B.** Worker productivity must have doubled
- **C.** This can occur for a suitable floor, but is not guaranteed for every floor
- **D.** All wage floors increase employment

**Correct key:** C

**Hint:** Compare the change in the whole wage bill with the revenue generated by the next worker.

**Worked explanation — reveal on request:** A floor can flatten relevant marginal hiring cost, while an excessively high floor can reduce employment.

**Feedback A:** Reconsider. The question expressly specifies monopsony.

**Feedback B:** Reconsider. The result can arise from a changed hiring-cost schedule without productivity growth.

**Feedback C:** Correct. A floor can flatten relevant marginal hiring cost, while an excessively high floor can reduce employment.

**Feedback D:** Reconsider. The level of the floor and the market structure matter.


### BT-GD-M09-Q6

**Question:** A new competing employer offers accessible jobs nearby. In a monopsony setting, why can this improve workers' bargaining position?

- **A.** It guarantees every worker a wage equal to the value of all firm output
- **B.** It provides an alternative to the original employer's offer
- **C.** It makes every wage legally identical
- **D.** It guarantees all workers switch jobs

**Correct key:** B

**Hint:** Compare the change in the whole wage bill with the revenue generated by the next worker.

**Worked explanation — reveal on request:** Outside job options can make labor supply to one employer more responsive.

**Feedback A:** Reconsider. An outside option does not give each worker the firm’s entire revenue.

**Feedback B:** Correct. Outside job options can make labor supply to one employer more responsive.

**Feedback C:** Reconsider. No such rule is supplied.

**Feedback D:** Reconsider. An outside option can matter without universal switching.


# Mission 10 — THE EMPTY FREIGHT SLOT

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 10 OF 15

**Card title:** THE EMPTY FREIGHT SLOT

**Go now:** Go to Freight Contract Office and meet Ruth Sen, terminal manager, at the Dispatch Desk.

**Card body:** The wage plan adds a job, but freight fees stay high. Ruth has empty slots that the mine cannot afford. Today you decide if lack of space is the whole cause. By the end of the mission, you will check how the gate sets its price.

**Objective:** Decide whether the freight shortage is entirely a physical capacity problem.

**Stakes — exact player copy:** You decide why Ruth’s freight slots sit empty. The wrong diagnosis can leave rival firms paying for a false capacity shortage.

### Worth knowing first — exact player copy

#### Glossary terms

Monopoly: A sole seller protected by barriers to entry.

Marginal revenue: The extra total revenue from one more unit sold.

Allocative efficiency: Output at which marginal social benefit equals marginal social cost.

Barrier to entry: A condition that prevents or discourages new sellers.

#### Primer concepts

**Required local preparation — read before Stop 37:** Marginal revenue is the extra revenue from selling one more unit. Compare it with the extra cost to choose output. Then use demand to find the price buyers will pay for that output.

- A sole seller may earn more by selling fewer services at a higher price.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** For linear demand P=a−bQ, MR=a−2bQ; choose MR=MC then read P from demand  
**What it is for:** Find the monopoly’s output and price in the stated linear model.  
**Symbols:** P is price; Q is quantity; a is demand intercept; b is demand slope magnitude; MR is marginal revenue; MC is marginal cost.  
**Why this campaign needs it:** Unused capacity may reflect pricing incentives rather than broken equipment.

**Required equation or concept use — authoring/render check:** Stop 37 uses 100−4Q = 20 to get Q=20, then P=100−2×20=$60.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. If P = 18−Q and MC = 6, MR = 18−2Q; MR=MC gives Q=6 and P=12.

2. At Q=6 and price 12, revenue is 72.

3. A linear demand price at Q=4 of 14 is not marginal revenue: MR there is 10.

4. If efficient output is 12 and monopoly output 8 with price-cost wedge 4, the linear deadweight loss is 0.5×4×4 = 8.

5. A monopoly lacks a unique supply curve because its chosen quantity depends on demand as well as cost.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

The wage clause adds a job, but freight charges still restrict the mine’s orders. The four findings establish: Price the terminal’s chosen quantity → Separate firm and town benchmarks → Why space remains empty → Name the bottleneck accurately. The town posts the unused terminal slots beside the proposed second-line offer. Two freight firms now propose competing access contracts.

## C. Designer intent — not shown to player

The mission moves from monopoly price, output and surplus to a concrete recommendation: Record market power as part of the freight shortage. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M10-A — On arrival at Freight Contract Office

**Location:** Freight Contract Office.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Ruth Sen, terminal manager:** “The slots are usable; the contract decides who can book them.”

**Unlocks:** Stop 37.

### Beat BT-M10-1 — After Stop 37

**Location:** Freight Contract Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Demand gives P = 100−2×20 = $60 per slot; the corresponding marginal revenue is $20, not the charged price.

**Unlocks:** Stop 38.

**Dialogue bubble — Ruth Sen:** “Those are the bookings the price rule selects. They are not all the slots the yard can handle.”

**Dialogue bubble — Mara Velez, radio:** “Then I owe the hearing a correction: price and physical capacity are separate claims.”

### Beat BT-M10-2 — After Stop 38

**Location:** Freight Contract Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** MR=MC gives 4Q=80 and Q=20. Price is taken from demand, yielding 60. With no externalities, P=MC gives Q=40. Capacity minus scheduled use is 50−20=30. Take this result to Civic Advice Office; its original records are needed for why space remains empty.

**Unlocks:** Stop 39.

**Dialogue bubble — Ruth Sen:** “I will show the unused slots. Keep an explicit way to pay for upkeep beside the access proposal.”

### Beat BT-M10-3 — After Stop 39

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The dispatch count agrees with demand at the charged price, and usable capacity exceeds it. With unchanged marginal cost, the supplied monopoly model explains the low output without a breakdown; this does not claim every unused slot in reality proves monopoly abuse.

**Unlocks:** Stop 40.

**Dialogue bubble — Sal Ortiz, radio:** “I have marked the usable slots. A booking rule kept them empty; the track did not vanish.”

### Beat BT-M10-4 — After Stop 40

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Record market power as part of the freight shortage

**Unlocks:** Mission outcome.

### Beat BT-M10-E — At mission end

**Location:** Civic Advice Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The freight wall map keeps thirty unused slots lit with text labels beside the entry barrier.

**Panel/HUD text:** The freight wall map keeps thirty unused slots lit with text labels beside the entry barrier. Two freight firms now propose competing access contracts.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Ruth Sen:** “The unused tags are out of the stack. You can challenge my access rule without pretending the upkeep bill is made up.”


## E. Location plan

**2 locations:** Freight Contract Office → Civic Advice Office.

Stop 37: Freight Contract Office / Dispatch Desk | Stop 38: Freight Contract Office / Booking Terminal | Stop 39: Civic Advice Office / Budget Desk | Stop 40: Civic Advice Office / Town Map. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Ruth Sen, terminal manager:** owns the original records in Freight Contract Office and must explain the recommendation to the people affected.

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

The freight wall map keeps thirty unused slots lit with text labels beside the entry barrier. Two freight firms now propose competing access contracts.

## G. Key concepts, explained here

- **Monopoly:** A sole seller protected by barriers to entry.

- **Marginal revenue:** The extra total revenue from one more unit sold.

- **Allocative efficiency:** Output at which marginal social benefit equals marginal social cost.

- **Barrier to entry:** A condition that prevents or discourages new sellers.

## H1. Stop 37 — Price the terminal’s chosen quantity

**Format/placement:** BALLPARK, Freight Contract Office — Dispatch Desk.

**Metadata:** Concept: 16 — Monopoly price, output and surplus; Narrow concept: Price the terminal’s chosen quantity; Keystone: Competition and entry, Surplus, Marginal analysis; Area: E; Prerequisites: 7, 10; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit the price from the demand curve at 20 slots.

**Briefing decision advanced:** whether the freight shortage is entirely a physical capacity problem.

**Actual mission answer — authoring only:** Record market power as part of the freight shortage.

**Call — exact player copy:** Go to the Dispatch Desk in Freight Contract Office.

**Stop reason — exact player copy:** The freight invoice must use the price buyers will pay at that volume.

**Question card story setup — exact player copy:** Ruth shows you the record: the wage clause supports another job, but the employer says expensive freight still limits the orders it can fill. Read the terminal’s demand schedule before deciding what price its chosen volume actually lets it charge.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** A pricing claim needs the demand price at the chosen output.

**Data/readings/options — exact player copy:** The terminal’s demand is P=100−2Q dollars per slot; it chooses Q=20 slots daily under its current contract.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Price the terminal’s chosen quantity",
    "units": "dollars per slot",
    "labels": [
      "100",
      "2",
      "20",
      "40"
    ],
    "values": [
      100,
      2,
      20,
      40
    ],
    "slots": 3,
    "template": "{a} {b} {c}",
    "formula": "a-b*c",
    "correct": [
      0,
      1,
      2
    ],
    "target": 60,
    "tolerance": 0.05,
    "correctResult": 60
  },
  "answerText": "Demand gives P = 100−2×20 = $60 per slot; the corresponding marginal revenue is $20, not the charged price.",
  "wrongFeedback": [
    "20 reads marginal revenue as the selling price.",
    "100 uses the intercept at zero quantity.",
    "40 reports the deduction instead of price."
  ]
}
```

**Question card prompt — exact player copy:** Submit the price from the demand curve at 20 slots.

**Correct result:** 60; absolute tolerance 0.05 in the requested unit.

**Answer text:** Demand gives P = 100−2×20 = $60 per slot; the corresponding marginal revenue is $20, not the charged price.

**Why/mechanism:** Demand gives P = 100−2×20 = $60 per slot; the corresponding marginal revenue is $20, not the charged price. A pricing claim needs the demand price at the chosen output. Marginal analysis locates output by comparing marginal revenue and cost; the demand schedule then determines the price charged on all units sold. 20 reads marginal revenue as the selling price. 100 uses the intercept at zero quantity. 40 reports the deduction instead of price.

**Misconception / wrong-path feedback:**

- 20 reads marginal revenue as the selling price. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 100 uses the intercept at zero quantity. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 40 reports the deduction instead of price. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Dispatch Desk stores this dated finding in text: Demand gives P = 100−2×20 = $60 per slot; the corresponding marginal revenue is $20, not the charged price.

**Unlock:** Stop 38.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** Two freight firms now propose competing access contracts.

**Consistency bundle:**
```json
{
  "source_values": "The terminal’s demand is P=100−2Q dollars per slot; it chooses Q=20 slots daily under its current contract.",
  "derived_values": "Demand gives P = 100−2×20 = $60 per slot; the corresponding marginal revenue is $20, not the charged price.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 60,
  "tolerance": 0.05,
  "answer_text_values": "Demand gives P = 100−2×20 = $60 per slot; the corresponding marginal revenue is $20, not the charged price.",
  "wrong_feedback_values": [
    "20 reads marginal revenue as the selling price.",
    "100 uses the intercept at zero quantity.",
    "40 reports the deduction instead of price."
  ],
  "later_story_references": "Two freight firms now propose competing access contracts"
}
```

## H2. Stop 38 — Separate firm and town benchmarks

**Format/placement:** PROTOCOL, Freight Contract Office — Booking Terminal.

**Metadata:** Concept: 16 — Monopoly price, output and surplus; Narrow concept: Separate firm and town benchmarks; Keystone: Competition and entry, Surplus, Marginal analysis; Area: E; Prerequisites: 7, 10; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the freight shortage is entirely a physical capacity problem.

**Actual mission answer — authoring only:** Record market power as part of the freight shortage.

**Call — exact player copy:** Go to the Booking Terminal in Freight Contract Office.

**Stop reason — exact player copy:** The terminal’s profit target must be separated from physical capacity.

**Question card story setup — exact player copy:** Ruth shows you the record: the terminal’s charged price is now known, while its marginal revenue and physical capacity appear on separate records. Compare the private output choice with the no-harm efficiency benchmark before treating an empty slot as wasted machinery.

**Prior result displayed in mission log:** Demand gives P = 100−2×20 = $60 per slot; the corresponding marginal revenue is $20, not the charged price.

**Question card story-science connection — exact player copy:** A profit-maximizing schedule and a physically full terminal are different states.

**Data/readings/options — exact player copy:** Linear demand is P=100−2Q; MR=100−4Q; MC is $20; maximum capacity is 50 slots; no externalities are included in this benchmark.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "Set 100−4Q equal to 20"
    },
    {
      "id": "e2",
      "label": "Read demand at the profit-maximizing quantity"
    },
    {
      "id": "e3",
      "label": "Set 100−2Q equal to 20"
    },
    {
      "id": "e4",
      "label": "Compare 20 scheduled slots with capacity 50"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Profit-maximizing quantity is 20"
    },
    {
      "id": "r2",
      "label": "Monopoly price is $60"
    },
    {
      "id": "r3",
      "label": "Efficient quantity is 40"
    },
    {
      "id": "r4",
      "label": "Thirty physical slots are unused"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "MR=MC gives 4Q=80 and Q=20. Price is taken from demand, yielding 60. With no externalities, P=MC gives Q=40. Capacity minus scheduled use is 50−20=30. A profit-maximizing schedule and a physically full terminal are different states. A capacity limit could bind in another record, but here it exceeds both quantities; the different private and efficient outcomes therefore come from pricing incentives in the stated no-harm model.",
  "answerText": "MR=MC gives 4Q=80 and Q=20. Price is taken from demand, yielding 60. With no externalities, P=MC gives Q=40. Capacity minus scheduled use is 50−20=30.",
  "rebuttals": {
    "e1": "MR=MC gives 4Q=80 and Q=20.",
    "e2": "Price is taken from demand, yielding 60.",
    "e3": "With no externalities, P=MC gives Q=40.",
    "e4": "Capacity minus scheduled use is 50−20=30."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"Set 100−4Q equal to 20": "Profit-maximizing quantity is 20", "Read demand at the profit-maximizing quantity": "Monopoly price is $60", "Set 100−2Q equal to 20": "Efficient quantity is 40", "Compare 20 scheduled slots with capacity 50": "Thirty physical slots are unused"}; exact selection or mapping required.

**Answer text:** MR=MC gives 4Q=80 and Q=20. Price is taken from demand, yielding 60. With no externalities, P=MC gives Q=40. Capacity minus scheduled use is 50−20=30.

**Why/mechanism:** MR=MC gives 4Q=80 and Q=20. Price is taken from demand, yielding 60. With no externalities, P=MC gives Q=40. Capacity minus scheduled use is 50−20=30. A profit-maximizing schedule and a physically full terminal are different states. A capacity limit could bind in another record, but here it exceeds both quantities; the different private and efficient outcomes therefore come from pricing incentives in the stated no-harm model.

**Misconception / wrong-path feedback:**

- MR=MC gives 4Q=80 and Q=20. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Price is taken from demand, yielding 60. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- With no externalities, P=MC gives Q=40. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Capacity minus scheduled use is 50−20=30. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Booking Terminal stores this dated finding in text: MR=MC gives 4Q=80 and Q=20. Price is taken from demand, yielding 60. With no externalities, P=MC gives Q=40. Capacity minus scheduled use is 50−20=30.

**Unlock:** Stop 39.

**Retrieval:** Use the prior mission log and concepts [3, 7, 10]; the prior-result line states the immediate dependency.

**Later payoff:** Two freight firms now propose competing access contracts.

**Consistency bundle:**
```json
{
  "source_values": "Linear demand is P=100−2Q; MR=100−4Q; MC is $20; maximum capacity is 50 slots; no externalities are included in this benchmark.",
  "derived_values": "MR=MC gives 4Q=80 and Q=20. Price is taken from demand, yielding 60. With no externalities, P=MC gives Q=40. Capacity minus scheduled use is 50−20=30.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "Set 100−4Q equal to 20": "Profit-maximizing quantity is 20",
    "Read demand at the profit-maximizing quantity": "Monopoly price is $60",
    "Set 100−2Q equal to 20": "Efficient quantity is 40",
    "Compare 20 scheduled slots with capacity 50": "Thirty physical slots are unused"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "MR=MC gives 4Q=80 and Q=20. Price is taken from demand, yielding 60. With no externalities, P=MC gives Q=40. Capacity minus scheduled use is 50−20=30.",
  "wrong_feedback_values": [
    "MR=MC gives 4Q=80 and Q=20.",
    "Price is taken from demand, yielding 60.",
    "With no externalities, P=MC gives Q=40.",
    "Capacity minus scheduled use is 50−20=30."
  ],
  "later_story_references": "Two freight firms now propose competing access contracts"
}
```

## H3. Stop 39 — Why space remains empty

**Format/placement:** DIAGNOSIS, Civic Advice Office — Budget Desk.

**Metadata:** Concept: 16 — Monopoly price, output and surplus; Narrow concept: Why space remains empty; Keystone: Competition and entry, Surplus, Marginal analysis; Area: T; Prerequisites: 7, 10; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Read every zone and select the one explanation consistent with all observations.

**Briefing decision advanced:** whether the freight shortage is entirely a physical capacity problem.

**Actual mission answer — authoring only:** Record market power as part of the freight shortage.

**Call — exact player copy:** Go to the Budget Desk in Civic Advice Office.

**Stop reason — exact player copy:** The usable-slot reading can disprove a purely physical bottleneck.

**Question card story setup — exact player copy:** Mara shows you the record: the benchmark comparison separates profitable output from available capacity, and the booking record can now test the competing explanations. Read every dispatch zone before deciding whether expensive freight comes only from broken or fully occupied equipment.

**Prior result displayed in mission log:** MR=MC gives 4Q=80 and Q=20. Price is taken from demand, yielding 60. With no externalities, P=MC gives Q=40. Capacity minus scheduled use is 50−20=30.

**Question card story-science connection — exact player copy:** The capacity reading changes the meaning of the queue photographs planted earlier.

**Data/readings/options — exact player copy:** Compare all readings; alarm, watch, and normal are text labels, not verdicts.

**Format-specific interaction block:**

```json
{
  "headline": "Why space remains empty",
  "readings": [
    {
      "zone": "Capacity",
      "label": "Usable slots",
      "value": "50 per day",
      "status": "normal"
    },
    {
      "zone": "Dispatch",
      "label": "Slots scheduled",
      "value": "20 per day",
      "status": "watch"
    },
    {
      "zone": "Costs",
      "label": "Marginal cost",
      "value": "$20 per slot, unchanged",
      "status": "normal"
    },
    {
      "zone": "Bookings",
      "label": "Demand at $60",
      "value": "20 slots per day",
      "status": "alarm"
    }
  ],
  "choices": [
    {
      "label": "Mechanical slot failures limit supply below the terminal’s design capacity",
      "mechanism": "All 50 slots are reported usable, so mechanical loss does not explain the booking limit."
    },
    {
      "label": "Marginal operating cost exceeds price and prevents profitable slot use",
      "mechanism": "Marginal cost is $20, below $60."
    },
    {
      "label": "Demand at the charged price requires all fifty usable slots",
      "mechanism": "Demand at $60 is 20, not 50."
    },
    {
      "label": "The charged price limits demand below the usable slot capacity",
      "mechanism": "The dispatch count agrees with demand at the charged price, and usable capacity exceeds it. With unchanged marginal cost, the supplied monopoly model explains the low output without a breakdown; this does not claim every unused slot in reality proves monopoly abuse."
    }
  ],
  "answer": "The charged price limits demand below the usable slot capacity",
  "rebuttals": {
    "Mechanical slot failures limit supply below the terminal’s design capacity": "All 50 slots are reported usable, so mechanical loss does not explain the booking limit.",
    "Marginal operating cost exceeds price and prevents profitable slot use": "Marginal cost is $20, below $60.",
    "Demand at the charged price requires all fifty usable slots": "Demand at $60 is 20, not 50."
  },
  "answerText": "The dispatch count agrees with demand at the charged price, and usable capacity exceeds it. With unchanged marginal cost, the supplied monopoly model explains the low output without a breakdown; this does not claim every unused slot in reality proves monopoly abuse."
}
```

**Question card prompt — exact player copy:** Read every zone and select the one explanation consistent with all observations.

**Correct result:** "The charged price limits demand below the usable slot capacity"; exact selection or mapping required.

**Answer text:** The dispatch count agrees with demand at the charged price, and usable capacity exceeds it. With unchanged marginal cost, the supplied monopoly model explains the low output without a breakdown; this does not claim every unused slot in reality proves monopoly abuse.

**Why/mechanism:** The dispatch count agrees with demand at the charged price, and usable capacity exceeds it. With unchanged marginal cost, the supplied monopoly model explains the low output without a breakdown; this does not claim every unused slot in reality proves monopoly abuse. The capacity reading changes the meaning of the queue photographs planted earlier. All 50 slots are reported usable, so mechanical loss does not explain the booking limit. Marginal cost is $20, below $60. Demand at $60 is 20, not 50.

**Misconception / wrong-path feedback:**

- All 50 slots are reported usable, so mechanical loss does not explain the booking limit. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Marginal cost is $20, below $60. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Demand at $60 is 20, not 50. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Budget Desk stores this dated finding in text: The dispatch count agrees with demand at the charged price, and usable capacity exceeds it. With unchanged marginal cost, the supplied monopoly model explains the low output without a breakdown; this does not claim every unused slot in reality proves monopoly abuse.

**Unlock:** Stop 40.

**Retrieval:** Use the prior mission log and concepts [3, 7, 10]; the prior-result line states the immediate dependency.

**Later payoff:** Two freight firms now propose competing access contracts.

**Consistency bundle:**
```json
{
  "source_values": "Compare all readings; alarm, watch, and normal are text labels, not verdicts.",
  "derived_values": "The dispatch count agrees with demand at the charged price, and usable capacity exceeds it. With unchanged marginal cost, the supplied monopoly model explains the low output without a breakdown; this does not claim every unused slot in reality proves monopoly abuse.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "The charged price limits demand below the usable slot capacity",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The dispatch count agrees with demand at the charged price, and usable capacity exceeds it. With unchanged marginal cost, the supplied monopoly model explains the low output without a breakdown; this does not claim every unused slot in reality proves monopoly abuse.",
  "wrong_feedback_values": [
    "All 50 slots are reported usable, so mechanical loss does not explain the booking limit.",
    "Marginal cost is $20, below $60.",
    "Demand at $60 is 20, not 50."
  ],
  "later_story_references": "Two freight firms now propose competing access contracts"
}
```

## H4. Stop 40 — Name the bottleneck accurately

**Format/placement:** CHOICE, Mara Velez at the Town Map in Civic Advice Office.

**Metadata:** Concept: 16 — Monopoly price, output and surplus; Narrow concept: Name the bottleneck accurately; Keystone: Competition and entry, Surplus, Marginal analysis; Area: T; Prerequisites: 7, 10; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the freight shortage is entirely a physical capacity problem.

**Actual mission answer — authoring only:** Record market power as a cause of restricted freight bookings.

**Call — exact player copy:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Town Map.

**Stop reason — exact player copy:** The second-line proposal needs an accurate account of the existing bottleneck.

**Question card story setup — exact player copy:** Mara shows you the record: the dispatch record shows that bookings follow the price schedule while usable slots remain, and the entry barrier is documented. Choose what the town should record before committing to duplicate infrastructure as the only possible remedy.

**Prior result displayed in mission log:** The dispatch count agrees with demand at the charged price, and usable capacity exceeds it. With unchanged marginal cost, the supplied monopoly model explains the low output without a breakdown; this does not claim every unused slot in reality proves monopoly abuse.

**Question card story-science connection — exact player copy:** The town can ask whether competition requires duplicate infrastructure or better access.

**Data/readings/options — exact player copy:** The single terminal chooses 20 of 50 usable slots at $60; MR=MC at 20, while P=MC at 40 in the no-externality benchmark. A legal barrier excludes rivals from the terminal.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Record market power as a cause of restricted freight bookings",
    "Record full physical capacity as the cause of restricted freight bookings",
    "Require marginal-cost pricing without identifying funds for the fixed bill",
    "Use marginal revenue as the price that terminal customers should pay"
  ],
  "answer": "Record market power as a cause of restricted freight bookings",
  "why": "Pricing incentives and an entry barrier explain restricted output in the stated model. That makes access rules worth comparing with a new line; it does not yet establish how to cover fixed costs or external harms. The town can ask whether competition requires duplicate infrastructure or better access. Dispatch uses only 20 of 50 usable slots. Marginal-cost pricing may leave fixed costs uncovered. At the chosen output, price is 60 while marginal revenue is 20.",
  "rebuttals": {
    "Record full physical capacity as the cause of restricted freight bookings": "Dispatch uses only 20 of 50 usable slots.",
    "Require marginal-cost pricing without identifying funds for the fixed bill": "Marginal-cost pricing may leave fixed costs uncovered.",
    "Use marginal revenue as the price that terminal customers should pay": "At the chosen output, price is 60 while marginal revenue is 20."
  },
  "answerText": "Pricing incentives and an entry barrier explain restricted output in the stated model. That makes access rules worth comparing with a new line; it does not yet establish how to cover fixed costs or external harms."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Record market power as a cause of restricted freight bookings"; exact selection or mapping required.

**Answer text:** Pricing incentives and an entry barrier explain restricted output in the stated model. That makes access rules worth comparing with a new line; it does not yet establish how to cover fixed costs or external harms.

**Why/mechanism:** Pricing incentives and an entry barrier explain restricted output in the stated model. That makes access rules worth comparing with a new line; it does not yet establish how to cover fixed costs or external harms. The town can ask whether competition requires duplicate infrastructure or better access. Dispatch uses only 20 of 50 usable slots. Marginal-cost pricing may leave fixed costs uncovered. At the chosen output, price is 60 while marginal revenue is 20.

**Misconception / wrong-path feedback:**

- Dispatch uses only 20 of 50 usable slots. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Marginal-cost pricing may leave fixed costs uncovered. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- At the chosen output, price is 60 while marginal revenue is 20. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: Pricing incentives and an entry barrier explain restricted output in the stated model. That makes access rules worth comparing with a new line; it does not yet establish how to cover fixed costs or external harms.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [3, 7, 10]; the prior-result line states the immediate dependency.

**Later payoff:** Two freight firms now propose competing access contracts.

**Consistency bundle:**
```json
{
  "source_values": "The single terminal chooses 20 of 50 usable slots at $60; MR=MC at 20, while P=MC at 40 in the no-externality benchmark. A legal barrier excludes rivals from the terminal.",
  "derived_values": "Pricing incentives and an entry barrier explain restricted output in the stated model. That makes access rules worth comparing with a new line; it does not yet establish how to cover fixed costs or external harms.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Record market power as a cause of restricted freight bookings",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Pricing incentives and an entry barrier explain restricted output in the stated model. That makes access rules worth comparing with a new line; it does not yet establish how to cover fixed costs or external harms.",
  "wrong_feedback_values": [
    "Dispatch uses only 20 of 50 usable slots.",
    "Marginal-cost pricing may leave fixed costs uncovered.",
    "At the chosen output, price is 60 while marginal revenue is 20."
  ],
  "later_story_references": "Two freight firms now propose competing access contracts"
}
```

## I. Mission outcome

**Delivery piece 10:** The freight access finding. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Ruth Sen:** “The slots are usable; the contract decides who can book them.”

**Mission decision:** Market power is part of the freight problem. Only twenty of fifty usable slots are booked. The town keeps access changes in the plan. Two firms now offer a pact.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 10 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 16:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The town posts the unused terminal slots beside the proposed second-line offer.

**Automatic bar change:** Plan Evidence -3 | Service Continuity +0 | Field Budget -1 | Public Accountability +4

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [3, 0, 1, 0]; bars [100, 100, 99, 100]; bank 0, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** Yet Ruth’s rivals promise to limit expansion; Mara needs a forecast built from incentives, not that promise.

## K. Quick concept review

- A sole seller may earn more by selling fewer services at a higher price.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The town can ask whether competition requires duplicate infrastructure or better access.


## L. GO DEEPER — Price, capacity and cost recovery

**Secondary briefing — exact player copy:** Keep three questions apart: what a monopolist chooses, what buyers pay, and what output would maximize total surplus. Then ask whether an access policy pays the operator’s full cost.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- A single-price monopolist uses marginal revenue equal to marginal cost for its interior profit-maximizing quantity, then reads price from demand.
- Marginal revenue lies below price because a price cut needed for extra sales also reduces revenue on earlier units.
- Without externalities, the efficient output equates marginal willingness to pay with marginal cost. It need not be the monopoly output.
- A natural monopoly can have average total cost above marginal cost. Regulating price at marginal cost can require separate funding for a resulting total-cost gap.

### BT-GD-M10-Q1

**Question:** A monopolist faces P=50−Q and constant MC=10; MR=50−2Q. What profit-maximizing quantity solves MR=MC?

- **A.** 50 units
- **B.** 20 units
- **C.** 40 units
- **D.** 10 units

**Correct key:** B

**Hint:** Use MR=MC for the firm and marginal benefit equals marginal social cost for efficiency; obtain price from demand.

**Worked explanation — reveal on request:** Fifty minus twice Q equals ten, so Q is twenty.

**Feedback A:** Reconsider. Fifty is the demand intercept at zero price.

**Feedback B:** Correct. Fifty minus twice Q equals ten, so Q is twenty.

**Feedback C:** Reconsider. Forty solves P=MC, the no-externality efficient benchmark.

**Feedback D:** Reconsider. Ten is marginal cost, not the optimizing quantity.


### BT-GD-M10-Q2

**Question:** With demand P=50−Q, a monopolist chooses Q=20. What price can it charge for that quantity?

- **A.** $30
- **B.** $10
- **C.** $20
- **D.** $50

**Correct key:** A

**Hint:** Use MR=MC for the firm and marginal benefit equals marginal social cost for efficiency; obtain price from demand.

**Worked explanation — reveal on request:** Substituting twenty into the demand curve gives fifty minus twenty.

**Feedback A:** Correct. Substituting twenty into the demand curve gives fifty minus twenty.

**Feedback B:** Reconsider. That would be MR at twenty, not the buyer price.

**Feedback C:** Reconsider. That is the chosen quantity, not its price.

**Feedback D:** Reconsider. That price occurs at zero quantity on this curve.


### BT-GD-M10-Q3

**Question:** Why is marginal revenue below price for a single-price monopolist on a downward demand curve?

- **A.** The firm sells every unit at marginal cost
- **B.** Demand must be upward sloping
- **C.** All fixed costs rise with output
- **D.** Selling more requires a lower price on earlier units as well

**Correct key:** D

**Hint:** Use MR=MC for the firm and marginal benefit equals marginal social cost for efficiency; obtain price from demand.

**Worked explanation — reveal on request:** The extra unit earns revenue, but the price cut reduces revenue on inframarginal sales.

**Feedback A:** Reconsider. That is not implied by monopoly.

**Feedback B:** Reconsider. The premise explicitly says downward sloping.

**Feedback C:** Reconsider. Fixed cost does not explain the revenue relation.

**Feedback D:** Correct. The extra unit earns revenue, but the price cut reduces revenue on inframarginal sales.


### BT-GD-M10-Q4

**Question:** Demand is P=50−Q and MC=10, with no externalities. Which output maximizes total surplus?

- **A.** 50 units
- **B.** 10 units
- **C.** 40 units
- **D.** 20 units

**Correct key:** C

**Hint:** Use MR=MC for the firm and marginal benefit equals marginal social cost for efficiency; obtain price from demand.

**Worked explanation — reveal on request:** Set marginal willingness to pay equal to marginal cost: fifty minus Q equals ten.

**Feedback A:** Reconsider. At fifty, marginal willingness to pay is zero while cost remains ten.

**Feedback B:** Reconsider. The marginal cost number is not itself the output solution.

**Feedback C:** Correct. Set marginal willingness to pay equal to marginal cost: fifty minus Q equals ten.

**Feedback D:** Reconsider. That is the single-price monopoly output, not the efficient benchmark.


### BT-GD-M10-Q5

**Question:** An operator has spare usable capacity but restricts bookings to increase profit. What does the spare capacity show?

- **A.** All regulation will be costless
- **B.** A physical expansion may not be the first remedy for restricted access
- **C.** The operator has no costs
- **D.** The price must equal marginal cost

**Correct key:** B

**Hint:** Use MR=MC for the firm and marginal benefit equals marginal social cost for efficiency; obtain price from demand.

**Worked explanation — reveal on request:** Unused usable slots separate the capacity constraint from the operator's chosen output.

**Feedback A:** Reconsider. Changing access can require administration and a cost-recovery plan.

**Feedback B:** Correct. Unused usable slots separate the capacity constraint from the operator's chosen output.

**Feedback C:** Reconsider. Spare capacity does not erase maintenance or fixed costs.

**Feedback D:** Reconsider. Spare usable capacity does not establish marginal-cost pricing.


### BT-GD-M10-Q6

**Question:** A natural monopoly has average cost $14 and marginal cost $8 at the proposed output of 100. If price is regulated at $8, what funding gap results?

- **A.** $600
- **B.** $6
- **C.** $800
- **D.** No gap because P=MC is efficient

**Correct key:** A

**Hint:** Use MR=MC for the firm and marginal benefit equals marginal social cost for efficiency; obtain price from demand.

**Worked explanation — reveal on request:** Total cost is fourteen hundred and sales revenue eight hundred.

**Feedback A:** Correct. Total cost is fourteen hundred and sales revenue eight hundred.

**Feedback B:** Reconsider. That is the gap per unit, not total funding.

**Feedback C:** Reconsider. That is revenue, not the deficit.

**Feedback D:** Reconsider. Marginal-cost pricing can leave fixed costs uncovered.


# Mission 11 — TWO OFFERS, ONE GATE

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 11 OF 15

**Card title:** TWO OFFERS, ONE GATE

**Go now:** Go to Freight Contract Office and meet Ruth Sen, terminal manager, at the Dispatch Desk.

**Card body:** The gate has spare space, but two firms now offer a pact. Each could gain by breaking its word. Today you decide if the town can trust their joint plan. By the end of the mission, you will test each firm’s best move.

**Objective:** Decide whether the firms will keep their low-output pact without enforcement.

**Stakes — exact player copy:** You decide which service forecast to use. A pact the firms have reason to break can leave the town planning for the wrong traffic.

### Worth knowing first — exact player copy

#### Glossary terms

Dominant strategy: An action that is best regardless of the other player’s action.

Nash equilibrium: A set of actions where neither player gains by changing alone.

Oligopoly: A market with a few interdependent sellers.

Collusion: An agreement among firms to reduce competition.

#### Primer concepts

**Required local preparation — read before Stop 41:** Hold the other firm’s choice fixed. Compare your firm’s payoffs for its own two choices. Repeat for the other possible rival choice; a joint gain does not by itself make a pact stable.

- When each firm’s best move depends on its rival, the outcome can differ from a joint agreement.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

This mission retrieves the relationships already recorded in the mission log.

**Required equation or concept use — authoring/render check:** No new equation; read each firm’s supplied payoff and compare unilateral changes at Stops 41–43.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. If choosing A yields 7 against Left and 4 against Right while B yields 5 and 2, A is dominant.

2. If both players can gain by changing from their current actions, that profile is not a Nash equilibrium.

3. A joint payoff of 12 can exceed another profile’s 10 even when each player individually wants to leave the higher joint profile.

4. If one firm’s price cut wins many buyers only while rivals hold prices, its gain depends on rivals’ reactions.

5. A promise without a credible enforcement mechanism is not the same evidence as a signed and enforceable commitment.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

Unused freight space weakens the case for building at once, but two firms now bargain over access. The four findings establish: Read what the pact offers → Read each incentive → Freeze the forecast → Use a defensible service forecast. The hearing removes the unenforced pact from its guaranteed service forecasts. Extra freight would also add traffic and pollution.

## C. Designer intent — not shown to player

The mission moves from oligopoly and strategic interaction to a concrete recommendation: Expect both firms to expand under the one-shot payoff table. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M11-A — On arrival at Freight Contract Office

**Location:** Freight Contract Office.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Ruth Sen, terminal manager:** “Their joint promise is printed here; their separate payoffs are here.”

**Unlocks:** Stop 41.

### Beat BT-M11-1 — After Stop 41

**Location:** Freight Contract Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The pact gives 40+40 = 80 thousand dollars daily across the two firms; the combined total alone does not establish that each wants to comply. Take this result to Business Workshop; its original records are needed for read each incentive.

**Unlocks:** Stop 42.

**Dialogue bubble — Ruth Sen:** “The joint return makes the pact look comfortable on paper.”

**Dialogue bubble — Nico Bell, radio:** “Only if the other firm stays put when breaking it pays. My supplies need a forecast that survives that choice.”

### Beat BT-M11-2 — After Stop 42

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Against restriction, expansion raises A’s own payoff from 40 to 60. Against expansion, expansion raises A’s payoff from 20 to 30. The symmetric table gives B the same gain of 20 against restriction. B gains 10 against expansion; compare its own coordinate. Take this result to Civic Advice Office; its original records are needed for freeze the forecast.

**Unlocks:** Stop 43.

**Dialogue bubble — Ruth Sen:** “We can publish the incentive each firm faces. We cannot sign a promise on its behalf.”

### Beat BT-M11-3 — After Stop 43

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Expansion is each firm’s dominant strategy, so both expand; neither gains by switching alone from that profile, and A receives 30 thousand dollars.

**Unlocks:** Stop 44.

### Beat BT-M11-4 — After Stop 44

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Expect both firms to expand under the one-shot payoff table

**Unlocks:** Mission outcome.

### Beat BT-M11-E — At mission end

**Location:** Civic Advice Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The pact’s guaranteed-service stamp is revoked and its forecast is relabeled conditional.

**Panel/HUD text:** The pact’s guaranteed-service stamp is revoked and its forecast is relabeled conditional. Extra freight would also add traffic and pollution.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Ruth Sen:** “I have taken the guarantee sleeve off. A forecast is stronger when it states what neither firm has promised to do.”


## E. Location plan

**3 locations:** Freight Contract Office → Business Workshop → Civic Advice Office.

Stop 41: Freight Contract Office / Dispatch Desk | Stop 42: Business Workshop / Kitchen Planning Table | Stop 43: Civic Advice Office / Hearing Table | Stop 44: Civic Advice Office / Town Map. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Ruth Sen, terminal manager:** owns the original records in Freight Contract Office and must explain the recommendation to the people affected.

**Nico Bell, diner owner:** owns the original records in Business Workshop and must explain the recommendation to the people affected.

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

The pact’s guaranteed-service stamp is revoked and its forecast is relabeled conditional. Extra freight would also add traffic and pollution.

## G. Key concepts, explained here

- **Dominant strategy:** An action that is best regardless of the other player’s action.

- **Nash equilibrium:** A set of actions where neither player gains by changing alone.

- **Oligopoly:** A market with a few interdependent sellers.

- **Collusion:** An agreement among firms to reduce competition.

## H1. Stop 41 — Read what the pact offers

**Format/placement:** BALLPARK, Freight Contract Office — Dispatch Desk.

**Metadata:** Concept: 17 — Oligopoly and strategic interaction; Narrow concept: Read what the pact offers; Keystone: Competition and entry, Price incentives; Area: E; Prerequisites: 16; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit combined profit if both firms Restrict.

**Briefing decision advanced:** whether the firms will keep their low-output pact without enforcement.

**Actual mission answer — authoring only:** Expect both firms to expand under the one-shot payoff table.

**Call — exact player copy:** Go to the Dispatch Desk in Freight Contract Office.

**Stop reason — exact player copy:** The pact’s joint gain must be separated from incentives to comply.

**Question card story setup — exact player copy:** Ruth shows you the record: unused terminal space has reopened the access debate, and two firms now offer a pact that promises orderly service. Read their joint payoff before checking whether either firm has a reason to leave the announced agreement.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** A large joint profit is not evidence of individual stability.

**Data/readings/options — exact player copy:** Payoffs are daily profit in thousands of dollars, listed (Firm A,Firm B): both Restrict (40,40); A Expand/B Restrict (60,20); A Restrict/B Expand (20,60); both Expand (30,30).

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Read what the pact offers",
    "units": "thousand dollars per day",
    "labels": [
      "40",
      "40",
      "30",
      "60"
    ],
    "values": [
      40,
      40,
      30,
      60
    ],
    "slots": 2,
    "template": "{a} {b}",
    "formula": "a+b",
    "correct": [
      0,
      1
    ],
    "target": 80,
    "tolerance": 0.05,
    "correctResult": 80
  },
  "answerText": "The pact gives 40+40 = 80 thousand dollars daily across the two firms; the combined total alone does not establish that each wants to comply.",
  "wrongFeedback": [
    "40 counts only one firm.",
    "60 is the both-expand total.",
    "120 combines incompatible unilateral outcomes."
  ]
}
```

**Question card prompt — exact player copy:** Submit combined profit if both firms Restrict.

**Correct result:** 80; absolute tolerance 0.05 in the requested unit.

**Answer text:** The pact gives 40+40 = 80 thousand dollars daily across the two firms; the combined total alone does not establish that each wants to comply.

**Why/mechanism:** The pact gives 40+40 = 80 thousand dollars daily across the two firms; the combined total alone does not establish that each wants to comply. A large joint profit is not evidence of individual stability. Strategic interaction requires individual incentive comparisons; a combined payoff cannot show whether a firm benefits from changing its own action while its rival stays put. 40 counts only one firm. 60 is the both-expand total.

**Misconception / wrong-path feedback:**

- 40 counts only one firm. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 60 is the both-expand total. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 120 combines incompatible unilateral outcomes. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Dispatch Desk stores this dated finding in text: The pact gives 40+40 = 80 thousand dollars daily across the two firms; the combined total alone does not establish that each wants to comply.

**Unlock:** Stop 42.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** Extra freight would also add traffic and pollution.

**Consistency bundle:**
```json
{
  "source_values": "Payoffs are daily profit in thousands of dollars, listed (Firm A,Firm B): both Restrict (40,40); A Expand/B Restrict (60,20); A Restrict/B Expand (20,60); both Expand (30,30).",
  "derived_values": "The pact gives 40+40 = 80 thousand dollars daily across the two firms; the combined total alone does not establish that each wants to comply.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 80,
  "tolerance": 0.05,
  "answer_text_values": "The pact gives 40+40 = 80 thousand dollars daily across the two firms; the combined total alone does not establish that each wants to comply.",
  "wrong_feedback_values": [
    "40 counts only one firm.",
    "60 is the both-expand total.",
    "120 combines incompatible unilateral outcomes."
  ],
  "later_story_references": "Extra freight would also add traffic and pollution"
}
```

## H2. Stop 42 — Read each incentive

**Format/placement:** PROTOCOL, Business Workshop — Kitchen Planning Table.

**Metadata:** Concept: 17 — Oligopoly and strategic interaction; Narrow concept: Read each incentive; Keystone: Competition and entry, Price incentives; Area: CM; Prerequisites: 16; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the firms will keep their low-output pact without enforcement.

**Actual mission answer — authoring only:** Expect both firms to expand under the one-shot payoff table.

**Call — exact player copy:** Go to the Kitchen Planning Table in Business Workshop.

**Stop reason — exact player copy:** Each firm must be checked against both actions its rival could take.

**Question card story setup — exact player copy:** Nico shows you the record: the pact offers a higher combined profit than mutual expansion, but each firm controls only its own action. Compare each possible reply before treating the companies’ joint statement as a reliable prediction of what they will do.

**Prior result displayed in mission log:** The pact gives 40+40 = 80 thousand dollars daily across the two firms; the combined total alone does not establish that each wants to comply.

**Question card story-science connection — exact player copy:** Each firm’s choice must be evaluated using its own payoff.

**Data/readings/options — exact player copy:** Use the same payoff table; no repeats, side payments, enforcement or communication beyond the announced pact exist.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "B Restricts: compare A’s 40 with 60"
    },
    {
      "id": "e2",
      "label": "B Expands: compare A’s 20 with 30"
    },
    {
      "id": "e3",
      "label": "A Restricts: compare B’s 40 with 60"
    },
    {
      "id": "e4",
      "label": "A Expands: compare B’s 20 with 30"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "A gains 20 by Expanding"
    },
    {
      "id": "r2",
      "label": "A gains 10 by Expanding"
    },
    {
      "id": "r3",
      "label": "B gains 20 by Expanding"
    },
    {
      "id": "r4",
      "label": "B gains 10 by Expanding"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "Against restriction, expansion raises A’s own payoff from 40 to 60. Against expansion, expansion raises A’s payoff from 20 to 30. The symmetric table gives B the same gain of 20 against restriction. B gains 10 against expansion; compare its own coordinate. Each firm’s choice must be evaluated using its own payoff. The first and second entries compare A’s coordinate only, while the last two compare B’s coordinate only; mixing coordinates would compare different people’s interests rather than a best response.",
  "answerText": "Against restriction, expansion raises A’s own payoff from 40 to 60. Against expansion, expansion raises A’s payoff from 20 to 30. The symmetric table gives B the same gain of 20 against restriction. B gains 10 against expansion; compare its own coordinate.",
  "rebuttals": {
    "e1": "Against restriction, expansion raises A’s own payoff from 40 to 60.",
    "e2": "Against expansion, expansion raises A’s payoff from 20 to 30.",
    "e3": "The symmetric table gives B the same gain of 20 against restriction.",
    "e4": "B gains 10 against expansion; compare its own coordinate."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"B Restricts: compare A’s 40 with 60": "A gains 20 by Expanding", "B Expands: compare A’s 20 with 30": "A gains 10 by Expanding", "A Restricts: compare B’s 40 with 60": "B gains 20 by Expanding", "A Expands: compare B’s 20 with 30": "B gains 10 by Expanding"}; exact selection or mapping required.

**Answer text:** Against restriction, expansion raises A’s own payoff from 40 to 60. Against expansion, expansion raises A’s payoff from 20 to 30. The symmetric table gives B the same gain of 20 against restriction. B gains 10 against expansion; compare its own coordinate.

**Why/mechanism:** Against restriction, expansion raises A’s own payoff from 40 to 60. Against expansion, expansion raises A’s payoff from 20 to 30. The symmetric table gives B the same gain of 20 against restriction. B gains 10 against expansion; compare its own coordinate. Each firm’s choice must be evaluated using its own payoff. The first and second entries compare A’s coordinate only, while the last two compare B’s coordinate only; mixing coordinates would compare different people’s interests rather than a best response.

**Misconception / wrong-path feedback:**

- Against restriction, expansion raises A’s own payoff from 40 to 60. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Against expansion, expansion raises A’s payoff from 20 to 30. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The symmetric table gives B the same gain of 20 against restriction. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- B gains 10 against expansion; compare its own coordinate. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Kitchen Planning Table stores this dated finding in text: Against restriction, expansion raises A’s own payoff from 40 to 60. Against expansion, expansion raises A’s payoff from 20 to 30. The symmetric table gives B the same gain of 20 against restriction. B gains 10 against expansion; compare its own coordinate.

**Unlock:** Stop 43.

**Retrieval:** Use the prior mission log and concepts [3, 16]; the prior-result line states the immediate dependency.

**Later payoff:** Extra freight would also add traffic and pollution.

**Consistency bundle:**
```json
{
  "source_values": "Use the same payoff table; no repeats, side payments, enforcement or communication beyond the announced pact exist.",
  "derived_values": "Against restriction, expansion raises A’s own payoff from 40 to 60. Against expansion, expansion raises A’s payoff from 20 to 30. The symmetric table gives B the same gain of 20 against restriction. B gains 10 against expansion; compare its own coordinate.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "B Restricts: compare A’s 40 with 60": "A gains 20 by Expanding",
    "B Expands: compare A’s 20 with 30": "A gains 10 by Expanding",
    "A Restricts: compare B’s 40 with 60": "B gains 20 by Expanding",
    "A Expands: compare B’s 20 with 30": "B gains 10 by Expanding"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Against restriction, expansion raises A’s own payoff from 40 to 60. Against expansion, expansion raises A’s payoff from 20 to 30. The symmetric table gives B the same gain of 20 against restriction. B gains 10 against expansion; compare its own coordinate.",
  "wrong_feedback_values": [
    "Against restriction, expansion raises A’s own payoff from 40 to 60.",
    "Against expansion, expansion raises A’s payoff from 20 to 30.",
    "The symmetric table gives B the same gain of 20 against restriction.",
    "B gains 10 against expansion; compare its own coordinate."
  ],
  "later_story_references": "Extra freight would also add traffic and pollution"
}
```

## H3. Stop 43 — Freeze the forecast

**Format/placement:** VERIFY, Civic Advice Office — Hearing Table.

**Metadata:** Concept: 17 — Oligopoly and strategic interaction; Narrow concept: Freeze the forecast; Keystone: Competition and entry, Price incentives; Area: T; Prerequisites: 16; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** operated; First, calculate and commit Firm A’s payoff at the stable action pair in thousands of dollars. Then run the Hearing Table with the same payoff table, measure A’s payoff, and select whether it matches; no restoration or second reading is required.

**Briefing decision advanced:** whether the firms will keep their low-output pact without enforcement.

**Actual mission answer — authoring only:** Expect both firms to expand under the one-shot payoff table.

**Call — exact player copy:** Go to the Hearing Table in Civic Advice Office.

**Stop reason — exact player copy:** The service forecast must survive each firm’s own incentive to change.

**Question card story setup — exact player copy:** Mara shows you the record: the reply comparisons now identify the firms’ incentives under either rival choice, allowing a forecast that can be committed in advance. Run the unchanged one-round table before using the pact’s promised output in public service planning.

**Prior result displayed in mission log:** Against restriction, expansion raises A’s own payoff from 40 to 60. Against expansion, expansion raises A’s payoff from 20 to 30. The symmetric table gives B the same gain of 20 against restriction. B gains 10 against expansion; compare its own coordinate.

**Question card story-science connection — exact player copy:** A forecast that survives unilateral incentives is safer than the companies’ joint promise.

**Data/readings/options — exact player copy:** Use payoffs (40,40),(60,20),(20,60),(30,30) for Restrict/Restrict, Expand/Restrict, Restrict/Expand, Expand/Expand. Both choose simultaneously, maximizing own profit in one round.

**Format-specific interaction block:**

```json
{
  "verify": {
    "quantity": "Freeze the forecast",
    "units": "thousand dollars per day",
    "predictionRange": {
      "min": 0,
      "max": 80,
      "step": 1
    },
    "truth": 30,
    "tolerance": 0.05,
    "measurement": {
      "label": "Run trial and read result",
      "cost": 1,
      "units": "trial credit"
    },
    "measurementBudget": 2,
    "conclusions": [
      "Prediction matches the trial",
      "Prediction does not match the trial"
    ],
    "correctConclusion": "Prediction matches the trial",
    "requiredSequence": [
      "calculate_commit",
      "operate",
      "measure",
      "interpret"
    ],
    "initialPrediction": null,
    "locks": {
      "operate": "prediction committed",
      "measure": "trial operated",
      "interpret": "reading collected"
    }
  },
  "answerText": "Expansion is each firm’s dominant strategy, so both expand; neither gains by switching alone from that profile, and A receives 30 thousand dollars.",
  "wrongFeedback": [
    "40 assumes cooperation without incentive support.",
    "60 assumes only A deviates while B Restricts.",
    "20 assumes A keeps restricting while B expands."
  ]
}
```

**Question card prompt — exact player copy:** First, calculate and commit Firm A’s payoff at the stable action pair in thousands of dollars. Then run the Hearing Table with the same payoff table, measure A’s payoff, and select whether it matches; no restoration or second reading is required.

**Correct result:** 30; absolute tolerance 0.05 in the requested unit.

**Answer text:** Expansion is each firm’s dominant strategy, so both expand; neither gains by switching alone from that profile, and A receives 30 thousand dollars.

**Why/mechanism:** Expansion is each firm’s dominant strategy, so both expand; neither gains by switching alone from that profile, and A receives 30 thousand dollars. A forecast that survives unilateral incentives is safer than the companies’ joint promise. Competition between these firms is modeled as simultaneous and one-shot; repeat business, punishments or a binding agreement could change the incentive problem and need separate evidence. 40 assumes cooperation without incentive support. 60 assumes only A deviates while B Restricts.

**Misconception / wrong-path feedback:**

- 40 assumes cooperation without incentive support. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 60 assumes only A deviates while B Restricts. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 20 assumes A keeps restricting while B expands. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Hearing Table stores this dated finding in text: Expansion is each firm’s dominant strategy, so both expand; neither gains by switching alone from that profile, and A receives 30 thousand dollars.

**Unlock:** Stop 44.

**Retrieval:** Use the prior mission log and concepts [3, 16]; the prior-result line states the immediate dependency.

**Later payoff:** Extra freight would also add traffic and pollution.

**Consistency bundle:**
```json
{
  "source_values": "Use payoffs (40,40),(60,20),(20,60),(30,30) for Restrict/Restrict, Expand/Restrict, Restrict/Expand, Expand/Expand. Both choose simultaneously, maximizing own profit in one round.",
  "derived_values": "Expansion is each firm’s dominant strategy, so both expand; neither gains by switching alone from that profile, and A receives 30 thousand dollars.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": 30,
  "correct_result": 30,
  "tolerance": 0.05,
  "answer_text_values": "Expansion is each firm’s dominant strategy, so both expand; neither gains by switching alone from that profile, and A receives 30 thousand dollars.",
  "wrong_feedback_values": [
    "40 assumes cooperation without incentive support.",
    "60 assumes only A deviates while B Restricts.",
    "20 assumes A keeps restricting while B expands."
  ],
  "later_story_references": "Extra freight would also add traffic and pollution"
}
```

## H4. Stop 44 — Use a defensible service forecast

**Format/placement:** CHOICE, Mara Velez at the Town Map in Civic Advice Office.

**Metadata:** Concept: 17 — Oligopoly and strategic interaction; Narrow concept: Use a defensible service forecast; Keystone: Competition and entry, Price incentives; Area: T; Prerequisites: 16; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the firms will keep their low-output pact without enforcement.

**Actual mission answer — authoring only:** Predict both firms expand, since each gains by expanding against either choice by its rival.

**Call — exact player copy:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Town Map.

**Stop reason — exact player copy:** An unenforced pact cannot be treated as guaranteed supply.

**Question card story setup — exact player copy:** Mara shows you the record: the trial follows the stable action pair rather than the larger joint payoff, and the pact has no enforcement mechanism. Choose the forecast the hearing may rely on before extra freight becomes a promise to residents.

**Prior result displayed in mission log:** Expansion is each firm’s dominant strategy, so both expand; neither gains by switching alone from that profile, and A receives 30 thousand dollars.

**Question card story-science connection — exact player copy:** The town must not budget service on an unstable private promise.

**Data/readings/options — exact player copy:** Both firms gain from Expand under either rival action; the only Nash equilibrium of this one-shot table is Expand/Expand, yielding (30,30), below the pact’s joint (40,40).

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Predict either joint-profit maximum as the Nash equilibrium outcome",
    "Predict both firms expand, since each gains by expanding against either choice by its rival",
    "Predict both firms restrict using their combined profit advantage",
    "Predict only A expands using the same incentives for both firms"
  ],
  "answer": "Predict both firms expand, since each gains by expanding against either choice by its rival",
  "why": "The stable prediction follows each firm’s incentives, not their joint total. Both expanding is worse for both firms than mutual restriction, but neither wants to remain restricted while the other expands under the stated one-shot conditions. The town must not budget service on an unstable private promise. Each firm can increase its own profit by leaving mutual restriction. The incentives are symmetric for B. A Nash equilibrium concerns unilateral deviations, not collective maximization.",
  "rebuttals": {
    "Predict both firms restrict using their combined profit advantage": "Each firm can increase its own profit by leaving mutual restriction.",
    "Predict only A expands using the same incentives for both firms": "The incentives are symmetric for B.",
    "Predict either joint-profit maximum as the Nash equilibrium outcome": "A Nash equilibrium concerns unilateral deviations, not collective maximization."
  },
  "answerText": "The stable prediction follows each firm’s incentives, not their joint total. Both expanding is worse for both firms than mutual restriction, but neither wants to remain restricted while the other expands under the stated one-shot conditions."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Predict both firms expand, since each gains by expanding against either choice by its rival"; exact selection or mapping required.

**Answer text:** The stable prediction follows each firm’s incentives, not their joint total. Both expanding is worse for both firms than mutual restriction, but neither wants to remain restricted while the other expands under the stated one-shot conditions.

**Why/mechanism:** The stable prediction follows each firm’s incentives, not their joint total. Both expanding is worse for both firms than mutual restriction, but neither wants to remain restricted while the other expands under the stated one-shot conditions. The town must not budget service on an unstable private promise. Each firm can increase its own profit by leaving mutual restriction. The incentives are symmetric for B. A Nash equilibrium concerns unilateral deviations, not collective maximization.

**Misconception / wrong-path feedback:**

- Each firm can increase its own profit by leaving mutual restriction. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The incentives are symmetric for B. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- A Nash equilibrium concerns unilateral deviations, not collective maximization. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: The stable prediction follows each firm’s incentives, not their joint total. Both expanding is worse for both firms than mutual restriction, but neither wants to remain restricted while the other expands under the stated one-shot conditions.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [3, 16]; the prior-result line states the immediate dependency.

**Later payoff:** Extra freight would also add traffic and pollution.

**Consistency bundle:**
```json
{
  "source_values": "Both firms gain from Expand under either rival action; the only Nash equilibrium of this one-shot table is Expand/Expand, yielding (30,30), below the pact’s joint (40,40).",
  "derived_values": "The stable prediction follows each firm’s incentives, not their joint total. Both expanding is worse for both firms than mutual restriction, but neither wants to remain restricted while the other expands under the stated one-shot conditions.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Predict both firms expand, since each gains by expanding against either choice by its rival",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The stable prediction follows each firm’s incentives, not their joint total. Both expanding is worse for both firms than mutual restriction, but neither wants to remain restricted while the other expands under the stated one-shot conditions.",
  "wrong_feedback_values": [
    "Each firm can increase its own profit by leaving mutual restriction.",
    "The incentives are symmetric for B.",
    "A Nash equilibrium concerns unilateral deviations, not collective maximization."
  ],
  "later_story_references": "Extra freight would also add traffic and pollution"
}
```

## I. Mission outcome

**Delivery piece 11:** The pact risk forecast. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Ruth Sen:** “Their joint promise is printed here; their separate payoffs are here.”

**Mission decision:** Expect both firms to expand in the one-round model. Each gains by expanding under either rival move. The pact loses its guarantee stamp. More freight may raise water costs.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 11 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 20:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The hearing removes the unenforced pact from its guaranteed service forecasts.

**Automatic bar change:** Plan Evidence +2 | Service Continuity +1 | Field Budget -1 | Public Accountability +2

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [0, 0, 2, 0]; bars [100, 100, 100, 100]; bank 2, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** But Owen says more freight sends more harm downstream; the firms’ payoffs leave that bill out.

## K. Quick concept review

- When each firm’s best move depends on its rival, the outcome can differ from a joint agreement.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The town must not budget service on an unstable private promise.


## L. GO DEEPER — Promises and incentives

**Secondary briefing — exact player copy:** Read each firm’s choices separately before judging their joint proposal. The table in these questions describes a one-shot game; later questions ask what evidence would be needed to change that model.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- A best response maximizes one player’s payoff with the other player’s action held fixed. Read the correct player’s number in each payoff pair.
- A dominant action is best against each available rival action. A Nash equilibrium is a set of mutual best responses; no player gains by switching alone.
- The joint maximum can differ from equilibrium because each firm has an incentive to deviate. Joint preference does not itself enforce cooperation.
- Repeated dealings or enforceable penalties change the incentives. They require specified future payoffs or credible consequences before a coordinated forecast can be justified.

### BT-GD-M11-Q1

**Question:** Two firms choose Hold or Expand. Payoffs (A,B) are HH=(6,6), EH=(8,3), HE=(3,8), EE=(4,4). What is A's best response if B holds?

- **A.** Expand
- **B.** Hold
- **C.** Either equally
- **D.** Wait because B receives three

**Correct key:** A

**Hint:** Hold the other firm’s action fixed and compare only the deciding firm’s payoffs before looking for mutual best responses.

**Worked explanation — reveal on request:** A receives eight from expansion versus six from holding.

**Feedback A:** Correct. A receives eight from expansion versus six from holding.

**Feedback B:** Reconsider. Six is smaller than eight for A.

**Feedback C:** Reconsider. The two payoffs differ.

**Feedback D:** Reconsider. A's best response compares A's own payoffs.


### BT-GD-M11-Q2

**Question:** Using HH=(6,6), EH=(8,3), HE=(3,8), EE=(4,4), what is A's best response if B expands?

- **A.** Hold
- **B.** Either equally
- **C.** The joint maximum regardless of B
- **D.** Expand

**Correct key:** D

**Hint:** Hold the other firm’s action fixed and compare only the deciding firm’s payoffs before looking for mutual best responses.

**Worked explanation — reveal on request:** A earns four from expanding versus three from holding.

**Feedback A:** Reconsider. Holding gives A three when B expands.

**Feedback B:** Reconsider. Four and three are not tied.

**Feedback C:** Reconsider. A best response holds B's stated action fixed.

**Feedback D:** Correct. A earns four from expanding versus three from holding.


### BT-GD-M11-Q3

**Question:** For HH=(6,6), EH=(8,3), HE=(3,8), EE=(4,4), which outcome is a Nash equilibrium?

- **A.** Only A expands
- **B.** Only B expands
- **C.** Both expand
- **D.** Both hold

**Correct key:** C

**Hint:** Hold the other firm’s action fixed and compare only the deciding firm’s payoffs before looking for mutual best responses.

**Worked explanation — reveal on request:** Neither can improve alone from EE: switching to Hold reduces its payoff from four to three.

**Feedback A:** Reconsider. B would then gain from expanding too.

**Feedback B:** Reconsider. A would then gain from expanding too.

**Feedback C:** Correct. Neither can improve alone from EE: switching to Hold reduces its payoff from four to three.

**Feedback D:** Reconsider. Either can gain by expanding alone from HH.


### BT-GD-M11-Q4

**Question:** Why can both firms prefer HH=(6,6) to EE=(4,4) yet end at EE in the one-shot game described?

- **A.** A Nash equilibrium always maximizes joint profit
- **B.** Each has an individual incentive to expand regardless of the other's choice
- **C.** Each firm maximizes the combined payoff
- **D.** The joint total at EE is higher

**Correct key:** B

**Hint:** Hold the other firm’s action fixed and compare only the deciding firm’s payoffs before looking for mutual best responses.

**Worked explanation — reveal on request:** Joint preference does not remove each firm's unilateral gain from deviation.

**Feedback A:** Reconsider. This table is a counterexample.

**Feedback B:** Correct. Joint preference does not remove each firm's unilateral gain from deviation.

**Feedback C:** Reconsider. That would favor HH; the one-shot incentive compares each firm’s own payoff.

**Feedback D:** Reconsider. Eight is lower than twelve.


### BT-GD-M11-Q5

**Question:** A long-term relationship adds credible future penalties for breaking a pact. What must an analyst do before reusing the one-shot prediction?

- **A.** Specify the repeated game's incentives and compare gains from deviation with future losses
- **B.** Assume cooperation is guaranteed forever
- **C.** Ignore future losses by definition
- **D.** Delete the possibility of deviation

**Correct key:** A

**Hint:** Hold the other firm’s action fixed and compare only the deciding firm’s payoffs before looking for mutual best responses.

**Worked explanation — reveal on request:** The new enforcement and future payoffs alter the decision problem.

**Feedback A:** Correct. The new enforcement and future payoffs alter the decision problem.

**Feedback B:** Reconsider. Future interaction alone does not establish incentive compatibility.

**Feedback C:** Reconsider. They are part of the changed model.

**Feedback D:** Reconsider. A credible analysis must still examine that choice.


### BT-GD-M11-Q6

**Question:** A contract forecast assumes voluntary coordination but supplies no enforcement or repeated-game payoffs. What is the defensible reporting choice?

- **A.** Call the joint maximum guaranteed service
- **B.** Report only the worse number without its assumptions
- **C.** Treat the contract title as proof of compliance
- **D.** Label the coordinated result conditional and keep the supported one-shot forecast separate

**Correct key:** D

**Hint:** Hold the other firm’s action fixed and compare only the deciding firm’s payoffs before looking for mutual best responses.

**Worked explanation — reveal on request:** This distinguishes a desired pact outcome from the evidence for actual incentives.

**Feedback A:** Reconsider. A desirable joint payoff is not enforcement.

**Feedback B:** Reconsider. A forecast still needs its model and conditions.

**Feedback C:** Reconsider. A label does not specify incentives or enforceability.

**Feedback D:** Correct. This distinguishes a desired pact outcome from the evidence for actual incentives.


# Mission 12 — THE WATER BELOW

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 12 OF 15

**Card title:** THE WATER BELOW

**Go now:** Go to Water and Land Office and meet Owen Price, watershed engineer, at the Water Record Desk.

**Card body:** The firms may move more freight, but the water bill grows. People down the stream pay a cost left out of the price. Today you decide if the freight goal should change. By the end of the mission, you will add that harm to the count.

**Objective:** Decide whether the town should use the uncorrected freight quantity as its efficiency target.

**Stakes — exact player copy:** You decide the freight target after counting water harm. Owen’s downstream users pay costs that freight prices leave out.

### Worth knowing first — exact player copy

#### Glossary terms

External cost: A cost imposed on people outside a transaction.

Marginal social cost: Private marginal cost plus external marginal cost.

Marginal social benefit: Private marginal benefit plus external marginal benefit.

Public good: A good that is both nonrival and nonexcludable.

Common resource: A rival resource from which users are difficult to exclude.

Free rider: Someone who benefits without contributing to provision.

#### Primer concepts

**Required local preparation — read before Stop 45:** Compare the benefit of one more freight unit with its whole extra cost. Add the private cost and the harm borne by others. Count each once.

- A transaction can harm people who are not buying or selling in that market.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** MSC=MPC+MEC; efficient output satisfies MSB=MSC  
**What it is for:** Include costs or benefits outside the market transaction.  
**Symbols:** MSC is marginal social cost; MPC private marginal cost; MEC external marginal cost; MSB marginal social benefit.  
**Why this campaign needs it:** The freight decision must account for downstream water users.

**Required equation or concept use — authoring/render check:** Stop 45: 20+20=$40; Stop 47: 100−2Q=40 gives Q=30.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. Private marginal cost 7 plus external marginal cost 3 gives social marginal cost 10.

2. If MSB=22−Q and MSC=10, efficient output is Q=12.

3. A nonexcludable crowded fishing pond is rival because one catch reduces fish available to others; it is a common resource.

4. An alert message can be read by another person without reducing its availability; if exclusion is impractical it is a public good.

5. If training adds private benefit 8 and external benefit 4, social benefit is 12; a suitable subsidy can address underinvestment if its other costs are included.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

The firms may expand freight, but water records show costs that their prices leave out. The four findings establish: Add the missing cost → Which shared problem is which → Test the corrected target → Correct the freight goal. The water notice adds the downstream cost to the freight comparison. Imported filters could cut the harm, but a new border charge is proposed.

## C. Designer intent — not shown to player

The mission moves from external costs and benefits to a concrete recommendation: Use 30 freight units as the corrected efficiency target in the stated model. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M12-A — On arrival at Water and Land Office

**Location:** Water and Land Office.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Owen Price, watershed engineer:** “No one downstream signed the freight invoice.”

**Unlocks:** Stop 45.

### Beat BT-M12-1 — After Stop 45

**Location:** Water and Land Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Marginal social cost is private 20 plus external 20, or $40 per freight unit; the damage is not a payment already included in private cost. Take this result to Freight Contract Office; its original records are needed for which shared problem is which.

**Unlocks:** Stop 46.

**Dialogue bubble — Owen Price:** “That downstream cost was missing from the freight comparison.”

**Dialogue bubble — Mara Velez, radio:** “Then more access alone is not the full efficiency test. I will reopen the target.”

### Beat BT-M12-2 — After Stop 46

**Location:** Freight Contract Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The cartridge is excludable and rival. The feed is excludable but nonrival while uncrowded. The alert is nonexcludable and nonrival in the stated case. Water withdrawal is rival while exclusion is absent. Take this result to Civic Advice Office; its original records are needed for test the corrected target.

**Unlocks:** Stop 47.

**Dialogue bubble — Owen Price:** “I want the benefit counted too. A harm record is a reason to compare properly, not to pretend freight has no value.”

### Beat BT-M12-3 — After Stop 47

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Set 100−2Q = 20+20 = 40; then 2Q=60 and Q=30. The no-harm competitive benchmark of 40 units no longer supplies the correct target.

**Unlocks:** Stop 48.

### Beat BT-M12-4 — After Stop 48

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Use 30 freight units as the corrected efficiency target in the stated model

**Unlocks:** Mission outcome.

### Beat BT-M12-E — At mission end

**Location:** Civic Advice Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The catchment map adds the measured damage cost and an accessible report beside the pond photograph.

**Panel/HUD text:** The catchment map adds the measured damage cost and an accessible report beside the pond photograph. Imported filters could cut the harm, but a new border charge is proposed.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Owen Price:** “The cost sheet stays on the stream map. Next, let us compare filters by what they do to the water, not whose label they carry.”


## E. Location plan

**3 locations:** Water and Land Office → Freight Contract Office → Civic Advice Office.

Stop 45: Water and Land Office / Water Record Desk | Stop 46: Freight Contract Office / Booking Terminal | Stop 47: Civic Advice Office / Hearing Table | Stop 48: Civic Advice Office / Town Map. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Owen Price, watershed engineer:** owns the original records in Water and Land Office and must explain the recommendation to the people affected.

**Ruth Sen, terminal manager:** owns the original records in Freight Contract Office and must explain the recommendation to the people affected.

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

The catchment map adds the measured damage cost and an accessible report beside the pond photograph. Imported filters could cut the harm, but a new border charge is proposed.

## G. Key concepts, explained here

- **External cost:** A cost imposed on people outside a transaction.

- **Marginal social cost:** Private marginal cost plus external marginal cost.

- **Marginal social benefit:** Private marginal benefit plus external marginal benefit.

- **Public good:** A good that is both nonrival and nonexcludable.

- **Common resource:** A rival resource from which users are difficult to exclude.

- **Free rider:** Someone who benefits without contributing to provision.

## H1. Stop 45 — Add the missing cost

**Format/placement:** BALLPARK, Water and Land Office — Water Record Desk.

**Metadata:** Concept: 18 — External costs and benefits; Narrow concept: Add the missing cost; Keystone: Social effects, Marginal analysis, Surplus; Area: X; Prerequisites: 10; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit marginal social cost per freight unit.

**Briefing decision advanced:** whether the town should use the uncorrected freight quantity as its efficiency target.

**Actual mission answer — authoring only:** Use 30 freight units as the corrected efficiency target in the stated model.

**Call — exact player copy:** Go to the Water Record Desk in Water and Land Office.

**Stop reason — exact player copy:** Water users pay a cost absent from the freight invoice.

**Question card story setup — exact player copy:** Owen shows you the record: the firms’ incentives point toward more freight, but downstream residents have brought water damage records to the hearing. Add the measured outside cost before treating the earlier no-harm output benchmark as the town’s final target.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** Water users become part of the cost comparison even though they buy no freight.

**Data/readings/options — exact player copy:** Private marginal freight cost is $20 per unit; independently measured downstream water damage adds $20 per unit across the relevant range.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Add the missing cost",
    "units": "dollars per freight unit",
    "labels": [
      "20",
      "20",
      "40",
      "10"
    ],
    "values": [
      20,
      20,
      40,
      10
    ],
    "slots": 2,
    "template": "{a} {b}",
    "formula": "a+b",
    "correct": [
      0,
      1
    ],
    "target": 40,
    "tolerance": 0.05,
    "correctResult": 40
  },
  "answerText": "Marginal social cost is private 20 plus external 20, or $40 per freight unit; the damage is not a payment already included in private cost.",
  "wrongFeedback": [
    "20 excludes the external harm.",
    "0 assumes unpaid means costless.",
    "400 multiplies quantities not given."
  ]
}
```

**Question card prompt — exact player copy:** Submit marginal social cost per freight unit.

**Correct result:** 40; absolute tolerance 0.05 in the requested unit.

**Answer text:** Marginal social cost is private 20 plus external 20, or $40 per freight unit; the damage is not a payment already included in private cost.

**Why/mechanism:** Marginal social cost is private 20 plus external 20, or $40 per freight unit; the damage is not a payment already included in private cost. Water users become part of the cost comparison even though they buy no freight. Social effects require adding genuine outside resource damage to private cost; a transfer already counted elsewhere would not belong in this sum a second time. 20 excludes the external harm. 0 assumes unpaid means costless.

**Misconception / wrong-path feedback:**

- 20 excludes the external harm. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 0 assumes unpaid means costless. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 400 multiplies quantities not given. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Water Record Desk stores this dated finding in text: Marginal social cost is private 20 plus external 20, or $40 per freight unit; the damage is not a payment already included in private cost.

**Unlock:** Stop 46.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** Imported filters could cut the harm, but a new border charge is proposed.

**Consistency bundle:**
```json
{
  "source_values": "Private marginal freight cost is $20 per unit; independently measured downstream water damage adds $20 per unit across the relevant range.",
  "derived_values": "Marginal social cost is private 20 plus external 20, or $40 per freight unit; the damage is not a payment already included in private cost.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 40,
  "tolerance": 0.05,
  "answer_text_values": "Marginal social cost is private 20 plus external 20, or $40 per freight unit; the damage is not a payment already included in private cost.",
  "wrong_feedback_values": [
    "20 excludes the external harm.",
    "0 assumes unpaid means costless.",
    "400 multiplies quantities not given."
  ],
  "later_story_references": "Imported filters could cut the harm, but a new border charge is proposed"
}
```

## H2. Stop 46 — Which shared problem is which

**Format/placement:** PROTOCOL, Freight Contract Office — Booking Terminal.

**Metadata:** Concept: 19 — Public goods and common resources; Narrow concept: Which shared problem is which; Keystone: Social effects, Opportunity cost; Area: E; Prerequisites: 1, 18; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the town should use the uncorrected freight quantity as its efficiency target.

**Actual mission answer — authoring only:** Use 30 freight units as the corrected efficiency target in the stated model.

**Call — exact player copy:** Go to the Booking Terminal in Freight Contract Office.

**Stop reason — exact player copy:** The response depends on rivalry and exclusion rather than ownership labels.

**Question card story setup — exact player copy:** Ruth shows you the record: the water record adds a cost outside the transaction, while several shared services now compete for the same attention. Classify their actual access and use conditions before choosing a response based only on who owns them.

**Prior result displayed in mission log:** Marginal social cost is private 20 plus external 20, or $40 per freight unit; the damage is not a payment already included in private cost.

**Question card story-science connection — exact player copy:** Ownership alone does not identify the incentive problem.

**Data/readings/options — exact player copy:** Classify the goods by the stated access and rivalry conditions, not by who owns them.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "A purchased filter cartridge is used up by its buyer"
    },
    {
      "id": "e2",
      "label": "An uncrowded subscriber-only traffic feed"
    },
    {
      "id": "e3",
      "label": "A freely received flood alert that one reader does not consume"
    },
    {
      "id": "e4",
      "label": "An open-access water supply depleted by withdrawal"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Private good"
    },
    {
      "id": "r2",
      "label": "Club good"
    },
    {
      "id": "r3",
      "label": "Public good"
    },
    {
      "id": "r4",
      "label": "Common resource"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "The cartridge is excludable and rival. The feed is excludable but nonrival while uncrowded. The alert is nonexcludable and nonrival in the stated case. Water withdrawal is rival while exclusion is absent. Ownership alone does not identify the incentive problem. Rivalry describes whether one person’s use leaves less for another; exclusion describes whether access can be withheld, so government ownership or a private seller’s name settles neither classification. A fee can exclude users even when their use is nonrival.",
  "answerText": "The cartridge is excludable and rival. The feed is excludable but nonrival while uncrowded. The alert is nonexcludable and nonrival in the stated case. Water withdrawal is rival while exclusion is absent.",
  "rebuttals": {
    "e1": "The cartridge is excludable and rival.",
    "e2": "The feed is excludable but nonrival while uncrowded.",
    "e3": "The alert is nonexcludable and nonrival in the stated case.",
    "e4": "Water withdrawal is rival while exclusion is absent."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"A purchased filter cartridge is used up by its buyer": "Private good", "An uncrowded subscriber-only traffic feed": "Club good", "A freely received flood alert that one reader does not consume": "Public good", "An open-access water supply depleted by withdrawal": "Common resource"}; exact selection or mapping required.

**Answer text:** The cartridge is excludable and rival. The feed is excludable but nonrival while uncrowded. The alert is nonexcludable and nonrival in the stated case. Water withdrawal is rival while exclusion is absent.

**Why/mechanism:** The cartridge is excludable and rival. The feed is excludable but nonrival while uncrowded. The alert is nonexcludable and nonrival in the stated case. Water withdrawal is rival while exclusion is absent. Ownership alone does not identify the incentive problem. Rivalry describes whether one person’s use leaves less for another; exclusion describes whether access can be withheld, so government ownership or a private seller’s name settles neither classification. A fee can exclude users even when their use is nonrival.

**Misconception / wrong-path feedback:**

- The cartridge is excludable and rival. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The feed is excludable but nonrival while uncrowded. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The alert is nonexcludable and nonrival in the stated case. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Water withdrawal is rival while exclusion is absent. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Booking Terminal stores this dated finding in text: The cartridge is excludable and rival. The feed is excludable but nonrival while uncrowded. The alert is nonexcludable and nonrival in the stated case. Water withdrawal is rival while exclusion is absent.

**Unlock:** Stop 47.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** Imported filters could cut the harm, but a new border charge is proposed.

**Consistency bundle:**
```json
{
  "source_values": "Classify the goods by the stated access and rivalry conditions, not by who owns them.",
  "derived_values": "The cartridge is excludable and rival. The feed is excludable but nonrival while uncrowded. The alert is nonexcludable and nonrival in the stated case. Water withdrawal is rival while exclusion is absent.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "A purchased filter cartridge is used up by its buyer": "Private good",
    "An uncrowded subscriber-only traffic feed": "Club good",
    "A freely received flood alert that one reader does not consume": "Public good",
    "An open-access water supply depleted by withdrawal": "Common resource"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The cartridge is excludable and rival. The feed is excludable but nonrival while uncrowded. The alert is nonexcludable and nonrival in the stated case. Water withdrawal is rival while exclusion is absent.",
  "wrong_feedback_values": [
    "The cartridge is excludable and rival.",
    "The feed is excludable but nonrival while uncrowded.",
    "The alert is nonexcludable and nonrival in the stated case.",
    "Water withdrawal is rival while exclusion is absent."
  ],
  "later_story_references": "Imported filters could cut the harm, but a new border charge is proposed"
}
```

## H3. Stop 47 — Test the corrected target

**Format/placement:** VERIFY, Civic Advice Office — Hearing Table.

**Metadata:** Concept: 18 — External costs and benefits; Narrow concept: Test the corrected target; Keystone: Social effects, Marginal analysis, Surplus; Area: T; Prerequisites: 10; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** operated; First, calculate and commit the efficient freight quantity using marginal social benefit equals marginal social cost. Then run the Hearing Table, measure the welfare-maximizing quantity, and select whether it matches; no restoration or second reading is required.

**Briefing decision advanced:** whether the town should use the uncorrected freight quantity as its efficiency target.

**Actual mission answer — authoring only:** Use 30 freight units as the corrected efficiency target in the stated model.

**Call — exact player copy:** Go to the Hearing Table in Civic Advice Office.

**Stop reason — exact player copy:** The freight benchmark must be recomputed with the measured harm.

**Question card story setup — exact player copy:** Mara shows you the record: the shared-resource comparison explains why unpriced water use matters, and the freight benefit schedule is still available from the earlier review. Test the revised output target before the town authorizes expansion under an outdated efficiency claim.

**Prior result displayed in mission log:** The cartridge is excludable and rival. The feed is excludable but nonrival while uncrowded. The alert is nonexcludable and nonrival in the stated case. Water withdrawal is rival while exclusion is absent.

**Question card story-science connection — exact player copy:** The player must revise an earlier benchmark when a previously unpriced cost is measured.

**Data/readings/options — exact player copy:** Freight benefit is MSB=100−2Q dollars per unit; private MC is $20 and external marginal harm $20; hold demand and the damage estimate fixed.

**Format-specific interaction block:**

```json
{
  "verify": {
    "quantity": "Test the corrected target",
    "units": "freight units per day",
    "predictionRange": {
      "min": 0,
      "max": 50,
      "step": 1
    },
    "truth": 30,
    "tolerance": 0.05,
    "measurement": {
      "label": "Run trial and read result",
      "cost": 1,
      "units": "trial credit"
    },
    "measurementBudget": 2,
    "conclusions": [
      "Prediction matches the trial",
      "Prediction does not match the trial"
    ],
    "correctConclusion": "Prediction matches the trial",
    "requiredSequence": [
      "calculate_commit",
      "operate",
      "measure",
      "interpret"
    ],
    "initialPrediction": null,
    "locks": {
      "operate": "prediction committed",
      "measure": "trial operated",
      "interpret": "reading collected"
    }
  },
  "answerText": "Set 100−2Q = 20+20 = 40; then 2Q=60 and Q=30. The no-harm competitive benchmark of 40 units no longer supplies the correct target.",
  "wrongFeedback": [
    "40 leaves out water damage.",
    "20 confuses the monopoly’s private output with the corrected efficient output.",
    "50 sets benefit to zero instead of social cost."
  ]
}
```

**Question card prompt — exact player copy:** First, calculate and commit the efficient freight quantity using marginal social benefit equals marginal social cost. Then run the Hearing Table, measure the welfare-maximizing quantity, and select whether it matches; no restoration or second reading is required.

**Correct result:** 30; absolute tolerance 0.05 in the requested unit.

**Answer text:** Set 100−2Q = 20+20 = 40; then 2Q=60 and Q=30. The no-harm competitive benchmark of 40 units no longer supplies the correct target.

**Why/mechanism:** Set 100−2Q = 20+20 = 40; then 2Q=60 and Q=30. The no-harm competitive benchmark of 40 units no longer supplies the correct target. The player must revise an earlier benchmark when a previously unpriced cost is measured. Marginal analysis now includes the social effects measured downstream; the revised benchmark is distinct from both unrestricted competition without harm and private monopoly choice. 40 leaves out water damage. 20 confuses the monopoly’s private output with the corrected efficient output.

**Misconception / wrong-path feedback:**

- 40 leaves out water damage. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 20 confuses the monopoly’s private output with the corrected efficient output. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 50 sets benefit to zero instead of social cost. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Hearing Table stores this dated finding in text: Set 100−2Q = 20+20 = 40; then 2Q=60 and Q=30. The no-harm competitive benchmark of 40 units no longer supplies the correct target.

**Unlock:** Stop 48.

**Retrieval:** Use the prior mission log and concepts [3, 10]; the prior-result line states the immediate dependency.

**Later payoff:** Imported filters could cut the harm, but a new border charge is proposed.

**Consistency bundle:**
```json
{
  "source_values": "Freight benefit is MSB=100−2Q dollars per unit; private MC is $20 and external marginal harm $20; hold demand and the damage estimate fixed.",
  "derived_values": "Set 100−2Q = 20+20 = 40; then 2Q=60 and Q=30. The no-harm competitive benchmark of 40 units no longer supplies the correct target.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": 30,
  "correct_result": 30,
  "tolerance": 0.05,
  "answer_text_values": "Set 100−2Q = 20+20 = 40; then 2Q=60 and Q=30. The no-harm competitive benchmark of 40 units no longer supplies the correct target.",
  "wrong_feedback_values": [
    "40 leaves out water damage.",
    "20 confuses the monopoly’s private output with the corrected efficient output.",
    "50 sets benefit to zero instead of social cost."
  ],
  "later_story_references": "Imported filters could cut the harm, but a new border charge is proposed"
}
```

## H4. Stop 48 — Correct the freight goal

**Format/placement:** CHOICE, Mara Velez at the Town Map in Civic Advice Office.

**Metadata:** Concept: 18 — External costs and benefits; Narrow concept: Correct the freight goal; Keystone: Social effects, Marginal analysis, Surplus; Area: T; Prerequisites: 10; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the town should use the uncorrected freight quantity as its efficiency target.

**Actual mission answer — authoring only:** Target 30 units, where social benefit equals social cost.

**Call — exact player copy:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Town Map.

**Stop reason — exact player copy:** The agreement needs the social-cost target rather than either old benchmark.

**Question card story setup — exact player copy:** Mara shows you the record: the revised trial includes the water cost and gives a different target from both private monopoly output and the no-harm benchmark. Choose the quantity rule before the access agreement confuses more competition with complete correction of every problem.

**Prior result displayed in mission log:** Set 100−2Q = 20+20 = 40; then 2Q=60 and Q=30. The no-harm competitive benchmark of 40 units no longer supplies the correct target.

**Question card story-science connection — exact player copy:** The freight agreement now needs both access and a water-cost rule.

**Data/readings/options — exact player copy:** Private monopoly output was 20; the no-harm competitive benchmark was 40; with external harm the efficient quantity is 30. A $20-per-unit corrective charge exactly equals constant marginal harm in this model.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Target 20 units, where marginal revenue equals private marginal cost",
    "Target zero units, because each shipment imposes some external harm",
    "Target 30 units, where social benefit equals social cost",
    "Target 40 units, where social benefit equals private marginal cost"
  ],
  "answer": "Target 30 units, where social benefit equals social cost",
  "why": "The efficient quantity equates social benefit and social cost at 30. Competition can remove a markup while leaving an external cost, so replacing market power does not by itself settle the environmental problem or how to provide shared services. The freight agreement now needs both access and a water-cost rule. The 40-unit benchmark omitted $20 marginal external harm. The coincidence of lower output does not prove the monopoly selects the social optimum.",
  "rebuttals": {
    "Target 40 units, where social benefit equals private marginal cost": "The 40-unit benchmark omitted $20 marginal external harm.",
    "Target 20 units, where marginal revenue equals private marginal cost": "The coincidence of lower output does not prove the monopoly selects the social optimum.",
    "Target zero units, because each shipment imposes some external harm": "Some harm does not justify zero output when marginal benefit exceeds social cost below 30 units."
  },
  "answerText": "The efficient quantity equates social benefit and social cost at 30. Competition can remove a markup while leaving an external cost, so replacing market power does not by itself settle the environmental problem or how to provide shared services."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Target 30 units, where social benefit equals social cost"; exact selection or mapping required.

**Answer text:** The efficient quantity equates social benefit and social cost at 30. Competition can remove a markup while leaving an external cost, so replacing market power does not by itself settle the environmental problem or how to provide shared services.

**Why/mechanism:** The efficient quantity equates social benefit and social cost at 30. Competition can remove a markup while leaving an external cost, so replacing market power does not by itself settle the environmental problem or how to provide shared services. The freight agreement now needs both access and a water-cost rule. The 40-unit benchmark omitted $20 marginal external harm. The coincidence of lower output does not prove the monopoly selects the social optimum.

**Misconception / wrong-path feedback:**

- The 40-unit benchmark omitted $20 marginal external harm. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The coincidence of lower output does not prove the monopoly selects the social optimum. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Some harm does not justify zero output when marginal benefit exceeds social cost below 30 units. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: The efficient quantity equates social benefit and social cost at 30. Competition can remove a markup while leaving an external cost, so replacing market power does not by itself settle the environmental problem or how to provide shared services.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [3, 10]; the prior-result line states the immediate dependency.

**Later payoff:** Imported filters could cut the harm, but a new border charge is proposed.

**Consistency bundle:**
```json
{
  "source_values": "Private monopoly output was 20; the no-harm competitive benchmark was 40; with external harm the efficient quantity is 30. A $20-per-unit corrective charge exactly equals constant marginal harm in this model.",
  "derived_values": "The efficient quantity equates social benefit and social cost at 30. Competition can remove a markup while leaving an external cost, so replacing market power does not by itself settle the environmental problem or how to provide shared services.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Target 30 units, where social benefit equals social cost",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The efficient quantity equates social benefit and social cost at 30. Competition can remove a markup while leaving an external cost, so replacing market power does not by itself settle the environmental problem or how to provide shared services.",
  "wrong_feedback_values": [
    "The 40-unit benchmark omitted $20 marginal external harm.",
    "The coincidence of lower output does not prove the monopoly selects the social optimum.",
    "Some harm does not justify zero output when marginal benefit exceeds social cost below 30 units."
  ],
  "later_story_references": "Imported filters could cut the harm, but a new border charge is proposed"
}
```

## I. Mission outcome

**Delivery piece 12:** The water cost rule. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Owen Price:** “No one downstream signed the freight invoice.”

**Mission decision:** Use thirty freight units as the goal once harm is counted. The old goal left out a water cost. The plan gains a water rule. A filter quote may cut the cost of that rule.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 12 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 20:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The water notice adds the downstream cost to the freight comparison.

**Automatic bar change:** Plan Evidence +2 | Service Continuity -2 | Field Budget -1 | Public Accountability +3

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [0, 2, 1, 0]; bars [100, 100, 100, 100]; bank 3, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** So Owen needs affordable filters, but a border tax could raise the cost of his water plan.

## K. Quick concept review

- A transaction can harm people who are not buying or selling in that market.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The freight agreement now needs both access and a water-cost rule.


## L. GO DEEPER — Costs outside the sale

**Secondary briefing — exact player copy:** Apply a social-cost test to a different production problem, then classify shared resources. Before claiming a corrective tax solves everything, check whether another market failure remains.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- Social marginal cost adds marginal external damage to private marginal cost. Efficiency compares that social cost with marginal benefit.
- A common resource is rival and hard to exclude people from using. A public good is nonrival and nonexcludable in the described setting.
- In a competitive market with no other failure, a tax equal to marginal external damage can align private and social costs.
- Monopoly restriction and pollution are separate distortions. Correcting the externality alone does not automatically produce the efficient quantity when market power remains.

### BT-GD-M12-Q1

**Question:** Private marginal cost is $12 and external marginal damage is $5 per unit. What is social marginal cost?

- **A.** $7
- **B.** $12
- **C.** $5
- **D.** $17

**Correct key:** D

**Hint:** Include costs outside the transaction and distinguish rivalry from exclusion.

**Worked explanation — reveal on request:** Social cost adds the external damage to private marginal cost.

**Feedback A:** Reconsider. Subtracting harm understates the cost of production.

**Feedback B:** Reconsider. That omits harm borne outside the transaction.

**Feedback C:** Reconsider. That counts only the external part.

**Feedback D:** Correct. Social cost adds the external damage to private marginal cost.


### BT-GD-M12-Q2

**Question:** Demand is MB=70−Q and social marginal cost is constant at $20. What is efficient quantity?

- **A.** 20 units
- **B.** 35 units
- **C.** 50 units
- **D.** 70 units

**Correct key:** C

**Hint:** Include costs outside the transaction and distinguish rivalry from exclusion.

**Worked explanation — reveal on request:** Set marginal benefit equal to social marginal cost: seventy minus Q equals twenty.

**Feedback A:** Reconsider. Twenty is the cost value, not the quantity solution.

**Feedback B:** Reconsider. That would require a different marginal cost or revenue relation.

**Feedback C:** Correct. Set marginal benefit equal to social marginal cost: seventy minus Q equals twenty.

**Feedback D:** Reconsider. At seventy, marginal benefit is zero below social cost.


### BT-GD-M12-Q3

**Question:** A fishery allows anyone to harvest, and each fish caught leaves fewer for others. Which category fits?

- **A.** Club good with no congestion
- **B.** Common resource
- **C.** Pure public good
- **D.** Private good with perfect exclusion

**Correct key:** B

**Hint:** Include costs outside the transaction and distinguish rivalry from exclusion.

**Worked explanation — reveal on request:** It is difficult to exclude users, and harvest is rival.

**Feedback A:** Reconsider. The resource is rival even without a membership rule.

**Feedback B:** Correct. It is difficult to exclude users, and harvest is rival.

**Feedback C:** Reconsider. A pure public good is nonrival; catching fish depletes stock available to others.

**Feedback D:** Reconsider. The question specifies open access.


### BT-GD-M12-Q4

**Question:** A flood-warning siren reaches everyone nearby and one listener does not reduce another's warning. Which basic category fits?

- **A.** Public good
- **B.** Common resource
- **C.** Private good
- **D.** Inferior good

**Correct key:** A

**Hint:** Include costs outside the transaction and distinguish rivalry from exclusion.

**Worked explanation — reveal on request:** The warning is nonexcludable in the described setting and nonrival.

**Feedback A:** Correct. The warning is nonexcludable in the described setting and nonrival.

**Feedback B:** Reconsider. Receiving the warning does not deplete it for others.

**Feedback C:** Reconsider. Access is not individually excluded here.

**Feedback D:** Reconsider. Income response is unrelated to the supplied rivalry and exclusion properties.


### BT-GD-M12-Q5

**Question:** A competitive pollution source causes constant external damage $4 per unit; no other market failure is present. What per-unit corrective tax matches the external cost?

- **A.** $0
- **B.** The firm's full sales price
- **C.** Any tax that raises the most revenue
- **D.** $4

**Correct key:** D

**Hint:** Include costs outside the transaction and distinguish rivalry from exclusion.

**Worked explanation — reveal on request:** A tax equal to marginal external damage aligns private and social marginal cost in this model.

**Feedback A:** Reconsider. That leaves the stated external cost unpriced.

**Feedback B:** Reconsider. Sales price need not equal marginal external damage.

**Feedback C:** Reconsider. Revenue maximization is not the corrective condition.

**Feedback D:** Correct. A tax equal to marginal external damage aligns private and social marginal cost in this model.


### BT-GD-M12-Q6

**Question:** A monopoly already restricts output. Why is adding a pollution tax alone not enough to claim efficient output?

- **A.** A tax always expands monopoly output
- **B.** Efficient output ignores demand
- **C.** Market power and the externality both affect the output choice
- **D.** Pollution has no cost under monopoly

**Correct key:** C

**Hint:** Include costs outside the transaction and distinguish rivalry from exclusion.

**Worked explanation — reveal on request:** Correcting one wedge does not automatically correct the other.

**Feedback A:** Reconsider. A per-unit tax commonly raises marginal cost and reduces output.

**Feedback B:** Reconsider. Marginal benefit remains part of the efficiency comparison.

**Feedback C:** Correct. Correcting one wedge does not automatically correct the other.

**Feedback D:** Reconsider. Market structure does not erase external damage.


# Mission 13 — THE CHEAPER FILTER

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 13 OF 15

**Card title:** THE CHEAPER FILTER

**Go now:** Go to Business Workshop and meet Nico Bell, diner owner, at the Cost Ledger Desk.

**Card body:** The water rule needs a filter, but a new tax could raise its price. Local sellers gain while buyers pay more. Today you decide which filter quote the plan should use. By the end of the mission, you will track the tax’s costs and gains.

**Objective:** Decide whether the proposed filter tariff preserves the cheapest compliance option.

**Stakes — exact player copy:** You decide how to compare taxed and untaxed filters. Hidden transfers can make Owen’s protection plan look cheaper than it is.

### Worth knowing first — exact player copy

#### Glossary terms

Tariff: A tax on imported goods.

Import quota: A limit on how much of a good may be imported.

Terms of trade: The rate at which one good exchanges for another.

Lorenz curve: A curve relating cumulative population share to cumulative income share.

Gini coefficient: An inequality summary from zero for equality toward one for maximal concentration.

#### Primer concepts

- A border charge can protect sellers while making a useful imported product cost more.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

**Equation:** Imports = domestic demand − domestic supply  
**What it is for:** Find the gap met by foreign sellers at the given price.  
**Symbols:** Quantities are filters per month; price is dollars per filter.  
**Why this campaign needs it:** Filter prices change what the water protection plan costs.

**Required equation or concept use — authoring/render check:** Stop 49: 100−40=60 imported filters.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. At world price 6, demand is 35 and domestic supply 15; imports equal 20.

2. A tariff of 2 on 11 imported units yields revenue 22.

3. If a quota allows 9 units and domestic demand exceeds domestic supply by 14, the world-price outcome cannot persist unchanged.

4. If the lowest half of households gets 20% of income, its Lorenz point is (50,20), below the equality line.

5. A lower Gini indicates less measured inequality but does not by itself prove higher total income or welfare.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

The water cost changes the freight goal, and imported filters may reduce that cost. The four findings establish: Count the imported filters → Track the tariff’s effects → Read the distribution claim → Keep the compliance comparison fair. The council retains the cheaper filter quote and publishes who would gain from the tariff. The second rail line now appears to meet every published condition.

## C. Designer intent — not shown to player

The mission moves from trade policy and distribution to a concrete recommendation: Keep the untaxed filter option in the comparison and disclose the tariff’s transfers. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M13-A — On arrival at Business Workshop

**Location:** Business Workshop.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Nico Bell, diner owner:** “The same filter arrives in either case; follow the extra payment.”

**Unlocks:** Stop 49.

### Beat BT-M13-1 — After Stop 49

**Location:** Business Workshop.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Imports fill the gap: 100−40 = 60 filters per month. Domestic production remains part of total use. Take this result to Water and Land Office; its original records are needed for track the tariff’s effects.

**Unlocks:** Stop 50.

**Dialogue bubble — Nico Bell:** “The imported filter leaves more money for the same required cleanup.”

**Dialogue bubble — Owen Price, radio:** “Keep the standard fixed while you compare. A local label does not measure cleaner water.”

### Beat BT-M13-2 — After Stop 50

**Location:** Water and Land Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** A higher price and reduced use lower consumer surplus in this benchmark. Higher domestic price and output raise producer surplus. Imports are 90−50=40 and revenue is 2×40=80. Equivalent quantity restriction does not automatically send revenue to the government. Take this result to Civic Advice Office; its original records are needed for read the distribution claim.

**Unlocks:** Stop 51.

**Dialogue bubble — Owen Price:** “If it meets that standard, I will support the cheaper filter. Publish the local producers’ loss as well.”

### Beat BT-M13-3 — After Stop 51

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The bottom half receives 20% of $1000 = $200 before and 25% of $800 = $200 after. Its share rises while its nominal amount stays unchanged; this distribution record alone cannot establish a welfare gain, especially with dearer filters.

**Unlocks:** Stop 52.

### Beat BT-M13-4 — After Stop 52

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Keep the untaxed filter option in the comparison and disclose the tariff’s transfers

**Unlocks:** Mission outcome.

### Beat BT-M13-E — At mission end

**Location:** Civic Advice Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The untaxed filter quote remains pinned to the compliance plan and the tariff transfers gain their own column.

**Panel/HUD text:** The untaxed filter quote remains pinned to the compliance plan and the tariff transfers gain their own column. The second rail line now appears to meet every published condition.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Nico Bell:** “Both quotes now carry the same standard. The cheaper qualifying one stays in the account, with the local loss beside it.”


## E. Location plan

**3 locations:** Business Workshop → Water and Land Office → Civic Advice Office.

Stop 49: Business Workshop / Cost Ledger Desk | Stop 50: Water and Land Office / Catchment Map | Stop 51: Civic Advice Office / Budget Desk | Stop 52: Civic Advice Office / Town Map. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Nico Bell, diner owner:** owns the original records in Business Workshop and must explain the recommendation to the people affected.

**Owen Price, watershed engineer:** owns the original records in Water and Land Office and must explain the recommendation to the people affected.

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

The untaxed filter quote remains pinned to the compliance plan and the tariff transfers gain their own column. The second rail line now appears to meet every published condition.

## G. Key concepts, explained here

- **Tariff:** A tax on imported goods.

- **Import quota:** A limit on how much of a good may be imported.

- **Terms of trade:** The rate at which one good exchanges for another.

- **Lorenz curve:** A curve relating cumulative population share to cumulative income share.

- **Gini coefficient:** An inequality summary from zero for equality toward one for maximal concentration.

## H1. Stop 49 — Count the imported filters

**Format/placement:** BALLPARK, Business Workshop — Cost Ledger Desk.

**Metadata:** Concept: 20 — Trade policy and distribution; Narrow concept: Count the imported filters; Keystone: Surplus, Equilibrium, Opportunity cost; Area: CM; Prerequisites: 2, 4, 10; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit the imported quantity.

**Briefing decision advanced:** whether the proposed filter tariff preserves the cheapest compliance option.

**Actual mission answer — authoring only:** Keep the untaxed filter option in the comparison and disclose the tariff’s transfers.

**Call — exact player copy:** Go to the Cost Ledger Desk in Business Workshop.

**Stop reason — exact player copy:** The filter comparison needs the foreign quantity as well as local output.

**Question card story setup — exact player copy:** Nico shows you the record: the freight goal now includes water harm, and a filter quote offers a cheaper way to meet the protection requirement. Count the imports before comparing the border-charge proposal with the existing untaxed compliance plan.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** The compliance budget needs the foreign quantity rather than total use alone.

**Data/readings/options — exact player copy:** At an untaxed world price of $10, local demand is 100 filters and local supply is 40; the town is a small price taker in world trade. The lesson retrieves equilibrium and comparative advantage: world price is held fixed, and total use must equal local output plus imports.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Count the imported filters",
    "units": "filters per month",
    "labels": [
      "100",
      "40",
      "10",
      "60"
    ],
    "values": [
      100,
      40,
      10,
      60
    ],
    "slots": 2,
    "template": "{a} {b}",
    "formula": "a-b",
    "correct": [
      0,
      1
    ],
    "target": 60,
    "tolerance": 0.05,
    "correctResult": 60
  },
  "answerText": "Imports fill the gap: 100−40 = 60 filters per month. Domestic production remains part of total use.",
  "wrongFeedback": [
    "100 ignores domestic supply.",
    "140 adds supply to demand.",
    "40 reports local output."
  ]
}
```

**Question card prompt — exact player copy:** Submit the imported quantity.

**Correct result:** 60; absolute tolerance 0.05 in the requested unit.

**Answer text:** Imports fill the gap: 100−40 = 60 filters per month. Domestic production remains part of total use.

**Why/mechanism:** Imports fill the gap: 100−40 = 60 filters per month. Domestic production remains part of total use. The compliance budget needs the foreign quantity rather than total use alone. Equilibrium at the world price combines local output with imports; consumers use the total demand quantity, while the domestic supply figure describes only production by the town’s own firms. 100 ignores domestic supply. 140 adds supply to demand. 40 reports local output.

**Misconception / wrong-path feedback:**

- 100 ignores domestic supply. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 140 adds supply to demand. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 40 reports local output. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Cost Ledger Desk stores this dated finding in text: Imports fill the gap: 100−40 = 60 filters per month. Domestic production remains part of total use.

**Unlock:** Stop 50.

**Retrieval:** Use the prior mission log and concepts [2, 4, 10]; the prior-result line states the immediate dependency.

**Later payoff:** The second rail line now appears to meet every published condition.

**Consistency bundle:**
```json
{
  "source_values": "At an untaxed world price of $10, local demand is 100 filters and local supply is 40; the town is a small price taker in world trade. The lesson retrieves equilibrium and comparative advantage: world price is held fixed, and total use must equal local output plus imports.",
  "derived_values": "Imports fill the gap: 100−40 = 60 filters per month. Domestic production remains part of total use.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 60,
  "tolerance": 0.05,
  "answer_text_values": "Imports fill the gap: 100−40 = 60 filters per month. Domestic production remains part of total use.",
  "wrong_feedback_values": [
    "100 ignores domestic supply.",
    "140 adds supply to demand.",
    "40 reports local output."
  ],
  "later_story_references": "The second rail line now appears to meet every published condition"
}
```

## H2. Stop 50 — Track the tariff’s effects

**Format/placement:** PROTOCOL, Water and Land Office — Catchment Map.

**Metadata:** Concept: 20 — Trade policy and distribution; Narrow concept: Track the tariff’s effects; Keystone: Surplus, Equilibrium, Elasticity; Area: X; Prerequisites: 2, 4, 10; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the proposed filter tariff preserves the cheapest compliance option.

**Actual mission answer — authoring only:** Keep the untaxed filter option in the comparison and disclose the tariff’s transfers.

**Call — exact player copy:** Go to the Catchment Map in Water and Land Office.

**Stop reason — exact player copy:** The tariff changes several groups’ balances at once.

**Question card story setup — exact player copy:** Owen shows you the record: the import count identifies the trade exposed to the proposed charge, while new prices change local buying and production. Follow the consumer, producer and treasury effects before calling the policy either a pure loss or a free gain.

**Prior result displayed in mission log:** Imports fill the gap: 100−40 = 60 filters per month. Domestic production remains part of total use.

**Question card story-science connection — exact player copy:** A transfer between groups must not be mistaken for an equal change in total gains.

**Data/readings/options — exact player copy:** A $2 tariff raises price from $10 to $12, lowers domestic demand to 90 and raises domestic supply to 50; the foreign price is unchanged.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "Domestic buyers pay more for filters"
    },
    {
      "id": "e2",
      "label": "Domestic producers expand at a higher price"
    },
    {
      "id": "e3",
      "label": "Forty imported filters each pay $2"
    },
    {
      "id": "e4",
      "label": "Imports limited to 40 by quota instead of tax"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Consumers lose surplus"
    },
    {
      "id": "r2",
      "label": "Domestic producers gain surplus"
    },
    {
      "id": "r3",
      "label": "Government receives $80"
    },
    {
      "id": "r4",
      "label": "Quota-rent ownership must be specified"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "A higher price and reduced use lower consumer surplus in this benchmark. Higher domestic price and output raise producer surplus. Imports are 90−50=40 and revenue is 2×40=80. Equivalent quantity restriction does not automatically send revenue to the government. A transfer between groups must not be mistaken for an equal change in total gains. A tariff and an equally restrictive quota can share a quantity effect in a simple benchmark while assigning the resulting payments differently; the allocation of quota rights therefore matters to distribution.",
  "answerText": "A higher price and reduced use lower consumer surplus in this benchmark. Higher domestic price and output raise producer surplus. Imports are 90−50=40 and revenue is 2×40=80. Equivalent quantity restriction does not automatically send revenue to the government.",
  "rebuttals": {
    "e1": "A higher price and reduced use lower consumer surplus in this benchmark.",
    "e2": "Higher domestic price and output raise producer surplus.",
    "e3": "Imports are 90−50=40 and revenue is 2×40=80.",
    "e4": "Equivalent quantity restriction does not automatically send revenue to the government."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"Domestic buyers pay more for filters": "Consumers lose surplus", "Domestic producers expand at a higher price": "Domestic producers gain surplus", "Forty imported filters each pay $2": "Government receives $80", "Imports limited to 40 by quota instead of tax": "Quota-rent ownership must be specified"}; exact selection or mapping required.

**Answer text:** A higher price and reduced use lower consumer surplus in this benchmark. Higher domestic price and output raise producer surplus. Imports are 90−50=40 and revenue is 2×40=80. Equivalent quantity restriction does not automatically send revenue to the government.

**Why/mechanism:** A higher price and reduced use lower consumer surplus in this benchmark. Higher domestic price and output raise producer surplus. Imports are 90−50=40 and revenue is 2×40=80. Equivalent quantity restriction does not automatically send revenue to the government. A transfer between groups must not be mistaken for an equal change in total gains. A tariff and an equally restrictive quota can share a quantity effect in a simple benchmark while assigning the resulting payments differently; the allocation of quota rights therefore matters to distribution.

**Misconception / wrong-path feedback:**

- A higher price and reduced use lower consumer surplus in this benchmark. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Higher domestic price and output raise producer surplus. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Imports are 90−50=40 and revenue is 2×40=80. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Equivalent quantity restriction does not automatically send revenue to the government. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Catchment Map stores this dated finding in text: A higher price and reduced use lower consumer surplus in this benchmark. Higher domestic price and output raise producer surplus. Imports are 90−50=40 and revenue is 2×40=80. Equivalent quantity restriction does not automatically send revenue to the government.

**Unlock:** Stop 51.

**Retrieval:** Use the prior mission log and concepts [2, 4, 10]; the prior-result line states the immediate dependency.

**Later payoff:** The second rail line now appears to meet every published condition.

**Consistency bundle:**
```json
{
  "source_values": "A $2 tariff raises price from $10 to $12, lowers domestic demand to 90 and raises domestic supply to 50; the foreign price is unchanged.",
  "derived_values": "A higher price and reduced use lower consumer surplus in this benchmark. Higher domestic price and output raise producer surplus. Imports are 90−50=40 and revenue is 2×40=80. Equivalent quantity restriction does not automatically send revenue to the government.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "Domestic buyers pay more for filters": "Consumers lose surplus",
    "Domestic producers expand at a higher price": "Domestic producers gain surplus",
    "Forty imported filters each pay $2": "Government receives $80",
    "Imports limited to 40 by quota instead of tax": "Quota-rent ownership must be specified"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "A higher price and reduced use lower consumer surplus in this benchmark. Higher domestic price and output raise producer surplus. Imports are 90−50=40 and revenue is 2×40=80. Equivalent quantity restriction does not automatically send revenue to the government.",
  "wrong_feedback_values": [
    "A higher price and reduced use lower consumer surplus in this benchmark.",
    "Higher domestic price and output raise producer surplus.",
    "Imports are 90−50=40 and revenue is 2×40=80.",
    "Equivalent quantity restriction does not automatically send revenue to the government."
  ],
  "later_story_references": "The second rail line now appears to meet every published condition"
}
```

## H3. Stop 51 — Read the distribution claim

**Format/placement:** DIAGNOSIS, Civic Advice Office — Budget Desk.

**Metadata:** Concept: 20 — Trade policy and distribution; Narrow concept: Read the distribution claim; Keystone: Surplus, Equilibrium; Area: T; Prerequisites: 2, 4, 10; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Read every zone and select the one explanation consistent with all observations.

**Briefing decision advanced:** whether the proposed filter tariff preserves the cheapest compliance option.

**Actual mission answer — authoring only:** Keep the untaxed filter option in the comparison and disclose the tariff’s transfers.

**Call — exact player copy:** Go to the Budget Desk in Civic Advice Office.

**Stop reason — exact player copy:** A bigger income share may hide a falling total.

**Question card story setup — exact player copy:** Mara shows you the record: the tariff ledger separates resource effects from transfers, and advocates now point to an improved income share as proof of benefit. Check the underlying income levels before accepting a distribution chart as evidence that households can buy more.

**Prior result displayed in mission log:** A higher price and reduced use lower consumer surplus in this benchmark. Higher domestic price and output raise producer surplus. Imports are 90−50=40 and revenue is 2×40=80. Equivalent quantity restriction does not automatically send revenue to the government.

**Question card story-science connection — exact player copy:** The hearing cannot sell a relative share change as a universal gain.

**Data/readings/options — exact player copy:** Compare all readings; alarm, watch, and normal are text labels, not verdicts.

**Format-specific interaction block:**

```json
{
  "headline": "Read the distribution claim",
  "readings": [
    {
      "zone": "Income",
      "label": "Bottom half share before and after",
      "value": "20% to 25%",
      "status": "watch"
    },
    {
      "zone": "Income",
      "label": "Total income before and after",
      "value": "$1000 to $800",
      "status": "alarm"
    },
    {
      "zone": "Households",
      "label": "Number counted",
      "value": "100, unchanged",
      "status": "normal"
    },
    {
      "zone": "Filters",
      "label": "Price before and after",
      "value": "$10 to $12",
      "status": "watch"
    }
  ],
  "choices": [
    {
      "label": "The bottom half’s cash income rises as its share of income increases",
      "mechanism": "Both products equal $200."
    },
    {
      "label": "The bottom half receives half of total income after the share change",
      "mechanism": "The bottom half receives only 25%, not 50%."
    },
    {
      "label": "The bottom half buys cheaper filters after the tariff raises domestic output",
      "mechanism": "The price rose from $10 to $12."
    },
    {
      "label": "The bottom half’s share rises, but its unchanged $200 cash total does not establish an income gain",
      "mechanism": "The bottom half receives 20% of $1000 = $200 before and 25% of $800 = $200 after. Its share rises while its nominal amount stays unchanged; this distribution record alone cannot establish a welfare gain, especially with dearer filters."
    }
  ],
  "answer": "The bottom half’s share rises, but its unchanged $200 cash total does not establish an income gain",
  "rebuttals": {
    "The bottom half’s cash income rises as its share of income increases": "Both products equal $200.",
    "The bottom half receives half of total income after the share change": "The bottom half receives only 25%, not 50%.",
    "The bottom half buys cheaper filters after the tariff raises domestic output": "The price rose from $10 to $12."
  },
  "answerText": "The bottom half receives 20% of $1000 = $200 before and 25% of $800 = $200 after. Its share rises while its nominal amount stays unchanged; this distribution record alone cannot establish a welfare gain, especially with dearer filters."
}
```

**Question card prompt — exact player copy:** Read every zone and select the one explanation consistent with all observations.

**Correct result:** "The bottom half’s share rises, but its unchanged $200 cash total does not establish an income gain"; exact selection or mapping required.

**Answer text:** The bottom half receives 20% of $1000 = $200 before and 25% of $800 = $200 after. Its share rises while its nominal amount stays unchanged; this distribution record alone cannot establish a welfare gain, especially with dearer filters.

**Why/mechanism:** The bottom half receives 20% of $1000 = $200 before and 25% of $800 = $200 after. Its share rises while its nominal amount stays unchanged; this distribution record alone cannot establish a welfare gain, especially with dearer filters. The hearing cannot sell a relative share change as a universal gain. Distribution must be read together with levels and prices; the same nominal income buys fewer of a product whose price rises, even when its income share improves.

**Misconception / wrong-path feedback:**

- Both products equal $200. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The bottom half receives only 25%, not 50%. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The price rose from $10 to $12. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Budget Desk stores this dated finding in text: The bottom half receives 20% of $1000 = $200 before and 25% of $800 = $200 after. Its share rises while its nominal amount stays unchanged; this distribution record alone cannot establish a welfare gain, especially with dearer filters.

**Unlock:** Stop 52.

**Retrieval:** Use the prior mission log and concepts [2, 4, 10]; the prior-result line states the immediate dependency.

**Later payoff:** The second rail line now appears to meet every published condition.

**Consistency bundle:**
```json
{
  "source_values": "Compare all readings; alarm, watch, and normal are text labels, not verdicts.",
  "derived_values": "The bottom half receives 20% of $1000 = $200 before and 25% of $800 = $200 after. Its share rises while its nominal amount stays unchanged; this distribution record alone cannot establish a welfare gain, especially with dearer filters.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "The bottom half’s share rises, but its unchanged $200 cash total does not establish an income gain",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The bottom half receives 20% of $1000 = $200 before and 25% of $800 = $200 after. Its share rises while its nominal amount stays unchanged; this distribution record alone cannot establish a welfare gain, especially with dearer filters.",
  "wrong_feedback_values": [
    "Both products equal $200.",
    "The bottom half receives only 25%, not 50%.",
    "The price rose from $10 to $12."
  ],
  "later_story_references": "The second rail line now appears to meet every published condition"
}
```

## H4. Stop 52 — Keep the compliance comparison fair

**Format/placement:** CHOICE, Mara Velez at the Town Map in Civic Advice Office.

**Metadata:** Concept: 20 — Trade policy and distribution; Narrow concept: Keep the compliance comparison fair; Keystone: Surplus, Equilibrium; Area: T; Prerequisites: 2, 4, 10; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the proposed filter tariff preserves the cheapest compliance option.

**Actual mission answer — authoring only:** Retain the untaxed option and disclose who gains from the tariff.

**Call — exact player copy:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Town Map.

**Stop reason — exact player copy:** The filter decision must preserve both the resource and distribution accounts.

**Question card story setup — exact player copy:** Mara shows you the record: the income record shows why relative shares alone do not establish purchasing gains, and filter prices remain higher under the tariff. Choose the compliance comparison that follows the council’s stated cost rule while making distributional effects explicit.

**Prior result displayed in mission log:** The bottom half receives 20% of $1000 = $200 before and 25% of $800 = $200 after. Its share rises while its nominal amount stays unchanged; this distribution record alone cannot establish a welfare gain, especially with dearer filters.

**Question card story-science connection — exact player copy:** The town keeps both fiscal and resource accounts visible for the final agreement.

**Data/readings/options — exact player copy:** The same-quality imported filter costs $10 untaxed or $12 with tariff; imports fall 60 to 40, government receives $80 and local producers gain. The council’s rule is least resource cost for the required water protection, with transfers disclosed separately.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Retain the untaxed option and disclose who gains from the tariff",
    "Prefer the tariff option and count public receipts as a net social gain",
    "Prefer the tariff option and count producer gains without buyer losses",
    "Replace the tariff with a quota and assume the state receives the rents"
  ],
  "answer": "Retain the untaxed option and disclose who gains from the tariff",
  "why": "The tariff raises buyers’ cost and changes production and consumption while transferring some surplus to producers and government. Under the stated least-resource-cost comparison, the cheaper option remains relevant; distributional preferences must be recorded separately rather than hidden inside the cost total. The town keeps both fiscal and resource accounts visible for the final agreement. Revenue is a transfer and does not cancel every resource loss. Producer gains alone do not establish aggregate improvement.",
  "rebuttals": {
    "Prefer the tariff option and count public receipts as a net social gain": "Revenue is a transfer and does not cancel every resource loss.",
    "Prefer the tariff option and count producer gains without buyer losses": "Producer gains alone do not establish aggregate improvement.",
    "Replace the tariff with a quota and assume the state receives the rents": "Quota rents belong to whoever holds the rights unless an allocation rule says otherwise."
  },
  "answerText": "The tariff raises buyers’ cost and changes production and consumption while transferring some surplus to producers and government. Under the stated least-resource-cost comparison, the cheaper option remains relevant; distributional preferences must be recorded separately rather than hidden inside the cost total."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Retain the untaxed option and disclose who gains from the tariff"; exact selection or mapping required.

**Answer text:** The tariff raises buyers’ cost and changes production and consumption while transferring some surplus to producers and government. Under the stated least-resource-cost comparison, the cheaper option remains relevant; distributional preferences must be recorded separately rather than hidden inside the cost total.

**Why/mechanism:** The tariff raises buyers’ cost and changes production and consumption while transferring some surplus to producers and government. Under the stated least-resource-cost comparison, the cheaper option remains relevant; distributional preferences must be recorded separately rather than hidden inside the cost total. The town keeps both fiscal and resource accounts visible for the final agreement. Revenue is a transfer and does not cancel every resource loss. Producer gains alone do not establish aggregate improvement.

**Misconception / wrong-path feedback:**

- Revenue is a transfer and does not cancel every resource loss. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Producer gains alone do not establish aggregate improvement. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Quota rents belong to whoever holds the rights unless an allocation rule says otherwise. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: The tariff raises buyers’ cost and changes production and consumption while transferring some surplus to producers and government. Under the stated least-resource-cost comparison, the cheaper option remains relevant; distributional preferences must be recorded separately rather than hidden inside the cost total.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [2, 4, 10]; the prior-result line states the immediate dependency.

**Later payoff:** The second rail line now appears to meet every published condition.

**Consistency bundle:**
```json
{
  "source_values": "The same-quality imported filter costs $10 untaxed or $12 with tariff; imports fall 60 to 40, government receives $80 and local producers gain. The council’s rule is least resource cost for the required water protection, with transfers disclosed separately.",
  "derived_values": "The tariff raises buyers’ cost and changes production and consumption while transferring some surplus to producers and government. Under the stated least-resource-cost comparison, the cheaper option remains relevant; distributional preferences must be recorded separately rather than hidden inside the cost total.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Retain the untaxed option and disclose who gains from the tariff",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The tariff raises buyers’ cost and changes production and consumption while transferring some surplus to producers and government. Under the stated least-resource-cost comparison, the cheaper option remains relevant; distributional preferences must be recorded separately rather than hidden inside the cost total.",
  "wrong_feedback_values": [
    "Revenue is a transfer and does not cancel every resource loss.",
    "Producer gains alone do not establish aggregate improvement.",
    "Quota rents belong to whoever holds the rights unless an allocation rule says otherwise."
  ],
  "later_story_references": "The second rail line now appears to meet every published condition"
}
```

## I. Mission outcome

**Delivery piece 13:** The filter cost account. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Owen Price:** “The same filter arrives in either case; follow the extra payment.”

**Mission decision:** Keep the untaxed filter quote and report who gains from the tariff. The same filter costs more with the fee. The town retains the cheaper quote. The new rail line now seems ready to sign.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 13 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 20:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The council retains the cheaper filter quote and publishes who would gain from the tariff.

**Automatic bar change:** Plan Evidence +2 | Service Continuity +1 | Field Budget +2 | Public Accountability +2

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [0, 0, 0, 0]; bars [100, 100, 100, 100]; bank 7, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** Now Mara can compare filter costs, but the new rail line’s claimed savings still mix transfers with real gains.

## K. Quick concept review

- A border charge can protect sellers while making a useful imported product cost more.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The town keeps both fiscal and resource accounts visible for the final agreement.


## L. GO DEEPER — Imports, standards and distribution

**Secondary briefing — exact player copy:** Compare imported and domestic goods using equal performance requirements. Keep import counts, tax receipts and resource costs separate, then ask whom a positive average leaves out.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- Imports equal domestic quantity demanded minus domestic quantity supplied at the trading price. A small country takes the world price as given in this model.
- Tariff revenue is the tariff per imported unit multiplied by post-tariff imports. Higher domestic prices generally help domestic producers and hurt domestic consumers.
- Payments between domestic groups are transfers in a national surplus account. Tariffs can still create separate production and consumption deadweight losses.
- Equal verified performance permits a meaningful cost comparison. An average income gain does not imply a gain for every group or household.

### BT-GD-M13-Q1

**Question:** At the world price domestic buyers demand 90 units and domestic firms supply 30. What are imports?

- **A.** 30 units
- **B.** 90 units
- **C.** 60 units
- **D.** 120 units

**Correct key:** C

**Hint:** Keep domestic production, domestic consumption, imports and transfers in separate columns.

**Worked explanation — reveal on request:** Imports fill domestic demand minus domestic supply.

**Feedback A:** Reconsider. That is domestic production.

**Feedback B:** Reconsider. Some demand is met by domestic firms.

**Feedback C:** Correct. Imports fill domestic demand minus domestic supply.

**Feedback D:** Reconsider. Adding the quantities double-counts domestic supply.


### BT-GD-M13-Q2

**Question:** A tariff raises the domestic price from $10 to $12. Imports after the tariff are 40 units. What is tariff revenue if the tariff is $2 per import?

- **A.** $40
- **B.** $80
- **C.** $480
- **D.** $20

**Correct key:** B

**Hint:** Keep domestic production, domestic consumption, imports and transfers in separate columns.

**Worked explanation — reveal on request:** The two-dollar charge applies to forty imported units.

**Feedback A:** Reconsider. That is the import count, not revenue.

**Feedback B:** Correct. The two-dollar charge applies to forty imported units.

**Feedback C:** Reconsider. That is the full domestic value of those imports, not the tariff receipt.

**Feedback D:** Reconsider. Ten is not the quantity of imports.


### BT-GD-M13-Q3

**Question:** In a small importing country, an import tariff raises domestic price. Which groups typically gain directly in the basic model?

- **A.** Domestic producers and the government collecting revenue
- **B.** Domestic consumers alone
- **C.** All groups equally
- **D.** Only foreign consumers

**Correct key:** A

**Hint:** Keep domestic production, domestic consumption, imports and transfers in separate columns.

**Worked explanation — reveal on request:** Producers benefit from the higher price; government receives tariff payments.

**Feedback A:** Correct. Producers benefit from the higher price; government receives tariff payments.

**Feedback B:** Reconsider. Consumers pay more and reduce purchases.

**Feedback C:** Reconsider. The tariff has distinct distributional effects.

**Feedback D:** Reconsider. They are not the direct recipients of the domestic producer gain or tariff revenue.


### BT-GD-M13-Q4

**Question:** Two filters meet the same verified standard. Their measured real resource costs are $80 and $100 per filter; these figures exclude markups, taxes and transfers. What is the resource-cost advantage of the cheaper filter in this comparison?

- **A.** $180
- **B.** 25 filters
- **C.** No difference because both work
- **D.** $20 per filter

**Correct key:** D

**Hint:** Keep domestic production, domestic consumption, imports and transfers in separate columns.

**Worked explanation — reveal on request:** For equal required performance, the cost difference is twenty dollars.

**Feedback A:** Reconsider. That is the sum of both prices.

**Feedback B:** Reconsider. The question asks dollars per filter, not a quantity.

**Feedback C:** Reconsider. Equal performance does not imply equal cost.

**Feedback D:** Correct. For equal required performance, the cost difference is twenty dollars.


### BT-GD-M13-Q5

**Question:** A tariff transfers $30 from domestic buyers to the domestic government. In a national surplus account, why is this not itself $30 of destroyed resources?

- **A.** All tariffs have zero deadweight loss
- **B.** The payment must be a net national benefit
- **C.** One domestic group's payment is another's receipt
- **D.** It never affects anyone

**Correct key:** C

**Hint:** Keep domestic production, domestic consumption, imports and transfers in separate columns.

**Worked explanation — reveal on request:** Transfers cancel in aggregate accounting, though distribution and other efficiency losses still matter.

**Feedback A:** Reconsider. Production and consumption distortions can still destroy surplus.

**Feedback B:** Reconsider. Counting only the government receipt omits the domestic buyer’s equal payment.

**Feedback C:** Correct. Transfers cancel in aggregate accounting, though distribution and other efficiency losses still matter.

**Feedback D:** Reconsider. Buyers and taxpayers can be affected differently.


### BT-GD-M13-Q6

**Question:** A report says average income rose while the poorest group's income fell. Which conclusion is supported?

- **A.** The mean must equal the median
- **B.** The average gain does not establish a gain for every group
- **C.** The report is arithmetically impossible
- **D.** Every household is better off

**Correct key:** B

**Hint:** Keep domestic production, domestic consumption, imports and transfers in separate columns.

**Worked explanation — reveal on request:** An aggregate mean can rise despite losses concentrated among some people.

**Feedback A:** Reconsider. These are different summary measures and need not agree.

**Feedback B:** Correct. An aggregate mean can rise despite losses concentrated among some people.

**Feedback C:** Reconsider. Other groups' gains can outweigh the poorest group's loss.

**Feedback D:** Reconsider. The statement explicitly identifies a losing group.


# Mission 14 — THE LINE THAT PAYS FOR ITSELF

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 14 OF 15

**Card title:** THE LINE THAT PAYS FOR ITSELF

**Go now:** Go to Freight Contract Office and meet Ruth Sen, terminal manager, at the Dispatch Desk.

**Card body:** The filter quote is in, but the new rail line looks too good. A fee that changes hands may have been counted as a saving. Today you decide which plan can stand a cost rise. By the end of the mission, you will test the claim before the vote.

**Objective:** Decide whether the second line remains the best plan after correcting the cost comparison.

**Stakes — exact player copy:** You decide whether the new line survives the cost test. A false saving can take money promised for homes.

### Worth knowing first — exact player copy

#### Glossary terms

Transfer: A payment that changes who holds purchasing power without itself using up resources.

Fixed cost: A cost unchanged by output within the stated period.

Sensitivity analysis: Checking whether a conclusion changes across plausible input values.

Sunk cost: A cost already incurred that the current choice cannot recover.

#### Primer concepts

- A fee paid from one local group to another is a transfer rather than a resource saved.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

This mission retrieves the relationships already recorded in the mission log.

**Required equation or concept use — authoring/render check:** No new equation; separate resource use from transfers at Stops 53–55.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. A project saves 50 in fuel and transfers 30 from one local firm to another; resource savings are 50, not 80.

2. If benefits are 90 and resource costs 65, net benefit is 25.

3. An unavoidable past survey cost of 7 belongs to both choices and does not change their forward comparison.

4. A project with nominal gain 20 but loss 5 under an admissible stress is less robust than one with gain 12 throughout, if avoiding loss is the stated rule.

5. A regulated price can cover marginal cost yet fail to cover fixed cost; a funding plan must state who pays the remainder.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

The filter quote clears the water condition, and the second line looks ready to approve. The four findings establish: Remove the double count → Keep the ledgers separate → Which plan survives the cost range → Reopen the apparent victory. The new-line ribbon is taken down and the access retrofit stays on the hearing board. The council must now sign one fully funded and accountable plan.

## C. Designer intent — not shown to player

The mission moves from robust comparison of competing plans to a concrete recommendation: Reject the second line’s claimed dominance and retain the access retrofit. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M14-A — On arrival at Freight Contract Office

**Location:** Freight Contract Office.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Ruth Sen, terminal manager:** “Take the ribbon down until the same dollar appears only once.”

**Unlocks:** Stop 53.

### Beat BT-M14-1 — After Stop 53

**Location:** Freight Contract Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Construction uses $70 in daily equivalent resources and operations save $60, leaving a $10 daily resource loss; the $40 internal payment change is a transfer, not another saving. Take this result to Water and Land Office; its original records are needed for keep the ledgers separate.

**Unlocks:** Stop 54.

**Dialogue bubble — Mara Velez:** “I counted the lower fee twice. The number I showed the hearing was too large.”

**Dialogue bubble — Ruth Sen, radio:** “Correct it, but do not turn that error into a reason to keep my old access rule.”

### Beat BT-M14-2 — After Stop 54

**Location:** Water and Land Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Avoiding inputs frees them for other uses. The payment reduction changes which local group holds money. The past bill cannot be recovered by choosing either plan. An application is not proof that funds are available. Take this result to Civic Advice Office; its original records are needed for which plan survives the cost range.

**Unlocks:** Stop 55.

**Dialogue bubble — Mara Velez:** “Ruth gets a funded upkeep commitment. Owen gets the harm cost left in. Neither is a blank cheque for a new line.”

### Beat BT-M14-3 — After Stop 55

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** At 40% overrun the new line is infeasible, while the retrofit and status quo survive. The retrofit’s net resource benefit score of 15 exceeds the status quo’s 0, so it is the robust choice under the explicit rule.

**Unlocks:** Stop 56.

### Beat BT-M14-4 — After Stop 56

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Reject the second line’s claimed dominance and retain the access retrofit

**Unlocks:** Mission outcome.

### Beat BT-M14-E — At mission end

**Location:** Civic Advice Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The new-line ribbon disappears from the public board; the retrofit receives the full-range test label.

**Panel/HUD text:** The new-line ribbon disappears from the public board; the retrofit receives the full-range test label. The council must now sign one fully funded and accountable plan.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Mara Velez:** “The ribbon is down. I will explain my double count in public before asking anyone to sign the smaller, supported plan.”


## E. Location plan

**3 locations:** Freight Contract Office → Water and Land Office → Civic Advice Office.

Stop 53: Freight Contract Office / Dispatch Desk | Stop 54: Water and Land Office / Catchment Map | Stop 55: Civic Advice Office / Budget Desk | Stop 56: Civic Advice Office / Town Map. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Ruth Sen, terminal manager:** owns the original records in Freight Contract Office and must explain the recommendation to the people affected.

**Owen Price, watershed engineer:** owns the original records in Water and Land Office and must explain the recommendation to the people affected.

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

The new-line ribbon disappears from the public board; the retrofit receives the full-range test label. The council must now sign one fully funded and accountable plan.

## G. Key concepts, explained here

- **Transfer:** A payment that changes who holds purchasing power without itself using up resources.

- **Fixed cost:** A cost unchanged by output within the stated period.

- **Sensitivity analysis:** Checking whether a conclusion changes across plausible input values.

- **Sunk cost:** A cost already incurred that the current choice cannot recover.

## H1. Stop 53 — Remove the double count

**Format/placement:** BALLPARK, Freight Contract Office — Dispatch Desk.

**Metadata:** Concept: 21 — Robust comparison of competing plans; Narrow concept: Remove the double count; Keystone: Social effects, Cost structure, Opportunity cost; Area: E; Prerequisites: 7, 10, 18; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit the positive magnitude of the daily net resource loss, excluding the internal payment transfer.

**Briefing decision advanced:** whether the second line remains the best plan after correcting the cost comparison.

**Actual mission answer — authoring only:** Reject the second line’s claimed dominance and retain the access retrofit.

**Call — exact player copy:** Go to the Dispatch Desk in Freight Contract Office.

**Stop reason — exact player copy:** The ribbon must wait until the benefit ledger counts each dollar once.

**Question card story setup — exact player copy:** Ruth shows you the record: the cheaper filter quote clears the water condition, and a printed ribbon announces that the second line will pay for itself. Examine the claimed gains before letting a price transfer stand in for resources the town actually saves.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** The apparent victory depended on counting a price transfer as a resource saving.

**Data/readings/options — exact player copy:** The new line claims $100 daily gain: $60 real operating-resource saving plus $40 lower payments to the locally owned incumbent terminal; local incidence is the stated accounting boundary. Construction uses $70 in daily equivalent real resources.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Remove the double count",
    "units": "dollars per day",
    "labels": [
      "60",
      "70",
      "40",
      "100"
    ],
    "values": [
      60,
      70,
      40,
      100
    ],
    "slots": 2,
    "template": "{a} {b}",
    "formula": "b-a",
    "correct": [
      0,
      1
    ],
    "target": 10,
    "tolerance": 0.05,
    "correctResult": 10
  },
  "answerText": "Construction uses $70 in daily equivalent resources and operations save $60, leaving a $10 daily resource loss; the $40 internal payment change is a transfer, not another saving.",
  "wrongFeedback": [
    "30 counts the internal transfer as a resource saving.",
    "−10 is signed net gain, not the requested positive loss magnitude.",
    "40 is a transfer between local groups, not net resources consumed."
  ]
}
```

**Question card prompt — exact player copy:** Submit the positive magnitude of the daily net resource loss, excluding the internal payment transfer.

**Correct result:** 10; absolute tolerance 0.05 in the requested unit.

**Answer text:** Construction uses $70 in daily equivalent resources and operations save $60, leaving a $10 daily resource loss; the $40 internal payment change is a transfer, not another saving.

**Why/mechanism:** Construction uses $70 in daily equivalent resources and operations save $60, leaving a $10 daily resource loss; the $40 internal payment change is a transfer, not another saving. The apparent victory depended on counting a price transfer as a resource saving. 30 counts the internal transfer as a resource saving. −10 is signed net gain, not the requested positive loss magnitude. 40 is a transfer between local groups, not net resources consumed.

**Misconception / wrong-path feedback:**

- 30 counts the internal transfer as a resource saving. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- −10 is signed net gain, not the requested positive loss magnitude. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 40 is a transfer between local groups, not net resources consumed. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Dispatch Desk stores this dated finding in text: Construction uses $70 in daily equivalent resources and operations save $60, leaving a $10 daily resource loss; the $40 internal payment change is a transfer, not another saving.

**Unlock:** Stop 54.

**Retrieval:** First focused encounter; primer supplies definitions.

**Later payoff:** The council must now sign one fully funded and accountable plan.

**Consistency bundle:**
```json
{
  "source_values": "The new line claims $100 daily gain: $60 real operating-resource saving plus $40 lower payments to the locally owned incumbent terminal; local incidence is the stated accounting boundary. Construction uses $70 in daily equivalent real resources.",
  "derived_values": "Construction uses $70 in daily equivalent resources and operations save $60, leaving a $10 daily resource loss; the $40 internal payment change is a transfer, not another saving.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 10,
  "tolerance": 0.05,
  "answer_text_values": "Construction uses $70 in daily equivalent resources and operations save $60, leaving a $10 daily resource loss; the $40 internal payment change is a transfer, not another saving.",
  "wrong_feedback_values": [
    "30 counts the internal transfer as a resource saving.",
    "−10 is signed net gain, not the requested positive loss magnitude.",
    "40 is a transfer between local groups, not net resources consumed."
  ],
  "later_story_references": "The council must now sign one fully funded and accountable plan"
}
```

## H2. Stop 54 — Keep the ledgers separate

**Format/placement:** PROTOCOL, Water and Land Office — Catchment Map.

**Metadata:** Concept: 21 — Robust comparison of competing plans; Narrow concept: Keep the ledgers separate; Keystone: Social effects, Cost structure, Opportunity cost; Area: X; Prerequisites: 7, 10, 18; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** whether the second line remains the best plan after correcting the cost comparison.

**Actual mission answer — authoring only:** Reject the second line’s claimed dominance and retain the access retrofit.

**Call — exact player copy:** Go to the Catchment Map in Water and Land Office.

**Stop reason — exact player copy:** The competing plans need the same accounting boundary.

**Question card story setup — exact player copy:** Owen shows you the record: the corrected resource total weakens the new line’s claim, but several other payments still appear in the comparison. Separate transfers, past costs and uncertain financing before deciding which amounts belong in the current forward-looking choice.

**Prior result displayed in mission log:** Construction uses $70 in daily equivalent resources and operations save $60, leaving a $10 daily resource loss; the $40 internal payment change is a transfer, not another saving.

**Question card story-science connection — exact player copy:** The same dollar cannot serve as both a transfer and a new social benefit.

**Data/readings/options — exact player copy:** Compare entries for the two plans within the stated local accounting boundary; imported goods and new construction consume real resources.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "Fuel and labor no longer needed for the same service"
    },
    {
      "id": "e2",
      "label": "Lower fee from local users to local owners"
    },
    {
      "id": "e3",
      "label": "A survey bill already paid and unrecoverable"
    },
    {
      "id": "e4",
      "label": "A promised grant without an award letter"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Real resource saving"
    },
    {
      "id": "r2",
      "label": "Internal distribution transfer"
    },
    {
      "id": "r3",
      "label": "Sunk cost common to the current choice"
    },
    {
      "id": "r4",
      "label": "Unconfirmed financing"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "Avoiding inputs frees them for other uses. The payment reduction changes which local group holds money. The past bill cannot be recovered by choosing either plan. An application is not proof that funds are available. The same dollar cannot serve as both a transfer and a new social benefit. The accounting boundary determines whether a payment is internal, while the time boundary determines whether a cost is avoidable; both must be fixed before comparing plans on consistent terms.",
  "answerText": "Avoiding inputs frees them for other uses. The payment reduction changes which local group holds money. The past bill cannot be recovered by choosing either plan. An application is not proof that funds are available.",
  "rebuttals": {
    "e1": "Avoiding inputs frees them for other uses.",
    "e2": "The payment reduction changes which local group holds money.",
    "e3": "The past bill cannot be recovered by choosing either plan.",
    "e4": "An application is not proof that funds are available."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"Fuel and labor no longer needed for the same service": "Real resource saving", "Lower fee from local users to local owners": "Internal distribution transfer", "A survey bill already paid and unrecoverable": "Sunk cost common to the current choice", "A promised grant without an award letter": "Unconfirmed financing"}; exact selection or mapping required.

**Answer text:** Avoiding inputs frees them for other uses. The payment reduction changes which local group holds money. The past bill cannot be recovered by choosing either plan. An application is not proof that funds are available.

**Why/mechanism:** Avoiding inputs frees them for other uses. The payment reduction changes which local group holds money. The past bill cannot be recovered by choosing either plan. An application is not proof that funds are available. The same dollar cannot serve as both a transfer and a new social benefit. The accounting boundary determines whether a payment is internal, while the time boundary determines whether a cost is avoidable; both must be fixed before comparing plans on consistent terms.

**Misconception / wrong-path feedback:**

- Avoiding inputs frees them for other uses. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The payment reduction changes which local group holds money. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The past bill cannot be recovered by choosing either plan. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- An application is not proof that funds are available. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Catchment Map stores this dated finding in text: Avoiding inputs frees them for other uses. The payment reduction changes which local group holds money. The past bill cannot be recovered by choosing either plan. An application is not proof that funds are available.

**Unlock:** Stop 55.

**Retrieval:** Use the prior mission log and concepts [7, 10, 18]; the prior-result line states the immediate dependency.

**Later payoff:** The council must now sign one fully funded and accountable plan.

**Consistency bundle:**
```json
{
  "source_values": "Compare entries for the two plans within the stated local accounting boundary; imported goods and new construction consume real resources.",
  "derived_values": "Avoiding inputs frees them for other uses. The payment reduction changes which local group holds money. The past bill cannot be recovered by choosing either plan. An application is not proof that funds are available.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "Fuel and labor no longer needed for the same service": "Real resource saving",
    "Lower fee from local users to local owners": "Internal distribution transfer",
    "A survey bill already paid and unrecoverable": "Sunk cost common to the current choice",
    "A promised grant without an award letter": "Unconfirmed financing"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Avoiding inputs frees them for other uses. The payment reduction changes which local group holds money. The past bill cannot be recovered by choosing either plan. An application is not proof that funds are available.",
  "wrong_feedback_values": [
    "Avoiding inputs frees them for other uses.",
    "The payment reduction changes which local group holds money.",
    "The past bill cannot be recovered by choosing either plan.",
    "An application is not proof that funds are available."
  ],
  "later_story_references": "The council must now sign one fully funded and accountable plan"
}
```

## H3. Stop 55 — Which plan survives the cost range

**Format/placement:** STRESS, Mara Velez at the Budget Desk in Civic Advice Office.

**Metadata:** Concept: 21 — Robust comparison of competing plans; Narrow concept: Which plan survives the cost range; Keystone: Social effects, Cost structure, Opportunity cost; Area: T; Prerequisites: 7, 10, 18; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** decision; Move the construction-overrun control through 0–40%, inspect which plans remain feasible, then select the surviving plan with the greatest net resource benefit.

**Briefing decision advanced:** whether the second line remains the best plan after correcting the cost comparison.

**Actual mission answer — authoring only:** Reject the second line’s claimed dominance and retain the access retrofit.

**Call — exact player copy:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Budget Desk.

**Stop reason — exact player copy:** The hearing’s stress rule applies before any plan is signed.

**Question card story setup — exact player copy:** Mara shows you the record: the two ledgers now use the same boundary, and the retained plans still face different exposure to construction overruns. Test the full published range before relying on a plan that looks attractive only at its nominal estimate.

**Prior result displayed in mission log:** Avoiding inputs frees them for other uses. The payment reduction changes which local group holds money. The past bill cannot be recovered by choosing either plan. An application is not proof that funds are available.

**Question card story-science connection — exact player copy:** The last complication changes the plan because of the criterion the town adopted, not a surprise new preference.

**Data/readings/options — exact player copy:** Assumption: construction cost overrun from 0% to 40%, nominal 10%. Require feasibility across the whole range; among feasible plans maximize net resource benefit. New line survives to 10%, access retrofit to 40%, status quo to 40%. Benefits are comparative model scores in dollars per day. The net resource score is −10 for the new line, 15 for the retrofit and 0 for status quo; the new line offers more capacity but fails the adopted cost-risk rule.

**Format-specific interaction block:**

```json
{
  "stress": {
    "assumption": {
      "label": "Construction cost overrun",
      "unit": "percent",
      "min": 0,
      "max": 40,
      "nominal": 10,
      "step": 5,
      "hardEnd": "max"
    },
    "criteria": [
      {
        "name": "Net resource benefit",
        "key": "net"
      },
      {
        "name": "Service capacity",
        "key": "service"
      }
    ],
    "optimiseOn": "service",
    "candidates": [
      {
        "name": "New line",
        "feasible": 10,
        "scores": {
          "net": -10,
          "service": 50
        }
      },
      {
        "name": "Access retrofit",
        "feasible": 40,
        "scores": {
          "net": 15,
          "service": 35
        }
      },
      {
        "name": "Status quo",
        "feasible": 40,
        "scores": {
          "net": 0,
          "service": 20
        }
      }
    ],
    "robust": "Access retrofit"
  },
  "answerText": "At 40% overrun the new line is infeasible, while the retrofit and status quo survive. The retrofit’s net resource benefit score of 15 exceeds the status quo’s 0, so it is the robust choice under the explicit rule.",
  "wrongFeedback": [
    "New line fails above 10% even though its nominal service score is attractive.",
    "Status quo survives but its resource benefit is below the retrofit."
  ]
}
```

**Question card prompt — exact player copy:** Move the construction-overrun control through 0–40%, inspect which plans remain feasible, then select the surviving plan with the greatest net resource benefit.

**Correct result:** "Access retrofit"; exact selection or mapping required.

**Answer text:** At 40% overrun the new line is infeasible, while the retrofit and status quo survive. The retrofit’s net resource benefit score of 15 exceeds the status quo’s 0, so it is the robust choice under the explicit rule.

**Why/mechanism:** At 40% overrun the new line is infeasible, while the retrofit and status quo survive. The retrofit’s net resource benefit score of 15 exceeds the status quo’s 0, so it is the robust choice under the explicit rule. The last complication changes the plan because of the criterion the town adopted, not a surprise new preference. New line fails above 10% even though its nominal service score is attractive. Status quo survives but its resource benefit is below the retrofit.

**Misconception / wrong-path feedback:**

- New line fails above 10% even though its nominal service score is attractive. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Status quo survives but its resource benefit is below the retrofit. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Budget Desk stores this dated finding in text: At 40% overrun the new line is infeasible, while the retrofit and status quo survive. The retrofit’s net resource benefit score of 15 exceeds the status quo’s 0, so it is the robust choice under the explicit rule.

**Unlock:** Stop 56.

**Retrieval:** Use the prior mission log and concepts [7, 10, 18]; the prior-result line states the immediate dependency.

**Later payoff:** The council must now sign one fully funded and accountable plan.

**Consistency bundle:**
```json
{
  "source_values": "Assumption: construction cost overrun from 0% to 40%, nominal 10%. Require feasibility across the whole range; among feasible plans maximize net resource benefit. New line survives to 10%, access retrofit to 40%, status quo to 40%. Benefits are comparative model scores in dollars per day. The net resource score is −10 for the new line, 15 for the retrofit and 0 for status quo; the new line offers more capacity but fails the adopted cost-risk rule.",
  "derived_values": "At 40% overrun the new line is infeasible, while the retrofit and status quo survive. The retrofit’s net resource benefit score of 15 exceeds the status quo’s 0, so it is the robust choice under the explicit rule.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Access retrofit",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "At 40% overrun the new line is infeasible, while the retrofit and status quo survive. The retrofit’s net resource benefit score of 15 exceeds the status quo’s 0, so it is the robust choice under the explicit rule.",
  "wrong_feedback_values": [
    "New line fails above 10% even though its nominal service score is attractive.",
    "Status quo survives but its resource benefit is below the retrofit."
  ],
  "later_story_references": "The council must now sign one fully funded and accountable plan"
}
```

## H4. Stop 56 — Reopen the apparent victory

**Format/placement:** CHOICE, Mara Velez at the Town Map in Civic Advice Office.

**Metadata:** Concept: 21 — Robust comparison of competing plans; Narrow concept: Reopen the apparent victory; Keystone: Social effects, Cost structure, Opportunity cost; Area: T; Prerequisites: 7, 10, 18; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** whether the second line remains the best plan after correcting the cost comparison.

**Actual mission answer — authoring only:** Retain the retrofit after correcting transfers and testing cost overruns.

**Call — exact player copy:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Town Map.

**Stop reason — exact player copy:** The council must act on the revised evidence despite the public celebration.

**Question card story setup — exact player copy:** Mara shows you the record: the stress comparison leaves a feasible alternative after the new line’s apparent victory, and the corrected accounts remain on display. Choose whether to reopen the recommendation before the town’s printed celebration becomes a reason to ignore its own evidence.

**Prior result displayed in mission log:** At 40% overrun the new line is infeasible, while the retrofit and status quo survive. The retrofit’s net resource benefit score of 15 exceeds the status quo’s 0, so it is the robust choice under the explicit rule.

**Question card story-science connection — exact player copy:** The final hearing can now choose an agreement whose claims use one consistent accounting boundary.

**Data/readings/options — exact player copy:** The initial new-line claim double-counted an internal $40 transfer; the independent stress table rejects it above 10% overrun. The retrofit meets the whole 0–40% range and outperforms status quo under the adopted net-resource rule.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Retain the status quo because its feasible plan must beat any investment",
    "Retain the retrofit after correcting transfers and testing cost overruns",
    "Approve the new line after adding lower fees to its resource savings",
    "Reject the retrofit because transfers change who receives the freight fees"
  ],
  "answer": "Retain the retrofit after correcting transfers and testing cost overruns",
  "why": "Correcting the resource ledger and applying the previously adopted stress rule removes the new line’s claimed dominance. Transfers still matter to affected people and must receive a distribution plan, but they cannot rescue an infeasible design by being counted twice. The final hearing can now choose an agreement whose claims use one consistent accounting boundary. Lower local fees are transfers, already separated from the $60 resource saving; adding them counts a gain twice. Transfers matter to distribution even when excluded from net-resource totals.",
  "rebuttals": {
    "Approve the new line after adding lower fees to its resource savings": "Lower local fees are transfers, already separated from the $60 resource saving; adding them counts a gain twice.",
    "Reject the retrofit because transfers change who receives the freight fees": "Transfers matter to distribution even when excluded from net-resource totals.",
    "Retain the status quo because its feasible plan must beat any investment": "The retrofit survives the stated range and offers a larger benefit."
  },
  "answerText": "Correcting the resource ledger and applying the previously adopted stress rule removes the new line’s claimed dominance. Transfers still matter to affected people and must receive a distribution plan, but they cannot rescue an infeasible design by being counted twice."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Retain the retrofit after correcting transfers and testing cost overruns"; exact selection or mapping required.

**Answer text:** Correcting the resource ledger and applying the previously adopted stress rule removes the new line’s claimed dominance. Transfers still matter to affected people and must receive a distribution plan, but they cannot rescue an infeasible design by being counted twice.

**Why/mechanism:** Correcting the resource ledger and applying the previously adopted stress rule removes the new line’s claimed dominance. Transfers still matter to affected people and must receive a distribution plan, but they cannot rescue an infeasible design by being counted twice. The final hearing can now choose an agreement whose claims use one consistent accounting boundary. Lower local fees are transfers, already separated from the $60 resource saving; adding them counts a gain twice. Transfers matter to distribution even when excluded from net-resource totals.

**Misconception / wrong-path feedback:**

- Lower local fees are transfers, already separated from the $60 resource saving; adding them counts a gain twice. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Transfers matter to distribution even when excluded from net-resource totals. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The retrofit survives the stated range and offers a larger benefit. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: Correcting the resource ledger and applying the previously adopted stress rule removes the new line’s claimed dominance. Transfers still matter to affected people and must receive a distribution plan, but they cannot rescue an infeasible design by being counted twice.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [7, 10, 18]; the prior-result line states the immediate dependency.

**Later payoff:** The council must now sign one fully funded and accountable plan.

**Consistency bundle:**
```json
{
  "source_values": "The initial new-line claim double-counted an internal $40 transfer; the independent stress table rejects it above 10% overrun. The retrofit meets the whole 0–40% range and outperforms status quo under the adopted net-resource rule.",
  "derived_values": "Correcting the resource ledger and applying the previously adopted stress rule removes the new line’s claimed dominance. Transfers still matter to affected people and must receive a distribution plan, but they cannot rescue an infeasible design by being counted twice.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Retain the retrofit after correcting transfers and testing cost overruns",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "Correcting the resource ledger and applying the previously adopted stress rule removes the new line’s claimed dominance. Transfers still matter to affected people and must receive a distribution plan, but they cannot rescue an infeasible design by being counted twice.",
  "wrong_feedback_values": [
    "Lower local fees are transfers, already separated from the $60 resource saving; adding them counts a gain twice.",
    "Transfers matter to distribution even when excluded from net-resource totals.",
    "The retrofit survives the stated range and offers a larger benefit."
  ],
  "later_story_references": "The council must now sign one fully funded and accountable plan"
}
```

## I. Mission outcome

**Delivery piece 14:** The access retrofit choice. Add this mission’s finding to its matching public-board slot.

**Pre-card character beat — Mara Velez:** “Take the ribbon down until the same dollar appears only once.”

**Mission decision:** Drop the claim that the new line is best and keep the access retrofit. The claim counted a transfer as a saving. The line also fails the cost test. Its ribbon comes down before the vote.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 14 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 20:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The new-line ribbon is taken down and the access retrofit stays on the hearing board.

**Automatic bar change:** Plan Evidence -4 | Service Continuity -2 | Field Budget -2 | Public Accountability -2

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [3, 1, 0, 0]; bars [99, 99, 98, 98]; bank 7, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars.

**Segue — exact player copy:** But Leila needs confirmed housing funds before signing; the retrofit’s better cost test is not a funded agreement.

## K. Quick concept review

- A fee paid from one local group to another is a transfer rather than a resource saved.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The final hearing can now choose an agreement whose claims use one consistent accounting boundary.


## L. GO DEEPER — Check the attractive total

**Secondary briefing — exact player copy:** A strong-looking project can rely on a duplicated gain, an unconfirmed grant or a case where a required limit fails. Check the account first and compare only plans that satisfy the stated rules.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- A real resource saving reduces resources used for a given outcome. A fee transfer between domestic parties is not an additional aggregate saving by itself.
- Net social benefit subtracts both resource costs and external harm from benefit. Count each underlying effect once, even when it appears under different labels.
- Robust feasibility requires satisfying the stated constraints in every specified case. The highest average or best-case score need not meet that rule.
- Confirmed funding means an awarded or signed source. A submitted application remains conditional until awarded.

### BT-GD-M14-Q1

**Question:** A project saves $50 in real handling costs and lowers a domestic fee by $20 paid to another domestic firm. Ignoring all other effects, what is the aggregate resource saving?

- **A.** $20
- **B.** $50
- **C.** $70
- **D.** $30

**Correct key:** B

**Hint:** Count each real effect once; check constraints and confirmed funding before ranking benefits.

**Worked explanation — reveal on request:** The handling saving is real; the fee reduction is a domestic transfer, not an extra resource saving.

**Feedback A:** Reconsider. That counts only the transfer and misses the handling saving.

**Feedback B:** Correct. The handling saving is real; the fee reduction is a domestic transfer, not an extra resource saving.

**Feedback C:** Reconsider. That adds the transfer to the real saving.

**Feedback D:** Reconsider. Subtracting the transfer also mistakes it for a real cost.


### BT-GD-M14-Q2

**Question:** A proposal yields $90 benefit and costs $65 in resources plus $10 external harm. What is net social benefit?

- **A.** $15
- **B.** $25
- **C.** $35
- **D.** $165

**Correct key:** A

**Hint:** Count each real effect once; check constraints and confirmed funding before ranking benefits.

**Worked explanation — reveal on request:** Subtract both resource cost and external harm from ninety.

**Feedback A:** Correct. Subtract both resource cost and external harm from ninety.

**Feedback B:** Reconsider. That omits external harm.

**Feedback C:** Reconsider. Harm is a cost, not an amount to add.

**Feedback D:** Reconsider. Summing benefits and costs does not produce net benefit.


### BT-GD-M14-Q3

**Question:** Plan A has net benefits 20, 5 and −8 across three possible cases; Plan B has 12, 10 and 7. If the rule is nonnegative net benefit in every case, which passes?

- **A.** Only A
- **B.** Both
- **C.** Neither
- **D.** Only B

**Correct key:** D

**Hint:** Count each real effect once; check constraints and confirmed funding before ranking benefits.

**Worked explanation — reveal on request:** A fails the third case; all three of B's outcomes are nonnegative.

**Feedback A:** Reconsider. Its best case does not cancel a negative case under this rule.

**Feedback B:** Reconsider. A violates the explicitly stated minimum.

**Feedback C:** Reconsider. B's worst result is still positive.

**Feedback D:** Correct. A fails the third case; all three of B's outcomes are nonnegative.


### BT-GD-M14-Q4

**Question:** A project budget lists a $40 grant application and $30 signed contribution. What is confirmed funding before the grant decision?

- **A.** $40
- **B.** $10
- **C.** $30
- **D.** $70

**Correct key:** C

**Hint:** Count each real effect once; check constraints and confirmed funding before ranking benefits.

**Worked explanation — reveal on request:** Only the signed contribution is committed; an application is not an award.

**Feedback A:** Reconsider. That counts only the unconfirmed source.

**Feedback B:** Reconsider. There is no basis to subtract the two sources.

**Feedback C:** Correct. Only the signed contribution is committed; an application is not an award.

**Feedback D:** Reconsider. That treats the pending grant as received.


### BT-GD-M14-Q5

**Question:** A plan with the highest expected benefit fails a required water-quality limit in one specified case. What follows under a rule requiring compliance in every case?

- **A.** The expected benefit must be negative
- **B.** It is infeasible under that rule even if its expected benefit is largest
- **C.** Its high average automatically waives the limit
- **D.** All alternative plans must also fail

**Correct key:** B

**Hint:** Count each real effect once; check constraints and confirmed funding before ranking benefits.

**Worked explanation — reveal on request:** Feasibility is a constraint that precedes ranking the compliant plans.

**Feedback A:** Reconsider. A positive average can coexist with a constraint failure.

**Feedback B:** Correct. Feasibility is a constraint that precedes ranking the compliant plans.

**Feedback C:** Reconsider. An average cannot waive the stated constraint.

**Feedback D:** Reconsider. Nothing about one failure establishes others' results.


### BT-GD-M14-Q6

**Question:** A claimed access gain of $35 already includes a $10 handling saving. An analyst adds the same $10 again. What correction is needed?

- **A.** Remove the extra $10 and retain the $35 inclusive gain
- **B.** Raise the gain to $55
- **C.** Remove the whole $35
- **D.** Keep $45 because separate labels are useful

**Correct key:** A

**Hint:** Count each real effect once; check constraints and confirmed funding before ranking benefits.

**Worked explanation — reveal on request:** The handling saving should appear once, not twice.

**Feedback A:** Correct. The handling saving should appear once, not twice.

**Feedback B:** Reconsider. That repeats the duplicate again.

**Feedback C:** Reconsider. The supported inclusive estimate need not be discarded.

**Feedback D:** Reconsider. Different labels do not make the same underlying saving independent.


# Mission 15 — THE TOWN THAT STAYS

## A. Mission briefing card — exact player copy

**Header:** SIX WEEKS TO THE FREIGHT AGREEMENT — STAGE 15 OF 15

**Card title:** THE TOWN THAT STAYS

**Go now:** Go to Housing and Work Office and meet Leila Moss, housing cooperative organizer, at the Lease Desk.

**Card body:** The old gate can be changed, but the plan still needs funds and names. Each promise must have someone who will keep it. Today you decide which whole plan the town can sign. By the end of the mission, you will check its costs, terms and owners.

**Objective:** Decide which complete agreement the council can sign under its published rules.

**Stakes — exact player copy:** You decide which funded agreement to sign. The town needs named owners for access, housing and water protection.

### Worth knowing first — exact player copy

#### Glossary terms

Accountability: A named person or institution must report whether a promise is kept.

Feasible plan: A plan that meets all stated constraints with available resources.

#### Primer concepts

- A defensible agreement must meet its conditions without counting the same benefit twice.

- Compare each proposed change with the stated alternative; record who gains and who pays.

#### Equations first needed today

This mission retrieves the relationships already recorded in the mission log.

**Required equation or concept use — authoring/render check:** No new equation; retrieve funding addition at Stop 57 and the social-cost target at Stop 59.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic worked examples; opening pauses time, changes no bars, unlocks, story state or retrieval bookkeeping, and remains ungraded and reopenable.

### Optional worked examples — exact player copy

1. A plan costing 18 with confirmed funds 13 and 5 is fully financed because 13+5=18.

2. If a market price includes a corrective charge of 3 and base resource cost is 8, users pay 11 while the resource cost and external-cost accounts remain distinct.

3. A transfer of 6 between two households changes their individual balances by −6 and +6, leaving their combined balance unchanged.

4. If a plan requires three conditions, passing two does not establish that the conjunction is true.

5. When a promised intervention raises one group’s income by 8 and lowers another’s by 5, report both distribution changes and the net 3 rather than claim everyone gains.

**Authoring-only failure consequence:** A wrong plan wastes scarce funds and delays the disputed service.

**Authoring-only later travel:** The recorded result unlocks the next room because its owner holds the next original record.

## B. Main story happening — designer summary

The access retrofit survives review, but its funding and promises still need named owners. The four findings establish: Check the confirmed funding → Give each condition an owner → Commit the final flow forecast → Sign the agreement. The complete agreement is funded and prepared for the final resource check. After the final resource check and ending card, the town reopens for free exploration with every signed commitment in the log.

## C. Designer intent — not shown to player

The mission moves from robust comparison of competing plans to a concrete recommendation: Sign the access retrofit with funded housing support and the water-cost rule. The player advises; each owner or council retains authority. The disputed allocation changes a familiar service.

## D. Player-facing beat script

### Beat BT-M15-A — On arrival at Housing and Work Office

**Location:** Housing and Work Office.

**Presentation:** nearby_character_bubble

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Dialogue bubble — Leila Moss, housing cooperative organizer:** “We can sign what is funded, measured and owned.”

**Unlocks:** Stop 57.

### Beat BT-M15-1 — After Stop 57

**Location:** Housing and Work Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Confirmed funding is 120+30 = $150 daily, exactly matching the $150 plan cost; no unconfirmed grant is counted. Take this result to Water and Land Office; its original records are needed for give each condition an owner.

**Unlocks:** Stop 58.

**Dialogue bubble — Leila Moss:** “The money counted here has been committed. Applications for more are in a different folder.”

**Dialogue bubble — Mara Velez, radio:** “Then we can put names beside promises without pretending a pending grant is cash.”

### Beat BT-M15-2 — After Stop 58

**Location:** Water and Land Office.

**Presentation:** equipment_panel_update + waypoint_notification + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The wage trial required willing qualified workers; a funded housing measure helps those workers take jobs but does not prove the jobs will fill. An access rule needs a booking record that can reveal exclusion. The corrective rule depends on measured external harm. A conditional model must be revisited when its stated assumptions fail. Take this result to Civic Advice Office; its original records are needed for commit the final flow forecast.

**Unlocks:** Stop 59.

**Dialogue bubble — Leila Moss:** “I will sign for the co-op’s part. Keep the unmatched applications visible after the signing.”

### Beat BT-M15-3 — After Stop 59

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** The earlier corrected benchmark still applies: 100−2Q = 20+20 gives Q=30. Funding transfers are not an extra resource benefit and do not change this marginal equality.

**Unlocks:** Stop 60.

### Beat BT-M15-4 — After Stop 60

**Location:** Civic Advice Office.

**Presentation:** equipment_panel_update + waypoint_notification

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The active record gains the completed finding in text; it remains inspectable without sound or color.

**Panel/HUD text:** Sign the access retrofit with funded housing support and the water-cost rule

**Unlocks:** Mission outcome.

### Beat BT-M15-E — At mission end

**Location:** Civic Advice Office.

**Presentation:** persistent_world_change + dialogue_overlay

**Player control:** One Continue pauses the timer and returns control immediately; mission-end inspection gives 60 seconds of free movement with time paused.

**World state:** The public board holds the unsigned final agreement; lease support and water-review commitments are marked READY TO SIGN AFTER RESOURCE CHECK.

**Panel/HUD text:** The public board holds the unsigned final agreement; lease support and water-review commitments are marked READY TO SIGN AFTER RESOURCE CHECK. After the final resource check and ending card, the town reopens for free exploration with every signed commitment in the log.

**Unlocks:** Metric screen after inspecting the changed notice.

**Dialogue bubble — Leila Moss:** “Our pieces are ready. I will keep the signature tabs open until the last funding and resource check is complete.”


## E. Location plan

**3 locations:** Housing and Work Office → Water and Land Office → Civic Advice Office.

Stop 57: Housing and Work Office / Lease Desk | Stop 58: Water and Land Office / Catchment Map | Stop 59: Civic Advice Office / Hearing Table | Stop 60: Civic Advice Office / Town Map. Evidence-dependent waypoints appear only after the preceding stop passes; the original local record and accountable owner make each visit necessary.

## F. Characters and dramatic beat

**Leila Moss, housing cooperative organizer:** owns the original records in Housing and Work Office and must explain the recommendation to the people affected.

**Owen Price, watershed engineer:** owns the original records in Water and Land Office and must explain the recommendation to the people affected.

**Mara Velez, state economic adviser:** owns the original records in Civic Advice Office and must explain the recommendation to the people affected.

The public board holds the unsigned final agreement; lease support and water-review commitments are marked READY TO SIGN AFTER RESOURCE CHECK. After the final resource check and ending card, the town reopens for free exploration with every signed commitment in the log.

## G. Key concepts, explained here

- **Accountability:** A named person or institution must report whether a promise is kept.

- **Feasible plan:** A plan that meets all stated constraints with available resources.

## H1. Stop 57 — Check the confirmed funding

**Format/placement:** BALLPARK, Housing and Work Office — Lease Desk.

**Metadata:** Concept: 21 — Robust comparison of competing plans; Narrow concept: Check the confirmed funding; Keystone: Social effects, Cost structure, Opportunity cost; Area: P; Prerequisites: 7, 10, 18; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Submit the total confirmed daily funding; then compare it with the visible $150 plan cost.

**Briefing decision advanced:** which complete agreement the council can sign under its published rules.

**Actual mission answer — authoring only:** Sign the access retrofit with funded housing support and the water-cost rule.

**Call — exact player copy:** Go to the Lease Desk in Housing and Work Office.

**Stop reason — exact player copy:** Every promised service needs a confirmed source of funds.

**Question card story setup — exact player copy:** Leila shows you the record: the access retrofit survives the stated cost range, but the full agreement still includes housing and water commitments that must be paid. Check the confirmed funding before presenting those promises as ready for signatures at the hearing.

**Prior result displayed in mission log:** Opening facts and mission primer

**Question card story-science connection — exact player copy:** The hearing can promise only measures whose costs have a confirmed source.

**Data/readings/options — exact player copy:** The complete daily plan costs $150: retrofit support $20, housing support $120, water reporting $10. Confirmed sources are the $120 market-fee revenue and $30 cooperative contribution; no grant is counted.

**Format-specific interaction block:**

```json
{
  "estimate": {
    "quantity": "Check the confirmed funding",
    "units": "dollars per day",
    "labels": [
      "120",
      "30",
      "150",
      "20"
    ],
    "values": [
      120,
      30,
      150,
      20
    ],
    "slots": 2,
    "template": "{a} {b}",
    "formula": "a+b",
    "correct": [
      0,
      1
    ],
    "target": 150,
    "tolerance": 0.05,
    "correctResult": 150
  },
  "answerText": "Confirmed funding is 120+30 = $150 daily, exactly matching the $150 plan cost; no unconfirmed grant is counted.",
  "wrongFeedback": [
    "0 is the funding gap, not the requested confirmed funding total.",
    "120 omits the cooperative contribution.",
    "180 adds a cost item to funding."
  ]
}
```

**Question card prompt — exact player copy:** Submit the total confirmed daily funding; then compare it with the visible $150 plan cost.

**Correct result:** 150; absolute tolerance 0.05 in the requested unit.

**Answer text:** Confirmed funding is 120+30 = $150 daily, exactly matching the $150 plan cost; no unconfirmed grant is counted.

**Why/mechanism:** Confirmed funding is 120+30 = $150 daily, exactly matching the $150 plan cost; no unconfirmed grant is counted. The hearing can promise only measures whose costs have a confirmed source. Opportunity cost and fiscal discipline require counting only confirmed funding once; the absence of a gap does not prove that the agreement has no real resource costs. 0 is the funding gap, not the requested confirmed funding total. 120 omits the cooperative contribution.

**Misconception / wrong-path feedback:**

- 0 is the funding gap, not the requested confirmed funding total. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 120 omits the cooperative contribution. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 180 adds a cost item to funding. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Lease Desk stores this dated finding in text: Confirmed funding is 120+30 = $150 daily, exactly matching the $150 plan cost; no unconfirmed grant is counted.

**Unlock:** Stop 58.

**Retrieval:** Use the prior mission log and concepts [7, 10, 18]; the prior-result line states the immediate dependency.

**Later payoff:** After the final resource check and ending card, the town reopens for free exploration with every signed commitment in the log.

**Consistency bundle:**
```json
{
  "source_values": "The complete daily plan costs $150: retrofit support $20, housing support $120, water reporting $10. Confirmed sources are the $120 market-fee revenue and $30 cooperative contribution; no grant is counted.",
  "derived_values": "Confirmed funding is 120+30 = $150 daily, exactly matching the $150 plan cost; no unconfirmed grant is counted.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": 150,
  "tolerance": 0.05,
  "answer_text_values": "Confirmed funding is 120+30 = $150 daily, exactly matching the $150 plan cost; no unconfirmed grant is counted.",
  "wrong_feedback_values": [
    "0 is the funding gap, not the requested confirmed funding total.",
    "120 omits the cooperative contribution.",
    "180 adds a cost item to funding."
  ],
  "later_story_references": "The town reopens for free exploration with every signed commitment in the log"
}
```

## H2. Stop 58 — Give each condition an owner

**Format/placement:** PROTOCOL, Water and Land Office — Catchment Map.

**Metadata:** Concept: 21 — Robust comparison of competing plans; Narrow concept: Give each condition an owner; Keystone: Social effects, Cost structure, Opportunity cost, Factor demand; Area: X; Prerequisites: 7, 10, 18; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** calculation; Match each evidence card to one response; use each response once and submit all four links.

**Briefing decision advanced:** which complete agreement the council can sign under its published rules.

**Actual mission answer — authoring only:** Sign the access retrofit with funded housing support and the water-cost rule.

**Call — exact player copy:** Go to the Catchment Map in Water and Land Office.

**Stop reason — exact player copy:** Each funded promise needs an owner and a visible test.

**Question card story setup — exact player copy:** Owen shows you the record: the funding check covers the complete plan, yet money alone does not ensure that homes, bookings and water reports reach the people promised them. Match each remaining risk to its named institutional action before the council signs.

**Prior result displayed in mission log:** Confirmed funding is 120+30 = $150 daily, exactly matching the $150 plan cost; no unconfirmed grant is counted.

**Question card story-science connection — exact player copy:** A promise becomes checkable when its condition has a record and an accountable institution.

**Data/readings/options — exact player copy:** The signed draft names the cooperative for housing access, terminal for open bookings, watershed office for damage reports and council for review; match each recorded risk to its required action.

**Format-specific interaction block:**

```json
{
  "scenarios": [
    {
      "id": "e1",
      "label": "New hires still cannot take the four jobs at the signed $30 wage because homes are inaccessible"
    },
    {
      "id": "e2",
      "label": "Usable freight slots are withheld from rivals"
    },
    {
      "id": "e3",
      "label": "Downstream harm changes after expansion"
    },
    {
      "id": "e4",
      "label": "Observed results no longer fit adopted assumptions"
    }
  ],
  "choices": [
    {
      "id": "r1",
      "label": "Cooperative reports housing access and labor availability together"
    },
    {
      "id": "r2",
      "label": "Terminal publishes equal-access bookings"
    },
    {
      "id": "r3",
      "label": "Watershed office updates measured marginal harm"
    },
    {
      "id": "r4",
      "label": "Council reopens the agreement under its review clause"
    }
  ],
  "mapping": {
    "e1": "r1",
    "e2": "r2",
    "e3": "r3",
    "e4": "r4"
  },
  "why": "Housing access affects whether qualified workers can take the jobs in the earlier wage trial, so the cooperative must report both conditions. Equal-access bookings make exclusion observable at the terminal. The watershed report supplies the external-cost estimate that supports the freight rule. The council’s review clause connects changed assumptions to a new decision. These are distinct duties, not interchangeable signatures: assigning every risk to the same institution would leave some original evidence without an accountable owner.",
  "answerText": "The wage trial required willing qualified workers; a funded housing measure helps those workers take jobs but does not prove the jobs will fill. An access rule needs a booking record that can reveal exclusion. The corrective rule depends on measured external harm. A conditional model must be revisited when its stated assumptions fail.",
  "rebuttals": {
    "e1": "The wage trial required willing qualified workers; a funded housing measure helps those workers take jobs but does not prove the jobs will fill.",
    "e2": "An access rule needs a booking record that can reveal exclusion.",
    "e3": "The corrective rule depends on measured external harm.",
    "e4": "A conditional model must be revisited when its stated assumptions fail."
  }
}
```

**Question card prompt — exact player copy:** Match each evidence card to one response; use each response once and submit all four links.

**Correct result:** {"New hires still cannot take the four jobs at the signed $30 wage because homes are inaccessible": "Cooperative reports housing access and labor availability together", "Usable freight slots are withheld from rivals": "Terminal publishes equal-access bookings", "Downstream harm changes after expansion": "Watershed office updates measured marginal harm", "Observed results no longer fit adopted assumptions": "Council reopens the agreement under its review clause"}; exact selection or mapping required.

**Answer text:** The wage trial required willing qualified workers; a funded housing measure helps those workers take jobs but does not prove the jobs will fill. An access rule needs a booking record that can reveal exclusion. The corrective rule depends on measured external harm. A conditional model must be revisited when its stated assumptions fail.

**Why/mechanism:** Housing access affects whether qualified workers can take the jobs in the earlier wage trial, so the cooperative must report both conditions. Equal-access bookings make exclusion observable at the terminal. The watershed report supplies the external-cost estimate that supports the freight rule. The council’s review clause connects changed assumptions to a new decision. These are distinct duties, not interchangeable signatures: assigning every risk to the same institution would leave some original evidence without an accountable owner.

**Misconception / wrong-path feedback:**

- The wage trial required willing qualified workers; a funded housing measure helps those workers take jobs but does not prove the jobs will fill. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- An access rule needs a booking record that can reveal exclusion. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The corrective rule depends on measured external harm. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- A conditional model must be revisited when its stated assumptions fail. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Catchment Map stores this dated finding in text: The wage trial required willing qualified workers; a funded housing measure helps those workers take jobs but does not prove the jobs will fill. An access rule needs a booking record that can reveal exclusion. The corrective rule depends on measured external harm. A conditional model must be revisited when its stated assumptions fail.

**Unlock:** Stop 59.

**Retrieval:** Use the prior mission log and concepts [7, 10, 18]; the prior-result line states the immediate dependency.

**Later payoff:** After the final resource check and ending card, the town reopens for free exploration with every signed commitment in the log.

**Consistency bundle:**
```json
{
  "source_values": "The signed draft names the cooperative for housing access, terminal for open bookings, watershed office for damage reports and council for review; match each recorded risk to its required action.",
  "derived_values": "The wage trial required willing qualified workers; a funded housing measure helps those workers take jobs but does not prove the jobs will fill. An access rule needs a booking record that can reveal exclusion. The corrective rule depends on measured external harm. A conditional model must be revisited when its stated assumptions fail.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": {
    "New hires still cannot take the four jobs at the signed $30 wage because homes are inaccessible": "Cooperative reports housing access and labor availability together",
    "Usable freight slots are withheld from rivals": "Terminal publishes equal-access bookings",
    "Downstream harm changes after expansion": "Watershed office updates measured marginal harm",
    "Observed results no longer fit adopted assumptions": "Council reopens the agreement under its review clause"
  },
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The wage trial required willing qualified workers; a funded housing measure helps those workers take jobs but does not prove the jobs will fill. An access rule needs a booking record that can reveal exclusion. The corrective rule depends on measured external harm. A conditional model must be revisited when its stated assumptions fail.",
  "wrong_feedback_values": [
    "The wage trial required willing qualified workers; a funded housing measure helps those workers take jobs but does not prove the jobs will fill.",
    "An access rule needs a booking record that can reveal exclusion.",
    "The corrective rule depends on measured external harm.",
    "A conditional model must be revisited when its stated assumptions fail."
  ],
  "later_story_references": "The town reopens for free exploration with every signed commitment in the log"
}
```

## H3. Stop 59 — Commit the final flow forecast

**Format/placement:** VERIFY, Civic Advice Office — Hearing Table.

**Metadata:** Concept: 18 — External costs and benefits; Narrow concept: Commit the final flow forecast; Keystone: Social effects, Marginal analysis, Surplus, Competition and entry; Area: T; Prerequisites: 10; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Required stop kind / player verb:** operated; First, calculate and commit the freight quantity consistent with the adopted social-cost rule. Then run the Hearing Table at the signed rule, measure the modeled flow, and select whether it matches; no restoration or second reading is required.

**Briefing decision advanced:** which complete agreement the council can sign under its published rules.

**Actual mission answer — authoring only:** Sign the access retrofit with funded housing support and the water-cost rule.

**Call — exact player copy:** Go to the Hearing Table in Civic Advice Office.

**Stop reason — exact player copy:** The final trial must preserve the corrected freight rule.

**Question card story setup — exact player copy:** Mara shows you the record: the commitments now have owners, and the signed draft keeps the same social-cost rule that changed the freight target earlier. Commit and test the final flow forecast before a funding transfer quietly changes the economic benchmark.

**Prior result displayed in mission log:** The wage trial required willing qualified workers; a funded housing measure helps those workers take jobs but does not prove the jobs will fill. An access rule needs a booking record that can reveal exclusion. The corrective rule depends on measured external harm. A conditional model must be revisited when its stated assumptions fail.

**Question card story-science connection — exact player copy:** The final plan must preserve the lesson learned from water damage.

**Data/readings/options — exact player copy:** The agreement’s freight model retains MSB=100−2Q, private marginal cost $20 and measured external marginal harm $20 per unit; confirmed finance does not alter these marginal schedules. The retrofit ends exclusive terminal control and imposes equal-access marginal-cost pricing: operators charge $20 resource cost plus the $20 damage charge; fixed costs are met by the separately funded $20 support item. No monopoly MR=MC rule remains in this trial.

**Format-specific interaction block:**

```json
{
  "verify": {
    "quantity": "Commit the final flow forecast",
    "units": "freight units per day",
    "predictionRange": {
      "min": 0,
      "max": 50,
      "step": 1
    },
    "truth": 30,
    "tolerance": 0.05,
    "measurement": {
      "label": "Run trial and read result",
      "cost": 1,
      "units": "trial credit"
    },
    "measurementBudget": 2,
    "conclusions": [
      "Prediction matches the trial",
      "Prediction does not match the trial"
    ],
    "correctConclusion": "Prediction matches the trial",
    "requiredSequence": [
      "calculate_commit",
      "operate",
      "measure",
      "interpret"
    ],
    "initialPrediction": null,
    "locks": {
      "operate": "prediction committed",
      "measure": "trial operated",
      "interpret": "reading collected"
    }
  },
  "answerText": "The earlier corrected benchmark still applies: 100−2Q = 20+20 gives Q=30. Funding transfers are not an extra resource benefit and do not change this marginal equality.",
  "wrongFeedback": [
    "40 drops the external harm again.",
    "20 preserves the monopoly output rather than the adopted social-cost rule.",
    "50 ignores all marginal costs."
  ]
}
```

**Question card prompt — exact player copy:** First, calculate and commit the freight quantity consistent with the adopted social-cost rule. Then run the Hearing Table at the signed rule, measure the modeled flow, and select whether it matches; no restoration or second reading is required.

**Correct result:** 30; absolute tolerance 0.05 in the requested unit.

**Answer text:** The earlier corrected benchmark still applies: 100−2Q = 20+20 gives Q=30. Funding transfers are not an extra resource benefit and do not change this marginal equality.

**Why/mechanism:** The earlier corrected benchmark still applies: 100−2Q = 20+20 gives Q=30. Funding transfers are not an extra resource benefit and do not change this marginal equality. The final plan must preserve the lesson learned from water damage. The retrofit’s regulated equal access removes monopoly pricing, while separate support covers fixed costs; a damage tax imposed on an unchanged monopolist would require a different calculation. 40 drops the external harm again.

**Misconception / wrong-path feedback:**

- 40 drops the external harm again. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 20 preserves the monopoly output rather than the adopted social-cost rule. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- 50 ignores all marginal costs. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Hearing Table stores this dated finding in text: The earlier corrected benchmark still applies: 100−2Q = 20+20 gives Q=30. Funding transfers are not an extra resource benefit and do not change this marginal equality.

**Unlock:** Stop 60.

**Retrieval:** Use the prior mission log and concepts [3, 10]; the prior-result line states the immediate dependency.

**Later payoff:** After the final resource check and ending card, the town reopens for free exploration with every signed commitment in the log.

**Consistency bundle:**
```json
{
  "source_values": "The agreement’s freight model retains MSB=100−2Q, private marginal cost $20 and measured external marginal harm $20 per unit; confirmed finance does not alter these marginal schedules. The retrofit ends exclusive terminal control and imposes equal-access marginal-cost pricing: operators charge $20 resource cost plus the $20 damage charge; fixed costs are met by the separately funded $20 support item. No monopoly MR=MC rule remains in this trial.",
  "derived_values": "The earlier corrected benchmark still applies: 100−2Q = 20+20 gives Q=30. Funding transfers are not an extra resource benefit and do not change this marginal equality.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": 30,
  "correct_result": 30,
  "tolerance": 0.05,
  "answer_text_values": "The earlier corrected benchmark still applies: 100−2Q = 20+20 gives Q=30. Funding transfers are not an extra resource benefit and do not change this marginal equality.",
  "wrong_feedback_values": [
    "40 drops the external harm again.",
    "20 preserves the monopoly output rather than the adopted social-cost rule.",
    "50 ignores all marginal costs."
  ],
  "later_story_references": "The town reopens for free exploration with every signed commitment in the log"
}
```

## H4. Stop 60 — Sign the agreement

**Format/placement:** CHOICE, Mara Velez at the Town Map in Civic Advice Office.

**Metadata:** Concept: 21 — Robust comparison of competing plans; Narrow concept: Sign the agreement; Keystone: Social effects, Cost structure, Opportunity cost; Area: T; Prerequisites: 7, 10, 18; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Required stop kind / player verb:** decision; Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Briefing decision advanced:** which complete agreement the council can sign under its published rules.

**Actual mission answer — authoring only:** Sign the retrofit with funded housing and the water-cost rule.

**Call — exact player copy:** Go to Civic Advice Office and meet Mara Velez, state economic adviser, at the Town Map.

**Stop reason — exact player copy:** The council needs one complete recommendation before it signs.

**Question card story setup — exact player copy:** Mara shows you the record: the final trial agrees with the corrected rule, while the funding, stress and responsibility records remain open for inspection. Choose the complete agreement that satisfies the council’s published conditions before the signatures make those commitments binding in the story.

**Prior result displayed in mission log:** The earlier corrected benchmark still applies: 100−2Q = 20+20 gives Q=30. Funding transfers are not an extra resource benefit and do not change this marginal equality.

**Question card story-science connection — exact player copy:** The council can sign a complete agreement while publishing who pays, who benefits and what would trigger review.

**Data/readings/options — exact player copy:** The retrofit survives 40% overrun; confirmed funds cover $150 daily; housing support and access reporting are assigned; freight is governed by the measured $20 external-cost rule; the final flow trial matches 30. New line fails the stress rule; status quo leaves access unresolved. The council’s published decision rule requires all these conditions, then the highest feasible net resource benefit. The retrofit replaces exclusive monopoly pricing with regulated equal access at private marginal cost plus the harm charge; its fixed-cost support is in the confirmed budget. A harm tax alone on the unchanged monopoly would not produce the efficient quantity. The earlier $30 wage and four-job schedule remain conditional on unchanged product receipts and productivity, and the cooperative must report whether qualified workers can actually take the jobs.

**Format-specific interaction block:**

```json
{
  "question": "Select the one recommendation supported by the recorded evidence and the stated decision rule.",
  "choices": [
    "Sign the retrofit with housing but omit the measured water-cost charge",
    "Retain the monopoly with the rent cap as the entire housing access plan",
    "Sign the retrofit with funded housing and the water-cost rule",
    "Sign the new line with housing funded by the pending grant application"
  ],
  "answer": "Sign the retrofit with funded housing and the water-cost rule",
  "why": "The retrofit bundle meets the adopted feasibility, funding, access, environmental and accountability conditions together. Its superiority is conditional on those explicit rules and evidence; the decision does not claim every resident gains or that the same intervention fits every town. The council can sign a complete agreement while publishing who pays, who benefits and what would trigger review. The new line fails the stress condition and its grant is unconfirmed.",
  "rebuttals": {
    "Sign the new line with housing funded by the pending grant application": "The new line fails the stress condition and its grant is unconfirmed.",
    "Sign the retrofit with housing but omit the measured water-cost charge": "Removing the water rule recreates the unpriced external cost.",
    "Retain the monopoly with the rent cap as the entire housing access plan": "The cap leaves applicants unmatched and monopoly access remains unresolved."
  },
  "answerText": "The retrofit bundle meets the adopted feasibility, funding, access, environmental and accountability conditions together. Its superiority is conditional on those explicit rules and evidence; the decision does not claim every resident gains or that the same intervention fits every town."
}
```

**Question card prompt — exact player copy:** Select the one recommendation supported by the recorded evidence and the stated decision rule.

**Correct result:** "Sign the retrofit with funded housing and the water-cost rule"; exact selection or mapping required.

**Answer text:** The retrofit bundle meets the adopted feasibility, funding, access, environmental and accountability conditions together. Its superiority is conditional on those explicit rules and evidence; the decision does not claim every resident gains or that the same intervention fits every town.

**Why/mechanism:** The retrofit bundle meets the adopted feasibility, funding, access, environmental and accountability conditions together. Its superiority is conditional on those explicit rules and evidence; the decision does not claim every resident gains or that the same intervention fits every town. The council can sign a complete agreement while publishing who pays, who benefits and what would trigger review. The new line fails the stress condition and its grant is unconfirmed.

**Misconception / wrong-path feedback:**

- The new line fails the stress condition and its grant is unconfirmed. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- Removing the water rule recreates the unpriced external cost. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

- The cap leaves applicants unmatched and monopoly access remains unresolved. Reopen the unchanged board, inspect the cited evidence, then commit a revised answer.

**State/output:** The Town Map stores this dated finding in text: The retrofit bundle meets the adopted feasibility, funding, access, environmental and accountability conditions together. Its superiority is conditional on those explicit rules and evidence; the decision does not claim every resident gains or that the same intervention fits every town.

**Unlock:** Mission outcome.

**Retrieval:** Use the prior mission log and concepts [7, 10, 18]; the prior-result line states the immediate dependency.

**Later payoff:** After the final resource check and ending card, the town reopens for free exploration with every signed commitment in the log.

**Consistency bundle:**
```json
{
  "source_values": "The retrofit survives 40% overrun; confirmed funds cover $150 daily; housing support and access reporting are assigned; freight is governed by the measured $20 external-cost rule; the final flow trial matches 30. New line fails the stress rule; status quo leaves access unresolved. The council’s published decision rule requires all these conditions, then the highest feasible net resource benefit. The retrofit replaces exclusive monopoly pricing with regulated equal access at private marginal cost plus the harm charge; its fixed-cost support is in the confirmed budget. A harm tax alone on the unchanged monopoly would not produce the efficient quantity. The earlier $30 wage and four-job schedule remain conditional on unchanged product receipts and productivity, and the cooperative must report whether qualified workers can actually take the jobs.",
  "derived_values": "The retrofit bundle meets the adopted feasibility, funding, access, environmental and accountability conditions together. Its superiority is conditional on those explicit rules and evidence; the decision does not claim every resident gains or that the same intervention fits every town.",
  "displayed_prediction": "blank until player commit",
  "observed_measurement": null,
  "correct_result": "Sign the retrofit with funded housing and the water-cost rule",
  "tolerance": "exact labels/mapping",
  "answer_text_values": "The retrofit bundle meets the adopted feasibility, funding, access, environmental and accountability conditions together. Its superiority is conditional on those explicit rules and evidence; the decision does not claim every resident gains or that the same intervention fits every town.",
  "wrong_feedback_values": [
    "The new line fails the stress condition and its grant is unconfirmed.",
    "Removing the water rule recreates the unpriced external cost.",
    "The cap leaves applicants unmatched and monopoly access remains unresolved."
  ],
  "later_story_references": "The town reopens for free exploration with every signed commitment in the log"
}
```

## I. Mission outcome

**Delivery piece 15:** The signed town agreement. Add this mission’s finding to its matching public-board slot; retain READY TO SIGN until the final resource check succeeds.

**Pre-card character beat — Mara Velez:** “We can sign what is funded, measured and owned.”

**Mission decision:** Sign the access retrofit with funded housing support and the water-cost rule. All funds are confirmed and each promise has an owner. The final trial meets the corrected goal. The plan is ready for signing after the final resource check.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 15 COMPLETE

**Timer line:** TIME {elapsed} / TARGET 20:00

**Accuracy line:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The complete agreement is funded and prepared for the final resource check.

**Automatic bar change:** Plan Evidence +7 | Service Continuity +4 | Field Budget +3 | Public Accountability +7

**Recovery Point line:** RP = clamp(4, 12, 11 + time_modifier − incorrect_submissions); AWARDED {rp}.

**Allocation prompt:** One point adds one percent to an unlocked bar; bank up to 30 points.

**Canonical QA example:** 4 RP; allocate [0, 0, 0, 0]; bars [100, 100, 100, 100]; bank 11, all in E/S/B/A order.

**Lock/failure result:** Check for zero after the event and restore the mission snapshot if needed; all bars remain unlocked until the final agreement and four 100% bars. After this allocation, when all four bars equal 100 and Stop 60 is passed, Mara Velez signs the council-authorized agreement, the public board changes to SIGNED, all bars lock, and the rent-support and water-review notices are posted; return to free exploration with no further quiz.

**Segue — exact player copy:** Yet Leila still has unmatched housing requests; the signed agreement must keep those people in its review.

## K. Quick concept review

- A defensible agreement must meet its conditions without counting the same benefit twice.

- A gain for one group can be a transfer from another group.

- Use the earlier opportunity-cost test when a resource has another possible use.

- **Mission takeaway:** The council can sign a complete agreement while publishing who pays, who benefits and what would trigger review.

## Ending card — exact player copy

The Town and Freight Agreement is signed. At the public board, Mara puts the last piece beside the first meal trade. The gate will take more freight under new access terms. The wage clause adds a job in the model you checked. Housing help has funds, and the water rule has an owner. Outside, Nico serves lunch beside the new stalls he once tried to keep out.

The gains have names, and so do the costs. New sellers get a chance to trade; Nico faces more rivals. The gate loses some power to hold back service, while the plan must still cover its fixed bill. Buyers and sellers share the housing fee. The filter stays cheaper without the proposed tax, so local filter sellers lose the extra price that tax would have given them. Freight users must now face the water cost once left to people down the stream.

Leila leaves the unmatched home requests on the board. This deal does not give each new arrival a home, end every water risk or prove that trade will keep growing. Owen will check the water record, and the named owners must report back on their terms. The new line’s ribbon is gone. In its place is a plan the town can read, challenge and change when the facts change.

**Ending trigger and presentation — implementation:** Show only after Stop 60 succeeds, the final RP allocation completes, all four bars read 100 and the commitments are signed. One Continue returns to free exploration; all fifteen pieces and their qualifications remain inspectable. This card does not add a reward or bypass a gate. Mission 15’s segue appears before this card; it points to an unresolved cost, not an extra mission.


## L. GO DEEPER — A signed plan still needs owners

**Secondary briefing — exact player copy:** Close the review by checking funding, distribution and responsibility. A signature commits people to act; it cannot turn an uncertain assumption into a proven fact or erase an unresolved problem.

**Optional review behavior:** Select GO DEEPER from the completed mission card. All six questions are ungraded, timer-paused and reopenable. Selection, mistakes, hints and reveals change no bars, RP, evidence flags or unlocks. Keep the five worked examples as a separate button. Return closes review to the same completed mission card. For Mission 15 this button is available only on explicit selection after the ending card has closed and normal play has returned; never auto-open review after signing. Each question permits retries; show feedback for the chosen option and reveal the worked explanation only on explicit request.

**Supporting concepts — exact player copy:**

- A funding gap is required spending minus confirmed contributions when that difference is positive. Pending money is a condition, not current funding.
- Positive net social benefit can coexist with losses to a group. Potential compensation is distinct from an actual promised and funded transfer.
- Accountability needs a named owner, a measure, a deadline and a duty to report. A promise with no responsible actor is incomplete.
- New evidence can require reopening an affected commitment. Preserve the earlier record and describe which assumption changed rather than silently erasing it.

### BT-GD-M15-Q1

**Question:** Confirmed contributions are $45 from a co-op and $35 from a firm. Required spending is $90. What funding gap remains?

- **A.** $10
- **B.** $80
- **C.** $170
- **D.** No gap because two parties signed

**Correct key:** A

**Hint:** Separate a desirable total from a funded commitment, and name the group or owner behind each promise.

**Worked explanation — reveal on request:** Confirmed funds total eighty, ten below the ninety-dollar requirement.

**Feedback A:** Correct. Confirmed funds total eighty, ten below the ninety-dollar requirement.

**Feedback B:** Reconsider. That is confirmed funding, not the gap.

**Feedback C:** Reconsider. Adding funds and spending does not measure the shortfall.

**Feedback D:** Reconsider. The number of signers does not establish adequate funding.


### BT-GD-M15-Q2

**Question:** A policy has positive net social benefit but imposes a $25 loss on one group. What does that establish about compensation?

- **A.** The group has already been repaid
- **B.** No one can be made better off
- **C.** The policy must have negative total benefit
- **D.** Compensation may be possible, but it is not automatic

**Correct key:** D

**Hint:** Separate a desirable total from a funded commitment, and name the group or owner behind each promise.

**Worked explanation — reveal on request:** Aggregate gains do not document an actual transfer to the losing group.

**Feedback A:** Reconsider. No compensation commitment is given.

**Feedback B:** Reconsider. Other groups may gain more than twenty-five.

**Feedback C:** Reconsider. A subgroup's loss can coexist with positive total benefit.

**Feedback D:** Correct. Aggregate gains do not document an actual transfer to the losing group.


### BT-GD-M15-Q3

**Question:** A monitoring promise names a measure and deadline but nobody responsible. What is missing for accountability?

- **A.** A larger expected surplus estimate
- **B.** Removal of the deadline
- **C.** A named owner with an explicit reporting duty
- **D.** A binding price ceiling

**Correct key:** C

**Hint:** Separate a desirable total from a funded commitment, and name the group or owner behind each promise.

**Worked explanation — reveal on request:** A measure cannot assign itself responsibility for collecting and reporting results.

**Feedback A:** Reconsider. A benefit estimate does not assign responsibility for monitoring.

**Feedback B:** Reconsider. That would weaken, not complete, the commitment.

**Feedback C:** Correct. A measure cannot assign itself responsibility for collecting and reporting results.

**Feedback D:** Reconsider. A price restriction does not name a monitoring owner.


### BT-GD-M15-Q4

**Question:** A contract is feasible only if a grant arrives, but the grant is still pending. How should it be described now?

- **A.** Independent of funding
- **B.** Conditional on the grant, not fully funded
- **C.** Fully funded because the application was submitted
- **D.** Impossible under every future outcome

**Correct key:** B

**Hint:** Separate a desirable total from a funded commitment, and name the group or owner behind each promise.

**Worked explanation — reveal on request:** The unconfirmed resource is an explicit dependency.

**Feedback A:** Reconsider. The question states a funding condition.

**Feedback B:** Correct. The unconfirmed resource is an explicit dependency.

**Feedback C:** Reconsider. Submission is not confirmation.

**Feedback D:** Reconsider. The grant might arrive; current uncertainty is not proof of impossibility.


### BT-GD-M15-Q5

**Question:** A plan improves access but leaves downstream harm unchanged. Which closing report is most accurate?

- **A.** Report the access gain and the unresolved harm separately
- **B.** Say all market failures are fixed
- **C.** Ignore access because harm remains
- **D.** Call the unchanged harm a new benefit

**Correct key:** A

**Hint:** Separate a desirable total from a funded commitment, and name the group or owner behind each promise.

**Worked explanation — reveal on request:** A gain in one dimension does not settle another unchanged problem.

**Feedback A:** Correct. A gain in one dimension does not settle another unchanged problem.

**Feedback B:** Reconsider. The unresolved harm contradicts that claim.

**Feedback C:** Reconsider. That conceals a supported benefit.

**Feedback D:** Reconsider. No improvement in harm is supplied.


### BT-GD-M15-Q6

**Question:** A follow-up audit finds that a signed plan's cost assumption was too low. What is the evidence-based response?

- **A.** Keep the original conclusion because it was signed
- **B.** Erase the original record
- **C.** Assume every other finding is false
- **D.** Reopen the affected commitment, disclose the gap and reassess feasible options

**Correct key:** D

**Hint:** Separate a desirable total from a funded commitment, and name the group or owner behind each promise.

**Worked explanation — reveal on request:** A signature does not make a faulty assumption true; the revision should track its consequences.

**Feedback A:** Reconsider. Commitment is not immunity from new evidence.

**Feedback B:** Reconsider. Preserving the record shows what changed and who must respond.

**Feedback C:** Reconsider. A specific failed assumption does not invalidate unrelated evidence automatically.

**Feedback D:** Correct. A signature does not make a faulty assumption true; the revision should track its consequences.


# 8. Implementation boundary and build decisions

This is the canonical authored bible, not a compiled or playable build. Engine importer/schema, project readability checker, worldParity, placement, reachable, right-first play, wrong-first play, restore and timer behavior are NOT TESTED. JSON blocks are single canonical board sources; keyed fields, mechanism, answer text and consistency bundles are authoring/grading-only until feedback. Do not display them as pre-answer evidence. Options and visible readings are player-facing.

Retain group IDs T, CM, E, P, X and all Project Y terrain and path dimensions. Build the declared reusable fixtures because the source has no fixture implementation. Keep 14 other buildings as scenery with contemporary labels. Final agreement appears on the Public Notice Board only after the final graded recommendation, metric recovery allocation and four 100% bars; signing then opens the existing Civic Advice Office exit normally, updates the freight booking notice and posts the rent-support and water-monitoring notices. No train, rail platform, mine portal or off-map travel is invented. No further quiz follows the final decision.
