# Future Portfolio — Revision Spec (v2)

**Purpose of this document:** a precise, self-contained brief to hand to ChatGPT so it can revise the existing `future_portfolio_game_library.html` into a game that is a *genuine judgment game* rather than a recognition quiz, and that visually belongs in the RECKON portfolio alongside Casebook, Diagnosis, Sequence, and Ballpark.

Do **not** start from scratch. Keep the working parts (data-driven 50 rounds, concealed innovations, allocation loop). Fix the six problems below.

---

## 1. What the game is (keep this)

- **Format:** a fund-management game. Player starts with a bankroll, plays a fixed number of rounds, and tries to beat a target ending value.
- **Each round:** three *concealed* historical innovations linked by a theme (same inventor, lab, or research program). Each is shown with a plain-language pitch, known advantages, and known risks — **the real name is hidden** until the reveal.
- **Player action:** allocate bankroll across the three, then see the reveal (which became transformative / medium / limited) and collect returns.
- **The concealment device is good and must stay** — describe innovations by function ("Rotating Magnetic-Field Motor"), never by name ("AC induction motor").

---

## 2. The six problems to fix

### Problem 1 — It plays as a recognition quiz, not a judgment game
Right now the winner telegraphs itself. The transformative option gets confident advantage language ("fits AC distribution, low wear") while the losers get hedging language ("unclear mass market," "efficiency uncertain," "niche"). The tone leaks the answer before any reasoning happens.

**Requirement:**
- **Symmetric framing.** Winner and losers must be written with equal confidence and equal specificity. A reader must NOT be able to guess the winner from tone, hedge-words, or which pitch "sounds most successful." Strip evaluative adjectives from all three; state capabilities and open questions neutrally for every option.
- **The expertise question must never restate the answer.** In the current build the correct option literally paraphrases the winning thesis. Rewrite expertise questions so they test a *transferable principle* the player could get wrong even after picking correctly (see §6).
- **Kill the repeated giveaway lesson.** The debrief currently teaches the same heuristic ("invest in systems, not devices") almost every round. Vary the underlying lesson so no single memorized rule wins the game.

### Problem 2 — Survivorship / hindsight bias is baked in
Every innovation is famous *because* we know how it turned out, and the duds are pre-flagged as duds.

**Requirement:**
- **Seductive losers.** At least the "limited" option in each round must be a bet that looked genuinely smart at the time and failed for a *non-obvious* reason. Good archetypes: the airship, Betamax, the Concorde, RCA's videodisc, cold fusion, the Segway, thalidomide's original promise. The failure reason should be surprising, not signposted.
- Add a one-line `whyItLookedRight` field to the losing reveals, explaining what a rational investor of the era would have believed. This is where the teaching happens.

### Problem 3 — The allocation mechanic is currently theater
Payoffs are fixed at exactly one ×3.0 / one ×1.5 / one ×0.25 every round, so the optimal play is always "put everything on the transformative one." Hedging is never correct, so allocation carries no decision weight.

**Requirement — variable payoff structures.** Rounds must draw from a mix of shapes so that spreading, concentrating, or sitting out are each sometimes correct:
- **Standard** (one clear winner) — but now hard to identify because of symmetric framing.
- **Two winners** — both pay off; concentrating on one leaves money on the table.
- **All duds** — the correct play is to bet little / hold cash. There must be a "hold" option (uninvested capital is preserved, not lost).
- **Sleeper** — the "medium" option is the best *risk-adjusted* bet because the transformative one was a long shot that could easily have failed.
- Payoff multipliers should be **per-idea data**, not global constants, so authors can tune each round. Keep transformative/medium/limited as *labels*, but let the numeric multiplier vary within a band per idea.

### Problem 4 — The best mechanic is switched off: value of information
The data already contains `researchReports` (technical / manufacturing / market) and the UI already has "buy report" buttons — but reports are free (`defaultReportCostMillions: 0`, "context is free"). The single most interesting decision — *spend capital to reduce uncertainty before betting* — is disabled.

**Requirement:**
- **Charge for research.** Each report costs a meaningful fraction of bankroll. Buying it reveals genuinely decision-relevant information (not flavor text). Money spent on reports is gone whether or not you bet well.
- Reports must have **differential value**: a cheap report that clears one long-shot is a poor buy; an expensive report that distinguishes the two plausible leaders is worth it. Make players reason about which report is worth its price — this is the "value of information" skill.
- The interesting loop becomes: *How much certainty do I need to buy before I bet big, given that certainty is expensive?*

### Problem 5 — Scoring should reward calibration, not just picking
**Requirement:** reward bet size scaled to correctness. The fund should grow most when the player bets big on innovations they read correctly AND hedges the genuinely ambiguous ones. Concentrated bets on a mis-read should hurt. Report costs are deducted before returns. Consider surfacing a per-run "calibration" readout (did the player size bets in proportion to how identifiable the winners actually were?).

### Problem 6 — Visual style collides with the RECKON portfolio
The current file is dark navy with glowing gold gradients, glassmorphism (`backdrop-filter: blur`), 92px display type, and purple/blue neon. The rest of the portfolio is **editorial / NYT-minimal**, and the established design direction explicitly rejects AI-slick, skeuomorphic, and heavy-gradient looks.

**Requirement — reskin to the house editorial system.** Use these exact tokens (copied from the live showcase `reckon.html`):

