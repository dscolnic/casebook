# PEER REVIEW — Spec for a RECKON Game

A daily puzzle where the player acts as a referee: read a study with a confident
conclusion and decide, note by note, which criticisms actually matter. The core lesson
— **every study has limitations, but only some make the conclusion unsupported.**

Output should be a single self-contained `peerreview.html` plus the study data — no
external libraries, no build step, no frameworks. Follow the RECKON integration
contract (§§6–9) exactly.

---

## 1. The concept

Each daily puzzle is ONE study, shown as a short structured abstract (question, method,
sample, result, and the authors' **conclusion**). Below it sit **6 review notes** —
candidate criticisms. The player assigns each note one of three verdicts:

- **Fatal** — this flaw makes the stated conclusion unsupported. **Exactly ONE note is Fatal.**
- **Valid concern** — a real limitation worth noting, but the conclusion can still stand.
- **Not a problem** — sounds like a criticism but is actually fine (a misconception).

Win = all 6 notes correctly classified. The skill is *triage/severity*, not just
spotting flaws: distinguishing the one decisive flaw from survivable limitations and
non-issues.

**Why it's different from the other games:** it reasons about *evidence itself*
(meta-science). Diagnosis asks "which fault fits the panel"; Peer Review asks "does this
conclusion follow from this method" — a different muscle, and the most important
science-literacy skill in the suite.

## 2. Interaction (mobile-first — no drag needed)

Each note is a card with **three buttons: Fatal · Valid · Not a problem.** Tapping one
selects that verdict for the note (radio-style). This avoids drag entirely, so it works
identically on phone and desktop. (If you add drag-to-bucket later, use Pointer Events
per §9 — but tap-select is the primary design.)

Submit is enabled once all 6 notes have a verdict. On submit, correctly classified notes
LOCK (green); wrong ones are flagged and can be reclassified. **3 attempts.** Loss on
attempt 3 reveals the correct verdicts + reasoning.

## 3. Data model (author to this schema EXACTLY)

```js
const studies = [
  {
    id: "standing-desks",                 // kebab-case, unique, stable (URL + rotation)
    title: "Do standing desks boost productivity?",
    field: "Workplace / experimental design",
    abstract: {
      question:  "One sentence: what the study asked.",
      method:    "1–2 sentences: how it was done (design, groups, what was compared).",
      sample:    "The sample / n / setting.",
      result:    "The headline finding, with the number.",
      conclusion:"The authors' stated conclusion — this is what the player judges."
    },
    notes: [                              // EXACTLY 6; EXACTLY ONE with verdict "fatal"
      { id:"n1", text:"The review note as a referee would write it.",
        verdict:"fatal", why:"One sentence: why this verdict is correct." }
      // ... 6 total
    ],
    takeaway: "One sentence naming the transferable lesson."
  }
];
```

**Hard rules:**
- Exactly **6 notes** per study.
- Exactly **ONE** note has `verdict:"fatal"`.
- Aim for **2 `valid` + 3 `none`** (or 3 valid + 2 none) among the rest — always a mix
  of both, never all one kind.
- Every keyed verdict must be defensible to a methodologist from the abstract alone
  (all needed info is stated; no outside facts required).

## 4. The flaw taxonomy (draw notes from these)

**Things that are usually FATAL to a causal conclusion:**
confounding / no control for a third variable · self-selection or non-random assignment
· no control or comparison group · reverse causation · measuring the wrong thing
(invalid proxy) · generalizing far beyond the sample · p-hacking / cherry-picked
outcome · unblinded outcome that's subjective.

**Things that are usually VALID CONCERNS but not fatal:**
short follow-up · imperfect but reasonable proxy · modest sample that's still adequately
powered · single site / limited generalizability · effect smaller than hoped · missing
secondary analyses.

**Things that are usually NOT A PROBLEM (misconception traps):**
"not peer-reviewed / not a famous journal" (not a methodological flaw) · "n is only 200"
when 200 is adequately powered · "correlation ≠ causation" *when the study was actually
randomized* · dismissing a genuinely large effect as "too small to matter" · "the funder
was involved" (a disclosure issue, not by itself an invalidating flaw) · a controlled
factor mistaken for a confound.

> The richest puzzles put a **real-sounding trap** in the "not a problem" pile — a
> criticism players *want* to pick because it sounds sophisticated — and make the true
> fatal flaw quieter.

## 5. Worked example (build to this level of clarity)

**Study — "Do standing desks boost productivity?"**
- *Method:* Employees at one company could **opt in** to a standing desk. After 3
  months, output of opt-in employees was compared with those who kept sitting desks.
- *Result:* Standing-desk users produced **15% more** output.
- *Conclusion:* "Standing desks increase productivity."

**Notes & keyed verdicts:**
1. "Employees chose their own desks, so the two groups may differ in motivation to begin
   with." → **FATAL** — self-selection confounds the comparison; the desks and the kind
   of person who picks them can't be separated.
2. "Follow-up was only three months." → **Valid concern** — durability is unknown, but
   it doesn't erase the measured gain.
3. "'Productivity' was measured only by tickets closed." → **Valid concern** — a
   reasonable proxy that may miss quality.
4. "The study wasn't published in a peer-reviewed journal." → **Not a problem** —
   publication status isn't a methodological flaw.
5. "Only 240 employees took part — too few to mean anything." → **Not a problem** — 240
   adequately powers a 15% effect; the number *sounds* small but isn't the issue.
6. "The company paid for the study, a conflict of interest." → **Not a problem** — a
   disclosure to note, but it doesn't invalidate the data.

**Takeaway:** "The decisive question isn't whether a study has limitations — all do —
but whether any single flaw makes the conclusion unsupported. Here, self-selection means
the desks and the workers can't be told apart."

That's 1 fatal, 2 valid, 3 not-a-problem, with note 5 as the tempting trap.

### 5b. More worked examples (different domains, different fatal-flaw types)

**Oyster reefs & water clarity — fatal flaw: reverse causation.**
*Method:* surveyed 40 coastal sites; sites **with** oyster reefs had clearer water.
*Conclusion:* "Restoring oyster reefs will clear up murky water."
1. Oyster larvae die in murky water, so clear water may **enable** reefs rather than
   reefs causing clarity. → **FATAL** (observational; can't tell causal direction).
2. Clarity was measured with a Secchi disk. → **Not a problem** (standard valid method; *trap — sounds crude*).
3. Only 40 sites were surveyed. → **Not a problem** (adequate).
4. Clarity wasn't tracked across seasons. → **Valid concern**.
5. The study was funded by a reef-restoration nonprofit. → **Not a problem** (disclosure).
6. Reef vs non-reef sites weren't matched on depth or wave exposure. → **Valid concern**.
*Takeaway:* an observational "sites with X have more Y" can't tell you which causes which.

**Dietary supplement — fatal flaw: multiple comparisons / cherry-picking.**
*Method:* randomized, placebo-controlled; measured **27 health outcomes**. One (LDL
cholesterol) improved at p<0.05; the other 26 didn't. *Conclusion:* "The supplement
improves cholesterol."
1. 27 outcomes were tested and only one reached significance — expected by chance alone. → **FATAL** (no correction for multiple comparisons; likely a false positive).
2. It was randomized and placebo-controlled. → **Not a problem** (that's a strength, not a flaw; *trap — a strength dressed as a note*).
3. The LDL change was small (6 mg/dL). → **Valid concern** (clinical relevance).
4. The trial ran only 12 weeks. → **Valid concern**.
5. Only 200 participants took part. → **Not a problem** (adequately powered).
6. The supplement maker funded the study. → **Not a problem** (disclosure).
*Takeaway:* test enough outcomes and one will "win" by chance; the flaw is picking the winner after the fact.

**AI pneumonia detector — fatal flaw: data leakage / shortcut learning.**
*Method:* trained on one hospital's chest X-rays, tested on held-out images from the
**same hospitals/scanners**; reported 95% accuracy. *Conclusion:* "The model can
diagnose pneumonia."
1. Test images came from the same hospitals/scanners as training, so the model may key
   on scanner artifacts, not lungs. → **FATAL** (shortcut/leakage; no external validation, so accuracy won't transfer).
2. Only overall accuracy was reported (no sensitivity/specificity). → **Valid concern**.
3. The network is large and hard to interpret. → **Not a problem** (interpretability ≠ validity; *trap*).
4. Training used 50,000 images. → **Not a problem** (ample).
5. It was compared only to junior doctors, not senior radiologists. → **Valid concern** (benchmark choice).
6. The code wasn't released publicly. → **Not a problem** (reproducibility nicety, not a validity flaw; *trap*).
*Takeaway:* a high test score is meaningless if the test set shares spurious shortcuts with training — it may be measuring the scanner, not the disease.

## 6. Content authoring rules

1. **Exactly one fatal flaw**, and it must be genuinely decisive for *the stated
   conclusion* (not a different conclusion).
2. **Deducible from the abstract** — the player needs no domain facts, only reasoning
   about method. Difficulty comes from severity triage, not knowledge.
3. **Accuracy:** the statistics and methodology must be correct so an expert agrees with
   every keyed verdict. Get "adequately powered," "randomized," "confound," "proxy"
   right.
4. **At least one misconception trap** in the "not a problem" pile per study.
5. **Domain variety across studies:** medicine, ecology, materials, psychology,
   engineering, oceanography, nutrition, education, climate, public health, AI/ML
   evaluation, etc.
6. **Voice:** notes read like real, terse referee comments. Neutral and concise.

**Volume:** daily game + 14-day archive → provide **≥15 studies, ideally 20+**, so the
archive never repeats.

## 7. Scoring (feeds the RECKON stats board)

```
per-note: correct on attempt 1 = 3, attempt 2 = 2, attempt 3 = 1, never/revealed = 0
score = sum of per-note points               // max = 3 × 6 = 18
won   = all 6 notes correctly classified within 3 attempts
rank  = score===max ? "SHARP REFEREE" : won ? "ACCEPTED" : "DESK REJECT"
```

## 8. RECKON integration contract (identical to the other games)

1. `<script src="reckon-results.js"></script>` (exposes `reckonStart`/`reckonReport`;
   no-ops on the static site).
2. `reckonStart(study.id)` when a study opens.
3. On finish (win or loss), once:
   ```js
   reckonReport({ game:"Peer Review", gameId:study.id, gameTitle:study.title,
                  won, score, solveSeconds, rank });
   ```
   `game` must be exactly `"Peer Review"`.
4. Header **"← RECKON"** link → `reckon.html` (relative, no leading slash).
5. No auth code — the server gate handles sign-in; degrade gracefully with no backend.
6. **No mission/study picker** — the player only ever sees one study (the daily one).
   Do NOT add a dropdown that lists all studies.

## 9. Daily rotation + deep-linking

```js
const START = Date.UTC(2026, 6, 1);   // fixed epoch — do not change
const DAY = 86400000;
const dayIndex = () => Math.floor((Date.now() - START) / DAY);
const mod = (n, m) => ((n % m) + m) % m;
```
On load: if `location.hash` names a study id, load that (the hub links to today + the
previous 14 days as `peerreview.html#<id>`); otherwise load today's =
`studies[mod(dayIndex(), studies.length)]`.

## 10. Hub registration values (supply these; wiring done on the repo side)

One `[id, title, field]` row per study, in the studies order:
```js
"Peer Review": { "link":"peerreview.html#", "fileLink":false, "cases":[
  ["standing-desks","Do standing desks boost productivity?","Experimental design"]
  // ...one row per study
]}
```
(Alphabetically it slots between Diagnosis and Protocol in the hub. Logo tile/color
added on the repo side — no SVG needed.)

## 11. Deliverables

1. One self-contained `peerreview.html` implementing §§2–3, 7–9 (tap-to-classify, 3
   attempts + lock + reveal, scoring, reckon-results.js hook, ← RECKON link, daily
   rotation + hash deep-link, no study picker).
2. The `studies` array with **≥15 studies** meeting §§3–6.
3. The hub `cases` rows (§10) matching the studies order.
