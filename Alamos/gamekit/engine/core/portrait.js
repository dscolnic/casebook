// portrait.js — a face for the person who is asking.
//
// Lifted out of questionUI.js unchanged, for one reason: `beats.js` needs the
// same face on a speech bubble, and it must stay loadable in node — it has a
// selftest, and questionUI reaches the theme, the state and the DOM on import.
// One definition, imported by both, because two copies of one drawing drift the
// first time either is corrected.
import { esc } from './utils.js';

/**
 * A portrait, drawn from the person's own id.
 *
 * It was a rounded square with the first letter of their name in it, which is
 * a placeholder, and it sat next to three lines of metadata that mattered to
 * nobody. The person asking is the one part of this panel that should look
 * like something: a bust in their group's colour, with skin, hair and build
 * varied by a hash of their id so the same person is the same face every time.
 *
 * Deliberately flat and geometric — the same language as the rigs walking
 * around outside, not an attempt at a photograph.
 */
const SKINS = ['#f0c9a4', '#e0ab7d', '#c78a5c', '#a2663d', '#7d4b2a', '#5c3720'];
const HAIRS = ['#2b2119', '#4a3526', '#6f5137', '#8d7a5f', '#b8b2a8', '#3a2f2a'];
function hashOf(str){
  let n = 0;
  for(const c of String(str || '?')) n = (n * 31 + c.charCodeAt(0)) >>> 0;
  return n;
}
export function portraitSvg(person, accent){
  const h = hashOf(person?.id || person?.name);
  // Unsigned shifts throughout. `hashOf` returns a full 32-bit value, and a
  // signed `>>` on anything above 2^31 goes negative — which indexes a style
  // array at -1 and puts the literal text "undefined" in the middle of the
  // portrait, for about half of all ids.
  const skin = SKINS[h % SKINS.length];
  const hair = HAIRS[(h >>> 3) % HAIRS.length];
  const col = accent || person?.color || '#3b566b';
  const style = (h >>> 6) % 4;                     // cropped, swept, tied back, bald
  const glasses = ((h >>> 9) % 4) === 0;
  const W = 132, H = 148, cx = W / 2, cy = 58;
  const rx = 25, ry = 29;
  const hairShape = [
    // cropped: a close cap that stops above the brow
    `<path d="M${cx - rx - 1} ${cy - 6} q1-27 ${rx + 1}-27 q${rx} 0 ${rx + 1} 27 q-7-13-${rx + 1}-13 q-19 0-${rx + 1} 13z" fill="${hair}"/>`,
    // swept: a side parting with a fringe across one side
    `<path d="M${cx - rx - 1} ${cy - 4} q0-29 ${rx + 2}-29 q${rx} 0 ${rx}-27 q6 30-14 32 q-16 2-24 10 q-4 4-5 14z" fill="${hair}"/>`,
    // tied back: cap plus a bun behind
    `<path d="M${cx - rx - 1} ${cy - 6} q1-27 ${rx + 1}-27 q${rx} 0 ${rx + 1} 27 q-7-13-${rx + 1}-13 q-19 0-${rx + 1} 13z" fill="${hair}"/>`
      + `<circle cx="${cx + rx + 3}" cy="${cy - 6}" r="8" fill="${hair}"/>`,
    // bald: a trim at the temples only
    `<path d="M${cx - rx - 1} ${cy + 2} q2-14 8-18 q-3 9-2 18z M${cx + rx + 1} ${cy + 2} q-2-14-8-18 q3 9 2 18z" fill="${hair}"/>`,
  ][style];
  return `<svg class="portrait" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(person?.name || 'portrait')}">`
    + `<defs><clipPath id="pc${h}"><rect x="0" y="0" width="${W}" height="${H}" rx="12"/></clipPath></defs>`
    + `<g clip-path="url(#pc${h})">`
    + `<rect width="${W}" height="${H}" fill="#efece3"/>`
    + `<circle cx="${cx}" cy="${cy + 4}" r="50" fill="${col}" opacity="0.14"/>`
    // shoulders and collar, in the group's colour: the uniform reads first
    + `<path d="M4 ${H} q0-40 34-52 l22-7 h12 l22 7 q34 12 34 52 z" fill="${col}"/>`
    + `<path d="M${cx - 15} ${H - 59} l15 21 15-21 l-7-5h-16z" fill="#f7f5ef"/>`
    + `<rect x="${cx + 21}" y="${H - 32}" width="15" height="4" rx="2" fill="#f0e2b8"/>`
    + `<rect x="${cx + 21}" y="${H - 24}" width="15" height="4" rx="2" fill="#f0e2b8"/>`
    // neck, ears, head
    + `<rect x="${cx - 10}" y="${cy + 18}" width="20" height="22" rx="8" fill="${skin}"/>`
    + `<ellipse cx="${cx - rx}" cy="${cy + 4}" rx="4" ry="6" fill="${skin}"/>`
    + `<ellipse cx="${cx + rx}" cy="${cy + 4}" rx="4" ry="6" fill="${skin}"/>`
    + `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${skin}"/>`
    + hairShape
    + (glasses
      ? `<g fill="none" stroke="#33302b" stroke-width="1.6"><circle cx="${cx - 9}" cy="${cy + 2}" r="6.4"/>`
        + `<circle cx="${cx + 9}" cy="${cy + 2}" r="6.4"/><path d="M${cx - 2.6} ${cy + 2}h5.2"/></g>`
      : `<ellipse cx="${cx - 9}" cy="${cy + 2}" rx="2" ry="2.4" fill="#2a221c"/>`
        + `<ellipse cx="${cx + 9}" cy="${cy + 2}" rx="2" ry="2.4" fill="#2a221c"/>`)
    + `<path d="M${cx - 13} ${cy - 5} q5-3 10-1 M${cx + 3} ${cy - 6} q5-2 10 1" stroke="${hair}" stroke-width="2" fill="none" stroke-linecap="round"/>`
    + `<path d="M${cx - 6} ${cy + 15} q6 4 12 0" stroke="#9c6549" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
    + `</g></svg>`;
}
