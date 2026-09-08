// attest.mjs — the bible's ATTEST board into the importer's.
//
// 15 stops, in six of the eight bibles. See `_shared.mjs` for the contract
// every converter in this directory keeps.
//
// This is the cheapest of the three in this batch and the reason is one rename:
// the bible calls the sentence under a claim `verification` and the importer
// calls it `evidence`. Both mean the same thing — one sentence saying what a
// check would turn up — so the board arrives complete and nothing is owed.
//
// The bible writes a claim as `{id, label, critical, backed, verification}` and
// the importer reads `{id, label, evidence, critical?, backed?, signedBy?}`.
//
// TWO FIELDS ARE DELIBERATELY NOT WRITTEN.
//
// `signedBy` — the importer defaults it to an em dash. That default asserts
// nothing about the world: the panel shows a visibly blank signature line,
// which is honest about a board that never named a signatory. An optional field
// is only owed when its default is player-visible prose that claims something
// (VERIFY's `intervention` is; see verify.mjs), so this one is neither written
// nor owed.
//
// `correctAction` — the bible writes "verify primary, independent, and scope;
// hold extension", which is not a field of the importer's board at all. It is
// the answer restated, and the importer derives the same answer from `critical`
// and `backed`. Carrying it would put a second description of one fact beside
// the first, so it is dropped rather than owed.
//
// The arithmetic that makes an attest board answerable — enough checks to cover
// the unbacked critical claims, fewer checks than claims, at least one critical
// claim already backed — is the importer's and is not restated here. A checker
// with its own copy of a rule is a second description of it, and the second
// copy drifts the first time either is corrected.
import { str, num, list, pick } from './_shared.mjs';

export const FORMAT = 'ATTEST';

export const convert = (b) => {
  const owes = [];
  const claims = list(b?.claims);
  if(claims.length < 4) owes.push(`the board has ${claims.length} claim(s); an attest list needs at least four`);

  const out = claims.map((c, i) => {
    const label = str(c.label);
    const evidence = str(pick(c, 'verification', 'evidence'));
    const id = str(pick(c, 'id')) || label;
    if(!label) owes.push(`claim ${i + 1} has no \`label\``);
    if(!evidence) owes.push(`claim ${i + 1} has no \`verification\` — the one sentence saying what a check would turn up`);
    return {
      ...(id ? { id } : {}),
      ...(label ? { label } : {}),
      ...(evidence ? { evidence } : {}),
      ...(c.critical === true ? { critical: true } : {}),
      ...(c.backed === true ? { backed: true } : {}),
    };
  });

  const checks = num(pick(b, 'checks'));
  if(checks === undefined) owes.push('no numeric `checks` budget — how many of the claims may be verified before the list is closed');

  return {
    key: 'attest',
    value: { claims: out, ...(checks === undefined ? {} : { checks }) },
    owes,
  };
};

// ----------------------------------------------------------------- selftest
//
//   node tools/bibleConvert/attest.mjs --selftest
//
// The case that matters is not "a good board converts". It is that a board
// missing a field puts that field in `owes` and does NOT get it in `value` —
// because the failure this whole tool exists to prevent is a converter quietly
// writing the one field that turns a red gate green. So every case here is a
// pair: the complete board owes nothing, and the same board with one field
// taken out owes exactly that field and comes back without it.
//
// Verified by putting the bug back — `evidence: evidence` unconditionally, so a
// missing verification is written as `''` — and watching the second case, and
// only the second case, fail.
export function selftest(){
  let bad = 0;
  const check = (name, ok) => { if(!ok){ bad++; console.log(`  ✗ ${name}`); } };

  const claim = (over = {}) => ({ id: 'primary', label: 'primary claim',
    critical: true, backed: true, verification: 'the signed source reproduces the result', ...over });
  const full = () => ({ checks: 3, claims: [
    claim(), claim({ id: 'independent', label: 'independent confirmation' }),
    claim({ id: 'scope', label: 'scope and date', critical: false }),
    claim({ id: 'extension', label: 'stronger untested extension', backed: false,
      verification: 'no independent check supports the extension' }),
  ] });

  const good = convert(full());
  check('a complete board owes nothing', good.owes.length === 0);
  check('and the bible\'s `verification` arrives as the importer\'s `evidence`',
    good.value.claims[0].evidence === 'the signed source reproduces the result');
  check('and `checks` comes across as a number', good.value.checks === 3);
  check('and nothing writes `signedBy`', !('signedBy' in good.value.claims[0]));
  check('and nothing writes `correctAction`', !('correctAction' in good.value));

  // One field out, one field owed, and NOT written.
  const noEvidence = full(); delete noEvidence.claims[2].verification;
  const r1 = convert(noEvidence);
  check('a claim with no verification owes it',
    r1.owes.some(o => /claim 3 has no `verification`/.test(o)));
  check('and does not get an `evidence` key at all', !('evidence' in r1.value.claims[2]));

  const noChecks = full(); delete noChecks.checks;
  const r2 = convert(noChecks);
  check('a board with no checks budget owes it', r2.owes.some(o => /`checks`/.test(o)));
  check('and does not get a `checks` number', !('checks' in r2.value));

  const noLabel = full(); delete noLabel.claims[0].label;
  const r3 = convert(noLabel);
  check('a claim with no label owes it', r3.owes.some(o => /claim 1 has no `label`/.test(o)));
  check('and does not get a `label`', !('label' in r3.value.claims[0]));

  const short = full(); short.claims.length = 3;
  check('three claims is owed as too few', convert(short).owes.some(o => /at least four/.test(o)));

  console.log(bad ? `attest: ${bad} selftest case(s) failed.`
                  : 'attest: a missing field is owed, never written.');
  return bad;
}

if(process.argv[1] && process.argv[1].endsWith('attest.mjs')){
  if(process.argv.includes('--selftest')) process.exit(selftest() ? 1 : 0);
}
