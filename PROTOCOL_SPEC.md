# PROTOCOL — Spec for a RECKON Game

This describes how to author **Protocol** so it drops into the RECKON puzzle suite
cleanly. Follow the data schema, the fairness rules, and the integration contract
exactly. Output should be a single self-contained `protocol.html` plus the mission
data — no external libraries, no build step, no frameworks.

---

## 1. What Protocol is

A daily "operations" matching puzzle. Each **mission** is an ordered timeline of
**events** (steps in a real procedure). The player assigns the correct **instrument/
system card** to each step from a shared pool that contains a few **decoys**. The
skill being taught: telling *similar* tools apart by their real operating constraints
(range, scale, signal type, energy geometry, engagement phase, destructive vs.
non-destructive, etc.). Three attempts; correct placements lock; a solution +
takeaway is revealed at the end.

---

## 2. Data model (author to this schema EXACTLY)

```js
const puzzles = [
  {
    id: "surgery",                       // kebab-case, unique, stable (used in URL + rotation)
    title: "Repair Under Pressure",      // short mission name
    domain: "Laparoscopic surgery · Instruments · Imaging",  // "A · B · C"
    mission: "One–two sentence framing of the situation and the player's job.",
    briefing: [                          // 3–4 bullets of CONSTRAINTS that drive answers
      "A concrete constraint (numbers where possible).",
      "Another constraint that disambiguates a later step.",
      "..."
    ],
    takeaway: "One sentence stating the transferable lesson of the whole mission.",
    events: [                            // ordered steps; 6–8 per mission (7 is the norm)
      {
        title: "Short imperative step name",
        text: "2–3 sentences describing the step. MUST contain the cues that make exactly one card correct.",
        answer: "cardId",                // id of the correct card
        why: "One sentence explaining why that card fits — shown on the solution screen."
      }
      // ... one object per step
    ],
    cards: [                             // pool = (# events) + EXACTLY 3 decoys
      {
        id: "cardId",                    // kebab/camel, unique within the mission
        name: "Human-readable instrument name",
        spec: "2–3 sentences describing the capability in CONSTRAINT terms (the 'key' that matches an event's 'lock')."
      }
      // ... every event's answer + 3 decoys
    ]
  }
  // ... more missions
];
```

**Hard rules on the data:**
- `cards.length === events.length + 3`. Exactly three decoys per mission.
- Every event's `answer` must be a real `card.id` in that mission.
- Every non-decoy card is the answer to **exactly one** event (1:1).
- The three decoys must be the answer to **no** event.

---

## 3. Content authoring rules (this is what makes it fair and educational)

1. **Uniqueness — the #1 rule.** For each event, exactly ONE card can satisfy it.
   Before finalizing, check every *other* card against that event and confirm each is
   excluded by a stated cue. If two cards both plausibly fit, rewrite the event text
   or a card spec until only one wins.
2. **Robust cues, not a single keyword.** Give each event **two independent
   disambiguating cues** (e.g., *signal type* AND *range*, or *scale* AND
   *destructive-vs-not*). A careful reader should never feel their rejected pick was
   "also right." (Current weak spots to avoid: perfusion-camera vs. Doppler-ultrasound,
   phased-radar vs. IRST, Raman vs. elemental spectrometer — each currently hinges on
   one word.)
3. **Decoys are teaching devices.** Each decoy must be *thematically plausible* but
   clearly wrong for a stated reason — ideally it looks right for one step until a
   single cue rules it out (e.g., an infrared decoy when the seeker is *active radar*).
4. **Operational order.** Events must read as a real chronological/operational
   sequence, not a random set.
5. **Scientific accuracy is non-negotiable.** Real instruments/systems, correct
   specs, plausible real-world numbers. No invented capabilities. A domain expert
   should find no errors.
6. **Difficulty.** Solvable by a science-literate *non-specialist* purely from the
   event text + card specs. No insider-only knowledge required, but reward close
   reading.
7. **Voice.** Neutral, editorial, concise. No hype, no exclamation marks, no
   "cutting-edge." Match the tone of the existing missions.
8. **Domain variety across missions.** e.g., medicine, naval/EW, spaceflight,
   aviation, cybersecurity/incident response, power grid, wildfire/disaster response,
   lab chemistry, structural inspection, water treatment, telecom, forensics.

**Volume:** Protocol is a *daily* game with a 14-day archive. It needs **at least 14
missions, ideally 20+**, so the archive never repeats. (For comparison: the other
RECKON games have 10–61 each.) Deliver as many well-vetted missions as possible.

---

## 4. Gameplay mechanics

- 3 attempts. Submit is enabled only when every step has a card.
- On submit: each step whose card matches its `answer` **locks** (permanent, green);
  wrong non-locked steps are flagged (red) but stay on the board to be replaced.
- Win = all steps locked within 3 attempts. Loss = attempts hit 0 → reveal the full
  correct protocol, then show the solution + takeaway.
- Tap-to-place (tap a card, tap a slot) AND drag must both work.