```css
:root{
  --bg:#ffffff; --panel:#ffffff; --ink:#1a1a17; --muted:#565651;
  --accent:#2f5d86; --hair:#e4e4e2; --chip:#f2f2f0; --hover:#f5f5f3;
  --serif:Georgia,"Times New Roman",serif;
  --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
@media (prefers-color-scheme: dark){
  :root{ --bg:#14140f; --panel:#1c1c16; --ink:#ece9df; --muted:#a6a598;
    --accent:#82b2d9; --hair:#2f2f26; --chip:#26261e; --hover:#22221a; }
}
```

Rules:
- White/paper background, hairline borders (`--hair`), no drop shadows, no glass blur, no gradients.
- Headlines in the serif (`--serif`); body and UI in the sans (`--sans`). No giant display type — headings modest, editorial.
- One accent color (`--accent`) used sparingly for links, the selected state, and the reveal marker. No gold/purple/blue/green rainbow.
- Must support light and dark via the tokens above.
- Numbers (money, multipliers) should read like a quiet financial table, not a casino HUD.

---

## 3. Data schema (keep compatible, extend as noted)

The existing schema works; ChatGPT should preserve it and only add fields. Current per-round shape (abbreviated):

```
roundPackages[] {
  id, sequence, category, title, discipline, era,
  connection, briefing, difficulty, judgmentCall, rankingCaveat,
  contentWarnings, sources,
  ideas[3] {
    concealedTitle, pitch, knownAdvantages[], knownRisks[],
    researchReports { technical, manufacturing, market },   // <- now each needs a cost + real payload
    reveal { historicalName, impactTier, returnMultiplier, legacyBonusMultiplier,
             historicalOutcome, rankingRationale },
    innovationTree { nodes[], edges[] }, tags[], id, displayOrder
  },
  expertiseQuestion { prompt, options[], correctIndex, explanation, bonusMultiplier },
  debrief { winnerIdeaId, winnerReason, investorLesson }
}
```

**Add / change:**
- `gameConfig.roundStructures` — enum of payoff shapes (`standard`, `twoWinners`, `allDuds`, `sleeper`) and per-round `roundStructure` on each package.
- `ideas[].reveal.returnMultiplier` — now varies per idea within a band (do not hardcode 3.0/1.5/0.25 globally).
- `ideas[].reveal.whyItLookedRight` — new, required on non-winning ideas.
- `ideas[].researchReports.{technical|manufacturing|market}` — each becomes `{ costMillions, finding }` where `finding` is decision-relevant, not flavor.
- `gameConfig.allowHoldCash: true` — uninvested bankroll is preserved.
- Remove `defaultReportCostMillions: 0` and the "context is free" rule.

---

## 4. Authoring rules for every round (the anti-giveaway checklist)

Before a round ships, it must pass all of these:
1. **Blind-read test:** strip the reveal. Could a knowledgeable reader still guess the winner from tone alone? If yes, rewrite until no.
2. All three pitches are the same length (±15%) and equally specific.
3. No evaluative adjectives ("revolutionary," "niche," "limited," "promising") in any pitch or advantage/risk list. State facts; let the player judge.
4. The losing option(s) include at least one that a rational period investor would have backed, with a non-obvious failure reason in `whyItLookedRight`.
5. At least one purchasable report changes what the smart allocation is (i.e., the report is worth its cost in at least one line of play).
6. The expertise question tests a principle, and its correct answer is NOT a paraphrase of the round's winning thesis.
7. The debrief lesson is not the same as the previous three rounds' lessons.

---

## 5. Difficulty scaling (align with the portfolio's "logic tree" model)

Difficulty = how much of the reasoning is handed to the player (consistent with the other RECKON games):
- **Introductory:** research findings are mostly given for free; one report reveals the decisive fact cheaply.
- **Standard:** player must buy reports to disambiguate; payoff shape is a plain "standard" or "sleeper."
- **Hard:** symmetric framing is tight, reports are expensive relative to bankroll, and the round uses `twoWinners` or `allDuds` so naive "bet on the obvious one" play loses money.

---

## 6. Expertise question — rewrite standard

Bad (current): the correct option restates the winner's thesis, so answering it correctly requires no independent knowledge.

Good: the question isolates a transferable investing/scientific principle that applies across rounds, and the wrong answers are plausible mistakes. Example pattern:
> *"You bought only the market report and it was bullish on all three. What is the strongest reason that is NOT sufficient to concentrate your bet?"*
> — with distractors that are each a real, tempting fallacy.

The player should be able to pick the winning innovation and still miss the expertise question, and vice versa.

---

## 7. ONR / naval relevance (decision needed)

The current 50 rounds are general history-of-innovation (Tesla, Edison, Bell Labs, Xerox PARC, dyes, plastics). The rest of RECKON is naval-relevant science. **Decide explicitly:**
- Option A — keep it general (it's the portfolio's "history of technology" game). Fine, but label it as such.
- Option B — re-theme toward naval/ONR domains (undersea sensing, propulsion, materials, navigation, cryptography, space weather) so it matches the collection's mission.

State the choice in `gameConfig.designNote` so it's intentional, not accidental.

---

## 8. Deliverable

A single self-contained `future_portfolio_game_library.html` (all CSS/JS inline, no external assets — it is served as a static file on GitHub Pages), that:
- Preserves the 50-round data-driven structure and the concealment device.
- Implements variable payoff shapes, paid research, hold-cash, and calibration-aware scoring.
- Passes the §4 anti-giveaway checklist on every round.
- Uses the editorial design tokens in §2 / Problem 6, with working light and dark modes and no gradients, glass, or neon.

Keep everything inline and dependency-free so it drops straight into the repo and deep-links from the RECKON showcase.
