// outfits.js — what people wore on the Hill in 1943.
//
// The rig is engine-level; only this changes. `src/npcs.js` used to build and
// dress this game's people itself — 890 lines of it — which is why every crowd
// fix since had to be made twice, including the one that stops somebody standing
// in a doorway you need to walk through.
//
// The Hill was a mix nobody would have designed: Army officers in uniform, WACs,
// machinists in overalls, and theoretical physicists in whatever they had
// brought from Cambridge or Göttingen. Nothing here is bright: it is 1943, at
// altitude, in a town built out of green timber and mud.
export const OUTFITS = {
  // Army: the site was run by the Corps of Engineers and it showed.
  officer:   { top: 0x556052, bottom: 0x49523f, kind: 'lead', coat: 0x5b6455 },
  mp:        { top: 0x4b5546, bottom: 0x404836, kind: 'staff' },
  wac:       { top: 0x6a705c, bottom: 0x555c4a, kind: 'staff' },
  // The technical staff, in what a laboratory wore before laboratories had
  // uniforms: a shirt, a tie nobody enjoyed, and a coat over it in the winter.
  scientist: { top: 0x8a8577, bottom: 0x4a4740, kind: 'lead', coat: 0xd9d4c4 },
  theorist:  { top: 0x7d7b74, bottom: 0x474139, kind: 'lead', coat: 0xcfc9ba },
  // The shops: machinists, electricians, the people who actually built things.
  machinist: { top: 0x4c5560, bottom: 0x3d444d, kind: 'staff' },
  fitter:    { top: 0x6b5f4c, bottom: 0x4f4739, kind: 'staff' },
  // And the town, which had families in it because the Army could not recruit
  // people who had to leave their families behind.
  resident:  { top: 0x7a6a5a, bottom: 0x574c41, kind: 'visitor' },
  child:     { top: 0x93826c, bottom: 0x6d6152, kind: 'child' },
};

/**
 * A role string to an outfit. Matched loosely, because the roster is written in
 * the language of 1943 job titles rather than in outfit names.
 */
export function roleToOutfit(role = ''){
  const r = String(role).toLowerCase();
  if(/general|colonel|major|captain|lieutenant|commander/.test(r)) return 'officer';
  if(/military police|guard|sentry|security/.test(r)) return 'mp';
  if(/wac|women's army|telephone|switchboard|computer\b/.test(r)) return 'wac';
  if(/theor|mathemat|calculat|physicist/.test(r)) return 'theorist';
  if(/machin|shop|tool|fabricat/.test(r)) return 'machinist';
  if(/electric|plumb|carpent|constructi|fitter|technic/.test(r)) return 'fitter';
  if(/director|leader|head|chief|division/.test(r)) return 'scientist';
  if(/child|school/.test(r)) return 'child';
  if(/resident|family|housing|commissary|librarian/.test(r)) return 'resident';
  return 'scientist';
}
