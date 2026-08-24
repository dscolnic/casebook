// plainBar.mjs — the two numbers the tagline is measured against.
//
// "Hard concepts explained for sixth graders." Two files ask that question of
// different halves of a campaign: `plainCards.mjs` reads the opening card and
// each day's stake, `plainQuestions.mjs` reads every stop's card. Both need the
// same bar, and **two copies of one rule drift the first time either is
// corrected** — so the numbers live here and nowhere else.
//
// This module holds constants and nothing else, deliberately. `plainCards.mjs`
// runs a checker at import time, so anything importing it for a number inherits
// its argv handling and its process.exit — which is how the first version of
// `plainQuestions --selftest` ran plainCards' selftest instead of its own.

/** The tagline is grade 6. The half-grade of slack is for proper nouns. */
export const BAR = 6.5;

/**
 * A card read standing still gets no 28-word sentences.
 *
 * This is the number that moves a pass. Red Sand went from 7.39 to 5.84 on
 * sentence splitting alone — no term deleted, no gloss removed, no mechanism
 * cut — after six of its first seventeen rewritten cards came out HARDER than
 * they went in, all from teacher voice written as long sentences.
 */
export const LONGEST = 28;
