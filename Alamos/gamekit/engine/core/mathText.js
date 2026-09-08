// mathText.js — the books' plain-text maths, set as maths.
//
// WHAT THIS IS FOR. A calculus game asks "Build the derivation for
// lim_(h->0) [sqrt(16+h)-4]/h", and that is what the player reads: an ASCII
// transcription of a limit, on a card, in a game about limits. The notation is
// the subject. Headwater alone carries 587 of these tokens and every campaign
// with an equation in it carries some.
//
// AND IT IS A PRESENTATION LAYER, DELIBERATELY. Nothing here edits a book. The
// bible writes `sqrt(16+h)`, the book stores `sqrt(16+h)`, every checker still
// reads `sqrt(16+h)`, and only the pixels change — which is the only way this
// could be applied to 36 campaigns at once without becoming 36 content passes,
// and the only version of it that keeps "no content that is not from the bible"
// true.
//
// WHY NOT LaTeX. The books are not written in it, and a renderer for it is a
// dependency plus fonts plus a build change, for the eleven `lim_` in the repo.
// What the shipped games already write — `Q₀`, `·`, `u^(−1)`, `H^(3/2)` — is a
// house dialect one step short of typeset maths, and this finishes the step.
// If a course ever needs a stacked fraction or a matrix, that is the moment to
// have this conversation again; a slash is how the shipped games write every
// quotient today and it reads correctly at card size.
//
// THE RULE THAT KEEPS IT SAFE: every pattern here has to be one that CANNOT
// fire in an English sentence. `^` never appears in prose. `sqrt(` never
// appears in prose. A bare `pi` does — "the pi chart" would be wrong and so
// would a person called Delta — so the Greek names are converted only where
// something already says the line is maths. The selftest at the foot of this
// file is a list of sentences that must come out unchanged, and it is the half
// of the file that matters.
//
//   node engine/core/mathText.js --selftest

// TAGS ARE PLACED BEFORE ESCAPING AND SPELLED AFTER IT, with two characters no
// book contains. Escaping first turned `->` into `-&gt;` and `<=` into `&lt;=`,
// so the two rules that most needed to fire could no longer see their input;
// escaping last would have escaped the tags this file just wrote. So the
// conversion runs on the raw string, emits `\u0001sup\u0002`, and the angle
// brackets are put back after the text has been made safe.
const LT = '\u0001', GT = '\u0002', QT = '\u0003';
const AMP = /[&<>"']/g;
const ENT = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = (s) => String(s ?? '').replace(AMP, c => ENT[c]);

/** Digits and the few signs that have a real superscript in Unicode. */
const SUP = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',
  '+':'⁺','-':'⁻','−':'⁻','(':'⁽',')':'⁾','n':'ⁿ','i':'ⁱ' };
const SUB = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉',
  '+':'₊','-':'₋','−':'₋','(':'₍',')':'₎' };

/** A whole string in superscript characters, or null if any character has none. */
const allSup = (s) => { let out = ''; for(const c of s){ if(!(c in SUP)) return null; out += SUP[c]; } return out; };
const allSub = (s) => { let out = ''; for(const c of s){ if(!(c in SUB)) return null; out += SUB[c]; } return out; };

/**
 * The Greek names, converted only in a string that is already maths.
 *
 * `Delta t` is a quantity; "the delta of the river" is a place. The gate is
 * `looksMathy` below rather than the word, because a sentence with `^` or `=`
 * or `sqrt(` in it has already declared itself.
 */
const GREEK = { alpha:'α', beta:'β', gamma:'γ', delta:'δ', Delta:'Δ', epsilon:'ε', theta:'θ',
  lambda:'λ', mu:'μ', pi:'π', rho:'ρ', sigma:'σ', Sigma:'Σ', tau:'τ', phi:'φ', omega:'ω',
  Omega:'Ω' };

/**
 * Is this a formula for a MACHINE rather than for a reader?
 *
 * The books carry JavaScript in them — `Math.sqrt(a*a + b*b)` is how an estimate
 * spec states its own calculation — and this file turned that into `Math.√(a·a
 * + b·b)`, which is not a smaller version of the same thing. Anything holding a
 * `Math.` call or an arrow function is left exactly as written.
 */
