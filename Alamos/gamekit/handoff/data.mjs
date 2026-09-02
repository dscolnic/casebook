// The nine revised campaigns, the gates each one owes, and what it owes them.
// Every count and every quoted finding is copied from the gate's own output,
// run against the shipped content on 2026-09-01 after the second revised bundle
// landed.

export const GATES = {
  validateContent: {
    name: 'validateContent',
    band: 'prose',
    what: 'The content invariants, plus a reading-level ceiling per card at the campaign’s own '
      + 'declared grade. Every lesson has a real scene, <code>takeaway</code> never repeats '
      + '<code>why</code>, <code>choices</code> contains <code>correctChoice</code> verbatim, and no '
      + 'scene or verdict reads above <code>audience.grade</code>.',
    why: 'The invariants are what make a card gradeable at all. The grade ceiling is the softer half '
      + 'and the one that fails here: a card written for a graduate reader inside a course declared '
      + 'for grade 12.',
  },
  checkStory: {
    name: 'checkStory',
    band: 'prose',
    what: 'The story contract. The opening card’s four beats and its five-sentence cap; a day’s '
      + 'stake and briefing inside four sentences; a <code>reason</code> line under every call saying '
      + 'why it matters today; no cast names on the plan card or the debrief; a closing card with a '
      + 'turn in it; an ending addressed to the player.',
    why: 'A campaign can be correct and still read as a list of problems. This is the gate that says '
      + 'so, and it is the largest single debt in every book in the bundle.',
  },
  checkNames: {
    name: 'checkNames',
    band: 'mechanical',
    what: 'A person’s job arrives with their name the first time they are named — '
      + '“Reyes, the shift supervisor, …” — wherever that first mention happens.',
    why: 'Names now live on the calls rather than the plan card, so the first mention moved and the '
      + 'gloss did not move with it.',
  },
  checkJargon: {
    name: 'checkJargon',
    band: 'mechanical',
    what: 'Every hard word is introduced before it is needed: a glossary entry, a day primer, or a '
      + 'definition in place on the card that first uses it.',
    why: 'The house rule is hard concepts at a sixth-grade reading level, and the way that is done '
      + 'is to keep the official term and gloss it on the spot. A term used and never introduced is '
      + 'the failure the rule exists to prevent.',
  },
  jargonDepth: {
    name: 'jargonDepth',
    band: 'mechanical',
    what: 'A glossary definition may not lean on a word that is itself undefined. It reports the '
      + 'undefined word and how many defined terms rest on it.',
    why: 'A glossary that explains one hard word with another is a glossary that has not explained '
      + 'anything.',
  },
  conceptOrder: {
    name: 'conceptOrder',
    band: 'curriculum',
    what: 'No stop may claim a syllabus concept whose prerequisite is claimed later, on the same day, '
      + 'or by nothing at all — unless the stop declares it with <code>takesAsRead:</code>. '
      + 'Ratcheted against <code>engine/dev/concept-debt.json</code>, so a recorded gap that has since '
      + 'been closed also fails, naming the line to delete.',
    why: 'A hard concept early is fine; a derived one before its base is not. The same day counts as '
      + 'a failure because the engine opens a day’s three calls in any order.',
  },
  equationOrder: {
    name: 'equationOrder',
    band: 'curriculum',
    what: 'An equation a question asks may not arrive before the equation it is built on.',
    why: 'Same rule as conceptOrder, one level down: the sequencing pass exists because a derivation '
      + 'reached before its base teaches nothing.',
  },
  curriculumDelivery: {
    name: 'curriculumDelivery',
    band: 'curriculum',
    what: 'Every equation on the campaign’s syllabus has to be <em>computed</em> by some question, '
      + 'not merely mentioned on a card. Gaps are recorded in '
      + '<code>engine/dev/curriculum-debt.json</code> so nothing new drifts in.',
    why: 'An equation nothing computes is an equation the course did not teach. The fix is a stop that '
      + 'gets a number out of it, or a recorded gap.',
  },
  delivery: {
    name: 'delivery',
    band: 'mechanical',
    what: 'The campaign builds one named thing, one piece a day, on a board in a room the player can '
      + 'walk into. The opening card names it, and every piece caption fits a board cell.',
    why: 'A campaign whose opening card never names what is being built tells the player the stakes '
      + 'and not the job. A caption too long for its cell is invisible on the board and renders '
      + 'perfectly in a screenshot.',
  },
  plainCards: {
    name: 'plainCards',
    band: 'prose',
    what: 'The two cards nobody can avoid — the opening card and every day’s stake — '
      + 'measured against grade 6.5 whatever the campaign declares, with a pile-up count for '
      + 'sentences that run long.',
    why: 'These sixteen cards are read before any question is asked, by every player. This is the '
      + 'gate the whole philosophy is expressed through, and it ratchets: a campaign may not gain a '
      + 'card over the bar.',
  },
  plainQuestions: {
    name: 'plainQuestions',
    band: 'prose',
    what: 'The same measurement across every question card in the campaign: grade, words per '
      + 'sentence, syllables per word, how many cards are over 6.5 and how many sentences run past '
      + '28 words.',
    why: 'Reading score cannot see demand, so this never lowers the course. It says which cards are '
      + 'harder to <em>read</em> than the science in them requires.',
  },
  probeQuestions: {
    name: 'probeQuestions',
    band: 'prose',
    what: 'Probes on the shape of an answer rather than its content, reported in three classes. '
      + '<strong>LEAK</strong> — the keyed answer gives itself away: either the takeaway, shown '
      + 'before the question, repeats its words, or its length alone identifies it. '
      + '<strong>ORDER</strong> — a sequence’s prose fixes its own order, so the science is not '
      + 'what settles it. <strong>ECHO</strong> — the prompt’s own content words reappear in the '
      + 'keyed option.',
    why: 'Every one of these lets a reader answer correctly without understanding anything. The '
      + 'length signal was 88 per cent of one game’s passage quizzes before it was measured.',
  },
  conceptVisible: {
    name: 'conceptVisible',
    band: 'curriculum',
    what: 'Two questions about the same thing. Per card: is the stop\u2019s own syllabus concept '
      + 'named in the <em>question or one of the options</em> \u2014 the only text a player has in '
      + 'front of them at the moment they answer? And per campaign: does every syllabus concept '
      + 'reach at least one question that way? Three findings: <strong>UNNAMED</strong>, a card '
      + 'that names its concept nowhere in the ask or the options; <strong>BURIED</strong>, the '
      + 'same card also carrying four or more of the campaign\u2019s own glossary terms, which is '
      + 'the detail crowding out the subject; <strong>UNREACHED</strong>, a concept no question in '
      + 'the campaign says out loud.',
    why: 'A concept is assigned in metadata and taught in the scene, the guide and the background '
      + '\u2014 and a card can do all of that and then ask a question in which neither the idea '
      + 'nor any of its words appears. The player answers correctly, every other gate is green, '
      + 'and what they practised was reading comprehension. This gate reads only the ask and the '
      + 'options, deliberately, because the other four zones are where a concept hides.',
  },
  warmupOrder: {
    name: 'warmupOrder',
    band: 'mechanical',
    what: 'The seven world-graded warm-up runs, their spread across the campaign, and the cards that '
      + 'introduce them \u2014 including the same name-arrives-with-the-job rule '
      + '<code>checkNames</code> applies to day cards.',
    why: 'A warm-up card is read before the day starts and <code>checkNames</code> does not look at '
      + 'it, so a name can arrive unglossed there while every other gate stays green.',
  },
  checkPassages: {
    name: 'checkPassages',
    band: 'prose',
    what: 'Every person on the roster carries a passage and an authored question about it, and the '
      + 'answer may not be reachable by copying the passage’s wording.',
    why: 'Ask about the why, not the wording: the passage says how somebody works, and the question '
      + 'should be answerable only by having understood it.',
  },
};

