// outfits.js — what people wear on a children's ward.
//
// The rig is engine-level; only this changes. `src/npcs.js` used to build and
// dress these people itself — 951 lines — which is why the fix that stops
// somebody standing in a doorway you need to walk through had to be written
// twice, and why one of the two copies got it a fortnight later than the other.
//
// A children's hospital is the most colourful place in this set on purpose:
// scrubs in three colours so the teams are told apart at a glance, and the
// children in their own clothes, because nobody makes a child wear a gown to
// sit in a waiting room.
export const OUTFITS = {
  nurse:    { top: 0x3f8f8a, bottom: 0x357b77, kind: 'staff' },
  doctor:   { top: 0x374a63, bottom: 0x2f4056, kind: 'lead', coat: 0xf4f2ec },
  surgeon:  { top: 0x4f7a5e, bottom: 0x456b52, kind: 'staff' },
  porter:   { top: 0x6a5f52, bottom: 0x554c42, kind: 'staff' },
  play:     { top: 0xc9743f, bottom: 0x8a5a3a, kind: 'staff' },
  radiog:   { top: 0x5c6f8a, bottom: 0x4a5a71, kind: 'staff' },
  pharm:    { top: 0x7a6a9a, bottom: 0x615479, kind: 'lead', coat: 0xf4f2ec },
  // The people the ward is for, and the people who came with them.
  childA:   { top: 0xd8703f, bottom: 0x4a5f7a, kind: 'child' },
  childB:   { top: 0x64a06a, bottom: 0x54596b, kind: 'child' },
  childC:   { top: 0xc9536b, bottom: 0x3f4756, kind: 'child' },
  parent:   { top: 0x8a8577, bottom: 0x4a4740, kind: 'visitor' },
};

/**
 * A role string to an outfit, matched loosely: the roster is written in the
 * words a nine-year-old reads ("Nurse Alex Lee", "the play specialist"), not in
 * outfit names.
 */
export function roleToOutfit(role = ''){
  const r = String(role).toLowerCase();
  if(/nurse/.test(r)) return 'nurse';
  if(/surgeon|theatre|operating/.test(r)) return 'surgeon';
  if(/radiograph|imaging|x-?ray|scan/.test(r)) return 'radiog';
  if(/pharmac/.test(r)) return 'pharm';
  if(/play|therapist|teacher/.test(r)) return 'play';
  if(/porter|cleaner|catering|kitchen/.test(r)) return 'porter';
  if(/doctor|consultant|registrar|dr\b|paediatric/.test(r)) return 'doctor';
  if(/mum|dad|mother|father|parent|grandma|grandad|visitor/.test(r)) return 'parent';
  if(/child|boy|girl|baby|patient/.test(r)) return 'childA';
  return 'doctor';
}
