// introRule.mjs — is a person introduced with their job the first time they are named?
//
// The rule, in one sentence: **the first time a campaign names somebody, the job
// they do is beside the name.** Not somewhere on the roster, not in a bio the
// player may never open — in the sentence they are first read in.
//
// It lives in its own file because two checkers ask it. `checkNames.mjs` asks it
// of the campaign's narrative — the opening card, the warm-up cards, the day
// stakes, the scenes — and `warmupOrder.mjs` asks it of a run's card, which is
// read before the day's plan and so is often where a name lands first. Two copies
// of one rule drift the first time either is corrected, and this repo has paid
// for that twice already.
//
// **A full name is not an introduction any more, and that is the change.** It was
// one of four accepted shapes: "Dolores Reyes says the steadying matters more
// than the fall" counted as an introduction because it gave both her names. It
// tells a player nothing about why her opinion is the one in the sentence. What
// counts now is a *job* attached to the name — by apposition, by a role phrase in
// front of it, or by a rank that is itself a job.
//
// What does NOT count, deliberately:
//   · a courtesy title. "Dr. Patel has the notes" says she is a doctor of
//     something, in a building full of them, and nothing about what she does here.
//     A rank — Captain, Lieutenant, Nurse, Chief — does say it, so it counts.
//   · a job noun loose in the same sentence. "Reyes tells the substation
//     technician to wait" names a job that belongs to somebody else. The job has
//     to be *attached* to the name, which is why this matches shapes rather than
//     asking whether the two words are near each other.

/** Courtesy titles, which come off before a name is derived. A rank stays on. */
const COURTESY = /^(Dr|Mr|Mrs|Ms|Miss|Mx|Prof|Professor|Sir|Dame)\.?\s+/i;

/** Titles that state a job by themselves, so `Captain Vasquez` is an introduction. */
const RANK = ['Chief', 'Nurse', 'Captain', 'Commander', 'Cdr', 'Lieutenant', 'Lt', 'Sgt', 'Sergeant',
  'Petty Officer', 'Sonarman', 'Quartermaster', "Machinist's Mate", 'Hospital Corpsman', 'Corpsman',
  'Sister', 'Matron', 'Officer', 'Detective', 'Inspector', 'Superintendent', 'Warden', 'Marshal',
  'Ensign', 'Midshipman', 'Colonel', 'Major', 'General', 'Admiral', 'Doctor', 'Coach', 'Ranger'];

/**
 * Words that name a job. The harvested head nouns of all 252 roster roles, plus
 * the suffixes that make an occupation out of anything — so a game that invents
 * `astrometrist` or `psychophysiologist` needs no edit here.
 */
const JOB_NOUN = ['lead', 'leads', 'head', 'chief', 'engineer', 'technician', 'patient', 'officer',
  'analyst', 'manager', 'operator', 'supervisor', 'director', 'coordinator', 'scientist', 'navigator',
  'commander', 'captain', 'clerk', 'controller', 'observer', 'deputy', 'assistant', 'apprentice',
  'chair', 'chairman', 'chairwoman', 'chairperson', 'principal', 'registrar', 'matron',
  'trainee', 'nurse', 'doctor', 'physician', 'surgeon', 'paramedic', 'midwife', 'vet', 'veterinarian',
  'corpsman', 'mate', 'skipper', 'bosun', 'yeoman', 'crew', 'driver', 'pilot', 'spy', 'clerk',
  'curator', 'custodian', 'breeder', 'farmer', 'grower', 'partner', 'liaison', 'representative',
  'researcher', 'reviewer', 'postdoc', 'student', 'monitor', 'inspector', 'adviser', 'advisor',
  'planner', 'auditor', 'forecaster', 'keeper', 'foreman', 'superintendent', 'marshal', 'warden',
  'modeller', 'modeler', 'integrator', 'mechanic', 'rigger', 'weaponeer', 'gatekeeper', 'detective',
  'specialist', 'investigator', 'archivist', 'pharmacist', 'electrician', 'quartermaster', 'sonarman',
  'machinist', 'statistician', 'mathematician', 'librarian', 'consultant', 'counsel', 'counsellor',
  'counselor', 'volunteer', 'steward', 'warden', 'medic', 'aide', 'orderly', 'porter', 'welder',
  'fitter', 'diver', 'ranger', 'sergeant', 'lieutenant', 'colonel', 'admiral', 'ensign', 'operative'];
/** Words the suffix rule would otherwise read as somebody's occupation. */
const NOT_A_JOB = new Set(['water', 'other', 'after', 'later', 'under', 'over', 'better', 'matter',
  'weather', 'number', 'order', 'power', 'paper', 'corner', 'quarter', 'further', 'winter', 'summer',
  'centre', 'center', 'river', 'cover', 'colour', 'error', 'sensor', 'factor', 'vector', 'reactor',
  'mirror', 'motor', 'floor', 'door', 'shift', 'first', 'worst', 'list', 'least', 'most']);
// `-er` and `-or` make an occupation out of most verbs and out of a great many
// nouns that are not one, so the words above are held out of the suffix rule as
// well as out of the roles.
const JOB_SUFFIX = `(?!(?:${[...NOT_A_JOB].join('|')})\\b)`
  + '[a-z]{4,}(?:ologist|ographer|ometrist|ician|icist|ist|eer|wright|smith|or|er)';