---

## 5. Scoring (needed so it feeds the RECKON stats board)

Score each step by the attempt on which it first locked:

```
per-step points: locked on attempt 1 = 3, attempt 2 = 2, attempt 3 = 1, never (revealed) = 0
score = sum of per-step points          // max = 3 × (number of events)
won   = (all steps locked within 3 attempts)
rank  = score === maxScore ? "FLAWLESS" : won ? "COMPLETED" : "REVIEWED"
```

---

## 6. RECKON integration contract (every game implements these)

1. **Include the shared reporter** near the end of `<body>`:
   `<script src="reckon-results.js"></script>`
   It exposes `reckonStart(id)` and `reckonReport({...})` and safely no-ops on the
   static site (no backend).
2. **Call `reckonStart(missionId)`** when a mission begins (starts the solve timer).
3. **Call `reckonReport(...)` once** when the mission ends (win or loss):
   ```js
   reckonReport({
     game: "Protocol",            // EXACT string — must match the hub
     gameId: mission.id,
     gameTitle: mission.title,
     won: won,                    // boolean
     score: score,                // from §5
     solveSeconds: elapsedSeconds,
     rank: rank                   // from §5
   });
   ```
4. **Home link.** Put a "← RECKON" link in the header that goes to `reckon.html`
   (relative link, no leading slash): `<a href="reckon.html">← RECKON</a>`.
5. **Sign-in gate.** No auth code in the page — the server gate handles it. Just make
   sure API-less behavior degrades gracefully (reckon-results.js already does this).

---

## 7. Daily rotation + deep-linking (replace the manual dropdown)

Use the same client-side date math as the other games:

```js
const START = Date.UTC(2026, 6, 1);      // fixed epoch — do not change
const DAY = 86400000;
const dayIndex = () => Math.floor((Date.now() - START) / DAY);
const mod = (n, m) => ((n % m) + m) % m;
```

On load:
- Read `location.hash` (e.g. `protocol.html#naval`). If it names a mission id, load
  that mission (this is how the hub links to today's puzzle and to archive days).
- Otherwise load **today's**: `puzzles[mod(dayIndex(), puzzles.length)]`.

The hub itself renders "today" and the previous 14 days as `protocol.html#<id>` links,
so the page only needs to honor the hash. Keep a mission picker if you like, but it is
optional once rotation works.

---

## 8. Hub registration (values to supply; wiring done separately in reckon.html)

Provide, for each mission, a row of `[id, title, domain]`. These become the hub's
rotation/archive list, in this shape:

```js
"Protocol": {
  "link": "protocol.html#",
  "fileLink": false,
  "cases": [
    ["surgery", "Repair Under Pressure", "Laparoscopic surgery"],
    ["naval",   "Contact in the Strait", "Naval sensors & EW"],
    ["mars",    "Cache at Red Basin",    "Planetary science"]
    // ...one row per mission, same order as the puzzles array
  ]
}
```

Protocol slots into the hub's alphabetical order between **Diagnosis** and **Science
Tank**. (A logo tile/color and its position in `reckon.html` will be added on the repo
side — you don't need to produce SVG art.)

---

## 9. Mobile / touch requirement

Do **not** use the HTML5 Drag-and-Drop API (`draggable`, `dragstart`, `drop`,
`dataTransfer`) — it does not fire from touch on phones. Implement drag with **Pointer
Events** so mouse, touch, and stylus all work with one code path:
- `pointerdown` on a card → begin drag after a small movement threshold; show a
  floating "ghost" that follows the pointer.
- `pointermove` → move the ghost; `document.elementFromPoint(x, y)` to find the slot
  under the pointer.
- `pointerup` → drop into that slot; `pointercancel` → abort.
- CSS: `touch-action: none` on draggable cards (stops the page scrolling mid-drag).
- Keep tap-to-place (tap card, tap slot) as the reliable fallback.
- On mobile, the card pool must **wrap** so every card is visible (no fixed-width or
  horizontal-scroll strip that hides cards).

---

## 10. Bugs in the current build to fix

1. **How-to text is wrong:** it says "Four of the fourteen cards are decoys." It's
   10 cards / 3 decoys. Derive these counts *from the data* so they can never drift:
   e.g. `${cards.length} cards, 3 of them decoys`.
2. **Contradiction:** the how-to says wrong cards "return to the pool," but they stay
   on the board (red) until replaced. Make the text match the behavior.
3. **Drag is mouse-only** (see §9).
4. **No RECKON wiring** — no home link, no reckonReport, no daily rotation (see §§6–7).
5. **No persistence/score** — add scoring (§5) and report it (§6).

---

## 11. Deliverables to return

1. A single self-contained **`protocol.html`** implementing §§4–9 (pointer drag, daily
   rotation + hash deep-link, reckon-results.js hook, ← RECKON link, scoring).
2. The **`puzzles` array** with **≥14 missions** meeting §§2–3.
3. The **hub `cases` rows** (§8) matching the puzzles order.
