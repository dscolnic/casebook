// Harvest, for the eleven campaigns of the first revised bundle, everything the
// ratchet is holding them to. They fail nothing, so there is no failure output to
// quote — what they carry is banked debt, and the debt files are the source.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeDir } from '/Users/scolnic/code/Nuclear/Alamos/gamekit/engine/dev/registry.mjs';

const GK = '/Users/scolnic/code/Nuclear/Alamos/gamekit';
const DEBTDIR = '/private/tmp/claude-502/-Users-scolnic-code-Nuclear-Alamos/74675676-6abd-4f05-92ed-43cb68a39b14/scratchpad/debt';

const THEMES = ['carrying', 'changeover', 'darkfibre', 'ghostlight', 'groundtruth', 'headwater',
  'midway', 'outbreak_riverton', 'overwind', 'slackwater', 'yellowbay'];

const COURSE = {
  carrying: 'AP Environmental Science',
  changeover: 'AP Macroeconomics',
  darkfibre: 'AP Physics 2 — optics and modern',
  ghostlight: 'AP Precalculus',
  groundtruth: 'AP Physics C: E&M, in ten derivations',
  headwater: 'Calculus',
  midway: 'AP Physics 1, in derivations',
  outbreak_riverton: 'Epidemiology',
  overwind: 'AP Physics C: Mechanics, in derivations',
  slackwater: 'AP Calculus BC — parametric, polar and series',
  yellowbay: 'AP Chemistry — structure half',
};

const FILES = {
  'taskclause-debt.json': {
    label: 'taskclause',
    gate: 'checkStory',
    band: 'daycards',
    what: 'A day’s stake has to say what the player decides, in the “Today you …” shape.',
    owed: 'day(s) whose stake never says what you decide',
  },
  'stakelength-debt.json': {
    label: 'stakelength',
    gate: 'checkStory',
    band: 'daycards',
    what: 'The opening blurb — stake plus any briefing that says something the stake did not — '
      + 'runs to four sentences at most.',
    owed: 'day card(s) past four sentences',
  },
  'namefree-debt.json': {
    label: 'namefree',
    gate: 'checkStory',
    band: 'daycards',
    what: 'A plan card and a debrief name nobody. Names belong on the call’s own reason, at the '
      + 'moment the person is standing in front of you.',
    owed: 'day(s) naming somebody on the plan card or the debrief',
  },
  'openinglength-debt.json': {
    label: 'openinglength',
    gate: 'checkStory',
    band: 'daycards',
    what: 'The opening card runs to five sentences at most — one more than a day card, because it '
      + 'carries four beats and a day card carries one. Counted by the same splitter as the day cap.',
    owed: 'opening card past five sentences',
  },
  'segue-drama-debt.json': {
    label: 'segue-drama',
    gate: 'checkStory',
    band: 'closing',
    what: 'A closing card has to turn: a complication or a forced consequence, in any wording, with '
      + 'something concrete at risk — and it may not simply echo the next stake or the day’s own '
      + 'takeaway.',
    owed: 'closing card(s) with no turn in them',
  },
  'seguegrade-debt.json': {
    label: 'seguegrade',
    gate: 'checkStory',
    band: 'closing',
    what: 'A closing card reads at grade 8 or below — a flat ceiling rather than the campaign’s own '
      + 'audience grade, since a closing card motivates rather than teaches.',
    owed: 'closing card(s) above the ceiling',
  },
};

const NUMBERS = {
  'plaincards-debt.json': {
    label: 'plainCards',
    keys: [
      ['over', 'cards over grade 6.5', 'of 16'],
      ['long', 'sentence pile-ups past 28 words', ''],
      ['worst', 'worst single card', 'grade'],
    ],
    rule: 'All three are high-water marks. <code>plainCards</code> fails this campaign if any of them '
      + 'rises. They only ever fall, and they fall by rewriting cards and re-banking with '
      + '<code>--write-debt</code>.',
  },
  'plainquestions-debt.json': {
    label: 'plainQuestions',
    keys: [
      ['long', 'sentences past 28 words', 'GATED'],
      ['wps', 'words per sentence', 'GATED'],
      ['spw', 'syllables per word', 'GATED — may not FALL'],
      ['grade', 'reading grade', 'reported'],
      ['over', 'cards over grade 6.5', 'reported'],
      ['worst', 'worst single card', 'reported'],
    ],
    rule: 'Three of the six are gated and three are only reported, and the asymmetry is the point. '
      + '<code>long</code> and <code>wps</code> may not rise; <code>spw</code> may not <em>fall</em>, '
      + 'because a reading grade bought by deleting the course’s vocabulary is the one thing the '
      + 'accessibility pass forbids. The grade itself is reported, never gated.',
  },
};

const rows = [];
for (const t of THEMES) {
  const mod = await import(pathToFileURL(resolve(themeDir(t), 'theme.js')).href);
  const m = mod.default ?? mod.THEME;

  const files = {};
  for (const f of [...Object.keys(FILES), ...Object.keys(NUMBERS)]) {
    const d = JSON.parse(readFileSync(resolve(GK, 'engine/dev', f), 'utf8'));
    const v = d.themes?.[t];
    if (v) files[f] = v;
  }

  const story = readFileSync(resolve(DEBTDIR, `${t}.checkStory.txt`), 'utf8').split('\n');
  const storyDebt = story.filter((l) => l.includes('recorded debt'))
    .map((l) => l.replace(/^\s*[·✗]\s*/, '').trim());
  const tell = (story.find((l) => l.includes('tells a story')) ?? '').replace(/^\s*✓\s*/, '').trim();
  const notes = story.filter((l) => /^\s{2}·/.test(l) && !l.includes('recorded debt'))
    .map((l) => l.replace(/^\s*·\s*/, '').trim());

  rows.push({
    id: t,
    title: m?.title ?? t,
    subtitle: m?.subtitle ?? '',
    course: COURSE[t],
    dayNoun: (m?.dayNoun ?? 'Day').toLowerCase(),
    delivery: m?.delivery?.name ?? m?.delivery?.what ?? '',
    files,
    storyDebt,
    tell,
    notes,
  });
}

writeFileSync(new URL('./eleven.json', import.meta.url), JSON.stringify({ FILES, NUMBERS, rows }, null, 1));
for (const r of rows) {
  console.log(r.id.padEnd(20), r.storyDebt.length, 'story lines ·',
    Object.keys(r.files).length, 'debt files ·', r.delivery || '(no delivery)');
}
