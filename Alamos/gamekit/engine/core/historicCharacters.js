// historicCharacters.js — the roster the player can talk to, and the optional
// between-mission funding requests. See engine/core/theme.js.
//
// simulation.js derives CHARACTER_DIVISION and PERSONS_BY_DIVISION from this
// list, so a person's `division` is what ties them to an area.
import { CONTENT } from './theme.js';

export const HISTORIC_CHARACTERS = CONTENT.ROSTER ?? [];
export const SPECIAL_REQUESTS = CONTENT.SPECIAL_REQUESTS ?? {};