export function looksLikeCode(s){
  return /\bMath\.[a-zA-Z]|=>|\bfunction\s*\(/.test(String(s ?? ''));
}

/** Does this string contain something only maths contains? */
export function looksMathy(s){
  return /\^|\bsqrt\b|\bintegral\b|\blim_|\bd\/d[a-z]|=|<=|>=|->|\b(?:m|cm|mm|km|ft|in|yd)[23]\b|[₀-₉⁰-⁹√∫≤≥±·×÷Δθπμλσω]/.test(String(s ?? ''));
}

/**
 * The transformations, in the order they have to run.
 *
 * ORDER IS LOAD-BEARING TWICE. `lim_(h->0)` has to be taken before the bare
 * `->` rule, or the arrow is converted inside a group this rule then fails to
 * recognise. And `integral_a^b` has to be taken before the exponent rule, or
 * the `^b` is eaten as a power of the subscript.
 */
function convert(text){
  let s = text;

  // ∫ with its limits. `integral_0^2`, `integral_1^5`, and the bare `integral`.
  s = s.replace(/\bintegral_(\{[^}]*\}|\([^)]*\)|[^\s^]+)\^(\{[^}]*\}|\([^)]*\)|[^\s,;)]+)/g,
    (all, lo, hi) => {
      const l = allSub(strip(lo)), h = allSup(strip(hi));
      return (l && h) ? `∫${l}${h}` : `∫${sub(strip(lo))}${sup(strip(hi))}`;
    });
  // AND NOT THE BARE WORD. `integral` on its own is English as often as it is a
  // sign — "submit the scaled integral value" came out as "the scaled ∫ value" —
  // so only a limited integral, which is the form the books write when they mean
  // the operator, is set.

  // A limit, with what it approaches under it. `lim_(h->0)`, `lim_(x->infinity)`.
  s = s.replace(/\blim_(\([^)]*\)|\{[^}]*\}|[^\s,;]+)/g, (all, what) =>
    `${LT}span class=${QT}mathLim${QT}${GT}lim${sub(arrows(strip(what)))}${LT}/span${GT}`);

  // A root. `sqrt(16+h)` keeps its brackets — √(16+h) is unambiguous where
  // √16+h is a different expression — and `sqrt h` does not need them.
  // NOT `\bsqrt`. A word boundary needs a non-word character before it, and the
  // books write `0.3sqrt(h)` with the coefficient hard against it — so the one
  // shape this rule most needed to catch was the one it could not see, and the
  // root stayed ASCII inside a correctly raised exponent.
  s = s.replace(/(?<![A-Za-z])sqrt\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (all, inner) => `√(${inner})`);
  s = s.replace(/(?<![A-Za-z])sqrt\s+([A-Za-z][A-Za-z0-9]*)/g, (all, v) => `√${v}`);

  // Powers. `^(3/2)`, `^(−1)`, `^2`, `^n`. A bracketed exponent loses the
  // brackets, because a raised group needs no fence.
  // ONE LEVEL OF NESTING INSIDE A RAISED GROUP, because `40e^(0.3sqrt(h))` is
  // the shape a bible actually writes and `[^()]*` cannot reach the closing
  // bracket of it — the whole exponent was left as ASCII with no error.
  s = s.replace(/\^\(((?:[^()]|\([^()]*\))*)\)/g, (all, e) => sup(e));
  // ONE TOKEN, NOT A RUN, and a number and a letter are not the same case.
  // `[A-Za-z0-9]+` read `(1+t^2)^2dt` as t squared to the power of "2dt" — the
  // `dt` of the integral, raised. A NUMBER ends where the digits end, because
  // `^2dt` is unambiguously "squared, then dt". A LETTER does not: `e^kt` is e
  // to the kt and not eᵏ times t, so a letter exponent is taken only when
  // nothing follows it, and anything longer has to be bracketed as the books
  // already bracket it.
  // A DECIMAL IS ONE NUMBER. `-?\d+` took `30.2^1.05` as 30.2 to the 1, with
  // ".05" left standing beside it — the Omori exponent, silently changed.
  // The guard is against a DIGIT after the point, not against the point. `m^3.`
  // at the end of a sentence was refused by `(?![\d.])` — one clause of one
  // question kept its ASCII while the same unit two clauses earlier was set.
  s = s.replace(/\^(-?\d+(?:\.\d+)?)(?!\.?\d)/g, (all, e) => sup(e));
  s = s.replace(/\^([A-Za-z])(?![A-Za-z0-9])/g, (all, e) => sup(e));

  // Subscripts, where something is clearly indexed: `Q_0`, `v_max`, `C_(p)`.
  s = s.replace(/([A-Za-z0-9\)])_\(([^()]*)\)/g, (all, base, i) => base + sub(i));
  // Up to six characters, because the indices the books actually write are
  // `gen`, `load`, `peak`, `phase` and `rms` — and a four-character limit set
  // `P_gen` and left `R_phase` beside it in the same sentence.
  s = s.replace(/([A-Za-z])_([A-Za-z0-9]{1,6})\b/g, (all, base, i) => base + sub(i));

  // Cubic and square units written flat: `m3/s`, `cm2`. Only against a unit
  // that is letters then a single 2 or 3, so `H2O` and `Mission 3` are safe.
  s = s.replace(/\b(m|cm|mm|km|ft|in|yd)([23])\b/g, (all, u, n) => u + SUP[n]);

  s = arrows(s);
  // The comparisons, and a multiplication sign the books write as a star.
  s = s.replace(/<=/g, '≤').replace(/>=/g, '≥').replace(/!=/g, '≠')
       .replace(/(?<=[\w)\]])\s*\*\s*(?=[\w(\[])/g, '·');

  return s;
}

