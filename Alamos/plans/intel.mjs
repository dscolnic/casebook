import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import fs from 'node:fs';
const root = '/Users/scolnic/code/Nuclear/Alamos/gamekit';
process.chdir(root);
const { themeDir, themeNames, editionBase } = await import(root + '/engine/dev/registry.mjs');
const { deliveryFor } = await import(root + '/engine/dev/curriculumDelivery.mjs');
const { normalizeContent } = await import(root + '/engine/content/normalize.js');
const { GAMES } = await import(root + '/tools/games.js');
const { EQUATIONS } = await import(root + '/tools/syllabus.js');

// The sixteen conversion plans, first so the JSON keeps a readable diff — then every
// other registered campaign, because the worst mix in the catalogue is a junior edition
// and a report that cannot see it is a report about the games that were already fine.
const PLANNED = ['contamcity','redsand','seedbank','outbreak_riverton','bring_them_home','deepwatch',
  'projecty','midway','groundtruth','blackout','aftershock','icecore','planetary_defense',
  'the_trial','headwater','sightline'];
const THEMES = [...PLANNED, ...themeNames().filter(n => !PLANNED.includes(n))];
const CORE = ['CHOICE','BALLPARK','SEQUENCE','PROTOCOL','TRIAGE','CASEBOOK','SCIENCETANK','DIAGNOSIS'];
const LIVE = new Set(['SWEEP','HOLDOUT','TALLY','PROBE']);
// A stop "carries arithmetic" when its formula haystack — relationship, template, worked
// solution, a DERIVE's lines, an instrument's own numbers, the givens — holds a digit or an
// operator. It is the share of a campaign that can compute anything, and it is the column
// that predicts whether the syllabus is delivered (Spearman 0.69 across the seventeen
// senior campaigns, where the effective format count scores -0.07). CHOICE has none of
// those fields, so it can never count; the assertion below is what keeps that true if the
// haystack in curriculumDelivery.mjs changes.
const ARITH = /[0-9=÷×]/;
const out = {};
const miscounted = [];
for (const name of THEMES) {
  const theme = (await import(pathToFileURL(resolve(themeDir(name), 'theme.js')).href)).default;
  const content = theme.content ?? {}; normalizeContent(content);
  const d = deliveryFor(name, content);
  const g = GAMES.find(x => x.id === name) ?? {};
  // format mix
  const mix = {}; for (const p of d.pages) mix[p.type] = (mix[p.type] || 0) + 1;
  const n = d.pages.length;
  const eff = 1 / Object.values(mix).reduce((a, v) => a + (v / n) ** 2, 0);
  const tiers = { SELECT: 0, CONSTRUCT: 0, OPERATE: 0 };
  for (const p of d.pages) tiers[p.tier]++;
  const arithmetic = d.pages.filter(p => p.formula.trim().length > 1 && ARITH.test(p.formula));
  for (const p of arithmetic) if (p.type === 'CHOICE') miscounted.push(`${name} ${p.key} "${p.title}"`);
  const instrStops = d.pages.filter(p => !CORE.includes(p.type) && !LIVE.has(p.type)).length;
  const livePanels = d.pages.filter(p => LIVE.has(p.type)).length;
  // equation gaps, flagged where a mentioning stop is an instrument
  const gaps = d.equations.filter(e => !e.computes.length).map(e => ({
    e: e.e, c: e.c,
    at: e.mentions.map(i => ({ n: i, type: d.pages[i - 1].type, day: d.pages[i - 1].day, title: d.pages[i - 1].title })),
    onInstrument: e.mentions.some(i => !CORE.includes(d.pages[i - 1].type)),
  }));
  // select-only mechanism concepts
  const selectOnly = d.concepts.filter(c => c.stops.length && c.tier === 'SELECT' && !c.m)
    .map(c => ({ n: c.n, c: c.c, stops: c.stops }));
  const absent = d.concepts.filter(c => !c.stops.length).map(c => ({ n: c.n, c: c.c }));
  // areas
  const areas = {}; for (const p of d.pages) areas[p.group] = (areas[p.group] || 0) + 1;
  // place
  let buildings = [];
  try {
    const s = await import(pathToFileURL(resolve(themeDir(name), 'site.js')).href);
    const site = s.SITE ?? s.default ?? s;
    buildings = (site.buildings ?? []).map(b => `${b.id}${b.group ? '/' + b.group : ''}: ${b.name ?? ''}`);
  } catch {}
  out[name] = {
    title: g.title ?? name, course: g.course ?? '', field: g.field ?? '', place: g.place ?? '',
    accent: g.accent ?? '#5a7d8a', stops: n, mix, eff: +eff.toFixed(1), tiers,
    grade: theme.audience?.grade ?? null, edition: editionBase(name), days: Math.max(...d.pages.map(p => p.day)),
    formats: Object.keys(mix).length, choiceShare: +((mix.CHOICE ?? 0) / n).toFixed(3),
    arithmetic: arithmetic.length, arithmeticShare: +(arithmetic.length / n).toFixed(3),
    instrStops, livePanels,
    equations: d.equations.length, computed: d.equations.length - gaps.length, gaps,
    concepts: d.concepts.length, selectOnly, absent, areas, buildings,
    pages: d.pages.map((p, i) => ({ n: i + 1, day: p.day, group: p.group, type: p.type, title: p.title })),
  };
}
if (miscounted.length) {
  // A CHOICE stop has no relationship, template or solution, so it cannot compute by
  // construction. If one lands here the haystack has changed and the column means
  // something else — fail rather than publish a number nobody can interpret.
  console.error('CHOICE stops counted as carrying arithmetic:\n  ' + miscounted.join('\n  '));
  process.exit(1);
}
fs.writeFileSync('/Users/scolnic/code/Nuclear/Alamos/plans/intel.json', JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) {
  const top = Object.entries(v.mix).sort((a,b)=>b[1]-a[1])[0];
  console.log(`${k.padEnd(21)} ${String(v.stops).padStart(3)}st eff ${String(v.eff).padStart(4)}  arith ${String(Math.round(v.arithmeticShare*100)).padStart(3)}%  CHOICE ${String(Math.round(v.choiceShare*100)).padStart(3)}%  top ${top[0]}/${top[1]}  eq ${v.computed}/${v.equations} (${v.gaps.length} gap, ${v.gaps.filter(x=>x.onInstrument).length} on instr)  selectOnly ${v.selectOnly.length}  absent ${v.absent.length}  tiers ${v.tiers.SELECT}/${v.tiers.CONSTRUCT}/${v.tiers.OPERATE}`);
}
