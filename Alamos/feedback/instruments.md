# Meridian (`instruments`) — play-through review

*Theme `instruments` · the format harness, not a course · 11 days, 33 stops, 33 distinct formats · reviewed 2026-08-21 by reading the full book (`books/instruments.yml`), working every panel, and reading opening, stakes, warm-ups and ending in play order.*

## Verdict

This is the reference book — the one `tools/BOOK_TEMPLATE.md` sends every new author to read, and the only place five formats are authored at all. It should be judged on two things: does it cover the registry, and does its own documentation tell the truth about itself. It covers 33 formats, which is more than any real campaign, and **its header and opening card describe a book that stopped existing three generations ago.**

The fiction is well chosen for what it has to do. The Meridian Verification Office checks other people's measurements, so every instrument in the engine is something somebody there does on an ordinary Tuesday: a TRACE on four channels sharing one denominator, an ATTEST on a signature and the thing it stands for, a DELEGATE where the loudest is not the first, a SPOT where the board changes its mind. That framing is why a harness reads as a place rather than a test page, and it is the right design.

Six stop titles are as good as anything in the shipped games. **"A confirmed impact is not a confirmed deflection"** (VERIFY). **"Best at the nominal, and nowhere else"** (STRESS). **"A pattern is not an outlier"** (RESIDUAL). **"Moving the dot and moving the cloud"** (CLOUD). **"You stopped driving. You did not stop"** (FLY). **"The exponent is not the whole story"** (PROPAGATE). Each of those is the format's own moral in one line, and a new author reading this book gets the register for free.

**Answerable:** 33/33.
**Coverage:** 33 of the engine's formats. **Eleven are absent** (IN-01), one of which the documentation says is here.
**Level:** Not applicable — no audience grade, no course.
**Fun:** Beside the point, but the office is a better invented place than it needed to be.

## Implemented since this review

- **IN-01**, the stale counts. The header no longer states a number at all (it said "the 12 FORMATS … over four days" while the book held 33 over eleven) and the opening card no longer says "the twenty-eight".
- **IN-02, half of it.** The header now lists the ten formats that are deliberately authored in the real games, and records that STACK cannot carry even a commented fixture — the importer refuses one at both ends while it is suspended, so lifting the suspension means authoring from scratch. That is worth knowing and it is not fixable from here.

Everything else in the findings table below is unchanged, and `npm run check` is green on this theme.

## Findings

