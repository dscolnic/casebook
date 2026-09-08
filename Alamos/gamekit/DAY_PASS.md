# DAY_PASS — the sol-291 rules

Everything learned rewriting Red Sand's first day, as rules. Worked instance is
`redsand` sol 291: three questions, one room, a 30-word stake and three
one-line objectives. Read with `alamos-accessibility` (the card's reading level)
and `PLACEMENT_PASS.md` (where a question is asked).

Nothing here is a preference. Every rule below is a defect that shipped.

## A. The card's prose

**A1. Open on a person and what they want to do.** Never on an object, never on
a definition. `The bed is the tray of catalyst where the reaction happens.` was
a card opening on vocabulary; `Sundqvist, the plant production lead, wants the
bed run 40 K hotter tonight` opens on somebody's intention, which is what makes
the card a decision rather than a fact.

**A2. A gloss rides inside the sentence.** An appositive or a relative clause,
never a sentence of its own. `the bed, the tray of catalyst where methane is
made,` not `The bed is the tray of catalyst. Sundqvist wants it…`

**A3. A gloss says what a thing is FOR.** `the pipe that chills the gas until
the methane turns liquid`, not `one long pipe that keeps getting colder`. The
second is true and tells the reader nothing about why the pipe exists.

**A4. State a change as a change, in the unit the question uses.** `40 K hotter`,
not `at 593 K, up from 553` with the subtraction left to the reader. Absolute
values nothing downstream needs come out.

**A5. Vary the guide's opening frame.** `You know that…`, `Recall that…`,
`Start from…`. Three cards running on one frame reads as a template.

**A6. Fold parallel definitions into one sentence — until 28 words.** `two
different things: its rate, and its yield` then a short sentence defining each.
Folding the definitions in as well made a 34-word sentence, and the length cap
is gated.

**A7. Cut meta-commentary.** Nothing about the question. No `it is easy to run
them together`, no `read each answer and ask whether…`, no counting the wrong
options. Over-scaffolding reads as a trick.

**A8. Scene, guide and question are one address.** Read them in sequence; no
fact appears twice. ONE exception: `conceptVisible` requires the concept's own
term in the stem or an option, so the term may appear in both the guide and the
question. Nothing else may.

**A9. A proposal gets a conditional question.** `If the bed is run 40 K
hotter, …what happens?` — the card is about something somebody wants, not
something that happened.

## A10. One question, one concept — and it has to be in the answer

**A card names exactly one concept, and the reasoning that reaches the key IS
that concept.** Not adjacent to it, not implied by it. The test is mechanical:

> Cover the concept line. Read the verdict. Ask which concept it argues from.
> If that is not the one on the card, the card is filed wrong — or written wrong.

`Getting water out of frozen ground` failed it. Filed under *Solutions: what
dissolves out of frozen ground, and what each solute fouls*, it is a four-step
ordering whose order is fixed entirely by PHASE — water has no liquid range at
six millibars, so the plant has to manufacture liquid before the step that needs
liquid. Nothing in the answer turns on what dissolves. A student could order all
four correctly having learned nothing about solutions, and the card that really
teaches concept 29 is the next one, *What comes with the water*.

Two consequences:

- **Every element supports the one concept.** Guide, cards or options, verdict,
  background. A background paragraph that teaches a second concept belongs to the
  card that owns that concept — the ion-exchange *capacity* argument is
  concept 31's, and it was sitting in this card's background.
- **A card that needs two concepts to answer it is two cards, or the wrong
  concept.** `conceptVisible` only checks the term is NAMED somewhere on the
  card; naming is not using, and nothing gates the difference.

## B. Register

**B1. No metaphor as a handle.** `sticky`, `tug-of-war`, `the rope`, `downhill`,
`the sponge fills up` were all read back as *more confusing than helpful*. Say
the mechanism: *the molecules of a gas attract one another; that attraction is
called an intermolecular force*.

**B2. Name a principle and then state it.** Naming alone is the defect. `Le
Châtelier's principle: if a system at equilibrium is disturbed, the equilibrium
shifts in the direction that partly opposes the disturbance.` Name, colon,
statement — and say which disturbances count.

**B3. `background` is a textbook, not a narrative.** A concept heading, a colon,
then declarative sentences carrying the real vocabulary — activation energy and
Ea, the Arrhenius relationship, hydrogen bonding against dispersion forces,
deposition, Q and K. Not `Why a clogged pipe is sneaky.` It sits behind a fold,
so it is where depth goes; the face stays plain.

**B4. No em-dashes in player-facing text.** Comma, colon or full stop. Where the
gloss has to be machine-detectable, `checkJargon.definedInPlace` accepts `:`,
`, which`, `, that`, ` is `, ` are `, ` means ` — a bare comma is NOT accepted,
so `900 ppm, which is 900 parts in every million`.

**B5. One scale per quantity, campaign-wide, named on every number.** Red Sand
is kelvin. Seven sites mixed bare `degrees`, `°C` and `K`, including a card whose
scene said `minus 40` while its own verdict said `−40 °C`. Deltas name the scale
too: `40 K hotter`.

## C. Shape, and the gates that enforce it

| | |
| --- | --- |
| `scene` | 30–45 words, situation only |
| `guide` | ≤130 words, hard-failed by the importer. It is the only teaching the player cannot skip, so it holds the concept — not the detail |
| `background` | behind a fold, opt-in, textbook |
| `why` | 70–90 words of mechanism |
| any sentence | **28 words**, gated by `plainQuestions`, may not rise |

Two ways the 28-word cap is reached without noticing: a **colon after a
background heading** merges the heading into the sentence, and a **semicolon
does not end a sentence** as far as the checker is concerned.

## D. The day

**D1. One place per day, where the objects honestly co-exist.** Sol 291 works
because the bed, the loop and the cold line take-off are one gas path behind one
door. It is not licence to put unrelated questions in one room: where a day has
no honest single room, two is better than a lie.

**D2. The place is named once, in the stake.** ~30 words. `Everything today is
in the Reactor Hall, where you find what is holding the plant back.`

**D3. Objectives are one line each, and the line is the work.** What the player
has to work out, high-level, no destination, no jargon the card has not
introduced, no second reason line. Authored as **`call:`** on the stop, which
leaves **`task:`** free to be the question stem.

Bad: `Work out what four changes to the loop do to the methane` — names four
things it does not list, and `loop` is undefined here.
Good: `Work out what actually sets how much methane the reactor makes`.

**D4. The day's person stop is somebody whose division is that place.** Authored
`person: true`. Left alone `shapeMissions` takes the middle call, which on sol
291 was Sundqvist — fifty metres away outside Catalyst Bay.

**D5. Every open call in the room gets its own object**, and the fixture caption
says what it is for.

## E. Engine invariants this pass established

- **`at:` may name a fixture in another area.** The stop is then *sited* there.
  One rule, `engine/world/siting.js`, imported by the engine and by
  `placement.mjs`. It was three copies, and the third — `place.js`, matching
  `b.enter` only — printed "Go to Catalyst Bay" for a question answered in the
  Reactor Hall.
- **`person: true` is honoured** unless the format is one the player *operates*.
  It was dropped twice: the importer never emitted the key, and `shapeMissions`
  overwrote it. Twelve books author it on ~53 stops and none had ever taken
  effect.
- **A room builds every open call's fixture**, not the first. `room.fixtures`.
- **A sited call names its OBJECT in the HUD**, not its building, or a day in one
  place prints the same instruction three times.

## F. What this pass broke, and has not fixed

**959 `reason:` strings across the books now render nowhere** — 45 of them Red
Sand's — because D3 took the second line off the objective row. `fieldCoverage`
reports "every authored sentence reaches a screen" and passes, because it reads
lesson fields and not mission-stop fields. Either they get a new home or they
come out of the books.