/** `->` and `-->`, which the books use for both limits and consequences. */
const arrows = (s) => s.replace(/--?>/g, '→');
/** A group's own brackets or braces, taken off. */
const strip = (s) => s.replace(/^[({]|[)}]$/g, '');

/** A raised group: Unicode where every character has one, `<sup>` otherwise. */
// CLASSED, so the stylesheet can reach these and nothing else. A bare `sup`
// rule would also resize the footnote marks and the ordinal in every other
// panel in the game.
function sup(e){
  const u = allSup(e);
  return u ?? `${LT}sup class=${QT}mathSup${QT}${GT}${e}${LT}/sup${GT}`;
}
function sub(i){
  const u = allSub(i);
  return u ?? `${LT}sub class=${QT}mathSub${QT}${GT}${i}${LT}/sub${GT}`;
}

/**
 * One string, escaped and set.
 *
 * ESCAPING HAPPENS FIRST AND THE TAGS ARE ADDED AFTER, which is why this must
 * be used INSTEAD OF `esc()` and never on top of it: `mathHTML(esc(s))` would
 * print `&lt;sup&gt;` — and `esc(mathHTML(s))` would print the tags as text.
 */
export function mathHTML(s){
  const raw = String(s ?? '');
  if(!raw) return '';
  if(looksLikeCode(raw) || !looksMathy(raw)) return escape(raw);
  let out = convert(raw);
  // The Greek names, last, and only in a string that has already shown itself
  // to be maths by some other token.
  out = out.replace(/\b(alpha|beta|gamma|delta|Delta|epsilon|theta|lambda|mu|pi|rho|sigma|Sigma|tau|phi|omega|Omega)\b/g,
    (w) => GREEK[w] ?? w);
  // Safe first, then the tags this file placed are spelled out.
  return escape(out).split(LT).join('<').split(GT).join('>').split(QT).join('"');
}

/**
 * The same, for somewhere that cannot take a tag — a canvas board, a map label,
 * an alt attribute. Anything that would have needed `<sup>` is left as the book
 * wrote it rather than flattened into a lie: `x^(3/2)` stays `x^(3/2)`, because
 * `x3/2` is a different number.
 */