export const BANDS = {
  mechanical: {
    label: 'Mechanical',
    blurb: 'One edit each, no judgement call in any of them — a glossary line, a caption cut, a '
      + 'stale debt entry deleted. Cheapest work in the document and it closes whole gates.',
  },
  prose: {
    label: 'Prose',
    blurb: 'Reading level and card shape. Real editing, card by card, at the bar '
      + '<code>alamos-accessibility</code> sets: reading level down, the course’s judgement '
      + 'untouched, the official term kept and glossed.',
  },
  curriculum: {
    label: 'Curriculum',
    blurb: 'When the campaign teaches each idea. Every question stays where it is; what moves is the '
      + 'order the concepts are claimed in, or a <code>takesAsRead:</code> declaration, or one new '
      + 'stop that computes an equation nothing computes yet.',
  },
};

export const CAMPAIGNS = [
  {
    id: 'aftershock',
    title: 'Aftershock',
    course: 'Earthquake engineering',
    place: 'Kestrel Bay, three days after a magnitude 6.8',
    dayNoun: 'days',
    stops: 52,
    delivery: 'The Placard Register',
    favicon: '🏚️',
    lede: 'The cheapest of the nine. Five story problems against eighty-eight in Riverton, and the '
      + 'reading level is already close: three of sixteen cards over the bar. What it owes is a '
      + 'curriculum debt — ten stops standing on a concept no stop claims.',
    numbers: [
      { k: 'Gates failing', v: '7' },
      { k: 'Findings', v: '31' },
      { k: 'Opening + stake cards over 6.5', v: '3 / 16' },
      { k: 'Story problems', v: '5' },
    ],
    gates: [
      { gate: 'conceptVisible', count: 11, findings: [
        '<strong>UNNAMED</strong> — “Before the next one”: asks about "Recurrence intervals and what "the big one" means" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Measuring against the wrong zero”: asks about "Moment magnitude, and what it is made of" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “The same event, recorded twice — Review”: asks about "Intensity against magnitude — one event, many shakings" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Where the first day of assessment goes”: asks about "Cordons, lifelines and the cost of keeping people out" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Which way the cracks run”: asks about "Ductility: bending without breaking" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Soft ground, three days on”: asks about "Lateral spreading toward a free face" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What still stands”: asks about "Moment magnitude, and what it is made of" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What the tested anchors actually carried”: asks about "Factor of safety, and what it is protecting against" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What four more days buys”: asks about "Load path, and what happens where it stops" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “A condition, not a date”: asks about "Instruments: what an accelerograph actually records" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Which of the three cannot wait”: asks about "Aftershock decay as a power law" and names it nowhere in the question or the options',
      ], note: '40 of 51 question cards name their own concept, and every one of the 30 concepts reaches some question. Nothing here has been fixed — the gate was written to surface it.' },
      { gate: 'conceptOrder', count: 14, findings: [
        'Ten stops — 2, 4, 7, 10, 11, 27, 34, 36, 45, 47 — claim a concept built out of '
          + '“Stress, strain and the yield point”, which no stop in the campaign claims.',
        'Stops 12 (day 4) and 15 (day 5) claim “Site effect: soft ground amplifies”, built '
          + 'out of “Peak ground acceleration and what a building feels” — not until day 6.',
        'STALE DEBT: <code>concept-debt.json</code> lists “Stress, strain and the yield point '
          + '← Peak ground acceleration…” for aftershock, which is in order now. Delete '
          + 'the line.',
      ], note: 'One decision closes almost all of it: give day 1 or 2 a stop that claims '
        + '“Stress, strain and the yield point”, or declare it as <code>takesAsRead</code> on '
        + 'the ten stops that lean on it.' },
      { gate: 'probeQuestions', count: 7, findings: [
        'LEAK ×5, by length — M4.1 “The raft is fine and the building is not” (2.0×), '
          + 'M9.2 “Soft ground, three days on” (2.4×), M13.3 “A smaller shake '
          + 'against a weaker building” (2.3×), M14.1 “Fixing the ground instead of the '
          + 'building” (2.0×), M15.2 “The number that has to be a range” (2.0×). '
          + 'The keyed answer is around twice the length of a typical distractor.',
        'LEAK ×1, by takeaway — M14.1 “Fixing the ground instead of the building”: the '
          + 'takeaway repeats 60% of the keyed answer’s own words and is shown before the '
          + 'question. That card fails both ways.',
        'ECHO — GEO[4] “What still stands”, pair 1 of 4: two of the prompt’s four '
          + 'content words (flat, ratio) reappear in the keyed option.',
      ] },
      { gate: 'checkStory', count: 5, findings: [
        'Three calls carry no <code>reason</code> line.',
        'Two day stakes never say what the player decides — no “Today you …” clause.',
      ] },
      { gate: 'curriculumDelivery', count: 1, findings: [
        'Nothing computes <code>V = C_s · W</code> (base shear — the sideways force a building '
          + 'is designed for). Mentioned only, at stop 20.',
      ], note: 'Base shear is the spine of the course. Either give a stop that gets a number out of it, '
        + 'or record the gap in <code>curriculum-debt.json</code>.' },
      { gate: 'validateContent', count: 2, findings: [
        '“The raft is fine and the building is not”: verdict reads at grade 14.2, theme '
          + 'declares 12.',
        '“Soft ground, three days on”: verdict reads at grade 14.8, theme declares 12.',
      ] },
      { gate: 'checkJargon', count: 2, findings: [
        '<code>spectrum</code> — first used day 6, SEIS “The instrument in the basement”, '
          + 'introduced nowhere.',
        '<code>mn</code> — same card, introduced nowhere.',
      ] },
      { gate: 'plainCards', count: 1, findings: [
        'mean 5.8 · worst 10.6 · 3 of 16 cards over grade 6.5 · 2 sentence pile-ups.',
      ] },
    ],
  },
  {
    id: 'blackout',
    title: 'Blackout',
    course: 'AP Physics 2 circuits and induction, with a first-year electrical-engineering unit',
    place: 'Calder Valley, and the night the interconnection nearly went',
    dayNoun: 'days',
    stops: 52,
    delivery: 'The Calder Winter Survival Plan',
    favicon: '⚡',
    lede: 'The opening card already reads at five sentences, and the question cards are the problem '
      + 'instead: fifty of fifty-two over the bar and ninety-one sentences past 28 words. Thirty-nine '
      + 'calls have no reason line.',
    numbers: [
      { k: 'Gates failing', v: '6' },
      { k: 'Findings', v: '70' },
      { k: 'Question cards over 6.5', v: '50 / 52' },
      { k: 'Story problems', v: '66' },
    ],
    gates: [
      { gate: 'conceptVisible', count: 10, findings: [
        '<strong>UNNAMED</strong> — “When the cheapest power cannot get out”: asks about "Economic dispatch and merit order" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “How the flow splits between two paths”: asks about "Series, parallel and equivalent circuits" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What the window is worth”: asks about "Renewables: variability, curtailment and inverters" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What the desk is chasing now”: asks about "Islanding, black start and restoration order" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “The power that never arrives”: asks about "Ohm\'s law and resistive networks" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What can come off, and what cannot”: asks about "Load shedding as a decision under uncertainty" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “The number that has to be a range”: asks about "Electrical power and energy over time" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “The order the records claim things happened in”: asks about "Metering, instrument transformers and measurement error" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “A reading taken without a connection”: asks about "Faraday\'s law and electromagnetic induction" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Measured, inferred, assumed”: asks about "Storage, round-trip efficiency and ramp rate" and names it nowhere in the question or the options',
      ], note: '39 of 49 question cards name their own concept, and every one of the 32 concepts reaches some question. Nothing here has been fixed — the gate was written to surface it.' },
      { gate: 'checkStory', count: 66, findings: [
        '39 calls carry no <code>reason</code> line.',
        '12 day cards name somebody on the plan card or the debrief — that belongs on the '
          + 'call’s own reason.',
        '12 opening blurbs (stake + briefing) run past four sentences.',
        '2 stakes are too short to say what happened, what you decide and why.',
        'The ending closes on what came of the fortnight rather than on what the player did.',
      ] },
      { gate: 'plainQuestions', count: 2, findings: [
        '52 cards · grade 7.85 · 15.3 words/sentence · 1.64 syllables/word · 50 over '
          + '6.5 · 91 sentences over 28 words · worst 11.5.',
      ], note: 'The words-per-sentence figure is what to attack: 15.3 against the 15-word line in '
        + '<code>alamos-accessibility</code>. Splitting long sentences moves both numbers at once.' },
      { gate: 'checkNames', count: 6, findings: [
        'Dolores Reyes, Shift Supervisor — first named in the day 1 stake.',
        'Nadia Haddad, Generation Lead — day 1, “The reason the wires are not at wall '
          + 'voltage”.',
        'Sten Lindgren, Load Forecasting Analyst — day 1 stake.',
        'Aaron Whitlock, Assistant Operator — day 2, “Which of the three cannot wait”.',
        'Thabo Dube, Substation Technician — day 4 stake.',
        'Rafael Alvarez, Demand Analyst — day 1 stake.',
      ] },
      { gate: 'delivery', count: 1, findings: [
        'The opening card never names The Calder Winter Survival Plan: the player is told what is at '
          + 'stake and not what they are building.',
      ] },
      { gate: 'validateContent', count: 1, findings: [
        '“What a rating is a statement about”: scene reads at grade 14.5, theme declares 12.',
      ] },
      { gate: 'plainCards', count: 1, findings: [
        'mean 6.7 · worst 10.5 · 8 of 16 cards over grade 6.5 · 3 sentence pile-ups.',
      ] },
    ],
  },
  {
    id: 'bring_them_home',
    title: 'Bring Them Home',
    course: 'AP Physics 1, with the mechanics half of AP Physics C',
    place: 'Mission Control, and five days to get three people home',
    dayNoun: 'shifts',
    stops: 52,
    delivery: 'The Return Checklist',
    favicon: '\u{1F680}',
    landed: 'chat_themes',
    lede: 'Re-landed from <code>chat_themes/</code>, and the reading level is transformed — the '
      + 'sixteen unavoidable cards went from mean grade 9.0 to 4.5, and 16 of 16 over the bar to '
      + 'none. It is the one campaign where that came at a price the gate can see: '
      + 'syllables per word <em>fell</em>, which is how vocabulary deletion shows up.',
    numbers: [
      { k: 'Gates failing', v: '6' },
      { k: 'Findings', v: '0' },
      { k: 'Opening + stake cards over 6.5', v: '0 / 16' },
      { k: 'Question card grade', v: '6.13' },
    ],
    importerFixes: [
      'Nine <code>takesAsRead</code> entries naming a concept the stop is not built out of — three '
        + 'of them naming the stop\u2019s own concept. Two swapped to '
        + '\u201CVectors and components\u201D, seven dropped.',
    ],
    gates: [
      { gate: 'conceptVisible', count: 10, findings: [
        '<strong>UNNAMED</strong> — “Reconstruct the state vector”: asks about "Vectors and components" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Real trajectory error or common clock drift?”: asks about "Doppler shift" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Why did the signal fade?”: asks about "Waves: frequency, wavelength, speed" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What shifts the apparent direction?”: asks about "Gravitation and orbits" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What the room is calling now”: asks about "Systems thinking: dependency, redundancy, failure modes" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “From force to trajectory change”: asks about "Newton\'s laws and free-body reasoning" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Off-nominal, or off-scale”: asks about "Measurement uncertainty and error propagation" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Select the robust trajectory”: asks about "Kinematics" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Give the entry GO”: asks about "Systems thinking: dependency, redundancy, failure modes" and names it nowhere in the question or the options',
        '<strong>UNREACHED</strong> — “Collisions: elastic and inelastic”: no question in the campaign names it, in the ask or in an option',
      ], note: '38 of 47 question cards name their own concept, and 1 of 30 concepts reach no question at all. Nothing here has been fixed — the gate was written to surface it.' },
      { gate: 'conceptOrder', count: 6, findings: [
        'Stop 10 (shift 4) claims \u201CTorque and moment of inertia\u201D, built out of '
          + '\u201CRotational kinematics\u201D \u2014 claimed by no stop.',
        'Stops 26, 27 and 28 (shift 8) claim \u201CGas behaviour and life support\u201D, built out '
          + 'of \u201CHeat transfer: conduction, convection, radiation\u201D \u2014 claimed by no stop.',
        'Stops 46 and 49 claim \u201CGravitation and orbits\u201D, built out of \u201CCircular '
          + 'motion and centripetal force\u201D \u2014 claimed by no stop.',
      ], note: 'Three base concepts \u2014 rotational kinematics, heat transfer, circular motion '
        + '\u2014 are leaned on and never claimed. Three stops, or three '
        + '<code>takesAsRead</code> lines, closes all six.' },
      { gate: 'checkStory', count: 19, findings: [
        '15 stakes are too <em>short</em> to say what happened, what you decide and why.',
        'The opening card is 55 words, under the 70-word floor \u2014 it now passes the '
          + 'five-sentence cap and fails the floor instead.',
        'The opening ends on \u201CBuild the Return Checklist and make each call before air, power, '
          + 'or fuel\u2026\u201D \u2014 no number, no clock, nobody in it.',
        'The campaign still reads as a set of problem statements rather than a story.',
      ], note: 'Down from 26, and the 45 missing <code>reason</code> lines are all written now. '
        + 'What is left is the opposite problem from the last bundle: cards cut too far.' },
      { gate: 'plainQuestions', count: 1, findings: [
        '52 cards \u00B7 grade 6.13 \u00B7 13.0 words/sentence \u00B7 1.58 syllables/word \u00B7 '
          + '15 over 6.5 \u00B7 69 sentences over 28 words \u00B7 worst 7.7.',
        'GATED FAILURE \u2014 syllables/word <strong>fell</strong> 1.669 \u2192 1.575. A grade '
          + 'bought by deleting course vocabulary is the one thing the accessibility pass forbids, '
          + 'and this is the gate that watches for it.',
      ], note: 'Read a dozen cards before accepting the 6.13. Every other number here improved: '
        + 'grade 8.21 \u2192 6.13, over-6.5 cards 49 \u2192 15, worst 11.9 \u2192 7.7. The '
        + 'question is whether a term went missing to buy it.' },
      { gate: 'probeQuestions', count: 2, findings: [
        'LEAK \u2014 M2.3 \u201CWhat holds it in the curve\u201D: the takeaway repeats 64% of the '
          + 'keyed answer\u2019s own words.',
        'LEAK \u2014 M8.3 \u201CRestore breathable air\u201D: the takeaway repeats 43%.',
      ], note: 'New. This gate passed before the re-landing.' },
      { gate: 'warmupOrder', count: 1, findings: [
        'The tag warm-up names Reyes and never says who they are \u2014 '
          + '\u201CReyes, the guidance lead,\u201D.',
      ], note: 'New, and the same rule as <code>checkNames</code> in a card that gate does not read.' },
      { gate: 'checkJargon', count: 1, findings: [
        '<code>impulse</code> \u2014 first used shift 4, STRUCT \u201CRead rotational '
          + 'motion\u201D, introduced nowhere.',
      ] },
    ],
  },
  {
    id: 'contamcity',
    title: 'The Contaminated City',
    course: 'College chemistry',
    place: 'Riverton, and a freight yard that burned upstream of the intake',
    dayNoun: 'days',
    stops: 52,
    delivery: 'The Riverton Evidence Package',
    favicon: '🧪',
    lede: 'The only book in the bundle that imported clean, and the largest story debt of the nine: '
      + 'eighty-eight problems, forty-eight of them calls with no reason line. The curriculum is in '
      + 'order; the cards around it are not.',
    numbers: [
      { k: 'Gates failing', v: '6' },
      { k: 'Findings', v: '104' },
      { k: 'Story problems', v: '88' },
      { k: 'Opening + stake cards over 6.5', v: '15 / 16' },
    ],
    gates: [
      { gate: 'conceptVisible', count: 15, findings: [
        '<strong>UNNAMED</strong> — “Water first, or never water”: asks about "Periodic trends and what an element can do" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Read analytical disagreement”: asks about "Quality control: standards, spikes and recovery" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Resolve the ambiguous peak”: asks about "Concentration units and conversions: ppm, mg/L, molarity" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “How much volume can the gas occupy?”: asks about "Gas laws and the ideal gas equation" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Interpret plume behavior”: asks about "Kinetic molecular theory, diffusion and volatility" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Monitor the transformed plume”: asks about "Reaction kinetics, rate laws and activation energy" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “How much volume can the gas occupy? — Review”: asks about "Gas laws and the ideal gas equation" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Will the holding pond freeze tonight?”: asks about "Colligative properties" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What the bench is running now”: asks about "Measurement: significant figures, blanks, detection limits, uncertainty" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What did the treatment actually do?”: asks about "The mole, molar mass and stoichiometry" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Choose the safest pilot program”: asks about "Separation science: chromatography and extraction" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Disposition the final chemical claims”: asks about "Measurement: significant figures, blanks, detection limits, uncertainty" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Audit the electrochemical removal from the charge passed”: asks about "Electrolysis and quantitative electrochemistry" and names it nowhere in the question or the options',
        '<strong>UNREACHED</strong> — “Colligative properties”: no question in the campaign names it, in the ask or in an option',
        '…and 1 more of the same shape. Run <code>node engine/dev/conceptVisible.mjs contamcity</code> for the full list.',
      ], note: '38 of 51 question cards name their own concept, and 2 of 30 concepts reach no question at all. Nothing here has been fixed — the gate was written to surface it.' },
      { gate: 'checkStory', count: 88, findings: [
        '48 calls carry no <code>reason</code> line — the single largest count in the bundle.',
        '15 stakes are too short to say what happened, what you decide and why.',
        '15 opening blurbs run past four sentences.',
        '9 day cards name somebody on the plan card or the debrief.',
        'The opening reads as a campaign of problem statements rather than a story.',
      ] },
      { gate: 'checkNames', count: 8, findings: [
        'Eight of the twenty-four cast are first named without their job beside them. The largest '
          + 'roster in the bundle, and the largest name debt.',
      ] },
      { gate: 'probeQuestions', count: 4, findings: [
        'LEAK ×1, by takeaway — M4.1 “Which alkali metal is the greater water '
          + 'hazard?”: the takeaway repeats 64% of the keyed answer’s own words.',
        'LEAK ×2, by length — M6.3 “Spend thirty laboratory samples where they change '
          + 'the decision” (1.9×) and M15.3 “Sign the reopening order” (2.1×).',
        'ORDER — TREAT[5] “Select a treatment train”: one card refers to another '
          + 'card’s output (“the remaining”), so the prose fixes the order.',
      ] },
      { gate: 'validateContent', count: 2, findings: [
        '“Sign the reopening order”: scene reads at grade 14.7 and verdict at 14.3, theme '
          + 'declares 12. The campaign’s last card is its hardest to read.',
      ] },
      { gate: 'delivery', count: 1, findings: [
        'The opening card never names The Riverton Evidence Package: the player is told what is at '
          + 'stake and not what they are building.',
      ] },
      { gate: 'plainCards', count: 1, findings: [
        'mean 8.7 · worst 11.1 · 15 of 16 cards over grade 6.5 · 8 sentence pile-ups.',
      ] },
    ],
  },
  {
    id: 'icecore',
    title: 'Ice Core',
    course: 'Paleoclimate',
    place: 'Vestri Dome, and a season that has to decide what it found',
    dayNoun: 'days',
    stops: 52,
    delivery: 'The Vestri Record',
    favicon: '🧊',
    lede: 'The only campaign in the bundle failing all three curriculum gates at once — concept '
      + 'order, equation order and equation coverage — and two of them are one hole: an equation '
      + 'six cards lean on and no question computes.',
    numbers: [
      { k: 'Gates failing', v: '7' },
      { k: 'Findings', v: '89' },
      { k: 'Sentence pile-ups', v: '10' },
      { k: 'Story problems', v: '70' },
    ],
    gates: [
      { gate: 'conceptVisible', count: 15, findings: [
        '<strong>UNNAMED</strong> — “From snowfall to sealed bubble”: asks about "What the trapped gas is, and what it is not" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “A year at 2400 metres”: asks about "Model against data, and what a mismatch can mean" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What makes one year different from the next”: asks about "Annual layer counting, and where counting fails" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “The metre with no label”: asks about "Core logging, orientation and chain of custody" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What makes one year different from the next — Review”: asks about "Annual layer counting, and where counting fails" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “The same water, twice”: asks about "Model against data, and what a mismatch can mean" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What the saw is cutting for”: asks about "Core logging, orientation and chain of custody" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Half a per mil, in degrees”: asks about "Reporting an uncertain record: what it licenses and what it does not" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Pair the same atmospheric event to the right ice”: asks about "Carbon dioxide and methane records, and what a ppm is" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “How thick a year is here — Review”: asks about "Resolution against record length — what choosing a site decides" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What is worth measuring before Thursday”: asks about "Model against data, and what a mismatch can mean" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Which width the answer is made of”: asks about "Dust and tephra: aridity, wind and where the dust came from" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “How much of it is noise”: asks about "Separating a trend from year-to-year noise" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Four sentences and a range”: asks about "Random against systematic uncertainty" and names it nowhere in the question or the options',
        '…and 1 more of the same shape. Run <code>node engine/dev/conceptVisible.mjs icecore</code> for the full list.',
      ], note: '38 of 52 question cards name their own concept, and 1 of 30 concepts reach no question at all. Nothing here has been fixed — the gate was written to surface it.' },
      { gate: 'checkStory', count: 70, findings: [
        '36 calls carry no <code>reason</code> line.',
        '11 opening blurbs run past four sentences.',
        '9 stakes are too short.',
        '7 day cards name somebody on the plan card or the debrief.',
        '4 stale <code>stakelength-debt.json</code> lines now pass — delete them.',
        '2 stakes never say what the player decides.',
      ] },
      { gate: 'conceptOrder', count: 11, findings: [
        'Stops 2, 21 and 41 claim a concept whose prerequisite is claimed <em>the same day</em>, and a '
          + 'day’s three calls open in any order.',
        'Stop 5 (day 2) claims “Core logging, orientation and chain of custody”, built out of '
          + '“Drilling: fluid, brittle ice…” — the same day.',
        'Stops 10 (day 3) and 30 (day 8) claim concepts built out of “Why ice keeps a record at '
          + 'all: burial without melting” — not until day 12.',
        'Stop 37 (day 10) claims “Reporting an uncertain record…”, built out of '
          + '“Random against systematic uncertainty” (day 11) and “Separating a trend '
          + 'from year-to-year noise” (day 13).',
        'STALE DEBT ×2 — two <code>concept-debt.json</code> lines for icecore are in order now. '
          + 'Delete both.',
      ], note: 'Stop 37 is the interesting one: a card about reporting uncertainty arriving three days '
        + 'before either kind of uncertainty is taught.' },
      { gate: 'plainQuestions', count: 3, findings: [
        '52 cards · grade 6.93 · 12.6 words/sentence · 1.64 syllables/word · 32 over '
          + '6.5 · 9 sentences over 28 words · worst 9.3.',
      ], note: 'Closest to the bar of any campaign that fails it. Thirty-two cards, most of them '
        + 'marginal.' },
      { gate: 'checkNames', count: 5, findings: [
        'Five of the twelve cast are first named without their job beside them.',
      ] },
      { gate: 'equationOrder', count: 1, findings: [
        '<code>Δage ≈ z_close × ρ̄ / b</code> — asked day 3, FIELD[1] '
          + '“How much ice is packed into the firn”; built on '
          + '<code>b = λ × ρ_snow / ρ_ice</code>, which no question asks until day 6.',
        '<code>age(z) = Σ Δz / λ(z)</code> — asked day 15, COLD[9] “The '
          + 'shortest thing this ice can show”; built on '
          + '<code>λ(z) = λ₀ (H − z) / H</code>, which no question ever asks.',
      ] },
      { gate: 'curriculumDelivery', count: 1, findings: [
        'Nothing computes <code>λ(z) = λ₀ (H − z) / H</code> (layer thinning with '
          + 'depth, as ice flows outwards). Mentioned at stops 2, 8, 11, 14, 31 and 39.',
      ], note: 'This and the second equationOrder finding are one defect. Six cards lean on layer '
        + 'thinning and no question gets a number out of it — one new stop closes both gates.' },
      { gate: 'checkJargon', count: 2, findings: [
        '<code>precipitation</code> — first used day 5, DATA “What the isotope thermometer '
          + 'actually measures”, introduced nowhere.',
      ] },
      { gate: 'validateContent', count: 1, findings: [
        '“What the bubbles license”: verdict reads at grade 15.3, theme declares 12.',
      ] },
      { gate: 'plainCards', count: 1, findings: [
        'mean 8.9 · worst 11.4 · 15 of 16 cards over grade 6.5 · 10 sentence pile-ups.',
      ], note: 'Most pile-ups in the bundle.' },
    ],
  },
  {
    id: 'projecty',
    title: 'Project Y',
    course: 'Los Alamos, 1943\u201345',
    place: 'The mesa, and five divisions with no common language',
    dayNoun: 'stages',
    stops: 55,
    delivery: 'The Evidence Chain',
    favicon: '\u269B\uFE0F',
    landed: 'chat_themes',
    lede: 'Re-landed from <code>chat_themes/</code>, and the biggest single improvement in the '
      + 'programme: story problems 93 \u2192 18, the 52 missing reason lines all written, and the '
      + 'unavoidable cards down from mean grade 9.4 to 5.2.',
    numbers: [
      { k: 'Gates failing', v: '5' },
      { k: 'Findings', v: '0' },
      { k: 'Opening + stake card grade', v: '5.2' },
      { k: 'Story problems', v: '18' },
    ],
    importerFixes: [
      'One <code>takesAsRead: Units and conversions\u2026</code> on a Shock-waves stop, swapped to '
        + '\u201CPressure, temperature and equations of state\u201D.',
    ],
    gates: [
      { gate: 'conceptVisible', count: 42, findings: [
        '<strong>UNNAMED</strong> — “How large is the neutron background?”: asks about "Experimental method: controls, calibration, systematic vs random error" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What the shop is making today”: asks about "Experimental method: controls, calibration, systematic vs random error" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Neutron multiplication factor”: asks about "Fission, neutron multiplication and chain reactions" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Criticality safety as a systems concept”: asks about "Criticality safety: administrative limits and controls" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Resonances and thresholds”: asks about "Experimental method: controls, calibration, systematic vs random error" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Shock waves and conservation laws”: asks about "Shock waves, compression and hydrodynamics" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Ionization and detector signals”: asks about "Detectors: ionisation, count rate, efficiency, dead time" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Radioactive is not the same as fissile”: asks about "Criticality: mass, geometry, reflectors, moderation" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Find what carries the background”: asks about "Attenuation of radiation through matter" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Buy the test that can decide”: asks about "Counting statistics and uncertainty" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Scintillation detectors”: asks about "Detectors: ionisation, count rate, efficiency, dead time" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Semiconductor detectors”: asks about "Detectors: ionisation, count rate, efficiency, dead time" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Dead time”: asks about "Detectors: ionisation, count rate, efficiency, dead time" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Gamma-ray spectroscopy”: asks about "Shielding, dose and radiation protection" and names it nowhere in the question or the options',
        '…and 28 more of the same shape. Run <code>node engine/dev/conceptVisible.mjs projecty</code> for the full list.',
      ], note: '85 of 126 question cards name their own concept, and 1 of 30 concepts reach no question at all. Nothing here has been fixed — the gate was written to surface it.' },
      { gate: 'checkStory', count: 18, findings: [
        '15 stakes are too <em>short</em> to say what happened, what you decide and why.',
        'The opening card is 58 words, under the 70-word floor.',
        'The ending addresses the player but never says what they did \u2014 '
          + '\u201Cyou checked the instruments the decisions rested on\u201D is the beat.',
        'The campaign still reads as a set of problem statements rather than a story.',
      ], note: 'Down from 93. Every card that was missing a reason has one; what is left is prose '
        + 'trimmed past the floor.' },
      { gate: 'validateContent', count: 2, findings: [
        '\u201CRadioactive is not the same as fissile\u201D: scene reads at grade 15.2, theme '
          + 'declares 12.',
        '\u201CIntegrate a one-shot field experiment\u201D: scene at grade 15.0.',
      ], note: 'Was four cards; the two verdicts are fixed and two scenes remain.' },
      { gate: 'plainCards', count: 1, findings: [
        'mean 5.2 \u00B7 worst 6.6 \u00B7 1 of 16 cards over grade 6.5 \u00B7 no pile-ups.',
      ], note: 'From 16 of 16 over the bar to one. One card away from a green gate.' },
      { gate: 'delivery', count: 1, findings: [
        'The opening card never names The Evidence Chain: the player is told what is at stake and '
          + 'not what they are building.',
      ], note: 'New \u2014 the shorter opening dropped the delivery\u2019s name.' },
      { gate: 'probeQuestions', count: 1, findings: [
        'ORDER \u2014 E[18] \u201CControlled assembly workflow for a one-shot experiment\u201D: '
          + 'the last card hands the work off (\u201CA sealed record and photograph authorize '
          + 'release\u2026\u201D), so its slot is fixed without the science.',
      ], note: 'Was eleven findings across three classes. One left.' },
    ],
  },
  {
    id: 'redsand',
    title: 'Red Sand',
    course: 'AP Chemistry, back half',
    place: 'Arcadia Rise, a propellant plant, and a transfer window that does not move',
    dayNoun: 'sols',
    stops: 56,
    delivery: 'A Full Tank',
    favicon: '\u{1F534}',
    landed: 'chat_themes',
    lede: 'Re-landed from <code>chat_themes/</code>, imported clean on the first try \u2014 the only '
      + 'book in three bundles to do that twice \u2014 and its story debt fell from 24 problems to one.',
    numbers: [
      { k: 'Gates failing', v: '6' },
      { k: 'Findings', v: '0' },
      { k: 'Story problems', v: '1' },
      { k: 'Question card grade', v: '6.41' },
    ],
    importerFixes: [
      'None. <code>redsand.yml</code> imported clean.',
    ],
    gates: [
      { gate: 'conceptVisible', count: 6, findings: [
        '<strong>UNNAMED</strong> — “What freezes before methane condenses”: asks about "Intermolecular forces, and why they set a boiling point" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Reading a blockage from outside the pipe”: asks about "What an assay is for, and what a specification is a list of" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Worth digging, or worth leaving”: asks about "Phase changes, and that every substance has its own temperature for one" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Running the plant with no digging”: asks about "Per-pass conversion against overall conversion, and what a recycle loop buys" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Write the rule before the trace moves”: asks about "What an assay is for, and what a specification is a list of" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Getting water out of frozen ground — Review”: asks about "Solutions: what dissolves out of frozen ground, and what each solute fouls" and names it nowhere in the question or the options',
      ], note: '50 of 56 question cards name their own concept, and every one of the 33 concepts reaches some question. Nothing here has been fixed — the gate was written to surface it.' },
      { gate: 'plainCards', count: 1, findings: [
        'mean 6.3 \u00B7 worst 8.1 \u00B7 6 of 16 cards over grade 6.5.',
      ], note: 'From 14 of 16 over the bar to six, and the worst card from grade 12.0 to 8.1.' },
      { gate: 'plainQuestions', count: 2, findings: [
        '56 cards \u00B7 grade 6.41 \u00B7 12.6 words/sentence \u00B7 1.61 syllables/word \u00B7 '
          + '20 over 6.5 \u00B7 2 sentences over 28 words \u00B7 worst 10.1.',
        'RATCHET \u2014 over-28 sentences rose 0 \u2192 2 and words/sentence 12.4 \u2192 12.6. '
          + 'Both are gated against rising, so two long sentences are the whole failure.',
      ], note: 'The grade fell and syllables per word held at 1.61, which is the shape of a real '
        + 'rewrite rather than a vocabulary cut. Two sentences to split.' },
      { gate: 'conceptOrder', count: 1, findings: [
        'STALE DEBT \u2014 <code>concept-debt.json</code> lists \u201CDeposition\u2026 \u2190 '
          + 'Vapour pressure\u2026\u201D for redsand, which is in order now. Delete the line.',
      ], note: 'Down from four real ordering problems to one bookkeeping line. Cheapest fix in the '
        + 'programme.' },
      { gate: 'delivery', count: 1, findings: [
        'The opening card never names A Full Tank: the player is told what is at stake and not what '
          + 'they are building.',
      ], note: 'New \u2014 the previous opening named it. A regression the shorter card introduced.' },
      { gate: 'warmupOrder', count: 2, findings: [
        'The follow warm-up names Cho and never says who they are.',
        'The tag warm-up names Achebe and never says who they are.',
      ], note: 'New, and the same rule as <code>checkNames</code> in a card that gate does not read.' },
      { gate: 'checkNames', count: 2, findings: [
        'Ingrid Sundqvist, Plant Production Lead, and Iosif Petrov, Array Technician, are first '
          + 'named without their job beside them.',
      ] },
    ],
  },
  {
    id: 'sightline',
    title: 'Sightline',
    course: 'AP Psychology',
    place: 'The Hallam Conviction Integrity Unit, and 15 days on State v. Elias Ward',
    dayNoun: 'days',
    stops: 53,
    delivery: 'The Ward Referral',
    favicon: '🔍',
    lede: 'Fails more distinct gates than any other campaign in the bundle, with small counts behind '
      + 'most of them. It is also the only one failing <code>checkPassages</code>, and the only one '
      + 'whose delivery board carries a caption too long for its own cell.',
    numbers: [
      { k: 'Gates failing', v: '7' },
      { k: 'Findings', v: '80' },
      { k: 'Cards over 6.5 (opening + stakes)', v: '6 / 16' },
      { k: 'Story problems', v: '65' },
    ],
    gates: [
      { gate: 'conceptVisible', count: 22, findings: [
        '<strong>UNNAMED</strong> — “Where this sample stops beating chance”: asks about "Retrieval is reconstruction, not playback" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Looking out of a lit room”: asks about "Dark adaptation, and how long the eye takes to arrive" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “A face on paper”: asks about "How a lineup is built: fillers, and the ones nobody would pick" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “The order an account is taken in”: asks about "Post-identification feedback and confidence inflation" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “The scar”: asks about "Reliability: the same measurement twice, and two people measuring once" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What Aktaş remembers now”: asks about "Storage and forgetting: the curve is steep at the start" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Three days, and one irreversible purchase”: asks about "Functional size: how many of them were real alternatives" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Predict it before the forty cards turn”: asks about "Functional size: how many of them were real alternatives" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “The man may not be here”: asks about "Signal detection: sensitivity against where the line is set" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What this does and does not settle”: asks about "Retrieval is reconstruction, not playback" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Change one thing”: asks about "Experimenter and investigator expectancy, and the control that removes it" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Six hundred arrays with no offender in them”: asks about "How a lineup is built: fillers, and the ones nobody would pick" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Put your name on it”: asks about "Retrieval is reconstruction, not playback" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “What distress cannot tell you”: asks about "Arousal and encoding: the amygdala, cortisol and the inverted U" and names it nowhere in the question or the options',
        '…and 8 more of the same shape. Run <code>node engine/dev/conceptVisible.mjs sightline</code> for the full list.',
      ], note: '29 of 51 question cards name their own concept, and every one of the 30 concepts reaches some question. Nothing here has been fixed — the gate was written to surface it.' },
      { gate: 'checkStory', count: 65, findings: [
        '40 calls carry no <code>reason</code> line.',
        '12 opening blurbs run past four sentences.',
        '11 day cards name somebody on the plan card or the debrief.',
        'One stake is too short; one stale <code>stakelength-debt.json</code> line now passes.',
      ] },
      { gate: 'conceptOrder', count: 6, findings: [
        'Stop 7 (day 3) claims “Retrieval is reconstruction, not playback”, built out of '
          + '“Storage and forgetting: the curve is steep at the start” — not until day 6.',
        'Stops 43 (day 12) and 50 (day 14) claim concepts built out of “Encoding: memory is built '
          + 'at the moment, from what was attended to” — claimed by no stop.',
        'STALE DEBT ×2 — two <code>concept-debt.json</code> lines for sightline are in order '
          + 'now. Delete both.',
      ], note: 'Encoding is the base of the whole memory strand and no stop claims it. One stop in the '
        + 'first week closes two findings.' },
      { gate: 'jargonDepth', count: 5, findings: [
        '<code>retinal</code>, <code>visual</code>, <code>tendency</code> and <code>learning</code> '
          + 'each hold up 2 defined terms and nothing defines any of them.',
      ], note: 'Four is the most in the repo. <code>visual</code> and <code>learning</code> are '
        + 'general-purpose words doing load-bearing work in this glossary.' },
      { gate: 'checkPassages', count: 2, findings: [
        'Dr. Priya Raghunathan: the answer repeats 8 consecutive words of the passage — '
          + '“Threat can narrow attention, making peripheral details less like…”',
      ], note: 'Ask about the why, not the wording. The passage is sound; the question is answerable '
        + 'by copying it.' },
      { gate: 'validateContent', count: 2, findings: [
        '“What distress cannot tell you”: verdict at grade 15.9, theme declares 12.',
        '“What holds if everybody withdraws”: verdict at grade 15.0, theme declares 12.',
      ] },
      { gate: 'delivery', count: 1, findings: [
        'Piece 13 is 47 characters, which no board cell holds: “The identification’s bounded '
          + 'evidentiary weight”.',
      ], note: 'A caption too long for its cell renders perfectly in a screenshot and is unreadable on '
        + 'the board. Shortest fix in the whole document.' },
      { gate: 'checkJargon', count: 2, findings: [
        '<code>calibration</code> — first used day 3, PERCEPT “Hold a dim-light test '
          + 'steady”, introduced nowhere.',
      ] },
      { gate: 'checkNames', count: 3, findings: [
        'Three of the twelve cast are first named without their job beside them.',
      ] },
      { gate: 'probeQuestions', count: 1, findings: [
        'LEAK — M4.2 “The middle of the event and its edges”: the takeaway repeats 50% of '
          + 'the keyed answer’s own words.',
      ], note: 'This is the DIAGNOSIS stop whose keyed answer was not one of its own candidates before '
        + 'the bundle landed. Worth re-reading as a whole.' },
      { gate: 'plainCards', count: 1, findings: [
        'mean 6.3 · worst 11.9 · 6 of 16 cards over grade 6.5 · 3 sentence pile-ups.',
      ] },
    ],
  },
  {
    id: 'the_trial',
    title: 'The Trial',
    course: 'AP Statistics',
    place: 'CLARION-3, and the three weeks before the second interim',
    dayNoun: 'days',
    stops: 51,
    delivery: 'The Monitoring Board Pack',
    favicon: '⚖️',
    lede: 'The plainest-reading campaign in the repo — mean grade 4.7 on the unavoidable cards, '
      + 'two of sixteen over the bar — carrying the third-largest story debt in the bundle. The '
      + 'prose is easy and the cards are the wrong shape.',
    numbers: [
      { k: 'Gates failing', v: '5' },
      { k: 'Findings', v: '85' },
      { k: 'Opening + stake card grade', v: '4.7' },
      { k: 'Story problems', v: '80' },
    ],
    gates: [
      { gate: 'conceptVisible', count: 8, findings: [
        '<strong>UNNAMED</strong> — “Make the three-point offset move”: asks about "Measurement error, rater drift and inter-rater agreement" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Reading the same files twice”: asks about "Measurement error, rater drift and inter-rater agreement" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Nothing left in the tray”: asks about "Hard endpoints against judged ones, and blinded adjudication" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “A trial ends at a number of events”: asks about "Event-driven trials, and information fraction as progress" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “A trial ends at a number of events — Review”: asks about "Event-driven trials, and information fraction as progress" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Ten minutes on each case”: asks about "The recruitment funnel: screened, eligible, consented, entered" and names it nowhere in the question or the options',
        '<strong>UNNAMED</strong> — “Eligible, or nearly”: asks about "Eligibility criteria, and what widening them changes" and names it nowhere in the question or the options',
        '<strong>UNREACHED</strong> — “p-values, and what significance is not”: no question in the campaign names it, in the ask or in an option',
      ], note: '45 of 52 question cards name their own concept, and 1 of 33 concepts reach no question at all. Nothing here has been fixed — the gate was written to surface it.' },
      { gate: 'checkStory', count: 80, findings: [
        '48 calls carry no <code>reason</code> line.',
        '15 day cards name somebody on the plan card or the debrief.',
        '15 opening blurbs run past four sentences.',
        '2 cards read as reference rather than prose.',
      ], note: 'The largest story debt against the plainest prose in the repo. Nothing here is a '
        + 'reading-level problem; it is all card shape.' },
      { gate: 'validateContent', count: 2, findings: [
        '“What needs extra escalation today”: scene at grade 16.2 and verdict at 16.0, theme '
          + 'declares 12.',
      ], note: 'One card, both halves, and the two hardest-reading passages in a campaign whose mean '
        + 'is 4.7. Worth reading as an outlier rather than a trend.' },
      { gate: 'equationOrder', count: 1, findings: [
        '<code>Σ α_spent ≤ α</code> — asked day 4, STAT[1] “What an extra '
          + 'look spends”; built on '
          + '<code>P(at least one false positive) = 1 − (1 − α)^k</code>, which no '
          + 'question asks until day 12.',
      ], note: 'Alpha spending asked eight days before the multiplicity result it rests on. Either move '
        + 'the day-12 question earlier or declare the base with <code>takesAsRead</code>.' },
      { gate: 'delivery', count: 1, findings: [
        'The opening card never names The Monitoring Board Pack: the player is told what is at stake '
          + 'and not what they are building.',
      ] },
      { gate: 'probeQuestions', count: 1, findings: [
        'LEAK, by length — M15.3 “Sign the board pack”: the keyed answer is 2.1× the '
          + 'length of a typical distractor, so length alone identifies it.',
      ] },
      { gate: 'checkNames', count: 1, findings: [
        'One of the eleven cast is first named without their job beside them — the smallest name '
          + 'debt in the bundle.',
      ] },
      { gate: 'plainCards', count: 1, findings: [
        'mean 4.7 · worst 11.4 · 2 of 16 cards over grade 6.5 · 1 sentence pile-up.',
      ], note: 'Plainest in the repo. The one card at 11.4 is the whole failure.' },
    ],
  },
];