| ID | Sev | Where | Issue | Proposed fix |
| --- | --- | --- | --- | --- |
| IN-01 | CLOSED | The book's own header, and the `opening:` card | **Both describe a twelve-format book over four days. The book is thirty-three formats over eleven days.** The header reads: *"THIS BOOK IS THE WORKED EXAMPLE OF THE 12 FORMATS IN `FORMATS.md`. One stop each, over four days… so every 1 of the 12 is something somebody there does on an ordinary Tuesday."* The opening card reads: *"Four days hold one stop of every question format the engine can draw… every one of the twenty-eight is authored in the same book format a real game uses."* Three stale numbers (12, four days, twenty-eight), one numeral-normalisation casualty (*"every 1 of the 12"*), and one claim that is simply false — it is not one stop of every format the engine can draw. This matters more here than in any campaign, because the header is the document new authors are instructed to read before writing a book. | Rewrite both. The header should say what it now is: one stop of every format in the instrument registry, eleven days, and the reason each stop is the *minimum* that clears its own importer trap. The opening card should say which formats are deliberately not here and where they are instead (IN-02). And **the counts should not be written as counts** — they have gone stale three times. "One stop of every format in `INSTRUMENTS`" cannot go stale; "the twenty-eight" already has. |
| IN-02 | DECISION | Format coverage | **Eleven formats are absent from the bank**: SEQUENCE, BALLPARK, DIAGNOSIS, CASEBOOK, TRIAGE, SCIENCETANK, SWEEP, HOLDOUT, TALLY, PROBE and STACK. The first six are the pre-registry formats and the next four live in `questionUI.js` — so the omission is defensible and probably deliberate, since those ten are authored in most real games and are harvested by `lessonGallery` from there. **STACK is not defensible.** CLAUDE.md states: *"`books/instruments.yml` keeps its STACK stop commented rather than deleted, because deleting it would mean rewriting the bank to lift the suspension."* I searched case-insensitively: **there is no STACK stop in the book, commented or otherwise.** So the thing that was supposed to make lifting the suspension a one-line change now requires authoring a STACK stop from scratch — which is exactly the outcome the comment was written to prevent. | Two parts. **(a)** Author the STACK stop and comment it out, which restores the property CLAUDE.md claims and makes the suspension a one-line decision again. It also needs to be there for `npm run traps`, which currently skips its four cases out loud. **(b)** Say in the header which ten formats are elsewhere and why, so the next person does not read "every format the engine can draw" and conclude the registry is complete. A one-line list is enough. |
| IN-03 | WORTH | Day 9, "When the instruction changes under you" | Two stops (SPOT and LOB) against three everywhere else, and day 7 carries four. `dayCalls` and `validateContent` both pass. In a harness a short day costs nothing functionally — but it is the reference book, and a new author counting stops per day gets an inconsistent example. | Move one of day 7's four to day 9. Day 7 is "Down there without the lights" and carries ROUTE, a CHOICE, a PROTOCOL and a DERIVE; the CHOICE is the least tied to the day's fiction and the most portable. |
| IN-04 | WORTH | `ending:` | Two paragraphs where every campaign has three, and no cost or unfinished business. Correct for a harness — there is nothing to be unfinished. But the second paragraph is doing something better than it looks: *"you drove each panel to a number you could defend, and you stopped when the evidence stopped rather than when the form was full. That is the habit the whole bank is here to build."* That is the best one-sentence statement of what this whole catalogue is for, and it is in the book nobody plays. | Nothing to fix here. **Steal that sentence.** It belongs in `FORMATS.md` or `BOOK_TEMPLATE.md` as the standard every instrument stop is written against. |
| IN-05 | WORTH | Days 10 and 11 | The six world-graded formats (GREET, FOLLOW, HUNT, CANVASS, EVADE, TAG) are authored here as **mission stops**, and the book also carries a full `warmups:` block. That is correct and worth recording as deliberate — the formats need a card that can be opened from a day, because reaching them through a warm-up means playing to the right morning. But a new author reading this book will see the six formats in two places with two different shapes and no comment saying which is which. | One comment above day 10. "These six are the world-graded formats. In a real game they run as warm-ups (see `warmups:` below); they are authored as stops here so `instruments.html` can open one without playing to the morning that holds it." |
| IN-06 | TASTE | Naming | The theme's `title` is "Meridian" and its `id` is `instruments`, and CLAUDE.md records that it had been titled "Template" since scaffolding until `lessonGallery` found it. Recording that the current name is good and the mismatch between id and title is now the only confusing thing about it — a person looking for the format bank searches for "instruments" and a person who has played it remembers "Meridian". | Leave it. The id is load-bearing (save keys, `themes.json`, every `THEME=` command) and the title is better prose. Worth one line in `FORMATS.md` saying they are the same thing. |
| IN-07 | TASTE | One stop with no authored `background` | Thirty-three stops carry a `guide`; thirty-two carry an authored `background`. Six repeated paragraphs total, which is the second-cleanest in the corpus after Yellow Bay's zero. | Close the one gap. In the reference book, a stop missing a block is a stop a new author will copy. |

## What the bank covers, day by day

- **Day 1** — TRACE, BALANCE, ATTEST. The three "the record is not the condition" formats together, which is the right opening for an office that checks other people's work.
- **Day 2** — VALUE, CONTROL, DEGENERACY. *"A cause, and a coincidence that looks like one"* and *"Any size you like, for the right albedo"* — the second is the cleanest statement of a degenerate family in the repo.
- **Day 3** — CHAIN, ALLOCATE, TRIANGULATE. "What 20 bottles cannot ask" is a finite pool whose limit is the question rather than the money.
- **Day 4** — CLOUD, VERIFY, TRIGGER. The CLOUD title carries the format's whole moral.
- **Day 5** — PROPAGATE, STRESS, RESIDUAL. The three "which number is carrying the error" formats. Best-grouped day in the bank.
- **Day 6** — DELEGATE, FLY, INJECT. *"More detections, the same amount of notice"* is the INJECT format's point exactly.
- **Day 7** — ROUTE, CHOICE, PROTOCOL, DERIVE. Four stops (IN-03).
- **Day 8** — BELT, TRIAL, HOLD. The three arcade formats where speed is the pressure and accuracy is the grade.
- **Day 9** — SPOT, LOB. Two stops (IN-03).
- **Days 10–11** — GREET, FOLLOW, HUNT, CANVASS, EVADE, TAG. The six world-graded formats (IN-05).

## Opening and closing

Opening: honest about being a harness, which is right — *"You are whoever is checking that they all still work after a change to the engine."* Its three stale numbers are IN-01.

Closing: two paragraphs, and the second contains the sentence this catalogue should be measured against (IN-04).

## Warm-ups

All seven authored, and `warmupOrder` passes on an eleven-day campaign, which is the tightest schedule in the set after Slack Water's twelve. No findings.

## What to keep

- The office. A place invented so that every instrument is somebody's ordinary Tuesday.
- Six titles that are their format's moral: *a confirmed impact is not a confirmed deflection*; *best at the nominal, and nowhere else*; *a pattern is not an outlier*; *moving the dot and moving the cloud*; *you stopped driving, you did not stop*; *the exponent is not the whole story*.
- Every stop being the minimum that clears its own importer trap. That is what makes this a reference rather than a showcase.
- "You stopped when the evidence stopped rather than when the form was full."
