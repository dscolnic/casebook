// checkNames.mjs — is a person introduced the first time the campaign names them?
//
//   node engine/dev/checkNames.mjs <theme>
//
// The complaint this exists for: "a number of names are introduced as if we should
// know the names, before the character is really introduced." It was true in six of
// the seven games — mission stakes opened with a bare surname doing something
// ("Osei wants a list this morning", "Chen does not trust them yet") for somebody
// the player had never met and would not meet for another six shifts.
//
// A mention counts as an introduction if it says who they are — a role word or their
// own title near the name — or if it uses their full name. A bare surname is not an
// introduction, however famous the surname is.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';

const themeName = process.argv[2];
if(!themeName){
  console.error('usage: node engine/dev/checkNames.mjs <theme>');
  process.exit(2);
}
const dir = resolveTheme(themeName);
const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const { normalizeContent } = await import('../content/normalize.js');
const content = theme.content ?? {};
normalizeContent(content);

const TITLES = /^(Dr|Mr|Mrs|Ms|Miss|Chief|Nurse|Captain|Commander|Lieutenant|Petty Officer|Sonarman|Quartermaster|Machinist's Mate|Hospital Corpsman|Lt|Sgt|Professor)\.?\s+/i;
/** Words that say who somebody is. Deliberately broad: a false pass is better than
 *  a rewrite of prose that was already clear. */
const ROLE = new RegExp([
  'dr\\.', 'nurse', 'chief', 'officer', 'sonarman', 'electrician', 'mate\\b', 'captain', 'commander',
  'lieutenant', 'quartermaster', 'corpsman', 'navigator', 'supervisor', 'operator', 'engineer',
  'technician', 'specialist', 'scientist', 'analyst', 'director', 'lead\\b', 'leads\\b', 'head of',
  'division', 'modeller', 'modeler', 'epidemiologist', 'veterinarian', 'vet\\b', 'astronomer',
  'physicist', 'chemist', 'mathematician', 'counterpart', 'coordinat', 'who runs', 'who leads',
  'who owns', 'who models', 'who observes', 'who briefs', 'who maintains', 'who coordinates',
  'on the pumps', 'patient', 'aged \\d', 'year-old', 'his |her |their ', ', the ',
].join('|'), 'i');
const NEAR = 70;

const slots = [];
for(const [mi, m] of (content.MISSIONS ?? []).entries()){
  slots.push([`${theme.dayNoun ?? 'day'} ${mi + 1} stake`, m.stake ?? '']);
  slots.push([`${theme.dayNoun ?? 'day'} ${mi + 1} briefing`, m.briefing ?? '']);
  for(const st of m.stops ?? []){
    const l = content.CURRICULUM?.[st.group]?.[st.lesson];
    if(l) slots.push([`${theme.dayNoun ?? 'day'} ${mi + 1} "${l.title}"`, l.scene ?? l.story ?? '']);
  }
}

const findings = [];
for(const p of content.ROSTER ?? []){
  const full = String(p.name ?? '');
  const bare = full.replace(TITLES, '');
  const surname = bare.split(/\s+/).at(-1);
  if(!surname || surname.length < 3) continue;
  const re = new RegExp(`(^|[^a-z])${surname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`, 'i');
  const slot = slots.find(([, text]) => re.test(text));
  if(!slot) continue;
  const [where, text] = slot;
  const at = text.search(re);
  const near = text.slice(Math.max(0, at - NEAR), at + NEAR);
  // Their full name, or their own title, or a role word beside them.
  if(near.includes(bare) || ROLE.test(near)) continue;
  findings.push(`${full} — ${p.role ?? 'no role on the roster'}\n    first named in ${where}: …${near.trim()}…`);
}

if(!findings.length){
  console.log(`\n✓ theme "${themeName}": every person is introduced the first time they are named`);
} else {
  console.log(`\n${findings.length} name(s) used before the character is introduced in "${themeName}"`);
  for(const f of findings) console.log('  · ' + f);
  console.log('  (say who they are at the first mention: a role, a title, or their full name)');
}
process.exit(findings.length ? 1 : 0);
