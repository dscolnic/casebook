# Future Portfolio — Follow-up Note (revision 2 → 3)

The last revision (`future_portfolio_game_library_revised.html`) is a big step up: the reskin is correct, payoffs now vary per idea, round structures (standard / twoWinners / allDuds / sleeper) are real in the data, and paid research, hold-cash, and calibration targets all exist. Three things still need fixing before this ships. Fix only these — do not rebuild or restyle anything else.

---

## Item 1 — `impactTier` now contradicts the payoff and reads like a bug

**The problem.** Every round still carries exactly one `transformative`, one `medium`, one `limited` tier, but the `returnMultiplier` no longer tracks the tier. The clearest case: in "The Internet Information-System Race," the World Wide Web is tagged `transformative` yet its `returnMultiplier` is **0.85 — a loss.** A player who correctly bets on the "transformative" idea loses money and has no way to understand why. Right now this looks broken, not intentional.

**The intended lesson (make it explicit).** Some innovations are civilizationally transformative but **capture almost no financial return** — an open, free, or un-ownable standard (the Web, TCP/IP, the transistor's underlying physics) changes the world without rewarding the investor who backed it. That is one of the most valuable lessons the game can teach. But it only works if the player is *told* it, not left confused.

**What to do:**
1. Keep `impactTier` meaning **long-run historical importance**, and make it explicit in the data and UI that this is *separate* from `returnMultiplier`, which is **the financial return an investor could actually capture in the round's window.**
2. In the reveal, label the two independently, e.g. a line like: *"Historical impact: transformative. Investor return: ×0.85 — the technology reshaped the world but was un-ownable, so backers captured little of the value."*
3. Add a field `ideas[].reveal.impactVsReturnNote` (string) on any idea where tier and return diverge sharply (transformative but <1.0×, or limited but >1.0×), explaining the gap in one plain sentence.
4. In `allDuds` rounds specifically, the round debrief must state that the correct play was to hold cash *because even the historically important idea was not investable here* — so the player reads a loss-avoidance round as a win, not a failure.

Do **not** force tier to match return. The divergence is the point; just stop hiding it.

---

## Item 2 — The anti-giveaway rewrite over-corrected into boilerplate

**The problem.** Tone leakage is fixed, but symmetry was achieved by padding. The same filler sentences now repeat verbatim across ideas and rounds — e.g. *"Its adoption would depend on costs, operating practice, complementary equipment, and repeatable results"* and *"Cost, reliability, compatibility, and field performance still require direct comparison."* And every `whyItLookedRight` follows one template: *"A period investor could point to [advantage] and [advantage]; … while the decisive constraint had not yet been established."* The pitches are now neutral but generic, repetitive, and give the player little concrete substance to reason from.

**The principle:** achieve symmetry through **equally confident, equally specific real detail** — not through generic padding that launders the differences away. All three ideas in a round should be written with the same confidence and the same level of concrete period detail, so the player must reason from *substance*, not tone.

**What to do:**
1. Delete the repeated filler sentences. No boilerplate clause should appear in more than one pitch.
2. Rewrite each pitch as **2–3 sentences of concrete, period-accurate specifics** about what the thing does and what was genuinely unknown at the time — stated with equal confidence for winner and losers. Keep lengths within ±15% of each other, but through real content, not padding.
3. De-template `whyItLookedRight`: make each a specific, non-formulaic sentence naming the actual period belief that made this bet look smart, and (for losers) foreshadow nothing about the outcome.
4. Keep `knownAdvantages` / `knownRisks` factual and non-evaluative (this part is already good) — but make sure the winner's risks are as real and pointed as the losers', and the losers' advantages as genuine as the winner's. No option should have obviously "weaker" bullets.

**Blind-read test (must pass every round):** strip the reveal and read the three pitches + advantages + risks. If a knowledgeable reader can still name the winner from tone, confidence, or which option "sounds most successful," it fails — rewrite until it doesn't.

---

## Item 3 — Financial return and calibration score can contradict each other

**The problem.** The two things the game grades can point opposite ways on the *same* correct decision. In the `sleeper` Tesla round, the induction motor is the big winner (`returnMultiplier` 3.45), but the round's `calibrationTarget` rewards weighting the *Tesla coil* (medium, 1.98×) at ~47% versus the motor at ~25%. So a player who correctly identifies the motor and concentrates on it earns a large financial return but a **poor calibration grade** — punished for the right read. That is confusing and feels unfair.

**What to do — pick one and apply it consistently:**

- **Option A (preferred): make calibration reward the risk-aware *ex-ante* bet, and present the two scores as complementary, not competing.** Keep `calibrationTarget` as "the best sizing given what was knowable *before* the reveal," but then the UI must frame return and calibration as two different lenses — *"Return = how you did; Calibration = how well you sized risk given what you could know"* — and never let a strong calibration score coexist with a punished-feeling outcome without explanation. Add a one-line `calibrationRationale` per round explaining why the target weights are what they are (e.g., "the motor's win required infrastructure that was not yet certain, so a risk-aware investor would not have gone all-in").

- **Option B (simpler): align the calibration target with the realized outcome** so that betting more on higher-return ideas scores *better*, and holding cash only scores well in `allDuds`. This removes the contradiction entirely at the cost of the subtler "you couldn't have known" lesson.

Whichever you choose, the invariant is: **a player who makes a defensibly good decision must not be simultaneously rewarded by one score and punished by the other with no explanation.** Verify this holds across all 50 rounds, especially every `sleeper` and `twoWinners`.

---

## Deliverable

Return the updated single-file `future_portfolio_game_library_revised.html`, all inline, no external assets, editorial styling unchanged. Only items 1–3 change: tier/return separation surfaced, pitches de-templated with concrete detail, and the two scores reconciled. Everything else stays as-is.
