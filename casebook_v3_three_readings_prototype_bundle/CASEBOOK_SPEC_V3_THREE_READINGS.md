# Casebook V3 Prototype — Three Informants, Three Readings

This prototype replaces the 9-reading / 5-day structure with a shorter fixed loop.

## Player loop

1. The case presents three informants.
2. Each informant owns exactly one real scientist passage.
3. Each passage has exactly three questions.
4. Every question has one attached clue. The clue is revealed only for the `expert` answer.
5. Within every passage, the three clues cover one `who`, one `what`, and one `where`.
6. Across the whole case there are nine possible clues: three per category.
7. The player may accuse early, but reading all three passages gives the fullest explanation.

## Design goal

A wrong answer costs knowledge, not an entire encounter. Even a player who gets one or two questions right leaves an informant with useful case information. The nine clues should be individually indirect, anchored to the scientist passage, and collectively reconstruct the event.

## Core schema changes

- `schemaVersion: 3`
- `mode: "three_informants_three_readings"`
- `DAYS_TOTAL: 3`
- Remove travel, places-as-encounters, edges, and the 3×3 topic map.
- `CHARACTERS[character].reading` points to one entry in `TOPICS`.
- `READING_ORDER` lists the three informants.
- Exactly three `TOPICS` entries.
- Exactly three questions per topic.
- Each question adds:

```js
clue:{
  category:"who|what|where",
  label:"WHO clue|WHAT clue|WHERE clue",
  text:"Case-specific clue shown only after an expert answer."
}
```

## Content constraints

- Each scientist profile remains a substantive, person-centered passage.
- Each question must test something actually taught in that passage.
- Each clue must use the passage's concept or vocabulary rather than arriving as unrelated testimony.
- Every passage must offer one clue in each category.
- No single clue should name the full solution outright.
- The three clues in a category should become increasingly decisive when read together.
- The full nine-clue set should explain the causal chain, not merely identify three labels.

## Engine behavior

- Show three informant cards at the hub.
- Mark an informant complete after their passage is attempted.
- On an expert answer: show feedback, then animate the attached clue into the relevant notebook column.
- On any other answer: show feedback and a locked-clue marker.
- Do not permit retries within the same playthrough.
- Keep the notebook openable at any time.
- Unlock accusation immediately, with a stronger visual prompt after all three informants are complete.