export function mathPlain(s){
  return mathHTML(s).replace(/<sup[^>]*>([^<]*)<\/sup>/g, '^($1)')
                    .replace(/<sub[^>]*>([^<]*)<\/sub>/g, '_($1)')
                    .replace(/<[^>]+>/g, '')
                    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

// --------------------------------------------------------------- the selftest
//
// Two halves, and the second is the important one: sentences that must come out
// of this untouched. Every regex above is one an English sentence could match if
// it were written a little more loosely, and a formatter that quietly rewrites
// prose is worse than no formatter at all.
if(typeof process !== 'undefined' && process.argv?.includes('--selftest')){
  const fails = [];
  let ran = 0;
  const check = (what, ok, extra = '') => {
    ran++;
    if(!ok) fails.push(`${what}${extra ? ` — ${extra}` : ''}`);
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
  };
  const is = (what, input, want) => {
    const got = mathHTML(input);
    check(what, got === want, got === want ? '' : `got ${JSON.stringify(got)}, wanted ${JSON.stringify(want)}`);
  };

  // 1 — the notation the books actually carry
  is('a limit keeps its variable under it',
     'lim_(h->0) [sqrt(16+h)-4]/h',
     '<span class="mathLim">lim<sub class="mathSub">h→0</sub></span> [√(16+h)-4]/h');
  is('an integral takes both its limits',
     'integral_0^2 200t(1+t^2)^2dt',
     '∫₀² 200t(1+t²)²dt');
  is('a bracketed power loses the brackets', 'H^(3/2)', 'H<sup class="mathSup">3/2</sup>');
  is('a fractional power that has no Unicode form is a tag', 'u^(-1)', 'u⁻¹');
  is('a flat cubic unit is cubed', 'Q in m3/s', 'Q in m³/s');
  is('a raised unit at the end of a sentence is still raised',
     'the margin is 2.00 million m^3.', 'the margin is 2.00 million m³.');
  is('and a decimal exponent is still one number', '30.2^1.05', '30.2<sup class="mathSup">1.05</sup>');
  is('the comparisons are set', '0<=t<=2', '0≤t≤2');
  is('a root without brackets needs none', 'sqrt h', '√h');
  is('a subscript indexes its own letter', 'Q_0 e^(-kt)', 'Q₀ e<sup class="mathSup">-kt</sup>');
  is('Greek in an equation is Greek', 'Delta t = 2', 'Δ t = 2');

  // 2 — THE HALF THAT MATTERS. Prose, which must survive this untouched.
  const prose = [
    'The delta of the river floods in spring.',
    'Ask along the affected streets until enough answers have come back.',
    'A pi chart would be the wrong instrument here.',
    'He is patient with people and impatient with round figures nobody can source.',
    'Mission 3 opens the second wing.',
    'She measured 3 in of rain before the gauge iced over.',
    'The alpha team goes in first.',
    'Derive it and submit the scaled integral value, then name u and du.',
    'Take the limit of what the gauge can resolve before arguing about the third digit.',
  ];
  for(const p of prose){
    check(`prose is left alone: "${p.slice(0, 34)}…"`, mathHTML(p) === p,
          `became "${mathHTML(p)}"`);
  }

  // 3 — escaping, which is the security half
  is('a tag in the text is escaped, not run',
     '<script>x^2</script>',
     '&lt;script&gt;x²&lt;/script&gt;');
  check('quotes survive as entities', mathHTML('say "x^2"') === 'say &quot;x²&quot;',
        mathHTML('say "x^2"'));

  // 4 — the plain form, for a canvas
  check('plain keeps a power it cannot draw',
        mathPlain('H^(3/2)') === 'H^(3/2)',
        mathPlain('H^(3/2)'));
  check('plain still uses Unicode where there is one',
        mathPlain('t^2 <= 4') === 't² ≤ 4', mathPlain('t^2 <= 4'));

  console.log(fails.length
    ? `\nmathText --selftest: ${fails.length} case(s) failed.\n  ${fails.join('\n  ')}`
    : `\nmathText --selftest: ${ran} cases, the maths is set and the prose is not touched.`);
  process.exitCode = fails.length ? 1 : 0;
}