/** The bit of a role that is a word worth matching — "Head of Pediatrics" gives both. */
const ROLE_STOP = new Set(['and', 'the', 'of', 'for', 'with', 'on', 'in', 'at', 'to', 'a', 'an']);
export function roleWords(role){
  return String(role ?? '').toLowerCase().split(/[^a-z'’-]+/)
    .filter(w => w.length > 2 && !ROLE_STOP.has(w));
}

/**
 * The stem of a role word, so the job may be said as a verb.
 *
 * "Sorokin, who observes in the thermal infrared" is the Thermal Infrared
 * Observer saying what she does, and a checker that can tell `observer` from
 * `observes` would send an author to rewrite prose that is already clear. Same
 * rule as `readabilityParity`'s: a measurement must not be able to tell one
 * spelling of a thing from another. Only stems of four letters or more, so
 * `lead` does not reduce to something that matches everything.
 */
export function roleStems(role){
  const out = [];
  for(const w of roleWords(role)){
    const stem = w.replace(/(ings?|ed|ions?|ance|ence|ers?|ors?|ists?|ies|s)$/, '');
    out.push(stem.length >= 4 ? stem : w);
  }
  return [...new Set(out)];
}

/** `{ first, surname }` for a roster entry, or null where there is no usable name. */
export function nameOf(person){
  const bare = String(person?.name ?? '').trim().replace(COURTESY, '');
  const parts = bare.split(/\s+/).filter(Boolean);
  const surname = parts.at(-1), first = parts[0];
  if(!surname || surname.length < 3) return null;
  // Bracketed nicknames — "Leona Woods (Marshall Libby)" — are not a surname.
  if(!/^[A-Za-z][A-Za-z'’-]+$/.test(surname)) return null;
  // Every given name, because "J. Robert Oppenheimer" is written "Robert
  // Oppenheimer" everywhere a person would write it.
  const givens = parts.slice(0, -1).filter(w => /^[A-Za-z][A-Za-z'’-]+$/.test(w));
  return { bare, first, surname, givens };
}

const esc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Does this text name the person at all? */
export function names(text, person){
  const n = nameOf(person);
  if(!n) return false;
  return new RegExp(`(^|[^A-Za-z])${esc(n.surname)}([^A-Za-z]|$)`).test(String(text ?? ''));
}

/** Verbs that state a job: "Farrow runs the metering hut", "Bethe, who heads Theory". */
const JOB_VERB = 'runs|heads|leads|manages|commands|supervises|chairs|coordinates|keeps|owns|oversees';

/**
 * Is the person's job attached to their name in this text?
 *
 * The caller decides how much text to hand over: a whole warm-up card, or the
 * sentence a name landed in. Three shapes, all of which a reader would accept:
 *
 *   apposition      Reyes, the shift supervisor, says …   /  Ava is a patient in bay one
 *   role in front   the shift supervisor Dolores Reyes …  /  our metering engineer, Farrow
 *   a rank          Captain Vasquez has the conn
 *   a job verb      Farrow runs the metering hut  /  Bethe, who heads the Theoretical Division
 */
export function introduces(text, person){
  const n = nameOf(person);
  if(!n) return false;
  const t = String(text ?? '').replace(/<[^>]+>/g, ' ');
  const given = (n.givens.length ? n.givens : [n.first]).map(esc).join('|');
  const NAME = `(?:(?:${given})\\s+)?${esc(n.surname)}`;
  // The words that can *name* somebody's job, for the two shapes that put a role
  // phrase beside the name. A word from the role only counts here if it looks
  // like an occupation — "Shift Supervisor" gives `supervisor`, not `shift`,
  // because "The shift changes at seven" would otherwise introduce her.
  const occupational = w => JOB_NOUN.includes(w)
    || (!NOT_A_JOB.has(w) && new RegExp(`^${JOB_SUFFIX}$`).test(w));
  const job = `(?:${[...new Set([...JOB_NOUN, ...roleWords(person?.role).filter(occupational)])]
    .map(esc).join('|')}|${JOB_SUFFIX})`;
  const filler = `(?:[a-z][\\w'’&/-]*\\s+){0,4}`;
  // Reyes, the shift supervisor, … / Ava is a patient … / Farrow — the metering engineer
  const det = `(?:the|a|an|our|this|their|her|his|its|my|your)`;
  const after = new RegExp(`\\b${NAME}\\b\\s*(?:,|—|–|\\(|:)?\\s*(?:,?\\s*who\\s+)?(?:is|was|works\\s+as)?\\s*${det}\\s+${filler}${job}\\b`, 'i');
  // the shift supervisor Dolores Reyes / our metering engineer, June Farrow
  // The gap may hold an initial — "the laboratory director, J. Robert Oppenheimer"
  // — so a full stop is allowed in it. Bounded at 40 characters, which holds
  // "the head of the Theoretical Division, Hans Bethe" and still keeps the job
  // attached to this name rather than to a later one.
  const before = new RegExp(`${det}\\s+${filler}${job}\\b[\\w\\s,'’&().-]{0,40}?\\b${NAME}\\b`, 'i');
  // Captain Vasquez
  const rank = new RegExp(`\\b(?:${RANK.map(esc).join('|')})\\.?\\s+(?:[A-Z][a-z’'-]+\\s+)?${esc(n.surname)}\\b`);
  // Farrow runs the metering hut / Bethe, who heads the Theoretical Division
  const verb = new RegExp(`\\b${NAME}\\b,?\\s+(?:who\\s+)?(?:${JOB_VERB})\\s`, 'i');
  // Reyes, on the pumps, … / Sorokin, who observes in the thermal infrared, …
  // A clause hung straight off the name that uses the campaign's own words for
  // the job. Bounded at eight words, because further away than that it is a
  // sentence about something else.
  const stems = roleStems(person?.role).filter(w => w.length >= 4);
  const clause = stems.length && new RegExp(
    `\\b${NAME}\\b\\s*(?:,|—|–)\\s*(?:\\w[\\w'’-]*\\s+){0,7}?(?:${stems.map(esc).join('|')})[a-z]*\\b`, 'i').test(t);
  return after.test(t) || before.test(t) || rank.test(t) || verb.test(t) || clause;
}
